/**
 * 3-D solids for video diagrams: prisms, cylinders, pyramids, cones, spheres and hemispheres,
 * drawn as an oblique view with hidden edges dashed. Each function returns the points and parts of
 * one solid; `figure` puts one or more into a diagram (a silo is a cylinder with a hemisphere on
 * top).
 *
 * Every solid names its parts the same way, so a script can show them as the narrator mentions
 * them: `shape` (a group: every edge), the dimensions `h`, `r`, `s`, `l`, `w` or `b` (lines that
 * carry the labels given), and faces such as `top-face`, `base-face` and `lateral` (shaded
 * regions). With a `name`, each id starts with it ("silo-h"). Heights are orange, base lengths and
 * radii blue and slant heights pink, in every video.
 */
import type { DiagramEl, DiagramItem, DiagramTone } from './script.ts';

type P = [number, number];

/** The points and parts of one solid. */
export interface Part {
  points: Record<string, P>;
  items: DiagramItem[];
}

const TONE = { h: 'opp', base: 'adj', slant: 'hyp' } as const satisfies Record<string, DiagramTone>;

/** The direction of depth in an oblique drawing: back and to the right, at half scale. */
const DEPTH: P = [0.5 * Math.cos(Math.PI / 6), 0.5 * Math.sin(Math.PI / 6)];
/** A circle seen from a little above looks like an ellipse this much flatter than it is wide. */
const TILT = 0.3;
/** Points along each half of an ellipse. */
const STEPS = 24;

const add = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const mul = (a: P, k: number): P => [a[0] * k, a[1] * k];

/** Puts solids into one diagram. `height` sets its space on the stage in pixels. */
export function figure(id: string, parts: Part[], height?: number): DiagramEl {
  return {
    kind: 'diagram',
    id,
    points: Object.assign({}, ...parts.map((p) => p.points)),
    items: parts.flatMap((p) => p.items),
    ...(height ? { height } : {}),
  };
}

/** Prefixes ids and point names with the solid's name, if it has one. */
function namer(name: string | undefined) {
  return (s: string) => (name ? `${name}-${s}` : s);
}

/**
 * An ellipse around `c` (a circle of radius r seen from a little above), as point names in
 * `points`. The front half runs from the left end through the front to the right end; the back
 * half from the right end through the back to the left end.
 */
function ellipse(points: Record<string, P>, key: string, c: P, r: number) {
  const names: string[] = [];
  for (let i = 0; i < 2 * STEPS; i++) {
    const a = Math.PI + (i * Math.PI) / STEPS;
    const name = `${key}${i}`;
    points[name] = [c[0] + r * Math.cos(a), c[1] + r * TILT * Math.sin(a)];
    names.push(name);
  }
  return { all: names, front: names.slice(0, STEPS + 1), back: [...names.slice(STEPS), names[0]] };
}

/** Labels for a solid's dimensions, in TeX ("8\\text{ cm}"); a dimension without one is not drawn. */
type Labels<K extends string> = Partial<Record<K, string>>;

/**
 * A rectangular prism: length `l` across the front, width `w` going back, height `h`. `at` is the
 * front bottom left corner. With `cells`, the faces we can see are split into that many rows and
 * columns (the group `cells`), as for a cubic yard of 27 cubic feet. `tone` colours the edges (muted,
 * for a prism drawn around a pyramid), and `hole` bores a round hole from front to back.
 */
