// Work-in-progress check for Math 9 Unit 9 only (removed once the course is complete).
import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { checkSkill } from '../../testing.ts';
import { checkLessonFile } from '@/content/testing.ts';
import { LESSONS } from '../course.ts';
import { SYMMETRY_SKILLS as SKILLS } from './symmetry.ts';

const UNIT = 'm9-u9';
const lessons = LESSONS.filter((l) => l.unitId === UNIT);
const expected = lessons.flatMap((l) => l.skills);
const ids = new Set(SKILLS.map((s) => s.id));

describe(`Math 9 ${UNIT}`, () => {
  it('implements exactly the unit skills, each tied to its lesson and outcomes', () => {
    expect([...ids].sort()).toEqual([...expected].sort());
    for (const s of SKILLS) {
      const l = lessons.find((x) => x.id === s.lessonId);
      expect(l?.skills, `${s.id} lessonId`).toContain(s.id);
      for (const o of s.outcomes) expect(l!.outcomes, `${s.id} outcome ${o}`).toContain(o);
    }
  });
  for (const s of SKILLS) checkSkill(s);
  for (const l of lessons) {
    it(`lesson ${l.id}`, () => {
      const path = join(__dirname, '../../../../src/content/math9/lessons', `${l.id}.md`);
      expect(existsSync(path), `missing ${path}`).toBe(true);
      checkLessonFile(path, l, (id) => ids.has(id), `${l.id}.md`);
    });
  }
});
