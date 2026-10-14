import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });

const video: Explainer = {
  id: 'm10c-5-3-b',
  lessonId: 'm10c-5-3',
  title: 'Functions, Domain and Range, Part 2: Domain and Range',
  thumbnailTitle: 'Domain and Range',
  thumbnail: 'seg',
  summary: 'The domain and range of discrete and continuous relations, written as lists, in set notation and in interval notation, and what open dots, closed dots and arrows on a graph mean.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.3 · Part 2', title: 'Domain and Range', subtitle: 'All the inputs, and all the outputs' }],
      lines: [
        { say: 'Which inputs can a function take, and which outputs can it give? These sets are called the domain and the range.', show: 'title' },
        { say: 'In this video, you will state the domain and range of relations, using lists, set notation and interval notation.' },
      ],
    },
    {
      chapter: 'Lists of values',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Domain and range', md: 'The **domain** is the set of all the input values ($x$). The **range** is the set of all the output values ($y$).' },
        { kind: 'math', id: 'm', lines: ['\\{(-1, 4), (0, 2), (2, 4), (5, -3)\\}', '\\text{Domain: } \\{-1, 0, 2, 5\\}', '\\text{Range: } \\{-3, 2, 4\\}'] },
      ],
      lines: [
        { say: 'The domain is the set of all the input values, the x values. The range is the set of all the output values, the y values.', show: 'def' },
        { say: 'For a discrete relation, list them. For these four points, the domain is negative one, zero, two and five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The range is negative three, two and four. List each value only once, even though four appears twice.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Writing intervals',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Words', 'Set notation', 'Interval'],
          rows: [
            ['$x$ is from $-2$ to $5$, inclusive', '$\\{x \\mid -2 \\le x \\le 5,\\ x \\in \\mathbb{R}\\}$', '$[-2, 5]$'],
            ['$x$ is greater than $-2$, up to $5$', '$\\{x \\mid -2 < x \\le 5,\\ x \\in \\mathbb{R}\\}$', '$(-2, 5]$'],
            ['$y$ is at least $1$', '$\\{y \\mid y \\ge 1,\\ y \\in \\mathbb{R}\\}$', '$[1, \\infty)$'],
            ['all real numbers', '$\\{x \\mid x \\in \\mathbb{R}\\}$', '$(-\\infty, \\infty)$'],
          ],
        },
      ],
      lines: [
        { say: 'For a continuous graph, the domain and range are intervals, and there are several ways to write them.' },
        { say: 'x from negative two to five, inclusive, is x such that negative two is less than or equal to x, which is less than or equal to five. In interval notation: square brackets, negative two to five.', show: 't.0', focus: 't.0' },
        { say: 'If negative two is not included, use less than, and a round bracket.', show: 't.1', focus: 't.1' },
        { say: 'y is at least one: y is greater than or equal to one, or one to infinity. Infinity always takes a round bracket.', show: 't.2', focus: 't.2' },
        { say: 'And all real numbers is negative infinity to infinity.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Dots and brackets',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('seg', [
          g,
          polyline(g, { id: 's', points: [[-3, -2], [4, 5]] }),
          dots(g, [
            { id: 'a', x: -3, y: -2, tex: '(-3,\\,-2)', place: 'left', open: true },
            { id: 'b', x: 4, y: 5, tex: '(4,\\,5)', place: 'right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Dots and brackets', md: 'Closed dot: included, $\\le$ and $[\\ ]$. Open dot: not included, $<$ and $(\\ )$. Arrow: forever, $\\infty$ with $(\\ )$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{D: } {-3} < x \\le 4 \\text{, or } (-3, 4]', '\\text{R: } {-2} < y \\le 5 \\text{, or } (-2, 5]'] },
      ],
      lines: [
        { say: 'On a graph, a closed dot means the endpoint is included: less than or equal to, and a square bracket. An open dot means it is not included: less than, and a round bracket. And an arrow means the graph goes on forever.', show: 'key' },
        { say: 'This segment starts with an open dot at negative three, negative two, and ends with a closed dot at four, five.', show: ['seg.grid', 'seg.axes', 'seg.s', 'seg.a', 'seg.b'], focus: ['seg.a', 'seg.b'] },
        { say: 'So the domain is x greater than negative three, up to and including four: a round bracket at negative three, and a square bracket at four.', show: 'm.0', focus: 'm.0' },
        { say: 'And the range is y greater than negative two, up to and including five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph starts with a closed dot at $(1, 2)$ and goes up to the right forever. What is its domain?',
          choices: ['$[1, \\infty)$', '$(1, \\infty)$', '$[2, \\infty)$', '$(-\\infty, 1]$'],
          answer: 0,
          working: 'The closed dot includes $x = 1$, and the graph goes on forever to the right: $[1, \\infty)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph starts with a closed dot at one, two, and goes up to the right forever. What is its domain? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The closed dot includes x equals one, so a square bracket, and the graph goes on forever, so infinity with a round bracket. C gives the range instead.', show: 'q.answer' },
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
          items: ['Domain: all the $x$-values. Range: all the $y$-values.', 'Discrete: list the values. Continuous: write an interval.', 'Closed dot: $\\le$ and $[\\ ]$. Open dot: $<$ and $(\\ )$. Arrow: $\\infty$ with $(\\ )$.'],
        },
      ],
      lines: [
        { say: "Let's sum up. The domain is all the x values, and the range is all the y values.", show: 'sum.0' },
        { say: 'For a discrete relation, list the values. For a continuous one, write an interval.', show: 'sum.1' },
        { say: 'A closed dot means included, with a square bracket. An open dot means not included, with a round bracket. And infinity always takes a round bracket. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
