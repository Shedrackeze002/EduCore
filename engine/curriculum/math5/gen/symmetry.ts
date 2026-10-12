/** Math 5 Unit 8 — Symmetry (G1). Lines of symmetry, rotation symmetry and the symmetry of polygons. */
import { fixedChoice, mc, mcFigures, numPart, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];

const LETTERS = 'ABCDEFGH';
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
const linesWord = (n: number) => `$${n}$ ${plural(n, 'line', 'lines')} of symmetry`;
/** A whole-number answer: the student types the value, not a calculation. */
const intPart = (v: number, opts: { label?: string; suffix?: string } = {}) => numPart(v, { ...opts, exact: false });
/** The letter a choice shows (A, B, C ...) once the choices are in their final order. */
const choiceLetter = (ans: AnswerSpec) => (ans.kind === 'mc' ? LETTERS[ans.choices.findIndex((c) => c.id === ans.correct)] : 'A');

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const EPS = 1e-6;
const same = (p: P, q: P) => Math.abs(p[0] - q[0]) < EPS && Math.abs(p[1] - q[1]) < EPS;
const rot = ([x, y]: P, deg: number): P => [x * Math.cos(rad(deg)) - y * Math.sin(rad(deg)), x * Math.sin(rad(deg)) + y * Math.cos(rad(deg))];
const r2 = (v: number) => {
  const r = Math.round(v * 100) / 100;
  return r === 0 ? 0 : r;
};

/** Regular polygon with n vertices on a circle of radius r, the first at angle `start`. */
function regular(n: number, r = 3, start = 90): P[] {
  return Array.from({ length: n }, (_, k) => rot([r, 0], start + (360 * k) / n));
}

/** A star with n points: outer radius R, inner radius r. */
function starPts(n: number, R: number, r: number, start = 90): P[] {
  const out: P[] = [];
  for (let k = 0; k < n; k++) {
    out.push(rot([R, 0], start + (360 * k) / n));
    out.push(rot([r, 0], start + (360 * k) / n + 180 / n));
  }
  return out;
}

interface Poly {
  pts: P[];
  color?: 'brand' | 'accent';
}

interface Shape {
  key: string;
  /** What to call it in a sentence, without an article: "rectangle", "letter H". */
  name: string;
  polys: Poly[];
}

/** Several copies of a polygon turned around the origin. */
const turned = (pts: P[], n: number, color?: 'brand' | 'accent'): Poly[] => Array.from({ length: n }, (_, k) => ({ pts: pts.map((p) => rot(p, (360 * k) / n)), color }));

const RAW: Array<{ key: string; name: string; polys: Poly[] }> = [
  { key: 'square', name: 'square', polys: [{ pts: [[-2, -2], [2, -2], [2, 2], [-2, 2]] }] },
  { key: 'rectangle', name: 'rectangle', polys: [{ pts: [[-3, -1.6], [3, -1.6], [3, 1.6], [-3, 1.6]] }] },
  { key: 'equilateral', name: 'equilateral triangle', polys: [{ pts: regular(3, 3, 90) }] },
  { key: 'isosceles', name: 'isosceles triangle', polys: [{ pts: [[-2, -2], [2, -2], [0, 2.8]] }] },
  { key: 'scalene', name: 'triangle', polys: [{ pts: [[-2.6, -1.6], [2.2, -1.6], [1, 2]] }] },
  { key: 'rightTri', name: 'right triangle', polys: [{ pts: [[-2, -1.6], [2.5, -1.6], [-2, 1.8]] }] },
  { key: 'rhombus', name: 'rhombus', polys: [{ pts: [[0, -3], [1.8, 0], [0, 3], [-1.8, 0]] }] },
  { key: 'parallelogram', name: 'parallelogram', polys: [{ pts: [[-3, -1.5], [1.5, -1.5], [3, 1.5], [-1.5, 1.5]] }] },
  { key: 'kite', name: 'kite', polys: [{ pts: [[0, -3], [1.7, 0.8], [0, 2], [-1.7, 0.8]] }] },
  { key: 'trapezoid', name: 'trapezoid', polys: [{ pts: [[-3, -1.5], [3, -1.5], [1.5, 1.5], [-1.5, 1.5]] }] },
  { key: 'rightTrap', name: 'trapezoid', polys: [{ pts: [[-2.5, -1.5], [2.5, -1.5], [0.5, 1.5], [-2.5, 1.5]] }] },
  { key: 'pentagon', name: 'regular pentagon', polys: [{ pts: regular(5, 3, 90) }] },
  { key: 'hexagon', name: 'regular hexagon', polys: [{ pts: regular(6, 3, 0) }] },
  { key: 'octagon', name: 'regular octagon', polys: [{ pts: regular(8, 3, 22.5) }] },
  { key: 'house', name: 'house shape', polys: [{ pts: [[-2, -2], [2, -2], [2, 0.6], [0, 2.6], [-2, 0.6]] }] },
  { key: 'arrow', name: 'arrow', polys: [{ pts: [[-3, -0.8], [0.6, -0.8], [0.6, -1.9], [3, 0], [0.6, 1.9], [0.6, 0.8], [-3, 0.8]] }] },
  { key: 'plus', name: 'plus sign', polys: [{ pts: [[-1, -3], [1, -3], [1, -1], [3, -1], [3, 1], [1, 1], [1, 3], [-1, 3], [-1, 1], [-3, 1], [-3, -1], [-1, -1]] }] },
  { key: 'lShape', name: 'L shape', polys: [{ pts: [[-2, -2], [2, -2], [2, -0.6], [-0.6, -0.6], [-0.6, 2], [-2, 2]] }] },
  { key: 'tShape', name: 'T shape', polys: [{ pts: [[-3, 2.5], [3, 2.5], [3, 1], [0.9, 1], [0.9, -2.5], [-0.9, -2.5], [-0.9, 1], [-3, 1]] }] },
  { key: 'stepZ', name: 'step shape', polys: [{ pts: [[0, 2], [2, 2], [2, 1], [3, 1], [3, 0], [1, 0], [1, 1], [0, 1]] }] },
  { key: 'hexLong', name: 'hexagon', polys: [{ pts: [[-3, 0], [-1.5, -1.6], [1.5, -1.6], [3, 0], [1.5, 1.6], [-1.5, 1.6]] }] },
  { key: 'hexSlant', name: 'hexagon', polys: [{ pts: [[-3, -1], [0, -2], [2.5, -1.2], [3, 1], [0, 2], [-2.5, 1.2]] }] },
  { key: 'letterH', name: 'letter H', polys: [{ pts: [[-2, -2.5], [-1, -2.5], [-1, -0.5], [1, -0.5], [1, -2.5], [2, -2.5], [2, 2.5], [1, 2.5], [1, 0.5], [-1, 0.5], [-1, 2.5], [-2, 2.5]] }] },
  { key: 'letterI', name: 'letter I', polys: [{ pts: [[-1.5, -2.5], [1.5, -2.5], [1.5, -1.7], [0.5, -1.7], [0.5, 1.7], [1.5, 1.7], [1.5, 2.5], [-1.5, 2.5], [-1.5, 1.7], [-0.5, 1.7], [-0.5, -1.7], [-1.5, -1.7]] }] },
  { key: 'letterT', name: 'letter T', polys: [{ pts: [[-2, 2.5], [2, 2.5], [2, 1.5], [0.5, 1.5], [0.5, -2.5], [-0.5, -2.5], [-0.5, 1.5], [-2, 1.5]] }] },
  { key: 'letterE', name: 'letter E', polys: [{ pts: [[-1.75, -2.5], [1.75, -2.5], [1.75, -1.7], [-0.75, -1.7], [-0.75, -0.4], [1.25, -0.4], [1.25, 0.4], [-0.75, 0.4], [-0.75, 1.7], [1.75, 1.7], [1.75, 2.5], [-1.75, 2.5]] }] },
  { key: 'letterL', name: 'letter L', polys: [{ pts: [[-1.5, -2.5], [1.75, -2.5], [1.75, -1.5], [-0.5, -1.5], [-0.5, 2.5], [-1.5, 2.5]] }] },
  { key: 'letterN', name: 'letter N', polys: [{ pts: [[-2, -2.5], [-1, -2.5], [-1, 0.5], [1, -2.5], [2, -2.5], [2, 2.5], [1, 2.5], [1, -0.5], [-1, 2.5], [-2, 2.5]] }] },
  { key: 'letterS', name: 'letter S', polys: [{ pts: [[-2, 2.5], [2, 2.5], [2, 1.5], [-1, 1.5], [-1, 0.5], [2, 0.5], [2, -2.5], [-2, -2.5], [-2, -1.5], [1, -1.5], [1, -0.5], [-2, -0.5]] }] },
  { key: 'letterZ', name: 'letter Z', polys: [{ pts: [[-2, 2.5], [2, 2.5], [2, 1.5], [-0.6, -1.5], [2, -1.5], [2, -2.5], [-2, -2.5], [-2, -1.5], [0.6, 1.5], [-2, 1.5]] }] },
  { key: 'pinwheel4', name: 'pinwheel', polys: turned([[0, 0], [3, 0], [3, 2]], 4) },
  { key: 'pinwheel3', name: 'three-blade pinwheel', polys: turned([[0, 0], [3, 0], [2.2, 1.7]], 3) },
  { key: 'star4', name: 'four-pointed star', polys: [{ pts: starPts(4, 3.2, 1.1) }] },
  { key: 'star5', name: 'starfish shape', polys: [{ pts: starPts(5, 3.2, 1.3) }] },
  { key: 'star6', name: 'six-pointed star', polys: [{ pts: starPts(6, 3.2, 1.75) }] },
  { key: 'star8', name: 'eight-pointed star', polys: [{ pts: starPts(8, 3.2, 1.5) }] },
  { key: 'flower6', name: 'flower design', polys: turned([[0, 0], [0.9, 1.5], [0, 3.2], [-0.9, 1.5]], 6) },
  { key: 'flower5', name: 'flower design', polys: turned([[0, 0], [0.9, 1.5], [0, 3.2], [-0.9, 1.5]], 5) },
  {
    key: 'pinQuilt',
    name: 'pinwheel quilt block',
    polys: [{ pts: [[-3, -3], [3, -3], [3, 3], [-3, 3]] }, ...turned([[0, 0], [0, 3], [-3, 3]], 4, 'accent')],
  },
  {
    key: 'halfTile',
    name: 'two-colour tile',
    polys: [{ pts: [[-3, -3], [3, -3], [3, 3], [-3, 3]] }, { pts: [[-3, -3], [3, -3], [3, 3]], color: 'accent' }],
  },
  {
    key: 'diamondQuilt',
    name: 'quilt block',
    polys: [{ pts: [[-3, -3], [3, -3], [3, 3], [-3, 3]] }, { pts: [[0, -3], [3, 0], [0, 3], [-3, 0]], color: 'accent' }],
  },
  {
    key: 'stripeFlag',
    name: 'flag design',
    polys: [{ pts: [[-3, -2], [3, -2], [3, 2], [-3, 2]] }, { pts: [[-1, -2], [1, -2], [1, 2], [-1, 2]], color: 'accent' }],
  },
  {
    key: 'cornerFlag',
    name: 'flag design',
    polys: [{ pts: [[-3, -2], [3, -2], [3, 2], [-3, 2]] }, { pts: [[-3, 0], [0, 0], [0, 2], [-3, 2]], color: 'accent' }],
  },
];

