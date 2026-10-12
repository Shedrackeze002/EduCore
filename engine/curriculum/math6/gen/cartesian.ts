/** Math 6 Unit 8 — The Cartesian Plane (CG1): points, polygons, translations, reflections and rotations. */
import { fixedChoice, mc, part, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, SkillDef, TableFigure } from '../../../types.ts';
import { NAMES, Sketch, centroid, dirOf, halfTurn, rotCCW, rotCW, samePt, type Color, type P } from './congruence.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Negate without making -0. */
const neg = (v: number) => (v === 0 ? 0 : -v);
/** A coordinate inside maths, with a true minus sign for negatives. */
const ptx = (x: number, y: number) => `(${x},\\ ${y})`;
/** A point as a student types it. */
const ptText = ([x, y]: P) => `(${x}, ${y})`;
const units = (n: number) => `${Math.abs(n)} unit${Math.abs(n) === 1 ? '' : 's'}`;
const prime = (L: string) => `${L}'`;
const LETTERS = ['A', 'B', 'C', 'D'];

/** "3 units right and 2 units up" (parts that are zero are left out). */
function moveWords(dx: number, dy: number): string {
  const bits: string[] = [];
  if (dx) bits.push(`${units(dx)} ${dx > 0 ? 'right' : 'left'}`);
  if (dy) bits.push(`${units(dy)} ${dy > 0 ? 'up' : 'down'}`);
  return bits.length ? bits.join(' and ') : 'no units';
}

const pointPart = (p: P, label: string): Part => part({ kind: 'point', x: p[0], y: p[1] }, { label, placeholder: '(x, y)' });

/** The smallest square Cartesian plane, from -n to n with n at least 5, that holds the points with a margin. */
function planeFor(pts: P[], margin = 1): GridSpec {
  const n = Math.max(5, ...pts.map((p) => Math.max(Math.abs(p[0]), Math.abs(p[1])) + margin));
  return { xMin: -n, xMax: n, yMin: -n, yMax: n };
}

interface Poly {
  pts: P[];
  color: Color;
  labels?: string[];
  outline?: boolean;
}

/** Polygons and points on a Cartesian plane with numbered axes and clear labels. */
function cartFigure(o: { polys?: Poly[]; points?: Array<{ p: P; label: string; color?: Color }>; segs?: Array<[P, P]>; grid?: GridSpec }): PlaneFigure {
  const all: P[] = [...(o.polys ?? []).flatMap((pl) => pl.pts), ...(o.points ?? []).map((q) => q.p)];
  const grid = o.grid ?? planeFor(all.length ? all : [[0, 0]]);
  const s = new Sketch();
  for (const pl of o.polys ?? []) {
    if (pl.outline || pl.pts.length < 3) s.polyline(pl.pts.length < 3 ? pl.pts : [...pl.pts, pl.pts[0]], pl.color);
    else s.polygon(pl.pts, pl.color);
  }
  for (const [a, b] of o.segs ?? []) s.seg(a, b, { color: 'muted', dashed: true });
  for (const pl of o.polys ?? []) for (const p of pl.pts) s.dot(p, pl.color);
  for (const q of o.points ?? []) s.dot(q.p, q.color ?? 'brand');
  // Labels: each vertex label points away from the middle of its own shape.
  const done: P[] = [];
  for (const pl of o.polys ?? []) {
    const c = centroid(pl.pts);
    pl.labels?.forEach((lab, i) => {
      const p = pl.pts[i];
      if (!p || !lab || done.some((q) => samePt(q, p))) return;
      done.push(p);
      s.endLabel(p, samePt(c, p) ? 45 : dirOf(c, p), lab);
    });
  }
  for (const q of o.points ?? []) s.endLabel(q.p, 45, q.label);
  return s.buildGrid(grid, { numbers: true });
}

/** Triangles and quadrilaterals with no symmetry of their own, lowest-left corner at (0, 0). */
const SHAPES: P[][] = [
  [[0, 0], [3, 0], [0, 2]],
  [[0, 0], [2, 0], [0, 3]],
  [[0, 0], [3, 0], [1, 2]],
  [[0, 0], [3, 0], [3, 2]],
  [[0, 0], [2, 0], [3, 2]],
  [[0, 0], [3, 1], [2, 3]],
  [[0, 0], [3, 0], [2, 2], [0, 2]],
  [[0, 0], [3, 0], [3, 1], [0, 3]],
  [[0, 0], [3, 0], [2, 3], [0, 2]],
  [[0, 0], [3, 0], [3, 2], [1, 3]],
];

/** A random shape, turned and maybe flipped, with its lowest-left corner at (x0, y0). */
function placeShape(rng: Rng, x0: number, y0: number, pool: P[][] = SHAPES): P[] {
  let q = rng.pick(pool).map(([x, y]) => [rng.chance(0.5) ? neg(x) : x, y] as P);
  const k = rng.int(0, 3);
  for (let i = 0; i < k; i++) q = q.map(([x, y]) => [neg(y), x] as P);
  const mx = Math.min(...q.map((p) => p[0]));
  const my = Math.min(...q.map((p) => p[1]));
  return q.map(([x, y]) => [x - mx + x0, y - my + y0] as P);
}

const quadrant = ([x, y]: P) => (x > 0 && y > 0 ? 1 : x < 0 && y > 0 ? 2 : x < 0 && y < 0 ? 3 : x > 0 && y < 0 ? 4 : 0);

/** Read a point: how far right or left, then how far up or down. */
function readSteps(L: string, [x, y]: P): string[] {
  return [
    x === 0 ? `$${L}$ is on the $y$-axis, so its $x$-coordinate is $0$.` : `Start at the origin. $${L}$ is ${units(x)} ${x > 0 ? 'right' : 'left'}, so $x = ${x}$.`,
    y === 0 ? `$${L}$ is on the $x$-axis, so its $y$-coordinate is $0$.` : `$${L}$ is ${units(y)} ${y > 0 ? 'up' : 'down'}, so $y = ${y}$.`,
  ];
}

const MAP_CTX = [
  (w: string) => `${w} drew a map of a campground on a Cartesian plane. Each unit is $10\\ \\text{m}$.`,
  () => 'A game board is drawn on a Cartesian plane.',
  (w: string) => `${w} is planning a treasure hunt on a map of the schoolyard. The map is a Cartesian plane.`,
  () => 'A map of a town park is drawn on a Cartesian plane, with the fountain at the origin.',
  (w: string) => `${w} is designing a video game level on a Cartesian plane.`,
];

// ---------------------------------------------------------------------------
// 8.1 Points and polygons
// ---------------------------------------------------------------------------

const SHAPE_NAMES = ['a square', 'a rectangle that is not a square', 'a parallelogram with no right angles', 'a trapezoid'];

