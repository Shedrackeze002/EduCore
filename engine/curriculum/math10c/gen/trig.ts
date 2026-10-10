/** Unit 2 — Trigonometry (M4). */
import { fixedChoice, mc, numPart, roundingPhrase, skill } from '../../helpers.ts';
import { atanD, asinD, acosD, fmt, fmtFixed, frac, fracLatex, sinD, cosD, tanD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { RightTriangleFigure, SkillDef } from '../../../types.ts';

const NAMES = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['X', 'Y', 'Z'],
  ['D', 'E', 'F'],
  ['L', 'M', 'N'],
  ['S', 'T', 'U'],
  ['J', 'K', 'L'],
];

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [6, 8, 10],
  [9, 40, 41],
  [20, 21, 29],
  [12, 16, 20],
];

interface Tri {
  /** Vertex names: right-angle vertex R, and acute vertices A (on horizontal leg) and B (on vertical leg). */
  R: string;
  A: string;
  B: string;
  rotate: 0 | 1 | 2 | 3;
  mirror: boolean;
}

function makeTri(rng: Rng): Tri {
  const names = rng.shuffle(rng.pick(NAMES));
  return { R: names[0], A: names[1], B: names[2], rotate: rng.pick([0, 0, 1, 2, 3] as const), mirror: rng.chance(0.4) };
}

const seg = (p: string, q: string) => `\\overline{${[p, q].sort().join('')}}`;
const segPlain = (p: string, q: string) => [p, q].sort().join('');

function fig(t: Tri, legA: number, legB: number, sides: RightTriangleFigure['sideLabels'], angles: RightTriangleFigure['angleLabels'], scene?: RightTriangleFigure['scene']): RightTriangleFigure {
  return {
    type: 'rightTriangle',
    vertices: { right: t.R, a: t.A, b: t.B },
    legA,
    legB,
    sideLabels: sides,
    angleLabels: angles,
    rotate: scene && scene !== 'none' ? 0 : t.rotate,
    mirror: scene && scene !== 'none' ? false : t.mirror,
    scene,
  };
}

/** Sides relative to the acute angle at vertex `at` ('a' or 'b'). */
function relSides(t: Tri, at: 'a' | 'b') {
  const vtx = at === 'a' ? t.A : t.B;
  const opp = at === 'a' ? segPlain(t.R, t.B) : segPlain(t.R, t.A);
  const adj = at === 'a' ? segPlain(t.R, t.A) : segPlain(t.R, t.B);
  const hyp = segPlain(t.A, t.B);
  // Figure side keys: 'rb' = R–B, 'ra' = R–A, 'ab' = hypotenuse.
  const oppKey = at === 'a' ? 'rb' : 'ra';
  const adjKey = at === 'a' ? 'ra' : 'rb';
  return { vtx, opp, adj, hyp, oppKey, adjKey } as const;
}

const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;

// ---------------------------------------------------------------------------

const labelSides = skill({
  id: 'm4-label-sides',
  name: 'Opposite, adjacent and hypotenuse',
  description: 'Identify the hypotenuse and the opposite and adjacent sides for a given acute angle.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-1',
  format: 'mc',
  gen(rng, d) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const which = d === 1 ? rng.pick(['hypotenuse', 'opposite'] as const) : rng.pick(['opposite', 'adjacent', 'hypotenuse'] as const);
    const correct = which === 'hypotenuse' ? s.hyp : which === 'opposite' ? s.opp : s.adj;
    const [a, b] = rng.pick(TRIPLES.slice(0, 4));
    const showTheta = d < 3;
    const angleLabel = showTheta ? { [at]: '\\theta' } : {};
    const angleName = showTheta ? '\\theta' : `\\angle ${s.vtx}`;
    return {
      prompt:
        which === 'hypotenuse'
          ? `In right triangle $${t.A}${t.B}${t.R}$, which side is the **hypotenuse**?`
          : `In right triangle $${t.A}${t.B}${t.R}$, which side is **${which}** to $${angleName}$?`,
      figure: fig(t, a, b, {}, angleLabel),
      parts: [{ answer: mc(rng, `$${seg(...(correct.split('') as [string, string]))}$`, [s.opp, s.adj, s.hyp].map((x) => `$${seg(...(x.split('') as [string, string]))}$`)) }],
      hints: [
        'The hypotenuse is always across from the right angle, and it is the longest side.',
        'The opposite side does not touch the angle. The adjacent side touches the angle but is not the hypotenuse.',
      ],
      solution: [
        `The hypotenuse is opposite the right angle at $${t.R}$: $${seg(t.A, t.B)}$.`,
        `Relative to $${angleName}$ at vertex $${s.vtx}$: opposite $= ${seg(...(s.opp.split('') as [string, string]))}$, adjacent $= ${seg(...(s.adj.split('') as [string, string]))}$.`,
        `So the ${which} is $${seg(...(correct.split('') as [string, string]))}$.`,
      ],
      answerDisplay: `$${seg(...(correct.split('') as [string, string]))}$`,
    };
  },
});