/** Every shape centred on its bounding box and scaled so it reaches 3.1 units from the centre. */
const SHAPES: Record<string, Shape> = Object.fromEntries(
  RAW.map((s) => {
    const all = s.polys.flatMap((p) => p.pts);
    const xs = all.map((p) => p[0]);
    const ys = all.map((p) => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const k = 3.1 / Math.max(Math.max(...xs) - cx, Math.max(...ys) - cy);
    const polys = s.polys.map((p) => ({ ...p, pts: p.pts.map(([x, y]) => [(x - cx) * k, (y - cy) * k] as P) }));
    return [s.key, { key: s.key, name: s.name, polys }];
  }),
);

function vertices(sh: Shape): P[] {
  const out: P[] = [];
  for (const pl of sh.polys) for (const p of pl.pts) if (!out.some((q) => same(p, q))) out.push(p);
  return out;
}

function centreOf(sh: Shape): P {
  const v = vertices(sh);
  return [v.reduce((s, p) => s + p[0], 0) / v.length, v.reduce((s, p) => s + p[1], 0) / v.length];
}

/** True when the map sends every polygon of the shape onto a polygon of the same colour (edge for edge). */
function mapsOnto(sh: Shape, f: (p: P) => P): boolean {
  const edges = (pts: P[]): Array<[P, P]> => pts.map((p, i) => [p, pts[(i + 1) % pts.length]]);
  return sh.polys.every((pl) => {
    const img = edges(pl.pts.map(f));
    return sh.polys.some(
      (q) =>
        (q.color ?? 'brand') === (pl.color ?? 'brand') &&
        q.pts.length === pl.pts.length &&
        img.every(([a, b]) => edges(q.pts).some(([c, d]) => (same(a, c) && same(b, d)) || (same(a, d) && same(b, c)))),
    );
  });
}

interface Sym {
  /** Directions of the lines of symmetry in degrees, 0 ≤ d < 180 (0 = horizontal). */
  axes: number[];
  /** Order of rotation symmetry (1 = none). */
  order: number;
  centre: P;
}

const SYM_CACHE = new Map<string, Sym>();

function symmetryOf(sh: Shape): Sym {
  const hit = SYM_CACHE.get(sh.key);
  if (hit) return hit;
  const c = centreOf(sh);
  const vs = vertices(sh);
  // Every line of symmetry passes through the centre and either a vertex or the midpoint of two vertices.
  const cands: number[] = [];
  const addDir = (dx: number, dy: number) => {
    if (Math.hypot(dx, dy) < EPS) return;
    let a = (Math.atan2(dy, dx) * 180) / Math.PI;
    a = ((a % 180) + 180) % 180;
    if (a > 180 - 1e-7) a = 0;
    if (!cands.some((b) => Math.abs(a - b) < 1e-7)) cands.push(a);
  };
  for (let i = 0; i < vs.length; i++) {
    for (let j = i; j < vs.length; j++) {
      if (i === j) addDir(vs[i][0] - c[0], vs[i][1] - c[1]);
      else {
        const m: P = [(vs[i][0] + vs[j][0]) / 2, (vs[i][1] + vs[j][1]) / 2];
        if (Math.hypot(m[0] - c[0], m[1] - c[1]) > EPS) addDir(m[0] - c[0], m[1] - c[1]);
        else addDir(-(vs[j][1] - vs[i][1]), vs[j][0] - vs[i][0]);
      }
    }
  }
  const axes = cands
    .filter((th) => {
      const u: P = [Math.cos(rad(th)), Math.sin(rad(th))];
      return mapsOnto(sh, (p) => {
        const v: P = [p[0] - c[0], p[1] - c[1]];
        const d = v[0] * u[0] + v[1] * u[1];
        return [c[0] + 2 * d * u[0] - v[0], c[1] + 2 * d * u[1] - v[1]];
      });
    })
    .map((a) => Math.round(a * 1e6) / 1e6)
    .sort((a, b) => a - b);
  let order = 1;
  for (let n = 24; n >= 2; n--) {
    if (mapsOnto(sh, (p) => {
      const q = rot([p[0] - c[0], p[1] - c[1]], 360 / n);
      return [q[0] + c[0], q[1] + c[1]];
    })) {
      order = n;
      break;
    }
  }
  const out = { axes, order, centre: c };
  SYM_CACHE.set(sh.key, out);
  return out;
}

const symOf = (key: string) => symmetryOf(SHAPES[key]);

// ---------------------------------------------------------------------------
// Drawing: a pixel canvas (y up). Labels are drawn by the plane renderer 8 px right of and 8 px
// above an invisible anchor point, so each label is placed where it and its anchor stay clear of
// every line.
// ---------------------------------------------------------------------------

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}
function distPtBox(p: P, b: Box): number {
  return Math.hypot(Math.max(b.x0 - p[0], 0, p[0] - b.x1), Math.max(b.y0 - p[1], 0, p[1] - b.y1));
}
function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ps = [-dx, dx, -dy, dy];
  const qs = [a[0] - box.x0, box.x1 - a[0], a[1] - box.y0, box.y1 - a[1]];
  for (let i = 0; i < 4; i++) {
    if (ps[i] === 0) {
      if (qs[i] < 0) return false;
    } else {
      const r = qs[i] / ps[i];
      if (ps[i] < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return true;
}
function distSegBox(a: P, b: P, box: Box): number {
  if (segHitsBox(a, b, box)) return 0;
  const corners: P[] = [[box.x0, box.y0], [box.x0, box.y1], [box.x1, box.y0], [box.x1, box.y1]];
  return Math.min(...corners.map((c) => distPtSeg(c, a, b)), distPtBox(a, box), distPtBox(b, box));
}
function distBoxBox(p: Box, q: Box): number {
  return Math.hypot(Math.max(q.x0 - p.x1, p.x0 - q.x1, 0), Math.max(q.y0 - p.y1, p.y0 - q.y1, 0));
}
function inPoly(p: P, poly: P[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
/** Approximate width (px) of a 12 px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' || ch === '.' ? 3.6 : /[mMwW]/.test(ch) ? 10.5 : ch === 'i' || ch === 'l' ? 3.6 : 7.4;
  return w;
}

const CANVAS = 340;

class Canvas {
  private polys: Array<{ points: P[]; color: Color; fill: boolean }> = [];
  private segs: PlaneSegment[] = [];
  private dots: Array<{ p: P; color: Color; label?: string }> = [];
  private obstacles: Array<[P, P]> = [];
  private fills: P[][] = [];
  private labels: Array<{ text: string; box: Box; anchor: P }> = [];
  private extra: P[] = [];

  poly(pts: P[], color: Color = 'brand', fill = true): this {
    const points = [...pts, pts[0]];
    this.polys.push({ points, color, fill });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    if (fill) this.fills.push(pts);
    return this;
  }

  seg(a: P, b: P, opts: { color?: Color; dashed?: boolean } = {}): this {
    this.segs.push({ from: a, to: b, ...opts });
    this.obstacles.push([a, b]);
    return this;
  }

  /** A visible dot; its label (if any) is drawn just above and to the right of it. */
  dot(p: P, color: Color = 'brand', label?: string): this {
    this.dots.push({ p, color, label });
    return this;
  }

  include(p: P): this {
    this.extra.push(p);
    return this;
  }

  /** A label near point p, preferably in direction `dir` (degrees). */
  labelNear(p: P, dir: number, text: string): this {
    const cands: P[] = [];
    for (const r of [13, 16, 20, 25, 31, 38]) for (const off of [0, 25, -25, 50, -50, 80, -80, 120, -120, 180]) cands.push([p[0] + r * Math.cos(rad(dir + off)), p[1] + r * Math.sin(rad(dir + off))]);
    return this.place(text, cands);
  }

  private place(text: string, cands: P[]): this {
    const wpx = textWidth(text);
    const hw = wpx / 2 + 1.5;
    let best: { score: number; box: Box; anchor: P } | null = null;
    for (const c of cands) {
      const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - 6.5, y1: c[1] + 6.5 };
      const anchor: P = [c[0] - 8 - wpx / 2, c[1] - 12.3];
      let score = 99;
      for (const [a, b] of this.obstacles) score = Math.min(score, distSegBox(a, b, box) - 2, distPtSeg(anchor, a, b) - 7);
      for (const l of this.labels) score = Math.min(score, distBoxBox(l.box, box) - 2, distPtBox(anchor, l.box) - 6, distPtBox(l.anchor, box) - 6);
      for (const d of this.dots) score = Math.min(score, distPtBox(d.p, box) - 5, Math.hypot(anchor[0] - d.p[0], anchor[1] - d.p[1]) - 10);
      if (this.fills.some((f) => inPoly(anchor, f))) score = Math.min(score, -3);
      if (!best || score > best.score) best = { score, box, anchor };
      if (score >= 0) break;
    }
    if (best) this.labels.push({ text, box: best.box, anchor: best.anchor });
    return this;
  }

  /**
   * The finished figure, or null when it is wider than the canvas. A cropped figure (for small
   * answer choices) is only as wide as the drawing; it must not have labels placed by `labelNear`.
   */
  build(caption: string, crop = false): PlaneFigure | null {
    const xs: number[] = [];
    const ys: number[] = [];
    const add = (p: P, r = 0) => {
      xs.push(p[0] - r, p[0] + r);
      ys.push(p[1] - r, p[1] + r);
    };
    for (const [a, b] of this.obstacles) {
      add(a, 2);
      add(b, 2);
    }
    for (const d of this.dots) {
      add(d.p, 6);
      if (d.label) add([d.p[0] + 8 + textWidth(d.label) + 2, d.p[1] + 22]);
    }
    for (const p of this.extra) add(p);
    for (const l of this.labels) {
      add([l.box.x0, l.box.y0]);
      add([l.box.x1, l.box.y1]);
      add(l.anchor, 6);
    }
    const M = 6;
    const minX = Math.min(...xs) - M;
    const maxX = Math.max(...xs) + M;
    const minY = Math.min(...ys) - M;
    const maxY = Math.max(...ys) + M;
    const w = maxX - minX;
    const W = crop && !this.labels.length ? Math.ceil(w) : CANVAS;
    if (w > W) return null;
    const H = Math.ceil(maxY - minY);
    const ox = minX - (W - w) / 2;
    const T = (p: P): P => [r2(p[0] - ox), r2(p[1] - minY)];
    const points: PlanePoint[] = [
      ...this.dots.map((d) => {
        const [x, y] = T(d.p);
        return { x, y, color: d.color, ...(d.label ? { label: d.label } : {}) };
      }),
      ...this.labels.map((l) => {
        const [x, y] = T(l.anchor);
        return { x, y, label: l.text, color: 'muted' as const, open: true };
      }),
    ];
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax: W, yMin: 0, yMax: H, step: Math.max(W, H) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(T), color: p.color, ...(p.fill ? { fill: true } : {}) })),
      caption,
    };
    if (this.segs.length) fig.segments = this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) }));
    if (points.length) fig.points = points;
    return fig;
  }
}

