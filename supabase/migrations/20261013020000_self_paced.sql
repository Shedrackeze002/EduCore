-- Self-paced study: a student who signs up without a teacher studies a course in a class of their
-- own. The class has no teacher; every lesson is available and the AI coach and autopilot
-- practice guide the student.

alter table public.classes add column kind text not null default 'teacher' check (kind in ('teacher', 'self'));
alter table public.classes alter column teacher_id drop not null;
alter table public.classes add constraint classes_teacher_kind check ((kind = 'self') = (teacher_id is null));

-- Class codes join teachers' classes only.
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
  insert into public.enrollments (class_id, student_id) values (c.id, me.id) on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', me.full_name || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
  end if;
  return c;
end $$;

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
      insert into public.enrollments (class_id, student_id) values (c.id, new.id) on conflict do nothing;
      insert into public.notifications (user_id, kind, title, body, link)
      values (c.teacher_id, 'announcement', display || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
    end if;
  end if;
  return new;
end $$;

-- A student's self-paced class for a course: made the first time, reused afterwards. The lessons
-- the app passes are published in it (again on later calls, so new lessons appear).
create or replace function public.start_self_paced(p_course_id text, p_lesson_ids text[])
returns public.classes language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  c public.classes;
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if me.role <> 'student' then raise exception 'Self-paced study is for students.'; end if;
  if me.disabled_at is not null then raise exception 'This account is disabled.' using errcode = '42501'; end if;
  if p_course_id is null or p_course_id !~ '^math-[0-9a-z-]{1,8}$' then raise exception 'That course was not found.'; end if;
  select k.* into c
  from public.classes k join public.enrollments e on e.class_id = k.id
  where k.kind = 'self' and e.student_id = me.id and k.course_id = p_course_id and not k.archived
  limit 1;
  if not found then
    insert into public.classes (teacher_id, name, course_id, kind, settings)
    values (null, 'Self-paced', p_course_id, 'self', '{"aiAutopilot": true, "reminderHours": []}'::jsonb)
    returning * into c;
    insert into public.enrollments (class_id, student_id) values (c.id, me.id);
  end if;
  insert into public.publications (class_id, lesson_id)
  select c.id, l.id from (select distinct x as id from unnest(coalesce(p_lesson_ids, '{}'::text[])) as x limit 400) l
  where char_length(l.id) between 1 and 40
  on conflict do nothing;
  return c;
end $$;

revoke execute on function public.start_self_paced(text, text[]) from public, anon;
grant execute on function public.start_self_paced(text, text[]) to authenticated;
