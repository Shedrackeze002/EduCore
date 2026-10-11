-- Platform administration, part 2: the administrator RPCs (each checks the caller).

-- ---------------------------------------------------------------------------
-- Administrator RPCs (each checks the caller is an active platform administrator)
-- ---------------------------------------------------------------------------

create or replace function public.admin_overview()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  result jsonb;
begin
  perform public.admin_require();
  select jsonb_build_object(
    'teachers', (select count(*) from public.profiles where role = 'teacher' and teacher_status = 'approved' and disabled_at is null),
    'pendingTeachers', (select count(*) from public.profiles where role = 'teacher' and teacher_status = 'pending'),
    'students', (select count(*) from public.profiles where role = 'student' and disabled_at is null),
    'disabled', (select count(*) from public.profiles where disabled_at is not null),
    'classes', (select count(*) from public.classes where not archived),
    'assignments', (select count(*) from public.assignments where status = 'published'),
    'submissions7d', (select count(*) from public.submissions where submitted_at > now() - interval '7 days'),
    'activeStudents7d', (select count(distinct student_id) from public.submissions where submitted_at > now() - interval '7 days'),
    'aiInsights30d', (select count(*) from public.insights where created_at > now() - interval '30 days'),
    'signupsByWeek', (
      select coalesce(jsonb_agg(jsonb_build_object('week', to_char(w, 'YYYY-MM-DD'), 'teachers', t, 'students', s) order by w), '[]'::jsonb)
      from (
        select w,
               (select count(*) from public.profiles p where p.role = 'teacher' and p.created_at >= w and p.created_at < w + interval '7 days') as t,
               (select count(*) from public.profiles p where p.role = 'student' and p.created_at >= w and p.created_at < w + interval '7 days') as s
        from generate_series(date_trunc('week', now()) - interval '11 weeks', date_trunc('week', now()), interval '1 week') as w
      ) weeks
    )
  ) into result;
  return result;
end $$;

