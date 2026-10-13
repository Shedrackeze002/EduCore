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
