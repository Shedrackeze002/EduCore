import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-2 * PI - 0.3, 2 * PI + 0.3], y: [-1.5, 1.5], xStep: PI / 2, every: 0, width: 11, height: 3.2 });
const nums = edgeNumbers(g, { xs: steps(-2 * PI, 2 * PI, PI / 2), ys: [-1, 0, 1] });
const sin = plot(g, { id: 'sin', f: Math.sin, samples: 300 });
const cos = plot(g, { id: 'cos', f: Math.cos, tone: 'opp', samples: 300 });

/** y = cos x from 0 to 4π, for listing its zeros in that interval. */
const h = plane({ x: [-0.3, 4 * PI + 0.3], y: [-1.5, 1.5], xStep: PI / 2, every: 0, width: 11, height: 3 });

const video: Explainer = {
  id: 'm301-5-1-b',
  lessonId: 'm301-5-1',
  title: 'Graphing Sine and Cosine Functions, Part 2: Domain, Range, Zeros and Maximums',
  thumbnailTitle: 'Domain, Range and Zeros',
  thumbnail: 'zs',
  summary: 'The domain, range, period and amplitude of y = sin x and y = cos x, where their zeros and maximums are (x = nπ and x = π/2 + 2πn for sine; x = π/2 + nπ and x = 2πn for cosine), and listing the zeros of y = cos x for 0 ≤ x ≤ 4π.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.1 · Part 2', title: 'Domain, Range, Zeros and Maximums', subtitle: 'Reading the features of the sine and cosine graphs' }],
      lines: [
        { say: 'The sine and cosine graphs go on forever in both directions, but everything about them can be read from a single cycle.', show: 'title' },
        { say: 'In this video, you will read the domain, range, amplitude, zeros and maximums of y equals sine x and y equals cosine x, and list the zeros in an interval.' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'center',
      main: [
        figure(
          'dr',
          [
            g,
            nums,
            cos,
            sin,
            polyline(g, { id: 'dom', points: [[g.x[0], 0], [g.x[1], 0]], tone: 'good' }),
            polyline(g, { id: 'ran', points: [[0, -1], [0, 1]], tone: 'adj' }),
          ],
          400,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Domain: } \\{x \\mid x \\in \\mathbb{R}\\} \\qquad \\text{Range: } \\{y \\mid -1 \\le y \\le 1,\\ y \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'Here are both graphs, now from negative two pi to two pi: sine in purple and cosine in orange. An angle can be negative, turning clockwise, and it can go past two pi, turning more than once around the circle.', show: ['dr.grid', 'dr.axes', 'dr.sin', 'dr.cos'] },
        { say: 'So x can be any real number, and the graphs go on forever in both directions. The domain of both functions is all real numbers: the whole x-axis, in green.', show: 'dr.dom', focus: 'dr.dom' },
        { say: 'The height and the horizontal position of a point on the unit circle are never more than one, and never less than negative one.', show: 'dr.ran', focus: 'dr.ran' },
        { say: 'So the range of both functions is all real y from negative one to one: the blue part of the y-axis.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Amplitude',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Amplitude and sinusoidal curve', md: 'The **amplitude** of a sinusoidal curve is half the distance between its maximum and minimum values. A **sinusoidal curve** is any graph with the shape of $y = \\sin x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{amplitude} = \\dfrac{\\max - \\min}{2} = \\dfrac{1 - (-1)}{2} = 1'] },
      ],
      lines: [
        { say: 'A sinusoidal curve is any graph with the same shape as y equals sine x. So the cosine graph is a sinusoidal curve too.', show: 'def' },
        { say: 'The amplitude of a sinusoidal curve is half the distance between its maximum and minimum values.' },
        { say: 'For both graphs, the maximum is one and the minimum is negative one. The distance between them is two, so the amplitude is half of two: one.', show: 'm', focus: 'm' },
        { say: 'You can think of the amplitude as how far the curve rises above its middle, or falls below it. Here the middle is the x-axis, and the curve goes one unit above it and one unit below it.' },
      ],
    },
    {
      chapter: 'Zeros and maximums of sine',
      layout: 'center',
      main: [
        figure(
          'zs',
          [
            g,
            nums,
            sin,
            dots(g, [-2, -1, 0, 1, 2].map((n) => ({ id: `z${n + 2}`, x: n * PI, y: 0, tone: 'adj' as const, group: 'zeros' }))),
            dots(g, [-1, 0].map((n, i) => ({ id: `t${i}`, x: PI / 2 + 2 * PI * n, y: 1, tone: 'theta' as const, group: 'maxes' }))),
          ],
          400,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Zeros: } x = n\\pi \\qquad \\text{Maximums: } x = \\frac{\\pi}{2} + 2\\pi n'] },
      ],
      lines: [
        { say: 'A zero of a function is an x-value where y is zero: a place where the graph meets the x-axis.', show: ['zs.grid', 'zs.axes', 'zs.sin'] },
        { say: 'The sine graph crosses the x-axis at zero, at pi and at two pi, and also at negative pi and negative two pi: at every multiple of pi.', show: 'zs.zeros', focus: 'zs.zeros' },
        { say: 'So the zeros of y equals sine x are x equals n pi, where n is any integer.', show: 'm', focus: 'm' },
        { say: 'Its maximums are at pi over two, and then every two pi before or after that: x equals pi over two, plus two pi n.', show: 'zs.maxes', focus: ['zs.maxes', 'm'] },
      ],
    },
    {
      chapter: 'Zeros and maximums of cosine',
      layout: 'center',
      main: [
        figure(
          'zc',
          [
            g,
            nums,
            cos,
            dots(g, [-2, -1, 0, 1].map((n) => ({ id: `z${n + 2}`, x: PI / 2 + n * PI, y: 0, tone: 'adj' as const, group: 'zeros' }))),
            dots(g, [-1, 0, 1].map((n) => ({ id: `t${n + 1}`, x: 2 * PI * n, y: 1, tone: 'theta' as const, group: 'maxes' }))),
          ],
          400,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Zeros: } x = \\frac{\\pi}{2} + n\\pi \\qquad \\text{Maximums: } x = 2\\pi n'] },
      ],
      lines: [
        { say: 'The cosine graph crosses the x-axis halfway between the zeros of sine: at pi over two and three pi over two, and at negative pi over two and negative three pi over two. Its zeros are pi apart.', show: ['zc.grid', 'zc.axes', 'zc.cos', 'zc.zeros'], focus: 'zc.zeros' },
        { say: 'So the zeros of y equals cosine x are x equals pi over two, plus n pi.', show: 'm', focus: 'm' },
        { say: 'Its maximums are at zero, two pi and negative two pi: x equals two pi n.', show: 'zc.maxes', focus: ['zc.maxes', 'm'] },
      ],
    },
    {
      chapter: 'All the features',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$y = \\sin x$', '$y = \\cos x$'],
          rows: [
            ['Domain', '$\\{x \\mid x \\in \\mathbb{R}\\}$', '$\\{x \\mid x \\in \\mathbb{R}\\}$'],
            ['Range', '$\\{y \\mid -1 \\le y \\le 1,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid -1 \\le y \\le 1,\\ y \\in \\mathbb{R}\\}$'],
            ['Period, amplitude', '$2\\pi$, $1$', '$2\\pi$, $1$'],
            ['Zeros', '$x = n\\pi$', '$x = \\frac{\\pi}{2} + n\\pi$'],
            ['Maximums', '$x = \\frac{\\pi}{2} + 2\\pi n$', '$x = 2\\pi n$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all the features together. Both functions have a domain of all real numbers, and a range from negative one to one.', show: ['t.0', 't.1'] },
        { say: 'Both have a period of two pi, and an amplitude of one.', show: 't.2', focus: 't.2' },
        { say: 'They differ only in where their zeros and maximums are, because the cosine graph is the sine graph moved pi over two to the left.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Zeros in an interval',
      layout: 'center',
      main: [
        figure(
          'iv',
          [
            h,
            edgeNumbers(h, { xs: steps(0, 4 * PI, PI / 2), ys: [-1, 0, 1] }),
            plot(h, { id: 'cos', f: Math.cos, from: 0, to: 4 * PI, tone: 'opp', samples: 300 }),
            dots(h, [0, 1, 2, 3].map((n) => ({ id: `z${n}`, x: PI / 2 + n * PI, y: 0, tone: 'adj' as const, group: 'zeros' }))),
          ],
          290,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Zeros of } y = \\cos x,\\ 0 \\le x \\le 4\\pi', '\\cos x = 0:\\quad x = \\dfrac{\\pi}{2} + n\\pi', 'x = \\dfrac{\\pi}{2},\\ \\dfrac{3\\pi}{2},\\ \\dfrac{5\\pi}{2},\\ \\dfrac{7\\pi}{2}'] },
      ],
      lines: [
        { say: 'Determine the zeros of y equals cosine x, for x from zero to four pi.', show: ['m.0', 'iv.grid', 'iv.axes', 'iv.cos'], focus: 'm.0' },
        { say: 'Cosine x is zero where the point P is at the top or the bottom of the unit circle. That happens at pi over two, and then every pi after that: x equals pi over two, plus n pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Now list the ones from zero to four pi: pi over two, three pi over two, five pi over two and seven pi over two. The next one, nine pi over two, is past four pi.', show: ['m.2', 'iv.zeros'], focus: ['m.2', 'iv.zeros'] },
        { say: 'The graph agrees: in this interval, the curve crosses the x-axis exactly four times.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the $x$-values of the maximums of $y = \\cos x$ for $0 \\le x \\le 4\\pi$.',
          choices: ['$x = \\pi,\\ 3\\pi$', '$x = 0,\\ 2\\pi,\\ 4\\pi$', '$x = \\frac{\\pi}{2},\\ \\frac{5\\pi}{2}$', '$x = 0,\\ \\pi,\\ 2\\pi,\\ 3\\pi,\\ 4\\pi$'],
          answer: 1,
          working: 'The maximums of $y = \\cos x$ are at $x = 2\\pi n$, where $P(x)$ is at $(1, 0)$. From $0$ to $4\\pi$ that gives $x = 0$, $2\\pi$ and $4\\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the x-values of the maximums of y equals cosine x, for x from zero to four pi. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Cosine has its maximums at x equals two pi n, so from zero to four pi they are at zero, two pi and four pi. C gives the maximums of sine, not cosine.', show: 'q.answer' },
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
            'Sine and cosine: domain all real numbers, range $-1 \\le y \\le 1$, period $2\\pi$, amplitude $1$.',
            'Zeros: $\\sin x = 0$ at $x = n\\pi$; $\\cos x = 0$ at $x = \\frac{\\pi}{2} + n\\pi$.',
            'Maximums: sine at $x = \\frac{\\pi}{2} + 2\\pi n$; cosine at $x = 2\\pi n$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sine and cosine both have a domain of all real numbers, a range from negative one to one, a period of two pi and an amplitude of one.', show: 'sum.0' },
        { say: 'Sine is zero at x equals n pi, and cosine is zero at pi over two, plus n pi.', show: 'sum.1' },
        { say: 'Sine has its maximums at pi over two, plus two pi n, and cosine at two pi n. In part three, we stretch the graphs vertically, and find the amplitude of y equals "a" sine x. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
