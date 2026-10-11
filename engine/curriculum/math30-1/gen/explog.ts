/** Math 30-1 Unit 7 — Exponential and Logarithmic Functions (RF7, RF8, RF9, RF10). Every formula, rate and constant is stated in the question. */
import { mc, mcFigures, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, fracLatex, toFrac, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, PlaneLine, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Pt = [number, number];
type Fn = (x: number) => number;
type Base = Frac;

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloe', 'Tariq', 'Émilie', 'Wapun', 'Siobhan', 'Arjun', 'Nadia'];
const TOWNS = ['Airdrie', 'Okotoks', 'Cochrane', 'Leduc', 'Sylvan Lake', 'Canmore', 'Beaumont', 'Chestermere', 'Strathmore', 'Blackfalds', 'Lacombe', 'Cold Lake'];

const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;
const lg = (x: number) => Math.log10(x);
/** LaTeX for an exact rational value: integers plainly, fractions as \frac (denominators up to 1000). */
function nn(x: number): string {
  const f = toFrac(x, 1000);
  return f && f.d !== 1 ? fracLatex(f) : fmt(x, 6);
}
/** An exact rational value as a student would type it in an expression. */
function ns(x: number): string {
  const f = toFrac(x, 1000);
  return f && f.d !== 1 ? `(${f.n}/${f.d})` : fmt(x, 6);
}
const sgn = (k: number) => (k === 0 ? '' : k > 0 ? ` + ${nn(k)}` : ` - ${nn(-k)}`);
const pn = (x: number) => (x < 0 ? `(${nn(x)})` : nn(x));
const units = (n: number, w = 'unit') => `${fmt(Math.abs(n))} ${w}${Math.abs(n) === 1 ? '' : 's'}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const listWords = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** Large whole numbers with thin spaces (SI style), for LaTeX. */
const big = (n: number) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : String(n));
/** A rounded value that is not close to a rounding boundary. */
function safeRound(v: number, decimals: number): boolean {
  if (!Number.isFinite(v)) return false;
  const s = Math.abs(v) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.08;
}
const fx = (v: number, d: number) => fmtFixed(v, d);
const solPart = (values: number[], decimals?: number): Part =>
  part({ kind: 'numbers', values, ...(decimals !== undefined && { decimals }) }, { label: 'Solutions', placeholder: 'e.g. 3, -2 or none' });

/** a + b x written in LaTeX (p x + q). */
function lin(p: number, q: number, v = 'x'): string {
  const head = p === 0 ? '' : p === 1 ? v : p === -1 ? `-${v}` : `${nn(p)}${v}`;
  if (!head) return nn(q);
  return q === 0 ? head : `${head} ${q > 0 ? '+' : '-'} ${nn(Math.abs(q))}`;
}

// Bases c = n/d of exponential and logarithmic functions.
const B = (n: number, d = 1): Base => frac(n, d);
const bval = (c: Base) => c.n / c.d;
const btex = (c: Base) => (c.d === 1 ? `${c.n}` : `\\left(\\frac{${c.n}}{${c.d}}\\right)`);
const bsub = (c: Base) => (c.d === 1 ? `${c.n}` : `\\frac{${c.n}}{${c.d}}`);
const bstr = (c: Base) => (c.d === 1 ? `${c.n}` : `(${c.n}/${c.d})`);
/** \log_{c} (or \log for the common logarithm). */
function logb(c: Base | number): string {
  const k = typeof c === 'number' ? B(c) : c;
  return k.d === 1 && k.n === 10 ? '\\log' : `\\log_{${bsub(k)}}`;
}
/** c^m as an exact fraction. */
function fpow(c: Base, m: number): Frac {
  return m >= 0 ? frac(c.n ** m, c.d ** m) : frac(c.d ** -m, c.n ** -m);
}
const ftex = (f: Frac) => fracLatex(f);

const innerTex = (h: number, v = 'x') => (h === 0 ? v : `${v} ${h > 0 ? '-' : '+'} ${fmt(Math.abs(h))}`);
/** b(x - h) in LaTeX. */
function argTex(b: number, h: number, v = 'x'): string {
  const i = innerTex(h, v);
  if (b === 1) return i;
  if (b === -1) return h === 0 ? `-${v}` : `-(${i})`;
  return h === 0 ? `${nn(b)}${v}` : `${nn(b)}(${i})`;
}
/** b(x - h) as typed. */
function argStr(b: number, h: number, v = 'x'): string {
  const i = innerTex(h, v);
  if (b === 1) return i;
  if (b === -1) return h === 0 ? `-${v}` : `-(${i})`;
  return h === 0 ? `${ns(b)}${v}` : `${ns(b)}(${i})`;
}

/** y = a(c)^(b(x - h)) + k */
interface ExpFn {
  a: number;
  c: Base;
  b: number;
  h: number;
  k: number;
}
const expAt = (f: ExpFn, x: number) => f.a * bval(f.c) ** (f.b * (x - f.h)) + f.k;
function expTex(f: ExpFn): string {
  const base = f.c.d === 1 && Math.abs(f.a) !== 1 ? `(${f.c.n})` : btex(f.c);
  const lead = f.a === 1 ? '' : f.a === -1 ? '-' : nn(f.a);
  return `${lead}${base}^{${argTex(f.b, f.h)}}${sgn(f.k)}`;
}
function expStr(f: ExpFn): string {
  const arg = argStr(f.b, f.h);
  const base = f.c.d === 1 && Math.abs(f.a) !== 1 ? `(${f.c.n})` : bstr(f.c);
  const lead = f.a === 1 ? '' : f.a === -1 ? '-' : ns(f.a);
  const k = f.k === 0 ? '' : f.k > 0 ? ` + ${fmt(f.k)}` : ` - ${fmt(-f.k)}`;
  return `${lead}${base}^${arg === 'x' ? 'x' : `(${arg})`}${k}`;
}

/** y = a log_c(b(x - h)) + k */
interface LogFn {
  a: number;
  c: Base;
  b: number;
  h: number;
  k: number;
}
function logAt(L: LogFn, x: number): number {
  const u = L.b * (x - L.h);
  return u > 0 ? (L.a * Math.log(u)) / Math.log(bval(L.c)) + L.k : NaN;
}
function logTex(L: LogFn): string {
  const arg = argTex(L.b, L.h);
  const body = arg === 'x' ? `${logb(L.c)} x` : `${logb(L.c)}(${arg})`;
  const lead = L.a === 1 ? '' : L.a === -1 ? '-' : nn(L.a);
  return `${lead}${body}${sgn(L.k)}`;
}

/** Sample a function on [from, to] as polylines clipped to the grid (never across an asymptote). */
function curve(f: Fn, g: GridSpec, from = g.xMin, to = g.xMax, m = 200): Pt[][] {
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const xs: number[] = [];
  for (let i = 0; i <= m; i++) xs.push(from + ((to - from) * i) / m);
  // Extra samples near each end, where a logarithmic curve is steep.
  for (let j = 1; j <= 14; j++) {
    const e = ((to - from) * 2 ** -j) / m;
    xs.push(from + e, to - e);
  }
  xs.sort((p, q) => p - q);
  const out: Pt[][] = [];
  let cur: Pt[] = [];
  for (let i = 0; i < xs.length; i++) {
    const y = f(xs[i]);
    const inNow = inside(y);
    if (i > 0) {
      const yp = f(xs[i - 1]);
      const inPrev = inside(yp);
      if (inPrev !== inNow) {
        const outside = inNow ? yp : y;
        const target = outside > g.yMax ? g.yMax : g.yMin;
        let lo = xs[i - 1];
        let hi = xs[i];
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
    if (inNow) {
      const p: Pt = [r3(xs[i]), r3(y)];
      const last = cur[cur.length - 1];
      if (!last || last[0] !== p[0] || last[1] !== p[1]) cur.push(p);
    }
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

const hLine = (k: number): PlaneLine => ({ line: { A: 0, B: 1, C: -k }, dashed: true, color: 'muted' });
const vLine = (h: number): PlaneLine => ({ line: { A: 1, B: 0, C: -h }, dashed: true, color: 'muted' });
const ptLabel = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`.replace(/-/g, '−');
const ptTex = (x: number, y: number) => `(${nn(x)},\\ ${nn(y)})`;

function plot(f: Fn, g: GridSpec, from?: number, to?: number): PlaneFigure {
  return { type: 'plane', grid: g, polylines: curve(f, g, from, to).map((p) => ({ points: p })) };
}
function expFig(f: ExpFn, g: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const fig = plot((x) => expAt(f, x), g);
  if (f.k !== 0) fig.lines = [hLine(f.k)];
  if (points.length) fig.points = points;
  return fig;
}
function logFig(L: LogFn, g: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const eps = 1e-7;
  const fig = L.b > 0 ? plot((x) => logAt(L, x), g, Math.max(g.xMin, L.h + eps), g.xMax) : plot((x) => logAt(L, x), g, g.xMin, Math.min(g.xMax, L.h - eps));
  if (L.h !== 0) fig.lines = [vLine(L.h)];
  if (points.length) fig.points = points;
  return fig;
}
const inGrid = (g: GridSpec, x: number, y: number, pad = 0.5) => x >= g.xMin + pad && x <= g.xMax - pad && y >= g.yMin + pad && y <= g.yMax - pad;

// Set notation for domain and range.
const D_ALL = '\\{x \\mid x \\in \\mathbb{R}\\}';
const R_ALL = '\\{y \\mid y \\in \\mathbb{R}\\}';
const setv = (v: 'x' | 'y', op: string, k: number) => `\\{${v} \\mid ${v} ${op} ${nn(k)},\\ ${v} \\in \\mathbb{R}\\}`;
const dr = (d: string, r: string) => `Domain $${d}$; range $${r}$`;

// ---------------------------------------------------------------------------
// 7.1 Characteristics of exponential functions — m301-exp-features
// ---------------------------------------------------------------------------

interface Form {
  tex: string;
  c: number;
  note?: string;
}
const GROW_PLAIN: Form[] = [
  { tex: '3^{x}', c: 3 },
  { tex: '1.2^{x}', c: 1.2 },
  { tex: '\\left(\\frac{5}{4}\\right)^{x}', c: 1.25 },
  { tex: '2.5^{x}', c: 2.5 },
  { tex: '10^{x}', c: 10 },
  { tex: '\\left(\\frac{3}{2}\\right)^{x}', c: 1.5 },
  { tex: '1.05^{x}', c: 1.05 },
];
const DECAY_PLAIN: Form[] = [
  { tex: '\\left(\\frac{1}{3}\\right)^{x}', c: 1 / 3 },
  { tex: '0.8^{x}', c: 0.8 },
  { tex: '\\left(\\frac{3}{4}\\right)^{x}', c: 0.75 },
  { tex: '0.45^{x}', c: 0.45 },
  { tex: '\\left(\\frac{2}{5}\\right)^{x}', c: 0.4 },
  { tex: '0.95^{x}', c: 0.95 },
];
const GROW_TRICK: Form[] = [
  { tex: '\\left(\\frac{1}{2}\\right)^{-x}', c: 2, note: '\\left(\\frac{1}{2}\\right)^{-x} = 2^{x}' },
  { tex: '0.25^{-x}', c: 4, note: '0.25^{-x} = 4^{x}' },
  { tex: '\\left(\\frac{2}{3}\\right)^{-x}', c: 1.5, note: '\\left(\\frac{2}{3}\\right)^{-x} = \\left(\\frac{3}{2}\\right)^{x}' },
];
const DECAY_TRICK: Form[] = [
  { tex: '2^{-x}', c: 0.5, note: '2^{-x} = \\left(\\frac{1}{2}\\right)^{x}' },
  { tex: '5^{-x}', c: 0.2, note: '5^{-x} = \\left(\\frac{1}{5}\\right)^{x}' },
  { tex: '1.5^{-x}', c: 2 / 3, note: '1.5^{-x} = \\left(\\frac{2}{3}\\right)^{x}' },
];
const classify = (f: Form) =>
  `$y = ${f.tex}$: ${f.note ? `$${f.note}$, so the` : 'the'} base is ${f.c > 1 ? 'greater than $1$ — growth' : 'between $0$ and $1$ — decay'}.`;

function featWhich(rng: Rng, d: Difficulty): GenOutput {
  const wantGrowth = rng.chance(0.5);
  const tricky = d >= 2;
  const right = wantGrowth ? (tricky && rng.chance(0.6) ? GROW_TRICK : GROW_PLAIN) : tricky && rng.chance(0.6) ? DECAY_TRICK : DECAY_PLAIN;
  const correct = rng.pick(right);
  const plainWrong = rng.sample(wantGrowth ? DECAY_PLAIN : GROW_PLAIN, 3);
  const wrong = tricky ? [rng.pick(wantGrowth ? DECAY_TRICK : GROW_TRICK), ...plainWrong.slice(0, 2)] : plainWrong;
  const word = wantGrowth ? 'growth' : 'decay';
  return {
    prompt: `Which function represents exponential ${word}?`,
    parts: [part(mc(rng, `$y = ${correct.tex}$`, wrong.map((w) => `$y = ${w.tex}$`)))],
    hints: [
      'For $y = c^{x}$ with $c > 0$, the function shows growth when $c > 1$ and decay when $0 < c < 1$.',
      tricky ? 'A negative exponent flips the base: $c^{-x} = \\left(\\frac{1}{c}\\right)^{x}$.' : 'Compare each base with $1$.',
    ],
    solution: [
      'For $y = c^{x}$: growth when $c > 1$ (the graph rises from left to right) and decay when $0 < c < 1$ (it falls).',
      ...[correct, ...wrong].map(classify),
      `So $y = ${correct.tex}$ represents exponential ${word}.`,
    ],
  };
}

function featEvaluate(rng: Rng): GenOutput {
  const [c, x0] = retry(
    () => [rng.pick([B(2), B(3), B(4), B(5), B(10), B(1, 2), B(1, 3), B(1, 4)]), rng.pick([-3, -2, -1, 2, 3, 4])] as const,
    ([c, x]) => {
      const v = fpow(c, x);
      return v.n <= 1000 && v.d <= 1000 && !(c.n === 10 && Math.abs(x) > 3);
    },
  );
  const v = fpow(c, x0);
  const name = rng.pick(['f', 'g', 'h']);
  let step: string;
  if (x0 > 0) step = `$${name}(${x0}) = ${btex(c)}^{${x0}} = ${ftex(v)}$`;
  else if (c.d === 1) step = `$${name}(${x0}) = ${c.n}^{${x0}} = \\dfrac{1}{${c.n}^{${-x0}}} = ${ftex(v)}$`;
  else step = `$${name}(${x0}) = ${btex(c)}^{${x0}} = ${c.d}^{${-x0}} = ${ftex(v)}$`;
  return {
    prompt: `For $${name}(x) = ${btex(c)}^{x}$, evaluate $${name}(${x0})$. Give an exact answer.`,
    parts: [numPart(v.n / v.d, { label: `$${name}(${x0}) =$` })],
    hints: [`Substitute $x = ${x0}$.`, 'A negative exponent means a reciprocal: $c^{-n} = \\dfrac{1}{c^{n}}$.'],
    solution: [step, `$${name}(${x0}) = ${ftex(v)}$`],
  };
}

function featBase(rng: Rng, d: Difficulty): GenOutput {
  const [c, m] = retry(
    () =>
      d === 1
        ? ([rng.pick([B(2), B(3), B(4), B(5), B(6)]), rng.pick([2, 3])] as const)
        : ([rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(1, 4), B(2, 3), B(3, 2)]), rng.pick([-3, -2, -1, 2, 3])] as const),
    ([c, m]) => {
      const v = fpow(c, m);
      return v.n <= 216 && v.d <= 216 && (d === 1 || m < 0 || c.d !== 1);
    },
  );
  const y0 = fpow(c, m);
  const steps = [`Substitute the point into $y = c^{x}$: $c^{${m}} = ${ftex(y0)}$.`];
  let pos = y0;
  if (m < 0) {
    pos = frac(y0.d, y0.n);
    steps.push(`A negative exponent means a reciprocal: $\\dfrac{1}{c^{${-m}}} = ${ftex(y0)}$, so $c^{${-m}} = ${ftex(pos)}$.`);
  }
  const am = Math.abs(m);
  if (am === 2) steps.push(`Take the square root. The base of an exponential function is positive, so $c = \\sqrt{${ftex(pos)}} = ${bsub(c)}$.`);
  else if (am === 3) steps.push(`Take the cube root: $c = \\sqrt[3]{${ftex(pos)}} = ${bsub(c)}$.`);
  steps.push(`$c = ${bsub(c)}$, so the function is $y = ${btex(c)}^{x}$.`);
  return {
    prompt: `The graph of $y = c^{x}$, where $c > 0$, passes through the point $\\left(${m},\\ ${ftex(y0)}\\right)$. Find the value of $c$.`,
    parts: [numPart(bval(c), { label: '$c =$' })],
    hints: [`Substitute $x = ${m}$ and $y = ${ftex(y0)}$ into $y = c^{x}$.`, m < 0 ? 'Rewrite the negative exponent as a reciprocal, then take a root.' : 'Undo the exponent by taking a root.'],
    solution: steps,
  };
}

