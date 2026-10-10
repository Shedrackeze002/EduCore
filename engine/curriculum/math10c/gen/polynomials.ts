/** Unit 4 — Polynomials (A4, A5). */
import { byDifficulty, fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import { type Poly, polyAdd, polyConst, polyLatex, polyMul, polyText } from '../../../math/poly.ts';
import { gcd, gcdAll } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import { gradePart } from '../../../grade.ts';

/** a*v + b*w as a polynomial (w = '' for constants). */
function lin(a: number, v: string, b: number, w = ''): Poly {
  const p: Poly = new Map();
  if (a) p.set(v, a);
  if (b) p.set(w, (p.get(w) ?? 0) + b);
  return p;
}

/** LaTeX for (av + bw), e.g. "(2x - 3)" or "(x + 4y)". */
function binTex(a: number, v: string, b: number, w = ''): string {
  return `(${polyLatex(lin(a, v, b, w), [v, w].filter(Boolean))})`;
}
function binText(a: number, v: string, b: number, w = ''): string {
  return `(${polyText(lin(a, v, b, w), [v, w].filter(Boolean))})`;
}

const VARS = ['x', 'a', 'm', 'n', 'y', 't'];

function pv(rng: Rng): string {
  return rng.pick(VARS.slice(0, 4));
}

function nz(rng: Rng, lo: number, hi: number): number {
  return rng.nonZero(lo, hi);
}

function expandSteps(a: number, b: number, c: number, d: number, v: string, w = ''): string[] {
  const t = (k: number, s: string) => (k === 1 && s ? s : k === -1 && s ? `-${s}` : `${k}${s}`);
  const vv = `${v}^2`;
  const first = t(a * c, w ? `${v}^2` : vv);
  const outer = t(a * d, `${v}${w}`);
  const inner = t(b * c, `${v}${w}`);
  const last = t(b * d, w ? `${w}^2` : '');
  const join = (xs: string[]) => xs.reduce((acc, x, i) => (i === 0 ? x : x.startsWith('-') ? `${acc} - ${x.slice(1)}` : `${acc} + ${x}`), '');
  return [`Multiply each term in the first binomial by each term in the second (FOIL): $${join([first, outer, inner, last])}$`, `Combine like terms: $${polyLatex(polyMul(lin(a, v, b, w), lin(c, v, d, w)), [v, w].filter(Boolean))}$`];
}

// ---------------------------------------------------------------------------
// A4 — multiplication
// ---------------------------------------------------------------------------

const areaModel = skill({
  id: 'a4-area-model',
  name: 'Area models for multiplication',
  description: 'Use an area model (algebra tiles) to multiply binomials and to read a product.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-1',
  gen(rng, d) {
    const v = 'x';
    const a = d === 1 ? 1 : rng.int(1, 3);
    const c = d === 1 ? 1 : rng.int(1, 3);
    const b = d === 1 ? rng.int(1, 6) : nz(rng, -6, 6);
    const dd = d === 1 ? rng.int(1, 6) : nz(rng, -6, 6);
    const prod = polyMul(lin(a, v, b), lin(c, v, dd));
    const term = (k: number, s: string) => (k === 1 && s ? s : k === -1 && s ? `-${s}` : `${k}${s}`);
    const cells = [
      [term(a * c, 'x^2'), term(a * dd, 'x')],
      [term(b * c, 'x'), term(b * dd, '')],
    ];
    if (d === 3) {
      const correct = `$${binTex(a, v, b)}${binTex(c, v, dd)}$`;
      return {
        prompt: `The area model shows the product of two binomials. Which multiplication does it represent?`,
        figure: { type: 'areaModel', top: [term(c, 'x'), `${dd}`], side: [term(a, 'x'), `${b}`], cells },
        parts: [
          {
            answer: mc(rng, correct, [
              `$${binTex(a, v, -b)}${binTex(c, v, dd)}$`,
              `$${binTex(a, v, b)}${binTex(c, v, -dd)}$`,
              `$${binTex(c, v, b)}${binTex(a, v, -dd)}$`,
            ]),
          },
        ],
        hints: ['The dimensions of the rectangle (the top and side labels) are the two factors.'],
        solution: [`Side: $${binTex(a, v, b)}$, top: $${binTex(c, v, dd)}$`, `Product: $${polyLatex(prod)}$`],
      };
    }
    return {
      prompt: `Use the area model to determine the product $${binTex(a, v, b)}${binTex(c, v, dd)}$. Write it as a simplified polynomial.`,
      figure: { type: 'areaModel', top: [term(c, 'x'), `${dd}`], side: [term(a, 'x'), `${b}`], cells: d === 1 ? cells : [['?', '?'], ['?', '?']] },
      parts: [part({ kind: 'expression', expected: polyText(prod), form: 'expanded' }, { placeholder: 'e.g. 2x^2+7x+3' })],
      hints: ['Each cell is the product of its row label and column label.', 'Add all four cells and combine the two $x$-terms.'],
      solution: [`Cells: $${cells.flat().join('$, $')}$`, `Sum: $${polyLatex(prod)}$`],
      answerDisplay: `$${polyLatex(prod)}$`,
    };
  },
});

const twoDigit = skill({
  id: 'a4-two-digit',
  name: 'Binomials and two-digit multiplication',
  description: 'Relate multiplying binomials to multiplying two-digit numbers.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-1',
  gen(rng, d) {
    const p = rng.int(1, 4);
    const q = rng.int(1, 9);
    const r = rng.int(1, 4);
    const s = rng.int(1, 9);
    const A = 10 * p + q;
    const B = 10 * r + s;
    if (d === 1) {
      return {
        prompt: `$${A} \\times ${B} = (${10 * p} + ${q})(${10 * r} + ${s}) = ${100 * p * r} + ${10 * p * s} + ${10 * q * r} + \\square$. What number goes in the box?`,
        parts: [numPart(q * s, { exact: false })],
        hints: ['The four partial products come from multiplying each part of the first number by each part of the second.'],
        solution: [`The last partial product is $${q} \\times ${s} = ${q * s}$.`, `Check: $${100 * p * r} + ${10 * p * s} + ${10 * q * r} + ${q * s} = ${A * B}$.`],
      };
    }
    const prod = polyMul(lin(p, 'x', q), lin(r, 'x', s));
    return {
      prompt: `$${binTex(p, 'x', q)}${binTex(r, 'x', s)} = ${polyLatex(prod)}$. Substitute $x = 10$ to calculate $${A} \\times ${B}$.`,
      parts: [numPart(A * B, { exact: false })],
      hints: [`When $x = 10$, $${binTex(p, 'x', q)} = ${A}$ and $${binTex(r, 'x', s)} = ${B}$.`, `Evaluate $${polyLatex(prod)}$ at $x = 10$.`],
      solution: [`$${polyLatex(prod).replace(/x\^\{2\}/g, '(10)^2').replace(/x/g, '(10)')}$`, `$= ${A * B}$`],
    };
  },
});

const multiplyBinomials = skill({
  id: 'a4-multiply-binomials',
  name: 'Multiplying binomials',
  description: 'Multiply two binomials symbolically and combine like terms.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-1',
  gen(rng, d) {
    const v = pv(rng);
    const w = d === 3 && rng.chance(0.6) ? rng.pick(['y', 'b', 'n'].filter((z) => z !== v)) : '';
    const a = d === 1 ? 1 : nz(rng, -4, 5);
    const c = d === 1 ? 1 : nz(rng, -4, 5);
    const b = nz(rng, -9, 9);
    const dd = nz(rng, -9, 9);
    const square = d >= 2 && rng.chance(0.25);
    const [c2, d2] = square ? [a, b] : [c, dd];
    const prod = polyMul(lin(a, v, b, w), lin(c2, v, d2, w));
    const lhs = square ? `${binTex(a, v, b, w)}^2` : `${binTex(a, v, b, w)}${binTex(c2, v, d2, w)}`;
    return {
      prompt: `Expand and simplify: $${lhs}$`,
      parts: [part({ kind: 'expression', expected: polyText(prod, [v, w].filter(Boolean)), form: 'expanded' }, { placeholder: 'e.g. 6x^2-x-15' })],
      hints: [square ? `$${binTex(a, v, b, w)}^2 = ${binTex(a, v, b, w)}${binTex(a, v, b, w)}$ — there is a middle term!` : 'Multiply each term of the first binomial by each term of the second.', 'Watch the signs, then combine like terms.'],
      solution: expandSteps(a, b, c2, d2, v, w),
      answerDisplay: `$${polyLatex(prod, [v, w].filter(Boolean))}$`,
    };
  },
});

function randPoly(rng: Rng, v: string, terms: number, maxDeg: number, w = ''): Poly {
  // Produces a polynomial with `terms` terms of descending degree.
  const p: Poly = new Map();
  const degs = rng.sample(Array.from({ length: maxDeg + 1 }, (_, i) => i), terms).sort((x, y) => y - x);
  for (const dg of degs) {
    const key = w ? (dg === 0 ? `${w}^${maxDeg}` : dg === maxDeg ? (maxDeg === 1 ? v : `${v}^${dg}`) : `${v}${dg > 1 ? `^${dg}` : ''}*${w}${maxDeg - dg > 1 ? `^${maxDeg - dg}` : ''}`) : dg === 0 ? '' : dg === 1 ? v : `${v}^${dg}`;
    p.set(key, nz(rng, -6, 6));
  }
  return p;
}

const multiplyPolynomials = skill({
  id: 'a4-multiply-polynomials',
  name: 'Multiplying polynomials',
  description: 'Multiply binomials by trinomials and trinomials by trinomials, combining like terms.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-2',
  gen(rng, d) {
    const v = pv(rng);
    const A = d === 1 ? lin(1, v, nz(rng, -6, 6)) : lin(nz(rng, -3, 4), v, nz(rng, -6, 6));
    const B = d === 3 ? randPoly(rng, v, 3, 2) : (() => {
      const p: Poly = new Map();
      p.set(`${v}^2`, d === 1 ? 1 : nz(rng, -3, 4));
      p.set(v, nz(rng, -6, 6));
      p.set('', nz(rng, -9, 9));
      return p;
    })();
    const left = d === 3 ? (() => {
      const p: Poly = new Map();
      p.set(`${v}^2`, nz(rng, -2, 3));
      p.set(v, nz(rng, -4, 4));
      p.set('', nz(rng, -5, 5));
      return p;
    })() : A;
    const prod = polyMul(left, B);
    return {
      prompt: `Expand and simplify: $(${polyLatex(left, [v])})(${polyLatex(B, [v])})$`,
      parts: [part({ kind: 'expression', expected: polyText(prod, [v]), form: 'expanded' })],
      hints: ['Multiply every term in the first polynomial by every term in the second.', `There should be ${left.size * B.size} products before you combine like terms.`, 'Organize your work in a table (area model) to avoid missing terms.'],
      solution: [`Distribute each term of $(${polyLatex(left, [v])})$ across $(${polyLatex(B, [v])})$.`, `Combine like terms: $${polyLatex(prod, [v])}$`],
      answerDisplay: `$${polyLatex(prod, [v])}$`,
    };
  },
});

const simplifyProducts = skill({
  id: 'a4-simplify-products',
  name: 'Simplifying expressions with products',
  description: 'Expand and simplify sums and differences of polynomial products.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-2',
  gen(rng, d) {
    const v = pv(rng);
    if (d === 3 && rng.chance(0.5)) {
      const r = [nz(rng, -5, 5), nz(rng, -5, 5), nz(rng, -5, 5)];
      const prod = polyMul(polyMul(lin(1, v, r[0]), lin(1, v, r[1])), lin(1, v, r[2]));
      return {
        prompt: `Expand and simplify: $${binTex(1, v, r[0])}${binTex(1, v, r[1])}${binTex(1, v, r[2])}$`,
        parts: [part({ kind: 'expression', expected: polyText(prod, [v]), form: 'expanded' })],
        hints: ['Multiply two of the binomials first, then multiply the result by the third.'],
        solution: [`$${binTex(1, v, r[0])}${binTex(1, v, r[1])} = ${polyLatex(polyMul(lin(1, v, r[0]), lin(1, v, r[1])), [v])}$`, `Multiply by $${binTex(1, v, r[2])}$: $${polyLatex(prod, [v])}$`],
        answerDisplay: `$${polyLatex(prod, [v])}$`,
      };
    }
    let k = 1;
    let p1 = [1, 1];
    let p2 = [1, 1];
    let op: '+' | '-' = '+';
    let sq = false;
    let firstP: Poly = new Map();
    let secondP: Poly = new Map();
    let result: Poly = new Map();
    for (let i = 0; i < 50; i++) {
      k = d === 1 ? 1 : nz(rng, -3, 3);
      p1 = [nz(rng, -6, 6), nz(rng, -6, 6)];
      p2 = [nz(rng, -6, 6), nz(rng, -6, 6)];
      op = rng.pick(['+', '-'] as const);
      sq = d >= 2 && rng.chance(0.5);
      firstP = polyMul(polyConst(k), polyMul(lin(1, v, p1[0]), lin(1, v, p1[1])));
      secondP = sq ? polyMul(lin(1, v, p2[0]), lin(1, v, p2[0])) : polyMul(lin(1, v, p2[0]), lin(1, v, p2[1]));
      result = polyAdd(firstP, secondP, op === '+' ? 1 : -1);
      if (result.size >= 2) break;
    }
    const tex = `${k === 1 ? '' : k === -1 ? '-' : k}${binTex(1, v, p1[0])}${binTex(1, v, p1[1])} ${op} ${sq ? `${binTex(1, v, p2[0])}^2` : `${binTex(1, v, p2[0])}${binTex(1, v, p2[1])}`}`;
    return {
      prompt: `Expand and simplify: $${tex}$`,
      parts: [part({ kind: 'expression', expected: polyText(result, [v]), form: 'expanded' })],
      hints: ['Expand each product separately first.', op === '-' ? 'Put the second product in brackets before subtracting, so every sign changes.' : 'Then combine like terms.'],
      solution: [`First product: $${polyLatex(firstP, [v])}$`, `Second product: $${polyLatex(secondP, [v])}$`, `${op === '-' ? 'Subtract' : 'Add'}: $${polyLatex(result, [v])}$`],
      answerDisplay: `$${polyLatex(result, [v])}$`,
    };
  },
});

const verifySubstitution = skill({
  id: 'a4-verify-substitution',
  name: 'Verifying products by substitution',
  description: 'Verify a polynomial product by substituting a value for the variable.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-2',
  gen(rng) {
    const a = nz(rng, -3, 3);
    const b = nz(rng, -6, 6);
    const c = rng.int(1, 3);
    const dd = nz(rng, -6, 6);
    const prod = polyMul(lin(a, 'x', b), lin(c, 'x', dd));
    const correct = rng.chance(0.5);
    const claimed = correct ? prod : polyAdd(prod, lin(rng.pick([2, -2, 1]), 'x', 0));
    const x = rng.pick([2, 3, -1, -2]);
    const L = (a * x + b) * (c * x + dd);
    const R = (claimed.get('x^2') ?? 0) * x * x + (claimed.get('x') ?? 0) * x + (claimed.get('') ?? 0);
    return {
      prompt: `A student claims that $${binTex(a, 'x', b)}${binTex(c, 'x', dd)} = ${polyLatex(claimed)}$. Substitute $x = ${x}$ into both sides to test the claim.`,
      parts: [numPart(L, { label: 'Left side =', exact: false }), numPart(R, { label: 'Right side =', exact: false }), { label: 'Is the student correct?', answer: fixedChoice(['Yes', 'No'], L === R ? 0 : 1) }],
      hints: ['Replace every $x$ with the value in brackets, then use the order of operations.', 'If the two sides are different, the product is wrong. (If they are equal, it is very likely correct.)'],
      solution: [`Left: $(${a}(${x}) ${b < 0 ? '-' : '+'} ${Math.abs(b)})(${c}(${x}) ${dd < 0 ? '-' : '+'} ${Math.abs(dd)}) = ${L}$`, `Right: $${R}$`, L === R ? 'The values match, so the product checks out.' : 'The values differ, so the student made an error.'],
    };
  },
});

const multiplyError = skill({
  id: 'a4-error-analysis',
  name: 'Errors in polynomial multiplication',
  description: 'Identify and explain errors in a polynomial multiplication.',
  outcomes: ['A4'],
  lessonId: 'm10c-4-2',
  format: 'mc',
  gen(rng) {
    const p = rng.int(2, 7);
    const q = rng.int(2, 6);
    const k = rng.int(2, 5);
    const cases = [
      { work: `$(x + ${p})^2 = x^2 + ${p * p}$`, err: `The middle term $${2 * p}x$ is missing: $(x + ${p})^2 = (x + ${p})(x + ${p})$.` },
      { work: `$(x - ${p})(x + ${q}) = x^2 + ${q - p}x + ${p * q}$`, err: `The constant term should be $-${p * q}$ because $(-${p})(${q})$ is negative.` },
      { work: `$${k}(x + ${p})(x - ${q}) = (${k}x + ${k * p})(${k}x - ${k * q})$`, err: `The ${k} was multiplied into both binomials; it should multiply only one of them (or the final product).` },
      { work: `$x(x^2 - ${p}x + ${q}) = x^3 - ${p}x + ${q}$`, err: 'The $x$ was not distributed to every term in the brackets.' },
      { work: `$(2x + ${p})(x - ${q}) = 2x^2 - ${2 * q}x + ${p}x - ${p * q} = 2x^2 - ${2 * q + p}x - ${p * q}$`, err: `Combining like terms is wrong: $-${2 * q}x + ${p}x = ${p - 2 * q}x$.` },
    ];
    const c = rng.pick(cases);
    return {
      prompt: `Identify the error in this work:\n\n${c.work}`,
      parts: [{ answer: mc(rng, c.err, rng.sample(cases.filter((x) => x !== c).map((x) => x.err), 3)) }],
      hints: ['Redo the multiplication yourself and compare with each step.'],
      solution: [c.err],
    };
  },
});

// ---------------------------------------------------------------------------
// A5 — factoring
// ---------------------------------------------------------------------------

function monoTex(c: number, vars: Record<string, number>): string {
  const body = Object.keys(vars)
    .sort()
    .filter((v) => vars[v])
    .map((v) => (vars[v] === 1 ? v : `${v}^{${vars[v]}}`))
    .join('');
  if (!body) return `${c}`;
  return `${c === 1 ? '' : c === -1 ? '-' : c}${body}`;
}
function monoText(c: number, vars: Record<string, number>): string {
  const body = Object.keys(vars)
    .sort()
    .filter((v) => vars[v])
    .map((v) => (vars[v] === 1 ? v : `${v}^${vars[v]}`))
    .join('');
  if (!body) return `${c}`;
  return `${c === 1 ? '' : c === -1 ? '-' : c}${body}`;
}

const gcfFactor = skill({
  id: 'a5-gcf-factor',
  name: 'Factoring out the GCF',
  description: 'Determine the common factor of a polynomial’s terms and write it in factored form.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-3',
  gen(rng, d) {
    const v = pv(rng);
    const w = d >= 2 ? rng.pick(['y', 'b', 'n'].filter((z) => z !== v)) : '';
    const g = byDifficulty(d, rng.pick([2, 3, 4, 5, 6]), rng.pick([2, 3, 4, 6, 8, 9]), rng.pick([3, 4, 5, 6, 8, 12]));
    const gv: Record<string, number> = { [v]: rng.int(d === 1 ? 0 : 1, 2) };
    if (w) gv[w] = rng.int(1, 2);
    const sign = d === 3 && rng.chance(0.5) ? -1 : 1;
    // inner polynomial with primitive coefficients and no common variable
    let inner: Poly;
    for (;;) {
      inner = new Map();
      const n = d === 1 ? 2 : 3;
      const keys = w ? [`${v}^2`, `${v}*${w}`, `${w}^2`, v, w].slice(0, 5) : [`${v}^3`, `${v}^2`, v, ''];
      for (const key of rng.sample(keys, n)) inner.set(key, nz(rng, -7, 7));
      const coeffs = [...inner.values()];
      const hasConstLike = [...inner.keys()].some((k) => {
        const vars = k.split('*').filter(Boolean).map((x) => x.split('^')[0]);
        return !vars.includes(v);
      });
      const hasNoW = !w || [...inner.keys()].some((k) => !k.includes(w));
      if (gcdAll(coeffs) === 1 && hasConstLike && hasNoW && (!w || [...inner.keys()].some((k) => !k.split('*').some((x) => x.split('^')[0] === v)))) {
        if (sign === -1) {
          const lead = [...inner.entries()][0];
          if (lead[1] > 0) for (const [k, c] of inner) inner.set(k, -c);
        }
        break;
      }
    }
    const G: Poly = new Map([[Object.keys(gv).filter((x) => gv[x]).sort().map((x) => (gv[x] === 1 ? x : `${x}^${gv[x]}`)).join('*'), sign * g]]);
    const full = polyMul(G, inner);
    const order = [v, w].filter(Boolean);
    const innerShown = sign === -1 ? polyMul(polyConst(-1), inner) : inner;
    const gText = monoText(sign * g, gv);
    const gTex = monoTex(sign * g, gv);
    return {
      prompt: `Factor completely by removing the greatest common factor: $${polyLatex(full, order)}$`,
      parts: [part({ kind: 'expression', expected: `${gText}(${polyText(innerShown, order)})`, form: 'gcf' }, { placeholder: 'e.g. 3x(2x - 5)' })],
      hints: ['Find the GCF of the coefficients, then the lowest power of each variable that appears in every term.', 'Divide each term by the GCF to find what goes inside the brackets.', ...(sign === -1 ? ['When the first term is negative, it is common to factor out a negative GCF.'] : [])],
      solution: [`GCF: $${gTex}$`, `$${polyLatex(full, order)} = ${gTex}(${polyLatex(innerShown, order)})$`, 'Check by multiplying the factored form back out.'],
      answerDisplay: `$${gTex}(${polyLatex(innerShown, order)})$`,
    };
  },
});

function trinomialFrom(m: number, p: number, n: number, q: number, v: string, w = ''): Poly {
  return polyMul(lin(m, v, p, w), lin(n, v, q, w));
}

const simpleTrinomial = skill({
  id: 'a5-factor-simple-trinomial',
  name: 'Factoring x² + bx + c',
  description: 'Factor trinomials of the form x² + bx + c, removing a common factor first if needed.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-4',
  gen(rng, d) {
    const v = pv(rng);
    const w = d === 3 && rng.chance(0.4) ? rng.pick(['y', 'b'].filter((z) => z !== v)) : '';
    const p = d === 1 ? rng.int(1, 9) : nz(rng, -10, 10);
    let q = d === 1 ? rng.int(1, 9) : nz(rng, -10, 10);
    if (q === -p) q = p + 1 || 2;
    const k = d === 3 && !w ? rng.pick([2, 3, -1, 4, 5]) : 1;
    const tri = trinomialFrom(1, p, 1, q, v, w);
    const full = polyMul(polyConst(k), tri);
    const order = [v, w].filter(Boolean);
    const kTex = k === 1 ? '' : k === -1 ? '-' : `${k}`;
    const expected = `${kTex}${binText(1, v, p, w)}${binText(1, v, q, w)}`;
    return {
      prompt: `Factor completely: $${polyLatex(full, order)}$`,
      parts: [part({ kind: 'expression', expected, form: 'factored' }, { placeholder: 'e.g. (x+2)(x-5)' })],
      hints: [
        ...(k !== 1 ? [`First factor out the common factor $${k}$.`] : []),
        `Find two integers whose product is $${p * q}$ and whose sum is $${p + q}$.`,
        `Write the factors as $(${v} + \\square${w})(${v} + \\square${w})$ and check by multiplying.`,
      ],
      solution: [
        ...(k !== 1 ? [`$${polyLatex(full, order)} = ${kTex}(${polyLatex(tri, order)})$`] : []),
        `Integers with product $${p * q}$ and sum $${p + q}$: $${p}$ and $${q}$.`,
        `$${polyLatex(full, order)} = ${kTex}${binTex(1, v, p, w)}${binTex(1, v, q, w)}$`,
      ],
      answerDisplay: `$${kTex}${binTex(1, v, p, w)}${binTex(1, v, q, w)}$`,
    };
  },
});

function primitivePair(rng: Rng, maxLead: number): [number, number] {
  for (;;) {
    const m = rng.int(1, maxLead);
    const p = nz(rng, -9, 9);
    if (gcd(m, p) === 1) return [m, p];
  }
}

const trinomialA = skill({
  id: 'a5-factor-trinomial-a',
  name: 'Factoring ax² + bx + c',
  description: 'Factor trinomials with a leading coefficient other than 1 by decomposition.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-5',
  gen(rng, d) {
    const v = pv(rng);
    const w = d === 3 && rng.chance(0.4) ? rng.pick(['y', 'b'].filter((z) => z !== v)) : '';
    let m = 1;
    let p = 1;
    let n = 1;
    let q = 1;
    for (let i = 0; i < 100; i++) {
      [m, p] = primitivePair(rng, d === 1 ? 3 : 6);
      [n, q] = primitivePair(rng, d === 1 ? 3 : 5);
      if (m * n > 1 && m * q + n * p !== 0 && !(m === n && p === q)) break;
    }
    const k = d === 3 && !w && rng.chance(0.5) ? rng.pick([2, 3, -2]) : 1;
    const tri = trinomialFrom(m, p, n, q, v, w);
    const full = polyMul(polyConst(k), tri);
    const order = [v, w].filter(Boolean);
    const a = m * n;
    const b = m * q + n * p;
    const c = p * q;
    const kTex = k === 1 ? '' : k === -1 ? '-' : `${k}`;
    const expected = `${kTex}${binText(m, v, p, w)}${binText(n, v, q, w)}`;
    return {
      prompt: `Factor completely: $${polyLatex(full, order)}$`,
      parts: [part({ kind: 'expression', expected, form: 'factored' }, { placeholder: 'e.g. (2x+3)(3x-1)' })],
      hints: [
        ...(k !== 1 ? [`Factor out $${k}$ first.`] : []),
        `Decomposition: find two integers with product $a \\cdot c = ${a} \\times ${c} = ${a * c}$ and sum $b = ${b}$.`,
        'Split the middle term using those integers, then factor by grouping.',
      ],
      solution: [
        ...(k !== 1 ? [`$${polyLatex(full, order)} = ${kTex}(${polyLatex(tri, order)})$`] : []),
        `$ac = ${a * c}$; integers with product $${a * c}$ and sum $${b}$: $${m * q}$ and $${n * p}$.`,
        `$${polyLatex(tri, order)} = ${a}${v}^2 ${m * q < 0 ? '-' : '+'} ${Math.abs(m * q)}${v}${w} ${n * p < 0 ? '-' : '+'} ${Math.abs(n * p)}${v}${w} ${c < 0 ? '-' : '+'} ${Math.abs(c)}${w ? `${w}^2` : ''}$`,
        `Group and factor: $${binTex(m, v, p, w)}${binTex(n, v, q, w)}$`,
        ...(k !== 1 ? [`Answer: $${kTex}${binTex(m, v, p, w)}${binTex(n, v, q, w)}$`] : []),
      ],
      answerDisplay: `$${kTex}${binTex(m, v, p, w)}${binTex(n, v, q, w)}$`,
    };
  },
});

const differenceSquares = skill({
  id: 'a5-difference-squares',
  name: 'Difference of squares',
  description: 'Factor a difference of squares, including after removing a common factor.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-6',
  gen(rng, d) {
    const v = pv(rng);
    if (d === 3 && rng.chance(0.5)) {
      const s = rng.pick([1, 2, 3]);
      const t = rng.pick([1, 2, 3].filter((z) => z !== s || s === 1));
      const full: Poly = new Map([[`${v}^4`, s ** 4], ['', -(t ** 4)]]);
      const expected = `(${s === 1 ? '' : s * s}${v}^2+${t * t})${binText(s, v, -t)}${binText(s, v, t)}`;
      return {
        prompt: `Factor completely: $${polyLatex(full, [v])}$`,
        parts: [part({ kind: 'expression', expected, form: 'factored' })],
        hints: ['This is a difference of squares: $(\\square)^2 - (\\square)^2$.', 'One of the factors is another difference of squares. Factor it again.', 'A sum of squares such as $x^2 + 4$ cannot be factored over the integers.'],
        solution: [`$${polyLatex(full, [v])} = (${s * s === 1 ? '' : s * s}${v}^2 - ${t * t})(${s * s === 1 ? '' : s * s}${v}^2 + ${t * t})$`, `$= ${binTex(s, v, -t)}${binTex(s, v, t)}(${s * s === 1 ? '' : s * s}${v}^2 + ${t * t})$`],
        answerDisplay: `$${binTex(s, v, -t)}${binTex(s, v, t)}(${s * s === 1 ? '' : s * s}${v}^2 + ${t * t})$`,
      };
    }
    const w = d >= 2 && rng.chance(0.5) ? rng.pick(['y', 'b'].filter((z) => z !== v)) : '';
    const a = d === 1 ? 1 : rng.int(1, 7);
    let b = rng.int(1, 12);
    if (gcd(a, b) !== 1) b = 1;
    const k = d === 3 ? rng.pick([2, 3, 5]) : 1;
    const full = polyMul(polyConst(k), polyMul(lin(a, v, -b, w), lin(a, v, b, w)));
    const order = [v, w].filter(Boolean);
    const expected = `${k === 1 ? '' : k}${binText(a, v, -b, w)}${binText(a, v, b, w)}`;
    return {
      prompt: `Factor completely: $${polyLatex(full, order)}$`,
      parts: [part({ kind: 'expression', expected, form: 'factored' })],
      hints: [...(k !== 1 ? [`Remove the common factor $${k}$ first.`] : []), '$A^2 - B^2 = (A - B)(A + B)$', `Here $A = ${a === 1 ? '' : a}${v}$ and $B = ${b === 1 && w ? '' : b}${w}$.`],
      solution: [
        ...(k !== 1 ? [`$${polyLatex(full, order)} = ${k}(${polyLatex(polyMul(lin(a, v, -b, w), lin(a, v, b, w)), order)})$`] : []),
        `$${polyLatex(polyMul(lin(a, v, -b, w), lin(a, v, b, w)), order)} = (${a === 1 ? '' : a}${v})^2 - (${b === 1 && w ? '' : b}${w})^2$`,
        `$= ${k === 1 ? '' : k}${binTex(a, v, -b, w)}${binTex(a, v, b, w)}$`,
        'A difference of squares is a trinomial $ax^2 + bx + c$ with $b = 0$: the middle terms cancel.',
      ],
      answerDisplay: `$${k === 1 ? '' : k}${binTex(a, v, -b, w)}${binTex(a, v, b, w)}$`,
    };
  },
});

const perfectSquare = skill({
  id: 'a5-perfect-square',
  name: 'Perfect square trinomials',
  description: 'Recognize and factor perfect square trinomials.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-6',
  gen(rng, d) {
    const v = pv(rng);
    const w = d === 3 && rng.chance(0.5) ? rng.pick(['y', 'b'].filter((z) => z !== v)) : '';
    const a = d === 1 ? 1 : rng.int(1, 5);
    let b = nz(rng, -9, 9);
    if (gcd(a, b) !== 1) b = b > 0 ? 1 : -1;
    const full = polyMul(lin(a, v, b, w), lin(a, v, b, w));
    const order = [v, w].filter(Boolean);
    if (d === 2 && rng.chance(0.3)) {
      const isPS = rng.chance(0.5);
      const shown = isPS ? full : polyAdd(full, lin(rng.pick([2, -2, 4]), v, 0));
      return {
        prompt: `Is $${polyLatex(shown, order)}$ a perfect square trinomial?`,
        parts: [{ answer: fixedChoice(['Yes', 'No'], isPS ? 0 : 1) }],
        hints: ['Check: is the first term a perfect square? Is the last term a perfect square?', 'Is the middle term equal to $2 \\times \\sqrt{\\text{first}} \\times \\sqrt{\\text{last}}$ (with the right sign)?'],
        solution: [`$\\sqrt{${a * a}${v}^2} = ${a === 1 ? '' : a}${v}$ and $\\sqrt{${b * b}} = ${Math.abs(b)}$; $2(${a === 1 ? '' : a}${v})(${Math.abs(b)}) = ${2 * a * Math.abs(b)}${v}$.`, isPS ? `The middle term matches, so it is $${binTex(a, v, b, w)}^2$.` : 'The middle term does not match, so it is not a perfect square trinomial.'],
      };
    }
    const expected = `${binText(a, v, b, w)}^2`;
    return {
      prompt: `Factor: $${polyLatex(full, order)}$`,
      parts: [part({ kind: 'expression', expected, form: 'factored' })],
      hints: ['The first and last terms are perfect squares.', '$A^2 + 2AB + B^2 = (A + B)^2$ and $A^2 - 2AB + B^2 = (A - B)^2$.'],
      solution: [`$A = ${a === 1 ? '' : a}${v}$, $B = ${Math.abs(b) === 1 && w ? '' : Math.abs(b)}${w}$, and the middle term is $${b < 0 ? '-' : ''}2AB$.`, `$${polyLatex(full, order)} = ${binTex(a, v, b, w)}^2$`],
      answerDisplay: `$${binTex(a, v, b, w)}^2$`,
    };
  },
});

const factorMixed = skill({
  id: 'a5-factor-mixed',
  name: 'Factoring completely (mixed)',
  description: 'Choose an appropriate strategy and factor any polynomial in this unit completely.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-6',
  gen(rng, d) {
    const pickFrom = byDifficulty(d, [gcfFactor, simpleTrinomial, differenceSquares], [simpleTrinomial, trinomialA, differenceSquares, perfectSquare, gcfFactor], [trinomialA, differenceSquares, simpleTrinomial, perfectSquare]);
    const usable = (it: ReturnType<SkillDef['generate']>) => {
      const a = it.parts[0].answer;
      return a.kind === 'expression' && gradePart({ ...a, form: 'factored' }, a.expected).correct;
    };
    let item = rng.pick(pickFrom).generate(rng.int(1, 1_000_000), d);
    for (let i = 0; i < 40 && !usable(item); i++) item = rng.pick(pickFrom).generate(rng.int(1, 1_000_000), d);
    const prompt = item.prompt.replace(/^Factor(?: completely)?(?: by removing the greatest common factor)?:/, 'Factor completely:').replace(/^Is .*/, item.prompt);
    return {
      prompt,
      figure: item.figure,
      parts: item.parts.map((p) => (p.answer.kind === 'expression' ? { ...p, answer: { ...p.answer, form: 'factored' as const } } : p)),
      hints: ['Always look for a common factor first.', 'Then ask: two terms (difference of squares?) or three terms (perfect square, x² + bx + c, or ax² + bx + c)?', ...item.hints],
      solution: item.solution,
      answerDisplay: item.answerDisplay,
    };
  },
});

const factorError = skill({
  id: 'a5-error-analysis',
  name: 'Errors in factoring',
  description: 'Identify and explain errors in a polynomial factorization.',
  outcomes: ['A5'],
  lessonId: 'm10c-4-6',
  format: 'mc',
  gen(rng) {
    const p = rng.int(2, 8);
    const q = p + rng.int(1, 4);
    const s = rng.int(2, 6);
    const cases = [
      { work: `$x^2 - ${q - p}x - ${p * q}$ — a student wrote $(x - ${q})(x - ${p})$`, err: `The constant term is negative, so the two integers must have opposite signs.` },
      { work: `$2x^2 + ${2 * (p + q)}x + ${2 * p * q} = (2x + ${2 * p})(x + ${q})$`, err: `It is not factored completely: $2x + ${2 * p}$ still has a common factor of 2.` },
      { work: `$x^2 + ${s * s} = (x + ${s})(x - ${s})$`, err: `$x^2 + ${s * s}$ is a sum of squares, which cannot be factored over the integers; $(x + ${s})(x - ${s}) = x^2 - ${s * s}$.` },
      { work: `$x^2 - ${s * s} = (x - ${s})^2$`, err: `$(x - ${s})^2 = x^2 - ${2 * s}x + ${s * s}$. A difference of squares factors as $(x - ${s})(x + ${s})$.` },
      { work: `$${s}x^2 + ${s * p}x = ${s}x(x + ${p})$, so the GCF is $${s}$.`, err: `The factored form is correct, but the GCF is $${s}x$, not $${s}$.` },
    ];
    const c = rng.pick(cases);
    return {
      prompt: `Identify the error:\n\n${c.work}`,
      parts: [{ answer: mc(rng, c.err, rng.sample(cases.filter((x) => x !== c).map((x) => x.err), 3)) }],
      hints: ['Multiply the student’s factors back out and compare with the original polynomial.'],
      solution: [c.err],
    };
  },
});

export const POLYNOMIAL_SKILLS: SkillDef[] = [
  areaModel,
  twoDigit,
  multiplyBinomials,
  multiplyPolynomials,
  simplifyProducts,
  verifySubstitution,
  multiplyError,
  gcfFactor,
  simpleTrinomial,
  trinomialA,
  differenceSquares,
  perfectSquare,
  factorMixed,
  factorError,
];
