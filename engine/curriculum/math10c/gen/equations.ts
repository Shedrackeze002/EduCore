/** Unit 7 — Equations of Linear Relations (R6, R7). */
import { byDifficulty, mc, mcFigures, multi, numPart, part, skill } from '../../helpers.ts';
import { type Frac, frac, fracLatex, fracMul, fracSub, fmt } from '../../../math/numbers.ts';
import {
  type Pt,
  coefX,
  generalLatex,
  lineFromSlopeIntercept,
  lineFromSlopePoint,
  lineSlope,
  lineThrough,
  lineXIntercept,
  lineYIntercept,
  normalizeLine,
  perpendicularSlope,
  signedFracLatex,
  slopeInterceptLatex,
  slopeOf,
  slopePointLatex,
} from '../../../math/linear.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Line, LineForm, PlaneFigure, SkillDef } from '../../../types.ts';

const GRID: GridSpec = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };
const P = (p: Pt) => `(${p[0]}, ${p[1]})`;
const TYPE_HINT = 'Type equations like y = 2/3x - 4, y - 1 = -2(x + 3) or 2x - 3y + 6 = 0.';

function niceSlope(rng: Rng, maxDen = 3, maxNum = 5): Frac {
  return frac(rng.nonZero(-maxNum, maxNum), rng.int(1, maxDen));
}

function formName(f: LineForm) {
  return f === 'slope-intercept' ? 'slope-intercept form' : f === 'general' ? 'general form' : f === 'slope-point' ? 'slope-point form' : 'any form';
}

function formHint(f: LineForm): string {
  return f === 'slope-intercept'
    ? 'Slope-intercept form: $y = mx + b$.'
    : f === 'general'
      ? 'General form: $Ax + By + C = 0$, where $A$ is a whole number and $B$ and $C$ are integers.'
      : f === 'slope-point'
        ? 'Slope-point form: $y - y_1 = m(x - x_1)$.'
        : 'Any correct form is accepted.';
}

/** Convert y = mx + b to general form steps. */
function toGeneralSteps(m: Frac, b: Frac): string[] {
  const l = lineFromSlopeIntercept(m, b);
  const L = Math.abs(m.d * b.d);
  return [
    `Start: $${slopeInterceptLatex(m, b)}$`,
    ...(L > 1 ? [`Multiply every term by $${L}$ to clear fractions.`] : []),
    'Move all terms to one side so the right side is 0, and make the $x$-coefficient positive.',
    `$${generalLatex(l)}$`,
  ];
}

function lineWithIntInterceptOnGrid(rng: Rng): { m: Frac; b: Frac; l: Line } {
  for (;;) {
    const m = niceSlope(rng, 3, 4);
    const b = frac(rng.int(-6, 6));
    // need a second lattice point within the grid
    const x2 = m.d * rng.pick([1, 2, -1, -2]);
    const y2 = b.n + (m.n * x2) / m.d;
    if (Math.abs(x2) <= 7 && Math.abs(y2) <= 7) return { m, b, l: lineFromSlopeIntercept(m, b) };
  }
}

// ---------------------------------------------------------------------------

const identifyMB = skill({
  id: 'r6-identify-mb',
  name: 'Slope and y-intercept from an equation',
  description: 'Identify the slope and y-intercept from y = mx + b, rearranging if needed.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-1',
  gen(rng, d) {
    const m = d === 1 ? frac(rng.nonZero(-9, 9)) : niceSlope(rng, 4, 7);
    const b = frac(rng.int(-12, 12));
    let tex = slopeInterceptLatex(m, b);
    let steps: string[] = [];
    if (d === 3) {
      // A x + B y = C with B != ±1
      const l = lineFromSlopeIntercept(m, b);
      const k = rng.pick([2, 3, -2]);
      const A = l.A * k;
      const B = l.B * k;
      const C = -l.C * k;
      tex = `${A === 1 ? '' : A === -1 ? '-' : A}x ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}y = ${C}`;
      steps = [`Isolate $y$: $${B === 1 ? '' : B === -1 ? '-' : B}y = ${-A}x ${C < 0 ? '-' : '+'} ${Math.abs(C)}$`, `Divide by $${B}$: $${slopeInterceptLatex(m, b)}$`];
    }
    return {
      prompt: `Determine the slope and the y-intercept of $${tex}$.`,
      parts: [numPart(m.n / m.d, { label: 'Slope $m =$', exact: false }), numPart(b.n / b.d, { label: 'y-intercept $b =$', exact: false })],
      hints: d === 3 ? ['Rearrange into $y = mx + b$ first: isolate $y$.', 'Then $m$ is the coefficient of $x$ and $b$ is the constant.'] : ['In $y = mx + b$, $m$ is the coefficient of $x$ and $b$ is the constant term (including its sign).'],
      solution: [...steps, `$m = ${fracLatex(m)}$ and $b = ${fracLatex(b)}$.`],
    };
  },
});

