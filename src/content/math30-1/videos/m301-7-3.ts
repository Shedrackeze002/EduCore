import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 4], y: [-1, 10], every: 2, width: 9, height: 9 });

/** The name of the line y = 8, above it at the left edge of the graph. */
const name: Part = { points: { ln: g.map(-2.9, 8) }, items: [{ kind: 'label', id: 'line-name', at: 'ln', tex: 'y = 8', tone: 'opp', place: 'above right' }] };

const video: Explainer = {
  id: 'm301-7-3',
  lessonId: 'm301-7-3',
  title: 'Solving Exponential Equations, Part 1: Equal Powers, Equal Exponents',
  thumbnailTitle: 'Equal Powers, Equal Exponents',
  thumbnail: 'hl',
  summary: 'Why c^m = c^n means m = n (the graph of y = cˣ passes the horizontal line test), and solving 3^(x − 1) = 81, 5^(2x) = 1/125 and a doubling problem by writing one side as a power of the same base. Part 2 rewrites both sides with a common base.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.3 · Part 1', title: 'Equal Powers, Equal Exponents', subtitle: 'Solving equations with the variable in an exponent' }],
      lines: [
        { say: 'A culture of 200 bacteria doubles every three hours. When will it reach 6,400 bacteria? The unknown time is in an exponent.', show: 'title' },
        { say: 'In this video, you will see why two equal powers with the same base must have equal exponents, and use that idea to solve exponential equations.' },
      ],
    },
    {
      chapter: 'Exponential equations',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exponential equation', md: 'An equation with the variable in an exponent, such as $3^{x - 1} = 81$ or $2^{x + 1} = 8^{x - 2}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['200(2)^{\\frac{t}{3}} = 6400', '2^{\\frac{t}{3}} = 32 = 2^{5}', '\\dfrac{t}{3} = 5,\\quad t = 15'] },
      ],
      lines: [
        { say: 'An exponential equation has the variable in an exponent.', show: 'def' },
        { say: 'After t hours, the culture holds 200 times two to the power t over three bacteria. Set that equal to 6,400.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by 200: two to the power t over three equals 32. And 32 is two to the power five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now both sides are powers of two. If the powers are equal, the exponents must be equal too. So t over three equals five, and t equals 15 hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Why the exponents match',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('hl', [
          g,
          plot(g, { id: 'curve', f: (x) => 2 ** x, samples: 200 }),
          polyline(g, { id: 'line', points: [[-3, 8], [4, 8]], tone: 'opp' }),
          name,
          dots(g, [{ id: 'S', x: 3, y: 8, tex: '(3, 8)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'callout', id: 'prop', tone: 'key', title: 'Equal powers, equal exponents', md: 'If $c^{m} = c^{n}$, where $c > 0$ and $c \\ne 1$, then $m = n$.' }],
      lines: [
        { say: 'Why must the exponents match? Look at the graph of y equals two to the power x. It is always increasing.', show: ['hl.grid', 'hl.axes', 'hl.curve'], focus: 'hl.curve' },
        { say: 'So it passes the horizontal line test. The line y equals eight meets it only once, at x equals three. Only one exponent gives eight.', show: ['hl.line', 'hl.line-name', 'hl.S'], focus: ['hl.line', 'hl.S'] },
        { say: 'The same is true for any base c greater than zero, other than one. So if c to the power m equals c to the power n, then m equals n.', show: 'prop' },
      ],
    },
    {
      chapter: 'Write one side as a power',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3^{x - 1} = 81', '3^{x - 1} = 3^{4}', 'x - 1 = 4', 'x = 5'] },
      ],
      lines: [
        { say: 'Solve three to the power x minus one equals 81.', show: 'm.0', focus: 'm.0' },
        { say: 'The left side is a power of three. Is 81 a power of three? Three, nine, 27, 81. Yes: 81 is three to the power four.', show: 'm.1', focus: 'm.1' },
        { say: 'The bases are equal, so the exponents are equal: x minus one equals four.', show: 'm.2', focus: 'm.2' },
        { say: 'So x equals five. Check: three to the power four is 81.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A reciprocal',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5^{2x} = \\dfrac{1}{125}', '\\dfrac{1}{125} = \\dfrac{1}{5^{3}} = 5^{-3}', '5^{2x} = 5^{-3}', '2x = -3,\\quad x = -\\dfrac{3}{2}'] },
      ],
      lines: [
        { say: 'Solve five to the power two x equals one over 125.', show: 'm.0', focus: 'm.0' },
        { say: '125 is five cubed. And a reciprocal is a negative exponent, so one over five cubed is five to the power negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Now both sides are powers of five.', show: 'm.2', focus: 'm.2' },
        { say: 'Set the exponents equal: two x equals negative three. So x equals negative three halves.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2^{x + 3} = \\dfrac{1}{16}$.',
          choices: ['$x = -1$', '$x = -7$', '$x = 1$', '$x = -\\frac{4}{3}$'],
          answer: 1,
          working: '$\\dfrac{1}{16} = \\dfrac{1}{2^{4}} = 2^{-4}$, so $x + 3 = -4$ and $x = -7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two to the power x plus three equals one over 16. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. One over 16 is two to the power negative four, so x plus three equals negative four, and x is negative seven. C comes from x plus three equals four, which forgets that the reciprocal makes the exponent negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['If $c^{m} = c^{n}$ (with $c > 0$, $c \\ne 1$), then $m = n$.', 'Write both sides as powers of the same base, then set the exponents equal.', 'A reciprocal is a negative exponent: $\\frac{1}{c^{n}} = c^{-n}$.'] }],
      lines: [
        { say: 'Let’s sum up. If c to the power m equals c to the power n, then m equals n, because the graph passes the horizontal line test.', show: 'sum.0' },
        { say: 'So write both sides as powers of the same base, and set the exponents equal.', show: 'sum.1' },
        { say: 'And a reciprocal is a negative exponent. In part two, we solve equations whose bases are different, like eight and two. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
