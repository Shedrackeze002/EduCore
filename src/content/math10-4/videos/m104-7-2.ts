import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A triangle with a base of 6 and a height of 4, its height dashed and square to the base. */
const bed: Part = {
  points: { A: [0, 0], B: [6, 0], C: [3.6, 4], H: [3.6, 0] },
  items: [
    { kind: 'region', id: 'fill', points: ['A', 'B', 'C'], tone: 'good', group: 'shape' },
    { kind: 'line', id: 'b', from: 'A', to: 'B', tone: 'adj', label: '6\\text{ m}', labelSide: 'right', group: 'shape' },
    { kind: 'line', id: 's1', from: 'B', to: 'C', group: 'shape' },
    { kind: 'line', id: 's2', from: 'C', to: 'A', group: 'shape' },
    { kind: 'line', id: 'h', from: 'H', to: 'C', tone: 'opp', dashed: true, label: '4\\text{ m}', labelSide: 'left' },
    { kind: 'right', id: 'right', at: 'H', from: 'B', to: 'C' },
  ],
};

const video: Explainer = {
  id: 'm104-7-2',
  lessonId: 'm104-7-2',
  title: 'Area, Part 1: Rectangles and Triangles',
  thumbnailTitle: 'Area',
  thumbnail: 'g',
  summary: 'Area as the space inside a shape in square units, A = l × w for carpet in a bedroom, telling area from perimeter, and A = ½ × b × h for a triangular garden bed, with the height straight up from the base. Part 2 covers circles and the cost of materials.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.2 · Part 1', title: 'Area', subtitle: 'Rectangles and triangles' }],
      lines: [
        { say: 'How much carpet covers a bedroom floor? How much sod covers a yard? To answer, you need the area: the amount of surface inside a shape.', show: 'title' },
        { say: 'In this video, you will find the area of rectangles and triangles.' },
      ],
    },
    {
      chapter: 'Square units',
      layout: 'split',
      leftWidth: 460,
      left: [figure('g', [tiles({ cols: 4, rows: 3, labels: { width: '4\\text{ m}', height: '3\\text{ m}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area', md: 'The space inside a flat shape, in **square units**. A square metre is a square $1\\text{ m}$ by $1\\text{ m}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 4 = 12\\text{ m}^2', 'A = l \\times w'] },
      ],
      lines: [
        { say: 'Area is the amount of space inside a flat shape, measured in square units. A square metre is a square one metre long on each side. A square centimetre is about the size of a fingernail.', show: 'def' },
        { say: 'This rectangle covers three rows of four squares: three times four, twelve squares. So its area is twelve square metres.', show: ['g.outline', 'g.grid', 'g.width', 'g.height', 'm.0'], focus: 'm.0' },
        { say: 'Multiplying is a fast way to count the squares. The area of a rectangle is its length times its width.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Carpet for a bedroom',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['A = 4 \\times 3.5 = 14\\text{ m}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Area or perimeter?', md: 'Perimeter goes **around** the edge: fencing and trim. Area covers the **inside**: carpet, sod and paint. $4 + 3.5 + 4 + 3.5 = 15\\text{ m}$ is the perimeter.' },
      ],
      lines: [
        { say: 'A bedroom floor is four metres long and 3.5 metres wide. The carpet covers four times 3.5: fourteen square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Perimeter goes around the edge, like fencing or trim. Area covers the inside, like carpet, sod or paint. Adding the sides gives fifteen metres: the perimeter, not the area.', show: 'oops' },
      ],
    },
    {
      chapter: 'Triangles',
      layout: 'split',
      leftWidth: 460,
      left: [figure('t', [bed])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\tfrac{1}{2} \\times b \\times h', 'A = \\tfrac{1}{2} \\times 6 \\times 4 = 12\\text{ m}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a slanted side', md: 'The height goes **straight up** from the base, like the dashed line. Do not use a slanted side.' },
      ],
      lines: [
        { say: 'A triangle is half of a rectangle, so its area is half of the base times the height. The base is the side it sits on. The height is the distance straight up from the base to the top corner, at a right angle.', show: ['t.shape', 't.h', 't.right', 'm.0'], focus: 'm.0' },
        { say: 'A triangular garden bed has a base of six metres and a height of four. Six times four is 24, and half of 24 is twelve square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'The height must go straight up from the base, like the dashed line. Do not use a slanted side as the height.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangular sail has a base of $5\\text{ m}$ and a height of $8\\text{ m}$. What is its area?',
          choices: ['$20\\text{ m}^2$', '$40\\text{ m}^2$', '$13\\text{ m}^2$', '$26\\text{ m}^2$'],
          answer: 0,
          working: '$A = \\tfrac{1}{2} \\times 5 \\times 8 = 20\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular sail has a base of five metres and a height of eight. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five times eight is forty, and half of forty is twenty square metres. B forgets the half.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area is measured in square units.', 'Rectangle: $A = l \\times w$.', 'Triangle: $A = \\tfrac{1}{2} \\times b \\times h$, with the height straight up.'] }],
      lines: [
        { say: 'Let’s sum up. Area is the space inside a shape, measured in square units.', show: 'sum.0' },
        { say: 'The area of a rectangle is length times width.', show: 'sum.1' },
        { say: 'And the area of a triangle is half of base times height, with the height straight up from the base. In part two, we find the area of circles, and what materials cost. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
