/**
 * join-class: joining a class by link with just a name (no email, username or password).
 *
 *  - "join" (anyone with the class link): makes a student account with only the name, asks the
 *    teacher, and returns a random sign-in that the device uses once and then keeps the session.
 *    The student never sees or types it, so there is nothing to remember or share.
 *  - "claim" (a signed-in name-only student): when the teacher matched this device's request to a
 *    student already in the class, the device takes over that student's account (and progress)
 *    with a fresh random sign-in; the device's own empty account is removed.
 *
 * The device signs in itself rather than this function signing in for it: sign-ins are limited
 * per internet address, and every call from here would share one.
 *
 * Limits keep a shared link from being used to make accounts in bulk: a class can have only so
 * many names waiting, and only so many can arrive in a short time.
 */
import { HttpError, readJson, serve } from '../_shared/http.ts';
import { adminClient, getCaller, str, type Db } from '../_shared/db.ts';

const DOMAIN = Deno.env.get('STUDENT_EMAIL_DOMAIN') ?? 'students.educore.local';
/** Names waiting in one class at a time. */
const MAX_WAITING = 60;
/** New names in one class within ten minutes. */
const MAX_BURST = 40;
/** Name-only accounts made across Gradileo within ten minutes. */
const MAX_GLOBAL_BURST = 300;
const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;

function cleanName(v: unknown, label: string): string {
  const s = str(v, 80).normalize('NFC').replace(/\s+/g, ' ').trim();
  if (!s) throw new HttpError(400, `Type your ${label}.`);
  if (s.length > 40 || !NAME.test(s)) throw new HttpError(400, `Use letters only in your ${label}.`);
  // "ama" becomes "Ama"; a name typed with capitals of its own ("McDonald") stays as typed.
  return s === s.toLowerCase() ? s.replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toUpperCase()) : s;
}

function secret(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

const since = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

async function join(db: Db, body: Record<string, unknown>) {
  const code = str(body.code, 12).trim().toUpperCase();
  const first = cleanName(body.firstName, 'first name');
  const last = cleanName(body.lastName, 'last name');
  const fullName = `${first} ${last}`;

  const { data: cls } = await db.from('classes').select('id, name, teacher_id').eq('join_code', code).eq('archived', false).eq('kind', 'teacher').maybeSingle();
  if (!cls) throw new HttpError(404, 'This class link is not valid. Ask your teacher for the link again.');

  const waiting = await db.from('join_requests').select('id', { count: 'exact', head: true }).eq('class_id', cls.id).eq('status', 'pending');
  if ((waiting.count ?? 0) >= MAX_WAITING) throw new HttpError(429, 'Many students are waiting to join this class. Ask your teacher to approve them, then try again.');
  const burst = await db.from('join_requests').select('id', { count: 'exact', head: true }).eq('class_id', cls.id).gte('created_at', since(10));
  if ((burst.count ?? 0) >= MAX_BURST) throw new HttpError(429, 'Many students joined this class just now. Try again in a few minutes.');
  const global = await db.from('profiles').select('id', { count: 'exact', head: true }).eq('name_only', true).gte('created_at', since(10));
  if ((global.count ?? 0) >= MAX_GLOBAL_BURST) throw new HttpError(429, 'Gradileo is busy. Try again in a few minutes.');

  const email = `n-${crypto.randomUUID()}@${DOMAIN}`;
  const password = secret();
  const { data: created, error } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: 'student', full_name: fullName },
    user_metadata: { full_name: fullName },
  });
  if (error || !created.user) throw new Error(error?.message ?? 'Could not create the account.');
  const id = created.user.id;
  try {
    const { error: e1 } = await db.from('profiles').update({ name_only: true }).eq('id', id);
    if (e1) throw new Error(e1.message);
    const { error: e2 } = await db.rpc('request_to_join_by_name', { p_student: id, p_class: cls.id });
    if (e2) throw new Error(e2.message);
  } catch (e) {
    await db.auth.admin.deleteUser(id);
    throw e;
  }
  const { data: teacher } = await db.from('profiles').select('full_name').eq('id', cls.teacher_id).maybeSingle();
  return {
    credentials: { email, password },
    result: { status: 'pending', classId: cls.id, className: cls.name, teacherName: teacher?.full_name ?? null },
  };
}

async function claim(db: Db, req: Request) {
  const me = await getCaller(req, db);
  const { data: device } = await db.from('profiles').select('name_only').eq('id', me.id).maybeSingle();
  if (!device?.name_only) throw new HttpError(403, 'Only a student who joined with a class link can do this.');
  const { data: target, error } = await db.rpc('name_only_takeover', { p_device: me.id });
  if (error) throw new Error(error.message);
  if (!target) return { credentials: null };
  const { data: user, error: e1 } = await db.auth.admin.getUserById(target as string);
  if (e1 || !user.user?.email) throw new Error(e1?.message ?? 'That student was not found.');
  // A fresh random password lets this device sign in; the student's other devices stay signed in.
  const password = secret();
  const { error: e2 } = await db.auth.admin.updateUserById(target as string, { password });
  if (e2) throw new Error(e2.message);
  // The device's own account was only ever a request to join; it goes now.
  await db.auth.admin.deleteUser(me.id);
  return { credentials: { email: user.user.email, password } };
}

serve(async (req) => {
  const db = adminClient();
  const body = await readJson(req);
  if (body.action === 'join') return join(db, body);
  if (body.action === 'claim') return claim(db, req);
  throw new HttpError(400, 'Unknown action.');
});
