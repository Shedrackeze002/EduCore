import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const sd = steps('sd');
const g = plane({ x: [-5, 4], y: [-10, 10], yStep: 2, every: 0, width: 9, height: 10 });

const video: Explainer = {
  id: 'm301-3-4',
  lessonId: 'm301-3-4',
  title: 'Equations and Graphs of Polynomial Functions, Part 1: Solving by Factoring',
  thumbnailTitle: 'Solving Polynomial Equations',
  thumbnail: 'gr',
  summary: 'Zeros of a function, roots of an equation and x-intercepts of a graph are the same numbers. Solving x³ + 2x² − 5x − 6 = 0 with the integral zero theorem, synthetic division and the zero product property, and why the other side must be zero first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.4 · Part 1', title: 'Solving Polynomial Equations', subtitle: 'Zeros, roots and x-intercepts' }],
      lines: [
        { say: 'An engineer who needs to know where a beam’s deflection is zero, or a designer who needs a box with an exact volume, is solving a polynomial equation.', show: 'title' },
        { say: 'In this video, you will see how zeros, roots and x-intercepts are the same numbers, and solve a cubic equation by factoring.' },
      ],
    },
    {
      chapter: 'Three names, one number',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'curve', f: (x) => x ** 3 + 2 * x ** 2 - 5 * x - 6, tone: 'brand' }),
          dots(g, [
            { id: 'X1', x: -3, y: 0, tex: '-3', tone: 'adj', place: 'above left', group: 'xints' },
            { id: 'X2', x: -1, y: 0, tex: '-1', tone: 'adj', place: 'above right', group: 'xints' },
            { id: 'X3', x: 2, y: 0, tex: '2', tone: 'adj', place: 'above left', group: 'xints' },
          ]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['**Zeros** of the function $y = P(x)$', '**Roots** of the equation $P(x) = 0$', '**$x$-intercepts** of the graph'] },
        { kind: 'callout', id: 'zpp', tone: 'key', title: 'Zero product property', md: 'A product is zero only when one of its factors is zero.' },
      ],
      lines: [
        { say: 'For a polynomial function, y equals P of x, three ideas share the same numbers.', show: ['gr.grid', 'gr.axes', 'gr.curve'] },
        { say: 'The zeros of the function, the roots of the equation P of x equals zero, and the x-intercepts of its graph.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'This is the graph of y equals x cubed, plus two x squared, minus five x, minus six. It crosses the x-axis at negative three, negative one and two. So those are also the roots of the equation, x cubed plus two x squared minus five x minus six equals zero.', show: 'gr.xints', focus: 'gr.xints' },
        { say: 'Once P of x is factored, the zero product property finds them: a product is zero only when one of its factors is zero.', show: 'zpp', focus: 'gr' },
      ],
    },
    {
      chapter: 'Solving a cubic',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^3 + 2x^2 - 5x - 6 = 0', 'P(1) = -8, \\qquad P(-1) = -1 + 2 + 5 - 6 = 0'] },
        figure('sd', [synthetic({ a: -1, coeffs: [1, 2, -5, -6] })], 230),
        { kind: 'math', id: 'q', size: 'md', lines: ['(x + 3)(x + 1)(x - 2) = 0', 'x = -3, \\quad x = -1 \\quad \\text{or} \\quad x = 2'] },
      ],
      lines: [
        { say: 'Solve x cubed, plus two x squared, minus five x, minus six, equals zero. The possible integral zeros are the factors of negative six: plus or minus one, two, three and six.', show: 'm.0', focus: 'm.0' },
        { say: 'P of one is negative eight, so one is not a zero. But P of negative one is negative one, plus two, plus five, minus six: zero. So x plus one is a factor.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by x plus one. Bring down the one. One times negative one is negative one, and two plus negative one is one.', show: [...sd.setup, sd.bring, ...sd.step(1)], focus: ['m', 'sd.s1'] },
        { say: 'One times negative one is negative one, and negative five plus negative one is negative six. Negative six times negative one is six, and negative six plus six is zero.', show: [...sd.step(2), ...sd.step(3), sd.box], focus: 'sd.s3' },
        { say: 'The quotient, x squared plus x minus six, factors as x plus three, times x minus two. So the equation becomes x plus three, times x plus one, times x minus two, equals zero.', show: 'q.0', focus: ['q.0', 'sd'] },
        { say: 'By the zero product property, one of the factors is zero. So x equals negative three, x equals negative one, or x equals two: the three x-intercepts of the graph.', show: 'q.1', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The other side must be zero', md: '$x(x + 2)(x + 5) = 120$ does **not** mean $x = 120$ or $x + 2 = 120$: many numbers multiply to $120$. Expand, and rearrange to $P(x) = 0$ first.' },
      ],
      lines: [
        { say: 'The zero product property only works when the other side is zero. x times x plus two, times x plus five, equals 120, does not mean that one factor is 120. Many numbers multiply to 120.', show: 'oops' },
        { say: 'Expand, and rearrange so that one side is zero. Then factor. We solve exactly this equation in part five.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^3 - 4x^2 + x + 6 = 0$.',
          choices: ['$x = 1,\\ -2$ or $-3$', '$x = -1,\\ 2$ or $3$', '$x = -1,\\ -2$ or $3$', '$x = 1,\\ 2$ or $3$'],
          answer: 1,
          working: '$P(-1) = -1 - 4 - 1 + 6 = 0$. Dividing by $x + 1$ leaves $x^2 - 5x + 6 = (x - 2)(x - 3)$, so $(x + 1)(x - 2)(x - 3) = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x cubed, minus four x squared, plus x, plus six, equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. P of negative one is zero, so x plus one is a factor, and dividing leaves x squared, minus five x, plus six: x minus two, times x minus three. Setting each factor to zero gives negative one, two and three. Choice A takes the numbers in the factors with the wrong signs.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Zeros of $P$, roots of $P(x) = 0$ and $x$-intercepts are the same numbers.', 'Make one side zero, then factor with the factor theorem and synthetic division.', 'Set each factor equal to zero.'] }],
      lines: [
        { say: 'Let’s sum up. The zeros of a function, the roots of its equation, and the x-intercepts of its graph are the same numbers.', show: 'sum.0' },
        { say: 'To solve, make one side zero, then factor with the factor theorem and synthetic division.', show: 'sum.1' },
        { say: 'And set each factor equal to zero. In part two, we see how a repeated factor changes the shape of the graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
