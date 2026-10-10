-- Tighten function privileges flagged by the Supabase security advisor.

-- Trigger functions and formatting helpers are only used inside the database.
revoke execute on function public.announcements_after_insert() from public, anon, authenticated;
revoke execute on function public.assignments_after_publish() from public, anon, authenticated;
revoke execute on function public.classes_before_insert() from public, anon, authenticated;
revoke execute on function public.assignments_before_write() from public, anon, authenticated;
revoke execute on function public.submissions_guard() from public, anon, authenticated;
revoke execute on function public.class_tz(uuid) from public, anon, authenticated;
revoke execute on function public.fmt_due(timestamptz, uuid) from public, anon, authenticated;

-- Row-level security helpers: signed-in users need them, anonymous visitors do not.
-- Each one only answers questions about the caller's own memberships.
revoke execute on function public.is_teacher_of(uuid) from public, anon;
revoke execute on function public.is_enrolled(uuid) from public, anon;
revoke execute on function public.teaches_student(uuid) from public, anon;
revoke execute on function public.is_my_teacher(uuid) from public, anon;
revoke execute on function public.my_role() from public, anon;
grant execute on function public.is_teacher_of(uuid) to authenticated;
grant execute on function public.is_enrolled(uuid) to authenticated;
grant execute on function public.teaches_student(uuid) to authenticated;
grant execute on function public.is_my_teacher(uuid) to authenticated;
grant execute on function public.my_role() to authenticated;

-- Keep pg_net out of the API schema (it does not support ALTER EXTENSION ... SET SCHEMA).
do $$
begin
  if exists (
    select 1 from pg_extension e join pg_namespace n on n.oid = e.extnamespace
    where e.extname = 'pg_net' and n.nspname = 'public'
  ) then
    drop extension pg_net;
    create extension pg_net with schema extensions;
  end if;
end $$;
