import type { Explainer } from '@/video/script.ts';
import { circle } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-7-1-b',
  lessonId: 'm104-7-1',
  title: 'Perimeter, Part 2: Circumference',
  thumbnailTitle: 'Circumference',
  thumbnail: 'c',
  summary: 'The circumference, diameter and radius of a circle, pi, C = π × d or C = 2 × π × r for edging a round garden and trim for a round table, using the diameter rather than the radius, and how far a wheel rolls in one turn.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.1 · Part 2', title: 'Circumference', subtitle: 'The distance around a circle' }],
      lines: [
        { say: 'How much edging goes around a round garden? How far does a wheel roll in one turn? You need the distance around a circle.', show: 'title' },
        { say: 'In this video, you will find the circumference of a circle.' },
      ],
    },
    {
      chapter: 'Circles',
      layout: 'split',
      leftWidth: 460,
      left: [figure('c', [circle({ r: 3, labels: { c: 'C', d: 'd' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Circumference, diameter and radius', md: 'The **circumference** is the perimeter of a circle. The **diameter** goes across through the centre. The **radius** goes from the centre to the edge: half the diameter.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['C = \\pi \\times d \\quad \\text{or} \\quad C = 2 \\times \\pi \\times r'] },
      ],
      lines: [
        { say: 'The circumference is the perimeter of a circle: the distance around it.', show: ['c.outline', 'c.fill'], focus: 'c.outline' },
        { say: 'The diameter is the distance across a circle, through its centre. The radius is the distance from the centre to the edge, so the diameter is two times the radius.', show: ['c.d', 'def'], focus: 'c.d' },
        { say: 'Pi is the number of times the diameter fits around a circle: about 3.14. Use the pi key on your calculator. The circumference is pi times the diameter, or two times pi times the radius.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Using the formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['C = \\pi \\times 3 \\approx 9.4\\text{ m}', 'd = 2 \\times 45 = 90\\text{ cm}, \\quad C = \\pi \\times 90 \\approx 282.7\\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Radius or diameter?', md: '$C = \\pi \\times d$ needs the **diameter**. Using the radius gives only half the answer.' },
      ],
      lines: [
        { say: 'A round garden has a diameter of three metres. The edging around it is pi times three: about 9.4 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'A round table has a radius of 45 centimetres. Double the radius: the diameter is ninety. The trim around its edge is pi times ninety, about 282.7 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Pi times d needs the diameter. If you use the radius by mistake, your answer is only half as long as it should be.', show: 'oops' },
      ],
    },
    {
      chapter: 'Rolling wheels',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\pi \\times 66 \\approx 207.3\\text{ cm per turn}', '10 \\text{ turns: } \\pi \\times 66 \\times 10 \\approx 2\\,073\\text{ cm} \\approx 20.7\\text{ m}'] }],
      lines: [
        { say: 'Each time a wheel turns once, it rolls forward one circumference.' },
        { say: 'A wheel with a diameter of 66 centimetres rolls pi times 66, about 207.3 centimetres, in one turn. Round only at the end.', show: 'm.0', focus: 'm.0' },
        { say: 'A quick check: pi is a little more than three, so the circumference is a little more than three times the diameter. Three times 66 is 198, so 207.3 is about right.' },
        { say: 'In ten turns, the wheel rolls ten times as far: about 2,073 centimetres, or about 20.7 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A round pool has a radius of $4\\text{ m}$. How long is the fence around it, to the nearest tenth?',
          choices: ['$25.1\\text{ m}$', '$12.6\\text{ m}$', '$50.3\\text{ m}$', '$16\\text{ m}$'],
          answer: 0,
          working: '$d = 2 \\times 4 = 8\\text{ m}$, and $C = \\pi \\times 8 \\approx 25.1\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A round pool has a radius of four metres. How long is the fence around it, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The diameter is eight metres, and pi times eight is about 25.1 metres. B uses the radius instead of the diameter.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The diameter is two times the radius.', '$C = \\pi \\times d$, or $C = 2 \\times \\pi \\times r$.', 'Round only at the end.'] }],
      lines: [
        { say: 'Let’s sum up. The diameter is two times the radius.', show: 'sum.0' },
        { say: 'The circumference is pi times the diameter, or two times pi times the radius.', show: 'sum.1' },
        { say: 'And round only at the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
