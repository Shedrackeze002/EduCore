import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 7], y: [-18, 4], yStep: 2, every: 0, width: 6, height: 8 });
const f = (x: number) => x * x - 4 * x - 12;

/** The axis of symmetry, x = 2, as a dashed vertical line. */
const axis: Part = {
  points: { s0: g.map(2, -18), s1: g.map(2, 4) },
  items: [{ kind: 'line', id: 'sym', from: 's0', to: 's1', tone: 'theta', dashed: true, label: 'x = 2', labelAt: 0.95, labelSide: 'right' }],
};

const video: Explainer = {
  id: 'm202-6-2',
  lessonId: 'm202-6-2',
  title: 'Axis of Symmetry and Optimization, Part 1: Finding the Axis of Symmetry',
  thumbnailTitle: 'Finding the Axis of Symmetry',
  thumbnail: 'ax',
  summary: 'Finding the axis of symmetry halfway between the zeros, the vertex of y = x² − 4x − 12 at (2, −16), using any two points at the same height, and why the axis of y = ax² + bx + c is x = −b/(2a).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.2 · Part 1', title: 'Finding the Axis of Symmetry', subtitle: 'Halfway between' }],
      lines: [
        { say: 'Fold a parabola along its axis of symmetry, and the two halves match exactly. That symmetry is a powerful tool.', show: 'title' },
        { say: 'In this video, you will find the axis of symmetry from the zeros, and from the equation, and use it to find the vertex.' },
      ],
    },
    {
      chapter: 'From the zeros',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('ax', [
          g,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          axis,
          dots(g, [
            { id: 'z1', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'above left' },
            { id: 'z2', x: 6, y: 0, tex: '(6, 0)', tone: 'good', place: 'above right' },
            { id: 'V', x: 2, y: -16, tex: '(2, -16)', tone: 'opp', place: 'below right' },
          ]),
        ], 460),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = \\dfrac{r + s}{2}', 'x = \\dfrac{-2 + 6}{2} = 2', 'y = 2^2 - 4(2) - 12 = -16'] }],
      lines: [
        { say: 'Points on a parabola at the same height are the same distance from the axis of symmetry. The zeros are two such points, both with y equal to zero, so the axis is halfway between them.', show: ['ax.grid', 'ax.axes', 'ax.curve', 'm.0'], focus: 'm.0' },
        { say: 'The graph of y equals x squared, minus four x, minus twelve, has zeros negative two and six. Halfway between them: negative two plus six, over two, is two. The axis of symmetry is x equals two.', show: ['ax.z1', 'ax.z2', 'ax.sym', 'm.1'], focus: ['ax.sym', 'm.1'] },
        { say: 'The vertex lies on that line. Substitute two into the equation: four, minus eight, minus twelve, is negative sixteen. The vertex is two, negative sixteen.', show: ['ax.V', 'm.2'], focus: ['ax.V', 'm.2'] },
      ],
    },
    {
      chapter: 'Any two points at the same height',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(1, 5) \\text{ and } (7, 5)', 'x = \\dfrac{1 + 7}{2} = 4'] }],
      lines: [
        { say: 'The same idea works for any two points with the same y-coordinate, not just the zeros. If one, five and seven, five are both on a parabola, they are at the same height.', show: 'm.0', focus: 'm.0' },
        { say: 'So the axis of symmetry is halfway between their x-coordinates: one plus seven, over two, is four. The axis is x equals four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From standard form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = ax^2 + bx + c:\\quad x = -\\dfrac{b}{2a}', 'ax^2 + bx + c = c \\;\\Rightarrow\\; x(ax + b) = 0', 'x = 0 \\text{ or } x = -\\dfrac{b}{a}', '\\tfrac{1}{2}\\left(0 - \\dfrac{b}{a}\\right) = -\\dfrac{b}{2a}'] },
      ],
      lines: [
        { say: 'When the zeros are not easy to find, use the equation instead. For y equals "a" x squared, plus b x, plus c, the axis of symmetry is x equals negative b over two "a".', show: 'm.0', focus: 'm.0' },
        { say: 'Why does it work? The y-intercept is zero, c. Find the other point at the same height: set the expression equal to c. The c’s cancel, and factoring gives x times "a" x plus b, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is zero, or negative b over "a". Those two points are at the same height.', show: 'm.2', focus: 'm.2' },
        { say: 'The axis is halfway between them: half of negative b over "a", which is negative b over two "a".', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The points $(-3, 8)$ and $(5, 8)$ are on a parabola. What is its axis of symmetry?',
          choices: ['$x = 1$', '$x = 4$', '$y = 8$', '$x = -4$'],
          answer: 0,
          working: 'Both points have $y = 8$, so the axis is halfway between them: $x = \\dfrac{-3 + 5}{2} = 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. The points negative three, eight and five, eight are on a parabola. What is its axis of symmetry? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Both points are at height eight, so the axis is halfway between them: negative three plus five, over two, is one. The axis is x equals one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Axis from the zeros: $x = \\dfrac{r + s}{2}$.', 'Axis from standard form: $x = -\\dfrac{b}{2a}$.', 'Substitute the axis value to find the vertex.'] }],
      lines: [
        { say: 'Let’s sum up. The axis of symmetry is halfway between the zeros, or between any two points at the same height.', show: 'sum.0' },
        { say: 'From standard form, it is x equals negative b over two "a".', show: 'sum.1' },
        { say: 'And substitute the axis value into the equation to find the vertex. In part two, we find maximum and minimum values. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
