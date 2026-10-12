/** Math 6 Unit 6 — Expressions and Equations (A1). */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Talia', 'Yusuf', 'Rosalie', 'Nathan', 'Tanis',
];
/** Letters used for variables (no e, i, l or o, which look like numbers or constants). */
const LETTERS = ['x', 'n', 'a', 'm', 'k', 'p', 't', 'y', 'b', 'w', 'c', 'r', 'g', 'd'];

const T = '\\times';
const D = '\\div';
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const pickName = (rng: Rng, not: string[] = []) => rng.pick(NAMES.filter((n) => !not.includes(n)));
/** a times v: 3n, or n when a = 1. */
const term = (a: number, v: string) => (a === 1 ? v : `${a}${v}`);
/** A power in LaTeX: 3^{2}. */
const pw = (b: number | string, e: number) => `${b}^{${e}}`;
/** Whole-dollar amount for Markdown text (outside maths). */
const dollars = (x: number) => `\\$${x}`;

/** An expression answer that must have like terms collected. */
const exprPart = (expected: string, label?: string): Part => ({ label, answer: { kind: 'expression', expected, form: 'expanded' } });
/** "ax + b" in the syntax students type. */
const plain = (a: number, v: string, b: number) => (b === 0 ? term(a, v) : `${term(a, v)} + ${b}`);

// ---------------------------------------------------------------------------
// 6.1 Order of operations with powers
// ---------------------------------------------------------------------------

type Ex = { tex: string; steps: string[]; value: number };

const ORDER_HINT = 'Order of operations: work inside **parentheses** first, then **powers**, then $\\times$ and $\\div$ from left to right, then $+$ and $-$ from left to right.';

/** A base and exponent with a small value: squares up to 10², cubes up to 5³, and 2⁴ or 2⁵. */
function power(rng: Rng, maxSquare = 10): [number, number] {
  const e = rng.weighted([[2, 0.65], [3, 0.3], [4, 0.05]] as const);
  if (e === 2) return [rng.int(2, maxSquare), 2];
  if (e === 3) return [rng.int(2, 5), 3];
  return [2, 4];
}

function opsD1(rng: Rng): Ex {
  const t = rng.int(0, 5);
  if (t === 0) {
    const [b, e] = power(rng);
    const a = rng.int(1, 20);
    const P = b ** e;
    const add = rng.chance(0.5);
    return add
      ? { tex: `${a} + ${pw(b, e)}`, steps: [`Powers first: $${pw(b, e)} = ${P}$.`, `Then add: $${a} + ${P} = ${a + P}$.`], value: a + P }
      : { tex: `${pw(b, e)} + ${a}`, steps: [`Powers first: $${pw(b, e)} = ${P}$.`, `Then add: $${P} + ${a} = ${P + a}$.`], value: P + a };
  }
  if (t === 1) {
    const s = rng.int(3, 10);
    const a = rng.int(1, s - 1);
    const b = s - a;
    return { tex: `(${a} + ${b})^{2}`, steps: [`Parentheses first: $${a} + ${b} = ${s}$.`, `Then the power: $${pw(s, 2)} = ${s * s}$.`], value: s * s };
  }
  if (t === 2) {
    const b = rng.int(2, 6);
    const c = rng.int(2, 5);
    return { tex: `${c} ${T} ${pw(b, 2)}`, steps: [`Powers first: $${pw(b, 2)} = ${b * b}$.`, `Then multiply: $${c} ${T} ${b * b} = ${c * b * b}$.`], value: c * b * b };
  }
  if (t === 3) {
    const [b, e] = power(rng);
    const P = b ** e;
    const a = rng.int(1, P - 1);
    return { tex: `${pw(b, e)} - ${a}`, steps: [`Powers first: $${pw(b, e)} = ${P}$.`, `Then subtract: $${P} - ${a} = ${P - a}$.`], value: P - a };
  }
  if (t === 4) {
    const [a, b, c] = [rng.int(1, 9), rng.int(1, 9), rng.int(2, 6)];
    return { tex: `(${a} + ${b}) ${T} ${c}`, steps: [`Parentheses first: $${a} + ${b} = ${a + b}$.`, `Then multiply: $${a + b} ${T} ${c} = ${(a + b) * c}$.`], value: (a + b) * c };
  }
  const a = rng.int(5, 12);
  const b = rng.int(1, a - 2);
  const s = a - b;
  const e = s <= 4 && rng.chance(0.4) ? 3 : 2;
  return { tex: `(${a} - ${b})^{${e}}`, steps: [`Parentheses first: $${a} - ${b} = ${s}$.`, `Then the power: $${pw(s, e)} = ${s ** e}$.`], value: s ** e };
}

function opsD2(rng: Rng): Ex {
  const t = rng.int(0, 6);
  if (t === 0) {
    const [b, c, a] = [rng.int(2, 5), rng.int(2, 4), rng.int(1, 20)];
    const P = b * b;
    return { tex: `${a} + ${pw(b, 2)} ${T} ${c}`, steps: [`Powers first: $${pw(b, 2)} = ${P}$. Now it is $${a} + ${P} ${T} ${c}$.`, `Multiply next: $${P} ${T} ${c} = ${P * c}$.`, `Then add: $${a} + ${P * c} = ${a + P * c}$.`], value: a + P * c };
  }
  if (t === 1) {
    return retry(
      () => {
        const s = rng.int(4, 10);
        const a = rng.int(1, s - 1);
        const [c, d] = [rng.int(2, 9), rng.int(2, 9)];
        const v = s * s - c * d;
        return { tex: `(${a} + ${s - a})^{2} - ${c} ${T} ${d}`, steps: [`Parentheses first: $${a} + ${s - a} = ${s}$. Now it is $${pw(s, 2)} - ${c} ${T} ${d}$.`, `Power next: $${pw(s, 2)} = ${s * s}$.`, `Multiply: $${c} ${T} ${d} = ${c * d}$.`, `Then subtract: $${s * s} - ${c * d} = ${v}$.`], value: v };
      },
      (x) => x.value > 0,
    );
  }
  if (t === 2) {
    const b = rng.pick([4, 6, 8, 9, 10, 12]);
    const c = rng.pick([2, 3, 4, 5, 6].filter((x) => (b * b) % x === 0 && x !== b));
    const d = rng.int(1, 15);
    const P = b * b;
    return { tex: `${pw(b, 2)} ${D} ${c} + ${d}`, steps: [`Powers first: $${pw(b, 2)} = ${P}$. Now it is $${P} ${D} ${c} + ${d}$.`, `Divide next: $${P} ${D} ${c} = ${P / c}$.`, `Then add: $${P / c} + ${d} = ${P / c + d}$.`], value: P / c + d };
  }
  if (t === 3) {
    const c = rng.int(2, 4);
    const s = rng.int(2, 6);
    const a = rng.int(1, s - 1);
    const v = c * s * s;
    return { tex: `${c} ${T} (${a} + ${s - a})^{2}`, steps: [`Parentheses first: $${a} + ${s - a} = ${s}$. Now it is $${c} ${T} ${pw(s, 2)}$.`, `Power next: $${pw(s, 2)} = ${s * s}$.`, `Then multiply: $${c} ${T} ${s * s} = ${v}$.`], value: v };
  }
  if (t === 4) {
    const [a, b] = rng.sample([2, 3, 4, 5, 6, 7, 8], 2);
    return { tex: `${pw(a, 2)} + ${pw(b, 2)}`, steps: [`Powers first: $${pw(a, 2)} = ${a * a}$ and $${pw(b, 2)} = ${b * b}$.`, `Then add: $${a * a} + ${b * b} = ${a * a + b * b}$.`], value: a * a + b * b };
  }
  if (t === 5) {
    const [b, e] = rng.pick([[2, 3], [3, 3], [2, 4], [2, 5], [4, 3]] as Array<[number, number]>);
    const P = b ** e;
    const c = rng.int(2, 5);
    const a = rng.int(2, 9);
    return { tex: `${a} ${T} ${c} + ${pw(b, e)}`, steps: [`Powers first: $${pw(b, e)} = ${P}$. Now it is $${a} ${T} ${c} + ${P}$.`, `Multiply next: $${a} ${T} ${c} = ${a * c}$.`, `Then add: $${a * c} + ${P} = ${a * c + P}$.`], value: a * c + P };
  }
  return retry(
    () => {
      const s = rng.int(2, 5);
      const a = rng.int(1, s);
      const b = s + a;
      const c = rng.pick([2, 4].filter((x) => (s * s) % x === 0).concat(s * s % 3 === 0 ? [3] : []));
      const d = rng.int(s * s / c + 1, s * s / c + 30);
      const v = d - (s * s) / c;
      return { tex: `${d} - (${b} - ${a})^{2} ${D} ${c}`, steps: [`Parentheses first: $${b} - ${a} = ${s}$. Now it is $${d} - ${pw(s, 2)} ${D} ${c}$.`, `Power next: $${pw(s, 2)} = ${s * s}$.`, `Divide: $${s * s} ${D} ${c} = ${(s * s) / c}$.`, `Then subtract: $${d} - ${(s * s) / c} = ${v}$.`], value: v };
    },
    (x) => Number.isInteger(x.value) && x.value > 0,
  );
}

