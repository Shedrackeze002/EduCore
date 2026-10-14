import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Named points, and a line between two of them. */
const line = (id: string, from: string, to: string, tone: DiagramTone, o: { dashed?: boolean; weight?: number; group?: string } = {}): DiagramItem => ({ kind: 'line', id, from, to, tone, ...o });

/** A 6 by 3.5 rectangle with its two lines of symmetry (`sv`, `sh`). */
function rect(diagonal: boolean): Part {
  const points: Record<string, P> = { a: [0, 0], b: [6, 0], c: [6, 3.5], d: [0, 3.5], v0: [3, -0.8], v1: [3, 4.3], h0: [-0.8, 1.75], h1: [6.8, 1.75] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: ['a', 'b', 'c', 'd'], tone: 'brand', shade: 0.16, group: 'shape' },
    { kind: 'curve', id: 'edge', points: ['a', 'b', 'c', 'd'], closed: true, weight: 3, group: 'shape' },
  ];
  if (!diagonal) {
    items.push(line('sv', 'v0', 'v1', 'good', { dashed: true }), line('sh', 'h0', 'h1', 'good', { dashed: true }));
    return { points, items };
  }
  // Fold along the diagonal from a to c: each corner lands on its mirror image across it.
  const [ux, uy] = [6 / Math.hypot(6, 3.5), 3.5 / Math.hypot(6, 3.5)];
  const flip = ([x, y]: P): P => {
    const k = 2 * (x * ux + y * uy);
    return [k * ux - x, k * uy - y];
  };
  Object.assign(points, { d0: [-0.6, -0.35], d1: [6.6, 3.85], fb: flip([6, 0]), fd: flip([0, 3.5]) });
  items.push(
    line('sd', 'd0', 'd1', 'bad', { dashed: true }),
    { kind: 'curve', id: 'folded', points: ['a', 'fb', 'c', 'fd'], closed: true, tone: 'bad', dashed: true, weight: 2.5 },
  );
  return { points, items };
}

/** The letter H (three thick strokes) and its lines of symmetry, `hv` and `hh`. */
const letterH: Part = {
  points: { h1: [1.75, 1], h2: [1.75, 6], h3: [5.25, 1], h4: [5.25, 6], h5: [1.75, 3.5], h6: [5.25, 3.5], hv0: [3.5, 0.2], hv1: [3.5, 6.8], hh0: [0.7, 3.5], hh1: [6.3, 3.5] },
  items: [
    line('h-left', 'h1', 'h2', 'ink', { weight: 14, group: 'H' }),
    line('h-right', 'h3', 'h4', 'ink', { weight: 14, group: 'H' }),
    line('h-bar', 'h5', 'h6', 'ink', { weight: 14, group: 'H' }),
    line('hv', 'hv0', 'hv1', 'good', { dashed: true }),
    line('hh', 'hh0', 'hh1', 'good', { dashed: true }),
  ],
};

/** A square floor tile with a diamond inside, 9 units to the right of the H, and its 4 lines of symmetry (group `tl`). */
const tile: Part = (() => {
  const x = 9;
  const points: Record<string, P> = {
    t1: [x + 1, 1], t2: [x + 6, 1], t3: [x + 6, 6], t4: [x + 1, 6],
    m1: [x + 3.5, 1], m2: [x + 6, 3.5], m3: [x + 3.5, 6], m4: [x + 1, 3.5],
    l1a: [x + 3.5, 0.2], l1b: [x + 3.5, 6.8], l2a: [x + 0.2, 3.5], l2b: [x + 6.8, 3.5], l3a: [x + 0.4, 0.4], l3b: [x + 6.6, 6.6], l4a: [x + 0.4, 6.6], l4b: [x + 6.6, 0.4],
  };
  return {
    points,
    items: [
      { kind: 'region', id: 'tile-fill', points: ['t1', 't2', 't3', 't4'], tone: 'brand', shade: 0.12, group: 'tile' },
      { kind: 'curve', id: 'tile-edge', points: ['t1', 't2', 't3', 't4'], closed: true, weight: 3, group: 'tile' },
      { kind: 'region', id: 'diamond-fill', points: ['m1', 'm2', 'm3', 'm4'], tone: 'theta', shade: 0.25, group: 'tile' },
      { kind: 'curve', id: 'diamond-edge', points: ['m1', 'm2', 'm3', 'm4'], closed: true, tone: 'theta', weight: 3, group: 'tile' },
      line('tl1', 'l1a', 'l1b', 'good', { dashed: true, group: 'tl' }),
      line('tl2', 'l2a', 'l2b', 'good', { dashed: true, group: 'tl' }),
      line('tl3', 'l3a', 'l3b', 'good', { dashed: true, group: 'tl' }),
      line('tl4', 'l4a', 'l4b', 'good', { dashed: true, group: 'tl' }),
    ],
  };
})();

