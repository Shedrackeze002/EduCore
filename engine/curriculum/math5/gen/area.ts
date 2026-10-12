/** Math 5 Unit 10 — Area (M1). Square centimetres, square metres and square kilometres; area and perimeter of rectangles. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;
type P = [number, number];

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];

/** A whole number in maths with a thin space between groups of three digits: 10\,000. */
function g(n: number): string {
  const s = String(Math.round(n * 1000) / 1000);
  const [i, f] = s.split('.');
  const grouped = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f ? `${grouped}.${f}` : grouped;
}
/** A number for a figure label or plain text: 10 000. */
function gt(n: number): string {
  const s = String(n);
  return s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : s;
}
const sq = (u: string) => `\\text{${u}}^2`;
/** A length in maths: 12\ \text{m} */
const L = (n: number, u: string) => `${g(n)}\\ \\text{${u}}`;
/** An area in maths: 12\ \text{m}^2 */
const A = (n: number, u: string) => `${g(n)}\\ ${sq(u)}`;
const SUP2 = '²';
/** A whole-number answer: the student types the value, not a calculation. */
const intPart = (v: number, opts: { label?: string; suffix?: string } = {}) => numPart(v, { ...opts, exact: false });

// ---------------------------------------------------------------------------
// Drawing: shapes with side labels on a pixel canvas (y up). The plane renderer draws a label
// 8 px right of and 8 px above an invisible anchor point, so each label is placed where it and its
// anchor stay clear of every line.
// ---------------------------------------------------------------------------

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}
const r2 = (v: number) => {
  const r = Math.round(v * 100) / 100;
  return r === 0 ? 0 : r;
};
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
  for (const ch of t) w += ch === ' ' || ch === '.' ? 3.6 : ch === 'm' ? 10.8 : ch === '²' ? 4.5 : 7.2;
  return w;
}

const CANVAS = 340;

class Drawing {
  private polys: Array<{ points: P[]; fill: boolean }> = [];
  private segs: PlaneSegment[] = [];
  private obstacles: Array<[P, P]> = [];
  private fills: P[][] = [];
  private labels: Array<{ text: string; box: Box; anchor: P }> = [];

  poly(pts: P[], fill = true): this {
    const points = [...pts, pts[0]];
    this.polys.push({ points, fill });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    if (fill) this.fills.push(pts);
    return this;
  }

  seg(a: P, b: P, dashed = false): this {
    this.segs.push({ from: a, to: b, color: 'muted', ...(dashed ? { dashed: true } : {}) });
    this.obstacles.push([a, b]);
    return this;
  }

  /** A label beside side a-b, on the side the unit normal n points to. */
  sideLabel(a: P, b: P, text: string, n: P): this {
    const mid: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const t: P = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
    const hw = textWidth(text) / 2 + 2;
    const cands: P[] = [];
    const base = Math.abs(n[0]) * hw + Math.abs(n[1]) * 7 + 4;
    for (const extra of [0, 3, 6, 9, 12, 16, 20, 26, 34]) for (const s of [0, 8, -8, 16, -16, 26, -26]) cands.push([mid[0] + n[0] * (base + extra) + t[0] * s, mid[1] + n[1] * (base + extra) + t[1] * s]);
    return this.place(text, cands);
  }

  /** A label centred as close as possible to c (inside a shape, say). */
  textNear(c: P, text: string): this {
    const cands: P[] = [];
    for (const r of [0, 6, 12, 18, 26]) for (let k = 0; k < 8; k++) cands.push([c[0] + r * Math.cos((k * Math.PI) / 4), c[1] + r * Math.sin((k * Math.PI) / 4)]);
    return this.place(text, cands, true);
  }

  private place(text: string, cands: P[], inside = false): this {
    const wpx = textWidth(text);
    const hw = wpx / 2 + 1.5;
    let best: { score: number; box: Box; anchor: P } | null = null;
    for (const c of cands) {
      const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - 6.5, y1: c[1] + 6.5 };
      const anchor: P = [c[0] - 8 - wpx / 2, c[1] - 12.3];
      let score = 99;
      for (const [a, b] of this.obstacles) score = Math.min(score, distSegBox(a, b, box) - 2, distPtSeg(anchor, a, b) - 7);
      for (const l of this.labels) score = Math.min(score, distBoxBox(l.box, box) - 2, distPtBox(anchor, l.box) - 6, distPtBox(l.anchor, box) - 6);
      if (!inside && this.fills.some((f) => inPoly(anchor, f))) score = Math.min(score, -3);
      if (!best || score > best.score) best = { score, box, anchor };
      if (score >= 0) break;
    }
    if (best) this.labels.push({ text, box: best.box, anchor: best.anchor });
    return this;
  }

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
    if (w > CANVAS) return null;
    const H = Math.ceil(maxY - minY);
    const ox = minX - (CANVAS - w) / 2;
    const T = (p: P): P => [r2(p[0] - ox), r2(p[1] - minY)];
    const points: PlanePoint[] = this.labels.map((l) => {
      const [x, y] = T(l.anchor);
      return { x, y, label: l.text, color: 'muted' as const, open: true };
    });
    const fig: PlaneFigure = {
      type: 'plane',
      grid: { xMin: 0, xMax: CANVAS, yMin: 0, yMax: H, step: Math.max(CANVAS, H) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.fill ? { fill: true } : {}) })),
      caption,
    };
    if (this.segs.length) fig.segments = this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) }));
    if (points.length) fig.points = points;
    return fig;
  }
}

function render(make: (scale: number) => Drawing, caption: string): PlaneFigure {
  for (const s of [1, 0.9, 0.8, 0.7, 0.6, 0.5]) {
    const f = make(s).build(caption);
    if (f) return f;
  }
  return make(0.4).build(caption)!;
}

/** Outward unit normals for each side of a polygon. */
function outward(pts: P[]): P[] {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    area += x1 * y2 - x2 * y1;
  }
  return pts.map((a, i) => {
    const b = pts[(i + 1) % pts.length];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return area > 0 ? [dy / len, -dx / len] : [-dy / len, dx / len];
  });
}