function opsD3Long(rng: Rng): Ex {
  const t = rng.int(0, 2);
  if (t === 0) {
    return retry(
      () => {
        const s = rng.int(3, 8);
        const a = rng.int(1, s - 1);
        const c = rng.pick([2, 3, 4].filter((x) => (s * s) % x === 0));
        const [d, e] = [rng.int(2, 6), rng.int(2, 5)];
        const q = (s * s) / c;
        const v = q - d * e;
        return { tex: `(${a} + ${s - a})^{2} ${D} ${c} - ${d} ${T} ${e}`, steps: [`Parentheses first: $${a} + ${s - a} = ${s}$.`, `Power next: $${pw(s, 2)} = ${s * s}$. Now it is $${s * s} ${D} ${c} - ${d} ${T} ${e}$.`, `Divide and multiply: $${s * s} ${D} ${c} = ${q}$ and $${d} ${T} ${e} = ${d * e}$.`, `Then subtract: $${q} - ${d * e} = ${v}$.`], value: v };
      },
      (x) => x.value > 0,
      100,
    );
  }
  if (t === 1) {
    const b = rng.int(3, 7);
    const c = rng.int(Math.ceil((b * b) / 2), b * b - 2);
    const a = rng.int(2, 4);
    const d = rng.int(1, 20);
    const inside = b * b - c;
    return { tex: `${a} ${T} (${pw(b, 2)} - ${c}) + ${d}`, steps: [`Inside the parentheses, the power comes first: $${pw(b, 2)} = ${b * b}$, then $${b * b} - ${c} = ${inside}$.`, `Now it is $${a} ${T} ${inside} + ${d}$. Multiply: $${a} ${T} ${inside} = ${a * inside}$.`, `Then add: $${a * inside} + ${d} = ${a * inside + d}$.`], value: a * inside + d };
  }
  const [b, e] = rng.pick([[2, 3], [3, 2], [2, 4], [4, 2], [5, 2], [3, 3]] as Array<[number, number]>);
  const P = b ** e;
  const a = rng.int(2, 6);
  const c = rng.int(2, 9);
  const d = rng.int(1, 9);
  const v = (P + c) * a - d;
  return { tex: `(${pw(b, e)} + ${c}) ${T} ${a} - ${d}`, steps: [`Inside the parentheses, the power comes first: $${pw(b, e)} = ${P}$, then $${P} + ${c} = ${P + c}$.`, `Now it is $${P + c} ${T} ${a} - ${d}$. Multiply: $${P + c} ${T} ${a} = ${(P + c) * a}$.`, `Then subtract: $${(P + c) * a} - ${d} = ${v}$.`], value: v };
}

function opsMistake(rng: Rng): Out {
  const name = pickName(rng);
  const kind = rng.pick(['times-exp', 'mult-first', 'add-first'] as const);
  if (kind === 'times-exp') {
    const b = rng.int(3, 9);
    const a = rng.intExcept(2, 12, [b]);
    const wrong = a + b * 2;
    const right = a + b * b;
    return {
      prompt: `${name} says $${a} + ${pw(b, 2)} = ${wrong}$. What mistake did ${name} make, and what is the correct value?`,
      parts: [
        { label: 'Mistake', answer: mc(rng, `${name} worked out $${pw(b, 2)}$ as $${b} ${T} 2$.`, [`${name} added $${a} + ${b}$ before working out the power.`, `There is no mistake. $${wrong}$ is correct.`, `${name} multiplied instead of adding.`]) },
        numPart(right, { exact: false, label: 'Correct value:' }),
      ],
      hints: [`$${pw(b, 2)}$ means $${b} ${T} ${b}$, not $${b} ${T} 2$.`, 'Work out the power, then add.'],
      solution: [`${name} wrote $${pw(b, 2)} = ${b * 2}$. But $${pw(b, 2)} = ${b} ${T} ${b} = ${b * b}$.`, `Correct: $${a} + ${b * b} = ${right}$.`, `The mistake was working out $${pw(b, 2)}$ as $${b} ${T} 2$. The correct value is $${right}$.`],
    };
  }
  if (kind === 'mult-first') {
    const b = rng.int(2, 5);
    const c = rng.int(2, 5);
    const wrong = (c * b) ** 2;
    const right = c * b * b;
    return {
      prompt: `${name} says $${c} ${T} ${pw(b, 2)} = ${wrong}$. What mistake did ${name} make, and what is the correct value?`,
      parts: [
        { label: 'Mistake', answer: mc(rng, `${name} multiplied $${c} ${T} ${b}$ before working out the power.`, [`${name} worked out $${pw(b, 2)}$ as $${b} ${T} 2$.`, `${name} added instead of multiplying.`, `There is no mistake. $${wrong}$ is correct.`]) },
        numPart(right, { exact: false, label: 'Correct value:' }),
      ],
      hints: ['Powers come before multiplication.', `Work out $${pw(b, 2)}$ first, then multiply by $${c}$.`],
      solution: [`${name} did $${c} ${T} ${b} = ${c * b}$ first, then $${pw(c * b, 2)} = ${wrong}$.`, `Powers come before multiplication: $${pw(b, 2)} = ${b * b}$, then $${c} ${T} ${b * b} = ${right}$.`, `The mistake was multiplying before working out the power. The correct value is $${right}$.`],
    };
  }
  const b = rng.int(2, 6);
  const a = rng.int(2, 6);
  const wrong = (a + b) ** 2;
  const right = a + b * b;
  return {
    prompt: `${name} says $${a} + ${pw(b, 2)} = ${wrong}$. What mistake did ${name} make, and what is the correct value?`,
    parts: [
      { label: 'Mistake', answer: mc(rng, `${name} added $${a} + ${b}$ before working out the power.`, [`${name} worked out $${pw(b, 2)}$ as $${b} ${T} 2$.`, `${name} multiplied instead of adding.`, `There is no mistake. $${wrong}$ is correct.`]) },
      numPart(right, { exact: false, label: 'Correct value:' }),
    ],
    hints: ['There are no parentheses, so the power comes before the addition.', `Work out $${pw(b, 2)}$ first.`],
    solution: [`${name} did $${a} + ${b} = ${a + b}$ first, then $${pw(a + b, 2)} = ${wrong}$.`, `The power comes first: $${pw(b, 2)} = ${b * b}$, then $${a} + ${b * b} = ${right}$.`, `To get $${wrong}$, the expression would need parentheses: $(${a} + ${b})^{2}$. The correct value is $${right}$.`],
  };
}

