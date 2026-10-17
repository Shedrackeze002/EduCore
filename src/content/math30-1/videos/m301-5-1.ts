import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { unitCircle } from '@/video/trig.ts';
import { figure, type Part } from '@/video/solids.ts';
import { arrow, edgeNumbers, note, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
/** The unit circle's radius in the diagram; one unit up the graph's y-axis is drawn the same length, so heights match. */
const R = 1.5;
const g = plane({ name: 'g', x: [0, 6.9], y: [-1.5, 1.5], xStep: PI / 2, every: 0, width: 7.6, height: 3 * R, at: [3.5, 0] });
const gNums = edgeNumbers(g, { xs: steps(0, 2 * PI, PI / 2), ys: [-1, 1] });

/** P at the angle π/4, and a dashed line carrying its height across to the graph. */
const X = PI / 4;
const link: Part = {
  points: { 'link-a': [R * Math.cos(X), R * Math.sin(X)], 'link-b': g.map(X, Math.sin(X)) },
  items: [{ kind: 'line', id: 'link', from: 'link-a', to: 'link-b', tone: 'opp', dashed: true }],
};

const keys = [0, PI / 2, PI, (3 * PI) / 2, 2 * PI];

/** The unit circle without its radius label "1", which the first graph never shows (the thumbnail would). */
const noOne = (p: Part): Part => ({ ...p, items: p.items.filter((i) => !i.id.endsWith('one')) });

/** The four points where the unit circle meets the axes, each with its coordinates set by hand, clear of the circle and the axes. */
const C = 3;
const corners: Part = {
  points: { 'k0-at': [C, 0], 'k1-at': [0, C], 'k2-at': [-C, 0], 'k3-at': [0, -C], 'k0-t': [C + 0.15, 0.3], 'k1-t': [0.25, C + 0.15], 'k2-t': [-C - 0.15, 0.3], 'k3-t': [0.25, -C - 0.15] },
  items: [
    { kind: 'label', id: 'k0-dot', at: 'k0-at', tex: '', tone: 'opp', dot: true, group: 'k0' },
    { kind: 'label', id: 'k0-tex', at: 'k0-t', tex: '(1, 0)', tone: 'opp', place: 'above right', group: 'k0' },
    { kind: 'label', id: 'k1-dot', at: 'k1-at', tex: '', tone: 'opp', dot: true, group: 'k1' },
    { kind: 'label', id: 'k1-tex', at: 'k1-t', tex: '(0, 1)', tone: 'opp', place: 'above right', group: 'k1' },
    { kind: 'label', id: 'k2-dot', at: 'k2-at', tex: '', tone: 'opp', dot: true, group: 'k2' },
    { kind: 'label', id: 'k2-tex', at: 'k2-t', tex: '(-1, 0)', tone: 'opp', place: 'above left', group: 'k2' },
    { kind: 'label', id: 'k3-dot', at: 'k3-at', tex: '', tone: 'opp', dot: true, group: 'k3' },
    { kind: 'label', id: 'k3-tex', at: 'k3-t', tex: '(0, -1)', tone: 'opp', place: 'below right', group: 'k3' },
  ],
};

const w = plane({ x: [-PI / 2 - 0.3, 2 * PI + 0.4], y: [-1.5, 1.5], xStep: PI / 2, every: 0, width: 10, height: 3.4 });
const wNums = edgeNumbers(w, { xs: steps(-PI / 2, 2 * PI, PI / 2), ys: [-1, 0, 1] });

const video: Explainer = {
  id: 'm301-5-1',
  lessonId: 'm301-5-1',
  title: 'Graphing Sine and Cosine Functions, Part 1: From the Unit Circle to the Graphs',
  thumbnailTitle: 'Sine and Cosine Graphs',
  thumbnail: 'two',
  summary: 'Where the graphs of y = sin x and y = cos x come from: the height and the horizontal position of the point P(x) on the unit circle, plotted against the angle x in radians. Both repeat every 2π, and the cosine graph is the sine graph moved π/2 to the left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.1 · Part 1', title: 'From the Unit Circle to the Graphs', subtitle: 'The height of a point, plotted against its angle' }],
      lines: [
        { say: 'As a point travels around the unit circle, its height rises and falls in the same pattern on every lap. Sound, light, tides and alternating current all follow that same pattern.', show: 'title' },
        { say: 'In this video, you will see where the graphs of y equals sine x and y equals cosine x come from, by plotting the coordinates of a point on the unit circle against its angle.' },
      ],
    },
    {
      chapter: 'The height of a point',
      layout: 'center',
      main: [
        figure(
          'wave',
          [
            noOne(unitCircle({ name: 'u', r: R, points: [{ deg: 45, tex: 'P(x)', tone: 'brand' }], arm: 45, armLabel: 'x', drop: true })),
            g,
            gNums,
            link,
            polyline(g, { id: 'h', points: [[X, 0], [X, Math.sin(X)]], tone: 'opp' }),
            plot(g, { id: 'sin', f: Math.sin, from: 0, to: 2 * PI, samples: 200 }),
            dots(g, [{ id: 'Q', x: X, y: Math.sin(X), tone: 'opp' }]),
            dots(g, keys.map((x, i) => ({ id: `K${i}`, x, y: Math.round(Math.sin(x)), tone: 'theta' }))),
          ],
          440,
        ),
      ],
      lines: [
        { say: 'Here is the unit circle. The point P travels around it, and x is the angle it has turned through, measured in radians.', show: ['wave.u-axes', 'wave.u-circle', 'wave.u-arm', 'wave.u-arc', 'wave.u-p45'] },
        { say: 'The coordinates of P are cosine x, sine x. So sine x is the height of the point above the x-axis: the dashed orange line.', show: 'wave.u-tri', focus: 'wave.u-tri' },
        { say: 'Now plot that height against the angle. Here, x is pi over four. The graph is drawn so that the height on the graph is exactly the height on the circle.', show: ['wave.g-grid', 'wave.g-axes', 'wave.link', 'wave.g-h', 'wave.g-Q'], focus: ['wave.link', 'wave.g-h'] },
        { say: 'At an angle of zero, P is on the x-axis, so its height is zero. At pi over two, P is at the top of the circle, with a height of one.', show: ['wave.g-K0', 'wave.g-K1'], focus: ['wave.g-K0', 'wave.g-K1'] },
        { say: 'At pi, the height is zero again. At three pi over two, P is at the bottom, with a height of negative one. And at two pi, P is back where it started, at a height of zero.', show: ['wave.g-K2', 'wave.g-K3', 'wave.g-K4'], focus: ['wave.g-K2', 'wave.g-K3', 'wave.g-K4'] },
        { say: 'Join the points with a smooth curve. This is the graph of y equals sine x: the sine curve.', show: 'wave.g-sin', focus: 'wave.g-sin' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'split',
      leftWidth: 520,
      left: [figure('uc', [unitCircle({ r: C }), corners])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$\\sin x$', '$\\cos x$'],
          rows: [
            ['$0$', '$0$', '$1$'],
            ['$\\frac{\\pi}{2}$', '$1$', '$0$'],
            ['$\\pi$', '$0$', '$-1$'],
            ['$\\frac{3\\pi}{2}$', '$-1$', '$0$'],
            ['$2\\pi$', '$0$', '$1$'],
          ],
        },
      ],
      lines: [
        { say: 'Cosine x is the other coordinate of P: its horizontal position. Read both coordinates at the four points where the circle meets the axes.', show: ['uc.axes', 'uc.circle', 'uc.one'] },
        { say: 'At zero, P is at one, zero. So sine of zero is zero, and cosine of zero is one.', show: ['uc.k0', 't.0'], focus: ['uc.k0', 't.0'] },
        { say: 'At pi over two, P is at the top, at zero, one. Sine is one, and cosine is zero.', show: ['uc.k1', 't.1'], focus: ['uc.k1', 't.1'] },
        { say: 'At pi, P is at negative one, zero. Sine is zero, and cosine is negative one.', show: ['uc.k2', 't.2'], focus: ['uc.k2', 't.2'] },
        { say: 'At three pi over two, P is at the bottom, at zero, negative one. Sine is negative one, and cosine is zero.', show: ['uc.k3', 't.3'], focus: ['uc.k3', 't.3'] },
        { say: 'And at two pi, P is back at one, zero, so the values start all over again.', show: 't.4', focus: ['uc.k0', 't.4'] },
      ],
    },
    {
      chapter: 'The two graphs',
      layout: 'center',
      main: [
        figure('two', [
          w,
          wNums,
          plot(w, { id: 'cos', f: Math.cos, tone: 'opp', samples: 240 }),
          note(w, { id: 'cos-t', x: 5.6, y: 1.8, tex: 'y = \\cos x', tone: 'opp', group: 'cos' }),
          plot(w, { id: 'sin', f: Math.sin, samples: 240 }),
          note(w, { id: 'sin-t', x: 2.6, y: 1.8, tex: 'y = \\sin x', tone: 'brand', group: 'sin' }),
          arrow(w, { id: 'shift', from: [PI / 2 - 0.08, 1.28], to: [0.08, 1.28], label: '\\tfrac{\\pi}{2}', side: 'right' }),
        ]),
      ],
      lines: [
        { say: 'Now plot both rows of the table against x. The sine graph, in purple, starts at zero, rises to one at pi over two, falls through zero at pi to negative one at three pi over two, and comes back to zero at two pi.', show: ['two.grid', 'two.axes', 'two.sin'], focus: 'two.sin' },
        { say: 'The cosine graph, in orange, starts at its highest point, one. It falls through zero to negative one at pi, and climbs back to one at two pi.', show: 'two.cos', focus: 'two.cos' },
        { say: 'The two curves have exactly the same shape. The highest point of the sine curve is at pi over two, and the highest point of the cosine curve is at zero.', focus: ['two.sin', 'two.cos'] },
        { say: 'So the cosine graph is the sine graph moved pi over two to the left.', show: 'two.shift', focus: 'two.shift' },
      ],
    },
    {
      chapter: 'Periodic functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Periodic function and period', md: 'A **periodic function** repeats its values at regular intervals. The **period** is the length of the shortest interval that repeats. For $y = \\sin x$ and $y = \\cos x$, the period is $2\\pi$.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Swapping sine and cosine', md: '$P(x) = (\\cos x, \\sin x)$: cosine is the horizontal position and sine is the height. In alphabetical order, $c$ comes before $s$, just as $x$ comes before $y$.' },
      ],
      lines: [
        { say: 'After every full turn of two pi, P is back where it started, so the values repeat, and so do both graphs.', show: 'def' },
        { say: 'A function that repeats its values at regular intervals is called a periodic function. The period is the length of the shortest interval that repeats. For sine and cosine, the period is two pi.' },
        { say: 'A common mistake is to swap sine and cosine. The point P is cosine x, sine x: cosine is the horizontal position, and sine is the height.', show: 'oops' },
        { say: 'To remember the order, c comes before s in the alphabet, just as x comes before y.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $0 \\le x \\le 2\\pi$, at which value of $x$ does $y = \\sin x$ reach its minimum?',
          choices: ['$x = \\pi$', '$x = 2\\pi$', '$x = \\frac{3\\pi}{2}$', '$x = \\frac{\\pi}{2}$'],
          answer: 2,
          working: '$\\sin x$ is the height of $P(x)$ on the unit circle. $P$ is lowest, at $(0, -1)$, when $x = \\frac{3\\pi}{2}$, so the minimum value $-1$ is at $x = \\frac{3\\pi}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. For x from zero to two pi, at which value of x does y equals sine x reach its minimum? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Sine x is the height of P, and P is lowest, at zero, negative one, when x is three pi over two. A is where cosine is lowest; the sine curve crosses zero there.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['On the unit circle, $P(x) = (\\cos x, \\sin x)$: $\\sin x$ is the height of $P$ and $\\cos x$ is its horizontal position.', 'Both graphs repeat every $2\\pi$: they are periodic, with period $2\\pi$.', 'The cosine graph is the sine graph moved $\\frac{\\pi}{2}$ to the left.'] }],
      lines: [
        { say: 'Let’s sum up. On the unit circle, sine x is the height of the point P, and cosine x is its horizontal position.', show: 'sum.0' },
        { say: 'Both graphs repeat every two pi. They are periodic, with a period of two pi.', show: 'sum.1' },
        { say: 'And the cosine graph is the sine graph moved pi over two to the left. In part two, we read the domain, range, zeros and maximums of these graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
