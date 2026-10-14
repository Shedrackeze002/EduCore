/**
 * Number figures for video diagrams: factor trees, a Venn diagram of prime factors, number lines,
 * a rectangle covered in square tiles, and the nested sets of the real numbers. Like the solids
 * (`solids.ts`), each returns points and named parts to put into a diagram with `figure`.
 */
import type { DiagramItem, DiagramTone } from './script.ts';
import type { Part } from './solids.ts';

type P = [number, number];

const namer = (name: string | undefined) => (s: string) => (name ? `${name}-${s}` : s);

/** Points round a circle, starting at angle `from` and turning through `sweep` (radians). */
function arc(points: Record<string, P>, key: string, c: P, r: number, from: number, sweep: number, steps: number): string[] {
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = from + (sweep * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
    names.push(`${key}${i}`);
  }
  return names;
}

/** The four sides of a rectangle from (x0, y0) to (x1, y1), as lines, and its corners in `points`. */
function sides(points: Record<string, P>, key: string, x0: number, y0: number, x1: number, y1: number, extra: Partial<Extract<DiagramItem, { kind: 'line' }>>): DiagramItem[] {
  Object.assign(points, { [`${key}A`]: [x0, y0], [`${key}B`]: [x1, y0], [`${key}C`]: [x1, y1], [`${key}D`]: [x0, y1] });
  return (['AB', 'BC', 'CD', 'DA'] as const).map((s) => ({ kind: 'line', id: `${key}${s.toLowerCase()}`, from: `${key}${s[0]}`, to: `${key}${s[1]}`, ...extra }) as DiagramItem);
}

/** A number and, if it is not prime, the two factors it splits into. */
export type Tree = number | [number, Tree, Tree];

const value = (t: Tree) => (typeof t === 'number' ? t : t[0]);

/**
 * A factor tree: the top number splits into two factors, and each factor splits again until every
 * branch ends in a prime, which is circled in green. Every number sits `drop` below the one it
 * came from, and the last numbers on the branches are `gap` apart.
 *
 * Parts are named by their path from the top: the number `n` at the top, its two factors `n0` and
 * `n1`, the factors of `n1` are `n10` and `n11`, and so on. Each number's branch is `b<path>`
 * ("b10") and a prime's ring is `ring<path>`. Groups: `level<k>` (the branches and numbers k steps
 * down, so `level0` is the top number) and `primes` (the rings).
 */
export function factorTree(o: { name?: string; tree: Tree; at?: P; gap?: number; drop?: number }): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const gap = o.gap ?? 1.6;
  const drop = o.drop ?? 1.6;
  const points: Record<string, P> = {};
  const lines: DiagramItem[] = [];
  const numbers: DiagramItem[] = [];
  const rings: DiagramItem[] = [];
  let leaf = 0;
  // Lay the tree out from its leaves up: leaves in order along the bottom, each parent centred
  // over its two factors.
  const place = (t: Tree, path: string, depth: number): number => {
    const x = typeof t === 'number' ? x0 + gap * leaf++ : (place(t[1], `${path}0`, depth + 1) + place(t[2], `${path}1`, depth + 1)) / 2;
    const y = y0 - drop * depth;
    const id = `n${path}`;
    points[n(id)] = [x, y];
    const prime = typeof t === 'number';
    numbers.push({ kind: 'label', id: n(id), at: n(id), tex: String(value(t)), place: 'center', tone: prime ? 'good' : 'ink', group: n(`level${depth}`) });
    if (prime) {
      const ring = arc(points, n(`r${path}-`), [x, y], 0.3 * Math.min(gap, drop) + 0.04 * String(value(t)).length, Math.PI / 2, 2 * Math.PI, 32);
      rings.push({ kind: 'curve', id: n(`ring${path}`), points: ring, closed: true, tone: 'good', weight: 2.5, group: n('primes') });
    }
    return x;
  };
  place(o.tree, '', 0);
  // Each branch runs from just below its parent to just above the factor, clear of both numbers.
  for (const name of Object.keys(points)) {
    const path = name.slice(n('n').length);
    if (!name.startsWith(n('n')) || !path || !/^[01]+$/.test(path)) continue;
    const [px, py] = points[n(`n${path.slice(0, -1)}`)];
    const [cx, cy] = points[name];
    const t = 0.32 * drop;
    const k = t / Math.hypot(cx - px, cy - py);
    points[n(`bs${path}`)] = [px + (cx - px) * k, py + (cy - py) * k];
    points[n(`be${path}`)] = [cx - (cx - px) * k, cy - (cy - py) * k];
    lines.push({ kind: 'line', id: n(`b${path}`), from: n(`bs${path}`), to: n(`be${path}`), tone: 'muted', weight: 3, group: n(`level${path.length}`) });
  }
  return { points, items: [...lines, ...rings, ...numbers] };
}

