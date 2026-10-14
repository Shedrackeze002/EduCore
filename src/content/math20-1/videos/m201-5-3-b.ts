import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 8], y: [-6, 5], every: 0 });

/** The extraneous root's label, set in the clear space under the grey curve. */
const extraneous: Part = {
  points: { 'E-at': [3.6, -3.9] },
  items: [{ kind: 'label', id: 'E-t', at: 'E-at', tex: '(1, -2)', tone: 'bad', place: 'center' }],
};

const video: Explainer = {
  id: 'm201-5-3-b',
  lessonId: 'm201-5-3',
  title: 'Radical Equations, Part 2: Extraneous Roots',
  thumbnailTitle: 'Extraneous Roots',
  thumbnail: 'ex',
  summary: 'Why squaring both sides can add roots, solving √(x + 3) = x − 3 and rejecting the extraneous root x = 1, a graph that shows where it comes from, equations with no solution, and squaring the whole side rather than term by term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.3 · Part 2', title: 'Extraneous Roots', subtitle: 'Why checking is part of the method' }],
      lines: [
        { say: 'Squaring both sides is the key move in solving a radical equation, but it can sneak in answers that do not work.', show: 'title' },
        { say: 'In this video, you will see why squaring creates extraneous roots, and how to catch them.' },
      ],
    },
    {
      chapter: 'Why squaring adds roots',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a = b \\;\\Rightarrow\\; a^2 = b^2', 'a^2 = b^2 \\;\\Rightarrow\\; a = \\pm b', '(-2)^2 = 2^2,\\ \\text{ but } {-2} \\ne 2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'An **extraneous root** is a value produced while solving that does not satisfy the original equation.' },
      ],
      lines: [
        { say: 'If two numbers are equal, their squares are equal.', show: 'm.0', focus: 'm.0' },
        { say: 'But the reverse is not true. If two squares are equal, the numbers are equal, or opposite. Negative two, squared, equals two squared, but negative two is not two.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So squaring can introduce answers that solve the squared equation, but not the original one. An extraneous root is a value produced while solving, that does not satisfy the original equation.', show: 'def' },
      ],
    },
    {
      chapter: 'A quadratic after squaring',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('ex', [
          g,
          plot(g, { id: 'neg', f: (x) => -Math.sqrt(x + 3), from: -3, to: 8, tone: 'muted' }),
          plot(g, { id: 'root', f: (x) => Math.sqrt(x + 3), from: -3, to: 8, tone: 'brand' }),
          plot(g, { id: 'line', f: (x) => x - 3, from: -3, to: 8, tone: 'opp' }),
          dots(g, [
            { id: 'S', x: 6, y: 3, tex: '(6, 3)', tone: 'good', place: 'above left' },
            { id: 'E', x: 1, y: -2, tex: '', tone: 'bad' },
          ]),
          extraneous,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x + 3} = x - 3,\\quad x \\ge -3', 'x + 3 = x^2 - 6x + 9', '(x - 1)(x - 6) = 0', 'x = 1:\\ \\sqrt{4} = 2 \\ne 1 - 3', 'x = 6:\\ \\sqrt{9} = 3 = 6 - 3 \\;\\checkmark'] }],
      lines: [
        { say: 'Solve root x plus three equals x minus three. The restriction is x at least negative three. Square both sides. The right side is x minus three, squared: x squared, minus six x, plus nine.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Collect terms: x squared, minus seven x, plus six, equals zero, which factors as x minus one, times x minus six. So x is one, or six.', show: 'm.2', focus: 'm.2' },
        { say: 'Check x equals one. The left side is root four, which is two, but the right side is negative two. So one is extraneous.', show: 'm.3', focus: 'm.3' },
        { say: 'Check x equals six. Both sides are three, so the solution is x equals six.', show: 'm.4', focus: 'm.4' },
        { say: 'The graph shows why. The solution is where y equals root x plus three meets the line y equals x minus three.', show: ['ex.grid', 'ex.axes', 'ex.root', 'ex.line', 'ex.S'], focus: ['ex.root', 'ex.S'] },
        { say: 'The extraneous root is where the line meets y equals negative root x plus three, in grey: the curve that squaring brings in.', show: ['ex.neg', 'ex.E', 'ex.E-t'], focus: ['ex.neg', 'ex.E', 'ex.E-t'] },
      ],
    },
    {
      chapter: 'No solution',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x - 2} + 7 = 3', '\\sqrt{x - 2} = -4:\\quad \\text{no solution}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squaring term by term', md: '$(x - 3)^2$ is $x^2 - 6x + 9$, not $x^2 - 9$. Square the **whole side**, not each term.' },
      ],
      lines: [
        { say: 'If the isolated radical equals a negative number, there is no solution. Root x minus two, plus seven, equals three, gives root x minus two equals negative four, and a principal square root is never negative.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'And when you square a side, square the whole side, not each term. x minus three, squared, is x squared, minus six x, plus nine, not x squared minus nine.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\sqrt{x + 1} = x - 1$.',
          choices: ['$x = 3$', '$x = 0$ or $x = 3$', '$x = 0$', 'No solution'],
          answer: 0,
          working: 'Squaring gives $x + 1 = x^2 - 2x + 1$, so $x^2 - 3x = 0$ and $x = 0$ or $x = 3$. Check: $x = 0$ gives $1 \\ne -1$, so it is extraneous; $x = 3$ gives $2 = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve root x plus one equals x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Squaring gives x squared minus three x equals zero, so x is zero, or three. Check zero: the left side is one, and the right side is negative one, so zero is extraneous. Three gives two equals two. B forgets to check.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Squaring can create extraneous roots: check every answer.', 'If an isolated square root equals a negative number, there is no solution.', 'Square the whole side, not term by term.'] }],
      lines: [
        { say: 'Let’s sum up. Squaring can create extraneous roots, so check every answer in the original equation.', show: 'sum.0' },
        { say: 'If an isolated square root equals a negative number, there is no solution.', show: 'sum.1' },
        { say: 'And square the whole side, not each term. In part three, we solve equations with two radicals, and model a pendulum. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
