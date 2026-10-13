/** Demo only: plausible answers from the sample class, so a live question shows real-looking results. */
import { canonicalResponse } from '@engine/answers.ts';
import { fmt, fmtFixed } from '@engine/math/numbers.ts';
import type { Rng } from '@engine/rng.ts';
import type { Item, Part } from '@engine/types.ts';

/** A typical wrong answer for a part: another choice, or a number off by a common slip. */
function wrongFor(part: Part, rng: Rng): string | null {
  const a = part.answer;
  switch (a.kind) {
    case 'mc': {
      const others = a.choices.filter((c) => c.id !== a.correct);
      return others.length ? others[rng.int(0, others.length - 1)].id : null;
    }
    case 'multi': {
      const ids = a.choices.map((c) => c.id);
      const pick = ids.filter((id) => (a.correct.includes(id) ? rng.next() < 0.5 : rng.next() < 0.3));
      return pick.length && pick.join(',') !== a.correct.join(',') ? pick.join(',') : ids.find((id) => !a.correct.includes(id)) ?? null;
    }
    case 'numeric': {
      if (a.undefinedValue) return '0';
      const v = a.value;
      const slips = [v + 1, v - 1, v * 2, v / 2, -v, v * 10].filter((x) => Number.isFinite(x) && Math.abs(x - v) > 1e-9);
      const w = slips[rng.int(0, slips.length - 1)];
      return a.decimals !== undefined ? fmtFixed(w, a.decimals) : fmt(w, 4);
    }
    default:
      return null;
  }
}

/** Responses to every part: all correct, or one part with a common mistake. */
export function simulatedResponses(item: Item, correct: boolean, rng: Rng): string[] {
  const right = item.parts.map((p) => canonicalResponse(p.answer, p));
  if (correct) return right;
  const wrongable = item.parts.map((p, i) => [i, wrongFor(p, rng)] as const).filter(([, w]) => w !== null);
  if (!wrongable.length) return right;
  const [i, w] = wrongable[rng.int(0, wrongable.length - 1)];
  return right.map((r, j) => (j === i ? (w as string) : r));
}
