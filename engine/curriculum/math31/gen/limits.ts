/** Math 31 Unit 2 — Limits and Continuity (L1, L2). */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fracLatex, gcd, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** A number in LaTeX: integers plainly, simple fractions as \frac (or \dfrac). */
function tn(x: number, dfrac = false): string {
  if (Number.isInteger(x)) return fmt(x);
  const f = toFrac(x, 400);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}
const par = (x: number) => (x < 0 ? `(${tn(x)})` : tn(x));
/** A polynomial from [coefficient, body] pairs, skipping zero terms. */
function poly(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : tn(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}
/** A sum of terms c / x^p, as LaTeX: [[4, 0], [-1, 2]] gives 4 - \frac{1}{x^2}. */
function overX(terms: Array<[number, number]>): string {
  let out = '';
  for (const [c, pw] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const body = pw === 0 ? tn(abs) : `\\frac{${tn(abs)}}{${pw === 1 ? 'x' : `x^${pw}`}}`;
    out += out === '' ? `${c < 0 ? '-' : ''}${body}` : ` ${c < 0 ? '-' : '+'} ${body}`;
  }
  return out || '0';
}
const pm = (n: number) => (n < 0 ? `- ${tn(-n)}` : `+ ${tn(n)}`);
const cf = (n: number) => (n === 1 ? '' : n === -1 ? '-' : tn(n));
/** x - r as LaTeX: x - 3, x + 2, or x. */
const xm = (r: number, v = 'x') => (r === 0 ? v : `${v} ${pm(-r)}`);
/** The factor (x - r) in brackets, or just x when r = 0. */
const fx = (r: number) => (r === 0 ? 'x' : `(${xm(r)})`);
/** lim notation: \lim_{x \to a}, \lim_{x \to a^-}, \lim_{x \to \infty}. */
function lim(a: number | string, side: '' | '-' | '+' = '', v = 'x'): string {
  const at = typeof a === 'number' ? tn(a) : a;
  return `\\lim_{${v} \\to ${at}${side ? `^{${side}}` : ''}}`;
}
const DNE = 'The limit does not exist';

// ---------------------------------------------------------------------------
// Graph helpers
// ---------------------------------------------------------------------------

type Pt = [number, number];
type Fn = (x: number) => number;
const GRID: GridSpec = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;

/** A break in a piecewise graph at x: the left-hand value L, the right-hand value R and f(x) (null if undefined). */
interface Brk {
  x: number;
  L: number;
  R: number;
  f: number | null;
}

function sample(f: Fn, a: number, b: number): Pt[] {
  const n = Math.max(8, Math.round((b - a) * 12));
  const pts: Pt[] = [];
  for (let k = 0; k <= n; k++) {
    const x = a + ((b - a) * k) / n;
    pts.push([r3(x), r3(f(x))]);
  }
  return pts;
}

/** Markers for a break: open circles where the graph does not reach, closed dots at f(x). */
function brkPoints(b: Brk): PlanePoint[] {
  const pts: PlanePoint[] = [];
  if (b.L === b.R) {
    // A continuous point still gets a dot, so the graph shows where x = a is without giving the answer away.
    if (b.f === b.L) return [{ x: b.x, y: b.L }];
    pts.push({ x: b.x, y: b.L, open: true });
  } else {
    pts.push({ x: b.x, y: b.L, open: b.f !== b.L }, { x: b.x, y: b.R, open: b.f !== b.R });
  }
  if (b.f !== null && b.f !== b.L && b.f !== b.R) pts.push({ x: b.x, y: b.f });
  return pts;
}

/**
 * A piecewise graph on the standard grid with breaks at the given x-values. Each piece is a line or
 * a gentle parabola through the break values, so the values at the breaks can be read from the grid.
 */
function piecewiseGraph(rng: Rng, brks: Brk[]): PlaneFigure {
  return retry(
    () => {
      const xs = [GRID.xMin, ...brks.map((b) => b.x), GRID.xMax];
      const polylines: NonNullable<PlaneFigure['polylines']> = [];
      let ok = true;
      for (let i = 0; i < xs.length - 1; i++) {
        const a = xs[i];
        const b = xs[i + 1];
        let f: Fn;
        const s = rng.pick([-1, -0.5, 0.5, 1, 0, 1.5, -1.5]);
        const k = rng.pick([0, 0, 0.25, -0.25, 0.5, -0.5]);
        if (i === 0) {
          const L = brks[0].L;
          f = (x) => L + s * (x - b) + k * (x - b) ** 2;
        } else if (i === xs.length - 2) {
          const R = brks[brks.length - 1].R;
          f = (x) => R + s * (x - a) + k * (x - a) ** 2;
        } else {
          const R = brks[i - 1].R;
          const L = brks[i].L;
          f = (x) => R + ((L - R) * (x - a)) / (b - a) + k * (x - a) * (x - b);
        }
        const pts = sample(f, a, b);
        if (pts.some(([, y]) => y < GRID.yMin + 0.3 || y > GRID.yMax - 0.3)) ok = false;
        // A piece lying along the x-axis is hard to see.
        if (pts.filter(([, y]) => Math.abs(y) < 0.1).length > pts.length / 3) ok = false;
        polylines.push({ points: pts });
      }
      const fig: PlaneFigure = { type: 'plane', grid: GRID, polylines, points: brks.flatMap(brkPoints) };
      return ok ? fig : null;
    },
    (fig) => fig !== null,
    200,
  ) as PlaneFigure;
}

/**
 * Sample a function as polylines clipped to the grid. Branches are split at `breaks`
 * (vertical asymptotes), and each polyline stops where the curve leaves the window.
 */
function curve(f: Fn, g: GridSpec, breaks: number[] = []): Pt[][] {
  const bs = breaks.filter((b) => b > g.xMin && b < g.xMax).sort((a, b) => a - b);
  const edges = [g.xMin, ...bs, g.xMax];
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Pt[][] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const a = edges[i] + (i > 0 ? 1e-6 : 0);
    const b = edges[i + 1] - (i < edges.length - 2 ? 1e-6 : 0);
    const m = Math.max(24, Math.round((240 * (b - a)) / (g.xMax - g.xMin)));
    const xs: number[] = [];
    for (let k = 0; k <= m; k++) xs.push(a + ((b - a) * k) / m);
    let cur: Pt[] = [];
    for (let k = 0; k < xs.length; k++) {
      const y = f(xs[k]);
      const inNow = inside(y);
      if (k > 0) {
        const yp = f(xs[k - 1]);
        const inPrev = inside(yp);
        if (inPrev !== inNow) {
          const outside = inNow ? yp : y;
          const target = outside > g.yMax ? g.yMax : g.yMin;
          let lo = xs[k - 1];
          let hi = xs[k];
          for (let it = 0; it < 60; it++) {
            const mid = (lo + hi) / 2;
            if (inside(f(mid)) === inPrev) lo = mid;
            else hi = mid;
          }
          const cross: Pt = [r3(inPrev ? lo : hi), target];
          if (inPrev) {
            cur.push(cross);
            if (cur.length > 1) out.push(cur);
            cur = [];
          } else cur = [cross];
        }
      }
      if (inNow) cur.push([r3(xs[k]), r3(y)]);
    }
    if (cur.length > 1) out.push(cur);
  }
  return out;
}

/** Graph of y = k/(x - h) + c with its asymptotes dashed. */
function hyperbolaFig(k: number, h: number, c: number): PlaneFigure {
  const polylines = curve((x) => k / (x - h) + c, GRID, [h]).map((points) => ({ points }));
  return {
    type: 'plane',
    grid: GRID,
    polylines,
    lines: [
      { line: { A: 1, B: 0, C: -h }, dashed: true, color: 'muted' },
      { line: { A: 0, B: 1, C: -c }, dashed: true, color: 'muted' },
    ],
  };
}

// ---------------------------------------------------------------------------
// 2.1 — Limits from graphs and tables
// ---------------------------------------------------------------------------

/** Distinct integers in [lo, hi] different from those given. */
function otherInt(rng: Rng, lo: number, hi: number, not: number[]): number {
  return rng.intExcept(lo, hi, not);
}

/** Describe where the graph's values head as x approaches b from one side. */
function sideWords(side: 'left' | 'right', b: Brk, v: number): string {
  return `As $x$ approaches $${b.x}$ from the ${side}, the graph heads toward the ${b.f === v ? 'closed dot' : 'open circle'} at $(${b.x}, ${v})$, so the $y$-values approach $${v}$.`;
}

