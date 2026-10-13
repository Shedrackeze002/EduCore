/**
 * Results of a live question, worked out on the teacher's screen: every answer is graded with
 * the same engine as practice, and the wrong ones are grouped so the class can talk about the
 * most common mistakes.
 */
import { gradeItem } from '@engine/grade.ts';
import type { Item } from '@engine/types.ts';
import type { LiveAnswer } from '@/data/types.ts';

export interface ChoiceTally {
  id: string;
  letter: string;
  md: string;
  count: number;
  correct: boolean;
}

export interface WrongGroup {
  /** The answer as the students wrote it (the first spelling seen). */
  text: string;
  count: number;
}

export interface LiveResults {
  answered: number;
  correct: number;
  /** For a single multiple-choice question: how many picked each choice. */
  choices: ChoiceTally[] | null;
  /** Wrong answers, most common first. */
  wrong: WrongGroup[];
  /** False when the question has a part only a teacher can mark. */
  gradable: boolean;
}

const LETTERS = 'ABCDEFGHIJ';
const key = (rs: string[]) => rs.map((r) => (r ?? '').trim().toLowerCase().replace(/\s+/g, '')).join('|');

/** How an answer reads on the slide: choices by letter, typed answers as typed. */
export function answerText(item: Item, responses: string[]): string {
  const parts = item.parts.map((p, i) => {
    const r = (responses[i] ?? '').trim();
    const a = p.answer;
    if (a.kind === 'mc' || a.kind === 'multi') {
      const ids = r ? r.split(',') : [];
      const letters = ids.map((id) => {
        const k = a.choices.findIndex((c) => c.id === id.trim());
        return k >= 0 ? LETTERS[k] : '?';
      });
      return letters.length ? letters.join(', ') : '(blank)';
    }
    if (a.kind === 'graph-line' || a.kind === 'graph-points') return r ? 'a graph' : '(blank)';
    return r || '(blank)';
  });
  return parts.length > 1 ? parts.map((t, i) => `${String.fromCharCode(97 + i)}) ${t}`).join('   ') : parts[0] ?? '';
}

export function liveResults(item: Item, answers: LiveAnswer[]): LiveResults {
  const gradable = item.parts.every((p) => p.answer.kind !== 'manual');
  let correct = 0;
  const wrong = new Map<string, WrongGroup>();
  for (const a of answers) {
    const ok = gradable && gradeItem(item, a.responses).correct;
    if (ok) {
      correct++;
      continue;
    }
    const k = key(a.responses);
    const g = wrong.get(k);
    if (g) g.count++;
    else wrong.set(k, { text: answerText(item, a.responses), count: 1 });
  }
  const only = item.parts.length === 1 ? item.parts[0].answer : null;
  const choices =
    only && only.kind === 'mc'
      ? only.choices.map((c, i) => ({ id: c.id, letter: LETTERS[i], md: c.md, count: answers.filter((a) => (a.responses[0] ?? '').trim() === c.id).length, correct: c.id === only.correct }))
      : null;
  return { answered: answers.length, correct, choices, wrong: [...wrong.values()].sort((a, b) => b.count - a.count), gradable };
}
