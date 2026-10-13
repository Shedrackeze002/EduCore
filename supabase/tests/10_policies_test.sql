-- Behavioural tests for the EduCore schema: run after 00_supabase_stub.sql and the
-- migrations on a throwaway database. Any failed check raises an exception.
\set ON_ERROR_STOP 1
set client_min_messages = warning;

create or replace function public._assert(cond boolean, msg text) returns void language plpgsql as $$
begin
  if not coalesce(cond, false) then raise exception 'ASSERTION FAILED: %', msg; end if;
end $$;
grant execute on function public._assert(boolean, text) to anon, authenticated;

-- Runs a statement that must fail.
create or replace function public._fails(stmt text, msg text) returns void language plpgsql as $$
begin
  begin
    execute stmt;
  exception when others then
    -- Mistakes in the test itself (syntax, unknown names, bad casts) must not count as "expected failure".
    if sqlstate in ('42601', '42703', '42P01', '42883', '42804', '22P02', '42702') then
      raise;
    end if;
    return;
  end;
  raise exception 'ASSERTION FAILED (statement succeeded): %', msg;
end $$;
grant execute on function public._fails(text, text) to anon, authenticated;

-- ---------------------------------------------------------------- users
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a1', 'teacher1@school.ca', '{"full_name":"Ms Teacher","role":"teacher"}'),
  ('00000000-0000-0000-0000-0000000000a2', 'teacher2@school.ca', '{"full_name":"Mr Other","role":"teacher"}'),
  ('00000000-0000-0000-0000-0000000000b1', 'sam@home.ca', '{"full_name":"Sam Student","role":"student"}');
insert into auth.users (id, email, raw_user_meta_data, raw_app_meta_data) values
  ('00000000-0000-0000-0000-0000000000b2', 'lee.k@students.educore.local', '{}', '{"role":"student","full_name":"Lee Kim","username":"lee.k"}');
-- A student cannot make themselves a teacher through app_metadata (only the service role sets it),
-- and a self-chosen username in user metadata is ignored.
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000b9', 'sneaky@home.ca', '{"full_name":"Sneaky","role":"student","username":"lee.k2"}');

select _assert((select role from profiles where id = '00000000-0000-0000-0000-0000000000a1') = 'teacher', 'teacher profile created');
select _assert((select role from profiles where id = '00000000-0000-0000-0000-0000000000b1') = 'student', 'student profile created');
select _assert((select username from profiles where id = '00000000-0000-0000-0000-0000000000b2') = 'lee.k', 'generated student gets username');
select _assert((select username from profiles where id = '00000000-0000-0000-0000-0000000000b9') is null, 'self-chosen username ignored');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a1') = 'pending', 'self-registered teachers wait for approval');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000b1') is null, 'students have no teacher status');

-- Bootstrap the first administrator (done once with SQL), who approves the other teacher.
update profiles set platform_admin = true, teacher_status = 'approved' where id = '00000000-0000-0000-0000-0000000000a1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000a2', 'Too early')$$, 'pending teachers cannot create classes');
select _fails($$update profiles set teacher_status = 'approved', platform_admin = true where id = '00000000-0000-0000-0000-0000000000a2'$$, 'users cannot approve or promote themselves');
select _fails($$select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a2', 'approved')$$, 'non-admins cannot approve teachers');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a2', 'approved');
reset role;
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a2') = 'approved', 'admin approved the teacher');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a2' and kind = 'admin') = 1, 'teacher told about approval');

-- ---------------------------------------------------------------- teacher creates a class
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into classes (teacher_id, name, section, course_id) values ('00000000-0000-0000-0000-0000000000a1', 'Math 10C', 'Block A', 'math-10c');
select _assert((select count(*) from classes) = 1, 'teacher sees own class');
select _assert((select join_code from classes) ~ '^[A-HJ-NP-Z2-9]{6}$', 'join code generated');
select _assert((select settings ->> 'timezone' from classes) = 'America/Edmonton', 'default settings merged');
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000a2', 'Fake')$$, 'cannot create a class for another teacher');
select _fails($$update classes set join_code = 'AAAAAA'$$, 'join code only changes via RPC');
reset role;

create temp table ctx as select id as class_id, join_code from classes limit 1;
grant select on ctx to authenticated, anon;