const graphSI = skill({
  id: 'r6-graph-slope-intercept',
  name: 'Graphing y = mx + b',
  description: 'Graph a line from its slope-intercept equation.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-1',
  gen(rng) {
    const { m, b, l } = lineWithIntInterceptOnGrid(rng);
    return {
      prompt: `Graph $${slopeInterceptLatex(m, b)}$ by placing two points on the line.`,
      parts: [part({ kind: 'graph-line', line: l, grid: GRID })],
      hints: [`Start at the y-intercept $(0, ${b.n})$.`, `Use the slope $${fracLatex(m)}$: run $${m.d}$, rise $${m.n}$.`],
      solution: [`Plot $(0, ${b.n})$.`, `Move right $${m.d}$ and ${m.n > 0 ? 'up' : 'down'} $${Math.abs(m.n)}$: $(${m.d}, ${b.n + m.n})$.`, 'Draw the line through the two points.'],
    };
  },
});

const equationFromGraph = skill({
  id: 'r7-equation-from-graph',
  name: 'Equation from a graph',
  description: 'Determine the slope and y-intercept from a graph and write y = mx + b.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-1',
  gen(rng, d) {
    if (d === 3 && rng.chance(0.4)) {
      const horiz = rng.chance(0.5);
      const k = rng.nonZero(-6, 6);
      const l: Line = horiz ? { A: 0, B: 1, C: -k } : { A: 1, B: 0, C: -k };
      return {
        prompt: 'Write the equation of the line.',
        figure: { type: 'plane', grid: GRID, lines: [{ line: l }] },
        parts: [part({ kind: 'line', line: l, form: 'any' }, { placeholder: horiz ? 'y = ...' : 'x = ...' })],
        hints: [horiz ? 'Every point on this line has the same y-coordinate.' : 'Every point on this line has the same x-coordinate.'],
        solution: [horiz ? `The line is horizontal: $y = ${k}$ (slope 0).` : `The line is vertical: $x = ${k}$ (undefined slope).`],
      };
    }
    const { m, b, l } = lineWithIntInterceptOnGrid(rng);
    return {
      prompt: `Write the equation of the line in slope-intercept form. ${TYPE_HINT}`,
      figure: { type: 'plane', grid: GRID, lines: [{ line: l }] },
      parts: [part({ kind: 'line', line: l, form: 'slope-intercept' }, { placeholder: 'y = mx + b' })],
      hints: ['Read the y-intercept where the line crosses the y-axis.', 'Count rise over run between two grid points to get the slope.'],
      solution: [`y-intercept: $b = ${b.n}$`, `Slope: $m = ${fracLatex(m)}$`, `$${slopeInterceptLatex(m, b)}$`],
      answerDisplay: `$${slopeInterceptLatex(m, b)}$`,
    };
  },
});

const slopePointIdentify = skill({
  id: 'r6-slope-point-identify',
  name: 'Reading slope-point form',
  description: 'Identify the slope and a point on the line from slope-point form.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-2',
  gen(rng, d) {
    const m = d === 1 ? frac(rng.nonZero(-6, 6)) : niceSlope(rng, 4, 6);
    const p: Pt = [rng.nonZero(-9, 9), rng.nonZero(-9, 9)];
    return {
      prompt: `For $${slopePointLatex(m, p)}$, state the slope and the point used to write the equation.`,
      parts: [numPart(m.n / m.d, { label: 'Slope:', exact: false }), part({ kind: 'point', x: p[0], y: p[1] }, { label: 'Point:', placeholder: '(x, y)' })],
      hints: ['Compare with $y - y_1 = m(x - x_1)$.', 'Watch the signs: $x + 3$ means $x - (-3)$, so $x_1 = -3$.'],
      solution: [`$m = ${fracLatex(m)}$`, `$x - x_1 = x ${p[0] < 0 ? '+' : '-'} ${Math.abs(p[0])}$ gives $x_1 = ${p[0]}$; $y - y_1 = y ${p[1] < 0 ? '+' : '-'} ${Math.abs(p[1])}$ gives $y_1 = ${p[1]}$.`, `Point: $${P(p)}$`],
    };
  },
});

