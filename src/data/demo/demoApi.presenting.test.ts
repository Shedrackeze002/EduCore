/** Presenting in demo mode: hidden slide blocks and saved whiteboards follow the database rules. */
import { beforeEach, describe, expect, it } from 'vitest';
import { DEMO_PASSWORD, DEMO_STUDENT_EMAIL, DEMO_TEACHER_EMAIL } from './constants.ts';
import type { BoardPage } from '@/lib/ink.ts';

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

const page: BoardPage = { background: 'grid', strokes: [{ tool: 'pen', color: 'blue', size: 6, points: [10, 10, 0.5, 40, 40, 0.6] }] };

describe('demo presenting', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  let classId: string;
  beforeEach(async () => {
    api = await freshApi();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    classId = (await api.listMyClasses())[0].id;
  });

  it('remembers the blocks a teacher hides, per class and lesson', async () => {
    expect((await api.getLessonPrefs(classId, 'm10c-1-1')).hidden).toEqual([]);
    await api.setHiddenBlocks(classId, 'm10c-1-1', ['md-a', 'md-a', 'example-b']);
    expect((await api.getLessonPrefs(classId, 'm10c-1-1')).hidden).toEqual(['md-a', 'example-b']);
    expect((await api.getLessonPrefs(classId, 'm10c-1-2')).hidden).toEqual([]);
  });

  it('saves, updates and shares boards; students see only shared ones', async () => {
    const b = await api.saveBoard({ classId, lessonId: 'm10c-1-1', title: '  Warm-up  ', pages: [page] });
    expect(b.title).toBe('Warm-up');
    expect(b.shared).toBe(false);
    const again = await api.saveBoard({ id: b.id, classId, lessonId: 'm10c-1-1', title: 'Warm-up 2', pages: [page, { background: 'plain', strokes: [] }] });
    expect(again.id).toBe(b.id);
    expect(again.pages).toHaveLength(2);
    await api.saveBoard({ classId, lessonId: 'm10c-1-1', title: 'Shared', pages: [page], shared: true });
    expect(await api.listBoards(classId, 'm10c-1-1')).toHaveLength(2);
    expect(await api.listBoards(classId, 'm10c-1-2')).toHaveLength(0);

    await api.signOut();
    await api.signIn(DEMO_STUDENT_EMAIL, DEMO_PASSWORD);
    const seen = await api.listBoards(classId, 'm10c-1-1');
    expect(seen.map((x) => x.title)).toEqual(['Shared']);
    await expect(api.saveBoard({ classId, lessonId: 'm10c-1-1', title: 'Mine', pages: [page] })).rejects.toThrow();
    await expect(api.setBoardShared(b.id, true)).rejects.toThrow();
    await expect(api.setHiddenBlocks(classId, 'm10c-1-1', [])).rejects.toThrow();

    await api.signOut();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    await api.setBoardShared(b.id, true);
    await api.deleteBoard(seen[0].id);
    expect((await api.listBoards(classId, 'm10c-1-1')).map((x) => [x.title, x.shared])).toEqual([['Warm-up 2', true]]);
  });

  it('refuses boards too large for browser storage', async () => {
    const huge: BoardPage = { background: 'plain', strokes: Array.from({ length: 400 }, () => ({ tool: 'pen' as const, color: 'ink' as const, size: 6, points: Array.from({ length: 900 }, (_, i) => i + 0.5) })) };
    await expect(api.saveBoard({ classId, lessonId: 'm10c-1-1', title: 'Huge', pages: [huge] })).rejects.toThrow(/too large/);
  });
});

describe('demo live class questions', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  let classId: string;
  beforeEach(async () => {
    api = await freshApi();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    classId = (await api.listMyClasses())[0].id;
  });

  it('runs a question from the teacher to the students and back', async () => {
    let changes = 0;
    const stop = api.subscribeLive(classId, () => changes++);
    const q = await api.openLiveQuestion({ classId, lessonId: 'm10c-2-1', skillId: 'm4-label-sides', difficulty: 1, seed: 1234 });
    expect(q.status).toBe('open');
    expect(changes).toBe(1);
    // Asking again closes the previous question: one open question per class.
    const q2 = await api.openLiveQuestion({ classId, lessonId: 'm10c-2-1', skillId: 'm4-label-sides', difficulty: 2, seed: 99 });
    expect((await api.currentLiveQuestion(classId))?.id).toBe(q2.id);

    await api.signOut();
    await api.signIn(DEMO_STUDENT_EMAIL, DEMO_PASSWORD);
    expect((await api.currentLiveQuestion(classId))?.id).toBe(q2.id);
    await expect(api.submitLiveAnswer(q.id, ['a'])).rejects.toThrow(/closed/);
    await api.submitLiveAnswer(q2.id, ['a']);
    await api.submitLiveAnswer(q2.id, ['b']);
    const mine = await api.listLiveAnswers(q2.id);
    expect(mine.map((a) => a.responses)).toEqual([['b']]);
    await expect(api.openLiveQuestion({ classId, lessonId: null, skillId: 'm4-label-sides', difficulty: 1, seed: 1 })).rejects.toThrow();
    await expect(api.closeLiveQuestion(q2.id)).rejects.toThrow();

    await api.signOut();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    const added = await api.simulateLiveAnswers(q2.id);
    expect(added).toBeGreaterThan(5);
    const all = await api.listLiveAnswers(q2.id);
    expect(all.length).toBe(added + 1);
    expect(new Set(all.map((a) => a.studentId)).size).toBe(all.length);
    await api.closeLiveQuestion(q2.id);
    expect((await api.currentLiveQuestion(classId))?.status).toBe('closed');
    expect(await api.simulateLiveAnswers(q2.id)).toBe(0);
    stop();
  });
});

