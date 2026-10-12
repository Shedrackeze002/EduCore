/** Math 30-1 Unit 6 — Trigonometric Identities (T5, T6). */
import { fixedChoice, mc, numPart, part, retry, roundingPhrase, skill } from '../../helpers.ts';
import { acosD, asinD, atanD, fmt, fmtFixed, frac, fracAdd, fracDiv, fracLatex, fracMul, fracSub, fracValue, lcmAll, polyString, radicalSplit, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Angles, values and formatting
// ---------------------------------------------------------------------------

type Fn = 'sin' | 'cos' | 'tan';
type Unit = 'deg' | 'rad';

const RAD = Math.PI / 180;
const ROMAN = ['', 'I', 'II', 'III', 'IV'];
const PEOPLE = [
  'Amara', 'Jordan', 'Priya', 'Liam', 'Mei', 'Tyler', 'Kiran', 'Noah', 'Aisha', 'Dakota', 'Mateo', 'Sofia', 'Raj', 'Hamid', 'Jasmine',
  'Owen', 'Nadia', 'Wyatt', 'Simran', 'Kai', 'Fatima', 'Lucas', 'Thanh', 'Chloé', 'Darius', 'Leilani', 'Marie-Ève', 'Arjun', 'Rosalie', 'Tanvir',
];

const r7 = (x: number) => Math.round(x * 1e7) / 1e7;
const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const norm360 = (t: number) => r7(((r7(t) % 360) + 360) % 360);
const dg = (t: number) => `${fmt(t)}^\\circ`;
const EXACT_NOTE = 'Give an exact value. Type a square root with sqrt, for example `(sqrt(6) - sqrt(2))/4`.';
const SIMP_NOTE = 'Type $\\sin^2 x$ as `sin^2 x`.';

/** True when v is not close to a rounding boundary at `dp` decimals (so a student's rounding is unambiguous). */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.1;
}

/** An angle in degrees as a multiple of π, e.g. 150 -> 5π/6 (LaTeX). */
function radTex(t: number, cmd = '\\frac'): string {
  const f = frac(Math.round(t * 4), 720);
  if (f.n === 0) return '0';
  const sign = f.n < 0 ? '-' : '';
  const k = Math.abs(f.n);
  const top = `${k === 1 ? '' : k}\\pi`;
  return f.d === 1 ? `${sign}${top}` : `${sign}${cmd}{${top}}{${f.d}}`;
}
const angTex = (t: number, u: Unit, cmd = '\\frac') => (u === 'deg' ? dg(t) : radTex(t, cmd));
const angVal = (t: number, u: Unit) => (u === 'deg' ? t : t * RAD);
const DOMAIN: Record<Unit, string> = { deg: '$0^\\circ \\le x < 360^\\circ$', rad: '$0 \\le x < 2\\pi$' };
const ENTER: Record<Unit, string> = {
  deg: 'Enter every solution in degrees, separated by commas.',
  rad: 'Enter every solution as an exact value in radians, separated by commas (type $\\pi$ as `pi`, for example `5pi/6`).',
};

function trigD(f: Fn, t: number): number {
  const x = t * RAD;
  return f === 'sin' ? Math.sin(x) : f === 'cos' ? Math.cos(x) : Math.tan(x);
}

function quadrant(t: number): 1 | 2 | 3 | 4 {
  const a = norm360(t);
  return a < 90 ? 1 : a < 180 ? 2 : a < 270 ? 3 : 4;
}

/** Every angle in [0°, 360°) with f(x) = v, rounded so that special angles come out exact. */
function anglesFor(f: Fn, v: number): number[] {
  let out: number[];
  if (f === 'tan') {
    const b = atanD(v);
    out = [b, b + 180];
  } else {
    if (Math.abs(v) > 1 + 1e-12) return [];
    const c = Math.max(-1, Math.min(1, v));
    const b = f === 'sin' ? asinD(c) : acosD(c);
    out = f === 'sin' ? [b, 180 - b] : [b, 360 - b];
  }
  const s = out.map(norm360).sort((a, b) => a - b);
  return s.filter((t, i) => i === 0 || !near(t, s[i - 1]));
}

/** Sorted union of angle lists without repeats. */
function union(...lists: number[][]): number[] {
  const s = lists.flat().map(norm360).sort((a, b) => a - b);
  return s.filter((t, i) => i === 0 || !near(t, s[i - 1]));
}

const isSpecialAngle = (t: number) => near(t, Math.round(t)) && Math.round(t) % 15 === 0;
const listTex = (sols: number[], u: Unit) => sols.map((t) => angTex(t, u)).join(',\\ ');

/** Special values of the ratios, written exactly. */
const SPECIAL_VALUES: Array<[number, string]> = [
  [0, '0'],
  [1, '1'],
  [-1, '-1'],
  [0.5, '\\dfrac{1}{2}'],
  [-0.5, '-\\dfrac{1}{2}'],
  [Math.SQRT2 / 2, '\\dfrac{\\sqrt{2}}{2}'],
  [-Math.SQRT2 / 2, '-\\dfrac{\\sqrt{2}}{2}'],
  [Math.sqrt(3) / 2, '\\dfrac{\\sqrt{3}}{2}'],
  [-Math.sqrt(3) / 2, '-\\dfrac{\\sqrt{3}}{2}'],
  [Math.sqrt(3), '\\sqrt{3}'],
  [-Math.sqrt(3), '-\\sqrt{3}'],
  [Math.sqrt(3) / 3, '\\dfrac{\\sqrt{3}}{3}'],
  [-Math.sqrt(3) / 3, '-\\dfrac{\\sqrt{3}}{3}'],
];
function valTex(v: number): string {
  const m = SPECIAL_VALUES.find(([x]) => Math.abs(x - v) < 1e-9);
  if (m) return m[1];
  for (let d = 1; d <= 60; d++) {
    const n = Math.round(v * d);
    if (Math.abs(n / d - v) < 1e-9) return fracLatex(frac(n, d), { dfrac: true });
  }
  return fmt(v, 4);
}

/**
 * Solve f(x) = v over one revolution, with a sentence of working.
 * Special values are solved exactly; others use the reference angle, rounded to `dp` places.
 */
function solveLine(f: Fn, v: number, u: Unit, dp?: number): { text: string; sols: number[] } {
  const sols = anglesFor(f, v);
  const lhs = `\\${f} x = ${valTex(v)}`;
  if (!sols.length) return { text: `$${lhs}$: no solution, because $-1 \\le \\${f} x \\le 1$.`, sols };
  if (sols.every(isSpecialAngle) || dp === undefined) return { text: `$${lhs}$ when $x = ${listTex(sols, u)}$.`, sols };
  const ref = f === 'sin' ? asinD(Math.abs(v)) : f === 'cos' ? acosD(Math.abs(v)) : atanD(Math.abs(v));
  const refS = u === 'deg' ? `${fmtFixed(ref, 2)}^\\circ` : fmtFixed(ref * RAD, 4);
  const half = u === 'deg' ? '180^\\circ' : '\\pi';
  const full = u === 'deg' ? '360^\\circ' : '2\\pi';
  const show = (t: number) => {
    const q = quadrant(t);
    const work = q === 1 ? '' : q === 2 ? `= ${half} - ${refS} ` : q === 3 ? `= ${half} + ${refS} ` : `= ${full} - ${refS} `;
    return `${work}\\approx ${fmtFixed(angVal(t, u), dp)}${u === 'deg' ? '^\\circ' : ''}`;
  };
  const qs = sols.map(quadrant);
  const sign = v > 0 ? 'positive' : 'negative';
  return {
    text: `$${lhs}$: the reference angle is $\\${f}^{-1}\\left(${valTex(Math.abs(v))}\\right) \\approx ${refS}$. $\\${f} x$ is ${sign} in quadrants ${ROMAN[qs[0]]} and ${ROMAN[qs[1]]}, so $x ${show(sols[0])}$ or $x ${show(sols[1])}$.`,
    sols,
  };
}

/** A numbers part for a list of angles (degrees in, the requested unit out). */
function anglesPart(sols: number[], u: Unit, opts: { label?: string; dp?: number } = {}): Part {
  const values = sols.map((t) => angVal(t, u));
  const spec: AnswerSpec =
    opts.dp === undefined ? { kind: 'numbers', values } : { kind: 'numbers', values, decimals: opts.dp, tolerance: u === 'deg' ? 0.1 : 0.011 };
  return part(spec, {
    label: opts.label ?? '$x =$',
    suffix: u === 'deg' ? '°' : undefined,
    placeholder: u === 'deg' ? 'For example: 15, 195' : 'For example: pi/8, 9pi/8',
  });
}

function anglesDisplay(sols: number[], u: Unit, dp?: number): string {
  if (!sols.length) return 'no solution';
  if (dp === undefined) return sols.map((t) => `$${angTex(t, u)}$`).join(', ');
  return sols.map((t) => `$${fmtFixed(angVal(t, u), dp)}${u === 'deg' ? '^\\circ' : ''}$`).join(', ');
}

// ---------------------------------------------------------------------------
// General solutions: the smallest period that maps the set of angles onto itself
// ---------------------------------------------------------------------------

function setPeriod(s: number[]): number {
  for (const p of [90, 180]) if (s.length && s.every((t) => s.some((w) => near(w, norm360(t + p))))) return p;
  return 360;
}
function periodTex(p: number, u: Unit): string {
  if (u === 'deg') return `${p}^\\circ n`;
  return p === 360 ? '2\\pi n' : p === 180 ? '\\pi n' : '\\frac{\\pi}{2}n';
}
function generalTex(s: number[], u: Unit, op = '='): string {
  const p = setPeriod(s);
  const terms = s.filter((t) => t < p - 1e-9).map((t) => (near(t, 0) ? periodTex(p, u) : `${angTex(t, u)} + ${periodTex(p, u)}`));
  return `x ${op} ${terms.join(',\\ ')},\\ n \\in \\mathrm{I}`;
}
const setKey = (s: number[]) => union(s).join(',');

/** Wrong solution sets built from real mistakes: a period that is too short, a lost solution, the wrong quadrants. */
function wrongSets(rng: Rng, s: number[]): number[][] {
  const out: number[][] = [];
  const key = setKey(s);
  const add = (w: number[]) => {
    const u = union(w);
    if (!u.length || setKey(u) === key || out.some((o) => setKey(o) === setKey(u))) return;
    out.push(u);
  };
  add(s.flatMap((t) => [t, t + 180]));
  if (s.length > 1) add(s.filter((_, i) => i !== rng.int(0, s.length - 1)));
  add(s.map((t) => 360 - t));
  add(s.map((t) => 180 - t));
  add(s.map((t) => t + 180));
  add(s.filter((t) => t < 180));
  add(s.flatMap((t) => [t, t + 90]));
  add(s.flatMap((t) => [t, 360 - t]));
  return rng.shuffle(out);
}

function generalChoice(rng: Rng, s: number[], u: Unit, op = '='): AnswerSpec {
  if (!s.length) {
    const none = 'There are no non-permissible values.';
    return mc(rng, none, rng.shuffle([[90, 270], [0, 180], [0, 90, 180, 270]]).map((w) => `$${generalTex(w, u, op)}$`));
  }
  return mc(
    rng,
    `$${generalTex(s, u, op)}$`,
    wrongSets(rng, s).map((w) => `$${generalTex(w, u, op)}$`),
  );
}

// ---------------------------------------------------------------------------
// Exact values: sums of rational multiples of square roots (radicand -> coefficient)
// ---------------------------------------------------------------------------

type Ex = Map<number, Frac>;

function ex(n: number, d = 1, r = 1): Ex {
  const out: Ex = new Map();
  if (n === 0) return out;
  const { outside, inside } = radicalSplit(r);
  out.set(inside, frac(n * outside, d));
  return out;
}
function exAdd(a: Ex, b: Ex): Ex {
  const out: Ex = new Map(a);
  for (const [r, c] of b) {
    const s = out.has(r) ? fracAdd(out.get(r)!, c) : c;
    if (s.n === 0) out.delete(r);
    else out.set(r, s);
  }
  return out;
}
function exScale(a: Ex, k: Frac): Ex {
  const out: Ex = new Map();
  if (k.n === 0) return out;
  for (const [r, c] of a) out.set(r, fracMul(c, k));
  return out;
}
const exNeg = (a: Ex) => exScale(a, frac(-1));
function exMul(a: Ex, b: Ex): Ex {
  let out: Ex = new Map();
  for (const [r1, c1] of a)
    for (const [r2, c2] of b) {
      const { outside, inside } = radicalSplit(r1 * r2);
      out = exAdd(out, new Map([[inside, fracMul(fracMul(c1, c2), frac(outside))]]));
    }
  return out;
}
/** a ÷ b where b is a single non-zero term c√r. */
function exDiv(a: Ex, b: Ex): Ex {
  const [[r, c]] = [...b];
  return exMul(a, new Map([[r, frac(c.d, c.n * r)]]));
}
function exValue(a: Ex): number {
  let v = 0;
  for (const [r, c] of a) v += (c.n / c.d) * Math.sqrt(r);
  return v;
}
function exTerms(a: Ex) {
  const terms = [...a].sort((x, y) => x[0] - y[0]);
  const L = lcmAll(terms.map(([, c]) => c.d));
  const nums = terms.map(([r, c]) => ({ k: (c.n * L) / c.d, r }));
  const pull = nums.length > 0 && nums.every((t) => t.k < 0) && (L > 1 || nums.length === 1);
  if (pull) nums.forEach((t) => (t.k = -t.k));
  nums.sort((p, q) => Number(q.k > 0) - Number(p.k > 0));
  return { L, nums, pull };
}
function exLatex(a: Ex): string {
  if (!a.size) return '0';
  const { L, nums, pull } = exTerms(a);
  const term = (k: number, r: number) => (r === 1 ? `${Math.abs(k)}` : `${Math.abs(k) === 1 ? '' : Math.abs(k)}\\sqrt{${r}}`);
  let top = '';
  nums.forEach((t, i) => (top += i === 0 ? `${t.k < 0 ? '-' : ''}${term(t.k, t.r)}` : ` ${t.k < 0 ? '-' : '+'} ${term(t.k, t.r)}`));
  return `${pull ? '-' : ''}${L === 1 ? top : `\\dfrac{${top}}{${L}}`}`;
}
/** How a student could type the exact value. */
function exText(a: Ex): string {
  if (!a.size) return '0';
  const { L, nums, pull } = exTerms(a);
  const term = (k: number, r: number) => (r === 1 ? `${Math.abs(k)}` : `${Math.abs(k) === 1 ? '' : Math.abs(k)}sqrt(${r})`);
  let top = '';
  nums.forEach((t, i) => (top += i === 0 ? `${t.k < 0 ? '-' : ''}${term(t.k, t.r)}` : ` ${t.k < 0 ? '-' : '+'} ${term(t.k, t.r)}`));
  const body = L === 1 ? top : nums.length > 1 ? `(${top})/${L}` : `${top}/${L}`;
  return `${pull ? '-' : ''}${body}`;
}
/** Wrapped in brackets when it is a sum or negative, for substitution displays. */
function exParen(a: Ex): string {
  const l = exLatex(a);
  return `\\left(${l}\\right)`;
}
/** "p + q" or "p - q" without a "+ -". */
function exJoin(p: Ex, op: '+' | '-', q: Ex): string {
  const ql = exLatex(q);
  if (ql.startsWith('-')) return `${exLatex(p)} ${op === '+' ? '-' : '+'} ${ql.slice(1)}`;
  return `${exLatex(p)} ${op} ${ql}`;
}

const REF_EXACT: Record<Fn, Record<number, Ex | null>> = {
  sin: { 0: ex(0), 30: ex(1, 2), 45: ex(1, 2, 2), 60: ex(1, 2, 3), 90: ex(1) },
  cos: { 0: ex(1), 30: ex(1, 2, 3), 45: ex(1, 2, 2), 60: ex(1, 2), 90: ex(0) },
  tan: { 0: ex(0), 30: ex(1, 3, 3), 45: ex(1), 60: ex(1, 1, 3), 90: null },
};

/** Exact value of f at a multiple of 30° or 45° (null when undefined). */
function exactTrig(f: Fn, t: number): Ex | null {
  const a = norm360(t);
  const q = quadrant(a);
  const ref = a % 90 === 0 ? (a % 180 === 0 ? 0 : 90) : q === 1 ? a : q === 2 ? 180 - a : q === 3 ? a - 180 : 360 - a;
  const base = REF_EXACT[f][ref];
  if (base === null) return null;
  const s = Math.sign(Math.round(trigD(f, a) * 1e9));
  return s < 0 ? exNeg(base) : base;
}

// ---------------------------------------------------------------------------
// Lesson 6.1 — Reciprocal, quotient and Pythagorean identities
// ---------------------------------------------------------------------------

type Step = [string, string];
interface Simp {
  q: string;
  exp: string;
  ans: string;
  steps: Step[];
  hint: 'rq' | 'py' | 'mix';
  target?: string;
  /** Wrong answers: the item is multiple choice (used when x appears only once, so typing the expression back would pass). */
  mcWrong?: string[];
}
type SimpMaker = (a: string, k: number) => Simp;

const fx = (f: string, a: string) => `\\${f} ${a}`;
const fx2 = (f: string, a: string) => `\\${f}^2 ${a}`;
const df = (n: string, d: string) => `\\dfrac{${n}}{${d}}`;

const SIMP_HINTS: Record<Simp['hint'], string[]> = {
  rq: [
    'Write each function in terms of $\\sin x$ and $\\cos x$, using the reciprocal identities ($\\csc x = \\dfrac{1}{\\sin x}$, $\\sec x = \\dfrac{1}{\\cos x}$, $\\cot x = \\dfrac{1}{\\tan x}$) and the quotient identities ($\\tan x = \\dfrac{\\sin x}{\\cos x}$, $\\cot x = \\dfrac{\\cos x}{\\sin x}$).',
    'Then divide out common factors, and change $\\dfrac{\\sin x}{\\cos x}$ back to $\\tan x$ (and so on) at the end.',
  ],
  py: [
    'Look for a Pythagorean identity: $\\sin^2 x + \\cos^2 x = 1$, $1 + \\tan^2 x = \\sec^2 x$ or $1 + \\cot^2 x = \\csc^2 x$.',
    'Rearrange the identity so that one side matches part of the expression, for example $1 - \\sin^2 x = \\cos^2 x$.',
  ],
  mix: [
    'Write everything in terms of $\\sin x$ and $\\cos x$, and combine fractions over a common denominator.',
    'Look for $\\sin^2 x + \\cos^2 x$, $1 - \\sin^2 x$ or $1 - \\cos^2 x$ and replace it using a Pythagorean identity. Then simplify.',
  ],
};

