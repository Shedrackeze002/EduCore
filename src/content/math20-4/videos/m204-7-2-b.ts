import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const bed = outline({
  corners: [[0, 0], [6, 0], [1.8, 4]],
  tone: 'good',
  guides: [{ id: 'h', from: [1.8, 4], to: [1.8, 0] }],
  labels: [
    { id: 'b', at: [3, -0.6], tex: 'b = 6\\text{ m}' },
    { id: 'hl', at: [1.95, 1.8], tex: 'h = 4\\text{ m}', place: 'right', tone: 'opp' },
  ],
});

const half = outline({
  corners: [[0, 0], [6, 0], [6, 4], [0, 4]],
  tone: 'muted',
  cutouts: [{ id: 'tri', corners: [[0, 0], [6, 0], [1.8, 4]], tone: 'good' }],
});

const video: Explainer = {
  id: 'm204-7-2-b',
  lessonId: 'm204-7-2',
  title: 'Area, Part 2: Area of a Triangle',
  thumbnailTitle: 'Area of a Triangle',
  thumbnail: 'fb',
  summary: 'The height of a triangle (straight up from the base, at a square corner), why a triangle is half of a rectangle, and the formula A = b × h ÷ 2 for a flower bed with a 6 m base and a 4 m height (12 m²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.2 · Part 2', title: 'Area of a Triangle', subtitle: 'Half of a rectangle' }],
      lines: [
        { say: 'A corner garden bed, a gable end of a roof, or a sail: many surfaces are triangles. How much do they cover?', show: 'title' },
        { say: 'In this video, you will find the area of a triangle from its base and height.' },
      ],
    },
    {
      chapter: 'Base and height',
      layout: 'split',
      leftWidth: 620,
      left: [figure('fb', [bed], 380)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Height', md: 'The **height** is the straight-up distance from the base to the top. It meets the base at a right angle, a square corner. Here it is the dashed line.' }],
      lines: [
        { say: 'Here is a triangular flower bed. Its base is the bottom side, six metres long.', show: ['fb.shape', 'fb.b'], focus: 'fb.b' },
        { say: 'Its height is the straight-up distance from the base to the top. It meets the base at a square corner. In the picture, the height is the dashed line: four metres.', show: ['fb.h', 'fb.hl', 'def'], focus: 'fb.h' },
        { say: 'The height is not one of the sides here. It goes straight up from the base, inside the triangle. Any side can be the base, as long as the height is measured straight up from it.' },
      ],
    },
    {
      chapter: 'Half of a rectangle',
      layout: 'split',
      leftWidth: 620,
      left: [figure('hf', [half], 380)],
      right: [{ kind: 'math', id: 'f', size: 'lg', align: 'left', lines: ['A = b \\times h \\div 2'] }],
      lines: [
        { say: 'Draw a rectangle around the triangle, with the same base and the same height.', show: 'hf.shape' },
        { say: 'The triangle covers exactly half of the rectangle. The two pieces left over would fit together to make another triangle just like it.', show: 'hf.tri', focus: 'hf.tri' },
        { say: 'So the area of a triangle is the base times the height, divided by two.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'A triangular flower bed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['A = 6 \\times 4 \\div 2', 'A = 24 \\div 2 = 12 \\text{ m}^2'] }],
      lines: [
        { say: 'For the flower bed, the base is six metres, and the height is four metres. A equals six times four, divided by two.', show: 'm.0', focus: 'm.0' },
        { say: 'Six times four is 24, the area of the whole rectangle. Divided by two, that is twelve. The flower bed has an area of twelve square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to forget to divide by two. That gives the area of the whole rectangle, twice as much as the triangle.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangular sail has a base of $8$ m and a height of $5$ m. What is its area?',
          choices: ['$20$ m²', '$40$ m²', '$13$ m²', '$6.5$ m²'],
          answer: 0,
          working: '$A = 8 \\times 5 \\div 2 = 40 \\div 2 = 20$ m². B forgets to divide by $2$, and C adds the base and height.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangular sail has a base of eight metres and a height of five metres. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight times five is forty, and divided by two, that is twenty square metres. B forgets to divide by two, and C adds the base and the height.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The height meets the base at a square corner.', 'A triangle is half of a rectangle.', 'Triangle: A = b × h ÷ 2.'] }],
      lines: [
        { say: 'Let’s sum up. The height meets the base at a square corner.', show: 'sum.0' },
        { say: 'A triangle is half of a rectangle with the same base and height.', show: 'sum.1' },
        { say: 'So its area is the base times the height, divided by two. In part three, we find the area of a parallelogram. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
