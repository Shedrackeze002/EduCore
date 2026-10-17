import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

const g = plane({ x: [-6, 8], y: [-8, 6], every: 0 });
const g2 = plane({ x: [-6, 8], y: [-6, 8], every: 0 });
const g3 = plane({ x: [-6, 6], y: [-4, 8], every: 0 });

const video: Explainer = {
  id: 'm301-8-3-c',
  lessonId: 'm301-8-3',
  title: 'Connecting Graphs and Rational Equations, Part 3: Solving Graphically',
  thumbnailTitle: 'Solving Graphically',
  thumbnail: 'rel',
  summary: 'Solving a rational equation with graphs: the solutions are the x-intercepts of the related function, or the x-coordinates where the graphs of the two sides meet, and an extraneous root shows up as a hole, for (x + 5)/(x − 1) = 3 and x²/(x − 2) = 4/(x − 2).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.3 · Part 3', title: 'Solving Graphically', subtitle: 'The x-intercepts of the related function' }],
      lines: [
        { say: 'Every equation has a picture. The solutions of a rational equation are points you can see on a graph.', show: 'title' },
        { say: 'In this video, you will solve rational equations with graphs, and see why an extraneous root shows up as a hole.' },
      ],
    },
    {
      chapter: 'The related function',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x + 5}{x - 1} = 3 \\quad\\to\\quad \\dfrac{x + 5}{x - 1} - 3 = 0',
            'y = \\dfrac{x + 5}{x - 1} - 3',
            '= \\dfrac{x + 5 - 3(x - 1)}{x - 1} = \\dfrac{-2x + 8}{x - 1}',
            '= \\dfrac{-2(x - 4)}{x - 1}',
          ],
        },
      ],
      lines: [
        { say: 'To solve an equation graphically, first rearrange it so that one side is zero. For x plus five, over x minus one, equals three, subtract three from both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'The other side defines the related function: y equals x plus five, over x minus one, minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'The solutions of the equation are the x-intercepts of the related function, because that is where y is zero.' },
        { say: 'Over a common denominator, the related function is x plus five, minus three times x minus one, all over x minus one. That simplifies to negative two times x minus four, over x minus one.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Reading the x-intercept',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('rel', [
          g,
          numbers(g, 2),
          vAsym(g, 'va', 1),
          hAsym(g, 'ha', -2),
          tag(g, 'va-name', 1, -7.4, 'x = 1', 'right'),
          tag(g, 'ha-name', 8, -2, 'y = -2', 'below left'),
          branches(g, { id: 'c', f: (x) => (-2 * (x - 4)) / (x - 1), breaks: [1] }),
          dots(g, [{ id: 'X', x: 4, y: 0, tex: '(4, 0)', tone: 'good', place: 'above right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{-2(x - 4)}{x - 1}', 'x\\text{-intercept: } 4', 'x = 4'] }],
      lines: [
        { say: 'Here is the graph of the related function. It has a vertical asymptote x equals one, and a horizontal asymptote y equals negative two.', show: ['rel.grid', 'rel.axes', 'rel.va', 'rel.ha', 'rel.va-name', 'rel.ha-name', 'rel.c', 'm.0'] },
        { say: 'It crosses the x-axis only once, at x equals four.', show: ['rel.X', 'm.1'], focus: ['rel.X', 'm.1'] },
        { say: 'So the solution is x equals four: the same answer that the algebra gave.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Where two graphs meet',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('two', [
          g2,
          numbers(g2, 2),
          vAsym(g2, 'va', 1),
          hAsym(g2, 'ha', 1),
          tag(g2, 'va-name', 1, -5.4, 'x = 1', 'right'),
          tag(g2, 'ha-name', -6, 1, 'y = 1', 'above right'),
          branches(g2, { id: 'c', f: (x) => (x + 5) / (x - 1), breaks: [1] }),
          polyline(g2, { id: 'line', points: [[-6, 3], [8, 3]], tone: 'opp' }),
          tag(g2, 'line-name', -6, 3, 'y = 3', 'above right', 'opp'),
          dots(g2, [{ id: 'P', x: 4, y: 3, tex: '(4, 3)', tone: 'good', place: 'above right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{x + 5}{x - 1}', 'y = 3', '\\text{they meet at } (4, 3)', 'x = 4'] }],
      lines: [
        { say: 'You can also graph each side of the equation as its own function: y equals x plus five, over x minus one, and the line y equals three.', show: ['two.grid', 'two.axes', 'two.va', 'two.ha', 'two.va-name', 'two.ha-name', 'two.c', 'two.line', 'two.line-name', 'm.0', 'm.1'] },
        { say: 'The two graphs meet at four, three.', show: ['two.P', 'm.2'], focus: ['two.P', 'm.2'] },
        { say: 'The x-coordinate of the point of intersection, four, is the solution. Again, x equals four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Extraneous roots as holes',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ho', [
          g3,
          numbers(g3, 2),
          plot(g3, { id: 'c', f: (x) => x + 2 }),
          dots(g3, [
            { id: 'X', x: -2, y: 0, tex: '(-2, 0)', tone: 'good', place: 'above left' },
            { id: 'H', x: 2, y: 4, tex: '(2, 4)', tone: 'opp', place: 'below right', open: true },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\dfrac{x^2}{x - 2} = \\dfrac{4}{x - 2}',
            'y = \\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x - 2)(x + 2)}{x - 2}',
            'y = x + 2,\\quad x \\ne 2',
            '\\text{algebra: } x^2 = 4,\\ x = \\pm 2',
            'x = 2 \\text{ is a hole: extraneous}',
          ],
        },
      ],
      lines: [
        { say: 'Graphs show extraneous roots clearly. Solve x squared over x minus two equals four over x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract the right side from the left, and the related function is y equals x squared minus four, over x minus two. Factor the numerator: x minus two, times x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'x minus two cancels, so the graph is the line y equals x plus two, with a hole at two, four.', show: ['m.2', 'ho.grid', 'ho.axes', 'ho.c', 'ho.H'], focus: ['m.2', 'ho.H'] },
        { say: 'The line crosses the x-axis at negative two. That is the solution.', show: 'ho.X', focus: 'ho.X' },
        { say: 'With algebra, multiplying by x minus two gives x squared equals four, so x is two or negative two. The graph shows why two does not work: at x equals two, the related function has a hole. It is not even defined there, so two is extraneous.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4', 'ho.H'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The equation $\\dfrac{x^2 - 9}{x - 3} = 0$ has the related function $y = \\dfrac{x^2 - 9}{x - 3}$. What does its graph show?',
          choices: [
            'An $x$-intercept at $3$ and a hole at $(-3, 0)$, so $x = 3$',
            'An $x$-intercept at $-3$ and a hole at $(3, 0)$, so $x = \\pm 3$',
            'Two $x$-intercepts, so $x = \\pm 3$',
            'An $x$-intercept at $-3$ and a hole at $(3, 6)$, so $x = -3$',
          ],
          answer: 3,
          working: '$y = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$, $x \\ne 3$: a line with a hole at $(3, 6)$. It crosses the $x$-axis only at $x = -3$; the root $x = 3$ is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. The equation x squared minus nine, over x minus three, equals zero has the related function y equals x squared minus nine, over x minus three. What does its graph show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The numerator is x minus three, times x plus three, so the graph is the line y equals x plus three, with a hole at three, six. It crosses the x-axis only at negative three. Choice C forgets that x equals three is a hole, so that root is extraneous.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Rearrange so one side is $0$: the other side is the related function.',
            'The solutions are its $x$-intercepts, or the $x$-coordinates where the graphs of the two sides meet.',
            'A hole in the related function marks an extraneous root.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Rearrange the equation so one side is zero. The other side is the related function.', show: 'sum.0' },
        { say: 'The solutions are its x-intercepts, or the x-coordinates where the graphs of the two sides meet.', show: 'sum.1' },
        { say: 'And a hole in the related function marks an extraneous root. In part four, we use a rational equation to solve a problem about sharing a job. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
