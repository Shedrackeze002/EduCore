/** Unit 6 — Linear Relations, Slope, Distance and Midpoint (R3, R4, R5, R10). */
import { byDifficulty, fixedChoice, mc, multi, numPart, part, skill } from '../../helpers.ts';
import { type Frac, frac, fracLatex, fmt, isPerfectSquare, radicalSplit, roundTo } from '../../../math/numbers.ts';
import {
  type Pt,
  generalLatex,
  lineFromSlopeIntercept,
  lineFromSlopePoint,
  lineThrough,
  perpendicularSlope,
  slopeInterceptLatex,
  slopeOf,
} from '../../../math/linear.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, SkillDef } from '../../../types.ts';

const GRID: GridSpec = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };

function latticePoint(rng: Rng, r = 7): Pt {
  return [rng.int(-r, r), rng.int(-r, r)];
}

function distinctPoints(rng: Rng, r = 7, minRun = 1): [Pt, Pt] {
  for (;;) {
    const p = latticePoint(rng, r);
    const q = latticePoint(rng, r);
    if (Math.abs(q[0] - p[0]) >= minRun && (p[0] !== q[0] || p[1] !== q[1])) return [p, q];
  }
}

const P = (p: Pt) => `(${p[0]}, ${p[1]})`;

// ---------------------------------------------------------------------------
// R4 — linear relations
// ---------------------------------------------------------------------------

const isLinearTable = skill({
  id: 'r4-is-linear-table',
  name: 'Linear relations from tables',
  description: 'Decide whether a table of values represents a linear relation by checking the rate of change.',
  outcomes: ['R4'],
  lessonId: 'm10c-6-1',
  format: 'mc',
  gen(rng, d) {
    const linear = rng.chance(0.5);
    const x0 = rng.int(-3, 2);
    const steps = d === 3 ? rng.shuffle([1, 2, 1, 3]).slice(0, 4) : [1, 1, 1, 1];
    const xs = [x0];
    steps.forEach((s, i) => xs.push(xs[i] + s));
    const m = rng.nonZero(-5, 5);
    const b = rng.int(-6, 6);
    let ys = xs.map((x) => m * x + b);
    if (!linear) {
      const kind = rng.pick(['square', 'bump'] as const);
      ys = kind === 'square' ? xs.map((x) => x * x + b) : ys.map((y, i) => (i === 2 ? y + rng.pick([1, 2, -1, -2]) : y));
    }
    const dx = xs.slice(1).map((x, i) => x - xs[i]);
    const dy = ys.slice(1).map((y, i) => y - ys[i]);
    return {
      prompt: 'Does this table of values represent a linear relation?',
      figure: { type: 'table', headers: ['$x$', '$y$'], rows: xs.map((x, i) => [`${x}`, `${ys[i]}`]), horizontal: true },
      parts: [{ answer: fixedChoice(['Yes, it is linear', 'No, it is not linear'], linear ? 0 : 1) }],
      hints: ['Find the change in $y$ and the change in $x$ between consecutive columns.', d === 3 ? 'The $x$-values do not change by equal amounts, so compare the rates $\\dfrac{\\Delta y}{\\Delta x}$.' : 'If $x$ changes by a constant amount, a linear relation has a constant change in $y$.'],
      solution: [`Rates $\\dfrac{\\Delta y}{\\Delta x}$: ${dy.map((v, i) => `$\\dfrac{${v}}{${dx[i]}}$`).join(', ')}`, linear ? 'The rate of change is constant, so the relation is linear.' : 'The rate of change is not constant, so the relation is not linear.'],
    };
  },
});

const EQS = [
  { md: '$y = 3x - 2$', lin: true },
  { md: '$y = x^2 + 1$', lin: false },
  { md: '$xy = 6$', lin: false },
  { md: '$2x + 3y = 7$', lin: true },
  { md: '$y = 5$', lin: true },
  { md: '$x = -2$', lin: true },
  { md: '$y = \\dfrac{1}{x}$', lin: false },
  { md: '$y = \\sqrt{x}$', lin: false },
  { md: '$y = 2^x$', lin: false },
  { md: '$y = \\dfrac{x + 1}{2}$', lin: true },
  { md: '$y - 4 = -\\tfrac12(x + 3)$', lin: true },
  { md: '$y = 4x^3$', lin: false },
  { md: '$3x - y + 9 = 0$', lin: true },
  { md: '$y = |x|$', lin: false },
];

const isLinearEquation = skill({
  id: 'r4-is-linear-equation',
  name: 'Linear equations',
  description: 'Identify which equations represent linear relations.',
  outcomes: ['R4'],
  lessonId: 'm10c-6-1',
  format: 'mc',
  gen(rng, d) {
    const n = d === 1 ? 4 : 6;
    let chosen = rng.sample(EQS, n);
    if (!chosen.some((e) => e.lin)) chosen = [EQS[0], ...chosen.slice(1)];
    if (!chosen.some((e) => !e.lin)) chosen = [EQS[1], ...chosen.slice(1)];
    return {
      prompt: 'Select **all** of the equations that represent linear relations.',
      parts: [{ answer: multi(rng, chosen.map((e) => ({ md: e.md, correct: e.lin }))) }],
      hints: ['A linear relation can be written as $Ax + By + C = 0$: each variable has exponent 1, and no variables are multiplied together or in a denominator, root, or exponent.', 'Horizontal and vertical lines ($y = 5$, $x = -2$) are linear.'],
      solution: chosen.map((e) => `${e.md}: ${e.lin ? 'linear' : 'not linear'}`),
    };
  },
});