const cartesianPoints = skill({
  id: 'm6-cartesian-points',
  name: 'Points and polygons in the Cartesian plane',
  description: 'Read and locate points (x, y) in all four quadrants, describe the vertices of polygons, and find a missing vertex or side length.',
  outcomes: ['CG1'],
  lessonId: 'm6-8-1',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode =
      d === 1
        ? rng.weighted([['read', 3], ['locate', 2]] as const)
        : d === 2
          ? rng.weighted([['vertex', 2], ['describe', 2], ['missing', 2]] as const)
          : rng.weighted([['shape-name', 2], ['perimeter', 2], ['area', 1]] as const);

    if (mode === 'read') {
      const onAxis = rng.chance(0.15);
      const x = onAxis && rng.chance(0.5) ? 0 : rng.nonZero(-6, 6);
      const y = onAxis && x !== 0 ? 0 : rng.nonZero(-6, 6);
      const ctx = rng.pick([
        (w: string) => `On a map of a campground, ${w}'s tent is at point $P$.`,
        () => 'On a game board, a game piece is at point $P$.',
        (w: string) => `On a map of the schoolyard, ${w} hid a clue at point $P$.`,
        () => 'On a plan of a garden, a sprinkler is at point $P$.',
        (w: string) => `In ${w}'s video game, a gem is at point $P$.`,
      ])(who);
      return {
        prompt: `${ctx} What are the coordinates of point $P$?`,
        figure: cartFigure({ points: [{ p: [x, y], label: 'P' }], grid: { xMin: -7, xMax: 7, yMin: -7, yMax: 7 } }),
        parts: [pointPart([x, y], '$P$ =')],
        hints: ['Start at the origin, $(0,\\ 0)$. First count right or left along the $x$-axis, then up or down.', 'Right and up are positive. Left and down are negative. Write $(x,\\ y)$: the $x$-coordinate comes first.'],
        solution: [...readSteps('P', [x, y]), `The coordinates are $P${ptx(x, y)}$.`],
        answerDisplay: `$${ptx(x, y)}$`,
      };
    }

    if (mode === 'locate') {
      for (;;) {
        const x = rng.nonZero(-6, 6);
        const y = rng.nonZero(-6, 6);
        if (Math.abs(x) === Math.abs(y)) continue;
        const target: P = [x, y];
        const fakes: P[] = rng.shuffle([[y, x], [neg(x), y], [x, neg(y)], [neg(x), neg(y)], [neg(y), neg(x)]] as P[]).slice(0, 3);
        const pts = rng.shuffle([target, ...fakes]);
        const idx = pts.findIndex((p) => samePt(p, target));
        const why = (p: P) =>
          samePt(p, [y, x]) ? 'has the coordinates in the wrong order' : p[0] !== x && p[1] !== y ? 'has both signs wrong' : p[0] !== x ? 'is on the wrong side of the $y$-axis' : 'is on the wrong side of the $x$-axis';
        const answer = fixedChoice(LETTERS.map((L) => `Point $${L}$`), idx);
        return {
          prompt: `${rng.pick(MAP_CTX)(who)} Which point is at $${ptx(x, y)}$?`,
          figure: cartFigure({ points: pts.map((p, i) => ({ p, label: LETTERS[i] })), grid: { xMin: -7, xMax: 7, yMin: -7, yMax: 7 } }),
          parts: [{ answer }],
          hints: ['The first number is the $x$-coordinate: go right if it is positive, left if it is negative.', 'The second number is the $y$-coordinate: go up if it is positive, down if it is negative.'],
          solution: [
            `Start at the origin. Move ${units(x)} ${x > 0 ? 'right' : 'left'} (because $x = ${x}$), then ${units(y)} ${y > 0 ? 'up' : 'down'} (because $y = ${y}$).`,
            ...pts.map((p, i) => (i === idx ? '' : `Point $${LETTERS[i]}$ is at $${ptx(p[0], p[1])}$: it ${why(p)}.`)).filter(Boolean),
            `Point $${LETTERS[idx]}$ is at $${ptx(x, y)}$.`,
          ],
          answerDisplay: `Point $${LETTERS[idx]}$`,
        };
      }
    }

    if (mode === 'vertex') {
      for (;;) {
        const shape = placeShape(rng, rng.int(-4, 1), rng.int(-4, 1), [...SHAPES, [[0, 0], [4, 0], [4, 3], [0, 3]], [[0, 0], [3, 0], [4, 3], [1, 3]]]);
        if (new Set(shape.map(quadrant)).size < 3) continue;
        const labels = LETTERS.slice(0, shape.length);
        const [i, j] = rng.sample(shape.map((_, k) => k), 2).sort((a, b) => a - b);
        const thing = rng.pick(['a garden bed', 'a flower bed', 'a parking lot', 'a skating rink', 'a sandbox', 'a playground']);
        return {
          prompt: `${who} drew ${thing} on a Cartesian plane. What are the coordinates of vertices $${labels[i]}$ and $${labels[j]}$?`,
          figure: cartFigure({ polys: [{ pts: shape, color: 'brand', labels }], grid: planeFor(shape, 2) }),
          parts: [pointPart(shape[i], `$${labels[i]}$ =`), pointPart(shape[j], `$${labels[j]}$ =`)],
          hints: ['For each vertex, start at the origin. Count right or left to find $x$, then up or down to find $y$.', 'Points to the left of the $y$-axis have a negative $x$-coordinate. Points below the $x$-axis have a negative $y$-coordinate.'],
          solution: [
            ...readSteps(labels[i], shape[i]),
            ...readSteps(labels[j], shape[j]),
            `$${labels[i]}${ptx(shape[i][0], shape[i][1])}$ and $${labels[j]}${ptx(shape[j][0], shape[j][1])}$`,
          ],
          answerDisplay: `$${labels[i]}${ptx(shape[i][0], shape[i][1])}$, $${labels[j]}${ptx(shape[j][0], shape[j][1])}$`,
        };
      }
    }

    if (mode === 'describe') {
      const onAxis = rng.chance(0.2);
      const x = onAxis && rng.chance(0.5) ? 0 : rng.nonZero(-7, 7);
      const y = onAxis && x !== 0 ? 0 : rng.nonZero(-7, 7);
      const xs = x === 0 ? 'on the $y$-axis' : `${units(x)} to the ${x > 0 ? 'right' : 'left'} of the $y$-axis`;
      const ys = y === 0 ? 'on the $x$-axis' : `${units(y)} ${y > 0 ? 'above' : 'below'} the $x$-axis`;
      const first = rng.chance(0.5);
      const thing = rng.pick(['A bird feeder', 'A picnic table', 'A soccer goal', 'A drinking fountain', 'A bike rack', 'A climbing wall']);
      return {
        prompt: `${rng.pick(MAP_CTX)(who)} ${thing} is ${first ? `${xs} and ${ys}` : `${ys} and ${xs}`}. What are its coordinates?`,
        parts: [pointPart([x, y], '$(x,\\ y)$ =')],
        hints: [
          'The $x$-coordinate tells how far the point is to the right (positive) or left (negative) of the $y$-axis.',
          'The $y$-coordinate tells how far the point is above (positive) or below (negative) the $x$-axis. Write the $x$-coordinate first.',
        ],
        solution: [
          x === 0 ? 'On the $y$-axis means $x = 0$.' : `${units(x)} to the ${x > 0 ? 'right' : 'left'} of the $y$-axis means $x = ${x}$.`,
          y === 0 ? 'On the $x$-axis means $y = 0$.' : `${units(y)} ${y > 0 ? 'above' : 'below'} the $x$-axis means $y = ${y}$.`,
          `The coordinates are $${ptx(x, y)}$.`,
        ],
        answerDisplay: `$${ptx(x, y)}$`,
      };
    }

    if (mode === 'missing') {
      for (;;) {
        const x1 = rng.int(-6, 2);
        const x2 = rng.int(x1 + 2, Math.min(6, x1 + 8));
        const y1 = rng.int(-6, 2);
        const y2 = rng.int(y1 + 2, Math.min(6, y1 + 7));
        if (x1 * x2 >= 0 && y1 * y2 >= 0) continue;
        const rect: P[] = rng.pick([
          [[x1, y1], [x2, y1], [x2, y2], [x1, y2]],
          [[x2, y2], [x1, y2], [x1, y1], [x2, y1]],
          [[x1, y2], [x1, y1], [x2, y1], [x2, y2]],
        ] as P[][]);
        const thing = rng.pick(['a rectangular garden', 'a rectangular swimming pool', 'a rectangular soccer field', 'a rectangular tent floor', 'a rectangular mural']);
        const [A, B, C, D] = rect;
        return {
          prompt: `${who} is drawing ${thing} on a Cartesian plane. Three vertices of rectangle $ABCD$ are plotted. What are the coordinates of vertex $D$?`,
          figure: cartFigure({ points: [{ p: A, label: 'A' }, { p: B, label: 'B' }, { p: C, label: 'C' }], segs: [[A, B], [B, C]], grid: planeFor(rect, 1) }),
          parts: [pointPart(D, '$D$ =')],
          hints: ['In a rectangle, the sides meet at right angles. Side $AD$ is parallel to side $BC$, and side $CD$ is parallel to side $BA$.', `$D$ is straight across from $C$ the same way $A$ is straight across from $B$. Which coordinate does $D$ share with $A$, and which with $C$?`],
          solution: [
            `$A${ptx(A[0], A[1])}$, $B${ptx(B[0], B[1])}$ and $C${ptx(C[0], C[1])}$.`,
            `From $B$ to $A$ is ${moveWords(A[0] - B[0], A[1] - B[1])}. From $C$, move the same way: ${moveWords(D[0] - C[0], D[1] - C[1])}.`,
            `$D$ has the same ${A[0] === D[0] ? '$x$' : '$y$'}-coordinate as $A$ and the same ${C[0] === D[0] ? '$x$' : '$y$'}-coordinate as $C$.`,
            `The fourth vertex is $D${ptx(D[0], D[1])}$.`,
          ],
          answerDisplay: `$${ptx(D[0], D[1])}$`,
        };
      }
    }

    if (mode === 'shape-name') {
      for (;;) {
        const kind = rng.int(0, 3);
        const x0 = rng.int(-5, 0);
        const y0 = rng.int(-5, 0);
        const w = rng.int(2, 5);
        const h = kind === 0 ? w : rng.intExcept(2, 5, [w]);
        const off = rng.nonZero(-2, 2);
        const top = rng.intExcept(1, w + 2, [w]);
        let pts: P[] =
          kind === 0 || kind === 1
            ? [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]]
            : kind === 2
              ? [[x0, y0], [x0 + w, y0], [x0 + w + off, y0 + h], [x0 + off, y0 + h]]
              : [[x0, y0], [x0 + w, y0], [x0 + top, y0 + h], [x0, y0 + h]];
        if (rng.chance(0.5)) pts = pts.map(([x, y]) => [y, x] as P);
        const start = rng.int(0, 3);
        pts = [...pts.slice(start), ...pts.slice(0, start)];
        if (pts.some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) continue;
        if (new Set(pts.map(quadrant).filter((q) => q > 0)).size < 3) continue;
        const why = [
          'All four sides are the same length and every corner is a right angle, so it is a **square**.',
          `Every corner is a right angle, but the sides are $${w}$ and $${h}$ units long, so it is a **rectangle** that is not a square.`,
          'Both pairs of opposite sides are parallel, but the sides are slanted, so there are no right angles. It is a **parallelogram**.',
          'Only one pair of opposite sides is parallel, so it is a **trapezoid**.',
        ][kind];
        const list = pts.map((p, i) => `$${LETTERS[i]}${ptx(p[0], p[1])}$`).join(', ');
        return {
          prompt: `${who} plots the points ${list} on a Cartesian plane and joins them in order: $A$ to $B$ to $C$ to $D$ and back to $A$. Which shape does ${who} make?`,
          figure: cartFigure({ grid: { xMin: -7, xMax: 7, yMin: -7, yMax: 7 } }),
          parts: [{ answer: fixedChoice(SHAPE_NAMES.map((s) => s.charAt(0).toUpperCase() + s.slice(1)), kind) }],
          hints: ['Plot each point: the first number tells you how far to go right or left, the second how far up or down.', 'Join the points in order. Check which sides are parallel and whether the corners are right angles.'],
          solution: [
            `Plot the points: ${pts.map((p, i) => `$${LETTERS[i]}$ is ${p[0] === 0 && p[1] === 0 ? 'at the origin' : `${moveWords(p[0], p[1])} from the origin`}`).join('; ')}.`,
            why,
            `${who} makes ${SHAPE_NAMES[kind]}.`,
          ],
          answerDisplay: SHAPE_NAMES[kind],
        };
      }
    }

    // Perimeter or area of a rectangle that crosses the axes.
    for (;;) {
      const x1 = rng.int(-6, -1);
      const x2 = rng.int(1, 6);
      const y1 = rng.int(-6, 0);
      const y2 = rng.int(Math.max(1, y1 + 2), 6);
      const w = x2 - x1;
      const h = y2 - y1;
      if (w === h || w > 10 || h > 10) continue;
      const pts: P[] = [[x1, y2], [x2, y2], [x2, y1], [x1, y1]];
      const list = pts.map((p, i) => `$${LETTERS[i]}${ptx(p[0], p[1])}$`).join(', ');
      const [unit, ctx] = rng.pick([
        ['m', `${who} drew a rectangular vegetable garden on a plan. Each unit on the plan is $1\\ \\text{m}$.`],
        ['m', `A rectangular fence around a garden is shown on a plan. Each unit on the plan is $1\\ \\text{m}$.`],
        ['m', `${who} marked out a rectangular play area on a grid. Each unit on the grid is $1\\ \\text{m}$.`],
        ['km', `A rectangular provincial park is shown on a map. Each unit on the map is $1\\ \\text{km}$.`],
        ['km', `${who} drew a rectangular hiking area on a map. Each unit on the map is $1\\ \\text{km}$.`],
      ] as const);
      const lenSteps = [
        `$AB$ goes from $x = ${x1}$ to $x = ${x2}$: that is ${units(x1)} to the $y$-axis and ${units(x2)} past it, so $AB = ${-x1} + ${x2} = ${w}$.`,
        `$BC$ goes from $y = ${y2}$ to $y = ${y1}$: ${y1 === 0 ? `$BC = ${y2}$` : `that is ${units(y2)} down to the $x$-axis and ${units(y1)} more, so $BC = ${y2} + ${-y1} = ${h}$`}.`,
      ];
      if (mode === 'perimeter') {
        const per = 2 * (w + h);
        return {
          prompt: `${ctx} The vertices are ${list}. What is the perimeter of rectangle $ABCD$?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }], grid: planeFor(pts, 1) }),
          parts: [{ label: 'Perimeter =', suffix: unit, answer: { kind: 'numeric', value: per } }],
          hints: ['Find the length of each side by counting units. A side that crosses an axis has a part on each side of the axis.', 'The perimeter is the distance all the way around: add all four sides.'],
          solution: [...lenSteps, `Perimeter $= ${w} + ${h} + ${w} + ${h} = ${per}$`, `The perimeter is $${per}\\ \\text{${unit}}$.`],
        };
      }
      const area = w * h;
      return {
        prompt: `${ctx} The vertices are ${list}. What is the area of rectangle $ABCD$?`,
        figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }], grid: planeFor(pts, 1) }),
        parts: [{ label: 'Area =', suffix: `${unit}²`, answer: { kind: 'numeric', value: area } }],
        hints: ['Find the length and the width by counting units. A side that crosses an axis has a part on each side of the axis.', 'Area of a rectangle = length × width.'],
        solution: [...lenSteps, `Area $= ${w} \\times ${h} = ${area}$`, `The area is $${area}\\ \\text{${unit}}^2$.`],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// 8.2 Translations and reflections
// ---------------------------------------------------------------------------

const reflectXAxis = ([x, y]: P): P => [x, neg(y)];
const reflectYAxis = ([x, y]: P): P => [neg(x), y];

/** Steps for reflecting one vertex in an axis. */
function reflectSteps(L: string, p: P, inX: boolean): string[] {
  const q = inX ? reflectXAxis(p) : reflectYAxis(p);
  return inX
    ? [
        `$${L}${ptx(p[0], p[1])}$ is ${p[1] === 0 ? 'on the $x$-axis' : `${units(p[1])} ${p[1] > 0 ? 'above' : 'below'} the $x$-axis`}.`,
        p[1] === 0 ? `A point on the mirror line stays where it is.` : `Its image is the same distance on the other side: ${units(p[1])} ${p[1] > 0 ? 'below' : 'above'} the $x$-axis. The $x$-coordinate stays $${p[0]}$.`,
        `$${prime(L)}${ptx(q[0], q[1])}$`,
      ]
    : [
        `$${L}${ptx(p[0], p[1])}$ is ${p[0] === 0 ? 'on the $y$-axis' : `${units(p[0])} to the ${p[0] > 0 ? 'right' : 'left'} of the $y$-axis`}.`,
        p[0] === 0 ? `A point on the mirror line stays where it is.` : `Its image is the same distance on the other side: ${units(p[0])} to the ${p[0] > 0 ? 'left' : 'right'}. The $y$-coordinate stays $${p[1]}$.`,
        `$${prime(L)}${ptx(q[0], q[1])}$`,
      ];
}

function translateSteps(L: string, p: P, dx: number, dy: number): string[] {
  const q: P = [p[0] + dx, p[1] + dy];
  const xs = dx === 0 ? `No move right or left, so $x$ stays $${p[0]}$.` : `${dx > 0 ? 'Right' : 'Left'} ${units(dx)}: $x = ${p[0]} ${dx > 0 ? '+' : '-'} ${Math.abs(dx)} = ${q[0]}$.`;
  const ys = dy === 0 ? `No move up or down, so $y$ stays $${p[1]}$.` : `${dy > 0 ? 'Up' : 'Down'} ${units(dy)}: $y = ${p[1]} ${dy > 0 ? '+' : '-'} ${Math.abs(dy)} = ${q[1]}$.`;
  return [`$${L}$ is at $${ptx(p[0], p[1])}$.`, `${xs} ${ys}`, `$${prime(L)}${ptx(q[0], q[1])}$`];
}

const SHAPE_CTX = [
  (w: string, s: string) => `${w} is moving a flower bed shaped like a ${s} on a garden plan.`,
  (w: string, s: string) => `${w} is designing a logo. Part of it is a ${s} on a Cartesian plane.`,
  (_w: string, s: string) => `A sail shaped like a ${s} is drawn on a Cartesian plane for a boat design.`,
  (w: string, s: string) => `In ${w}'s video game, a spaceship shaped like a ${s} moves across the screen.`,
  (w: string, s: string) => `${w} is planning where to put a table shaped like a ${s} on a classroom plan.`,
];
const shapeWord = (n: number) => (n === 3 ? 'triangle' : 'quadrilateral');
const nameOf = (n: number) => LETTERS.slice(0, n).join('');

/** A shape placed so that it and its image both fit on the plane. */
function shapeAndImage(rng: Rng, f: (p: P) => P, lo = -5, hi = 2, pool = SHAPES): { pts: P[]; img: P[] } {
  for (;;) {
    const pts = placeShape(rng, rng.int(lo, hi), rng.int(lo, hi), pool);
    const img = pts.map(f);
    if ([...pts, ...img].some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) continue;
    if (img.some((p) => pts.some((q) => samePt(p, q)))) continue;
    return { pts, img };
  }
}

const translateReflect = skill({
  id: 'm6-translate-reflect',
  name: 'Translations and reflections',
  description: 'Translate a polygon and describe the horizontal and vertical movement, reflect a polygon in the x-axis or y-axis, and relate the coordinates of a polygon and its image.',
  outcomes: ['CG1'],
  lessonId: 'm6-8-2',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode =
      d === 1
        ? rng.weighted([['translate', 1], ['reflect', 1]] as const)
        : d === 2
          ? rng.weighted([['describe', 2], ['reflect-two', 2], ['which', 2]] as const)
          : rng.weighted([['two-step', 2], ['same-move', 2], ['table', 2]] as const);

    if (mode === 'translate') {
      const dx = rng.nonZero(-5, 5);
      const dy = rng.chance(0.15) ? 0 : rng.nonZero(-5, 5);
      const { pts } = shapeAndImage(rng, ([x, y]) => [x + dx, y + dy]);
      const n = pts.length;
      const i = rng.int(0, n - 1);
      const L = LETTERS[i];
      const s = shapeWord(n);
      return {
        prompt: `${rng.pick(SHAPE_CTX)(who, s)} Translate ${s} $${nameOf(n)}$ **${moveWords(dx, dy)}**. What are the coordinates of $${prime(L)}$, the image of vertex $${L}$?`,
        figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
        parts: [pointPart([pts[i][0] + dx, pts[i][1] + dy], `$${prime(L)}$ =`)],
        hints: ['In a translation every vertex slides the same distance in the same direction.', `Read the coordinates of $${L}$. Moving right adds to $x$, left subtracts from $x$. Moving up adds to $y$, down subtracts from $y$.`],
        solution: translateSteps(L, pts[i], dx, dy),
        answerDisplay: `$${ptx(pts[i][0] + dx, pts[i][1] + dy)}$`,
      };
    }

    if (mode === 'reflect' || mode === 'reflect-two') {
      const inX = rng.chance(0.5);
      const f = inX ? reflectXAxis : reflectYAxis;
      const quad = mode === 'reflect-two';
      const pool = quad ? SHAPES.filter((s) => s.length === 4) : SHAPES;
      const { pts, img } = shapeAndImage(rng, f, -6, 3, pool);
      const n = pts.length;
      const s = shapeWord(n);
      const ask = quad ? rng.sample([0, 1, 2, 3], 2).sort() : [rng.int(0, n - 1)];
      return {
        prompt: `${rng.pick(SHAPE_CTX)(who, s)} Reflect ${s} $${nameOf(n)}$ in the **${inX ? '$x$' : '$y$'}-axis**. What ${ask.length > 1 ? 'are' : 'is'} the coordinates of ${ask.map((i) => `$${prime(LETTERS[i])}$`).join(' and ')}?`,
        figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
        parts: ask.map((i) => pointPart(img[i], `$${prime(LETTERS[i])}$ =`)),
        hints: [
          `The ${inX ? '$x$-axis' : '$y$-axis'} is the mirror line. Each image point is the same distance from it as the original point, but on the other side.`,
          inX ? 'In a reflection in the $x$-axis, $x$ stays the same and $y$ changes to its opposite.' : 'In a reflection in the $y$-axis, $y$ stays the same and $x$ changes to its opposite.',
        ],
        solution: ask.flatMap((i) => reflectSteps(LETTERS[i], pts[i], inX)),
        answerDisplay: ask.map((i) => `$${prime(LETTERS[i])}${ptx(img[i][0], img[i][1])}$`).join(', '),
      };
    }

    if (mode === 'describe') {
      for (;;) {
        const dx = rng.nonZero(-6, 6);
        const dy = rng.nonZero(-6, 6);
        if (Math.abs(dx) === Math.abs(dy)) continue;
        const { pts, img } = shapeAndImage(rng, ([x, y]) => [x + dx, y + dy], -6, 3);
        const n = pts.length;
        const correct = `${moveWords(dx, dy)}`;
        const answer = mc(rng, correct, [moveWords(dy, dx), moveWords(-dx, -dy), moveWords(dx, -dy), moveWords(-dx, dy)]);
        return {
          prompt: `${rng.pick(SHAPE_CTX)(who, shapeWord(n))} ${shapeWord(n).charAt(0).toUpperCase() + shapeWord(n).slice(1)} $${nameOf(n)}$ is translated to $${LETTERS.slice(0, n).map(prime).join('')}$. Which describes the translation?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }, { pts: img, color: 'accent', labels: LETTERS.map(prime) }] }),
          parts: [{ answer }],
          hints: ['Pick one vertex, such as $A$, and find its image $A\'$.', 'Count how many units across (right or left) from $A$ to $A\'$. Then count how many units up or down.'],
          solution: [
            `$A$ is at $${ptx(pts[0][0], pts[0][1])}$ and $A'$ is at $${ptx(img[0][0], img[0][1])}$.`,
            `Across: from $x = ${pts[0][0]}$ to $x = ${img[0][0]}$ is ${units(dx)} ${dx > 0 ? 'right' : 'left'}. Up or down: from $y = ${pts[0][1]}$ to $y = ${img[0][1]}$ is ${units(dy)} ${dy > 0 ? 'up' : 'down'}.`,
            `The translation is ${correct}: the horizontal part is ${units(dx)} ${dx > 0 ? 'right' : 'left'} and the vertical part is ${units(dy)} ${dy > 0 ? 'up' : 'down'}.`,
          ],
          answerDisplay: correct,
        };
      }
    }

    if (mode === 'which') {
      const kind = rng.int(0, 2);
      let dx = 0;
      let dy = 0;
      if (kind === 2) {
        dx = rng.nonZero(-5, 5);
        dy = rng.chance(0.4) ? 0 : rng.nonZero(-4, 4);
      }
      const f = kind === 0 ? reflectXAxis : kind === 1 ? reflectYAxis : ([x, y]: P): P => [x + dx, y + dy];
      const { pts, img } = shapeAndImage(rng, f, -6, 3);
      const n = pts.length;
      const choices = ['A reflection in the $x$-axis', 'A reflection in the $y$-axis', 'A translation'];
      const why = [
        `Each vertex and its image are the same distance from the $x$-axis, on opposite sides. The $x$-coordinates stay the same, and the $y$-coordinates change to their opposites: for example, $A${ptx(pts[0][0], pts[0][1])}$ and $A'${ptx(img[0][0], img[0][1])}$.`,
        `Each vertex and its image are the same distance from the $y$-axis, on opposite sides. The $y$-coordinates stay the same, and the $x$-coordinates change to their opposites: for example, $A${ptx(pts[0][0], pts[0][1])}$ and $A'${ptx(img[0][0], img[0][1])}$.`,
        `The image faces the same way as the original. Every vertex moved ${moveWords(dx, dy)}.`,
      ][kind];
      return {
        prompt: `${shapeWord(n).charAt(0).toUpperCase() + shapeWord(n).slice(1)} $${nameOf(n)}$ was moved to $${LETTERS.slice(0, n).map(prime).join('')}$. Which move was used?`,
        figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }, { pts: img, color: 'accent', labels: LETTERS.map(prime) }] }),
        parts: [{ answer: fixedChoice(choices, kind) }],
        hints: ['A reflection flips the shape: the image is a mirror image. A translation slides it: the image faces the same way.', 'For a reflection, check which axis is halfway between each vertex and its image.'],
        solution: [why, `The move was ${choices[kind].charAt(0).toLowerCase() + choices[kind].slice(1)}.`],
        answerDisplay: choices[kind],
      };
    }

    if (mode === 'two-step') {
      const inX = rng.chance(0.5);
      const R = inX ? reflectXAxis : reflectYAxis;
      const dx = inX ? rng.int(-4, 4) : rng.nonZero(-4, 4);
      const dy = inX ? rng.nonZero(-4, 4) : rng.int(-4, 4);
      const reflectFirst = rng.chance(0.5);
      const T = ([x, y]: P): P => [x + dx, y + dy];
      const f = (p: P) => (reflectFirst ? T(R(p)) : R(T(p)));
      for (;;) {
        const { pts, img } = shapeAndImage(rng, f, -6, 3);
        const mids = pts.map(reflectFirst ? R : T);
        if (mids.some((p) => Math.abs(p[0]) > 7 || Math.abs(p[1]) > 7)) continue;
        const n = pts.length;
        const i = rng.int(0, n - 1);
        const L = LETTERS[i];
        const steps1 = reflectFirst ? `reflected in the ${inX ? '$x$' : '$y$'}-axis` : `translated ${moveWords(dx, dy)}`;
        const steps2 = reflectFirst ? `translated ${moveWords(dx, dy)}` : `reflected in the ${inX ? '$x$' : '$y$'}-axis`;
        const mid = mids[i];
        return {
          prompt: `${rng.pick(SHAPE_CTX)(who, shapeWord(n))} First, ${shapeWord(n)} $${nameOf(n)}$ is ${steps1}. Then the image is ${steps2}. Where does vertex $${L}$ end up?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
          parts: [pointPart(img[i], `Final position of $${L}$ =`)],
          hints: ['Do one move at a time. Write down where the vertex is after the first move.', 'Reflecting in the $x$-axis changes the sign of $y$. Reflecting in the $y$-axis changes the sign of $x$. Translating adds to or subtracts from the coordinates.'],
          solution: [
            `$${L}$ starts at $${ptx(pts[i][0], pts[i][1])}$.`,
            reflectFirst
              ? `Reflect in the ${inX ? '$x$' : '$y$'}-axis: ${inX ? `$x$ stays $${pts[i][0]}$ and $y$ becomes $${mid[1]}$` : `$y$ stays $${pts[i][1]}$ and $x$ becomes $${mid[0]}$`}. The vertex is now at $${ptx(mid[0], mid[1])}$.`
              : `Translate ${moveWords(dx, dy)}: the vertex moves to $${ptx(mid[0], mid[1])}$.`,
            reflectFirst
              ? `Translate ${moveWords(dx, dy)}: $${ptx(mid[0], mid[1])}$ moves to $${ptx(img[i][0], img[i][1])}$.`
              : `Reflect in the ${inX ? '$x$' : '$y$'}-axis: ${inX ? `$x$ stays $${mid[0]}$ and $y$ becomes $${img[i][1]}$` : `$y$ stays $${mid[1]}$ and $x$ becomes $${img[i][0]}$`}.`,
            `Vertex $${L}$ ends up at $${ptx(img[i][0], img[i][1])}$.`,
          ],
          answerDisplay: `$${ptx(img[i][0], img[i][1])}$`,
        };
      }
    }

    if (mode === 'same-move') {
      for (;;) {
        const dx = rng.nonZero(-6, 6);
        const dy = rng.nonZero(-6, 6);
        const { pts, img } = shapeAndImage(rng, ([x, y]) => [x + dx, y + dy], -6, 3);
        const n = pts.length;
        const i = rng.int(1, n - 1);
        const L = LETTERS[i];
        return {
          prompt: `A translation moves ${shapeWord(n)} $${nameOf(n)}$ so that vertex $A${ptx(pts[0][0], pts[0][1])}$ moves to $A'${ptx(img[0][0], img[0][1])}$. Where does the same translation move vertex $${L}$?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }], points: [{ p: img[0], label: "A′", color: 'accent' }], grid: planeFor([...pts, ...img], 1) }),
          parts: [pointPart(img[i], `$${prime(L)}$ =`)],
          hints: ['In a translation every vertex moves the same way. First describe how $A$ moved to $A\'$.', `Count the units across and up or down from $A$ to $A'$. Then move $${L}$ the same way.`],
          solution: [
            `From $A${ptx(pts[0][0], pts[0][1])}$ to $A'${ptx(img[0][0], img[0][1])}$: $x$ changes by $${img[0][0]} - ${pts[0][0] < 0 ? `(${pts[0][0]})` : pts[0][0]} = ${dx}$ and $y$ changes by $${img[0][1]} - ${pts[0][1] < 0 ? `(${pts[0][1]})` : pts[0][1]} = ${dy}$. The translation is ${moveWords(dx, dy)}.`,
            ...translateSteps(L, pts[i], dx, dy),
          ],
          answerDisplay: `$${ptx(img[i][0], img[i][1])}$`,
        };
      }
    }

    // A table of coordinates: which move was used?
    for (;;) {
      const kind = rng.int(0, 2);
      const dx = rng.nonZero(-5, 5);
      const dy = rng.nonZero(-5, 5);
      const f = kind === 0 ? reflectXAxis : kind === 1 ? reflectYAxis : ([x, y]: P): P => [x + dx, y + dy];
      const { pts, img } = shapeAndImage(rng, f, -6, 3, SHAPES.filter((s) => s.length === 3));
      if (pts.some((p) => p[0] === 0 || p[1] === 0)) continue;
      const fig: TableFigure = {
        type: 'table',
        headers: ['Vertex', 'Coordinates', 'Image', 'Coordinates'],
        rows: pts.map((p, i) => [LETTERS[i], ptText(p).replace(/-/g, '−'), prime(LETTERS[i]).replace("'", '′'), ptText(img[i]).replace(/-/g, '−')]),
      };
      const choices = ['A reflection in the $x$-axis', 'A reflection in the $y$-axis', `A translation ${moveWords(dx, dy)}`];
      const answer = mc(rng, choices[kind], [...choices.filter((_, i) => i !== kind), `A translation ${moveWords(-dx, -dy)}`]);
      const why = [
        'In every row, the $x$-coordinate stays the same and the $y$-coordinate changes to its opposite. That is a reflection in the $x$-axis.',
        'In every row, the $y$-coordinate stays the same and the $x$-coordinate changes to its opposite. That is a reflection in the $y$-axis.',
        `In every row, $x$ changes by $${dx}$ and $y$ changes by $${dy}$. Every vertex moves the same way: ${moveWords(dx, dy)}. That is a translation.`,
      ][kind];
      return {
        prompt: `${who} moved triangle $ABC$ on a Cartesian plane. The table shows the coordinates of the vertices and their images. Which move did ${who} use?`,
        figure: fig,
        parts: [{ answer }],
        hints: ['Compare each vertex with its image. Which coordinate changes, and how?', 'Reflection in the $x$-axis: $(x,\\ y) \\to (x,\\ -y)$. Reflection in the $y$-axis: $(x,\\ y) \\to (-x,\\ y)$. A translation adds the same numbers to every vertex.'],
        solution: [
          `$A${ptx(pts[0][0], pts[0][1])} \\to A'${ptx(img[0][0], img[0][1])}$, $B${ptx(pts[1][0], pts[1][1])} \\to B'${ptx(img[1][0], img[1][1])}$, $C${ptx(pts[2][0], pts[2][1])} \\to C'${ptx(img[2][0], img[2][1])}$`,
          why,
          `${who} used ${choices[kind].charAt(0).toLowerCase() + choices[kind].slice(1)}.`,
        ],
        answerDisplay: choices[kind],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// 8.3 Rotations about a vertex
// ---------------------------------------------------------------------------

type Rot = 'cw90' | 'ccw90' | 'r180' | 'cw270' | 'ccw270';
const ROT_TEXT: Record<Rot, string> = {
  cw90: '$90^\\circ$ clockwise',
  ccw90: '$90^\\circ$ counter-clockwise',
  r180: '$180^\\circ$',
  cw270: '$270^\\circ$ clockwise',
  ccw270: '$270^\\circ$ counter-clockwise',
};
/** The quarter turn that a rotation equals (a 270° turn one way is a 90° turn the other way). */
const asQuarter = (r: Rot): 'cw' | 'ccw' | 'half' => (r === 'cw90' || r === 'ccw270' ? 'cw' : r === 'ccw90' || r === 'cw270' ? 'ccw' : 'half');
const rotFn = (r: Rot, c: P) => {
  const q = asQuarter(r);
  return q === 'cw' ? rotCW(c) : q === 'ccw' ? rotCCW(c) : halfTurn(c);
};

/** "right" -> "down" for a quarter turn clockwise. */
function turnDir(word: string, q: 'cw' | 'ccw' | 'half'): string {
  const ring = ['right', 'down', 'left', 'up'];
  const i = ring.indexOf(word);
  return ring[(i + (q === 'cw' ? 1 : q === 'ccw' ? 3 : 2)) % 4];
}

/** Steps for rotating vertex B about A. */
function rotateSteps(A: string, a: P, B: string, b: P, r: Rot): string[] {
  const q = asQuarter(r);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const parts: Array<[number, string]> = [];
  if (dx) parts.push([Math.abs(dx), dx > 0 ? 'right' : 'left']);
  if (dy) parts.push([Math.abs(dy), dy > 0 ? 'up' : 'down']);
  const turned = parts.map(([n, w]) => [n, turnDir(w, q)] as [number, string]);
  const dirs: Record<string, P> = { right: [1, 0], left: [-1, 0], up: [0, 1], down: [0, -1] };
  const img: P = turned.reduce((p, [n, w]) => [p[0] + n * dirs[w][0], p[1] + n * dirs[w][1]] as P, a);
  const say = (ps: Array<[number, string]>) => ps.map(([n, w]) => `${units(n)} ${w}`).join(' and ');
  const turnName = q === 'half' ? 'A half turn' : `A quarter turn ${q === 'cw' ? 'clockwise' : 'counter-clockwise'}`;
  const rule = q === 'half' ? 'right ↔ left and up ↔ down' : q === 'cw' ? 'right → down, down → left, left → up, up → right' : 'right → up, up → left, left → down, down → right';
  return [
    ...(r === 'cw270' || r === 'ccw270' ? [`A turn of ${ROT_TEXT[r]} ends in the same place as a turn of $90^\\circ$ ${q === 'cw' ? 'clockwise' : 'counter-clockwise'}.`] : []),
    `From $${A}${ptx(a[0], a[1])}$, vertex $${B}$ is ${say(parts)}.`,
    `${turnName} changes each direction: ${rule}. So from $${A}$, $${prime(B)}$ is ${say(turned)}.`,
    `$${prime(B)}${ptx(img[0], img[1])}$`,
  ];
}

/** A right triangle with the right angle at A and legs along the grid lines. */
function rightTriangle(rng: Rng): P[] {
  const a: P = [rng.int(-3, 3), rng.int(-3, 3)];
  const h = rng.int(2, 4) * rng.sign();
  const v = rng.int(2, 4) * rng.sign();
  return [a, [a[0] + h, a[1]], [a[0], a[1] + v]];
}

const ROT_CTX = [
  (w: string) => `${w} is animating a windmill blade in a video game.`,
  (w: string) => `${w} is designing a pinwheel pattern on a Cartesian plane.`,
  () => 'A door on a floor plan swings open about its hinge, which is at vertex $A$.',
  (w: string) => `${w} turns a puzzle piece on a Cartesian plane.`,
  () => 'A robot arm in a factory turns about the joint at vertex $A$.',
];

const rotate = skill({
  id: 'm6-rotate',
  name: 'Rotations about a vertex',
  description: 'Rotate a polygon 90°, 180° or 270° clockwise or counter-clockwise about one of its vertices, and describe the angle and direction of a rotation.',
  outcomes: ['CG1'],
  lessonId: 'm6-8-3',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const mode = d === 1 ? 'right-triangle' : d === 2 ? 'general' : rng.weighted([['describe', 3], ['two-step', 2]] as const);

    if (mode === 'right-triangle') {
      for (;;) {
        const pts = rightTriangle(rng);
        const r = rng.pick(['cw90', 'ccw90', 'r180'] as const);
        const img = pts.map(rotFn(r, pts[0]));
        if ([...pts, ...img].some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) continue;
        const i = rng.int(1, 2);
        const L = LETTERS[i];
        return {
          prompt: `${rng.pick(ROT_CTX)(who)} Rotate triangle $ABC$ **${ROT_TEXT[r]}** about vertex $A$. What are the coordinates of $${prime(L)}$, the image of vertex $${L}$?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
          parts: [pointPart(img[i], `$${prime(L)}$ =`)],
          hints: [
            'The centre of rotation is $A$. It does not move, and every other point stays the same distance from $A$.',
            r === 'r180' ? 'A half turn points each side the opposite way: right becomes left, up becomes down.' : `Turn the side $A${L}$ a quarter turn ${r === 'cw90' ? 'clockwise (the way clock hands move)' : 'counter-clockwise'}. A side pointing ${i === 1 ? (pts[1][0] > pts[0][0] ? 'right' : 'left') : pts[2][1] > pts[0][1] ? 'up' : 'down'} will point ${turnDir(i === 1 ? (pts[1][0] > pts[0][0] ? 'right' : 'left') : pts[2][1] > pts[0][1] ? 'up' : 'down', asQuarter(r))}.`,
          ],
          solution: rotateSteps('A', pts[0], L, pts[i], r),
          answerDisplay: `$${ptx(img[i][0], img[i][1])}$`,
        };
      }
    }

    if (mode === 'general') {
      for (;;) {
        const pts = placeShape(rng, rng.int(-3, 1), rng.int(-3, 1));
        const n = pts.length;
        const c = rng.int(0, n - 1);
        const r = rng.pick(['cw90', 'ccw90', 'r180', 'cw270', 'ccw270'] as const);
        const img = pts.map(rotFn(r, pts[c]));
        if ([...pts, ...img].some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) continue;
        const ask = rng.sample(pts.map((_, k) => k).filter((k) => k !== c), 2).sort();
        const C = LETTERS[c];
        return {
          prompt: `${rng.pick(SHAPE_CTX)(who, shapeWord(n))} Rotate ${shapeWord(n)} $${nameOf(n)}$ **${ROT_TEXT[r]}** about vertex $${C}$. What are the coordinates of ${ask.map((k) => `$${prime(LETTERS[k])}$`).join(' and ')}?`,
          figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
          parts: ask.map((k) => pointPart(img[k], `$${prime(LETTERS[k])}$ =`)),
          hints: [
            `Vertex $${C}$ is the centre of rotation, so it does not move. Describe how to get from $${C}$ to each vertex: how far right or left, and how far up or down.`,
            `Turn each direction ${asQuarter(r) === 'half' ? 'a half turn' : `a quarter turn ${asQuarter(r) === 'cw' ? 'clockwise' : 'counter-clockwise'}`}${r === 'cw270' || r === 'ccw270' ? ` (a $270^\\circ$ turn one way is a $90^\\circ$ turn the other way)` : ''}. Then count from $${C}$ again.`,
          ],
          solution: ask.flatMap((k, j) => rotateSteps(C, pts[c], LETTERS[k], pts[k], r).slice(j > 0 && (r === 'cw270' || r === 'ccw270') ? 1 : 0)),
          answerDisplay: ask.map((k) => `$${prime(LETTERS[k])}${ptx(img[k][0], img[k][1])}$`).join(', '),
        };
      }
    }

    if (mode === 'describe') {
      for (;;) {
        const pts = placeShape(rng, rng.int(-3, 1), rng.int(-3, 1));
        const n = pts.length;
        const c = rng.int(0, n - 1);
        const turn = rng.pick(['cw', 'ccw', 'half'] as const);
        const r: Rot = turn === 'cw' ? 'cw90' : turn === 'ccw' ? 'ccw90' : 'r180';
        const img = pts.map(rotFn(r, pts[c]));
        if ([...pts, ...img].some((p) => Math.abs(p[0]) > 6 || Math.abs(p[1]) > 6)) continue;
        const set: Rot[] = rng.chance(0.5) ? ['cw90', 'r180', 'cw270'] : ['ccw90', 'r180', 'ccw270'];
        const idx = set.findIndex((x) => asQuarter(x) === turn);
        const choices = set.map((x) => `${ROT_TEXT[x]} about vertex $${LETTERS[c]}$`);
        const k = (c + 1) % n;
        const C = LETTERS[c];
        const K = LETTERS[k];
        return {
          prompt: `${shapeWord(n).charAt(0).toUpperCase() + shapeWord(n).slice(1)} $${nameOf(n)}$ was rotated about vertex $${C}$ to make the image $${LETTERS.slice(0, n).map((L, j) => (j === c ? L : prime(L))).join('')}$. Which describes the rotation?`,
          figure: cartFigure({
            polys: [
              { pts, color: 'brand', labels: LETTERS },
              { pts: img, color: 'accent', labels: LETTERS.slice(0, n).map((L, j) => (j === c ? '' : prime(L))) },
            ],
          }),
          parts: [{ answer: fixedChoice(choices, idx) }],
          hints: [
            `$${C}$ does not move. Look at side $${C}${K}$ and its image $${C}${prime(K)}$.`,
            'Clockwise is the way the hands of a clock move. A quarter turn is $90^\\circ$, a half turn is $180^\\circ$, and three quarter turns are $270^\\circ$.',
          ],
          solution: [
            `From $${C}$, vertex $${K}$ is ${moveWords(pts[k][0] - pts[c][0], pts[k][1] - pts[c][1])}, and $${prime(K)}$ is ${moveWords(img[k][0] - pts[c][0], img[k][1] - pts[c][1])}.`,
            turn === 'half'
              ? 'Every direction is reversed, so the shape turned a half turn: $180^\\circ$.'
              : `Each direction turned a quarter turn ${turn === 'cw' ? 'clockwise' : 'counter-clockwise'} (for example, ${turn === 'cw' ? 'right became down' : 'right became up'}).${set[idx] === 'cw270' || set[idx] === 'ccw270' ? ` A quarter turn ${turn === 'cw' ? 'clockwise' : 'counter-clockwise'} ends in the same place as three quarter turns the other way: ${ROT_TEXT[set[idx]]}.` : ''}`,
            `The rotation is ${choices[idx]}.`,
          ],
          answerDisplay: choices[idx],
        };
      }
    }

    // Two steps: rotate about a vertex, then translate.
    for (;;) {
      const pts = placeShape(rng, rng.int(-3, 1), rng.int(-3, 1), SHAPES.filter((s) => s.length === 3));
      const r = rng.pick(['cw90', 'ccw90', 'r180', 'cw270', 'ccw270'] as const);
      const rot = pts.map(rotFn(r, pts[0]));
      const dx = rng.nonZero(-4, 4);
      const dy = rng.chance(0.3) ? 0 : rng.nonZero(-4, 4);
      const fin = rot.map(([x, y]) => [x + dx, y + dy] as P);
      if ([...pts, ...rot, ...fin].some((p) => Math.abs(p[0]) > 7 || Math.abs(p[1]) > 7)) continue;
      const i = rng.int(1, 2);
      const L = LETTERS[i];
      const steps = rotateSteps('A', pts[0], L, pts[i], r);
      return {
        prompt: `${rng.pick(ROT_CTX)(who)} Triangle $ABC$ is rotated **${ROT_TEXT[r]}** about vertex $A$. Then the image is translated **${moveWords(dx, dy)}**. Where does vertex $${L}$ end up?`,
        figure: cartFigure({ polys: [{ pts, color: 'brand', labels: LETTERS }] }),
        parts: [pointPart(fin[i], `Final position of $${L}$ =`)],
        hints: ['Do the rotation first. $A$ stays put; find the image of the vertex by turning its directions from $A$.', 'Then slide that point: right or left changes $x$, up or down changes $y$.'],
        solution: [
          ...steps.slice(0, -1),
          `After the rotation, $${L}$ is at $${ptx(rot[i][0], rot[i][1])}$.`,
          `Translate ${moveWords(dx, dy)}: $x = ${rot[i][0]} ${dx >= 0 ? '+' : '-'} ${Math.abs(dx)} = ${fin[i][0]}$${dy ? `, $y = ${rot[i][1]} ${dy > 0 ? '+' : '-'} ${Math.abs(dy)} = ${fin[i][1]}$` : `, and $y$ stays $${fin[i][1]}$`}.`,
          `Vertex $${L}$ ends up at $${ptx(fin[i][0], fin[i][1])}$.`,
        ],
        answerDisplay: `$${ptx(fin[i][0], fin[i][1])}$`,
      };
    }
  },
});

export const CARTESIAN_SKILLS: SkillDef[] = [cartesianPoints, translateReflect, rotate];
