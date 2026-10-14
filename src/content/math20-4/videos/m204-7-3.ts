import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const kitchen = outline({
  corners: [[0, 0], [3, 0], [3, 4], [7, 4], [7, 6], [0, 6]],
  guides: [{ id: 'cut', from: [3, 4], to: [3, 6], tone: 'opp' }],
  labels: [
    { id: 'a', at: [1.5, 6.55], tex: '3\\text{ m}' },
    { id: 'b', at: [5, 6.55], tex: '4\\text{ m}' },
    { id: 'c', at: [-0.8, 3], tex: '6\\text{ m}' },
    { id: 'd', at: [7.8, 5], tex: '2\\text{ m}' },
    { id: 'p1', at: [1.5, 2.5], tex: '18\\text{ m}^2', tone: 'adj' },
    { id: 'p2', at: [5, 5], tex: '8\\text{ m}^2', tone: 'adj' },
  ],
});

const video: Explainer = {
  id: 'm204-7-3',
  lessonId: 'm204-7-3',
  title: 'Composite Shapes, Part 1: Adding the Parts',
  thumbnailTitle: 'Composite Shapes',
  thumbnail: 'kt',
  summary: 'What a composite shape is, splitting an L-shaped kitchen floor into two rectangles (3 × 6 = 18 m² and 4 × 2 = 8 m²) and adding them (26 m²), and why the parts must not overlap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.3 · Part 1', title: 'Composite Shapes', subtitle: 'Split, then add' }],
      lines: [
        { say: 'Real rooms and yards are not always simple rectangles. An L-shaped kitchen, or a lawn with a flower bed, is made of simpler shapes.', show: 'title' },
        { say: 'In this video, you will find the area of a shape by splitting it into simple parts.' },
      ],
    },
    {
      chapter: 'Composite shapes',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Composite shape', md: 'A **composite shape** is made from two or more simple shapes, such as rectangles, triangles and half circles. To find its area, split it into simple shapes, find the area of each part, then add.' }],
      lines: [
        { say: 'A composite shape is a shape made from two or more simple shapes, such as rectangles, triangles and half circles.', show: 'def' },
        { say: 'To find its area, split it into simple shapes. Find the area of each part. Then add the areas.' },
      ],
    },
    {
      chapter: 'An L-shaped kitchen floor',
      layout: 'split',
      leftWidth: 600,
      left: [figure('kt', [kitchen], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{left: } 3 \\times 6 = 18', '\\text{right: } 4 \\times 2 = 8', '18 + 8 = 26 \\text{ m}^2'] }],
      lines: [
        { say: 'Here is an L-shaped kitchen floor, with its measurements.', show: ['kt.shape', 'kt.a', 'kt.b', 'kt.c', 'kt.d'] },
        { say: 'The dashed line splits it into two rectangles.', show: 'kt.cut', focus: 'kt.cut' },
        { say: 'The left rectangle is three metres wide and six metres long: three times six is eighteen square metres.', show: ['m.0', 'kt.p1'], focus: ['m.0', 'kt.p1'] },
        { say: 'The right rectangle is four metres by two metres: eight square metres.', show: ['m.1', 'kt.p2'], focus: ['m.1', 'kt.p2'] },
        { say: 'Add the parts: eighteen plus eight is 26. The kitchen floor has an area of 26 square metres.', show: 'm.2', focus: 'm.2' },
        { say: 'Check another way: the kitchen fits inside a seven by six rectangle, 42 square metres, with a four by four corner missing, sixteen square metres. 42 minus sixteen is 26.' },
      ],
    },
    {
      chapter: 'No overlaps',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting a part twice', md: 'The parts must not overlap. If two parts share a piece, that piece gets counted twice and the area is too big. Split the shape with one line.' }],
      lines: [
        { say: 'A common mistake is to count a part twice. The parts must not overlap. If two parts share a piece, that piece gets counted twice, and the area is too big.', show: 'oops' },
        { say: 'Split the shape with one line, so every square metre belongs to exactly one part. You could also split the kitchen the other way, with a line across. You get 26 square metres either way.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An L-shaped deck splits into a $5$ m by $3$ m rectangle and a $4$ m by $2$ m rectangle. What is its total area?',
          choices: ['$23$ m²', '$120$ m²', '$14$ m²', '$15$ m²'],
          answer: 0,
          working: '$5 \\times 3 = 15$ and $4 \\times 2 = 8$, so $15 + 8 = 23$ m². B multiplies the two areas, C adds the four lengths, and D is only one part.',
        },
      ],
      lines: [
        { say: 'Your turn. An L-shaped deck splits into a five metre by three metre rectangle, and a four metre by two metre rectangle. What is its total area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five times three is fifteen, and four times two is eight. Fifteen plus eight is 23 square metres. B multiplies the two areas, C adds the four lengths, and D is only one part.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A composite shape is made of simple shapes.', 'Split it, find each area, then add.', 'The parts must not overlap.'] }],
      lines: [
        { say: 'Let’s sum up. A composite shape is made of simple shapes.', show: 'sum.0' },
        { say: 'Split it into parts, find the area of each part, then add.', show: 'sum.1' },
        { say: 'And make sure the parts do not overlap. In part two, we take a part away. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
