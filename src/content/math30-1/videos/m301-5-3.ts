import type { Explainer } from '@/video/script.ts';
import { plane, plot } from '@/video/graph.ts';
import { unitCircle } from '@/video/trig.ts';
import { figure, type Part } from '@/video/solids.ts';
import { edgeNumbers, vline } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const R = 4;
const at = (deg: number): [number, number] => [R * Math.cos((deg * PI) / 180), R * Math.sin((deg * PI) / 180)];

/** Terminal arms from horizontal to vertical, getting steeper. */
const arms: Part = {
  points: { O: [0, 0], E0: at(0), E45: at(45), E80: at(80), E90: at(90) },
  items: [
    { kind: 'line', id: 'h', from: 'O', to: 'E0', tone: 'good', weight: 5 },
    { kind: 'line', id: 'a45', from: 'O', to: 'E45', tone: 'brand', weight: 3.5 },
    { kind: 'line', id: 'a80', from: 'O', to: 'E80', tone: 'brand', weight: 3.5 },
    { kind: 'line', id: 'v', from: 'O', to: 'E90', tone: 'bad', weight: 5, dashed: true },
  ],
};

/** The point P(−8/17, 15/17). */
const ex = (-8 / 17) * R;
const P: Part = {
  points: { Pt: [ex, (15 / 17) * R] },
  items: [{ kind: 'label', id: 'Pd', at: 'Pt', tex: 'P', tone: 'brand', dot: true, place: 'above left' }],
};
const DEG = (Math.acos(-8 / 17) * 180) / PI;

/** A unit circle without its radius label "1", which these scenes never show (the thumbnail would). */
const noOne = (p: Part): Part => ({ ...p, items: p.items.filter((i) => i.id !== 'one') });

const g = plane({ x: [-PI / 2 - 0.6, PI / 2 + 0.6], y: [-4.5, 4.5], every: 0, width: 5, height: 6 });

