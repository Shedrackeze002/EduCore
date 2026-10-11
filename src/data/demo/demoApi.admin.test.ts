/** Platform administration in demo mode: the same rules the SQL functions enforce. */
import { beforeEach, describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from './constants.ts';
import { describeAudit } from '@/features/admin/shared.tsx';

class MemoryStorage {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, String(v));
  }
  removeItem(k: string) {
    this.m.delete(k);
  }
  clear() {
    this.m.clear();
  }
}

async function freshApi() {
  Object.assign(globalThis, { localStorage: new MemoryStorage(), sessionStorage: new MemoryStorage() });
  const { DemoApi } = await import('./demoApi.ts');
  return new DemoApi();
}

describe('demo platform administration', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  beforeEach(async () => {
    api = await freshApi();
  });

  it('makes the sample teacher the administrator and keeps that after a reset', async () => {
    const me = await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    expect(me.platformAdmin).toBe(true);
    const o = await api.adminOverview();
    expect(o.teachers).toBe(1);
    expect(o.students).toBeGreaterThan(10);
    expect(o.signupsByWeek).toHaveLength(12);
    await api.reset();
    expect((await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD)).platformAdmin).toBe(true);
  });

  it('holds new teachers for approval when sign-up needs it', async () => {
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    expect((await api.signupConfig()).teacherSignup).toBe('open');
    await api.adminSetSettings({ teacherSignup: 'approval' });
    await api.signOut();

    const t = await api.signUp({ fullName: 'Ada Lovelace', email: 'ada@school.ca', password: 'secret1', role: 'teacher' });
    expect(t.teacherStatus).toBe('pending');
    await expect(api.createClass({ name: 'Math', courseId: 'math10c' })).rejects.toThrow(/waiting for approval/);
    await expect(api.adminOverview()).rejects.toThrow(/administrators only/i);
    await api.signOut();

    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    expect((await api.listNotifications()).some((n) => n.kind === 'admin' && /waiting for approval/.test(n.title))).toBe(true);
    const { rows } = await api.adminListUsers({ status: 'pending' });
    expect(rows.map((r) => r.fullName)).toEqual(['Ada Lovelace']);
    await api.adminSetTeacherStatus(rows[0].id, 'approved');
    expect((await api.adminOverview()).pendingTeachers).toBe(0);
    await api.signOut();

    await api.signIn('ada@school.ca', 'secret1');
    expect((await api.listNotifications())[0].title).toBe('Your teacher account is approved');
    await expect(api.createClass({ name: 'Math', courseId: 'math10c' })).resolves.toMatchObject({ name: 'Math' });
  });

  it('disables, re-enables and resets passwords, with an audit trail', async () => {
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    const me = await api.getCurrentUser();
    const student = (await api.adminListUsers({ search: DEMO_STUDENT_EMAIL })).rows[0];
    await expect(api.adminSetUserDisabled(me!.id, true)).rejects.toThrow(/your own account/);
    await expect(api.adminSetPlatformAdmin(me!.id, false)).rejects.toThrow(/at least one administrator/);
    await expect(api.adminSetPlatformAdmin(student.id, true)).rejects.toThrow(/Only teacher accounts/);

    await api.adminSetUserDisabled(student.id, true);
    const temp = await api.adminResetPassword(student.id);
    await api.signOut();
    await expect(api.signIn(DEMO_STUDENT_EMAIL, temp)).rejects.toThrow(/disabled/);

    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    await api.adminSetUserDisabled(student.id, false);
    const log = await api.adminAuditLog();
    expect(log.map((e) => e.action)).toEqual(['user_enabled', 'password_reset', 'user_disabled']);
    expect(describeAudit(log[1])).toBe(`Shedrack Eze reset the password of ${student.fullName}`);
    await api.signOut();
    await expect(api.signIn(DEMO_STUDENT_EMAIL, DEMO_PASSWORD)).rejects.toThrow(/do not match/);
    await expect(api.signIn(DEMO_STUDENT_EMAIL, temp)).resolves.toMatchObject({ role: 'student' });
  });
});
