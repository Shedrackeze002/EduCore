-- Platform administration, part 1: administrator accounts, teacher approval, disabled
-- accounts, platform settings and the audit log. The RPCs follow in the next migration.

-- ---------------------------------------------------------------------------
-- Schema
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column platform_admin boolean not null default false,
  add column teacher_status text check (teacher_status in ('approved', 'pending', 'rejected')),
  add column disabled_at timestamptz;

update public.profiles set teacher_status = 'approved' where role = 'teacher' and teacher_status is null;

create table public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id) on delete set null
);
-- New teacher accounts are reviewed by an administrator before they can create classes.
insert into public.platform_settings (key, value) values ('teacher_signup', '"approval"');

create table public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  target_user uuid references public.profiles (id) on delete set null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index admin_audit_log_created_idx on public.admin_audit_log (created_at desc);

-- Only definer functions and the service role touch these tables.
alter table public.platform_settings enable row level security;
alter table public.admin_audit_log enable row level security;
revoke all on public.platform_settings, public.admin_audit_log from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((select p.platform_admin and p.disabled_at is null from public.profiles p where p.id = (select auth.uid())), false);
$$;

-- Approved, active teachers may create classes.
create or replace function public.can_teach()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'teacher'
      and coalesce(p.teacher_status, 'approved') = 'approved' and p.disabled_at is null
  );
$$;

create or replace function public.admin_require()
returns void language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_platform_admin() then
    raise exception 'Platform administrators only.' using errcode = '42501';
  end if;
end $$;

create or replace function public.admin_log(p_action text, p_target uuid, p_details jsonb)
returns void language sql security definer set search_path = '' as $$
  insert into public.admin_audit_log (actor_id, action, target_user, details)
  values ((select auth.uid()), p_action, p_target, coalesce(p_details, '{}'::jsonb));
$$;

alter policy classes_insert on public.classes
  with check (teacher_id = (select auth.uid()) and public.can_teach());

-- New auth user -> profile. Teachers who sign up themselves wait for approval when the
-- platform requires it; administrators are notified.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  app jsonb := coalesce(new.raw_app_meta_data, '{}'::jsonb);
  r text := case when coalesce(app ->> 'role', meta ->> 'role') = 'teacher' then 'teacher' else 'student' end;
  code text := upper(nullif(trim(meta ->> 'join_code'), ''));
  display text := left(coalesce(nullif(trim(meta ->> 'full_name'), ''), nullif(trim(app ->> 'full_name'), ''), split_part(coalesce(new.email, ''), '@', 1)), 120);
  colors constant text[] := array['#6a43e3', '#2a78d6', '#0e8a6a', '#c2410c', '#be185d', '#7c3aed', '#0f766e', '#b45309', '#4338ca', '#475569'];
  mode text := coalesce((select s.value #>> '{}' from public.platform_settings s where s.key = 'teacher_signup'), 'approval');
  status text;
  c public.classes;
begin
  if r = 'teacher' then
    status := case when mode = 'open' or app ->> 'role' = 'teacher' then 'approved' else 'pending' end;
  end if;

  insert into public.profiles (id, role, full_name, email, username, avatar_color, teacher_status)
  values (new.id, r, display, coalesce(new.email, ''), nullif(lower(trim(app ->> 'username')), ''), colors[1 + floor(random() * 10)::int], status);

  if status = 'pending' then
    insert into public.notifications (user_id, kind, title, body, link)
    select p.id, 'admin', 'New teacher waiting for approval', display || ' (' || coalesce(new.email, '') || ') signed up as a teacher.', '/admin/users?status=pending'
    from public.profiles p where p.platform_admin and p.disabled_at is null;
  end if;

  if r = 'student' and code is not null then
    select * into c from public.classes where join_code = code and not archived;
    if found then
      insert into public.enrollments (class_id, student_id) values (c.id, new.id) on conflict do nothing;
      insert into public.notifications (user_id, kind, title, body, link)
      values (c.teacher_id, 'announcement', display || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
    end if;
  end if;
  return new;
end $$;

-- Helper privileges: the audit writer and guard are internal; the checks are for signed-in users.
revoke execute on function public.admin_log(text, uuid, jsonb) from public, anon, authenticated;
revoke execute on function public.admin_require() from public, anon, authenticated;
revoke execute on function public.is_platform_admin() from public, anon;
revoke execute on function public.can_teach() from public, anon;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.can_teach() to authenticated;