-- ---------------------------------------------------------------- students join
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into classes (teacher_id, name) values ('00000000-0000-0000-0000-0000000000b1', 'Mine')$$, 'students cannot create classes');
select _assert((select count(*) from classes) = 0, 'not enrolled yet: no classes visible');
select join_class((select lower(join_code) from ctx));
select _assert((select count(*) from classes) = 1, 'joined class is visible');
select _fails($$select join_class('ZZZZZZ')$$, 'unknown join code rejected');
reset role;

-- Self-registration with a join code enrols automatically.
insert into auth.users (id, email, raw_user_meta_data)
select '00000000-0000-0000-0000-0000000000b3', 'ana@home.ca', jsonb_build_object('full_name', 'Ana Lopez', 'role', 'student', 'join_code', join_code) from ctx;
-- The generated student is enrolled by the create-students function (service role).
insert into enrollments (class_id, student_id) select class_id, '00000000-0000-0000-0000-0000000000b2' from ctx;
select _assert((select count(*) from enrollments) = 3, 'three students enrolled');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and title like '%joined%') = 2, 'teacher told about self-joins');

-- ---------------------------------------------------------------- privacy between users
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 4, 'teacher sees self and 3 students');
select _fails($$insert into enrollments (class_id, student_id) select class_id, '00000000-0000-0000-0000-0000000000b9' from ctx$$, 'teachers cannot enrol arbitrary users directly');
select _fails($$update profiles set role = 'student' where id = '00000000-0000-0000-0000-0000000000a1'$$, 'role cannot be changed');
update profiles set full_name = 'Ms T. Teacher' where id = '00000000-0000-0000-0000-0000000000a1';
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 1, 'other teacher sees only self');
select _assert((select count(*) from classes) = 0, 'other teacher sees no foreign classes');
select _assert((select count(*) from enrollments) = 0, 'other teacher sees no foreign enrollments');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from profiles) = 2, 'student sees self and own teacher only');
select _assert((select count(*) from enrollments) = 1, 'student sees only own enrollment');
reset role;

-- ---------------------------------------------------------------- assignments
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into assignments (class_id, title, type, content, due_at)
select class_id, 'Homework 1', 'homework', '{"sections":[{"skillId":"m1-referents","count":3,"difficulty":"mixed"}],"custom":[]}', now() + interval '3 days' from ctx;
select _assert((select settings ->> 'attempts' from assignments where title = 'Homework 1') = '3', 'default settings by type');
insert into assignments (class_id, title, type, settings) select class_id, 'Empty quiz', 'quiz', '{}' from ctx;
select _fails($$select publish_assignment((select id from assignments where title = 'Empty quiz'))$$, 'cannot publish a quiz without questions');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 0, 'drafts are hidden from students');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select publish_assignment((select id from assignments where title = 'Homework 1'));
select _assert((select published_at is not null from assignments where title = 'Homework 1'), 'published_at set');
-- Targeted and future-dated assignments
insert into assignments (class_id, title, type, content, assigned_to, status)
select class_id, 'Only Sam', 'practice', '{"sections":[{"skillId":"m1-referents","count":2,"difficulty":1}],"custom":[]}', array['00000000-0000-0000-0000-0000000000b1'::uuid], 'published' from ctx;
insert into assignments (class_id, title, type, content, open_at, status)
select class_id, 'Opens tomorrow', 'lesson', '{"sections":[],"custom":[],"lessonId":"m10c-1-1"}', now() + interval '1 day', 'published' from ctx;
reset role;

select _assert((select count(*) from notifications where kind = 'assignment' and title like '%Homework 1') = 3, 'all 3 students notified on publish');
select _assert((select count(*) from notifications where kind = 'assignment' and title like '%Only Sam') = 1, 'targeted assignment notifies only target');
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 0, 'future assignment not announced yet');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 1, 'Lee sees Homework 1 only (not targeted, not future)');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from assignments) = 2, 'Sam sees Homework 1 and his targeted practice');
reset role;

-- Opening time arrives: the scheduler announces it.
update assignments set open_at = now() - interval '1 minute' where title = 'Opens tomorrow';
select send_due_reminders();
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 3, 'announced once open');
select send_due_reminders();
select _assert((select count(*) from notifications where title like '%Opens tomorrow') = 3, 'announced only once');

