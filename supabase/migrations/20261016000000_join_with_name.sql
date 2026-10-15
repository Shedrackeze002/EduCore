-- Joining a class by link with just a name: no email, username or password (the owner's decision,
-- to collect as little as possible). The join-class Edge Function makes the account and signs it in
-- on the student's device, which keeps it; the request always waits for the teacher, who approves
-- the names in one go. A student back on another device asks again with the same name, the teacher
-- marks the request as the student already in the class, and that device takes over the student's
-- account (join-class "claim"), so their progress comes with them.

alter table public.profiles add column name_only boolean not null default false;
comment on column public.profiles.name_only is 'Joined a class by link with only a name: no email or password; the device keeps the session.';

alter table public.join_requests add column same_as uuid references public.profiles (id) on delete set null;
comment on column public.join_requests.same_as is 'Approved as this student already in the class: the requesting device takes over that account.';

-- What someone with a class link sees before joining: the class's and the teacher's names.
create or replace function public.class_for_join(p_code text)
returns table (class_name text, teacher_name text)
language sql stable security definer set search_path = '' as $$
  select c.name, t.full_name
  from public.classes c
  left join public.profiles t on t.id = c.teacher_id
  where c.join_code = upper(trim(p_code)) and not c.archived and c.kind = 'teacher';
$$;

revoke execute on function public.class_for_join(text) from public;
grant execute on function public.class_for_join(text) to anon, authenticated;

