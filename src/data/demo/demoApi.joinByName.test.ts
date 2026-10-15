/** Joining a class by link with just a name, in demo mode: the same rules as the database. */
import { beforeEach, describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_TEACHER_EMAIL } from './constants.ts';

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

describe('joining a class by link with just a name', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  let classId: string;
  let code: string;
  const asTeacher = () => api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);

  beforeEach(async () => {
    api = await freshApi();
    await asTeacher();
    const cls = (await api.listMyClasses())[0];
    classId = cls.id;
    code = cls.joinCode;
    await api.signOut();
  });

  it('shows the class behind a link to anyone, and nothing for a wrong link', async () => {
    expect(await api.classForJoinLink(code.toLowerCase())).toMatchObject({ className: expect.any(String), teacherName: expect.any(String) });
    expect(await api.classForJoinLink('ZZZZZZ')).toBeNull();
  });

  it('asks only for a name, signs the device in, and always waits for the teacher', async () => {
    const { profile, result } = await api.joinWithName(code, '  Ama ', 'Mensah');
    expect(profile).toMatchObject({ fullName: 'Ama Mensah', role: 'student', nameOnly: true, email: '' });
    expect(result.status).toBe('pending');
    expect((await api.getCurrentUser())?.id).toBe(profile.id);
    expect(await api.listMyClasses()).toEqual([]);
    expect((await api.listMyJoinRequests())[0]).toMatchObject({ status: 'pending', linked: false });
    await expect(api.joinWithName(code, '', 'Mensah')).rejects.toThrow('Type your first name.');
    await expect(api.joinWithName(code, 'Ama', '<script>')).rejects.toThrow('Use letters only in your last name.');
    await expect(api.joinWithName('ZZZZZZ', 'Ama', 'Mensah')).rejects.toThrow(/not valid/);
  });

  it('lets the teacher approve some names and decline others in one go', async () => {
    const ama = (await api.joinWithName(code, 'Ama', 'Mensah')).profile;
    await api.signOut();
    const stranger = (await api.joinWithName(code, 'Not', 'Inclass')).profile;
    await api.signOut();
    await asTeacher();
    const requests = await api.listJoinRequests(classId);
    const byName = (n: string) => requests.find((r) => r.fullName === n)!;
    expect(byName('Ama Mensah')).toMatchObject({ nameOnly: true, email: '', match: null });
    await api.decideJoinRequests(classId, [
      { requestId: byName('Ama Mensah').id, approve: true },
      { requestId: byName('Not Inclass').id, approve: false },
    ]);
    expect(await api.listJoinRequests(classId)).toEqual([]);
    const roster = (await api.listRoster(classId)).map((s) => s.id);
    expect(roster).toContain(ama.id);
    expect(roster).not.toContain(stranger.id);
  });

  it('lets a student back on a new device carry on as themselves', async () => {
    const first = (await api.joinWithName(code, 'Ama', 'Mensah')).profile;
    await api.signOut();
    await asTeacher();
    await api.decideJoinRequests(classId, [{ requestId: (await api.listJoinRequests(classId))[0].id, approve: true }]);
    await api.signOut();

    // A new device: the same name, typed differently.
    const device = (await api.joinWithName(code, 'ama', ' mensah ')).profile;
    expect(await api.claimMatchedAccount()).toBeNull();
    await api.signOut();
    await asTeacher();
    const r = (await api.listJoinRequests(classId))[0];
    expect(r.match).toEqual({ studentId: first.id, fullName: 'Ama Mensah' });
    // Only a name-only student can be matched, and only to a name-only student in the class.
    const emailStudent = (await api.listRoster(classId)).find((s) => !s.nameOnly)!;
    await expect(api.decideJoinRequests(classId, [{ requestId: r.id, approve: true, sameAs: emailStudent.id }])).rejects.toThrow(/class link/);
    await api.decideJoinRequests(classId, [{ requestId: r.id, approve: true, sameAs: first.id }]);
    expect((await api.listRoster(classId)).map((s) => s.id)).not.toContain(device.id);
    await api.signOut();

    // Back on the device, which kept its session: it learns it was matched and takes over the account.
    sessionStorage.setItem('educore-demo-session', device.id);
    const { DemoApi } = await import('./demoApi.ts');
    const fresh = new DemoApi();
    expect((await fresh.listMyJoinRequests())[0]).toMatchObject({ status: 'approved', linked: true });
    const me = await fresh.claimMatchedAccount();
    expect(me?.id).toBe(first.id);
    expect((await fresh.getCurrentUser())?.id).toBe(first.id);
    expect((await fresh.listMyClasses()).map((c) => c.id)).toContain(classId);
  });
});