const SIMP1: SimpMaker[] = [
  (a) => ({ q: `${fx('sin', a)}\\,${fx('csc', a)}`, exp: '1', ans: '1', hint: 'rq', steps: [['Reciprocal identity', `${fx('sin', a)}\\cdot${df('1', fx('sin', a))}`], ['Divide out the common factor', '1']] }),
  (a) => ({ q: `${fx('cos', a)}\\,${fx('sec', a)}`, exp: '1', ans: '1', hint: 'rq', steps: [['Reciprocal identity', `${fx('cos', a)}\\cdot${df('1', fx('cos', a))}`], ['Divide out the common factor', '1']] }),
  (a) => ({ q: `${fx('tan', a)}\\,${fx('cot', a)}`, exp: '1', ans: '1', hint: 'rq', steps: [['Quotient identities', `${df(fx('sin', a), fx('cos', a))}\\cdot${df(fx('cos', a), fx('sin', a))}`], ['Divide out the common factors', '1']] }),
  (a) => ({ q: `${fx('tan', a)}\\,${fx('cos', a)}`, exp: `sin(${a})`, ans: fx('sin', a), hint: 'rq', steps: [['Quotient identity', `${df(fx('sin', a), fx('cos', a))}\\cdot${fx('cos', a)}`], ['Divide out the common factor', fx('sin', a)]] }),
  (a) => ({ q: `${fx('cot', a)}\\,${fx('sin', a)}`, exp: `cos(${a})`, ans: fx('cos', a), hint: 'rq', steps: [['Quotient identity', `${df(fx('cos', a), fx('sin', a))}\\cdot${fx('sin', a)}`], ['Divide out the common factor', fx('cos', a)]] }),
  (a) => ({ q: `${fx('sin', a)}\\,${fx('sec', a)}`, exp: `tan(${a})`, ans: fx('tan', a), hint: 'rq', steps: [['Reciprocal identity', `${fx('sin', a)}\\cdot${df('1', fx('cos', a))}`], ['Multiply', df(fx('sin', a), fx('cos', a))], ['Quotient identity', fx('tan', a)]] }),
  (a) => ({ q: `${fx('cos', a)}\\,${fx('csc', a)}`, exp: `cot(${a})`, ans: fx('cot', a), hint: 'rq', steps: [['Reciprocal identity', `${fx('cos', a)}\\cdot${df('1', fx('sin', a))}`], ['Multiply', df(fx('cos', a), fx('sin', a))], ['Quotient identity', fx('cot', a)]] }),
  (a) => ({ q: `1 - ${fx2('sin', a)}`, exp: `cos^2(${a})`, ans: fx2('cos', a), hint: 'py', mcWrong: [`-${fx2('cos', a)}`, fx('cos', a), fx2('tan', a)], steps: [[`Rearrange $\\sin^2 ${a} + \\cos^2 ${a} = 1$`, fx2('cos', a)]] }),
  (a) => ({ q: `1 - ${fx2('cos', a)}`, exp: `sin^2(${a})`, ans: fx2('sin', a), hint: 'py', mcWrong: [`-${fx2('sin', a)}`, fx('sin', a), fx2('cot', a)], steps: [[`Rearrange $\\sin^2 ${a} + \\cos^2 ${a} = 1$`, fx2('sin', a)]] }),
  (a) => ({ q: `${fx2('sec', a)} - 1`, exp: `tan^2(${a})`, ans: fx2('tan', a), hint: 'py', mcWrong: [`-${fx2('tan', a)}`, fx('tan', a), fx2('cot', a)], steps: [[`Rearrange $1 + \\tan^2 ${a} = \\sec^2 ${a}$`, fx2('tan', a)]] }),
  (a) => ({ q: `1 + ${fx2('tan', a)}`, exp: `sec^2(${a})`, ans: fx2('sec', a), hint: 'py', mcWrong: [fx2('csc', a), fx('sec', a), fx2('cos', a)], steps: [['Pythagorean identity', fx2('sec', a)]] }),
  (a) => ({ q: `${fx2('csc', a)} - 1`, exp: `cot^2(${a})`, ans: fx2('cot', a), hint: 'py', mcWrong: [`-${fx2('cot', a)}`, fx('cot', a), fx2('tan', a)], steps: [[`Rearrange $1 + \\cot^2 ${a} = \\csc^2 ${a}$`, fx2('cot', a)]] }),
  (a) => ({ q: `1 + ${fx2('cot', a)}`, exp: `csc^2(${a})`, ans: fx2('csc', a), hint: 'py', mcWrong: [fx2('sec', a), fx('csc', a), fx2('sin', a)], steps: [['Pythagorean identity', fx2('csc', a)]] }),
  (a, k) => ({ q: `${k}${fx2('sin', a)} + ${k}${fx2('cos', a)}`, exp: `${k}`, ans: `${k}`, hint: 'py', steps: [[`Factor out ${k}`, `${k}(${fx2('sin', a)} + ${fx2('cos', a)})`], ['Pythagorean identity', `${k}(1)`], ['Simplify', `${k}`]] }),
  (a, k) => ({ q: `${k} - ${k}${fx2('sin', a)}`, exp: `${k}cos^2(${a})`, ans: `${k}${fx2('cos', a)}`, hint: 'py', mcWrong: [`-${k}${fx2('cos', a)}`, `${k}${fx('cos', a)}`, `${k}${fx2('tan', a)}`], steps: [[`Factor out ${k}`, `${k}(1 - ${fx2('sin', a)})`], ['Pythagorean identity', `${k}${fx2('cos', a)}`]] }),
  (a, k) => ({ q: `${k}${fx2('sec', a)} - ${k}`, exp: `${k}tan^2(${a})`, ans: `${k}${fx2('tan', a)}`, hint: 'py', mcWrong: [`-${k}${fx2('tan', a)}`, `${k}${fx('tan', a)}`, `${k}${fx2('cot', a)}`], steps: [[`Factor out ${k}`, `${k}(${fx2('sec', a)} - 1)`], ['Pythagorean identity', `${k}${fx2('tan', a)}`]] }),
];

const SIMP2: SimpMaker[] = [
  (a) => ({ q: df(fx('sin', a), fx('tan', a)), exp: `cos(${a})`, ans: fx('cos', a), hint: 'rq', steps: [['Quotient identity', `${fx('sin', a)}\\div${df(fx('sin', a), fx('cos', a))}`], ['Multiply by the reciprocal', `${fx('sin', a)}\\cdot${df(fx('cos', a), fx('sin', a))}`], ['Divide out the common factor', fx('cos', a)]] }),
  (a) => ({ q: df(fx('cos', a), fx('cot', a)), exp: `sin(${a})`, ans: fx('sin', a), hint: 'rq', steps: [['Quotient identity', `${fx('cos', a)}\\div${df(fx('cos', a), fx('sin', a))}`], ['Multiply by the reciprocal', `${fx('cos', a)}\\cdot${df(fx('sin', a), fx('cos', a))}`], ['Divide out the common factor', fx('sin', a)]] }),
  (a) => ({ q: df(fx('tan', a), fx('sin', a)), exp: `sec(${a})`, ans: fx('sec', a), hint: 'rq', steps: [['Quotient identity', `${df(fx('sin', a), fx('cos', a))}\\div${fx('sin', a)}`], ['Multiply by the reciprocal', `${df(fx('sin', a), fx('cos', a))}\\cdot${df('1', fx('sin', a))}`], ['Divide out the common factor', df('1', fx('cos', a))], ['Reciprocal identity', fx('sec', a)]] }),
  (a) => ({ q: df(fx('cot', a), fx('cos', a)), exp: `csc(${a})`, ans: fx('csc', a), hint: 'rq', steps: [['Quotient identity', `${df(fx('cos', a), fx('sin', a))}\\div${fx('cos', a)}`], ['Multiply by the reciprocal', `${df(fx('cos', a), fx('sin', a))}\\cdot${df('1', fx('cos', a))}`], ['Divide out the common factor', df('1', fx('sin', a))], ['Reciprocal identity', fx('csc', a)]] }),
  (a) => ({ q: `${fx('tan', a)}\\,${fx('csc', a)}`, exp: `sec(${a})`, ans: fx('sec', a), hint: 'rq', steps: [['Quotient and reciprocal identities', `${df(fx('sin', a), fx('cos', a))}\\cdot${df('1', fx('sin', a))}`], ['Divide out the common factor', df('1', fx('cos', a))], ['Reciprocal identity', fx('sec', a)]] }),
  (a) => ({ q: `${fx('cot', a)}\\,${fx('sec', a)}`, exp: `csc(${a})`, ans: fx('csc', a), hint: 'rq', steps: [['Quotient and reciprocal identities', `${df(fx('cos', a), fx('sin', a))}\\cdot${df('1', fx('cos', a))}`], ['Divide out the common factor', df('1', fx('sin', a))], ['Reciprocal identity', fx('csc', a)]] }),
  (a) => ({ q: df(fx('tan', a), fx('sec', a)), exp: `sin(${a})`, ans: fx('sin', a), hint: 'rq', steps: [['Quotient and reciprocal identities', `${df(fx('sin', a), fx('cos', a))}\\div${df('1', fx('cos', a))}`], ['Multiply by the reciprocal', `${df(fx('sin', a), fx('cos', a))}\\cdot${fx('cos', a)}`], ['Divide out the common factor', fx('sin', a)]] }),
  (a) => ({ q: df(fx('cot', a), fx('csc', a)), exp: `cos(${a})`, ans: fx('cos', a), hint: 'rq', steps: [['Quotient and reciprocal identities', `${df(fx('cos', a), fx('sin', a))}\\div${df('1', fx('sin', a))}`], ['Multiply by the reciprocal', `${df(fx('cos', a), fx('sin', a))}\\cdot${fx('sin', a)}`], ['Divide out the common factor', fx('cos', a)]] }),
  (a) => ({ q: df(fx('sec', a), fx('csc', a)), exp: `tan(${a})`, ans: fx('tan', a), hint: 'rq', steps: [['Reciprocal identities', `${df('1', fx('cos', a))}\\div${df('1', fx('sin', a))}`], ['Multiply by the reciprocal', `${df('1', fx('cos', a))}\\cdot${fx('sin', a)}`], ['Simplify', df(fx('sin', a), fx('cos', a))], ['Quotient identity', fx('tan', a)]] }),
  (a) => ({ q: df(fx('csc', a), fx('sec', a)), exp: `cot(${a})`, ans: fx('cot', a), hint: 'rq', steps: [['Reciprocal identities', `${df('1', fx('sin', a))}\\div${df('1', fx('cos', a))}`], ['Multiply by the reciprocal', `${df('1', fx('sin', a))}\\cdot${fx('cos', a)}`], ['Simplify', df(fx('cos', a), fx('sin', a))], ['Quotient identity', fx('cot', a)]] }),
  (a) => ({ q: df(`1 - ${fx2('cos', a)}`, fx('sin', a)), exp: `sin(${a})`, ans: fx('sin', a), hint: 'py', steps: [['Pythagorean identity', df(fx2('sin', a), fx('sin', a))], ['Divide out the common factor', fx('sin', a)]] }),
  (a) => ({ q: df(`1 - ${fx2('sin', a)}`, fx('cos', a)), exp: `cos(${a})`, ans: fx('cos', a), hint: 'py', steps: [['Pythagorean identity', df(fx2('cos', a), fx('cos', a))], ['Divide out the common factor', fx('cos', a)]] }),
  (a) => ({ q: df(`${fx2('sec', a)} - 1`, fx('tan', a)), exp: `tan(${a})`, ans: fx('tan', a), hint: 'py', steps: [['Pythagorean identity', df(fx2('tan', a), fx('tan', a))], ['Divide out the common factor', fx('tan', a)]] }),
  (a) => ({ q: `${fx2('sec', a)} - ${fx2('tan', a)}`, exp: '1', ans: '1', hint: 'py', steps: [['Pythagorean identity, $\\sec^2 x = 1 + \\tan^2 x$', `(1 + ${fx2('tan', a)}) - ${fx2('tan', a)}`], ['Simplify', '1']] }),
  (a) => ({ q: `${fx2('csc', a)} - ${fx2('cot', a)}`, exp: '1', ans: '1', hint: 'py', steps: [['Pythagorean identity, $\\csc^2 x = 1 + \\cot^2 x$', `(1 + ${fx2('cot', a)}) - ${fx2('cot', a)}`], ['Simplify', '1']] }),
  (a) => ({ q: `(1 - ${fx('sin', a)})(1 + ${fx('sin', a)})`, exp: `cos^2(${a})`, ans: fx2('cos', a), hint: 'py', steps: [['Expand (difference of squares)', `1 - ${fx2('sin', a)}`], ['Pythagorean identity', fx2('cos', a)]] }),
  (a) => ({ q: `(1 - ${fx('cos', a)})(1 + ${fx('cos', a)})`, exp: `sin^2(${a})`, ans: fx2('sin', a), hint: 'py', steps: [['Expand (difference of squares)', `1 - ${fx2('cos', a)}`], ['Pythagorean identity', fx2('sin', a)]] }),
  (a) => ({ q: `(${fx('sec', a)} - 1)(${fx('sec', a)} + 1)`, exp: `tan^2(${a})`, ans: fx2('tan', a), hint: 'py', steps: [['Expand (difference of squares)', `${fx2('sec', a)} - 1`], ['Pythagorean identity', fx2('tan', a)]] }),
  (a) => ({ q: `${fx('sin', a)}(${fx('csc', a)} - ${fx('sin', a)})`, exp: `cos^2(${a})`, ans: fx2('cos', a), hint: 'mix', steps: [['Expand', `${fx('sin', a)}\\,${fx('csc', a)} - ${fx2('sin', a)}`], [`Reciprocal identity, $\\sin ${a}\\csc ${a} = 1$`, `1 - ${fx2('sin', a)}`], ['Pythagorean identity', fx2('cos', a)]] }),
  (a) => ({ q: `${fx('cos', a)}(${fx('sec', a)} - ${fx('cos', a)})`, exp: `sin^2(${a})`, ans: fx2('sin', a), hint: 'mix', steps: [['Expand', `${fx('cos', a)}\\,${fx('sec', a)} - ${fx2('cos', a)}`], [`Reciprocal identity, $\\cos ${a}\\sec ${a} = 1$`, `1 - ${fx2('cos', a)}`], ['Pythagorean identity', fx2('sin', a)]] }),
  (a) => ({ q: `${fx2('cos', a)}(1 + ${fx2('tan', a)})`, exp: '1', ans: '1', hint: 'py', steps: [['Pythagorean identity', `${fx2('cos', a)}\\,${fx2('sec', a)}`], ['Reciprocal identity', `${fx2('cos', a)}\\cdot${df('1', fx2('cos', a))}`], ['Simplify', '1']] }),
  (a) => ({ q: `${fx2('sin', a)}(1 + ${fx2('cot', a)})`, exp: '1', ans: '1', hint: 'py', steps: [['Pythagorean identity', `${fx2('sin', a)}\\,${fx2('csc', a)}`], ['Reciprocal identity', `${fx2('sin', a)}\\cdot${df('1', fx2('sin', a))}`], ['Simplify', '1']] }),
  (a) => ({ q: `${fx2('sin', a)}\\,${fx2('sec', a)}`, exp: `tan^2(${a})`, ans: fx2('tan', a), hint: 'rq', steps: [['Reciprocal identity', `${fx2('sin', a)}\\cdot${df('1', fx2('cos', a))}`], ['Multiply', df(fx2('sin', a), fx2('cos', a))], ['Quotient identity', fx2('tan', a)]] }),
  (a) => ({ q: `${fx('tan', a)}(${fx('tan', a)} + ${fx('cot', a)})`, exp: `sec^2(${a})`, ans: fx2('sec', a), hint: 'py', steps: [['Expand', `${fx2('tan', a)} + ${fx('tan', a)}\\,${fx('cot', a)}`], [`Reciprocal identity, $\\tan ${a}\\cot ${a} = 1$`, `${fx2('tan', a)} + 1`], ['Pythagorean identity', fx2('sec', a)]] }),
];