export function box(o: { name?: string; at?: P; l: number; w: number; h: number; cells?: number; tone?: DiagramTone; hole?: { r: number; label?: string }; labels?: Labels<'l' | 'w' | 'h'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const d = mul(DEPTH, o.w);
  const A: P = [x, y];
  const B: P = [x + o.l, y];
  const C: P = [x + o.l, y + o.h];
  const D: P = [x, y + o.h];
  const points: Record<string, P> = { [n('A')]: A, [n('B')]: B, [n('C')]: C, [n('D')]: D, [n('E')]: add(A, d), [n('F')]: add(B, d), [n('G')]: add(C, d), [n('H')]: add(D, d) };
  const shape = n('shape');
  const edge = (id: string, a: string, b: string, dashed = false): DiagramItem => ({ kind: 'line', id: n(id), from: n(a), to: n(b), group: shape, ...(dashed ? { dashed } : {}), ...(o.tone ? { tone: o.tone } : {}) });
  const items: DiagramItem[] = [
    { kind: 'region', id: n('front-face'), points: ['A', 'B', 'C', 'D'].map(n), tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('top-face'), points: ['D', 'C', 'G', 'H'].map(n), tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('side-face'), points: ['B', 'F', 'G', 'C'].map(n), tone: 'brand', shade: 0.16 },
    edge('ae', 'A', 'E', true),
    edge('ef', 'E', 'F', true),
    edge('eh', 'E', 'H', true),
    edge('ab', 'A', 'B'),
    edge('bc', 'B', 'C'),
    edge('cd', 'C', 'D'),
    edge('da', 'D', 'A'),
    edge('bf', 'B', 'F'),
    edge('fg', 'F', 'G'),
    edge('cg', 'C', 'G'),
    edge('dh', 'D', 'H'),
    edge('hg', 'H', 'G'),
  ];
  if (o.hole) {
    // A round hole straight through, from the middle of the front face to the back (the group `hole`).
    const c: P = [x + o.l / 2, y + o.h / 2];
    const front: string[] = [];
    const back: string[] = [];
    for (let i = 0; i < 48; i++) {
      const a = (i * Math.PI) / 24;
      const q: P = [c[0] + o.hole.r * Math.cos(a), c[1] + o.hole.r * Math.sin(a)];
      points[n(`hf${i}`)] = q;
      points[n(`hb${i}`)] = add(q, d);
      front.push(n(`hf${i}`));
      back.push(n(`hb${i}`));
    }
    points[n('hO')] = c;
    points[n('hR')] = [c[0] + o.hole.r, c[1]];
    items.push(
      { kind: 'region', id: n('hole-face'), points: front, tone: 'bad', shade: 0.18, group: n('hole') },
      { kind: 'curve', id: n('hole-back'), points: back, closed: true, dashed: true, tone: 'muted', group: n('hole') },
      { kind: 'curve', id: n('hole-front'), points: front, closed: true, tone: 'bad', group: n('hole') },
    );
    if (o.hole.label) items.push({ kind: 'line', id: n('hole-r'), from: n('hO'), to: n('hR'), tone: TONE.base, label: o.hole.label, labelSide: 'left' });
  }
  if (o.cells) {
    // Split the three faces we can see into cells (a cube of 27 smaller cubes), as the group `cells`.
    const k = o.cells;
    const seg = (id: string, a: P, b: P) => {
      points[n(`${id}a`)] = a;
      points[n(`${id}b`)] = b;
      items.push({ kind: 'line', id: n(id), from: n(`${id}a`), to: n(`${id}b`), tone: 'muted', weight: 1.5, group: n('cells') });
    };
    for (let i = 1; i < k; i++) {
      const t = i / k;
      seg(`fv${i}`, [x + o.l * t, y], [x + o.l * t, y + o.h]);
      seg(`fh${i}`, [x, y + o.h * t], [x + o.l, y + o.h * t]);
      seg(`tx${i}`, [x + o.l * t, y + o.h], add([x + o.l * t, y + o.h], d));
      seg(`td${i}`, add(D, mul(d, t)), add(C, mul(d, t)));
      seg(`sd${i}`, add(B, mul(d, t)), add(C, mul(d, t)));
      seg(`sh${i}`, [x + o.l, y + o.h * t], add([x + o.l, y + o.h * t], d));
    }
  }
  if (o.labels?.l) items.push({ kind: 'line', id: n('l'), from: n('A'), to: n('B'), tone: TONE.base, label: o.labels.l, labelSide: 'right' });
  if (o.labels?.w) items.push({ kind: 'line', id: n('w'), from: n('B'), to: n('F'), tone: TONE.base, label: o.labels.w, labelSide: 'right' });
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('A'), to: n('D'), tone: TONE.h, label: o.labels.h, labelSide: 'left' });
  return { points, items };
}

