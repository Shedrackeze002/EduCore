import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 7], y: [-3, 9], every: 2 });

const video: Explainer = {
  id: 'm202-4-4-b',
  lessonId: 'm202-4-4',
  title: 'Radical Equations, Part 2: Extraneous Roots',
  thumbnailTitle: 'Extraneous Roots',
  thumbnail: 'gr',
  summary: 'Why squaring both sides can create an extraneous root, an equation √(x + 5) + 6 = 2 with no solution, and how the graphs of y = √(x² + 9) and the lines y = x + 1 and y = x − 1 explain why one equation has a solution and the other does not.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.4 · Part 2', title: 'Extraneous Roots', subtitle: 'Answers that do not work' }],
      lines: [
        { say: 'Squaring both sides of an equation is powerful, but it can also create an answer that does not work in the original equation.', show: 'title' },
        { say: 'In this video, you will learn to spot these extraneous roots, and see on a graph why they appear.' },
      ],
    },
    {
      chapter: 'An equation with no solution',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'An **extraneous root** is a value found while solving that does not satisfy the original equation. It must be rejected.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x + 5} + 6 = 2 \\;\\Rightarrow\\; \\sqrt{x + 5} = -4', 'x + 5 = 16,\\quad x = 11', '\\text{Check: } \\sqrt{16} + 6 = 10 \\ne 2'] },
      ],
      lines: [
        { say: 'An extraneous root is a value found while solving that does not satisfy the original equation. It must be rejected.', show: 'def' },
        { say: 'Solve root x plus five, plus six, equals two. Isolate the radical: root x plus five equals negative four. But a square root is never negative, so this cannot be true.', show: 'm.0', focus: 'm.0' },
        { say: 'If you square anyway, you get x plus five equals sixteen, so x is eleven.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: root sixteen, plus six, is ten, not two. So eleven is extraneous, and the equation has no solution.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Skipping the check',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'Squaring turns $\\sqrt{x + 5} = -4$ into $x + 5 = 16$, which **does** have a solution. The only way to catch the extraneous root is to substitute it into the original equation.' }],
      lines: [
        { say: 'Here is why the check matters. Squaring turns an impossible equation, root x plus five equals negative four, into x plus five equals sixteen, which does have a solution. Squaring hides the negative sign.', show: 'oops' },
        { say: 'The only way to catch an extraneous root is to substitute it into the original equation. Make the check a habit for every square-root equation.' },
      ],
    },
    {
      chapter: 'Reasoning with a graph',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'curve', f: (x) => Math.sqrt(x * x + 9), tone: 'brand' }),
          plot(g, { id: 'l1', f: (x) => x + 1, tone: 'adj' }),
          plot(g, { id: 'l2', f: (x) => x - 1, tone: 'opp' }),
          dots(g, [{ id: 'P', x: 4, y: 5, tex: '(4, 5)', tone: 'good', place: 'above left' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x^2 + 9} = x + 1', 'x^2 + 9 = x^2 + 2x + 1,\\quad x = 4', '\\sqrt{x^2 + 9} = x - 1', 'x^2 + 9 = x^2 - 2x + 1,\\quad x = -4', '\\text{Check: } 5 \\ne -5'] }],
      lines: [
        { say: 'Compare two equations. First, root x squared plus nine, equals x plus one. Square both sides. The x squared terms cancel, leaving eight equals two x, so x is four. Check: root twenty-five is five, and four plus one is five.', show: ['gr.grid', 'gr.axes', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'On a graph, the curve y equals root x squared plus nine meets the line y equals x plus one at four, five. That is the solution.', show: ['gr.curve', 'gr.l1', 'gr.P'], focus: ['gr.curve', 'gr.l1', 'gr.P'] },
        { say: 'Now root x squared plus nine, equals x minus one. The same steps give x equals negative four. But root twenty-five is five, and negative four minus one is negative five. It does not check.', show: ['m.2', 'm.3', 'm.4'], focus: 'm.4' },
        { say: 'The graph shows why: the line y equals x minus one stays below the curve, and never meets it. So there is no solution, and negative four is extraneous.', show: 'gr.l2', focus: ['gr.curve', 'gr.l2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\sqrt{2x + 3} + 5 = 2$.',
          choices: ['No solution', '$x = 3$', '$x = 0$', '$x = -3$'],
          answer: 0,
          working: '$\\sqrt{2x + 3} = -3$, and a square root is never negative. Squaring gives $x = 3$, but $\\sqrt{9} + 5 = 8 \\ne 2$, so it is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve root two x plus three, plus five, equals two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Isolating gives root two x plus three equals negative three, which is impossible. Squaring gives x equals three, but root nine plus five is eight, not two. So there is no solution.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Squaring can create extraneous roots.', 'Check every answer in the original equation.', 'If no candidate checks, there is no solution.'] }],
      lines: [
        { say: 'Let’s sum up. Squaring both sides can create extraneous roots.', show: 'sum.0' },
        { say: 'So check every answer in the original equation, and reject any that fail.', show: 'sum.1' },
        { say: 'If no candidate checks, the equation has no solution. In part three, we solve radical equations in real situations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
