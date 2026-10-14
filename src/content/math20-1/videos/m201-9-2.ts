import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 5], y: [-7, 7], every: 0 });
const f = (x: number) => x * x - x - 6;

const video: Explainer = {
  id: 'm201-9-2',
  lessonId: 'm201-9-2',
  title: 'Quadratic Inequalities in One Variable, Part 1: Test Intervals',
  thumbnailTitle: 'Quadratic Inequalities',
  thumbnail: 'qi',
  summary: 'Quadratic inequalities and their related equations, why the sign of x² − x − 6 can change only at a root, reading the solution of x² − x − 6 ≤ 0 from a graph, and finding it with one test value in each interval. Parts 2 and 3 use sign diagrams and solve problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.2 · Part 1', title: 'Quadratic Inequalities', subtitle: 'The roots are the boundaries' }],
      lines: [
        { say: 'A quadratic equation has at most two solutions, but a quadratic inequality usually has infinitely many: a whole interval of the number line, or two of them.', show: 'title' },
        { say: 'The roots of the related equation are the key. In this video, you will read the solution from a graph, and find it with test intervals.' },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('qi', [
          g,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          plot(g, { id: 'neg', f, from: -2, to: 3, tone: 'good' }),
          dots(g, [
            { id: 'r1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'above left', group: 'roots' },
            { id: 'r2', x: 3, y: 0, tex: '3', tone: 'adj', place: 'above right', group: 'roots' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic inequality', md: 'An inequality such as $ax^2 + bx + c \\le 0$, with $<$, $\\le$, $>$ or $\\ge$ and $a \\ne 0$. Its **related equation** is $ax^2 + bx + c = 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 - x - 6 \\le 0:', '\\{x \\mid -2 \\le x \\le 3,\\ x \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'A quadratic inequality compares "a" x squared, plus b x, plus c, with zero, using less than, at most, greater than, or at least. Its related equation is "a" x squared, plus b x, plus c, equals zero.', show: 'def' },
        { say: 'The graph of y equals x squared, minus x, minus six, crosses the x-axis only at its zeros, negative two and three.', show: ['qi.grid', 'qi.axes', 'qi.curve', 'qi.roots'], focus: 'qi.roots' },
        { say: 'Between two neighbouring zeros, the graph stays on one side of the axis. So the sign of x squared, minus x, minus six, can change only at a root.' },
        { say: 'It is below the axis, and negative, between negative two and three, and positive outside them. So it is at most zero for x from negative two to three, including both.', show: ['qi.neg', 'm.0', 'm.1'], focus: ['qi.neg', 'm.1'] },
      ],
    },
    {
      chapter: 'Test intervals',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'bullets', id: 'b', items: ['Solve the related equation: its roots are the boundaries.', 'The roots split the number line into intervals.', 'Test one value in each interval.', 'Keep the intervals where it is true; include the roots for $\\le$ or $\\ge$.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + 2)(x - 3) = 0:\\quad x = -2,\\ 3', 'x = -3:\\quad 9 + 3 - 6 = 6 > 0', 'x = 0:\\quad {-6} < 0 \\;\\checkmark', 'x = 4:\\quad 16 - 4 - 6 = 6 > 0', '-2 \\le x \\le 3'] }],
      lines: [
        { say: 'Without a graph, use test intervals. Solve the related equation; its roots split the number line into intervals. Any value inside one interval gives the same sign, so one test value decides the whole interval.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Solve x squared, minus x, minus six, at most zero. The related equation factors as x plus two, times x minus three, so the roots are negative two and three.', show: 'm.0', focus: 'm.0' },
        { say: 'Test negative three, to the left: nine, plus three, minus six, is six, which is positive.', show: 'm.1', focus: 'm.1' },
        { say: 'Test zero, in the middle: negative six, which is negative. And test four, to the right: six again, positive.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'We need negative or zero, so keep the middle interval, and include the roots, because the sign is at most. x is from negative two to three.', show: ['b.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - 4x < 0$.',
          choices: ['$0 < x < 4$', '$0 \\le x \\le 4$', '$x < 0$ or $x > 4$', '$x < 4$'],
          answer: 0,
          working: '$x(x - 4) = 0$ at $x = 0$ and $x = 4$. Testing $x = 2$ gives $4 - 8 = -4 < 0$, so the middle interval works, and $<$ leaves out the roots.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared minus four x, less than zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The roots of x times x minus four are zero and four. Testing two gives negative four, so the middle interval works, and less than leaves out the roots. B includes them, and C is the other two intervals.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve the related equation: its roots are the boundaries.', 'The sign can change only at a root: test one value per interval.', 'Include the roots for $\\le$ and $\\ge$, not for $<$ and $>$.'] }],
      lines: [
        { say: 'Let’s sum up. Solve the related equation: its roots are the boundary values.', show: 'sum.0' },
        { say: 'The sign can change only at a root, so test one value in each interval.', show: 'sum.1' },
        { say: 'And include the roots for at most or at least, but not for less than or greater than. In part two, we use sign diagrams. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