/** Pixels per shape unit. Shapes reach 3.1 units from their centre, so they are about 200 px across. */
const S = 32;

function render(make: (scale: number) => Canvas, caption: string, crop = false): PlaneFigure {
  for (const s of [1, 0.9, 0.8, 0.7, 0.6]) {
    const f = make(s).build(caption, crop);
    if (f) return f;
  }
  return make(0.5).build(caption, crop)!;
}

interface DashedLine {
  /** Direction in degrees. */
  dir: number;
  /** Sideways shift from the centre, in shape units (0 = through the centre). */
  shift?: number;
}

/**
 * The shape filled in, with optional dashed lines. Every figure of one shape has the same size.
 * `choice` crops the figure to the drawing, for small answer-choice pictures.
 */
function shapeFigure(sh: Shape, lines: DashedLine[] = [], caption = `A ${sh.name}`, choice = false): PlaneFigure {
  const sym = symmetryOf(sh);
  const c = sym.centre;
  const R = Math.max(...vertices(sh).map((p) => Math.hypot(p[0] - c[0], p[1] - c[1])));
  return render((k) => {
    const s = S * k;
    const px = (p: P): P => [p[0] * s, p[1] * s];
    const cv = new Canvas();
    for (const pl of sh.polys) cv.poly(pl.pts.map(px), pl.color ?? 'brand');
    for (const l of lines) {
      const u: P = [Math.cos(rad(l.dir)), Math.sin(rad(l.dir))];
      const nrm: P = [-u[1], u[0]];
      const sh0 = l.shift ?? 0;
      const half = Math.sqrt(Math.max((R + 0.5) ** 2 - sh0 * sh0, 1));
      const base: P = [c[0] + nrm[0] * sh0, c[1] + nrm[1] * sh0];
      cv.seg(px([base[0] - u[0] * half, base[1] - u[1] * half]), px([base[0] + u[0] * half, base[1] + u[1] * half]), { color: 'accent', dashed: true });
    }
    // The same box for every figure of this shape, whatever lines are drawn.
    if (lines.length) for (const a of [0, 90, 180, 270]) cv.include(px([c[0] + (R + 0.6) * Math.cos(rad(a)), c[1] + (R + 0.6) * Math.sin(rad(a))]));
    // Answer-choice pictures share one square box, so no shape looks bigger than the others.
    if (choice) for (const q of [-3.4, 3.4]) cv.include(px([q, q]));
    return cv;
  }, caption, choice);
}
const choiceFigure = (sh: Shape, lines: DashedLine[] = []) => shapeFigure(sh, lines, lines.length ? `A ${sh.name} with a dashed line` : `A ${sh.name}`, true);

