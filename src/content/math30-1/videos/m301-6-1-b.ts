import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { rad } from './lib/m301-6-figures.ts';

/** The unit circle with P at 60°, without its usual label 1 on the x-axis (the radius to P is labelled instead). */
const full = unitCircle({ r: 3, points: [{ deg: 60, tex: 'P' }], arm: 60, armLabel: '\\theta', drop: true, sides: { x: '\\cos\\theta', y: '\\sin\\theta' } });
const circle: Part = { points: full.points, items: full.items.filter((i) => i.id !== 'one') };

/** The label 1 on the radius to P, above its middle. */
const one: Part = {
  points: { 'r-mid': [1.5 * Math.cos(rad(60)), 1.5 * Math.sin(rad(60))] },
  items: [{ kind: 'label', id: 'r1', at: 'r-mid', tex: '1', tone: 'hyp', place: 'above left' }],
};

const video: Explainer = {
  id: 'm301-6-1-b',
  lessonId: 'm301-6-1',
  title: 'Reciprocal, Quotient and Pythagorean Identities, Part 2: Reciprocal and Quotient Identities',
  thumbnailTitle: 'Reciprocal and Quotient Identities',
  thumbnail: 'uc',
  summary: 'Where the reciprocal identities (csc x = 1/sin x, sec x = 1/cos x, cot x = 1/tan x) and the quotient identities (tan x = sin x/cos x, cot x = cos x/sin x) come from on the unit circle, and how to simplify an expression such as tan x cos x csc x by writing it in sine and cosine.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.1 · Part 2', title: 'Reciprocal and Quotient Identities', subtitle: 'Write everything in sine and cosine' }],
      lines: [
        { say: 'With six trigonometric functions, an expression can look complicated. But four of them can be written using just sine and cosine.', show: 'title' },
        { say: 'In this video, you will see where the reciprocal and quotient identities come from, and use them to simplify expressions.' },
      ],
    },
    {
      chapter: 'From the unit circle',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('uc', [
          circle,
          one,
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['x = \\cos\\theta,\\ \\ y = \\sin\\theta,\\ \\ r = 1', '\\tan\\theta = \\dfrac{y}{x} = \\dfrac{\\sin\\theta}{\\cos\\theta}', '\\csc\\theta = \\dfrac{r}{y} = \\dfrac{1}{\\sin\\theta}', '\\sec\\theta = \\dfrac{r}{x} = \\dfrac{1}{\\cos\\theta}', '\\cot\\theta = \\dfrac{x}{y} = \\dfrac{\\cos\\theta}{\\sin\\theta}'],
        },
      ],
      lines: [
        { say: 'Here is the unit circle, with radius one. The point P is on the terminal arm of the angle theta.', show: ['uc.axes', 'uc.circle', 'uc.arm', 'uc.arc', 'uc.p60', 'uc.r1'] },
        { say: 'Its coordinates are cosine theta and sine theta. So x is cosine theta, y is sine theta, and r is one.', show: ['m.0', 'uc.tri', 'uc.x', 'uc.y'], focus: ['m.0', 'uc.x', 'uc.y'] },
        { say: 'Tan theta is y over x. That is sine theta over cosine theta.', show: 'm.1', focus: 'm.1' },
        { say: 'The other three ratios are the reciprocals. Cosecant theta is r over y, which is one over sine theta.', show: 'm.2', focus: 'm.2' },
        { say: 'Secant theta is r over x, which is one over cosine theta.', show: 'm.3', focus: 'm.3' },
        { say: 'And cotangent theta is x over y, which is cosine theta over sine theta.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The identities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\csc x = \\dfrac{1}{\\sin x} \\qquad \\sec x = \\dfrac{1}{\\cos x} \\qquad \\cot x = \\dfrac{1}{\\tan x}', '\\tan x = \\dfrac{\\sin x}{\\cos x} \\qquad \\cot x = \\dfrac{\\cos x}{\\sin x}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Which reciprocal?', md: 'The names cross over: $\\csc x$ is the reciprocal of $\\sin x$, and $\\sec x$ is the reciprocal of $\\cos x$. Each pair has exactly one "co".' },
      ],
      lines: [
        { say: 'These are the reciprocal identities. Cosecant x equals one over sine x, secant x equals one over cosine x, and cotangent x equals one over tan x.', show: 'm.0', focus: 'm.0' },
        { say: 'And these are the quotient identities. Tan x equals sine x over cosine x, and cotangent x equals cosine x over sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'Be careful with the names, because they cross over. Cosecant goes with sine, and secant goes with cosine. In each pair, exactly one of the two names starts with co.', show: 'oops', focus: 'm' },
      ],
    },
    {
      chapter: 'Simplifying',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan x\\cos x\\csc x', '= \\dfrac{\\sin x}{\\cos x}\\cdot\\cos x\\cdot\\dfrac{1}{\\sin x}', '= \\dfrac{\\sin x\\cos x}{\\cos x\\sin x} = 1', '\\cos x \\ne 0 \\text{ and } \\sin x \\ne 0:\\quad x \\ne \\dfrac{\\pi}{2}n,\\ n \\in \\mathrm{I}'] },
      ],
      lines: [
        { say: 'A reliable first move is to write every function in terms of sine x and cosine x, then divide out common factors. Let’s simplify tan x times cosine x times cosecant x.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the quotient identity for tan x, and the reciprocal identity for cosecant x: sine x over cosine x, times cosine x, times one over sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply. The numerator and the denominator are both sine x times cosine x, so they divide out, and the expression equals one.', show: 'm.2', focus: 'm.2' },
        { say: 'The simplified form is only equal where the original is defined. Tan x needs cosine x not equal to zero, and cosecant x needs sine x not equal to zero. So x cannot equal pi over two times n, where n is an integer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Why sin x over tan x is cos x',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sin x}{\\tan x} = \\sin x \\div \\dfrac{\\sin x}{\\cos x}', '= \\sin x\\cdot\\dfrac{\\cos x}{\\sin x}', '= \\cos x'] },
      ],
      lines: [
        { say: 'Now you can see why the identity from part one works. Sine x over tan x is sine x, divided by sine x over cosine x.', show: 'm.0', focus: 'm.0' },
        { say: 'Dividing by a fraction is the same as multiplying by its reciprocal: sine x, times cosine x over sine x.', show: 'm.1', focus: 'm.1' },
        { say: 'The sines divide out, leaving cosine x, for every permissible value of x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\sec x\\cot x$.',
          choices: ['$\\tan x$', '$1$', '$\\sin x$', '$\\csc x$'],
          answer: 3,
          working: '$\\sec x\\cot x = \\dfrac{1}{\\cos x}\\cdot\\dfrac{\\cos x}{\\sin x} = \\dfrac{1}{\\sin x} = \\csc x$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify secant x times cotangent x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Secant x is one over cosine x, and cotangent x is cosine x over sine x. The cosines divide out, leaving one over sine x, which is cosecant x. Choice C is its reciprocal, sine x, so it mixes up the pair.', show: 'q.answer' },
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
          items: ['Reciprocal: $\\csc x = \\dfrac{1}{\\sin x}$, $\\sec x = \\dfrac{1}{\\cos x}$, $\\cot x = \\dfrac{1}{\\tan x}$.', 'Quotient: $\\tan x = \\dfrac{\\sin x}{\\cos x}$, $\\cot x = \\dfrac{\\cos x}{\\sin x}$.', 'To simplify, write everything in sine and cosine, divide out common factors, and state the restrictions.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The reciprocal identities: cosecant x is one over sine x, secant x is one over cosine x, and cotangent x is one over tan x.', show: 'sum.0' },
        { say: 'The quotient identities: tan x is sine x over cosine x, and cotangent x is cosine x over sine x.', show: 'sum.1' },
        { say: 'To simplify, write everything in sine and cosine, divide out common factors, and state the restrictions. In part three, you will meet the Pythagorean identities. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
