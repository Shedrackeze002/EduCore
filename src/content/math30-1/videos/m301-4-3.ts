import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/** P's name beside the unit circle's point P. */
const pName = (tex: string, place: 'above right' | 'below left'): Part => ({
  points: {},
  items: [{ kind: 'label', id: 'P-name', at: 'P', tex, tone: 'brand', dot: true, place }],
});

const video: Explainer = {
  id: 'm301-4-3',
  lessonId: 'm301-4-3',
  title: 'Trigonometric Ratios, Part 1: The Six Ratios',
  thumbnailTitle: 'The Six Trigonometric Ratios',
  thumbnail: 'six',
  summary: 'The six trigonometric ratios from the point P(θ) = (x, y) on the unit circle: sin θ = y, cos θ = x, tan θ = y/x and the reciprocal ratios csc θ, sec θ and cot θ, when a ratio is undefined, the same ratios for a point at distance r, and all six for P(θ) = (−3/5, −4/5).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.3 · Part 1', title: 'The Six Trigonometric Ratios', subtitle: 'Sine, cosine, tangent, and their reciprocals' }],
      lines: [
        { say: 'Sine, cosine and tangent each have a reciprocal partner. That makes six trigonometric ratios in all.', show: 'title' },
        { say: 'In this video, you will see how all six ratios of any angle come from the two coordinates of one point on the unit circle.' },
      ],
    },
    {
      chapter: 'Three ratios',
      layout: 'split',
      leftWidth: 560,
      left: [figure('six', [unitCircle({ arm: 50, armLabel: '\\theta', drop: true, sides: { x: 'x', y: 'y' } }), pName('P(\\theta) = (x, y)', 'above right')])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin\\theta = y', '\\cos\\theta = x', '\\tan\\theta = \\dfrac{y}{x}'] }],
      lines: [
        { say: 'Let P of theta, x, y, be the point where the terminal arm of theta meets the unit circle.', show: ['six.axes', 'six.circle', 'six.arm', 'six.arc', 'six.P-name'], focus: 'six.P-name' },
        { say: 'As you saw in the last lesson, the sine of theta is the y-coordinate, and the cosine of theta is the x-coordinate.', show: ['six.tri', 'six.x', 'six.y', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The tangent is opposite over adjacent in the triangle, which is y over x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The reciprocal ratios',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\csc\\theta = \\dfrac{1}{\\sin\\theta} = \\dfrac{1}{y}', '\\sec\\theta = \\dfrac{1}{\\cos\\theta} = \\dfrac{1}{x}', '\\cot\\theta = \\dfrac{1}{\\tan\\theta} = \\dfrac{x}{y}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reciprocal ratios', md: '**Cosecant**, **secant** and **cotangent**. A ratio is **undefined** when its denominator is $0$.' },
      ],
      lines: [
        { say: 'Each of these three has a reciprocal: one over the ratio.', show: 'def' },
        { say: 'Cosecant theta, written C S C, is one over sine theta: one over y.', show: 'm.0', focus: 'm.0' },
        { say: 'Secant theta, written S E C, is one over cosine theta: one over x.', show: 'm.1', focus: 'm.1' },
        { say: 'Cotangent theta, written C O T, is one over tangent theta. Flipping y over x gives x over y.', show: 'm.2', focus: 'm.2' },
        { say: 'A ratio is undefined when its denominator is zero. For example, when x is zero, the tangent and the secant are both undefined, because you cannot divide by zero.', focus: 'def' },
      ],
    },
    {
      chapter: 'A point at distance r',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$', '$\\csc\\theta$', '$\\sec\\theta$', '$\\cot\\theta$'],
          rows: [
            ['Unit circle', '$y$', '$x$', '$\\frac{y}{x}$', '$\\frac{1}{y}$', '$\\frac{1}{x}$', '$\\frac{x}{y}$'],
            ['Distance $r$', '$\\frac{y}{r}$', '$\\frac{x}{r}$', '$\\frac{y}{x}$', '$\\frac{r}{y}$', '$\\frac{r}{x}$', '$\\frac{x}{y}$'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['r = \\sqrt{x^2 + y^2}'] },
      ],
      lines: [
        { say: 'On the unit circle, the six ratios are y, x, y over x, and their reciprocals, one over y, one over x and x over y.', show: 't.0', focus: 't.0' },
        { say: 'Sometimes the point x, y is on the terminal arm at a distance r from the origin instead, where r is the square root of x squared plus y squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by r. The sine is y over r, the cosine is x over r, the cosecant is r over y, and the secant is r over x.', show: 't.1', focus: 't.1' },
        { say: 'The tangent and the cotangent do not change, because they do not use r: they are still y over x and x over y.' },
      ],
    },
    {
      chapter: 'All six from a point',
      layout: 'split',
      leftWidth: 540,
      left: [figure('pt', [unitCircle({ arm: 233, armLabel: '\\theta', drop: true }), pName('\\left(-\\tfrac{3}{5}, -\\tfrac{4}{5}\\right)', 'below left')])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin\\theta = -\\dfrac{4}{5}, \\quad \\cos\\theta = -\\dfrac{3}{5}', '\\tan\\theta = \\dfrac{-4/5}{-3/5} = \\dfrac{4}{3}', '\\csc\\theta = -\\dfrac{5}{4}, \\quad \\sec\\theta = -\\dfrac{5}{3}', '\\cot\\theta = \\dfrac{3}{4}'] }],
      lines: [
        { say: 'P of theta is negative three fifths, negative four fifths. Determine the six trigonometric ratios of theta.', show: ['pt.axes', 'pt.circle', 'pt.arm', 'pt.arc', 'pt.P-name'], focus: 'pt.P-name' },
        { say: 'The sine is the y-coordinate, negative four fifths, and the cosine is the x-coordinate, negative three fifths.', show: ['pt.tri', 'm.0'], focus: 'm.0' },
        { say: 'The tangent is y over x: negative four fifths over negative three fifths. The fifths cancel, and a negative over a negative is positive: four thirds.', show: 'm.1', focus: 'm.1' },
        { say: 'Now flip each one. The cosecant is negative five quarters, and the secant is negative five thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'And the cotangent is three quarters. Notice that each reciprocal keeps the sign of its partner.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Pairing the wrong reciprocals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\csc\\theta = \\dfrac{1}{\\sin\\theta} \\qquad \\sec\\theta = \\dfrac{1}{\\cos\\theta} \\qquad \\cot\\theta = \\dfrac{1}{\\tan\\theta}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Pairing the wrong reciprocals', md: '**Co**secant goes with sine, not cosine. Each pair has exactly one "co": **co**secant and sine, secant and **co**sine, **co**tangent and tangent.' },
      ],
      lines: [
        { say: 'Because of the names, it is tempting to pair cosecant with cosine. That is the most common mistake with these ratios.', show: 'oops' },
        { say: 'Cosecant goes with sine, and secant goes with cosine. Each pair has exactly one co: cosecant and sine, secant and cosine, cotangent and tangent.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P(\\theta) = \\left(\\dfrac{5}{13}, -\\dfrac{12}{13}\\right)$. What is $\\csc\\theta$?',
          choices: ['$-\\dfrac{13}{12}$', '$\\dfrac{13}{5}$', '$-\\dfrac{12}{13}$', '$-\\dfrac{5}{12}$'],
          answer: 0,
          working: '$\\sin\\theta = y = -\\dfrac{12}{13}$, so $\\csc\\theta = \\dfrac{1}{y} = -\\dfrac{13}{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. P of theta is five thirteenths, negative twelve thirteenths. What is the cosecant of theta? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cosecant is one over the sine, and the sine is the y-coordinate, negative twelve thirteenths. Its reciprocal is negative thirteen twelfths. B is the secant, one over x: it pairs cosecant with cosine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sin\\theta = y$, $\\cos\\theta = x$, $\\tan\\theta = \\dfrac{y}{x}$', '$\\csc\\theta = \\dfrac{1}{\\sin\\theta}$, $\\sec\\theta = \\dfrac{1}{\\cos\\theta}$, $\\cot\\theta = \\dfrac{1}{\\tan\\theta}$', 'A ratio with a zero denominator is undefined.'] }],
      lines: [
        { say: 'Let’s sum up. On the unit circle, the sine is y, the cosine is x, and the tangent is y over x.', show: 'sum.0' },
        { say: 'The cosecant is one over the sine, the secant is one over the cosine, and the cotangent is one over the tangent.', show: 'sum.1' },
        { say: 'And a ratio with a zero denominator is undefined. In part two, we find exact values of all six ratios for special angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
