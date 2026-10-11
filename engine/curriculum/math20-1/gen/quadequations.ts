/** Math 20-1 Unit 4 — Factoring and Quadratic Equations (RF1, RF5). */
import { byDifficulty, fixedChoice, mc, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { type Poly, polyLatex, polyText } from '../../../math/poly.ts';
import { fmt, fmtFixed, fracLatex, gcd, gcdAll, isPerfectSquare, radicalSplit, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const nz = (rng: Rng, lo: number, hi: number) => rng.nonZero(lo, hi);

/** LaTeX for a rational number such as -3/2 (a decimal when it is not a simple fraction). */
function rt(x: number, dfrac = false): string {
  const f = toFrac(x, 1000);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}

/** A rational number in brackets when negative, for substitutions: (-3), (\frac{1}{2}). */
function rp(x: number): string {
  return x < 0 ? `(${rt(x)})` : rt(x);
}

/** A sum of [coefficient, body] terms in LaTeX, skipping zeros; coefficients may be fractions or decimals. */
function sumTex(terms: Array<[number, string]>, decimals = false): string {
  let out = '';
  for (const [c, body] of terms) {
    if (Math.abs(c) < 1e-12) continue;
    const abs = Math.abs(c);
    const coef = body && Math.abs(abs - 1) < 1e-12 ? '' : decimals ? fmt(abs) : rt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

/** ax² + bx + c in LaTeX. */
const quadTex = (a: number, b: number, c: number, v = 'x', decimals = false) => sumTex([[a, `${v}^2`], [b, v], [c, '']], decimals);

/** a·v + b·w as a polynomial (w = '' for a constant). */
function lin(a: number, v: string, b: number, w = ''): Poly {
  const p: Poly = new Map();
  if (a) p.set(v, a);
  if (b) p.set(w, (p.get(w) ?? 0) + b);
  return p;
}

const binTex = (a: number, v: string, b: number, w = '') => `(${polyLatex(lin(a, v, b, w), [v, w].filter(Boolean))})`;

/** "(x + h)" with a rational h, using \left( \right) when h is a fraction. */
function shiftTex(h: number, v = 'x'): string {
  const inner = sumTex([[1, v], [h, '']]);
  return Number.isInteger(h) ? `(${inner})` : `\\left(${inner}\\right)`;
}

/**
 * k × factors, each factor made primitive with a positive leading coefficient (its content and
 * sign move into k). Equal factors become powers. Returns the typed answer and LaTeX.
 */
function product(k: number, factors: Poly[], order: string[]): { text: string; tex: string } {
  let K = k;
  const monos: Poly[] = [];
  const groups: Array<{ text: string; tex: string; n: number }> = [];
  for (const f0 of factors) {
    let f = f0;
    const g = gcdAll([...f.values()]);
    if (g > 1) {
      K *= g;
      f = new Map([...f].map(([key, c]) => [key, c / g]));
    }
    if (polyText(f, order).startsWith('-')) {
      K = -K;
      f = new Map([...f].map(([key, c]) => [key, -c]));
    }
    if (f.size === 1) {
      monos.push(f);
      continue;
    }
    const text = polyText(f, order);
    const same = groups.find((x) => x.text === text);
    if (same) same.n++;
    else groups.push({ text, tex: polyLatex(f, order), n: 1 });
  }
  const kText = K === 1 ? '' : K === -1 ? '-' : Number.isInteger(K) ? `${K}` : `(${toFrac(K, 1000)!.n}/${toFrac(K, 1000)!.d})`;
  const kTex = K === 1 ? '' : K === -1 ? '-' : rt(K);
  const mText = monos.map((m) => polyText(m, order)).join('');
  const mTex = monos.map((m) => polyLatex(m, order)).join('');
  const pow = (n: number) => (n > 1 ? `^${n}` : '');
  return {
    text: kText + mText + groups.map((x) => `(${x.text})${pow(x.n)}`).join(''),
    tex: kTex + mTex + groups.map((x) => `(${x.tex})${pow(x.n)}`).join(''),
  };
}

/** "x = a or x = b" in LaTeX. */
function rootsTex(values: number[], v = 'x'): string {
  if (!values.length) return '\\text{no real roots}';
  return values.map((r) => `${v} = ${rt(r)}`).join(' \\text{ or } ');
}

/** Square root of a non-negative rational number, simplified with a rational denominator. */
function sqrtTex(q: number): string {
  const f = toFrac(q, 100000)!;
  const { outside, inside } = radicalSplit(f.n * f.d, 2);
  const g = gcd(outside, f.d);
  const top = outside / g;
  const bottom = f.d / g;
  if (inside === 1) return rt(top / bottom);
  const rad = `${top === 1 ? '' : top}\\sqrt{${inside}}`;
  return bottom === 1 ? rad : `\\dfrac{${rad}}{${bottom}}`;
}

interface Roots {
  values: number[];
  /** "x = ..." in simplest form. */
  tex: string;
  kind: 'none' | 'double' | 'rational' | 'irrational';
  D: number;
}

/** Real roots of ax² + bx + c = 0 (integer coefficients) in simplest exact form. */
function quadRoots(a: number, b: number, c: number, v = 'x'): Roots {
  const D = b * b - 4 * a * c;
  if (D < 0) return { values: [], tex: '\\text{no real roots}', kind: 'none', D };
  if (D === 0) {
    const r = -b / (2 * a);
    return { values: [r], tex: `${v} = ${rt(r)}`, kind: 'double', D };
  }
  const sq = Math.sqrt(D);
  const values = [(-b - sq) / (2 * a), (-b + sq) / (2 * a)].sort((x, y) => x - y);
  const { outside: k, inside: m } = radicalSplit(D, 2);
  if (m === 1) return { values, tex: rootsTex(values, v), kind: 'rational', D };
  const g = gcd(gcd(Math.abs(b), k), Math.abs(2 * a));
  let P = -b / g;
  const K = k / g;
  let R = (2 * a) / g;
  if (R < 0) {
    P = -P;
    R = -R;
  }
  const rad = `${K === 1 ? '' : K}\\sqrt{${m}}`;
  const tex = R === 1 ? (P === 0 ? `\\pm ${rad}` : `${P} \\pm ${rad}`) : P === 0 ? `\\pm\\dfrac{${rad}}{${R}}` : `\\dfrac{${P} \\pm ${rad}}{${R}}`;
  return { values, tex: `${v} = ${tex}`, kind: 'irrational', D };
}

/** A root that is not too close to a rounding boundary at the given number of decimals. */
function safeRound(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs((s % 1) - 0.5) > 0.06;
}

/** The roots part of an equation: several numbers in any order. */
function rootsPart(values: number[], decimals?: number, placeholder = 'e.g. 4, -3/2'): Part {
  return {
    label: '$x =$',
    answer: { kind: 'numbers', values, decimals },
    placeholder,
  };
}

const EXACT_HINT = 'Type exact roots with sqrt, for example `2 + sqrt(3), 2 - sqrt(3)`.';

function decimalsList(values: number[], decimals = 2): string {
  return values.map((r) => `x \\approx ${fmtFixed(r, decimals)}`).join(' \\text{ or } ');
}

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** The graph of y = f(x) clipped to the grid, as one or more polylines. */
function curveLines(f: (x: number) => number, g: GridSpec, n = 160): Array<Array<[number, number]>> {
  const lines: Array<Array<[number, number]>> = [];
  const inside = (y: number) => y >= g.yMin && y <= g.yMax;
  const cross = (xIn: number, xOut: number): [number, number] => {
    const bound = f(xOut) > g.yMax ? g.yMax : g.yMin;
    let lo = xIn;
    let hi = xOut;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (inside(f(mid))) lo = mid;
      else hi = mid;
    }
    return [r3(lo), bound];
  };
  let cur: Array<[number, number]> = [];
  let prevX = g.xMin;
  for (let i = 0; i <= n; i++) {
    const x = g.xMin + ((g.xMax - g.xMin) * i) / n;
    const y = f(x);
    if (inside(y)) {
      if (!cur.length && i > 0) {
        const c = cross(x, prevX);
        if (c[0] !== r3(x)) cur.push(c);
      }
      cur.push([r3(x), r3(y)]);
    } else if (cur.length) {
      cur.push(cross(prevX, x));
      lines.push(cur);
      cur = [];
    }
    prevX = x;
  }
  if (cur.length) lines.push(cur);
  return lines;
}

function graphFigure(f: (x: number) => number, grid: GridSpec, extra: Partial<PlaneFigure> = {}): PlaneFigure {
  return { type: 'plane', grid, polylines: curveLines(f, grid).map((points) => ({ points })), ...extra };
}

/** A square grid from -6 to 6 that is stretched vertically if the vertex needs more room. */
function gridFor(vy: number): GridSpec {
  const lo = Math.min(-6, Math.floor(vy) - 1);
  const hi = Math.max(6, Math.ceil(vy) + 1);
  return { xMin: -6, xMax: 6, yMin: lo, yMax: hi };
}

// ---------------------------------------------------------------------------
// RF1 — factoring
// ---------------------------------------------------------------------------

const PAIRS: Array<[string, string]> = [
  ['x', 'y'],
  ['x', 'y'],
  ['a', 'b'],
  ['m', 'n'],
];

/** (m·v + p)(n·v + q): each factor primitive, the middle term non-zero. */
function pickFactors(rng: Rng, mChoices: number[], nMax: number, cMax: number, needLead: boolean): [number, number, number, number] {
  for (let i = 0; i < 300; i++) {
    const m = rng.pick(mChoices);
    const n = rng.int(1, nMax);
    const p = nz(rng, -cMax, cMax);
    const q = nz(rng, -cMax, cMax);
    if (gcd(m, p) !== 1 || gcd(n, q) !== 1) continue;
    if (needLead && m * n === 1) continue;
    if (m * q + n * p === 0) continue;
    return [m, p, n, q];
  }
  return [2, 1, 1, 3];
}

/** Decomposition steps for (m v + p w)(n v + q w). */
function decompSteps(m: number, p: number, n: number, q: number, v: string, w = ''): string[] {
  const a = m * n;
  const b = m * q + n * p;
  const c = p * q;
  const vw = v + w;
  const ww = w ? `${w}^2` : '';
  const tri = sumTex([
    [a, `${v}^2`],
    [b, vw],
    [c, ww],
  ]);
  const B1 = binTex(m, v, p, w);
  const B2 = binTex(n, v, q, w);
  if (a === 1) return [`Find two integers with product $${c}$ and sum $${b}$: $${p}$ and $${q}$.`, `$${tri} = ${B1}${B2}$`];
  const split = sumTex([
    [a, `${v}^2`],
    [m * q, vw],
    [n * p, vw],
    [c, ww],
  ]);
  const second = `${p < 0 ? '-' : '+'} ${Math.abs(p) === 1 && w ? '' : Math.abs(p)}${w}${B2}`;
  return [
    `$ac = (${a})(${c}) = ${a * c}$. Two integers with product $${a * c}$ and sum $${b}$: $${m * q}$ and $${n * p}$.`,
    `Split the middle term: $${tri} = ${split}$`,
    `Group in pairs and factor each pair: $${m === 1 ? '' : m}${v}${B2} ${second}$`,
    `Factor out the common binomial: $${B1}${B2}$`,
  ];
}

const RATIONAL_K = [1 / 2, 1 / 3, 1 / 4, 2 / 3, 3 / 2, 3 / 4, -1 / 2, 5 / 2];
const FRACTION_NOTE = 'Write the rational common factor in front so that each bracket has integer coefficients.';

const factorTrinomial = skill({
  id: 'm201-factor-trinomial',
  name: 'Factoring ax² + bx + c',
  description: 'Factor trinomials of the form ax² + bx + c, including two-variable trinomials and those with an integer or rational common factor.',
  outcomes: ['RF1'],
  lessonId: 'm201-4-1',
  gen(rng, d) {
    const [v, w2] = rng.pick(PAIRS);
    let k = 1;
    let w = '';
    let mpnq: [number, number, number, number];
    if (d === 1) {
      mpnq = pickFactors(rng, [2, 3, 5], 1, 7, true);
    } else if (d === 2) {
      w = rng.chance(0.35) ? w2 : '';
      mpnq = pickFactors(rng, [1, 2, 3, 4, 5, 6], 4, 9, true);
      if (rng.chance(0.25)) k = rng.pick([2, 3, -1]);
    } else if (rng.chance(0.55)) {
      k = rng.pick(RATIONAL_K);
      mpnq = pickFactors(rng, [1, 2, 3], 2, 7, false);
    } else {
      w = rng.chance(0.3) ? w2 : '';
      k = rng.pick([2, 3, 4, 5, -2, -3]);
      mpnq = pickFactors(rng, [2, 3, 4, 5, 6], 4, 9, true);
    }
    const [m, p, n, q] = mpnq;
    const order = [v, w].filter(Boolean);
    const a = m * n;
    const b = m * q + n * p;
    const c = p * q;
    const shown = sumTex([
      [k * a, `${v}^2`],
      [k * b, v + w],
      [k * c, w ? `${w}^2` : ''],
    ]);
    const inner = sumTex([
      [a, `${v}^2`],
      [b, v + w],
      [c, w ? `${w}^2` : ''],
    ]);
    const ans = product(k, [lin(m, v, p, w), lin(n, v, q, w)], order);
    const rational = !Number.isInteger(k);
    const kTex = k === -1 ? '-' : rt(k);
    return {
      prompt: `Factor completely: $${shown}$${rational ? `\n\n${FRACTION_NOTE}` : ''}`,
      parts: [part({ kind: 'expression', expected: ans.text, form: 'factored' }, { placeholder: rational ? 'e.g. 1/2(x+3)(2x-1)' : 'e.g. (2x+3)(x-4)' })],
      hints: [
        ...(k !== 1
          ? [rational ? `Factor out $${kTex}$ first: dividing each coefficient by $${kTex}$ leaves integer coefficients.` : `Factor out the common factor $${kTex}$ first.`]
          : []),
        a === 1 ? `Find two integers with product $${c}$ and sum $${b}$.` : `Find two integers with product $ac = ${a * c}$ and sum $b = ${b}$.`,
        a === 1 ? 'Write the two binomial factors and check by multiplying.' : 'Split the middle term using those integers, then factor by grouping.',
      ],
      solution: [
        ...(k !== 1 ? [`Remove the common factor: $${shown} = ${kTex}(${inner})$`] : []),
        ...decompSteps(m, p, n, q, v, w),
        ...(k !== 1 ? [`So $${shown} = ${ans.tex}$`] : []),
      ],
      answerDisplay: `$${ans.tex}$`,
    };
  },
});

const differenceSquares = skill({
  id: 'm201-factor-difference-squares',
  name: 'Factoring a difference of squares',
  description: 'Factor a²x² − b²y² and related differences of squares, removing a common factor first and factoring completely.',
  outcomes: ['RF1'],
  lessonId: 'm201-4-1',
  gen(rng, d) {
    const [v, w2] = rng.pick(PAIRS);
    const coprime = (amax: number, bmax: number): [number, number] => {
      for (;;) {
        const a = rng.int(1, amax);
        const b = rng.int(1, bmax);
        if (gcd(a, b) === 1 && a * b > 1) return [a, b];
      }
    };
    const variant = byDifficulty(d, rng.pick(['one', 'one', 'two']), rng.pick(['two', 'two', 'reverse', 'power', 'xy']), rng.pick(['k', 'mono', 'fourth', 'rational']));
    let shown = '';
    let ans: { text: string; tex: string };
    let steps: string[] = [];
    let hint = '';
    let note = '';
    const sqTex = (c: number, body: string) => `${c === 1 ? '' : c}${body}`;
    const sqr = (t: string) => (/^([a-z]|\d+)$/.test(t) ? `${t}^2` : `(${t})^2`);
    if (variant === 'one' || variant === 'two' || variant === 'k' || variant === 'reverse') {
      const w = variant === 'one' ? '' : variant === 'reverse' ? '' : variant === 'k' && rng.chance(0.4) ? '' : w2;
      const [a, b] = variant === 'one' ? coprime(6, 10) : coprime(9, 9);
      const k = variant === 'k' ? rng.pick([2, 3, 5, 6, 7]) : 1;
      const A = sqTex(a, v);
      const B = w ? sqTex(b, w) : `${b}`;
      const diff = variant === 'reverse' ? `${b * b} - ${sqTex(a * a, `${v}^2`)}` : `${sqTex(a * a, `${v}^2`)} - ${w ? sqTex(b * b, `${w}^2`) : b * b}`;
      shown = k === 1 ? diff : `${sqTex(k * a * a, `${v}^2`)} - ${w ? `${k * b * b}${w}^2` : k * b * b}`;
      if (variant === 'reverse') {
        ans = { text: `(${b}-${A})(${b}+${A})`, tex: `(${b} - ${A})(${b} + ${A})` };
        steps = [`$${shown} = ${sqr(`${b}`)} - ${sqr(A)}$`, `$= (${b} - ${A})(${b} + ${A})$`];
      } else {
        ans = product(k, [lin(a, v, -b, w), lin(a, v, b, w)], [v, w].filter(Boolean));
        steps = [
          ...(k !== 1 ? [`Remove the common factor: $${shown} = ${k}(${diff})$`] : []),
          `$${diff} = ${sqr(A)} - ${sqr(B)}$`,
          `$= (${A} - ${B})(${A} + ${B})$`,
          ...(k !== 1 ? [`So $${shown} = ${ans.tex}$`] : []),
        ];
      }
      hint = k !== 1 ? `First remove the common factor $${k}$.` : `Write each term as a square: $${sqr(`${variant === 'reverse' ? b : A}`)}$ and $${sqr(`${variant === 'reverse' ? A : B}`)}$.`;
    } else if (variant === 'power' || variant === 'xy') {
      const b = rng.int(2, 9);
      if (variant === 'power') {
        const w = w2;
        shown = `${v}^4 - ${b * b}${w}^2`;
        const f1: Poly = new Map([[`${v}^2`, 1], [w, -b]]);
        const f2: Poly = new Map([[`${v}^2`, 1], [w, b]]);
        ans = product(1, [f1, f2], [v, w]);
        steps = [`$${shown} = (${v}^2)^2 - (${b}${w})^2$`, `$= (${v}^2 - ${b}${w})(${v}^2 + ${b}${w})$`];
        hint = `$${v}^4 = (${v}^2)^2$`;
      } else {
        const a = rng.int(2, 9);
        const w = w2;
        const bb = gcd(a, b) === 1 ? b : 1;
        shown = `${a * a}${v}^2${w}^2 - ${bb * bb}`;
        const key = [v, w].sort().join('*');
        ans = product(1, [new Map([[key, a], ['', -bb]]), new Map([[key, a], ['', bb]])], [v, w]);
        steps = [`$${shown} = (${a}${v}${w})^2 - ${bb}^2$`, `$= (${a}${v}${w} - ${bb})(${a}${v}${w} + ${bb})$`];
        hint = `$${a * a}${v}^2${w}^2 = (${a}${v}${w})^2$`;
      }
    } else if (variant === 'mono') {
      const k = rng.pick([2, 3, 5]);
      const b = rng.int(2, 7);
      const w = w2;
      shown = `${k}${v}^3 - ${k * b * b}${v}${w}^2`;
      ans = product(k, [new Map([[v, 1]]), lin(1, v, -b, w), lin(1, v, b, w)], [v, w]);
      steps = [`The GCF is $${k}${v}$: $${shown} = ${k}${v}(${v}^2 - ${b * b}${w}^2)$`, `$${v}^2 - ${b * b}${w}^2 = (${v} - ${b}${w})(${v} + ${b}${w})$`, `So $${shown} = ${ans.tex}$`];
      hint = `First remove the greatest common factor $${k}${v}$.`;
    } else if (variant === 'fourth') {
      const [a, b] = rng.pick([
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 3],
        [3, 1],
        [3, 2],
        [1, 1],
      ] as Array<[number, number]>);
      const w = a === 1 && b !== 1 && rng.chance(0.5) ? '' : w2;
      const A4 = a ** 4;
      const B4 = b ** 4;
      shown = `${A4 === 1 ? '' : A4}${v}^4 - ${w ? `${B4 === 1 ? '' : B4}${w}^4` : B4}`;
      const order = [v, w].filter(Boolean);
      const sumSq: Poly = w ? new Map([[`${v}^2`, a * a], [`${w}^2`, b * b]]) : new Map([[`${v}^2`, a * a], ['', b * b]]);
      ans = product(1, [sumSq, lin(a, v, -b, w), lin(a, v, b, w)], order);
      const A2 = `${a * a === 1 ? '' : a * a}${v}^2`;
      const B2 = w ? `${b * b === 1 ? '' : b * b}${w}^2` : `${b * b}`;
      steps = [
        `$${shown} = (${A2})^2 - (${B2})^2 = (${A2} - ${B2})(${A2} + ${B2})$`,
        `$${A2} - ${B2}$ is another difference of squares: $${binTex(a, v, -b, w)}${binTex(a, v, b, w)}$`,
        `$${A2} + ${B2}$ is a sum of squares, which does not factor over the integers.`,
        `So $${shown} = ${ans.tex}$`,
      ];
      hint = 'Factor as a difference of squares, then check whether either factor is another difference of squares.';
    } else {
      // rational: (a/s)² v² − b² w² = (1/s²)(a v − s b w)(a v + s b w)
      let a = 1;
      let s = 2;
      let b = 1;
      for (let i = 0; i < 50; i++) {
        a = rng.int(1, 3);
        s = rng.int(2, 5);
        b = rng.int(1, 3);
        if (gcd(a, s) === 1 && gcd(a, s * b) === 1 && s * b <= 10) break;
      }
      const w = rng.chance(0.5) ? w2 : '';
      const order = [v, w].filter(Boolean);
      shown = sumTex([
        [(a * a) / (s * s), `${v}^2`],
        [-b * b, w ? `${w}^2` : ''],
      ]);
      ans = product(1 / (s * s), [lin(a, v, -s * b, w), lin(a, v, s * b, w)], order);
      const innerDiff = sumTex([
        [a * a, `${v}^2`],
        [-s * s * b * b, w ? `${w}^2` : ''],
      ]);
      steps = [
        `Factor out $${rt(1 / (s * s))}$: $${shown} = ${rt(1 / (s * s))}(${innerDiff})$`,
        `$${innerDiff} = (${a === 1 ? '' : a}${v})^2 - (${s * b}${w})^2 = ${binTex(a, v, -s * b, w)}${binTex(a, v, s * b, w)}$`,
        `So $${shown} = ${ans.tex}$`,
      ];
      hint = `Factor out $${rt(1 / (s * s))}$ so the brackets have integer coefficients.`;
      note = `\n\n${FRACTION_NOTE}`;
    }
    return {
      prompt: `Factor completely: $${shown}$${note}`,
      parts: [part({ kind: 'expression', expected: ans.text, form: 'factored' }, { placeholder: 'e.g. (3x-5y)(3x+5y)' })],
      hints: [hint, '$A^2 - B^2 = (A - B)(A + B)$'],
      solution: steps,
      answerDisplay: `$${ans.tex}$`,
    };
  },
});

/** "2(x - 1)^2 - 3(x - 1) - 2" for a(f)² + b(f) + c. */
function subTex(a: number, b: number, c: number, f: string): string {
  return sumTex([
    [a, `(${f})^2`],
    [b, `(${f})`],
    [c, ''],
  ]);
}

/** True when m·t² + p has rational roots (so it factors further over the integers). */
const reducible = (m: number, p: number) => -4 * m * p >= 0 && isPerfectSquare(-4 * m * p);

const factorSubstitution = skill({
  id: 'm201-factor-substitution',
  name: 'Factoring by substitution',
  description: 'Factor expressions such as a(f(x))² + b(f(x)) + c and a²(f(x))² − b²(g(y))² by substitution, then simplify and factor completely.',
  outcomes: ['RF1'],
  lessonId: 'm201-4-1',
  gen(rng, d) {
    const v = rng.pick(['x', 'x', 'a', 't']);
    const variant = byDifficulty(d, rng.pick(['shift1', 'shift1', 'quartic1']), rng.pick(['shiftA', 'shiftA', 'shiftDiff', 'quarticA']), rng.pick(['twoVar', 'twoVar', 'quarticFull', 'linearA']));
    let shown = '';
    let ans: { text: string; tex: string };
    let steps: string[] = [];
    let uName = 'u';
    let uIs = '';
    if (variant === 'twoVar') {
      const w = v === 'x' ? 'y' : v === 'a' ? 'b' : 's';
      let a = 2;
      let b = 1;
      for (;;) {
        a = rng.int(1, 5);
        b = rng.int(1, 5);
        if (gcd(a, b) === 1 && a * b > 1) break;
      }
      const h = nz(rng, -5, 5);
      const kk = rng.chance(0.3) ? 0 : nz(rng, -5, 5);
      const fx = sumTex([[1, v], [h, '']]);
      const gy = sumTex([[1, w], [kk, '']]);
      const fPart = `(${fx})^2`;
      const gPart = kk === 0 ? `${w}^2` : `(${gy})^2`;
      shown = `${a * a === 1 ? '' : a * a}${fPart} - ${b * b === 1 ? '' : b * b}${gPart}`;
      const F1: Poly = new Map([[v, a], [w, -b], ['', a * h - b * kk]]);
      const F2: Poly = new Map([[v, a], [w, b], ['', a * h + b * kk]]);
      for (const F of [F1, F2]) if (F.get('') === 0) F.delete('');
      ans = product(1, [F1, F2], [v, w]);
      const A = a === 1 ? 'A' : `${a}A`;
      const B = b === 1 ? 'B' : `${b}B`;
      const gBack = kk === 0 ? w : `(${gy})`;
      steps = [
        `Let $A = ${fx}$ and $B = ${kk === 0 ? w : gy}$. The expression becomes $${a * a === 1 ? '' : a * a}A^2 - ${b * b === 1 ? '' : b * b}B^2$.`,
        `Difference of squares: $(${A} - ${B})(${A} + ${B})$`,
        `Substitute back: $(${a === 1 ? '' : a}(${fx}) - ${b === 1 ? '' : b}${gBack})(${a === 1 ? '' : a}(${fx}) + ${b === 1 ? '' : b}${gBack})$`,
        `Simplify each factor: $${ans.tex}$`,
      ];
      uName = 'A';
      uIs = `$A = ${fx}$ and $B = ${kk === 0 ? w : gy}$`;
      return {
        prompt: `Factor completely: $${shown}$`,
        parts: [part({ kind: 'expression', expected: ans.text, form: 'factored' }, { placeholder: 'e.g. (2x-3y+1)(2x+3y+5)' })],
        hints: [`Let ${uIs}. Then the expression is a difference of squares.`, 'After factoring, substitute back and simplify each factor.'],
        solution: steps,
        answerDisplay: `$${ans.tex}$`,
      };
    }
    if (variant === 'quartic1' || variant === 'quarticA' || variant === 'quarticFull') {
      // a t⁴ + b t² + c with u = t²
      let m = 1;
      let p = 1;
      let n = 1;
      let q = 2;
      let factors: Poly[] = [];
      const v2 = `${v}^2`;
      if (variant === 'quarticFull') {
        // (α²u − β²)(u − γ²): both factor again
        const [al, be] = rng.pick([
          [1, 1],
          [1, 2],
          [1, 3],
          [2, 1],
          [2, 3],
          [3, 1],
          [3, 2],
        ] as Array<[number, number]>);
        let ga = rng.int(1, 4);
        if (al === 1 && ga === be) ga = be === 4 ? 1 : be + 1;
        m = al * al;
        p = -be * be;
        n = 1;
        q = -ga * ga;
        factors = [lin(al, v, -be), lin(al, v, be), lin(1, v, -ga), lin(1, v, ga)];
      } else {
        for (let i = 0; i < 300; i++) {
          m = variant === 'quartic1' ? 1 : rng.int(1, 4);
          n = variant === 'quartic1' ? 1 : rng.int(1, 3);
          p = nz(rng, -7, 7);
          q = nz(rng, -7, 7);
          if (variant === 'quarticA' && m * n === 1) continue;
          if (gcd(m, p) !== 1 || gcd(n, q) !== 1) continue;
          if (m * q + n * p === 0 || (m === n && p === q)) continue;
          if (reducible(m, p) || reducible(n, q)) continue;
          break;
        }
        factors = [new Map([[v2, m], ['', p]]), new Map([[v2, n], ['', q]])];
      }
      const A = m * n;
      const B = m * q + n * p;
      const C = p * q;
      shown = sumTex([
        [A, `${v}^4`],
        [B, v2],
        [C, ''],
      ]);
      ans = product(1, factors, [v]);
      const uFact = `${binTex(m, 'u', p)}${binTex(n, 'u', q)}`;
      const back = `(${sumTex([[m, v2], [p, '']])})(${sumTex([[n, v2], [q, '']])})`;
      steps = [
        `Let $u = ${v2}$, so $${v}^4 = u^2$. The expression becomes $${quadTex(A, B, C, 'u')}$.`,
        ...(A === 1 ? [`Two integers with product $${C}$ and sum $${B}$: $${p}$ and $${q}$.`] : [`$ac = ${A * C}$; two integers with product $${A * C}$ and sum $${B}$: $${m * q}$ and $${n * p}$.`]),
        `$${quadTex(A, B, C, 'u')} = ${uFact}$`,
        `Replace $u$ with $${v2}$: $${back}$`,
        variant === 'quarticFull' ? `Both factors are differences of squares, so factor again: $${ans.tex}$` : 'Neither factor can be factored further over the integers.',
      ];
      uIs = `$u = ${v2}$`;
    } else {
      // a(f)² + b(f) + c with f = c1·v + c0
      let c1 = 1;
      let c0 = nz(rng, -5, 5);
      let m = 1;
      let p = 1;
      let n = 1;
      let q = 1;
      const isDiff = variant === 'shiftDiff';
      if (variant === 'linearA') {
        c1 = rng.pick([2, 3]);
        c0 = nz(rng, -4, 4);
      }
      for (let i = 0; i < 300; i++) {
        if (isDiff) {
          const b = rng.int(1, 7);
          [m, p, n, q] = [1, -b, 1, b];
        } else {
          m = variant === 'shift1' ? 1 : variant === 'linearA' ? rng.int(1, 3) : rng.int(1, 4);
          n = variant === 'shift1' ? 1 : variant === 'linearA' ? rng.int(1, 2) : rng.int(1, 3);
          p = nz(rng, -6, 6);
          q = nz(rng, -6, 6);
          if (variant === 'shiftA' && m * n === 1) continue;
          if (gcd(m, p) !== 1 || gcd(n, q) !== 1) continue;
          if (m * q + n * p === 0) continue;
        }
        const k1 = m * c0 + p;
        const k2 = n * c0 + q;
        if (variant !== 'linearA' && (k1 === 0 || k2 === 0)) continue;
        if (m === n && p === q && variant !== 'linearA') continue;
        break;
      }
      const f = sumTex([[c1, v], [c0, '']]);
      const A = m * n;
      const B = m * q + n * p;
      const C = p * q;
      shown = subTex(A, B, C, f);
      ans = product(1, [lin(m * c1, v, m * c0 + p), lin(n * c1, v, n * c0 + q)], [v]);
      const mu = (k: number) => (k === 1 ? '' : `${k}`);
      const raw = `${binTex(m * c1, v, m * c0 + p)}${binTex(n * c1, v, n * c0 + q)}`;
      steps = [
        `Let $u = ${f}$. The expression becomes $${quadTex(A, B, C, 'u')}$.`,
        ...(isDiff ? [`Difference of squares: $u^2 - ${q * q} = (u - ${q})(u + ${q})$`] : A === 1 ? [`Two integers with product $${C}$ and sum $${B}$: $${p}$ and $${q}$.`] : [`$ac = ${A * C}$; two integers with product $${A * C}$ and sum $${B}$: $${m * q}$ and $${n * p}$.`]),
        ...(isDiff ? [] : [`$${quadTex(A, B, C, 'u')} = ${binTex(m, 'u', p)}${binTex(n, 'u', q)}$`]),
        `Replace $u$ with $${f}$: $(${mu(m)}(${f}) ${p < 0 ? '-' : '+'} ${Math.abs(p)})(${mu(n)}(${f}) ${q < 0 ? '-' : '+'} ${Math.abs(q)})$`,
        raw === ans.tex ? `Simplify each factor: $${ans.tex}$` : `Simplify each factor, then remove any common factors: $${raw} = ${ans.tex}$`,
      ];
      uIs = `$u = ${f}$`;
    }
    return {
      prompt: `Factor completely: $${shown}$`,
      parts: [part({ kind: 'expression', expected: ans.text, form: 'factored' }, { placeholder: 'e.g. (x+4)(2x-1)' })],
      hints: [`Let ${uIs}. Rewrite the expression in terms of $${uName}$ and factor it.`, `Substitute back for $${uName}$, then simplify each factor and check whether it factors further.`],
      solution: steps,
      answerDisplay: `$${ans.tex}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// RF5 — solving by factoring and graphing
// ---------------------------------------------------------------------------

/** Distinct integer roots r < s from the range, both non-zero. */
function twoRoots(rng: Rng, lo: number, hi: number): [number, number] {
  for (;;) {
    const r = nz(rng, lo, hi);
    const s = nz(rng, lo, hi);
    if (r !== s) return r < s ? [r, s] : [s, r];
  }
}

const ROOTS_NOTE = 'Enter each root once, separated by commas.';

const solveFactor = skill({
  id: 'm201-solve-factor',
  name: 'Solving quadratic equations by factoring',
  description: 'Write a quadratic equation in standard form, factor it, and use the zero product property to find its roots.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-2',
  gen(rng, d) {
    const variant = byDifficulty(d, rng.pick(['given', 'monic']), rng.pick(['general', 'general', 'rearrange', 'gcf', 'squares']), rng.pick(['product', 'product', 'fraction', 'oneRoot']));
    if (variant === 'oneRoot') {
      const a = rng.pick([1, 1, 2, 3]);
      let r = 1;
      let t = 1;
      for (;;) {
        r = nz(rng, -6, 6);
        t = nz(rng, -9, 9);
        if (t / a !== r && (a === 1 || t % a !== 0)) break;
      }
      const s = t / a;
      const c = r * t;
      const k = -(a * r + t);
      const eq = `${a === 1 ? '' : a}x^2 + kx ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0`;
      return {
        prompt: `One root of $${eq}$ is $x = ${r}$. Find the value of $k$ and the other root.`,
        parts: [numPart(k, { label: '$k =$' }), numPart(s, { label: 'Other root: $x =$' })],
        hints: ['A root makes the equation true. Substitute the root for $x$ and solve for $k$.', 'Then factor the equation (or use the product of the roots) to find the other root.'],
        solution: [
          `Substitute $x = ${r}$: $${a === 1 ? '' : a}(${r})^2 + k(${r}) ${c < 0 ? '-' : '+'} ${Math.abs(c)} = 0$`,
          `$${a * r * r + c} ${r < 0 ? '-' : '+'} ${Math.abs(r)}k = 0$, so $k = ${k}$.`,
          `The equation is $${quadTex(a, k, c)} = 0$, which factors as $${binTex(1, 'x', -r)}${binTex(a, 'x', -t)} = 0$.`,
          `So $k = ${k}$ and the other root is $x = ${rt(s)}$.`,
        ],
      };
    }
    let a = 1;
    let b = 0;
    let c = 0;
    let values: number[] = [];
    let eqTex = '';
    const pre: string[] = [];
    let factTex = '';
    let hint = '';
    if (variant === 'given') {
      let [m, p, n, q] = [1, 1, 1, 2];
      if (rng.chance(0.5)) {
        const [r, s] = twoRoots(rng, -9, 9);
        [m, p, n, q] = [1, -r, 1, -s];
      } else [m, p, n, q] = pickFactors(rng, [1, 2, 3], 2, 7, false);
      eqTex = `${binTex(m, 'x', p)}${binTex(n, 'x', q)} = 0`;
      values = [...new Set([-p / m, -q / n])].sort((x, y) => x - y);
      return {
        prompt: `Solve: $${eqTex}$\n\n${ROOTS_NOTE}`,
        parts: [rootsPart(values)],
        hints: ['If a product is zero, then one of its factors must be zero.', 'Set each factor equal to zero and solve each linear equation.'],
        solution: [
          `By the zero product property, $${polyLatex(lin(m, 'x', p), ['x'])} = 0$ or $${polyLatex(lin(n, 'x', q), ['x'])} = 0$.`,
          `$${rootsTex(values)}$`,
        ],
        answerDisplay: `$${rootsTex(values)}$`,
      };
    }
    if (variant === 'monic' || variant === 'rearrange' || variant === 'product') {
      const [r, s] = twoRoots(rng, -9, 9);
      a = 1;
      b = -(r + s);
      c = r * s;
      values = [r, s];
      factTex = `${binTex(1, 'x', -r)}${binTex(1, 'x', -s)} = 0`;
      if (variant === 'monic') eqTex = `${quadTex(1, b, c)} = 0`;
      else if (variant === 'rearrange') {
        const form = rng.int(0, 2);
        eqTex = form === 0 ? `x^2 = ${sumTex([[-b, 'x'], [-c, '']])}` : form === 1 ? `${sumTex([[1, 'x^2'], [b, 'x']])} = ${-c}` : `${sumTex([[1, 'x^2'], [c, '']])} = ${sumTex([[-b, 'x']])}`;
        if (b === 0 && form !== 1) eqTex = `x^2 = ${-c}`;
        pre.push(`Write the equation in standard form: $${quadTex(1, b, c)} = 0$`);
      } else {
        // (x + p)(x + q) = K
        let p = 0;
        let q = 0;
        let K = 0;
        for (let i = 0; i < 100; i++) {
          p = nz(rng, -6, 6);
          q = -(r + s) - p;
          K = p * q - r * s;
          if (q !== 0 && q !== p && K !== 0 && Math.abs(K) <= 60) break;
        }
        eqTex = `${binTex(1, 'x', p)}${binTex(1, 'x', q)} = ${K}`;
        pre.push(`Expand the left side: $${quadTex(1, p + q, p * q)} = ${K}$`, `Subtract $${K}$ from both sides: $${quadTex(1, b, c)} = 0$`);
        hint = 'You cannot use the zero product property until one side is 0. Expand and rearrange first.';
      }
    } else if (variant === 'general' || variant === 'fraction') {
      const [m, p, n, q] = variant === 'general' ? pickFactors(rng, [2, 3, 4, 5, 6], 3, 7, true) : pickFactors(rng, [1, 1, 2], 1, 7, false);
      a = m * n;
      b = m * q + n * p;
      c = p * q;
      values = [...new Set([-p / m, -q / n])].sort((x, y) => x - y);
      factTex = `${binTex(m, 'x', p)}${binTex(n, 'x', q)} = 0`;
      if (variant === 'general') eqTex = `${quadTex(a, b, c)} = 0`;
      else {
        const k = rng.pick([1 / 2, 1 / 3, 1 / 4, 2 / 3, -1 / 2]);
        eqTex = `${quadTex(k * a, k * b, k * c)} = 0`;
        pre.push(`Multiply both sides by $${rt(1 / k)}$ to clear the fractions: $${quadTex(a, b, c)} = 0$`);
        hint = 'Clear the fractions first by multiplying both sides by a common denominator.';
      }
    } else if (variant === 'gcf') {
      const m = rng.int(1, 6);
      const p = nz(rng, -9, 9);
      const g = gcd(m, p);
      const mm = m / g;
      const pp = p / g;
      const k = rng.pick([1, 2, 3]);
      a = k * mm;
      b = k * pp;
      c = 0;
      values = [0, -pp / mm].sort((x, y) => x - y);
      factTex = `${k === 1 ? '' : k}x${binTex(mm, 'x', pp)} = 0`;
      if (rng.chance(0.5)) eqTex = `${quadTex(a, b, 0)} = 0`;
      else {
        eqTex = `${sumTex([[a, 'x^2']])} = ${sumTex([[-b, 'x']])}`;
        pre.push(`Write the equation in standard form: $${quadTex(a, b, 0)} = 0$`);
      }
      hint = `Do not divide both sides by $x$ — you would lose the root $x = 0$. Factor out the common factor instead.`;
    } else {
      // squares: a²x² − b² = 0
      let m = 1;
      let s = 1;
      for (;;) {
        m = rng.int(1, 5);
        s = rng.int(1, 9);
        if (gcd(m, s) === 1) break;
      }
      a = m * m;
      b = 0;
      c = -s * s;
      values = [-s / m, s / m];
      factTex = `${binTex(m, 'x', -s)}${binTex(m, 'x', s)} = 0`;
      if (rng.chance(0.5)) eqTex = `${quadTex(a, 0, c)} = 0`;
      else {
        eqTex = `${sumTex([[a, 'x^2']])} = ${s * s}`;
        pre.push(`Write the equation in standard form: $${quadTex(a, 0, c)} = 0$`);
      }
      hint = 'The left side is a difference of squares.';
    }
    return {
      prompt: `Solve by factoring: $${eqTex}$\n\n${ROOTS_NOTE}`,
      parts: [rootsPart(values)],
      hints: [hint || 'Make sure one side of the equation is 0, then factor the other side.', 'Set each factor equal to zero (the zero product property) and solve.'],
      solution: [...pre, `Factor: $${factTex}$`, `Set each factor equal to zero: $${rootsTex(values)}$`, 'Check each root by substituting it into the original equation.'],
      answerDisplay: `$${rootsTex(values)}$`,
    };
  },
});

const NATURE = ['Two distinct real roots', 'One real root (two equal real roots)', 'No real roots'];

const rootsGraph = skill({
  id: 'm201-roots-graph',
  name: 'Roots from a graph',
  description: 'Relate the roots of a quadratic equation to the x-intercepts (zeros) of the graph of the related function, and decide how many real roots there are.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-2',
  gen(rng, d) {
    const variant = byDifficulty(d, 'read', rng.pick(['count', 'rearranged', 'maybeNone']), rng.pick(['level', 'level', 'vertexForm']));
    if (variant === 'count' || variant === 'vertexForm' || variant === 'maybeNone') {
      const a = rng.pick([1, -1, 0.5, -0.5, 2, -2]);
      const p = rng.int(-3, 3);
      const kind = rng.int(0, 2); // 0 two, 1 one, 2 none
      const mag = rng.int(1, 4);
      const q = kind === 1 ? 0 : kind === 0 ? -Math.sign(a) * mag : Math.sign(a) * mag;
      const f = (x: number) => a * (x - p) ** 2 + q;
      const A = a;
      const B = -2 * a * p;
      const C = a * p * p + q;
      const aTex = a === 1 ? '' : a === -1 ? '-' : rt(a);
      const vForm = `${aTex}(x ${p < 0 ? '+' : '-'} ${Math.abs(p)})^2 ${q < 0 ? '-' : '+'} ${Math.abs(q)}`.replace('(x - 0)', 'x').replace('(x + 0)', 'x').replace(/ \+ 0$/, '');
      const why =
        kind === 0
          ? `The vertex $(${p}, ${q})$ is ${q < 0 ? 'below' : 'above'} the $x$-axis and the parabola opens ${a > 0 ? 'up' : 'down'}, so it crosses the $x$-axis twice.`
          : kind === 1
            ? `The vertex $(${p}, 0)$ is on the $x$-axis, so the graph touches the axis once: one real root (two equal roots).`
            : `The vertex $(${p}, ${q})$ is ${q > 0 ? 'above' : 'below'} the $x$-axis and the parabola opens ${a > 0 ? 'up' : 'down'}, away from the axis, so it never crosses it.`;
      if (variant === 'count' || variant === 'vertexForm') {
        const fig = variant === 'count' ? graphFigure(f, gridFor(q)) : undefined;
        return {
          prompt:
            variant === 'count'
              ? `The graph of a quadratic function $y = f(x)$ is shown. How many real roots does the equation $f(x) = 0$ have?`
              : `Without solving, decide how many real roots the equation $${vForm} = 0$ has.`,
          figure: fig,
          parts: [{ answer: fixedChoice(NATURE, kind) }],
          hints:
            variant === 'count'
              ? ['The real roots of $f(x) = 0$ are the $x$-intercepts of the graph of $y = f(x)$.', 'Count the points where the graph meets the $x$-axis.']
              : [`The graph of $y = ${vForm}$ has vertex $(${p}, ${q})$.`, 'Decide which way the parabola opens and whether the vertex is above, on or below the $x$-axis.'],
          solution: [
            ...(variant === 'vertexForm' ? [`The related function $y = ${vForm}$ has vertex $(${p}, ${q})$ and $a = ${rt(a)}$.`] : []),
            why,
            `Answer: ${NATURE[kind].toLowerCase()}.`,
          ],
        };
      }
      // maybeNone: solve f(x) = 0 from the graph; it may have no roots
      const roots = kind === 1 ? [p] : kind === 2 ? [] : [p - Math.sqrt(-q / a), p + Math.sqrt(-q / a)];
      if (roots.some((r) => !Number.isInteger(r))) {
        // keep the intercepts on grid lines: y = ±(x − p − s)(x − p + s)
        const s = rng.int(1, 2);
        return graphRead(rng, a > 0 ? 1 : -1, p - s, p + s, d);
      }
      const eq = `${quadTex(A, B, C)} = 0`;
      return {
        prompt: `The graph of $y = ${quadTex(A, B, C)}$ is shown. Use the graph to solve $${eq}$.\n\n${ROOTS_NOTE} If there are none, type *no real roots*.`,
        figure: graphFigure(f, gridFor(q)),
        parts: [rootsPart(roots, undefined, 'e.g. -2, 3')],
        hints: ['The roots of the equation are the $x$-intercepts of the graph.', 'If the graph never meets the $x$-axis, the equation has no real roots.'],
        solution: [why, roots.length ? `The $x$-${roots.length === 1 ? 'intercept gives the root' : 'intercepts give the roots'}: $${rootsTex(roots)}$` : 'The equation has no real roots.'],
        answerDisplay: roots.length ? `$${rootsTex(roots)}$` : 'no real roots',
      };
    }
    // read / rearranged / level: y = a(x − r)(x − s) (+ k)
    let a = 1;
    let r = 0;
    let s = 0;
    for (let i = 0; i < 200; i++) {
      a = rng.pick(d === 1 ? [1, -1, 1, 0.5] : [1, -1, 0.5, -0.5, 2]);
      [r, s] = twoRoots(rng, -5, 5);
      const vy = (-a * (s - r) ** 2) / 4;
      if (Math.abs(vy) <= 6 && (Number.isInteger(a) || ((r + s) % 2 === 0 && (r * s) % 2 === 0))) break;
    }
    if (variant === 'level') return graphRead(rng, a, r, s, d, nz(rng, -4, 4));
    return graphRead(rng, a, r, s, d, 0, variant === 'rearranged');
  },
});

/** Solve from the graph of f(x) = a(x − r)(x − s) + k: the roots of f(x) = k are r and s. */
function graphRead(rng: Rng, a: number, r: number, s: number, d: Difficulty, k = 0, rearranged = false): GenOutput {
  const A = a;
  const B = -a * (r + s);
  const C = a * r * s + k;
  const f = (x: number) => a * (x - r) * (x - s) + k;
  const vx = (r + s) / 2;
  const grid = gridFor(f(vx));
  if (k !== 0) {
    grid.yMin = Math.min(grid.yMin, k - 1);
    grid.yMax = Math.max(grid.yMax, k + 1);
  }
  const values = [r, s];
  const fTex = quadTex(A, B, C);
  if (k !== 0) {
    return {
      prompt: `The graphs of $y = ${fTex}$ and $y = ${k}$ are shown. Use the graphs to solve $${fTex} = ${k}$.\n\n${ROOTS_NOTE}`,
      figure: graphFigure(f, grid, { lines: [{ line: { A: 0, B: 1, C: -k }, color: 'accent', label: `y = ${k}` }] }),
      parts: [rootsPart(values, undefined, 'e.g. -2, 3')],
      hints: [`The solutions of $${fTex} = ${k}$ are the $x$-coordinates of the points where the parabola meets the line $y = ${k}$.`, 'Read the $x$-coordinate of each intersection point.'],
      solution: [
        `The parabola meets the line $y = ${k}$ at $(${r}, ${k})$ and $(${s}, ${k})$.`,
        `Check algebraically: $${fTex} = ${k}$ becomes $${quadTex(A, B, C - k)} = 0$, which factors as $${a === 1 ? '' : a === -1 ? '-' : rt(a)}${binTex(1, 'x', -r)}${binTex(1, 'x', -s)} = 0$.`,
        `$${rootsTex(values)}$`,
      ],
      answerDisplay: `$${rootsTex(values)}$`,
    };
  }
  let eq = `${fTex} = 0`;
  if (rearranged) {
    const form = rng.int(0, 2);
    eq =
      form === 0
        ? `${sumTex([[A, 'x^2'], [B, 'x']])} = ${rt(-C)}`
        : form === 1 && B !== 0
          ? `${sumTex([[B, 'x'], [C, '']])} = ${sumTex([[-A, 'x^2']])}`
          : `${sumTex([[A, 'x^2']])} = ${sumTex([[-B, 'x'], [-C, '']])}`;
  }
  return {
    prompt: `The graph of $y = ${fTex}$ is shown. Use the graph to solve $${eq}$.\n\n${ROOTS_NOTE}`,
    figure: graphFigure(f, grid),
    parts: [rootsPart(values, undefined, 'e.g. -2, 3')],
    hints: [
      ...(rearranged ? [`First rearrange the equation so one side is $0$: it becomes $${fTex} = 0$.`] : []),
      'The roots of the equation are the $x$-intercepts (zeros) of the graph.',
      ...(d === 1 ? ['Read where the parabola crosses the $x$-axis.'] : []),
    ],
    solution: [
      ...(rearranged ? [`Rearranged, the equation is $${fTex} = 0$, so its roots are the zeros of $y = ${fTex}$.`] : []),
      `The graph crosses the $x$-axis at $(${r}, 0)$ and $(${s}, 0)$.`,
      `Check by substituting: $f(${r}) = 0$ and $f(${s}) = 0$.`,
      `$${rootsTex(values)}$`,
    ],
    answerDisplay: `$${rootsTex(values)}$`,
  };
}

// ---------------------------------------------------------------------------
// RF5 — completing the square and the quadratic formula
// ---------------------------------------------------------------------------

/** Steps to solve ax² + bx + c = 0 by completing the square; returns p and q in (x − p)² = q. */
function csSteps(a: number, b: number, c: number): { steps: string[]; p: number; q: number } {
  const steps: string[] = [];
  const B = b / a;
  const C = c / a;
  if (a !== 1) steps.push(`Divide every term by $${a}$: $${quadTex(1, B, C)} = 0$`);
  steps.push(`Move the constant term: $${sumTex([[1, 'x^2'], [B, 'x']])} = ${rt(-C)}$`);
  const h = B / 2;
  const q = h * h - C;
  steps.push(`Add $\\left(${rt(h)}\\right)^2 = ${rt(h * h)}$, the square of half the coefficient of $x$, to both sides: $${quadTex(1, B, h * h)} = ${rt(q)}$`);
  steps.push(`Write the left side as a square: $${shiftTex(h)}^2 = ${rt(q)}$`);
  return { steps, p: -h, q };
}

/** Final steps after (x − p)² = q. */
function sqrtSteps(p: number, q: number, roots: Roots): string[] {
  if (q < 0) return ['A square cannot be negative, so the equation has no real roots.'];
  const lhs = sumTex([[1, 'x'], [-p, '']]);
  if (q === 0) return [`$${lhs} = 0$, so $x = ${rt(p)}$.`];
  const raw = `\\sqrt{${rt(q)}}`;
  const simple = sqrtTex(q);
  const pm = `x = ${p === 0 ? '' : rt(p)} \\pm ${simple}`;
  return [
    `Take the square root of both sides (both signs): $${lhs} = \\pm${raw}${simple !== raw ? ` = \\pm ${simple}` : ''}$`,
    `$${pm}$${pm.replace(/\s/g, '') === roots.tex.replace(/\s/g, '') ? '' : `, so $${roots.tex}$`}`,
  ];
}

const solveCompleteSquare = skill({
  id: 'm201-solve-complete-square',
  name: 'Solving by completing the square',
  description: 'Solve a quadratic equation by completing the square, giving exact roots.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-3',
  gen(rng, d) {
    let a = 1;
    let b = 0;
    let c = 0;
    let given = '';
    const variant = byDifficulty(d, rng.pick(['square', 'even', 'even']), rng.pick(['odd', 'divide', 'divide', 'none']), 'general');
    for (let i = 0; i < 300; i++) {
      if (variant === 'square' || variant === 'even') {
        const h = nz(rng, -6, 6);
        const q = rng.chance(0.25) ? rng.pick([4, 9, 16, 25]) : rng.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 18, 20]);
        a = 1;
        b = 2 * h;
        c = h * h - q;
        given = variant === 'square' ? `${shiftTex(h)}^2 = ${q}` : `${quadTex(1, b, c)} = 0`;
      } else if (variant === 'odd') {
        b = rng.pick([-7, -5, -3, -1, 1, 3, 5, 7, 9]);
        c = nz(rng, -9, 9);
        a = 1;
      } else if (variant === 'divide' || variant === 'none') {
        a = rng.pick([2, 3, 4, 5]);
        const h = nz(rng, -4, 4);
        b = 2 * a * h;
        c = nz(rng, -12, 12);
        if (variant === 'none' && b * b - 4 * a * c >= 0) continue;
      } else {
        a = rng.pick([2, 3, 4, 5]);
        b = nz(rng, -9, 9);
        c = nz(rng, -9, 9);
        if (b % (2 * a) === 0) continue;
      }
      const D = b * b - 4 * a * c;
      if (variant !== 'none' && D <= 0) continue;
      if (variant !== 'square' && variant !== 'even' && variant !== 'none' && isPerfectSquare(D) && rng.chance(0.8)) continue;
      if (gcdAll([a, b, c]) > 1 && variant !== 'divide' && variant !== 'none') continue;
      break;
    }
    if (!given) given = `${quadTex(a, b, c)} = 0`;
    const roots = quadRoots(a, b, c);
    const { steps, p, q } = csSteps(a, b, c);
    const exactNote = `Give exact roots. ${ROOTS_NOTE} If there are none, type *no real roots*.`;
    const rootsAns = rootsPart(roots.values, undefined, 'e.g. 3 + sqrt(2), 3 - sqrt(2)');
    const solutionTail = sqrtSteps(p, q, roots);
    if (variant === 'square') {
      const sol = [`Take the square root of both sides: $${sumTex([[1, 'x'], [-p, '']])} = \\pm${q === Math.round(q) && isPerfectSquare(q) ? ` ${Math.sqrt(q)}` : `\\sqrt{${q}}`}$`, `$${roots.tex}$`];
      return {
        prompt: `Solve: $${given}$\n\n${exactNote}`,
        parts: [rootsAns],
        hints: ['Take the square root of both sides. Remember both the positive and the negative square root.', `Then ${-p > 0 ? 'subtract' : 'add'} $${Math.abs(p)}$ on both sides.`],
        solution: sol,
        answerDisplay: `$${roots.tex}$`,
      };
    }
    if (variant === 'general') {
      return {
        prompt: `Solve $${given}$ by completing the square.\n\n(a) Write the equation in the form $(x - p)^2 = q$.\n\n(b) ${exactNote}`,
        parts: [numPart(p, { label: '(a) $p =$' }), numPart(q, { label: '$q =$' }), { ...rootsAns, label: '(b) $x =$' }],
        hints: [`Divide every term by $${a}$ first so the coefficient of $x^2$ is 1.`, 'Add the square of half the coefficient of $x$ to both sides, then take square roots.', EXACT_HINT],
        solution: [...steps, `So $p = ${rt(p)}$ and $q = ${rt(q)}$.`, ...solutionTail],
        answerDisplay: `$${shiftTex(-p)}^2 = ${rt(q)}$; $${roots.tex}$`,
      };
    }
    return {
      prompt: `Solve by completing the square: $${given}$\n\n${exactNote}`,
      parts: [rootsAns],
      hints: [
        a !== 1 ? `Divide every term by $${a}$ first so the coefficient of $x^2$ is 1.` : 'Move the constant term to the right side.',
        `Add the square of half the coefficient of $x$ to both sides, then take square roots (remember $\\pm$).`,
        EXACT_HINT,
      ],
      solution: [...steps, ...solutionTail],
      answerDisplay: roots.values.length ? `$${roots.tex}$` : 'no real roots',
    };
  },
});

const quadraticFormula = skill({
  id: 'm201-quadratic-formula',
  name: 'Using the quadratic formula',
  description: 'Solve a quadratic equation with the quadratic formula, giving exact roots in simplest radical form or decimal approximations.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-3',
  calculator: true,
  gen(rng, d) {
    const variant = byDifficulty(d, 'decimal', rng.pick(['exact', 'exact', 'decimal']), rng.pick(['rearrange', 'decimalCoef', 'fraction']));
    let a = 1;
    let b = 1;
    let c = -1;
    let eq = '';
    const pre: string[] = [];
    const decimalCoef = variant === 'decimalCoef';
    for (let i = 0; i < 400; i++) {
      if (decimalCoef) {
        a = rng.pick([0.5, 1.5, 2.5, -0.5, 0.2]);
        b = rng.int(-30, 30) / 10;
        c = rng.int(-40, 40) / 10;
        if (b === 0 || c === 0) continue;
      } else if (d === 1) {
        a = rng.pick([1, 1, 2, 3]);
        b = nz(rng, -9, 9);
        c = nz(rng, -9, 9);
      } else {
        a = rng.pick([2, 3, 4, 5, -2, -3, 1]);
        b = nz(rng, -9, 9);
        c = nz(rng, -9, 9);
      }
      const D = b * b - 4 * a * c;
      if (D <= 0) continue;
      if (!decimalCoef && isPerfectSquare(D)) continue;
      if (!decimalCoef && gcdAll([a, b, c]) > 1) continue;
      const rs = [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)];
      if (rs.some((r) => !safeRound(r, 2) || Math.abs(r) > 50)) continue;
      break;
    }
    if (variant === 'rearrange') {
      // a x² + b x + c = 0 shown as m·x(x + h) = L + n·x
      const m = a;
      const n = rng.pick([-3, -2, -1, 1, 2, 3]);
      // m x² + m h x = L + n x  =>  m x² + (m h − n) x − L = 0 ; need m h − n = b, L = −c
      const hx = (b + n) / m;
      if (Number.isInteger(hx) && hx !== 0) {
        eq = `${m === 1 ? '' : m === -1 ? '-' : m}x${shiftTex(hx)} = ${sumTex([[-c, ''], [n, 'x']])}`;
        pre.push(`Expand and rearrange into standard form: $${quadTex(a, b, c)} = 0$`);
      } else {
        eq = `${sumTex([[a, 'x^2'], [b, 'x']])} = ${rt(-c)}`;
        pre.push(`Rearrange into standard form: $${quadTex(a, b, c)} = 0$`);
      }
    } else if (variant === 'fraction') {
      const k = rng.pick([1 / 2, 1 / 3, 1 / 4, 1 / 6]);
      eq = `${quadTex(k * a, k * b, k * c)} = 0`;
      pre.push(`Multiply both sides by $${rt(1 / k)}$ to clear the fractions: $${quadTex(a, b, c)} = 0$`);
    } else eq = `${quadTex(a, b, c, 'x', decimalCoef)} = 0`;
    const D = b * b - 4 * a * c;
    const exact = variant === 'exact' || variant === 'fraction' || (variant === 'rearrange' && rng.chance(0.5));
    const roots = exact ? quadRoots(a, b, c) : null;
    const values = [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)].sort((x, y) => x - y);
    const show = (x: number) => (decimalCoef ? fmt(x) : `${x}`);
    const showP = (x: number) => (x < 0 ? `(${show(x)})` : show(x));
    const Dtex = decimalCoef ? fmt(D) : `${D}`;
    const formula = `x = \\dfrac{-${showP(b)} \\pm \\sqrt{${showP(b)}^2 - 4${showP(a)}${showP(c)}}}{2${showP(a)}} = \\dfrac{${show(-b)} \\pm \\sqrt{${Dtex}}}{${show(2 * a)}}`;
    const steps = [...pre, `$a = ${show(a)}$, $b = ${show(b)}$, $c = ${show(c)}$`, `$${formula}$`];
    if (exact && roots) {
      steps.push(`Simplify: $\\sqrt{${D}} = ${sqrtTex(D)}$, so $${roots.tex}$`);
    } else {
      const minus = (-b - Math.sqrt(D)) / (2 * a);
      const plus = (-b + Math.sqrt(D)) / (2 * a);
      steps.push(`$x = \\dfrac{${show(-b)} - \\sqrt{${Dtex}}}{${show(2 * a)}} \\approx ${fmtFixed(minus, 2)}$ or $x = \\dfrac{${show(-b)} + \\sqrt{${Dtex}}}{${show(2 * a)}} \\approx ${fmtFixed(plus, 2)}$`);
      steps.push(`The roots are $${decimalsList(values)}$.`);
    }
    return {
      prompt: exact
        ? `Solve with the quadratic formula: $${eq}$\n\nGive exact roots in simplest form. ${ROOTS_NOTE}`
        : `Solve with the quadratic formula: $${eq}$\n\nRound each root to the nearest hundredth. ${ROOTS_NOTE}`,
      parts: [rootsPart(values, exact ? undefined : 2, exact ? 'e.g. (3 + sqrt(5))/2, (3 - sqrt(5))/2' : 'e.g. 1.27, -3.54')],
      hints: [
        pre.length ? 'Write the equation in standard form $ax^2 + bx + c = 0$ first.' : 'Identify $a$, $b$ and $c$, including their signs.',
        '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$',
        ...(exact ? [EXACT_HINT] : []),
      ],
      solution: steps,
      answerDisplay: exact && roots ? `$${roots.tex}$` : `$${decimalsList(values)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// RF5 — the discriminant and applications
// ---------------------------------------------------------------------------

const discriminant = skill({
  id: 'm201-discriminant',
  name: 'The discriminant',
  description: 'Use the discriminant b² − 4ac to find the number of real roots of a quadratic equation and to find unknown coefficients.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-4',
  gen(rng, d) {
    if (d === 3) {
      const variant = rng.pick(['kLead', 'kMiddle', 'kConst', 'range']);
      if (variant === 'kMiddle') {
        const al = rng.int(1, 4);
        const ga = rng.int(1, 6);
        const A = al * al;
        const C = ga * ga;
        const k = 2 * al * ga;
        return {
          prompt: `Find all values of $k$ for which $${A === 1 ? '' : A}x^2 + kx + ${C} = 0$ has exactly one real root (two equal real roots).\n\n${ROOTS_NOTE}`,
          parts: [{ label: '$k =$', answer: { kind: 'numbers', values: [-k, k] }, placeholder: 'e.g. -4, 4' }],
          hints: ['Two equal real roots means the discriminant is zero.', `Solve $k^2 - 4(${A})(${C}) = 0$.`],
          solution: [`$b^2 - 4ac = k^2 - 4(${A})(${C}) = k^2 - ${4 * A * C}$`, `Set it equal to zero: $k^2 = ${4 * A * C}$`, `$k = \\pm ${k}$`],
          answerDisplay: `$k = -${k}$ or $k = ${k}$`,
        };
      }
      if (variant === 'kLead' || variant === 'kConst') {
        // kLead: kx² + bx + c = 0 → k = b²/(4c); kConst: ax² + bx + k = 0 → k = b²/(4a)
        let a = 1;
        let b = 2;
        for (let i = 0; i < 100; i++) {
          a = rng.int(1, 5);
          b = nz(rng, -12, 12);
          if (((b * b) / (4 * a)) % 1 === 0 || rng.chance(0.3)) break;
        }
        const k = (b * b) / (4 * a);
        const eq = variant === 'kLead' ? `kx^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x + ${a} = 0` : `${a === 1 ? '' : a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x + k = 0`;
        const disc = variant === 'kLead' ? `(${b})^2 - 4(k)(${a}) = ${b * b} - ${4 * a}k` : `(${b})^2 - 4(${a})(k) = ${b * b} - ${4 * a}k`;
        return {
          prompt: `For what value of $k$ does $${eq}$ have exactly one real root (two equal real roots)?`,
          parts: [numPart(k, { label: '$k =$' })],
          hints: ['Two equal real roots means the discriminant is zero.', 'Write $b^2 - 4ac$ in terms of $k$ and set it equal to 0.'],
          solution: [`$b^2 - 4ac = ${disc}$`, `Set it equal to zero: $${b * b} - ${4 * a}k = 0$`, `$k = \\dfrac{${b * b}}{${4 * a}} = ${rt(k)}$`],
        };
      }
      // range of k for x² + bx + k (or ax² + bx + k)
      const a = rng.pick([1, 1, 2, 3]);
      const b = nz(rng, -10, 10);
      const T = (b * b) / (4 * a);
      const want = rng.pick(['two', 'none', 'some'] as const);
      const Tt = rt(T);
      const correct = want === 'two' ? `$k < ${Tt}$` : want === 'none' ? `$k > ${Tt}$` : `$k \\le ${Tt}$`;
      const all = [`$k < ${Tt}$`, `$k > ${Tt}$`, `$k \\le ${Tt}$`, `$k \\ge ${Tt}$`, `$k = ${Tt}$`];
      const phrase = want === 'two' ? 'two distinct real roots' : want === 'none' ? 'no real roots' : 'at least one real root';
      const ineq = want === 'two' ? '>' : want === 'none' ? '<' : '\\ge';
      return {
        prompt: `For which values of $k$ does $${a === 1 ? '' : a}x^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)}x + k = 0$ have ${phrase}?`,
        parts: [{ answer: mc(rng, correct, rng.shuffle(all.filter((x) => x !== correct))) }],
        hints: [`${want === 'two' ? 'Two distinct real roots: $b^2 - 4ac > 0$.' : want === 'none' ? 'No real roots: $b^2 - 4ac < 0$.' : 'At least one real root: $b^2 - 4ac \\ge 0$.'}`, 'Write the discriminant in terms of $k$ and solve the inequality.'],
        solution: [
          `$b^2 - 4ac = (${b})^2 - 4(${a})k = ${b * b} - ${4 * a}k$`,
          `We need $${b * b} - ${4 * a}k ${ineq} 0$, that is, $${b * b} ${ineq} ${4 * a}k$.`,
          `Divide both sides by $${4 * a}$: ${correct}.`,
        ],
      };
    }
    // d1, d2: value of the discriminant and the nature of the roots
    const kind = rng.int(0, 2);
    let a = 1;
    let b = 1;
    let c = 1;
    for (let i = 0; i < 400; i++) {
      if (kind === 1) {
        const m = rng.int(1, d === 1 ? 2 : 5);
        const p = nz(rng, -7, 7);
        if (gcd(m, p) !== 1) continue;
        const s = d === 2 && rng.chance(0.3) ? -1 : 1;
        a = s * m * m;
        b = s * 2 * m * p;
        c = s * p * p;
      } else {
        a = d === 1 ? rng.pick([1, 1, 2, 3]) : rng.pick([2, 3, 4, 5, -2, -3, 1]);
        b = d === 1 ? nz(rng, -8, 8) : nz(rng, -12, 12);
        c = nz(rng, -9, 9);
      }
      const D = b * b - 4 * a * c;
      if ((kind === 0 && D > 0) || (kind === 1 && D === 0) || (kind === 2 && D < 0)) break;
    }
    const D = b * b - 4 * a * c;
    let eq = `${quadTex(a, b, c)} = 0`;
    const pre: string[] = [];
    if (d === 2) {
      const form = rng.int(0, 2);
      eq = form === 0 ? `${sumTex([[a, 'x^2'], [c, '']])} = ${sumTex([[-b, 'x']])}` : form === 1 ? `${sumTex([[a, 'x^2']])} = ${sumTex([[-b, 'x'], [-c, '']])}` : `${sumTex([[a, 'x^2'], [b, 'x']])} = ${-c}`;
      pre.push(`Standard form: $${quadTex(a, b, c)} = 0$`);
    }
    const why = D > 0 ? 'positive, so there are two distinct real roots' : D === 0 ? 'zero, so there is one real root (two equal real roots)' : 'negative, so there are no real roots';
    return {
      prompt: `For the equation $${eq}$:\n\n(a) Find the value of the discriminant.\n\n(b) Describe the roots.`,
      parts: [numPart(D, { label: '(a) $b^2 - 4ac =$' }), { label: '(b)', answer: fixedChoice(NATURE, kind) }],
      hints: [...(d === 2 ? ['Write the equation in standard form $ax^2 + bx + c = 0$ first.'] : []), 'Substitute $a$, $b$ and $c$ into $b^2 - 4ac$.', 'Positive: two distinct real roots. Zero: one real root. Negative: no real roots.'],
      solution: [...pre, `$a = ${a}$, $b = ${b}$, $c = ${c}$`, `$b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${b * b} ${-4 * a * c < 0 ? '-' : '+'} ${Math.abs(4 * a * c)} = ${D}$`, `The discriminant is ${why}.`],
    };
  },
});

const NAMES = ['Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Chloé', 'Owen', 'Fatima', 'Jasmine', 'Raj', 'Leila', 'Tyler', 'Nia', 'Hiroshi', 'Émile'];

const quadApply = skill({
  id: 'm201-quadratic-apply',
  name: 'Solving problems with quadratic equations',
  description: 'Model a situation with a quadratic equation, solve it, and reject roots that do not make sense in the context.',
  outcomes: ['RF5'],
  lessonId: 'm201-4-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const ctx = byDifficulty(d, rng.pick(['consecutive', 'rectangle', 'projectileInt']), rng.pick(['consecutive', 'rectangle', 'triangle', 'border', 'projectile']), rng.pick(['borderEqual', 'heightTimes', 'aboveFor', 'fence']));
    const given = d === 1;
    if (ctx === 'consecutive') {
      const kind = rng.pick(['integers', 'even', 'odd', ...(d === 2 ? ['squares'] : [])]);
      if (kind === 'squares') {
        const n = rng.int(4, 20);
        const S = n * n + (n + 1) ** 2;
        return {
          prompt: `The sum of the squares of two consecutive positive integers is $${S}$. Find the two integers.`,
          parts: [numPart(n, { label: 'Smaller integer:' }), numPart(n + 1, { label: 'Larger integer:' })],
          hints: ['Let the integers be $n$ and $n + 1$. Write an equation for the sum of their squares.', 'Expand, write in standard form, divide by 2 and factor.'],
          solution: [
            `$n^2 + (n + 1)^2 = ${S}$`,
            `$2n^2 + 2n + 1 - ${S} = 0$, so $n^2 + n - ${(S - 1) / 2} = 0$`,
            `$(n - ${n})(n + ${n + 1}) = 0$, so $n = ${n}$ or $n = -${n + 1}$.`,
            `The integers must be positive, so reject $n = -${n + 1}$.`,
            `The integers are $${n}$ and $${n + 1}$.`,
          ],
        };
      }
      const step = kind === 'integers' ? 1 : 2;
      let n = rng.int(5, 24);
      if (kind === 'even' && n % 2) n++;
      if (kind === 'odd' && n % 2 === 0) n++;
      const P = n * (n + step);
      const word = kind === 'integers' ? 'consecutive positive integers' : `consecutive positive ${kind} integers`;
      return {
        prompt: `The product of two ${word} is $${P}$.${given ? ` If $n$ is the smaller integer, then $n(n + ${step}) = ${P}$.` : ''} Find the two integers.`,
        parts: [numPart(n, { label: 'Smaller integer:' }), numPart(n + step, { label: 'Larger integer:' })],
        hints: [
          given ? `Expand and write the equation in standard form: $n^2 + ${step}n - ${P} = 0$.` : `Let the smaller integer be $n$. ${step === 1 ? 'The next integer is $n + 1$.' : `The next ${kind} integer is $n + 2$.`}`,
          `Factor: find two integers with product $-${P}$ and sum $${step}$. Then reject any root that is not positive.`,
        ],
        solution: [
          `$n(n + ${step}) = ${P}$`,
          `$n^2 + ${step}n - ${P} = 0$`,
          `$(n - ${n})(n + ${n + step}) = 0$, so $n = ${n}$ or $n = -${n + step}$.`,
          `The integers are positive, so reject $n = -${n + step}$.`,
          `The integers are $${n}$ and $${n + step}$.`,
        ],
      };
    }
    if (ctx === 'rectangle') {
      const thing = rng.pick([
        { what: 'garden', unit: 'm' },
        { what: 'patio', unit: 'm' },
        { what: 'poster', unit: 'cm' },
        { what: 'solar panel', unit: 'cm' },
        { what: 'skating rink', unit: 'm' },
      ]);
      const c = rng.pick([1, 2, 3]);
      const sign = c > 1 && rng.chance(0.35) ? -1 : 1;
      const k = rng.int(1, 7);
      let w = rng.int(3, 12);
      while (c * w + sign * k <= w) w++;
      const L = c * w + sign * k;
      const A = w * L;
      const lenDesc = `${c === 1 ? '' : c === 2 ? 'twice ' : 'three times '}its width ${sign > 0 ? 'plus' : 'minus'} $${k}$ ${thing.unit}`;
      // c w² + s k w − A = 0 → (w − w0)(c w + c w0 + s k) = 0
      const other = -(c * w + sign * k) / c;
      const eqStd = `${quadTex(c, sign * k, -A, 'w')} = 0`;
      return {
        prompt: `The length of a rectangular ${thing.what} is ${lenDesc}. Its area is $${A}\\ \\text{${thing.unit}}^2$.${given ? ` If $w$ is the width, then $w(${c === 1 ? '' : c}w ${sign > 0 ? '+' : '-'} ${k}) = ${A}$.` : ''} Find the width and the length.`,
        parts: [numPart(w, { label: 'Width:', suffix: thing.unit }), numPart(L, { label: 'Length:', suffix: thing.unit })],
        hints: [
          given ? `Expand and write in standard form: $${eqStd}$.` : `Let the width be $w$. Then the length is $${c === 1 ? '' : c}w ${sign > 0 ? '+' : '-'} ${k}$ and the area is width × length.`,
          'Solve by factoring (or the quadratic formula) and reject the negative root: a length cannot be negative.',
        ],
        solution: [
          `$w(${c === 1 ? '' : c}w ${sign > 0 ? '+' : '-'} ${k}) = ${A}$`,
          `$${eqStd}$`,
          `$(w - ${w})${binTex(c, 'w', c * w + sign * k)} = 0$, so $w = ${w}$ or $w = ${rt(other)}$.`,
          `A width cannot be negative, so reject $w = ${rt(other)}$.`,
          `Width $= ${w}$ ${thing.unit}; length $= ${c === 1 ? '' : `${c}(${w})`}${c === 1 ? w : ''} ${sign > 0 ? '+' : '-'} ${k} = ${L}$ ${thing.unit}.`,
        ],
      };
    }
    if (ctx === 'triangle') {
      const [p, q, h] = rng.pick([
        [3, 4, 5],
        [6, 8, 10],
        [9, 12, 15],
        [5, 12, 13],
        [8, 15, 17],
        [7, 24, 25],
        [20, 21, 29],
        [12, 16, 20],
        [12, 35, 37],
        [15, 20, 25],
      ] as Array<[number, number, number]>);
      const dd = q - p;
      const scene = rng.pick(['screen', 'triangle', 'brace']);
      const unit = scene === 'brace' ? 'cm' : scene === 'screen' ? 'cm' : 'm';
      const prompt =
        scene === 'screen'
          ? `A rectangular display screen is $${dd}$ cm wider than it is tall. Its diagonal is $${h}$ cm. Find the height and the width of the screen.`
          : scene === 'brace'
            ? `A triangular shelf brace has a right angle. One leg is $${dd}$ cm longer than the other, and the hypotenuse is $${h}$ cm. Find the lengths of the two legs.`
            : `${name} is laying out a right-triangular flower bed. One leg is $${dd}$ m longer than the other, and the hypotenuse is $${h}$ m. Find the lengths of the two legs.`;
      return {
        prompt,
        parts: [numPart(p, { label: scene === 'screen' ? 'Height:' : 'Shorter leg:', suffix: unit }), numPart(q, { label: scene === 'screen' ? 'Width:' : 'Longer leg:', suffix: unit })],
        hints: [`Let the shorter side be $x$. The longer side is $x + ${dd}$. Use the Pythagorean theorem.`, `Expand, write in standard form, divide by 2 and solve. Reject the negative root.`],
        solution: [
          `$x^2 + (x + ${dd})^2 = ${h}^2$`,
          `$2x^2 + ${2 * dd}x + ${dd * dd} = ${h * h}$, so $2x^2 + ${2 * dd}x - ${h * h - dd * dd} = 0$`,
          `Divide by 2: $x^2 + ${dd}x - ${(h * h - dd * dd) / 2} = 0$`,
          `$(x - ${p})(x + ${q}) = 0$, so $x = ${p}$ or $x = -${q}$.`,
          `A length cannot be negative, so $x = ${p}$.`,
          `The sides are $${p}$ ${unit} and $${p} + ${dd} = ${q}$ ${unit}.`,
        ],
      };
    }
    if (ctx === 'border') {
      const item = rng.pick(['photograph', 'painting', 'garden', 'pool']);
      const unit = item === 'garden' || item === 'pool' ? 'm' : 'cm';
      const W = unit === 'm' ? rng.int(4, 12) : rng.int(15, 40);
      const L = W + (unit === 'm' ? rng.int(2, 8) : rng.int(5, 20));
      const x = unit === 'm' ? rng.int(1, 3) : rng.int(2, 6);
      const T = (W + 2 * x) * (L + 2 * x);
      const border = item === 'garden' ? 'path' : item === 'pool' ? 'deck' : 'frame';
      // 4x² + 2(W+L)x + WL − T = 0 → x² + (W+L)/2 x + (WL − T)/4 = 0
      const other = -(W + L) / 2 - x;
      return {
        prompt: `A ${W} ${unit} by ${L} ${unit} ${item} is surrounded by a ${border} of uniform width. The ${item} and ${border} together cover $${T}\\ \\text{${unit}}^2$. How wide is the ${border}?`,
        parts: [numPart(x, { label: 'Width:', suffix: unit })],
        hints: [`Let the ${border} be $x$ ${unit} wide. The outer rectangle measures $(${W} + 2x)$ by $(${L} + 2x)$.`, 'Expand, write in standard form, then solve. Reject the negative root.'],
        solution: [
          `$(${W} + 2x)(${L} + 2x) = ${T}$`,
          `$4x^2 + ${2 * (W + L)}x + ${W * L} = ${T}$, so $4x^2 + ${2 * (W + L)}x - ${T - W * L} = 0$`,
          `Divide by 2: $2x^2 + ${W + L}x - ${(T - W * L) / 2} = 0$`,
          `Factor: $(x - ${x})(2x + ${2 * x + W + L}) = 0$, so $x = ${x}$ or $x = ${rt(other)}$.`,
          `A width cannot be negative, so reject $x = ${rt(other)}$.`,
          `The ${border} is $${x}$ ${unit} wide.`,
        ],
      };
    }
    if (ctx === 'borderEqual') {
      const item = rng.pick(['photograph', 'painting', 'quilt block', 'garden']);
      const unit = item === 'garden' ? 'm' : 'cm';
      let W = 0;
      let L = 0;
      let x = 0;
      for (let i = 0; i < 200; i++) {
        W = unit === 'm' ? rng.int(4, 12) : rng.int(10, 40);
        L = W + (unit === 'm' ? rng.int(1, 8) : rng.int(2, 20));
        x = (-2 * (W + L) + Math.sqrt(4 * (W + L) ** 2 + 16 * W * L)) / 8;
        if (safeRound(x, 2)) break;
      }
      const border = item === 'garden' ? 'path' : 'border';
      const D = 4 * (W + L) ** 2 + 16 * W * L;
      return {
        prompt: `A ${W} ${unit} by ${L} ${unit} ${item} has a ${border} of uniform width around it. The area of the ${border} equals the area of the ${item}. Find the width of the ${border}, to the nearest hundredth of a ${unit === 'm' ? 'metre' : 'centimetre'}.`,
        parts: [numPart(x, { label: 'Width:', suffix: unit, decimals: 2 })],
        hints: [`The outer rectangle is $(${W} + 2x)$ by $(${L} + 2x)$ and its area is twice the area of the ${item}.`, 'Write the equation in standard form and use the quadratic formula. Reject the negative root.'],
        solution: [
          `The total area is $2 \\times ${W} \\times ${L} = ${2 * W * L}$: $(${W} + 2x)(${L} + 2x) = ${2 * W * L}$`,
          `$4x^2 + ${2 * (W + L)}x + ${W * L} = ${2 * W * L}$, so $4x^2 + ${2 * (W + L)}x - ${W * L} = 0$`,
          `$x = \\dfrac{-${2 * (W + L)} \\pm \\sqrt{${2 * (W + L)}^2 - 4(4)(-${W * L})}}{2(4)} = \\dfrac{-${2 * (W + L)} \\pm \\sqrt{${D}}}{8}$`,
          `The negative root makes no sense for a width, so $x = \\dfrac{-${2 * (W + L)} + \\sqrt{${D}}}{8} \\approx ${fmtFixed(x, 2)}$.`,
          `The ${border} is about $${fmtFixed(x, 2)}$ ${unit} wide.`,
        ],
      };
    }
    if (ctx === 'fence') {
      let P = 0;
      let A = 0;
      let w = 0;
      let l = 0;
      for (let i = 0; i < 200; i++) {
        P = 2 * rng.int(12, 40);
        const half = P / 2;
        A = rng.int(Math.ceil(half * half * 0.12), Math.floor(half * half * 0.24));
        const D = half * half - 4 * A;
        if (D <= 0 || isPerfectSquare(D)) continue;
        w = (half - Math.sqrt(D)) / 2;
        l = (half + Math.sqrt(D)) / 2;
        if (safeRound(w, 2) && safeRound(l, 2)) break;
      }
      const half = P / 2;
      const animal = rng.pick(['a dog run', 'a vegetable garden', 'a goat pen', 'a play area']);
      return {
        prompt: `${name} has $${P}$ m of fencing to enclose ${animal} in the shape of a rectangle with an area of $${A}\\ \\text{m}^2$. Find the dimensions of the rectangle, to the nearest hundredth of a metre.`,
        parts: [numPart(w, { label: 'Shorter side:', suffix: 'm', decimals: 2 }), numPart(l, { label: 'Longer side:', suffix: 'm', decimals: 2 })],
        hints: [`If one side is $x$, the perimeter tells you the other side is $${half} - x$.`, `Solve $x(${half} - x) = ${A}$ with the quadratic formula.`],
        solution: [
          `Let one side be $x$. Then $2x + 2(\\text{other side}) = ${P}$, so the other side is $${half} - x$.`,
          `$x(${half} - x) = ${A}$, so $x^2 - ${half}x + ${A} = 0$`,
          `$x = \\dfrac{${half} \\pm \\sqrt{${half}^2 - 4(${A})}}{2} = \\dfrac{${half} \\pm \\sqrt{${half * half - 4 * A}}}{2}$`,
          `$x \\approx ${fmtFixed(w, 2)}$ or $x \\approx ${fmtFixed(l, 2)}$. Both roots work: one is the width and the other is the length ($${fmtFixed(w, 2)} + ${fmtFixed(l, 2)} = ${half}$).`,
          `The rectangle is about $${fmtFixed(w, 2)}$ m by $${fmtFixed(l, 2)}$ m.`,
        ],
      };
    }
    // projectiles
    if (ctx === 'projectileInt') {
      // h = −5t² + v t + h0 = −5(t − t1)(t + t0)
      const t1 = rng.int(2, 6);
      const t0 = rng.pick([1, 1, 2]);
      const v = 5 * (t1 - t0);
      const h0 = 5 * t1 * t0;
      const o = rng.pick([
        { what: 'A stone is tossed upward', from: `from a bridge ${h0} m above a river`, surface: 'the water' },
        { what: 'A ball is thrown upward', from: `from the roof of a building ${h0} m tall`, surface: 'the ground' },
        { what: 'A signal flare is fired upward', from: `from a cliff ${h0} m above a lake`, surface: 'the water' },
      ]);
      const vTerm = v === 0 ? '' : ` + ${v}t`;
      return {
        prompt: `${o.what} ${o.from}. Its height, $h$, in metres, above ${o.surface} after $t$ seconds is modelled by $h = -5t^2${vTerm} + ${h0}$. After how many seconds does it reach ${o.surface}?`,
        parts: [numPart(t1, { label: '$t =$', suffix: 's' })],
        hints: [`It reaches ${o.surface} when $h = 0$.`, 'Divide by $-5$, then factor. Reject the negative root: the time after the launch cannot be negative.'],
        solution: [
          `$-5t^2${vTerm} + ${h0} = 0$`,
          `Divide by $-5$: $${quadTex(1, -v / 5, -h0 / 5, 't')} = 0$`,
          `$(t - ${t1})(t + ${t0}) = 0$, so $t = ${t1}$ or $t = -${t0}$.`,
          `Time cannot be negative, so reject $t = -${t0}$.`,
          `It reaches ${o.surface} after $${t1}$ s.`,
        ],
      };
    }
    const objs = [
      { what: 'A ball is thrown upward', from: (h: number) => `from a height of ${h} m`, heights: [1, 1.5, 2], surface: 'the ground' },
      { what: 'A model rocket is launched', from: (h: number) => (h ? `from a platform ${h} m above the ground` : 'from the ground'), heights: [0, 1, 2, 3], surface: 'the ground' },
      { what: 'A stone is tossed upward', from: (h: number) => `from a bridge ${h} m above a river`, heights: [10, 12, 15, 20], surface: 'the water' },
      { what: 'A diver jumps upward', from: (h: number) => `from a diving board ${h} m above the water`, heights: [1, 3, 5], surface: 'the water' },
      { what: 'A soccer ball is kicked', from: () => 'from the ground', heights: [0], surface: 'the ground' },
    ];
    const o = rng.pick(ctx === 'projectile' ? objs.slice(0, 4) : objs.filter((x) => !x.what.startsWith('A diver')));
    let v = 0;
    let h0 = 0;
    let H = 0;
    let found = false;
    for (let i = 0; i < 400 && !found; i++) {
      v = o.what.startsWith('A diver') ? rng.int(3, 6) : rng.int(8, 30);
      h0 = rng.pick(o.heights);
      const max = h0 + (v * v) / (4 * 4.9);
      if (ctx === 'projectile') {
        if (h0 === 0) continue;
        H = 0;
      } else {
        H = rng.int(Math.floor(h0) + 1, Math.max(Math.floor(h0) + 1, Math.floor(max - 0.5)));
        if (H <= h0 || H >= max - 0.3) continue;
      }
      const D0 = v * v - 4 * 4.9 * (H - h0);
      const lo = (v - Math.sqrt(D0)) / 9.8;
      const hi = (v + Math.sqrt(D0)) / 9.8;
      const check = ctx === 'projectile' ? [hi] : ctx === 'aboveFor' ? [hi - lo] : [lo, hi];
      found = check.every((r) => safeRound(r, 2));
    }
    if (!found) {
      v = 20;
      h0 = Math.max(...o.heights);
      H = ctx === 'projectile' ? 0 : h0 + 5;
    }
    const model = `h = -4.9t^2 + ${v}t${h0 ? ` + ${fmt(h0)}` : ''}`;
    const intro = `${o.what} ${o.from(h0)}. Its height, $h$, in metres, above ${o.surface} after $t$ seconds is modelled by $${model}$.`;
    const D = v * v - 4 * 4.9 * (H - h0);
    const c0 = h0 - H;
    const std = `-4.9t^2 + ${v}t ${c0 < 0 ? '-' : '+'} ${fmt(Math.abs(c0))} = 0`;
    const formula = `t = \\dfrac{-${v} \\pm \\sqrt{${v}^2 - 4(-4.9)(${fmt(c0)})}}{2(-4.9)} = \\dfrac{-${v} \\pm \\sqrt{${fmt(D, 2)}}}{-9.8}`;
    const r1 = (v - Math.sqrt(D)) / 9.8;
    const r2 = (v + Math.sqrt(D)) / 9.8;
    if (ctx === 'projectile') {
      return {
        prompt: `${intro} After how many seconds does it reach ${o.surface}? Round to the nearest hundredth of a second.`,
        parts: [numPart(r2, { label: '$t =$', suffix: 's', decimals: 2 })],
        hints: [`It reaches ${o.surface} when $h = 0$. Solve $${std}$.`, 'Use the quadratic formula and reject the negative root.'],
        solution: [
          `Set $h = 0$: $${std}$`,
          `$${formula}$`,
          `$t \\approx ${fmtFixed(r1, 2)}$ or $t \\approx ${fmtFixed(r2, 2)}$`,
          'The time after the launch cannot be negative, so reject the negative root.',
          `It reaches ${o.surface} after about $${fmtFixed(r2, 2)}$ s.`,
        ],
      };
    }
    if (ctx === 'aboveFor') {
      return {
        prompt: `${intro} For how many seconds is it at least $${H}$ m above ${o.surface}? Round to the nearest hundredth of a second.`,
        parts: [numPart(r2 - r1, { suffix: 's', decimals: 2 })],
        hints: [`Find the two times when $h = ${H}$: on the way up and on the way down.`, 'The time at or above that height is the difference of the two times.'],
        solution: [
          `Set $h = ${H}$: $${std}$`,
          `$${formula}$`,
          `$t \\approx ${fmtFixed(r1, 3)}$ (on the way up) or $t \\approx ${fmtFixed(r2, 3)}$ (on the way down)`,
          `Time at or above $${H}$ m: $${fmtFixed(r2, 3)} - ${fmtFixed(r1, 3)} \\approx ${fmtFixed(r2 - r1, 2)}$ s`,
        ],
      };
    }
    return {
      prompt: `${intro} At what times is it exactly $${H}$ m above ${o.surface}? Round each time to the nearest hundredth of a second. ${ROOTS_NOTE}`,
      parts: [{ label: '$t =$', answer: { kind: 'numbers', values: [r1, r2], decimals: 2 }, placeholder: 'e.g. 0.85, 2.41', suffix: 's' }],
      hints: [`Set $h = ${H}$ and write the equation in standard form.`, 'Use the quadratic formula. Both roots are positive: one on the way up and one on the way down.'],
      solution: [
        `Set $h = ${H}$: $${std}$`,
        `$${formula}$`,
        `$t \\approx ${fmtFixed(r1, 2)}$ or $t \\approx ${fmtFixed(r2, 2)}$`,
        `Both times make sense: it passes $${H}$ m on the way up at about $${fmtFixed(r1, 2)}$ s and on the way down at about $${fmtFixed(r2, 2)}$ s.`,
      ],
      answerDisplay: `$t \\approx ${fmtFixed(r1, 2)}$ s and $t \\approx ${fmtFixed(r2, 2)}$ s`,
    };
  },
});

export const QUAD_EQUATION_SKILLS: SkillDef[] = [
  factorTrinomial,
  differenceSquares,
  factorSubstitution,
  solveFactor,
  rootsGraph,
  solveCompleteSquare,
  quadraticFormula,
  discriminant,
  quadApply,
];
