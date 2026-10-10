/**
 * DemoApi: a complete EduCore backend that runs in the browser.
 *
 * - Data lives in localStorage, so it survives reloads on this device.
 * - Sessions live in sessionStorage, so you can be the teacher in one tab and a
 *   student in another — changes sync between tabs instantly.
 * - Grading, mastery, reminders and AI insights use the same engine as production.
 */
import { freshSeed } from '@engine/rng.ts';
import { buildItemRefs, DEFAULT_SETTINGS, isQuestionType, TYPE_LABEL, type StoredResponse } from '@engine/assemble.ts';
import { processSubmission, validateRefs } from '@engine/submit.ts';
import { dueReminders } from '@engine/reminders.ts';
import { draftFromAction } from '@engine/actions.ts';
import { generateInsight, DEFAULT_MODEL } from '@engine/ai/index.ts';
import type { SkillState } from '@engine/mastery.ts';
import type { AiConfigStatus, DataApi, SignUpInput } from '../api.ts';
import type {
  Announcement,
  AppNotification,
  Assignment,
  ClassRoom,
  ClassSettings,
  Insight,
  ItemRef,
  NewStudentCredential,
  NotificationKind,
  Profile,
  ProposedAction,
  Publication,
  Resource,
  SkillEvent,
  SkillMastery,
  Submission,
} from '../types.ts';
import { clearDb, DB_KEY, loadDb, saveDb, type DemoDB, type DemoUser } from './db.ts';
import { buildSeed, DEMO_PASSWORD } from './seed.ts';
import { buildAnalystInput } from './analyst.ts';
import { uid, joinCode as makeJoinCode, friendlyPassword } from '@/lib/ids.ts';

const SESSION_KEY = 'educore-demo-session';
const COLORS = ['#6a43e3', '#2a78d6', '#0c8c4a', '#d68a00', '#d03b3b', '#c2417a', '#0e7c86', '#7a5af8'];

function strip(u: DemoUser): Profile {
  const { password: _pw, ...p } = u;
  void _pw;
  return p;
}