function featStatements(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(1, 4), B(3, 2), B(2, 3)]);
  const inc = bval(c) > 1;
  const trend = (up: boolean) => (up ? 'increasing' : 'decreasing');
  const s = (up: boolean, yInt: string, asym: string) => `It is ${trend(up)}, its $y$-intercept is $${yInt}$, and its asymptote is $${asym}$.`;
  const correct = s(inc, '1', 'y = 0');
  const distractors = [s(!inc, '1', 'y = 0'), s(inc, bsub(c), 'y = 0'), s(inc, '1', 'x = 0'), s(inc, '0', 'y = 0')];
  return {
    prompt: `Which statement about the graph of $y = ${btex(c)}^{x}$ is true?`,
    parts: [part(mc(rng, correct, rng.shuffle(distractors)))],
    hints: ['Substitute $x = 0$ to find the $y$-intercept.', 'Is the base greater than 1 or between 0 and 1? A power of a positive base is never zero.'],
    solution: [
      `$y$-intercept: $${btex(c)}^{0} = 1$.`,
      `The base $${bsub(c)}$ is ${inc ? 'greater than $1$, so the function is increasing' : 'between $0$ and $1$, so the function is decreasing'}.`,
      `$${btex(c)}^{x}$ is always positive and gets closer and closer to $0$ as $x$ ${inc ? 'decreases' : 'increases'}, so the horizontal asymptote is $y = 0$ (the $x$-axis).`,
      correct,
    ],
  };
}

function featDomainRange(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(1, 2), B(1, 3), B(3, 2), B(1, 4)]);
  const a = rng.pick([1, 1, 2, 3, 5]);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  const correct = dr(D_ALL, setv('y', '>', 0));
  const distractors = rng.shuffle([dr(D_ALL, setv('y', '\\ge', 0)), dr(D_ALL, R_ALL), dr(setv('x', '>', 0), setv('y', '>', 0)), ...(a !== 1 ? [dr(D_ALL, setv('y', '>', a))] : [])]);
  return {
    prompt: `State the domain and range of $y = ${expTex(f)}$.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['Can you substitute any real number for $x$?', `Can $${expTex(f)}$ ever be $0$ or negative?`],
    solution: [
      `Any real number can be an exponent, so the domain is $${D_ALL}$.`,
      `A positive base raised to any power is positive${a !== 1 ? `, and multiplying by $${a}$ keeps it positive` : ''}. The graph approaches the asymptote $y = 0$ but never reaches it.`,
      `Range: $${setv('y', '>', 0)}$.`,
    ],
  };
}

function featMatch(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(1, 2), B(1, 3)]);
  const cv = bval(c);
  const other = cv === 2 ? 3 : cv === 3 ? 2 : cv === 0.5 ? 1 / 3 : 0.5;
  const g: GridSpec = { xMin: -4, xMax: 4, yMin: -2, yMax: 10 };
  const power = cv === 0.5 ? plot((x) => Math.sqrt(x), g, 0) : cv === 1 / 3 ? plot((x) => Math.cbrt(x), g) : plot((x) => x ** cv, g);
  const powTex = cv === 0.5 ? '\\sqrt{x}' : cv === 1 / 3 ? '\\sqrt[3]{x}' : `x^{${cv}}`;
  const opts = [
    { md: '', figure: plot((x) => cv ** x, g), correct: true },
    { md: '', figure: plot((x) => (1 / cv) ** x, g) },
    { md: '', figure: plot((x) => other ** x, g) },
    { md: '', figure: power },
  ];
  return {
    prompt: `Which graph shows $y = ${btex(c)}^{x}$?`,
    parts: [part(mcFigures(rng, opts))],
    hints: ['Every graph of $y = c^{x}$ passes through $(0, 1)$ and $(1, c)$.', 'Decide whether the graph should rise or fall from left to right.'],
    solution: [
      `$y = ${btex(c)}^{x}$ passes through $(-1,\\ ${nn(1 / cv)})$, $(0, 1)$ and $(1,\\ ${nn(cv)})$.`,
      `The base is ${cv > 1 ? 'greater than $1$, so the graph rises from left to right' : 'between $0$ and $1$, so the graph falls from left to right'}, approaching the asymptote $y = 0$ ${cv > 1 ? 'on the left' : 'on the right'}.`,
      `The other graphs show $y = ${btex(B(c.d, c.n))}^{x}$, $y = ${btex(other > 1 ? B(other) : B(1, Math.round(1 / other)))}^{x}$ and the power function $y = ${powTex}$, which is not exponential.`,
      'The correct graph is the one through those three points.',
    ],
  };
}

function featFromPoints(rng: Rng): GenOutput {
  const pick = retry(
    () => {
      const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(3, 2), B(2, 3)]);
      const a = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
      const x1 = rng.pick([-1, 1, 2]);
      const gap = rng.pick([1, 2]);
      return { c, a, x1, x2: x1 + gap, gap };
    },
    ({ c, a, x1, x2 }) => {
      const y1 = fpow(c, x1);
      const y2 = fpow(c, x2);
      const v1 = (a * y1.n) / y1.d;
      const v2 = (a * y2.n) / y2.d;
      const f1 = toFrac(v1, 50);
      const f2 = toFrac(v2, 50);
      return !!f1 && !!f2 && Math.max(v1, v2) <= 400 && v1 !== v2;
    },
  );
  const { c, a, x1, x2, gap } = pick;
  const y1 = (a * fpow(c, x1).n) / fpow(c, x1).d;
  const y2 = (a * fpow(c, x2).n) / fpow(c, x2).d;
  const ratio = fpow(c, gap);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  return {
    prompt: `The graph of an exponential function $y = a(c)^{x}$ passes through $\\left(${x1},\\ ${nn(y1)}\\right)$ and $\\left(${x2},\\ ${nn(y2)}\\right)$. Write its equation.`,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 5(2)^x' })],
    hints: ['Substitute both points to get two equations in $a$ and $c$.', 'Divide one equation by the other: $a$ cancels and you can solve for $c$.'],
    solution: [
      `Substitute the points: $${nn(y1)} = a\\,c^{${x1}}$ and $${nn(y2)} = a\\,c^{${x2}}$.`,
      `Divide the second equation by the first: $c^{${gap}} = \\dfrac{${nn(y2)}}{${nn(y1)}} = ${ftex(ratio)}$.`,
      gap === 2 ? `Take the square root ($c > 0$): $c = ${bsub(c)}$.` : `So $c = ${bsub(c)}$.`,
      `Then $a = ${nn(y1)} \\div ${btex(c)}^{${x1}} = ${a}$.`,
      `The equation is $y = ${expTex(f)}$.`,
    ],
  };
}

function featFromGraph(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(1, 2), B(1, 3)]);
  const cv = bval(c);
  const a = rng.pick(cv === 3 || cv === 1 / 3 ? [1, 2, 3] : [1, 2, 3, 4]);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  const dir = cv > 1 ? 1 : -1;
  const pts: Pt[] = [
    [0, a],
    [dir, a * Math.max(cv, 1 / cv)],
  ];
  const yMax = Math.max(8, Math.ceil((pts[1][1] + 2) / 2) * 2);
  const g: GridSpec = { xMin: -4, xMax: 4, yMin: -2, yMax };
  const fig = expFig(f, g, pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })));
  return {
    prompt: `The graph of an exponential function of the form $y = a(c)^{x}$ is shown. Write its equation.`,
    figure: fig,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 3(2)^x' })],
    hints: ['At $x = 0$, $c^{0} = 1$, so the $y$-intercept is $a$.', `Compare the $y$-values at $x = 0$ and $x = ${dir}$ to find the base.`],
    solution: [
      `The $y$-intercept is $${a}$, and when $x = 0$, $y = a(c)^{0} = a$. So $a = ${a}$.`,
      dir === 1 ? `At $x = 1$, $y = ${a}c = ${pts[1][1]}$, so $c = ${nn(cv)}$.` : `At $x = -1$, $y = ${a}c^{-1} = \\dfrac{${a}}{c} = ${pts[1][1]}$, so $c = \\dfrac{${a}}{${pts[1][1]}} = ${nn(cv)}$.`,
      `The equation is $y = ${expTex(f)}$.`,
    ],
  };
}

interface ExpCtx {
  intro: (start: number, model: string) => string;
  growth: boolean;
  starts: number[];
  rates: number[];
  per: string;
  ask: (n: number) => string;
  times: number[];
  decimals: number;
  suffix: string;
  what: string;
}
const EXP_CTX: ExpCtx[] = [
  {
    intro: (_s, m) => `The population of ${'{town}'} is modelled by $P = ${m}$, where $t$ is the time in years since 2020.`,
    growth: true,
    starts: [8400, 12500, 15600, 21000, 26800, 32400, 9600],
    rates: [1.5, 2, 2.5, 3, 3.5, 4],
    per: 'year',
    ask: (n) => `Use the model to estimate the population in ${2020 + n}, to the nearest whole number.`,
    times: [5, 6, 8, 10, 12, 15],
    decimals: 0,
    suffix: 'people',
    what: 'population',
  },
  {
    intro: (_s, m) => `A biology class grows bacteria in a culture. The number of bacteria after $t$ hours is modelled by $N = ${m}$.`,
    growth: true,
    starts: [150, 200, 250, 400, 500, 640, 800],
    rates: [10, 15, 20, 25, 30, 35],
    per: 'hour',
    ask: (n) => `How many bacteria does the model predict after ${n} hours? Round to the nearest whole number.`,
    times: [4, 5, 6, 7, 8, 10],
    decimals: 0,
    suffix: 'bacteria',
    what: 'number of bacteria',
  },
  {
    intro: (_s, m) => `The mass of caffeine, in milligrams, left in ${'{name}'}'s body $t$ hours after drinking a large coffee is modelled by $C = ${m}$.`,
    growth: false,
    starts: [120, 140, 160, 180, 200, 240],
    rates: [11, 12, 13, 14, 15],
    per: 'hour',
    ask: (n) => `How much caffeine is left after ${n} hours? Round to the nearest tenth of a milligram.`,
    times: [3, 4, 5, 6, 8],
    decimals: 1,
    suffix: 'mg',
    what: 'mass of caffeine',
  },
  {
    intro: (_s, m) => `The intensity of sunlight under the surface of a lake near ${'{town}'}, as a percent of the intensity at the surface, is modelled by $L = ${m}$, where $d$ is the depth in metres.`,
    growth: false,
    starts: [100],
    rates: [6, 8, 10, 12, 15, 18],
    per: 'metre',
    ask: (n) => `What percent of the surface light reaches a depth of ${n} m? Round to the nearest tenth of a percent.`,
    times: [3, 4, 5, 6, 8, 10],
    decimals: 1,
    suffix: '%',
    what: 'light intensity',
  },
];