/** The shape with its vertices lettered A, B, C ... and its centre marked O. */
function labelledFigure(sh: Shape, caption: string): PlaneFigure {
  const c = symmetryOf(sh).centre;
  const pts = sh.polys[0].pts;
  return render((k) => {
    const s = S * k;
    const px = (p: P): P => [p[0] * s, p[1] * s];
    const cv = new Canvas();
    cv.poly(pts.map(px));
    cv.dot(px(c), 'accent', 'O');
    pts.forEach((p, i) => cv.labelNear(px(p), (Math.atan2(p[1] - c[1], p[0] - c[0]) * 180) / Math.PI, LETTERS[i]));
    return cv;
  }, caption);
}

const dirName = (a: number) => (Math.abs(a - 90) < 1e-6 ? 'vertical' : Math.abs(a) < 1e-6 ? 'horizontal' : 'slanted');

function axesText(name: string, axes: number[]): string {
  if (!axes.length) return `There is no fold line that makes the two halves of the ${name} match. It has no lines of symmetry.`;
  const v = axes.filter((a) => dirName(a) === 'vertical').length;
  const h = axes.filter((a) => dirName(a) === 'horizontal').length;
  const sl = axes.length - v - h;
  const bits = [v ? '1 vertical line' : '', h ? '1 horizontal line' : '', sl ? `${sl} slanted ${plural(sl, 'line', 'lines')}` : ''].filter(Boolean);
  const list = bits.length === 1 ? bits[0] : `${bits.slice(0, -1).join(', ')} and ${bits[bits.length - 1]}`;
  return `The ${name} folds onto itself along ${list}. Both halves match each time.`;
}

function orderText(name: string, order: number): string {
  if (order === 1) return `The ${name} fits on itself only after a full turn. It has no rotation symmetry, so its order of rotation symmetry is $1$.`;
  return `The ${name} fits on itself after every turn of $${360 / order}^\\circ$: that is $${order}$ times in one full turn, counting the full turn.`;
}

const LINE_HINTS = [
  'A **line of symmetry** is a fold line. When you fold along it, the two halves match exactly.',
  'Try a vertical fold, a horizontal fold and the slanted folds. Count every fold that works.',
];
const ORDER_HINTS = [
  'Imagine tracing the shape, then turning the tracing around its centre.',
  'Count how many times the tracing fits exactly on the shape during one full turn. The full turn counts too.',
];

function shapeContext(rng: Rng, sh: Shape, who: string): string {
  if (sh.name.startsWith('letter')) {
    return rng.pick([
      `${who} cut the ${sh.name} out of cardboard for a bulletin board.`,
      `The ${sh.name} is painted on the school gym wall.`,
      `${who} made the ${sh.name} out of craft foam.`,
    ]);
  }
  return rng.pick([
    `${who} cut this ${sh.name} out of paper.`,
    `${who} drew this ${sh.name} in art class.`,
    `This ${sh.name} is a sticker on ${who}'s binder.`,
    `This ${sh.name} is on a poster in ${who}'s classroom.`,
  ]);
}

// ---------------------------------------------------------------------------
// 8.1 Line and rotation symmetry
// ---------------------------------------------------------------------------

function countLines(rng: Rng, key: string): Out {
  const sh = SHAPES[key];
  const { axes } = symOf(key);
  const who = rng.pick(NAMES);
  return {
    prompt: `${shapeContext(rng, sh, who)} How many lines of symmetry does it have?`,
    figure: shapeFigure(sh),
    parts: [intPart(axes.length, { suffix: plural(axes.length, 'line', 'lines') })],
    hints: LINE_HINTS,
    solution: [LINE_HINTS[0], axesText(sh.name, axes), `The ${sh.name} has ${linesWord(axes.length)}.`],
  };
}

function rotationOrder(rng: Rng, key: string): Out {
  const sh = SHAPES[key];
  const { order } = symOf(key);
  const who = rng.pick(NAMES);
  return {
    prompt: `${shapeContext(rng, sh, who)} What is its **order of rotation symmetry**?`,
    figure: shapeFigure(sh),
    parts: [intPart(order)],
    hints: ORDER_HINTS,
    solution: [
      'The order of rotation symmetry is the number of times a shape fits exactly on itself in one full turn around its centre.',
      orderText(sh.name, order),
      `The order of rotation symmetry is $${order}$.`,
    ],
  };
}

