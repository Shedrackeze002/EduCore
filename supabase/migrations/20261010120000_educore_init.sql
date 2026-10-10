-- EduCore database: classes, curriculum publishing, assignments, submissions,
-- mastery, notifications, AI insights and deadline reminders.
--
-- Security model
--   * Row Level Security on every table; anon has no access at all.
--   * Column-level grants limit what signed-in users may change directly.
--   * Grades, mastery and analytics are written only by Edge Functions using the
--     service role (grade-submission, ai-agent, create-students).
--   * Multi-row side effects (notifications, joins, reminders) run in
--     security-definer functions with an empty search_path.

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Utility functions (no table access)
-- ---------------------------------------------------------------------------

create or replace function public.default_assignment_settings(t text)
returns jsonb language sql immutable set search_path = '' as $$
  select case t
    when 'quiz' then '{"feedback":"after_submit","hints":false,"timeLimitMinutes":30,"attempts":1,"showSolutions":true,"retrySimilar":false,"calculator":true}'::jsonb
    when 'exam' then '{"feedback":"after_due","hints":false,"timeLimitMinutes":75,"attempts":1,"showSolutions":true,"retrySimilar":false,"calculator":true}'::jsonb
    when 'homework' then '{"feedback":"instant","hints":true,"timeLimitMinutes":null,"attempts":3,"showSolutions":true,"retrySimilar":true,"calculator":true}'::jsonb
    else '{"feedback":"instant","hints":true,"timeLimitMinutes":null,"attempts":null,"showSolutions":true,"retrySimilar":true,"calculator":true}'::jsonb
  end
$$;

create or replace function public.human_hours(h integer)
returns text language sql immutable set search_path = '' as $$
  select case
    when h >= 48 and h % 24 = 0 then (h / 24)::text || ' days'
    when h = 24 then '24 hours'
    when h = 1 then '1 hour'
    else h::text || ' hours'
  end
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('teacher', 'student')),
  full_name text not null default '' check (char_length(full_name) <= 120),
  email text not null default '',
  username text unique,
  avatar_color text not null default '#6a43e3' check (avatar_color ~ '^#[0-9a-fA-F]{6}$'),
  created_at timestamptz not null default now()
);

create table public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  section text check (char_length(section) <= 60),
  course_id text not null default 'math-10c',
  join_code text not null unique,
  settings jsonb not null default '{"reminderHours":[24,2],"aiAutopilot":false,"emailReminders":false,"timezone":"America/Edmonton"}'::jsonb,
  archived boolean not null default false,
  created_at timestamptz not null default now()
);
create index classes_teacher_idx on public.classes (teacher_id);

create table public.enrollments (
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, student_id)
);
create index enrollments_student_idx on public.enrollments (student_id);

create table public.publications (
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 40),
  published_at timestamptz not null default now(),
  primary key (class_id, lesson_id)
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text,
  kind text not null check (kind in ('video', 'link', 'note')),
  title text not null check (char_length(title) between 1 and 200),
  url text check (url is null or url ~* '^https?://'),
  body text check (char_length(body) <= 20000),
  created_at timestamptz not null default now()
);
create index resources_class_idx on public.resources (class_id);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  type text not null check (type in ('lesson', 'video', 'reading', 'practice', 'classwork', 'homework', 'quiz', 'exam')),
  instructions text not null default '' check (char_length(instructions) <= 20000),
  content jsonb not null default '{"sections":[],"custom":[]}'::jsonb check (pg_column_size(content) < 500000),
  settings jsonb not null default '{}'::jsonb,
  open_at timestamptz,
  due_at timestamptz,
  allow_late boolean not null default true,
  reminder_hours integer[] not null default '{24,2}',
  -- null means the whole class (including students who join later)
  assigned_to uuid[] check (assigned_to is null or cardinality(assigned_to) > 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  published_at timestamptz,
  notified_at timestamptz,
  created_by text not null default 'teacher' check (created_by in ('teacher', 'ai')),
  ai_rationale text
);
create index assignments_class_idx on public.assignments (class_id);
create index assignments_due_idx on public.assignments (due_at) where status = 'published';

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments (id) on delete cascade,
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  attempt integer not null default 1,
  status text not null default 'in_progress' check (status in ('in_progress', 'submitted', 'graded', 'returned')),
  seed bigint not null,
  items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) <= 150),
  responses jsonb not null default '{}'::jsonb check (pg_column_size(responses) < 400000),
  practice_skill_ids text[],
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score numeric,
  max_score numeric,
  percent numeric,
  pending_manual integer not null default 0,
  late boolean not null default false,
  feedback text,
  integrity jsonb not null default '{"blurCount":0}'::jsonb,
  mastery_changes jsonb
);
create index submissions_class_idx on public.submissions (class_id);
create index submissions_student_idx on public.submissions (student_id);
create index submissions_assignment_idx on public.submissions (assignment_id);
-- At most one open attempt per student and assignment.
create unique index submissions_one_open_attempt on public.submissions (assignment_id, student_id) where status = 'in_progress' and assignment_id is not null;

