import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 5], y: [-3, 10], every: 0 });
const f = (x: number) => -(x + 2) * (x - 4);

/** The axis of symmetry, x = 1, as a dashed vertical line. */
const axis: Part = {
  points: { s0: g.map(1, -3), s1: g.map(1, 10) },
  items: [{ kind: 'line', id: 'sym', from: 's0', to: 's1', tone: 'theta', dashed: true }],
};

const video: Explainer = {
  id: 'm202-6-3-b',
  lessonId: 'm202-6-3',
  title: 'Quadratic Functions in Factored Form, Part 2: Axis, Vertex and Intercepts',
  thumbnailTitle: 'Sketching from Factored Form',
  thumbnail: 'sk',
  summary: 'Finding the zeros, axis of symmetry, vertex, y-intercept and range of y = −(x + 2)(x − 4) from factored form, and how expanding factored form gives standard form with the same a.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.3 · Part 2', title: 'Axis, Vertex and Intercepts', subtitle: 'Sketching from factored form' }],
      lines: [
        { say: 'Factored form is the quickest way to sketch a parabola. From the zeros, everything else follows.', show: 'title' },
        { say: 'In this video, you will find the axis, the vertex, the y-intercept and the range, all from factored form.' },
      ],
    },
    {
      chapter: 'Everything from factored form',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('sk', [
          g,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          axis,
          dots(g, [
            { id: 'z1', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'below left' },
            { id: 'z2', x: 4, y: 0, tex: '(4, 0)', tone: 'good', place: 'below right' },
            { id: 'V', x: 1, y: 9, tex: '(1, 9)', tone: 'opp', place: 'above right' },
            { id: 'Y', x: 0, y: 8, tex: '(0, 8)', tone: 'adj', place: 'left' },
          ]),
        ], 460),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -(x + 2)(x - 4)', '\\text{zeros: } {-2},\\ 4', 'x = \\dfrac{-2 + 4}{2} = 1', 'y = -(3)(-3) = 9', 'x = 0:\\ y = -(2)(-4) = 8'] }],
      lines: [
        { say: 'Take y equals negative, x plus two, times x minus four. The zeros are negative two and four.', show: ['sk.grid', 'sk.axes', 'm.0', 'm.1', 'sk.z1', 'sk.z2'], focus: ['sk.z1', 'sk.z2', 'm.1'] },
        { say: 'The axis of symmetry is halfway between the zeros: negative two plus four, over two, is one. So the axis is x equals one.', show: ['m.2', 'sk.sym'], focus: ['sk.sym', 'm.2'] },
        { say: 'Substitute one to find the vertex: negative, three times negative three, is nine. The vertex is one, nine.', show: ['m.3', 'sk.V'], focus: ['sk.V', 'm.3'] },
        { say: 'For the y-intercept, substitute zero: negative, two times negative four, is eight.', show: ['m.4', 'sk.Y'], focus: ['sk.Y', 'm.4'] },
        { say: '"A" is negative one, so the parabola opens down, and nine is its maximum value. The range is y at most nine. Join the points with a smooth curve.', show: 'sk.curve', focus: 'sk.curve' },
      ],
    },
    {
      chapter: 'One that opens up',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 2(x - 1)(x + 3)', 'x = \\dfrac{1 + (-3)}{2} = -1', 'y = 2(-1 - 1)(-1 + 3) = 2(-2)(2) = -8', 'x = 0:\\ y = 2(-1)(3) = -6;\\quad y \\ge -8'] }],
      lines: [
        { say: 'Now one that opens up: y equals two, times x minus one, times x plus three. The zeros are one and negative three, so the axis is halfway, at negative one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Substitute negative one: two times negative two times two is negative eight, so the vertex is negative one, negative eight.', show: 'm.2', focus: 'm.2' },
        { say: 'The y-intercept is two times negative one times three, which is negative six. "A" is positive, so negative eight is the minimum value, and the range is y at least negative eight.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Standard form or factored form?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2(x - 1)(x + 3) = 2(x^2 + 2x - 3)', '= 2x^2 + 4x - 6'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two forms, one function', md: 'Standard form shows the $y$-intercept ($c = -6$). Factored form shows the zeros ($1$ and $-3$). Both forms have the same $a$.' },
      ],
      lines: [
        { say: 'Expanding factored form gives standard form. Two, times x minus one, times x plus three, is two, times x squared plus two x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'That is two x squared, plus four x, minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Each form shows something different. Standard form shows the y-intercept, negative six. Factored form shows the zeros, one and negative three. And both forms have the same "a".', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the vertex of $y = (x - 1)(x - 7)$?',
          choices: ['$(4, -9)$', '$(4, 9)$', '$(-4, 55)$', '$(0, 7)$'],
          answer: 0,
          working: 'The axis is $x = \\dfrac{1 + 7}{2} = 4$, and $y = (4 - 1)(4 - 7) = (3)(-3) = -9$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the vertex of y equals x minus one, times x minus seven? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The zeros are one and seven, so the axis is x equals four. Then three times negative three is negative nine, so the vertex is four, negative nine. D is the y-intercept.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Axis: halfway between the zeros, $x = \\dfrac{r + s}{2}$.', 'Vertex: substitute the axis value. $y$-intercept: substitute $x = 0$.', 'The sign of $a$ gives the direction, and so a maximum or minimum.'] }],
      lines: [
        { say: 'Let’s sum up. The axis of symmetry is halfway between the zeros.', show: 'sum.0' },
        { say: 'Substitute the axis value to find the vertex, and zero to find the y-intercept.', show: 'sum.1' },
        { say: 'And the sign of "a" tells you whether the vertex is a maximum or a minimum. In part three, we write equations from the zeros, and model an arch. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