/** Which dashed line is a line of symmetry? Four pictures of the same shape. */
function whichLine(rng: Rng, keys: string[]): Out {
  for (let tries = 0; tries < 60; tries++) {
    const sh = SHAPES[rng.pick(keys)];
    const { axes, centre } = symmetryOf(sh);
    if (!axes.length) continue;
    const good = rng.pick(axes);
    const sep = (x: number, y: number) => {
      const d = Math.abs(x - y) % 180;
      return Math.min(d, 180 - d);
    };
    const vs = vertices(sh);
    const diag = vs.map((p) => (((Math.atan2(p[1] - centre[1], p[0] - centre[0]) * 180) / Math.PI) % 180 + 180) % 180);
    const cands = rng.shuffle([...diag, 0, 45, 90, 135, 30, 60, 120, 150]);
    const wrong: DashedLine[] = [];
    for (const w of cands) {
      if (axes.some((a) => sep(a, w) < 22)) continue;
      if ([good, ...wrong.map((x) => x.dir)].some((x) => sep(x, w) < 25)) continue;
      wrong.push({ dir: w });
      if (wrong.length === 2) break;
    }
    if (wrong.length < 2) continue;
    // A line parallel to a line of symmetry but off to one side.
    const par = rng.pick(axes);
    const shift = rng.pick([-1, 1]) * rng.pick([0.8, 1, 1.2]);
    const opts = rng.shuffle([
      { line: { dir: good } as DashedLine, correct: true },
      { line: wrong[0], correct: false },
      { line: wrong[1], correct: false },
      { line: { dir: par, shift } as DashedLine, correct: false },
    ]);
    const answer = mcFigures(rng, opts.map((o) => ({ md: '', figure: choiceFigure(sh, [o.line]), correct: o.correct })), true);
    const letter = choiceLetter(answer);
    const who = rng.pick(NAMES);
    return {
      prompt: `${who} drew a dashed line on each copy of the ${sh.name}. In which picture is the dashed line a **line of symmetry**?`,
      parts: [{ answer }],
      hints: [LINE_HINTS[0], 'Imagine folding each picture along the dashed line. Do the two halves land exactly on top of each other?'],
      solution: [
        `If you fold along the dashed line in picture ${letter}, the two halves of the ${sh.name} match exactly.`,
        'In the other pictures, one side of the fold has a part that sticks out past the other side, so the halves do not match. A line that is off to one side never works, because a line of symmetry passes through the middle of the shape.',
        `Picture ${letter} shows a line of symmetry.`,
      ],
      answerDisplay: `Picture ${letter}`,
    };
  }
  throw new Error('whichLine: no shape found');
}

const CENTRAL_YES = ['rectangle', 'parallelogram', 'letterS', 'letterN', 'letterZ', 'letterH', 'stepZ', 'hexSlant', 'rhombus', 'plus', 'pinwheel4', 'letterI', 'hexLong'];
const CENTRAL_NO = ['isosceles', 'equilateral', 'kite', 'house', 'arrow', 'letterT', 'letterE', 'letterL', 'pentagon', 'star5', 'pinwheel3', 'trapezoid', 'tShape', 'scalene', 'rightTri'];

/** Which shape has central symmetry (looks the same after a half turn)? */
function whichCentral(rng: Rng): Out {
  const yes = rng.pick(CENTRAL_YES);
  const nos = rng.sample(CENTRAL_NO, 3);
  const opts = rng.shuffle([{ key: yes, correct: true }, ...nos.map((key) => ({ key, correct: false }))]);
  const answer = mcFigures(rng, opts.map((o) => ({ md: '', figure: choiceFigure(SHAPES[o.key]), correct: o.correct })), true);
  const letter = choiceLetter(answer);
  const sh = SHAPES[yes];
  return {
    prompt: 'A shape has **central symmetry** when it looks exactly the same after a half turn ($180^\\circ$) around its centre. Which shape has central symmetry?',
    parts: [{ answer }],
    hints: ['Imagine turning each shape upside down by spinning it around its centre.', 'A half turn moves the top to the bottom and the left to the right. Which shape still looks the same?'],
    solution: [
      ...opts.map((o, i) => {
        const s = SHAPES[o.key];
        return o.correct
          ? `Picture ${LETTERS[i]}: after a half turn, the ${s.name} fits exactly on itself.`
          : `Picture ${LETTERS[i]}: after a half turn, the ${s.name} points a different way, so it does not fit on itself.`;
      }),
      `Picture ${letter} (the ${sh.name}) has central symmetry.`,
    ],
    answerDisplay: `Picture ${letter}`,
  };
}

const HALF_TURN = ['parallelogram', 'rectangle', 'rhombus', 'hexagon', 'hexLong', 'hexSlant', 'octagon', 'square'];

/** After a half turn about O, which vertex lands where vertex X was? */
function halfTurnVertex(rng: Rng): Out {
  const key = rng.pick(HALF_TURN);
  const sh = SHAPES[key];
  const n = sh.polys[0].pts.length;
  const start = rng.int(0, n - 1);
  const target = (start + n / 2) % n;
  const others = [(start + 1) % n, (start + n - 1) % n, (start + 2) % n, (start + n - 2) % n].filter((i) => i !== start && i !== target);
  const pool = [...new Set([target, ...rng.sample([...new Set(others)], Math.min(3, new Set(others).size))])].sort((a, b) => a - b);
  const who = rng.pick(NAMES);
  const s = LETTERS[start];
  const t = LETTERS[target];
  return {
    prompt: `${who} traced this ${sh.name} and turned the tracing a half turn ($180^\\circ$) around its centre, point $O$. The shape fits exactly on itself. Which vertex of the tracing lands where vertex $${s}$ was?`,
    figure: labelledFigure(sh, `A ${sh.name} with vertices ${LETTERS.slice(0, n).split('').join(', ')} and centre O`),
    parts: [{ answer: fixedChoice(pool.map((i) => `Vertex $${LETTERS[i]}$`), pool.indexOf(target)) }],
    hints: [
      'In a half turn, every point moves along a straight line through the centre $O$.',
      `Start at vertex $${s}$, draw a straight line through $O$ and keep going the same distance on the other side.`,
    ],
    solution: [
      'A half turn is central symmetry. Each point moves along a straight line through the centre and ends the same distance from the centre, on the other side.',
      `The straight line from vertex $${s}$ through $O$ reaches vertex $${t}$ on the opposite side.`,
      `So vertex $${t}$ lands where vertex $${s}$ was (and $${s}$ lands where $${t}$ was).`,
      `The answer is vertex $${t}$.`,
    ],
    answerDisplay: `Vertex $${t}$`,
  };
}

const D3_DESIGNS = ['pinQuilt', 'halfTile', 'diamondQuilt', 'star8', 'flower6', 'flower5', 'star5', 'star4', 'pinwheel4', 'pinwheel3', 'letterS', 'letterH', 'stepZ', 'plus', 'arrow', 'stripeFlag', 'cornerFlag', 'letterN', 'hexSlant'];

