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
  id: 'm301-6-1-c',
  lessonId: 'm301-6-1',
  title: 'Reciprocal, Quotient and Pythagorean Identities, Part 3: The Pythagorean Identities',
  thumbnailTitle: 'The Pythagorean Identities',
  thumbnail: 'uc',
  summary: 'Deriving sin²x + cos²x = 1 from the Pythagorean theorem on the unit circle, dividing it to get 1 + tan²x = sec²x and 1 + cot²x = csc²x, and using them to simplify (sec²x − 1)/sec²x to sin²x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.1 · Part 3', title: 'The Pythagorean Identities', subtitle: 'The Pythagorean theorem on the unit circle' }],
      lines: [
        { say: 'The most useful identity in this unit comes from a theorem you have known for years: the Pythagorean theorem.', show: 'title' },
        { say: 'In this video, you will derive the three Pythagorean identities, and use them to simplify expressions.' },
      ],
    },
    {
      chapter: 'The unit circle',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('uc', [
          circle,
          one,
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\cos\\theta, \\sin\\theta)', '(\\cos\\theta)^2 + (\\sin\\theta)^2 = 1^2', '\\cos^2\\theta + \\sin^2\\theta = 1'] },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Notation', md: '$\\sin^2\\theta$ means $(\\sin\\theta)^2$: the square of $\\sin\\theta$.' },
      ],
      lines: [
        { say: 'Point P on the unit circle has coordinates cosine theta, sine theta.', show: ['uc.axes', 'uc.circle', 'uc.arm', 'uc.arc', 'uc.p60', 'm.0'] },
        { say: 'The right triangle under it has legs cosine theta and sine theta. Its hypotenuse is the radius, which is one.', show: ['uc.tri', 'uc.x', 'uc.y', 'uc.r1'], focus: ['uc.x', 'uc.y', 'uc.r1'] },
        { say: 'By the Pythagorean theorem, cosine theta, squared, plus sine theta, squared, equals one squared.', show: 'm.1', focus: 'm.1' },
        { say: 'The square of sine theta is written sine squared theta, with the two written right after the word sine. So cosine squared theta plus sine squared theta equals one.', show: ['m.2', 'note'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two more identities',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{\\cos^2\\theta}{\\cos^2\\theta} + \\dfrac{\\sin^2\\theta}{\\cos^2\\theta} = \\dfrac{1}{\\cos^2\\theta}', '1 + \\tan^2\\theta = \\sec^2\\theta', '\\dfrac{\\cos^2\\theta}{\\sin^2\\theta} + \\dfrac{\\sin^2\\theta}{\\sin^2\\theta} = \\dfrac{1}{\\sin^2\\theta}', '\\cot^2\\theta + 1 = \\csc^2\\theta'],
        },
      ],
      lines: [
        { say: 'Two more identities come from this one. Divide every term by cosine squared theta.', show: 'm.0', focus: 'm.0' },
        { say: 'Cosine squared over cosine squared is one. Sine squared over cosine squared is tan squared. And one over cosine squared is secant squared. So one plus tan squared theta equals secant squared theta.', show: 'm.1', focus: 'm.1' },
        { say: 'Now go back and divide every term by sine squared theta instead.', show: 'm.2', focus: 'm.2' },
        { say: 'Cosine squared over sine squared is cotangent squared, sine squared over sine squared is one, and one over sine squared is cosecant squared. So cotangent squared theta plus one equals cosecant squared theta.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The Pythagorean identities',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pythagorean identities', md: '$\\sin^2 x + \\cos^2 x = 1 \\qquad 1 + \\tan^2 x = \\sec^2 x \\qquad 1 + \\cot^2 x = \\csc^2 x$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 - \\sin^2 x = \\cos^2 x \\qquad 1 - \\cos^2 x = \\sin^2 x', '\\sec^2 x - 1 = \\tan^2 x \\qquad \\csc^2 x - 1 = \\cot^2 x'] },
      ],
      lines: [
        { say: 'Here are the three Pythagorean identities, written with x. Sine squared x plus cosine squared x equals one. One plus tan squared x equals secant squared x. And one plus cotangent squared x equals cosecant squared x.', show: 'def' },
        { say: 'Each one can be rearranged. Subtract sine squared x from both sides of the first, and you get one minus sine squared x equals cosine squared x. In the same way, one minus cosine squared x equals sine squared x.', show: 'm.0', focus: 'm.0' },
        { say: 'And from the other two, secant squared x minus one equals tan squared x, and cosecant squared x minus one equals cotangent squared x. Learn to spot these forms, because they appear all the time.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using a Pythagorean identity',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\sec^2 x - 1}{\\sec^2 x}', '= \\dfrac{\\tan^2 x}{\\sec^2 x}', '= \\dfrac{\\sin^2 x}{\\cos^2 x}\\cdot\\cos^2 x', '= \\sin^2 x'] }],
      right: [
        { kind: 'math', id: 'c', size: 'md', align: 'left', lines: ['x = 30^\\circ:\\quad \\sec^2 30^\\circ = \\dfrac{4}{3}', '\\dfrac{\\frac{4}{3} - 1}{\\frac{4}{3}} = \\dfrac{\\frac{1}{3}}{\\frac{4}{3}} = \\dfrac{1}{4}', '\\sin^2 30^\\circ = \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4}'] },
      ],
      lines: [
        { say: 'Simplify secant squared x minus one, all over secant squared x.', show: 'm.0', focus: 'm.0' },
        { say: 'The numerator, secant squared x minus one, is tan squared x, by a Pythagorean identity.', show: 'm.1', focus: 'm.1' },
        { say: 'Now write it in sine and cosine. Tan squared x is sine squared x over cosine squared x. Dividing by secant squared x is the same as multiplying by cosine squared x.', show: 'm.2', focus: 'm.2' },
        { say: 'The cosine squared x divides out, leaving sine squared x.', show: 'm.3', focus: 'm.3' },
        { say: 'Check it at x equals thirty degrees. Secant thirty degrees is two over root three, so secant squared is four thirds.', show: 'c.0', focus: 'c.0' },
        { say: 'The left side becomes four thirds minus one, over four thirds. That is one third over four thirds, which is one quarter.', show: 'c.1', focus: 'c.1' },
        { say: 'And sine squared thirty degrees is one half, squared, which is also one quarter. The simplification checks out.', show: 'c.2', focus: 'c.2' },
      ],
    },
    {
      chapter: 'What the square applies to',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin^2 x = (\\sin x)^2, \\text{ not } \\sin(x^2)', '1 - \\sin^2 x = \\cos^2 x, \\text{ not } \\cos x \\text{ and not } {-\\cos^2 x}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A dropped square or sign', md: 'Most wrong simplifications come from a dropped square or a dropped sign. Write each square, and each sign, at every step.' },
      ],
      lines: [
        { say: 'Watch what the square applies to. Sine squared x means sine x, all squared. It does not mean the sine of x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'And one minus sine squared x is cosine squared x. It is not cosine x, and it is not negative cosine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'Most wrong simplifications come from a dropped square or a dropped sign, so write each square and each sign at every step.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{1 - \\cos^2 x}{\\sin x\\cos x}$.',
          choices: ['$\\tan x$', '$\\cot x$', '$\\sin x$', '$1$'],
          answer: 0,
          working: '$1 - \\cos^2 x = \\sin^2 x$, so $\\dfrac{\\sin^2 x}{\\sin x\\cos x} = \\dfrac{\\sin x}{\\cos x} = \\tan x$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify one minus cosine squared x, all over sine x times cosine x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One minus cosine squared x is sine squared x. Divide out one factor of sine x, and you are left with sine x over cosine x, which is tan x. Choice B, cotangent x, comes from replacing the numerator with cosine squared x instead of sine squared x.', show: 'q.answer' },
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
          items: ['$\\sin^2 x + \\cos^2 x = 1$ is the Pythagorean theorem on the unit circle.', 'Divide it by $\\cos^2 x$ for $1 + \\tan^2 x = \\sec^2 x$, and by $\\sin^2 x$ for $1 + \\cot^2 x = \\csc^2 x$.', 'Rearrange as needed: $1 - \\sin^2 x = \\cos^2 x$, $\\sec^2 x - 1 = \\tan^2 x$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Sine squared x plus cosine squared x equals one is the Pythagorean theorem on the unit circle.', show: 'sum.0' },
        { say: 'Divide it by cosine squared x to get one plus tan squared x equals secant squared x, and by sine squared x to get one plus cotangent squared x equals cosecant squared x.', show: 'sum.1' },
        { say: 'Rearrange them as needed. In part four, you will put all of these identities together to simplify harder expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