function featContext(rng: Rng): GenOutput {
  const ctx = rng.pick(EXP_CTX);
  const start = rng.pick(ctx.starts);
  const rate = rng.pick(ctx.rates);
  const cv = ctx.growth ? 1 + rate / 100 : 1 - rate / 100;
  const t = ctx.per === 'metre' ? 'd' : 't';
  const model = `${start}(${fmt(cv, 4)})^{${t}}`;
  const n = retry(
    () => rng.pick(ctx.times),
    (k) => safeRound(start * cv ** k, ctx.decimals),
  );
  const value = start * cv ** n;
  const intro = ctx.intro(start, model).replace('{town}', rng.pick(TOWNS)).replace('{name}', rng.pick(NAMES));
  const unit = ctx.suffix === '%' ? '%' : ` ${ctx.suffix}`;
  const st = (dir: 'increases' | 'decreases', r: string) => `The ${ctx.what} starts at ${fmt(start)}${unit} and ${dir} by ${r}% each ${ctx.per}.`;
  const right = ctx.growth ? 'increases' : 'decreases';
  const wrongDir = ctx.growth ? 'decreases' : 'increases';
  const correct = st(right, fmt(rate));
  const distractors = [st(wrongDir, fmt(rate)), st(right, fmt(ctx.growth ? 100 + rate : 100 - rate)), st(right, fmt(rate / 100, 4))];
  const sym = intro.match(/\$([A-Z]) =/)?.[1] ?? 'y';
  return {
    prompt: `${intro}\n\n**a)** What does the model tell you?\n\n**b)** ${ctx.ask(n)}`,
    parts: [part(mc(rng, correct, distractors), { label: 'a)' }), numPart(value, { decimals: ctx.decimals, label: 'b)', suffix: ctx.suffix })],
    hints: [
      `In $y = a(c)^{${t}}$, $a$ is the starting value and $c$ is the growth or decay factor: $c = 1 + r$ for growth and $c = 1 - r$ for decay.`,
      `Substitute $${t} = ${n}$ and evaluate with a calculator.`,
    ],
    solution: [
      `The starting value (when $${t} = 0$) is $${start}$.`,
      ctx.growth
        ? `The factor is $${fmt(cv, 4)} = 1 + ${fmt(rate / 100, 4)}$, which is greater than $1$: growth of ${fmt(rate)}% per ${ctx.per}.`
        : `The factor is $${fmt(cv, 4)} = 1 - ${fmt(rate / 100, 4)}$, which is between $0$ and $1$: a decrease of ${fmt(rate)}% per ${ctx.per}.`,
      `**a)** ${correct}`,
      `**b)** $${sym} = ${start}(${fmt(cv, 4)})^{${n}} \\approx ${fx(value, ctx.decimals)}$${ctx.suffix === '%' ? '%' : ` ${ctx.suffix}`}`,
    ],
    calculator: true,
  };
}

const expFeatures = skill({
  id: 'm301-exp-features',
  name: 'Characteristics of exponential functions',
  description: 'Identify growth or decay, the intercept, asymptote, domain and range of y = c^x, match graphs and equations, and find an exponential equation from points or a graph.',
  outcomes: ['RF9'],
  lessonId: 'm301-7-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['which', 'evaluate', 'base'] as const);
      return kind === 'which' ? featWhich(rng, d) : kind === 'evaluate' ? featEvaluate(rng) : featBase(rng, d);
    }
    if (d === 2) {
      const kind = rng.pick(['which', 'base', 'statements', 'domain', 'match'] as const);
      if (kind === 'which') return featWhich(rng, d);
      if (kind === 'base') return featBase(rng, d);
      if (kind === 'statements') return featStatements(rng);
      if (kind === 'domain') return featDomainRange(rng);
      return featMatch(rng);
    }
    const kind = rng.pick(['points', 'graph', 'context'] as const);
    return kind === 'points' ? featFromPoints(rng) : kind === 'graph' ? featFromGraph(rng) : featContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.2 Transformations of exponential functions — m301-exp-transform
// ---------------------------------------------------------------------------

interface Tr {
  a: number;
  b: number;
  h: number;
  k: number;
}
/** Words for the transformations in y = a f(b(x - h)) + k; the flags introduce common mistakes. */
function transformWords(t: Tr, flip: { hStretch?: boolean; aStretch?: boolean; axes?: boolean } = {}): string {
  const out: string[] = [];
  const A = Math.abs(t.a);
  const Bb = Math.abs(t.b);
  if (A !== 1) out.push(`a vertical stretch by a factor of $${nn(flip.aStretch ? 1 / A : A)}$`);
  if (t.a < 0) out.push(`a reflection in the ${flip.axes ? '$y$' : '$x$'}-axis`);
  if (Bb !== 1) out.push(`a horizontal stretch by a factor of $${nn(flip.hStretch ? Bb : 1 / Bb)}$`);
  if (t.b < 0) out.push(`a reflection in the ${flip.axes ? '$x$' : '$y$'}-axis`);
  const tr: string[] = [];
  if (t.h) tr.push(`${units(t.h)} ${t.h > 0 ? 'right' : 'left'}`);
  if (t.k) tr.push(`${units(t.k)} ${t.k > 0 ? 'up' : 'down'}`);
  if (tr.length) out.push(`a translation of ${tr.join(' and ')}`);
  return listWords(out);
}
const mapRule = '(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)';
const EXP_BASES = [B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)];

function trAsymptote(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: 1, c: rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)]), b: 1, h: rng.int(-3, 3), k: rng.nonZero(-6, 6) }),
    (f) => {
      const v = fpow(f.c, -f.h);
      return v.n <= 64 && v.d <= 64;
    },
  );
  const v = fpow(f.c, -f.h);
  const yInt = v.n / v.d + f.k;
  return {
    prompt: `For $y = ${expTex(f)}$, state the equation of the horizontal asymptote and the $y$-intercept.`,
    parts: [numPart(f.k, { label: 'Asymptote: $y =$' }), numPart(yInt, { label: '$y$-intercept:' })],
    hints: ['The asymptote $y = 0$ of $y = c^{x}$ moves up or down with the vertical translation $k$.', 'For the $y$-intercept, substitute $x = 0$.'],
    solution: [
      `The graph of $y = ${btex(f.c)}^{x}$ has asymptote $y = 0$. It is translated ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}, so the asymptote is $y = ${f.k}$.`,
      `$y$-intercept: $y = ${btex(f.c)}^{${argTex(1, f.h).replace('x', '0')}}${sgn(f.k)} = ${ftex(v)}${sgn(f.k)} = ${nn(yInt)}$.`,
      `Asymptote $y = ${f.k}$; $y$-intercept $${nn(yInt)}$.`,
    ],
  };
}

function trDescribeShift(rng: Rng): GenOutput {
  const f: ExpFn = { a: 1, c: rng.pick(EXP_BASES), b: 1, h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) };
  const words = (h: number, k: number) => cap(transformWords({ a: 1, b: 1, h, k })) + '.';
  return {
    prompt: `How is the graph of $y = ${btex(f.c)}^{x}$ transformed to give the graph of $y = ${expTex(f)}$?`,
    parts: [part(mc(rng, words(f.h, f.k), [words(-f.h, f.k), words(f.h, -f.k), words(-f.h, -f.k)]))],
    hints: ['Compare with $y = c^{x - h} + k$.', '$x - h$ moves the graph $h$ units right; $x + h$ moves it left. $+k$ moves it up.'],
    solution: [
      `Write the equation as $y = ${btex(f.c)}^{x - (${f.h})} + (${f.k})$: $h = ${f.h}$ and $k = ${f.k}$.`,
      `$h = ${f.h}$ is a horizontal translation ${units(f.h)} ${f.h > 0 ? 'right' : 'left'}; $k = ${f.k}$ is a vertical translation ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}.`,
      words(f.h, f.k),
    ],
  };
}

function basePoint(rng: Rng, c: Base, b = 1): [number, number] {
  const cv = bval(c);
  const xs = (cv > 1 ? [0, 1, 2] : [0, -1, -2]).filter((x) => Number.isInteger(x / b) && Math.abs(cv ** x) <= 25);
  const x0 = rng.pick(xs.length ? xs : [0]);
  return [x0, cv ** x0];
}

