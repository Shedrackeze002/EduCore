/** Math 8 Unit 9 — Congruent Polygons (SS6): corresponding parts and congruence statements, and congruence under translations, rotations and reflections. */
import { fixedChoice, mc, multi, numPart, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Part, PlaneFigure, SkillDef, TableFigure } from '../../../types.ts';
import { Drawing, NAMES, cap, listWords, type Color, type P } from './solids.ts';

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------

const DEG = Math.PI / 180;
const area2 = (pts: P[]) => pts.reduce((s, p, i) => s + p[0] * pts[(i + 1) % pts.length][1] - pts[(i + 1) % pts.length][0] * p[1], 0);
const centroid = (pts: P[]): P => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const rotate = (p: P, deg: number): P => [p[0] * Math.cos(deg * DEG) - p[1] * Math.sin(deg * DEG), p[0] * Math.sin(deg * DEG) + p[1] * Math.cos(deg * DEG)];
const dirDeg = (v: P) => Math.atan2(v[1], v[0]) / DEG;

/** Interior angle (degrees) at vertex i. */
function angleAt(pts: P[], i: number): number {
  const v = pts[i];
  const a = pts[(i + pts.length - 1) % pts.length];
  const b = pts[(i + 1) % pts.length];
  const u1: P = [a[0] - v[0], a[1] - v[1]];
  const u2: P = [b[0] - v[0], b[1] - v[1]];
  return Math.acos((u1[0] * u2[0] + u1[1] * u2[1]) / (Math.hypot(...u1) * Math.hypot(...u2))) / DEG;
}

/** Direction (degrees) pointing out of a convex polygon at vertex i, or into it when `inward`. */
function bisector(pts: P[], i: number, inward = false): number {
  const v = pts[i];
  const a = pts[(i + pts.length - 1) % pts.length];
  const b = pts[(i + 1) % pts.length];
  const u1: P = [(a[0] - v[0]) / dist(a, v), (a[1] - v[1]) / dist(a, v)];
  const u2: P = [(b[0] - v[0]) / dist(b, v), (b[1] - v[1]) / dist(b, v)];
  const d = dirDeg([u1[0] + u2[0], u1[1] + u2[1]]);
  return inward ? d : d + 180;
}

/** Direction (degrees) of the outward normal of side i → i+1. */
function sideNormal(pts: P[], i: number): number {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const s = area2(pts) > 0 ? 1 : -1;
  return dirDeg([s * (b[1] - a[1]), -s * (b[0] - a[0])]);
}

/** Triangle with sides a = BC, b = CA, c = AB, with A at the origin and B on the x-axis. */
function triFromSides(a: number, b: number, c: number): P[] {
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const A = Math.acos(cosA);
  return [
    [0, 0],
    [c, 0],
    [b * Math.cos(A), b * Math.sin(A)],
  ];
}

/** Whole-degree angles that add to exactly (k − 2) × 180. */
function roundAngles(pts: P[]): number[] {
  const raw = pts.map((_, i) => angleAt(pts, i));
  const ang = raw.map(Math.round);
  const target = (pts.length - 2) * 180;
  let diff = target - ang.reduce((s, x) => s + x, 0);
  while (diff !== 0) {
    // Nudge the angle whose rounding was furthest off.
    const order = raw.map((r, i) => [r - ang[i], i]).sort((x, y) => (diff > 0 ? y[0] - x[0] : x[0] - y[0]));
    ang[order[0][1]] += Math.sign(diff);
    raw[order[0][1]] = ang[order[0][1]];
    diff -= Math.sign(diff);
  }
  return ang;
}

// ---------------------------------------------------------------------------
// Names and congruence statements
// ---------------------------------------------------------------------------

const TRI_SETS = ['ABC', 'DEF', 'GHJ', 'KLM', 'PQR', 'STU', 'XYZ'];
const QUAD_SETS = ['ABCD', 'EFGH', 'JKLM', 'PQRS', 'TUVW'];

/** The letters of `set` read around the polygon from another start or the other way: a cyclic shift, perhaps reversed. */
function dihedral(set: string, shift: number, reverse: boolean): string {
  const s = reverse ? [...set].reverse().join('') : set;
  return s.slice(shift) + s.slice(0, shift);
}

/** Two letter sets: the first polygon's names, and the second polygon's names listed to match (T[i] matches S[i]). */
function namePair(rng: Rng, k: number, scramble: boolean, first?: string): { S: string; S2: string; T: string } {
  const sets = (k === 3 ? TRI_SETS : QUAD_SETS).filter((x) => x !== first);
  const [S, S2] = first ? [first, rng.pick(sets)] : rng.sample(sets, 2);
  if (!scramble) return { S, S2, T: S2 };
  for (;;) {
    const T = dihedral(S2, rng.int(0, k - 1), rng.chance(0.5));
    if (T !== S2) return { S, S2, T };
  }
}

const POLY_WORD = (k: number) => (k === 3 ? 'triangle' : 'quadrilateral');
const POLY_SYM = (k: number) => (k === 3 ? '\\triangle ' : '');
/** "$\triangle ABC \cong \triangle PQR$" or "quadrilateral $ABCD \cong$ quadrilateral $PQRS$". */
function statement(S: string, T: string): string {
  return S.length === 3 ? `$\\triangle ${S} \\cong \\triangle ${T}$` : `quadrilateral $${S} \\cong$ quadrilateral $${T}$`;
}
const sideOf = (S: string, i: number) => S[i] + S[(i + 1) % S.length];
const seg = (s: string) => `$\\overline{${s}}$`;
const ang = (v: string) => `$\\angle ${v}$`;
const pairs = (S: string, T: string) => [...S].map((c, i) => `${c} \\leftrightarrow ${T[i]}`).join(',\\ ');

