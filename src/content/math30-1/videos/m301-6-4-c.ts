import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { edgeNumbers, rad, readUp } from './lib/m301-6-figures.ts';

const g = plane({ x: [0, 360], y: [-1.5, 1.5], xStep: 30, yStep: 0.5, every: 0, width: 8, height: 4.4 });

const video: Explainer = {
  id: 'm301-6-4-c',
  lessonId: 'm301-6-4',
  title: 'Solving Trigonometric Equations Using Identities, Part 3: Using an Identity First',
  thumbnailTitle: 'Using an Identity First',
  thumbnail: 'gr',
  summary: 'Choosing an identity that leaves one function of one angle: solving cos 2x = sin x with cos 2x = 1 − 2 sin²x, and 2 sin²x + 3 cos x = 0 with sin²x = 1 − cos²x, and factoring sin 2x = cos x instead of dividing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.4 · Part 3', title: 'Using an Identity First', subtitle: 'One function of one angle' }],
      lines: [
        { say: 'An equation such as cosine two x equals sine x mixes two functions and two angles, so you cannot factor it as it stands.', show: 'title' },
        { say: 'In this video, you will choose an identity that leaves one function of one angle, and then solve the equation.' },
      ],
    },
    {
      chapter: 'Choosing an identity',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['The equation contains', 'Substitute'],
          rows: [
            ['$\\cos 2x$ and $\\sin x$', '$\\cos 2x = 1 - 2\\sin^2 x$'],
            ['$\\cos 2x$ and $\\cos x$', '$\\cos 2x = 2\\cos^2 x - 1$'],
            ['$\\sin 2x$', '$\\sin 2x = 2\\sin x\\cos x$, then factor'],
            ['$\\sin^2 x$ and $\\cos x$', '$\\sin^2 x = 1 - \\cos^2 x$'],
            ['$\\sec^2 x$ and $\\tan x$', '$\\sec^2 x = 1 + \\tan^2 x$'],
          ],
        },
      ],
      lines: [
        { say: 'The goal is one function of one angle. Choose the identity that gets you there.', show: 't' },
        { say: 'If the equation has cosine two x and sine x, use cosine two x equals one minus two sine squared x. Then everything is in sine x.', focus: 't.0' },
        { say: 'If it has cosine two x and cosine x, use cosine two x equals two cosine squared x minus one.', focus: 't.1' },
        { say: 'If it has sine two x, write it as two sine x cosine x, and then factor.', focus: 't.2' },
        { say: 'If it has sine squared x and cosine x, use sine squared x equals one minus cosine squared x. And if it has secant squared x and tan x, use secant squared x equals one plus tan squared x.', focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'A double angle with sine',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('gr', [
          g,
          edgeNumbers(g, { xs: [0, 90, 180, 270, 360], ys: [-1, 0, 1] }),
          plot(g, { id: 'c2', f: (x) => Math.cos(2 * rad(x)), samples: 300, tone: 'brand' }),
          plot(g, { id: 's', f: (x) => Math.sin(rad(x)), samples: 300, tone: 'opp' }),
          readUp(g, { id: 'r1', x: 30, y: 0.5, tex: '30^\\circ', group: 'sols', place: 'above right' }),
          readUp(g, { id: 'r2', x: 150, y: 0.5, tex: '150^\\circ', group: 'sols' }),
          readUp(g, { id: 'r3', x: 270, y: -1, tex: '270^\\circ', group: 'sols' }),
          dots(g, [
            { id: 'S1', x: 30, y: 0.5, tone: 'good', group: 'sols' },
            { id: 'S2', x: 150, y: 0.5, tone: 'good', group: 'sols' },
            { id: 'S3', x: 270, y: -1, tone: 'good', group: 'sols' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos 2x = \\sin x', '1 - 2\\sin^2 x = \\sin x', '2\\sin^2 x + \\sin x - 1 = 0', '(2\\sin x - 1)(\\sin x + 1) = 0', 'x = 30^\\circ,\\ 150^\\circ,\\ 270^\\circ'] },
      ],
      lines: [
        { say: 'Solve cosine two x equals sine x, for x from zero up to 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'The other function is sine x, so substitute cosine two x equals one minus two sine squared x. Now there is only sine x, of only one angle.', show: 'm.1', focus: 'm.1' },
        { say: 'Move everything to one side: two sine squared x plus sine x minus one equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'This factors as two sine x minus one, times sine x plus one.', show: 'm.3', focus: 'm.3' },
        { say: 'Sine x equals one half gives 30 and 150 degrees. Sine x equals negative one gives 270 degrees.', show: 'm.4', focus: 'm.4' },
        { say: 'Check with a graph. The graphs of y equals cosine two x, in purple, and y equals sine x, in orange, meet at exactly these three angles.', show: ['gr.grid', 'gr.axes', 'gr.c2', 'gr.s', 'gr.sols'], focus: 'gr.sols' },
      ],
    },
    {
      chapter: 'A Pythagorean substitution',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['2\\sin^2 x + 3\\cos x = 0', '2(1 - \\cos^2 x) + 3\\cos x = 0', '2\\cos^2 x - 3\\cos x - 2 = 0', '(2\\cos x + 1)(\\cos x - 2) = 0', '\\cos x = 2:\\ \\text{no solution} \\qquad \\cos x = -\\dfrac{1}{2}:\\ x = 120^\\circ,\\ 240^\\circ'],
        },
      ],
      lines: [
        { say: 'Solve two sine squared x plus three cosine x equals zero, for x from zero up to 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'There is sine squared x and cosine x. So substitute sine squared x equals one minus cosine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand to get two minus two cosine squared x plus three cosine x equals zero. Multiply every term by negative one, and put the terms in order: two cosine squared x minus three cosine x minus two equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'This factors as two cosine x plus one, times cosine x minus two.', show: 'm.3', focus: 'm.3' },
        { say: 'Cosine x equals two has no solution, because cosine is never more than one. Cosine x equals negative one half has a reference angle of sixty degrees, in quadrants two and three: 120 and 240 degrees.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\sin 2x = \\cos x$ for $0^\\circ \\le x < 360^\\circ$.',
          choices: ['$30^\\circ,\\ 150^\\circ$', '$30^\\circ,\\ 90^\\circ,\\ 150^\\circ,\\ 270^\\circ$', '$90^\\circ,\\ 270^\\circ$', '$60^\\circ,\\ 90^\\circ,\\ 270^\\circ,\\ 300^\\circ$'],
          answer: 1,
          working: '$2\\sin x\\cos x - \\cos x = 0$, so $\\cos x(2\\sin x - 1) = 0$. $\\cos x = 0$: $90^\\circ,\\ 270^\\circ$. $\\sin x = \\dfrac{1}{2}$: $30^\\circ,\\ 150^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve sine two x equals cosine x, for x from zero up to 360 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Write sine two x as two sine x cosine x, move everything to one side, and factor out cosine x. Cosine x equals zero gives 90 and 270 degrees, and sine x equals one half gives 30 and 150 degrees. Choice A divides both sides by cosine x, which loses the solutions where cosine x is zero.', show: 'q.answer' },
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
          items: ['Choose an identity that leaves one function of one angle.', '$\\cos 2x = 1 - 2\\sin^2 x$ with $\\sin x$; $\\cos 2x = 2\\cos^2 x - 1$ with $\\cos x$; $\\sin^2 x = 1 - \\cos^2 x$; $\\sec^2 x = 1 + \\tan^2 x$.', 'With $\\sin 2x = 2\\sin x\\cos x$, factor out the common factor; never divide by it.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Choose an identity that leaves one function of one angle.', show: 'sum.0' },
        { say: 'With sine x, use cosine two x equals one minus two sine squared x. With cosine x, use two cosine squared x minus one. And use the Pythagorean identities to change sine squared into cosine squared, or secant squared into tan squared.', show: 'sum.1' },
        { say: 'With sine two x, factor out the common factor, and never divide by it. In part four, you will write the general solution of an equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