function opsParentheses(rng: Rng): Out {
  const { a, b, c, opts } = retry(
    () => {
      const a = rng.int(1, 6);
      const b = rng.int(2, 4);
      const c = rng.int(2, 4);
      const opts = [
        { tex: `${a} + ${b} ${T} ${pw(c, 2)}`, v: a + b * c * c },
        { tex: `(${a} + ${b}) ${T} ${pw(c, 2)}`, v: (a + b) * c * c },
        { tex: `${a} + (${b} ${T} ${c})^{2}`, v: a + (b * c) ** 2 },
        { tex: `(${a} + ${b} ${T} ${c})^{2}`, v: (a + b * c) ** 2 },
      ];
      return { a, b, c, opts };
    },
    (o) => new Set(o.opts.map((x) => x.v)).size === 4 && o.opts.every((x) => x.v <= 400),
  );
  const target = rng.pick(opts.slice(1));
  return {
    prompt: `Where should the parentheses go so that the expression has a value of $${target.v}$? The numbers are $${a}$, $${b}$ and $${c}$, as in $${a} + ${b} ${T} ${pw(c, 2)}$.`,
    parts: [{ answer: mc(rng, `$${target.tex}$`, opts.filter((x) => x !== target).map((x) => `$${x.tex}$`)) }],
    hints: ['Parentheses change the order of operations.', 'Work out the value of each choice. Parentheses first, then powers, then $\\times$, then $+$.'],
    solution: [
      ...opts.map((x) => `$${x.tex} = ${x.v}$`),
      `The expression with a value of $${target.v}$ is $${target.tex}$.`,
    ],
  };
}