const limitGraph = skill({
  id: 'm31-limit-graph',
  name: 'Limits from graphs and tables',
  description: 'Read limits and one-sided limits from a graph or a table of values, and decide whether a limit exists.',
  outcomes: ['L1'],
  lessonId: 'm31-2-1',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['graphLimit', 'graphLimit', 'oneSided'] as const)
        : d === 2
          ? rng.pick(['jumpParts', 'fvsLimit', 'table', 'table'] as const)
          : rng.pick(['twoBreaks', 'twoBreaks', 'tableTrap', 'tableJump'] as const);
    const F = rng.pick(['f', 'f', 'g', 'h']);

    if (kind === 'graphLimit') {
      const x = rng.nonZero(-3, 3);
      const L = rng.int(-4, 4);
      const t = rng.pick(['hole', 'removable', 'continuous', 'removable'] as const);
      const fv = t === 'hole' ? null : t === 'continuous' ? L : otherInt(rng, -4, 4, [L]);
      const b: Brk = { x, L, R: L, f: fv };
      const fig = piecewiseGraph(rng, [b]);
      const note =
        t === 'hole'
          ? `There is an open circle at $(${x}, ${L})$: $${F}(${x})$ is not defined, but that does not affect the limit.`
          : t === 'removable'
            ? `The closed dot at $(${x}, ${fv})$ shows $${F}(${x}) = ${fv}$. The limit does not depend on the value at $x = ${x}$ itself.`
            : `The graph is unbroken at $x = ${x}$, so the limit equals $${F}(${x}) = ${L}$.`;
      return {
        prompt: `The graph of $y = ${F}(x)$ is shown. Find $${lim(x)} ${F}(x)$.`,
        figure: fig,
        parts: [numPart(L, { label: `$${lim(x)} ${F}(x) =$` })],
        hints: ['A limit describes the $y$-value the graph approaches as $x$ gets close to the given value — not the value at that point.', `Trace the graph toward $x = ${x}$ from both sides. Where do the $y$-values head?`],
        solution: [`From the left and from the right, the graph approaches the point $(${x}, ${L})$.`, note, `$${lim(x)} ${F}(x) = ${L}$`],
      };
    }

    if (kind === 'oneSided') {
      const x = rng.nonZero(-3, 3);
      const [L, R] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2);
      const fv = rng.pick([L, R]);
      const b: Brk = { x, L, R, f: fv };
      const side = rng.pick(['-', '+'] as const);
      const v = side === '-' ? L : R;
      return {
        prompt: `The graph of $y = ${F}(x)$ is shown. Find $${lim(x, side)} ${F}(x)$.`,
        figure: piecewiseGraph(rng, [b]),
        parts: [numPart(v, { label: `$${lim(x, side)} ${F}(x) =$` })],
        hints: [`The sign $^{${side}}$ means approach from the ${side === '-' ? 'left (values of $x$ less than' : 'right (values of $x$ greater than'} $${x}$).`, 'Follow only the piece of the graph on that side. An open circle still counts: the graph gets as close as you like to it.'],
        solution: [sideWords(side === '-' ? 'left' : 'right', b, v), `$${lim(x, side)} ${F}(x) = ${v}$`],
      };
    }

    if (kind === 'jumpParts') {
      const x = rng.nonZero(-3, 3);
      const same = rng.chance(0.3);
      const [L, R0] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2);
      const R = same ? L : R0;
      const fv = same ? otherInt(rng, -4, 4, [L]) : rng.pick([L, R, otherInt(rng, -4, 4, [L, R])]);
      const b: Brk = { x, L, R, f: fv };
      const choices = same ? [`$${L}$`, `$${fv}$`, DNE] : [DNE, `$${L}$`, `$${R}$`];
      const answer = mc(rng, choices[0], choices.slice(1));
      return {
        prompt: `The graph of $y = ${F}(x)$ is shown. Find each one-sided limit, then decide whether $${lim(x)} ${F}(x)$ exists.`,
        figure: piecewiseGraph(rng, [b]),
        parts: [
          numPart(L, { label: `$${lim(x, '-')} ${F}(x) =$` }),
          numPart(R, { label: `$${lim(x, '+')} ${F}(x) =$` }),
          part(answer, { label: `$${lim(x)} ${F}(x)$` }),
        ],
        hints: ['Read the left-hand limit from the piece to the left of the break and the right-hand limit from the piece to the right.', 'The two-sided limit exists only when the two one-sided limits are equal. The value of the function at the point does not matter.'],
        solution: [
          sideWords('left', b, L),
          sideWords('right', b, R),
          same
            ? `The one-sided limits are equal, so $${lim(x)} ${F}(x) = ${L}$, even though $${F}(${x}) = ${fv}$.`
            : `The one-sided limits are different ($${L} \\ne ${R}$), so $${lim(x)} ${F}(x)$ does not exist.`,
        ],
      };
    }

    if (kind === 'fvsLimit') {
      const x = rng.nonZero(-3, 3);
      const L = rng.int(-4, 4);
      const fv = otherInt(rng, -4, 4, [L]);
      const b: Brk = { x, L, R: L, f: fv };
      return {
        prompt: `The graph of $y = ${F}(x)$ is shown. Find $${lim(x)} ${F}(x)$ and $${F}(${x})$.`,
        figure: piecewiseGraph(rng, [b]),
        parts: [numPart(L, { label: `$${lim(x)} ${F}(x) =$` }), numPart(fv, { label: `$${F}(${x}) =$` })],
        hints: ['The limit is where the graph is heading; the function value is where the closed dot actually is.', `Look at the open circle and the closed dot above or below $x = ${x}$.`],
        solution: [
          `From both sides the graph heads toward the open circle at $(${x}, ${L})$, so $${lim(x)} ${F}(x) = ${L}$.`,
          `The closed dot at $(${x}, ${fv})$ gives the value of the function: $${F}(${x}) = ${fv}$.`,
          `$${lim(x)} ${F}(x) = ${L}$ and $${F}(${x}) = ${fv}$ — they are different.`,
        ],
      };
    }

    if (kind === 'table') {
      const t = rng.int(0, 4);
      let tex = '';
      let f: Fn = (x) => x;
      let a = 0;
      let L = 0;
      if (t === 0) {
        const k = rng.int(2, 6);
        tex = `\\dfrac{\\sin ${k}x}{x}`;
        f = (x) => Math.sin(k * x) / x;
        L = k;
      } else if (t === 1) {
        const k = rng.pick([1, 2, 3, 4, 0.5]);
        tex = `\\dfrac{e^{${k === 1 ? '' : fmt(k)}x} - 1}{x}`;
        f = (x) => (Math.exp(k * x) - 1) / x;
        L = k;
      } else if (t === 2) {
        a = rng.pick([1, 2, -1, 3]);
        tex = `\\dfrac{x^3 ${pm(-(a ** 3))}}{${xm(a)}}`;
        f = (x) => (x ** 3 - a ** 3) / (x - a);
        L = 3 * a * a;
      } else if (t === 3) {
        const m = rng.pick([1, 2, 5]);
        tex = `\\dfrac{\\sqrt{x + ${m * m}} - ${m}}{x}`;
        f = (x) => (Math.sqrt(x + m * m) - m) / x;
        L = 1 / (2 * m);
      } else {
        const k = rng.pick([1, 2, 4]);
        tex = `\\dfrac{1 - \\cos ${k === 1 ? '' : k}x}{x^2}`;
        f = (x) => (1 - Math.cos(k * x)) / (x * x);
        L = (k * k) / 2;
      }
      const hs = [-0.1, -0.01, -0.001, 0.001, 0.01, 0.1];
      const xs = hs.map((h) => r3(a + h));
      const rows = xs.map((x) => [fmt(x, 3), fmt(f(x), 6)]);
      return {
        prompt: `The table shows values of $${F}(x) = ${tex}$ for $x$ near $${a}$. Use the table to estimate $${lim(a)} ${F}(x)$.`,
        figure: { type: 'table', headers: ['$x$', `$${F}(x)$`], rows },
        parts: [numPart(L, { label: `$${lim(a)} ${F}(x) \\approx$`, display: 'decimal' })],
        hints: [`Substituting $x = ${a}$ gives $\\frac{0}{0}$, so the table is a good way to see what happens near $${a}$.`, `Read down the values as $x$ gets closer to $${a}$ from below, then from above. What number are both sides closing in on?`],
        solution: [
          `From the left: $${F}(${fmt(xs[0], 3)}) \\approx ${fmt(f(xs[0]), 4)}$, $${F}(${fmt(xs[1], 3)}) \\approx ${fmt(f(xs[1]), 4)}$, $${F}(${fmt(xs[2], 3)}) \\approx ${fmt(f(xs[2]), 4)}$.`,
          `From the right: $${F}(${fmt(xs[5], 3)}) \\approx ${fmt(f(xs[5]), 4)}$, $${F}(${fmt(xs[4], 3)}) \\approx ${fmt(f(xs[4]), 4)}$, $${F}(${fmt(xs[3], 3)}) \\approx ${fmt(f(xs[3]), 4)}$.`,
          `Both sides approach $${fmt(L, 4)}$.`,
          `$${lim(a)} ${F}(x) = ${tn(L)}$`,
        ],
      };
    }

    if (kind === 'tableTrap' || kind === 'tableJump') {
      const a = rng.int(-2, 4);
      const hs = [-0.1, -0.01, -0.001, 0, 0.001, 0.01, 0.1];
      const m = rng.pick([1, 2, -1, -2, 3, 0.5]);
      const n = rng.pick([0, 1, -1, 2]);
      const jump = kind === 'tableJump';
      const [L1, L2] = jump ? rng.sample([-3, -2, -1, 1, 2, 3, 4, 5], 2) : (() => { const L = rng.int(-3, 6); return [L, L]; })();
      const fa = otherInt(rng, -4, 8, [L1, L2]);
      const f = (h: number) => (h < 0 ? L1 : L2) + m * h + n * h * h;
      const rows = hs.map((h) => [fmt(a + h, 3), h === 0 ? (jump ? 'undefined' : fmt(fa)) : fmt(f(h), 6)]);
      const choices = jump ? [DNE, `$${L1}$`, `$${L2}$`, `$${tn((L1 + L2) / 2)}$`] : [`$${L1}$`, `$${fa}$`, DNE, `$${L1 + (m > 0 ? 1 : -1)}$`];
      const answer = mc(rng, choices[0], choices.slice(1));
      return {
        prompt: jump
          ? `A function $${F}$ is not defined at $x = ${a}$. The table shows some of its values near $x = ${a}$. What can you conclude about $${lim(a)} ${F}(x)$?`
          : `The table shows some values of a function $${F}$, including its value at $x = ${a}$. What is the best estimate of $${lim(a)} ${F}(x)$?`,
        figure: { type: 'table', headers: ['$x$', `$${F}(x)$`], rows },
        parts: [part(answer)],
        hints: ['Look at the values from the left and from the right separately.', jump ? 'The limit exists only if the values from both sides approach the same number.' : `The value at $x = ${a}$ itself does not affect the limit.`],
        solution: jump
          ? [
              `From the left ($x < ${a}$) the values approach $${L1}$: $${fmt(f(-0.01), 4)}$, $${fmt(f(-0.001), 4)}$, …`,
              `From the right ($x > ${a}$) the values approach $${L2}$: $${fmt(f(0.01), 4)}$, $${fmt(f(0.001), 4)}$, …`,
              `So $${lim(a, '-')} ${F}(x) = ${L1}$ and $${lim(a, '+')} ${F}(x) = ${L2}$. They are different, so $${lim(a)} ${F}(x)$ does not exist.`,
            ]
          : [
              `From the left the values approach $${L1}$: $${fmt(f(-0.01), 4)}$, $${fmt(f(-0.001), 4)}$, …`,
              `From the right the values also approach $${L1}$: $${fmt(f(0.01), 4)}$, $${fmt(f(0.001), 4)}$, …`,
              `The value $${F}(${a}) = ${fa}$ does not matter for the limit.`,
              `$${lim(a)} ${F}(x) = ${L1}$`,
            ],
      };
    }

    // twoBreaks: a jump at p and a hole or removable point at q.
    const [p, q] = retry(
      () => rng.sample([-4, -3, -2, -1, 1, 2, 3, 4], 2),
      ([p, q]) => Math.abs(p - q) >= 3,
    );
    const [L, R] = rng.sample([-4, -3, -2, -1, 0, 1, 2, 3, 4], 2);
    const fp = rng.pick([L, R]);
    const Lq = rng.int(-4, 4);
    const fq = rng.chance(0.4) ? null : otherInt(rng, -4, 4, [Lq]);
    const bp: Brk = { x: p, L, R, f: fp };
    // A break at q joins the piece on either side continuously except for the hole.
    const bq: Brk = { x: q, L: Lq, R: Lq, f: fq };
    const brks = [bp, bq].sort((u, v) => u.x - v.x);
    const fig = piecewiseGraph(rng, brks);
    const choices = [DNE, `$${L}$`, `$${R}$`];
    return {
      prompt: `The graph of $y = ${F}(x)$ is shown. Find each limit.`,
      figure: fig,
      parts: [
        numPart(L, { label: `(a) $${lim(p, '-')} ${F}(x) =$` }),
        part(mc(rng, choices[0], choices.slice(1)), { label: `(b) $${lim(p)} ${F}(x)$` }),
        numPart(Lq, { label: `(c) $${lim(q)} ${F}(x) =$` }),
      ],
      hints: [`At $x = ${p}$ the graph jumps: compare the values it approaches from each side.`, `At $x = ${q}$ the graph has a ${fq === null ? 'hole' : 'hole with the function value somewhere else'}. A limit depends only on where the graph is heading.`],
      solution: [
        `(a) ${sideWords('left', bp, L)}`,
        `(b) From the right, the graph approaches $${R}$. Since $${L} \\ne ${R}$, $${lim(p)} ${F}(x)$ does not exist.`,
        `(c) From both sides the graph approaches the open circle at $(${q}, ${Lq})$${fq === null ? '' : ` (the dot at $(${q}, ${fq})$ is only the value $${F}(${q})$)`}, so $${lim(q)} ${F}(x) = ${Lq}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 2.2 — Evaluating limits algebraically
// ---------------------------------------------------------------------------

/** Expanded (x - r)(x - s) as LaTeX. */
const prodTex = (r: number, s: number) => poly([[1, 'x^2'], [-(r + s), 'x'], [r * s, '']]);

const limitAlgebraic = skill({
  id: 'm31-limit-algebraic',
  name: 'Evaluating limits algebraically',
  description: 'Evaluate limits by direct substitution, by factoring and cancelling, by rationalizing, and with the special limit of sin x / x.',
  outcomes: ['L1'],
  lessonId: 'm31-2-2',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['sub', 'sub', 'diffSq', 'commonX'] as const)
        : d === 2
          ? rng.pick(['trinomial', 'trinomial', 'rationalize', 'sinkx'] as const)
          : rng.pick(['cubic', 'complexFrac', 'sinRatio', 'rationalize2'] as const);
    const zeroHint = 'Try direct substitution first. If you get $\\frac{0}{0}$, the expression must be simplified before you substitute.';

    if (kind === 'sub') {
      const a = rng.int(-3, 4);
      if (rng.chance(0.5)) {
        const [p, q, r] = [rng.nonZero(-3, 3), rng.int(-6, 6), rng.int(-9, 9)];
        const v = p * a * a + q * a + r;
        const fx = poly([[p, 'x^2'], [q, 'x'], [r, '']]);
        return {
          prompt: `Evaluate $${lim(a)} \\left(${fx}\\right)$.`,
          parts: [numPart(v)],
          hints: ['A polynomial is continuous everywhere, so its limit is its value.', `Substitute $x = ${a}$.`],
          solution: [`Polynomials are continuous, so substitute $x = ${a}$.`, `$${poly([[p, `(${a})^2`], [q, `(${a})`], [r, '']])} = ${v}$`, `$${lim(a)} \\left(${fx}\\right) = ${v}$`],
        };
      }
      const { p, q, r } = retry(
        () => ({ p: rng.nonZero(-4, 4), q: rng.int(-6, 6), r: rng.int(-5, 5) }),
        (o) => a + o.r !== 0,
      );
      const v = (p * a + q) / (a + r);
      const num = poly([[p, 'x'], [q, '']]);
      const den = xm(-r);
      return {
        prompt: `Evaluate $${lim(a)} \\dfrac{${num}}{${den}}$.`,
        parts: [numPart(v)],
        hints: [zeroHint, `The denominator at $x = ${a}$ is $${a + r} \\ne 0$, so the function is continuous there.`],
        solution: [
          `At $x = ${a}$ the denominator is ${r === 0 ? `$${a} \\ne 0$` : `$${a} ${pm(r)} = ${a + r} \\ne 0$`}, so substitute.`,
          `$\\dfrac{${poly([[p, `(${a})`], [q, '']])}}{${a + r}} = \\dfrac{${p * a + q}}{${a + r}} = ${tn(v)}$`,
          `$${lim(a)} \\dfrac{${num}}{${den}} = ${tn(v)}$`,
        ],
      };
    }

    if (kind === 'diffSq') {
      const a = rng.nonZero(-5, 6);
      const plus = rng.chance(0.4);
      // (x^2 - a^2)/(x - a) as x -> a, or (x^2 - a^2)/(x + a) as x -> -a
      const at = plus ? -a : a;
      const den = plus ? xm(-a) : xm(a);
      const v = plus ? -2 * a : 2 * a;
      return {
        prompt: `Evaluate $${lim(at)} \\dfrac{x^2 - ${a * a}}{${den}}$.`,
        parts: [numPart(v)],
        hints: [zeroHint, `Factor the numerator as a difference of squares: $x^2 - ${a * a} = (x - ${Math.abs(a)})(x + ${Math.abs(a)})$.`],
        solution: [
          `Substituting $x = ${at}$ gives $\\frac{0}{0}$, an indeterminate form.`,
          `$\\dfrac{x^2 - ${a * a}}{${den}} = \\dfrac{(${xm(a)})(${xm(-a)})}{${den}} = ${plus ? xm(a) : xm(-a)}$ for $x \\ne ${at}$.`,
          `$${lim(at)} (${plus ? xm(a) : xm(-a)}) = ${par(at)} ${plus ? pm(-a) : pm(a)} = ${v}$`,
        ],
      };
    }

    if (kind === 'commonX') {
      const c = rng.nonZero(-7, 7);
      const k = rng.pick([1, 1, 2, 3]);
      const v = c / k;
      return {
        prompt: `Evaluate $${lim(0)} \\dfrac{x^2 ${pm(c)}x}{${k === 1 ? '' : k}x}$.`,
        parts: [numPart(v)],
        hints: [zeroHint, 'Factor $x$ out of the numerator.'],
        solution: [
          `Substituting $x = 0$ gives $\\frac{0}{0}$.`,
          `$\\dfrac{x^2 ${pm(c)}x}{${k === 1 ? '' : k}x} = \\dfrac{x(x ${pm(c)})}{${k === 1 ? '' : k}x} = \\dfrac{x ${pm(c)}}{${k}}$ for $x \\ne 0$.`.replace('\\dfrac{x ' + pm(c) + '}{1}', `x ${pm(c)}`),
          `$${lim(0)} ${k === 1 ? `(x ${pm(c)})` : `\\dfrac{x ${pm(c)}}{${k}}`} = ${tn(v)}$`,
        ],
      };
    }

    if (kind === 'trinomial') {
      const r = rng.int(-4, 5);
      const s = rng.intExcept(-6, 6, [r]);
      const overLinear = rng.chance(0.4);
      const t = rng.intExcept(-6, 6, [r, s]);
      const num = prodTex(r, s);
      const den = overLinear ? xm(r) : prodTex(r, t);
      const v = overLinear ? r - s : (r - s) / (r - t);
      const reduced = overLinear ? xm(s) : `\\dfrac{${xm(s)}}{${xm(t)}}`;
      return {
        prompt: `Evaluate $${lim(r)} \\dfrac{${num}}{${den}}$.`,
        parts: [numPart(v)],
        hints: [zeroHint, `Since substitution gives $\\frac{0}{0}$, $(${xm(r)})$ is a factor of the numerator${overLinear ? '' : ' and the denominator'}. Factor and cancel it.`],
        solution: [
          `Substituting $x = ${r}$ gives $\\frac{0}{0}$.`,
          `Factor: $\\dfrac{${fx(r)}${fx(s)}}{${overLinear ? xm(r) : `${fx(r)}${fx(t)}`}} = ${reduced}$ for $x \\ne ${r}$.`,
          overLinear ? `$${lim(r)} (${xm(s)}) = ${r} ${pm(-s)} = ${v}$` : `$${lim(r)} \\dfrac{${xm(s)}}{${xm(t)}} = \\dfrac{${r - s}}{${r - t}} = ${tn(v)}$`,
        ],
      };
    }

    if (kind === 'rationalize') {
      const m = rng.int(1, 5);
      const a = rng.int(-3, 8);
      const k = m * m - a;
      const root = `\\sqrt{${xm(-k)}}`;
      const flip = rng.chance(0.35);
      const v = flip ? 2 * m : 1 / (2 * m);
      const expr = flip ? `\\dfrac{${xm(a)}}{${root} - ${m}}` : `\\dfrac{${root} - ${m}}{${xm(a)}}`;
      return {
        prompt: `Evaluate $${lim(a)} ${expr}$.`,
        parts: [numPart(v)],
        hints: [zeroHint, `Multiply the numerator and denominator by the conjugate $${root} + ${m}$.`],
        solution: [
          `Substituting $x = ${a}$ gives $\\frac{0}{0}$.`,
          `Multiply by $\\dfrac{${root} + ${m}}{${root} + ${m}}$: $(${root} - ${m})(${root} + ${m}) = (${xm(-k)}) - ${m * m} = ${xm(a)}$.`,
          flip
            ? `$${expr} = \\dfrac{(${xm(a)})(${root} + ${m})}{${xm(a)}} = ${root} + ${m}$ for $x \\ne ${a}$.`
            : `$${expr} = \\dfrac{${xm(a)}}{(${xm(a)})(${root} + ${m})} = \\dfrac{1}{${root} + ${m}}$ for $x \\ne ${a}$.`,
          flip ? `$${lim(a)} (${root} + ${m}) = \\sqrt{${m * m}} + ${m} = ${v}$` : `$${lim(a)} \\dfrac{1}{${root} + ${m}} = \\dfrac{1}{\\sqrt{${m * m}} + ${m}} = ${tn(v)}$`,
        ],
      };
    }

    if (kind === 'sinkx') {
      const k = rng.int(2, 9);
      const t = rng.int(0, 2);
      const mm = rng.intExcept(2, 7, [k]);
      const [expr, v, steps] =
        t === 0
          ? [`\\dfrac{\\sin ${k}x}{x}`, k, [`$\\dfrac{\\sin ${k}x}{x} = ${k} \\cdot \\dfrac{\\sin ${k}x}{${k}x}$`, `As $x \\to 0$, $${k}x \\to 0$, so $\\dfrac{\\sin ${k}x}{${k}x} \\to 1$.`, `The limit is $${k}(1) = ${k}$.`]]
          : t === 1
            ? [`\\dfrac{\\sin ${k}x}{${mm}x}`, k / mm, [`$\\dfrac{\\sin ${k}x}{${mm}x} = \\dfrac{${k}}{${mm}} \\cdot \\dfrac{\\sin ${k}x}{${k}x}$`, `As $x \\to 0$, $\\dfrac{\\sin ${k}x}{${k}x} \\to 1$.`, `The limit is $${tn(k / mm)}$.`]]
            : [`\\dfrac{x}{\\sin ${k}x}`, 1 / k, [`$\\dfrac{x}{\\sin ${k}x} = \\dfrac{1}{${k}} \\cdot \\dfrac{${k}x}{\\sin ${k}x}$`, `As $x \\to 0$, $\\dfrac{${k}x}{\\sin ${k}x} \\to 1$ (the reciprocal of a quantity approaching $1$).`, `The limit is $${tn(1 / k)}$.`]];
      return {
        prompt: `Evaluate $${lim(0)} ${expr}$.`,
        parts: [numPart(v as number)],
        hints: ['Use the special limit $\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$ (with $\\theta$ in radians).', `Make the denominator match the angle: multiply and divide by $${k}$.`],
        solution: [...(steps as string[]), `$${lim(0)} ${expr} = ${tn(v as number)}$`],
      };
    }

    if (kind === 'cubic') {
      const a = rng.nonZero(-3, 3);
      const t = rng.int(0, 2);
      if (t === 0) {
        // (x^3 - a^3)/(x - a) -> 3a^2
        return {
          prompt: `Evaluate $${lim(a)} \\dfrac{x^3 ${pm(-(a ** 3))}}{${xm(a)}}$.`,
          parts: [numPart(3 * a * a)],
          hints: [zeroHint, `Factor the numerator: $x^3 - a^3 = (x - a)(x^2 + ax + a^2)$.`],
          solution: [
            `Substituting $x = ${a}$ gives $\\frac{0}{0}$.`,
            `$x^3 ${pm(-(a ** 3))} = (${xm(a)})(${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])})$`,
            `Cancel $(${xm(a)})$: the expression equals $${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])}$ for $x \\ne ${a}$.`,
            `$${lim(a)} (${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])}) = ${a * a} ${pm(a * a)} ${pm(a * a)} = ${3 * a * a}$`,
          ],
        };
      }
      if (t === 1) {
        // (x^3 - a^2 x)/(x - a) = x(x + a) -> 2a^2
        return {
          prompt: `Evaluate $${lim(a)} \\dfrac{x^3 - ${a * a}x}{${xm(a)}}$.`,
          parts: [numPart(2 * a * a)],
          hints: [zeroHint, `Factor out $x$, then factor the difference of squares.`],
          solution: [
            `Substituting $x = ${a}$ gives $\\frac{0}{0}$.`,
            `$x^3 - ${a * a}x = x(x^2 - ${a * a}) = x(${xm(a)})(${xm(-a)})$`,
            `Cancel $(${xm(a)})$: the expression equals $x(${xm(-a)})$ for $x \\ne ${a}$.`,
            `$${lim(a)} x(${xm(-a)}) = ${par(a)}(${2 * a}) = ${2 * a * a}$`,
          ],
        };
      }
      // (x^2 + bx + c)/(x^3 - a^3)? use (x - a)/(x^3 - a^3) -> 1/(3a^2)
      return {
        prompt: `Evaluate $${lim(a)} \\dfrac{${xm(a)}}{x^3 ${pm(-(a ** 3))}}$.`,
        parts: [numPart(1 / (3 * a * a))],
        hints: [zeroHint, `Factor the denominator: $x^3 - a^3 = (x - a)(x^2 + ax + a^2)$.`],
        solution: [
          `Substituting $x = ${a}$ gives $\\frac{0}{0}$.`,
          `$x^3 ${pm(-(a ** 3))} = (${xm(a)})(${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])})$`,
          `Cancel: the expression equals $\\dfrac{1}{${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])}}$ for $x \\ne ${a}$.`,
          `$${lim(a)} \\dfrac{1}{${poly([[1, 'x^2'], [a, 'x'], [a * a, '']])}} = \\dfrac{1}{${3 * a * a}}$`,
        ],
      };
    }

    if (kind === 'complexFrac') {
      if (rng.chance(0.5)) {
        const a = rng.pick([2, 3, 4, 5, 6]);
        return {
          prompt: `Evaluate $${lim(a)} \\dfrac{\\frac{1}{x} - \\frac{1}{${a}}}{${xm(a)}}$.`,
          parts: [numPart(-1 / (a * a))],
          hints: [zeroHint, `Combine the fractions in the numerator over the common denominator $${a}x$.`],
          solution: [
            `Substituting $x = ${a}$ gives $\\frac{0}{0}$.`,
            `$\\dfrac{1}{x} - \\dfrac{1}{${a}} = \\dfrac{${a} - x}{${a}x} = \\dfrac{-(${xm(a)})}{${a}x}$`,
            `Divide by $(${xm(a)})$: the expression equals $\\dfrac{-1}{${a}x}$ for $x \\ne ${a}$.`,
            `$${lim(a)} \\dfrac{-1}{${a}x} = \\dfrac{-1}{${a}(${a})} = ${tn(-1 / (a * a))}$`,
          ],
        };
      }
      const k = rng.int(1, 6);
      return {
        prompt: `Evaluate $${lim(0)} \\dfrac{\\frac{1}{x + ${k}} - \\frac{1}{${k}}}{x}$.`,
        parts: [numPart(-1 / (k * k))],
        hints: [zeroHint, `Combine the fractions in the numerator over the common denominator $${k}(x + ${k})$.`],
        solution: [
          `Substituting $x = 0$ gives $\\frac{0}{0}$.`,
          `$\\dfrac{1}{x + ${k}} - \\dfrac{1}{${k}} = \\dfrac{${k} - (x + ${k})}{${k}(x + ${k})} = \\dfrac{-x}{${k}(x + ${k})}$`,
          `Divide by $x$: the expression equals $\\dfrac{-1}{${k}(x + ${k})}$ for $x \\ne 0$.`,
          `$${lim(0)} \\dfrac{-1}{${k}(x + ${k})} = \\dfrac{-1}{${k * k}} = ${tn(-1 / (k * k))}$`,
        ],
      };
    }

    if (kind === 'sinRatio') {
      const t = rng.int(0, 2);
      const a = rng.int(2, 9);
      const b = rng.intExcept(2, 9, [a]);
      if (t === 0) {
        return {
          prompt: `Evaluate $${lim(0)} \\dfrac{\\sin ${a}x}{\\sin ${b}x}$.`,
          parts: [numPart(a / b)],
          hints: ['Use $\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$ twice.', `Divide the numerator and the denominator by $x$, then write each as a multiple of $\\frac{\\sin \\theta}{\\theta}$.`],
          solution: [
            `$\\dfrac{\\sin ${a}x}{\\sin ${b}x} = \\dfrac{${a} \\cdot \\dfrac{\\sin ${a}x}{${a}x}}{${b} \\cdot \\dfrac{\\sin ${b}x}{${b}x}}$`,
            `As $x \\to 0$, both $\\dfrac{\\sin ${a}x}{${a}x}$ and $\\dfrac{\\sin ${b}x}{${b}x}$ approach $1$.`,
            `The limit is $\\dfrac{${a}}{${b}}${gcd(a, b) > 1 ? ` = ${tn(a / b)}` : ''}$.`,
          ],
        };
      }
      if (t === 1) {
        const m = rng.int(1, 6);
        return {
          prompt: `Evaluate $${lim(0)} \\dfrac{\\sin ${a}x}{x^2 + ${m === 1 ? '' : m}x}$.`,
          parts: [numPart(a / m)],
          hints: ['Factor the denominator: $x^2 + mx = x(x + m)$.', `Split the expression into $\\dfrac{\\sin ${a}x}{x} \\cdot \\dfrac{1}{x + ${m}}$ and use $\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$.`],
          solution: [
            `$\\dfrac{\\sin ${a}x}{x(x + ${m})} = \\dfrac{\\sin ${a}x}{x} \\cdot \\dfrac{1}{x + ${m}}$`,
            `$${lim(0)} \\dfrac{\\sin ${a}x}{x} = ${a}$ and $${lim(0)} \\dfrac{1}{x + ${m}} = \\dfrac{1}{${m}}$`,
            `The limit is $${a} \\cdot \\dfrac{1}{${m}} = ${tn(a / m)}$.`,
          ],
        };
      }
      return {
        prompt: `Evaluate $${lim(0)} \\dfrac{\\tan ${a}x}{${b}x}$.`,
        parts: [numPart(a / b)],
        hints: [`Write $\\tan ${a}x = \\dfrac{\\sin ${a}x}{\\cos ${a}x}$.`, 'Then use $\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$ and $\\cos 0 = 1$.'],
        solution: [
          `$\\dfrac{\\tan ${a}x}{${b}x} = \\dfrac{\\sin ${a}x}{${b}x \\cos ${a}x} = \\dfrac{${a}}{${b}} \\cdot \\dfrac{\\sin ${a}x}{${a}x} \\cdot \\dfrac{1}{\\cos ${a}x}$`,
          `As $x \\to 0$: $\\dfrac{\\sin ${a}x}{${a}x} \\to 1$ and $\\cos ${a}x \\to 1$.`,
          `The limit is $\\dfrac{${a}}{${b}}${gcd(a, b) > 1 ? ` = ${tn(a / b)}` : ''}$.`,
        ],
      };
    }

    // rationalize2: (sqrt(px + q) - m)/(x - r) with pr + q = m^2 -> p/(2m)
    const { p, r, m, q } = retry(
      () => {
        const p = rng.int(2, 5);
        const r = rng.int(-2, 6);
        const m = rng.int(1, 5);
        return { p, r, m, q: m * m - p * r };
      },
      (o) => o.q !== 0,
    );
    const inner = poly([[p, 'x'], [q, '']]);
    const root = `\\sqrt{${inner}}`;
    const v = p / (2 * m);
    return {
      prompt: `Evaluate $${lim(r)} \\dfrac{${root} - ${m}}{${xm(r)}}$.`,
      parts: [numPart(v)],
      hints: [zeroHint, `Multiply the numerator and denominator by the conjugate $${root} + ${m}$, then factor $${p}$ out of the new numerator.`],
      solution: [
        `Substituting $x = ${r}$ gives $\\frac{0}{0}$.`,
        `$(${root} - ${m})(${root} + ${m}) = ${inner} - ${m * m} = ${poly([[p, 'x'], [q - m * m, '']])} = ${p}(${xm(r)})$`,
        `So the expression equals $\\dfrac{${p}(${xm(r)})}{(${xm(r)})(${root} + ${m})} = \\dfrac{${p}}{${root} + ${m}}$ for $x \\ne ${r}$.`,
        `$${lim(r)} \\dfrac{${p}}{${root} + ${m}} = \\dfrac{${p}}{\\sqrt{${m * m}} + ${m}} = \\dfrac{${p}}{${2 * m}}${gcd(p, 2 * m) > 1 ? ` = ${tn(v)}` : ''}$`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 2.3 — Limits at infinity and infinite limits
// ---------------------------------------------------------------------------

const INF = '$\\infty$';
const NINF = '$-\\infty$';

/** Random polynomial coefficients of a given degree (leading coefficient non-zero), highest first. */
function randPoly(rng: Rng, deg: number, lead?: number): number[] {
  const out = [lead ?? rng.nonZero(-5, 6)];
  for (let i = 0; i < deg; i++) out.push(rng.int(-7, 7));
  return out;
}
function polyTexDesc(c: number[]): string {
  const n = c.length - 1;
  return poly(c.map((k, i) => [k, n - i === 0 ? '' : n - i === 1 ? 'x' : `x^${n - i}`] as [number, string]));
}

const limitInfinity = skill({
  id: 'm31-limit-infinity',
  name: 'Limits at infinity and infinite limits',
  description: 'Evaluate limits of rational and radical functions as x → ±∞ and infinite limits at vertical asymptotes, and connect them to asymptotes.',
  outcomes: ['L1'],
  lessonId: 'm31-2-3',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['equalDeg', 'lowerDeg', 'graphHA'] as const)
        : d === 2
          ? rng.pick(['higherDeg', 'vaOneSided', 'asymLinear', 'graphVA'] as const)
          : rng.pick(['radical', 'twoSided', 'asymAll'] as const);
    const toInf = rng.chance(0.65);
    const inf = toInf ? '\\infty' : '-\\infty';
    const degHint = 'Divide the numerator and the denominator by the highest power of $x$ in the denominator. Terms like $\\frac{c}{x}$ and $\\frac{c}{x^2}$ approach $0$.';

    if (kind === 'equalDeg' || kind === 'lowerDeg') {
      const n = rng.pick([1, 2, 2, 3]);
      const equal = kind === 'equalDeg';
      const top = equal ? randPoly(rng, n) : randPoly(rng, n - 1);
      const bottom = randPoly(rng, n, rng.nonZero(-4, 5));
      const v = equal ? top[0] / bottom[0] : 0;
      const xn = n === 1 ? 'x' : `x^${n}`;
      const divided = (c: number[]) => overX(c.map((k, i) => [k, n - (c.length - 1 - i)] as [number, number]));
      return {
        prompt: `Evaluate $${lim(inf)} \\dfrac{${polyTexDesc(top)}}{${polyTexDesc(bottom)}}$.`,
        parts: [numPart(v)],
        hints: [degHint, equal ? 'The degrees are equal, so only the leading coefficients survive.' : 'The denominator has the higher degree.'],
        solution: [
          `Divide every term by $${xn}$: $\\dfrac{${divided(top)}}{${divided(bottom)}}$`,
          `As $x \\to ${inf}$, every term with $x$ in a denominator approaches $0$.`,
          equal ? `The limit is $\\dfrac{${top[0]}}{${bottom[0]}} = ${tn(v)}$.` : `The numerator approaches $0$ and the denominator approaches $${bottom[0]}$, so the limit is $0$.`,
        ],
      };
    }

    if (kind === 'graphHA' || kind === 'graphVA') {
      const h = rng.pick([-2, -1, 1, 2]);
      const c = rng.intExcept(-3, 3, [0, h]);
      const k = rng.pick([1, 2, -1, -2]);
      const fig = hyperbolaFig(k, h, c);
      if (kind === 'graphHA') {
        return {
          prompt: `The graph of $y = f(x)$ is shown, with its asymptotes dashed. Find $${lim(inf)} f(x)$.`,
          figure: fig,
          parts: [numPart(c, { label: `$${lim(inf)} f(x) =$` })],
          hints: ['Follow the graph far to the ' + (toInf ? 'right' : 'left') + '. What height does it level off at?', 'A horizontal asymptote $y = L$ means $f(x) \\to L$ as $x \\to \\infty$ or $x \\to -\\infty$.'],
          solution: [`Far to the ${toInf ? 'right' : 'left'}, the graph gets closer and closer to the dashed horizontal line $y = ${c}$.`, `$${lim(inf)} f(x) = ${c}$`],
        };
      }
      const side = rng.pick(['-', '+'] as const);
      const up = (k > 0) === (side === '+');
      return {
        prompt: `The graph of $y = f(x)$ is shown, with its asymptotes dashed. Find each limit.`,
        figure: fig,
        parts: [
          part(mc(rng, up ? INF : NINF, [up ? NINF : INF, `$${c}$`, `$${h}$`]), { label: `$${lim(h, side)} f(x)$` }),
          numPart(c, { label: `$${lim(inf)} f(x) =$` }),
        ],
        hints: [`Near the vertical asymptote $x = ${h}$, follow the branch on the ${side === '-' ? 'left' : 'right'}. Does it rise or fall without bound?`, `For the second limit, look at where the graph levels off far to the ${toInf ? 'right' : 'left'}.`],
        solution: [
          `As $x \\to ${h}^{${side}}$, the ${side === '-' ? 'left' : 'right'} branch ${up ? 'rises' : 'falls'} without bound, so $${lim(h, side)} f(x) = ${up ? '\\infty' : '-\\infty'}$.`,
          `Far to the ${toInf ? 'right' : 'left'}, the graph approaches the horizontal asymptote $y = ${c}$, so $${lim(inf)} f(x) = ${c}$.`,
        ],
      };
    }

    if (kind === 'higherDeg') {
      const n = rng.pick([1, 2]);
      const extra = rng.pick([1, 1, 2]);
      const top = randPoly(rng, n + extra);
      const bottom = randPoly(rng, n, rng.nonZero(-4, 4));
      const ratio = top[0] / bottom[0];
      // leading behaviour: ratio * x^extra
      const sign = ratio * (toInf ? 1 : (-1) ** extra);
      const correct = sign > 0 ? INF : NINF;
      const ext = extra === 1 ? 'x' : `x^${extra}`;
      return {
        prompt: `Evaluate $${lim(inf)} \\dfrac{${polyTexDesc(top)}}{${polyTexDesc(bottom)}}$.`,
        parts: [part(mc(rng, correct, [sign > 0 ? NINF : INF, `$${tn(ratio)}$`, '$0$']))],
        hints: ['Compare the degrees. When the numerator has the higher degree, the quotient grows without bound — decide the sign.', 'For large $|x|$ the function behaves like the ratio of the leading terms.'],
        solution: [
          `For large $|x|$, $\\dfrac{${polyTexDesc(top)}}{${polyTexDesc(bottom)}} \\approx \\dfrac{${poly([[top[0], `x^${n + extra}`]])}}{${poly([[bottom[0], n === 1 ? 'x' : `x^${n}`]])}} = ${poly([[ratio, ext]])}$.`,
          `As $x \\to ${inf}$, $${poly([[ratio, ext]])} \\to ${sign > 0 ? '\\infty' : '-\\infty'}$.`,
          `$${lim(inf)} \\dfrac{${polyTexDesc(top)}}{${polyTexDesc(bottom)}} = ${sign > 0 ? '\\infty' : '-\\infty'}$`,
        ],
      };
    }

    if (kind === 'vaOneSided') {
      const h = rng.nonZero(-4, 5);
      const { p, q } = retry(() => ({ p: rng.nonZero(-3, 4), q: rng.int(-8, 8) }), (o) => o.p * h + o.q !== 0);
      const side = rng.pick(['-', '+'] as const);
      const N = p * h + q;
      const pos = (N > 0) === (side === '+');
      const num = poly([[p, 'x'], [q, '']]);
      return {
        prompt: `Evaluate $${lim(h, side)} \\dfrac{${num}}{${xm(h)}}$.`,
        parts: [part(mc(rng, pos ? INF : NINF, [pos ? NINF : INF, `$${tn(p)}$`, '$0$']))],
        hints: [`At $x = ${h}$ the numerator is not $0$ but the denominator is, so the function grows without bound. Decide the sign.`, `Find the sign of the numerator near $x = ${h}$, and the sign of $${xm(h)}$ when $x$ is slightly ${side === '+' ? 'greater' : 'less'} than $${h}$.`],
        solution: [
          `As $x \\to ${h}$, the numerator approaches $${poly([[p, `(${h})`], [q, '']])} = ${N}$, which is ${N > 0 ? 'positive' : 'negative'}.`,
          `For $x$ slightly ${side === '+' ? 'greater' : 'less'} than $${h}$, the denominator $${xm(h)}$ is a small ${side === '+' ? 'positive' : 'negative'} number.`,
          `A ${N > 0 ? 'positive' : 'negative'} number divided by a small ${side === '+' ? 'positive' : 'negative'} number is ${pos ? 'large and positive' : 'large and negative'}.`,
          `$${lim(h, side)} \\dfrac{${num}}{${xm(h)}} = ${pos ? '\\infty' : '-\\infty'}$`,
        ],
      };
    }

    if (kind === 'asymLinear') {
      const { a, b, c, dd } = retry(
        () => ({ a: rng.nonZero(-6, 6), b: rng.int(-8, 8), c: rng.pick([1, 2, 3, -1, 2, 4]), dd: rng.nonZero(-8, 8) }),
        (o) => o.a * o.dd - o.b * o.c !== 0 && Number.isInteger((2 * o.dd) / o.c),
      );
      const va = -dd / c;
      const ha = a / c;
      const num = poly([[a, 'x'], [b, '']]);
      const den = poly([[c, 'x'], [dd, '']]);
      return {
        prompt: `For $f(x) = \\dfrac{${num}}{${den}}$, find the equations of the vertical and horizontal asymptotes.`,
        parts: [numPart(va, { label: 'Vertical asymptote: $x =$' }), numPart(ha, { label: 'Horizontal asymptote: $y =$' })],
        hints: ['A vertical asymptote is where the denominator is $0$ (and the numerator is not).', `The horizontal asymptote is $y = \\displaystyle${lim('\\infty')} f(x)$: divide every term by $x$.`],
        solution: [
          `Denominator: $${den} = 0$ gives $x = ${tn(va)}$. The numerator there is $${tn(a * va + b)} \\ne 0$, so $x = ${tn(va)}$ is a vertical asymptote.`,
          `$${lim('\\infty')} \\dfrac{${num}}{${den}} = ${lim('\\infty')} \\dfrac{${overX([[a, 0], [b, 1]])}}{${overX([[c, 0], [dd, 1]])}} = \\dfrac{${a}}{${c}}${Number.isInteger(ha) || gcd(a, c) > 1 ? ` = ${tn(ha)}` : ''}$`,
          `The asymptotes are $x = ${tn(va)}$ and $y = ${tn(ha)}$.`,
        ],
      };
    }

    if (kind === 'radical') {
      const a = rng.int(1, 5);
      const b = rng.int(-6, 6);
      const cc = rng.int(1, 9);
      const p = rng.pick([1, 2, 3, -1, -2, 4]);
      const q = rng.int(-6, 6);
      const v = toInf ? a / p : -a / p;
      const inner = poly([[a * a, 'x^2'], [b, 'x'], [cc, '']]);
      const den = poly([[p, 'x'], [q, '']]);
      return {
        prompt: `Evaluate $${lim(inf)} \\dfrac{\\sqrt{${inner}}}{${den}}$.`,
        parts: [numPart(v)],
        hints: ['Divide the numerator and denominator by $x$. Inside the root, $x$ becomes $\\sqrt{x^2}$.', `Careful: $\\sqrt{x^2} = |x|$, which is ${toInf ? '$x$ when $x > 0$' : '$-x$ when $x < 0$'}.`],
        solution: [
          `For ${toInf ? '$x > 0$, $x = \\sqrt{x^2}$' : '$x < 0$, $x = -\\sqrt{x^2}$'}.`,
          `Divide the numerator by ${toInf ? '$\\sqrt{x^2}$' : '$-\\sqrt{x^2}$'} and the denominator by $x$: $\\dfrac{${toInf ? '' : '-'}\\sqrt{${overX([[a * a, 0], [b, 1], [cc, 2]])}}}{${overX([[p, 0], [q, 1]])}}$`,
          `As $x \\to ${inf}$, this approaches $\\dfrac{${toInf ? '' : '-'}\\sqrt{${a * a}}}{${p}} = ${tn(v)}$.`,
          `$${lim(inf)} \\dfrac{\\sqrt{${inner}}}{${den}} = ${tn(v)}$`,
        ],
      };
    }

    if (kind === 'twoSided') {
      const h = rng.nonZero(-4, 4);
      const t = rng.int(0, 2);
      const DNE_SIDES = 'The limit does not exist (the one-sided limits are $\\infty$ and $-\\infty$)';
      if (t === 0) {
        const k = rng.pick([1, 2, 3, 5, -1, -2, -4]);
        return {
          prompt: `Evaluate $${lim(h)} \\dfrac{${k}}{(${xm(h)})^2}$.`,
          parts: [part(mc(rng, k > 0 ? INF : NINF, [k > 0 ? NINF : INF, DNE_SIDES, '$0$']))],
          hints: [`$(${xm(h)})^2$ is a small positive number on both sides of $x = ${h}$.`, 'Decide the sign of the quotient from the numerator.'],
          solution: [
            `As $x \\to ${h}$ from either side, $(${xm(h)})^2 \\to 0$ through positive values.`,
            `The numerator is $${k}$, so the quotient is ${k > 0 ? 'large and positive' : 'large and negative'} on both sides.`,
            `$${lim(h)} \\dfrac{${k}}{(${xm(h)})^2} = ${k > 0 ? '\\infty' : '-\\infty'}$ (the graph has a vertical asymptote at $x = ${h}$).`,
          ],
        };
      }
      if (t === 1) {
        const k = rng.pick([1, 2, 3, -1, -2]);
        return {
          prompt: `Evaluate $${lim(h)} \\dfrac{${k}}{${xm(h)}}$.`,
          parts: [part(mc(rng, DNE_SIDES, [INF, NINF, '$0$']))],
          hints: [`Look at each side separately: the sign of $${xm(h)}$ changes at $x = ${h}$.`, 'A two-sided limit exists only when both one-sided limits agree.'],
          solution: [
            `$${lim(h, '+')} \\dfrac{${k}}{${xm(h)}} = ${k > 0 ? '\\infty' : '-\\infty'}$, because the denominator is a small positive number.`,
            `$${lim(h, '-')} \\dfrac{${k}}{${xm(h)}} = ${k > 0 ? '-\\infty' : '\\infty'}$, because the denominator is a small negative number.`,
            'The one-sided limits are different, so the limit does not exist.',
          ],
        };
      }
      // removable: (x^2 - h^2)/((x - h)(x - s)) style -> (x + h)/(x - s) at h
      const s = rng.intExcept(-5, 5, [h, -h]);
      const v = (2 * h) / (h - s);
      return {
        prompt: `Evaluate $${lim(h)} \\dfrac{x^2 - ${h * h}}{${prodTex(h, s)}}$.`,
        parts: [part(mc(rng, `$${tn(v)}$`, [INF, DNE_SIDES, NINF]))],
        hints: [`Substitute first: you get $\\frac{0}{0}$, not a non-zero number over $0$.`, 'Factor and cancel the common factor, then substitute.'],
        solution: [
          `At $x = ${h}$ both the numerator and the denominator are $0$, so this is not a vertical asymptote — factor.`,
          `$\\dfrac{(${xm(h)})(${xm(-h)})}{(${xm(h)})(${xm(s)})} = \\dfrac{${xm(-h)}}{${xm(s)}}$ for $x \\ne ${h}$.`,
          `$${lim(h)} \\dfrac{${xm(-h)}}{${xm(s)}} = \\dfrac{${2 * h}}{${h - s}} = ${tn(v)}$`,
        ],
      };
    }

    // asymAll: f(x) = a(x - r)(x - s) / ((x - r)(x - t))
    const a = rng.pick([1, 2, 3, -1, -2]);
    const r = rng.int(-4, 4);
    const s = rng.intExcept(-5, 5, [r]);
    const t = rng.intExcept(-5, 5, [r, s]);
    const num = poly([[a, 'x^2'], [-a * (r + s), 'x'], [a * r * s, '']]);
    const den = prodTex(r, t);
    const holeY = (a * (r - s)) / (r - t);
    return {
      prompt: `Let $f(x) = \\dfrac{${num}}{${den}}$.\n\n(a) Find the vertical asymptote.\n\n(b) Find $${lim('\\infty')} f(x)$.\n\n(c) Find $${lim(r)} f(x)$.`,
      parts: [numPart(t, { label: '(a) $x =$' }), numPart(a, { label: `(b) $${lim('\\infty')} f(x) =$` }), numPart(holeY, { label: `(c) $${lim(r)} f(x) =$` })],
      hints: ['Factor the numerator and the denominator first. A factor that cancels gives a hole, not an asymptote.', 'For (b), compare the leading coefficients; for (c), cancel the common factor and substitute.'],
      solution: [
        `$f(x) = \\dfrac{${cf(a)}(${xm(r)})(${xm(s)})}{(${xm(r)})(${xm(t)})} = \\dfrac{${cf(a)}(${xm(s)})}{${xm(t)}}$ for $x \\ne ${r}$.`,
        `(a) The factor $(${xm(t)})$ remains in the denominator, so $x = ${t}$ is the vertical asymptote. ($x = ${r}$ is a hole.)`,
        `(b) The degrees are equal, so the limit is the ratio of the leading coefficients: $${lim('\\infty')} f(x) = ${a}$.`,
        `(c) $${lim(r)} \\dfrac{${cf(a)}(${xm(s)})}{${xm(t)}} = \\dfrac{${cf(a)}(${r - s})}{${r - t}} = ${tn(holeY)}$`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 2.4 — Continuity
// ---------------------------------------------------------------------------

function reasonChoices(a: number, F = 'f'): string[] {
  return [
    `Yes: $${F}(${a})$ is defined, $${lim(a)} ${F}(x)$ exists, and they are equal`,
    `No: $${F}(${a})$ is not defined`,
    `No: $${lim(a)} ${F}(x)$ does not exist`,
    `No: $${lim(a)} ${F}(x)$ exists but is not equal to $${F}(${a})$`,
  ];
}
const CONT_HINT = 'A function is continuous at $x = a$ when three things are true: $f(a)$ is defined, $\\displaystyle\\lim_{x \\to a} f(x)$ exists, and the two are equal.';

/** A piecewise function written with cases. */
const cases = (rows: Array<[string, string]>) => `\\begin{cases} ${rows.map(([e, c]) => `${e}, & ${c}`).join(' \\\\ ')} \\end{cases}`;

const continuity = skill({
  id: 'm31-continuity',
  name: 'Continuity',
  description: 'Decide whether a function is continuous at a point using the three-part definition, and find a constant that makes a piecewise function continuous.',
  outcomes: ['L2'],
  lessonId: 'm31-2-4',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['graph'] as const)
        : d === 2
          ? rng.pick(['piecewise', 'findK', 'findK', 'where'] as const)
          : rng.pick(['removableK', 'findAB', 'kBoth'] as const);

    if (kind === 'graph') {
      const x = rng.nonZero(-3, 3);
      const t = rng.int(0, 3);
      const L = rng.int(-4, 4);
      let b: Brk;
      if (t === 0) b = { x, L, R: L, f: L };
      else if (t === 1) b = { x, L, R: L, f: null };
      else if (t === 2) {
        const R = otherInt(rng, -4, 4, [L]);
        b = { x, L, R, f: rng.pick([L, R]) };
      } else b = { x, L, R: L, f: otherInt(rng, -4, 4, [L]) };
      const reasons = [
        [`The graph has no break at $x = ${x}$: $f(${x}) = ${L}$ and $${lim(x)} f(x) = ${L}$.`, `$f$ is continuous at $x = ${x}$.`],
        [`There is an open circle at $(${x}, ${L})$ and no closed dot above or below it, so $f(${x})$ is not defined.`, `$f$ is not continuous at $x = ${x}$ (a removable discontinuity, or hole).`],
        [`From the left the graph approaches $${b.L}$; from the right it approaches $${b.R}$.`, `The one-sided limits are different, so $${lim(x)} f(x)$ does not exist: $f$ has a jump discontinuity at $x = ${x}$.`],
        [`$${lim(x)} f(x) = ${L}$ (the open circle), but $f(${x}) = ${b.f}$ (the closed dot).`, `The limit and the function value are different, so $f$ is not continuous at $x = ${x}$ (a removable discontinuity).`],
      ][t];
      return {
        prompt: `The graph of $y = f(x)$ is shown. Is $f$ continuous at $x = ${x}$? Choose the best answer.`,
        figure: piecewiseGraph(rng, [b]),
        parts: [part(fixedChoice(reasonChoices(x), t))],
        hints: [CONT_HINT, `Check the three conditions at $x = ${x}$ in order. Look for open circles, closed dots and jumps.`],
        solution: reasons,
      };
    }

    if (kind === 'piecewise') {
      const a = rng.nonZero(-2, 3);
      const t = rng.int(0, 2);
      if (t <= 1) {
        // left: x^2 + c (x < a); right: m x + b (x >= a); continuous when a^2 + c = m a + b.
        const c = rng.int(-4, 4);
        const m = rng.nonZero(-3, 3);
        const Lv = a * a + c;
        const cont = t === 0;
        const b = cont ? Lv - m * a : Lv - m * a + rng.nonZero(-3, 3);
        const Rv = m * a + b;
        const left = poly([[1, 'x^2'], [c, '']]);
        const right = poly([[m, 'x'], [b, '']]);
        return {
          prompt: `Let $$f(x) = ${cases([[left, `x < ${a}`], [right, `x \\ge ${a}`]])}$$ Is $f$ continuous at $x = ${a}$? Choose the best answer.`,
          parts: [part(fixedChoice(reasonChoices(a), cont ? 0 : 2))],
          hints: [CONT_HINT, `Find $f(${a})$ from the piece that includes $x = ${a}$, and the one-sided limits from each piece.`],
          solution: [
            `$f(${a}) = ${poly([[m, `(${a})`], [b, '']])} = ${Rv}$ (from the second piece, since $${a} \\ge ${a}$).`,
            `$${lim(a, '-')} f(x) = (${a})^2 ${pm(c)} = ${Lv}$ and $${lim(a, '+')} f(x) = ${Rv}$.`,
            cont ? `Both one-sided limits equal $${Lv} = f(${a})$, so $f$ is continuous at $x = ${a}$.` : `$${Lv} \\ne ${Rv}$, so $${lim(a)} f(x)$ does not exist and $f$ is not continuous at $x = ${a}$.`,
          ],
        };
      }
      // removable: (x^2 - a^2)/(x - a) for x != a, value k at a
      const k = rng.chance(0.5) ? 2 * a : rng.intExcept(-6, 6, [2 * a]);
      const ok = k === 2 * a;
      return {
        prompt: `Let $$f(x) = ${cases([[`\\dfrac{x^2 - ${a * a}}{${xm(a)}}`, `x \\ne ${a}`], [`${k}`, `x = ${a}`]])}$$ Is $f$ continuous at $x = ${a}$? Choose the best answer.`,
        parts: [part(fixedChoice(reasonChoices(a), ok ? 0 : 3))],
        hints: [CONT_HINT, `For $x \\ne ${a}$, factor and cancel to find the limit.`],
        solution: [
          `$f(${a}) = ${k}$ is defined.`,
          `For $x \\ne ${a}$: $\\dfrac{x^2 - ${a * a}}{${xm(a)}} = ${xm(-a)}$, so $${lim(a)} f(x) = ${2 * a}$.`,
          ok ? `The limit equals $f(${a})$, so $f$ is continuous at $x = ${a}$.` : `The limit exists but $${2 * a} \\ne ${k}$, so $f$ is not continuous at $x = ${a}$.`,
        ],
      };
    }

    if (kind === 'findK') {
      // left: k x + b (x < a); right: x^2 + c (x >= a): k a + b = a^2 + c.
      const { a, b, c } = retry(
        () => ({ a: rng.nonZero(-3, 4), b: rng.int(-6, 6), c: rng.int(-6, 6) }),
        (o) => Number.isInteger((o.a * o.a + o.c - o.b) / o.a) || Math.abs(o.a) === 2,
      );
      const k = (a * a + c - b) / a;
      const flip = rng.chance(0.5);
      const kPiece = poly([[1, 'kx'], [b, '']]);
      const other = poly([[1, 'x^2'], [c, '']]);
      const rows: Array<[string, string]> = flip ? [[other, `x < ${a}`], [kPiece, `x \\ge ${a}`]] : [[kPiece, `x < ${a}`], [other, `x \\ge ${a}`]];
      return {
        prompt: `Find the value of $k$ that makes $$f(x) = ${cases(rows)}$$ continuous at $x = ${a}$.`,
        parts: [numPart(k, { label: '$k =$' })],
        hints: ['For continuity at the break, the two pieces must meet: the left-hand and right-hand limits must be equal (and equal to the function value).', `Substitute $x = ${a}$ into both pieces and set them equal.`],
        solution: [
          `The ${flip ? 'right' : 'left'} piece approaches $k(${a}) ${pm(b)} = ${cf(a)}k ${pm(b)}$.`,
          `The ${flip ? 'left' : 'right'} piece approaches $(${a})^2 ${pm(c)} = ${a * a + c}$.`,
          `Set them equal: $${cf(a)}k ${pm(b)} = ${a * a + c}$, so $${cf(a)}k = ${a * a + c - b}$.`,
          `$k = ${tn(k)}$`,
        ],
      };
    }

    if (kind === 'where') {
      const [r, s] = rng.sample([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6], 2).sort((p, q) => p - q);
      const cancel = rng.chance(0.4);
      const p = cancel ? rng.pick([r, s]) : rng.intExcept(-6, 6, [r, s]);
      const num = cancel ? xm(p) : poly([[1, 'x'], [-p, '']]);
      return {
        prompt: `At which values of $x$ is $f(x) = \\dfrac{${num}}{${prodTex(r, s)}}$ discontinuous? Enter all values, separated by commas.`,
        parts: [part({ kind: 'numbers', values: [r, s] }, { label: '$x =$', placeholder: 'e.g. -2, 3' })],
        hints: ['A rational function is continuous everywhere in its domain. It is discontinuous wherever it is undefined.', 'Factor the denominator and find its zeros. A factor that cancels still makes the original function undefined there.'],
        solution: [
          `$${prodTex(r, s)} = (${xm(r)})(${xm(s)})$, which is $0$ at $x = ${r}$ and $x = ${s}$.`,
          cancel
            ? `The factor $(${xm(p)})$ cancels, so $x = ${p}$ is a removable discontinuity (a hole) — but $f(${p})$ is still undefined. $x = ${p === r ? s : r}$ is a vertical asymptote.`
            : `The numerator is not $0$ at either value, so both are vertical asymptotes.`,
          `$f$ is discontinuous at $x = ${r}$ and $x = ${s}$.`,
        ],
      };
    }

    if (kind === 'removableK') {
      const t = rng.int(0, 2);
      if (t === 0) {
        const r = rng.int(-4, 5);
        const s = rng.intExcept(-6, 6, [r]);
        const k = r - s;
        return {
          prompt: `Find the value of $c$ that makes $$f(x) = ${cases([[`\\dfrac{${prodTex(r, s)}}{${xm(r)}}`, `x \\ne ${r}`], ['c', `x = ${r}`]])}$$ continuous at $x = ${r}$.`,
          parts: [numPart(k, { label: '$c =$' })],
          hints: [`$f$ is continuous at $x = ${r}$ when $f(${r}) = c$ equals $${lim(r)} f(x)$.`, 'Factor the numerator and cancel to find the limit.'],
          solution: [
            `For $x \\ne ${r}$: $\\dfrac{(${xm(r)})(${xm(s)})}{${xm(r)}} = ${xm(s)}$.`,
            `$${lim(r)} f(x) = ${r} ${pm(-s)} = ${k}$`,
            `For continuity, $c = f(${r})$ must equal the limit: $c = ${k}$.`,
          ],
        };
      }
      if (t === 1) {
        const m = rng.int(1, 4);
        const a = rng.int(-3, 6);
        const kk = m * m - a;
        const root = `\\sqrt{${xm(-kk)}}`;
        return {
          prompt: `Find the value of $c$ that makes $$f(x) = ${cases([[`\\dfrac{${root} - ${m}}{${xm(a)}}`, `x \\ne ${a}`], ['c', `x = ${a}`]])}$$ continuous at $x = ${a}$.`,
          parts: [numPart(1 / (2 * m), { label: '$c =$' })],
          hints: [`$c$ must equal $${lim(a)} f(x)$.`, `Rationalize: multiply the numerator and the denominator by $${root} + ${m}$.`],
          solution: [
            `$\\dfrac{${root} - ${m}}{${xm(a)}} \\cdot \\dfrac{${root} + ${m}}{${root} + ${m}} = \\dfrac{${xm(a)}}{(${xm(a)})(${root} + ${m})} = \\dfrac{1}{${root} + ${m}}$`,
            `$${lim(a)} f(x) = \\dfrac{1}{\\sqrt{${m * m}} + ${m}} = ${tn(1 / (2 * m))}$`,
            `For continuity, $c = ${tn(1 / (2 * m))}$.`,
          ],
        };
      }
      const k = rng.int(2, 9);
      const mm = rng.pick([1, 1, 2, 3]);
      return {
        prompt: `Find the value of $c$ that makes $$f(x) = ${cases([[`\\dfrac{\\sin ${k}x}{${mm === 1 ? '' : mm}x}`, 'x \\ne 0'], ['c', 'x = 0']])}$$ continuous at $x = 0$.`,
        parts: [numPart(k / mm, { label: '$c =$' })],
        hints: [`$c$ must equal $${lim(0)} f(x)$.`, 'Use $\\displaystyle\\lim_{\\theta \\to 0} \\frac{\\sin \\theta}{\\theta} = 1$.'],
        solution: [
          `$\\dfrac{\\sin ${k}x}{${mm === 1 ? '' : mm}x} = \\dfrac{${k}}{${mm}} \\cdot \\dfrac{\\sin ${k}x}{${k}x}$`.replace('\\dfrac{' + k + '}{1}', String(k)),
          `$${lim(0)} f(x) = ${tn(k / mm)} \\cdot 1 = ${tn(k / mm)}$`,
          `For continuity, $c = ${tn(k / mm)}$.`,
        ],
      };
    }

    if (kind === 'kBoth') {
      // Jump at x = a in a graph-free setting: a x^2 piece and a linear piece with unknown k in both
      // f(x) = k x^2 (x <= a), 2x + k (x > a): k a^2 = 2a + k -> k = 2a / (a^2 - 1)
      const a = rng.pick([2, 3, -2, -3]);
      const m = rng.pick([1, 2, 3, 4, 6, 8, -2, -3]);
      const k = (m * a) / (a * a - 1);
      return {
        prompt: `Find the value of $k$ that makes $$f(x) = ${cases([['kx^2', `x \\le ${a}`], [`${cf(m)}x + k`, `x > ${a}`]])}$$ continuous everywhere.`,
        parts: [numPart(k, { label: '$k =$' })],
        hints: ['Each piece is a polynomial, so the only place $f$ could be discontinuous is the break.', `Set the two pieces equal at $x = ${a}$ and solve for $k$ (it appears on both sides).`],
        solution: [
          `At $x = ${a}$: the left piece gives $k(${a})^2 = ${a * a}k$ and the right piece approaches $${m * a} + k$.`,
          `Set them equal: $${a * a}k = ${m * a} + k$, so $${a * a - 1}k = ${m * a}$.`,
          `$k = ${tn(k)}$`,
        ],
      };
    }

    // findAB: f(x) = g(x) for x < p; ax + b for p <= x <= q; h(x) for x > q.
    const { p, q, gp, hq, gTex, hTex } = retry(
      () => {
        const p = rng.int(-2, 1);
        const q = p + rng.pick([1, 2, 3, 4]);
        const c1 = rng.int(-4, 4);
        const c2 = rng.int(-6, 6);
        const gType = rng.int(0, 1);
        const hType = rng.int(0, 1);
        const gTex = gType ? poly([[1, 'x^2'], [c1, '']]) : poly([[-1, 'x'], [c1, '']]);
        const gp = gType ? p * p + c1 : -p + c1;
        const hTex = hType ? poly([[2, 'x'], [c2, '']]) : poly([[-1, 'x^2'], [c2, '']]);
        const hq = hType ? 2 * q + c2 : -q * q + c2;
        return { p, q, gp, hq, gTex, hTex };
      },
      (o) => (o.hq - o.gp) % (o.q - o.p) === 0 && o.hq !== o.gp,
    );
    const A = (hq - gp) / (q - p);
    const B = gp - A * p;
    return {
      prompt: `Find $a$ and $b$ so that $$f(x) = ${cases([[gTex, `x < ${p}`], ['ax + b', `${p} \\le x \\le ${q}`], [hTex, `x > ${q}`]])}$$ is continuous everywhere.`,
      parts: [numPart(A, { label: '$a =$' }), numPart(B, { label: '$b =$' })],
      hints: [`$f$ must be continuous at both breaks, $x = ${p}$ and $x = ${q}$. Each gives one equation in $a$ and $b$.`, 'Solve the two linear equations together (subtracting them eliminates $b$).'],
      solution: [
        `At $x = ${p}$: the left piece approaches $${gp}$, so $${p === 0 ? 'b' : `${cf(p)}a + b`} = ${gp}$.`,
        `At $x = ${q}$: the right piece approaches $${hq}$, so $${q === 0 ? 'b' : `${cf(q)}a + b`} = ${hq}$.`,
        q - p === 1 ? `Subtract the first equation from the second: $a = ${A}$.` : `Subtract the first equation from the second: $${q - p}a = ${hq - gp}$, so $a = ${A}$.`,
        `Then $b = ${gp} - ${par(A)}(${p}) = ${B}$.`,
        `$a = ${A}$ and $b = ${B}$`,
      ],
    };
  },
});

export const LIMITS_SKILLS: SkillDef[] = [limitGraph, limitAlgebraic, limitInfinity, continuity];

