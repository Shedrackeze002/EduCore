/** Math 10-4 Unit 7 — Perimeter, Area and Volume (SS2, PR2). */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef, SolidFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia', 'Yusuf', 'Brooklyn', 'Sanjay',
];

const tx = (u: string) => `\\text{${u}}`;
const sq = (u: string) => `\\text{${u}}^2`;
const cu = (u: string) => `\\text{${u}}^3`;

function grp(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const g = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits;
  return `${neg ? '-' : ''}${g}${f !== undefined ? '.' + f : ''}`;
}
/** A number inside maths, without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** Rounded to exactly dp places, inside maths. */
const nf = (x: number, dp: number) => grp(fmtFixed(x, dp));
/** Measurement as inline maths: $12\ \text{m}$. */
const Q = (x: number, u: string) => `$${nm(x)}\\ ${tx(u)}$`;
/** Area as inline maths: $12\ \text{m}^2$. */
const A2 = (x: number, u: string, dp = 4) => `$${nm(x, dp)}\\ ${sq(u)}$`;
/** Volume as inline maths. */
const V3 = (x: number, u: string) => `$${nm(x)}\\ ${cu(u)}$`;
/** Plain-text label for figures: "12 m". */
const lab = (x: number, u: string) => `${fmt(x)} ${u}`;
const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
const moneyPart = (v: number, label = 'Cost: \\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
const CENT = 'to the nearest cent';

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}
/** An exact numeric answer; decimal answers keep their decimal form for display. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: d, tolerance: 0.5 * 10 ** -d });
}
/** True when v sits too close to a rounding boundary at dp places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** A decimal with one place in [lo, hi] that is not a whole number. */
function tenths(rng: Rng, lo: number, hi: number): number {
  return retry(() => rng.int(Math.round(lo * 10), Math.round(hi * 10)) / 10, (v) => !Number.isInteger(v));
}

// ---------------------------------------------------------------------------
// Drawings: shapes with side labels on a plane with no axes.
// Coordinates are pixels (y up) inside a 340-pixel-wide canvas, so the label
// offsets used by the plane renderer (8 px right, 8 px up) can be undone exactly.
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';
interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

const CANVAS = 340;
const r2 = (v: number) => Math.round(v * 100) / 100;

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
  const corners: P[] = [
    [box.x0, box.y0],
    [box.x0, box.y1],
    [box.x1, box.y0],
    [box.x1, box.y1],
  ];
  return Math.min(...corners.map((c) => distPtSeg(c, a, b)), distPtBox(a, box), distPtBox(b, box));
}
function distBoxBox(p: Box, q: Box): number {
  return Math.hypot(Math.max(q.x0 - p.x1, p.x0 - q.x1, 0), Math.max(q.y0 - p.y1, p.y0 - q.y1, 0));
}
/** Approximate width (px) of a 12 px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' || ch === '.' ? 3.6 : ch === 'm' ? 10.8 : ch === 'i' || ch === 'l' ? 3.6 : ch === 'f' || ch === 't' ? 4.4 : 7;
  return w;
}

class Drawing {
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private segs: PlaneSegment[] = [];
  private dots: P[] = [];
  private obstacles: Array<[P, P]> = [];
  private labels: Array<{ text: string; box: Box; anchor: P }> = [];

  poly(points: P[], closed = true, color?: Color): this {
    const pts = closed ? [...points, points[0]] : points;
    this.polys.push({ points: pts, color });
    for (let i = 0; i + 1 < pts.length; i++) this.obstacles.push([pts[i], pts[i + 1]]);
    return this;
  }

  seg(a: P, b: P, opts: { color?: Color; dashed?: boolean } = {}): this {
    this.segs.push({ from: a, to: b, ...opts });
    this.obstacles.push([a, b]);
    return this;
  }

  dot(p: P): this {
    this.dots.push(p);
    return this;
  }

  /** Small square marking a right angle at v, with legs along unit vectors u and w. */
  rightMark(v: P, u: P, w: P, s = 10): this {
    const p1: P = [v[0] + u[0] * s, v[1] + u[1] * s];
    const p3: P = [v[0] + w[0] * s, v[1] + w[1] * s];
    const p2: P = [p1[0] + w[0] * s, p1[1] + w[1] * s];
    return this.poly([p1, p2, p3], false, 'accent');
  }

  /** A label beside segment a-b, on the side the unit normal n points to (or the other side if that is crowded). */
  sideLabel(a: P, b: P, text: string, n: P, bothSides = false): this {
    const mid: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const t: P = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
    const hw = textWidth(text) / 2 + 2;
    const cands: P[] = [];
    for (const dir of bothSides ? [1, -1] : [1]) {
      const nn: P = [n[0] * dir, n[1] * dir];
      const base = Math.abs(nn[0]) * hw + Math.abs(nn[1]) * 7 + 4;
      for (const extra of [0, 3, 6, 9, 12, 16, 20, 26, 34])
        for (const s of [0, 8, -8, 16, -16, 26, -26]) cands.push([mid[0] + nn[0] * (base + extra) + t[0] * s, mid[1] + nn[1] * (base + extra) + t[1] * s]);
    }
    return this.place(text, cands);
  }

  /** A label as close as possible to c. */
  labelNear(c: P, text: string): this {
    const cands: P[] = [];
    for (const r of [0, 6, 12, 18, 26])
      for (let k = 0; k < 8; k++) cands.push([c[0] + r * Math.cos((k * Math.PI) / 4), c[1] + r * Math.sin((k * Math.PI) / 4)]);
    return this.place(text, cands);
  }

  private place(text: string, cands: P[]): this {
    const wpx = textWidth(text);
    const hw = wpx / 2 + 2;
    let best: { score: number; box: Box; anchor: P } | null = null;
    for (const c of cands) {
      const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - 7, y1: c[1] + 7 };
      // The renderer draws the text 8 px right of and 8 px above its (invisible) anchor point.
      const anchor: P = [c[0] - 8 - wpx / 2, c[1] - 12.3];
      let score = 99;
      for (const [a, b] of this.obstacles) score = Math.min(score, distSegBox(a, b, box) - 3, distPtSeg(anchor, a, b) - 6);
      for (const l of this.labels) score = Math.min(score, distBoxBox(l.box, box) - 3, distPtBox(anchor, l.box) - 6);
      for (const d of this.dots) score = Math.min(score, distPtBox(d, box) - 6, Math.hypot(anchor[0] - d[0], anchor[1] - d[1]) - 10);
      if (!best || score > best.score) best = { score, box, anchor };
      if (score >= 0) break;
    }
    if (best) this.labels.push({ text, box: best.box, anchor: best.anchor });
    return this;
  }

  /** The finished figure, or null when it is wider than the canvas. */
  build(caption: string): PlaneFigure | null {
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
    for (const d of this.dots) add(d, 5);
    for (const l of this.labels) {
      add([l.box.x0, l.box.y0]);
      add([l.box.x1, l.box.y1]);
      add(l.anchor, 5);
    }
    const M = 6;
    const minX = Math.min(...xs) - M;
    const maxX = Math.max(...xs) + M;
    const minY = Math.min(...ys) - M;
    const maxY = Math.max(...ys) + M;
    const w = maxX - minX;
    if (w > CANVAS) return null;
    const H = Math.ceil(maxY - minY);
    const ox = minX - (CANVAS - w) / 2;
    const oy = minY;
    const T = (p: P): [number, number] => [r2(p[0] - ox), r2(p[1] - oy)];
    const points: PlanePoint[] = [
      ...this.dots.map((d) => {
        const [x, y] = T(d);
        return { x, y, color: 'brand' as const };
      }),
      ...this.labels.map((l) => {
        const [x, y] = T(l.anchor);
        return { x, y, label: l.text, color: 'muted' as const, open: true };
      }),
    ];
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax: CANVAS, yMin: 0, yMax: H, step: Math.max(CANVAS, H) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}) })),
      caption,
    };
    if (this.segs.length) fig.segments = this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) }));
    if (points.length) fig.points = points;
    return fig;
  }
}

