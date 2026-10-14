import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-4, 6], y: [-10, 10], yStep: 2, every: 0, width: 7, height: 8 });
const f = (x: number) => x * x - 2 * x - 8;

/** The line y = 7, dashed, for solving x² − 2x − 8 = 7. */
const seven: Part = {
  points: { l0: g.map(-4, 7), l1: g.map(6, 7) },
  items: [{ kind: 'line', id: 'y7', from: 'l0', to: 'l1', tone: 'theta', dashed: true, label: 'y = 7', labelAt: 0.72, labelSide: 'left' }],
};

const video: Explainer = {
  id: 'm202-7-1',
  lessonId: 'm202-7-1',
  title: 'Solving Quadratic Equations by Graphing and Factoring, Part 1: Roots and Graphs',
  thumbnailTitle: 'Roots and Graphs',
  thumbnail: 'rg',
  summary: 'Quadratic equations and their roots, why the roots are the x-intercepts of y = ax² + bx + c, solving x² − 2x − 8 = 0 from a graph and checking, solving x² − 2x − 8 = 7 with the line y = 7, and why there can be two, one or no real roots.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.1 · Part 1', title: 'Roots and Graphs', subtitle: 'Solving quadratic equations by graphing' }],
      lines: [
        { say: 'When does a kicked ball land? At what price does a business break even? Questions like these lead to quadratic equations.', show: 'title' },
        { say: 'In this video, you will see how the roots of a quadratic equation appear on a graph, and solve equations by graphing.' },
      ],
    },
    {
      chapter: 'Roots and zeros',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic equation and root', md: 'A **quadratic equation** can be written as $ax^2 + bx + c = 0$, with $a \\ne 0$. A **root**, or solution, is a value of $x$ that makes the equation true.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Roots are zeros', md: 'The roots of $ax^2 + bx + c = 0$ are the zeros of $y = ax^2 + bx + c$: the $x$-intercepts of its graph. So there are two, one or no real roots.' },
      ],
      lines: [
        { say: 'A quadratic equation can be written as "a" x squared, plus b x, plus c, equals zero, where "a" is not zero. A root, or solution, is a value of x that makes the equation true.', show: 'def' },
        { say: 'The roots of the equation are the zeros of the function y equals "a" x squared plus b x plus c: the x-intercepts of its graph, where y is zero.', show: 'key' },
        { say: 'A parabola can cross the x-axis twice, touch it once, or miss it. So a quadratic equation has two, one, or no real roots.' },
      ],
    },
    {
      chapter: 'Solving by graphing',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('rg', [
          g,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          seven,
          dots(g, [
            { id: 'r1', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'below left' },
            { id: 'r2', x: 4, y: 0, tex: '(4, 0)', tone: 'good', place: 'below right' },
            { id: 's1', x: -3, y: 7, tex: '(-3, 7)', tone: 'theta', place: 'above left' },
            { id: 's2', x: 5, y: 7, tex: '(5, 7)', tone: 'theta', place: 'above right' },
          ]),
        ], 460),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 - 2x - 8 = 0:\\ x = -2 \\text{ or } 4', '4^2 - 2(4) - 8 = 0 \\;\\checkmark', 'x^2 - 2x - 8 = 7:\\ x = -3 \\text{ or } 5', '5^2 - 2(5) - 8 = 7 \\;\\checkmark'] }],
      lines: [
        { say: 'Use the graph of y equals x squared, minus two x, minus eight, to solve x squared minus two x minus eight equals zero. The graph crosses the x-axis at negative two and four.', show: ['rg.grid', 'rg.axes', 'rg.curve', 'rg.r1', 'rg.r2', 'm.0'], focus: ['rg.r1', 'rg.r2', 'm.0'] },
        { say: 'Check by substituting. Four squared, minus eight, minus eight, is zero, and negative two works too. So x is negative two, or four.', show: 'm.1', focus: 'm.1' },
        { say: 'To solve x squared minus two x minus eight equals seven, draw the line y equals seven as well. The roots are the x-coordinates where the parabola meets the line: negative three and five.', show: ['rg.y7', 'rg.s1', 'rg.s2', 'm.2'], focus: ['rg.y7', 'rg.s1', 'rg.s2'] },
        { say: 'Check five: twenty-five, minus ten, minus eight, is seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Graphs and exact answers',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Graphs and exact answers', md: 'A graph shows the roots clearly when they are whole numbers. When a root falls between grid lines, the graph only gives an **estimate**; graphing technology can find more precise values.' }],
      lines: [
        { say: 'A graph shows the roots clearly when they are whole numbers. But when a root falls between grid lines, the graph only gives an estimate.', show: 'tip' },
        { say: 'Graphing technology can find more precise values, and the methods in the rest of this unit find exact ones.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of $y = ax^2 + bx + c$ lies entirely above the $x$-axis. How many real roots does $ax^2 + bx + c = 0$ have?',
          choices: ['None', 'One', 'Two', 'It depends on $a$'],
          answer: 0,
          working: 'The roots are the $x$-intercepts. A graph entirely above the $x$-axis never meets it, so there are no real roots.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals "a" x squared plus b x plus c lies entirely above the x-axis. How many real roots does the equation have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The roots are the x-intercepts, and a graph entirely above the x-axis never meets it. So there are no real roots.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The roots of $ax^2 + bx + c = 0$ are the $x$-intercepts of $y = ax^2 + bx + c$.', 'There can be two, one or no real roots.', 'To solve $f(x) = k$, find where the graph meets the line $y = k$.'] }],
      lines: [
        { say: 'Let’s sum up. The roots of a quadratic equation are the x-intercepts of its graph.', show: 'sum.0' },
        { say: 'There can be two, one, or no real roots.', show: 'sum.1' },
        { say: 'And to solve an equation equal to a number k, find where the graph meets the line y equals k. In part two, we solve by factoring. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
