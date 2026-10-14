import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const run = outline({
  corners: [[0, 0], [8, 0], [8, 5], [0, 5]],
  labels: [
    { id: 's1', at: [4, 5.6], tex: '8\\text{ m}' },
    { id: 's2', at: [8.9, 2.5], tex: '5\\text{ m}' },
    { id: 's3', at: [4, -0.6], tex: '8\\text{ m}' },
    { id: 's4', at: [-0.9, 2.5], tex: '5\\text{ m}' },
  ],
});

const video: Explainer = {
  id: 'm204-7-1',
  lessonId: 'm204-7-1',
  title: 'Perimeter, Part 1: Perimeter of a Rectangle',
  thumbnailTitle: 'Perimeter',
  thumbnail: 'dr',
  summary: 'Perimeter as the distance around a shape, fencing an 8 m by 5 m dog run by adding all four sides (26 m), the shortcut P = 2(l + w), and why adding two sides only goes halfway around.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.1 · Part 1', title: 'Perimeter', subtitle: 'The distance around' }],
      lines: [
        { say: 'Fencing a dog run, putting trim around a window and edging a flower bed are all the same kind of job. Each one needs the distance around a shape. Measure it right, and you buy the right amount.', show: 'title' },
        { say: 'In this video, you will find the perimeter of a rectangle.' },
      ],
    },
    {
      chapter: 'Perimeter',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Perimeter', md: 'The **perimeter** of a shape is the distance all the way around its outside edge. It is a length, so it is measured in units like metres (m) or feet (ft).' }],
      lines: [
        { say: 'The perimeter of a shape is the distance all the way around its outside edge. It is a length, so it is measured in units like metres or feet.', show: 'def' },
        { say: 'A rectangle has four sides: two lengths and two widths. To find its perimeter, add all four sides.' },
      ],
    },
    {
      chapter: 'Fencing a dog run',
      layout: 'split',
      leftWidth: 560,
      left: [figure('dr', [run], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['8 + 5 + 8 + 5 = 26', 'P = 2(l + w)', 'P = 2 \\times (8 + 5)', '= 2 \\times 13 = 26'] }],
      lines: [
        { say: 'Amara is fencing a rectangular dog run. It is eight metres long and five metres wide. How much fencing does she need?', show: 'dr.shape' },
        { say: 'Start at one corner, and trace all the way around. Eight metres across the top, five down the side,', show: ['dr.s1', 'dr.s2'], focus: ['dr.s1', 'dr.s2'] },
        { say: 'eight more along the bottom, and five back up to where you started.', show: ['dr.s3', 'dr.s4'], focus: ['dr.s3', 'dr.s4'] },
        { say: 'Add all four sides: eight plus five plus eight plus five is 26. Amara needs 26 metres of fencing.', show: 'm.0', focus: 'm.0' },
        { say: 'There is also a shortcut. A length plus a width goes halfway around, so P equals two times, l plus w.', show: 'm.1', focus: 'm.1' },
        { say: 'Eight plus five is thirteen, and two times thirteen is 26. The same answer.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'All four sides',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Trace with your finger', md: 'Start at one corner. Trace all the way around the shape and say each side as you add it. Stop when you are back where you started.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding only two sides', md: '$8 + 5 = 13$ is only halfway around the dog run. A rectangle has **four** sides.' },
      ],
      lines: [
        { say: 'Here is a tip. Start at one corner, trace all the way around the shape, and say each side as you add it. Stop when you are back where you started.', show: 'tip' },
        { say: 'A common mistake is to add only two sides. Eight plus five is thirteen, but that only goes halfway around the dog run. A rectangle has four sides.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular patio is $12$ m long and $7.5$ m wide. What is its perimeter?',
          choices: ['$39$ m', '$19.5$ m', '$90$ m', '$27$ m'],
          answer: 0,
          working: '$P = 2 \\times (12 + 7.5) = 2 \\times 19.5 = 39$ m. B adds only two sides, and C multiplies, which gives the area.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular patio is twelve metres long and 7.5 metres wide. What is its perimeter? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve plus 7.5 is 19.5, and two times 19.5 is 39 metres. B adds only two sides, and C multiplies, which gives the area, not the perimeter.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Perimeter is the distance around a shape.', 'Rectangle: add all four sides, or P = 2(l + w).', 'Perimeter is a length, in m or ft.'] }],
      lines: [
        { say: 'Let’s sum up. Perimeter is the distance around a shape.', show: 'sum.0' },
        { say: 'For a rectangle, add all four sides, or use P equals two times, l plus w.', show: 'sum.1' },
        { say: 'And perimeter is a length, measured in units like metres or feet. In part two, we find the perimeter of other shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
