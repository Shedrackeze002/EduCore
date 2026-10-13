-- Teacher edit suggestions: a teacher proposes new Markdown for one section of a lesson; an
-- administrator approves or declines it. Approved edits are a layer over the lesson files: the app
-- applies each one to the file section it was made from (named by a fingerprint of that section's
-- text), for every class. Approving a new edit for a section replaces the earlier one; reverting
-- returns the section to the file.

create table public.lesson_edits (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null check (lesson_id ~ '^[a-z0-9-]{1,40}$'),
  section_title text not null check (char_length(section_title) between 1 and 200),
  base_hash text not null check (base_hash ~ '^[0-9a-f]{8}$'),
  original text not null check (char_length(original) <= 20000),
  markdown text not null check (char_length(markdown) between 1 and 20000),
  reason text check (char_length(reason) <= 500),
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined', 'withdrawn', 'replaced', 'reverted')),
  admin_note text check (char_length(admin_note) <= 1000),
  author_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  decided_by uuid references public.profiles (id) on delete set null
);

-- At most one approved edit per file section.
create unique index lesson_edits_one_approved on public.lesson_edits (lesson_id, base_hash) where status = 'approved';
create index lesson_edits_status_idx on public.lesson_edits (status, created_at desc);
create index lesson_edits_author_idx on public.lesson_edits (author_id);

alter table public.lesson_edits enable row level security;

-- Approved edits are part of the lessons everyone reads; authors see their own suggestions and
-- administrators see all. Read-only to clients; the functions below make every change.
create policy lesson_edits_read on public.lesson_edits for select to authenticated
  using (status = 'approved' or author_id = (select auth.uid()) or public.is_platform_admin());

revoke all on public.lesson_edits from anon, authenticated;
grant select on public.lesson_edits to authenticated;

-- A teacher (or administrator) suggests an edit. At most 20 waiting suggestions per person.
create or replace function public.suggest_lesson_edit(p_lesson_id text, p_section_title text, p_base_hash text, p_original text, p_markdown text, p_reason text)
returns public.lesson_edits language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  e public.lesson_edits;
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if not (public.can_teach() or public.is_platform_admin()) then raise exception 'Only teachers can suggest lesson edits.' using errcode = '42501'; end if;
  if trim(coalesce(p_markdown, '')) = '' then raise exception 'The suggested section is empty.'; end if;
  if trim(coalesce(p_markdown, '')) = trim(coalesce(p_original, '')) then raise exception 'Change something before sending the suggestion.'; end if;
  if (select count(*) from public.lesson_edits x where x.author_id = me.id and x.status = 'pending') >= 20 then
    raise exception 'You have 20 suggestions waiting for review. Please wait for some to be reviewed.';
  end if;
  insert into public.lesson_edits (lesson_id, section_title, base_hash, original, markdown, reason, author_id)
  values (p_lesson_id, left(trim(p_section_title), 200), p_base_hash, p_original, trim(p_markdown), nullif(left(trim(coalesce(p_reason, '')), 500), ''), me.id)
  returning * into e;
  insert into public.notifications (user_id, kind, title, body, link)
  select p.id, 'admin', 'Lesson edit suggested: ' || e.section_title, me.full_name || ' suggested a change to lesson ' || e.lesson_id || '.', '/admin/edits'
  from public.profiles p where p.platform_admin and p.disabled_at is null and p.id <> me.id;
  return e;
end $$;

revoke execute on function public.suggest_lesson_edit(text, text, text, text, text, text) from public, anon;
grant execute on function public.suggest_lesson_edit(text, text, text, text, text, text) to authenticated;

-- The author withdraws a suggestion that is still waiting.
create or replace function public.withdraw_lesson_edit(p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.lesson_edits set status = 'withdrawn', decided_at = now()
  where id = p_id and author_id = (select auth.uid()) and status = 'pending';
  if not found then raise exception 'That suggestion was not found or has already been reviewed.'; end if;
end $$;

revoke execute on function public.withdraw_lesson_edit(uuid) from public, anon;
grant execute on function public.withdraw_lesson_edit(uuid) to authenticated;

-- The administrator's review list, with who suggested each edit.
create or replace function public.admin_lesson_edits(p_status text default null)
returns table (id uuid, lesson_id text, section_title text, base_hash text, original text, markdown text, reason text, status text, admin_note text,
               created_at timestamptz, decided_at timestamptz, author_id uuid, author_name text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_platform_admin() then raise exception 'Platform administrators only.' using errcode = '42501'; end if;
  return query
    select e.id, e.lesson_id, e.section_title, e.base_hash, e.original, e.markdown, e.reason, e.status, e.admin_note, e.created_at, e.decided_at, p.id, p.full_name
    from public.lesson_edits e join public.profiles p on p.id = e.author_id
    where p_status is null or e.status = p_status
    order by e.created_at desc
    limit 200;
end $$;

revoke execute on function public.admin_lesson_edits(text) from public, anon;
grant execute on function public.admin_lesson_edits(text) to authenticated;

-- Approve or decline a waiting suggestion, or revert an approved one. The author is told.
create or replace function public.admin_decide_lesson_edit(p_id uuid, p_status text, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  e public.lesson_edits;
  note text := nullif(left(trim(coalesce(p_note, '')), 1000), '');
begin
  if not public.is_platform_admin() then raise exception 'Platform administrators only.' using errcode = '42501'; end if;
  select * into e from public.lesson_edits where id = p_id for update;
  if not found then raise exception 'That suggestion was not found.'; end if;
  if p_status in ('approved', 'declined') and e.status <> 'pending' then raise exception 'Only waiting suggestions can be approved or declined.'; end if;
  if p_status = 'reverted' and e.status <> 'approved' then raise exception 'Only approved edits can be reverted.'; end if;
  if p_status not in ('approved', 'declined', 'reverted') then raise exception 'Unknown decision.'; end if;
  if p_status = 'approved' then
    update public.lesson_edits set status = 'replaced', decided_at = now(), decided_by = (select auth.uid())
    where lesson_id = e.lesson_id and base_hash = e.base_hash and status = 'approved';
  end if;
  update public.lesson_edits set status = p_status, admin_note = note, decided_at = now(), decided_by = (select auth.uid()) where id = e.id;
  perform public.admin_log('lesson_edit_' || p_status, e.author_id, jsonb_build_object('lesson', e.lesson_id, 'section', e.section_title));
  insert into public.notifications (user_id, kind, title, body, link)
  values (e.author_id, 'announcement',
    case p_status
      when 'approved' then 'Your lesson edit is live: ' || e.section_title
      when 'declined' then 'Your lesson edit was not accepted: ' || e.section_title
      else 'Your lesson edit was removed: ' || e.section_title
    end,
    coalesce(note, case p_status
      when 'approved' then 'Thank you. Every class now sees your change.'
      when 'declined' then 'Thank you for the suggestion. The section stays as it is for now.'
      else 'The section is back to the original lesson.'
    end),
    null);
end $$;

revoke execute on function public.admin_decide_lesson_edit(uuid, text, text) from public, anon;
grant execute on function public.admin_decide_lesson_edit(uuid, text, text) to authenticated;