function designContext(rng: Rng, sh: Shape, who: string): string {
  switch (sh.key) {
    case 'pinQuilt':
    case 'diamondQuilt':
      return `${who}'s class is sewing a paper quilt. This is one ${sh.name}.`;
    case 'halfTile':
      return `${who} is designing a floor with this ${sh.name}.`;
    case 'star8':
      return `Many star blankets have a large eight-pointed star in the centre. ${who} drew this eight-pointed star.`;
    case 'flower6':
    case 'flower5':
      return `${who} drew this ${sh.name} with ${sh.polys.length} petals.`;
    case 'star5':
      return `A sea star (starfish) has 5 arms. ${who} drew this ${sh.name}.`;
    case 'stripeFlag':
    case 'cornerFlag':
      return `${who} designed this flag for a sports team.`;
    default:
      return `${who} is making this ${sh.name} for a school display.`;
  }
}

function linesAndOrder(rng: Rng, key: string): Out {
  const sh = SHAPES[key];
  const { axes, order } = symOf(key);
  const who = rng.pick(NAMES);
  return {
    prompt: `${designContext(rng, sh, who)} Look at the whole design, colours included. How many lines of symmetry does it have, and what is its order of rotation symmetry?`,
    figure: shapeFigure(sh),
    parts: [intPart(axes.length, { label: 'Lines of symmetry:' }), intPart(order, { label: 'Order of rotation symmetry:' })],
    hints: [
      'A fold line or a turn must make **every** part match, including the coloured parts.',
      'First check the fold lines (vertical, horizontal, slanted). Then turn the design around its centre and count how many times it fits on itself in one full turn.',
    ],
    solution: [
      axesText('design', axes),
      orderText('design', order),
      `The design has ${linesWord(axes.length)} and an order of rotation symmetry of $${order}$.`,
    ],
  };
}

const LINE_EASY = ['square', 'rectangle', 'equilateral', 'isosceles', 'kite', 'house', 'arrow', 'scalene', 'trapezoid', 'letterH', 'letterT', 'letterE', 'letterL', 'rhombus'];
const LINE_HARD = ['parallelogram', 'lShape', 'plus', 'pentagon', 'hexagon', 'octagon', 'rightTri', 'rightTrap', 'stepZ', 'letterN', 'letterS', 'letterZ', 'letterI', 'hexLong', 'hexSlant', 'tShape'];
const ROT_KEYS = ['square', 'rectangle', 'equilateral', 'isosceles', 'kite', 'parallelogram', 'rhombus', 'letterH', 'letterS', 'letterN', 'letterZ', 'plus', 'house', 'arrow', 'pinwheel4', 'pinwheel3', 'star5', 'hexagon', 'star6', 'stepZ', 'letterT', 'pentagon'];
const WHICH_EASY = ['rectangle', 'isosceles', 'kite', 'house', 'arrow', 'trapezoid', 'letterT', 'letterE', 'rhombus'];
const WHICH_HARD = ['lShape', 'tShape', 'letterH', 'letterI', 'hexLong', 'rectangle', 'rhombus', 'letterE'];

const symmetry = skill({
  id: 'm5-symmetry',
  name: 'Line and rotation symmetry',
  description: 'Find the lines of symmetry of a 2-D shape and describe its order of rotation symmetry, including central symmetry (a half turn).',
  outcomes: ['G1'],
  lessonId: 'm5-8-1',
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.55) ? countLines(rng, rng.pick(LINE_EASY)) : whichLine(rng, WHICH_EASY);
    if (d === 2) {
      const r = rng.next();
      if (r < 0.4) return rotationOrder(rng, rng.pick(ROT_KEYS));
      if (r < 0.7) return countLines(rng, rng.pick(LINE_HARD));
      return whichCentral(rng);
    }
    const r = rng.next();
    if (r < 0.5) return linesAndOrder(rng, rng.pick(D3_DESIGNS));
    if (r < 0.8) return halfTurnVertex(rng);
    return whichLine(rng, WHICH_HARD);
  },
});

// ---------------------------------------------------------------------------
// 8.2 Symmetry of polygons
// ---------------------------------------------------------------------------

const REGULAR: Array<{ n: number; name: string; key?: string }> = [
  { n: 3, name: 'equilateral triangle', key: 'equilateral' },
  { n: 4, name: 'square', key: 'square' },
  { n: 5, name: 'regular pentagon', key: 'pentagon' },
  { n: 6, name: 'regular hexagon', key: 'hexagon' },
  { n: 8, name: 'regular octagon', key: 'octagon' },
];

const POLY_NAMES: Record<number, string> = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon' };

const REGULAR_RULE = 'In a regular polygon, all the sides are equal and all the angles are equal. The number of lines of symmetry and the order of rotation symmetry both equal the number of sides.';

function regularPicture(rng: Rng): Out {
  const rp = rng.pick(REGULAR);
  const sh = SHAPES[rp.key!];
  const askLines = rng.chance(0.5);
  const who = rng.pick(NAMES);
  const intro =
    rp.n === 3
      ? `${who} cut out this equilateral triangle. It is a regular polygon: all 3 sides are equal and all 3 angles are equal.`
      : rp.n === 4
        ? `${who} cut out this square. It is a regular polygon: all 4 sides are equal and all 4 angles are equal.`
        : `${who} cut out this shape. It is a ${rp.name}: all ${rp.n} sides are equal and all ${rp.n} angles are equal.`;
  return {
    prompt: `${intro} ${askLines ? 'How many lines of symmetry does it have?' : 'What is its order of rotation symmetry?'}`,
    figure: shapeFigure(sh),
    parts: [intPart(rp.n, askLines ? { suffix: plural(rp.n, 'line', 'lines') } : {})],
    hints: ['Count the sides of the shape.', REGULAR_RULE],
    solution: [
      `The ${rp.name} has $${rp.n}$ equal sides and $${rp.n}$ equal angles, so it is a regular polygon.`,
      askLines
        ? `Each line of symmetry goes through the centre and a vertex or the middle of a side. There are $${rp.n}$ of them.`
        : `It fits on itself after every turn of $${360 / rp.n}^\\circ$: $${rp.n}$ times in one full turn.`,
      askLines ? `The ${rp.name} has ${linesWord(rp.n)}.` : `Its order of rotation symmetry is $${rp.n}$.`,
    ],
  };
}

function circleQuestion(rng: Rng): Out {
  const v = rng.int(0, 2);
  if (v === 2) {
    const answer = mc(rng, 'a circle', ['a square', 'a regular octagon', 'a regular hexagon']);
    return {
      prompt: 'Which shape has **infinitely many** lines of symmetry?',
      parts: [{ answer }],
      hints: ['Think about folding each shape through its centre. For which shape does **every** fold through the centre work?', 'A regular polygon has as many lines of symmetry as it has sides.'],
      solution: [
        'A square has $4$ lines of symmetry, a regular hexagon has $6$ and a regular octagon has $8$.',
        'Every straight line through the centre of a circle is a line of symmetry, so a circle has infinitely many.',
        'The answer is a circle.',
      ],
    };
  }
  const lines = v === 0;
  const ctx = rng.pick(['a round pizza', 'a round clock face', 'a round coaster', 'a round drum top', 'a dreamcatcher hoop', 'a round mirror']);
  const answer = mc(rng, 'infinitely many (more than you could ever count)', ['$1$', '$4$', '$360$']);
  return {
    prompt: lines
      ? `The edge of ${ctx} is a circle. How many lines of symmetry does a circle have?`
      : `The edge of ${ctx} is a circle. How many times does a circle fit exactly on itself during one full turn around its centre?`,
    parts: [{ answer }],
    hints: lines
      ? ['Try folding a paper circle through its centre in different directions.', 'Does every fold through the centre work?']
      : ['Turn a circle a tiny bit around its centre. Does it still look the same?', 'Does it fit on itself after **any** turn, no matter how small?'],
    solution: lines
      ? ['Any straight line through the centre of a circle cuts it into two matching halves.', 'There is no end to the number of lines you can draw through the centre.', 'A circle has infinitely many lines of symmetry.']
      : ['A circle looks exactly the same after any turn around its centre, even a very small one.', 'So it fits on itself infinitely many times in one full turn.', 'A circle has infinitely many rotation symmetries.'],
  };
}