const orderOfOperations = skill({
  id: 'm6-order-of-operations',
  name: 'Order of operations with powers',
  description: 'Evaluate numerical expressions with parentheses and powers using the conventional order of operations.',
  outcomes: ['A1'],
  lessonId: 'm6-6-1',
  calculator: false,
  gen(rng, d) {
    if (d === 3) {
      const k = rng.weighted([['long', 0.45], ['mistake', 0.3], ['paren', 0.25]] as const);
      if (k === 'mistake') return opsMistake(rng);
      if (k === 'paren') return opsParentheses(rng);
    }
    const e = d === 1 ? opsD1(rng) : d === 2 ? opsD2(rng) : opsD3Long(rng);
    return {
      prompt: `Evaluate $${e.tex}$.`,
      parts: [numPart(e.value, { exact: false })],
      hints: [ORDER_HINT, d === 1 ? 'Find the step that comes first. Is there a power or a pair of parentheses?' : 'Rewrite the expression after each step so you can see what is left.'],
      solution: [...e.steps, `$${e.tex} = ${e.value}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.2 Like terms and algebraic properties
// ---------------------------------------------------------------------------

/** Algebra tiles: long tiles stand for x, small squares for 1. Groups are drawn left to right. */
function tilesFig(groups: Array<{ x: number; one: number }>, caption: string): Figure {
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  const rect = (x0: number, y0: number, w: number, h: number, color: 'brand' | 'accent' | 'muted', fill = true) =>
    polylines.push({ points: [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0]], color, ...(fill ? { fill } : {}) });
  let x = 0.6;
  const H = 3.8;
  groups.forEach((g, i) => {
    const start = x - 0.3;
    for (let k = 0; k < g.x; k++) {
      rect(x, 0.5, 0.8, 2.8, 'brand');
      x += 1.1;
    }
    for (let k = 0; k < g.one; k++) {
      const col = Math.floor(k / 3);
      const row = k % 3;
      rect(x + col * 1.0, 0.5 + row * 1.0, 0.8, 0.8, 'accent');
    }
    x += Math.ceil(g.one / 3) * 1.0;
    if (groups.length > 1) rect(start, 0.2, Math.round((x - 0.2 - start) * 10) / 10, 3.4, 'muted', false);
    x += i < groups.length - 1 ? 0.9 : 0;
  });
  const W = Math.round((x + 0.4) * 10) / 10;
  return { type: 'plane', grid: { xMin: 0, xMax: W, yMin: 0, yMax: H, step: Math.max(W, H) }, hideTickLabels: true, polylines, caption };
}

const LIKE_DEF = 'Like terms have exactly the same variable. Constant terms (plain numbers) are like terms too.';

function tilesItem(rng: Rng): Out {
  const g1 = { x: rng.int(1, 3), one: rng.int(1, 5) };
  const g2 = { x: rng.int(1, 3), one: rng.int(0, 5) };
  const X = g1.x + g2.x;
  const U = g1.one + g2.one;
  const e1 = plain(g1.x, 'x', g1.one);
  const e2 = plain(g2.x, 'x', g2.one);
  return {
    prompt: `In the model, each long tile stands for $x$ and each small square stands for $1$. The two groups show $${e1}$ and $${e2}$. Write a simplified expression for all the tiles together.`,
    figure: tilesFig([g1, g2], `Group 1: ${e1}. Group 2: ${e2}.`),
    parts: [exprPart(plain(X, 'x', U), 'Expression:')],
    hints: ['Count the long tiles together. Then count the small squares together.', LIKE_DEF],
    solution: [`Long tiles ($x$-terms): $${term(g1.x, 'x')} + ${term(g2.x, 'x')} = ${term(X, 'x')}$.`, `Small squares (constants): $${g1.one}${g2.one ? ` + ${g2.one}` : ''} = ${U}$.`, `All the tiles: $${plain(X, 'x', U)}$.`],
  };
}

function combineD1(rng: Rng): Out {
  const v = rng.pick(LETTERS);
  if (rng.chance(0.5)) {
    const [a, b] = [rng.int(1, 9), rng.int(1, 9)];
    const tex = `${term(a, v)} + ${term(b, v)}`;
    return {
      prompt: `Simplify $${tex}$.`,
      parts: [exprPart(term(a + b, v))],
      hints: [LIKE_DEF, `Add the numbers in front of $${v}$: $${a} + ${b}$.`],
      solution: [`$${term(a, v)}$ and $${term(b, v)}$ are like terms: both have the variable $${v}$.`, `Add the coefficients: $${a} + ${b} = ${a + b}$.`, `$${tex} = ${term(a + b, v)}$`],
    };
  }
  const a = rng.int(2, 9);
  const [c, d] = [rng.int(1, 12), rng.int(1, 12)];
  const order = rng.int(0, 2);
  const tex = order === 0 ? `${term(a, v)} + ${c} + ${d}` : order === 1 ? `${c} + ${term(a, v)} + ${d}` : `${c} + ${d} + ${term(a, v)}`;
  return {
    prompt: `Simplify $${tex}$.`,
    parts: [exprPart(plain(a, v, c + d))],
    hints: [LIKE_DEF, `Add the constants $${c}$ and $${d}$. The $${v}$-term stays as it is.`],
    solution: [`The constants $${c}$ and $${d}$ are like terms: $${c} + ${d} = ${c + d}$.`, `$${term(a, v)}$ has no like term to combine with.`, `$${tex} = ${plain(a, v, c + d)}$`],
  };
}

function likeTermMc(rng: Rng): Out {
  const [v, w] = rng.sample(['x', 'n', 'a', 'm', 'y', 'k'], 2);
  const a = rng.int(2, 9);
  const b = rng.intExcept(2, 9, [a]);
  const correct = `$${term(b, v)}$`;
  const ds = [`$${term(a, w)}$`, `$${a}$`, `$${a}${v}^{2}$`, `$${term(a, `${v}${w}`)}$`];
  return {
    prompt: `Which term is a like term with $${term(a, v)}$?`,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: [LIKE_DEF, `Look for a term with exactly the variable $${v}$: no other letter and no power.`],
    solution: [`A like term with $${term(a, v)}$ must have exactly the variable $${v}$.`, `$${term(a, w)}$ has a different variable. $${a}$ is a constant. $${a}${v}^{2}$ has $${v}^{2}$, not $${v}$.`, `$${term(b, v)}$ has exactly $${v}$, so it is a like term. The answer is ${correct}.`],
  };
}

function combineD2(rng: Rng): Out {
  if (rng.chance(0.35)) {
    const [v, w] = rng.pick([['x', 'y'], ['a', 'b'], ['m', 'n'], ['p', 'q'], ['r', 's']]);
    const [a, b, c, d] = [rng.int(1, 6), rng.int(1, 6), rng.int(1, 6), rng.int(1, 6)];
    const tex = `${term(a, v)} + ${term(b, w)} + ${term(c, v)} + ${term(d, w)}`;
    const ans = `${term(a + c, v)} + ${term(b + d, w)}`;
    return {
      prompt: `Simplify $${tex}$.`,
      parts: [exprPart(ans)],
      hints: [LIKE_DEF, `Group the $${v}$-terms together and the $${w}$-terms together.`],
      solution: [`Group like terms: $${term(a, v)} + ${term(c, v)} = ${term(a + c, v)}$.`, `$${term(b, w)} + ${term(d, w)} = ${term(b + d, w)}$.`, `$${tex} = ${ans}$`],
    };
  }
  const v = rng.pick(LETTERS);
  const { a, b, c, d, s1, s2 } = retry(
    () => ({ a: rng.int(2, 9), b: rng.int(1, 8), c: rng.int(1, 12), d: rng.int(1, 12), s1: rng.sign(), s2: rng.sign() }),
    (o) => o.a + o.s1 * o.b > 0 && o.c + o.s2 * o.d > 0,
  );
  const X = a + s1 * b;
  const C = c + s2 * d;
  const op = (s: number) => (s > 0 ? '+' : '-');
  const layout = rng.int(0, 1);
  const tex = layout === 0 ? `${term(a, v)} + ${c} ${op(s1)} ${term(b, v)} ${op(s2)} ${d}` : `${c} + ${term(a, v)} ${op(s2)} ${d} ${op(s1)} ${term(b, v)}`;
  const ans = plain(X, v, C);
  return {
    prompt: `Simplify $${tex}$.`,
    parts: [exprPart(ans)],
    hints: [LIKE_DEF, `Each term keeps the sign in front of it. Combine the $${v}$-terms, then the constants.`],
    solution: [
      `$${v}$-terms: $${term(a, v)} ${op(s1)} ${term(b, v)} = ${term(X, v)}$.`,
      `Constants: $${c} ${op(s2)} ${d} = ${C}$.`,
      `$${tex} = ${ans}$`,
    ],
  };
}

const PROPS = ['Commutative property', 'Associative property', 'Distributive property'];

function propertyMc(rng: Rng): Out {
  const v = rng.pick(['x', 'n', 'a', 'm', 'y']);
  const [a, b, c] = [rng.int(2, 9), rng.int(2, 9), rng.int(2, 9)];
  const kind = rng.int(0, 4);
  const cases: Array<{ tex: string; idx: number; why: string }> = [
    { tex: `${v} + ${a} = ${a} + ${v}`, idx: 0, why: 'The order of the two terms changed. Adding in any order gives the same sum.' },
    { tex: `${a} ${T} ${v} = ${v} ${T} ${a}`, idx: 0, why: 'The order of the two factors changed. Multiplying in any order gives the same product.' },
    { tex: `(${v} + ${a}) + ${b} = ${v} + (${a} + ${b})`, idx: 1, why: 'The order stayed the same, but the grouping (the parentheses) changed.' },
    { tex: `(${a} ${T} ${b}) ${T} ${v} = ${a} ${T} (${b} ${T} ${v})`, idx: 1, why: 'The order stayed the same, but the grouping (the parentheses) changed.' },
    { tex: `${a}(${v} + ${c}) = ${a}${v} + ${a * c}`, idx: 2, why: `The $${a}$ multiplies each term inside the parentheses: $${a} ${T} ${v}$ and $${a} ${T} ${c}$.` },
  ];
  const cse = cases[kind];
  return {
    prompt: `Which property does this equation show? $$${cse.tex}$$`,
    parts: [{ answer: fixedChoice(PROPS, cse.idx) }],
    hints: ['Commutative: the **order** changes. Associative: the **grouping** changes. Distributive: a number multiplies **each term** in parentheses.', 'Compare the two sides. What moved?'],
    solution: [cse.why, `This is the ${PROPS[cse.idx].toLowerCase()}.`],
  };
}

function reorderMc(rng: Rng): Out {
  const v = rng.pick(['x', 'n', 'a', 'm', 'y', 'k']);
  const a = rng.int(2, 9);
  const b = rng.intExcept(2, 12, [a]);
  if (rng.chance(0.5)) {
    const tex = `${b} + ${term(a, v)}`;
    return {
      prompt: `Which expression is equivalent to $${tex}$ by the commutative property of addition?`,
      parts: [{ answer: mc(rng, `$${term(a, v)} + ${b}$`, [`$${term(b, v)} + ${a}$`, `$${term(a + b, v)}$`, `$${a} + ${term(b, v)}$`]) }],
      hints: ['The commutative property lets you change the **order** of the terms.', 'Each term must stay the same: the number with the variable stays with the variable.'],
      solution: [`The terms are $${b}$ and $${term(a, v)}$. Change their order.`, `$${tex} = ${term(a, v)} + ${b}$`, `$${b}$ and $${term(a, v)}$ are not like terms, so they cannot be combined into one term.`],
    };
  }
  const c = rng.int(2, 9);
  const tex = `${term(a, v)} + ${b} + ${term(c, v)}`;
  const ans = `${term(a, v)} + ${term(c, v)} + ${b}`;
  return {
    prompt: `Which expression is equivalent to $${tex}$?`,
    parts: [{ answer: mc(rng, `$${ans}$`, [`$${term(a + b + c, v)}$`, `$${term(a, v)} + ${term(b, v)} + ${c}$`, `$${term(a * c, v)} + ${b}$`]) }],
    hints: ['You can change the order of terms (commutative property). Each term keeps its own number and variable.', 'Look for the same three terms in a different order.'],
    solution: [`The terms are $${term(a, v)}$, $${b}$ and $${term(c, v)}$.`, `Moving $${b}$ to the end keeps the same terms: $${ans}$.`, `The answer is $${ans}$. (Combined, it is $${plain(a + c, v, b)}$.)`],
  };
}

function likeTermsD3(rng: Rng): Out {
  const kind = rng.pick(['perimeter', 'bags', 'equiv'] as const);
  const v = rng.pick(['n', 'x', 'a', 'm', 'k']);
  if (kind === 'perimeter') {
    if (rng.chance(0.5)) {
      const [a, b, c, d, e] = [rng.int(1, 4), rng.int(1, 4), rng.int(1, 9), rng.int(1, 4), rng.int(1, 9)];
      const sides = [term(a, v), `${term(b, v)} + ${c}`, `${term(d, v)} + ${e}`];
      const ans = plain(a + b + d, v, c + e);
      return {
        prompt: `A triangle has sides of length $${sides[0]}$, $${sides[1]}$ and $${sides[2]}$ (in centimetres). Write a simplified expression for its perimeter.`,
        parts: [exprPart(ans, 'Perimeter:')],
        hints: ['The perimeter is the sum of all the sides.', 'Add the sides, then combine like terms.'],
        solution: [`Perimeter $= ${sides[0]} + ${sides[1]} + ${sides[2]}$.`, `$${v}$-terms: $${term(a, v)} + ${term(b, v)} + ${term(d, v)} = ${term(a + b + d, v)}$.`, `Constants: $${c} + ${e} = ${c + e}$.`, `The perimeter is $${ans}$ cm.`],
      };
    }
    const [a, c, b] = [rng.int(1, 4), rng.int(1, 9), rng.int(2, 5)];
    const L = `${term(a, v)} + ${c}`;
    const W = term(b, v);
    const ans = plain(2 * a + 2 * b, v, 2 * c);
    return {
      prompt: `A rectangle is $${L}$ long and $${W}$ wide (in metres). Write a simplified expression for its perimeter.`,
      parts: [exprPart(ans, 'Perimeter:')],
      hints: ['A rectangle has two lengths and two widths. Add all four sides.', 'Then combine like terms.'],
      solution: [`Perimeter $= (${L}) + ${W} + (${L}) + ${W}$.`, `$${v}$-terms: $${term(a, v)} + ${W} + ${term(a, v)} + ${W} = ${term(2 * a + 2 * b, v)}$.`, `Constants: $${c} + ${c} = ${2 * c}$.`, `The perimeter is $${ans}$ m.`],
    };
  }
  if (kind === 'bags') {
    const n1 = pickName(rng);
    const n2b = pickName(rng, [n1]);
    const c = rng.pick([
      { bag: 'bag', things: 'marbles', loose: 'loose marbles' },
      { bag: 'pack', things: 'hockey cards', loose: 'single cards' },
      { bag: 'box', things: 'crayons', loose: 'loose crayons' },
      { bag: 'bag', things: 'beads', loose: 'loose beads' },
    ]);
    const [a, p, b, q] = [rng.int(2, 5), rng.int(1, 9), rng.int(1, 4), rng.int(1, 9)];
    const ans = plain(a + b, v, p + q);
    return {
      prompt: `Each ${c.bag} holds the same number of ${c.things}, $${v}$. ${n1} has $${a}$ ${c.bag}s and $${p}$ ${c.loose}. ${n2b} has $${b}$ ${b === 1 ? c.bag : `${c.bag}s`} and $${q}$ ${c.loose}. Write a simplified expression for the number of ${c.things} they have together.`,
      parts: [exprPart(ans, 'Total:')],
      hints: [`${n1} has $${term(a, v)} + ${p}$ ${c.things}.`, `Add ${n2b}'s expression, $${term(b, v)} + ${q}$, then combine like terms.`],
      solution: [`${n1}: $${term(a, v)} + ${p}$. ${n2b}: $${term(b, v)} + ${q}$.`, `Together: $${term(a, v)} + ${p} + ${term(b, v)} + ${q}$.`, `Combine: $${term(a, v)} + ${term(b, v)} = ${term(a + b, v)}$ and $${p} + ${q} = ${p + q}$.`, `They have $${ans}$ ${c.things} together.`],
    };
  }
  const { a, b, c, d } = retry(() => ({ a: rng.int(1, 9), b: rng.int(1, 5), c: rng.int(1, 9), d: rng.int(1, 5) }), (o) => o.a !== o.c && o.b !== o.d);
  const tex = `${a} + ${term(b, v)} + ${c} + ${term(d, v)}`;
  const correct = plain(b + d, v, a + c);
  const ds = [term(a + b + c + d, v), plain(b, v, a + c + d), plain(b + d, v, a * c), `${term(a + c, v)} + ${b + d}`];
  return {
    prompt: `Which expression is equivalent to $${tex}$?`,
    parts: [{ answer: mc(rng, `$${correct}$`, ds.map((x) => `$${x}$`)) }],
    hints: [LIKE_DEF, 'Combine the constants with each other and the variable terms with each other. A constant and a variable term are not like terms.'],
    solution: [`$${v}$-terms: $${term(b, v)} + ${term(d, v)} = ${term(b + d, v)}$.`, `Constants: $${a} + ${c} = ${a + c}$.`, `$${tex} = ${correct}$`],
  };
}

const likeTerms = skill({
  id: 'm6-like-terms',
  name: 'Like terms and algebraic properties',
  description: 'Model and combine like terms to simplify an expression, and use the commutative, associative and distributive properties to write equivalent expressions.',
  outcomes: ['A1'],
  lessonId: 'm6-6-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([tilesItem, combineD1, combineD1, likeTermMc])(rng);
    if (d === 2) return rng.pick([combineD2, combineD2, propertyMc, reorderMc])(rng);
    return likeTermsD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.3 Solving equations
// ---------------------------------------------------------------------------

/** A numeric answer part with a "x =" label. */
const solvePart = (x: number, v: string, suffix?: string): Part => numPart(x, { label: `$${v} =$`, suffix, exact: false });

interface Eq {
  tex: string;
  steps: string[];
  x: number;
  /** The left and right sides as functions of the variable, for checking. */
  check: (x: number) => [string, number, number];
}

function oneOp(rng: Rng, v: string): Eq {
  const x = rng.int(2, 15);
  const t = rng.int(0, 4);
  if (t === 0) {
    const a = rng.int(2, 20);
    return { tex: `${v} + ${a} = ${x + a}`, x, steps: [`Undo adding $${a}$: subtract $${a}$ from both sides.`, `$${v} = ${x + a} - ${a} = ${x}$`], check: (s) => [`${s} + ${a}`, s + a, x + a] };
  }
  if (t === 1) {
    const a = rng.int(2, 20);
    return { tex: `${v} - ${a} = ${x}`, x: x + a, steps: [`Undo subtracting $${a}$: add $${a}$ to both sides.`, `$${v} = ${x} + ${a} = ${x + a}$`], check: (s) => [`${s} - ${a}`, s - a, x] };
  }
  if (t === 2) {
    const a = rng.int(2, 9);
    return { tex: `${a}${v} = ${a * x}`, x, steps: [`$${a}${v}$ means $${a} ${T} ${v}$. Undo multiplying: divide both sides by $${a}$.`, `$${v} = ${a * x} ${D} ${a} = ${x}$`], check: (s) => [`${a} ${T} ${s}`, a * s, a * x] };
  }
  if (t === 3) {
    const a = rng.int(2, 6);
    const q = rng.int(2, 10);
    return { tex: `${fr(v, a)} = ${q}`, x: a * q, steps: [`$${fr(v, a)}$ means $${v} ${D} ${a}$. Undo dividing: multiply both sides by $${a}$.`, `$${v} = ${q} ${T} ${a} = ${a * q}$`], check: (s) => [`${s} ${D} ${a}`, s / a, q] };
  }
  const a = rng.int(2, 20);
  return { tex: `${x + a} = ${a} + ${v}`, x, steps: [`The variable is on the right side. Undo adding $${a}$: subtract $${a}$ from both sides.`, `$${x + a} - ${a} = ${x}$, so $${v} = ${x}$.`], check: (s) => [`${a} + ${s}`, x + a, a + s] };
}

function twoOp(rng: Rng, v: string): Eq {
  const x = rng.int(2, 12);
  const t = rng.int(0, 4);
  if (t === 0) {
    const [a, b] = [rng.int(2, 9), rng.int(1, 20)];
    const c = a * x + b;
    return {
      tex: `${a}${v} + ${b} = ${c}`, x,
      steps: [`Undo adding $${b}$ first: $${a}${v} = ${c} - ${b} = ${c - b}$.`, `Undo multiplying by $${a}$: $${v} = ${c - b} ${D} ${a} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s} + ${b}`, a * s + b, c],
    };
  }
  if (t === 1) {
    const a = rng.int(2, 9);
    const b = rng.int(1, a * x - 1);
    const c = a * x - b;
    return {
      tex: `${a}${v} - ${b} = ${c}`, x,
      steps: [`Undo subtracting $${b}$ first: $${a}${v} = ${c} + ${b} = ${c + b}$.`, `Undo multiplying by $${a}$: $${v} = ${c + b} ${D} ${a} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s} - ${b}`, a * s - b, c],
    };
  }
  if (t === 2) {
    const a = rng.int(2, 5);
    const q = rng.int(2, 9);
    const b = rng.int(1, 15);
    return {
      tex: `${fr(v, a)} + ${b} = ${q + b}`, x: a * q,
      steps: [`Undo adding $${b}$ first: $${fr(v, a)} = ${q + b} - ${b} = ${q}$.`, `Undo dividing by $${a}$: $${v} = ${q} ${T} ${a} = ${a * q}$.`],
      check: (s) => [`${s} ${D} ${a} + ${b}`, s / a + b, q + b],
    };
  }
  if (t === 3) {
    const [a, b] = [rng.int(1, 6), rng.int(1, 6)];
    const c = (a + b) * x;
    return {
      tex: `${term(a, v)} + ${term(b, v)} = ${c}`, x,
      steps: [`Simplify the left side first: $${term(a, v)} + ${term(b, v)} = ${term(a + b, v)}$. Now $${term(a + b, v)} = ${c}$.`, a + b === 1 ? `$${v} = ${c}$` : `Divide both sides by $${a + b}$: $${v} = ${c} ${D} ${a + b} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s} + ${b} ${T} ${s}`, (a + b) * s, c],
    };
  }
  const [a, b] = [rng.int(2, 15), rng.int(2, 15)];
  const c = x + a + b;
  return {
    tex: `${v} + ${a} + ${b} = ${c}`, x,
    steps: [`Simplify the left side first: $${a} + ${b} = ${a + b}$. Now $${v} + ${a + b} = ${c}$.`, `Subtract $${a + b}$ from both sides: $${v} = ${c} - ${a + b} = ${x}$.`],
    check: (s) => [`${s} + ${a} + ${b}`, s + a + b, c],
  };
}

function bothSides(rng: Rng, v: string): Eq {
  const x = rng.int(2, 12);
  const t = rng.int(0, 2);
  if (t === 0) {
    const [a, b] = [rng.int(1, 5), rng.int(1, 5)];
    const k = rng.int(1, 15);
    const total = (a + b) * x + k;
    const p = rng.int(Math.max(1, Math.floor(total / 3)), total - 1);
    const q = total - p;
    return {
      tex: `${term(a, v)} + ${term(b, v)} + ${k} = ${p} + ${q}`, x,
      steps: [`Simplify each side. Left: $${term(a, v)} + ${term(b, v)} = ${term(a + b, v)}$. Right: $${p} + ${q} = ${total}$.`, `Now $${term(a + b, v)} + ${k} = ${total}$. Subtract $${k}$: $${term(a + b, v)} = ${total - k}$.`, a + b === 1 ? `$${v} = ${total - k}$` : `Divide by $${a + b}$: $${v} = ${total - k} ${D} ${a + b} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s} + ${b} ${T} ${s} + ${k}`, (a + b) * s + k, p + q],
    };
  }
  if (t === 1) {
    const b = rng.int(1, 5);
    const a = b + rng.int(1, 5);
    const k = rng.int(1, 15);
    const total = (a - b) * x + k;
    return {
      tex: `${term(a, v)} + ${k} - ${term(b, v)} = ${total}`, x,
      steps: [`Simplify the left side: $${term(a, v)} - ${term(b, v)} = ${term(a - b, v)}$. Now $${term(a - b, v)} + ${k} = ${total}$.`, `Subtract $${k}$: $${term(a - b, v)} = ${total - k}$.`, a - b === 1 ? `$${v} = ${total - k}$` : `Divide by $${a - b}$: $${v} = ${total - k} ${D} ${a - b} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s} + ${k} - ${b} ${T} ${s}`, (a - b) * s + k, total],
    };
  }
  const a = rng.int(2, 6);
  const total = a * x;
  const k = rng.int(1, 9);
  const r = total + k;
  const ms = [2, 3, 4, 5].filter((m) => r % m === 0 && r / m > 1);
  if (ms.length) {
    const m = rng.pick(ms);
    return {
      tex: `${term(a, v)} = ${m} ${T} ${r / m} - ${k}`, x,
      steps: [`Simplify the right side. Multiply first: $${m} ${T} ${r / m} = ${r}$, then $${r} - ${k} = ${total}$. Now $${term(a, v)} = ${total}$.`, `Divide both sides by $${a}$: $${v} = ${total} ${D} ${a} = ${x}$.`],
      check: (s) => [`${a} ${T} ${s}`, a * s, total],
    };
  }
  return {
    tex: `${term(a, v)} = ${r} - ${k}`, x,
    steps: [`Simplify the right side: $${r} - ${k} = ${total}$. Now $${term(a, v)} = ${total}$.`, `Divide both sides by $${a}$: $${v} = ${total} ${D} ${a} = ${x}$.`],
    check: (s) => [`${a} ${T} ${s}`, a * s, total],
  };
}

/** "Check: 3 × 5 + 4 = 19 ✓" for the solution. */
function checkLine(e: Eq, v: string): string {
  const [lhs, L, R] = e.check(e.x);
  return `Check: put $${v} = ${e.x}$ back in. $${lhs} = ${L}$, which equals $${R}$.`;
}

function verifyMc(rng: Rng, v: string, d: Difficulty): Out {
  const e = d === 1 ? oneOp(rng, v) : twoOp(rng, v);
  const near = retry(() => rng.int(Math.max(1, e.x - 6), e.x + 6), (t) => t !== e.x && Number.isInteger(e.check(t)[1]) && e.check(t)[1] >= 0, 100);
  const isSol = rng.chance(0.5) || near === e.x || !Number.isInteger(e.check(near)[1]) || e.check(near)[1] < 0;
  const test = isSol ? e.x : near;
  const [lhs, L, R] = e.check(test);
  const sideL = `${L}`;
  return {
    prompt: `Is $${v} = ${test}$ the solution of $${e.tex}$? Check by substituting.`,
    parts: [{ answer: fixedChoice(['Yes', 'No'], isSol ? 0 : 1) }],
    hints: [`Replace $${v}$ with $${test}$ and work out the side with $${v}$ in it.`, 'If both sides are equal, it is the solution.'],
    solution: [
      `Substitute $${v} = ${test}$: $${lhs} = ${sideL}$.`,
      isSol ? `$${sideL} = ${R}$, so both sides are equal.` : `$${sideL}$ is not equal to $${R}$.`,
      isSol ? `Yes, $${v} = ${test}$ is the solution.` : `No, $${v} = ${test}$ is not the solution. (The solution is $${v} = ${e.x}$.)`,
    ],
  };
}

const solveEquation = skill({
  id: 'm6-solve-equation',
  name: 'Solving equations',
  description: 'Simplify each side of an equation, solve equations with one or two operations, and verify a solution by substitution.',
  outcomes: ['A1'],
  lessonId: 'm6-6-3',
  calculator: false,
  gen(rng, d) {
    const v = rng.pick(LETTERS);
    if (d < 3 && rng.chance(0.25)) return verifyMc(rng, v, d);
    const e = d === 1 ? oneOp(rng, v) : d === 2 ? twoOp(rng, v) : bothSides(rng, v);
    return {
      prompt: `Solve $${e.tex}$.`,
      parts: [solvePart(e.x, v)],
      hints: [
        d === 3 ? 'Simplify each side first: combine like terms and work out the numbers.' : d === 2 ? 'Undo the operations in reverse order: undo adding or subtracting first, then multiplying or dividing.' : 'Use the inverse operation to get the variable by itself.',
        'Whatever you do to one side, do to the other side too.',
      ],
      solution: [...e.steps, checkLine(e, v), `$${v} = ${e.x}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.3 Equation problems
// ---------------------------------------------------------------------------

interface ProbOut {
  text: string;
  correct: string;
  wrong: string[];
  v: string;
  x: number;
  steps: string[];
  answer: string;
  suffix?: string;
  check: string;
}

function eqProblemD1(rng: Rng): ProbOut {
  const name = pickName(rng);
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const [s, a] = [rng.int(5, 40), rng.int(3, 20)];
    const t = s + a;
    return {
      text: `${name} had some stickers. A friend gave ${name} $${a}$ more. Now ${name} has $${t}$ stickers. Let $s$ be the number of stickers ${name} had at first.`,
      correct: `s + ${a} = ${t}`, wrong: [`s - ${a} = ${t}`, `${a}s = ${t}`, `s = ${t} + ${a}`], v: 's', x: s,
      steps: [`Subtract $${a}$ from both sides: $s = ${t} - ${a} = ${s}$.`], answer: `${name} had $${s}$ stickers at first.`, suffix: 'stickers', check: `$${s} + ${a} = ${t}$ ✓`,
    };
  }
  if (kind === 1) {
    const [m, a] = [rng.int(15, 60), rng.int(3, 14)];
    const left = m - a;
    return {
      text: `${name} had some money. ${name} spent ${dollars(a)} on a book and has ${dollars(left)} left. Let $m$ be the number of dollars ${name} had at first.`,
      correct: `m - ${a} = ${left}`, wrong: [`m + ${a} = ${left}`, `${a} - m = ${left}`, `${a}m = ${left}`], v: 'm', x: m,
      steps: [`Add $${a}$ to both sides: $m = ${left} + ${a} = ${m}$.`], answer: `${name} had ${dollars(m)} at first.`, check: `$${m} - ${a} = ${left}$ ✓`,
    };
  }
  if (kind === 2) {
    const [p, c] = [rng.int(3, 9), rng.int(4, 12)];
    const t = p * c;
    return {
      text: `${name} buys $${p}$ packs of hockey cards. Each pack has the same number of cards. There are $${t}$ cards in all. Let $c$ be the number of cards in one pack.`,
      correct: `${p}c = ${t}`, wrong: [`c + ${p} = ${t}`, `${fr('c', p)} = ${t}`, `${t}c = ${p}`], v: 'c', x: c,
      steps: [`Divide both sides by $${p}$: $c = ${t} ${D} ${p} = ${c}$.`], answer: `There are $${c}$ cards in each pack.`, suffix: 'cards', check: `$${p} ${T} ${c} = ${t}$ ✓`,
    };
  }
  const [k, e] = [rng.int(2, 6), rng.int(3, 9)];
  const n = k * e;
  return {
    text: `${name} shares some cookies equally among $${k}$ friends. Each friend gets $${e}$ cookies. Let $n$ be the number of cookies.`,
    correct: `${fr('n', k)} = ${e}`, wrong: [`${k}n = ${e}`, `n - ${k} = ${e}`, `${fr(k, 'n')} = ${e}`], v: 'n', x: n,
    steps: [`Multiply both sides by $${k}$: $n = ${e} ${T} ${k} = ${n}$.`], answer: `There are $${n}$ cookies.`, suffix: 'cookies', check: `$${n} ${D} ${k} = ${e}$ ✓`,
  };
}

function eqProblemD2(rng: Rng): ProbOut {
  const name = pickName(rng);
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const [fee, each, n] = [rng.pick([40, 50, 60, 75, 80]), rng.int(4, 9), rng.int(12, 30)];
    const t = fee + each * n;
    return {
      text: `A class trip to the science centre costs ${dollars(fee)} for the bus plus ${dollars(each)} for each student. The total cost is ${dollars(t)}. Let $s$ be the number of students.`,
      correct: `${each}s + ${fee} = ${t}`, wrong: [`${fee}s + ${each} = ${t}`, `${each}s = ${t} + ${fee}`, `${each} + ${fee}s = ${t}`], v: 's', x: n,
      steps: [`Subtract $${fee}$ from both sides: $${each}s = ${t} - ${fee} = ${t - fee}$.`, `Divide both sides by $${each}$: $s = ${t - fee} ${D} ${each} = ${n}$.`], answer: `$${n}$ students go on the trip.`, suffix: 'students', check: `$${each} ${T} ${n} + ${fee} = ${each * n} + ${fee} = ${t}$ ✓`,
    };
  }
  if (kind === 1) {
    const [p, c, loose] = [rng.int(2, 6), rng.int(5, 12), rng.int(1, 9)];
    const t = p * c + loose;
    return {
      text: `${name} has $${p}$ full boxes of crayons and $${loose}$ loose crayons. Each box holds the same number of crayons. ${name} has $${t}$ crayons in all. Let $b$ be the number of crayons in one box.`,
      correct: `${p}b + ${loose} = ${t}`, wrong: [`${loose}b + ${p} = ${t}`, `${p}b = ${t} + ${loose}`, `${p} + b + ${loose} = ${t}`], v: 'b', x: c,
      steps: [`Subtract $${loose}$ from both sides: $${p}b = ${t} - ${loose} = ${t - loose}$.`, `Divide both sides by $${p}$: $b = ${t - loose} ${D} ${p} = ${c}$.`], answer: `Each box holds $${c}$ crayons.`, suffix: 'crayons', check: `$${p} ${T} ${c} + ${loose} = ${t}$ ✓`,
    };
  }
  if (kind === 2) {
    const [start, per, w] = [rng.int(5, 30), rng.int(3, 10), rng.int(3, 10)];
    const goal = start + per * w;
    return {
      text: `${name} has ${dollars(start)} and saves ${dollars(per)} each week for a new skateboard that costs ${dollars(goal)}. Let $w$ be the number of weeks until ${name} has enough.`,
      correct: `${per}w + ${start} = ${goal}`, wrong: [`${start}w + ${per} = ${goal}`, `${per}w - ${start} = ${goal}`, `${per} + ${start}w = ${goal}`], v: 'w', x: w,
      steps: [`Subtract $${start}$ from both sides: $${per}w = ${goal} - ${start} = ${goal - start}$.`, `Divide both sides by $${per}$: $w = ${goal - start} ${D} ${per} = ${w}$.`], answer: `It takes $${w}$ weeks.`, suffix: 'weeks', check: `$${per} ${T} ${w} + ${start} = ${goal}$ ✓`,
    };
  }
  const [n, price, off] = [rng.int(2, 5), rng.int(9, 18), rng.pick([3, 4, 5, 6])];
  const t = n * price - off;
  return {
    text: `${name}'s family buys $${n}$ large pizzas that each cost the same. They use a coupon for ${dollars(off)} off and pay ${dollars(t)}. Let $p$ be the price of one pizza in dollars.`,
    correct: `${n}p - ${off} = ${t}`, wrong: [`${n}p + ${off} = ${t}`, `${off}p - ${n} = ${t}`, `${n} - ${off}p = ${t}`], v: 'p', x: price,
    steps: [`Add $${off}$ to both sides: $${n}p = ${t} + ${off} = ${t + off}$.`, `Divide both sides by $${n}$: $p = ${t + off} ${D} ${n} = ${price}$.`], answer: `One pizza costs ${dollars(price)}.`, check: `$${n} ${T} ${price} - ${off} = ${t}$ ✓`,
  };
}

function eqProblemD3(rng: Rng): ProbOut {
  const n1 = pickName(rng);
  const n2b = pickName(rng, [n1]);
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const [b, d] = [rng.int(6, 14), rng.int(2, 5)];
    const t = 2 * b + d;
    return {
      text: `${n1} is $${d}$ years older than ${n2b}. The sum of their ages is $${t}$. Let $a$ be ${n2b}'s age.`,
      correct: `a + (a + ${d}) = ${t}`, wrong: [`a + ${d} = ${t}`, `a + ${d}a = ${t}`, `2a = ${t} + ${d}`], v: 'a', x: b,
      steps: [`Simplify the left side: $a + a + ${d} = 2a + ${d}$. Now $2a + ${d} = ${t}$.`, `Subtract $${d}$ from both sides: $2a = ${t - d}$.`, `Divide both sides by $2$: $a = ${t - d} ${D} 2 = ${b}$.`], answer: `${n2b} is $${b}$ years old (and ${n1} is $${b + d}$).`, suffix: 'years', check: `$${b} + ${b + d} = ${t}$ ✓`,
    };
  }
  if (kind === 1) {
    const [w, k] = [rng.int(3, 12), rng.int(2, 4)];
    const P = 2 * (w + k * w);
    return {
      text: `A rectangular garden is $${k}$ times as long as it is wide. Its perimeter is $${P}$ m. Let $w$ be the width in metres.`,
      correct: `w + ${k}w + w + ${k}w = ${P}`, wrong: [`w + ${k}w = ${P}`, `${k}w = ${P}`, `w + ${k} + w + ${k} = ${P}`], v: 'w', x: w,
      steps: [`The length is $${k}w$. Simplify the left side: $w + ${k}w + w + ${k}w = ${2 + 2 * k}w$.`, `Now $${2 + 2 * k}w = ${P}$. Divide both sides by $${2 + 2 * k}$: $w = ${P} ${D} ${2 + 2 * k} = ${w}$.`], answer: `The garden is $${w}$ m wide (and $${k * w}$ m long).`, suffix: 'm', check: `$${w} + ${k * w} + ${w} + ${k * w} = ${P}$ ✓`,
    };
  }
  if (kind === 2) {
    const [n, e] = [rng.int(4, 15), rng.int(2, 9)];
    const t = 4 * n + e;
    return {
      text: `${n1}, ${n2b} and Sam pick apples. ${n1} picks $n$ apples. ${n2b} picks twice as many as ${n1}. Sam picks $${e}$ more than ${n1}. They pick $${t}$ apples in all.`,
      correct: `n + 2n + (n + ${e}) = ${t}`, wrong: [`n + 2 + n + ${e} = ${t}`, `n + 2n + ${e} = ${t}`, `2n + ${e}n = ${t}`], v: 'n', x: n,
      steps: [`Simplify the left side: $n + 2n + n + ${e} = 4n + ${e}$. Now $4n + ${e} = ${t}$.`, `Subtract $${e}$ from both sides: $4n = ${t - e}$.`, `Divide both sides by $4$: $n = ${t - e} ${D} 4 = ${n}$.`], answer: `${n1} picks $${n}$ apples.`, suffix: 'apples', check: `$${n} + ${2 * n} + ${n + e} = ${t}$ ✓`,
    };
  }
  const [s, e] = [rng.int(5, 15), rng.int(2, 8)];
  const P = 3 * s + e;
  return {
    text: `A triangle has two sides of the same length, $s$ cm. The third side is $${e}$ cm longer than each of the other two. The perimeter is $${P}$ cm.`,
    correct: `s + s + (s + ${e}) = ${P}`, wrong: [`s + s + ${e} = ${P}`, `3s = ${P} + ${e}`, `s + ${e}s = ${P}`], v: 's', x: s,
    steps: [`Simplify the left side: $s + s + s + ${e} = 3s + ${e}$. Now $3s + ${e} = ${P}$.`, `Subtract $${e}$ from both sides: $3s = ${P - e}$.`, `Divide both sides by $3$: $s = ${P - e} ${D} 3 = ${s}$.`], answer: `The two equal sides are $${s}$ cm long.`, suffix: 'cm', check: `$${s} + ${s} + ${s + e} = ${P}$ ✓`,
  };
}

const equationProblems = skill({
  id: 'm6-equation-problems',
  name: 'Writing and solving equations for problems',
  description: 'Write an equation with one or two operations for a problem, solve it, and verify the solution.',
  outcomes: ['A1'],
  lessonId: 'm6-6-3',
  calculator: false,
  gen(rng, d) {
    const p = d === 1 ? eqProblemD1(rng) : d === 2 ? eqProblemD2(rng) : eqProblemD3(rng);
    const eqAnswer: AnswerSpec = mc(rng, `$${p.correct}$`, p.wrong.map((w) => `$${w}$`));
    return {
      prompt: `${p.text} Choose the equation, then solve it.`,
      parts: [{ label: 'Equation', answer: eqAnswer }, { ...solvePart(p.x, p.v, p.suffix) }],
      hints: [`Write the story with $${p.v}$ in place of the unknown number.`, d === 3 ? 'Add up all the parts, then combine like terms before solving.' : 'Then use inverse operations to get the variable by itself.'],
      solution: [`The equation is $${p.correct}$.`, ...p.steps, `Check: ${p.check}`, p.answer],
    };
  },
});

export const ALGEBRA_SKILLS: SkillDef[] = [orderOfOperations, likeTerms, solveEquation, equationProblems];
