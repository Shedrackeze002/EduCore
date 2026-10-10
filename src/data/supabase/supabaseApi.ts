/**
 * SupabaseApi: the production backend.
 *
 * Security model: Row Level Security protects every table. Anything that changes
 * grades, mastery or another user's data goes through a security-definer RPC or an
 * Edge Function running with the service role (see /supabase).
 */
import { createClient, type SupabaseClient, type RealtimeChannel } from '@supabase/supabase-js';
import { freshSeed } from '@engine/rng.ts';
import { isQuestionType, type StoredResponse } from '@engine/assemble.ts';
import type { AiConfigStatus, DataApi, SignUpInput } from '../api.ts';
import type { AppNotification, Assignment, ClassSettings, Insight, ItemRef, NewStudentCredential, Profile, ProposedAction, Resource, Submission } from '../types.ts';
import {
  fromAssignment,
  toAnnouncement,
  toAssignment,
  toClass,
  toEvent,
  toInsight,
  toMastery,
  toNotification,
  toProfile,
  toPublication,
  toResource,
  toSubmission,
} from './mappers.ts';
import { STUDENT_EMAIL_DOMAIN } from '@/config.ts';

function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Edmonton';
  } catch {
    return 'America/Edmonton';
  }
}

function fail(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

export class SupabaseApi implements DataApi {
  readonly mode = 'supabase' as const;
  readonly client: SupabaseClient;
  private profile: Profile | null = null;
  private channel: RealtimeChannel | null = null;
  private notifListeners = new Set<(n: AppNotification) => void>();

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  }

  private async uid(): Promise<string> {
    const { data } = await this.client.auth.getUser();
    if (!data.user) throw new Error('Please sign in.');
    return data.user.id;
  }

  private async loadProfile(id: string): Promise<Profile | null> {
    const { data, error } = await this.client.from('profiles').select('*').eq('id', id).maybeSingle();
    fail(error);
    this.profile = data ? toProfile(data) : null;
    if (this.profile) this.ensureRealtime(this.profile.id);
    return this.profile;
  }

  private async invoke<T>(fn: string, body: Record<string, unknown>): Promise<T> {
    const { data, error } = await this.client.functions.invoke(fn, { body });
    if (error) {
      // Surface the function's JSON error message when available.
      let message = error.message;
      try {
        const ctx = (error as { context?: Response }).context;
        if (ctx && typeof ctx.json === 'function') {
          const j = await ctx.json();
          if (j?.error) message = j.error;
        }
      } catch {
        /* keep default message */
      }
      throw new Error(message);
    }
    if (data && typeof data === 'object' && 'error' in (data as Record<string, unknown>)) throw new Error(String((data as { error: unknown }).error));
    return data as T;
  }

  // ------------------------------------------------------------------ auth

  async getCurrentUser() {
    const { data } = await this.client.auth.getSession();
    if (!data.session) return null;
    return this.profile?.id === data.session.user.id ? this.profile : this.loadProfile(data.session.user.id);
  }

  onAuthChange(cb: (u: Profile | null) => void) {
    const { data } = this.client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        this.profile = null;
        this.channel?.unsubscribe();
        this.channel = null;
        cb(null);
        return;
      }
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') cb(await this.loadProfile(session.user.id));
    });
    return () => data.subscription.unsubscribe();
  }

  async signIn(identifier: string, password: string) {
    const id = identifier.trim();
    const email = id.includes('@') ? id : `${id.toLowerCase()}@${STUDENT_EMAIL_DOMAIN}`;
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message === 'Invalid login credentials' ? 'That email/username and password do not match.' : error.message);
    const p = await this.loadProfile(data.user.id);
    if (!p) throw new Error('Your profile is missing. Please contact your teacher.');
    return p;
  }

  async signUp(input: SignUpInput) {
    const { data, error } = await this.client.auth.signUp({
      email: input.email.trim(),
      password: input.password,
      options: {
        data: { full_name: input.fullName.trim(), role: input.role, join_code: input.joinCode?.trim().toUpperCase() || null },
        emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}`,
      },
    });
    fail(error);
    if (!data.session) throw new Error('Account created. Check your email to confirm your address, then sign in.');
    const p = await this.loadProfile(data.user!.id);
    if (!p) throw new Error('Your account was created but the profile is not ready yet. Please sign in again.');
    return p;
  }

  async signOut() {
    await this.client.auth.signOut();
  }

  async updateProfile(patch: Partial<Pick<Profile, 'fullName' | 'avatarColor'>>) {
    const id = await this.uid();
    const row: Record<string, unknown> = {};
    if (patch.fullName !== undefined) row.full_name = patch.fullName;
    if (patch.avatarColor !== undefined) row.avatar_color = patch.avatarColor;
    const { data, error } = await this.client.from('profiles').update(row).eq('id', id).select().single();
    fail(error);
    this.profile = toProfile(data);
    return this.profile;
  }

  async changePassword(newPassword: string) {
    const { error } = await this.client.auth.updateUser({ password: newPassword });
    fail(error);
  }

  // ------------------------------------------------------------------ classes

  async listMyClasses() {
    const me = await this.getCurrentUser();
    if (!me) return [];
    if (me.role === 'teacher') {
      const { data, error } = await this.client.from('classes').select('*').eq('teacher_id', me.id).order('created_at');
      fail(error);
      return (data ?? []).map(toClass);
    }
    const { data, error } = await this.client.from('enrollments').select('classes(*)').eq('student_id', me.id);
    fail(error);
    return (data ?? []).map((r: { classes: unknown }) => toClass(r.classes as Record<string, unknown>)).filter((c) => !c.archived);
  }

  async getClass(id: string) {
    const { data, error } = await this.client.from('classes').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toClass(data) : null;
  }

  async createClass(input: { name: string; section?: string | null; courseId: string }) {
    const id = await this.uid();
    const { data, error } = await this.client
      .from('classes')
      .insert({ teacher_id: id, name: input.name.trim(), section: input.section?.trim() || null, course_id: input.courseId, settings: { timezone: browserTimeZone() } })
      .select()
      .single();
    fail(error);
    return toClass(data);
  }

  async updateClass(id: string, patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) {
    const row: Record<string, unknown> = {};
    if (patch.name !== undefined) row.name = patch.name;
    if (patch.section !== undefined) row.section = patch.section;
    if (patch.archived !== undefined) row.archived = patch.archived;
    if (patch.settings) {
      const current = await this.getClass(id);
      row.settings = { ...(current?.settings ?? {}), ...patch.settings };
    }
    const { data, error } = await this.client.from('classes').update(row).eq('id', id).select().single();
    fail(error);
    return toClass(data);
  }

  async regenerateJoinCode(id: string) {
    const { data, error } = await this.client.rpc('regenerate_join_code', { p_class_id: id });
    fail(error);
    return toClass(data);
  }

  async joinClass(code: string) {
    const { data, error } = await this.client.rpc('join_class', { p_code: code.trim().toUpperCase() });
    fail(error);
    return toClass(data);
  }

  async listRoster(classId: string) {
    const { data, error } = await this.client.from('enrollments').select('profiles(*)').eq('class_id', classId);
    fail(error);
    return (data ?? []).map((r: { profiles: unknown }) => toProfile(r.profiles as Record<string, unknown>)).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getProfile(id: string) {
    const { data, error } = await this.client.from('profiles').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toProfile(data) : null;
  }

  async removeStudent(classId: string, studentId: string) {
    const { error } = await this.client.from('enrollments').delete().eq('class_id', classId).eq('student_id', studentId);
    fail(error);
  }

  async createStudentAccounts(classId: string, names: string[]) {
    const res = await this.invoke<{ students: NewStudentCredential[] }>('create-students', { classId, names });
    return res.students;
  }

  // ------------------------------------------------------------------ curriculum

  async listPublications(classId: string) {
    const { data, error } = await this.client.from('publications').select('*').eq('class_id', classId);
    fail(error);
    return (data ?? []).map(toPublication);
  }

  async setPublished(classId: string, lessonId: string, published: boolean) {
    if (published) {
      const { error } = await this.client.from('publications').upsert({ class_id: classId, lesson_id: lessonId });
      fail(error);
    } else {
      const { error } = await this.client.from('publications').delete().eq('class_id', classId).eq('lesson_id', lessonId);
      fail(error);
    }
  }

  async listResources(classId: string) {
    const { data, error } = await this.client.from('resources').select('*').eq('class_id', classId).order('created_at');
    fail(error);
    return (data ?? []).map(toResource);
  }

  async addResource(input: Omit<Resource, 'id' | 'createdAt'>) {
    const { data, error } = await this.client.from('resources').insert({ class_id: input.classId, lesson_id: input.lessonId, kind: input.kind, title: input.title, url: input.url, body: input.body }).select().single();
    fail(error);
    return toResource(data);
  }

  async deleteResource(id: string) {
    const { error } = await this.client.from('resources').delete().eq('id', id);
    fail(error);
  }

  // ------------------------------------------------------------------ assignments

  async listAssignments(classId: string) {
    const { data, error } = await this.client.from('assignments').select('*').eq('class_id', classId).order('due_at', { ascending: false, nullsFirst: true });
    fail(error);
    return (data ?? []).map(toAssignment);
  }

  async getAssignment(id: string) {
    const { data, error } = await this.client.from('assignments').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toAssignment(data) : null;
  }

  async saveAssignment(input: Partial<Assignment> & { classId: string }) {
    const row = fromAssignment(input);
    if (input.id) {
      const { data, error } = await this.client.from('assignments').update(row).eq('id', input.id).select().single();
      fail(error);
      return toAssignment(data);
    }
    const { data, error } = await this.client
      .from('assignments')
      .insert({ ...row, title: input.title?.trim() || 'Untitled assignment', status: 'draft', content: input.content ?? { sections: [], custom: [] } })
      .select()
      .single();
    fail(error);
    return toAssignment(data);
  }

  async publishAssignment(id: string) {
    const a = await this.getAssignment(id);
    if (a && isQuestionType(a.type) && a.content.sections.length === 0 && a.content.custom.length === 0) throw new Error('Add at least one question before publishing.');
    const { data, error } = await this.client.rpc('publish_assignment', { p_assignment_id: id });
    fail(error);
    return toAssignment(data);
  }

  async deleteAssignment(id: string) {
    const { error } = await this.client.from('assignments').delete().eq('id', id);
    fail(error);
  }

  async remindNow(assignmentId: string) {
    const { data, error } = await this.client.rpc('remind_now', { p_assignment_id: assignmentId });
    fail(error);
    return Number(data ?? 0);
  }

  // ------------------------------------------------------------------ submissions

  async listSubmissions(filter: { classId?: string; assignmentId?: string; studentId?: string }) {
    let q = this.client.from('submissions').select('*');
    if (filter.classId) q = q.eq('class_id', filter.classId);
    if (filter.assignmentId) q = q.eq('assignment_id', filter.assignmentId);
    if (filter.studentId) q = q.eq('student_id', filter.studentId);
    const { data, error } = await q.order('started_at', { ascending: false }).limit(5000);
    fail(error);
    return (data ?? []).map(toSubmission);
  }

  async getSubmission(id: string) {
    const { data, error } = await this.client.from('submissions').select('*').eq('id', id).maybeSingle();
    fail(error);
    return data ? toSubmission(data) : null;
  }

  async startSubmission(assignmentId: string) {
    // The server picks the questions so attempts cannot be tailored by the browser.
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'start', assignmentId });
    return toSubmission(res.submission);
  }

  async startPractice(classId: string, skillIds: string[]): Promise<Submission> {
    const me = await this.uid();
    const { data, error } = await this.client
      .from('submissions')
      .insert({ assignment_id: null, class_id: classId, student_id: me, attempt: 1, status: 'in_progress', seed: freshSeed(), items: [], responses: {}, practice_skill_ids: skillIds })
      .select()
      .single();
    fail(error);
    return toSubmission(data);
  }

  async saveProgress(submissionId: string, patch: { responses: Record<number, StoredResponse>; items?: ItemRef[]; blurCount?: number }) {
    const row: Record<string, unknown> = { responses: patch.responses };
    if (patch.items) row.items = patch.items;
    if (patch.blurCount !== undefined) row.integrity = { blurCount: patch.blurCount };
    const { error } = await this.client.from('submissions').update(row).eq('id', submissionId).eq('status', 'in_progress');
    fail(error);
  }

  async submit(submissionId: string, patch: { responses: Record<number, StoredResponse>; items: ItemRef[]; blurCount?: number }) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'submit', submissionId, ...patch });
    return toSubmission(res.submission);
  }

  async gradeManual(submissionId: string, itemIndex: number, score01: number, comment?: string) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'manual', submissionId, itemIndex, score: score01, comment });
    return toSubmission(res.submission);
  }

  async returnSubmission(submissionId: string, feedback: string) {
    const res = await this.invoke<{ submission: Record<string, unknown> }>('grade-submission', { action: 'return', submissionId, feedback });
    return toSubmission(res.submission);
  }

  // ------------------------------------------------------------------ mastery

  async listMastery(filter: { classId?: string; studentId?: string }) {
    let studentIds: string[] | null = null;
    if (filter.classId) studentIds = (await this.listRoster(filter.classId)).map((p) => p.id);
    let q = this.client.from('skill_mastery').select('*');
    if (filter.studentId) q = q.eq('student_id', filter.studentId);
    else if (studentIds) q = q.in('student_id', studentIds.length ? studentIds : ['00000000-0000-0000-0000-000000000000']);
    const { data, error } = await q.limit(20000);
    fail(error);
    return (data ?? []).map(toMastery);
  }

  async listEvents(filter: { classId: string; studentId?: string; sinceDays?: number }) {
    let q = this.client.from('skill_events').select('*').eq('class_id', filter.classId);
    if (filter.studentId) q = q.eq('student_id', filter.studentId);
    if (filter.sinceDays) q = q.gte('at', new Date(Date.now() - filter.sinceDays * 86_400_000).toISOString());
    const { data, error } = await q.order('at', { ascending: false }).limit(10000);
    fail(error);
    return (data ?? []).map(toEvent);
  }

  // ------------------------------------------------------------------ notifications

  async listNotifications() {
    const { data, error } = await this.client.from('notifications').select('*').order('created_at', { ascending: false }).limit(200);
    fail(error);
    return (data ?? []).map(toNotification);
  }

  async markNotificationsRead(ids: string[] | 'all') {
    const me = await this.uid();
    let q = this.client.from('notifications').update({ read_at: new Date().toISOString() }).eq('user_id', me).is('read_at', null);
    if (ids !== 'all') q = q.in('id', ids);
    const { error } = await q;
    fail(error);
  }

  private ensureRealtime(userId: string) {
    if (this.channel) return;
    this.channel = this.client
      .channel(`notifications:${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` }, (payload) => {
        const n = toNotification(payload.new as Record<string, unknown>);
        this.notifListeners.forEach((l) => l(n));
      })
      .subscribe();
  }

  subscribeNotifications(cb: (n: AppNotification) => void) {
    this.notifListeners.add(cb);
    return () => this.notifListeners.delete(cb);
  }

  async listAnnouncements(classId: string) {
    const { data, error } = await this.client.from('announcements').select('*').eq('class_id', classId).order('created_at', { ascending: false });
    fail(error);
    return (data ?? []).map(toAnnouncement);
  }

  async postAnnouncement(classId: string, title: string, body: string) {
    const me = await this.uid();
    const { data, error } = await this.client.from('announcements').insert({ class_id: classId, author_id: me, title, body }).select().single();
    fail(error);
    return toAnnouncement(data);
  }

  // ------------------------------------------------------------------ AI

  async aiStatus(): Promise<AiConfigStatus> {
    try {
      return await this.invoke<AiConfigStatus>('ai-agent', { action: 'status' });
    } catch (e) {
      return { live: false, model: null, note: `AI service unavailable: ${(e as Error).message}` };
    }
  }

  async listInsights(classId: string, studentId?: string | null) {
    let q = this.client.from('insights').select('*').eq('class_id', classId);
    if (studentId === null) q = q.is('student_id', null);
    else if (studentId) q = q.eq('student_id', studentId);
    const { data, error } = await q.order('created_at', { ascending: false }).limit(studentId === undefined ? 300 : 30);
    fail(error);
    return (data ?? []).map(toInsight);
  }

  async generateInsight(classId: string, studentId: string | null): Promise<Insight> {
    const res = await this.invoke<{ insight: Record<string, unknown> }>('ai-agent', { action: 'generate', classId, studentId });
    return toInsight(res.insight);
  }

  async setActionStatus(insightId: string, actionId: string, status: ProposedAction['status']) {
    const { error } = await this.client.rpc('set_insight_action_status', { p_insight_id: insightId, p_action_id: actionId, p_status: status });
    fail(error);
  }

  async runScheduledJobs() {
    // Reminders run server-side on a pg_cron schedule.
  }
}