/**
 * A triangular prism lying on a rectangular face: a triangle with base `b` and height `t` (its top
 * `apex` across from the left end of the base, half way by default) at the front, running back
 * `l`. `at` is the front left corner of the base.
 */
export function triangularPrism(o: { name?: string; at?: P; b: number; t: number; l: number; apex?: number; labels?: Labels<'b' | 't' | 'l'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const d = mul(DEPTH, o.l);
  const A: P = [x, y];
  const B: P = [x + o.b, y];
  const C: P = [x + (o.apex ?? o.b / 2), y + o.t];
  const points: Record<string, P> = { [n('A')]: A, [n('B')]: B, [n('C')]: C, [n('D')]: add(A, d), [n('E')]: add(B, d), [n('F')]: add(C, d), [n('M')]: [C[0], y] };
  const shape = n('shape');
  const edge = (id: string, a: string, b: string, dashed = false): DiagramItem => ({ kind: 'line', id: n(id), from: n(a), to: n(b), group: shape, ...(dashed ? { dashed } : {}) });
  const items: DiagramItem[] = [
    { kind: 'region', id: n('front-face'), points: ['A', 'B', 'C'].map(n), tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('side-face'), points: ['B', 'E', 'F', 'C'].map(n), tone: 'brand', shade: 0.16 },
    edge('ad', 'A', 'D', true),
    edge('de', 'D', 'E', true),
    edge('df', 'D', 'F', true),
    edge('ab', 'A', 'B'),
    edge('bc', 'B', 'C'),
    edge('ca', 'C', 'A'),
    edge('be', 'B', 'E'),
    edge('cf', 'C', 'F'),
    edge('ef', 'E', 'F'),
  ];
  if (o.labels?.b) items.push({ kind: 'line', id: n('b'), from: n('A'), to: n('B'), tone: TONE.base, label: o.labels.b, labelSide: 'right' });
  if (o.labels?.t) items.push({ kind: 'line', id: n('t'), from: n('M'), to: n('C'), tone: TONE.h, dashed: true, label: o.labels.t, labelAt: 0.35 }, { kind: 'right', id: n('t-mark'), at: n('M'), from: n('B'), to: n('C') });
  if (o.labels?.l) items.push({ kind: 'line', id: n('l'), from: n('B'), to: n('E'), tone: TONE.base, label: o.labels.l, labelSide: 'right' });
  return { points, items };
}

/**
 * An upright cylinder with radius `r` and height `h`; `at` is the centre of its base. `top` says
 * how much of the top rim shows: all of it, or only the front when something sits on it.
 */
export function cylinder(o: { name?: string; at?: P; r: number; h: number; top?: 'full' | 'front'; tone?: DiagramTone; labels?: Labels<'r' | 'h'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('O')]: [x, y], [n('T')]: [x, y + o.h], [n('R')]: [x + o.r, y], [n('TR')]: [x + o.r, y + o.h], [n('L')]: [x - o.r, y], [n('TL')]: [x - o.r, y + o.h] };
  const bot = ellipse(points, n('b'), [x, y], o.r);
  const top = ellipse(points, n('t'), [x, y + o.h], o.r);
  const shape = n('shape');
  const t = o.tone ? { tone: o.tone } : {};
  const items: DiagramItem[] = [
    { kind: 'region', id: n('lateral'), points: [...top.front, ...[...bot.front].reverse()], tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('top-face'), points: top.all, tone: 'brand', shade: 0.16 },
    { kind: 'curve', id: n('base-back'), points: bot.back, dashed: true, group: shape, ...t },
    { kind: 'curve', id: n('base-front'), points: bot.front, group: shape, ...t },
    { kind: 'line', id: n('left'), from: n('L'), to: n('TL'), group: shape, ...t },
    { kind: 'line', id: n('right'), from: n('R'), to: n('TR'), group: shape, ...t },
    o.top === 'front' ? { kind: 'curve', id: n('top-rim'), points: top.front, group: shape, ...t } : { kind: 'curve', id: n('top-rim'), points: top.all, closed: true, group: shape, ...t },
  ];
  if (o.labels?.r) {
    // The label goes above the rim, clear of it.
    points[n('rl')] = [x + o.r / 2, y + o.h + o.r * TILT];
    items.push({ kind: 'line', id: n('r'), from: n('T'), to: n('TR'), tone: TONE.base }, { kind: 'label', id: n('r-label'), at: n('rl'), tex: o.labels.r, tone: TONE.base, place: 'above', group: n('r') });
  }
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('R'), to: n('TR'), tone: TONE.h, label: o.labels.h, labelSide: 'right' });
  return { points, items };
}