/** Build a drawing at full size, shrinking it if the labels make it too wide. */
function render(make: (scale: number) => Drawing, caption: string): PlaneFigure {
  for (const s of [1, 0.9, 0.8, 0.7, 0.6, 0.5]) {
    const f = make(s).build(caption);
    if (f) return f;
  }
  return make(0.4).build(caption)!;
}

/** Scale real coordinates to fit a box of maxW × maxH pixels (uniform scale). */
function fit(pts: P[], maxW: number, maxH: number): P[] {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const w = Math.max(...xs) - x0 || 1;
  const h = Math.max(...ys) - y0 || 1;
  const k = Math.min(maxW / w, maxH / h);
  return pts.map(([x, y]) => [(x - x0) * k, (y - y0) * k]);
}

/** Outward unit normals for each side of a polygon (works for L-shapes too). */
function outward(pts: P[]): P[] {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    area += x1 * y2 - x2 * y1;
  }
  const ccw = area > 0;
  return pts.map((a, i) => {
    const b = pts[(i + 1) % pts.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const L = Math.hypot(dx, dy) || 1;
    return ccw ? [dy / L, -dx / L] : [-dy / L, dx / L];
  });
}

/** A polygon (real coordinates) with a label on each side (null for no label). */
function polyFig(real: P[], labels: Array<string | null>, caption: string): PlaneFigure {
  return render((s) => {
    const pts = fit(real, 200 * s, 150 * s);
    const d = new Drawing().poly(pts);
    const ns = outward(pts);
    pts.forEach((a, i) => {
      const t = labels[i];
      if (t) d.sideLabel(a, pts[(i + 1) % pts.length], t, ns[i]);
    });
    return d;
  }, caption);
}

/** A rectangle drawn with a sensible shape; labels on the bottom and right (or all four) sides. */
function rectFig(l: number, w: number, lLab: string, wLab: string, caption: string, all = false): PlaneFigure {
  const r = Math.min(Math.max(w / l, 0.35), 1.6);
  const real: P[] = [
    [0, 0],
    [1, 0],
    [1, r],
    [0, r],
  ];
  return polyFig(real, [lLab, wLab, all ? lLab : null, all ? wLab : null], caption);
}

/** A triangle from its three sides: base c on the bottom, side b on the left, side a on the right. */
function triFig(a: number, b: number, c: number, labels: [string, string, string], caption: string): PlaneFigure {
  const x = (b * b + c * c - a * a) / (2 * c);
  const y = Math.sqrt(Math.max(b * b - x * x, 0.01 * c * c));
  return polyFig(
    [
      [0, 0],
      [c, 0],
      [x, y],
    ],
    [labels[2], labels[0], labels[1]],
    caption,
  );
}

/** A regular polygon with one side labelled. */
function regularFig(n: number, sLab: string, caption: string): PlaneFigure {
  const real: P[] = [];
  const start = -Math.PI / 2 - Math.PI / n;
  for (let i = 0; i < n; i++) real.push([Math.cos(start + (2 * Math.PI * i) / n), Math.sin(start + (2 * Math.PI * i) / n)]);
  return render((s) => {
    const pts = fit(real, 150 * s, 150 * s);
    const d = new Drawing().poly(pts);
    const ns = outward(pts);
    d.sideLabel(pts[0], pts[1], sLab, ns[0]);
    return d;
  }, caption);
}

/** A triangle for area: base along the bottom, apex above x = p·base, dashed height (or a right angle when p = 0). */
function triAreaFig(bLab: string, hLab: string, ratio: number, p: number, caption: string): PlaneFigure {
  return render((s) => {
    const B = 200 * s;
    const H = Math.min(150 * s, Math.max(70 * s, B * ratio));
    const apex: P = [p * B, H];
    const d = new Drawing().poly([[0, 0], [B, 0], apex]);
    d.sideLabel([0, 0], [B, 0], bLab, [0, -1]);
    if (p === 0) {
      d.rightMark([0, 0], [1, 0], [0, 1]);
      d.sideLabel([0, 0], apex, hLab, [-1, 0]);
    } else {
      d.seg([p * B, 0], apex, { color: 'accent', dashed: true });
      d.rightMark([p * B, 0], [1, 0], [0, 1]);
      d.sideLabel([p * B, 0], apex, hLab, [1, 0], true);
    }
    return d;
  }, caption);
}

/** A circle with its diameter or radius drawn and labelled. */
function circleFig(text: string, show: 'd' | 'r', caption: string): PlaneFigure {
  return render((s) => {
    const R = 75 * s;
    const pts: P[] = [];
    for (let i = 0; i < 48; i++) pts.push([R * Math.cos((2 * Math.PI * i) / 48), R * Math.sin((2 * Math.PI * i) / 48)]);
    const d = new Drawing().poly(pts);
    if (show === 'd') d.seg([-R, 0], [R, 0], { color: 'accent' });
    else d.seg([0, 0], [R, 0], { color: 'accent' });
    d.dot([0, 0]);
    if (show === 'd') d.sideLabel([-R, 0], [R, 0], text, [0, 1]);
    else d.sideLabel([0, 0], [R, 0], text, [0, 1]);
    return d;
  }, caption);
}

const prismFig = (l: string, w: string, h: string): SolidFigure => ({ type: 'solid', shape: 'rectPrism', labels: { l, w, h } });

// ---------------------------------------------------------------------------
// 7.1 Perimeter
// ---------------------------------------------------------------------------

interface RectCtx {
  thing: string;
  job: string;
  u: string;
  l: [number, number];
  w: [number, number];
  step: number;
}

const RECTS: RectCtx[] = [
  { thing: 'vegetable garden', job: 'edging', u: 'm', l: [5, 12], w: [2, 6], step: 1 },
  { thing: 'dog run', job: 'fencing', u: 'm', l: [8, 16], w: [3, 7], step: 1 },
  { thing: 'bulletin board', job: 'border trim', u: 'cm', l: [9, 15], w: [6, 9], step: 10 },
  { thing: 'bedroom floor', job: 'baseboard', u: 'm', l: [4, 6], w: [3, 4], step: 1 },
  { thing: 'window', job: 'trim', u: 'cm', l: [8, 15], w: [5, 12], step: 10 },
  { thing: 'backyard rink', job: 'boards', u: 'm', l: [12, 20], w: [6, 10], step: 1 },
  { thing: 'picture frame', job: 'wood moulding', u: 'cm', l: [6, 12], w: [4, 8], step: 5 },
  { thing: 'horse paddock', job: 'fencing', u: 'm', l: [20, 40], w: [10, 25], step: 1 },
];

const HINT_P = 'Perimeter is the total distance around the outside of a shape. Add the lengths of all the sides.';

function rectP(rng: Rng, name: string): GenOutput {
  const c = rng.pick(RECTS);
  if (rng.chance(0.3)) {
    const s = rng.int(c.w[0], c.l[1]) * c.step;
    const P = 4 * s;
    return {
      prompt: `${name} is putting ${c.job} around a square ${c.thing}. Each side is ${Q(s, c.u)} long. What is the perimeter of the ${c.thing}?`,
      figure: rectFig(1, 1, lab(s, c.u), lab(s, c.u), `square ${c.thing}`),
      parts: [numPart(P, { suffix: c.u })],
      hints: [HINT_P, 'A square has $4$ sides that are all the same length. Multiply the side by $4$: $P = 4s$.'],
      solution: ['A square has $4$ equal sides.', `$P = 4 \\times ${s} = ${P}$`, `The perimeter is ${Q(P, c.u)}. That is how much ${c.job} ${name} needs.`],
      answerDisplay: Q(P, c.u),
    };
  }
  const lU = rng.int(c.l[0], c.l[1]);
  const l = lU * c.step;
  const w = rng.int(c.w[0], Math.min(c.w[1], lU - 1)) * c.step;
  const P = 2 * (l + w);
  return {
    prompt: `${name} is putting ${c.job} around a rectangular ${c.thing}. It measures ${Q(l, c.u)} by ${Q(w, c.u)}. What is the perimeter of the ${c.thing}?`,
    figure: rectFig(l, w, lab(l, c.u), lab(w, c.u), `rectangular ${c.thing}`),
    parts: [numPart(P, { suffix: c.u })],
    hints: [HINT_P, 'A rectangle has two long sides that match and two short sides that match. Add all four: $l + w + l + w$.'],
    solution: [`The sides are ${Q(l, c.u)}, ${Q(w, c.u)}, ${Q(l, c.u)} and ${Q(w, c.u)}.`, `$P = ${l} + ${w} + ${l} + ${w} = ${P}$`, `The perimeter is ${Q(P, c.u)}. That is how much ${c.job} ${name} needs.`],
    answerDisplay: Q(P, c.u),
  };
}