const rateTable = skill({
  id: 'r4-rate-of-change-table',
  name: 'Rate of change from a table or context',
  description: 'Determine the rate of change of a linear relation from a table or a description, with units.',
  outcomes: ['R4', 'R3'],
  lessonId: 'm10c-6-1',
  gen(rng, d) {
    const ctx = rng.pick([
      { x: 'Time (h)', y: 'Distance (km)', u: 'km/h', m: [40, 60, 75, 90] },
      { x: 'Number of shirts', y: 'Cost ($)', u: '$ per shirt', m: [8, 12, 15, 18] },
      { x: 'Time (min)', y: 'Water in tank (L)', u: 'L/min', m: [-5, -8, -12, -20] },
      { x: 'Hours worked', y: 'Pay ($)', u: '$/h', m: [14, 16, 18, 22] },
    ]);
    const m = rng.pick(ctx.m);
    const b = m < 0 ? rng.int(10, 30) * 10 : rng.pick([0, 10, 20, 50]);
    const step = d === 1 ? 1 : rng.pick([2, 3, 5]);
    const xs = [0, 1, 2, 3].map((i) => i * step + (d === 3 ? rng.pick([1, 2]) : 0));
    const ys = xs.map((x) => m * x + b);
    return {
      prompt: 'The table shows a linear relation. What is the rate of change? Include the sign.',
      figure: { type: 'table', headers: [ctx.x, ctx.y], rows: xs.map((x, i) => [`${x}`, `${ys[i]}`]) },
      parts: [numPart(m, { suffix: ctx.u, exact: false })],
      hints: ['Rate of change $= \\dfrac{\\text{change in dependent variable}}{\\text{change in independent variable}}$.', 'Use any two rows.'],
      solution: [`$\\dfrac{${ys[1]} - ${ys[0]}}{${xs[1]} - ${xs[0]}} = \\dfrac{${ys[1] - ys[0]}}{${xs[1] - xs[0]}} = ${m}$ ${ctx.u}`, m < 0 ? 'The negative rate means the quantity is decreasing.' : 'The positive rate means the quantity is increasing.'],
    };
  },
});

// ---------------------------------------------------------------------------
// R5 — characteristics
// ---------------------------------------------------------------------------

const interceptsEq = skill({
  id: 'r5-intercepts-from-equation',
  name: 'Intercepts from an equation',
  description: 'Determine the x- and y-intercepts of a linear relation from its equation.',
  outcomes: ['R5'],
  lessonId: 'm10c-6-2',
  gen(rng, d) {
    let A = 0;
    let B = 0;
    let C = 0;
    let tex = '';
    if (d === 1) {
      const xi = rng.nonZero(-6, 6);
      const yi = rng.nonZero(-6, 6);
      // x/xi + y/yi = 1 scaled
      const l = lineThrough([xi, 0], [0, yi]);
      A = l.A;
      B = l.B;
      C = l.C;
      tex = `${A === 1 ? '' : A}x ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}y = ${-C}`;
    } else if (d === 2) {
      const m = frac(rng.nonZero(-5, 5), rng.pick([1, 2, 3]));
      const b = frac(rng.nonZero(-8, 8));
      const l = lineFromSlopeIntercept(m, b);
      A = l.A;
      B = l.B;
      C = l.C;
      tex = slopeInterceptLatex(m, b);
    } else {
      A = rng.int(1, 6);
      B = rng.nonZero(-6, 6);
      C = rng.nonZero(-12, 12);
      tex = generalLatex({ A, B, C });
    }
    const xInt = -C / A;
    const yInt = -C / B;
    return {
      prompt: `Determine the x-intercept and the y-intercept of $${tex}$.`,
      parts: [numPart(xInt, { label: 'x-intercept:', exact: false }), numPart(yInt, { label: 'y-intercept:', exact: false })],
      hints: ['To find the x-intercept, substitute $y = 0$ and solve for $x$.', 'To find the y-intercept, substitute $x = 0$ and solve for $y$.'],
      solution: [`$y = 0$: $x = ${fracLatex(frac(-C, A))}$`, `$x = 0$: $y = ${fracLatex(frac(-C, B))}$`, `The intercepts are $(${fracLatex(frac(-C, A))}, 0)$ and $(0, ${fracLatex(frac(-C, B))})$.`],
    };
  },
});

const interceptsGraph = skill({
  id: 'r5-intercepts-from-graph',
  name: 'Intercepts from a graph',
  description: 'Read the intercepts of a linear relation from its graph and state them as ordered pairs.',
  outcomes: ['R5'],
  lessonId: 'm10c-6-2',
  gen(rng, d) {
    const xi = rng.nonZero(-7, 7);
    const yi = rng.nonZero(-7, 7);
    const l = lineThrough([xi, 0], [0, yi]);
    if (d === 3) {
      return {
        prompt: 'State the x-intercept of the line as an ordered pair.',
        figure: { type: 'plane', grid: GRID, lines: [{ line: l }] },
        parts: [part({ kind: 'point', x: xi, y: 0 }, { placeholder: '(x, y)' })],
        hints: ['The x-intercept is where the line crosses the x-axis. There, $y = 0$.'],
        solution: [`The line crosses the x-axis at $(${xi}, 0)$.`],
      };
    }
    return {
      prompt: 'Determine the x-intercept and the y-intercept of the line.',
      figure: { type: 'plane', grid: GRID, lines: [{ line: l }] },
      parts: [numPart(xi, { label: 'x-intercept:', exact: false }), numPart(yi, { label: 'y-intercept:', exact: false })],
      hints: ['The x-intercept is where the line crosses the x-axis; the y-intercept is where it crosses the y-axis.'],
      solution: [`x-intercept: $${xi}$, i.e. the point $(${xi}, 0)$.`, `y-intercept: $${yi}$, i.e. the point $(0, ${yi})$.`],
    };
  },
});