function trImageShift(rng: Rng): GenOutput {
  const c = rng.pick(EXP_BASES);
  const f: ExpFn = { a: 1, c, b: 1, h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) };
  const [x0, y0] = basePoint(rng, c);
  return {
    prompt: `The point $(${x0},\\ ${nn(y0)})$ is on the graph of $y = ${btex(c)}^{x}$. What is the image of this point on the graph of $y = ${expTex(f)}$?`,
    parts: [part({ kind: 'point', x: x0 + f.h, y: y0 + f.k }, { label: 'Image point' })],
    hints: ['Each point moves by the same translation: $(x, y) \\to (x + h,\\ y + k)$.', `Here $h = ${f.h}$ and $k = ${f.k}$.`],
    solution: [
      `The graph is translated ${units(f.h)} ${f.h > 0 ? 'right' : 'left'} and ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}: $(x, y) \\to (x ${f.h > 0 ? '+' : '-'} ${Math.abs(f.h)},\\ y ${f.k > 0 ? '+' : '-'} ${Math.abs(f.k)})$.`,
      `$(${x0},\\ ${nn(y0)}) \\to (${x0 + f.h},\\ ${nn(y0 + f.k)})$`,
    ],
  };
}

function trImagePoint(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([2, 3, -1, -2, -3, 1 / 2, 4]), c: rng.pick([B(2), B(3), B(1, 2), B(1, 3)]), b: rng.pick([1, -1, 2, 1 / 2, -2]), h: rng.int(-4, 4), k: rng.int(-5, 5) }),
    (f) => f.b !== 1 || Math.abs(f.a) !== 1,
  );
  const [x0, y0] = basePoint(rng, f.c, f.b);
  const X = x0 / f.b + f.h;
  const Y = f.a * y0 + f.k;
  return {
    prompt: `The point $(${x0},\\ ${nn(y0)})$ is on the graph of $y = ${btex(f.c)}^{x}$. Find its image on the graph of $y = ${expTex(f)}$.`,
    parts: [part({ kind: 'point', x: X + 0, y: Y + 0 }, { label: 'Image point' })],
    hints: [`Compare with $y = a(c)^{b(x - h)} + k$ to read $a$, $b$, $h$ and $k$.`, `Use the mapping $${mapRule}$.`],
    solution: [
      `Here $a = ${nn(f.a)}$, $b = ${nn(f.b)}$, $h = ${f.h}$ and $k = ${f.k}$.`,
      `Mapping: $${mapRule}$.`,
      `$x$: $${Number.isInteger(f.b) ? `\\dfrac{${x0}}{${f.b}}` : `${x0} \\div ${pn(f.b)}`} + ${pn(f.h)} = ${nn(X)}$; $y$: $${pn(f.a)}(${nn(y0)}) + ${pn(f.k)} = ${nn(Y)}$.`,
      `The image point is $(${nn(X)},\\ ${nn(Y)})$.`,
    ],
  };
}

function trDomainRange(rng: Rng): GenOutput {
  const f: ExpFn = { a: rng.pick([1, -1, 2, -2, 3, -3, 1 / 2, -1 / 2]), c: rng.pick(EXP_BASES), b: rng.pick([1, -1, 2, 1 / 2]), h: rng.int(-5, 5), k: rng.nonZero(-6, 6) };
  const up = f.a > 0;
  const range = setv('y', up ? '>' : '<', f.k);
  const correct = dr(D_ALL, range);
  const distractors = rng.shuffle([dr(D_ALL, setv('y', up ? '<' : '>', f.k)), dr(D_ALL, setv('y', up ? '>' : '<', -f.k)), dr(setv('x', '>', f.h === 0 ? f.k : f.h), range), dr(D_ALL, setv('y', up ? '\\ge' : '\\le', f.k))]);
  return {
    prompt: `State the domain and range of $y = ${expTex(f)}$.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['Stretches, reflections and translations never limit which $x$-values can be used.', `The asymptote is $y = ${f.k}$. Is the graph above it or below it?`],
    solution: [
      `Any real number can be substituted for $x$, so the domain is $${D_ALL}$.`,
      `The horizontal asymptote $y = 0$ of $y = ${btex(f.c)}^{x}$ moves to $y = ${f.k}$.`,
      up
        ? `$a = ${nn(f.a)} > 0$, so the graph stays above the asymptote: range $${range}$.`
        : `$a = ${nn(f.a)} < 0$ reflects the graph in the $x$-axis before the translation, so it stays below the asymptote: range $${range}$.`,
    ],
  };
}

function trDescribe(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([1, -1, 2, -2, 3, -3, 1 / 2, -1 / 2, 4]), c: rng.pick(EXP_BASES), b: rng.pick([1, 1, -1, 2, 1 / 2, 3, 1 / 3]), h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) }),
    (f) => (Math.abs(f.a) !== 1 || Math.abs(f.b) !== 1) && !(f.a < 0 && f.b < 0),
  );
  const w = (t: Tr, flip = {}) => cap(transformWords(t, flip)) + '.';
  const distractors = rng.shuffle(
    [
      Math.abs(f.b) !== 1 ? w(f, { hStretch: true }) : null,
      Math.abs(f.a) !== 1 ? w(f, { aStretch: true }) : null,
      f.a < 0 || f.b < 0 ? w(f, { axes: true }) : null,
      w({ ...f, h: -f.h }),
      w({ ...f, k: -f.k }),
    ].filter((s): s is string => !!s),
  );
  return {
    prompt: `Which describes the transformations that map the graph of $y = ${btex(f.c)}^{x}$ onto the graph of $y = ${expTex(f)}$?`,
    parts: [part(mc(rng, w(f), distractors))],
    hints: ['Compare with $y = a(c)^{b(x - h)} + k$.', '$|a|$ is a vertical stretch; a horizontal stretch has factor $\\frac{1}{|b|}$; a negative $a$ reflects in the $x$-axis and a negative $b$ in the $y$-axis.'],
    solution: [
      `$a = ${nn(f.a)}$, $b = ${nn(f.b)}$, $h = ${f.h}$, $k = ${f.k}$.`,
      ...(Math.abs(f.a) !== 1 ? [`$|a| = ${nn(Math.abs(f.a))}$: vertical stretch by a factor of $${nn(Math.abs(f.a))}$.`] : []),
      ...(f.a < 0 ? ['$a < 0$: reflection in the $x$-axis.'] : []),
      ...(Math.abs(f.b) !== 1 ? [`$|b| = ${nn(Math.abs(f.b))}$: horizontal stretch by a factor of $\\frac{1}{|b|} = ${nn(1 / Math.abs(f.b))}$.`] : []),
      ...(f.b < 0 ? ['$b < 0$: reflection in the $y$-axis.'] : []),
      `$h = ${f.h}$ and $k = ${f.k}$: translation ${units(f.h)} ${f.h > 0 ? 'right' : 'left'} and ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}.`,
      w(f),
    ],
  };
}

function trYIntercept(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([1, -1, 2, -2, 3, -3, 4]), c: rng.pick([B(2), B(3), B(1, 2), B(1, 3)]), b: rng.pick([1, -1, 2]), h: rng.nonZero(-2, 2), k: rng.int(-6, 6) }),
    (f) => Math.abs(f.b * f.h) <= 3 && (f.a !== 1 || f.b !== 1),
  );
  const e = -f.b * f.h;
  const v = fpow(f.c, e);
  const y = (f.a * v.n) / v.d + f.k;
  return {
    prompt: `Find the $y$-intercept of $y = ${expTex(f)}$. Give an exact answer.`,
    parts: [numPart(y, { label: '$y$-intercept:' })],
    hints: ['Substitute $x = 0$.', 'Work out the exponent first, then the power, then multiply by $a$ and add $k$.'],
    solution: [
      `Substitute $x = 0$. The exponent is $${argTex(f.b, f.h).replace(/x/g, '0')} = ${e}$.`,
      `$y = ${f.a === 1 ? '' : f.a === -1 ? '-' : pn(f.a)}${btex(f.c)}^{${e}}${sgn(f.k)} = ${f.a === 1 ? '' : f.a === -1 ? '-' : pn(f.a)}${f.a !== 1 && f.a !== -1 ? `\\left(${ftex(v)}\\right)` : ftex(v)}${sgn(f.k)} = ${nn(y)}$`,
      `The $y$-intercept is $${nn(y)}$.`,
    ],
  };
}

function trFromDescription(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)]);
  const f = retry(
    (): ExpFn => ({ a: rng.sign() * rng.pick([1, 2, 3, 4, 1 / 2]), c, b: rng.pick([1, 1, 2, 3, 1 / 2, 1 / 3, -1]), h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) }),
    (f) => Math.abs(f.a) !== 1 || Math.abs(f.b) !== 1,
  );
  return {
    prompt: `The graph of $y = ${btex(c)}^{x}$ is transformed by ${transformWords(f)}. Write the equation of the transformed function.`,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. -3(2)^(x + 1) + 4' })],
    hints: ['Use the form $y = a(c)^{b(x - h)} + k$.', 'A horizontal stretch by a factor of $s$ gives $b = \\frac{1}{s}$; a reflection in the $x$-axis makes $a$ negative and a reflection in the $y$-axis makes $b$ negative.'],
    solution: [
      `Start from $y = a(${bsub(c)})^{b(x - h)} + k$.`,
      `Vertical: ${Math.abs(f.a) !== 1 ? `stretch by $${nn(Math.abs(f.a))}$` : 'no stretch'}${f.a < 0 ? ' and a reflection in the $x$-axis' : ''}, so $a = ${nn(f.a)}$.`,
      `Horizontal: ${Math.abs(f.b) !== 1 ? `stretch by $${nn(1 / Math.abs(f.b))}$, so $|b| = ${nn(Math.abs(f.b))}$` : 'no stretch'}${f.b < 0 ? ' and a reflection in the $y$-axis' : ''}, so $b = ${nn(f.b)}$.`,
      `Translation: $h = ${f.h}$ and $k = ${f.k}$.`,
      `$y = ${expTex(f)}$`,
    ],
  };
}

function trFromGraph(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 6, yMin: -8, yMax: 8 };
  const { f, pts } = retry(
    () => {
      const c = rng.pick([B(2), B(2), B(3), B(1, 2)]);
      const f: ExpFn = { a: rng.pick([1, 2, -1, -2, 3, -3]), c, b: 1, h: rng.int(-3, 3), k: rng.int(-4, 4) };
      const step = bval(c) > 1 ? 1 : -1;
      const pts: Pt[] = [
        [f.h, f.a + f.k],
        [f.h + step, f.a * Math.max(bval(c), 1 / bval(c)) + f.k],
      ];
      return { f, pts };
    },
    ({ f, pts }) => pts.every(([x, y]) => inGrid(g, x, y, 1)) && Math.abs(f.a * Math.max(bval(f.c), 1 / bval(f.c))) <= 6,
  );
  const cv = bval(f.c);
  const step = cv > 1 ? 1 : -1;
  const fig = expFig(f, g, pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })));
  const form = `y = a(${bsub(f.c)})^{x - h} + k`;
  const d0 = pts[0][1] - f.k;
  const d1 = pts[1][1] - f.k;
  return {
    prompt: `The graph is a transformation of $y = ${btex(f.c)}^{x}$. The dashed line is its horizontal asymptote. Write its equation in the form $${form}$.`,
    figure: fig,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 2(2)^(x - 1) + 3' })],
    hints: [
      'The asymptote gives $k$. In $y = a(c)^{x - h} + k$, when $x = h$ the point is $a$ units from the asymptote.',
      `Measure each labelled point's vertical distance from the asymptote. The distance is multiplied by $${nn(cv)}$ each time $x$ increases by $1$.`,
    ],
    solution: [
      `The asymptote is $y = ${f.k}$, so $k = ${f.k}$.`,
      `The point $${ptTex(pts[0][0], pts[0][1])}$ is $${Math.abs(d0)}$ ${d0 > 0 ? 'above' : 'below'} the asymptote and $${ptTex(pts[1][0], pts[1][1])}$ is $${Math.abs(d1)}$ ${d1 > 0 ? 'above' : 'below'} it. ${step === 1 ? 'Moving right' : 'Moving left'} by $1$ multiplies the distance by $${nn(Math.max(cv, 1 / cv))}$, which matches the base $${bsub(f.c)}$.`,
      `Take $h = ${f.h}$: at $x = h$, $y = a + k$, so $a = ${pts[0][1]} - ${pn(f.k)} = ${f.a}$${f.a < 0 ? ' (negative: the graph is reflected in the $x$-axis)' : ''}.`,
      `$y = ${expTex(f)}$ (any equivalent equation describes the same graph).`,
    ],
  };
}