// ---------------------------------------------------------------------------
// Drawings of two congruent polygons (not to scale)
// ---------------------------------------------------------------------------

interface Marks {
  sides?: Array<string | null>;
  angles?: Array<string | null>;
}

function addPolygon(dr: Drawing, pts: P[], names: string, color: Color, marks: Marks = {}) {
  dr.poly(pts, color, false);
  pts.forEach((p, i) => dr.label(names[i], p, bisector(pts, i), 5));
  marks.sides?.forEach((t, i) => {
    if (!t) return;
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    dr.label(t, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], sideNormal(pts, i), 3);
  });
  marks.angles?.forEach((t, i) => {
    if (!t) return;
    dr.angleLabel(t, pts[i], bisector(pts, i, true), 8);
  });
}

/**
 * The first polygon and a turned (and perhaps flipped) copy to its right. The copy's vertex i is the
 * image of vertex i of the first polygon.
 */
function placePair(rng: Rng, pts: P[], flip: boolean): { p1: P[]; p2: P[] } {
  const c = centroid(pts);
  const size = Math.max(...pts.map((p) => dist(p, c)));
  const k = 2.6 / size;
  const p1 = pts.map(([x, y]) => [(x - c[0]) * k, (y - c[1]) * k] as P);
  const turn = rng.pick([45, 60, 75, 90, 105, 120, 135, 150, 180, 210, 240, 270, 300]);
  let p2 = p1.map((p) => rotate(flip ? [-p[0], p[1]] : p, turn));
  const x1 = Math.max(...p1.map((p) => p[0]));
  const x2 = Math.min(...p2.map((p) => p[0]));
  p2 = p2.map(([x, y]) => [x + x1 - x2 + 2.4, y] as P);
  return { p1, p2 };
}

function pairFigure(p1: P[], p2: P[], n1: string, n2: string, m1: Marks = {}, m2: Marks = {}): PlaneFigure {
  const dr = new Drawing();
  addPolygon(dr, p1, n1, 'brand', m1);
  addPolygon(dr, p2, n2, 'accent', m2);
  return { ...dr.build({ caption: 'Not drawn to scale' }), notToScale: true };
}

/** A scalene triangle with whole-number sides that are not too close in length, and whole-degree angles. */
function niceTriangle(rng: Rng): { pts: P[]; sides: number[]; angles: number[] } {
  for (;;) {
    const a = rng.int(5, 15);
    const b = rng.int(5, 15);
    const c = rng.int(5, 15);
    if (a + b <= c + 2 || a + c <= b + 2 || b + c <= a + 2) continue;
    if (Math.min(Math.abs(a - b), Math.abs(b - c), Math.abs(a - c)) < 2) continue;
    const pts = triFromSides(a, b, c);
    const angles = roundAngles(pts);
    if (Math.min(...angles) < 35 || Math.max(...angles) > 110 || new Set(angles).size < 3 || Math.min(Math.abs(angles[0] - angles[1]), Math.abs(angles[1] - angles[2]), Math.abs(angles[0] - angles[2])) < 6) continue;
    // sides[i] is side i → i+1: AB, BC, CA
    return { pts, sides: [c, a, b], angles };
  }
}

/** A convex quadrilateral with no two sides or angles alike, with lengths in whole units. */
function niceQuad(rng: Rng): { pts: P[]; sides: number[]; angles: number[] } {
  for (;;) {
    const r = () => rng.int(3, 7);
    const pts: P[] = [0, 1, 2, 3].map((i) => {
      const a = (i * 90 + rng.int(-25, 25)) * DEG;
      const rad = r();
      return [rad * Math.cos(a), rad * Math.sin(a)] as P;
    });
    if (area2(pts) <= 0) continue;
    const angles = roundAngles(pts);
    if (Math.max(...angles) > 150 || Math.min(...angles) < 45) continue;
    const sides = pts.map((p, i) => Math.round(dist(p, pts[(i + 1) % 4])));
    if (new Set(sides).size < 4 || new Set(angles).size < 4) continue;
    if (Math.min(...sides) < 3) continue;
    return { pts, sides, angles };
  }
}

const cm = (x: number) => `${fmt(x)} cm`;
const dg = (x: number) => `${fmt(x)}°`;

// ---------------------------------------------------------------------------
// Lesson 9.1 — Congruent polygons
// ---------------------------------------------------------------------------

const CONG_CTX = [
  (w: string) => `${w} cut two matching tiles for a mosaic.`,
  () => 'Two panels of a quilt block are congruent.',
  (w: string) => `${w} traced a shape for a stained-glass window and cut out a copy.`,
  () => 'Two congruent pieces of a jigsaw-style floor mat are shown.',
  (w: string) => `${w} designed two matching gussets for a roof truss.`,
  () => 'Two congruent sails are cut for model sailboats.',
];

const CHOICE_YES = 'Yes. All pairs of corresponding sides and all pairs of corresponding angles are equal.';
const CHOICE_ANG = 'No. The corresponding angles are equal, but the corresponding sides are not.';
const CHOICE_SIDE = 'No. The corresponding sides are equal, but the corresponding angles are not.';
const CHOICE_SOME = 'No. Only some of the corresponding sides are equal, and the angles do not all match.';

