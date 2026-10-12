/** Math 9 Unit 9 — Symmetry (SS5). */
import { fixedChoice, numPart, part, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, PlaneFigure, SkillDef } from '../../../types.ts';
import { NAMES, Sketch, at, centroid, dist, type P } from './similarity.ts';

// ---------------------------------------------------------------------------
// Designs: filled polygons, with symmetry worked out by computation
// ---------------------------------------------------------------------------

type Fill = 'brand' | 'accent';
interface Piece {
  pts: P[];
  color: Fill;
}
interface Design {
  /** Noun phrase used in prompts, e.g. "regular hexagon", "letter H", "pinwheel logo". */
  name: string;
  pieces: Piece[];
}

const rot = (pts: P[], deg: number, c: P = [0, 0]): P[] => pts.map((p) => at(c, Math.atan2(p[1] - c[1], p[0] - c[0]) * (180 / Math.PI) + deg, dist(c, p)));
const one = (name: string, pts: P[]): Design => ({ name, pieces: [{ pts, color: 'brand' }] });
const regular = (n: number, r = 3, start = 90): P[] => Array.from({ length: n }, (_, i) => at([0, 0], start + (360 * i) / n, r));
/** n copies of a piece turned about the origin, colours alternating when two colours are given. */
const ring = (piece: P[], n: number, colors: Fill[] = ['brand'], start = 90): Piece[] =>
  Array.from({ length: n }, (_, i) => ({ pts: rot(piece, start + (360 * i) / n), color: colors[i % colors.length] }));

// Block letters on a 4-by-5 (or 5-by-5) grid.
const LETTERS: Record<string, P[]> = {
  T: [[0, 5], [5, 5], [5, 4], [3, 4], [3, 0], [2, 0], [2, 4], [0, 4]],
  H: [[0, 0], [1, 0], [1, 2], [3, 2], [3, 0], [4, 0], [4, 5], [3, 5], [3, 3], [1, 3], [1, 5], [0, 5]],
  I: [[0, 0], [3, 0], [3, 1], [2, 1], [2, 4], [3, 4], [3, 5], [0, 5], [0, 4], [1, 4], [1, 1], [0, 1]],
  L: [[0, 0], [4, 0], [4, 1], [1, 1], [1, 5], [0, 5]],
  E: [[0, 0], [4, 0], [4, 1], [1, 1], [1, 2], [3, 2], [3, 3], [1, 3], [1, 4], [4, 4], [4, 5], [0, 5]],
  F: [[0, 0], [1, 0], [1, 2], [3, 2], [3, 3], [1, 3], [1, 4], [4, 4], [4, 5], [0, 5]],
  N: [[0, 0], [1, 0], [1, 3.2], [3, 0], [4, 0], [4, 5], [3, 5], [3, 1.8], [1, 5], [0, 5]],
  S: [[0, 0], [4, 0], [4, 3], [1, 3], [1, 4], [4, 4], [4, 5], [0, 5], [0, 2], [3, 2], [3, 1], [0, 1]],
  Z: [[0, 4], [0, 5], [4, 5], [4, 4], [1.4, 1], [4, 1], [4, 0], [0, 0], [0, 1], [2.6, 4]],
  U: [[0, 5], [0, 0], [4, 0], [4, 5], [3, 5], [3, 1], [1, 1], [1, 5]],
  V: [[0, 5], [1.2, 5], [2, 1.6], [2.8, 5], [4, 5], [2.6, 0], [1.4, 0]],
  C: [[0, 0], [4, 0], [4, 1], [1, 1], [1, 4], [4, 4], [4, 5], [0, 5]],
  M: [[0, 0], [1, 0], [1, 3], [2, 1.6], [3, 3], [3, 0], [4, 0], [4, 5], [3, 5], [2, 3.2], [1, 5], [0, 5]],
};
const letter = (ch: string): Design => one(`letter ${ch}`, LETTERS[ch]);

