-- Students' questions during a presentation. While the teacher presents a lesson, the class's
-- students can send a question from their own devices; it pops up on the teacher's screen to answer
-- or skip, and a "Questions" slide before the end lists everything asked. A student may keep their
-- name off the class's screen; the teacher still sees who asked.

-- The lesson a teacher is presenting to a class now. Present mode calls start_presenting when it
-- opens and again every minute, so a presentation left open in a closed tab ends by itself: it
-- counts as live only while seen_at is recent. Stopping sets ended_at (an update, not a delete, so
-- students' real-time subscriptions hear about it).
create table public.class_presentations (
  class_id uuid primary key references public.classes (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) between 1 and 40),
  started_at timestamptz not null default now(),
  seen_at timestamptz not null default now(),
  ended_at timestamptz
);

create table public.class_questions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) between 1 and 40),
  student_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 300 and btrim(body) <> ''),
  -- Kept off the class's screen; the teacher still sees the name.
  anonymous boolean not null default true,
  status text not null default 'new' check (status in ('new', 'answered', 'skipped')),
  -- When the presentation it was asked in began, so each presentation lists its own questions.
  presented_at timestamptz not null,
  created_at timestamptz not null default now(),
  decided_at timestamptz
);
create index class_questions_class_idx on public.class_questions (class_id, created_at desc);
create index class_questions_student_idx on public.class_questions (student_id, created_at desc);

alter table public.class_presentations enable row level security;
alter table public.class_questions enable row level security;

-- The class sees what is being presented; the teacher starts and stops it through the functions below.
create policy class_presentations_select on public.class_presentations for select to authenticated
  using (public.is_teacher_of(class_id) or public.is_enrolled(class_id));

-- The teacher sees every question in the class, a student only their own. Students ask through
-- ask_class_question; the teacher marks questions answered or skipped, or removes them.
create policy class_questions_select on public.class_questions for select to authenticated
  using (public.is_teacher_of(class_id) or student_id = (select auth.uid()));
create policy class_questions_update on public.class_questions for update to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));
create policy class_questions_delete on public.class_questions for delete to authenticated
  using (public.is_teacher_of(class_id));

revoke all on public.class_presentations from anon, authenticated;
revoke all on public.class_questions from anon, authenticated;
grant select on public.class_presentations to authenticated;
grant select, delete on public.class_questions to authenticated;
grant update (status, decided_at) on public.class_questions to authenticated;

-- Starts presenting a lesson to a class, or keeps it going (present mode calls this every minute).
-- The same lesson keeps its start time while it is live, and when the teacher comes back to it
-- within ten minutes (out of present mode and back in, or a reload), so its questions stay together;
-- another lesson, or the same one after a longer break, starts afresh.
create or replace function public.start_presenting(p_class_id uuid, p_lesson_id text)
returns timestamptz language plpgsql security definer set search_path = '' as $$
declare
  v_started timestamptz;
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Only the class''s teacher can present to it.' using errcode = '42501'; end if;
  if p_lesson_id is null or char_length(p_lesson_id) not between 1 and 40 then raise exception 'That lesson was not found.' using errcode = '22023'; end if;
  insert into public.class_presentations as p (class_id, lesson_id, started_at, seen_at, ended_at)
  values (p_class_id, p_lesson_id, now(), now(), null)
  on conflict (class_id) do update set
    started_at = case
      when p.lesson_id = excluded.lesson_id and coalesce(p.ended_at, p.seen_at) > now() - interval '10 minutes' then p.started_at
      else now()
    end,
    lesson_id = excluded.lesson_id,
    seen_at = now(),
    ended_at = null
  returning p.started_at into v_started;
  return v_started;
end $$;

create or replace function public.stop_presenting(p_class_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Only the class''s teacher can present to it.' using errcode = '42501'; end if;
  update public.class_presentations set ended_at = now() where class_id = p_class_id and ended_at is null;
end $$;

-- A student's question to the teacher, while the teacher is presenting to the class: at most five
-- in ten minutes, so the teacher's screen is not flooded.
create or replace function public.ask_class_question(p_class_id uuid, p_body text, p_anonymous boolean)
returns public.class_questions language plpgsql security definer set search_path = '' as $$
declare
  me uuid := (select auth.uid());
  v_body text := btrim(coalesce(p_body, ''));
  pres public.class_presentations;
  q public.class_questions;
begin
  if me is null or not public.is_enrolled(p_class_id) then raise exception 'You can only ask questions in your own class.' using errcode = '42501'; end if;
  if v_body = '' then raise exception 'Type your question first.' using errcode = '22023'; end if;
  if char_length(v_body) > 300 then raise exception 'Keep your question under 300 characters.' using errcode = '22023'; end if;
  select * into pres from public.class_presentations
  where class_id = p_class_id and ended_at is null and seen_at > now() - interval '5 minutes';
  if not found then raise exception 'Your teacher is not presenting right now.' using errcode = '55000'; end if;
  if (select count(*) from public.class_questions
      where student_id = me and class_id = p_class_id and created_at > now() - interval '10 minutes') >= 5 then
    raise exception 'You have asked five questions in the last ten minutes. Wait a little before asking another.' using errcode = '54000';
  end if;
  insert into public.class_questions (class_id, lesson_id, student_id, body, anonymous, presented_at)
  values (p_class_id, pres.lesson_id, me, v_body, coalesce(p_anonymous, true), pres.started_at)
  returning * into q;
  return q;
end $$;

revoke execute on function public.start_presenting(uuid, text) from public, anon;
revoke execute on function public.stop_presenting(uuid) from public, anon;
revoke execute on function public.ask_class_question(uuid, text, boolean) from public, anon;
grant execute on function public.start_presenting(uuid, text) to authenticated;
grant execute on function public.stop_presenting(uuid) to authenticated;
grant execute on function public.ask_class_question(uuid, text, boolean) to authenticated;

-- Realtime: students hear when the teacher starts or stops presenting, and the teacher hears about
-- new questions (row-level security applies).
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    execute 'alter publication supabase_realtime add table public.class_presentations, public.class_questions';
  end if;
end $$;