/**
 * A right cone with radius `r` and height `h`, point up (or down, with `down`); `at` is the centre
 * of its base. The slant height `s` runs down its right side.
 */
export function cone(o: { name?: string; at?: P; r: number; h: number; down?: boolean; rim?: 'full' | 'front'; labels?: Labels<'r' | 'h' | 's'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const apex: P = [x, y + (o.down ? -o.h : o.h)];
  const points: Record<string, P> = { [n('O')]: [x, y], [n('V')]: apex, [n('R')]: [x + o.r, y], [n('L')]: [x - o.r, y] };
  const base = ellipse(points, n('b'), [x, y], o.r);
  const shape = n('shape');
  // Point up, the back of the base is hidden; point down, the whole base faces us, unless
  // something sits on it (`rim: 'front'`).
  const rim: DiagramItem[] = !o.down
    ? [{ kind: 'curve', id: n('base-back'), points: base.back, dashed: true, group: shape }, { kind: 'curve', id: n('base-front'), points: base.front, group: shape }]
    : o.rim === 'front'
      ? [{ kind: 'curve', id: n('base-front'), points: base.front, group: shape }]
      : [{ kind: 'curve', id: n('base-rim'), points: base.all, closed: true, group: shape }];
  const items: DiagramItem[] = [
    { kind: 'region', id: n('lateral'), points: [n('V'), ...(o.down ? base.back : base.front)], tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('base-face'), points: base.all, tone: 'brand', shade: 0.16 },
    ...rim,
    { kind: 'line', id: n('left'), from: n('L'), to: n('V'), group: shape },
    { kind: 'line', id: n('right'), from: n('R'), to: n('V'), group: shape },
  ];
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('O'), to: n('V'), tone: TONE.h, dashed: true, label: o.labels.h, labelSide: o.down ? 'right' : 'left' }, { kind: 'right', id: n('h-mark'), at: n('O'), from: n('V'), to: n('R') });
  if (o.labels?.r) {
    // Beyond the rim: below it when the cone points up, above it when it points down.
    points[n('rl')] = [x + o.r / 2, y + (o.down ? 1 : -1) * o.r * TILT];
    items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('R'), tone: TONE.base }, { kind: 'label', id: n('r-label'), at: n('rl'), tex: o.labels.r, tone: TONE.base, place: o.down ? 'above' : 'below', group: n('r') });
  }
  if (o.labels?.s) items.push({ kind: 'line', id: n('s'), from: n('R'), to: n('V'), tone: TONE.slant, label: o.labels.s, labelSide: o.down ? 'left' : 'right' });
  return { points, items };
}

/**
 * A right pyramid on a square base of side `b`, with height `h`; `at` is the front left corner of
 * the base. The slant height `s` runs from the apex to the middle of the front edge, and `half`
 * marks half the base, from the centre to that point (the right triangle inside the pyramid).
 */
