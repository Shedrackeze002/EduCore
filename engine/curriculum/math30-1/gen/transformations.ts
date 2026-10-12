/** Math 30-1 Unit 1 — Function Transformations (RF2, RF3, RF4, RF5, RF6). */
import { fixedChoice, mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fracLatex, gcd, toFrac } from '../../../math/numbers.ts';
import { gradePart } from '../../../grade.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, ExprForm, GridSpec, Part, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Number and equation formatting (shared with radicalfns.ts)
// ---------------------------------------------------------------------------

export type Pt = [number, number];
export type Fn = (x: number) => number;

/** Remove floating-point noise (1/(1/3) = 3, not 3.0000000000000004) and negative zero. */
export const cl = (v: number) => Math.round(v * 1e9) / 1e9 + 0;

/** A number in LaTeX: integers plainly, simple fractions as \frac. */
export function tn(x: number, dfrac = false): string {
  const v = cl(x);
  if (Number.isInteger(v)) return fmt(v);
  const f = toFrac(v, 100);
  return f ? fracLatex(f, { dfrac }) : fmt(v);
}

/** A number as a student would type it: 3, -1/2. */
export function tt(x: number): string {
  const v = cl(x);
  if (Number.isInteger(v)) return fmt(v);
  const f = toFrac(v, 100);
  return f ? `${f.n}/${f.d}` : fmt(v);
}

/** An ordered pair in LaTeX. */
export const ptTex = (x: number, y: number) => `(${tn(x)}, ${tn(y)})`;
/** An ordered pair as a figure label (plain text). */
export const ptLabel = (x: number, y: number) => `(${tt(x)}, ${tt(y)})`;
/** "+ 3" or "- 3" in LaTeX. */
export const pmTex = (n: number) => (cl(n) < 0 ? `- ${tn(-n)}` : `+ ${tn(n)}`);
/** A number in brackets when negative, for substitutions. */
export const par = (n: number) => (cl(n) < 0 ? `(${tn(n)})` : tn(n));
/** "x - 3", "x + 3" or "x". */
export const xh = (h: number, v = 'x') => (cl(h) === 0 ? v : `${v} ${h > 0 ? '-' : '+'} ${tn(Math.abs(h))}`);
export const xhText = (h: number, v = 'x') => (cl(h) === 0 ? v : `${v} ${h > 0 ? '-' : '+'} ${tt(Math.abs(h))}`);

/** b(x - h) in LaTeX: x - 3, -(x - 3), 2(x - 3), \frac{1}{2}x. */
export function innerTex(b: number, h: number): string {
  const s = xh(h);
  if (b === 1) return s;
  if (b === -1) return cl(h) === 0 ? '-x' : `-(${s})`;
  return cl(h) === 0 ? `${tn(b)}x` : `${tn(b)}(${s})`;
}

/** b(x - h) as a student would type it. */
export function innerText(b: number, h: number): string {
  const s = xhText(h);
  if (b === 1) return s;
  if (b === -1) return cl(h) === 0 ? '-x' : `-(${s})`;
  const n = cl(1 / Math.abs(b));
  // b = 1/n reads best as a division: x/2, (x - 3)/2.
  if (Number.isInteger(n)) return `${b < 0 ? '-' : ''}${cl(h) === 0 ? 'x' : `(${s})`}/${n}`;
  const bt = Number.isInteger(b) ? `${b}` : b < 0 ? `-(${tt(-b)})` : `(${tt(b)})`;
  return cl(h) === 0 ? `${bt}x` : `${bt}(${s})`;
}

/** Coefficient in front of a function: '' for 1, '-' for -1. */
export const coefTex = (a: number) => (a === 1 ? '' : a === -1 ? '-' : tn(a));
export const coefText = (a: number) => (a === 1 ? '' : a === -1 ? '-' : Number.isInteger(a) ? `${a}` : a < 0 ? `-(${tt(-a)})` : `(${tt(a)})`);
export const kTex = (k: number) => (cl(k) === 0 ? '' : ` ${pmTex(k)}`);
export const kText = (k: number) => (cl(k) === 0 ? '' : k > 0 ? ` + ${tt(k)}` : ` - ${tt(-k)}`);
export const units = (n: number) => `${tn(Math.abs(n))} unit${Math.abs(n) === 1 ? '' : 's'}`;

/** Parameters of y = af(b(x - h)) + k. */
export interface Tf {
  a: number;
  b: number;
  h: number;
  k: number;
}

/** (x, y) -> (x/b + h, ay + k). */
export const mapPt = (p: Pt, t: Tf): Pt => [cl(p[0] / t.b + t.h), cl(t.a * p[1] + t.k)];

/** The image x-coordinate worked out: x/b + h. */
export function xImgTex(x0: number, t: Tf): string {
  const inv = cl(1 / t.b);
  if (inv === 1 && cl(t.h) === 0) return tn(x0);
  const scaled = inv === 1 ? tn(x0) : inv === -1 ? `-(${tn(x0)})` : Number.isInteger(inv) ? `${tn(inv)}(${tn(x0)})` : `\\dfrac{${tn(x0)}}{${tn(t.b)}}`;
  return `${scaled}${kTex(t.h)} = ${tn(x0 / t.b + t.h)}`;
}

/** The image y-coordinate worked out: ay + k. */
export function yImgTex(y0: number, t: Tf): string {
  if (t.a === 1 && cl(t.k) === 0) return tn(y0);
  const scaled = t.a === 1 ? tn(y0) : t.a === -1 ? `-(${tn(y0)})` : `${tn(t.a)}(${tn(y0)})`;
  return `${scaled}${kTex(t.k)} = ${tn(t.a * y0 + t.k)}`;
}

/** y = af(b(x - h)) + k, or the Alberta form y - k = af(b(x - h)). */
export function fEqTex(t: Tf, form: 'std' | 'ab' = 'std', f = 'f'): string {
  const inner = innerTex(t.b, t.h);
  const rhs = inner.includes('\\frac') ? `${coefTex(t.a)}${f}\\left(${inner}\\right)` : `${coefTex(t.a)}${f}(${inner})`;
  if (form === 'ab' && cl(t.k) !== 0) return `y ${t.k > 0 ? '-' : '+'} ${tn(Math.abs(t.k))} = ${rhs}`;
  return `y = ${rhs}${kTex(t.k)}`;
}

/** The mapping rule (x, y) -> (x/b + h, ay + k) in LaTeX. */
export function mappingTex(t: Tf): string {
  return `(x, y) \\to \\left(${linTex(1 / t.b, t.h, 'x')},\\ ${linTex(t.a, t.k, 'y')}\\right)`;
}

/** mx + c in LaTeX, with fractions written as \frac{x}{2}. */
export function linTex(m: number, c: number, v: string): string {
  const mm = cl(m);
  let lead: string;
  if (mm === 1) lead = v;
  else if (mm === -1) lead = `-${v}`;
  else if (!Number.isInteger(mm) && Number.isInteger(cl(1 / m))) lead = `${mm < 0 ? '-' : ''}\\frac{${v}}{${Math.abs(cl(1 / m))}}`;
  else lead = `${tn(mm)}${v}`;
  return `${lead}${kTex(c)}`;
}

/** n/d worked out: \\dfrac{6}{3} = 2, or just \\dfrac{1}{3} when that is already the simplest form. */
export function divTex(n: number, d: number): string {
  const v = cl(n / d);
  const g = gcd(n, d);
  if (Number.isInteger(n) && Number.isInteger(d) && d > 0 && g === 1 && !Number.isInteger(v)) return `\\dfrac{${n}}{${d}}`;
  return `\\dfrac{${tn(n)}}{${tn(d)}} = ${tn(v)}`;
}

export function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/** Translation in words: "3 units right and 2 units down". */
export function translationWords(h: number, k: number): string {
  const parts: string[] = [];
  if (cl(h) !== 0) parts.push(`${units(h)} ${h > 0 ? 'right' : 'left'}`);
  if (cl(k) !== 0) parts.push(`${units(k)} ${k > 0 ? 'up' : 'down'}`);
  return parts.join(' and ');
}

