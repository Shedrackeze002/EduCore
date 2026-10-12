/** Math 9 Unit 7 — Similarity and Scale (SS3, SS4). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers (also used by the circle and symmetry units)
// ---------------------------------------------------------------------------

export const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Noor', 'Marie-Ève', 'Tyler', 'Leilani',
];

/** A measurement in LaTeX: 12\ \text{cm}. */
export const ms = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A measurement as a figure label: "12 cm". */
export const fl = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x} ${u}`;
/** Large whole numbers with thin-space groups (50\,000) in LaTeX. */
const big = (n: number) => (Math.abs(n) >= 10000 ? fmt(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : fmt(n));
/** True when x has at most dp decimal places. */
const hasDp = (x: number, dp: number) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-7;
/** A value safely away from a rounding boundary at dp places. */
const safeRound = (x: number, dp: number) => {
  const f = Math.abs(x * 10 ** dp) % 1;
  return Math.abs(f - 0.5) > 0.06;
};

// ---------------------------------------------------------------------------
// Drawing: a canvas sketch whose labels are placed clear of every line
// (the approach of the Math 10-4 and Math 20-2 figures, with filled shapes and circles).
// ---------------------------------------------------------------------------

export type P = [number, number];
export type Color = 'brand' | 'accent' | 'muted';

export const rad = (d: number) => (d * Math.PI) / 180;
export const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
export const norm360 = (a: number) => ((a % 360) + 360) % 360;
export const dirTo = (a: P, b: P) => norm360((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
export const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const dist = (a: P, b: P) => Math.hypot(b[0] - a[0], b[1] - a[1]);
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

/** Liang–Barsky: does segment ab meet the box? */
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
  return Math.min(
    distPtSeg([box.x0, box.y0], a, b),
    distPtSeg([box.x0, box.y1], a, b),
    distPtSeg([box.x1, box.y0], a, b),
    distPtSeg([box.x1, box.y1], a, b),
    distPtBox(a, box),
    distPtBox(b, box),
  );
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
  /** Candidate text centres (data units) in order of preference; receives pixels per unit. */
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

/**
 * Collects lines, filled shapes, arcs and labels, then lays the figure out on a plane. Labels are drawn
 * with invisible anchor points (open + muted), and each label is placed where it stays clear of every line.
 */
export class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color; fill?: boolean }> = [];
  private dots: Array<{ p: P; color: Color }> = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];
  private extra: P[] = [];
  /** The smallest clearance (px) of any label in the last layout. */
  clearance = Infinity;
  /** Whether a crowded label in the last layout had candidates outside the canvas (a wider margin may help). */
  private cramped = false;

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean; arrowEnd?: boolean; arrowStart?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
    return this;
  }

  /** A polygon (closed unless closed: false), optionally shaded. */
  poly(points: P[], opts: { color?: Color; fill?: boolean; closed?: boolean } = {}) {
    const pts = opts.closed === false ? points : [...points, points[0]];
    this.polys.push({ points: pts, color: opts.color ?? 'brand', ...(opts.fill ? { fill: true } : {}) });
    for (let i = 0; i + 1 < pts.length; i++) this.obstacles.push([pts[i], pts[i + 1]]);
    return this;
  }

  /** A circle drawn as a closed polyline of n points. */
  circle(c: P, r: number, color: Color = 'brand', n = 72) {
    const pts = Array.from({ length: n + 1 }, (_, i) => at(c, (360 * i) / n, r));
    this.polys.push({ points: pts, color });
    for (let i = 0; i < n; i++) this.obstacles.push([pts[i], pts[i + 1]]);
    return this;
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

  /** Equal-length tick marks across the middle of segment pq. */
  ticks(p: P, q: P, count: number, size = 0.24) {
    const m = mid(p, q);
    const d = dirTo(p, q);
    for (let k = 0; k < count; k++) {
      const c = at(m, d, (k - (count - 1) / 2) * 0.2);
      this.seg(at(c, d + 90, size), at(c, d - 90, size), { color: 'accent' });
    }
    return this;
  }

  dot(p: P, color: Color = 'brand') {
    this.dots.push({ p, color });
    return this;
  }

  /** Reserve space so the layout box includes this point. */
  include(p: P) {
    this.extra.push(p);
    return this;
  }

  /** Label inside the angle region from direction a0 counterclockwise to a1, near vertex v (just beyond an arc of radius arcR, if given). */
  angleLabel(v: P, a0: number, a1: number, text: string, minPx = 18, arcR?: number, maxR?: number) {
    const span = norm360(a1 - a0) || 360;
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        const m = Math.max(minPx, arcR === undefined ? 0 : arcR * ppu + 9);
        // Stay well inside the arms of the angle, so the label cannot drift to another angle.
        const radii = [m, m + 6, m + 12, m + 19, m + 27, m + 36, m + 48, m + 62].filter((rpx, i) => i === 0 || maxR === undefined || rpx <= maxR * ppu);
        for (const rpx of radii)
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

  /** A title straight above (a = 90) or beside a shape, never inside it. */
  titleLabel(p: P, text: string, a = 90) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [19, 23, 28, 34, 42, 52]) for (const sx of [0, -10, 10, -20, 20]) out.push(at(at(p, a, dpx / ppu), a - 90, sx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label for a vertex where rays meet: tries the widest gaps between the rays first. */
  vertexLabel(v: P, rayDirs: number[], text: string) {
    const dirs = [...rayDirs].map(norm360).sort((a, b) => a - b);
    const gaps: Array<{ a0: number; span: number }> = dirs.map((a, i) => {
      const next = i + 1 < dirs.length ? dirs[i + 1] : dirs[0] + 360;
      return { a0: a, span: next - a };
    });
    gaps.sort((g, h) => h.span - g.span);
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const g of gaps)
          for (const rpx of [13, 16, 20, 25, 31])
            for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]) out.push(at(v, g.a0 + t * g.span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Label beside the side ab, on the side away from the point `inside`. */
  sideLabel(a: P, b: P, text: string, inside: P) {
    const m = mid(a, b);
    const d = dirTo(a, b);
    const n1 = d + 90;
    const toIn = dirTo(m, inside);
    const out = Math.cos(rad(n1 - toIn)) > 0 ? d - 90 : n1;
    const len = dist(a, b);
    this.pending.push({
      text,
      cands: (ppu) => {
        const res: P[] = [];
        // Sideways labels need extra room for half their width.
        const extra = Math.abs(Math.cos(rad(out))) * (textWidth(text) / 2);
        for (const dpx of [10, 13, 17, 22, 28, 35])
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
        for (const dpx of [4, 8, 12, 16, 22, 30]) for (let a = 0; a < 360; a += 45) out.push(at(c, a, dpx / ppu));
        return out;
      },
    });
    return this;
  }

  private place(bounds: Box, ppu: number, fixedBoxes: Box[]): PlanePoint[] {
    const placed: Box[] = [...fixedBoxes];
    const anchors: PlanePoint[] = [];
    this.clearance = Infinity;
    this.cramped = false;
    // Scores only matter up to a few pixels, so obstacles further away than CAP are skipped.
    const CAP = 12 / ppu;
    const obs = this.obstacles.map(([a, b]) => ({ a, b, x0: Math.min(a[0], b[0]), x1: Math.max(a[0], b[0]), y0: Math.min(a[1], b[1]), y1: Math.max(a[1], b[1]) }));
    for (const lab of this.pending) {
      const wpx = textWidth(lab.text);
      let best: { c: P; score: number } | null = null;
      let outside = false;
      for (const c of lab.cands(ppu)) {
        const hw = (wpx / 2 + 1.5) / ppu;
        const hh = 6.5 / ppu;
        const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const A: P = [c[0] - (8 + wpx / 2) / ppu, c[1] - 12.3 / ppu];
        let score: number;
        if (lab.fixed) score = 100;
        else if (box.x0 < bounds.x0 || box.x1 > bounds.x1 || box.y0 < bounds.y0 || box.y1 > bounds.y1) {
          score = -1000;
          outside = true;
        }
        else {
          let tc = CAP;
          let ac = CAP;
          const rx0 = Math.min(box.x0, A[0]) - CAP - 6 / ppu;
          const rx1 = box.x1 + CAP;
          const ry0 = Math.min(box.y0, A[1]) - CAP - 6 / ppu;
          const ry1 = box.y1 + CAP;
          for (const o of obs) {
            if (o.x1 < rx0 || o.x0 > rx1 || o.y1 < ry0 || o.y0 > ry1) continue;
            tc = Math.min(tc, distSegBox(o.a, o.b, box));
            ac = Math.min(ac, distPtSeg(A, o.a, o.b) - 5.5 / ppu);
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
      if (!lab.fixed) this.clearance = Math.min(this.clearance, best!.score);
      if (!lab.fixed && best!.score < 2 && outside) this.cramped = true;
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
  build(opts: { margin?: number; caption?: string; minWidth?: number } = {}): PlaneFigure {
    // Widen the margin until every label has room (or give up after a few tries).
    const m0 = opts.margin ?? 0.9;
    let fig = this.layout(m0, opts);
    for (const extra of [0.5, 1, 1.6, 2.4]) {
      if (this.clearance >= 2 || !this.cramped) break;
      fig = this.layout(m0 + extra, opts);
    }
    return fig;
  }

  private layout(m: number, opts: { caption?: string; minWidth?: number }): PlaneFigure {
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
    const wantW = Math.max(h, opts.minWidth ?? 0);
    if (w < wantW) {
      minX -= (wantW - w) / 2;
      maxX += (wantW - w) / 2;
      w = wantW;
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
      hideAxes: true,
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

/** The angle region at v between the rays to u and w, as [a0, a1] counterclockwise (span below 180°). */
export function wedge(v: P, u: P, w: P): [number, number] {
  const du = dirTo(v, u);
  const dw = dirTo(v, w);
  const s = norm360(dw - du);
  return s < 180 ? [du, du + s] : [dw, dw + (360 - s)];
}

/** Arc (or right-angle mark) and optional label for the angle at v between the rays to u and w. */
export function markAngle(s: Sketch, v: P, u: P, w: P, text: string | null, opts: { r?: number; right?: boolean; arc?: boolean } = {}) {
  const [a0, a1] = wedge(v, u, w);
  // Narrow angles get a larger arc, so the label can sit just beyond it and still read as this angle.
  const span = a1 - a0;
  const r = Math.max(opts.r ?? 0.5, span < 35 ? 1.05 : span < 55 ? 0.75 : 0);
  if (opts.right) s.rightMark(v, a0, opts.r ?? 0.4);
  else if (opts.arc ?? true) s.arc(v, r, a0, a1);
  const arm = Math.min(dist(v, u), dist(v, w));
  if (text) s.angleLabel(v, a0, a1, text, opts.right ? 24 : text.length > 3 ? 24 : 20, opts.right || opts.arc === false ? undefined : r, 0.8 * arm);
}

function signedArea(pts: P[]): number {
  let a = 0;
  for (let k = 0; k < pts.length; k++) {
    const [x1, y1] = pts[k];
    const [x2, y2] = pts[(k + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

/** Interior angle at vertex i of a simple polygon, as [from, to] directions measured counterclockwise. */
function interior(pts: P[], i: number): [number, number] {
  const n = pts.length;
  const v = pts[i];
  const dn = dirTo(v, pts[(i + 1) % n]);
  const dp = dirTo(v, pts[(i + n - 1) % n]);
  return signedArea(pts) > 0 ? [dn, dp] : [dp, dn];
}

export function centroid(pts: P[]): P {
  return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
}

/** Rotate points about the origin by `deg` degrees, optionally mirroring first (x → −x). */
function turn(pts: P[], deg: number, mirror = false): P[] {
  const c = Math.cos(rad(deg));
  const s = Math.sin(rad(deg));
  return pts.map(([x0, y]) => {
    const x = mirror ? -x0 : x0;
    return [x * c - y * s, x * s + y * c] as P;
  });
}

/** A polygon to draw: side i joins vertex i to vertex i + 1. */
interface ShapeSpec {
  pts: P[];
  sides?: Array<string | null>;
  verts?: string[];
  angles?: Array<string | null>;
  title?: string;
}

/** Draw one shape into a sketch (shifted by dx). */
function drawShape(s: Sketch, spec: ShapeSpec, dx: number, color: Color) {
  const pts = spec.pts.map(([x, y]) => [x + dx, y] as P);
  const n = pts.length;
  // Shapes with angle labels inside are left unshaded so the labels stay clear.
  s.poly(pts, { color, fill: !spec.angles?.some(Boolean) });
  const c = centroid(pts);
  pts.forEach((v, i) => {
    const lab = spec.angles?.[i];
    if (!lab) return;
    const [a0, a1] = interior(pts, i);
    if (lab === '90°') s.rightMark(v, a0, 0.3);
    else s.arc(v, 0.42, a0, a1);
  });
  pts.forEach((v, i) => {
    const lab = spec.angles?.[i];
    if (!lab) return;
    const [a0, a1] = interior(pts, i);
    s.angleLabel(v, a0, a1, lab, lab === '90°' ? 26 : 22);
  });
  pts.forEach((v, i) => {
    const lab = spec.sides?.[i];
    if (lab) s.sideLabel(v, pts[(i + 1) % n], lab, c);
  });
  spec.verts?.forEach((name, i) => {
    s.vertexLabel(pts[i], [dirTo(pts[i], pts[(i + 1) % n]), dirTo(pts[i], pts[(i + n - 1) % n])], name);
  });
  if (spec.title) {
    const top = Math.max(...pts.map((p) => p[1]));
    const xs = pts.map((p) => p[0]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    s.include([cx, top + 1.2]);
    s.titleLabel([cx, top], spec.title);
  }
}

/** Two polygons side by side, drawn to the same scale, with the gap widened until every label fits. */
function shapePair(a: ShapeSpec, b: ShapeSpec, size = 6): PlaneFigure {
  const shift = (pts: P[]): P[] => {
    const x0 = Math.min(...pts.map((p) => p[0]));
    const y0 = Math.min(...pts.map((p) => p[1]));
    return pts.map(([x, y]) => [x - x0, y - y0] as P);
  };
  const pa = shift(a.pts);
  const pb = shift(b.pts);
  const ext = Math.max(...pa.flat(), ...pb.flat());
  const k = size / ext;
  const A: ShapeSpec = { ...a, pts: pa.map(([x, y]) => [x * k, y * k] as P) };
  const B: ShapeSpec = { ...b, pts: pb.map(([x, y]) => [x * k, y * k] as P) };
  const wA = Math.max(...A.pts.map((p) => p[0]));
  let fig: PlaneFigure | null = null;
  for (const gap of [1.4, 2, 2.7, 3.5, 4.4, 5.5]) {
    const s = new Sketch();
    drawShape(s, A, 0, 'brand');
    drawShape(s, B, wA + gap, 'accent');
    fig = s.build({ margin: 1 });
    if (s.clearance >= 2) break;
  }
  return fig!;
}

/** One polygon on its own, scaled to a comfortable size. */
function shapeOne(a: ShapeSpec, size = 6, color: Color = 'brand'): PlaneFigure {
  const xs = a.pts.map((p) => p[0]);
  const ys = a.pts.map((p) => p[1]);
  const k = size / Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  const s = new Sketch();
  drawShape(s, { ...a, pts: a.pts.map(([x, y]) => [x * k, y * k] as P) }, 0, color);
  return s.build({ margin: 1 });
}

// ---------------------------------------------------------------------------
// Shape builders (side i joins vertex i to vertex i + 1)
// ---------------------------------------------------------------------------

const rectPts = (w: number, h: number): P[] => [
  [0, 0],
  [w, 0],
  [w, h],
  [0, h],
];
/** Right triangle with legs b (along the bottom) and h (up the left side). */
const rtTriPts = (b: number, h: number): P[] => [
  [0, 0],
  [b, 0],
  [0, h],
];
/** L-shaped logo w wide and h tall with arms t thick. */
const lPts = (w: number, h: number, t: number): P[] => [
  [0, 0],
  [w, 0],
  [w, t],
  [t, t],
  [t, h],
  [0, h],
];
/** Triangle ABC from its sides, with AB along the bottom (A at the origin). */
function sssPts(ab: number, bc: number, ca: number): P[] {
  const cx = (ab * ab + ca * ca - bc * bc) / (2 * ab);
  const cy = Math.sqrt(Math.max(ca * ca - cx * cx, 0));
  return [
    [0, 0],
    [ab, 0],
    [cx, cy],
  ];
}
/** Triangle from two angles at the ends of a base of length 1 (A at the origin, B at (1, 0)). */
function aaPts(angA: number, angB: number): P[] {
  const angC = 180 - angA - angB;
  const ac = Math.sin(rad(angB)) / Math.sin(rad(angC));
  return [[0, 0], [1, 0], at([0, 0], angA, ac)];
}
function parallelogramPts(a: number, b: number, deg: number): P[] {
  const t = rad(deg);
  return [
    [0, 0],
    [a, 0],
    [a + b * Math.cos(t), b * Math.sin(t)],
    [b * Math.cos(t), b * Math.sin(t)],
  ];
}
function regularPts(n: number, side: number): P[] {
  const R = side / (2 * Math.sin(Math.PI / n));
  return Array.from({ length: n }, (_, i) => at([0, 0], -90 - 180 / n + (360 * i) / n, R));
}

// ---------------------------------------------------------------------------
// Scale factors
// ---------------------------------------------------------------------------

/** k as num/den in lowest terms. */
interface K {
  num: number;
  den: number;
}
const kVal = (k: K) => k.num / k.den;
/** Terminating decimal? */
const terminates = (d: number) => {
  let x = d;
  while (x % 2 === 0) x /= 2;
  while (x % 5 === 0) x /= 5;
  return x === 1;
};
/** LaTeX for a scale factor: a whole number, a decimal, or a fraction when the decimal repeats. */
const kTex = (k: K) => (k.den === 1 ? `${k.num}` : terminates(k.den) ? fmt(k.num / k.den) : `\\dfrac{${k.num}}{${k.den}}`);
/** "= 3/4 = 0.75" chain for a quotient a/b in lowest terms. */
function quotientTex(a: number, b: number): string {
  const ai = Math.round(a * 1000);
  const bi = Math.round(b * 1000);
  const g = gcd(ai, bi);
  const n = ai / g;
  const d = bi / g;
  const parts = [`\\dfrac{${fmt(a)}}{${fmt(b)}}`];
  if (d !== 1 && (n !== a || d !== b)) parts.push(`\\dfrac{${n}}{${d}}`);
  if (d === 1) parts.push(`${n}`);
  else if (terminates(d)) parts.push(fmt(n / d));
  return parts.join(' = ');
}
/** Numeric part for a scale factor: a fraction in lowest terms when the decimal repeats. */
function kPart(k: K, label: string): Part {
  return terminates(k.den)
    ? numPart(kVal(k), { label, display: k.den === 1 ? undefined : 'decimal' })
    : numPart(kVal(k), { label, fraction: 'lowest' });
}
const kAsk = (k: K) => (terminates(k.den) ? '' : ' Write the scale factor as a fraction in lowest terms.');

const SF_HINTS = [
  'The scale factor compares a length on the new figure with the matching length on the original.',
  'Scale factor $k = \\dfrac{\\text{image length}}{\\text{original length}}$. Multiply an original length by $k$ to get the image length.',
];

type ShapeKind = 'rect' | 'tri' | 'L' | 'par';

/** Pick original dimensions (multiples of `mult`) for a shape kind; returns the polygon and its side lengths. */
function makeShape(rng: Rng, kind: ShapeKind, mult: number, maxUnits = 6): { dims: number[]; pts: (f: number) => P[]; sides: (f: number) => number[]; i: number; j: number } {
  if (kind === 'rect') {
    const [w, h] = retry(
      () => [rng.int(2, maxUnits), rng.int(1, maxUnits - 1)],
      ([w, h]) => w > h,
    ).map((x) => x * mult);
    return { dims: [w, h], pts: (f) => rectPts(w * f, h * f), sides: (f) => [w * f, h * f, w * f, h * f], i: 0, j: 1 };
  }
  if (kind === 'tri') {
    const [b, h] = retry(
      () => [rng.int(2, maxUnits), rng.int(2, maxUnits)],
      ([b, h]) => b !== h,
    ).map((x) => x * mult);
    return { dims: [b, h], pts: (f) => rtTriPts(b * f, h * f), sides: (f) => [b * f, Math.hypot(b, h) * f, h * f], i: 0, j: 2 };
  }
  if (kind === 'L') {
    const t = mult;
    const [w, h] = retry(
      () => [rng.int(3, maxUnits), rng.int(3, maxUnits)],
      ([w, h]) => w !== h,
    ).map((x) => x * mult);
    return { dims: [w, h, t], pts: (f) => lPts(w * f, h * f, t * f), sides: (f) => [w * f, t * f, (w - t) * f, (h - t) * f, t * f, h * f], i: 0, j: 5 };
  }
  const [a, b] = retry(
    () => [rng.int(3, maxUnits), rng.int(2, maxUnits - 1)],
    ([a, b]) => a > b,
  ).map((x) => x * mult);
  const ang = rng.pick([55, 60, 65, 70]);
  return { dims: [a, b], pts: (f) => parallelogramPts(a * f, b * f, ang), sides: (f) => [a * f, b * f, a * f, b * f], i: 0, j: 1 };
}

const SHAPE_NOUN: Record<ShapeKind, string> = { rect: 'rectangle', tri: 'right triangle', L: 'L-shaped logo', par: 'parallelogram' };

const SF_THINGS = [
  { thing: 'sticker', dim: 'wide' },
  { thing: 'photo', dim: 'wide' },
  { thing: 'school logo', dim: 'tall' },
  { thing: 'maple leaf decal', dim: 'wide' },
  { thing: 'map of the schoolyard', dim: 'wide' },
  { thing: 'poster', dim: 'tall' },
  { thing: 'hockey team crest', dim: 'tall' },
  { thing: 'pattern for a quilt square', dim: 'wide' },
];

function scaleFactorGen(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(['cm', 'cm', 'mm', 'm']);
  const name = rng.pick(NAMES);
  if (d === 1) {
    if (rng.chance(0.55)) {
      // Find the scale factor from a diagram, and say enlargement or reduction.
      const k = rng.pick<K>([
        { num: 2, den: 1 },
        { num: 3, den: 1 },
        { num: 4, den: 1 },
        { num: 1, den: 2 },
        { num: 1, den: 3 },
      ]);
      const kind = rng.pick<ShapeKind>(['rect', 'tri', 'L']);
      const sh = makeShape(rng, kind, k.den);
      const o = sh.sides(1)[sh.i];
      const img = sh.sides(kVal(k))[sh.i];
      const lab = (f: number, v: number) => sh.sides(f).map((_, idx) => (idx === sh.i ? fl(v, u) : null));
      return {
        prompt: `Shape B is a scale diagram of shape A. (a) What is the scale factor?${kAsk(k)} (b) Is shape B an enlargement or a reduction of shape A?`,
        figure: shapePair({ pts: sh.pts(1), sides: lab(1, o), title: 'A' }, { pts: sh.pts(kVal(k)), sides: lab(kVal(k), img), title: 'B' }),
        parts: [kPart(k, '(a) $k =$'), { label: '(b)', answer: fixedChoice(['An enlargement', 'A reduction'], kVal(k) > 1 ? 0 : 1) }],
        hints: SF_HINTS,
        solution: [
          `The matching sides are $${ms(o, u)}$ on A (the original) and $${ms(img, u)}$ on B (the image).`,
          `$k = \\dfrac{\\text{image length}}{\\text{original length}} = ${quotientTex(img, o)}$`,
          kVal(k) > 1
            ? `(a) $k = ${kTex(k)}$. (b) $k$ is greater than 1, so B is an **enlargement** of A.`
            : `(a) $k = ${kTex(k)}$. (b) $k$ is less than 1, so B is a **reduction** of A.`,
        ],
      };
    }
    // Apply a scale factor.
    const t = rng.pick(SF_THINGS);
    const k = rng.pick<K>([
      { num: 2, den: 1 },
      { num: 3, den: 1 },
      { num: 4, den: 1 },
      { num: 5, den: 1 },
      { num: 1, den: 2 },
    ]);
    const uu = rng.pick(['cm', 'mm']);
    const o = k.den === 2 ? 2 * rng.int(3, 15) : rng.int(3, 15);
    const img = o * kVal(k);
    return {
      prompt: `A ${t.thing} is $${ms(o, uu)}$ ${t.dim}. ${name} makes a scale diagram of it with a scale factor of $${k.den === 1 ? k.num : '\\frac{1}{2}'}$. How ${t.dim} is the scale diagram?`,
      parts: [numPart(img, { suffix: uu })],
      hints: [`A scale factor of $${k.den === 1 ? k.num : '\\frac{1}{2}'}$ means every length is multiplied by $${k.den === 1 ? k.num : '\\frac{1}{2}'}$.`, 'Image length $=$ scale factor $\\times$ original length.'],
      solution: [
        'Image length $=$ scale factor $\\times$ original length.',
        k.den === 1 ? `$${k.num} \\times ${fmt(o)} = ${fmt(img)}$` : `$\\frac{1}{2} \\times ${fmt(o)} = ${fmt(o)} \\div 2 = ${fmt(img)}$`,
        `The scale diagram is $${ms(img, uu)}$ ${t.dim}${k.den === 1 ? '. It is an enlargement' : '. It is a reduction'}.`,
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    if (rng.chance(0.6)) {
      // Scale factor from one pair of sides, then a missing side.
      const k = rng.pick<K>([
        { num: 3, den: 2 },
        { num: 5, den: 2 },
        { num: 3, den: 4 },
        { num: 5, den: 4 },
        { num: 2, den: 5 },
        { num: 3, den: 5 },
        { num: 4, den: 5 },
        { num: 6, den: 5 },
        { num: 2, den: 3 },
        { num: 4, den: 3 },
        { num: 5, den: 3 },
      ]);
      const kind = rng.pick<ShapeKind>(['rect', 'tri', 'L', 'par']);
      const sh = makeShape(rng, kind, k.den, 5);
      const so = sh.sides(1);
      const si = sh.sides(kVal(k));
      const x = si[sh.j];
      const labA = so.map((v, idx) => (idx === sh.i || idx === sh.j ? fl(v, u) : null));
      const labB = si.map((v, idx) => (idx === sh.i ? fl(v, u) : idx === sh.j ? 'x' : null));
      return {
        prompt: `The ${SHAPE_NOUN[kind]} B is a scale diagram of the ${SHAPE_NOUN[kind]} A. (a) Find the scale factor.${kAsk(k)} (b) Find the length $x$.`,
        figure: shapePair({ pts: sh.pts(1), sides: labA, title: 'A' }, { pts: sh.pts(kVal(k)), sides: labB, title: 'B' }),
        parts: [kPart(k, '(a) $k =$'), numPart(x, { label: '(b) $x =$', suffix: u })],
        hints: [
          'Use the pair of matching sides where you know **both** lengths to find $k$.',
          `$k = \\dfrac{\\text{image}}{\\text{original}}$. Then multiply the other side of A by $k$ to find $x$.`,
        ],
        solution: [
          `Both lengths are known for one pair of matching sides: $${ms(so[sh.i], u)}$ on A and $${ms(si[sh.i], u)}$ on B.`,
          `(a) $k = ${quotientTex(si[sh.i], so[sh.i])}$`,
          `(b) $x = k \\times ${fmt(so[sh.j])} = ${kTex(k)} \\times ${fmt(so[sh.j])} = ${fmt(x)}$`,
          `The scale factor is $${kTex(k)}$ and $x = ${ms(x, u)}$.`,
        ],
      };
    }
    // Two dimensions from a decimal scale factor.
    const job = rng.pick([
      { what: 'poster', copy: 'flyer', verb: 'reduced', why: 'to make a flyer', u: 'cm', ks: [0.4, 0.6, 0.75, 0.8, 0.25] },
      { what: 'photo', copy: 'yearbook cover photo', verb: 'enlarged', why: 'for the yearbook cover', u: 'cm', ks: [1.5, 2.5, 1.25, 1.2] },
      { what: 'banner design', copy: 'gym wall banner', verb: 'enlarged', why: 'for the gym wall', u: 'cm', ks: [1.5, 2.5, 3.5, 1.2] },
      { what: 'garden plan', copy: 'notebook copy', verb: 'reduced', why: 'to fit in a notebook', u: 'cm', ks: [0.4, 0.6, 0.75, 0.8] },
      { what: 'team logo', copy: 'jersey logo', verb: 'enlarged', why: 'for a jersey', u: 'mm', ks: [1.5, 2.5, 1.25, 1.75] },
    ]);
    const k = rng.pick(job.ks);
    const [w, h] = retry(
      () => [rng.int(8, 60), rng.int(6, 50)],
      ([w, h]) => w > h && hasDp(w * k, 1) && hasDp(h * k, 1) && w !== 2 * h,
    );
    const a = roundTo(w * k, 2);
    const b = roundTo(h * k, 2);
    return {
      prompt: `A ${job.what} is $${ms(w, job.u)}$ long and $${ms(h, job.u)}$ wide. ${name} has it ${job.verb} ${job.why} using a scale factor of $${fmt(k)}$. What are the length and width of the ${job.copy}?`,
      parts: [numPart(a, { label: 'Length', suffix: job.u }), numPart(b, { label: 'Width', suffix: job.u })],
      hints: ['Every length is multiplied by the same scale factor.', `Multiply each dimension by $${fmt(k)}$.`],
      solution: [
        `Length: $${fmt(k)} \\times ${w} = ${fmt(a)}$`,
        `Width: $${fmt(k)} \\times ${h} = ${fmt(b)}$`,
        `The ${job.copy} is $${ms(a, job.u)}$ long and $${ms(b, job.u)}$ wide. ${k > 1 ? 'Both lengths grew, as they should in an enlargement.' : 'Both lengths shrank, as they should in a reduction.'}`,
      ],
    };
  }
  // d = 3
  const kind = rng.int(0, 3);
  if (kind === 0) {
    // Fit to a target side: find k, then the other side.
    const [w, h] = rng.pick([
      [10, 15],
      [8, 12],
      [12, 18],
      [20, 30],
      [16, 20],
      [9, 12],
      [15, 20],
      [24, 36],
    ]);
    const k = retry(
      () => rng.pick([0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1.2, 1.25, 1.5, 1.75, 2.5, 3.5]),
      (k) => hasDp(w * k, 1) && hasDp(h * k, 1),
    );
    const enl = k > 1;
    const what = rng.pick(['photo', 'painting', 'drawing', 'comic panel']);
    return {
      prompt: `${name} has a $${ms(w, 'cm')}$ by $${ms(h, 'cm')}$ ${what}. ${name} wants a scale copy whose shorter side is $${ms(roundTo(w * k, 2), 'cm')}$. How long will the longer side of the copy be?`,
      parts: [numPart(roundTo(h * k, 2), { suffix: 'cm', label: 'Longer side' })],
      hints: ['First find the scale factor from the two shorter sides.', 'Then multiply the longer side of the original by that scale factor.'],
      solution: [
        `Scale factor from the shorter sides: $k = \\dfrac{${fmt(roundTo(w * k, 2))}}{${w}} = ${fmt(k)}$`,
        `Longer side: $${fmt(k)} \\times ${h} = ${fmt(roundTo(h * k, 2))}$`,
        `The longer side of the copy is $${ms(roundTo(h * k, 2), 'cm')}$. ${enl ? 'The copy is an enlargement.' : 'The copy is a reduction.'}`,
      ],
    };
  }
  if (kind === 1) {
    // Find the original from the image.
    const job = rng.pick([
      { thing: 'model of a grain elevator', real: 'grain elevator', feat: 'the model', dim: 'tall', u: 'cm', ks: [0.02, 0.025, 0.04, 0.05], big: [15, 30] },
      { thing: 'scale drawing of a canoe', real: 'canoe', feat: 'the drawing of the canoe', dim: 'long', u: 'cm', ks: [0.04, 0.05, 0.025], big: [4, 6] },
      { thing: 'enlarged photo of a ladybug', real: 'ladybug', feat: 'the ladybug in the photo', dim: 'long', u: 'mm', ks: [5, 8, 12, 15], big: [0.5, 0.8] },
      { thing: 'enlarged drawing of a snowflake', real: 'snowflake', feat: 'the snowflake in the drawing', dim: 'wide', u: 'mm', ks: [20, 25, 40], big: [0.2, 0.4] },
      { thing: 'reduced copy of a mural', real: 'mural', feat: 'the copy', dim: 'wide', u: 'cm', ks: [0.05, 0.04, 0.1], big: [3, 8] },
    ]);
    const k = rng.pick(job.ks);
    // Original sized in metres for the large objects and in millimetres for the small ones.
    if (job.u === 'cm') {
      const origM = retry(
        () => rng.float(job.big[0], job.big[1], 1),
        (m) => hasDp(m * 100 * k, 1),
      );
      const img = roundTo(origM * 100 * k, 2);
      return {
        prompt: `A ${job.thing} uses a scale factor of $${fmt(k)}$. ${cap(job.feat)} is $${ms(img, 'cm')}$ ${job.dim}. How ${job.dim} is the real ${job.real}, in metres?`,
        parts: [numPart(origM, { suffix: 'm' })],
        hints: ['Image length $= k \\times$ original length, so original length $=$ image length $\\div k$.', 'Divide, then change centimetres to metres ($100\\ \\text{cm} = 1\\ \\text{m}$).'],
        solution: [
          `Original $= \\dfrac{\\text{image}}{k} = \\dfrac{${fmt(img)}}{${fmt(k)}} = ${fmt(roundTo(origM * 100, 2))}\\ \\text{cm}$`,
          `$${fmt(roundTo(origM * 100, 2))}\\ \\text{cm} = ${fmt(roundTo(origM * 100, 2))} \\div 100 = ${fmt(origM)}\\ \\text{m}$`,
          `The real ${job.real} is $${ms(origM, 'm')}$ ${job.dim}.`,
        ],
      };
    }
    const origCm = retry(
      () => rng.float(job.big[0], job.big[1], 2),
      (c) => hasDp(c * 10 * k, 1) && c * 10 * k >= 3,
    );
    const origMm = roundTo(origCm * 10, 2);
    const img = roundTo(origMm * k, 2);
    return {
      prompt: `An ${job.thing} uses a scale factor of $${fmt(k)}$. ${cap(job.feat)} is $${ms(img, 'mm')}$ ${job.dim}. How ${job.dim} is the real ${job.real}, in millimetres?`,
      parts: [numPart(origMm, { suffix: 'mm' })],
      hints: ['Image length $= k \\times$ original length, so original length $=$ image length $\\div k$.', `Divide $${fmt(img)}$ by $${fmt(k)}$.`],
      solution: [
        `Original $= \\dfrac{\\text{image}}{k} = \\dfrac{${fmt(img)}}{${fmt(k)}} = ${fmt(origMm)}$`,
        `Check: the scale factor is greater than 1, so the real ${job.real} should be smaller than the image. It is.`,
        `The real ${job.real} is $${ms(origMm, 'mm')}$ ${job.dim}.`,
      ],
    };
  }
  if (kind === 2) {
    // Two scale factors in a row.
    const [k1, k2] = retry(
      () => [rng.pick([1.5, 2, 2.5, 3, 4]), rng.pick([0.2, 0.4, 0.5, 0.6, 0.75, 0.8])],
      ([a, b]) => Math.abs(a * b - 1) > 1e-9,
    );
    const k = roundTo(k1 * k2, 4);
    const o = retry(
      () => rng.int(4, 40),
      (o) => hasDp(o * k, 2),
    );
    const fin = roundTo(o * k, 3);
    return {
      prompt: `${name} enlarges a design using a scale factor of $${fmt(k1)}$. Then ${name} reduces the enlargement using a scale factor of $${fmt(k2)}$. (a) What single scale factor takes the original design to the final design? (b) A side of the original design is $${ms(o, 'cm')}$ long. How long is it in the final design?`,
      parts: [numPart(k, { label: '(a) $k =$', display: 'decimal' }), numPart(fin, { label: '(b)', suffix: 'cm' })],
      hints: ['Follow one length through both steps: multiply by the first scale factor, then by the second.', 'Two scale factors in a row multiply: $k = k_1 \\times k_2$.'],
      solution: [
        `(a) $k = ${fmt(k1)} \\times ${fmt(k2)} = ${fmt(k)}$`,
        `(b) $${fmt(k)} \\times ${o} = ${fmt(fin)}$. Check in two steps: $${o} \\times ${fmt(k1)} = ${fmt(roundTo(o * k1, 3))}$, then $${fmt(roundTo(o * k1, 3))} \\times ${fmt(k2)} = ${fmt(fin)}$.`,
        `The single scale factor is $${fmt(k)}$, ${k > 1 ? 'an enlargement overall' : 'a reduction overall'}, and the side is $${ms(fin, 'cm')}$ long.`,
      ],
    };
  }
  // Perimeter of an enlarged or reduced triangle.
  const sides = retry(
    () => [rng.int(3, 12), rng.int(3, 12), rng.int(3, 12)].sort((a, b) => a - b),
    (t) => t[0] + t[1] > t[2] + 1 && new Set(t).size === 3,
  );
  const k = rng.pick([1.5, 2.5, 0.4, 0.6, 1.2, 0.8, 3.5]);
  const img = sides.map((x) => roundTo(x * k, 2));
  const per = roundTo(img.reduce((a, b) => a + b, 0), 2);
  return {
    prompt: `A triangular pennant for a school team has sides of $${ms(sides[0], 'cm')}$, $${ms(sides[1], 'cm')}$ and $${ms(sides[2], 'cm')}$. ${name} makes a scale diagram of it with a scale factor of $${fmt(k)}$. What is the perimeter of the scale diagram?`,
    figure: shapeOne({ pts: sssPts(sides[2], sides[1], sides[0]), sides: [fl(sides[2], 'cm'), fl(sides[1], 'cm'), fl(sides[0], 'cm')] }),
    parts: [numPart(per, { suffix: 'cm', label: 'Perimeter' })],
    hints: ['Find each side of the scale diagram first.', `Multiply each side by $${fmt(k)}$, then add the three new sides.`],
    solution: [
      `New sides: $${sides.map((x, i) => `${fmt(k)} \\times ${x} = ${fmt(img[i])}`).join(',\\ ')}$`,
      `Perimeter: $${img.map(fmt).join(' + ')} = ${fmt(per)}$`,
      `The perimeter of the scale diagram is $${ms(per, 'cm')}$. (It is also $${fmt(k)} \\times ${sides.reduce((a, b) => a + b, 0)}$, the scale factor times the original perimeter.)`,
    ],
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const scaleFactor = skill({
  id: 'm9-scale-factor',
  name: 'Scale factors for enlargements and reductions',
  description: 'Find a scale factor from matching lengths, tell an enlargement from a reduction, and use a scale factor to find new dimensions.',
  outcomes: ['SS4'],
  lessonId: 'm9-7-1',
  calculator: true,
  gen: scaleFactorGen,
});

// ---------------------------------------------------------------------------
// Scale diagrams and maps
// ---------------------------------------------------------------------------

const PLANS = [
  { thing: 'classroom', lo: 7, hi: 12 },
  { thing: 'cabin', lo: 6, hi: 10 },
  { thing: 'community garden', lo: 8, hi: 20 },
  { thing: 'backyard skating rink', lo: 10, hi: 20 },
  { thing: 'school stage', lo: 6, hi: 12 },
  { thing: 'campsite', lo: 10, hi: 24 },
  { thing: 'barn', lo: 15, hi: 30 },
  { thing: 'bedroom', lo: 3, hi: 5 },
  { thing: 'deck', lo: 3, hi: 6 },
  { thing: 'school gym', lo: 20, hi: 36 },
];

const ROUTES = [
  'the trail from the campground to the lookout',
  'the road from the farm to the town',
  'the bike path from the school to the recreation centre',
  'the canoe route across the lake',
  'the cross-country ski trail between the two warming huts',
  'the hiking trail from the parking lot to the waterfall',
  'the walk from the bus stop to the arena',
];

const MAP_SCALES = [20000, 25000, 50000, 100000, 250000];
const PLAN_SCALES = [20, 25, 40, 50, 100, 200];

/** Floor plan of a rectangle drawn a by b (cm on the drawing), labelled. */
function planFigure(a: number, b: number, labA: string, labB: string | null): PlaneFigure {
  return shapeOne({ pts: rectPts(a, b), sides: [labA, labB, null, null] }, 6);
}

/** Map sketch: two places joined by a dashed route, with the map distance labelled. */
function mapFigure(dCm: number, start: string, end: string, rng: Rng): PlaneFigure {
  const s = new Sketch();
  const ang = rng.pick([-20, -10, 10, 20, 30]);
  const A: P = [0, 0];
  const B = at(A, ang, 6);
  s.seg(A, B, { dashed: true, color: 'accent' });
  s.dot(A).dot(B);
  s.endLabel(A, ang + 180, start);
  s.endLabel(B, ang, end);
  s.sideLabel(A, B, fl(dCm, 'cm'), at(mid(A, B), ang - 90, 1));
  return s.build({ margin: 1.2, minWidth: 9 });
}

function scaleDiagramGen(rng: Rng, d: Difficulty): GenOutput {
  const name = rng.pick(NAMES);
  if (d === 1) {
    const plan = rng.pick(PLANS);
    const k = rng.pick(plan.hi <= 6 ? [0.5, 1] : plan.hi <= 12 ? [1, 2] : [2, 4, 5]);
    const kTxt = k === 0.5 ? '50 cm' : `${k} m`;
    const actual = retry(
      () => rng.float(plan.lo, plan.hi, 1),
      (a) => hasDp(a / k, 1) && a / k >= 2 && a / k <= 16,
    );
    const draw = roundTo(actual / k, 2);
    const repr = k === 0.5 ? `$${ms(50, 'cm')}$` : `$${ms(k, 'm')}$`;
    if (rng.chance(0.5)) {
      return {
        prompt: `On a scale diagram of a ${plan.thing}, $1\\ \\text{cm}$ represents ${repr}. The ${plan.thing} is $${ms(draw, 'cm')}$ long on the diagram. How long is the real ${plan.thing}, in metres?`,
        figure: planFigure(draw, Math.max(1.5, roundTo(draw * rng.pick([0.5, 0.6, 0.7]), 1)), fl(draw, 'cm'), null),
        parts: [numPart(actual, { suffix: 'm' })],
        hints: [`Each centimetre on the diagram stands for ${kTxt} in real life.`, `Multiply the diagram length by ${k === 0.5 ? '$0.5\\ \\text{m}$' : `$${k}\\ \\text{m}$`}.`],
        solution: [
          k === 0.5 ? '$50\\ \\text{cm} = 0.5\\ \\text{m}$, so each centimetre on the diagram stands for $0.5\\ \\text{m}$.' : `Each centimetre on the diagram stands for $${ms(k, 'm')}$.`,
          `$${fmt(draw)} \\times ${fmt(k)} = ${fmt(actual)}$`,
          `The real ${plan.thing} is $${ms(actual, 'm')}$ long.`,
        ],
        calculator: false,
      };
    }
    return {
      prompt: `${name} is drawing a scale diagram of a ${plan.thing} where $1\\ \\text{cm}$ represents ${repr}. The real ${plan.thing} is $${ms(actual, 'm')}$ long. How long should it be on the diagram?`,
      parts: [numPart(draw, { suffix: 'cm' })],
      hints: [`Find how many groups of ${kTxt} fit into $${ms(actual, 'm')}$.`, `Divide the real length by ${k === 0.5 ? '$0.5\\ \\text{m}$' : `$${k}\\ \\text{m}$`}; each group is $1\\ \\text{cm}$ on the diagram.`],
      solution: [
        k === 0.5 ? 'Each $0.5\\ \\text{m}$ of the real length is $1\\ \\text{cm}$ on the diagram.' : `Each $${ms(k, 'm')}$ of the real length is $1\\ \\text{cm}$ on the diagram.`,
        `$${fmt(actual)} \\div ${fmt(k)} = ${fmt(draw)}$`,
        `The ${plan.thing} should be $${ms(draw, 'cm')}$ long on the diagram.`,
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 3);
    if (kind <= 1) {
      // Map scale 1 : n.
      const n = rng.pick(MAP_SCALES);
      const route = rng.pick(ROUTES);
      const dCm = retry(
        () => rng.float(2, 16, 1),
        (x) => x * 10 !== Math.round(x) * 10 || rng.chance(0.3),
      );
      const cmReal = roundTo(dCm * n, 2);
      const km = roundTo(cmReal / 100000, 4);
      if (kind === 0) {
        return {
          prompt: `A hiking map has a scale of $1 : ${big(n)}$. On the map, ${route} is $${ms(dCm, 'cm')}$ long. How long is it in real life, in kilometres?`,
          figure: mapFigure(dCm, 'Start', 'End', rng),
          parts: [numPart(km, { suffix: 'km' })],
          hints: [`$1 : ${big(n)}$ means $1\\ \\text{cm}$ on the map is $${big(n)}\\ \\text{cm}$ in real life.`, 'Multiply to get centimetres, then divide by $100\\,000$ to change centimetres to kilometres ($1\\ \\text{km} = 100\\,000\\ \\text{cm}$).'],
          solution: [
            `Real distance: $${fmt(dCm)} \\times ${big(n)} = ${big(cmReal)}\\ \\text{cm}$`,
            `$1\\ \\text{km} = 1000\\ \\text{m} = 100\\,000\\ \\text{cm}$, so $${big(cmReal)} \\div 100\\,000 = ${fmt(km)}$`,
            `${cap(route)} is $${ms(km, 'km')}$ long.`,
          ],
        };
      }
      return {
        prompt: `${name} is making a map with a scale of $1 : ${big(n)}$. In real life, ${route} is $${ms(km, 'km')}$ long. How long should it be on the map, in centimetres?`,
        parts: [numPart(dCm, { suffix: 'cm' })],
        hints: ['Change the real distance to centimetres first ($1\\ \\text{km} = 100\\,000\\ \\text{cm}$).', `Then divide by $${big(n)}$, because every $${big(n)}\\ \\text{cm}$ in real life is $1\\ \\text{cm}$ on the map.`],
        solution: [
          `$${fmt(km)}\\ \\text{km} = ${fmt(km)} \\times 100\\,000 = ${big(cmReal)}\\ \\text{cm}$`,
          `Map distance: $${big(cmReal)} \\div ${big(n)} = ${fmt(dCm)}$`,
          `It should be $${ms(dCm, 'cm')}$ long on the map.`,
        ],
      };
    }
    // Floor plan 1 : n.
    const plan = rng.pick(PLANS.filter((p) => p.hi <= 36));
    const n = rng.pick(PLAN_SCALES.filter((s) => (plan.hi * 100) / s >= 4 && (plan.lo * 100) / s <= 25));
    const draw = retry(
      () => rng.float(Math.max(3, (plan.lo * 100) / n), Math.min(25, (plan.hi * 100) / n), 1),
      (x) => hasDp((x * n) / 100, 2),
    );
    const realCm = roundTo(draw * n, 2);
    const realM = roundTo(realCm / 100, 4);
    if (kind === 2) {
      return {
        prompt: `A plan of a ${plan.thing} is drawn to a scale of $1 : ${n}$. One side of the ${plan.thing} is $${ms(draw, 'cm')}$ long on the plan. How long is that side of the real ${plan.thing}, in metres?`,
        figure: planFigure(draw, roundTo(draw * rng.pick([0.55, 0.65, 0.75]), 1), fl(draw, 'cm'), null),
        parts: [numPart(realM, { suffix: 'm' })],
        hints: [`$1 : ${n}$ means each length in real life is $${n}$ times the length on the plan.`, 'Multiply by the scale, then change centimetres to metres (divide by $100$).'],
        solution: [`Real length: $${fmt(draw)} \\times ${n} = ${fmt(realCm)}\\ \\text{cm}$`, `$${fmt(realCm)}\\ \\text{cm} \\div 100 = ${fmt(realM)}\\ \\text{m}$`, `That side of the real ${plan.thing} is $${ms(realM, 'm')}$ long.`],
      };
    }
    return {
      prompt: `${name} is drawing a plan of a ${plan.thing} to a scale of $1 : ${n}$. One side of the ${plan.thing} is $${ms(realM, 'm')}$ long. How long should that side be on the plan, in centimetres?`,
      parts: [numPart(draw, { suffix: 'cm' })],
      hints: ['Change the real length to centimetres first.', `Then divide by $${n}$.`],
      solution: [`$${fmt(realM)}\\ \\text{m} = ${fmt(realM)} \\times 100 = ${fmt(realCm)}\\ \\text{cm}$`, `Plan length: $${fmt(realCm)} \\div ${n} = ${fmt(draw)}$`, `That side should be $${ms(draw, 'cm')}$ long on the plan.`],
    };
  }
  // d = 3
  const kind = rng.int(0, 3);
  if (kind === 0) {
    // Find the scale 1 : n.
    if (rng.chance(0.5)) {
      const plan = rng.pick(PLANS);
      const n = rng.pick([20, 25, 40, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500]);
      const draw = retry(
        () => rng.float(4, 24, 1),
        (x) => hasDp((x * n) / 100, 2) && (x * n) / 100 >= plan.lo * 0.6 && (x * n) / 100 <= plan.hi * 1.4,
        200,
      );
      const realM = roundTo((draw * n) / 100, 4);
      return {
        prompt: `A ${plan.thing} is $${ms(realM, 'm')}$ long. On a scale diagram, its length is $${ms(draw, 'cm')}$. Write the scale of the diagram in the form $1 : n$.`,
        parts: [numPart(n, { label: 'Scale $1 :$' })],
        hints: ['Both lengths must be in the same unit. Change metres to centimetres.', 'Then find how many times as long the real length is: real $\\div$ diagram.'],
        solution: [
          `$${fmt(realM)}\\ \\text{m} = ${fmt(roundTo(realM * 100, 2))}\\ \\text{cm}$`,
          `$\\dfrac{\\text{real}}{\\text{diagram}} = \\dfrac{${fmt(roundTo(realM * 100, 2))}}{${fmt(draw)}} = ${n}$`,
          `Every length in real life is $${n}$ times as long, so the scale is $1 : ${n}$.`,
        ],
      };
    }
    const n = rng.pick(MAP_SCALES);
    const dCm = rng.float(2, 15, 1);
    const km = roundTo((dCm * n) / 100000, 4);
    return {
      prompt: `Two campsites are $${ms(km, 'km')}$ apart. On a park map they are $${ms(dCm, 'cm')}$ apart. Write the scale of the map in the form $1 : n$.`,
      parts: [numPart(n, { label: 'Scale $1 :$' })],
      hints: ['Change kilometres to centimetres: $1\\ \\text{km} = 100\\,000\\ \\text{cm}$.', 'Then divide the real distance by the map distance.'],
      solution: [
        `$${fmt(km)}\\ \\text{km} = ${fmt(km)} \\times 100\\,000 = ${big(roundTo(km * 100000, 2))}\\ \\text{cm}$`,
        `$\\dfrac{${big(roundTo(km * 100000, 2))}}{${fmt(dCm)}} = ${big(n)}$`,
        `The scale is $1 : ${big(n)}$.`,
      ],
    };
  }
  if (kind === 1) {
    // Fencing from a plan.
    const n = rng.pick([50, 100, 200, 250, 400, 500]);
    const [a, b] = retry(
      () => [rng.float(4, 16, 1), rng.float(3, 12, 1)],
      ([a, b]) => a > b + 1 && hasDp((a * n) / 100, 2) && hasDp((b * n) / 100, 2),
    );
    const L = roundTo((a * n) / 100, 4);
    const W = roundTo((b * n) / 100, 4);
    const per = roundTo(2 * (L + W), 4);
    const what = rng.pick(['a dog run', 'a vegetable garden', 'a goat pen', 'a backyard rink', 'a play area']);
    return {
      prompt: `A plan of ${what} is drawn to a scale of $1 : ${n}$. On the plan, the rectangle is $${ms(a, 'cm')}$ by $${ms(b, 'cm')}$. ${name} wants to put a fence all the way around the real ${what.replace(/^an? /, '')}. How many metres of fencing are needed?`,
      figure: planFigure(a, b, fl(a, 'cm'), fl(b, 'cm')),
      parts: [numPart(per, { suffix: 'm' })],
      hints: ['Find the real length and width first.', `Multiply each plan length by $${n}$ and change to metres. Then find the perimeter.`],
      solution: [
        `Real length: $${fmt(a)} \\times ${n} = ${fmt(roundTo(a * n, 2))}\\ \\text{cm} = ${fmt(L)}\\ \\text{m}$`,
        `Real width: $${fmt(b)} \\times ${n} = ${fmt(roundTo(b * n, 2))}\\ \\text{cm} = ${fmt(W)}\\ \\text{m}$`,
        `Perimeter: $2 \\times ${fmt(L)} + 2 \\times ${fmt(W)} = ${fmt(per)}$`,
        `${name} needs $${ms(per, 'm')}$ of fencing.`,
      ],
    };
  }
  if (kind === 2) {
    // Map distance and travel time.
    const trip = rng.pick([
      { who: 'cycles', speeds: [12, 15, 16, 18, 20, 24], routes: ['the bike path from the school to the recreation centre', 'the gravel road from the farm to the town', 'the paved trail along the river'] },
      { who: 'walks', speeds: [4, 5, 6], routes: ['the trail from the campground to the lookout', 'the hiking trail from the parking lot to the waterfall'] },
      { who: 'paddles a canoe', speeds: [4, 5, 6], routes: ['the canoe route across the lake', 'the canoe route from the dock to the island'] },
      { who: 'skis', speeds: [6, 8, 10, 12], routes: ['the cross-country ski trail between the two warming huts'] },
    ]);
    const v = rng.pick(trip.speeds);
    const n = rng.pick([25000, 50000, 100000]);
    const [dCm, km, min] = retry(
      () => {
        const dCm = rng.float(3, 18, 1);
        const km = roundTo((dCm * n) / 100000, 4);
        return [dCm, km, roundTo((km / v) * 60, 4)];
      },
      ([, km, min]) => Number.isInteger(min) && min >= 10 && km > 0,
      300,
    );
    const route = rng.pick(trip.routes);
    return {
      prompt: `On a map with a scale of $1 : ${big(n)}$, ${route} is $${ms(dCm, 'cm')}$ long. ${name} ${trip.who} along it at an average speed of $${v}\\ \\text{km/h}$. How many minutes does the trip take?`,
      parts: [numPart(min, { suffix: 'min' })],
      hints: ['First use the scale to find the real distance in kilometres.', 'Time $=$ distance $\\div$ speed gives hours. Multiply by $60$ to get minutes.'],
      solution: [
        `Real distance: $${fmt(dCm)} \\times ${big(n)} = ${big(roundTo(dCm * n, 2))}\\ \\text{cm} = ${fmt(km)}\\ \\text{km}$`,
        `Time in hours: $\\dfrac{${fmt(km)}}{${v}}\\ \\text{h}$`,
        `Time in minutes: $\\dfrac{${fmt(km)}}{${v}} \\times 60 = ${min}$`,
        `The trip takes $${min}\\ \\text{min}$.`,
      ],
    };
  }
  // Drawing dimensions for a room.
  const plan = rng.pick(PLANS.filter((p) => p.hi <= 30));
  const n = rng.pick([20, 25, 40, 50, 100, 200].filter((s) => (plan.hi * 100) / s <= 30 && (plan.hi * 100) / s >= 6));
  const [L, W] = retry(
    () => [rng.float(plan.lo, plan.hi, 1), rng.float(plan.lo * 0.5, plan.hi * 0.8, 1)],
    ([L, W]) => L > W + 0.5 && hasDp((L * 100) / n, 1) && hasDp((W * 100) / n, 1),
    300,
  );
  const a = roundTo((L * 100) / n, 2);
  const b = roundTo((W * 100) / n, 2);
  return {
    prompt: `A rectangular ${plan.thing} is $${ms(L, 'm')}$ long and $${ms(W, 'm')}$ wide. ${name} draws a scale diagram of it using a scale of $1 : ${n}$. What are the length and width of the ${plan.thing} on the diagram?`,
    parts: [numPart(a, { label: 'Length', suffix: 'cm' }), numPart(b, { label: 'Width', suffix: 'cm' })],
    hints: ['Change each real length to centimetres.', `Divide each one by $${n}$.`],
    solution: [
      `Length: $${fmt(L)}\\ \\text{m} = ${fmt(roundTo(L * 100, 2))}\\ \\text{cm}$, and $${fmt(roundTo(L * 100, 2))} \\div ${n} = ${fmt(a)}$`,
      `Width: $${fmt(W)}\\ \\text{m} = ${fmt(roundTo(W * 100, 2))}\\ \\text{cm}$, and $${fmt(roundTo(W * 100, 2))} \\div ${n} = ${fmt(b)}$`,
      `On the diagram the ${plan.thing} is $${ms(a, 'cm')}$ long and $${ms(b, 'cm')}$ wide.`,
    ],
  };
}

const scaleDiagram = skill({
  id: 'm9-scale-diagram',
  name: 'Scale diagrams and maps',
  description: 'Use a map scale or the scale of a diagram to find actual distances and drawing lengths, and find the scale from a drawing.',
  outcomes: ['SS4'],
  lessonId: 'm9-7-2',
  calculator: true,
  gen: scaleDiagramGen,
});

// ---------------------------------------------------------------------------
// Similar polygons: deciding
// ---------------------------------------------------------------------------

const C_YES = 'Yes. The corresponding angles are equal and the corresponding sides are proportional.';
const C_NO_SIDES = 'No. The corresponding angles are equal, but the corresponding sides are not proportional.';
const C_NO_ANGLES = 'No. The corresponding sides are proportional, but the corresponding angles are not equal.';
const C_SIZE = 'No. Similar polygons must be exactly the same size.';
const C_ANGLES_ONLY = 'Yes. The corresponding angles are equal, and that is enough.';
const C_SIDES_ONLY = 'Yes. The corresponding sides are proportional, and that is enough.';
const C_ADD = 'Yes. Each side of B is the same amount longer than the matching side of A.';
const SIM_HINTS = [
  'Similar polygons need **both** things: equal corresponding angles **and** corresponding sides in the same ratio.',
  'Divide each side of B by the matching side of A. Do you get the same number every time? Then compare the angles.',
];
const proportional = (p: number[], q: number[]) => p.every((x, i) => Math.abs(q[i] * p[0] - x * q[0]) < 1e-9);
const ratioTex = (n: number, d: number) => {
  const r = n / d;
  return `\\dfrac{${fmt(n)}}{${fmt(d)}} ${hasDp(r, 3) ? '=' : '\\approx'} ${fmt(r, 2)}`;
};
const SIM_UNITS = ['cm', 'm', 'mm'];

function similarPolygonsGen(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(SIM_UNITS);
  if (d === 1) {
    const mode = rng.pick(['yes', 'yes', 'add', 'off'] as const);
    const [w1, h1, w2, h2, k] = retry(
      () => {
        const w1 = rng.int(3, 9);
        const h1 = rng.int(2, w1 - 1);
        const k = rng.pick([2, 3, 1.5, 0.5, 2.5]);
        let w2 = w1 * k;
        let h2 = h1 * k;
        if (mode === 'add') {
          const c = rng.int(2, 5);
          w2 = w1 + c;
          h2 = h1 + c;
        } else if (mode === 'off') h2 = h2 + rng.pick([1, -1, 2]);
        return [w1, h1, w2, h2, k];
      },
      ([w1, h1, w2, h2]) => h2 > 0 && h2 < w2 && hasDp(w2, 1) && hasDp(h2, 1) && proportional([w1, h1], [w2, h2]) === (mode === 'yes') && w2 !== w1,
    );
    const yes = mode === 'yes';
    return {
      prompt: `Rectangle A is $${ms(w1, u)}$ by $${ms(h1, u)}$. Rectangle B is $${ms(w2, u)}$ by $${ms(h2, u)}$. Are the two rectangles similar?`,
      figure: shapePair({ pts: rectPts(w1, h1), sides: [fl(w1, u), fl(h1, u), null, null], title: 'A' }, { pts: rectPts(w2, h2), sides: [fl(w2, u), fl(h2, u), null, null], title: 'B' }),
      parts: [{ answer: mc(rng, yes ? C_YES : C_NO_SIDES, yes ? [C_NO_SIDES, C_SIZE, C_NO_ANGLES] : mode === 'add' ? [C_ADD, C_YES, C_ANGLES_ONLY] : [C_YES, C_ANGLES_ONLY, C_SIZE]) }],
      hints: SIM_HINTS,
      solution: [
        'Every angle of a rectangle is $90^\\circ$, so the corresponding angles are equal.',
        `Compare matching sides, long with long and short with short: $${ratioTex(w2, w1)}$ and $${ratioTex(h2, h1)}$.`,
        yes
          ? `The ratios are equal, so the sides are proportional. The rectangles **are** similar, with a scale factor of $${fmt(k)}$.`
          : mode === 'add'
            ? 'Adding the same amount to each side does not keep the ratios equal. The sides are not proportional, so the rectangles are **not** similar.'
            : 'The ratios are different, so the sides are not proportional. The rectangles are **not** similar.',
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.pick(['triAngles', 'triSides', 'par', 'rhombus', 'rectSquare', 'regular'] as const);
    if (kind === 'triAngles') {
      const yes = rng.chance(0.5);
      const [a1, a2] = retry(
        () => [rng.int(6, 16) * 5, rng.int(6, 16) * 5],
        ([a, b]) => a !== b && 180 - a - b >= 30 && 180 - a - b !== a && 180 - a - b !== b,
      );
      const a3 = 180 - a1 - a2;
      const shift = rng.pick([10, 15, -10, -15]);
      const b = yes ? [a1, a2, a3] : [a1 + shift, a2, a3 - shift];
      const ok = b.every((x) => x >= 20) && new Set(b).size === 3;
      const bb = ok ? b : [a1, a2, a3];
      const isYes = yes || !ok;
      // Triangle B is drawn turned and sometimes flipped, with its angles listed in another order.
      const ptsA = aaPts(a1, a2);
      const ptsB = turn(aaPts(bb[0], bb[1]), rng.pick([0, 15, -15, 180]), rng.chance(0.5)).map(([x, y]) => [x * 1.6, y * 1.6] as P);
      const listB = rng.shuffle([0, 1, 2]);
      const degs = (v: number[]) => v.map((x) => `${x}^\\circ`);
      const T_YES = 'Yes. All three pairs of corresponding angles are equal.';
      const T_NO = 'No. The corresponding angles are not all equal.';
      const T_SIDES = 'We cannot tell without the side lengths.';
      const T_ONE = 'Yes. Both triangles have an angle of ' + `$${a2}^\\circ$` + '.';
      return {
        prompt: `Triangle A has angles of $${degs([a1, a2, a3]).join('$, $')}$. Triangle B has angles of $${degs(listB.map((i) => bb[i])).join('$, $')}$. Are the triangles similar?`,
        figure: shapePair({ pts: ptsA, angles: degs([a1, a2, a3]).map((t) => t.replace('^\\circ', '°')), title: 'A' }, { pts: ptsB, angles: degs(bb).map((t) => t.replace('^\\circ', '°')), title: 'B' }),
        parts: [{ answer: mc(rng, isYes ? T_YES : T_NO, isYes ? [T_NO, T_SIDES, C_SIZE] : [T_YES, T_ONE, T_SIDES]) }],
        hints: ['Sort each list of angles from smallest to largest, then compare them.', 'For triangles, equal corresponding angles are enough: the sides are then automatically proportional.'],
        solution: [
          `Angles of A in order: $${degs([a1, a2, a3].sort((x, y) => x - y)).join(',\\ ')}$`,
          `Angles of B in order: $${degs([...bb].sort((x, y) => x - y)).join(',\\ ')}$`,
          isYes ? 'All three pairs of angles match, so the triangles **are** similar. (Triangles with equal angles always have proportional sides.)' : 'The angles do not all match, so the triangles are **not** similar.',
        ],
      };
    }
    if (kind === 'triSides') {
      const yes = rng.chance(0.5);
      const [t1, t2, k] = retry(
        () => {
          const t1 = [rng.int(3, 7), rng.int(4, 9), rng.int(5, 11)].sort((x, y) => x - y);
          const k = rng.pick([1.5, 2, 2.5, 3]);
          let t2 = t1.map((x) => x * k);
          if (!yes) {
            const c = rng.int(2, 4);
            t2 = rng.chance(0.5) ? t1.map((x) => x + c) : [t2[0], t2[1], t2[2] + rng.pick([1, -1, 2])];
          }
          return [t1, t2, k] as [number[], number[], number];
        },
        ([t1, t2]) => new Set(t1).size === 3 && t1[0] + t1[1] > t1[2] + 1 && t2[0] + t2[1] > t2[2] && t2[1] < t2[2] && proportional(t1, t2) === yes && t1[0] ** 2 + t1[1] ** 2 > t1[2] ** 2 * 0.7,
      );
      const T_YES = 'Yes. All three pairs of corresponding sides have the same ratio.';
      const T_NO = 'No. The three pairs of corresponding sides do not all have the same ratio.';
      const T_LONGER = 'Yes. Each side of triangle B is longer than the matching side of triangle A.';
      return {
        prompt: `Triangle A has sides of $${ms(t1[0], u)}$, $${ms(t1[1], u)}$ and $${ms(t1[2], u)}$. Triangle B has sides of $${ms(t2[0], u)}$, $${ms(t2[1], u)}$ and $${ms(t2[2], u)}$. Are the two triangles similar?`,
        figure: shapePair(
          { pts: sssPts(t1[2], t1[1], t1[0]), sides: [fl(t1[2], u), fl(t1[1], u), fl(t1[0], u)], title: 'A' },
          { pts: sssPts(t2[2], t2[1], t2[0]), sides: [fl(t2[2], u), fl(t2[1], u), fl(t2[0], u)], title: 'B' },
        ),
        parts: [{ answer: mc(rng, yes ? T_YES : T_NO, yes ? [T_NO, C_SIZE, C_NO_ANGLES] : [T_YES, T_LONGER, C_SIZE]) }],
        hints: ['Match the shortest side with the shortest side, the middle with the middle and the longest with the longest.', 'For triangles, if all three side ratios are equal, the angles match too.'],
        solution: [
          `Shortest: $${ratioTex(t2[0], t1[0])}$. Middle: $${ratioTex(t2[1], t1[1])}$. Longest: $${ratioTex(t2[2], t1[2])}$.`,
          yes ? `All three ratios are $${fmt(k)}$, so the triangles **are** similar.` : 'The ratios are not all equal, so the triangles are **not** similar.',
        ],
      };
    }
    if (kind === 'par') {
      const yes = rng.chance(0.5);
      const [a1, b1] = retry(
        () => [rng.int(3, 7), rng.int(2, 5)],
        ([a, b]) => a > b,
      );
      const k = rng.pick([1.5, 2]);
      const ang1 = rng.pick([50, 60, 65, 70]);
      const ang2 = yes ? ang1 : ang1 + rng.pick([15, 20, 25]);
      const angLabs = (t: number) => [null, `${180 - t}°`, null, null];
      return {
        prompt: `Parallelogram A has sides of $${ms(a1, u)}$ and $${ms(b1, u)}$ and angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$. Parallelogram B has sides of $${ms(a1 * k, u)}$ and $${ms(b1 * k, u)}$ and angles of $${ang2}^\\circ$ and $${180 - ang2}^\\circ$. Are the two parallelograms similar?`,
        figure: shapePair(
          { pts: parallelogramPts(a1, b1, ang1), sides: [fl(a1, u), fl(b1, u), null, null], angles: angLabs(ang1), title: 'A' },
          { pts: parallelogramPts(a1 * k, b1 * k, ang2), sides: [fl(a1 * k, u), fl(b1 * k, u), null, null], angles: angLabs(ang2), title: 'B' },
        ),
        parts: [{ answer: mc(rng, yes ? C_YES : C_NO_ANGLES, yes ? [C_SIZE, C_NO_SIDES, C_NO_ANGLES] : [C_SIDES_ONLY, C_YES, C_NO_SIDES]) }],
        hints: SIM_HINTS,
        solution: [
          `Compare sides: $${ratioTex(a1 * k, a1)}$ and $${ratioTex(b1 * k, b1)}$. The sides are proportional.`,
          yes
            ? `Both parallelograms have angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$, so the corresponding angles are equal.`
            : `A has angles of $${ang1}^\\circ$ and $${180 - ang1}^\\circ$, but B has angles of $${ang2}^\\circ$ and $${180 - ang2}^\\circ$. The angles are not equal.`,
          yes ? 'Both conditions hold, so the parallelograms **are** similar.' : 'Proportional sides are not enough. The parallelograms are **not** similar.',
        ],
      };
    }
    if (kind === 'rhombus') {
      const s1 = rng.int(2, 6);
      const s2 = rng.intExcept(3, 10, [s1]);
      const ang = rng.pick([50, 60, 70, 75, 80]);
      return {
        prompt: `Shape A is a square with sides of $${ms(s1, u)}$. Shape B is a rhombus with sides of $${ms(s2, u)}$ and angles of $${ang}^\\circ$ and $${180 - ang}^\\circ$. Are the two shapes similar?`,
        figure: shapePair(
          { pts: rectPts(s1, s1), sides: [fl(s1, u), fl(s1, u), null, null], angles: ['90°', null, null, null], title: 'A' },
          { pts: parallelogramPts(s2, s2, ang), sides: [fl(s2, u), fl(s2, u), null, null], angles: [`${ang}°`, null, null, null], title: 'B' },
        ),
        parts: [{ answer: mc(rng, C_NO_ANGLES, [C_SIDES_ONLY, C_YES, C_NO_SIDES]) }],
        hints: SIM_HINTS,
        solution: [
          `Every side of B divided by every side of A gives $${ratioTex(s2, s1)}$, so the sides are proportional.`,
          `The square has four $90^\\circ$ angles, but the rhombus has angles of $${ang}^\\circ$ and $${180 - ang}^\\circ$. The angles are not equal.`,
          'Proportional sides are not enough. The shapes are **not** similar.',
        ],
      };
    }
    if (kind === 'rectSquare') {
      const s1 = rng.int(2, 6);
      const w = rng.intExcept(s1 + 1, 12, [2 * s1]);
      const h = rng.intExcept(2, w - 1, [s1]);
      return {
        prompt: `Shape A is a square with sides of $${ms(s1, u)}$. Shape B is a rectangle that is $${ms(w, u)}$ by $${ms(h, u)}$. Are the two shapes similar?`,
        figure: shapePair({ pts: rectPts(s1, s1), sides: [fl(s1, u), fl(s1, u), null, null], title: 'A' }, { pts: rectPts(w, h), sides: [fl(w, u), fl(h, u), null, null], title: 'B' }),
        parts: [{ answer: mc(rng, C_NO_SIDES, [C_ANGLES_ONLY, C_YES, C_NO_ANGLES]) }],
        hints: SIM_HINTS,
        solution: [
          'Every angle of a square and of a rectangle is $90^\\circ$, so the corresponding angles are equal.',
          `Compare sides: $${ratioTex(w, s1)}$ but $${ratioTex(h, s1)}$. The ratios are different, so the sides are not proportional.`,
          'Equal angles are not enough. The shapes are **not** similar.',
        ],
      };
    }
    const n = rng.pick([5, 6, 8]);
    const poly = n === 5 ? 'pentagon' : n === 6 ? 'hexagon' : 'octagon';
    const s1 = rng.int(2, 6);
    const s2 = rng.intExcept(3, 12, [s1]);
    const ang = (180 * (n - 2)) / n;
    return {
      prompt: `Regular ${poly} A has sides of $${ms(s1, u)}$. Regular ${poly} B has sides of $${ms(s2, u)}$. Every angle of a regular ${poly} is $${ang}^\\circ$. Are the two ${poly}s similar?`,
      figure: shapePair({ pts: regularPts(n, s1), sides: [fl(s1, u)], title: 'A' }, { pts: regularPts(n, s2), sides: [fl(s2, u)], title: 'B' }),
      parts: [{ answer: mc(rng, C_YES, [C_SIZE, C_NO_SIDES, C_NO_ANGLES]) }],
      hints: SIM_HINTS,
      solution: [
        `Every angle in both shapes is $${ang}^\\circ$, so the corresponding angles are equal.`,
        `All the sides of a regular polygon are equal, so every side of B divided by the matching side of A is $${ratioTex(s2, s1)}$. The sides are proportional.`,
        `Both conditions hold, so the ${poly}s **are** similar. (Regular polygons with the same number of sides are always similar.)`,
      ],
    };
  }
  // d = 3
  const kind = rng.int(0, 2);
  if (kind === 0) {
    const job = rng.pick([
      { u: 'cm', what: 'photo', intro: 'A print shop is enlarging a', ask: 'Which print size is similar to the original, so that none of the photo is cut off?', bases: [[10, 15], [13, 18], [8, 10], [20, 25], [12, 16]], ks: [1.5, 2, 2.5, 3] },
      { u: 'cm', what: 'cabinet door', intro: 'A cabinet maker has built a', ask: 'Which larger door would be similar to it?', bases: [[30, 45], [40, 50], [24, 36], [35, 50], [30, 40]], ks: [1.5, 2] },
      { u: 'cm', what: 'banner', intro: 'The student council is making a bigger copy of a', ask: 'Which size is similar to the original banner?', bases: [[60, 90], [40, 100], [50, 80], [45, 60]], ks: [1.5, 2, 2.5] },
      { u: 'm', what: 'flag', intro: 'A town is ordering a larger version of a', ask: 'Which size is similar to the original flag?', bases: [[1, 2], [2, 3], [1.2, 1.8], [1.5, 2.5]], ks: [1.5, 2, 3] },
    ]);
    const [w, h] = rng.pick(job.bases);
    const k = rng.pick(job.ks);
    const good = [roundTo(w * k, 2), roundTo(h * k, 2)];
    const add = roundTo(good[0] - w, 2);
    const off = h >= 30 ? rng.pick([5, 10]) : h >= 5 ? rng.pick([1, 2]) : rng.pick([0.5, 1]);
    const cands = [
      [good[0], roundTo(h + add, 2)],
      [good[0], roundTo(good[1] + off, 2)],
      [good[0], roundTo(good[1] - off, 2)],
      [roundTo(good[0] + off, 2), good[1]],
    ].filter((c) => c[0] < c[1] && !proportional([w, h], c));
    const show = (c: number[]) => `$${ms(c[0], job.u)} \\times ${ms(c[1], job.u)}$`;
    return {
      prompt: `${job.intro} $${ms(w, job.u)} \\times ${ms(h, job.u)}$ ${job.what}. ${job.ask}`,
      parts: [{ answer: mc(rng, show(good), rng.shuffle(cands).map(show)) }],
      hints: ['A similar size multiplies **both** dimensions by the same scale factor.', 'For each choice, divide the short side by the original short side and the long side by the original long side. The two answers must match.'],
      solution: [
        `For ${show(good)}: $${ratioTex(good[0], w)}$ and $${ratioTex(good[1], h)}$. Both ratios are $${fmt(k)}$.`,
        'For each of the other sizes, the two ratios are different. (Adding the same amount to both sides does not keep the shape.)',
        `The similar size is ${show(good)}.`,
      ],
      calculator: true,
    };
  }
  if (kind === 1) {
    const t1 = retry(
      () => [rng.int(3, 7), rng.int(4, 9), rng.int(5, 11)].sort((x, y) => x - y),
      (t) => new Set(t).size === 3 && t[0] + t[1] > t[2] + 1,
    );
    const k = rng.pick([1.5, 2, 2.5, 3, 0.5]);
    const good = t1.map((x) => x * k);
    const cands = [t1.map((x) => x + good[0] - t1[0]), [good[0], good[1], good[2] + 1], [good[0], good[1] + 1, good[2]], [good[0], good[1], good[2] - 1], [t1[0] * 2, t1[1] * 3, t1[2] * 3]].filter(
      (c) => !proportional(t1, c) && c[0] + c[1] > c[2] && c.every((x) => x > 0) && c.join() !== t1.join(),
    );
    const show = (c: number[]) => `$${c.map((x) => ms(x, u)).join(',\\ ')}$`;
    return {
      prompt: `A triangle has sides of $${ms(t1[0], u)}$, $${ms(t1[1], u)}$ and $${ms(t1[2], u)}$. Which triangle is similar to it?`,
      parts: [{ answer: mc(rng, show(good), rng.shuffle(cands).map(show)) }],
      hints: ['Divide each side of a choice by the matching side of the original: shortest with shortest, and so on.', 'The triangle is similar only if all three ratios are the same.'],
      solution: [
        `For ${show(good)}: $${ratioTex(good[0], t1[0])}$, $${ratioTex(good[1], t1[1])}$ and $${ratioTex(good[2], t1[2])}$.`,
        `All three ratios are $${fmt(k)}$. In each of the other choices, the ratios are not all equal.`,
        `The similar triangle has sides ${show(good)}.`,
      ],
      calculator: true,
    };
  }
  // Which pair must always be similar?
  const ALWAYS = [
    { md: 'Two squares', why: 'All squares have four $90^\\circ$ angles and four equal sides, so any two squares are similar.' },
    { md: 'Two equilateral triangles', why: 'All equilateral triangles have three $60^\\circ$ angles, so any two are similar.' },
    { md: 'Two regular hexagons', why: 'All regular hexagons have six $120^\\circ$ angles and six equal sides, so any two are similar.' },
    { md: 'Two regular octagons', why: 'All regular octagons have eight $135^\\circ$ angles and eight equal sides, so any two are similar.' },
  ];
  const SOMETIMES = [
    { md: 'Two rectangles', why: 'Rectangles always have $90^\\circ$ angles, but a long thin rectangle and a nearly square one are not proportional.' },
    { md: 'Two rhombuses', why: 'Rhombuses have proportional sides, but their angles can be different.' },
    { md: 'Two isosceles triangles', why: 'Isosceles triangles can have different angles, such as $40^\\circ, 70^\\circ, 70^\\circ$ and $100^\\circ, 40^\\circ, 40^\\circ$.' },
    { md: 'Two right triangles', why: 'Right triangles share the $90^\\circ$ angle, but their other angles can be different.' },
    { md: 'Two parallelograms', why: 'Parallelograms can have different angles and different side ratios.' },
    { md: 'Two kites', why: 'Kites can have different angles and different side ratios.' },
  ];
  if (rng.chance(0.6)) {
    const good = rng.pick(ALWAYS);
    const bad = rng.sample(SOMETIMES, 3);
    return {
      prompt: 'Which pair of shapes is **always** similar, no matter what their sizes are?',
      parts: [{ answer: mc(rng, good.md, bad.map((b) => b.md)) }],
      hints: ['For each pair, try to imagine two shapes of that kind that are **not** similar.', 'Check both conditions: are the angles always equal, and are the sides always in the same ratio?'],
      solution: [...bad.map((b) => `${b.md}: not always similar. ${b.why}`), `${good.md}: always similar. ${good.why}`, `The answer is: ${good.md.toLowerCase()}.`],
      calculator: false,
    };
  }
  const goodIdx = rng.int(0, SOMETIMES.length - 1);
  const good = SOMETIMES[goodIdx];
  const bad = rng.sample(ALWAYS, 3);
  return {
    prompt: 'Which pair of shapes is **not always** similar?',
    parts: [{ answer: mc(rng, good.md, bad.map((b) => b.md)) }],
    hints: ['Look for a kind of shape that can change its angles or its proportions.', 'Regular polygons with the same number of sides always have the same angles and equal sides.'],
    solution: [...bad.map((b) => `${b.md}: always similar. ${b.why}`), `${good.md}: not always similar. ${good.why}`, `The answer is: ${good.md.toLowerCase()}.`],
    calculator: false,
  };
}

const similarPolygons = skill({
  id: 'm9-similar-polygons',
  name: 'Deciding whether polygons are similar',
  description: 'Decide whether two polygons are similar by checking that corresponding angles are equal and corresponding sides are proportional.',
  outcomes: ['SS3'],
  lessonId: 'm9-7-3',
  format: 'mc',
  calculator: true,
  gen: similarPolygonsGen,
});

// ---------------------------------------------------------------------------
// Similar polygons and triangles: missing sides, indirect measurement
// ---------------------------------------------------------------------------

const VERT_SETS = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['P', 'Q', 'R', 'X', 'Y', 'Z'],
  ['K', 'L', 'M', 'R', 'S', 'T'],
  ['A', 'B', 'C', 'P', 'Q', 'R'],
  ['D', 'E', 'F', 'J', 'K', 'L'],
];

/** Scalene triangle side lengths (integers, sorted) that make a pleasant shape. */
function triSides(rng: Rng, mult = 1): number[] {
  return retry(
    () => [rng.int(3, 8), rng.int(4, 10), rng.int(5, 12)].sort((x, y) => x - y),
    (t) => new Set(t).size === 3 && t[0] + t[1] > t[2] + 1 && t[0] ** 2 + t[1] ** 2 > 0.6 * t[2] ** 2,
  ).map((x) => x * mult);
}

/** Shadow figure: object and its shadow, with a person (or stick) and theirs to the right; sun rays dashed. */
function shadowFigure(H: number, S: number, h: number, s: number, labs: { H: string; S: string; h: string; s: string }): PlaneFigure {
  const sk = new Sketch();
  // The small triangle is drawn larger so its labels fit; it keeps its shape, so the rays stay parallel.
  const f = Math.max(1, (0.4 * H) / h);
  const scale = 8 / Math.max(H, S + f * s + 2);
  const Hh = H * scale;
  const Ss = S * scale;
  const hh = h * f * scale;
  const ss = s * f * scale;
  const gap = Math.max(1.6, 0.25 * Ss);
  const x2 = Ss + gap;
  sk.seg([-0.6, 0], [x2 + ss + 0.8, 0], { color: 'muted' });
  sk.seg([0, 0], [0, Hh]);
  sk.seg([0, Hh], [Ss, 0], { dashed: true, color: 'accent' });
  sk.rightMark([0, 0], 0, 0.35);
  sk.seg([x2, 0], [x2, hh]);
  sk.seg([x2, hh], [x2 + ss, 0], { dashed: true, color: 'accent' });
  sk.rightMark([x2, 0], 0, 0.25);
  sk.sideLabel([0, 0], [0, Hh], labs.H, [1, Hh / 2]);
  sk.sideLabel([0, 0], [Ss, 0], labs.S, [Ss / 2, 1]);
  sk.sideLabel([x2, 0], [x2, hh], labs.h, [x2 + 1, hh / 2]);
  sk.sideLabel([x2, 0], [x2 + ss, 0], labs.s, [x2 + ss / 2, 1]);
  return sk.build({ margin: 0.8 });
}

/** Mirror figure: a person's eyes, a mirror on the ground and a tall object; the light path is dashed. */
function mirrorFigure(e: number, d1: number, d2: number, H: number, labs: { e: string; d1: string; d2: string; H: string }): PlaneFigure {
  const sk = new Sketch();
  // The person's triangle is drawn larger so its labels fit; it keeps its shape, so the angles at the mirror stay equal.
  const f = Math.max(1, (0.4 * H) / e);
  const scale = 10 / Math.max(f * d1 + d2, H);
  const E = e * f * scale;
  const D1 = d1 * f * scale;
  const D2 = d2 * scale;
  const HH = H * scale;
  const M: P = [D1, 0];
  const T: P = [D1 + D2, HH];
  sk.seg([-0.5, 0], [D1 + D2 + 0.6, 0], { color: 'muted' });
  sk.seg([0, 0], [0, E]);
  sk.seg([D1 + D2, 0], T);
  sk.seg(T, M, { dashed: true, color: 'accent' });
  sk.seg(M, [0, E], { dashed: true, color: 'accent' });
  sk.dot(M, 'accent');
  sk.rightMark([0, 0], 0, 0.3);
  sk.rightMark([D1 + D2, 0], 90, 0.35);
  sk.sideLabel([0, 0], [0, E], labs.e, [1, E / 2]);
  sk.sideLabel([D1 + D2, 0], T, labs.H, [D1 + D2 - 1, HH / 2]);
  sk.sideLabel([0, 0], M, labs.d1, [D1 / 2, 1]);
  sk.sideLabel(M, [D1 + D2, 0], labs.d2, [D1 + D2 / 2, 1]);
  sk.endLabel(M, -90, 'mirror');
  return sk.build({ margin: 0.8 });
}

/** Nested triangles: DE parallel to BC inside triangle ABC. */
function nestedFigure(t: number, shape: P[], labs: { AD: string; DB: string; DE: string; BC: string }, names: string[]): PlaneFigure {
  const [A, B, C] = shape;
  const D: P = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
  const E: P = [A[0] + t * (C[0] - A[0]), A[1] + t * (C[1] - A[1])];
  const s = new Sketch();
  s.poly([A, B, C]);
  s.seg(D, E, { color: 'accent' });
  const cen = centroid([A, B, C]);
  s.sideLabel(A, D, labs.AD, cen);
  s.sideLabel(D, B, labs.DB, cen);
  s.sideLabel(B, C, labs.BC, cen);
  s.sideLabel(D, E, labs.DE, A);
  const lab = (v: P, dirs: P[], nm: string) => s.vertexLabel(v, dirs.map((q) => dirTo(v, q)), nm);
  lab(A, [B, C], names[0]);
  lab(B, [A, C], names[1]);
  lab(C, [A, B], names[2]);
  lab(D, [A, B, E], names[3]);
  lab(E, [A, C, D], names[4]);
  return s.build({ margin: 1 });
}

function similarTrianglesGen(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(SIM_UNITS);
  if (d === 1) {
    const k = rng.pick<K>([
      { num: 2, den: 1 },
      { num: 3, den: 1 },
      { num: 4, den: 1 },
      { num: 1, den: 2 },
    ]);
    const kv = kVal(k);
    const shape = rng.pick(['tri', 'rect', 'L'] as const);
    let sA: number[];
    let ptsA: P[];
    let i: number;
    let j: number;
    if (shape === 'tri') {
      sA = triSides(rng, k.den);
      // AB = longest along the bottom, BC = middle, CA = shortest.
      ptsA = sssPts(sA[2], sA[1], sA[0]);
      sA = [sA[2], sA[1], sA[0]];
      [i, j] = rng.shuffle([0, 1, 2]).slice(0, 2);
    } else if (shape === 'rect') {
      const sh = makeShape(rng, 'rect', k.den);
      sA = sh.sides(1);
      ptsA = sh.pts(1);
      [i, j] = rng.chance(0.5) ? [0, 1] : [1, 0];
    } else {
      const sh = makeShape(rng, 'L', k.den);
      sA = sh.sides(1);
      ptsA = sh.pts(1);
      [i, j] = rng.shuffle([0, 5, 2, 3]).slice(0, 2);
    }
    const sB = sA.map((x) => roundTo(x * kv, 3));
    const ptsB = ptsA.map(([x, y]) => [x * kv, y * kv] as P);
    const unknownInB = rng.chance(0.7);
    const x = unknownInB ? sB[j] : sA[j];
    const labA = sA.map((v, idx) => (idx === i ? fl(v, u) : idx === j ? (unknownInB ? fl(v, u) : 'x') : null));
    const labB = sB.map((v, idx) => (idx === i ? fl(v, u) : idx === j ? (unknownInB ? 'x' : fl(v, u)) : null));
    const noun = shape === 'tri' ? 'triangles' : shape === 'rect' ? 'rectangles' : 'L-shaped figures';
    return {
      prompt: `The two ${noun} are similar. Find the length $x$.`,
      figure: shapePair({ pts: ptsA, sides: labA, title: 'A' }, { pts: ptsB, sides: labB, title: 'B' }),
      parts: [numPart(x, { label: '$x =$', suffix: u })],
      hints: ['Find a pair of matching sides where you know both lengths. Use it to find the scale factor from A to B.', unknownInB ? 'Multiply the matching side of A by the scale factor.' : 'Divide the matching side of B by the scale factor.'],
      solution: [
        `Scale factor from A to B: $k = ${quotientTex(sB[i], sA[i])}$`,
        unknownInB ? `$x = ${kTex(k)} \\times ${fmt(sA[j])} = ${fmt(x)}$` : `$x = ${fmt(sB[j])} \\div ${kTex(k)} = ${fmt(x)}$`,
        `$x = ${ms(x, u)}$`,
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.pick(['named', 'named', 'nested', 'nested', 'quad'] as const);
    if (kind === 'named') {
      const V = rng.pick(VERT_SETS);
      const k = rng.pick([1.5, 2.5, 0.5, 0.75, 1.25, 0.8, 1.2, 0.6]);
      const sA = triSides(rng, k === 0.75 || k === 1.25 ? 4 : 1);
      // A: side 0 = V0V1 (longest), side 1 = V1V2 (middle), side 2 = V2V0 (shortest).
      const s3 = [sA[2], sA[1], sA[0]];
      const sB = s3.map((x) => roundTo(x * k, 3));
      const ptsA = sssPts(s3[0], s3[1], s3[2]);
      const ptsB = turn(ptsA, rng.pick([0, 20, -25, 180, 160]), rng.chance(0.5)).map(([x, y]) => [x * k, y * k] as P);
      const [i, j] = rng.shuffle([0, 1, 2]).slice(0, 2);
      const unknownInB = rng.chance(0.6);
      const x = unknownInB ? sB[j] : s3[j];
      const nm = (side: number, off: number) => `${V[off + side]}${V[off + ((side + 1) % 3)]}`;
      const labA = s3.map((v, idx) => (idx === i ? fl(v, u) : idx === j ? (unknownInB ? fl(v, u) : 'x') : null));
      const labB = sB.map((v, idx) => (idx === i ? fl(v, u) : idx === j ? (unknownInB ? 'x' : fl(v, u)) : null));
      const known = unknownInB
        ? `$${nm(i, 0)} = ${ms(s3[i], u)}$, $${nm(j, 0)} = ${ms(s3[j], u)}$ and $${nm(i, 3)} = ${ms(sB[i], u)}$`
        : `$${nm(i, 0)} = ${ms(s3[i], u)}$, $${nm(i, 3)} = ${ms(sB[i], u)}$ and $${nm(j, 3)} = ${ms(sB[j], u)}$`;
      const ask = unknownInB ? nm(j, 3) : nm(j, 0);
      return {
        prompt: `$\\triangle ${V.slice(0, 3).join('')} \\sim \\triangle ${V.slice(3).join('')}$, with the vertices in matching order. ${known}. Find the length $x = ${ask}$.`,
        figure: shapePair({ pts: ptsA, sides: labA, verts: V.slice(0, 3) }, { pts: ptsB, sides: labB, verts: V.slice(3) }),
        parts: [numPart(x, { label: `$${ask} =$`, suffix: u })],
        hints: [`The order of the letters tells you which sides match: $${nm(i, 0)}$ matches $${nm(i, 3)}$, and $${nm(j, 0)}$ matches $${nm(j, 3)}$.`, `Write a proportion: $\\dfrac{${nm(j, 3)}}{${nm(j, 0)}} = \\dfrac{${nm(i, 3)}}{${nm(i, 0)}}$, then solve for $x$.`],
        solution: [
          `Matching sides: $${nm(i, 0)} \\leftrightarrow ${nm(i, 3)}$ and $${nm(j, 0)} \\leftrightarrow ${nm(j, 3)}$.`,
          `$\\dfrac{${nm(j, 3)}}{${nm(j, 0)}} = \\dfrac{${nm(i, 3)}}{${nm(i, 0)}}$, so ${unknownInB ? `$\\dfrac{x}{${fmt(s3[j])}} = \\dfrac{${fmt(sB[i])}}{${fmt(s3[i])}}$` : `$\\dfrac{${fmt(sB[j])}}{x} = \\dfrac{${fmt(sB[i])}}{${fmt(s3[i])}}$`}`,
          unknownInB
            ? `$x = ${fmt(s3[j])} \\times \\dfrac{${fmt(sB[i])}}{${fmt(s3[i])}} = ${fmt(s3[j])} \\times ${fmt(k)} = ${fmt(x)}$`
            : `The scale factor is $\\dfrac{${fmt(sB[i])}}{${fmt(s3[i])}} = ${fmt(k)}$, so $x = ${fmt(sB[j])} \\div ${fmt(k)} = ${fmt(x)}$`,
          `$${ask} = ${ms(x, u)}$`,
        ],
      };
    }
    if (kind === 'nested') {
      const V = rng.pick([
        ['A', 'B', 'C', 'D', 'E'],
        ['P', 'Q', 'R', 'S', 'T'],
        ['K', 'L', 'M', 'N', 'O'],
        ['V', 'W', 'X', 'Y', 'Z'],
      ]);
      const [ad, db] = retry(
        () => [rng.int(2, 12), rng.int(2, 12)],
        ([a, b]) => a !== b,
      );
      const ab = ad + db;
      const askBig = rng.chance(0.6);
      let de: number;
      let bc: number;
      if (askBig) {
        de = retry(
          () => rng.int(3, 15),
          (v) => hasDp((v * ab) / ad, 2),
        );
        bc = roundTo((de * ab) / ad, 3);
      } else {
        bc = retry(
          () => rng.int(4, 24),
          (v) => hasDp((v * ad) / ab, 2),
        );
        de = roundTo((bc * ad) / ab, 3);
      }
      const t = ad / ab;
      const apexAng = rng.int(30, 60);
      const baseAng = rng.int(50, 75);
      const shape = aaPts(baseAng, 180 - apexAng - baseAng).map(([x, y]) => [x * 6, y * 6] as P);
      // A = apex (third point), B and C at the base.
      const tri: P[] = [shape[2], shape[0], shape[1]];
      const [A, B, C, D, E] = V;
      const x = askBig ? bc : de;
      return {
        prompt: `In $\\triangle ${A}${B}${C}$, $${D}$ is on $${A}${B}$ and $${E}$ is on $${A}${C}$, with $${D}${E} \\parallel ${B}${C}$. So $\\triangle ${A}${D}${E} \\sim \\triangle ${A}${B}${C}$. $${A}${D} = ${ms(ad, u)}$, $${D}${B} = ${ms(db, u)}$ and ${askBig ? `$${D}${E} = ${ms(de, u)}$. Find $${B}${C}$` : `$${B}${C} = ${ms(bc, u)}$. Find $${D}${E}$`}.`,
        figure: nestedFigure(t, tri, { AD: fl(ad, u), DB: fl(db, u), DE: askBig ? fl(de, u) : 'x', BC: askBig ? 'x' : fl(bc, u) }, V),
        parts: [numPart(x, { label: askBig ? `$${B}${C} =$` : `$${D}${E} =$`, suffix: u })],
        hints: [`The side of the large triangle is $${A}${B} = ${A}${D} + ${D}${B}$, not $${D}${B}$.`, `$\\dfrac{${D}${E}}{${B}${C}} = \\dfrac{${A}${D}}{${A}${B}}$`],
        solution: [
          `$${A}${B} = ${ad} + ${db} = ${ab}$`,
          `Matching sides: $\\dfrac{${D}${E}}{${B}${C}} = \\dfrac{${A}${D}}{${A}${B}} = \\dfrac{${ad}}{${ab}}$`,
          askBig ? `$${B}${C} = ${fmt(de)} \\times \\dfrac{${ab}}{${ad}} = ${fmt(bc)}$` : `$${D}${E} = ${fmt(bc)} \\times \\dfrac{${ad}}{${ab}} = ${fmt(de)}$`,
          `$${askBig ? B + C : D + E} = ${ms(x, u)}$`,
        ],
      };
    }
    // Similar quadrilaterals with a decimal scale factor.
    const k = rng.pick<K>([
      { num: 3, den: 2 },
      { num: 5, den: 2 },
      { num: 3, den: 4 },
      { num: 2, den: 5 },
      { num: 4, den: 5 },
      { num: 4, den: 3 },
      { num: 2, den: 3 },
    ]);
    const kind2 = rng.pick<ShapeKind>(['rect', 'L', 'par']);
    const sh = makeShape(rng, kind2, k.den, 5);
    const so = sh.sides(1);
    const si = sh.sides(kVal(k)).map((v) => roundTo(v, 3));
    const [i, j] = kind2 === 'L' ? rng.shuffle([0, 5, 2, 3]).slice(0, 2) : rng.chance(0.5) ? [sh.i, sh.j] : [sh.j, sh.i];
    const labA = so.map((v, idx) => (idx === i || idx === j ? fl(v, u) : null));
    const labB = si.map((v, idx) => (idx === i ? fl(v, u) : idx === j ? 'x' : null));
    return {
      prompt: `The two ${SHAPE_NOUN[kind2] === 'L-shaped logo' ? 'L-shaped figures' : `${SHAPE_NOUN[kind2]}s`} are similar. Find the length $x$.`,
      figure: shapePair({ pts: sh.pts(1), sides: labA, title: 'A' }, { pts: sh.pts(kVal(k)), sides: labB, title: 'B' }),
      parts: [numPart(si[j], { label: '$x =$', suffix: u })],
      hints: ['Use the pair of matching sides where both lengths are known to set up a proportion.', `$\\dfrac{x}{${fmt(so[j])}} = \\dfrac{${fmt(si[i])}}{${fmt(so[i])}}$`],
      solution: [
        `$\\dfrac{x}{${fmt(so[j])}} = \\dfrac{${fmt(si[i])}}{${fmt(so[i])}}$`,
        `$x = ${fmt(so[j])} \\times \\dfrac{${fmt(si[i])}}{${fmt(so[i])}} = ${fmt(si[j])}$`,
        `$x = ${ms(si[j], u)}$`,
      ],
    };
  }
  // d = 3: indirect measurement.
  const name = rng.pick(NAMES);
  const kind = rng.pick(['shadow', 'stick', 'mirror', 'mirror'] as const);
  if (kind === 'shadow' || kind === 'stick') {
    const obj = rng.pick(['flagpole', 'spruce tree', 'grain bin', 'light standard at the ball diamond', 'cell tower', 'basketball hoop pole']);
    const [h, s, S, H] = retry(
      () => {
        const h = kind === 'stick' ? 1 : rng.float(1.45, 1.85, 2);
        const s = rng.float(0.8, 3.2, 1);
        const S = rng.float(4, 30, 1);
        return [h, s, S, (h * S) / s];
      },
      ([h, s, S, H]) => H >= 3 && H <= 40 && safeRound(H, 1) && S > 2 * s && h !== s,
    );
    const ans = roundTo(H, 1);
    const who = kind === 'stick' ? `a metre stick held straight up` : `${name}, who is $${ms(h, 'm')}$ tall,`;
    return {
      prompt: `On a sunny afternoon, a ${obj} casts a shadow $${ms(S, 'm')}$ long. At the same time, ${who} casts a shadow $${ms(s, 'm')}$ long. How tall is the ${obj}? Round to the nearest tenth of a metre.`,
      figure: shadowFigure(H, S, h, s, { H: 'h', S: fl(S, 'm'), h: fl(h, 'm'), s: fl(s, 'm') }),
      parts: [numPart(ans, { decimals: 1, suffix: 'm' })],
      hints: [
        'The sun\u2019s rays hit both objects at the same angle, so the two triangles (object, shadow, ray) are similar.',
        '$\\dfrac{\\text{height}}{\\text{shadow}}$ is the same for both: $\\dfrac{h}{' + fmt(S) + '} = \\dfrac{' + fmt(h) + '}{' + fmt(s) + '}$.',
      ],
      solution: [
        'Both triangles have a right angle at the ground and the same angle of the sun, so they are similar.',
        `$\\dfrac{h}{${fmt(S)}} = \\dfrac{${fmt(h)}}{${fmt(s)}}$`,
        `$h = ${fmt(S)} \\times \\dfrac{${fmt(h)}}{${fmt(s)}} \\approx ${fmt(H, 3)}$`,
        `The ${obj} is about $${ms(ans.toFixed(1), 'm')}$ tall.`,
      ],
    };
  }
  const obj = rng.pick(['school', 'climbing wall', 'flagpole', 'water tower', 'grain elevator', 'tree']);
  const [e, d1, d2, H] = retry(
    () => {
      const e = rng.float(1.4, 1.75, 2);
      const d1 = rng.float(1.2, 3.5, 1);
      const d2 = rng.float(6, 30, 1);
      return [e, d1, d2, (e * d2) / d1];
    },
    ([, d1, d2, H]) => H >= 4 && H <= 35 && safeRound(H, 1) && d2 > 2.5 * d1,
  );
  const ans = roundTo(H, 1);
  return {
    prompt: `${name} places a small mirror flat on the ground, $${ms(d2, 'm')}$ from the base of a ${obj}. ${name} steps back until the top of the ${obj} shows in the mirror. ${name}\u2019s eyes are then $${ms(e, 'm')}$ above the ground, and ${name}\u2019s feet are $${ms(d1, 'm')}$ from the mirror. How tall is the ${obj}? Round to the nearest tenth of a metre.`,
    figure: mirrorFigure(e, d1, d2, H, { e: fl(e, 'm'), d1: fl(d1, 'm'), d2: fl(d2, 'm'), H: 'h' }),
    parts: [numPart(ans, { decimals: 1, suffix: 'm' })],
    hints: [
      'Light bounces off a mirror at the same angle it arrives, so the two right triangles on either side of the mirror are similar.',
      `Match the sides: $\\dfrac{h}{${fmt(d2)}} = \\dfrac{${fmt(e)}}{${fmt(d1)}}$.`,
    ],
    solution: [
      'The two triangles each have a right angle at the ground and equal angles at the mirror, so they are similar.',
      `Height matches height and ground distance matches ground distance: $\\dfrac{h}{${fmt(d2)}} = \\dfrac{${fmt(e)}}{${fmt(d1)}}$`,
      `$h = ${fmt(d2)} \\times \\dfrac{${fmt(e)}}{${fmt(d1)}} \\approx ${fmt(H, 3)}$`,
      `The ${obj} is about $${ms(ans.toFixed(1), 'm')}$ tall.`,
    ],
  };
}

const similarTriangles = skill({
  id: 'm9-similar-triangles',
  name: 'Missing sides of similar polygons and triangles',
  description: 'Use a scale factor or a proportion to find a missing side of similar polygons and triangles, including heights measured with shadows and mirrors.',
  outcomes: ['SS3'],
  lessonId: 'm9-7-3',
  calculator: true,
  gen: similarTrianglesGen,
});

export const SIMILARITY_SKILLS: SkillDef[] = [scaleFactor, scaleDiagram, similarPolygons, similarTriangles];
