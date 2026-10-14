import type { Explainer } from '@/video/script.ts';
import { figure, triangularPrism, type Part } from '@/video/solids.ts';

/** The side of a pool, 12 m long and 1 m to 2.2 m deep (depths stretched so they show). */
const side: Part = {
  points: { a: [0, 0], b: [12, 0], c: [12, -5.5], d: [0, -2.5] },
  items: [
    { kind: 'region', id: 'water', points: ['a', 'b', 'c', 'd'], tone: 'adj', shade: 0.25, group: 'pool' },
    { kind: 'line', id: 'top', from: 'a', to: 'b', tone: 'adj', label: '12\\text{ m}', labelSide: 'left', group: 'pool' },
    { kind: 'line', id: 'deep', from: 'b', to: 'c', tone: 'opp', label: '2.2\\text{ m}', labelSide: 'left', group: 'pool' },
    { kind: 'line', id: 'floor', from: 'c', to: 'd', group: 'pool' },
    { kind: 'line', id: 'shallow', from: 'd', to: 'a', tone: 'opp', label: '1\\text{ m}', labelSide: 'left', group: 'pool' },
  ],
};

const video: Explainer = {
  id: 'm203-3-1-b',
  lessonId: 'm203-3-1',
  title: 'Volume and Capacity, Part 2: Triangular and Other Prisms',
  thumbnailTitle: 'Triangular and Other Prisms',
  thumbnail: 'pool',
  summary: 'Finding the base of a prism lying on its side: an A-frame tent with 8 ft by 6 ft triangular ends, 10 ft long (240 ft³), and a pool 12 m long and 5 m wide whose floor slopes from 1 m to 2.2 m deep (96 m³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.1 · Part 2', title: 'Triangular and Other Prisms', subtitle: 'Find the base first' }],
      lines: [
        { say: 'Tents, ramps, troughs and swimming pools are prisms too, even when they lie on their side. The trick is to find the right base.', show: 'title' },
        { say: 'In this video, you will find the volume of a tent, and of a pool with a sloping floor.' },
      ],
    },
    {
      chapter: 'Which face is the base?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'k', tone: 'key', title: 'The base of a prism', md: 'The **base** of a prism is the shape that runs all the way through it, even when the prism lies on its side. Multiply its area by the length the shape runs through.' }],
      lines: [
        { say: 'The base of a prism is not always the face on the ground. It is the shape that runs all the way through the prism, from one end to the other.', show: 'k' },
        { say: 'For a tent or a ramp, the base is the triangular end. Multiply its area by the length of the prism.' },
      ],
    },
    {
      chapter: 'An A-frame tent',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tent', [triangularPrism({ b: 8, t: 6, l: 10, labels: { b: '8\\text{ ft}', t: '6\\text{ ft}', l: '10\\text{ ft}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{end: } \\tfrac12 \\times 8 \\times 6 = 24 \\text{ ft}^2', 'V = 24 \\times 10 = 240 \\text{ ft}^3'] }],
      lines: [
        { say: 'An A-frame tent has triangular ends with a base of eight feet, and a height of six feet. The tent is ten feet long. What volume of air is inside?', show: ['tent.shape', 'tent.b', 'tent.t', 'tent.t-mark', 'tent.l'] },
        { say: 'The base of this prism is the triangular end: one half times eight times six, twenty-four square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'It runs ten feet through the tent, so the volume is twenty-four times ten: 240 cubic feet of air.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A pool with a sloping floor',
      layout: 'split',
      leftWidth: 620,
      left: [figure('pl', [side], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{side: } \\tfrac12(1 + 2.2) \\times 12', '= 1.6 \\times 12 = 19.2 \\text{ m}^2', 'V = 19.2 \\times 5 = 96 \\text{ m}^3'] }],
      lines: [
        { say: 'A pool is twelve metres long and five metres wide. The floor slopes evenly from one metre deep to 2.2 metres deep. What is its volume? The side of the pool is a trapezoid, and the pool is that trapezoid pushed five metres across.', show: 'pl.pool' },
        { say: 'The area of a trapezoid is the average of the parallel sides, times the distance between them. The average depth is one plus 2.2, over two, which is 1.6. Times twelve, that is 19.2 square metres.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Multiply by the width: 19.2 times five is ninety-six cubic metres of water.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A wheelchair ramp is a triangular prism. Its side is a right triangle with a run of $3.6$ m and a rise of $0.3$ m, and the ramp is $1.2$ m wide. How much concrete fills it?',
          choices: ['$0.648\\ \\text{m}^3$', '$1.296\\ \\text{m}^3$', '$5.1\\ \\text{m}^3$', '$0.54\\ \\text{m}^3$'],
          answer: 0,
          working: 'Side: $\\tfrac12 \\times 3.6 \\times 0.3 = 0.54\\ \\text{m}^2$. $V = 0.54 \\times 1.2 = 0.648\\ \\text{m}^3$. B forgets the one half.',
        },
      ],
      lines: [
        { say: 'Your turn. A wheelchair ramp is a triangular prism. Its side is a right triangle with a run of 3.6 metres and a rise of 0.3 metres, and the ramp is 1.2 metres wide. How much concrete fills it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The triangular side is one half times 3.6 times 0.3, which is 0.54 square metres. Times the width, 1.2, that is 0.648 cubic metres. B forgets the one half.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The base is the shape that runs all the way through.', 'Triangular prism: $\\tfrac12 bh \\times$ length.', 'A sloping pool is a trapezoidal prism.'] }],
      lines: [
        { say: 'Let’s sum up. The base of a prism is the shape that runs all the way through it.', show: 'sum.0' },
        { say: 'For a triangular prism, multiply one half b h by the length.', show: 'sum.1' },
        { say: 'And a pool with a sloping floor is a trapezoidal prism. In part three, we change volume into capacity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
