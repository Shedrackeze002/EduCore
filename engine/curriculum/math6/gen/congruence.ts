/**
 * Math 6 Unit 7 — Symmetry and Congruence (G1).
 * Also exports the drawing kit and grid transformations used by Unit 8 (the Cartesian plane) and
 * Unit 9 (area).
 */
import { fixedChoice, mcFigures, numPart, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Figure, GridSpec, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

export const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Kiona', 'Thanh', 'Harpreet', 'Marie-Ève', 'Noah', 'Leila', 'Kateri', 'Diego',
];

/** The letter (A, B, C ...) of the correct choice. */
export const letterOf = (answer: AnswerSpec) => (answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A');

// ---------------------------------------------------------------------------
// Drawing kit: sketches whose labels are placed clear of every line (the
// approach of the Math 10-4 shapes unit). Shared by the Math 6 geometry units
// (symmetry, the Cartesian plane and area).
// ---------------------------------------------------------------------------

export type P = [number, number];
export type Color = 'brand' | 'accent' | 'muted';

export const rad = (d: number) => (d * Math.PI) / 180;
export const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
export const dirOf = (a: P, b: P) => norm360((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
export const r3 = (x: number) => Math.round(x * 1000) / 1000;
export const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
/** Rotate p about the origin by a degrees counterclockwise. */
export const turn = (p: P, a: number): P => [p[0] * Math.cos(rad(a)) - p[1] * Math.sin(rad(a)), p[0] * Math.sin(rad(a)) + p[1] * Math.cos(rad(a))];
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

export function inPoly(p: P, poly: P[]): boolean {
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
  /** The shape a name belongs to: the name must be nearer to it than to any other shaded shape. */
  owner?: P[];
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

  /** A label centred exactly at p (a shape's name written inside it). */
  /** A shape's name, written just outside it and nearer to it than to any other shaded shape. */
  name(poly: P[], text: string) {
    const c = centroid(poly);
    const n = poly.length;
    this.pending.push({
      text,
      owner: poly,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [11, 14, 18, 23, 29, 36, 45]) {
          for (let i = 0; i < n; i++) {
            const a = poly[i];
            const b = poly[(i + 1) % n];
            const m = mid(a, b);
            const d = dirOf(a, b);
            const outN = Math.cos(rad(d + 90 - dirOf(m, c))) > 0 ? d - 90 : d + 90;
            out.push(at(m, outN, dpx / ppu));
          }
          for (const v of poly) out.push(at(v, dirOf(c, v), dpx / ppu));
        }
        return out;
      },
    });
    return this;
  }

  /** A name written inside an unshaded shape, clear of its sides. */
  inner(poly: P[], text: string) {
    const c = centroid(poly);
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const rpx of [0, 4, 8, 12, 16, 20]) for (let a = 0; a < 360; a += rpx ? 30 : 360) out.push(at(c, a, rpx / ppu));
        return out.filter((p) => inPoly(p, poly));
      },
    });
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
          if (lab.owner) {
            const own = lab.owner;
            const dTo = (poly: P[]) => Math.min(...poly.map((p, i) => distSegBox(p, poly[(i + 1) % poly.length], box)));
            const dOwn = dTo(own);
            const rivals = this.polys.filter((pl) => pl.fill && !(pl.points.length === own.length + 1 && own.every((p, i) => p[0] === pl.points[i][0] && p[1] === pl.points[i][1])));
            if (rivals.some((pl) => dTo(pl.points.slice(0, -1)) < dOwn + 3 / ppu)) score -= 60;
          }
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
// Grid transformations and shape tests
// ---------------------------------------------------------------------------

export type Map2 = (p: P) => P;
/** Reflection in the vertical line x = m. */
export const reflectV = (m: number): Map2 => (p) => [2 * m - p[0], p[1]];
/** Reflection in the horizontal line y = m. */
export const reflectH = (m: number): Map2 => (p) => [p[0], 2 * m - p[1]];
/** A quarter turn clockwise about c. */
export const rotCW = (c: P): Map2 => (p) => [c[0] + (p[1] - c[1]), c[1] - (p[0] - c[0])];
/** A quarter turn counter-clockwise about c. */
export const rotCCW = (c: P): Map2 => (p) => [c[0] - (p[1] - c[1]), c[1] + (p[0] - c[0])];
/** A half turn about c. */
export const halfTurn = (c: P): Map2 => (p) => [2 * c[0] - p[0], 2 * c[1] - p[1]];
export const shift = (dx: number, dy: number): Map2 => (p) => [p[0] + dx, p[1] + dy];
/** Reflection in the line through p and q. */
function reflectLine(p: P, q: P): Map2 {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const L = dx * dx + dy * dy;
  return (v) => {
    const t = ((v[0] - p[0]) * dx + (v[1] - p[1]) * dy) / L;
    const f: P = [p[0] + t * dx, p[1] + t * dy];
    return [2 * f[0] - v[0], 2 * f[1] - v[1]];
  };
}

export type Turn = 'cw' | 'ccw' | 'half';
export const rotMap = (t: Turn, c: P): Map2 => (t === 'cw' ? rotCW(c) : t === 'ccw' ? rotCCW(c) : halfTurn(c));

export const samePt = (a: P, b: P) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
/** The same vertices, in any order. */
export const samePts = (a: P[], b: P[]) => a.length === b.length && a.every((p) => b.some((q) => samePt(p, q)));

export function bounds(pts: P[]) {
  return {
    x0: Math.min(...pts.map((p) => p[0])),
    x1: Math.max(...pts.map((p) => p[0])),
    y0: Math.min(...pts.map((p) => p[1])),
    y1: Math.max(...pts.map((p) => p[1])),
  };
}

/** Do the insides of two polygons overlap? (Tested on a fine grid of sample points.) */
export function overlaps(a: P[], b: P[]): boolean {
  const A = bounds(a);
  const B = bounds(b);
  const x0 = Math.max(A.x0, B.x0);
  const x1 = Math.min(A.x1, B.x1);
  const y0 = Math.max(A.y0, B.y0);
  const y1 = Math.min(A.y1, B.y1);
  if (x0 >= x1 || y0 >= y1) return false;
  for (let x = Math.floor(x0) + 1 / 16; x < x1; x += 1 / 8)
    for (let y = Math.floor(y0) + 1 / 16; y < y1; y += 1 / 8) if (inPoly([x, y], a) && inPoly([x, y], b)) return true;
  return false;
}

const dist2 = (a: P, b: P) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

/** Number of ways to match the corners of b with the corners of a (in order, either direction) keeping every distance. */
function matchings(a: P[], b: P[]): number {
  if (a.length !== b.length) return 0;
  const n = a.length;
  let count = 0;
  for (const dir of [1, -1])
    for (let s = 0; s < n; s++) {
      const idx = (i: number) => (((s + dir * i) % n) + n) % n;
      let ok = true;
      for (let i = 0; i < n && ok; i++) for (let j = i + 1; j < n && ok; j++) if (Math.abs(dist2(a[i], a[j]) - dist2(b[idx(i)], b[idx(j)])) > 1e-6) ok = false;
      if (ok) count++;
    }
  return count;
}

/** Same size and same shape (any orientation). */
export const congruent = (a: P[], b: P[]) => matchings(a, b) > 0;
/** No line of symmetry and no turn symmetry: only one way to match the shape with itself. */
export const asymmetric = (a: P[]) => matchings(a, a) === 1;

function segsCross(a: P, b: P, c: P, d: P): boolean {
  const cr = (o: P, p: P, q: P) => (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0]);
  const d1 = cr(c, d, a);
  const d2 = cr(c, d, b);
  const d3 = cr(a, b, c);
  const d4 = cr(a, b, d);
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true;
  const on = (p: P, q: P, r: P) => Math.min(p[0], q[0]) <= r[0] && r[0] <= Math.max(p[0], q[0]) && Math.min(p[1], q[1]) <= r[1] && r[1] <= Math.max(p[1], q[1]);
  return (d1 === 0 && on(c, d, a)) || (d2 === 0 && on(c, d, b)) || (d3 === 0 && on(a, b, c)) || (d4 === 0 && on(a, b, d));
}

