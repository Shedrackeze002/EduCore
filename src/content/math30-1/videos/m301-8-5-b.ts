import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, numbers, tag } from './lib/m301-8-graphs.ts';

const g = plane({ x: [-7, 6], y: [-6, 6], every: 0 });

/** The line f(x) = −x + 2 and the parabola g(x) = x² − 4, with their names. */
const graphs = [
  g,
  numbers(g, 2),
  plot(g, { id: 'g', f: (x) => x * x - 4, tone: 'opp', samples: 200 }),
  plot(g, { id: 'f', f: (x) => -x + 2 }),
  tag(g, 'f-name', 6, -4, 'f', 'above', 'brand'),
  tag(g, 'g-name', 3.2, 6, 'g', 'right', 'opp'),
];

const video: Explainer = {
  id: 'm301-8-5-b',
  lessonId: 'm301-8-5',
  title: 'Composite Functions, Part 2: From Tables and Graphs',
  thumbnailTitle: 'Composition from Tables and Graphs',
  thumbnail: 'fg',
  summary: 'Evaluating composite functions by working from the inside out: f(g(1)), g(f(0)) and f(f(3)) from a table of values, and f(g(1)) and g(f(4)) from the graphs of f(x) = −x + 2 and g(x) = x² − 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.5 · Part 2', title: 'Composition from Tables and Graphs', subtitle: 'Inside first, then outside' }],
      lines: [
        { say: 'You can evaluate a composite function even when you have no equations: just a table of values, or a pair of graphs.', show: 'title' },
        { say: 'In this video, you will work from the inside out, reading one function and feeding its output into the other.' },
      ],
    },
    {
      chapter: 'From a table',
      layout: 'split',
      leftWidth: 400,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$f(x)$', '$g(x)$'],
          rows: [
            ['$-1$', '$3$', '$0$'],
            ['$0$', '$2$', '$3$'],
            ['$1$', '$0$', '$2$'],
            ['$2$', '$-1$', '$1$'],
            ['$3$', '$1$', '$-1$'],
          ],
        },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['g(1) = 2', 'f(g(1)) = f(2) = -1', 'f(0) = 2', 'g(f(0)) = g(2) = 1', 'f(3) = 1', 'f(f(3)) = f(1) = 0'],
        },
      ],
      lines: [
        { say: 'Use the table to find f of g of one.', show: 't' },
        { say: 'Inside first. In the row where x is one, g of one is two.', show: 'm.0', focus: ['t.2', 'm.0'] },
        { say: 'That output, two, is the new input. In the row where x is two, f of two is negative one. So f of g of one is negative one.', show: 'm.1', focus: ['t.3', 'm.1'] },
        { say: 'Now g of f of zero. In the row where x is zero, f of zero is two. Then in the row where x is two, g of two is one. So g of f of zero is one.', show: ['m.2', 'm.3'], focus: ['t.1', 't.3', 'm.2', 'm.3'] },
        { say: 'A function can even be composed with itself. For f of f of three: f of three is one, and f of one is zero.', show: ['m.4', 'm.5'], focus: ['t.4', 't.2', 'm.4', 'm.5'] },
      ],
    },
    {
      chapter: 'From graphs',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('fg', [
          ...graphs,
          guide(g, 'down', [1, 0], [1, -3], 'opp', true),
          guide(g, 'up', [-3, 0], [-3, 5], 'brand', true),
          dots(g, [
            { id: 'A', x: 1, y: -3, tex: '(1, -3)', tone: 'opp', place: 'below right' },
            { id: 'B', x: -3, y: 5, tex: '(-3, 5)', tone: 'brand', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\opp{g(1) = -3}', '\\brand{f(-3) = 5}', 'f(g(1)) = 5'] }],
      lines: [
        { say: 'Here, f of x equals negative x plus two is the purple line, and g of x equals x squared minus four is the orange parabola. Find f of g of one.', show: ['fg.grid', 'fg.axes', 'fg.f', 'fg.g', 'fg.f-name', 'fg.g-name'] },
        { say: 'Inside first. Go to x equals one on the parabola: its height there is negative three. So g of one is negative three.', show: ['fg.down', 'fg.A', 'm.0'], focus: ['fg.A', 'm.0'] },
        { say: 'Now use negative three as the input of f. Go to x equals negative three on the line: its height there is five. So f of negative three is five.', show: ['fg.up', 'fg.B', 'm.1'], focus: ['fg.B', 'm.1'] },
        { say: 'So f of g of one is five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The other order',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('gf', [
          ...graphs,
          guide(g, 'down', [4, 0], [4, -2], 'brand', true),
          dots(g, [
            { id: 'C', x: 4, y: -2, tex: '(4, -2)', tone: 'brand', place: 'right' },
            { id: 'D', x: -2, y: 0, tone: 'opp' },
          ]),
          tag(g, 'D-name', -2.5, 0.2, '(-2, 0)', 'above left', 'opp'),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\brand{f(4) = -2}', '\\opp{g(-2) = 0}', 'g(f(4)) = 0'] }],
      lines: [
        { say: 'Now g of f of four. This time f is inside, so start on the line.', show: ['gf.grid', 'gf.axes', 'gf.f', 'gf.g', 'gf.f-name', 'gf.g-name'] },
        { say: 'At x equals four, the line has a height of negative two. So f of four is negative two.', show: ['gf.down', 'gf.C', 'm.0'], focus: ['gf.C', 'm.0'] },
        { say: 'Then go to x equals negative two on the parabola. Its height there is zero: the parabola crosses the x-axis at negative two. So g of negative two is zero.', show: ['gf.D', 'gf.D-name', 'm.1'], focus: ['gf.D', 'gf.D-name', 'm.1'] },
        { say: 'So g of f of four is zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $g(1) = 3$, $g(3) = -2$, $f(1) = 0$ and $f(3) = 4$, find $f(g(1))$.',
          choices: ['$4$', '$0$', '$-2$', '$3$'],
          answer: 0,
          working: 'Inside first: $g(1) = 3$. Then $f(3) = 4$, so $f(g(1)) = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Given g of one equals three, g of three equals negative two, f of one equals zero, and f of three equals four, find f of g of one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Inside first: g of one is three. Then f of three is four. Choice C is g of g of one: it applies g twice.', show: 'q.answer' },
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
            'Work from the inside out: read the inner function first.',
            'Its output is the input of the outer function.',
            'On graphs, read the height of the inner graph, then use it as an $x$-value on the outer graph.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Work from the inside out: read the inner function first.', show: 'sum.0' },
        { say: 'Its output becomes the input of the outer function.', show: 'sum.1' },
        { say: 'On graphs, read the height of the inner graph, then use that number as an x-value on the outer graph. In part three, we write composite functions as equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