/** A polygon (real coordinates, scaled to fit) with a label on each side (null for none). */
function polyFig(real: P[], labels: Array<string | null>, caption: string, inside?: string): PlaneFigure {
  const xs = real.map((p) => p[0]);
  const ys = real.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  const k0 = Math.min(230 / (Math.max(...xs) - x0 || 1), 170 / (Math.max(...ys) - y0 || 1));
  return render((s) => {
    const pts = real.map(([x, y]) => [(x - x0) * k0 * s, (y - y0) * k0 * s] as P);
    const d = new Drawing().poly(pts);
    const ns = outward(pts);
    pts.forEach((a, i) => {
      const t = labels[i];
      if (t) d.sideLabel(a, pts[(i + 1) % pts.length], t, ns[i]);
    });
    if (inside) {
      const cx = pts.reduce((sum, p) => sum + p[0], 0) / pts.length;
      const cy = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
      d.textNear([cx, cy], inside);
    }
    return d;
  }, caption);
}

/** A rectangle drawn roughly to shape (never thinner than 1 : 3), labelled on the bottom and right sides. */
function rectFig(l: number, w: number, u: string, opts: { all?: boolean; wLabel?: string; lLabel?: string; inside?: string } = {}): PlaneFigure {
  const r = Math.min(Math.max(w / l, 0.33), 1.5);
  const lLab = opts.lLabel ?? `${gt(l)} ${u}`;
  const wLab = opts.wLabel ?? `${gt(w)} ${u}`;
  return polyFig(
    [[0, 0], [1, 0], [1, r], [0, r]],
    [lLab, wLab, opts.all ? lLab : null, opts.all ? wLab : null],
    `A rectangle, ${lLab} by ${wLab}`,
    opts.inside,
  );
}

/** A shape on centimetre grid paper (each square 1 cm by 1 cm), with a square of empty grid around it. */
function gridShape(pts: P[], caption: string): PlaneFigure {
  const W = Math.max(...pts.map((p) => p[0])) + 1;
  const H = Math.max(...pts.map((p) => p[1])) + 1;
  const sh = pts.map(([x, y]) => [x + 1, y + 1] as P);
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: Math.max(W + 1, 8), yMin: 0, yMax: Math.max(H + 1, 5), step: 1 },
    hideTickLabels: true,
    hideAxes: true,
    polylines: [{ points: [...sh, sh[0]], fill: true }],
    caption,
  };
}

/** Area of a polygon (shoelace). */
function polyArea(pts: P[]): number {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

// ---------------------------------------------------------------------------
// 10.1 Units of area
// ---------------------------------------------------------------------------

type U = 'cm' | 'm' | 'km';
const UNIT_TEXT: Record<U, string> = {
  cm: 'square centimetres ($\\text{cm}^2$)',
  m: 'square metres ($\\text{m}^2$)',
  km: 'square kilometres ($\\text{km}^2$)',
};
const UNIT_WHY: Record<U, string> = {
  cm: 'A square centimetre is about the size of the tip of your finger. It is a good unit for small things you can hold.',
  m: 'A square metre is a square $1\\ \\text{m}$ long on each side, about the size of a small table top. It is a good unit for floors, gardens and fields.',
  km: 'A square kilometre is a square $1\\ \\text{km}$ long on each side, about a 15-minute walk along each side. It is a good unit for towns, lakes and parks.',
};

const UNIT_OBJECTS: Array<{ what: string; u: U }> = [
  { what: 'a postage stamp', u: 'cm' },
  { what: 'a sticky note', u: 'cm' },
  { what: 'the screen of a phone', u: 'cm' },
  { what: 'the cover of a notebook', u: 'cm' },
  { what: 'a playing card', u: 'cm' },
  { what: 'a hockey card', u: 'cm' },
  { what: 'a bookmark', u: 'cm' },
  { what: 'a cracker', u: 'cm' },
  { what: 'the floor of a classroom', u: 'm' },
  { what: 'a basketball court', u: 'm' },
  { what: 'a vegetable garden', u: 'm' },
  { what: 'the floor of a tent', u: 'm' },
  { what: 'a school playground', u: 'm' },
  { what: 'a hockey rink', u: 'm' },
  { what: 'a bedroom wall', u: 'm' },
  { what: 'a soccer field', u: 'm' },
  { what: 'a large lake', u: 'km' },
  { what: 'a town', u: 'km' },
  { what: 'a provincial park', u: 'km' },
  { what: 'a city', u: 'km' },
  { what: 'a big forest', u: 'km' },
];

function chooseUnit(rng: Rng): Out {
  const o = rng.pick(UNIT_OBJECTS);
  const order: U[] = ['cm', 'm', 'km'];
  return {
    prompt: `Which unit is the best choice for the area of ${o.what}?`,
    parts: [{ answer: fixedChoice(order.map((u) => UNIT_TEXT[u]), order.indexOf(o.u)) }],
    hints: ['Think about how big the thing is. Can you hold it? Can you walk across it? Would it take a long drive to cross?', 'Use $\\text{cm}^2$ for small things, $\\text{m}^2$ for rooms and fields, and $\\text{km}^2$ for very large places.'],
    solution: [
      UNIT_WHY[o.u],
      o.u === 'cm' ? `${o.what.charAt(0).toUpperCase() + o.what.slice(1)} is small enough to hold, so square metres would be far too big.` : o.u === 'm' ? `${o.what.charAt(0).toUpperCase() + o.what.slice(1)} is much bigger than your hand, but you can walk across it in a short time.` : `${o.what.charAt(0).toUpperCase() + o.what.slice(1)} is so big that square metres would give a huge number.`,
      `Use ${UNIT_TEXT[o.u]}.`,
    ],
    answerDisplay: UNIT_TEXT[o.u],
  };
}

/** A rectilinear shape on centimetre grid paper: count the squares. */
function countSquares(rng: Rng): Out {
  const kind = rng.pick(['rect', 'L', 'T', 'step', 'U']);
  let pts: P[];
  for (;;) {
    const w = rng.int(3, 7);
    const h = rng.int(2, 5);
    if (kind === 'rect') pts = [[0, 0], [w, 0], [w, h], [0, h]];
    else if (kind === 'L') {
      const a = rng.int(1, w - 1);
      const b = rng.int(1, h - 1);
      pts = [[0, 0], [w, 0], [w, b], [a, b], [a, h], [0, h]];
    } else if (kind === 'T') {
      if (w < 3 || h < 3) continue;
      const s = rng.int(1, w - 2);
      if ((w - s) % 2) continue;
      const m = (w - s) / 2;
      const t = rng.int(1, h - 2);
      pts = [[m, 0], [m + s, 0], [m + s, h - t], [w, h - t], [w, h], [0, h], [0, h - t], [m, h - t]];
    } else if (kind === 'step') {
      if (w < 3 || h < 3) continue;
      const a = rng.int(1, w - 2);
      const b = rng.int(a + 1, w - 1);
      const c = rng.int(1, h - 2);
      const e = rng.int(c + 1, h - 1);
      pts = [[0, 0], [w, 0], [w, c], [b, c], [b, e], [a, e], [a, h], [0, h]];
    } else {
      if (w < 3 || h < 2) continue;
      const a = rng.int(1, Math.floor((w - 1) / 2));
      const b = rng.int(1, h - 1);
      if (w - 2 * a < 1) continue;
      pts = [[0, 0], [w, 0], [w, h], [w - a, h], [w - a, b], [a, b], [a, h], [0, h]];
    }
    break;
  }
  const area = polyArea(pts);
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} drew this shape on centimetre grid paper. Each small square is $1\\ \\text{cm}$ by $1\\ \\text{cm}$, so it has an area of $1\\ ${sq('cm')}$. What is the area of the shape?`,
    figure: gridShape(pts, 'A shape on centimetre grid paper'),
    parts: [intPart(area, { suffix: `cm${SUP2}` })],
    hints: ['Count the squares inside the shape. Each one is $1\\ \\text{cm}^2$.', 'Count row by row, then add the rows. You can also split the shape into rectangles.'],
    solution: [
      'Each small square is $1\\ \\text{cm}^2$, so the area is the number of squares inside the shape.',
      `Counting row by row, there are $${area}$ squares.`,
      `The area is $${A(area, 'cm')}$.`,
    ],
  };
}

/** Shapes with slanted sides on grid paper: count whole squares and half squares. */
function halfSquares(rng: Rng): Out {
  const kind = rng.pick(['tri', 'house', 'para', 'trap', 'diamond']);
  let pts: P[];
  if (kind === 'tri') {
    const n = rng.int(3, 6);
    pts = rng.chance(0.5) ? [[0, 0], [n, 0], [0, n]] : [[0, 0], [n, 0], [n, n]];
  } else if (kind === 'house') {
    const w = rng.pick([2, 4, 6]);
    const h = rng.int(2, 4);
    pts = [[0, 0], [w, 0], [w, h], [w / 2, h + w / 2], [0, h]];
  } else if (kind === 'para') {
    const b = rng.int(3, 5);
    const h = rng.int(2, 3);
    pts = [[0, 0], [b, 0], [b + h, h], [h, h]];
  } else if (kind === 'trap') {
    const h = rng.int(1, 3);
    const b = rng.int(2 * h + 1, 2 * h + 4);
    pts = [[0, 0], [b, 0], [b - h, h], [h, h]];
  } else {
    const n = rng.int(2, 3);
    pts = [[n, 0], [2 * n, n], [n, 2 * n], [0, n]];
  }
  const area = polyArea(pts);
  // Count squares cut by the slanted sides (each is exactly half inside).
  let whole = 0;
  let half = 0;
  const W = Math.max(...pts.map((p) => p[0]));
  const H = Math.max(...pts.map((p) => p[1]));
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      // Sample points that sit off both diagonals of the square.
      const inside = [[x + 0.5, y + 0.2], [x + 0.8, y + 0.5], [x + 0.5, y + 0.8], [x + 0.2, y + 0.5]].filter((q) => inPoly(q as P, pts)).length;
      if (inside === 4) whole++;
      else if (inside > 0) half++;
    }
  }
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} drew this shape on centimetre grid paper. Each small square is $1\\ ${sq('cm')}$. The slanted sides cut some squares exactly in half. What is the area of the shape?`,
    figure: gridShape(pts, 'A shape with slanted sides on centimetre grid paper'),
    parts: [numPart(area, { suffix: `cm${SUP2}`, exact: false })],
    hints: ['Count the whole squares first. Then count the half squares.', 'Two half squares make $1$ whole square: $1\\ \\text{cm}^2$.'],
    solution: [
      `There are $${whole}$ whole squares: $${whole}\\ ${sq('cm')}$.`,
      `There are $${half}$ half squares. Two halves make one whole, so they make $${half} \\div 2 = ${g(half / 2)}\\ ${sq('cm')}$.`,
      `Area $= ${whole} + ${g(half / 2)} = ${g(area)}\\ ${sq('cm')}$`,
      `The area is $${A(area, 'cm')}$.`,
    ],
  };
}

