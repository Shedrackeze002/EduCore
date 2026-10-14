import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/** The four numbers being ordered, and the decimal 5.4, on a number line from 4.9 to 5.6. */
const line = numberLine({
  min: 4.9,
  max: 5.6,
  step: 0.1,
  every: 0,
  length: 14,
  points: [
    { id: 'p1', value: 5, tex: '5', tone: 'brand', below: true },
    { id: 'p2', value: 3 * Math.sqrt(3), tex: '3\\sqrt{3}', tone: 'opp' },
    { id: 'p3', value: 2 * Math.sqrt(7), tex: '2\\sqrt{7}', tone: 'adj', below: true },
    { id: 'p4', value: Math.sqrt(30), tex: '\\sqrt{30}', tone: 'good', below: true },
    { id: 'p5', value: 5.4, tex: '5.4', tone: 'theta' },
  ],
});

const video: Explainer = {
  id: 'm202-4-1-c',
  lessonId: 'm202-4-1',
  title: 'Mixed and Entire Radicals, Part 3: Ordering Radicals and Exact Lengths',
  thumbnailTitle: 'Ordering Radicals',
  thumbnail: 'nl',
  summary: 'Ordering 2√7, 3√3, √30 and 5 by writing each as an entire radical, placing a decimal such as 5.4 among them by squaring it, and finding the exact length of a gate brace, 4√5 ft.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.1 · Part 3', title: 'Ordering Radicals', subtitle: 'Which one is bigger?' }],
      lines: [
        { say: 'Which is bigger: two root seven, or three root three? A larger number in front does not always mean a larger radical.', show: 'title' },
        { say: 'In this video, you will put radicals in order without a calculator, and record exact lengths in simplest form.' },
      ],
    },
    {
      chapter: 'Ordering radicals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sqrt{7} = \\sqrt{28},\\quad 3\\sqrt{3} = \\sqrt{27},\\quad 5 = \\sqrt{25},\\quad \\sqrt{30}', '25 < 27 < 28 < 30', '5 < 3\\sqrt{3} < 2\\sqrt{7} < \\sqrt{30}'] },
        figure('nl', [line], 160),
      ],
      lines: [
        { say: 'Order two root seven, three root three, root thirty, and five, from least to greatest. To compare, write every number as an entire radical.', show: 'm.0', focus: 'm.0' },
        { say: 'Two root seven is root twenty-eight, three root three is root twenty-seven, and five is root twenty-five, because a whole number is the square root of its square.' },
        { say: 'Now compare the radicands. Twenty-five is less than twenty-seven, which is less than twenty-eight, which is less than thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'So the order is five, three root three, two root seven, and root thirty. Three has the larger number in front, but three root three is the smaller of the two.', show: ['m.2', 'nl.axis', 'nl.p1', 'nl.p2', 'nl.p3', 'nl.p4'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Decimals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Comparing a decimal', md: 'Square the decimal: $5.4^2 = 29.16$, so $5.4 = \\sqrt{29.16}$. It lies between $2\\sqrt{7} = \\sqrt{28}$ and $\\sqrt{30}$.' },
        figure('dl', [line], 160),
      ],
      lines: [
        { say: 'To compare a decimal like 5.4 with radicals, square it. 5.4 squared is 29.16, so 5.4 is the square root of 29.16.', show: ['tip', 'dl.axis', 'dl.p1', 'dl.p2', 'dl.p3', 'dl.p4'] },
        { say: 'That lies between root twenty-eight and root thirty, so 5.4 fits between two root seven and root thirty.', show: 'dl.p5', focus: 'dl.p5' },
      ],
    },
    {
      chapter: 'A diagonal brace',
      layout: 'split',
      leftWidth: 540,
      left: [figure('gt', [rectangle({ w: 8, h: 4, labels: { w: '8\\text{ ft}', h: '4\\text{ ft}', d: 'd' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d = \\sqrt{8^2 + 4^2} = \\sqrt{80}', '\\sqrt{80} = \\sqrt{16 \\times 5} = 4\\sqrt{5}', '4\\sqrt{5} \\approx 8.9\\text{ ft}'] }],
      lines: [
        { say: 'Simplest radical form is how exact measurements are recorded before rounding. A farm gate is eight feet wide and four feet tall. How long is a diagonal brace from corner to corner, exactly?', show: ['gt.shape', 'gt.w', 'gt.h', 'gt.right'] },
        { say: 'By the Pythagorean theorem, the brace is the square root of sixty-four plus sixteen, which is root eighty.', show: ['gt.d', 'm.0'], focus: ['gt.d', 'm.0'] },
        { say: 'Sixteen is the largest perfect square in eighty, so root eighty is four root five. The brace is exactly four root five feet, about 8.9 feet. Round only at the last step, when you cut.', show: ['m.1', 'm.2'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Order $3\\sqrt{2}$, $2\\sqrt{5}$ and $4$ from least to greatest.',
          choices: ['$4 < 3\\sqrt{2} < 2\\sqrt{5}$', '$3\\sqrt{2} < 2\\sqrt{5} < 4$', '$2\\sqrt{5} < 3\\sqrt{2} < 4$', '$4 < 2\\sqrt{5} < 3\\sqrt{2}$'],
          answer: 0,
          working: '$3\\sqrt{2} = \\sqrt{18}$, $2\\sqrt{5} = \\sqrt{20}$ and $4 = \\sqrt{16}$, and $16 < 18 < 20$.',
        },
      ],
      lines: [
        { say: 'Your turn. Order three root two, two root five, and four, from least to greatest. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three root two is root eighteen, two root five is root twenty, and four is root sixteen. Sixteen, eighteen, twenty: so four, three root two, then two root five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To order radicals, write each as an entire radical.', 'A whole number $w$ is $\\sqrt{w^2}$; square a decimal to compare it.', 'Record exact lengths in simplest form; round at the end.'] }],
      lines: [
        { say: 'Let’s sum up. To order radicals, write each one as an entire radical, and compare the radicands.', show: 'sum.0' },
        { say: 'A whole number is the square root of its square, and you can square a decimal to compare it.', show: 'sum.1' },
        { say: 'And record exact lengths in simplest radical form, rounding only at the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
