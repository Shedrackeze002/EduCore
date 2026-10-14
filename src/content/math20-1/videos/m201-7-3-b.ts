import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 6], y: [-4, 8], every: 0 });

const video: Explainer = {
  id: 'm201-7-3-b',
  lessonId: 'm201-7-3',
  title: 'Absolute Value Equations, Part 2: Extraneous Solutions',
  thumbnailTitle: 'Extraneous Solutions',
  thumbnail: 'g',
  summary: 'Solving |x − 3| = 2x + 1, where the variable on the right side makes x = −4 extraneous, checking both answers, and a graph showing the line meets the V only once.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.3 · Part 2', title: 'Extraneous Solutions', subtitle: 'When the right side has a variable' }],
      lines: [
        { say: 'When the right side of an absolute value equation contains the variable, it might be negative for some of the answers you find. Those answers cannot work.', show: 'title' },
        { say: 'In this video, you will solve such an equation, check for extraneous solutions, and see why on a graph.' },
      ],
    },
    {
      chapter: 'A variable on the right',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous solution', md: 'A value found while solving that does not satisfy the original equation. With absolute value equations, it usually makes the right side negative.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['|x - 3| = 2x + 1', 'x - 3 = 2x + 1:\\quad x = -4', 'x - 3 = -(2x + 1):\\quad 3x = 2,\\ x = \\tfrac{2}{3}'] },
      ],
      lines: [
        { say: 'An extraneous solution is a value found while solving that does not satisfy the original equation. With absolute value equations, it usually makes the right side negative.', show: 'def' },
        { say: 'Solve the absolute value of x minus three equals two x plus one. In case one, x minus three equals two x plus one, so x is negative four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'In case two, x minus three equals the opposite of two x plus one, which is negative two x minus one. So three x is two, and x is two thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'Solving both cases treats the right side as if it could be either sign. But an absolute value can only equal a number that is not negative, so each answer must be checked.' },
      ],
    },
    {
      chapter: 'Check both',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('g', [
          g,
          plot(g, { id: 'v', f: (x) => Math.abs(x - 3), tone: 'brand' }),
          plot(g, { id: 'line', f: (x) => 2 * x + 1, from: -2.5, to: 3.5, tone: 'opp' }),
          dots(g, [{ id: 'S', x: 2 / 3, y: 7 / 3, tex: '', tone: 'good' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -4:\\quad |{-}7| = 7', '2(-4) + 1 = -7:\\ \\text{reject}', 'x = \\tfrac{2}{3}:\\quad \\left|{-}\\tfrac{7}{3}\\right| = \\tfrac{7}{3}', '\\tfrac{4}{3} + 1 = \\tfrac{7}{3} \\;\\checkmark'] }],
      lines: [
        { say: 'Check x equals negative four. The left side is the absolute value of negative seven, which is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'But the right side is negative seven. They are not equal, so negative four is extraneous: reject it.', show: 'm.1', focus: 'm.1' },
        { say: 'Check x equals two thirds. The left side is seven thirds, and the right side, four thirds plus one, is seven thirds too. So the only solution is x equals two thirds.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'The graph shows why there is only one solution. The line y equals two x plus one meets the V of y equals the absolute value of x minus three only once, at x equals two thirds.', show: ['g.grid', 'g.axes', 'g.v', 'g.line', 'g.S'], focus: ['g.line', 'g.S'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $|x - 1| = 2x + 4$.',
          choices: ['$x = -1$', '$x = -5$ or $x = -1$', '$x = -5$', 'No solution'],
          answer: 0,
          working: 'Case 1 gives $x = -5$, but then the right side is $-6$, so it is extraneous. Case 2 gives $3x = -3$ and $x = -1$: $|{-}2| = 2 = 2(-1) + 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the absolute value of x minus one equals two x plus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Case one gives x equals negative five, but then the right side is negative six, so it is extraneous. Case two gives three x equals negative three, so x is negative one, and both sides are two. B forgets to check.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['With a variable on the right, check every answer.', 'Reject any answer that makes the right side negative.', 'A graph shows how many times the two sides meet.'] }],
      lines: [
        { say: 'Let’s sum up. When the right side contains the variable, check every answer.', show: 'sum.0' },
        { say: 'Reject any answer that makes the right side negative.', show: 'sum.1' },
        { say: 'And a graph shows how many times the two sides meet. In part three, we solve equations with quadratic expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
