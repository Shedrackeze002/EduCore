import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { box, figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const P = (x: number) => x ** 3 - x ** 2 - 6 * x;
const g = plane({ x: [-3, 4], y: [-10, 10], yStep: 2, every: 0, width: 7, height: 8 });
const sd = steps('sd');

const video: Explainer = {
  id: 'm301-3-4-e',
  lessonId: 'm301-3-4',
  title: 'Equations and Graphs of Polynomial Functions, Part 5: Inequalities and Applications',
  thumbnailTitle: 'Inequalities and Applications',
  thumbnail: 'gr',
  summary: 'Solving x³ − x² − 6x ≥ 0 by testing the sign of the factored polynomial in each interval between its zeros, finding the dimensions of a box with a volume of 120 cm³ from x(x + 2)(x + 5) = 120, and keeping only answers that make sense in a context.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.4 · Part 5', title: 'Inequalities and Applications', subtitle: 'Using the zeros' }],
      lines: [
        { say: 'The zeros of a polynomial split the number line into intervals, and in each interval, the polynomial keeps the same sign. That makes polynomial inequalities straightforward.', show: 'title' },
        { say: 'In this video, you will solve a polynomial inequality, and a problem about the volume of a box.' },
      ],
    },
    {
      chapter: 'Factor and find the zeros',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^3 - x^2 - 6x \\ge 0', 'P(x) = x(x^2 - x - 6) = x(x + 2)(x - 3)', '\\text{zeros: } {-2},\\ 0,\\ 3'] }],
      lines: [
        { say: 'Solve x cubed, minus x squared, minus six x, is greater than or equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Call the left side P of x, and factor it. Take out the common factor x, then factor the quadratic: x, times x plus two, times x minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'The zeros are negative two, zero and three. They split the number line into four intervals. P of x can only change sign at a zero, so it keeps the same sign throughout each interval.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Testing each interval',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'curve', f: P, tone: 'muted' }),
          plot(g, { id: 'pos1', f: P, from: -2, to: 0, tone: 'good' }),
          plot(g, { id: 'pos2', f: P, from: 3, to: 4, tone: 'good' }),
          dots(g, [
            { id: 'Z1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below right', group: 'zeros' },
            { id: 'Z2', x: 0, y: 0, tex: '0', tone: 'adj', place: 'above right', group: 'zeros' },
            { id: 'Z3', x: 3, y: 0, tex: '3', tone: 'adj', place: 'below right', group: 'zeros' },
          ]),
        ]),
      ],
      right: [
        { kind: 'table', id: 't', head: ['Interval', 'Test', 'Sign'], rows: [['$(-\\infty, -2)$', '$P(-3) = -18$', '[[bad:−]]'], ['$(-2, 0)$', '$P(-1) = 4$', '[[good:+]]'], ['$(0, 3)$', '$P(1) = -6$', '[[bad:−]]'], ['$(3, \\infty)$', '$P(4) = 24$', '[[good:+]]']] },
        { kind: 'text', id: 'ans', size: 'lg', md: '$x \\in [-2, 0] \\cup [3, \\infty)$' },
      ],
      lines: [
        { say: 'Test one value in each interval. P of negative three is negative eighteen, so P of x is negative on the first interval.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.zeros', 't.0'], focus: 't.0' },
        { say: 'P of negative one is four, which is positive.', show: 't.1', focus: 't.1' },
        { say: 'P of one is negative six, negative again.', show: 't.2', focus: 't.2' },
        { say: 'And P of four is 24, positive.', show: 't.3', focus: 't.3' },
        { say: 'The graph shows the same thing: it is above the x-axis between negative two and zero, and to the right of three.', show: ['gr.pos1', 'gr.pos2'], focus: ['t', 'gr.pos1', 'gr.pos2'] },
        { say: 'The inequality says greater than or equal to zero, so the zeros are included too. The solution is x from negative two to zero, or x greater than or equal to three.', show: 'ans', focus: 'gr' },
      ],
    },
    {
      chapter: 'A box with a given volume',
      layout: 'split',
      leftWidth: 500,
      left: [figure('bx', [box({ l: 8, w: 5, h: 3, labels: { l: 'x + 5', w: 'x + 2', h: 'x' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x(x + 2)(x + 5) = 120', 'x^3 + 7x^2 + 10x = 120', 'x^3 + 7x^2 + 10x - 120 = 0', 'P(3) = 27 + 63 + 30 - 120 = 0'] }],
      lines: [
        { say: 'A box has a height of x centimetres, a width of x plus two centimetres, and a length of x plus five centimetres. Its volume is 120 cubic centimetres. Find its dimensions.', show: ['bx.shape', 'bx.front-face', 'bx.top-face', 'bx.side-face', 'bx.h', 'bx.w', 'bx.l'] },
        { say: 'The volume is length times width times height, so x, times x plus two, times x plus five, equals 120.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand the left side: x cubed, plus seven x squared, plus ten x.', show: 'm.1', focus: 'm.1' },
        { say: 'Then move 120 to the left, so the right side is zero: x cubed, plus seven x squared, plus ten x, minus 120, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'A length must be positive, so test the positive factors of 120. P of three is 27, plus 63, plus thirty, minus 120, which is zero. So x minus three is a factor.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The only real solution',
      layout: 'center',
      main: [
        figure('sd', [synthetic({ a: 3, coeffs: [1, 7, 10, -120], gap: 2.6 })], 250),
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 + 10x + 40 = 0\\colon\\quad b^2 - 4ac = 100 - 160 < 0', '3 \\text{ cm by } 5 \\text{ cm by } 8 \\text{ cm}\\colon\\quad 3 \\times 5 \\times 8 = 120 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Divide by x minus three. Bring down the one. One times three is three, and seven plus three is ten.', show: [...sd.setup, sd.bring, ...sd.step(1)], focus: 'sd.s1' },
        { say: 'Ten times three is thirty, and ten plus thirty is forty. Forty times three is 120, and negative 120 plus 120 is zero.', show: [...sd.step(2), ...sd.step(3), sd.box], focus: 'sd.s3' },
        { say: 'The quotient is x squared, plus ten x, plus forty. Its discriminant is 100 minus 160, which is negative, so it has no real roots. x equals three is the only real solution.', show: 'm.0', focus: ['m.0', 'sd'] },
        { say: 'So the box is three centimetres by five centimetres by eight centimetres. Check: three times five times eight is 120.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep only answers that make sense', md: 'In a context, reject zeros that give negative or zero lengths. For an open box made by cutting squares of side $x$ from the corners of a $30$ cm by $20$ cm sheet, $V(x) = x(30 - 2x)(20 - 2x)$ only makes sense for $0 < x < 10$.' }],
      lines: [
        { say: 'In a context, keep only the answers that make sense. Reject any zero that gives a negative length, or a length of zero.', show: 'oops' },
        { say: 'For example, an open box is made by cutting squares of side x from the corners of a thirty centimetre by twenty centimetre sheet. Its volume is x, times thirty minus two x, times twenty minus two x.' },
        { say: 'That only makes sense when x is between zero and ten. At ten, the width, twenty minus two x, would be zero.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $(x + 1)(x - 2)(x - 4) < 0$.',
          choices: ['$x \\in (-1, 2) \\cup (4, \\infty)$', '$x \\in (-\\infty, -1) \\cup (2, 4)$', '$x \\in (-\\infty, -1] \\cup [2, 4]$', '$x \\in (2, 4)$'],
          answer: 1,
          working: 'The zeros $-1$, $2$ and $4$ split the line. $P(-2) = -24$, $P(0) = 8$, $P(3) = -4$ and $P(5) = 18$, so $P(x) < 0$ on $(-\\infty, -1)$ and $(2, 4)$. The zeros are not included.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x plus one, times x minus two, times x minus four, is less than zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The zeros negative one, two and four split the number line. Testing one value in each interval, the product is negative to the left of negative one, and between two and four. The inequality is strictly less than zero, so the zeros are not included. C includes them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The zeros split the number line; test the sign in each interval.', 'Include the zeros for $\\le$ or $\\ge$, and leave them out for $<$ or $>$.', 'In a context, keep only answers that make sense.'] }],
      lines: [
        { say: 'Let’s sum up. The zeros split the number line into intervals. Test the sign of the polynomial in each one.', show: 'sum.0' },
        { say: 'Include the zeros for less than or equal to, or greater than or equal to, and leave them out for strict inequalities.', show: 'sum.1' },
        { say: 'And in a context, keep only the answers that make sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
