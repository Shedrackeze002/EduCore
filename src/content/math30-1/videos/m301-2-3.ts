import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const g = plane({ x: [-4, 6], y: [-2, 4], every: 3 });

const video: Explainer = {
  id: 'm301-2-3',
  lessonId: 'm301-2-3',
  title: 'Solving Radical Equations Graphically, Part 1: Two Graphical Methods',
  thumbnailTitle: 'Two Graphical Methods',
  thumbnail: 'm1',
  summary: 'Solving √(x + 3) = 2 graphically in two ways: from the intersection of y = √(x + 3) and y = 2, and from the x-intercept of the related function y = √(x + 3) − 2, then checking the answer algebraically. Also why √(x + 3) = −1 has no solution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.3 · Part 1', title: 'Two Graphical Methods', subtitle: 'Intersection points and $x$-intercepts' }],
      lines: [
        { say: 'A physics student drops a stone from a bridge and times its fall at 2.5 seconds. Finding the height of the bridge means solving a radical equation, and a graph shows both the answer and the traps.', show: 'title' },
        { say: 'In this video, you will solve a radical equation graphically in two different ways, and check the answer.' },
      ],
    },
    {
      chapter: 'Method 1: intersection',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('m1', [
          g,
          plot(g, { id: 'curve', f: (x) => root(x + 3), from: -3, to: 6, samples: 300 }),
          plot(g, { id: 'line', f: () => 2, tone: 'opp' }),
          dots(g, [{ id: 'S', x: 1, y: 2, tex: '(1, 2)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x + 3} = 2', 'y = \\sqrt{x + 3} \\ \\text{ and } \\ y = 2', '\\text{Intersection: } (1, 2)', 'x = 1'] }],
      lines: [
        { say: 'Solve the square root of x plus three equals two. The first method treats each side of the equation as a function.', show: 'm.0', focus: 'm.0' },
        { say: 'Graph y equals the square root of x plus three, and the horizontal line y equals two.', show: ['m.1', 'm1.grid', 'm1.axes', 'm1.curve', 'm1.line'], focus: 'm.1' },
        { say: 'The graphs intersect at one point: one, two.', show: ['m.2', 'm1.S'], focus: ['m.2', 'm1.S'] },
        { say: 'The solution is the x-coordinate of the intersection point: x equals one. The y-coordinate, two, just tells you that both sides equal two there.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Method 2: related function',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('m2', [
          g,
          plot(g, { id: 'old', f: (x) => root(x + 3), from: -3, to: 6, tone: 'muted', dashed: true, samples: 300 }),
          plot(g, { id: 'curve', f: (x) => root(x + 3) - 2, from: -3, to: 6, samples: 300 }),
          dots(g, [{ id: 'S', x: 1, y: 0, tex: 'x = 1', tone: 'good', place: 'above' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x + 3} - 2 = 0', 'y = \\sqrt{x + 3} - 2', 'x\\text{-intercept: } 1', 'x = 1'] }],
      lines: [
        { say: 'The second method moves everything to one side. Subtract two from both sides: the square root of x plus three, minus two, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Now graph the related function, y equals the square root of x plus three, minus two. It is the same curve as before, translated two units down.', show: ['m.1', 'm2.grid', 'm2.axes', 'm2.old', 'm2.curve'], focus: ['m.1', 'm2.curve'] },
        { say: 'The solutions are its x-intercepts, where y is zero. It crosses the x-axis at one.', show: ['m.2', 'm2.S'], focus: ['m.2', 'm2.S'] },
        { say: 'So again, x equals one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Checking the answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Left side: } \\sqrt{1 + 3} = \\sqrt{4} = 2', '\\text{Right side: } 2 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two methods, one answer', md: 'Where the graphs of the two sides meet, the two sides are equal, so their difference is zero. The $x$-coordinates of the intersection points are the $x$-intercepts of the related function.' },
      ],
      lines: [
        { say: 'Always check a solution by substituting it into the original equation. With x equals one, the left side is the square root of one plus three: the square root of four, which is two.', show: 'm.0', focus: 'm.0' },
        { say: 'That matches the right side, so x equals one is the solution.', show: 'm.1', focus: 'm.1' },
        { say: 'The two methods always agree. Where the graphs of the two sides meet, the sides are equal, so their difference is zero. That is exactly an x-intercept of the related function.', show: 'tip' },
      ],
    },
    {
      chapter: 'No solution',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('none', [
          g,
          plot(g, { id: 'curve', f: (x) => root(x + 3), from: -3, to: 6, samples: 300 }),
          plot(g, { id: 'line', f: () => -1, tone: 'opp' }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x + 3} = -1', '\\text{No intersection}', '\\text{No solution}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Never negative', md: 'A square root is never negative, so its graph never goes below the $x$-axis.' },
      ],
      lines: [
        { say: 'What about the square root of x plus three equals negative one? Graph both sides again.', show: ['m.0', 'none.grid', 'none.axes', 'none.curve', 'none.line'], focus: 'm.0' },
        { say: 'The line y equals negative one is below the x-axis, but the curve never goes below the x-axis. The graphs never meet.', show: 'm.1', focus: ['m.1', 'none.line'] },
        { say: 'So there is no solution. A square root is never negative, and the graph shows it at a glance.', show: ['m.2', 'key'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To solve $\\sqrt{x + 6} = 3$ with the related function, which function do you graph, and what is the solution?',
          choices: ['$y = \\sqrt{x + 6} - 3$; $x = 3$', '$y = \\sqrt{x + 6} + 3$; $x = 3$', '$y = \\sqrt{x + 6} - 3$; $x = 9$', '$y = \\sqrt{x + 6} - 3$; $x = -3$'],
          answer: 0,
          working: 'Subtract $3$: $\\sqrt{x + 6} - 3 = 0$. The graph of $y = \\sqrt{x + 6} - 3$ crosses the $x$-axis at $x = 3$. Check: $\\sqrt{3 + 6} = \\sqrt{9} = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. To solve the square root of x plus six equals three with the related function, which function do you graph, and what is the solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract three from both sides, and graph y equals the square root of x plus six, minus three. It crosses the x-axis at three, and the check works: the square root of nine is three. B adds three instead, and that graph never reaches the x-axis.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve $A = B$ from the intersections of $y = A$ and $y = B$: the solutions are their $x$-coordinates.', 'Or graph the related function $y = A - B$: the solutions are its $x$-intercepts.', 'Check each solution in the original equation.'] }],
      lines: [
        { say: 'Let’s sum up. To solve an equation graphically, graph each side as a function. The solutions are the x-coordinates of the intersection points.', show: 'sum.0' },
        { say: 'Or graph the related function, the left side minus the right side. The solutions are its x-intercepts.', show: 'sum.1' },
        { say: 'Either way, check each solution in the original equation. In part two, we solve by squaring both sides, and use a graph to spot extraneous roots. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
