/** Math 9 Unit 1 — Square Roots and Surface Area (N5, N6, SS2): square roots of rational numbers, estimates of square roots, and the surface area of composite objects. */
import { fixedChoice, mc, numPart, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { CubesFigure, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia', 'Yusuf', 'Brooklyn', 'Sanjay', 'Tanis',
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const exact = (x: number) => roundTo(x, 6);
const n = (x: number, dec = 4) => fmt(x, dec);
const nf = (x: number, dec: number) => fmtFixed(x, dec);
const sq = (u: string) => `\\ \\text{${u}}^2`;
const un = (u: string) => `\\ \\text{${u}}`;
const len = (x: number, u: string) => `$${n(x)}${un(u)}$`;

/** True when rounding to `dec` places sits close to a ...5 boundary. */
function nearHalf(v: number, dec: number): boolean {
  const x = Math.abs(v) * 10 ** dec;
  return Math.abs(x - Math.floor(x) - 0.5) < 0.06;
}

/** A decimal or fraction in LaTeX, e.g. 0.49 or \frac{9}{16}. */
const fracTex = (a: number, b: number) => `\\frac{${a}}{${b}}`;
const dfracTex = (a: number, b: number) => `\\dfrac{${a}}{${b}}`;

// ---------------------------------------------------------------------------
// Plane drawings with labels placed clear of every line
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';
const r3 = (x: number) => Math.round(x * 1000) / 1000;
/** Width in px of the plot area of a plane figure (380 px wide, no axis titles). */
const PLOT_W = 340;

function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : ch === '.' || ch === ',' ? 4 : /[mMwW]/.test(ch) ? 10.5 : /[il1]/.test(ch) ? 4.5 : 7.4;
  return w;
}

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** Does segment ab meet the box? (Liang–Barsky) */
function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const tests: Array<[number, number]> = [
    [-dx, a[0] - box.x0],
    [dx, box.x1 - a[0]],
    [-dy, a[1] - box.y0],
    [dy, box.y1 - a[1]],
  ];
  for (const [p, q] of tests) {
    if (Math.abs(p) < 1e-12) {
      if (q < 0) return false;
      continue;
    }
    const t = q / p;
    if (p < 0) t0 = Math.max(t0, t);
    else t1 = Math.min(t1, t);
    if (t0 > t1) return false;
  }
  return true;
}

function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
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

interface LabelReq {
  text: string;
  /** Candidate centres, given the scale in px per unit. */
  cands: (ppu: number) => P[];
}

/**
 * Collects filled polygons, segments and labels, then lays them out on a blank canvas. Each label is
 * drawn by an invisible point and placed where its text stays clear of every line.
 */
class Drawing {
  polys: Array<{ points: P[]; color: Color; fill: boolean }> = [];
  segs: PlaneSegment[] = [];
  labels: LabelReq[] = [];
  extra: P[] = [];

  poly(points: P[], color: Color = 'brand', fill = true) {
    const closed = points[0][0] === points[points.length - 1][0] && points[0][1] === points[points.length - 1][1];
    this.polys.push({ points: closed ? points : [...points, points[0]], color, fill });
    return this;
  }

  /** An open polyline (not filled). */
  line(points: P[], color: Color = 'brand') {
    this.polys.push({ points, color, fill: false });
    return this;
  }

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    return this;
  }

  /** Label near point p, preferably in direction `dir` (degrees). */
  label(text: string, p: P, dir: number, minPx = 12) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        const at = (off: number, d: number) => {
          const a = ((dir + off) * Math.PI) / 180;
          const w = textWidth(text) / 2;
          // Push the centre out by the half-size of the text box in that direction.
          const ext = Math.abs(Math.cos(a)) * (w + 2) + Math.abs(Math.sin(a)) * 7;
          out.push([p[0] + (Math.cos(a) * (d + ext)) / ppu, p[1] + (Math.sin(a) * (d + ext)) / ppu]);
        };
        const ds = [minPx, minPx + 4, minPx + 9, minPx + 15, minPx + 22, minPx + 30, minPx + 40];
        // Close to the preferred direction first (even a little further out), then anywhere around.
        for (const off of [0, 20, -20, 40, -40]) for (const d of ds) at(off, d);
        for (const d of ds) for (const off of [65, -65, 90, -90, 130, -130, 180]) at(off, d);
        return out;
      },
    });
    return this;
  }

  /** Label inside an angle at vertex p, along the direction `dir` (degrees) into the angle. */
  angleLabel(text: string, p: P, dir: number, minPx = 14) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (let d = minPx; d <= minPx + 60; d += 5)
          for (const off of [0, 8, -8, 15, -15]) {
            const a = ((dir + off) * Math.PI) / 180;
            const w = textWidth(text) / 2;
            const ext = Math.abs(Math.cos(a)) * (w + 2) + Math.abs(Math.sin(a)) * 7;
            out.push([p[0] + (Math.cos(a) * (d + ext)) / ppu, p[1] + (Math.sin(a) * (d + ext)) / ppu]);
          }
        return out;
      },
    });
    return this;
  }

  /** Label centred on p (inside a face), nudged only if needed. */
  centre(text: string, p: P) {
    this.labels.push({
      text,
      cands: (ppu) => {
        const out: P[] = [p];
        for (let r = 3; r <= 30; r += 3) for (let a = 0; a < 360; a += 30) out.push([p[0] + (r * Math.cos((a * Math.PI) / 180)) / ppu, p[1] + (r * Math.sin((a * Math.PI) / 180)) / ppu]);
        return out;
      },
    });
    return this;
  }

  include(p: P) {
    this.extra.push(p);
    return this;
  }

  private edges(): Array<[P, P]> {
    const out: Array<[P, P]> = [];
    for (const pl of this.polys) for (let i = 0; i + 1 < pl.points.length; i++) out.push([pl.points[i], pl.points[i + 1]]);
    for (const s of this.segs) out.push([s.from, s.to]);
    return out;
  }

  bbox(): Box {
    const pts: P[] = [...this.polys.flatMap((p) => p.points), ...this.segs.flatMap((s) => [s.from, s.to]), ...this.extra];
    return {
      x0: Math.min(...pts.map((p) => p[0])),
      x1: Math.max(...pts.map((p) => p[0])),
      y0: Math.min(...pts.map((p) => p[1])),
      y1: Math.max(...pts.map((p) => p[1])),
    };
  }

  /** Place the labels for a figure `xr` units wide; returns the label points and their boxes. */
  private place(xr: number): { points: PlanePoint[]; boxes: Box[] } {
    const ppu = PLOT_W / xr;
    const edges = this.edges();
    const boxes: Box[] = [];
    const points: PlanePoint[] = [];
    for (const lab of this.labels) {
      const w = textWidth(lab.text);
      const hw = (w / 2 + 2) / ppu;
      const hh = 7 / ppu;
      const cands = lab.cands(ppu);
      // Take the first spot with no clash; if every spot clashes, the one with the fewest.
      let chosen = cands[0];
      let best = Infinity;
      for (const c of cands) {
        const box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const anchor: P = [c[0] - (8 + w / 2) / ppu, c[1] - 12.4 / ppu];
        const pad = 3 / ppu;
        const bad =
          3 * edges.filter(([a, b]) => segHitsBox(a, b, box)).length +
          edges.filter(([a, b]) => distPtSeg(anchor, a, b) < 6 / ppu).length +
          // The invisible anchor dot would show as a white spot on a shaded face.
          this.polys.filter((pl) => pl.fill && inPoly(anchor, pl.points)).length +
          3 * boxes.filter((o) => !(box.x1 + pad < o.x0 || o.x1 + pad < box.x0 || box.y1 + pad < o.y0 || o.y1 + pad < box.y0)).length;
        if (bad < best) {
          best = bad;
          chosen = c;
        }
        if (bad === 0) break;
      }
      const box = { x0: chosen[0] - hw, x1: chosen[0] + hw, y0: chosen[1] - hh, y1: chosen[1] + hh };
      boxes.push(box);
      const anchor: P = [chosen[0] - (8 + w / 2) / ppu, chosen[1] - 12.4 / ppu];
      boxes.push({ x0: anchor[0] - 5 / ppu, x1: anchor[0] + 5 / ppu, y0: anchor[1] - 5 / ppu, y1: anchor[1] + 5 / ppu });
      points.push({ x: r3(anchor[0]), y: r3(anchor[1]), label: lab.text, color: 'muted', open: true });
    }
    return { points, boxes };
  }

  /** Lay out the figure on a fixed grid of unit squares (no axes or numbers). */
  buildGrid(xMin: number, xMax: number, yMin: number, yMax: number): PlaneFigure {
    const placed = this.place(xMax - xMin);
    return {
      type: 'plane',
      grid: { xMin, xMax, yMin, yMax, step: 1 },
      hideTickLabels: true,
      hideAxes: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(([x, y]) => [r3(x), r3(y)] as P), color: p.color, ...(p.fill && { fill: true }) })),
      ...(this.segs.length && { segments: this.segs.map((s) => ({ ...s, from: [r3(s.from[0]), r3(s.from[1])] as P, to: [r3(s.to[0]), r3(s.to[1])] as P })) }),
      ...(placed.points.length && { points: placed.points }),
    };
  }

  /** Lay out the figure on a blank canvas, at least `min` = [width, height] units. */
  build(opts: { margin?: number; caption?: string; min?: [number, number] } = {}): PlaneFigure {
    const m = opts.margin ?? 0.3;
    const g = this.bbox();
    let box = { x0: g.x0 - m, x1: g.x1 + m, y0: g.y0 - m, y1: g.y1 + m };
    /** At least as wide as it is tall, so a tall drawing does not fill the page. */
    const square = (b: Box) => {
      const wd = b.x1 - b.x0;
      const ht = b.y1 - b.y0;
      return ht > wd ? { ...b, x0: b.x0 - (ht - wd) / 2, x1: b.x1 + (ht - wd) / 2 } : b;
    };
    const grow = (b: Box) => {
      if (!opts.min) return b;
      const [mw, mh] = opts.min;
      const cx = (b.x0 + b.x1) / 2;
      const cy = (b.y0 + b.y1) / 2;
      return { x0: Math.min(b.x0, cx - mw / 2), x1: Math.max(b.x1, cx + mw / 2), y0: Math.min(b.y0, cy - mh / 2), y1: Math.max(b.y1, cy + mh / 2) };
    };
    box = grow(box);
    box = square(box);
    let placed = this.place(box.x1 - box.x0);
    for (let k = 0; k < 4; k++) {
      const all = [box, ...placed.boxes.map((b) => ({ x0: b.x0 - 0.1, x1: b.x1 + 0.1, y0: b.y0 - 0.1, y1: b.y1 + 0.1 }))];
      const nb = square(grow({ x0: Math.min(...all.map((b) => b.x0)), x1: Math.max(...all.map((b) => b.x1)), y0: Math.min(...all.map((b) => b.y0)), y1: Math.max(...all.map((b) => b.y1)) }));
      if (Math.abs(nb.x1 - nb.x0 - (box.x1 - box.x0)) < 1e-6 && Math.abs(nb.y1 - nb.y0 - (box.y1 - box.y0)) < 1e-6) break;
      box = nb;
      placed = this.place(box.x1 - box.x0);
    }
    const xr = box.x1 - box.x0;
    const yr = box.y1 - box.y0;
    return {
      type: 'plane',
      grid: { xMin: r3(box.x0), xMax: r3(box.x1), yMin: r3(box.y0), yMax: r3(box.y1), step: r3(Math.max(xr, yr) + 0.01) },
      hideTickLabels: true,
      polylines: this.polys.map((p) => ({ points: p.points.map(([x, y]) => [r3(x), r3(y)] as P), color: p.color, ...(p.fill && { fill: true }) })),
      ...(this.segs.length && { segments: this.segs.map((s) => ({ ...s, from: [r3(s.from[0]), r3(s.from[1])] as P, to: [r3(s.to[0]), r3(s.to[1])] as P })) }),
      ...(placed.points.length && { points: placed.points }),
      ...(opts.caption && { caption: opts.caption }),
    };
  }
}


