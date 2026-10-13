-- Join requests: when a class asks for approval (settings.joinApproval), a class code sends the
-- teacher a request instead of enrolling the student straight away. The teacher approves or
-- declines; the student keeps everything they studied on their own, because mastery belongs to the
-- student, not the class.

create table public.join_requests (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  message text check (char_length(message) <= 300),
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  unique (class_id, student_id)
);

create index join_requests_pending_idx on public.join_requests (class_id) where status = 'pending';
create index join_requests_student_idx on public.join_requests (student_id);

alter table public.join_requests enable row level security;

-- Read-only to clients; the functions below make every change.
create policy join_requests_read on public.join_requests for select to authenticated
  using (student_id = (select auth.uid()) or public.is_teacher_of(class_id));

revoke all on public.join_requests from anon, authenticated;
grant select on public.join_requests to authenticated;

create or replace function public.class_needs_approval(c public.classes)
returns boolean language sql immutable set search_path = '' as $$
  select coalesce(c.settings -> 'joinApproval' = 'true'::jsonb, false);
$$;

-- Records (or renews) a pending request and tells the teacher. Internal: not callable by clients.
create or replace function public.add_join_request(c public.classes, sid uuid, sname text, msg text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  n integer;
begin
  insert into public.join_requests (class_id, student_id, message)
  values (c.id, sid, nullif(left(trim(coalesce(msg, '')), 300), ''))
  on conflict (class_id, student_id) do update
    set status = 'pending', message = excluded.message, created_at = now(), decided_at = null
    where public.join_requests.status <> 'pending';
  get diagnostics n = row_count;
  if n > 0 then
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', sname || ' asked to join ' || c.name, 'Approve or decline the request on the Students page.', '/t/c/' || c.id || '/students');
  end if;
end $$;

revoke execute on function public.add_join_request(public.classes, uuid, text, text) from public, anon, authenticated;

-- A student uses a class code: they join straight away, or a request goes to the teacher when the
-- class asks for approval.
create or replace function public.request_to_join(p_code text, p_message text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  c public.classes;
  teacher text;
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if me.role <> 'student' then raise exception 'Only students can join a class with a code.'; end if;
  if me.disabled_at is not null then raise exception 'This account is disabled.' using errcode = '42501'; end if;
  select * into c from public.classes where join_code = upper(trim(p_code)) and not archived and kind = 'teacher';
  if not found then raise exception 'That class code was not found.'; end if;
  select p.full_name into teacher from public.profiles p where p.id = c.teacher_id;
  if not exists (select 1 from public.enrollments e where e.class_id = c.id and e.student_id = me.id) then
    if public.class_needs_approval(c) then
      perform public.add_join_request(c, me.id, me.full_name, p_message);
      return jsonb_build_object('status', 'pending', 'classId', c.id, 'className', c.name, 'teacherName', teacher);
    end if;
    insert into public.enrollments (class_id, student_id) values (c.id, me.id) on conflict do nothing;
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', me.full_name || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
  end if;
  return jsonb_build_object('status', 'joined', 'classId', c.id, 'className', c.name, 'teacherName', teacher);
end $$;

revoke execute on function public.request_to_join(text, text) from public, anon;
grant execute on function public.request_to_join(text, text) to authenticated;

-- The older entry point joins only classes that do not ask for approval.
create or replace function public.join_class(p_code text)
returns public.classes language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  c public.classes;
  n integer;
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if me.role <> 'student' then raise exception 'Only students can join a class with a code.'; end if;
  select * into c from public.classes where join_code = upper(trim(p_code)) and not archived and kind = 'teacher';
  if not found then raise exception 'That class code was not found.'; end if;
  if public.class_needs_approval(c) and not exists (select 1 from public.enrollments e where e.class_id = c.id and e.student_id = me.id) then
    raise exception 'This class asks for your teacher''s approval. Send a request from the Join a class page.';
  end if;
  insert into public.enrollments (class_id, student_id) values (c.id, me.id) on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', me.full_name || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
  end if;
  return c;
end $$;

-- Signing up with a class code: join, or request to join when the class asks for approval.
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
    select * into c from public.classes where join_code = code and not archived and kind = 'teacher';
    if found then
      if public.class_needs_approval(c) then
        perform public.add_join_request(c, new.id, display, null);
      else
        insert into public.enrollments (class_id, student_id) values (c.id, new.id) on conflict do nothing;
        insert into public.notifications (user_id, kind, title, body, link)
        values (c.teacher_id, 'announcement', display || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
      end if;
    end if;
  end if;
  return new;
end $$;

-- A student's requests, with the class and teacher names they cannot otherwise see yet.
create or replace function public.my_join_requests()
returns table (id uuid, class_id uuid, class_name text, section text, course_id text, teacher_name text, status text, created_at timestamptz, decided_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select r.id, r.class_id, c.name, c.section, c.course_id, t.full_name, r.status, r.created_at, r.decided_at
  from public.join_requests r
  join public.classes c on c.id = r.class_id
  left join public.profiles t on t.id = c.teacher_id
  where r.student_id = (select auth.uid())
  order by r.created_at desc
  limit 20;
$$;

revoke execute on function public.my_join_requests() from public, anon;
grant execute on function public.my_join_requests() to authenticated;

-- A class's pending requests, with the names the teacher cannot otherwise see before approving.
create or replace function public.class_join_requests(p_class_id uuid)
returns table (id uuid, student_id uuid, full_name text, email text, message text, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Only the teacher of this class can see its requests.' using errcode = '42501'; end if;
  return query
    select r.id, r.student_id, p.full_name, p.email, r.message, r.created_at
    from public.join_requests r join public.profiles p on p.id = r.student_id
    where r.class_id = p_class_id and r.status = 'pending'
    order by r.created_at;
end $$;

revoke execute on function public.class_join_requests(uuid) from public, anon;
grant execute on function public.class_join_requests(uuid) to authenticated;

-- The teacher approves (enrols the student) or declines a request; the student is told either way.
create or replace function public.decide_join_request(p_request_id uuid, p_approve boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  r public.join_requests;
  c public.classes;
begin
  select * into r from public.join_requests where id = p_request_id for update;
  if not found or not public.is_teacher_of(r.class_id) then raise exception 'That request was not found.'; end if;
  if r.status <> 'pending' then return; end if;
  select * into c from public.classes where id = r.class_id;
  update public.join_requests set status = case when p_approve then 'approved' else 'declined' end, decided_at = now() where id = r.id;
  if p_approve then
    insert into public.enrollments (class_id, student_id) values (r.class_id, r.student_id) on conflict do nothing;
    insert into public.notifications (user_id, kind, title, body, link)
    values (r.student_id, 'announcement', 'You joined ' || c.name, 'Your teacher approved your request. The class is now in your course list.', '/s');
  else
    insert into public.notifications (user_id, kind, title, body, link)
    values (r.student_id, 'announcement', 'Your request to join ' || c.name || ' was declined', 'Check the class code with your teacher. You can keep studying on your own in the meantime.', '/s/join');
  end if;
end $$;

revoke execute on function public.decide_join_request(uuid, boolean) from public, anon;
grant execute on function public.decide_join_request(uuid, boolean) to authenticated;