create table public.skill_mastery (
  student_id uuid not null references public.profiles (id) on delete cascade,
  skill_id text not null,
  p_known double precision not null default 0.1,
  attempts integer not null default 0,
  correct integer not null default 0,
  streak integer not null default 0,
  sessions integer not null default 0,
  level text not null default 'not_started' check (level in ('not_started', 'attempted', 'familiar', 'proficient', 'mastered')),
  last_practiced_at timestamptz,
  last_correct_at timestamptz,
  last_session_id text,
  updated_at timestamptz not null default now(),
  primary key (student_id, skill_id)
);

create table public.skill_events (
  id bigint generated always as identity primary key,
  student_id uuid not null references public.profiles (id) on delete cascade,
  class_id uuid not null references public.classes (id) on delete cascade,
  skill_id text not null,
  correct boolean not null,
  assisted boolean not null default false,
  submission_id uuid references public.submissions (id) on delete cascade,
  assignment_id uuid references public.assignments (id) on delete set null,
  at timestamptz not null default now(),
  prompt text,
  answer text,
  expected text
);
create index skill_events_class_idx on public.skill_events (class_id, at desc);
create index skill_events_student_idx on public.skill_events (student_id, at desc);
create index skill_events_submission_idx on public.skill_events (submission_id);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('assignment', 'reminder', 'graded', 'announcement', 'insight', 'overdue', 'submission')),
  title text not null,
  body text not null default '',
  link text,
  assignment_id uuid references public.assignments (id) on delete cascade,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  emailed_at timestamptz
);
create index notifications_user_idx on public.notifications (user_id, created_at desc);
create index notifications_email_idx on public.notifications (created_at) where emailed_at is null;

create table public.reminder_log (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  hours integer not null,
  due_at timestamptz not null,
  sent_at timestamptz not null default now(),
  primary key (assignment_id, student_id, hours, due_at)
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  body text not null default '' check (char_length(body) <= 10000),
  created_at timestamptz not null default now()
);
create index announcements_class_idx on public.announcements (class_id, created_at desc);

