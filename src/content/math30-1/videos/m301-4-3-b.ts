import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/** The label of the point (0, −1), set to the right of the y-axis so the axis does not cross it. */
const bottom: Part = { points: { 'bottom-at': [2, -4.6] }, items: [{ kind: 'label', id: 'bottom', at: 'bottom-at', tex: '(0, -1)', tone: 'brand', place: 'center' }] };

const video: Explainer = {
  id: 'm301-4-3-b',
  lessonId: 'm301-4-3',
  title: 'Trigonometric Ratios, Part 2: Exact Values for Special Angles',
  thumbnailTitle: 'Exact Values',
  thumbnail: 'sec',
  summary: 'Exact values of the six ratios from P(θ): sec 5π/4 = −√2 (rationalizing the denominator), cot(−π/6) = −√3, csc 3π/2 = −1 while sec 3π/2 is undefined, and the expression 2 sin π/6 − sec² π/4 = −1. Part 3 starts from one ratio and finds the others.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.3 · Part 2', title: 'Exact Values', subtitle: 'All six ratios of the special angles' }],
      lines: [
        { say: 'For the special angles, every trigonometric ratio has an exact value, with no calculator needed.', show: 'title' },
        { say: 'In this video, you will find P of theta from the reference angle and the quadrant, then apply the definition of the ratio. Simplify every answer, and rationalize the denominators.' },
      ],
    },
    {
      chapter: 'A reciprocal ratio',
      layout: 'split',
      leftWidth: 600,
      left: [figure('sec', [unitCircle({ arm: 225, armLabel: '\\tfrac{5\\pi}{4}', drop: true, points: [{ deg: 225, tex: '\\left(-\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)' }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\left(\\dfrac{5\\pi}{4}\\right) = \\left(-\\dfrac{\\sqrt{2}}{2}, -\\dfrac{\\sqrt{2}}{2}\\right)', '\\sec\\dfrac{5\\pi}{4} = \\dfrac{1}{x} = -\\dfrac{2}{\\sqrt{2}}', '-\\dfrac{2}{\\sqrt{2}} \\times \\dfrac{\\sqrt{2}}{\\sqrt{2}} = -\\dfrac{2\\sqrt{2}}{2}', '\\sec\\dfrac{5\\pi}{4} = -\\sqrt{2}'] }],
      lines: [
        { say: 'Determine the exact value of the secant of five pi over four.', show: ['sec.axes', 'sec.circle', 'sec.arm', 'sec.arc'] },
        { say: 'Five pi over four is pi over four past pi, so it is in quadrant three, with reference angle pi over four. Both coordinates are negative: P is negative root two over two, negative root two over two.', show: ['sec.tri', 'sec.pts', 'm.0'], focus: ['sec.pts', 'm.0'] },
        { say: 'The secant is one over x. One over negative root two over two flips to negative two over root two.', show: 'm.1', focus: 'm.1' },
        { say: 'Rationalize the denominator: multiply the top and bottom by root two. That gives negative two root two over two.', show: 'm.2', focus: 'm.2' },
        { say: 'The twos cancel, so the secant of five pi over four is negative root two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A negative angle',
      layout: 'split',
      leftWidth: 600,
      left: [figure('cot', [unitCircle({ arm: -30, armLabel: '-\\tfrac{\\pi}{6}', drop: true, points: [{ deg: -30, tex: '\\left(\\tfrac{\\sqrt{3}}{2}, -\\tfrac{1}{2}\\right)' }] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\left(-\\dfrac{\\pi}{6}\\right) = \\left(\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}\\right)', '\\cot\\left(-\\dfrac{\\pi}{6}\\right) = \\dfrac{x}{y} = \\dfrac{\\sqrt{3}/2}{-1/2}', '\\cot\\left(-\\dfrac{\\pi}{6}\\right) = -\\sqrt{3}'] }],
      lines: [
        { say: 'Determine the exact value of the cotangent of negative pi over six.', show: ['cot.axes', 'cot.circle', 'cot.arm', 'cot.arc'] },
        { say: 'Negative pi over six turns clockwise into quadrant four. Its point is the reflection of P of pi over six in the x-axis: root three over two, negative one half.', show: ['cot.tri', 'cot.pts', 'm.0'], focus: ['cot.pts', 'm.0'] },
        { say: 'The cotangent is x over y: root three over two, divided by negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'The halves cancel, leaving root three over negative one. So the cotangent of negative pi over six is negative root three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quadrantal angle',
      layout: 'split',
      leftWidth: 540,
      left: [figure('q', [unitCircle({ arm: 270, armLabel: '\\tfrac{3\\pi}{2}', points: [{ deg: 270 }] }), bottom])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P\\left(\\dfrac{3\\pi}{2}\\right) = (0, -1)', '\\csc\\dfrac{3\\pi}{2} = \\dfrac{1}{y} = \\dfrac{1}{-1} = -1', '\\sec\\dfrac{3\\pi}{2} = \\dfrac{1}{x} = \\dfrac{1}{0}: \\text{ undefined}'] }],
      lines: [
        { say: 'Determine the cosecant and the secant of three pi over two.', show: ['q.axes', 'q.circle'] },
        { say: 'Three pi over two is three quarters of a turn. The terminal arm points straight down, so P is zero, negative one.', show: ['q.arm', 'q.arc', 'q.pts', 'q.bottom', 'm.0'], focus: ['q.pts', 'q.bottom', 'm.0'] },
        { say: 'The cosecant is one over y: one over negative one, which is negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'The secant is one over x, which is one over zero. You cannot divide by zero, so the secant of three pi over two is undefined.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Combining values',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sin\\dfrac{\\pi}{6} - \\sec^2\\dfrac{\\pi}{4}', '\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}, \\quad \\sec\\dfrac{\\pi}{4} = \\dfrac{2}{\\sqrt{2}} = \\sqrt{2}', '2\\left(\\dfrac{1}{2}\\right) - \\left(\\sqrt{2}\\right)^2 = 1 - 2 = -1'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Squared ratios', md: '$\\sec^2\\theta$ means $(\\sec\\theta)^2$: find the ratio first, then square it.' },
      ],
      lines: [
        { say: 'Determine the exact value of two sine pi over six, minus secant squared pi over four.', show: 'm.0', focus: 'm.0' },
        { say: 'Secant squared means the secant, then squared. So find each ratio first.', show: 'tip' },
        { say: 'The sine of pi over six is one half. The secant of pi over four is one over root two over two, which is two over root two, and that simplifies to root two.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute: two times one half is one, and root two squared is two. One minus two is negative one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the exact value of $\\csc\\dfrac{2\\pi}{3}$.',
          choices: ['$-2$', '$\\dfrac{2\\sqrt{3}}{3}$', '$-\\dfrac{2\\sqrt{3}}{3}$', '$\\dfrac{\\sqrt{3}}{2}$'],
          answer: 1,
          working: '$P\\left(\\dfrac{2\\pi}{3}\\right) = \\left(-\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)$, so $\\csc\\dfrac{2\\pi}{3} = \\dfrac{1}{y} = \\dfrac{2}{\\sqrt{3}} = \\dfrac{2\\sqrt{3}}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the exact value of the cosecant of two pi over three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. P of two pi over three is negative one half, root three over two. The cosecant is one over y: two over root three, which rationalizes to two root three over three. Choice A is one over x, the secant, and D is the sine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find $P(\\theta)$ from the reference angle and the quadrant.', 'Apply the definition: $\\csc\\theta = \\dfrac{1}{y}$, $\\sec\\theta = \\dfrac{1}{x}$, $\\cot\\theta = \\dfrac{x}{y}$.', 'Simplify and rationalize; a zero denominator means undefined.'] }],
      lines: [
        { say: 'Let’s sum up. To find an exact value, first find P of theta from the reference angle and the quadrant.', show: 'sum.0' },
        { say: 'Then apply the definition of the ratio.', show: 'sum.1' },
        { say: 'Simplify, rationalize the denominator, and remember that a zero denominator means the ratio is undefined. In part three, we start from one ratio and find the others. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