export function squarePyramid(o: { name?: string; at?: P; b: number; h: number; labels?: Labels<'b' | 'h' | 's' | 'half'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const d = mul(DEPTH, o.b);
  const A: P = [x, y];
  const B: P = [x + o.b, y];
  const C = add(B, d);
  const D = add(A, d);
  const O: P = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
  const points: Record<string, P> = { [n('A')]: A, [n('B')]: B, [n('C')]: C, [n('D')]: D, [n('O')]: O, [n('V')]: [O[0], O[1] + o.h], [n('M')]: [(A[0] + B[0]) / 2, y] };
  const shape = n('shape');
  const edge = (id: string, a: string, b: string, dashed = false): DiagramItem => ({ kind: 'line', id: n(id), from: n(a), to: n(b), group: shape, ...(dashed ? { dashed } : {}) });
  const items: DiagramItem[] = [
    { kind: 'region', id: n('base-face'), points: ['A', 'B', 'C', 'D'].map(n), tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('front-face'), points: ['A', 'B', 'V'].map(n), tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('side-face'), points: ['B', 'C', 'V'].map(n), tone: 'brand', shade: 0.16 },
    edge('ad', 'A', 'D', true),
    edge('dc', 'D', 'C', true),
    edge('dv', 'D', 'V', true),
    edge('ab', 'A', 'B'),
    edge('bc', 'B', 'C'),
    edge('av', 'A', 'V'),
    edge('bv', 'B', 'V'),
    edge('cv', 'C', 'V'),
  ];
  if (o.labels?.b) items.push({ kind: 'line', id: n('b'), from: n('A'), to: n('B'), tone: TONE.base, label: o.labels.b, labelSide: 'right', labelAt: 0.25 });
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('O'), to: n('V'), tone: TONE.h, dashed: true, label: o.labels.h, labelSide: 'right', labelAt: 0.6 });
  if (o.labels?.half) items.push({ kind: 'line', id: n('half'), from: n('O'), to: n('M'), tone: TONE.base, dashed: true, label: o.labels.half, labelSide: 'right' }, { kind: 'right', id: n('half-mark'), at: n('O'), from: n('M'), to: n('V') });
  if (o.labels?.s) items.push({ kind: 'line', id: n('s'), from: n('M'), to: n('V'), tone: TONE.slant, label: o.labels.s, labelSide: 'left', labelAt: 0.4 });
  return { points, items };
}

/** A sphere of radius `r` about `at`, with its equator; the radius runs to the right. */
export function sphere(o: { name?: string; at?: P; r: number; labels?: Labels<'r'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  // The radius runs up and to the right, clear of the equator.
  const points: Record<string, P> = { [n('O')]: [x, y], [n('R')]: [x + o.r * Math.cos(Math.PI / 5), y + o.r * Math.sin(Math.PI / 5)] };
  const outline: string[] = [];
  for (let i = 0; i < 4 * STEPS; i++) {
    const a = (i * Math.PI) / (2 * STEPS);
    points[n(`c${i}`)] = [x + o.r * Math.cos(a), y + o.r * Math.sin(a)];
    outline.push(n(`c${i}`));
  }
  const eq = ellipse(points, n('e'), [x, y], o.r);
  const shape = n('shape');
  const items: DiagramItem[] = [
    { kind: 'region', id: n('surface'), points: outline, tone: 'brand', shade: 0.16 },
    { kind: 'curve', id: n('outline'), points: outline, closed: true, group: shape },
    { kind: 'curve', id: n('equator-back'), points: eq.back, dashed: true, group: shape },
    { kind: 'curve', id: n('equator-front'), points: eq.front, group: shape },
  ];
  if (o.labels?.r) items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('R'), tone: TONE.base, label: o.labels.r, labelSide: 'left' }, { kind: 'label', id: n('centre'), at: n('O'), tex: '', dot: true, group: n('r') });
  return { points, items };
}

/** A hemisphere of radius `r`, dome up, on its flat face; `at` is the centre of the flat face. */
export function hemisphere(o: { name?: string; at?: P; r: number; labels?: Labels<'r'> }): Part {
  const n = namer(o.name);
  const [x, y] = o.at ?? [0, 0];
  const points: Record<string, P> = { [n('O')]: [x, y], [n('R')]: [x + o.r, y], [n('V')]: [x, y + o.r] };
  const dome: string[] = [];
  for (let i = 0; i <= 2 * STEPS; i++) {
    const a = (i * Math.PI) / (2 * STEPS);
    points[n(`d${i}`)] = [x + o.r * Math.cos(a), y + o.r * Math.sin(a)];
    dome.push(n(`d${i}`));
  }
  const base = ellipse(points, n('b'), [x, y], o.r);
  const shape = n('shape');
  const items: DiagramItem[] = [
    { kind: 'region', id: n('surface'), points: [...dome, ...base.front.slice(1, -1)], tone: 'brand', shade: 0.16 },
    { kind: 'region', id: n('base-face'), points: base.all, tone: 'brand', shade: 0.16 },
    { kind: 'curve', id: n('dome'), points: dome, group: shape },
    { kind: 'curve', id: n('base-back'), points: base.back, dashed: true, group: shape },
    { kind: 'curve', id: n('base-front'), points: base.front, group: shape },
  ];
  if (o.labels?.r) {
    points[n('rl')] = [x + o.r / 2, y - o.r * TILT];
    items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('R'), tone: TONE.base }, { kind: 'label', id: n('r-label'), at: n('rl'), tex: o.labels.r, tone: TONE.base, place: 'below', group: n('r') });
  }
  return { points, items };
}

