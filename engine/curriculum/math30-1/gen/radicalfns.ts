/** Math 30-1 Unit 2 — Radical Functions (RF13). */
import { mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, SkillDef } from '../../../types.ts';
import {
  GRID8,
  baseCurve,
  baseRhsTex,
  baseRhsText,
  cl,
  curveFig,
  describeTf,
  divTex,
  endpointExtras,
  exprPart,
  innerTex,
  ivTex,
  joinList,
  kTex,
  mapPt,
  mappingTex,
  pmTex,
  polyTex,
  ptLabel,
  ptTex,
  tn,
  xImgTex,
  xh,
  yImgTex,
  type CurveSpec,
  type Fn,
  type Iv,
  type Pt,
  type Tf,
} from './transformations.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** y = a√(b(x - h)) + k as LaTeX (right side only). */
const radTex = (t: Tf) => baseRhsTex('sqrt', t);
const radFn = (t: Tf): Fn => (x) => {
  const u = t.b * (x - t.h);
  return u < -1e-12 ? NaN : t.a * Math.sqrt(Math.max(0, u)) + t.k;
};
const radDomain = (t: Tf): Iv => ({ kind: t.b > 0 ? 'ge' : 'le', a: t.h });
const radRange = (t: Tf): Iv => ({ kind: t.a > 0 ? 'ge' : 'le', a: t.k });
const flip = (iv: Iv): Iv => (iv.kind === 'ge' ? { kind: 'le', a: iv.a } : iv.kind === 'le' ? { kind: 'ge', a: iv.a } : iv);
const ge = (a: number): Iv => ({ kind: 'ge', a });
const le = (a: number): Iv => ({ kind: 'le', a });
const ivKey = (iv: Iv) => JSON.stringify(iv);
/** The same one-sided interval with a different endpoint. */
const moveTo = (iv: Iv, a: number): Iv => (iv.kind === 'ge' || iv.kind === 'le' ? { kind: iv.kind, a } : iv);

/** Several distinct interval choices, as Markdown. */
function ivChoices(v: string, correct: Iv, wrong: Iv[], notation: 'set' | 'interval') {
  const seen = new Set([ivKey(correct)]);
  const ws: Iv[] = [];
  for (const w of wrong) if (!seen.has(ivKey(w))) (seen.add(ivKey(w)), ws.push(w));
  return { correct: `$${ivTex(v, correct, notation)}$`, wrong: ws.map((w) => `$${ivTex(v, w, notation)}$`) };
}

/** Domain and range as two multiple-choice parts. */
function drParts(rng: Rng, dom: { correct: Iv; wrong: Iv[] }, rg: { correct: Iv; wrong: Iv[] }, notation: 'set' | 'interval'): Part[] {
  const d = ivChoices('x', dom.correct, dom.wrong, notation);
  const r = ivChoices('y', rg.correct, rg.wrong, notation);
  return [part(mc(rng, d.correct, d.wrong), { label: 'Domain:' }), part(mc(rng, r.correct, r.wrong), { label: 'Range:' })];
}

/** px + q with the x-term first, or q - x when p is negative. */
function linIn(p: number, q: number): string {
  if (p > 0) return polyTex([q, p]);
  const px = `${Math.abs(p) === 1 ? '' : tn(Math.abs(p))}x`;
  return q === 0 ? `-${px}` : `${tn(q)} - ${px}`;
}

/** " - x - 1" or " + 2x + 3": a polynomial with its leading sign, to append to an expression. */
function signedPoly(asc: number[]): string {
  const s = polyTex(asc);
  if (s === '0') return '';
  return s.startsWith('-') ? ` - ${s.slice(1)}` : ` + ${s}`;
}

const SQUARES = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
const solPart = (values: number[], decimals?: number): Part =>
  part({ kind: 'numbers', values, ...(decimals !== undefined && { decimals }) }, { label: 'Solution(s):', placeholder: 'e.g. 3, -2 or none' });
const xList = (vals: number[]) => (vals.length ? vals.map((x) => `$x = ${tn(x)}$`).join(' and ') : 'no solution');

/** True when x is not within 0.0005·10^-d of a rounding boundary. */
const safeRound = (x: number, d: number) => {
  const s = Math.abs(x) * 10 ** d;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.05;
};

// ---------------------------------------------------------------------------
// 2.1 — Radical functions and transformations
// ---------------------------------------------------------------------------

const KEY_SQRT: Pt[] = [
  [0, 0],
  [1, 1],
  [4, 2],
  [9, 3],
  [16, 4],
];