const NO_FRACTION = 'an expression with no fraction';
const SINGLE_TERM = 'a single term';
const SIMP3: SimpMaker[] = [
  () => ({ q: '\\sec x - \\sin x\\tan x', exp: 'cos(x)', ans: '\\cos x', hint: 'mix', steps: [['Reciprocal and quotient identities', '\\dfrac{1}{\\cos x} - \\sin x\\cdot\\dfrac{\\sin x}{\\cos x}'], ['Common denominator', '\\dfrac{1 - \\sin^2 x}{\\cos x}'], ['Pythagorean identity', '\\dfrac{\\cos^2 x}{\\cos x}'], ['Divide out the common factor', '\\cos x']] }),
  () => ({ q: '\\csc x - \\cos x\\cot x', exp: 'sin(x)', ans: '\\sin x', hint: 'mix', steps: [['Reciprocal and quotient identities', '\\dfrac{1}{\\sin x} - \\cos x\\cdot\\dfrac{\\cos x}{\\sin x}'], ['Common denominator', '\\dfrac{1 - \\cos^2 x}{\\sin x}'], ['Pythagorean identity', '\\dfrac{\\sin^2 x}{\\sin x}'], ['Divide out the common factor', '\\sin x']] }),
  () => ({ q: '\\sin x + \\cos x\\cot x', exp: 'csc(x)', ans: '\\csc x', hint: 'mix', steps: [['Quotient identity', '\\sin x + \\cos x\\cdot\\dfrac{\\cos x}{\\sin x}'], ['Common denominator', '\\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x}'], ['Pythagorean identity', '\\dfrac{1}{\\sin x}'], ['Reciprocal identity', '\\csc x']] }),
  () => ({ q: '\\cos x + \\sin x\\tan x', exp: 'sec(x)', ans: '\\sec x', hint: 'mix', steps: [['Quotient identity', '\\cos x + \\sin x\\cdot\\dfrac{\\sin x}{\\cos x}'], ['Common denominator', '\\dfrac{\\cos^2 x + \\sin^2 x}{\\cos x}'], ['Pythagorean identity', '\\dfrac{1}{\\cos x}'], ['Reciprocal identity', '\\sec x']] }),
  () => ({ q: '\\dfrac{\\sec x - \\cos x}{\\sin x}', exp: 'tan(x)', ans: '\\tan x', hint: 'mix', steps: [['Reciprocal identity', '\\left(\\dfrac{1}{\\cos x} - \\cos x\\right)\\cdot\\dfrac{1}{\\sin x}'], ['Common denominator', '\\dfrac{1 - \\cos^2 x}{\\cos x}\\cdot\\dfrac{1}{\\sin x}'], ['Pythagorean identity', '\\dfrac{\\sin^2 x}{\\cos x\\sin x}'], ['Divide out the common factor', '\\dfrac{\\sin x}{\\cos x}'], ['Quotient identity', '\\tan x']] }),
  () => ({ q: '\\dfrac{\\csc x - \\sin x}{\\cos x}', exp: 'cot(x)', ans: '\\cot x', hint: 'mix', steps: [['Reciprocal identity', '\\left(\\dfrac{1}{\\sin x} - \\sin x\\right)\\cdot\\dfrac{1}{\\cos x}'], ['Common denominator', '\\dfrac{1 - \\sin^2 x}{\\sin x}\\cdot\\dfrac{1}{\\cos x}'], ['Pythagorean identity', '\\dfrac{\\cos^2 x}{\\sin x\\cos x}'], ['Divide out the common factor', '\\dfrac{\\cos x}{\\sin x}'], ['Quotient identity', '\\cot x']] }),
  () => ({ q: '\\dfrac{1}{1 - \\sin x} + \\dfrac{1}{1 + \\sin x}', exp: '2sec^2(x)', ans: '2\\sec^2 x', hint: 'mix', target: SINGLE_TERM, steps: [['Common denominator', '\\dfrac{(1 + \\sin x) + (1 - \\sin x)}{(1 - \\sin x)(1 + \\sin x)}'], ['Simplify', '\\dfrac{2}{1 - \\sin^2 x}'], ['Pythagorean identity', '\\dfrac{2}{\\cos^2 x}'], ['Reciprocal identity', '2\\sec^2 x']] }),
  () => ({ q: '\\dfrac{1}{1 - \\cos x} + \\dfrac{1}{1 + \\cos x}', exp: '2csc^2(x)', ans: '2\\csc^2 x', hint: 'mix', target: SINGLE_TERM, steps: [['Common denominator', '\\dfrac{(1 + \\cos x) + (1 - \\cos x)}{(1 - \\cos x)(1 + \\cos x)}'], ['Simplify', '\\dfrac{2}{1 - \\cos^2 x}'], ['Pythagorean identity', '\\dfrac{2}{\\sin^2 x}'], ['Reciprocal identity', '2\\csc^2 x']] }),
  () => ({ q: '\\dfrac{\\sin x}{\\csc x} + \\dfrac{\\cos x}{\\sec x}', exp: '1', ans: '1', hint: 'mix', steps: [['Dividing by $\\csc x$ is multiplying by $\\sin x$, and dividing by $\\sec x$ is multiplying by $\\cos x$', '\\sin x\\cdot\\sin x + \\cos x\\cdot\\cos x'], ['Simplify', '\\sin^2 x + \\cos^2 x'], ['Pythagorean identity', '1']] }),
  () => ({ q: '\\dfrac{1 + \\tan^2 x}{\\tan^2 x}', exp: 'csc^2(x)', ans: '\\csc^2 x', hint: 'mix', steps: [['Pythagorean identity', '\\dfrac{\\sec^2 x}{\\tan^2 x}'], ['Reciprocal and quotient identities', '\\dfrac{1}{\\cos^2 x}\\cdot\\dfrac{\\cos^2 x}{\\sin^2 x}'], ['Divide out the common factor', '\\dfrac{1}{\\sin^2 x}'], ['Reciprocal identity', '\\csc^2 x']] }),
  () => ({ q: '\\dfrac{\\sin^2 x}{1 - \\cos x}', exp: '1 + cos(x)', ans: '1 + \\cos x', hint: 'py', target: NO_FRACTION, steps: [['Pythagorean identity', '\\dfrac{1 - \\cos^2 x}{1 - \\cos x}'], ['Factor the difference of squares', '\\dfrac{(1 - \\cos x)(1 + \\cos x)}{1 - \\cos x}'], ['Divide out the common factor', '1 + \\cos x']] }),
  () => ({ q: '\\dfrac{\\cos^2 x}{1 + \\sin x}', exp: '1 - sin(x)', ans: '1 - \\sin x', hint: 'py', target: NO_FRACTION, steps: [['Pythagorean identity', '\\dfrac{1 - \\sin^2 x}{1 + \\sin x}'], ['Factor the difference of squares', '\\dfrac{(1 - \\sin x)(1 + \\sin x)}{1 + \\sin x}'], ['Divide out the common factor', '1 - \\sin x']] }),
  () => ({ q: '\\dfrac{\\tan x + \\cot x}{\\sec x}', exp: 'csc(x)', ans: '\\csc x', hint: 'mix', steps: [['Quotient and reciprocal identities', '\\left(\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x}\\right)\\cdot\\cos x'], ['Common denominator', '\\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x}\\cdot\\cos x'], ['Pythagorean identity', '\\dfrac{1}{\\sin x\\cos x}\\cdot\\cos x'], ['Divide out the common factor', '\\dfrac{1}{\\sin x}'], ['Reciprocal identity', '\\csc x']] }),
  () => ({ q: '\\dfrac{\\cot x + \\tan x}{\\csc x}', exp: 'sec(x)', ans: '\\sec x', hint: 'mix', steps: [['Quotient and reciprocal identities', '\\left(\\dfrac{\\cos x}{\\sin x} + \\dfrac{\\sin x}{\\cos x}\\right)\\cdot\\sin x'], ['Common denominator', '\\dfrac{\\cos^2 x + \\sin^2 x}{\\sin x\\cos x}\\cdot\\sin x'], ['Pythagorean identity', '\\dfrac{1}{\\sin x\\cos x}\\cdot\\sin x'], ['Divide out the common factor', '\\dfrac{1}{\\cos x}'], ['Reciprocal identity', '\\sec x']] }),
  () => ({ q: '\\cos x\\tan x + \\sin x', exp: '2sin(x)', ans: '2\\sin x', hint: 'rq', target: SINGLE_TERM, steps: [['Quotient identity', '\\cos x\\cdot\\dfrac{\\sin x}{\\cos x} + \\sin x'], ['Divide out the common factor', '\\sin x + \\sin x'], ['Collect like terms', '2\\sin x']] }),
  () => ({ q: '\\dfrac{\\sin x}{1 + \\cos x} + \\dfrac{1 + \\cos x}{\\sin x}', exp: '2csc(x)', ans: '2\\csc x', hint: 'mix', target: SINGLE_TERM, steps: [['Common denominator', '\\dfrac{\\sin^2 x + (1 + \\cos x)^2}{\\sin x(1 + \\cos x)}'], ['Expand', '\\dfrac{\\sin^2 x + 1 + 2\\cos x + \\cos^2 x}{\\sin x(1 + \\cos x)}'], ['Pythagorean identity', '\\dfrac{2 + 2\\cos x}{\\sin x(1 + \\cos x)}'], ['Factor', '\\dfrac{2(1 + \\cos x)}{\\sin x(1 + \\cos x)}'], ['Divide out the common factor', '\\dfrac{2}{\\sin x}'], ['Reciprocal identity', '2\\csc x']] }),
  () => ({ q: '\\dfrac{\\cos x}{1 + \\sin x} + \\dfrac{1 + \\sin x}{\\cos x}', exp: '2sec(x)', ans: '2\\sec x', hint: 'mix', target: SINGLE_TERM, steps: [['Common denominator', '\\dfrac{\\cos^2 x + (1 + \\sin x)^2}{\\cos x(1 + \\sin x)}'], ['Expand', '\\dfrac{\\cos^2 x + 1 + 2\\sin x + \\sin^2 x}{\\cos x(1 + \\sin x)}'], ['Pythagorean identity', '\\dfrac{2 + 2\\sin x}{\\cos x(1 + \\sin x)}'], ['Factor', '\\dfrac{2(1 + \\sin x)}{\\cos x(1 + \\sin x)}'], ['Divide out the common factor', '\\dfrac{2}{\\cos x}'], ['Reciprocal identity', '2\\sec x']] }),
  () => ({ q: '\\dfrac{\\sec x}{\\tan x + \\cot x}', exp: 'sin(x)', ans: '\\sin x', hint: 'mix', steps: [['Quotient identities', '\\sec x\\div\\left(\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x}\\right)'], ['Common denominator', '\\sec x\\div\\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x}'], ['Pythagorean and reciprocal identities', '\\dfrac{1}{\\cos x}\\cdot\\dfrac{\\sin x\\cos x}{1}'], ['Divide out the common factor', '\\sin x']] }),
];

function chain(q: string, steps: Step[]): string[] {
  return steps.map(([why, e], i) => `${why}: $${i === 0 ? `${q} ` : ''}= ${e}$`);
}

const identitySimplify = skill({
  id: 'm301-identity-simplify',
  name: 'Simplifying with the basic identities',
  description: 'Use the reciprocal, quotient and Pythagorean identities to simplify a trigonometric expression to a constant or a single term.',
  outcomes: ['T6'],
  lessonId: 'm301-6-1',
  gen(rng, d) {
    const bank = d === 1 ? SIMP1 : d === 2 ? SIMP2 : SIMP3;
    const a = d === 2 && rng.chance(0.3) ? rng.pick(['2x', '3x']) : 'x';
    const s = rng.pick(bank)(a, rng.int(2, 9));
    const target = s.target ?? 'a constant or a single trigonometric term';
    if (s.mcWrong) {
      return {
        prompt: `Which single term is equal to $${s.q}$?`,
        parts: [part(mc(rng, `$${s.ans}$`, s.mcWrong.map((w) => `$${w}$`)))],
        hints: SIMP_HINTS[s.hint],
        solution: [...chain(s.q, s.steps), `So $${s.q} = ${s.ans}$.`],
        answerDisplay: `$${s.ans}$`,
      };
    }
    return {
      prompt: `Simplify $${s.q}$ to ${target}. ${SIMP_NOTE}`,
      parts: [part({ kind: 'expression', expected: s.exp, form: 'single-function' }, { label: 'Simplified:', placeholder: 'Your simplified expression' })],
      hints: SIMP_HINTS[s.hint],
      solution: [...chain(s.q, s.steps), `So $${s.q} = ${s.ans}$.`],
      answerDisplay: `$${s.ans}$`,
    };
  },
});

// Non-permissible values ------------------------------------------------------

interface Cond {
  f: Fn;
  v: number;
  why: string;
}
interface NpvT {
  tex: string;
  conds: Cond[];
}
const C = (f: Fn, v: number, why = ''): Cond => ({ f, v, why });
const COS0 = (why: string) => C('cos', 0, why);
const SIN0 = (why: string) => C('sin', 0, why);
const S3 = Math.sqrt(3);
const S2 = Math.SQRT2;

const NPV1: NpvT[] = [
  { tex: '\\tan x', conds: [COS0('$\\tan x = \\dfrac{\\sin x}{\\cos x}$, so $\\cos x \\ne 0$')] },
  { tex: '\\sec x', conds: [COS0('$\\sec x = \\dfrac{1}{\\cos x}$, so $\\cos x \\ne 0$')] },
  { tex: '\\csc x', conds: [SIN0('$\\csc x = \\dfrac{1}{\\sin x}$, so $\\sin x \\ne 0$')] },
  { tex: '\\cot x', conds: [SIN0('$\\cot x = \\dfrac{\\cos x}{\\sin x}$, so $\\sin x \\ne 0$')] },
  { tex: '\\dfrac{5}{\\cos x}', conds: [COS0('The denominator cannot be 0, so $\\cos x \\ne 0$')] },
  { tex: '\\dfrac{2 + \\cos x}{\\sin x}', conds: [SIN0('The denominator cannot be 0, so $\\sin x \\ne 0$')] },
  { tex: '\\dfrac{\\cos x}{1 - \\sin x}', conds: [C('sin', 1, 'The denominator cannot be 0: $1 - \\sin x \\ne 0$, so $\\sin x \\ne 1$')] },
  { tex: '\\dfrac{\\sin x}{1 + \\cos x}', conds: [C('cos', -1, 'The denominator cannot be 0: $1 + \\cos x \\ne 0$, so $\\cos x \\ne -1$')] },
  { tex: '\\dfrac{\\sin x}{1 - \\cos x}', conds: [C('cos', 1, 'The denominator cannot be 0: $1 - \\cos x \\ne 0$, so $\\cos x \\ne 1$')] },
  { tex: '\\dfrac{\\cos x}{1 + \\sin x}', conds: [C('sin', -1, 'The denominator cannot be 0: $1 + \\sin x \\ne 0$, so $\\sin x \\ne -1$')] },
];

const NPV2: NpvT[] = [
  { tex: '\\dfrac{\\tan x}{\\sin x}', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), SIN0('The denominator $\\sin x$ cannot be 0')] },
  { tex: '\\dfrac{\\sec x}{\\tan x}', conds: [COS0('$\\sec x$ and $\\tan x$ are undefined when $\\cos x = 0$'), SIN0('The denominator $\\tan x$ cannot be 0, and $\\tan x = 0$ when $\\sin x = 0$')] },
  { tex: '\\dfrac{\\csc x}{\\cot x}', conds: [SIN0('$\\csc x$ and $\\cot x$ are undefined when $\\sin x = 0$'), COS0('The denominator $\\cot x$ cannot be 0, and $\\cot x = 0$ when $\\cos x = 0$')] },
  { tex: '\\tan x\\csc x', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), SIN0('$\\csc x$ is undefined when $\\sin x = 0$')] },
  { tex: '\\dfrac{3}{\\sin x\\cos x}', conds: [SIN0('The factor $\\sin x$ in the denominator cannot be 0'), COS0('The factor $\\cos x$ in the denominator cannot be 0')] },
  { tex: '\\dfrac{\\cot x}{1 + \\cos x}', conds: [SIN0('$\\cot x$ is undefined when $\\sin x = 0$'), C('cos', -1, 'The denominator cannot be 0, so $\\cos x \\ne -1$')] },
  { tex: '\\dfrac{\\tan x}{1 - \\sin x}', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), C('sin', 1, 'The denominator cannot be 0, so $\\sin x \\ne 1$')] },
  { tex: '\\dfrac{\\cot x}{\\csc x}', conds: [SIN0('$\\cot x$ and $\\csc x$ are undefined when $\\sin x = 0$ ($\\csc x$ is never 0, so the denominator adds no other values)')] },
  { tex: '\\dfrac{1 + \\sin x}{\\cos^2 x}', conds: [COS0('The denominator cannot be 0, and $\\cos^2 x = 0$ when $\\cos x = 0$')] },
  { tex: '\\dfrac{\\sin x}{1 - \\sin^2 x}', conds: [C('sin', 1, 'The denominator cannot be 0: $1 - \\sin^2 x = 0$ when $\\sin x = \\pm 1$'), C('sin', -1)] },
  { tex: '\\dfrac{\\sec x}{1 + \\tan x}', conds: [COS0('$\\sec x$ and $\\tan x$ are undefined when $\\cos x = 0$'), C('tan', -1, 'The denominator cannot be 0, so $\\tan x \\ne -1$')] },
];

const NPV3: NpvT[] = [
  { tex: '\\dfrac{1}{2\\sin x - 1}', conds: [C('sin', 0.5, 'The denominator cannot be 0: $2\\sin x - 1 \\ne 0$, so $\\sin x \\ne \\dfrac{1}{2}$')] },
  { tex: '\\dfrac{\\sin x}{2\\cos x - 1}', conds: [C('cos', 0.5, 'The denominator cannot be 0: $2\\cos x - 1 \\ne 0$, so $\\cos x \\ne \\dfrac{1}{2}$')] },
  { tex: '\\dfrac{\\cos x}{2\\sin x + \\sqrt{3}}', conds: [C('sin', -S3 / 2, 'The denominator cannot be 0: $2\\sin x + \\sqrt{3} \\ne 0$, so $\\sin x \\ne -\\dfrac{\\sqrt{3}}{2}$')] },
  { tex: '\\dfrac{\\tan x}{\\sqrt{2}\\cos x + 1}', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), C('cos', -S2 / 2, 'The denominator cannot be 0: $\\sqrt{2}\\cos x + 1 \\ne 0$, so $\\cos x \\ne -\\dfrac{1}{\\sqrt{2}} = -\\dfrac{\\sqrt{2}}{2}$')] },
  { tex: '\\dfrac{3}{\\tan x - 1}', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), C('tan', 1, 'The denominator cannot be 0, so $\\tan x \\ne 1$')] },
  { tex: '\\dfrac{\\cos x}{\\sin^2 x - \\sin x}', conds: [SIN0('The denominator factors as $\\sin x(\\sin x - 1)$, and neither factor can be 0'), C('sin', 1)] },
  { tex: '\\dfrac{\\cos x}{2\\sin^2 x - \\sin x}', conds: [SIN0('The denominator factors as $\\sin x(2\\sin x - 1)$, and neither factor can be 0'), C('sin', 0.5)] },
  { tex: '\\dfrac{1}{2\\cos^2 x - 1}', conds: [C('cos', S2 / 2, 'The denominator cannot be 0: $2\\cos^2 x = 1$ when $\\cos x = \\pm\\dfrac{\\sqrt{2}}{2}$'), C('cos', -S2 / 2)] },
  { tex: '\\dfrac{\\sin x}{4\\cos^2 x - 3}', conds: [C('cos', S3 / 2, 'The denominator cannot be 0: $4\\cos^2 x = 3$ when $\\cos x = \\pm\\dfrac{\\sqrt{3}}{2}$'), C('cos', -S3 / 2)] },
  { tex: '\\dfrac{\\tan x}{\\sqrt{3}\\tan x - 1}', conds: [COS0('$\\tan x$ is undefined when $\\cos x = 0$'), C('tan', S3 / 3, 'The denominator cannot be 0, so $\\tan x \\ne \\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}$')] },
  { tex: '\\dfrac{\\cot x}{2\\sin x - \\sqrt{2}}', conds: [SIN0('$\\cot x$ is undefined when $\\sin x = 0$'), C('sin', S2 / 2, 'The denominator cannot be 0, so $\\sin x \\ne \\dfrac{\\sqrt{2}}{2}$')] },
  { tex: '\\dfrac{5}{2 + \\sin x}', conds: [C('sin', -2, 'The denominator would be 0 only if $\\sin x = -2$')] },
];

function npvWork(t: NpvT, u: Unit): { lines: string[]; sols: number[] } {
  const lines: string[] = [];
  const all: number[][] = [];
  for (const c of t.conds) {
    const { text, sols } = solveLine(c.f, c.v, u);
    all.push(sols);
    lines.push(c.why ? `${c.why}. ${text}` : text);
  }
  return { lines, sols: union(...all) };
}