const domainRangeLinear = skill({
  id: 'r5-domain-range-linear',
  name: 'Domain and range of linear relations',
  description: 'State the domain and range of linear relations, including horizontal and vertical lines and restricted contexts.',
  outcomes: ['R5'],
  lessonId: 'm10c-6-2',
  format: 'mc',
  gen(rng, d) {
    const kind = byDifficulty(d, rng.pick(['oblique', 'horizontal'] as const), rng.pick(['vertical', 'horizontal', 'oblique'] as const), 'context');
    const R = '\\{x \\mid x \\in \\mathbb{R}\\}';
    const RY = '\\{y \\mid y \\in \\mathbb{R}\\}';
    if (kind === 'context') {
      const rate = rng.pick([15, 20, 25, 40]);
      const T = rng.pick([4, 5, 6, 8]);
      const V0 = rate * T;
      const correct = `Domain: $\\{t \\mid 0 \\le t \\le ${T},\\ t \\in \\mathbb{R}\\}$; Range: $\\{V \\mid 0 \\le V \\le ${V0},\\ V \\in \\mathbb{R}\\}$`;
      return {
        prompt: `A tank holds $${V0}$ L of water and drains at $${rate}$ L/min until it is empty: $V = ${V0} - ${rate}t$. What are the domain and range in this context?`,
        parts: [
          {
            answer: mc(rng, correct, [
              `Domain: $\\{t \\mid t \\in \\mathbb{R}\\}$; Range: $\\{V \\mid V \\in \\mathbb{R}\\}$`,
              `Domain: $\\{t \\mid 0 \\le t \\le ${V0},\\ t \\in \\mathbb{R}\\}$; Range: $\\{V \\mid 0 \\le V \\le ${T},\\ V \\in \\mathbb{R}\\}$`,
              `Domain: $\\{t \\mid t \\ge 0,\\ t \\in \\mathbb{R}\\}$; Range: $\\{V \\mid V \\le ${V0},\\ V \\in \\mathbb{R}\\}$`,
            ]),
          },
        ],
        hints: ['Time starts at 0 and stops when the tank is empty.', `Solve $0 = ${V0} - ${rate}t$ to find when it is empty.`],
        solution: [`The tank is empty when $t = ${V0} \\div ${rate} = ${T}$ min.`, correct],
      };
    }
    if (kind === 'oblique') {
      const m = frac(rng.nonZero(-4, 4), rng.pick([1, 2]));
      const b = frac(rng.int(-5, 5));
      const correct = `Domain: $${R}$; Range: $${RY}$`;
      return {
        prompt: `What are the domain and range of $${slopeInterceptLatex(m, b)}$?`,
        figure: { type: 'plane', grid: GRID, lines: [{ line: lineFromSlopeIntercept(m, b) }] },
        parts: [{ answer: mc(rng, correct, [`Domain: $${R}$; Range: $\\{${b.n}\\}$`, `Domain: $\\{${b.n}\\}$; Range: $${RY}$`, `Domain: $\\{x \\mid x \\ge 0,\\ x \\in \\mathbb{R}\\}$; Range: $\\{y \\mid y \\ge ${b.n},\\ y \\in \\mathbb{R}\\}$`]) }],
        hints: ['A slanted line continues forever left and right, and up and down.'],
        solution: ['The line extends infinitely in both directions horizontally and vertically.', correct],
      };
    }
    if (kind === 'horizontal') {
      const k = rng.int(-6, 6);
      const correct = `Domain: $${R}$; Range: $\\{${k}\\}$`;
      return {
        prompt: `What are the domain and range of $y = ${k}$?`,
        figure: { type: 'plane', grid: GRID, lines: [{ line: { A: 0, B: 1, C: -k } }] },
        parts: [{ answer: mc(rng, correct, [`Domain: $\\{${k}\\}$; Range: $${RY}$`, `Domain: $${R}$; Range: $${RY}$`, `Domain: $\\{0\\}$; Range: $\\{${k}\\}$`]) }],
        hints: ['Every point on a horizontal line has the same y-value.'],
        solution: ['The line extends forever left and right, so the domain is all real numbers.', `Every y-value is $${k}$, so the range is $\\{${k}\\}$.`],
      };
    }
    const k = rng.int(-6, 6);
    const correct = `Domain: $\\{${k}\\}$; Range: $${RY}$`;
    return {
      prompt: `What are the domain and range of $x = ${k}$?`,
      figure: { type: 'plane', grid: GRID, lines: [{ line: { A: 1, B: 0, C: -k } }] },
      parts: [{ answer: mc(rng, correct, [`Domain: $${R}$; Range: $\\{${k}\\}$`, `Domain: $${R}$; Range: $${RY}$`, `Domain: $\\{${k}\\}$; Range: $\\{0\\}$`]) }],
      hints: ['Every point on a vertical line has the same x-value.'],
      solution: [`Every x-value is $${k}$, so the domain is $\\{${k}\\}$.`, 'The line extends up and down forever, so the range is all real numbers. (A vertical line is a relation but not a function.)'],
    };
  },
});

