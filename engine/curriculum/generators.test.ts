import { describe, expect, it } from 'vitest';
import { allSkills, COURSES } from './index.ts';
import { gradeItem } from '../grade.ts';
import { canonicalResponses } from '../answers.ts';
import type { Difficulty } from '../types.ts';

const SEEDS = Number(process.env.GEN_SEEDS ?? 60);

describe('every skill generator', () => {
  for (const s of allSkills()) {
    it(`${s.id} generates valid, self-consistent items`, () => {
      const prompts = new Set<string>();
      for (const d of [1, 2, 3] as Difficulty[]) {
        for (let seed = 1; seed <= SEEDS; seed++) {
          const item = s.generate(seed, d);
          const ctx = `${s.id} seed=${seed} d=${d}`;
          expect(item.prompt, ctx).toBeTruthy();
          expect(item.parts.length, ctx).toBeGreaterThan(0);
          expect(item.solution.length, ctx).toBeGreaterThan(0);
          expect(item.hints.length, ctx).toBeGreaterThan(0);
          const text = JSON.stringify(item);
          expect(text.includes('NaN'), `${ctx} contains NaN: ${text.slice(0, 400)}`).toBe(false);
          expect(text.includes('undefined') && !text.includes('"undefinedValue"') && !/undefined/.test(item.solution.join('') + item.hints.join('') + item.prompt) ? true : !/\bInfinity\b/.test(text), ctx).toBe(true);
          for (const p of item.parts) {
            const a = p.answer;
            if (a.kind === 'mc') {
              expect(a.choices.some((c) => c.id === a.correct), ctx).toBe(true);
              expect(a.choices.length, `${ctx} too few choices`).toBeGreaterThanOrEqual(2);
              const mds = a.choices.map((c) => c.md + JSON.stringify(c.figure ?? ''));
              expect(new Set(mds).size, `${ctx} duplicate choices ${mds.join(' | ')}`).toBe(mds.length);
            }
            if (a.kind === 'numeric') expect(Number.isFinite(a.value), ctx).toBe(true);
          }
          const res = gradeItem(item, canonicalResponses(item));
          expect(res.correct, `${ctx} canonical answer graded wrong: ${JSON.stringify(canonicalResponses(item))} -> ${JSON.stringify(res.parts)} | ${item.prompt}`).toBe(true);
          prompts.add(JSON.stringify([item.prompt, item.figure, item.parts]));
        }
      }
      expect(prompts.size, `${s.id} has too little variety`).toBeGreaterThan(5);
    });
  }
});

describe('course structure', () => {
  it('every lesson skill exists and every skill belongs to its lesson', () => {
    const ids = new Set(allSkills().map((s) => s.id));
    for (const c of COURSES) {
      for (const l of c.lessons) for (const sk of l.skills) expect(ids.has(sk), `${l.id} -> ${sk}`).toBe(true);
    }
  });
});
