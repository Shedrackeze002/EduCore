import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const p1 = plane({ name: 'p1', x: [-3, 3], y: [-3, 5], every: 0 });
const p2 = plane({ name: 'p2', x: [-3, 3], y: [-3, 5], every: 0, at: [8, 0] });
const p3 = plane({ name: 'p3', x: [-3, 3], y: [-3, 5], every: 0, at: [16, 0] });
const g = plane({ x: [-3, 6], y: [-5, 7], every: 0 });

/** The number of solutions under each plane. */
const captions: Part = {
  points: { n1: [0, -3.2], n2: [8, -3.2], n3: [16, -3.2] },
  items: [
    { kind: 'label', id: 'n1-t', at: 'n1', tex: '\\text{two solutions}', place: 'below' },
    { kind: 'label', id: 'n2-t', at: 'n2', tex: '\\text{one solution}', place: 'below' },
    { kind: 'label', id: 'n3-t', at: 'n3', tex: '\\text{no solution}', place: 'below' },
  ],
};

const video: Explainer = {
  id: 'm201-8-1',
  lessonId: 'm201-8-1',
  title: 'Solving Systems Graphically, Part 1: A Line and a Parabola',
  thumbnailTitle: 'Systems by Graphing',
  thumbnail: 'g',
  summary: 'Linear-quadratic and quadratic-quadratic systems, why points of intersection are solutions, how a line can meet a parabola in two, one or no points, and solving y = x² − 2x − 3 with y = x + 1 by graphing and checking. Part 2 solves systems of two parabolas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 8.1 · Part 1', title: 'Systems by Graphing', subtitle: 'Where the graphs meet' }],
      lines: [
        { say: 'A model rocket rises and falls along a parabola, while a camera drone climbs in a straight line. When are they at the same height? Questions like this lead to systems in which at least one equation is quadratic.', show: 'title' },
        { say: 'In this video, you will see how many solutions a line and a parabola can have, and solve a system by graphing.' },
      ],
    },
    {
      chapter: 'Systems and solutions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Systems of equations', md: 'A **linear-quadratic system** has one linear and one quadratic equation; a **quadratic-quadratic system** has two quadratic equations. Each **point of intersection** is a solution.' },
        figure('n', [
          p1,
          p2,
          p3,
          captions,
          plot(p1, { id: 'q', f: (x) => x * x - 2, tone: 'brand' }),
          plot(p1, { id: 'l', f: (x) => x, tone: 'opp' }),
          plot(p2, { id: 'q', f: (x) => x * x, tone: 'brand' }),
          plot(p2, { id: 'l', f: (x) => 2 * x - 1, tone: 'opp' }),
          plot(p3, { id: 'q', f: (x) => x * x + 1, tone: 'brand' }),
          plot(p3, { id: 'l', f: (x) => x - 2, tone: 'opp' }),
          dots(p1, [
            { id: 'a', x: -1, y: -1, tex: '', tone: 'good', group: 'meet' },
            { id: 'b', x: 2, y: 2, tex: '', tone: 'good', group: 'meet' },
          ]),
          dots(p2, [{ id: 'a', x: 1, y: 1, tex: '', tone: 'good' }]),
        ]),
      ],
      lines: [
        { say: 'A system of equations is two or more equations in the same variables, considered together. A linear-quadratic system has one linear and one quadratic equation. A quadratic-quadratic system has two quadratic equations.', show: 'def' },
        { say: 'Each point of intersection of the graphs lies on both of them, so its coordinates make both equations true: it is a solution.' },
        { say: 'A line can meet a parabola in two points,', show: ['n.p1-grid', 'n.p1-axes', 'n.p1-q', 'n.p1-l', 'n.p1-meet', 'n.n1-t'], focus: 'n.p1-meet' },
        { say: 'touch it at exactly one point, as a tangent line,', show: ['n.p2-grid', 'n.p2-axes', 'n.p2-q', 'n.p2-l', 'n.p2-a', 'n.n2-t'], focus: 'n.p2-a' },
        { say: 'or miss it completely, so that there is no solution.', show: ['n.p3-grid', 'n.p3-axes', 'n.p3-q', 'n.p3-l', 'n.n3-t'], focus: ['n.p3-q', 'n.p3-l'] },
        { say: 'Two parabolas can meet in zero, one or two points, or be the same parabola, with infinitely many solutions.' },
      ],
    },
    {
      chapter: 'Solving by graphing',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('g', [
          g,
          plot(g, { id: 'q', f: (x) => x * x - 2 * x - 3, tone: 'brand' }),
          plot(g, { id: 'l', f: (x) => x + 1, tone: 'opp' }),
          dots(g, [
            { id: 'A', x: -1, y: 0, tex: '', tone: 'good', group: 'meet' },
            { id: 'B', x: 4, y: 5, tex: '', tone: 'good', group: 'meet' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(-1, 0):\\quad 1 + 2 - 3 = 0', '\\phantom{(-1, 0):}\\quad {-1} + 1 = 0 \\;\\checkmark', '(4, 5):\\quad 16 - 8 - 3 = 5', '\\phantom{(4, 5):}\\quad 4 + 1 = 5 \\;\\checkmark'] }],
      lines: [
        { say: 'To solve a system by graphing, graph both equations on the same grid, find every point of intersection, and verify each one in both equations. Solve y equals x squared, minus two x, minus three, and y equals x plus one.', show: ['g.grid', 'g.axes', 'g.q', 'g.l'] },
        { say: 'The graphs intersect at two points: negative one, zero, and four, five.', show: 'g.meet', focus: 'g.meet' },
        { say: 'Check negative one, zero. In the quadratic: one, plus two, minus three, is zero. In the linear equation: negative one plus one is zero.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Check four, five. In the quadratic: sixteen, minus eight, minus three, is five. And four plus one is five. So the solutions are negative one, zero, and four, five.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is a solution of the system $y = x^2$ and $y = x + 2$?',
          choices: ['$(2, 4)$', '$(1, 1)$', '$(0, 2)$', '$(4, 2)$'],
          answer: 0,
          working: '$(2, 4)$ makes both equations true: $2^2 = 4$ and $2 + 2 = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is a solution of the system y equals x squared, and y equals x plus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two squared is four, and two plus two is four, so two, four makes both equations true. B is only on the parabola, and C is only on the line.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The solutions of a system are the points of intersection.', 'A line and a parabola: $0$, $1$ or $2$ solutions.', 'Check every point in both equations.'] }],
      lines: [
        { say: 'Let’s sum up. The solutions of a system are the points of intersection of its graphs.', show: 'sum.0' },
        { say: 'A line and a parabola can have zero, one or two solutions.', show: 'sum.1' },
        { say: 'And check every point in both equations. In part two, we solve systems of two parabolas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
