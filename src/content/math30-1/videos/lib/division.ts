/**
 * Synthetic division for the Math 30-1 polynomial videos, drawn as a diagram so that each number
 * appears as the narrator reaches it. It is the lesson's array: `a` on the left of a bar, the
 * coefficients along the top, the products under them, and the results below a line, with the
 * remainder boxed. Built only from standard diagram parts (labels and lines), so it goes into a
 * diagram with `figure` like the figures in `src/video/`.
 *
 * Parts: `a`; the coefficients `c0`, `c1`… (group `top`); the products `p1`, `p2`… (group `mid`);
 * the results `s0`, `s1`… (group `bottom`; the last is the remainder); the multiply arrows `m1`,
 * `m2`… from each result to the next product (group `arrows`); the bar and line (group `frame`);
 * the box around the remainder (group `box`); and, with `powers`, the power of x over each column
 * (group `powers`).
 */
import type { DiagramItem, DiagramTone } from '@/video/script.ts';
import type { Part } from '@/video/solids.ts';

type P = [number, number];

export function synthetic(o: {
  /** Prefixes every part id, for two divisions in one diagram. */
  name?: string;
  /** Divide by x − a. */
  a: number;
  /** The coefficients, highest power first, with 0 for a missing power. */
  coeffs: number[];
  /** TeX over each column, such as ['x^3', 'x^2', 'x', '1']. */
  powers?: string[];
  /** Column spacing in diagram units (2 by default); widen it for numbers like −120. */
  gap?: number;
  at?: P;
}): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const W = o.gap ?? 2;
  const H = 1.3;
  const [x0, y0] = o.at ?? [0, 0];
  const c = o.coeffs;
  const last = c.length - 1;
  // Bring down the first coefficient; then multiply by a and add, column by column.
  const s: number[] = [c[0]];
  const p: number[] = [0];
  for (let i = 1; i <= last; i++) {
    p.push(s[i - 1] * o.a);
    s.push(c[i] + p[i]);
  }
  const X = (i: number) => x0 + (i + 1) * W;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const label = (id: string, at: P, tex: string, tone?: DiagramTone, group?: string) => {
    points[n(id)] = at;
    items.push({ kind: 'label', id: n(id), at: n(id), tex, place: 'center', ...(tone ? { tone } : {}), ...(group ? { group: n(group) } : {}) });
  };
  const line = (id: string, from: P, to: P, extra: Partial<Extract<DiagramItem, { kind: 'line' }>>) => {
    points[n(`${id}-a`)] = from;
    points[n(`${id}-b`)] = to;
    items.push({ kind: 'line', id: n(id), from: n(`${id}-a`), to: n(`${id}-b`), ...extra });
  };
  const top = y0 + 2 * H;
  const rule = y0 + 0.5 * H;

  line('vbar', [x0 + W / 2, top + 0.55], [x0 + W / 2, rule], { weight: 2.5, group: n('frame') });
  line('hbar', [x0 + W / 2, rule], [X(last) + 0.55 * W, rule], { weight: 2.5, group: n('frame') });
  label('a', [x0 + 0.1 * W, top], String(o.a), 'theta');
  c.forEach((v, i) => label(`c${i}`, [X(i), top], String(v), undefined, 'top'));
  o.powers?.forEach((t, i) => label(`x${i}`, [X(i), top + 0.95], t, 'muted', 'powers'));
  for (let i = 1; i <= last; i++) {
    line(`m${i}`, [X(i - 1) + 0.3 * W, y0 + 0.3], [X(i) - 0.32 * W, y0 + H - 0.36], { tone: 'muted', weight: 2, arrow: true, group: n('arrows') });
    label(`p${i}`, [X(i), y0 + H], String(p[i]), 'adj', 'mid');
  }
  s.forEach((v, i) => label(`s${i}`, [X(i), y0], String(v), i === last ? 'good' : 'brand', 'bottom'));
  // The box around the remainder.
  const [bl, br, bt, bb] = [X(last) - 0.4 * W, X(last) + 0.4 * W, y0 + 0.42, y0 - 0.42];
  line('box-t', [bl, bt], [br, bt], { tone: 'good', weight: 2.5, group: n('box') });
  line('box-r', [br, bt], [br, bb], { tone: 'good', weight: 2.5, group: n('box') });
  line('box-b', [br, bb], [bl, bb], { tone: 'good', weight: 2.5, group: n('box') });
  line('box-l', [bl, bb], [bl, bt], { tone: 'good', weight: 2.5, group: n('box') });
  return { points, items };
}

/**
 * The parts to show for each step of a synthetic division: `bring` shows the first result, and
 * `step(i)` the multiply arrow, product and result of column i. `setup` is the frame, a and the
 * coefficients; `all` is everything at once (for a division already explained).
 */
export function steps(id: string, name?: string) {
  const n = (s: string) => `${id}.${name ? `${name}-` : ''}${s}`;
  return {
    setup: [n('frame'), n('a'), n('top')],
    bring: n('s0'),
    step: (i: number) => [n(`m${i}`), n(`p${i}`), n(`s${i}`)],
    box: n('box'),
    all: [n('frame'), n('a'), n('top'), n('mid'), n('bottom'), n('arrows'), n('box')],
  };
}
