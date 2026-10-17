import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const sd = steps('sd');
const g = plane({ x: [-4, 5], y: [-10, 10], yStep: 2, every: 0, width: 9, height: 10 });

const video: Explainer = {
  id: 'm301-3-3-b',
  lessonId: 'm301-3-3',
  title: 'The Factor Theorem, Part 2: The Integral Zero Theorem',
  thumbnailTitle: 'The Integral Zero Theorem',
  thumbnail: 'sd',
  summary: 'Why an integral zero of a polynomial with integer coefficients divides the constant term, listing the possible integral zeros ±1, ±2, ±3, ±6 of x³ − 2x² − 5x + 6, and factoring it completely as (x − 1)(x − 3)(x + 2) with synthetic division. Part 3 factors higher degrees.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.3 · Part 2', title: 'The Integral Zero Theorem', subtitle: 'Which values are worth testing' }],
      lines: [
        { say: 'The factor theorem can test any value of "a". But which values are worth testing? For a polynomial with integer coefficients, the constant term answers that.', show: 'title' },
        { say: 'In this video, you will list the possible integral zeros of a polynomial, find one, and use it to factor a cubic completely.' },
      ],
    },
    {
      chapter: 'The theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Integral zero theorem', md: 'If $x = b$ is an integral zero of a polynomial $P(x)$ with integer coefficients, then $b$ is a factor of the constant term of $P(x)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(b) = a_nb^n + \\dots + a_1b + a_0 = 0', 'a_0 = -b\\left(a_nb^{n-1} + \\dots + a_1\\right)'] },
      ],
      lines: [
        { say: 'An integral zero is a zero that is an integer. The integral zero theorem says: if x equals b is an integral zero of a polynomial with integer coefficients, then b is a factor of the constant term.', show: 'def' },
        { say: 'Here is why. If b is a zero, then P of b equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Move the constant term, "a" sub zero, to the other side, and factor b out of everything else. "a" sub zero equals negative b, times a bracket.', show: 'm.1', focus: 'm.1' },
        { say: 'Every term in the bracket is an integer, so the bracket is an integer. That means b divides "a" sub zero exactly.' },
      ],
    },
    {
      chapter: 'Possible integral zeros',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = x^3 - 2x^2 - 5x + 6', '\\text{factors of } 6\\colon\\quad 1,\\ 2,\\ 3,\\ 6', '\\text{possible integral zeros:}\\quad \\pm 1,\\ \\pm 2,\\ \\pm 3,\\ \\pm 6', 'P(1) = 1 - 2 - 5 + 6 = 0 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Quick tests', md: '$P(1)$ is the sum of the coefficients, so it takes seconds to check. Test small values first: they keep the arithmetic easy.' },
      ],
      lines: [
        { say: 'List the possible integral zeros of P of x equals x cubed, minus two x squared, minus five x, plus six, and find one zero.', show: 'm.0', focus: 'm.0' },
        { say: 'The constant term is six. Its factors are one, two, three and six.', show: 'm.1', focus: 'm.1' },
        { say: 'Zeros can be negative too, so the possible integral zeros are plus or minus one, plus or minus two, plus or minus three, and plus or minus six.', show: 'm.2', focus: 'm.2' },
        { say: 'Test one first. P of one is just the sum of the coefficients: one, minus two, minus five, plus six, which is zero. So x equals one is a zero, and x minus one is a factor.', show: ['m.3', 'tip'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative factors', md: 'The list for a constant term of $6$ is $\\pm 1, \\pm 2, \\pm 3, \\pm 6$, not just $1, 2, 3, 6$. And the leading coefficient plays no part in the list of possible integral zeros.' }],
      lines: [
        { say: 'Do not forget the negative factors. For a constant term of six, the list is plus or minus one, two, three and six: eight values, not four.', show: 'oops' },
        { say: 'And only the constant term matters. The leading coefficient plays no part in the list of possible integral zeros.' },
      ],
    },
    {
      chapter: 'Factoring completely',
      layout: 'split',
      leftWidth: 540,
      left: [figure('sd', [synthetic({ a: 1, coeffs: [1, -2, -5, 6] })])],
      right: [
        { kind: 'bullets', id: 'st', items: ['Remove any common factor.', 'Find a zero: $P(1) = 0$.', 'Divide by $x - 1$.', 'Factor the quotient: $x^2 - x - 6 = (x - 3)(x + 2)$.'] },
        { kind: 'text', id: 'ans', size: 'lg', md: '$P(x) = (x - 1)(x - 3)(x + 2)$' },
      ],
      lines: [
        { say: 'To factor a polynomial of degree three or more: remove any common factor, find a zero, divide, and repeat until the quotient is a quadratic. Then factor the quadratic.' },
        { say: 'Factor P of x completely. There is no common factor to remove, and we already know that P of one is zero.', show: ['st.0', 'st.1'], focus: 'st.1' },
        { say: 'So divide by x minus one, with synthetic division. Bring down the one. One times one is one, and negative two plus one is negative one.', show: ['st.2', ...sd.setup, sd.bring, ...sd.step(1)], focus: ['st.2', 'sd.s1'] },
        { say: 'Negative one times one is negative one, and negative five plus negative one is negative six. Negative six times one is negative six, and six plus negative six is zero.', show: [...sd.step(2), ...sd.step(3), sd.box], focus: 'sd.s3' },
        { say: 'The remainder is zero, just as the factor theorem promised. The quotient is x squared, minus x, minus six.', focus: ['sd.s0', 'sd.s1', 'sd.s2'] },
        { say: 'That quadratic factors as x minus three, times x plus two.', show: 'st.3', focus: ['st.3', 'sd'] },
        { say: 'So P of x equals x minus one, times x minus three, times x plus two.', show: 'ans', focus: 'st' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'curve', f: (x) => x ** 3 - 2 * x ** 2 - 5 * x + 6, tone: 'brand' }),
          dots(g, [
            { id: 'X1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below right', group: 'xints' },
            { id: 'X2', x: 1, y: 0, tex: '1', tone: 'adj', place: 'above right', group: 'xints' },
            { id: 'X3', x: 3, y: 0, tex: '3', tone: 'adj', place: 'below right', group: 'xints' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x - 1)(x - 3)(x + 2)', '\\text{zeros: } 1,\\ 3,\\ -2'] }],
      lines: [
        { say: 'Here is the graph of y equals x cubed, minus two x squared, minus five x, plus six.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'm.0'] },
        { say: 'Each factor gives a zero: one, three and negative two. They are exactly the x-intercepts of the graph.', show: ['m.1', 'gr.xints'], focus: ['m.1', 'gr.xints'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is **not** a possible integral zero of $P(x) = x^3 + 4x^2 - 3x - 10$?',
          choices: ['$-2$', '$-5$', '$10$', '$4$'],
          answer: 3,
          working: 'The constant term is $-10$, so the possible integral zeros are $\\pm 1, \\pm 2, \\pm 5, \\pm 10$. $4$ does not divide $-10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is not a possible integral zero of P of x equals x cubed, plus four x squared, minus three x, minus ten? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The constant term is negative ten, so the possible integral zeros are plus or minus one, two, five and ten. Four is not on the list: it comes from a coefficient, not the constant term. B, negative five, is on the list, because the negative factors count too.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Integral zero theorem: an integral zero is a factor of the constant term.', 'List $\\pm$ every factor, and test small values first. $P(1)$ is the sum of the coefficients.', 'To factor completely: find a zero, divide, then factor the quadratic quotient.'] }],
      lines: [
        { say: 'Let’s sum up. The integral zero theorem: an integral zero of a polynomial with integer coefficients is a factor of its constant term.', show: 'sum.0' },
        { say: 'List plus or minus every factor, and test small values first. P of one is just the sum of the coefficients.', show: 'sum.1' },
        { say: 'And to factor completely, find a zero, divide, then factor the quadratic quotient. In part three, we factor quartics, and polynomials whose leading coefficient is not one. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