// ---------------------------------------------------------------- Nets

/** A face of a net: a shaded rectangle or polygon with its outline, both in `group`. */
function face(n: (s: string) => string, points: Record<string, P>, id: string, corners: P[], tone: DiagramTone, group: string): DiagramItem[] {
  const names = corners.map((c, i) => {
    const key = n(`${id}${i}`);
    points[key] = c;
    return key;
  });
  return [
    { kind: 'region', id: n(id), points: names, tone, shade: 0.2, group: n(group) },
    { kind: 'curve', id: n(`${id}-edge`), points: names, closed: true, weight: 2.5, group: n(group) },
  ];
}

/** Labels at the middle of faces (an area, "12 × 8"), each shown with its face's group. */
function areaLabels(n: (s: string) => string, points: Record<string, P>, areas: Record<string, { at: P; tex: string; group: string }>): DiagramItem[] {
  return Object.entries(areas).map(([id, a]) => {
    points[n(`${id}-mid`)] = a.at;
    return { kind: 'label', id: n(`${id}-area`), at: n(`${id}-mid`), tex: a.tex, place: 'center', group: n(a.group) } satisfies DiagramItem;
  });
}

const rect = (x: number, y: number, w: number, h: number): P[] => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

/**
 * The net of a rectangular prism (`box`): the front, an end on each side and the back in a row,
 * with the top above the front and the bottom below it. Groups: `fb` (front and back), `tb` (top
 * and bottom) and `ends`; the dimensions `l`, `w` and `h`; `areas` puts a label on each face.
 */
export function boxNet(o: { name?: string; l: number; w: number; h: number; labels?: Labels<'l' | 'w' | 'h'>; areas?: Partial<Record<'front' | 'back' | 'top' | 'bottom' | 'left' | 'right', string>> }): Part {
  const n = namer(o.name);
  const { l, w, h } = o;
  const points: Record<string, P> = {};
  const faces: Record<string, { at: P; corners: P[]; tone: DiagramTone; group: string }> = {
    left: { at: [w / 2, h / 2], corners: rect(0, 0, w, h), tone: 'theta', group: 'ends' },
    front: { at: [w + l / 2, h / 2], corners: rect(w, 0, l, h), tone: 'brand', group: 'fb' },
    right: { at: [1.5 * w + l, h / 2], corners: rect(w + l, 0, w, h), tone: 'theta', group: 'ends' },
    back: { at: [2 * w + 1.5 * l, h / 2], corners: rect(2 * w + l, 0, l, h), tone: 'brand', group: 'fb' },
    top: { at: [w + l / 2, h + w / 2], corners: rect(w, h, l, w), tone: 'good', group: 'tb' },
    bottom: { at: [w + l / 2, -w / 2], corners: rect(w, -w, l, w), tone: 'good', group: 'tb' },
  };
  const items: DiagramItem[] = Object.entries(faces).flatMap(([id, f]) => face(n, points, id, f.corners, f.tone, f.group));
  const areas: Record<string, { at: P; tex: string; group: string }> = {};
  for (const [id, tex] of Object.entries(o.areas ?? {})) if (tex) areas[id] = { at: faces[id].at, tex, group: faces[id].group };
  items.push(...areaLabels(n, points, areas));
  Object.assign(points, { [n('l0')]: [w, -w], [n('l1')]: [w + l, -w], [n('h0')]: [0, 0], [n('h1')]: [0, h], [n('w0')]: [0, h], [n('w1')]: [w, h] });
  if (o.labels?.l) items.push({ kind: 'line', id: n('l'), from: n('l0'), to: n('l1'), tone: TONE.base, label: o.labels.l, labelSide: 'right' });
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('h0'), to: n('h1'), tone: TONE.h, label: o.labels.h, labelSide: 'left' });
  if (o.labels?.w) items.push({ kind: 'line', id: n('w'), from: n('w0'), to: n('w1'), tone: TONE.base, label: o.labels.w, labelSide: 'left' });
  return { points, items };
}