/**
 * Two overlapping circles of prime factors, for the GCF and LCM of two numbers: on the left the
 * primes only the first number has, in the middle the primes both share, and on the right the
 * primes only the second has. The GCF multiplies the middle; the LCM multiplies everything.
 *
 * Parts: the circles `a` and `b` (groups: the outline and its title), each prime `left<i>`,
 * `both<i>` and `right<i>` in the groups `left`, `both` and `right`, and the shaded regions `lens`
 * (the overlap) and `union` (everything).
 */
export function venn(o: { name?: string; titles: [string, string]; left: string[]; both: string[]; right: string[] }): Part {
  const n = namer(o.name);
  const R = 3;
  const d = 1.9;
  const points: Record<string, P> = {};
  const A: P = [-d, 0];
  const B: P = [d, 0];
  const items: DiagramItem[] = [];
  // Where the circles cross: at angle ±θ on A, and π ∓ θ on B.
  const th = Math.acos(d / R);
  const lens = [...arc(points, n('la'), A, R, -th, 2 * th, 24), ...arc(points, n('lb'), B, R, Math.PI - th, 2 * th, 24)];
  const union = [...arc(points, n('ua'), A, R, th, 2 * Math.PI - 2 * th, 64), ...arc(points, n('ub'), B, R, th - Math.PI, 2 * Math.PI - 2 * th, 64)];
  items.push({ kind: 'region', id: n('union'), points: union, tone: 'brand', shade: 0.12 }, { kind: 'region', id: n('lens'), points: lens, tone: 'good', shade: 0.16 });
  for (const [key, c, tone, title, angle, place] of [
    ['a', A, 'adj', o.titles[0], (3 * Math.PI) / 4, 'above left'],
    ['b', B, 'opp', o.titles[1], Math.PI / 4, 'above right'],
  ] as const) {
    items.push({ kind: 'curve', id: n(`${key}-outline`), points: arc(points, n(`c${key}`), c, R, Math.PI / 2, 2 * Math.PI, 72), closed: true, tone, group: n(key) });
    points[n(`${key}-t`)] = [c[0] + R * Math.cos(angle), c[1] + R * Math.sin(angle)];
    items.push({ kind: 'label', id: n(`${key}-title`), at: n(`${key}-t`), tex: title, tone, place, group: n(key) });
  }
  // The primes of each region in one or two columns, centred in it.
  const stack = (key: 'left' | 'both' | 'right', list: string[], cx: number, tone: DiagramTone) => {
    const cols = list.length > 3 ? 2 : 1;
    const rows = Math.ceil(list.length / cols);
    list.forEach((tex, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      points[n(`${key}${i}`)] = [cx + (col - (cols - 1) / 2) * 0.95, ((rows - 1) / 2 - row) * 0.95];
      items.push({ kind: 'label', id: n(`${key}${i}`), at: n(`${key}${i}`), tex, tone, place: 'center', group: n(key) });
    });
  };
  stack('left', o.left, -d - 1.25, 'adj');
  stack('both', o.both, 0, 'good');
  stack('right', o.right, d + 1.25, 'opp');
  return { points, items };
}

/**
 * A number line from `min` to `max`, `length` units long, with a mark every `step` and a number
 * under every `every`-th mark (every mark by default; 0 for none).
 *
 * Parts: `axis` (a group: the line, its marks and numbers), each point by its `id` (a dot on the
 * line with its label above, or below with `below`), and each span by its `id` (a thick stretch of
 * the line from `from` to `to`, with its label above).
 */
