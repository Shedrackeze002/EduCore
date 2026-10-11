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
        for (const dpx of [11, 14, 18, 23, 29, 36])
          for (const t of [0, 0.12, -0.12, 0.24, -0.24, 0.34, -0.34]) res.push(at(at(m, d, t * len), out, dpx / ppu));
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
  return s.build({ margin: 0.8 });
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
  { text: (a: string) => `A gravel road leaves a straight highway at an angle of $${a}$.`, lo: 30, hi: 75 },
  { text: (a: string) => `A ladder leans against a wall. It makes an angle of $${a}$ with the flat ground.`, lo: 60, hi: 80 },
  { text: (a: string) => `A playground slide makes an angle of $${a}$ with the flat ground.`, lo: 25, hi: 45 },
  { text: (a: string) => `A conveyor belt in a warehouse rises from the flat floor at an angle of $${a}$.`, lo: 20, hi: 40 },
  { text: (a: string) => `After a windstorm, a sign post leans. It makes an angle of $${a}$ with the flat ground.`, lo: 65, hi: 85 },
];

const RIGHT_CTX = [
  { text: (a: string) => `A gate frame has a square corner ($90^\\circ$). A brace starts at the corner and makes an angle of $${a}$ with the bottom of the gate.`, lo: 25, hi: 65 },
  { text: (a: string) => `A tile setter cuts a square tile. The cut starts at a square corner ($90^\\circ$) and makes an angle of $${a}$ with one edge.`, lo: 20, hi: 70 },
  { text: (a: string) => `Two hallways in a hotel meet at a right angle ($90^\\circ$). A third hallway leaves the same corner at an angle of $${a}$ to one of them.`, lo: 25, hi: 65 },
  { text: (a: string) => `A corner shelf fits into a square corner ($90^\\circ$) of a room. A support bar leaves the corner at an angle of $${a}$ to one wall.`, lo: 30, hi: 60 },
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
      prompt: `${ctx.text(deg(known))} ${kind === 'straight' ? 'The ground (or road) is a straight line, so the two angles together make $180^\\circ$.' : 'The two angles together make the square corner.'} Find the angle marked **?** and name its type.`,
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
function quadShape(rng: Rng, q: Quad, unit: string): { pts: P[]; sides: string[]; right: number[]; text: string } {
  const L = (x: number) => `${fmt(x)} ${unit}`;
  if (q === 'square') {
    const s = rng.int(3, 9) * (unit === 'cm' ? 5 : 1);
    return { pts: [[0, 0], [s, 0], [s, s], [0, s]], sides: [L(s), L(s), L(s), L(s)], right: [0, 1, 2, 3], text: `4 sides of ${L(s)} and 4 square corners` };
  }
  if (q === 'rectangle') {
    const w = rng.int(2, 5);
    const l = w + rng.int(2, 4);
    const k = unit === 'cm' ? 10 : 1;
    return { pts: [[0, 0], [l * k, 0], [l * k, w * k], [0, w * k]], sides: [L(l * k), L(w * k), L(l * k), L(w * k)], right: [0, 1, 2, 3], text: `sides of ${L(l * k)}, ${L(w * k)}, ${L(l * k)} and ${L(w * k)}, and 4 square corners` };
  }
  if (q === 'rhombus' || q === 'parallelogram') {
    const a = rng.int(4, 8);
    const b = q === 'rhombus' ? a : a + rng.pick([-2, 2, 3]);
    const ang = rng.int(11, 14) * 5;
    const k = unit === 'cm' ? 10 : 1;
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
  const k = unit === 'cm' ? 10 : 1;
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

const SHAPE_CTX_TRI = ['a triangular flag', 'a corner shelf', 'a roof truss', 'a garden bed', 'a sail', 'a warning sign', 'a piece of plywood'];
const SHAPE_CTX_QUAD = ['A floor tile', 'A window', 'A garden bed', 'A sign', 'A table top', 'A piece of fabric', 'A patio stone', 'A parking stall'];

const classifyShape = skill({
  id: 'm104-classify-shape',
  name: 'Naming triangles and quadrilaterals',
  description: 'Name triangles by their sides and angles, and name quadrilaterals (square, rectangle, rhombus, parallelogram, trapezoid) from a picture or a description.',
  outcomes: ['SS3'],
  lessonId: 'm104-8-1',
  format: 'mc',
  gen(rng, d) {
    const unit = rng.pick(['cm', 'cm', 'm']);
    const sideNames: SideType[] = ['equilateral', 'isosceles', 'scalene'];
    const angNames: AngType[] = ['acute', 'right', 'obtuse'];
    const triBySides = (picture: boolean) => {
      const t = rng.pick(sideNames);
      const sides = triSides(rng, t);
      const lab = sides.map((x) => `${x} ${unit}`);
      const ctx = rng.pick(SHAPE_CTX_TRI);
      const listed = `$${sides[0]}\\ \\text{${unit}}$, $${sides[1]}\\ \\text{${unit}}$ and $${sides[2]}\\ \\text{${unit}}$`;
      return {
        prompt: picture ? `The picture shows ${ctx}. Name the triangle by its sides.` : `${cap(ctx)} is a triangle with sides of ${listed}. Name the triangle by its sides.`,
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
        prompt: picture ? `The picture shows ${ctx}. Name the triangle by its angles.` : `${cap(ctx)} is a triangle with angles of ${listed}. Name the triangle by its angles.`,
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
      const sh = quadShape(rng, q, unit);
      const ctx = rng.pick(SHAPE_CTX_QUAD);
      const names = [q, ...QUAD_WRONG[q]];
      return {
        prompt: picture
          ? `${ctx} has the shape shown. Small squares mark the right angles. What is the **most exact** name for the shape?`
          : `${ctx} has ${sh.text}. What is the **most exact** name for its shape?`,
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
        prompt: `Two angles of ${ctx} are $${deg(A)}$ and $${deg(B)}$. The three angles of any triangle add to $180^\\circ$. Find the third angle. Then name the triangle by its angles.`,
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
    const lab = tri.sides.map((x) => `${fmt(x)} ${unit}`);
    const name = (a: AngType, s: SideType) => `${cap(a)} ${s} triangle`;
    const otherA = rng.pick(angNames.filter((x) => x !== at3));
    const otherS: SideType = st3 === 'isosceles' ? 'scalene' : 'isosceles';
    const ctx = rng.pick(SHAPE_CTX_TRI);
    const big = Math.max(...tri.angles);
    return {
      prompt: `The picture shows ${ctx} with all its sides and angles measured. Name the triangle by its angles **and** by its sides.`,
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
    if (at3 !== 'right' && Math.abs(big - 90) < 8) continue;
    const st = sideTypeOf(s);
    if (st !== st3) continue;
    if (st3 === 'scalene') {
      const sorted = [...s].sort((x, y) => x - y);
      if (sorted[1] - sorted[0] < 1.5 || sorted[2] - sorted[1] < 1.5) continue;
      if (new Set(angles).size < 3) continue;
    }
    return { pts: triFromSides(a, b, c), sides: s, angles };
  }
  throw new Error('triangle');
}