/** The transformations of y = af(b(x - h)) + k in the order they are applied. */
export function describeTf(t: Tf): string[] {
  const out: string[] = [];
  if (Math.abs(t.a) !== 1) out.push(`a vertical stretch by a factor of $${tn(Math.abs(t.a))}$ about the $x$-axis`);
  if (t.a < 0) out.push('a reflection in the $x$-axis');
  if (Math.abs(t.b) !== 1) out.push(`a horizontal stretch by a factor of $${tn(1 / Math.abs(t.b))}$ about the $y$-axis`);
  if (t.b < 0) out.push('a reflection in the $y$-axis');
  if (cl(t.h) !== 0 || cl(t.k) !== 0) out.push(`a translation of ${translationWords(t.h, t.k)}`);
  return out;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// Base functions
// ---------------------------------------------------------------------------

export type BaseId = 'sq' | 'abs' | 'sqrt' | 'cube' | 'recip';

interface Base {
  /** Right side of y = ... */
  eq: string;
  f: Fn;
  tex: (inner: string) => string;
  text: (inner: string) => string;
  placeholder: string;
}

const wrap = (inner: string) => (inner === 'x' ? 'x' : inner.includes('\\frac') ? `\\left(${inner}\\right)` : inner.includes('(') ? `[${inner}]` : `(${inner})`);

export const BASES: Record<BaseId, Base> = {
  sq: { eq: 'x^2', f: (x) => x * x, tex: (i) => `${wrap(i)}^2`, text: (i) => (i === 'x' ? 'x^2' : `(${i})^2`), placeholder: 'e.g. 2(x - 1)^2 + 3' },
  abs: { eq: '|x|', f: Math.abs, tex: (i) => `|${i}|`, text: (i) => `abs(${i})`, placeholder: 'e.g. 2abs(x - 1) + 3' },
  sqrt: { eq: '\\sqrt{x}', f: (x) => (x < 0 ? NaN : Math.sqrt(x)), tex: (i) => `\\sqrt{${i}}`, text: (i) => `sqrt(${i})`, placeholder: 'e.g. 2sqrt(x - 1) + 3' },
  cube: { eq: 'x^3', f: (x) => x * x * x, tex: (i) => `${wrap(i)}^3`, text: (i) => (i === 'x' ? 'x^3' : `(${i})^3`), placeholder: 'e.g. 2(x - 1)^3 + 3' },
  recip: { eq: '\\dfrac{1}{x}', f: (x) => (x === 0 ? NaN : 1 / x), tex: (i) => `\\dfrac{1}{${i}}`, text: (i) => `1/(${i})`, placeholder: 'e.g. 2/(x - 1) + 3' },
};

export const BASE_NAMES: Record<BaseId, string> = {
  sq: 'quadratic',
  abs: 'absolute value',
  sqrt: 'square root',
  cube: 'cubic',
  recip: 'reciprocal',
};

/** Right side of the transformed base function, LaTeX. */
export function baseRhsTex(base: BaseId, t: Tf): string {
  const inner = innerTex(t.b, t.h);
  if (base === 'recip') return `${t.a < 0 ? '-' : ''}\\dfrac{${tn(Math.abs(t.a))}}{${inner}}${kTex(t.k)}`;
  return `${coefTex(t.a)}${BASES[base].tex(inner)}${kTex(t.k)}`;
}

/** Right side of the transformed base function as typed. */
export function baseRhsText(base: BaseId, t: Tf): string {
  const inner = innerText(t.b, t.h);
  if (base === 'recip') return `${tt(t.a)}/(${inner})${kText(t.k)}`;
  return `${coefText(t.a)}${BASES[base].text(inner)}${kText(t.k)}`;
}

export const tfFn = (base: BaseId, t: Tf): Fn => (x) => t.a * BASES[base].f(t.b * (x - t.h)) + t.k;

/** A note on typing absolute value bars. */
const absNote = (base: BaseId) => (base === 'abs' ? ' Type abs( ) for absolute value bars.' : '');

/**
 * An expression answer that the grader can check. Variables are sampled at positive values by default;
 * a radical whose domain misses those values is checked at mixed-sign values instead.
 */
export function exprPart(expected: string, extra: Omit<Part, 'answer'> = {}, form?: ExprForm): Part {
  for (const positiveVars of [true, false]) {
    const answer: AnswerSpec = { kind: 'expression', expected, positiveVars, ...(form && { form }) };
    if (gradePart(answer, expected).correct) return { answer, ...extra };
  }
  return { answer: { kind: 'expression', expected, positiveVars: false, ...(form && { form }) }, ...extra };
}

// ---------------------------------------------------------------------------
// Polynomials (ascending coefficients)
// ---------------------------------------------------------------------------

export function polyTex(asc: number[], v = 'x'): string {
  let out = '';
  for (let i = asc.length - 1; i >= 0; i--) {
    const c = cl(asc[i]);
    if (c === 0) continue;
    const body = i === 0 ? '' : i === 1 ? v : `${v}^${i}`;
    const k = body && Math.abs(c) === 1 ? '' : tn(Math.abs(c));
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}

export function polyText(asc: number[], v = 'x'): string {
  let out = '';
  for (let i = asc.length - 1; i >= 0; i--) {
    const c = cl(asc[i]);
    if (c === 0) continue;
    const body = i === 0 ? '' : i === 1 ? v : `${v}^${i}`;
    const k = body && Math.abs(c) === 1 ? '' : tt(Math.abs(c));
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}

export const polyEval = (asc: number[], x: number) => asc.reduce((s, c, i) => s + c * x ** i, 0);

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

const r3 = (v: number) => Math.round(v * 1000) / 1000 + 0;

/**
 * Sample y = f(x) across the grid and clip it to the window. f may return NaN outside its domain;
 * the curve is split at gaps and at `breaks` (vertical asymptotes) and never drawn across them.
 */
export function sampleCurve(f: Fn, g: GridSpec, opts: { breaks?: number[]; extra?: number[]; n?: number } = {}): Pt[][] {
  const n = opts.n ?? 240;
  const raw: number[] = [];
  for (let i = 0; i <= n; i++) raw.push(g.xMin + ((g.xMax - g.xMin) * i) / n);
  for (const e of opts.extra ?? []) if (e >= g.xMin && e <= g.xMax) raw.push(e);
  const breaks = opts.breaks ?? [];
  const xs = raw.filter((x) => !breaks.some((b) => Math.abs(x - b) < 1e-9)).sort((p, q) => p - q);
  const uniq = xs.filter((x, i) => i === 0 || x - xs[i - 1] > 1e-9);
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const pieces: Pt[][] = [];
  let cur: Pt[] = [];
  const flush = () => {
    if (cur.length > 1) pieces.push(cur);
    cur = [];
  };
  for (let i = 0; i < uniq.length; i++) {
    const x = uniq[i];
    const y = f(x);
    if (i > 0) {
      const px = uniq[i - 1];
      const py = f(px);
      if (breaks.some((b) => b > px && b < x)) flush();
      else if (inside(py) !== inside(y)) {
        const out = inside(py) ? y : py;
        if (Number.isFinite(out)) {
          const level = out > g.yMax ? g.yMax : g.yMin;
          let lo = px;
          let hi = x;
          const startIn = inside(py);
          for (let it = 0; it < 60; it++) {
            const mid = (lo + hi) / 2;
            if (inside(f(mid)) === startIn) lo = mid;
            else hi = mid;
          }
          const cx = r3((lo + hi) / 2);
          if (startIn) {
            cur.push([cx, level]);
            flush();
          } else cur = [[cx, level]];
        } else if (inside(py)) flush();
      }
    }
    if (inside(y)) cur.push([r3(x), r3(y)]);
  }
  flush();
  return pieces;
}

/** Extra sample points that hug the endpoint of a square-root curve, where it is steepest. */
export function endpointExtras(x0: number, dir: 1 | -1, span = 3): number[] {
  const out = [x0];
  for (let i = 1; i <= 30; i++) out.push(x0 + dir * span * (i / 30) ** 2);
  return out;
}

export type CurveSpec = { f: Fn; color?: 'brand' | 'accent' | 'muted'; breaks?: number[]; extra?: number[] };

export function curveFig(grid: GridSpec, curves: CurveSpec[], extra: Partial<Omit<PlaneFigure, 'type' | 'grid'>> = {}): PlaneFigure {
  return {
    type: 'plane',
    grid,
    polylines: curves.flatMap((c) => sampleCurve(c.f, grid, { breaks: c.breaks, extra: c.extra }).map((points) => ({ points, color: c.color ?? 'brand' }))),
    ...extra,
  };
}

/** Sample points for a transformed base function (dense near a square-root endpoint or vertex). */
function baseExtras(base: BaseId, t: Tf): number[] {
  if (base === 'sqrt') return endpointExtras(t.h, t.b > 0 ? 1 : -1, 3 / Math.abs(t.b));
  return [t.h];
}

export function baseCurve(base: BaseId, t: Tf, color: 'brand' | 'muted' = 'brand'): CurveSpec {
  return { f: tfFn(base, t), color, breaks: base === 'recip' ? [t.h] : undefined, extra: baseExtras(base, t) };
}

export const GRID8: GridSpec = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };
export const GRID6: GridSpec = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };

/** Points for a piecewise-linear graph, drawn with its key points. */
function pwlFig(grid: GridSpec, sets: Array<{ pts: Pt[]; color: 'brand' | 'muted'; dots?: boolean }>, extra: Partial<Omit<PlaneFigure, 'type' | 'grid'>> = {}): PlaneFigure {
  const points: PlanePoint[] = [];
  for (const s of sets) if (s.dots !== false) for (const [x, y] of s.pts) points.push({ x, y, color: s.color });
  return {
    type: 'plane',
    grid,
    polylines: sets.map((s) => ({ points: s.pts.map(([x, y]) => [x, y] as Pt), color: s.color })),
    ...(points.length && { points }),
    ...extra,
  };
}

/** A random piecewise-linear function through n lattice points with distinct x and a real corner at each interior point. */
function pwl(rng: Rng, n: number, xr: [number, number], yr: [number, number]): Pt[] {
  return retry(
    () => {
      const pool: number[] = [];
      for (let x = xr[0]; x <= xr[1]; x++) pool.push(x);
      const xs = rng.sample(pool, n).sort((p, q) => p - q);
      return xs.map((x) => [x, rng.int(yr[0], yr[1])] as Pt);
    },
    (pts) => {
      for (let i = 1; i < pts.length; i++) if (pts[i][0] - pts[i - 1][0] > 4) return false;
      if (pts[pts.length - 1][0] - pts[0][0] < Math.min(6, xr[1] - xr[0] - 2)) return false;
      for (let i = 1; i < pts.length - 1; i++) {
        const s1 = (pts[i][1] - pts[i - 1][1]) / (pts[i][0] - pts[i - 1][0]);
        const s2 = (pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]);
        if (Math.abs(s1 - s2) < 1e-9) return false;
      }
      return new Set(pts.map((p) => p[1])).size >= 3;
    },
    200,
  );
}

const yLine = { line: { A: 1, B: -1, C: 0 }, dashed: true, color: 'muted' as const };

// ---------------------------------------------------------------------------
// Domain and range notation
// ---------------------------------------------------------------------------

export type Iv = { kind: 'all' } | { kind: 'ge' | 'le'; a: number } | { kind: 'between' | 'outside'; a: number; b: number };

export function ivTex(v: string, iv: Iv, notation: 'set' | 'interval'): string {
  const R = `${v} \\in \\mathbb{R}`;
  if (notation === 'set') {
    switch (iv.kind) {
      case 'all':
        return `\\{${v} \\mid ${R}\\}`;
      case 'ge':
        return `\\{${v} \\mid ${v} \\ge ${tn(iv.a)},\\ ${R}\\}`;
      case 'le':
        return `\\{${v} \\mid ${v} \\le ${tn(iv.a)},\\ ${R}\\}`;
      case 'between':
        return `\\{${v} \\mid ${tn(iv.a)} \\le ${v} \\le ${tn(iv.b)},\\ ${R}\\}`;
      case 'outside':
        return `\\{${v} \\mid ${v} \\le ${tn(iv.a)} \\text{ or } ${v} \\ge ${tn(iv.b)},\\ ${R}\\}`;
    }
  }
  switch (iv.kind) {
    case 'all':
      return '(-\\infty, \\infty)';
    case 'ge':
      return `[${tn(iv.a)}, \\infty)`;
    case 'le':
      return `(-\\infty, ${tn(iv.a)}]`;
    case 'between':
      return `[${tn(iv.a)}, ${tn(iv.b)}]`;
    case 'outside':
      return `(-\\infty, ${tn(iv.a)}] \\cup [${tn(iv.b)}, \\infty)`;
  }
}

const between = (p: number, q: number): Iv => ({ kind: 'between', a: Math.min(p, q), b: Math.max(p, q) });

/** "Domain: ...; range: ..." as a choice. */
function drChoice(dom: Iv, rng: Iv, notation: 'set' | 'interval'): string {
  return `Domain: $${ivTex('x', dom, notation)}$; range: $${ivTex('y', rng, notation)}$`;
}

// ---------------------------------------------------------------------------
// 1.1 — Translations
// ---------------------------------------------------------------------------

