/** Math 20-2 Unit 2 — Properties of Angles and Triangles (G1, G2). */
import { fixedChoice, mc, numPart, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';
import type { GenOutput } from '../../helpers.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

export const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Liam', 'Mei', 'Tyler', 'Kiran', 'Noah', 'Aisha', 'Dakota', 'Mateo', 'Sofia', 'Raj', 'Hamid',
  'Jasmine', 'Owen', 'Nadia', 'Wyatt', 'Simran', 'Kai', 'Fatima', 'Lucas', 'Thanh', 'Chloé', 'Darius', 'Leilani', 'Ben', 'Marie-Ève',
];

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Linear expression such as 3x - 10 in LaTeX, or with a Unicode minus for figure labels. */
function linExpr(a: number, b: number, plain = false): string {
  const xs = a === 1 ? 'x' : `${a}x`;
  if (b === 0) return xs;
  const minus = plain ? ' − ' : ' - ';
  return `${xs}${b < 0 ? minus : ' + '}${Math.abs(b)}`;
}
/** "(3x - 10)^\circ" in LaTeX. */
const exprDeg = (a: number, b: number) => (b === 0 ? `${linExpr(a, b)}^\\circ` : `(${linExpr(a, b)})^\\circ`);
/** "(3x − 10)°" for a figure label. */
const exprLabel = (a: number, b: number) => (b === 0 ? `${linExpr(a, b, true)}°` : `(${linExpr(a, b, true)})°`);