const video: Explainer = {
  id: 'm104-8-3',
  lessonId: 'm104-8-3',
  title: 'Symmetry and Transformations, Part 1: Lines of Symmetry',
  thumbnailTitle: 'Lines of Symmetry',
  thumbnail: 'hx',
  summary: 'Lines of symmetry as fold lines: the 2 lines of a rectangle, why its diagonal is not one, the letter H on a sign, and a floor tile whose 4 lines must work for the square and the diamond inside it. Part 2 covers slides, flips and turns.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.3 · Part 1', title: 'Lines of Symmetry', subtitle: 'Fold it, and the halves match' }],
      lines: [
        { say: 'Logos, quilts, floor tiles and road signs often look balanced. Designers make them that way with symmetry.', show: 'title' },
        { say: 'In this video, you will find the lines of symmetry of shapes and designs.' },
      ],
    },
    {
      chapter: 'Lines of symmetry',
      layout: 'split',
      leftWidth: 560,
      left: [figure('rect', [rect(false)])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Line of symmetry', md: 'A fold line. When you fold a shape along it, the two halves match exactly. A shape can have no lines of symmetry, one line, or many.' }],
      lines: [
        { say: 'A line of symmetry is a fold line. When you fold a shape along it, the two halves match exactly. A shape can have no lines of symmetry, one line, or many.', show: ['rect.shape', 'def'] },
        { say: 'Fold this rectangle along a line up and down its middle. The left half lands exactly on the right half, so that is a line of symmetry.', show: 'rect.sv', focus: 'rect.sv' },
        { say: 'Fold it along a line across its middle, and the top half lands on the bottom half. So a rectangle has two lines of symmetry.', show: 'rect.sh', focus: 'rect.sh' },
      ],
    },
    {
      chapter: 'The diagonal',
      layout: 'split',
      leftWidth: 560,
      left: [figure('diag', [rect(true)])],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The diagonal of a rectangle', md: 'A diagonal cuts a rectangle into two equal pieces, but it is **not** a line of symmetry: the corners do not match when you fold.' }],
      lines: [
        { say: 'What about the diagonal, from corner to corner? It cuts the rectangle into two equal triangles, so it looks like it should work.', show: ['diag.shape', 'diag.sd'] },
        { say: 'But fold along it, and the folded half lands here, sticking out past the edges. The corners do not match, so a diagonal is not a line of symmetry.', show: ['diag.folded', 'oops'], focus: 'diag.folded' },
        { say: 'Two equal pieces is not enough. The halves must land exactly on each other.' },
      ],
    },
    {
      chapter: 'Letters and designs',
      layout: 'center',
      main: [figure('hx', [letterH, tile], 400)],
      lines: [
        { say: 'How many lines of symmetry does this letter H on a sign have?', show: 'hx.H' },
        { say: 'Fold it left to right, along a line down the middle. The two halves match. Fold it top to bottom, along a line across the middle. The two halves match again. A slanted fold does not work, so the letter H has two lines of symmetry.', show: ['hx.hv', 'hx.hh'], focus: ['hx.hv', 'hx.hh'] },
        { say: 'For a design, a line of symmetry must work for every part: the outside shape and everything drawn inside it. This floor tile is a square with a diamond inside.', show: 'hx.tile' },
        { say: 'A square has four lines of symmetry: up and down, across, and the two diagonals. The diamond also matches along all four of those lines, so the tile has four lines of symmetry.', show: 'hx.tl', focus: 'hx.tl' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangular road sign has $3$ equal sides and nothing written on it. How many lines of symmetry does it have?',
          choices: ['$3$', '$1$', '$0$', '$6$'],
          answer: 0,
          working: 'A fold from each corner to the middle of the opposite side makes the halves match: $3$ lines.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular road sign has three equal sides, and nothing written on it. How many lines of symmetry does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, three. A fold from each corner to the middle of the opposite side makes the two halves match, and there are three corners.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line of symmetry is a fold line where both halves match exactly.', 'A rectangle has 2 lines; its diagonals are not lines of symmetry.', 'In a design, the line must work for every part.'] }],
      lines: [
        { say: 'Let’s sum up. A line of symmetry is a fold line where both halves match exactly.', show: 'sum.0' },
        { say: 'A rectangle has two lines of symmetry, and its diagonals are not lines of symmetry.', show: 'sum.1' },
        { say: 'And in a design, the line must work for every part. In part two, we slide, flip and turn shapes on a grid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