create or replace function public.admin_users(p_search text default null, p_role text default null, p_status text default null, p_limit integer default 50, p_offset integer default 0)
returns table (
  id uuid, role text, full_name text, email text, username text, avatar_color text, created_at timestamptz,
  last_sign_in_at timestamptz, platform_admin boolean, teacher_status text, disabled_at timestamptz, classes bigint, total bigint
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select p.id, p.role, p.full_name, p.email, p.username, p.avatar_color, p.created_at, u.last_sign_in_at,
         p.platform_admin, p.teacher_status, p.disabled_at,
         case when p.role = 'teacher' then (select count(*) from public.classes c where c.teacher_id = p.id)
              else (select count(*) from public.enrollments e where e.student_id = p.id) end,
         count(*) over ()
  from public.profiles p
  left join auth.users u on u.id = p.id
  where (coalesce(p_search, '') = '' or p.full_name ilike '%' || p_search || '%' or p.email ilike '%' || p_search || '%' or coalesce(p.username, '') ilike '%' || p_search || '%')
    and (coalesce(p_role, '') = '' or p.role = p_role)
    and (
      coalesce(p_status, '') = ''
      or (p_status = 'pending' and p.teacher_status = 'pending')
      or (p_status = 'disabled' and p.disabled_at is not null)
      or (p_status = 'admin' and p.platform_admin)
      or (p_status = 'active' and p.disabled_at is null and coalesce(p.teacher_status, 'approved') = 'approved')
    )
  order by p.created_at desc
  limit least(greatest(coalesce(p_limit, 50), 1), 200) offset greatest(coalesce(p_offset, 0), 0);
end $$;

create or replace function public.admin_classes(p_search text default null, p_limit integer default 50, p_offset integer default 0)
returns table (
  id uuid, name text, section text, course_id text, teacher_id uuid, teacher_name text, students bigint,
  assignments bigint, last_activity timestamptz, created_at timestamptz, archived boolean, total bigint
)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select c.id, c.name, c.section, c.course_id, c.teacher_id, t.full_name,
         (select count(*) from public.enrollments e where e.class_id = c.id),
         (select count(*) from public.assignments a where a.class_id = c.id and a.status = 'published'),
         greatest((select max(s.submitted_at) from public.submissions s where s.class_id = c.id),
                  (select max(a.created_at) from public.assignments a where a.class_id = c.id), c.created_at),
         c.created_at, c.archived, count(*) over ()
  from public.classes c
  join public.profiles t on t.id = c.teacher_id
  where coalesce(p_search, '') = '' or c.name ilike '%' || p_search || '%' or t.full_name ilike '%' || p_search || '%'
  order by 9 desc nulls last
  limit least(greatest(coalesce(p_limit, 50), 1), 200) offset greatest(coalesce(p_offset, 0), 0);
end $$;

create or replace function public.admin_set_teacher_status(p_user uuid, p_status text)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
begin
  perform public.admin_require();
  if p_status not in ('approved', 'pending', 'rejected') then raise exception 'Invalid status.'; end if;
  select * into p from public.profiles where id = p_user;
  if not found or p.role <> 'teacher' then raise exception 'Teacher not found.'; end if;
  update public.profiles set teacher_status = p_status where id = p_user;
  perform public.admin_log('teacher_' || p_status, p_user, jsonb_build_object('from', p.teacher_status));
  if p_status = 'approved' and p.teacher_status is distinct from 'approved' then
    insert into public.notifications (user_id, kind, title, body, link)
    values (p_user, 'admin', 'Your teacher account is approved', 'You can now create classes and invite students.', '/t');
  end if;
end $$;

create or replace function public.admin_set_platform_admin(p_user uuid, p_on boolean)
returns void language plpgsql security definer set search_path = '' as $$
declare
  p public.profiles;
begin
  perform public.admin_require();
  select * into p from public.profiles where id = p_user;
  if not found then raise exception 'User not found.'; end if;
  if p_on and p.role <> 'teacher' then raise exception 'Only teacher accounts can be administrators.'; end if;
  if not p_on and not exists (select 1 from public.profiles where platform_admin and disabled_at is null and id <> p_user) then
    raise exception 'EduCore needs at least one administrator.';
  end if;
  update public.profiles set platform_admin = p_on, teacher_status = case when p_on then 'approved' else teacher_status end where id = p_user;
  perform public.admin_log(case when p_on then 'admin_granted' else 'admin_revoked' end, p_user, '{}'::jsonb);
end $$;

create or replace function public.admin_get_settings()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  perform public.admin_require();
  return (select coalesce(jsonb_object_agg(key, value), '{}'::jsonb) from public.platform_settings);
end $$;

create or replace function public.admin_set_setting(p_key text, p_value jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  old jsonb;
begin
  perform public.admin_require();
  if p_key = 'teacher_signup' then
    if p_value #>> '{}' not in ('open', 'approval') then raise exception 'Teacher sign-up must be "open" or "approval".'; end if;
  else
    raise exception 'Unknown setting.';
  end if;
  select value into old from public.platform_settings where key = p_key;
  insert into public.platform_settings (key, value, updated_at, updated_by) values (p_key, p_value, now(), (select auth.uid()))
  on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at, updated_by = excluded.updated_by;
  perform public.admin_log('setting_changed', null, jsonb_build_object('key', p_key, 'from', old, 'to', p_value));
  return public.admin_get_settings();
end $$;

create or replace function public.admin_audit(p_limit integer default 100)
returns table (id bigint, created_at timestamptz, action text, actor_name text, target_name text, details jsonb)
language plpgsql stable security definer set search_path = '' as $$
#variable_conflict use_column
begin
  perform public.admin_require();
  return query
  select l.id, l.created_at, l.action, a.full_name, t.full_name, l.details
  from public.admin_audit_log l
  left join public.profiles a on a.id = l.actor_id
  left join public.profiles t on t.id = l.target_user
  order by l.created_at desc, l.id desc
  limit least(greatest(coalesce(p_limit, 100), 1), 500);
end $$;

-- What the sign-up page needs to know (safe for anonymous visitors).
create or replace function public.signup_config()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('teacherSignup', coalesce((select s.value #>> '{}' from public.platform_settings s where s.key = 'teacher_signup'), 'approval'));
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------

revoke execute on function public.admin_overview() from public, anon;
revoke execute on function public.admin_users(text, text, text, integer, integer) from public, anon;
revoke execute on function public.admin_classes(text, integer, integer) from public, anon;
revoke execute on function public.admin_set_teacher_status(uuid, text) from public, anon;
revoke execute on function public.admin_set_platform_admin(uuid, boolean) from public, anon;
revoke execute on function public.admin_get_settings() from public, anon;
revoke execute on function public.admin_set_setting(text, jsonb) from public, anon;
revoke execute on function public.admin_audit(integer) from public, anon;
grant execute on function public.admin_overview() to authenticated;
grant execute on function public.admin_users(text, text, text, integer, integer) to authenticated;
grant execute on function public.admin_classes(text, integer, integer) to authenticated;
grant execute on function public.admin_set_teacher_status(uuid, text) to authenticated;
grant execute on function public.admin_set_platform_admin(uuid, boolean) to authenticated;
grant execute on function public.admin_get_settings() to authenticated;
grant execute on function public.admin_set_setting(text, jsonb) to authenticated;
grant execute on function public.admin_audit(integer) to authenticated;
grant execute on function public.signup_config() to anon, authenticated;