-- ---------------------------------------------------------------- submissions
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select (select id from assignments where title = 'Homework 1'), class_id, '00000000-0000-0000-0000-0000000000b1', 1 from ctx$$, 'students cannot create assignment attempts directly');
insert into submissions (assignment_id, class_id, student_id, seed, practice_skill_ids) select null, class_id, '00000000-0000-0000-0000-0000000000b1', 7, array['m1-referents'] from ctx;
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select null, class_id, '00000000-0000-0000-0000-0000000000b2', 7 from ctx$$, 'cannot create practice for someone else');
reset role;

-- The grade-submission function (service role) creates assignment attempts.
insert into submissions (assignment_id, class_id, student_id, seed, items)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 42, '[{"skillId":"m1-referents","seed":5,"difficulty":1}]'
from assignments a where a.title = 'Homework 1';
select _fails($$insert into submissions (assignment_id, class_id, student_id, seed) select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 43 from assignments a where a.title = 'Homework 1'$$, 'only one open attempt per assignment');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
update submissions set responses = '{"0":{"answers":["b"],"hintsUsed":0}}' where assignment_id is not null;
select _assert((select responses -> '0' ->> 'hintsUsed' from submissions where assignment_id is not null) = '0', 'student saves answers');
select _fails($$update submissions set score = 10, percent = 100 where assignment_id is not null$$, 'student cannot set a score');
select _fails($$update submissions set status = 'graded' where assignment_id is not null$$, 'student cannot change status');
-- Homework allows "try a similar question", so the item list may change.
update submissions set items = '[{"skillId":"m1-referents","seed":6,"difficulty":1}]' where assignment_id is not null;
reset role;

update assignments set settings = settings || '{"retrySimilar":false}' where title = 'Homework 1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$update submissions set items = '[{"skillId":"m1-referents","seed":999,"difficulty":1}]' where assignment_id is not null$$, 'items locked when retries are off');
reset role;
update assignments set settings = settings || '{"retrySimilar":true}' where title = 'Homework 1';

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from submissions) = 0, 'students cannot see each other''s work');
update submissions set responses = '{}' where student_id = '00000000-0000-0000-0000-0000000000b1';
reset role;
select _assert((select responses ? '0' from submissions where assignment_id is not null and student_id = '00000000-0000-0000-0000-0000000000b1' and status = 'in_progress'), 'cannot edit another student''s work');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from submissions) = 0, 'other teacher cannot see submissions');
select _assert((select count(*) from assignments) = 0, 'other teacher cannot see assignments');
reset role;

-- ---------------------------------------------------------------- reminders
-- Due in 90 minutes, reminders at 24h and 2h. Sam already submitted.
insert into assignments (class_id, title, type, content, due_at, reminder_hours, status)
select class_id, 'Due soon', 'homework', '{"sections":[{"skillId":"m1-referents","count":1,"difficulty":1}],"custom":[]}', now() + interval '90 minutes', '{24,2}', 'published' from ctx;
insert into submissions (assignment_id, class_id, student_id, seed, status, submitted_at)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b1', 1, 'graded', now() from assignments a where a.title = 'Due soon';
-- Lee has an attempt in progress but has not submitted: still reminded.
insert into submissions (assignment_id, class_id, student_id, seed)
select a.id, a.class_id, '00000000-0000-0000-0000-0000000000b2', 2 from assignments a where a.title = 'Due soon';

select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%') = 2, 'two unfinished students reminded');
select _assert(not exists (select 1 from notifications where kind = 'reminder' and title like '%Due soon%' and user_id = '00000000-0000-0000-0000-0000000000b1'), 'submitted student not reminded');
select _assert((select bool_and(body like '%less than 2 hours%') from notifications where kind = 'reminder' and title like '%Due soon%'), 'only the most urgent threshold is used');
select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%') = 2, 'reminders are not repeated');
-- Extending the deadline re-arms reminders.
update assignments set due_at = now() + interval '20 hours' where title = 'Due soon';
select send_due_reminders();
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Due soon%' and body like '%24 hours%') = 2, 'new deadline gets its own reminder');
-- Nothing for assignments far from due, drafts, or past due.
select _assert((select count(*) from notifications where kind = 'reminder' and title like '%Homework 1%') = 0, 'no reminder before the first threshold');

