import type { Explainer } from '@/video/script.ts';
import { arc, outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const room = outline({
  corners: [[0, 0], [10, 0], [10, 4], [6, 4], [6, 7], [0, 7]],
  labels: [
    { id: 's1', at: [5, -0.6], tex: '10\\text{ m}' },
    { id: 's2', at: [10.9, 2], tex: '4\\text{ m}' },
    { id: 's3', at: [8.5, 4.55], tex: '4\\text{ m}' },
    { id: 's4', at: [6.8, 6.1], tex: '3\\text{ m}' },
    { id: 's5', at: [3, 7.6], tex: '6\\text{ m}' },
    { id: 's6', at: [-0.9, 3.5], tex: '7\\text{ m}' },
  ],
});

const tri = outline({
  corners: [[0, 0], [4, 0], [0, 3]],
  tone: 'good',
  labels: [
    { id: 'a', at: [2, -0.55], tex: '4\\text{ m}' },
    { id: 'b', at: [-0.8, 1.5], tex: '3\\text{ m}' },
    { id: 'c', at: [2.4, 1.85], tex: '5\\text{ m}' },
  ],
});

const hex = outline({ corners: arc([0, 0], 2.5, -90, 270, 6), labels: [{ id: 's', at: [1.65, -2.6], tex: '2.5\\text{ m}' }] });

const video: Explainer = {
  id: 'm204-7-1-b',
  lessonId: 'm204-7-1',
  title: 'Perimeter, Part 2: Other Shapes with Straight Sides',
  thumbnailTitle: 'Perimeter of Any Shape',
  thumbnail: 'rm',
  summary: 'The perimeter of any shape with straight sides: baseboard for an L-shaped room with 6 sides (34 m), counting the sides first, and a regular hexagon gazebo floor (6 × 2.5 = 15 m).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.1 · Part 2', title: 'Perimeter of Any Shape', subtitle: 'Count the sides, then add' }],
      lines: [
        { say: 'Rooms, decks and garden beds are not always rectangles. Luckily, the same idea works for any shape with straight sides.', show: 'title' },
        { say: 'In this video, you will find the perimeter of an L-shaped room and of a regular shape.' },
      ],
    },
    {
      chapter: 'An L-shaped room',
      layout: 'split',
      leftWidth: 560,
      left: [figure('rm', [room], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\text{ sides}', '10 + 4 + 4 + 3 + 6 + 7', '= 34'] }],
      lines: [
        { say: 'For any shape with straight sides, add the lengths of all the sides. A triangle has three sides, and an L-shaped room has six.', show: 'rm.shape' },
        { say: 'Tariq is putting baseboard around this L-shaped room. Every side is labelled.', show: ['rm.s1', 'rm.s2', 'rm.s3', 'rm.s4', 'rm.s5', 'rm.s6'] },
        { say: 'First, count the sides: there are six.', show: 'm.0', focus: 'm.0' },
        { say: 'Then trace around and add them: ten, plus four, plus four, plus three, plus six, plus seven, is 34. The perimeter is 34 metres.', show: ['m.1', 'm.2'], focus: ['rm.shape', 'm.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A triangle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('tr', [tri], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3 \\text{ sides}', '4 + 3 + 5 = 12'] }],
      lines: [
        { say: 'A triangle works the same way. This corner garden bed has sides of four metres, three metres and five metres.', show: 'tr' },
        { say: 'A triangle has three sides. Four plus three plus five is twelve, so the perimeter is twelve metres. The longest side counts too, even though it is slanted.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Missing a side',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Missing a side', md: 'An L-shape has $6$ sides, not $4$. Count the sides before you add, and check that every side is used once.' }],
      lines: [
        { say: 'A common mistake is to miss a side. An L-shape has six sides, not four. Count the sides before you add, and check that every side is used exactly once. Ticking each label as you add it helps.', show: 'oops' },
      ],
    },
    {
      chapter: 'A regular shape',
      layout: 'split',
      leftWidth: 520,
      left: [figure('hx', [hex], 360)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Regular shape', md: 'In a **regular** shape, all the sides are the same length.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 \\times 2.5 = 15'] },
      ],
      lines: [
        { say: 'In a regular shape, all the sides are the same length. So multiply one side by the number of sides.', show: 'def' },
        { say: 'A gazebo floor is a regular hexagon. A hexagon has six sides, and each side is 2.5 metres.', show: 'hx' },
        { say: 'Six times 2.5 is fifteen. The perimeter is fifteen metres. Adding 2.5 six times gives the same answer, but multiplying is faster.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A deck is a regular octagon. An octagon has $8$ sides. Each side is $1.2$ m. What is the perimeter?',
          choices: ['$9.6$ m', '$7.2$ m', '$4.8$ m', '$9.2$ m'],
          answer: 0,
          working: '$8 \\times 1.2 = 9.6$ m. B uses $6$ sides, C uses $4$, and D adds $8 + 1.2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A deck is a regular octagon. An octagon has eight sides, and each side is 1.2 metres. What is the perimeter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight times 1.2 is 9.6 metres. B uses six sides, C uses four, and D adds eight and 1.2 instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Any straight-sided shape: add all the sides.', 'Count the sides first, and use each once.', 'Regular shape: one side × number of sides.'] }],
      lines: [
        { say: 'Let’s sum up. For any shape with straight sides, add all the sides.', show: 'sum.0' },
        { say: 'Count the sides first, and use each side once.', show: 'sum.1' },
        { say: 'And for a regular shape, multiply one side by the number of sides. In part three, we go around a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