const contextSkill = skill({
  id: 'r5-context',
  name: 'Intercepts and slope in context',
  description: 'Interpret and calculate intercepts and slope of linear models in context.',
  outcomes: ['R5'],
  lessonId: 'm10c-6-2',
  gen(rng, d) {
    const base = rng.pick([3, 4, 5]) + rng.pick([0, 0.5]);
    const rate = rng.pick([1.75, 2, 2.25, 2.5]);
    if (d === 1) {
      return {
        prompt: `A taxi ride costs $C = ${fmt(base, 2)} + ${fmt(rate, 2)}d$ dollars, where $d$ is the distance in kilometres. What does the C-intercept represent?`,
        parts: [{ answer: mc(rng, `The fixed starting fee of $\\$${fmt(base, 2)}$ before any distance is driven`, [`The cost per kilometre, $\\$${fmt(rate, 2)}$`, 'The total distance of the ride', 'The distance you can travel for free']) }],
        hints: ['The C-intercept is the value of $C$ when $d = 0$.'],
        solution: [`When $d = 0$, $C = ${fmt(base, 2)}$: the starting fee.`, `The slope, $${fmt(rate, 2)}$, is the cost per kilometre.`],
      };
    }
    const V0 = rng.pick([600, 800, 1200, 1500]);
    const r = rng.pick([20, 25, 40, 50, 60]);
    const T = V0 / r;
    if (d === 2) {
      return {
        prompt: `A pool contains $${V0}$ L of water and is drained at $${r}$ L/min, so $V = ${V0} - ${r}t$. Determine the t-intercept and explain what it means.`,
        parts: [numPart(T, { label: 't-intercept:', suffix: 'min', exact: false }), { label: 'Meaning:', answer: mc(rng, 'The time when the pool is empty', ['The amount of water at the start', 'The rate at which water drains', 'The time when the pool is half full']) }],
        hints: ['At the t-intercept, $V = 0$.'],
        solution: [`$0 = ${V0} - ${r}t \\Rightarrow t = ${fmt(T)}$`, `After $${fmt(T)}$ minutes the pool is empty.`],
      };
    }
    const target = roundTo(base + rate * rng.int(4, 20), 2);
    const dist = (target - base) / rate;
    return {
      prompt: `A taxi ride costs $C = ${fmt(base, 2)} + ${fmt(rate, 2)}d$ dollars for $d$ kilometres. A ride cost $\\$${fmt(target, 2)}$. How far was the ride?`,
      parts: [numPart(dist, { suffix: 'km', decimals: 1 })],
      hints: ['Substitute the cost for $C$ and solve for $d$.'],
      solution: [`$${fmt(target, 2)} = ${fmt(base, 2)} + ${fmt(rate, 2)}d$`, `$d = \\dfrac{${fmt(target - base, 2)}}{${fmt(rate, 2)}} = ${fmt(dist, 2)}$ km`],
    };
  },
});

// ---------------------------------------------------------------------------
// R3 — slope
// ---------------------------------------------------------------------------

const slopeFromGraph = skill({
  id: 'r3-slope-from-graph',
  name: 'Slope from a graph',
  description: 'Determine slope by counting rise and run on a graph.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-3',
  gen(rng) {
    let p: Pt;
    let q: Pt;
    do [p, q] = distinctPoints(rng, 6, 1);
    while (q[1] === p[1] || Math.abs(q[0] - p[0]) > 6);
    const m = slopeOf(p, q)!;
    return {
      prompt: 'Determine the slope of the line. Give a fraction in lowest terms if needed.',
      figure: { type: 'plane', grid: GRID, lines: [{ line: lineThrough(p, q) }], points: [{ x: p[0], y: p[1] }, { x: q[0], y: q[1] }] },
      parts: [numPart(m.n / m.d, { exact: false })],
      hints: ['Pick two points where the line crosses grid intersections (the marked points).', 'Slope $= \\dfrac{\\text{rise}}{\\text{run}}$. Going right, rise is positive up and negative down.'],
      solution: [`From $${P(p)}$ to $${P(q)}$: rise $= ${q[1] - p[1]}$, run $= ${q[0] - p[0]}$.`, `$m = \\dfrac{${q[1] - p[1]}}{${q[0] - p[0]}} = ${fracLatex(m)}$`],
    };
  },
});

const slopeTwoPoints = skill({
  id: 'r3-slope-two-points',
  name: 'Slope from two points',
  description: 'Use the slope formula, including zero and undefined slopes.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-3',
  gen(rng, d) {
    let p: Pt;
    let q: Pt;
    const special = d === 3 && rng.chance(0.4) ? rng.pick(['vertical', 'horizontal'] as const) : null;
    if (special === 'vertical') {
      const x = rng.int(-9, 9);
      p = [x, rng.int(-9, 9)];
      q = [x, p[1] + rng.nonZero(-8, 8)];
    } else if (special === 'horizontal') {
      const y = rng.int(-9, 9);
      p = [rng.int(-9, 9), y];
      q = [p[0] + rng.nonZero(-8, 8), y];
    } else {
      [p, q] = distinctPoints(rng, d === 1 ? 6 : 12, 1);
      while (q[1] === p[1]) q = [q[0], q[1] + 1];
    }
    const m = slopeOf(p, q);
    return {
      prompt: `Determine the slope of the line segment joining $${P(p)}$ and $${P(q)}$.${d === 3 ? ' If the slope is undefined, type "undefined".' : ''}`,
      parts: [m === null ? { answer: { kind: 'numeric', value: 0, undefinedValue: true } } : numPart(m.n / m.d, { exact: false })],
      hints: ['$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$', 'Subtract in the same order on the top and the bottom.'],
      solution: [
        `$m = \\dfrac{${q[1]} - (${p[1]})}{${q[0]} - (${p[0]})} = \\dfrac{${q[1] - p[1]}}{${q[0] - p[0]}}$`,
        m === null ? 'Division by zero: the slope of a vertical line is undefined.' : `$m = ${fracLatex(m)}$${m.n === 0 ? ' (a horizontal line has slope 0)' : ''}`,
      ],
    };
  },
});

const slopeClassify = skill({
  id: 'r3-slope-classify',
  name: 'Classifying slopes',
  description: 'Classify lines as having positive, negative, zero or undefined slope.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-3',
  format: 'mc',
  gen(rng) {
    const kind = rng.int(0, 3);
    const p = latticePoint(rng, 4);
    const line =
      kind === 0
        ? lineFromSlopePoint(frac(rng.int(1, 3), rng.pick([1, 2])), p)
        : kind === 1
          ? lineFromSlopePoint(frac(-rng.int(1, 3), rng.pick([1, 2])), p)
          : kind === 2
            ? { A: 0, B: 1, C: -p[1] }
            : { A: 1, B: 0, C: -p[0] };
    const names = ['Positive', 'Negative', 'Zero', 'Undefined'];
    return {
      prompt: 'How would you classify the slope of this line?',
      figure: { type: 'plane', grid: GRID, lines: [{ line }] },
      parts: [{ answer: fixedChoice(names, kind) }],
      hints: ['Read the line from left to right. Rising: positive. Falling: negative. Flat: zero. Vertical: undefined.'],
      solution: [['The line rises from left to right, so its slope is positive.', 'The line falls from left to right, so its slope is negative.', 'The line is horizontal: the rise is 0, so the slope is 0.', 'The line is vertical: the run is 0, so the slope is undefined.'][kind]],
    };
  },
});