-- remind_now
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select remind_now((select id from assignments limit 1))$$, 'other teacher cannot send reminders');
reset role;
create temp table due_soon as select id from assignments where title = 'Due soon';
grant select on due_soon to authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select remind_now((select id from due_soon))) = 2, 'remind now skips students who submitted');
reset role;

-- ---------------------------------------------------------------- notifications & announcements
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from notifications) > 0 and (select count(*) from notifications where user_id <> '00000000-0000-0000-0000-0000000000b1') = 0, 'students see only their notifications');
update notifications set read_at = now();
select _fails($$update notifications set title = 'hacked'$$, 'only read_at is writable');
select _fails($$insert into announcements (class_id, author_id, title) select class_id, '00000000-0000-0000-0000-0000000000b1', 'hi' from ctx$$, 'students cannot post announcements');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into announcements (class_id, author_id, title, body) select class_id, '00000000-0000-0000-0000-0000000000a1', 'Test on Friday', 'Unit 1 test.' from ctx;
reset role;
select _assert((select count(*) from notifications where kind = 'announcement' and title = 'Test on Friday') = 3, 'announcement notifies the class');

-- ---------------------------------------------------------------- insights & mastery
insert into insights (class_id, student_id, source, data)
select class_id, null, 'offline', '{"headline":"h","actions":[{"id":"x1","status":"proposed"},{"id":"x2","status":"proposed"}]}' from ctx;
insert into skill_mastery (student_id, skill_id, p_known, level) values ('00000000-0000-0000-0000-0000000000b1', 'm1-referents', 0.5, 'familiar');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from insights) = 0, 'students cannot read teacher insights');
select _assert((select count(*) from skill_mastery) = 1, 'student sees own mastery');
select _fails($$update skill_mastery set p_known = 1$$, 'students cannot change mastery');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select set_insight_action_status((select id from insights limit 1), 'x2', 'done');
select _assert((select data -> 'actions' -> 1 ->> 'status' from insights limit 1) = 'done', 'action status updated');
select _assert((select data -> 'actions' -> 0 ->> 'status' from insights limit 1) = 'proposed', 'other actions untouched');
select _assert((select count(*) from skill_mastery) = 1, 'teacher sees students'' mastery');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select set_insight_action_status((select id from insights limit 1), 'x1', 'done')$$, 'other teacher cannot touch insights');
select _assert((select count(*) from skill_mastery) = 0, 'other teacher cannot see mastery');
reset role;

-- ---------------------------------------------------------------- platform administration
insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a3', 'newteacher@school.ca', '{"full_name":"New Teacher","role":"teacher"}');
select _assert((select count(*) from notifications where user_id = '00000000-0000-0000-0000-0000000000a1' and kind = 'admin' and title like '%waiting for approval%') = 1, 'admins told about a pending teacher');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _fails($$select admin_overview()$$, 'non-admins cannot see the overview');
select _fails($$select * from admin_users()$$, 'non-admins cannot list users');
select _fails($$select * from admin_classes()$$, 'non-admins cannot list classes');
select _fails($$select admin_set_setting('teacher_signup', '"open"')$$, 'non-admins cannot change settings');
select _fails($$select * from admin_audit()$$, 'non-admins cannot read the audit log');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', true)$$, 'non-admins cannot promote');
select _fails($$select count(*) from platform_settings$$, 'settings table is not readable directly');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((admin_overview() ->> 'pendingTeachers')::int = 1, 'overview counts pending teachers');
select _assert((admin_overview() ->> 'teachers')::int = 2, 'overview counts approved teachers');
select _assert((admin_overview() ->> 'classes')::int = 1, 'overview counts classes');
select _assert(jsonb_array_length(admin_overview() -> 'signupsByWeek') = 12, 'twelve weeks of sign-ups');
select _assert((select count(*) from admin_users(null, 'teacher', 'pending')) = 1, 'list pending teachers');
select _assert((select total from admin_users('lee', null, null) limit 1) = 1, 'search users by username');
select _assert((select students from admin_classes() limit 1) = 3, 'class list counts students');
select admin_set_teacher_status('00000000-0000-0000-0000-0000000000a3', 'rejected');
select _assert((select count(*) from admin_users(null, null, 'pending')) = 0, 'no pending teachers left');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a1', false)$$, 'the last administrator cannot be removed');
select _fails($$select admin_set_platform_admin('00000000-0000-0000-0000-0000000000b1', true)$$, 'students cannot become administrators');
select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', true);
select _assert((select count(*) from admin_users(null, null, 'admin')) = 2, 'second administrator added');
select admin_set_platform_admin('00000000-0000-0000-0000-0000000000a2', false);
select _fails($$select admin_set_setting('teacher_signup', '"anyone"')$$, 'invalid setting value rejected');
select _fails($$select admin_set_setting('free_money', 'true')$$, 'unknown setting rejected');
select admin_set_setting('teacher_signup', '"open"');
reset role;

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-0000-0000-0000000000a4', 'open@school.ca', '{"full_name":"Open Teacher","role":"teacher"}');
select _assert((select teacher_status from profiles where id = '00000000-0000-0000-0000-0000000000a4') = 'approved', 'open sign-up approves teachers immediately');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from admin_audit()) = 5, 'every successful administrative action is audited (failed ones are not)');
select _assert(exists (select 1 from admin_audit() where action = 'teacher_rejected' and target_name = 'New Teacher' and actor_name = 'Ms T. Teacher'), 'audit names actor and target');
reset role;