export function numberLine(o: {
  name?: string;
  min: number;
  max: number;
  step: number;
  every?: number;
  length?: number;
  at?: P;
  points?: { id: string; value: number; tex: string; tone?: DiagramTone; below?: boolean }[];
  spans?: { id: string; from: number; to: number; tone?: DiagramTone; label?: string }[];
}): Part {
  const n = namer(o.name);
  const [x0, y0] = o.at ?? [0, 0];
  const L = o.length ?? 12;
  const X = (v: number) => x0 + ((v - o.min) / (o.max - o.min)) * L;
  const points: Record<string, P> = { [n('L')]: [x0 - 0.3, y0], [n('R')]: [x0 + L + 0.3, y0] };
  const items: DiagramItem[] = [{ kind: 'line', id: n('line'), from: n('L'), to: n('R'), weight: 3, group: n('axis') }];
  const count = Math.round((o.max - o.min) / o.step);
  const every = o.every ?? 1;
  // Round away floating-point noise, so 0.1 steps read 4.3 and not 4.300000000000001.
  const show = (v: number) => String(Number(v.toFixed(6)));
  for (let i = 0; i <= count; i++) {
    const v = o.min + i * o.step;
    const big = every > 0 && i % every === 0;
    Object.assign(points, { [n(`t${i}a`)]: [X(v), y0 - (big ? 0.22 : 0.14)], [n(`t${i}b`)]: [X(v), y0 + (big ? 0.22 : 0.14)] });
    items.push({ kind: 'line', id: n(`t${i}`), from: n(`t${i}a`), to: n(`t${i}b`), weight: 2.5, group: n('axis') });
    if (big) items.push({ kind: 'label', id: n(`num${i}`), at: n(`t${i}a`), tex: show(v), tone: 'muted', place: 'below', group: n('axis') });
  }
  for (const s of o.spans ?? []) {
    Object.assign(points, { [n(`${s.id}-a`)]: [X(s.from), y0], [n(`${s.id}-b`)]: [X(s.to), y0] });
    items.push({ kind: 'line', id: n(s.id), from: n(`${s.id}-a`), to: n(`${s.id}-b`), tone: s.tone ?? 'theta', weight: 9, label: s.label, labelSide: 'left' });
  }
  for (const p of o.points ?? []) {
    points[n(p.id)] = [X(p.value), y0];
    items.push({ kind: 'label', id: n(p.id), at: n(p.id), tex: p.tex, tone: p.tone ?? 'theta', place: p.below ? 'below' : 'above', dot: true });
  }
  return { points, items };
}

/**
 * A fraction strip: a bar `width` long cut into `parts` equal pieces, with the first `shaded`
 * pieces shaded (from `from`, to shade pieces further along). `label` is written to the right of
 * the bar, and `pieces` writes a value in each piece (such as "5 L").
 *
 * Parts: `frame` (a group: the outline and the cuts), `shade` (the shaded pieces), `label`, and
 * `pieces` (a group: the values in the pieces).
 */
export function strip(o: { name?: string; parts: number; shaded: number; from?: number; at?: P; width?: number; height?: number; tone?: DiagramTone; label?: string; pieces?: string }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const W = o.width ?? 12;
  const H = o.height ?? 1.2;
  const w = W / o.parts;
  const start = o.from ?? 0;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  if (o.shaded > 0) {
    Object.assign(points, { [n('s0')]: [x + start * w, y], [n('s1')]: [x + (start + o.shaded) * w, y], [n('s2')]: [x + (start + o.shaded) * w, y + H], [n('s3')]: [x + start * w, y + H] });
    items.push({ kind: 'region', id: n('shade'), points: ['s0', 's1', 's2', 's3'].map(n), tone: o.tone ?? 'adj', shade: 0.55 });
  }
  items.push(...sides(points, n('o'), x, y, x + W, y + H, { group: n('frame') }));
  for (let i = 1; i < o.parts; i++) {
    Object.assign(points, { [n(`c${i}a`)]: [x + i * w, y], [n(`c${i}b`)]: [x + i * w, y + H] });
    items.push({ kind: 'line', id: n(`cut${i}`), from: n(`c${i}a`), to: n(`c${i}b`), group: n('frame') });
  }
  if (o.label) {
    points[n('lab')] = [x + W, y + H / 2];
    items.push({ kind: 'label', id: n('label'), at: n('lab'), tex: o.label, place: 'right' });
  }
  if (o.pieces) {
    for (let i = 0; i < o.parts; i++) {
      points[n(`p${i}`)] = [x + (i + 0.5) * w, y + H / 2];
      items.push({ kind: 'label', id: n(`piece${i}`), at: n(`p${i}`), tex: o.pieces, tone: 'ink', place: 'center', group: n('pieces') });
    }
  }
  return { points, items };
}

/**
 * A rectangle `cols` squares wide and `rows` squares tall (a floor covered in square tiles, or a
 * square of 144 unit squares), each `size` units. `at` is its bottom left corner.
 *
 * Parts: `outline` (a group: its four sides), `grid` (the lines between the squares), `tile` (the
 * bottom left square, shaded), the side labels `width` (along the bottom) and `height` (up the
 * left), `side` (the tile's side, written in the tile) and `area` (in the middle).
 */
