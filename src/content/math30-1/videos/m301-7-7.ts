import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-1, 9], y: [-4, 6], every: 2, width: 9, height: 9 });
const log2 = (x: number) => (x > 0 ? Math.log2(x) : NaN);

/** Names for the asymptote x = 2 and the line y = 3, clear of the curve. */
const names: Part = {
  points: { an: g.map(2, 5.6), ln: g.map(8.9, 3) },
  items: [
    { kind: 'label', id: 'asy-name', at: 'an', tex: 'x = 2', tone: 'muted', place: 'left' },
    { kind: 'label', id: 'line-name', at: 'ln', tex: 'y = 3', tone: 'opp', place: 'below left' },
  ],
};

const video: Explainer = {
  id: 'm301-7-7',
  lessonId: 'm301-7-7',
  title: 'Logarithmic and Exponential Equations, Part 1: Solving Logarithmic Equations',
  thumbnailTitle: 'Solving Logarithmic Equations',
  thumbnail: 'gr',
  summary: 'Solving logarithmic equations by combining with the laws, converting to exponential form, solving and checking: log₂ x + log₂(x − 2) = 3, where x = −2 is an extraneous root, and log₃(x + 6) − log₃(x − 2) = 2. Also why every root must be checked in the original equation. Part 2 solves exponential equations with logarithms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.7 · Part 1', title: 'Solving Logarithmic Equations', subtitle: 'Combine, convert, solve, check' }],
      lines: [
        { say: 'When an equation has more than one logarithm, the laws of logarithms combine them into one. But combining can produce an answer that does not really work.', show: 'title' },
        { say: 'In this video, you will solve logarithmic equations in four steps, and learn to spot and reject an extraneous root.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Use the laws to write a single logarithm equal to a number.', 'Convert to exponential form.', 'Solve the resulting equation.', 'Check every answer in the **original** equation: each argument must be positive.'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'A value found while solving that does not satisfy the original equation. In logarithmic equations, it is usually a value that makes an argument zero or negative.' },
      ],
      lines: [
        { say: 'First, use the laws of logarithms to write the equation as a single logarithm equal to a number.', show: 'b.0' },
        { say: 'Second, convert to exponential form. Third, solve the equation you get.', show: ['b.1', 'b.2'] },
        { say: 'Fourth, and this step is not optional, check every answer in the original equation. Each argument must be positive.', show: 'b.3' },
        { say: 'A value that you find while solving, but that does not satisfy the original equation, is called an extraneous root. In logarithmic equations, it usually makes an argument zero or negative.', show: 'def' },
      ],
    },
    {
      chapter: 'A root to reject',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2} x + \\log_{2}(x - 2) = 3', '\\log_{2}\\left[x(x - 2)\\right] = 3', 'x(x - 2) = 2^{3} = 8', 'x^{2} - 2x - 8 = 0', '(x - 4)(x + 2) = 0:\\quad x = 4 \\text{ or } x = -2'] },
      ],
      lines: [
        { say: 'Solve log base two of x, plus log base two of x minus two, equals three.', show: 'm.0', focus: 'm.0' },
        { say: 'The product law combines the two logarithms: log base two of x times x minus two, equals three.', show: 'm.1', focus: 'm.1' },
        { say: 'Convert to exponential form: x times x minus two equals two cubed, which is eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand and move the eight across: x squared minus two x minus eight equals zero.', show: 'm.3', focus: 'm.3' },
        { say: 'Factor: x minus four, times x plus two, equals zero. So x is four or negative two. But we are not done until we check.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Checking the roots',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('gr', [
          g,
          polyline(g, { id: 'asy', points: [[2, -4], [2, 6]], tone: 'muted', dashed: true }),
          polyline(g, { id: 'line', points: [[-1, 3], [9, 3]], tone: 'opp' }),
          names,
          plot(g, { id: 'curve', f: (x) => log2(x) + log2(x - 2), from: 2.0001, to: 9, samples: 400 }),
          dots(g, [{ id: 'S', x: 4, y: 3, tex: '(4, 3)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -2:\\ \\log_{2}(-2)', '\\text{is undefined}', 'x = 4:\\ \\log_{2} 4 + \\log_{2} 2', '= 2 + 1 = 3\\ \\checkmark'] }],
      lines: [
        { say: 'Check x equals negative two in the original equation. The first term would be log base two of negative two, which is undefined. So negative two is an extraneous root. Reject it.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Check x equals four. Log base two of four is two, and log base two of two is one. Two plus one is three.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The graph agrees. Y equals log base two of x, plus log base two of x minus two, only exists to the right of its asymptote, x equals two.', show: ['gr.grid', 'gr.axes', 'gr.asy', 'gr.asy-name', 'gr.curve'], focus: 'gr.curve' },
        { say: 'It meets the line y equals three only once, at four, three. The only solution is x equals four.', show: ['gr.line', 'gr.line-name', 'gr.S'], focus: ['gr.line', 'gr.S'] },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{3}(x + 6) - \\log_{3}(x - 2) = 2', '\\log_{3} \\dfrac{x + 6}{x - 2} = 2 \\;\\to\\; \\dfrac{x + 6}{x - 2} = 3^{2} = 9', 'x + 6 = 9x - 18,\\quad 8x = 24,\\quad x = 3', '\\text{Check: } 3 + 6 = 9 > 0,\\quad 3 - 2 = 1 > 0\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Solve log base three of x plus six, minus log base three of x minus two, equals two.', show: 'm.0', focus: 'm.0' },
        { say: 'The quotient law combines them: log base three of x plus six over x minus two equals two. In exponential form, that fraction equals three squared, which is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by x minus two: x plus six equals nine x minus eighteen. So eight x equals 24, and x equals three.', show: 'm.2', focus: 'm.2' },
        { say: 'Check the arguments. Three plus six is nine, and three minus two is one. Both are positive, so x equals three is a solution.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2}(x^{2} - 2x) = 3 \\;\\to\\; x = 4 \\text{ or } x = -2', 'x = -2:\\quad (-2)^{2} - 2(-2) = 8 > 0\\ \\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check the original equation', md: 'Whether a root is extraneous depends on the arguments of the **original** equation. Never check in a combined one.' },
      ],
      lines: [
        { say: 'Here is a twist. The equation log base two of x squared minus two x, equals three, leads to the same quadratic, and the same two roots.', show: 'm.0', focus: 'm.0' },
        { say: 'But this time, both are solutions. For x equals negative two, the argument is four plus four, which is eight. That is positive, so negative two works here.', show: 'm.1', focus: 'm.1' },
        { say: 'So whether a root is extraneous depends on the original arguments. Always check in the original equation, never in a combined one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\log_{6} x + \\log_{6}(x - 5) = 2$.',
          choices: ['$x = -4$', '$x = 9$ or $x = -4$', '$x = 4$', '$x = 9$'],
          answer: 3,
          working: '$x(x - 5) = 6^{2} = 36$, so $x^{2} - 5x - 36 = 0$ and $(x - 9)(x + 4) = 0$. $x = -4$ makes $\\log_{6} x$ undefined, so it is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve log base six of x, plus log base six of x minus five, equals two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Combining gives x times x minus five equals 36, so x is nine or negative four. B keeps negative four, but log base six of negative four is undefined, so negative four is extraneous.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Combine with the laws, convert to exponential form, and solve.', 'Check every root in the original equation: each argument must be positive.', 'Reject an extraneous root, one that makes an argument zero or negative.'] }],
      lines: [
        { say: 'Let’s sum up. Combine the logarithms with the laws, convert to exponential form, and solve.', show: 'sum.0' },
        { say: 'Then check every root in the original equation. Each argument must be positive.', show: 'sum.1' },
        { say: 'Reject any extraneous root. In part two, we use logarithms to solve exponential equations that have no common base. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