-- Disabled accounts lose administrator and teaching rights immediately.
update profiles set disabled_at = now() where id = '00000000-0000-0000-0000-0000000000a1';
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert(not is_platform_admin(), 'disabled administrator is not an administrator');
select _assert(not can_teach(), 'disabled teacher cannot teach');
reset role;
update profiles set disabled_at = null where id = '00000000-0000-0000-0000-0000000000a1';

select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _assert(signup_config() ->> 'teacherSignup' = 'open', 'sign-up page can read the sign-up mode');
select _fails($$select admin_overview()$$, 'anonymous visitors cannot see the overview');
reset role;

-- ---------------------------------------------------------------- presenting: hidden blocks and whiteboards
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into lesson_prefs (class_id, lesson_id, hidden) select class_id, 'm10c-1-1', array['md-abc'] from ctx;
select _assert((select hidden from lesson_prefs) = array['md-abc'], 'teacher hides a block from the slides');
insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', 'Private board', '[{"background":"grid","strokes":[]}]' from ctx;
insert into boards (class_id, lesson_id, title, pages, shared) select class_id, 'm10c-1-1', 'Shared board', '[]', true from ctx;
select _fails($$insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', 'Bad', '{}' from ctx$$, 'board pages must be a list');
select _fails($$insert into boards (class_id, lesson_id, title, pages) select class_id, 'm10c-1-1', '', '[]' from ctx$$, 'boards need a name');
select _assert((select count(*) from boards) = 2, 'teacher sees every board of the class');
update boards set title = 'Renamed board', updated_at = now() where title = 'Private board';
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from boards) = 1 and (select title from boards) = 'Shared board', 'students see only shared boards');
select _assert((select count(*) from lesson_prefs) = 0, 'students cannot read presenting choices');
select _fails($$insert into boards (class_id, lesson_id, title) select class_id, 'm10c-1-1', 'Mine' from ctx$$, 'students cannot save boards');
select _fails($$insert into lesson_prefs (class_id, lesson_id) select class_id, 'm10c-1-2' from ctx$$, 'students cannot hide blocks');
update boards set shared = true;
delete from boards;
reset role;
select _assert((select count(*) from boards where shared) = 1, 'students cannot share a board');
select _assert((select count(*) from boards) = 2, 'students cannot delete boards');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from boards) = 0, 'other teachers see no boards');
select _assert((select count(*) from lesson_prefs) = 0, 'other teachers see no presenting choices');
select _fails($$insert into boards (class_id, lesson_id, title) select class_id, 'm10c-1-1', 'Theirs' from ctx$$, 'other teachers cannot save boards to the class');
reset role;