function triP(rng: Rng): GenOutput {
  const c = rng.pick([
    { thing: 'triangular flower bed', job: 'edging', u: 'm', lo: 2, hi: 7 },
    { thing: 'triangular sail on a sailboat', job: 'a rope border', u: 'm', lo: 2, hi: 6 },
    { thing: 'triangular corner shelf', job: 'trim', u: 'cm', lo: 30, hi: 80 },
    { thing: 'triangular pennant for a sports team', job: 'ribbon', u: 'cm', lo: 20, hi: 60 },
    { thing: 'triangular lot', job: 'fencing', u: 'm', lo: 15, hi: 40 },
  ]);
  const dec = c.hi <= 10;
  const pick = () => (dec ? tenths(rng, c.lo, c.hi) : rng.int(c.lo, c.hi));
  const [a, b, cc] = retry(
    () => [pick(), pick(), pick()],
    ([a, b, cc]) => a + b > cc * 1.25 && a + cc > b * 1.25 && b + cc > a * 1.25,
  );
  const P = clean(a + b + cc);
  return {
    prompt: `A ${c.thing} has sides of ${Q(a, c.u)}, ${Q(b, c.u)} and ${Q(cc, c.u)}. How much ${c.job} goes around it?`,
    figure: triFig(a, b, cc, [lab(a, c.u), lab(b, c.u), lab(cc, c.u)], c.thing),
    parts: [exact(P, c.u)],
    hints: [HINT_P, 'A triangle has $3$ sides. Add them. Line up the decimal points if you add by hand.'],
    solution: [`$P = ${nm(a)} + ${nm(b)} + ${nm(cc)}$`, `$P = ${nm(P)}$`, `The ${c.job} must be ${Q(P, c.u)} long.`],
    answerDisplay: Q(P, c.u),
  };
}

function regularP(rng: Rng): GenOutput {
  const c = rng.pick([
    { n: 6, shape: 'regular hexagon', thing: 'gazebo floor', job: 'trim', u: 'm', lo: 1.2, hi: 2.8 },
    { n: 8, shape: 'regular octagon', thing: 'stop sign', job: 'reflective tape', u: 'cm', lo: 25, hi: 32 },
    { n: 5, shape: 'regular pentagon', thing: 'sandbox', job: 'a wooden border', u: 'm', lo: 1.1, hi: 2.4 },
    { n: 6, shape: 'regular hexagon', thing: 'patio stone', job: 'edging', u: 'cm', lo: 20, hi: 35 },
  ]);
  const s = c.u === 'm' ? tenths(rng, c.lo, c.hi) : rng.int(c.lo, c.hi);
  const P = clean(c.n * s);
  const short = c.shape.replace('regular ', '');
  return {
    prompt: `A ${c.thing} is shaped like a ${c.shape}: all ${c.n} sides are the same length. Each side is ${Q(s, c.u)}. How much ${c.job} goes around the outside?`,
    figure: regularFig(c.n, lab(s, c.u), `${c.shape}`),
    parts: [exact(P, c.u)],
    hints: [`A ${short} has $${c.n}$ sides, all the same length.`, `Multiply the side length by the number of sides: $P = ${c.n} \\times s$.`],
    solution: [`A ${short} has $${c.n}$ equal sides.`, `$P = ${c.n} \\times ${nm(s)} = ${nm(P)}$`, `The ${c.thing} needs ${Q(P, c.u)} of ${c.job}.`],
    answerDisplay: Q(P, c.u),
  };
}

/** L-shaped room: a W × H rectangle with an a × b corner removed. Sides listed counterclockwise from the bottom. */
function lShape(rng: Rng, dec: boolean) {
  const W = dec ? tenths(rng, 6, 10) : rng.int(7, 12);
  const H = dec ? tenths(rng, 4.5, 8) : rng.int(5, 9);
  const a = dec ? tenths(rng, 2, W - 2.5) : rng.int(2, W - 3);
  const b = dec ? tenths(rng, 1.5, H - 2) : rng.int(2, H - 2);
  const pts: P[] = [
    [0, 0],
    [W, 0],
    [W, H - b],
    [W - a, H - b],
    [W - a, H],
    [0, H],
  ];
  const sides = [W, clean(H - b), a, b, clean(W - a), H];
  return { W, H, a, b, pts, sides };
}

function lP(rng: Rng): GenOutput {
  const { pts, sides } = lShape(rng, true);
  const P = clean(sides.reduce((s, x) => s + x, 0));
  const room = rng.pick(['L-shaped living room', 'L-shaped basement', 'L-shaped kitchen', 'L-shaped office']);
  return {
    prompt: `${cap(rng.pick(NAMES))} is installing baseboard around an ${room}. The plan shows every wall. How many metres of baseboard go around the room? (Do not leave a gap for the door.)`,
    figure: polyFig(pts, sides.map((x) => lab(x, 'm')), `plan of an ${room}`),
    parts: [exact(P, 'm')],
    hints: [HINT_P, 'This shape has $6$ sides. Trace around it with your finger and add each side once.'],
    solution: [`Add all $6$ sides: $${sides.map((x) => nm(x)).join(' + ')}$`, `$P = ${nm(P)}$`, `The room needs ${Q(P, 'm')} of baseboard.`],
    answerDisplay: Q(P, 'm'),
  };
}

function rectDecP(rng: Rng): GenOutput {
  const thing = rng.pick(['patio', 'garage floor', 'chicken run', 'hockey rink for kids', 'school garden', 'deck']);
  const l = tenths(rng, 4, 14);
  const w = tenths(rng, 2, Math.max(2.5, l - 1.5));
  const P = clean(2 * (l + w));
  return {
    prompt: `A rectangular ${thing} is ${Q(l, 'm')} long and ${Q(w, 'm')} wide. What is its perimeter?`,
    figure: rectFig(l, w, lab(l, 'm'), lab(w, 'm'), `rectangular ${thing}`),
    parts: [exact(P, 'm')],
    hints: [HINT_P, 'Add the length and the width, then double it: $P = 2(l + w)$.'],
    solution: ['$P = 2(l + w)$', `$P = 2(${nm(l)} + ${nm(w)}) = 2(${nm(clean(l + w))}) = ${nm(P)}$`, `The perimeter is ${Q(P, 'm')}.`],
    answerDisplay: Q(P, 'm'),
  };
}