function trMatch(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 6, yMin: -8, yMax: 8 };
  const f: ExpFn = { a: rng.pick([1, -1, 2, -2]), c: rng.pick([B(2), B(1, 2)]), b: 1, h: rng.nonZero(-3, 3), k: rng.nonZero(-4, 4) };
  const opts = [
    { md: '', figure: expFig(f, g), correct: true },
    { md: '', figure: expFig({ ...f, h: -f.h }, g) },
    { md: '', figure: expFig({ ...f, k: -f.k }, g) },
    { md: '', figure: expFig({ ...f, a: -f.a }, g) },
  ];
  return {
    prompt: `Which graph shows $y = ${expTex(f)}$? The dashed line on each graph is its horizontal asymptote.`,
    parts: [part(mcFigures(rng, opts))],
    hints: [`The asymptote is $y = ${f.k}$.`, `When $x = ${f.h}$, the exponent is $0$, so $y = ${nn(f.a)} + ${pn(f.k)} = ${nn(f.a + f.k)}$.`],
    solution: [
      `The horizontal asymptote is $y = ${f.k}$.`,
      `$a = ${nn(f.a)}$ is ${f.a > 0 ? 'positive, so the graph is above the asymptote' : 'negative, so the graph is reflected and lies below the asymptote'}.`,
      `When $x = ${f.h}$: $y = ${nn(f.a)}(${bsub(f.c)})^{0}${sgn(f.k)} = ${nn(f.a + f.k)}$, so the graph passes through $(${f.h},\\ ${nn(f.a + f.k)})$.`,
      'The correct graph has that asymptote, lies on that side of it, and passes through that point.',
    ],
  };
}