const SHAPES: Record<string, () => Design> = {
  triangle: () => one('equilateral triangle', regular(3)),
  square: () => one('square', regular(4, 3, 45)),
  pentagon: () => one('regular pentagon', regular(5)),
  hexagon: () => one('regular hexagon', regular(6, 3, 0)),
  octagon: () => one('regular octagon (a stop sign shape)', regular(8, 3, 22.5)),
  rectangle: () => one('rectangle', [[0, 0], [5, 0], [5, 3], [0, 3]]),
  rhombus: () => one('rhombus', [[0, -2], [3, 0], [0, 2], [-3, 0]]),
  parallelogram: () => one('parallelogram', [[0, 0], [4, 0], [5.5, 2.5], [1.5, 2.5]]),
  isosceles: () => one('isosceles triangle', [[0, 0], [4, 0], [2, 4.5]]),
  kite: () => one('kite', [[0, -3], [1.8, 0.8], [0, 2], [-1.8, 0.8]]),
  scalene: () => one('scalene triangle', [[0, 0], [5, 0], [1.5, 3]]),
  trapezoid: () => one('isosceles trapezoid', [[0, 0], [6, 0], [4.5, 3], [1.5, 3]]),
  rightTrap: () => one('trapezoid with two right angles', [[0, 0], [5, 0], [3, 3], [0, 3]]),
  arrow: () => one('arrow sign', [[-3, -0.8], [0.6, -0.8], [0.6, -1.9], [3, 0], [0.6, 1.9], [0.6, 0.8], [-3, 0.8]]),
  house: () => one('house shape', [[-2, -2], [2, -2], [2, 0.6], [0, 2.6], [-2, 0.6]]),
  quad: () => one('quadrilateral', [[0, 0], [4, 0.5], [3.5, 3], [0.8, 2.2]]),
  plus: () => one('plus sign', [[1, 0], [2, 0], [2, 1], [3, 1], [3, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1]]),
};

const BLADE: P[] = [[0, 0], [3, 0], [3, 1.3]];
const HOOK: P[] = [[0.4, -0.4], [3, -0.4], [3, 1.2], [2.2, 1.2], [2.2, 0.4], [0.4, 0.4]];
const PETAL: P[] = [[0.6, 0], [1.9, 0.65], [3.2, 0], [1.9, -0.65]];
const RAY: P[] = [[0.7, -0.35], [2.2, -0.35], [2.2, -0.8], [3.3, 0], [2.2, 0.8], [2.2, 0.35], [0.7, 0.35]];

