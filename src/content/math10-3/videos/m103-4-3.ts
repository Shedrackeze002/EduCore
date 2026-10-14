import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const room = plane({ x: [0, 9], y: [0, 7], every: 0 });

const video: Explainer = {
  id: 'm103-4-3',
  lessonId: 'm103-4-3',
  title: 'Perimeter and Circumference, Part 1: Perimeter',
  thumbnailTitle: 'Perimeter',
  thumbnail: 'room',
  summary: 'Perimeter as the distance around a shape, the formulas for rectangles, squares and regular polygons, keeping the units the same, and the perimeter of an L-shaped room. Part 2 covers circumference and working backward.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.3 · Part 1', title: 'Perimeter', subtitle: 'The distance around a shape' }],
      lines: [
        { say: 'How much fencing goes around a pasture? How much baseboard goes around a room? Each of these jobs is about the distance around a shape.', show: 'title' },
        { say: 'In this video, you will find perimeters, including composite shapes. In part two, you will find circumferences, and work backward.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perimeter', md: 'The total distance around the outside edge of a shape. It is a length, in units such as metres, feet or inches.' },
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Perimeter'],
          rows: [
            ['rectangle', '$P = 2(l + w)$'],
            ['square', '$P = 4s$'],
            ['triangle', '$P = a + b + c$'],
            ['regular polygon, $n$ sides', '$P = ns$'],
          ],
        },
      ],
      lines: [
        { say: 'The perimeter of a shape is the total distance around its outside edge. It is a length, so it is measured in units like metres, feet or inches.', show: 'def' },
        { say: 'To find any perimeter, add the lengths of all the sides. For common shapes, there are shortcuts. A rectangle has two lengths and two widths, so its perimeter is two times l plus w. A square is four times its side.', show: ['t.0', 't.1'] },
        { say: 'For a triangle, add the three sides. And a regular polygon with n equal sides has a perimeter of n times the side.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Examples',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{deck: } P = 2(16 + 12) = 2(28) = 56\\text{ ft}', '\\text{flower bed: } P = 4.2 + 3.5 + 5.8 = 13.5\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'A table top $1.8\\text{ m}$ by $70\\text{ cm}$ has $P = 2(1.8 + 0.7) = 5\\text{ m}$, not $2(1.8 + 70)$.' },
      ],
      lines: [
        { say: 'A rectangular deck is sixteen feet long and twelve feet wide. Its perimeter is two times 28: 56 feet of railing.', show: 'm.0', focus: 'm.0' },
        { say: 'A triangular flower bed has sides of 4.2, 3.5 and 5.8 metres. Add them: 13.5 metres of edging.', show: 'm.1', focus: 'm.1' },
        { say: 'Before you add, every side must be in the same unit. A table top 1.8 metres by seventy centimetres has a perimeter of two times 1.8 plus 0.7: five metres.', show: 'oops' },
      ],
    },
    {
      chapter: 'An L-shaped room',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('room', [
          room,
          polyline(room, { id: 'walls', points: [[1, 1], [8, 1], [8, 4], [5, 4], [5, 6], [1, 6], [1, 1]], labels: ['7\\text{ m}', '3\\text{ m}', '3\\text{ m}', '2\\text{ m}', '4\\text{ m}', '5\\text{ m}'], sides: ['right', 'right', 'left', 'right', 'right', 'right'] }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['7 - 3 = 4, \\qquad 5 - 2 = 3', 'P = 7 + 3 + 3 + 2 + 4 + 5 = 24\\text{ m}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Corner cut-outs', md: 'A rectangle cut from a **corner** does not change the perimeter: $2(7 + 5) = 24\\text{ m}$ too.' },
      ],
      lines: [
        { say: 'A composite shape is made of simpler shapes joined together, like an L-shaped room. This room is a seven-by-five-metre rectangle, with a three-by-two corner cut out.', show: ['room.grid', 'room.walls-0', 'room.walls-5', 'room.walls-1', 'room.walls-3'], focus: ['room.walls-0', 'room.walls-5'] },
        { say: 'Sketch it, and label every outside edge. The missing sides are seven minus three, which is four, and five minus two, which is three.', show: ['room.walls-4', 'room.walls-2', 'm.0'], focus: ['room.walls-4', 'room.walls-2', 'm.0'] },
        { say: 'An L shape has six sides, not four. Add them all: 24 metres of baseboard.', show: 'm.1', focus: ['room.walls', 'm.1'] },
        { say: 'Here is a shortcut: cutting a rectangle out of a corner does not change the perimeter. The cut edges just move inward, so two times seven plus five is 24 metres too.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular window is $1.2\\text{ m}$ wide and $90\\text{ cm}$ tall. How much trim goes around it?',
          choices: ['$4.2\\text{ m}$', '$182.4\\text{ m}$', '$2.1\\text{ m}$', '$1.08\\text{ m}$'],
          answer: 0,
          working: '$90\\text{ cm} = 0.9\\text{ m}$, and $P = 2(1.2 + 0.9) = 4.2\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular window is 1.2 metres wide and ninety centimetres tall. How much trim goes around it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ninety centimetres is 0.9 metres, and two times 1.2 plus 0.9 is 4.2 metres. B mixes metres and centimetres, and C forgets to double.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Perimeter: add all the sides, in the same unit.', 'Rectangle $P = 2(l + w)$, square $P = 4s$, regular polygon $P = ns$.', 'For composite shapes, find the missing sides and add every outside edge.'] }],
      lines: [
        { say: 'Let’s sum up. Perimeter is the distance around a shape: add all the sides, in the same unit.', show: 'sum.0' },
        { say: 'A rectangle’s perimeter is two times l plus w, a square’s is four s, and a regular polygon’s is n times s.', show: 'sum.1' },
        { say: 'And for composite shapes, find the missing sides, and add every outside edge. In part two, we find circumferences. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