/**
 * The net of a triangular prism with triangle sides `a`, `b`, `c` and length `l`: three
 * rectangles in a row (the group `strip`, as wide as the triangle's perimeter), and the two
 * triangles on the middle one (the group `bases`). `perimeter` labels the strip's width.
 */
export function triangularPrismNet(o: { name?: string; a: number; b: number; c: number; l: number; labels?: Labels<'a' | 'b' | 'c' | 'l' | 'perimeter'>; areas?: { strip?: string; base?: string } }): Part {
  const n = namer(o.name);
  const { a, b, c, l } = o;
  const points: Record<string, P> = {};
  // The triangle's third corner, from side a at the left end of b and side c at the right end.
  const tx = (b * b + a * a - c * c) / (2 * b);
  const ty = Math.sqrt(Math.max(0, a * a - tx * tx));
  const items: DiagramItem[] = [
    ...face(n, points, 'ra', rect(0, 0, a, l), 'brand', 'strip'),
    ...face(n, points, 'rb', rect(a, 0, b, l), 'brand', 'strip'),
    ...face(n, points, 'rc', rect(a + b, 0, c, l), 'brand', 'strip'),
    ...face(n, points, 'tb', [[a, 0], [a + tx, -ty], [a + b, 0]], 'theta', 'bases'),
    ...face(n, points, 'tt', [[a, l], [a + b, l], [a + tx, l + ty]], 'theta', 'bases'),
  ];
  const areas: Record<string, { at: P; tex: string; group: string }> = {};
  if (o.areas?.strip) areas.strip = { at: [a + b / 2, l / 2], tex: o.areas.strip, group: 'strip' };
  if (o.areas?.base) areas.base = { at: [a + (tx + b) / 3, l + ty / 3], tex: o.areas.base, group: 'bases' };
  items.push(...areaLabels(n, points, areas));
  const top = l + ty + 0.9;
  Object.assign(points, { [n('a0')]: [0, 0], [n('a1')]: [a, 0], [n('c0')]: [a + b, 0], [n('c1')]: [a + b + c, 0], [n('bl')]: [a + b / 2, -0.15], [n('l0')]: [0, 0], [n('l1')]: [0, l], [n('p0')]: [0, top], [n('p1')]: [a + b + c, top] });
  if (o.labels?.a) items.push({ kind: 'line', id: n('a'), from: n('a0'), to: n('a1'), tone: TONE.base, label: o.labels.a, labelSide: 'right' });
  if (o.labels?.b) items.push({ kind: 'label', id: n('b'), at: n('bl'), tex: o.labels.b, tone: TONE.base, place: 'below' });
  if (o.labels?.c) items.push({ kind: 'line', id: n('c'), from: n('c0'), to: n('c1'), tone: TONE.base, label: o.labels.c, labelSide: 'right' });
  if (o.labels?.l) items.push({ kind: 'line', id: n('l'), from: n('l0'), to: n('l1'), tone: TONE.h, label: o.labels.l, labelSide: 'left' });
  if (o.labels?.perimeter) items.push({ kind: 'line', id: n('perimeter'), from: n('p0'), to: n('p1'), tone: 'good', label: o.labels.perimeter, labelSide: 'left' });
  return { points, items };
}

/**
 * The net of a cylinder: a rectangle as long as the circumference (2πr) and as tall as the height,
 * with a circle on its top and bottom edges. Groups: `rect` and `circles`; the dimensions `c` (the
 * rectangle's length), `h` and `r`.
 */
