-- Platform administration: administrator accounts, teacher approval, disabled
-- accounts, platform settings and an audit log of every administrative action.

-- ---------------------------------------------------------------------------
-- Schema
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column platform_admin boolean not null default false,
  add column teacher_status text check (teacher_status in ('approved', 'pending', 'rejected')),
  add column disabled_at timestamptz;

update public.profiles set teacher_status = 'approved' where role = 'teacher' and teacher_status is null;

alter table public.notifications drop constraint notifications_kind_check;
alter table public.notifications add constraint notifications_kind_check
  check (kind in ('assignment', 'reminder', 'graded', 'announcement', 'insight', 'overdue', 'submission', 'admin'));

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

drop policy classes_insert on public.classes;
create policy classes_insert on public.classes for insert to authenticated
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

-- ---------------------------------------------------------------------------
-- Administrator RPCs (each checks the caller is an active platform administrator)
-- ---------------------------------------------------------------------------

create or replace function public.admin_overview()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  result jsonb;
begin
  perform public.admin_require();
  select jsonb_build_object(
    'teachers', (select count(*) from public.profiles where role = 'teacher' and teacher_status = 'approved' and disabled_at is null),
    'pendingTeachers', (select count(*) from public.profiles where role = 'teacher' and teacher_status = 'pending'),
    'students', (select count(*) from public.profiles where role = 'student' and disabled_at is null),
    'disabled', (select count(*) from public.profiles where disabled_at is not null),
    'classes', (select count(*) from public.classes where not archived),
    'assignments', (select count(*) from public.assignments where status = 'published'),
    'submissions7d', (select count(*) from public.submissions where submitted_at > now() - interval '7 days'),
    'activeStudents7d', (select count(distinct student_id) from public.submissions where submitted_at > now() - interval '7 days'),
    'aiInsights30d', (select count(*) from public.insights where created_at > now() - interval '30 days'),
    'signupsByWeek', (
      select coalesce(jsonb_agg(jsonb_build_object('week', to_char(w, 'YYYY-MM-DD'), 'teachers', t, 'students', s) order by w), '[]'::jsonb)
      from (
        select w,
               (select count(*) from public.profiles p where p.role = 'teacher' and p.created_at >= w and p.created_at < w + interval '7 days') as t,
               (select count(*) from public.profiles p where p.role = 'student' and p.created_at >= w and p.created_at < w + interval '7 days') as s
        from generate_series(date_trunc('week', now()) - interval '11 weeks', date_trunc('week', now()), interval '1 week') as w
      ) weeks
    )
  ) into result;
  return result;
end $$;

create or replace function public.admin_users(p_search text default null, p_role text default null, p_status text default null, p_limit integer default 50, p_offset integer default 0)
returns table (
  id uuid, role text, full_name text, email text, username text, avatar_color text, created_at timestamptz,
  last_sign_in_at timestamptz, platform_admin boolean, teacher_status text, disabled_at timestamptz, classes bigint, total bigint
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select p.id, p.role, p.full_name, p.email, p.username, p.avatar_color, p.created_at, u.last_sign_in_at,
         p.platform_admin, p.teacher_status, p.disabled_at,
         case when p.role = 'teacher' then (select count(*) from public.classes c where c.teacher_id = p.id)
              else (select count(*) from public.enrollments e where e.student_id = p.id) end,
         count(*) over ()
  from public.profiles p
  left join auth.users u on u.id = p.id
  where (coalesce(p_search, '') = '' or p.full_name ilike '%' || p_search || '%' or p.email ilike '%' || p_search || '%' or coalesce(p.username, '') ilike '%' || p_search || '%')
    and (coalesce(p_role, '') = '' or p.role = p_role)
    and (
      coalesce(p_status, '') = ''
      or (p_status = 'pending' and p.teacher_status = 'pending')
      or (p_status = 'disabled' and p.disabled_at is not null)
      or (p_status = 'admin' and p.platform_admin)
      or (p_status = 'active' and p.disabled_at is null and coalesce(p.teacher_status, 'approved') = 'approved')
    )
  order by p.created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200) offset greatest(coalesce(p_offset, 0), 0);
end $$;