/** A polygon whose sides do not cross and with no straight-angle corners. */
function isSimple(pts: P[]): boolean {
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[(i + n - 1) % n];
    const b = pts[i];
    const c = pts[(i + 1) % n];
    if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) === 0) return false;
  }
  for (let i = 0; i < n; i++)
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      if (segsCross(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return false;
    }
  return true;
}

// ---------------------------------------------------------------------------
// Shapes on grid paper
// ---------------------------------------------------------------------------

/** A shape with whole-number corners and a point inside it for its name. */
export interface Tile {
  pts: P[];
  c: P;
}

/** Shapes with no symmetry of their own, so a flip and a turn always look different. */
const TILES: Tile[] = [
  { pts: [[0, 0], [3, 0], [0, 2]], c: [0.85, 0.6] },
  { pts: [[0, 0], [4, 0], [1, 3]], c: [1.6, 1.1] },
  { pts: [[0, 0], [3, 0], [3, 1], [1, 1], [1, 4], [0, 4]], c: [0.5, 0.55] },
  { pts: [[0, 0], [3, 0], [2, 2], [0, 2]], c: [1.2, 1] },
  { pts: [[0, 0], [4, 0], [3, 2], [1, 3]], c: [2, 1.3] },
  { pts: [[0, 0], [1, 0], [1, 2], [3, 3], [1, 4], [0, 4]], c: [0.5, 1.6] },
  { pts: [[0, 0], [2, 0], [3, 2], [1, 3], [0, 2]], c: [1.4, 1.3] },
  { pts: [[0, 0], [2, 0], [2, 1], [4, 1], [4, 2], [0, 2]], c: [1, 1] },
];

const mapTile = (t: Tile, f: Map2): Tile => ({ pts: t.pts.map(f), c: f(t.c) });

function normTile(t: Tile): Tile {
  const b = bounds(t.pts);
  return mapTile(t, shift(-b.x0, -b.y0));
}

/** Turn a shape k quarter turns counter-clockwise (after a flip if asked), with its lowest-left corner at (0, 0). */
function orientTile(t: Tile, k: number, flip: boolean): Tile {
  return normTile(
    mapTile(t, (p) => {
      let r: P = [flip ? -p[0] : p[0], p[1]];
      for (let i = 0; i < k; i++) r = [-r[1], r[0]];
      return r;
    }),
  );
}

function randomTile(rng: Rng, pool: Tile[] = TILES): Tile {
  return orientTile(rng.pick(pool), rng.int(0, 3), rng.chance(0.5));
}

interface Drawn {
  tile: Tile;
  color: Color;
  name?: string;
  outline?: boolean;
}

interface Marks {
  mirror?: { vertical: boolean; at: number };
  centre?: P;
}

/** The smallest sheet of grid paper (with a margin) holding the shapes and marks. */
function paperFor(items: Drawn[], marks: Marks, margin = 1): GridSpec {
  const pts: P[] = items.flatMap((it) => it.tile.pts);
  if (marks.centre) pts.push(marks.centre);
  if (marks.mirror) pts.push(marks.mirror.vertical ? [marks.mirror.at, pts[0][1]] : [pts[0][0], marks.mirror.at]);
  const b = bounds(pts);
  return { xMin: Math.floor(b.x0) - margin, xMax: Math.ceil(b.x1) + margin, yMin: Math.floor(b.y0) - margin, yMax: Math.ceil(b.y1) + margin };
}

/** Shapes, a dashed mirror line m and a centre of rotation P on grid paper. */
function paperFigure(items: Drawn[], marks: Marks, grid: GridSpec = paperFor(items, marks)): PlaneFigure {
  const s = new Sketch();
  for (const it of items) {
    if (it.outline) s.polyline([...it.tile.pts, it.tile.pts[0]], it.color);
    else s.polygon(it.tile.pts, it.color);
    if (it.name) s.name(it.tile.pts, it.name);
  }
  if (marks.mirror) {
    const { vertical, at: m } = marks.mirror;
    if (vertical) s.seg([m, grid.yMin], [m, grid.yMax], { dashed: true, color: 'muted' }).endLabel([m, grid.yMax - 0.6], 0, 'm');
    else s.seg([grid.xMin, m], [grid.xMax, m], { dashed: true, color: 'muted' }).endLabel([grid.xMax - 0.6, m], 90, 'm');
  }
  if (marks.centre) {
    const all = items.flatMap((it) => it.tile.pts);
    const c = centroid(all);
    s.dot(marks.centre, 'muted').endLabel(marks.centre, samePt(c, marks.centre) ? 45 : dirOf(c, marks.centre), 'P');
  }
  return s.buildGrid(grid, { numbers: false });
}

/** One grid big enough for every picture in a set of choices. */
function commonPaper(sets: Array<{ items: Drawn[]; marks: Marks }>): GridSpec {
  const gs = sets.map((st) => paperFor(st.items, st.marks));
  return { xMin: Math.min(...gs.map((g) => g.xMin)), xMax: Math.max(...gs.map((g) => g.xMax)), yMin: Math.min(...gs.map((g) => g.yMin)), yMax: Math.max(...gs.map((g) => g.yMax)) };
}

export const TURN_TEXT: Record<Turn, string> = {
  cw: 'a quarter turn ($90^\\circ$) clockwise',
  ccw: 'a quarter turn ($90^\\circ$) counter-clockwise',
  half: 'a half turn ($180^\\circ$)',
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "to the right", "straight up", "up and to the left" */
function dirWord(v: P): string {
  const [dx, dy] = v;
  if (dx === 0) return dy > 0 ? 'straight up' : 'straight down';
  if (dy === 0) return dx > 0 ? 'to the right' : 'to the left';
  return `${dy > 0 ? 'up' : 'down'} and to the ${dx > 0 ? 'right' : 'left'}`;
}

/** Explain a turn about c by following one corner (a corner straight across, up or down from c when possible). */
function turnSteps(t: Tile, img: Tile, c: P, turn: Turn, what = 'shape'): string[] {
  const order = t.pts
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => !samePt(p, c))
    .sort((u, v) => Number(u.p[0] !== c[0] && u.p[1] !== c[1]) - Number(v.p[0] !== c[0] && v.p[1] !== c[1]));
  const { p, i } = order[0];
  const q = img.pts[i];
  const before = dirWord([p[0] - c[0], p[1] - c[1]]);
  const after = dirWord([q[0] - c[0], q[1] - c[1]]);
  const how =
    turn === 'half'
      ? 'It now points the opposite way. That is a half turn.'
      : `It turned a quarter of a full turn, ${turn === 'cw' ? "the same way as a clock's hands (clockwise)" : "the opposite way to a clock's hands (counter-clockwise)"}.`;
  return [
    `Follow one corner. The line from $P$ to a corner of ${what} 1 points ${before}.`,
    `The line from $P$ to the matching corner of ${what} 2 points ${after}. ${how}`,
  ];
}

const PAIR_CTX = [
  (w: string) => `${w} drew two shapes on grid paper for an art project.`,
  (w: string) => `Two tiles in ${w}'s floor design are shown on grid paper.`,
  (w: string) => `${w} cut two shapes out of coloured paper and laid them on grid paper.`,
  () => 'Two stickers on a classroom window are shown on grid paper.',
  (w: string) => `${w} is planning a quilt. Two of the pieces are shown on grid paper.`,
  () => 'Two stepping stones in a school garden are shown on grid paper.',
];

type PairKind = 'reflect' | 'rotate' | 'slide';

interface Pair {
  img: Tile;
  kind: PairKind;
  mirror?: { vertical: boolean; at: number };
  centre?: P;
  turn?: Turn;
}

/** Move a shape by one reflection, rotation or translation so that the two shapes do not overlap. */
function makePair(rng: Rng, t: Tile, kind: PairKind): Pair | null {
  const b = bounds(t.pts);
  let pair: Pair;
  if (kind === 'reflect') {
    const vertical = rng.chance(0.6);
    const at = (vertical ? b.x1 : b.y1) + rng.int(1, 2);
    pair = { kind, mirror: { vertical, at }, img: mapTile(t, vertical ? reflectV(at) : reflectH(at)) };
  } else if (kind === 'rotate') {
    const turn = rng.pick(['cw', 'ccw', 'half'] as const);
    const c: P = rng.chance(0.45) ? rng.pick(t.pts) : [b.x1 + rng.int(0, 2), rng.int(b.y0 - 1, b.y1 + 1)];
    pair = { kind, centre: c, turn, img: mapTile(t, rotMap(turn, c)) };
  } else {
    const across = rng.chance(0.6);
    const dx = across ? b.x1 + rng.int(1, 3) : rng.int(-2, 2);
    const dy = across ? rng.int(-2, 2) : b.y1 + rng.int(1, 3);
    pair = { kind, img: mapTile(t, shift(dx, dy)) };
  }
  if (overlaps(t.pts, pair.img.pts)) return null;
  return pair;
}