const rateOfChange = skill({
  id: 'r3-rate-of-change',
  name: 'Slope as a rate of change',
  description: 'Interpret slope as a rate of change in context, with units.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-3',
  gen(rng, d) {
    const ctx = rng.pick([
      { what: 'A candle', y: 'height', u: 'cm', t: 'h', start: [25, 30], rate: [-2, -3, -1.5] },
      { what: 'A hiker', y: 'elevation', u: 'm', t: 'h', start: [800, 1200], rate: [150, 200, 250] },
      { what: 'A car’s gas tank', y: 'volume of fuel', u: 'L', t: 'h', start: [50, 60], rate: [-6, -8, -7.5] },
      { what: 'A savings account', y: 'balance', u: '$', t: 'week', start: [100, 300], rate: [25, 40, 15] },
    ]);
    const y0 = rng.int(ctx.start[0], ctx.start[1]);
    const r = rng.pick(ctx.rate);
    const t1 = rng.int(1, 3);
    const t2 = t1 + rng.int(2, 5);
    const ya = roundTo(y0 + r * t1, 2);
    const yb = roundTo(y0 + r * t2, 2);
    return {
      prompt: `${ctx.what} changes at a constant rate. After $${t1}$ ${ctx.t}, its ${ctx.y} is $${fmt(ya)}$ ${ctx.u}; after $${t2}$ ${ctx.t}, it is $${fmt(yb)}$ ${ctx.u}. What is the rate of change, in ${ctx.u} per ${ctx.t}?`,
      parts: [numPart(r, { suffix: `${ctx.u}/${ctx.t}`, exact: false })],
      hints: ['Rate of change $= \\dfrac{\\Delta y}{\\Delta t}$.', d >= 2 ? 'A decrease gives a negative rate.' : 'Subtract in the same order on top and bottom.'],
      solution: [`$\\dfrac{${fmt(yb)} - ${fmt(ya)}}{${t2} - ${t1}} = \\dfrac{${fmt(roundTo(yb - ya, 2))}}{${t2 - t1}} = ${fmt(r)}$ ${ctx.u}/${ctx.t}`, r < 0 ? `The ${ctx.y} decreases by $${fmt(-r)}$ ${ctx.u} each ${ctx.t}.` : `The ${ctx.y} increases by $${fmt(r)}$ ${ctx.u} each ${ctx.t}.`],
    };
  },
});

const findPoint = skill({
  id: 'r3-find-point',
  name: 'Using slope to find points',
  description: 'Determine another point on a line, or a missing coordinate, from a point and a slope.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-3',
  gen(rng, d) {
    const m = frac(rng.nonZero(-4, 4), rng.pick([1, 2, 3]));
    const p = latticePoint(rng, 6);
    if (d === 1) {
      const k = rng.pick([1, 2, -1]);
      const q: Pt = [p[0] + k * m.d, p[1] + k * m.n];
      return {
        prompt: `A line passes through $${P(p)}$ and has slope $${fracLatex(m)}$. Determine the coordinates of the point on the line with x-coordinate $${q[0]}$.`,
        parts: [part({ kind: 'point', x: q[0], y: q[1] }, { placeholder: '(x, y)' })],
        hints: [`Slope $${fracLatex(m)}$ means: for every run of $${m.d}$, the rise is $${m.n}$.`, `From $x = ${p[0]}$ to $x = ${q[0]}$ is a run of $${q[0] - p[0]}$.`],
        solution: [`Run $= ${q[0] - p[0]}$, so rise $= ${fracLatex(m)} \\times ${q[0] - p[0]} = ${q[1] - p[1]}$.`, `Point: $${P(q)}$`],
      };
    }
    const k = rng.nonZero(-3, 3);
    const q: Pt = [p[0] + k * m.d, p[1] + k * m.n];
    const missingX = rng.chance(0.5);
    return {
      prompt: missingX
        ? `The line through $${P(p)}$ and $(a, ${q[1]})$ has slope $${fracLatex(m)}$. Determine $a$.`
        : `The line through $${P(p)}$ and $(${q[0]}, b)$ has slope $${fracLatex(m)}$. Determine $b$.`,
      parts: [numPart(missingX ? q[0] : q[1], { label: missingX ? '$a =$' : '$b =$', exact: false })],
      hints: ['Substitute into the slope formula and solve for the unknown.', `$${fracLatex(m)} = \\dfrac{y_2 - y_1}{x_2 - x_1}$`],
      solution: missingX
        ? [`$${fracLatex(m)} = \\dfrac{${q[1]} - (${p[1]})}{a - (${p[0]})}$`, `$a - (${p[0]}) = ${q[1] - p[1]} \\div ${fracLatex(m)} = ${q[0] - p[0]}$`, `$a = ${q[0]}$`]
        : [`$${fracLatex(m)} = \\dfrac{b - (${p[1]})}{${q[0]} - (${p[0]})}$`, `$b - (${p[1]}) = ${fracLatex(m)} \\times ${q[0] - p[0]} = ${q[1] - p[1]}$`, `$b = ${q[1]}$`],
    };
  },
});

