/**
 * Measuring tools for video diagrams: a metric or imperial ruler with a bar to measure, a vernier
 * caliper's two scales, and a grid of unit squares. Like the solids (`solids.ts`), each returns
 * points and named parts to put into a diagram with `figure`.
 */
import type { DiagramItem } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

/**
 * A ruler, `length` units long (centimetres in mm, or inches in sixteenths), with a bar on it from
 * `start` to `end`.
 *
 * Parts: `scale` (a group: the ruler, its marks and numbers), each mark `t<i>` (the i-th smallest
 * division from 0, so `t63` is 6.3 cm and `t43` is 2 11/16 in), `bar`, the bar's `start` and
 * `end` lines, and `reading` (the label `reading`, above the end).
 */
export function ruler(o: { name?: string; system: 'metric' | 'imperial'; length: number; start?: number; end?: number; reading?: string; division?: 16 | 8 | 4 }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const metric = o.system === 'metric';
  const sub = metric ? 10 : (o.division ?? 16);
  // The ruler's height, and the length of each kind of mark, in the ruler's units.
  const H = metric ? 1.1 : 0.55;
  const mark = (i: number) => {
    if (i % sub === 0) return 0.42;
    if (metric) return i % 5 === 0 ? 0.3 : 0.2;
    if (i % (sub / 2) === 0) return 0.32;
    if (i % (sub / 4) === 0) return 0.25;
    if (i % (sub / 8) === 0) return 0.19;
    return 0.13;
  };
  const points: Record<string, P> = {
    [n('b0')]: [-0.25, 0],
    [n('b1')]: [o.length + 0.25, 0],
    [n('b2')]: [o.length + 0.25, -H],
    [n('b3')]: [-0.25, -H],
    [n('unit')]: [o.length + 0.3, -0.5 * H],
  };
  const scale = n('scale');
  const items: DiagramItem[] = [{ kind: 'region', id: n('body'), points: ['b0', 'b1', 'b2', 'b3'].map(n), tone: 'theta', group: scale }];
  for (let i = 0; i <= o.length * sub; i++) {
    const x = i / sub;
    points[n(`m${i}`)] = [x, 0];
    points[n(`e${i}`)] = [x, -mark(i) * H];
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`m${i}`), to: n(`e${i}`), weight: i % sub === 0 ? 3 : 2, group: scale });
    if (i % sub === 0) {
      points[n(`n${i}`)] = [x, -0.5 * H];
      items.push({ kind: 'label', id: n(`num${i / sub}`), at: n(`n${i}`), tex: String(i / sub), place: 'below', group: scale });
    }
  }
  items.push({ kind: 'label', id: n('unit-label'), at: n('unit'), tex: metric ? '\\text{cm}' : '\\text{in}', tone: 'muted', place: 'right', group: scale });
  if (o.start !== undefined && o.end !== undefined) {
    const lo = 0.18 * H;
    const hi = 0.62 * H;
    Object.assign(points, {
      [n('a0')]: [o.start, lo],
      [n('a1')]: [o.end, lo],
      [n('a2')]: [o.end, hi],
      [n('a3')]: [o.start, hi],
      [n('s0')]: [o.start, 0],
      [n('s1')]: [o.start, hi + 0.1 * H],
      [n('f0')]: [o.end, 0],
      [n('f1')]: [o.end, hi + 0.1 * H],
    });
    const bar = ['a0', 'a1', 'a2', 'a3'].map(n);
    items.push(
      { kind: 'region', id: n('bar-fill'), points: bar, tone: 'brand', group: n('bar') },
      { kind: 'curve', id: n('bar-edge'), points: bar, closed: true, tone: 'brand', group: n('bar') },
      { kind: 'line', id: n('start'), from: n('s1'), to: n('s0'), tone: 'theta', dashed: true },
      { kind: 'line', id: n('end'), from: n('f1'), to: n('f0'), tone: 'theta', dashed: true },
    );
    if (o.reading) items.push({ kind: 'label', id: n('reading'), at: n('f1'), tex: o.reading, tone: 'theta', place: 'above' });
  }
  return { points, items };
}

/**
 * The two scales of a vernier caliper reading `reading` millimetres: the main scale in millimetres
 * (numbered in centimetres) and, below it, the sliding vernier scale, whose 10 divisions span 9 mm.
 *
 * Parts: `main` and `vernier` (groups: each scale), `zero` (the vernier's 0), `before` (the main
 * mark just before it, the whole millimetres) and `match` (the vernier mark that lines up with a
 * main mark, and that main mark).
 */