const coefX = (k: number) => (k === 1 ? 'x' : `${k}x`);
const signed = (c: number) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}`);
/** kx + c with a value substituted for x, e.g. 3(14) - 8. */
const subst = (k: number, c: number, x: number) => `${k === 1 ? x : `${k}(${x})`}${signed(c)}`;

/** Worked steps for k1 x + c1 = k2 x + c2 (k1 ≠ k2), keeping the x-term positive. */
function solveEqual(k1: number, c1: number, k2: number, c2: number): string[] {
  const [kb, cb, ks, cs] = k1 > k2 ? [k1, c1, k2, c2] : [k2, c2, k1, c1];
  const k = kb - ks;
  const r = cs - cb;
  const steps = [`Subtract $${coefX(ks)}$ from both sides: $${coefX(k)}${signed(cb)} = ${cs}$`];
  if (cb !== 0) steps.push(`${cb > 0 ? 'Subtract' : 'Add'} $${Math.abs(cb)}$ ${cb > 0 ? 'from' : 'to'} both sides: $${coefX(k)} = ${r}$`);
  if (k !== 1) steps.push(`Divide both sides by $${k}$: $x = ${fmt(r / k)}$`);
  return steps;
}

/** Worked steps for (sum of k_i x + c_i) = total. */
function solveSum(terms: Array<[number, number]>, total: number): string[] {
  const k = terms.reduce((s, t) => s + t[0], 0);
  const c = terms.reduce((s, t) => s + t[1], 0);
  const steps = [`Collect like terms: $${coefX(k)}${signed(c)} = ${total}$`];
  if (c !== 0) steps.push(`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$ ${c > 0 ? 'from' : 'to'} both sides: $${coefX(k)} = ${total - c}$`);
  if (k !== 1) steps.push(`Divide both sides by $${k}$: $x = ${fmt((total - c) / k)}$`);
  return steps;
}

// ---------------------------------------------------------------------------
// Figure helpers: diagrams drawn on a plane with no axes (the Math 10-3 approach)
// ---------------------------------------------------------------------------

export type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
export const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const dirTo = (a: P, b: P) => (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const dist = (a: P, b: P) => Math.hypot(b[0] - a[0], b[1] - a[1]);

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
  for (const ch of t) w += ch === '°' ? 5 : ch === ' ' ? 3.5 : ch === '(' || ch === ')' ? 4.5 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  /** Candidate text centres (data units) in order of preference; receives pixels per unit. */
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

/**
 * Collects segments, arcs and labels, then lays the figure out on a plane with no tick labels.
 * Labels are drawn with invisible anchor points (open + muted), and each label is placed where it
 * stays clear of every drawn line. Copied from the Math 10-3 angles unit.
 */
export class Sketch {
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

  ray(v: P, a: number, len: number, opts: { color?: Color; dashed?: boolean; arrow?: boolean } = {}) {
    return this.seg(v, at(v, a, len), { color: opts.color, dashed: opts.dashed, arrowEnd: opts.arrow ?? true });
  }

  /** A line through c in direction a, drawn `half` units each way with arrows at both ends. */
  line(c: P, a: number, half: number, color?: Color) {
    return this.seg(at(c, a + 180, half), at(c, a, half), { color, arrowEnd: true, arrowStart: true });
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

  /** Arrowhead-style parallel marks (">" or ">>") at the middle of segment pq, pointing from p to q. */
  chevrons(p: P, q: P, count = 1, size = 0.28) {
    const m = mid(p, q);
    const d = dirTo(p, q);
    for (let k = 0; k < count; k++) {
      const tip = at(m, d, (k - (count - 1) / 2) * 0.26 + 0.12);
      this.polyline([at(tip, d + 145, size), tip, at(tip, d - 145, size)]);
    }
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

  /** Reserve space so the layout box includes this point. */
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
        for (const rpx of [minPx, minPx + 6, minPx + 12, minPx + 19, minPx + 27, minPx + 36, minPx + 48, minPx + 62])
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
        for (const dpx of [15, 19, 24, 30, 38])
          for (const off of [0, 30, -30, 60, -60, 90, -90, 125, -125, 180]) out.push(at(p, a + off, dpx / ppu));
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
          for (const rpx of [15, 19, 24, 30])
            for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8]) out.push(at(v, g.a0 + t * g.span, rpx / ppu));
        return out;
      },
    });
    return this;
  }

  /** Text centred exactly at c (for numbers inside squares). */
  textAt(c: P, text: string) {
    this.pending.push({ text, cands: () => [c], fixed: true });
    return this;
  }

  build(opts: { margin?: number; grid?: boolean; caption?: string; minWidth?: number } = {}): PlaneFigure {
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
    const bounds: Box = { x0: ox, x1: ox + xr, y0: oy, y1: oy + yr };
    const ppu = 340 / xr;

    // Place labels.
    const placed: Box[] = [];
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
        if (score >= 5) {
          best = { c, score };
          break;
        }
      }
      const c = best!.c;
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }

    const T = (p: P): [number, number] => [r3(p[0] - ox), r3(p[1] - oy)];
    const step = opts.grid ? 1 : Math.max(xr, yr);
    return {
      type: 'plane',
      grid: { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step },
      hideTickLabels: true,
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
      ...(opts.caption ? { caption: opts.caption } : {}),
    };
  }
}

/** The angle region at v between the rays to u and w, as [a0, a1] counterclockwise (span below 180°). */
function wedge(v: P, u: P, w: P): [number, number] {
  const du = dirTo(v, u);
  const dw = dirTo(v, w);
  const s = norm360(dw - du);
  return s < 180 ? [du, du + s] : [dw, dw + (360 - s)];
}

/** Label (and optional arc) for the interior angle at v between rays to u and w. */
function markAngle(s: Sketch, v: P, u: P, w: P, text: string | null, opts: { arc?: boolean; r?: number; right?: boolean } = {}) {
  const [a0, a1] = wedge(v, u, w);
  if (opts.right) s.rightMark(v, a0, 0.4);
  else if (opts.arc ?? true) s.arc(v, opts.r ?? 0.5, a0, a1);
  if (text) s.angleLabel(v, a0, a1, text, text.length > 3 ? 28 : 20);
}

/** Vertex name placed outside a polygon at v (away from its neighbours u and w). */
function nameVertex(s: Sketch, v: P, u: P, w: P, name: string) {
  s.dot(v);
  s.vertexLabel(v, [dirTo(v, u), dirTo(v, w)], name);
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — Parallel lines and transversals
// ---------------------------------------------------------------------------

type Region = 'UL' | 'UR' | 'LL' | 'LR';
interface Spot {
  /** 'P' is the upper crossing (on line m), 'Q' the lower one (on line n). */
  at: 'P' | 'Q';
  r: Region;
}
type Relation = 'corresponding' | 'alternate interior' | 'alternate exterior' | 'same-side interior' | 'vertically opposite';
const PARALLEL_RELS: Relation[] = ['corresponding', 'alternate interior', 'alternate exterior', 'same-side interior'];
const ALL_RELS: Relation[] = [...PARALLEL_RELS, 'vertically opposite'];

const REGIONS: Region[] = ['UL', 'UR', 'LL', 'LR'];
const ALL_SPOTS: Spot[] = (['P', 'Q'] as const).flatMap((p) => REGIONS.map((r) => ({ at: p, r })));
const spotKey = (s: Spot) => `${s.at}-${s.r}`;

/** Angle numbering schemes: maps spot key to the number shown. */
const SCHEMES: Array<Record<string, number>> = [
  { 'P-UL': 1, 'P-UR': 2, 'P-LL': 3, 'P-LR': 4, 'Q-UL': 5, 'Q-UR': 6, 'Q-LL': 7, 'Q-LR': 8 },
  { 'P-UL': 1, 'P-UR': 2, 'P-LR': 3, 'P-LL': 4, 'Q-UL': 5, 'Q-UR': 6, 'Q-LR': 7, 'Q-LL': 8 },
  { 'P-UR': 1, 'P-UL': 2, 'P-LL': 3, 'P-LR': 4, 'Q-UR': 5, 'Q-UL': 6, 'Q-LL': 7, 'Q-LR': 8 },
  { 'Q-UL': 1, 'Q-UR': 2, 'Q-LL': 3, 'Q-LR': 4, 'P-UL': 5, 'P-UR': 6, 'P-LL': 7, 'P-LR': 8 },
];

const isInterior = (s: Spot) => (s.at === 'P' ? s.r[0] === 'L' : s.r[0] === 'U');
/** Family of equal angles when the lines are parallel: UR/LL are one family, UL/LR the other. */
const family = (s: Spot) => (s.r === 'UR' || s.r === 'LL' ? 0 : 1);

function relationOf(a: Spot, b: Spot): Relation | 'linear pair' | 'other' {
  if (a.at === b.at) return a.r[0] !== b.r[0] && a.r[1] !== b.r[1] ? 'vertically opposite' : 'linear pair';
  if (a.r === b.r) return 'corresponding';
  const ia = isInterior(a);
  const ib = isInterior(b);
  if (ia && ib) return a.r[1] !== b.r[1] ? 'alternate interior' : 'same-side interior';
  if (!ia && !ib && a.r[1] !== b.r[1]) return 'alternate exterior';
  return 'other';
}

/** Ordered pairs of distinct spots with the relation (the first at P when `pq`). */
function pairsWith(rel: Relation | 'linear pair' | 'other', pq = false): Array<[Spot, Spot]> {
  const out: Array<[Spot, Spot]> = [];
  for (const a of ALL_SPOTS) for (const b of ALL_SPOTS) if (spotKey(a) !== spotKey(b) && relationOf(a, b) === rel && (!pq || (a.at === 'P' && b.at === 'Q'))) out.push([a, b]);
  return out;
}

const RULE: Record<Relation, string> = {
  corresponding: 'Corresponding angles are equal.',
  'alternate interior': 'Alternate interior angles are equal.',
  'alternate exterior': 'Alternate exterior angles are equal.',
  'same-side interior': 'Same-side interior angles are supplementary.',
  'vertically opposite': 'Vertically opposite angles are equal.',
};

/** The converse: the angle fact that proves two lines are parallel. */
const CONVERSE: Record<Relation, string> = {
  corresponding: 'If corresponding angles are equal, the lines are parallel.',
  'alternate interior': 'If alternate interior angles are equal, the lines are parallel.',
  'alternate exterior': 'If alternate exterior angles are equal, the lines are parallel.',
  'same-side interior': 'If same-side interior angles are supplementary, the lines are parallel.',
  'vertically opposite': 'If vertically opposite angles are equal, the lines are parallel.',
};

const WHY: Record<Relation, string> = {
  corresponding: 'they are in matching positions at the two intersections',
  'alternate interior': 'they are between the two lines and on opposite sides of the transversal',
  'alternate exterior': 'they are outside the two lines and on opposite sides of the transversal',
  'same-side interior': 'they are between the two lines and on the same side of the transversal',
  'vertically opposite': 'they are opposite each other at the same intersection',
};

const PARALLEL_HINT = 'Corresponding, alternate interior and alternate exterior angles are equal. Same-side interior angles add to $180^\\circ$. Vertically opposite angles are always equal.';

/** Measure of a region at a crossing where the line has direction phi and the transversal direction theta. */
function regionMeasure(r: Region, theta: number, phi: number) {
  return r === 'UR' || r === 'LL' ? theta - phi : 180 - theta + phi;
}

function regionBounds(r: Region, theta: number, phi: number): [number, number] {
  switch (r) {
    case 'UR':
      return [phi, theta];
    case 'UL':
      return [theta, phi + 180];
    case 'LL':
      return [phi + 180, theta + 180];
    case 'LR':
      return [theta + 180, phi + 360];
  }
}

/**
 * Two lines cut by a transversal. Line m (upper) is horizontal; line n (lower) has direction `tilt`
 * (0 when parallel). `theta` is the direction of the transversal (between 35° and 145°).
 */
function transversalFigure(o: { theta: number; tilt?: number; labels: Record<string, string>; arcs?: string[]; marks?: boolean }): PlaneFigure {
  const s = new Sketch();
  const th = o.theta;
  const tilt = o.tilt ?? 0;
  const gap = 4;
  const P: P = [gap / 2 / Math.tan(rad(th)), gap / 2];
  const Q: P = [-gap / 2 / Math.tan(rad(th)), -gap / 2];
  const half = 5.4;
  const m1: P = [-half, P[1]];
  const m2: P = [half, P[1]];
  const n1 = at(Q, tilt + 180, (half + Q[0]) / Math.cos(rad(tilt)));
  const n2 = at(Q, tilt, (half - Q[0]) / Math.cos(rad(tilt)));
  s.seg(m1, m2, { arrowStart: true, arrowEnd: true }).seg(n1, n2, { arrowStart: true, arrowEnd: true });
  const t1 = at(Q, th + 180, 2.6);
  const t2 = at(P, th, 2.6);
  s.seg(t1, t2, { arrowStart: true, arrowEnd: true, color: 'accent' });
  if (o.marks) {
    const xm = th < 90 ? -half + 1.2 : half - 1.4;
    for (const y of [P[1], Q[1]]) {
      s.polyline([
        [xm - 0.24, y + 0.22],
        [xm + 0.04, y],
        [xm - 0.24, y - 0.22],
      ]);
    }
  }
  s.endLabel(m2, 0, 'm').endLabel(n2, tilt, 'n').endLabel(t2, th, 't');
  for (const sp of ALL_SPOTS) {
    const lab = o.labels[spotKey(sp)];
    if (!lab) continue;
    const V = sp.at === 'P' ? P : Q;
    const phi = sp.at === 'P' ? 0 : tilt;
    const [a0, a1] = regionBounds(sp.r, th, phi);
    if (o.arcs?.includes(spotKey(sp))) s.arc(V, 0.55, a0, a1);
    s.angleLabel(V, a0, a1, lab, lab.length > 2 ? 30 : 20);
  }
  return s.build({ margin: 0.7 });
}

const numberLabels = (scheme: Record<string, number>) => Object.fromEntries(Object.entries(scheme).map(([k, v]) => [k, String(v)]));
const spotOf = (scheme: Record<string, number>, n: number): Spot => {
  const key = Object.keys(scheme).find((k) => scheme[k] === n)!;
  const [a, r] = key.split('-');
  return { at: a as 'P' | 'Q', r: r as Region };
};

function pickTheta(rng: Rng): number {
  return rng.pick([50, 55, 60, 65, 70, 110, 115, 120, 125, 130]);
}
const thetaWide = (rng: Rng) => rng.intExcept(40, 140, Array.from({ length: 21 }, (_, i) => 80 + i));

/** Steps that find the angle at spot t from the angle at spot g (lines parallel), naming each property. */
function chainSteps(scheme: Record<string, number>, g: Spot, t: Spot, theta: number): string[] {
  const gN = scheme[spotKey(g)];
  const tN = scheme[spotKey(t)];
  const gv = regionMeasure(g.r, theta, 0);
  const tv = regionMeasure(t.r, theta, 0);
  const rel = relationOf(g, t);
  if (rel === 'linear pair') return [`$\\angle ${gN}$ and $\\angle ${tN}$ form a straight angle, so they are supplementary: $\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$.`];
  if (rel === 'same-side interior') return [`$\\angle ${gN}$ and $\\angle ${tN}$ are same-side interior angles, so they are supplementary: $\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$.`];
  if (rel !== 'other') return [`$\\angle ${gN}$ and $\\angle ${tN}$ are ${rel} angles, so they are equal: $\\angle ${tN} = ${deg(tv)}$.`];
  const m = ALL_SPOTS.find((s) => s.at === t.at && relationOf(g, s) === 'corresponding')!;
  const mN = scheme[spotKey(m)];
  return [
    `$\\angle ${mN}$ and $\\angle ${gN}$ are corresponding angles, so $\\angle ${mN} = ${deg(gv)}$.`,
    relationOf(m, t) === 'vertically opposite'
      ? `$\\angle ${tN}$ and $\\angle ${mN}$ are vertically opposite angles, so $\\angle ${tN} = ${deg(tv)}$.`
      : `$\\angle ${tN}$ and $\\angle ${mN}$ form a straight angle, so $\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$.`,
  ];
}

/** Expressions k1 x + c1 and k2 x + c2 that take the values va and vb at a whole-number x. */
function exprPair(rng: Rng, va: number, vb: number, equal: boolean) {
  for (let i = 0; i < 400; i++) {
    const x = rng.int(8, 32);
    let k1 = rng.int(2, 5);
    let k2 = equal ? rng.intExcept(1, 4, [k1]) : rng.int(1, 4);
    if (equal && k2 > k1) [k1, k2] = [k2, k1];
    const c1 = va - k1 * x;
    const c2 = vb - k2 * x;
    if (Math.abs(c1) > 60 || Math.abs(c2) > 60 || (c1 === 0 && c2 === 0)) continue;
    return { x, k1, c1, k2, c2 };
  }
  throw new Error('exprPair');
}

/** Two parallel lines m and n with a bent path A–V–B between them (the "zigzag" or "M" figure). */
function zigzagFigure(a: number, b: number, labels: { A: string; B: string; V: string }): PlaneFigure {
  const s = new Sketch();
  const h = 2.6;
  const V: P = [0, 0];
  const A: P = [-h / Math.tan(rad(a)), h];
  const B: P = [-h / Math.tan(rad(b)), -h];
  const left = Math.min(A[0], B[0]) - 2.4;
  const right = 2.6;
  s.seg([left, h], [right, h], { arrowStart: true, arrowEnd: true }).seg([left, -h], [right, -h], { arrowStart: true, arrowEnd: true });
  s.chevrons([left, h], [left + 2, h]).chevrons([left, -h], [left + 2, -h]);
  s.seg(A, V).seg(V, B);
  s.dot(A).dot(B).dot(V);
  s.arc(A, 0.6, -a, 0).angleLabel(A, -a, 0, labels.A, 26);
  s.arc(B, 0.6, 0, b).angleLabel(B, 0, b, labels.B, 26);
  s.arc(V, 0.5, 180 - a, 180 + b).angleLabel(V, 180 - a, 180 + b, labels.V, 22);
  s.endLabel([right, h], 0, 'm').endLabel([right, -h], 0, 'n');
  return s.build({ margin: 0.6 });
}

/** Triangle ABC with A on line m and B, C on line n (m ∥ n): interior angles beta at B and gamma at C. */
function betweenFigure(beta: number, gamma: number, names: [string, string, string], labels: { left?: string; right?: string; A?: string; B?: string; C?: string }): PlaneFigure {
  const s = new Sketch();
  const h = 4.4;
  const A: P = [0, h / 2];
  const B: P = [-h / Math.tan(rad(beta)), -h / 2];
  const C: P = [h / Math.tan(rad(gamma)), -h / 2];
  const left = Math.min(B[0], -2.5) - 1.6;
  const right = Math.max(C[0], 2.5) + 1.6;
  s.seg([left, A[1]], [right, A[1]], { arrowStart: true, arrowEnd: true }).seg([left, B[1]], [right, B[1]], { arrowStart: true, arrowEnd: true });
  s.chevrons([left, A[1]], [left + 1.6, A[1]]).chevrons([left, B[1]], [left + 1.6, B[1]]);
  s.seg(A, B).seg(A, C);
  s.dot(A).dot(B).dot(C);
  s.endLabel(A, 90, names[0]).endLabel(B, -100, names[1]).endLabel(C, -80, names[2]);
  s.endLabel([right, A[1]], 0, 'm').endLabel([right, B[1]], 0, 'n');
  if (labels.left) s.arc(A, 0.6, 180, 180 + beta).angleLabel(A, 180, 180 + beta, labels.left, 26);
  if (labels.right) s.arc(A, 0.6, 360 - gamma, 360).angleLabel(A, 360 - gamma, 360, labels.right, 26);
  if (labels.A) s.arc(A, 0.45, 180 + beta, 360 - gamma).angleLabel(A, 180 + beta, 360 - gamma, labels.A, 22);
  if (labels.B) s.arc(B, 0.6, 0, beta).angleLabel(B, 0, beta, labels.B, 24);
  if (labels.C) s.arc(C, 0.6, 180 - gamma, 180).angleLabel(C, 180 - gamma, 180, labels.C, 24);
  return s.build({ margin: 0.6 });
}

const parallelAngles = skill({
  id: 'm202-parallel-angles',
  name: 'Angles formed by parallel lines',
  description: 'Find angles formed by parallel lines and a transversal, and give the angle property that justifies each one.',
  outcomes: ['G1', 'G2'],
  lessonId: 'm202-2-1',
  gen(rng, d) {
    if (d === 1) {
      const theta = pickTheta(rng);
      const rel = rng.pick(ALL_RELS);
      const [g, t] = rng.pick(pairsWith(rel));
      const v = regionMeasure(g.r, theta, 0);
      const x = regionMeasure(t.r, theta, 0);
      const labels = { [spotKey(g)]: `${v}°`, [spotKey(t)]: 'x' };
      const falseRule = rel === 'same-side interior' ? 'Same-side interior angles are equal.' : `${cap(rel)} angles are supplementary.`;
      const others = rng.shuffle(ALL_RELS.filter((r) => r !== rel)).slice(0, 2).map((r) => RULE[r]);
      return {
        prompt: 'Lines $m$ and $n$ are parallel and $t$ is a transversal. Find $x$, then choose the reason that justifies your answer.',
        figure: transversalFigure({ theta, labels, arcs: Object.keys(labels), marks: true }),
        parts: [numPart(x, { label: '$x =$', suffix: '°' }), { label: 'Reason', answer: mc(rng, RULE[rel], [falseRule, ...others]) }],
        hints: ['Decide how $x$ and the given angle are related. Are they at the same intersection or at different intersections? Between the lines or outside them?', PARALLEL_HINT],
        solution: [
          `$x$ and the $${deg(v)}$ angle are ${rel} angles: ${WHY[rel]}.`,
          rel === 'same-side interior' ? `${RULE[rel]} $x = 180^\\circ - ${deg(v)}$` : RULE[rel],
          `$x = ${deg(x)}$, because ${RULE[rel].charAt(0).toLowerCase()}${RULE[rel].slice(1)}`,
        ],
        answerDisplay: `$x = ${deg(x)}$; ${RULE[rel]}`,
      };
    }
    if (d === 2) {
      const scheme = rng.pick(SCHEMES);
      const theta = thetaWide(rng);
      if (rng.chance(0.5)) {
        // Two unknown angles from one given angle.
        const gN = rng.int(1, 8);
        const g = spotOf(scheme, gN);
        const same = ALL_SPOTS.filter((s) => family(s) === family(g) && spotKey(s) !== spotKey(g));
        const other = ALL_SPOTS.filter((s) => family(s) !== family(g));
        const p = rng.pick(same);
        const q = rng.pick(other);
        const [s1, s2] = rng.chance(0.5) ? [p, q] : [q, p];
        const n1 = scheme[spotKey(s1)];
        const n2 = scheme[spotKey(s2)];
        const gv = regionMeasure(g.r, theta, 0);
        const v1 = regionMeasure(s1.r, theta, 0);
        const v2 = regionMeasure(s2.r, theta, 0);
        return {
          prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. $\\angle ${gN} = ${deg(gv)}$. Find $\\angle ${n1}$ and $\\angle ${n2}$.`,
          figure: transversalFigure({ theta, labels: numberLabels(scheme), marks: true }),
          parts: [numPart(v1, { label: `$\\angle ${n1} =$`, suffix: '°' }), numPart(v2, { label: `$\\angle ${n2} =$`, suffix: '°' })],
          hints: [
            'With parallel lines, the eight angles come in only two sizes. Angles of the same size are related by equal-angle properties; an acute angle and an obtuse angle add to $180^\\circ$.',
            'Name the relationship for each pair. If an angle is not directly related to the given one, go through a third angle at the same intersection.',
          ],
          solution: [...chainSteps(scheme, g, s1, theta), ...chainSteps(scheme, g, s2, theta), `$\\angle ${n1} = ${deg(v1)}$ and $\\angle ${n2} = ${deg(v2)}$`],
        };
      }
      const rel = rng.pick(PARALLEL_RELS);
      const [sa, sb] = rng.pick(pairsWith(rel, true));
      const va = regionMeasure(sa.r, theta, 0);
      const vb = regionMeasure(sb.r, theta, 0);
      const co = rel === 'same-side interior';
      const e = exprPair(rng, va, vb, !co);
      const labels = { [spotKey(sa)]: exprLabel(e.k1, e.c1), [spotKey(sb)]: exprLabel(e.k2, e.c2) };
      const eq = co ? `(${linExpr(e.k1, e.c1)}) + (${linExpr(e.k2, e.c2)}) = 180` : `${linExpr(e.k1, e.c1)} = ${linExpr(e.k2, e.c2)}`;
      return {
        prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. Find $x$, then find the measure of the angle labelled $${exprDeg(e.k1, e.c1)}$.`,
        figure: transversalFigure({ theta, labels, arcs: Object.keys(labels), marks: true }),
        parts: [numPart(e.x, { label: '$x =$' }), numPart(va, { suffix: '°', label: `$${exprDeg(e.k1, e.c1)} =$` })],
        hints: ['Name the angle pair first: corresponding, alternate interior, alternate exterior or same-side interior?', co ? 'Same-side interior angles are supplementary, so the two expressions add to $180$.' : `${RULE[rel]} Set the two expressions equal.`],
        solution: [
          `The angles are ${rel} angles. ${RULE[rel]}`,
          `$${eq}$`,
          ...(co ? solveSum([[e.k1, e.c1], [e.k2, e.c2]], 180) : solveEqual(e.k1, e.c1, e.k2, e.c2)),
          `Substitute $x = ${e.x}$: $${subst(e.k1, e.c1, e.x)} = ${va}$${co ? ` and $${subst(e.k2, e.c2, e.x)} = ${vb}$ (check: $${va} + ${vb} = 180$)` : ` (check: $${subst(e.k2, e.c2, e.x)} = ${vb}$)`}.`,
          `$x = ${e.x}$ and the angle measures $${deg(va)}$.`,
        ],
      };
    }
    // d3
    const kind = rng.pick(['zigzag', 'zigzag', 'between', 'chain'] as const);
    if (kind === 'zigzag') {
      const a = rng.int(24, 64);
      const b = rng.intExcept(24, 64, [a]);
      const findV = rng.chance(0.55);
      const fig = zigzagFigure(a, b, findV ? { A: `${a}°`, B: `${b}°`, V: 'x' } : { A: `${a}°`, B: 'x', V: `${a + b}°` });
      const ctx = rng.pick([
        'Lines $m$ and $n$ are parallel.',
        'A bike path bends between two parallel roads $m$ and $n$.',
        'A bent bracket joins two parallel shelves $m$ and $n$.',
      ]);
      const x = findV ? a + b : b;
      return {
        prompt: `${ctx} Find $x$.`,
        figure: fig,
        parts: [numPart(x, { label: '$x =$', suffix: '°' })],
        hints: ['Draw a third line through the bend, parallel to $m$ and $n$.', 'The new line splits the angle at the bend into two parts. Each part is an alternate interior angle with one of the given angles.'],
        solution: [
          'Draw a line through the vertex of the bend, parallel to $m$ and $n$.',
          `The upper part of the angle at the bend and the $${deg(a)}$ angle are alternate interior angles (between the new line and $m$), so the upper part is $${deg(a)}$.`,
          findV
            ? `In the same way, the lower part equals the $${deg(b)}$ angle at $n$.`
            : `The lower part and $x$ are alternate interior angles (between the new line and $n$), so the lower part equals $x$.`,
          findV ? `$x = ${deg(a)} + ${deg(b)} = ${deg(a + b)}$` : `$${deg(a)} + x = ${deg(a + b)}$, so $x = ${deg(a + b)} - ${deg(a)} = ${deg(b)}$`,
          `$x = ${deg(x)}$`,
        ],
      };
    }
    if (kind === 'between') {
      const beta = rng.int(42, 74);
      const gamma = rng.intExcept(42, 74, [beta]);
      const names = rng.pick([['A', 'B', 'C'], ['P', 'Q', 'R'], ['K', 'L', 'M'], ['D', 'E', 'F']] as Array<[string, string, string]>);
      const [nA, nB, nC] = names;
      const x = 180 - beta - gamma;
      return {
        prompt: `Lines $m$ and $n$ are parallel. Point $${nA}$ is on $m$, and $${nB}$ and $${nC}$ are on $n$. Find $\\angle ${nA}${nB}${nC}$ and $\\angle ${nB}${nA}${nC}$.`,
        figure: betweenFigure(beta, gamma, names, { left: `${beta}°`, C: `${gamma}°` }),
        parts: [numPart(beta, { label: `$\\angle ${nA}${nB}${nC} =$`, suffix: '°' }), numPart(x, { label: `$\\angle ${nB}${nA}${nC} =$`, suffix: '°' })],
        hints: [`Look for Z shapes: segment $${nA}${nB}$ and segment $${nA}${nC}$ are each a transversal of the parallel lines.`, `The three angles at $${nA}$ on line $m$ make a straight angle, $180^\\circ$.`],
        solution: [
          `$\\angle ${nA}${nB}${nC}$ and the $${deg(beta)}$ angle at $${nA}$ are alternate interior angles (transversal $${nA}${nB}$), so $\\angle ${nA}${nB}${nC} = ${deg(beta)}$.`,
          `The angle at $${nA}$ to the right of $${nA}${nC}$ and $\\angle ${nA}${nC}${nB}$ are alternate interior angles (transversal $${nA}${nC}$), so it measures $${deg(gamma)}$.`,
          `The three angles at $${nA}$ form a straight angle: $${deg(beta)} + \\angle ${nB}${nA}${nC} + ${deg(gamma)} = 180^\\circ$.`,
          `$\\angle ${nB}${nA}${nC} = 180^\\circ - ${deg(beta)} - ${deg(gamma)} = ${deg(x)}$`,
          `$\\angle ${nA}${nB}${nC} = ${deg(beta)}$ and $\\angle ${nB}${nA}${nC} = ${deg(x)}$`,
        ],
      };
    }
    // Two-step algebra: the labelled angles are not a named pair.
    const theta = thetaWide(rng);
    const [sa, sb] = rng.pick(pairsWith('other', true));
    const va = regionMeasure(sa.r, theta, 0);
    const vb = regionMeasure(sb.r, theta, 0);
    const same = family(sa) === family(sb);
    const e = exprPair(rng, va, vb, same);
    const labels = { [spotKey(sa)]: exprLabel(e.k1, e.c1), [spotKey(sb)]: exprLabel(e.k2, e.c2) };
    const eq = same ? `${linExpr(e.k1, e.c1)} = ${linExpr(e.k2, e.c2)}` : `(${linExpr(e.k1, e.c1)}) + (${linExpr(e.k2, e.c2)}) = 180`;
    return {
      prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. Find $x$, then find the measure of the angle labelled $${exprDeg(e.k2, e.c2)}$.`,
      figure: transversalFigure({ theta, labels, arcs: Object.keys(labels), marks: true }),
      parts: [numPart(e.x, { label: '$x =$' }), numPart(vb, { suffix: '°', label: `$${exprDeg(e.k2, e.c2)} =$` })],
      hints: ['These two angles are not a named pair. Use a third angle: the one that corresponds to the first angle at the other intersection.', 'Once you know how the two angles are related (equal or supplementary), write an equation and solve it.'],
      solution: [
        `The angle at the lower intersection that corresponds to the $${exprDeg(e.k1, e.c1)}$ angle has the same measure, $${exprDeg(e.k1, e.c1)}$.`,
        same
          ? `That angle and the $${exprDeg(e.k2, e.c2)}$ angle are vertically opposite, so they are equal: $${eq}$.`
          : `That angle and the $${exprDeg(e.k2, e.c2)}$ angle form a straight angle, so they add to $180^\\circ$: $${eq}$.`,
        ...(same ? solveEqual(e.k1, e.c1, e.k2, e.c2) : solveSum([[e.k1, e.c1], [e.k2, e.c2]], 180)),
        `Substitute $x = ${e.x}$: $${subst(e.k2, e.c2, e.x)} = ${vb}$.`,
        `$x = ${e.x}$ and the angle measures $${deg(vb)}$.`,
      ],
    };
  },
});