/** A design built from a kind and a size, so the generator can pick both with the rng. */
function makeDesign(kind: string, n: number): Design {
  switch (kind) {
    case 'pinwheel':
      return { name: 'pinwheel logo', pieces: ring(BLADE, n, ['brand'], 0) };
    case 'hooks':
      return { name: 'fan logo', pieces: ring(HOOK, n, ['brand'], 90) };
    case 'flower':
      return { name: 'flower decal', pieces: ring(PETAL, n, ['brand'], 90) };
    case 'star':
      return { name: 'compass star design', pieces: ring(RAY, n, ['brand'], 90) };
    case 'flower2':
      return { name: 'two-colour flower decal', pieces: ring(PETAL, 2 * n, ['brand', 'accent'], 90) };
    case 'pinwheel2':
      return { name: 'two-colour pinwheel', pieces: ring(BLADE, 2 * n, ['brand', 'accent'], 0) };
    case 'tileDiamond': {
      const sq: P[] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      return { name: 'floor tile', pieces: [{ pts: sq, color: 'brand' }, { pts: [[0, -3], [3, 0], [0, 3], [-3, 0]], color: 'accent' }] };
    }
    case 'quiltPinwheel': {
      const sq: P[] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      const tri: P[] = [[-3, -3], [0, -3], [-3, 0]];
      return { name: 'quilt block', pieces: [{ pts: sq, color: 'brand' }, ...[0, 90, 180, 270].map((a) => ({ pts: rot(tri, a), color: 'accent' as Fill }))] };
    }
    case 'hexTriangles': {
      const h = regular(6, 3, 90);
      return { name: 'hexagon logo', pieces: [{ pts: h, color: 'brand' }, { pts: [h[0], h[2], h[4]], color: 'accent' }] };
    }
    case 'flagDiamond':
      return { name: 'flag', pieces: [{ pts: [[-4, -2.5], [4, -2.5], [4, 2.5], [-4, 2.5]], color: 'brand' }, { pts: [[0, -1.8], [2.4, 0], [0, 1.8], [-2.4, 0]], color: 'accent' }] };
    case 'houseDoor':
      return { name: 'birdhouse design', pieces: [{ pts: [[-2.5, -2.5], [2.5, -2.5], [2.5, 1], [0, 3.3], [-2.5, 1]], color: 'brand' }, { pts: [[-0.7, -2.5], [0.7, -2.5], [0.7, -0.5], [-0.7, -0.5]], color: 'accent' }] };
    case 'houseWindow':
      return { name: 'birdhouse design', pieces: [{ pts: [[-2.5, -2.5], [2.5, -2.5], [2.5, 1], [0, 3.3], [-2.5, 1]], color: 'brand' }, { pts: [[0.6, -1.2], [1.8, -1.2], [1.8, 0], [0.6, 0]], color: 'accent' }] };
    case 'sTile': {
      const sq: P[] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      return { name: 'tile', pieces: [{ pts: sq, color: 'brand' }, { pts: [[-3, -3], [0, -3], [-3, 0]], color: 'accent' }, { pts: [[3, 3], [0, 3], [3, 0]], color: 'accent' }] };
    }
    case 'cornerTile': {
      const sq: P[] = [[-3, -3], [3, -3], [3, 3], [-3, 3]];
      return { name: 'tile', pieces: [{ pts: sq, color: 'brand' }, { pts: [[-3, -3], [0, -3], [-3, 0]], color: 'accent' }] };
    }
    case 'snowflake':
      return { name: 'snowflake decoration', pieces: [{ pts: regular(6, 1.2, 90), color: 'accent' }, ...ring(RAY, 6, ['brand'], 90)] };
    default:
      if (LETTERS[kind]) return letter(kind);
      return SHAPES[kind]();
  }
}

// --- symmetry by computation ---

type Edge = [P, P];
function edgesOf(d: Design): Array<{ e: Edge; c: Fill }> {
  const out: Array<{ e: Edge; c: Fill }> = [];
  for (const pc of d.pieces) for (let i = 0; i < pc.pts.length; i++) out.push({ e: [pc.pts[i], pc.pts[(i + 1) % pc.pts.length]], c: pc.color });
  return out;
}
const near = (p: P, q: P) => Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;

function mapsOnto(d: Design, f: (p: P) => P): boolean {
  const es = edgesOf(d);
  return es.every(({ e, c }) => {
    const a = f(e[0]);
    const b = f(e[1]);
    return es.some((o) => o.c === c && ((near(a, o.e[0]) && near(b, o.e[1])) || (near(a, o.e[1]) && near(b, o.e[0]))));
  });
}

function centreOf(d: Design): P {
  return centroid(d.pieces.flatMap((p) => p.pts));
}