// ---------------------------------------------------------------------------
// Lesson 1.1 — Square roots of perfect squares
// ---------------------------------------------------------------------------

/** Decimal perfect squares k² / 100 with a one-decimal root (k not a multiple of 10). */
const TENTHS = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 25];
/** Fractions a/b in lowest terms (a < b or not) with small parts. */
function rootFraction(rng: Rng): [number, number] {
  for (;;) {
    const a = rng.int(1, 11);
    const b = rng.int(2, 12);
    if (a !== b && gcd(a, b) === 1) return [a, b];
  }
}

const isSq = (v: number) => Number.isInteger(Math.sqrt(v));

/** Why num/den is not a perfect square, from its lowest terms. */
function notSquareWhy(tex: string, num: number, den: number): string {
  const g = gcd(num, den);
  const a = num / g;
  const b = den / g;
  return `$${tex} = ${fracTex(a, b)}$ in lowest terms, and $${isSq(a) ? b : a}$ is not a perfect square`;
}

/** Non-perfect-square decimals and fractions for multiple choice, as [LaTeX, why]. */
function nonSquares(rng: Rng): Array<[string, string]> {
  const out = new Map<string, string>();
  while (out.size < 4) {
    const kind = rng.int(0, 3);
    if (kind === 0) {
      const k = rng.pick([2, 3, 4, 5, 6, 7, 8, 9]);
      out.set(n((k * k) / 10), notSquareWhy(n((k * k) / 10), k * k, 10));
    } else if (kind === 1) {
      const m = rng.pick([2, 3, 5, 6, 7, 8]);
      const b = rng.pick([9, 16, 25, 36, 49]);
      if (gcd(m, b) === 1) out.set(fracTex(m, b), `$${m}$ is not a perfect square`);
    } else if (kind === 2) {
      const c = rng.pick([2, 3, 5, 6, 7, 8, 10, 12]);
      out.set(n(c / 100), notSquareWhy(n(c / 100), c, 100));
    } else {
      const p = rng.pick([4, 9, 16, 25]);
      const q = rng.pick([3, 5, 7, 8, 10, 12]);
      if (gcd(p, q) === 1) out.set(fracTex(p, q), `$${q}$ is not a perfect square`);
    }
  }
  return rng.shuffle([...out.entries()]);
}

/** Perfect-square decimals and fractions, as [LaTeX, root LaTeX, why]. */
function perfectSquares(rng: Rng): Array<[string, string, string]> {
  const out: Array<[string, string, string]> = [];
  const k = rng.pick(TENTHS);
  out.push([n((k * k) / 100), n(k / 10), `$${n(k / 10)}^2 = ${n((k * k) / 100)}$`]);
  const [a, b] = rootFraction(rng);
  out.push([fracTex(a * a, b * b), fracTex(a, b), `$\\left(${fracTex(a, b)}\\right)^2 = ${fracTex(a * a, b * b)}$`]);
  const j = rng.pick([2, 3, 4, 5, 6, 7, 8, 9]);
  out.push([n((j * j) / 10000), n(j / 100), `$${n(j / 100)}^2 = ${n((j * j) / 10000)}$`]);
  const [c, d] = rootFraction(rng);
  const f = rng.pick([2, 3]);
  out.push([fracTex(c * c * f, d * d * f), fracTex(c, d), `$${fracTex(c * c * f, d * d * f)} = ${fracTex(c * c, d * d)} = \\left(${fracTex(c, d)}\\right)^2$`]);
  return rng.shuffle(out);
}

