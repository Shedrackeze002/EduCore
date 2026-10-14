import type { DiagramItem, Explainer } from '@/video/script.ts';
import { box, figure, type Part } from '@/video/solids.ts';

/** On the front face of a 4 × 4 × 4 cube: a corner cube, the two edge cubes beside it, and the four face cubes in the middle. */
const kinds: Part = {
  points: { c0: [0, 0], c1: [1, 0], c2: [1, 1], c3: [0, 1], e0: [1, 0], e1: [3, 0], e2: [3, 1], e3: [1, 1], f0: [1, 1], f1: [3, 1], f2: [3, 3], f3: [1, 3] },
  items: [
    { kind: 'region', id: 'corner', points: ['c0', 'c1', 'c2', 'c3'], tone: 'opp', shade: 0.6 },
    { kind: 'region', id: 'edge', points: ['e0', 'e1', 'e2', 'e3'], tone: 'adj', shade: 0.55 },
    { kind: 'region', id: 'face', points: ['f0', 'f1', 'f2', 'f3'], tone: 'good', shade: 0.45 },
  ],
};

/** The net of a die: the row 2, ?, 5, 4, with 6 above the 4 and 1 below it. */
const faces: [string, number, number, string][] = [
  ['two', 0, 1, '2'],
  ['q', 1, 1, '?'],
  ['five', 2, 1, '5'],
  ['four', 3, 1, '4'],
  ['six', 3, 2, '6'],
  ['one', 3, 0, '1'],
];
const net: Part = { points: {}, items: [] };
for (const [id, x, y, tex] of faces) {
  Object.assign(net.points, { [`${id}0`]: [x, y], [`${id}1`]: [x + 1, y], [`${id}2`]: [x + 1, y + 1], [`${id}3`]: [x, y + 1], [`${id}c`]: [x + 0.5, y + 0.5] });
  const corners = [0, 1, 2, 3].map((i) => `${id}${i}`);
  net.items.push(
    { kind: 'region', id, points: corners, tone: id === 'q' ? 'theta' : 'brand', shade: 0.2, group: 'net' } satisfies DiagramItem,
    { kind: 'curve', id: `${id}-edge`, points: corners, closed: true, group: 'net' },
    { kind: 'label', id: `${id}-n`, at: `${id}c`, tex, tone: 'ink', place: 'center', group: 'net' },
  );
}