describe('demo students’ questions during a presentation', () => {
  let api: Awaited<ReturnType<typeof freshApi>>;
  let classId: string;
  beforeEach(async () => {
    api = await freshApi();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
    classId = (await api.listMyClasses())[0].id;
  });

  const asStudent = async () => {
    await api.signOut();
    await api.signIn(DEMO_STUDENT_EMAIL, DEMO_PASSWORD);
  };
  const asTeacher = async () => {
    await api.signOut();
    await api.signIn(DEMO_TEACHER_EMAIL, DEMO_PASSWORD);
  };

  it('takes questions only while the teacher presents, and keeps each presentation’s questions together', async () => {
    let changes = 0;
    const stop = api.subscribeQuestions(classId, () => changes++);
    await asStudent();
    expect(await api.currentPresentation(classId)).toBeNull();
    await expect(api.askQuestion({ classId, body: 'Why?', anonymous: true })).rejects.toThrow(/not presenting/);

    await asTeacher();
    const p = await api.startPresenting(classId, 'm10c-2-1');
    expect(changes).toBe(1);
    // The heartbeat keeps the start, and does not wake the class.
    expect((await api.startPresenting(classId, 'm10c-2-1')).startedAt).toBe(p.startedAt);
    expect(changes).toBe(1);

    await asStudent();
    expect(await api.currentPresentation(classId)).toEqual(p);
    const q = await api.askQuestion({ classId, body: '  Can you show the second step again?  ', anonymous: true });
    expect(q).toMatchObject({ body: 'Can you show the second step again?', lessonId: 'm10c-2-1', presentedAt: p.startedAt, status: 'new', anonymous: true });
    await api.askQuestion({ classId, body: 'Does it work for negatives?', anonymous: false });
    await expect(api.askQuestion({ classId, body: '   ', anonymous: true })).rejects.toThrow(/Type your question/);
    await expect(api.askQuestion({ classId, body: 'x'.repeat(301), anonymous: true })).rejects.toThrow(/300/);
    for (const body of ['Three?', 'Four?', 'Five?']) await api.askQuestion({ classId, body, anonymous: true });
    await expect(api.askQuestion({ classId, body: 'Six?', anonymous: true })).rejects.toThrow(/five questions/);
    expect((await api.listClassQuestions(classId)).length).toBe(5);
    await expect(api.setQuestionStatus(q.id, 'answered')).rejects.toThrow();
    await expect(api.startPresenting(classId, 'm10c-2-1')).rejects.toThrow();

    await asTeacher();
    // A sample student asks too, so the teacher sees questions from more than one student.
    expect(await api.simulateClassQuestion(classId)).not.toBeNull();
    const all = await api.listClassQuestions(classId, { presentedAt: p.startedAt });
    expect(all.length).toBe(6);
    expect(all.every((x) => x.studentName)).toBe(true);
    await api.setQuestionStatus(q.id, 'answered');
    await api.deleteQuestion(all[0].id);
    const after = await api.listClassQuestions(classId, { lessonId: 'm10c-2-1' });
    expect(after.length).toBe(5);
    expect(after.find((x) => x.id === q.id)?.status).toBe('answered');

    // Out of present mode and back in soon: the same presentation carries on.
    await api.stopPresenting(classId);
    await asStudent();
    expect(await api.currentPresentation(classId)).toBeNull();
    await asTeacher();
    expect((await api.startPresenting(classId, 'm10c-2-1')).startedAt).toBe(p.startedAt);
    // Another lesson starts afresh.
    expect((await api.startPresenting(classId, 'm10c-2-2')).startedAt >= p.startedAt).toBe(true);
    expect(await api.listClassQuestions(classId, { lessonId: 'm10c-2-2' })).toEqual([]);
    stop();
  });
});
