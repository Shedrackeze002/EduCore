/** Math 10-4 Unit 8 — Shapes, Symmetry and Transformations (SS3, SS4). */
import { fixedChoice, mc, mcFigures, numPart, part, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Difficulty, Figure, GridSpec, PlaneFigure, PlanePoint, PlaneSegment, SkillDef, SolidShape } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];

const deg = (x: number) => `${fmt(x)}^\\circ`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const an = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const LETTERS = 'ABCDEFGH';

// ---------------------------------------------------------------------------
// Drawing: a canvas sketch whose labels are placed clear of every line
// (same approach as the Math 10-3 angle figures).
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const dirOf = (a: P, b: P) => norm360((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
const r3 = (x: number) => Math.round(x * 1000) / 1000;

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
  const dx = Math.max(b.x0 - p[0], 0, p[0] - b.x1);
  const dy = Math.max(b.y0 - p[1], 0, p[1] - b.y1);
  return Math.hypot(dx, dy);
}

function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ps = [-dx, dx, -dy, dy];
  const qs = [a[0] - box.x0, box.x1 - a[0], a[1] - box.y0, box.y1 - a[1]];
  for (let i = 0; i < 4; i++) {
    const p = ps[i];
    const q = qs[i];
    if (p === 0) {
      if (q < 0) return false;
    } else {
      const r = q / p;
      if (p < 0) {
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
  const corners: P[] = [
    [box.x0, box.y0],
    [box.x0, box.y1],
    [box.x1, box.y0],
    [box.x1, box.y1],
  ];
  return Math.min(...corners.map((c) => distPtSeg(c, a, b)), distPtBox(a, box), distPtBox(b, box));
}

function distBoxBox(p: Box, q: Box): number {
  const dx = Math.max(q.x0 - p.x1, p.x0 - q.x1, 0);
  const dy = Math.max(q.y0 - p.y1, p.y0 - q.y1, 0);
  return Math.hypot(dx, dy);
}

/** Approximate rendered width (px) of a 12px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === '°' || ch === '′' ? 5 : ch === ' ' ? 3.5 : ch === '(' || ch === ')' || ch === '.' || ch === ',' ? 4.5 : /[mMwW]/.test(ch) ? 10 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

/**
 * Collects lines, arcs and labels, then lays the figure out on a plane. Labels are drawn with invisible
 * anchor points (open + muted) and each label is placed where it stays clear of every drawn line.
 */
class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private dots: Array<{ p: P; color: Color }> = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];
  private extra: P[] = [];

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean; arrowEnd?: boolean; arrowStart?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
    return this;
  }

  ray(v: P, a: number, len: number, opts: { color?: Color; arrow?: boolean } = {}) {
    return this.seg(v, at(v, a, len), { color: opts.color, arrowEnd: opts.arrow ?? true });
  }

  /** Arc around v from direction a0 counterclockwise to a1. */
  arc(v: P, r: number, a0: number, a1: number, color: Color = 'accent') {
    const span = norm360(a1 - a0) || 360;
    const n = Math.max(6, Math.ceil(span / 8));
    const points: P[] = [];
    for (let i = 0; i <= n; i++) points.push(at(v, a0 + (span * i) / n, r));
    this.polys.push({ points, color });
    for (let i = 0; i < n; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  /** Square right-angle mark between directions a0 and a0 + 90. */
  rightMark(v: P, a0: number, s = 0.45) {
    const p1 = at(v, a0, s);
    const p2 = at(p1, a0 + 90, s);
    const p3 = at(v, a0 + 90, s);
    this.polys.push({ points: [p1, p2, p3], color: 'accent' });
    this.obstacles.push([p1, p2], [p2, p3]);
    return this;
  }

  polyline(points: P[], color: Color = 'brand') {
    this.polys.push({ points, color });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  dot(p: P, color: Color = 'brand') {
    this.dots.push({ p, color });
    return this;
  }

  include(p: P) {
    this.extra.push(p);
    return this;
  }

  /** Label inside the angle region from direction a0 counterclockwise to a1, near vertex v. */
  angleLabel(v: P, a0: number, a1: number, text: string, minPx = 18) {
    const span = norm360(a1 - a0) || 360;
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const rpx of [minPx, minPx + 6, minPx + 12, minPx + 19, minPx + 27, minPx + 36, minPx + 48])
          for (const t of [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.18, 0.82]) out.push(at(v, a0 + t * span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label for a point, placed just beyond it in direction a (or nearby). */
  endLabel(p: P, a: number, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [13, 16, 20, 25, 31, 38])
          for (const off of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) out.push(at(p, a + off, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label beside the side ab, on the side away from the point `inside`. */
  sideLabel(a: P, b: P, text: string, inside: P) {
    const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const d = dirOf(a, b);
    const n1 = d + 90;
    const toIn = dirOf(m, inside);
    const out = Math.cos(rad(n1 - toIn)) > 0 ? d - 90 : n1;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    this.pending.push({
      text,
      cands: (ppu) => {
        const res: P[] = [];
        // Sideways labels need extra room for half their width.
        const extra = Math.abs(Math.cos(rad(out))) * (textWidth(text) / 2);
        for (const dpx of [11, 14, 18, 23, 29, 36])
          for (const t of [0, 0.12, -0.12, 0.24, -0.24, 0.34, -0.34]) res.push(at(at(m, d, t * len), out, (dpx + extra) / ppu));
        return res;
      },
    });
    return this;
  }

  /** Text centred exactly at c. */
  textAt(c: P, text: string) {
    this.pending.push({ text, cands: () => [c], fixed: true });
    return this;
  }

  /** Text centred near c, nudged if a line is in the way. */
  textNear(c: P, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [c];
        for (const dpx of [4, 8, 12, 16, 22]) for (let a = 0; a < 360; a += 45) out.push(at(c, a, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  private place(bounds: Box, ppu: number, fixedBoxes: Box[]): PlanePoint[] {
    const placed: Box[] = [...fixedBoxes];
    const anchors: PlanePoint[] = [];
    for (const lab of this.pending) {
      const wpx = textWidth(lab.text);
      let best: { c: P; score: number } | null = null;
      for (const c of lab.cands(ppu)) {
        const hw = (wpx / 2 + 1.5) / ppu;
        const hh = 6.5 / ppu;
        const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const A: P = [c[0] - (8 + wpx / 2) / ppu, c[1] - 12.3 / ppu];
        let score: number;
        if (lab.fixed) score = 100;
        else if (box.x0 < bounds.x0 || box.x1 > bounds.x1 || box.y0 < bounds.y0 || box.y1 > bounds.y1) score = -1000;
        else {
          let tc = Infinity;
          let ac = Infinity;
          for (const [a, b] of this.obstacles) {
            tc = Math.min(tc, distSegBox(a, b, box));
            ac = Math.min(ac, distPtSeg(A, a, b) - 5.5 / ppu);
          }
          for (const pb of placed) {
            tc = Math.min(tc, distBoxBox(pb, box) - 2 / ppu);
            ac = Math.min(ac, distPtBox(A, pb) - 5.5 / ppu);
          }
          for (const d of this.dots) {
            tc = Math.min(tc, distPtBox(d.p, box) - 6 / ppu);
            ac = Math.min(ac, Math.hypot(A[0] - d.p[0], A[1] - d.p[1]) - 11 / ppu);
          }
          score = Math.min(tc, ac) * ppu;
        }
        if (!best || score > best.score) best = { c, score };
        if (score >= 5) break;
      }
      const c = best!.c;
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }
    return anchors;
  }

  private output(T: (p: P) => P, grid: GridSpec, anchors: PlanePoint[], extra: Partial<PlaneFigure>): PlaneFigure {
    return {
      type: 'plane',
      grid,
      ...extra,
      segments: this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) })),
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}) })),
      points: [
        ...this.dots.map((d) => {
          const [x, y] = T(d.p);
          return { x, y, color: d.color } as PlanePoint;
        }),
        ...anchors.map((a) => {
          const [x, y] = T([a.x, a.y]);
          return { ...a, x, y };
        }),
      ],
    };
  }

  /** A plain canvas (no axes, no grid lines) sized to fit the drawing. */
  build(opts: { margin?: number; caption?: string } = {}): PlaneFigure {
    const m = opts.margin ?? 0.9;
    const pts: P[] = [
      ...this.segs.flatMap((s) => [s.from, s.to] as P[]),
      ...this.polys.flatMap((p) => p.points),
      ...this.dots.map((d) => d.p),
      ...this.extra,
    ];
    let minX = Math.min(...pts.map((p) => p[0])) - m;
    let maxX = Math.max(...pts.map((p) => p[0])) + m;
    let minY = Math.min(...pts.map((p) => p[1])) - m;
    let maxY = Math.max(...pts.map((p) => p[1])) + m;
    let w = maxX - minX;
    let h = maxY - minY;
    if (w < h) {
      minX -= (h - w) / 2;
      maxX += (h - w) / 2;
      w = h;
    }
    if (w > 2.2 * h) {
      minY -= (w / 2.2 - h) / 2;
      maxY += (w / 2.2 - h) / 2;
      h = w / 2.2;
    }
    const xr = Math.ceil(w - 1e-9);
    const yr = Math.ceil(h - 1e-9);
    const ox = minX - (xr - w) / 2;
    const oy = minY - (yr - h) / 2;
    const ppu = 340 / xr;
    const anchors = this.place({ x0: ox, x1: ox + xr, y0: oy, y1: oy + yr }, ppu, []);
    const T = (p: P): P => [r3(p[0] - ox), r3(p[1] - oy)];
    return this.output(T, { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step: Math.max(xr, yr) }, anchors, {
      hideTickLabels: true,
      ...(opts.caption ? { caption: opts.caption } : {}),
    });
  }

  /** A coordinate grid with numbered axes; coordinates are used as given. */
  buildGrid(grid: GridSpec, caption?: string): PlaneFigure {
    const xr = grid.xMax - grid.xMin;
    const ppu = 340 / xr;
    const ticks: Box[] = [];
    const axisX = grid.yMin <= 0 && grid.yMax >= 0 ? 0 : grid.yMin;
    const axisY = grid.xMin <= 0 && grid.xMax >= 0 ? 0 : grid.xMin;
    for (let t = grid.xMin; t <= grid.xMax; t++) {
      const w = String(t).length * 6.5;
      ticks.push({ x0: t - w / 2 / ppu, x1: t + w / 2 / ppu, y0: axisX - 17 / ppu, y1: axisX - 3 / ppu });
    }
    for (let t = grid.yMin; t <= grid.yMax; t++) {
      const w = String(t).length * 6.5;
      ticks.push({ x0: axisY - (8 + w) / ppu, x1: axisY - 2 / ppu, y0: t - 6 / ppu, y1: t + 6 / ppu });
    }
    const anchors = this.place({ x0: grid.xMin, x1: grid.xMax, y0: grid.yMin, y1: grid.yMax }, ppu, ticks);
    return this.output((p) => [r3(p[0]), r3(p[1])], grid, anchors, caption ? { caption } : {});
  }
}

/** Interior angle at vertex i of a polygon, as [from, to] directions measured counterclockwise. */
function interior(pts: P[], i: number): [number, number] {
  const n = pts.length;
  const v = pts[i];
  const dn = dirOf(v, pts[(i + 1) % n]);
  const dp = dirOf(v, pts[(i + n - 1) % n]);
  let area = 0;
  for (let k = 0; k < n; k++) {
    const [x1, y1] = pts[k];
    const [x2, y2] = pts[(k + 1) % n];
    area += x1 * y2 - x2 * y1;
  }
  return area > 0 ? [dn, dp] : [dp, dn];
}

function centroid(pts: P[]): P {
  return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

/** Mirror (optional), rotate by `rot` degrees and scale so the larger dimension is `size`. */
function place(pts: P[], rot = 0, mirror = false, size = 6): P[] {
  let q = pts.map(([x, y]) => [mirror ? -x : x, y] as P);
  const c = rad(rot);
  q = q.map(([x, y]) => [x * Math.cos(c) - y * Math.sin(c), x * Math.sin(c) + y * Math.cos(c)] as P);
  const w = Math.max(...q.map((p) => p[0])) - Math.min(...q.map((p) => p[0]));
  const h = Math.max(...q.map((p) => p[1])) - Math.min(...q.map((p) => p[1]));
  const k = size / Math.max(w, h);
  return q.map(([x, y]) => [x * k, y * k] as P);
}

/** A polygon with optional side labels, right-angle marks and angle labels (by vertex index). */
function polygonFigure(pts: P[], o: { sides?: Array<string | null>; right?: number[]; angles?: Array<string | null> } = {}): PlaneFigure {
  const s = new Sketch();
  s.polyline([...pts, pts[0]]);
  const c = centroid(pts);
  pts.forEach((v, i) => {
    const [a0, a1] = interior(pts, i);
    if (o.right?.includes(i)) s.rightMark(v, a0, 0.42);
    else if (o.angles?.[i]) s.arc(v, 0.55, a0, a1);
  });
  pts.forEach((v, i) => {
    const [a0, a1] = interior(pts, i);
    const lab = o.angles?.[i];
    if (lab) s.angleLabel(v, a0, a1, lab, o.right?.includes(i) ? 26 : 22);
  });
  pts.forEach((v, i) => {
    const lab = o.sides?.[i];
    if (lab) s.sideLabel(v, pts[(i + 1) % pts.length], lab, c);
  });
  return s.build({ margin: o.sides?.some(Boolean) ? 1.2 : 0.8 });
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — Angles
// ---------------------------------------------------------------------------

type AngleType = 'acute' | 'right' | 'obtuse' | 'straight' | 'reflex';
const TYPES: AngleType[] = ['acute', 'right', 'obtuse', 'straight', 'reflex'];

function typeOf(a: number): AngleType {
  if (a < 90) return 'acute';
  if (a === 90) return 'right';
  if (a < 180) return 'obtuse';
  if (a === 180) return 'straight';
  return 'reflex';
}

const RULE: Record<AngleType, string> = {
  acute: 'An **acute** angle is less than $90^\\circ$. It is narrower than a square corner.',
  right: 'A **right** angle is exactly $90^\\circ$. It makes a square corner.',
  obtuse: 'An **obtuse** angle is more than $90^\\circ$ but less than $180^\\circ$.',
  straight: 'A **straight** angle is exactly $180^\\circ$. Its two arms make a straight line.',
  reflex: 'A **reflex** angle is more than $180^\\circ$ but less than $360^\\circ$.',
};

const typeName = (t: AngleType) => `${cap(t)} angle`;

/** The correct type and its nearest neighbours (4 choices) in the usual order. */
function typeChoices(rng: Rng, correct: AngleType, allowed: AngleType[] = TYPES): AnswerSpec {
  const ci = TYPES.indexOf(correct);
  const others = allowed.filter((t) => t !== correct).sort((a, b) => Math.abs(TYPES.indexOf(a) - ci) - Math.abs(TYPES.indexOf(b) - ci));
  const picked = others.length <= 3 ? others : [...others.slice(0, 2), rng.pick(others.slice(2))];
  const chosen = [correct, ...picked].sort((a, b) => TYPES.indexOf(a) - TYPES.indexOf(b));
  return fixedChoice(chosen.map(typeName), chosen.indexOf(correct));
}

/** One angle at the origin between a ray in direction `base` and a ray in direction base + m (counterclockwise). */
function angleFigure(base: number, m: number): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  s.ray(V, base, 4).ray(V, base + m, 4);
  if (m === 90) s.rightMark(V, base, 0.55);
  else s.arc(V, m > 180 ? 0.7 : 0.9, base, base + m);
  s.dot(V);
  return s.build({ margin: 0.7 });
}

function anglePick(rng: Rng, t: AngleType, d: Difficulty): number {
  if (t === 'right') return 90;
  if (t === 'straight') return 180;
  if (d === 1) return t === 'acute' ? rng.int(4, 13) * 5 : t === 'obtuse' ? rng.int(23, 32) * 5 : rng.int(40, 64) * 5;
  return t === 'acute' ? rng.int(8, 85) : t === 'obtuse' ? rng.int(95, 175) : rng.int(190, 345);
}

const MEASURE_CTX: Array<{ text: (a: string, who: string) => string; types: AngleType[] }> = [
  { text: (a) => `An angle measures $${a}$.`, types: TYPES },
  { text: (a, who) => `${who} opens a laptop so the screen makes an angle of $${a}$ with the keyboard.`, types: ['acute', 'right', 'obtuse'] },
  { text: (a) => `A door at a coffee shop swings open through an angle of $${a}$.`, types: ['acute', 'right', 'obtuse', 'straight'] },
  { text: (a) => `A lawn sprinkler sprays water over an angle of $${a}$.`, types: TYPES },
  { text: (a) => `A security camera in a store turns through an angle of $${a}$.`, types: TYPES },
  { text: (a, who) => `${who} turns the steering wheel of a delivery van through an angle of $${a}$.`, types: TYPES },
  { text: (a) => `A slice of pizza has an angle of $${a}$ at its tip.`, types: ['acute', 'right'] },
  { text: (a) => `The two arms of a folding ruler are opened to an angle of $${a}$.`, types: ['acute', 'right', 'obtuse', 'straight'] },
];

const PICTURE_CTX: Array<{ text: (who: string) => string; types: AngleType[] }> = [
  { text: () => 'What type of angle is marked in the picture?', types: TYPES },
  { text: (who) => `${who} draws an angle for a woodworking plan. What type of angle is marked?`, types: TYPES },
  { text: () => 'The picture shows how far a gate is open. What type of angle is marked?', types: ['acute', 'right', 'obtuse', 'straight'] },
  { text: (who) => `${who} opens a pair of hedge clippers. The picture shows the angle between the blades. What type of angle is it?`, types: ['acute', 'right', 'obtuse'] },
  { text: () => 'The picture shows the angle between the hands of a clock. What type of angle is marked?', types: TYPES },
];

const STRAIGHT_CTX = [
  { text: (a: string) => `A gravel road leaves a straight highway at an angle of $${a}$.`, line: 'The highway is a straight line', lo: 30, hi: 75 },
  { text: (a: string) => `A ladder leans against a wall. It makes an angle of $${a}$ with the flat ground.`, line: 'The ground is a straight line', lo: 60, hi: 80 },
  { text: (a: string) => `A playground slide makes an angle of $${a}$ with the flat ground.`, line: 'The ground is a straight line', lo: 25, hi: 45 },
  { text: (a: string) => `A conveyor belt in a warehouse rises from the flat floor at an angle of $${a}$.`, line: 'The floor is a straight line', lo: 20, hi: 40 },
  { text: (a: string) => `After a windstorm, a sign post leans. It makes an angle of $${a}$ with the flat ground.`, line: 'The ground is a straight line', lo: 65, hi: 85 },
];

const RIGHT_CTX = [
  { text: (a: string) => `A gate frame has a square corner ($90^\\circ$). A brace starts at the corner and makes an angle of $${a}$ with one side of the frame.`, line: '', lo: 25, hi: 65 },
  { text: (a: string) => `A tile setter cuts a square tile. The cut starts at a square corner ($90^\\circ$) and makes an angle of $${a}$ with one edge.`, line: '', lo: 20, hi: 70 },
  { text: (a: string) => `Two hallways in a hotel meet at a right angle ($90^\\circ$). A third hallway leaves the same corner at an angle of $${a}$ to one of them.`, line: '', lo: 25, hi: 65 },
  { text: (a: string) => `A corner shelf fits into a square corner ($90^\\circ$) of a room. A support bar leaves the corner at an angle of $${a}$ to one wall.`, line: '', lo: 30, hi: 60 },
];

/** A straight line (or square corner) through V with one ray from V splitting it into two marked angles. */
function splitFigure(kind: 'straight' | 'right', theta: number, knownFirst: boolean, rot: number, mirror: boolean): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  const f = (a: number) => (mirror ? 180 - a : a) + rot;
  const total = kind === 'straight' ? 180 : 90;
  const a0 = f(0);
  const a1 = f(theta);
  const a2 = f(total);
  if (kind === 'straight') s.seg(at(V, a2, 4.2), at(V, a0, 4.2), { arrowEnd: true, arrowStart: true });
  else s.ray(V, a0, 4.2).ray(V, a2, 4.2);
  s.ray(V, a1, 3.6, { color: 'brand' });
  s.dot(V);
  // Arcs and labels go counterclockwise, so order the two regions by direction.
  const regions: Array<[number, number, string]> = mirror
    ? [
        [a1, a0, knownFirst ? `${theta}°` : '?'],
        [a2, a1, knownFirst ? '?' : `${total - theta}°`],
      ]
    : [
        [a0, a1, knownFirst ? `${theta}°` : '?'],
        [a1, a2, knownFirst ? '?' : `${total - theta}°`],
      ];
  regions.forEach(([b0, b1, lab], i) => {
    s.arc(V, i === 0 ? 0.8 : 0.95, b0, b1, lab === '?' ? 'muted' : 'accent');
    s.angleLabel(V, b0, b1, lab, 34);
  });
  return s.build({ margin: 0.5 });
}

const classifyAngle = skill({
  id: 'm104-classify-angle',
  name: 'Classifying angles',
  description: 'Name an angle as acute, right, obtuse, straight or reflex from a picture or a measure, and find the missing part of a right or straight angle.',
  outcomes: ['SS3'],
  lessonId: 'm104-8-1',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const hints = [
      'Compare the angle with a square corner ($90^\\circ$) and with a straight line ($180^\\circ$).',
      'Acute: less than $90^\\circ$. Right: exactly $90^\\circ$. Obtuse: between $90^\\circ$ and $180^\\circ$. Straight: exactly $180^\\circ$. Reflex: more than $180^\\circ$.',
    ];
    const describe = (t: AngleType) =>
      t === 'right'
        ? 'The small square at the corner shows a square corner.'
        : t === 'straight'
          ? 'The two arms point in opposite directions. Together they make a straight line.'
          : t === 'reflex'
            ? 'The arc goes the long way around, outside the two arms. The opening is more than a straight line.'
            : t === 'acute'
              ? 'The opening is narrower than a square corner.'
              : 'The opening is wider than a square corner, but it is not a straight line.';
    if (d === 1) {
      const basic: AngleType[] = ['acute', 'right', 'obtuse', 'straight'];
      if (rng.chance(0.35)) {
        const t = rng.pick(basic);
        const opts = basic.map((x) => ({ md: '', figure: angleFigure(rng.int(0, 11) * 30, anglePick(rng, x, 1)) as Figure, correct: x === t }));
        const answer = mcFigures(rng, opts);
        const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
        return {
          prompt: `Which picture shows ${an(t)} **${t}** angle?`,
          parts: [{ answer }],
          hints,
          solution: [RULE[t], `Look for the opening that fits this rule. ${describe(t)}`, `Picture ${letter} shows ${an(t)} ${t} angle.`],
          answerDisplay: `Picture ${letter}`,
        };
      }
      const t = rng.weighted<AngleType>([
        ['acute', 3],
        ['right', 2],
        ['obtuse', 3],
        ['straight', 1],
      ]);
      const m = anglePick(rng, t, 1);
      const ctx = rng.pick(PICTURE_CTX.filter((c) => c.types.includes(t)));
      return {
        prompt: ctx.text(who),
        figure: angleFigure(rng.int(0, 23) * 15, m),
        parts: [{ answer: fixedChoice(basic.map(typeName), basic.indexOf(t)) }],
        hints,
        solution: [describe(t), RULE[t], `The marked angle is ${an(t)} **${t}** angle.`],
        answerDisplay: typeName(t),
      };
    }
    if (d === 2) {
      if (rng.chance(0.35)) {
        const t = rng.weighted<AngleType>([
          ['acute', 2],
          ['obtuse', 2],
          ['reflex', 3],
          ['straight', 1],
        ]);
        const m = anglePick(rng, t, 1);
        return {
          prompt: 'What type of angle is marked by the arc in the picture?',
          figure: angleFigure(rng.int(0, 23) * 15, m),
          parts: [{ answer: typeChoices(rng, t) }],
          hints: ['Look at the side where the arc is drawn. That is the angle being asked about.', hints[1]],
          solution: [describe(t), RULE[t], `The marked angle is ${an(t)} **${t}** angle.`],
          answerDisplay: typeName(t),
        };
      }
      const t = rng.weighted<AngleType>([
        ['acute', 3],
        ['right', 1],
        ['obtuse', 3],
        ['straight', 1],
        ['reflex', 2],
      ]);
      let a = anglePick(rng, t, 2);
      if ((t === 'acute' || t === 'obtuse' || t === 'reflex') && rng.chance(0.4)) {
        a = rng.pick(t === 'acute' ? [85, 88, 89] : t === 'obtuse' ? [91, 92, 95, 175, 178, 179] : [181, 182, 185]);
      }
      const ctx = rng.pick(MEASURE_CTX.filter((c) => c.types.includes(t)));
      const near = t === 'right' || t === 'straight' ? null : Math.abs(a - 90) <= 5 ? 90 : Math.abs(a - 180) <= 5 ? 180 : null;
      return {
        prompt: `${ctx.text(deg(a), who)} What type of angle is this?`,
        parts: [{ answer: typeChoices(rng, t) }],
        hints: [hints[1], 'An angle is right or straight only when it is **exactly** $90^\\circ$ or $180^\\circ$.'],
        solution: [
          ...(near ? [`$${deg(a)}$ is ${a < near ? 'a little less' : 'a little more'} than $${deg(near)}$, so it is not ${near === 90 ? 'a right' : 'a straight'} angle.`] : []),
          RULE[t],
          `So $${deg(a)}$ is ${an(t)} **${t}** angle.`,
        ],
        answerDisplay: typeName(t),
      };
    }
    // d3: the missing part of a straight angle or a right angle.
    const kind = rng.chance(0.55) ? 'straight' : 'right';
    const ctx = rng.pick(kind === 'straight' ? STRAIGHT_CTX : RIGHT_CTX);
    const known = rng.int(ctx.lo, ctx.hi);
    const total = kind === 'straight' ? 180 : 90;
    const missing = total - known;
    const knownFirst = rng.chance(0.5);
    const theta = knownFirst ? known : missing;
    const t = typeOf(missing);
    return {
      prompt: `${ctx.text(deg(known))} ${kind === 'straight' ? `${ctx.line}, so the two angles together make $180^\\circ$.` : 'The two angles together make the square corner.'} Find the angle marked **?** and name its type.`,
      figure: splitFigure(kind, theta, knownFirst, kind === 'right' ? rng.int(0, 3) * 90 : rng.pick([0, 0, 0, 180]), rng.chance(0.5)),
      parts: [
        part({ kind: 'numeric', value: missing }, { label: 'Angle **?** $=$', suffix: '°' }),
        part(fixedChoice(['Acute angle', 'Right angle', 'Obtuse angle', 'Straight angle'], ['acute', 'right', 'obtuse', 'straight'].indexOf(t)), { label: 'Type' }),
      ],
      hints: [
        kind === 'straight' ? 'Angles that together make a straight line add to $180^\\circ$.' : 'Angles that together make a square corner add to $90^\\circ$.',
        `Subtract the angle you know from $${deg(total)}$. Then compare your answer with $90^\\circ$.`,
      ],
      solution: [
        kind === 'straight' ? 'The two angles make a straight line, so they add to $180^\\circ$.' : 'The two angles make a square corner, so they add to $90^\\circ$.',
        `$${total} - ${known} = ${missing}$`,
        RULE[t],
        `The angle marked ? is $${deg(missing)}$. It is ${an(t)} **${t}** angle.`,
      ],
      answerDisplay: `$${deg(missing)}$, ${an(t)} ${t} angle`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.1 — Triangles and quadrilaterals
// ---------------------------------------------------------------------------

type SideType = 'equilateral' | 'isosceles' | 'scalene';
type AngType = 'acute' | 'right' | 'obtuse';
type Quad = 'square' | 'rectangle' | 'rhombus' | 'parallelogram' | 'trapezoid';

const SIDE_RULE: Record<SideType, string> = {
  equilateral: 'An **equilateral** triangle has 3 equal sides.',
  isosceles: 'An **isosceles** triangle has exactly 2 equal sides.',
  scalene: 'A **scalene** triangle has no equal sides.',
};
const ANG_RULE: Record<AngType, string> = {
  acute: 'An **acute** triangle has 3 acute angles (all less than $90^\\circ$).',
  right: 'A **right** triangle has one right angle ($90^\\circ$).',
  obtuse: 'An **obtuse** triangle has one obtuse angle (more than $90^\\circ$).',
};
const QUAD_RULE: Record<Quad, string> = {
  square: 'A **square** has 4 equal sides and 4 right angles.',
  rectangle: 'A **rectangle** has 4 right angles, and its opposite sides are equal.',
  rhombus: 'A **rhombus** has 4 equal sides. Its opposite sides are parallel.',
  parallelogram: 'A **parallelogram** has 2 pairs of parallel sides. Its opposite sides are equal.',
  trapezoid: 'A **trapezoid** has exactly 1 pair of parallel sides.',
};
const QUAD_WRONG: Record<Quad, Quad[]> = {
  square: ['rectangle', 'rhombus', 'trapezoid'],
  rectangle: ['square', 'parallelogram', 'trapezoid'],
  rhombus: ['square', 'parallelogram', 'trapezoid'],
  parallelogram: ['rectangle', 'rhombus', 'trapezoid'],
  trapezoid: ['parallelogram', 'rectangle', 'rhombus'],
};
const QUADS: Quad[] = ['square', 'rectangle', 'rhombus', 'parallelogram', 'trapezoid'];

/** Triangle with sides a = P0P1, b = P1P2, c = P2P0. */
function triFromSides(a: number, b: number, c: number): P[] {
  const x = (a * a + c * c - b * b) / (2 * a);
  return [
    [0, 0],
    [a, 0],
    [x, Math.sqrt(Math.max(0, c * c - x * x))],
  ];
}

/** Triangle with angles A at P0 and B at P1 on a unit base. */
function triFromAngles(A: number, B: number): P[] {
  const C = 180 - A - B;
  const c0 = Math.sin(rad(B)) / Math.sin(rad(C)); // side P0P2
  return [
    [0, 0],
    [1, 0],
    [c0 * Math.cos(rad(A)), c0 * Math.sin(rad(A))],
  ];
}

/** Vertices of a quadrilateral of the given kind, plus its labelled sides and right angles. */
function quadShape(rng: Rng, q: Quad, unit: string, k: number): { pts: P[]; sides: string[]; right: number[]; text: string } {
  const L = (x: number) => `${fmt(x)} ${unit}`;
  if (q === 'square') {
    const s = rng.int(3, 9) * k;
    return { pts: [[0, 0], [s, 0], [s, s], [0, s]], sides: [L(s), L(s), L(s), L(s)], right: [0, 1, 2, 3], text: `4 sides of ${L(s)} and 4 square corners` };
  }
  if (q === 'rectangle') {
    const w = rng.int(2, 5);
    const l = w + rng.int(2, 4);
    return { pts: [[0, 0], [l * k, 0], [l * k, w * k], [0, w * k]], sides: [L(l * k), L(w * k), L(l * k), L(w * k)], right: [0, 1, 2, 3], text: `sides of ${L(l * k)}, ${L(w * k)}, ${L(l * k)} and ${L(w * k)}, and 4 square corners` };
  }
  if (q === 'rhombus' || q === 'parallelogram') {
    const a = rng.int(4, 8);
    const b = q === 'rhombus' ? a : a + rng.pick([-2, 2, 3]);
    const ang = rng.int(11, 14) * 5;
    const dx = b * Math.cos(rad(ang));
    const dy = b * Math.sin(rad(ang));
    return {
      pts: [[0, 0], [a, 0], [a + dx, dy], [dx, dy]],
      sides: [L(a * k), L(b * k), L(a * k), L(b * k)],
      right: [],
      text: q === 'rhombus' ? `4 sides of ${L(a * k)}, and angles of $${ang}^\\circ$, $${180 - ang}^\\circ$, $${ang}^\\circ$ and $${180 - ang}^\\circ$` : `sides of ${L(a * k)}, ${L(b * k)}, ${L(a * k)} and ${L(b * k)}, and angles of $${ang}^\\circ$, $${180 - ang}^\\circ$, $${ang}^\\circ$ and $${180 - ang}^\\circ$`,
    };
  }
  // Trapezoid: isosceles (legs 5 from a 3-4-5 triangle) or right (legs 4 and 5).
  const top = rng.int(3, 7);
  if (rng.chance(0.5)) {
    const bot = top + 6;
    return { pts: [[0, 0], [bot, 0], [bot - 3, 4], [3, 4]], sides: [L(bot * k), L(5 * k), L(top * k), L(5 * k)], right: [], text: `only one pair of parallel sides: a bottom of ${L(bot * k)} and a top of ${L(top * k)}` };
  }
  const bot = top + 3;
  return { pts: [[0, 0], [bot, 0], [top, 4], [0, 4]], sides: [L(bot * k), L(5 * k), L(top * k), L(4 * k)], right: [0, 3], text: `only one pair of parallel sides: a bottom of ${L(bot * k)} and a top of ${L(top * k)}` };
}

/** Side lengths for a triangle of the given side type (kept clearly unequal when they should be). */
function triSides(rng: Rng, t: SideType): [number, number, number] {
  if (t === 'equilateral') {
    const s = rng.int(3, 12);
    return [s, s, s];
  }
  if (t === 'isosceles') {
    for (;;) {
      const e = rng.int(4, 12);
      const b = rng.int(3, 2 * e - 2);
      if (Math.abs(b - e) < 2) continue;
      const order = rng.int(0, 2);
      return order === 0 ? [b, e, e] : order === 1 ? [e, b, e] : [e, e, b];
    }
  }
  for (;;) {
    const a = rng.int(3, 12);
    const b = rng.int(3, 12);
    const c = rng.int(3, 12);
    const s = [a, b, c].sort((x, y) => x - y);
    if (s[1] - s[0] < 2 || s[2] - s[1] < 2) continue;
    if (s[0] + s[1] <= s[2] + 1) continue;
    return [a, b, c];
  }
}

/** Angles (A at P0, B at P1, C) for a triangle of the given angle type; whole numbers, clear of 90 unless right. */
function triAngles(rng: Rng, t: AngType): [number, number, number] {
  for (;;) {
    let A: number;
    let B: number;
    if (t === 'right') {
      A = 90;
      B = rng.int(4, 14) * 5;
    } else if (t === 'obtuse') {
      A = rng.int(21, 30) * 5;
      B = rng.int(3, Math.floor((175 - A) / 5)) * 5;
    } else {
      A = rng.int(9, 16) * 5;
      B = rng.int(9, 16) * 5;
    }
    const C = 180 - A - B;
    if (C < 15) continue;
    if (t === 'acute' && (C >= 85 || A >= 85 || B >= 85)) continue;
    const arr: [number, number, number] = [A, B, C];
    return rng.shuffle(arr) as [number, number, number];
  }
}

function sideTypeOf(s: number[]): SideType {
  const [a, b, c] = s;
  if (a === b && b === c) return 'equilateral';
  if (a === b || b === c || a === c) return 'isosceles';
  return 'scalene';
}

const SHAPE_CTX_TRI = [
  { name: 'a triangular flag', unit: 'cm', k: 10 },
  { name: 'a corner shelf', unit: 'cm', k: 5 },
  { name: 'a roof truss', unit: 'm', k: 1 },
  { name: 'a garden bed', unit: 'm', k: 1 },
  { name: 'a sail', unit: 'm', k: 1 },
  { name: 'a warning sign', unit: 'cm', k: 10 },
  { name: 'a piece of plywood', unit: 'cm', k: 10 },
];
const SHAPE_CTX_QUAD = [
  { name: 'A floor tile', unit: 'cm', k: 5 },
  { name: 'A window', unit: 'cm', k: 10 },
  { name: 'A garden bed', unit: 'm', k: 1 },
  { name: 'A sign', unit: 'cm', k: 10 },
  { name: 'A table top', unit: 'cm', k: 10 },
  { name: 'A piece of fabric', unit: 'cm', k: 10 },
  { name: 'A patio stone', unit: 'cm', k: 5 },
  { name: 'A parking lot', unit: 'm', k: 5 },
];

const classifyShape = skill({
  id: 'm104-classify-shape',
  name: 'Naming triangles and quadrilaterals',
  description: 'Name triangles by their sides and angles, and name quadrilaterals (square, rectangle, rhombus, parallelogram, trapezoid) from a picture or a description.',
  outcomes: ['SS3'],
  lessonId: 'm104-8-1',
  format: 'mc',
  gen(rng, d) {
    const sideNames: SideType[] = ['equilateral', 'isosceles', 'scalene'];
    const angNames: AngType[] = ['acute', 'right', 'obtuse'];
    const triBySides = (picture: boolean) => {
      const t = rng.pick(sideNames);
      const ctx = rng.pick(SHAPE_CTX_TRI);
      const unit = ctx.unit;
      const sides = triSides(rng, t).map((x) => x * ctx.k) as [number, number, number];
      const lab = sides.map((x) => `${x} ${unit}`);
      const listed = `$${sides[0]}\\ \\text{${unit}}$, $${sides[1]}\\ \\text{${unit}}$ and $${sides[2]}\\ \\text{${unit}}$`;
      return {
        prompt: picture ? `The picture shows ${ctx.name}. Name the triangle by its sides.` : `${cap(ctx.name)} is a triangle with sides of ${listed}. Name the triangle by its sides.`,
        ...(picture ? { figure: polygonFigure(place(triFromSides(...sides), rng.pick([0, 0, 0, 90, 180, 270, 30, -30]), rng.chance(0.5)), { sides: lab }) } : {}),
        parts: [{ answer: fixedChoice(sideNames.map((x) => `${cap(x)} triangle`), sideNames.indexOf(t)) }],
        hints: ['Compare the three side lengths. How many of them are equal?', 'Equilateral: 3 equal sides. Isosceles: 2 equal sides. Scalene: no equal sides.'],
        solution: [`The sides are ${listed}.`, t === 'equilateral' ? 'All 3 sides are equal.' : t === 'isosceles' ? 'Exactly 2 sides are equal.' : 'No two sides are equal.', SIDE_RULE[t], `It is ${an(t)} **${t}** triangle.`],
        answerDisplay: `${cap(t)} triangle`,
      };
    };
    const triByAngles = (picture: boolean) => {
      const t = rng.pick(angNames);
      const angs = triAngles(rng, t);
      const ctx = rng.pick(SHAPE_CTX_TRI);
      const listed = `$${deg(angs[0])}$, $${deg(angs[1])}$ and $${deg(angs[2])}$`;
      const big = Math.max(...angs);
      const pts = triFromAngles(angs[0], angs[1]);
      return {
        prompt: picture ? `The picture shows ${ctx.name}. Name the triangle by its angles.` : `${cap(ctx.name)} is a triangle with angles of ${listed}. Name the triangle by its angles.`,
        ...(picture
          ? {
              figure: polygonFigure(place(pts, rng.pick([0, 0, 0, 90, 180, 270]), rng.chance(0.5)), {
                angles: angs.map((x) => `${x}°`),
                right: angs.map((x, i) => (x === 90 ? i : -1)).filter((i) => i >= 0),
              }),
            }
          : {}),
        parts: [{ answer: fixedChoice(angNames.map((x) => `${cap(x)} triangle`), angNames.indexOf(t)) }],
        hints: ['Find the largest angle. Is it less than, equal to, or more than $90^\\circ$?', 'Acute: all angles less than $90^\\circ$. Right: one angle is $90^\\circ$. Obtuse: one angle is more than $90^\\circ$.'],
        solution: [`The angles are ${listed}. The largest angle is $${deg(big)}$.`, t === 'right' ? 'One angle is exactly $90^\\circ$.' : t === 'obtuse' ? `$${deg(big)}$ is more than $90^\\circ$.` : 'All three angles are less than $90^\\circ$.', ANG_RULE[t], `It is ${an(t)} **${t}** triangle.`],
        answerDisplay: `${cap(t)} triangle`,
      };
    };
    const quad = (picture: boolean) => {
      const q = rng.pick(QUADS);
      const ctx = rng.pick(SHAPE_CTX_QUAD);
      const sh = quadShape(rng, q, ctx.unit, ctx.k);
      const names = [q, ...QUAD_WRONG[q]];
      return {
        prompt: picture
          ? `${ctx.name} has the shape shown. Small squares mark the right angles. What is the **most exact** name for the shape?`
          : `${ctx.name} has ${sh.text}. What is the **most exact** name for its shape?`,
        ...(picture ? { figure: polygonFigure(place(sh.pts, rng.pick([0, 0, 90, 180, 270]), rng.chance(0.5)), { sides: sh.sides, right: sh.right }) } : {}),
        parts: [{ answer: mc(rng, cap(q), names.slice(1).map(cap)) }],
        hints: [
          'Check the sides first: are all 4 sides equal? Then check the corners: are they square corners ($90^\\circ$)?',
          'Square: 4 equal sides and 4 right angles. Rectangle: 4 right angles. Rhombus: 4 equal sides, no right angles. Parallelogram: 2 pairs of parallel sides. Trapezoid: only 1 pair of parallel sides.',
        ],
        solution: [
          q === 'trapezoid'
            ? 'Only one pair of sides is parallel.'
            : `${q === 'square' || q === 'rhombus' ? 'All 4 sides are equal.' : 'Opposite sides are equal, but not all 4 sides are equal.'} ${q === 'square' || q === 'rectangle' ? 'All 4 corners are right angles.' : 'The corners are not right angles.'}`,
          QUAD_RULE[q],
          ...(q === 'square' ? ['A square is also a rectangle and a rhombus, but "square" tells the most.'] : []),
          `The most exact name is **${q}**.`,
        ],
        answerDisplay: cap(q),
      };
    };
    if (d === 1) return rng.chance(0.5) ? triBySides(true) : quad(true);
    if (d === 2) {
      const mode = rng.pick(['anglesPic', 'anglesText', 'sidesText', 'quadText', 'quadText'] as const);
      if (mode === 'anglesPic') return triByAngles(true);
      if (mode === 'anglesText') return triByAngles(false);
      if (mode === 'sidesText') return triBySides(false);
      return quad(false);
    }
    // d3
    if (rng.chance(0.45)) {
      // Find the third angle, then name the triangle by its angles.
      const t = rng.pick(angNames);
      const angs = triAngles(rng, t);
      const [A, B, C] = angs;
      const ctx = rng.pick(SHAPE_CTX_TRI);
      return {
        prompt: `Two angles of ${ctx.name} are $${deg(A)}$ and $${deg(B)}$. The three angles of any triangle add to $180^\\circ$. Find the third angle. Then name the triangle by its angles.`,
        parts: [part({ kind: 'numeric', value: C }, { label: 'Third angle $=$', suffix: '°' }), part(fixedChoice(angNames.map((x) => `${cap(x)} triangle`), angNames.indexOf(t)), { label: 'Name' })],
        hints: ['Add the two angles you know, then subtract the total from $180^\\circ$.', 'Then look at the largest of the three angles and compare it with $90^\\circ$.'],
        solution: [`$${A} + ${B} = ${A + B}$`, `$180 - ${A + B} = ${C}$, so the third angle is $${deg(C)}$.`, `The angles are $${deg(A)}$, $${deg(B)}$ and $${deg(C)}$.`, ANG_RULE[t], `The third angle is $${deg(C)}$, and it is ${an(t)} **${t}** triangle.`],
        answerDisplay: `$${deg(C)}$; ${t} triangle`,
      };
    }
    // Name a triangle by its sides AND its angles from a picture with all measures.
    const combos: Array<[AngType, SideType]> = [
      ['right', 'isosceles'],
      ['right', 'scalene'],
      ['acute', 'isosceles'],
      ['acute', 'scalene'],
      ['obtuse', 'isosceles'],
      ['obtuse', 'scalene'],
    ];
    const [at3, st3] = rng.pick(combos);
    const tri = makeTriangle(rng, at3, st3);
    const ctx3 = rng.pick(SHAPE_CTX_TRI);
    const lab = tri.sides.map((x) => `${fmt(x * ctx3.k)} ${ctx3.unit}`);
    const name = (a: AngType, s: SideType) => `${cap(a)} ${s} triangle`;
    const otherA = rng.pick(angNames.filter((x) => x !== at3));
    const otherS: SideType = st3 === 'isosceles' ? 'scalene' : 'isosceles';
    const big = Math.max(...tri.angles);
    return {
      prompt: `The picture shows ${ctx3.name} with all its sides and angles measured. Name the triangle by its angles **and** by its sides.`,
      figure: polygonFigure(place(tri.pts, rng.pick([0, 0, 90, 180, 270]), rng.chance(0.5)), {
        sides: lab,
        angles: tri.angles.map((x) => `${x}°`),
        right: tri.angles.map((x, i) => (x === 90 ? i : -1)).filter((i) => i >= 0),
      }),
      parts: [{ answer: mc(rng, name(at3, st3), [name(at3, otherS), name(otherA, st3), name(otherA, otherS)]) }],
      hints: ['Use the angles for the first word: acute, right or obtuse.', 'Use the sides for the second word: isosceles (2 equal sides) or scalene (no equal sides).'],
      solution: [
        `Angles: the largest angle is $${deg(big)}$. ${ANG_RULE[at3]}`,
        `Sides: ${lab.join(', ')}. ${st3 === 'isosceles' ? 'Two sides are equal.' : 'No two sides are equal.'} ${SIDE_RULE[st3]}`,
        `It is ${an(at3)} **${at3} ${st3}** triangle.`,
      ],
      answerDisplay: name(at3, st3),
    };
  },
});

/** A triangle with the given angle and side types: side lengths (to 0.1) and whole-degree angles that add to 180. */
function makeTriangle(rng: Rng, at3: AngType, st3: SideType): { pts: P[]; sides: number[]; angles: number[] } {
  for (let tries = 0; tries < 500; tries++) {
    let a: number;
    let b: number;
    let c: number;
    if (at3 === 'right') {
      if (st3 === 'isosceles') {
        const l = rng.int(4, 9);
        [a, b, c] = [l, Math.round(l * Math.SQRT2 * 10) / 10, l];
      } else {
        const [x, y, z] = rng.pick([
          [3, 4, 5],
          [6, 8, 10],
          [5, 12, 13],
          [9, 12, 15],
          [8, 15, 17],
          [7, 24, 25],
        ]);
        [a, b, c] = [x, z, y];
      }
    } else if (st3 === 'isosceles') {
      const e = rng.int(5, 10);
      const apex = at3 === 'obtuse' ? rng.pick([110, 120, 130, 140]) : rng.pick([40, 50, 70, 80]);
      const base = Math.round(2 * e * Math.sin(rad(apex / 2)) * 10) / 10;
      [a, b, c] = [base, e, e];
    } else {
      a = rng.int(4, 12);
      b = rng.int(4, 12);
      c = rng.int(4, 12);
    }
    const s = [a, b, c];
    // Angles from the sides: at P0 between c and a, at P1 between a and b, at P2 between b and c.
    const angAt = (opp: number, x: number, y: number) => (Math.acos((x * x + y * y - opp * opp) / (2 * x * y)) * 180) / Math.PI;
    const raw = [angAt(b, a, c), angAt(c, a, b), angAt(a, b, c)];
    if (raw.some((x) => !Number.isFinite(x) || x < 15)) continue;
    let angles = raw.map((x) => Math.round(x));
    if (at3 === 'right') angles = raw.map((x) => (Math.abs(x - 90) < 0.5 ? 90 : Math.round(x)));
    const sum = angles.reduce((p, q) => p + q, 0);
    if (sum !== 180) {
      // Fix rounding on the angle farthest from a whole number that is not the right angle or an equal pair.
      const idx = [0, 1, 2].filter((i) => angles[i] !== 90).sort((i, j) => Math.abs(raw[j] - Math.round(raw[j])) - Math.abs(raw[i] - Math.round(raw[i])));
      if (st3 === 'isosceles' || !idx.length) continue;
      angles[idx[0]] += 180 - sum;
    }
    const big = Math.max(...angles);
    const actualA: AngType = big === 90 ? 'right' : big > 90 ? 'obtuse' : 'acute';
    if (actualA !== at3) continue;
    if (at3 !== 'right' && Math.abs(big - 90) < 6) continue;
    const st = sideTypeOf(s);
    if (st !== st3) continue;
    if (st3 === 'scalene') {
      const sorted = [...s].sort((x, y) => x - y);
      if (sorted[1] - sorted[0] < 1 || sorted[2] - sorted[1] < 1) continue;
      if (new Set(angles).size < 3) continue;
    }
    return { pts: triFromSides(a, b, c), sides: s, angles };
  }
  throw new Error(`triangle ${at3} ${st3}`);
}

// ---------------------------------------------------------------------------
// Lesson 8.2 — 3-D objects, nets and views
// ---------------------------------------------------------------------------

interface SolidInfo {
  shape: SolidShape;
  name: string;
  faces: number;
  edges: number;
  vertices: number;
  faceText: string;
  things: string[];
}

const SOLIDS: SolidInfo[] = [
  { shape: 'cube', name: 'cube', faces: 6, edges: 12, vertices: 8, faceText: '6 square faces', things: ['a toy block', 'an ice cube', 'a box for a coffee mug', 'a storage cube'] },
  { shape: 'rectPrism', name: 'rectangular prism', faces: 6, edges: 12, vertices: 8, faceText: '6 rectangle faces', things: ['a cereal box', 'a shipping box', 'a brick', 'a pizza box'] },
  { shape: 'triPrism', name: 'triangular prism', faces: 5, edges: 9, vertices: 6, faceText: '2 triangle faces and 3 rectangle faces', things: ['a camping tent', 'a doorstop wedge', 'a box for a chocolate bar', 'a roof section'] },
  { shape: 'squarePyramid', name: 'square pyramid', faces: 5, edges: 8, vertices: 5, faceText: '1 square base and 4 triangle faces', things: ['a gazebo roof', 'a glass paperweight', 'a tent with a square floor'] },
  { shape: 'rectPyramid', name: 'rectangular pyramid', faces: 5, edges: 8, vertices: 5, faceText: '1 rectangle base and 4 triangle faces', things: ['a shed roof', 'a decoration on a fence post'] },
];

/** The 11 nets of a cube as [column, row] cells. */
const CUBE_NETS: Array<Array<[number, number]>> = [
  [[0, 2], [0, 1], [1, 1], [2, 1], [3, 1], [0, 0]],
  [[0, 2], [0, 1], [1, 1], [2, 1], [3, 1], [1, 0]],
  [[0, 2], [0, 1], [1, 1], [2, 1], [3, 1], [2, 0]],
  [[0, 2], [0, 1], [1, 1], [2, 1], [3, 1], [3, 0]],
  [[1, 2], [0, 1], [1, 1], [2, 1], [3, 1], [1, 0]],
  [[1, 2], [0, 1], [1, 1], [2, 1], [3, 1], [2, 0]],
  [[0, 2], [1, 2], [1, 1], [2, 1], [3, 1], [1, 0]],
  [[0, 2], [1, 2], [1, 1], [2, 1], [3, 1], [2, 0]],
  [[0, 2], [1, 2], [1, 1], [2, 1], [3, 1], [3, 0]],
  [[0, 2], [1, 2], [1, 1], [2, 1], [2, 0], [3, 0]],
  [[0, 1], [1, 1], [2, 1], [2, 0], [3, 0], [4, 0]],
];

type Cells = Array<[number, number]>;

/** Roll a cube across the cells; a set of 6 squares is a cube net when every square lands on a different face. */
function foldsToCube(cells: Cells): boolean {
  const faces = new Array<number>(cells.length).fill(-1);
  const idx = (x: number, y: number) => cells.findIndex((c) => c[0] === x && c[1] === y);
  const visit = (i: number, st: { B: number; T: number; N: number; S: number; E: number; W: number }) => {
    faces[i] = st.B;
    const [x, y] = cells[i];
    const moves: Array<[number, number, typeof st]> = [
      [1, 0, { ...st, B: st.E, E: st.T, T: st.W, W: st.B }],
      [-1, 0, { ...st, B: st.W, W: st.T, T: st.E, E: st.B }],
      [0, 1, { ...st, B: st.N, N: st.T, T: st.S, S: st.B }],
      [0, -1, { ...st, B: st.S, S: st.T, T: st.N, N: st.B }],
    ];
    for (const [dx, dy, next] of moves) {
      const j = idx(x + dx, y + dy);
      if (j >= 0 && faces[j] < 0) visit(j, next);
    }
  };
  visit(0, { B: 0, T: 1, N: 2, S: 3, E: 4, W: 5 });
  return new Set(faces).size === 6 && !faces.includes(-1);
}

function normCells(cells: Cells): Cells {
  const mx = Math.min(...cells.map((c) => c[0]));
  const my = Math.min(...cells.map((c) => c[1]));
  return cells.map(([x, y]) => [x - mx, y - my] as [number, number]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/** All 8 rotations and reflections of a polyomino, normalised. */
function variants(cells: Cells): Cells[] {
  const out: Cells[] = [];
  let cur = cells;
  for (let r = 0; r < 4; r++) {
    cur = cur.map(([x, y]) => [-y, x] as [number, number]);
    out.push(normCells(cur), normCells(cur.map(([x, y]) => [-x, y] as [number, number])));
  }
  return out;
}

const cellsKey = (cells: Cells) => normCells(cells).map((c) => c.join(',')).join(';');
const shapeKey = (cells: Cells) => variants(cells).map(cellsKey).sort()[0];

/** All free hexominoes (35 shapes), split into cube nets and non-nets. */
const HEXOMINOES: { nets: Cells[]; nonNets: Cells[] } = (() => {
  let level = new Map<string, Cells>([['0,0', [[0, 0]]]]);
  for (let n = 1; n < 6; n++) {
    const next = new Map<string, Cells>();
    for (const cells of level.values()) {
      for (const [x, y] of cells) {
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          if (cells.some((c) => c[0] === x + dx && c[1] === y + dy)) continue;
          const grown = normCells([...cells, [x + dx, y + dy]]);
          const k = shapeKey(grown);
          if (!next.has(k)) next.set(k, grown);
        }
      }
    }
    level = next;
  }
  const nets: Cells[] = [];
  const nonNets: Cells[] = [];
  for (const cells of level.values()) (foldsToCube(cells) ? nets : nonNets).push(cells);
  return { nets, nonNets };
})();

function randomOrient(rng: Rng, cells: Cells): Cells {
  return rng.pick(variants(cells));
}

/** Unit squares drawn once each edge. */
function squaresFigure(cells: Cells, opts: { numbers?: string[]; include?: P[]; margin?: number; caption?: string; below?: string } = {}): PlaneFigure {
  const s = new Sketch();
  const edges = new Set<string>();
  const add = (a: P, b: P) => {
    const k = [a, b].map((p) => p.join(',')).sort().join('|');
    if (edges.has(k)) return;
    edges.add(k);
    s.seg(a, b);
  };
  for (const [x, y] of cells) {
    add([x, y], [x + 1, y]);
    add([x, y + 1], [x + 1, y + 1]);
    add([x, y], [x, y + 1]);
    add([x + 1, y], [x + 1, y + 1]);
  }
  cells.forEach(([x, y], i) => {
    if (opts.numbers?.[i]) s.textAt([x + 0.5, y + 0.5], opts.numbers[i]);
  });
  for (const p of opts.include ?? []) s.include(p);
  if (opts.below) {
    const maxX = Math.max(...cells.map((c) => c[0])) + 1;
    s.textAt([maxX / 2, -0.55], opts.below);
    s.include([maxX / 2, -0.9]);
  }
  return s.build({ margin: opts.margin ?? 0.4, caption: opts.caption });
}

/** Outline drawings of the nets of common solids. */
function solidNet(kind: 'cube' | 'rectangular prism' | 'triangular prism' | 'square pyramid' | 'triangular pyramid', rng: Rng): PlaneFigure {
  const s = new Sketch();
  const rect = (x: number, y: number, w: number, h: number) =>
    s.polyline([
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ]);
  if (kind === 'cube') return squaresFigure(randomOrient(rng, rng.pick(CUBE_NETS)));
  if (kind === 'rectangular prism') {
    const l = 2.4;
    const w = 1.2;
    const h = 1.8;
    rect(0, w, w, h);
    rect(w, w, l, h);
    rect(w + l, w, w, h);
    rect(2 * w + l, w, l, h);
    rect(w, 0, l, w);
    rect(w, w + h, l, w);
  } else if (kind === 'triangular prism') {
    const a = 1.6;
    const L = 3;
    const t = (a * Math.sqrt(3)) / 2;
    rect(0, t, a, L);
    rect(a, t, a, L);
    rect(2 * a, t, a, L);
    s.polyline([
      [a, t],
      [1.5 * a, 0],
      [2 * a, t],
    ]);
    s.polyline([
      [a, t + L],
      [1.5 * a, 2 * t + L],
      [2 * a, t + L],
    ]);
  } else if (kind === 'square pyramid') {
    const a = 2;
    const t = 1.8;
    rect(0, 0, a, a);
    s.polyline([[0, 0], [a / 2, -t], [a, 0]]);
    s.polyline([[0, a], [a / 2, a + t], [a, a]]);
    s.polyline([[0, 0], [-t, a / 2], [0, a]]);
    s.polyline([[a, 0], [a + t, a / 2], [a, a]]);
  } else {
    const a = 5;
    const t = (a * Math.sqrt(3)) / 2;
    s.polyline([[0, 0], [a, 0], [a / 2, t], [0, 0]]);
    s.polyline([[a / 4, t / 2], [(3 * a) / 4, t / 2], [a / 2, 0], [a / 4, t / 2]]);
  }
  return s.build({ margin: 0.4 });
}

/** Heights of each column in a view: front (max down each column), right side (max along each row, front row first). */
function frontView(plan: number[][]): number[] {
  return plan[0].map((_, c) => Math.max(...plan.map((row) => row[c])));
}
function sideView(plan: number[][]): number[] {
  return plan.map((row) => Math.max(...row));
}

function viewFigure(h: number[], maxCols: number, maxH: number): PlaneFigure {
  const cells: Cells = [];
  h.forEach((n, x) => {
    for (let y = 0; y < n; y++) cells.push([x, y]);
  });
  return squaresFigure(cells, { include: [[0, 0], [maxCols, maxH]], margin: 0.3 });
}

const netsViews = skill({
  id: 'm104-nets-views',
  name: '3-D objects, nets and views',
  description: 'Count the faces, edges and vertices of prisms and pyramids, match a net with its 3-D object, and choose the front view of a stack of cubes.',
  outcomes: ['SS3'],
  lessonId: 'm104-8-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      const so = rng.pick(SOLIDS);
      const thing = rng.pick(so.things);
      if (rng.chance(0.3)) {
        const alike = (a: SolidShape, b: SolidShape) => ['cube|rectPrism', 'rectPrism|cube', 'squarePyramid|rectPyramid', 'rectPyramid|squarePyramid'].includes(`${a}|${b}`);
        const others = SOLIDS.filter((x) => x.name !== so.name && !alike(so.shape, x.shape));
        return {
          prompt: `${who} is packing ${thing}. It has the shape shown. What is the name of this 3-D object?`,
          figure: { type: 'solid', shape: so.shape, labels: {} },
          parts: [{ answer: mc(rng, cap(so.name), rng.shuffle(others).map((x) => cap(x.name))) }],
          hints: ['Is it a prism (two matching ends joined by rectangles) or a pyramid (one base, with triangles meeting at a point)?', 'Then look at the shape of the base: triangle, square or rectangle.'],
          solution: [`The object has ${so.faceText}.`, so.shape.includes('Pyramid') ? 'The triangle faces meet at one point, so it is a pyramid.' : 'It has two matching ends joined by rectangles, so it is a prism.', `It is a **${so.name}**.`],
          answerDisplay: cap(so.name),
        };
      }
      const what = rng.pick(['faces', 'edges', 'vertices'] as const);
      const v = so[what];
      const how: Record<typeof what, string> = {
        faces: `Count the flat surfaces: ${so.faceText}.`,
        edges: so.shape.includes('Pyramid') ? `The base has ${so.edges / 2} edges, and ${so.edges / 2} more edges go up to the top point: $${so.edges / 2} + ${so.edges / 2} = ${so.edges}$.` : `Each end has ${so.edges / 3} edges, and ${so.edges / 3} more edges join the two ends: $${so.edges / 3} + ${so.edges / 3} + ${so.edges / 3} = ${so.edges}$.`,
        vertices: so.shape.includes('Pyramid') ? `The base has ${so.vertices - 1} corners, plus 1 at the top: $${so.vertices - 1} + 1 = ${so.vertices}$.` : `Each end has ${so.vertices / 2} corners: $${so.vertices / 2} + ${so.vertices / 2} = ${so.vertices}$.`,
      };
      const meaning: Record<typeof what, string> = {
        faces: 'A **face** is a flat surface.',
        edges: 'An **edge** is a line where two faces meet.',
        vertices: 'A **vertex** is a corner where edges meet.',
      };
      return {
        prompt: `${cap(thing)} has the shape of a ${so.name}, as shown. How many **${what}** does it have?`,
        figure: { type: 'solid', shape: so.shape, labels: {} },
        parts: [numPart(v, { suffix: what })],
        hints: [meaning[what] + ' Dashed lines show the parts you cannot see from the front.', 'Count in groups so you do not miss any or count any twice.'],
        solution: [meaning[what], how[what], `A ${so.name} has $${v}$ ${what}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        // Which net folds into a cube?
        const good = randomOrient(rng, rng.pick(HEXOMINOES.nets));
        const bad = rng.sample(HEXOMINOES.nonNets, 3).map((c) => randomOrient(rng, c));
        const answer = mcFigures(rng, [{ md: '', figure: squaresFigure(good), correct: true }, ...bad.map((c) => ({ md: '', figure: squaresFigure(c) as Figure }))]);
        const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
        const ctx = rng.pick([
          `${who} is cutting cardboard to make a cube-shaped gift box.`,
          'A worker at a packaging plant needs a pattern for a cube-shaped box.',
          `${who} wants to make a cube-shaped storage box for a child-care centre.`,
        ]);
        return {
          prompt: `${ctx} Which net folds into a **cube**?`,
          parts: [{ answer }],
          hints: ['A net of a cube has 6 squares. When you fold it, no two squares can land on the same face.', 'Picture folding each net. Four squares in a row wrap around the cube. The other two squares must go on opposite ends: one on each side of the row.'],
          solution: ['Every choice has 6 squares, so look at how they fold.', 'In the wrong nets, two squares end up on the same face, so one face of the cube is left open. Squares in a 2 by 2 block or 5 in a row can never fold into a cube.', `Net ${letter} folds into a cube with no gaps and no overlaps.`],
          answerDisplay: `Net ${letter}`,
        };
      }
      const kinds = ['cube', 'rectangular prism', 'triangular prism', 'square pyramid', 'triangular pyramid'] as const;
      const k = rng.pick(kinds);
      const near: Record<(typeof kinds)[number], string[]> = {
        cube: ['rectangular prism', 'square pyramid', 'triangular prism'],
        'rectangular prism': ['cube', 'triangular prism', 'square pyramid'],
        'triangular prism': ['triangular pyramid', 'rectangular prism', 'square pyramid'],
        'square pyramid': ['triangular pyramid', 'cube', 'triangular prism'],
        'triangular pyramid': ['square pyramid', 'triangular prism', 'cube'],
      };
      const why: Record<(typeof kinds)[number], string> = {
        cube: 'The net has 6 equal squares.',
        'rectangular prism': 'The net has 6 rectangles, in 3 matching pairs.',
        'triangular prism': 'The net has 2 triangles (the ends) and 3 rectangles that wrap around.',
        'square pyramid': 'The net has 1 square (the base) and 4 triangles that fold up to meet at a point.',
        'triangular pyramid': 'The net has 4 triangles. One is the base and the other 3 fold up to meet at a point.',
      };
      return {
        prompt: `${who} cuts out this net and folds it up. Which 3-D object does it make?`,
        figure: solidNet(k, rng),
        parts: [{ answer: mc(rng, cap(k), near[k].map(cap)) }],
        hints: ['Count the faces in the net and name their shapes.', 'Prisms have two matching ends joined by rectangles. Pyramids have one base and triangles that meet at a point.'],
        solution: [why[k], `It folds into a **${k}**.`],
        answerDisplay: cap(k),
      };
    }
    // d3: a stack of boxes shown as a top view with heights; total boxes and the front view.
    for (let tries = 0; tries < 200; tries++) {
      const rows = rng.int(2, 3);
      const cols = 3;
      const plan = Array.from({ length: rows }, () => Array.from({ length: cols }, () => rng.weighted([
        [0, 1],
        [1, 3],
        [2, 3],
        [3, 2],
      ])));
      if (plan.some((r) => r.every((x) => x === 0))) continue;
      if (plan[0].some((_, c) => plan.every((r) => r[c] === 0))) continue;
      const front = frontView(plan);
      const side = sideView(plan);
      const sums = plan[0].map((_, c) => plan.reduce((s, r) => s + r[c], 0));
      const back = [...front].reverse();
      const frontRow = plan[0];
      const key = (h: number[]) => h.join(',');
      const wrong: number[][] = [];
      for (const w of rng.shuffle([side, sums, back, frontRow])) {
        if (w.some((x) => x === 0) || Math.max(...w) > 6) continue;
        if ([front, ...wrong].some((x) => key(x) === key(w))) continue;
        wrong.push(w);
      }
      if (wrong.length < 3) continue;
      const total = plan.flat().reduce((s, x) => s + x, 0);
      const maxH = Math.max(front.length, ...wrong.map((w) => Math.max(...w)), ...front);
      const maxCols = Math.max(cols, rows);
      const cells: Cells = [];
      const numbers: string[] = [];
      plan.forEach((r, ri) =>
        r.forEach((hgt, c) => {
          if (hgt > 0) {
            cells.push([c, ri]);
            numbers.push(String(hgt));
          }
        }),
      );
      const answer = mcFigures(rng, [{ md: '', figure: viewFigure(front, maxCols, maxH), correct: true }, ...wrong.slice(0, 3).map((w) => ({ md: '', figure: viewFigure(w, maxCols, maxH) as Figure }))]);
      const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
      const ctx = rng.pick([`${who} stacks boxes of paper towels in a warehouse.`, `${who} stacks cases of pop in the back room of a grocery store.`, 'A landscaper stacks bags of soil on a pallet.', `${who} builds a display of soup cans at a store.`]);
      const thing = ctx.includes('boxes') ? 'boxes' : ctx.includes('cases') ? 'cases' : ctx.includes('bags') ? 'bags' : 'cans';
      return {
        prompt: `${ctx} The picture is the **top view** of the stack, as seen from above. Each number tells how many ${thing} are stacked on that square. You look at the stack from the **front**. How many ${thing} are in the stack, and which picture shows the **front view**?`,
        figure: squaresFigure(cells, { numbers, below: 'FRONT' }),
        parts: [numPart(total, { label: 'Total', suffix: thing }), part(answer, { label: 'Front view' })],
        hints: ['Add all the numbers to get the total.', 'From the front, you see each column of squares (left to right). The height you see in each column is the **tallest** stack in that column.'],
        solution: [
          `Total: $${plan.flat().filter((x) => x > 0).join(' + ')} = ${total}$`,
          `Front view, left to right: the tallest stack in each column is ${front.join(', ')}.`,
          `There are $${total}$ ${thing}. Picture ${letter} shows the front view.`,
        ],
        answerDisplay: `${total} ${thing}; Picture ${letter}`,
      };
    }
    throw new Error('views');
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Symmetry
// ---------------------------------------------------------------------------

type Seg = [P, P];

interface Design {
  name: string;
  segs: Seg[];
}

function polySegs(pts: P[], closed = true): Seg[] {
  const out: Seg[] = [];
  for (let i = 0; i + 1 < pts.length; i++) out.push([pts[i], pts[i + 1]]);
  if (closed) out.push([pts[pts.length - 1], pts[0]]);
  return out;
}

function regular(n: number, r = 3, start = 90): P[] {
  return Array.from({ length: n }, (_, k) => at([0, 0], start + (360 * k) / n, r));
}

const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Shapes and letters drawn as line segments. Letters are block letters made of straight strokes. */
const DESIGNS: Record<string, () => Design> = {
  square: () => ({ name: 'square', segs: polySegs([[-2, -2], [2, -2], [2, 2], [-2, 2]]) }),
  rectangle: () => ({ name: 'rectangle', segs: polySegs([[-3, -1.75], [3, -1.75], [3, 1.75], [-3, 1.75]]) }),
  equilateral: () => ({ name: 'equilateral triangle', segs: polySegs(regular(3)) }),
  isosceles: () => ({ name: 'isosceles triangle', segs: polySegs([[-2, -2], [2, -2], [0, 2.8]]) }),
  scalene: () => ({ name: 'scalene triangle', segs: polySegs([[-2.6, -1.6], [2.2, -1.6], [1, 2]]) }),
  rightTri: () => ({ name: 'right triangle', segs: polySegs([[-2, -1.6], [2.5, -1.6], [-2, 1.8]]) }),
  rhombus: () => ({ name: 'rhombus', segs: polySegs([[0, -2.8], [1.8, 0], [0, 2.8], [-1.8, 0]]) }),
  parallelogram: () => ({ name: 'parallelogram', segs: polySegs([[-3, -1.5], [1.5, -1.5], [3, 1.5], [-1.5, 1.5]]) }),
  kite: () => ({ name: 'kite', segs: polySegs([[0, -3], [1.7, 0.8], [0, 2], [-1.7, 0.8]]) }),
  trapezoid: () => ({ name: 'trapezoid', segs: polySegs([[-3, -1.5], [3, -1.5], [1.5, 1.5], [-1.5, 1.5]]) }),
  rightTrap: () => ({ name: 'trapezoid', segs: polySegs([[-2.5, -1.5], [2.5, -1.5], [0.5, 1.5], [-2.5, 1.5]]) }),
  pentagon: () => ({ name: 'regular pentagon', segs: polySegs(regular(5)) }),
  hexagon: () => ({ name: 'regular hexagon', segs: polySegs(regular(6, 3, 0)) }),
  octagon: () => ({ name: 'stop sign (regular octagon)', segs: polySegs(regular(8, 3, 22.5)) }),
  house: () => ({ name: 'house shape', segs: polySegs([[-2, -2], [2, -2], [2, 0.6], [0, 2.6], [-2, 0.6]]) }),
  arrow: () => ({ name: 'arrow sign', segs: polySegs([[-3, -0.8], [0.6, -0.8], [0.6, -1.9], [3, 0], [0.6, 1.9], [0.6, 0.8], [-3, 0.8]]) }),
  plus: () => ({ name: 'plus sign', segs: polySegs([[-1, -3], [1, -3], [1, -1], [3, -1], [3, 1], [1, 1], [1, 3], [-1, 3], [-1, 1], [-3, 1], [-3, -1], [-1, -1]]) }),
  lShape: () => ({ name: 'L shape', segs: polySegs([[-2, -2], [2, -2], [2, -0.6], [-0.6, -0.6], [-0.6, 2], [-2, 2]]) }),
  tShape: () => ({ name: 'T shape', segs: polySegs([[-3, 2.5], [3, 2.5], [3, 1], [0.9, 1], [0.9, -2.5], [-0.9, -2.5], [-0.9, 1], [-3, 1]]) }),
  letterA: () => ({ name: 'letter A', segs: [...polySegs([[-2, -2.5], [0, 2.5], [2, -2.5]], false), [[-1, 0], [1, 0]]] }),
  letterH: () => ({ name: 'letter H', segs: [[[-1.75, -2.5], [-1.75, 2.5]], [[1.75, -2.5], [1.75, 2.5]], [[-1.75, 0], [1.75, 0]]] }),
  letterI: () => ({ name: 'letter I', segs: [[[0, -2.5], [0, 2.5]], [[-1.3, 2.5], [1.3, 2.5]], [[-1.3, -2.5], [1.3, -2.5]]] }),
  letterX: () => ({ name: 'letter X', segs: [[[-1.6, -2.5], [1.6, 2.5]], [[-1.6, 2.5], [1.6, -2.5]]] }),
  letterT: () => ({ name: 'letter T', segs: [[[-2, 2.5], [2, 2.5]], [[0, 2.5], [0, -2.5]]] }),
  letterE: () => ({ name: 'letter E', segs: [[[-1.5, -2.5], [-1.5, 2.5]], [[-1.5, 2.5], [1.6, 2.5]], [[-1.5, 0], [1, 0]], [[-1.5, -2.5], [1.6, -2.5]]] }),
  letterM: () => ({ name: 'letter M', segs: polySegs([[-2, -2.5], [-2, 2.5], [0, 0], [2, 2.5], [2, -2.5]], false) }),
  letterU: () => ({ name: 'letter U', segs: polySegs([[-1.75, 2.5], [-1.75, -2.5], [1.75, -2.5], [1.75, 2.5]], false) }),
  letterV: () => ({ name: 'letter V', segs: polySegs([[-2, 2.5], [0, -2.5], [2, 2.5]], false) }),
  letterY: () => ({ name: 'letter Y', segs: [[[-2, 2.5], [0, 0]], [[2, 2.5], [0, 0]], [[0, 0], [0, -2.5]]] }),
  letterC: () => ({ name: 'letter C', segs: polySegs([[1.75, 2.5], [-1.75, 2.5], [-1.75, -2.5], [1.75, -2.5]], false) }),
  letterK: () => ({ name: 'letter K', segs: [[[-1.5, -2.5], [-1.5, 2.5]], [[-1.5, 0], [1.6, 2.5]], [[-1.5, 0], [1.6, -2.5]]] }),
  letterF: () => ({ name: 'letter F', segs: [[[-1.5, -2.5], [-1.5, 2.5]], [[-1.5, 2.5], [1.6, 2.5]], [[-1.5, 0.2], [1, 0.2]]] }),
  letterL: () => ({ name: 'letter L', segs: polySegs([[-1.5, 2.5], [-1.5, -2.5], [1.6, -2.5]], false) }),
  letterN: () => ({ name: 'letter N', segs: polySegs([[-1.75, -2.5], [-1.75, 2.5], [1.75, -2.5], [1.75, 2.5]], false) }),
  letterZ: () => ({ name: 'letter Z', segs: polySegs([[-1.75, 2.5], [1.75, 2.5], [-1.75, -2.5], [1.75, -2.5]], false) }),
  letterS: () => ({ name: 'letter S', segs: polySegs([[1.75, 2.5], [-1.75, 2.5], [-1.75, 0], [1.75, 0], [1.75, -2.5], [-1.75, -2.5]], false) }),
  letterP: () => ({ name: 'letter P', segs: [...polySegs([[-1.5, -2.5], [-1.5, 2.5], [1.5, 2.5], [1.5, 0], [-1.5, 0]], false)] }),
};

/** Designs made of an outer shape with lines or a shape inside (signs, tiles, quilt blocks, logos). */
const COMPOSITES: Array<{ thing: string; make: () => Seg[] }> = [
  {
    thing: 'a floor tile with a diamond inside a square',
    make: () => {
      const sq: P[] = [[-2.5, -2.5], [2.5, -2.5], [2.5, 2.5], [-2.5, 2.5]];
      return [...polySegs(sq), ...polySegs(sq.map((p, i) => mid(p, sq[(i + 1) % 4])))];
    },
  },
  {
    thing: 'a window frame shaped like a rectangle with a diamond inside',
    make: () => {
      const r: P[] = [[-3, -2], [3, -2], [3, 2], [-3, 2]];
      return [...polySegs(r), ...polySegs(r.map((p, i) => mid(p, r[(i + 1) % 4])))];
    },
  },
  {
    thing: 'a logo made of a regular hexagon with a triangle inside',
    make: () => {
      const h = regular(6, 3, 90);
      return [...polySegs(h), ...polySegs([h[0], h[2], h[4]])];
    },
  },
  {
    thing: 'a warning sign: a triangle with an upside-down triangle inside',
    make: () => {
      const t = regular(3, 3, 90);
      return [...polySegs(t), ...polySegs(t.map((p, i) => mid(p, t[(i + 1) % 3])))];
    },
  },
  {
    thing: 'a quilt block: a square with both diagonals',
    make: () => {
      const sq: P[] = [[-2.5, -2.5], [2.5, -2.5], [2.5, 2.5], [-2.5, 2.5]];
      return [...polySegs(sq), [sq[0], sq[2]], [sq[1], sq[3]]];
    },
  },
  {
    thing: 'a quilt block: a rectangle cut by one diagonal',
    make: () => {
      const r: P[] = [[-3, -2], [3, -2], [3, 2], [-3, 2]];
      return [...polySegs(r), [r[0], r[2]]];
    },
  },
  {
    thing: 'a quilt block: a square cut by one diagonal',
    make: () => {
      const sq: P[] = [[-2.5, -2.5], [2.5, -2.5], [2.5, 2.5], [-2.5, 2.5]];
      return [...polySegs(sq), [sq[0], sq[2]]];
    },
  },
  {
    thing: 'a window with 4 square panes',
    make: () => {
      const sq: P[] = [[-2.5, -2.5], [2.5, -2.5], [2.5, 2.5], [-2.5, 2.5]];
      return [...polySegs(sq), [[0, -2.5], [0, 2.5]], [[-2.5, 0], [2.5, 0]]];
    },
  },
  {
    thing: 'a window with 2 tall panes',
    make: () => {
      const r: P[] = [[-3, -2], [3, -2], [3, 2], [-3, 2]];
      return [...polySegs(r), [[0, -2], [0, 2]]];
    },
  },
  {
    thing: 'a stop sign (a regular octagon)',
    make: () => polySegs(regular(8, 3, 22.5)),
  },
  {
    thing: 'a logo made of a star inside a regular pentagon',
    make: () => {
      const p = regular(5);
      return [...polySegs(p), ...polySegs([p[0], p[2], p[4], p[1], p[3]])];
    },
  },
  {
    thing: 'a road sign shaped like an arrow',
    make: () => DESIGNS.arrow().segs,
  },
  {
    thing: 'a kite with two cross sticks',
    make: () => {
      const k: P[] = [[0, -3], [1.7, 0.8], [0, 2], [-1.7, 0.8]];
      return [...polySegs(k), [k[0], k[2]], [k[1], k[3]]];
    },
  },
  {
    thing: 'a sign shaped like a parallelogram',
    make: () => DESIGNS.parallelogram().segs,
  },
];

function rotSegs(segs: Seg[], rot: number): Seg[] {
  const c = Math.cos(rad(rot));
  const s = Math.sin(rad(rot));
  const f = ([x, y]: P): P => [x * c - y * s, x * s + y * c];
  return segs.map(([a, b]) => [f(a), f(b)] as Seg);
}

/** Lines of symmetry (directions in degrees, 0 to 179.5) found by reflecting the drawing about lines through its centre. */
function symmetryAxes(segs: Seg[]): number[] {
  const pts: P[] = [];
  for (const sg of segs) for (const p of sg) if (!pts.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6)) pts.push(p);
  const c = centroid(pts);
  const same = (p: P, q: P) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6;
  const out: number[] = [];
  for (let k = 0; k < 360; k++) {
    const th = k / 2;
    const u: P = [Math.cos(rad(th)), Math.sin(rad(th))];
    const refl = (p: P): P => {
      const v: P = [p[0] - c[0], p[1] - c[1]];
      const d = v[0] * u[0] + v[1] * u[1];
      return [c[0] + 2 * d * u[0] - v[0], c[1] + 2 * d * u[1] - v[1]];
    };
    const ok = segs.every(([a, b]) => {
      const ra = refl(a);
      const rb = refl(b);
      return segs.some(([p, q]) => (same(ra, p) && same(rb, q)) || (same(ra, q) && same(rb, p)));
    });
    if (ok) out.push(th);
  }
  return out;
}

function axesText(axes: number[]): string {
  if (!axes.length) return 'There is no fold line that makes the two halves match, so there are no lines of symmetry.';
  const v = axes.filter((a) => a === 90).length;
  const h = axes.filter((a) => a === 0).length;
  const sl = axes.length - v - h;
  const bits = [v ? '1 vertical line' : '', h ? '1 horizontal line' : '', sl ? `${sl} slanted line${sl === 1 ? '' : 's'}` : ''].filter(Boolean);
  const list = bits.length === 1 ? bits[0] : `${bits.slice(0, -1).join(', ')} and ${bits[bits.length - 1]}`;
  return `The design folds onto itself along ${list}. That is $${axes.length}$ line${axes.length === 1 ? '' : 's'} of symmetry.`;
}

function designFigure(segs: Seg[], extra?: (s: Sketch) => void): PlaneFigure {
  const s = new Sketch();
  for (const [a, b] of segs) s.seg(a, b);
  extra?.(s);
  return s.build({ margin: 0.6 });
}

const EASY_DESIGNS = ['square', 'rectangle', 'isosceles', 'equilateral', 'kite', 'rhombus', 'house', 'arrow', 'scalene', 'letterT', 'letterA', 'letterH', 'letterE', 'letterM', 'letterU', 'letterV', 'letterL', 'letterF'];
const HARD_DESIGNS = ['pentagon', 'hexagon', 'octagon', 'parallelogram', 'lShape', 'plus', 'tShape', 'letterX', 'letterI', 'letterN', 'letterZ', 'letterK', 'letterC', 'letterP', 'letterY', 'rightTrap', 'rightTri', 'trapezoid'];

const symmetry = skill({
  id: 'm104-symmetry',
  name: 'Lines of symmetry',
  description: 'Find the number of lines of symmetry of shapes, letters and designs, and pick out a line of symmetry.',
  outcomes: ['SS4'],
  lessonId: 'm104-8-3',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const hints = [
      'A **line of symmetry** is a fold line. When you fold along it, the two halves match exactly.',
      'Try a vertical fold, a horizontal fold and the slanted folds. Count every fold that works.',
    ];
    const countItem = (key: string, rot: number) => {
      const dz = DESIGNS[key]();
      const segs = rotSegs(dz.segs, rot);
      const axes = symmetryAxes(segs);
      const isLetter = key.startsWith('letter');
      const ctx = isLetter
        ? rng.pick([`${who} is cutting out the ${dz.name} for a store sign.`, `A sign painter paints the ${dz.name} on a window.`, `${who} cuts the ${dz.name} out of wood for a craft fair.`])
        : rng.pick([`The picture shows ${an(dz.name)} ${dz.name}.`, `${who} cuts ${an(dz.name)} ${dz.name} out of paper.`, `A sign maker cuts ${an(dz.name)} ${dz.name} out of metal.`]);
      return {
        prompt: `${ctx} How many lines of symmetry does it have?`,
        figure: designFigure(segs),
        parts: [numPart(axes.length, { suffix: axes.length === 1 ? 'line' : 'lines' })],
        hints,
        solution: [hints[0], axesText(axes), `The ${dz.name} has $${axes.length}$ line${axes.length === 1 ? '' : 's'} of symmetry.`],
      };
    };
    if (d === 1) return countItem(rng.pick(EASY_DESIGNS), 0);
    if (d === 2) {
      if (rng.chance(0.4)) {
        const key = rng.pick(HARD_DESIGNS);
        return countItem(key, key.startsWith('letter') ? 0 : rng.pick([0, 0, 90]));
      }
      // Which dashed line is a line of symmetry?
      for (let tries = 0; tries < 100; tries++) {
        const key = rng.pick(['rectangle', 'isosceles', 'kite', 'trapezoid', 'house', 'arrow', 'lShape', 'tShape', 'letterA', 'letterT', 'letterE', 'letterM', 'letterK', 'letterC', 'letterV', 'letterY', 'rhombus']);
        const dz = DESIGNS[key]();
        const segs = rotSegs(dz.segs, key.startsWith('letter') ? 0 : rng.pick([0, 90, 180, 270]));
        const axes = symmetryAxes(segs);
        if (!axes.length) continue;
        const good = rng.pick(axes);
        const pts = segs.flat();
        const c = centroid(pts.filter((p, i) => pts.findIndex((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6) === i));
        const diag = segs.flatMap(([p1, p2]) => [dirOf(c, p1) % 180, dirOf(c, p2) % 180]);
        const cands = [0, 45, 90, 135, 30, 60, 120, 150, ...diag].map((x) => Math.round(norm360(x) % 180));
        const sep = (x: number, y: number) => Math.min(Math.abs(x - y), 180 - Math.abs(x - y));
        const wrong: number[] = [];
        for (const w of rng.shuffle(cands)) {
          if (axes.some((a) => sep(a, w) < 25)) continue;
          if ([good, ...wrong].some((x) => sep(x, w) < 30)) continue;
          wrong.push(w);
          if (wrong.length === 2) break;
        }
        if (wrong.length < 2) continue;
        const lines = rng.shuffle([good, ...wrong]);
        const R = Math.max(...pts.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1]))) + 0.9;
        const fig = designFigure(segs, (s) => {
          lines.forEach((a, i) => {
            const e1 = at(c, a, R);
            const e2 = at(c, a + 180, R);
            s.seg(e2, e1, { dashed: true, color: 'accent' });
            s.endLabel(e1, a, LETTERS[i]);
          });
        });
        const idx = lines.indexOf(good);
        const ctx = key.startsWith('letter') ? `${who} is making a sign with the ${dz.name}.` : `${who} drew three dashed lines on a ${dz.name}.`;
        return {
          prompt: `${ctx} Which dashed line is a **line of symmetry**?`,
          figure: fig,
          parts: [{ answer: fixedChoice(['Line A', 'Line B', 'Line C'], idx) }],
          hints: [hints[0], 'Imagine folding the picture along each dashed line. Do the two halves land exactly on top of each other?'],
          solution: [
            `If you fold along line ${LETTERS[idx]}, the two halves of the ${dz.name} match exactly.`,
            'Folding along either of the other lines leaves parts that do not match.',
            `Line ${LETTERS[idx]} is a line of symmetry.`,
          ],
          answerDisplay: `Line ${LETTERS[idx]}`,
        };
      }
      throw new Error('symmetry lines');
    }
    // d3
    if (rng.chance(0.5)) {
      const comp = rng.pick(COMPOSITES);
      const segs = rotSegs(comp.make(), rng.pick([0, 0, 90]));
      const axes = symmetryAxes(segs);
      const ctx = rng.pick([`${who} is designing ${comp.thing}.`, `A community centre wants ${comp.thing}.`, `${who} sketches ${comp.thing}.`]);
      return {
        prompt: `${ctx} How many lines of symmetry does the whole design have? A fold line must make **every** part of the design match.`,
        figure: designFigure(segs),
        parts: [numPart(axes.length, { suffix: axes.length === 1 ? 'line' : 'lines' })],
        hints: ['First find the lines of symmetry of the outside shape.', 'Then check each of those lines with the lines inside. Keep only the fold lines that work for the whole design.'],
        solution: ['A line of symmetry must work for the outside shape **and** for everything drawn inside it.', axesText(axes), `The design has $${axes.length}$ line${axes.length === 1 ? '' : 's'} of symmetry.`],
      };
    }
    for (let tries = 0; tries < 100; tries++) {
      const target = rng.pick([0, 1, 2, 3, 4]);
      const keys = rng.shuffle([...EASY_DESIGNS, ...HARD_DESIGNS]);
      const chosen: Array<{ key: string; n: number }> = [];
      for (const key of keys) {
        const n = symmetryAxes(DESIGNS[key]().segs).length;
        if (chosen.some((c) => c.n === n)) continue;
        if (n !== target && chosen.length === 3 && !chosen.some((c) => c.n === target)) continue;
        chosen.push({ key, n });
        if (chosen.length === 4) break;
      }
      if (chosen.length < 4 || !chosen.some((c) => c.n === target)) continue;
      const answer = mcFigures(
        rng,
        chosen.map((c) => ({ md: '', figure: designFigure(DESIGNS[c.key]().segs) as Figure, correct: c.n === target })),
      );
      const order = answer.kind === 'mc' ? answer.choices.map((ch) => chosen.find((c) => JSON.stringify(designFigure(DESIGNS[c.key]().segs)) === JSON.stringify(ch.figure))!) : chosen;
      const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
      return {
        prompt: `${who} is choosing a design for a club logo. The logo must have ${target === 0 ? '**no** lines' : `**exactly ${target}** line${target === 1 ? '' : 's'}`} of symmetry. Which design should ${who} choose?`,
        parts: [{ answer }],
        hints,
        solution: [
          ...order.map((c, i) => `Design ${String.fromCharCode(65 + i)} (${DESIGNS[c.key]().name}) has $${c.n}$ line${c.n === 1 ? '' : 's'} of symmetry.`),
          target === 0 ? `Design ${letter} has no lines of symmetry.` : `Design ${letter} has exactly $${target}$ line${target === 1 ? '' : 's'} of symmetry.`,
        ],
        answerDisplay: `Design ${letter}`,
      };
    }
    throw new Error('symmetry choice');
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Translations, reflections and rotations on a grid
// ---------------------------------------------------------------------------

const Q1: GridSpec = { xMin: 0, xMax: 10, yMin: 0, yMax: 10, step: 1 };
const Q4: GridSpec = { xMin: -5, xMax: 5, yMin: -5, yMax: 5, step: 1 };

const units = (n: number) => `${Math.abs(n)} unit${Math.abs(n) === 1 ? '' : 's'}`;
function slideText(a: number, b: number): string {
  const bits: string[] = [];
  if (a) bits.push(`${units(a)} ${a > 0 ? 'right' : 'left'}`);
  if (b) bits.push(`${units(b)} ${b > 0 ? 'up' : 'down'}`);
  return bits.join(' and ');
}
const ptx = (x: number, y: number) => `(${fmt(x)},\\ ${fmt(y)})`;
const inGrid = (g: GridSpec, [x, y]: P) => x >= g.xMin && x <= g.xMax && y >= g.yMin && y <= g.yMax;

const TRI_TEMPLATES: P[][] = [
  [[0, 0], [3, 0], [0, 2]],
  [[0, 0], [4, 0], [0, 2]],
  [[0, 0], [3, 0], [0, 4]],
  [[0, 0], [4, 0], [1, 3]],
  [[0, 0], [2, 0], [0, 3]],
];

/** A random asymmetric triangle with whole-number vertices, its lowest-left corner at (x0, y0). */
function makeTri(rng: Rng, x0: number, y0: number): P[] {
  const t = rng.pick(TRI_TEMPLATES);
  const rot = rng.int(0, 3);
  const flip = rng.chance(0.5);
  let q = t.map(([x, y]) => [flip ? -x : x, y] as P);
  for (let i = 0; i < rot; i++) q = q.map(([x, y]) => [-y, x] as P);
  const mx = Math.min(...q.map((p) => p[0]));
  const my = Math.min(...q.map((p) => p[1]));
  return q.map(([x, y]) => [x - mx + x0, y - my + y0] as P);
}

/** Draws shapes and points on a coordinate grid with clear vertex labels. */
function gridFigure(g: GridSpec, o: { shapes?: Array<{ pts: P[]; color: Color; labels?: string[] }>; points?: Array<{ p: P; label: string; color?: Color }>; mirror?: { vertical: boolean; at: number } }): PlaneFigure {
  const s = new Sketch();
  if (o.mirror) {
    if (o.mirror.vertical) s.seg([o.mirror.at, g.yMin], [o.mirror.at, g.yMax], { dashed: true, color: 'accent' });
    else s.seg([g.xMin, o.mirror.at], [g.xMax, o.mirror.at], { dashed: true, color: 'accent' });
  }
  for (const sh of o.shapes ?? []) s.polyline([...sh.pts, sh.pts[0]], sh.color);
  for (const pt of o.points ?? []) s.dot(pt.p, pt.color ?? 'brand');
  for (const sh of o.shapes ?? []) {
    const c = centroid(sh.pts);
    sh.labels?.forEach((lab, i) => s.endLabel(sh.pts[i], dirOf(c, sh.pts[i]), lab));
  }
  for (const pt of o.points ?? []) s.endLabel(pt.p, 45, pt.label);
  return s.buildGrid(g);
}

const POINT_CTX = [
  (who: string) => `On a game board, ${who}'s game piece is at point $P$.`,
  () => 'On the floor plan of a warehouse, a forklift is parked at point $P$.',
  (who: string) => `On a map of a campground, ${who}'s tent is at point $P$.`,
  () => 'On a plan of a parking lot, a snowplow starts at point $P$.',
  (who: string) => `${who} is placing a tile on a grid pattern. One corner of the tile is at point $P$.`,
];

const transformation = skill({
  id: 'm104-transformation',
  name: 'Translations, reflections and rotations',
  description: 'Find the image of a point or shape after a translation or a reflection on a grid, and identify a translation, reflection or rotation from a picture.',
  outcomes: ['SS4'],
  lessonId: 'm104-8-3',
  calculator: false,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const pointAns = (x: number, y: number, label: string) => part({ kind: 'point', x, y }, { label, placeholder: '(x, y)' });
    if (d === 1) {
      for (;;) {
        const x = rng.int(1, 9);
        const y = rng.int(1, 9);
        const a = rng.chance(0.15) ? 0 : rng.nonZero(-5, 5);
        const b = a !== 0 && rng.chance(0.15) ? 0 : rng.nonZero(-5, 5);
        const img: P = [x + a, y + b];
        if (!inGrid(Q1, img) || Math.abs(a) + Math.abs(b) < 2) continue;
        const ctx = rng.pick(POINT_CTX)(who);
        return {
          prompt: `${ctx} It moves **${slideText(a, b)}**. What are the coordinates of its new position, the image $P'$?`,
          figure: gridFigure(Q1, { points: [{ p: [x, y], label: 'P' }] }),
          parts: [pointAns(img[0], img[1], "$P'$ =")],
          hints: ['First read the coordinates of $P$: go across to find $x$, then up to find $y$.', 'Moving right adds to $x$, left subtracts from $x$. Moving up adds to $y$, down subtracts from $y$.'],
          solution: [
            `$P$ is at $${ptx(x, y)}$.`,
            a ? `${cap(a > 0 ? 'right' : 'left')} ${units(a)}: $x = ${x} ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${img[0]}$` : `It does not move left or right, so $x$ stays $${x}$.`,
            b ? `${cap(b > 0 ? 'up' : 'down')} ${units(b)}: $y = ${y} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${img[1]}$` : `It does not move up or down, so $y$ stays $${y}$.`,
            `The image is $P'${ptx(img[0], img[1])}$.`,
          ],
          answerDisplay: `$${ptx(img[0], img[1])}$`,
        };
      }
    }
    if (d === 2) {
      const mode = rng.pick(['triangle', 'mirror', 'axis'] as const);
      if (mode === 'triangle') {
        for (;;) {
          const tri = makeTri(rng, rng.int(0, 6), rng.int(0, 6));
          const a = rng.nonZero(-5, 5);
          const b = rng.nonZero(-5, 5);
          const img = tri.map(([x, y]) => [x + a, y + b] as P);
          if (!tri.every((p) => inGrid(Q1, p)) || !img.every((p) => inGrid(Q1, p))) continue;
          const i = rng.int(0, 2);
          const L = 'ABC'[i];
          const [x, y] = tri[i];
          return {
            prompt: `${who} is moving a triangle-shaped flower bed on a garden plan. Translate triangle $ABC$ **${slideText(a, b)}**. What are the coordinates of $${L}'$, the image of vertex $${L}$?`,
            figure: gridFigure(Q1, { shapes: [{ pts: tri, color: 'brand', labels: ['A', 'B', 'C'] }] }),
            parts: [pointAns(img[i][0], img[i][1], `$${L}'$ =`)],
            hints: ['In a translation, every vertex slides the same distance in the same direction.', `Read the coordinates of $${L}$, then add or subtract: right/left changes $x$, up/down changes $y$.`],
            solution: [
              `$${L}$ is at $${ptx(x, y)}$.`,
              `$x$: $${x} ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${x + a}$`,
              `$y$: $${y} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${y + b}$`,
              `The image is $${L}'${ptx(x + a, y + b)}$.`,
            ],
            answerDisplay: `$${ptx(x + a, y + b)}$`,
          };
        }
      }
      if (mode === 'mirror') {
        for (;;) {
          const vertical = rng.chance(0.5);
          const m = rng.int(3, 7);
          const dist = rng.nonZero(-4, 4);
          const other = rng.int(1, 9);
          const p: P = vertical ? [m - dist, other] : [other, m - dist];
          const img: P = vertical ? [m + dist, other] : [other, m + dist];
          if (!inGrid(Q1, p) || !inGrid(Q1, img)) continue;
          return {
            prompt: `${who} is drawing a design that is the same on both sides of the dashed mirror line. Reflect point $P$ in the dashed line. What are the coordinates of the image $P'$?`,
            figure: gridFigure(Q1, { points: [{ p, label: 'P' }], mirror: { vertical, at: m } }),
            parts: [pointAns(img[0], img[1], "$P'$ =")],
            hints: ['The image is the same distance from the mirror line as $P$, but on the other side.', `Count how many units $P$ is from the dashed line. Then count the same number of units past the line.`],
            solution: [
              `The mirror line is the ${vertical ? 'vertical' : 'horizontal'} line at ${vertical ? '$x' : '$y'} = ${m}$. $P$ is at $${ptx(p[0], p[1])}$.`,
              `$P$ is ${units(dist)} ${vertical ? (dist > 0 ? 'left of' : 'right of') : dist > 0 ? 'below' : 'above'} the line, so $P'$ is ${units(dist)} ${vertical ? (dist > 0 ? 'right of' : 'left of') : dist > 0 ? 'above' : 'below'} it.`,
              vertical ? `$x = ${m} ${dist > 0 ? '+' : '-'} ${Math.abs(dist)} = ${img[0]}$, and $y$ stays $${other}$.` : `$y = ${m} ${dist > 0 ? '+' : '-'} ${Math.abs(dist)} = ${img[1]}$, and $x$ stays $${other}$.`,
              `The image is $P'${ptx(img[0], img[1])}$.`,
            ],
            answerDisplay: `$${ptx(img[0], img[1])}$`,
          };
        }
      }
      const x = rng.nonZero(-5, 5);
      const y = rng.nonZero(-5, 5);
      const inX = rng.chance(0.5);
      const img: P = inX ? [x, -y] : [-x, y];
      return {
        prompt: `Reflect point $P${ptx(x, y)}$ in the **${inX ? 'x' : 'y'}-axis**. What are the coordinates of the image $P'$?`,
        figure: gridFigure(Q4, { points: [{ p: [x, y], label: 'P' }] }),
        parts: [pointAns(img[0], img[1], "$P'$ =")],
        hints: [`The ${inX ? '$x$-axis is the horizontal' : '$y$-axis is the vertical'} number line. It acts as the mirror.`, inX ? 'Reflecting in the $x$-axis keeps $x$ the same and changes the sign of $y$.' : 'Reflecting in the $y$-axis keeps $y$ the same and changes the sign of $x$.'],
        solution: [
          `$P$ is ${units(inX ? y : x)} ${inX ? (y > 0 ? 'above' : 'below') : x > 0 ? 'right of' : 'left of'} the ${inX ? '$x$' : '$y$'}-axis.`,
          `Its image is the same distance on the other side: ${units(inX ? y : x)} ${inX ? (y > 0 ? 'below' : 'above') : x > 0 ? 'left of' : 'right of'} the axis.`,
          inX ? `$x$ stays $${x}$ and $y$ becomes $${-y}$.` : `$y$ stays $${y}$ and $x$ becomes $${-x}$.`,
          `The image is $P'${ptx(img[0], img[1])}$.`,
        ],
        answerDisplay: `$${ptx(img[0], img[1])}$`,
      };
    }
    // d3
    const mode = rng.pick(['identify', 'describe', 'twostep'] as const);
    if (mode === 'twostep') {
      for (;;) {
        const vertical = rng.chance(0.5);
        const m = rng.int(3, 7);
        const x = rng.int(1, 9);
        const y = rng.int(1, 9);
        const a = vertical ? rng.nonZero(-4, 4) : 0;
        const b = vertical ? 0 : rng.nonZero(-4, 4);
        const mid1: P = [x + a, y + b];
        const fin: P = vertical ? [2 * m - mid1[0], mid1[1]] : [mid1[0], 2 * m - mid1[1]];
        if (!inGrid(Q1, mid1) || !inGrid(Q1, fin) || (vertical ? mid1[0] === m || x === m : mid1[1] === m || y === m)) continue;
        if (fin[0] === x && fin[1] === y) continue;
        const ctx = rng.pick([`${who} is planning moves for a board game.`, 'A robot vacuum follows two moves on a grid.', `${who} is moving a decoration on a bulletin board plan.`]);
        return {
          prompt: `${ctx} First, translate point $P$ **${slideText(a, b)}**. Then reflect that image in the dashed line. What are the coordinates of the final image?`,
          figure: gridFigure(Q1, { points: [{ p: [x, y], label: 'P' }], mirror: { vertical, at: m } }),
          parts: [pointAns(fin[0], fin[1], 'Final image =')],
          hints: ['Do one move at a time. Write down the coordinates after the slide.', 'For the reflection, count how far the new point is from the dashed line, then go the same distance on the other side.'],
          solution: [
            `$P$ is at $${ptx(x, y)}$. After the slide it is at $${ptx(mid1[0], mid1[1])}$.`,
            `The dashed line is at ${vertical ? '$x' : '$y'} = ${m}$. The point is ${units(vertical ? mid1[0] - m : mid1[1] - m)} from the line.`,
            vertical ? `Reflect: $x = ${m} ${mid1[0] > m ? '-' : '+'} ${Math.abs(mid1[0] - m)} = ${fin[0]}$, and $y$ stays $${fin[1]}$.` : `Reflect: $y = ${m} ${mid1[1] > m ? '-' : '+'} ${Math.abs(mid1[1] - m)} = ${fin[1]}$, and $x$ stays $${fin[0]}$.`,
            `The final image is at $${ptx(fin[0], fin[1])}$.`,
          ],
          answerDisplay: `$${ptx(fin[0], fin[1])}$`,
        };
      }
    }
    for (;;) {
      const tri = makeTri(rng, rng.int(0, 7), rng.int(0, 7));
      if (!tri.every((p) => inGrid(Q1, p))) continue;
      const kind = mode === 'describe' ? 'translation' : rng.pick(['translation', 'reflection', 'rotation'] as const);
      let img: P[] = [];
      let detail = '';
      let a = 0;
      let b = 0;
      if (kind === 'translation') {
        a = rng.nonZero(-6, 6);
        b = rng.nonZero(-6, 6);
        img = tri.map(([x, y]) => [x + a, y + b] as P);
        detail = `Each vertex moved ${slideText(a, b)}.`;
      } else if (kind === 'reflection') {
        const vertical = rng.chance(0.5);
        const lo = Math.min(...tri.map((p) => (vertical ? p[0] : p[1])));
        const hi = Math.max(...tri.map((p) => (vertical ? p[0] : p[1])));
        const m = rng.chance(0.5) ? hi + rng.int(1, 2) : lo - rng.int(1, 2);
        img = tri.map(([x, y]) => (vertical ? [2 * m - x, y] : [x, 2 * m - y]) as P);
        detail = `The triangle was flipped over a ${vertical ? 'vertical' : 'horizontal'} line at ${vertical ? '$x' : '$y'} = ${m}$. The flipped triangle faces the opposite way, like a mirror image.`;
      } else {
        const cx = Math.max(...tri.map((p) => p[0])) + rng.int(0, 2);
        const cy = rng.pick([Math.min(...tri.map((p) => p[1])), Math.max(...tri.map((p) => p[1]))]);
        const half = rng.chance(0.5);
        img = tri.map(([x, y]) => (half ? [2 * cx - x, 2 * cy - y] : [cx - (y - cy), cy + (x - cx)]) as P);
        detail = `The triangle was turned ${half ? 'a half turn' : 'a quarter turn counterclockwise'} about the point $${ptx(cx, cy)}$. It is not flipped: the vertices $A$, $B$, $C$ go around in the same direction as before.`;
      }
      if (!img.every((p) => inGrid(Q1, p))) continue;
      const bx = (pts: P[]) => [Math.min(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[1]))];
      const [a0, a1, a2, a3] = bx(tri);
      const [b0, b1, b2, b3] = bx(img);
      if (!(a1 < b0 || b1 < a0 || a3 < b2 || b3 < a2)) continue;
      const figure = gridFigure(Q1, {
        shapes: [
          { pts: tri, color: 'brand', labels: ['A', 'B', 'C'] },
          { pts: img, color: 'accent', labels: ["A′", "B′", "C′"] },
        ],
      });
      if (mode === 'describe') {
        const opts = [slideText(a, b), slideText(b, a), slideText(-a, -b), slideText(a, -b), slideText(-a, b)];
        const correct = `A translation ${opts[0]}`;
        return {
          prompt: `${who} slides a triangle-shaped sign on a grid plan. Triangle $ABC$ moves to triangle $A'B'C'$. Which describes the translation?`,
          figure,
          parts: [{ answer: mc(rng, correct, opts.slice(1).map((o) => `A translation ${o}`)) }],
          hints: ['Pick one vertex, such as $A$, and find its image $A\'$.', 'Count the units across (right or left) from $A$ to $A\'$, then the units up or down.'],
          solution: [`$A$ is at $${ptx(tri[0][0], tri[0][1])}$ and $A'$ is at $${ptx(img[0][0], img[0][1])}$.`, `Across: $${img[0][0]} - ${tri[0][0]} = ${a}$, so ${units(a)} ${a > 0 ? 'right' : 'left'}. Up or down: $${img[0][1]} - ${tri[0][1]} = ${b}$, so ${units(b)} ${b > 0 ? 'up' : 'down'}.`, `The translation is ${opts[0]}.`],
          answerDisplay: correct,
        };
      }
      const names = ['Translation (slide)', 'Reflection (flip)', 'Rotation (turn)'];
      const idx = ['translation', 'reflection', 'rotation'].indexOf(kind);
      return {
        prompt: `Triangle $ABC$ was moved to triangle $A'B'C'$. Which transformation was used?`,
        figure,
        parts: [{ answer: fixedChoice(names, idx) }],
        hints: ['A translation slides a shape: it still faces the same way. A reflection flips it, like a mirror. A rotation turns it.', 'Trace $A \\to B \\to C$ and $A\' \\to B\' \\to C\'$. If one goes clockwise and the other counterclockwise, the shape was flipped.'],
        solution: [detail, `This is a **${kind}**.`],
        answerDisplay: names[idx],
      };
    }
  },
});

export const SHAPE_SKILLS: SkillDef[] = [classifyAngle, classifyShape, netsViews, symmetry, transformation];
