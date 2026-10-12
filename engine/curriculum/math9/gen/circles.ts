/** Math 9 Unit 8 — Circle Geometry (SS1). */
import { numPart, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, PlaneFigure, SkillDef } from '../../../types.ts';
import { Sketch, at, dirTo, fl, markAngle, ms, type P } from './similarity.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Radius of every circle as drawn (figure units). */
const R = 4;
const O: P = [0, 0];
const deg = (x: number | string) => `${typeof x === 'number' ? fmt(x) : x}^\\circ`;
const dl = (x: number) => `${fmt(x)}°`;
const angleName = (a: string, v: string, b: string) => `\\angle ${a}${v}${b}`;
const safeRound = (x: number, dp: number) => Math.abs((Math.abs(x * 10 ** dp) % 1) - 0.5) > 0.06;
const sq = (x: number) => roundTo(x * x, 6);
const UNITS = ['cm', 'm', 'mm'];

/** Pythagorean triples [leg, leg, hypotenuse]. */
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [15, 20, 25],
  [7, 24, 25],
  [20, 21, 29],
  [12, 35, 37],
  [9, 40, 41],
  [10, 24, 26],
];

/** A circle with its centre O marked and labelled. */
function baseSketch(): Sketch {
  const s = new Sketch();
  s.circle(O, R);
  s.dot(O);
  return s;
}

/** A point on the circle at direction a (degrees), with its label outside the circle. */
function onCircle(s: Sketch, a: number, name: string): P {
  const p = at(O, a, R);
  s.dot(p);
  s.endLabel(p, a, name);
  return p;
}