export function tiles(o: { name?: string; cols: number; rows: number; at?: P; size?: number; labels?: { width?: string; height?: string; side?: string; area?: string } }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const s = o.size ?? 1;
  const W = o.cols * s;
  const H = o.rows * s;
  const points: Record<string, P> = { [n('mid')]: [x + W / 2, y + H / 2] };
  const outline = sides(points, n('o'), x, y, x + W, y + H, { group: n('outline') });
  const items: DiagramItem[] = [{ kind: 'region', id: n('fill'), points: ['A', 'B', 'C', 'D'].map((c) => n(`o${c}`)), tone: 'brand', group: n('outline') }];
  Object.assign(points, { [n('t1')]: [x, y], [n('t2')]: [x + s, y], [n('t3')]: [x + s, y + s], [n('t4')]: [x, y + s] });
  items.push({ kind: 'region', id: n('tile'), points: ['t1', 't2', 't3', 't4'].map(n), tone: 'good', shade: 0.4 });
  for (let i = 1; i < o.cols; i++) {
    Object.assign(points, { [n(`x${i}a`)]: [x + i * s, y], [n(`x${i}b`)]: [x + i * s, y + H] });
    items.push({ kind: 'line', id: n(`gx${i}`), from: n(`x${i}a`), to: n(`x${i}b`), tone: 'muted', weight: 1.5, group: n('grid') });
  }
  for (let j = 1; j < o.rows; j++) {
    Object.assign(points, { [n(`y${j}a`)]: [x, y + j * s], [n(`y${j}b`)]: [x + W, y + j * s] });
    items.push({ kind: 'line', id: n(`gy${j}`), from: n(`y${j}a`), to: n(`y${j}b`), tone: 'muted', weight: 1.5, group: n('grid') });
  }
  items.push(...outline);
  if (o.labels?.width) items.push({ kind: 'line', id: n('width'), from: n('oA'), to: n('oB'), tone: 'adj', label: o.labels.width, labelSide: 'right' });
  if (o.labels?.height) items.push({ kind: 'line', id: n('height'), from: n('oA'), to: n('oD'), tone: 'opp', label: o.labels.height, labelSide: 'left' });
  if (o.labels?.side) {
    points[n('tc')] = [x + s / 2, y + s / 2];
    items.push({ kind: 'label', id: n('side'), at: n('tc'), tex: o.labels.side, place: 'center' });
  }
  if (o.labels?.area) items.push({ kind: 'label', id: n('area'), at: n('mid'), tex: o.labels.area, place: 'center' });
  return { points, items };
}

/** The sets of real numbers, from the innermost. */
export const SETS = ['N', 'W', 'I', 'Q', 'R'] as const;
type SetName = (typeof SETS)[number] | 'Qbar';

const SET_INFO: Record<SetName, { tex: string; tone: DiagramTone; examples: string[]; width: number }> = {
  N: { tex: '\\mathbb{N}\\ \\text{natural}', tone: 'adj', examples: ['1,\\ 2,\\ 3, \\ldots'], width: 3.8 },
  W: { tex: '\\mathbb{W}\\ \\text{whole}', tone: 'good', examples: ['0'], width: 1.6 },
  I: { tex: '\\mathbb{I}\\ \\text{integers}', tone: 'opp', examples: ['-1', '-5'], width: 1.7 },
  Q: { tex: '\\mathbb{Q}\\ \\text{rational}', tone: 'brand', examples: ['\\tfrac34', '0.\\overline{6}', '-2.5'], width: 2.2 },
  R: { tex: '\\mathbb{R}\\ \\text{real numbers}', tone: 'ink', examples: [], width: 0 },
  Qbar: { tex: '\\overline{\\mathbb{Q}}\\ \\text{irrational}', tone: 'hyp', examples: ['\\sqrt{2}', '\\pi', '\\sqrt[3]{4}'], width: 4.4 },
};

/**
 * The real number system as nested boxes: natural numbers inside the whole numbers, inside the
 * integers, inside the rational numbers; the irrational numbers beside them; and the real numbers
 * around both. Each box has its name at the top and its examples (which `examples` can replace)
 * in the space the box inside it leaves, which `widths` can widen for a long example.
 *
 * Parts: each set `N`, `W`, `I`, `Q`, `Qbar` and `R` (a group: its box, shading and name), and its
 * examples `N-ex` and so on (a group; one example is `N-ex0`).
 */
