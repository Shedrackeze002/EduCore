import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { unitCircle } from '@/video/trig.ts';
import { figure, type Part } from '@/video/solids.ts';
import { asymptotes, branches, edgeNumbers, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;

/** One branch, from −π/2 to π/2. */
const one = plane({ x: [-PI / 2 - 0.4, PI / 2 + 0.4], y: [-4.5, 4.5], xStep: PI / 4, every: 0, width: 5, height: 6 });
/** Four whole periods, from −2π to 2π. */
const all = plane({ x: [-2 * PI - 0.2, 2 * PI + 0.2], y: [-4.5, 4.5], xStep: PI / 2, every: 0, width: 11, height: 4.6 });
/** From 0 to 3π. */
const iv = plane({ x: [-0.3, 3 * PI + 0.3], y: [-4.5, 4.5], xStep: PI / 2, every: 0, width: 11, height: 3.6 });

const poles = steps(-3 * PI, 3 * PI, PI).map((x) => x + PI / 2);

/** The arm at θ, and the arm at θ + π pointing the opposite way along the same line. */
const R = 4;
const back: Part = {
  points: { Q: [R * Math.cos((215 * PI) / 180), R * Math.sin((215 * PI) / 180)] },
  items: [{ kind: 'line', id: 'arm2', from: 'O', to: 'Q', tone: 'opp', weight: 3.5, dashed: true }],
};

const video: Explainer = {
  id: 'm301-5-3-b',
  lessonId: 'm301-5-3',
  title: 'The Tangent Function, Part 2: The Graph of y = tan x',
  thumbnailTitle: 'The Graph of y = tan x',
  thumbnail: 'all',
  summary: 'The graph of y = tan x: a row of branches between vertical asymptotes at x = π/2 + nπ, with zeros at x = nπ, period π, domain x ≠ π/2 + nπ, range all real numbers and no amplitude; why the period is π, and listing the asymptotes and zeros for 0 ≤ x ≤ 3π.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.3 · Part 2', title: 'The Graph of y = tan x', subtitle: 'Branches between asymptotes' }],
      lines: [
        { say: 'As the terminal arm turns, its slope climbs from zero towards infinity, jumps, and starts again from negative infinity.', show: 'title' },
        { say: 'In this video, you will graph y equals tangent x, and state its period, asymptotes, zeros, domain and range.' },
      ],
    },
    {
      chapter: 'One branch',
      layout: 'split',
      left: [
        figure('one', [
          one,
          edgeNumbers(one, { xs: steps(-PI / 2, PI / 2, PI / 4), ys: [-4, -2, 0, 2, 4] }),
          asymptotes(one, { id: 'asym', xs: [-PI / 2, PI / 2] }),
          plot(one, { id: 'tan', f: Math.tan, from: -PI / 2 + 0.001, to: PI / 2 - 0.001, samples: 300 }),
          dots(one, [-PI / 3, -PI / 4, 0, PI / 4, PI / 3].map((x, i) => ({ id: `p${i}`, x, y: Math.tan(x), tone: 'theta' as const, group: i === 2 ? 'zero' : 'pts' }))),
        ]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$x$', '$\\tan x$'],
          rows: [
            ['$-\\frac{\\pi}{3}$', '$\\approx -1.73$'],
            ['$-\\frac{\\pi}{4}$', '$-1$'],
            ['$0$', '$0$'],
            ['$\\frac{\\pi}{4}$', '$1$'],
            ['$\\frac{\\pi}{3}$', '$\\approx 1.73$'],
          ],
        },
      ],
      lines: [
        { say: 'Start between negative pi over two and pi over two. At zero, the arm is horizontal, so tangent is zero.', show: ['one.grid', 'one.axes', 'one.zero', 't.2'], focus: ['one.zero', 't.2'] },
        { say: 'At pi over four, the arm rises one for every one across, so tangent is one. At pi over three, it is about 1.73. Negative angles give the negatives of these values.', show: ['one.pts', 't.0', 't.1', 't.3', 't.4'], focus: 'one.pts' },
        { say: 'Near pi over two, the values grow without bound, and near negative pi over two, they fall without bound. The dashed lines, x equals pi over two and x equals negative pi over two, are asymptotes.', show: 'one.asym', focus: 'one.asym' },
        { say: 'Join the points with a smooth curve. This branch rises from negative infinity, through zero, up to positive infinity.', show: 'one.tan', focus: 'one.tan' },
      ],
    },
    {
      chapter: 'Many branches',
      layout: 'center',
      main: [
        figure(
          'all',
          [
            all,
            edgeNumbers(all, { xs: steps(-2 * PI, 2 * PI, PI / 2), ys: [-4, -2, 0, 2, 4] }),
            asymptotes(all, { id: 'asym', xs: poles }),
            branches(all, { id: 'tan', f: Math.tan, poles }),
            dots(all, steps(-2 * PI, 2 * PI, PI).map((x, i) => ({ id: `z${i}`, x, y: 0, tone: 'theta' as const, group: 'zeros' }))),
          ],
          440,
        ),
      ],
      lines: [
        { say: 'The same branch repeats. Between each pair of asymptotes, the graph rises from negative infinity, through a zero, to positive infinity.', show: ['all.grid', 'all.axes', 'all.tan'] },
        { say: 'The asymptotes are at pi over two, three pi over two, negative pi over two, and so on: x equals pi over two, plus n pi.', show: 'all.asym', focus: 'all.asym' },
        { say: 'The zeros are halfway between the asymptotes, at zero, pi, two pi, negative pi and so on: x equals n pi.', show: 'all.zeros', focus: 'all.zeros' },
        { say: 'Notice that the branches repeat every pi, not every two pi.', focus: 'all.tan' },
      ],
    },
    {
      chapter: 'Why the period is pi',
      layout: 'split',
      left: [figure('why', [unitCircle({ arm: 35, armLabel: '\\theta', points: [{ deg: 35, tex: '(x, y)' }, { deg: 215, tex: '(-x, -y)', tone: 'opp' }] }), back])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\theta) = (x, y)', 'P(\\theta + \\pi) = (-x, -y)', '\\tan(\\theta + \\pi) = \\dfrac{-y}{-x} = \\dfrac{y}{x}'] }],
      lines: [
        { say: 'Why is the period pi? Here is the terminal arm of theta, through the point x, y.', show: ['why.axes', 'why.circle', 'why.arm', 'why.arc', 'why.p35', 'm.0'], focus: 'm.0' },
        { say: 'Turn it through another pi, half a turn. The new arm points the opposite way, along the same line, to the point at negative x, negative y.', show: ['why.arm2', 'why.p215', 'm.1'], focus: ['why.arm2', 'm.1'] },
        { say: 'Its tangent is negative y over negative x, which is y over x again: the same slope.', show: 'm.2', focus: 'm.2' },
        { say: 'So tangent repeats every pi. Its period is pi, or 180 degrees: half the period of sine and cosine.' },
      ],
    },
    {
      chapter: 'The features',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Feature', '$y = \\tan x$'],
          rows: [
            ['Domain', '$\\left\\{x \\mid x \\ne \\frac{\\pi}{2} + n\\pi,\\ x \\in \\mathbb{R},\\ n \\in \\mathbb{I}\\right\\}$'],
            ['Range', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
            ['Period', '$\\pi$ (or $180^\\circ$)'],
            ['Zeros', '$x = n\\pi$, $n \\in \\mathbb{I}$'],
            ['Asymptotes', '$x = \\frac{\\pi}{2} + n\\pi$, $n \\in \\mathbb{I}$'],
            ['Amplitude', 'none: there is no maximum or minimum'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the features of y equals tangent x. The domain is every real x except at the asymptotes: x cannot equal pi over two, plus n pi, where n is an integer.', show: 't.0', focus: 't.0' },
        { say: 'The range is all real numbers, because the slope of the arm can be any real number.', show: 't.1', focus: 't.1' },
        { say: 'The period is pi. The zeros are at n pi, and the asymptotes are at pi over two, plus n pi.', show: ['t.2', 't.3', 't.4'], focus: ['t.2', 't.3', 't.4'] },
        { say: 'And tangent has no amplitude, because its graph has no maximum and no minimum.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Asymptotes and zeros in an interval',
      layout: 'center',
      main: [
        figure(
          'iv',
          [
            iv,
            edgeNumbers(iv, { xs: steps(0, 3 * PI, PI / 2), ys: [-4, 0, 4] }),
            asymptotes(iv, { id: 'asym', xs: [PI / 2, (3 * PI) / 2, (5 * PI) / 2] }),
            branches(iv, { id: 'tan', f: Math.tan, poles: [PI / 2, (3 * PI) / 2, (5 * PI) / 2] }),
            dots(iv, [0, 1, 2, 3].map((n) => ({ id: `z${n}`, x: n * PI, y: 0, tone: 'theta' as const, group: 'zeros' }))),
          ],
          300,
        ),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Asymptotes: } x = \\tfrac{\\pi}{2},\\ \\tfrac{3\\pi}{2},\\ \\tfrac{5\\pi}{2}', '\\text{Zeros: } x = 0,\\ \\pi,\\ 2\\pi,\\ 3\\pi'] },
      ],
      lines: [
        { say: 'List the asymptotes and the zeros of y equals tangent x, for x from zero to three pi.', show: ['iv.grid', 'iv.axes', 'iv.tan'] },
        { say: 'Asymptotes are at odd multiples of pi over two. From zero to three pi, those are pi over two, three pi over two and five pi over two. The next one, seven pi over two, is past three pi.', show: ['iv.asym', 'm.0'], focus: ['iv.asym', 'm.0'] },
        { say: 'Zeros are at multiples of pi: zero, pi, two pi and three pi. Both ends count, because the interval includes them.', show: ['iv.zeros', 'm.1'], focus: ['iv.zeros', 'm.1'] },
      ],
    },
    {
      chapter: 'Treating tangent like sine',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = \\tan x:\\quad \\text{no amplitude},\\ \\text{range } \\mathbb{R},\\ \\text{period } \\pi'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Treating tangent like sine', md: '$y = \\tan x$ has no amplitude, and its range is all real numbers, not $-1 \\le y \\le 1$. Its period is $\\pi$, half the period of sine and cosine.' },
      ],
      lines: [
        { say: 'A common mistake is to treat tangent like sine.', show: 'm' },
        { say: 'Tangent has no amplitude, and its range is all real numbers, not negative one to one. And its period is pi, half the period of sine and cosine.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the period and range of $y = \\tan x$.',
          choices: ['Period $2\\pi$; range all real numbers', 'Period $\\pi$; range all real numbers', 'Period $\\pi$; range $-1 \\le y \\le 1$', 'Period $2\\pi$; range $-1 \\le y \\le 1$'],
          answer: 1,
          working: 'The arms at $\\theta$ and $\\theta + \\pi$ lie on the same line, so they have the same slope: the period is $\\pi$. A slope can be any real number, so the range is all real numbers.',
        },
      ],
      lines: [
        { say: 'Your turn. State the period and range of y equals tangent x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The arm at theta plus pi has the same slope as the arm at theta, so the period is pi. And a slope can be any real number, so the range is all real numbers. D treats tangent like sine.', show: 'q.answer' },
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
            '$y = \\tan x$ has period $\\pi$, zeros at $x = n\\pi$ and asymptotes at $x = \\frac{\\pi}{2} + n\\pi$, $n \\in \\mathbb{I}$.',
            'Domain: $x \\ne \\frac{\\pi}{2} + n\\pi$; range: all real numbers.',
            'No amplitude: there is no maximum or minimum.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Y equals tangent x has a period of pi, zeros at n pi, and asymptotes at pi over two, plus n pi.', show: 'sum.0' },
        { say: 'Its domain is every real x except pi over two, plus n pi, and its range is all real numbers.', show: 'sum.1' },
        { say: 'And it has no amplitude. In part three, we solve equations like tangent x equals negative two, using one solution in each branch. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
