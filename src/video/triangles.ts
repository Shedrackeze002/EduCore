/**
 * Triangle and rectangle figures for video diagrams: a right triangle with a square on each side
 * (the Pythagorean theorem), a triangle of any shape and turn with its sides and corners labelled,
 * and a rectangle with its diagonal. Like the solids (`solids.ts`), each returns points and named
 * parts to put into a diagram with `figure`. Points are [x, y], with y up.
 */
import type { DiagramItem, DiagramTone } from './script.ts';
import type { Part } from './solids.ts';
import { facing } from './angles.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);
const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];
const deg = (v: P) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** The side of the line from `p` to `q`, looking along it, away from `r`. */
function outside(p: P, q: P, r: P): 'left' | 'right' {
  const d = sub(q, p);
  const w = sub(r, p);
  return d[0] * w[1] - d[1] * w[0] > 0 ? 'right' : 'left';
}

/**
 * The square on one side of a triangle, from `p` to `q`, built outward (away from `r`) and split
 * into unit cells when the side is a whole number long.
 */
function square(points: Record<string, P>, n: (s: string) => string, key: string, p: P, q: P, r: P, tone: DiagramTone, area?: string): DiagramItem[] {
  const d = sub(q, p);
  const len = Math.hypot(d[0], d[1]);
  // Turn the side a quarter turn, toward the outside.
  const out: P = outside(p, q, r) === 'right' ? [d[1], -d[0]] : [-d[1], d[0]];
  const corners = [p, q, add(q, out), add(p, out)];
  corners.forEach((c, i) => (points[n(`${key}${i}`)] = c));
  const ring = [0, 1, 2, 3].map((i) => n(`${key}${i}`));
  const group = n(key);
  const items: DiagramItem[] = [{ kind: 'region', id: n(`${key}-fill`), points: ring, tone, shade: 0.25, group }];
  const cells = Math.round(len);
  if (Math.abs(len - cells) < 1e-9) {
    for (let i = 1; i < cells; i++) {
      const along = mul(d, i / cells);
      const up = mul(out, i / cells);
      Object.assign(points, {
        [n(`${key}u${i}a`)]: add(p, along),
        [n(`${key}u${i}b`)]: add(add(p, along), out),
        [n(`${key}v${i}a`)]: add(p, up),
        [n(`${key}v${i}b`)]: add(q, up),
      });
      items.push(
        { kind: 'line', id: n(`${key}-u${i}`), from: n(`${key}u${i}a`), to: n(`${key}u${i}b`), tone: 'muted', weight: 1.5, group },
        { kind: 'line', id: n(`${key}-v${i}`), from: n(`${key}v${i}a`), to: n(`${key}v${i}b`), tone: 'muted', weight: 1.5, group },
      );
    }
  }
  items.push({ kind: 'curve', id: n(`${key}-edge`), points: ring, closed: true, tone, group });
  if (area) {
    points[n(`${key}-mid`)] = add(add(p, mul(d, 0.5)), mul(out, 0.5));
    items.push({ kind: 'label', id: n(`${key}-area`), at: n(`${key}-mid`), tex: area, tone: 'ink', place: 'center', group });
  }
  return items;
}

/**
 * A right triangle with legs `a` (up the left side) and `b` (along the bottom), the right angle
 * at the bottom left, and a square on each side: orange on `a`, blue on `b` and pink on the
 * hypotenuse. With whole-number sides (3, 4, 5), each square is split into unit squares.
 *
 * Parts: `tri` (a group: the sides `a`, `b` and `c`, labelled from `labels`, and the right-angle
 * mark) and the squares `sq-a`, `sq-b` and `sq-c` (groups, with their areas from `areas`).
 */
export function squaresOnSides(o: { name?: string; a: number; b: number; labels?: Partial<Record<'a' | 'b' | 'c', string>>; areas?: Partial<Record<'a' | 'b' | 'c', string>> }): Part {
  const n = namer(o.name);
  const C: P = [0, 0];
  const A: P = [0, o.a];
  const B: P = [o.b, 0];
  const points: Record<string, P> = { [n('C')]: C, [n('A')]: A, [n('B')]: B };
  const items: DiagramItem[] = [
    ...square(points, n, 'sq-a', C, A, B, 'opp', o.areas?.a),
    ...square(points, n, 'sq-b', B, C, A, 'adj', o.areas?.b),
    ...square(points, n, 'sq-c', A, B, C, 'hyp', o.areas?.c),
    { kind: 'line', id: n('a'), from: n('C'), to: n('A'), tone: 'opp', ...(o.labels?.a ? { label: o.labels.a, labelSide: 'right' as const } : {}), group: n('tri') },
    { kind: 'line', id: n('b'), from: n('B'), to: n('C'), tone: 'adj', ...(o.labels?.b ? { label: o.labels.b, labelSide: 'right' as const } : {}), group: n('tri') },
    { kind: 'line', id: n('c'), from: n('A'), to: n('B'), tone: 'hyp', ...(o.labels?.c ? { label: o.labels.c, labelSide: 'right' as const } : {}), group: n('tri') },
    { kind: 'right', id: n('right'), at: n('C'), from: n('A'), to: n('B'), group: n('tri') },
  ];
  return { points, items };
}