const similarRatios = skill({
  id: 'm4-similar-ratios',
  name: 'Similar triangles and trig ratios',
  description: 'Explain and use the fact that similar right triangles have equal side ratios.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-1',
  gen(rng, d) {
    const [a, b] = rng.pick(TRIPLES.slice(0, 5));
    const k = rng.pick([1.5, 2, 2.5, 3, 4]);
    if (d === 1) {
      return {
        prompt: `Two right triangles are similar. In the small triangle, the legs are $${a}$ and $${b}$. In the large triangle, the corresponding legs are $${fmt(a * k)}$ and $${fmt(b * k)}$. What is the ratio $\\dfrac{\\text{short leg}}{\\text{long leg}}$ in the **large** triangle? Give a fraction in lowest terms.`,
        parts: [numPart(Math.min(a, b) / Math.max(a, b))],
        hints: ['Similar triangles have proportional sides, so corresponding ratios are equal.', 'Compute the ratio in the small triangle — it is the same.'],
        solution: [`Large: $\\dfrac{${fmt(Math.min(a, b) * k)}}{${fmt(Math.max(a, b) * k)}} = ${fracLatex(frac(Math.min(a, b), Math.max(a, b)))}$`, 'This equals the ratio in the small triangle. That is why a trigonometric ratio depends only on the angle, not on the size of the triangle.'],
      };
    }
    const x = b * k;
    return {
      prompt: `$\\triangle ABC \\sim \\triangle DEF$, with right angles at $C$ and $F$. $AC = ${a}$, $BC = ${b}$ and $DF = ${fmt(a * k)}$. Determine $EF$.`,
      parts: [numPart(x)],
      hints: ['Corresponding sides are proportional: $\\dfrac{EF}{DF} = \\dfrac{BC}{AC}$.', `So $\\tan A = \\tan D$.`],
      solution: [`$\\dfrac{EF}{${fmt(a * k)}} = \\dfrac{${b}}{${a}}$`, `$EF = ${fmt(a * k)} \\times \\dfrac{${b}}{${a}} = ${fmt(x)}$`],
    };
  },
});

const tanRatio = skill({
  id: 'm4-tan-ratio',
  name: 'Writing the tangent ratio',
  description: 'Write the tangent of an acute angle as a ratio and a decimal.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-1',
  gen(rng, d) {
    const t = makeTri(rng);
    const [p, q, h] = rng.pick(TRIPLES);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    // legA is R–A (horizontal), legB is R–B.
    const legA = rng.chance(0.5) ? p : q;
    const legB = legA === p ? q : p;
    const opp = at === 'a' ? legB : legA;
    const adj = at === 'a' ? legA : legB;
    const sides: RightTriangleFigure['sideLabels'] = d === 2 ? { ab: `${h}`, [s.adjKey]: `${adj}` } : { ra: `${legA}`, rb: `${legB}`, ...(d === 3 ? { ab: `${h}` } : {}) };
    return {
      prompt: d === 3 ? `Determine $\\tan ${s.vtx}$ and $\\tan ${at === 'a' ? t.B : t.A}$ as fractions in lowest terms.` : `Determine $\\tan ${s.vtx}$ as a fraction in lowest terms.`,
      figure: fig(t, legA, legB, sides, {}),
      parts:
        d === 3
          ? [numPart(opp / adj, { label: `$\\tan ${s.vtx} =$` }), numPart(adj / opp, { label: `$\\tan ${at === 'a' ? t.B : t.A} =$` })]
          : [numPart(opp / adj, { label: `$\\tan ${s.vtx} =$` })],
      hints: [
        '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$',
        ...(d === 2 ? ['First find the missing leg with the Pythagorean theorem.'] : []),
        ...(d === 3 ? ['The side opposite one acute angle is adjacent to the other.'] : []),
      ],
      solution: [
        ...(d === 2 ? [`Missing leg: $\\sqrt{${h}^2 - ${adj}^2} = ${opp}$`] : []),
        `$\\tan ${s.vtx} = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{${opp}}{${adj}} = ${fracLatex(frac(opp, adj))}$`,
        ...(d === 3 ? [`$\\tan ${at === 'a' ? t.B : t.A} = \\dfrac{${adj}}{${opp}} = ${fracLatex(frac(adj, opp))}$ (the reciprocal)`] : []),
      ],
    };
  },
});

function anglePair(rng: Rng) {
  return rng.int(18, 72);
}