export function vernier(o: { name?: string; reading: number }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const whole = Math.floor(o.reading + 1e-9);
  const tenths = Math.round((o.reading - whole) * 10);
  const from = Math.max(0, Math.floor((whole - 6) / 10) * 10);
  const to = from + 30;
  // The boundary between the scales is y = 0: main marks rise from it, vernier marks hang below.
  const points: Record<string, P> = {
    [n('mb0')]: [from - 0.8, 0],
    [n('mb1')]: [to + 0.8, 0],
    [n('mb2')]: [to + 0.8, 4.2],
    [n('mb3')]: [from - 0.8, 4.2],
    [n('vb0')]: [o.reading - 0.6, 0],
    [n('vb1')]: [o.reading + 9.6, 0],
    [n('vb2')]: [o.reading + 9.6, -4.2],
    [n('vb3')]: [o.reading - 0.6, -4.2],
  };
  const main = n('main');
  const vern = n('vernier');
  const items: DiagramItem[] = [
    { kind: 'region', id: n('main-body'), points: ['mb0', 'mb1', 'mb2', 'mb3'].map(n), tone: 'muted', group: main },
    { kind: 'region', id: n('vernier-body'), points: ['vb0', 'vb1', 'vb2', 'vb3'].map(n), tone: 'brand', group: vern },
  ];
  for (let v = from; v <= to; v++) {
    points[n(`m${v}`)] = [v, 0];
    points[n(`mt${v}`)] = [v, v % 10 === 0 ? 2.4 : v % 5 === 0 ? 1.7 : 1.1];
    items.push({ kind: 'line', id: n(`main${v}`), from: n(`m${v}`), to: n(`mt${v}`), weight: v % 10 === 0 ? 3 : 2, group: main });
    if (v % 10 === 0) items.push({ kind: 'label', id: n(`cm${v / 10}`), at: n(`mt${v}`), tex: String(v / 10), place: 'above', group: main });
  }
  for (let k = 0; k <= 10; k++) {
    const x = o.reading + 0.9 * k;
    points[n(`v${k}`)] = [x, 0];
    points[n(`vt${k}`)] = [x, k % 5 === 0 ? -2 : -1.3];
    items.push({ kind: 'line', id: n(`ver${k}`), from: n(`v${k}`), to: n(`vt${k}`), weight: k % 5 === 0 ? 3 : 2, group: vern });
    if (k % 5 === 0) items.push({ kind: 'label', id: n(`vn${k}`), at: n(`vt${k}`), tex: String(k), place: 'below', group: vern });
  }
  points[n('mm')] = [to + 0.8, 2.4];
  items.push({ kind: 'label', id: n('mm-label'), at: n('mm'), tex: '\\text{cm}', tone: 'muted', place: 'right', group: main });
  // The marks a reading uses, drawn over the scales in colour.
  points[n('zt')] = [o.reading, -2.6];
  points[n('bt')] = [whole, 2.8];
  items.push(
    { kind: 'line', id: n('zero'), from: n('v0'), to: n('zt'), tone: 'theta', weight: 5 },
    { kind: 'line', id: n('before'), from: n(`m${whole}`), to: n('bt'), tone: 'theta', weight: 5 },
    { kind: 'line', id: n('match-main'), from: n(`m${whole + tenths}`), to: n(`mt${whole + tenths}`), tone: 'good', weight: 5, group: n('match') },
    { kind: 'line', id: n('match-vernier'), from: n(`v${tenths}`), to: n(`vt${tenths}`), tone: 'good', weight: 5, group: n('match') },
  );
  if (tenths % 5 !== 0) items.push({ kind: 'label', id: n('match-label'), at: n(`vt${tenths}`), tex: String(tenths), tone: 'good', place: 'below', group: n('match') });
  return { points, items };
}

/**
 * A square of side 1 (in `unit`) split into `split` × `split` smaller squares, to show that, for
 * example, 1 cm² is 100 mm². `at` is its bottom left corner.
 *
 * Parts: `square` (its outline), `grid` (the lines inside), and the side labels `side` and `cells`.
 */
export function unitSquare(o: { name?: string; at?: P; split: number; size?: number; labels?: { side?: string; cells?: string } }): Part {
  const n = (s: string) => (o.name ? `${o.name}-${s}` : s);
  const [x, y] = o.at ?? [0, 0];
  const L = o.size ?? 10;
  const points: Record<string, P> = { [n('A')]: [x, y], [n('B')]: [x + L, y], [n('C')]: [x + L, y + L], [n('D')]: [x, y + L] };
  const items: DiagramItem[] = [{ kind: 'region', id: n('fill'), points: ['A', 'B', 'C', 'D'].map(n), tone: 'brand', group: n('square') }];
  for (let i = 1; i < o.split; i++) {
    const t = (i * L) / o.split;
    Object.assign(points, { [n(`x${i}a`)]: [x + t, y], [n(`x${i}b`)]: [x + t, y + L], [n(`y${i}a`)]: [x, y + t], [n(`y${i}b`)]: [x + L, y + t] });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`x${i}a`), to: n(`x${i}b`), tone: 'muted', weight: 1.5, group: n('grid') }, { kind: 'line', id: n(`gy${i}`), from: n(`y${i}a`), to: n(`y${i}b`), tone: 'muted', weight: 1.5, group: n('grid') });
  }
  items.push(
    { kind: 'line', id: n('ab'), from: n('A'), to: n('B'), group: n('square') },
    { kind: 'line', id: n('bc'), from: n('B'), to: n('C'), group: n('square') },
    { kind: 'line', id: n('cd'), from: n('C'), to: n('D'), group: n('square') },
    { kind: 'line', id: n('da'), from: n('D'), to: n('A'), group: n('square') },
  );
  if (o.labels?.side) items.push({ kind: 'line', id: n('side'), from: n('A'), to: n('B'), tone: 'adj', label: o.labels.side, labelSide: 'right' });
  if (o.labels?.cells) items.push({ kind: 'line', id: n('cells'), from: n('A'), to: n('D'), tone: 'opp', label: o.labels.cells, labelSide: 'left' });
  return { points, items };
}