function regularReverse(rng: Rng): Out {
  const n = rng.pick([3, 4, 5, 6, 7, 8, 9, 10, 12]);
  const v = rng.int(0, 2);
  const given = v === 0 ? `has $${n}$ lines of symmetry` : v === 1 ? `has an order of rotation symmetry of $${n}$` : `has $${n}$ sides`;
  const ask = v === 0 ? 'How many sides does it have?' : v === 1 ? 'How many lines of symmetry does it have?' : 'What is its order of rotation symmetry?';
  const ctx = rng.pick(['A regular polygon', 'A tile in the shape of a regular polygon', 'A garden bed in the shape of a regular polygon', 'A sign in the shape of a regular polygon']);
  const name = POLY_NAMES[n];
  return {
    prompt: `${ctx} ${given}. ${ask}`,
    parts: [intPart(n, v === 1 ? { suffix: plural(n, 'line', 'lines') } : v === 0 ? { suffix: 'sides' } : {})],
    hints: ['In a regular polygon, all sides are equal and all angles are equal.', REGULAR_RULE],
    solution: [
      REGULAR_RULE,
      `This regular polygon ${given.replace(/^has /, 'has ')}, so it has $${n}$ sides, $${n}$ lines of symmetry and an order of rotation symmetry of $${n}$. It is a regular ${name}.`,
      v === 0 ? `It has $${n}$ sides.` : v === 1 ? `It has ${linesWord(n)}.` : `Its order of rotation symmetry is $${n}$.`,
    ],
  };
}

const NOT_REGULAR = [
  { key: 'rectangle', sides: 4, why: 'Its 4 angles are equal, but its sides are not all equal.' },
  { key: 'rhombus', sides: 4, why: 'Its 4 sides are equal, but its angles are not all equal.' },
  { key: 'kite', sides: 4, why: 'It has two pairs of equal sides next to each other, but not 4 equal sides.' },
  { key: 'trapezoid', sides: 4, why: 'Only its two slanted sides are equal.' },
  { key: 'isosceles', sides: 3, why: 'Only 2 of its 3 sides are equal.' },
  { key: 'parallelogram', sides: 4, why: 'Its opposite sides are equal, but its sides and angles are not all equal.' },
  { key: 'hexLong', sides: 6, why: 'Its 6 sides are not all equal.' },
  { key: 'house', sides: 5, why: 'Its 5 sides are not all equal.' },
];

function notRegular(rng: Rng): Out {
  const it = rng.pick(NOT_REGULAR);
  const sh = SHAPES[it.key];
  const { axes, order } = symOf(it.key);
  const askLines = rng.chance(0.6);
  const ans = askLines ? axes.length : order;
  return {
    prompt: `This ${sh.name} has ${it.sides} sides, but it is **not** a regular polygon. ${it.why} ${askLines ? 'How many lines of symmetry does it have?' : 'What is its order of rotation symmetry?'}`,
    figure: shapeFigure(sh),
    parts: [intPart(ans, askLines ? { suffix: plural(ans, 'line', 'lines') } : {})],
    hints: [
      'Only a regular polygon is sure to have as many symmetries as sides. Check this shape fold by fold (or turn by turn).',
      askLines ? LINE_HINTS[1] : ORDER_HINTS[1],
    ],
    solution: [
      `The ${sh.name} is not regular, so it can have fewer symmetries than sides.`,
      askLines ? axesText(sh.name, axes) : orderText(sh.name, order),
      askLines ? `The ${sh.name} has ${linesWord(ans)}, fewer than its ${it.sides} sides.` : `Its order of rotation symmetry is $${ans}$, less than its ${it.sides} sides.`,
    ],
  };
}