const graphSP = skill({
  id: 'r6-graph-slope-point',
  name: 'Graphing slope-point form',
  description: 'Graph a line from its slope-point equation.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-2',
  gen(rng) {
    const m = niceSlope(rng, 3, 4);
    const p: Pt = [rng.int(-5, 5), rng.int(-5, 5)];
    const l = lineFromSlopePoint(m, p);
    return {
      prompt: `Graph $${slopePointLatex(m, p)}$ by placing two points on the line.`,
      parts: [part({ kind: 'graph-line', line: l, grid: GRID })],
      hints: [`The equation tells you a point: $${P(p)}$.`, `From there use the slope $${fracLatex(m)}$.`],
      solution: [`Plot $${P(p)}$.`, `Run $${m.d}$, rise $${m.n}$: $(${p[0] + m.d}, ${p[1] + m.n})$.`, 'Draw the line through them.'],
    };
  },
});

function lineAnswerSteps(m: Frac, p: Pt, form: LineForm): string[] {
  const b = fracSub(frac(p[1]), fracMul(m, frac(p[0])));
  const sp = `$${slopePointLatex(m, p)}$`;
  if (form === 'slope-point' || form === 'any') return [`Substitute into $y - y_1 = m(x - x_1)$: ${sp}`];
  if (form === 'slope-intercept') return [`Slope-point form: ${sp}`, 'Expand and isolate $y$:', `$${slopeInterceptLatex(m, b)}$`];
  return [`Slope-point form: ${sp}`, ...toGeneralSteps(m, b)];
}

function finalLatex(m: Frac, p: Pt, form: LineForm): string {
  const b = fracSub(frac(p[1]), fracMul(m, frac(p[0])));
  if (form === 'slope-intercept') return slopeInterceptLatex(m, b);
  if (form === 'general') return generalLatex(lineFromSlopeIntercept(m, b));
  return slopePointLatex(m, p);
}

const fromSlopePoint = skill({
  id: 'r7-from-slope-point',
  name: 'Equation from a point and the slope',
  description: 'Write the equation of a line given its slope and a point on it.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-2',
  gen(rng, d) {
    const m = niceSlope(rng, d === 1 ? 1 : 4, 6);
    const p: Pt = [rng.int(-9, 9), rng.int(-9, 9)];
    const form: LineForm = byDifficulty(d, 'slope-point', 'slope-intercept', 'general');
    const l = lineFromSlopePoint(m, p);
    return {
      prompt: `Write the equation of the line with slope $${fracLatex(m)}$ through $${P(p)}$, in **${formName(form)}**. ${TYPE_HINT}`,
      parts: [part({ kind: 'line', line: l, form })],
      hints: ['Start with slope-point form: $y - y_1 = m(x - x_1)$.', formHint(form)],
      solution: lineAnswerSteps(m, p, form),
      answerDisplay: `$${finalLatex(m, p, form)}$`,
    };
  },
});

const fromTwoPoints = skill({
  id: 'r7-from-two-points',
  name: 'Equation from two points',
  description: 'Write the equation of a line given two points on it.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-2',
  gen(rng, d) {
    let p: Pt;
    let q: Pt;
    do {
      p = [rng.int(-8, 8), rng.int(-8, 8)];
      q = [rng.int(-8, 8), rng.int(-8, 8)];
    } while (p[0] === q[0] || p[1] === q[1]);
    const m = slopeOf(p, q)!;
    const form: LineForm = byDifficulty(d, 'any', 'slope-intercept', 'general');
    const l = lineThrough(p, q);
    return {
      prompt: `Write the equation of the line through $${P(p)}$ and $${P(q)}$${form === 'any' ? '' : `, in **${formName(form)}**`}. ${TYPE_HINT}`,
      parts: [part({ kind: 'line', line: l, form })],
      hints: ['First find the slope: $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$.', 'Then use either point in $y - y_1 = m(x - x_1)$.', formHint(form)],
      solution: [`$m = \\dfrac{${q[1]} - (${p[1]})}{${q[0]} - (${p[0]})} = ${fracLatex(m)}$`, ...lineAnswerSteps(m, p, form === 'any' ? 'slope-point' : form)],
      answerDisplay: `$${finalLatex(m, p, form === 'any' ? 'slope-intercept' : form)}$`,
    };
  },
});

