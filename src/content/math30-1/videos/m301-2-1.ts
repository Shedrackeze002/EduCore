import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-1.5, 10], y: [-0.5, 4], every: 2 });
const root = (x: number) => Math.sqrt(Math.max(0, x));

/** y = √x and its four key points. */
const parts = [
  g,
  plot(g, { id: 'curve', f: root, from: 0, to: 10, samples: 300 }),
  dots(g, [
    { id: 'P0', x: 0, y: 0, tex: '(0, 0)', tone: 'opp', place: 'above left' },
    { id: 'P1', x: 1, y: 1, tex: '(1, 1)', tone: 'opp', place: 'below right' },
    { id: 'P2', x: 4, y: 2, tex: '(4, 2)', tone: 'opp', place: 'below right' },
    { id: 'P3', x: 9, y: 3, tex: '(9, 3)', tone: 'opp', place: 'below' },
  ]),
];

const video: Explainer = {
  id: 'm301-2-1',
  lessonId: 'm301-2-1',
  title: 'Radical Functions and Transformations, Part 1: The Square Root Function',
  thumbnailTitle: 'The Square Root Function',
  thumbnail: 'keys',
  summary: 'What a radical function is, the graph of y = √x from its key points (0, 0), (1, 1), (4, 2) and (9, 3), and why its domain is x ≥ 0 and its range is y ≥ 0. Part 2 transforms the graph with y = a√(b(x − h)) + k.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.1 · Part 1', title: 'The Square Root Function', subtitle: 'Every radical graph starts from $y = \\sqrt{x}$' }],
      lines: [
        { say: 'In shallow water, the speed of a wave can be modelled by v equals the square root of 9.8 d, where d is the depth in metres. Pendulums, falling objects and stopping distances follow square root formulas too.', show: 'title' },
        { say: 'In this video, you will meet the one curve behind all of them, y equals the square root of x: its key points, its graph, and its domain and range.' },
      ],
    },
    {
      chapter: 'Radical functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Radical function', md: 'A function with the independent variable under a radical sign, such as $y = \\sqrt{x}$ or $y = 2\\sqrt{3 - x} + 1$. In this unit the radical is a square root.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['v = \\sqrt{9.8d}', 'd = 10:\\quad v = \\sqrt{98} \\approx 9.9\\text{ m/s}'] },
      ],
      lines: [
        { say: 'A radical function has its independent variable under a radical sign. Y equals the square root of x is one. So is y equals two times the square root of three minus x, plus one. In this unit, the radical is always a square root.', show: 'def' },
        { say: 'The wave formula is a radical function of the depth, d.', show: 'm.0', focus: 'm.0' },
        { say: 'In water ten metres deep, v is the square root of 9.8 times ten, which is the square root of 98: about 9.9 metres per second.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Key points',
      layout: 'split',
      leftWidth: 700,
      left: [figure('keys', parts)],
      right: [{ kind: 'table', id: 't', head: ['$x$', '$y = \\sqrt{x}$'], rows: [['$0$', '$0$'], ['$1$', '$1$'], ['$4$', '$2$'], ['$9$', '$3$']] }],
      lines: [
        { say: 'To graph y equals the square root of x, choose x-values that are perfect squares, so that the square roots come out exactly.', show: ['keys.grid', 'keys.axes'] },
        { say: 'The square root of zero is zero, so the graph starts at the origin, zero, zero. The square root of one is one.', show: ['t.0', 't.1', 'keys.P0', 'keys.P1'], focus: ['keys.P0', 'keys.P1'] },
        { say: 'The square root of four is two, and the square root of nine is three. These four key points are worth remembering.', show: ['t.2', 't.3', 'keys.P2', 'keys.P3'], focus: ['keys.P2', 'keys.P3'] },
        { say: 'Join them with a smooth curve. It starts at the endpoint, zero, zero, and rises more and more slowly: to go up one more unit, x has to jump from one to four, and then from four all the way to nine.', show: 'keys.curve', focus: 'keys.curve' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('dr', [
          ...parts,
          polyline(g, { id: 'dom', points: [[0, 0], [10, 0]], tone: 'good' }),
          polyline(g, { id: 'ran', points: [[0, 0], [0, 4]], tone: 'adj' }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'note', tone: 'key', title: 'No real square root', md: '$\\sqrt{-4}$ is not a real number: no real number squared is negative.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Domain: } \\{x \\mid x \\ge 0,\\ x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'What is the square root of negative four? Two squared is four, and negative two squared is also four. No real number squared gives a negative number, so the square root of a negative number is not real.', show: ['dr.grid', 'dr.axes', 'dr.curve', 'note'] },
        { say: 'So x can only be zero or positive. The domain is all real x greater than or equal to zero: the green part of the x-axis.', show: ['m.0', 'dr.dom'], focus: ['m.0', 'dr.dom'] },
        { say: 'The square root sign always means the principal square root, which is never negative. So the range is all real y greater than or equal to zero: the blue part of the y-axis.', show: ['m.1', 'dr.ran'], focus: ['m.1', 'dr.ran'] },
        { say: 'In interval notation, both are written as a square bracket at zero, to infinity.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 = 9:\\quad x = \\pm 3', '\\sqrt{9} = 3,\\ \\text{ not } \\pm 3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Writing √9 = ±3', md: 'The equation $x^2 = 9$ has two solutions, $3$ and $-3$. The symbol $\\sqrt{9}$ means only the principal square root, $3$. That is why $y = \\sqrt{x}$ is a function, and why its graph never goes below the $x$-axis.' },
      ],
      lines: [
        { say: 'Be careful with plus or minus. The equation x squared equals nine has two solutions, three and negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'But the symbol, the square root of nine, means only the principal square root: three.', show: 'm.1', focus: 'm.1' },
        { say: 'That is why y equals the square root of x is a function, with one output for each input, and why its graph never goes below the x-axis.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is **not** on the graph of $y = \\sqrt{x}$?',
          choices: ['$(16, 4)$', '$(0.25, 0.5)$', '$(4, -2)$', '$(0, 0)$'],
          answer: 2,
          working: '$\\sqrt{4}$ is the principal square root, $2$, never $-2$: the range is $y \\ge 0$. The others work: $\\sqrt{16} = 4$, $\\sqrt{0.25} = 0.5$ and $\\sqrt{0} = 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is not on the graph of y equals the square root of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The square root of four is two, never negative two, because the range is y greater than or equal to zero. B is on the graph: 0.5 squared is 0.25, so the square root of 0.25 is 0.5.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A radical function has its independent variable under a radical sign.', '$y = \\sqrt{x}$ starts at $(0, 0)$ and passes through $(1, 1)$, $(4, 2)$ and $(9, 3)$.', 'Domain $\\{x \\mid x \\ge 0,\\ x \\in \\mathbb{R}\\}$; range $\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}$.'] }],
      lines: [
        { say: 'Let’s sum up. A radical function has its independent variable under a radical sign.', show: 'sum.0' },
        { say: 'The graph of y equals the square root of x starts at the endpoint zero, zero, and passes through one, one; four, two; and nine, three.', show: 'sum.1' },
        { say: 'Its domain is x greater than or equal to zero, and its range is y greater than or equal to zero. In part two, we stretch, reflect and translate this graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