function missingP(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['rect', 'tri', 'square', 'gate', 'L'] as const);
  if (mode === 'rect') {
    const c = rng.pick([
      { thing: 'dog run', job: 'fencing', u: 'm' },
      { thing: 'vegetable garden', job: 'edging', u: 'm' },
      { thing: 'backyard rink', job: 'boards', u: 'm' },
      { thing: 'chicken run', job: 'fencing', u: 'm' },
    ]);
    const l = rng.int(8, 24);
    const w = rng.int(3, l - 2);
    const P = 2 * (l + w);
    return {
      prompt: `${name} used ${Q(P, c.u)} of ${c.job} to go all the way around a rectangular ${c.thing}. The ${c.thing} is ${Q(l, c.u)} long. How wide is it?`,
      figure: rectFig(l, w, lab(l, c.u), '?', `rectangular ${c.thing}`, true),
      parts: [numPart(w, { suffix: c.u })],
      hints: ['The two long sides use $l + l$ of the fencing. The rest is for the two short sides.', `Subtract the two lengths from the perimeter, then divide what is left by $2$.`],
      solution: [`The two long sides: $${l} + ${l} = ${2 * l}$`, `Left for the two short sides: $${P} - ${2 * l} = ${2 * w}$`, `Each short side: $${2 * w} \\div 2 = ${w}$`, `Check: $${l} + ${w} + ${l} + ${w} = ${P}$ ✓`, `The ${c.thing} is ${Q(w, c.u)} wide.`],
      answerDisplay: Q(w, c.u),
    };
  }
  if (mode === 'tri') {
    const u = rng.pick(['m', 'cm']);
    const [a, b, c] = retry(
      () => (u === 'm' ? [rng.int(4, 15), rng.int(4, 15), rng.int(4, 15)] : [rng.int(30, 90), rng.int(30, 90), rng.int(30, 90)]),
      ([a, b, c]) => a + b > c * 1.25 && a + c > b * 1.25 && b + c > a * 1.25,
    );
    const P = a + b + c;
    const thing = u === 'm' ? rng.pick(['triangular garden', 'triangular lot', 'triangular dog park']) : rng.pick(['triangular pennant', 'triangular shelf', 'triangular sign']);
    return {
      prompt: `A ${thing} has a perimeter of ${Q(P, u)}. Two of its sides are ${Q(a, u)} and ${Q(b, u)}. How long is the third side?`,
      figure: triFig(a, b, c, [lab(a, u), lab(b, u), '?'], thing),
      parts: [numPart(c, { suffix: u })],
      hints: ['The three sides add up to the perimeter.', 'Add the two sides you know, then subtract that sum from the perimeter.'],
      solution: [`Two known sides: $${a} + ${b} = ${a + b}$`, `Third side: $${P} - ${a + b} = ${c}$`, `Check: $${a} + ${b} + ${c} = ${P}$ ✓`, `The third side is ${Q(c, u)}.`],
      answerDisplay: Q(c, u),
    };
  }
  if (mode === 'square') {
    const u = rng.pick(['m', 'cm']);
    const s = u === 'm' ? rng.int(3, 15) : rng.int(6, 25) * 5;
    const P = 4 * s;
    const thing = u === 'm' ? rng.pick(['square sandbox', 'square patio', 'square garden']) : rng.pick(['square picture frame', 'square cushion', 'square table top']);
    return {
      prompt: `It takes ${Q(P, u)} of trim to go around a ${thing}. How long is each side?`,
      figure: rectFig(1, 1, '?', '?', thing),
      parts: [numPart(s, { suffix: u })],
      hints: ['A square has $4$ sides that are all the same length.', 'Divide the perimeter by $4$.'],
      solution: ['The $4$ sides are equal, so share the perimeter into $4$ equal parts.', `$${P} \\div 4 = ${s}$`, `Each side is ${Q(s, u)}.`],
      answerDisplay: Q(s, u),
    };
  }
  if (mode === 'gate') {
    const l = tenths(rng, 8, 20);
    const w = tenths(rng, 5, l - 1);
    const g = rng.pick([0.9, 1.2, 1.5, 3.6]);
    const P = clean(2 * (l + w));
    const F = clean(P - g);
    const where = rng.pick(['a backyard', 'a dog run', 'a horse paddock', 'a community garden']);
    return {
      prompt: `${name} is building a fence around ${where}. The space is a rectangle ${Q(l, 'm')} long and ${Q(w, 'm')} wide. ${name} will leave a ${Q(g, 'm')} opening for a gate. How many metres of fencing does ${name} need?`,
      figure: rectFig(l, w, lab(l, 'm'), lab(w, 'm'), `fenced ${where.replace(/^a /, '')}`),
      parts: [exact(F, 'm')],
      hints: ['First find the perimeter of the whole rectangle: $P = 2(l + w)$.', 'The gate opening does not need fencing, so subtract its width.'],
      solution: [`Perimeter: $2(${nm(l)} + ${nm(w)}) = 2(${nm(clean(l + w))}) = ${nm(P)}$`, `Subtract the gate: $${nm(P)} - ${nm(g)} = ${nm(F)}$`, `${name} needs ${Q(F, 'm')} of fencing.`],
      answerDisplay: Q(F, 'm'),
    };
  }
  const { W, H, a, b, pts, sides } = lShape(rng, false);
  const P = sides.reduce((s, x) => s + x, 0);
  const labels = [lab(W, 'm'), '?', lab(a, 'm'), lab(b, 'm'), '?', lab(H, 'm')];
  return {
    prompt: `${name} is putting baseboard around the L-shaped room in the plan. Two sides are not labelled. What is the perimeter of the room?`,
    figure: polyFig(pts, labels, 'plan of an L-shaped room'),
    parts: [numPart(P, { suffix: 'm' })],
    hints: ['Find the missing sides first. The bottom side is as long as the two top sides together, and the left side is as tall as the two right sides together.', 'Then add all $6$ sides.'],
    solution: [
      `Missing side on the right: $${H} - ${b} = ${H - b}$`,
      `Missing side on the top: $${W} - ${a} = ${W - a}$`,
      `Add all $6$ sides: $${sides.join(' + ')} = ${P}$`,
      `The perimeter is ${Q(P, 'm')}.`,
    ],
    answerDisplay: Q(P, 'm'),
  };
}