/** Label O in the widest gap between the segments that meet there. */
function labelO(s: Sketch, to: P[]) {
  s.vertexLabel(O, to.length ? to.map((p) => dirTo(O, p)) : [0], 'O');
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — Chord properties
// ---------------------------------------------------------------------------

interface ChordLabels {
  AM?: string;
  MB?: string;
  AB?: string;
  OM?: string;
  OA?: string;
}

/**
 * Circle with chord AB, the perpendicular OM from the centre, and (optionally) radius OA.
 * r is the radius and d the distance OM in real units; the chord is turned through `turn` degrees.
 */
function chordFigure(r: number, d: number, turn: number, labs: ChordLabels, opts: { radius?: boolean; right?: boolean; names?: [string, string, string] } = {}): PlaneFigure {
  const s = baseSketch();
  const f = R / r;
  const h = Math.sqrt(Math.max(r * r - d * d, 0));
  const M = at(O, turn, d * f);
  const A = at(M, turn + 90, h * f);
  const B = at(M, turn - 90, h * f);
  const [nA, nB, nM] = opts.names ?? ['A', 'B', 'M'];
  s.seg(A, B);
  s.seg(O, M, { color: 'accent' });
  if (opts.radius) s.seg(O, A, { color: 'muted' });
  if (opts.right ?? true) markAngle(s, M, O, A, null, { right: true, r: 0.32 });
  s.dot(A).dot(B).dot(M, 'accent');
  s.endLabel(A, dirTo(O, A), nA);
  s.endLabel(B, dirTo(O, B), nB);
  s.endLabel(M, turn, nM);
  labelO(s, opts.radius ? [M, A] : [M]);
  // Chord labels go on the centre side when the chord is close to the edge of the circle.
  const ref = d / r > 0.45 ? at(M, turn, 1) : O;
  if (labs.AM) s.sideLabel(A, M, labs.AM, ref);
  if (labs.MB) s.sideLabel(M, B, labs.MB, ref);
  if (labs.AB) s.sideLabel(A, B, labs.AB, O);
  if (labs.OM) s.sideLabel(O, M, labs.OM, A);
  if (labs.OA) s.sideLabel(O, A, labs.OA, B);
  return s.build({ margin: 0.8 });
}

/** Pipe cross-section with water below (or above) a horizontal chord. */
function pipeFigure(r: number, d: number, below: boolean, labs: { w: string; r: string }): PlaneFigure {
  const s = new Sketch();
  const f = R / r;
  const h = Math.sqrt(r * r - d * d) * f;
  const y = below ? -d * f : d * f;
  const A: P = [-h, y];
  const B: P = [h, y];
  // Water: the part of the circle below the chord.
  const a0 = (Math.atan2(y, h) * 180) / Math.PI; // direction of B
  const a1 = 180 - a0; // direction of A
  const water: P[] = [];
  const span = 360 - (a1 - a0);
  for (let i = 0; i <= 48; i++) water.push(at(O, a1 + (span * i) / 48, R));
  s.poly(water, { color: 'accent', fill: true });
  s.circle(O, R);
  s.dot(O);
  s.seg(O, B, { color: 'muted' });
  s.seg(O, [0, y], { dashed: true, color: 'muted' });
  s.seg([0, y], [0, -R], { color: 'accent', dashed: true });
  s.sideLabel(A, B, labs.w, below ? [0, -R] : [0, R]);
  s.sideLabel(O, B, labs.r, [0, y]);
  s.vertexLabel(O, [dirTo(O, B), below ? -90 : 90], 'O');
  s.sideLabel([0, y], [0, -R], 'h', [-1, (y - R) / 2]);
  return s.build({ margin: 0.8 });
}

function chordGen(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(UNITS);
  const turn = rng.pick([-90, -60, -30, 0, 30, 60, 90, 120, 150, 180, 210, 240]);
  if (d === 1) {
    const kind = rng.int(0, 2);
    if (kind === 0 || kind === 1) {
      const half = rng.chance(0.75) ? rng.int(3, 15) : rng.int(3, 15) + 0.5;
      const r = half * rng.float(1.15, 1.6, 2);
      const dd = Math.sqrt(r * r - half * half);
      if (kind === 0) {
        return {
          prompt: `$O$ is the centre of the circle. $OM$ is perpendicular to the chord $AB$, and $AM = ${ms(half, u)}$. How long is the chord $AB$?`,
          figure: chordFigure(r, dd, turn, { AM: fl(half, u) }),
          parts: [numPart(2 * half, { label: '$AB =$', suffix: u })],
          hints: ['The perpendicular from the centre of a circle to a chord **bisects** the chord: it cuts it into two equal parts.', 'So $MB = AM$, and $AB = AM + MB$.'],
          solution: [
            'The perpendicular from the centre to a chord bisects the chord, so $M$ is the midpoint of $AB$.',
            `$MB = AM = ${ms(half, u)}$`,
            `$AB = ${fmt(half)} + ${fmt(half)} = ${fmt(2 * half)}$`,
            `The chord is $${ms(2 * half, u)}$ long.`,
          ],
          calculator: false,
        };
      }
      return {
        prompt: `$O$ is the centre of the circle. $OM$ is perpendicular to the chord $AB$, and the chord is $${ms(2 * half, u)}$ long. How long is $MB$?`,
        figure: chordFigure(r, dd, turn, { AB: fl(2 * half, u) }),
        parts: [numPart(half, { label: '$MB =$', suffix: u })],
        hints: ['The perpendicular from the centre of a circle to a chord bisects the chord.', 'So $M$ is the midpoint of $AB$. Halve the chord.'],
        solution: [
          'The perpendicular from the centre to a chord bisects the chord, so $AM = MB$.',
          `$MB = ${fmt(2 * half)} \\div 2 = ${fmt(half)}$`,
          `$MB = ${ms(half, u)}$`,
        ],
        calculator: false,
      };
    }
    // Angles in the right triangle OMA.
    const a = rng.int(7, 11) * 5;
    const r = 10;
    const dd = r * Math.sin((a * Math.PI) / 180);
    const s = baseSketch();
    const f = R / r;
    const h = Math.sqrt(r * r - dd * dd);
    const M = at(O, turn, dd * f);
    const A = at(M, turn + 90, h * f);
    const B = at(M, turn - 90, h * f);
    s.seg(A, B).seg(O, M, { color: 'accent' }).seg(O, A, { color: 'muted' });
    markAngle(s, M, O, A, null, { right: true, r: 0.32 });
    markAngle(s, A, O, M, dl(a), { r: 0.6 });
    markAngle(s, O, A, M, 'x', { r: 0.55 });
    s.dot(A).dot(B).dot(M, 'accent');
    s.endLabel(A, dirTo(O, A), 'A');
    s.endLabel(B, dirTo(O, B), 'B');
    s.endLabel(M, turn, 'M');
    labelO(s, [M, A]);
    return {
      prompt: `$O$ is the centre of the circle and $OM \\perp AB$. In $\\triangle OAM$, $\\angle OAM = ${deg(a)}$. Find $x = \\angle AOM$.`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart(90 - a, { label: '$x =$', suffix: '°' })],
      hints: ['$OM$ is perpendicular to the chord, so $\\angle OMA = 90^\\circ$.', 'The angles in a triangle add to $180^\\circ$.'],
      solution: [`$\\angle OMA = 90^\\circ$ because $OM \\perp AB$.`, `$x = 180^\\circ - 90^\\circ - ${deg(a)} = ${deg(90 - a)}$`, `$\\angle AOM = ${deg(90 - a)}$`],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 2);
    const exact = rng.chance(0.6);
    // r = radius, dd = distance OM, h = half the chord. Exact sets come from Pythagorean triples.
    let r: number;
    let dd: number;
    let h: number;
    if (exact) {
      [r, dd, h] = retry(
        () => {
          const [p, q, c] = rng.pick(TRIPLES);
          const m = rng.pick([1, 1, 2]);
          const swap = rng.chance(0.5);
          return [c * m, (swap ? p : q) * m, (swap ? q : p) * m];
        },
        ([r, dd]) => dd >= 0.25 * r && dd <= 0.8 * r,
      );
    } else if (kind === 2) {
      // Given the chord and the distance; the radius is rounded.
      [h, dd, r] = retry(
        () => {
          const h = rng.int(3, 20);
          const dd = rng.int(2, 16);
          return [h, dd, Math.hypot(h, dd)];
        },
        ([h, dd, r]) => dd <= 0.8 * r && dd >= 0.25 * r && h > 0 && safeRound(r, 1) && !Number.isInteger(roundTo(r, 9)),
      );
    } else if (kind === 1) {
      // Given the radius and the chord; the distance is rounded.
      [r, h, dd] = retry(
        () => {
          const r = rng.int(6, 30);
          const h = rng.int(2, r - 1);
          return [r, h, Math.sqrt(r * r - h * h)];
        },
        ([r, , dd]) => dd >= 0.25 * r && dd <= 0.8 * r && safeRound(dd, 1) && !Number.isInteger(roundTo(dd, 9)),
      );
    } else {
      // Given the radius and the distance; the chord is rounded.
      [r, dd, h] = retry(
        () => {
          const r = rng.int(6, 30);
          const dd = rng.int(2, r - 2);
          return [r, dd, Math.sqrt(r * r - dd * dd)];
        },
        ([r, dd, h]) => dd <= 0.8 * r && dd >= 0.25 * r && safeRound(2 * h, 1) && !Number.isInteger(roundTo(h, 9)),
      );
    }
    const rnd = exact ? '' : ' Round to the nearest tenth.';
    const dp = exact ? undefined : 1;
    const shown = (x: number) => (exact ? ms(x, u) : ms(roundTo(x, 1).toFixed(1), u));
    const ans = (x: number) => (exact ? x : roundTo(x, 1));
    if (kind === 0) {
      const ab = 2 * h;
      return {
        prompt: `A circle with centre $O$ has a radius of $${ms(r, u)}$. The chord $AB$ is $${ms(dd, u)}$ from the centre. How long is the chord $AB$?${rnd}`,
        figure: chordFigure(r, dd, turn, { OA: fl(r, u), OM: fl(dd, u) }, { radius: true }),
        parts: [numPart(ans(ab), { label: '$AB =$', suffix: u, decimals: dp })],
        hints: [
          'The distance from the centre to a chord is measured along the perpendicular $OM$. The radius $OA$ makes a right triangle $OMA$.',
          '$AM^2 + OM^2 = OA^2$. Find $AM$, then double it, because $OM$ bisects the chord.',
        ],
        solution: [
          `In right $\\triangle OMA$: $OA = ${r}$ (a radius) and $OM = ${dd}$.`,
          `$AM^2 = ${r}^2 - ${dd}^2 = ${r * r} - ${dd * dd} = ${r * r - dd * dd}$`,
          exact ? `$AM = \\sqrt{${r * r - dd * dd}} = ${h}$` : `$AM = \\sqrt{${r * r - dd * dd}} \\approx ${fmt(h, 3)}$`,
          exact ? `$OM$ bisects the chord, so $AB = 2 \\times ${h} = ${ab}$` : `$OM$ bisects the chord, so $AB \\approx 2 \\times ${fmt(h, 3)} \\approx ${fmt(ab, 3)}$`,
          `The chord is ${exact ? '' : 'about '}$${shown(ab)}$ long.`,
        ],
      };
    }
    if (kind === 1) {
      return {
        prompt: `A circle with centre $O$ has a radius of $${ms(r, u)}$. The chord $AB$ is $${ms(2 * h, u)}$ long. How far is the chord from the centre? (Find $OM$, where $OM \\perp AB$.)${rnd}`,
        figure: chordFigure(r, dd, turn, { OA: fl(r, u), AB: fl(2 * h, u) }, { radius: true }),
        parts: [numPart(ans(dd), { label: '$OM =$', suffix: u, decimals: dp })],
        hints: ['$OM$ bisects the chord, so $AM$ is half of $AB$.', 'Use the Pythagorean theorem in right $\\triangle OMA$: $OM^2 = OA^2 - AM^2$.'],
        solution: [
          `$OM$ bisects the chord: $AM = ${2 * h} \\div 2 = ${h}$`,
          `$OM^2 = ${r}^2 - ${h}^2 = ${r * r} - ${h * h} = ${r * r - h * h}$`,
          exact ? `$OM = \\sqrt{${r * r - h * h}} = ${dd}$` : `$OM = \\sqrt{${r * r - h * h}} \\approx ${fmt(dd, 3)}$`,
          `The chord is ${exact ? '' : 'about '}$${shown(dd)}$ from the centre.`,
        ],
      };
    }
    return {
      prompt: `In a circle with centre $O$, the chord $AB$ is $${ms(2 * h, u)}$ long and is $${ms(dd, u)}$ from the centre. What is the radius of the circle?${rnd}`,
      figure: chordFigure(r, dd, turn, { AB: fl(2 * h, u), OM: fl(dd, u), OA: 'r' }, { radius: true }),
      parts: [numPart(ans(r), { label: '$r =$', suffix: u, decimals: dp })],
      hints: ['Draw the radius $OA$. Triangle $OMA$ has a right angle at $M$.', '$AM$ is half the chord. Then $r^2 = AM^2 + OM^2$.'],
      solution: [
        `$OM$ bisects the chord: $AM = ${2 * h} \\div 2 = ${h}$`,
        `$r^2 = ${h}^2 + ${dd}^2 = ${h * h} + ${dd * dd} = ${h * h + dd * dd}$`,
        exact ? `$r = \\sqrt{${h * h + dd * dd}} = ${r}$` : `$r = \\sqrt{${h * h + dd * dd}} \\approx ${fmt(r, 3)}$`,
        `The radius is ${exact ? '' : 'about '}$${shown(r)}$.`,
      ],
    };
  }
  // d = 3
  const kind = rng.int(0, 2);
  if (kind === 0) {
    // Water in a pipe.
    const below = rng.chance(0.65);
    // The water surface is the chord; its distance from the centre is one leg of a Pythagorean triple.
    const [dd, r] = retry(
      () => {
        const [p, q, c] = rng.pick(TRIPLES.filter((t) => t[2] <= 41));
        const m = rng.pick([1, 2]);
        return [(rng.chance(0.5) ? p : q) * m, c * m];
      },
      ([dd, r]) => dd >= 0.25 * r && dd <= 0.75 * r,
    );
    const half = Math.sqrt(r * r - dd * dd);
    const w = 2 * half;
    const depth = below ? r - dd : r + dd;
    const what = rng.pick(['a drainage pipe', 'a culvert under a farm road', 'a round water trough lying on its side', 'a storm sewer pipe']);
    const uu = r * 2 > 60 ? 'cm' : rng.pick(['cm', 'cm', 'mm']);
    return {
      prompt: `The diagram shows the end of ${what}. The circle has a radius of $${ms(r, uu)}$. The top of the water is a chord $${ms(w, uu)}$ wide. The pipe is ${below ? 'less' : 'more'} than half full. How deep is the water ($h$ in the diagram)?`,
      figure: pipeFigure(r, dd, below, { w: fl(w, uu), r: fl(r, uu) }),
      parts: [numPart(depth, { label: '$h =$', suffix: uu })],
      hints: [
        'The perpendicular from the centre to the water surface bisects it. Make a right triangle with half the chord, the distance from the centre and a radius.',
        `Find the distance from the centre to the water surface, then ${below ? 'subtract it from' : 'add it to'} the radius.`,
      ],
      solution: [
        `Half the chord: $${fmt(w)} \\div 2 = ${fmt(half)}$`,
        `Distance from the centre to the surface: $d^2 = ${fmt(r)}^2 - ${fmt(half)}^2 = ${fmt(sq(r))} - ${fmt(sq(half))} = ${fmt(sq(dd))}$, so $d = ${fmt(dd)}$`,
        below
          ? `The surface is below the centre, so the depth is the radius minus $d$: $${fmt(r)} - ${fmt(dd)} = ${fmt(depth)}$`
          : `The surface is above the centre, so the depth is the radius plus $d$: $${fmt(r)} + ${fmt(dd)} = ${fmt(depth)}$`,
        `The water is $${ms(depth, uu)}$ deep: $h = ${ms(depth, uu)}$.`,
      ],
    };
  }
  if (kind === 1) {
    // Two parallel chords.
    const set = rng.pick([
      { r: 5, legs: [3, 4] },
      { r: 10, legs: [6, 8] },
      { r: 25, legs: [7, 15, 20] },
      { r: 50, legs: [14, 30, 40] },
      { r: 65, legs: [16, 25, 33, 39] },
      { r: 85, legs: [13, 36, 40, 51] },
    ]);
    const [d1, d2] = retry(
      () => rng.sample(set.legs, 2),
      ([a, b]) => a !== b,
    );
    const h1 = Math.sqrt(set.r ** 2 - d1 ** 2);
    const h2 = Math.sqrt(set.r ** 2 - d2 ** 2);
    const opposite = rng.chance(0.55);
    const gap = opposite ? d1 + d2 : Math.abs(d1 - d2);
    const s = baseSketch();
    const f = R / set.r;
    const t = rng.pick([90, -90, 0, 180]);
    const M1 = at(O, t, d1 * f);
    const M2 = at(O, opposite ? t + 180 : t, d2 * f);
    const A = at(M1, t + 90, h1 * f);
    const B = at(M1, t - 90, h1 * f);
    const C = at(M2, t + 90, h2 * f);
    const D = at(M2, t - 90, h2 * f);
    s.seg(A, B).seg(C, D).seg(O, M1, { color: 'accent' }).seg(O, M2, { color: 'accent' });
    s.dot(A).dot(B).dot(C).dot(D);
    s.endLabel(A, dirTo(O, A), 'A').endLabel(B, dirTo(O, B), 'B').endLabel(C, dirTo(O, C), 'C').endLabel(D, dirTo(O, D), 'D');
    s.sideLabel(A, B, fl(2 * h1, u), O);
    s.sideLabel(C, D, fl(2 * h2, u), opposite ? O : M1);
    labelO(s, [M1, M2]);
    return {
      prompt: `A circle with centre $O$ has a radius of $${ms(set.r, u)}$. Chords $AB$ and $CD$ are parallel and on ${opposite ? 'opposite sides' : 'the same side'} of the centre. $AB = ${ms(2 * h1, u)}$ and $CD = ${ms(2 * h2, u)}$. How far apart are the two chords?`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart(gap, { label: 'Distance', suffix: u })],
      hints: [
        'Find how far each chord is from the centre. Use half of each chord, the radius, and the Pythagorean theorem.',
        opposite ? 'The chords are on opposite sides of the centre, so add the two distances.' : 'The chords are on the same side of the centre, so subtract the two distances.',
      ],
      solution: [
        `Chord $AB$: half is $${fmt(h1)}$, so its distance from $O$ is $\\sqrt{${set.r}^2 - ${fmt(h1)}^2} = \\sqrt{${set.r ** 2 - h1 * h1}} = ${d1}$`,
        `Chord $CD$: half is $${fmt(h2)}$, so its distance from $O$ is $\\sqrt{${set.r}^2 - ${fmt(h2)}^2} = \\sqrt{${set.r ** 2 - h2 * h2}} = ${d2}$`,
        opposite ? `Opposite sides: $${d1} + ${d2} = ${gap}$` : `Same side: $${Math.max(d1, d2)} - ${Math.min(d1, d2)} = ${gap}$`,
        `The chords are $${ms(gap, u)}$ apart.`,
      ],
    };
  }
  // Diameter from a chord and its distance from the centre.
  const [dd, half, r] = retry(
    () => {
      const [p, q, c] = rng.pick(TRIPLES);
      const m = rng.pick([1, 2]);
      const swap = rng.chance(0.5);
      return [(swap ? p : q) * m, (swap ? q : p) * m, c * m];
    },
    ([dd, , r]) => dd >= 0.25 * r && dd <= 0.8 * r,
  );
  const ctx = rng.pick([
    { what: 'a round skating pond', chord: 'A straight path of ice', u: 'm' },
    { what: 'a circular garden', chord: 'A straight row of tulips', u: 'm' },
    { what: 'a round tabletop', chord: 'A straight crack', u: 'cm' },
    { what: 'a circular hay field', chord: 'A straight fence', u: 'm' },
  ]);
  return {
    prompt: `${ctx.chord} crosses ${ctx.what} from edge to edge. It is $${ms(2 * half, ctx.u)}$ long, and its closest point to the centre is $${ms(dd, ctx.u)}$ away. What is the diameter of ${ctx.what}?`,
    figure: chordFigure(r, dd, turn, { AB: fl(2 * half, ctx.u), OM: fl(dd, ctx.u), OA: 'r' }, { radius: true }),
    parts: [numPart(2 * r, { label: 'Diameter', suffix: ctx.u })],
    hints: ['The closest distance from the centre to a chord is along the perpendicular, which bisects the chord.', 'Use half the chord and the distance in the Pythagorean theorem to find the radius. Then double it.'],
    solution: [
      `The perpendicular from the centre bisects the chord: half the chord is $${fmt(2 * half)} \\div 2 = ${fmt(half)}$.`,
      `$r^2 = ${fmt(half)}^2 + ${fmt(dd)}^2 = ${sq(half)} + ${sq(dd)} = ${sq(r)}$, so $r = ${r}$`,
      `Diameter $= 2 \\times ${r} = ${2 * r}$`,
      `The diameter is $${ms(2 * r, ctx.u)}$.`,
    ],
    calculator: true,
  };
}