const toGeneral = skill({
  id: 'r6-to-general',
  name: 'Writing equations in general form',
  description: 'Rewrite a linear equation in general form Ax + By + C = 0.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-3',
  gen(rng, d) {
    const m = d === 1 ? frac(rng.nonZero(-6, 6)) : niceSlope(rng, 5, 7);
    const b = d === 3 ? frac(rng.nonZero(-9, 9), rng.pick([2, 3, 4])) : frac(rng.int(-9, 9));
    const fromSP = d >= 2 && rng.chance(0.4);
    const p: Pt = [rng.int(-5, 5), 0];
    p[1] = Math.round((m.n * p[0]) / m.d + b.n / b.d);
    const usedM = m;
    const usedB = fromSP ? fracSub(frac(p[1]), fracMul(m, frac(p[0]))) : b;
    const l = lineFromSlopeIntercept(usedM, usedB);
    const given = fromSP ? slopePointLatex(usedM, p) : slopeInterceptLatex(usedM, usedB);
    return {
      prompt: `Write $${given}$ in general form. ${TYPE_HINT}`,
      parts: [part({ kind: 'line', line: l, form: 'general' }, { placeholder: 'Ax + By + C = 0' })],
      hints: ['Clear any fractions by multiplying every term by the common denominator.', 'Move all terms to the left side so the right side is 0.', 'Make sure the $x$-term is positive (multiply by $-1$ if necessary).'],
      solution: fromSP ? [`Expand: $y ${p[1] < 0 ? '+' : '-'} ${Math.abs(p[1])} = ${coefX(usedM)}${signedFracLatex(fracMul(usedM, frac(-p[0])))}$`, ...toGeneralSteps(usedM, usedB)] : toGeneralSteps(usedM, usedB),
      answerDisplay: `$${generalLatex(l)}$`,
    };
  },
});

const generalToSI = skill({
  id: 'r6-general-to-si',
  name: 'General form to slope-intercept form',
  description: 'Rewrite an equation from general form into slope-intercept form.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-3',
  gen(rng, d) {
    let l: Line;
    do {
      const A = rng.int(1, d === 1 ? 4 : 8);
      const B = d === 1 ? rng.pick([1, -1]) : rng.nonZero(-6, 6);
      const C = rng.int(-12, 12);
      l = normalizeLine({ A, B, C });
    } while (l.B === 0);
    const m = lineSlope(l)!;
    const b = lineYIntercept(l)!;
    return {
      prompt: `Write $${generalLatex(l)}$ in slope-intercept form. ${TYPE_HINT}`,
      parts: [part({ kind: 'line', line: l, form: 'slope-intercept' }, { placeholder: 'y = mx + b' })],
      hints: ['Move the $x$-term and the constant to the right side.', 'Divide every term by the coefficient of $y$.'],
      solution: [`$${l.B === 1 ? '' : l.B === -1 ? '-' : l.B}y = ${-l.A}x ${-l.C < 0 ? '-' : '+'} ${Math.abs(l.C)}$`, `$${slopeInterceptLatex(m, b)}$`],
      answerDisplay: `$${slopeInterceptLatex(m, b)}$`,
    };
  },
});

const generalFeatures = skill({
  id: 'r6-general-features',
  name: 'Features from general form',
  description: 'Determine the slope and intercepts of a line given in general form.',
  outcomes: ['R6', 'R5'],
  lessonId: 'm10c-7-3',
  gen(rng, d) {
    let l: Line;
    do l = normalizeLine({ A: rng.int(1, 9), B: rng.nonZero(-9, 9), C: rng.nonZero(-18, 18) });
    while (l.B === 0 || l.A === 0);
    const m = lineSlope(l)!;
    const xi = lineXIntercept(l)!;
    const yi = lineYIntercept(l)!;
    const parts =
      d === 1
        ? [numPart(m.n / m.d, { label: 'Slope:', exact: false })]
        : [numPart(m.n / m.d, { label: 'Slope:', exact: false }), numPart(xi.n / xi.d, { label: 'x-intercept:', exact: false }), numPart(yi.n / yi.d, { label: 'y-intercept:', exact: false })];
    return {
      prompt: d === 1 ? `Determine the slope of $${generalLatex(l)}$.` : `For $${generalLatex(l)}$, determine the slope, the x-intercept and the y-intercept.`,
      parts,
      hints: ['For $Ax + By + C = 0$, the slope is $m = -\\dfrac{A}{B}$.', 'For intercepts, set the other variable to 0.'],
      solution: [`$m = -\\dfrac{${l.A}}{${l.B}} = ${fracLatex(m)}$`, `x-intercept ($y = 0$): $x = ${fracLatex(xi)}$`, `y-intercept ($x = 0$): $y = ${fracLatex(yi)}$`],
    };
  },
});