// ---------------------------------------------------------------------------
// Tessellations
// ---------------------------------------------------------------------------

/** Right triangles in a grid of a-by-b rectangles; each rectangle is cut along a diagonal. */
function triTess(a: number, b: number, cols: number, rows: number, diamond: boolean): P[][] {
  const out: P[][] = [];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const BL: P = [i * a, j * b];
      const BR: P = [(i + 1) * a, j * b];
      const TR: P = [(i + 1) * a, (j + 1) * b];
      const TL: P = [i * a, (j + 1) * b];
      if (!diamond || (i + j) % 2 === 0) out.push([BL, BR, TR], [BL, TR, TL]);
      else out.push([BL, BR, TL], [BR, TR, TL]);
    }
  return out;
}

type Rel = 'reflect' | 'half' | 'slide';

/** How tile y is related to tile x: a reflection in their shared side, a half turn about its middle, or a slide. */
function relation(x: P[], y: P[]): Rel | null {
  const shared = x.filter((p) => y.some((q) => samePt(p, q)));
  if (shared.length === 2) {
    const [p, q] = shared;
    if (samePts(x.map(reflectLine(p, q)), y)) return 'reflect';
    if (samePts(x.map(halfTurn(mid(p, q))), y)) return 'half';
  }
  for (const v of x) {
    const f = shift(y[0][0] - v[0], y[0][1] - v[1]);
    if (!samePts(x, y) && samePts(x.map(f), y)) return 'slide';
  }
  return null;
}

function tessFigure(tiles: P[][], one: number, two: number): PlaneFigure {
  const s = new Sketch();
  const loop = (t: P[]): P[] => [...t, t[0]];
  tiles.forEach((t, k) => {
    if (k !== one && k !== two) s.polyline(loop(t), 'muted');
  });
  s.polyline(loop(tiles[one]), 'brand').polyline(loop(tiles[two]), 'accent');
  s.inner(tiles[one], '1').inner(tiles[two], '2');
  return s.build({ margin: 0.3 });
}

const TESS_SIZES: Array<[number, number, number, number]> = [
  [3, 2, 4, 3],
  [2, 3, 5, 2],
  [4, 2, 3, 3],
  [2, 4, 5, 2],
  [3, 1.5, 4, 4],
];

/** A tessellation of right triangles with two tiles picked out that are related in the asked way. */
function tessPair(rng: Rng, want: Rel, adjacentOnly: boolean): { tiles: P[][]; one: number; two: number; diamond: boolean } {
  for (;;) {
    const [a, b, cols, rows] = rng.pick(TESS_SIZES);
    const diamond = want === 'reflect' ? true : rng.chance(0.5);
    const tiles = triTess(a, b, cols, rows, diamond);
    const one = rng.int(0, tiles.length - 1);
    const c1 = centroid(tiles[one]);
    const near = tiles
      .map((t, k) => ({ k, rel: k === one ? null : relation(tiles[one], t), d: Math.hypot(centroid(t)[0] - c1[0], centroid(t)[1] - c1[1]) }))
      .filter((o) => o.rel === want && (adjacentOnly ? tiles[o.k].filter((p) => tiles[one].some((q) => samePt(p, q))).length === 2 : o.d <= 1.05 * Math.max(a, b) * 2));
    if (!near.length) continue;
    return { tiles, one, two: rng.pick(near).k, diamond };
  }
}

/** Pictures for "which is a tessellation?" */
function tilingPicture(kind: string, rng: Rng): PlaneFigure {
  const s = new Sketch();
  const poly = (pts: P[], k: number) => s.polygon(pts, k % 2 ? 'accent' : 'brand');
  const regular = (cx: number, cy: number, r: number, n: number, a0: number): P[] =>
    Array.from({ length: n }, (_, k) => [r3(cx + r * Math.cos(rad(a0 + (360 * k) / n))), r3(cy + r * Math.sin(rad(a0 + (360 * k) / n)))] as P);
  if (kind === 'brick') {
    for (let j = 0; j < 4; j++)
      for (let x = j % 2 ? -1 : 0; x < 8; x += 2) {
        const x0 = Math.max(0, x);
        const x1 = Math.min(8, x + 2);
        poly([[x0, j], [x1, j], [x1, j + 1], [x0, j + 1]], (x + j + 4) / 2 + (j % 2));
      }
  } else if (kind === 'hex') {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) poly(regular(1.5 * i, Math.sqrt(3) * (j + (i % 2) / 2), 1, 6, 0), i + j);
  } else if (kind === 'para') {
    for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) poly([[2 * i + j, j * 1.5], [2 * i + 2 + j, j * 1.5], [2 * i + 3 + j, (j + 1) * 1.5], [2 * i + 1 + j, (j + 1) * 1.5]], i + j);
  } else if (kind === 'tri') {
    const a = rng.pick([2, 3]);
    triTess(a, 1.5, a === 2 ? 4 : 3, 3, rng.chance(0.5)).forEach((t, k) => poly(t, k));
  } else if (kind === 'circles') {
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) poly(regular(2 * i + 1, 2 * j + 1, 1, 28, 0), i + j);
  } else if (kind === 'pentagons') {
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) poly(regular(2.1 * i, 2.1 * j, 1.1, 5, 90), i + j);
  } else if (kind === 'octagons') {
    const r = 1 / Math.cos(rad(22.5));
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) poly(regular(2 * i, 2 * j, r, 8, 22.5), i + j);
  } else {
    // Overlapping rectangles.
    const spots: P[] = [[0, 0], [2, 1], [4.5, 0], [1, 2.4], [5.5, 2], [3.2, 2.9]];
    spots.forEach(([x, y], k) => poly([[x, y], [x + 3, y], [x + 3, y + 2], [x, y + 2]], k));
  }
  return s.build({ margin: 0.3 });
}

/** An eight-pointed star of 8 congruent diamonds, like the star at the centre of many star blankets. */
function starFigure(one: number, two: number): PlaneFigure {
  const s = new Sketch();
  const u = (k: number): P => [2 * Math.cos(rad(45 * k + 22.5)), 2 * Math.sin(rad(45 * k + 22.5))];
  const diamond = (k: number): P[] => [[0, 0], u(k), [u(k)[0] + u(k + 1)[0], u(k)[1] + u(k + 1)[1]], u(k + 1)].map(([x, y]) => [r3(x), r3(y)] as P);
  const loop = (t: P[]): P[] => [...t, t[0]];
  for (let k = 0; k < 8; k++) if (k !== one && k !== two) s.polyline(loop(diamond(k)), 'muted');
  s.polyline(loop(diamond(one)), 'brand').polyline(loop(diamond(two)), 'accent');
  s.inner(diamond(one), '1').inner(diamond(two), '2');
  return s.build({ margin: 0.4 });
}

// ---------------------------------------------------------------------------
// 7.1 Symmetry between shapes
// ---------------------------------------------------------------------------

const SYM_CHOICES = ['Reflection symmetry', 'Rotation symmetry'];
const TESS_CHOICES = ['Reflection symmetry (a flip)', 'Rotation symmetry (a turn)', 'A translation (a slide), with no flip or turn'];