const chordProperties = skill({
  id: 'm9-chord-properties',
  name: 'Chord properties',
  description: 'Use the fact that the perpendicular from the centre of a circle to a chord bisects the chord, together with the Pythagorean theorem, to find lengths and angles.',
  outcomes: ['SS1'],
  lessonId: 'm9-8-1',
  calculator: true,
  gen: chordGen,
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Inscribed and central angles
// ---------------------------------------------------------------------------

/**
 * Points on the circle for an inscribed triangle with angles a (at the first point), b and c, placed so
 * that each arc is twice the opposite angle. Returns the directions of the three points.
 */
function triDirs(a: number, b: number, c: number, start: number): [number, number, number] {
  // P1 at start; P2 is 2c further on (arc P1P2 is opposite the third point); P3 is 2a further.
  return [start, start + 2 * c, start + 2 * c + 2 * a];
}

function inscribedGen(rng: Rng, d: Difficulty): GenOutput {
  const start = rng.int(0, 359);
  if (d === 1) {
    const kind = rng.pick(['central', 'central', 'inscribed', 'inscribed', 'semi'] as const);
    if (kind === 'semi') {
      const c = rng.int(20, 70);
      const s = baseSketch();
      const [aA, aB, aC] = triDirs(c, 90 - c, 90, start);
      const A = onCircle(s, aA, 'A');
      const B = onCircle(s, aB, 'B');
      const C = onCircle(s, aC, 'C');
      s.seg(A, B).seg(A, C).seg(B, C);
      markAngle(s, C, A, B, 'x', { r: 0.55 });
      labelO(s, [A, B]);
      return {
        prompt: '$O$ is the centre of the circle, and $AB$ is a diameter. $C$ is a point on the circle. Find $x = \\angle ACB$.',
        figure: s.build({ margin: 0.8 }),
        parts: [numPart(90, { label: '$x =$', suffix: '°' })],
        hints: ['$\\angle ACB$ is an inscribed angle on the arc $AB$, which is half the circle.', 'The central angle on a diameter is a straight angle, $180^\\circ$. An inscribed angle is half the central angle.'],
        solution: ['The central angle on the diameter $AB$ is the straight angle $\\angle AOB = 180^\\circ$.', 'The inscribed angle on the same arc is half of it: $180^\\circ \\div 2 = 90^\\circ$.', 'An angle inscribed in a semicircle is a right angle: $x = 90^\\circ$.'],
        calculator: false,
      };
    }
    const ins = rng.int(25, 75);
    const other = rng.int(30, 150 - ins);
    // Triangle ACB with angle ins at C; angles at A and B split the rest.
    const angA = Math.min(Math.max(other, 30), 180 - ins - 30);
    const angB = 180 - ins - angA;
    const s = baseSketch();
    const [dC, dA, dB] = triDirs(ins, angA, angB, start);
    const C = onCircle(s, dC, 'C');
    const A = onCircle(s, dA, 'A');
    const B = onCircle(s, dB, 'B');
    s.seg(C, A).seg(C, B).seg(O, A, { color: 'muted' }).seg(O, B, { color: 'muted' });
    const central = 2 * ins;
    if (kind === 'central') {
      markAngle(s, O, A, B, dl(central), { r: 0.6 });
      markAngle(s, C, A, B, 'x', { r: 0.6 });
      labelO(s, [A, B]);
      return {
        prompt: `$O$ is the centre of the circle. The central angle $\\angle AOB = ${deg(central)}$. Find the inscribed angle $x = \\angle ACB$.`,
        figure: s.build({ margin: 0.8 }),
        parts: [numPart(ins, { label: '$x =$', suffix: '°' })],
        hints: ['Both angles stand on the same arc $AB$.', 'A central angle is twice the inscribed angle on the same arc. So the inscribed angle is half the central angle.'],
        solution: ['$\\angle AOB$ and $\\angle ACB$ are subtended by the same arc $AB$.', `The inscribed angle is half the central angle: $x = ${deg(central)} \\div 2 = ${deg(ins)}$`],
        calculator: false,
      };
    }
    markAngle(s, O, A, B, 'x', { r: 0.6 });
    markAngle(s, C, A, B, dl(ins), { r: 0.6 });
    labelO(s, [A, B]);
    return {
      prompt: `$O$ is the centre of the circle. The inscribed angle $\\angle ACB = ${deg(ins)}$. Find the central angle $x = \\angle AOB$.`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart(central, { label: '$x =$', suffix: '°' })],
      hints: ['Both angles stand on the same arc $AB$.', 'The central angle is twice the inscribed angle.'],
      solution: ['$\\angle AOB$ and $\\angle ACB$ are subtended by the same arc $AB$.', `The central angle is twice the inscribed angle: $x = 2 \\times ${deg(ins)} = ${deg(central)}$`],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.pick(['same', 'semi', 'iso'] as const);
    if (kind === 'same') {
      const ins = rng.int(25, 70);
      const s = baseSketch();
      const dA = start;
      const dB = start + 2 * ins;
      // C and D both on the major arc from B round to A.
      const major = 360 - 2 * ins;
      const tC = rng.float(0.15, 0.4, 2);
      const tD = rng.float(0.6, 0.85, 2);
      const A = onCircle(s, dA, 'A');
      const B = onCircle(s, dB, 'B');
      const C = onCircle(s, dB + tC * major, 'C');
      const D = onCircle(s, dB + tD * major, 'D');
      s.seg(C, A).seg(C, B).seg(D, A).seg(D, B);
      markAngle(s, C, A, B, dl(ins), { r: 0.7 });
      markAngle(s, D, A, B, 'x', { r: 0.7 });
      labelO(s, []);
      return {
        prompt: `$O$ is the centre of the circle. $\\angle ACB = ${deg(ins)}$. Find $x = \\angle ADB$.`,
        figure: s.build({ margin: 0.8 }),
        parts: [numPart(ins, { label: '$x =$', suffix: '°' })],
        hints: ['Which arc does each angle stand on? Follow the two arms of each angle to the circle.', 'Inscribed angles subtended by the same arc are equal.'],
        solution: ['Both $\\angle ACB$ and $\\angle ADB$ have their arms ending at $A$ and $B$, so both are subtended by arc $AB$.', 'Inscribed angles on the same arc are equal.', `$x = ${deg(ins)}$`],
        calculator: false,
      };
    }
    if (kind === 'semi') {
      const a = rng.int(25, 65);
      const s = baseSketch();
      // Triangle ABC with the right angle at C: angle a at A, 90 - a at B.
      const [dA, dB, dC] = triDirs(a, 90 - a, 90, start);
      const A = onCircle(s, dA, 'A');
      const B = onCircle(s, dB, 'B');
      const C = onCircle(s, dC, 'C');
      s.seg(A, B).seg(A, C).seg(B, C);
      markAngle(s, A, C, B, dl(a), { r: 0.7 });
      markAngle(s, B, A, C, 'x', { r: 0.6 });
      labelO(s, [A, B]);
      return {
        prompt: `$O$ is the centre of the circle and $AB$ is a diameter. $\\angle CAB = ${deg(a)}$. Find $x = \\angle ABC$.`,
        figure: s.build({ margin: 0.8 }),
        parts: [numPart(90 - a, { label: '$x =$', suffix: '°' })],
        hints: ['$AB$ is a diameter, so $\\angle ACB$ is inscribed in a semicircle.', 'An angle inscribed in a semicircle is $90^\\circ$. Then use the angle sum of a triangle.'],
        solution: ['$\\angle ACB$ is inscribed in a semicircle, so $\\angle ACB = 90^\\circ$.', `$x = 180^\\circ - 90^\\circ - ${deg(a)} = ${deg(90 - a)}$`, `$\\angle ABC = ${deg(90 - a)}$`],
        calculator: false,
      };
    }
    // Central angle and the isosceles triangle OAB.
    const c = rng.int(25, 65) * 2;
    const s = baseSketch();
    const A = onCircle(s, start, 'A');
    const B = onCircle(s, start + c, 'B');
    s.seg(O, A).seg(O, B).seg(A, B);
    markAngle(s, O, A, B, dl(c), { r: 0.6 });
    markAngle(s, A, O, B, 'x', { r: 0.6 });
    labelO(s, [A, B]);
    return {
      prompt: `$O$ is the centre of the circle and $\\angle AOB = ${deg(c)}$. Find $x = \\angle OAB$.`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart((180 - c) / 2, { label: '$x =$', suffix: '°' })],
      hints: ['$OA$ and $OB$ are both radii, so $\\triangle OAB$ is isosceles.', 'The two base angles of an isosceles triangle are equal, and the three angles add to $180^\\circ$.'],
      solution: [
        '$OA = OB$ (radii), so $\\triangle OAB$ is isosceles and $\\angle OAB = \\angle OBA$.',
        `$\\angle OAB + \\angle OBA = 180^\\circ - ${deg(c)} = ${deg(180 - c)}$`,
        `$x = ${deg(180 - c)} \\div 2 = ${deg((180 - c) / 2)}$`,
      ],
      calculator: false,
    };
  }
  // d = 3: two related angles.
  const kind = rng.pick(['diameter', 'central', 'triangle'] as const);
  if (kind === 'diameter') {
    const a = rng.int(25, 62);
    const s = baseSketch();
    const dA = start;
    const dB = start + 180;
    // C on one semicircle with angle CAB = a, so arc CB (not containing A) = 2a.
    const dC = dB - 2 * a;
    // D on the other semicircle (it must not be on arc CB).
    const dD = dB + rng.float(0.3, 0.7, 2) * 180;
    const A = onCircle(s, dA, 'A');
    const B = onCircle(s, dB, 'B');
    const C = onCircle(s, dC, 'C');
    const D = onCircle(s, dD, 'D');
    s.seg(A, B).seg(A, C).seg(B, C).seg(D, C).seg(D, B);
    markAngle(s, A, C, B, dl(a), { r: 0.7 });
    markAngle(s, D, C, B, 'x', { r: 0.6 });
    markAngle(s, B, A, C, 'y', { r: 0.6 });
    labelO(s, [A, B]);
    return {
      prompt: `$O$ is the centre of the circle and $AB$ is a diameter. $\\angle CAB = ${deg(a)}$. (a) Find $x = \\angle CDB$. (b) Find $y = \\angle ABC$.`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart(a, { label: '(a) $x =$', suffix: '°' }), numPart(90 - a, { label: '(b) $y =$', suffix: '°' })],
      hints: ['(a) $\\angle CAB$ and $\\angle CDB$ both have arms ending at $C$ and $B$. Which arc are they on?', '(b) $AB$ is a diameter, so $\\angle ACB = 90^\\circ$. Then use the angle sum in $\\triangle ABC$.'],
      solution: [
        '(a) $\\angle CAB$ and $\\angle CDB$ are inscribed angles subtended by the same arc $CB$, so they are equal.',
        `$x = ${deg(a)}$`,
        '(b) $\\angle ACB$ is inscribed in a semicircle, so $\\angle ACB = 90^\\circ$.',
        `$y = 180^\\circ - 90^\\circ - ${deg(a)} = ${deg(90 - a)}$`,
        `So $x = ${deg(a)}$ and $y = ${deg(90 - a)}$.`,
      ],
      calculator: false,
    };
  }
  if (kind === 'central') {
    const c = rng.int(25, 65) * 2;
    const s = baseSketch();
    const dA = start;
    const dB = start + c;
    const dC = dB + rng.float(0.3, 0.7, 2) * (360 - c);
    const A = onCircle(s, dA, 'A');
    const B = onCircle(s, dB, 'B');
    const C = onCircle(s, dC, 'C');
    s.seg(O, A).seg(O, B).seg(A, B).seg(C, A).seg(C, B);
    markAngle(s, O, A, B, dl(c), { r: 0.55 });
    markAngle(s, C, A, B, 'x', { r: 0.6 });
    markAngle(s, A, O, B, 'y', { r: 0.6 });
    labelO(s, [A, B]);
    return {
      prompt: `$O$ is the centre of the circle and $\\angle AOB = ${deg(c)}$. (a) Find $x = \\angle ACB$. (b) Find $y = \\angle OAB$.`,
      figure: s.build({ margin: 0.8 }),
      parts: [numPart(c / 2, { label: '(a) $x =$', suffix: '°' }), numPart((180 - c) / 2, { label: '(b) $y =$', suffix: '°' })],
      hints: ['(a) The central angle is twice the inscribed angle on the same arc.', '(b) $OA$ and $OB$ are radii, so $\\triangle OAB$ is isosceles.'],
      solution: [
        `(a) $\\angle ACB$ and $\\angle AOB$ are subtended by arc $AB$, so $x = ${deg(c)} \\div 2 = ${deg(c / 2)}$`,
        `(b) $OA = OB$, so the base angles of $\\triangle OAB$ are equal: $y = (180^\\circ - ${deg(c)}) \\div 2 = ${deg((180 - c) / 2)}$`,
        `So $x = ${deg(c / 2)}$ and $y = ${deg((180 - c) / 2)}$.`,
      ],
      calculator: false,
    };
  }
  // Inscribed triangle ABC with two angles known.
  const [i, j] = retry(
    () => [rng.int(28, 75), rng.int(28, 75)],
    ([i, j]) => 180 - i - j >= 28 && i !== j,
  );
  const k = 180 - i - j;
  const s = baseSketch();
  // Angles: C = i, A = j, B = k.
  const [dC, dA, dB] = triDirs(i, j, k, start);
  const C = onCircle(s, dC, 'C');
  const A = onCircle(s, dA, 'A');
  const B = onCircle(s, dB, 'B');
  s.seg(A, B).seg(B, C).seg(C, A).seg(O, A, { color: 'muted' }).seg(O, B, { color: 'muted' });
  markAngle(s, C, A, B, dl(i), { r: 0.6 });
  markAngle(s, A, B, C, dl(j), { r: 0.6 });
  markAngle(s, O, A, B, 'x', { r: 0.55 });
  markAngle(s, B, A, C, 'y', { r: 0.6 });
  labelO(s, [A, B]);
  const cIsObtuse = 2 * i > 180;
  return {
    prompt: `$O$ is the centre of the circle. In $\\triangle ABC$, $\\angle ACB = ${deg(i)}$ and $\\angle CAB = ${deg(j)}$. (a) Find the central angle $x = \\angle AOB$. (b) Find $y = \\angle ABC$.`,
    figure: s.build({ margin: 0.8 }),
    parts: [numPart(2 * i, { label: '(a) $x =$', suffix: '°' }), numPart(k, { label: '(b) $y =$', suffix: '°' })],
    hints: ['(a) $\\angle AOB$ and $\\angle ACB$ are subtended by the same arc $AB$.', '(b) The angles of $\\triangle ABC$ add to $180^\\circ$.'],
    solution: [
      `(a) The central angle is twice the inscribed angle on arc $AB$: $x = 2 \\times ${deg(i)} = ${deg(2 * i)}$${cIsObtuse ? '' : ''}`,
      `(b) $y = 180^\\circ - ${deg(i)} - ${deg(j)} = ${deg(k)}$`,
      `So $x = ${deg(2 * i)}$ and $y = ${deg(k)}$.`,
    ],
    calculator: false,
  };
}