/**
 * Options for "are the lines parallel?": exactly one statement is true with the right rule. Every distractor
 * either states a false fact or reaches the wrong conclusion.
 */
function parallelOptions(rng: Rng, rel: Relation, a: number, b: number): { answer: AnswerSpec; correct: string } {
  const co = rel === 'same-side interior';
  const sum = a + b;
  const parallel = co ? sum === 180 : a === b;
  const Yes = 'Yes, $m \\parallel n$:';
  const No = 'No, $m$ and $n$ are not parallel:';
  let correct: string;
  let ds: string[];
  if (co && parallel) {
    correct = `${Yes} the same-side interior angles are supplementary.`;
    ds = [`${No} the same-side interior angles are not equal.`, `${Yes} the same-side interior angles are equal.`, `${No} the transversal is not perpendicular to the lines.`];
  } else if (co) {
    correct = `${No} the same-side interior angles add to $${deg(sum)}$, not $180^\\circ$.`;
    ds = [
      a === b ? `${Yes} the same-side interior angles are equal.` : `${Yes} the same-side interior angles are close enough to $180^\\circ$.`,
      `${Yes} the same-side interior angles are supplementary.`,
      a === b ? `${No} the same-side interior angles are not equal.` : `${No} the same-side interior angles are equal.`,
    ];
  } else if (parallel) {
    correct = `${Yes} the ${rel} angles are equal.`;
    ds = [`${No} the ${rel} angles add to $${deg(sum)}$, not $180^\\circ$.`, `${Yes} the ${rel} angles are supplementary.`, `${No} the transversal is not perpendicular to the lines.`];
  } else {
    correct = `${No} the ${rel} angles are not equal.`;
    ds = [
      sum === 180 ? `${Yes} the ${rel} angles are supplementary.` : `${Yes} the ${rel} angles are close enough to equal.`,
      `${Yes} the ${rel} angles are equal.`,
      sum === 180 ? `${Yes} the lines look like they will never meet.` : `${No} the ${rel} angles are supplementary.`,
    ];
  }
  return { answer: mc(rng, correct, ds), correct };
}

/** Two-column proofs that lines are parallel (angle numbers come from the scheme). */
function parallelProof(rng: Rng, scheme: Record<string, number>) {
  const N = (s: Spot) => scheme[spotKey(s)];
  const A = (s: Spot) => `\\angle ${N(s)}`;
  const kind = rng.pick(['altExt', 'sameSide', 'corr'] as const);
  type Row = { st: string; reason: string };
  let rows: Row[];
  let given: string;
  if (kind === 'altExt') {
    // Given alternate exterior angles a (at P) and b (at Q) are equal; c is vertically opposite b, and corresponds to a.
    const [a, b] = rng.pick(pairsWith('alternate exterior', true));
    const c = ALL_SPOTS.find((s) => s.at === 'Q' && relationOf(s, b) === 'vertically opposite')!;
    given = `$${A(a)} = ${A(b)}$`;
    rows = [
      { st: `$${A(a)} = ${A(b)}$`, reason: 'Given' },
      { st: `$${A(b)} = ${A(c)}$`, reason: 'Vertically opposite angles are equal' },
      { st: `$${A(a)} = ${A(c)}$`, reason: 'Transitive property' },
      { st: '$m \\parallel n$', reason: 'Corresponding angles are equal' },
    ];
  } else if (kind === 'sameSide') {
    // Given same-side interior angles a (at P) and b (at Q) are supplementary; c forms a straight angle with a.
    const [a, b] = rng.pick(pairsWith('same-side interior', true));
    const c = ALL_SPOTS.find((s) => s.at === 'P' && isInterior(s) && spotKey(s) !== spotKey(a))!;
    given = `$${A(a)} + ${A(b)} = 180^\\circ$`;
    rows = [
      { st: `$${A(a)} + ${A(b)} = 180^\\circ$`, reason: 'Given' },
      { st: `$${A(a)} + ${A(c)} = 180^\\circ$`, reason: 'Angles on a straight line are supplementary' },
      { st: `$${A(b)} = ${A(c)}$`, reason: 'Supplements of the same angle are equal' },
      { st: '$m \\parallel n$', reason: 'Alternate interior angles are equal' },
    ];
  } else {
    // Given corresponding angles a (exterior, at P) and b (at Q) are equal; c is vertically opposite a and alternate interior with b.
    const a = rng.pick(ALL_SPOTS.filter((s) => s.at === 'P' && !isInterior(s)));
    const b: Spot = { at: 'Q', r: a.r };
    const c = ALL_SPOTS.find((s) => s.at === 'P' && relationOf(s, a) === 'vertically opposite')!;
    given = `$${A(a)} = ${A(b)}$`;
    rows = [
      { st: `$${A(a)} = ${A(b)}$`, reason: 'Given' },
      { st: `$${A(a)} = ${A(c)}$`, reason: 'Vertically opposite angles are equal' },
      { st: `$${A(b)} = ${A(c)}$`, reason: 'Transitive property' },
      { st: '$m \\parallel n$', reason: 'Alternate interior angles are equal' },
    ];
  }
  return { rows, given };
}

const PROOF_REASONS = [
  'Given',
  'Vertically opposite angles are equal',
  'Angles on a straight line are supplementary',
  'Transitive property',
  'Supplements of the same angle are equal',
  'Corresponding angles are equal',
  'Alternate interior angles are equal',
  'Alternate exterior angles are equal',
  'Same-side interior angles are supplementary',
];

/** Distractor reasons that are clearly wrong for the hidden step (never an equivalent wording). */
function reasonDistractors(rng: Rng, correct: string, pool: string[]): string[] {
  const clash: Record<string, string[]> = {
    'Transitive property': ['Supplements of the same angle are equal'],
    'Supplements of the same angle are equal': ['Transitive property'],
  };
  return rng.shuffle(pool.filter((r) => r !== correct && !(clash[correct] ?? []).includes(r))).slice(0, 3);
}

function proofTable(rows: Array<{ st: string; reason: string }>, hide: number, hideStatement = false): string {
  return [
    '| Statement | Reason |',
    '|---|---|',
    ...rows.map((r, i) => `| ${i === hide && hideStatement ? '**?**' : r.st} | ${i === hide && !hideStatement ? '**?**' : r.reason} |`),
  ].join('\n');
}