const tanLength = skill({
  id: 'm4-tan-length',
  name: 'Finding a side with tangent',
  description: 'Use the tangent ratio to determine an unknown side length.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-1',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const ang = anglePair(rng);
    const known = rng.int(4, 30);
    const unknownIsOpp = d === 1 ? true : rng.chance(0.5);
    const x = unknownIsOpp ? known * tanD(ang) : known / tanD(ang);
    const opp = unknownIsOpp ? x : known;
    const adj = unknownIsOpp ? known : x;
    const legA = at === 'a' ? adj : opp;
    const legB = at === 'a' ? opp : adj;
    const sides = { [s.oppKey]: unknownIsOpp ? 'x' : `${known}\\text{ cm}`, [s.adjKey]: unknownIsOpp ? `${known}\\text{ cm}` : 'x' };
    return {
      prompt: `Determine the length of side $x$, ${roundingPhrase(1)} of a centimetre.`,
      figure: fig(t, legA, legB, sides, { [at]: deg(ang) }),
      parts: [numPart(x, { decimals: 1, suffix: 'cm', label: '$x =$' })],
      hints: [
        `Relative to the $${deg(ang)}$ angle, $x$ is the ${unknownIsOpp ? 'opposite' : 'adjacent'} side and $${known}$ cm is the ${unknownIsOpp ? 'adjacent' : 'opposite'} side.`,
        '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$',
        unknownIsOpp ? 'Multiply both sides by the adjacent side.' : 'The unknown is in the denominator: $x = \\dfrac{\\text{opposite}}{\\tan\\theta}$.',
      ],
      solution: unknownIsOpp
        ? [`$\\tan ${deg(ang)} = \\dfrac{x}{${known}}$`, `$x = ${known}\\tan ${deg(ang)}$`, `$x \\approx ${fmtFixed(x, 1)}\\ \\text{cm}$`]
        : [`$\\tan ${deg(ang)} = \\dfrac{${known}}{x}$`, `$x = \\dfrac{${known}}{\\tan ${deg(ang)}}$`, `$x \\approx ${fmtFixed(x, 1)}\\ \\text{cm}$`],
      calculator: true,
    };
  },
});

const tanAngle = skill({
  id: 'm4-tan-angle',
  name: 'Finding an angle with tangent',
  description: 'Use the inverse tangent to determine an acute angle.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-1',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const opp = rng.int(3, 25);
    const adj = rng.int(3, 25);
    const ang = atanD(opp / adj);
    const dp = d === 1 ? 0 : 1;
    const legA = at === 'a' ? adj : opp;
    const legB = at === 'a' ? opp : adj;
    return {
      prompt: `Determine the measure of $\\angle ${s.vtx}$, ${dp === 0 ? 'to the nearest degree' : 'to the nearest tenth of a degree'}.`,
      figure: fig(t, legA, legB, { [s.oppKey]: `${opp}\\text{ m}`, [s.adjKey]: `${adj}\\text{ m}` }, { [at]: '?' }),
      parts: [numPart(ang, { decimals: dp, suffix: '°', label: `$\\angle ${s.vtx} =$` })],
      hints: ['Identify the opposite and adjacent sides for the angle.', '$\\theta = \\tan^{-1}\\left(\\dfrac{\\text{opposite}}{\\text{adjacent}}\\right)$ — make sure your calculator is in degree mode.'],
      solution: [`$\\tan ${s.vtx} = \\dfrac{${opp}}{${adj}}$`, `$\\angle ${s.vtx} = \\tan^{-1}\\left(\\dfrac{${opp}}{${adj}}\\right) \\approx ${fmtFixed(ang, dp)}^\\circ$`],
      calculator: true,
    };
  },
});

const writeRatio = skill({
  id: 'm4-write-ratio',
  name: 'Writing sine, cosine and tangent ratios',
  description: 'Write the primary trigonometric ratios for an acute angle from side lengths.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-2',
  gen(rng, d) {
    const t = makeTri(rng);
    const [p, q, h] = rng.pick(TRIPLES);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const legA = rng.chance(0.5) ? p : q;
    const legB = legA === p ? q : p;
    const opp = at === 'a' ? legB : legA;
    const adj = at === 'a' ? legA : legB;
    const fn = d === 1 ? rng.pick(['sin', 'cos'] as const) : rng.pick(['sin', 'cos', 'tan'] as const);
    const val = fn === 'sin' ? opp / h : fn === 'cos' ? adj / h : opp / adj;
    const ratioText = fn === 'sin' ? '\\dfrac{\\text{opposite}}{\\text{hypotenuse}}' : fn === 'cos' ? '\\dfrac{\\text{adjacent}}{\\text{hypotenuse}}' : '\\dfrac{\\text{opposite}}{\\text{adjacent}}';
    const num = fn === 'cos' ? adj : opp;
    const den = fn === 'tan' ? adj : h;
    if (d === 3) {
      // Both sin and cos as a two-part answer.
      return {
        prompt: `Write $\\sin ${s.vtx}$ and $\\cos ${s.vtx}$ as fractions in lowest terms.`,
        figure: fig(t, legA, legB, { ra: `${legA}`, rb: `${legB}`, ab: `${h}` }, {}),
        parts: [numPart(opp / h, { label: `$\\sin ${s.vtx} =$` }), numPart(adj / h, { label: `$\\cos ${s.vtx} =$` })],
        hints: ['SOH: sin = opposite / hypotenuse. CAH: cos = adjacent / hypotenuse.', `Find which leg touches vertex $${s.vtx}$ (adjacent) and which does not (opposite).`],
        solution: [`Opposite $= ${opp}$, adjacent $= ${adj}$, hypotenuse $= ${h}$.`, `$\\sin ${s.vtx} = ${fracLatex(frac(opp, h))}$, $\\cos ${s.vtx} = ${fracLatex(frac(adj, h))}$`],
      };
    }
    return {
      prompt: `Write $\\${fn} ${s.vtx}$ as a fraction in lowest terms.`,
      figure: fig(t, legA, legB, { ra: `${legA}`, rb: `${legB}`, ab: `${h}` }, {}),
      parts: [numPart(val, { label: `$\\${fn} ${s.vtx} =$` })],
      hints: [`$\\${fn}\\theta = ${ratioText}$`, `Relative to $\\angle ${s.vtx}$, the opposite side is $${opp}$ and the adjacent side is $${adj}$.`],
      solution: [`$\\${fn} ${s.vtx} = ${ratioText} = \\dfrac{${num}}{${den}} = ${fracLatex(frac(num, den))}$`],
    };
  },
});