/** Directions (degrees, 0 to 180) of the lines of symmetry. */
function symmetryLines(d: Design): number[] {
  const c = centreOf(d);
  const pts = d.pieces.flatMap((p) => p.pts);
  const v0 = pts.reduce((best, p) => (dist(c, p) > dist(c, best) ? p : best), pts[0]);
  const a0 = Math.atan2(v0[1] - c[1], v0[0] - c[0]) * (180 / Math.PI);
  // A line of symmetry sends v0 to a vertex just as far from the centre: try the bisector for each one.
  const cands = new Set<number>();
  for (const p of pts) {
    if (Math.abs(dist(c, p) - dist(c, v0)) > 1e-6) continue;
    const a = Math.atan2(p[1] - c[1], p[0] - c[0]) * (180 / Math.PI);
    cands.add(Math.round((((((a0 + a) / 2) % 180) + 180) % 180) * 1000) / 1000);
  }
  const out: number[] = [];
  for (const th of cands) {
    const u: P = [Math.cos((th * Math.PI) / 180), Math.sin((th * Math.PI) / 180)];
    const refl = (p: P): P => {
      const vx = p[0] - c[0];
      const vy = p[1] - c[1];
      const k = vx * u[0] + vy * u[1];
      return [c[0] + 2 * k * u[0] - vx, c[1] + 2 * k * u[1] - vy];
    };
    if (mapsOnto(d, refl)) out.push(th % 180 === 180 ? 0 : th);
  }
  return [...new Set(out.map((t) => (Math.abs(t - 180) < 1e-6 ? 0 : t)))].sort((a, b) => a - b);
}

/** Order of rotation symmetry: how many times the design fits onto itself in one full turn. */
function rotationOrder(d: Design): number {
  const c = centreOf(d);
  let order = 1;
  for (let n = 2; n <= 12; n++) {
    const a = (2 * Math.PI) / n;
    const f = (p: P): P => {
      const x = p[0] - c[0];
      const y = p[1] - c[1];
      return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
    };
    if (mapsOnto(d, f)) order = n;
  }
  return order;
}

function designFigure(d: Design): PlaneFigure {
  const s = new Sketch();
  for (const pc of d.pieces) s.poly(pc.pts, { color: pc.color, fill: true });
  return s.build({ margin: 0.7 });
}

/** "1 vertical line, 1 horizontal line and 2 diagonal lines" from line directions. */
function linesText(lines: number[]): string {
  if (!lines.length) return 'No fold line makes the two halves match, so there are **no** lines of symmetry.';
  const v = lines.filter((a) => Math.abs(a - 90) < 1e-6).length;
  const h = lines.filter((a) => Math.abs(a) < 1e-6).length;
  const sl = lines.length - v - h;
  const bits = [v ? '1 vertical line' : '', h ? '1 horizontal line' : '', sl ? `${sl} slanted line${sl === 1 ? '' : 's'}` : ''].filter(Boolean);
  const list = bits.length === 1 ? bits[0] : `${bits.slice(0, -1).join(', ')} and ${bits[bits.length - 1]}`;
  return `The design folds onto itself along ${list}: $${lines.length}$ line${lines.length === 1 ? '' : 's'} of symmetry.`;
}

function rotationText(n: number): string {
  if (n === 1) return 'Turned about its centre, the design fits onto itself only after a full turn of $360^\\circ$, so it has **no** rotation symmetry.';
  const turns = Array.from({ length: n }, (_, i) => `${fmt((360 / n) * (i + 1))}^\\circ`);
  return `Turned about its centre, the design fits onto itself after turns of $${turns.join(',\\ ')}$. That is $${n}$ times in one full turn, so the order of rotation is $${n}$.`;
}

const colourNote = (d: Design) => (new Set(d.pieces.map((p) => p.color)).size > 1 ? ' The colours must match too.' : '');

// ---------------------------------------------------------------------------
// Lesson 9.1 — Line symmetry
// ---------------------------------------------------------------------------

const EASY_LINE = ['triangle', 'square', 'pentagon', 'hexagon', 'octagon', 'rectangle', 'rhombus', 'parallelogram', 'isosceles', 'kite', 'scalene', 'trapezoid', 'arrow', 'house', 'plus', 'T', 'H', 'I', 'L', 'E', 'N', 'S', 'U', 'V', 'C', 'M', 'Z', 'F'];