const equivalent = skill({
  id: 'r6-equivalent',
  name: 'Equivalent linear relations',
  description: 'Identify linear relations that are equivalent even though they are written in different forms.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-3',
  format: 'mc',
  gen(rng) {
    const m = niceSlope(rng, 2, 4);
    const b = frac(rng.int(-6, 6));
    const l = lineFromSlopeIntercept(m, b);
    const p1: Pt = [m.d, b.n + m.n];
    const p2: Pt = [-m.d * 2, b.n - 2 * m.n];
    const good = [`$${slopeInterceptLatex(m, b)}$`, `$${generalLatex(l)}$`, `$${slopePointLatex(m, p1)}$`, `$${slopePointLatex(m, p2)}$`];
    const bad = [
      `$${slopeInterceptLatex(m, frac(-b.n || 3))}$`,
      `$${slopeInterceptLatex(perpendicularSlope(m)!, b)}$`,
      `$${slopePointLatex(m, [-p1[0], p1[1]])}$`,
      `$${generalLatex({ A: l.A, B: -l.B, C: l.C })}$`,
    ];
    const opts = [...rng.sample(good, 3).map((md) => ({ md, correct: true })), ...rng.sample(bad, 2).map((md) => ({ md, correct: false }))];
    const first = opts.shift()!;
    return {
      prompt: `Select **all** equations that are equivalent to ${first.md}.`,
      parts: [{ answer: multi(rng, opts) }],
      hints: ['Rewrite each equation in slope-intercept form and compare the slope and y-intercept.', 'Equivalent equations describe exactly the same line.'],
      solution: [`${first.md} is the line $${slopeInterceptLatex(m, b)}$.`, ...opts.map((o) => `${o.md}: ${o.correct ? 'equivalent' : 'not equivalent'}`)],
    };
  },
});

const matchGraph = skill({
  id: 'r6-match-graph',
  name: 'Matching equations to graphs',
  description: 'Match a linear equation in any form to its graph.',
  outcomes: ['R6'],
  lessonId: 'm10c-7-3',
  format: 'mc',
  gen(rng, d) {
    const { m, b, l } = lineWithIntInterceptOnGrid(rng);
    const variants: Line[] = [l, lineFromSlopeIntercept(frac(-m.n, m.d), b), lineFromSlopeIntercept(m, frac(b.n === 0 ? 3 : -b.n)), lineFromSlopeIntercept(frac(m.d * Math.sign(m.n), Math.abs(m.n)), b)];
    const keys = new Set<string>();
    const uniq = variants.filter((v) => {
      const k = JSON.stringify(normalizeLine(v));
      if (keys.has(k)) return false;
      keys.add(k);
      return true;
    });
    for (let k = 1; uniq.length < 4 && k < 40; k++) {
      const extra = lineFromSlopeIntercept(k % 2 ? m : frac(-m.n, m.d), frac(b.n + (k % 2 ? k : -k)));
      const key = JSON.stringify(normalizeLine(extra));
      if (!keys.has(key)) {
        keys.add(key);
        uniq.push(extra);
      }
    }
    const fig = (line: Line): PlaneFigure => ({ type: 'plane', grid: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }, lines: [{ line }] });
    const shown = byDifficulty(d, slopeInterceptLatex(m, b), generalLatex(l), slopePointLatex(m, [m.d, b.n + m.n]));
    const answer = mcFigures(rng, uniq.slice(0, 4).map((v, i) => ({ md: '', figure: fig(v), correct: i === 0 })));
    if (answer.kind === 'mc') answer.choices.forEach((c, i) => (c.md = `Graph ${i + 1}`));
    return {
      prompt: `Which graph represents $${shown}$?`,
      parts: [{ answer }],
      hints: ['Find the slope and the y-intercept from the equation.', 'Check the y-intercept first, then the direction (rising or falling) and steepness.'],
      solution: [`Slope $${fracLatex(m)}$, y-intercept $${b.n}$.`, `The correct graph crosses the y-axis at $(0, ${b.n})$ and ${m.n > 0 ? 'rises' : 'falls'} with slope $${fracLatex(m)}$.`],
    };
  },
});

