import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-0.5, 7.5], y: [-0.5, 3.5], every: 0 });

const video: Explainer = {
  id: 'm103-5-1',
  lessonId: 'm103-5-1',
  title: 'Area of Common Shapes, Part 1: Rectangles, Triangles and Trapezoids',
  thumbnailTitle: 'Area of Common Shapes',
  thumbnail: 'para',
  summary: 'Area as the number of unit squares that cover a shape, the formulas for rectangles, parallelograms, triangles and trapezoids, and using the perpendicular height rather than a slanted side. Part 2 covers circles and working backward.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.1 · Part 1', title: 'Area of Common Shapes', subtitle: 'Rectangles, triangles and trapezoids' }],
      lines: [
        { say: 'A flooring installer, a landscaper and a roofer all start a job the same way: they measure the surface, and work out its area.', show: 'title' },
        { say: 'In this video, you will find the areas of rectangles, parallelograms, triangles and trapezoids. In part two, circles.' },
      ],
    },
    {
      chapter: 'What area measures',
      layout: 'split',
      leftWidth: 460,
      left: [figure('rect', [tiles({ cols: 5, rows: 3, labels: { width: '5', height: '3', area: '15' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Area', md: 'The number of square units needed to cover a flat shape, such as $\\text{cm}^2$, $\\text{m}^2$, $\\text{in}^2$ or $\\text{ft}^2$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = l \\times w', '3.5 \\times 2.4 = 8.4\\text{ m}^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same units first', md: 'A countertop $2.4\\text{ m}$ by $65\\text{ cm}$ is $2.4\\text{ m}$ by $0.65\\text{ m}$.' },
      ],
      lines: [
        { say: 'Area tells you how much flat surface a shape covers. You measure it by counting the unit squares that fit inside. A square one metre on each side has an area of one square metre.', show: 'def' },
        { say: 'A rectangle five squares long and three squares wide holds five times three: fifteen squares. That gives the formula: area equals length times width.', show: ['rect.outline', 'rect.grid', 'rect.width', 'rect.height', 'rect.area', 'm.0'], focus: 'm.0' },
        { say: 'A concrete pad for a shed is 3.5 metres long and 2.4 metres wide. Its area is 3.5 times 2.4: 8.4 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Both measurements must be in the same unit before you multiply. A countertop 2.4 metres by 65 centimetres is 2.4 metres by 0.65 metres.', show: 'tip' },
      ],
    },
    {
      chapter: 'Base and height',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('para', [
          g,
          polyline(g, { id: 'shape', points: [[0, 0], [5, 0], [7, 3], [2, 3], [0, 0]], labels: ['b', 's'], sides: ['right', 'right'] }),
          polyline(g, { id: 'h', points: [[2, 3], [2, 0]], tone: 'opp', labels: ['h'], dashed: true }),
          polyline(g, { id: 'diag', points: [[0, 0], [7, 3]], tone: 'good', dashed: true }),
        ]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape', 'Area'],
          rows: [
            ['rectangle', '$A = lw$'],
            ['parallelogram', '$A = bh$'],
            ['triangle', '$A = \\tfrac12 bh$'],
            ['trapezoid', '$A = \\dfrac{a + b}{2} \\times h$'],
          ],
        },
      ],
      lines: [
        { say: 'Every other formula uses a base and a height. The base is the side you measure along. The height is the perpendicular distance from the base to the opposite side: straight up, at ninety degrees.', show: ['para.shape', 'para.h', 't.0'], focus: 'para.h' },
        { say: 'A parallelogram has an area of base times height. Slide the triangle off one end onto the other, and it becomes a rectangle.', show: 't.1', focus: 't.1' },
        { say: 'A triangle is exactly half of a parallelogram with the same base and height. That is where the one half comes from.', show: ['para.diag', 't.2'], focus: ['para.diag', 't.2'] },
        { say: 'A trapezoid has exactly one pair of parallel sides, "a" and b. Its area is the average of the parallel sides, times the height.', show: 't.3', focus: 't.3' },
        { say: 'The slanted side is not the height. It is longer, so using it makes the area too big. Always use the distance measured at a right angle to the base.', focus: 'para.shape-1' },
      ],
    },
    {
      chapter: 'Examples',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{garden bed: } A = \\dfrac{6 + 10}{2} \\times 4 = 8 \\times 4 = 32\\text{ ft}^2', '\\text{gable: } A = \\tfrac12 \\times 9 \\times 3.5 = 15.75\\text{ ft}^2'] },
      ],
      lines: [
        { say: 'A garden bed is shaped like a trapezoid. Its parallel sides are six and ten feet, and they are four feet apart. The average of the parallel sides is eight feet, and eight times four is 32 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'The triangular gable end of a shed has a base of nine feet, and a height of three and a half feet. Write the mixed number as 3.5. Half of nine times 3.5 is 15.75 square feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangular sail has a base of $12\\text{ m}$ and a perpendicular height of $5\\text{ m}$. Its slanted side is $7\\text{ m}$. What is its area?',
          choices: ['$30\\text{ m}^2$', '$60\\text{ m}^2$', '$42\\text{ m}^2$', '$35\\text{ m}^2$'],
          answer: 0,
          working: '$A = \\tfrac12 bh = \\tfrac12 \\times 12 \\times 5 = 30\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular sail has a base of twelve metres, and a perpendicular height of five metres. Its slanted side is seven metres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Half of twelve times five is thirty square metres. B forgets the half, and C uses the slanted side.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area is in square units: $\\text{m}^2$, $\\text{ft}^2$ and so on.', 'Rectangle $lw$; parallelogram $bh$; triangle $\\tfrac12 bh$; trapezoid $\\tfrac{a + b}{2} \\times h$.', 'The height is measured at a right angle to the base.'] }],
      lines: [
        { say: 'Let’s sum up. Area is measured in square units.', show: 'sum.0' },
        { say: 'A rectangle is length times width, a parallelogram base times height, a triangle half of base times height, and a trapezoid the average of the parallel sides times the height.', show: 'sum.1' },
        { say: 'And the height is always measured at a right angle to the base. In part two, we find the areas of circles, and work backward. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