create table public.insights (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  source text not null check (source in ('minimax', 'offline')),
  model text,
  data jsonb not null,
  error text
);
create index insights_class_idx on public.insights (class_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Membership helpers (security definer so policies do not recurse)
-- ---------------------------------------------------------------------------

create or replace function public.is_teacher_of(cid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.classes c where c.id = cid and c.teacher_id = (select auth.uid()));
$$;

create or replace function public.is_enrolled(cid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.enrollments e where e.class_id = cid and e.student_id = (select auth.uid()));
$$;

create or replace function public.teaches_student(sid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.enrollments e join public.classes c on c.id = e.class_id
    where e.student_id = sid and c.teacher_id = (select auth.uid())
  );
$$;

create or replace function public.is_my_teacher(tid uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.classes c join public.enrollments e on e.class_id = c.id
    where c.teacher_id = tid and e.student_id = (select auth.uid())
  );
$$;

create or replace function public.my_role()
returns text language sql stable security definer set search_path = '' as $$
  select p.role from public.profiles p where p.id = (select auth.uid());
$$;

create or replace function public.make_join_code()
returns text language plpgsql volatile security definer set search_path = '' as $$
declare
  chars constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  code text;
  bytes bytea;
begin
  loop
    bytes := extensions.gen_random_bytes(6);
    code := '';
    for i in 0..5 loop
      code := code || substr(chars, 1 + (get_byte(bytes, i) % 32), 1);
    end loop;
    exit when not exists (select 1 from public.classes where join_code = code);
  end loop;
  return code;
end $$;

-- A valid IANA time zone for a class (falls back to UTC).
create or replace function public.class_tz(cid uuid)
returns text language sql stable security definer set search_path = '' as $$
  select coalesce(
    (select n.name from pg_catalog.pg_timezone_names n where n.name = (select c.settings ->> 'timezone' from public.classes c where c.id = cid)),
    'UTC'
  );
$$;

create or replace function public.fmt_due(ts timestamptz, cid uuid)
returns text language sql stable security definer set search_path = '' as $$
  select to_char(ts at time zone public.class_tz(cid), 'Dy, Mon FMDD "at" FMHH12:MI AM');
$$;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

-- New auth user -> profile (+ optional class join for self-registered students).
-- Generated student accounts carry their username in app_metadata, which only the
-- service role can set.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  app jsonb := coalesce(new.raw_app_meta_data, '{}'::jsonb);
  r text := case when coalesce(app ->> 'role', meta ->> 'role') = 'teacher' then 'teacher' else 'student' end;
  code text := upper(nullif(trim(meta ->> 'join_code'), ''));
  display text := left(coalesce(nullif(trim(meta ->> 'full_name'), ''), nullif(trim(app ->> 'full_name'), ''), split_part(coalesce(new.email, ''), '@', 1)), 120);
  colors constant text[] := array['#6a43e3', '#2a78d6', '#0e8a6a', '#c2410c', '#be185d', '#7c3aed', '#0f766e', '#b45309', '#4338ca', '#475569'];
  c public.classes;
begin
  insert into public.profiles (id, role, full_name, email, username, avatar_color)
  values (new.id, r, display, coalesce(new.email, ''), nullif(lower(trim(app ->> 'username')), ''), colors[1 + floor(random() * 10)::int]);

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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.classes_before_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.join_code is null or new.join_code = '' then
    new.join_code := public.make_join_code();
  end if;
  new.settings := '{"reminderHours":[24,2],"aiAutopilot":false,"emailReminders":false,"timezone":"America/Edmonton"}'::jsonb || coalesce(new.settings, '{}'::jsonb);
  return new;
end $$;

create trigger classes_before_insert
  before insert on public.classes
  for each row execute function public.classes_before_insert();

-- Send "new assignment" notifications once the assignment is published and open.
create or replace function public.notify_assignment(aid uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  a public.assignments;
  c public.classes;
  n integer;
  label text;
begin
  select * into a from public.assignments where id = aid for update;
  if not found or a.status <> 'published' or a.notified_at is not null or (a.open_at is not null and a.open_at > now()) then
    return 0;
  end if;
  select * into c from public.classes where id = a.class_id;
  label := case a.type when 'classwork' then 'classwork' when 'homework' then 'homework' when 'quiz' then 'quiz' when 'exam' then 'exam'
                       when 'practice' then 'practice' when 'video' then 'video' when 'reading' then 'reading' else 'lesson' end;
  insert into public.notifications (user_id, kind, title, body, link, assignment_id)
  select e.student_id, 'assignment', 'New ' || label || ': ' || a.title,
         c.name || case when a.due_at is null then '.' else '. Due ' || public.fmt_due(a.due_at, a.class_id) || '.' end,
         '/s/work/' || a.id, a.id
  from public.enrollments e
  where e.class_id = a.class_id and (a.assigned_to is null or e.student_id = any (a.assigned_to));
  get diagnostics n = row_count;
  update public.assignments set notified_at = now() where id = aid;
  return n;
end $$;

create or replace function public.assignments_before_write()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.settings is null or new.settings = '{}'::jsonb then
    new.settings := public.default_assignment_settings(new.type);
  end if;
  if new.status = 'published' then
    if new.type in ('practice', 'classwork', 'homework', 'quiz', 'exam')
       and coalesce(jsonb_array_length(new.content -> 'sections'), 0) = 0
       and coalesce(jsonb_array_length(new.content -> 'custom'), 0) = 0 then
      raise exception 'Add at least one question before publishing.' using errcode = '23514';
    end if;
    if new.published_at is null then
      new.published_at := now();
    end if;
  end if;
  return new;
end $$;

create trigger assignments_before_write
  before insert or update on public.assignments
  for each row execute function public.assignments_before_write();

create or replace function public.assignments_after_publish()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status = 'published' and new.notified_at is null and (tg_op = 'INSERT' or old.status is distinct from 'published' or old.open_at is distinct from new.open_at) then
    perform public.notify_assignment(new.id);
  end if;
  return null;
end $$;

create trigger assignments_after_publish
  after insert or update of status, open_at on public.assignments
  for each row execute function public.assignments_after_publish();

-- Students may update their own open attempt, but only answers, integrity data and
-- (where "try a similar question" is allowed) the item list.
create or replace function public.submissions_guard()
returns trigger language plpgsql set search_path = '' as $$
declare
  s jsonb;
begin
  if coalesce((select auth.role()), 'service_role') = 'service_role' then
    return new;
  end if;
  if new.items is distinct from old.items and old.assignment_id is not null then
    select a.settings into s from public.assignments a where a.id = old.assignment_id;
    if not coalesce((s ->> 'retrySimilar')::boolean, false) then
      raise exception 'The questions in this assignment cannot be changed.' using errcode = '42501';
    end if;
  end if;
  return new;
end $$;

create trigger submissions_guard
  before update on public.submissions
  for each row execute function public.submissions_guard();

create or replace function public.announcements_after_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.notifications (user_id, kind, title, body, link)
  select e.student_id, 'announcement', new.title, left(new.body, 200), '/s'
  from public.enrollments e where e.class_id = new.class_id;
  return null;
end $$;

create trigger announcements_after_insert
  after insert on public.announcements
  for each row execute function public.announcements_after_insert();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.enrollments enable row level security;
alter table public.publications enable row level security;
alter table public.resources enable row level security;
alter table public.assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.skill_mastery enable row level security;
alter table public.skill_events enable row level security;
alter table public.notifications enable row level security;
alter table public.reminder_log enable row level security;
alter table public.announcements enable row level security;
alter table public.insights enable row level security;

create policy profiles_select on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.teaches_student(id) or public.is_my_teacher(id));
create policy profiles_update on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy classes_select on public.classes for select to authenticated
  using (teacher_id = (select auth.uid()) or public.is_enrolled(id));
create policy classes_insert on public.classes for insert to authenticated
  with check (teacher_id = (select auth.uid()) and public.my_role() = 'teacher');
create policy classes_update on public.classes for update to authenticated
  using (teacher_id = (select auth.uid())) with check (teacher_id = (select auth.uid()));
create policy classes_delete on public.classes for delete to authenticated
  using (teacher_id = (select auth.uid()));

create policy enrollments_select on public.enrollments for select to authenticated
  using (student_id = (select auth.uid()) or public.is_teacher_of(class_id));
create policy enrollments_delete on public.enrollments for delete to authenticated
  using (public.is_teacher_of(class_id) or student_id = (select auth.uid()));

create policy publications_select on public.publications for select to authenticated
  using (public.is_teacher_of(class_id) or public.is_enrolled(class_id));
create policy publications_write on public.publications for all to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));