function convert(rng: Rng): Out {
  const kind = rng.pick(['m-cm', 'cm-m', 'km-m', 'm-km', 'm-cm']);
  const k = rng.int(2, 9);
  const who = rng.pick(NAMES);
  const M2CM = 'A square metre is a square $100\\ \\text{cm}$ long on each side. It holds $100$ rows of $100$ square centimetres, so $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$.';
  const KM2M = 'A square kilometre is a square $1\\,000\\ \\text{m}$ long on each side. It holds $1\\,000$ rows of $1\\,000$ square metres, so $1\\ \\text{km}^2 = 1\\,000 \\times 1\\,000 = 1\\,000\\,000\\ \\text{m}^2$.';
  switch (kind) {
    case 'm-cm': {
      const ctx = rng.pick([`${who}'s bedroom window has an area of $${A(k, 'm')}$.`, `A table top has an area of $${A(k, 'm')}$.`, `A rug has an area of $${A(k, 'm')}$.`]);
      return {
        prompt: `${ctx} What is its area in square centimetres?`,
        parts: [intPart(k * 10000, { suffix: `cm${SUP2}` })],
        hints: ['How many square centimetres fit in $1\\ \\text{m}^2$? Think of a square $100\\ \\text{cm}$ by $100\\ \\text{cm}$.', '$1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$. Multiply by the number of square metres.'],
        solution: [M2CM, `$${A(k, 'm')} = ${k} \\times 10\\,000\\ ${sq('cm')} = ${A(k * 10000, 'cm')}$`, `The area is $${A(k * 10000, 'cm')}$.`],
      };
    }
    case 'cm-m': {
      const ctx = rng.pick([`A mural on the gym wall has an area of $${A(k * 10000, 'cm')}$.`, `A banner for a school play has an area of $${A(k * 10000, 'cm')}$.`, `${who}'s class covered a bulletin board with an area of $${A(k * 10000, 'cm')}$.`]);
      return {
        prompt: `${ctx} What is the area in square metres?`,
        parts: [intPart(k, { suffix: `m${SUP2}` })],
        hints: ['$1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$.', 'How many groups of $10\\,000\\ \\text{cm}^2$ are there?'],
        solution: [M2CM, `$${A(k * 10000, 'cm')}$ is $${k}$ groups of $10\\,000\\ ${sq('cm')}$, so it is $${A(k, 'm')}$.`, `The area is $${A(k, 'm')}$.`],
      };
    }
    case 'km-m': {
      const ctx = rng.pick([`A provincial park has an area of $${A(k, 'km')}$.`, `A lake has an area of $${A(k, 'km')}$.`, `A town has an area of $${A(k, 'km')}$.`]);
      return {
        prompt: `${ctx} What is its area in square metres?`,
        parts: [intPart(k * 1000000, { suffix: `m${SUP2}` })],
        hints: ['How many square metres fit in $1\\ \\text{km}^2$? Think of a square $1\\,000\\ \\text{m}$ by $1\\,000\\ \\text{m}$.', '$1\\ \\text{km}^2 = 1\\,000\\,000\\ \\text{m}^2$. Multiply by the number of square kilometres.'],
        solution: [KM2M, `$${A(k, 'km')} = ${k} \\times 1\\,000\\,000\\ ${sq('m')} = ${A(k * 1000000, 'm')}$`, `The area is $${A(k * 1000000, 'm')}$.`],
      };
    }
    default: {
      const ctx = rng.pick([`A ranch has an area of $${A(k * 1000000, 'm')}$.`, `A forest has an area of $${A(k * 1000000, 'm')}$.`, `A lake has an area of $${A(k * 1000000, 'm')}$.`]);
      return {
        prompt: `${ctx} What is its area in square kilometres?`,
        parts: [intPart(k, { suffix: `km${SUP2}` })],
        hints: ['$1\\ \\text{km}^2 = 1\\,000\\,000\\ \\text{m}^2$.', 'How many groups of $1\\,000\\,000\\ \\text{m}^2$ are there?'],
        solution: [KM2M, `$${A(k * 1000000, 'm')}$ is $${k}$ groups of $1\\,000\\,000\\ ${sq('m')}$, so it is $${A(k, 'km')}$.`, `The area is $${A(k, 'km')}$.`],
      };
    }
  }
}