const congruentPolygons = skill({
  id: 'm8-congruent-polygons',
  name: 'Congruent polygons',
  description: 'Decide whether two polygons are congruent by comparing all corresponding sides and angles, name corresponding parts from a congruence statement, and find missing measures.',
  outcomes: ['SS6'],
  lessonId: 'm8-9-1',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const ctx = rng.pick(CONG_CTX)(who);
    const k = rng.chance(0.5) ? 3 : 4;
    const shape = k === 3 ? niceTriangle(rng) : niceQuad(rng);

    if (d === 1 && rng.chance(0.55)) {
      // Name the matching part from the statement.
      const { S, T } = namePair(rng, k, true);
      const { p1, p2 } = placePair(rng, shape.pts, rng.chance(0.4));
      const what = rng.pick(['side', 'angle', 'vertex'] as const);
      const i = rng.int(0, k - 1);
      let answer: AnswerSpec;
      let asked: string;
      let reason: string;
      let correct: string;
      if (what === 'side') {
        asked = seg(sideOf(S, i));
        correct = seg(sideOf(T, i));
        answer = mc(rng, correct, rng.shuffle([...Array(k).keys()].filter((j) => j !== i)).map((j) => seg(sideOf(T, j))));
        reason = `Side $${sideOf(S, i)}$ joins $${S[i]}$ and $${S[(i + 1) % k]}$. They match $${T[i]}$ and $${T[(i + 1) % k]}$, so the matching side is $${sideOf(T, i)}$.`;
      } else if (what === 'angle') {
        asked = ang(S[i]);
        correct = ang(T[i]);
        answer = mc(rng, correct, rng.shuffle([...Array(k).keys()].filter((j) => j !== i)).map((j) => ang(T[j])));
        reason = `$${S[i]}$ is letter ${i + 1} of $${S}$, and letter ${i + 1} of $${T}$ is $${T[i]}$. So $\\angle ${S[i]}$ matches $\\angle ${T[i]}$.`;
      } else {
        asked = `vertex $${S[i]}$`;
        correct = `Vertex $${T[i]}$`;
        answer = mc(rng, correct, rng.shuffle([...Array(k).keys()].filter((j) => j !== i)).map((j) => `Vertex $${T[j]}$`));
        reason = `$${S[i]}$ is letter ${i + 1} of $${S}$, and letter ${i + 1} of $${T}$ is $${T[i]}$.`;
      }
      return {
        prompt: `${ctx} ${cap(statement(S, T))}. Which ${what} of $${POLY_SYM(k)}${T}$ corresponds to ${asked}?`,
        figure: pairFigure(p1, p2, S, T),
        parts: [{ answer }],
        hints: ['In a congruence statement, the vertices are listed in matching order: the first matches the first, the second matches the second, and so on.', 'Do not go by where the letters sit in the picture: the second shape may be turned or flipped. Use the order in the statement.'],
        solution: [`Match the letters in order: $${pairs(S, T)}$.`, reason, `The answer is ${correct.replace(/^Vertex/, 'vertex')}.`],
        answerDisplay: correct,
      };
    }

    if (d === 1 || (d === 2 && rng.chance(0.5))) {
      // Missing measure: copy it from the matching part.
      const { S, T } = namePair(rng, k, d === 2);
      const { p1, p2 } = placePair(rng, shape.pts, rng.chance(0.4));
      const askSide = rng.chance(0.55);
      const i = rng.int(0, k - 1);
      const m1: Marks = askSide ? { sides: shape.sides.map(cm) } : { angles: shape.angles.map(dg) };
      const m2: Marks = askSide ? { sides: shape.sides.map((_, j) => (j === i ? '?' : null)) } : { angles: shape.angles.map((_, j) => (j === i ? '?' : null)) };
      const value = askSide ? shape.sides[i] : shape.angles[i];
      const target = askSide ? sideOf(T, i) : T[i];
      return {
        prompt: `${ctx} ${cap(statement(S, T))}. The ${askSide ? 'side lengths' : 'angle measures'} of $${POLY_SYM(k)}${S}$ are shown. What is ${askSide ? `the length of $${target}$` : `the measure of $\\angle ${target}$`}?`,
        figure: pairFigure(p1, p2, S, T, m1, m2),
        parts: [numPart(value, askSide ? { suffix: 'cm' } : { suffix: '°' })],
        hints: ['Corresponding parts of congruent polygons are equal.', `Use the statement to find the part of $${S}$ that matches ${askSide ? `$${target}$` : `$\\angle ${target}$`}.`],
        solution: [
          `Match the letters in order: $${pairs(S, T)}$.`,
          askSide ? `$${target}$ matches $${sideOf(S, i)}$.` : `$\\angle ${target}$ matches $\\angle ${S[i]}$.`,
          askSide ? `$${target} = ${sideOf(S, i)} = ${value}\\ \\text{cm}$` : `$\\angle ${target} = \\angle ${S[i]} = ${value}^\\circ$`,
        ],
      };
    }

    if (d === 2) {
      // Are the two polygons congruent? Compare a table of measures.
      const { S, S2 } = namePair(rng, k, false);
      let case_ = rng.pick(k === 3 ? (['yes', 'ang', 'some'] as const) : (['yes', 'ang', 'side', 'some'] as const));
      let sides1 = [...shape.sides];
      let ang1 = [...shape.angles];
      let sides2 = [...sides1];
      let ang2 = [...ang1];
      if (case_ === 'side' || (k === 4 && rng.chance(0.3))) {
        // A parallelogram and a flexed copy: same sides, different angles.
        const a = rng.int(4, 9);
        const b = rng.intExcept(4, 9, [a]);
        const al = rng.pick([60, 70, 75, 80, 90]);
        const al2 = rng.intExcept(55, 95, [al, 180 - al]);
        sides1 = [a, b, a, b];
        ang1 = [al, 180 - al, al, 180 - al];
        sides2 = [...sides1];
        ang2 = case_ === 'side' ? [al2, 180 - al2, al2, 180 - al2] : [...ang1];
        if (case_ === 'ang') sides2 = sides1.map((x) => x * 2);
        if (case_ === 'some') {
          sides2 = [a, b + 1, a, b + 1];
          ang2 = [al2, 180 - al2, al2, 180 - al2];
        }
        if (case_ === 'yes') {
          sides2 = [...sides1];
          ang2 = [...ang1];
        }
      } else if (case_ === 'ang') {
        const f = rng.pick([1.5, 2, 3]);
        sides2 = sides1.map((x) => x * f);
      } else if (case_ === 'some') {
        if (k === 3) {
          const j = rng.int(0, 2);
          const s = [...shape.sides];
          s[j] += rng.pick([-2, -1, 1, 2]);
          const [c, a, b] = s;
          if (a + b <= c || a + c <= b || b + c <= a) case_ = 'yes';
          else {
            sides2 = s;
            ang2 = roundAngles(triFromSides(a, b, c));
            if (ang2.every((x, i) => x === ang1[i])) case_ = 'yes';
          }
          if (case_ === 'yes') {
            sides2 = [...sides1];
            ang2 = [...ang1];
          }
        } else {
          const j = rng.int(0, 3);
          sides2[j] += rng.pick([-1, 1, 2]);
          const t = rng.int(0, 3);
          ang2[t] += 6;
          ang2[(t + 1) % 4] -= 6;
        }
      }
      const rows = [
        ...sides1.map((x, i) => [`${sideOf(S, i)} = ${cm(x)}`, `${sideOf(S2, i)} = ${cm(sides2[i])}`]),
        ...ang1.map((x, i) => [`∠${S[i]} = ${dg(x)}`, `∠${S2[i]} = ${dg(ang2[i])}`]),
      ];
      const table: TableFigure = { type: 'table', headers: [`${cap(POLY_WORD(k))} ${S}`, `${cap(POLY_WORD(k))} ${S2}`], rows };
      const sidesEq = sides1.every((x, i) => x === sides2[i]);
      const angEq = ang1.every((x, i) => x === ang2[i]);
      const idx = sidesEq && angEq ? 0 : angEq ? 1 : sidesEq ? 2 : 3;
      const diffSides = sides1.map((x, i) => (x !== sides2[i] ? `$${sideOf(S, i)} = ${fmt(x)}$ but $${sideOf(S2, i)} = ${fmt(sides2[i])}$` : '')).filter(Boolean);
      const diffAng = ang1.map((x, i) => (x !== ang2[i] ? `$\\angle ${S[i]} = ${x}^\\circ$ but $\\angle ${S2[i]} = ${ang2[i]}^\\circ$` : '')).filter(Boolean);
      return {
        prompt: `${ctx} The table lists the measures of ${POLY_WORD(k)} $${S}$ and ${POLY_WORD(k)} $${S2}$, with matching parts side by side. Are the two ${POLY_WORD(k)}s congruent?`,
        figure: table,
        parts: [{ answer: fixedChoice([CHOICE_YES, CHOICE_ANG, CHOICE_SIDE, CHOICE_SOME], idx) }],
        hints: ['Congruent polygons have **all** corresponding sides equal **and** all corresponding angles equal.', 'Check the sides first, then the angles. Equal angles alone, or equal sides alone, are not enough.'],
        solution: [
          sidesEq ? 'Sides: every pair of corresponding sides is equal.' : `Sides: ${diffSides.length === sides1.length ? 'no pair of corresponding sides is equal' : 'not every pair is equal'} (${diffSides.slice(0, 2).join('; ')}${diffSides.length > 2 ? '; …' : ''}).`,
          angEq ? 'Angles: every pair of corresponding angles is equal.' : `Angles: not every pair is equal (${diffAng.slice(0, 2).join('; ')}${diffAng.length > 2 ? '; …' : ''}).`,
          idx === 0 ? `All corresponding parts are equal, so the ${POLY_WORD(k)}s are congruent.` : `The ${POLY_WORD(k)}s are **not** congruent.`,
        ],
        answerDisplay: [CHOICE_YES, CHOICE_ANG, CHOICE_SIDE, CHOICE_SOME][idx],
      };
    }

    // d === 3
    const mode = rng.pick(['angleSum', 'perimeter', 'which'] as const);
    if (mode === 'which') {
      const tri = niceTriangle(rng);
      const { S, S2, T } = namePair(rng, 3, true);
      const { p1, p2 } = placePair(rng, tri.pts, rng.chance(0.5));
      const correct = `$\\triangle ${S} \\cong \\triangle ${T}$`;
      const wrong = [S2, dihedral(T, 1, false), dihedral(T, 0, true), dihedral(T, 2, false), dihedral(T, 1, true)]
        .filter((x) => x !== T)
        .map((x) => `$\\triangle ${S} \\cong \\triangle ${x}$`);
      return {
        prompt: `${ctx} The two triangles are congruent. Use the angle measures to decide which congruence statement is correct.`,
        figure: pairFigure(p1, p2, S, T, { angles: tri.angles.map(dg) }, { angles: tri.angles.map(dg) }),
        parts: [{ answer: mc(rng, correct, rng.shuffle(wrong)) }],
        hints: ['Match each angle of the first triangle with the angle of the same size in the second triangle.', 'Write the second triangle\'s vertices in the same order as the matching vertices of the first.'],
        solution: [
          ...[...S].map((c, i) => `$\\angle ${c} = ${tri.angles[i]}^\\circ$ matches $\\angle ${T[i]} = ${tri.angles[i]}^\\circ$, so $${c} \\leftrightarrow ${T[i]}$.`),
          `In matching order: ${correct}.`,
        ],
        answerDisplay: correct,
      };
    }
    const { S, T } = namePair(rng, k, true);
    const { p1, p2 } = placePair(rng, shape.pts, rng.chance(0.4));
    if (mode === 'angleSum') {
      // Two angles known (one on each polygon); find the angle that matches the last one.
      const total = (k - 2) * 180;
      const ask = rng.int(0, k - 1);
      const known = [...Array(k).keys()].filter((j) => j !== ask);
      const onSecond = rng.sample(known, Math.min(known.length - 1, rng.int(1, 2)));
      const m1: Marks = { angles: shape.angles.map((x, j) => (known.includes(j) && !onSecond.includes(j) ? dg(x) : null)) };
      const m2: Marks = { angles: shape.angles.map((x, j) => (onSecond.includes(j) ? dg(x) : j === ask ? '?' : null)) };
      const value = shape.angles[ask];
      const facts = known.map((j) => (onSecond.includes(j) ? `$\\angle ${S[j]} = \\angle ${T[j]} = ${shape.angles[j]}^\\circ$` : `$\\angle ${S[j]} = ${shape.angles[j]}^\\circ$`));
      return {
        prompt: `${ctx} ${cap(statement(S, T))}. Some angle measures are marked on the two ${POLY_WORD(k)}s. What is the measure of $\\angle ${T[ask]}$?`,
        figure: pairFigure(p1, p2, S, T, m1, m2),
        parts: [numPart(value, { suffix: '°' })],
        hints: [`Use the statement to move every known angle onto $${POLY_SYM(k)}${S}$.`, `The angles of a ${POLY_WORD(k)} add to $${total}^\\circ$.`],
        solution: [
          `Match the letters in order: $${pairs(S, T)}$.`,
          `In $${POLY_SYM(k)}${S}$: ${facts.join(', ')}.`,
          `$\\angle ${S[ask]} = ${total}^\\circ - ${known.map((j) => `${shape.angles[j]}^\\circ`).join(' - ')} = ${value}^\\circ$`,
          `$\\angle ${T[ask]}$ matches $\\angle ${S[ask]}$, so $\\angle ${T[ask]} = ${value}^\\circ$.`,
        ],
      };
    }
    // Perimeter from sides marked on both polygons.
    const onSecond = rng.sample([...Array(k).keys()], k === 3 ? 1 : 2);
    const m1: Marks = { sides: shape.sides.map((x, j) => (onSecond.includes(j) ? null : cm(x))) };
    const m2: Marks = { sides: shape.sides.map((x, j) => (onSecond.includes(j) ? cm(x) : null)) };
    const P_ = shape.sides.reduce((s, x) => s + x, 0);
    const askFirst = rng.chance(0.5);
    return {
      prompt: `${ctx} ${cap(statement(S, T))}. Some side lengths are marked on each ${POLY_WORD(k)}. What is the perimeter of $${POLY_SYM(k)}${askFirst ? S : T}$?`,
      figure: pairFigure(p1, p2, S, T, m1, m2),
      parts: [numPart(P_, { suffix: 'cm' })],
      hints: ['Corresponding sides of congruent polygons are equal, so the two polygons have the same perimeter.', 'Use the statement to find which marked side on one polygon matches each unmarked side on the other.'],
      solution: [
        `Match the letters in order: $${pairs(S, T)}$.`,
        ...onSecond.map((j) => `$${sideOf(S, j)}$ matches $${sideOf(T, j)}$, so $${sideOf(S, j)} = ${shape.sides[j]}\\ \\text{cm}$.`),
        `Perimeter of $${S}$: $${shape.sides.join(' + ')} = ${P_}\\ \\text{cm}$`,
        `The polygons are congruent, so each has a perimeter of $${P_}\\ \\text{cm}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 9.2 — Congruence and transformations (on a grid)
// ---------------------------------------------------------------------------

type Iso = { kind: 'translation'; dx: number; dy: number } | { kind: 'reflection'; vertical: boolean; m: number } | { kind: 'rotation'; cx: number; cy: number; q: 1 | 2 | 3 };

function applyIso(pts: P[], t: Iso): P[] {
  if (t.kind === 'translation') return pts.map(([x, y]) => [x + t.dx, y + t.dy] as P);
  if (t.kind === 'reflection') return pts.map(([x, y]) => (t.vertical ? [2 * t.m - x, y] : [x, 2 * t.m - y]) as P);
  return pts.map(([x, y]) => {
    let [u, v] = [x - t.cx, y - t.cy];
    for (let i = 0; i < t.q; i++) [u, v] = [-v, u];
    return [u + t.cx, v + t.cy] as P;
  });
}

/** Lengths and corner shapes going around a lattice polygon (exact integers). */
function invariants(pts: P[]): string[] {
  const k = pts.length;
  return pts.map((v, i) => {
    const a = pts[(i + k - 1) % k];
    const b = pts[(i + 1) % k];
    const u1 = [a[0] - v[0], a[1] - v[1]];
    const u2 = [b[0] - v[0], b[1] - v[1]];
    return `${u2[0] ** 2 + u2[1] ** 2}|${u1[0] * u2[0] + u1[1] * u2[1]}|${Math.abs(u1[0] * u2[1] - u1[1] * u2[0])}`;
  });
}

function sameCyclic(a: string[], b: string[]): boolean {
  for (let s = 0; s < a.length; s++) if (a.every((x, i) => x === b[(i + s) % b.length])) return true;
  return false;
}

/** Lattice polygons are congruent when their side-and-corner sequences match, read either way round. */
function congruent(p: P[], q: P[]): boolean {
  if (p.length !== q.length) return false;
  return sameCyclic(invariants(p), invariants(q)) || sameCyclic(invariants(p), invariants([...q].reverse()));
}

/** No turn or flip maps the shape onto itself. */
function asymmetric(pts: P[]): boolean {
  const inv = invariants(pts);
  const k = pts.length;
  for (let s = 1; s < k; s++) if (inv.every((x, i) => x === inv[(i + s) % k])) return false;
  return !sameCyclic(inv, invariants([...pts].reverse()));
}

function convex(pts: P[]): boolean {
  const k = pts.length;
  for (let i = 0; i < k; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % k];
    const c = pts[(i + 2) % k];
    if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) <= 0) return false;
  }
  return true;
}

/** A small convex lattice polygon (counterclockwise) with no symmetry. */
function latticeShape(rng: Rng, k: number, box = 4): P[] {
  for (;;) {
    const pts: P[] = [];
    for (let i = 0; i < k; i++) pts.push([rng.int(0, box), rng.int(0, box)]);
    const c = centroid(pts);
    pts.sort((p, q) => Math.atan2(p[1] - c[1], p[0] - c[0]) - Math.atan2(q[1] - c[1], q[0] - c[0]));
    if (!convex(pts) || !asymmetric(pts)) continue;
    const A = area2(pts) / 2;
    if (A < (k === 3 ? 3 : 5)) continue;
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    if (Math.max(...xs) - Math.min(...xs) < 2 || Math.max(...ys) - Math.min(...ys) < 2) continue;
    const mx = Math.min(...xs);
    const my = Math.min(...ys);
    return pts.map(([x, y]) => [x - mx, y - my] as P);
  }
}

const bbox = (pts: P[]) => ({ x0: Math.min(...pts.map((p) => p[0])), x1: Math.max(...pts.map((p) => p[0])), y0: Math.min(...pts.map((p) => p[1])), y1: Math.max(...pts.map((p) => p[1])) });
const inside = (pts: P[], W: number, H: number) => pts.every(([x, y]) => x >= 1 && x <= W - 1 && y >= 1 && y <= H - 1);
function apart(p: P[], q: P[], gap = 1): boolean {
  const a = bbox(p);
  const b = bbox(q);
  return a.x1 + gap <= b.x0 || b.x1 + gap <= a.x0 || a.y1 + gap <= b.y0 || b.y1 + gap <= a.y0;
}

const GW = 16;
const GH = 11;

/** A shape and its image under a random translation, reflection or rotation, both on the grid and apart. */
function shapeAndImage(rng: Rng, k: number, kind: Iso['kind']): { pts: P[]; img: P[]; t: Iso } {
  for (;;) {
    const base = latticeShape(rng, k);
    const ox = rng.int(1, 5);
    const oy = rng.int(1, 5);
    const pts = base.map(([x, y]) => [x + ox, y + oy] as P);
    const b = bbox(pts);
    let t: Iso;
    if (kind === 'translation') t = { kind, dx: rng.int(4, 9), dy: rng.int(-4, 4) };
    else if (kind === 'reflection') {
      const vertical = rng.chance(0.65);
      t = vertical ? { kind, vertical, m: b.x1 + rng.int(1, 2) } : { kind, vertical, m: rng.chance(0.5) ? b.y1 + 1 : b.y0 - 1 };
    } else t = { kind, cx: b.x1 + rng.int(1, 2), cy: rng.int(b.y0, b.y1), q: rng.pick([1, 2, 3] as const) };
    const img = applyIso(pts, t);
    if (!inside(pts, GW, GH) || !inside(img, GW, GH) || !apart(pts, img, 2)) continue;
    return { pts, img, t };
  }
}

function gridPair(pts: P[], img: P[], n1: string[], n2: string[]): PlaneFigure {
  const dr = new Drawing();
  dr.poly(pts, 'brand', true);
  dr.poly(img, 'accent', true);
  pts.forEach((p, i) => dr.label(n1[i], p, bisector(pts, i), 4));
  img.forEach((p, i) => dr.label(n2[i], p, bisector(img, i), 4));
  return dr.buildGrid(0, GW, 0, GH);
}

const KIND_NAMES = ['Translation (slide)', 'Reflection (flip)', 'Rotation (turn)'];
const KINDS: Array<Iso['kind']> = ['translation', 'reflection', 'rotation'];
const primes = (S: string) => [...S].map((c) => `${c}′`);
const orientation = (pts: P[]) => (area2(pts) > 0 ? 'counterclockwise' : 'clockwise');

function isoDetail(t: Iso, pts: P[], img: P[], a: string, a2: string): string[] {
  if (t.kind === 'translation') {
    const ud = (v: number, pos: string, neg: string) => `${Math.abs(v)} unit${Math.abs(v) === 1 ? '' : 's'} ${v > 0 ? pos : neg}`;
    const move = [t.dx ? ud(t.dx, 'right', 'left') : '', t.dy ? ud(t.dy, 'up', 'down') : ''].filter(Boolean).join(' and ');
    return [`Every vertex moves the same way: ${a} to ${a2} is ${move}.`, 'The shape is not turned or flipped, so this is a **translation**.'];
  }
  if (t.kind === 'reflection')
    return [
      `Read the vertices in order. They go ${orientation(pts)} in the original and ${orientation(img)} in the image, so the image is flipped.`,
      `The shapes are mirror images across a ${t.vertical ? 'vertical' : 'horizontal'} line, so this is a **reflection**.`,
    ];
  return [
    `Read the vertices in order. They go ${orientation(pts)} in both shapes, so the image is not flipped.`,
    `The image is turned ${t.q === 2 ? 'a half turn' : `a quarter turn ${t.q === 1 ? 'counterclockwise' : 'clockwise'}`} and does not face the same way, so this is a **rotation**.`,
  ];
}

const TRANS_HINTS = [
  'A translation slides a shape: it faces the same way. A reflection flips it, like a mirror image. A rotation turns it.',
  'Trace the vertices in order (A, B, C, …) on both shapes. If one goes clockwise and the other counterclockwise, the shape was flipped.',
];

/** Place k shapes in slots of a grid (3 across, 2 down), shape 0 in the first slot. */
function slotFigure(shapes: P[][], names: string[]): PlaneFigure {
  const dr = new Drawing();
  shapes.forEach((s, i) => {
    dr.poly(s, i === 0 ? 'accent' : 'brand', false);
    const c = centroid(s);
    dr.centre(names[i], c);
  });
  return dr.buildGrid(0, 18, 0, 12);
}

/** Random turn/flip of a lattice shape, moved into the slot (sx, sy) of a 6 × 6 cell. */
function intoSlot(rng: Rng, pts: P[], slot: number, iso = true): P[] {
  let s = pts;
  if (iso) {
    const q = rng.int(0, 3);
    for (let i = 0; i < q; i++) s = s.map(([x, y]) => [-y, x] as P);
    if (rng.chance(0.5)) s = s.map(([x, y]) => [-x, y] as P);
  }
  const b = bbox(s);
  const sx = (slot % 3) * 6;
  const sy = slot < 3 ? 6 : 0;
  const ox = sx + 1 + Math.floor((4 - (b.x1 - b.x0)) / 2) - b.x0;
  const oy = sy + 1 + Math.floor((4 - (b.y1 - b.y0)) / 2) - b.y0;
  return s.map(([x, y]) => [x + ox, y + oy] as P);
}

/** The shape with one vertex moved by one unit, still convex and not congruent to it. */
function nearMiss(rng: Rng, pts: P[]): P[] {
  for (;;) {
    const i = rng.int(0, pts.length - 1);
    const [dx, dy] = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    const q = pts.map((p, j) => (j === i ? ([p[0] + dx, p[1] + dy] as P) : p));
    const b = bbox(q);
    if (b.x1 - b.x0 > 4 || b.y1 - b.y0 > 4) continue;
    if (!convex(q) || congruent(q, pts)) continue;
    return q;
  }
}

const congruenceTransformations = skill({
  id: 'm8-congruence-transformations',
  name: 'Congruence and transformations',
  description: 'Recognize that translations, rotations and reflections give congruent images, identify the transformation on a grid, pick out congruent polygons, and write congruence statements in matching order.',
  outcomes: ['SS6'],
  lessonId: 'm8-9-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const k = rng.chance(0.5) ? 3 : 4;
    const S = k === 3 ? 'ABC' : 'ABCD';
    const word = POLY_WORD(k);

    if (d === 1) {
      const kind = rng.pick(KINDS);
      const { pts, img, t } = shapeAndImage(rng, k, kind);
      if (rng.chance(0.3)) {
        // Measures stay the same.
        const i = rng.int(0, k - 1);
        const L = rng.int(25, 90) / 10;
        const A = rng.int(35, 130);
        const j = rng.int(0, k - 1);
        const verb = { translation: 'translated (slid)', reflection: 'reflected (flipped)', rotation: 'rotated (turned)' }[kind];
        return {
          prompt: `${who} ${verb} ${word} $${S}$ to make the image $${primes(S).join('')}$. In ${word} $${S}$, $${sideOf(S, i)} = ${fmt(L)}\\ \\text{cm}$ and $\\angle ${S[j]} = ${A}^\\circ$. What are the length of $${S[i]}'${S[(i + 1) % k]}'$ and the measure of $\\angle ${S[j]}'$?`,
          figure: gridPair(pts, img, [...S], primes(S)),
          parts: [numPart(L, { label: `$${S[i]}'${S[(i + 1) % k]}' =$`, suffix: 'cm' }), numPart(A, { label: `$\\angle ${S[j]}' =$`, suffix: '°' })],
          hints: ['Translations, rotations and reflections move a shape without stretching or shrinking it.', 'The image is congruent to the original, so each part of the image equals the matching part of the original.'],
          solution: [`A ${kind} does not change the size or shape, so $${primes(S).join('')}$ is congruent to $${S}$.`, `$${S[i]}'${S[(i + 1) % k]}' = ${sideOf(S, i)} = ${fmt(L)}\\ \\text{cm}$`, `$\\angle ${S[j]}' = \\angle ${S[j]} = ${A}^\\circ$`],
        };
      }
      const idx = KINDS.indexOf(kind);
      return {
        prompt: `${cap(word)} $${S}$ was moved to make the congruent ${word} $${primes(S).join('')}$. Which transformation was used?`,
        figure: gridPair(pts, img, [...S], primes(S)),
        parts: [{ answer: fixedChoice(KIND_NAMES, idx) }],
        hints: TRANS_HINTS,
        solution: [...isoDetail(t, pts, img, `$${S[0]}$`, `$${S[0]}'$`), `The answer is ${KIND_NAMES[idx].toLowerCase()}.`],
        answerDisplay: KIND_NAMES[idx],
      };
    }

    if (d === 2 && rng.chance(0.5)) {
      // Which shape is congruent to shape A?
      const base = latticeShape(rng, k);
      const shapes: P[][] = [intoSlot(rng, base, 0, false)];
      const slots = rng.shuffle([1, 2, 3, 4]);
      const names = ['A', 'B', 'C', 'D', 'E'];
      const goodSlot = slots[0];
      const all: P[][] = [];
      for (let s = 1; s <= 4; s++) all[s] = s === goodSlot ? intoSlot(rng, base, s) : intoSlot(rng, nearMiss(rng, base), s);
      for (let s = 1; s <= 4; s++) shapes.push(all[s]);
      const correct = `Shape ${names[goodSlot]}`;
      return {
        prompt: `${who} is sorting tiles for a ${rng.pick(['mosaic', 'floor pattern', 'quilt', 'puzzle'])}. Which shape is congruent to shape A?`,
        figure: slotFigure(shapes, names),
        parts: [{ answer: fixedChoice(['Shape B', 'Shape C', 'Shape D', 'Shape E'], goodSlot - 1) }],
        hints: ['A congruent shape can be turned or flipped, but every side and every angle must match.', 'Count grid squares along each side, and compare the corners, one shape at a time.'],
        solution: [
          'Turn or flip each shape in your mind to line it up with shape A, then compare the sides and the corners.',
          `The other shapes look close, but one vertex is a square away from where it would need to be, so a side or an angle does not match.`,
          `${correct} matches shape A after a turn or a flip, so it is congruent to shape A.`,
        ],
        answerDisplay: correct,
      };
    }

    if (d === 3 && rng.chance(0.5)) {
      // Select all shapes congruent to A.
      const base = latticeShape(rng, k);
      const nGood = rng.int(1, 3);
      const goodSlots = rng.sample([1, 2, 3, 4], nGood);
      const shapes: P[][] = [intoSlot(rng, base, 0, false)];
      for (let s = 1; s <= 4; s++) shapes.push(goodSlots.includes(s) ? intoSlot(rng, base, s) : intoSlot(rng, nearMiss(rng, base), s));
      const names = ['A', 'B', 'C', 'D', 'E'];
      const answer = multi(rng, [1, 2, 3, 4].map((s) => ({ md: `Shape ${names[s]}`, correct: goodSlots.includes(s) })), true);
      const goods = goodSlots.sort().map((s) => `shape ${names[s]}`);
      return {
        prompt: `${who} is checking pieces for a ${rng.pick(['tangram-style puzzle', 'stained-glass window', 'quilt'])}. Select **all** the shapes that are congruent to shape A.`,
        figure: slotFigure(shapes, names),
        parts: [{ answer }],
        hints: ['Congruent shapes can be turned or flipped. Compare side lengths (count squares, and look at the slant of each side) and corners.', 'One vertex in the wrong place is enough to make a shape not congruent.'],
        solution: [
          'For each shape, turn or flip it in your mind to line it up with shape A. Then compare every side and every corner.',
          `${cap(listWords(goods))} ${goods.length > 1 ? 'match' : 'matches'} shape A exactly, so ${goods.length > 1 ? 'they are' : 'it is'} congruent to it.`,
          'In each other shape, one vertex is a square away from where it should be, so a side length or an angle is different.',
        ],
        answerDisplay: cap(listWords(goods)),
      };
    }

    // Congruence statement (d2) or transformation plus matching side (d3), with letters in scrambled order.
    const kind = rng.pick(KINDS);
    const { pts, img, t } = shapeAndImage(rng, k, kind);
    const S0 = k === 3 ? 'ABC' : 'ABCD';
    const { S2, T } = namePair(rng, k, true, S0);
    const fig = gridPair(pts, img, [...S0], [...T]);
    if (d === 2) {
      const correct = `$${S0} \\cong ${T}$`;
      const wrong = [S2, dihedral(T, 1, false), dihedral(T, 0, true), dihedral(T, k - 1, false), dihedral(T, 1, true)].filter((x) => x !== T).map((x) => `$${S0} \\cong ${x}$`);
      return {
        prompt: `${cap(word)} $${S0}$ was ${kind === 'translation' ? 'translated' : kind === 'reflection' ? 'reflected' : 'rotated'} to make a congruent ${word}. Which congruence statement is correct?`,
        figure: fig,
        parts: [{ answer: mc(rng, correct, rng.shuffle(wrong)) }],
        hints: ['Find the image of each vertex: $A$ moves to one vertex of the other shape, $B$ to another, and so on.', 'Write the image vertices in the same order as $' + S0 + '$.'],
        solution: [...[...S0].map((c, i) => `$${c}$ moves to $${T[i]}$.`), `In matching order: ${correct}.`],
        answerDisplay: correct,
      };
    }
    const i = rng.int(0, k - 1);
    const idx = KINDS.indexOf(kind);
    const sideAns = mc(rng, seg(sideOf(T, i)), rng.shuffle([...Array(k).keys()].filter((j) => j !== i)).map((j) => seg(sideOf(T, j))));
    const parts: Part[] = [
      { label: '(a) Transformation', answer: fixedChoice(KIND_NAMES, idx) },
      { label: `(b) Side matching $\\overline{${sideOf(S0, i)}}$`, answer: sideAns },
    ];
    return {
      prompt: `${who} drew ${word} $${S0}$ and its image, ${word} $${S2}$, on grid paper for a ${rng.pick(['tile design', 'game board', 'logo'])}.\n\n(a) Which transformation maps $${S0}$ onto $${S2}$?\n\n(b) Which side of $${S2}$ corresponds to $\\overline{${sideOf(S0, i)}}$?`,
      figure: fig,
      parts,
      hints: TRANS_HINTS.slice(0, 1).concat(['Find where each vertex of $' + S0 + '$ lands. Then a side joins the images of its two endpoints.']),
      solution: [...isoDetail(t, pts, img, `$${S0[0]}$`, `$${T[0]}$`), `(a) ${KIND_NAMES[idx]}.`, `Vertex $${S0[i]}$ moves to $${T[i]}$ and vertex $${S0[(i + 1) % k]}$ moves to $${T[(i + 1) % k]}$.`, `(b) $\\overline{${sideOf(S0, i)}}$ corresponds to $\\overline{${sideOf(T, i)}}$.`],
    };
  },
});

export const CONGRUENCE_SKILLS: SkillDef[] = [congruentPolygons, congruenceTransformations];
