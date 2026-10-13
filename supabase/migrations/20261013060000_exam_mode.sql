-- Exam mode (lockdown) for quizzes and exams, when the teacher turns it on per assessment:
-- full screen, with leaving it or switching tabs recorded in the attempt's integrity record;
-- optionally the attempt locks (or is submitted) after a set number of exits, and the camera must
-- be on (nothing is recorded or stored). See engine/integrity.ts for the same rules in the app.
--
-- A website cannot stop a student closing a tab, so the record is what the student's browser
-- reports. The database keeps the record from going backwards: a student's save cannot remove
-- exits or change the extra allowance a teacher grants by unlocking, and cannot change answers
-- while the attempt is locked.

-- Exits from exam conditions (leaving full screen or switching tabs) in an integrity record.
create or replace function public.integrity_exits(i jsonb)
returns integer language sql immutable set search_path = '' as $$
  select count(*)::integer
  from jsonb_array_elements(case when jsonb_typeof(i -> 'events') = 'array' then i -> 'events' else '[]'::jsonb end) e
  where e ->> 'kind' in ('tab', 'fullscreen');
$$;

-- Whether an attempt with these assignment settings and this record is locked.
create or replace function public.attempt_locked(s jsonb, i jsonb)
returns boolean language sql immutable set search_path = '' as $$
  select coalesce(s -> 'lockdown' = 'true'::jsonb, false)
    and coalesce(s ->> 'onMaxExits', 'lock') = 'lock'
    and jsonb_typeof(s -> 'maxExits') = 'number'
    and (s ->> 'maxExits')::numeric > 0
    and public.integrity_exits(i) >= (s ->> 'maxExits')::numeric
      + coalesce(case when jsonb_typeof(i -> 'extraExits') = 'number' then (i ->> 'extraExits')::numeric end, 0);
$$;

-- Students may update their own open attempt, but only answers, integrity data and (where "try a
-- similar question" is allowed) the item list. In exam mode the integrity record only grows, the
-- teacher's allowance is kept, and a locked attempt's answers cannot change.
create or replace function public.submissions_guard()
returns trigger language plpgsql set search_path = '' as $$
declare
  s jsonb;
  old_i jsonb := case when jsonb_typeof(old.integrity) = 'object' then old.integrity else '{}'::jsonb end;
begin
  if coalesce((select auth.role()), 'service_role') = 'service_role' then
    return new;
  end if;
  if old.assignment_id is not null then
    select a.settings into s from public.assignments a where a.id = old.assignment_id;
  end if;
  if new.items is distinct from old.items and old.assignment_id is not null then
    if not coalesce((s ->> 'retrySimilar')::boolean, false) then
      raise exception 'The questions in this assignment cannot be changed.' using errcode = '42501';
    end if;
  end if;
  if (select auth.uid()) = old.student_id then
    if jsonb_typeof(new.integrity) is distinct from 'object' then
      new.integrity := old_i;
    end if;
    if pg_column_size(new.integrity) > 30000 then
      raise exception 'The exam record is too large.';
    end if;
    -- The record only grows; the teacher's allowance is not the student's to change.
    if jsonb_typeof(old_i -> 'events') = 'array'
       and jsonb_array_length(old_i -> 'events') > coalesce(case when jsonb_typeof(new.integrity -> 'events') = 'array' then jsonb_array_length(new.integrity -> 'events') end, 0) then
      new.integrity := jsonb_set(new.integrity, '{events}', old_i -> 'events');
    end if;
    if jsonb_typeof(old_i -> 'blurCount') = 'number'
       and (old_i ->> 'blurCount')::numeric > coalesce(case when jsonb_typeof(new.integrity -> 'blurCount') = 'number' then (new.integrity ->> 'blurCount')::numeric end, 0) then
      new.integrity := jsonb_set(new.integrity, '{blurCount}', old_i -> 'blurCount');
    end if;
    new.integrity := (new.integrity - 'extraExits') || case when old_i ? 'extraExits' then jsonb_build_object('extraExits', old_i -> 'extraExits') else '{}'::jsonb end;
    if s is not null and public.attempt_locked(s, old_i)
       and (new.responses is distinct from old.responses or new.items is distinct from old.items) then
      raise exception 'This attempt is locked. Your teacher can unlock it.' using errcode = '42501';
    end if;
  end if;
  return new;
end $$;

-- Tell the teacher when an attempt locks, so they can unlock it during the exam.
create or replace function public.submissions_after_lock()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  a public.assignments;
  teacher uuid;
  who text;
begin
  if new.assignment_id is null or new.status <> 'in_progress' then return null; end if;
  select * into a from public.assignments where id = new.assignment_id;
  if not found or not public.attempt_locked(a.settings, new.integrity) or public.attempt_locked(a.settings, old.integrity) then return null; end if;
  select c.teacher_id into teacher from public.classes c where c.id = new.class_id;
  select p.full_name into who from public.profiles p where p.id = new.student_id;
  if teacher is not null then
    insert into public.notifications (user_id, kind, title, body, link, assignment_id)
    values (teacher, 'submission', coalesce(who, 'A student') || '''s attempt at ' || a.title || ' is locked',
            'They left exam mode ' || public.integrity_exits(new.integrity) || ' times. You can unlock the attempt on the assignment page.',
            '/t/c/' || new.class_id || '/assignments/' || a.id, a.id);
  end if;
  return null;
end $$;

create trigger submissions_after_lock
  after update of integrity on public.submissions
  for each row execute function public.submissions_after_lock();

-- The teacher unlocks a locked attempt: the student may leave exam mode as many times again.
create or replace function public.unlock_attempt(p_submission_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  s public.submissions;
  a public.assignments;
begin
  select * into s from public.submissions where id = p_submission_id for update;
  if not found or not public.is_teacher_of(s.class_id) then raise exception 'That attempt was not found.'; end if;
  if s.status <> 'in_progress' then raise exception 'Only an attempt in progress can be unlocked.'; end if;
  select * into a from public.assignments where id = s.assignment_id;
  update public.submissions
    set integrity = case when jsonb_typeof(integrity) = 'object' then integrity else '{}'::jsonb end
      || jsonb_build_object('extraExits', public.integrity_exits(integrity))
    where id = s.id;
  insert into public.notifications (user_id, kind, title, body, link, assignment_id)
  values (s.student_id, 'announcement', 'Your teacher unlocked ' || coalesce(a.title, 'your attempt'), 'You can carry on where you left off. Stay in full screen until you submit.',
          '/s/work/' || s.assignment_id || '/take', s.assignment_id);
end $$;

revoke execute on function public.unlock_attempt(uuid) from public, anon;
grant execute on function public.unlock_attempt(uuid) to authenticated;