const expTransform = skill({
  id: 'm301-exp-transform',
  name: 'Transformations of exponential functions',
  description: 'Apply y = a(c)^(b(x - h)) + k: describe the transformations, find image points, the asymptote, intercept, domain and range, and write the equation from a description or a graph.',
  outcomes: ['RF9'],
  lessonId: 'm301-7-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['asymptote', 'describe', 'image'] as const);
      return kind === 'asymptote' ? trAsymptote(rng) : kind === 'describe' ? trDescribeShift(rng) : trImageShift(rng);
    }
    if (d === 2) {
      const kind = rng.pick(['image', 'domain', 'describe', 'yint'] as const);
      return kind === 'image' ? trImagePoint(rng) : kind === 'domain' ? trDomainRange(rng) : kind === 'describe' ? trDescribe(rng) : trYIntercept(rng);
    }
    const kind = rng.pick(['description', 'graph', 'match'] as const);
    return kind === 'description' ? trFromDescription(rng) : kind === 'graph' ? trFromGraph(rng) : trMatch(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Solving exponential equations with a common base — m301-exp-equation-common-base
// ---------------------------------------------------------------------------

/** Exponents m with g^m a convenient base. */
const FAMILY: Record<number, number[]> = { 2: [1, 2, 3, 4, 5, -1, -2, -3], 3: [1, 2, 3, 4, -1, -2, -3], 5: [1, 2, 3, -1, -2] };
const famBase = (g: number, m: number): Base => (m > 0 ? B(g ** m) : B(1, g ** -m));
/** g^n written as a number (or a fraction for a negative n). */
const powNum = (g: number, n: number) => (n >= 0 ? big(g ** n) : `\\dfrac{1}{${big(g ** -n)}}`);
/** (g^m)^e in LaTeX. */
const pw = (g: number, m: number, e: string) => (m === 1 ? `${g}^{${e}}` : `\\left(${g}^{${m}}\\right)^{${e}}`);
const rewrite = (g: number, pairs: Array<[string, number]>) => {
  const items = pairs.filter(([t]) => t !== String(g)).map(([t, m]) => `$${t} = ${g}^{${m}}$`);
  return `Write each base as a power of $${g}$: ${listWords(items)}.`;
};

function cbSimple(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 10]);
  const maxM: Record<number, number> = { 2: 10, 3: 7, 4: 5, 5: 5, 6: 4, 10: 5 };
  const m = rng.int(2, maxM[b]);
  const N = b ** m;
  const variant = rng.pick(['shift', 'shift', 'scale', 'recip'] as const);
  if (variant === 'recip') {
    return {
      prompt: `Solve $${b}^{x} = \\dfrac{1}{${big(N)}}$.`,
      parts: [numPart(-m, { label: '$x =$' })],
      hints: [`Write $${big(N)}$ as a power of $${b}$.`, 'A reciprocal is a negative exponent: $\\dfrac{1}{b^{n}} = b^{-n}$.'],
      solution: [`$\\dfrac{1}{${big(N)}} = \\dfrac{1}{${b}^{${m}}} = ${b}^{${-m}}$`, `$${b}^{x} = ${b}^{${-m}}$, so the exponents are equal.`, `$x = ${-m}$`],
    };
  }
  let lhs: string;
  let x: number;
  if (variant === 'scale' && (m % 2 === 0 || m % 3 === 0)) {
    const q = m % 3 === 0 && (m % 2 !== 0 || rng.chance(0.5)) ? 3 : 2;
    lhs = `${q}x`;
    x = m / q;
  } else {
    const p = rng.nonZero(-4, 4);
    lhs = lin(1, p);
    x = m - p;
  }
  return {
    prompt: `Solve $${b}^{${lhs}} = ${big(N)}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [`Write $${big(N)}$ as a power of $${b}$.`, 'When two powers with the same base are equal, their exponents are equal.'],
    solution: [`$${big(N)} = ${b}^{${m}}$`, `$${b}^{${lhs}} = ${b}^{${m}}$, so $${lhs} = ${m}$.`, `$x = ${nn(x)}$`],
  };
}

function cbTwoBases(rng: Rng): GenOutput {
  const g = rng.pick([2, 2, 3, 3, 5]);
  const o = retry(
    () => {
      const [m1, m2] = rng.sample(FAMILY[g], 2);
      return { m1, m2, p1: rng.pick([1, 1, 2]), p2: rng.pick([1, 1, 2, -1]), q1: rng.int(-4, 4), q2: rng.int(-4, 4) };
    },
    ({ m1, m2, p1, p2, q1, q2 }) => {
      const den = m1 * p1 - m2 * p2;
      if (den === 0) return false;
      const x = frac(m2 * q2 - m1 * q1, den);
      return x.d <= 9 && Math.abs(x.n / x.d) <= 12 && x.n !== 0 && !(m1 === 1 && p1 === 1 && q1 === 0);
    },
  );
  const { m1, m2, p1, p2, q1, q2 } = o;
  const c1 = famBase(g, m1);
  const c2 = famBase(g, m2);
  const e1 = lin(p1, q1);
  const e2 = lin(p2, q2);
  const [L, Lq, R, Rq] = [m1 * p1, m1 * q1, m2 * p2, m2 * q2];
  const x = frac(Rq - Lq, L - R);
  return {
    prompt: `Solve $${btex(c1)}^{${e1}} = ${btex(c2)}^{${e2}}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Both bases are powers of $${g}$.`, 'Rewrite each side as a single power of the same base, then set the exponents equal.'],
    solution: [
      rewrite(g, [
        [btex(c1), m1],
        [btex(c2), m2],
      ]),
      `$${pw(g, m1, e1)} = ${pw(g, m2, e2)}$`,
      `Power of a power — multiply the exponents: $${g}^{${lin(L, Lq)}} = ${g}^{${lin(R, Rq)}}$`,
      `The bases are equal, so the exponents are equal: $${lin(L, Lq)} = ${lin(R, Rq)}$.`,
      `$${lin(L - R, 0)} = ${Rq - Lq}$, so $x = ${ftex(x)}$.`,
    ],
  };
}

function cbToNumber(rng: Rng): GenOutput {
  const g = rng.pick([2, 2, 3, 5]);
  const o = retry(
    () => ({ m1: rng.pick(FAMILY[g].filter((m) => m !== 1)), n: rng.nonZero(-4, 6), p: rng.pick([1, 1, 2]), q: rng.int(-3, 3) }),
    ({ m1, n, p, q }) => {
      const x = frac(n - m1 * q, m1 * p);
      return g ** Math.abs(n) <= 729 && x.d <= 12 && x.n !== 0;
    },
  );
  const { m1, n, p, q } = o;
  const c1 = famBase(g, m1);
  const e1 = lin(p, q);
  const x = frac(n - m1 * q, m1 * p);
  return {
    prompt: `Solve $${btex(c1)}^{${e1}} = ${powNum(g, n)}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Write both sides as powers of $${g}$.`, 'Multiply exponents for a power of a power, then set the exponents equal.'],
    solution: [
      `$${btex(c1)} = ${g}^{${m1}}$ and $${powNum(g, n)} = ${g}^{${n}}$.`,
      `$${pw(g, m1, e1)} = ${g}^{${n}}$, so $${g}^{${lin(m1 * p, m1 * q)}} = ${g}^{${n}}$.`,
      `Equate the exponents: $${lin(m1 * p, m1 * q)} = ${n}$.`,
      `$x = ${ftex(x)}$`,
    ],
  };
}

function cbProductQuotient(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 3, 5]);
  const tpl = rng.pick(['div', 'mul', 'prod'] as const);
  const o = retry(
    () => {
      const [m1, m2] = rng.sample(FAMILY[g].filter((m) => m > 0 || rng.chance(0.4)), 2);
      return { m1, m2, p1: rng.pick([1, 1, 2]), p2: rng.pick([1, 1, 2]), q1: rng.int(-3, 3), q2: rng.int(-3, 3), n: tpl === 'prod' ? rng.nonZero(-3, 5) : rng.int(1, g === 2 ? 3 : 2) };
    },
    (o) => {
      if (o.m1 === undefined || o.m2 === undefined) return false;
      const { Lp, Lq, Rp, Rq } = pqSides(tpl, o);
      if (Lp === Rp) return false;
      const x = frac(Rq - Lq, Lp - Rp);
      return x.d <= 9 && Math.abs(x.n / x.d) <= 12 && x.n !== 0 && g ** Math.abs(o.n) <= 625;
    },
  );
  const { m1, m2, p1, p2, q1, q2, n } = o;
  const { Lp, Lq, Rp, Rq } = pqSides(tpl, o);
  const x = frac(Rq - Lq, Lp - Rp);
  const c1 = famBase(g, m1);
  const c2 = famBase(g, m2);
  const e1 = lin(p1, q1);
  const e2 = lin(p2, q2);
  const P1 = `${btex(c1)}^{${e1}}`;
  const P2 = `${btex(c2)}^{${e2}}`;
  const eq = tpl === 'div' ? `${P1} = \\dfrac{${P2}}{${g ** n}}` : tpl === 'mul' ? `${P1} = ${g ** n} \\cdot ${P2}` : `${P1} \\cdot ${P2} = ${powNum(g, n)}`;
  const G1 = pw(g, m1, e1);
  const G2 = pw(g, m2, e2);
  const eqG = tpl === 'div' ? `${G1} = \\dfrac{${G2}}{${g}^{${n}}}` : tpl === 'mul' ? `${G1} = ${g}^{${n}} \\cdot ${G2}` : `${G1} \\cdot ${G2} = ${g}^{${n}}`;
  const law = tpl === 'div' ? 'to divide powers, subtract the exponents' : 'to multiply powers, add the exponents';
  return {
    prompt: `Solve $${eq}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Write every base and number as a power of $${g}$.`, `Use the exponent laws (${law}) to get a single power on each side, then equate the exponents.`],
    solution: [
      rewrite(g, [
        [btex(c1), m1],
        [btex(c2), m2],
        ...(tpl === 'prod' ? ([[powNum(g, n), n]] as Array<[string, number]>) : ([[String(g ** n), n]] as Array<[string, number]>)),
      ]),
      `$${eqG}$`,
      `Multiply exponents for each power of a power, and ${law}: $${g}^{${lin(Lp, Lq)}} = ${g}^{${lin(Rp, Rq)}}$`,
      `Equate the exponents: $${lin(Lp, Lq)} = ${lin(Rp, Rq)}$.`,
      `$${lin(Lp - Rp, 0)} = ${Rq - Lq}$, so $x = ${ftex(x)}$.`,
    ],
  };
}
function pqSides(tpl: 'div' | 'mul' | 'prod', o: { m1: number; m2: number; p1: number; p2: number; q1: number; q2: number; n: number }) {
  const { m1, m2, p1, p2, q1, q2, n } = o;
  if (tpl === 'prod') return { Lp: m1 * p1 + m2 * p2, Lq: m1 * q1 + m2 * q2, Rp: 0, Rq: n };
  return { Lp: m1 * p1, Lq: m1 * q1, Rp: m2 * p2, Rq: m2 * q2 + (tpl === 'div' ? -n : n) };
}

/** x^2 + bx + c in LaTeX. */
function quadTex(b: number, c: number): string {
  let s = 'x^{2}';
  if (b) s += ` ${b > 0 ? '+' : '-'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
  if (c) s += ` ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  return s;
}
const factorTex = (r: number) => `(x ${r > 0 ? '-' : '+'} ${Math.abs(r)})`;

function cbQuadratic(rng: Rng): GenOutput {
  if (rng.chance(0.4)) {
    const g = rng.pick([2, 3, 5]);
    const r = rng.int(1, 3);
    const n = rng.int(1, g === 2 ? 6 : g === 3 ? 4 : 3);
    const c = n - r * r;
    const lhs = c === 0 ? 'x^{2}' : `x^{2} ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
    return {
      prompt: `Solve $${g}^{${lhs}} = ${big(g ** n)}$. Enter all solutions.`,
      parts: [solPart([-r, r])],
      hints: [`Write $${big(g ** n)}$ as a power of $${g}$.`, 'After equating the exponents you get a quadratic equation; it can have two solutions.'],
      solution: [`$${big(g ** n)} = ${g}^{${n}}$, so $${lhs} = ${n}$.`, `$x^{2} = ${r * r}$`, `$x = \\pm ${r}$: $x = ${-r}$ or $x = ${r}$.`],
    };
  }
  const g = rng.pick([2, 3]);
  const o = retry(
    () => {
      const m = rng.pick([2, 3]);
      const [r1, r2] = rng.sample([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], 2);
      return { m, r1, r2 };
    },
    ({ m, r1, r2 }) => (r1 * r2) % m === 0 && Math.abs(m - (r1 + r2)) <= 8,
  );
  const { m, r1, r2 } = o;
  const t = (-r1 * r2) / m;
  const A = m - (r1 + r2);
  const lhs = quadTex(A, 0);
  const s = r1 + r2;
  const pr = r1 * r2;
  return {
    prompt: `Solve $${g}^{${lhs}} = ${g ** m}^{${lin(1, t)}}$. Enter all solutions.`,
    parts: [solPart([r1, r2])],
    hints: [`Write $${g ** m}$ as a power of $${g}$ and equate the exponents.`, 'Rearrange the quadratic so one side is $0$, then factor.'],
    solution: [
      `$${g ** m} = ${g}^{${m}}$, so the right side is $${pw(g, m, lin(1, t))} = ${g}^{${lin(m, m * t)}}$.`,
      `Equate the exponents: $${lhs} = ${lin(m, m * t)}$.`,
      `$${quadTex(-s, pr)} = 0$`,
      `$${factorTex(r1)}${factorTex(r2)} = 0$`,
      `$x = ${Math.min(r1, r2)}$ or $x = ${Math.max(r1, r2)}$`,
    ],
  };
}

function cbApplication(rng: Rng): GenOutput {
  const kind = rng.pick(['double', 'half', 'triple'] as const);
  if (kind === 'double') {
    const N0 = rng.pick([100, 150, 200, 250, 300, 400, 500, 750]);
    const [d, unit, word] = rng.pick([
      [2, 'h', 'hours'],
      [3, 'h', 'hours'],
      [4, 'h', 'hours'],
      [5, 'h', 'hours'],
      [20, 'min', 'minutes'],
      [30, 'min', 'minutes'],
    ] as const);
    const m = rng.int(3, 7);
    const N = N0 * 2 ** m;
    return {
      prompt: `A culture starts with ${N0} bacteria and the number doubles every ${d} ${word}. The number of bacteria after $t$ ${word} is $N = ${N0}(2)^{\\frac{t}{${d}}}$. How long will it take for the culture to reach ${big(N)} bacteria?`,
      parts: [numPart(m * d, { suffix: unit })],
      hints: [`Substitute $N = ${big(N)}$ and divide both sides by $${N0}$.`, 'Write the result as a power of $2$ and equate the exponents.'],
      solution: [
        `$${big(N)} = ${N0}(2)^{\\frac{t}{${d}}}$`,
        `Divide by $${N0}$: $${2 ** m} = 2^{\\frac{t}{${d}}}$`,
        `$2^{${m}} = 2^{\\frac{t}{${d}}}$, so $\\dfrac{t}{${d}} = ${m}$.`,
        `$t = ${m * d}$ ${word}`,
      ],
    };
  }
  if (kind === 'half') {
    const A0 = rng.pick([80, 96, 160, 200, 320, 400, 640, 800]);
    const [h, unit, word] = rng.pick([
      [6, 'h', 'hours'],
      [8, 'h', 'hours'],
      [12, 'h', 'hours'],
      [4, 'days', 'days'],
      [8, 'days', 'days'],
      [14, 'days', 'days'],
      [30, 'years', 'years'],
    ] as const);
    const m = rng.int(2, 5);
    const A = A0 / 2 ** m;
    return {
      prompt: `A sample of a radioactive isotope has a mass of ${A0} mg. Its half-life is ${h} ${word}, so the mass remaining after $t$ ${word} is $A = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${h}}}$. How long will it take until ${fmt(A)} mg remain?`,
      parts: [numPart(m * h, { suffix: unit })],
      hints: [`Substitute $A = ${fmt(A)}$ and divide both sides by $${A0}$.`, 'Write the fraction as a power of $\\frac{1}{2}$ and equate the exponents.'],
      solution: [
        `$${fmt(A)} = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${h}}}$`,
        `Divide by $${A0}$: $\\dfrac{${fmt(A)}}{${A0}} = \\dfrac{1}{${2 ** m}} = \\left(\\frac{1}{2}\\right)^{${m}}$`,
        `So $\\dfrac{t}{${h}} = ${m}$.`,
        `$t = ${m * h}$ ${word}`,
      ],
    };
  }
  const name = rng.pick(NAMES);
  const [S0, d] = [rng.pick([20, 30, 40, 50, 60]), rng.pick([2, 3, 4, 5])];
  const m = rng.int(2, 4);
  const S = S0 * 3 ** m;
  return {
    prompt: `The number of views of ${name}'s video on hiking near Canmore triples every ${d} days. The number of views $t$ days after posting is modelled by $V = ${S0}(3)^{\\frac{t}{${d}}}$. After how many days will it have ${big(S)} views?`,
    parts: [numPart(m * d, { suffix: 'days' })],
    hints: [`Substitute $V = ${big(S)}$ and divide both sides by $${S0}$.`, 'Write the result as a power of $3$ and equate the exponents.'],
    solution: [`$${big(S)} = ${S0}(3)^{\\frac{t}{${d}}}$`, `Divide by $${S0}$: $${3 ** m} = 3^{\\frac{t}{${d}}}$`, `$3^{${m}} = 3^{\\frac{t}{${d}}}$, so $\\dfrac{t}{${d}} = ${m}$.`, `$t = ${m * d}$ days`],
  };
}

/** g^n multiplied by a root of g, in LaTeX (s = 1/2, -1/2, 1/3 or 2/3). */
function radArg(g: number, n: number, s: number): string {
  const head = n === 0 ? '' : big(g ** n);
  if (s === 1 / 2) return `${head}\\sqrt{${g}}`;
  if (s === 1 / 3) return `${head}\\sqrt[3]{${g}}`;
  if (s === 2 / 3) return `${head}\\sqrt[3]{${g * g}}`;
  return `\\dfrac{${n === 0 ? 1 : big(g ** n)}}{\\sqrt{${g}}}`;
}
const rootPow = (s: number) => (s === 1 / 2 ? '\\sqrt{a} = a^{\\frac{1}{2}}' : s === -1 / 2 ? '\\dfrac{1}{\\sqrt{a}} = a^{-\\frac{1}{2}}' : s === 1 / 3 ? '\\sqrt[3]{a} = a^{\\frac{1}{3}}' : '\\sqrt[3]{a^{2}} = a^{\\frac{2}{3}}');

function cbRadical(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 5]);
  const m = rng.pick(g === 5 ? [1, 2] : [1, 2, 3]);
  const n = rng.int(0, g === 2 ? 3 : 2);
  const s = rng.pick([1 / 2, -1 / 2, 1 / 3]);
  const q = rng.int(-2, 2);
  const x = (n + s) / m - q;
  const lhs = `${g ** m}^{${lin(1, q)}}`;
  return {
    prompt: `Solve $${lhs} = ${radArg(g, n, s)}$. Give an exact answer.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [`Write the radical as a power with a rational exponent: $${rootPow(s)}$.`, `Write both sides as powers of $${g}$, then equate the exponents.`],
    solution: [
      `Right side: $${radArg(g, n, s)} = ${g}^{${n}} \\cdot ${g}^{${nn(s)}} = ${g}^{${nn(n + s)}}$`,
      `Left side: $${m === 1 ? `${g}^{${lin(1, q)}}` : `${pw(g, m, lin(1, q))} = ${g}^{${lin(m, m * q)}}`}$`,
      `Equate the exponents: $${lin(m, m * q)} = ${nn(n + s)}$.`,
      `$x = ${nn(x)}$`,
    ],
  };
}

const expCommonBase = skill({
  id: 'm301-exp-equation-common-base',
  name: 'Exponential equations with a common base',
  description: 'Solve exponential equations by writing both sides as powers of the same base and equating the exponents.',
  outcomes: ['RF10'],
  lessonId: 'm301-7-3',
  gen(rng, d): GenOutput {
    if (d === 1) return cbSimple(rng);
    if (d === 2) return rng.chance(0.55) ? cbTwoBases(rng) : cbToNumber(rng);
    const kind = rng.pick(['pq', 'pq', 'quad', 'app', 'rad'] as const);
    if (kind === 'pq') return cbProductQuotient(rng);
    if (kind === 'quad') return cbQuadratic(rng);
    return kind === 'app' ? cbApplication(rng) : cbRadical(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.4 Understanding logarithms — m301-log-evaluate, m301-log-exp-form
// ---------------------------------------------------------------------------

const LOG_DEF = '$\\log_{c} x = y$ means $c^{y} = x$: the logarithm is an exponent.';

function logBasic(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
  const maxN = Math.min(6, Math.floor(Math.log(100000) / Math.log(b) + 1e-9));
  const weights: Array<[number, number]> = [
    [0, 1],
    [1, 1],
  ];
  for (let k = 2; k <= maxN; k++) weights.push([k, 3]);
  const n = rng.weighted(weights);
  const N = b ** n;
  return {
    prompt: `Evaluate $${logb(b)} ${big(N)}$.`,
    parts: [numPart(n)],
    hints: [`$${logb(b)} ${big(N)}$ asks: $${b}$ to what exponent gives $${big(N)}$?`, b === 10 ? 'A logarithm with no base written is the common logarithm, base $10$.' : `List the powers of $${b}$: $${b}^{1} = ${b}$, $${b}^{2} = ${b * b}$, and so on.`],
    solution: [`$${b}^{${n}} = ${big(N)}$`, `So $${logb(b)} ${big(N)} = ${n}$.`],
  };
}

function logCalc(rng: Rng): GenOutput {
  const decimals = rng.pick([2, 3]);
  const N = retry(
    () => rng.pick([rng.int(2, 99), rng.int(101, 999), rng.int(2, 99) / 100, rng.int(1001, 9999)]),
    (v) => !Number.isInteger(lg(v)) && safeRound(lg(v), decimals),
  );
  const k = Math.floor(lg(N));
  return {
    prompt: `Use a calculator to evaluate $\\log ${fmt(N)}$, ${roundingPhrase(decimals)}.`,
    parts: [numPart(lg(N), { decimals })],
    hints: ['$\\log$ with no base is the common logarithm, base $10$. Use the LOG key.', `Estimate first: $10^{${k}} < ${fmt(N)} < 10^{${k + 1}}$.`],
    solution: [
      `$\\log ${fmt(N)}$ is the exponent on $10$ that gives $${fmt(N)}$.`,
      `Since $10^{${k}} = ${fmt(10 ** k, 6)}$ and $10^{${k + 1}} = ${fmt(10 ** (k + 1), 6)}$, the answer is between $${k}$ and $${k + 1}$.`,
      `$\\log ${fmt(N)} \\approx ${fx(lg(N), decimals)}$`,
    ],
    calculator: true,
  };
}

function logNegFrac(rng: Rng): GenOutput {
  const kind = rng.pick(['recip', 'fracBase', 'root', 'powBase', 'powBase'] as const);
  let tex = '';
  let v = 0;
  let steps: string[] = [];
  if (kind === 'recip') {
    const b = rng.pick([2, 3, 4, 5, 6, 10]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 10000,
    );
    const arg = b === 10 ? fmt(10 ** -n, 6) : `\\frac{1}{${big(b ** n)}}`;
    tex = `${logb(b)} ${arg}`;
    v = -n;
    steps = [`$${arg} = \\dfrac{1}{${b}^{${n}}} = ${b}^{${-n}}$`, `So $${tex} = ${-n}$.`];
  } else if (kind === 'fracBase') {
    const b = rng.pick([2, 3, 4, 5]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 625,
    );
    const up = rng.chance(0.6);
    const arg = up ? big(b ** n) : `\\frac{1}{${big(b ** n)}}`;
    tex = `\\log_{\\frac{1}{${b}}} ${arg}`;
    v = up ? -n : n;
    steps = [`Ask: $\\frac{1}{${b}}$ to what exponent gives $${arg}$?`, `$\\left(\\frac{1}{${b}}\\right)^{${v}} = ${arg}$`, `So $${tex} = ${v}$.`];
  } else if (kind === 'root') {
    const b = rng.pick([2, 3, 5, 7, 10]);
    const [arg, val, why] = rng.pick([
      [`\\sqrt{${b}}`, 1 / 2, `\\sqrt{${b}} = ${b}^{\\frac{1}{2}}`],
      [`\\sqrt[3]{${b}}`, 1 / 3, `\\sqrt[3]{${b}} = ${b}^{\\frac{1}{3}}`],
      [`${b}\\sqrt{${b}}`, 3 / 2, `${b}\\sqrt{${b}} = ${b}^{1} \\cdot ${b}^{\\frac{1}{2}} = ${b}^{\\frac{3}{2}}`],
      [`\\frac{1}{\\sqrt{${b}}}`, -1 / 2, `\\frac{1}{\\sqrt{${b}}} = ${b}^{-\\frac{1}{2}}`],
      [`\\sqrt[3]{${b * b}}`, 2 / 3, `\\sqrt[3]{${b * b}} = \\sqrt[3]{${b}^{2}} = ${b}^{\\frac{2}{3}}`],
    ] as const);
    tex = `${logb(b)} ${arg.startsWith(String(b)) ? `\\left(${arg}\\right)` : arg}`;
    v = val;
    steps = [`Write the argument as a power of $${b}$: $${why}$.`, `So $${tex} = ${nn(val)}$.`];
  } else {
    const g = rng.pick([2, 3, 5]);
    const m = rng.pick(g === 2 ? [2, 3, 4] : [2, 3]);
    const n = retry(
      () => rng.nonZero(-6, 6),
      (k) => k % m !== 0 && g ** Math.abs(k) <= 3125,
    );
    const arg = n > 0 ? big(g ** n) : `\\frac{1}{${big(g ** -n)}}`;
    tex = `${logb(g ** m)} ${arg}`;
    v = n / m;
    steps = [
      `Write both numbers as powers of $${g}$: $${g ** m} = ${g}^{${m}}$ and $${arg} = ${g}^{${n}}$.`,
      `If $\\left(${g}^{${m}}\\right)^{y} = ${g}^{${n}}$, then $${m}y = ${n}$.`,
      `$y = ${nn(v)}$, so $${tex} = ${nn(v)}$.`,
    ];
  }
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: [LOG_DEF, 'Write the argument (and the base, if needed) as powers of the same number. Negative and fractional exponents are allowed.'],
    solution: steps,
  };
}

function logBetween(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 10]);
  const k = retry(
    () => rng.int(1, 4),
    (j) => b ** (j + 1) <= 100000,
  );
  const N = retry(
    () => rng.int(b ** k + 1, b ** (k + 1) - 1),
    (x) => !Number.isInteger(Math.log(x) / Math.log(b) + 1e-12) && Math.abs(Math.log(x) / Math.log(b) - Math.round(Math.log(x) / Math.log(b))) > 0.05,
  );
  const q = Math.floor(N / b);
  const opt = (a: number) => `$${a}$ and $${a + 1}$`;
  const value = Math.log(N) / Math.log(b);
  return {
    prompt: `Between which two consecutive whole numbers is $${logb(b)} ${big(N)}$?`,
    parts: [part(mc(rng, opt(k), rng.shuffle([opt(k - 1), opt(k + 1), opt(q), opt(k + 2)])))],
    hints: [`List powers of $${b}$ and find the two that $${big(N)}$ lies between.`, LOG_DEF],
    solution: [
      `$${b}^{${k}} = ${big(b ** k)}$ and $${b}^{${k + 1}} = ${big(b ** (k + 1))}$.`,
      `Since $${big(b ** k)} < ${big(N)} < ${big(b ** (k + 1))}$, the exponent is between $${k}$ and $${k + 1}$: $${k} < ${logb(b)} ${big(N)} < ${k + 1}$.`,
      `(Check with a calculator: $${logb(b)} ${big(N)} = \\dfrac{\\log ${big(N)}}{\\log ${b}} \\approx ${fx(value, 2)}$.)`,
    ],
  };
}

/** A logarithm with an exact value, for combined questions. */
function simpleLog(rng: Rng): { tex: string; v: number; why: string } {
  const kind = rng.pick(['pow', 'recip', 'powBase'] as const);
  if (kind === 'pow') {
    const b = rng.pick([2, 3, 4, 5, 10]);
    const n = retry(
      () => rng.int(2, 4),
      (k) => b ** k <= 10000,
    );
    return { tex: `${logb(b)} ${big(b ** n)}`, v: n, why: `$${b}^{${n}} = ${big(b ** n)}$` };
  }
  if (kind === 'recip') {
    const b = rng.pick([2, 3, 5]);
    const n = rng.int(1, 3);
    return { tex: `${logb(b)} \\frac{1}{${b ** n}}`, v: -n, why: `$${b}^{${-n}} = \\frac{1}{${b ** n}}$` };
  }
  const g = rng.pick([2, 3]);
  const m = rng.pick([2, 3]);
  const n = retry(
    () => rng.nonZero(-5, 5),
    (k) => k % m !== 0 && g ** Math.abs(k) <= 243,
  );
  const arg = n > 0 ? `${g ** n}` : `\\frac{1}{${g ** -n}}`;
  return { tex: `${logb(g ** m)} ${arg}`, v: n / m, why: `$${g ** m}^{${nn(n / m)}} = \\left(${g}^{${m}}\\right)^{${nn(n / m)}} = ${g}^{${n}} = ${arg}$` };
}

function logCombo(rng: Rng): GenOutput {
  const f1 = simpleLog(rng);
  const f2 = retry(
    () => simpleLog(rng),
    (f) => f.tex !== f1.tex,
  );
  const c1 = rng.pick([1, 1, 2, 3]);
  const op = rng.pick(['+', '-'] as const);
  const v = c1 * f1.v + (op === '+' ? f2.v : -f2.v);
  const tex = `${c1 === 1 ? '' : c1}${f1.tex} ${op} ${f2.tex}`;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: ['Evaluate each logarithm separately, then combine.', LOG_DEF],
    solution: [
      `$${f1.tex} = ${nn(f1.v)}$ because ${f1.why}.`,
      `$${f2.tex} = ${nn(f2.v)}$ because ${f2.why}.`,
      `$${c1 === 1 ? '' : `${c1}`}${c1 === 1 ? nn(f1.v) : `\\left(${nn(f1.v)}\\right)`} ${op} ${pn(f2.v)} = ${nn(v)}$`,
    ],
  };
}

const NESTED: Array<[number, number, number]> = [
  [2, 2, 1],
  [2, 4, 2],
  [2, 8, 3],
  [2, 16, 4],
  [3, 9, 2],
  [3, 3, 1],
  [4, 2, 1 / 2],
  [4, 8, 3 / 2],
  [8, 2, 1 / 3],
  [9, 3, 1 / 2],
  [4, 16, 2],
  [8, 4, 2 / 3],
];
function logNested(rng: Rng): GenOutput {
  const [[a, e, ans], b] = retry(
    () => [rng.pick(NESTED), rng.pick([2, 3, 5, 10])] as const,
    ([[, e], b]) => b ** e <= 1000000,
  );
  const N = b ** e;
  const tex = `${logb(a)}\\left(${logb(b)} ${big(N)}\\right)`;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(ans)],
    hints: ['Work from the inside out: evaluate the inner logarithm first.', LOG_DEF],
    solution: [`Inner: $${logb(b)} ${big(N)} = ${e}$ because $${b}^{${e}} = ${big(N)}$.`, `Outer: $${logb(a)} ${e} = ${nn(ans)}$ because $${a}^{${nn(ans)}} = ${e}$.`, `So $${tex} = ${nn(ans)}$.`],
  };
}

function logInverse(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 7]);
  const c = rng.pick([2, 3, 4, 5, 10]);
  const n = rng.int(2, 9);
  const variant = rng.pick(['add', 'sub', 'square'] as const);
  if (variant === 'square') {
    const M = rng.int(2, 9);
    const tex = `${b}^{2${logb(b)} ${M}} + ${logb(c)} ${c}^{${n}}`;
    return {
      prompt: `Evaluate $${tex}$.`,
      parts: [numPart(M * M + n)],
      hints: ['$c^{\\log_{c} x} = x$ and $\\log_{c} c^{n} = n$: a power and a logarithm with the same base undo each other.', `Write $${b}^{2${logb(b)} ${M}}$ as $\\left(${b}^{${logb(b)} ${M}}\\right)^{2}$.`],
      solution: [
        `$${b}^{2${logb(b)} ${M}} = \\left(${b}^{${logb(b)} ${M}}\\right)^{2} = ${M}^{2} = ${M * M}$`,
        `$${logb(c)} ${c}^{${n}} = ${n}$`,
        `$${M * M} + ${n} = ${M * M + n}$`,
      ],
    };
  }
  const M = rng.int(2, 20);
  const op = variant === 'add' ? '+' : '-';
  const v = variant === 'add' ? M + n : M - n;
  const tex = `${b}^{${logb(b)} ${M}} ${op} ${logb(c)} ${c}^{${n}}`;
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [numPart(v)],
    hints: ['A power and a logarithm with the same base undo each other: $c^{\\log_{c} x} = x$ and $\\log_{c} c^{n} = n$.', 'Simplify each term, then combine.'],
    solution: [`$${b}^{${logb(b)} ${M}} = ${M}$`, `$${logb(c)} ${c}^{${n}} = ${n}$`, `$${M} ${op} ${n} = ${v}$`],
  };
}

function logRootPower(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 5, 10]);
  const n = rng.int(1, g === 10 ? 3 : 2);
  const s = rng.pick([1 / 2, -1 / 2, 1 / 3, 2 / 3]);
  const arg = radArg(g, n, s);
  const tex = `${logb(g)}\\left(${arg}\\right)`;
  const v = n + s;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: [`Write the argument as a single power of $${g}$.`, `Use $${rootPow(s)}$ and add exponents when multiplying powers.`],
    solution: [`$${arg} = ${g}^{${n}} \\cdot ${g}^{${nn(s)}} = ${g}^{${nn(v)}}$`, `$${logb(g)} ${g}^{${nn(v)}} = ${nn(v)}$`],
  };
}

const logEvaluate = skill({
  id: 'm301-log-evaluate',
  name: 'Evaluating logarithms',
  description: 'Evaluate logarithms, including common logarithms, fractional and negative values, and estimate a logarithm between consecutive integers.',
  outcomes: ['RF7'],
  lessonId: 'm301-7-4',
  gen(rng, d): GenOutput {
    if (d === 1) return rng.chance(0.75) ? logBasic(rng) : logCalc(rng);
    if (d === 2) return rng.chance(0.7) ? logNegFrac(rng) : logBetween(rng);
    const kind = rng.pick(['combo', 'combo', 'nested', 'inverse', 'root'] as const);
    if (kind === 'combo') return logCombo(rng);
    if (kind === 'nested') return logNested(rng);
    return kind === 'inverse' ? logInverse(rng) : logRootPower(rng);
  },
});

/** A power b^n with its value written as a number or fraction. */
function powPair(rng: Rng, neg: boolean): { b: number; n: number; N: string; v: number } {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 10]);
  const n = retry(
    () => (neg ? -rng.int(1, 3) : rng.int(2, 4)),
    (k) => b ** Math.abs(k) <= 10000 && k !== b,
  );
  const N = n >= 0 ? big(b ** n) : b === 10 ? fmt(10 ** n, 6) : `\\frac{1}{${big(b ** -n)}}`;
  return { b, n, N, v: b ** n };
}

function lfToLog(rng: Rng): GenOutput {
  const { b, n, N } = powPair(rng, rng.chance(0.35));
  const correct = `$${logb(b)} ${N} = ${n}$`;
  const distractors = [...(n >= 2 ? [`$\\log_{${n}} ${N} = ${b}$`] : [`$${logb(b)} ${N} = ${-n}$`]), `$\\log_{${N}} ${b} = ${n}$`, `$${logb(b)} ${n} = ${N}$`];
  return {
    prompt: `Write $${b}^{${n}} = ${N}$ in logarithmic form.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: [LOG_DEF, 'The base of the power is the base of the logarithm, and the logarithm equals the exponent.'],
    solution: [`In $${b}^{${n}} = ${N}$, the base is $${b}$ and the exponent is $${n}$.`, `The logarithm is the exponent: $${logb(b)} ${N} = ${n}$.`],
  };
}