-- ---------------------------------------------------------------- live class questions
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
insert into live_questions (class_id, lesson_id, skill_id, difficulty, seed) select class_id, 'm10c-1-1', 'm1-referents', 1, 42 from ctx;
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 43 from ctx$$, 'only one open question per class');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 4, 43 from ctx$$, 'difficulty is 1 to 3');
reset role;
create temp table lq as select id from live_questions limit 1;
grant select on lq to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_questions) = 1, 'students see their class''s question');
insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b1', '["a"]' from ctx;
update live_answers set responses = '["b"]', answered_at = now() where student_id = '00000000-0000-0000-0000-0000000000b1';
select _assert((select responses ->> 0 from live_answers) = 'b', 'students change their answer while the question is open');
select _fails($$insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b2', '["a"]' from ctx$$, 'students cannot answer for someone else');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 7 from ctx$$, 'students cannot ask questions');
-- Row-level security hides the question from a student's update, so nothing changes.
update live_questions set status = 'closed';
reset role;
select _assert((select status from live_questions) = 'open', 'students cannot close questions');

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2","role":"authenticated"}', false);
set role authenticated;
insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b2', '["c"]' from ctx;
select _assert((select count(*) from live_answers) = 1, 'students see only their own answers');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a2","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_questions) = 0, 'other teachers see no live questions');
select _assert((select count(*) from live_answers) = 0, 'other teachers see no live answers');
select _fails($$insert into live_questions (class_id, skill_id, difficulty, seed) select class_id, 'm1-referents', 1, 9 from ctx$$, 'other teachers cannot ask the class');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _assert((select count(*) from live_answers) = 2, 'the teacher sees every answer');
update live_questions set status = 'closed', closed_at = now();
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$update live_answers set responses = '["a"]' where student_id = '00000000-0000-0000-0000-0000000000b1'$$, 'answers are locked once the question closes');
select _fails($$insert into live_answers (question_id, class_id, student_id, responses) select (select id from lq), class_id, '00000000-0000-0000-0000-0000000000b9', '["a"]' from ctx$$, 'no new answers once the question closes');
reset role;
select _assert((select responses ->> 0 from live_answers where student_id = '00000000-0000-0000-0000-0000000000b1') = 'b', 'locked answer unchanged');

-- ---------------------------------------------------------------- self-paced study
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b9","role":"authenticated"}', false);
set role authenticated;
select start_self_paced('math-20-1', array['m201-1-1', 'm201-1-2']);
select start_self_paced('math-20-1', array['m201-1-2', 'm201-1-3']);
select _assert((select count(*) from classes where kind = 'self') = 1, 'one self-paced class per course');
select _assert((select teacher_id is null and settings ->> 'aiAutopilot' = 'true' from classes where kind = 'self'), 'self-paced classes have no teacher and the AI autopilot on');
select _assert((select count(*) from publications) = 3, 'every lesson passed is published, again on later calls');
select _fails($$select start_self_paced('../etc', array[]::text[])$$, 'unknown course names are rejected');
-- Only a class's teacher may update it, so a student's update changes nothing.
update classes set name = 'Mine' where kind = 'self';
reset role;
select _assert((select name from classes where kind = 'self') = 'Self-paced', 'students cannot change their self-paced class directly');
create temp table selfc as select id, join_code from classes where kind = 'self';
grant select on selfc to authenticated;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select join_class((select join_code from selfc))$$, 'a self-paced class cannot be joined with its code');
select _assert((select count(*) from classes where kind = 'self') = 0, 'students do not see other students'' self-paced classes');
reset role;

select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select start_self_paced('math-10c', array[]::text[])$$, 'teachers do not study self-paced');
select _assert((select count(*) from classes where kind = 'self') = 0, 'teachers do not see self-paced classes');
reset role;
select _fails($$insert into classes (teacher_id, name, course_id, kind) values (null, 'Bad', 'math-10c', 'teacher')$$, 'a teacher''s class needs a teacher');

-- ---------------------------------------------------------------- anon
select set_config('request.jwt.claims', '{"role":"anon"}', false);
set role anon;
select _fails($$select count(*) from classes$$, 'anon has no table access');
select _fails($$select send_due_reminders()$$, 'anon cannot run the scheduler');
reset role;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1","role":"authenticated"}', false);
set role authenticated;
select _fails($$select send_due_reminders()$$, 'users cannot run the scheduler');
reset role;

select 'ALL DATABASE TESTS PASSED' as result;