const parallelProofSkill = skill({
  id: 'm202-parallel-proof',
  name: 'Proving lines are parallel',
  description: 'Decide whether lines are parallel from angle measures, and give the reason (the converse) that proves two lines are parallel.',
  outcomes: ['G1'],
  lessonId: 'm202-2-1',
  format: 'mc',
  gen(rng, d) {
    if (d === 1) {
      const rel = rng.pick(PARALLEL_RELS);
      const wantParallel = rng.chance(0.5);
      const theta = thetaWide(rng);
      const [sa, sb] = rng.pick(pairsWith(rel, true));
      const va = regionMeasure(sa.r, theta, 0);
      const vbPar = regionMeasure(sb.r, theta, 0);
      const vb = wantParallel ? vbPar : vbPar + rng.pick([-6, -5, -4, -3, 3, 4, 5, 6]);
      // Tilt line n so the drawn angle at Q is true.
      const tilt = sb.r === 'UR' || sb.r === 'LL' ? theta - vb : vb - 180 + theta;
      const labels = { [spotKey(sa)]: `${va}°`, [spotKey(sb)]: `${vb}°` };
      const opts = parallelOptions(rng, rel, va, vb);
      const co = rel === 'same-side interior';
      return {
        prompt: 'Transversal $t$ crosses lines $m$ and $n$. Use the angle measures to decide whether $m \\parallel n$.',
        figure: transversalFigure({ theta, tilt, labels, arcs: Object.keys(labels) }),
        parts: [{ answer: opts.answer }],
        hints: ['Name the angle pair first.', 'Lines are parallel if corresponding angles are equal, alternate interior or alternate exterior angles are equal, or same-side interior angles add to $180^\\circ$.'],
        solution: [
          `The marked angles are ${rel} angles: ${WHY[rel]}.`,
          co ? 'For the lines to be parallel, same-side interior angles must add to $180^\\circ$.' : `For the lines to be parallel, ${rel} angles must be equal.`,
          co ? `$${deg(va)} + ${deg(vb)} = ${deg(va + vb)}$` : `$${deg(va)}$ and $${deg(vb)}$ are ${va === vb ? '' : 'not '}equal.`,
          opts.correct,
        ],
        answerDisplay: opts.correct,
      };
    }
    if (d === 2) {
      const scheme = rng.pick(SCHEMES);
      const theta = thetaWide(rng);
      const fig = transversalFigure({ theta, labels: numberLabels(scheme) });
      const N = (s: Spot) => scheme[spotKey(s)];
      const rel = rng.pick(PARALLEL_RELS);
      const [a, b] = rng.pick(pairsWith(rel));
      const co = rel === 'same-side interior';
      const stmt = co ? `$\\angle ${N(a)} + \\angle ${N(b)} = 180^\\circ$` : `$\\angle ${N(a)} = \\angle ${N(b)}$`;
      if (rng.chance(0.5)) {
        const ds = rng.shuffle(ALL_RELS.filter((r) => r !== rel)).slice(0, 3).map((r) => CONVERSE[r]);
        return {
          prompt: `Transversal $t$ crosses lines $m$ and $n$. You measure and find that ${stmt}. Which property proves that $m \\parallel n$?`,
          figure: fig,
          parts: [{ answer: mc(rng, CONVERSE[rel], ds) }],
          hints: ['Find the two angles in the diagram. Where are they: at the same intersection or different ones? Between the lines or outside?', 'Each angle property has a converse: if the angles behave the way they would for parallel lines, then the lines are parallel.'],
          solution: [`$\\angle ${N(a)}$ and $\\angle ${N(b)}$ are ${rel} angles: ${WHY[rel]}.`, `${co ? 'They are supplementary' : 'They are equal'}, so the converse applies.`, CONVERSE[rel]],
          answerDisplay: CONVERSE[rel],
        };
      }
      // Which statement is enough?
      type Opt = { md: string; why: string };
      const pool: Opt[] = [];
      const [v1, v2] = rng.pick(pairsWith('vertically opposite'));
      pool.push({ md: `$\\angle ${N(v1)} = \\angle ${N(v2)}$`, why: `$\\angle ${N(v1)}$ and $\\angle ${N(v2)}$ are vertically opposite, so they are equal for any two lines. It tells you nothing about $m$ and $n$.` });
      const [l1, l2] = rng.pick(pairsWith('linear pair'));
      pool.push({ md: `$\\angle ${N(l1)} + \\angle ${N(l2)} = 180^\\circ$`, why: `$\\angle ${N(l1)}$ and $\\angle ${N(l2)}$ form a straight angle, so they add to $180^\\circ$ for any two lines.` });
      const [s1, s2] = rng.pick(pairsWith('same-side interior'));
      if (!co) pool.push({ md: `$\\angle ${N(s1)} = \\angle ${N(s2)}$`, why: `$\\angle ${N(s1)}$ and $\\angle ${N(s2)}$ are same-side interior angles. They must be supplementary, not equal.` });
      const eqRel = rng.pick(PARALLEL_RELS.filter((r) => r !== 'same-side interior' && r !== rel));
      const [e1, e2] = rng.pick(pairsWith(eqRel));
      pool.push({ md: `$\\angle ${N(e1)} + \\angle ${N(e2)} = 180^\\circ$`, why: `$\\angle ${N(e1)}$ and $\\angle ${N(e2)}$ are ${eqRel} angles. They must be equal, not supplementary.` });
      const ds = rng.shuffle(pool.filter((o) => o.md !== stmt)).slice(0, 3);
      return {
        prompt: 'Transversal $t$ crosses lines $m$ and $n$. Which piece of information is enough to prove that $m \\parallel n$?',
        figure: fig,
        parts: [{ answer: mc(rng, stmt, ds.map((o) => o.md)) }],
        hints: ['Some statements are true for **any** two lines, so they cannot prove anything.', 'You need equal corresponding, alternate interior or alternate exterior angles, or supplementary same-side interior angles.'],
        solution: [
          ...ds.map((o) => o.why),
          `$\\angle ${N(a)}$ and $\\angle ${N(b)}$ are ${rel} angles. ${CONVERSE[rel]}`,
          `The information that proves $m \\parallel n$ is ${stmt}.`,
        ],
        answerDisplay: stmt,
      };
    }
    // d3
    if (rng.chance(0.45)) {
      const theta = thetaWide(rng);
      const rel = rng.pick(PARALLEL_RELS);
      const [sa, sb] = rng.pick(pairsWith(rel, true));
      const va = regionMeasure(sa.r, theta, 0);
      const vb = regionMeasure(sb.r, theta, 0);
      const co = rel === 'same-side interior';
      const e = exprPair(rng, va, vb, !co);
      const labels = { [spotKey(sa)]: exprLabel(e.k1, e.c1), [spotKey(sb)]: exprLabel(e.k2, e.c2) };
      const eq = co ? `(${linExpr(e.k1, e.c1)}) + (${linExpr(e.k2, e.c2)}) = 180` : `${linExpr(e.k1, e.c1)} = ${linExpr(e.k2, e.c2)}`;
      return {
        prompt: 'Transversal $t$ crosses lines $m$ and $n$. For what value of $x$ is $m \\parallel n$? Give the measure of each marked angle for that value.',
        figure: transversalFigure({ theta, labels, arcs: Object.keys(labels) }),
        parts: [numPart(e.x, { label: '$x =$' }), numPart(va, { suffix: '°', label: `$${exprDeg(e.k1, e.c1)} =$` }), numPart(vb, { suffix: '°', label: `$${exprDeg(e.k2, e.c2)} =$` })],
        hints: ['Name the angle pair. What must be true about this pair for the lines to be parallel?', co ? 'Same-side interior angles must add to $180^\\circ$.' : `The ${rel} angles must be equal. Set the expressions equal and solve.`],
        solution: [
          `The marked angles are ${rel} angles. ${CONVERSE[rel]}`,
          `$${eq}$`,
          ...(co ? solveSum([[e.k1, e.c1], [e.k2, e.c2]], 180) : solveEqual(e.k1, e.c1, e.k2, e.c2)),
          `Check: $${subst(e.k1, e.c1, e.x)} = ${va}$ and $${subst(e.k2, e.c2, e.x)} = ${vb}$${co ? `, and $${va} + ${vb} = 180$` : ''}.`,
          `When $x = ${e.x}$, the angles measure $${deg(va)}$ and $${deg(vb)}$, and $m \\parallel n$.`,
        ],
      };
    }
    const scheme = rng.pick(SCHEMES);
    const theta = thetaWide(rng);
    const { rows, given } = parallelProof(rng, scheme);
    const hide = rng.int(1, 3);
    const correct = rows[hide].reason;
    // Mid-proof the lines are not yet known to be parallel, so only general angle facts are offered there.
    const pool = hide === 3 ? PROOF_REASONS.slice(5) : PROOF_REASONS.slice(0, 5);
    const ds = reasonDistractors(rng, correct, pool);
    return {
      prompt: `Transversal $t$ crosses lines $m$ and $n$.\n\nGiven: ${given}. Prove: $m \\parallel n$.\n\n${proofTable(rows, hide)}\n\nWhich reason is missing?`,
      figure: transversalFigure({ theta, labels: numberLabels(scheme) }),
      parts: [{ answer: mc(rng, correct, ds) }],
      hints: ['Find the angles in the statement on the diagram. How are they related?', 'Statements that are true for any lines use vertically opposite angles or a straight angle. The last step uses a converse to conclude the lines are parallel.'],
      solution: [
        ...rows.map((r, i) => `Step ${i + 1}: ${r.st} — ${r.reason}.`),
        `The missing reason in step ${hide + 1} is "${correct}".`,
      ],
      answerDisplay: correct,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Angles in triangles
// ---------------------------------------------------------------------------

const TRI_LETTERS: Array<[string, string, string, string]> = [
  ['A', 'B', 'C', 'D'],
  ['P', 'Q', 'R', 'S'],
  ['K', 'L', 'M', 'N'],
  ['X', 'Y', 'Z', 'W'],
  ['D', 'E', 'F', 'G'],
  ['J', 'K', 'L', 'M'],
  ['R', 'S', 'T', 'U'],
];

/** Vertices of a triangle with angles a0 at vertex 0 and a1 at vertex 1, base along the x-axis. */
function trianglePts(a0: number, a1: number, base = 6, rot = 0, mirror = false): [P, P, P] {
  const a2 = 180 - a0 - a1;
  const side02 = (base * Math.sin(rad(a1))) / Math.sin(rad(a2));
  const raw: P[] = [[0, 0], [base, 0], at([0, 0], a0, side02)];
  return raw.map(([x, y]) => {
    const xx = mirror ? -x : x;
    return [xx * Math.cos(rad(rot)) - y * Math.sin(rad(rot)), xx * Math.sin(rad(rot)) + y * Math.cos(rad(rot))] as P;
  }) as [P, P, P];
}

interface TriFig {
  angles: [number, number];
  names: string[];
  labels?: Array<string | null>;
  ticks?: Array<[number, number, number]>;
  right?: number;
  /** Extend the side from vertex `from` through vertex `at`; the exterior angle at `at` gets `label`. */
  ext?: Array<{ at: number; from: number; name?: string; label?: string | null }>;
  rot?: number;
  mirror?: boolean;
}

function triangleFigure(o: TriFig): PlaneFigure {
  const s = new Sketch();
  const V = trianglePts(o.angles[0], o.angles[1], 6, o.rot ?? 0, o.mirror ?? false);
  s.polyline([V[0], V[1], V[2], V[0]]);
  const extDirs: number[][] = [[], [], []];
  for (const e of o.ext ?? []) {
    const dir = dirTo(V[e.from], V[e.at]);
    const end = at(V[e.at], dir, 2.6);
    s.seg(V[e.at], end);
    extDirs[e.at].push(dir);
    const third = 3 - e.at - e.from;
    const [a0, a1] = wedge(V[e.at], end, V[third]);
    if (e.label !== null) {
      s.arc(V[e.at], 0.6, a0, a1);
      if (e.label) s.angleLabel(V[e.at], a0, a1, e.label, e.label.length > 3 ? 30 : 22);
    }
    if (e.name) {
      s.dot(at(V[e.at], dir, 2.1));
      s.endLabel(at(V[e.at], dir, 2.1), dir + 90, e.name);
    }
  }
  for (let i = 0; i < 3; i++) {
    const u = V[(i + 1) % 3];
    const w = V[(i + 2) % 3];
    const lab = o.labels?.[i] ?? null;
    if (o.right === i) markAngle(s, V[i], u, w, lab, { right: true });
    else if (lab) markAngle(s, V[i], u, w, lab);
    s.dot(V[i]);
    s.vertexLabel(V[i], [dirTo(V[i], u), dirTo(V[i], w), ...extDirs[i]], o.names[i]);
  }
  for (const [i, j, c] of o.ticks ?? []) s.ticks(V[i], V[j], c);
  return s.build({ margin: 0.7 });
}

/** Three angles of a triangle, each at least `min`, in steps of `step`. */
function triAngles(rng: Rng, min = 30, max = 100, step = 1): [number, number, number] {
  for (;;) {
    const a = rng.int(min / step, max / step) * step;
    const b = rng.int(min / step, max / step) * step;
    const c = 180 - a - b;
    if (c >= min && c <= max && a !== b) return [a, b, c];
  }
}

/** Expressions k_i x + c_i for three angles that add to 180. */
function triExprs(rng: Rng, iso = false) {
  for (let i = 0; i < 500; i++) {
    const x = rng.int(8, 30);
    const k = [rng.int(1, 4), rng.int(1, 4), rng.int(1, 4)];
    const c = [rng.int(-6, 8) * 5, rng.int(-6, 8) * 5, 0];
    if (iso) {
      k[2] = k[1];
      c[2] = c[1];
      const rest = 180 - 2 * (k[1] * x + c[1]);
      c[0] = rest - k[0] * x;
    } else c[2] = 180 - (k[0] + k[1] + k[2]) * x - c[0] - c[1];
    const v = k.map((ki, j) => ki * x + c[j]);
    if (v.some((a) => a < 22 || a > 125) || Math.abs(c[0]) > 60 || Math.abs(c[2]) > 60) continue;
    if (!iso && new Set(v).size < 3) continue;
    return { x, k, c, v };
  }
  throw new Error('triExprs');
}

const triangleAngles = skill({
  id: 'm202-triangle-angles',
  name: 'Angles in triangles',
  description: 'Use the angle sum of a triangle, isosceles triangles and parallel-line properties to find unknown angles.',
  outcomes: ['G1', 'G2'],
  lessonId: 'm202-2-2',
  gen(rng, d) {
    const [nA, nB, nC, nD] = rng.pick(TRI_LETTERS);
    const names = [nA, nB, nC];
    const rot = rng.pick([0, 0, -12, 12, 180]);
    const mirror = rng.chance(0.5);
    const sumHint = 'The angles in a triangle add to $180^\\circ$.';
    if (d === 1) {
      const kind = rng.pick(['two', 'two', 'iso', 'right'] as const);
      if (kind === 'two') {
        const ang = triAngles(rng, 30, 100);
        const u = rng.int(0, 2);
        const labels = ang.map((a, i) => (i === u ? 'x' : `${a}°`));
        const known = ang.filter((_, i) => i !== u);
        return {
          prompt: 'Find the measure of $x$.',
          figure: triangleFigure({ angles: [ang[0], ang[1]], names, labels, rot, mirror }),
          parts: [numPart(ang[u], { label: '$x =$', suffix: '°' })],
          hints: [sumHint, `Subtract the two known angles from $180^\\circ$.`],
          solution: [`${sumHint}`, `$x + ${deg(known[0])} + ${deg(known[1])} = 180^\\circ$`, `$x = 180^\\circ - ${deg(known[0])} - ${deg(known[1])} = ${deg(ang[u])}$`],
        };
      }
      if (kind === 'iso') {
        const apex = rng.int(10, 50) * 2;
        const base = (180 - apex) / 2;
        const askBase = rng.chance(0.6);
        const ang: [number, number, number] = [base, base, apex];
        const labels = askBase ? ['x', null, `${apex}°`] : [`${base}°`, null, 'x'];
        return {
          prompt: `In $\\triangle ${nA}${nB}${nC}$, $${nC}${nA} = ${nC}${nB}$. Find $x$.`,
          figure: triangleFigure({ angles: [ang[0], ang[1]], names, labels, ticks: [[2, 0, 1], [2, 1, 1]], rot: rot === 180 ? 0 : rot, mirror }),
          parts: [numPart(askBase ? base : apex, { label: '$x =$', suffix: '°' })],
          hints: ['The triangle is isosceles: the angles opposite the equal sides are equal.', askBase ? 'The two base angles are equal and share what is left after the vertex angle: $\\dfrac{180^\\circ - \\text{vertex angle}}{2}$.' : 'Subtract both equal base angles from $180^\\circ$.'],
          solution: askBase
            ? [`$${nC}${nA} = ${nC}${nB}$, so the base angles at $${nA}$ and $${nB}$ are equal.`, `$2x + ${deg(apex)} = 180^\\circ$, so $2x = ${deg(180 - apex)}$.`, `$x = ${deg(base)}$`]
            : [`$${nC}${nA} = ${nC}${nB}$, so $\\angle ${nB} = \\angle ${nA} = ${deg(base)}$.`, `$x = 180^\\circ - 2(${deg(base)}) = ${deg(apex)}$`],
        };
      }
      const a = rng.intExcept(20, 70, [45]);
      const ang: [number, number, number] = [a, 90 - a, 90];
      return {
        prompt: `$\\triangle ${nA}${nB}${nC}$ has a right angle at $${nC}$. Find $x$.`,
        figure: triangleFigure({ angles: [ang[0], ang[1]], names, labels: [`${a}°`, 'x', null], right: 2, rot: rot === 180 ? 0 : rot, mirror }),
        parts: [numPart(90 - a, { label: '$x =$', suffix: '°' })],
        hints: [sumHint, 'The right angle uses $90^\\circ$, so the two acute angles add to $90^\\circ$.'],
        solution: [`${sumHint} The right angle is $90^\\circ$.`, `$x = 180^\\circ - 90^\\circ - ${deg(a)} = ${deg(90 - a)}$`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.65)) {
        const iso = rng.chance(0.35);
        const e = triExprs(rng, iso);
        const labels = e.k.map((k, i) => exprLabel(k, e.c[i]));
        const ask = iso ? 1 : e.v.indexOf(Math.max(...e.v));
        const ang: [number, number, number] = [e.v[0], e.v[1], e.v[2]];
        // Draw with the apex (vertex 0 when isosceles) at the top: reorder so vertices 1 and 2 are the base.
        const order = iso ? [1, 2, 0] : [0, 1, 2];
        const drawn = order.map((i) => ang[i]) as [number, number, number];
        const terms: Array<[number, number]> = e.k.map((k, i) => [k, e.c[i]]);
        return {
          prompt: iso
            ? `In $\\triangle ${nA}${nB}${nC}$, $${nC}${nA} = ${nC}${nB}$. Find $x$ and the measure of $\\angle ${nA}$.`
            : `Find $x$, then find the measure of the largest angle in the triangle.`,
          figure: triangleFigure({ angles: [drawn[0], drawn[1]], names, labels: order.map((i) => (iso && i === 2 ? null : labels[i])), ticks: iso ? [[2, 0, 1], [2, 1, 1]] : undefined, rot: rot === 180 ? 0 : rot, mirror }),
          parts: [numPart(e.x, { label: '$x =$' }), numPart(e.v[ask], { label: iso ? `$\\angle ${nA} =$` : 'Largest angle', suffix: '°' })],
          hints: iso ? ['The angles opposite the equal sides are equal, so the base angle that is not labelled has the same expression.', 'Add all three angles, set the sum equal to $180$ and solve.'] : [sumHint, 'Add the three expressions, set the sum equal to $180$ and solve for $x$. Then substitute.'],
          solution: [
            ...(iso ? [`$${nC}${nA} = ${nC}${nB}$, so $\\angle ${nA} = \\angle ${nB} = ${exprDeg(e.k[1], e.c[1])}$.`] : []),
            `$${terms.map(([k, c]) => (c === 0 ? coefX(k) : `(${linExpr(k, c)})`)).join(' + ')} = 180$`,
            ...solveSum(terms, 180),
            `Substitute $x = ${e.x}$: the angles are $${e.v.map((v) => deg(v)).join('$, $')}$ (check: they add to $180^\\circ$).`,
            iso ? `$x = ${e.x}$ and $\\angle ${nA} = ${deg(e.v[ask])}$` : `$x = ${e.x}$ and the largest angle is $${deg(e.v[ask])}$.`,
          ],
        };
      }
      // Isosceles in context.
      const who = rng.pick(NAMES);
      const ctx = rng.pick([
        { what: 'an A-frame cabin', peak: 'The two sloped roof rafters are equal in length and meet at the peak', base: 'the floor' },
        { what: 'a camping tent', peak: 'The two sloped sides of the tent are equal in length and meet at the top', base: 'the ground' },
        { what: 'a roof truss', peak: 'The two top chords of the truss are equal in length and meet at the peak', base: 'the bottom chord' },
      ]);
      const apex = rng.int(20, 50) * 2;
      const base = (180 - apex) / 2;
      const askBase = rng.chance(0.6);
      return {
        prompt: askBase
          ? `${who} is drawing plans for ${ctx.what}. ${ctx.peak} at an angle of $${deg(apex)}$. What angle does each side make with ${ctx.base}?`
          : `${who} is drawing plans for ${ctx.what}. ${ctx.peak}. Each side makes an angle of $${deg(base)}$ with ${ctx.base}. What is the angle at the top?`,
        parts: [numPart(askBase ? base : apex, { suffix: '°' })],
        hints: ['The two equal sides and the base form an isosceles triangle, so the two base angles are equal.', sumHint],
        solution: askBase
          ? ['The triangle is isosceles, so the two base angles are equal.', `$2b + ${deg(apex)} = 180^\\circ$, so $b = \\dfrac{180^\\circ - ${deg(apex)}}{2} = ${deg(base)}$`, `Each side makes an angle of $${deg(base)}$ with ${ctx.base}.`]
          : ['The triangle is isosceles, so both base angles are $' + deg(base) + '$.', `$180^\\circ - 2(${deg(base)}) = ${deg(apex)}$`, `The angle at the top is $${deg(apex)}$.`],
      };
    }
    // d3
    const kind = rng.pick(['midline', 'bowtie'] as const);
    if (kind === 'midline') {
      // Triangle with D on the first side and E on the second, DE parallel to the base.
      const [b, c] = triAngles(rng, 40, 75);
      const a = 180 - b - c;
      const nE = rng.pick(['E', 'G', 'H', 'V'].filter((l) => !names.includes(l) && l !== nD));
      const s = new Sketch();
      const [A, B, C] = (() => {
        const V = trianglePts(b, c, 7, 0, mirror);
        return [V[2], V[0], V[1]] as [P, P, P];
      })();
      const t = 0.5;
      const D: P = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
      const E: P = [A[0] + t * (C[0] - A[0]), A[1] + t * (C[1] - A[1])];
      s.polyline([A, B, C, A]).seg(D, E);
      s.chevrons(D, E).chevrons(B, C);
      for (const [p, q, r, n] of [[A, B, C, nA], [B, A, C, nB], [C, A, B, nC], [D, A, E, nD], [E, A, D, nE]] as Array<[P, P, P, string]>) {
        s.dot(p);
        s.vertexLabel(p, [dirTo(p, q), dirTo(p, r), ...(p === D ? [dirTo(D, B)] : p === E ? [dirTo(E, C)] : [])], n);
      }
      markAngle(s, A, B, C, `${a}°`);
      markAngle(s, D, A, E, `${b}°`);
      return {
        prompt: `In $\\triangle ${nA}${nB}${nC}$, $${nD}${nE} \\parallel ${nB}${nC}$. Find $\\angle ${nA}${nB}${nC}$, $\\angle ${nA}${nE}${nD}$ and $\\angle ${nA}${nC}${nB}$.`,
        figure: s.build({ margin: 0.7 }),
        parts: [
          numPart(b, { label: `$\\angle ${nA}${nB}${nC} =$`, suffix: '°' }),
          numPart(c, { label: `$\\angle ${nA}${nE}${nD} =$`, suffix: '°' }),
          numPart(c, { label: `$\\angle ${nA}${nC}${nB} =$`, suffix: '°' }),
        ],
        hints: [`$${nA}${nB}$ is a transversal of the parallel segments $${nD}${nE}$ and $${nB}${nC}$. Look for corresponding angles.`, `Use the angle sum in the small triangle $${nA}${nD}${nE}$.`],
        solution: [
          `$\\angle ${nA}${nB}${nC}$ and $\\angle ${nA}${nD}${nE}$ are corresponding angles (transversal $${nA}${nB}$), so $\\angle ${nA}${nB}${nC} = ${deg(b)}$.`,
          `In $\\triangle ${nA}${nD}${nE}$: $\\angle ${nA}${nE}${nD} = 180^\\circ - ${deg(a)} - ${deg(b)} = ${deg(c)}$.`,
          `$\\angle ${nA}${nC}${nB}$ and $\\angle ${nA}${nE}${nD}$ are corresponding angles (transversal $${nA}${nC}$), so $\\angle ${nA}${nC}${nB} = ${deg(c)}$.`,
          `$\\angle ${nA}${nB}${nC} = ${deg(b)}$, $\\angle ${nA}${nE}${nD} = ${deg(c)}$ and $\\angle ${nA}${nC}${nB} = ${deg(c)}$`,
        ],
      };
    }
    // Bowtie: segments AB and CD cross at E.
    const L = ['A', 'B', 'C', 'D', 'E'];
    const set = rng.pick([L, ['P', 'Q', 'R', 'S', 'T'], ['J', 'K', 'L', 'M', 'N'], ['F', 'G', 'H', 'J', 'K']]);
    const [pA, pB, pC, pD, pE] = set;
    // Keep both triangles free of obtuse angles so the labels sit clearly inside them.
    const e = rng.int(50, 80);
    const lo = Math.max(38, 180 - e - 85);
    const hi = Math.min(85, 180 - e - 38);
    const alpha = rng.int(lo, hi);
    const gamma = 180 - e - alpha;
    const beta = rng.intExcept(lo, hi, [alpha, gamma]);
    const delta = 180 - e - beta;
    const phi1 = rng.int(-15, 15);
    const s = new Sketch();
    const E: P = [0, 0];
    // A and B on line 1 (through E at direction phi1); C and D on line 2 (direction phi1 + e).
    const ea = 4;
    const ec = (ea * Math.sin(rad(alpha))) / Math.sin(rad(gamma));
    const eb = 4.2;
    const ed = (eb * Math.sin(rad(beta))) / Math.sin(rad(delta));
    const A = at(E, phi1 + 180, ea);
    const C = at(E, phi1 + 180 + e, ec);
    const B = at(E, phi1, eb);
    const D = at(E, phi1 + e, ed);
    s.seg(A, B).seg(C, D).seg(A, C).seg(B, D);
    for (const [p, q, r, n] of [[A, E, C, pA], [B, E, D, pB], [C, E, A, pC], [D, E, B, pD]] as Array<[P, P, P, string]>) nameVertex(s, p, q, r, n);
    s.dot(E);
    s.vertexLabel(E, [phi1, phi1 + 180, phi1 + e, phi1 + 180 + e], pE);
    markAngle(s, A, E, C, `${alpha}°`);
    markAngle(s, C, E, A, `${gamma}°`);
    markAngle(s, B, E, D, `${beta}°`);
    markAngle(s, D, E, B, 'x');
    return {
      prompt: `Segments $${pA}${pB}$ and $${pC}${pD}$ intersect at $${pE}$. Find $\\angle ${pA}${pE}${pC}$, $\\angle ${pB}${pE}${pD}$ and $x$.`,
      figure: s.build({ margin: 0.7 }),
      parts: [
        numPart(e, { label: `$\\angle ${pA}${pE}${pC} =$`, suffix: '°' }),
        numPart(e, { label: `$\\angle ${pB}${pE}${pD} =$`, suffix: '°' }),
        numPart(delta, { label: '$x =$', suffix: '°' }),
      ],
      hints: [`Start in $\\triangle ${pA}${pE}${pC}$, where you know two angles.`, `$\\angle ${pA}${pE}${pC}$ and $\\angle ${pB}${pE}${pD}$ are vertically opposite angles.`],
      solution: [
        `In $\\triangle ${pA}${pE}${pC}$: $\\angle ${pA}${pE}${pC} = 180^\\circ - ${deg(alpha)} - ${deg(gamma)} = ${deg(e)}$.`,
        `$\\angle ${pB}${pE}${pD}$ and $\\angle ${pA}${pE}${pC}$ are vertically opposite, so $\\angle ${pB}${pE}${pD} = ${deg(e)}$.`,
        `In $\\triangle ${pB}${pE}${pD}$: $x = 180^\\circ - ${deg(beta)} - ${deg(e)} = ${deg(delta)}$.`,
        `$\\angle ${pA}${pE}${pC} = \\angle ${pB}${pE}${pD} = ${deg(e)}$ and $x = ${deg(delta)}$`,
      ],
    };
  },
});

const exteriorAngle = skill({
  id: 'm202-exterior-angle',
  name: 'The exterior angle property',
  description: 'Use the fact that an exterior angle of a triangle equals the sum of the two non-adjacent interior angles.',
  outcomes: ['G1', 'G2'],
  lessonId: 'm202-2-2',
  gen(rng, d) {
    const [nA, nB, nC, nD] = rng.pick(TRI_LETTERS);
    const names = [nA, nB, nC];
    const mirror = rng.chance(0.5);
    const rot = rng.pick([0, 0, -10, 10]);
    const rule = 'An exterior angle of a triangle equals the sum of the two non-adjacent (remote) interior angles.';
    // Exterior angle at vertex 1 (B), extending side from vertex 0 (A) through B to D. Remote interior angles: A and C.
    if (d === 1) {
      const [a, b, c] = triAngles(rng, 30, 95);
      const ext = a + c;
      const findExt = rng.chance(0.6);
      const labels = findExt ? [`${a}°`, null, `${c}°`] : [`${a}°`, null, 'x'];
      return {
        prompt: findExt ? `Side $${nA}${nB}$ of $\\triangle ${nA}${nB}${nC}$ is extended to $${nD}$. Find the exterior angle $x$.` : `Side $${nA}${nB}$ of $\\triangle ${nA}${nB}${nC}$ is extended to $${nD}$. Find $x$.`,
        figure: triangleFigure({ angles: [a, b], names, labels, ext: [{ at: 1, from: 0, name: nD, label: findExt ? 'x' : `${ext}°` }], rot, mirror }),
        parts: [numPart(findExt ? ext : c, { label: '$x =$', suffix: '°' })],
        hints: ['Which two interior angles are not next to the exterior angle?', rule],
        solution: findExt
          ? [rule, `The remote interior angles are $${deg(a)}$ and $${deg(c)}$.`, `$x = ${deg(a)} + ${deg(c)} = ${deg(ext)}$`]
          : [rule, `$${deg(ext)} = ${deg(a)} + x$`, `$x = ${deg(ext)} - ${deg(a)} = ${deg(c)}$`],
      };
    }
    if (d === 2) {
      for (let i = 0; i < 400; i++) {
        const x = rng.int(8, 30);
        const k = [rng.int(1, 4), rng.int(1, 4)];
        const c = [rng.int(-4, 8) * 5, rng.int(-4, 8) * 5];
        const a = k[0] * x + c[0];
        const cc = k[1] * x + c[1];
        const ext = a + cc;
        if (a < 25 || cc < 25 || ext > 155) continue;
        const ke = rng.intExcept(1, 6, [k[0] + k[1]]);
        const ce = ext - ke * x;
        if (Math.abs(ce) > 60 || ce === 0) continue;
        const b = 180 - ext;
        const kk = k[0] + k[1];
        const cs = c[0] + c[1];
        return {
          prompt: `Side $${nA}${nB}$ of $\\triangle ${nA}${nB}${nC}$ is extended to $${nD}$. Find $x$, then find the measure of the exterior angle $\\angle ${nC}${nB}${nD}$.`,
          figure: triangleFigure({ angles: [a, b], names, labels: [exprLabel(k[0], c[0]), null, exprLabel(k[1], c[1])], ext: [{ at: 1, from: 0, name: nD, label: exprLabel(ke, ce) }], rot, mirror }),
          parts: [numPart(x, { label: '$x =$' }), numPart(ext, { label: `$\\angle ${nC}${nB}${nD} =$`, suffix: '°' })],
          hints: [rule, 'Write an equation: exterior angle = first remote angle + second remote angle. Then solve for $x$.'],
          solution: [
            rule,
            `$${linExpr(ke, ce)} = (${linExpr(k[0], c[0])}) + (${linExpr(k[1], c[1])})$`,
            `Collect like terms on the right: $${linExpr(ke, ce)} = ${linExpr(kk, cs)}$`,
            ...solveEqual(ke, ce, kk, cs),
            `Substitute: $\\angle ${nC}${nB}${nD} = ${subst(ke, ce, x)} = ${ext}$ (check: $${subst(k[0], c[0], x)} + ${subst(k[1], c[1], x)} = ${a} + ${cc} = ${ext}$).`,
            `$x = ${x}$ and $\\angle ${nC}${nB}${nD} = ${deg(ext)}$`,
          ],
        };
      }
      throw new Error('exterior d2');
    }
    // d3
    const kind = rng.pick(['three', 'iso', 'iso'] as const);
    if (kind === 'three') {
      // Exterior angles at all three vertices, one at each.
      const ang = triAngles(rng, 35, 90);
      const ex = ang.map((a) => 180 - a);
      const u = rng.int(0, 2);
      const extNames = rng.pick([['D', 'E', 'F'], ['S', 'T', 'U'], ['G', 'H', 'W']].filter((ns) => ns.every((n) => !names.includes(n))));
      const labels = ex.map((e, i) => (i === u ? 'x' : `${e}°`));
      const known = ex.filter((_, i) => i !== u);
      return {
        prompt: `Each side of $\\triangle ${nA}${nB}${nC}$ is extended to form one exterior angle at each vertex. Find the exterior angle $x$ and the interior angle of the triangle at the same vertex.`,
        figure: triangleFigure({
          angles: [ang[0], ang[1]],
          names,
          ext: [
            { at: 1, from: 0, name: extNames[1], label: labels[1] },
            { at: 2, from: 1, name: extNames[2], label: labels[2] },
            { at: 0, from: 2, name: extNames[0], label: labels[0] },
          ],
          rot,
          mirror,
        }),
        parts: [numPart(ex[u], { label: '$x =$', suffix: '°' }), numPart(ang[u], { label: `$\\angle ${names[u]} =$`, suffix: '°' })],
        hints: ['Each exterior angle and its interior angle form a straight angle.', 'The three exterior angles of a triangle (one at each vertex) add to $360^\\circ$.'],
        solution: [
          'The exterior angles, one at each vertex, add to $360^\\circ$ (each pair makes $180^\\circ$, and the interior angles use up $180^\\circ$ of the $3 \\times 180^\\circ = 540^\\circ$).',
          `$x = 360^\\circ - ${deg(known[0])} - ${deg(known[1])} = ${deg(ex[u])}$`,
          `The interior angle at $${names[u]}$ forms a straight angle with $x$: $180^\\circ - ${deg(ex[u])} = ${deg(ang[u])}$.`,
          `$x = ${deg(ex[u])}$ and $\\angle ${names[u]} = ${deg(ang[u])}$`,
        ],
      };
    }
    // Isosceles: CA = CB. Exterior angle at B (base) or at C (apex).
    const apex = rng.int(14, 50) * 2;
    const base = (180 - apex) / 2;
    if (rng.chance(0.5)) {
      // Exterior at base vertex B: equals apex + base.
      const ext = 180 - base;
      return {
        prompt: `In $\\triangle ${nA}${nB}${nC}$, $${nC}${nA} = ${nC}${nB}$. Side $${nA}${nB}$ is extended to $${nD}$, and the exterior angle $\\angle ${nC}${nB}${nD} = ${deg(ext)}$. Find $\\angle ${nA}$ and $\\angle ${nC}$.`,
        figure: triangleFigure({ angles: [base, base], names, labels: [null, null, null], ticks: [[2, 0, 1], [2, 1, 1]], ext: [{ at: 1, from: 0, name: nD, label: `${ext}°` }], rot, mirror }),
        parts: [numPart(base, { label: `$\\angle ${nA} =$`, suffix: '°' }), numPart(apex, { label: `$\\angle ${nC} =$`, suffix: '°' })],
        hints: [`$\\angle ${nA}${nB}${nC}$ and the exterior angle form a straight angle.`, `The triangle is isosceles, so $\\angle ${nA} = \\angle ${nA}${nB}${nC}$.`],
        solution: [
          `$\\angle ${nA}${nB}${nC} = 180^\\circ - ${deg(ext)} = ${deg(base)}$ (straight angle).`,
          `$${nC}${nA} = ${nC}${nB}$, so $\\angle ${nA} = \\angle ${nA}${nB}${nC} = ${deg(base)}$.`,
          `Exterior angle property: $${deg(ext)} = \\angle ${nA} + \\angle ${nC}$, so $\\angle ${nC} = ${deg(ext)} - ${deg(base)} = ${deg(apex)}$.`,
          `$\\angle ${nA} = ${deg(base)}$ and $\\angle ${nC} = ${deg(apex)}$`,
        ],
      };
    }
    // Exterior at the apex C (extend BC beyond C): equals 2 × base.
    const ext = 180 - apex;
    return {
      prompt: `In $\\triangle ${nA}${nB}${nC}$, $${nC}${nA} = ${nC}${nB}$. Side $${nB}${nC}$ is extended to $${nD}$, and the exterior angle $\\angle ${nA}${nC}${nD} = ${deg(ext)}$. Find $\\angle ${nA}$ and $\\angle ${nA}${nC}${nB}$.`,
      figure: triangleFigure({ angles: [base, base], names, labels: [null, null, null], ticks: [[2, 0, 1], [2, 1, 1]], ext: [{ at: 2, from: 1, name: nD, label: `${ext}°` }], rot, mirror }),
      parts: [numPart(base, { label: `$\\angle ${nA} =$`, suffix: '°' }), numPart(apex, { label: `$\\angle ${nA}${nC}${nB} =$`, suffix: '°' })],
      hints: [`The remote interior angles for the exterior angle at $${nC}$ are $\\angle ${nA}$ and $\\angle ${nB}$, and they are equal.`, `So each of them is half of the exterior angle.`],
      solution: [
        `Exterior angle property: $\\angle ${nA} + \\angle ${nB} = ${deg(ext)}$.`,
        `$${nC}${nA} = ${nC}${nB}$, so $\\angle ${nA} = \\angle ${nB}$, and each is $${deg(ext)} \\div 2 = ${deg(base)}$.`,
        `$\\angle ${nA}${nC}${nB} = 180^\\circ - ${deg(ext)} = ${deg(apex)}$ (straight angle).`,
        `$\\angle ${nA} = ${deg(base)}$ and $\\angle ${nA}${nC}${nB} = ${deg(apex)}$`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — Angle properties of polygons
// ---------------------------------------------------------------------------

const POLY: Record<number, string> = {
  3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon',
};
const polyName = (n: number) => POLY[n] ?? `${n}-sided polygon`;
const article = (w: string) => (/^[aeiou]/i.test(w) || /^8/.test(w) || /^1[18]-/.test(w) ? 'an' : 'a');

/** Vertices of a convex polygon with the given interior angles (sum 180(n-2)), or null if no nice shape was found. */
function polygonPts(rng: Rng, interior: number[]): P[] | null {
  const n = interior.length;
  const phi: number[] = [0];
  for (let i = 1; i < n; i++) phi.push(phi[i - 1] + (180 - interior[i]));
  const u = phi.map((p) => [Math.cos(rad(p)), Math.sin(rad(p))] as P);
  for (let tries = 0; tries < 200; tries++) {
    const L = Array.from({ length: n - 2 }, () => rng.float(2.4, 3.8, 2));
    const S: P = [0, 0];
    for (let i = 0; i < n - 2; i++) {
      S[0] += L[i] * u[i][0];
      S[1] += L[i] * u[i][1];
    }
    const [p, q] = [u[n - 2], u[n - 1]];
    const det = p[0] * q[1] - p[1] * q[0];
    if (Math.abs(det) < 1e-6) continue;
    const a = (-S[0] * q[1] + S[1] * q[0]) / det;
    const b = (-p[0] * S[1] + p[1] * S[0]) / det;
    if (a < 1.4 || b < 1.4 || a > 5 || b > 5) continue;
    const lens = [...L, a, b];
    const pts: P[] = [[0, 0]];
    for (let i = 0; i < n - 1; i++) pts.push(at(pts[i], phi[i], lens[i]));
    // Avoid long, flat shapes: they leave too little room for the angle labels.
    const w = Math.max(...pts.map((p) => p[0])) - Math.min(...pts.map((p) => p[0]));
    const h = Math.max(...pts.map((p) => p[1])) - Math.min(...pts.map((p) => p[1]));
    if (h / w < 0.65 || h / w > 1.5) continue;
    return pts;
  }
  return null;
}

function polygonFigure(pts: P[], labels: string[], names?: string[]): PlaneFigure {
  const s = new Sketch();
  s.polyline([...pts, pts[0]]);
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const u = pts[(i + n - 1) % n];
    const w = pts[(i + 1) % n];
    markAngle(s, pts[i], u, w, labels[i], { r: 0.42 });
    if (names) nameVertex(s, pts[i], u, w, names[i]);
  }
  return s.build({ margin: 0.6 });
}

/** Interior angles (whole numbers, convex) adding to 180(n - 2), with one possibly an expression. */
function polyAngles(rng: Rng, n: number): number[] {
  const total = 180 * (n - 2);
  const avg = total / n;
  for (;;) {
    const a = Array.from({ length: n - 1 }, () => rng.int(Math.max(70, Math.round(avg - 30)), Math.min(170, Math.round(avg + 30))));
    const last = total - a.reduce((s, v) => s + v, 0);
    if (last >= Math.max(70, avg - 35) && last <= Math.min(170, avg + 35)) return rng.shuffle([...a, last]);
  }
}

const REGULAR_N = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];

const polygonAngles = skill({
  id: 'm202-polygon-angles',
  name: 'Angles in polygons',
  description: 'Use the interior angle sum 180°(n − 2), and the interior and exterior angles of regular polygons, to find angles and the number of sides.',
  outcomes: ['G2'],
  lessonId: 'm202-2-3',
  gen(rng, d) {
    const sumRule = 'The interior angles of an $n$-sided convex polygon add to $180^\\circ(n - 2)$.';
    if (d === 1) {
      const kind = rng.pick(['sum', 'each', 'exterior'] as const);
      if (kind === 'sum') {
        const n = rng.pick([5, 6, 7, 8, 9, 10, 12]);
        const named = rng.chance(0.6);
        const nm = polyName(n);
        return {
          prompt: named ? `What is the sum of the interior angles of a convex ${nm}?` : `What is the sum of the interior angles of a convex polygon with $${n}$ sides?`,
          parts: [numPart(180 * (n - 2), { suffix: '°' })],
          hints: [named ? `A ${nm} has $${n}$ sides.` : 'Divide the polygon into triangles from one vertex. How many triangles?', sumRule],
          solution: [`${named ? `A ${nm} has $n = ${n}$ sides. ` : ''}${sumRule}`, `$180^\\circ(${n} - 2) = 180^\\circ(${n - 2}) = ${deg(180 * (n - 2))}$`, `The interior angles add to $${deg(180 * (n - 2))}$.`],
        };
      }
      const n = rng.pick([5, 6, 8, 9, 10, 12]);
      const nm = polyName(n);
      if (kind === 'each') {
        const each = (180 * (n - 2)) / n;
        return {
          prompt: `Find the measure of each interior angle of a regular ${nm}.`,
          parts: [numPart(each, { suffix: '°' })],
          hints: [`A regular polygon has all angles equal. First find the sum of the interior angles.`, `Each angle $= \\dfrac{180^\\circ(n - 2)}{n}$ with $n = ${n}$.`],
          solution: [`Sum: $180^\\circ(${n} - 2) = ${deg(180 * (n - 2))}$`, `The $${n}$ angles are equal: $${deg(180 * (n - 2))} \\div ${n} = ${deg(each)}$`, `Each interior angle measures $${deg(each)}$.`],
        };
      }
      const e = 360 / n;
      return {
        prompt: `Find the measure of each exterior angle of a regular ${nm}.`,
        parts: [numPart(e, { suffix: '°' })],
        hints: ['The exterior angles of any convex polygon, one at each vertex, add to $360^\\circ$.', `A regular ${nm} has $${n}$ equal exterior angles.`],
        solution: ['The exterior angles add to $360^\\circ$.', `$360^\\circ \\div ${n} = ${deg(e)}$`, `Each exterior angle measures $${deg(e)}$.`],
      };
    }
    if (d === 2) {
      const kind = rng.pick(['missing', 'missing', 'fromExt', 'fromInt', 'fromSum'] as const);
      if (kind === 'missing') {
        const n = rng.pick([5, 5, 6, 6, 6, 7]);
        for (;;) {
          const ang = polyAngles(rng, n);
          const pts = polygonPts(rng, ang);
          if (!pts) continue;
          const u = rng.int(0, n - 1);
          const labels = ang.map((a, i) => (i === u ? 'x' : `${a}°`));
          const known = ang.filter((_, i) => i !== u);
          const total = 180 * (n - 2);
          return {
            prompt: `Find $x$ in this convex ${polyName(n)}.`,
            figure: polygonFigure(pts, labels),
            parts: [numPart(ang[u], { label: '$x =$', suffix: '°' })],
            hints: [`Count the sides, then find the interior angle sum.`, sumRule],
            solution: [
              `The polygon has $${n}$ sides, so the angles add to $180^\\circ(${n} - 2) = ${deg(total)}$.`,
              `The known angles add to $${known.join(' + ')} = ${known.reduce((s, v) => s + v, 0)}$.`,
              `$x = ${deg(total)} - ${deg(known.reduce((s, v) => s + v, 0))} = ${deg(ang[u])}$`,
            ],
          };
        }
      }
      const n = rng.pick(REGULAR_N);
      const each = (180 * (n - 2)) / n;
      const e = 360 / n;
      if (kind === 'fromExt') {
        return {
          prompt: `Each exterior angle of a regular polygon measures $${deg(e)}$. How many sides does the polygon have?`,
          parts: [numPart(n, { suffix: 'sides' })],
          hints: ['The exterior angles of a convex polygon add to $360^\\circ$.', `Number of sides $= 360^\\circ \\div$ (each exterior angle).`],
          solution: ['The exterior angles add to $360^\\circ$ and are all equal.', `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `The polygon has $${n}$ sides.`],
        };
      }
      if (kind === 'fromInt') {
        return {
          prompt: `Each interior angle of a regular polygon measures $${deg(each)}$. How many sides does the polygon have?`,
          parts: [numPart(n, { suffix: 'sides' })],
          hints: ['Find each exterior angle first: an interior angle and its exterior angle form a straight angle.', 'Then divide $360^\\circ$ by the exterior angle.'],
          solution: [`Each exterior angle: $180^\\circ - ${deg(each)} = ${deg(e)}$`, `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `The polygon has $${n}$ sides.`],
        };
      }
      const m = rng.int(5, 16);
      const total = 180 * (m - 2);
      return {
        prompt: `The interior angles of a convex polygon add to $${deg(total)}$. How many sides does it have?`,
        parts: [numPart(m, { suffix: 'sides' })],
        hints: [sumRule, `Solve $180(n - 2) = ${total}$.`],
        solution: [`$180(n - 2) = ${total}$`, `$n - 2 = ${total} \\div 180 = ${m - 2}$`, `$n = ${m}$`, `The polygon has $${m}$ sides.`],
      };
    }
    // d3
    const kind = rng.pick(['algebra', 'ratio', 'join'] as const);
    if (kind === 'algebra') {
      const n = rng.pick([5, 6]);
      for (let tries = 0; tries < 500; tries++) {
        const ang = polyAngles(rng, n);
        const x = rng.int(15, 40);
        const k = ang.map(() => rng.int(1, 4));
        const c = ang.map((a, i) => a - k[i] * x);
        if (c.some((v) => Math.abs(v) > 90)) continue;
        // Keep some angles as plain numbers for readability.
        const keep = rng.sample([...ang.keys()], n - 3);
        const terms: Array<[number, number]> = [];
        const labels = ang.map((a, i) => {
          if (keep.includes(i)) return `${a}°`;
          terms.push([k[i], c[i]]);
          return exprLabel(k[i], c[i]);
        });
        if (terms.some(([kk, cc]) => cc === 0 && kk === 1) && terms.length < 2) continue;
        const pts = polygonPts(rng, ang);
        if (!pts) continue;
        const total = 180 * (n - 2);
        const known = keep.map((i) => ang[i]);
        const knownSum = known.reduce((s, v) => s + v, 0);
        const largest = Math.max(...ang);
        return {
          prompt: `Find $x$ in this convex ${polyName(n)}, then find its largest interior angle.`,
          figure: polygonFigure(pts, labels),
          parts: [numPart(x, { label: '$x =$' }), numPart(largest, { label: 'Largest angle', suffix: '°' })],
          hints: [sumRule, 'Add all the angles, set the sum equal to the angle sum for this polygon, and solve for $x$. Then substitute to find every angle.'],
          solution: [
            `The angles of a ${polyName(n)} add to $180^\\circ(${n} - 2) = ${deg(total)}$.`,
            `$${[...known.map(String), ...terms.map(([kk, cc]) => (cc === 0 ? coefX(kk) : `(${linExpr(kk, cc)})`))].join(' + ')} = ${total}$`,
            ...solveSum([[0, knownSum], ...terms], total),
            `Substitute $x = ${x}$: the angles are $${ang.map((a) => deg(a)).join('$, $')}$ (check: they add to $${deg(total)}$).`,
            `$x = ${x}$ and the largest angle is $${deg(largest)}$.`,
          ],
        };
      }
      throw new Error('polygon algebra');
    }
    if (kind === 'ratio') {
      const k = rng.pick([2, 3, 4, 5, 8, 9]);
      const e = 180 / (k + 1);
      const n = 360 / e;
      const nm = polyName(n);
      return {
        prompt: `Each interior angle of a regular polygon is $${k}$ times as large as each exterior angle. How many sides does the polygon have, and what is each interior angle?`,
        parts: [numPart(n, { label: 'Number of sides' }), numPart(k * e, { label: 'Each interior angle', suffix: '°' })],
        hints: ['At each vertex, the interior angle and the exterior angle form a straight angle: $i + e = 180^\\circ$.', `Write $i = ${k}e$ and substitute into $i + e = 180^\\circ$.`],
        solution: [`$${k}e + e = 180^\\circ$, so $${k + 1}e = 180^\\circ$ and $e = ${deg(e)}$.`, `$n = 360^\\circ \\div ${deg(e)} = ${n}$`, `Each interior angle: $${k} \\times ${deg(e)} = ${deg(k * e)}$`, `The polygon has $${n}$ sides (${article(nm)} ${nm}) and each interior angle is $${deg(k * e)}$.`],
      };
    }
    // Two regular polygons share a side; find the gap angle at a shared vertex.
    const pairs: Array<[number, number]> = [[4, 5], [4, 6], [5, 6], [3, 8], [4, 8], [5, 8], [6, 8], [3, 10], [5, 10], [6, 12], [4, 12]];
    const [n1, n2] = rng.pick(pairs);
    const i1 = (180 * (n1 - 2)) / n1;
    const i2 = (180 * (n2 - 2)) / n2;
    const gap = 360 - i1 - i2;
    const who = rng.pick(NAMES);
    const nm1 = polyName(n1);
    const nm2 = polyName(n2);
    const thing = rng.pick(['tiles', 'panels of stained glass', 'paving stones']);
    return {
      prompt: `${who} sets two ${thing} side by side: a regular ${nm1} and a regular ${nm2} that share one full side. At one end of the shared side, what angle is left in the gap between them (going the rest of the way around the point)?`,
      parts: [numPart(gap, { suffix: '°' })],
      hints: ['Find each interior angle of each regular polygon.', 'The angles around a point add to $360^\\circ$.'],
      solution: [
        `Regular ${nm1}: $\\dfrac{180^\\circ(${n1} - 2)}{${n1}} = ${deg(fmt(i1, 2))}$`,
        `Regular ${nm2}: $\\dfrac{180^\\circ(${n2} - 2)}{${n2}} = ${deg(fmt(i2, 2))}$`,
        `Angles around a point: $360^\\circ - ${deg(fmt(i1, 2))} - ${deg(fmt(i2, 2))} = ${deg(gap)}$`,
        `The gap is $${deg(gap)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.4 — Congruent triangles
// ---------------------------------------------------------------------------

type Case = 'SSS' | 'SAS' | 'ASA' | 'SSA' | 'AAA';
const CONG_CHOICES = ['SSS', 'SAS', 'ASA', 'Not enough information'];
const caseAnswer = (c: Case) => (c === 'SSA' || c === 'AAA' ? 3 : CONG_CHOICES.indexOf(c));

/** A triangle (vertices 0, 1, 2) from its angle at 0, angle at 1, and side 01. */
function triFromASA(a0: number, a1: number, c: number): P[] {
  const b = (c * Math.sin(rad(a1))) / Math.sin(rad(a0 + a1));
  return [[0, 0], [c, 0], at([0, 0], a0, b)];
}

const angleAt = (T: P[], i: number) => {
  const [a0, a1] = wedge(T[i], T[(i + 1) % 3], T[(i + 2) % 3]);
  return a1 - a0;
};

function placeTri(T: P[], scale: number, rot: number, mirror: boolean, dx: number): P[] {
  const c: P = [(T[0][0] + T[1][0] + T[2][0]) / 3, (T[0][1] + T[1][1] + T[2][1]) / 3];
  return T.map(([x, y]) => {
    let px = (x - c[0]) * scale;
    const py = (y - c[1]) * scale;
    if (mirror) px = -px;
    return [px * Math.cos(rad(rot)) - py * Math.sin(rad(rot)) + dx, px * Math.sin(rad(rot)) + py * Math.cos(rad(rot))] as P;
  });
}

interface TriMarks {
  sides?: Array<[number, number, string]>;
  angles?: Array<[number, string]>;
}

function drawTri(s: Sketch, T: P[], names: string[], marks: TriMarks) {
  s.polyline([T[0], T[1], T[2], T[0]]);
  const cx = (T[0][0] + T[1][0] + T[2][0]) / 3;
  const cy = (T[0][1] + T[1][1] + T[2][1]) / 3;
  for (const [i, j, lab] of marks.sides ?? []) {
    const m = mid(T[i], T[j]);
    s.endLabel(m, dirTo([cx, cy], m), lab);
  }
  for (const [i, lab] of marks.angles ?? []) markAngle(s, T[i], T[(i + 1) % 3], T[(i + 2) % 3], lab, { r: 0.42 });
  for (let i = 0; i < 3; i++) {
    s.dot(T[i]);
    s.vertexLabel(T[i], [dirTo(T[i], T[(i + 1) % 3]), dirTo(T[i], T[(i + 2) % 3])], names[i]);
  }
}

const sideName = (n: string[], i: number, j: number) => `${n[i]}${n[j]}`;

/** Build two triangles for a congruence case, with measures shown. */
function congruenceCase(rng: Rng, kase: Case) {
  let T1: P[];
  let T2: P[];
  let marks: TriMarks;
  const r1 = (x: number) => Math.round(x * 10) / 10;
  if (kase === 'SSA') {
    for (;;) {
      const alpha = rng.int(6, 10) * 5;
      const c = rng.int(7, 11);
      const h = c * Math.sin(rad(alpha));
      const a = rng.int(Math.ceil(h + 0.6), Math.floor(c - 0.6));
      if (a <= h + 0.5 || a >= c - 0.5) continue;
      const root = Math.sqrt(a * a - h * h);
      const b1 = c * Math.cos(rad(alpha)) + root;
      const b2 = c * Math.cos(rad(alpha)) - root;
      if (b2 < 2) continue;
      T1 = [[0, 0], [c, 0], at([0, 0], alpha, b1)];
      T2 = [[0, 0], [c, 0], at([0, 0], alpha, b2)];
      marks = { sides: [[0, 1, `${c}`], [1, 2, `${a}`]], angles: [[0, `${alpha}°`]] };
      break;
    }
  } else {
    const [a0, a1] = triAngles(rng, 35, 95);
    const c = rng.int(6, 12);
    T1 = triFromASA(a0, a1, c);
    if (kase === 'AAA') {
      T2 = T1.map(([x, y]) => [x * 1.4, y * 1.4] as P);
      const A = [0, 1, 2].map((i) => Math.round(angleAt(T1, i)));
      marks = { angles: [[0, `${A[0]}°`], [1, `${A[1]}°`], [2, `${180 - A[0] - A[1]}°`]] };
    } else {
      T2 = T1;
      if (kase === 'SSS') marks = { sides: [[0, 1, `${c}`], [1, 2, `${r1(dist(T1[1], T1[2]))}`], [2, 0, `${r1(dist(T1[2], T1[0]))}`]] };
      else if (kase === 'SAS') marks = { sides: [[0, 1, `${c}`], [2, 0, `${r1(dist(T1[2], T1[0]))}`]], angles: [[0, `${a0}°`]] };
      else marks = { sides: [[0, 1, `${c}`]], angles: [[0, `${a0}°`], [1, `${a1}°`]] };
    }
  }
  return { T1: T1!, T2: T2!, marks: marks! };
}

const CONG_NAMES: Array<[string[], string[]]> = [
  [['A', 'B', 'C'], ['D', 'E', 'F']],
  [['P', 'Q', 'R'], ['X', 'Y', 'Z']],
  [['J', 'K', 'L'], ['M', 'N', 'O']],
  [['R', 'S', 'T'], ['U', 'V', 'W']],
];

/** Two-column congruence proofs with a figure. Template letters A–E are replaced by a random letter set. */
interface ProofTemplate {
  given: string;
  prove: string;
  /** `wrong`: statements that are not justified at that step (offered when the statement is hidden). */
  rows: Array<{ st: string; reason: string; wrong?: string[] }>;
  draw: (s: Sketch, L: Record<string, string>) => void;
}

const lab = (s: Sketch, p: P, q: P, r: P, name: string) => nameVertex(s, p, q, r, name);

const CONG_PROOFS: ProofTemplate[] = [
  {
    given: '$AB = AD$ and $CB = CD$',
    prove: '$\\triangle ABC \\cong \\triangle ADC$',
    rows: [
      { st: '$AB = AD$', reason: 'Given' },
      { st: '$CB = CD$', reason: 'Given' },
      { st: '$AC = AC$', reason: 'Common side', wrong: ['$BD = BD$', '$AB = CD$', '$AD = CB$'] },
      { st: '$\\triangle ABC \\cong \\triangle ADC$', reason: 'SSS' },
    ],
    draw(s, L) {
      const A: P = [0, 3.2];
      const B: P = [-2.4, 0.4];
      const C: P = [0, -2.6];
      const D: P = [2.4, 0.4];
      s.polyline([A, B, C, D, A]).seg(A, C);
      s.ticks(A, B, 1).ticks(A, D, 1).ticks(C, B, 2).ticks(C, D, 2);
      lab(s, A, B, D, L.A);
      lab(s, B, A, C, L.B);
      lab(s, C, B, D, L.C);
      lab(s, D, A, C, L.D);
    },
  },
  {
    given: '$E$ is the midpoint of $AC$ and of $BD$',
    prove: '$\\triangle AEB \\cong \\triangle CED$',
    rows: [
      { st: '$AE = CE$', reason: 'Definition of midpoint' },
      { st: '$BE = DE$', reason: 'Definition of midpoint' },
      { st: '$\\angle AEB = \\angle CED$', reason: 'Vertically opposite angles are equal', wrong: ['$\\angle AEB = \\angle BEC$', '$\\angle AEB = \\angle AED$', '$\\angle BAE = \\angle DEC$'] },
      { st: '$\\triangle AEB \\cong \\triangle CED$', reason: 'SAS' },
    ],
    draw(s, L) {
      const E: P = [0, 0];
      const A: P = [-3.2, 1.4];
      const C: P = [3.2, -1.4];
      const B: P = [-1.8, -2.2];
      const D: P = [1.8, 2.2];
      s.seg(A, C).seg(B, D).seg(A, B).seg(C, D);
      s.ticks(A, E, 1).ticks(E, C, 1).ticks(B, E, 2).ticks(E, D, 2);
      lab(s, A, E, B, L.A);
      lab(s, B, E, A, L.B);
      lab(s, C, E, D, L.C);
      lab(s, D, E, C, L.D);
      s.dot(E);
      s.vertexLabel(E, [dirTo(E, A), dirTo(E, B), dirTo(E, C), dirTo(E, D)], L.E);
    },
  },
  {
    given: '$AB \\parallel CD$, and $E$ is the midpoint of $AD$',
    prove: '$\\triangle ABE \\cong \\triangle DCE$',
    rows: [
      { st: '$AE = DE$', reason: 'Definition of midpoint' },
      { st: '$\\angle BAE = \\angle CDE$', reason: 'Alternate interior angles are equal', wrong: ['$\\angle BAE = \\angle DCE$', '$\\angle ABE = \\angle CDE$', '$\\angle BAE = \\angle BEA$'] },
      { st: '$\\angle AEB = \\angle DEC$', reason: 'Vertically opposite angles are equal' },
      { st: '$\\triangle ABE \\cong \\triangle DCE$', reason: 'ASA' },
    ],
    draw(s, L) {
      const E: P = [0, 0];
      const A: P = [-3.2, 1.5];
      const D: P = [3.2, -1.5];
      const B: P = [-2.2, -2.1];
      const C: P = [2.2, 2.1];
      s.seg(A, D).seg(B, C).seg(A, B).seg(C, D);
      s.ticks(A, E, 1).ticks(E, D, 1);
      s.chevrons(B, A).chevrons(D, C);
      lab(s, A, E, B, L.A);
      lab(s, B, E, A, L.B);
      lab(s, C, E, D, L.C);
      lab(s, D, E, C, L.D);
      s.dot(E);
      s.vertexLabel(E, [dirTo(E, A), dirTo(E, B), dirTo(E, C), dirTo(E, D)], L.E);
    },
  },
  {
    given: '$BD \\perp AC$, and $D$ is the midpoint of $AC$',
    prove: '$\\triangle ABD \\cong \\triangle CBD$',
    rows: [
      { st: '$AD = CD$', reason: 'Definition of midpoint' },
      { st: '$\\angle ADB = \\angle CDB = 90^\\circ$', reason: 'Definition of perpendicular' },
      { st: '$BD = BD$', reason: 'Common side', wrong: ['$AD = AD$', '$AC = AC$', '$AB = AD$'] },
      { st: '$\\triangle ABD \\cong \\triangle CBD$', reason: 'SAS' },
    ],
    draw(s, L) {
      const A: P = [-3.2, 0];
      const C: P = [3.2, 0];
      const B: P = [0, 4];
      const D: P = [0, 0];
      s.polyline([A, B, C, A]).seg(B, D);
      s.rightMark(D, 0, 0.4);
      s.ticks(A, D, 1).ticks(D, C, 1);
      lab(s, A, B, C, L.A);
      lab(s, B, A, C, L.B);
      lab(s, C, A, B, L.C);
      s.dot(D);
      s.vertexLabel(D, [0, 90, 180], L.D);
    },
  },
  {
    given: '$AC$ bisects $\\angle BAD$ and $\\angle BCD$',
    prove: '$\\triangle ABC \\cong \\triangle ADC$',
    rows: [
      { st: '$\\angle BAC = \\angle DAC$', reason: 'Definition of angle bisector' },
      { st: '$AC = AC$', reason: 'Common side', wrong: ['$BD = BD$', '$AB = CD$', '$BC = AD$'] },
      { st: '$\\angle BCA = \\angle DCA$', reason: 'Definition of angle bisector' },
      { st: '$\\triangle ABC \\cong \\triangle ADC$', reason: 'ASA' },
    ],
    draw(s, L) {
      const A: P = [-3.4, 0];
      const C: P = [3, 0];
      const B: P = [0.6, 2.4];
      const D: P = [0.6, -2.4];
      s.polyline([A, B, C, D, A]).seg(A, C);
      s.arc(A, 0.9, 0, dirTo(A, B)).arc(A, 0.9, dirTo(A, D), 360);
      for (const r of [0.7, 0.86]) s.arc(C, r, dirTo(C, B), 180).arc(C, r, 180, dirTo(C, D));
      lab(s, A, B, D, L.A);
      lab(s, B, A, C, L.B);
      lab(s, C, B, D, L.C);
      lab(s, D, A, C, L.D);
    },
  },
];

const CONG_REASONS = [
  'Given',
  'Common side',
  'Definition of midpoint',
  'Vertically opposite angles are equal',
  'Alternate interior angles are equal',
  'Definition of angle bisector',
  'Definition of perpendicular',
];

const relabel = (text: string, L: Record<string, string>) => text.replace(/[A-E]/g, (ch) => L[ch] ?? ch);

const congruence = skill({
  id: 'm202-congruence',
  name: 'Congruent triangles',
  description: 'Decide whether two triangles are congruent by SSS, SAS or ASA (or whether there is not enough information), and complete a congruence proof.',
  outcomes: ['G1'],
  lessonId: 'm202-2-4',
  format: 'mc',
  gen(rng, d): GenOutput {
    const conds = 'SSS: three pairs of equal sides. SAS: two pairs of equal sides and the angles **between** them. ASA: two pairs of equal angles and the sides **between** them.';
    if (d === 1) {
      const kase = rng.pick(['SSS', 'SAS', 'ASA', 'SSS', 'SAS', 'ASA', 'SSA', 'AAA'] as Case[]);
      const [n1, n2] = rng.pick(CONG_NAMES);
      const { T1, T2, marks } = congruenceCase(rng, kase);
      const extent = (T: P[]) => Math.max(Math.max(...T.map((p) => p[0])) - Math.min(...T.map((p) => p[0])), Math.max(...T.map((p) => p[1])) - Math.min(...T.map((p) => p[1])));
      const scale = 4.4 / Math.max(extent(T1), extent(T2));
      const P1 = placeTri(T1, scale, rng.int(-15, 15), false, 0);
      const P2a = placeTri(T2, scale, rng.pick([0, 180, 160, 200, 20, -20]), rng.chance(0.5), 0);
      const shift = Math.max(...P1.map((p) => p[0])) - Math.min(...P2a.map((p) => p[0])) + 2.2;
      const P2 = P2a.map(([x, y]) => [x + shift, y] as P);
      const s = new Sketch();
      drawTri(s, P1, n1, marks);
      drawTri(s, P2, n2, marks);
      const ans = caseAnswer(kase);
      const tri1 = `\\triangle ${n1.join('')}`;
      const tri2 = `\\triangle ${n2.join('')}`;
      const why: Record<Case, string> = {
        SSS: 'All three pairs of corresponding sides are equal.',
        SAS: `Two pairs of sides are equal, and the equal angles ($\\angle ${n1[0]}$ and $\\angle ${n2[0]}$) are the angles between those sides.`,
        ASA: `Two pairs of angles are equal, and the equal sides ($${sideName(n1, 0, 1)}$ and $${sideName(n2, 0, 1)}$) are the sides between those angles.`,
        SSA: `Two pairs of sides and one pair of angles are equal, but the angle is **not** between the two sides. The triangles in the diagram show that two different triangles fit this information.`,
        AAA: 'All three pairs of angles are equal, but no sides are given. The triangles have the same shape but can be different sizes, as the diagram shows.',
      };
      return {
        prompt: `Lengths are in centimetres. Can you conclude that $${tri1} \\cong ${tri2}$? If so, which condition proves it? (The vertices are listed in corresponding order.)`,
        figure: s.build({ margin: 0.8 }),
        parts: [{ answer: fixedChoice(CONG_CHOICES, ans) }],
        hints: ['List the pairs of equal sides and equal angles shown.', conds],
        solution: [why[kase], ans === 3 ? 'There is not enough information to conclude that the triangles are congruent.' : `$${tri1} \\cong ${tri2}$ by ${CONG_CHOICES[ans]}.`],
        answerDisplay: CONG_CHOICES[ans],
      };
    }
    const [n1, n2] = rng.pick(CONG_NAMES);
    const S = (n: string[], i: number, j: number) => (rng.chance(0.3) ? `${n[j]}${n[i]}` : `${n[i]}${n[j]}`);
    const Ang = (n: string[], i: number) => `\\angle ${n[i]}`;
    const tri1 = `\\triangle ${n1.join('')}`;
    const tri2 = `\\triangle ${n2.join('')}`;
    if (d === 2) {
      if (rng.chance(0.55)) {
        const kase = rng.pick(['SSS', 'SAS', 'ASA', 'SAS', 'ASA', 'SSA', 'AAA'] as Case[]);
        const k = rng.int(0, 2);
        const i = (k + 1) % 3;
        const j = (k + 2) % 3;
        let facts: string[];
        let why: string;
        if (kase === 'SSS') {
          facts = [[0, 1], [1, 2], [2, 0]].map(([p, q]) => `$${S(n1, p, q)} = ${S(n2, p, q)}$`);
          why = 'Three pairs of corresponding sides are equal: SSS.';
        } else if (kase === 'SAS') {
          facts = [`$${S(n1, k, i)} = ${S(n2, k, i)}$`, `$${Ang(n1, k)} = ${Ang(n2, k)}$`, `$${S(n1, k, j)} = ${S(n2, k, j)}$`];
          why = `$${Ang(n1, k)}$ is between sides $${n1[k]}${n1[i]}$ and $${n1[k]}${n1[j]}$, so this is SAS.`;
        } else if (kase === 'ASA') {
          facts = [`$${Ang(n1, i)} = ${Ang(n2, i)}$`, `$${S(n1, i, j)} = ${S(n2, i, j)}$`, `$${Ang(n1, j)} = ${Ang(n2, j)}$`];
          why = `Side $${n1[i]}${n1[j]}$ is between $${Ang(n1, i)}$ and $${Ang(n1, j)}$, so this is ASA.`;
        } else if (kase === 'SSA') {
          facts = [`$${S(n1, k, i)} = ${S(n2, k, i)}$`, `$${S(n1, k, j)} = ${S(n2, k, j)}$`, `$${Ang(n1, i)} = ${Ang(n2, i)}$`];
          why = `The angle between $${n1[k]}${n1[i]}$ and $${n1[k]}${n1[j]}$ is $${Ang(n1, k)}$, but the equal angle given is $${Ang(n1, i)}$, which is not between them. Side-side-angle does not prove congruence.`;
        } else {
          facts = [0, 1, 2].map((p) => `$${Ang(n1, p)} = ${Ang(n2, p)}$`);
          why = 'Three pairs of equal angles show the triangles have the same shape, but they can be different sizes. Angle-angle-angle does not prove congruence.';
        }
        const ans = caseAnswer(kase);
        const shown = rng.shuffle(facts);
        return {
          prompt: `In $${tri1}$ and $${tri2}$, you know that ${shown.slice(0, 2).join(', ')} and ${shown[2]}. Which condition proves $${tri1} \\cong ${tri2}$?`,
          parts: [{ answer: fixedChoice(CONG_CHOICES, ans) }],
          hints: ['Sketch the two triangles and mark the equal parts.', conds],
          solution: [why, ans === 3 ? 'There is not enough information to conclude that the triangles are congruent.' : `$${tri1} \\cong ${tri2}$ by ${CONG_CHOICES[ans]}.`],
          answerDisplay: CONG_CHOICES[ans],
        };
      }
      // Which extra fact is needed?
      const target = rng.pick(['SAS', 'ASA'] as const);
      const k = rng.int(0, 2);
      const i = (k + 1) % 3;
      const j = (k + 2) % 3;
      if (target === 'SAS') {
        const known = [`$${S(n1, k, i)} = ${S(n2, k, i)}$`, `$${S(n1, k, j)} = ${S(n2, k, j)}$`];
        const correct = `$${Ang(n1, k)} = ${Ang(n2, k)}$`;
        const ds = [`$${Ang(n1, i)} = ${Ang(n2, i)}$`, `$${Ang(n1, j)} = ${Ang(n2, j)}$`, `$${S(n1, i, j)} = ${S(n2, i, j)}$`];
        return {
          prompt: `In $${tri1}$ and $${tri2}$, ${known[0]} and ${known[1]}. Which additional fact would prove $${tri1} \\cong ${tri2}$ by **SAS**?`,
          parts: [{ answer: mc(rng, correct, ds) }],
          hints: ['SAS needs the angle **between** the two pairs of equal sides.', `Which vertex do sides $${n1[k]}${n1[i]}$ and $${n1[k]}${n1[j]}$ share?`],
          solution: [
            `Sides $${n1[k]}${n1[i]}$ and $${n1[k]}${n1[j]}$ meet at $${n1[k]}$, so the included angle is $${Ang(n1, k)}$.`,
            `$${S(n1, i, j)} = ${S(n2, i, j)}$ would prove congruence by SSS, not SAS. The other angles are not between the equal sides.`,
            `The fact needed is ${correct}.`,
          ],
          answerDisplay: correct,
        };
      }
      const known = [`$${Ang(n1, i)} = ${Ang(n2, i)}$`, `$${S(n1, i, j)} = ${S(n2, i, j)}$`];
      const correct = `$${Ang(n1, j)} = ${Ang(n2, j)}$`;
      const ds = [`$${S(n1, i, k)} = ${S(n2, i, k)}$`, `$${S(n1, j, k)} = ${S(n2, j, k)}$`, 'No additional fact is needed.'];
      return {
        prompt: `In $${tri1}$ and $${tri2}$, ${known[0]} and ${known[1]}. Which additional fact would prove $${tri1} \\cong ${tri2}$ by **ASA**?`,
        parts: [{ answer: mc(rng, correct, ds) }],
        hints: ['ASA needs two angles with the equal side **between** them.', `Side $${n1[i]}${n1[j]}$ joins $${n1[i]}$ and $${n1[j]}$. Which angle is still missing?`],
        solution: [
          `Side $${n1[i]}${n1[j]}$ is between the angles at $${n1[i]}$ and $${n1[j]}$. You already have $${Ang(n1, i)}$.`,
          `$${S(n1, i, k)} = ${S(n2, i, k)}$ would give SAS, not ASA. $${S(n1, j, k)} = ${S(n2, j, k)}$ gives a side-side-angle pattern, which proves nothing. One angle and one side are not enough on their own.`,
          `The fact needed is ${correct}.`,
        ],
        answerDisplay: correct,
      };
    }
    // d3: two-column proof with one missing reason or statement.
    const tpl = rng.pick(CONG_PROOFS);
    const letters = rng.pick([['A', 'B', 'C', 'D', 'E'], ['P', 'Q', 'R', 'S', 'T'], ['J', 'K', 'L', 'M', 'N'], ['W', 'X', 'Y', 'Z', 'V'], ['F', 'G', 'H', 'K', 'M']]);
    const L: Record<string, string> = Object.fromEntries(['A', 'B', 'C', 'D', 'E'].map((ch, i) => [ch, letters[i]]));
    const rows = tpl.rows.map((r) => ({ st: relabel(r.st, L), reason: r.reason, wrong: r.wrong?.map((w) => relabel(w, L)) }));
    const s = new Sketch();
    tpl.draw(s, L);
    const statementRow = rows.findIndex((r) => r.wrong);
    const hideStatement = rng.chance(0.35);
    const hide = hideStatement ? statementRow : rng.int(0, 3);
    let correct: string;
    let ds: string[];
    if (hideStatement) {
      correct = rows[hide].st;
      ds = rows[hide].wrong!;
    } else {
      correct = rows[hide].reason;
      // "Given" is left out of the distractors: a midpoint or bisector fact could loosely be called given.
      ds = hide === 3 ? ['SSS', 'SAS', 'ASA', 'Not enough information'].filter((r) => r !== correct).slice(0, 3) : rng.shuffle(CONG_REASONS.filter((r) => r !== 'Given' && r !== correct && !rows.some((x) => x.reason === r))).slice(0, 3);
    }
    return {
      prompt: `Given: ${relabel(tpl.given, L)}. Prove: ${relabel(tpl.prove, L)}.\n\n${proofTable(rows, hide, hideStatement)}\n\nWhich ${hideStatement ? 'statement' : 'reason'} is missing?`,
      figure: s.build({ margin: 0.7 }),
      parts: [{ answer: mc(rng, correct, ds) }],
      hints: ['Mark the given information on the diagram.', `To prove the triangles congruent you need three matching parts. ${conds}`],
      solution: [...rows.map((r, i) => `Step ${i + 1}: ${r.st} — ${r.reason}.`), `The missing ${hideStatement ? 'statement' : 'reason'} in step ${hide + 1} is ${hideStatement ? correct : `"${correct}"`}.`],
      answerDisplay: correct,
    };
  },
});

export const ANGLE_SKILLS: SkillDef[] = [parallelAngles, parallelProofSkill, triangleAngles, exteriorAngle, polygonAngles, congruence];

/** Figure builders, exported so lesson diagrams can be generated the same way. */
export { transversalFigure, zigzagFigure, betweenFigure, triangleFigure, polygonPts, polygonFigure };
