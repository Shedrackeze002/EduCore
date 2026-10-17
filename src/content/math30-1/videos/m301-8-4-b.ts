import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { guide, numbers } from './lib/m301-8-graphs.ts';

const g = plane({ x: [-4, 4], y: [-4, 6], every: 0 });

const video: Explainer = {
  id: 'm301-8-4-b',
  lessonId: 'm301-8-4',
  title: 'Sums, Differences, Products and Quotients of Functions, Part 2: Evaluating from Tables and Graphs',
  thumbnailTitle: 'Evaluating Combined Functions',
  thumbnail: 'gr',
  summary: 'Evaluating a combined function at one value without its equation: find f and g there and combine them, from equations, from a table of values, and from graphs, where (f + g)(x) adds the heights of the two graphs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.4 · Part 2', title: 'Evaluating Combined Functions', subtitle: 'From equations, tables and graphs' }],
      lines: [
        { say: 'You do not always need the equation of a combined function to find one of its values.', show: 'title' },
        { say: 'In this video, you will evaluate combined functions at a single value, using equations, a table of values, and graphs.' },
      ],
    },
    {
      chapter: 'One value at a time',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = 2x - 3 \\qquad g(x) = x^2 + x - 4',
            'f(2) = 4 - 3 = 1 \\qquad g(2) = 4 + 2 - 4 = 2',
            '(f - g)(2) = f(2) - g(2) = 1 - 2 = -1',
            '\\text{check: } {-(2)^2} + 2 + 1 = -1\\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'To evaluate a combined function at one value, find each function’s value there, then combine them.', show: 'm.0' },
        { say: 'With f of x equals two x minus three, and g of x equals x squared plus x minus four, f of two is four minus three: one. And g of two is four plus two minus four: two.', show: 'm.1', focus: 'm.1' },
        { say: 'So f minus g, of two, is f of two minus g of two: one minus two, which is negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with the equation from part one, negative x squared plus x plus one. At x equals two, that is negative four, plus two, plus one: negative one. The same.', show: 'm.3', focus: 'm.3' },
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
            ['$-1$', '$4$', '$2$'],
            ['$0$', '$1$', '$-3$'],
            ['$1$', '$-2$', '$1$'],
            ['$2$', '$0$', '$4$'],
            ['$3$', '$5$', '$-1$'],
          ],
        },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '(f - g)(0) = 1 - (-3) = 4',
            '(fg)(3) = 5 \\times (-1) = -5',
            '\\left(\\dfrac{f}{g}\\right)(2) = \\dfrac{0}{4} = 0',
            '\\left(\\dfrac{g}{f}\\right)(2) = \\dfrac{4}{0}:\\ \\text{undefined}',
          ],
        },
      ],
      lines: [
        { say: 'Here, f and g are given by a table of values. Find f minus g, of zero.', show: 't' },
        { say: 'In the row where x is zero, f of zero is one, and g of zero is negative three. One minus negative three is four.', show: 'm.0', focus: ['t.1', 'm.0'] },
        { say: 'Now f g, of three. In the row where x is three, f is five and g is negative one. Five times negative one is negative five.', show: 'm.1', focus: ['t.4', 'm.1'] },
        { say: 'f over g, of two: f of two is zero, and g of two is four. Zero over four is zero.', show: 'm.2', focus: ['t.3', 'm.2'] },
        { say: 'But g over f, of two, would be four over zero, because f of two is zero. That is undefined, so g over f is not defined at x equals two.', show: 'm.3', focus: ['t.3', 'm.3'] },
      ],
    },
    {
      chapter: 'From graphs',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('gr', [
          g,
          numbers(g, 2),
          plot(g, { id: 'g', f: (x) => x * x - 3, tone: 'opp', samples: 200 }),
          plot(g, { id: 'f', f: (x) => x + 1 }),
          plot(g, { id: 's', f: (x) => x * x + x - 2, tone: 'muted', samples: 200 }),
          guide(g, 'up', [2, 0], [2, 4]),
          guide(g, 'down', [-1, 0], [-1, -2]),
          dots(g, [
            { id: 'G', x: 2, y: 1, tone: 'opp', group: 'at2' },
            { id: 'F', x: 2, y: 3, tone: 'brand', group: 'at2' },
            { id: 'S', x: 2, y: 4, tone: 'good' },
            { id: 'F2', x: -1, y: 0, tone: 'brand', group: 'at-1' },
            { id: 'G2', x: -1, y: -2, tone: 'opp', group: 'at-1' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\brand{f(2) = 3}', '\\opp{g(2) = 1}', '\\good{(f + g)(2) = 3 + 1 = 4}', '(f - g)(-1) = 0 - (-2) = 2'],
        },
      ],
      lines: [
        { say: 'On a graph, f plus g, of x, adds the y-coordinates of the two graphs at the same x.' },
        { say: 'Here, f of x equals x plus one is the purple line, and g of x equals x squared minus three is the orange parabola.', show: ['gr.grid', 'gr.axes', 'gr.f', 'gr.g'] },
        { say: 'At x equals two, the line is at a height of three, so f of two is three. The parabola is at a height of one, so g of two is one.', show: ['gr.up', 'gr.at2', 'm.0', 'm.1'], focus: ['gr.at2', 'm.0', 'm.1'] },
        { say: 'Add them: f plus g, of two, is four. The grey curve is the graph of f plus g, which is x squared plus x minus two, and it passes through two, four.', show: ['gr.S', 'gr.s', 'm.2'], focus: ['gr.S', 'gr.s', 'm.2'] },
        { say: 'Subtraction works the same way. At x equals negative one, the line is at zero and the parabola is at negative two. So f minus g, of negative one, is zero minus negative two: two.', show: ['gr.down', 'gr.at-1', 'm.3'], focus: ['gr.at-1', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = x^2 - 1$ and $g(x) = 2x + 5$, find $(fg)(-2)$.',
          choices: ['$-5$', '$3$', '$4$', '$-6$'],
          answer: 1,
          working: '$f(-2) = 4 - 1 = 3$ and $g(-2) = -4 + 5 = 1$, so $(fg)(-2) = 3 \\times 1 = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals x squared minus one, and g of x equals two x plus five, find f g, of negative two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. f of negative two is four minus one: three. g of negative two is negative four plus five: one. Three times one is three. Choice C adds the two values instead of multiplying them.', show: 'q.answer' },
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
            'To evaluate at one value, find $f$ and $g$ there, then combine them.',
            'From a table, read both values in the same row.',
            'On graphs, $(f + g)(x)$ adds the heights of the two graphs at the same $x$.',
            'A quotient is undefined where its denominator is $0$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To evaluate a combined function at one value, find f and g there, then combine them.', show: 'sum.0' },
        { say: 'From a table, read both values in the same row.', show: 'sum.1' },
        { say: 'On graphs, f plus g, of x, adds the heights of the two graphs at the same x.', show: 'sum.2' },
        { say: 'And a quotient is undefined wherever its denominator is zero. In part three, we find the domain of a combined function. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
