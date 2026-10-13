-- Presenting: a teacher's hidden slide blocks per lesson, and whiteboards saved to a lesson.
-- Written to run safely more than once.

create table if not exists public.lesson_prefs (
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 40),
  -- Keys of lesson blocks hidden from the slides (students still see the whole lesson).
  hidden text[] not null default '{}' check (cardinality(hidden) <= 500),
  updated_at timestamptz not null default now(),
  primary key (class_id, lesson_id)
);

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  lesson_id text not null check (char_length(lesson_id) <= 40),
  title text not null check (char_length(title) between 1 and 120),
  -- Pages of vector ink: [{ background, strokes: [{ tool, color, size, points }] }].
  pages jsonb not null default '[]' check (jsonb_typeof(pages) = 'array' and octet_length(pages::text) <= 3000000),
  shared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists boards_class_lesson_idx on public.boards (class_id, lesson_id);

alter table public.lesson_prefs enable row level security;
alter table public.boards enable row level security;

-- Only the class's teacher reads or changes how a lesson is presented.
drop policy if exists lesson_prefs_teacher on public.lesson_prefs;
create policy lesson_prefs_teacher on public.lesson_prefs for all to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));

-- The teacher sees every board of the class; students see the boards shared with them.
drop policy if exists boards_select on public.boards;
create policy boards_select on public.boards for select to authenticated
  using (public.is_teacher_of(class_id) or (shared and public.is_enrolled(class_id)));
drop policy if exists boards_insert on public.boards;
create policy boards_insert on public.boards for insert to authenticated
  with check (public.is_teacher_of(class_id));
drop policy if exists boards_update on public.boards;
create policy boards_update on public.boards for update to authenticated
  using (public.is_teacher_of(class_id)) with check (public.is_teacher_of(class_id));
drop policy if exists boards_delete on public.boards;
create policy boards_delete on public.boards for delete to authenticated
  using (public.is_teacher_of(class_id));

revoke all on public.lesson_prefs from anon, authenticated;
revoke all on public.boards from anon, authenticated;
grant select, insert, update, delete on public.lesson_prefs to authenticated;
grant select, delete on public.boards to authenticated;
grant insert (class_id, lesson_id, title, pages, shared) on public.boards to authenticated;
grant update (title, pages, shared, updated_at) on public.boards to authenticated;
