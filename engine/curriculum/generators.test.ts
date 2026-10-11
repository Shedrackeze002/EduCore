import { describe, expect, it } from 'vitest';
import { allSkills, COURSES } from './index.ts';
import { checkSkill } from './testing.ts';

describe('every skill generator', () => {
  for (const s of allSkills()) checkSkill(s);
});

describe('course structure', () => {
  it('every lesson skill exists and every skill belongs to its lesson', () => {
    const ids = new Set(allSkills().map((s) => s.id));
    for (const c of COURSES) {
      for (const l of c.lessons) for (const sk of l.skills) expect(ids.has(sk), `${l.id} -> ${sk}`).toBe(true);
    }
    const lessons = new Map(COURSES.flatMap((c) => c.lessons.map((l) => [l.id, l] as const)));
    for (const s of allSkills()) expect(lessons.get(s.lessonId)?.skills, `${s.id} names lesson ${s.lessonId}, which does not list it`).toContain(s.id);
  });

  it('lesson and unit ids are unique across courses, and lesson outcomes exist in their course', () => {
    const lessonIds = COURSES.flatMap((c) => c.lessons.map((l) => l.id));
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
    const unitIds = COURSES.flatMap((c) => c.units.map((u) => u.id));
    expect(new Set(unitIds).size).toBe(unitIds.length);
    for (const c of COURSES) {
      const codes = new Set(c.outcomes.map((o) => o.code));
      for (const l of c.lessons) for (const o of l.outcomes) expect(codes.has(o), `${l.id} outcome ${o}`).toBe(true);
    }
  });
});