const drawLine = skill({
  id: 'r3-draw-line',
  name: 'Drawing a line from a point and slope',
  description: 'Draw a line given its slope and a point on the line.',
  outcomes: ['R3', 'R6'],
  lessonId: 'm10c-6-3',
  gen(rng, d) {
    const m = d === 1 ? frac(rng.nonZero(-3, 3)) : frac(rng.nonZero(-4, 4), rng.pick([1, 2, 3]));
    const p = latticePoint(rng, 4);
    const l = lineFromSlopePoint(m, p);
    return {
      prompt: `Draw the line that passes through $${P(p)}$ with slope $${fracLatex(m)}$. Place two points on the grid.`,
      parts: [part({ kind: 'graph-line', line: l, grid: GRID })],
      hints: [`Plot $${P(p)}$ first.`, `From there, move ${m.d} unit${m.d === 1 ? '' : 's'} right and ${Math.abs(m.n)} unit${Math.abs(m.n) === 1 ? '' : 's'} ${m.n > 0 ? 'up' : 'down'} to find a second point.`],
      solution: [`Start at $${P(p)}$.`, `Run $${m.d}$, rise $${m.n}$: second point $(${p[0] + m.d}, ${p[1] + m.n})$.`, 'Draw the line through both points.'],
    };
  },
});

const parallelPerpSlope = skill({
  id: 'r3-parallel-perp-slope',
  name: 'Slopes of parallel and perpendicular lines',
  description: 'State the slopes of lines parallel and perpendicular to a given line.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-4',
  gen(rng, d) {
    let m: Frac;
    let given = '';
    if (d === 1) {
      m = frac(rng.nonZero(-6, 6), rng.pick([1, 2, 3, 4, 5]));
      given = `a line with slope $${fracLatex(m)}$`;
    } else {
      const [p, q] = distinctPoints(rng, 8, 1);
      const mm = slopeOf(p, q)!;
      m = mm.n === 0 ? frac(1, 2) : mm;
      given = mm.n === 0 ? 'a line with slope $\\tfrac12$' : `the line through $${P(p)}$ and $${P(q)}$`;
    }
    const perp = perpendicularSlope(m)!;
    return {
      prompt: `For ${given}, determine the slope of a parallel line and the slope of a perpendicular line.`,
      parts: [numPart(m.n / m.d, { label: 'Parallel slope:', exact: false }), numPart(perp.n / perp.d, { label: 'Perpendicular slope:', exact: false })],
      hints: ['Parallel lines have equal slopes.', 'Perpendicular slopes are negative reciprocals: their product is $-1$.'],
      solution: [...(d > 1 ? [`Slope of the given line: $${fracLatex(m)}$`] : []), `Parallel: $${fracLatex(m)}$`, `Perpendicular: flip and change the sign: $${fracLatex(perp)}$. Check: $${fracLatex(m)} \\times ${fracLatex(perp)} = -1$.`],
    };
  },
});

const classifyPair = skill({
  id: 'r3-classify-pair',
  name: 'Parallel, perpendicular or neither',
  description: 'Decide whether two lines are parallel, perpendicular or neither.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-4',
  format: 'mc',
  gen(rng, d) {
    const kind = rng.pick(['parallel', 'perpendicular', 'neither'] as const);
    const m1 = frac(rng.nonZero(-5, 5), rng.pick([1, 2, 3]));
    let m2 = kind === 'parallel' ? m1 : kind === 'perpendicular' ? perpendicularSlope(m1)! : frac(m1.d * rng.pick([1, 2]), m1.n === 0 ? 1 : Math.abs(m1.n));
    if (kind === 'neither' && (m2.n * m1.d === m1.n * m2.d || m1.n * m2.n === -m1.d * m2.d)) m2 = frac(m1.n + 1, m1.d);
    const [p1] = distinctPoints(rng, 5);
    const [p2] = distinctPoints(rng, 5);
    const ptsFor = (m: Frac, p: Pt): [Pt, Pt] => [p, [p[0] + m.d, p[1] + m.n]];
    const [a1, b1] = ptsFor(m1, p1);
    const [a2, b2] = ptsFor(m2, p2);
    const prompt =
      d === 1
        ? `Line 1 has slope $${fracLatex(m1)}$ and line 2 has slope $${fracLatex(m2)}$. Are the lines parallel, perpendicular, or neither?`
        : `Line 1 passes through $${P(a1)}$ and $${P(b1)}$. Line 2 passes through $${P(a2)}$ and $${P(b2)}$. Are the lines parallel, perpendicular, or neither?`;
    const idx = { parallel: 0, perpendicular: 1, neither: 2 }[kind];
    return {
      prompt,
      parts: [{ answer: fixedChoice(['Parallel', 'Perpendicular', 'Neither'], idx) }],
      hints: ['Compare the slopes.', 'Equal slopes: parallel. Product of slopes is $-1$: perpendicular.'],
      solution: [`$m_1 = ${fracLatex(m1)}$, $m_2 = ${fracLatex(m2)}$`, kind === 'parallel' ? 'The slopes are equal, so the lines are parallel (or the same line).' : kind === 'perpendicular' ? `$m_1 m_2 = -1$, so the lines are perpendicular.` : 'The slopes are not equal and are not negative reciprocals, so the lines are neither.'],
    };
  },
});