const BENCH: Array<{ what: string; n: number; u: 'cm' | 'm' }> = [
  { what: 'the tip of your finger', n: 1, u: 'cm' },
  { what: 'a postage stamp', n: 6, u: 'cm' },
  { what: 'a sticky note', n: 60, u: 'cm' },
  { what: 'a sheet of printer paper', n: 600, u: 'cm' },
  { what: 'the screen of a phone', n: 90, u: 'cm' },
  { what: 'a classroom door', n: 2, u: 'm' },
  { what: 'the top of a single bed', n: 2, u: 'm' },
  { what: 'the top of a ping-pong table', n: 4, u: 'm' },
  { what: 'the floor of a classroom', n: 80, u: 'm' },
  { what: 'a basketball court', n: 400, u: 'm' },
];

function benchmark(rng: Rng): Out {
  const b = rng.pick(BENCH);
  const other: 'cm' | 'm' = b.u === 'cm' ? 'm' : 'cm';
  const ab = (n: number, u: U) => `about $${A(n, u)}$`;
  const bigger = b.n * 100 <= 100000 ? b.n * 100 : b.n / 100;
  const answer = mc(rng, ab(b.n, b.u), [ab(b.n, other), ab(bigger, b.u), ab(b.n, 'km')]);
  return {
    prompt: `Which is the best estimate for the area of ${b.what}?`,
    parts: [{ answer }],
    hints: [
      'Benchmarks: $1\\ \\text{cm}^2$ is about the tip of your finger. $1\\ \\text{m}^2$ is about a small table top.',
      `Is ${b.what} closer to a few fingertips or a few table tops? How many would cover it?`,
    ],
    solution: [
      b.u === 'cm'
        ? `${b.what.charAt(0).toUpperCase() + b.what.slice(1)} is small, so measure it in square centimetres. About $${g(b.n)}$ fingertips would cover it.`
        : `${b.what.charAt(0).toUpperCase() + b.what.slice(1)} is bigger than you, so measure it in square metres. About $${g(b.n)}$ squares $1\\ \\text{m}$ by $1\\ \\text{m}$ would cover it.`,
      b.u === 'cm'
        ? `$${A(b.n, 'm')}$ and $${A(b.n, 'km')}$ are far too big, and $${A(bigger, b.u)}$ is ${bigger > b.n ? '100 times too big' : '100 times too small'}.`
        : `$${A(b.n, 'cm')}$ is far too small, $${A(b.n, 'km')}$ is far too big, and $${A(bigger, b.u)}$ is ${bigger > b.n ? '100 times too big' : '100 times too small'}.`,
      `The best estimate is ${ab(b.n, b.u)}.`,
    ],
  };
}

/** Two areas in different units: which is larger, and by how much? */
function compareUnits(rng: Rng): Out {
  const who = rng.pick(NAMES);
  if (rng.chance(0.6)) {
    const a = rng.int(2, 8);
    const diff = rng.pick([2000, 4000, 5000, 6000, 8000, 10000, 15000]) * rng.pick([1, -1]);
    const b = a * 10000 + diff;
    const big = b > a * 10000 ? 'B' : 'A';
    const d = Math.abs(diff);
    const thing = rng.pick(['garden', 'mural', 'patio', 'banner']);
    return {
      prompt: `${who} is comparing two ${thing}s. ${thing.charAt(0).toUpperCase() + thing.slice(1)} A has an area of $${A(a, 'm')}$. ${thing.charAt(0).toUpperCase() + thing.slice(1)} B has an area of $${A(b, 'cm')}$. Which ${thing} is larger, and by how many square centimetres?`,
      parts: [part(fixedChoice([`${thing.charAt(0).toUpperCase() + thing.slice(1)} A`, `${thing.charAt(0).toUpperCase() + thing.slice(1)} B`], big === 'A' ? 0 : 1), { label: 'Larger:' }), intPart(d, { label: 'Difference:', suffix: `cm${SUP2}` })],
      hints: ['Write both areas in the same unit first. $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$.', 'Then subtract the smaller area from the larger area.'],
      solution: [
        `$${A(a, 'm')} = ${a} \\times 10\\,000\\ ${sq('cm')} = ${A(a * 10000, 'cm')}$`,
        `Compare: $${A(a * 10000, 'cm')}$ and $${A(b, 'cm')}$. ${thing.charAt(0).toUpperCase() + thing.slice(1)} ${big} is larger.`,
        `Difference: $${g(Math.max(a * 10000, b))} - ${g(Math.min(a * 10000, b))} = ${A(d, 'cm')}$`,
        `${thing.charAt(0).toUpperCase() + thing.slice(1)} ${big} is larger by $${A(d, 'cm')}$.`,
      ],
    };
  }
  const part2 = rng.pick([150000, 250000, 300000, 450000, 600000, 750000, 800000]);
  const place = rng.pick([
    ['A provincial park', 'a farm'],
    ['A lake', 'a pond'],
    ['A forest', 'a meadow'],
    ['A ranch', 'a field'],
  ]);
  return {
    prompt: `${place[0]} has an area of $${A(1, 'km')}$. ${place[1].charAt(0).toUpperCase() + place[1].slice(1)} next to it has an area of $${A(part2, 'm')}$. How many square metres larger is ${place[0].toLowerCase()}?`,
    parts: [intPart(1000000 - part2, { suffix: `m${SUP2}` })],
    hints: ['Write both areas in square metres. $1\\ \\text{km}^2 = 1\\,000\\,000\\ \\text{m}^2$.', 'Then subtract.'],
    solution: [
      `$${A(1, 'km')} = ${A(1000000, 'm')}$`,
      `$${g(1000000)} - ${g(part2)} = ${g(1000000 - part2)}$`,
      `${place[0]} is larger by $${A(1000000 - part2, 'm')}$.`,
    ],
  };
}