create policy resources_select on public.resources for select to authenticated
  using (public.is_teacher_of(class_id) or public.is_enrolled(class_id));
create policy resources_write on public.resources for all to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));

create policy assignments_select on public.assignments for select to authenticated
  using (
    public.is_teacher_of(class_id)
    or (
      status = 'published'
      and (open_at is null or open_at <= now())
      and public.is_enrolled(class_id)
      and (assigned_to is null or (select auth.uid()) = any (assigned_to))
    )
  );
create policy assignments_write on public.assignments for all to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));

create policy submissions_select on public.submissions for select to authenticated
  using (student_id = (select auth.uid()) or public.is_teacher_of(class_id));
-- Direct inserts are only for self-directed practice; assignment attempts are created by
-- the grade-submission function so the server chooses the questions.
create policy submissions_insert_practice on public.submissions for insert to authenticated
  with check (
    student_id = (select auth.uid()) and assignment_id is null and status = 'in_progress' and public.is_enrolled(class_id)
  );
create policy submissions_update_own on public.submissions for update to authenticated
  using (student_id = (select auth.uid()) and status = 'in_progress')
  with check (student_id = (select auth.uid()) and status = 'in_progress');

create policy skill_mastery_select on public.skill_mastery for select to authenticated
  using (student_id = (select auth.uid()) or public.teaches_student(student_id));