/** A random half shape drawn against a line of symmetry, as coordinates in the line's frame. */
function halfShape(rng: Rng, nMid: number): Array<[number, number]> {
  // (u, v): u along the line (strictly increasing), v > 0 the distance from the line.
  return retry(
    () => {
      const us = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], nMid + 2).sort((a, b) => a - b);
      const pts: Array<[number, number]> = [[us[0], 0]];
      for (let i = 1; i <= nMid; i++) pts.push([us[i], rng.int(1, 4)]);
      pts.push([us[nMid + 1], 0]);
      return pts;
    },
    (pts) => pts.slice(1, -1).some((p) => p[1] >= 2) && new Set(pts.slice(1, -1).map((p) => p[1])).size > 1,
  );
}

interface Mirror {
  /** LaTeX description of the line. */
  tex: string;
  /** Frame (u along, v away) to grid coordinates. */
  toXY: (u: number, v: number) => P;
  reflect: (p: P) => P;
  seg: [P, P];
  rule: string;
}

function mirrorFor(kind: 'v' | 'h' | 'diag' | 'anti', k: number, side: 1 | -1): Mirror {
  if (kind === 'v')
    return {
      tex: k === 0 ? 'the $y$-axis' : `the line $x = ${k}$`,
      toXY: (u, v) => [k + side * v, u],
      reflect: ([x, y]) => [2 * k - x, y],
      seg: [[k, -7], [k, 7]],
      rule: k === 0 ? 'Reflecting in the $y$-axis changes the sign of $x$ and keeps $y$.' : `The image is the same distance from $x = ${k}$, on the other side; $y$ stays the same.`,
    };
  if (kind === 'h')
    return {
      tex: k === 0 ? 'the $x$-axis' : `the line $y = ${k}$`,
      toXY: (u, v) => [u, k + side * v],
      reflect: ([x, y]) => [x, 2 * k - y],
      seg: [[-7, k], [7, k]],
      rule: k === 0 ? 'Reflecting in the $x$-axis keeps $x$ and changes the sign of $y$.' : `The image is the same distance from $y = ${k}$, on the other side; $x$ stays the same.`,
    };
  if (kind === 'diag')
    return {
      tex: 'the line $y = x$',
      toXY: (u, v) => [u - side * v, u + side * v],
      reflect: ([x, y]) => [y, x],
      seg: [[-7, -7], [7, 7]],
      rule: 'Reflecting in the line $y = x$ swaps the coordinates: $(x, y) \\to (y, x)$.',
    };
  return {
    tex: 'the line $y = -x$',
    toXY: (u, v) => [u + side * v, -u + side * v],
    reflect: ([x, y]) => [-y, -x],
    seg: [[-7, 7], [7, -7]],
    rule: 'Reflecting in the line $y = -x$ swaps the coordinates and changes both signs: $(x, y) \\to (-y, -x)$.',
  };
}

const GRID: GridSpec = { xMin: -7, xMax: 7, yMin: -7, yMax: 7, step: 1 };
const ptTex = (p: P) => `(${fmt(p[0])},\\ ${fmt(p[1])})`;
const inGrid = (p: P) => Math.abs(p[0]) <= 6 && Math.abs(p[1]) <= 6;