/** How many tiles or posters of a given area cover a wall or floor? */
function coverCount(rng: Rng): Out {
  const tile = rng.pick([1000, 2000, 2500, 5000]);
  const per = 10000 / tile;
  const k = rng.int(2, tile === 1000 ? 5 : 6);
  const n = per * k;
  const who = rng.pick(NAMES);
  const [thing, surface] = rng.pick([
    ['poster', 'a wall'],
    ['square of felt', 'a bulletin board'],
    ['foam floor tile', 'a play area'],
    ['photo print', 'a display board'],
  ]);
  return {
    prompt: `Each ${thing} has an area of $${A(tile, 'cm')}$. ${who} wants to cover ${surface} with an area of $${A(k, 'm')}$, with no gaps and no overlaps. How many ${thing === 'square of felt' ? 'squares of felt' : `${thing}s`} are needed?`,
    parts: [intPart(n)],
    hints: ['$1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$. How many pieces cover $1\\ \\text{m}^2$?', 'Then multiply by the number of square metres.'],
    solution: [
      `$1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$, and $${per} \\times ${g(tile)} = ${g(10000)}$, so $${per}$ pieces cover $1\\ \\text{m}^2$.`,
      `For $${A(k, 'm')}$: $${per} \\times ${k} = ${n}$`,
      `${who} needs $${n}$ ${thing === 'square of felt' ? 'squares of felt' : `${thing}s`}.`,
    ],
  };
}

const areaUnits = skill({
  id: 'm5-area-units',
  name: 'Units of area',
  description: 'Relate square centimetres, square metres and square kilometres, choose a suitable unit, and estimate an area with benchmarks or by counting squares.',
  outcomes: ['M1'],
  lessonId: 'm5-10-1',
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.5) ? chooseUnit(rng) : countSquares(rng);
    if (d === 2) {
      const r = rng.next();
      if (r < 0.45) return convert(rng);
      if (r < 0.75) return benchmark(rng);
      return halfSquares(rng);
    }
    return rng.chance(0.55) ? compareUnits(rng) : coverCount(rng);
  },
});

// ---------------------------------------------------------------------------
// 10.2 Area and perimeter of rectangles
// ---------------------------------------------------------------------------

/** Rectangles of a sensible size for the numbers: small (sides up to 12) and large (sides 11 to 60). */
const RECT_THINGS: Record<'small' | 'large', Record<'cm' | 'm', string[]>> = {
  small: {
    cm: ['a sticker', 'a label', 'a sticky note', 'a greeting card', 'a recipe card', 'a ceramic tile', 'a notepad page', 'a name tag'],
    m: ['a garden', 'a lawn', 'a patio', 'a vegetable patch', 'a deck', 'a flower bed', 'a dog run', 'a chicken run'],
  },
  large: {
    cm: ['a photo', 'a poster', 'a placemat', 'a cutting board', 'a picture frame', 'a sheet of art paper', 'a tray', 'a calendar page'],
    m: ['a skating rink', 'a parking lot', 'a vegetable garden', 'a community garden', 'a dog park', 'a playground', 'a field for flag football', 'a school garden'],
  },
};
/** Long, thin rectangles (length up to 99, width up to 9). */
const LONG_THINGS: Record<'cm' | 'm', string[]> = {
  cm: ['a paper banner', 'a shelf board', 'a door sign', 'a strip of wallpaper border', 'a table runner'],
  m: ['a garden path', 'a strip of lawn', 'a sidewalk', 'a hallway floor', 'a swimming lane'],
};

const AREA_HINTS = ['The area of a rectangle is the number of square units that cover it.', 'Area $=$ length $\\times$ width. Write the answer in square units.'];

function rectArea(rng: Rng, d: Difficulty): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const [l, w] =
    d === 1
      ? retry(() => [rng.int(3, 12), rng.int(2, 9)], ([a, b]) => a !== b)
      : rng.chance(0.5)
        ? retry(() => [rng.int(12, 60), rng.int(3, 9)], ([a, b]) => a !== b)
        : retry(() => [rng.int(12, 45), rng.int(11, 30)], ([a, b]) => a !== b && a * b <= 999);
  const thing = rng.pick(RECT_THINGS[d === 1 ? 'small' : 'large'][u]);
  const area = l * w;
  return {
    prompt: `${thing.charAt(0).toUpperCase() + thing.slice(1)} is a rectangle $${L(l, u)}$ long and $${L(w, u)}$ wide. What is its area?`,
    figure: rectFig(l, w, u),
    parts: [intPart(area, { suffix: `${u}${SUP2}` })],
    hints: AREA_HINTS,
    solution: [
      `Area $=$ length $\\times$ width`,
      `$${l} \\times ${w} = ${g(area)}$${d > 1 && w > 9 ? ` (for example, $${l} \\times ${Math.floor(w / 10) * 10} = ${g(l * Math.floor(w / 10) * 10)}$ and $${l} \\times ${w % 10} = ${g(l * (w % 10))}$, then add)` : ''}`,
      `The area is $${A(area, u)}$.`,
    ],
  };
}

