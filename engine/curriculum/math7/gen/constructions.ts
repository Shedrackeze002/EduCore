/** Math 7 Unit 8 — Geometric Constructions (SS3). */
import { fixedChoice, mc, mcFigures, multi, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, GridSpec, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Kiona', 'Thanh', 'Harpreet', 'Marie-Ève',
];

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
const cm = (x: number) => `${fmt(x)}\\ \\text{cm}`;
const letterOf = (answer: AnswerSpec) => (answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A');

// ---------------------------------------------------------------------------
// Drawing: a sketch whose labels are placed clear of every line (the approach
// of the Math 10-4 shapes unit). Also used by the Unit 9 transformations.
// ---------------------------------------------------------------------------

export type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
export const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
export const dirOf = (a: P, b: P) => norm360((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
/** Rotate p about the origin by a degrees counterclockwise. */
const turn = (p: P, a: number): P => [p[0] * Math.cos(rad(a)) - p[1] * Math.sin(rad(a)), p[0] * Math.sin(rad(a)) + p[1] * Math.cos(rad(a))];
export function centroid(pts: P[]): P {
  return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

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

function inPoly(p: P, poly: P[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
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
 * Collects segments, arcs, shapes and labels, then lays the figure out on a plane. Labels are drawn
 * with invisible anchor points (open + muted) and each label is placed where it stays clear of every
 * drawn line.
 */
export class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color; fill?: boolean }> = [];
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
  rightMark(v: P, a0: number, s = 0.4) {
    const p1 = at(v, a0, s);
    const p2 = at(p1, a0 + 90, s);
    const p3 = at(v, a0 + 90, s);
    this.polys.push({ points: [p1, p2, p3], color: 'accent' });
    this.obstacles.push([p1, p2], [p2, p3]);
    return this;
  }

  /** Equal-length tick marks across the middle of segment pq. */
  ticks(p: P, q: P, count = 1, size = 0.22) {
    const m = mid(p, q);
    const d = dirOf(p, q);
    for (let k = 0; k < count; k++) {
      const c = at(m, d, (k - (count - 1) / 2) * 0.2);
      this.seg(at(c, d + 90, size), at(c, d - 90, size), { color: 'accent' });
    }
    return this;
  }

  polyline(points: P[], color: Color = 'brand', fill = false) {
    this.polys.push({ points, color, ...(fill ? { fill } : {}) });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  /** A closed, shaded polygon. */
  polygon(points: P[], color: Color = 'brand') {
    return this.polyline([...points, points[0]], color, true);
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
    const m = mid(a, b);
    const d = dirOf(a, b);
    const n1 = d + 90;
    const toIn = dirOf(m, inside);
    const out = Math.cos(rad(n1 - toIn)) > 0 ? d - 90 : n1;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    this.pending.push({
      text,
      cands: (ppu) => {
        const res: P[] = [];
        const extra = Math.abs(Math.cos(rad(out))) * (textWidth(text) / 2);
        for (const dpx of [11, 14, 18, 23, 29, 36])
          for (const t of [0, 0.12, -0.12, 0.24, -0.24, 0.34, -0.34]) res.push(at(at(m, d, t * len), out, (dpx + extra) / ppu));
        return res;
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
          // Keep labels and their invisible anchors off shaded shapes.
          const probes: P[] = [A, c, [box.x0, box.y0], [box.x1, box.y0], [box.x0, box.y1], [box.x1, box.y1]];
          if (this.polys.some((pl) => pl.fill && probes.some((q) => inPoly(q, pl.points)))) score -= 100;
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
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}), ...(p.fill ? { fill: true } : {}) })),
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

  /**
   * A grid with lines every unit; coordinates are used as given. With `numbers` the axes and their
   * numbers are drawn (a Cartesian plane); without, it is plain grid paper.
   */
  buildGrid(grid: GridSpec, opts: { numbers?: boolean; caption?: string } = {}): PlaneFigure {
    const numbers = opts.numbers ?? true;
    const xr = grid.xMax - grid.xMin;
    const ppu = 340 / xr;
    const ticks: Box[] = [];
    if (numbers) {
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
    }
    const anchors = this.place({ x0: grid.xMin, x1: grid.xMax, y0: grid.yMin, y1: grid.yMax }, ppu, ticks);
    const extra: Partial<PlaneFigure> = numbers ? {} : { hideTickLabels: true, hideAxes: true };
    return this.output((p) => [r3(p[0]), r3(p[1])], { ...grid, step: 1 }, anchors, { ...extra, ...(opts.caption ? { caption: opts.caption } : {}) });
  }
}

// ---------------------------------------------------------------------------
// Constructions drawn step by step (used in questions and lessons)
// ---------------------------------------------------------------------------

/** Perpendicular through a point P on segment AB, with the construction arcs. */
export function perpThroughFigure(rot = 0): PlaneFigure {
  const s = new Sketch();
  const R = (p: P) => turn(p, rot);
  const A: P = [-3.4, 0];
  const B: P = [3.4, 0];
  const Pp: P = [0.4, 0];
  const C: P = [-1.2, 0];
  const D: P = [2, 0];
  const E: P = [0.4, 2.7];
  s.seg(R(A), R(B));
  for (const [c, a0, a1] of [[Pp, 160, 200], [Pp, -20, 20]] as Array<[P, number, number]>) s.arc(R(c), 1.6, a0 + rot, a1 + rot, 'muted');
  s.arc(R(C), Math.hypot(E[0] - C[0], E[1] - C[1]), dirOf(C, E) - 14 + rot, dirOf(C, E) + 14 + rot, 'muted');
  s.arc(R(D), Math.hypot(E[0] - D[0], E[1] - D[1]), dirOf(D, E) - 14 + rot, dirOf(D, E) + 14 + rot, 'muted');
  s.seg(R(Pp), R(at(Pp, 90, 3.3)), { color: 'accent' });
  s.rightMark(R(Pp), 0 + rot, 0.35);
  for (const p of [A, B, Pp, C, D, E]) s.dot(R(p), p === E || p === C || p === D ? 'muted' : 'brand');
  s.endLabel(R(A), 180 + rot, 'A').endLabel(R(B), rot, 'B').endLabel(R(Pp), 300 + rot, 'P');
  s.endLabel(R(C), 270 + rot, 'C').endLabel(R(D), 270 + rot, 'D').endLabel(R(E), 20 + rot, 'E');
  return s.build({ margin: 0.6 });
}

/** Perpendicular bisector of AB: arcs from A and B cross at C and D. */
export function perpBisectorConstruction(rot = 0): PlaneFigure {
  const s = new Sketch();
  const R = (p: P) => turn(p, rot);
  const A: P = [-2.4, 0];
  const B: P = [2.4, 0];
  const r = 3.2;
  const h = Math.sqrt(r * r - 2.4 * 2.4);
  const C: P = [0, h];
  const D: P = [0, -h];
  s.seg(R(A), R(B));
  const sweep = (c: P, p: P) => [dirOf(c, p) - 16 + rot, dirOf(c, p) + 16 + rot];
  for (const c of [A, B]) for (const p of [C, D]) {
    const [a0, a1] = sweep(c, p);
    s.arc(R(c), r, a0, a1, 'muted');
  }
  s.seg(R(at(C, 90, 0.5)), R(at(D, 270, 0.5)), { color: 'accent' });
  s.rightMark(R([0, 0]), rot, 0.32);
  s.ticks(R(A), R([0, 0]), 1).ticks(R([0, 0]), R(B), 1);
  for (const p of [A, B]) s.dot(R(p));
  for (const p of [C, D]) s.dot(R(p), 'muted');
  s.dot(R([0, 0]), 'accent');
  s.endLabel(R(A), 180 + rot, 'A').endLabel(R(B), rot, 'B').endLabel(R(C), 30 + rot, 'C').endLabel(R(D), 330 + rot, 'D').endLabel(R([0, 0]), 315 + rot, 'M');
  return s.build({ margin: 0.5 });
}

/** Angle bisector of ∠ABC: an arc from B crosses the arms at D and E; arcs from D and E cross at F. */
export function angleBisectorConstruction(total = 70, base = 0): PlaneFigure {
  const s = new Sketch();
  const B: P = [0, 0];
  const r1 = 2.2;
  const D = at(B, base, r1);
  const E = at(B, base + total, r1);
  const half = base + total / 2;
  const r2 = 1.9;
  // F is where arcs of radius r2 from D and E meet on the bisector.
  const dHalf = Math.hypot(D[0] - E[0], D[1] - E[1]) / 2;
  const fromMid = Math.sqrt(r2 * r2 - dHalf * dHalf);
  const F = at(mid(D, E), half, fromMid);
  s.ray(B, base, 4.6).ray(B, base + total, 4.6);
  s.arc(B, r1, base - 6, base + total + 6, 'muted');
  for (const c of [D, E]) s.arc(c, r2, dirOf(c, F) - 18, dirOf(c, F) + 18, 'muted');
  s.ray(B, half, 5.1, { color: 'accent' });
  s.dot(B).dot(D, 'muted').dot(E, 'muted').dot(F, 'muted');
  s.endLabel(at(B, base, 4.6), base - 90, 'A').endLabel(B, half + 180, 'B').endLabel(at(B, base + total, 4.6), base + total + 90, 'C');
  s.endLabel(D, base - 60, 'D').endLabel(E, base + total + 60, 'E').endLabel(F, half - 70, 'F');
  return s.build({ margin: 0.5 });
}

/** Perpendicular from a point P that is not on segment AB. */
export function perpFromPointFigure(rot = 0): PlaneFigure {
  const s = new Sketch();
  const R = (p: P) => turn(p, rot);
  const A: P = [-3.2, 0];
  const B: P = [3.2, 0];
  const Pp: P = [0.3, 2.4];
  const r = 3;
  const half = Math.sqrt(r * r - 2.4 * 2.4);
  const C: P = [0.3 - half, 0];
  const D: P = [0.3 + half, 0];
  const E: P = [0.3, -2.4];
  s.seg(R(A), R(B));
  s.arc(R(Pp), r, dirOf(Pp, C) - 12 + rot, dirOf(Pp, D) + 12 + rot, 'muted');
  for (const c of [C, D]) s.arc(R(c), r, dirOf(c, E) - 14 + rot, dirOf(c, E) + 14 + rot, 'muted');
  s.seg(R(Pp), R(E), { color: 'accent' });
  s.rightMark(R([0.3, 0]), rot, 0.32);
  for (const p of [A, B, Pp]) s.dot(R(p));
  for (const p of [C, D, E]) s.dot(R(p), 'muted');
  s.endLabel(R(A), 180 + rot, 'A').endLabel(R(B), rot, 'B').endLabel(R(Pp), 90 + rot, 'P');
  s.endLabel(R(C), 240 + rot, 'C').endLabel(R(D), 300 + rot, 'D').endLabel(R(E), 270 + rot, 'E');
  return s.build({ margin: 0.5 });
}

// ---------------------------------------------------------------------------
// Construction steps (for "put the steps in order")
// ---------------------------------------------------------------------------

interface Construction {
  /** What is being built, after "to construct ...". */
  goal: string;
  tools: string;
  steps: string[];
  /** A few words for each step, for the last line of the solution. */
  short: string[];
  /** Why the order matters, for the solution. */
  why: string;
  figure?: () => PlaneFigure;
}

const PERP_CONSTRUCTIONS: Construction[] = [
  {
    goal: 'a line segment through point $P$ on segment $AB$ that is perpendicular to $AB$',
    tools: 'a compass and a ruler',
    short: ['arcs from $P$ make $C$ and $D$', 'arc from $C$', 'arc from $D$ makes $E$', 'join $P$ and $E$'],
    steps: [
      'Place the compass point on $P$. Draw an arc on each side of $P$ that crosses $AB$. Label the crossings $C$ and $D$.',
      'Open the compass wider. Place the compass point on $C$ and draw an arc above $AB$.',
      'Keep the same opening. Place the compass point on $D$ and draw an arc that crosses the last arc. Label the crossing $E$.',
      'Use the ruler to join $P$ and $E$. Segment $PE$ is perpendicular to $AB$.',
    ],
    why: 'You need points $C$ and $D$ before you can draw arcs from them, and you need point $E$ before you can join it to $P$.',
    figure: () => perpThroughFigure(),
  },
  {
    goal: 'a line segment from point $P$ (not on segment $AB$) that is perpendicular to $AB$',
    tools: 'a compass and a ruler',
    short: ['arc from $P$ makes $C$ and $D$', 'arc from $C$', 'arc from $D$ makes $E$', 'join $P$ and $E$'],
    steps: [
      'Place the compass point on $P$. Draw an arc that crosses $AB$ at two points. Label them $C$ and $D$.',
      'Place the compass point on $C$. Draw an arc on the other side of $AB$ from $P$.',
      'Keep the same opening. Place the compass point on $D$ and draw an arc that crosses the last arc. Label the crossing $E$.',
      'Use the ruler to join $P$ and $E$. Segment $PE$ is perpendicular to $AB$.',
    ],
    why: 'The first arc makes points $C$ and $D$. The arcs from $C$ and $D$ make point $E$. Only then can you join $P$ and $E$.',
    figure: () => perpFromPointFigure(),
  },
  {
    goal: 'a line segment through point $P$ that is parallel to segment $AB$',
    tools: 'a ruler and a set square (a plastic right triangle)',
    short: ['set square on $AB$', 'ruler against the set square', 'slide to $P$', 'draw through $P$'],
    steps: [
      'Line up one edge of the set square exactly along $AB$.',
      'Place the ruler firmly against another edge of the set square.',
      'Hold the ruler still. Slide the set square along the ruler until its first edge passes through $P$.',
      'Draw a line segment through $P$ along that edge. It is parallel to $AB$.',
    ],
    why: 'The set square must start on $AB$, the ruler keeps it from turning, and you draw only once the edge reaches $P$.',
  },
  {
    goal: 'a line segment through point $P$ on segment $AB$ that is perpendicular to $AB$',
    tools: 'tracing paper (by folding)',
    short: ['draw $AB$ and $P$', 'fold through $P$', 'match the two parts of $AB$ and crease', 'unfold and draw along the crease'],
    steps: [
      'Draw segment $AB$ on tracing paper and mark point $P$ on it.',
      'Fold the paper so that the fold passes through $P$.',
      'Line up the two parts of $AB$ exactly on top of each other, then crease the fold.',
      'Unfold the paper and draw a segment along the crease. It is perpendicular to $AB$.',
    ],
    why: 'You need the segment and point first, then the fold, then the crease, and you draw along the crease last.',
  },
];

const BISECT_CONSTRUCTIONS: Construction[] = [
  {
    goal: 'the perpendicular bisector of segment $AB$',
    tools: 'a compass and a ruler',
    short: ['set the compass', 'arcs from $A$', 'arcs from $B$ make $C$ and $D$', 'join $C$ and $D$'],
    steps: [
      'Open the compass to more than half the length of $AB$.',
      'Place the compass point on $A$. Draw an arc above $AB$ and an arc below $AB$.',
      'Keep the same opening. Place the compass point on $B$ and draw arcs that cross the first two arcs. Label the crossings $C$ and $D$.',
      'Use the ruler to join $C$ and $D$. Line segment $CD$ is the perpendicular bisector of $AB$.',
    ],
    why: 'The compass must be set before you draw. The arcs from $B$ must cross the arcs from $A$, and you join $C$ and $D$ last.',
    figure: () => perpBisectorConstruction(),
  },
  {
    goal: 'the bisector of $\\angle ABC$',
    tools: 'a compass and a ruler',
    short: ['arc from $B$ makes $D$ and $E$', 'arc from $D$', 'arc from $E$ makes $F$', 'draw ray $BF$'],
    steps: [
      'Place the compass point on the vertex $B$. Draw an arc that crosses both arms. Label the crossings $D$ and $E$.',
      'Place the compass point on $D$. Draw an arc inside the angle.',
      'Keep the same opening. Place the compass point on $E$ and draw an arc that crosses the last arc. Label the crossing $F$.',
      'Use the ruler to draw ray $BF$. It bisects $\\angle ABC$.',
    ],
    why: 'Points $D$ and $E$ come from the first arc. The arcs from $D$ and $E$ make point $F$, and you draw ray $BF$ last.',
    figure: () => angleBisectorConstruction(),
  },
  {
    goal: 'the perpendicular bisector of segment $AB$',
    tools: 'a ruler and a protractor',
    short: ['measure $AB$', 'mark the midpoint $M$', 'mark $90^\\circ$ at $M$', 'draw the line'],
    steps: [
      'Measure the length of $AB$ with the ruler.',
      'Divide the length by $2$. Mark the midpoint $M$ of $AB$.',
      'Place the centre of the protractor on $M$, with its zero line along $AB$. Mark a point at $90^\\circ$.',
      'Draw a line through $M$ and the $90^\\circ$ mark. It is the perpendicular bisector of $AB$.',
    ],
    why: 'You need the length to find the midpoint, and the midpoint to place the protractor. You draw the line last.',
  },
  {
    goal: 'the bisector of $\\angle ABC$',
    tools: 'a protractor and a ruler',
    short: ['measure the angle', 'halve it', 'mark $D$', 'draw ray $BD$'],
    steps: [
      'Measure $\\angle ABC$ with the protractor.',
      'Divide the measure by $2$.',
      'Place the centre of the protractor on $B$, with its zero line along arm $BA$. Mark point $D$ at half the measure.',
      'Use the ruler to draw ray $BD$. It bisects $\\angle ABC$.',
    ],
    why: 'You must know the whole angle before you can halve it, and you need point $D$ before you can draw ray $BD$.',
  },
  {
    goal: 'the perpendicular bisector of segment $AB$',
    tools: 'tracing paper (by folding)',
    short: ['draw $AB$', 'fold $A$ onto $B$', 'crease and unfold', 'draw along the crease'],
    steps: [
      'Draw segment $AB$ on tracing paper.',
      'Fold the paper so that point $A$ lands exactly on point $B$.',
      'Crease the fold, then unfold the paper.',
      'Draw a line along the crease. It is the perpendicular bisector of $AB$.',
    ],
    why: 'Draw the segment first, fold $A$ onto $B$, crease and unfold, then draw along the crease.',
  },
  {
    goal: 'the bisector of $\\angle ABC$',
    tools: 'tracing paper (by folding)',
    short: ['draw the angle', 'fold arm $BA$ onto arm $BC$', 'crease and unfold', 'draw along the crease'],
    steps: [
      'Draw $\\angle ABC$ on tracing paper.',
      'Fold the paper through the vertex $B$ so that arm $BA$ lies exactly on top of arm $BC$.',
      'Crease the fold, then unfold the paper.',
      'Draw a ray from $B$ along the crease. It bisects $\\angle ABC$.',
    ],
    why: 'Draw the angle first, fold one arm onto the other, crease and unfold, then draw along the crease.',
  },
];

function orderItem(rng: Rng, list: Construction[], who: string): GenOutput {
  const c = rng.pick(list);
  const ids = 'abcd';
  const shown = retry(
    () => rng.shuffle(c.steps),
    (s) => s.some((x, i) => x !== c.steps[i]),
  );
  const items: Choice[] = shown.map((md, i) => ({ id: ids[i], md }));
  const idOf = (st: string) => items[shown.indexOf(st)].id;
  const fig = c.figure ? c.figure() : undefined;
  return {
    prompt: `${who} uses ${c.tools} to construct ${c.goal}. Put the steps in order, from first to last.${fig ? ' The drawing shows the finished construction.' : ''}`,
    ...(fig ? { figure: fig } : {}),
    parts: [{ answer: { kind: 'order', items, correctOrder: c.steps.map(idOf) } }],
    hints: ['Look for the step that needs nothing from another step: it must come first.', 'A point, an arc or a measurement must be made in one step before another step can use it.'],
    solution: [...c.steps.map((st, i) => `Step ${i + 1}: ${st}`), c.why, `The order is: ${c.short.join(', then ')}.`],
  };
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — Parallel and perpendicular line segments
// ---------------------------------------------------------------------------

type PairKind = 'parallel' | 'perpendicular' | 'crossing' | 'converging';

/** Two line segments drawn at a random turn: parallel, perpendicular, crossing at a slant, or slowly closing in. */
function pairFigure(rng: Rng, kind: PairKind): PlaneFigure {
  const s = new Sketch();
  const rot = rng.int(0, 11) * 15;
  const R = (p: P) => turn(p, rot);
  let a: [P, P];
  let b: [P, P];
  if (kind === 'parallel') {
    const gap = rng.pick([1.5, 1.9, 2.3]);
    const sh = rng.pick([-0.8, -0.4, 0.4, 0.8]);
    a = [[-2.6, gap / 2], [2.4, gap / 2]];
    b = [[-2.3 + sh, -gap / 2], [2.6 + sh / 2, -gap / 2]];
  } else if (kind === 'perpendicular') {
    const t = rng.pick([-1.2, -0.6, 0, 0.6, 1.2]);
    a = [[-2.6, 0], [2.6, 0]];
    b = rng.chance(0.4) ? [[t, 0], [t, 2.8]] : [[t, -2.2], [t, 2.4]];
  } else if (kind === 'crossing') {
    const th = rng.pick([50, 55, 60, 120, 125, 130]);
    const t = rng.pick([-0.8, 0, 0.8]);
    a = [[-2.6, 0], [2.6, 0]];
    b = [at([t, 0], th + 180, 2.2), at([t, 0], th, 2.6)];
  } else {
    a = [[-2.6, 1], [2.6, 1]];
    b = rng.chance(0.5) ? [[-2.6, -1.4], [2.6, 0.2]] : [[-2.6, 0.2], [2.6, -1.4]];
  }
  s.seg(R(a[0]), R(a[1])).seg(R(b[0]), R(b[1]));
  return s.build({ margin: 0.6 });
}

const PAIR_RULE = {
  parallel: '**Parallel** line segments are always the same distance apart. They never meet, even if you make them longer.',
  perpendicular: '**Perpendicular** line segments meet at a right angle ($90^\\circ$), a square corner.',
};

interface Example {
  md: string;
  kind: 'parallel' | 'perpendicular' | 'neither';
}

const EXAMPLES: Example[] = [
  { md: 'The two rails of a straight train track', kind: 'parallel' },
  { md: 'The yard lines on a football field', kind: 'parallel' },
  { md: 'The strings of a guitar', kind: 'parallel' },
  { md: 'Two lines on a sheet of lined paper', kind: 'parallel' },
  { md: 'The two long edges of a ruler', kind: 'parallel' },
  { md: 'The two blue lines on a hockey rink', kind: 'parallel' },
  { md: 'Two lanes beside each other on a straight stretch of highway', kind: 'parallel' },
  { md: 'Two edges that meet at the corner of a sheet of paper', kind: 'perpendicular' },
  { md: 'A soccer goalpost and the crossbar on top of it', kind: 'perpendicular' },
  { md: 'The blue line and the side boards of a hockey rink', kind: 'perpendicular' },
  { md: 'A flagpole and the flat ground it stands on', kind: 'perpendicular' },
  { md: 'One rung of a ladder and one of its side rails', kind: 'perpendicular' },
  { md: 'A guitar string and one of the frets it crosses', kind: 'perpendicular' },
  { md: 'The hands of a clock at 2:00', kind: 'neither' },
  { md: 'The two cut edges of a slice of pizza', kind: 'neither' },
  { md: 'The two blades of a pair of open scissors', kind: 'neither' },
  { md: 'A skateboard ramp and the flat ground', kind: 'neither' },
  { md: 'The two sides of the letter V', kind: 'neither' },
  { md: 'The two sloped edges of a tent seen from the front', kind: 'neither' },
];

/** A quadrilateral or pentagon on grid paper with its sides compared. */
interface GridShape {
  pts: P[];
}

function baseShape(rng: Rng): P[] {
  const kind = rng.pick(['rightTrap', 'parallelogram', 'trapezoid', 'kite', 'house', 'quad'] as const);
  if (kind === 'rightTrap') {
    const w = rng.int(4, 7);
    const h = rng.int(3, 5);
    const t = rng.intExcept(1, w + 2, [w]);
    return [[0, 0], [w, 0], [t, h], [0, h]];
  }
  if (kind === 'parallelogram') {
    const w = rng.int(3, 6);
    const h = rng.int(2, 4);
    const sh = rng.pick([-2, -1, 1, 2, 3]);
    return [[0, 0], [w, 0], [w + sh, h], [sh, h]];
  }
  if (kind === 'trapezoid') {
    const s1 = rng.int(1, 2);
    const s2 = rng.int(1, 3);
    const w = rng.int(s1 + s2 + 2, 8);
    const h = rng.int(2, 4);
    return [[0, 0], [w, 0], [w - s2, h], [s1, h]];
  }
  if (kind === 'kite') {
    const a = rng.int(2, 3);
    const b = rng.int(1, 2);
    const c = rng.int(3, 5);
    return [[0, 0], [a, b], [0, b + c], [-a, b]];
  }
  if (kind === 'house') {
    const w = rng.pick([4, 6]);
    const h = rng.int(2, 4);
    const r = rng.int(1, 3);
    return [[0, 0], [w, 0], [w, h], [w / 2, h + r], [0, h]];
  }
  // A quadrilateral with a right angle at the first vertex.
  const w = rng.int(3, 6);
  const h = rng.int(3, 5);
  return [[0, 0], [w, 0], [rng.intExcept(w - 1, w + 2, [w]), h + rng.int(1, 2)], [0, h]];
}

function placeShape(rng: Rng, pts: P[]): GridShape {
  const k = rng.int(0, 3);
  const mirror = rng.chance(0.5);
  let q = pts.map(([x, y]) => [mirror ? -x : x, y] as P);
  for (let i = 0; i < k; i++) q = q.map(([x, y]) => [-y, x] as P);
  const minX = Math.min(...q.map((p) => p[0]));
  const minY = Math.min(...q.map((p) => p[1]));
  q = q.map(([x, y]) => [x - minX + 1, y - minY + 1] as P);
  // Keep the vertices counterclockwise, then start the names at a random vertex.
  let area = 0;
  for (let i = 0; i < q.length; i++) area += q[i][0] * q[(i + 1) % q.length][1] - q[(i + 1) % q.length][0] * q[i][1];
  if (area < 0) q.reverse();
  const start = rng.int(0, q.length - 1);
  return { pts: [...q.slice(start), ...q.slice(0, start)] };
}

const LETTERS = 'ABCDEFGH';
const sideName = (n: number, i: number) => `${LETTERS[i]}${LETTERS[(i + 1) % n]}`;
const vec = (pts: P[], i: number): P => {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  return [b[0] - a[0], b[1] - a[1]];
};
const isPar = (u: P, v: P) => u[0] * v[1] - u[1] * v[0] === 0;
const isPerp = (u: P, v: P) => u[0] * v[0] + u[1] * v[1] === 0;

function shapeFigure(sh: GridShape): PlaneFigure {
  const s = new Sketch();
  const W = Math.max(...sh.pts.map((p) => p[0])) + 1;
  const H = Math.max(...sh.pts.map((p) => p[1])) + 1;
  const size = Math.max(W, H, 7);
  // Centre the shape on the square sheet of grid paper.
  const pts = sh.pts.map(([x, y]) => [x + Math.floor((size - W) / 2), y + Math.floor((size - H) / 2)] as P);
  s.polygon(pts);
  const c = centroid(pts);
  pts.forEach((p) => s.dot(p));
  pts.forEach((p, i) => s.endLabel(p, dirOf(c, p), LETTERS[i]));
  return s.buildGrid({ xMin: 0, xMax: size, yMin: 0, yMax: size }, { numbers: false });
}

/** Run and rise between two grid points, in words. */
function moveWords(dx: number, dy: number): string {
  const parts: string[] = [];
  if (dx) parts.push(`${Math.abs(dx)} ${dx > 0 ? 'right' : 'left'}`);
  if (dy) parts.push(`${Math.abs(dy)} ${dy > 0 ? 'up' : 'down'}`);
  return parts.join(', ');
}

function sideQuestion(rng: Rng): GenOutput {
  for (;;) {
    const sh = placeShape(rng, baseShape(rng));
    const n = sh.pts.length;
    const opts: Array<{ i: number; rel: 'parallel' | 'perpendicular'; hits: number[] }> = [];
    for (let i = 0; i < n; i++) {
      for (const rel of ['parallel', 'perpendicular'] as const) {
        const hits = [...Array(n).keys()].filter((j) => j !== i && (rel === 'parallel' ? isPar(vec(sh.pts, i), vec(sh.pts, j)) : isPerp(vec(sh.pts, i), vec(sh.pts, j))));
        if (hits.length <= 1) opts.push({ i, rel, hits });
      }
    }
    const one = opts.filter((o) => o.hits.length === 1);
    const none = opts.filter((o) => o.hits.length === 0);
    if (!one.length) continue;
    const q = none.length && rng.chance(0.2) ? rng.pick(none) : rng.pick(one);
    const others = [...Array(n).keys()].filter((j) => j !== q.i);
    const shownSides = others.length > 3 ? [...(q.hits.length ? q.hits : []), ...rng.sample(others.filter((j) => !q.hits.includes(j)), 3 - q.hits.length)].sort((a, b) => a - b) : others;
    const names = shownSides.map((j) => `Side $${sideName(n, j)}$`);
    const noneMd = 'None of the other sides';
    const correctMd = q.hits.length ? `Side $${sideName(n, q.hits[0])}$` : noneMd;
    const answer = fixedChoice([...names, noneMd], q.hits.length ? shownSides.indexOf(q.hits[0]) : names.length);
    const name = sideName(n, q.i);
    const [ux, uy] = vec(sh.pts, q.i);
    const ruleLine = q.rel === 'parallel'
      ? 'Parallel sides go in the same direction: count the same run and rise (or both flat, or both straight up and down).'
      : 'Perpendicular sides meet at a square corner, like the corner of a grid square.';
    const steps = [
      PAIR_RULE[q.rel],
      `Side $${name}$ goes ${moveWords(ux, uy)} on the grid.`,
      ...shownSides.map((j) => {
        const [vx, vy] = vec(sh.pts, j);
        const par = isPar([ux, uy], [vx, vy]);
        const perp = isPerp([ux, uy], [vx, vy]);
        return `Side $${sideName(n, j)}$ goes ${moveWords(vx, vy)}: ${par ? 'parallel to' : perp ? 'perpendicular to' : 'neither parallel nor perpendicular to'} $${name}$.`;
      }),
      q.hits.length ? `The answer is side $${sideName(n, q.hits[0])}$.` : `No other side is ${q.rel} to $${name}$. The answer is "${noneMd}".`,
    ];
    return {
      prompt: `The shape is drawn on grid paper. Which side is **${q.rel}** to side $${name}$?`,
      figure: shapeFigure(sh),
      parts: [{ answer }],
      hints: [ruleLine, 'Count squares along each side: how far across and how far up or down does it go?'],
      solution: steps,
      answerDisplay: correctMd,
    };
  }
}

/** An L-shaped hexagon: select every side parallel (or perpendicular) to side AB. */
function lShapeQuestion(rng: Rng): GenOutput {
  const w = rng.int(5, 7);
  const h = rng.int(4, 6);
  const a = rng.int(2, w - 2);
  const b = rng.int(2, h - 2);
  const base: P[] = [[0, 0], [w, 0], [w, b], [a, b], [a, h], [0, h]];
  const sh = placeShape(rng, base);
  const n = sh.pts.length;
  const i = rng.int(0, n - 1);
  const rel = rng.pick(['parallel', 'perpendicular'] as const);
  const u = vec(sh.pts, i);
  const name = sideName(n, i);
  const others = [...Array(n).keys()].filter((j) => j !== i);
  const answer = multi(rng, others.map((j) => ({ md: `$${sideName(n, j)}$`, correct: rel === 'parallel' ? isPar(u, vec(sh.pts, j)) : isPerp(u, vec(sh.pts, j)) })), true);
  const hits = others.filter((j) => (rel === 'parallel' ? isPar(u, vec(sh.pts, j)) : isPerp(u, vec(sh.pts, j))));
  const dirWord = u[0] === 0 ? 'up and down (vertical)' : 'across (horizontal)';
  return {
    prompt: `The shape is drawn on grid paper. Select **all** the sides that are ${rel} to side $${name}$.`,
    figure: shapeFigure(sh),
    parts: [{ answer }],
    hints: [PAIR_RULE[rel], `Side $${name}$ runs ${dirWord}. Which sides run ${rel === 'parallel' ? 'the same way' : 'the other way, making square corners'}?`],
    solution: [
      PAIR_RULE[rel],
      `Every side of this shape runs either across or up and down. Side $${name}$ runs ${dirWord}.`,
      rel === 'parallel' ? `The other sides that run the same way are parallel to it.` : `The sides that run the other way meet it, or would meet it, at a square corner.`,
      `The sides ${rel} to $${name}$ are ${hits.map((j) => `$${sideName(n, j)}$`).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
    ],
    answerDisplay: hits.map((j) => `$${sideName(n, j)}$`).join(', '),
  };
}

/** Two perpendicular segments crossing at E, with ray EF splitting one right angle. */
export function perpAngleFigure(given: number, rot: number, showGiven: string, showX: string): PlaneFigure {
  const s = new Sketch();
  const E: P = [0, 0];
  const R = (a: number) => a + rot;
  const A = at(E, R(180), 3.2);
  const B = at(E, R(0), 3.2);
  const C = at(E, R(90), 3.2);
  const D = at(E, R(270), 3.2);
  const F = at(E, R(180 - given), 3.4);
  s.seg(A, B).seg(C, D);
  s.seg(E, F, { color: 'accent' });
  s.rightMark(E, R(270), 0.38);
  s.arc(E, 0.85, R(180 - given), R(180));
  s.arc(E, 1.15, R(90), R(180 - given));
  s.dot(E);
  s.endLabel(A, R(180), 'A').endLabel(B, R(0), 'B').endLabel(C, R(90), 'C').endLabel(D, R(270), 'D').endLabel(F, R(180 - given), 'F');
  s.endLabel(E, R(315), 'E');
  s.angleLabel(E, R(180 - given), R(180), showGiven, 34);
  s.angleLabel(E, R(90), R(180 - given), showX, 40);
  return s.build({ margin: 0.6 });
}

const PERP_CTX: Array<{ text: (a: number) => string; ask: string }> = [
  {
    text: (a) => `Segments $AB$ and $CD$ are perpendicular. They cross at point $E$. Ray $EF$ is drawn between $EA$ and $EC$, and $\\angle AEF = ${deg(a)}$.`,
    ask: 'What is the measure of $\\angle FEC$?',
  },
  {
    text: (a) => `On a town map, Main Street ($AB$) and Centre Avenue ($CD$) are perpendicular and cross at $E$. A bike path $EF$ leaves the corner and makes an angle of $${deg(a)}$ with Main Street.`,
    ask: 'What angle, $\\angle FEC$, does the bike path make with Centre Avenue?',
  },
  {
    text: (a) => `The two sticks of a kite, $AB$ and $CD$, are perpendicular and cross at $E$. A string $EF$ is tied at $E$ and makes an angle of $${deg(a)}$ with stick $EA$.`,
    ask: 'What angle, $\\angle FEC$, does the string make with stick $EC$?',
  },
  {
    text: (a) => `In a school logo, segments $AB$ and $CD$ are perpendicular and cross at $E$. A third segment, $EF$, makes an angle of $${deg(a)}$ with $EA$.`,
    ask: 'What is the measure of $\\angle FEC$?',
  },
];

function perpAngleItem(rng: Rng): GenOutput {
  const a = rng.int(4, 14) * 5 + rng.pick([0, 0, 2, 3]);
  const x = 90 - a;
  const ctx = rng.pick(PERP_CTX);
  return {
    prompt: `${ctx.text(a)} ${ctx.ask}`,
    figure: perpAngleFigure(a, rng.int(0, 7) * 15 - 45, `${a}°`, 'x'),
    parts: [numPart(x, { suffix: '°' })],
    hints: ['Perpendicular segments meet at a right angle. How many degrees is that?', `$\\angle AEF$ and $\\angle FEC$ together make the right angle $\\angle AEC$.`],
    solution: [
      'Perpendicular segments meet at $90^\\circ$, so $\\angle AEC = 90^\\circ$.',
      `Ray $EF$ splits that right angle into two parts: $\\angle AEF + \\angle FEC = 90^\\circ$.`,
      `$\\angle FEC = 90^\\circ - ${deg(a)} = ${deg(x)}$`,
      `The answer is $${deg(x)}$.`,
    ],
  };
}

function distanceCheckItem(rng: Rng, who: string): GenOutput {
  const d1 = rng.int(18, 52) / 10;
  const same = rng.chance(0.5);
  const d2 = same ? d1 : d1 + rng.pick([-0.6, -0.4, -0.3, 0.3, 0.4, 0.6]);
  const lenA = rng.int(8, 14);
  const lenB = lenA + rng.pick([-3, -2, 2, 3]);
  const choices = [
    'Yes. The distance between them is the same at both ends.',
    'No. The distances are different, so the segments would meet if they were made longer.',
    'Yes, because both segments are straight.',
    'No, because the segments are different lengths.',
  ];
  return {
    prompt: `${who} draws segment $AB$, $${cm(lenA)}$ long, and segment $CD$, $${cm(lenB)}$ long, on the same page. ${who} measures the distance between them at both ends, at right angles to $AB$: $${cm(d1)}$ at the left end and $${cm(d2)}$ at the right end. Are $AB$ and $CD$ parallel?`,
    parts: [{ answer: fixedChoice(choices, same ? 0 : 1) }],
    hints: ['Parallel segments stay the same distance apart everywhere.', 'Compare the two distances. The lengths of the segments do not matter.'],
    solution: [
      PAIR_RULE.parallel,
      same ? `The distances are $${cm(d1)}$ and $${cm(d2)}$. They are the same.` : `The distances are $${cm(d1)}$ and $${cm(d2)}$. They are different, so the segments get ${d2 < d1 ? 'closer together to the right' : 'farther apart to the right'}.`,
      'Two segments can be parallel even when one is longer than the other.',
      same ? 'Yes, $AB$ and $CD$ are parallel.' : 'No, $AB$ and $CD$ are not parallel.',
    ],
    answerDisplay: choices[same ? 0 : 1],
  };
}

/** A first-quadrant grid with numbers. */
const Q1: GridSpec = { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
const inQ1 = (p: P) => p[0] >= 0 && p[0] <= 10 && p[1] >= 0 && p[1] <= 10;
const ptx = (p: P) => `(${p[0]}, ${p[1]})`;

function parallelOnGrid(rng: Rng): GenOutput {
  for (;;) {
    const dx = rng.int(2, 5);
    const dy = rng.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
    const A: P = [rng.int(0, 10), rng.int(0, 10)];
    const B: P = [A[0] + dx, A[1] + dy];
    const C: P = [rng.int(0, 10), rng.int(0, 10)];
    const D: P = [C[0] + dx, C[1] + dy];
    if (![B, D].every(inQ1)) continue;
    // C must not lie on line AB, and the two segments should be at least 2 units apart.
    const cross = dx * (C[1] - A[1]) - dy * (C[0] - A[0]);
    if (Math.abs(cross) / Math.hypot(dx, dy) < 1.8) continue;
    const s = new Sketch();
    s.seg(A, B).dot(A).dot(B).dot(C, 'accent');
    s.endLabel(A, dirOf(B, A), 'A').endLabel(B, dirOf(A, B), 'B').endLabel(C, dirOf(D, C), 'C');
    return {
      prompt: `Draw segment $CD$ so that it is **parallel** to segment $AB$ and the **same length**. Point $D$ is to the right of $C$. What are the coordinates of $D$?`,
      figure: s.buildGrid(Q1),
      parts: [part({ kind: 'point', x: D[0], y: D[1] }, { label: '$D$ =', placeholder: '(x, y)' })],
      hints: ['Parallel segments go in the same direction. Count how far across and how far up or down you go from $A$ to $B$.', 'Make the same move starting at $C$.'],
      solution: [
        `$A$ is at $${ptx(A)}$ and $B$ is at $${ptx(B)}$.`,
        `From $A$ to $B$: ${dx} right and ${Math.abs(dy)} ${dy > 0 ? 'up' : 'down'}.`,
        `Make the same move from $C${ptx(C)}$: $x = ${C[0]} + ${dx} = ${D[0]}$ and $y = ${C[1]} ${dy > 0 ? '+' : '-'} ${Math.abs(dy)} = ${D[1]}$.`,
        `$D$ is at $${ptx(D)}$.`,
      ],
      answerDisplay: `$${ptx(D)}$`,
    };
  }
}

function perpendicularFoot(rng: Rng, who: string): GenOutput {
  for (;;) {
    const vertical = rng.chance(0.5);
    const k = rng.int(1, 9);
    const lo = rng.int(0, 3);
    const hi = rng.int(7, 10);
    const along = rng.int(lo + 1, hi - 1);
    const off = rng.intExcept(0, 10, [k]);
    if (Math.abs(off - k) < 2) continue;
    const A: P = vertical ? [k, lo] : [lo, k];
    const B: P = vertical ? [k, hi] : [hi, k];
    const C: P = vertical ? [off, along] : [along, off];
    const D: P = vertical ? [k, along] : [along, k];
    const dist = Math.abs(off - k);
    const s = new Sketch();
    s.seg(A, B).dot(A).dot(B).dot(C, 'accent');
    s.endLabel(A, dirOf(B, A), 'A').endLabel(B, dirOf(A, B), 'B').endLabel(C, dirOf(D, C), 'C');
    const ctx = rng.pick([
      `${who} wants to draw the shortest path from point $C$ to segment $AB$. The shortest path is the segment from $C$ that is **perpendicular** to $AB$.`,
      `A straight fence runs from $A$ to $B$. ${who} stands at point $C$ and walks straight to the fence along a path **perpendicular** to it.`,
      `Draw a segment from point $C$ that is **perpendicular** to segment $AB$ and ends on $AB$.`,
    ]);
    return {
      prompt: `${ctx} Each grid square is $1$ unit. Where does the path meet $AB$, and how long is it?`,
      figure: s.buildGrid(Q1),
      parts: [
        part({ kind: 'point', x: D[0], y: D[1] }, { label: 'It meets $AB$ at', placeholder: '(x, y)' }),
        numPart(dist, { label: 'Length:', suffix: 'units' }),
      ],
      hints: [`Segment $AB$ is ${vertical ? 'vertical (straight up and down)' : 'horizontal (straight across)'}. A perpendicular segment is ${vertical ? 'horizontal' : 'vertical'}.`, `From $C$, move straight ${vertical ? 'across' : 'up or down'} until you reach $AB$.`],
      solution: [
        `$AB$ is ${vertical ? 'vertical' : 'horizontal'}, so the perpendicular path from $C$ is ${vertical ? 'horizontal' : 'vertical'}.`,
        vertical ? `Moving across, $y$ stays $${along}$. $AB$ is the line where $x = ${k}$.` : `Moving up or down, $x$ stays $${along}$. $AB$ is the line where $y = ${k}$.`,
        `The path meets $AB$ at $${ptx(D)}$.`,
        `Its length is $|${off} - ${k}| = ${dist}$ units.`,
        `It meets $AB$ at $${ptx(D)}$, and it is $${dist}$ units long.`,
      ],
    };
  }
}

const parallelPerpendicular = skill({
  id: 'm7-parallel-perpendicular',
  name: 'Parallel and perpendicular line segments',
  description: 'Identify parallel and perpendicular line segments in drawings, shapes and the world, use the 90° angle and the equal distance apart, and order the steps of a construction.',
  outcomes: ['SS3'],
  lessonId: 'm7-8-1',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      const kind = rng.pick(['parallel', 'perpendicular'] as const);
      if (rng.chance(0.5)) {
        const all: PairKind[] = ['parallel', 'perpendicular', 'crossing', 'converging'];
        const answer = mcFigures(rng, all.map((k) => ({ md: '', figure: pairFigure(rng, k), correct: k === kind })));
        const L = letterOf(answer);
        return {
          prompt: `Which drawing shows a pair of **${kind}** line segments?`,
          parts: [{ answer }],
          hints: [PAIR_RULE[kind], kind === 'parallel' ? 'Imagine making each pair longer. Which pair would never meet?' : 'Look for a square corner, like the corner of a page.'],
          solution: [
            PAIR_RULE[kind],
            kind === 'parallel' ? 'In the other drawings, the segments cross or get closer together, so they would meet.' : 'In the other drawings, the segments do not meet, or they cross at a slant.',
            `Drawing ${L} shows ${kind} segments.`,
          ],
          answerDisplay: `Drawing ${L}`,
        };
      }
      const good = rng.pick(EXAMPLES.filter((e) => e.kind === kind));
      const other = kind === 'parallel' ? 'perpendicular' : 'parallel';
      const bad = [rng.pick(EXAMPLES.filter((e) => e.kind === other)), ...rng.sample(EXAMPLES.filter((e) => e.kind === 'neither'), 2)];
      return {
        prompt: `Which of these is an example of **${kind}** line segments?`,
        parts: [{ answer: mc(rng, good.md, bad.map((b) => b.md)) }],
        hints: [PAIR_RULE[kind], 'Picture each object. Do the two edges meet? If they meet, is it a square corner?'],
        solution: [
          PAIR_RULE[kind],
          `${good.md}: ${kind === 'parallel' ? 'they run side by side and never meet' : 'they meet at a square corner'}.`,
          `${bad[0].md}: ${other}. The other two meet at a slant, so they are neither.`,
          `The answer is: ${good.md.charAt(0).toLowerCase() + good.md.slice(1)}.`,
        ],
        answerDisplay: good.md,
      };
    }
    if (d === 2) {
      const mode = rng.weighted([['side', 3], ['angle', 2], ['distance', 1]] as const);
      if (mode === 'side') return sideQuestion(rng);
      if (mode === 'angle') return perpAngleItem(rng);
      return distanceCheckItem(rng, who);
    }
    const mode = rng.pick(['order', 'grid', 'foot', 'lshape'] as const);
    if (mode === 'order') return orderItem(rng, PERP_CONSTRUCTIONS, who);
    if (mode === 'grid') return parallelOnGrid(rng);
    if (mode === 'foot') return perpendicularFoot(rng, who);
    return lShapeQuestion(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Perpendicular bisectors and angle bisectors
// ---------------------------------------------------------------------------

type BisKind = 'correct' | 'offset' | 'slant' | 'slantOffset';

/** Segment AB on grid paper with a line crossing it. */
function bisectorOption(L: number, kind: BisKind, offset: number, vertical: boolean): PlaneFigure {
  const s = new Sketch();
  const H = L + 2;
  const y0 = H / 2;
  const sw = (p: P): P => (vertical ? [p[1], p[0]] : p);
  const A: P = [1, y0];
  const B: P = [1 + L, y0];
  const mx = 1 + L / 2 + (kind === 'offset' || kind === 'slantOffset' ? offset : 0);
  const slope = kind === 'slant' || kind === 'slantOffset' ? 0.5 : 0;
  const top: P = [mx + slope * (H / 2 - 0.5), H - 0.5];
  const bot: P = [mx - slope * (H / 2 - 0.5), 0.5];
  s.seg(sw(A), sw(B));
  s.seg(sw(bot), sw(top), { color: 'accent' });
  s.dot(sw(A)).dot(sw(B));
  s.endLabel(sw(A), vertical ? 270 : 180, 'A').endLabel(sw(B), vertical ? 90 : 0, 'B');
  return s.buildGrid({ xMin: 0, xMax: H, yMin: 0, yMax: H }, { numbers: false });
}

/** Angle ABC with ray BD at fraction f of the angle. */
function angleRayOption(total: number, base: number, f: number): PlaneFigure {
  const s = new Sketch();
  const B: P = [0, 0];
  s.ray(B, base, 4).ray(B, base + total, 4);
  s.ray(B, base + f * total, 4.3, { color: 'accent' });
  s.dot(B);
  s.endLabel(at(B, base, 4), base - 90, 'A').endLabel(B, base + total / 2 + 180, 'B').endLabel(at(B, base + total, 4), base + total + 90, 'C').endLabel(at(B, base + f * total, 4.3), base + f * total, 'D');
  return s.build({ margin: 0.6 });
}

/** Perpendicular bisector ℓ of AB through M, with P on ℓ and labels. */
export function perpBisFigure(rot: number, labels: { PA?: string; PB?: string; AM?: string; MB?: string; AB?: string }, showP = true): PlaneFigure {
  const s = new Sketch();
  const R = (p: P) => turn(p, rot);
  const A: P = [-2.6, 0];
  const B: P = [2.6, 0];
  const M: P = [0, 0];
  const Pp: P = [0, 3.4];
  s.seg(R(A), R(B));
  s.seg(R([0, -1.6]), R([0, 4.4]), { color: 'accent' });
  s.endLabel(R([0, 4.4]), 90 + rot, 'ℓ');
  s.rightMark(R(M), rot, 0.34);
  s.ticks(R(A), R(M), 1).ticks(R(M), R(B), 1);
  if (showP) {
    s.seg(R(Pp), R(A), { dashed: true }).seg(R(Pp), R(B), { dashed: true });
    s.dot(R(Pp));
    s.endLabel(R(Pp), 90 + rot, 'P');
  }
  s.dot(R(A)).dot(R(B)).dot(R(M), 'accent');
  s.endLabel(R(A), 180 + rot, 'A').endLabel(R(B), rot, 'B').endLabel(R(M), 300 + rot, 'M');
  const c = R([0, 1.2]);
  if (labels.PA) s.sideLabel(R(Pp), R(A), labels.PA, R([1, 1]));
  if (labels.PB) s.sideLabel(R(Pp), R(B), labels.PB, R([-1, 1]));
  if (labels.AM) s.sideLabel(R(A), R(M), labels.AM, c);
  if (labels.MB) s.sideLabel(R(M), R(B), labels.MB, c);
  if (labels.AB) {
    // A dimension line under AB shows the whole length.
    const d0 = R([-2.6, -0.9]);
    const d1 = R([2.6, -0.9]);
    s.seg(d0, d1, { color: 'muted', arrowStart: true, arrowEnd: true });
    s.sideLabel(d0, d1, labels.AB, c);
  }
  return s.build({ margin: 0.7 });
}

/** Angle ABC bisected by ray BD, with optional angle labels. */
export function angleBisFigure(total: number, base: number, labels: { ABD?: string; DBC?: string; ABC?: string }, extraRay?: { f: number; name: string }): PlaneFigure {
  const s = new Sketch();
  const B: P = [0, 0];
  const half = base + total / 2;
  s.ray(B, base, 4.2).ray(B, base + total, 4.2);
  s.ray(B, half, 4.5, { color: 'accent' });
  if (extraRay) s.ray(B, base + extraRay.f * total, 4.5, { color: 'muted' });
  s.dot(B);
  s.endLabel(at(B, base, 4.2), base - 90, 'A').endLabel(B, half + 180, 'B').endLabel(at(B, base + total, 4.2), base + total + 90, 'C').endLabel(at(B, half, 4.5), half, 'D');
  if (extraRay) s.endLabel(at(B, base + extraRay.f * total, 4.5), base + extraRay.f * total, extraRay.name);
  if (labels.ABC) {
    s.arc(B, 1.9, base, base + total, 'muted');
    s.angleLabel(B, base, base + total, labels.ABC, 64);
  }
  if (labels.ABD !== undefined) {
    s.arc(B, 1.05, base, half);
    if (labels.ABD) s.angleLabel(B, base, half, labels.ABD, total < 70 ? 46 : 32);
  }
  if (labels.DBC !== undefined) {
    s.arc(B, 1.25, half, base + total);
    if (labels.DBC) s.angleLabel(B, half, base + total, labels.DBC, total < 70 ? 46 : 32);
  }
  return s.build({ margin: 0.6 });
}

const BIS_RULE = {
  perp: 'The **perpendicular bisector** of a segment crosses it at its **midpoint** and makes a **right angle** ($90^\\circ$) with it.',
  angle: 'An **angle bisector** is a ray that splits an angle into **two equal angles**.',
  equal: 'Every point on the perpendicular bisector of $AB$ is the **same distance** from $A$ as from $B$.',
};

function bisectorPicture(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const L = rng.pick([4, 6, 8]);
    const vertical = rng.chance(0.4);
    const off = rng.pick([-1, 1]) * (L >= 6 ? rng.int(1, 2) : 1);
    const kinds: BisKind[] = ['correct', 'offset', 'slant', 'slantOffset'];
    const answer = mcFigures(rng, kinds.map((k) => ({ md: '', figure: bisectorOption(L, k, off, vertical), correct: k === 'correct' })));
    const Lt = letterOf(answer);
    return {
      prompt: 'Which drawing shows the **perpendicular bisector** of segment $AB$? Each drawing is on grid paper.',
      parts: [{ answer }],
      hints: [BIS_RULE.perp, `Count the squares from $A$ to $B$. The midpoint is halfway, $${L / 2}$ squares from each end.`],
      solution: [
        BIS_RULE.perp,
        `$AB$ is $${L}$ squares long, so its midpoint is $${L / 2}$ squares from $A$.`,
        'Two drawings cross $AB$ away from the midpoint. One crosses at the midpoint but at a slant, not a square corner.',
        `Drawing ${Lt} crosses at the midpoint and at a right angle. It shows the perpendicular bisector.`,
      ],
      answerDisplay: `Drawing ${Lt}`,
    };
  }
  const total = rng.int(16, 30) * 5;
  const base = rng.int(0, 7) * 15 - 30;
  const fr = [0.5, rng.pick([0.2, 0.25]), rng.pick([0.75, 0.8])];
  const answer = mcFigures(rng, fr.map((f) => ({ md: '', figure: angleRayOption(total, base, f), correct: f === 0.5 })));
  const Lt = letterOf(answer);
  return {
    prompt: 'In which drawing is ray $BD$ the **bisector** of $\\angle ABC$?',
    parts: [{ answer }],
    hints: [BIS_RULE.angle, 'Compare the two angles on each side of ray $BD$. Are they the same size?'],
    solution: [BIS_RULE.angle, 'In two drawings, ray $BD$ is much closer to one arm than the other, so the two angles are not equal.', `In drawing ${Lt}, ray $BD$ is exactly halfway between the arms. It bisects $\\angle ABC$.`],
    answerDisplay: `Drawing ${Lt}`,
  };
}

function bisectorFact(rng: Rng, d: Difficulty): GenOutput {
  const rot = rng.int(0, 7) * 15 - 45;
  const kind = d === 1 ? rng.pick(['half', 'whole', 'equalAngle', 'equalSide', 'halfAngle', 'right'] as const) : rng.pick(['equalSide', 'double', 'whole', 'halfAngle'] as const);
  if (kind === 'equalSide') {
    const pa = d === 1 ? rng.int(4, 12) : rng.int(35, 125) / 10;
    const am = d === 1 ? rng.int(2, pa - 1) : Math.round(rng.int(15, Math.floor(pa * 10) - 10)) / 10;
    return {
      prompt: `Line $\\ell$ is the perpendicular bisector of segment $AB$. It crosses $AB$ at $M$. Point $P$ is on $\\ell$. $PA = ${cm(pa)}$ and $AM = ${cm(am)}$. What is the length of $PB$?`,
      figure: perpBisFigure(rot, { PA: `${fmt(pa)} cm`, PB: '?', AM: `${fmt(am)} cm` }),
      parts: [numPart(pa, { suffix: 'cm' })],
      hints: [BIS_RULE.equal, 'You do not need $AM$ to find $PB$.'],
      solution: [BIS_RULE.equal, `$P$ is on the perpendicular bisector, so $PB = PA$.`, `$PB = ${cm(pa)}$`, `The answer is $${cm(pa)}$.`],
    };
  }
  if (kind === 'half' || kind === 'whole') {
    const ab = d === 1 ? rng.int(3, 12) * 2 : rng.int(31, 149) / 5;
    const am = ab / 2;
    const askHalf = kind === 'half';
    return {
      prompt: askHalf
        ? `Line $\\ell$ is the perpendicular bisector of segment $AB$. It crosses $AB$ at $M$. $AB = ${cm(ab)}$. What is the length of $AM$?`
        : `Line $\\ell$ is the perpendicular bisector of segment $AB$. It crosses $AB$ at $M$. $MB = ${cm(am)}$. What is the length of $AB$?`,
      figure: perpBisFigure(rot, askHalf ? { AB: `${fmt(ab)} cm` } : { MB: `${fmt(am)} cm` }, false),
      parts: [numPart(askHalf ? am : ab, { suffix: 'cm' })],
      hints: ['A bisector cuts a segment into two equal parts at its midpoint.', askHalf ? 'Divide the whole length by $2$.' : '$AM$ and $MB$ are equal. Add them, or multiply $MB$ by $2$.'],
      solution: askHalf
        ? [BIS_RULE.perp, 'So $M$ is the midpoint and $AM = MB$.', `$AM = ${fmt(ab)} \\div 2 = ${fmt(am)}$`, `The answer is $${cm(am)}$.`]
        : [BIS_RULE.perp, 'So $M$ is the midpoint and $AM = MB$.', `$AB = 2 \\times ${fmt(am)} = ${fmt(ab)}$`, `The answer is $${cm(ab)}$.`],
    };
  }
  if (kind === 'right') {
    const ab = rng.int(4, 12) * 2;
    return {
      prompt: `Line $\\ell$ is the perpendicular bisector of segment $AB$, which is $${cm(ab)}$ long. It crosses $AB$ at $M$. What is the measure of $\\angle PMB$?`,
      figure: perpBisFigure(rot, { AB: `${ab} cm` }),
      parts: [numPart(90, { suffix: '°' })],
      hints: ['What does the word "perpendicular" tell you about the angle?', 'Perpendicular lines meet at a square corner.'],
      solution: [BIS_RULE.perp, 'Line $\\ell$ is perpendicular to $AB$, so every angle where they meet is a right angle. The length of $AB$ does not matter.', 'The answer is $90^\\circ$.'],
    };
  }
  // Angle bisector facts.
  const total = d === 1 ? rng.int(15, 70) * 2 : rng.int(31, 155);
  const base = rng.int(0, 5) * 15 - 15;
  if (kind === 'equalAngle') {
    const half = rng.int(15, 70);
    return {
      prompt: `Ray $BD$ bisects $\\angle ABC$. $\\angle ABD = ${deg(half)}$. What is the measure of $\\angle DBC$?`,
      figure: angleBisFigure(2 * half, base, { ABD: `${half}°`, DBC: '?' }),
      parts: [numPart(half, { suffix: '°' })],
      hints: [BIS_RULE.angle, 'The two angles on each side of ray $BD$ are equal.'],
      solution: [BIS_RULE.angle, `So $\\angle DBC = \\angle ABD$.`, `The answer is $${deg(half)}$.`],
    };
  }
  if (kind === 'double') {
    const half = d === 1 ? rng.int(15, 70) : rng.int(31, 155) / 2;
    return {
      prompt: `Ray $BD$ bisects $\\angle ABC$. $\\angle ABD = ${deg(half)}$. What is the measure of $\\angle ABC$?`,
      figure: angleBisFigure(2 * half, base, { ABD: `${fmt(half)}°`, ABC: '?' }),
      parts: [numPart(2 * half, { suffix: '°' })],
      hints: [BIS_RULE.angle, '$\\angle ABC$ is made of two equal parts.'],
      solution: [BIS_RULE.angle, `So $\\angle ABC = \\angle ABD + \\angle DBC = 2 \\times \\angle ABD$.`, `$\\angle ABC = 2 \\times ${fmt(half)}^\\circ = ${deg(2 * half)}$`, `The answer is $${deg(2 * half)}$.`],
    };
  }
  return {
    prompt: `Ray $BD$ bisects $\\angle ABC$. $\\angle ABC = ${deg(total)}$. What is the measure of $\\angle ABD$?`,
    figure: angleBisFigure(total, base, { ABC: `${total}°`, ABD: '?' }),
    parts: [numPart(total / 2, { suffix: '°' })],
    hints: [BIS_RULE.angle, 'Divide the whole angle by $2$.'],
    solution: [BIS_RULE.angle, `$\\angle ABD = ${fmt(total)}^\\circ \\div 2 = ${deg(total / 2)}$`, `The answer is $${deg(total / 2)}$.`],
  };
}

const MID_CTX: Array<(who: string) => string> = [
  () => 'Points $A$ and $B$ are plotted on the grid.',
  (who) => `On a map of a campground, ${who}'s tent is at $A$ and the washroom is at $B$. A picnic table is at the midpoint of $AB$.`,
  (who) => `${who} is planning a garden on grid paper. A sprinkler goes at the midpoint of the hose $AB$.`,
  () => 'On a map of a park, a straight trail runs from $A$ to $B$. A bench sits at the midpoint of the trail.',
  (who) => `${who} draws segment $AB$ to build its perpendicular bisector. First ${who} needs the midpoint $M$ of $AB$.`,
];

function midpointItem(rng: Rng, who: string): GenOutput {
  for (;;) {
    const A: P = [rng.int(0, 10), rng.int(0, 10)];
    const dx = rng.pick([-8, -6, -4, -2, 0, 2, 4, 6, 8]);
    const dy = rng.pick([-8, -6, -4, -2, 0, 2, 4, 6, 8]);
    const B: P = [A[0] + dx, A[1] + dy];
    if (!inQ1(B) || Math.abs(dx) + Math.abs(dy) < 4) continue;
    const M: P = [A[0] + dx / 2, A[1] + dy / 2];
    const s = new Sketch();
    s.seg(A, B).dot(A).dot(B);
    s.endLabel(A, dirOf(B, A), 'A').endLabel(B, dirOf(A, B), 'B');
    return {
      prompt: `${rng.pick(MID_CTX)(who)} What are the coordinates of the midpoint of $AB$?`,
      figure: s.buildGrid(Q1),
      parts: [part({ kind: 'point', x: M[0], y: M[1] }, { label: 'Midpoint =', placeholder: '(x, y)' })],
      hints: ['The midpoint is halfway from $A$ to $B$: halfway across and halfway up or down.', 'Count the move from $A$ to $B$, then make half of that move from $A$.'],
      solution: [
        `$A$ is at $${ptx(A)}$ and $B$ is at $${ptx(B)}$.`,
        `From $A$ to $B$: ${moveWords(dx, dy)}.`,
        `Half of that move is ${moveWords(dx / 2, dy / 2)}.`,
        `From $A$: $x = ${A[0]} ${dx >= 0 ? '+' : '-'} ${Math.abs(dx / 2)} = ${M[0]}$ and $y = ${A[1]} ${dy >= 0 ? '+' : '-'} ${Math.abs(dy / 2)} = ${M[1]}$.`,
        `The midpoint is $${ptx(M)}$.`,
      ],
      answerDisplay: `$${ptx(M)}$`,
    };
  }
}

function reverseMidpoint(rng: Rng, who: string): GenOutput {
  for (;;) {
    const A: P = [rng.int(0, 10), rng.int(0, 10)];
    const hx = rng.int(-4, 4);
    const hy = rng.int(-4, 4);
    const M: P = [A[0] + hx, A[1] + hy];
    const B: P = [A[0] + 2 * hx, A[1] + 2 * hy];
    if (!inQ1(B) || Math.abs(hx) + Math.abs(hy) < 2) continue;
    const s = new Sketch();
    s.seg(A, M).dot(A).dot(M, 'accent');
    s.endLabel(A, dirOf(M, A), 'A').endLabel(M, dirOf(A, M) + 90, 'M');
    const ctx = rng.pick([
      `$M$ is the midpoint of segment $AB$. Only $A$ and $M$ are shown.`,
      `${who} folds a sheet of grid paper so that point $A$ lands exactly on point $B$. The crease crosses $AB$ at $M$, as shown. Point $B$ is not shown.`,
      `A straight zipline runs from $A$ to $B$. Its midpoint is $M$. Only $A$ and $M$ are shown on the grid.`,
    ]);
    return {
      prompt: `${ctx} What are the coordinates of $B$?`,
      figure: s.buildGrid(Q1),
      parts: [part({ kind: 'point', x: B[0], y: B[1] }, { label: '$B$ =', placeholder: '(x, y)' })],
      hints: ['$M$ is halfway, so $B$ is as far past $M$ as $M$ is from $A$.', 'Count the move from $A$ to $M$. Make the same move again from $M$.'],
      solution: [
        `$A$ is at $${ptx(A)}$ and $M$ is at $${ptx(M)}$.`,
        `From $A$ to $M$: ${moveWords(hx, hy)}.`,
        `Make the same move from $M$: $x = ${M[0]} ${hx >= 0 ? '+' : '-'} ${Math.abs(hx)} = ${B[0]}$ and $y = ${M[1]} ${hy >= 0 ? '+' : '-'} ${Math.abs(hy)} = ${B[1]}$.`,
        `$B$ is at $${ptx(B)}$.`,
      ],
      answerDisplay: `$${ptx(B)}$`,
    };
  }
}

function bisectorMultiStep(rng: Rng): GenOutput {
  const kind = rng.pick(['perimeter', 'equation', 'twice', 'angleEquation'] as const);
  const rot = rng.int(0, 7) * 15 - 45;
  if (kind === 'perimeter') {
    const am = rng.int(25, 70) / 10;
    const pa = Math.round((am + rng.int(10, 60) / 10) * 10) / 10;
    const ab = Math.round(am * 20) / 10;
    const per = Math.round((2 * pa + ab) * 10) / 10;
    return {
      prompt: `Line $\\ell$ is the perpendicular bisector of segment $AB$ and crosses it at $M$. Point $P$ is on $\\ell$. $PA = ${cm(pa)}$ and $AM = ${cm(am)}$. What is the perimeter of triangle $PAB$?`,
      figure: perpBisFigure(rot, { PA: `${fmt(pa)} cm`, AM: `${fmt(am)} cm` }),
      parts: [numPart(per, { suffix: 'cm' })],
      hints: ['Find the two missing sides first: $PB$ and $AB$.', `${BIS_RULE.equal} Also, $M$ is the midpoint of $AB$.`],
      solution: [
        `$P$ is on the perpendicular bisector, so $PB = PA = ${cm(pa)}$.`,
        `$M$ is the midpoint, so $AB = 2 \\times ${fmt(am)} = ${cm(ab)}$.`,
        `Perimeter $= PA + PB + AB = ${fmt(pa)} + ${fmt(pa)} + ${fmt(ab)} = ${fmt(per)}$`,
        `The perimeter is $${cm(per)}$.`,
      ],
    };
  }
  if (kind === 'equation') {
    const a = rng.int(2, 5);
    const x = rng.int(2, 9);
    const b = rng.int(1, 9);
    const pb = a * x + b;
    return {
      prompt: `Line $\\ell$ is the perpendicular bisector of segment $AB$. Point $P$ is on $\\ell$. $PA = (${a}x + ${b})\\ \\text{cm}$ and $PB = ${cm(pb)}$. Find the value of $x$.`,
      figure: perpBisFigure(rot, { PA: `(${a}x + ${b}) cm`, PB: `${pb} cm` }),
      parts: [numPart(x, { label: '$x =$' })],
      hints: [BIS_RULE.equal, `So $${a}x + ${b} = ${pb}$. Solve the equation.`],
      solution: [
        `$P$ is on the perpendicular bisector, so $PA = PB$.`,
        `$${a}x + ${b} = ${pb}$`,
        `Subtract $${b}$ from both sides: $${a}x = ${pb - b}$`,
        `Divide both sides by $${a}$: $x = ${x}$`,
        `The answer is $x = ${x}$.`,
      ],
    };
  }
  if (kind === 'angleEquation') {
    const a = rng.int(2, 4);
    const b = rng.int(1, 9);
    const x = retry(() => rng.int(5, 15), (v) => a * v + b >= 25 && a * v + b <= 75);
    const half = a * x + b;
    const base = rng.int(0, 4) * 15 - 15;
    return {
      prompt: `Ray $BD$ bisects $\\angle ABC$. $\\angle ABD = (${a}x + ${b})^\\circ$ and $\\angle DBC = ${deg(half)}$. Find the value of $x$, then find $\\angle ABC$.`,
      figure: angleBisFigure(2 * half, base, { ABD: `(${a}x + ${b})°`, DBC: `${half}°` }),
      parts: [numPart(x, { label: '$x =$' }), numPart(2 * half, { label: '$\\angle ABC =$', suffix: '°' })],
      hints: [BIS_RULE.angle, `So $${a}x + ${b} = ${half}$. Solve it, then add the two equal angles.`],
      solution: [
        `$BD$ bisects $\\angle ABC$, so $\\angle ABD = \\angle DBC$: $${a}x + ${b} = ${half}$`,
        `Subtract $${b}$: $${a}x = ${half - b}$. Divide by $${a}$: $x = ${x}$`,
        `$\\angle ABC = ${half}^\\circ + ${half}^\\circ = ${deg(2 * half)}$`,
        `The answer is $x = ${x}$ and $\\angle ABC = ${deg(2 * half)}$.`,
      ],
    };
  }
  // A bisector of a bisected angle.
  const k = rng.int(8, 40);
  const total = 4 * k;
  const base = rng.int(0, 4) * 15 - 15;
  return {
    prompt: `$\\angle ABC = ${deg(total)}$. Ray $BD$ bisects $\\angle ABC$. Then ray $BE$ bisects $\\angle DBC$. What is the measure of $\\angle ABE$?`,
    figure: angleBisFigure(total, base, { ABC: `${total}°` }, { f: 0.75, name: 'E' }),
    parts: [numPart(3 * k, { suffix: '°' })],
    hints: ['Find $\\angle ABD$ and $\\angle DBC$ first: each is half of $\\angle ABC$.', 'Then $\\angle DBE$ is half of $\\angle DBC$. Add $\\angle ABD$ and $\\angle DBE$.'],
    solution: [
      `$BD$ bisects $\\angle ABC$: $\\angle ABD = \\angle DBC = ${total}^\\circ \\div 2 = ${deg(2 * k)}$`,
      `$BE$ bisects $\\angle DBC$: $\\angle DBE = ${2 * k}^\\circ \\div 2 = ${deg(k)}$`,
      `$\\angle ABE = \\angle ABD + \\angle DBE = ${2 * k}^\\circ + ${k}^\\circ = ${deg(3 * k)}$`,
      `The answer is $${deg(3 * k)}$.`,
    ],
  };
}

const bisectors = skill({
  id: 'm7-bisectors',
  name: 'Perpendicular bisectors and angle bisectors',
  description: 'Recognize perpendicular bisectors and angle bisectors, use their equal lengths and equal angles, find midpoints on a grid, and order the steps of a construction.',
  outcomes: ['SS3'],
  lessonId: 'm7-8-2',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.5) ? bisectorPicture(rng) : bisectorFact(rng, 1);
    if (d === 2) {
      const mode = rng.weighted([['fact', 3], ['midpoint', 2]] as const);
      return mode === 'fact' ? bisectorFact(rng, 2) : midpointItem(rng, who);
    }
    const mode = rng.pick(['order', 'multi', 'reverse'] as const);
    if (mode === 'order') return orderItem(rng, BISECT_CONSTRUCTIONS, who);
    if (mode === 'reverse') return reverseMidpoint(rng, who);
    return bisectorMultiStep(rng);
  },
});

export const CONSTRUCTIONS_SKILLS: SkillDef[] = [parallelPerpendicular, bisectors];