const parallelPerpEq = skill({
  id: 'r7-parallel-perp-equation',
  name: 'Equations of parallel and perpendicular lines',
  description: 'Write the equation of a line through a point, parallel or perpendicular to a given line.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-4',
  gen(rng, d) {
    const m0 = niceSlope(rng, 3, 5);
    const b0 = frac(rng.int(-6, 6));
    const given = lineFromSlopeIntercept(m0, b0);
    const want = rng.pick(['parallel', 'perpendicular'] as const);
    const m = want === 'parallel' ? m0 : perpendicularSlope(m0)!;
    const p: Pt = [rng.int(-6, 6), rng.int(-6, 6)];
    const l = lineFromSlopePoint(m, p);
    const form: LineForm = byDifficulty(d, 'any', 'slope-intercept', 'general');
    const givenTex = d === 1 ? slopeInterceptLatex(m0, b0) : generalLatex(given);
    return {
      prompt: `Write the equation of the line through $${P(p)}$ that is **${want}** to $${givenTex}$${form === 'any' ? '' : `, in **${formName(form)}**`}. ${TYPE_HINT}`,
      parts: [part({ kind: 'line', line: l, form })],
      hints: [d === 1 ? 'Read the slope of the given line.' : 'Find the slope of the given line: $m = -\\dfrac{A}{B}$.', want === 'parallel' ? 'A parallel line has the same slope.' : 'A perpendicular line has the negative reciprocal slope.', 'Use slope-point form with the given point.'],
      solution: [`Given slope: $${fracLatex(m0)}$`, `Required slope: $${fracLatex(m)}$`, ...lineAnswerSteps(m, p, form === 'any' ? 'slope-point' : form)],
      answerDisplay: `$${finalLatex(m, p, form === 'any' ? 'slope-intercept' : form)}$`,
    };
  },
});

const contextModel = skill({
  id: 'r7-context',
  name: 'Linear models in context',
  description: 'Write and use the equation of a linear relation that models a situation.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-4',
  gen(rng, d) {
    const fee = rng.pick([25, 40, 50, 60, 75]);
    const rate = rng.pick([15, 20, 30, 35, 45]);
    const t1 = rng.int(2, 4);
    const t2 = t1 + rng.int(2, 5);
    const c1 = fee + rate * t1;
    const c2 = fee + rate * t2;
    const ctx = rng.pick([
      { who: 'A plumber', x: 'hours of work', unit: 'h' },
      { who: 'A gym', x: 'months of membership', unit: 'months' },
      { who: 'An equipment rental shop', x: 'days rented', unit: 'days' },
    ]);
    if (d === 1) {
      const n = rng.int(5, 12);
      return {
        prompt: `${ctx.who} charges a fixed fee of $\\$${fee}$ plus $\\$${rate}$ per ${ctx.x.split(' ')[0].replace(/s$/, '')} (${ctx.x}). Determine the cost for $${n}$ ${ctx.unit}.`,
        parts: [numPart(fee + rate * n, { label: 'Cost: $', exact: false })],
        hints: [`Model: $C = ${rate}n + ${fee}$`],
        solution: [`$C = ${rate}(${n}) + ${fee} = ${fee + rate * n}$`],
      };
    }
    const target = fee + rate * rng.int(8, 15);
    return {
      prompt: `${ctx.who} charges a fixed fee plus a constant rate for ${ctx.x}. The cost is $\\$${c1}$ for $${t1}$ ${ctx.unit} and $\\$${c2}$ for $${t2}$ ${ctx.unit}. Determine the rate, the fixed fee, and the number of ${ctx.unit} that would cost $\\$${target}$.`,
      parts: [numPart(rate, { label: 'Rate: $', exact: false }), numPart(fee, { label: 'Fixed fee: $', exact: false }), numPart((target - fee) / rate, { label: `Number of ${ctx.unit}:`, exact: false })],
      hints: ['The rate is the slope between the two (time, cost) points.', 'Use slope-point form, then find the C-intercept (the fixed fee).', 'Substitute the target cost and solve.'],
      solution: [`Rate $= \\dfrac{${c2} - ${c1}}{${t2} - ${t1}} = ${rate}$`, `Fee: $${c1} - ${rate}(${t1}) = ${fee}$, so $C = ${rate}n + ${fee}$`, `$${target} = ${rate}n + ${fee} \\Rightarrow n = ${fmt((target - fee) / rate)}$`],
    };
  },
});

