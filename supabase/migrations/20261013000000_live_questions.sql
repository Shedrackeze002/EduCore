-- Live class questions: the teacher sends a question to the class during a lesson, students answer
-- on their own devices, and the results are shown on the slide.

create table public.live_questions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text check (lesson_id is null or char_length(lesson_id) <= 40),
  -- The skill, difficulty and seed fix the question, so every student gets the same one.
  skill_id text not null check (char_length(skill_id) between 1 and 80),
  difficulty smallint not null check (difficulty between 1 and 3),
  seed bigint not null check (seed >= 0),
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);
-- At most one open question per class.
create unique index live_questions_one_open on public.live_questions (class_id) where status = 'open';
create index live_questions_class_idx on public.live_questions (class_id, created_at desc);

create table public.live_answers (
  question_id uuid not null references public.live_questions (id) on delete cascade,
  class_id uuid not null references public.classes (id) on delete cascade,
  student_id uuid not null references public.profiles (id) on delete cascade,
  responses jsonb not null check (jsonb_typeof(responses) = 'array' and octet_length(responses::text) <= 8000),
  answered_at timestamptz not null default now(),
  primary key (question_id, student_id)
);
create index live_answers_class_idx on public.live_answers (class_id);

alter table public.live_questions enable row level security;
alter table public.live_answers enable row level security;

-- The class sees its questions; only its teacher asks and closes them.
create policy live_questions_select on public.live_questions for select to authenticated
  using (public.is_teacher_of(class_id) or public.is_enrolled(class_id));
create policy live_questions_insert on public.live_questions for insert to authenticated
  with check (public.is_teacher_of(class_id) and status = 'open');
create policy live_questions_update on public.live_questions for update to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));
create policy live_questions_delete on public.live_questions for delete to authenticated
  using (public.is_teacher_of(class_id));

-- A student answers for themselves, in their own class, while the question is open, and may change
-- the answer until it closes. The teacher sees every answer; a student only their own.
create policy live_answers_select on public.live_answers for select to authenticated
  using (public.is_teacher_of(class_id) or student_id = (select auth.uid()));
create policy live_answers_insert on public.live_answers for insert to authenticated
  with check (
    student_id = (select auth.uid())
    and public.is_enrolled(class_id)
    and exists (select 1 from public.live_questions q where q.id = question_id and q.class_id = live_answers.class_id and q.status = 'open')
  );
create policy live_answers_update on public.live_answers for update to authenticated
  using (student_id = (select auth.uid()))
  with check (
    student_id = (select auth.uid())
    and public.is_enrolled(class_id)
    and exists (select 1 from public.live_questions q where q.id = question_id and q.class_id = live_answers.class_id and q.status = 'open')
  );
create policy live_answers_delete on public.live_answers for delete to authenticated
  using (public.is_teacher_of(class_id));

revoke all on public.live_questions from anon, authenticated;
revoke all on public.live_answers from anon, authenticated;
grant select, delete on public.live_questions to authenticated;
grant insert (class_id, lesson_id, skill_id, difficulty, seed) on public.live_questions to authenticated;
grant update (status, closed_at) on public.live_questions to authenticated;
grant select, delete on public.live_answers to authenticated;
grant insert (question_id, class_id, student_id, responses, answered_at) on public.live_answers to authenticated;
grant update (responses, answered_at) on public.live_answers to authenticated;

-- Realtime: students hear about new questions and the teacher about new answers (RLS applies).
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    execute 'alter publication supabase_realtime add table public.live_questions, public.live_answers';
  end if;
end $$;