const symmetricShapes = skill({
  id: 'm6-symmetric-shapes',
  name: 'Symmetry between shapes',
  description: 'Decide whether two shapes are related by reflection symmetry or rotation symmetry, describe a rotation or a combination of two moves, and describe the symmetry in a tessellation.',
  outcomes: ['G1'],
  lessonId: 'm6-7-1',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode =
      d === 1
        ? rng.weighted([['name-pair', 3], ['which-mirror', 2], ['is-tessellation', 2]] as const)
        : d === 2
          ? rng.weighted([['describe-rotation', 3], ['tess-relation', 3], ['which-rotation', 2]] as const)
          : rng.weighted([['combo-picture', 3], ['combo-describe', 3], ['tess-describe', 2], ['star', 2]] as const);

    if (mode === 'name-pair') {
      for (;;) {
        const t = randomTile(rng);
        const kind = rng.pick(['reflect', 'rotate'] as const);
        const pr = makePair(rng, t, kind);
        if (!pr) continue;
        const figure = paperFigure([{ tile: t, color: 'brand', name: '1' }, { tile: pr.img, color: 'accent', name: '2' }], {});
        const idx = kind === 'reflect' ? 0 : 1;
        return {
          prompt: `${rng.pick(PAIR_CTX)(who)} Shape 2 is shape 1 after **one** move: a reflection or a rotation. Which kind of symmetry relates the two shapes?`,
          figure,
          parts: [{ answer: fixedChoice(SYM_CHOICES, idx) }],
          hints: [
            'A reflection flips a shape over, like a mirror image. A rotation turns a shape without flipping it.',
            'Imagine tracing shape 1 on paper. If you can turn the paper so it lands on shape 2, it is a rotation. If you have to flip the paper over, it is a reflection.',
          ],
          solution:
            kind === 'reflect'
              ? [
                  'Shape 2 is a mirror image of shape 1. It faces the opposite way, so shape 1 must be flipped over to land on it.',
                  `A ${pr.mirror!.vertical ? 'vertical' : 'horizontal'} mirror line halfway between the two shapes reflects shape 1 onto shape 2.`,
                  'The shapes are related by **reflection symmetry**.',
                ]
              : [
                  'Shape 2 is not a mirror image of shape 1. Shape 1 can be turned, without flipping, to land exactly on shape 2.',
                  `It is ${TURN_TEXT[pr.turn!]} about ${t.pts.some((p) => samePt(p, pr.centre!)) ? 'one of its corners' : 'a point near the shapes'}.`,
                  'The shapes are related by **rotation symmetry**.',
                ],
          answerDisplay: SYM_CHOICES[idx],
        };
      }
    }

    if (mode === 'which-mirror') {
      for (;;) {
        const t = randomTile(rng);
        const b = bounds(t.pts);
        const vertical = rng.chance(0.6);
        const m = (vertical ? b.x1 : b.y1) + rng.int(1, 2);
        const good = mapTile(t, vertical ? reflectV(m) : reflectH(m));
        const gb = bounds(good.pts);
        const slide = mapTile(t, shift(gb.x0 - b.x0, gb.y0 - b.y0));
        const turned0 = mapTile(t, halfTurn([0, 0]));
        const tb = bounds(turned0.pts);
        const turned = mapTile(turned0, shift(gb.x0 - tb.x0, gb.y0 - tb.y0));
        const gap = rng.int(1, 2);
        const far = mapTile(good, vertical ? shift(gap, 0) : shift(0, gap));
        const opts = [
          { tile: good, kind: 'good' },
          { tile: slide, kind: 'slide' },
          { tile: turned, kind: 'turn' },
          { tile: far, kind: 'far' },
        ];
        if (opts.some((o, i) => opts.some((q, j) => j > i && samePts(o.tile.pts, q.tile.pts)))) continue;
        const marks: Marks = { mirror: { vertical, at: m } };
        const sets = opts.map((o) => ({ items: [{ tile: t, color: 'brand' as Color, name: '1' }, { tile: o.tile, color: 'accent' as Color, name: '2' }], marks }));
        const grid = commonPaper(sets);
        const figs = sets.map((st) => paperFigure(st.items, st.marks, grid));
        const answer = mcFigures(rng, opts.map((o, i) => ({ md: '', figure: figs[i] as Figure, correct: o.kind === 'good' })));
        const L = (kind: string) => String.fromCharCode(65 + (answer.kind === 'mc' ? answer.choices.findIndex((c) => c.figure === figs[opts.findIndex((o) => o.kind === kind)]) : 0));
        return {
          prompt: `${who} reflects shape 1 in the dashed mirror line $m$. In which picture is shape 2 the reflection of shape 1?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }], marks, grid),
          parts: [{ answer }],
          hints: [
            'A reflection makes a mirror image. It is flipped over the mirror line.',
            'Each corner of the image is the same number of squares from the mirror line as the matching corner of shape 1, but on the other side.',
          ],
          solution: [
            `In picture ${L('slide')}, shape 2 faces the same way as shape 1. It was slid, not flipped.`,
            `In picture ${L('turn')}, shape 2 was turned a half turn, not flipped.`,
            `In picture ${L('far')}, shape 2 is a mirror image, but it is too far from the mirror line.`,
            `In picture ${L('good')}, every corner of shape 2 is the same distance from line $m$ as the matching corner of shape 1. Picture ${L('good')} shows the reflection.`,
          ],
          answerDisplay: `Picture ${L('good')}`,
        };
      }
    }

    if (mode === 'is-tessellation') {
      const good = rng.pick(['brick', 'hex', 'para', 'tri']);
      const bad = rng.sample(['circles', 'pentagons', 'octagons', 'overlap'], 3);
      const opts = [good, ...bad];
      const figs = opts.map((k) => tilingPicture(k, rng));
      const answer = mcFigures(rng, opts.map((_, i) => ({ md: '', figure: figs[i] as Figure, correct: i === 0 })));
      const L = (k: string) => String.fromCharCode(65 + (answer.kind === 'mc' ? answer.choices.findIndex((c) => c.figure === figs[opts.indexOf(k)]) : 0));
      const why: Record<string, string> = {
        circles: 'leaves gaps between the circles',
        pentagons: 'leaves gaps between the pentagons',
        octagons: 'leaves square gaps between the octagons',
        overlap: 'has rectangles that overlap',
      };
      const name: Record<string, string> = { brick: 'bricks', hex: 'hexagons', para: 'parallelograms', tri: 'triangles' };
      const ctx = rng.pick([
        `${who} is choosing a pattern for a bathroom floor.`,
        `${who} is designing a quilt for a school fundraiser.`,
        'An artist is planning a mosaic for a library wall.',
        `${who} is making a pattern to cover a notebook.`,
      ]);
      return {
        prompt: `${ctx} A **tessellation** covers a flat surface with shapes that leave **no gaps** and do **not overlap**. Which picture shows a tessellation?`,
        parts: [{ answer }],
        hints: ['Look for spaces between the shapes, and for places where two shapes cover the same spot.', 'In a tessellation every bit of the surface is covered exactly once.'],
        solution: [
          ...bad.map((k) => `Picture ${L(k)} ${why[k]}.`),
          `Picture ${L(good)} covers the surface with ${name[good]} that fit together with no gaps and no overlaps. Picture ${L(good)} shows a tessellation.`,
        ],
        answerDisplay: `Picture ${L(good)}`,
      };
    }

    if (mode === 'describe-rotation') {
      for (;;) {
        const t = randomTile(rng);
        const b = bounds(t.pts);
        const turn = rng.pick(['cw', 'ccw', 'half'] as const);
        const c: P = rng.chance(0.5) ? rng.pick(t.pts) : [rng.pick([b.x0 - 1, b.x1 + 1]), rng.int(b.y0, b.y1)];
        const img = mapTile(t, rotMap(turn, c));
        if (overlaps(t.pts, img.pts)) continue;
        const idx = turn === 'cw' ? 0 : turn === 'ccw' ? 1 : 2;
        const choices = [TURN_TEXT.cw, TURN_TEXT.ccw, TURN_TEXT.half].map(cap);
        return {
          prompt: `${rng.pick(PAIR_CTX)(who)} Shape 2 is a rotation of shape 1 about point $P$. Which describes the rotation?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }, { tile: img, color: 'accent', name: '2' }], { centre: c }),
          parts: [{ answer: fixedChoice(choices, idx) }],
          hints: [
            'Clockwise is the way the hands of a clock move. Counter-clockwise is the other way.',
            'Draw a line from $P$ to one corner of shape 1, and from $P$ to the matching corner of shape 2. How far did the line turn, and which way?',
          ],
          solution: [...turnSteps(t, img, c, turn), `Shape 2 is shape 1 after ${TURN_TEXT[turn]} about $P$.`],
          answerDisplay: choices[idx],
        };
      }
    }

    if (mode === 'tess-relation' || mode === 'tess-describe') {
      const want: Rel = mode === 'tess-describe' ? rng.pick(['reflect', 'half'] as const) : rng.weighted([['reflect', 2], ['half', 2], ['slide', 1]] as const);
      const { tiles, one, two } = tessPair(rng, want, mode === 'tess-describe' || want !== 'slide');
      const ctx = rng.pick([
        `${who} is tiling a floor with right triangles.`,
        'Part of a quilt pattern made of right triangles is shown.',
        `${who} drew this tessellation of right triangles for a poster.`,
        'A patio is covered with triangle-shaped paving stones.',
      ]);
      const say: Record<Rel, string> = {
        reflect: 'Tiles 1 and 2 share a side. If you fold the picture along that side, tile 1 lands exactly on tile 2. Tile 2 is a mirror image of tile 1.',
        half: 'Tiles 1 and 2 share a side, but tile 2 is not a mirror image of tile 1. Tile 1 turned a half turn about the middle of the shared side lands exactly on tile 2.',
        slide: 'Tile 2 faces exactly the same way as tile 1. It is tile 1 slid over, with no flip and no turn.',
      };
      if (mode === 'tess-relation') {
        const idx = want === 'reflect' ? 0 : want === 'half' ? 1 : 2;
        return {
          prompt: `${ctx} The triangles fit together with no gaps or overlaps, so they make a tessellation. How is tile 2 related to tile 1?`,
          figure: tessFigure(tiles, one, two),
          parts: [{ answer: fixedChoice(TESS_CHOICES, idx) }],
          hints: ['Compare the two tiles. Is tile 2 a mirror image of tile 1, a turned copy, or a copy that faces the same way?', 'Look at where the right angle of each tile is and which way the longest side slopes.'],
          solution: [say[want], `So tile 2 is related to tile 1 by ${want === 'reflect' ? '**reflection symmetry**' : want === 'half' ? '**rotation symmetry**' : 'a **translation** (a slide)'}.`],
          answerDisplay: TESS_CHOICES[idx],
        };
      }
      const choices = ['A reflection in the line along their shared side', 'A half turn ($180^\\circ$) about the middle of their shared side', 'A translation (a slide) along their shared side'];
      const idx = want === 'reflect' ? 0 : 1;
      return {
        prompt: `${ctx} Tile 2 can be made by moving tile 1 once. Which describes the move?`,
        figure: tessFigure(tiles, one, two),
        parts: [{ answer: fixedChoice(choices, idx) }],
        hints: ['Find the side that tiles 1 and 2 share.', 'Would folding along that side put tile 1 onto tile 2? If not, try turning tile 1 a half turn about the middle of the shared side.'],
        solution: [say[want], `The move is ${choices[idx].charAt(0).toLowerCase() + choices[idx].slice(1)}.`],
        answerDisplay: choices[idx],
      };
    }

    if (mode === 'which-rotation') {
      for (;;) {
        const t = randomTile(rng);
        const b = bounds(t.pts);
        const turn = rng.pick(['cw', 'ccw', 'half'] as const);
        const c: P = rng.chance(0.5) ? rng.pick(t.pts) : [rng.pick([b.x0 - 1, b.x1 + 1]), rng.int(b.y0, b.y1)];
        const imgs = (['cw', 'ccw', 'half'] as const).map((k) => ({ kind: k as string, tile: mapTile(t, rotMap(k, c)) }));
        imgs.push({ kind: 'flip', tile: mapTile(t, reflectV(c[0])) });
        if (imgs.some((o) => overlaps(t.pts, o.tile.pts))) continue;
        if (imgs.some((o, i) => imgs.some((q, j) => j > i && samePts(o.tile.pts, q.tile.pts)))) continue;
        const marks: Marks = { centre: c };
        const sets = imgs.map((o) => ({ items: [{ tile: t, color: 'brand' as Color, name: '1' }, { tile: o.tile, color: 'accent' as Color, name: '2' }], marks }));
        const grid = commonPaper(sets);
        const figs = sets.map((st) => paperFigure(st.items, st.marks, grid));
        const answer = mcFigures(rng, imgs.map((o, i) => ({ md: '', figure: figs[i] as Figure, correct: o.kind === turn })));
        const L = (kind: string) => String.fromCharCode(65 + (answer.kind === 'mc' ? answer.choices.findIndex((ch) => ch.figure === figs[imgs.findIndex((o) => o.kind === kind)]) : 0));
        const others = (['cw', 'ccw', 'half'] as const).filter((k) => k !== turn);
        return {
          prompt: `${who} rotates shape 1 ${TURN_TEXT[turn]} about point $P$. Which picture shows shape 2, the image after the rotation?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }], marks, grid),
          parts: [{ answer }],
          hints: [
            'Clockwise is the way the hands of a clock move. A quarter turn takes "to the right" to "straight down" when you turn clockwise.',
            'Trace shape 1 and point $P$. Hold your pencil on $P$ and turn the tracing. Which picture matches?',
          ],
          solution: [
            `Picture ${L('flip')} shows a mirror image, so it is a reflection, not a rotation.`,
            `Picture ${L(others[0])} shows ${TURN_TEXT[others[0]]}, and picture ${L(others[1])} shows ${TURN_TEXT[others[1]]}.`,
            `Picture ${L(turn)} shows shape 1 after ${TURN_TEXT[turn]} about $P$.`,
          ],
          answerDisplay: `Picture ${L(turn)}`,
        };
      }
    }

    if (mode === 'combo-picture' || mode === 'combo-describe') {
      for (;;) {
        const t = randomTile(rng);
        const b = bounds(t.pts);
        const vertical = rng.chance(0.6);
        const m = (vertical ? b.x1 : b.y1) + rng.int(1, 2);
        const R = vertical ? reflectV(m) : reflectH(m);
        const mirrored = mapTile(t, R);
        const mb = bounds(mirrored.pts);
        const c: P = vertical ? [mb.x1 + rng.int(0, 1), rng.pick([mb.y0, mb.y1]) + rng.int(-1, 1)] : [rng.pick([mb.x0, mb.x1]) + rng.int(-1, 1), mb.y0 - rng.int(0, 1)];
        const turn = rng.pick(['cw', 'ccw', 'half'] as const);
        const T = rotMap(turn, c);
        const final = mapTile(mirrored, T);
        const marks: Marks = { mirror: { vertical, at: m }, centre: c };
        if (overlaps(t.pts, final.pts)) continue;
        if (mode === 'combo-describe') {
          const idx = turn === 'cw' ? 0 : turn === 'ccw' ? 1 : 2;
          const choices = [TURN_TEXT.cw, TURN_TEXT.ccw, TURN_TEXT.half].map(cap);
          const items: Drawn[] = [{ tile: t, color: 'brand', name: '1' }, { tile: final, color: 'accent', name: '2' }];
          return {
            prompt: `${who} moved shape 1 onto shape 2 with **two** moves. First, shape 1 was reflected in line $m$. Then the mirror image was rotated about point $P$. Which describes the rotation?`,
            figure: paperFigure(items, marks),
            parts: [{ answer: fixedChoice(choices, idx) }],
            hints: [
              'Start by sketching the mirror image of shape 1 in line $m$. Each corner moves to the same distance on the other side of $m$.',
              'Then compare your sketch with shape 2. How far, and which way, must it turn about $P$ to land on shape 2?',
            ],
            solution: [
              `Reflect shape 1 in line $m$. The mirror image is the same distance from $m$, on the other side, and it faces the opposite way.`,
              ...turnSteps(mirrored, final, c, turn, 'shape').map((s) => s.replace('shape 1', 'the mirror image').replace('shape 2', 'shape 2')),
              `The second move is ${TURN_TEXT[turn]} about $P$.`,
            ],
            answerDisplay: choices[idx],
          };
        }
        const opts = [
          { kind: 'good', tile: final },
          { kind: 'reflect', tile: mirrored },
          { kind: 'rotate', tile: mapTile(t, T) },
          { kind: 'swap', tile: mapTile(mapTile(t, T), R) },
        ];
        if (opts.some((o) => overlaps(t.pts, o.tile.pts))) continue;
        if (opts.some((o, i) => opts.some((q, j) => j > i && samePts(o.tile.pts, q.tile.pts)))) continue;
        const sets = opts.map((o) => ({ items: [{ tile: t, color: 'brand' as Color, name: '1' }, { tile: o.tile, color: 'accent' as Color, name: '2' }], marks }));
        const grid = commonPaper(sets);
        if (grid.xMax - grid.xMin > 18 || grid.yMax - grid.yMin > 18) continue;
        const figs = sets.map((st) => paperFigure(st.items, st.marks, grid));
        const answer = mcFigures(rng, opts.map((_, i) => ({ md: '', figure: figs[i] as Figure, correct: i === 0 })));
        const L = (kind: string) => String.fromCharCode(65 + (answer.kind === 'mc' ? answer.choices.findIndex((ch) => ch.figure === figs[opts.findIndex((o) => o.kind === kind)]) : 0));
        return {
          prompt: `${who} reflects shape 1 in line $m$. Then ${who} rotates the mirror image ${TURN_TEXT[turn]} about point $P$. Which picture shows shape 2, where the shape ends up?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }], marks, grid),
          parts: [{ answer }],
          hints: ['Do one move at a time. Sketch the mirror image of shape 1 in line $m$ first.', `Then turn your sketch ${TURN_TEXT[turn]} about $P$.`],
          solution: [
            'Step 1: Reflect shape 1 in line $m$. The mirror image is the same distance from $m$, on the other side.',
            `Step 2: Turn the mirror image ${TURN_TEXT[turn]} about $P$.`,
            `Picture ${L('reflect')} shows only the reflection. Picture ${L('rotate')} shows only the rotation. Picture ${L('swap')} does the two moves in the wrong order.`,
            `Picture ${L('good')} shows where the shape ends up.`,
          ],
          answerDisplay: `Picture ${L('good')}`,
        };
      }
    }

    // Star blanket: which fraction of a turn moves diamond 1 onto diamond 2?
    const one = rng.int(0, 7);
    const k = rng.int(1, 4);
    const two = (one + (rng.chance(0.5) ? k : 8 - k)) % 8;
    const choices = ['$\\dfrac{1}{8}$ of a turn', '$\\dfrac{1}{4}$ of a turn', '$\\dfrac{3}{8}$ of a turn', '$\\dfrac{1}{2}$ of a turn'];
    const fr = ['', '\\dfrac{1}{8}', '\\dfrac{2}{8} = \\dfrac{1}{4}', '\\dfrac{3}{8}', '\\dfrac{4}{8} = \\dfrac{1}{2}'][k];
    return {
      prompt: `${rng.pick(['Many First Nations and Métis quilters', 'Many First Nations and Métis artists'])} make **star blankets**. Many of these quilts have a large eight-pointed star made of diamond shapes. The simple star below has $8$ congruent diamonds that fit around the centre with no gaps or overlaps. Diamond 2 is a rotation of diamond 1 about the centre of the star. What is the **smallest** turn about the centre that moves diamond 1 onto diamond 2?`,
      figure: starFigure(one, two),
      parts: [{ answer: fixedChoice(choices, k - 1) }],
      hints: ['The $8$ diamonds share one full turn, so turning by one diamond is $\\dfrac{1}{8}$ of a turn.', 'Count the diamonds from diamond 1 to diamond 2 the short way around.'],
      solution: [
        'Eight equal diamonds go once around the centre, so each step from one diamond to the next is $\\dfrac{1}{8}$ of a turn.',
        `Going the short way around, diamond 2 is $${k}$ step${k === 1 ? '' : 's'} from diamond 1.`,
        `$${k} \\times \\dfrac{1}{8} = ${fr}$`,
        `The smallest turn is ${choices[k - 1]}.`,
      ],
      answerDisplay: choices[k - 1],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 Congruent shapes
// ---------------------------------------------------------------------------

/** Shapes that are almost like t but not congruent to it: another size, stretched, or with one corner moved. */
function lookAlikes(rng: Rng, t: Tile): Array<{ tile: Tile; why: string }> {
  const out: Array<{ tile: Tile; why: string }> = [];
  const b = bounds(t.pts);
  const big = Math.max(b.x1, b.y1) <= 3;
  const k = big ? 2 : 0.5;
  out.push({ tile: mapTile(t, (p) => [p[0] * k, p[1] * k]), why: big ? 'is the same shape but bigger' : 'is the same shape but smaller' });
  if (b.x1 <= 3 && (b.y1 > 3 || rng.chance(0.5))) out.push({ tile: mapTile(t, (p) => [p[0] * 2, p[1]]), why: 'is stretched sideways' });
  else if (b.y1 <= 3) out.push({ tile: mapTile(t, (p) => [p[0], p[1] * 2]), why: 'is stretched up and down' });
  const moves: P[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const tries = rng.shuffle(t.pts.flatMap((_, i) => moves.map((mv) => ({ i, mv }))));
  let moved = 0;
  for (const { i, mv } of tries) {
    const pts = t.pts.map((p, j) => (j === i ? ([p[0] + mv[0], p[1] + mv[1]] as P) : p));
    if (!isSimple(pts) || congruent(pts, t.pts) || !inPoly(t.c, pts)) continue;
    if (out.some((o) => congruent(o.tile.pts, pts))) continue;
    out.push({ tile: normTile({ pts, c: t.c }), why: 'has one corner in a different place, so its sides do not match' });
    if (++moved === 2) break;
  }
  return out.filter((o) => !congruent(o.tile.pts, t.pts));
}

/** A copy of t in a new orientation (turned, or flipped and turned). */
function reorient(rng: Rng, t: Tile, avoid: Array<[number, boolean]> = [[0, false]]): { tile: Tile; k: number; flip: boolean } {
  for (;;) {
    const k = rng.int(0, 3);
    const flip = rng.chance(0.5);
    if (avoid.some(([a, f]) => a === k && f === flip)) continue;
    return { tile: orientTile(t, k, flip), k, flip };
  }
}

/** A shape centred on a square sheet of grid paper of the given size. */
function onSheet(t: Tile, size: number, color: Color = 'brand'): PlaneFigure {
  const b = bounds(t.pts);
  const dx = Math.floor((size - (b.x1 - b.x0)) / 2) - b.x0;
  const dy = Math.floor((size - (b.y1 - b.y0)) / 2) - b.y0;
  return paperFigure([{ tile: mapTile(t, shift(dx, dy)), color }], {}, { xMin: 0, xMax: size, yMin: 0, yMax: size });
}

const orientText = (k: number, flip: boolean) =>
  flip ? (k === 0 ? 'flipped over' : 'flipped over and turned') : k === 2 ? 'turned a half turn' : 'turned a quarter turn';

/** A triangle with sides a = BC, b = CA, c = AB, drawn to scale with A at the origin and AB along the x-axis. */
function triangleFrom(a: number, b: number, c: number): P[] {
  const x = (b * b + c * c - a * a) / (2 * c);
  const y = Math.sqrt(b * b - x * x);
  return [[0, 0], [c, 0], [x, y]];
}

const TRI_SIDES: Array<[number, number, number]> = [
  [4, 6, 8], [5, 7, 10], [3, 5, 7], [5, 8, 11], [4, 7, 9], [6, 8, 12], [5, 6, 9], [6, 9, 13], [4, 5, 8], [7, 9, 13],
];

/** Two congruent triangles drawn to scale: triangle 1, and triangle 2 turned (and maybe flipped) beside it. */
function trianglePair(rng: Rng) {
  const sides = rng.shuffle(rng.pick(TRI_SIDES)) as [number, number, number];
  const base = triangleFrom(...sides);
  const a1 = rng.int(-2, 2) * 10;
  const flip = rng.chance(0.5);
  const a2 = rng.pick([60, 90, 120, 150, 180, 210, 240, 270, 300]);
  const t1 = base.map((p) => turn(p, a1));
  let t2 = base.map((p) => turn([flip ? -p[0] : p[0], p[1]], a2));
  const b1 = bounds(t1);
  const b2 = bounds(t2);
  const gap = 0.35 * Math.max(...sides);
  t2 = t2.map((p) => [p[0] - b2.x0 + b1.x1 + gap, p[1] - (b2.y0 + b2.y1) / 2 + (b1.y0 + b1.y1) / 2] as P);
  // Side i joins corner i and corner i + 1: lengths c, a, b.
  const len = [sides[2], sides[0], sides[1]];
  return { t1, t2, len, flip, a2 };
}

function trianglePairFigure(t1: P[], t2: P[], labels1: Array<string | null>, labels2: Array<string | null>): PlaneFigure {
  const s = new Sketch();
  s.polyline([...t1, t1[0]], 'brand').polyline([...t2, t2[0]], 'accent');
  const c1 = centroid(t1);
  const c2 = centroid(t2);
  for (let i = 0; i < 3; i++) {
    if (labels1[i]) s.sideLabel(t1[i], t1[(i + 1) % 3], labels1[i]!, c1);
    if (labels2[i]) s.sideLabel(t2[i], t2[(i + 1) % 3], labels2[i]!, c2);
  }
  s.inner(t1, '1').inner(t2, '2');
  return s.build({ margin: 0.6 });
}

const RANK = ['shortest', 'middle-length', 'longest'];
const rankOf = (len: number[], i: number) => RANK[[...len].sort((x, y) => x - y).indexOf(len[i])];

const CONG_CHOICES = [
  'Congruent, and related by reflection symmetry',
  'Congruent, and related by rotation symmetry',
  'Congruent, but not related by one reflection or one rotation',
  'Not congruent',
];

const congruence = skill({
  id: 'm6-congruence',
  name: 'Congruent shapes',
  description: 'Decide whether shapes in any orientation are congruent, use matching sides of congruent shapes, and explain why shapes related by symmetry are congruent.',
  outcomes: ['G1'],
  lessonId: 'm6-7-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode =
      d === 1
        ? rng.weighted([['which', 3], ['yes-no', 2]] as const)
        : d === 2
          ? rng.weighted([['select-all', 3], ['matching-side', 2]] as const)
          : rng.weighted([['classify', 3], ['statement', 2], ['perimeter', 2]] as const);

    if (mode === 'which' || mode === 'select-all') {
      for (;;) {
        const t = randomTile(rng);
        const fakes = rng.shuffle(lookAlikes(rng, t));
        const nGood = mode === 'which' ? 1 : rng.weighted([[1, 1], [2, 3], [3, 1]] as const);
        if (fakes.length < 4 - nGood) continue;
        const used: Array<[number, boolean]> = [[0, false]];
        const goods = Array.from({ length: nGood }, () => {
          const r = reorient(rng, t, used);
          used.push([r.k, r.flip]);
          return r;
        });
        const bads = fakes.slice(0, 4 - nGood).map((f) => ({ ...f, tile: reorient(rng, f.tile, []).tile }));
        const all = [...goods.map((g) => g.tile), ...bads.map((b) => b.tile)];
        const size = Math.max(7, ...all.map((x) => Math.max(bounds(x.pts).x1 - bounds(x.pts).x0, bounds(x.pts).y1 - bounds(x.pts).y0) + 2));
        const opts = [
          ...goods.map((g) => ({ fig: onSheet(g.tile, size, 'accent'), ok: true, why: `is shape S ${orientText(g.k, g.flip)}. It has the same size and shape, so it is congruent` })),
          ...bads.map((b) => ({ fig: onSheet(b.tile, size, 'accent'), ok: false, why: `${b.why}, so it is not congruent` })),
        ];
        const ctx = rng.pick([
          `${who} traced shape S on grid paper.`,
          `${who} is matching puzzle pieces. Shape S is one piece.`,
          `${who} cut shape S out of cardboard.`,
          'Shape S is a tile in a floor pattern.',
        ]);
        if (mode === 'which') {
          const answer = mcFigures(rng, opts.map((o) => ({ md: '', figure: o.fig as Figure, correct: o.ok })));
          const L = (o: (typeof opts)[number]) => String.fromCharCode(65 + (answer.kind === 'mc' ? answer.choices.findIndex((c) => c.figure === o.fig) : 0));
          return {
            prompt: `${ctx} Which shape is **congruent** to shape S?`,
            figure: onSheet(t, size),
            parts: [{ answer }],
            hints: ['Congruent shapes have the same size and the same shape. They can be turned or flipped.', 'Count squares along each side. A congruent shape has the same side lengths and corners, in any orientation.'],
            solution: [...opts.filter((o) => !o.ok).map((o) => `Shape ${L(o)} ${o.why}.`), `Shape ${L(opts[0])} ${opts[0].why}.`, `Shape ${L(opts[0])} is congruent to shape S.`],
            answerDisplay: `Shape ${L(opts[0])}`,
          };
        }
        const order = rng.shuffle(opts);
        const choices: Choice[] = order.map((o, i) => ({ id: 'abcd'[i], md: '', figure: o.fig }));
        const correct = choices.filter((_, i) => order[i].ok).map((c) => c.id);
        const names = (pred: (o: (typeof opts)[number]) => boolean) =>
          order
            .map((o, i) => (pred(o) ? String.fromCharCode(65 + i) : ''))
            .filter(Boolean)
            .join(', ');
        return {
          prompt: `${ctx} Select **all** the shapes that are congruent to shape S.`,
          figure: onSheet(t, size),
          parts: [{ answer: { kind: 'multi', choices, correct, layout: 'grid' } }],
          hints: ['A congruent shape can be turned or flipped, but it must have the same size and shape.', 'Compare side lengths by counting squares. A shape that is bigger, smaller or stretched is not congruent.'],
          solution: [...order.map((o, i) => `Shape ${String.fromCharCode(65 + i)} ${o.why}.`), `The congruent shapes are ${names((o) => o.ok)}.`],
          answerDisplay: `Shapes ${names((o) => o.ok)}`,
        };
      }
    }

    if (mode === 'yes-no') {
      for (;;) {
        const t = randomTile(rng);
        const yes = rng.chance(0.5);
        let other: Tile;
        let why: string;
        if (yes) {
          const r = reorient(rng, t);
          other = r.tile;
          why = `Shape 2 is shape 1 ${orientText(r.k, r.flip)}. Every side and corner matches, so they have the same size and the same shape.`;
        } else {
          const f = rng.pick(lookAlikes(rng, t));
          if (!f) continue;
          other = reorient(rng, f.tile, []).tile;
          why = `Shape 2 ${f.why}. It does not have the same size and shape as shape 1.`;
        }
        const b = bounds(t.pts);
        const ob = bounds(other.pts);
        const placed = mapTile(other, shift(b.x1 + 2 - ob.x0, b.y0 - ob.y0 + rng.int(-1, 1)));
        const idx = yes ? 0 : 1;
        const choices = ['Yes, they are congruent', 'No, they are not congruent'];
        return {
          prompt: `${rng.pick(PAIR_CTX)(who)} Are shape 1 and shape 2 congruent?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }, { tile: placed, color: 'accent', name: '2' }], {}),
          parts: [{ answer: fixedChoice(choices, idx) }],
          hints: ['Congruent shapes have the same size and shape. They may face different ways.', 'Imagine tracing shape 1. Could you turn or flip the tracing so it covers shape 2 exactly?'],
          solution: [why, yes ? 'A tracing of shape 1 can be turned or flipped to cover shape 2 exactly.' : 'A tracing of shape 1 cannot cover shape 2 exactly, no matter how it is turned or flipped.', `${choices[idx]}.`],
          answerDisplay: choices[idx],
        };
      }
    }

    if (mode === 'matching-side' || mode === 'perimeter') {
      const { t1, t2, len, flip, a2 } = trianglePair(rng);
      const u = rng.pick(['cm', 'cm', 'm']);
      const lab = (x: number) => `${x} ${u}`;
      const move = flip ? 'reflection' : 'rotation';
      const ctx = rng.pick([
        `${who} cut two triangles from a sheet of card.`,
        'Two triangular flags hang on a fence.',
        `${who} is building a model bridge with triangle-shaped braces.`,
        'Two triangular garden beds are shown.',
        `${who} drew two triangles on a poster.`,
      ]);
      const desc = `${flip ? 'flipped over and turned' : `turned ${a2 === 180 ? 'a half turn' : ''}`}`.trim();
      if (mode === 'matching-side') {
        const q = rng.int(0, 2);
        return {
          prompt: `${ctx} Triangle 2 is a ${move} of triangle 1, so the triangles are congruent. What is the length of the side marked **?**`,
          figure: trianglePairFigure(t1, t2, len.map(lab), len.map((_, i) => (i === q ? '?' : null))),
          parts: [numPart(len[q], { suffix: u })],
          hints: ['Congruent shapes have the same size and shape, so matching sides have the same length.', 'Find the side of triangle 1 that matches the side marked ?. Compare which side is the shortest, the longest, or in between.'],
          solution: [
            `Triangle 2 is triangle 1 ${desc}. Shapes related by symmetry are congruent, so matching sides are equal.`,
            `The side marked ? is the ${rankOf(len, q)} side of triangle 2.`,
            `The ${rankOf(len, q)} side of triangle 1 is $${len[q]}\\ \\text{${u}}$.`,
            `The side marked ? is $${len[q]}\\ \\text{${u}}$ long.`,
          ],
        };
      }
      // Perimeter of triangle 1 when one side is only labelled on triangle 2.
      const q = rng.int(0, 2);
      const per = len[0] + len[1] + len[2];
      const others = len.filter((_, i) => i !== q);
      return {
        prompt: `${ctx} Triangle 2 is a ${move} of triangle 1. One side of triangle 1 is marked **?**. What is the **perimeter** of triangle 1?`,
        figure: trianglePairFigure(t1, t2, len.map((x, i) => (i === q ? '?' : lab(x))), len.map((x, i) => (i === q ? lab(x) : null))),
        parts: [numPart(per, { suffix: u })],
        hints: ['Shapes related by symmetry are congruent, so matching sides are equal.', 'Find the side of triangle 2 that matches the side marked ?. Then add all three sides of triangle 1.'],
        solution: [
          `Triangle 2 is triangle 1 ${desc}, so the triangles are congruent.`,
          `The side marked ? is the ${rankOf(len, q)} side. The ${rankOf(len, q)} side of triangle 2 is $${len[q]}\\ \\text{${u}}$, so ? $= ${len[q]}\\ \\text{${u}}$.`,
          `Perimeter $= ${others[0]} + ${others[1]} + ${len[q]} = ${per}$`,
          `The perimeter of triangle 1 is $${per}\\ \\text{${u}}$.`,
        ],
      };
    }

    if (mode === 'classify') {
      for (;;) {
        const t = randomTile(rng);
        const kind = rng.weighted([['reflect', 1], ['rotate', 1], ['slide', 1], ['no', 1]] as const);
        let img: Tile;
        let why: string[];
        if (kind === 'no') {
          const f = rng.pick(lookAlikes(rng, t));
          const b = bounds(t.pts);
          const fb = bounds(f.tile.pts);
          img = mapTile(f.tile, shift(b.x1 + 2 - fb.x0, b.y0 - fb.y0));
          why = [`Shape 2 ${f.why}.`, 'The shapes do not have the same size and shape, so they are **not congruent**.'];
        } else {
          const pr = makePair(rng, t, kind);
          if (!pr) continue;
          img = pr.img;
          why =
            kind === 'reflect'
              ? ['Shape 2 is a mirror image of shape 1, so the shapes are congruent.', 'One reflection, in a mirror line halfway between them, maps shape 1 onto shape 2. They are related by **reflection symmetry**.']
              : kind === 'rotate'
                ? ['Shape 2 is shape 1 turned, not flipped, so the shapes are congruent.', `One rotation, ${TURN_TEXT[pr.turn!]}, maps shape 1 onto shape 2. They are related by **rotation symmetry**.`]
                : [
                    'Shape 2 has the same size and shape as shape 1, so the shapes are **congruent**.',
                    'But shape 2 faces exactly the same way: it is only slid over. No single reflection or single rotation maps shape 1 onto shape 2. Congruent shapes are not always related by symmetry.',
                  ];
        }
        const idx = kind === 'reflect' ? 0 : kind === 'rotate' ? 1 : kind === 'slide' ? 2 : 3;
        return {
          prompt: `${rng.pick(PAIR_CTX)(who)} Which statement describes shape 1 and shape 2?`,
          figure: paperFigure([{ tile: t, color: 'brand', name: '1' }, { tile: img, color: 'accent', name: '2' }], {}),
          parts: [{ answer: fixedChoice(CONG_CHOICES, idx) }],
          hints: [
            'First decide whether the shapes are congruent: same size and same shape.',
            'If they are congruent, is shape 2 a mirror image (reflection), a turned copy (rotation), or a copy that faces the same way (a slide)?',
          ],
          solution: [...why, `The answer is: ${CONG_CHOICES[idx].charAt(0).toLowerCase() + CONG_CHOICES[idx].slice(1)}.`],
          answerDisplay: CONG_CHOICES[idx],
        };
      }
    }

    // Statements about symmetry and congruence.
    const shape = rng.pick(['triangle', 'pentagon', 'quadrilateral', 'hexagon']);
    const templates = [
      {
        prompt: `${who} reflects a ${shape} in a mirror line. Which statement about the ${shape} and its image **must** be true?`,
        good: 'They are congruent: the same size and the same shape.',
        bad: ['They face the same way.', 'The image is bigger than the original.', `The image is a different kind of shape.`],
        why: 'A reflection only flips a shape. It does not change any side length or corner, so the image is congruent to the original. The image faces the opposite way.',
      },
      {
        prompt: `${who} rotates a ${shape} a quarter turn about one of its corners. Which statement about the ${shape} and its image is true?`,
        good: 'They are congruent, even though they face different ways.',
        bad: ['They are not congruent, because they face different ways.', 'The image is smaller than the original.', 'They are congruent only if they are side by side.'],
        why: 'A rotation only turns a shape. Its side lengths and corners do not change, so the image is congruent. Congruence does not depend on which way a shape faces or where it is.',
      },
      {
        prompt: `${who} says, "Any two congruent shapes are related by reflection symmetry or rotation symmetry." Which statement is true?`,
        good: `${who} is wrong. Two congruent shapes that are only slid apart are not related by one reflection or one rotation.`,
        bad: [`${who} is right. Congruent shapes always have reflection symmetry.`, `${who} is right. Congruent shapes always have rotation symmetry.`, `${who} is wrong. Congruent shapes can be different sizes.`],
        why: 'Shapes related by symmetry are always congruent. But congruent shapes are not always related by symmetry: a shape that is only slid over is congruent, yet no single reflection or rotation maps one onto the other.',
      },
      {
        prompt: `Two ${shape}s are related by rotation symmetry. ${who} measures one side of the first ${shape}: it is $${rng.int(3, 12)}\\ \\text{cm}$ long. Which statement is true?`,
        good: `The matching side of the second ${shape} has the same length.`,
        bad: [`The matching side of the second ${shape} is longer, because it was turned.`, 'You cannot tell anything about the second shape.', `The second ${shape} has a different number of sides.`],
        why: 'Shapes related by symmetry are congruent. Congruent shapes have matching sides of the same length.',
      },
      {
        prompt: `${who} has two congruent ${shape}s. Which statement **must** be true?`,
        good: 'One can be placed on top of the other so that they match exactly.',
        bad: ['They face the same way.', 'One is a reflection of the other.', 'They are touching.'],
        why: 'Congruent shapes have the same size and shape, so one can be moved (slid, turned or flipped) to cover the other exactly. They can face any way and be anywhere, and they are not always related by one reflection.',
      },
    ];
    const tp = rng.pick(templates);
    const answer = fixedChoice(rng.shuffle([tp.good, ...tp.bad]), 0);
    // fixedChoice keeps the order; find the correct one.
    if (answer.kind === 'mc') answer.correct = answer.choices.find((c) => c.md === tp.good)!.id;
    return {
      prompt: tp.prompt,
      parts: [{ answer }],
      hints: ['Congruent means the same size and the same shape, in any position or orientation.', 'Reflections and rotations move a shape without changing its size or shape.'],
      solution: [tp.why, `The true statement is: "${tp.good}"`],
      answerDisplay: tp.good,
    };
  },
});

export const CONGRUENCE_SKILLS: SkillDef[] = [symmetricShapes, congruence];