const translate = skill({
  id: 'm301-translate',
  name: 'Translations of functions',
  description: 'Find image points and write equations for graphs translated horizontally and vertically, using y − k = f(x − h).',
  outcomes: ['RF2'],
  lessonId: 'm301-1-1',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['pointWords', 'pointEq'] as const) : d === 2 ? rng.pick(['equation', 'describe', 'mapping'] as const) : rng.pick(['fromGraph', 'domainRange', 'polyExpand'] as const);
    const hintRule = 'In $y - k = f(x - h)$, $h$ is the horizontal translation (right when $h > 0$) and $k$ is the vertical translation (up when $k > 0$).';

    if (kind === 'pointWords' || kind === 'pointEq') {
      const x0 = rng.int(-8, 8);
      const y0 = rng.int(-8, 8);
      const h = rng.nonZero(-7, 7);
      const k = kind === 'pointWords' && rng.chance(0.2) ? 0 : rng.nonZero(-7, 7);
      const t: Tf = { a: 1, b: 1, h, k };
      const [X, Y] = mapPt([x0, y0], t);
      const form = rng.pick(['std', 'ab'] as const);
      const prompt =
        kind === 'pointWords'
          ? `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. The graph is translated ${translationWords(h, k)}. What are the coordinates of the image point?`
          : `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. What is the corresponding image point on the graph of $${fEqTex(t, form)}$?`;
      const solution =
        kind === 'pointWords'
          ? [`A translation of ${translationWords(h, k)} adds $${tn(h)}$ to each $x$-coordinate${k === 0 ? '' : ` and $${tn(k)}$ to each $y$-coordinate`}.`]
          : [`Compare with $y - k = f(x - h)$: $h = ${tn(h)}$ and $k = ${tn(k)}$, a translation of ${translationWords(h, k)}.`];
      solution.push(`Mapping: $${mappingTex(t)}$`, `$${ptTex(x0, y0)} \\to (${tn(x0)} ${pmTex(h)},\\ ${tn(y0)} ${pmTex(k)}) = ${ptTex(X, Y)}$`, `The image point is $${ptTex(X, Y)}$.`);
      return {
        prompt,
        parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
        hints: [kind === 'pointWords' ? 'A horizontal translation changes only the $x$-coordinate; a vertical translation changes only the $y$-coordinate.' : hintRule, 'Right and up add; left and down subtract.'],
        solution,
      };
    }

    if (kind === 'equation') {
      const base = rng.pick(['sq', 'abs', 'sqrt', 'cube', 'recip'] as BaseId[]);
      const h = base === 'sqrt' ? rng.pick([-6, -5, -4, -3, -2, -1, 1, 2]) : rng.nonZero(-6, 6);
      const k = rng.nonZero(-6, 6);
      const t: Tf = { a: 1, b: 1, h, k };
      const rhs = baseRhsTex(base, t);
      return {
        prompt: `The graph of $y = ${BASES[base].eq}$ is translated ${translationWords(h, k)}. Write the equation of the image graph.${absNote(base)}`,
        parts: [exprPart(baseRhsText(base, t), { label: '$y =$', placeholder: BASES[base].placeholder })],
        hints: [hintRule, `Replace $x$ with $x - h$ and add $k$: $y = f(x - h) + k$. Watch the sign of $h$.`],
        solution: [
          `A translation of ${translationWords(h, k)} means $h = ${tn(h)}$ and $k = ${tn(k)}$.`,
          `Replace $x$ with $${xh(h)}$ and $y$ with $${xh(k, 'y')}$: $${xh(k, 'y')} = ${BASES[base].tex(xh(h))}$.`,
          `The equation is $y = ${rhs}$.`,
        ],
        answerDisplay: `$y = ${rhs}$`,
      };
    }

    if (kind === 'describe' || kind === 'mapping') {
      const h = rng.nonZero(-9, 9);
      const k = rng.nonZero(-9, 9);
      const t: Tf = { a: 1, b: 1, h, k };
      const eq = fEqTex(t, rng.pick(['std', 'ab'] as const));
      const flips: Array<[number, number]> = [
        [-h, k],
        [h, -k],
        [-h, -k],
      ];
      if (kind === 'describe') {
        const correct = cap(`a translation of ${translationWords(h, k)}`);
        return {
          prompt: `How does the graph of $${eq}$ compare with the graph of $y = f(x)$?`,
          parts: [part(mc(rng, correct, flips.map(([p, q]) => cap(`a translation of ${translationWords(p, q)}`))))],
          hints: [hintRule, `Rewrite the equation as $y - k = f(x - h)$ and read $h$ and $k$, including their signs.`],
          solution: [`Written as $y - k = f(x - h)$, the equation is $${fEqTex(t, 'ab')}$.`, `So $h = ${tn(h)}$ and $k = ${tn(k)}$.`, `The graph is translated ${translationWords(h, k)}.`],
        };
      }
      const mapText = (p: number, q: number) => `$${mappingTex({ a: 1, b: 1, h: p, k: q })}$`;
      return {
        prompt: `Which mapping takes each point on the graph of $y = f(x)$ to the corresponding point on the graph of $${eq}$?`,
        parts: [part(mc(rng, mapText(h, k), flips.map(([p, q]) => mapText(p, q))))],
        hints: [hintRule, 'The image of $(x, y)$ is $(x + h, y + k)$.'],
        solution: [`Compare with $y - k = f(x - h)$: $h = ${tn(h)}$ and $k = ${tn(k)}$.`, `Each point moves ${translationWords(h, k)}.`, `The mapping is $${mappingTex(t)}$.`],
      };
    }

    if (kind === 'fromGraph') {
      const f = pwl(rng, 4, [-4, 4], [-3, 3]);
      const h = rng.nonZero(-4, 4);
      const k = rng.nonZero(-4, 4);
      const t: Tf = { a: 1, b: 1, h, k };
      const img = f.map((p) => mapPt(p, t));
      const i = rng.int(0, 3);
      return {
        prompt: 'The graph of $y = f(x)$ is shown in grey. The coloured graph is its image after a translation. Write the equation of the image in the form $y - k = f(x - h)$ by finding $h$ and $k$.',
        figure: pwlFig(GRID8, [
          { pts: f, color: 'muted' },
          { pts: img, color: 'brand' },
        ]),
        parts: [numPart(h, { label: '$h =$' }), numPart(k, { label: '$k =$' })],
        hints: ['Match a corner of the grey graph with the corresponding corner of the coloured graph.', '$h$ is the change in $x$ (right is positive) and $k$ is the change in $y$ (up is positive).'],
        solution: [
          `The point $${ptTex(...f[i])}$ on $y = f(x)$ moves to $${ptTex(...img[i])}$.`,
          `$h = ${tn(img[i][0])} - ${par(f[i][0])} = ${tn(h)}$ and $k = ${tn(img[i][1])} - ${par(f[i][1])} = ${tn(k)}$.`,
          `The image is $${fEqTex(t, 'ab')}$, so $h = ${tn(h)}$ and $k = ${tn(k)}$.`,
        ],
      };
    }

    if (kind === 'domainRange') {
      const p = rng.int(-6, 0);
      const q = p + rng.int(3, 8);
      const r = rng.int(-5, 1);
      const s = r + rng.int(2, 7);
      const h = rng.nonZero(-6, 6);
      const k = rng.intExcept(-6, 6, [0, h, -h]);
      const t: Tf = { a: 1, b: 1, h, k };
      const notation = rng.pick(['set', 'interval'] as const);
      const dr = (hh: number, kk: number) => drChoice(between(p + hh, q + hh), between(r + kk, s + kk), notation);
      return {
        prompt: `The function $y = f(x)$ has domain $${ivTex('x', between(p, q), notation)}$ and range $${ivTex('y', between(r, s), notation)}$. What are the domain and range of $${fEqTex(t, rng.pick(['std', 'ab'] as const))}$?`,
        parts: [part(mc(rng, dr(h, k), [dr(-h, k), dr(h, -k), dr(-h, -k), dr(k, h)]))],
        hints: [hintRule, 'A horizontal translation shifts the domain by $h$; a vertical translation shifts the range by $k$.'],
        solution: [
          `Here $h = ${tn(h)}$ and $k = ${tn(k)}$: the graph moves ${translationWords(h, k)}.`,
          `Domain: add $${tn(h)}$ to each endpoint: $${tn(p)} ${pmTex(h)} = ${tn(p + h)}$ and $${tn(q)} ${pmTex(h)} = ${tn(q + h)}$.`,
          `Range: add $${tn(k)}$ to each endpoint: $${tn(r)} ${pmTex(k)} = ${tn(r + k)}$ and $${tn(s)} ${pmTex(k)} = ${tn(s + k)}$.`,
          `${dr(h, k)}.`,
        ],
      };
    }

    // polyExpand: substitute x - h into a quadratic and add k.
    const pa = rng.pick([1, 1, 2, -1]);
    const pb = rng.int(-5, 5);
    const pc = rng.int(-6, 6);
    const h = rng.nonZero(-4, 4);
    const k = rng.nonZero(-6, 6);
    const res = [pa * h * h - pb * h + pc + k, -2 * pa * h + pb, pa];
    const fx = polyTex([pc, pb, pa]);
    const t: Tf = { a: 1, b: 1, h, k };
    const sq = `(${xh(h)})^2`;
    const sub = `${coefTex(pa)}${sq}${pb === 0 ? '' : ` ${pb < 0 ? '-' : '+'} ${Math.abs(pb) === 1 ? '' : Math.abs(pb)}(${xh(h)})`}${kTex(pc)}${kTex(k)}`;
    return {
      prompt: `Given $f(x) = ${fx}$, write the equation of $${fEqTex(t, rng.pick(['std', 'ab'] as const))}$ in the form $y = ax^2 + bx + c$.`,
      parts: [exprPart(polyText(res), { label: '$y =$', placeholder: 'e.g. x^2 - 4x + 7' }, 'expanded')],
      hints: ['Write the equation as $y = f(x - h) + k$, then replace every $x$ in $f(x)$ with $(x - h)$.', 'Expand, collect like terms, and add $k$ at the end.'],
      solution: [
        `In the form $y = f(x - h) + k$: $h = ${tn(h)}$ and $k = ${tn(k)}$, so $y = f(${xh(h)}) ${pmTex(k)}$.`,
        `Substitute: $y = ${sub}$`,
        `Expand: $(${xh(h)})^2 = ${polyTex([h * h, -2 * h, 1])}$${pb === 0 ? '' : ` and $${coefTex(pb)}(${xh(h)}) = ${polyTex([-pb * h, pb])}$`}.`,
        `$y = (${polyTex([pa * h * h, -2 * pa * h, pa])})${pb === 0 ? '' : ` + (${polyTex([-pb * h, pb])})`}${kTex(pc)}${kTex(k)}$`,
        `Collect like terms: $y = ${polyTex(res)}$.`,
      ],
      answerDisplay: `$y = ${polyTex(res)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// 1.2 — Reflections and stretches
// ---------------------------------------------------------------------------

/** A quadratic with two distinct integer x-intercepts, as ascending coefficients. */
function quadWithRoots(rng: Rng, lead = 1): { roots: [number, number]; asc: number[] } {
  const r1 = rng.intExcept(-6, 5, [0]);
  const r2 = rng.intExcept(r1 + 1, 7, [0, -r1]);
  return { roots: [r1, r2], asc: [lead * r1 * r2, -lead * (r1 + r2), lead] };
}

const reflect = skill({
  id: 'm301-reflect',
  name: 'Reflections of functions',
  description: 'Reflect graphs and equations in the x-axis (y = −f(x)) and the y-axis (y = f(−x)), and identify invariant points.',
  outcomes: ['RF5'],
  lessonId: 'm301-1-2',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['point', 'whichEq'] as const) : d === 2 ? rng.pick(['equation', 'invariantX', 'invariantY'] as const) : rng.pick(['graphMatch', 'identify', 'domainRange'] as const);
    const hintRule = '$y = -f(x)$ reflects the graph in the $x$-axis: $(x, y) \\to (x, -y)$. $y = f(-x)$ reflects it in the $y$-axis: $(x, y) \\to (-x, y)$.';
    const axis = rng.pick(['x', 'y'] as const);
    const eqOf = axis === 'x' ? 'y = -f(x)' : 'y = f(-x)';

    if (kind === 'point') {
      const x0 = rng.nonZero(-9, 9);
      const y0 = rng.nonZero(-9, 9);
      const [X, Y] = axis === 'x' ? [x0, -y0] : [-x0, y0];
      const words = rng.chance(0.5);
      return {
        prompt: words
          ? `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. The graph is reflected in the $${axis}$-axis. What is the image point?`
          : `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $${eqOf}$?`,
        parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
        hints: [hintRule, axis === 'x' ? 'A reflection in the $x$-axis changes the sign of the $y$-coordinate only.' : 'A reflection in the $y$-axis changes the sign of the $x$-coordinate only.'],
        solution: [
          words ? `A reflection in the $${axis}$-axis is $${eqOf}$.` : `$${eqOf}$ is a reflection in the $${axis}$-axis.`,
          axis === 'x' ? 'Mapping: $(x, y) \\to (x, -y)$' : 'Mapping: $(x, y) \\to (-x, y)$',
          `$${ptTex(x0, y0)} \\to ${ptTex(X, Y)}$. The image point is $${ptTex(X, Y)}$.`,
        ],
      };
    }

    if (kind === 'whichEq') {
      const m = rng.pick([2, 3, 4, 5, -2, -3, -4]);
      const c = rng.nonZero(-9, 9);
      const correct = axis === 'x' ? [-c, -m] : [c, -m];
      const options = [
        [-c, -m],
        [c, -m],
        [-c, m],
        [c, m],
      ];
      const fmtEq = (asc: number[]) => `$y = ${polyTex(asc)}$`;
      return {
        prompt: `The graph of $f(x) = ${polyTex([c, m])}$ is reflected in the $${axis}$-axis. Which is the equation of the image?`,
        parts: [part(mc(rng, fmtEq(correct), options.filter((o) => o[0] !== correct[0] || o[1] !== correct[1]).map(fmtEq)))],
        hints: [hintRule, axis === 'x' ? 'Multiply the whole expression $f(x)$ by $-1$.' : 'Replace every $x$ in $f(x)$ with $-x$.'],
        solution:
          axis === 'x'
            ? [`A reflection in the $x$-axis is $y = -f(x)$.`, `$y = -(${polyTex([c, m])})$`, `$y = ${polyTex(correct)}$`]
            : [`A reflection in the $y$-axis is $y = f(-x)$.`, `$y = ${m}(-x) ${pmTex(c)}$`, `$y = ${polyTex(correct)}$`],
      };
    }

    if (kind === 'equation') {
      const deg = rng.pick([2, 3]);
      const asc = deg === 2 ? [rng.int(-9, 9), rng.nonZero(-6, 6), rng.pick([1, 2, 3, -1, -2])] : [rng.int(-6, 6), rng.int(-5, 5), rng.nonZero(-4, 4), rng.pick([1, 2, -1])];
      const res = axis === 'x' ? asc.map((c) => -c) : asc.map((c, i) => (i % 2 ? -c : c));
      return {
        prompt: `Given $f(x) = ${polyTex(asc)}$, write the equation of $${eqOf}$ in expanded form.`,
        parts: [exprPart(polyText(res), { label: '$y =$', placeholder: 'e.g. -2x^2 + 3x - 1' }, 'expanded')],
        hints: [hintRule, axis === 'x' ? 'Multiply every term of $f(x)$ by $-1$.' : 'Replace $x$ with $-x$. Odd powers of $-x$ are negative; even powers are positive.'],
        solution:
          axis === 'x'
            ? [`$y = -f(x) = -(${polyTex(asc)})$`, 'Change the sign of every term.', `$y = ${polyTex(res)}$`]
            : [
                `$y = f(-x)$: replace each $x$ with $(-x)$.`,
                `$(-x)^2 = x^2$${deg === 3 ? ' and $(-x)^3 = -x^3$' : ''}, while $-x$ changes sign.`,
                `$y = ${polyTex(res)}$`,
              ],
        answerDisplay: `$y = ${polyTex(res)}$`,
      };
    }

    if (kind === 'invariantX') {
      const lin = rng.chance(0.35);
      if (lin) {
        const m = rng.pick([1, 2, 3, -1, -2, -3]);
        const r = rng.nonZero(-6, 6);
        const asc = [-m * r, m];
        return {
          prompt: `The graph of $f(x) = ${polyTex(asc)}$ is reflected in the $x$-axis. What is the invariant point?`,
          parts: [part({ kind: 'point', x: r, y: 0 }, { label: 'Invariant point:', placeholder: '(x, y)' })],
          hints: ['An invariant point does not move. A reflection in the $x$-axis leaves points with $y = 0$ unchanged.', 'Find the $x$-intercept of $y = f(x)$.'],
          solution: [`Points on the $x$-axis stay where they are when $(x, y) \\to (x, -y)$, because $-0 = 0$.`, `$${polyTex(asc)} = 0$ gives $x = ${r}$.`, `The invariant point is $(${r}, 0)$.`],
        };
      }
      const { roots, asc } = quadWithRoots(rng, rng.pick([1, 1, -1, 2]));
      return {
        prompt: `The graph of $f(x) = ${polyTex(asc)}$ is reflected in the $x$-axis. Find the invariant points. Enter the point with the smaller $x$-coordinate first.`,
        parts: roots.map((r, i) => part({ kind: 'point', x: r, y: 0 }, { label: i === 0 ? 'First point:' : 'Second point:', placeholder: '(x, y)' })),
        hints: ['A reflection in the $x$-axis leaves points with $y = 0$ unchanged.', 'Factor $f(x)$ to find its $x$-intercepts.'],
        solution: [
          'Points on the $x$-axis are invariant under $(x, y) \\to (x, -y)$.',
          `$${polyTex(asc)} = ${coefTex(asc[2])}(${xh(roots[0])})(${xh(roots[1])}) = 0$ gives $x = ${roots[0]}$ or $x = ${roots[1]}$.`,
          `The invariant points are $(${roots[0]}, 0)$ and $(${roots[1]}, 0)$.`,
        ],
      };
    }

    if (kind === 'invariantY') {
      const asc = rng.chance(0.5) ? [rng.nonZero(-9, 9), rng.nonZero(-6, 6), rng.pick([1, 2, -1, 3])] : [rng.nonZero(-9, 9), rng.nonZero(-5, 5), rng.int(-3, 3), rng.pick([1, -1, 2])];
      return {
        prompt: `The graph of $f(x) = ${polyTex(asc)}$ is reflected in the $y$-axis. What is the invariant point?`,
        parts: [part({ kind: 'point', x: 0, y: asc[0] }, { label: 'Invariant point:', placeholder: '(x, y)' })],
        hints: ['A reflection in the $y$-axis leaves points with $x = 0$ unchanged.', 'Find the $y$-intercept: evaluate $f(0)$.'],
        solution: ['Under $(x, y) \\to (-x, y)$, a point stays put only when $x = 0$, so the invariant point is on the $y$-axis.', `$f(0) = ${asc[0]}$`, `The invariant point is $(0, ${asc[0]})$.`],
      };
    }

    const toX = (pts: Pt[]) => pts.map(([x, y]) => [x, -y + 0] as Pt);
    const toY = (pts: Pt[]) => pts.map(([x, y]) => [-x + 0, y] as Pt).reverse();
    const both = (pts: Pt[]) => toX(toY(pts));
    const swap = (pts: Pt[]) => pts.map(([x, y]) => [y, x] as Pt);
    const setKey = (pts: Pt[]) => JSON.stringify(pts.map(([x, y]) => `${x},${y}`).sort());
    // A graph whose reflections are all different from each other and from the graph itself.
    const f = retry(
      () => pwl(rng, 4, [-5, 5], [-4, 4]),
      (g) => new Set([g, toX(g), toY(g), both(g), swap(g)].map(setKey)).size === 5,
    );

    if (kind === 'graphMatch') {
      const fig = (pts: Pt[]) => pwlFig(GRID6, [{ pts: f, color: 'muted', dots: false }, { pts, color: 'brand', dots: false }]);
      const want = axis === 'x' ? toX(f) : toY(f);
      const others = [axis === 'x' ? toY(f) : toX(f), both(f), swap(f)];
      const opts = [{ md: '', figure: fig(want), correct: true }, ...others.map((p) => ({ md: '', figure: fig(p) }))];
      const img1: Pt = axis === 'x' ? [f[1][0], -f[1][1] + 0] : [-f[1][0] + 0, f[1][1]];
      return {
        prompt: `The graph of $y = f(x)$ is shown. Which graph shows $${eqOf}$? (Each choice also shows $y = f(x)$ in grey.)`,
        figure: pwlFig(GRID6, [{ pts: f, color: 'brand' }]),
        parts: [part(mcFigures(rng, opts))],
        hints: [hintRule, `Follow one corner point, such as $${ptTex(...f[1])}$, to its image $${ptTex(...img1)}$.`],
        solution: [
          `$${eqOf}$ is a reflection in the $${axis}$-axis: $${axis === 'x' ? '(x, y) \\to (x, -y)' : '(x, y) \\to (-x, y)'}$.`,
          `The key points ${f.map((p) => `$${ptTex(...p)}$`).join(', ')} map to ${(axis === 'x' ? toX(f) : f.map(([x, y]) => [-x + 0, y] as Pt)).map((p) => `$${ptTex(...p)}$`).join(', ')}.`,
          `The correct graph is the mirror image of $y = f(x)$ in the $${axis}$-axis.`,
        ],
      };
    }

    if (kind === 'identify') {
      const which = rng.pick(['x', 'y', 'both'] as const);
      const img = which === 'x' ? toX(f) : which === 'y' ? toY(f) : both(f);
      const eqs = { x: '$y = -f(x)$', y: '$y = f(-x)$', both: '$y = -f(-x)$' };
      const j = Math.max(0, f.findIndex((p) => p[0] !== 0 && p[1] !== 0));
      return {
        prompt: 'The graph of $y = f(x)$ is shown in grey. Which equation describes the coloured graph?',
        figure: pwlFig(GRID6, [
          { pts: f, color: 'muted' },
          { pts: img, color: 'brand' },
        ]),
        parts: [part(mc(rng, eqs[which], [...Object.values(eqs).filter((e) => e !== eqs[which]), '$x = f(y)$']))],
        hints: [hintRule, 'Compare one corner point with its image. Which coordinates changed sign?'],
        solution: [
          `The point $${ptTex(...f[j])}$ corresponds to $${ptTex(f[j][0] * (which === 'x' ? 1 : -1) + 0, f[j][1] * (which === 'y' ? 1 : -1) + 0)}$.`,
          which === 'x' ? 'Only the $y$-coordinates change sign: a reflection in the $x$-axis.' : which === 'y' ? 'Only the $x$-coordinates change sign: a reflection in the $y$-axis.' : 'Both coordinates change sign: a reflection in the $x$-axis and in the $y$-axis.',
          `The coloured graph is ${eqs[which]}.`,
        ],
      };
    }

    // domainRange
    const p = rng.int(-7, -1);
    const q = rng.int(1, 8);
    const r = rng.int(-6, 2);
    const s = r + rng.int(2, 8);
    const notation = rng.pick(['set', 'interval'] as const);
    const dr = (dom: Iv, rg: Iv) => drChoice(dom, rg, notation);
    const D = between(p, q);
    const Rg = between(r, s);
    const Dn = between(-q, -p);
    const Rn = between(-s, -r);
    const correct = axis === 'x' ? dr(D, Rn) : dr(Dn, Rg);
    const wrong = axis === 'x' ? [dr(Dn, Rg), dr(Dn, Rn), dr(D, Rg)] : [dr(D, Rn), dr(Dn, Rn), dr(D, Rg)];
    return {
      prompt: `The function $y = f(x)$ has domain $${ivTex('x', D, notation)}$ and range $${ivTex('y', Rg, notation)}$. What are the domain and range of $${eqOf}$?`,
      parts: [part(mc(rng, correct, wrong))],
      hints: [hintRule, axis === 'x' ? 'Only the $y$-values change, so only the range changes.' : 'Only the $x$-values change, so only the domain changes.'],
      solution:
        axis === 'x'
          ? [`$${eqOf}$ maps $(x, y) \\to (x, -y)$, so the domain is unchanged.`, `The $y$-values $${tn(r)}$ to $${tn(s)}$ become $${tn(-s)}$ to $${tn(-r)}$ (write the smaller one first).`, `${correct}.`]
          : [`$${eqOf}$ maps $(x, y) \\to (-x, y)$, so the range is unchanged.`, `The $x$-values $${tn(p)}$ to $${tn(q)}$ become $${tn(-q)}$ to $${tn(-p)}$ (write the smaller one first).`, `${correct}.`],
    };
  },
});

const stretch = skill({
  id: 'm301-stretch',
  name: 'Stretches of functions',
  description: 'Apply vertical stretches y = af(x) and horizontal stretches y = f(bx) to points, graphs and equations, and identify invariant points.',
  outcomes: ['RF3'],
  lessonId: 'm301-1-2',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['pointV', 'pointH'] as const) : d === 2 ? rng.pick(['describe', 'equation', 'invariant'] as const) : rng.pick(['findFactor', 'graph', 'polyEquation'] as const);
    const hintRule = '$y = af(x)$ is a vertical stretch by a factor of $|a|$: $(x, y) \\to (x, ay)$. $y = f(bx)$ is a horizontal stretch by a factor of $\\frac{1}{|b|}$: $(x, y) \\to \\left(\\frac{x}{b}, y\\right)$.';

    if (kind === 'pointV' || kind === 'pointH') {
      const factor = kind === 'pointV' ? rng.pick([2, 3, 4, 5, 1 / 2, 1 / 3, 1 / 4]) : rng.pick([2, 3, 4, 1 / 2, 1 / 3]);
      const den = Math.round(factor < 1 ? 1 / factor : 1);
      const mult = kind === 'pointV' ? den : Math.round(factor > 1 ? factor : 1);
      const x0 = kind === 'pointH' ? rng.nonZero(-4, 4) * mult : rng.nonZero(-8, 8);
      const y0 = kind === 'pointV' ? rng.nonZero(-4, 4) * mult : rng.nonZero(-8, 8);
      const t: Tf = kind === 'pointV' ? { a: factor, b: 1, h: 0, k: 0 } : { a: 1, b: factor, h: 0, k: 0 };
      const [X, Y] = mapPt([x0, y0], t);
      const words = rng.chance(0.4);
      const desc = kind === 'pointV' ? `stretched vertically by a factor of $${tn(factor)}$ about the $x$-axis` : `stretched horizontally by a factor of $${tn(1 / factor)}$ about the $y$-axis`;
      return {
        prompt: words
          ? `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. The graph is ${desc}. What is the image point?`
          : `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $${fEqTex(t)}$?`,
        parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
        hints: [hintRule, kind === 'pointV' ? 'A vertical stretch multiplies only the $y$-coordinate.' : 'A horizontal stretch changes only the $x$-coordinate: multiply it by the stretch factor $\\frac{1}{b}$.'],
        solution: [
          kind === 'pointV' ? `This is $${fEqTex(t)}$: a vertical stretch by a factor of $${tn(factor)}$.` : `This is $${fEqTex(t)}$: a horizontal stretch by a factor of $\\frac{1}{b} = ${tn(1 / factor)}$.`,
          `Mapping: $${mappingTex(t)}$`,
          `$${ptTex(x0, y0)} \\to ${ptTex(X, Y)}$. The image point is $${ptTex(X, Y)}$.`,
        ],
      };
    }

    if (kind === 'describe') {
      const vertical = rng.chance(0.5);
      const c = rng.pick([2, 3, 4, 5, 1 / 2, 1 / 3, 1 / 4]);
      const t: Tf = vertical ? { a: c, b: 1, h: 0, k: 0 } : { a: 1, b: c, h: 0, k: 0 };
      const v = (f: number) => `A vertical stretch by a factor of $${tn(f)}$ about the $x$-axis`;
      const hz = (f: number) => `A horizontal stretch by a factor of $${tn(f)}$ about the $y$-axis`;
      const correct = vertical ? v(c) : hz(1 / c);
      const wrong = vertical ? [v(1 / c), hz(c), hz(1 / c)] : [hz(c), v(c), v(1 / c)];
      return {
        prompt: `How does the graph of $${fEqTex(t)}$ compare with the graph of $y = f(x)$?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: [hintRule, vertical ? 'The number multiplies the whole function, so it acts on the $y$-values.' : 'The number multiplies $x$ inside the function, so it acts on the $x$-values, by the reciprocal.'],
        solution: vertical
          ? [`$a = ${tn(c)}$ multiplies every $y$-coordinate: $(x, y) \\to (x, ${tn(c)}y)$.`, `${correct}.`]
          : [`$b = ${tn(c)}$, so every $x$-coordinate is multiplied by $\\frac{1}{b} = ${tn(1 / c)}$: $(x, y) \\to (${linTex(1 / c, 0, 'x')}, y)$.`, `${correct}.`],
      };
    }

    if (kind === 'equation') {
      const base = rng.pick(['sq', 'abs', 'sqrt', 'cube'] as BaseId[]);
      const vertical = rng.chance(0.5);
      const c = rng.pick([2, 3, 4, 1 / 2, 1 / 3]);
      const t: Tf = vertical ? { a: c, b: 1, h: 0, k: 0 } : { a: 1, b: 1 / c, h: 0, k: 0 };
      const rhs = baseRhsTex(base, t);
      const desc = vertical ? `stretched vertically by a factor of $${tn(c)}$ about the $x$-axis` : `stretched horizontally by a factor of $${tn(c)}$ about the $y$-axis`;
      return {
        prompt: `The graph of $y = ${BASES[base].eq}$ is ${desc}. Write the equation of the image graph.${absNote(base)}`,
        parts: [exprPart(baseRhsText(base, t), { label: '$y =$', placeholder: BASES[base].placeholder })],
        hints: [hintRule, vertical ? 'A vertical stretch by a factor of $a$ multiplies the whole function by $a$.' : 'A horizontal stretch by a factor of $s$ replaces $x$ with $\\frac{1}{s}x$, so $b$ is the reciprocal of the stretch factor.'],
        solution: vertical
          ? [`A vertical stretch by a factor of $${tn(c)}$ gives $y = ${tn(c)}f(x)$.`, `The equation is $y = ${rhs}$.`]
          : [`A horizontal stretch by a factor of $${tn(c)}$ gives $y = f(bx)$, where $b$ is the reciprocal of the stretch factor: $b = ${tn(1 / c)}$.`, `The equation is $y = ${rhs}$.`],
        answerDisplay: `$y = ${rhs}$`,
      };
    }

    if (kind === 'invariant') {
      const { roots, asc } = quadWithRoots(rng);
      const vertical = rng.chance(0.5);
      const c = rng.pick([2, 3, 4]);
      const t: Tf = vertical ? { a: c, b: 1, h: 0, k: 0 } : { a: 1, b: c, h: 0, k: 0 };
      const xs = `$(${roots[0]}, 0)$ and $(${roots[1]}, 0)$`;
      const yi = `$(0, ${asc[0]})$`;
      const halved = `$${ptTex(roots[0] / c, 0)}$ and $${ptTex(roots[1] / c, 0)}$`;
      const scaledY = `$(0, ${tn(c * asc[0])})$`;
      const correct = vertical ? xs : yi;
      const wrong = vertical ? [yi, `${xs.replace(' and ', ', ')} and ${yi}`, scaledY] : [xs, halved, `${xs.replace(' and ', ', ')} and ${yi}`];
      return {
        prompt: `The graph of $f(x) = ${polyTex(asc)}$ is transformed to $${fEqTex(t)}$. Which point(s) are invariant?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: [hintRule, vertical ? 'A vertical stretch leaves points with $y = 0$ unchanged.' : 'A horizontal stretch leaves points with $x = 0$ unchanged.'],
        solution: vertical
          ? [`$(x, y) \\to (x, ${c}y)$ leaves a point unchanged only when $y = 0$.`, `$f(x) = (${xh(roots[0])})(${xh(roots[1])})$, so the $x$-intercepts are $${roots[0]}$ and $${roots[1]}$.`, `The invariant points are ${xs}.`]
          : [`$(x, y) \\to \\left(\\frac{x}{${c}}, y\\right)$ leaves a point unchanged only when $x = 0$.`, `$f(0) = ${asc[0]}$`, `The invariant point is ${yi}.`],
      };
    }

    if (kind === 'findFactor') {
      const [a, b] = retry(
        () => [rng.pick([1, 2, 3, 4, -2, 1 / 2, -1]), rng.pick([1, 2, 3, 1 / 2, 1 / 3, -1, -2])],
        ([p, q]) => p !== 1 || q !== 1,
      );
      const xm = Math.round(Math.abs(b) >= 1 ? Math.abs(b) : 1);
      const ym = Math.round(Math.abs(a) < 1 ? 1 / Math.abs(a) : 1);
      const x0 = rng.nonZero(-3, 3) * xm;
      const y0 = rng.nonZero(-3, 3) * ym;
      const [X, Y] = mapPt([x0, y0], { a, b, h: 0, k: 0 });
      return {
        prompt: `The point $${ptTex(x0, y0)}$ on the graph of $y = f(x)$ corresponds to the point $${ptTex(X, Y)}$ on the graph of $y = af(bx)$. Find $a$ and $b$.`,
        parts: [numPart(a, { label: '$a =$' }), numPart(b, { label: '$b =$' })],
        hints: ['Under $y = af(bx)$, $(x, y) \\to \\left(\\frac{x}{b}, ay\\right)$.', 'Set up $ay_0 = y_1$ and $\\frac{x_0}{b} = x_1$, then solve each for the unknown.'],
        solution: [
          `$y = af(bx)$ maps $(x, y) \\to \\left(\\frac{x}{b}, ay\\right)$.`,
          `$y$: $a(${tn(y0)}) = ${tn(Y)}$, so $a = ${divTex(Y, y0)}$.`,
          `$x$: $\\dfrac{${tn(x0)}}{b} = ${tn(X)}$, so $b = ${divTex(x0, X)}$.`,
          `So $a = ${tn(a)}$ and $b = ${tn(b)}$${a < 0 || b < 0 ? ' (a negative value also reflects the graph)' : ''}.`,
        ],
      };
    }

    if (kind === 'graph') {
      const f = pwl(rng, 4, [-4, 4], [-3, 3]);
      const opt = rng.pick(['v2', 'h2', 'vh', 'hh'] as const);
      const t: Tf = { v2: { a: 2, b: 1, h: 0, k: 0 }, h2: { a: 1, b: 1 / 2, h: 0, k: 0 }, vh: { a: 1 / 2, b: 1, h: 0, k: 0 }, hh: { a: 1, b: 2, h: 0, k: 0 } }[opt];
      const img = f.map((p) => mapPt(p, t));
      const labels = { v2: '$y = 2f(x)$', h2: '$y = f\\left(\\frac{1}{2}x\\right)$', vh: '$y = \\frac{1}{2}f(x)$', hh: '$y = f(2x)$' };
      const i = f.findIndex((p) => p[0] !== 0 && p[1] !== 0);
      const j = i < 0 ? 0 : i;
      return {
        prompt: 'The graph of $y = f(x)$ is shown in grey. The coloured graph is its image after a stretch. Which equation describes the coloured graph?',
        figure: pwlFig(GRID8, [
          { pts: f, color: 'muted' },
          { pts: img, color: 'brand' },
        ]),
        parts: [part(mc(rng, labels[opt], Object.values(labels).filter((l) => l !== labels[opt])))],
        hints: ['Compare a corner of the grey graph with the matching corner of the coloured graph. Did the $x$-coordinate or the $y$-coordinate change?', hintRule],
        solution: [
          `The point $${ptTex(...f[j])}$ moves to $${ptTex(...img[j])}$.`,
          t.a !== 1
            ? `The $x$-coordinates stay the same and the $y$-coordinates are multiplied by $${tn(t.a)}$: a vertical stretch by a factor of $${tn(t.a)}$.`
            : `The $y$-coordinates stay the same and the $x$-coordinates are multiplied by $${tn(1 / t.b)}$: a horizontal stretch by a factor of $${tn(1 / t.b)}$, so $b = ${tn(t.b)}$.`,
          `The coloured graph is ${labels[opt]}.`,
        ],
      };
    }

    // polyEquation: y = af(bx) for a quadratic f.
    const asc = [rng.int(-6, 6), rng.nonZero(-5, 5), rng.pick([1, -1, 2])];
    const a = rng.pick([1, 2, 3, -1, -2]);
    const b = rng.pick([2, 3, -2]);
    const t: Tf = { a, b, h: 0, k: 0 };
    const inner = asc.map((v, i) => v * b ** i);
    const res = inner.map((v) => v * a);
    return {
      prompt: `Given $f(x) = ${polyTex(asc)}$, write the equation of $${fEqTex(t)}$ in the form $y = ax^2 + bx + c$.`,
      parts: [exprPart(polyText(res), { label: '$y =$', placeholder: 'e.g. 4x^2 - 6x + 1' }, 'expanded')],
      hints: [hintRule, `Replace every $x$ in $f(x)$ with $${tn(b)}x$${a === 1 ? '' : `, then multiply the result by $${tn(a)}$`}.`],
      solution: [
        `$f(${tn(b)}x) = ${coefTex(asc[2])}(${tn(b)}x)^2 ${asc[1] < 0 ? '-' : '+'} ${Math.abs(asc[1]) === 1 ? '' : Math.abs(asc[1])}(${tn(b)}x)${kTex(asc[0])} = ${polyTex(inner)}$`,
        ...(a === 1 ? [] : [`$y = ${coefTex(a) === '-' ? '-' : tn(a)}(${polyTex(inner)})$`]),
        `$y = ${polyTex(res)}$`,
      ],
      answerDisplay: `$y = ${polyTex(res)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// 1.3 — Combining transformations
// ---------------------------------------------------------------------------

/** Random y = af(b(x - h)) + k with friendly values. */
function randomTf(rng: Rng, opts: { as: number[]; bs: number[]; hr?: number; kr?: number }): Tf {
  const hr = opts.hr ?? 6;
  const kr = opts.kr ?? 6;
  return retry(
    () => ({ a: rng.pick(opts.as), b: rng.pick(opts.bs), h: rng.int(-hr, hr), k: rng.int(-kr, kr) }),
    (t) => describeTf(t).length >= 2 && (t.h !== 0 || t.k !== 0),
  );
}

const combined = skill({
  id: 'm301-combined-transform',
  name: 'Combining transformations',
  description: 'Apply y − k = af(b(x − h)) to points, equations and graphs, with stretches and reflections before translations.',
  outcomes: ['RF4', 'RF5'],
  lessonId: 'm301-1-3',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['point', 'order'] as const) : d === 2 ? rng.pick(['pointFull', 'describe', 'equationWords'] as const) : rng.pick(['factorB', 'fromGraph', 'domainRange'] as const);
    const hintRule = 'For $y - k = af(b(x - h))$, the mapping is $(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.';
    const hintOrder = 'Apply stretches and reflections first, then translations.';

    if (kind === 'point' || kind === 'pointFull' || kind === 'factorB') {
      const t =
        kind === 'point'
          ? randomTf(rng, { as: [2, 3, -1, -2, -3], bs: [1] })
          : retry(
              () => randomTf(rng, { as: [1, 2, 3, -1, -2, 1 / 2, -1 / 2], bs: [1, 2, -1, -2, 1 / 2, 3], hr: 5, kr: 6 }),
              (tf) => Math.abs(tf.b) !== 1 || kind === 'pointFull',
            );
      if (kind === 'factorB' && t.h === 0) t.h = rng.nonZero(-5, 5);
      const xm = Math.abs(t.b) >= 1 ? Math.abs(t.b) : 1;
      const ym = Math.abs(t.a) < 1 ? 2 : 1;
      const x0 = rng.int(-4, 4) * xm;
      const y0 = rng.nonZero(-4, 4) * ym;
      const [X, Y] = mapPt([x0, y0], t);
      const form = rng.pick(['std', 'ab'] as const);
      let eq = fEqTex(t, form);
      const steps: string[] = [];
      if (kind === 'factorB') {
        // Write the inside unfactored: b(x - h) = bx - bh.
        const inside = polyTex([-t.b * t.h, t.b]);
        const call = inside.includes('\\frac') ? `f\\left(${inside}\\right)` : `f(${inside})`;
        eq = form === 'ab' && t.k !== 0 ? `y ${t.k > 0 ? '-' : '+'} ${tn(Math.abs(t.k))} = ${coefTex(t.a)}${call}` : `y = ${coefTex(t.a)}${call}${kTex(t.k)}`;
        steps.push(`Factor the inside so $x$ has coefficient $1$: $${inside} = ${innerTex(t.b, t.h)}$.`);
      }
      steps.push(`Compare with $y = af(b(x - h)) + k$: $a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$.`);
      steps.push(`Mapping: $${mappingTex(t)}$`);
      steps.push(`$x$: $${xImgTex(x0, t)}$; $y$: $${yImgTex(y0, t)}$`);
      steps.push(`The image point is $${ptTex(X, Y)}$.`);
      return {
        prompt: `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $${eq}$?`,
        parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
        hints: kind === 'factorB' ? ['First factor the expression inside the brackets so it has the form $b(x - h)$.', hintRule] : [hintRule, hintOrder],
        solution: steps,
      };
    }

    if (kind === 'order') {
      const vertical = rng.chance(0.6);
      if (vertical) {
        const a = rng.pick([2, 3, 4, -2, -3]);
        const k = rng.nonZero(-7, 7);
        const t: Tf = { a, b: 1, h: 0, k };
        const st = (f: number) => (Math.abs(f) === 1 ? '' : `stretch vertically by a factor of $${tn(Math.abs(f))}$ about the $x$-axis`) + (f < 0 ? `${Math.abs(f) === 1 ? '' : ' and '}reflect in the $x$-axis` : '');
        const tr = (kk: number) => `translate ${units(kk)} ${kk > 0 ? 'up' : 'down'}`;
        const correct = `First ${st(a)}, then ${tr(k)}.`;
        const wrong = [`First ${tr(k)}, then ${st(a)}.`, `First ${st(a)}, then ${tr(-k)}.`, `First ${st(1 / a)}, then ${tr(k)}.`];
        return {
          prompt: `Which sequence of transformations maps the graph of $y = f(x)$ onto the graph of $${fEqTex(t)}$?`,
          parts: [part(mc(rng, correct, wrong))],
          hints: [hintOrder, 'Check with a point $(x, y)$: the image $y$-coordinate must be $ay + k$.'],
          solution: [
            `Under $${fEqTex(t)}$, $(x, y) \\to (x, ${tn(a)}y ${pmTex(k)})$: multiply by $${tn(a)}$ first, then ${k > 0 ? 'add' : 'subtract'} $${Math.abs(k)}$.`,
            `Translating first would give $${tn(a)}(y ${pmTex(k)}) = ${tn(a)}y ${pmTex(a * k)}$, which is a different point.`,
            correct,
          ],
        };
      }
      const b = rng.pick([2, 3, 1 / 2, 1 / 3, -2]);
      const h = rng.nonZero(-6, 6);
      const t: Tf = { a: 1, b, h, k: 0 };
      const st = (bb: number) => `stretch horizontally by a factor of $${tn(1 / Math.abs(bb))}$ about the $y$-axis${bb < 0 ? ' and reflect in the $y$-axis' : ''}`;
      const tr = (hh: number) => `translate ${units(hh)} ${hh > 0 ? 'right' : 'left'}`;
      const correct = `First ${st(b)}, then ${tr(h)}.`;
      const wrong = [`First ${tr(h)}, then ${st(b)}.`, `First ${st(b)}, then ${tr(-h)}.`, `First ${st(1 / b)}, then ${tr(h)}.`];
      return {
        prompt: `Which sequence of transformations maps the graph of $y = f(x)$ onto the graph of $${fEqTex(t)}$?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: [hintOrder, 'Check with a point: the image $x$-coordinate must be $\\frac{x}{b} + h$.'],
        solution: [
          `Under $${fEqTex(t)}$, $(x, y) \\to \\left(${linTex(1 / b, h, 'x')},\\ y\\right)$: multiply by $${tn(1 / b)}$ first, then ${h > 0 ? 'add' : 'subtract'} $${Math.abs(h)}$.`,
          `Translating first would give $${tn(1 / b)}(x ${pmTex(h)}) = ${linTex(1 / b, h / b, 'x')}$, which is a different point.`,
          correct,
        ],
      };
    }

    if (kind === 'describe') {
      const t = retry(
        () => randomTf(rng, { as: [1, 2, 3, -1, -2, 1 / 2, -3], bs: [1, 2, 3, -1, -2, 1 / 2, 1 / 3, -1 / 2], hr: 6, kr: 6 }),
        (tf) => describeTf(tf).length >= 3 && tf.h !== 0 && tf.k !== 0,
      );
      const eq = fEqTex(t, rng.pick(['std', 'ab'] as const));
      const correct = cap(joinList(describeTf(t))) + '.';
      const alt: Tf[] = [
        { ...t, h: -t.h },
        { ...t, k: -t.k },
        Math.abs(t.b) !== 1 ? { ...t, b: 1 / t.b } : { ...t, a: -t.a },
        Math.abs(t.a) !== 1 ? { ...t, a: 1 / t.a } : { ...t, b: -t.b },
      ];
      return {
        prompt: `Which describes how the graph of $${eq}$ is obtained from the graph of $y = f(x)$?`,
        parts: [part(mc(rng, correct, alt.map((x) => cap(joinList(describeTf(x))) + '.')))],
        hints: ['Compare with $y - k = af(b(x - h))$ and read $a$, $b$, $h$ and $k$, with their signs.', 'The horizontal stretch factor is $\\frac{1}{|b|}$, not $|b|$. A negative $a$ reflects in the $x$-axis; a negative $b$ reflects in the $y$-axis.'],
        solution: [`Written as $y - k = af(b(x - h))$: $${fEqTex(t, 'ab')}$.`, `$a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$.`, correct],
      };
    }

    if (kind === 'equationWords') {
      const base = rng.pick(['sq', 'abs', 'sqrt', 'cube', 'recip'] as BaseId[]);
      const t = retry(
        () => randomTf(rng, { as: [2, 3, -1, -2, 1 / 2, -3], bs: base === 'sqrt' ? [1, -1, 2, 1 / 2] : base === 'cube' ? [1, 2, 1 / 2] : [1], hr: 5, kr: 6 }),
        (tf) => tf.h !== 0 && tf.k !== 0 && (base !== 'sqrt' || (tf.b > 0 ? tf.h <= 2 : tf.h >= -1)) && (base !== 'recip' || Number.isInteger(tf.a)),
      );
      const rhs = baseRhsTex(base, t);
      return {
        prompt: `The graph of $y = ${BASES[base].eq}$ is transformed by ${joinList(describeTf(t))}. Write the equation of the image graph.${absNote(base)}`,
        parts: [exprPart(baseRhsText(base, t), { label: '$y =$', placeholder: BASES[base].placeholder })],
        hints: ['Use $y = af(b(x - h)) + k$. A vertical stretch factor (with $-$ for a reflection in the $x$-axis) gives $a$; a horizontal stretch factor $s$ gives $b = \\pm\\frac{1}{s}$.', `Here $f(x) = ${BASES[base].eq}$: substitute $b(x - h)$ for $x$.`],
        solution: [`$a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$ and $k = ${tn(t.k)}$.`, `Substitute into $y = af(b(x - h)) + k$ with $f(x) = ${BASES[base].eq}$.`, `$y = ${rhs}$`],
        answerDisplay: `$y = ${rhs}$`,
      };
    }

    if (kind === 'fromGraph') {
      const base = rng.pick(['sq', 'abs', 'sqrt', 'cube'] as BaseId[]);
      const t: Tf = retry(
        () => ({
          a: rng.pick(base === 'cube' ? [2, -2, 1 / 2, -1 / 2, -1] : [2, 3, -1, -2, -3, 1 / 2, -1 / 2]),
          b: base === 'sqrt' ? rng.pick([1, -1]) : 1,
          h: rng.int(-4, 4),
          k: rng.int(-4, 4),
        }),
        (tf) => tf.h !== 0 && (base !== 'sqrt' || (tf.b > 0 ? tf.h <= 2 : tf.h >= -1)) && Math.abs(tf.k + 4 * tf.a) <= 8,
      );
      const F = tfFn(base, t);
      const step = Math.abs(t.a) < 1 ? (base === 'abs' ? 2 : base === 'sq' ? 2 : 2) : 1;
      const xs = base === 'sqrt' ? [t.h, t.h + t.b * (Math.abs(t.a) < 1 ? 4 : 1), t.h + t.b * 4] : [t.h, t.h + step];
      const keys = [...new Set(xs)].map((x) => [x, cl(F(x))] as Pt).filter(([, y]) => Math.abs(y) <= 8);
      const fig = curveFig(GRID8, [{ ...baseCurve(base, { a: 1, b: 1, h: 0, k: 0 }, 'muted') }, baseCurve(base, t)], {
        points: keys.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })),
      });
      const rhs = baseRhsTex(base, t);
      const p1 = keys[1] ?? keys[0];
      return {
        prompt: `The graph of $y = ${BASES[base].eq}$ is shown in grey. The coloured graph is its image after a vertical stretch or reflection and a translation. Write the equation of the coloured graph.${absNote(base)}`,
        figure: fig,
        parts: [exprPart(baseRhsText(base, t), { label: '$y =$', placeholder: BASES[base].placeholder })],
        hints: [
          base === 'sqrt' ? 'The endpoint $(h, k)$ gives the translation. Is the graph reflected in the $y$-axis (does it open to the left)?' : base === 'cube' ? 'The point of inflection (the centre of the curve) is $(h, k)$.' : 'The vertex gives $(h, k)$.',
          `Use another labelled point to find $a$: substitute it into $y = a${BASES[base].tex(base === 'sqrt' && t.b < 0 ? '-(x - h)' : 'x - h')} + k$.`,
        ],
        solution: [
          `The ${base === 'sqrt' ? 'endpoint' : base === 'cube' ? 'centre point' : 'vertex'} moved from $(0, 0)$ to $${ptTex(t.h, t.k)}$, so $h = ${tn(t.h)}$ and $k = ${tn(t.k)}$${base === 'sqrt' && t.b < 0 ? '; the graph opens to the left, so $b = -1$' : ''}.`,
          `Substitute $${ptTex(...p1)}$: $${tn(p1[1])} = a${BASES[base].tex(innerTex(t.b, t.h).replace(/x/, par(p1[0])))} ${pmTex(t.k)} = ${tn(BASES[base].f(t.b * (p1[0] - t.h)))}a ${pmTex(t.k)}$, so $a = ${tn(t.a)}$.`,
          `$y = ${rhs}$`,
        ],
        answerDisplay: `$y = ${rhs}$`,
      };
    }

    // domainRange
    const t = retry(
      () => randomTf(rng, { as: [2, 3, -1, -2, 1 / 2, -1 / 2], bs: [1, 2, -1, -2, 1 / 2, -1 / 2], hr: 5, kr: 5 }),
      (tf) => tf.h !== 0 && tf.k !== 0 && (Math.abs(tf.a) !== 1 || Math.abs(tf.b) !== 1),
    );
    const xm = Math.abs(t.b) >= 1 ? Math.abs(t.b) : 1;
    const ym = Math.abs(t.a) < 1 ? 2 : 1;
    const p = -rng.int(1, 3) * xm;
    const q = rng.int(1, 3) * xm;
    const r = -rng.int(0, 2) * ym;
    const s = rng.int(1, 3) * ym;
    const notation = rng.pick(['set', 'interval'] as const);
    const dom = (tf: Tf) => between(cl(p / tf.b + tf.h), cl(q / tf.b + tf.h));
    const rg = (tf: Tf) => between(cl(tf.a * r + tf.k), cl(tf.a * s + tf.k));
    const correct = drChoice(dom(t), rg(t), notation);
    const wrongs = [
      drChoice(between(cl(p * t.b + t.h), cl(q * t.b + t.h)), rg(t), notation),
      drChoice(dom({ ...t, h: -t.h }), rg(t), notation),
      drChoice(dom(t), between(cl(t.a * (r + t.k)), cl(t.a * (s + t.k))), notation),
      drChoice(dom(t), rg({ ...t, k: -t.k }), notation),
    ];
    return {
      prompt: `The function $y = f(x)$ has domain $${ivTex('x', between(p, q), notation)}$ and range $${ivTex('y', between(r, s), notation)}$. What are the domain and range of $${fEqTex(t, rng.pick(['std', 'ab'] as const))}$?`,
      parts: [part(mc(rng, correct, wrongs))],
      hints: [hintRule, 'Map the endpoints of the domain with $x \\to \\frac{x}{b} + h$ and the endpoints of the range with $y \\to ay + k$. If a reflection reverses them, write the smaller value first.'],
      solution: [
        `$a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$.`,
        `Domain endpoints: $${xImgTex(p, t)}$ and $${xImgTex(q, t)}$.`,
        `Range endpoints: $${yImgTex(r, t)}$ and $${yImgTex(s, t)}$.`,
        `${correct}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.4 — Inverses
// ---------------------------------------------------------------------------

const inverseEquation = skill({
  id: 'm301-inverse-equation',
  name: 'Finding inverse functions algebraically',
  description: 'Find the inverse of a function by interchanging x and y and solving, including restricted quadratics, and evaluate inverses.',
  outcomes: ['RF6'],
  lessonId: 'm301-1-4',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['linear', 'linear', 'point'] as const) : d === 2 ? rng.pick(['linearFrac', 'cubic', 'evalInverse'] as const) : rng.pick(['quadratic', 'quadExpanded', 'sqrtInverse'] as const);
    const hintSwap = 'Write $y = f(x)$, interchange $x$ and $y$, then solve the new equation for $y$.';
    const lab = { label: '$f^{-1}(x) =$' };

    if (kind === 'linear') {
      const m = rng.pick([2, 3, 4, 5, -2, -3, -4, -5]);
      const c = rng.nonZero(-9, 9);
      const shown = polyTex([c, m]);
      const ans = m > 0 ? `\\dfrac{${xh(c)}}{${m}}` : `\\dfrac{${tn(c)} - x}{${-m}}`;
      return {
        prompt: `Find the inverse of $f(x) = ${shown}$.`,
        parts: [exprPart(m > 0 ? `(${xhText(c)})/${m}` : `(${tt(c)} - x)/${-m}`, { ...lab, placeholder: 'e.g. (x - 4)/3' })],
        hints: [hintSwap, 'Undo the operations in reverse order: first undo the addition or subtraction, then the multiplication.'],
        solution: [`$y = ${shown}$`, `Interchange $x$ and $y$: $x = ${polyTex([c, m], 'y')}$`, `$${polyTex([0, m], 'y')} = ${xh(c)}$`, `$y = \\dfrac{${xh(c)}}{${m}}$${m < 0 ? `, or $y = ${ans}$ after multiplying the numerator and denominator by $-1$` : ''}`, `$f^{-1}(x) = ${ans}$`],
        answerDisplay: `$f^{-1}(x) = ${ans}$`,
      };
    }

    if (kind === 'point') {
      const x0 = rng.nonZero(-9, 9);
      const y0 = rng.intExcept(-9, 9, [x0, 0]);
      if (rng.chance(0.5)) {
        return {
          prompt: `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. Which point must be on the graph of $y = f^{-1}(x)$?`,
          parts: [part({ kind: 'point', x: y0, y: x0 }, { label: 'Point:', placeholder: '(x, y)' })],
          hints: ['The inverse undoes $f$, so it interchanges inputs and outputs.', 'Interchange the coordinates: $(x, y) \\to (y, x)$.'],
          solution: [`The inverse interchanges the coordinates: $(x, y) \\to (y, x)$.`, `$${ptTex(x0, y0)} \\to ${ptTex(y0, x0)}$`, `The point $${ptTex(y0, x0)}$ is on the graph of $y = f^{-1}(x)$.`],
        };
      }
      return {
        prompt: `For a one-to-one function $f$, $f(${x0}) = ${y0}$. What is $f^{-1}(${y0})$?`,
        parts: [numPart(x0, { label: `$f^{-1}(${y0}) =$` })],
        hints: ['$f$ takes $' + x0 + '$ to $' + y0 + '$; the inverse goes the other way.', '$f(a) = b$ means $f^{-1}(b) = a$.'],
        solution: [`$f(${x0}) = ${y0}$ means the point $${ptTex(x0, y0)}$ is on $f$.`, `So $${ptTex(y0, x0)}$ is on $f^{-1}$, and $f^{-1}(${y0}) = ${x0}$.`],
      };
    }

    if (kind === 'linearFrac') {
      const p = rng.pick([2, 3, 4, 5, -2, -3]);
      const q = rng.nonZero(-9, 9);
      const r = rng.pick([2, 3, 4, 5, 6]);
      const shown = `\\dfrac{${polyTex([q, p])}}{${r}}`;
      const ans = p > 0 ? `\\dfrac{${polyTex([-q, r])}}{${p}}` : `\\dfrac{${polyTex([q, -r])}}{${-p}}`;
      return {
        prompt: `Find the inverse of $f(x) = ${shown}$.`,
        parts: [exprPart(p > 0 ? `(${polyText([-q, r])})/${p}` : `(${polyText([q, -r])})/${-p}`, { ...lab, placeholder: 'e.g. (5x + 2)/3' })],
        hints: [hintSwap, 'After interchanging, multiply both sides by the denominator first.'],
        solution: [
          `$y = ${shown}$`,
          `Interchange $x$ and $y$: $x = \\dfrac{${polyTex([q, p], 'y')}}{${r}}$`,
          `Multiply by $${r}$: $${r}x = ${polyTex([q, p], 'y')}$`,
          `$${polyTex([0, p], 'y')} = ${polyTex([-q, r])}$`,
          `$f^{-1}(x) = ${ans}$`,
        ],
        answerDisplay: `$f^{-1}(x) = ${ans}$`,
      };
    }

    if (kind === 'cubic') {
      const a = rng.pick([1, 1, 2, -1, 8]);
      const h = rng.int(-5, 5);
      const k = rng.nonZero(-9, 9);
      const shown = `${coefTex(a)}${BASES.cube.tex(xh(h))}${kTex(k)}`;
      const inside = a === 1 ? xh(k) : a === -1 ? `${tn(k)} - x` : `\\dfrac{${xh(k)}}{${a}}`;
      const ans = `\\sqrt[3]{${inside}}${kTex(h)}`;
      const insideText = a === 1 ? xhText(k) : a === -1 ? `${tt(k)} - x` : `(${xhText(k)})/${a}`;
      return {
        prompt: `Find the inverse of $f(x) = ${shown}$. Type cbrt( ) for a cube root.`,
        parts: [exprPart(`cbrt(${insideText})${kText(h)}`, { ...lab, placeholder: 'e.g. cbrt(x - 2) + 1' })],
        hints: [hintSwap, 'Undo in reverse order: subtract $k$, divide by $a$, take the cube root, then undo the horizontal translation.'],
        solution: [
          `$y = ${shown}$`,
          `Interchange: $x = ${coefTex(a)}${BASES.cube.tex(xh(h, 'y'))}${kTex(k)}$`,
          `$${xh(k)} = ${coefTex(a)}${BASES.cube.tex(xh(h, 'y'))}$${a === 1 ? '' : `, so $${BASES.cube.tex(xh(h, 'y'))} = ${inside}$`}`,
          `Take the cube root: $${xh(h, 'y')} = \\sqrt[3]{${inside}}$`,
          `$f^{-1}(x) = ${ans}$`,
        ],
        answerDisplay: `$f^{-1}(x) = ${ans}$`,
      };
    }

    if (kind === 'evalInverse') {
      const cubic = rng.chance(0.4);
      const x0 = cubic ? rng.nonZero(-3, 3) : rng.nonZero(-8, 8);
      const m = cubic ? rng.pick([1, 2, -1]) : rng.pick([2, 3, 4, 5, -2, -3]);
      const c = rng.nonZero(-9, 9);
      const asc = cubic ? [c, 0, 0, m] : [c, m];
      const v = polyEval(asc, x0);
      return {
        prompt: `Given $f(x) = ${polyTex(asc)}$, find $f^{-1}(${v})$.`,
        parts: [numPart(x0, { label: `$f^{-1}(${v}) =$` })],
        hints: [`$f^{-1}(${v})$ is the input of $f$ that gives an output of $${v}$.`, `Solve $${polyTex(asc)} = ${v}$.`],
        solution: [
          `$f^{-1}(${v}) = x$ means $f(x) = ${v}$.`,
          `$${polyTex(asc)} = ${v}$, so $${polyTex([0, ...asc.slice(1)])} = ${v - c}$.`,
          cubic ? `$x^3 = ${tn((v - c) / m)}$, so $x = \\sqrt[3]{${tn((v - c) / m)}} = ${x0}$.` : `$x = \\dfrac{${v - c}}{${m}} = ${x0}$`,
          `$f^{-1}(${v}) = ${x0}$`,
        ],
      };
    }

    if (kind === 'sqrtInverse') {
      const a = rng.pick([1, 1, 2, 3, -1]);
      const h = rng.int(-6, 6);
      const k = rng.nonZero(-6, 6);
      const shown = `${coefTex(a)}\\sqrt{${xh(h)}}${kTex(k)}`;
      const inner = a === 1 ? `(${xh(k)})^2` : a === -1 ? `(${xh(k)})^2` : `\\left(\\dfrac{${xh(k)}}{${a}}\\right)^2`;
      const ans = `${inner}${kTex(h)}`;
      const text = a === 1 || a === -1 ? `(${xhText(k)})^2${kText(h)}` : `((${xhText(k)})/${a})^2${kText(h)}`;
      const restr = a > 0 ? `x \\ge ${k}` : `x \\le ${k}`;
      return {
        prompt: `Find the equation of the inverse of $f(x) = ${shown}$. (The domain restriction of the inverse is not needed in your answer.)`,
        parts: [exprPart(text, { ...lab, placeholder: 'e.g. (x - 2)^2 + 3' })],
        hints: [hintSwap, 'Isolate the square root, then square both sides.'],
        solution: [
          `$y = ${shown}$. Interchange: $x = ${coefTex(a)}\\sqrt{${xh(h, 'y')}}${kTex(k)}$`,
          `$${a === 1 ? xh(k) : a === -1 ? polyTex([k, -1]) : `\\dfrac{${xh(k)}}{${a}}`} = \\sqrt{${xh(h, 'y')}}$`,
          `Square both sides: $${xh(h, 'y')} = ${inner}$`,
          `$f^{-1}(x) = ${ans}$, with $${restr}$ (the range of $f$), so only half of this parabola is the inverse.`,
        ],
        answerDisplay: `$f^{-1}(x) = ${ans}$, $${restr}$`,
      };
    }

    // quadratic with a restricted domain: vertex form, or expanded (complete the square).
    const expanded = kind === 'quadExpanded';
    const a = expanded ? 1 : rng.pick([1, 2, 3, 4, -1, -2]);
    const h = rng.nonZero(-5, 5);
    const k = a > 0 ? rng.int(-5, 2) : rng.int(-1, 5);
    const right = rng.chance(0.6);
    const restr = right ? `x \\ge ${h}` : `x \\le ${h}`;
    const shown = expanded ? polyTex([h * h + k, -2 * h, 1]) : `${coefTex(a)}(${xh(h)})^2${kTex(k)}`;
    const inside = a === 1 ? xh(k) : a === -1 ? `${tn(k)} - x` : a < 0 ? `\\dfrac{${tn(k)} - x}{${-a}}` : `\\dfrac{${xh(k)}}{${a}}`;
    const ans = `${right ? '' : '-'}\\sqrt{${inside}}${kTex(h)}`;
    const text = `${right ? '' : '-'}sqrt(${a === 1 ? xhText(k) : a === -1 ? `${tt(k)} - x` : a < 0 ? `(${tt(k)} - x)/${-a}` : `(${xhText(k)})/${a}`})${kText(h)}`;
    const steps = [`$y = ${shown}$`];
    if (expanded) steps.push(`Complete the square: $y = (${xh(h)})^2 ${pmTex(k)}$`);
    steps.push(
      `Interchange $x$ and $y$: $x = ${coefTex(a)}(${xh(h, 'y')})^2${kTex(k)}$`,
      `Isolate the square: $(${xh(h, 'y')})^2 = ${inside}$`,
      `Take the square root: $${xh(h, 'y')} = \\pm\\sqrt{${inside}}$`,
      `The domain $${restr}$ of $f$ becomes the range $y ${right ? '\\ge' : '\\le'} ${h}$ of the inverse, so take the ${right ? 'positive' : 'negative'} root.`,
      `$f^{-1}(x) = ${ans}$`,
    );
    return {
      prompt: `Find the inverse of $f(x) = ${shown}$, $${restr}$.`,
      parts: [exprPart(text, { ...lab, placeholder: 'e.g. sqrt(x + 1) - 3' })],
      hints: [hintSwap + (expanded ? ' Complete the square first.' : ''), 'After taking the square root, use the domain restriction of $f$ to choose the $+$ or $-$ sign.'],
      solution: steps,
      answerDisplay: `$f^{-1}(x) = ${ans}$`,
    };
  },
});

const inverseGraph = skill({
  id: 'm301-inverse-graph',
  name: 'Graphs of inverses',
  description: 'Sketch and identify inverses by reflecting in y = x, decide whether an inverse is a function, and restrict the domain so it is.',
  outcomes: ['RF5', 'RF6'],
  lessonId: 'm301-1-4',
  format: 'mc',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['pointSet', 'invPoint'] as const) : d === 2 ? rng.pick(['graphMatch', 'hlt', 'domainRangeInv'] as const) : rng.pick(['restrict', 'invariant'] as const);
    const hintRefl = 'The graph of $y = f^{-1}(x)$ is the reflection of $y = f(x)$ in the line $y = x$: $(x, y) \\to (y, x)$.';

    if (kind === 'pointSet') {
      const xs = rng.sample([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 4).sort((p, q) => p - q);
      const repeat = rng.chance(0.5);
      const ys = retry(
        () => xs.map(() => rng.int(-6, 6)),
        (v) => (repeat ? new Set(v).size === 3 : new Set(v).size === 4) && v.some((y, i) => y !== xs[i]),
      );
      const f = xs.map((x, i) => [x, ys[i]] as Pt);
      // Each point is its own formula so a long set wraps on a phone.
      const set = (pts: Pt[]) => `{${pts.map(([x, y]) => `$${ptTex(x, y)}$`).join(', ')}}`;
      const inv = f.map(([x, y]) => [y, x] as Pt);
      const wrong = [f.map(([x, y]) => [-x + 0, y] as Pt), f.map(([x, y]) => [x, -y + 0] as Pt), f.map(([x, y]) => [-y + 0, -x + 0] as Pt)];
      const dup = ys.find((y, i) => ys.indexOf(y) !== i);
      return {
        prompt: `The function $f$ is the set of points ${set(f)}. Which set is $f^{-1}$, and is $f^{-1}$ a function?`,
        parts: [part(mc(rng, set(inv), wrong.map(set)), { label: '$f^{-1}$:' }), part(fixedChoice(['Yes', 'No'], repeat ? 1 : 0), { label: 'Is $f^{-1}$ a function?' })],
        hints: ['Interchange the coordinates of every point: $(x, y) \\to (y, x)$.', 'The inverse is a function only if no two of its points share an $x$-coordinate, that is, only if no two points of $f$ share a $y$-coordinate.'],
        solution: [
          `Interchange the coordinates: $f^{-1} = ${set(inv).slice(1, -1)}$.`,
          repeat ? `Two points of $f^{-1}$ have $x$-coordinate $${dup}$, so $f^{-1}$ is not a function.` : 'Every $x$-coordinate in $f^{-1}$ is different, so $f^{-1}$ is a function.',
        ],
      };
    }

    if (kind === 'invPoint') {
      const x0 = rng.nonZero(-9, 9);
      const y0 = rng.intExcept(-9, 9, [0, x0, -x0]);
      const c = `$${ptTex(y0, x0)}$`;
      return {
        prompt: `The point $${ptTex(x0, y0)}$ is on the graph of $y = f(x)$. Which point is on the graph of $y = f^{-1}(x)$?`,
        parts: [part(mc(rng, c, [`$${ptTex(-x0, -y0)}$`, `$${ptTex(x0, -y0)}$`, `$${ptTex(-y0, -x0)}$`, `$${ptTex(-x0, y0)}$`]))],
        hints: [hintRefl, 'Interchange the $x$- and $y$-coordinates.'],
        solution: ['Reflecting in $y = x$ interchanges the coordinates.', `$${ptTex(x0, y0)} \\to ${ptTex(y0, x0)}$`],
      };
    }

    if (kind === 'graphMatch') {
      const half = rng.chance(0.35);
      const swap = (p: Pt[]) => p.map(([x, y]) => [y, x] as Pt);
      const moves: Array<(p: Pt[]) => Pt[]> = [swap, (p) => p.map(([x, y]) => [x, -y + 0] as Pt), (p) => p.map(([x, y]) => [-x + 0, y] as Pt), (p) => p.map(([x, y]) => [-y + 0, -x + 0] as Pt)];
      const setKey = (p: Pt[]) => JSON.stringify(p.map(([x, y]) => `${x},${y}`).sort());
      // Key points (for the solution) and the drawn curve (dense for the half-parabola y = (x - h)^2 + k, x >= h).
      const { key, drawn } = retry(
        () => {
          if (half) {
            const h = rng.int(-3, 1);
            const k = rng.int(-4, 0);
            const drawn: Pt[] = [];
            for (let i = 0; i <= 40; i++) {
              const s = (2.8 * i) / 40;
              drawn.push([r3(h + s), r3(k + s * s)]);
            }
            return { key: [0, 1, 2].map((i) => [h + i, k + i * i] as Pt), drawn };
          }
          const key = pwl(rng, 4, [-5, 4], [-5, 5]);
          return { key, drawn: key };
        },
        (c) => new Set(moves.map((m) => setKey(m(c.key)))).size === moves.length && !moves.some((m) => setKey(m(c.key)) === setKey(c.key)),
      );
      const fig = (pts: Pt[], ghost: boolean): PlaneFigure => ({
        type: 'plane',
        grid: GRID8,
        lines: [yLine],
        polylines: [...(ghost ? [{ points: drawn, color: 'muted' as const }] : []), { points: pts, color: 'brand' as const }],
      });
      const opts = moves.map((m, i) => ({ md: '', figure: fig(m(drawn), true), correct: i === 0 }));
      const f = key;
      return {
        prompt: 'The graph of $y = f(x)$ is shown, with the line $y = x$ dashed. Which graph shows $y = f^{-1}(x)$? (Each choice also shows $y = f(x)$ in grey.)',
        figure: fig(drawn, false),
        parts: [part(mcFigures(rng, opts))],
        hints: [hintRefl, `Follow one point, such as $${ptTex(...f[1])}$, to $${ptTex(f[1][1], f[1][0])}$.`],
        solution: ['Reflect in $y = x$ by interchanging the coordinates of each point.', f.map((p) => `$${ptTex(...p)} \\to ${ptTex(p[1], p[0])}$`).join(', '), 'The correct graph passes through these image points and is the mirror image of $y = f(x)$ in the dashed line.'],
      };
    }

    if (kind === 'hlt') {
      const type = rng.pick(['parab', 'abs', 'cubeShift', 'line', 'sqrt', 'cubic3'] as const);
      const h = rng.int(-3, 3);
      const k = rng.int(-3, 3);
      const a = rng.pick([1, -1, 2, -2, 1 / 2]);
      const fns: Record<typeof type, { f: Fn; tex: string; oneToOne: boolean; extra?: number[] }> = {
        parab: { f: (x) => a * (x - h) ** 2 + k, tex: `${coefTex(a)}(${xh(h)})^2${kTex(k)}`, oneToOne: false, extra: [h] },
        abs: { f: (x) => a * Math.abs(x - h) + k, tex: `${coefTex(a)}|${xh(h)}|${kTex(k)}`, oneToOne: false, extra: [h] },
        cubeShift: { f: (x) => (a * (x - h) ** 3) / 2 + k, tex: `${tn(a / 2)}(${xh(h)})^3${kTex(k)}`, oneToOne: true },
        line: { f: (x) => 2 * a * x + k, tex: polyTex([k, 2 * a]), oneToOne: true },
        sqrt: { f: (x) => (x < h ? NaN : 2 * a * Math.sqrt(x - h) + k), tex: `${coefTex(2 * a)}\\sqrt{${xh(h)}}${kTex(k)}`, oneToOne: true, extra: endpointExtras(h, 1) },
        cubic3: { f: (x) => (a * (x ** 3 - 9 * x)) / 4 + k, tex: `${tn(a / 4)}(x^3 - 9x)${kTex(k)}`, oneToOne: false },
      };
      const F = fns[type];
      const yes = 'Yes, because the graph of $f$ passes the horizontal line test.';
      const no = 'No, because the graph of $f$ fails the horizontal line test.';
      const correct = F.oneToOne ? yes : no;
      return {
        prompt: `The graph of $f(x) = ${F.tex}$ is shown. Is the inverse of $f$ a function?`,
        figure: curveFig(GRID8, [{ f: F.f, extra: F.extra }]),
        parts: [part(mc(rng, correct, [F.oneToOne ? no : yes, 'Yes, because the graph of $f$ passes the vertical line test.', 'No, because the graph of $f$ fails the vertical line test.']))],
        hints: ['Reflecting in $y = x$ turns horizontal lines into vertical lines.', 'If some horizontal line crosses the graph of $f$ more than once, the inverse fails the vertical line test.'],
        solution: F.oneToOne
          ? ['Every horizontal line crosses the graph of $f$ at most once.', 'After reflecting in $y = x$, every vertical line crosses the inverse at most once, so the inverse is a function.']
          : ['Some horizontal lines cross the graph of $f$ twice or more (two inputs give the same output).', 'After reflecting in $y = x$, those become vertical lines that cross the inverse more than once, so the inverse is not a function.'],
      };
    }

    if (kind === 'domainRangeInv') {
      const p = rng.int(-8, 2);
      const q = p + rng.int(2, 9);
      const r = rng.intExcept(-8, 2, [p]);
      const s = r + rng.int(2, 9);
      const notation = rng.pick(['set', 'interval'] as const);
      const D = between(p, q);
      const R = between(r, s);
      const correct = drChoice(R, D, notation);
      return {
        prompt: `A one-to-one function $f$ has domain $${ivTex('x', D, notation)}$ and range $${ivTex('y', R, notation)}$. What are the domain and range of $f^{-1}$?`,
        parts: [part(mc(rng, correct, [drChoice(D, R, notation), drChoice(between(-q, -p), between(-s, -r), notation), drChoice(between(-s, -r), between(-q, -p), notation)]))],
        hints: [hintRefl, 'Interchanging $x$ and $y$ interchanges the domain and the range.'],
        solution: ['The inverse interchanges $x$- and $y$-coordinates.', 'So the domain of $f^{-1}$ is the range of $f$, and the range of $f^{-1}$ is the domain of $f$.', `${correct}.`],
      };
    }

    if (kind === 'restrict') {
      const absType = rng.chance(0.3);
      const a = rng.pick([1, 2, -1, 3, -2, 1 / 2]);
      const h = rng.nonZero(-5, 5);
      const k = rng.intExcept(-5, 5, [h, -h]);
      const right = rng.chance(0.5);
      const shown = absType ? `${coefTex(a)}|${xh(h)}|${kTex(k)}` : `${coefTex(a)}(${xh(h)})^2${kTex(k)}`;
      const op = right ? '\\ge' : '\\le';
      const xr = (v: number) => `$x ${op} ${v}$`;
      const correct = xr(h);
      const wrong = [xr(k), xr(-h), `$x ${op} 0$`, '$x \\in \\mathbb{R}$'];
      const domInv = a > 0 ? `x \\ge ${k}` : `x \\le ${k}`;
      const rngInv = `y ${op} ${h}`;
      const notation = rng.pick(['set', 'interval'] as const);
      const side = (v: number, up: boolean): Iv => ({ kind: up ? 'ge' : 'le', a: v });
      const c2 = drChoice(side(k, a > 0), side(h, right), notation);
      const w2 = [drChoice(side(h, right), side(k, a > 0), notation), drChoice(side(k, a > 0), side(k, right), notation), drChoice(side(h, right), side(h, a > 0), notation), drChoice(side(k, a < 0), side(h, right), notation)];
      return {
        prompt: `Let $f(x) = ${shown}$. Its inverse is not a function. (a) Which restriction on the domain of $f$ ${right ? 'keeps the right half of the graph and ' : 'keeps the left half of the graph and '}makes $f^{-1}$ a function? (b) With that restriction, what are the domain and range of $f^{-1}$?`,
        figure: curveFig(GRID8, [{ f: (x) => (absType ? a * Math.abs(x - h) + k : a * (x - h) ** 2 + k), extra: [h] }], { points: [{ x: h, y: k, label: ptLabel(h, k) }] }),
        parts: [part(mc(rng, correct, wrong), { label: '(a)' }), part(mc(rng, c2, w2), { label: '(b)' })],
        hints: ['Cut the graph at its vertex so each half passes the horizontal line test.', 'The domain of $f^{-1}$ is the range of $f$, and the range of $f^{-1}$ is the restricted domain of $f$.'],
        solution: [
          `The vertex is $${ptTex(h, k)}$. Each half of the graph on one side of $x = ${h}$ passes the horizontal line test.`,
          `(a) Keep the ${right ? 'right' : 'left'} half: $x ${op} ${h}$.`,
          `The range of $f$ is $${domInv.replace('x', 'y')}$ because the graph opens ${a > 0 ? 'up' : 'down'} from the vertex.`,
          `(b) Interchange: $f^{-1}$ has domain $${domInv}$ and range $${rngInv}$.`,
        ],
      };
    }

    // invariant points on y = x
    if (rng.chance(0.5)) {
      const m = rng.pick([2, 3, -2, -3]);
      const pp = rng.nonZero(-5, 5);
      const c = pp * (1 - m);
      const correct = `$${ptTex(pp, pp)}$`;
      return {
        prompt: `The graph of $f(x) = ${polyTex([c, m])}$ is reflected in the line $y = x$ to give the graph of its inverse. Which point is invariant?`,
        parts: [part(mc(rng, correct, [`$${ptTex(0, c)}$`, `$${ptTex(-pp, -pp)}$`, `$${ptTex(c, 0)}$`, `$${ptTex(c, c)}$`]))],
        hints: ['Points on the line $y = x$ do not move when reflected in $y = x$.', `Solve $f(x) = x$: $${polyTex([c, m])} = x$.`],
        solution: [`Invariant points lie on both $y = f(x)$ and $y = x$.`, `$${polyTex([c, m])} = x$ gives $${polyTex([0, m - 1])} = ${-c}$, so $x = ${pp}$.`, `The invariant point is $${ptTex(pp, pp)}$.`],
      };
    }
    const pp = rng.pick([2, 3, 4]);
    const c = pp * (pp - 1);
    return {
      prompt: `The graph of $f(x) = x^2 - ${c}$, $x \\ge 0$, is reflected in the line $y = x$ to give the graph of $f^{-1}$. Which point(s) are invariant?`,
      figure: curveFig(GRID8, [{ f: (x) => (x < 0 ? NaN : x * x - c), extra: [0] }], { lines: [yLine] }),
      parts: [part(mc(rng, `$${ptTex(pp, pp)}$ only`, [`$${ptTex(pp, pp)}$ and $${ptTex(1 - pp, 1 - pp)}$`, `$${ptTex(1 - pp, 1 - pp)}$ only`, `$${ptTex(0, -c)}$ only`]))],
      hints: ['Invariant points lie on the line $y = x$, so solve $f(x) = x$.', 'Check each solution against the restriction $x \\ge 0$.'],
      solution: [
        `$x^2 - ${c} = x$ gives $x^2 - x - ${c} = 0$, so $(x - ${pp})(x + ${pp - 1}) = 0$.`,
        `$x = ${pp}$ or $x = ${1 - pp}$, but $x = ${1 - pp}$ is not in the domain $x \\ge 0$.`,
        `The only invariant point is $${ptTex(pp, pp)}$.`,
      ],
    };
  },
});

export const TRANSFORMATIONS_SKILLS: SkillDef[] = [translate, reflect, stretch, combined, inverseEquation, inverseGraph];
