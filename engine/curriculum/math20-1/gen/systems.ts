/** Math 20-1 Unit 8 — Systems of Equations (RF6). */
import { fixedChoice, numPart, part, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';
import { GRID10, br, coefTex, curvePlane, par, polyTex, ptTex, safeRound, stdTex, texNum, vertexTex } from './quadfunctions.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sysTex = (e1: string, e2: string) => `\\begin{cases} ${e1} \\\\ ${e2} \\end{cases}`;

/** Right side of y = mx + k. */
const lineTex = (m: number, k: number) => polyTex([[m, 'x'], [k, '']]);

/** The line y = mx + k written as Ax + By = C with A > 0 (or y = k when m = 0). */
function lineGeneralTex(m: number, k: number): string {
  if (m === 0) return `y = ${texNum(k)}`;
  const [A, B, C] = m < 0 ? [-m, 1, k] : [m, -1, -k];
  return `${polyTex([[A, 'x'], [B, 'y']])} = ${texNum(C)}`;
}

/** a(x)^2 + b(x) + c with x substituted. */
function subQuad(a: number, b: number, c: number, x: number): string {
  const t2 = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${coefTex(Math.abs(b))}${br(x)}`;
  const t3 = c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${texNum(Math.abs(c))}`;
  return `${coefTex(a)}${br(x)}^2${t2}${t3}`;
}

/** m(x) + k with x substituted. */
function subLine(m: number, k: number, x: number): string {
  if (m === 0) return texNum(k);
  return `${coefTex(m)}${br(x)}${k === 0 ? '' : ` ${k < 0 ? '-' : '+'} ${texNum(Math.abs(k))}`}`;
}

/** Linear factor with root r: (x - 3), (2x + 1), or x. */
function factorTex(r: number): string {
  const f = toFrac(r, 12) ?? { n: r, d: 1 };
  if (f.n === 0) return 'x';
  return `(${f.d === 1 ? '' : f.d}x ${f.n > 0 ? '-' : '+'} ${Math.abs(f.n)})`;
}

const quadAt = (a: number, b: number, c: number) => (x: number) => a * x * x + b * x + c;

/**
 * Steps that solve Ax^2 + Bx + C = 0 (integer coefficients) whose real roots are `roots` (rational, or none).
 * With `disc`, the discriminant is shown first.
 */
function quadSolveSteps(A: number, B: number, C: number, roots: number[], disc = false): string[] {
  const steps: string[] = [];
  const g = gcd(gcd(A, B), C) * Math.sign(A);
  let [a, b, c] = [A, B, C];
  if (g !== 1) {
    [a, b, c] = [A / g, B / g, C / g];
    steps.push(`Divide both sides by $${g}$: $${stdTex(a, b, c)} = 0$.`);
  }
  const D = b * b - 4 * a * c;
  if (disc || !roots.length) {
    const count = D < 0 ? 'there are no real roots' : D === 0 ? 'there is exactly one real root' : 'there are two real roots';
    steps.push(`The discriminant is $b^2 - 4ac = ${br(b)}^2 - 4(${a})(${c}) = ${D}$. Since it is ${D < 0 ? 'negative' : D === 0 ? 'zero' : 'positive'}, ${count}.`);
  }
  if (!roots.length) return steps;
  const [r1, r2] = roots.length === 1 ? [roots[0], roots[0]] : roots;
  const lead = (fr: number) => toFrac(fr, 12)?.d ?? 1;
  const k = a / (lead(r1) * lead(r2));
  const kTex = coefTex(k);
  const order = (u: number, v: number) => (u === 0 ? [u, v] : v === 0 ? [v, u] : [u, v]);
  if (r1 === r2) {
    steps.push(`Factor: $${kTex}${factorTex(r1).startsWith('(') ? factorTex(r1) : `(${factorTex(r1)})`}^2 = 0$, so $x = ${texNum(r1)}$ (a double root).`);
  } else {
    const [u, v] = order(r1, r2);
    steps.push(`Factor: $${kTex}${factorTex(u)}${factorTex(v)} = 0$, so $x = ${texNum(r1)}$ or $x = ${texNum(r2)}$.`);
  }
  return steps;
}

const pointParts = (pts: Array<[number, number]>): Part[] =>
  pts.length === 1
    ? [part({ kind: 'point', x: pts[0][0], y: pts[0][1] }, { label: 'Solution:', placeholder: '(x, y)' })]
    : pts.map(([x, y], i) => part({ kind: 'point', x, y }, { label: `Solution ${i + 1}:`, placeholder: '(x, y)' }));

const ORDER_NOTE = 'Enter the solution with the smaller $x$-coordinate first.';
const XS_NOTE = 'Enter the $x$-coordinate of each solution, separated by commas. If there is no solution, type none.';

function pointsList(pts: Array<[number, number]>): string {
  return pts.map(([x, y]) => `$${ptTex(x, y)}$`).join(' and ');
}

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Chloé', 'Tariq', 'Noah', 'Amara', 'Jasmine', 'Ethan', 'Nadia', 'Owen', 'Leila', 'Dakota', 'Hamid', 'Grace'];

// ---------------------------------------------------------------------------
// 8.1 — Solving systems graphically
// ---------------------------------------------------------------------------

const COUNT_CHOICES = ['No solution', 'Exactly one solution', 'Exactly two solutions', 'Infinitely many solutions'];

interface CountCase {
  e1: string;
  e2: string;
  count: 0 | 1 | 2 | 3;
  why: string[];
}

function countCase(rng: Rng): CountCase {
  const kind = rng.pick(['apart', 'cross', 'touch', 'translate', 'same-a', 'same', 'horizontal', 'horizontal', 'through-vertex'] as const);
  const up = rng.pick([1, 2, 0.5]);
  const down = -rng.pick([1, 2, 0.5]);
  const p1 = rng.int(-4, 4);
  const p2 = rng.int(-4, 4);
  const v = (a: number, p: number, q: number) => `y = ${vertexTex(a, p, q)}`;
  const swap = (c: CountCase): CountCase => (rng.chance(0.5) ? { ...c, e1: c.e2, e2: c.e1 } : c);
  switch (kind) {
    case 'apart': {
      const q1 = rng.int(1, 6);
      const q2 = q1 - rng.int(2, 7);
      return swap({
        e1: v(up, p1, q1),
        e2: v(down, p2, q2),
        count: 0,
        why: [
          `$y = ${vertexTex(up, p1, q1)}$ opens up from its vertex $${ptTex(p1, q1)}$, so every point on it has $y \\ge ${q1}$.`,
          `$y = ${vertexTex(down, p2, q2)}$ opens down from its vertex $${ptTex(p2, q2)}$, so every point on it has $y \\le ${q2}$.`,
          `Since $${q2} < ${q1}$, the graphs never meet: the system has no solution.`,
        ],
      });
    }
    case 'cross': {
      const q2 = rng.int(-2, 6);
      const f1p2 = q2 - rng.int(1, 6);
      const q1 = f1p2 - up * (p2 - p1) ** 2;
      return swap({
        e1: v(up, p1, q1),
        e2: v(down, p2, q2),
        count: 2,
        why: [
          `$y = ${vertexTex(down, p2, q2)}$ opens down from its vertex $${ptTex(p2, q2)}$; $y = ${vertexTex(up, p1, q1)}$ opens up.`,
          `At $x = ${p2}$, the upward parabola has $y = ${texNum(up)}(${p2} - ${par(p1)})^2 + ${par(q1)} = ${texNum(f1p2)}$, which is below the vertex $${ptTex(p2, q2)}$.`,
          'Moving left or right from there, the downward parabola falls while the upward one rises, so they cross once on each side: exactly two solutions.',
        ],
      });
    }
    case 'touch': {
      const q = rng.int(-6, 6);
      const a1 = rng.pick([up, down]);
      const a2 = rng.pick([up, down, a1 * 3].filter((x) => x !== a1));
      return swap({
        e1: v(a1, p1, q),
        e2: v(a2, p1, q),
        count: 1,
        why: [
          `Both parabolas have vertex $${ptTex(p1, q)}$.`,
          a1 * a2 < 0
            ? 'One opens up and the other opens down from that point, so they meet only at the vertex.'
            : 'They open the same way but one is narrower, so it stays above the other except at the shared vertex.',
          `Algebraically, subtracting the equations gives $${vertexTex(a1 - a2, p1, 0)} = 0$, which has only one root. The system has exactly one solution.`,
        ],
      });
    }
    case 'translate': {
      const a = rng.pick([up, down]);
      const q1 = rng.int(-6, 6);
      const q2 = q1 + rng.nonZero(-5, 5);
      return {
        e1: v(a, p1, q1),
        e2: v(a, p1, q2),
        count: 0,
        why: [
          `The parabolas have the same $a$ and the same axis, $x = ${p1}$. One is the other translated $${Math.abs(q2 - q1)}$ units vertically.`,
          `At every $x$-value their $y$-values differ by $${Math.abs(q2 - q1)}$, so they never meet: no solution.`,
        ],
      };
    }
    case 'same-a': {
      const a = rng.pick([up, down]);
      const pp2 = p1 + rng.nonZero(-4, 4);
      const q1 = rng.int(-6, 6);
      const q2 = rng.int(-6, 6);
      return {
        e1: v(a, p1, q1),
        e2: v(a, pp2, q2),
        count: 1,
        why: [
          `Both parabolas have $a = ${texNum(a)}$: they are congruent, with different axes of symmetry ($x = ${p1}$ and $x = ${pp2}$).`,
          'When the equations are subtracted, the $x^2$ terms cancel and a linear equation is left, which has exactly one solution.',
          'Graphically, the two translated copies cross exactly once. The system has exactly one solution.',
        ],
      };
    }
    case 'same': {
      const a = rng.pick([1, -1, 2, -2]);
      const q = rng.int(-6, 6);
      const p = p1 === 0 ? 2 : p1;
      return swap({
        e1: v(a, p, q),
        e2: `y = ${stdTex(a, -2 * a * p, a * p * p + q)}`,
        count: 3,
        why: [
          `Expand the vertex form: $${vertexTex(a, p, q)} = ${coefTex(a)}(x^2 ${p > 0 ? '-' : '+'} ${2 * Math.abs(p)}x + ${p * p})${q === 0 ? '' : ` ${q < 0 ? '-' : '+'} ${Math.abs(q)}`} = ${stdTex(a, -2 * a * p, a * p * p + q)}$.`,
          'The two equations describe the same parabola, so every point on it is a solution: infinitely many solutions.',
        ],
      });
    }
    case 'horizontal': {
      const a = rng.pick([up, down]);
      const q = rng.int(-5, 5);
      const k = q + rng.int(-4, 4);
      const count = k === q ? 1 : (k > q) === a > 0 ? 2 : 0;
      return swap({
        e1: v(a, p1, q),
        e2: `y = ${k}`,
        count: count as 0 | 1 | 2,
        why: [
          `$y = ${k}$ is a horizontal line. The parabola ${a > 0 ? 'opens up' : 'opens down'} from its vertex $${ptTex(p1, q)}$, so its ${a > 0 ? 'minimum' : 'maximum'} value is $${q}$.`,
          count === 1
            ? `The line passes through the vertex, so it touches the parabola once: exactly one solution.`
            : count === 2
              ? `The line is ${a > 0 ? 'above the minimum' : 'below the maximum'}, so it crosses both arms of the parabola: exactly two solutions.`
              : `The line is ${a > 0 ? 'below the minimum' : 'above the maximum'}, so it never meets the parabola: no solution.`,
        ],
      });
    }
    case 'through-vertex': {
      const a = rng.pick([up, down]);
      const q = rng.int(-5, 5);
      const m = rng.nonZero(-3, 3);
      const k = q - m * p1;
      return swap({
        e1: v(a, p1, q),
        e2: `y = ${lineTex(m, k)}`,
        count: 2,
        why: [
          `The vertex of the parabola is $${ptTex(p1, q)}$. Check the line: $${subLine(m, k, p1)} = ${q}$, so the line passes through the vertex.`,
          'The line is not horizontal, so after passing through the vertex it crosses the other arm of the parabola as well: exactly two solutions.',
        ],
      });
    }
  }
}

const systemGraph = skill({
  id: 'm201-system-graph',
  name: 'Solving systems graphically',
  description: 'Find the number of solutions and the solutions of a linear-quadratic or quadratic-quadratic system from its graph.',
  outcomes: ['RF6'],
  lessonId: 'm201-8-1',
  gen(rng, d) {
    if (d === 1 && rng.chance(0.7)) {
      for (;;) {
        const x1 = rng.int(-5, 3);
        const x2 = rng.int(x1 + 2, 6);
        const m = rng.int(-3, 3);
        const k = rng.int(-5, 5);
        const s = rng.pick([1, -1]);
        const [a, b, c] = [s, -s * (x1 + x2) + m, s * x1 * x2 + k];
        const f = quadAt(a, b, c);
        const hx = -b / (2 * a);
        const pts: Array<[number, number]> = [[x1, m * x1 + k], [x2, m * x2 + k]];
        if (pts.some(([, y]) => Math.abs(y) > 8) || Math.abs(f(hx)) > 9 || Math.abs(hx) > 8) continue;
        return {
          prompt: `The graphs of the equations in this system are shown. Use the graph to solve the system. ${ORDER_NOTE}\n\n$$${sysTex(`y = ${stdTex(a, b, c)}`, `y = ${lineTex(m, k)}`)}$$`,
          figure: curvePlane(GRID10, [{ f, vertexX: hx }], { lines: [{ line: { A: m, B: -1, C: k }, color: 'accent' }] }),
          parts: pointParts(pts),
          hints: ['The solutions are the points where the parabola and the line intersect.', 'Read each intersection point from the grid, then check it in both equations.'],
          solution: [
            `The parabola and the line intersect at ${pointsList(pts)}.`,
            ...pts.map(([x, y]) => `Check $${ptTex(x, y)}$: $${subQuad(a, b, c, x)} = ${y}$ ✓ and $${subLine(m, k, x)} = ${y}$ ✓`),
            `The solutions are ${pointsList(pts)}.`,
          ],
        };
      }
    }
    if (d === 1) {
      for (;;) {
        const count = rng.int(0, 2);
        const e = count === 0 ? rng.int(2, 4) : count === 1 ? 0 : -rng.int(2, 6);
        const h = rng.int(-4, 4);
        const s = rng.pick([1, -1]);
        const m = rng.int(-2, 2);
        const k = rng.int(-4, 4);
        const [a, b, c] = [s, -2 * s * h + m, s * (h * h + e) + k];
        const f = quadAt(a, b, c);
        const hx = -b / (2 * a);
        if (Math.abs(f(hx)) > 8 || Math.abs(hx) > 8 || Math.abs(m * h + k) > 8) continue;
        return {
          prompt: `The graphs of the equations in this system are shown. How many solutions does the system have?\n\n$$${sysTex(`y = ${stdTex(a, b, c)}`, `y = ${lineTex(m, k)}`)}$$`,
          figure: curvePlane(GRID10, [{ f, vertexX: hx }], { lines: [{ line: { A: m, B: -1, C: k }, color: 'accent' }] }),
          parts: [{ answer: fixedChoice(['No solution', 'Exactly one solution', 'Exactly two solutions'], count) }],
          hints: ['Each point where the graphs meet is a solution of the system.', 'A line can miss a parabola, touch it at one point, or cross it at two points.'],
          solution: [
            count === 0 ? 'The line and the parabola never meet.' : count === 1 ? `The line touches the parabola at exactly one point, $${ptTex(h, m * h + k)}$.` : 'The line crosses the parabola at two points.',
            `The system has ${['no solution', 'exactly one solution', 'exactly two solutions'][count]}.`,
          ],
        };
      }
    }
    if (d === 2) {
      if (rng.chance(0.65)) {
        for (;;) {
          const x1 = rng.int(-4, 2);
          const x2 = rng.int(x1 + 2, 5);
          const [s1, s2] = rng.pick([[1, -1], [-1, 1], [2, -1], [1, -2], [-2, 1], [-1, 2]] as const);
          const m = rng.int(-2, 2);
          const k = rng.int(-4, 4);
          const P1 = [s1, -s1 * (x1 + x2) + m, s1 * x1 * x2 + k] as const;
          const P2 = [s2, -s2 * (x1 + x2) + m, s2 * x1 * x2 + k] as const;
          const f1 = quadAt(...P1);
          const f2 = quadAt(...P2);
          const v1 = -P1[1] / (2 * P1[0]);
          const v2 = -P2[1] / (2 * P2[0]);
          const pts: Array<[number, number]> = [[x1, m * x1 + k], [x2, m * x2 + k]];
          if (pts.some(([, y]) => Math.abs(y) > 8) || [f1(v1), f2(v2)].some((y) => Math.abs(y) > 9) || Math.abs(v1) > 8 || Math.abs(v2) > 8) continue;
          return {
            prompt: `The graphs of the equations in this system are shown. Use the graph to solve the system. ${ORDER_NOTE}\n\n$$${sysTex(`y = ${stdTex(...P1)}`, `y = ${stdTex(...P2)}`)}$$`,
            figure: curvePlane(GRID10, [{ f: f1, vertexX: v1 }, { f: f2, color: 'accent', vertexX: v2 }]),
            parts: pointParts(pts),
            hints: ['The solutions are the points where the two parabolas intersect.', 'Read the intersection points from the grid and check each one in both equations.'],
            solution: [
              `The parabolas intersect at ${pointsList(pts)}.`,
              ...pts.map(([x, y]) => `Check $${ptTex(x, y)}$: $${subQuad(...P1, x)} = ${y}$ ✓ and $${subQuad(...P2, x)} = ${y}$ ✓`),
              `The solutions are ${pointsList(pts)}.`,
            ],
          };
        }
      }
      for (;;) {
        const a = rng.pick([1, -1, 2, -2]);
        const p = rng.int(-4, 4);
        const q = a > 0 ? rng.int(-7, 0) : rng.int(0, 7);
        const t = p + rng.pick([-2, -1, 1, 2]);
        const m = 2 * a * (t - p);
        const yt = a * (t - p) ** 2 + q;
        const k = yt - m * t;
        if (Math.abs(m) > 4 || Math.abs(yt) > 8) continue;
        return {
          prompt: `The graphs of the equations in this system are shown. Use the graph to solve the system.\n\n$$${sysTex(`y = ${vertexTex(a, p, q)}`, `y = ${lineTex(m, k)}`)}$$`,
          figure: curvePlane(GRID10, [{ f: (x) => a * (x - p) ** 2 + q, vertexX: p }], { lines: [{ line: { A: m, B: -1, C: k }, color: 'accent' }] }),
          parts: pointParts([[t, yt]]),
          hints: ['Look for every point where the line meets the parabola.', 'A line that touches a parabola at one point without crossing it is a tangent line: one solution.'],
          solution: [
            `The line touches the parabola at one point, $${ptTex(t, yt)}$ (the line is tangent to the parabola).`,
            `Check: $${texNum(a)}(${t} - ${par(p)})^2 + ${par(q)} = ${yt}$ ✓ and $${subLine(m, k, t)} = ${yt}$ ✓`,
            `The system has one solution, $${ptTex(t, yt)}$.`,
          ],
        };
      }
    }
    // d === 3: reason about the number of solutions without graphing technology.
    const c = countCase(rng);
    return {
      prompt: `Without solving, determine the number of solutions of the system. Use the features of each graph (vertex, direction of opening, slope) to make a quick sketch.\n\n$$${sysTex(c.e1, c.e2)}$$`,
      parts: [{ answer: fixedChoice(COUNT_CHOICES, c.count) }],
      hints: ['For each parabola, find the vertex and the direction of opening. For a line, find its slope and a point.', 'Can the graphs meet? Do they touch at one point, cross twice, or are they the same graph?'],
      solution: [...c.why, `Answer: ${COUNT_CHOICES[c.count].toLowerCase()}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 8.2 — Solving algebraically
// ---------------------------------------------------------------------------

/** A rational root n/d (d = 2 or 3) in lowest terms, between -4 and 4. */
function fracRoot(rng: Rng): number {
  for (;;) {
    const d = rng.pick([2, 3]);
    const n = rng.int(-4 * d, 4 * d);
    if (gcd(n, d) === 1) return n / d;
  }
}

/** Quadratic ax^2 + bx + c (integer coefficients) with the given rational roots and sign. */
function fromRoots(r1: number, r2: number, s: number): [number, number, number] {
  const f1 = toFrac(r1, 12)!;
  const f2 = toFrac(r2, 12)!;
  // s(d1 x - n1)(d2 x - n2)
  return [s * f1.d * f2.d, -s * (f1.d * f2.n + f2.d * f1.n), s * f1.n * f2.n];
}

type Shape = { Q: [number, number, number]; roots: number[] };

/** A quadratic difference with 0, 1 or 2 rational real roots. */
function diffShape(rng: Rng, count: 0 | 1 | 2, opts: { frac?: boolean; scale?: number[] } = {}): Shape {
  const s = rng.sign();
  const c0 = rng.pick(opts.scale ?? [1]);
  if (count === 0) {
    const h = rng.int(-3, 3);
    const e = rng.int(1, 3);
    return { Q: [s * c0, -2 * s * c0 * h, s * c0 * (h * h + e)], roots: [] };
  }
  if (count === 1) {
    const t = rng.int(-4, 4);
    return { Q: [s * c0, -2 * s * c0 * t, s * c0 * t * t], roots: [t] };
  }
  for (;;) {
    const r1 = opts.frac ? fracRoot(rng) : rng.int(-5, 5);
    const r2 = rng.int(-5, 5);
    if (r1 === r2) continue;
    const [a, b, c] = fromRoots(r1, r2, s);
    const lo = Math.min(r1, r2);
    const hi = Math.max(r1, r2);
    return { Q: [a * c0, b * c0, c * c0], roots: [lo, hi] };
  }
}

const linQuad = skill({
  id: 'm201-system-linear-quadratic',
  name: 'Linear-quadratic systems',
  description: 'Solve a linear-quadratic system algebraically by substitution, including systems with one or no solution.',
  outcomes: ['RF6'],
  lessonId: 'm201-8-2',
  gen(rng, d) {
    for (;;) {
      const count = d === 3 ? (rng.pick([0, 1, 2, 2]) as 0 | 1 | 2) : 2;
      const shape = diffShape(rng, count, { frac: d >= 2 && rng.chance(d === 2 ? 0.7 : 0.4), scale: d === 1 ? [1] : [1, 1, 2] });
      const m = rng.int(-4, 4);
      const k = rng.int(-6, 6);
      const [A, B, C] = shape.Q;
      const [a, b, c] = [A, B + m, C + k];
      if (d === 1 && Math.abs(a) !== 1) continue;
      if (Math.abs(b) > 20 || Math.abs(c) > 30) continue;
      const pts = shape.roots.map((x) => [x, m * x + k] as [number, number]);
      const general = d >= 2 && m !== 0 && rng.chance(d === 2 ? 0.7 : 0.5);
      const lineEq = general ? lineGeneralTex(m, k) : `y = ${lineTex(m, k)}`;
      const quadEq = `y = ${stdTex(a, b, c)}`;
      const [e1, e2] = rng.chance(0.5) ? [quadEq, lineEq] : [lineEq, quadEq];
      const steps: string[] = [];
      if (general) steps.push(`Solve the linear equation for $y$: $${lineGeneralTex(m, k)}$ becomes $y = ${lineTex(m, k)}$.`);
      steps.push(`Substitute $y = ${lineTex(m, k)}$ into the quadratic equation: $${lineTex(m, k)} = ${stdTex(a, b, c)}$.`);
      steps.push(`Collect the terms on one side: $${stdTex(A, B, C)} = 0$.`);
      steps.push(...quadSolveSteps(A, B, C, shape.roots, d === 3));
      if (pts.length) steps.push(`Substitute into $y = ${lineTex(m, k)}$: ${pts.map(([x, y]) => `$x = ${texNum(x)}$ gives $y = ${subLine(m, k, x)} = ${texNum(y)}$`).join('; ')}.`);
      const parts: Part[] = d === 3 ? [part({ kind: 'numbers', values: shape.roots }, { label: '$x$-coordinates:', placeholder: 'e.g. -2, 3' })] : pointParts(pts);
      return {
        prompt: d === 3 ? `Solve the system algebraically. ${XS_NOTE}\n\n$$${sysTex(e1, e2)}$$` : `Solve the system by substitution. ${ORDER_NOTE}${d === 2 ? ' (Fractions are fine.)' : ''}\n\n$$${sysTex(e1, e2)}$$`,
        parts,
        hints: ['Write the linear equation as $y = mx + b$ and substitute it for $y$ in the quadratic equation.', 'Collect the terms on one side to get a quadratic equation in $x$, solve it, then find each $y$ from the linear equation.'],
        solution: [...steps, pts.length ? `The solution${pts.length > 1 ? 's are' : ' is'} ${pointsList(pts)}.` : 'The quadratic equation has no real roots, so the line and the parabola do not intersect: the system has no solution.'],
      };
    }
  },
});

const quadQuad = skill({
  id: 'm201-system-quadratic-quadratic',
  name: 'Quadratic-quadratic systems',
  description: 'Solve a quadratic-quadratic system algebraically by elimination, including systems with one or no solution.',
  outcomes: ['RF6'],
  lessonId: 'm201-8-2',
  gen(rng, d) {
    for (;;) {
      const kind = d === 3 ? rng.pick(['two', 'two', 'linear', 'tangent', 'none'] as const) : 'two';
      let shape: Shape;
      if (kind === 'linear') {
        const t = rng.chance(0.5) ? rng.int(-5, 5) : fracRoot(rng);
        const f = toFrac(t, 12)!;
        const s = rng.sign() * rng.pick([1, 2]);
        shape = { Q: [0, s * f.d, -s * f.n], roots: [t] };
      } else {
        const count = kind === 'none' ? 0 : kind === 'tangent' ? 1 : 2;
        shape = diffShape(rng, count, { frac: d >= 2 && rng.chance(0.4), scale: d === 1 ? [1] : [1, 2, 3] });
      }
      const [A, B, C] = shape.Q;
      const a2 = rng.pick([-3, -2, -1, 1, 2, 3]);
      const b2 = rng.int(-6, 6);
      const c2 = rng.int(-8, 8);
      const [a1, b1, c1] = [a2 + A, b2 + B, c2 + C];
      if (a1 === 0 || Math.abs(b1) > 20 || Math.abs(c1) > 30) continue;
      const pts = shape.roots.map((x) => [x, a2 * x * x + b2 * x + c2] as [number, number]);
      if (pts.some(([, y]) => Math.abs(y) > 60)) continue;
      const steps: string[] = [
        `Both equations are solved for $y$. Subtract the second equation from the first to eliminate $y$: $0 = (${stdTex(a1, b1, c1)}) - (${stdTex(a2, b2, c2)})$.`,
      ];
      if (A === 0) {
        steps.push(`The $x^2$ terms cancel: $${polyTex([[B, 'x'], [C, '']])} = 0$.`);
        steps.push(`Solve: $x = ${texNum(shape.roots[0])}$.`);
      } else {
        steps.push(`Simplify: $${stdTex(A, B, C)} = 0$.`);
        steps.push(...quadSolveSteps(A, B, C, shape.roots, d === 3));
      }
      if (pts.length) steps.push(`Substitute into $y = ${stdTex(a2, b2, c2)}$: ${pts.map(([x, y]) => `$x = ${texNum(x)}$ gives $y = ${subQuad(a2, b2, c2, x)} = ${texNum(y)}$`).join('; ')}.`);
      const e1 = `y = ${stdTex(a1, b1, c1)}`;
      const e2 = `y = ${stdTex(a2, b2, c2)}`;
      return {
        prompt: d === 3 ? `Solve the system algebraically. ${XS_NOTE}\n\n$$${sysTex(e1, e2)}$$` : `Solve the system by elimination. ${ORDER_NOTE}${d === 2 ? ' (Fractions are fine.)' : ''}\n\n$$${sysTex(e1, e2)}$$`,
        parts: d === 3 ? [part({ kind: 'numbers', values: shape.roots }, { label: '$x$-coordinates:', placeholder: 'e.g. -2, 3' })] : pointParts(pts),
        hints: ['Subtract one equation from the other to eliminate $y$.', 'Solve the resulting equation for $x$, then substitute each $x$-value into either original equation to find $y$.'],
        solution: [...steps, pts.length ? `The solution${pts.length > 1 ? 's are' : ' is'} ${pointsList(pts)}.` : 'The equation has no real roots, so the parabolas do not intersect: the system has no solution.'],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// 8.2 — Problems
// ---------------------------------------------------------------------------

const PATIOS = [
  { what: 'A rectangular patio', unit: 'm' },
  { what: 'A rectangular vegetable garden', unit: 'm' },
  { what: 'A rectangular poster', unit: 'cm' },
  { what: 'A rectangular hockey rink for a backyard', unit: 'm' },
];

const PRODUCTS = ['hoodies', 'skateboards', 'phone cases', 'water bottles', 'bike helmets'];

const systemApply = skill({
  id: 'm201-system-apply',
  name: 'Problems with systems',
  description: 'Model a situation with a linear-quadratic or quadratic-quadratic system and solve it.',
  outcomes: ['RF6'],
  lessonId: 'm201-8-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const t1 = rng.pick([1, 2]);
        const t2 = rng.int(t1 + 2, 5);
        const r = rng.int(2, 6);
        const h0 = rng.int(0, 2);
        const v = 5 * (t1 + t2) + r;
        const h1 = h0 + 5 * t1 * t2;
        return {
          prompt: `${name} throws a ball upward. Its height, $h$, in metres, after $t$ seconds is $h = ${stdTex(-5, v, h0, 't')}$. At the same moment, a drone $${h1}$ m above the ground starts to rise at a steady $${r}$ m/s, so its height is $h = ${r}t + ${h1}$. At what times are the ball and the drone at the same height, and what is that height the first time?`,
          parts: [part({ kind: 'numbers', values: [t1, t2] }, { label: 'Times (s):', placeholder: 'e.g. 1, 4' }), numPart(r * t1 + h1, { label: 'Height the first time:', suffix: 'm' })],
          hints: ['Set the two expressions for $h$ equal to each other.', 'Collect the terms on one side, divide by the common factor, and factor.'],
          solution: [
            `Set the heights equal: $${stdTex(-5, v, h0, 't')} = ${r}t + ${h1}$.`,
            `Collect the terms: $${stdTex(-5, v - r, h0 - h1, 't')} = 0$.`,
            `Divide by $-5$: $${stdTex(1, -(t1 + t2), t1 * t2, 't')} = 0$, so $(t - ${t1})(t - ${t2}) = 0$.`,
            `$t = ${t1}$ s or $t = ${t2}$ s (the ball passes the drone going up, then again coming down).`,
            `At $t = ${t1}$: $h = ${r}(${t1}) + ${h1} = ${r * t1 + h1}$ m.`,
            `They are at the same height at $${t1}$ s and $${t2}$ s; the first time, both are $${r * t1 + h1}$ m high.`,
          ],
        };
      }
      const a = rng.pick([1, 2, 5]);
      const x1 = rng.int(1, 5);
      const x2 = rng.int(x1 + 3, 15);
      const m = rng.int(2, 10);
      const b = m + a * (x1 + x2);
      const F = a * x1 * x2;
      const prod = rng.pick(PRODUCTS);
      return {
        prompt: `A small business makes and sells ${prod}. For $x$ hundred ${prod}, its revenue is $R = ${stdTex(-a, b, 0)}$ and its cost is $C = ${m}x + ${F}$, both in thousands of dollars. The business breaks even when revenue equals cost. Find the break-even values of $x$.`,
        parts: [part({ kind: 'numbers', values: [x1, x2] }, { label: 'Break-even values of $x$:', placeholder: 'e.g. 2, 9' })],
        hints: ['Set $R = C$ and collect all the terms on one side.', 'Factor (after dividing by any common factor) to solve for $x$.'],
        solution: [
          `Set $R = C$: $${stdTex(-a, b, 0)} = ${m}x + ${F}$.`,
          `Collect the terms: $${stdTex(-a, b - m, -F)} = 0$.`,
          ...(a === 1 ? [`Multiply by $-1$: $${stdTex(1, -(x1 + x2), x1 * x2)} = 0$.`] : [`Divide by $${-a}$: $${stdTex(1, -(x1 + x2), x1 * x2)} = 0$.`]),
          `Factor: $(x - ${x1})(x - ${x2}) = 0$, so $x = ${x1}$ or $x = ${x2}$.`,
          `The business breaks even at $x = ${x1}$ and $x = ${x2}$, that is, at ${x1 * 100} and ${x2 * 100} ${prod}.`,
        ],
      };
    }

    if (d === 2) {
      const kind = rng.int(0, 2);
      if (kind === 0) {
        const x = rng.int(2, 11);
        const y = rng.int(x + 1, 16);
        const S = x + y;
        const T = x * x + y * y;
        const half = (S * S - T) / 2;
        return {
          prompt: `Two positive numbers have a sum of $${S}$, and the sum of their squares is $${T}$. Write a system of equations and solve it to find the two numbers.`,
          parts: [part({ kind: 'numbers', values: [x, y] }, { label: 'The two numbers:', placeholder: 'e.g. 4, 9' })],
          hints: [`Let the numbers be $x$ and $y$: $x + y = ${S}$ and $x^2 + y^2 = ${T}$.`, `Solve the linear equation for $y$ and substitute: $x^2 + (${S} - x)^2 = ${T}$.`],
          solution: [
            `$${sysTex(`x + y = ${S}`, `x^2 + y^2 = ${T}`)}$`,
            `From the first equation, $y = ${S} - x$. Substitute: $x^2 + (${S} - x)^2 = ${T}$.`,
            `Expand: $x^2 + ${S * S} - ${2 * S}x + x^2 = ${T}$, so $2x^2 - ${2 * S}x + ${S * S - T} = 0$.`,
            `Divide by $2$: $x^2 - ${S}x + ${half} = 0$, so $(x - ${x})(x - ${y}) = 0$.`,
            `If $x = ${x}$ then $y = ${y}$; if $x = ${y}$ then $y = ${x}$. Either way, the numbers are $${x}$ and $${y}$.`,
          ],
        };
      }
      if (kind === 1) {
        const pat = rng.pick(PATIOS);
        const W = rng.int(2, 9);
        const L = rng.int(W + 1, 15);
        const P = 2 * (L + W);
        const A = L * W;
        const u = pat.unit;
        return {
          prompt: `${pat.what} has a perimeter of $${P}$ ${u} and an area of $${A}$ ${u}². Write a system of equations and solve it to find the length and the width (the length is the longer side).`,
          parts: [numPart(L, { label: 'Length:', suffix: u }), numPart(W, { label: 'Width:', suffix: u })],
          hints: [`Let the length be $l$ and the width $w$: $2l + 2w = ${P}$ and $lw = ${A}$.`, `Solve the linear equation for $w$, substitute it into $lw = ${A}$, and solve the quadratic.`],
          solution: [
            `$${sysTex(`2l + 2w = ${P}`, `lw = ${A}`)}$`,
            `From the first equation, $w = ${P / 2} - l$. Substitute: $l(${P / 2} - l) = ${A}$.`,
            `Rearrange: $l^2 - ${P / 2}l + ${A} = 0$, so $(l - ${W})(l - ${L}) = 0$.`,
            `$l = ${W}$ or $l = ${L}$. The other side is then $${L}$ or $${W}$, so the rectangle is $${L}$ ${u} by $${W}$ ${u}.`,
            `Length $${L}$ ${u}, width $${W}$ ${u}.`,
          ],
        };
      }
      for (;;) {
        const a = rng.pick([0.5, 0.25, 0.2, 0.1]);
        const X = rng.pick([6, 8, 10, 12, 15, 20]);
        const m = rng.pick([0.1, 0.2, 0.25, 0.5]);
        const b = Math.round((m + a * X) * 1000) / 1000;
        if (b > 4 || a * X < 0.9) continue;
        const Y = Math.round(m * X * 1000) / 1000;
        return {
          prompt: `${name} chips a golf ball from the bottom of a hill that rises at a constant slope. With the origin where the ball is hit, the ball’s path is $y = ${stdTex(-a, b, 0, 'x', true)}$ and the surface of the hill is $y = ${fmt(m)}x$, where $x$ and $y$ are in metres. Where does the ball land on the hill?`,
          parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Landing point:', placeholder: '(x, y)' })],
          hints: ['The ball lands where its path meets the hill: solve the system.', 'Set the expressions for $y$ equal; the equation factors with a common factor of $x$.'],
          solution: [
            `Set the expressions equal: $${stdTex(-a, b, 0, 'x', true)} = ${fmt(m)}x$.`,
            `Collect the terms: $${stdTex(-a, Math.round((b - m) * 1000) / 1000, 0, 'x', true)} = 0$, so $x(${fmt(-a)}x + ${fmt(b - m)}) = 0$.`,
            `$x = 0$ is where the ball was hit. The other solution is $x = \\dfrac{${fmt(b - m)}}{${fmt(a)}} = ${X}$.`,
            `Then $y = ${fmt(m)}(${X}) = ${fmt(Y)}$.`,
            `The ball lands at $(${X}, ${fmt(Y)})$: $${X}$ m across and $${fmt(Y)}$ m up the hill.`,
          ],
        };
      }
    }

    // d === 3
    const kind = rng.int(0, 2);
    if (kind === 0) {
      for (;;) {
        const v1 = rng.int(15, 25);
        const c1 = rng.pick([0, 1, 1.5]);
        const v2 = v1 - rng.int(3, 8);
        const c2 = c1 + rng.int(5, 20);
        const t = (c2 - c1) / (v1 - v2);
        const h = -4.9 * t * t + v1 * t + c1;
        if (h <= 1 || !safeRound(t, 1) || !safeRound(h, 1)) continue;
        const other = rng.pick(NAMES.filter((n) => n !== name));
        return {
          prompt: `At the same moment, ${name} throws a ball straight up from the ground and ${other} throws a ball straight up from a balcony. Their heights, in metres, after $t$ seconds are $h = ${stdTex(-4.9, v1, c1, 't', true)}$ and $h = ${stdTex(-4.9, v2, c2, 't', true)}$. When are the two balls at the same height, and what is that height? Give both to the nearest tenth.`,
          parts: [numPart(t, { label: 'Time:', suffix: 's', decimals: 1 }), numPart(h, { label: 'Height:', suffix: 'm', decimals: 1 })],
          hints: ['Set the two heights equal. What happens to the $t^2$ terms?', 'Solve for $t$, then substitute into either equation for the height.'],
          solution: [
            `Set the heights equal: $${stdTex(-4.9, v1, c1, 't', true)} = ${stdTex(-4.9, v2, c2, 't', true)}$.`,
            `The $-4.9t^2$ terms cancel: $${v1 - v2}t = ${fmt(c2 - c1)}$, so $t = \\dfrac{${fmt(c2 - c1)}}{${v1 - v2}} \\approx ${fmt(t, 4)}$.`,
            `Height: $h \\approx -4.9(${fmt(t, 4)})^2 + ${v1}(${fmt(t, 4)})${c1 ? ` + ${fmt(c1)}` : ''} \\approx ${fmt(h, 3)}$.`,
            `The balls are at the same height after about $${fmtFixed(t, 1)}$ s, at about $${fmtFixed(h, 1)}$ m.`,
          ],
        };
      }
    }
    if (kind === 1) {
      for (;;) {
        const a = rng.pick([0.5, 1, 2]);
        const Bp = rng.int(8, 24);
        const F = rng.int(5, 40);
        const m = rng.int(2, 8);
        const D = Bp * Bp - 4 * a * F;
        if (D <= 0 || Number.isInteger(Math.sqrt(D))) continue;
        const r1 = (Bp - Math.sqrt(D)) / (2 * a);
        const r2 = (Bp + Math.sqrt(D)) / (2 * a);
        if (r1 < 0.5 || !safeRound(r1, 1) || !safeRound(r2, 1)) continue;
        const prod = rng.pick(PRODUCTS);
        return {
          prompt: `For $x$ hundred ${prod}, a company’s revenue is $R = ${stdTex(-a, Bp + m, 0, 'x', true)}$ and its cost is $C = ${m}x + ${F}$, both in thousands of dollars. Find the break-even values of $x$ (where revenue equals cost), to the nearest tenth.`,
          parts: [part({ kind: 'numbers', values: [r1, r2], decimals: 1 }, { label: 'Break-even values of $x$:', placeholder: 'e.g. 1.4, 12.6' })],
          hints: ['Set $R = C$ and collect all the terms on one side.', 'The quadratic does not factor: use the quadratic formula.'],
          solution: [
            `Set $R = C$: $${stdTex(-a, Bp + m, 0, 'x', true)} = ${m}x + ${F}$.`,
            `Collect the terms on one side: $${stdTex(a, -Bp, F, 'x', true)} = 0$.`,
            `Quadratic formula: $x = \\dfrac{${Bp} \\pm \\sqrt{${Bp}^2 - 4(${fmt(a)})(${F})}}{2(${fmt(a)})} = \\dfrac{${Bp} \\pm \\sqrt{${D}}}{${fmt(2 * a)}}$.`,
            `$x \\approx ${fmt(r1, 3)}$ or $x \\approx ${fmt(r2, 3)}$.`,
            `The company breaks even at about $x = ${fmtFixed(r1, 1)}$ and $x = ${fmtFixed(r2, 1)}$ (about ${Math.round(r1 * 100)} and ${Math.round(r2 * 100)} ${prod}).`,
          ],
        };
      }
    }
    for (;;) {
      const a = rng.pick([0.1, 0.2, 0.25, 0.5]);
      const b = rng.pick([1.5, 2, 2.5, 3]);
      const c = rng.pick([1, 1.5, 2]);
      const m = rng.pick([0.2, 0.25, 0.4, 0.5]);
      if (b - m < 1) continue;
      const D = (b - m) ** 2 + 4 * a * c;
      const X = (b - m + Math.sqrt(D)) / (2 * a);
      const neg = (b - m - Math.sqrt(D)) / (2 * a);
      const Y = m * X;
      if (!safeRound(X, 1) || !safeRound(Y, 1) || X > 40) continue;
      return {
        prompt: `${name} throws a ball from a point $${fmt(c)}$ m above the base of a hill. Taking the base of the hill as the origin, the path of the ball is $y = ${stdTex(-a, b, c, 'x', true)}$ and the surface of the hill is $y = ${fmt(m)}x$, where $x$ and $y$ are in metres. How far horizontally from the origin does the ball land on the hill, and at what height? Give both to the nearest tenth.`,
        parts: [numPart(X, { label: 'Horizontal distance:', suffix: 'm', decimals: 1 }), numPart(Y, { label: 'Height:', suffix: 'm', decimals: 1 })],
        hints: ['Set the expressions for $y$ equal and collect the terms on one side.', 'Use the quadratic formula and reject any solution that does not make sense.'],
        solution: [
          `Set the expressions equal: $${stdTex(-a, b, c, 'x', true)} = ${fmt(m)}x$.`,
          `Collect the terms: $${stdTex(a, Math.round((m - b) * 1000) / 1000, -c, 'x', true)} = 0$.`,
          `Quadratic formula: $x = \\dfrac{${fmt(b - m)} \\pm \\sqrt{${fmt((b - m) ** 2)} + ${fmt(4 * a * c)}}}{${fmt(2 * a)}}$, so $x \\approx ${fmt(X, 3)}$ or $x \\approx ${fmt(neg, 3)}$.`,
          `Reject the negative value: the ball travels forward from the origin. So $x \\approx ${fmt(X, 3)}$.`,
          `Height: $y = ${fmt(m)}x \\approx ${fmt(Y, 3)}$.`,
          `The ball lands about $${fmtFixed(X, 1)}$ m from the origin horizontally, at a height of about $${fmtFixed(Y, 1)}$ m.`,
        ],
      };
    }
  },
});

export const SYSTEM_SKILLS: SkillDef[] = [systemGraph, linQuad, quadQuad, systemApply];
