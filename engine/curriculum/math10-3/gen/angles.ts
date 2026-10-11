/** Math 10-3 Unit 6 — Angles, Parallel Lines and Puzzles (G1, G5, G6). */
import { fixedChoice, mc, mcFigures, numPart, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Figure, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
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
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;

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

/** Worked steps for (k1 x + c1) + (k2 x + c2) = total. */
function solveSum(k1: number, c1: number, k2: number, c2: number, total: number): string[] {
  const k = k1 + k2;
  const c = c1 + c2;
  const steps = [`Collect like terms: $${coefX(k)}${signed(c)} = ${total}$`];
  if (c !== 0) steps.push(`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$ ${c > 0 ? 'from' : 'to'} both sides: $${coefX(k)} = ${total - c}$`);
  if (k !== 1) steps.push(`Divide both sides by $${k}$: $x = ${fmt((total - c) / k)}$`);
  return steps;
}

// ---------------------------------------------------------------------------
// Figure helpers: angles drawn on a hidden-label coordinate plane
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const norm360 = (a: number) => ((a % 360) + 360) % 360;
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
 * Collects rays, arcs and labels, then lays the figure out on a plane with no tick labels.
 * Labels are drawn with invisible anchor points (open + muted), and each label is placed where it
 * stays clear of every drawn line, so numbered angles never sit on top of a ray.
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

const LETTERS: Array<[string, string, string]> = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['D', 'E', 'F'],
  ['X', 'Y', 'Z'],
  ['L', 'M', 'N'],
  ['J', 'K', 'L'],
  ['S', 'T', 'U'],
  ['G', 'H', 'I'],
];

/**
 * One angle at vertex V between ray 1 (direction `base`) and ray 2 (direction base + m, counterclockwise).
 * `mark` puts an arc (or a square for 90°) on the counterclockwise region from ray 1 to ray 2.
 */
function angleFigure(o: {
  base: number;
  m: number;
  names?: [string, string, string];
  mark?: boolean;
  markLabel?: string;
  otherLabel?: string;
  otherArc?: boolean;
}): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  const L = 4;
  const a2 = o.base + o.m;
  s.ray(V, o.base, L).ray(V, a2, L);
  if (o.mark ?? true) {
    if (o.m === 90) s.rightMark(V, o.base, 0.5);
    else s.arc(V, o.m > 180 ? 0.65 : 0.8, o.base, a2);
  }
  if (o.otherArc) s.arc(V, 0.55, a2, o.base + 360, 'muted');
  if (o.markLabel) s.angleLabel(V, o.base, a2, o.markLabel, 30);
  if (o.otherLabel) s.angleLabel(V, a2, o.base + 360, o.otherLabel, 30);
  if (o.names) {
    const [n1, nv, n2] = o.names;
    const e1 = at(V, o.base, L * 0.82);
    const e2 = at(V, a2, L * 0.82);
    s.dot(V).dot(e1).dot(e2);
    s.vertexLabel(V, [o.base, a2], nv).endLabel(e1, o.base + 90, n1).endLabel(e2, a2 - 90, n2);
  }
  return s.build();
}

// ---------------------------------------------------------------------------
// Lesson 6.1 — Classifying and measuring angles
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

const TYPE_RULE: Record<AngleType, string> = {
  acute: 'An **acute** angle is less than $90^\\circ$.',
  right: 'A **right** angle is exactly $90^\\circ$.',
  obtuse: 'An **obtuse** angle is between $90^\\circ$ and $180^\\circ$.',
  straight: 'A **straight** angle is exactly $180^\\circ$.',
  reflex: 'A **reflex** angle is between $180^\\circ$ and $360^\\circ$.',
};

/** Four angle-type choices (the correct one and its nearest neighbours) in the usual order. */
function typeChoices(rng: Rng, correct: AngleType, allowed: AngleType[] = TYPES): AnswerSpec {
  const ci = TYPES.indexOf(correct);
  const others = allowed.filter((t) => t !== correct).sort((a, b) => Math.abs(TYPES.indexOf(a) - ci) - Math.abs(TYPES.indexOf(b) - ci));
  const picked = others.length <= 3 ? others : [...others.slice(0, 2), rng.pick(others.slice(2))];
  const chosen = [correct, ...picked].sort((a, b) => TYPES.indexOf(a) - TYPES.indexOf(b));
  return fixedChoice(
    chosen.map((t) => `${cap(t)} angle`),
    chosen.indexOf(correct),
  );
}

function friendlyMeasure(rng: Rng, t: AngleType): number {
  switch (t) {
    case 'acute':
      return rng.int(3, 16) * 5;
    case 'right':
      return 90;
    case 'obtuse':
      return rng.int(20, 34) * 5;
    case 'straight':
      return 180;
    case 'reflex':
      return rng.int(38, 70) * 5;
  }
}

const CLASSIFY_CTX: Array<{ text: (a: string) => string; max: number }> = [
  { text: (a) => `An angle measures $${a}$.`, max: 359 },
  { text: (a) => `A carpenter cuts the end of a board so that the cut makes an angle of $${a}$ with the edge of the board.`, max: 179 },
  { text: (a) => `A plumber joins two pipes so that they meet at an angle of $${a}$.`, max: 180 },
  { text: (a) => `A farm gate swings open through an angle of $${a}$.`, max: 270 },
  { text: (a) => `A mechanic turns a wrench through an angle of $${a}$.`, max: 359 },
  { text: (a) => `A lawn sprinkler sprays water over an angle of $${a}$.`, max: 359 },
  { text: (a) => `A security camera in a warehouse sweeps through an angle of $${a}$.`, max: 359 },
  { text: (a) => `The two arms of a folding carpenter’s rule are opened to an angle of $${a}$.`, max: 180 },
  { text: (a) => `A surveyor’s field sketch shows an angle of $${a}$.`, max: 359 },
];

/** Clock-hand angle at h:mm, measured as the smaller angle between the hands. */
function clockAngles(h: number, mm: number) {
  const minute = 6 * mm;
  const hour = 30 * (h % 12) + 0.5 * mm;
  const diff = Math.abs(hour - minute);
  const small = Math.min(diff, 360 - diff);
  return { minute, hour, diff, small, large: 360 - small };
}

const timeText = (h: number, mm: number) => `${h}:${mm < 10 ? '0' : ''}${mm}`;

const angleClassify = skill({
  id: 'm103-angle-classify',
  name: 'Classifying angles',
  description: 'Classify an angle as acute, right, obtuse, straight or reflex from its measure, a diagram or a clock.',
  outcomes: ['G6'],
  lessonId: 'm103-6-1',
  format: 'mc',
  gen(rng, d) {
    const hints = [
      'Compare the angle with a square corner ($90^\\circ$) and with a straight line ($180^\\circ$).',
      'Acute: less than $90^\\circ$. Right: $90^\\circ$. Obtuse: between $90^\\circ$ and $180^\\circ$. Straight: $180^\\circ$. Reflex: more than $180^\\circ$.',
    ];
    if (d === 1) {
      const t = rng.weighted<AngleType>([
        ['acute', 3],
        ['right', 1],
        ['obtuse', 3],
        ['straight', 1],
        ['reflex', 2],
      ]);
      const a = friendlyMeasure(rng, t);
      if (rng.chance(0.35)) {
        // Which measure is of the given type?
        const others = TYPES.filter((x) => x !== t).sort((p, q) => Math.abs(TYPES.indexOf(p) - TYPES.indexOf(t)) - Math.abs(TYPES.indexOf(q) - TYPES.indexOf(t)));
        const ds = others.slice(0, 3).map((x) => friendlyMeasure(rng, x));
        return {
          prompt: `Which angle measure is ${t === 'acute' || t === 'obtuse' ? 'an' : 'a'} **${t}** angle?`,
          parts: [{ answer: mc(rng, `$${deg(a)}$`, ds.map((x) => `$${deg(x)}$`)) }],
          hints,
          solution: [TYPE_RULE[t], ...ds.map((x) => `$${deg(x)}$ is ${typeOf(x) === 'acute' || typeOf(x) === 'obtuse' ? 'an' : 'a'} ${typeOf(x)} angle.`), `So the ${t} angle is $${deg(a)}$.`],
          answerDisplay: `$${deg(a)}$`,
        };
      }
      const ctx = rng.pick(CLASSIFY_CTX.filter((c) => c.max >= a));
      return {
        prompt: `${ctx.text(deg(a))} Classify the angle.`,
        parts: [{ answer: typeChoices(rng, t) }],
        hints,
        solution: [TYPE_RULE[t], `$${deg(a)}$ fits this rule, so it is ${t === 'acute' || t === 'obtuse' ? 'an' : 'a'} **${t}** angle.`],
        answerDisplay: `${cap(t)} angle`,
      };
    }
    if (d === 2) {
      if (rng.chance(0.35)) {
        // Measures close to the boundaries.
        const a = rng.pick([87, 88, 89, 91, 92, 93, 177, 178, 179, 181, 182, 183, 2, 358]);
        const t = typeOf(a);
        const ctx = rng.pick(CLASSIFY_CTX.filter((c) => c.max >= a));
        const near = a < 45 || a > 300 ? null : a < 135 ? 90 : 180;
        return {
          prompt: `${ctx.text(deg(a))} Classify the angle.`,
          parts: [{ answer: typeChoices(rng, t) }],
          hints: [hints[0], 'Be careful near the boundaries: an angle is right or straight only when it is **exactly** $90^\\circ$ or $180^\\circ$.'],
          solution: [
            near ? `$${deg(a)}$ is ${a < near ? 'a little less' : 'a little more'} than $${deg(near)}$, so it is not exactly a ${near === 90 ? 'right' : 'straight'} angle.` : `$${deg(a)}$ is ${a < 45 ? 'just above $0^\\circ$' : 'just below $360^\\circ$'}.`,
            TYPE_RULE[t],
            `So $${deg(a)}$ is ${t === 'acute' || t === 'obtuse' ? 'an' : 'a'} **${t}** angle.`,
          ],
          answerDisplay: `${cap(t)} angle`,
        };
      }
      const t = rng.weighted<AngleType>([
        ['acute', 3],
        ['right', 1],
        ['obtuse', 3],
        ['straight', 1],
        ['reflex', 3],
      ]);
      const m = t === 'acute' ? rng.int(5, 14) * 5 : t === 'obtuse' ? rng.int(22, 32) * 5 : t === 'reflex' ? rng.int(40, 66) * 5 : t === 'right' ? 90 : 180;
      const base = rng.int(0, 11) * 30;
      const names = rng.pick(LETTERS);
      return {
        prompt: `What type of angle is marked at vertex $${names[1]}$ in the diagram?`,
        figure: angleFigure({ base, m, names }),
        parts: [{ answer: typeChoices(rng, t) }],
        hints: [
          'Look at the side of the vertex where the arc (or square) is drawn. That is the angle being asked about.',
          'Compare the opening with a square corner ($90^\\circ$) and with a straight line ($180^\\circ$).',
        ],
        solution: [
          t === 'right'
            ? 'The small square at the vertex shows a square corner.'
            : t === 'straight'
              ? 'The two rays point in opposite directions and form a straight line.'
              : t === 'reflex'
                ? 'The arc goes around the outside of the two rays, so the marked opening is more than a straight line.'
                : t === 'acute'
                  ? 'The opening is narrower than a square corner.'
                  : 'The opening is wider than a square corner but less than a straight line.',
          `${TYPE_RULE[t]} (This angle measures $${deg(m)}$.)`,
          `So the marked angle is ${t === 'acute' || t === 'obtuse' ? 'an' : 'a'} **${t}** angle.`,
        ],
        answerDisplay: `${cap(t)} angle`,
      };
    }
    // d3: clock hands.
    for (let tries = 0; tries < 100; tries++) {
      const h = rng.int(1, 12);
      const mm = rng.pick([0, 0, 10, 15, 20, 30, 40, 45, 50]);
      const c = clockAngles(h, mm);
      if (c.small < 5) continue;
      const larger = rng.chance(0.3) && c.small !== 180;
      const value = larger ? c.large : c.small;
      const t = typeOf(value);
      const who = rng.pick(NAMES);
      const ctx = rng.pick([
        `${who} starts a shift at a bakery at ${timeText(h, mm)}.`,
        `A delivery truck leaves the warehouse at ${timeText(h, mm)}.`,
        `${who}’s welding class ends at ${timeText(h, mm)}.`,
        `The clock in the auto shop shows ${timeText(h, mm)}.`,
        `${who} takes a coffee break at ${timeText(h, mm)}.`,
      ]);
      return {
        prompt: `${ctx} At that time, what type of angle is the **${larger ? 'larger' : 'smaller'}** angle between the hour hand and the minute hand of an analogue clock?`,
        parts: [{ answer: typeChoices(rng, t, larger ? TYPES : ['acute', 'right', 'obtuse', 'straight']) }],
        hints: [
          'A full turn is $360^\\circ$ and there are 12 numbers on a clock, so the hands move $30^\\circ$ from one number to the next.',
          'The minute hand turns $6^\\circ$ per minute. The hour hand turns $30^\\circ$ per hour plus $0.5^\\circ$ per minute. Find each hand’s position measured from 12, then subtract.',
        ],
        solution: [
          `Minute hand: $${mm} \\times 6^\\circ = ${deg(c.minute)}$ past 12.`,
          h === 12 ? `Hour hand: it starts at 12 ($0^\\circ$) and moves $${mm} \\times 0.5^\\circ = ${deg(c.hour)}$ past 12.` : `Hour hand: $${h} \\times 30^\\circ + ${mm} \\times 0.5^\\circ = ${deg(c.hour)}$ past 12.`,
          `The difference is $${deg(c.diff)}$, so the smaller angle is $${deg(c.small)}$ and the larger angle is $360^\\circ - ${deg(c.small)} = ${deg(c.large)}$.`,
          `The ${larger ? 'larger' : 'smaller'} angle, $${deg(value)}$, is ${t === 'acute' || t === 'obtuse' ? 'an' : 'a'} **${t}** angle.`,
        ],
        answerDisplay: `${cap(t)} angle`,
      };
    }
    throw new Error('clock');
  },
});