const video: Explainer = {
  id: 'm301-5-3',
  lessonId: 'm301-5-3',
  title: 'The Tangent Function, Part 1: Tangent on the Unit Circle',
  thumbnailTitle: 'Tangent on the Unit Circle',
  thumbnail: 'sl',
  summary: 'Tangent on the unit circle: tan θ = sin θ / cos θ = y / x, the slope of the terminal arm. It is 0 when the arm is horizontal and undefined when the arm is vertical, which gives the graph of y = tan x its asymptotes. Worked example: P(−8/17, 15/17) gives tan θ = −15/8.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.3 · Part 1', title: 'Tangent on the Unit Circle', subtitle: 'The slope of the terminal arm' }],
      lines: [
        { say: 'Sine and cosine always stay between negative one and one. But the tangent of an angle can be any real number at all.', show: 'title' },
        { say: 'In this video, you will see tangent as the slope of the terminal arm on the unit circle, and find out where it is zero and where it is undefined.' },
      ],
    },
    {
      chapter: 'Tangent as a slope',
      layout: 'split',
      left: [figure('sl', [noOne(unitCircle({ arm: 40, armLabel: '\\theta', drop: true, sides: { x: 'x', y: 'y' }, points: [{ deg: 40, tex: 'P(\\theta)' }] }))])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['P(\\theta) = (x, y) = (\\cos\\theta, \\sin\\theta)', '\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{y}{x}', '\\text{slope of the arm} = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac{y}{x}'],
        },
      ],
      lines: [
        { say: 'Here is the point P of theta, at x, y, on the unit circle. Its x-coordinate is cosine theta, and its y-coordinate is sine theta.', show: ['sl.axes', 'sl.circle', 'sl.arm', 'sl.arc', 'sl.pts', 'm.0'], focus: 'm.0' },
        { say: 'Tangent theta is sine theta over cosine theta. So it is y over x.', show: ['sl.tri', 'sl.x', 'sl.y', 'm.1'], focus: ['sl.x', 'sl.y', 'm.1'] },
        { say: 'Now look at the terminal arm: the line from the origin through P. To get from the origin to P, it rises y while it runs x. So its slope, rise over run, is y over x too.', show: 'm.2', focus: ['sl.arm', 'm.2'] },
        { say: 'So tangent theta is the slope of the terminal arm.' },
      ],
    },
    {
      chapter: 'Zero and undefined',
      layout: 'split',
      left: [figure('zu', [noOne(unitCircle({})), arms])],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$\\theta = 0, \\pi, 2\\pi, \\ldots$: the arm is horizontal, $y = 0$, so $\\tan\\theta = 0$.',
            'As $\\theta$ approaches $\\frac{\\pi}{2}$ from below, the arm gets steeper and $\\tan\\theta$ grows without bound.',
            '$\\theta = \\frac{\\pi}{2}, \\frac{3\\pi}{2}, \\ldots$: the arm is vertical, $x = 0$, so $\\tan\\theta$ is undefined.',
          ],
        },
      ],
      lines: [
        { say: 'When theta is zero, pi, two pi and so on, the arm lies along the x-axis. It is horizontal, y is zero, and so tangent theta is zero.', show: ['zu.axes', 'zu.circle', 'zu.h', 'b.0'], focus: 'zu.h' },
        { say: 'As theta grows, the arm gets steeper. At pi over four, it rises one for every one across, so tangent is one. At pi over three, tangent is about 1.73.', show: 'zu.a45', focus: 'zu.a45' },
        { say: 'Closer to pi over two, the arm is almost vertical, and the slope is huge. At 1.57 radians, just below pi over two, tangent is more than 1,200. As theta approaches pi over two from below, tangent theta grows without bound.', show: ['zu.a80', 'b.1'], focus: 'zu.a80' },
        { say: 'At pi over two, three pi over two and so on, the arm is vertical. Now x is zero, and dividing by zero is undefined. A vertical line has no slope, so tangent theta is undefined.', show: ['zu.v', 'b.2'], focus: 'zu.v' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'split',
      left: [figure('ex', [noOne(unitCircle({ arm: DEG, armLabel: '\\theta', drop: true, sides: { x: '-\\tfrac{8}{17}', y: '\\tfrac{15}{17}' } })), P])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\left(-\\tfrac{8}{17}, \\tfrac{15}{17}\\right)', '\\tan\\theta = \\dfrac{y}{x} = \\dfrac{15/17}{-8/17}', '= \\dfrac{15}{-8} = -\\dfrac{15}{8}'] }],
      lines: [
        { say: 'The terminal arm of theta meets the unit circle at P, negative eight seventeenths, fifteen seventeenths. Determine tangent theta.', show: ['ex.axes', 'ex.circle', 'ex.arm', 'ex.arc', 'ex.Pd', 'm.0'], focus: 'm.0' },
        { say: 'Tangent theta is y over x: fifteen seventeenths, divided by negative eight seventeenths.', show: ['ex.tri', 'ex.x', 'ex.y', 'm.1'], focus: ['ex.x', 'ex.y', 'm.1'] },
        { say: 'The seventeenths cancel, leaving fifteen over negative eight. So tangent theta is negative fifteen eighths.', show: 'm.2', focus: 'm.2' },
        { say: 'That makes sense. The arm points up and to the left, so it slopes downward from left to right, and its slope is negative.', focus: 'ex.arm' },
      ],
    },
    {
      chapter: 'Asymptotes',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('as', [
          g,
          edgeNumbers(g, { xs: [-PI / 2, 0, PI / 2], ys: [-4, -2, 0, 2, 4] }),
          vline(g, { id: 'L', x: -PI / 2, tone: 'bad', group: 'asym' }),
          vline(g, { id: 'Rt', x: PI / 2, tone: 'bad', group: 'asym' }),
          plot(g, { id: 'tan', f: Math.tan, from: -PI / 2 + 0.001, to: PI / 2 - 0.001, samples: 300 }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Asymptote', md: 'A line that a graph approaches more and more closely without reaching it. The graph of $y = \\tan x$ has a vertical asymptote at every value where $\\cos x = 0$.' },
      ],
      lines: [
        { say: 'Tangent is undefined wherever cosine is zero, so its graph can have no point there. Instead, the graph has an asymptote.', show: ['as.grid', 'as.axes', 'as.tan'] },
        { say: 'As x gets closer and closer to pi over two, the graph shoots up beside the dashed line x equals pi over two, but never touches it. On the left, it falls beside x equals negative pi over two.', show: 'as.asym', focus: 'as.asym' },
        { say: 'An asymptote is a line that a graph approaches more and more closely, without reaching it. The graph of y equals tangent x has a vertical asymptote at every value where cosine x is zero.', show: 'def' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The terminal arm of $\\theta$ meets the unit circle at $P\\left(\\frac{3}{5}, -\\frac{4}{5}\\right)$. Determine $\\tan\\theta$.',
          choices: ['$-\\dfrac{3}{4}$', '$\\dfrac{4}{3}$', '$-\\dfrac{4}{5}$', '$-\\dfrac{4}{3}$'],
          answer: 3,
          working: '$\\tan\\theta = \\dfrac{y}{x} = \\dfrac{-4/5}{3/5} = -\\dfrac{4}{3}$, the slope of the terminal arm.',
        },
      ],
      lines: [
        { say: 'Your turn. The terminal arm of theta meets the unit circle at P, three fifths, negative four fifths. Determine tangent theta. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Tangent theta is y over x: negative four fifths divided by three fifths, which is negative four thirds. A divides x by y instead.', show: 'q.answer' },
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
          items: ['$\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta} = \\dfrac{y}{x}$: the slope of the terminal arm.', '$\\tan\\theta = 0$ when the arm is horizontal; it is undefined when the arm is vertical ($x = 0$).', 'Where $\\cos x = 0$, the graph of $y = \\tan x$ has a vertical asymptote.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Tangent theta is sine theta over cosine theta, which is y over x: the slope of the terminal arm.', show: 'sum.0' },
        { say: 'It is zero when the arm is horizontal, and undefined when the arm is vertical, where x is zero.', show: 'sum.1' },
        { say: 'And wherever cosine x is zero, the graph of y equals tangent x has a vertical asymptote. In part two, we draw the graph of y equals tangent x, and read its period, domain and range. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