const radicalTransform = skill({
  id: 'm301-radical-transform',
  name: 'Transforming radical functions',
  description: 'Graph y = a√(b(x − h)) + k from y = √x, find image points, write equations from graphs, and state domain and range.',
  outcomes: ['RF13'],
  lessonId: 'm301-2-1',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['domainRange', 'imagePoint'] as const) : d === 2 ? rng.pick(['domainRangeFull', 'imagePointFull', 'graphMatch'] as const) : rng.pick(['fromGraph', 'factorDomain', 'equationWords'] as const);
    const notation = rng.pick(['set', 'interval'] as const);
    const hintDR = 'The endpoint of the graph is $(h, k)$. A negative $b$ makes the graph open to the left; a negative $a$ makes it open downward.';

    if (kind === 'domainRange' || kind === 'domainRangeFull') {
      const t: Tf =
        kind === 'domainRange'
          ? { a: rng.pick([1, 1, -1]), b: 1, h: rng.nonZero(-9, 9), k: rng.nonZero(-9, 9) }
          : retry(
              () => ({ a: rng.pick([1, 2, 3, -1, -2, 1 / 2, -3]), b: rng.pick([1, 2, 3, -1, -2, -3, 1 / 2, -1 / 2]), h: rng.nonZero(-8, 8), k: rng.nonZero(-8, 8) }),
              (x) => (x.a < 0 || x.b < 0) && x.h !== x.k && x.h !== -x.k,
            );
      const dom = radDomain(t);
      const rg = radRange(t);
      return {
        prompt: `State the domain and range of $y = ${radTex(t)}$.`,
        parts: drParts(rng, { correct: dom, wrong: [flip(dom), moveTo(dom, -t.h), moveTo(dom, t.k), { kind: 'all' }] }, { correct: rg, wrong: [flip(rg), moveTo(rg, -t.k), moveTo(rg, t.h), { kind: 'all' }] }, notation),
        hints: [hintDR, 'The domain comes from the radicand (the expression under the root): it must be $\\ge 0$.'],
        solution: [
          `Compare with $y = a\\sqrt{b(x - h)} + k$: $a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$. The endpoint is $${ptTex(t.h, t.k)}$.`,
          `The radicand $${innerTex(t.b, t.h)}$ must not be negative: ${t.b > 0 ? `$x \\ge ${tn(t.h)}$` : `since $b < 0$, $x \\le ${tn(t.h)}$`} (the graph opens to the ${t.b > 0 ? 'right' : 'left'}).`,
          t.a > 0 ? `$a > 0$, so the graph rises from the endpoint: $y \\ge ${tn(t.k)}$.` : `$a < 0$, so the graph falls from the endpoint: $y \\le ${tn(t.k)}$.`,
          `Domain $${ivTex('x', dom, notation)}$; range $${ivTex('y', rg, notation)}$.`,
        ],
      };
    }

    if (kind === 'imagePoint' || kind === 'imagePointFull') {
      let t: Tf;
      if (kind === 'imagePoint') {
        const type = rng.pick(['trans', 'vert', 'horiz', 'refl'] as const);
        t =
          type === 'trans'
            ? { a: 1, b: 1, h: rng.nonZero(-8, 8), k: rng.nonZero(-8, 8) }
            : type === 'vert'
              ? { a: rng.pick([2, 3, 4, 5]), b: 1, h: 0, k: 0 }
              : type === 'horiz'
                ? { a: 1, b: rng.pick([1 / 2, 1 / 3, 1 / 4, 2]), h: 0, k: 0 }
                : { a: rng.pick([1, -1]), b: 1, h: 0, k: 0 };
        if (type === 'refl') t = t.a === 1 ? { ...t, b: -1 } : t;
      } else {
        t = retry(
          () => ({ a: rng.pick([2, 3, -1, -2, 1 / 2, -1 / 2]), b: rng.pick([1, -1, 2, -2, 1 / 2, -1 / 2, 1 / 3]), h: rng.nonZero(-6, 6), k: rng.nonZero(-6, 6) }),
          (x) => describeTf(x).length >= 3,
        );
      }
      const pool = KEY_SQRT.slice(1).filter(([x, y]) => Number.isInteger(cl(x / t.b)) && Number.isInteger(cl(t.a * y)));
      const [x0, y0] = rng.pick(pool.length ? pool : KEY_SQRT.slice(1));
      const [X, Y] = mapPt([x0, y0], t);
      return {
        prompt: `The point $${ptTex(x0, y0)}$ is on the graph of $y = \\sqrt{x}$. What is the corresponding point on the graph of $y = ${radTex(t)}$?`,
        parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
        hints: ['Compare with $y = a\\sqrt{b(x - h)} + k$ and use the mapping $(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.', 'Stretch and reflect first, then translate.'],
        solution: [`$a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$.`, `Mapping: $${mappingTex(t)}$`, `$x$: $${xImgTex(x0, t)}$; $y$: $${yImgTex(y0, t)}$`, `The image point is $${ptTex(X, Y)}$.`],
      };
    }

    if (kind === 'graphMatch') {
      const t: Tf = retry(
        () => ({ a: rng.pick([1, 2, -1, -2]), b: rng.pick([1, -1, 2, -2]), h: rng.nonZero(-4, 4), k: rng.nonZero(-3, 3) }),
        (x) => Math.abs(x.a) === 1 || Math.abs(x.b) === 1,
      );
      const opts = [t, { ...t, a: -t.a }, { ...t, b: -t.b }, { ...t, h: -t.h }].map((x, i) => ({ md: '', figure: curveFig(GRID8, [baseCurve('sqrt', x)]), correct: i === 0 }));
      return {
        prompt: `Which graph shows $y = ${radTex(t)}$?`,
        parts: [part(mcFigures(rng, opts))],
        hints: [hintDR, 'Find the endpoint first, then decide which way the graph opens.'],
        solution: [
          `The endpoint is $(h, k) = ${ptTex(t.h, t.k)}$.`,
          `$b ${t.b > 0 ? '> 0' : '< 0'}$, so the graph opens to the ${t.b > 0 ? 'right' : 'left'}; $a ${t.a > 0 ? '> 0' : '< 0'}$, so it goes ${t.a > 0 ? 'up' : 'down'} from the endpoint.`,
          `Another point: $${ptTex(...mapPt([1, 1], t))}$ (the image of $(1, 1)$).`,
        ],
      };
    }

    if (kind === 'fromGraph') {
      const t: Tf = retry(
        () => ({ a: rng.pick([1, 2, 3, -1, -2, -3, 1 / 2, -1 / 2]), b: rng.pick([1, -1]), h: rng.int(-5, 5), k: rng.int(-5, 5) }),
        (x) => (x.b > 0 ? x.h <= 2 && x.h >= -6 : x.h >= -1 && x.h <= 6) && Math.abs(x.k + 2 * x.a) <= 7 && (x.h !== 0 || x.k !== 0),
      );
      const xs = Math.abs(t.a) < 1 ? [t.h, t.h + 4 * t.b] : [t.h, t.h + t.b, t.h + 4 * t.b];
      const pts = xs.map((x) => [x, cl(radFn(t)(x))] as Pt);
      const p1 = pts[1];
      const rhs = radTex(t);
      return {
        prompt: 'Write an equation of the radical function shown, in the form $y = a\\sqrt{b(x - h)} + k$, with $b = 1$ or $b = -1$.',
        figure: curveFig(GRID8, [baseCurve('sqrt', t)], { points: pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })) }),
        parts: [exprPart(baseRhsText('sqrt', t), { label: '$y =$', placeholder: 'e.g. -2sqrt(x + 3) + 1' })],
        hints: [hintDR, 'Read $(h, k)$ from the endpoint, then substitute another labelled point to find $a$.'],
        solution: [
          `The endpoint is $${ptTex(t.h, t.k)}$, so $h = ${tn(t.h)}$ and $k = ${tn(t.k)}$. The graph opens to the ${t.b > 0 ? 'right, so $b = 1$' : 'left, so $b = -1$'}.`,
          `Substitute $${ptTex(...p1)}$ into $y = a\\sqrt{${innerTex(t.b, t.h)}}${kTex(t.k)}$: $${tn(p1[1])} = a\\sqrt{${tn(t.b * (p1[0] - t.h))}} ${pmTex(t.k)}$, so $${Math.sqrt(t.b * (p1[0] - t.h)) === 1 ? '' : tn(Math.sqrt(t.b * (p1[0] - t.h)))}a = ${tn(p1[1] - t.k)}$.`,
          `$a = ${tn(t.a)}$, so $y = ${rhs}$.`,
        ],
        answerDisplay: `$y = ${rhs}$`,
      };
    }

    if (kind === 'factorDomain') {
      const b = rng.pick([2, 3, 4, 5, -2, -3, -4, -5]);
      const h = rng.nonZero(-6, 6);
      const a = rng.pick([1, 2, 3, -1, -2]);
      const k = rng.intExcept(-8, 8, [h, -h]);
      const t: Tf = { a, b, h, k };
      const inside = linIn(b, -b * h);
      const shown = `${a === 1 ? '' : a === -1 ? '-' : a}\\sqrt{${inside}}${t.k === 0 ? '' : ` ${pmTex(k)}`}`;
      const dom = radDomain(t);
      const rg = radRange(t);
      return {
        prompt: `State the domain and range of $y = ${shown}$.`,
        parts: drParts(rng, { correct: dom, wrong: [flip(dom), ge(-b * h), le(-h), { kind: 'all' }] }, { correct: rg, wrong: [flip(rg), moveTo(rg, -k), ge(0), { kind: 'all' }] }, notation),
        hints: ['Factor the radicand so it has the form $b(x - h)$, or solve "radicand $\\ge 0$" directly.', 'When you divide an inequality by a negative number, reverse the inequality sign.'],
        solution: [
          `Factor: $${inside} = ${tn(b)}(${xh(h)})$, so $y = ${radTex(t)}$ with endpoint $${ptTex(h, k)}$.`,
          `Domain: $${inside} \\ge 0$ gives $${polyTex([0, b])} \\ge ${tn(b * h)}$, so $x ${b > 0 ? '\\ge' : '\\le'} ${tn(h)}$${b < 0 ? ' (dividing by a negative reverses the sign)' : ''}.`,
          `Range: the root is never negative and $a = ${tn(a)}$ ${a > 0 ? 'is positive, so $y \\ge ' + tn(k) + '$' : 'is negative, so $y \\le ' + tn(k) + '$'}.`,
          `Domain $${ivTex('x', dom, notation)}$; range $${ivTex('y', rg, notation)}$.`,
        ],
      };
    }

    // equationWords: write the equation from a description, then its domain and range.
    const t: Tf = retry(
      () => ({ a: rng.pick([2, 3, -1, -2, 1 / 2, -3]), b: rng.pick([1, -1, 2, 1 / 2, -2, 1 / 3]), h: rng.nonZero(-6, 6), k: rng.nonZero(-6, 6) }),
      (x) => describeTf(x).length >= 3 && (x.b > 0 ? x.h <= 2 : x.h >= -1),
    );
    const rhs = radTex(t);
    const dom = radDomain(t);
    const rg = radRange(t);
    const both = (dm: Iv, r: Iv) => `Domain $${ivTex('x', dm, notation)}$; range $${ivTex('y', r, notation)}$`;
    return {
      prompt: `The graph of $y = \\sqrt{x}$ is transformed by ${joinList(describeTf(t))}. (a) Write the equation of the image graph. (b) State its domain and range.`,
      parts: [
        exprPart(baseRhsText('sqrt', t), { label: '(a) $y =$', placeholder: 'e.g. -2sqrt(x + 3) + 1' }),
        part(mc(rng, both(dom, rg), [both(flip(dom), rg), both(dom, flip(rg)), both(moveTo(dom, -t.h), moveTo(rg, -t.k)), both(flip(dom), flip(rg))]), { label: '(b)' }),
      ],
      hints: ['A vertical stretch factor gives $|a|$ (negative for a reflection in the $x$-axis); a horizontal stretch factor $s$ gives $|b| = \\frac{1}{s}$ (negative for a reflection in the $y$-axis).', hintDR],
      solution: [
        `$a = ${tn(t.a)}$, $b = ${tn(t.b)}$, $h = ${tn(t.h)}$, $k = ${tn(t.k)}$.`,
        `(a) $y = ${rhs}$`,
        `The endpoint is $${ptTex(t.h, t.k)}$; the graph opens to the ${t.b > 0 ? 'right' : 'left'} and goes ${t.a > 0 ? 'up' : 'down'}.`,
        `(b) ${both(dom, rg)}.`,
      ],
      answerDisplay: `(a) $y = ${rhs}$; (b) ${both(dom, rg)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 2.2 — Square root of a function
// ---------------------------------------------------------------------------

/** Curve of y = √f(x), dense near the zeros of f. */
function sqrtOfCurve(f: Fn, zeros: number[], color: 'brand' | 'muted' = 'brand'): CurveSpec {
  const extra = zeros.flatMap((z) => [...endpointExtras(z, 1, 2), ...endpointExtras(z, -1, 2)]);
  return { f: (x) => (f(x) < -1e-12 ? NaN : Math.sqrt(Math.max(0, f(x)))), color, extra };
}

const sqrtOfFunction = skill({
  id: 'm301-sqrt-of-function',
  name: 'Square root of a function',
  description: 'Relate y = f(x) and y = √f(x): corresponding points, invariant points, domain, range and graphs, for linear and quadratic f.',
  outcomes: ['RF13'],
  lessonId: 'm301-2-2',
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['pointMap', 'evaluate'] as const) : d === 2 ? rng.pick(['domainLinear', 'invariantLinear', 'graphLinear'] as const) : rng.pick(['domainQuad', 'rangeQuad', 'invariantQuad', 'graphQuad'] as const);
    const notation = rng.pick(['set', 'interval'] as const);
    const hintMap = 'Each point $(x, y)$ on $y = f(x)$ with $y \\ge 0$ corresponds to $(x, \\sqrt{y})$ on $y = \\sqrt{f(x)}$.';

    if (kind === 'pointMap') {
      const x0 = rng.int(-9, 9);
      const v = rng.pick(SQUARES);
      const r = Math.sqrt(v);
      return {
        prompt: `The point $${ptTex(x0, v)}$ is on the graph of $y = f(x)$. What is the corresponding point on the graph of $y = \\sqrt{f(x)}$?`,
        parts: [part({ kind: 'point', x: x0, y: r }, { label: 'Point:', placeholder: '(x, y)' })],
        hints: [hintMap, 'The $x$-coordinate does not change.'],
        solution: [`$(x, y) \\to (x, \\sqrt{y})$`, `$${ptTex(x0, v)} \\to (${x0}, \\sqrt{${v}}) = ${ptTex(x0, r)}$${v <= 1 ? ` — an invariant point, because $\\sqrt{${v}} = ${v}$` : ''}.`],
      };
    }

    if (kind === 'evaluate') {
      const quad = rng.chance(0.4);
      const s = rng.int(1, 8);
      if (quad) {
        const x0 = rng.nonZero(-6, 6);
        const c = s * s - x0 * x0;
        return {
          prompt: `Given $f(x) = ${polyTex([c, 0, 1])}$, evaluate $y = \\sqrt{f(x)}$ at $x = ${x0}$.`,
          parts: [numPart(s, { label: '$y =$' })],
          hints: ['Find $f(' + x0 + ')$ first, then take its square root.', 'The principal square root is never negative.'],
          solution: [`$f(${x0}) = (${x0})^2 ${pmTex(c)} = ${s * s}$`, `$y = \\sqrt{${s * s}} = ${s}$`],
        };
      }
      const m = rng.pick([2, 3, 4, 5, -2, -3]);
      const x0 = rng.nonZero(-6, 6);
      const c = s * s - m * x0;
      return {
        prompt: `Given $f(x) = ${polyTex([c, m])}$, evaluate $y = \\sqrt{f(x)}$ at $x = ${x0}$.`,
        parts: [numPart(s, { label: '$y =$' })],
        hints: ['Find $f(' + x0 + ')$ first, then take its square root.', 'The principal square root is never negative.'],
        solution: [`$f(${x0}) = ${m}(${x0}) ${pmTex(c)} = ${s * s}$`, `$y = \\sqrt{${s * s}} = ${s}$`],
      };
    }

    if (kind === 'domainLinear' || kind === 'invariantLinear' || kind === 'graphLinear') {
      const m = rng.pick([1, -1, 2, -2, 1 / 2, -1 / 2, 3]);
      const r0 = rng.nonZero(-5, 5);
      const c = cl(-m * r0);
      const f: Fn = (x) => m * x + c;
      const ftex = polyTex([c, m]);
      const r1 = cl((1 - c) / m);
      if (kind === 'domainLinear') {
        const dom: Iv = m > 0 ? ge(r0) : le(r0);
        return {
          prompt: `Given $f(x) = ${ftex}$, state the domain and range of $y = \\sqrt{f(x)}$.`,
          parts: drParts(rng, { correct: dom, wrong: [flip(dom), m > 0 ? ge(-r0) : le(-r0), { kind: 'all' }, ge(c)] }, { correct: ge(0), wrong: [{ kind: 'all' }, ge(c), le(0)] }, notation),
          hints: ['$\\sqrt{f(x)}$ is defined only where $f(x) \\ge 0$.', 'A square root is never negative, and $f(x)$ takes every value $\\ge 0$.'],
          solution: [
            `Domain: solve $${ftex} \\ge 0$: $${polyTex([0, m])} \\ge ${tn(-c)}$, so $x ${m > 0 ? '\\ge' : '\\le'} ${tn(r0)}$${m < 0 ? ' (dividing by a negative reverses the sign)' : ''}.`,
            'Range: $f(x)$ takes all values $\\ge 0$ on this domain, so $\\sqrt{f(x)}$ takes all values $\\ge 0$.',
            `Domain $${ivTex('x', dom, notation)}$; range $${ivTex('y', ge(0), notation)}$.`,
          ],
        };
      }
      if (kind === 'invariantLinear') {
        const pts: Pt[] = [
          [r0, 0],
          [r1, 1],
        ].sort((p, q) => p[0] - q[0]) as Pt[];
        return {
          prompt: `Given $f(x) = ${ftex}$, find the invariant points of $y = f(x)$ and $y = \\sqrt{f(x)}$. Enter the point with the smaller $x$-coordinate first.`,
          parts: pts.map(([x, y], i) => part({ kind: 'point', x, y }, { label: i === 0 ? 'First point:' : 'Second point:', placeholder: '(x, y)' })),
          hints: ['A point is invariant when $\\sqrt{y} = y$, which happens only for $y = 0$ and $y = 1$.', 'Solve $f(x) = 0$ and $f(x) = 1$.'],
          solution: [`$\\sqrt{y} = y$ only when $y = 0$ or $y = 1$.`, `$${ftex} = 0$ gives $x = ${tn(r0)}$.`, `$${ftex} = 1$ gives $${polyTex([0, m])} = ${tn(1 - c)}$, so $x = ${tn(r1)}$.`, `The invariant points are $${ptTex(...pts[0])}$ and $${ptTex(...pts[1])}$.`],
        };
      }
      const ghost: CurveSpec = { f, color: 'muted' };
      const fig = (main: CurveSpec): PlaneFigure => curveFig(GRID8, [ghost, main]);
      const opts = [
        { md: '', figure: fig(sqrtOfCurve(f, [r0])), correct: true },
        { md: '', figure: fig({ f: (x) => (f(x) < 0 ? NaN : f(x)), extra: [r0] }) },
        { md: '', figure: fig({ ...sqrtOfCurve(f, [r0]), f: (x) => (f(x) < 0 ? NaN : -Math.sqrt(f(x))) }) },
        { md: '', figure: fig(sqrtOfCurve((x) => -f(x), [r0])) },
      ];
      return {
        prompt: `The graph of $y = f(x)$, where $f(x) = ${ftex}$, is shown in grey in each graph. Which graph also shows $y = \\sqrt{f(x)}$ in colour?`,
        parts: [part(mcFigures(rng, opts))],
        hints: [hintMap, 'The graph of $y = \\sqrt{f(x)}$ exists only where $f(x) \\ge 0$, lies on or above the $x$-axis, and passes through the invariant points where $f(x) = 0$ and $f(x) = 1$.'],
        solution: [
          `$f(x) \\ge 0$ when $x ${m > 0 ? '\\ge' : '\\le'} ${tn(r0)}$, so the graph of $y = \\sqrt{f(x)}$ starts at $${ptTex(r0, 0)}$ and goes to the ${m > 0 ? 'right' : 'left'}.`,
          `It meets $y = f(x)$ at $${ptTex(r0, 0)}$ and $${ptTex(r1, 1)}$; where $f(x) > 1$ it lies below the line, because $\\sqrt{y} < y$ for $y > 1$.`,
          'The correct graph is a half-parabola shape starting on the $x$-axis.',
        ],
      };
    }

    // Quadratic f.
    if (kind === 'domainQuad') {
      const type = rng.pick(['up', 'up', 'down', 'pos'] as const);
      let asc: number[];
      let dom: Iv;
      let roots: number[] = [];
      if (type === 'pos') {
        const c = rng.int(1, 9);
        const h = rng.int(-4, 4);
        asc = [h * h + c, -2 * h, 1];
        dom = { kind: 'all' };
      } else {
        const r1 = rng.int(-7, 4);
        const r2 = r1 + rng.int(2, 8);
        roots = [r1, r2];
        const s = type === 'up' ? 1 : -1;
        asc = [s * r1 * r2, -s * (r1 + r2), s];
        dom = type === 'up' ? { kind: 'outside', a: r1, b: r2 } : { kind: 'between', a: r1, b: r2 };
      }
      const [r1, r2] = roots.length ? roots : [rng.int(-5, -1), rng.int(1, 5)];
      const cands: Iv[] = [
        { kind: 'outside', a: r1, b: r2 },
        { kind: 'between', a: r1, b: r2 },
        ge(Math.max(r1, r2)),
        { kind: 'all' },
        { kind: 'between', a: -r2, b: -r1 },
      ];
      const wrong = cands.filter((w) => ivKey(w) !== ivKey(dom));
      const ftex = polyTex(asc);
      const d0 = ivChoices('x', dom, wrong, notation);
      return {
        prompt: `Given $f(x) = ${ftex}$, what is the domain of $y = \\sqrt{f(x)}$?`,
        parts: [part(mc(rng, d0.correct, d0.wrong))],
        hints: ['$\\sqrt{f(x)}$ is defined only where $f(x) \\ge 0$.', 'Find the zeros of $f$, then decide whether the parabola is above the $x$-axis between them or outside them.'],
        solution:
          type === 'pos'
            ? [`Complete the square: $f(x) = (${xh(-asc[1] / 2)})^2 + ${asc[0] - (asc[1] / 2) ** 2}$.`, 'This is always positive, so $f(x) \\ge 0$ for every $x$.', `Domain: $${ivTex('x', dom, notation)}$.`]
            : [
                `Factor: $f(x) = ${type === 'down' ? '-' : ''}(${xh(r1)})(${xh(r2)})$, with zeros $${r1}$ and $${r2}$.`,
                type === 'up' ? 'The parabola opens up, so $f(x) \\ge 0$ outside the zeros.' : 'The parabola opens down, so $f(x) \\ge 0$ between the zeros.',
                `Domain: $${ivTex('x', dom, notation)}$.`,
              ],
      };
    }

    if (kind === 'rangeQuad') {
      const type = rng.pick(['cap', 'cup', 'cross'] as const);
      const h = rng.int(-4, 4);
      const q = rng.pick([1, 2, 3, 4, 5]);
      const asc = type === 'cap' ? [q * q - h * h, 2 * h, -1] : type === 'cup' ? [h * h + q * q, -2 * h, 1] : [h * h - q * q, -2 * h, 1];
      const vertexForm = type === 'cap' ? `-(${xh(h)})^2 + ${q * q}` : type === 'cup' ? `(${xh(h)})^2 + ${q * q}` : `(${xh(h)})^2 - ${q * q}`;
      const correct: Iv = type === 'cap' ? { kind: 'between', a: 0, b: q } : type === 'cup' ? ge(q) : ge(0);
      const cands: Iv[] = [{ kind: 'between', a: 0, b: q }, { kind: 'between', a: 0, b: q * q }, ge(q), ge(q * q), ge(0), { kind: 'all' }];
      const wrong = cands.filter((w) => ivKey(w) !== ivKey(correct));
      const r0 = ivChoices('y', correct, wrong, notation);
      return {
        prompt: `Given $f(x) = ${polyTex(asc)}$, what is the range of $y = \\sqrt{f(x)}$?`,
        parts: [part(mc(rng, r0.correct, r0.wrong.slice(0, 3)))],
        hints: ['Find the range of $f$ first (complete the square to find the vertex).', 'Then take the square root of the values of $f$ that are $\\ge 0$.'],
        solution: [
          `Complete the square: $f(x) = ${vertexForm}$, with vertex $${ptTex(h, type === 'cross' ? -q * q : q * q)}$.`,
          type === 'cap'
            ? `The range of $f$ is $y \\le ${q * q}$; the values that are $\\ge 0$ are $0 \\le y \\le ${q * q}$.`
            : type === 'cup'
              ? `The range of $f$ is $y \\ge ${q * q}$ (all positive).`
              : `The range of $f$ is $y \\ge ${-q * q}$; the values that are $\\ge 0$ are $y \\ge 0$.`,
          type === 'cap' ? `Take square roots: $0 \\le y \\le \\sqrt{${q * q}} = ${q}$.` : type === 'cup' ? `Take square roots: $y \\ge \\sqrt{${q * q}} = ${q}$.` : 'Take square roots: $y \\ge 0$.',
          `Range of $y = \\sqrt{f(x)}$: $${ivTex('y', correct, notation)}$.`,
        ],
      };
    }

    if (kind === 'invariantQuad') {
      const form = rng.pick(['factored', 'cMinus'] as const);
      let asc: number[];
      let zeros: number[];
      let ones: number[];
      let steps: string[];
      if (form === 'cMinus') {
        // f(x) = c - x^2 with c = n^2 + 1: f = 1 at ±n, f = 0 at ±√c.
        const n = rng.int(1, 6);
        const c = n * n + 1;
        asc = [c, 0, -1];
        zeros = [-Math.sqrt(c), Math.sqrt(c)];
        ones = [-n, n];
        steps = [`$${c} - x^2 = 0$ gives $x = \\pm\\sqrt{${c}} \\approx \\pm ${fmtFixed(Math.sqrt(c), 2)}$.`, `$${c} - x^2 = 1$ gives $x^2 = ${n * n}$, so $x = \\pm ${n}$.`];
      } else {
        const sp = retry(
          () => {
            const r1 = rng.int(-6, 3);
            const r2 = r1 + rng.int(1, 6);
            const S = r1 + r2;
            const disc = (r2 - r1) ** 2 + 4;
            return { r1, r2, S, disc, o: [(S - Math.sqrt(disc)) / 2, (S + Math.sqrt(disc)) / 2] };
          },
          (v) => v.o.every((x) => safeRound(x, 2)),
        );
        asc = [sp.r1 * sp.r2, -sp.S, 1];
        zeros = [sp.r1, sp.r2];
        ones = sp.o;
        steps = [
          `$f(x) = (${xh(sp.r1)})(${xh(sp.r2)}) = 0$ gives $x = ${sp.r1}$ or $x = ${sp.r2}$.`,
          `$f(x) = 1$: $${polyTex([sp.r1 * sp.r2 - 1, -sp.S, 1])} = 0$, so $x = \\dfrac{${tn(sp.S)} \\pm \\sqrt{${sp.disc}}}{2} \\approx ${fmtFixed(ones[0], 2)}$ or $${fmtFixed(ones[1], 2)}$.`,
        ];
      }
      const all = [...zeros, ...ones].sort((p, q) => p - q);
      return {
        prompt: `Given $f(x) = ${polyTex(asc)}$, find the $x$-coordinates of all the invariant points of $y = f(x)$ and $y = \\sqrt{f(x)}$. Round to the nearest hundredth where necessary.`,
        parts: [part({ kind: 'numbers', values: all, decimals: 2 }, { label: '$x =$', placeholder: 'e.g. -3, 1.41' })],
        hints: ['Invariant points occur where $f(x) = 0$ or $f(x) = 1$, because $\\sqrt{0} = 0$ and $\\sqrt{1} = 1$.', 'Solve both equations; use the quadratic formula if they do not factor.'],
        solution: [...steps, `The invariant points have $x \\approx ${all.map((x) => fmtFixed(x, 2).replace(/\.00$/, '')).join(',\\ ')}$.`],
      };
    }

    // graphQuad: choose the graph of √f for a quadratic f.
    const up = rng.chance(0.6);
    const r1 = rng.int(-6, 1);
    const r2 = r1 + (up ? rng.int(2, 5) : rng.int(4, 7));
    const sc = up ? rng.pick([1, 1 / 2]) : rng.pick([1 / 2, 1 / 4]);
    const s = up ? sc : -sc;
    const f: Fn = (x) => s * (x - r1) * (x - r2);
    const ghost: CurveSpec = { f, color: 'muted', extra: [(r1 + r2) / 2] };
    const grid: GridSpec = { xMin: -8, xMax: 8, yMin: -6, yMax: 6 };
    const fig = (main: CurveSpec): PlaneFigure => curveFig(grid, [ghost, main]);
    const sq = sqrtOfCurve(f, [r1, r2]);
    const opts = [
      { md: '', figure: fig(sq), correct: true },
      { md: '', figure: fig({ f: (x) => Math.sqrt(Math.abs(f(x))), extra: sq.extra }) },
      { md: '', figure: fig({ ...sq, f: (x) => (f(x) < 0 ? NaN : -Math.sqrt(f(x))) }) },
      { md: '', figure: fig({ f: (x) => (f(x) < 0 ? NaN : f(x)), extra: [r1, r2] }) },
    ];
    const ftex = `${s === 1 ? '' : s === -1 ? '-' : tn(s)}(${xh(r1)})(${xh(r2)})`;
    const maxF = cl(-s * ((r2 - r1) / 2) ** 2);
    return {
      prompt: `The graph of $f(x) = ${ftex}$ is shown in grey in each graph. Which graph also shows $y = \\sqrt{f(x)}$ in colour?`,
      parts: [part(mcFigures(rng, opts))],
      hints: [hintMap, `$\\sqrt{f(x)}$ is undefined where $f(x) < 0$. Where is $f(x) \\ge 0$ for this parabola?`],
      solution: [
        `The zeros of $f$ are $${r1}$ and $${r2}$. The parabola opens ${up ? 'up, so $f(x) \\ge 0$ when $x \\le ' + r1 + '$ or $x \\ge ' + r2 + '$' : 'down, so $f(x) \\ge 0$ when $' + r1 + ' \\le x \\le ' + r2 + '$'}.`,
        `The graph of $y = \\sqrt{f(x)}$ exists only there, starts on the $x$-axis at the zeros, and is never negative.`,
        up ? 'It has two separate branches, each rising more slowly than the parabola once $f(x) > 1$.' : `It is a single arch from $x = ${r1}$ to $x = ${r2}$, highest at $x = ${tn((r1 + r2) / 2)}$, where $y = \\sqrt{${tn(maxF)}}${Number.isInteger(Math.sqrt(maxF)) ? ` = ${Math.sqrt(maxF)}` : ` \\approx ${fmtFixed(Math.sqrt(maxF), 2)}`}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 2.3 — Solving radical equations graphically
// ---------------------------------------------------------------------------

/** √(px + q) = mx + c with a lattice-point solution r1 (value s) and the other root r2 of the squared equation. */
interface RadEq {
  p: number;
  q: number;
  m: number;
  c: number;
  r1: number;
  r2: number;
  valid: number[];
  extraneous: number[];
}

function radEq(rng: Rng, want: 'oneExt' | 'twoValid' | 'any', ms: number[]): RadEq {
  return retry(
    () => {
      const p = rng.pick([1, 1, 2, -1]);
      const m = rng.pick(ms);
      const r1 = rng.int(-6, 6);
      const s = rng.int(1, 4);
      const q = s * s - p * r1;
      const c = cl(s - m * r1);
      const r2 = cl((p - 2 * m * c) / (m * m) - r1);
      const ok2 = m * r2 + c >= -1e-9;
      const valid = (ok2 ? [r1, r2] : [r1]).sort((a, b) => a - b);
      return { p, q, m, c, r1, r2, valid, extraneous: ok2 ? [] : [r2] };
    },
    (e) => {
      if (Math.abs(e.r2 - e.r1) < 1e-9 || !Number.isInteger(e.r2)) return false;
      if (Math.abs(e.q) > 16 || Math.abs(e.c) > 8 || Math.abs(e.r2) > 7) return false;
      const endpoint = -e.q / e.p;
      if (endpoint < -8 || endpoint > 8) return false;
      if (e.valid.some((x) => e.m * x + e.c > 7)) return false;
      if (want === 'oneExt') return e.extraneous.length === 1;
      if (want === 'twoValid') return e.valid.length === 2;
      return true;
    },
    500,
  );
}

const eqTex = (e: RadEq) => `\\sqrt{${linIn(e.p, e.q)}} = ${polyTex([e.c, e.m])}`;
const radSide = (e: { p: number; q: number }): Fn => (x) => (e.p * x + e.q < -1e-12 ? NaN : Math.sqrt(Math.max(0, e.p * x + e.q)));
const radSideCurve = (e: { p: number; q: number }, color: 'brand' | 'muted' = 'brand'): CurveSpec => ({ f: radSide(e), color, extra: endpointExtras(-e.q / e.p, e.p > 0 ? 1 : -1, 3) });

/** Algebraic check of each root of the squared equation. */
function checkLines(e: RadEq): string[] {
  return [e.r1, e.r2]
    .sort((a, b) => a - b)
    .map((r) => {
      const left = Math.sqrt(e.p * r + e.q);
      const right = cl(e.m * r + e.c);
      const ok = Math.abs(left - right) < 1e-9;
      return `Check $x = ${tn(r)}$: left side $\\sqrt{${tn(e.p * r + e.q)}} = ${tn(left)}$, right side $${tn(right)}$. ${ok ? '✓' : `✗ — $x = ${tn(r)}$ is extraneous.`}`;
    });
}

/** The squared equation, written with integer coefficients. */
function squaredLines(e: RadEq): string[] {
  const k = e.m === 1 || e.m === -1 ? 1 : 4;
  const A = cl(k * e.m * e.m);
  const B = cl(k * (2 * e.m * e.c - e.p));
  const C = cl(k * (e.c * e.c - e.q));
  const lines = [`Square both sides: $${linIn(e.p, e.q)} = (${polyTex([e.c, e.m])})^2$`];
  lines.push(`$${polyTex([C, B, A])} = 0$${k === 4 ? ' (after multiplying by $4$)' : ''}`);
  const [a, b] = [e.r1, e.r2].sort((u, v) => u - v);
  lines.push(`$${A === 1 ? '' : A}(${xh(a)})(${xh(b)}) = 0$, so $x = ${tn(a)}$ or $x = ${tn(b)}$.`);
  return lines;
}

const radicalEquationGraph = skill({
  id: 'm301-radical-equation-graph',
  name: 'Solving radical equations graphically',
  description: 'Solve radical equations from the x-intercepts of the related function or the intersection of two graphs, and identify extraneous roots.',
  outcomes: ['RF13'],
  lessonId: 'm301-2-3',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['interceptRead', 'intersectHoriz'] as const) : d === 2 ? rng.pick(['twoGraphs', 'relatedFn'] as const) : rng.pick(['extraneous', 'decimal', 'applied'] as const);
    const hintGraph = 'The solutions of $A = B$ are the $x$-coordinates of the points where $y = A$ and $y = B$ intersect, or the $x$-intercepts of the related function $y = A - B$.';

    if (kind === 'interceptRead') {
      const a = rng.pick([1, 1, 2, -1]);
      const u = rng.pick([1, 4, 9]);
      const kk = -a * Math.sqrt(u);
      const h = rng.int(-7, 8 - u);
      const t: Tf = { a, b: 1, h, k: kk };
      const root = h + u;
      const asEq = rng.chance(0.5);
      const eq = asEq ? `${a === 1 ? '' : a === -1 ? '-' : a}\\sqrt{${xh(h)}} = ${tn(-kk)}` : `${radTex(t)} = 0`;
      return {
        prompt: `The graph of the related function $y = ${radTex(t)}$ is shown. Use it to solve $${eq}$.`,
        figure: curveFig(GRID8, [baseCurve('sqrt', t)]),
        parts: [solPart([root])],
        hints: [hintGraph, 'Read the $x$-intercept of the graph.'],
        solution: [
          asEq ? `Rearranged, the equation is $${radTex(t)} = 0$, so its solutions are the $x$-intercepts of the graph shown.` : 'The solutions are the $x$-intercepts of the graph shown.',
          `The graph crosses the $x$-axis at $x = ${root}$.`,
          `Check: $${a === 1 ? '' : a === -1 ? '-' : a}\\sqrt{${root} ${pmTex(-h)}} ${pmTex(kk)} = ${a === 1 ? '' : a === -1 ? '-' : a}\\sqrt{${u}} ${pmTex(kk)} = 0$ ✓`,
          `The solution is $x = ${root}$.`,
        ],
      };
    }

    if (kind === 'intersectHoriz') {
      const none = rng.chance(0.25);
      const h = rng.int(-7, 2);
      const a = rng.pick([1, 1, 2]);
      const u = rng.pick([1, 4, 9]);
      const target = none ? -rng.int(1, 3) : a * Math.sqrt(u);
      const t: Tf = { a, b: 1, h, k: 0 };
      const root = h + u;
      const lhs = `${a === 1 ? '' : a}\\sqrt{${xh(h)}}`;
      return {
        prompt: `The graphs of $y = ${lhs}$ and $y = ${tn(target)}$ are shown. Use them to solve $${lhs} = ${tn(target)}$.`,
        figure: curveFig(GRID8, [baseCurve('sqrt', t)], { lines: [{ line: { A: 0, B: 1, C: -target }, color: 'muted' }] }),
        parts: [solPart(none ? [] : [root])],
        hints: [hintGraph, none ? 'Do the graphs meet at all? A principal square root is never negative.' : 'Read the $x$-coordinate of the intersection point.'],
        solution: none
          ? [`The graph of $y = ${lhs}$ never goes below the $x$-axis, and the line $y = ${tn(target)}$ is below it, so the graphs do not intersect.`, `(Squaring would give $x = ${tn(h + (target / a) ** 2)}$, but $${lhs}$ cannot equal a negative number, so that root is extraneous.)`, 'The equation has no solution.']
          : [`The graphs intersect at $${ptTex(root, target)}$.`, `Check: $${a === 1 ? '' : a}\\sqrt{${root} ${pmTex(-h)}} = ${a === 1 ? '' : a}\\sqrt{${u}} = ${tn(target)}$ ✓`, `The solution is $x = ${root}$.`],
      };
    }

    if (kind === 'twoGraphs' || kind === 'relatedFn') {
      const e = radEq(rng, rng.pick(['oneExt', 'oneExt', 'twoValid'] as const), [1, -1, 1 / 2, -1 / 2]);
      const lineF: Fn = (x) => e.m * x + e.c;
      const related: Fn = (x) => radSide(e)(x) - lineF(x);
      const relTex = `\\sqrt{${linIn(e.p, e.q)}}${signedPoly([-e.c, -e.m])}`;
      const fig =
        kind === 'twoGraphs'
          ? curveFig(GRID8, [radSideCurve(e), { f: lineF, color: 'muted' }])
          : curveFig(GRID8, [{ ...radSideCurve(e), f: related }]);
      return {
        prompt:
          kind === 'twoGraphs'
            ? `The graphs of $y = \\sqrt{${linIn(e.p, e.q)}}$ (coloured) and $y = ${polyTex([e.c, e.m])}$ (grey) are shown. Use them to solve $${eqTex(e)}$.`
            : `The graph of the related function $y = ${relTex}$ is shown. Use it to solve $${eqTex(e)}$.`,
        figure: fig,
        parts: [solPart(e.valid)],
        hints: [hintGraph, kind === 'twoGraphs' ? 'Read the $x$-coordinate of every intersection point.' : 'Read every $x$-intercept of the graph.'],
        solution: [
          kind === 'twoGraphs' ? `The graphs intersect at ${e.valid.map((x) => `$${ptTex(x, e.m * x + e.c)}$`).join(' and ')}.` : `The graph crosses the $x$-axis at ${e.valid.map((x) => `$x = ${tn(x)}$`).join(' and ')}.`,
          ...checkLines(e).filter((l) => l.includes('✓')),
          e.extraneous.length ? `Squaring both sides would also give $x = ${tn(e.extraneous[0])}$, but the graphs show it is not a solution: it is extraneous.` : 'Both values check in the original equation.',
          `The solution${e.valid.length > 1 ? 's are' : ' is'} ${xList(e.valid)}.`,
        ],
      };
    }

    if (kind === 'extraneous') {
      const e = radEq(rng, 'oneExt', [1, -1]);
      const moved = rng.chance(0.5) && e.c !== 0;
      const shown = moved ? `\\sqrt{${linIn(e.p, e.q)}} ${pmTex(-e.c)} = ${polyTex([0, e.m])}` : eqTex(e);
      return {
        prompt: `Solve $${shown}$ algebraically. Squaring gives two possible roots; use the graph of both sides of $${eqTex(e)}$ (shown) or a check to identify the extraneous root.`,
        figure: curveFig(GRID8, [radSideCurve(e), { f: (x) => e.m * x + e.c, color: 'muted' }]),
        parts: [solPart(e.valid), numPart(e.extraneous[0], { label: 'Extraneous root: $x =$' })],
        hints: ['Isolate the radical, square both sides and solve the quadratic.', 'Substitute each root into the original equation. A root that makes the two sides different is extraneous; on the graph it is not an intersection point.'],
        solution: [
          ...(moved ? [`Isolate the radical: $${eqTex(e)}$`] : []),
          ...squaredLines(e),
          ...checkLines(e),
          `The solution is $x = ${tn(e.valid[0])}$; the extraneous root is $x = ${tn(e.extraneous[0])}$.`,
        ],
      };
    }

    if (kind === 'decimal') {
      const g = retry(
        () => {
          const a = rng.int(1, 9);
          const m = rng.pick([1, -1]);
          const c = rng.int(-3, 4);
          const disc = 1 - 4 * m * c + 4 * a;
          const roots = disc > 0 ? [(-(2 * m * c - 1) - Math.sqrt(disc)) / 2, (-(2 * m * c - 1) + Math.sqrt(disc)) / 2] : [];
          const valid = roots.filter((x) => m * x + c >= 0 && x + a >= 0);
          return { a, m, c, disc, roots, valid };
        },
        (v) => v.disc > 0 && !Number.isInteger(Math.sqrt(v.disc)) && v.valid.length >= 1 && v.roots.every((x) => safeRound(x, 2) && Math.abs(x) < 7.5) && v.valid.every((x) => v.m * x + v.c <= 7),
      );
      const e = { p: 1, q: g.a, m: g.m, c: g.c };
      const valid = g.valid.slice().sort((p, q) => p - q);
      const B = 2 * g.m * g.c - 1;
      const C = g.c * g.c - g.a;
      return {
        prompt: `The graphs of $y = \\sqrt{${linIn(1, g.a)}}$ (coloured) and $y = ${polyTex([g.c, g.m])}$ (grey) are shown. Solve $\\sqrt{${linIn(1, g.a)}} = ${polyTex([g.c, g.m])}$. Give each solution to the nearest hundredth.`,
        figure: curveFig(GRID8, [radSideCurve(e), { f: (x) => g.m * x + g.c, color: 'muted' }]),
        parts: [solPart(valid, 2)],
        hints: ['Count the intersection points on the graph first, so you know how many solutions to expect.', 'Square both sides, solve the quadratic with the quadratic formula, and check each root.'],
        solution: [
          `Square both sides: $${linIn(1, g.a)} = (${polyTex([g.c, g.m])})^2$, so $${polyTex([C, B, 1])} = 0$.`,
          `$x = \\dfrac{${tn(-B)} \\pm \\sqrt{${g.disc}}}{2}$, so $x \\approx ${fmtFixed(g.roots[0], 2)}$ or $x \\approx ${fmtFixed(g.roots[1], 2)}$.`,
          ...g.roots.map((x) => `$x \\approx ${fmtFixed(x, 2)}$: right side $${polyTex([g.c, g.m])} \\approx ${fmtFixed(g.m * x + g.c, 2)}$ ${g.m * x + g.c >= 0 ? 'is not negative, so it checks ✓ (an intersection on the graph).' : 'is negative, but a square root cannot be negative ✗ — extraneous.'}`),
          `The solution${valid.length > 1 ? 's are' : ' is'} ${valid.map((x) => `$x \\approx ${fmtFixed(x, 2)}$`).join(' and ')}.`,
        ],
      };
    }

    // applied: a radical model, solved for the input.
    const ctx = rng.pick(['skid', 'fall', 'wave', 'pendulum'] as const);
    let prompt: string;
    let value: number;
    let decimals: number;
    let unit: string;
    let steps: string[];
    let fig: PlaneFigure;
    if (ctx === 'skid') {
      const [k, v] = retry(
        () => [rng.pick([12, 14, 15, 16]), rng.pick([50, 55, 60, 65, 70, 75, 80, 85, 90])],
        ([kk, vv]) => safeRound((vv / kk) ** 2, 1),
      );
      value = (v / k) ** 2;
      decimals = 1;
      unit = 'm';
      const dMax = Math.ceil((value * 1.4) / 10) * 10;
      const vMax = Math.ceil((k * Math.sqrt(dMax)) / 20) * 20;
      fig = curveFig({ xMin: 0, xMax: dMax, yMin: 0, yMax: vMax, xStep: dMax / 10, yStep: 20, xLabel: 'skid length d (m)', yLabel: 'speed v (km/h)' }, [{ f: (x) => (x < 0 ? NaN : k * Math.sqrt(x)), extra: endpointExtras(0, 1, dMax / 4) }], { lines: [{ line: { A: 0, B: 1, C: -v }, color: 'muted', dashed: true }] });
      prompt = `A collision analyst uses the model $v = ${k}\\sqrt{d}$ to estimate the speed $v$, in kilometres per hour, of a car that left skid marks $d$ metres long. The graph of the model and the line $v = ${v}$ are shown. What skid length corresponds to a speed of $${v}$ km/h? Answer to the nearest tenth of a metre.`;
      steps = [`Solve $${k}\\sqrt{d} = ${v}$.`, `$\\sqrt{d} = ${divTex(v, k)}$`, `Square both sides: $d = \\left(${divTex(v, k).split(' = ').pop()}\\right)^2 \\approx ${fmtFixed(value, 2)}$`, `The skid marks are about $${fmtFixed(value, 1)}$ m long (the intersection on the graph).`];
    } else if (ctx === 'fall') {
      const tt = retry(
        () => rng.pick([1.5, 2.5, 3.2, 3.5, 4.2, 2.8, 1.8, 3.8]),
        (x) => safeRound(4.9 * x * x, 1),
      );
      value = 4.9 * tt * tt;
      decimals = 1;
      unit = 'm';
      const dMax = Math.ceil((value * 1.4) / 10) * 10;
      fig = curveFig({ xMin: 0, xMax: dMax, yMin: 0, yMax: 5, xStep: dMax / 10, yStep: 0.5, xLabel: 'height d (m)', yLabel: 'time t (s)' }, [{ f: (x) => (x < 0 ? NaN : Math.sqrt(x / 4.9)), extra: endpointExtras(0, 1, dMax / 4) }], { lines: [{ line: { A: 0, B: 1, C: -tt }, color: 'muted', dashed: true }] });
      prompt = `Ignoring air resistance, the time $t$, in seconds, for a stone dropped from a height of $d$ metres to reach the ground is modelled by $t = \\sqrt{\\dfrac{d}{4.9}}$. The graph of the model and the line $t = ${fmt(tt)}$ are shown. From what height was a stone dropped if it took $${fmt(tt)}$ s to fall? Answer to the nearest tenth of a metre.`;
      steps = [`Solve $\\sqrt{\\dfrac{d}{4.9}} = ${fmt(tt)}$.`, `Square both sides: $\\dfrac{d}{4.9} = ${fmtFixed(tt * tt, 2).replace(/0+$/, '').replace(/\.$/, '')}$`, `$d = 4.9 \\times ${fmtFixed(tt * tt, 2).replace(/0+$/, '').replace(/\.$/, '')} = ${fmt(value, 4)}$`, `The stone was dropped from about $${fmtFixed(value, 1)}$ m.`];
    } else if (ctx === 'wave') {
      const v = retry(
        () => rng.pick([4, 5, 6, 7, 8, 9, 10]),
        (x) => safeRound((x * x) / 9.8, 2),
      );
      value = (v * v) / 9.8;
      decimals = 2;
      unit = 'm';
      const dMax = Math.ceil(value * 1.4);
      fig = curveFig({ xMin: 0, xMax: dMax, yMin: 0, yMax: v + 3, xStep: dMax <= 6 ? 0.5 : 1, yStep: 1, xLabel: 'depth d (m)', yLabel: 'speed v (m/s)' }, [{ f: (x) => (x < 0 ? NaN : Math.sqrt(9.8 * x)), extra: endpointExtras(0, 1, dMax / 4) }], { lines: [{ line: { A: 0, B: 1, C: -v }, color: 'muted', dashed: true }] });
      prompt = `In shallow water, the speed $v$, in metres per second, of a wave is modelled by $v = \\sqrt{9.8d}$, where $d$ is the water depth in metres. The graph of the model and the line $v = ${v}$ are shown. At what depth does a wave travel at $${v}$ m/s? Answer to the nearest hundredth of a metre.`;
      steps = [`Solve $\\sqrt{9.8d} = ${v}$.`, `Square both sides: $9.8d = ${v * v}$`, `$d = \\dfrac{${v * v}}{9.8} \\approx ${fmtFixed(value, 3)}$`, `The depth is about $${fmtFixed(value, 2)}$ m.`];
    } else {
      const T = retry(
        () => rng.pick([1.5, 2, 2.5, 3, 3.5, 4]),
        (x) => safeRound(9.8 * (x / (2 * Math.PI)) ** 2, 2),
      );
      value = 9.8 * (T / (2 * Math.PI)) ** 2;
      decimals = 2;
      unit = 'm';
      const lMax = Math.max(1, Math.ceil(value * 1.4));
      fig = curveFig({ xMin: 0, xMax: lMax, yMin: 0, yMax: 5, xStep: lMax <= 2 ? 0.2 : lMax <= 5 ? 0.5 : 1, yStep: 1, xLabel: 'length L (m)', yLabel: 'period T (s)' }, [{ f: (x) => (x < 0 ? NaN : 2 * Math.PI * Math.sqrt(x / 9.8)), extra: endpointExtras(0, 1, lMax / 4) }], { lines: [{ line: { A: 0, B: 1, C: -T }, color: 'muted', dashed: true }] });
      prompt = `The period $T$, in seconds, of a pendulum of length $L$ metres is modelled by $T = 2\\pi\\sqrt{\\dfrac{L}{9.8}}$. The graph of the model and the line $T = ${fmt(T)}$ are shown. How long must the pendulum be for a period of $${fmt(T)}$ s? Answer to the nearest hundredth of a metre.`;
      steps = [`Solve $2\\pi\\sqrt{\\dfrac{L}{9.8}} = ${fmt(T)}$.`, `$\\sqrt{\\dfrac{L}{9.8}} = \\dfrac{${fmt(T)}}{2\\pi}$`, `Square both sides: $L = 9.8\\left(\\dfrac{${fmt(T)}}{2\\pi}\\right)^2 \\approx ${fmtFixed(value, 4)}$`, `The pendulum must be about $${fmtFixed(value, 2)}$ m long.`];
    }
    return {
      prompt,
      figure: fig,
      parts: [numPart(value, { decimals, suffix: unit })],
      hints: ['The answer is the input where the graph of the model meets the horizontal line. Solve the equation algebraically for an accurate value.', 'Isolate the square root, then square both sides.'],
      solution: steps,
    };
  },
});

export const RADICALFNS_SKILLS: SkillDef[] = [radicalTransform, sqrtOfFunction, radicalEquationGraph];
