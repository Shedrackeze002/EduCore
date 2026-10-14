import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g1 = plane({ x: [-3, 5], y: [-5, 6], every: 0 });
const p1 = plane({ name: 'p1', x: [-2, 4], y: [-4, 6], every: 0 });
const p2 = plane({ name: 'p2', x: [-2, 4], y: [-4, 6], every: 0, at: [8, 0] });
const p3 = plane({ name: 'p3', x: [-1, 5], y: [-4, 6], every: 0, at: [15, 0] });
const g2 = plane({ x: [-3, 5], y: [-5, 7], every: 0 });

/** A caption under each of the three planes. */
const captions: Part = {
  points: { n1: [1, -4.2], n2: [9, -4.2], n3: [17, -4.2] },
  items: [
    { kind: 'label', id: 'n1-t', at: 'n1', tex: '\\text{two real roots}', place: 'below' },
    { kind: 'label', id: 'n2-t', at: 'n2', tex: '\\text{one real root}', place: 'below' },
    { kind: 'label', id: 'n3-t', at: 'n3', tex: '\\text{no real roots}', place: 'below' },
  ],
};

const video: Explainer = {
  id: 'm201-4-2',
  lessonId: 'm201-4-2',
  title: 'Solving Quadratic Equations, Part 1: Roots and Graphs',
  thumbnailTitle: 'Roots and x-Intercepts',
  thumbnail: 'rt',
  summary: 'Roots, zeros and x-intercepts as the same numbers, reading and checking the roots of x² − 2x − 3 = 0 from a graph, why a quadratic equation has two, one or no real roots, and solving f(x) = 5 with a horizontal line. Parts 2 and 3 solve by factoring.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.2 · Part 1', title: 'Roots and x-Intercepts', subtitle: 'Solving from a graph' }],
      lines: [
        { say: 'A quadratic equation asks one question: for which values of x is "a" x squared, plus b x, plus c, equal to zero?', show: 'title' },
        { say: 'You can answer it from a graph, or with algebra. In this video, you will solve quadratic equations from a graph, and see how many roots to expect.' },
      ],
    },
    {
      chapter: 'Roots, zeros and x-intercepts',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('rz', [
          g1,
          plot(g1, { id: 'curve', f: (x) => x * x - 2 * x - 3, tone: 'brand' }),
          dots(g1, [
            { id: 'r1', x: -1, y: 0, tex: '-1', tone: 'adj', place: 'below left', group: 'roots' },
            { id: 'r2', x: 3, y: 0, tex: '3', tone: 'adj', place: 'below right', group: 'roots' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Roots**: the solutions of $ax^2 + bx + c = 0$.', '**Zeros**: the inputs where $f(x) = 0$.', '**$x$-intercepts**: where the graph meets the $x$-axis.'] }],
      lines: [
        { say: 'A quadratic equation can be written in standard form: "a" x squared, plus b x, plus c, equals zero, where "a" is not zero. Its solutions are called its roots.', show: 'b.0' },
        { say: 'The roots are also the zeros of the function f of x equals "a" x squared plus b x plus c: the inputs that make f of x zero.', show: 'b.1' },
        { say: 'And they are the x-intercepts of the graph. All three words describe the same numbers.', show: ['b.2', 'rz.grid', 'rz.axes', 'rz.curve'] },
        { say: 'The graph of y equals x squared, minus two x, minus three, crosses the x-axis at negative one and three. So those are the roots of x squared, minus two x, minus three, equals zero.', show: 'rz.roots', focus: 'rz.roots' },
      ],
    },
    {
      chapter: 'Check the roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x = -1:\\quad (-1)^2 - 2(-1) - 3 = 1 + 2 - 3 = 0 \\;\\checkmark', 'x = 3:\\quad 3^2 - 2(3) - 3 = 9 - 6 - 3 = 0 \\;\\checkmark'] }],
      lines: [
        { say: 'A graph can be hard to read exactly, so check each root in the equation. For x equals negative one: one, plus two, minus three, is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'For x equals three: nine, minus six, minus three, is zero. Both roots check, so the solution is x equals negative one, or x equals three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How many roots?',
      layout: 'center',
      main: [
        figure('rt', [
          p1,
          p2,
          p3,
          captions,
          plot(p1, { id: 'c1', f: (x) => x * x - 2 * x - 3, tone: 'brand' }),
          plot(p2, { id: 'c2', f: (x) => (x - 1) ** 2, tone: 'opp' }),
          plot(p3, { id: 'c3', f: (x) => x * x - 4 * x + 6, tone: 'adj' }),
          dots(p1, [
            { id: 'd1', x: -1, y: 0, tex: '', tone: 'brand', group: 'two' },
            { id: 'd2', x: 3, y: 0, tex: '', tone: 'brand', group: 'two' },
          ]),
          dots(p2, [{ id: 'd3', x: 1, y: 0, tex: '', tone: 'opp' }]),
          dots(p3, [{ id: 'V', x: 2, y: 2, tex: '(2, 2)', tone: 'adj', place: 'below' }]),
        ]),
      ],
      lines: [
        { say: 'A parabola can cross the x-axis twice, touch it once at its vertex, or miss it completely.' },
        { say: 'So a quadratic equation has two distinct real roots when its parabola crosses the x-axis twice,', show: ['rt.p1-grid', 'rt.p1-axes', 'rt.p1-c1', 'rt.p1-two', 'rt.n1-t'], focus: ['rt.p1-c1', 'rt.p1-two'] },
        { say: 'one real root, which is really two equal roots, when the vertex touches the axis,', show: ['rt.p2-grid', 'rt.p2-axes', 'rt.p2-c2', 'rt.p2-d3', 'rt.n2-t'], focus: ['rt.p2-c2', 'rt.p2-d3'] },
        { say: 'or no real roots when the parabola misses the axis. y equals x squared, minus four x, plus six, has its vertex at two, two, and opens up, so it never reaches the x-axis.', show: ['rt.p3-grid', 'rt.p3-axes', 'rt.p3-c3', 'rt.p3-V', 'rt.n3-t'], focus: ['rt.p3-c3', 'rt.p3-V'] },
      ],
    },
    {
      chapter: 'Solving f(x) = k',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('fk', [
          g2,
          polyline(g2, { id: 'line', points: [[-3, 5], [5, 5]], tone: 'opp', dashed: true }),
          plot(g2, { id: 'curve', f: (x) => x * x - 2 * x - 3, tone: 'brand' }),
          dots(g2, [
            { id: 'L', x: -2, y: 5, tex: '(-2, 5)', tone: 'opp', place: 'below left', group: 'meet' },
            { id: 'R', x: 4, y: 5, tex: '(4, 5)', tone: 'opp', place: 'below right', group: 'meet' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 - 2x - 3 = 5', 'x^2 - 2x - 8 = 0', '(x + 2)(x - 4) = 0', 'x = -2 \\text{ or } x = 4 \\;\\checkmark'] }],
      lines: [
        { say: 'A graph can also solve an equation such as f of x equals five. Draw the horizontal line y equals five, and read the x-coordinates where it meets the parabola.', show: ['fk.grid', 'fk.axes', 'fk.curve', 'fk.line', 'm.0'], focus: ['fk.line', 'm.0'] },
        { say: 'The line meets y equals x squared, minus two x, minus three, at negative two, five, and at four, five. So x is negative two, or four.', show: 'fk.meet', focus: 'fk.meet' },
        { say: 'Check with algebra. Subtract five: x squared, minus two x, minus eight, equals zero, which factors as x plus two, times x minus four. The roots match.', show: ['m.1', 'm.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which equation has no real roots?',
          choices: ['$x^2 + 2 = 0$', '$x^2 - 2 = 0$', '$x^2 = 0$', '$(x - 2)^2 - 1 = 0$'],
          answer: 0,
          working: 'The graph of $y = x^2 + 2$ has its vertex at $(0, 2)$, above the $x$-axis, and opens up, so it never meets the axis.',
        },
      ],
      lines: [
        { say: 'Your turn. Which equation has no real roots? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The graph of y equals x squared plus two has its vertex at zero, two, above the x-axis, and it opens up, so it never meets the axis. B and D have two roots, and C has one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Roots, zeros and $x$-intercepts are the same numbers.', 'Check roots read from a graph in the equation.', 'Two, one or no real roots: the parabola crosses, touches or misses the $x$-axis.'] }],
      lines: [
        { say: 'Let’s sum up. The roots of an equation, the zeros of its function, and the x-intercepts of its graph are the same numbers.', show: 'sum.0' },
        { say: 'Check any roots you read from a graph in the equation.', show: 'sum.1' },
        { say: 'And there are two, one or no real roots, as the parabola crosses, touches or misses the x-axis. In part two, we solve by factoring. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