const chooseRatio = skill({
  id: 'm4-choose-ratio',
  name: 'Choosing the correct ratio',
  description: 'Choose the trigonometric ratio that connects the given and unknown sides (SOH CAH TOA).',
  outcomes: ['M4'],
  lessonId: 'm10c-2-2',
  format: 'mc',
  gen(rng) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const ang = anglePair(rng);
    const known = rng.int(5, 30);
    // Choose which sides: known and unknown among opp, adj, hyp.
    const pair = rng.pick([
      ['opp', 'hyp'],
      ['hyp', 'opp'],
      ['adj', 'hyp'],
      ['hyp', 'adj'],
      ['opp', 'adj'],
      ['adj', 'opp'],
    ] as const);
    const [knownSide, unknownSide] = pair;
    const keyFor = (k: 'opp' | 'adj' | 'hyp') => (k === 'opp' ? s.oppKey : k === 'adj' ? s.adjKey : 'ab');
    const sides = { [keyFor(knownSide)]: `${known}`, [keyFor(unknownSide)]: 'x' };
    const has = (k: string) => knownSide === k || unknownSide === k;
    const fn = has('hyp') ? (has('opp') ? 'sin' : 'cos') : 'tan';
    const top = fn === 'sin' ? 'opp' : fn === 'cos' ? 'adj' : 'opp';
    const val = (k: string) => (k === knownSide ? `${known}` : 'x');
    const eq = (f: string, a: string, b: string) => `$\\${f} ${deg(ang)} = \\dfrac{${a}}{${b}}$`;
    const bottom = fn === 'tan' ? 'adj' : 'hyp';
    const correct = eq(fn, val(top), val(bottom));
    const others = (['sin', 'cos', 'tan'] as const).filter((f) => f !== fn).map((f) => eq(f, val(top), val(bottom)));
    const flipped = eq(fn, val(bottom), val(top));
    return {
      prompt: `Which equation can be used to find $x$?`,
      figure: fig(t, 10, 7, sides, { [at]: deg(ang) }),
      parts: [{ answer: mc(rng, correct, [...others, flipped]) }],
      hints: ['Label the sides as opposite, adjacent and hypotenuse relative to the given angle.', 'SOH CAH TOA: pick the ratio that uses the known side and the unknown side.'],
      solution: [
        `The known side is the ${knownSide === 'opp' ? 'opposite side' : knownSide === 'adj' ? 'adjacent side' : 'hypotenuse'}, and $x$ is the ${unknownSide === 'opp' ? 'opposite side' : unknownSide === 'adj' ? 'adjacent side' : 'hypotenuse'}.`,
        `Those two sides appear together in the ${fn === 'sin' ? 'sine' : fn === 'cos' ? 'cosine' : 'tangent'} ratio: ${correct}.`,
      ],
    };
  },
});