create policy skill_events_select on public.skill_events for select to authenticated
  using (student_id = (select auth.uid()) or public.is_teacher_of(class_id));

create policy notifications_select on public.notifications for select to authenticated
  using (user_id = (select auth.uid()));
create policy notifications_update on public.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create policy announcements_select on public.announcements for select to authenticated
  using (public.is_teacher_of(class_id) or public.is_enrolled(class_id));
create policy announcements_insert on public.announcements for insert to authenticated
  with check (public.is_teacher_of(class_id) and author_id = (select auth.uid()));
create policy announcements_delete on public.announcements for delete to authenticated
  using (public.is_teacher_of(class_id));

create policy insights_select on public.insights for select to authenticated
  using (public.is_teacher_of(class_id));

-- reminder_log: no policies (service role and definer functions only).

-- ---------------------------------------------------------------------------
-- Privileges: start from nothing, then grant exactly what the app needs.
-- ---------------------------------------------------------------------------

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (full_name, avatar_color) on public.profiles to authenticated;

grant select, delete on public.classes to authenticated;
grant insert (teacher_id, name, section, course_id, settings) on public.classes to authenticated;
grant update (name, section, settings, archived) on public.classes to authenticated;

grant select, delete on public.enrollments to authenticated;

grant select, insert, update, delete on public.publications to authenticated;
grant select, insert, update, delete on public.resources to authenticated;

grant select, delete on public.assignments to authenticated;
grant insert (class_id, title, type, instructions, content, settings, open_at, due_at, allow_late, reminder_hours, assigned_to, status, created_by, ai_rationale)
  on public.assignments to authenticated;
grant update (title, type, instructions, content, settings, open_at, due_at, allow_late, reminder_hours, assigned_to, status, created_by, ai_rationale)
  on public.assignments to authenticated;

grant select on public.submissions to authenticated;
grant insert (assignment_id, class_id, student_id, attempt, status, seed, items, responses, practice_skill_ids) on public.submissions to authenticated;
grant update (responses, items, integrity) on public.submissions to authenticated;

grant select on public.skill_mastery to authenticated;
grant select on public.skill_events to authenticated;

grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;

grant select, insert, delete on public.announcements to authenticated;
grant select on public.insights to authenticated;

-- ---------------------------------------------------------------------------
-- RPCs
-- ---------------------------------------------------------------------------

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
  select * into c from public.classes where join_code = upper(trim(p_code)) and not archived;
  if not found then raise exception 'That class code was not found.'; end if;
  insert into public.enrollments (class_id, student_id) values (c.id, me.id) on conflict do nothing;
  get diagnostics n = row_count;
  if n > 0 then
    insert into public.notifications (user_id, kind, title, body, link)
    values (c.teacher_id, 'announcement', me.full_name || ' joined ' || c.name, 'A new student joined using the class code.', '/t/c/' || c.id || '/students');
  end if;
  return c;
