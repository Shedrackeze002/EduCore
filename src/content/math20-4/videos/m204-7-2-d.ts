import type { Explainer } from '@/video/script.ts';
import { arc, outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const patio = outline({
  corners: arc([0, 0], 3),
  guides: [{ id: 'r', from: [0, 0], to: [3, 0], tone: 'opp' }],
  labels: [{ id: 'rl', at: [1.5, 0.2], tex: 'r = 3\\text{ m}', place: 'above', tone: 'opp' }],
});

const video: Explainer = {
  id: 'm204-7-2-d',
  lessonId: 'm204-7-2',
  title: 'Area, Part 4: Area of a Circle',
  thumbnailTitle: 'Area of a Circle',
  thumbnail: 'pt',
  summary: 'The area of a circle with A = π × r × r: a circular patio with a 3 m radius (about 28.3 m²), a 10-inch pizza found from its radius of 5 in (about 78.5 in²), and why using the diameter gives an area 4 times too big.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.2 · Part 4', title: 'Area of a Circle', subtitle: 'π × r × r' }],
      lines: [
        { say: 'A round patio, a round rug, and a pizza all cover a circle of surface. How much?', show: 'title' },
        { say: 'In this video, you will find the area of a circle from its radius, or from its diameter.' },
      ],
    },
    {
      chapter: 'The area formula',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pt', [patio], 380)],
      right: [{ kind: 'math', id: 'f', size: 'lg', align: 'left', lines: ['A = \\pi \\times r \\times r', 'A = \\pi r^2'] }],
      lines: [
        { say: 'To find the area of a circle, you need its radius: the distance from the centre to the edge.', show: ['pt.shape', 'pt.r', 'pt.rl'], focus: 'pt.r' },
        { say: 'The area is pi times the radius times the radius.', show: 'f.0', focus: 'f.0' },
        { say: 'This is often written A equals pi r squared. Squared means times itself.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A circular patio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A circular patio has a radius of $3$ m. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = \\pi \\times 3 \\times 3 = \\pi \\times 9', '\\pi \\times 9 \\approx 28.27 \\approx 28.3 \\text{ m}^2'] },
      ],
      lines: [
        { say: 'A circular patio has a radius of three metres. What is its area, to the nearest tenth?', show: 'q' },
        { say: 'A equals pi times three times three, which is pi times nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Pi times nine is about 28.27. The patio has an area of about 28.3 square metres. That is how much paving it needs.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: a square three metres on each side covers nine square metres, and the circle covers a little more than three of those squares.' },
      ],
    },
    {
      chapter: 'A pizza',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A pizza has a diameter of $10$ in. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['r = 10 \\div 2 = 5 \\text{ in}', 'A = \\pi \\times 5 \\times 5 = \\pi \\times 25 \\approx 78.54 \\approx 78.5 \\text{ in}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the diameter', md: '$\\pi \\times 10 \\times 10 \\approx 314$ in² is $4$ times too big. Always halve the diameter to get the radius first.' },
      ],
      lines: [
        { say: 'A pizza has a diameter of ten inches. What is its area, to the nearest tenth?', show: 'q' },
        { say: 'The formula needs the radius, which is half of the diameter: ten divided by two is five inches.', show: 'm.0', focus: 'm.0' },
        { say: 'A equals pi times five times five, which is pi times 25: about 78.5 square inches.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to use the diameter. Pi times ten times ten is about 314 square inches, four times too big. Always halve the diameter first.', show: 'oops' },
        { say: 'This also shows something surprising: a pizza twice as wide covers four times as much.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round rug has a diameter of $4$ m. What is its area, to the nearest tenth?',
          choices: ['$12.6$ m²', '$50.3$ m²', '$12.6$ m', '$6.3$ m²'],
          answer: 0,
          working: '$r = 4 \\div 2 = 2$ m. $A = \\pi \\times 2 \\times 2 \\approx 12.57$ m². B uses the diameter, and C is the circumference, a length.',
        },
      ],
      lines: [
        { say: 'Your turn. A round rug has a diameter of four metres. What is its area, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The radius is two metres, and pi times two times two is about 12.6 square metres. B uses the diameter, and C is the circumference, a length in metres, not square metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circle: A = π × r × r.', 'Given the diameter? Halve it first.', 'Area is in square units.'] }],
      lines: [
        { say: 'Let’s sum up. The area of a circle is pi times the radius times the radius.', show: 'sum.0' },
        { say: 'If you are given the diameter, halve it first to get the radius.', show: 'sum.1' },
        { say: 'And area is always in square units. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