function lfToExp(rng: Rng): GenOutput {
  const { b, n, N } = powPair(rng, rng.chance(0.35));
  const Np = N.startsWith('\\frac') || N.includes('.') ? `\\left(${N}\\right)` : N;
  const correct = `$${b}^{${n}} = ${N}$`;
  const distractors = [...(n >= 2 ? [`$${n}^{${b}} = ${N}$`] : [`$${b}^{${-n}} = ${N}$`]), `$${Np}^{${n}} = ${b}$`, `$${b}^{${N}} = ${n}$`];
  return {
    prompt: `Write $${logb(b)} ${N} = ${n}$ in exponential form.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: [LOG_DEF, b === 10 ? 'With no base written, the base is $10$.' : `The base of the logarithm, $${b}$, becomes the base of the power.`],
    solution: [`The base is $${b}$ and the logarithm (the exponent) is $${n}$.`, `$${b}^{${n}} = ${N}$`],
  };
}

function lfSolveArg(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 10]);
  const n = retry(
    () => rng.int(1, 4),
    (k) => b ** k <= 10000,
  );
  return {
    prompt: `Solve $${logb(b)} x = ${n}$.`,
    parts: [numPart(b ** n, { label: '$x =$' })],
    hints: ['Rewrite the equation in exponential form.', LOG_DEF],
    solution: [`$${logb(b)} x = ${n}$ means $x = ${b}^{${n}}$.`, `$x = ${big(b ** n)}$`],
  };
}

function lfSolveD2(rng: Rng): GenOutput {
  const kind = rng.pick(['frac', 'base', 'common'] as const);
  if (kind === 'frac') {
    const r = rng.pick([2, 3, 5]);
    const q = rng.pick(r === 5 ? [2] : [2, 3]);
    const p = retry(
      () => rng.nonZero(-4, 4),
      (k) => k % q !== 0 && r ** Math.abs(k) <= 243,
    );
    const b = r ** q;
    const x = r ** p;
    return {
      prompt: `Solve $${logb(b)} x = ${nn(p / q)}$. Give an exact answer.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Rewrite in exponential form.', `A fractional exponent is a root and a power: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^{m}$.`],
      solution: [`$x = ${b}^{${nn(p / q)}}$`, `$= \\left(${q === 2 ? `\\sqrt{${b}}` : `\\sqrt[3]{${b}}`}\\right)^{${p}} = ${r}^{${p}}$`, `$x = ${nn(x)}$`],
    };
  }
  if (kind === 'base') {
    const r = rng.int(2, 6);
    const n = retry(
      () => rng.pick([2, 3, 4, -2, -3]),
      (k) => r ** Math.abs(k) <= 1296,
    );
    const N = n > 0 ? big(r ** n) : `\\frac{1}{${big(r ** -n)}}`;
    const even = Math.abs(n) % 2 === 0;
    return {
      prompt: `Solve $\\log_{x} ${N} = ${n}$.`,
      parts: [numPart(r, { label: '$x =$' })],
      hints: ['Rewrite in exponential form: $x^{n} = $ the argument.', 'The base of a logarithm must be positive and not equal to $1$.'],
      solution: [
        `$x^{${n}} = ${N}$`,
        ...(n < 0 ? [`Take reciprocals: $x^{${-n}} = ${big(r ** -n)}$.`] : []),
        `$x = ${even ? '\\pm ' : ''}${r}$${even ? `, but a base must be positive, so reject $x = -${r}$` : ''}.`,
        `$x = ${r}$`,
      ],
    };
  }
  const n = rng.pick([-3, -2, -1, 2, 3, 4, 5]);
  return {
    prompt: `Solve $\\log x = ${n}$.`,
    parts: [numPart(10 ** n, { label: '$x =$', display: 'decimal' })],
    hints: ['$\\log$ with no base written is base $10$.', 'Rewrite in exponential form.'],
    solution: [`$\\log x = ${n}$ means $x = 10^{${n}}$.`, `$x = ${fmt(10 ** n, 6)}$`],
  };
}