const bestFit = skill({
  id: 'r7-best-fit',
  name: 'Lines of best fit',
  description: 'Write the equation of a line of best fit from a scatterplot and use it to make predictions.',
  outcomes: ['R7'],
  lessonId: 'm10c-7-5',
  gen(rng, d) {
    const m = frac(rng.pick([1, 2, 3, -1, -2]) * rng.pick([1, 1, 2]), rng.pick([1, 2]));
    const b = frac(rng.int(1, 6) * (m.n < 0 ? 3 : 1));
    const l = lineFromSlopeIntercept(m, b);
    const xs = [1, 2, 3, 4, 5, 6, 7, 8];
    const pts = xs.map((x) => ({ x, y: Math.round(((m.n * x) / m.d + b.n + rng.pick([-1, 0, 0, 1, -1, 1])) * 2) / 2 }));
    const yVals = [...pts.map((p) => p.y), b.n, (m.n * 10) / m.d + b.n];
    const yMin = Math.floor(Math.min(0, ...yVals) - 1);
    const yMax = Math.ceil(Math.max(...yVals) + 1);
    const fig: PlaneFigure = { type: 'plane', grid: { xMin: 0, xMax: 10, yMin, yMax, yStep: Math.max(1, Math.round((yMax - yMin) / 10)) }, points: pts.map((p) => ({ ...p, color: 'muted' as const })), lines: [{ line: l, color: 'accent' }] };
    if (d === 1) {
      return {
        prompt: 'The scatterplot shows a line of best fit. Is the correlation positive or negative?',
        figure: fig,
        parts: [{ answer: mc(rng, m.n > 0 ? 'Positive' : 'Negative', [m.n > 0 ? 'Negative' : 'Positive', 'No correlation']) }],
        hints: ['If the points trend upward from left to right, the correlation is positive.'],
        solution: [m.n > 0 ? 'The points rise from left to right: positive correlation.' : 'The points fall from left to right: negative correlation.'],
      };
    }
    if (d === 2) {
      return {
        prompt: `Write the equation of the line of best fit shown, in slope-intercept form. ${TYPE_HINT}`,
        figure: fig,
        parts: [part({ kind: 'line', line: l, form: 'slope-intercept' })],
        hints: ['Use the y-intercept of the drawn line and two points on the line (not data points) to find the slope.'],
        solution: [`The line crosses the y-axis at $${b.n}$ and has slope $${fracLatex(m)}$.`, `$${slopeInterceptLatex(m, b)}$`],
        answerDisplay: `$${slopeInterceptLatex(m, b)}$`,
      };
    }
    const xq = rng.pick([9, 10, 12, 15]);
    const yq = (m.n * xq) / m.d + b.n;
    return {
      prompt: `The line of best fit for the data is $${slopeInterceptLatex(m, b)}$. Use it to predict $y$ when $x = ${xq}$. Is this an interpolation or an extrapolation?`,
      figure: fig,
      parts: [numPart(yq, { label: 'Predicted $y$:', exact: false }), { label: 'Type of prediction:', answer: mc(rng, 'Extrapolation', ['Interpolation']) }],
      hints: ['Substitute the x-value into the equation.', 'Interpolation is within the range of the data; extrapolation is outside it.'],
      solution: [`$y = ${fracLatex(m)}(${xq}) + ${b.n} = ${fmt(yq)}$`, `$x = ${xq}$ is beyond the data (which goes up to $x = 8$), so this is an extrapolation.`],
    };
  },
});

export const EQUATION_SKILLS: SkillDef[] = [
  identifyMB,
  graphSI,
  equationFromGraph,
  slopePointIdentify,
  graphSP,
  fromSlopePoint,
  fromTwoPoints,
  toGeneral,
  generalToSI,
  generalFeatures,
  equivalent,
  matchGraph,
  parallelPerpEq,
  contextModel,
  bestFit,
];
