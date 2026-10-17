import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-5, 5], y: [-4, 4], every: 0 });

/** The lesson's y = f(x): through (−4, 1), (−2, 3), (1, 3) and (3, −1). */
const f: [number, number][] = [[-4, 1], [-2, 3], [1, 3], [3, -1]];

const video: Explainer = {
  id: 'm301-1-2',
  lessonId: 'm301-1-2',
  title: 'Reflections and Stretches, Part 1: Reflections in the Axes',
  thumbnailTitle: 'Reflections in the Axes',
  thumbnail: 'rx',
  summary: 'Reflections of y = f(x) in the x-axis, y = −f(x), and in the y-axis, y = f(−x), with their mappings, invariant points on the line of reflection, and reflecting a point and the equation f(x) = x² − 3x + 1. Parts 2 to 4 cover stretches and invariant points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.2 · Part 1', title: 'Reflections in the Axes', subtitle: 'y = −f(x) and y = f(−x)' }],
      lines: [
        { say: 'A mirror flips an image, and a zoom lens stretches it. Graphs can be flipped and stretched too, while keeping their basic shape.', show: 'title' },
        { say: 'In this video, you will reflect a graph in the x-axis and in the y-axis, find the points that do not move, and reflect an equation.' },
      ],
    },
    {
      chapter: 'Reflecting in the x-axis',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('rx', [
          g,
          polyline(g, { id: 'f', points: f, tone: 'muted' }),
          polyline(g, { id: 'image', points: f.map(([x, y]) => [x, -y]), tone: 'brand' }),
          dots(g, [
            { id: 'A', x: -2, y: 3, tex: '(-2, 3)', tone: 'muted', place: 'above' },
            { id: 'B', x: -2, y: -3, tex: '(-2, -3)', tone: 'opp', place: 'below' },
            { id: 'I', x: 2.5, y: 0, tone: 'good' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: 'A flip over a line, the **line of reflection**. Each point and its image are the same distance from the line, on opposite sides.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -f(x)', '(x, y) \\to (x, -y)'] },
      ],
      lines: [
        { say: 'A reflection flips a graph over a line, called the line of reflection. Each point and its image are the same distance from the line, on opposite sides of it.', show: 'def' },
        { say: 'The grey graph is y equals f of x. It runs through negative four, one; negative two, three; one, three; and three, negative one.', show: ['rx.grid', 'rx.axes', 'rx.f'] },
        { say: 'The graph of y equals negative f of x is its reflection in the x-axis. Every output changes sign, so the point x, y maps to x, negative y.', show: ['m.0', 'm.1', 'rx.image'], focus: ['m.1', 'rx.image'] },
        { say: 'For example, negative two, three, maps to negative two, negative three: the same distance from the x-axis, on the other side.', show: ['rx.A', 'rx.B'], focus: ['rx.A', 'rx.B'] },
        { say: 'Notice the green point, where the graph crosses the x-axis at 2.5. It is on both graphs: the reflection does not move it at all.', show: 'rx.I', focus: 'rx.I' },
      ],
    },
    {
      chapter: 'Reflecting in the y-axis',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ry', [
          g,
          polyline(g, { id: 'f', points: f, tone: 'muted' }),
          polyline(g, { id: 'image', points: f.map(([x, y]) => [-x, y]), tone: 'brand' }),
          dots(g, [
            { id: 'A', x: -2, y: 3, tex: '(-2, 3)', tone: 'muted', place: 'above' },
            { id: 'B', x: 2, y: 3, tex: '(2, 3)', tone: 'opp', place: 'above' },
            { id: 'I', x: 0, y: 3, tone: 'good' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = f(-x)', '(x, y) \\to (-x, y)', '(-2, 3) \\to (2, 3)'] }],
      lines: [
        { say: 'The graph of y equals f of negative x is the reflection in the y-axis. Here, every input changes sign, so x, y maps to negative x, y.', show: ['ry.grid', 'ry.axes', 'ry.f', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'Negative two, three, maps to two, three: the same height, the same distance from the y-axis, on the other side.', show: ['ry.image', 'ry.A', 'ry.B', 'm.2'], focus: ['ry.A', 'ry.B', 'm.2'] },
        { say: 'This time the graph flips left to right. A reflection in the x-axis flips it top to bottom.' },
        { say: 'And again one point stays put: the green point at zero, three, where the graph crosses the y-axis.', show: 'ry.I', focus: 'ry.I' },
      ],
    },
    {
      chapter: 'Invariant points',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Invariant point', md: 'A point that does not move under a transformation: it is its own image.' },
        {
          kind: 'table',
          id: 't',
          head: ['Reflection', 'Mapping', 'Invariant points'],
          rows: [
            ['$y = -f(x)$, in the $x$-axis', '$(x, y) \\to (x, -y)$', 'on the $x$-axis: $y = 0$'],
            ['$y = f(-x)$, in the $y$-axis', '$(x, y) \\to (-x, y)$', 'on the $y$-axis: $x = 0$'],
          ],
        },
      ],
      lines: [
        { say: 'A point that does not move under a transformation is called an invariant point. It is its own image.', show: 'def' },
        { say: 'In a reflection in the x-axis, x, y maps to x, negative y. That is the same point only when y equals negative y, which means y is zero.', show: 't.0', focus: 't.0' },
        { say: 'So the invariant points are on the x-axis: the x-intercepts, like 2.5, zero, on our graph.' },
        { say: 'In a reflection in the y-axis, x, y maps to negative x, y. That is the same point only when x is zero. So the invariant points are on the y-axis: here, zero, three.', show: 't.1', focus: 't.1' },
        { say: 'In both cases, the invariant points lie on the line of reflection.' },
      ],
    },
    {
      chapter: 'Reflecting points and equations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -f(x):\\quad (-5, 2) \\to (-5, -2)', 'y = f(-x):\\quad (-5, 2) \\to (5, 2)', 'f(x) = x^2 - 3x + 1', '-f(x) = -(x^2 - 3x + 1) = -x^2 + 3x - 1', 'f(-x) = (-x)^2 - 3(-x) + 1 = x^2 + 3x + 1'] },
      ],
      lines: [
        { say: 'The point at negative five, two, is on the graph of y equals f of x. Find the corresponding points on y equals negative f of x, and on y equals f of negative x.' },
        { say: 'For y equals negative f of x, change the sign of y: negative five, negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'For y equals f of negative x, change the sign of x: five, two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now reflect an equation. Given f of x equals x squared, minus three x, plus one, write y equals negative f of x, and y equals f of negative x.', show: 'm.2', focus: 'm.2' },
        { say: 'Negative f of x puts a negative sign in front of the whole function, so every term changes sign: negative x squared, plus three x, minus one.', show: 'm.3', focus: 'm.3' },
        { say: 'f of negative x replaces every x with negative x. Negative x, all squared, is x squared, and negative three times negative x is plus three x. So f of negative x is x squared, plus three x, plus one.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(3, -7)$ is on the graph of $y = f(x)$. Which point is on the graph of $y = f(-x)$?',
          choices: ['$(-3, -7)$', '$(3, 7)$', '$(-3, 7)$', '$(-7, 3)$'],
          answer: 0,
          working: '$y = f(-x)$ is a reflection in the $y$-axis: $(x, y) \\to (-x, y)$, so $(3, -7) \\to (-3, -7)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at three, negative seven, is on the graph of y equals f of x. Which point is on the graph of y equals f of negative x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. y equals f of negative x is a reflection in the y-axis, so only x changes sign: negative three, negative seven. B is the reflection in the x-axis instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = -f(x)$: reflect in the $x$-axis, $(x, y) \\to (x, -y)$.', '$y = f(-x)$: reflect in the $y$-axis, $(x, y) \\to (-x, y)$.', 'Invariant points lie on the line of reflection.'] }],
      lines: [
        { say: 'Let’s sum up. y equals negative f of x reflects the graph in the x-axis: x, y maps to x, negative y.', show: 'sum.0' },
        { say: 'y equals f of negative x reflects it in the y-axis: x, y maps to negative x, y.', show: 'sum.1' },
        { say: 'And the invariant points lie on the line of reflection. In part two, we stretch graphs vertically. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