function squareArea(rng: Rng): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const s = rng.int(6, 25);
  const thing = u === 'cm' ? rng.pick(['a square quilt block', 'a square cushion', 'a square tile', 'a square napkin']) : rng.pick(['a square garden', 'a square patio', 'a square parking lot', 'a square skating rink']);
  return {
    prompt: `${thing.charAt(0).toUpperCase() + thing.slice(1)} has sides $${L(s, u)}$ long. What is its area?`,
    figure: rectFig(s, s, u),
    parts: [intPart(s * s, { suffix: `${u}${SUP2}` })],
    hints: ['A square is a rectangle whose length and width are equal.', 'Area $=$ side $\\times$ side.'],
    solution: ['A square is a rectangle with all sides equal.', `Area $= ${s} \\times ${s} = ${g(s * s)}$`, `The area is $${A(s * s, u)}$.`],
  };
}

function missingSide(rng: Rng): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const w = rng.int(2, 9);
  const l = retry(() => rng.int(11, 99), (v) => v * w <= 999 && v * w >= 100);
  const area = l * w;
  const thing = rng.pick(LONG_THINGS[u]);
  return {
    prompt: `${thing.charAt(0).toUpperCase() + thing.slice(1)} is a rectangle with an area of $${A(area, u)}$. It is $${L(w, u)}$ wide. How long is it?`,
    figure: rectFig(l, w, u, { lLabel: `? ${u}` }),
    parts: [intPart(l, { suffix: u })],
    hints: ['Area $=$ length $\\times$ width, so length $\\times$ ' + `$${w} = ${g(area)}$.`, 'Divide the area by the width to find the length.'],
    solution: [
      `Area $=$ length $\\times$ width, so $? \\times ${w} = ${g(area)}$.`,
      `Length $= ${g(area)} \\div ${w} = ${l}$`,
      `Check: $${l} \\times ${w} = ${g(area)}$ ✓`,
      `It is $${L(l, u)}$ long.`,
    ],
  };
}

/** An L-shaped room: find a missing side, then split it into rectangles. */
function lShape(rng: Rng): Out {
  const W = rng.int(8, 14);
  const H = rng.int(7, 12);
  const a = rng.int(3, W - 4);
  const b = rng.int(3, H - 4);
  const u = 'm';
  // Vertices counterclockwise from the bottom left; the top-right corner is cut out.
  const pts: P[] = [[0, 0], [W, 0], [W, H - b], [W - a, H - b], [W - a, H], [0, H]];
  const labels = [`${W} m`, `${H - b} m`, null, null, `${W - a} m`, `${H} m`];
  const area = W * H - a * b;
  const thing = rng.pick(['An L-shaped room', 'An L-shaped garden', 'An L-shaped deck', 'An L-shaped classroom']);
  const who = rng.pick(NAMES);
  const left = (W - a) * H;
  const right = a * (H - b);
  return {
    prompt: `${thing} has the measurements shown. ${who} wants to cover all of it with ${thing.includes('garden') ? 'sod' : 'flooring'}. What is its area?`,
    figure: polyFig(pts, labels, 'An L-shaped figure with four sides labelled'),
    parts: [intPart(area, { suffix: `m${SUP2}` })],
    hints: ['Split the shape into two rectangles with a straight line. Find the area of each one, then add.', `A missing side is the difference of two sides: the bottom is $${L(W, u)}$ and the top is $${L(W - a, u)}$.`],
    solution: [
      `The bottom is $${L(W, u)}$ and the top is $${L(W - a, u)}$, so the step on the right is $${W} - ${W - a} = ${a}$ metres wide.`,
      `Split it with a vertical line: a left rectangle $${L(W - a, u)}$ by $${L(H, u)}$ and a right rectangle $${L(a, u)}$ by $${L(H - b, u)}$.`,
      `Left: $${W - a} \\times ${H} = ${left}$. Right: $${a} \\times ${H - b} = ${right}$.`,
      `Total: $${left} + ${right} = ${area}$`,
      `The area is $${A(area, u)}$.`,
    ],
  };
}

/** A photo on a mat, or a rug on a floor: the area left showing. */
function borderArea(rng: Rng): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const [inner, outer] = u === 'cm' ? ['photo', 'mat'] : ['rug', 'floor'];
  const l = u === 'cm' ? rng.int(10, 25) : rng.int(2, 5);
  const w = u === 'cm' ? rng.int(8, l - 1) : rng.int(2, l);
  const m = u === 'cm' ? rng.pick([3, 4, 5]) : rng.int(1, 2);
  const Lo = l + 2 * m;
  const Wo = w + 2 * m;
  const big = Lo * Wo;
  const small = l * w;
  const who = rng.pick(NAMES);
  const prompt =
    u === 'cm'
      ? `${who} put a photo $${L(l, u)}$ by $${L(w, u)}$ on a rectangular mat $${L(Lo, u)}$ by $${L(Wo, u)}$. How much of the mat's area still shows around the photo?`
      : `A rectangular rug $${L(l, u)}$ by $${L(w, u)}$ lies on a rectangular floor $${L(Lo, u)}$ by $${L(Wo, u)}$. How much of the floor's area is not covered by the rug?`;
  return {
    prompt,
    parts: [intPart(big - small, { suffix: `${u}${SUP2}` })],
    hints: [`Find the area of the ${outer} and the area of the ${inner}.`, `Subtract: the part that shows is the ${outer} minus the ${inner}.`],
    solution: [
      `${outer.charAt(0).toUpperCase() + outer.slice(1)}: $${Lo} \\times ${Wo} = ${g(big)}$`,
      `${inner.charAt(0).toUpperCase() + inner.slice(1)}: $${l} \\times ${w} = ${g(small)}$`,
      `Showing: $${g(big)} - ${g(small)} = ${g(big - small)}$`,
      `The area is $${A(big - small, u)}$.`,
    ],
  };
}