-- A name-only student's request (join-class, as the service role). It always waits for the teacher,
-- whatever the class's approval setting, because anyone with the link can use it.
create or replace function public.request_to_join_by_name(p_student uuid, p_class uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare
  c public.classes;
  s public.profiles;
begin
  select * into c from public.classes where id = p_class and not archived and kind = 'teacher';
  if not found then raise exception 'That class was not found.'; end if;
  select * into s from public.profiles where id = p_student and name_only;
  if not found then raise exception 'That student was not found.'; end if;
  perform public.add_join_request(c, s.id, s.full_name, null);
end $$;

revoke execute on function public.request_to_join_by_name(uuid, uuid) from public, anon, authenticated;
grant execute on function public.request_to_join_by_name(uuid, uuid) to service_role;

-- A class's pending requests, now with whether each came from the link, and the name-only student
-- already in the class with the same name (most likely the same student on another device).
drop function public.class_join_requests(uuid);
create function public.class_join_requests(p_class_id uuid)
returns table (id uuid, student_id uuid, full_name text, email text, message text, created_at timestamptz, name_only boolean, match_id uuid, match_name text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Only the teacher of this class can see its requests.' using errcode = '42501'; end if;
  return query
    select r.id, r.student_id, p.full_name, case when p.name_only then null else p.email end, r.message, r.created_at, p.name_only, m.id, m.full_name
    from public.join_requests r
    join public.profiles p on p.id = r.student_id
    left join lateral (
      select s.id, s.full_name
      from public.enrollments e
      join public.profiles s on s.id = e.student_id
      where e.class_id = p_class_id and p.name_only and s.name_only and s.id <> p.id
        and lower(regexp_replace(trim(s.full_name), '\s+', ' ', 'g')) = lower(regexp_replace(trim(p.full_name), '\s+', ' ', 'g'))
      order by e.joined_at
      limit 1
    ) m on true
    where r.class_id = p_class_id and r.status = 'pending'
    order by r.created_at;
end $$;

revoke execute on function public.class_join_requests(uuid) from public, anon;
grant execute on function public.class_join_requests(uuid) to authenticated;

-- A student's requests, now with whether one was approved as a student already in the class.
drop function public.my_join_requests();
create function public.my_join_requests()
returns table (id uuid, class_id uuid, class_name text, section text, course_id text, teacher_name text, status text, created_at timestamptz, decided_at timestamptz, linked boolean)
language sql stable security definer set search_path = '' as $$
  select r.id, r.class_id, c.name, c.section, c.course_id, t.full_name, r.status, r.created_at, r.decided_at, r.status = 'approved' and r.same_as is not null
  from public.join_requests r
  join public.classes c on c.id = r.class_id
  left join public.profiles t on t.id = c.teacher_id
  where r.student_id = (select auth.uid())
  order by r.created_at desc
  limit 20;
$$;

revoke execute on function public.my_join_requests() from public, anon;
grant execute on function public.my_join_requests() to authenticated;

-- The teacher decides several requests at once. Each decision is {"id", "approve", "sameAs"}. With
-- sameAs, an approved name-only request is the same student as a name-only student already in the
-- class: nothing is enrolled, and the requesting device takes over that student's account.
create or replace function public.decide_join_requests(p_class_id uuid, p_decisions jsonb)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  d jsonb;
  r public.join_requests;
  c public.classes;
  approve boolean;
  same uuid;
  n integer := 0;
begin
  if not public.is_teacher_of(p_class_id) then raise exception 'Only the teacher of this class can decide its requests.' using errcode = '42501'; end if;
  if jsonb_typeof(p_decisions) is distinct from 'array' or jsonb_array_length(p_decisions) > 200 then raise exception 'Send up to 200 decisions at a time.'; end if;
  select * into c from public.classes where id = p_class_id;
  for d in select * from jsonb_array_elements(p_decisions) loop
    select * into r from public.join_requests where id = (d ->> 'id')::uuid and class_id = p_class_id for update;
    if not found or r.status <> 'pending' then continue; end if;
    approve := coalesce((d ->> 'approve')::boolean, false);
    same := nullif(d ->> 'sameAs', '')::uuid;
    if approve and same is not null then
      if not exists (select 1 from public.profiles p where p.id = r.student_id and p.name_only)
         or not exists (
           select 1 from public.enrollments e join public.profiles s on s.id = e.student_id
           where e.class_id = p_class_id and e.student_id = same and s.name_only and same <> r.student_id) then
        raise exception 'Only a student who joined with the class link can be matched to one already in the class.';
      end if;
      update public.join_requests set status = 'approved', same_as = same, decided_at = now() where id = r.id;
    elsif approve then
      update public.join_requests set status = 'approved', decided_at = now() where id = r.id;
      insert into public.enrollments (class_id, student_id) values (p_class_id, r.student_id) on conflict do nothing;
      insert into public.notifications (user_id, kind, title, body, link)
      values (r.student_id, 'announcement', 'You joined ' || c.name, 'Your teacher approved your request. The class is now in your course list.', '/s');
    else
      update public.join_requests set status = 'declined', decided_at = now() where id = r.id;
      insert into public.notifications (user_id, kind, title, body, link)
      values (r.student_id, 'announcement', 'Your request to join ' || c.name || ' was declined', 'Check the class link with your teacher.', '/s/join');
    end if;
    n := n + 1;
  end loop;
  return n;
end $$;

revoke execute on function public.decide_join_requests(uuid, jsonb) from public, anon;
grant execute on function public.decide_join_requests(uuid, jsonb) to authenticated;

-- The account a device may take over (join-class "claim", as the service role): the name-only
-- student its approved request was matched to, still in the class and not disabled.
create or replace function public.name_only_takeover(p_device uuid)
returns uuid language sql stable security definer set search_path = '' as $$
  select r.same_as
  from public.join_requests r
  join public.profiles d on d.id = r.student_id and d.name_only
  join public.profiles s on s.id = r.same_as and s.name_only and s.disabled_at is null
  where r.student_id = p_device and r.status = 'approved'
    and exists (select 1 from public.enrollments e where e.class_id = r.class_id and e.student_id = r.same_as)
  order by r.decided_at desc
  limit 1;
$$;

revoke execute on function public.name_only_takeover(uuid) from public, anon, authenticated;
grant execute on function public.name_only_takeover(uuid) to service_role;

-- Name-only accounts that never got into a class are removed: a day after being declined, after
-- 30 days still waiting, or a week after being matched to a student without taking over. An
-- account in any class (or studying on its own) is kept.
create or replace function public.prune_name_only_accounts()
returns integer language plpgsql security definer set search_path = '' as $$
declare
  n integer;
begin
  delete from auth.users u
  using public.profiles p
  where p.id = u.id and p.name_only
    and u.created_at < now() - interval '1 day'
    and not exists (select 1 from public.enrollments e where e.student_id = p.id)
    and not exists (
      select 1 from public.join_requests r
      where r.student_id = p.id and (
        (r.status = 'pending' and r.created_at > now() - interval '30 days')
        or (r.status = 'approved' and r.same_as is not null and r.decided_at > now() - interval '7 days')
        or (r.status = 'declined' and r.decided_at > now() - interval '1 day')));
  get diagnostics n = row_count;
  return n;
end $$;

revoke execute on function public.prune_name_only_accounts() from public, anon, authenticated;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    execute $cron$select cron.schedule('gradileo-prune-name-only', '17 3 * * *', 'select public.prune_name_only_accounts()')$cron$;
  else
    raise notice 'pg_cron is not available here; run public.prune_name_only_accounts() daily yourself.';
  end if;
end $$;