function completeItem(rng: Rng, kind: 'v' | 'h' | 'diag' | 'anti', asks: number): GenOutput {
  const side: 1 | -1 = rng.chance(0.5) ? 1 : -1;
  const k = kind === 'v' || kind === 'h' ? rng.int(-2, 2) : 0;
  const m = mirrorFor(kind, k, side);
  const diag = kind === 'diag' || kind === 'anti';
  const nMid = rng.int(2, 3);
  const half = retry(
    () => halfShape(rng, nMid),
    (h) => h.map(([u, v]) => m.toXY(u, v)).every((p) => inGrid(p) && inGrid(m.reflect(p))),
    200,
  );
  const pts = half.map(([u, v]) => m.toXY(u, v));
  const names = ['A', 'B', 'C', 'D', 'E'].slice(0, pts.length);
  const askIdx = rng.shuffle(pts.map((_, i) => i).filter((i) => i > 0 && i < pts.length - 1)).slice(0, asks).sort((a, b) => a - b);
  const s = new Sketch();
  s.seg(m.seg[0], m.seg[1], { color: 'accent', dashed: true });
  s.poly(pts, { closed: false });
  pts.forEach((p, i) => {
    s.dot(p);
    const c = centroid(pts);
    s.endLabel(p, Math.atan2(p[1] - c[1], p[0] - c[0]) * (180 / Math.PI), names[i]);
  });
  const figure = s.buildGrid(GRID);
  const images = askIdx.map((i) => m.reflect(pts[i]));
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is drawing a shape that has ${m.tex} as a line of symmetry. Only half of the shape is drawn. Find the coordinates of ${askIdx.map((i) => `$${names[i]}'$`).join(' and ')}, the image${asks > 1 ? 's' : ''} of ${askIdx.map((i) => `$${names[i]}$`).join(' and ')}, on the other half of the shape.`,
    figure,
    parts: askIdx.map((i, j) => part({ kind: 'point', x: images[j][0], y: images[j][1] }, { label: `$${names[i]}' =$`, placeholder: '(x, y)' })),
    hints: [
      'Each point on the missing half is the mirror image of a point on the drawn half. It is the same distance from the line of symmetry, on the other side.',
      m.rule,
    ],
    solution: [
      ...askIdx.map((i, j) => {
        const p = pts[i];
        if (kind === 'v') return `$${names[i]}${ptTex(p)}$ is $${fmt(Math.abs(p[0] - k))}$ unit${Math.abs(p[0] - k) === 1 ? '' : 's'} ${p[0] < k ? 'left' : 'right'} of the line, so $${names[i]}'$ is $${fmt(Math.abs(p[0] - k))}$ ${p[0] < k ? 'right' : 'left'} of it: $${names[i]}'${ptTex(images[j])}$.`;
        if (kind === 'h') return `$${names[i]}${ptTex(p)}$ is $${fmt(Math.abs(p[1] - k))}$ unit${Math.abs(p[1] - k) === 1 ? '' : 's'} ${p[1] < k ? 'below' : 'above'} the line, so $${names[i]}'$ is $${fmt(Math.abs(p[1] - k))}$ ${p[1] < k ? 'above' : 'below'} it: $${names[i]}'${ptTex(images[j])}$.`;
        return `$${names[i]}${ptTex(p)} \\to ${names[i]}'${ptTex(images[j])}$`;
      }),
      diag ? m.rule : `Check: the line of symmetry is exactly halfway between each point and its image.`,
      `${askIdx.map((i, j) => `$${names[i]}' = ${ptTex(images[j])}$`).join(' and ')}`,
    ],
    answerDisplay: askIdx.map((i, j) => `$${names[i]}' = ${ptTex(images[j])}$`).join(', '),
  };
}

const LINE_HINTS = [
  'A line of symmetry is a fold line: the two halves match exactly when you fold along it.',
  'Check vertical, horizontal and slanted fold lines through the centre of the shape. Count each one that works.',
];