const sincosLength = skill({
  id: 'm4-sincos-length',
  name: 'Finding a side with sine or cosine',
  description: 'Use the sine or cosine ratio to determine an unknown side, including the hypotenuse.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-2',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const ang = anglePair(rng);
    const fn = rng.pick(['sin', 'cos'] as const);
    const leg = fn === 'sin' ? 'opp' : 'adj';
    const legKey = fn === 'sin' ? s.oppKey : s.adjKey;
    const hypUnknown = d >= 2 && rng.chance(0.6);
    const known = rng.int(5, 40);
    const f = fn === 'sin' ? sinD(ang) : cosD(ang);
    const x = hypUnknown ? known / f : known * f;
    const hyp = hypUnknown ? x : known;
    const oppLen = hyp * sinD(ang);
    const adjLen = hyp * cosD(ang);
    const legA = at === 'a' ? adjLen : oppLen;
    const legB = at === 'a' ? oppLen : adjLen;
    const sides = hypUnknown ? { ab: 'x', [legKey]: `${known}\\text{ m}` } : { ab: `${known}\\text{ m}`, [legKey]: 'x' };
    return {
      prompt: `Determine the length of $x$, ${roundingPhrase(1)} of a metre.`,
      figure: fig(t, legA, legB, sides, { [at]: deg(ang) }),
      parts: [numPart(x, { decimals: 1, suffix: 'm', label: '$x =$' })],
      hints: [
        `The sides involved are the ${leg === 'opp' ? 'opposite' : 'adjacent'} side and the hypotenuse, so use ${fn === 'sin' ? 'sine' : 'cosine'}.`,
        hypUnknown ? `When the unknown is the hypotenuse, it ends up in the denominator: $x = \\dfrac{${known}}{\\${fn} ${deg(ang)}}$.` : `Multiply both sides by the hypotenuse.`,
      ],
      solution: hypUnknown
        ? [`$\\${fn} ${deg(ang)} = \\dfrac{${known}}{x}$`, `$x = \\dfrac{${known}}{\\${fn} ${deg(ang)}} \\approx ${fmtFixed(x, 1)}\\ \\text{m}$`]
        : [`$\\${fn} ${deg(ang)} = \\dfrac{x}{${known}}$`, `$x = ${known}\\${fn} ${deg(ang)} \\approx ${fmtFixed(x, 1)}\\ \\text{m}$`],
      calculator: true,
    };
  },
});

const sincosAngle = skill({
  id: 'm4-sincos-angle',
  name: 'Finding an angle with sine or cosine',
  description: 'Use inverse sine or inverse cosine to determine an acute angle.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-2',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    const at = rng.pick(['a', 'b'] as const);
    const s = relSides(t, at);
    const fn = rng.pick(['sin', 'cos'] as const);
    const hyp = rng.int(8, 40);
    const leg = rng.int(2, hyp - 1);
    const ang = fn === 'sin' ? asinD(leg / hyp) : acosD(leg / hyp);
    const opp = hyp * sinD(ang);
    const adj = hyp * cosD(ang);
    const legKey = fn === 'sin' ? s.oppKey : s.adjKey;
    const dp = d === 1 ? 0 : 1;
    return {
      prompt: `Determine the measure of $\\angle ${s.vtx}$, ${dp === 0 ? 'to the nearest degree' : 'to the nearest tenth of a degree'}.`,
      figure: fig(t, at === 'a' ? adj : opp, at === 'a' ? opp : adj, { ab: `${hyp}\\text{ cm}`, [legKey]: `${leg}\\text{ cm}` }, { [at]: '?' }),
      parts: [numPart(ang, { decimals: dp, suffix: '°', label: `$\\angle ${s.vtx} =$` })],
      hints: [`The given sides are the ${fn === 'sin' ? 'opposite side' : 'adjacent side'} and the hypotenuse.`, `$\\angle ${s.vtx} = \\${fn}^{-1}\\left(\\dfrac{${leg}}{${hyp}}\\right)$`],
      solution: [`$\\${fn} ${s.vtx} = \\dfrac{${leg}}{${hyp}}$`, `$\\angle ${s.vtx} = \\${fn}^{-1}\\left(\\dfrac{${leg}}{${hyp}}\\right) \\approx ${fmtFixed(ang, dp)}^\\circ$`],
      calculator: true,
    };
  },
});

