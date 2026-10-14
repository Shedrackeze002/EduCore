import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle, triangle } from '@/video/triangles.ts';

/** An L-shaped room, 8 m by 6 m with a 3 m by 2 m corner cut out, its six walls labelled. */
const room: Part = {
  points: { a: [0, 0], b: [8, 0], c: [8, 4], d: [5, 4], e: [5, 6], f: [0, 6] },
  items: [
    { kind: 'region', id: 'fill', points: ['a', 'b', 'c', 'd', 'e', 'f'], tone: 'brand', group: 'walls' },
    { kind: 'line', id: 'w1', from: 'a', to: 'b', label: '8', labelSide: 'right', group: 'walls' },
    { kind: 'line', id: 'w2', from: 'b', to: 'c', label: '4', labelSide: 'right', group: 'walls' },
    { kind: 'line', id: 'w3', from: 'c', to: 'd', label: '3', labelSide: 'right', labelAt: 0.25, group: 'walls' },
    { kind: 'line', id: 'w4', from: 'd', to: 'e', label: '2', labelSide: 'right', group: 'walls' },
    { kind: 'line', id: 'w5', from: 'e', to: 'f', label: '5', labelSide: 'right', group: 'walls' },
    { kind: 'line', id: 'w6', from: 'f', to: 'a', label: '6', labelSide: 'right', group: 'walls' },
  ],
};

const video: Explainer = {
  id: 'm104-7-1',
  lessonId: 'm104-7-1',
  title: 'Perimeter, Part 1: Around the Edge',
  thumbnailTitle: 'Perimeter',
  thumbnail: 'room',
  summary: 'Perimeter as the distance around a shape, fencing a rectangular dog run (P = 2(l + w)), edging a triangular flower bed, baseboard for an L-shaped room with six sides, and finding a missing side from the perimeter. Part 2 covers circumference.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.1 · Part 1', title: 'Perimeter', subtitle: 'The distance around' }],
      lines: [
        { say: 'How much fencing goes around a dog run? How much baseboard goes around a room? Each of these jobs needs the distance around a shape.', show: 'title' },
        { say: 'In this video, you will find the perimeter of shapes with straight sides.' },
      ],
    },
    {
      chapter: 'A rectangle',
      layout: 'split',
      leftWidth: 480,
      left: [figure('run', [rectangle({ w: 12, h: 5, labels: { w: '12\\text{ m}', h: '5\\text{ m}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P = 12 + 5 + 12 + 5 = 34\\text{ m}', 'P = 2(l + w) = 2(12 + 5) = 34'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding only two sides', md: '$12 + 5 = 17$ is only **half** of the way around. Trace all four sides.' },
      ],
      lines: [
        { say: 'The perimeter is the total distance around the outside of a shape. It is a length, measured in units like metres. To find it, add the lengths of all the sides.' },
        { say: 'A rectangular dog run is twelve metres long and five metres wide. Its four sides are twelve, five, twelve and five: 34 metres of fencing.', show: ['run.shape', 'm.0'], focus: 'm.0' },
        { say: 'A shortcut: add the length and the width, then double. For a square, the perimeter is four times the side.', show: 'm.1', focus: 'm.1' },
        { say: 'Twelve plus five, seventeen, is only half of the way around. A rectangle has four sides, so trace all the way around.', show: 'oops' },
      ],
    },
    {
      chapter: 'Other shapes',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('sh', [
          triangle({ name: 'tri', A: [0, 0], B: [5.8, 0], C: [3.365, 2.514], sides: { AB: '5.8', BC: '3.5', CA: '4.2' } }),
          { points: Object.fromEntries(Object.entries(room.points).map(([k, [x, y]]) => [k, [x + 8, y]])), items: room.items },
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4.2 + 3.5 + 5.8 = 13.5\\text{ m}', '8 + 4 + 3 + 2 + 5 + 6', '= 28\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Missing a side', md: 'An L-shaped room has **six** sides. Count them before you add.' },
      ],
      lines: [
        { say: 'For any shape with straight sides, add every side, all in the same unit. A triangular flower bed has sides of 4.2, 3.5 and 5.8 metres: 13.5 metres of edging.', show: ['sh.tri-shape', 'm.0'], focus: 'm.0' },
        { say: 'This L-shaped room has six walls: eight, four, three, two, five and six metres. Its baseboard is 28 metres long.', show: ['sh.walls', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'An L-shaped room has six sides, not four, so count the sides before you add.', show: 'oops' },
      ],
    },
    {
      chapter: 'A missing side',
      layout: 'split',
      leftWidth: 480,
      left: [figure('gap', [rectangle({ w: 14, h: 9, labels: { w: '14\\text{ m}', h: '?' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['14 + 14 = 28', '46 - 28 = 18', '18 \\div 2 = 9\\text{ m}', '14 + 9 + 14 + 9 = 46 \\;\\checkmark'] }],
      lines: [
        { say: 'Sometimes you know the perimeter and need a side. A rectangular dog run uses 46 metres of fencing, and it is fourteen metres long. How wide is it?', show: 'gap.shape' },
        { say: 'The two long sides use fourteen plus fourteen: 28 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves 46 minus 28, eighteen metres, for the two short sides. So each short side is nine metres.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Check: fourteen plus nine, plus fourteen plus nine, is 46.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square patio has sides of $3.5\\text{ m}$. What is its perimeter?',
          choices: ['$14\\text{ m}$', '$7\\text{ m}$', '$12.25\\text{ m}$', '$10.5\\text{ m}$'],
          answer: 0,
          working: 'A square has four equal sides: $P = 4 \\times 3.5 = 14\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A square patio has sides of 3.5 metres. What is its perimeter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A square has four equal sides, so four times 3.5 is fourteen metres. B adds only two sides.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Perimeter: add all the sides, in the same unit.', 'Rectangle: $P = 2(l + w)$. Square: $P = 4 \\times \\text{side}$.', 'Missing side: subtract the sides you know.'] }],
      lines: [
        { say: 'Let’s sum up. The perimeter is the distance around a shape: add all the sides, in the same unit.', show: 'sum.0' },
        { say: 'For a rectangle, double the length plus the width. For a square, four times the side.', show: 'sum.1' },
        { say: 'And to find a missing side, subtract the sides you know from the perimeter. In part two, we find the distance around a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