const sqrtPerfect = skill({
  id: 'm9-sqrt-perfect',
  name: 'Square roots of perfect squares',
  description: 'Decide whether a fraction or decimal is a perfect square and find the square root of a rational number that is a perfect square.',
  outcomes: ['N5'],
  lessonId: 'm9-1-1',
  calculator: false,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      const mode = rng.pick(['decimal', 'fraction', 'area'] as const);
      if (mode === 'fraction') {
        const [a, b] = rootFraction(rng);
        return {
          prompt: `Find $\\sqrt{${dfracTex(a * a, b * b)}}$. Write your answer as a fraction in lowest terms.`,
          parts: [numPart(a / b, { fraction: 'lowest' })],
          hints: ['Take the square root of the numerator and the square root of the denominator.', `Which number squared is $${a * a}$? Which number squared is $${b * b}$?`],
          solution: [`$\\sqrt{${a * a}} = ${a}$ and $\\sqrt{${b * b}} = ${b}$`, `$\\sqrt{${dfracTex(a * a, b * b)}} = ${dfracTex(a, b)}$`, `Check: $\\left(${fracTex(a, b)}\\right)^2 = ${fracTex(a * a, b * b)}$. The answer is $${fracTex(a, b)}$.`],
        };
      }
      const k = rng.pick(TENTHS);
      const v = (k * k) / 100;
      if (mode === 'area') {
        const thing = rng.pick([['square floor tile', 'm'], ['square sticky note', 'dm'], ['square patio stone', 'm'], ['square cork board', 'm']] as const);
        return {
          prompt: `A ${thing[0]} has an area of $${n(v)}${sq(thing[1])}$. How long is each side?`,
          parts: [numPart(k / 10, { suffix: thing[1] })],
          hints: ['The area of a square is side × side, so the side length is the square root of the area.', `Which decimal multiplied by itself gives $${n(v)}$?`],
          solution: [`Side length $= \\sqrt{${n(v)}}$`, `$${n(k / 10)} \\times ${n(k / 10)} = ${n(v)}$, so $\\sqrt{${n(v)}} = ${n(k / 10)}$`, `Each side is $${n(k / 10)}${un(thing[1])}$ long.`],
        };
      }
      return {
        prompt: `Find $\\sqrt{${n(v)}}$ without a calculator.`,
        parts: [numPart(k / 10)],
        hints: [`Write $${n(v)}$ as a fraction: $${fracTex(k * k, 100)}$.`, `$\\sqrt{${k * k}} = ${k}$ and $\\sqrt{100} = 10$.`],
        solution: [`$${n(v)} = ${fracTex(k * k, 100)}$`, `$\\sqrt{${fracTex(k * k, 100)}} = ${fracTex(k, 10)} = ${n(k / 10)}$`, `Check: $${n(k / 10)}^2 = ${n(v)}$. So $\\sqrt{${n(v)}} = ${n(k / 10)}$.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['which', 'whichNot', 'small', 'unsimplified'] as const);
      if (mode === 'which' || mode === 'whichNot') {
        const goods = perfectSquares(rng);
        const bads = nonSquares(rng);
        if (mode === 'which') {
          const [g, , why] = goods[0];
          return {
            prompt: `Which number is a **perfect square**?`,
            parts: [{ answer: mc(rng, `$${g}$`, bads.slice(0, 3).map(([b]) => `$${b}$`)) }],
            hints: ['A fraction in lowest terms is a perfect square when its numerator and denominator are both perfect squares.', 'Write each decimal as a fraction, such as $0.4 = \\frac{4}{10}$ and $0.04 = \\frac{4}{100}$.'],
            solution: [...bads.slice(0, 3).map(([b, w]) => `$${b}$ is not a perfect square: ${w}.`), `$${g}$ is a perfect square: ${why}.`],
            answerDisplay: `$${g}$`,
          };
        }
        const [b, w] = bads[0];
        return {
          prompt: `Which number is **not** a perfect square?`,
          parts: [{ answer: mc(rng, `$${b}$`, goods.slice(0, 3).map(([g]) => `$${g}$`)) }],
          hints: ['Find the square root of each number. A perfect square has a square root that is an exact fraction or decimal.', 'Write each decimal as a fraction, and write each fraction in lowest terms first.'],
          solution: [...goods.slice(0, 3).map(([g, , why]) => `$${g}$ is a perfect square: ${why}.`), `$${b}$ is not a perfect square: ${w}.`],
          answerDisplay: `$${b}$`,
        };
      }
      if (mode === 'small') {
        const j = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 15]);
        const v = (j * j) / 10000;
        return {
          prompt: `Find $\\sqrt{${n(v, 6)}}$ without a calculator.`,
          parts: [numPart(j / 100)],
          hints: [`Write $${n(v, 6)}$ as a fraction with denominator $10\\,000$.`, '$\\sqrt{10\\,000} = 100$'],
          solution: [`$${n(v, 6)} = ${fracTex(j * j, 10000)}$`, `$\\sqrt{${fracTex(j * j, 10000)}} = ${fracTex(j, 100)} = ${n(j / 100)}$`, `Check: $${n(j / 100)}^2 = ${n(v, 6)}$. So $\\sqrt{${n(v, 6)}} = ${n(j / 100)}$.`],
        };
      }
      const [a, b] = rootFraction(rng);
      const f = rng.pick([2, 3, 5]);
      return {
        prompt: `Find $\\sqrt{${dfracTex(a * a * f, b * b * f)}}$. Write your answer as a fraction in lowest terms.`,
        parts: [numPart(a / b, { fraction: 'lowest' })],
        hints: ['Neither $' + a * a * f + '$ nor $' + b * b * f + '$ is a perfect square, but the fraction is not in lowest terms.', 'Write the fraction in lowest terms first, then take the square root of the numerator and the denominator.'],
        solution: [`Lowest terms: $${fracTex(a * a * f, b * b * f)} = ${fracTex(a * a, b * b)}$ (divide both by $${f}$)`, `$\\sqrt{${fracTex(a * a, b * b)}} = ${fracTex(a, b)}$`, `The answer is $${fracTex(a, b)}$.`],
      };
    }
    // d === 3
    const mode = rng.pick(['perimeter', 'quilt', 'claim', 'reverse'] as const);
    if (mode === 'perimeter') {
      const k = rng.pick([12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 25, 35, 45]);
      const A = (k * k) / 100;
      const side = k / 10;
      const P_ = exact(4 * side);
      const thing = rng.pick(['square vegetable garden', 'square deck', 'square skating rink in a backyard', 'square sandbox']);
      return {
        prompt: `${who}'s ${thing} has an area of $${n(A)}${sq('m')}$. ${who} wants to put a border around it. How long will the border be?`,
        parts: [numPart(P_, { suffix: 'm' })],
        hints: ['First find the side length: it is the square root of the area.', 'The border goes around all $4$ sides: perimeter $= 4 \\times$ side.'],
        solution: [`Side: $\\sqrt{${n(A)}} = ${n(side)}${un('m')}$, because $${n(side)}^2 = ${n(A)}$`, `Perimeter: $4 \\times ${n(side)} = ${n(P_)}$`, `The border will be $${n(P_)}${un('m')}$ long.`],
      };
    }
    if (mode === 'quilt') {
      const [a, b] = rng.pick([[3, 2], [5, 2], [5, 4], [7, 4], [3, 4], [7, 2], [9, 4], [5, 3]] as const);
      const whole = Math.floor((a * a) / (b * b));
      const rem = a * a - whole * b * b;
      const mixed = whole ? `${whole}${rem ? `\\tfrac{${rem}}{${b * b}}` : ''}` : fracTex(a * a, b * b);
      return {
        prompt: `A square quilt block has an area of $${mixed}${sq('ft')}$. What is its side length? Write your answer as a fraction or mixed number in lowest terms.`,
        parts: [numPart(a / b, { fraction: 'lowest', suffix: 'ft' })],
        hints: ['Write the area as an improper fraction first.', 'The side length is the square root of the area: take the square root of the numerator and of the denominator.'],
        solution: [
          whole ? `$${mixed} = ${fracTex(a * a, b * b)}$` : `The area is $${fracTex(a * a, b * b)}$.`,
          `$\\sqrt{${fracTex(a * a, b * b)}} = ${fracTex(a, b)}$, because $${a}^2 = ${a * a}$ and $${b}^2 = ${b * b}$`,
          `Each side is $${fracTex(a, b)}${a > b ? ` = ${Math.floor(a / b)}\\tfrac{${a % b}}{${b}}` : ''}${un('ft')}$.`,
        ],
      };
    }
    if (mode === 'claim') {
      const k = rng.pick([4, 9, 16, 25, 36, 49, 64, 81]);
      const r = Math.sqrt(k);
      const v = k / 10;
      const wrong = r / 10;
      const right = Math.sqrt(v);
      const choices = [
        `No. $${n(wrong)}^2 = ${n(wrong * wrong)}$, not $${n(v)}$. The square root of $${n(v)}$ is about $${nf(right, 2)}$.`,
        `Yes. $${r} \\times ${r} = ${k}$, so $\\sqrt{${n(v)}} = ${n(wrong)}$.`,
        `No. $\\sqrt{${n(v)}} = ${n(wrong / 10)}$.`,
        `Yes. A square root always has half as many decimal places.`,
      ];
      return {
        prompt: `${who} says that $\\sqrt{${n(v)}} = ${n(wrong)}$ because $\\sqrt{${k}} = ${r}$. Is ${who} correct?`,
        parts: [{ answer: fixedChoice(choices, 0) }],
        hints: [`Check by squaring: what is $${n(wrong)}^2$?`, `Write $${n(v)}$ as a fraction. Is its denominator a perfect square?`],
        solution: [`Check: $${n(wrong)}^2 = ${n(wrong * wrong)}$, which is not $${n(v)}$.`, `$${n(v)} = ${fracTex(k, 10)}$, and $10$ is not a perfect square, so $${n(v)}$ is not a perfect square. (But $${n(k / 100)}$ is: $\\sqrt{${n(k / 100)}} = ${n(wrong)}$.)`, `${who} is not correct.`],
        answerDisplay: 'No',
      };
    }
    const k = rng.pick(TENTHS.filter((x) => x > 10));
    const root = k / 10;
    const area = (k * k) / 100;
    return {
      prompt: `${who} is thinking of a number. Its square root is $${n(root)}$. What is the number?`,
      parts: [numPart(area)],
      hints: ['Undo the square root by squaring.', `$${n(root)}^2 = ${n(root)} \\times ${n(root)}$`],
      solution: [`If $\\sqrt{x} = ${n(root)}$, then $x = ${n(root)}^2$.`, `$${n(root)} \\times ${n(root)} = ${n(area)}$`, `The number is $${n(area)}$. It is a perfect square, because its square root is the exact decimal $${n(root)}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Square roots of non-perfect squares
// ---------------------------------------------------------------------------

/** A decimal that is not a perfect square, with its benchmark squares. */
function benchmarkCase(rng: Rng, small: boolean) {
  for (;;) {
    if (small) {
      // Between 0.01 and 1: benchmarks are consecutive tenths.
      const x = rng.int(5, 95) / 100;
      const r = Math.sqrt(x);
      const lo = Math.floor(r * 10) / 10;
      if (Math.abs(r * 10 - Math.round(r * 10)) < 0.05) continue;
      const hi = exact(lo + 0.1);
      return { x, xs: n(x), r, lo, hi, loSq: exact(lo * lo), hiSq: exact(hi * hi), step: 'tenths' as const };
    }
    const x = rng.chance(0.5) ? rng.int(21, 990) / 10 : rng.int(3, 99) + rng.pick([0.25, 0.5, 0.75]);
    const r = Math.sqrt(x);
    if (Math.abs(r - Math.round(r)) < 0.05) continue;
    const lo = Math.floor(r);
    return { x, xs: n(x), r, lo, hi: lo + 1, loSq: lo * lo, hiSq: (lo + 1) ** 2, step: 'whole' as const };
  }
}

const sqrtEstimate = skill({
  id: 'm9-sqrt-estimate',
  name: 'Estimating square roots',
  description: 'Estimate square roots of rational numbers that are not perfect squares with benchmarks, find them to the nearest hundredth with technology, and find a number whose square root is between two values.',
  outcomes: ['N6'],
  lessonId: 'm9-1-2',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      const c = benchmarkCase(rng, rng.chance(0.6));
      const pair = (a: number, b: number) => `$${n(a)}$ and $${n(b)}$`;
      const correct = pair(c.lo, c.hi);
      const dec = c.step === 'tenths' ? 0.1 : 1;
      const half = Math.floor((c.x / 2) / dec) * dec;
      const distract = [pair(exact(c.lo - dec), c.lo), pair(c.hi, exact(c.hi + dec)), pair(exact(half), exact(half + dec)), ...(c.step === 'tenths' ? [pair(exact(c.lo / 10), exact(c.hi / 10))] : [])].filter((p) => p !== correct && !p.includes('-'));
      return {
        prompt: `Between which two ${c.step === 'tenths' ? 'decimals' : 'whole numbers'} is $\\sqrt{${c.xs}}$?`,
        parts: [{ answer: mc(rng, correct, rng.shuffle(distract)) }],
        hints: [
          c.step === 'tenths' ? 'Square some tenths: $0.5^2 = 0.25$, $0.6^2 = 0.36$, $0.7^2 = 0.49$, $0.8^2 = 0.64$, $0.9^2 = 0.81$.' : 'Find the perfect squares just below and just above the number.',
          `Find the two benchmark squares on either side of $${c.xs}$, then take their square roots.`,
        ],
        solution: [`Benchmarks: $${n(c.lo)}^2 = ${n(c.loSq)}$ and $${n(c.hi)}^2 = ${n(c.hiSq)}$.`, `$${n(c.loSq)} < ${c.xs} < ${n(c.hiSq)}$, so $${n(c.lo)} < \\sqrt{${c.xs}} < ${n(c.hi)}$.`, `$\\sqrt{${c.xs}}$ is between $${n(c.lo)}$ and $${n(c.hi)}$.`],
        answerDisplay: correct,
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['hundredth', 'fraction', 'best'] as const);
      if (mode === 'best') {
        let c: ReturnType<typeof benchmarkCase>;
        let opts: string[];
        do {
          c = benchmarkCase(rng, true);
          const est = roundTo(c.r, 2);
          opts = [nf(est, 2), nf(roundTo(c.x / 2, 2), 2), nf(roundTo(est / 10, 3), 3), nf(roundTo(Math.sqrt(c.x * 10), 2), 2)];
        } while (new Set(opts).size < 4);
        return {
          prompt: `Without a calculator, which is the best estimate of $\\sqrt{${c.xs}}$?`,
          parts: [{ answer: mc(rng, `$${opts[0]}$`, opts.slice(1).map((o) => `$${o}$`)) }],
          hints: ['Use benchmarks: find the perfect squares of tenths on either side of the number.', 'A square root of a number between $0$ and $1$ is larger than the number itself.'],
          solution: [`$${n(c.lo)}^2 = ${n(c.loSq)}$ and $${n(c.hi)}^2 = ${n(c.hiSq)}$, so $\\sqrt{${c.xs}}$ is between $${n(c.lo)}$ and $${n(c.hi)}$.`, `Only $${opts[0]}$ is in that interval. (Halving gives $${opts[1]}$, which is wrong.)`, `The best estimate is $${opts[0]}$.`],
          answerDisplay: `$${opts[0]}$`,
          calculator: false,
        };
      }
      for (;;) {
        let tex: string;
        let x: number;
        if (mode === 'fraction') {
          const a = rng.int(1, 11);
          const b = rng.int(2, 15);
          if (gcd(a, b) !== 1 || Number.isInteger(Math.sqrt(a)) && Number.isInteger(Math.sqrt(b))) continue;
          x = a / b;
          tex = fracTex(a, b);
        } else {
          const c = benchmarkCase(rng, rng.chance(0.5));
          x = c.x;
          tex = c.xs;
        }
        const r = Math.sqrt(x);
        if (nearHalf(r, 2) || Number.isInteger(r * 100)) continue;
        return {
          prompt: `Use a calculator to find $\\sqrt{${tex}}$. Round to the nearest hundredth.`,
          parts: [numPart(r, { decimals: 2 })],
          hints: [mode === 'fraction' ? `Divide first: $${tex} \\approx ${n(x, 4)}$. Or use brackets: $\\sqrt{(${tex.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1 \\div $2')})}$.` : 'Press the square root key, then enter the number.', 'Look at the thousandths digit to decide whether to round up.'],
          solution: [mode === 'fraction' ? `$${tex} \\approx ${n(x, 5)}$` : `The number is $${tex}$.`, `$\\sqrt{${tex}} \\approx ${nf(r, 4)}$`, `To the nearest hundredth, $\\sqrt{${tex}} \\approx ${nf(r, 2)}$.`],
        };
      }
    }
    // d === 3
    const mode = rng.pick(['between', 'whichNumber', 'side'] as const);
    if (mode === 'between') {
      const lo = rng.chance(0.5) ? rng.int(2, 9) / 10 : rng.int(11, 39) / 10;
      const hi = exact(lo + 0.1);
      const a = exact(lo * lo);
      const b = exact(hi * hi);
      const mid = exact((a + b) / 2);
      return {
        prompt: `Find a number whose square root is between $${n(lo)}$ and $${n(hi)}$. (Many answers are possible.)`,
        parts: [numPart(mid, { tolerance: exact((b - a) / 2 - 0.0005) })],
        hints: [`Square both values: $${n(lo)}^2$ and $${n(hi)}^2$.`, 'Any number between the two squares has a square root between the two values.'],
        solution: [`$${n(lo)}^2 = ${n(a)}$ and $${n(hi)}^2 = ${n(b)}$.`, `Any number between $${n(a)}$ and $${n(b)}$ works, for example $${n(mid)}$.`, `Check: $\\sqrt{${n(mid)}} \\approx ${nf(Math.sqrt(mid), 3)}$, which is between $${n(lo)}$ and $${n(hi)}$.`],
        answerDisplay: `Any number between ${n(a)} and ${n(b)}, such as ${n(mid)}`,
      };
    }
    if (mode === 'whichNumber') {
      for (;;) {
        const lo = rng.int(3, 9) / 10;
        const hi = exact(lo + 0.1);
        const a = exact(lo * lo);
        const b = exact(hi * hi);
        const good = exact(roundTo((a + b) / 2, 2));
        const between = exact(lo + 0.05);
        if (good <= a || good >= b || (between > a && between < b)) continue;
        const opts = [`$${n(good)}$`, `$${n(between)}$`, `$${n(good / 10)}$`, `$${n(good * 10)}$`];
        return {
          prompt: `${who} wants a number whose square root is between $${n(lo)}$ and $${n(hi)}$. Which number works?`,
          parts: [{ answer: mc(rng, opts[0], opts.slice(1)) }],
          hints: [`Square both values: $${n(lo)}^2$ and $${n(hi)}^2$.`, 'The number itself must be between the two squares, not between the two values.'],
          solution: [`$${n(lo)}^2 = ${n(a)}$ and $${n(hi)}^2 = ${n(b)}$, so the number must be between $${n(a)}$ and $${n(b)}$.`, `$${n(between)}$ is between $${n(lo)}$ and $${n(hi)}$, but its square root is about $${nf(Math.sqrt(between), 2)}$.`, `$${n(good)}$ works: $\\sqrt{${n(good)}} \\approx ${nf(Math.sqrt(good), 3)}$.`],
          answerDisplay: opts[0],
        };
      }
    }
    for (;;) {
      const c = rng.pick([
        { thing: 'square patio', u: 'm', lo: 60, hi: 300, div: 10 },
        { thing: 'square picture frame', u: 'm', lo: 15, hi: 95, div: 100 },
        { thing: 'square garden plot', u: 'm', lo: 120, hi: 600, div: 10 },
        { thing: 'square tablecloth', u: 'm', lo: 120, hi: 400, div: 100 },
      ]);
      const A = rng.int(c.lo, c.hi) / c.div;
      const s = Math.sqrt(A);
      if (Number.isInteger(s * 10) || nearHalf(s, 2)) continue;
      return {
        prompt: `A ${c.thing} has an area of $${n(A)}${sq(c.u)}$. How long is each side, to the nearest hundredth of a metre?`,
        parts: [numPart(s, { decimals: 2, suffix: c.u })],
        hints: ['The side length of a square is the square root of its area.', `Estimate first: which perfect squares is $${n(A)}$ between?`],
        solution: [`Side $= \\sqrt{${n(A)}}$`, `$\\sqrt{${n(A)}} \\approx ${nf(s, 4)}$`, `Each side is about $${nf(s, 2)}${un(c.u)}$ long.`],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.3 — Surface area of composite objects
// ---------------------------------------------------------------------------

/** heights[row][col]: row 0 at the back, last row at the front; column 0 on the left. */
type HMap = number[][];
const totalCubes = (h: HMap) => h.flat().reduce((s, v) => s + v, 0);

/** Pairs of cubes that touch: side by side (left–right or front–back) and stacked. */
function contacts(h: HMap): { side: number; stacked: number } {
  let side = 0;
  let stacked = 0;
  h.forEach((row, r) =>
    row.forEach((v, c) => {
      if (v > 1) stacked += v - 1;
      if (c + 1 < row.length) side += Math.min(v, row[c + 1]);
      if (r + 1 < h.length) side += Math.min(v, h[r + 1][c]);
    }),
  );
  return { side, stacked };
}

/** How many small triangles of each cube show in the isometric drawing; mirrors the cubes figure's drawing order. */
function cubeVisibility(h: HMap): number[] {
  const cubes: Array<[number, number, number]> = [];
  h.forEach((r, y) =>
    r.forEach((ht, x) => {
      for (let z = 0; z < ht; z++) cubes.push([x, y, z]);
    }),
  );
  cubes.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  const owner = new Map<string, number>();
  cubes.forEach(([x, y, z], i) => {
    const a = x - y;
    const c = x + y - 2 * z;
    for (const k of [
      [a, c - 2, -1],
      [a, c - 2, 1],
      [a - 1, c - 1, 1],
      [a, c, -1],
      [a + 1, c - 1, -1],
      [a, c, 1],
    ])
      owner.set(k.join(','), i);
  });
  const count = new Array<number>(cubes.length).fill(0);
  for (const i of owner.values()) count[i]++;
  return count;
}

function connected(h: HMap): boolean {
  const cells: P[] = [];
  h.forEach((r, y) => r.forEach((v, x) => v > 0 && cells.push([x, y])));
  if (!cells.length) return false;
  const seen = new Set<string>([cells[0].join(',')]);
  const stack = [cells[0]];
  while (stack.length) {
    const [x, y] = stack.pop()!;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const k = `${x + dx},${y + dy}`;
      if (!seen.has(k) && (h[y + dy]?.[x + dx] ?? 0) > 0) {
        seen.add(k);
        stack.push([x + dx, y + dy]);
      }
    }
  }
  return seen.size === cells.length;
}

function cubeObject(rng: Rng, rows: [number, number], cols: [number, number], maxH: number, count: [number, number]): HMap {
  for (;;) {
    const R = rng.int(rows[0], rows[1]);
    const C = rng.int(cols[0], cols[1]);
    const h: HMap = [];
    for (let r = 0; r < R; r++) {
      const row: number[] = [];
      for (let c = 0; c < C; c++) row.push(rng.chance(0.3) ? 0 : rng.int(1, maxH));
      h.push(row);
    }
    const t = totalCubes(h);
    if (t < count[0] || t > count[1]) continue;
    if (!h.every((r) => r.some((v) => v > 0)) || !h[0].every((_, c) => h.some((r) => r[c] > 0))) continue;
    if (!connected(h) || !cubeVisibility(h).every((v) => v >= 2)) continue;
    return h;
  }
}

// --- Oblique sketches of a solid sitting on another solid ---------------------

const KX = 0.6 * Math.cos((35 * Math.PI) / 180);
const KY = 0.6 * Math.sin((35 * Math.PI) / 180);
/** x to the right, y going back, z up. */
const pr = (x: number, y: number, z: number): P => [x + KX * y, z + KY * y];

type Seg2 = [P, P];
type Solid3 =
  | { kind: 'box'; x: number; y: number; z: number; l: number; w: number; h: number }
  | { kind: 'cyl'; cx: number; cy: number; z: number; r: number; h: number };

function circlePts(s: Extract<Solid3, { kind: 'cyl' }>, z: number, t0 = 0, t1 = 2 * Math.PI, k = 48): P[] {
  const out: P[] = [];
  for (let i = 0; i <= k; i++) {
    const t = t0 + ((t1 - t0) * i) / k;
    out.push(pr(s.cx + s.r * Math.cos(t), s.cy + s.r * Math.sin(t), z));
  }
  return out;
}

/** Angle where a horizontal circle is widest on the page. */
const T_EDGE = Math.atan(KX);

/** Edges you can see on one solid on its own. */
function solidEdges(s: Solid3): Seg2[] {
  if (s.kind === 'box') {
    const { x, y, z, l, w, h } = s;
    const X = x + l;
    const Y = y + w;
    const Z = z + h;
    const e: Array<[[number, number, number], [number, number, number]]> = [
      [[x, y, z], [X, y, z]],
      [[X, y, z], [X, y, Z]],
      [[X, y, Z], [x, y, Z]],
      [[x, y, Z], [x, y, z]],
      [[X, y, z], [X, Y, z]],
      [[X, Y, z], [X, Y, Z]],
      [[X, y, Z], [X, Y, Z]],
      [[x, y, Z], [x, Y, Z]],
      [[x, Y, Z], [X, Y, Z]],
    ];
    return e.map(([a, b]) => [pr(...a), pr(...b)]);
  }
  const top = circlePts(s, s.z + s.h);
  const front = circlePts(s, s.z, T_EDGE + Math.PI, T_EDGE + 2 * Math.PI);
  const segs: Seg2[] = [];
  for (let i = 0; i + 1 < top.length; i++) segs.push([top[i], top[i + 1]]);
  for (let i = 0; i + 1 < front.length; i++) segs.push([front[i], front[i + 1]]);
  const L = [s.cx + s.r * Math.cos(T_EDGE + Math.PI), s.cy + s.r * Math.sin(T_EDGE + Math.PI)];
  const R = [s.cx + s.r * Math.cos(T_EDGE), s.cy + s.r * Math.sin(T_EDGE)];
  segs.push([pr(L[0], L[1], s.z), pr(L[0], L[1], s.z + s.h)], [pr(R[0], R[1], s.z), pr(R[0], R[1], s.z + s.h)]);
  return segs;
}

/** Outline of a solid on the page, as a convex polygon (counterclockwise). */
function silhouette(s: Solid3): P[] {
  const pts: P[] = [];
  if (s.kind === 'box') {
    for (const dx of [0, s.l]) for (const dy of [0, s.w]) for (const dz of [0, s.h]) pts.push(pr(s.x + dx, s.y + dy, s.z + dz));
  } else pts.push(...circlePts(s, s.z, 0, 2 * Math.PI, 72), ...circlePts(s, s.z + s.h, 0, 2 * Math.PI, 72));
  // Convex hull (monotone chain).
  const ps = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: P[] = [];
  for (const p of ps) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: P[] = [];
  for (const p of [...ps].reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/** The parts of segment ab outside a convex counterclockwise polygon. */
function clipOutside(a: P, b: P, poly: P[]): Seg2[] {
  let t0 = 0;
  let t1 = 1;
  const d: P = [b[0] - a[0], b[1] - a[1]];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    // Inside is to the left of each edge: cross(q - p, x - p) >= 0.
    const ex = q[0] - p[0];
    const ey = q[1] - p[1];
    const num = ex * (a[1] - p[1]) - ey * (a[0] - p[0]);
    const den = ex * d[1] - ey * d[0];
    if (Math.abs(den) < 1e-12) {
      if (num < 0) return [[a, b]];
      continue;
    }
    const t = -num / den;
    if (den > 0) t0 = Math.max(t0, t);
    else t1 = Math.min(t1, t);
    if (t0 >= t1) return [[a, b]];
  }
  const at = (t: number): P => [a[0] + d[0] * t, a[1] + d[1] * t];
  const out: Seg2[] = [];
  if (t0 > 1e-6) out.push([a, at(t0)]);
  if (t1 < 1 - 1e-6) out.push([at(t1), b]);
  return out;
}

/**
 * An oblique sketch of `top` sitting on `base`. Edges of the base that lie on its top face are hidden
 * where the top solid is in front of them.
 */
function stackFig(base: Solid3, top: Solid3, labels: Array<{ text: string; at: [number, number, number]; dir: number }>, extra: Array<[[number, number, number], [number, number, number]]> = []): PlaneFigure {
  const dr = new Drawing();
  const sil = silhouette(top);
  const topZ = base.z + base.h;
  for (const [a, b] of solidEdges(base)) {
    const onTop = isOnPlane(base, a, b, topZ);
    const parts = onTop ? clipOutside(a, b, sil) : [[a, b] as Seg2];
    for (const [p, q] of parts) dr.seg(p, q);
  }
  for (const [a, b] of solidEdges(top)) dr.seg(a, b);
  for (const [a, b] of extra) dr.seg(pr(...a), pr(...b), { dashed: true, color: 'muted' });
  for (const l of labels) dr.label(l.text, pr(...l.at), l.dir, 4);
  return dr.build({ caption: 'Not drawn to scale' });
}

/** Is the projected segment part of the base's top face? (Checked against the projected top face outline.) */
function isOnPlane(base: Solid3, a: P, b: P, z: number): boolean {
  const face: P[] =
    base.kind === 'box'
      ? [pr(base.x, base.y, z), pr(base.x + base.l, base.y, z), pr(base.x + base.l, base.y + base.w, z), pr(base.x, base.y + base.w, z)]
      : circlePts(base, z, 0, 2 * Math.PI, 72);
  const onEdge = (p: P) => face.some((f, i) => {
    const g = face[(i + 1) % face.length];
    const cr = (g[0] - f[0]) * (p[1] - f[1]) - (g[1] - f[1]) * (p[0] - f[0]);
    const L = Math.hypot(g[0] - f[0], g[1] - f[1]);
    const t = ((p[0] - f[0]) * (g[0] - f[0]) + (p[1] - f[1]) * (g[1] - f[1])) / (L * L);
    return Math.abs(cr / L) < 1e-6 && t > -1e-6 && t < 1 + 1e-6;
  });
  return onEdge(a) && onEdge(b);
}

/** Drawn sizes: keep proportions readable whatever the real measurements are. */
function drawn(v: number, ref: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, (v / ref) * 4));
}

const OVERLAP_WHY = 'Where the two parts touch, the bottom of the top part and the part of the top face it sits on are both hidden. Neither is on the outside, so subtract the overlap area twice.';

const compositeSA = skill({
  id: 'm9-composite-surface-area',
  name: 'Surface area of composite objects',
  description: 'Find the surface area of objects made of cubes, stacked rectangular prisms and cylinders on prisms, subtracting the hidden overlap and explaining why.',
  outcomes: ['SS2'],
  lessonId: 'm9-1-3',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode = d === 1 ? 'cubes' : d === 2 ? rng.weighted([['cubes', 0.3], ['boxes', 0.7]] as const) : rng.pick(['cylBox', 'cake', 'boxesPaint'] as const);

    if (mode === 'cubes') {
      const h = d === 1 ? cubeObject(rng, [1, 2], [2, 3], 2, [3, 5]) : cubeObject(rng, [2, 3], [2, 3], 3, [5, 9]);
      const nC = totalCubes(h);
      const { side, stacked } = contacts(h);
      const faces = 6 * nC - 2 * (side + stacked);
      const s = d === 1 ? rng.pick([1, 2, 3]) : rng.pick([2, 3, 4, 5]);
      const SA = faces * s * s;
      const thing = rng.pick(['a sculpture for an art show', 'a model of a building', 'a game piece', 'a step stool for a play centre', 'a display stand']);
      const fig: CubesFigure = { type: 'cubes', heights: h.map((r) => [...r]) };
      return {
        prompt: `${who} glued $${nC}$ cubes together to make ${thing}. Each cube has edges of ${len(s, 'cm')}. No cubes are hidden from view. What is the surface area of the object, including the bottom?`,
        figure: fig,
        parts: [numPart(SA, { suffix: 'cm²' })],
        hints: ['Each cube has $6$ faces. Each place where two cubes touch hides $2$ faces, one on each cube.', `Count the faces on the outside, then multiply by the area of one face, $${s} \\times ${s} = ${s * s}${sq('cm')}$.`],
        solution: [
          `Faces of $${nC}$ separate cubes: $6 \\times ${nC} = ${6 * nC}$`,
          `Places where two cubes touch: $${side}$ side by side${stacked ? ` and $${stacked}$ stacked` : ''}, so $${side + stacked}$ in all. Each hides $2$ faces: $2 \\times ${side + stacked} = ${2 * (side + stacked)}$.`,
          `Faces on the outside: $${6 * nC} - ${2 * (side + stacked)} = ${faces}$`,
          `Each face: $${s} \\times ${s} = ${s * s}${sq('cm')}$. $SA = ${faces} \\times ${s * s} = ${SA}${sq('cm')}$`,
          `The surface area is $${SA}${sq('cm')}$.`,
        ],
      };
    }

    if (mode === 'boxes' || mode === 'boxesPaint') {
      const c = rng.pick([
        { thing: 'two-layer birthday cake made of two rectangular layers', u: 'cm', L: [30, 40], W: [20, 30], H: [8, 12], l: [15, 25], w: [10, 18], h: [8, 12] },
        { thing: 'office building with a smaller block on its roof', u: 'm', L: [30, 50], W: [20, 30], H: [12, 20], l: [10, 20], w: [8, 15], h: [6, 12] },
        { thing: 'stack of two gift boxes', u: 'cm', L: [30, 45], W: [25, 35], H: [10, 20], l: [15, 25], w: [12, 20], h: [8, 15] },
        { thing: 'wooden trophy base made of two rectangular blocks', u: 'cm', L: [20, 30], W: [15, 20], H: [4, 8], l: [10, 15], w: [8, 12], h: [3, 6] },
      ]);
      const L = rng.int(c.L[0], c.L[1]);
      const W = rng.int(c.W[0], c.W[1]);
      const H = rng.int(c.H[0], c.H[1]);
      const l = rng.int(c.l[0], Math.min(c.l[1], L - 2));
      const w = rng.int(c.w[0], Math.min(c.w[1], W - 2));
      const h = rng.int(c.h[0], c.h[1]);
      const sa1 = 2 * (L * W + L * H + W * H);
      const sa2 = 2 * (l * w + l * h + w * h);
      const ov = l * w;
      const SA = sa1 + sa2 - 2 * ov;
      const u = c.u;
      const paint = mode === 'boxesPaint';
      const ans = paint ? SA - L * W : SA;
      // Drawing (not to scale).
      const dL = drawn(L, L, 4, 4);
      const dW = drawn(W, L, 1.6, 2.6);
      const dH = drawn(H, L, 1.2, 2.4);
      const dl = Math.min(dL - 0.8, Math.max(1.4, (l / L) * dL));
      const dw = Math.min(dW - 0.4, Math.max(0.8, (w / W) * dW));
      const dh = drawn(h, L, 1, 2.2);
      const base: Solid3 = { kind: 'box', x: 0, y: 0, z: 0, l: dL, w: dW, h: dH };
      const x0 = (dL - dl) / 2;
      const y0 = (dW - dw) / 2;
      const topB: Solid3 = { kind: 'box', x: x0, y: y0, z: dH, l: dl, w: dw, h: dh };
      const figure = stackFig(base, topB, [
        { text: `${L} ${u}`, at: [dL / 2, 0, 0], dir: -90 },
        { text: `${H} ${u}`, at: [0, 0, dH / 2], dir: 180 },
        { text: `${W} ${u}`, at: [dL, dW / 2, 0], dir: -20 },
        { text: `${l} ${u}`, at: [x0 + dl / 2, y0, dH + dh], dir: 95 },
        { text: `${h} ${u}`, at: [x0, y0, dH + dh / 2], dir: 180 },
        { text: `${w} ${u}`, at: [x0 + dl, y0 + dw / 2, dH + dh], dir: 0 },
      ]);
      const parts: Part[] = [numPart(ans, { suffix: `${u}²` })];
      if (!paint && rng.chance(0.4))
        parts.push({
          label: 'Why is the overlap subtracted twice?',
          answer: mc(rng, 'The top of the bottom part and the bottom of the top part are both hidden where they touch.', [
            'Because there are two prisms, every face is counted twice.',
            'Because the overlap is a square, its area is doubled.',
            'Because surface area is always measured on both sides of a face.',
          ]),
        });
      return {
        prompt: paint
          ? `${who} is painting a ${c.thing}. The bottom part is ${len(L, u)} long, ${len(W, u)} wide and ${len(H, u)} high. The top part is ${len(l, u)} long, ${len(w, u)} wide and ${len(h, u)} high, and sits on the middle of the bottom part. Every outside surface is painted except the bottom. What area is painted?`
          : `A ${c.thing} is shown. The bottom part is ${len(L, u)} long, ${len(W, u)} wide and ${len(H, u)} high. The top part is ${len(l, u)} long, ${len(w, u)} wide and ${len(h, u)} high, and sits on the middle of the bottom part. What is the surface area of the whole object, including the bottom?`,
        figure,
        parts,
        hints: ['Find the surface area of each prism on its own: $SA = 2lw + 2lh + 2wh$.', `The overlap is the bottom of the top prism, $${l} \\times ${w}$. It hides that area on both prisms, so subtract it twice.${paint ? ' Then take away the bottom, which is not painted.' : ''}`],
        solution: [
          `Bottom prism: $2(${L} \\times ${W} + ${L} \\times ${H} + ${W} \\times ${H}) = ${sa1}${sq(u)}$`,
          `Top prism: $2(${l} \\times ${w} + ${l} \\times ${h} + ${w} \\times ${h}) = ${sa2}${sq(u)}$`,
          `Overlap: $${l} \\times ${w} = ${ov}${sq(u)}$. ${OVERLAP_WHY}`,
          `$SA = ${sa1} + ${sa2} - 2 \\times ${ov} = ${SA}${sq(u)}$`,
          ...(paint ? [`Not painted: the bottom, $${L} \\times ${W} = ${L * W}${sq(u)}$. Painted: $${SA} - ${L * W} = ${ans}${sq(u)}$`] : []),
          `The ${paint ? 'painted area' : 'surface area'} is $${ans}${sq(u)}$.${parts.length > 1 ? ' The overlap is subtracted twice because the top of the bottom part and the bottom of the top part are both hidden.' : ''}`,
        ],
      };
    }

    if (mode === 'cylBox') {
      for (;;) {
        const c = rng.pick([
          { thing: 'A trophy is a cylinder standing on a rectangular base.', u: 'cm', L: [10, 16], W: [8, 12], H: [3, 6], r: [2, 4], h: [10, 20] },
          { thing: 'A model of a grain silo is a cylinder standing on a rectangular platform.', u: 'cm', L: [20, 30], W: [15, 25], H: [3, 6], r: [5, 7], h: [20, 35] },
          { thing: 'A lamp is a cylindrical post standing on a rectangular block.', u: 'cm', L: [14, 20], W: [14, 20], H: [4, 8], r: [2, 3], h: [25, 40] },
        ]);
        const L = rng.int(c.L[0], c.L[1]);
        const W = rng.int(c.W[0], c.W[1]);
        const H = rng.int(c.H[0], c.H[1]);
        const r = rng.int(c.r[0], c.r[1]);
        const h = rng.int(c.h[0], c.h[1]);
        if (2 * r > Math.min(L, W) - 2) continue;
        const box = 2 * (L * W + L * H + W * H);
        const circle = Math.PI * r * r;
        const cylSA = 2 * circle + 2 * Math.PI * r * h;
        const SA = box + cylSA - 2 * circle;
        if (nearHalf(SA, 1)) continue;
        const u = c.u;
        const dL = 4;
        const dW = drawn(W, L, 1.8, 3);
        const dH = drawn(H, L, 0.7, 1.6);
        const dr_ = Math.min(dW / 2 - 0.25, dL / 2 - 0.5, Math.max(0.6, (r / L) * dL));
        const dh = drawn(h, L, 1.6, 3.2);
        const base: Solid3 = { kind: 'box', x: 0, y: 0, z: 0, l: dL, w: dW, h: dH };
        const top: Solid3 = { kind: 'cyl', cx: dL / 2, cy: dW / 2, z: dH, r: dr_, h: dh };
        const figure = stackFig(
          base,
          top,
          [
            { text: `${L} ${u}`, at: [dL / 2, 0, 0], dir: -90 },
            { text: `${H} ${u}`, at: [0, 0, dH / 2], dir: 180 },
            { text: `${W} ${u}`, at: [dL, dW / 2, 0], dir: -20 },
            { text: `r = ${r} ${u}`, at: [dL / 2 + dr_ / 2, dW / 2, dH + dh], dir: 90 },
            { text: `${h} ${u}`, at: [dL / 2 + dr_ * Math.cos(T_EDGE), dW / 2 + dr_ * Math.sin(T_EDGE), dH + dh / 2], dir: 0 },
          ],
          [[[dL / 2, dW / 2, dH + dh], [dL / 2 + dr_, dW / 2, dH + dh]]],
        );
        return {
          prompt: `${c.thing} The base is ${len(L, u)} long, ${len(W, u)} wide and ${len(H, u)} high. The cylinder has a radius of ${len(r, u)} and a height of ${len(h, u)}. Find the surface area of the whole object, including the bottom. Round to the nearest tenth of a square centimetre.`,
          figure,
          parts: [numPart(SA, { decimals: 1, suffix: `${u}²` })],
          hints: ['Find the surface area of the prism and of the cylinder on their own.', 'The circle where they touch is hidden on both parts: subtract its area twice.'],
          solution: [
            `Prism: $2(${L} \\times ${W} + ${L} \\times ${H} + ${W} \\times ${H}) = ${box}${sq(u)}$`,
            `Cylinder: $2\\pi(${r})^2 + 2\\pi(${r})(${h}) \\approx ${nf(cylSA, 2)}${sq(u)}$`,
            `Overlap: one circle, $\\pi(${r})^2 \\approx ${nf(circle, 2)}${sq(u)}$. It is hidden on the top of the prism and on the bottom of the cylinder, so subtract it twice.`,
            `$SA \\approx ${box} + ${nf(cylSA, 2)} - 2 \\times ${nf(circle, 2)} \\approx ${nf(SA, 2)}${sq(u)}$`,
            `The surface area is about $${nf(SA, 1)}${sq(u)}$.`,
          ],
        };
      }
    }

    // A two-tier round cake: icing on every surface except the bottom.
    for (;;) {
      const R = rng.int(10, 16);
      const H = rng.int(8, 12);
      const r = rng.int(5, R - 3);
      const h = rng.int(7, 11);
      const bottomTier = Math.PI * R * R + 2 * Math.PI * R * H; // top + side of the bottom tier
      const topTier = Math.PI * r * r + 2 * Math.PI * r * h;
      const icing = bottomTier - Math.PI * r * r + topTier;
      if (nearHalf(icing, 1)) continue;
      const dR = 1.9;
      const dH = drawn(H, R * 2, 1, 1.8);
      const dr_ = Math.max(0.7, (r / R) * dR);
      const dh = drawn(h, R * 2, 0.9, 1.7);
      const base: Solid3 = { kind: 'cyl', cx: 0, cy: 0, z: 0, r: dR, h: dH };
      const top: Solid3 = { kind: 'cyl', cx: 0, cy: 0, z: dH, r: dr_, h: dh };
      const RX = (q: number) => [q * Math.cos(T_EDGE), q * Math.sin(T_EDGE)] as const;
      const figure = stackFig(
        base,
        top,
        [
          { text: `r = ${r} cm`, at: [dr_ / 2, 0, dH + dh], dir: 90 },
          { text: `${h} cm`, at: [RX(dr_)[0], RX(dr_)[1], dH + dh / 2], dir: 0 },
          { text: `R = ${R} cm`, at: [0, -dR, dH], dir: -90 },
          { text: `${H} cm`, at: [RX(dR)[0], RX(dR)[1], dH / 2], dir: 0 },
        ],
        [[[0, 0, dH + dh], [dr_, 0, dH + dh]]],
      );
      return {
        prompt: `${who} is icing a two-tier round cake. The bottom tier has a radius of ${len(R, 'cm')} and a height of ${len(H, 'cm')}. The top tier has a radius of ${len(r, 'cm')} and a height of ${len(h, 'cm')}, and sits in the centre of the bottom tier. Every surface is iced except the bottom of the cake. What area is iced? Round to the nearest tenth of a square centimetre.`,
        figure,
        parts: [numPart(icing, { decimals: 1, suffix: 'cm²' })],
        hints: ['Do not ice the bottom of the cake or the hidden circle where the tiers touch.', 'Add: the top and side of the bottom tier, minus the circle covered by the top tier, plus the top and side of the top tier.'],
        solution: [
          `Bottom tier, top and side: $\\pi(${R})^2 + 2\\pi(${R})(${H}) \\approx ${nf(bottomTier, 2)}${sq('cm')}$`,
          `Covered by the top tier: $\\pi(${r})^2 \\approx ${nf(Math.PI * r * r, 2)}${sq('cm')}$ (the bottom of the top tier is hidden too, so it is not iced either)`,
          `Top tier, top and side: $\\pi(${r})^2 + 2\\pi(${r})(${h}) \\approx ${nf(topTier, 2)}${sq('cm')}$`,
          `Iced area $\\approx ${nf(bottomTier, 2)} - ${nf(Math.PI * r * r, 2)} + ${nf(topTier, 2)} \\approx ${nf(icing, 2)}${sq('cm')}$`,
          `About $${nf(icing, 1)}${sq('cm')}$ is iced.`,
        ],
      };
    }
  },
});

export const SQRTSURFACE_SKILLS: SkillDef[] = [sqrtPerfect, sqrtEstimate, compositeSA];
