-- Course requests: a student or teacher asks for a course or topic EduCore does not have yet. The
-- requests land in the admin inbox; an administrator approves one by opening a GitHub issue for a
-- build session (the link is stored here), declines it with a note, or marks it built.

create table public.course_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('course', 'topic')),
  title text not null check (char_length(title) between 3 and 120),
  grade integer check (grade between 1 and 12),
  details text check (char_length(details) <= 2000),
  status text not null default 'new' check (status in ('new', 'approved', 'declined', 'done')),
  admin_note text check (char_length(admin_note) <= 1000),
  issue_url text check (issue_url ~ '^https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+/issues/[0-9]+$'),
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create index course_requests_status_idx on public.course_requests (status, created_at desc);
create index course_requests_requester_idx on public.course_requests (requester_id);

alter table public.course_requests enable row level security;

-- Read-only to clients; the functions below make every change.
create policy course_requests_read on public.course_requests for select to authenticated
  using (requester_id = (select auth.uid()) or public.is_platform_admin());

revoke all on public.course_requests from anon, authenticated;
grant select on public.course_requests to authenticated;

-- A student or teacher asks for a course or topic. At most 5 requests a day per person.
create or replace function public.request_course(p_kind text, p_title text, p_grade integer, p_details text)
returns public.course_requests language plpgsql security definer set search_path = '' as $$
declare
  me public.profiles;
  r public.course_requests;
  t text := trim(coalesce(p_title, ''));
begin
  select * into me from public.profiles where id = (select auth.uid());
  if not found then raise exception 'Please sign in.' using errcode = '42501'; end if;
  if me.disabled_at is not null then raise exception 'This account is disabled.' using errcode = '42501'; end if;
  if p_kind not in ('course', 'topic') then raise exception 'Choose a course or a topic.'; end if;
  if char_length(t) < 3 or char_length(t) > 120 then raise exception 'Give the course or topic a name (3 to 120 characters).'; end if;
  if p_grade is not null and (p_grade < 1 or p_grade > 12) then raise exception 'Choose a grade from 1 to 12.'; end if;
  if (select count(*) from public.course_requests c where c.requester_id = me.id and c.created_at > now() - interval '1 day') >= 5 then
    raise exception 'You have sent 5 requests today. Please try again tomorrow.';
  end if;
  insert into public.course_requests (requester_id, kind, title, grade, details)
  values (me.id, p_kind, t, p_grade, nullif(left(trim(coalesce(p_details, '')), 2000), ''))
  returning * into r;
  insert into public.notifications (user_id, kind, title, body, link)
  select p.id, 'admin', 'New ' || p_kind || ' request: ' || t, me.full_name || ' (' || me.role || ') asked for it.', '/admin/requests'
  from public.profiles p where p.platform_admin and p.disabled_at is null;
  return r;
end $$;

revoke execute on function public.request_course(text, text, integer, text) from public, anon;
grant execute on function public.request_course(text, text, integer, text) to authenticated;

-- The admin inbox, with who asked.
create or replace function public.admin_course_requests(p_status text default null)
returns table (id uuid, kind text, title text, grade integer, details text, status text, admin_note text, issue_url text, created_at timestamptz, decided_at timestamptz,
               requester_id uuid, requester_name text, requester_role text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_platform_admin() then raise exception 'Platform administrators only.' using errcode = '42501'; end if;
  return query
    select r.id, r.kind, r.title, r.grade, r.details, r.status, r.admin_note, r.issue_url, r.created_at, r.decided_at, p.id, p.full_name, p.role
    from public.course_requests r join public.profiles p on p.id = r.requester_id
    where p_status is null or r.status = p_status
    order by r.created_at desc
    limit 200;
end $$;

revoke execute on function public.admin_course_requests(text) from public, anon;
grant execute on function public.admin_course_requests(text) to authenticated;

-- An administrator approves (with the GitHub issue link once it exists), declines with a note, or
-- marks a request built. The person who asked is told when the status changes.
create or replace function public.admin_update_course_request(p_id uuid, p_status text, p_note text, p_issue_url text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  r public.course_requests;
  note text := nullif(left(trim(coalesce(p_note, '')), 1000), '');
  url text := nullif(trim(coalesce(p_issue_url, '')), '');
begin
  if not public.is_platform_admin() then raise exception 'Platform administrators only.' using errcode = '42501'; end if;
  if p_status not in ('new', 'approved', 'declined', 'done') then raise exception 'Unknown status.'; end if;
  select * into r from public.course_requests where id = p_id for update;
  if not found then raise exception 'That request was not found.'; end if;
  update public.course_requests
    set status = p_status, admin_note = note, issue_url = url,
        decided_at = case when p_status = 'new' then null when p_status = r.status then r.decided_at else now() end
    where id = r.id;
  if p_status <> r.status then
    perform public.admin_log('course_request_' || p_status, r.requester_id, jsonb_build_object('title', r.title));
    if p_status in ('approved', 'declined', 'done') then
      insert into public.notifications (user_id, kind, title, body, link)
      values (r.requester_id, 'announcement',
        case p_status
          when 'approved' then 'Your request is planned: ' || r.title
          when 'done' then 'Now on EduCore: ' || r.title
          else 'Your request was not taken up: ' || r.title
        end,
        coalesce(note, case p_status
          when 'approved' then 'Thank you. We will build it and tell you when it is ready.'
          when 'done' then 'The course or topic you asked for is ready.'
          else 'Thank you for asking. It is not planned for now.'
        end),
        null);
    end if;
  end if;
end $$;

revoke execute on function public.admin_update_course_request(uuid, text, text, text) from public, anon;
grant execute on function public.admin_update_course_request(uuid, text, text, text) to authenticated;
