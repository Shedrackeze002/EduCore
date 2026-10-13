import { describe, expect, it } from 'vitest';
import type { Item } from '@engine/types.ts';
import type { LiveAnswer } from '@/data/types.ts';
import { answerText, liveResults } from './results.ts';

const base = { id: 't', skillId: 's', difficulty: 1 as const, prompt: 'Q', hints: [], solution: [] };
const ans = (responses: string[], i = 0): LiveAnswer => ({ questionId: 'q', studentId: `s${i}`, responses, answeredAt: '2026-10-13T00:00:00Z' });

describe('live results', () => {
  it('tallies a multiple-choice question by choice', () => {
    const item: Item = { ...base, parts: [{ answer: { kind: 'mc', correct: 'b', choices: [{ id: 'a', md: '1' }, { id: 'b', md: '2' }, { id: 'c', md: '3' }] } }] };
    const r = liveResults(item, [ans(['b'], 1), ans(['b'], 2), ans(['a'], 3), ans(['c'], 4)]);
    expect(r).toMatchObject({ answered: 4, correct: 2, gradable: true });
    expect(r.choices?.map((c) => [c.letter, c.count, c.correct])).toEqual([
      ['A', 1, false],
      ['B', 2, true],
      ['C', 1, false],
    ]);
    expect(r.wrong.map((w) => w.text)).toEqual(['A', 'C']);
  });

  it('groups typed wrong answers, ignoring case and spaces, most common first', () => {
    const item: Item = { ...base, parts: [{ answer: { kind: 'numeric', value: 0.75 } }] };
    const r = liveResults(item, [ans(['3/4'], 1), ans(['0.75'], 2), ans(['4/3'], 3), ans([' 4 / 3 '], 4), ans(['1.33'], 5), ans([''], 6)]);
    expect(r.correct).toBe(2);
    expect(r.choices).toBeNull();
    expect(r.wrong).toEqual([
      { text: '4/3', count: 2 },
      { text: '1.33', count: 1 },
      { text: '(blank)', count: 1 },
    ]);
  });

  it('labels the parts of a several-part answer', () => {
    const item: Item = { ...base, parts: [{ answer: { kind: 'numeric', value: 1 } }, { answer: { kind: 'numeric', value: 2 } }] };
    expect(answerText(item, ['1', '3'])).toBe('a) 1   b) 3');
  });

  it('does not count a teacher-marked question as right or wrong', () => {
    const item: Item = { ...base, parts: [{ answer: { kind: 'manual' } }] };
    const r = liveResults(item, [ans(['my working'], 1)]);
    expect(r).toMatchObject({ answered: 1, correct: 0, gradable: false });
  });
});