function sessionGet(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}
function sessionSet(id: string | null) {
  try {
    if (id) sessionStorage.setItem(SESSION_KEY, id);
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

const nowIso = () => new Date().toISOString();
const delay = (ms = 60) => new Promise((r) => setTimeout(r, ms));

export class DemoApi implements DataApi {
  readonly mode = 'demo' as const;
  private db!: DemoDB;
  private ready: Promise<void>;
  private authListeners = new Set<(u: Profile | null) => void>();
  private notifListeners = new Set<(n: AppNotification) => void>();
  private seenNotifications = new Set<string>();

  constructor() {
    this.ready = this.init();
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key !== DB_KEY) return;
        const fresh = loadDb();
        if (!fresh) return;
        this.db = fresh;
        this.emitNewNotifications();
      });
    }
  }

  private async init() {
    const existing = loadDb();
    this.db = existing ?? (await buildSeed());
    if (!existing) saveDb(this.db);
    const me = this.meOrNull();
    for (const n of this.db.notifications) if (!me || n.userId === me.id) this.seenNotifications.add(n.id);
  }

  /** Erase all demo data and rebuild the sample class. */
  async reset(): Promise<void> {
    clearDb();
    this.db = await buildSeed();
    saveDb(this.db);
    sessionSet(null);
    this.authListeners.forEach((l) => l(null));
  }

  private persist() {
    saveDb(this.db);
  }

  private meOrNull(): DemoUser | null {
    const id = sessionGet();
    return (id && this.db?.users.find((u) => u.id === id)) || null;
  }

  private me(): DemoUser {
    const u = this.meOrNull();
    if (!u) throw new Error('Please sign in.');
    return u;
  }

  private requireTeacherOf(classId: string): ClassRoom {
    const me = this.me();
    const c = this.db.classes.find((x) => x.id === classId);
    if (!c) throw new Error('Class not found.');
    if (c.teacherId !== me.id) throw new Error('Only the teacher of this class can do that.');
    return c;
  }

  private rosterIds(classId: string): string[] {
    return this.db.enrollments.filter((e) => e.classId === classId).map((e) => e.studentId);
  }

  private notify(userId: string, kind: NotificationKind, title: string, body: string, link: string | null, assignmentId: string | null = null) {
    const n: AppNotification = { id: uid('n'), userId, kind, title, body, link, createdAt: nowIso(), readAt: null, assignmentId };
    this.db.notifications.push(n);
    const me = this.meOrNull();
    if (me && me.id === userId) {
      this.seenNotifications.add(n.id);
      this.notifListeners.forEach((l) => l(n));
    }
  }

  private emitNewNotifications() {
    const me = this.meOrNull();
    if (!me) return;
    for (const n of this.db.notifications) {
      if (n.userId !== me.id || this.seenNotifications.has(n.id)) continue;
      this.seenNotifications.add(n.id);
      this.notifListeners.forEach((l) => l(n));
    }
  }

  // ------------------------------------------------------------------ auth

  async getCurrentUser() {
    await this.ready;
    const u = this.meOrNull();
    return u ? strip(u) : null;
  }

  onAuthChange(cb: (u: Profile | null) => void) {
    this.authListeners.add(cb);
    return () => this.authListeners.delete(cb);
  }

  async signIn(identifier: string, password: string) {
    await this.ready;
    await delay(250);
    const id = identifier.trim().toLowerCase();
    const u = this.db.users.find((x) => x.email.toLowerCase() === id || x.username?.toLowerCase() === id);
    if (!u || u.password !== password) throw new Error('That email/username and password do not match.');
    sessionSet(u.id);
    this.seenNotifications = new Set(this.db.notifications.filter((n) => n.userId === u.id).map((n) => n.id));
    this.authListeners.forEach((l) => l(strip(u)));
    return strip(u);
  }

  async signUp(input: SignUpInput) {
    await this.ready;
    await delay(250);
    const email = input.email.trim().toLowerCase();
    if (this.db.users.some((u) => u.email.toLowerCase() === email)) throw new Error('An account with that email already exists.');
    if (input.password.length < 6) throw new Error('Use a password with at least 6 characters.');
    let cls: ClassRoom | undefined;
    if (input.role === 'student' && input.joinCode) {
      cls = this.db.classes.find((c) => c.joinCode === input.joinCode!.trim().toUpperCase() && !c.archived);
      if (!cls) throw new Error('That class code was not found. Check it with your teacher.');
    }
    const u: DemoUser = {
      id: uid('u'),
      role: input.role,
      fullName: input.fullName.trim(),
      email,
      username: null,
      avatarColor: COLORS[this.db.users.length % COLORS.length],
      createdAt: nowIso(),
      password: input.password,
    };
    this.db.users.push(u);
    if (cls) this.db.enrollments.push({ classId: cls.id, studentId: u.id, joinedAt: nowIso() });
    this.persist();
    sessionSet(u.id);
    this.authListeners.forEach((l) => l(strip(u)));
    return strip(u);
  }

  async signOut() {
    sessionSet(null);
    this.authListeners.forEach((l) => l(null));
  }

  async updateProfile(patch: Partial<Pick<Profile, 'fullName' | 'avatarColor'>>) {
    const u = this.me();
    Object.assign(u, patch);
    this.persist();
    const p = strip(u);
    this.authListeners.forEach((l) => l(p));
    return p;
  }

  async changePassword(newPassword: string) {
    if (newPassword.length < 6) throw new Error('Use at least 6 characters.');
    this.me().password = newPassword;
    this.persist();
  }

  // ------------------------------------------------------------------ classes

  async listMyClasses() {
    await this.ready;
    const me = this.me();
    if (me.role === 'teacher') return this.db.classes.filter((c) => c.teacherId === me.id);
    const ids = new Set(this.db.enrollments.filter((e) => e.studentId === me.id).map((e) => e.classId));
    return this.db.classes.filter((c) => ids.has(c.id) && !c.archived);
  }

  async getClass(id: string) {
    await this.ready;
    return this.db.classes.find((c) => c.id === id) ?? null;
  }

  async createClass(input: { name: string; section?: string | null; courseId: string }) {
    const me = this.me();
    if (me.role !== 'teacher') throw new Error('Only teachers can create classes.');
    const c: ClassRoom = {
      id: uid('c'),
      teacherId: me.id,
      name: input.name.trim(),
      section: input.section?.trim() || null,
      courseId: input.courseId,
      joinCode: makeJoinCode(),
      settings: { reminderHours: [24, 2], aiAutopilot: false, emailReminders: false, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      createdAt: nowIso(),
      archived: false,
    };
    this.db.classes.push(c);
    this.persist();
    return c;
  }

  async updateClass(id: string, patch: { name?: string; section?: string | null; settings?: Partial<ClassSettings>; archived?: boolean }) {
    const c = this.requireTeacherOf(id);
    if (patch.name !== undefined) c.name = patch.name;
    if (patch.section !== undefined) c.section = patch.section;
    if (patch.archived !== undefined) c.archived = patch.archived;
    if (patch.settings) c.settings = { ...c.settings, ...patch.settings };
    this.persist();
    return { ...c };
  }

  async regenerateJoinCode(id: string) {
    const c = this.requireTeacherOf(id);
    c.joinCode = makeJoinCode();
    this.persist();
    return { ...c };
  }

  async joinClass(code: string) {
    const me = this.me();
    const c = this.db.classes.find((x) => x.joinCode === code.trim().toUpperCase() && !x.archived);
    if (!c) throw new Error('That class code was not found.');
    if (!this.db.enrollments.some((e) => e.classId === c.id && e.studentId === me.id)) {
      this.db.enrollments.push({ classId: c.id, studentId: me.id, joinedAt: nowIso() });
      this.notify(c.teacherId, 'announcement', `${me.fullName} joined ${c.name}`, 'A new student joined using the class code.', `/t/c/${c.id}/students`);
      this.persist();
    }
    return c;
  }

  async listRoster(classId: string) {
    await this.ready;
    const ids = new Set(this.rosterIds(classId));
    return this.db.users.filter((u) => ids.has(u.id)).map(strip).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getProfile(id: string) {
    await this.ready;
    const u = this.db.users.find((x) => x.id === id);
    return u ? strip(u) : null;
  }

  async removeStudent(classId: string, studentId: string) {
    this.requireTeacherOf(classId);
    this.db.enrollments = this.db.enrollments.filter((e) => !(e.classId === classId && e.studentId === studentId));
    this.persist();
  }

  async createStudentAccounts(classId: string, names: string[]): Promise<NewStudentCredential[]> {
    this.requireTeacherOf(classId);
    const out: NewStudentCredential[] = [];
    for (const raw of names) {
      const fullName = raw.trim();
      if (!fullName) continue;
      const base = fullName
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .trim()
        .split(/\s+/);
      let username = `${base[0]}.${(base[base.length - 1] ?? '').slice(0, 1)}`.replace(/\.$/, '');
      let n = 1;
      while (this.db.users.some((u) => u.username === username)) username = `${base[0]}.${(base[base.length - 1] ?? '').slice(0, 1)}${++n}`;
      const password = friendlyPassword();
      const u: DemoUser = { id: uid('u'), role: 'student', fullName, email: `${username}@students.educore.local`, username, avatarColor: COLORS[this.db.users.length % COLORS.length], createdAt: nowIso(), password };
      this.db.users.push(u);
      this.db.enrollments.push({ classId, studentId: u.id, joinedAt: nowIso() });
      out.push({ fullName, username, password });
    }
    this.persist();
    return out;
  }

  // ------------------------------------------------------------------ curriculum

  async listPublications(classId: string): Promise<Publication[]> {
    await this.ready;
    return this.db.publications.filter((p) => p.classId === classId);
  }

  async setPublished(classId: string, lessonId: string, published: boolean) {
    const c = this.requireTeacherOf(classId);
    const exists = this.db.publications.some((p) => p.classId === classId && p.lessonId === lessonId);
    if (published && !exists) {
      this.db.publications.push({ classId, lessonId, publishedAt: nowIso() });
      for (const sid of this.rosterIds(classId)) this.notify(sid, 'announcement', 'New lesson available', `A new lesson was published in ${c.name}.`, `/s/learn/${lessonId}`);
    }
    if (!published) this.db.publications = this.db.publications.filter((p) => !(p.classId === classId && p.lessonId === lessonId));
    this.persist();
  }

  async listResources(classId: string): Promise<Resource[]> {
    await this.ready;
    return this.db.resources.filter((r) => r.classId === classId);
  }

  async addResource(input: Omit<Resource, 'id' | 'createdAt'>) {
    this.requireTeacherOf(input.classId);
    const r: Resource = { ...input, id: uid('r'), createdAt: nowIso() };
    this.db.resources.push(r);
    this.persist();
    return r;
  }

  async deleteResource(id: string) {
    const r = this.db.resources.find((x) => x.id === id);
    if (!r) return;
    this.requireTeacherOf(r.classId);
    this.db.resources = this.db.resources.filter((x) => x.id !== id);
    this.persist();
  }

  // ------------------------------------------------------------------ assignments

  private visibleTo(a: Assignment, me: DemoUser): boolean {
    if (me.role === 'teacher') return this.db.classes.some((c) => c.id === a.classId && c.teacherId === me.id);
    if (a.status !== 'published') return false;
    if (a.openAt && new Date(a.openAt) > new Date()) return false;
    return a.assignedTo === 'all' || a.assignedTo.includes(me.id);
  }

  async listAssignments(classId: string) {
    await this.ready;
    const me = this.me();
    return this.db.assignments.filter((a) => a.classId === classId && this.visibleTo(a, me)).sort((a, b) => (b.dueAt ?? b.createdAt).localeCompare(a.dueAt ?? a.createdAt));
  }

  async getAssignment(id: string) {
    await this.ready;
    const me = this.me();
    const a = this.db.assignments.find((x) => x.id === id);
    return a && this.visibleTo(a, me) ? a : null;
  }

  async saveAssignment(input: Partial<Assignment> & { classId: string }) {
    this.requireTeacherOf(input.classId);
    if (input.id) {
      const a = this.db.assignments.find((x) => x.id === input.id);
      if (!a) throw new Error('Assignment not found.');
      Object.assign(a, input);
      this.persist();
      return { ...a };
    }
    const type = input.type ?? 'homework';
    const a: Assignment = {
      id: uid('a'),
      classId: input.classId,
      title: input.title?.trim() || 'Untitled assignment',
      type,
      instructions: input.instructions ?? '',
      content: input.content ?? { sections: [], custom: [] },
      settings: input.settings ?? { ...DEFAULT_SETTINGS[type] },
      openAt: input.openAt ?? null,
      dueAt: input.dueAt ?? null,
      allowLate: input.allowLate ?? true,
      reminderHours: input.reminderHours ?? [24, 2],
      assignedTo: input.assignedTo ?? 'all',
      status: 'draft',
      createdAt: nowIso(),
      publishedAt: null,
      createdBy: input.createdBy ?? 'teacher',
      aiRationale: input.aiRationale ?? null,
    };
    this.db.assignments.push(a);
    this.persist();
    return { ...a };
  }

  async publishAssignment(id: string) {
    const a = this.db.assignments.find((x) => x.id === id);
    if (!a) throw new Error('Assignment not found.');
    const c = this.requireTeacherOf(a.classId);
    if (isQuestionType(a.type) && a.content.sections.length === 0 && a.content.custom.length === 0) throw new Error('Add at least one question before publishing.');
    const wasPublished = a.status === 'published';
    a.status = 'published';
    a.publishedAt = a.publishedAt ?? nowIso();
    if (!wasPublished) {
      const targets = a.assignedTo === 'all' ? this.rosterIds(a.classId) : a.assignedTo;
      const due = a.dueAt ? ` Due ${new Date(a.dueAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}.` : '';
      for (const sid of targets) this.notify(sid, 'assignment', `New ${TYPE_LABEL[a.type].toLowerCase()}: ${a.title}`, `${c.name}.${due}`, `/s/work/${a.id}`, a.id);
    }
    this.persist();
    return { ...a };
  }

  async deleteAssignment(id: string) {
    const a = this.db.assignments.find((x) => x.id === id);
    if (!a) return;
    this.requireTeacherOf(a.classId);
    this.db.assignments = this.db.assignments.filter((x) => x.id !== id);
    this.db.submissions = this.db.submissions.filter((s) => s.assignmentId !== id);
    this.persist();
  }

  private doneSet(): Set<string> {
    return new Set(this.db.submissions.filter((s) => s.assignmentId && s.status !== 'in_progress').map((s) => `${s.assignmentId}:${s.studentId}`));
  }

  async remindNow(assignmentId: string) {
    const a = this.db.assignments.find((x) => x.id === assignmentId);
    if (!a) throw new Error('Assignment not found.');
    this.requireTeacherOf(a.classId);
    const done = this.doneSet();
    const targets = (a.assignedTo === 'all' ? this.rosterIds(a.classId) : a.assignedTo).filter((sid) => !done.has(`${a.id}:${sid}`));
    for (const sid of targets) this.notify(sid, 'reminder', `Reminder from your teacher: ${a.title}`, a.dueAt ? `Due ${new Date(a.dueAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}. Please complete it soon.` : 'Please complete it soon.', `/s/work/${a.id}`, a.id);
    this.persist();
    return targets.length;
  }

  // ------------------------------------------------------------------ submissions

  async listSubmissions(filter: { classId?: string; assignmentId?: string; studentId?: string }) {
    await this.ready;
    const me = this.me();
    return this.db.submissions.filter((s) => {
      if (me.role === 'student' && s.studentId !== me.id) return false;
      if (me.role === 'teacher' && !this.db.classes.some((c) => c.id === s.classId && c.teacherId === me.id)) return false;
      if (filter.classId && s.classId !== filter.classId) return false;
      if (filter.assignmentId && s.assignmentId !== filter.assignmentId) return false;
      if (filter.studentId && s.studentId !== filter.studentId) return false;
      return true;
    });
  }

  async getSubmission(id: string) {
    await this.ready;
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === id);
    if (!s) return null;
    if (me.role === 'student' && s.studentId !== me.id) return null;
    return s;
  }

  async startSubmission(assignmentId: string) {
    const me = this.me();
    const a = this.db.assignments.find((x) => x.id === assignmentId);
    if (!a || !this.visibleTo(a, me)) throw new Error('Assignment not found.');
    if (me.role !== 'student') throw new Error('Only students can start assignments.');
    const mine = this.db.submissions.filter((s) => s.assignmentId === a.id && s.studentId === me.id);
    const open = mine.find((s) => s.status === 'in_progress');
    if (open) return open;
    const done = mine.filter((s) => s.status !== 'in_progress').length;
    if (a.settings.attempts && done >= a.settings.attempts) throw new Error('You have used all of your attempts.');
    if (a.dueAt && new Date(a.dueAt) < new Date() && !a.allowLate) throw new Error('This assignment is closed.');
    const seed = freshSeed();
    const s: Submission = {
      id: uid('s'),
      assignmentId: a.id,
      classId: a.classId,
      studentId: me.id,
      attempt: done + 1,
      status: 'in_progress',
      seed,
      items: isQuestionType(a.type) ? buildItemRefs(a.content, seed) : [],
      responses: {},
      practiceSkillIds: null,
      startedAt: nowIso(),
      submittedAt: null,
      score: null,
      maxScore: null,
      percent: null,
      pendingManual: 0,
      late: false,
      feedback: null,
      integrity: { blurCount: 0 },
    };
    this.db.submissions.push(s);
    this.persist();
    return s;
  }

  async startPractice(classId: string, skillIds: string[]) {
    const me = this.me();
    const s: Submission = {
      id: uid('s'),
      assignmentId: null,
      classId,
      studentId: me.id,
      attempt: 1,
      status: 'in_progress',
      seed: freshSeed(),
      items: [],
      responses: {},
      practiceSkillIds: skillIds,
      startedAt: nowIso(),
      submittedAt: null,
      score: null,
      maxScore: null,
      percent: null,
      pendingManual: 0,
      late: false,
      feedback: null,
      integrity: { blurCount: 0 },
    };
    this.db.submissions.push(s);
    this.persist();
    return s;
  }

  async saveProgress(submissionId: string, patch: { responses: Record<number, StoredResponse>; items?: ItemRef[]; blurCount?: number }) {
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === submissionId && x.studentId === me.id);
    if (!s || s.status !== 'in_progress') return;
    s.responses = patch.responses;
    if (patch.items) s.items = patch.items;
    if (patch.blurCount !== undefined) s.integrity = { blurCount: patch.blurCount };
    this.persist();
  }

  async submit(submissionId: string, patch: { responses: Record<number, StoredResponse>; items: ItemRef[]; blurCount?: number }) {
    const me = this.me();
    const s = this.db.submissions.find((x) => x.id === submissionId && x.studentId === me.id);
    if (!s) throw new Error('Submission not found.');
    if (s.status !== 'in_progress') return s;
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) ?? null : null;
    const now = nowIso();
    s.integrity = { blurCount: patch.blurCount ?? s.integrity.blurCount };
    if (a && !isQuestionType(a.type)) {
      Object.assign(s, { status: 'graded', submittedAt: now, score: 1, maxScore: 1, percent: 100, late: !!a.dueAt && new Date(now) > new Date(a.dueAt), responses: patch.responses });
      this.afterSubmit(s, a);
      this.persist();
      return { ...s };
    }
    const content = a?.content ?? { sections: [], custom: [] };
    const err = validateRefs(patch.items, content, s.practiceSkillIds ?? undefined);
    if (err) throw new Error(err);
    const states = new Map<string, SkillState>(this.db.mastery.filter((m) => m.studentId === me.id).map((m) => [m.skillId, m]));
    const out = processSubmission({ assignmentId: a?.id ?? null, content, dueAt: a?.dueAt ?? null, submissionId: s.id, items: patch.items, responses: patch.responses, mastery: states, now });
    Object.assign(s, {
      items: patch.items,
      responses: patch.responses,
      status: out.status,
      submittedAt: now,
      score: out.summary.score,
      maxScore: out.summary.maxScore,
      percent: out.summary.percent,
      pendingManual: out.summary.pendingManual,
      late: out.late,
      masteryChanges: out.changes,
    });
    // Persist mastery and events.
    this.db.mastery = this.db.mastery.filter((m) => m.studentId !== me.id || !out.mastery.has(m.skillId));
    for (const st of out.mastery.values()) this.db.mastery.push({ ...st, studentId: me.id });
    for (const e of out.events) {
      this.db.events.push({ id: uid('e'), studentId: me.id, classId: s.classId, skillId: e.skillId, correct: e.correct, assisted: e.assisted, submissionId: s.id, assignmentId: a?.id ?? null, at: e.at, ...(e.correct ? {} : { prompt: e.prompt.slice(0, 180), answer: e.answer, expected: e.expected.slice(0, 80) }) });
    }
    if (a) this.afterSubmit(s, a);
    this.persist();
    if (a) await this.autopilot(s.classId, me.id);
    return { ...s };
  }

  /** Tell the teacher about work that needs them: written answers to grade, or late work. */
  private afterSubmit(s: Submission, a: Assignment) {
    if (!s.pendingManual && !s.late) return;
    const c = this.db.classes.find((x) => x.id === a.classId)!;
    const student = this.db.users.find((u) => u.id === s.studentId)!;
    this.notify(c.teacherId, 'submission', `${student.fullName} submitted ${a.title}${s.late ? ' (late)' : ''}`, s.percent !== null && isQuestionType(a.type) ? `Score: ${Math.round(s.percent)}%${s.pendingManual ? ` · ${s.pendingManual} to grade` : ''}` : 'Completed.', s.pendingManual ? `/t/c/${c.id}/submissions/${s.id}` : `/t/c/${c.id}/assignments/${a.id}`, a.id);
  }

  /** If autopilot is on, let the AI assistant assign targeted practice for a weak skill. */
  private async autopilot(classId: string, studentId: string) {
    const c = this.db.classes.find((x) => x.id === classId);
    if (!c?.settings.aiAutopilot) return;
    const recentAi = this.db.assignments.filter((a) => a.classId === classId && a.createdBy === 'ai' && Array.isArray(a.assignedTo) && a.assignedTo.includes(studentId) && Date.now() - new Date(a.createdAt).getTime() < 3 * 86_400_000);
    if (recentAi.length) return;
    const res = await generateInsight(buildAnalystInput(this.db, classId), { scope: 'student', studentId }, this.aiConfig());
    const action = res.data.actions.find((x) => x.type === 'assign_practice');
    if (!action) return;
    const draft = draftFromAction(action);
    if (!draft) return;
    const a: Assignment = { id: uid('a'), classId, ...draft, openAt: null, allowLate: true, status: 'published', createdAt: nowIso(), publishedAt: nowIso(), createdBy: 'ai' };
    this.db.assignments.push(a);
    const student = this.db.users.find((u) => u.id === studentId)!;
    this.notify(studentId, 'assignment', `New practice: ${a.title}`, 'Your teacher’s assistant picked this practice set to help you master a tricky skill.', `/s/work/${a.id}`, a.id);
    this.notify(c.teacherId, 'insight', `Autopilot assigned practice to ${student.fullName}`, `${a.title}. ${action.rationale}`, `/t/c/${classId}/assignments/${a.id}`, a.id);
    this.db.insights.push({ id: uid('i'), classId, studentId, createdAt: nowIso(), source: res.source, model: res.model, data: { ...res.data, actions: res.data.actions.map((x) => (x.id === action.id ? { ...x, status: 'done' } : x)) }, error: res.error ?? null });
    this.persist();
  }

  async gradeManual(submissionId: string, itemIndex: number, score01: number, comment?: string) {
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('Submission not found.');
    this.requireTeacherOf(s.classId);
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : null;
    s.responses[itemIndex] = { ...(s.responses[itemIndex] ?? { answers: [], hintsUsed: 0 }), manualScore: Math.max(0, Math.min(1, score01)), comment: comment ?? null };
    // Recompute totals with the engine (manual scores included).
    const { gradeSubmission } = await import('@engine/assemble.ts');
    const g = gradeSubmission(s.items, s.responses, a?.content ?? { sections: [], custom: [] }, a?.id ?? 'practice');
    s.score = g.score;
    s.maxScore = g.maxScore;
    s.percent = g.percent;
    s.pendingManual = g.pendingManual;
    if (s.status === 'submitted' && g.pendingManual === 0) s.status = 'graded';
    this.persist();
    return { ...s };
  }

  async returnSubmission(submissionId: string, feedback: string) {
    const s = this.db.submissions.find((x) => x.id === submissionId);
    if (!s) throw new Error('Submission not found.');
    this.requireTeacherOf(s.classId);
    s.feedback = feedback || null;
    s.status = 'returned';
    const a = s.assignmentId ? this.db.assignments.find((x) => x.id === s.assignmentId) : null;
    this.notify(s.studentId, 'graded', `${a?.title ?? 'Your work'} was returned`, feedback ? `Feedback: ${feedback.slice(0, 120)}` : 'Your teacher returned your work.', a ? `/s/work/${a.id}` : '/s/work', a?.id ?? null);
    this.persist();
    return { ...s };
  }

  // ------------------------------------------------------------------ mastery

  async listMastery(filter: { classId?: string; studentId?: string }): Promise<SkillMastery[]> {
    await this.ready;
    const me = this.me();
    let ids: Set<string>;
    if (me.role === 'student') ids = new Set([me.id]);
    else if (filter.classId) ids = new Set(this.rosterIds(filter.classId));
    else ids = new Set(this.db.classes.filter((c) => c.teacherId === me.id).flatMap((c) => this.rosterIds(c.id)));
    if (filter.studentId) ids = new Set([...ids].filter((x) => x === filter.studentId));
    return this.db.mastery.filter((m) => ids.has(m.studentId));
  }

  async listEvents(filter: { classId: string; studentId?: string; sinceDays?: number }): Promise<SkillEvent[]> {
    await this.ready;
    const me = this.me();
    const since = filter.sinceDays ? Date.now() - filter.sinceDays * 86_400_000 : 0;
    return this.db.events.filter(
      (e) =>
        e.classId === filter.classId &&
        (me.role === 'teacher' || e.studentId === me.id) &&
        (!filter.studentId || e.studentId === filter.studentId) &&
        (!since || new Date(e.at).getTime() >= since),
    );
  }

  // ------------------------------------------------------------------ notifications

  async listNotifications() {
    await this.ready;
    const me = this.me();
    return this.db.notifications.filter((n) => n.userId === me.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async markNotificationsRead(ids: string[] | 'all') {
    const me = this.me();
    const t = nowIso();
    for (const n of this.db.notifications) if (n.userId === me.id && !n.readAt && (ids === 'all' || ids.includes(n.id))) n.readAt = t;
    this.persist();
  }

  subscribeNotifications(cb: (n: AppNotification) => void) {
    this.notifListeners.add(cb);
    return () => this.notifListeners.delete(cb);
  }

  async listAnnouncements(classId: string): Promise<Announcement[]> {
    await this.ready;
    return this.db.announcements.filter((a) => a.classId === classId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async postAnnouncement(classId: string, title: string, body: string) {
    const c = this.requireTeacherOf(classId);
    const a: Announcement = { id: uid('an'), classId, authorId: this.me().id, title, body, createdAt: nowIso() };
    this.db.announcements.push(a);
    for (const sid of this.rosterIds(classId)) this.notify(sid, 'announcement', title, `${c.name}: ${body.slice(0, 140)}`, '/s');
    this.persist();
    return a;
  }

  // ------------------------------------------------------------------ AI

  /** Demo only: let the teacher try live MiniMax analysis with their own key (stored in this browser). */
  setAiKey(key: string | null, model?: string | null) {
    this.db.aiKey = key?.trim() || null;
    this.db.aiModel = model?.trim() || null;
    this.persist();
  }

  getAiKey() {
    return { key: this.db.aiKey, model: this.db.aiModel };
  }

  private aiConfig() {
    return this.db.aiKey ? { apiKey: this.db.aiKey, model: this.db.aiModel || DEFAULT_MODEL } : null;
  }

  async aiStatus(): Promise<AiConfigStatus> {
    await this.ready;
    return this.db.aiKey
      ? { live: true, model: this.db.aiModel || DEFAULT_MODEL, note: 'Demo mode: calling MiniMax directly from this browser with your key.' }
      : { live: false, model: null, note: 'Demo mode uses EduCore’s offline analyst. Add a MiniMax key in Settings, or connect Supabase for production AI.' };
  }

  async listInsights(classId: string, studentId?: string | null) {
    await this.ready;
    return this.db.insights
      .filter((i) => i.classId === classId && (studentId === undefined ? true : (i.studentId ?? null) === (studentId ?? null)))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async generateInsight(classId: string, studentId: string | null): Promise<Insight> {
    this.requireTeacherOf(classId);
    const input = buildAnalystInput(this.db, classId);
    const res = await generateInsight(input, studentId ? { scope: 'student', studentId } : { scope: 'class' }, this.aiConfig());
    const ins: Insight = { id: uid('i'), classId, studentId, createdAt: nowIso(), source: res.source, model: res.model, data: res.data, error: res.error ?? null };
    this.db.insights.push(ins);
    this.persist();
    return ins;
  }

  async setActionStatus(insightId: string, actionId: string, status: ProposedAction['status']) {
    const ins = this.db.insights.find((i) => i.id === insightId);
    if (!ins) return;
    this.requireTeacherOf(ins.classId);
    ins.data.actions = ins.data.actions.map((a) => (a.id === actionId ? { ...a, status } : a));
    this.persist();
  }

  // ------------------------------------------------------------------ scheduler

  async runScheduledJobs() {
    await this.ready;
    const roster = new Map<string, string[]>();
    for (const c of this.db.classes) roster.set(c.id, this.rosterIds(c.id));
    const sent = new Set(this.db.reminderLog);
    const { reminders, suppressed } = dueReminders({ now: new Date(), assignments: this.db.assignments, roster, done: this.doneSet(), sent });
    if (!reminders.length && suppressed.every((k) => sent.has(k))) return;
    for (const r of reminders) {
      this.notify(r.studentId, 'reminder', r.title, r.body, `/s/work/${r.assignmentId}`, r.assignmentId);
      this.db.reminderLog.push(r.key);
    }
    for (const k of suppressed) if (!sent.has(k)) this.db.reminderLog.push(k);
    this.persist();
  }
}

export { DEMO_PASSWORD };