/**
 * A triangle with corners `A`, `B` and `C` (or the names in `names`), its sides labelled outside
 * from `sides` and its corners from `names`. `right` marks a right angle at one corner, and
 * `tones` colours the sides.
 *
 * Parts: `shape` (a group: the sides `AB`, `BC` and `CA`, and the right-angle mark `right`) and
 * `names` (a group: the corner letters `nA`, `nB` and `nC`).
 */
export function triangle(o: { name?: string; A: P; B: P; C: P; right?: 'A' | 'B' | 'C'; names?: [string, string, string]; sides?: Partial<Record<'AB' | 'BC' | 'CA', string>>; tones?: Partial<Record<'AB' | 'BC' | 'CA', DiagramTone>> }): Part {
  const n = namer(o.name);
  const at = { A: o.A, B: o.B, C: o.C };
  const points: Record<string, P> = { [n('A')]: o.A, [n('B')]: o.B, [n('C')]: o.C };
  const items: DiagramItem[] = (['AB', 'BC', 'CA'] as const).map((s) => {
    const [p, q] = [s[0], s[1]] as ['A' | 'B' | 'C', 'A' | 'B' | 'C'];
    const r = (['A', 'B', 'C'] as const).find((k) => k !== p && k !== q)!;
    const label = o.sides?.[s];
    const tone = o.tones?.[s];
    return { kind: 'line', id: n(s), from: n(p), to: n(q), ...(tone ? { tone } : {}), ...(label ? { label, labelSide: outside(at[p], at[q], at[r]) } : {}), group: n('shape') };
  });
  if (o.right) {
    const others = (['A', 'B', 'C'] as const).filter((k) => k !== o.right);
    items.push({ kind: 'right', id: n('right'), at: n(o.right), from: n(others[0]), to: n(others[1]), group: n('shape') });
  }
  if (o.names) {
    const mid = mul(add(add(o.A, o.B), o.C), 1 / 3);
    (['A', 'B', 'C'] as const).forEach((k, i) => {
      // Each letter sits outside its corner, away from the middle of the triangle.
      items.push({ kind: 'label', id: n(`n${k}`), at: n(k), tex: o.names![i], place: facing(deg(sub(at[k], mid))), group: n('names') });
    });
  }
  return { points, items };
}

/**
 * A rectangle `w` wide and `h` high, with its bottom left corner at `at`, and its diagonal from the
 * bottom left to the top right. Labels: `w` along the bottom, `h` up the right side and `d` on
 * the diagonal.
 *
 * Parts: `shape` (a group: the fill and the four sides), `w`, `h`, `d` (the diagonal) and
 * `right` (the right-angle mark at the bottom right).
 */
export function rectangle(o: { name?: string; at?: P; w: number; h: number; labels?: Partial<Record<'w' | 'h' | 'd', string>> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('P')]: [x, y], [n('Q')]: [x + o.w, y], [n('R')]: [x + o.w, y + o.h], [n('S')]: [x, y + o.h] };
  const items: DiagramItem[] = [
    { kind: 'region', id: n('fill'), points: ['P', 'Q', 'R', 'S'].map(n), tone: 'brand', group: n('shape') },
    { kind: 'line', id: n('top'), from: n('R'), to: n('S'), group: n('shape') },
    { kind: 'line', id: n('left'), from: n('S'), to: n('P'), group: n('shape') },
    { kind: 'line', id: n('w'), from: n('P'), to: n('Q'), tone: 'adj', ...(o.labels?.w ? { label: o.labels.w, labelSide: 'right' as const } : {}), group: n('shape') },
    { kind: 'line', id: n('h'), from: n('Q'), to: n('R'), tone: 'opp', ...(o.labels?.h ? { label: o.labels.h, labelSide: 'right' as const } : {}), group: n('shape') },
    { kind: 'line', id: n('d'), from: n('P'), to: n('R'), tone: 'hyp', ...(o.labels?.d ? { label: o.labels.d, labelSide: 'left' as const } : {}) },
    { kind: 'right', id: n('right'), at: n('Q'), from: n('P'), to: n('R') },
  ];
  return { points, items };
}