const pythagoras = skill({
  id: 'm4-pythagoras',
  name: 'The Pythagorean theorem',
  description: 'Use the Pythagorean theorem to find a missing side of a right triangle.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-3',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    if (d === 3) {
      const len = rng.int(5, 12);
      const base = rng.int(1, len - 2) + rng.pick([0, 0.5]);
      const h = Math.sqrt(len * len - base * base);
      return {
        prompt: `A $${len}$ m ladder leans against a wall. Its foot is $${fmt(base)}$ m from the base of the wall. How high up the wall does the ladder reach, ${roundingPhrase(1)} of a metre?`,
        figure: { ...fig(t, base, h, { ab: `${len}\\text{ m}`, ra: `${fmt(base)}\\text{ m}`, rb: 'h' }, {}, 'ladder') },
        parts: [numPart(h, { decimals: 1, suffix: 'm' })],
        hints: ['The ladder is the hypotenuse.', '$h^2 = (\\text{ladder})^2 - (\\text{base})^2$'],
        solution: [`$h^2 + ${fmt(base)}^2 = ${len}^2$`, `$h = \\sqrt{${len}^2 - ${fmt(base)}^2} = \\sqrt{${fmt(len * len - base * base)}} \\approx ${fmtFixed(h, 1)}\\ \\text{m}$`],
        calculator: true,
      };
    }
    const a = rng.int(3, 20);
    const b = rng.int(3, 20);
    if (d === 1) {
      const c = Math.hypot(a, b);
      return {
        prompt: `Determine the length of the hypotenuse, ${roundingPhrase(1)}.`,
        figure: fig(t, a, b, { ra: `${a}`, rb: `${b}`, ab: 'c' }, {}),
        parts: [numPart(c, { decimals: 1, label: '$c =$' })],
        hints: ['$c^2 = a^2 + b^2$'],
        solution: [`$c^2 = ${a}^2 + ${b}^2 = ${a * a + b * b}$`, `$c = \\sqrt{${a * a + b * b}} \\approx ${fmtFixed(c, 1)}$`],
        calculator: true,
      };
    }
    const c = Math.max(a, b) + rng.int(1, 10);
    const leg = Math.sqrt(c * c - a * a);
    return {
      prompt: `Determine the length of the unknown leg, ${roundingPhrase(1)}.`,
      figure: fig(t, a, leg, { ra: `${a}`, rb: 'b', ab: `${c}` }, {}),
      parts: [numPart(leg, { decimals: 1, label: '$b =$' })],
      hints: ['The longest side, opposite the right angle, is the hypotenuse.', '$b^2 = c^2 - a^2$'],
      solution: [`$b^2 = ${c}^2 - ${a}^2 = ${c * c - a * a}$`, `$b = \\sqrt{${c * c - a * a}} \\approx ${fmtFixed(leg, 1)}$`],
      calculator: true,
    };
  },
});

const solveTriangle = skill({
  id: 'm4-solve-triangle',
  name: 'Solving right triangles',
  description: 'Determine all unknown sides and angles of a right triangle.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-3',
  calculator: true,
  gen(rng, d) {
    const t = makeTri(rng);
    if (d === 1 || rng.chance(0.5)) {
      // Given one angle and one side.
      const ang = anglePair(rng);
      const hyp = rng.int(8, 40);
      const opp = hyp * sinD(ang);
      const adj = hyp * cosD(ang);
      return {
        prompt: `Solve $\\triangle ${t.A}${t.B}${t.R}$: determine $\\angle ${t.B}$ and the lengths of $${seg(t.R, t.B)}$ and $${seg(t.R, t.A)}$, each ${roundingPhrase(1)}.`,
        figure: fig(t, adj, opp, { ab: `${hyp}` }, { a: deg(ang) }),
        parts: [
          numPart(90 - ang, { decimals: 0, suffix: '°', label: `$\\angle ${t.B} =$` }),
          numPart(opp, { decimals: 1, label: `$${segPlain(t.R, t.B)} =$` }),
          numPart(adj, { decimals: 1, label: `$${segPlain(t.R, t.A)} =$` }),
        ],
        hints: ['The acute angles of a right triangle add to $90^\\circ$.', `$${segPlain(t.R, t.B)}$ is opposite the $${deg(ang)}$ angle: use sine.`, `$${segPlain(t.R, t.A)}$ is adjacent: use cosine.`],
        solution: [
          `$\\angle ${t.B} = 90^\\circ - ${deg(ang)} = ${deg(90 - ang)}$`,
          `$${segPlain(t.R, t.B)} = ${hyp}\\sin ${deg(ang)} \\approx ${fmtFixed(opp, 1)}$`,
          `$${segPlain(t.R, t.A)} = ${hyp}\\cos ${deg(ang)} \\approx ${fmtFixed(adj, 1)}$`,
        ],
        calculator: true,
      };
    }
    // Given two legs.
    const adj = rng.int(4, 25);
    const opp = rng.int(4, 25);
    const hyp = Math.hypot(adj, opp);
    const A = atanD(opp / adj);
    return {
      prompt: `Solve $\\triangle ${t.A}${t.B}${t.R}$: determine $${seg(t.A, t.B)}$, $\\angle ${t.A}$ and $\\angle ${t.B}$. Round lengths to the nearest tenth and angles to the nearest degree.`,
      figure: fig(t, adj, opp, { ra: `${adj}`, rb: `${opp}` }, {}),
      parts: [
        numPart(hyp, { decimals: 1, label: `$${segPlain(t.A, t.B)} =$` }),
        numPart(A, { decimals: 0, suffix: '°', label: `$\\angle ${t.A} =$` }),
        numPart(90 - A, { decimals: 0, suffix: '°', label: `$\\angle ${t.B} =$` }),
      ],
      hints: ['Use the Pythagorean theorem for the hypotenuse.', `For $\\angle ${t.A}$: the opposite side is $${opp}$ and the adjacent side is $${adj}$ — use tangent.`, 'Then subtract from 90°.'],
      solution: [
        `$${segPlain(t.A, t.B)} = \\sqrt{${adj}^2 + ${opp}^2} \\approx ${fmtFixed(hyp, 1)}$`,
        `$\\angle ${t.A} = \\tan^{-1}\\left(\\dfrac{${opp}}{${adj}}\\right) \\approx ${fmtFixed(A, 0)}^\\circ$`,
        `$\\angle ${t.B} \\approx 90^\\circ - ${fmtFixed(A, 1)}^\\circ \\approx ${fmtFixed(90 - A, 0)}^\\circ$`,
      ],
      calculator: true,
    };
  },
});