export function realNumbers(o: { name?: string; examples?: Partial<Record<SetName, string[]>>; widths?: Partial<Record<SetName, number>> } = {}): Part {
  const n = namer(o.name);
  const m = 0.35;
  const title = 0.9;
  const row = 0.8;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const box = (set: SetName, x0: number, y0: number, x1: number, y1: number, exampleX: [number, number]) => {
    const info = SET_INFO[set];
    const lines = sides(points, n(`${set}-`), x0, y0, x1, y1, { tone: info.tone, weight: 2.5, group: n(set) });
    items.push({ kind: 'region', id: n(`${set}-fill`), points: ['A', 'B', 'C', 'D'].map((c) => n(`${set}-${c}`)), tone: info.tone, shade: 0.07, group: n(set) }, ...lines);
    points[n(`${set}-t`)] = [x0 + 0.22, y1 - 0.12];
    items.push({ kind: 'label', id: n(`${set}-title`), at: n(`${set}-t`), tex: info.tex, tone: info.tone, place: 'below right', group: n(set) });
    (o.examples?.[set] ?? info.examples).forEach((tex, i) => {
      points[n(`${set}-ex${i}`)] = [(exampleX[0] + exampleX[1]) / 2, y1 - title - row / 2 - i * row];
      items.push({ kind: 'label', id: n(`${set}-ex${i}`), at: n(`${set}-ex${i}`), tex, tone: info.tone, place: 'center', group: n(`${set}-ex`) });
    });
  };
  // From the inside out: each box reaches `m` further left and down than the one inside it, a title
  // row higher, and its own width further right. Its examples go in the strip right of the box inside.
  const boxes: [SetName, number, number, number, number, [number, number]][] = [];
  let right = 0;
  let top = 0;
  for (const [k, set] of SETS.slice(0, 4).entries()) {
    const left = right;
    const width = o.widths?.[set] ?? SET_INFO[set].width;
    right = k === 0 ? width : right + m + width;
    top = k === 0 ? title + row * Math.max(1, (o.examples?.N ?? SET_INFO.N.examples).length) + 0.2 : top + m + title;
    boxes.push([set, -k * m, -k * m, right, top, k === 0 ? [0, right] : [left + m, right]]);
  }
  const qbar = right + m + (o.widths?.Qbar ?? SET_INFO.Qbar.width);
  boxes.push(['Qbar', right + m, -3 * m, qbar, top, [right + m, qbar]], ['R', -4 * m, -4 * m, qbar + m, top + m + title, [0, 0]]);
  // Drawn from the outside in, so each box's outline sits on top of the shading around it.
  for (const b of boxes.reverse()) box(...b);
  return { points, items };
}

/**
 * A row of results that follow a pattern (2³ = 8, 2² = 4, 2¹ = 2, …): each column has its
 * expression on top and its value below, and an arrow under the values, labelled `step`, leads
 * from each value to the next.
 *
 * Parts: each column `c<i>` (a group: its `top<i>`, `value<i>` and the arrow `step<i>` into it).
 */
export function pattern(o: { name?: string; top: string[]; values: string[]; step: string; gap?: number }): Part {
  const n = namer(o.name);
  const gap = o.gap ?? 1.6;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  o.top.forEach((tex, i) => {
    const x = i * gap;
    Object.assign(points, { [n(`t${i}`)]: [x, 1.3], [n(`v${i}`)]: [x, 0] });
    items.push(
      { kind: 'label', id: n(`top${i}`), at: n(`t${i}`), tex, tone: 'brand', place: 'center', group: n(`c${i}`) },
      { kind: 'label', id: n(`value${i}`), at: n(`v${i}`), tex: o.values[i], place: 'center', group: n(`c${i}`) },
    );
    if (i === 0) return;
    // A shallow arc under the two values, from the last one to this one.
    const arc: string[] = [];
    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      points[n(`a${i}-${k}`)] = [x - gap + gap * (0.2 + 0.6 * t), -0.45 - 0.35 * Math.sin(Math.PI * t)];
      arc.push(n(`a${i}-${k}`));
    }
    items.push({ kind: 'curve', id: n(`step${i}`), points: arc, tone: 'theta', weight: 2.5, label: o.step, labelSide: 'right', group: n(`c${i}`) });
  });
  return { points, items };
}