end $$;

create or replace function public.regenerate_join_code(p_class_id uuid)
returns public.classes language plpgsql security definer set search_path = '' as $$
declare c public.classes;
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Not allowed.' using errcode = '42501'; end if;
  update public.classes set join_code = public.make_join_code() where id = p_class_id returning * into c;
  return c;
end $$;

create or replace function public.publish_assignment(p_assignment_id uuid)
returns public.assignments language plpgsql security definer set search_path = '' as $$
declare a public.assignments;
begin
  select * into a from public.assignments where id = p_assignment_id;
  if not found or not public.is_teacher_of(a.class_id) then raise exception 'Assignment not found.' using errcode = '42501'; end if;
  update public.assignments set status = 'published' where id = p_assignment_id returning * into a;
  return a;
end $$;

create or replace function public.remind_now(p_assignment_id uuid)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  a public.assignments;
  n integer;
begin
  select * into a from public.assignments where id = p_assignment_id;
  if not found or not public.is_teacher_of(a.class_id) then raise exception 'Assignment not found.' using errcode = '42501'; end if;
  if a.status <> 'published' then raise exception 'Publish the assignment first.'; end if;
  insert into public.notifications (user_id, kind, title, body, link, assignment_id)
  select e.student_id, 'reminder', 'Reminder from your teacher: ' || a.title,
         case when a.due_at is null then 'Please complete it soon.' else 'Due ' || public.fmt_due(a.due_at, a.class_id) || '. Please complete it soon.' end,
         '/s/work/' || a.id, a.id
  from public.enrollments e
  where e.class_id = a.class_id
    and (a.assigned_to is null or e.student_id = any (a.assigned_to))
    and not exists (select 1 from public.submissions s where s.assignment_id = a.id and s.student_id = e.student_id and s.status <> 'in_progress');
  get diagnostics n = row_count;
  return n;
end $$;

create or replace function public.set_insight_action_status(p_insight_id uuid, p_action_id text, p_status text)
returns void language plpgsql security definer set search_path = '' as $$
declare cid uuid;
begin
  if p_status not in ('proposed', 'accepted', 'dismissed', 'done') then raise exception 'Invalid status.'; end if;
  select class_id into cid from public.insights where id = p_insight_id;
  if not found or not public.is_teacher_of(cid) then raise exception 'Insight not found.' using errcode = '42501'; end if;
  update public.insights
  set data = jsonb_set(data, '{actions}', coalesce((
    select jsonb_agg(case when x ->> 'id' = p_action_id then x || jsonb_build_object('status', p_status) else x end order by ord)
    from jsonb_array_elements(data -> 'actions') with ordinality as t (x, ord)
  ), '[]'::jsonb))
  where id = p_insight_id;
end $$;

-- ---------------------------------------------------------------------------
-- Scheduled jobs
-- ---------------------------------------------------------------------------

-- Deadline reminders: for each published, open assignment, find the most urgent
-- reminder threshold that has passed and remind every assigned student who has
-- not submitted yet. Each (assignment, student, threshold, due date) is sent once,
-- so changing the due date re-arms the reminders. Also sends "new assignment"
-- notifications for assignments whose open date has arrived.
create or replace function public.send_due_reminders()
returns integer language plpgsql security definer set search_path = '' as $$
declare
  r record;
  n integer := 0;