const elevation = skill({
  id: 'm4-elevation-depression',
  name: 'Angles of elevation and depression',
  description: 'Solve problems involving angles of elevation and depression.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-4',
  calculator: true,
  gen(rng, d) {
    const t: Tri = { R: 'C', A: 'A', B: 'B', rotate: 0, mirror: false };
    const kind = d === 1 ? 'tree' : rng.pick(['tree', 'cliff', 'kite', 'ramp'] as const);
    switch (kind) {
      case 'tree': {
        const dist = rng.int(8, 40);
        const ang = rng.int(20, 60);
        const h = dist * tanD(ang);
        return {
          prompt: `From a point $${dist}$ m from the base of a tree, the angle of elevation to the top of the tree is $${deg(ang)}$. How tall is the tree, ${roundingPhrase(1)} of a metre?`,
          figure: fig(t, dist, h, { ra: `${dist}\\text{ m}`, rb: 'h' }, { a: deg(ang) }, 'tree'),
          parts: [numPart(h, { decimals: 1, suffix: 'm' })],
          hints: ['The angle of elevation is measured up from the horizontal.', 'The height is opposite the angle and the distance is adjacent: use tangent.'],
          solution: [`$\\tan ${deg(ang)} = \\dfrac{h}{${dist}}$`, `$h = ${dist}\\tan ${deg(ang)} \\approx ${fmtFixed(h, 1)}\\ \\text{m}$`],
          calculator: true,
        };
      }
      case 'cliff': {
        const h = rng.int(30, 120);
        const ang = rng.int(12, 45);
        const dist = h / tanD(ang);
        return {
          prompt: `From the top of a $${h}$ m cliff, the angle of depression to a boat is $${deg(ang)}$. How far is the boat from the base of the cliff, ${roundingPhrase(1)} of a metre?`,
          figure: fig(t, dist, h, { rb: `${h}\\text{ m}`, ra: 'x' }, { a: deg(ang) }, 'cliff'),
          parts: [numPart(dist, { decimals: 1, suffix: 'm' })],
          hints: ['The angle of depression (down from the horizontal) equals the angle of elevation from the boat (alternate angles).', `$\\tan ${deg(ang)} = \\dfrac{${h}}{x}$`],
          solution: [`Angle of elevation from the boat $= ${deg(ang)}$ (alternate angles).`, `$\\tan ${deg(ang)} = \\dfrac{${h}}{x}$`, `$x = \\dfrac{${h}}{\\tan ${deg(ang)}} \\approx ${fmtFixed(dist, 1)}\\ \\text{m}$`],
          calculator: true,
        };
      }
      case 'kite': {
        const L = rng.int(30, 100);
        const ang = rng.int(25, 70);
        const h = L * sinD(ang);
        return {
          prompt: `A kite string is $${L}$ m long and makes an angle of $${deg(ang)}$ with the ground. Ignoring the sag in the string, how high is the kite, ${roundingPhrase(1)} of a metre?`,
          figure: fig(t, L * cosD(ang), h, { ab: `${L}\\text{ m}`, rb: 'h' }, { a: deg(ang) }, 'kite'),
          parts: [numPart(h, { decimals: 1, suffix: 'm' })],
          hints: ['The string is the hypotenuse; the height is opposite the angle.', 'Use sine.'],
          solution: [`$\\sin ${deg(ang)} = \\dfrac{h}{${L}}$`, `$h = ${L}\\sin ${deg(ang)} \\approx ${fmtFixed(h, 1)}\\ \\text{m}$`],
          calculator: true,
        };
      }
      default: {
        const rise = rng.pick([0.5, 0.6, 0.75, 0.9, 1.2]);
        const run = rng.int(4, 12);
        const ang = atanD(rise / run);
        return {
          prompt: `A wheelchair ramp rises $${fmt(rise)}$ m over a horizontal distance of $${run}$ m. Building codes require the angle of the ramp to be at most $4.8^\\circ$. What is the angle of the ramp, to the nearest tenth of a degree?`,
          figure: fig(t, run, rise * 4, { ra: `${run}\\text{ m}`, rb: `${fmt(rise)}\\text{ m}` }, { a: '\\theta' }, 'ramp'),
          parts: [numPart(ang, { decimals: 1, suffix: '°' }), { label: 'Does it meet the code?', answer: fixedChoice(['Yes', 'No'], ang <= 4.8 ? 0 : 1) }],
          hints: ['Use the rise (opposite) and the run (adjacent): tangent.'],
          solution: [`$\\theta = \\tan^{-1}\\left(\\dfrac{${fmt(rise)}}{${run}}\\right) \\approx ${fmtFixed(ang, 1)}^\\circ$`, ang <= 4.8 ? 'This is at most 4.8°, so it meets the code.' : 'This is more than 4.8°, so it does not meet the code.'],
          calculator: true,
        };
      }
    }
  },
});

