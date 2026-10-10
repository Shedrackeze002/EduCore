/** Service-role database client and caller authentication. */
import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { HttpError } from './http.ts';

export type Db = SupabaseClient;

export interface Caller {
  id: string;
  role: 'teacher' | 'student';
  full_name: string;
  email: string;
  platform_admin: boolean;
}

export function adminClient(): Db {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Verifies the caller's access token and loads their profile. */
export async function getCaller(req: Request, db: Db): Promise<Caller> {
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '').trim();
  if (!token) throw new HttpError(401, 'Please sign in.');
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user) throw new HttpError(401, 'Your session has expired. Please sign in again.');
  const { data: profile } = await db.from('profiles').select('id, role, full_name, email, platform_admin, disabled_at').eq('id', data.user.id).maybeSingle();
  if (!profile) throw new HttpError(403, 'Your profile was not found.');
  if (profile.disabled_at) throw new HttpError(403, 'This account has been disabled.');
  const { disabled_at: _disabled, ...caller } = profile;
  return caller as Caller;
}

export async function requireTeacherOf(db: Db, classId: string, me: Caller) {
  if (me.role !== 'teacher') throw new HttpError(403, 'Only teachers can do this.');
  const { data } = await db.from('classes').select('*').eq('id', classId).maybeSingle();
  if (!data || data.teacher_id !== me.id) throw new HttpError(403, 'You do not teach this class.');
  return data as { id: string; teacher_id: string; name: string; section: string | null; course_id: string; settings: Record<string, unknown> };
}

export async function notify(db: Db, rows: Array<{ user_id: string; kind: string; title: string; body: string; link: string | null; assignment_id?: string | null }>) {
  if (!rows.length) return;
  const { error } = await db.from('notifications').insert(rows);
  if (error) console.error('notify failed', error.message);
}

export function str(v: unknown, max = 200): string {
  return typeof v === 'string' ? v.slice(0, max) : '';
}
