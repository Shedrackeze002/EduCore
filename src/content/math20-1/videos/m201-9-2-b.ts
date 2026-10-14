import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

const MIN = -5;
const MAX = 3;
const LENGTH = 14;
const X = (v: number) => ((v - MIN) / (MAX - MIN)) * LENGTH;

/** Open dots at the two roots, which are not included. */
const open: Part = {
  points: { o1: [X(-3), 0], o2: [X(0.5), 0] },
  items: [
    { kind: 'label', id: 'd1', at: 'o1', tex: '-3', tone: 'opp', place: 'above', dot: true, open: true },
    { kind: 'label', id: 'd2', at: 'o2', tex: '\\tfrac{1}{2}', tone: 'opp', place: 'above', dot: true, open: true },
  ],
};

const video: Explainer = {
  id: 'm201-9-2-b',
  lessonId: 'm201-9-2',
  title: 'Quadratic Inequalities in One Variable, Part 2: Sign Diagrams',
  thumbnailTitle: 'Sign Diagrams',
  thumbnail: 't',
  summary: 'Solving 2x² + 5x − 3 > 0 with a sign diagram of its factors, why an even number of negative factors gives a positive product, and showing the solution on a number line with open or closed dots.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.2 · Part 2', title: 'Sign Diagrams', subtitle: 'The signs of the factors' }],
      lines: [
        { say: 'When a quadratic factors, you can find its sign in each interval from the signs of its factors, without substituting.', show: 'title' },
        { say: 'In this video, you will solve a quadratic inequality with a sign diagram, and show the solution on a number line.' },
      ],
    },
    {
      chapter: 'A sign diagram',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2x^2 + 5x - 3 > 0:\\quad (2x - 1)(x + 3) > 0,\\quad x = -3,\\ \\tfrac{1}{2}'] },
        { kind: 'table', id: 't', head: ['factor', '$x < -3$', '$-3 < x < \\tfrac{1}{2}$', '$x > \\tfrac{1}{2}$'], rows: [['$x + 3$', '$-$', '$+$', '$+$'], ['$2x - 1$', '$-$', '$-$', '$+$'], ['product', '$+$', '$-$', '$+$']] },
      ],
      lines: [
        { say: 'A sign diagram records the sign of each factor in each interval. The product is positive when an even number of the factors are negative, and negative when an odd number are.' },
        { say: 'Solve two x squared, plus five x, minus three, greater than zero. It factors as two x minus one, times x plus three, so the roots are negative three and one half.', show: 'm.0', focus: 'm.0' },
        { say: 'Make a column for each interval. x plus three is negative left of negative three, and positive after it. Two x minus one is negative left of one half, and positive after it.', show: 't' },
        { say: 'Multiply the signs in each column: positive, negative, positive. We need greater than zero, so keep the outside intervals: x less than negative three, or x greater than one half.' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\{x \\mid x < -3 \\text{ or } x > \\tfrac{1}{2},\\ x \\in \\mathbb{R}\\}'] },
        figure(
          'nl',
          [
            numberLine({
              min: MIN,
              max: MAX,
              step: 1,
              length: LENGTH,
              spans: [
                { id: 'left', from: MIN, to: -3, tone: 'good' },
                { id: 'right', from: 0.5, to: MAX, tone: 'good' },
              ],
            }),
            open,
          ],
          150,
        ),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Open and closed dots', md: 'A **closed** dot includes the boundary value ($\\le$, $\\ge$). An **open** dot leaves it out ($<$, $>$).' },
      ],
      lines: [
        { say: 'In set notation, the solution is all real x less than negative three, or greater than one half. The roots are not included, because the sign is greater than.', show: 'm.0', focus: 'm.0' },
        { say: 'On a number line, shade both rays, and use an open dot at each root.', show: ['nl.axis', 'nl.left', 'nl.right', 'nl.d1', 'nl.d2'], focus: ['nl.left', 'nl.right'] },
        { say: 'A closed dot means the boundary value is included, for at most or at least. An open dot means it is not, for less than or greater than.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $(x - 1)(x + 5) \\ge 0$.',
          choices: ['$x \\le -5$ or $x \\ge 1$', '$-5 \\le x \\le 1$', '$x < -5$ or $x > 1$', '$x \\ge 1$'],
          answer: 0,
          working: 'The roots are $-5$ and $1$. Both factors are negative when $x < -5$, and both positive when $x > 1$, so the product is positive outside the roots; $\\ge$ includes them.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x minus one, times x plus five, at least zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The roots are negative five and one. Outside them, both factors have the same sign, so the product is positive, and at least includes the roots. C leaves them out, and B is where the product is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A sign diagram shows the sign of each factor in each interval.', 'An even number of negative factors gives a positive product.', 'Closed dots for $\\le$ and $\\ge$; open dots for $<$ and $>$.'] }],
      lines: [
        { say: 'Let’s sum up. A sign diagram shows the sign of each factor, in each interval.', show: 'sum.0' },
        { say: 'An even number of negative factors gives a positive product.', show: 'sum.1' },
        { say: 'And on a number line, use closed dots for at most or at least, and open dots for less than or greater than. In part three, we rearrange and solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