const twoTriangles = skill({
  id: 'm4-two-triangles',
  name: 'Problems with two right triangles',
  description: 'Solve problems that involve two right triangles sharing a side.',
  outcomes: ['M4'],
  lessonId: 'm10c-2-4',
  calculator: true,
  gen(rng, d) {
    const kind = d === 1 ? 'opposite' : rng.pick(['opposite', 'same', 'stacked'] as const);
    if (kind === 'opposite') {
      const h = rng.int(20, 80);
      const a1 = rng.int(25, 60);
      const a2 = rng.int(25, 60);
      const x = h / tanD(a1) + h / tanD(a2);
      return {
        prompt: `Two people stand on opposite sides of a $${h}$ m tower. The angles of elevation from them to the top of the tower are $${deg(a1)}$ and $${deg(a2)}$. How far apart are the two people, ${roundingPhrase(1)} of a metre?`,
        figure: { type: 'twoTriangles', arrangement: 'opposite', labels: { h: `${h} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } },
        parts: [numPart(x, { decimals: 1, suffix: 'm' })],
        hints: ['Split the diagram into two right triangles that share the tower as a side.', 'In each triangle, find the horizontal distance with tangent, then add.'],
        solution: [`Left: $d_1 = \\dfrac{${h}}{\\tan ${deg(a1)}} \\approx ${fmt(h / tanD(a1), 2)}$`, `Right: $d_2 = \\dfrac{${h}}{\\tan ${deg(a2)}} \\approx ${fmt(h / tanD(a2), 2)}$`, `Distance apart $\\approx ${fmtFixed(x, 1)}\\ \\text{m}$`],
        calculator: true,
      };
    }
    if (kind === 'same') {
      const h = rng.int(30, 100);
      const near = rng.int(40, 70);
      const far = rng.int(15, near - 8);
      const x = h / tanD(far) - h / tanD(near);
      return {
        prompt: `From the top of a $${h}$ m lighthouse, the angles of depression to two boats directly in line on the same side are $${deg(near)}$ and $${deg(far)}$. How far apart are the boats, ${roundingPhrase(1)} of a metre?`,
        figure: { type: 'twoTriangles', arrangement: 'same', labels: { h: `${h} m`, a1: `${near}°`, a2: `${far}°`, x: 'x' } },
        parts: [numPart(x, { decimals: 1, suffix: 'm' })],
        hints: ['The angle of depression to each boat equals the angle of elevation from that boat.', 'Find each boat’s distance from the base, then subtract.'],
        solution: [`Near boat: $\\dfrac{${h}}{\\tan ${deg(near)}} \\approx ${fmt(h / tanD(near), 2)}$`, `Far boat: $\\dfrac{${h}}{\\tan ${deg(far)}} \\approx ${fmt(h / tanD(far), 2)}$`, `Distance $\\approx ${fmtFixed(x, 1)}\\ \\text{m}$`],
        calculator: true,
      };
    }
    const dist = rng.int(20, 60);
    const a1 = rng.int(20, 40);
    const a2 = rng.int(a1 + 5, a1 + 20);
    const x = dist * (tanD(a2) - tanD(a1));
    return {
      prompt: `A flagpole stands on top of a building. From a point $${dist}$ m from the base of the building, the angle of elevation to the bottom of the flagpole is $${deg(a1)}$ and to the top of the flagpole is $${deg(a2)}$. How tall is the flagpole, ${roundingPhrase(1)} of a metre?`,
      figure: { type: 'twoTriangles', arrangement: 'stacked', labels: { d: `${dist} m`, a1: `${a1}°`, a2: `${a2}°`, x: 'x' } },
      parts: [numPart(x, { decimals: 1, suffix: 'm' })],
      hints: ['Both triangles share the horizontal distance.', 'Find the height to the top and the height to the bottom of the flagpole with tangent, then subtract.'],
      solution: [`Height to top: $${dist}\\tan ${deg(a2)} \\approx ${fmt(dist * tanD(a2), 2)}$`, `Height of building: $${dist}\\tan ${deg(a1)} \\approx ${fmt(dist * tanD(a1), 2)}$`, `Flagpole $\\approx ${fmtFixed(x, 1)}\\ \\text{m}$`],
      calculator: true,
    };
  },
});

export const TRIG_SKILLS: SkillDef[] = [labelSides, similarRatios, tanRatio, tanLength, tanAngle, writeRatio, chooseRatio, sincosLength, sincosAngle, pythagoras, solveTriangle, elevation, twoTriangles];
