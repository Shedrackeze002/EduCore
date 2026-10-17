import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import { edgeNumbers, hline, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-PI / 2 - 0.3, 2 * PI + 0.3], y: [-4.5, 2.5], xStep: PI / 4, every: 0 });
const f = (x: number) => 3 * Math.cos(2 * (x - PI / 4)) - 1;

/** The graph to read: the plane, its numbers and the curve. */
const base: Part[] = [g, edgeNumbers(g, { xs: steps(-PI / 2, 2 * PI, PI / 2), ys: [-4, -3, -2, -1, 0, 1, 2] }), plot(g, { id: 'curve', f, samples: 300 })];
const maxes = (labels: boolean) =>
  dots(g, [
    { id: 'M0', x: PI / 4, y: 2, tone: 'theta', place: 'above', tex: labels ? '\\tfrac{\\pi}{4}' : '', group: 'maxes' },
    { id: 'M1', x: (5 * PI) / 4, y: 2, tone: 'theta', place: 'above', tex: labels ? '\\tfrac{5\\pi}{4}' : '', group: 'maxes' },
  ]);
const show = ['grid', 'axes', 'curve'];

const video: Explainer = {
  id: 'm301-5-2-c',
  lessonId: 'm301-5-2',
  title: 'Transformations of Sinusoidal Functions, Part 3: Writing an Equation from a Graph',
  thumbnailTitle: 'Equations from a Graph',
  thumbnail: 'am',
  summary: 'Writing the equation of a sinusoidal graph: a and d from the maximum and minimum, b from the period, and c from a maximum (for cosine) or an upward crossing of the midline (for sine). The same graph is y = 3 cos 2(x − π/4) − 1 and y = 3 sin 2x − 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.2 · Part 3', title: 'Writing an Equation from a Graph', subtitle: 'Read a, b, c and d from the curve' }],
      lines: [
        { say: 'Given the graph of a sinusoidal function, you can write its equation by reading four features from the curve.', show: 'title' },
        { say: 'In this video, you will write one graph’s equation as a cosine function and as a sine function, and see why both are correct.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$a = \\dfrac{\\max - \\min}{2}$ and $d = \\dfrac{\\max + \\min}{2}$.',
            'Measure the period, then $b = \\dfrac{2\\pi}{\\text{period}}$.',
            'Cosine with $a > 0$: $c$ is the $x$-value of a maximum.',
            'Sine with $a > 0$: $c$ is where the curve crosses the midline going up.',
          ],
        },
      ],
      lines: [
        { say: 'Read the features in this order. First, "a" is the maximum minus the minimum, over two: half the distance between them. And d is the maximum plus the minimum, over two: the value halfway between them.', show: 'b.0' },
        { say: 'Second, measure the period, and then b is two pi over the period.', show: 'b.1' },
        { say: 'Third, the phase shift. A cosine function with a positive "a" starts its cycle at a maximum, so c is the x-value of a maximum.', show: 'b.2' },
        { say: 'A sine function with a positive "a" starts its cycle on the midline, going up. So for sine, c is where the curve crosses the midline going up.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Amplitude and midline',
      layout: 'split',
      leftWidth: 640,
      left: [figure('am', [...base, hline(g, { id: 'mid', y: -1, tone: 'adj' }), maxes(false), dots(g, [
        { id: 'N0', x: (3 * PI) / 4, y: -4, tone: 'theta', group: 'mins' },
        { id: 'N1', x: (7 * PI) / 4, y: -4, tone: 'theta', group: 'mins' },
      ])])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\max = 2,\\quad \\min = -4', 'a = \\dfrac{2 - (-4)}{2} = 3', 'd = \\dfrac{2 + (-4)}{2} = -1'] }],
      lines: [
        { say: 'Write an equation for this graph.', show: show.map((p) => `am.${p}`) },
        { say: 'The maximum value is two, and the minimum value is negative four.', show: ['am.maxes', 'am.mins', 'm.0'], focus: ['am.maxes', 'am.mins', 'm.0'] },
        { say: '"a" is two minus negative four, over two: six over two, which is three. That is the amplitude.', show: 'm.1', focus: 'm.1' },
        { say: 'd is two plus negative four, over two: negative two over two, which is negative one. So the midline is y equals negative one.', show: ['m.2', 'am.mid'], focus: ['m.2', 'am.mid'] },
      ],
    },
    {
      chapter: 'The period',
      layout: 'split',
      leftWidth: 640,
      left: [figure('pe', [...base, maxes(true), polyline(g, { id: 'per', points: [[PI / 4, 2], [(5 * PI) / 4, 2]], tone: 'theta', labels: ['\\pi'] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{maximums at } x = \\tfrac{\\pi}{4},\\ \\tfrac{5\\pi}{4}', '\\text{period} = \\tfrac{5\\pi}{4} - \\tfrac{\\pi}{4} = \\pi', 'b = \\dfrac{2\\pi}{\\pi} = 2'] }],
      lines: [
        { say: 'Next, the period. Two maximums in a row are at pi over four and five pi over four.', show: [...show.map((p) => `pe.${p}`), 'pe.maxes', 'm.0'], focus: ['pe.maxes', 'm.0'] },
        { say: 'The distance between them is five pi over four minus pi over four, which is four pi over four: pi. So the period is pi.', show: ['pe.per', 'm.1'], focus: ['pe.per', 'm.1'] },
        { say: 'Then b is two pi over the period: two pi over pi, which is two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cosine or sine',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('cs', [
          ...base,
          hline(g, { id: 'mid', y: -1, tone: 'adj' }),
          dots(g, [
            { id: 'C', x: PI / 4, y: 2, tone: 'theta', place: 'above', tex: '\\tfrac{\\pi}{4}' },
            { id: 'S', x: 0, y: -1, tone: 'good' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{cosine: } c = \\tfrac{\\pi}{4}', 'y = 3\\cos 2\\left(x - \\tfrac{\\pi}{4}\\right) - 1', '\\text{sine: } c = 0', 'y = 3\\sin 2x - 1'] }],
      lines: [
        { say: 'Last, the phase shift. For a cosine function with a positive "a", the cycle starts at a maximum. There is a maximum at pi over four, so c is pi over four.', show: [...show.map((p) => `cs.${p}`), 'cs.C', 'm.0'], focus: ['cs.C', 'm.0'] },
        { say: 'That gives y equals three cosine two, x minus pi over four, minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'For a sine function with a positive "a", the cycle starts on the midline, going up. This curve crosses the midline, y equals negative one, going up at x equals zero. So c is zero.', show: ['cs.mid', 'cs.S', 'm.2'], focus: ['cs.S', 'm.2'] },
        { say: 'That gives y equals three sine two x, minus one. Both equations describe the same graph.', show: 'm.3', focus: ['m.1', 'm.3'] },
      ],
    },
    {
      chapter: 'Many right answers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Many right answers', md: 'Shifting by a whole period, or switching between sine and cosine, describes the same graph. Any equation that matches every point is correct, so check yours at a maximum and at another point you can read.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = \\tfrac{\\pi}{4}:\\quad 3\\sin\\tfrac{\\pi}{2} - 1 = 3 - 1 = 2 \\;\\checkmark', 'x = 0:\\quad 3\\sin 0 - 1 = -1 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Shifting the cycle by a whole period, or switching between sine and cosine, describes the same graph. So there are many right answers.', show: 'tip' },
        { say: 'Any equation that matches every point is correct. Check yours at a maximum: at x equals pi over four, three sine of pi over two, minus one, is three minus one, which is two. That is the maximum.', show: 'm.0', focus: 'm.0' },
        { say: 'And at x equals zero, three sine zero, minus one, is negative one, which matches the graph too.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sinusoidal graph has a maximum of $5$ at $x = \\frac{\\pi}{2}$, and its next minimum, $-1$, at $x = \\frac{3\\pi}{2}$. Which equation fits the graph?',
          choices: ['$y = 3\\cos\\left(x + \\frac{\\pi}{2}\\right) + 2$', '$y = 3\\cos\\left(x - \\frac{\\pi}{2}\\right) + 2$', '$y = 6\\cos\\left(x - \\frac{\\pi}{2}\\right) + 2$', '$y = 3\\cos 2\\left(x - \\frac{\\pi}{2}\\right) + 2$'],
          answer: 1,
          working: '$a = \\frac{5 - (-1)}{2} = 3$ and $d = \\frac{5 + (-1)}{2} = 2$. From a maximum to the next minimum is half a period, so the period is $2\\pi$ and $b = 1$. A maximum at $x = \\frac{\\pi}{2}$ gives $c = \\frac{\\pi}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sinusoidal graph has a maximum of five at x equals pi over two, and its next minimum, negative one, at x equals three pi over two. Which equation fits the graph? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. "a" is five minus negative one, over two, which is three, and d is five plus negative one, over two, which is two. From a maximum to the next minimum is half a period, so the period is two pi and b is one. The maximum at pi over two makes c pi over two. C uses six for "a": the full distance, not half of it.', show: 'q.answer' },
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
          items: ['$a = \\frac{\\max - \\min}{2}$ and $d = \\frac{\\max + \\min}{2}$.', '$b = \\frac{2\\pi}{\\text{period}}$.', '$c$: a maximum for cosine, an upward crossing of the midline for sine. Many equations fit the same graph.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a" is the maximum minus the minimum, over two, and d is the maximum plus the minimum, over two.', show: 'sum.0' },
        { say: 'b is two pi over the period.', show: 'sum.1' },
        { say: 'And c is a maximum for cosine, or an upward crossing of the midline for sine, so many equations fit the same graph. In part four, we write an equation from a description, and check it with a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