begin
  for r in
    select id from public.assignments
    where status = 'published' and notified_at is null and (open_at is null or open_at <= now())
  loop
    perform public.notify_assignment(r.id);
  end loop;

  for r in
    with due as (
      select a.id, a.title, a.class_id, a.due_at, a.assigned_to,
             (select min(h) from unnest(a.reminder_hours) as h where h > 0 and a.due_at - make_interval(hours => h) <= now()) as urgent
      from public.assignments a
      where a.status = 'published' and a.due_at > now() and (a.open_at is null or a.open_at <= now())
    )
    select d.id as assignment_id, d.title, d.urgent, d.due_at, e.student_id
    from due d
    join public.enrollments e on e.class_id = d.class_id and (d.assigned_to is null or e.student_id = any (d.assigned_to))
    where d.urgent is not null
      and not exists (select 1 from public.submissions s where s.assignment_id = d.id and s.student_id = e.student_id and s.status <> 'in_progress')
      and not exists (select 1 from public.reminder_log l where l.assignment_id = d.id and l.student_id = e.student_id and l.hours = d.urgent and l.due_at = d.due_at)
  loop
    insert into public.reminder_log (assignment_id, student_id, hours, due_at) values (r.assignment_id, r.student_id, r.urgent, r.due_at) on conflict do nothing;
    insert into public.notifications (user_id, kind, title, body, link, assignment_id)
    values (r.student_id, 'reminder', 'Reminder: ' || r.title || ' is due soon',
            '“' || r.title || '” is due in less than ' || public.human_hours(r.urgent) || ' and you haven’t submitted it yet.',
            '/s/work/' || r.assignment_id, r.assignment_id);
    n := n + 1;
  end loop;
  return n;
end $$;

-- Calls the send-emails Edge Function. Reads two Vault secrets created during setup:
--   educore_project_url  e.g. https://abcd.supabase.co
--   educore_cron_secret  the same value as the function's EDUCORE_CRON_SECRET
create or replace function public.trigger_email_delivery()
returns void language plpgsql security definer set search_path = '' as $$
declare
  base text;
  secret text;
begin
  begin
    execute 'select decrypted_secret from vault.decrypted_secrets where name = $1' into base using 'educore_project_url';
    execute 'select decrypted_secret from vault.decrypted_secrets where name = $1' into secret using 'educore_cron_secret';
  exception when others then
    return;
  end;
  if base is null or secret is null then
    return;
  end if;
  execute 'select net.http_post(url := $1, headers := $2, body := $3)'
    using rtrim(base, '/') || '/functions/v1/send-emails',
          jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || secret),
          '{}'::jsonb;
end $$;

-- Internal functions are not callable through the API.
revoke execute on function public.send_due_reminders() from public, anon, authenticated;
revoke execute on function public.trigger_email_delivery() from public, anon, authenticated;
revoke execute on function public.notify_assignment(uuid) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.make_join_code() from public, anon, authenticated;
revoke execute on function public.join_class(text) from public, anon;
revoke execute on function public.regenerate_join_code(uuid) from public, anon;
revoke execute on function public.publish_assignment(uuid) from public, anon;
revoke execute on function public.remind_now(uuid) from public, anon;
revoke execute on function public.set_insight_action_status(uuid, text, text) from public, anon;
grant execute on function public.join_class(text) to authenticated;
grant execute on function public.regenerate_join_code(uuid) to authenticated;
grant execute on function public.publish_assignment(uuid) to authenticated;
grant execute on function public.remind_now(uuid) to authenticated;
grant execute on function public.set_insight_action_status(uuid, text, text) to authenticated;

-- Realtime: deliver new notifications to the signed-in user (RLS applies).
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    execute 'alter publication supabase_realtime add table public.notifications';
  end if;
end $$;

-- Schedule the jobs when pg_cron is available (it is on hosted Supabase).
do $$
begin
  begin
    execute 'create extension if not exists pg_cron';
  exception when others then
    raise notice 'pg_cron is not available here; schedule public.send_due_reminders() every 5 minutes yourself.';
    return;
  end;
  execute $cron$select cron.schedule('educore-due-reminders', '*/5 * * * *', 'select public.send_due_reminders()')$cron$;
  begin
    execute 'create extension if not exists pg_net';
    execute $cron$select cron.schedule('educore-send-emails', '*/10 * * * *', 'select public.trigger_email_delivery()')$cron$;
  exception when others then
    raise notice 'pg_net is not available; email delivery is not scheduled.';
  end;
end $$;