function lfConvertFrac(rng: Rng): GenOutput {
  const r = rng.pick([2, 3]);
  const q = rng.pick([2, 3]);
  const p = retry(
    () => rng.nonZero(-4, 4),
    (k) => k % q !== 0 && r ** Math.abs(k) <= 81,
  );
  const b = r ** q;
  const N = p > 0 ? `${r ** p}` : `\\frac{1}{${r ** -p}}`;
  const e = nn(p / q);
  const toLog = rng.chance(0.5);
  if (toLog) {
    const correct = `$\\log_{${b}} ${N} = ${e}$`;
    return {
      prompt: `Write $${b}^{${e}} = ${N}$ in logarithmic form.`,
      parts: [part(mc(rng, correct, [`$\\log_{${N}} ${b} = ${e}$`, `$\\log_{${b}} ${e} = ${N}$`, `$\\log_{${b}} ${N} = ${nn(q / p)}$`]))],
      hints: [LOG_DEF, 'The exponent, even when it is a fraction, is the value of the logarithm.'],
      solution: [`The base is $${b}$ and the exponent is $${e}$.`, correct.replace(/\$/g, '') ? correct : correct],
    };
  }
  const Np = p > 0 ? N : `\\left(${N}\\right)`;
  const correct = `$${b}^{${e}} = ${N}$`;
  return {
    prompt: `Write $\\log_{${b}} ${N} = ${e}$ in exponential form.`,
    parts: [part(mc(rng, correct, [`$${Np}^{${e}} = ${b}$`, `$${b}^{${N}} = ${e}$`, `$${b}^{${nn(q / p)}} = ${N}$`]))],
    hints: [LOG_DEF, 'The base of the logarithm is the base of the power; the value of the logarithm is the exponent.'],
    solution: [`The base is $${b}$ and the exponent is $${e}$.`, `${correct} (check: $${b}^{${e}} = \\left(${q === 2 ? `\\sqrt{${b}}` : `\\sqrt[3]{${b}}`}\\right)^{${p}} = ${N}$)`],
  };
}

function lfSolveD3(rng: Rng): GenOutput {
  const kind = rng.pick(['linear', 'nested', 'fracBase'] as const);
  if (kind === 'linear') {
    const b = rng.pick([2, 3, 4, 5, 10]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 1000,
    );
    const p = rng.int(1, 4);
    const q = rng.nonZero(-9, 9);
    const x = (b ** n - q) / p;
    return {
      prompt: `Solve $${logb(b)}(${lin(p, q)}) = ${n}$. Give an exact answer.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Rewrite in exponential form.', 'Then solve the linear equation.'],
      solution: [`$${lin(p, q)} = ${b}^{${n}} = ${b ** n}$`, `$${lin(p, 0)} = ${b ** n - q}$`, `$x = ${nn(x)}$`],
    };
  }
  if (kind === 'nested') {
    const [a, b, k] = retry(
      () => [rng.pick([2, 3, 4]), rng.pick([2, 3, 5, 10]), rng.pick([1, 2, 1 / 2])] as const,
      ([a, b, k]) => Number.isInteger(a ** k) && b ** (a ** k) <= 100000 && a ** k >= 1,
    );
    const inner = a ** k;
    const x = b ** inner;
    return {
      prompt: `Solve $${logb(a)}\\left(${logb(b)} x\\right) = ${nn(k)}$.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Work from the outside in: rewrite the outer logarithm in exponential form first.', LOG_DEF],
      solution: [`$${logb(b)} x = ${a}^{${nn(k)}} = ${inner}$`, `$x = ${b}^{${inner}} = ${big(x)}$`],
    };
  }
  const r = rng.pick([2, 3]);
  const q = rng.pick([2, 3]);
  const p = retry(
    () => rng.nonZero(-5, 5),
    (k) => k % q !== 0 && r ** Math.abs(k) <= 243,
  );
  const x = r ** q;
  const N = p > 0 ? big(r ** p) : `\\frac{1}{${big(r ** -p)}}`;
  return {
    prompt: `Solve $\\log_{x} ${N} = ${nn(p / q)}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: ['Rewrite in exponential form.', `Raise both sides to the reciprocal power, $${nn(q / p)}$.`],
    solution: [`$x^{${nn(p / q)}} = ${N} = ${r}^{${p}}$`, `Raise both sides to the power $${nn(q / p)}$: $x = \\left(${r}^{${p}}\\right)^{${nn(q / p)}} = ${r}^{${q}}$.`, `$x = ${x}$`],
  };
}

const logExpForm = skill({
  id: 'm301-log-exp-form',
  name: 'Logarithmic and exponential form',
  description: 'Convert between exponential and logarithmic form and use the conversion to find an unknown base, argument or value.',
  outcomes: ['RF7'],
  lessonId: 'm301-7-4',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['toLog', 'toExp', 'solve'] as const);
      return kind === 'toLog' ? lfToLog(rng) : kind === 'toExp' ? lfToExp(rng) : lfSolveArg(rng);
    }
    if (d === 2) return rng.chance(0.7) ? lfSolveD2(rng) : lfConvertFrac(rng);
    return lfSolveD3(rng);
  },
});

// @@NEXT
