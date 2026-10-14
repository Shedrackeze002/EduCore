import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 5], y: [-5, 6], every: 0 });
const f = (x: number) => x * x - 2 * x - 3;

/** The axis of symmetry, x = 1, as a dashed vertical line across the plane. */
const axis: Part = {
  points: { s0: g.map(1, -5), s1: g.map(1, 6) },
  items: [{ kind: 'line', id: 'sym', from: 's0', to: 's1', tone: 'theta', dashed: true, label: 'x = 1', labelAt: 0.92, labelSide: 'right' }],
};

const video: Explainer = {
  id: 'm202-6-1',
  lessonId: 'm202-6-1',
  title: 'Quadratic Functions and Their Graphs, Part 1: Parabolas',
  thumbnailTitle: 'Parabolas',
  thumbnail: 'pb',
  summary: 'Quadratic functions in standard form, parabolas that open up or down, the symmetry in a table of values, and reading the vertex, axis of symmetry, zeros and y-intercept of y = x² − 2x − 3 from its graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.1 · Part 1', title: 'Parabolas', subtitle: 'The graph of a quadratic function' }],
      lines: [
        { say: 'A soccer ball kicked down the field, water arcing from a fountain, the cable of a suspension bridge: each traces the same curve, a parabola.', show: 'title' },
        { say: 'In this video, you will meet quadratic functions, and read the key features of a parabola from its graph.' },
      ],
    },
    {
      chapter: 'Quadratic functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic function and parabola', md: 'A **quadratic function** can be written in **standard form** $y = ax^2 + bx + c$, with $a \\ne 0$. Its graph is a symmetric U-shaped curve called a **parabola**, which **opens up** when $a > 0$ and **opens down** when $a < 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -2x^2 + 3x + 1:\\quad a = -2 < 0,\\ \\text{opens down}'] },
      ],
      lines: [
        { say: 'A quadratic function can be written in standard form: y equals "a" x squared, plus b x, plus c, where "a" is not zero. The highest power of x is two.', show: 'def' },
        { say: 'Its graph is a symmetric, U-shaped curve called a parabola. It opens up when "a" is positive, and opens down when "a" is negative.' },
        { say: 'Does y equals negative two x squared, plus three x, plus one, open up or down? The coefficient of x squared is negative two, so it opens down, like an upside-down U.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Symmetry in a table',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', '$-2$', '$-1$', '$0$', '$1$', '$2$', '$3$', '$4$'], rows: [['$y$', '$5$', '$0$', '$-3$', '$-4$', '$-3$', '$0$', '$5$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = x^2 - 2x - 3'] },
      ],
      lines: [
        { say: 'Here are some values of y equals x squared, minus two x, minus three.', show: ['m.0', 't'] },
        { say: 'The y-values go down, five, zero, negative three, turn around at negative four when x is one, and then repeat in reverse order: negative three, zero, five.' },
        { say: 'That repeat is the symmetry of the parabola. Points the same distance either side of x equals one have the same height.' },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('pb', [
          g,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          axis,
          dots(g, [
            { id: 'V', x: 1, y: -4, tex: '(1, -4)', tone: 'opp', place: 'below right' },
            { id: 'z1', x: -1, y: 0, tex: '(-1, 0)', tone: 'good', place: 'above left' },
            { id: 'z2', x: 3, y: 0, tex: '(3, 0)', tone: 'good', place: 'above right' },
            { id: 'Y', x: 0, y: -3, tex: '(0, -3)', tone: 'adj', place: 'below left' },
          ]),
        ], 470),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Vertex**: the turning point, $(1, -4)$.', '**Axis of symmetry**: the vertical line $x = 1$.', '**Zeros**: $x$-intercepts $-1$ and $3$.', '**$y$-intercept**: $-3$.'] }],
      lines: [
        { say: 'Here is the graph. The vertex is the turning point: the lowest point of a parabola that opens up, or the highest of one that opens down. Here it is one, negative four.', show: ['pb.grid', 'pb.axes', 'pb.curve', 'pb.V', 'b.0'], focus: 'pb.V' },
        { say: 'The axis of symmetry is the vertical line through the vertex: x equals one. The two halves of the parabola are mirror images across it.', show: ['pb.sym', 'b.1'], focus: 'pb.sym' },
        { say: 'The x-intercepts are where the graph meets the x-axis. They are also called the zeros, because y is zero there. The zeros are negative one and three, and the axis of symmetry is exactly halfway between them.', show: ['pb.z1', 'pb.z2', 'b.2'], focus: ['pb.z1', 'pb.z2'] },
        { say: 'And the y-intercept is where the graph crosses the y-axis: negative three.', show: ['pb.Y', 'b.3'], focus: 'pb.Y' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parabola has zeros $-5$ and $1$. What is its axis of symmetry?',
          choices: ['$x = -2$', '$x = -3$', '$y = -2$', '$x = 3$'],
          answer: 0,
          working: 'The axis of symmetry is halfway between the zeros: $\\dfrac{-5 + 1}{2} = -2$, so it is the vertical line $x = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parabola has zeros negative five and one. What is its axis of symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The axis is halfway between the zeros: negative five plus one, over two, is negative two. It is a vertical line, so its equation is x equals negative two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = ax^2 + bx + c$ opens up if $a > 0$ and down if $a < 0$.', 'The vertex is the turning point; the axis of symmetry passes through it.', 'Zeros are $x$-intercepts; the $y$-intercept is where $x = 0$.'] }],
      lines: [
        { say: 'Let’s sum up. A quadratic function opens up if "a" is positive, and down if "a" is negative.', show: 'sum.0' },
        { say: 'The vertex is the turning point, and the axis of symmetry is the vertical line through it.', show: 'sum.1' },
        { say: 'The zeros are the x-intercepts, and the y-intercept is where x is zero. In part two, we find maximum and minimum values, and the domain and range. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
