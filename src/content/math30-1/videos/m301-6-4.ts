import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-4',
  lessonId: 'm301-6-4',
  title: 'Solving Trigonometric Equations Using Identities, Part 1: Quadratic Equations in One Function',
  thumbnailTitle: 'Quadratic Trigonometric Equations',
  thumbnail: 'uc',
  summary: 'Solving 2 sin²x − sin x − 1 = 0 as a quadratic in sin x: factoring, then solving each factor on the unit circle, and why dividing sin²x = sin x by sin x loses solutions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.4 · Part 1', title: 'Quadratic Equations in One Function', subtitle: 'Factor, then solve each factor' }],
      lines: [
        { say: 'A projectile launched at speed v and angle theta lands a distance R away, where R equals v squared sine two theta, over g. Finding the launch angles that hit a target means solving a trigonometric equation.', show: 'title' },
        { say: 'In this video, you will solve equations that are quadratic in one trigonometric function, by factoring them.' },
      ],
    },
    {
      chapter: 'A quadratic in sin x',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sin^2 x - \\sin x - 1 = 0,\\quad 0 \\le x < 2\\pi', 'u = \\sin x:\\quad 2u^2 - u - 1 = 0', '(2u + 1)(u - 1) = 0', '(2\\sin x + 1)(\\sin x - 1) = 0'] },
      ],
      lines: [
        { say: 'Solve two sine squared x minus sine x minus one equals zero, for x from zero up to, but not including, two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'This is a quadratic in sine x. If it helps, let u equal sine x. Then the equation is two u squared minus u minus one equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor it. You need two numbers that multiply to negative two and add to negative one: negative two and one. So it factors as two u plus one, times u minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Put sine x back in place of u: two sine x plus one, times sine x minus one, equals zero. Now one of the factors must be zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Solve each factor',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          {
            points: { hl: [-3.4, -1.5], hr: [3.4, -1.5] },
            items: [{ kind: 'line', id: 'half', from: 'hl', to: 'hr', tone: 'opp', dashed: true, weight: 2 }],
          },
          circleMarks(3, [
            { deg: 210, tex: '\\frac{7\\pi}{6}', place: 'below left', group: 'neg' },
            { deg: 330, tex: '\\frac{11\\pi}{6}', place: 'below right', group: 'neg' },
            { deg: 90, tex: '\\frac{\\pi}{2}', tone: 'adj', place: 'above right' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\sin x = -\\dfrac{1}{2}:\\quad x = \\pi + \\dfrac{\\pi}{6},\\ 2\\pi - \\dfrac{\\pi}{6}', 'x = \\dfrac{7\\pi}{6},\\ \\dfrac{11\\pi}{6}', '\\sin x = 1:\\quad x = \\dfrac{\\pi}{2}', 'x = \\dfrac{\\pi}{2},\\ \\dfrac{7\\pi}{6},\\ \\dfrac{11\\pi}{6}'],
        },
      ],
      lines: [
        { say: 'First factor: two sine x plus one equals zero, so sine x equals negative one half. Sine x is the y-coordinate on the unit circle, so look where the circle is at height negative one half.', show: ['uc.axes', 'uc.circle', 'uc.half'], focus: 'uc.half' },
        { say: 'The reference angle is pi over six, and sine is negative in quadrants three and four. So x is pi plus pi over six, or two pi minus pi over six.', show: ['m.0', 'uc.neg'], focus: ['m.0', 'uc.neg'] },
        { say: 'That is seven pi over six, and eleven pi over six.', show: 'm.1', focus: 'm.1' },
        { say: 'Second factor: sine x minus one equals zero, so sine x equals one. That happens only at the top of the circle, at pi over two.', show: ['m.2', 'uc.m90'], focus: ['m.2', 'uc.m90'] },
        { say: 'So there are three solutions: pi over two, seven pi over six, and eleven pi over six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Dividing by a trigonometric function',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by a trigonometric function', md: 'To solve $\\sin^2 x = \\sin x$, do **not** divide both sides by $\\sin x$: that throws away the solutions of $\\sin x = 0$. Move everything to one side and factor.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin^2 x - \\sin x = 0', '\\sin x(\\sin x - 1) = 0', '\\sin x = 0:\\ x = 0,\\ \\pi \\qquad \\sin x = 1:\\ x = \\dfrac{\\pi}{2}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. To solve sine squared x equals sine x, it is tempting to divide both sides by sine x. That leaves sine x equals one, and only one solution, pi over two.', show: 'oops' },
        { say: 'But dividing by sine x throws away every solution where sine x is zero. Instead, move everything to one side.', show: 'm.0', focus: 'm.0' },
        { say: 'Then factor out sine x: sine x, times sine x minus one, equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Sine x equals zero gives zero and pi, and sine x equals one gives pi over two. So for x from zero up to two pi, there are three solutions, not one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2\\cos^2 x + \\cos x - 1 = 0$ for $0 \\le x < 2\\pi$.',
          choices: ['$\\dfrac{\\pi}{3},\\ \\pi,\\ \\dfrac{5\\pi}{3}$', '$\\dfrac{\\pi}{3},\\ \\dfrac{5\\pi}{3}$', '$0,\\ \\dfrac{2\\pi}{3},\\ \\dfrac{4\\pi}{3}$', '$\\dfrac{\\pi}{3},\\ \\dfrac{2\\pi}{3},\\ \\pi$'],
          answer: 0,
          working: '$(2\\cos x - 1)(\\cos x + 1) = 0$. $\\cos x = \\dfrac{1}{2}$: $x = \\dfrac{\\pi}{3},\\ \\dfrac{5\\pi}{3}$. $\\cos x = -1$: $x = \\pi$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two cosine squared x plus cosine x minus one equals zero, for x from zero up to, but not including, two pi. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The equation factors as two cosine x minus one, times cosine x plus one. Cosine x equals one half gives pi over three and five pi over three, and cosine x equals negative one gives pi. Choice B forgets the second factor, and choice C has the signs in both factors reversed.', show: 'q.answer' },
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
          items: ['An equation like $2\\sin^2 x - \\sin x - 1 = 0$ is a quadratic in $\\sin x$: factor it.', 'Solve each factor over the domain, using the reference angle and the quadrants.', 'Never divide by a trigonometric function: move everything to one side and factor.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An equation like two sine squared x minus sine x minus one equals zero is a quadratic in sine x, so factor it.', show: 'sum.0' },
        { say: 'Solve each factor over the domain, using the reference angle and the quadrants.', show: 'sum.1' },
        { say: 'And never divide by a trigonometric function: move everything to one side and factor instead. In part two, you will handle square roots, impossible values, and values that are not special. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