const video: Explainer = {
  id: 'm103-6-4-b',
  lessonId: 'm103-6-4',
  title: 'Spatial Puzzles, Part 2: Painted Cubes and Dice',
  thumbnailTitle: 'Painted Cubes and Dice',
  thumbnail: 'cube',
  summary: 'The painted cube puzzle, sorting the small cubes by position (corners, edges, faces and inside) and checking that the groups add to n³, and dice puzzles: opposite faces add to 7, hidden faces in a tower, and completing a cube net.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.4 · Part 2', title: 'Painted Cubes and Dice', subtitle: 'Sort by position, then check the total' }],
      lines: [
        { say: 'A cube is painted on all six faces, then cut into small cubes. How many small cubes have paint on three faces? On none?', show: 'title' },
        { say: 'In this video, you will solve the painted cube puzzle, and puzzles with dice.' },
      ],
    },
    {
      chapter: 'The painted cube',
      layout: 'split',
      leftWidth: 440,
      left: [figure('cube', [box({ l: 4, w: 4, h: 4, cells: 4 }), kinds])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Position', 'Painted', 'How many'],
          rows: [
            ['[[opp:Corner]]', '3 faces', '$8$'],
            ['[[adj:Edge]]', '2 faces', '$12(n - 2)$'],
            ['[[good:Face]]', '1 face', '$6(n - 2)^2$'],
            ['Inside', 'none', '$(n - 2)^3$'],
          ],
        },
      ],
      lines: [
        { say: 'Sort the small cubes by where they sit. Here, a cube four units on each edge is cut into one-unit cubes.', show: ['cube.shape', 'cube.cells'] },
        { say: 'A corner cube has three painted faces, and there are always eight corners.', show: ['cube.corner', 't.0'], focus: ['cube.corner', 't.0'] },
        { say: 'An edge cube, not at a corner, has two. Each of the twelve edges has n minus two of them.', show: ['cube.edge', 't.1'], focus: ['cube.edge', 't.1'] },
        { say: 'A cube in the middle of a face has one, and the cubes inside have none.', show: ['cube.face', 't.2', 't.3'], focus: ['cube.face', 't.2', 't.3'] },
      ],
    },
    {
      chapter: 'A four-centimetre cube',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{corners: } 8', '\\text{edges: } 12 \\times (4 - 2) = 24', '\\text{faces: } 6 \\times 2^2 = 24', '\\text{inside: } 2^3 = 8', '8 + 24 + 24 + 8 = 64 = 4^3 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the total', md: 'The four groups must add to $n^3$. If they do not, a group was missed or counted twice.' },
      ],
      lines: [
        { say: 'A wooden cube four centimetres on each edge is painted, then cut into one-centimetre cubes. There are eight corners.', show: 'm.0', focus: 'm.0' },
        { say: 'Each of the twelve edges has two middle cubes: 24. And each of the six faces has a two-by-two middle: another 24.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Inside is a two-by-two-by-two cube: eight cubes with no paint.', show: 'm.3', focus: 'm.3' },
        { say: 'Check: the groups add to 64, which is four cubed, so every cube is counted once.', show: ['m.4', 'tip'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Dice',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A standard die', md: 'Opposite faces add to $7$: $1$ and $6$, $2$ and $5$, $3$ and $4$. All six faces add to $3 \\times 7 = 21$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{two lower dice: } 7 + 7 = 14', '\\text{top die: } 7 - 4 = 3', '14 + 3 = 17'] },
      ],
      lines: [
        { say: 'On a standard die, opposite faces always add to seven: one and six, two and five, three and four. So all six faces add to 21.', show: 'key' },
        { say: 'Three dice are stacked in a tower, and the top shows four. What is the total of the hidden faces? Each lower die hides its top and bottom, which are opposite: seven each, fourteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The top die hides only its bottom, opposite the four: seven minus four, three. So the hidden faces add to seventeen.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Completing a net',
      layout: 'split',
      leftWidth: 480,
      left: [figure('net', [net])],
      right: [{ kind: 'bullets', id: 'b', items: ['One apart in a row: opposite faces.', '$2$ and $5$: $2 + 5 = 7$.', '$6$ and $1$: $6 + 1 = 7$.', '$?$ is opposite $4$: $7 - 4 = 3$.'] }],
      lines: [
        { say: 'A net is a flat pattern that folds into a cube. In a straight row of three squares, the first and third end up opposite each other.', show: ['net.net', 'b.0'] },
        { say: 'This net folds into a standard die. In the row, the two and the five are one square apart, so they are opposite: they add to seven.', show: 'b.1', focus: ['net.two', 'net.five', 'b.1'] },
        { say: 'The six and the one are above and below the four, one square apart, so they are opposite too.', show: 'b.2', focus: ['net.six', 'net.one', 'b.2'] },
        { say: 'That leaves the question mark and the four, also one square apart. So the question mark is seven minus four: three.', show: 'b.3', focus: ['net.q', 'net.four', 'b.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $3\\text{ cm}$ cube is painted on all six faces, then cut into $1\\text{ cm}$ cubes. How many small cubes have exactly **two** painted faces?',
          choices: ['$12$', '$8$', '$6$', '$1$'],
          answer: 0,
          working: 'Each of the $12$ edges has $3 - 2 = 1$ middle cube: $12 \\times 1 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. A three-centimetre cube is painted on all six faces, then cut into one-centimetre cubes. How many small cubes have exactly two painted faces? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each of the twelve edges has three minus two, one middle cube, so twelve. B counts the corners, which have three painted faces, and C counts the face centres, with one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Painted cube: $8$ corners, $12(n - 2)$ edges, $6(n - 2)^2$ faces, $(n - 2)^3$ inside.', 'Opposite faces of a die add to $7$.', 'In a net, squares one apart in a row are opposite.'] }],
      lines: [
        { say: 'Let’s sum up. Sort a painted cube by position: corners, edges, faces and inside. Then check that the groups add to n cubed.', show: 'sum.0' },
        { say: 'On a standard die, opposite faces add to seven.', show: 'sum.1' },
        { say: 'And in a cube net, squares one apart in a straight row become opposite faces. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