/** Boxes of flooring or bags of seed for a rectangle. */
function coverBoxes(rng: Rng): Out {
  const per = rng.pick([2, 3, 4, 5, 6]);
  const [l, w] = retry(() => [rng.int(4, 15), rng.int(3, 12)], ([a, b]) => a !== b && (a * b) % per === 0 && a * b >= 20);
  const area = l * w;
  const n = area / per;
  const who = rng.pick(NAMES);
  const [where, item, items] = rng.pick([
    ['a rectangular lawn', 'bag of grass seed', 'bags of grass seed'],
    ['a rectangular floor', 'box of floor tiles', 'boxes of floor tiles'],
    ['a rectangular wall', 'can of paint', 'cans of paint'],
    ['a rectangular garden', 'bag of mulch', 'bags of mulch'],
  ]);
  return {
    prompt: `${who} wants to cover ${where} that is $${L(l, 'm')}$ long and $${L(w, 'm')}$ wide. Each ${item} covers $${A(per, 'm')}$. How many ${items} does ${who} need?`,
    parts: [intPart(n, { suffix: items.split(' ')[0] })],
    hints: ['First find the area of the rectangle.', `Then find how many groups of $${A(per, 'm')}$ are in that area.`],
    solution: [`Area: $${l} \\times ${w} = ${area}$, so the area is $${A(area, 'm')}$.`, `Number needed: $${area} \\div ${per} = ${n}$`, `${who} needs $${n}$ ${items}.`],
  };
}

function compareRects(rng: Rng): Out {
  const [a, b] = rng.sample(NAMES, 2);
  const [l1, w1, l2, w2] = retry(
    () => [rng.int(5, 15), rng.int(3, 12), rng.int(5, 15), rng.int(3, 12)],
    ([p, q, r, s]) => p !== q && r !== s && p * q !== r * s && Math.abs(p * q - r * s) <= 40 && p + q !== r + s,
  );
  const A1 = l1 * w1;
  const A2 = l2 * w2;
  const thing = rng.pick(['vegetable garden', 'flower bed', 'patio']);
  return {
    prompt: `${a}'s ${thing} is a rectangle $${L(l1, 'm')}$ by $${L(w1, 'm')}$. ${b}'s ${thing} is a rectangle $${L(l2, 'm')}$ by $${L(w2, 'm')}$. Whose ${thing} has the larger area, and by how many square metres?`,
    parts: [part(fixedChoice([`${a}'s`, `${b}'s`], A1 > A2 ? 0 : 1), { label: 'Larger:' }), intPart(Math.abs(A1 - A2), { label: 'Difference:', suffix: `m${SUP2}` })],
    hints: ['Find the area of each rectangle: length $\\times$ width.', 'Subtract the smaller area from the larger one.'],
    solution: [
      `${a}: $${l1} \\times ${w1} = ${A1}$, so $${A(A1, 'm')}$.`,
      `${b}: $${l2} \\times ${w2} = ${A2}$, so $${A(A2, 'm')}$.`,
      `Difference: $${Math.max(A1, A2)} - ${Math.min(A1, A2)} = ${Math.abs(A1 - A2)}$`,
      `${A1 > A2 ? a : b}'s ${thing} is larger by $${A(Math.abs(A1 - A2), 'm')}$.`,
    ],
  };
}

const rectangleArea = skill({
  id: 'm5-rectangle-area',
  name: 'Area of a rectangle',
  description: 'Find the area of a rectangle from its side lengths in square centimetres or square metres, find a missing side from the area, and solve area problems.',
  outcomes: ['M1'],
  lessonId: 'm5-10-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return rectArea(rng, 1);
    if (d === 2) {
      const r = rng.next();
      if (r < 0.4) return rectArea(rng, 2);
      if (r < 0.6) return squareArea(rng);
      return missingSide(rng);
    }
    const r = rng.next();
    if (r < 0.3) return lShape(rng);
    if (r < 0.55) return borderArea(rng);
    if (r < 0.8) return coverBoxes(rng);
    return compareRects(rng);
  },
});

/** Factor pairs a × b with a ≤ b. */
function pairs(n: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let a = 1; a * a <= n; a++) if (n % a === 0) out.push([a, n / a]);
  return out;
}

function perimAndArea(rng: Rng): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const [l, w] = retry(() => [rng.int(3, 12), rng.int(2, 9)], ([a, b]) => a !== b);
  const thing = rng.pick(RECT_THINGS.small[u]);
  const per = 2 * (l + w);
  return {
    prompt: `${thing.charAt(0).toUpperCase() + thing.slice(1)} is a rectangle $${L(l, u)}$ by $${L(w, u)}$. Find its perimeter and its area.`,
    figure: rectFig(l, w, u),
    parts: [intPart(per, { label: 'Perimeter:', suffix: u }), intPart(l * w, { label: 'Area:', suffix: `${u}${SUP2}` })],
    hints: ['The **perimeter** is the distance all the way around: add all four sides. The **area** is the space inside: length $\\times$ width.', 'Perimeter is in units of length (cm or m). Area is in square units (cm² or m²).'],
    solution: [
      `Perimeter $= ${l} + ${w} + ${l} + ${w} = ${per}$, so it is $${L(per, u)}$.`,
      `Area $= ${l} \\times ${w} = ${l * w}$, so it is $${A(l * w, u)}$.`,
      `The perimeter is $${L(per, u)}$ and the area is $${A(l * w, u)}$.`,
    ],
  };
}

const SAME_AREAS = [12, 16, 18, 20, 24, 30, 36, 40, 48];

/** Rectangles with the same area: which has the least (or greatest) perimeter? */
function leastPerimeter(rng: Rng): Out {
  const n = rng.pick(SAME_AREAS);
  const ps = pairs(n).slice(-4);
  const least = rng.chance(0.75);
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const target = least ? ps[ps.length - 1] : ps[0];
  const txt = ([a, b]: [number, number]) => `$${L(a, u)}$ by $${L(b, u)}$`;
  const who = rng.pick(NAMES);
  const answer = mc(rng, txt(target), ps.filter((p) => p !== target).map(txt));
  const ctx =
    u === 'm'
      ? `${who} is planning a rectangular garden with an area of $${A(n, 'm')}$ and whole-metre sides. A fence will go all the way around.`
      : `${who} is cutting a rectangle with an area of $${A(n, 'cm')}$ and whole-centimetre sides out of card. A ribbon will go all the way around the edge.`;
  return {
    prompt: `${ctx} Which rectangle needs the ${least ? '**least**' : '**most**'} ${u === 'm' ? 'fencing' : 'ribbon'}?`,
    parts: [{ answer }],
    hints: ['All these rectangles have the same area. Find the perimeter of each one.', least ? 'The rectangle closest to a square has the least perimeter.' : 'The long, thin rectangle has the greatest perimeter.'],
    solution: [
      ...ps.map(([a, b]) => `${a} by ${b}: area $${a} \\times ${b} = ${n}$, perimeter $2 \\times (${a} + ${b}) = ${2 * (a + b)}$`),
      least
        ? `The ${target[0]} by ${target[1]} rectangle is the closest to a square, and it has the least perimeter.`
        : `The ${target[0]} by ${target[1]} rectangle is the longest and thinnest, and it has the greatest perimeter.`,
      `The answer is ${txt(target)}.`,
    ],
  };
}

