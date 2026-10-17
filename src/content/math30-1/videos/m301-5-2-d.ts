import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, hline, steps } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const g = plane({ x: [-0.3, 5 * PI + 0.3], y: [-1.8, 7.8], xStep: PI / 2, every: 0, width: 9, height: 6 });
const f = (x: number) => 4 * Math.sin(0.5 * (x - PI / 2)) + 3;

const video: Explainer = {
  id: 'm301-5-2-d',
  lessonId: 'm301-5-2',
  title: 'Transformations of Sinusoidal Functions, Part 4: Writing an Equation from a Description',
  thumbnailTitle: 'Equations from a Description',
  thumbnail: 'ck',
  summary: 'Writing the equation of a sine function with an amplitude of 4, a period of 4π, a phase shift of π/2 to the right and a vertical displacement of 3 up, y = 4 sin ½(x − π/2) + 3, checking it with a sketch of one cycle, and why b is 2π over the period, not the period itself.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.2 · Part 4', title: 'Writing an Equation from a Description', subtitle: 'From a list of features to $y = a\\sin b(x - c) + d$' }],
      lines: [
        { say: 'Sometimes you are not given a graph at all, just a list of its features: an amplitude, a period and a shift.', show: 'title' },
        { say: 'In this video, you will turn a description like that into an equation, and then sketch the graph to check it.' },
      ],
    },
    {
      chapter: 'From characteristics',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A sine function has an amplitude of $4$, a period of $4\\pi$, a phase shift of $\\frac{\\pi}{2}$ to the right and a vertical displacement of $3$ up. Write its equation.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['a = 4,\\quad d = 3,\\quad c = \\tfrac{\\pi}{2}', 'b = \\dfrac{2\\pi}{\\text{period}} = \\dfrac{2\\pi}{4\\pi} = \\dfrac{1}{2}', 'y = 4\\sin\\tfrac{1}{2}\\left(x - \\tfrac{\\pi}{2}\\right) + 3'] },
      ],
      lines: [
        { say: 'A sine function has an amplitude of four, a period of four pi, a phase shift of pi over two to the right, and a vertical displacement of three up. Write its equation.', show: 'q' },
        { say: 'Three of the parameters come straight from the description. The amplitude is four, so "a" is four. Three up makes d three. And pi over two to the right makes c positive pi over two.', show: 'm.0', focus: 'm.0' },
        { say: 'But the period is not b. You have to work out b from the period: b is two pi over the period, so two pi over four pi, which is one half.', show: 'm.1', focus: 'm.1' },
        { say: 'Put them together: y equals four sine one half, x minus pi over two, plus three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with a sketch',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('ck', [
          g,
          edgeNumbers(g, { xs: steps(0, 5 * PI, PI), ys: [-1, 1, 3, 5, 7] }),
          hline(g, { id: 'mid', y: 3, tone: 'adj' }),
          plot(g, { id: 'curve', f, from: 0, samples: 300 }),
          dots(g, [
            { id: 'S', x: PI / 2, y: 3, tone: 'theta' },
            { id: 'M', x: (3 * PI) / 2, y: 7, tone: 'theta', group: 'quarter' },
            { id: 'H', x: (5 * PI) / 2, y: 3, tone: 'theta', group: 'quarter' },
            { id: 'N', x: (7 * PI) / 2, y: -1, tone: 'theta', group: 'quarter' },
            { id: 'E', x: (9 * PI) / 2, y: 3, tone: 'theta' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{midline } y = 3', '\\max = 7,\\quad \\min = -1', '\\text{start: } \\left(\\tfrac{\\pi}{2}, 3\\right)', '\\text{end: } \\left(\\tfrac{9\\pi}{2}, 3\\right)', '\\text{max: } \\left(\\tfrac{3\\pi}{2}, 7\\right)', '\\text{min: } \\left(\\tfrac{7\\pi}{2}, -1\\right)'],
        },
      ],
      lines: [
        { say: 'To check, sketch the graph. The midline is y equals three. The maximum is three plus four, which is seven, and the minimum is three minus four, which is negative one.', show: ['ck.grid', 'ck.axes', 'ck.mid', 'm.0', 'm.1'], focus: ['ck.mid', 'm.0', 'm.1'] },
        { say: 'A sine cycle starts on the midline, going up. Because of the phase shift, this one starts at x equals pi over two.', show: ['ck.S', 'm.2'], focus: ['ck.S', 'm.2'] },
        { say: 'One period is four pi, so the cycle ends at pi over two plus four pi, which is nine pi over two.', show: ['ck.E', 'm.3'], focus: ['ck.E', 'm.3'] },
        { say: 'Each quarter of the cycle is pi long. So a quarter of the way along, at three pi over two, is the maximum. Halfway, at five pi over two, the curve is back on the midline. And at seven pi over two, it reaches the minimum.', show: ['ck.quarter', 'm.4', 'm.5'], focus: ['ck.quarter', 'm.4', 'm.5'] },
        { say: 'Join the points with a smooth curve. Every feature in the description is there, so the equation is right.', show: 'ck.curve', focus: 'ck.curve' },
      ],
    },
    {
      chapter: 'Typing it, and a mistake',
      layout: 'center',
      main: [
        { kind: 'text', id: 't', size: 'md', md: 'To type it in your lesson, put the whole angle inside the brackets after sin:' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\texttt{4sin((1/2)(x - pi/2)) + 3}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the period as b', md: 'With $b = 4\\pi$, the period would be $\\frac{2\\pi}{4\\pi} = \\frac{1}{2}$, far too short. Always work out $b = \\frac{2\\pi}{\\text{period}}$.' },
      ],
      lines: [
        { say: 'When you type this equation in your lesson, put the whole angle, one half times x minus pi over two, inside the brackets after sin, as shown here.', show: ['t', 'm'] },
        { say: 'A common mistake is to use the period as b. If b were four pi, the period would be two pi over four pi, which is one half: far too short.', show: 'oops' },
        { say: 'So always work out b as two pi over the period.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cosine function has an amplitude of $2$, a period of $\\pi$, a phase shift of $\\frac{\\pi}{3}$ to the left and a vertical displacement of $1$ down. Which is its equation?',
          choices: ['$y = 2\\cos 2\\left(x + \\frac{\\pi}{3}\\right) - 1$', '$y = 2\\cos \\pi\\left(x + \\frac{\\pi}{3}\\right) - 1$', '$y = 2\\cos 2\\left(x - \\frac{\\pi}{3}\\right) - 1$', '$y = 2\\cos \\frac{1}{2}\\left(x + \\frac{\\pi}{3}\\right) - 1$'],
          answer: 0,
          working: '$a = 2$ and $d = -1$. $b = \\frac{2\\pi}{\\pi} = 2$. A shift of $\\frac{\\pi}{3}$ to the left means $c = -\\frac{\\pi}{3}$, so the bracket is $\\left(x + \\frac{\\pi}{3}\\right)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cosine function has an amplitude of two, a period of pi, a phase shift of pi over three to the left, and a vertical displacement of one down. Which is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b is two pi over pi, which is two. Left pi over three means c is negative pi over three, so the bracket is x plus pi over three. And one down makes d negative one. B uses the period, pi, as b.', show: 'q.answer' },
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
          items: ['$a$, $c$ and $d$ come straight from the description; $b = \\frac{2\\pi}{\\text{period}}$.', 'A shift of $k$ to the right gives $(x - k)$; to the left, $(x + k)$.', 'Check with a sketch: midline, maximum, minimum and where the cycle starts.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a", c and d come straight from the description, but b is two pi over the period.', show: 'sum.0' },
        { say: 'A shift of k to the right gives x minus k in the bracket, and a shift of k to the left gives x plus k.', show: 'sum.1' },
        { say: 'And check your equation with a sketch: the midline, the maximum, the minimum, and where the cycle starts. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