const perimeter = skill({
  id: 'm104-perimeter',
  name: 'Perimeter of polygons',
  description: 'Find the perimeter of rectangles, triangles and other polygons, and find a missing side from the perimeter.',
  outcomes: ['SS2', 'PR2'],
  lessonId: 'm104-7-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rectP(rng, name);
    if (d === 2) {
      const mode = rng.pick(['tri', 'regular', 'L', 'rect'] as const);
      return mode === 'tri' ? triP(rng) : mode === 'regular' ? regularP(rng) : mode === 'L' ? lP(rng) : rectDecP(rng);
    }
    return missingP(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 7.1 Circumference
// ---------------------------------------------------------------------------

interface CircCtx {
  thing: string;
  job: string;
  u: string;
  d: [number, number];
  step: number;
}

const CIRCLES: CircCtx[] = [
  { thing: 'round kitchen table', job: 'a strip of edge trim', u: 'cm', d: [9, 15], step: 10 },
  { thing: 'bicycle wheel', job: 'a reflective strip', u: 'cm', d: [50, 70], step: 1 },
  { thing: 'round flower garden', job: 'plastic edging', u: 'm', d: [2, 6], step: 1 },
  { thing: 'trampoline', job: 'a safety pad', u: 'm', d: [3, 5], step: 1 },
  { thing: 'hot tub', job: 'a rubber seal', u: 'cm', d: [18, 23], step: 10 },
  { thing: 'round birthday cake', job: 'a ribbon', u: 'cm', d: [15, 30], step: 1 },
  { thing: 'clock face', job: 'a metal rim', u: 'cm', d: [25, 40], step: 1 },
  { thing: 'hula hoop', job: 'coloured tape', u: 'cm', d: [70, 100], step: 1 },
  { thing: 'round fire pit', job: 'a ring of stones', u: 'm', d: [1, 3], step: 1 },
];

const HINT_C = 'The circumference is the distance around a circle. Use $C = \\pi d$ (or $C = 2\\pi r$) and the $\\pi$ key on your calculator.';

const circumference = skill({
  id: 'm104-circumference',
  name: 'Circumference of a circle',
  description: 'Find the circumference of a circle from its diameter or radius, rounded to the tenth, and use it in everyday jobs.',
  outcomes: ['SS2', 'PR2'],
  lessonId: 'm104-7-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1 || d === 2) {
      const c = rng.pick(CIRCLES);
      const useR = d === 2 && rng.chance(0.6);
      const dia = retry(
        () => (d === 1 ? rng.int(c.d[0], c.d[1]) * c.step : c.u === 'm' ? tenths(rng, c.d[0], c.d[1] + 0.9) : rng.int(c.d[0], c.d[1]) * c.step + (useR ? 0 : rng.pick([0, 5]))),
        (x) => !onEdge(Math.PI * x, 1) && (!useR || Math.abs(x / 2 - Math.round(x / 2 * 10) / 10) < 1e-9),
      );
      const r = clean(dia / 2);
      const C = Math.PI * dia;
      const given = useR ? `a radius of ${Q(r, c.u)}` : `a diameter of ${Q(dia, c.u)}`;
      return {
        prompt: `A ${c.thing} has ${given}. ${cap(c.job)} goes once around the edge. How long is it? Round to the nearest tenth of a ${c.u === 'm' ? 'metre' : 'centimetre'}.`,
        figure: circleFig(useR ? `r = ${lab(r, c.u)}` : `d = ${lab(dia, c.u)}`, useR ? 'r' : 'd', c.thing),
        parts: [numPart(C, { decimals: 1, suffix: c.u })],
        hints: useR ? [HINT_C, `The radius is half the diameter. Double it first: $d = 2 \\times ${nm(r)}$, or use $C = 2\\pi r$.`] : [HINT_C, `Multiply: $\\pi \\times ${nm(dia)}$. Round only at the end.`],
        solution: [
          ...(useR ? [`The diameter is twice the radius: $d = 2 \\times ${nm(r)} = ${nm(dia)}$`] : []),
          `$C = \\pi d = \\pi \\times ${nm(dia)} \\approx ${nm(C, 3)}$`,
          `Round to the nearest tenth: $${nf(C, 1)}$`,
          `${cap(c.job)} about ${Q(roundTo(C, 1), c.u)} long goes around the ${c.thing}.`,
        ],
        answerDisplay: `about ${Q(roundTo(C, 1), c.u)}`,
      };
    }
    const mode = rng.pick(['roll', 'buy', 'turns'] as const);
    if (mode === 'roll') {
      const thing = rng.pick(['bicycle wheel', 'wheelbarrow wheel', 'wheel on a measuring wheel', 'lawn mower wheel']);
      const { dia, n } = retry(
        () => ({ dia: rng.int(20, 70), n: rng.pick([10, 20, 25, 50, 100, 200]) }),
        (o) => !onEdge((Math.PI * o.dia * o.n) / 100, 1),
      );
      const C = Math.PI * dia;
      const D = (C * n) / 100;
      return {
        prompt: `A ${thing} has a diameter of ${Q(dia, 'cm')}. ${name} pushes it so that it turns $${n}$ times. How far does it roll, in metres? Round to the nearest tenth of a metre.`,
        figure: circleFig(`d = ${lab(dia, 'cm')}`, 'd', thing),
        parts: [numPart(D, { decimals: 1, suffix: 'm' })],
        hints: ['Each time a wheel turns once, it rolls forward one circumference.', `Find $C = \\pi d$, multiply by $${n}$, then divide by $100$ to change centimetres to metres.`],
        solution: [`One turn: $C = \\pi \\times ${dia} \\approx ${nm(C, 3)}\\ \\text{cm}$`, `$${n}$ turns: $${n} \\times ${nm(C, 3)} \\approx ${nm(C * n, 2)}\\ \\text{cm}$`, `Change to metres: $${nm(C * n, 2)} \\div 100 \\approx ${nm(D, 3)}$`, `The ${thing} rolls about ${Q(roundTo(D, 1), 'm')}.`],
        answerDisplay: `about ${Q(roundTo(D, 1), 'm')}`,
      };
    }
    if (mode === 'buy') {
      const thing = rng.pick(['round flower garden', 'round fire pit', 'round fish pond', 'round tree bed in a park']);
      const { dia, price } = retry(
        () => ({ dia: tenths(rng, 1.5, 6), price: rng.pick([2.49, 3.25, 3.99, 4.5, 5.75, 1.89, 6.29]) }),
        (o) => {
          const C = Math.PI * o.dia;
          const f = C - Math.floor(C);
          return f > 0.12 && f < 0.88 && Math.ceil(C) === Math.ceil(3.14 * o.dia);
        },
      );
      const C = Math.PI * dia;
      const m = Math.ceil(C);
      const cost = roundTo(m * price, 2);
      return {
        prompt: `${name} wants to put edging around a ${thing} with a diameter of ${Q(dia, 'm')}. Edging is sold only in whole metres, at ${money(price)} per metre. How many metres must ${name} buy, and what will it cost?`,
        figure: circleFig(`d = ${lab(dia, 'm')}`, 'd', thing),
        parts: [numPart(m, { label: 'Edging to buy', suffix: 'm' }), moneyPart(cost)],
        hints: ['Find the circumference: $C = \\pi d$. Then round **up** to a whole number of metres, so there is enough.', 'Multiply the metres you buy by the price per metre.'],
        solution: [
          `$C = \\pi \\times ${nm(dia)} \\approx ${nm(C, 2)}\\ \\text{m}$`,
          `Edging comes in whole metres, so round up: ${name} buys ${Q(m, 'm')}.`,
          `Cost: $${m} \\times ${fmtFixed(price, 2)} = ${fmtFixed(cost, 2)}$`,
          `${name} buys ${Q(m, 'm')} of edging for ${money(cost)}.`,
        ],
        answerDisplay: `${Q(m, 'm')} for ${money(cost)}`,
      };
    }
    const { dia, dist } = retry(
      () => ({ dia: rng.int(50, 75), dist: rng.pick([100, 200, 250, 500, 1000]) }),
      (o) => !onEdge((o.dist * 100) / (Math.PI * o.dia), 0),
    );
    const C = Math.PI * dia;
    const turns = (dist * 100) / C;
    return {
      prompt: `${name} rides a bike with wheels ${Q(dia, 'cm')} across. About how many times does a wheel turn when ${name} rides ${Q(dist, 'm')}? Round to the nearest whole turn.`,
      figure: circleFig(`d = ${lab(dia, 'cm')}`, 'd', 'bicycle wheel'),
      parts: [numPart(turns, { decimals: 0, suffix: 'turns' })],
      hints: ['One turn moves the bike forward one circumference: $C = \\pi d$.', `Change ${Q(dist, 'm')} to centimetres, then divide by the circumference.`],
      solution: [`One turn: $C = \\pi \\times ${dia} \\approx ${nm(C, 2)}\\ \\text{cm}$`, `Distance: ${Q(dist, 'm')} $= ${nm(dist * 100)}\\ \\text{cm}$`, `Turns: $${nm(dist * 100)} \\div ${nm(C, 2)} \\approx ${nm(turns, 1)}$`, `The wheel turns about $${nf(turns, 0)}$ times.`],
      answerDisplay: `about $${nf(turns, 0)}$ turns`,
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 Area
// ---------------------------------------------------------------------------

const HINT_RECT = 'Area is the space inside a shape, measured in square units. For a rectangle, $A = l \\times w$.';
const HINT_TRI = 'A triangle is half of a rectangle. $A = \\tfrac{1}{2} \\times b \\times h$, where $h$ is the height straight up from the base.';

function rectA(rng: Rng, dec: boolean, name: string): GenOutput {
  const c = rng.pick([
    { thing: 'bedroom floor', u: 'm', l: [3, 6], w: [3, 5], why: 'new carpet' },
    { thing: 'vegetable garden', u: 'm', l: [4, 12], w: [2, 6], why: 'a layer of compost' },
    { thing: 'poster', u: 'cm', l: [40, 90], w: [30, 60], why: 'a plastic cover' },
    { thing: 'kitchen floor', u: 'm', l: [3, 6], w: [2, 5], why: 'new tiles' },
    { thing: 'rug', u: 'm', l: [2, 4], w: [1, 3], why: 'a rug pad' },
    { thing: 'parking stall', u: 'm', l: [5, 6], w: [2, 3], why: 'fresh paint' },
    { thing: 'table top', u: 'cm', l: [80, 180], w: [60, 90], why: 'a new tablecloth' },
  ]);
  let l: number;
  let w: number;
  if (dec && c.u === 'm') {
    l = tenths(rng, c.l[0], c.l[1] + 0.9);
    w = tenths(rng, c.w[0], Math.min(c.w[1] + 0.9, l - 0.2));
  } else {
    const k = c.u === 'cm' ? 5 : 1;
    l = rng.int(c.l[0] / k, c.l[1] / k) * k;
    w = rng.int(c.w[0] / k, Math.min(c.w[1], l - k) / k) * k;
    if (rng.chance(0.2) && c.u === 'm' && !dec) w = l;
  }
  const A = clean(l * w);
  const square = l === w;
  return {
    prompt: `${name} needs ${c.why} for a ${square ? 'square' : 'rectangular'} ${c.thing} that is ${Q(l, c.u)} by ${Q(w, c.u)}. What is the area of the ${c.thing}?`,
    figure: rectFig(l, w, lab(l, c.u), lab(w, c.u), `${c.thing}`),
    parts: [exact(A, `${c.u}²`)],
    hints: [HINT_RECT, `Multiply the length by the width: $${nm(l)} \\times ${nm(w)}$. The answer is in square ${c.u === 'm' ? 'metres' : 'centimetres'}.`],
    solution: ['$A = l \\times w$', `$A = ${nm(l)} \\times ${nm(w)} = ${nm(A)}$`, `The area is ${A2(A, c.u)}.`],
    answerDisplay: A2(A, c.u),
  };
}

function triA(rng: Rng, dec: boolean, name: string): GenOutput {
  const c = rng.pick([
    { thing: 'triangular pennant', u: 'cm', b: [20, 40], h: [30, 60], why: 'felt' },
    { thing: 'triangular garden bed', u: 'm', b: [3, 8], h: [2, 6], why: 'mulch' },
    { thing: 'triangular sail', u: 'm', b: [2, 4], h: [3, 6], why: 'sailcloth' },
    { thing: 'triangular gable end of a shed', u: 'm', b: [2, 4], h: [1, 2], why: 'paint' },
    { thing: 'triangular corner of a lawn', u: 'm', b: [4, 10], h: [3, 8], why: 'grass seed' },
  ]);
  let b: number;
  let h: number;
  if (dec && c.u === 'm') {
    b = tenths(rng, c.b[0], c.b[1] + 0.9);
    h = tenths(rng, c.h[0], c.h[1] + 0.9);
  } else {
    [b, h] = retry(
      () => [rng.int(c.b[0], c.b[1]), rng.int(c.h[0], c.h[1])],
      ([x, y]) => (x * y) % 2 === 0,
    );
  }
  const A = clean((b * h) / 2);
  const p = rng.pick([0, 0.3, 0.5, 0.6]);
  return {
    prompt: `${name} needs to know how much ${c.why} to buy for a ${c.thing}. The base is ${Q(b, c.u)} and the height is ${Q(h, c.u)}. What is the area?`,
    figure: triAreaFig(lab(b, c.u), lab(h, c.u), h / b, p, c.thing),
    parts: [exact(A, `${c.u}²`)],
    hints: [HINT_TRI, `Multiply the base by the height, then divide by $2$: $${nm(b)} \\times ${nm(h)} \\div 2$.`],
    solution: ['$A = \\tfrac{1}{2} \\times b \\times h$', `$${nm(b)} \\times ${nm(h)} = ${nm(clean(b * h))}$`, `$${nm(clean(b * h))} \\div 2 = ${nm(A)}$`, `The area is ${A2(A, c.u)}.`],
    answerDisplay: A2(A, c.u),
  };
}

function circleA(rng: Rng, name: string): GenOutput {
  const c = rng.pick([
    { thing: 'round rug', u: 'm', d: [1.2, 3] },
    { thing: 'trampoline', u: 'm', d: [3, 5] },
    { thing: 'round table top', u: 'cm', d: [80, 150] },
    { thing: 'pizza', u: 'cm', d: [25, 40] },
    { thing: 'round patio', u: 'm', d: [2.5, 5] },
    { thing: 'circle of lawn watered by a sprinkler', u: 'm', d: [4, 10] },
  ]);
  const useR = rng.chance(0.5);
  const dia = retry(
    () => (c.u === 'm' ? tenths(rng, c.d[0], c.d[1]) : rng.int(c.d[0] / 2, c.d[1] / 2) * 2),
    (x) => !onEdge(Math.PI * (x / 2) ** 2, 1) && (!useR || Math.abs(x / 2 * 10 - Math.round(x / 2 * 10)) < 1e-9),
  );
  const r = clean(dia / 2);
  const A = Math.PI * r * r;
  return {
    prompt: `${name} needs the area of a ${c.thing}. It has a ${useR ? `radius of ${Q(r, c.u)}` : `diameter of ${Q(dia, c.u)}`}. What is its area? Round to the nearest tenth.`,
    figure: circleFig(useR ? `r = ${lab(r, c.u)}` : `d = ${lab(dia, c.u)}`, useR ? 'r' : 'd', c.thing),
    parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
    hints: ['The area of a circle is $A = \\pi r^2$, which means $\\pi \\times r \\times r$.', useR ? 'Use the radius, not the diameter.' : 'The formula uses the radius. Halve the diameter first.'],
    solution: [
      ...(useR ? [] : [`The radius is half the diameter: $r = ${nm(dia)} \\div 2 = ${nm(r)}$`]),
      `$A = \\pi r^2 = \\pi \\times ${nm(r)} \\times ${nm(r)} \\approx ${nm(A, 3)}$`,
      `Round to the nearest tenth: $${nf(A, 1)}$`,
      `The area is about ${A2(roundTo(A, 1), c.u, 1)}.`,
    ],
    answerDisplay: `about ${A2(roundTo(A, 1), c.u, 1)}`,
  };
}

function costA(rng: Rng, name: string): GenOutput {
  const mode = rng.pick(['floor', 'sod', 'paint', 'tri'] as const);
  if (mode === 'paint') {
    const H = rng.pick([2.4, 2.5, 2.7, 3]);
    const door = rng.chance(0.5);
    const cover = rng.pick([10, 12, 15]);
    const { Lw, A } = retry(
      () => {
        const Lw = tenths(rng, 3, 7);
        const A = clean(Lw * H - (door ? 0.9 * 2 : 0));
        return { Lw, A };
      },
      (o) => {
        const q = o.A / cover;
        return q - Math.floor(q) > 0.1 && q - Math.floor(q) < 0.95;
      },
    );
    const cans = Math.ceil(A / cover);
    const wallA = clean(Lw * H);
    return {
      prompt: `${name} is painting one wall of a ${rng.pick(['hotel room', 'daycare room', 'restaurant', 'basement suite'])}. The wall is ${Q(Lw, 'm')} long and ${Q(H, 'm')} high.${door ? ` It has a door that is ${Q(0.9, 'm')} wide and ${Q(2, 'm')} high, which is not painted.` : ''} One can of paint covers ${A2(cover, 'm')}. What area will be painted, and how many cans must ${name} buy?`,
      figure: door
        ? render((s) => {
            const [W, Hp] = [200 * s, Math.min(150 * s, 200 * s * (H / Lw))];
            const dw = W * (0.9 / Lw);
            const dh = Hp * (2 / H);
            const d = new Drawing().poly([[0, 0], [W, 0], [W, Hp], [0, Hp]]);
            d.poly([[W * 0.62, 0], [W * 0.62, dh], [W * 0.62 + dw, dh], [W * 0.62 + dw, 0]], false, 'muted');
            d.sideLabel([0, 0], [W, 0], lab(Lw, 'm'), [0, -1]);
            d.sideLabel([W, 0], [W, Hp], lab(H, 'm'), [1, 0]);
            d.labelNear([W * 0.62 + dw / 2, dh + 12], 'door');
            return d;
          }, 'wall with a door')
        : rectFig(Lw, H, lab(Lw, 'm'), lab(H, 'm'), 'wall'),
      parts: [exact(A, 'm²', 'Area painted'), numPart(cans, { label: 'Cans to buy', suffix: 'cans' })],
      hints: [door ? 'Find the area of the whole wall, then subtract the area of the door.' : 'The wall is a rectangle: $A = l \\times w$.', `Divide the area by $${cover}$. You cannot buy part of a can, so round **up**.`],
      solution: [
        `Wall: $${nm(Lw)} \\times ${nm(H)} = ${nm(wallA)}\\ ${sq('m')}$`,
        ...(door ? [`Door: $0.9 \\times 2 = 1.8\\ ${sq('m')}$`, `Area to paint: $${nm(wallA)} - 1.8 = ${nm(A)}\\ ${sq('m')}$`] : []),
        `Cans: $${nm(A)} \\div ${cover} \\approx ${nm(A / cover, 2)}$`,
        `Round up so there is enough paint: $${cans}$ cans.`,
        `${name} paints ${A2(A, 'm')} and must buy $${cans}$ cans.`,
      ],
      answerDisplay: `${A2(A, 'm')}; $${cans}$ cans`,
    };
  }
  const c =
    mode === 'floor'
      ? { what: 'Vinyl flooring', where: rng.pick(['a laundry room', 'a hotel bathroom', 'a small kitchen', 'a coffee shop storeroom']), prices: [18.99, 24.5, 32.75, 21.49, 29.99], lo: 2, hi: 5 }
      : mode === 'sod'
        ? { what: 'Sod', where: rng.pick(['a front yard', 'a backyard', 'a boulevard by the road', 'a schoolyard play area']), prices: [3.75, 4.25, 4.99, 5.5, 6.15], lo: 4, hi: 12 }
        : { what: 'Landscape fabric', where: rng.pick(['a triangular garden bed', 'a triangular corner of a yard']), prices: [1.29, 1.85, 2.4, 0.99], lo: 3, hi: 9 };
  const tri = mode === 'tri';
  const { l, w, A, price, cost } = retry(
    () => {
      const l = tenths(rng, c.lo + 1, c.hi);
      const w = tri ? rng.int(c.lo, c.hi) : tenths(rng, c.lo, Math.max(c.lo + 0.5, l - 0.3));
      const A = clean(tri ? (l * w) / 2 : l * w);
      const price = rng.pick(c.prices);
      return { l, w, A, price, cost: A * price };
    },
    (o) => !onEdge(o.cost, 2),
  );
  const costR = roundTo(cost, 2);
  return {
    prompt: `${c.what} for ${c.where} costs ${money(price)} per square metre. The space is ${tri ? `a triangle with a base of ${Q(l, 'm')} and a height of ${Q(w, 'm')}` : `a rectangle ${Q(l, 'm')} long and ${Q(w, 'm')} wide`}. Find the area, then the cost, ${CENT}.`,
    figure: tri ? triAreaFig(lab(l, 'm'), lab(w, 'm'), w / l, 0.4, c.where.replace(/^a /, '')) : rectFig(l, w, lab(l, 'm'), lab(w, 'm'), c.where.replace(/^a /, '')),
    parts: [exact(A, 'm²', 'Area'), moneyPart(costR)],
    hints: [tri ? HINT_TRI : HINT_RECT, 'Then multiply the area by the price for one square metre.'],
    solution: [
      tri ? `Area: $\\tfrac{1}{2} \\times ${nm(l)} \\times ${nm(w)} = ${nm(A)}\\ ${sq('m')}$` : `Area: $${nm(l)} \\times ${nm(w)} = ${nm(A)}\\ ${sq('m')}$`,
      `Cost: $${nm(A)} \\times ${fmtFixed(price, 2)} ${Math.abs(roundTo(cost, 2) - cost) < 1e-9 ? '=' : '\\approx'} ${fmtFixed(costR, 2)}$`,
      `The area is ${A2(A, 'm')} and the ${c.what.toLowerCase()} costs ${money(costR)}.`,
    ],
    answerDisplay: `${A2(A, 'm')}; ${money(costR)}`,
  };
}

const area = skill({
  id: 'm104-area',
  name: 'Area of rectangles, triangles and circles',
  description: 'Find the area of rectangles, triangles and circles, and use area to find how much material a job needs and what it costs.',
  outcomes: ['SS2', 'PR2'],
  lessonId: 'm104-7-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? rectA(rng, false, name) : triA(rng, false, name);
    if (d === 2) {
      const mode = rng.pick(['rect', 'tri', 'circle', 'circle'] as const);
      return mode === 'rect' ? rectA(rng, true, name) : mode === 'tri' ? triA(rng, true, name) : circleA(rng, name);
    }
    return costA(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Volume and capacity
// ---------------------------------------------------------------------------

const HINT_V = 'Volume is the space inside a 3-D object, measured in cubic units. For a box, $V = l \\times w \\times h$.';

const volume = skill({
  id: 'm104-volume',
  name: 'Volume and capacity of boxes',
  description: 'Find the volume of a rectangular prism, relate volume and capacity (1000 cm³ holds 1 L), and solve packing and filling problems.',
  outcomes: ['SS2', 'PR2'],
  lessonId: 'm104-7-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { thing: 'shipping box', l: [20, 60], w: [10, 40], h: [10, 30] },
        { thing: 'toy storage bin', l: [30, 50], w: [20, 35], h: [15, 30] },
        { thing: 'cereal box', l: [18, 25], w: [5, 8], h: [25, 32] },
        { thing: 'shoe box', l: [28, 35], w: [15, 22], h: [10, 14] },
        { thing: 'storage cube', l: [30, 40], w: [30, 40], h: [30, 40] },
      ]);
      const cube = c.thing === 'storage cube';
      const k = c.l[0] >= 20 && !cube ? 5 : 1;
      const l = cube ? rng.int(6, 8) * 5 : rng.int(c.l[0] / k, c.l[1] / k) * k;
      const w = cube ? l : rng.int(c.w[0], c.w[1]);
      const h = cube ? l : rng.int(c.h[0], c.h[1]);
      const V = l * w * h;
      return {
        prompt: `A ${c.thing} is ${Q(l, 'cm')} long, ${Q(w, 'cm')} wide and ${Q(h, 'cm')} high. What is its volume?`,
        figure: prismFig(lab(l, 'cm'), lab(w, 'cm'), lab(h, 'cm')),
        parts: [numPart(V, { suffix: 'cm³' })],
        hints: [HINT_V, `Multiply the three measurements: $${l} \\times ${w} \\times ${h}$.`],
        solution: ['$V = l \\times w \\times h$', `$V = ${l} \\times ${w} \\times ${h}$`, `$${l} \\times ${w} = ${l * w}$, and $${l * w} \\times ${h} = ${nm(V)}$`, `The volume is ${V3(V, 'cm')}.`],
        answerDisplay: V3(V, 'cm'),
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { thing: 'raised garden bed', l: [1.2, 3], w: [0.6, 1.2], h: [0.3, 0.5] },
          { thing: 'sandbox', l: [1.5, 2.5], w: [1.2, 2], h: [0.2, 0.4] },
          { thing: 'box of a dump truck', l: [3, 4.5], w: [2, 2.4], h: [0.8, 1.2] },
          { thing: 'concrete step', l: [1, 1.8], w: [0.3, 0.5], h: [0.2, 0.3] },
        ]);
        const l = tenths(rng, c.l[0], c.l[1]);
        const w = rng.int(Math.round(c.w[0] * 10), Math.round(c.w[1] * 10)) / 10;
        const h = rng.int(Math.round(c.h[0] * 10), Math.round(c.h[1] * 10)) / 10;
        const V = clean(l * w * h);
        return {
          prompt: `A ${c.thing} is ${Q(l, 'm')} long, ${Q(w, 'm')} wide and ${Q(h, 'm')} deep. What is its volume, in cubic metres?`,
          figure: prismFig(lab(l, 'm'), lab(w, 'm'), lab(h, 'm')),
          parts: [exact(V, 'm³')],
          hints: [HINT_V, 'Use a calculator to multiply the three decimals. Do not round.'],
          solution: ['$V = l \\times w \\times h$', `$V = ${nm(l)} \\times ${nm(w)} \\times ${nm(h)} = ${nm(V)}$`, `The volume is ${V3(V, 'm')}.`],
          answerDisplay: V3(V, 'm'),
        };
      }
      const c = rng.pick([
        { thing: 'plastic food container', l: [15, 25], w: [10, 15], h: [8, 12] },
        { thing: 'cooler', l: [40, 60], w: [25, 35], h: [25, 35] },
        { thing: 'mop bucket', l: [30, 40], w: [20, 30], h: [25, 30] },
        { thing: 'storage tote', l: [50, 70], w: [30, 40], h: [25, 35] },
        { thing: 'small fish tank', l: [30, 50], w: [20, 30], h: [20, 30] },
      ]);
      const l = rng.int(c.l[0] / 5, c.l[1] / 5) * 5;
      const w = rng.int(c.w[0] / 5, c.w[1] / 5) * 5;
      const h = rng.int(c.h[0], c.h[1]);
      const V = l * w * h;
      const L = clean(V / 1000);
      return {
        prompt: `A ${c.thing} is ${Q(l, 'cm')} long, ${Q(w, 'cm')} wide and ${Q(h, 'cm')} high inside. Find its volume in cubic centimetres. Then find how many litres it holds. ($1000\\ ${cu('cm')}$ holds $1\\ \\text{L}$.)`,
        figure: prismFig(lab(l, 'cm'), lab(w, 'cm'), lab(h, 'cm')),
        parts: [numPart(V, { label: 'Volume', suffix: 'cm³' }), exact(L, 'L', 'Capacity')],
        hints: [HINT_V, `Every $1000\\ ${cu('cm')}$ holds $1\\ \\text{L}$, so divide the volume by $1000$.`],
        solution: [`$V = ${l} \\times ${w} \\times ${h} = ${nm(V)}\\ ${cu('cm')}$`, `Capacity: $${nm(V)} \\div 1000 = ${nm(L)}$`, `The ${c.thing} holds ${Q(L, 'L')}.`],
        answerDisplay: `${V3(V, 'cm')}; ${Q(L, 'L')}`,
      };
    }
    const mode = rng.pick(['tank', 'pack', 'soil'] as const);
    if (mode === 'tank') {
      const l = rng.pick([40, 50, 60, 75, 80, 90, 100, 120]);
      const w = rng.pick([25, 30, 35, 40, 45, 50]);
      const h = rng.pick([30, 35, 40, 45, 50, 60]);
      const gap = rng.pick([2, 3, 4, 5]);
      const wh = h - gap;
      const V = l * w * wh;
      const L = clean(V / 1000);
      return {
        prompt: `${name} works at a pet store. A fish tank is ${Q(l, 'cm')} long, ${Q(w, 'cm')} wide and ${Q(h, 'cm')} high. ${name} fills it with water up to ${Q(gap, 'cm')} below the top. How many litres of water are in the tank? ($1000\\ ${cu('cm')}$ holds $1\\ \\text{L}$.)`,
        figure: prismFig(lab(l, 'cm'), lab(w, 'cm'), lab(h, 'cm')),
        parts: [exact(L, 'L')],
        hints: [`The water is not as deep as the tank. Its depth is $${h} - ${gap}$ cm.`, 'Find the volume of the water in cubic centimetres, then divide by $1000$ to get litres.'],
        solution: [`Water depth: $${h} - ${gap} = ${wh}\\ \\text{cm}$`, `Volume of water: $${l} \\times ${w} \\times ${wh} = ${nm(V)}\\ ${cu('cm')}$`, `Litres: $${nm(V)} \\div 1000 = ${nm(L)}$`, `The tank holds ${Q(L, 'L')} of water.`],
        answerDisplay: Q(L, 'L'),
      };
    }
    if (mode === 'pack') {
      const [a, b, c] = [rng.pick([10, 15, 20]), rng.pick([10, 12, 20, 25]), rng.pick([5, 8, 10, 15])];
      const [na, nb, nc] = [rng.int(2, 5), rng.int(2, 4), rng.int(2, 4)];
      const [L, W, H] = [a * na, b * nb, c * nc];
      const n = na * nb * nc;
      const item = rng.pick(['boxes of granola bars', 'boxes of light bulbs', 'boxes of tea', 'small boxes of screws']);
      return {
        prompt: `${name} packs ${item} into a carton at a warehouse. The carton is ${Q(L, 'cm')} long, ${Q(W, 'cm')} wide and ${Q(H, 'cm')} high. Each small box is ${Q(a, 'cm')} long, ${Q(b, 'cm')} wide and ${Q(c, 'cm')} high. The small boxes all face the same way. How many fit in the carton?`,
        figure: prismFig(lab(L, 'cm'), lab(W, 'cm'), lab(H, 'cm')),
        parts: [numPart(n, { suffix: 'boxes' })],
        hints: ['Find how many small boxes fit along the length, along the width and up the height.', 'Multiply those three numbers. (You can check by dividing the two volumes.)'],
        solution: [
          `Along the length: $${L} \\div ${a} = ${na}$`,
          `Along the width: $${W} \\div ${b} = ${nb}$`,
          `Up the height: $${H} \\div ${c} = ${nc}$`,
          `Total: $${na} \\times ${nb} \\times ${nc} = ${n}$`,
          `Check with volume: $${nm(L * W * H)} \\div ${nm(a * b * c)} = ${n}$ ✓`,
          `$${n}$ small boxes fit in the carton.`,
        ],
        answerDisplay: `$${n}$ boxes`,
      };
    }
    const { l, w, h, price, cost } = retry(
      () => {
        const l = tenths(rng, 1.5, 4);
        const w = rng.pick([0.6, 0.8, 1, 1.2, 1.5]);
        const h = rng.pick([0.2, 0.3, 0.4, 0.5]);
        const price = rng.pick([45, 52, 60, 38.5, 65]);
        return { l, w, h, price, cost: l * w * h * price };
      },
      (o) => !onEdge(o.cost, 2),
    );
    const V = clean(l * w * h);
    const costR = roundTo(cost, 2);
    return {
      prompt: `${name} is filling a raised garden bed with soil for a community garden. The bed is ${Q(l, 'm')} long, ${Q(w, 'm')} wide and ${Q(h, 'm')} deep. Soil costs ${money(price)} per cubic metre. Find the volume of the bed and the cost of the soil, ${CENT}.`,
      figure: prismFig(lab(l, 'm'), lab(w, 'm'), lab(h, 'm')),
      parts: [exact(V, 'm³', 'Volume'), moneyPart(costR)],
      hints: [HINT_V, 'Then multiply the volume by the price for one cubic metre.'],
      solution: [
        `Volume: $${nm(l)} \\times ${nm(w)} \\times ${nm(h)} = ${nm(V)}\\ ${cu('m')}$`,
        `Cost: $${nm(V)} \\times ${fmtFixed(price, 2)} ${Math.abs(costR - cost) < 1e-9 ? '=' : '\\approx'} ${fmtFixed(costR, 2)}$`,
        `The bed holds ${V3(V, 'm')} of soil, which costs ${money(costR)}.`,
      ],
      answerDisplay: `${V3(V, 'm')}; ${money(costR)}`,
    };
  },
});

export const PERIMETER_SKILLS: SkillDef[] = [perimeter, circumference, area, volume];

// Exported for the lesson figures' sanity checks in development only.
export const _figures = { rectFig, triFig, circleFig, polyFig, triAreaFig, regularFig };