function sameAreaTwo(rng: Rng): Out {
  const n = rng.pick(SAME_AREAS);
  const ps = rng.sample(pairs(n), 2).sort((p, q) => p[0] - q[0]);
  const [[a1, b1], [a2, b2]] = ps;
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const [x, y] = rng.sample(NAMES, 2);
  return {
    prompt: `${x} drew a rectangle $${L(b1, u)}$ by $${L(a1, u)}$. ${y} drew a rectangle $${L(b2, u)}$ by $${L(a2, u)}$. Both rectangles have an area of $${A(n, u)}$. Find the perimeter of each rectangle.`,
    parts: [intPart(2 * (a1 + b1), { label: `${x}'s perimeter:`, suffix: u }), intPart(2 * (a2 + b2), { label: `${y}'s perimeter:`, suffix: u })],
    hints: ['Perimeter $=$ length $+$ width $+$ length $+$ width.', 'Rectangles with the same area can have different perimeters.'],
    solution: [
      `${x}: $${b1} + ${a1} + ${b1} + ${a1} = ${2 * (a1 + b1)}$`,
      `${y}: $${b2} + ${a2} + ${b2} + ${a2} = ${2 * (a2 + b2)}$`,
      `The perimeters are $${L(2 * (a1 + b1), u)}$ and $${L(2 * (a2 + b2), u)}$. Same area, different perimeters. The rectangle closer to a square has the smaller perimeter.`,
    ],
  };
}

/** Least fencing for a pen of a given area (whole-metre sides). */
function leastFence(rng: Rng): Out {
  const n = rng.pick([16, 25, 36, 49, 64, 81, 100, 12, 18, 20, 24, 30, 40]);
  const ps = pairs(n);
  const best = ps[ps.length - 1];
  const per = 2 * (best[0] + best[1]);
  const who = rng.pick(NAMES);
  const pen = rng.pick(['a rectangular dog run', 'a rectangular rabbit pen', 'a rectangular garden', 'a rectangular play area']);
  return {
    prompt: `${who} is building ${pen} with an area of $${A(n, 'm')}$. The sides must be whole metres. ${who} wants to use as little fencing as possible. How many metres of fencing are needed?`,
    parts: [intPart(per, { suffix: 'm' })],
    hints: [`List every rectangle with whole-metre sides and an area of $${A(n, 'm')}$.`, 'Find the perimeter of each one. The rectangle closest to a square has the least perimeter.'],
    solution: [
      `Rectangles with area $${n}$: ${ps.map(([a, b]) => `${a} by ${b}`).join(', ')}.`,
      `Perimeters: ${ps.map(([a, b]) => `$${2 * (a + b)}$`).join(', ')}.`,
      best[0] === best[1] ? `The ${best[0]} by ${best[1]} square has the least perimeter: $2 \\times (${best[0]} + ${best[1]}) = ${per}$.` : `The ${best[0]} by ${best[1]} rectangle is closest to a square and has the least perimeter: $2 \\times (${best[0]} + ${best[1]}) = ${per}$.`,
      `${who} needs $${L(per, 'm')}$ of fencing.`,
    ],
  };
}

/** Area and one side given: find the perimeter. */
function areaToPerimeter(rng: Rng): Out {
  const [l, w] = retry(() => [rng.int(4, 15), rng.int(2, 9)], ([a, b]) => a !== b);
  const area = l * w;
  const who = rng.pick(NAMES);
  const pen = rng.pick(['garden', 'chicken run', 'skating rink', 'sandbox']);
  return {
    prompt: `${who}'s rectangular ${pen} has an area of $${A(area, 'm')}$. It is $${L(l, 'm')}$ long. How much fencing is needed to go all the way around it?`,
    parts: [intPart(2 * (l + w), { suffix: 'm' })],
    hints: ['First find the width: area $\\div$ length.', 'Then find the perimeter: add all four sides.'],
    solution: [`Width $= ${area} \\div ${l} = ${w}$, so the ${pen} is $${L(w, 'm')}$ wide.`, `Perimeter $= ${l} + ${w} + ${l} + ${w} = ${2 * (l + w)}$`, `The fencing needed is $${L(2 * (l + w), 'm')}$.`],
  };
}

/** Perimeter and one side given: find the area. */
function perimeterToArea(rng: Rng): Out {
  const u: 'cm' | 'm' = rng.pick(['cm', 'm']);
  const [l, w] = u === 'cm' ? retry(() => [rng.int(2, 9) * 10, rng.int(1, 6) * 10], ([a, b]) => a > b) : retry(() => [rng.int(5, 20), rng.int(3, 12)], ([a, b]) => a > b);
  const per = 2 * (l + w);
  const thing = u === 'cm' ? rng.pick(['poster', 'picture frame', 'bulletin board']) : rng.pick(['garden', 'patio', 'parking lot']);
  return {
    prompt: `A rectangular ${thing} has a perimeter of $${L(per, u)}$. It is $${L(w, u)}$ wide. What is its area?`,
    parts: [intPart(l * w, { suffix: `${u}${SUP2}` })],
    hints: ['The perimeter is two lengths and two widths. Take away the two widths to find the two lengths.', 'Find one length, then multiply length $\\times$ width.'],
    solution: [
      `Two widths: $2 \\times ${w} = ${2 * w}$. Two lengths: $${per} - ${2 * w} = ${2 * l}$. One length: $${2 * l} \\div 2 = ${l}$.`,
      `Area $= ${l} \\times ${w} = ${g(l * w)}$`,
      `The area is $${A(l * w, u)}$.`,
    ],
  };
}

const areaPerimeter = skill({
  id: 'm5-area-perimeter',
  name: 'Area and perimeter of rectangles',
  description: 'Find the perimeter and area of rectangles, compare the perimeters of rectangles with the same area, and solve perimeter and area problems.',
  outcomes: ['M1'],
  lessonId: 'm5-10-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return perimAndArea(rng);
    if (d === 2) return rng.chance(0.55) ? leastPerimeter(rng) : sameAreaTwo(rng);
    const r = rng.next();
    if (r < 0.35) return leastFence(rng);
    if (r < 0.7) return areaToPerimeter(rng);
    return perimeterToArea(rng);
  },
});

export const AREA_SKILLS: SkillDef[] = [areaUnits, rectangleArea, areaPerimeter];