const inscribedAngles = skill({
  id: 'm9-inscribed-angles',
  name: 'Inscribed and central angles',
  description: 'Use the central angle and inscribed angle properties, including equal inscribed angles on the same arc and the right angle in a semicircle, to find angles.',
  outcomes: ['SS1'],
  lessonId: 'm9-8-2',
  gen: inscribedGen,
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Tangent properties
// ---------------------------------------------------------------------------

interface TanLabels {
  OP?: string;
  PT?: string;
  OT?: string;
  atO?: string;
  atT?: string;
}

/** Circle, radius OP, tangent at P running to the outside point T, and OT. Lengths are real units. */
function tangentFigure(r: number, pt: number, dir: number, side: 1 | -1, labs: TanLabels, opts: { right?: boolean; names?: [string, string] } = {}): PlaneFigure {
  const s = baseSketch();
  const f = R / r;
  const P = at(O, dir, R);
  const T = at(P, dir + 90 * side, pt * f);
  const back = at(P, dir - 90 * side, 1.4);
  const [nP, nT] = opts.names ?? ['P', 'T'];
  s.seg(back, T);
  s.seg(O, P, { color: 'accent' });
  s.seg(O, T, { color: 'muted' });
  s.dot(P).dot(T);
  if (opts.right ?? true) markAngle(s, P, O, T, null, { right: true, r: 0.32 });
  s.endLabel(P, dir, nP);
  s.endLabel(T, dirTo(P, T), nT);
  labelO(s, [P, T]);
  if (labs.OP) s.sideLabel(O, P, labs.OP, T);
  if (labs.PT) s.sideLabel(P, T, labs.PT, O);
  if (labs.OT) s.sideLabel(O, T, labs.OT, P);
  if (labs.atO) markAngle(s, O, P, T, labs.atO, { r: 0.6 });
  if (labs.atT) markAngle(s, T, O, P, labs.atT, { r: 0.9 });
  return s.build({ margin: 0.8 });
}

/** Two tangents from T touching the circle at P and Q. */
function twoTangentFigure(r: number, ot: number, dir: number, labs: { atO?: string; atT?: string; OP?: string; OT?: string; PT?: string; QT?: string }): PlaneFigure {
  const s = baseSketch();
  const f = R / r;
  const T = at(O, dir, ot * f);
  const half = (Math.acos(r / ot) * 180) / Math.PI;
  const P = at(O, dir + half, R);
  const Q = at(O, dir - half, R);
  s.seg(P, T).seg(Q, T);
  s.seg(O, P, { color: 'accent' }).seg(O, Q, { color: 'accent' });
  if (labs.OT) s.seg(O, T, { color: 'muted', dashed: true });
  s.dot(P).dot(Q).dot(T);
  markAngle(s, P, O, T, null, { right: true, r: 0.32 });
  markAngle(s, Q, O, T, null, { right: true, r: 0.32 });
  s.endLabel(P, dirTo(O, P), 'P');
  s.endLabel(Q, dirTo(O, Q), 'Q');
  s.endLabel(T, dir, 'T');
  labelO(s, [P, Q]);
  if (labs.atO) markAngle(s, O, P, Q, labs.atO, { r: 0.6 });
  if (labs.atT) markAngle(s, T, P, Q, labs.atT, { r: 0.9 });
  if (labs.OP) s.sideLabel(O, P, labs.OP, Q);
  if (labs.OT) s.sideLabel(O, T, labs.OT, P);
  if (labs.PT) s.sideLabel(P, T, labs.PT, O);
  if (labs.QT) s.sideLabel(Q, T, labs.QT, O);
  return s.build({ margin: 0.8 });
}

function tangentGen(rng: Rng, d: Difficulty): GenOutput {
  const u = rng.pick(UNITS);
  const dir = rng.int(0, 359);
  const side: 1 | -1 = rng.chance(0.5) ? 1 : -1;
  if (d === 1) {
    const kind = rng.pick(['atT', 'atT', 'atO', 'atO', 'right'] as const);
    const a = rng.int(35, 60);
    // Real proportions: angle at O is a, so PT = r tan(a).
    const r = 5;
    const pt = r * Math.tan((a * Math.PI) / 180);
    if (kind === 'right') {
      return {
        prompt: '$O$ is the centre of the circle, and the line $PT$ is tangent to the circle at $P$. What is the measure of $\\angle OPT$?',
        figure: tangentFigure(r, pt, dir, side, {}, { right: false }),
        parts: [numPart(90, { label: '$\\angle OPT =$', suffix: '°' })],
        hints: ['$OP$ is a radius that ends at the point of tangency.', 'A tangent is perpendicular to the radius at the point of tangency.'],
        solution: ['$OP$ is a radius, and $P$ is the point of tangency.', 'A tangent is perpendicular to the radius at the point of tangency, so $\\angle OPT = 90^\\circ$.'],
        calculator: false,
      };
    }
    const atO = kind === 'atO';
    return {
      prompt: atO
        ? `$O$ is the centre of the circle, and $PT$ is tangent to the circle at $P$. $\\angle POT = ${deg(a)}$. Find $x = \\angle OTP$.`
        : `$O$ is the centre of the circle, and $PT$ is tangent to the circle at $P$. $\\angle OTP = ${deg(90 - a)}$. Find $x = \\angle POT$.`,
      figure: tangentFigure(r, pt, dir, side, atO ? { atO: dl(a), atT: 'x' } : { atO: 'x', atT: dl(90 - a) }),
      parts: [numPart(atO ? 90 - a : a, { label: '$x =$', suffix: '°' })],
      hints: ['The tangent is perpendicular to the radius $OP$, so $\\angle OPT = 90^\\circ$.', 'The angles of $\\triangle OPT$ add to $180^\\circ$.'],
      solution: [
        '$PT$ is tangent at $P$, so $OP \\perp PT$ and $\\angle OPT = 90^\\circ$.',
        `$x = 180^\\circ - 90^\\circ - ${deg(atO ? a : 90 - a)} = ${deg(atO ? 90 - a : a)}$`,
        `$${atO ? angleName('O', 'T', 'P') : angleName('P', 'O', 'T')} = ${deg(atO ? 90 - a : a)}$`,
      ],
      calculator: false,
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 2);
    const exact = rng.chance(0.65);
    let r: number;
    let pt: number;
    let ot: number;
    if (exact) {
      const [p, q, c] = rng.pick(TRIPLES);
      const m = rng.pick([1, 1, 2]);
      const swap = rng.chance(0.5);
      r = (swap ? p : q) * m;
      pt = (swap ? q : p) * m;
      ot = c * m;
    } else {
      [r, pt, ot] = retry(
        () => {
          const r = rng.int(3, 20);
          const pt = rng.int(4, 30);
          return [r, pt, Math.hypot(r, pt)];
        },
        ([r, pt, ot]) => pt > 0.6 * r && pt < 3.5 * r && safeRound(ot, 1) && !Number.isInteger(ot),
      );
    }
    const labsFor = (k: number): TanLabels => (k === 0 ? { OP: fl(r, u), OT: fl(roundTo(ot, 3), u), PT: 'x' } : k === 1 ? { OP: fl(r, u), PT: fl(pt, u), OT: 'x' } : { PT: fl(pt, u), OT: fl(roundTo(ot, 3), u), OP: 'x' });
    if (kind === 1) {
      return {
        prompt: `$O$ is the centre of a circle with radius $${ms(r, u)}$. $PT$ is tangent to the circle at $P$, and $PT = ${ms(pt, u)}$. Find $x = OT$, the distance from $T$ to the centre.${exact ? '' : ' Round to the nearest tenth.'}`,
        figure: tangentFigure(r, pt, dir, side, labsFor(1)),
        parts: [numPart(exact ? ot : roundTo(ot, 1), { label: '$x =$', suffix: u, decimals: exact ? undefined : 1 })],
        hints: ['The tangent is perpendicular to the radius, so $\\triangle OPT$ has a right angle at $P$.', '$OT$ is the hypotenuse: $OT^2 = OP^2 + PT^2$.'],
        solution: [
          '$\\angle OPT = 90^\\circ$ because a tangent is perpendicular to the radius at the point of tangency.',
          `$x^2 = ${r}^2 + ${pt}^2 = ${r * r} + ${pt * pt} = ${r * r + pt * pt}$`,
          exact ? `$x = \\sqrt{${r * r + pt * pt}} = ${ot}$` : `$x = \\sqrt{${r * r + pt * pt}} \\approx ${fmt(ot, 3)}$`,
          exact ? `$OT = ${ms(ot, u)}$` : `$OT \\approx ${ms(roundTo(ot, 1).toFixed(1), u)}$`,
        ],
        calculator: true,
      };
    }
    // For the other two kinds, the given hypotenuse must be a nice number.
    const otShown = exact ? ot : roundTo(ot, 1);
    const unknownR = kind === 2;
    const known = unknownR ? pt : r;
    const val = Math.sqrt(otShown * otShown - known * known);
    const exactAns = Number.isInteger(roundTo(val, 9));
    return {
      prompt: unknownR
        ? `$PT$ is tangent at $P$ to a circle with centre $O$. $PT = ${ms(pt, u)}$ and $OT = ${ms(otShown, u)}$. Find the radius $x = OP$.${exactAns ? '' : ' Round to the nearest tenth.'}`
        : `$O$ is the centre of a circle with radius $${ms(r, u)}$. $PT$ is tangent to the circle at $P$, and $OT = ${ms(otShown, u)}$. Find the length of the tangent segment $x = PT$.${exactAns ? '' : ' Round to the nearest tenth.'}`,
      figure: tangentFigure(unknownR ? val : r, unknownR ? pt : val, dir, side, unknownR ? { PT: fl(pt, u), OT: fl(otShown, u), OP: 'x' } : { OP: fl(r, u), OT: fl(otShown, u), PT: 'x' }),
      parts: [numPart(exactAns ? roundTo(val, 9) : roundTo(val, 1), { label: '$x =$', suffix: u, decimals: exactAns ? undefined : 1 })],
      hints: ['The tangent is perpendicular to the radius, so $\\triangle OPT$ has a right angle at $P$, and $OT$ is the hypotenuse.', `$x^2 = OT^2 - ${unknownR ? 'PT' : 'OP'}^2$`],
      solution: [
        '$\\angle OPT = 90^\\circ$ because a tangent is perpendicular to the radius at the point of tangency.',
        `$x^2 = ${fmt(otShown)}^2 - ${known}^2 = ${fmt(sq(otShown))} - ${known * known} = ${fmt(roundTo(sq(otShown) - known * known, 4))}$`,
        exactAns ? `$x = \\sqrt{${fmt(roundTo(sq(otShown) - known * known, 4))}} = ${fmt(val)}$` : `$x = \\sqrt{${fmt(roundTo(sq(otShown) - known * known, 4))}} \\approx ${fmt(val, 3)}$`,
        exactAns ? `$${unknownR ? 'OP' : 'PT'} = ${ms(roundTo(val, 9), u)}$` : `$${unknownR ? 'OP' : 'PT'} \\approx ${ms(roundTo(val, 1).toFixed(1), u)}$`,
      ],
      calculator: true,
    };
  }
  // d = 3
  const kind = rng.int(0, 2);
  if (kind === 0) {
    // Two tangents: angle at T and angle at O.
    const t = rng.int(8, 30) * 4;
    const giveT = rng.chance(0.5);
    const r = 5;
    const ot = r / Math.sin(((t / 2) * Math.PI) / 180);
    return {
      prompt: giveT
        ? `$TP$ and $TQ$ are tangent to the circle with centre $O$, at $P$ and $Q$. $\\angle PTQ = ${deg(t)}$. (a) Find $x = \\angle POQ$. (b) $OT$ cuts $\\angle PTQ$ in half. Find $y = \\angle POT$.`
        : `$TP$ and $TQ$ are tangent to the circle with centre $O$, at $P$ and $Q$. $\\angle POQ = ${deg(180 - t)}$. (a) Find $x = \\angle PTQ$. (b) $OT$ cuts $\\angle PTQ$ in half. Find $y = \\angle OTP$.`,
      figure: twoTangentFigure(r, ot, dir, giveT ? { atT: dl(t), atO: 'x' } : { atO: dl(180 - t), atT: 'x' }),
      parts: giveT
        ? [numPart(180 - t, { label: '(a) $x =$', suffix: '°' }), numPart(90 - t / 2, { label: '(b) $y =$', suffix: '°' })]
        : [numPart(t, { label: '(a) $x =$', suffix: '°' }), numPart(t / 2, { label: '(b) $y =$', suffix: '°' })],
      hints: ['Each tangent is perpendicular to its radius, so $\\angle OPT = \\angle OQT = 90^\\circ$.', 'The angles of quadrilateral $OPTQ$ add to $360^\\circ$. For (b), use $\\triangle OPT$.'],
      solution: giveT
        ? [
            '$\\angle OPT = \\angle OQT = 90^\\circ$ (tangent $\\perp$ radius).',
            `(a) In quadrilateral $OPTQ$: $x = 360^\\circ - 90^\\circ - 90^\\circ - ${deg(t)} = ${deg(180 - t)}$`,
            `(b) $\\angle PTO = ${deg(t)} \\div 2 = ${deg(t / 2)}$. In $\\triangle OPT$: $y = 180^\\circ - 90^\\circ - ${deg(t / 2)} = ${deg(90 - t / 2)}$`,
            `So $x = ${deg(180 - t)}$ and $y = ${deg(90 - t / 2)}$.`,
          ]
        : [
            '$\\angle OPT = \\angle OQT = 90^\\circ$ (tangent $\\perp$ radius).',
            `(a) In quadrilateral $OPTQ$: $x = 360^\\circ - 90^\\circ - 90^\\circ - ${deg(180 - t)} = ${deg(t)}$`,
            `(b) $y = ${deg(t)} \\div 2 = ${deg(t / 2)}$`,
            `So $x = ${deg(t)}$ and $y = ${deg(t / 2)}$.`,
          ],
      calculator: false,
    };
  }
  const [p, q, c] = rng.pick(TRIPLES.filter((tr) => tr[2] <= 41));
  const m = rng.pick([1, 2]);
  const swap = rng.chance(0.5);
  const r = (swap ? p : q) * m;
  const pt = (swap ? q : p) * m;
  const ot = c * m;
  if (kind === 1) {
    // Distance from T to the nearest point of the circle.
    const ctx = rng.pick([
      { intro: 'A circular pond has a radius of', from: 'a picnic table at $T$', line: 'A straight path from the table just touches the edge of the pond at $P$', u: 'm' },
      { intro: 'A round hay bale, seen from the end, has a radius of', from: 'a fence post at $T$', line: 'A rope from the post just touches the bale at $P$', u: 'dm' },
      { intro: 'A circular skating rink has a radius of', from: 'a light pole at $T$', line: 'A straight string of lights from the pole just touches the edge of the rink at $P$', u: 'm' },
    ]);
    const uu = ctx.u === 'dm' ? 'cm' : ctx.u;
    const sc = ctx.u === 'dm' ? 10 : 1;
    const R2 = r * sc;
    const PT2 = pt * sc;
    const OT2 = ot * sc;
    return {
      prompt: `${ctx.intro} $${ms(R2, uu)}$, with centre $O$. ${ctx.line}. The path from $T$ to $P$ is $${ms(PT2, uu)}$ long. How far is ${ctx.from} from the nearest point on the edge? (Find the distance along $OT$ from $T$ to the circle.)`,
      figure: tangentFigure(r, pt, dir, side, { OP: fl(R2, uu), PT: fl(PT2, uu) }),
      parts: [numPart(OT2 - R2, { label: 'Distance', suffix: uu })],
      hints: ['$TP$ is tangent at $P$, so $\\triangle OPT$ has a right angle at $P$. Find $OT$ with the Pythagorean theorem.', 'The nearest point of the circle lies on $OT$. Subtract the radius from $OT$.'],
      solution: [
        '$\\angle OPT = 90^\\circ$ (tangent $\\perp$ radius).',
        `$OT^2 = ${R2}^2 + ${PT2}^2 = ${R2 * R2} + ${PT2 * PT2} = ${OT2 * OT2}$, so $OT = ${OT2}$`,
        `The distance from $T$ to the circle is $OT - r = ${OT2} - ${R2} = ${OT2 - R2}$`,
        `It is $${ms(OT2 - R2, uu)}$ from the nearest point on the edge.`,
      ],
      calculator: true,
    };
  }
  // Perimeter of the kite OPTQ.
  return {
    prompt: `$TP$ and $TQ$ are tangent to a circle with centre $O$ and radius $${ms(r, u)}$. $OT = ${ms(ot, u)}$. Find the perimeter of the quadrilateral $OPTQ$.`,
    figure: twoTangentFigure(r, ot, dir, { OP: fl(r, u), OT: fl(ot, u) }),
    parts: [numPart(2 * r + 2 * pt, { label: 'Perimeter', suffix: u })],
    hints: ['$\\triangle OPT$ and $\\triangle OQT$ have right angles at $P$ and $Q$ (tangent $\\perp$ radius).', 'Find $TP$ and $TQ$ with the Pythagorean theorem. Then add all four sides.'],
    solution: [
      '$\\angle OPT = \\angle OQT = 90^\\circ$ because each tangent is perpendicular to its radius.',
      `$TP^2 = ${ot}^2 - ${r}^2 = ${ot * ot} - ${r * r} = ${pt * pt}$, so $TP = ${pt}$. In the same way, $TQ = ${pt}$.`,
      `Perimeter $= OP + PT + TQ + QO = ${r} + ${pt} + ${pt} + ${r} = ${2 * r + 2 * pt}$`,
      `The perimeter of $OPTQ$ is $${ms(2 * r + 2 * pt, u)}$.`,
    ],
    calculator: true,
  };
}

const tangentProperties = skill({
  id: 'm9-tangent-properties',
  name: 'Tangent properties',
  description: 'Use the fact that a tangent is perpendicular to the radius at the point of tangency to find angles, and lengths with the Pythagorean theorem.',
  outcomes: ['SS1'],
  lessonId: 'm9-8-3',
  calculator: true,
  gen: tangentGen,
});

export const CIRCLES_SKILLS: SkillDef[] = [chordProperties, inscribedAngles, tangentProperties];
