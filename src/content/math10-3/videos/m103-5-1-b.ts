import type { Explainer } from '@/video/script.ts';
import { circle } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-5-1-b',
  lessonId: 'm103-5-1',
  title: 'Area of Common Shapes, Part 2: Circles and Working Backward',
  thumbnailTitle: 'Area of a Circle',
  thumbnail: 'tub',
  summary: 'The area of a circle A = πr², halving the diameter first, half and quarter circles, and substituting into an area formula to find a missing length or radius.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.1 · Part 2', title: 'Circles and Working Backward', subtitle: 'A = πr², and missing lengths' }],
      lines: [
        { say: 'How much material covers a round hot tub? And how long must a dog run be to have a given area?', show: 'title' },
        { say: 'In this video, you will find the area of circles, and work backward from an area to a missing length.' },
      ],
    },
    {
      chapter: 'Circles',
      layout: 'split',
      leftWidth: 440,
      left: [figure('tub', [circle({ r: 3, labels: { d: 'd = 7\\text{ ft}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\pi r^2', 'r = 7 \\div 2 = 3.5\\text{ ft}', 'A = \\pi(3.5)^2 \\approx 38.5\\text{ ft}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the diameter', md: '$\\pi(7)^2 \\approx 153.9\\text{ ft}^2$ is **four times** too big. Always halve the diameter first.' },
      ],
      lines: [
        { say: 'The area of a circle depends on its radius: A equals pi r squared. Square the radius first, then multiply by pi, and round only at the end.', show: 'm.0', focus: 'm.0' },
        { say: 'A round hot tub cover has a diameter of seven feet. The radius is half the diameter: 3.5 feet.', show: ['tub.fill', 'tub.outline', 'tub.d', 'm.1'], focus: 'm.1' },
        { say: 'So the area is pi times 3.5 squared: about 38.5 square feet.', show: 'm.2', focus: 'm.2' },
        { say: 'Putting the diameter into the formula gives about 153.9 square feet, which is four times too big. Always halve the diameter first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Half and quarter circles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{semicircle: } \\pi r^2 \\div 2, \\qquad \\text{quarter circle: } \\pi r^2 \\div 4', '\\text{window: } r = 18\\text{ in}, \\quad \\pi(18)^2 \\div 2 \\approx 508.9\\text{ in}^2'] },
      ],
      lines: [
        { say: 'A semicircle is half a circle, so find pi r squared, and divide by two. A quarter circle, like a shower base in a corner, is pi r squared divided by four.', show: 'm.0', focus: 'm.0' },
        { say: 'A semicircular window is 36 inches wide, so its radius is eighteen inches. Its area is pi times eighteen squared, divided by two: about 508.9 square inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['60 = 5l \\;\\to\\; l = \\dfrac{60}{5} = 12\\text{ m}', '300 = \\pi r^2 \\;\\to\\; r^2 = \\dfrac{300}{\\pi} \\approx 95.49 \\;\\to\\; r \\approx 9.8\\text{ m}', '30 = \\tfrac12(10)h \\;\\to\\; 60 = 10h \\;\\to\\; h = 6\\text{ ft}'] },
      ],
      lines: [
        { say: 'Sometimes you know the area, and must find a length. Substitute what you know, then undo the operations one at a time. A dog run must have an area of sixty square metres, and be five metres wide. Sixty equals five l, so the length is sixty divided by five: twelve metres.', show: 'm.0', focus: 'm.0' },
        { say: 'A circular rink has an area of 300 square metres. Divide by pi: r squared is about 95.49. Then take the square root: the radius is about 9.8 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For a triangle, deal with the one half first. A gable with an area of thirty square feet and a base of ten feet: multiply both sides by two, so sixty equals ten h, and the height is six feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circular patio has an area of $50\\text{ m}^2$. What is its radius, to the nearest tenth of a metre?',
          choices: ['$4.0\\text{ m}$', '$15.9\\text{ m}$', '$7.1\\text{ m}$', '$2.0\\text{ m}$'],
          answer: 0,
          working: '$r^2 = \\dfrac{50}{\\pi} \\approx 15.92$, so $r = \\sqrt{15.92} \\approx 4.0\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A circular patio has an area of fifty square metres. What is its radius, to the nearest tenth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide by pi: r squared is about 15.92. The square root is about 4.0 metres. B forgets the square root, and C forgets to divide by pi.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circle: $A = \\pi r^2$. Halve the diameter first.', 'A semicircle is $\\pi r^2 \\div 2$; a quarter circle is $\\pi r^2 \\div 4$.', 'For a missing length, substitute and undo each operation.'] }],
      lines: [
        { say: 'Let’s sum up. The area of a circle is pi r squared, so halve the diameter first.', show: 'sum.0' },
        { say: 'A semicircle is half of that, and a quarter circle is a quarter.', show: 'sum.1' },
        { say: 'And to find a missing length, substitute into the formula, and undo each operation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
