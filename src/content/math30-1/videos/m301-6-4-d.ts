import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-4-d',
  lessonId: 'm301-6-4',
  title: 'Solving Trigonometric Equations Using Identities, Part 4: General Solutions',
  thumbnailTitle: 'General Solutions',
  thumbnail: 'ev',
  summary: 'Writing the general solution of a trigonometric equation by adding a multiple of the period to each solution in one revolution, as for 2 sin²x − sin x − 1 = 0, and combining evenly spaced solutions, as in x = π/4 + (π/2)n for tan²x = 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.4 · Part 4', title: 'General Solutions', subtitle: 'Every solution, for all real numbers' }],
      lines: [
        { say: 'Sine and cosine repeat every full turn. So an equation that has solutions in one revolution has infinitely many solutions altogether.', show: 'title' },
        { say: 'In this video, you will write the general solution of an equation, and combine solutions that are evenly spaced.' },
      ],
    },
    {
      chapter: 'Periods',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin x,\\ \\cos x:\\quad \\text{period } 2\\pi \\ (360^\\circ)', '\\tan x:\\quad \\text{period } \\pi \\ (180^\\circ)', 'x = \\text{(a solution)} + \\text{(the period)} \\times n,\\quad n \\in \\mathrm{I}'] },
      ],
      lines: [
        { say: 'Sine and cosine repeat every two pi radians, or 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Tangent repeats every pi radians, or 180 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'So every solution in one revolution produces infinitely many more: add any whole number of periods. Write that as the solution, plus the period times n, where n is an integer: zero, one, two, negative one, and so on.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Writing the general solution',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 90, tex: '\\frac{\\pi}{2}', place: 'above right' },
            { deg: 210, tex: '\\frac{7\\pi}{6}', place: 'below left' },
            { deg: 330, tex: '\\frac{11\\pi}{6}', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['2\\sin^2 x - \\sin x - 1 = 0', 'x = \\dfrac{\\pi}{2},\\ \\dfrac{7\\pi}{6},\\ \\dfrac{11\\pi}{6}', 'x = \\dfrac{\\pi}{2} + 2\\pi n,\\ \\ \\dfrac{7\\pi}{6} + 2\\pi n,', '\\dfrac{11\\pi}{6} + 2\\pi n,\\quad n \\in \\mathrm{I}'],
        },
      ],
      lines: [
        { say: 'Write the general solution of two sine squared x minus sine x minus one equals zero, in radians.', show: 'm.0', focus: 'm.0' },
        { say: 'In part one, you found the solutions in one revolution: pi over two, seven pi over six, and eleven pi over six.', show: ['m.1', 'uc.axes', 'uc.circle', 'uc.m90', 'uc.m210', 'uc.m330'], focus: ['m.1', 'uc.m90', 'uc.m210', 'uc.m330'] },
        { say: 'Sine repeats every two pi. And no two of these solutions are exactly pi apart, so they cannot be combined. Each needs its own expression.' },
        { say: 'So x equals pi over two plus two pi n, seven pi over six plus two pi n, or eleven pi over six plus two pi n, where n is an integer.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Evenly spaced solutions',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('ev', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 45, tex: '\\frac{\\pi}{4}', place: 'above right' },
            { deg: 135, tex: '\\frac{3\\pi}{4}', place: 'above left' },
            { deg: 225, tex: '\\frac{5\\pi}{4}', place: 'below left' },
            { deg: 315, tex: '\\frac{7\\pi}{4}', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan^2 x = 1:\\quad \\tan x = \\pm 1', 'x = \\dfrac{\\pi}{4},\\ \\dfrac{3\\pi}{4},\\ \\dfrac{5\\pi}{4},\\ \\dfrac{7\\pi}{4}', 'x = \\dfrac{\\pi}{4} + \\dfrac{\\pi}{2}n,\\quad n \\in \\mathrm{I}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Combine when evenly spaced', md: 'Solutions a half-turn apart combine with $\\pi n$; a quarter-turn apart, with $\\dfrac{\\pi}{2}n$.' },
      ],
      lines: [
        { say: 'When the solutions are evenly spaced, combine them. Solve tan squared x equals one. Taking square roots, tan x is plus or minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'In one revolution, that gives pi over four, three pi over four, five pi over four, and seven pi over four.', show: ['m.1', 'ev.axes', 'ev.circle', 'ev.m45', 'ev.m135', 'ev.m225', 'ev.m315'], focus: 'm.1' },
        { say: 'Look at them on the circle. Each one is a quarter turn, pi over two, after the one before.', focus: ['ev.m45', 'ev.m135', 'ev.m225', 'ev.m315'] },
        { say: 'So start at pi over four and add pi over two, again and again: x equals pi over four plus pi over two times n, where n is an integer. One expression covers all four, in every revolution.', show: 'm.2', focus: 'm.2' },
        { say: 'In the same way, two solutions that are half a turn apart combine with pi n.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the general solution of $\\sin^2 x = \\sin x$, with $n \\in \\mathrm{I}$?',
          choices: ['$x = 2\\pi n,\\ \\dfrac{\\pi}{2} + 2\\pi n$', '$x = \\pi n,\\ \\dfrac{\\pi}{2} + \\pi n$', '$x = \\dfrac{\\pi}{2}n$', '$x = \\pi n,\\ \\dfrac{\\pi}{2} + 2\\pi n$'],
          answer: 3,
          working: 'In one revolution: $x = 0,\\ \\dfrac{\\pi}{2},\\ \\pi$. $0$ and $\\pi$ are a half-turn apart: $\\pi n$. $\\dfrac{\\pi}{2}$ repeats every $2\\pi$: $\\dfrac{\\pi}{2} + 2\\pi n$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the general solution of sine squared x equals sine x, where n is an integer? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. In one revolution, the solutions are zero, pi over two, and pi. Zero and pi are half a turn apart, so together they are pi n. Pi over two repeats every two pi. Choice B also adds pi to pi over two, which would include three pi over two, where sine x is negative one, so it is not a solution.', show: 'q.answer' },
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
          items: ['Sine and cosine repeat every $2\\pi$ ($360^\\circ$); tangent every $\\pi$ ($180^\\circ$).', 'Add a multiple of the period to each solution in one revolution, with $n \\in \\mathrm{I}$.', 'Combine solutions that are evenly spaced, such as $\\pi n$ for pairs a half-turn apart.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sine and cosine repeat every two pi, or 360 degrees, and tangent every pi, or 180 degrees.', show: 'sum.0' },
        { say: 'For the general solution, add a multiple of the period to each solution in one revolution, where n is an integer.', show: 'sum.1' },
        { say: 'And combine solutions that are evenly spaced, such as pi n for pairs half a turn apart. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
