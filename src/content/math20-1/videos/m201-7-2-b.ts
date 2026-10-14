import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-4, 6], y: [-11, 11], yStep: 2, every: 0, width: 8, height: 9 });
const q1 = plane({ name: 'q1', x: [-2, 4], y: [-6, 8], every: 0 });
const q2 = plane({ name: 'q2', x: [-5, 1], y: [-6, 8], every: 0, at: [11, 0] });

/** The range under each of the two planes. */
const ranges: Part = {
  points: { r1: [1, -6.2], r2: [9, -6.2] },
  items: [
    { kind: 'label', id: 'r1-t', at: 'r1', tex: 'y \\ge 3', place: 'below' },
    { kind: 'label', id: 'r2-t', at: 'r2', tex: 'y \\ge 1', place: 'below' },
  ],
};

const video: Explainer = {
  id: 'm201-7-2-b',
  lessonId: 'm201-7-2',
  title: 'Absolute Value Functions, Part 2: Quadratics',
  thumbnailTitle: 'Absolute Value of a Quadratic',
  thumbnail: 'w',
  summary: 'Graphing y = |x² − 2x − 8|: invariant x-intercepts, the y-intercept, the vertex (1, −9) reflected to (1, 9), domain and range; parabolas that never cross the x-axis, and a quick way to find the range of y = |f(x)|.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.2 · Part 2', title: 'Absolute Value of a Quadratic', subtitle: 'A W shape, or no change at all' }],
      lines: [
        { say: 'When a parabola dips below the x-axis, its absolute value bounces back up, making a W shape. And sometimes, nothing changes at all.', show: 'title' },
        { say: 'In this video, you will graph the absolute value of a quadratic function, and find its range quickly.' },
      ],
    },
    {
      chapter: 'A quadratic',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('w', [
          g,
          plot(g, { id: 'f', f: (x) => x * x - 2 * x - 8, tone: 'muted' }),
          plot(g, { id: 'abs', f: (x) => Math.abs(x * x - 2 * x - 8), tone: 'brand' }),
          dots(g, [
            { id: 'r1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below left', group: 'ints' },
            { id: 'r2', x: 4, y: 0, tex: '4', tone: 'adj', place: 'below right', group: 'ints' },
            { id: 'Y', x: 0, y: 8, tex: '8', tone: 'good', place: 'left' },
            { id: 'Vlow', x: 1, y: -9, tex: '(1, -9)', tone: 'muted', place: 'below right' },
            { id: 'Vhigh', x: 1, y: 9, tex: '(1, 9)', tone: 'opp', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x - 4)(x + 2):\\quad x = -2,\\ 4', 'y\\text{-intercept: } |{-}8| = 8', '(1, -9) \\to (1, 9)', '\\text{range: } \\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'Graph y equals the absolute value of x squared, minus two x, minus eight. Start with the function inside, shown in grey.', show: ['w.grid', 'w.axes', 'w.f'] },
        { say: 'It factors as x minus four, times x plus two, so its x-intercepts are negative two and four. They are invariant points.', show: ['m.0', 'w.ints'], focus: ['m.0', 'w.ints'] },
        { say: 'The y-intercept is the absolute value of negative eight, which is eight.', show: ['m.1', 'w.Y'], focus: ['m.1', 'w.Y'] },
        { say: 'The vertex of the parabola is one, negative nine, below the axis. It is reflected to one, nine, which becomes a local maximum of the new graph, the middle of the W.', show: ['m.2', 'w.Vlow', 'w.abs', 'w.Vhigh'], focus: ['w.abs', 'w.Vhigh'] },
        { say: 'The domain is all real numbers, and the range is y greater than or equal to zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Not crossing the axis',
      layout: 'center',
      main: [
        figure('nc', [
          q1,
          q2,
          ranges,
          plot(q1, { id: 'c', f: (x) => (x - 1) ** 2 + 3, tone: 'brand' }),
          plot(q2, { id: 'f', f: (x) => -((x + 2) ** 2) - 1, tone: 'muted' }),
          plot(q2, { id: 'abs', f: (x) => (x + 2) ** 2 + 1, tone: 'brand' }),
        ]),
      ],
      lines: [
        { say: 'If the graph of f never goes below the x-axis, nothing changes. The absolute value of x minus one, squared, plus three, is the same graph as x minus one, squared, plus three, with range y at least three.', show: ['nc.q1-grid', 'nc.q1-axes', 'nc.q1-c', 'nc.r1-t'], focus: 'nc.q1-c' },
        { say: 'If the graph of f is entirely below the axis, all of it is reflected. The absolute value of negative, x plus two, squared, minus one, is the same graph as x plus two, squared, plus one, with range y at least one.', show: ['nc.q2-grid', 'nc.q2-axes', 'nc.q2-f', 'nc.q2-abs', 'nc.r2-t'], focus: 'nc.q2-abs' },
      ],
    },
    {
      chapter: 'Finding the range quickly',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Finding the range quickly', md: 'Which way does $f$ open, and is its vertex above or below the $x$-axis? If the graph crosses the axis, the range of $|f(x)|$ is $y \\ge 0$. If not, it is $y \\ge |q|$, where $q$ is the $y$-coordinate of the vertex.' }],
      lines: [
        { say: 'So, to find the range quickly, ask two questions: which way does f open, and is its vertex above or below the x-axis?', show: 'tip' },
        { say: 'If the graph crosses the axis, the range of its absolute value is y at least zero. If it does not, the range is y at least the absolute value of q, where q is the y-coordinate of the vertex.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the range of $y = |x^2 - 4|$?',
          choices: ['$\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge 4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge -4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
          answer: 0,
          working: 'The vertex of $y = x^2 - 4$ is $(0, -4)$, below the $x$-axis, and the parabola opens up, so it crosses the axis. The range of $y = |x^2 - 4|$ is $y \\ge 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the range of y equals the absolute value of x squared minus four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The vertex of x squared minus four is zero, negative four, below the axis, and the parabola opens up, so it crosses the axis. The range is y at least zero. C is the range of the function inside.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The $x$-intercepts stay; a vertex below the axis is reflected above it.', 'If $f$ crosses the $x$-axis, the range of $|f(x)|$ is $y \\ge 0$.', 'If $f$ never crosses it, the range is $y \\ge |q|$.'] }],
      lines: [
        { say: 'Let’s sum up. For the absolute value of a quadratic, the x-intercepts stay, and a vertex below the axis is reflected above it.', show: 'sum.0' },
        { say: 'If the parabola crosses the x-axis, the range is y at least zero.', show: 'sum.1' },
        { say: 'And if it never crosses, the range is y at least the absolute value of q. In part three, we write absolute value functions piecewise. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