const identityNonpermissible = skill({
  id: 'm301-identity-nonpermissible',
  name: 'Non-permissible values',
  description: 'Determine the non-permissible values of a trigonometric expression or identity over one revolution, in degrees or radians, and in general form.',
  outcomes: ['T6'],
  lessonId: 'm301-6-1',
  gen(rng, d) {
    const u: Unit = rng.chance(d === 1 ? 0.6 : 0.5) ? 'deg' : 'rad';
    if (d === 3 && rng.chance(0.4)) {
      const t = rng.pick([...NPV2, ...NPV3.filter((x) => x.conds.some((c) => anglesFor(c.f, c.v).length))]);
      const { lines, sols } = npvWork(t, u);
      const p = setPeriod(sols);
      return {
        prompt: `Which statement gives every non-permissible value of $${t.tex}$, where $x$ is any real number ${u === 'deg' ? 'in degrees' : 'in radians'}?`,
        parts: [part(generalChoice(rng, sols, u, '\\ne'))],
        hints: [
          'Find the values in one revolution first: where is a function undefined, and where is a denominator 0?',
          'Then look for a pattern: if the values are a half-turn apart, they repeat every $180^\\circ$ ($\\pi$); a quarter-turn apart, every $90^\\circ$ ($\\frac{\\pi}{2}$).',
        ],
        solution: [
          ...lines,
          `In one revolution: $x = ${listTex(sols, u)}$. These values repeat every $${u === 'deg' ? dg(p) : radTex(p)}$.`,
          `So $${generalTex(sols, u, '\\ne')}$.`,
        ],
      };
    }
    const t = d === 1 ? rng.pick(NPV1) : d === 2 ? rng.pick(NPV2) : rng.weighted(NPV3.map((x) => [x, x.tex.includes('2 + \\sin') ? 0.3 : 1] as const));
    const { lines, sols } = npvWork(t, u);
    const none = d === 3 ? ' If there are none, type *none*.' : '';
    return {
      prompt: `Determine the non-permissible values of $${t.tex}$ for ${DOMAIN[u]}. ${u === 'deg' ? 'Enter the values in degrees, separated by commas.' : 'Enter exact values in radians, separated by commas (type $\\pi$ as `pi`).'}${none}`,
      parts: [anglesPart(sols, u, { label: '$x \\ne$' })],
      hints: [
        'An expression is undefined where a denominator is 0. Remember that $\\tan x$ and $\\sec x$ hide $\\cos x$ in a denominator, and $\\cot x$ and $\\csc x$ hide $\\sin x$.',
        'Write each restriction as an equation such as $\\cos x = 0$ and solve it over the whole domain.',
      ],
      solution: [...lines, sols.length ? `Non-permissible values: $x \\ne ${listTex(sols, u)}$` : 'There are no non-permissible values: the expression is defined for every $x$.'],
      answerDisplay: sols.length ? anglesDisplay(sols, u) : 'none',
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.2 — Sum, difference and double-angle identities
// ---------------------------------------------------------------------------

const coefX = (m: number) => (m === 1 ? 'x' : `${m}x`);
const SUM_FORMULA = {
  'sin+': '\\sin(A + B) = \\sin A\\cos B + \\cos A\\sin B',
  'sin-': '\\sin(A - B) = \\sin A\\cos B - \\cos A\\sin B',
  'cos+': '\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B',
  'cos-': '\\cos(A - B) = \\cos A\\cos B + \\sin A\\sin B',
  'tan+': '\\tan(A + B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}',
  'tan-': '\\tan(A - B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}',
} as const;
type SumKind = keyof typeof SUM_FORMULA;

/** The expanded right side of a sum or difference identity, with A and B written as given. */
function expansion(k: SumKind, A: string, B: string): string {
  const [f, op] = [k.slice(0, 3), k[3]];
  if (f === 'sin') return `\\sin ${A}\\cos ${B} ${op} \\cos ${A}\\sin ${B}`;
  if (f === 'cos') return `\\cos ${A}\\cos ${B} ${op === '+' ? '-' : '+'} \\sin ${A}\\sin ${B}`;
  return `\\dfrac{\\tan ${A} ${op} \\tan ${B}}{1 ${op === '+' ? '-' : '+'} \\tan ${A}\\tan ${B}}`;
}

const SUM_HINTS = [
  'Compare the expression with the expansions of $\\sin(A \\pm B)$, $\\cos(A \\pm B)$ and $\\tan(A \\pm B)$. Watch the signs: $\\cos(A + B)$ has a minus sign in its expansion.',
  'Identify $A$ and $B$, then write the expression as one function of $A + B$ or $A - B$.',
];

/** Pairs of special angles that add or subtract to t, with B in {30°, 45°, 60°}. */
function decompose(rng: Rng, t: number, needTan: boolean): { A: number; B: number; op: '+' | '-' } {
  const special = [30, 45, 60, 120, 135, 150, 180, 210, 225, 240, 300, 315, 330, 90, 270];
  const ok = (A: number) => special.includes(A) && (!needTan || A % 180 !== 90);
  const opts: Array<{ A: number; B: number; op: '+' | '-' }> = [];
  for (const B of [30, 45, 60]) {
    if (ok(t - B) && t - B !== B) opts.push({ A: t - B, B, op: '+' });
    if (ok(t + B) && t + B < 360) opts.push({ A: t + B, B, op: '-' });
  }
  const small = opts.filter((o) => o.A <= 180);
  return rng.pick(small.length ? small : opts);
}

/** Exact value of a sum or difference identity, with every step written out. */
function sumDiffWork(f: Fn, A: number, B: number, op: '+' | '-', u: Unit): { steps: string[]; value: Ex } {
  const a = (t: number) => angTex(t, u);
  const lhs = `\\${f}\\left(${a(A)} ${op} ${a(B)}\\right)`;
  const k = `${f}${op}` as SumKind;
  if (f !== 'tan') {
    const [f1, f2, f3, f4] = f === 'sin' ? (['sin', 'cos', 'cos', 'sin'] as const) : (['cos', 'cos', 'sin', 'sin'] as const);
    const e1 = exactTrig(f1, A)!;
    const e2 = exactTrig(f2, B)!;
    const e3 = exactTrig(f3, A)!;
    const e4 = exactTrig(f4, B)!;
    const join: '+' | '-' = f === 'sin' ? op : op === '+' ? '-' : '+';
    const p1 = exMul(e1, e2);
    const p2 = exMul(e3, e4);
    const value = join === '+' ? exAdd(p1, p2) : exAdd(p1, exNeg(p2));
    return {
      steps: [
        `$${lhs} = ${expansion(k, a(A), a(B))}$`,
        `$= ${exParen(e1)}${exParen(e2)} ${join} ${exParen(e3)}${exParen(e4)}$`,
        `$= ${exJoin(p1, join, p2)}$`,
        `$= ${exLatex(value)}$`,
      ],
      value,
    };
  }
  const tA = exactTrig('tan', A)!;
  const tB = exactTrig('tan', B)!;
  const num = op === '+' ? exAdd(tA, tB) : exAdd(tA, exNeg(tB));
  const prod = exMul(tA, tB);
  const den = op === '+' ? exAdd(ex(1), exNeg(prod)) : exAdd(ex(1), prod);
  const steps = [`$${lhs} = ${expansion(k, a(A), a(B))}$`, `$= \\dfrac{${exJoin(tA, op, tB)}}{1 ${op === '+' ? '-' : '+'} ${exParen(tA)}${exParen(tB)}}$`];
  // Clear the fractions inside, then rationalize a denominator of the form p ± q√r.
  const L = lcmAll([...num.values(), ...den.values()].map((c) => c.d));
  const numI = exScale(num, frac(L));
  const denI = exScale(den, frac(L));
  steps.push(`$= \\dfrac{${exLatex(numI)}}{${exLatex(denI)}}$${L > 1 ? ` (multiply the numerator and denominator by ${L})` : ''}`);
  let value: Ex;
  if (denI.size <= 1) {
    value = exDiv(numI, denI);
  } else {
    const rat = denI.get(1) ?? frac(0);
    const [[r, c]] = [...denI].filter(([rr]) => rr !== 1);
    const conj: Ex = exAdd(ex(rat.n, rat.d), exNeg(new Map([[r, c]])));
    const top = exMul(numI, conj);
    const bottom = exMul(denI, conj);
    steps.push(`$= \\dfrac{(${exLatex(numI)})(${exLatex(conj)})}{(${exLatex(denI)})(${exLatex(conj)})}$ (multiply by the conjugate)`);
    steps.push(`$= \\dfrac{${exLatex(top)}}{${exLatex(bottom)}}$`);
    value = exDiv(top, bottom);
  }
  steps.push(`$= ${exLatex(value)}$`);
  return { steps, value };
}

const T15 = [15, 75, 105, 165, 195, 255, 285, 345];

/** sin(s ± x), cos(s ± x), tan(s ± x) and the x − s forms, simplified to ± one function. */
function reductionItem(rng: Rng) {
  const u: Unit = rng.chance(0.5) ? 'deg' : 'rad';
  const f = rng.pick(['sin', 'cos', 'tan'] as const);
  const s = f === 'tan' ? rng.pick([180, 360]) : rng.pick([90, 180, 270]);
  const op = rng.pick(['+', '-'] as const);
  const xFirst = rng.chance(0.3);
  const S = angTex(s, u, '\\dfrac');
  const [A, B] = xFirst ? ['x', S] : [S, 'x'];
  const q = `\\${f}\\left(${A} ${op} ${B}\\right)`;
  const sS = Math.round(Math.sin(s * RAD));
  const cS = Math.round(Math.cos(s * RAD));
  // Coefficients of cos x and sin x (or of tan x for tangent).
  let coef: number;
  let other: 'sin' | 'cos' | 'tan';
  let work: string;
  const n = (v: number) => `(${v})`;
  if (f === 'sin') {
    // sin(s ± x) = sin s cos x ± cos s sin x;  sin(x ± s) = sin x cos s ± cos x sin s
    const cx = xFirst ? (op === '+' ? sS : -sS) : sS;
    const sx = xFirst ? cS : op === '+' ? cS : -cS;
    coef = cx !== 0 ? cx : sx;
    other = cx !== 0 ? 'cos' : 'sin';
    work = xFirst
      ? `\\sin x\\cos ${S} ${op} \\cos x\\sin ${S} = ${n(cS)}\\sin x ${op} ${n(sS)}\\cos x`
      : `\\sin ${S}\\cos x ${op} \\cos ${S}\\sin x = ${n(sS)}\\cos x ${op} ${n(cS)}\\sin x`;
  } else if (f === 'cos') {
    // cos(s ± x) = cos s cos x ∓ sin s sin x;  cos(x ± s) = cos x cos s ∓ sin x sin s
    const cx = cS;
    const sx = op === '+' ? -sS : sS;
    coef = cx !== 0 ? cx : sx;
    other = cx !== 0 ? 'cos' : 'sin';
    const op2 = op === '+' ? '-' : '+';
    work = xFirst
      ? `\\cos x\\cos ${S} ${op2} \\sin x\\sin ${S} = ${n(cS)}\\cos x ${op2} ${n(sS)}\\sin x`
      : `\\cos ${S}\\cos x ${op2} \\sin ${S}\\sin x = ${n(cS)}\\cos x ${op2} ${n(sS)}\\sin x`;
  } else {
    // tan(s ± x) = (tan s ± tan x)/(1 ∓ tan s tan x) with tan s = 0
    coef = xFirst ? 1 : op === '+' ? 1 : -1;
    other = 'tan';
    const op2 = op === '+' ? '-' : '+';
    work = xFirst
      ? `\\dfrac{\\tan x ${op} \\tan ${S}}{1 ${op2} \\tan x\\tan ${S}} = \\dfrac{\\tan x ${op} 0}{1 ${op2} 0}`
      : `\\dfrac{\\tan ${S} ${op} \\tan x}{1 ${op2} \\tan ${S}\\tan x} = \\dfrac{0 ${op} \\tan x}{1 ${op2} 0}`;
  }
  const ans = `${coef < 0 ? '-' : ''}\\${other} x`;
  const options = f === 'tan' ? ['\\tan x', '-\\tan x', '\\cot x', '-\\cot x'] : ['\\sin x', '-\\sin x', '\\cos x', '-\\cos x'];
  return {
    prompt: `Use a sum or difference identity to simplify $${q}$.`,
    parts: [part(fixedChoice(options.map((o) => `$${o}$`), options.indexOf(ans)))],
    hints: [`Expand with the identity for $\\${f}(A ${op} B)$.`, `Use $\\sin ${S} = ${sS}$, $\\cos ${S} = ${cS}$${f === 'tan' ? ` and $\\tan ${S} = 0$` : ''}, then simplify.`],
    solution: [`$${q} = ${work}$`, `$= ${ans}$`],
    answerDisplay: `$${ans}$`,
  };
}

/** One angle given by a ratio and its quadrant, from a Pythagorean triple. */
interface Ang {
  name: string;
  sin: Frac;
  cos: Frac;
  tan: Frac;
  given: string;
  steps: string[];
}
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
];
const QUAD_DEG = ['', '0^\\circ < N < 90^\\circ', '90^\\circ < N < 180^\\circ', '180^\\circ < N < 270^\\circ', '270^\\circ < N < 360^\\circ'];
const QUAD_RAD = ['', '0 < N < \\dfrac{\\pi}{2}', '\\dfrac{\\pi}{2} < N < \\pi', '\\pi < N < \\dfrac{3\\pi}{2}', '\\dfrac{3\\pi}{2} < N < 2\\pi'];
const fl = (f: Frac) => fracLatex(f, { dfrac: true });
/** A fraction as a factor in a product: always bracketed, so that two fractions side by side read as a product. */
const flp = (f: Frac) => `\\left(${fl(f)}\\right)`;

function makeAngle(rng: Rng, name: string, kinds: Array<'sin' | 'cos' | 'tan'> = ['sin', 'cos', 'tan'], triples = TRIPLES): Ang {
  const [p, qq, r] = rng.pick(triples);
  const [opp, adj] = rng.chance(0.5) ? [p, qq] : [qq, p];
  const q = rng.int(1, 4);
  const sx = q === 1 || q === 4 ? 1 : -1;
  const sy = q <= 2 ? 1 : -1;
  const x = sx * adj;
  const y = sy * opp;
  const sin = frac(y, r);
  const cos = frac(x, r);
  const tan = frac(y, x);
  const kind = rng.pick(kinds);
  const style = rng.int(0, 2);
  const where = style === 0 ? `$${name}$ is in quadrant ${ROMAN[q]}` : style === 1 ? `$${QUAD_DEG[q].replace('N', name)}$` : `$${QUAD_RAD[q].replace('N', name)}$`;
  const value = kind === 'sin' ? sin : kind === 'cos' ? cos : tan;
  const given = `$\\${kind} ${name} = ${fl(value)}$, where ${where}`;
  const signs = `In quadrant ${ROMAN[q]}, $x ${x > 0 ? '> 0' : '< 0'}$ and $y ${y > 0 ? '> 0' : '< 0'}$.`;
  let find: string;
  if (kind === 'sin') find = `$\\sin ${name} = \\dfrac{y}{r} = ${fl(value)}$, so take $y = ${y}$ and $r = ${r}$. ${signs} $x = ${sx < 0 ? '-' : ''}\\sqrt{${r}^2 - ${opp}^2} = ${x}$.`;
  else if (kind === 'cos') find = `$\\cos ${name} = \\dfrac{x}{r} = ${fl(value)}$, so take $x = ${x}$ and $r = ${r}$. ${signs} $y = ${sy < 0 ? '-' : ''}\\sqrt{${r}^2 - ${adj}^2} = ${y}$.`;
  else find = `$\\tan ${name} = \\dfrac{y}{x} = ${fl(value)}$. ${signs} So $x = ${x}$, $y = ${y}$ and $r = \\sqrt{${x < 0 ? `(${x})` : x}^2 + ${y < 0 ? `(${y})` : y}^2} = ${r}$.`;
  return { name, sin, cos, tan, given, steps: [find, `$\\sin ${name} = ${fl(sin)}$, $\\cos ${name} = ${fl(cos)}$, $\\tan ${name} = ${fl(tan)}$`] };
}

const sumDifference = skill({
  id: 'm301-sum-difference',
  name: 'Sum and difference identities',
  description: 'Use the sum and difference identities to write an expression as a single function, find exact values such as sin 75° or cos(π/12), and evaluate sin(A + B) from given ratios.',
  outcomes: ['T6'],
  lessonId: 'm301-6-2',
  gen(rng, d) {
    if (d === 1) {
      const kind = rng.pick(Object.keys(SUM_FORMULA) as SumKind[]);
      const f = kind.slice(0, 3) as Fn;
      const plus = kind[3] === '+';
      if (rng.chance(0.5)) {
        const m = rng.int(2, 6);
        const n = rng.int(1, m - 1);
        const k = plus ? m + n : m - n;
        const q = expansion(kind, coefX(m), coefX(n));
        const ans = `\\${f} ${coefX(k)}`;
        return {
          prompt: `Write $${q}$ as a single trigonometric function. ${SIMP_NOTE.replace('$\\sin^2 x$ as `sin^2 x`', '$\\sin 2x$ as `sin 2x`')}`,
          parts: [part({ kind: 'expression', expected: `${f}(${coefX(k)})`, form: 'single-function' }, { label: 'Single function:', placeholder: 'For example: cos 9x' })],
          hints: SUM_HINTS,
          solution: [`This matches $${SUM_FORMULA[kind]}$ with $A = ${coefX(m)}$ and $B = ${coefX(n)}$.`, `So $${q} = \\${f}(${coefX(m)} ${kind[3]} ${coefX(n)}) = ${ans}$.`],
          answerDisplay: `$${ans}$`,
        };
      }
      // A combination of non-special angles that collapses to a special angle.
      const R = rng.pick(f === 'tan' ? [30, 45, 60, 120, 135, 150] : [30, 45, 60, 90, 120, 135, 150]);
      const { A, B } = retry(
        () => {
          const b = rng.pick([5, 10, 20, 25, 35, 40, 50, 55]);
          return { A: plus ? R - b : R + b, B: b };
        },
        (o) => o.A > 0 && o.A !== o.B && o.A < 180 && (f !== 'tan' || o.A !== 90),
      );
      const q = expansion(kind, dg(A), dg(B));
      const value = exactTrig(f, R)!;
      return {
        prompt: `Use an identity to determine the exact value of $${q}$. ${EXACT_NOTE}`,
        parts: [numPart(exValue(value), { label: 'Exact value' })],
        hints: SUM_HINTS,
        solution: [
          `This matches $${SUM_FORMULA[kind]}$ with $A = ${dg(A)}$ and $B = ${dg(B)}$.`,
          `So the expression equals $\\${f}(${dg(A)} ${kind[3]} ${dg(B)}) = \\${f} ${dg(R)}$.`,
          `$\\${f} ${dg(R)} = ${exLatex(value)}$`,
        ],
        answerDisplay: `$${exLatex(value)}$`,
      };
    }
    if (d === 2) {
      if (rng.chance(0.3)) return reductionItem(rng);
      const u: Unit = rng.chance(0.5) ? 'deg' : 'rad';
      const f = rng.pick(['sin', 'cos', 'tan'] as const);
      const t = rng.pick(T15);
      const { A, B, op } = decompose(rng, t, f === 'tan');
      const { steps, value } = sumDiffWork(f, A, B, op, u);
      const tt = angTex(t, u);
      return {
        prompt: `Use a sum or difference identity to determine the exact value of $\\${f} ${u === 'rad' ? `\\left(${angTex(t, u, '\\dfrac')}\\right)` : tt}$. ${EXACT_NOTE}`,
        parts: [numPart(exValue(value), { label: `$\\${f} ${u === 'rad' ? `\\left(${tt}\\right)` : tt} =$` })],
        hints: [
          `Write $${tt}$ as a sum or difference of two special angles, for example ${u === 'deg' ? '$45^\\circ + 30^\\circ$ or $60^\\circ - 45^\\circ$' : '$\\frac{\\pi}{4} + \\frac{\\pi}{6}$ or $\\frac{\\pi}{3} - \\frac{\\pi}{4}$'}.`,
          `Expand with the identity for $\\${f}(A \\pm B)$, substitute the exact values from the special triangles, and simplify.`,
        ],
        solution: [`$${tt} = ${angTex(A, u)} ${op} ${angTex(B, u)}$`, ...steps, `So $\\${f} ${u === 'rad' ? `\\left(${tt}\\right)` : tt} = ${exLatex(value)}$ (type it as \`${exText(value)}\`).`],
        answerDisplay: `$${exLatex(value)}$`,
      };
    }
    // d === 3: ratios of two angles from given information.
    const [nA, nB] = rng.pick([['A', 'B'], ['\\alpha', '\\beta']] as const);
    const f = rng.pick(['sin', 'cos', 'tan'] as const);
    const op = rng.pick(['+', '-'] as const);
    // For tangent, avoid tan A tan B = ±1, which makes tan(A ± B) undefined.
    const [a, b] = retry(
      () => [makeAngle(rng, nA), makeAngle(rng, nB)] as const,
      ([x, y]) => f !== 'tan' || Math.abs(fracValue(fracMul(x.tan, y.tan))) !== 1,
    );
    let value: Frac;
    let work: string[];
    const target = `\\${f}(${nA} ${op} ${nB})`;
    if (f === 'sin') {
      const p1 = fracMul(a.sin, b.cos);
      const p2 = fracMul(a.cos, b.sin);
      value = op === '+' ? fracAdd(p1, p2) : fracSub(p1, p2);
      work = [`$${target} = \\sin ${nA}\\cos ${nB} ${op} \\cos ${nA}\\sin ${nB}$`, `$= ${flp(a.sin)}${flp(b.cos)} ${op} ${flp(a.cos)}${flp(b.sin)}$`, `$= ${fl(p1)} ${op} ${flp(p2)}$`];
    } else if (f === 'cos') {
      const p1 = fracMul(a.cos, b.cos);
      const p2 = fracMul(a.sin, b.sin);
      value = op === '+' ? fracSub(p1, p2) : fracAdd(p1, p2);
      const op2 = op === '+' ? '-' : '+';
      work = [`$${target} = \\cos ${nA}\\cos ${nB} ${op2} \\sin ${nA}\\sin ${nB}$`, `$= ${flp(a.cos)}${flp(b.cos)} ${op2} ${flp(a.sin)}${flp(b.sin)}$`, `$= ${fl(p1)} ${op2} ${flp(p2)}$`];
    } else {
      const top = op === '+' ? fracAdd(a.tan, b.tan) : fracSub(a.tan, b.tan);
      const prod = fracMul(a.tan, b.tan);
      const bottom = op === '+' ? fracSub(frac(1), prod) : fracAdd(frac(1), prod);
      value = fracDiv(top, bottom);
      const op2 = op === '+' ? '-' : '+';
      work = [
        `$${target} = \\dfrac{\\tan ${nA} ${op} \\tan ${nB}}{1 ${op2} \\tan ${nA}\\tan ${nB}}$`,
        `$= \\dfrac{${fl(a.tan)} ${op} ${flp(b.tan)}}{1 ${op2} ${flp(a.tan)}${flp(b.tan)}}$`,
        `$= \\dfrac{${fl(top)}}{${fl(bottom)}}$`,
      ];
    }
    return {
      prompt: `Given ${a.given}, and ${b.given}, determine the exact value of $${target}$.`,
      parts: [numPart(fracValue(value), { label: `$${target} =$`, display: 'fraction' })],
      hints: [
        `Sketch each angle in its quadrant. Use $x^2 + y^2 = r^2$ to find the missing side, and the quadrant for its sign.`,
        `Write out the identity for $\\${f}(A ${op} B)$ and substitute the exact ratios.`,
      ],
      solution: [...a.steps, ...b.steps, ...work, `$= ${fl(value)}$`],
      answerDisplay: `$${fl(value)}$`,
    };
  },
});

// Double-angle identities ----------------------------------------------------

const DOUBLE_HINTS = [
  'Recall $\\sin 2A = 2\\sin A\\cos A$, $\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$, and $\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}$.',
  'Match the expression to one of these forms and identify $A$. The answer is the same function of $2A$.',
];

interface DblForm {
  q: (A: string) => string;
  f: Fn;
  name: string;
  /** The variable appears only once, so the expression typed back would pass the form check. */
  once?: boolean;
}
const DBL_FORMS: DblForm[] = [
  { q: (A) => `2\\sin ${A}\\cos ${A}`, f: 'sin', name: '\\sin 2A = 2\\sin A\\cos A' },
  { q: (A) => `\\cos^2 ${A} - \\sin^2 ${A}`, f: 'cos', name: '\\cos 2A = \\cos^2 A - \\sin^2 A' },
  { q: (A) => `2\\cos^2 ${A} - 1`, f: 'cos', name: '\\cos 2A = 2\\cos^2 A - 1', once: true },
  { q: (A) => `1 - 2\\sin^2 ${A}`, f: 'cos', name: '\\cos 2A = 1 - 2\\sin^2 A', once: true },
  { q: (A) => `\\dfrac{2\\tan ${A}}{1 - \\tan^2 ${A}}`, f: 'tan', name: '\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}' },
];

const DBL_SIMP: Simp[] = [
  { q: '\\dfrac{\\sin 2x}{2\\sin x}', exp: 'cos(x)', ans: '\\cos x', hint: 'mix', steps: [['Double-angle identity', '\\dfrac{2\\sin x\\cos x}{2\\sin x}'], ['Divide out the common factor', '\\cos x']] },
  { q: '\\dfrac{\\sin 2x}{\\cos x}', exp: '2sin(x)', ans: '2\\sin x', hint: 'mix', steps: [['Double-angle identity', '\\dfrac{2\\sin x\\cos x}{\\cos x}'], ['Divide out the common factor', '2\\sin x']] },
  { q: '\\dfrac{\\sin 2x}{1 + \\cos 2x}', exp: 'tan(x)', ans: '\\tan x', hint: 'mix', steps: [['Double-angle identities', '\\dfrac{2\\sin x\\cos x}{1 + (2\\cos^2 x - 1)}'], ['Simplify', '\\dfrac{2\\sin x\\cos x}{2\\cos^2 x}'], ['Divide out the common factor', '\\dfrac{\\sin x}{\\cos x}'], ['Quotient identity', '\\tan x']] },
  { q: '\\dfrac{1 - \\cos 2x}{\\sin 2x}', exp: 'tan(x)', ans: '\\tan x', hint: 'mix', steps: [['Double-angle identities', '\\dfrac{1 - (1 - 2\\sin^2 x)}{2\\sin x\\cos x}'], ['Simplify', '\\dfrac{2\\sin^2 x}{2\\sin x\\cos x}'], ['Divide out the common factor', '\\dfrac{\\sin x}{\\cos x}'], ['Quotient identity', '\\tan x']] },
  { q: '\\dfrac{1 + \\cos 2x}{\\sin 2x}', exp: 'cot(x)', ans: '\\cot x', hint: 'mix', steps: [['Double-angle identities', '\\dfrac{1 + (2\\cos^2 x - 1)}{2\\sin x\\cos x}'], ['Simplify', '\\dfrac{2\\cos^2 x}{2\\sin x\\cos x}'], ['Divide out the common factor', '\\dfrac{\\cos x}{\\sin x}'], ['Quotient identity', '\\cot x']] },
  { q: '\\dfrac{1 - \\cos 2x}{1 + \\cos 2x}', exp: 'tan^2(x)', ans: '\\tan^2 x', hint: 'mix', steps: [['Double-angle identities', '\\dfrac{1 - (1 - 2\\sin^2 x)}{1 + (2\\cos^2 x - 1)}'], ['Simplify', '\\dfrac{2\\sin^2 x}{2\\cos^2 x}'], ['Quotient identity', '\\tan^2 x']] },
  { q: '\\cos^4 x - \\sin^4 x', exp: 'cos(2x)', ans: '\\cos 2x', hint: 'mix', steps: [['Factor the difference of squares', '(\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x)'], ['Pythagorean identity', '(\\cos^2 x - \\sin^2 x)(1)'], ['Double-angle identity', '\\cos 2x']] },
  { q: '(\\sin x + \\cos x)^2 - 1', exp: 'sin(2x)', ans: '\\sin 2x', hint: 'mix', steps: [['Expand', '\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x - 1'], ['Pythagorean identity', '1 + 2\\sin x\\cos x - 1'], ['Simplify', '2\\sin x\\cos x'], ['Double-angle identity', '\\sin 2x']] },
  { q: '\\dfrac{\\sin 2x}{1 - \\cos^2 x}', exp: '2cot(x)', ans: '2\\cot x', hint: 'mix', steps: [['Double-angle and Pythagorean identities', '\\dfrac{2\\sin x\\cos x}{\\sin^2 x}'], ['Divide out the common factor', '\\dfrac{2\\cos x}{\\sin x}'], ['Quotient identity', '2\\cot x']] },
  { q: '\\dfrac{\\cos 2x + 1}{2\\cos x}', exp: 'cos(x)', ans: '\\cos x', hint: 'mix', steps: [['Double-angle identity', '\\dfrac{2\\cos^2 x - 1 + 1}{2\\cos x}'], ['Simplify', '\\dfrac{2\\cos^2 x}{2\\cos x}'], ['Divide out the common factor', '\\cos x']] },
  { q: '\\dfrac{1 - \\cos 2x}{2\\sin x}', exp: 'sin(x)', ans: '\\sin x', hint: 'mix', steps: [['Double-angle identity', '\\dfrac{1 - (1 - 2\\sin^2 x)}{2\\sin x}'], ['Simplify', '\\dfrac{2\\sin^2 x}{2\\sin x}'], ['Divide out the common factor', '\\sin x']] },
  { q: '2\\cos x\\csc 2x', exp: 'csc(x)', ans: '\\csc x', hint: 'mix', steps: [['Reciprocal identity', '\\dfrac{2\\cos x}{\\sin 2x}'], ['Double-angle identity', '\\dfrac{2\\cos x}{2\\sin x\\cos x}'], ['Divide out the common factor', '\\dfrac{1}{\\sin x}'], ['Reciprocal identity', '\\csc x']] },
];

const doubleAngle = skill({
  id: 'm301-double-angle',
  name: 'Double-angle identities',
  description: 'Use the double-angle identities to write an expression as a single function, evaluate it exactly, and find sin 2θ, cos 2θ or tan 2θ from one ratio and the quadrant of θ.',
  outcomes: ['T6'],
  lessonId: 'm301-6-2',
  gen(rng, d) {
    if (d === 1) {
      const expr = rng.chance(0.5);
      // In 2cos²A − 1 and 1 − 2sin²A the variable appears once, so typing the expression back would pass the form check.
      const form = rng.pick(expr ? DBL_FORMS.filter((f) => !f.once) : DBL_FORMS);
      if (expr) {
        const half = rng.chance(0.2);
        const m = half ? 0 : rng.int(1, 5);
        const A = half ? '\\dfrac{x}{2}' : coefX(m);
        const res = half ? 'x' : coefX(2 * m);
        const q = form.q(A);
        const ans = `\\${form.f} ${res}`;
        return {
          prompt: `Write $${q}$ as a single trigonometric function. Type $\\sin 2x$ as \`sin 2x\`.`,
          parts: [part({ kind: 'expression', expected: `${form.f}(${res})`, form: 'single-function' }, { label: 'Single function:', placeholder: 'For example: sin 8x' })],
          hints: DOUBLE_HINTS,
          solution: [`This matches $${form.name}$ with $A = ${A}$.`, `So $${q} = \\${form.f}\\left(2\\cdot${half ? '\\dfrac{x}{2}' : A}\\right) = ${ans}$.`],
          answerDisplay: `$${ans}$`,
        };
      }
      const u: Unit = rng.chance(0.6) ? 'deg' : 'rad';
      const th = rng.pick(form.f === 'tan' ? [15, 22.5, 75, 67.5, 105, 112.5, 165] : [15, 22.5, 75, 67.5, 105, 112.5, 165, 157.5]);
      const value = exactTrig(form.f, 2 * th)!;
      const A = u === 'deg' ? dg(th) : radTex(th, '\\frac');
      const q = form.q(u === 'deg' ? A : `\\left(${A}\\right)`);
      return {
        prompt: `Use a double-angle identity to determine the exact value of $${q}$. ${EXACT_NOTE}`,
        parts: [numPart(exValue(value), { label: 'Exact value' })],
        hints: DOUBLE_HINTS,
        solution: [`This matches $${form.name}$ with $A = ${A}$.`, `So the expression equals $\\${form.f}\\left(2\\cdot ${A}\\right) = \\${form.f} ${angTex(2 * th, u)}$.`, `$\\${form.f} ${angTex(2 * th, u)} = ${exLatex(value)}$`],
        answerDisplay: `$${exLatex(value)}$`,
      };
    }
    if (d === 2) {
      const name = '\\theta';
      const a = makeAngle(rng, name);
      const f = rng.pick(['sin', 'cos', 'tan'] as const);
      let value: Frac;
      let work: string[];
      if (f === 'sin') {
        value = fracMul(frac(2), fracMul(a.sin, a.cos));
        work = [`$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$`, `$= 2${flp(a.sin)}${flp(a.cos)}$`];
      } else if (f === 'cos') {
        value = fracSub(fracMul(a.cos, a.cos), fracMul(a.sin, a.sin));
        work = [`$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta$`, `$= ${flp(a.cos)}^2 - ${flp(a.sin)}^2$`, `$= ${fl(fracMul(a.cos, a.cos))} - ${fl(fracMul(a.sin, a.sin))}$`];
      } else {
        const top = fracMul(frac(2), a.tan);
        const bottom = fracSub(frac(1), fracMul(a.tan, a.tan));
        value = fracDiv(top, bottom);
        work = [`$\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}$`, `$= \\dfrac{2${flp(a.tan)}}{1 - ${flp(a.tan)}^2}$`, `$= \\dfrac{${fl(top)}}{${fl(bottom)}}$`];
      }
      return {
        prompt: `Given ${a.given}, determine the exact value of $\\${f} 2\\theta$.`,
        parts: [numPart(fracValue(value), { label: `$\\${f} 2\\theta =$`, display: 'fraction' })],
        hints: [
          'Sketch $\\theta$ in its quadrant and use $x^2 + y^2 = r^2$ to find the missing side. The quadrant gives its sign.',
          f === 'sin' ? 'Use $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$.' : f === 'cos' ? 'Use $\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta$ (or another form).' : 'Use $\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}$.',
        ],
        solution: [...a.steps, ...work, `$= ${fl(value)}$`],
        answerDisplay: `$${fl(value)}$`,
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      const s = rng.pick(DBL_SIMP);
      const target = 'a constant or a single trigonometric term';
      return {
        prompt: `Use identities to simplify $${s.q}$ to ${target}. ${SIMP_NOTE}`,
        parts: [part({ kind: 'expression', expected: s.exp, form: 'single-function' }, { label: 'Simplified:', placeholder: 'Your simplified expression' })],
        hints: [DOUBLE_HINTS[0], 'Replace each double angle with an expression in $\\sin x$ and $\\cos x$, choosing the form of $\\cos 2x$ that cancels the 1. Then factor and divide out common factors.'],
        solution: [...chain(s.q, s.steps), `So $${s.q} = ${s.ans}$.`],
        answerDisplay: `$${s.ans}$`,
      };
    }
    // A ratio that is not from a Pythagorean triple: the other ratio is a radical.
    const { p, r } = retry(
      () => {
        const rr = rng.int(3, 7);
        return { p: rng.int(1, rr - 1), r: rr };
      },
      (o) => {
        const k = o.r * o.r - o.p * o.p;
        return Math.round(Math.sqrt(k)) ** 2 !== k && o.r * o.r !== 2 * o.p * o.p;
      },
    );
    const q = rng.int(1, 4);
    const sx = q === 1 || q === 4 ? 1 : -1;
    const sy = q <= 2 ? 1 : -1;
    const givenSin = rng.chance(0.5);
    const rad = r * r - p * p;
    const sinE = givenSin ? ex(sy * p, r) : ex(sy, r, rad);
    const cosE = givenSin ? ex(sx, r, rad) : ex(sx * p, r);
    const sin2 = exScale(exMul(sinE, cosE), frac(2));
    const cos2 = exAdd(exMul(cosE, cosE), exNeg(exMul(sinE, sinE)));
    const f = rng.pick(['sin', 'cos', 'tan'] as const);
    const value = f === 'sin' ? sin2 : f === 'cos' ? cos2 : exDiv(sin2, cos2);
    const style = rng.int(0, 2);
    const where = style === 0 ? `$\\theta$ is in quadrant ${ROMAN[q]}` : style === 1 ? `$${QUAD_DEG[q].replace('N', '\\theta')}$` : `$${QUAD_RAD[q].replace('N', '\\theta')}$`;
    const given = givenSin ? `$\\sin\\theta = ${exLatex(sinE)}$` : `$\\cos\\theta = ${exLatex(cosE)}$`;
    const findOther = givenSin
      ? `$\\cos\\theta = ${sx < 0 ? '-' : ''}\\sqrt{1 - \\left(${fl(frac(p, r))}\\right)^2} = ${sx < 0 ? '-' : ''}\\sqrt{\\dfrac{${rad}}{${r * r}}} = ${exLatex(cosE)}$ (${sx < 0 ? 'negative' : 'positive'} in quadrant ${ROMAN[q]})`
      : `$\\sin\\theta = ${sy < 0 ? '-' : ''}\\sqrt{1 - \\left(${fl(frac(p, r))}\\right)^2} = ${sy < 0 ? '-' : ''}\\sqrt{\\dfrac{${rad}}{${r * r}}} = ${exLatex(sinE)}$ (${sy < 0 ? 'negative' : 'positive'} in quadrant ${ROMAN[q]})`;
    const work: string[] = [];
    const sinWork = [`$\\sin 2\\theta = 2\\sin\\theta\\cos\\theta = 2${exParen(sinE)}${exParen(cosE)} = ${exLatex(sin2)}$`];
    const cosWork = [
      givenSin
        ? `$\\cos 2\\theta = 1 - 2\\sin^2\\theta = 1 - 2${exParen(sinE)}^2 = ${exLatex(cos2)}$`
        : `$\\cos 2\\theta = 2\\cos^2\\theta - 1 = 2${exParen(cosE)}^2 - 1 = ${exLatex(cos2)}$`,
    ];
    if (f === 'sin') work.push(...sinWork);
    else if (f === 'cos') work.push(...cosWork);
    else work.push(...sinWork, ...cosWork, `$\\tan 2\\theta = \\dfrac{\\sin 2\\theta}{\\cos 2\\theta} = \\dfrac{${exLatex(sin2)}}{${exLatex(cos2)}} = ${exLatex(value)}$`);
    return {
      prompt: `Given ${given}, where ${where}, determine the exact value of $\\${f} 2\\theta$. ${EXACT_NOTE}`,
      parts: [numPart(exValue(value), { label: `$\\${f} 2\\theta =$` })],
      hints: [
        `Use $\\sin^2\\theta + \\cos^2\\theta = 1$ to find $${givenSin ? '\\cos' : '\\sin'}\\theta$; its sign comes from the quadrant.`,
        f === 'tan' ? 'Find $\\sin 2\\theta$ and $\\cos 2\\theta$, then divide.' : f === 'sin' ? 'Use $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$.' : `Use the form of $\\cos 2\\theta$ that needs only $${givenSin ? '\\sin' : '\\cos'}\\theta$.`,
      ],
      solution: [findOther, ...work, `$\\${f} 2\\theta = ${exLatex(value)}$ (type it as \`${exText(value)}\`)`],
      answerDisplay: `$${exLatex(value)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.3 — Proving identities
// ---------------------------------------------------------------------------

type Cat = 'rec' | 'quo' | 'pyth' | 'dbl' | 'alg';
interface Ident {
  L: (v: string) => string;
  R: (v: string) => string;
  lf: (x: number) => number;
  rf: (x: number) => number;
  npv: number[];
  npvWhy: string;
  proof: Array<[string, string, Cat]>;
  next: Array<{ at: number; wrong: string[] }>;
  err: { at: number; lines: string[]; why: string };
  wrongR: string[];
}

const sin = Math.sin;
const cos = Math.cos;
const tan = Math.tan;
const IDENTS: Ident[] = [
  {
    L: (v) => `\\sec ${v} - \\cos ${v}`,
    R: (v) => `\\sin ${v}\\tan ${v}`,
    lf: (x) => 1 / cos(x) - cos(x),
    rf: (x) => sin(x) * tan(x),
    npv: [90, 270],
    npvWhy: '$\\sec x$ and $\\tan x$ are undefined when $\\cos x = 0$.',
    proof: [
      ['\\dfrac{1}{\\cos x} - \\cos x', 'reciprocal identity', 'rec'],
      ['\\dfrac{1 - \\cos^2 x}{\\cos x}', 'common denominator', 'alg'],
      ['\\dfrac{\\sin^2 x}{\\cos x}', 'Pythagorean identity', 'pyth'],
      ['\\sin x\\cdot\\dfrac{\\sin x}{\\cos x}', 'write as a product', 'alg'],
      ['\\sin x\\tan x', 'quotient identity', 'quo'],
    ],
    next: [
      { at: 1, wrong: ['\\dfrac{1 - \\cos x}{\\cos x}', '1 - \\cos^2 x', '\\dfrac{\\cos x - 1}{\\cos x}'] },
      { at: 2, wrong: ['\\dfrac{\\cos^2 x}{\\cos x}', '\\dfrac{-\\sin^2 x}{\\cos x}', '\\dfrac{\\sin x}{\\cos x}'] },
    ],
    err: {
      at: 1,
      lines: ['\\dfrac{1}{\\cos x} - \\cos x', '\\dfrac{1 - \\cos x}{\\cos x}', '\\dfrac{1}{\\cos x} - 1', '\\sec x - 1'],
      why: 'To subtract, $\\cos x$ must be written as $\\dfrac{\\cos^2 x}{\\cos x}$, so the numerator is $1 - \\cos^2 x$, not $1 - \\cos x$.',
    },
    wrongR: ['\\cos x\\tan x', '\\sin^2 x', '\\sec x\\tan x'],
  },
  {
    L: (v) => `\\dfrac{1 - \\cos^2 ${v}}{\\sin ${v}\\cos ${v}}`,
    R: (v) => `\\tan ${v}`,
    lf: (x) => (1 - cos(x) ** 2) / (sin(x) * cos(x)),
    rf: (x) => tan(x),
    npv: [0, 90, 180, 270],
    npvWhy: 'The left side has $\\sin x\\cos x$ in the denominator, so $\\sin x \\ne 0$ and $\\cos x \\ne 0$.',
    proof: [
      ['\\dfrac{\\sin^2 x}{\\sin x\\cos x}', 'Pythagorean identity', 'pyth'],
      ['\\dfrac{\\sin x}{\\cos x}', 'divide out the common factor $\\sin x$', 'alg'],
      ['\\tan x', 'quotient identity', 'quo'],
    ],
    next: [
      { at: 0, wrong: ['\\dfrac{\\cos^2 x}{\\sin x\\cos x}', '\\dfrac{-\\sin^2 x}{\\sin x\\cos x}', '\\dfrac{1 - \\cos x}{\\sin x}'] },
      { at: 1, wrong: ['\\dfrac{1}{\\cos x}', '\\dfrac{\\sin^2 x}{\\cos x}', '\\sin x\\cos x'] },
    ],
    err: {
      at: 0,
      lines: ['\\dfrac{1 - \\cos x}{\\sin x}', '\\dfrac{1}{\\sin x} - \\dfrac{\\cos x}{\\sin x}', '\\csc x - \\cot x'],
      why: '$\\cos x$ is not a factor of the whole numerator $1 - \\cos^2 x$, so it cannot be divided out. Replace $1 - \\cos^2 x$ with $\\sin^2 x$ first.',
    },
    wrongR: ['\\cot x', '\\sin x', '\\sec x'],
  },
  {
    L: (v) => `\\csc ${v} - \\sin ${v}`,
    R: (v) => `\\cos ${v}\\cot ${v}`,
    lf: (x) => 1 / sin(x) - sin(x),
    rf: (x) => cos(x) / tan(x),
    npv: [0, 180],
    npvWhy: '$\\csc x$ and $\\cot x$ are undefined when $\\sin x = 0$.',
    proof: [
      ['\\dfrac{1}{\\sin x} - \\sin x', 'reciprocal identity', 'rec'],
      ['\\dfrac{1 - \\sin^2 x}{\\sin x}', 'common denominator', 'alg'],
      ['\\dfrac{\\cos^2 x}{\\sin x}', 'Pythagorean identity', 'pyth'],
      ['\\cos x\\cdot\\dfrac{\\cos x}{\\sin x}', 'write as a product', 'alg'],
      ['\\cos x\\cot x', 'quotient identity', 'quo'],
    ],
    next: [
      { at: 2, wrong: ['\\dfrac{\\sin^2 x}{\\sin x}', '\\dfrac{\\cos x}{\\sin x}', '\\dfrac{-\\cos^2 x}{\\sin x}'] },
      { at: 4, wrong: ['\\cos x\\tan x', '\\cot^2 x', '\\sin x\\cot x'] },
    ],
    err: {
      at: 2,
      lines: ['\\dfrac{1}{\\sin x} - \\sin x', '\\dfrac{1 - \\sin^2 x}{\\sin x}', '\\dfrac{\\cos x}{\\sin x}', '\\cot x'],
      why: 'By the Pythagorean identity, $1 - \\sin^2 x = \\cos^2 x$, not $\\cos x$.',
    },
    wrongR: ['\\cot x', '\\cos x\\tan x', '\\sin x\\cot x'],
  },
  {
    L: (v) => `(1 + \\tan^2 ${v})(1 - \\sin^2 ${v})`,
    R: () => '1',
    lf: (x) => (1 + tan(x) ** 2) * (1 - sin(x) ** 2),
    rf: () => 1,
    npv: [90, 270],
    npvWhy: '$\\tan x$ is undefined when $\\cos x = 0$.',
    proof: [
      ['\\sec^2 x\\cos^2 x', 'Pythagorean identities', 'pyth'],
      ['\\dfrac{1}{\\cos^2 x}\\cdot\\cos^2 x', 'reciprocal identity', 'rec'],
      ['1', 'simplify', 'alg'],
    ],
    next: [{ at: 0, wrong: ['\\sec^2 x\\sin^2 x', '\\csc^2 x\\cos^2 x', '\\tan^2 x\\cos^2 x'] }],
    err: {
      at: 0,
      lines: ['\\csc^2 x\\cos^2 x', '\\dfrac{\\cos^2 x}{\\sin^2 x}', '\\cot^2 x'],
      why: 'The Pythagorean identity is $1 + \\tan^2 x = \\sec^2 x$. The identity $1 + \\cot^2 x = \\csc^2 x$ was used by mistake.',
    },
    wrongR: ['\\tan^2 x', '\\sec^2 x', '\\cos^2 x'],
  },
  {
    L: (v) => `\\dfrac{\\cos ${v}}{1 - \\sin ${v}}`,
    R: (v) => `\\dfrac{1 + \\sin ${v}}{\\cos ${v}}`,
    lf: (x) => cos(x) / (1 - sin(x)),
    rf: (x) => (1 + sin(x)) / cos(x),
    npv: [90, 270],
    npvWhy: 'The left side needs $\\sin x \\ne 1$ and the right side needs $\\cos x \\ne 0$; both are covered by $\\cos x \\ne 0$.',
    proof: [
      ['\\dfrac{\\cos x}{1 - \\sin x}\\cdot\\dfrac{1 + \\sin x}{1 + \\sin x}', 'multiply by the conjugate', 'alg'],
      ['\\dfrac{\\cos x(1 + \\sin x)}{1 - \\sin^2 x}', 'difference of squares', 'alg'],
      ['\\dfrac{\\cos x(1 + \\sin x)}{\\cos^2 x}', 'Pythagorean identity', 'pyth'],
      ['\\dfrac{1 + \\sin x}{\\cos x}', 'divide out the common factor $\\cos x$', 'alg'],
    ],
    next: [
      { at: 0, wrong: ['\\dfrac{\\cos x}{1} - \\dfrac{\\cos x}{\\sin x}', '\\dfrac{1}{1 - \\tan x}', '\\dfrac{\\cos^2 x}{1 - \\sin^2 x}'] },
      { at: 2, wrong: ['\\dfrac{\\cos x(1 + \\sin x)}{\\sin^2 x}', '\\dfrac{\\cos x(1 + \\sin x)}{-\\cos^2 x}', '\\dfrac{\\cos x(1 + \\sin x)}{\\cos x}'] },
    ],
    err: {
      at: 2,
      lines: ['\\dfrac{\\cos x}{1 - \\sin x}\\cdot\\dfrac{1 + \\sin x}{1 + \\sin x}', '\\dfrac{\\cos x(1 + \\sin x)}{1 - \\sin^2 x}', '\\dfrac{\\cos x(1 + \\sin x)}{-\\cos^2 x}', '-\\dfrac{1 + \\sin x}{\\cos x}'],
      why: 'From $\\sin^2 x + \\cos^2 x = 1$, $1 - \\sin^2 x = \\cos^2 x$, not $-\\cos^2 x$.',
    },
    wrongR: ['\\dfrac{1 - \\sin x}{\\cos x}', '\\dfrac{1}{1 - \\tan x}', '\\dfrac{\\cos x}{1 + \\sin x}'],
  },
  {
    L: (v) => `\\dfrac{\\sin 2${v}}{1 + \\cos 2${v}}`,
    R: (v) => `\\tan ${v}`,
    lf: (x) => sin(2 * x) / (1 + cos(2 * x)),
    rf: (x) => tan(x),
    npv: [90, 270],
    npvWhy: '$1 + \\cos 2x = 0$ when $2x = 180^\\circ + 360^\\circ n$, that is, when $\\cos x = 0$; $\\tan x$ is undefined there too.',
    proof: [
      ['\\dfrac{2\\sin x\\cos x}{1 + (2\\cos^2 x - 1)}', 'double-angle identities', 'dbl'],
      ['\\dfrac{2\\sin x\\cos x}{2\\cos^2 x}', 'simplify the denominator', 'alg'],
      ['\\dfrac{\\sin x}{\\cos x}', 'divide out $2\\cos x$', 'alg'],
      ['\\tan x', 'quotient identity', 'quo'],
    ],
    next: [
      { at: 0, wrong: ['\\dfrac{2\\sin x}{1 + 2\\cos x}', '\\dfrac{2\\sin x\\cos x}{1 + (1 - 2\\cos^2 x)}', '\\dfrac{\\sin^2 x}{1 + \\cos^2 x}'] },
      { at: 1, wrong: ['\\dfrac{2\\sin x\\cos x}{2\\cos^2 x - 2}', '\\dfrac{2\\sin x\\cos x}{2\\cos x}', '\\dfrac{2\\sin x\\cos x}{\\cos^2 x}'] },
    ],
    err: {
      at: 0,
      lines: ['\\dfrac{2\\sin x}{1 + (2\\cos^2 x - 1)}', '\\dfrac{2\\sin x}{2\\cos^2 x}', '\\dfrac{\\sin x}{\\cos^2 x}', '\\tan x\\sec x'],
      why: 'The double-angle identity is $\\sin 2x = 2\\sin x\\cos x$; the factor $\\cos x$ is missing.',
    },
    wrongR: ['\\cot x', '\\sin x', '2\\tan x'],
  },
  {
    L: (v) => `(\\sin ${v} + \\cos ${v})^2`,
    R: (v) => `1 + \\sin 2${v}`,
    lf: (x) => (sin(x) + cos(x)) ** 2,
    rf: (x) => 1 + sin(2 * x),
    npv: [],
    npvWhy: 'Sine and cosine are defined for every real number, and there are no denominators.',
    proof: [
      ['\\sin^2 x + 2\\sin x\\cos x + \\cos^2 x', 'expand', 'alg'],
      ['(\\sin^2 x + \\cos^2 x) + 2\\sin x\\cos x', 'rearrange', 'alg'],
      ['1 + 2\\sin x\\cos x', 'Pythagorean identity', 'pyth'],
      ['1 + \\sin 2x', 'double-angle identity', 'dbl'],
    ],
    next: [
      { at: 0, wrong: ['\\sin^2 x + \\cos^2 x', '\\sin^2 x + \\sin x\\cos x + \\cos^2 x', '2\\sin^2 x + 2\\cos^2 x'] },
      { at: 3, wrong: ['1 + 2\\sin 2x', '1 + \\cos 2x', '2\\sin 2x'] },
    ],
    err: {
      at: 0,
      lines: ['\\sin^2 x + \\cos^2 x', '1'],
      why: '$(a + b)^2 = a^2 + 2ab + b^2$: the middle term $2\\sin x\\cos x$ is missing.',
    },
    wrongR: ['1', '1 + \\cos 2x', '\\sin 2x'],
  },
  {
    L: (v) => `\\cos^4 ${v} - \\sin^4 ${v}`,
    R: (v) => `\\cos 2${v}`,
    lf: (x) => cos(x) ** 4 - sin(x) ** 4,
    rf: (x) => cos(2 * x),
    npv: [],
    npvWhy: 'Sine and cosine are defined for every real number, and there are no denominators.',
    proof: [
      ['(\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x)', 'difference of squares', 'alg'],
      ['(\\cos^2 x - \\sin^2 x)(1)', 'Pythagorean identity', 'pyth'],
      ['\\cos 2x', 'double-angle identity', 'dbl'],
    ],
    next: [
      { at: 0, wrong: ['(\\cos^2 x - \\sin^2 x)^2', '(\\cos x - \\sin x)^4', '(\\cos x - \\sin x)(\\cos^3 x + \\sin^3 x)'] },
      { at: 2, wrong: ['\\sin 2x', '-\\cos 2x', '\\cos^2 2x'] },
    ],
    err: {
      at: 0,
      lines: ['(\\cos^2 x - \\sin^2 x)^2', '(\\cos 2x)^2', '\\cos^2 2x'],
      why: 'A difference of squares factors as $a^2 - b^2 = (a - b)(a + b)$, so $\\cos^4 x - \\sin^4 x = (\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x)$.',
    },
    wrongR: ['\\sin 2x', '1', '\\cos^2 2x'],
  },
  {
    L: (v) => `\\tan ${v} + \\cot ${v}`,
    R: (v) => `\\sec ${v}\\csc ${v}`,
    lf: (x) => tan(x) + 1 / tan(x),
    rf: (x) => 1 / (cos(x) * sin(x)),
    npv: [0, 90, 180, 270],
    npvWhy: '$\\tan x$ and $\\sec x$ need $\\cos x \\ne 0$; $\\cot x$ and $\\csc x$ need $\\sin x \\ne 0$.',
    proof: [
      ['\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x}', 'quotient identities', 'quo'],
      ['\\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x}', 'common denominator', 'alg'],
      ['\\dfrac{1}{\\sin x\\cos x}', 'Pythagorean identity', 'pyth'],
      ['\\dfrac{1}{\\cos x}\\cdot\\dfrac{1}{\\sin x}', 'write as a product', 'alg'],
      ['\\sec x\\csc x', 'reciprocal identities', 'rec'],
    ],
    next: [
      { at: 1, wrong: ['\\dfrac{\\sin x + \\cos x}{\\sin x\\cos x}', '\\dfrac{\\sin x + \\cos x}{\\cos x + \\sin x}', '\\dfrac{\\sin^2 x + \\cos^2 x}{\\sin x + \\cos x}'] },
      { at: 4, wrong: ['\\sec x + \\csc x', '\\sin x\\cos x', '\\csc x\\cot x'] },
    ],
    err: {
      at: 1,
      lines: ['\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x}', '\\dfrac{\\sin x + \\cos x}{\\sin x\\cos x}', '\\dfrac{1}{\\cos x} + \\dfrac{1}{\\sin x}', '\\sec x + \\csc x'],
      why: 'Each numerator must be multiplied by the factor missing from its denominator: $\\dfrac{\\sin x}{\\cos x} = \\dfrac{\\sin^2 x}{\\sin x\\cos x}$ and $\\dfrac{\\cos x}{\\sin x} = \\dfrac{\\cos^2 x}{\\sin x\\cos x}$.',
    },
    wrongR: ['\\sec x + \\csc x', '1', '\\sin x\\cos x'],
  },
  {
    L: (v) => `\\dfrac{\\sin ${v}}{1 + \\cos ${v}} + \\dfrac{1 + \\cos ${v}}{\\sin ${v}}`,
    R: (v) => `2\\csc ${v}`,
    lf: (x) => sin(x) / (1 + cos(x)) + (1 + cos(x)) / sin(x),
    rf: (x) => 2 / sin(x),
    npv: [0, 180],
    npvWhy: 'The denominators need $\\sin x \\ne 0$ and $\\cos x \\ne -1$; both are covered by $\\sin x \\ne 0$.',
    proof: [
      ['\\dfrac{\\sin^2 x + (1 + \\cos x)^2}{\\sin x(1 + \\cos x)}', 'common denominator', 'alg'],
      ['\\dfrac{\\sin^2 x + 1 + 2\\cos x + \\cos^2 x}{\\sin x(1 + \\cos x)}', 'expand', 'alg'],
      ['\\dfrac{2 + 2\\cos x}{\\sin x(1 + \\cos x)}', 'Pythagorean identity', 'pyth'],
      ['\\dfrac{2(1 + \\cos x)}{\\sin x(1 + \\cos x)}', 'factor', 'alg'],
      ['\\dfrac{2}{\\sin x}', 'divide out the common factor $1 + \\cos x$', 'alg'],
      ['2\\csc x', 'reciprocal identity', 'rec'],
    ],
    next: [
      { at: 1, wrong: ['\\dfrac{\\sin^2 x + 1 + \\cos^2 x}{\\sin x(1 + \\cos x)}', '\\dfrac{\\sin^2 x + 1 + \\cos x + \\cos^2 x}{\\sin x(1 + \\cos x)}', '\\dfrac{\\sin^2 x + 2 + 2\\cos x}{\\sin x(1 + \\cos x)}'] },
      { at: 4, wrong: ['\\dfrac{2}{\\sin x(1 + \\cos x)}', '\\dfrac{2\\cos x}{\\sin x}', '2\\sin x'] },
    ],
    err: {
      at: 1,
      lines: ['\\dfrac{\\sin^2 x + (1 + \\cos x)^2}{\\sin x(1 + \\cos x)}', '\\dfrac{\\sin^2 x + 1 + \\cos^2 x}{\\sin x(1 + \\cos x)}', '\\dfrac{2}{\\sin x(1 + \\cos x)}'],
      why: '$(1 + \\cos x)^2 = 1 + 2\\cos x + \\cos^2 x$; the middle term $2\\cos x$ is missing.',
    },
    wrongR: ['2\\sec x', '\\csc x', '2\\sin x'],
  },
  {
    L: (v) => `\\dfrac{1}{1 - \\sin ${v}} + \\dfrac{1}{1 + \\sin ${v}}`,
    R: (v) => `2\\sec^2 ${v}`,
    lf: (x) => 1 / (1 - sin(x)) + 1 / (1 + sin(x)),
    rf: (x) => 2 / cos(x) ** 2,
    npv: [90, 270],
    npvWhy: 'The denominators need $\\sin x \\ne 1$ and $\\sin x \\ne -1$, which is the same as $\\cos x \\ne 0$.',
    proof: [
      ['\\dfrac{(1 + \\sin x) + (1 - \\sin x)}{(1 - \\sin x)(1 + \\sin x)}', 'common denominator', 'alg'],
      ['\\dfrac{2}{1 - \\sin^2 x}', 'simplify', 'alg'],
      ['\\dfrac{2}{\\cos^2 x}', 'Pythagorean identity', 'pyth'],
      ['2\\sec^2 x', 'reciprocal identity', 'rec'],
    ],
    next: [
      { at: 1, wrong: ['\\dfrac{2\\sin x}{1 - \\sin^2 x}', '\\dfrac{2}{1 + \\sin^2 x}', '\\dfrac{2}{1 - \\sin x}'] },
      { at: 2, wrong: ['\\dfrac{2}{\\sin^2 x}', '\\dfrac{2}{-\\cos^2 x}', '\\dfrac{2}{\\cos x}'] },
    ],
    err: {
      at: 2,
      lines: ['\\dfrac{(1 + \\sin x) + (1 - \\sin x)}{(1 - \\sin x)(1 + \\sin x)}', '\\dfrac{2}{1 - \\sin^2 x}', '\\dfrac{2}{\\cos x}', '2\\sec x'],
      why: 'By the Pythagorean identity, $1 - \\sin^2 x = \\cos^2 x$, not $\\cos x$.',
    },
    wrongR: ['2\\sec x', '2\\csc^2 x', '2'],
  },
  {
    L: (v) => `\\dfrac{\\sin 2${v}}{\\sin ${v}} - \\dfrac{\\cos 2${v}}{\\cos ${v}}`,
    R: (v) => `\\sec ${v}`,
    lf: (x) => sin(2 * x) / sin(x) - cos(2 * x) / cos(x),
    rf: (x) => 1 / cos(x),
    npv: [0, 90, 180, 270],
    npvWhy: 'The denominators need $\\sin x \\ne 0$ and $\\cos x \\ne 0$.',
    proof: [
      ['\\dfrac{2\\sin x\\cos x}{\\sin x} - \\dfrac{2\\cos^2 x - 1}{\\cos x}', 'double-angle identities', 'dbl'],
      ['2\\cos x - \\left(2\\cos x - \\dfrac{1}{\\cos x}\\right)', 'simplify each fraction', 'alg'],
      ['\\dfrac{1}{\\cos x}', 'simplify', 'alg'],
      ['\\sec x', 'reciprocal identity', 'rec'],
    ],
    next: [
      { at: 0, wrong: ['\\dfrac{2\\sin x\\cos x}{\\sin x} - \\dfrac{1 - 2\\cos^2 x}{\\cos x}', '\\dfrac{2\\sin x}{\\sin x} - \\dfrac{2\\cos x}{\\cos x}', '2 - 2'] },
      { at: 1, wrong: ['2\\cos x - 2\\cos x - \\dfrac{1}{\\cos x}', '2\\cos x - (2\\cos x - 1)', '2\\cos x - 2\\cos^2 x + 1'] },
    ],
    err: {
      at: 1,
      lines: ['\\dfrac{2\\sin x\\cos x}{\\sin x} - \\dfrac{2\\cos^2 x - 1}{\\cos x}', '2\\cos x - 2\\cos x - \\dfrac{1}{\\cos x}', '-\\dfrac{1}{\\cos x}', '-\\sec x'],
      why: 'Subtracting the whole fraction changes the sign of both of its terms: $-\\left(2\\cos x - \\dfrac{1}{\\cos x}\\right) = -2\\cos x + \\dfrac{1}{\\cos x}$.',
    },
    wrongR: ['-\\sec x', '\\csc x', '4\\cos x - \\sec x'],
  },
];

const CAT_TEXT: Record<Exclude<Cat, 'alg'>, string> = {
  rec: 'A reciprocal identity',
  quo: 'A quotient identity',
  pyth: 'A Pythagorean identity',
  dbl: 'A double-angle identity',
};
const CAT_WHY: Record<Exclude<Cat, 'alg'>, string> = {
  rec: 'The step replaces a reciprocal ratio: $\\csc x = \\dfrac{1}{\\sin x}$, $\\sec x = \\dfrac{1}{\\cos x}$ or $\\cot x = \\dfrac{1}{\\tan x}$.',
  quo: 'The step uses $\\tan x = \\dfrac{\\sin x}{\\cos x}$ or $\\cot x = \\dfrac{\\cos x}{\\sin x}$.',
  pyth: 'The step uses $\\sin^2 x + \\cos^2 x = 1$, $1 + \\tan^2 x = \\sec^2 x$ or $1 + \\cot^2 x = \\csc^2 x$ (or a rearrangement).',
  dbl: 'The step uses $\\sin 2x = 2\\sin x\\cos x$ or one of the forms of $\\cos 2x$.',
};

const TRUE_IDS = [
  '1 + \\tan^2 x = \\sec^2 x',
  '\\sin 2x = 2\\sin x\\cos x',
  '\\cos 2x = 2\\cos^2 x - 1',
  '\\cos 2x = 1 - 2\\sin^2 x',
  '\\tan x\\cos x = \\sin x',
  '\\sec x - \\cos x = \\sin x\\tan x',
  '\\cos^4 x - \\sin^4 x = \\cos 2x',
  '(\\sin x + \\cos x)^2 = 1 + \\sin 2x',
  '\\csc x - \\sin x = \\cos x\\cot x',
  '\\cot x\\sec x = \\csc x',
  '\\sin(\\pi - x) = \\sin x',
  '\\cos(\\pi + x) = -\\cos x',
  '\\dfrac{1 - \\cos 2x}{2} = \\sin^2 x',
];
const FALSE_IDS: Array<[string, string]> = [
  ['\\sin 2x = 2\\sin x', 'At $x = \\dfrac{\\pi}{2}$: $\\sin\\pi = 0$, but $2\\sin\\dfrac{\\pi}{2} = 2$.'],
  ['\\cos 2x = 1 - 2\\cos^2 x', 'At $x = 0$: $\\cos 0 = 1$, but $1 - 2\\cos^2 0 = -1$.'],
  ['1 + \\cot^2 x = \\sec^2 x', 'At $x = \\dfrac{\\pi}{6}$: $1 + \\cot^2\\dfrac{\\pi}{6} = 1 + 3 = 4$, but $\\sec^2\\dfrac{\\pi}{6} = \\dfrac{4}{3}$.'],
  ['\\tan x + \\cot x = \\sec x + \\csc x', 'At $x = \\dfrac{\\pi}{4}$: $1 + 1 = 2$, but $\\sqrt{2} + \\sqrt{2} = 2\\sqrt{2}$.'],
  ['(\\sin x + \\cos x)^2 = 1', 'At $x = \\dfrac{\\pi}{4}$: $\\left(\\dfrac{\\sqrt{2}}{2} + \\dfrac{\\sqrt{2}}{2}\\right)^2 = (\\sqrt{2})^2 = 2$, not $1$.'],
  ['\\cos(\\pi - x) = \\cos x', 'At $x = 0$: $\\cos\\pi = -1$, but $\\cos 0 = 1$.'],
  ['\\sec^2 x - \\tan^2 x = \\sin^2 x', 'At $x = 0$: $\\sec^2 0 - \\tan^2 0 = 1 - 0 = 1$, but $\\sin^2 0 = 0$.'],
  ['\\cos^2 x - \\sin^2 x = 1', 'At $x = \\dfrac{\\pi}{4}$: $\\dfrac{1}{2} - \\dfrac{1}{2} = 0$, not $1$.'],
  ['\\dfrac{\\sin x}{\\tan x} = \\sin x', 'At $x = \\dfrac{\\pi}{3}$: $\\dfrac{\\sin\\frac{\\pi}{3}}{\\tan\\frac{\\pi}{3}} = \\dfrac{\\frac{\\sqrt{3}}{2}}{\\sqrt{3}} = \\dfrac{1}{2}$, but $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.'],
];

function proofTex(id: Ident, lines: string[]): string {
  const L = id.L('x');
  return `$$\\begin{aligned} ${L} &= ${lines.join(' \\\\ &= ')} \\end{aligned}$$`;
}

const identityProve = skill({
  id: 'm301-identity-prove',
  name: 'Proving identities',
  description: 'Verify an identity numerically, justify and choose steps in an algebraic proof, find the error in a proof, and state the non-permissible values of an identity.',
  outcomes: ['T6'],
  lessonId: 'm301-6-3',
  format: 'mc',
  gen(rng, d) {
    const id = rng.pick(IDENTS);
    const L = id.L('x');
    const R = id.R('x');
    const who = rng.pick(PEOPLE);
    if (d === 1) {
      if (rng.chance(0.5)) {
        // Numerical verification with a calculator.
        const u: Unit = rng.chance(0.65) ? 'deg' : 'rad';
        const x = retry(
          () => (u === 'deg' ? 5 * rng.int(2, 70) : rng.int(2, 60) / 10),
          (t) => {
            const deg = u === 'deg' ? t : t / RAD;
            if (u === 'deg' && t % 15 === 0) return false;
            if (id.npv.some((n) => Math.abs(norm360(deg - n + 180) - 180) < 9) || [0, 90, 180, 270].some((n) => Math.abs(norm360(deg - n + 180) - 180) < 4)) return false;
            const v = id.lf(t * (u === 'deg' ? RAD : 1));
            return Number.isFinite(v) && Math.abs(v) < 30 && safeRound(v, 3);
          },
          200,
        );
        const xr = u === 'deg' ? x * RAD : x;
        const lv = id.lf(xr);
        const rv = id.rf(xr);
        const xs = u === 'deg' ? dg(x) : fmt(x);
        return {
          prompt: `Verify the identity $${L} = ${R}$ numerically for $x = ${xs}$${u === 'rad' ? ' (radians)' : ''}. Evaluate each side with a calculator, ${roundingPhrase(3)}. What value does each side have?`,
          parts: [numPart(lv, { decimals: 3, label: 'Each side' })],
          hints: [
            `Set your calculator to ${u === 'deg' ? 'degree' : 'radian'} mode. Use $\\sec x = \\dfrac{1}{\\cos x}$, $\\csc x = \\dfrac{1}{\\sin x}$ and $\\cot x = \\dfrac{1}{\\tan x}$ for the reciprocal ratios.`,
            'Evaluate the left side and the right side separately. If the equation is an identity, they agree.',
          ],
          solution: [
            `Left side: $${id.L(xs)} \\approx ${fmtFixed(lv, 4)}$`,
            `Right side: $${id.R(xs)} \\approx ${fmtFixed(rv, 4)}$`,
            'The two sides agree, so the identity holds for this value of $x$. (A numerical check supports an identity; only an algebraic proof shows it is true for every permissible value.)',
            `Each side $\\approx ${fmtFixed(lv, 3)}$`,
          ],
          calculator: true,
        };
      }
      const steps = id.proof.map((p, i) => ({ i, cat: p[2] })).filter((s) => s.cat !== 'alg');
      const { i, cat } = rng.pick(steps) as { i: number; cat: Exclude<Cat, 'alg'> };
      const before = i === 0 ? L : id.proof[i - 1][0];
      const after = id.proof[i][0];
      const order: Array<Exclude<Cat, 'alg'>> = ['rec', 'quo', 'pyth', 'dbl'];
      return {
        prompt: `In a proof of the identity $${L} = ${R}$, one step is $$${before} = ${after}$$ Which type of identity justifies this step?`,
        parts: [part(fixedChoice(order.map((c) => CAT_TEXT[c]), order.indexOf(cat)))],
        hints: ['Compare the two expressions. What was replaced, and what was it replaced with?', 'Reciprocal: $\\sec x = \\dfrac{1}{\\cos x}$. Quotient: $\\tan x = \\dfrac{\\sin x}{\\cos x}$. Pythagorean: $\\sin^2 x + \\cos^2 x = 1$. Double-angle: $\\sin 2x = 2\\sin x\\cos x$.'],
        solution: [CAT_WHY[cat], `The step uses ${CAT_TEXT[cat].toLowerCase()}.`],
      };
    }
    if (d === 2) {
      const r = rng.next();
      if (r < 0.5) {
        const nx = rng.pick(id.next);
        const shown = id.proof.slice(0, nx.at).map((p) => p[0]);
        const correct = id.proof[nx.at][0];
        const work = shown.length ? `${who} is proving the identity by working on the left side. Here is the work so far: ${proofTex(id, shown)}` : `${who} is proving the identity by working on the left side.`;
        return {
          prompt: `Consider the identity $${L} = ${R}$. ${work} Which of these is a correct ${shown.length ? 'next' : 'first'} step?`,
          parts: [part(mc(rng, `$= ${correct}$`, nx.wrong.map((w) => `$= ${w}$`)))],
          hints: ['Each step must be equal to the one before it: use an identity, or valid algebra such as a common denominator, expanding, or factoring.', `The goal is $${R}$. Which choice moves toward it without breaking a rule?`],
          solution: [`The next step is $${correct}$ (${id.proof[nx.at][1]}).`, 'The whole proof:', proofTex(id, id.proof.map((p) => p[0])), `So the correct step is $= ${correct}$.`],
        };
      }
      if (r < 0.75) {
        const u: Unit = rng.chance(0.5) ? 'deg' : 'rad';
        const p = setPeriod(id.npv);
        return {
          prompt: `What are the non-permissible values of the identity $${L} = ${R}$${u === 'deg' ? ', with $x$ in degrees' : ''}?`,
          parts: [part(generalChoice(rng, id.npv, u, '\\ne'))],
          hints: ['Look at both sides. A function such as $\\tan x$ or $\\sec x$ is undefined where $\\cos x = 0$; $\\cot x$ and $\\csc x$ where $\\sin x = 0$.', 'Also check every denominator. Then write the values for all real numbers using $n \\in \\mathrm{I}$.'],
          solution: id.npv.length
            ? [id.npvWhy, `In one revolution: $x = ${listTex(id.npv, u)}$. These repeat every $${u === 'deg' ? dg(p) : radTex(p)}$.`, `So $${generalTex(id.npv, u, '\\ne')}$.`]
            : [id.npvWhy, 'There are no non-permissible values.'],
        };
      }
      return {
        prompt: `Which expression is equivalent to $${L}$ for all permissible values of $x$?`,
        parts: [part(mc(rng, `$${R}$`, id.wrongR.map((w) => `$${w}$`)))],
        hints: ['Write everything in terms of $\\sin x$ and $\\cos x$ and simplify.', 'You can test a choice: substitute a value such as $x = 30^\\circ$ into the expression and into each choice.'],
        solution: [proofTex(id, id.proof.map((p) => p[0])), `So $${L}$ is equivalent to $${R}$.`],
      };
    }
    // d === 3
    if (rng.chance(0.65)) {
      const e = id.err;
      const lines = e.lines.map((l, i) => `**Step ${i + 1}:** $${i === 0 ? `${L} ` : ''}= ${l}$`);
      const opts = [...e.lines.map((_, i) => `Step ${i + 1}`), 'There is no error; it is not an identity.'];
      return {
        prompt: `${who} tried to prove $${L} = ${R}$ by working on the left side:\n\n${lines.join('\n\n')}\n\n${who} concluded that the equation is not an identity. In which step is the first error?`,
        parts: [part(fixedChoice(opts, e.at))],
        hints: ['Check each step against the one before it. Is it a correct identity, or correct algebra?', 'Common errors: forgetting the middle term when squaring, wrong signs in a Pythagorean identity, and cancelling terms that are not factors.'],
        solution: [`Step ${e.at + 1} is wrong. ${e.why}`, 'A correct proof:', proofTex(id, id.proof.map((p) => p[0])), `The first error is in Step ${e.at + 1}, and the equation is an identity.`],
      };
    }
    const [falseEq, counter] = rng.pick(FALSE_IDS);
    const trues = rng.sample(TRUE_IDS, 3);
    return {
      prompt: 'Which equation is **not** an identity?',
      parts: [part(mc(rng, `$${falseEq}$`, trues.map((t) => `$${t}$`)))],
      hints: ['An identity is true for every permissible value. One value that makes the two sides different is enough to show an equation is not an identity.', 'Try simple angles such as $0$, $\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$ or $\\dfrac{\\pi}{2}$ in each equation.'],
      solution: [counter, `The other three equations are identities (each can be proved with the reciprocal, quotient, Pythagorean or double-angle identities).`, `So $${falseEq}$ is not an identity.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.4 — Solving trigonometric equations using identities
// ---------------------------------------------------------------------------

/** A factor (a·u − b) of a quadratic in u = sin x, cos x, ..., with root b/a. */
interface Root {
  a: number;
  b: number;
}
const rootVal = (r: Root) => r.b / r.a;
const R_ = (a: number, b: number): Root => ({ a, b });
const SPECIAL_SC = [R_(1, 0), R_(2, 1), R_(2, -1), R_(1, 1), R_(1, -1)];
const SPECIAL_T = [R_(1, 0), R_(1, 1), R_(1, -1)];
const OUT_SC = [R_(1, 2), R_(1, -2), R_(2, 3), R_(2, -3), R_(1, 3), R_(1, -3)];
const NONSPECIAL_SC = [R_(3, 1), R_(3, -1), R_(3, 2), R_(3, -2), R_(4, 1), R_(4, -1), R_(4, 3), R_(4, -3), R_(5, 2), R_(5, -2), R_(5, 3), R_(5, -3), R_(5, 4), R_(5, -4)];
const NONSPECIAL_T = [R_(1, 2), R_(1, -2), R_(1, 3), R_(1, -3), R_(3, 1), R_(3, -1), R_(2, 1), R_(2, -1), R_(2, 3), R_(2, -3), R_(1, 4), R_(1, -4), R_(3, 2), R_(3, -2)];

function quad(r1: Root, r2: Root): [number, number, number] {
  return [r1.a * r2.a, -(r1.a * r2.b + r2.a * r1.b), r1.b * r2.b];
}
function factorTex(r: Root, fn: string): string {
  if (r.b === 0) return `${r.a === 1 ? '' : r.a}${fn}`;
  return `${r.a === 1 ? '' : r.a}${fn} ${r.b > 0 ? '-' : '+'} ${Math.abs(r.b)}`;
}
function factoredTex(r1: Root, r2: Root, fn: string): string {
  const [m, o] = r2.b === 0 && r1.b !== 0 ? [r2, r1] : [r1, r2];
  if (m.b === 0) return `${factorTex(m, fn)}(${factorTex(o, fn)})`;
  return `(${factorTex(m, fn)})(${factorTex(o, fn)})`;
}
function quadTex([A, B, C]: [number, number, number], fn: string): string {
  return polyString([
    [A, fn.replace(' x', '^2 x')],
    [B, fn],
    [C, ''],
  ]);
}

/** Solve each factor of a quadratic in f (or in a reciprocal function g = 1/f) and collect the angles. */
function factorWork(roots: Root[], f: Fn, u: Unit, dp?: number, recip?: 'sec' | 'csc'): { lines: string[]; sols: number[] } {
  const lines: string[] = [];
  const all: number[][] = [];
  const seen = new Set<number>();
  for (const r of roots) {
    const v = rootVal(r);
    if (seen.has(v)) continue;
    seen.add(v);
    const fn = recip ? `\\${recip} x` : `\\${f} x`;
    const head = r.b === 0 || r.a === 1 ? '' : `$${factorTex(r, fn)} = 0$, so `;
    if (recip) {
      const g = `\\${recip} x = ${valTex(v)}`;
      if (Math.abs(v) < 1) {
        lines.push(`${head}$${g}$. Then $\\${f} x = ${valTex(1 / v)}$, which is outside $-1 \\le \\${f} x \\le 1$, so there is no solution.`);
        continue;
      }
      const w = solveLine(f, 1 / v, u, dp);
      all.push(w.sols);
      lines.push(`${head}$${g}$, so ${w.text}`);
      continue;
    }
    const w = solveLine(f, v, u, dp);
    all.push(w.sols);
    lines.push(`${head}${w.text}`);
  }
  return { lines, sols: union(...all) };
}

const QUAD_HINTS = (f: string) => [
  `Treat the equation as a quadratic in $\\${f} x$: let $u = \\${f} x$, then factor (or take square roots).`,
  `Set each factor equal to 0 and solve for $\\${f} x$. Then find every angle in the domain using the reference angle and the signs in each quadrant. A value outside $-1 \\le \\sin x \\le 1$ (or $\\cos x$) gives no solution.`,
];

/** A quadratic equation in sin, cos or tan with given roots. */
function quadEquation(f: Fn, r1: Root, r2: Root, style: 'factored' | 'zero' | 'move') {
  const fn = `\\${f} x`;
  const q = quad(r1, r2);
  const factored = factoredTex(r1, r2, fn);
  if (style === 'factored') return { eq: `${factored} = 0`, pre: [] as string[] };
  const zero = `${quadTex(q, fn)} = 0`;
  if (style === 'zero' || (q[1] === 0 && q[2] === 0)) return { eq: zero, pre: [`Factor: $${factored} = 0$`] };
  const rhs = polyString([
    [-q[1], fn],
    [-q[2], ''],
  ]);
  return { eq: `${polyString([[q[0], fn.replace(' x', '^2 x')]])} = ${rhs}`, pre: [`Move every term to one side: $${zero}$`, `Factor: $${factored} = 0$`] };
}

const trigEquationQuadratic = skill({
  id: 'm301-trig-equation-quadratic',
  name: 'Quadratic trigonometric equations',
  description: 'Solve second-degree trigonometric equations by factoring or taking square roots, over a restricted domain in degrees or radians, and write general solutions.',
  outcomes: ['T5', 'T6'],
  lessonId: 'm301-6-4',
  gen(rng, d) {
    const u: Unit = rng.chance(d === 1 ? 0.65 : 0.5) ? 'deg' : 'rad';
    const f = rng.weighted<Fn>([
      ['sin', 2],
      ['cos', 2],
      ['tan', 1],
    ]);
    const specialPair = () => {
      const pool = f === 'tan' ? SPECIAL_T : [...SPECIAL_SC, ...(d === 1 ? [] : OUT_SC.slice(0, 2))];
      return retry(
        () => rng.sample(pool, 2) as [Root, Root],
        ([a, b]) => rootVal(a) !== rootVal(b) && (Math.abs(rootVal(a)) <= 1 || Math.abs(rootVal(b)) <= 1 || f === 'tan'),
      );
    };
    if (d === 3) {
      const mode = rng.weighted<'calc' | 'recip' | 'general'>([
        ['calc', 0.4],
        ['recip', 0.25],
        ['general', 0.35],
      ]);
      if (mode === 'general') {
        const [r1, r2] = specialPair();
        const { eq, pre } = quadEquation(f, r1, r2, rng.chance(0.5) ? 'zero' : 'move');
        const { lines, sols } = factorWork([r1, r2], f, u);
        const p = setPeriod(sols);
        return {
          prompt: `Which is the general solution of $${eq}$${u === 'deg' ? ', in degrees' : ', in radians'}?`,
          parts: [part(generalChoice(rng, sols, u))],
          hints: [QUAD_HINTS(f)[0], 'Find the solutions in one revolution first. Then add multiples of the period; if two solutions are $180^\\circ$ ($\\pi$) apart, they combine into one expression.'],
          solution: [...pre, ...lines, `In one revolution: $x = ${listTex(sols, u)}$. The pattern repeats every $${u === 'deg' ? dg(p) : radTex(p)}$.`, `$${generalTex(sols, u)}$`],
        };
      }
      if (mode === 'recip') {
        const g = rng.pick(['sec', 'csc'] as const);
        const base: Fn = g === 'sec' ? 'cos' : 'sin';
        const pool = [R_(1, 2), R_(1, -2), R_(1, 1), R_(1, -1), R_(2, 1), R_(2, -1)];
        const [r1, r2] = retry(
          () => rng.sample(pool, 2) as [Root, Root],
          ([a, b]) => rootVal(a) !== rootVal(b) && rootVal(a) !== -rootVal(b) && (Math.abs(rootVal(a)) >= 1 || Math.abs(rootVal(b)) >= 1),
        );
        const { eq, pre } = quadEquation(base, r1, r2, rng.chance(0.5) ? 'zero' : 'move');
        const fixed = (s: string) => s.split(`\\${base}`).join(`\\${g}`);
        const { lines, sols } = factorWork([r1, r2], base, u, undefined, g);
        return {
          prompt: `Solve $${fixed(eq)}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
          parts: [anglesPart(sols, u)],
          hints: [`Treat the equation as a quadratic in $\\${g} x$ and factor.`, `Then use $\\${g} x = \\dfrac{1}{\\${base} x}$. Remember that $\\${g} x$ can never be between $-1$ and $1$.`],
          solution: [...pre.map(fixed), ...lines, `$x = ${listTex(sols, u)}$`],
          answerDisplay: anglesDisplay(sols, u),
        };
      }
      // A root that is not a special value: calculator, rounded.
      const dp = u === 'deg' ? 1 : 2;
      const { r1, r2, sols } = retry(
        () => {
          const a = rng.pick(f === 'tan' ? NONSPECIAL_T : NONSPECIAL_SC);
          const b = rng.pick(f === 'tan' ? [...SPECIAL_T, ...NONSPECIAL_T] : [...OUT_SC, ...SPECIAL_SC, ...NONSPECIAL_SC]);
          const s = union(anglesFor(f, rootVal(a)), anglesFor(f, rootVal(b)));
          return { r1: a, r2: b, sols: s };
        },
        (o) => rootVal(o.r1) !== rootVal(o.r2) && quad(o.r1, o.r2).every((c) => Math.abs(c) <= 30) && o.sols.every((t) => safeRound(angVal(t, u), dp)),
        300,
      );
      const { eq, pre } = quadEquation(f, r1, r2, rng.chance(0.5) ? 'zero' : 'move');
      const { lines } = factorWork([r1, r2], f, u, dp);
      return {
        prompt: `Solve $${eq}$ for ${DOMAIN[u]}. Give each solution ${u === 'deg' ? 'in degrees, to the nearest tenth of a degree' : 'in radians, to the nearest hundredth'}, separated by commas.`,
        parts: [anglesPart(sols, u, { dp })],
        hints: QUAD_HINTS(f),
        solution: [...pre, ...lines, `$x \\approx ${sols.map((t) => fmtFixed(angVal(t, u), dp) + (u === 'deg' ? '^\\circ' : '')).join(',\\ ')}$`],
        answerDisplay: anglesDisplay(sols, u, dp),
        calculator: true,
      };
    }
    // d = 1 or 2
    if (d === 2 && rng.chance(0.3)) {
      // u² = k: take square roots.
      const opts: Array<[number, number]> = f === 'tan' ? [[3, 1], [1, 1], [1, 3]] : [[4, 1], [2, 1], [4, 3], [1, 1]];
      const [A, Cc] = rng.pick(opts);
      const k = Cc / A;
      const v = Math.sqrt(k);
      const fn = `\\${f} x`;
      const sq = fn.replace(' x', '^2 x');
      const eq = rng.chance(0.5) ? `${A === 1 ? '' : A}${sq} - ${Cc} = 0` : `${A === 1 ? '' : A}${sq} = ${Cc}`;
      const a = solveLine(f, v, u);
      const b = solveLine(f, -v, u);
      const sols = union(a.sols, b.sols);
      return {
        prompt: `Solve $${eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
        parts: [anglesPart(sols, u)],
        hints: [`Isolate $${sq}$, then take the square root of both sides. Remember both the positive and the negative root.`, QUAD_HINTS(f)[1]],
        solution: [`$${sq} = ${valTex(k)}$, so $${fn} = \\pm ${valTex(v)}$`, a.text, b.text, `$x = ${listTex(sols, u)}$`],
        answerDisplay: anglesDisplay(sols, u),
      };
    }
    const [r1, r2] = specialPair();
    const style = d === 1 ? 'factored' : rng.chance(0.5) ? 'zero' : 'move';
    const { eq, pre } = quadEquation(f, r1, r2, style);
    const { lines, sols } = factorWork([r1, r2], f, u);
    return {
      prompt: `Solve $${eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
      parts: [anglesPart(sols, u)],
      hints: d === 1 ? ['A product is 0 when one of its factors is 0. Set each factor equal to 0.', 'Solve each equation for the ratio, then find every angle in the domain (reference angles and CAST).'] : QUAD_HINTS(f),
      solution: [...pre, ...lines, `$x = ${listTex(sols, u)}$`],
      answerDisplay: anglesDisplay(sols, u),
    };
  },
});

// Equations that need an identity first ------------------------------------

type Tpl = 'T1' | 'T2' | 'T4' | 'T5' | 'T6';
const TPL_FN: Record<Tpl, Fn> = { T1: 'sin', T2: 'cos', T4: 'cos', T5: 'sin', T6: 'tan' };
const TPL_SUB: Record<Tpl, { good: string; bad: string[]; why: string }> = {
  T1: { good: '\\cos 2x = 1 - 2\\sin^2 x', bad: ['\\cos 2x = 2\\cos^2 x - 1', '\\cos 2x = \\cos^2 x - \\sin^2 x', '\\sin 2x = 2\\sin x\\cos x'], why: 'The equation has $\\cos 2x$ and $\\sin x$. Only $\\cos 2x = 1 - 2\\sin^2 x$ leaves a single function, $\\sin x$.' },
  T2: { good: '\\cos 2x = 2\\cos^2 x - 1', bad: ['\\cos 2x = 1 - 2\\sin^2 x', '\\cos 2x = \\cos^2 x - \\sin^2 x', '\\sin 2x = 2\\sin x\\cos x'], why: 'The equation has $\\cos 2x$ and $\\cos x$. Only $\\cos 2x = 2\\cos^2 x - 1$ leaves a single function, $\\cos x$.' },
  T4: { good: '\\sin^2 x = 1 - \\cos^2 x', bad: ['\\cos^2 x = 1 - \\sin^2 x', '\\sin^2 x = \\cos^2 x - 1', '\\sin x = 1 - \\cos x'], why: 'The equation has $\\sin^2 x$ and $\\cos x$. Replacing $\\sin^2 x$ with $1 - \\cos^2 x$ leaves only $\\cos x$.' },
  T5: { good: '\\cos^2 x = 1 - \\sin^2 x', bad: ['\\sin^2 x = 1 - \\cos^2 x', '\\cos^2 x = \\sin^2 x - 1', '\\cos x = 1 - \\sin x'], why: 'The equation has $\\cos^2 x$ and $\\sin x$. Replacing $\\cos^2 x$ with $1 - \\sin^2 x$ leaves only $\\sin x$.' },
  T6: { good: '\\sec^2 x = 1 + \\tan^2 x', bad: ['\\sec^2 x = 1 - \\tan^2 x', '\\tan^2 x = 1 + \\sec^2 x', '\\sec^2 x = \\dfrac{1}{\\sin^2 x}'], why: 'The equation has $\\sec^2 x$ and $\\tan x$. Replacing $\\sec^2 x$ with $1 + \\tan^2 x$ leaves only $\\tan x$.' },
};

const coefTex = (k: number) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);
/** "+ 3\sin x" style continuation of an expression (empty for 0). */
const tail = (terms: Array<[number, string]>) =>
  terms
    .filter(([c]) => c !== 0)
    .map(([c, b]) => ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 && b ? '' : Math.abs(c)}${b}`)
    .join('');

interface IdEq {
  t: Tpl;
  eq: string;
  steps: string[];
  roots: [Root, Root];
  f: Fn;
}

/** Build an equation of template `t` whose quadratic (in the template's function) has the given roots. */
function identityEquation(rng: Rng, t: Tpl, r1: Root, r2: Root): IdEq | null {
  const [A, B, Cq] = quad(r1, r2);
  const f = TPL_FN[t];
  const fn = `\\${f} x`;
  const fn2 = `\\${f}^2 x`;
  const quadZero = `${quadTex([A, B, Cq], fn)} = 0`;
  const factor = `Factor: $${factoredTex(r1, r2, fn)} = 0$`;
  let terms: Array<[number, string]>;
  let sub: string;
  let after: string[];
  if (t === 'T1' || t === 'T2') {
    if (A % 2 !== 0) return null;
    const k = A / 2;
    const p = t === 'T1' ? -B : B;
    const q = t === 'T1' ? -k - Cq : Cq + k;
    if (p === 0) return null;
    terms = [
      [k, '\\cos 2x'],
      [p, fn],
      [q, ''],
    ];
    const form = t === 'T1' ? '1 - 2\\sin^2 x' : '2\\cos^2 x - 1';
    sub = `Replace $\\cos 2x$ with $${form}$: $${coefTex(k)}(${form})${tail([
      [p, fn],
      [q, ''],
    ])} = 0$`;
    after =
      t === 'T1'
        ? [`Expand and collect terms: $${polyString([[-A, fn2], [-B, fn], [-Cq, '']])} = 0$`, `Multiply by $-1$: $${quadZero}$`]
        : [`Expand and collect terms: $${quadZero}$`];
  } else if (t === 'T4' || t === 'T5') {
    if (B === 0) return null;
    const other = t === 'T4' ? '\\sin' : '\\cos';
    const c0 = -A - Cq;
    terms = [
      [A, `${other}^2 x`],
      [-B, fn],
      [c0, ''],
    ];
    sub = `Replace $${other}^2 x$ with $1 - ${fn2}$: $${coefTex(A)}(1 - ${fn2})${tail([
      [-B, fn],
      [c0, ''],
    ])} = 0$`;
    after = [`Expand and collect terms: $${polyString([[-A, fn2], [-B, fn], [-Cq, '']])} = 0$`, `Multiply by $-1$: $${quadZero}$`];
  } else {
    const c0 = Cq - A;
    terms = [
      [A, '\\sec^2 x'],
      [B, fn],
      [c0, ''],
    ];
    sub = `Replace $\\sec^2 x$ with $1 + \\tan^2 x$: $${coefTex(A)}(1 + \\tan^2 x)${tail([
      [B, fn],
      [c0, ''],
    ])} = 0$`;
    after = [`Expand and collect terms: $${quadZero}$`];
  }
  // Present with 0 on the right, or move the last non-zero term across.
  const nz = terms.filter(([c]) => c !== 0);
  let eq: string;
  const pre: string[] = [];
  const zeroForm = `${polyString(nz)} = 0`;
  if (nz.length >= 2 && rng.chance(0.6)) {
    const last = nz[nz.length - 1];
    eq = `${polyString(nz.slice(0, -1))} = ${polyString([[-last[0], last[1]]])}`;
    pre.push(`Move every term to one side: $${zeroForm}$`);
  } else eq = zeroForm;
  return { t, eq, steps: [...pre, sub, ...after, factor], roots: [r1, r2], f };
}

function pickIdentityEquation(rng: Rng, kinds: Tpl[], rootPool: (t: Tpl) => [Root[], Root[]], maxCoef = 30): IdEq {
  for (let i = 0; i < 400; i++) {
    const t = rng.pick(kinds);
    const [p1, p2] = rootPool(t);
    const r1 = rng.pick(p1);
    const r2 = rng.pick(p2);
    if (rootVal(r1) === rootVal(r2)) continue;
    const f = TPL_FN[t];
    if (!anglesFor(f, rootVal(r1)).length && !anglesFor(f, rootVal(r2)).length) continue;
    if (quad(r1, r2).some((c) => Math.abs(c) > maxCoef)) continue;
    const e = identityEquation(rng, t, r1, r2);
    if (e) return e;
  }
  return identityEquation(rng, 'T1', R_(2, 1), R_(1, -1))!;
}

/** sin 2x = k cos x or sin 2x = k sin x: factor out the common factor. */
function sin2xEquation(rng: Rng, u: Unit) {
  const [m, mv] = rng.pick([
    ['', 1],
    ['\\sqrt{2}', S2],
    ['\\sqrt{3}', S3],
  ] as const);
  const sgn = rng.sign();
  const withCos = rng.chance(0.5);
  const [g, h]: [Fn, Fn] = withCos ? ['cos', 'sin'] : ['sin', 'cos'];
  const eq = rng.chance(0.4) ? `\\sin 2x ${sgn < 0 ? '+' : '-'} ${m}\\${g} x = 0` : `\\sin 2x = ${sgn < 0 ? '-' : ''}${m}\\${g} x`;
  const minus = sgn < 0 ? '+' : '-';
  const a = solveLine(g, 0, u);
  const b = solveLine(h, (sgn * mv) / 2, u);
  const sols = union(a.sols, b.sols);
  return {
    prompt: `Solve $${eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
    parts: [anglesPart(sols, u)],
    hints: ['Replace $\\sin 2x$ with $2\\sin x\\cos x$.', `Move every term to one side and factor out the common factor $\\${g} x$. Do not divide by $\\${g} x$: that loses the solutions of $\\${g} x = 0$.`],
    solution: [
      `Use $\\sin 2x = 2\\sin x\\cos x$ and move every term to one side: $2\\sin x\\cos x ${minus} ${m}\\${g} x = 0$`,
      `Factor: $\\${g} x(2\\${h} x ${minus} ${m || '1'}) = 0$`,
      a.text,
      `$2\\${h} x ${minus} ${m || '1'} = 0$, so ${b.text}`,
      `$x = ${listTex(sols, u)}$`,
    ],
    answerDisplay: anglesDisplay(sols, u),
  };
}

const trigEquationIdentity = skill({
  id: 'm301-trig-equation-identity',
  name: 'Equations that need an identity',
  description: 'Solve trigonometric equations by first using a double-angle or Pythagorean identity to write them in terms of one function, then factoring.',
  outcomes: ['T5', 'T6'],
  lessonId: 'm301-6-4',
  gen(rng, d) {
    const u: Unit = rng.chance(0.5) ? 'deg' : 'rad';
    const special = (t: Tpl): [Root[], Root[]] => (t === 'T6' ? [SPECIAL_T, SPECIAL_T] : [SPECIAL_SC, [...SPECIAL_SC, ...OUT_SC]]);
    if (d === 1) {
      if (rng.chance(0.5)) return sin2xEquation(rng, u);
      const e = pickIdentityEquation(rng, ['T1', 'T2', 'T4', 'T5', 'T6'], special);
      const sub = TPL_SUB[e.t];
      return {
        prompt: `To solve $${e.eq}$, you first write it in terms of one trigonometric function. Which identity should you substitute?`,
        parts: [part(mc(rng, `$${sub.good}$`, sub.bad.map((b) => `$${b}$`)))],
        hints: ['List the functions in the equation. Which one should you keep?', 'Choose the identity that replaces the other function with an expression in the one you keep.'],
        solution: [sub.why, ...e.steps.filter((s) => !s.startsWith('Factor') && !s.startsWith('Move')), `Substitute $${sub.good}$.`],
      };
    }
    if (d === 2) {
      const e = pickIdentityEquation(rng, rng.chance(0.15) ? ['T6'] : ['T1', 'T2', 'T4', 'T5'], special);
      const { lines, sols } = factorWork(e.roots, e.f, u);
      return {
        prompt: `Solve $${e.eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
        parts: [anglesPart(sols, u)],
        hints: [
          'Use an identity so that only one trigonometric function appears: $\\cos 2x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$, $\\sin^2 x + \\cos^2 x = 1$, or $1 + \\tan^2 x = \\sec^2 x$.',
          'Write the result as a quadratic equal to 0, factor it, and solve each factor over the domain.',
        ],
        solution: [...e.steps, ...lines, `$x = ${listTex(sols, u)}$`],
        answerDisplay: anglesDisplay(sols, u),
      };
    }
    // d === 3
    const mode = rng.weighted<'general' | 'calc' | 'tan'>([
      ['general', 0.35],
      ['calc', 0.35],
      ['tan', 0.3],
    ]);
    if (mode === 'general') {
      const e = pickIdentityEquation(rng, ['T1', 'T2', 'T4', 'T5'], special);
      const { lines, sols } = factorWork(e.roots, e.f, u);
      const p = setPeriod(sols);
      return {
        prompt: `Which is the general solution of $${e.eq}$${u === 'deg' ? ', in degrees' : ', in radians'}?`,
        parts: [part(generalChoice(rng, sols, u))],
        hints: ['Use an identity to write the equation in one function, then factor and solve over one revolution.', 'Add multiples of the period. Solutions that are a half-turn apart combine into one expression.'],
        solution: [...e.steps, ...lines, `In one revolution: $x = ${listTex(sols, u)}$. The pattern repeats every $${u === 'deg' ? dg(p) : radTex(p)}$.`, `$${generalTex(sols, u)}$`],
      };
    }
    if (mode === 'calc') {
      const dp = u === 'deg' ? 1 : 2;
      for (let i = 0; i < 400; i++) {
        const e = pickIdentityEquation(rng, ['T1', 'T2', 'T4', 'T5'], () => [NONSPECIAL_SC, [...OUT_SC, ...SPECIAL_SC]], 12);
        const { lines, sols } = factorWork(e.roots, e.f, u, dp);
        if (!sols.length || !sols.every((t) => safeRound(angVal(t, u), dp))) continue;
        if (e.roots.every((r) => anglesFor(e.f, rootVal(r)).every(isSpecialAngle))) continue;
        return {
          prompt: `Solve $${e.eq}$ for ${DOMAIN[u]}. Give each solution ${u === 'deg' ? 'in degrees, to the nearest tenth of a degree' : 'in radians, to the nearest hundredth'}, separated by commas.`,
          parts: [anglesPart(sols, u, { dp })],
          hints: ['Use an identity so that only one trigonometric function appears, then write a quadratic equal to 0 and factor.', 'For a value that is not special, use the inverse function for the reference angle, then place it in the correct quadrants.'],
          solution: [...e.steps, ...lines, `$x \\approx ${sols.map((t) => fmtFixed(angVal(t, u), dp) + (u === 'deg' ? '^\\circ' : '')).join(',\\ ')}$`],
          answerDisplay: anglesDisplay(sols, u, dp),
          calculator: true,
        };
      }
    }
    // An equation with tan x and cos x, or sec² x and tan x.
    if (rng.chance(0.5)) {
      const plus = rng.chance(0.5);
      const v = plus ? -0.5 : 0.5;
      const a = solveLine('sin', v, u);
      const eq = plus ? '3\\tan x + 2\\cos x = 0' : '3\\tan x = 2\\cos x';
      return {
        prompt: `Solve $${eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
        parts: [anglesPart(a.sols, u)],
        hints: ['Write $\\tan x$ as $\\dfrac{\\sin x}{\\cos x}$ and multiply both sides by $\\cos x$ (note that $\\cos x \\ne 0$).', 'Then replace $\\cos^2 x$ with $1 - \\sin^2 x$ to get a quadratic in $\\sin x$.'],
        solution: [
          `Use $\\tan x = \\dfrac{\\sin x}{\\cos x}$ and multiply by $\\cos x$ ($\\cos x \\ne 0$, so $x \\ne ${listTex([90, 270], u)}$): $3\\sin x = ${plus ? '-' : ''}2\\cos^2 x$`,
          `Pythagorean identity: $3\\sin x = ${plus ? '-' : ''}2(1 - \\sin^2 x)$`,
          `Collect terms: $2\\sin^2 x ${plus ? '-' : '+'} 3\\sin x - 2 = 0$`,
          `Factor: $(2\\sin x ${plus ? '+' : '-'} 1)(\\sin x ${plus ? '-' : '+'} 2) = 0$`,
          `$\\sin x = ${plus ? '' : '-'}2$ has no solution.`,
          a.text,
          `Neither solution makes $\\cos x = 0$, so both are valid: $x = ${listTex(a.sols, u)}$`,
        ],
        answerDisplay: anglesDisplay(a.sols, u),
      };
    }
    const e = pickIdentityEquation(rng, ['T6'], special);
    const { lines, sols } = factorWork(e.roots, e.f, u);
    return {
      prompt: `Solve $${e.eq}$ for ${DOMAIN[u]}. ${ENTER[u]}`,
      parts: [anglesPart(sols, u)],
      hints: ['Replace $\\sec^2 x$ with $1 + \\tan^2 x$ so that only $\\tan x$ appears.', 'Factor the quadratic in $\\tan x$, then solve each factor; $\\tan x$ repeats every $180^\\circ$ ($\\pi$).'],
      solution: [...e.steps, ...lines, `$x = ${listTex(sols, u)}$`],
      answerDisplay: anglesDisplay(sols, u),
    };
  },
});

export const IDENTITIES_SKILLS: SkillDef[] = [identitySimplify, identityNonpermissible, sumDifference, doubleAngle, identityProve, trigEquationQuadratic, trigEquationIdentity];