function lineSymmetryGen(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const key = rng.pick(EASY_LINE);
    const des = makeDesign(key, 0);
    const lines = symmetryLines(des);
    return {
      prompt: `How many lines of symmetry does this ${des.name} have?`,
      figure: designFigure(des),
      parts: [numPart(lines.length, { label: 'Lines of symmetry' })],
      hints: LINE_HINTS,
      solution: [linesText(lines), `The ${des.name} has $${lines.length}$ line${lines.length === 1 ? '' : 's'} of symmetry.`],
    };
  }
  if (d === 2) return completeItem(rng, rng.pick(['v', 'v', 'h', 'h'] as const), 1);
  // d = 3
  if (rng.chance(0.5)) return completeItem(rng, rng.pick(['v', 'h', 'diag', 'anti'] as const), 2);
  const kind = rng.pick(['flower', 'star', 'pinwheel', 'hooks', 'flower2', 'pinwheel2', 'tileDiamond', 'quiltPinwheel', 'hexTriangles', 'flagDiamond', 'houseDoor', 'houseWindow', 'sTile', 'cornerTile', 'snowflake']);
  const n = kind === 'flower2' || kind === 'pinwheel2' ? rng.int(2, 4) : rng.int(3, 8);
  const des = makeDesign(kind, n);
  const lines = symmetryLines(des);
  return {
    prompt: `How many lines of symmetry does this ${des.name} have? A line of symmetry must work for every part of the design.${colourNote(des)}`,
    figure: designFigure(des),
    parts: [numPart(lines.length, { label: 'Lines of symmetry' })],
    hints: ['First find the lines of symmetry of the outline or of one part. Then check each line against the whole design.', `A fold line only counts if every part lands exactly on a matching part.${colourNote(des)}`],
    solution: [linesText(lines), `The ${des.name} has $${lines.length}$ line${lines.length === 1 ? '' : 's'} of symmetry.`],
  };
}

const lineSymmetry = skill({
  id: 'm9-line-symmetry',
  name: 'Line symmetry',
  description: 'Find the number of lines of symmetry of shapes, letters and designs, and complete a shape across a line of symmetry on a coordinate grid.',
  outcomes: ['SS5'],
  lessonId: 'm9-9-1',
  gen: lineSymmetryGen,
});

// ---------------------------------------------------------------------------
// Lesson 9.2 — Rotation symmetry
// ---------------------------------------------------------------------------

const ROT_SHAPES = ['triangle', 'square', 'pentagon', 'hexagon', 'octagon', 'rectangle', 'rhombus', 'parallelogram', 'plus', 'H', 'I', 'N', 'S', 'Z'];
const ROT_DESIGNS = ['pinwheel', 'hooks', 'flower', 'star', 'flower2', 'pinwheel2', 'tileDiamond', 'quiltPinwheel', 'hexTriangles', 'flagDiamond', 'sTile', 'snowflake'];

const CLASS = ['Line symmetry only', 'Rotation symmetry only', 'Both line symmetry and rotation symmetry', 'Neither line symmetry nor rotation symmetry'];
const POOLS: string[][] = [
  ['isosceles', 'kite', 'trapezoid', 'arrow', 'house', 'T', 'U', 'V', 'C', 'M', 'E', 'houseDoor'],
  ['pinwheel', 'hooks', 'pinwheel2', 'parallelogram', 'N', 'S', 'Z', 'quiltPinwheel', 'sTile'],
  ['flower', 'star', 'flower2', 'tileDiamond', 'hexTriangles', 'flagDiamond', 'H', 'I', 'plus', 'rectangle', 'rhombus', 'hexagon', 'snowflake'],
  ['scalene', 'quad', 'rightTrap', 'L', 'F', 'houseWindow', 'cornerTile'],
];