/** Distinct estimate options at least `sep` degrees apart, led by the wrong-scale reading 180 - m. */
function estimateOptions(rng: Rng, m: number, sep: number): number[] {
  const within = (v: number) => v >= 10 && v <= 350 && (m < 180 ? v < 180 : v > 180 || v === 180 - m);
  const cands = [m < 180 ? 180 - m : 360 - m, ...rng.shuffle([m + 45, m - 45, m + 90, m - 90, m + 60, m - 60, m + 30, m - 30, m + 120, m - 120])];
  const out = [m];
  for (const v of cands) {
    if (out.length >= 4) break;
    if (!within(v)) continue;
    if (out.some((u) => Math.abs(u - v) < sep)) continue;
    out.push(v);
  }
  return out;
}

const angleMeasure = skill({
  id: 'm103-angle-measure',
  name: 'Estimating and measuring angles',
  description: 'Estimate the measure of a drawn angle, find a reflex angle from the non-reflex angle, and use the fact that angles around a point add to 360°.',
  outcomes: ['G6'],
  lessonId: 'm103-6-1',
  gen(rng, d) {
    const mode =
      d === 1 ? rng.pick(['estimate', 'reflex'] as const) : d === 2 ? rng.pick(['estimate', 'reflex', 'around'] as const) : rng.pick(['aroundAlg', 'clock', 'reflexAlg'] as const);
    if (mode === 'estimate') {
      const m = d === 1 ? rng.pick([20, 30, 40, 50, 60, 120, 130, 140, 150, 160]) : rng.pick([15, 25, 35, 45, 55, 65, 115, 125, 135, 145, 155, 165, 200, 225, 250, 290, 315, 340]);
      const base = d === 1 ? rng.pick([0, 0, 180]) : rng.int(0, 11) * 30;
      const opts = estimateOptions(rng, m, d === 1 ? 40 : 25);
      // For a base of 180 draw the angle clockwise from the left-hand ray (as read from a protractor's outer scale).
      const fig = base === 180 && m < 180 ? angleFigure({ base: 180 - m, m }) : angleFigure({ base, m });
      return {
        prompt: `Estimate the measure of the angle marked by the ${m === 90 ? 'square' : 'arc'}.`,
        figure: fig,
        parts: [{ answer: mc(rng, `$${deg(m)}$`, opts.slice(1).map((v) => `$${deg(v)}$`)) }],
        hints: [
          'First decide whether the angle is less than $90^\\circ$, between $90^\\circ$ and $180^\\circ$, or more than $180^\\circ$.',
          m < 180 ? `If you used a protractor, a reading of $${deg(180 - m)}$ would mean you read the wrong scale. Check: is the angle acute or obtuse?` : 'For a reflex angle, estimate the small angle on the other side, then subtract it from $360^\\circ$.',
        ],
        solution: [
          m < 90 ? 'The opening is smaller than a square corner, so the angle is acute (less than $90^\\circ$).' : m < 180 ? 'The opening is wider than a square corner but less than a straight line, so the angle is obtuse.' : `The arc goes around the outside, so this is a reflex angle. The angle on the other side is about $${deg(360 - m)}$.`,
          m < 90
            ? `Compare with half a right angle ($45^\\circ$) and a right angle ($90^\\circ$): the angle is about $${deg(m)}$.`
            : m < 180
              ? `Compare with a right angle ($90^\\circ$), halfway to a straight line ($135^\\circ$) and a straight line ($180^\\circ$): the angle is about $${deg(m)}$.`
              : `$360^\\circ - ${deg(360 - m)} = ${deg(m)}$.`,
          `The best estimate is $${deg(m)}$.`,
        ],
        answerDisplay: `$${deg(m)}$`,
      };
    }
    if (mode === 'reflex') {
      const fromInterior = d === 1 || rng.chance(0.6);
      const x = d === 1 ? rng.int(4, 34) * 5 : rng.intExcept(21, 169, [90, 180]);
      const base = rng.int(0, 11) * 30;
      const names = rng.pick(LETTERS);
      const ang = `\\angle ${names.join('')}`;
      if (fromInterior) {
        return {
          prompt: `The non-reflex angle $${ang}$ measures $${deg(x)}$. What is the measure of the **reflex** angle $${ang}$, marked by the arc?`,
          figure: angleFigure({ base, m: 360 - x, names, otherLabel: `${x}°`, markLabel: '?' }),
          parts: [numPart(360 - x, { suffix: '°' })],
          hints: ['The non-reflex angle and the reflex angle together make one full turn.', 'Subtract the non-reflex angle from $360^\\circ$.'],
          solution: [`A full turn is $360^\\circ$.`, `Reflex $${ang} = 360^\\circ - ${deg(x)} = ${deg(360 - x)}$`, `The reflex angle measures $${deg(360 - x)}$.`],
        };
      }
      return {
        prompt: `The reflex angle $${ang}$ measures $${deg(360 - x)}$. What is the measure of the non-reflex angle $${ang}$?`,
        figure: angleFigure({ base, m: x, names, otherLabel: `${360 - x}°`, markLabel: '?', otherArc: true }),
        parts: [numPart(x, { suffix: '°' })],
        hints: ['The two angles at the vertex make one full turn.', 'Subtract the reflex angle from $360^\\circ$.'],
        solution: [`A full turn is $360^\\circ$.`, `$${ang} = 360^\\circ - ${deg(360 - x)} = ${deg(x)}$`, `The non-reflex angle measures $${deg(x)}$.`],
      };
    }
    if (mode === 'around') {
      let a = 0;
      let b = 0;
      let c = 0;
      for (let i = 0; i < 100; i++) {
        a = rng.int(70, 150);
        b = rng.int(70, 150);
        c = 360 - a - b;
        if (c >= 65 && c <= 165 && a !== b && b !== c && a !== c) break;
      }
      const base = rng.int(0, 11) * 30;
      const s = new Sketch();
      const V: P = [0, 0];
      s.ray(V, base, 3.6).ray(V, base + a, 3.6).ray(V, base + a + b, 3.6).dot(V);
      s.angleLabel(V, base, base + a, `${a}°`, 26).angleLabel(V, base + a, base + a + b, `${b}°`, 26).angleLabel(V, base + a + b, base + 360, 'x', 22);
      s.arc(V, 0.55, base + a + b, base + 360);
      const ctx = rng.pick([
        'Three pipes meet at a joint, as shown.',
        'Three roads meet at a single point, as shown.',
        'A round tabletop is cut into three pieces from its centre, as shown.',
        'Three steel bars are welded together at one point, as shown.',
        'Three irrigation lines meet at a pivot, as shown.',
      ]);
      return {
        prompt: `${ctx} Find the angle $x$.`,
        figure: s.build(),
        parts: [numPart(c, { suffix: '°', label: '$x =$' })],
        hints: ['The angles all the way around a point add to $360^\\circ$.', `Subtract the two known angles from $360^\\circ$.`],
        solution: [`Angles around a point add to $360^\\circ$: $${a}^\\circ + ${b}^\\circ + x = 360^\\circ$.`, `$x = 360^\\circ - ${a}^\\circ - ${b}^\\circ$`, `$x = ${deg(c)}$`],
      };
    }
    if (mode === 'aroundAlg') {
      for (let i = 0; i < 200; i++) {
        const x = rng.int(20, 60);
        const coefs = rng.pick([
          [1, 2],
          [1, 3],
          [2, 3],
          [1, 2, 3],
          [2, 2],
          [1, 4],
        ]);
        const terms = coefs.map((k, j) => ({ k, c: j === coefs.length - 1 && rng.chance(0.5) ? rng.pick([-20, -10, 10, 15, 20, 30]) : 0 }));
        const vals = terms.map((t) => t.k * x + t.c);
        const known = 360 - vals.reduce((s, v) => s + v, 0);
        const all = [...vals, known];
        if (known < 40 || known > 170 || all.some((v) => v < 25 || v > 170)) continue;
        if (new Set(all).size !== all.length) continue;
        const sumK = terms.reduce((s, t) => s + t.k, 0);
        const sumC = terms.reduce((s, t) => s + t.c, 0);
        const largest = Math.max(...vals);
        const base = rng.int(0, 7) * 45;
        const s = new Sketch();
        const V: P = [0, 0];
        let dir = base;
        s.dot(V).ray(V, dir, 3.8);
        const labels = [...terms.map((t) => exprLabel(t.k, t.c)), `${known}°`];
        all.forEach((v, j) => {
          s.angleLabel(V, dir, dir + v, labels[j], 30);
          dir += v;
          if (j < all.length - 1) s.ray(V, dir, 3.8);
        });
        const exprs = terms.map((t) => exprDeg(t.k, t.c));
        return {
          prompt: `The angles around point $O$ are shown in the diagram. Find $x$, then find the measure of the **largest** angle written in terms of $x$.`,
          figure: s.build(),
          parts: [numPart(x, { label: '$x =$' }), numPart(largest, { label: 'Largest angle', suffix: '°' })],
          hints: ['Angles around a point add to $360^\\circ$. Write an equation.', 'Collect the $x$-terms and the numbers, then solve for $x$. Substitute $x$ into each expression to find the angles.'],
          solution: [
            `$${exprs.join(' + ')} + ${deg(known)} = 360^\\circ$`,
            `$${sumK === 1 ? '' : sumK}x ${sumC + known < 0 ? '-' : '+'} ${Math.abs(sumC + known)} = 360$`,
            `$${sumK}x = ${360 - sumC - known}$, so $x = ${x}$.`,
            `The angles are ${vals.map((v) => `$${deg(v)}$`).join(', ')} and $${deg(known)}$ (check: they add to $360^\\circ$).`,
            `$x = ${x}$ and the largest angle written in terms of $x$ is $${deg(largest)}$.`,
          ],
        };
      }
      throw new Error('aroundAlg');
    }
    if (mode === 'clock') {
      const minuteHand = rng.chance(0.6);
      if (minuteHand) {
        const h = rng.int(1, 11);
        const start = rng.pick([0, 5, 10, 15, 20]);
        const mins = rng.pick([25, 35, 40, 45, 50, 55]);
        const end = start + mins;
        const endText = end >= 60 ? timeText(h + 1, end - 60) : timeText(h, end);
        const who = rng.pick(NAMES);
        return {
          prompt: `${who} puts a batch of bread in the oven at ${timeText(h, start)} and takes it out at ${endText}. Through how many degrees does the **minute hand** of the clock turn in that time?`,
          parts: [numPart(mins * 6, { suffix: '°' })],
          hints: ['The minute hand makes a full turn of $360^\\circ$ in 60 minutes.', 'So it turns $360^\\circ \\div 60 = 6^\\circ$ every minute. Find the number of minutes first.'],
          solution: [`From ${timeText(h, start)} to ${endText} is $${mins}$ minutes.`, `The minute hand turns $6^\\circ$ per minute: $${mins} \\times 6^\\circ = ${deg(mins * 6)}$.`, `The minute hand turns through $${deg(mins * 6)}$ (${typeOf(mins * 6) === 'reflex' ? 'a reflex angle' : `${typeOf(mins * 6) === 'obtuse' ? 'an' : 'a'} ${typeOf(mins * 6)} angle`}).`],
        };
      }
      const h1 = rng.int(1, 5);
      const hrs = rng.pick([2, 3, 4, 5, 6, 7]) + rng.pick([0, 0.5]);
      const endH = h1 + Math.floor(hrs);
      const endText = timeText(endH, hrs % 1 ? 30 : 0);
      const turn = hrs * 30;
      return {
        prompt: `A truck driver starts a run at ${timeText(h1, 0)} and finishes at ${endText} the same day. Through how many degrees does the **hour hand** of the clock turn during the run?`,
        parts: [numPart(turn, { suffix: '°' })],
        hints: ['The hour hand makes a full turn of $360^\\circ$ in 12 hours.', 'So it turns $360^\\circ \\div 12 = 30^\\circ$ every hour. Find the number of hours first.'],
        solution: [`From ${timeText(h1, 0)} to ${endText} is $${fmt(hrs)}$ hours.`, `The hour hand turns $30^\\circ$ per hour: $${fmt(hrs)} \\times 30^\\circ = ${deg(turn)}$.`, `The hour hand turns through $${deg(turn)}$.`],
      };
    }
    // reflexAlg
    for (let i = 0; i < 200; i++) {
      const x = rng.int(36, 140);
      const k = rng.int(2, 5);
      const c = 360 - (k + 1) * x;
      const reflex = k * x + c;
      if (c === 0 || Math.abs(c) > 60 || reflex <= 180 || reflex >= 360 || reflex === k * x) continue;
      return {
        prompt: `At vertex $B$, the reflex angle is $${Math.abs(c)}^\\circ$ ${c > 0 ? 'more' : 'less'} than ${k === 2 ? 'twice' : `${k} times`} the non-reflex angle. Find the measure of the **reflex** angle.`,
        parts: [numPart(reflex, { suffix: '°', label: 'Reflex angle' })],
        hints: ['Let the non-reflex angle be $x$. Write the reflex angle in terms of $x$.', 'The two angles at a point add to $360^\\circ$. Solve for $x$, then find the reflex angle.'],
        solution: [
          `Let the non-reflex angle be $x$. Then the reflex angle is $${exprDeg(k, c)}$.`,
          `The two angles make a full turn: $x + ${linExpr(k, c)} = 360$`,
          ...solveSum(1, 0, k, c, 360),
          `Reflex angle $= ${subst(k, c, x)} = ${deg(reflex)}$ (check: $${x}^\\circ + ${reflex}^\\circ = 360^\\circ$).`,
          `The reflex angle measures $${deg(reflex)}$.`,
        ],
      };
    }
    throw new Error('reflexAlg');
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.2 — Angle relationships and bisectors
// ---------------------------------------------------------------------------

const compSupp = skill({
  id: 'm103-comp-supp',
  name: 'Complementary and supplementary angles',
  description: 'Find the complement or supplement of an angle, including in diagrams, workplace contexts and simple equations.',
  outcomes: ['G6'],
  lessonId: 'm103-6-2',
  gen(rng, d) {
    if (d === 1) {
      const supp = rng.chance(0.5);
      const total = supp ? 180 : 90;
      const a = supp ? rng.int(4, 34) * 5 : rng.int(2, 17) * 5;
      const word = supp ? 'supplement' : 'complement';
      const prompt = rng.pick([
        `What is the ${word} of a $${deg(a)}$ angle?`,
        `$\\angle A$ and $\\angle B$ are ${supp ? 'supplementary' : 'complementary'}. If $\\angle A = ${deg(a)}$, what is $\\angle B$?`,
        `Find the ${word} of $${deg(a)}$.`,
      ]);
      return {
        prompt,
        parts: [numPart(total - a, { suffix: '°' })],
        hints: [supp ? 'Supplementary angles add to $180^\\circ$.' : 'Complementary angles add to $90^\\circ$.', `Subtract $${deg(a)}$ from $${deg(total)}$.`],
        solution: [supp ? 'Supplementary angles add to $180^\\circ$.' : 'Complementary angles add to $90^\\circ$.', `$${deg(total)} - ${deg(a)} = ${deg(total - a)}$`, `The ${word} is $${deg(total - a)}$.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['line', 'corner', 'context'] as const);
      if (mode === 'line') {
        const g = rng.intExcept(25, 155, [90]);
        const givenLeft = rng.chance(0.5);
        const s = new Sketch();
        const B: P = [0, 0];
        const A = at(B, 180, 3.6);
        const C = at(B, 0, 3.6);
        s.seg(A, C).ray(B, g, 3.4).dot(A).dot(B).dot(C).dot(at(B, g, 3.1));
        s.endLabel(A, 180, 'A').endLabel(C, 0, 'C').endLabel(at(B, g, 3.1), g, 'D').vertexLabel(B, [0, 180, g], 'B');
        s.arc(B, 0.7, 0, g).arc(B, 0.55, g, 180);
        s.angleLabel(B, 0, g, givenLeft ? 'x' : `${g}°`, 30).angleLabel(B, g, 180, givenLeft ? `${180 - g}°` : 'x', 30);
        const known = givenLeft ? 180 - g : g;
        return {
          prompt: `$A$, $B$ and $C$ lie on a straight line. Find the angle $x$.`,
          figure: s.build(),
          parts: [numPart(180 - known, { suffix: '°', label: '$x =$' })],
          hints: ['Angles that make a straight line add to $180^\\circ$, so they are supplementary.', `Subtract $${deg(known)}$ from $180^\\circ$.`],
          solution: [`The two angles make a straight line, so $x + ${deg(known)} = 180^\\circ$.`, `$x = 180^\\circ - ${deg(known)} = ${deg(180 - known)}$`, `$x = ${deg(180 - known)}$`],
        };
      }
      if (mode === 'corner') {
        const g = rng.intExcept(14, 76, [45]);
        const base = rng.int(0, 3) * 90;
        const givenFirst = rng.chance(0.5);
        const s = new Sketch();
        const V: P = [0, 0];
        s.ray(V, base, 3.6).ray(V, base + 90, 3.6).ray(V, base + g, 3.6).rightMark(V, base, 0.42).dot(V);
        s.angleLabel(V, base, base + g, givenFirst ? `${g}°` : 'x', 36).angleLabel(V, base + g, base + 90, givenFirst ? 'x' : `${90 - g}°`, 36);
        const known = givenFirst ? g : 90 - g;
        const ctx = rng.pick(['A ray divides a right angle into two parts.', 'A diagonal brace divides the square corner of a frame into two angles.', 'A carpenter cuts across the square corner of a sheet of plywood.']);
        return {
          prompt: `${ctx} Find the angle $x$.`,
          figure: s.build(),
          parts: [numPart(90 - known, { suffix: '°', label: '$x =$' })],
          hints: ['The square mark shows a right angle, so the two parts add to $90^\\circ$ (they are complementary).', `Subtract $${deg(known)}$ from $90^\\circ$.`],
          solution: [`The two parts make a right angle: $x + ${deg(known)} = 90^\\circ$.`, `$x = 90^\\circ - ${deg(known)} = ${deg(90 - known)}$`, `$x = ${deg(90 - known)}$`],
        };
      }
      const who = rng.pick(NAMES);
      const ctxs = [
        () => {
          const a = rng.int(3, 9);
          return { p: `A wheelchair ramp makes an angle of $${deg(a)}$ with the level ground. What angle does the ramp make with a vertical post standing on the ground?`, v: 90 - a, sol: [`The ground and the vertical post meet at $90^\\circ$, so the two angles are complementary.`, `$90^\\circ - ${deg(a)} = ${deg(90 - a)}$`] };
        },
        () => {
          const a = rng.int(66, 78);
          return { p: `${who} leans a ladder against a vertical wall. The ladder makes an angle of $${deg(a)}$ with the level ground. What angle does the ladder make with the wall?`, v: 90 - a, sol: [`The wall meets the ground at $90^\\circ$, so the two acute angles at the ends of the ladder are complementary.`, `$90^\\circ - ${deg(a)} = ${deg(90 - a)}$`] };
        },
        () => {
          const a = rng.intExcept(21, 79, [45]);
          return { p: `${who} makes one straight cut across a board. The cut makes an angle of $${deg(a)}$ with the edge of the board on one side. What angle does the cut make with the same edge on the other side?`, v: 180 - a, sol: [`The two angles lie along the straight edge of the board, so they are supplementary.`, `$180^\\circ - ${deg(a)} = ${deg(180 - a)}$`] };
        },
        () => {
          const a = rng.intExcept(16, 44, [30]);
          return { p: `A roof rafter makes an angle of $${deg(a)}$ with the horizontal ceiling joist. What angle does the rafter make with a vertical post that meets the joist at a right angle?`, v: 90 - a, sol: [`The joist and the vertical post meet at $90^\\circ$, so the two angles are complementary.`, `$90^\\circ - ${deg(a)} = ${deg(90 - a)}$`] };
        },
        () => {
          const a = rng.intExcept(18, 42, [30]);
          return { p: `An exit ramp leaves a straight highway. The ramp makes an angle of $${deg(a)}$ with the highway ahead. What angle does the ramp make with the highway behind it (on the same side of the highway)?`, v: 180 - a, sol: [`The two angles make a straight line along the highway, so they are supplementary.`, `$180^\\circ - ${deg(a)} = ${deg(180 - a)}$`] };
        },
      ];
      const c = rng.pick(ctxs)();
      return {
        prompt: c.p,
        parts: [numPart(c.v, { suffix: '°' })],
        hints: ['Look for a right angle ($90^\\circ$) or a straight line ($180^\\circ$) in the situation.', 'Complementary angles add to $90^\\circ$. Supplementary angles add to $180^\\circ$.'],
        solution: [...c.sol, `The angle is $${deg(c.v)}$.`],
      };
    }
    // d3: algebra
    if (rng.chance(0.55)) {
      for (let i = 0; i < 200; i++) {
        const supp = rng.chance(0.55);
        const total = supp ? 180 : 90;
        const x = supp ? rng.int(25, 70) : rng.int(12, 35);
        const k = rng.int(2, 4);
        // x + (k x + c) = total
        const c = total - (k + 1) * x;
        const other = k * x + c;
        if (c === 0 || Math.abs(c) > 40 || other <= 0 || other === x) continue;
        return {
          prompt: `Two angles are **${supp ? 'supplementary' : 'complementary'}**. One angle measures $${deg('x')}$ and the other measures $${exprDeg(k, c)}$. Find the measure of each angle.`,
          parts: [numPart(x, { label: `$${deg('x')}$`, suffix: '°' }), numPart(other, { label: `$${exprDeg(k, c)}$`, suffix: '°' })],
          hints: [`${supp ? 'Supplementary angles add to $180^\\circ$' : 'Complementary angles add to $90^\\circ$'}. Write an equation: $x + ${linExpr(k, c)} = ${total}$.`, 'Combine the $x$-terms, solve for $x$, then substitute to find the second angle.'],
          solution: [
            `$x + ${linExpr(k, c)} = ${total}$`,
            ...solveSum(1, 0, k, c, total),
            `Second angle: $${subst(k, c, x)} = ${other}$. Check: $${x} + ${other} = ${total}$.`,
            `The angles measure $${deg(x)}$ and $${deg(other)}$.`,
          ],
        };
      }
    }
    // "The supplement of an angle is k times the angle" style.
    for (let i = 0; i < 200; i++) {
      const supp = rng.chance(0.5);
      const total = supp ? 180 : 90;
      const k = rng.int(2, 5);
      const c = rng.pick([0, 0, -20, -10, 10, 20, 30]);
      // total - x = k x + c  ->  x = (total - c) / (k + 1)
      if ((total - c) % (k + 1) !== 0) continue;
      const x = (total - c) / (k + 1);
      if (x <= 5 || total - x <= 5) continue;
      const rel = c === 0 ? `${k === 2 ? 'twice' : `${k} times`} the angle` : `$${Math.abs(c)}^\\circ$ ${c > 0 ? 'more' : 'less'} than ${k === 2 ? 'twice' : `${k} times`} the angle`;
      return {
        prompt: `The **${supp ? 'supplement' : 'complement'}** of an angle is ${rel}. Find the angle.`,
        parts: [numPart(x, { suffix: '°' })],
        hints: [`Let the angle be $x$. Its ${supp ? 'supplement' : 'complement'} is $${total} - x$.`, `Set $${total} - x$ equal to $${linExpr(k, c)}$ and solve for $x$.`],
        solution: [
          `Let the angle be $x$. Its ${supp ? 'supplement' : 'complement'} is $${total} - x$.`,
          `$${total} - x = ${linExpr(k, c)}$`,
          `Add $x$ to both sides: $${total} = ${coefX(k + 1)}${signed(c)}$`,
          ...(c === 0 ? [] : [`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$ ${c > 0 ? 'from' : 'to'} both sides: $${total - c} = ${coefX(k + 1)}$`]),
          `Divide both sides by $${k + 1}$: $x = ${x}$`,
          `Check: the ${supp ? 'supplement' : 'complement'} is $${total} - ${x} = ${total - x}$, and $${subst(k, c, x)} = ${k * x + c}$.`,
          `The angle measures $${deg(x)}$.`,
        ],
      };
    }
    throw new Error('compSupp');
  },
});

/** Two lines crossing at the origin; regions 0..3 counterclockwise from direction t1. */
function crossingFigure(t1: number, m: number, labels: Array<string | null>): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  s.line(V, t1, 3.8).line(V, t1 + m, 3.8).dot(V);
  const bounds = [t1, t1 + m, t1 + 180, t1 + 180 + m, t1 + 360];
  labels.forEach((lab, i) => {
    if (!lab) return;
    s.arc(V, i % 2 === 0 ? 0.6 : 0.5, bounds[i], bounds[i + 1]);
    s.angleLabel(V, bounds[i], bounds[i + 1], lab, 30);
  });
  return s.build();
}

const verticalAngles = skill({
  id: 'm103-vertical-angles',
  name: 'Vertically opposite angles',
  description: 'Use the facts that vertically opposite angles are equal and adjacent angles on a line are supplementary.',
  outcomes: ['G6'],
  lessonId: 'm103-6-2',
  gen(rng, d) {
    const t1 = rng.int(-25, 25);
    if (d === 1) {
      const m = rng.intExcept(6, 30, [18]) * 5;
      const g = rng.int(0, 3);
      const measure = g % 2 === 0 ? m : 180 - m;
      const labels: Array<string | null> = [null, null, null, null];
      labels[g] = `${measure}°`;
      labels[(g + 2) % 4] = 'x';
      const ctx = rng.pick(['Two straight lines cross.', 'Two straight roads cross at an intersection.', 'The blades of a pair of tin snips cross, as shown.', 'Two boards of an X-brace on a farm gate cross.']);
      return {
        prompt: `${ctx} Find the angle $x$.`,
        figure: crossingFigure(t1, m, labels),
        parts: [numPart(measure, { suffix: '°', label: '$x =$' })],
        hints: ['The angle $x$ is across the crossing point from the known angle.', 'Vertically opposite angles are equal.'],
        solution: [`$x$ and the $${deg(measure)}$ angle are vertically opposite angles.`, 'Vertically opposite angles are equal.', `$x = ${deg(measure)}$`],
      };
    }
    if (d === 2) {
      const m = rng.intExcept(25, 155, [90]);
      const g = rng.int(0, 3);
      const measure = g % 2 === 0 ? m : 180 - m;
      const names = ['a', 'b', 'c'];
      const labels: Array<string | null> = [null, null, null, null];
      labels[g] = `${measure}°`;
      for (let k = 1; k <= 3; k++) labels[(g + k) % 4] = names[k - 1];
      const vals = [180 - measure, measure, 180 - measure];
      return {
        prompt: `Two straight lines cross as shown. Find the angles $a$, $b$ and $c$.`,
        figure: crossingFigure(t1, m, labels),
        parts: names.map((n, k) => numPart(vals[k], { label: `$${n} =$`, suffix: '°' })),
        hints: ['Angles next to each other on a straight line add to $180^\\circ$.', 'Vertically opposite angles (across the crossing point) are equal.'],
        solution: [
          `$a$ is next to the $${deg(measure)}$ angle on a straight line, so $a = 180^\\circ - ${deg(measure)} = ${deg(180 - measure)}$.`,
          `$b$ is vertically opposite the $${deg(measure)}$ angle, so $b = ${deg(measure)}$.`,
          `$c$ is vertically opposite $a$, so $c = ${deg(180 - measure)}$.`,
          `$a = ${deg(180 - measure)}$, $b = ${deg(measure)}$, $c = ${deg(180 - measure)}$.`,
        ],
      };
    }
    // d3 algebra
    for (let i = 0; i < 300; i++) {
      const opposite = rng.chance(0.55);
      const x = rng.int(8, 40);
      const k1 = rng.int(2, 5);
      const k2 = opposite ? rng.intExcept(1, 4, [k1]) : rng.int(1, 4);
      const A = opposite ? rng.intExcept(35, 145, [90]) : rng.intExcept(40, 140, [90]);
      const B = opposite ? A : 180 - A;
      const c1 = A - k1 * x;
      const c2 = B - k2 * x;
      if (Math.abs(c1) > 60 || Math.abs(c2) > 60 || (c1 === 0 && c2 === 0)) continue;
      const g = rng.int(0, 3);
      const m = g % 2 === 0 ? A : 180 - A;
      const labels: Array<string | null> = [null, null, null, null];
      labels[g] = exprLabel(k1, c1);
      labels[(g + (opposite ? 2 : 1)) % 4] = exprLabel(k2, c2);
      const e1 = linExpr(k1, c1);
      const e2 = linExpr(k2, c2);
      const askFirst = rng.chance(0.5);
      const askVal = askFirst ? A : B;
      const askExpr = askFirst ? exprDeg(k1, c1) : exprDeg(k2, c2);
      const eq = opposite ? `${e1} = ${e2}` : `(${e1}) + (${e2}) = 180`;
      return {
        prompt: `Two straight lines cross as shown. Find $x$, then find the measure of the angle labelled $${askExpr}$.`,
        figure: crossingFigure(t1, m, labels),
        parts: [numPart(x, { label: '$x =$' }), numPart(askVal, { label: `$${askExpr} =$`, suffix: '°' })],
        hints: [
          opposite ? 'The two labelled angles are vertically opposite, so they are equal.' : 'The two labelled angles sit side by side on a straight line, so they add to $180^\\circ$.',
          `Write an equation, solve for $x$, then substitute into $${linExpr(askFirst ? k1 : k2, askFirst ? c1 : c2)}$.`,
        ],
        solution: [
          opposite ? `Vertically opposite angles are equal: $${eq}$.` : `Adjacent angles on a straight line are supplementary: $${eq}$.`,
          ...(opposite ? solveEqual(k1, c1, k2, c2) : solveSum(k1, c1, k2, c2, 180)),
          `Substitute $x = ${x}$: $${subst(askFirst ? k1 : k2, askFirst ? c1 : c2, x)} = ${askVal}$`,
          `$x = ${x}$ and the angle measures $${deg(askVal)}$.`,
        ],
      };
    }
    throw new Error('vertical');
  },
});

function bisectFigure(o: { base: number; m: number; names: [string, string, string, string]; reflex?: boolean }): PlaneFigure {
  const s = new Sketch();
  const V: P = [0, 0];
  const [nA, nB, nC, nD] = o.names;
  const a2 = o.base + o.m;
  const bis = o.reflex ? o.base + o.m / 2 + 180 : o.base + o.m / 2;
  const L = 3.8;
  s.ray(V, o.base, L).ray(V, a2, L).ray(V, bis, L, { color: 'accent', dashed: true });
  const eA = at(V, o.base, L * 0.8);
  const eC = at(V, a2, L * 0.8);
  const eD = at(V, bis, L * 0.8);
  if (o.reflex) {
    s.arc(V, 0.7, a2, bis).arc(V, 0.55, bis, o.base + 360);
  } else {
    s.arc(V, 0.75, o.base, bis).arc(V, 0.6, bis, a2);
  }
  s.dot(V).dot(eA).dot(eC).dot(eD, 'accent');
  s.vertexLabel(V, [o.base, a2, bis], nB).endLabel(eA, o.base - 90, nA).endLabel(eC, a2 + 90, nC).endLabel(eD, bis + 90, nD);
  return s.build();
}

const BISECT_NAMES: Array<[string, string, string, string]> = [
  ['A', 'B', 'C', 'D'],
  ['P', 'Q', 'R', 'S'],
  ['D', 'E', 'F', 'G'],
  ['J', 'K', 'L', 'M'],
  ['W', 'X', 'Y', 'Z'],
];

const bisect = skill({
  id: 'm103-bisect',
  name: 'Angle bisectors',
  description: 'Use an angle bisector to find each half of an angle, or the whole angle from one half.',
  outcomes: ['G6'],
  lessonId: 'm103-6-2',
  gen(rng, d) {
    const names = rng.pick(BISECT_NAMES);
    const [A, B, C, D] = names;
    const base = rng.int(0, 11) * 30;
    const whole = `\\angle ${A}${B}${C}`;
    const half = `\\angle ${A}${B}${D}`;
    const other = `\\angle ${D}${B}${C}`;
    if (d === 1) {
      if (rng.chance(0.5)) {
        const m = rng.int(4, 17) * 10;
        return {
          prompt: `Ray $${B}${D}$ bisects $${whole}$. If $${whole} = ${deg(m)}$, find $${half}$.`,
          figure: bisectFigure({ base, m, names }),
          parts: [numPart(m / 2, { suffix: '°', label: `$${half} =$` })],
          hints: ['A bisector cuts an angle into two equal parts.', `Divide $${deg(m)}$ by 2.`],
          solution: [`The bisector splits $${whole}$ into two equal angles.`, `$${half} = ${deg(m)} \\div 2 = ${deg(m / 2)}$`, `$${half} = ${deg(m / 2)}$`],
        };
      }
      const h = rng.int(10, 80);
      return {
        prompt: `Ray $${B}${D}$ bisects $${whole}$. If $${half} = ${deg(h)}$, find $${whole}$.`,
        figure: bisectFigure({ base, m: 2 * h, names }),
        parts: [numPart(2 * h, { suffix: '°', label: `$${whole} =$` })],
        hints: ['A bisector cuts an angle into two equal parts, so the whole angle is twice one part.', `Multiply $${deg(h)}$ by 2.`],
        solution: [`$${half} = ${other} = ${deg(h)}$ because a bisector makes two equal angles.`, `$${whole} = 2 \\times ${deg(h)} = ${deg(2 * h)}$`, `$${whole} = ${deg(2 * h)}$`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['odd', 'trim', 'both'] as const);
      if (mode === 'odd') {
        const m = rng.int(15, 85) * 2 + 1;
        return {
          prompt: `Ray $${B}${D}$ bisects $${whole} = ${deg(m)}$. Find $${other}$.`,
          figure: bisectFigure({ base, m, names }),
          parts: [numPart(m / 2, { suffix: '°', label: `$${other} =$` })],
          hints: ['A bisector cuts an angle into two equal parts.', `Divide $${deg(m)}$ by 2. The answer can be a decimal.`],
          solution: [`$${half} = ${other}$ because $${B}${D}$ is a bisector.`, `$${other} = ${deg(m)} \\div 2 = ${deg(m / 2)}$`, `$${other} = ${deg(m / 2)}$`],
        };
      }
      if (mode === 'trim') {
        const m = rng.pick([60, 72, 100, 105, 108, 110, 120, 125, 130, 135, 140, 145, 150, 155]);
        const who = rng.pick(NAMES);
        const item = rng.pick(['baseboard', 'crown moulding', 'window trim', 'deck railing']);
        return {
          prompt: `${who} is installing ${item} around a corner where two walls meet at $${deg(m)}$. To make a tight joint, the joint line must **bisect** the corner angle. What angle does the joint line make with each wall?`,
          parts: [numPart(m / 2, { suffix: '°' })],
          hints: ['The joint line is the bisector of the corner angle.', `A bisector makes two equal angles, so divide $${deg(m)}$ by 2.`],
          solution: [`The joint line bisects the $${deg(m)}$ corner, so it makes the same angle with each wall.`, `$${deg(m)} \\div 2 = ${deg(m / 2)}$`, `The joint line makes $${deg(m / 2)}$ with each wall.`],
        };
      }
      const h = rng.int(12, 85);
      return {
        prompt: `Ray $${B}${D}$ bisects $${whole}$, and $${other} = ${deg(h)}$. Find $${half}$ and $${whole}$.`,
        figure: bisectFigure({ base, m: 2 * h, names }),
        parts: [numPart(h, { suffix: '°', label: `$${half} =$` }), numPart(2 * h, { suffix: '°', label: `$${whole} =$` })],
        hints: ['A bisector makes two equal angles.', 'The whole angle is the sum of its two equal halves.'],
        solution: [`$${half} = ${other} = ${deg(h)}$ (bisector).`, `$${whole} = ${deg(h)} + ${deg(h)} = ${deg(2 * h)}$`, `$${half} = ${deg(h)}$ and $${whole} = ${deg(2 * h)}$.`],
      };
    }
    // d3
    const mode = rng.pick(['reflex', 'supp', 'algebra'] as const);
    if (mode === 'reflex') {
      const m = rng.intExcept(25, 155, [90]) ;
      const r = 360 - m;
      return {
        prompt: `The non-reflex angle $${whole}$ measures $${deg(m)}$. Ray $${B}${D}$ bisects the **reflex** angle $${whole}$. Find the angle between ray $${B}${D}$ and ray $${B}${A}$, measured around the reflex side.`,
        figure: bisectFigure({ base, m, names, reflex: true }),
        parts: [numPart(r / 2, { suffix: '°' })],
        hints: ['First find the reflex angle: subtract the non-reflex angle from $360^\\circ$.', 'The bisector cuts the reflex angle into two equal parts, so divide by 2.'],
        solution: [`Reflex $${whole} = 360^\\circ - ${deg(m)} = ${deg(r)}$`, `The bisector halves it: $${deg(r)} \\div 2 = ${deg(r / 2)}$`, `The angle is $${deg(r / 2)}$.`],
      };
    }
    if (mode === 'supp') {
      const a = rng.intExcept(25, 155, [90]);
      const s = new Sketch();
      const O: P = [0, 0];
      const PA = at(O, 180, 3.6);
      const PC = at(O, 0, 3.6);
      s.seg(PA, PC).ray(O, a, 3.6).ray(O, a / 2, 3.4, { color: 'accent', dashed: true }).ray(O, (a + 180) / 2, 3.4, { color: 'accent', dashed: true });
      s.arc(O, 0.65, a / 2, (a + 180) / 2);
      s.dot(O).dot(PA).dot(PC).dot(at(O, a, 3.2)).dot(at(O, a / 2, 3), 'accent').dot(at(O, (a + 180) / 2, 3), 'accent');
      s.vertexLabel(O, [0, 180, a, a / 2, (a + 180) / 2], 'O').endLabel(PA, 180, 'A').endLabel(PC, 0, 'C').endLabel(at(O, a, 3.2), a, 'B').endLabel(at(O, a / 2, 3), a / 2, 'D').endLabel(at(O, (a + 180) / 2, 3), (a + 180) / 2, 'E');
      return {
        prompt: `$A$, $O$ and $C$ lie on a straight line, and $\\angle BOC = ${deg(a)}$. Ray $OD$ bisects $\\angle BOC$ and ray $OE$ bisects $\\angle AOB$. Find $\\angle DOE$.`,
        figure: s.build(),
        parts: [numPart(90, { suffix: '°', label: '$\\angle DOE =$' })],
        hints: ['Find $\\angle AOB$ first: angles on a straight line add to $180^\\circ$.', '$\\angle DOE$ is half of $\\angle BOC$ plus half of $\\angle AOB$.'],
        solution: [
          `$\\angle AOB = 180^\\circ - ${deg(a)} = ${deg(180 - a)}$`,
          `$\\angle DOB = ${deg(a)} \\div 2 = ${deg(a / 2)}$ and $\\angle BOE = ${deg(180 - a)} \\div 2 = ${deg((180 - a) / 2)}$`,
          `$\\angle DOE = ${deg(a / 2)} + ${deg((180 - a) / 2)} = 90^\\circ$`,
          'This always happens: the bisectors of two angles on a straight line meet at $90^\\circ$, because half of $180^\\circ$ is $90^\\circ$.',
          `$\\angle DOE = 90^\\circ$`,
        ],
      };
    }
    for (let i = 0; i < 300; i++) {
      const x = rng.int(6, 30);
      const k1 = rng.int(2, 6);
      const k2 = rng.intExcept(1, 6, [k1]);
      const h = rng.int(20, 80);
      const c1 = h - k1 * x;
      const c2 = h - k2 * x;
      if (Math.abs(c1) > 50 || Math.abs(c2) > 50 || (c1 === 0 && c2 === 0)) continue;
      return {
        prompt: `Ray $${B}${D}$ bisects $${whole}$. If $${half} = ${exprDeg(k1, c1)}$ and $${other} = ${exprDeg(k2, c2)}$, find $x$ and the measure of $${whole}$.`,
        figure: bisectFigure({ base, m: 2 * h, names }),
        parts: [numPart(x, { label: '$x =$' }), numPart(2 * h, { suffix: '°', label: `$${whole} =$` })],
        hints: ['A bisector makes two equal angles, so set the two expressions equal.', 'Solve for $x$, find one half, then double it to get the whole angle.'],
        solution: [
          `The halves are equal: $${linExpr(k1, c1)} = ${linExpr(k2, c2)}$`,
          ...solveEqual(k1, c1, k2, c2),
          `$${half} = ${subst(k1, c1, x)} = ${deg(h)}$`,
          `$${whole} = 2 \\times ${deg(h)} = ${deg(2 * h)}$`,
          `$x = ${x}$ and $${whole} = ${deg(2 * h)}$.`,
        ],
      };
    }
    throw new Error('bisect');
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.3 — Parallel lines and transversals
// ---------------------------------------------------------------------------

type Region = 'UL' | 'UR' | 'LL' | 'LR';
interface Spot {
  /** 'P' is the upper crossing, 'Q' the lower one. */
  at: 'P' | 'Q';
  r: Region;
}
type Relation = 'corresponding' | 'alternate interior' | 'alternate exterior' | 'co-interior' | 'vertically opposite';

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
  if (ia && ib) return a.r[1] !== b.r[1] ? 'alternate interior' : 'co-interior';
  if (!ia && !ib && a.r[1] !== b.r[1]) return 'alternate exterior';
  return 'other';
}

const RELATION_TEXT: Record<Relation, string> = {
  corresponding: 'Corresponding angles',
  'alternate interior': 'Alternate interior angles',
  'alternate exterior': 'Alternate exterior angles',
  'co-interior': 'Co-interior (same-side interior) angles',
  'vertically opposite': 'Vertically opposite angles',
};

const RELATION_WHY: Record<Relation, string> = {
  corresponding: 'they are in the same position at the two crossings (for example, both above the line and to the right of the transversal)',
  'alternate interior': 'they are between the two lines and on opposite sides of the transversal',
  'alternate exterior': 'they are outside the two lines and on opposite sides of the transversal',
  'co-interior': 'they are between the two lines and on the same side of the transversal',
  'vertically opposite': 'they are across from each other at the same crossing point',
};

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
function transversalFigure(o: { theta: number; tilt?: number; labels: Record<string, string>; arcs?: string[]; marks?: boolean; names?: boolean }): PlaneFigure {
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
  if (o.names) {
    s.endLabel(m2, 0, 'm').endLabel(n2, tilt, 'n').endLabel(t2, th, 't');
  }
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

/** Pairs of angle numbers with a named relationship, for a scheme. */
function namedPairs(scheme: Record<string, number>): Array<{ a: number; b: number; rel: Relation }> {
  const out: Array<{ a: number; b: number; rel: Relation }> = [];
  for (let i = 1; i <= 8; i++)
    for (let j = i + 1; j <= 8; j++) {
      const rel = relationOf(spotOf(scheme, i), spotOf(scheme, j));
      if (rel !== 'linear pair' && rel !== 'other') out.push({ a: i, b: j, rel });
    }
  return out;
}

const CONFUSE: Record<Relation, Relation[]> = {
  corresponding: ['alternate interior', 'alternate exterior', 'vertically opposite', 'co-interior'],
  'alternate interior': ['alternate exterior', 'co-interior', 'corresponding', 'vertically opposite'],
  'alternate exterior': ['alternate interior', 'corresponding', 'vertically opposite', 'co-interior'],
  'co-interior': ['alternate interior', 'corresponding', 'alternate exterior', 'vertically opposite'],
  'vertically opposite': ['corresponding', 'alternate interior', 'alternate exterior', 'co-interior'],
};

function pickTheta(rng: Rng): number {
  return rng.pick([50, 55, 60, 65, 70, 110, 115, 120, 125, 130]);
}

const transversalName = skill({
  id: 'm103-transversal-name',
  name: 'Naming angle pairs',
  description: 'Name corresponding, alternate interior, alternate exterior, co-interior and vertically opposite angles formed by a transversal.',
  outcomes: ['G5'],
  lessonId: 'm103-6-3',
  format: 'mc',
  gen(rng, d) {
    const scheme = d === 1 ? SCHEMES[0] : rng.pick(SCHEMES);
    const theta = pickTheta(rng);
    const fig = transversalFigure({ theta, labels: numberLabels(scheme), marks: true, names: true });
    const pairs = namedPairs(scheme);
    const allowed: Relation[] = d === 1 ? ['corresponding', 'alternate interior', 'vertically opposite'] : ['corresponding', 'alternate interior', 'alternate exterior', 'co-interior', 'vertically opposite'];
    const rel = rng.pick(allowed);
    const pair = rng.pick(pairs.filter((p) => p.rel === rel));
    const [a, b] = rng.chance(0.5) ? [pair.a, pair.b] : [pair.b, pair.a];
    const hints = [
      'Interior angles are between lines $m$ and $n$. Exterior angles are outside them.',
      'Corresponding: same position at each crossing. Alternate: opposite sides of $t$. Co-interior: same side of $t$, both between the lines. Vertically opposite: across one crossing point.',
    ];
    if (d === 3) {
      // Which angle has this relationship with angle a?
      const partners = pairs.filter((p) => p.rel === rel && (p.a === a || p.b === a)).map((p) => (p.a === a ? p.b : p.a));
      const target = partners[0];
      const others = pairs.filter((p) => p.rel !== rel && (p.a === a || p.b === a)).map((p) => (p.a === a ? p.b : p.a));
      const ds = rng.shuffle(others.filter((n) => n !== target)).slice(0, 3);
      return {
        prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. Which angle is the **${rel === 'co-interior' ? 'co-interior angle' : `${rel} angle`}** to $\\angle ${a}$?`,
        figure: fig,
        parts: [{ answer: mc(rng, `$\\angle ${target}$`, ds.map((n) => `$\\angle ${n}$`)) }],
        hints,
        solution: [
          `${RELATION_TEXT[rel]}: ${RELATION_WHY[rel]}.`,
          ...others.filter((n) => ds.includes(n)).map((n) => `$\\angle ${n}$ and $\\angle ${a}$ are ${RELATION_TEXT[relationOf(spotOf(scheme, a), spotOf(scheme, n)) as Relation].toLowerCase()}.`),
          `So $\\angle ${target}$ is the ${rel} angle to $\\angle ${a}$.`,
        ],
        answerDisplay: `$\\angle ${target}$`,
      };
    }
    const ds = CONFUSE[rel].filter((r) => allowed.includes(r) || d > 1).slice(0, 3);
    return {
      prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. What is the relationship between $\\angle ${a}$ and $\\angle ${b}$?`,
      figure: fig,
      parts: [{ answer: mc(rng, RELATION_TEXT[rel], ds.map((r) => RELATION_TEXT[r])) }],
      hints,
      solution: [
        `Find $\\angle ${a}$ and $\\angle ${b}$ in the diagram.`,
        `They are ${rel === 'vertically opposite' ? 'at the same crossing point' : 'at different crossing points'}: ${RELATION_WHY[rel]}.`,
        `So they are **${RELATION_TEXT[rel].toLowerCase()}**${rel === 'co-interior' ? ', which add to $180^\\circ$ when the lines are parallel' : rel === 'vertically opposite' ? ', which are always equal' : ', which are equal when the lines are parallel'}.`,
      ],
      answerDisplay: RELATION_TEXT[rel],
    };
  },
});

const transversalAngles = skill({
  id: 'm103-transversal-angles',
  name: 'Angles formed by parallel lines',
  description: 'Find unknown angles where a transversal crosses parallel lines, including with simple equations.',
  outcomes: ['G5'],
  lessonId: 'm103-6-3',
  gen(rng, d) {
    if (d === 1) {
      const theta = pickTheta(rng);
      const given = rng.pick(ALL_SPOTS);
      const rel = rng.pick(['corresponding', 'alternate interior', 'alternate exterior', 'vertically opposite'] as Relation[]);
      const targets = ALL_SPOTS.filter((s) => relationOf(given, s) === rel);
      // Every spot has exactly one corresponding, one vertically opposite and one alternate partner (interior or exterior).
      const fallback = ALL_SPOTS.filter((s) => relationOf(given, s) === (isInterior(given) ? 'alternate interior' : 'alternate exterior'));
      const target = targets.length ? targets[0] : fallback[0];
      const usedRel = relationOf(given, target) as Relation;
      const v = regionMeasure(given.r, theta, 0);
      const labels: Record<string, string> = { [spotKey(given)]: `${v}°`, [spotKey(target)]: 'x' };
      return {
        prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. Find the angle $x$.`,
        figure: transversalFigure({ theta, labels, arcs: [spotKey(given), spotKey(target)], marks: true, names: true }),
        parts: [numPart(v, { suffix: '°', label: '$x =$' })],
        hints: ['Decide how $x$ and the given angle are related: corresponding, alternate or vertically opposite?', 'When lines are parallel, corresponding angles, alternate angles and vertically opposite angles are equal.'],
        solution: [`$x$ and the $${deg(v)}$ angle are ${usedRel} angles.`, `${cap(usedRel)} angles are equal${usedRel === 'vertically opposite' ? '' : ' when the lines are parallel'}.`, `$x = ${deg(v)}$`],
      };
    }
    if (d === 2) {
      const theta = rng.intExcept(40, 140, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]);
      const scheme = rng.pick(SCHEMES);
      const gN = rng.int(1, 8);
      const tN = rng.intExcept(1, 8, [gN]);
      const g = spotOf(scheme, gN);
      const t = spotOf(scheme, tN);
      const gv = regionMeasure(g.r, theta, 0);
      const tv = regionMeasure(t.r, theta, 0);
      const same = family(g) === family(t);
      const rel = relationOf(g, t);
      // Explain with one or two steps.
      const steps: string[] = [];
      if (rel !== 'linear pair' && rel !== 'other') {
        steps.push(`$\\angle ${gN}$ and $\\angle ${tN}$ are ${rel} angles, so they are ${rel === 'co-interior' ? 'supplementary' : 'equal'}.`);
        if (rel === 'co-interior') steps.push(`$\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$`);
      } else if (rel === 'linear pair') {
        steps.push(`$\\angle ${gN}$ and $\\angle ${tN}$ are next to each other on a straight line, so they add to $180^\\circ$.`);
      } else {
        // Two steps: go through the matching angle at the same crossing as the target.
        const mid = ALL_SPOTS.find((s) => s.at === t.at && relationOf(g, s) === 'corresponding')!;
        const midN = scheme[spotKey(mid)];
        steps.push(`$\\angle ${midN}$ corresponds to $\\angle ${gN}$, so $\\angle ${midN} = ${deg(gv)}$.`);
        const r2 = relationOf(mid, t);
        steps.push(
          r2 === 'vertically opposite'
            ? `$\\angle ${tN}$ is vertically opposite $\\angle ${midN}$, so $\\angle ${tN} = ${deg(tv)}$.`
            : `$\\angle ${tN}$ and $\\angle ${midN}$ are on a straight line, so $\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$.`,
        );
      }
      return {
        prompt: `Lines $m$ and $n$ are parallel and $t$ is a transversal. If $\\angle ${gN} = ${deg(gv)}$, find $\\angle ${tN}$.`,
        figure: transversalFigure({ theta, labels: numberLabels(scheme), marks: true, names: true }),
        parts: [numPart(tv, { suffix: '°', label: `$\\angle ${tN} =$` })],
        hints: [
          'With parallel lines, the eight angles come in only two sizes: four acute angles that are equal and four obtuse angles that are equal.',
          same ? `Is $\\angle ${tN}$ the same size as $\\angle ${gN}$, or does it make a straight line with an angle that is?` : 'An acute angle and an obtuse angle here always add to $180^\\circ$.',
        ],
        solution: [...steps, rel === 'linear pair' || rel === 'co-interior' ? `$\\angle ${tN} = 180^\\circ - ${deg(gv)} = ${deg(tv)}$` : `$\\angle ${tN} = ${deg(tv)}$`],
      };
    }
    // d3
    if (rng.chance(0.65)) {
      for (let i = 0; i < 300; i++) {
        const theta = rng.intExcept(45, 135, [90]);
        const rel = rng.pick(['corresponding', 'alternate interior', 'alternate exterior', 'co-interior'] as Relation[]);
        const pairs: Array<[Spot, Spot]> = [];
        for (const a of ALL_SPOTS) for (const b of ALL_SPOTS) if (a.at === 'P' && b.at === 'Q' && relationOf(a, b) === rel) pairs.push([a, b]);
        const [sa, sb] = rng.pick(pairs);
        const va = regionMeasure(sa.r, theta, 0);
        const vb = regionMeasure(sb.r, theta, 0);
        const x = rng.int(8, 35);
        let k1 = rng.int(2, 5);
        let k2 = rel === 'co-interior' ? rng.int(1, 4) : rng.intExcept(1, 4, [k1]);
        if (rel !== 'co-interior' && k2 > k1) [k1, k2] = [k2, k1];
        const c1 = va - k1 * x;
        const c2 = vb - k2 * x;
        if (Math.abs(c1) > 60 || Math.abs(c2) > 60 || (c1 === 0 && c2 === 0)) continue;
        const e1 = linExpr(k1, c1);
        const e2 = linExpr(k2, c2);
        const eq = rel === 'co-interior' ? `(${e1}) + (${e2}) = 180` : `${e1} = ${e2}`;
        const labels = { [spotKey(sa)]: exprLabel(k1, c1), [spotKey(sb)]: exprLabel(k2, c2) };
        const ctx = rng.pick([
          'Lines $m$ and $n$ are parallel and $t$ is a transversal.',
          'A straight road $t$ crosses two parallel railway tracks $m$ and $n$.',
          'A diagonal brace $t$ is nailed across two parallel fence rails $m$ and $n$.',
        ]);
        return {
          prompt: `${ctx} Find $x$, then find the measure of the angle labelled $${exprDeg(k1, c1)}$.`,
          figure: transversalFigure({ theta, labels, arcs: Object.keys(labels), marks: true, names: true }),
          parts: [numPart(x, { label: '$x =$' }), numPart(va, { suffix: '°', label: `$${exprDeg(k1, c1)} =$` })],
          hints: [
            rel === 'co-interior' ? 'The two angles are co-interior angles, so they add to $180^\\circ$.' : `The two angles are ${rel} angles, so they are equal.`,
            'Write an equation, solve for $x$, then substitute to find the angle.',
          ],
          solution: [
            `The angles are ${rel} angles, so ${rel === 'co-interior' ? 'they add to $180^\\circ$' : 'they are equal'}: $${eq}$.`,
            ...(rel === 'co-interior' ? solveSum(k1, c1, k2, c2, 180) : solveEqual(k1, c1, k2, c2)),
            `Substitute $x = ${x}$: $${subst(k1, c1, x)} = ${va}$${rel === 'co-interior' ? ` and $${subst(k2, c2, x)} = ${vb}$ (check: $${va} + ${vb} = 180$)` : ` (check: $${subst(k2, c2, x)} = ${vb}$)`}.`,
            `$x = ${x}$ and the angle measures $${deg(va)}$.`,
          ],
        };
      }
      throw new Error('transversal algebra');
    }
    // Applied, two steps.
    const a = rng.intExcept(35, 80, [45, 60]);
    const who = rng.pick(NAMES);
    const ctx = rng.pick([
      {
        p: `${who} is building a set of stairs. The stringer (the sloped board) crosses the parallel floor and upper landing. The stringer makes an angle of $${deg(a)}$ with the floor. What is the obtuse angle between the stringer and the upper landing, on the side under the landing?`,
        v: 180 - a,
        sol: [`The floor and landing are parallel, and the stringer is a transversal.`, `The $${deg(a)}$ angle at the floor and the angle under the landing are co-interior angles (between the parallel lines, same side of the stringer), so they add to $180^\\circ$.`, `$180^\\circ - ${deg(a)} = ${deg(180 - a)}$`],
      },
      {
        p: `Two parallel shelves are joined by a diagonal brace. The brace makes an acute angle of $${deg(a)}$ with the top of the lower shelf. What acute angle does the brace make with the underside of the upper shelf, on the opposite side of the brace?`,
        v: a,
        sol: ['The shelves are parallel and the brace is a transversal.', 'The two angles are alternate interior angles (between the shelves, on opposite sides of the brace), so they are equal.', `The angle is $${deg(a)}$.`],
      },
      {
        p: `A straight road crosses two parallel railway tracks. At the first track, the road makes an acute angle of $${deg(a)}$ with the track. At the second track, a surveyor measures the **obtuse** angle between the road and the track. What does it measure?`,
        v: 180 - a,
        sol: ['The tracks are parallel and the road is a transversal.', `The acute angle at the second track corresponds to the $${deg(a)}$ angle at the first track, so it is also $${deg(a)}$.`, `The obtuse angle at the second track sits next to it on a straight line: $180^\\circ - ${deg(a)} = ${deg(180 - a)}$.`],
      },
    ]);
    return {
      prompt: ctx.p,
      parts: [numPart(ctx.v, { suffix: '°' })],
      hints: ['Find the parallel lines and the transversal in the situation. A quick sketch helps.', 'Equal pairs: corresponding, alternate interior, alternate exterior. Supplementary pairs: co-interior, and angles on a straight line.'],
      solution: [...ctx.sol, `The angle is $${deg(ctx.v)}$.`],
    };
  },
});

/**
 * Options for "are the lines parallel?": exactly one statement is true with the right rule. Every distractor
 * either states a false fact or reaches the wrong conclusion, so none is "right for the wrong reason".
 */
function parallelOptions(rng: Rng, rel: Relation, a: number, b: number, subject = 'lines'): { answer: AnswerSpec; correct: string; parallel: boolean } {
  const co = rel === 'co-interior';
  const sum = a + b;
  const parallel = co ? sum === 180 : a === b;
  const Yes = `Yes, the ${subject} are parallel:`;
  const No = `No, the ${subject} are not parallel:`;
  let correct: string;
  let ds: string[];
  if (co && parallel) {
    correct = `${Yes} the co-interior angles add to $180^\\circ$.`;
    ds = [`${No} the co-interior angles are not equal.`, `${Yes} the co-interior angles are equal.`, `${No} the transversal is not perpendicular to them, so they cannot be parallel.`];
  } else if (co) {
    correct = `${No} the co-interior angles add to $${deg(sum)}$, not $180^\\circ$.`;
    ds = [
      a === b ? `${Yes} the co-interior angles are equal.` : `${Yes} the co-interior angles are close enough to $180^\\circ$.`,
      `${Yes} the co-interior angles add to $180^\\circ$.`,
      a === b ? `${No} the co-interior angles are not equal.` : `${No} the co-interior angles are equal.`,
    ];
  } else if (parallel) {
    correct = `${Yes} the ${rel} angles are equal.`;
    ds = [`${No} the ${rel} angles add to $${deg(sum)}$, not $180^\\circ$.`, `${Yes} the ${rel} angles add to $180^\\circ$.`, `${No} the transversal is not perpendicular to them, so they cannot be parallel.`];
  } else {
    correct = `${No} the ${rel} angles are not equal.`;
    ds = [
      sum === 180 ? `${Yes} the ${rel} angles add to $180^\\circ$.` : `${Yes} the ${rel} angles are close enough to equal.`,
      `${Yes} the ${rel} angles are equal.`,
      sum === 180 ? `${Yes} they look like they will never meet.` : `${No} the ${rel} angles add to $180^\\circ$.`,
    ];
  }
  return { answer: mc(rng, correct, ds), correct, parallel };
}

function nonParallelPair(rng: Rng, rel: Relation, a: number, trap: boolean): number {
  // Returns b for a non-parallel case.
  if (rel === 'co-interior') return trap ? a : 180 - a + rng.pick([-4, -3, -2, 2, 3, 4]);
  return trap ? 180 - a : a + rng.pick([-4, -3, -2, 2, 3, 4]);
}

const parallelTest = skill({
  id: 'm103-parallel-test',
  name: 'Testing for parallel lines',
  description: 'Decide whether two lines are parallel using corresponding, alternate or co-interior angles.',
  outcomes: ['G5'],
  lessonId: 'm103-6-3',
  format: 'mc',
  gen(rng, d) {
    const rel = rng.pick(['corresponding', 'alternate interior', 'alternate exterior', 'co-interior'] as Relation[]);
    const wantParallel = rng.chance(0.5);
    const hints = [
      'Lines are parallel when corresponding angles are equal, when alternate angles are equal, or when co-interior angles add to $180^\\circ$.',
      'Do not trust your eyes: check the angle measures with the rule for this kind of angle pair.',
    ];
    const ruleText = (r: Relation) => (r === 'co-interior' ? 'Co-interior angles must add to $180^\\circ$ for the lines to be parallel.' : `${cap(r)} angles must be equal for the lines to be parallel.`);
    if (d === 1) {
      const a = rng.intExcept(7, 31, [18]) * 5;
      const b = wantParallel ? (rel === 'co-interior' ? 180 - a : a) : nonParallelPair(rng, rel, a, rng.chance(0.5));
      const opts = parallelOptions(rng, rel, a, b);
      return {
        prompt: `A transversal crosses two lines. A pair of **${rel}** angles measure $${deg(a)}$ and $${deg(b)}$. Are the two lines parallel?`,
        parts: [{ answer: opts.answer }],
        hints,
        solution: [ruleText(rel), rel === 'co-interior' ? `$${deg(a)} + ${deg(b)} = ${deg(a + b)}$` : `$${deg(a)}$ and $${deg(b)}$ are ${a === b ? '' : 'not '}equal.`, opts.correct],
        answerDisplay: opts.correct,
      };
    }
    if (d === 2) {
      const theta = rng.intExcept(50, 130, [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]);
      const pairs: Array<[Spot, Spot]> = [];
      for (const s1 of ALL_SPOTS) for (const s2 of ALL_SPOTS) if (s1.at === 'P' && s2.at === 'Q' && relationOf(s1, s2) === rel) pairs.push([s1, s2]);
      const [sa, sb] = rng.pick(pairs);
      const va = regionMeasure(sa.r, theta, 0);
      // Value of the angle at Q when the lines are parallel.
      const vbPar = regionMeasure(sb.r, theta, 0);
      const vb = wantParallel ? vbPar : vbPar + rng.pick([-4, -3, -2, 2, 3, 4]);
      // Tilt line n so the drawn angle at Q is true.
      const tilt = sb.r === 'UR' || sb.r === 'LL' ? theta - vb : vb - 180 + theta;
      const labels = { [spotKey(sa)]: `${va}°`, [spotKey(sb)]: `${vb}°` };
      const opts = parallelOptions(rng, rel, va, vb);
      return {
        prompt: `Line $t$ crosses lines $m$ and $n$. Use the angle measures to decide: are lines $m$ and $n$ parallel?`,
        figure: transversalFigure({ theta, tilt, labels, arcs: Object.keys(labels), names: true }),
        parts: [{ answer: opts.answer }],
        hints,
        solution: [
          `The two marked angles are ${rel} angles: ${RELATION_WHY[rel]}.`,
          ruleText(rel),
          rel === 'co-interior' ? `$${deg(va)} + ${deg(vb)} = ${deg(va + vb)}$` : `$${deg(va)}$ and $${deg(vb)}$ are ${va === vb ? '' : 'not '}equal.`,
          opts.correct,
        ],
        answerDisplay: opts.correct,
      };
    }
    // d3: workplace contexts.
    const who = rng.pick(NAMES);
    const ctxs: Array<{ rel: Relation; subject: string; text: (a: number, b: number) => string }> = [
      {
        rel: 'corresponding',
        subject: 'studs',
        text: (a, b) => `${who} is framing a wall. Two studs are nailed to the bottom plate. Measured on the left side of each stud, the first stud makes an angle of $${deg(a)}$ with the plate and the second makes an angle of $${deg(b)}$. Are the two studs parallel?`,
      },
      {
        rel: 'corresponding',
        subject: 'lines',
        text: (a, b) => `A crew is painting angled parking stalls along a straight curb. Measured on the same side, one stall line makes an angle of $${deg(a)}$ with the curb and the next stall line makes $${deg(b)}$. Are the two stall lines parallel?`,
      },
      {
        rel: 'alternate interior',
        subject: 'rails',
        text: (a, b) => `A diagonal brace runs between the top and bottom rails of a farm gate. Between the rails, on opposite sides of the brace, the brace makes angles of $${deg(a)}$ with the top rail and $${deg(b)}$ with the bottom rail. Are the two rails parallel?`,
      },
      {
        rel: 'co-interior',
        subject: 'shelves',
        text: (a, b) => `${who} installs a sloped support between two shelves. Between the shelves, on the same side of the support, the support makes angles of $${deg(a)}$ with the lower shelf and $${deg(b)}$ with the upper shelf. Are the shelves parallel?`,
      },
      {
        rel: 'alternate exterior',
        subject: 'tracks',
        text: (a, b) => `A straight access road crosses two railway tracks. Outside the tracks, on opposite sides of the road, the road makes angles of $${deg(a)}$ with the first track and $${deg(b)}$ with the second track. Are the tracks parallel?`,
      },
      {
        rel: 'co-interior',
        subject: 'pipes',
        text: (a, b) => `In a pipe rack at a gas plant, a straight support beam crosses two pipes. Between the pipes, on the same side of the beam, the angles are $${deg(a)}$ and $${deg(b)}$. Are the two pipes parallel?`,
      },
    ];
    const c = rng.pick(ctxs);
    const a = c.subject === 'studs' ? rng.pick([86, 87, 88, 89, 91, 92, 93, 94]) : rng.intExcept(38, 142, [90]);
    let b: number;
    if (c.subject === 'studs') b = wantParallel ? a : rng.chance(0.5) ? 180 - a : a + rng.pick([-2, -1, 1, 2]);
    else b = wantParallel ? (c.rel === 'co-interior' ? 180 - a : a) : nonParallelPair(rng, c.rel, a, rng.chance(0.4));
    if (b === 90) b = 91;
    const opts = parallelOptions(rng, c.rel, a, b, c.subject);
    return {
      prompt: c.text(a, b),
      parts: [{ answer: opts.answer }],
      hints: ['Sketch the situation: which two objects play the role of the lines, and which one is the transversal?', `These are ${c.rel} angles. ${ruleText(c.rel)}`],
      solution: [
        `The ${c.subject} are the two lines and the ${c.subject === 'studs' ? 'bottom plate' : c.subject === 'lines' ? 'curb' : c.subject === 'rails' ? 'brace' : c.subject === 'shelves' ? 'support' : c.subject === 'tracks' ? 'road' : 'beam'} is the transversal. The angles are ${c.rel} angles.`,
        ruleText(c.rel),
        c.rel === 'co-interior' ? `$${deg(a)} + ${deg(b)} = ${deg(a + b)}$` : `$${deg(a)}$ and $${deg(b)}$ are ${a === b ? '' : 'not '}equal.`,
        opts.correct,
      ],
      answerDisplay: opts.correct,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.4 — Spatial puzzles and games
// ---------------------------------------------------------------------------

/** Oblique drawing of an a x b x c block divided into unit cubes (a wide, b deep, c tall). */
function blockFigure(a: number, b: number, c: number): PlaneFigure {
  const s = new Sketch();
  const dx = 0.5;
  const dy = 0.4;
  // Front face.
  for (let i = 0; i <= a; i++) s.seg([i, 0], [i, c]);
  for (let j = 0; j <= c; j++) s.seg([0, j], [a, j]);
  // Top face.
  for (let i = 0; i <= a; i++) s.seg([i, c], [i + b * dx, c + b * dy]);
  for (let k = 1; k <= b; k++) s.seg([k * dx, c + k * dy], [a + k * dx, c + k * dy]);
  // Right face.
  for (let j = 0; j < c; j++) s.seg([a, j], [a + b * dx, j + b * dy]);
  for (let k = 1; k <= b; k++) s.seg([a + k * dx, k * dy], [a + k * dx, c + k * dy]);
  return s.build({ margin: 0.5 });
}


const paintedCube = skill({
  id: 'm103-painted-cube',
  name: 'The painted cube puzzle',
  description: 'Count the small cubes with 3, 2, 1 or 0 painted faces when a painted cube or block is cut into unit cubes.',
  outcomes: ['G1'],
  lessonId: 'm103-6-4',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const material = rng.pick(['wooden', 'foam', 'cedar', 'plastic']);
    const colour = rng.pick(['red', 'blue', 'green', 'yellow', 'orange']);
    const counts = (n: number) => ({ 3: 8, 2: 12 * (n - 2), 1: 6 * (n - 2) ** 2, 0: (n - 2) ** 3, total: n ** 3 });
    const where = { 3: 'corners', 2: 'edges (not corners)', 1: 'faces (not on an edge)', 0: 'inside, not touching the surface' } as const;
    const formula = (n: number, k: 0 | 1 | 2 | 3) =>
      k === 3 ? 'A cube always has 8 corners, so 8 small cubes have 3 painted faces.' : k === 2 ? `Each of the 12 edges has $${n} - 2 = ${n - 2}$ cubes between the corners: $12 \\times ${n - 2} = ${12 * (n - 2)}$.` : k === 1 ? `Each of the 6 faces has a $${n - 2} \\times ${n - 2}$ middle square: $6 \\times ${n - 2}^2 = ${6 * (n - 2) ** 2}$.` : `The unpainted cubes form a $${n - 2} \\times ${n - 2} \\times ${n - 2}$ cube inside: $${n - 2}^3 = ${(n - 2) ** 3}$.`;
    const intro = (n: number) => `${who} paints all six faces of a ${material} cube ${colour}. The cube is ${n} cm on each edge. It is then cut into 1 cm cubes${n <= 6 ? ', as shown' : ''}.`;
    const hints = [
      'Think about where each small cube sits: at a corner, along an edge, in the middle of a face, or hidden inside.',
      'Corners have 3 painted faces, edge cubes have 2, face-centre cubes have 1, and inside cubes have 0. Remove the corners from each edge: an edge has $n - 2$ middle cubes.',
    ];
    if (d === 1 || d === 2) {
      const n = d === 1 ? rng.pick([3, 3, 4]) : rng.int(4, 7);
      const k = d === 1 ? rng.pick([3, 2, 1, 0, 'total'] as const) : rng.pick([2, 1, 0, 2, 1] as const);
      const c = counts(n);
      if (k === 'total') {
        return {
          prompt: `${intro(n)} How many 1 cm cubes are there altogether?`,
          figure: blockFigure(n, n, n),
          parts: [numPart(c.total, { suffix: 'cubes' })],
          hints: ['The big cube has $' + n + '$ layers, and each layer is a square of small cubes.', `Total $= ${n} \\times ${n} \\times ${n}$.`],
          solution: [`Each layer has $${n} \\times ${n} = ${n * n}$ cubes and there are $${n}$ layers.`, `$${n}^3 = ${c.total}$`, `There are $${c.total}$ small cubes.`],
        };
      }
      const word = k === 0 ? '**no** painted faces' : `**exactly ${k}** painted face${k === 1 ? '' : 's'}`;
      return {
        prompt: `${intro(n)} How many of the small cubes have ${word}?`,
        figure: n <= 6 ? blockFigure(n, n, n) : undefined,
        parts: [numPart(c[k], { suffix: 'cubes' })],
        hints,
        solution: [`Small cubes with ${k === 0 ? 'no' : k} painted face${k === 1 ? '' : 's'} are on the ${where[k]}.`, formula(n, k), `${plural(c[k], 'small cube')} ${c[k] === 1 ? 'has' : 'have'} ${k === 0 ? 'no' : `exactly ${k}`} painted face${k === 1 ? '' : 's'}.`],
      };
    }
    const mode = rng.pick(['reverse', 'atLeast', 'block'] as const);
    if (mode === 'reverse') {
      const n = rng.int(4, 8);
      const c = counts(n);
      const ask = rng.pick([1, 2, 'total'] as const);
      const v = ask === 'total' ? c.total : c[ask];
      return {
        prompt: `A large ${material} cube is painted ${colour} on all six faces and then cut into identical small cubes. Exactly $${c[0]}$ of the small cubes have no paint at all. How many small cubes ${ask === 'total' ? 'are there altogether' : `have exactly ${ask} painted face${ask === 1 ? '' : 's'}`}?`,
        parts: [numPart(v, { suffix: 'cubes' })],
        hints: [`The unpainted cubes form a cube inside, $(n - 2)$ on each edge. Which number cubed gives $${c[0]}$?`, 'Once you know $n$, use the counting rules: edges $12(n-2)$, faces $6(n-2)^2$, total $n^3$.'],
        solution: [`$${c[0]} = ${n - 2}^3$, so $n - 2 = ${n - 2}$ and the big cube is $${n}$ small cubes on each edge.`, ask === 'total' ? `Total $= ${n}^3 = ${c.total}$` : formula(n, ask), ask === 'total' ? `There are ${c.total} small cubes altogether.` : `${v} small cubes have exactly ${ask} painted face${ask === 1 ? '' : 's'}.`],
      };
    }
    if (mode === 'atLeast') {
      const n = rng.int(4, 9);
      const c = counts(n);
      return {
        prompt: `${who} builds a $${n} \\times ${n} \\times ${n}$ cube from small sugar cubes, dips the whole cube in ${colour} icing on every face, then takes it apart. How many sugar cubes have **at least one** iced face?`,
        parts: [numPart(c.total - c[0], { suffix: 'cubes' })],
        hints: ['It is easier to count the cubes with **no** icing and subtract.', `Total $= n^3$ and no icing $= (n-2)^3$.`],
        solution: [`Total: $${n}^3 = ${c.total}$`, `No icing (the inside cube): $${n - 2}^3 = ${c[0]}$`, `At least one iced face: $${c.total} - ${c[0]} = ${c.total - c[0]}$`, `$${c.total - c[0]}$ sugar cubes have at least one iced face.`],
      };
    }
    for (let i = 0; i < 100; i++) {
      const a = rng.int(3, 6);
      const b = rng.int(3, 5);
      const h = rng.int(3, 5);
      if (a === b && b === h) continue;
      const ask = rng.pick([0, 1, 2] as const);
      const v0 = (a - 2) * (b - 2) * (h - 2);
      const v1 = 2 * ((a - 2) * (b - 2) + (a - 2) * (h - 2) + (b - 2) * (h - 2));
      const v2 = 4 * ((a - 2) + (b - 2) + (h - 2));
      const v = ask === 0 ? v0 : ask === 1 ? v1 : v2;
      const sol =
        ask === 0
          ? [`The unpainted cubes form an inner block $${a - 2} \\times ${b - 2} \\times ${h - 2}$.`, `$${a - 2} \\times ${b - 2} \\times ${h - 2} = ${v0}$`]
          : ask === 1
            ? [
                'Each face has a middle rectangle (remove the outer ring of cubes). Opposite faces match, so count each kind twice.',
                `$2(${a - 2} \\times ${b - 2}) + 2(${a - 2} \\times ${h - 2}) + 2(${b - 2} \\times ${h - 2}) = ${2 * (a - 2) * (b - 2)} + ${2 * (a - 2) * (h - 2)} + ${2 * (b - 2) * (h - 2)} = ${v1}$`,
              ]
            : ['The block has 12 edges: 4 of each length. Remove the 2 corner cubes from each edge.', `$4(${a - 2}) + 4(${b - 2}) + 4(${h - 2}) = ${v2}$`];
      return {
        prompt: `A rectangular block of wood measures $${a}\\ \\text{cm} \\times ${b}\\ \\text{cm} \\times ${h}\\ \\text{cm}$. ${who} paints every face, then cuts the block into 1 cm cubes. How many cubes have ${ask === 0 ? '**no** painted faces' : `**exactly ${ask}** painted face${ask === 1 ? '' : 's'}`}?`,
        figure: blockFigure(a, b, h),
        parts: [numPart(v, { suffix: 'cubes' })],
        hints: ['Use the same idea as the painted cube: corners, edges, faces and inside.', 'Along each dimension, remove the 2 cubes at the ends: use $a-2$, $b-2$ and $c-2$.'],
        solution: [...sol, `${plural(v, 'cube')} ${v === 1 ? 'has' : 'have'} ${ask === 0 ? 'no' : `exactly ${ask}`} painted face${ask === 1 ? '' : 's'}.`],
      };
    }
    throw new Error('block');
  },
});

/** Grid of a rows x b columns of unit squares. */
function gridFigure(rows: number, cols: number): PlaneFigure {
  const s = new Sketch();
  for (let i = 0; i <= cols; i++) s.seg([i, 0], [i, rows]);
  for (let j = 0; j <= rows; j++) s.seg([0, j], [cols, j]);
  return s.build({ margin: 0.5 });
}

const tri = (n: number) => (n * (n + 1)) / 2;

const countSquares = skill({
  id: 'm103-count-squares',
  name: 'Counting squares and rectangles',
  description: 'Count all the squares (or rectangles) of every size in a grid using a systematic list.',
  outcomes: ['G1'],
  lessonId: 'm103-6-4',
  gen(rng, d) {
    const ctx = (r: number, c: number) =>
      rng.pick([
        `A tile floor is laid out as a $${r} \\times ${c}$ grid of square tiles.`,
        `A window has a $${r} \\times ${c}$ grid of square panes.`,
        `A community garden is divided into a $${r} \\times ${c}$ grid of square plots.`,
        `A wall of glass blocks is ${r} blocks high and ${c} blocks wide.`,
      ]);
    if (d === 1 && rng.chance(0.4)) {
      const n = rng.int(3, 5);
      const k = rng.int(2, n - 1);
      const v = (n - k + 1) ** 2;
      return {
        prompt: `${ctx(n, n)} How many **${k} × ${k}** squares can you find in the grid?`,
        figure: gridFigure(n, n),
        parts: [numPart(v, { suffix: 'squares' })],
        hints: [`Slide a ${k} × ${k} square across one row: how many positions does it have?`, `It fits in $${n} - ${k} + 1 = ${n - k + 1}$ positions across and $${n - k + 1}$ positions down.`],
        solution: [`Across: $${n} - ${k} + 1 = ${n - k + 1}$ positions. Down: $${n - k + 1}$ positions.`, `$${n - k + 1} \\times ${n - k + 1} = ${v}$`, `There are $${v}$ squares of size ${k} × ${k}.`],
      };
    }
    if (d === 1 || d === 2) {
      const square = d === 1 || rng.chance(0.5);
      const r = d === 1 ? rng.int(2, 4) : square ? rng.int(5, 8) : rng.int(2, 4);
      const c = square ? r : r + rng.int(1, 3);
      const terms: Array<{ k: number; n: number }> = [];
      for (let k = 1; k <= Math.min(r, c); k++) terms.push({ k, n: (r - k + 1) * (c - k + 1) });
      const total = terms.reduce((s, t) => s + t.n, 0);
      const chess = square && r === 8;
      return {
        prompt: chess ? 'A chessboard is an $8 \\times 8$ grid of squares. How many squares of **all sizes** are on a chessboard?' : `${ctx(r, c)} How many squares of **all sizes** are in the grid?`,
        figure: chess ? undefined : gridFigure(r, c),
        parts: [numPart(total, { suffix: 'squares' })],
        hints: ['Count systematically: first the 1 × 1 squares, then the 2 × 2 squares, and so on up to the largest square.', square ? `In an $n \\times n$ grid there are $(n - k + 1)^2$ squares of size $k \\times k$.` : `A $k \\times k$ square fits in $(${r} - k + 1) \\times (${c} - k + 1)$ positions.`],
        solution: [
          ...terms.map((t) => `${t.k} × ${t.k} squares: $${r - t.k + 1} \\times ${c - t.k + 1} = ${t.n}$`),
          `Total: $${terms.map((t) => t.n).join(' + ')} = ${total}$`,
          `There are $${total}$ squares altogether.`,
        ],
      };
    }
    // d3: rectangles
    const r = rng.int(2, 4);
    const c = r + rng.int(0, 3);
    const rects = tri(r) * tri(c);
    let sq = 0;
    for (let k = 1; k <= Math.min(r, c); k++) sq += (r - k + 1) * (c - k + 1);
    const notSquare = rng.chance(0.4);
    const v = notSquare ? rects - sq : rects;
    return {
      prompt: `${ctx(r, c)} How many ${notSquare ? '**rectangles that are not squares**' : '**rectangles** of all sizes (squares count as rectangles)'} are in the grid?`,
      figure: gridFigure(r, c),
      parts: [numPart(v, { suffix: 'rectangles' })],
      hints: [
        'A rectangle is fixed by choosing 2 of the vertical grid lines and 2 of the horizontal grid lines.',
        `There are $${c + 1}$ vertical lines and $${r + 1}$ horizontal lines. The number of ways to choose 2 lines from $L$ lines is $\\dfrac{L(L-1)}{2}$.`,
      ],
      solution: [
        `Pairs of vertical lines: $\\dfrac{${c + 1} \\times ${c}}{2} = ${tri(c)}$. Pairs of horizontal lines: $\\dfrac{${r + 1} \\times ${r}}{2} = ${tri(r)}$.`,
        `Rectangles: $${tri(c)} \\times ${tri(r)} = ${rects}$`,
        ...(notSquare ? [`Squares (counted by size): $${sq}$`, `Rectangles that are not squares: $${rects} - ${sq} = ${v}$`] : []),
        `There are $${v}$ ${notSquare ? 'rectangles that are not squares' : 'rectangles'}.`,
      ],
    };
  },
});

// Dice and nets ------------------------------------------------------------------

/** The 11 nets of a cube as [column, row] cells. */
const NETS: Array<Array<[number, number]>> = [
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

/** Fold a net by rolling a cube across it; returns the cube face (0-5) under each cell. Opposite faces are (0,1), (2,3), (4,5). */
function foldNet(cells: Array<[number, number]>): number[] {
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
  return faces;
}

/** Index of the cell opposite each cell after folding. */
function oppositeCells(cells: Array<[number, number]>): number[] {
  const f = foldNet(cells);
  return f.map((face) => f.indexOf(face ^ 1));
}

/** Random rotation / reflection of a net, shifted to start at (0, 0). */
function transformNet(rng: Rng, cells: Array<[number, number]>): Array<[number, number]> {
  const rot = rng.int(0, 3);
  const flip = rng.chance(0.5);
  let out = cells.map(([x, y]) => [flip ? -x : x, y] as [number, number]);
  for (let i = 0; i < rot; i++) out = out.map(([x, y]) => [-y, x] as [number, number]);
  const mx = Math.min(...out.map((c) => c[0]));
  const my = Math.min(...out.map((c) => c[1]));
  return out.map(([x, y]) => [x - mx, y - my] as [number, number]);
}

function netFigure(cells: Array<[number, number]>, labels: string[]): PlaneFigure {
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
  cells.forEach(([x, y], i) => s.textAt([x + 0.5, y + 0.5], labels[i]));
  return s.build({ margin: 0.4 });
}

/** A standard die numbering for a net: opposite cells sum to 7. */
function dieNumbers(rng: Rng, cells: Array<[number, number]>): number[] {
  const opp = oppositeCells(cells);
  const nums = new Array<number>(6).fill(0);
  const pairs = rng.shuffle([
    [1, 6],
    [2, 5],
    [3, 4],
  ]);
  let p = 0;
  for (let i = 0; i < 6; i++) {
    if (nums[i]) continue;
    const [u, v] = rng.chance(0.5) ? pairs[p] : [pairs[p][1], pairs[p][0]];
    nums[i] = u;
    nums[opp[i]] = v;
    p++;
  }
  return nums;
}

const isStandard = (cells: Array<[number, number]>, nums: number[]) => {
  const opp = oppositeCells(cells);
  return nums.every((n, i) => n + nums[opp[i]] === 7);
};

const diceCube = skill({
  id: 'm103-dice-cube',
  name: 'Dice puzzles',
  description: 'Use the fact that opposite faces of a standard die add to 7 to solve dice and net puzzles.',
  outcomes: ['G1'],
  lessonId: 'm103-6-4',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const rule = 'On a standard die, opposite faces always add to 7: 1 is opposite 6, 2 is opposite 5, and 3 is opposite 4.';
    if (d === 1) {
      const t = rng.int(1, 6);
      const mode = rng.pick(['opposite', 'bottom', 'sum'] as const);
      if (mode === 'sum') {
        return {
          prompt: `${who} adds up the numbers on all six faces of a standard die. What is the total?`,
          parts: [numPart(21)],
          hints: ['A die has three pairs of opposite faces.', 'Each pair of opposite faces adds to 7.'],
          solution: [rule, '$3 \\times 7 = 21$ (or $1 + 2 + 3 + 4 + 5 + 6 = 21$).', 'The total is $21$.'],
        };
      }
      return {
        prompt: mode === 'opposite' ? `On a standard die, what number is on the face opposite the $${t}$?` : `${who} rolls a standard die and it lands with $${t}$ on top. What number is on the bottom face, touching the table?`,
        parts: [numPart(7 - t)],
        hints: ['Opposite faces of a standard die add to 7.', `Subtract $${t}$ from 7.`],
        solution: [rule, `$7 - ${t} = ${7 - t}$`, `The ${mode === 'opposite' ? 'opposite' : 'bottom'} face shows $${7 - t}$.`],
      };
    }
    if (d === 2) {
      const k = rng.int(2, 4);
      const t = rng.int(1, 6);
      if (rng.chance(0.5)) {
        const hidden = 7 * k - t;
        return {
          prompt: `${who} stacks ${k} standard dice in a tower on a table. The top face of the tower shows $${t}$. Find the total of the numbers on all the **hidden** faces (the faces that touch another die or the table).`,
          parts: [numPart(hidden)],
          hints: ['Every die below the top die has both its top and bottom hidden. Those two faces are opposite, so they add to 7.', `The top die has only its bottom hidden: that face is $7 - ${t}$.`],
          solution: [
            rule,
            `The ${k - 1} lower ${k - 1 === 1 ? 'die has' : 'dice each have'} a hidden top and bottom: $${k - 1} \\times 7 = ${7 * (k - 1)}$.`,
            `The top die has its bottom hidden: $7 - ${t} = ${7 - t}$.`,
            `Hidden total: $${7 * (k - 1)} + ${7 - t} = ${hidden}$`,
          ],
        };
      }
      const visible = 14 * k + t;
      return {
        prompt: `${who} stacks ${k} standard dice in a tower on a table and walks all the way around it. The top face shows $${t}$. What is the total of all the numbers ${who} can see (the four sides of every die plus the top)?`,
        parts: [numPart(visible)],
        hints: ['The four side faces of a die are two pairs of opposite faces.', 'Each pair adds to 7, so the four sides of one die add to 14.'],
        solution: [rule, `Sides of each die: $7 + 7 = 14$, so the sides of ${k} dice add to $${k} \\times 14 = ${14 * k}$.`, `Add the top face: $${14 * k} + ${t} = ${visible}$`, `The visible total is $${visible}$.`],
      };
    }
    // d3
    const mode = rng.pick(['net', 'blank', 'tower'] as const);
    if (mode === 'tower') {
      const k = rng.int(3, 5);
      const t = rng.int(1, 6);
      const hidden = 7 * k - t;
      return {
        prompt: `In a game, ${k} standard dice are stacked in a tower on a table. The total of all the hidden faces (faces touching another die or the table) is $${hidden}$. What number is on the top face of the tower?`,
        parts: [numPart(t)],
        hints: ['Each lower die hides a pair of opposite faces, which adds to 7. The top die hides only its bottom face.', `Hidden total $= 7 \\times (\\text{number of lower dice}) + (7 - \\text{top})$.`],
        solution: [
          rule,
          `The ${k - 1} lower dice hide $${k - 1} \\times 7 = ${7 * (k - 1)}$.`,
          `So the bottom of the top die is $${hidden} - ${7 * (k - 1)} = ${7 - t}$.`,
          `The top face is opposite the bottom: $7 - ${7 - t} = ${t}$.`,
        ],
      };
    }
    const cells = transformNet(rng, rng.pick(NETS));
    const nums = dieNumbers(rng, cells);
    if (mode === 'blank') {
      const blank = rng.int(0, 5);
      const opp = oppositeCells(cells);
      const labels = nums.map((n, i) => (i === blank ? '?' : String(n)));
      return {
        prompt: 'This net folds into a standard die. What number belongs on the face marked **?**',
        figure: netFigure(cells, labels),
        parts: [numPart(nums[blank])],
        hints: ['Imagine folding the net. Faces that are one square apart in a straight row of three end up opposite each other.', 'Find the face that will be opposite the **?** face. Opposite faces add to 7.'],
        solution: [rule, `When the net is folded, the **?** face is opposite the face showing $${nums[opp[blank]]}$.`, `$7 - ${nums[opp[blank]]} = ${nums[blank]}$`, `The missing number is $${nums[blank]}$.`],
      };
    }
    // Which net is a standard die?
    const opts: Array<{ md: string; figure: Figure; correct?: boolean; nums: number[]; cells: Array<[number, number]> }> = [
      { md: '', figure: netFigure(cells, nums.map(String)), correct: true, nums, cells },
    ];
    for (let tries = 0; tries < 200 && opts.length < 4; tries++) {
      const c2 = rng.chance(0.5) ? cells : transformNet(rng, rng.pick(NETS));
      const base = dieNumbers(rng, c2);
      const opp = oppositeCells(c2);
      // Swap two numbers that are not opposite each other.
      const i = rng.int(0, 5);
      const j = rng.intExcept(0, 5, [i, opp[i]]);
      const bad = base.slice();
      [bad[i], bad[j]] = [bad[j], bad[i]];
      if (isStandard(c2, bad)) continue;
      const fig = netFigure(c2, bad.map(String));
      if (opts.some((o) => JSON.stringify(o.figure) === JSON.stringify(fig))) continue;
      opts.push({ md: '', figure: fig, nums: bad, cells: c2 });
    }
    const answer = mcFigures(
      rng,
      opts.map(({ md, figure, correct }) => ({ md, figure, correct })),
    );
    if (answer.kind === 'mc') answer.choices.forEach((c, i) => (c.md = `Net ${String.fromCharCode(65 + i)}`));
    const correctLabel = answer.kind === 'mc' ? answer.choices.find((c) => c.id === answer.correct)!.md : '';
    const describe = (o: (typeof opts)[number]) => {
      const opp = oppositeCells(o.cells);
      const seen = new Set<number>();
      const pairs: string[] = [];
      o.nums.forEach((n, i) => {
        if (seen.has(i)) return;
        seen.add(i);
        seen.add(opp[i]);
        pairs.push(`$${n}$ and $${o.nums[opp[i]]}$`);
      });
      return pairs.join(', ');
    };
    return {
      prompt: 'Which net folds into a **standard die**, where opposite faces add to 7?',
      parts: [{ answer }],
      hints: ['In a straight row of three squares, the first and third squares end up opposite each other when folded.', 'For each net, find the three pairs of opposite faces and check that every pair adds to 7.'],
      solution: [rule, `In ${correctLabel}, the opposite pairs are ${describe(opts[0])}. Every pair adds to 7.`, 'In each of the other nets, at least one pair of opposite faces does not add to 7.', `${correctLabel} folds into a standard die.`],
      answerDisplay: correctLabel,
    };
  },
});

export const ANGLE_SKILLS: SkillDef[] = [
  angleClassify,
  angleMeasure,
  compSupp,
  verticalAngles,
  bisect,
  transversalName,
  transversalAngles,
  parallelTest,
  paintedCube,
  countSquares,
  diceCube,
];