const ppUnknown = skill({
  id: 'r3-pp-unknown',
  name: 'Unknowns with parallel and perpendicular lines',
  description: 'Find an unknown coordinate so that two lines are parallel or perpendicular.',
  outcomes: ['R3'],
  lessonId: 'm10c-6-4',
  gen(rng) {
    const m = frac(rng.nonZero(-4, 4), rng.pick([1, 2, 3]));
    const want = rng.pick(['parallel', 'perpendicular'] as const);
    const target = want === 'parallel' ? m : perpendicularSlope(m)!;
    const p: Pt = latticePoint(rng, 6);
    const k = rng.nonZero(-2, 2);
    const q: Pt = [p[0] + k * target.d, p[1] + k * target.n];
    return {
      prompt: `Line 1 has slope $${fracLatex(m)}$. Line 2 passes through $${P(p)}$ and $(${q[0]}, k)$. Determine $k$ so that the lines are ${want}.`,
      parts: [numPart(q[1], { label: '$k =$', exact: false })],
      hints: [want === 'parallel' ? `Line 2 needs slope $${fracLatex(m)}$.` : `Line 2 needs slope $${fracLatex(target)}$ (the negative reciprocal).`, 'Set the slope formula equal to that slope and solve for $k$.'],
      solution: [`Required slope: $${fracLatex(target)}$`, `$\\dfrac{k - (${p[1]})}{${q[0]} - (${p[0]})} = ${fracLatex(target)}$`, `$k - (${p[1]}) = ${q[1] - p[1]}$, so $k = ${q[1]}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// R10 — distance and midpoint
// ---------------------------------------------------------------------------

function radicalTex(n: number): string {
  if (isPerfectSquare(n)) return `${Math.round(Math.sqrt(n))}`;
  const { outside, inside } = radicalSplit(n, 2);
  return `${outside === 1 ? '' : outside}\\sqrt{${inside}}`;
}

const distance = skill({
  id: 'r10-distance',
  name: 'Distance between two points',
  description: 'Determine the distance between two points using the distance formula (Pythagorean theorem).',
  outcomes: ['R10'],
  lessonId: 'm10c-6-5',
  gen(rng, d) {
    let p: Pt;
    let q: Pt;
    if (d === 1) {
      const [a, b] = rng.pick([
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
        [8, 6, 10],
        [4, 3, 5],
        [12, 5, 13],
      ]);
      p = latticePoint(rng, 5);
      q = [p[0] + rng.sign() * a, p[1] + rng.sign() * b];
    } else {
      [p, q] = distinctPoints(rng, d === 2 ? 7 : 12, 1);
    }
    const sq = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2;
    const dist = Math.sqrt(sq);
    return {
      prompt: `Determine the distance between $${P(p)}$ and $${P(q)}$. Give an exact answer (e.g. 2√13) or round to the nearest tenth.`,
      parts: [numPart(dist, { tolerance: 0.051, exact: true })],
      hints: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$', 'This is the Pythagorean theorem: the horizontal and vertical changes are the legs of a right triangle.'],
      solution: [`$d = \\sqrt{(${q[0]} - (${p[0]}))^2 + (${q[1]} - (${p[1]}))^2} = \\sqrt{${(q[0] - p[0]) ** 2} + ${(q[1] - p[1]) ** 2}} = \\sqrt{${sq}}$`, `$d = ${radicalTex(sq)}${isPerfectSquare(sq) ? '' : ` \\approx ${fmt(dist, 1)}`}$`],
      answerDisplay: `$${radicalTex(sq)}${isPerfectSquare(sq) ? '' : ` \\approx ${fmt(dist, 1)}`}$`,
    };
  },
});

const midpointSkill = skill({
  id: 'r10-midpoint',
  name: 'Midpoint of a line segment',
  description: 'Determine the midpoint of a line segment.',
  outcomes: ['R10'],
  lessonId: 'm10c-6-5',
  gen(rng, d) {
    let p: Pt;
    let q: Pt;
    do [p, q] = distinctPoints(rng, d === 1 ? 8 : 12, 0);
    while (d === 1 && ((p[0] + q[0]) % 2 !== 0 || (p[1] + q[1]) % 2 !== 0));
    const M: Pt = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    return {
      prompt: `Determine the midpoint of the line segment with endpoints $${P(p)}$ and $${P(q)}$.`,
      parts: [part({ kind: 'point', x: M[0], y: M[1] }, { placeholder: '(x, y)' })],
      hints: ['$M = \\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$ — average the x-coordinates and average the y-coordinates.'],
      solution: [`$M = \\left(\\dfrac{${p[0]} + (${q[0]})}{2}, \\dfrac{${p[1]} + (${q[1]})}{2}\\right) = (${fmt(M[0])}, ${fmt(M[1])})$`],
    };
  },
});

const endpoint = skill({
  id: 'r10-endpoint',
  name: 'Finding an endpoint',
  description: 'Determine an endpoint of a segment given the midpoint and the other endpoint.',
  outcomes: ['R10'],
  lessonId: 'm10c-6-5',
  gen(rng, d) {
    const [p, M] = distinctPoints(rng, d === 1 ? 5 : 9, 0);
    const q: Pt = [2 * M[0] - p[0], 2 * M[1] - p[1]];
    return {
      prompt: `$M${P(M)}$ is the midpoint of $\\overline{AB}$. If $A$ is $${P(p)}$, determine the coordinates of $B$.`,
      parts: [part({ kind: 'point', x: q[0], y: q[1] }, { placeholder: '(x, y)' })],
      hints: ['Going from $A$ to $M$ is the same move as going from $M$ to $B$.', 'Or solve $\\dfrac{x_A + x_B}{2} = x_M$ for $x_B$, and similarly for $y_B$.'],
      solution: [`From $A$ to $M$: $x$ changes by $${M[0] - p[0]}$, $y$ changes by $${M[1] - p[1]}$.`, `Apply the same change to $M$: $B = (${M[0]} + (${M[0] - p[0]}), ${M[1]} + (${M[1] - p[1]})) = ${P(q)}$`],
    };
  },
});

const applications = skill({
  id: 'r10-applications',
  name: 'Distance and midpoint problems',
  description: 'Solve geometry problems: classify triangles, find perimeters, centres and lengths.',
  outcomes: ['R10'],
  lessonId: 'm10c-6-5',
  gen(rng, d) {
    const kind = byDifficulty(d, 'perimeter', rng.pick(['classify', 'centre'] as const), rng.pick(['classify', 'radius'] as const));
    if (kind === 'perimeter') {
      const x0 = rng.int(-6, 0);
      const y0 = rng.int(-6, 0);
      const w = rng.int(2, 7);
      const h = rng.int(2, 7);
      const A: Pt = [x0, y0];
      const B: Pt = [x0 + w, y0];
      const C: Pt = [x0 + w, y0 + h];
      const per = w + h + Math.hypot(w, h);
      return {
        prompt: `Determine the perimeter of $\\triangle ABC$ with $A${P(A)}$, $B${P(B)}$ and $C${P(C)}$, to the nearest tenth.`,
        figure: { type: 'plane', grid: GRID, segments: [{ from: A, to: B }, { from: B, to: C }, { from: C, to: A }], points: [{ x: A[0], y: A[1], label: 'A' }, { x: B[0], y: B[1], label: 'B' }, { x: C[0], y: C[1], label: 'C' }] },
        parts: [numPart(per, { decimals: 1 })],
        hints: ['Find the length of each side and add them.', '$AB$ and $BC$ are horizontal and vertical; use the distance formula for $AC$.'],
        solution: [`$AB = ${w}$, $BC = ${h}$, $AC = \\sqrt{${w}^2 + ${h}^2} = \\sqrt{${w * w + h * h}} \\approx ${fmt(Math.hypot(w, h), 2)}$`, `Perimeter $\\approx ${fmt(per, 1)}$`],
      };
    }
    if (kind === 'centre' || kind === 'radius') {
      const C: Pt = latticePoint(rng, 4);
      const [dx, dy] = rng.pick([
        [3, 4],
        [5, 0],
        [0, 6],
        [4, 3],
        [6, 8],
        [2, 5],
        [1, 3],
      ]);
      const A: Pt = [C[0] - dx, C[1] - dy];
      const B: Pt = [C[0] + dx, C[1] + dy];
      if (kind === 'centre') {
        return {
          prompt: `$\\overline{AB}$ is a diameter of a circle, with $A${P(A)}$ and $B${P(B)}$. Determine the centre of the circle.`,
          parts: [part({ kind: 'point', x: C[0], y: C[1] }, { placeholder: '(x, y)' })],
          hints: ['The centre of a circle is the midpoint of any diameter.'],
          solution: [`Centre $= \\left(\\dfrac{${A[0]} + ${B[0]}}{2}, \\dfrac{${A[1]} + ${B[1]}}{2}\\right) = ${P(C)}$`],
        };
      }
      const r2 = dx * dx + dy * dy;
      return {
        prompt: `$\\overline{AB}$ is a diameter of a circle, with $A${P(A)}$ and $B${P(B)}$. Determine the radius of the circle (exact or to the nearest tenth).`,
        parts: [numPart(Math.sqrt(r2), { tolerance: 0.051, exact: true })],
        hints: ['Find the centre (midpoint), then the distance from the centre to $A$. Or halve the length of $AB$.'],
        solution: [`Centre $${P(C)}$.`, `$r = \\sqrt{(${A[0]} - (${C[0]}))^2 + (${A[1]} - (${C[1]}))^2} = \\sqrt{${r2}} = ${radicalTex(r2)}$`],
      };
    }
    // classify
    for (let tries = 0; tries < 100; tries++) {
      const type = rng.pick(['isosceles', 'scalene', 'right'] as const);
      let A: Pt = [0, 0];
      let B: Pt = [0, 0];
      let C: Pt = [0, 0];
      const o = latticePoint(rng, 3);
      if (type === 'isosceles') {
        const h = rng.int(2, 6);
        const w = rng.int(1, 4);
        A = [o[0] - w, o[1]];
        B = [o[0] + w, o[1]];
        C = [o[0], o[1] + h];
      } else if (type === 'right') {
        const a = rng.int(1, 4);
        const b = rng.int(1, 4);
        A = o;
        B = [o[0] + a, o[1] + b];
        C = [o[0] - b * 2, o[1] + a * 2];
      } else {
        A = o;
        B = [o[0] + rng.int(3, 6), o[1] + rng.int(-1, 1)];
        C = [o[0] + rng.int(1, 2), o[1] + rng.int(3, 6)];
      }
      const d2 = (p: Pt, q: Pt) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
      const s = [d2(A, B), d2(B, C), d2(C, A)].sort((x, y) => x - y);
      const isRight = s[0] + s[1] === s[2];
      const isIso = s[0] === s[1] || s[1] === s[2];
      if (type === 'isosceles' && (!isIso || isRight)) continue;
      if (type === 'scalene' && (isIso || isRight)) continue;
      if (type === 'right' && (!isRight || isIso)) continue;
      const idx = { isosceles: 0, scalene: 1, right: 2 }[type];
      return {
        prompt: `$\\triangle ABC$ has vertices $A${P(A)}$, $B${P(B)}$ and $C${P(C)}$. Which best describes the triangle?`,
        parts: [{ answer: fixedChoice(['Isosceles (two equal sides)', 'Scalene (no equal sides), not right', 'Right triangle, with no equal sides'], idx) }],
        hints: ['Find the length of each side (squares of lengths are enough to compare).', 'Right triangle: the squares of the two shorter sides add to the square of the longest side.'],
        solution: [`$AB^2 = ${d2(A, B)}$, $BC^2 = ${d2(B, C)}$, $CA^2 = ${d2(C, A)}$`, type === 'isosceles' ? 'Two sides are equal, so the triangle is isosceles.' : type === 'right' ? `$${s[0]} + ${s[1]} = ${s[2]}$, so it is a right triangle.` : 'No sides are equal and the Pythagorean relationship does not hold, so it is scalene (not right).'],
      };
    }
    throw new Error('classify');
  },
});

export const LINEAR_SKILLS: SkillDef[] = [
  isLinearTable,
  isLinearEquation,
  rateTable,
  interceptsEq,
  interceptsGraph,
  domainRangeLinear,
  contextSkill,
  slopeFromGraph,
  slopeTwoPoints,
  slopeClassify,
  rateOfChange,
  findPoint,
  drawLine,
  parallelPerpSlope,
  classifyPair,
  ppUnknown,
  distance,
  midpointSkill,
  endpoint,
  applications,
];