function rotationSymmetryGen(rng: Rng, d: Difficulty): GenOutput {
  if (d === 1) {
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const n = rng.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
      const what = rng.pick(['A logo', 'A hubcap design', 'A snowflake decoration', 'A quilt block', 'A ceiling fan', 'A team crest']);
      return {
        prompt: `${what} has rotation symmetry of order $${n}$. What is its angle of rotation symmetry (the smallest turn that makes it fit onto itself)?`,
        parts: [numPart(360 / n, { label: 'Angle', suffix: '°' })],
        hints: ['Order $n$ means the design fits onto itself $n$ times in one full turn of $360^\\circ$.', 'Angle of rotation symmetry $= 360^\\circ \\div \\text{order}$.'],
        solution: [`The design fits onto itself $${n}$ times in $360^\\circ$, at equal turns.`, `$360^\\circ \\div ${n} = ${fmt(360 / n)}^\\circ$`, `The angle of rotation symmetry is $${fmt(360 / n)}^\\circ$.`],
        calculator: false,
      };
    }
    if (kind === 1) {
      const n = rng.pick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
      const what = rng.pick(['logo', 'pinwheel', 'window design', 'flower decal', 'mandala design']);
      return {
        prompt: `A ${what} fits onto itself every time it turns $${fmt(360 / n)}^\\circ$ about its centre, and not after any smaller turn. What is its order of rotation symmetry?`,
        parts: [numPart(n, { label: 'Order' })],
        hints: ['The order is the number of times the design fits onto itself in one full turn.', `Divide $360^\\circ$ by $${fmt(360 / n)}^\\circ$.`],
        solution: [`$360^\\circ \\div ${fmt(360 / n)}^\\circ = ${n}$`, `The design fits onto itself $${n}$ times in a full turn, so the order of rotation symmetry is $${n}$.`],
        calculator: false,
      };
    }
    const key = rng.pick(ROT_SHAPES);
    const des = makeDesign(key, 0);
    const n = rotationOrder(des);
    return {
      prompt: `What is the order of rotation symmetry of this ${des.name}?`,
      figure: designFigure(des),
      parts: [numPart(n, { label: 'Order' })],
      hints: ['Imagine tracing the shape, then turning the tracing about the centre of the shape.', 'Count how many times the tracing fits exactly on the shape during one full turn.'],
      solution: [rotationText(n), `The order of rotation symmetry is $${n}$.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick([...ROT_DESIGNS, ...ROT_DESIGNS, ...ROT_SHAPES]);
    const n0 = kind === 'flower2' || kind === 'pinwheel2' ? rng.int(2, 4) : rng.int(3, 8);
    const des = makeDesign(kind, n0);
    const n = rotationOrder(des);
    return {
      prompt: `This ${des.name} has rotation symmetry. (a) What is its order of rotation symmetry? (b) What is its angle of rotation symmetry?${colourNote(des)}`,
      figure: designFigure(des),
      parts: [numPart(n, { label: '(a) Order' }), numPart(360 / n, { label: '(b) Angle', suffix: '°' })],
      hints: [`Count how many times the design fits onto itself in one full turn about its centre.${colourNote(des)}`, 'Angle of rotation symmetry $= 360^\\circ \\div \\text{order}$.'],
      solution: [rotationText(n), `(a) The order is $${n}$.`, `(b) The angle is $360^\\circ \\div ${n} = ${fmt(360 / n)}^\\circ$.`],
    };
  }
  // d = 3: classify the symmetry of a design.
  const cls = rng.int(0, 3);
  const key = rng.pick(POOLS[cls]);
  const n0 = key === 'flower2' || key === 'pinwheel2' ? rng.int(2, 4) : rng.int(3, 8);
  const des = makeDesign(key, n0);
  const lines = symmetryLines(des);
  const n = rotationOrder(des);
  const actual = lines.length > 0 ? (n > 1 ? 2 : 0) : n > 1 ? 1 : 3;
  return {
    prompt: `Describe the symmetry of this ${des.name}.${colourNote(des)}`,
    figure: designFigure(des),
    parts: [{ answer: fixedChoice(CLASS, actual) }],
    hints: ['First look for fold lines that make the two halves match.', 'Then imagine turning the design about its centre. Does it fit onto itself before a full turn?'],
    solution: [
      linesText(lines),
      rotationText(n),
      `So the ${des.name} has ${['line symmetry only', 'rotation symmetry only', 'both line symmetry and rotation symmetry', 'neither line symmetry nor rotation symmetry'][actual]}.`,
    ],
  };
}

const rotationSymmetry = skill({
  id: 'm9-rotation-symmetry',
  name: 'Rotation symmetry',
  description: 'Find the order and angle of rotation symmetry of shapes and designs, and describe a design as having line symmetry, rotation symmetry, both or neither.',
  outcomes: ['SS5'],
  lessonId: 'm9-9-2',
  gen: rotationSymmetryGen,
});

export const SYMMETRY_SKILLS: SkillDef[] = [lineSymmetry, rotationSymmetry];
