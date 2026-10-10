/** Unit 8 — Systems of Linear Equations (R9). */
import { byDifficulty, fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import { type Frac, frac, fracLatex, fmt } from '../../../math/numbers.ts';
import { generalLatex, lineFromSlopeIntercept, normalizeLine, slopeInterceptLatex } from '../../../math/linear.ts';
import type { Rng } from '../../../rng.ts';
import type { Line, SkillDef } from '../../../types.ts';

/** Equation a x + b y = c in LaTeX. */
function stdLatex(a: number, b: number, c: number, x = 'x', y = 'y'): string {
  const t1 = a === 0 ? '' : `${a === 1 ? '' : a === -1 ? '-' : a}${x}`;
  const t2 = b === 0 ? '' : `${t1 ? (b < 0 ? ' - ' : ' + ') : b < 0 ? '-' : ''}${Math.abs(b) === 1 ? '' : Math.abs(b)}${y}`;
  return `${t1}${t2} = ${c}`;
}

function systemLatex(e1: string, e2: string): string {
  return `\\begin{cases} ${e1} \\\\ ${e2} \\end{cases}`;
}

interface Sys {
  a1: number;
  b1: number;
  c1: number;
  a2: number;
  b2: number;
  c2: number;
  x: number;
  y: number;
}

function makeSystem(rng: Rng, opts: { coef: [number, number]; sol: [number, number]; unit1?: boolean; fracSol?: boolean }): Sys {
  for (;;) {
    const x = opts.fracSol ? rng.int(-12, 12) / 2 : rng.int(opts.sol[0], opts.sol[1]);
    const y = opts.fracSol ? rng.int(-12, 12) / 2 : rng.int(opts.sol[0], opts.sol[1]);
    const a1 = opts.unit1 ? rng.pick([1, -1]) : rng.nonZero(opts.coef[0], opts.coef[1]);
    const b1 = rng.nonZero(opts.coef[0], opts.coef[1]);
    const a2 = rng.nonZero(opts.coef[0], opts.coef[1]);
    const b2 = rng.nonZero(opts.coef[0], opts.coef[1]);
    if (a1 * b2 - a2 * b1 === 0) continue;
    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;
    if (!Number.isInteger(c1) || !Number.isInteger(c2)) continue;
    return { a1, b1, c1, a2, b2, c2, x, y };
  }
}

const P = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`;

// ---------------------------------------------------------------------------

const PROBLEMS = [
  (rng: Rng) => {
    const pa = rng.pick([12, 15, 18]);
    const ps = rng.pick([6, 8, 10]);
    const a = rng.int(40, 120);
    const s = rng.int(40, 150);
    return {
      text: `A school play sold $${a + s}$ tickets. Adult tickets cost $\\$${pa}$ and student tickets cost $\\$${ps}$. Total sales were $\\$${pa * a + ps * s}$. Let $a$ be the number of adult tickets and $s$ the number of student tickets.`,
      vars: ['a', 's'] as [string, string],
      eqs: [[1, 1, a + s], [pa, ps, pa * a + ps * s]] as Array<[number, number, number]>,
      wrong: [[[1, 1, pa * a + ps * s], [pa, ps, a + s]], [[pa, 1, a + s], [1, ps, pa * a + ps * s]], [[1, -1, a + s], [pa, ps, pa * a + ps * s]]] as Array<Array<[number, number, number]>>,
      sol: [a, s] as [number, number],
      labels: ['Adult tickets', 'Student tickets'],
    };
  },
  (rng: Rng) => {
    const w = rng.int(5, 20);
    const extra = rng.int(2, 10);
    const l = w + extra;
    return {
      text: `The length of a rectangle is $${extra}$ cm more than its width. The perimeter is $${2 * (l + w)}$ cm. Let $l$ be the length and $w$ the width.`,
      vars: ['l', 'w'] as [string, string],
      eqs: [[1, -1, extra], [2, 2, 2 * (l + w)]] as Array<[number, number, number]>,
      wrong: [[[1, 1, extra], [2, 2, 2 * (l + w)]], [[1, -1, extra], [1, 1, 2 * (l + w)]], [[-1, 1, extra], [2, 2, 2 * (l + w)]]] as Array<Array<[number, number, number]>>,
      sol: [l, w] as [number, number],
      labels: ['Length (cm)', 'Width (cm)'],
    };
  },
  (rng: Rng) => {
    const big = rng.pick([20, 25]);
    const small = rng.pick([5, 10]);
    const q = rng.int(5, 30);
    const n = rng.int(5, 30);
    const total = big * q + small * n;
    return {
      text: `A jar has $${q + n}$ coins, all ${big === 25 ? 'quarters' : '20-cent coins'} and ${small === 10 ? 'dimes' : 'nickels'}, worth $\\$${fmt(total / 100, 2)}$ in total. Let $q$ be the number of ${big === 25 ? 'quarters' : '20-cent coins'} and $n$ the number of ${small === 10 ? 'dimes' : 'nickels'}.`,
      vars: ['q', 'n'] as [string, string],
      eqs: [[1, 1, q + n], [big, small, total]] as Array<[number, number, number]>,
      wrong: [[[1, 1, total], [big, small, q + n]], [[big, small, q + n], [1, 1, total]], [[1, 1, q + n], [small, big, total]]] as Array<Array<[number, number, number]>>,
      sol: [q, n] as [number, number],
      labels: ['Number of ' + (big === 25 ? 'quarters' : '20-cent coins'), 'Number of ' + (small === 10 ? 'dimes' : 'nickels')],
    };
  },
  (rng: Rng) => {
    const f1 = rng.pick([40, 50, 60]);
    const r1 = rng.pick([0.2, 0.25, 0.3]);
    const f2 = f1 + rng.pick([20, 30, 40]);
    const r2 = r1 - rng.pick([0.1, 0.05]);
    const d = Math.round(((f2 - f1) / (r1 - r2)) * 100) / 100;
    const c = Math.round((f1 + r1 * d) * 100) / 100;
    return {
      text: `Car rental A costs $\\$${f1}$ plus $\\$${fmt(r1, 2)}$/km. Car rental B costs $\\$${f2}$ plus $\\$${fmt(r2, 2)}$/km. For what distance do both cost the same, and what is that cost? Let $d$ be the distance in km and $C$ the cost in dollars.`,
      vars: ['d', 'C'] as [string, string],
      eqs: [[-r1, 1, f1], [-r2, 1, f2]] as Array<[number, number, number]>,
      wrong: [[[r1, 1, f1], [r2, 1, f2]], [[-f1, 1, r1], [-f2, 1, r2]], [[-r1, 1, f2], [-r2, 1, f1]]] as Array<Array<[number, number, number]>>,
      sol: [d, c] as [number, number],
      labels: ['Distance (km)', 'Cost ($)'],
    };
  },
];

function eqTex(e: [number, number, number], vars: [string, string]): string {
  const [a, b, c] = e;
  if (vars[1] === 'C' && b === 1) return `C = ${fmt(-a, 2)}d + ${fmt(c, 2)}`.replace('+ -', '- ');
  return stdLatex(a, b, c, vars[0], vars[1]);
}

const model = skill({
  id: 'r9-model',
  name: 'Modelling with a system',
  description: 'Write a system of linear equations that models a situation.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-1',
  format: 'mc',
  gen(rng) {
    const pr = rng.pick(PROBLEMS)(rng);
    const sys = (eqs: Array<[number, number, number]>) => `$${systemLatex(eqTex(eqs[0], pr.vars), eqTex(eqs[1], pr.vars))}$`;
    return {
      prompt: `${pr.text}\n\nWhich system models the situation?`,
      parts: [{ answer: mc(rng, sys(pr.eqs), pr.wrong.map(sys)) }],
      hints: ['Write one equation for each piece of information (for example, one for “how many” and one for “how much”).'],
      solution: [`${sys(pr.eqs)}`, 'Each equation matches one sentence of the problem.'],
    };
  },
});

const verify = skill({
  id: 'r9-verify-solution',
  name: 'Verifying a solution',
  description: 'Verify whether an ordered pair is the solution of a system.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-1',
  format: 'mc',
  gen(rng) {
    const s = makeSystem(rng, { coef: [-5, 5], sol: [-6, 6] });
    const isSol = rng.chance(0.5);
    const tx = isSol ? s.x : s.x + rng.nonZero(-2, 2);
    const ty = isSol ? s.y : rng.chance(0.5) ? s.y : s.y + 1;
    const l1 = s.a1 * tx + s.b1 * ty;
    const l2 = s.a2 * tx + s.b2 * ty;
    return {
      prompt: `Is $${P(tx, ty)}$ the solution of the system?\n\n$$${systemLatex(stdLatex(s.a1, s.b1, s.c1), stdLatex(s.a2, s.b2, s.c2))}$$`,
      parts: [{ answer: fixedChoice(['Yes — it satisfies both equations', 'No — it does not satisfy both equations'], isSol ? 0 : 1) }],
      hints: ['Substitute the x- and y-values into both equations.', 'The solution must make both equations true.'],
      solution: [`Equation 1: $${s.a1}(${tx}) + ${s.b1}(${ty}) = ${l1}$ ${l1 === s.c1 ? '✓' : `$\\ne ${s.c1}$`}`, `Equation 2: $${s.a2}(${tx}) + ${s.b2}(${ty}) = ${l2}$ ${l2 === s.c2 ? '✓' : `$\\ne ${s.c2}$`}`, isSol ? 'Both are true, so it is the solution.' : 'At least one is false, so it is not the solution.'],
    };
  },
});

const graphical = skill({
  id: 'r9-graphical',
  name: 'Solving systems graphically',
  description: 'Solve a system by graphing and interpret the point of intersection.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-1',
  gen(rng, d) {
    for (;;) {
      const x = rng.int(-5, 5);
      const y = rng.int(-5, 5);
      const m1 = frac(rng.nonZero(-3, 3), rng.pick([1, 2]));
      const m2 = frac(rng.nonZero(-3, 3), rng.pick([1, 2, 3]));
      if (m1.n * m2.d === m2.n * m1.d) continue;
      const b1 = frac(y * m1.d - m1.n * x, m1.d);
      const b2 = frac(y * m2.d - m2.n * x, m2.d);
      const l1 = lineFromSlopeIntercept(m1, b1);
      const l2 = lineFromSlopeIntercept(m2, b2);
      const eq = (m: Frac, b: Frac, l: Line) => (d === 3 ? generalLatex(l) : slopeInterceptLatex(m, b));
      return {
        prompt: `The graph shows the system below. What is the solution?\n\n$$${systemLatex(eq(m1, b1, l1), eq(m2, b2, l2))}$$`,
        figure: { type: 'plane', grid: { xMin: -8, xMax: 8, yMin: -8, yMax: 8 }, lines: [{ line: l1, color: 'brand' }, { line: l2, color: 'accent' }] },
        parts: [part({ kind: 'point', x, y }, { placeholder: '(x, y)' })],
        hints: ['The solution is the point where the two lines intersect.', 'Check your point in both equations.'],
        solution: [`The lines intersect at $${P(x, y)}$.`, `Check: it satisfies both equations, so the solution is $${P(x, y)}$.`],
      };
    }
  },
});

const substitution = skill({
  id: 'r9-substitution',
  name: 'Solving by substitution',
  description: 'Solve a system of linear equations algebraically by substitution.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-2',
  gen(rng, d) {
    if (d === 1) {
      const x = rng.int(-6, 6);
      const y = rng.int(-6, 6);
      const m = rng.nonZero(-4, 4);
      const b = y - m * x;
      const a2 = rng.nonZero(-4, 4);
      let b2 = rng.nonZero(-4, 4);
      if (a2 + b2 * m === 0) b2 += 1;
      const c2 = a2 * x + b2 * y;
      return {
        prompt: `Solve by substitution:\n\n$$${systemLatex(`y = ${m === 1 ? '' : m === -1 ? '-' : m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`, stdLatex(a2, b2, c2))}$$`,
        parts: [part({ kind: 'point', x, y }, { placeholder: '(x, y)' })],
        hints: ['The first equation already gives $y$. Substitute that expression for $y$ in the second equation.', 'Solve for $x$, then substitute back to find $y$.'],
        solution: [`$${a2}x + ${b2}(${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}) = ${c2}$`, `$${a2 + b2 * m}x ${b2 * b < 0 ? '-' : '+'} ${Math.abs(b2 * b)} = ${c2}$`, `$x = ${x}$`, `$y = ${m}(${x}) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${y}$`, `Solution: $${P(x, y)}$`],
      };
    }
    const s = makeSystem(rng, { coef: [-6, 6], sol: [-8, 8], unit1: true, fracSol: d === 3 });
    // equation 1 has x coefficient ±1: x = (c1 - b1 y)/a1
    const xExpr = s.a1 === 1 ? `${s.c1} ${s.b1 < 0 ? '+' : '-'} ${Math.abs(s.b1)}y` : `${-s.c1} ${s.b1 < 0 ? '-' : '+'} ${Math.abs(s.b1)}y`;
    return {
      prompt: `Solve by substitution${d === 3 ? ' (the solution may contain fractions)' : ''}:\n\n$$${systemLatex(stdLatex(s.a1, s.b1, s.c1), stdLatex(s.a2, s.b2, s.c2))}$$`,
      parts: [part({ kind: 'point', x: s.x, y: s.y }, { placeholder: '(x, y)' })],
      hints: ['Choose the variable with a coefficient of 1 or $-1$ and isolate it.', `From equation 1: $x = ${xExpr}$.`, 'Substitute into equation 2, solve for $y$, then find $x$.'],
      solution: [`From equation 1: $x = ${xExpr}$`, `Substitute into equation 2: $${s.a2}(${xExpr}) + ${s.b2}y = ${s.c2}$`, `Solve: $y = ${fracLatex(frac(Math.round(s.y * 2), 2))}$`, `Then $x = ${fracLatex(frac(Math.round(s.x * 2), 2))}$`, `Solution: $${P(s.x, s.y)}$`],
    };
  },
});

const elimination = skill({
  id: 'r9-elimination',
  name: 'Solving by elimination',
  description: 'Solve a system of linear equations algebraically by elimination.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-3',
  gen(rng, d) {
    let s: Sys;
    if (d === 1) {
      // one variable already has opposite coefficients
      for (;;) {
        s = makeSystem(rng, { coef: [-6, 6], sol: [-8, 8] });
        s.b2 = -s.b1;
        if (s.a1 * s.b2 - s.a2 * s.b1 === 0) continue;
        s.c2 = s.a2 * s.x + s.b2 * s.y;
        break;
      }
    } else {
      s = makeSystem(rng, { coef: d === 2 ? [-5, 5] : [-9, 9], sol: [-8, 8], fracSol: d === 3 && rng.chance(0.4) });
    }
    const decimals = d === 3 && rng.chance(0.4);
    const sc = (v: number) => (decimals ? fmt(v / 10, 2) : `${v}`);
    const e = (a: number, b: number, c: number) => (decimals ? stdLatex(Number(sc(a)), Number(sc(b)), Number(sc(c))) : stdLatex(a, b, c));
    return {
      prompt: `Solve by elimination:\n\n$$${systemLatex(e(s.a1, s.b1, s.c1), e(s.a2, s.b2, s.c2))}$$`,
      parts: [part({ kind: 'point', x: s.x, y: s.y }, { placeholder: '(x, y)' })],
      hints: [...(decimals ? ['Multiply each equation by 10 to clear the decimals.'] : []), 'Multiply one or both equations so that one variable has opposite coefficients.', 'Add the equations to eliminate that variable, solve, then substitute back.'],
      solution: d === 1 ? [
        `The $y$-coefficients are already opposites, so add the equations: $${s.a1 + s.a2}x = ${s.c1 + s.c2}$.`,
        `$x = ${fmt(s.x)}$`,
        `Substitute into equation 1 to find $y = ${fmt(s.y)}$.`,
        `Solution: $${P(s.x, s.y)}$`,
      ] : [
        `Make the $y$-coefficients opposites: multiply equation 1 by $${s.b2}$ and equation 2 by $${-s.b1}$.`,
        `$${s.a1 * s.b2}x + ${s.b1 * s.b2}y = ${s.c1 * s.b2}$ and $${-s.a2 * s.b1}x ${-s.b2 * s.b1 < 0 ? '-' : '+'} ${Math.abs(s.b2 * s.b1)}y = ${-s.c2 * s.b1}$`,
        `Add: $${s.a1 * s.b2 - s.a2 * s.b1}x = ${s.c1 * s.b2 - s.c2 * s.b1}$, so $x = ${fmt(s.x)}$.`,
        `Substitute to find $y = ${fmt(s.y)}$.`,
        `Solution: $${P(s.x, s.y)}$`,
      ],
    };
  },
});

const numSolutions = skill({
  id: 'r9-num-solutions',
  name: 'Number of solutions',
  description: 'Explain why a system may have one solution, no solution, or infinitely many solutions.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-4',
  format: 'mc',
  gen(rng, d) {
    const kind = rng.pick(['one', 'none', 'many'] as const);
    const m = frac(rng.nonZero(-4, 4), rng.pick([1, 2, 3]));
    const b = frac(rng.int(-6, 6));
    const l1 = lineFromSlopeIntercept(m, b);
    const k = rng.pick([2, 3, -2]);
    let l2: Line;
    if (kind === 'many') l2 = { A: l1.A * k, B: l1.B * k, C: l1.C * k };
    else if (kind === 'none') l2 = { A: l1.A * k, B: l1.B * k, C: l1.C * k + rng.nonZero(-5, 5) };
    else l2 = normalizeLine(lineFromSlopeIntercept(frac(m.n + rng.pick([1, -1, 2]) * m.d, m.d), frac(rng.int(-6, 6))));
    const show = (l: Line) => {
      // write as Ax + By = -C without normalizing the second equation (so multiples are visible)
      return stdLatex(l.A, l.B, -l.C);
    };
    const idx = { one: 0, none: 1, many: 2 }[kind];
    const fig = d === 1 ? { type: 'plane' as const, grid: { xMin: -8, xMax: 8, yMin: -8, yMax: 8 }, lines: [{ line: l1, color: 'brand' as const }, { line: l2, color: 'accent' as const, dashed: kind === 'many' }] } : undefined;
    return {
      prompt: `How many solutions does this system have?\n\n$$${systemLatex(show(l1), show(l2))}$$`,
      figure: fig,
      parts: [{ answer: fixedChoice(['Exactly one solution', 'No solution', 'Infinitely many solutions'], idx) }],
      hints: ['Compare the slopes and the y-intercepts of the two lines.', 'Different slopes: one solution. Same slope, different intercept: parallel, no solution. Same line: infinitely many.'],
      solution: [
        kind === 'one' ? 'The slopes are different, so the lines cross at exactly one point.' : kind === 'none' ? 'The slopes are equal but the y-intercepts differ: the lines are parallel and never meet.' : `The second equation is the first multiplied by $${k}$: the lines are coincident (the same line).`,
      ],
    };
  },
});

const wordProblems = skill({
  id: 'r9-word-problems',
  name: 'Solving problems with systems',
  description: 'Model and solve problems using systems of linear equations.',
  outcomes: ['R9'],
  lessonId: 'm10c-8-4',
  gen(rng, d) {
    const pr = byDifficulty(d, PROBLEMS[rng.pick([0, 1])](rng), PROBLEMS[rng.pick([0, 2])](rng), PROBLEMS[rng.pick([2, 3])](rng));
    const [e1, e2] = pr.eqs;
    return {
      prompt: `${pr.text}\n\nSolve the problem.`,
      parts: [numPart(pr.sol[0], { label: `${pr.labels[0]}:`, decimals: Number.isInteger(pr.sol[0]) ? undefined : 2, exact: false, tolerance: Number.isInteger(pr.sol[0]) ? undefined : 0.01 }), numPart(pr.sol[1], { label: `${pr.labels[1]}:`, decimals: Number.isInteger(pr.sol[1]) ? undefined : 2, exact: false, tolerance: Number.isInteger(pr.sol[1]) ? undefined : 0.01 })],
      hints: ['Define the variables and write two equations.', 'Solve with substitution or elimination.', 'Check that the answer makes sense in the context.'],
      solution: [`$$${systemLatex(eqTex(e1, pr.vars), eqTex(e2, pr.vars))}$$`, `Solving gives $${pr.vars[0]} = ${fmt(pr.sol[0], 2)}$ and $${pr.vars[1]} = ${fmt(pr.sol[1], 2)}$.`],
      calculator: true,
    };
  },
});

export const SYSTEM_SKILLS: SkillDef[] = [model, verify, graphical, substitution, elimination, numSolutions, wordProblems];
