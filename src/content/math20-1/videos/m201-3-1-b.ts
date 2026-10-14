import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-8, 3], y: [-6, 6], every: 2 });
const g2 = plane({ x: [0, 12], y: [-2, 10], every: 2 });

const video: Explainer = {
  id: 'm201-3-1-b',
  lessonId: 'm201-3-1',
  title: 'Quadratic Functions in Vertex Form, Part 2: Reading the Features',
  thumbnailTitle: 'Reading Vertex Form',
  thumbnail: 'max',
  summary: 'Describing the transformations in y = −2(x + 4)² + 1, why (p, q) is the vertex of y = a(x − p)² + q and q its minimum or maximum value, and reading the vertex, axis of symmetry, direction of opening and maximum value of y = −½(x − 6)² + 8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.1 · Part 2', title: 'Reading Vertex Form', subtitle: 'Vertex, axis, maximum or minimum' }],
      lines: [
        { say: 'Vertex form is called vertex form for a reason: the vertex is right there in the equation.', show: 'title' },
        { say: 'In this video, you will describe the transformations in an equation, see why p and q give the vertex, and read a parabola’s features without graphing it.' },
      ],
    },
    {
      chapter: 'Describing transformations',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('tf', [
          g1,
          plot(g1, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g1, { id: 'image', f: (x) => -2 * (x + 4) ** 2 + 1, tone: 'brand' }),
          dots(g1, [{ id: 'V', x: -4, y: 1, tex: '(-4, 1)', tone: 'opp', place: 'above left' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -2(x + 4)^2 + 1', 'a = -2:\\ \\text{reflect, stretch by } 2', 'p = -4:\\ 4 \\text{ left}', 'q = 1:\\ 1 \\text{ up}'] }],
      lines: [
        { say: 'Describe how the graph of y equals x squared is transformed to give y equals negative two times x plus four, squared, plus one.', show: ['tf.grid', 'tf.axes', 'tf.base', 'm.0'] },
        { say: '"a" is negative two: a reflection in the x-axis, and a vertical stretch by a factor of two.', show: 'm.1', focus: 'm.1' },
        { say: 'x plus four is x minus negative four, so p is negative four: a translation four units left. And q is one: a translation one unit up.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So the vertex moves to negative four, one, and the parabola opens down, narrower than y equals x squared.', show: ['tf.image', 'tf.V'], focus: ['tf.image', 'tf.V'] },
      ],
    },
    {
      chapter: 'Why (p, q) is the vertex',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a > 0:\\quad a(x - p)^2 \\ge 0', 'y = a(x - p)^2 + q \\ge q', 'y = q \\text{ only when } x = p'] },
        { kind: 'bullets', id: 'b', items: ['Vertex $(p, q)$; axis of symmetry $x = p$.', '$a > 0$: opens up, **minimum** value $q$.', '$a < 0$: opens down, **maximum** value $q$.'] },
      ],
      lines: [
        { say: 'Why is p, q the vertex? Suppose "a" is positive. A square is never negative, so "a" times x minus p, squared, is never negative either.', show: 'm.0', focus: 'm.0' },
        { say: 'So y, which is that amount plus q, is always at least q. And y equals q only when x equals p, where the square is zero.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'That makes q the minimum value, reached at x equals p. When "a" is negative, the square term is never positive, so q is the maximum value instead.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'The symmetry follows too: x equals p plus h, and x equals p minus h, give the same y-value, because h squared equals negative h, squared.' },
      ],
    },
    {
      chapter: 'Features from the equation',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('max', [
          g2,
          polyline(g2, { id: 'axis', points: [[6, -2], [6, 10]], tone: 'muted', dashed: true }),
          plot(g2, { id: 'curve', f: (x) => -0.5 * (x - 6) ** 2 + 8, tone: 'brand' }),
          dots(g2, [{ id: 'V', x: 6, y: 8, tex: '(6, 8)', tone: 'opp', place: 'above right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -\\tfrac{1}{2}(x - 6)^2 + 8', 'a = -\\tfrac{1}{2},\\ p = 6,\\ q = 8', '\\text{vertex } (6, 8),\\ \\text{axis } x = 6', '\\text{opens down: maximum } 8'] }],
      lines: [
        { say: 'State the vertex, the axis of symmetry, the direction of opening, and the maximum or minimum value of y equals negative one half, times x minus six, squared, plus eight.', show: ['max.grid', 'max.axes', 'm.0'] },
        { say: 'Compare it with vertex form: "a" is negative one half, p is six, and q is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'So the vertex is six, eight, and the axis of symmetry is x equals six.', show: ['m.2', 'max.V', 'max.axis'], focus: ['m.2', 'max.V'] },
        { say: '"a" is negative, so the parabola opens down, and the vertex is a maximum point: the maximum value is eight.', show: ['m.3', 'max.curve'], focus: ['m.3', 'max.curve'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the vertex of $y = 3(x - 2)^2 + 7$, and is it a maximum or a minimum?',
          choices: ['$(2, 7)$, minimum', '$(-2, 7)$, minimum', '$(2, 7)$, maximum', '$(7, 2)$, minimum'],
          answer: 0,
          working: '$p = 2$ and $q = 7$, so the vertex is $(2, 7)$. $a = 3 > 0$, so the parabola opens up and $7$ is the minimum value.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the vertex of y equals three times x minus two, squared, plus seven, and is it a maximum or a minimum? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. p is two and q is seven, so the vertex is two, seven. "a" is three, which is positive, so the parabola opens up and the vertex is a minimum. B gets the sign of p wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a(x - p)^2 + q$ has vertex $(p, q)$ and axis $x = p$.', '$a > 0$: minimum value $q$. $a < 0$: maximum value $q$.', 'Describe transformations from $a$, $p$ and $q$.'] }],
      lines: [
        { say: 'Let’s sum up. In vertex form, the vertex is p, q, and the axis of symmetry is x equals p.', show: 'sum.0' },
        { say: 'When "a" is positive, q is the minimum value. When "a" is negative, q is the maximum value.', show: 'sum.1' },
        { say: 'And describe the transformations from "a", p and q. In part three, we find domain and range, and model a thrown ball. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