export function cylinderNet(o: { name?: string; r: number; h: number; labels?: Labels<'c' | 'h' | 'r'>; areas?: { rect?: string; circle?: string } }): Part {
  const n = namer(o.name);
  const C = 2 * Math.PI * o.r;
  const points: Record<string, P> = {};
  const ring = (cx: number, cy: number): P[] => Array.from({ length: 64 }, (_, i): P => [cx + o.r * Math.cos((i * Math.PI) / 32), cy + o.r * Math.sin((i * Math.PI) / 32)]);
  const items: DiagramItem[] = [
    ...face(n, points, 'body', rect(0, 0, C, o.h), 'brand', 'rect'),
    ...face(n, points, 'lid', ring(C / 2, o.h + o.r), 'good', 'circles'),
    ...face(n, points, 'base', ring(C / 2, -o.r), 'good', 'circles'),
  ];
  const areas: Record<string, { at: P; tex: string; group: string }> = {};
  if (o.areas?.rect) areas.body = { at: [C / 2, o.h / 2], tex: o.areas.rect, group: 'rect' };
  if (o.areas?.circle) areas.lid = { at: [C / 2, o.h + o.r * 0.55], tex: o.areas.circle, group: 'circles' };
  items.push(...areaLabels(n, points, areas));
  Object.assign(points, { [n('c0')]: [0, 0], [n('c1')]: [C, 0], [n('h0')]: [C, 0], [n('h1')]: [C, o.h], [n('O')]: [C / 2, -o.r], [n('R')]: [C / 2 + o.r, -o.r] });
  if (o.labels?.c) items.push({ kind: 'line', id: n('c'), from: n('c0'), to: n('c1'), tone: TONE.base, label: o.labels.c, labelSide: 'right', labelAt: 0.22 });
  if (o.labels?.h) items.push({ kind: 'line', id: n('h'), from: n('h0'), to: n('h1'), tone: TONE.h, label: o.labels.h, labelSide: 'right' });
  if (o.labels?.r) items.push({ kind: 'line', id: n('r'), from: n('O'), to: n('R'), tone: TONE.base, label: o.labels.r, labelSide: 'right' });
  return { points, items };
}

/**
 * The net of a square pyramid: the base (group `base`) with a triangle on each side (group
 * `sides`), each as tall as the slant height. The dimensions `b` and `s` (on the bottom triangle).
 */
export function squarePyramidNet(o: { name?: string; b: number; s: number; labels?: Labels<'b' | 's'>; areas?: { base?: string; side?: string } }): Part {
  const n = namer(o.name);
  const { b, s } = o;
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [
    ...face(n, points, 'sq', rect(0, 0, b, b), 'good', 'base'),
    ...face(n, points, 'tri-b', [[0, 0], [b / 2, -s], [b, 0]], 'brand', 'sides'),
    ...face(n, points, 'tri-r', [[b, 0], [b + s, b / 2], [b, b]], 'brand', 'sides'),
    ...face(n, points, 'tri-t', [[b, b], [b / 2, b + s], [0, b]], 'brand', 'sides'),
    ...face(n, points, 'tri-l', [[0, b], [-s, b / 2], [0, 0]], 'brand', 'sides'),
  ];
  const areas: Record<string, { at: P; tex: string; group: string }> = {};
  if (o.areas?.base) areas.sq = { at: [b / 2, b / 2], tex: o.areas.base, group: 'base' };
  if (o.areas?.side) areas.side = { at: [b + s / 3, b / 2], tex: o.areas.side, group: 'sides' };
  items.push(...areaLabels(n, points, areas));
  Object.assign(points, { [n('b0')]: [0, b], [n('b1')]: [b, b], [n('m')]: [b / 2, 0], [n('v')]: [b / 2, -s] });
  if (o.labels?.s) items.push({ kind: 'line', id: n('s'), from: n('m'), to: n('v'), tone: TONE.slant, dashed: true, label: o.labels.s, labelSide: 'right' });
  if (o.labels?.b) items.push({ kind: 'label', id: n('b'), at: n('m'), tex: o.labels.b, tone: TONE.base, place: 'above' });
  return { points, items };
}
