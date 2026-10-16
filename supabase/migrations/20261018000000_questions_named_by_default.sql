-- Students' questions show the student's name to the class unless the student chooses to hide it
-- (the owner's decision, 16 October 2026). The teacher always sees who asked.

alter table public.class_questions alter column anonymous set default false;

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
  values (p_class_id, pres.lesson_id, me, v_body, coalesce(p_anonymous, false), pres.started_at)
  returning * into q;
  return q;
end $$;
