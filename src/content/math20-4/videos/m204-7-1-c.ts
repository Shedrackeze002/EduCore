import type { Explainer } from '@/video/script.ts';
import { arc, outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const circle = outline({
  corners: arc([0, 0], 3),
  guides: [
    { id: 'd', from: [-3, 0], to: [3, 0], tone: 'adj' },
    { id: 'r', from: [0, 0], to: [0, -3], tone: 'opp' },
  ],
  labels: [
    { id: 'dl', at: [1.5, 0.45], tex: '\\text{diameter}', tone: 'adj' },
    { id: 'rl', at: [0.25, -1.5], tex: '\\text{radius}', place: 'right', tone: 'opp' },
  ],
});

const video: Explainer = {
  id: 'm204-7-1-c',
  lessonId: 'm204-7-1',
  title: 'Perimeter, Part 3: Circumference of a Circle',
  thumbnailTitle: 'Circumference',
  thumbnail: 'cc',
  summary: 'The circumference, diameter and radius of a circle, the formula C = π × d, edging a round flower bed 3 m across (about 9.4 m), banding a table with a 60 cm radius (about 377.0 cm), and doubling the radius first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.1 · Part 3', title: 'Circumference', subtitle: 'The distance around a circle' }],
      lines: [
        { say: 'A round flower bed, a round table and a bike wheel have no straight sides to add. But their distance around can still be found.', show: 'title' },
        { say: 'In this video, you will find the distance around a circle.' },
      ],
    },
    {
      chapter: 'Parts of a circle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cc', [circle], 380)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Circumference, diameter and radius', md: 'The **circumference** is the distance around a circle. The **diameter** goes across through the centre. The **radius** goes from the centre to the edge. The diameter is $2$ times the radius.' }],
      lines: [
        { say: 'The circumference is the distance around a circle.', show: ['cc.shape', 'def'], focus: 'cc.shape' },
        { say: 'The diameter is the distance across the circle, through its centre.', show: ['cc.d', 'cc.dl'], focus: 'cc.d' },
        { say: 'The radius is the distance from the centre to the edge. The diameter is two radii, so the diameter is two times the radius.', show: ['cc.r', 'cc.rl'], focus: 'cc.r' },
      ],
    },
    {
      chapter: 'C = π × d',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['C = \\pi \\times d'] },
        { kind: 'text', id: 'q', md: 'A round flower bed has a diameter of $3$ m. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['C = \\pi \\times 3 \\approx 9.42 \\approx 9.4 \\text{ m}'] },
      ],
      lines: [
        { say: 'For every circle, the circumference is a little more than three times the diameter. That number is called pi. It is about 3.14. Use the pi key on your calculator. It works for every circle, from a coin to a running track.', show: 'f', focus: 'f' },
        { say: 'A round flower bed has a diameter of three metres. How much edging goes around it, to the nearest tenth of a metre?', show: 'q' },
        { say: 'C equals pi times three, which is about 9.42. So about 9.4 metres of edging is needed. Check: three times three is nine, and the answer is a little more.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Starting from the radius',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A round table has a radius of $60$ cm. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['d = 2 \\times 60 = 120 \\text{ cm}', 'C = \\pi \\times 120 \\approx 376.99 \\approx 377.0 \\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the radius in place of the diameter', md: '$\\pi \\times 60 \\approx 188.5$ cm only goes halfway around the table. If you are given the radius, double it first.' },
      ],
      lines: [
        { say: 'A round table has a radius of sixty centimetres. How much edge banding goes around it, to the nearest tenth?', show: 'q' },
        { say: 'The formula uses the diameter, so double the radius first: two times sixty is 120 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'C equals pi times 120, which is about 376.99, or 377.0 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to use the radius in place of the diameter. Pi times sixty is about 188.5 centimetres, which only goes halfway around the table.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bike wheel has a radius of $0.35$ m. What is its circumference, to the nearest tenth of a metre?',
          choices: ['$2.2$ m', '$1.1$ m', '$0.7$ m', '$0.4$ m'],
          answer: 0,
          working: '$d = 2 \\times 0.35 = 0.7$ m. $C = \\pi \\times 0.7 \\approx 2.20$ m. B uses the radius, and C is the diameter.',
        },
      ],
      lines: [
        { say: 'Your turn. A bike wheel has a radius of 0.35 metres. What is its circumference, to the nearest tenth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The diameter is two times 0.35, which is 0.7 metres, and pi times 0.7 is about 2.2 metres. B uses the radius, and C is the diameter, not the distance around.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circumference: the distance around a circle.', 'C = π × d, a little more than 3 × d.', 'Given the radius? Double it first.'] }],
      lines: [
        { say: 'Let’s sum up. The circumference is the distance around a circle.', show: 'sum.0' },
        { say: 'C equals pi times d, a little more than three times the diameter.', show: 'sum.1' },
        { say: 'And if you are given the radius, double it first. In part four, we find the cost of edging and fencing. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