function triangleKind(rng: Rng): Out {
  const k = rng.pick([0, 1, 3]);
  const opts = ['All 3 sides are equal.', 'Exactly 2 sides are equal.', 'No two sides are equal.'];
  const idx = k === 3 ? 0 : k === 1 ? 1 : 2;
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} cut a paper triangle that has exactly ${k === 0 ? '**no** lines' : `**${k}** ${plural(k, 'line', 'lines')}`} of symmetry. What must be true about its sides?`,
    parts: [{ answer: fixedChoice(opts, idx) }],
    hints: ['A fold line that makes the halves match also matches up equal sides.', 'An equilateral triangle has 3 lines of symmetry, an isosceles triangle has 1, and a scalene triangle has none.'],
    solution: [
      'An equilateral triangle (3 equal sides) has $3$ lines of symmetry.',
      'An isosceles triangle with exactly 2 equal sides has $1$ line of symmetry, through the vertex between the equal sides.',
      'A scalene triangle (no equal sides) has no lines of symmetry.',
      `So a triangle with ${linesWord(k)}: ${opts[idx].charAt(0).toLowerCase()}${opts[idx].slice(1)}`,
    ],
    answerDisplay: opts[idx],
  };
}

const CLASSIFY_POOL = ['square', 'rectangle', 'equilateral', 'isosceles', 'scalene', 'rhombus', 'parallelogram', 'kite', 'trapezoid', 'rightTrap', 'pentagon', 'hexagon', 'house', 'arrow', 'letterH', 'letterS', 'letterT', 'plus', 'star5', 'pinwheel4', 'stepZ', 'letterE', 'lShape'];

/** Which shape has exactly k lines of symmetry? */
function whichCount(rng: Rng): Out {
  for (let tries = 0; tries < 60; tries++) {
    const keys = rng.shuffle(CLASSIFY_POOL);
    const chosen: string[] = [];
    for (const k of keys) {
      if (chosen.some((c) => symOf(c).axes.length === symOf(k).axes.length)) continue;
      chosen.push(k);
      if (chosen.length === 4) break;
    }
    if (chosen.length < 4) continue;
    const target = rng.pick(chosen);
    const n = symOf(target).axes.length;
    const answer = mcFigures(rng, chosen.map((k) => ({ md: '', figure: choiceFigure(SHAPES[k]), correct: k === target })), true);
    const letter = choiceLetter(answer);
    return {
      prompt: `${rng.pick(NAMES)} is sorting shapes by their lines of symmetry. Which shape has exactly ${linesWord(n).replace(/\$/g, '')}?`.replace(/exactly (\d+)/, 'exactly **$1**'),
      parts: [{ answer }],
      hints: LINE_HINTS,
      solution: [
        ...chosen.map((k, i) => `Picture ${LETTERS[i]}: the ${SHAPES[k].name} has ${linesWord(symOf(k).axes.length)}.`),
        `Picture ${letter} has exactly ${linesWord(n)}.`,
      ],
      answerDisplay: `Picture ${letter}`,
    };
  }
  throw new Error('whichCount');
}

type Cat = 'both' | 'linesOnly' | 'rotOnly' | 'neither';
const catOf = (k: string): Cat => {
  const s = symOf(k);
  return s.axes.length > 0 ? (s.order > 1 ? 'both' : 'linesOnly') : s.order > 1 ? 'rotOnly' : 'neither';
};
const CAT_TEXT: Record<Cat, string> = {
  both: 'has **both** line symmetry and rotation symmetry',
  linesOnly: 'has line symmetry but **no** rotation symmetry',
  rotOnly: 'has rotation symmetry but **no** lines of symmetry',
  neither: 'has **no** line symmetry and **no** rotation symmetry',
};
const CAT_POOL = [...CLASSIFY_POOL, 'pinwheel3', 'letterN', 'letterZ', 'hexSlant', 'rightTri', 'halfTile', 'pinQuilt', 'tShape', 'letterL'];

function symText(k: string): string {
  const s = symOf(k);
  return `${linesWord(s.axes.length)} and an order of rotation symmetry of $${s.order}$`;
}

/** Classify: pick the shape in a given category (one shape from each category). */
function whichCategory(rng: Rng): Out {
  const cats: Cat[] = ['both', 'linesOnly', 'rotOnly', 'neither'];
  const target = rng.pick(cats);
  const chosen = cats.map((c) => rng.pick(CAT_POOL.filter((k) => catOf(k) === c)));
  const order = rng.shuffle(chosen);
  const answer = mcFigures(rng, order.map((k) => ({ md: '', figure: choiceFigure(SHAPES[k]), correct: catOf(k) === target })), true);
  const letter = choiceLetter(answer);
  return {
    prompt: `Which shape ${CAT_TEXT[target]}?`,
    parts: [{ answer }],
    hints: ['For each shape, ask two questions: Is there a fold line that works? Does it fit on itself after a turn of less than a full turn?', 'A shape whose order of rotation symmetry is $1$ has no rotation symmetry.'],
    solution: [
      ...order.map((k, i) => `Picture ${LETTERS[i]}: the ${SHAPES[k].name} has ${symText(k)}.`),
      `Picture ${letter} ${CAT_TEXT[target].replace(/\*\*/g, '')}.`,
    ],
    answerDisplay: `Picture ${letter}`,
  };
}

const MULTI_POOL = ['square', 'rectangle', 'equilateral', 'isosceles', 'scalene', 'rhombus', 'parallelogram', 'kite', 'trapezoid', 'pentagon', 'hexagon', 'house', 'letterS', 'letterH', 'plus', 'pinwheel4', 'letterT', 'arrow'];

/** Select every shape with both line and rotation symmetry (or with rotation symmetry, or with central symmetry). */
function selectAll(rng: Rng): Out {
  const mode = rng.pick(['both', 'rotation', 'central'] as const);
  const test = (k: string) => {
    const s = symOf(k);
    return mode === 'both' ? s.axes.length > 0 && s.order > 1 : mode === 'rotation' ? s.order > 1 : s.order % 2 === 0;
  };
  for (let tries = 0; tries < 60; tries++) {
    const keys = rng.sample(MULTI_POOL, 5);
    const nGood = keys.filter(test).length;
    if (nGood < 1 || nGood > 3) continue;
    const choices: Choice[] = keys.map((k, i) => ({ id: 'abcde'[i], md: '', figure: choiceFigure(SHAPES[k]) }));
    const answer: AnswerSpec = { kind: 'multi', choices, correct: choices.filter((_, i) => test(keys[i])).map((c) => c.id), layout: 'grid' };
    const letters = keys.map((k, i) => (test(k) ? LETTERS[i] : '')).filter(Boolean);
    const what = mode === 'both' ? 'has **both** line symmetry and rotation symmetry' : mode === 'rotation' ? 'has rotation symmetry (an order of $2$ or more)' : 'has central symmetry (it looks the same after a half turn)';
    return {
      prompt: `Select **every** shape that ${what}.`,
      parts: [{ answer }],
      hints: [
        'Check each shape on its own. Count its lines of symmetry and find its order of rotation symmetry.',
        mode === 'central' ? 'A shape has central symmetry when its order of rotation symmetry is $2$, $4$, $6$, $8$ or any even number.' : 'A shape whose order of rotation symmetry is $1$ has no rotation symmetry.',
      ],
      solution: [
        ...keys.map((k, i) => `Shape ${LETTERS[i]}: the ${SHAPES[k].name} has ${symText(k)}${test(k) ? ', so it belongs.' : ', so it does not belong.'}`),
        `The shapes are ${letters.length === 1 ? letters[0] : `${letters.slice(0, -1).join(', ')} and ${letters[letters.length - 1]}`}.`,
      ],
      answerDisplay: letters.join(', '),
    };
  }
  throw new Error('selectAll');
}

const REG_CONTEXTS: Array<{ n: number; text: string }> = [
  { n: 8, text: 'A stop sign is shaped like a regular octagon.' },
  { n: 6, text: 'Each cell of a honeycomb is shaped like a regular hexagon.' },
  { n: 6, text: 'The head of a bolt is shaped like a regular hexagon.' },
  { n: 3, text: 'A yield sign is shaped like an equilateral triangle.' },
  { n: 5, text: 'A patch on a soccer ball is shaped like a regular pentagon.' },
  { n: 4, text: 'A floor tile is shaped like a square.' },
  { n: 9, text: 'A garden gazebo has a floor shaped like a regular polygon with 9 sides.' },
  { n: 5, text: 'A table top is shaped like a regular pentagon.' },
];

function regularTurn(rng: Rng): Out {
  const c = rng.pick(REG_CONTEXTS);
  const turn = 360 / c.n;
  return {
    prompt: `${c.text} How many lines of symmetry does it have? What is the **smallest** turn, in degrees, that makes it fit exactly on itself?`,
    parts: [intPart(c.n, { label: 'Lines of symmetry:' }), intPart(turn, { label: 'Smallest turn:', suffix: '°' })],
    hints: [REGULAR_RULE, `A full turn is $360^\\circ$. The shape fits on itself ${c.n} times in a full turn, so share the full turn equally.`],
    solution: [
      `The shape is a regular polygon with $${c.n}$ sides, so it has ${linesWord(c.n)} and an order of rotation symmetry of $${c.n}$.`,
      `It fits on itself $${c.n}$ times in a full turn of $360^\\circ$, so each turn is $360^\\circ \\div ${c.n} = ${turn}^\\circ$.`,
      `It has ${linesWord(c.n)}, and the smallest turn is $${turn}^\\circ$.`,
    ],
  };
}

const symmetryPolygons = skill({
  id: 'm5-symmetry-polygons',
  name: 'Symmetry of polygons',
  description: 'Relate the reflection and rotation symmetries of a regular polygon to its equal sides and angles, know that a circle has infinitely many, and classify shapes by their symmetries.',
  outcomes: ['G1'],
  lessonId: 'm5-8-2',
  format: 'mc',
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.65) ? regularPicture(rng) : circleQuestion(rng);
    if (d === 2) {
      const r = rng.next();
      if (r < 0.25) return regularReverse(rng);
      if (r < 0.5) return notRegular(rng);
      if (r < 0.7) return triangleKind(rng);
      return whichCount(rng);
    }
    const r = rng.next();
    if (r < 0.4) return whichCategory(rng);
    if (r < 0.7) return selectAll(rng);
    return regularTurn(rng);
  },
});

export const SYMMETRY_SKILLS: SkillDef[] = [symmetry, symmetryPolygons];

/** For tests and lesson figures. */
export const _symmetryInternals = { SHAPES, symOf, shapeFigure, labelledFigure };
