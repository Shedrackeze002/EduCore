import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const p1 = plane({ name: 'p1', x: [-3, 3], y: [-5, 6], every: 0, at: [0, 0] });
const p2 = plane({ name: 'p2', x: [-3, 3], y: [-5, 6], every: 0, at: [8, 0] });
const p3 = plane({ name: 'p3', x: [-3, 3], y: [-5, 6], every: 0, at: [16, 0] });

const g = plane({ x: [-5, 3], y: [-5, 6], every: 0 });
const f = (x: number) => -x * x - 2 * x + 3;

const video: Explainer = {
  id: 'm202-6-1-b',
  lessonId: 'm202-6-1',
  title: 'Quadratic Functions and Their Graphs, Part 2: Maximum, Minimum, Domain and Range',
  thumbnailTitle: 'Domain and Range of a Parabola',
  thumbnail: 'dr',
  summary: 'Maximum and minimum values at the vertex, parabolas with two, one or no zeros, writing the axis of symmetry as x = a number, and the domain and range of y = −x² − 2x + 3 from its graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 6.1 · Part 2', title: 'Maximum, Minimum, Domain and Range', subtitle: 'What the vertex tells you' }],
      lines: [
        { say: 'The vertex of a parabola is more than a turning point. It gives the greatest or least value of the function, and it decides the range.', show: 'title' },
        { say: 'In this video, you will find maximum and minimum values, count zeros, and state the domain and range.' },
      ],
    },
    {
      chapter: 'Maximum and minimum',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Maximum and minimum values', md: 'If a parabola opens **up**, the $y$-coordinate of its vertex is the **minimum value** of the function. If it opens **down**, it is the **maximum value**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = x^2 - 2x - 3:\\ \\text{vertex } (1, -4),\\ \\text{minimum value } {-4}'] },
      ],
      lines: [
        { say: 'If a parabola opens up, the y-coordinate of its vertex is the minimum value of the function: no y-value is lower. If it opens down, the y-coordinate of the vertex is the maximum value.', show: 'def' },
        { say: 'So y equals x squared, minus two x, minus three, with vertex one, negative four, has a minimum value of negative four. The value is the y-coordinate, not the whole point.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Two, one or no zeros',
      layout: 'center',
      main: [
        figure('zz', [
          p1, plot(p1, { id: 'c', f: (x) => x * x - 4, tone: 'brand' }), dots(p1, [{ id: 'a', x: -2, y: 0, tex: '', tone: 'good' }, { id: 'b', x: 2, y: 0, tex: '', tone: 'good' }]),
          p2, plot(p2, { id: 'c', f: (x) => x * x, tone: 'brand' }), dots(p2, [{ id: 'a', x: 0, y: 0, tex: '', tone: 'good' }]),
          p3, plot(p3, { id: 'c', f: (x) => x * x + 2, tone: 'brand' }),
        ], 340),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{two zeros}\\qquad\\qquad \\text{one zero}\\qquad\\qquad \\text{no zeros}'] },
      ],
      lines: [
        { say: 'A parabola does not have to cross the x-axis twice. This one crosses it twice, so the function has two zeros.', show: ['zz.p1-grid', 'zz.p1-axes', 'zz.p1-c', 'zz.p1-a', 'zz.p1-b'], focus: ['zz.p1-a', 'zz.p1-b'] },
        { say: 'This one just touches the x-axis at its vertex, so it has one zero.', show: ['zz.p2-grid', 'zz.p2-axes', 'zz.p2-c', 'zz.p2-a'], focus: 'zz.p2-a' },
        { say: 'And this one misses the x-axis completely, so it has no zeros. A quadratic function has two, one or no zeros.', show: ['zz.p3-grid', 'zz.p3-axes', 'zz.p3-c', 'm.0'], focus: 'zz.p3-c' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'split',
      leftWidth: 540,
      left: [figure('dr', [g, plot(g, { id: 'curve', f, tone: 'brand' }), dots(g, [{ id: 'V', x: -1, y: 4, tex: '(-1, 4)', tone: 'opp', place: 'above left' }])], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Domain: } \\{x \\mid x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y \\le 4,\\ y \\in \\mathbb{R}\\}', '\\text{maximum value: } 4'] }],
      lines: [
        { say: 'The domain of a function is the set of all its x-values, and the range is the set of all its y-values. Here is y equals negative x squared, minus two x, plus three.', show: ['dr.grid', 'dr.axes', 'dr.curve'] },
        { say: 'Any real number can be substituted for x, and the parabola keeps going left and right forever. So the domain of every quadratic function is all real numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'The range starts or stops at the vertex. This parabola opens down, and its highest point is negative one, four. So the range is every y-value at or below four, and the maximum value is four.', show: ['dr.V', 'm.1', 'm.2'], focus: ['dr.V', 'm.1'] },
      ],
    },
    {
      chapter: 'Two common slips',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The axis of symmetry is a vertical line', md: 'Write $x = 1$, not $y = 1$ and not just "$1$". A vertical line has an equation of the form $x = $ a number.' },
        { kind: 'callout', id: 'oops2', tone: 'mistake', title: 'Use the y-coordinate for the range', md: 'For the vertex $(-1, 4)$, the range is $y \\le 4$, not $y \\le -1$. And a parabola that opens down has a range of the form $y \\le$ a number.' },
      ],
      lines: [
        { say: 'Two common slips. The axis of symmetry is a vertical line, so write it as x equals a number, not y equals, and not just the number.', show: 'oops' },
        { say: 'And the range is about y-values, so use the y-coordinate of the vertex. For a vertex of negative one, four, the range is y at most four. Check the direction too: a parabola that opens down has a range of y at most a number.', show: 'oops2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parabola opens up and has its vertex at $(3, -2)$. What is its range?',
          choices: ['$\\{y \\mid y \\ge -2,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\le -2,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge 3,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
          answer: 0,
          working: 'It opens up, so the vertex is the lowest point, and its $y$-coordinate, $-2$, is the minimum value: $y \\ge -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parabola opens up, and has its vertex at three, negative two. What is its range? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. It opens up, so the vertex is the lowest point, and the minimum value is negative two. The range is y at least negative two. C uses the x-coordinate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The vertex gives the minimum (opens up) or maximum (opens down) value.', 'A quadratic function has two, one or no zeros.', 'Domain: all real numbers. Range: $y \\ge$ or $y \\le$ the vertex’s $y$-coordinate.'] }],
      lines: [
        { say: 'Let’s sum up. The y-coordinate of the vertex is the minimum value if the parabola opens up, or the maximum value if it opens down.', show: 'sum.0' },
        { say: 'A quadratic function has two, one or no zeros.', show: 'sum.1' },
        { say: 'And the domain is all real numbers, while the range stops at the vertex’s y-coordinate. In part three, we read parabolas in real situations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