create or replace function public.admin_classes(p_search text default null, p_limit integer default 50, p_offset integer default 0)
returns table (
  id uuid, name text, section text, course_id text, teacher_id uuid, teacher_name text, students bigint,
  assignments bigint, last_activity timestamptz, created_at timestamptz, archived boolean, total bigint
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select c.id, c.name, c.section, c.course_id, c.teacher_id, t.full_name,
         (select count(*) from public.enrollments e where e.class_id = c.id),
         (select count(*) from public.assignments a where a.class_id = c.id and a.status = 'published'),
         greatest((select max(s.submitted_at) from public.submissions s where s.class_id = c.id),
                  (select max(a.created_at) from public.assignments a where a.class_id = c.id), c.created_at),
         c.created_at, c.archived, count(*) over ()
  from public.classes c
  join public.profiles t on t.id = c.teacher_id
  where coalesce(p_search, '') = '' or c.name ilike '%' || p_search || '%' or t.full_name ilike '%' || p_search || '%'
  order by 9 desc nulls last
  limit least(greatest(coalesce(p_limit, 50), 1), 200) offset greatest(coalesce(p_offset, 0), 0);
end $$;

create or replace function public.admin_set_teacher_status(p_user uuid, p_status text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
begin
  perform public.admin_require();
  if p_status not in ('approved', 'pending', 'rejected') then raise exception 'Invalid status.'; end if;
  select * into p from public.profiles where id = p_user;
  if not found or p.role <> 'teacher' then raise exception 'Teacher not found.'; end if;
  update public.profiles set teacher_status = p_status where id = p_user;
  perform public.admin_log('teacher_' || p_status, p_user, jsonb_build_object('from', p.teacher_status));
  if p_status = 'approved' and p.teacher_status is distinct from 'approved' then
    insert into public.notifications (user_id, kind, title, body, link)
    values (p_user, 'admin', 'Your teacher account is approved', 'You can now create classes and invite students.', '/t');
  end if;
end $$;

create or replace function public.admin_set_platform_admin(p_user uuid, p_on boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
begin
  perform public.admin_require();
  select * into p from public.profiles where id = p_user;
  if not found then raise exception 'User not found.'; end if;
  if p_on and p.role <> 'teacher' then raise exception 'Only teacher accounts can be administrators.'; end if;
  if not p_on and not exists (select 1 from public.profiles where platform_admin and disabled_at is null and id <> p_user) then
    raise exception 'EduCore needs at least one administrator.';
  end if;
  update public.profiles set platform_admin = p_on, teacher_status = case when p_on then 'approved' else teacher_status end where id = p_user;
  perform public.admin_log(case when p_on then 'admin_granted' else 'admin_revoked' end, p_user, '{}'::jsonb);
end $$;

create or replace function public.admin_get_settings()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.admin_require();
  return (select coalesce(jsonb_object_agg(key, value), '{}'::jsonb) from public.platform_settings);
end $$;

create or replace function public.admin_set_setting(p_key text, p_value jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  old jsonb;
begin
  perform public.admin_require();
  if p_key = 'teacher_signup' then
    if p_value #>> '{}' not in ('open', 'approval') then raise exception 'Teacher sign-up must be "open" or "approval".'; end if;
  else
    raise exception 'Unknown setting.';
  end if;
  select value into old from public.platform_settings where key = p_key;
  insert into public.platform_settings (key, value, updated_at, updated_by) values (p_key, p_value, now(), (select auth.uid()))
  on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at, updated_by = excluded.updated_by;
  perform public.admin_log('setting_changed', null, jsonb_build_object('key', p_key, 'from', old, 'to', p_value));
  return public.admin_get_settings();
end $$;

create or replace function public.admin_audit(p_limit integer default 100)
returns table (id bigint, created_at timestamptz, action text, actor_name text, target_name text, details jsonb)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select l.id, l.created_at, l.action, a.full_name, t.full_name, l.details
  from public.admin_audit_log l
  left join public.profiles a on a.id = l.actor_id
  left join public.profiles t on t.id = l.target_user
  order by l.created_at desc, l.id desc
  limit least(greatest(coalesce(p_limit, 100), 1), 500);
end $$;

-- What the sign-up page needs to know (safe for anonymous visitors).
create or replace function public.signup_config()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('teacherSignup', coalesce((select s.value #>> '{}' from public.platform_settings s where s.key = 'teacher_signup'), 'approval'));
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------

revoke execute on function public.admin_log(text, uuid, jsonb) from public, anon, authenticated;
revoke execute on function public.admin_require() from public, anon, authenticated;
revoke execute on function public.is_platform_admin() from public, anon;
revoke execute on function public.can_teach() from public, anon;
revoke execute on function public.admin_overview() from public, anon;
revoke execute on function public.admin_users(text, text, text, integer, integer) from public, anon;
revoke execute on function public.admin_classes(text, integer, integer) from public, anon;
revoke execute on function public.admin_set_teacher_status(uuid, text) from public, anon;
revoke execute on function public.admin_set_platform_admin(uuid, boolean) from public, anon;
revoke execute on function public.admin_get_settings() from public, anon;
revoke execute on function public.admin_set_setting(text, jsonb) from public, anon;
revoke execute on function public.admin_audit(integer) from public, anon;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.can_teach() to authenticated;
grant execute on function public.admin_overview() to authenticated;
grant execute on function public.admin_users(text, text, text, integer, integer) to authenticated;
grant execute on function public.admin_classes(text, integer, integer) to authenticated;
grant execute on function public.admin_set_teacher_status(uuid, text) to authenticated;
grant execute on function public.admin_set_platform_admin(uuid, boolean) to authenticated;
grant execute on function public.admin_get_settings() to authenticated;
grant execute on function public.admin_set_setting(text, jsonb) to authenticated;
grant execute on function public.admin_audit(integer) to authenticated;
grant execute on function public.signup_config() to anon, authenticated;
