import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-3-c',
  lessonId: 'm301-6-3',
  title: 'Proving Identities, Part 3: Double Angles and Non-Permissible Values',
  thumbnailTitle: 'Double Angles and Non-Permissible Values',
  thumbnail: 'uc',
  summary: 'Proving sin 2x/(1 − cos 2x) = cot x by choosing cos 2x = 1 − 2 sin²x, and stating the non-permissible values of an identity from both of its sides, as for tan x + cot x = sec x csc x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.3 · Part 3', title: 'Double Angles and Non-Permissible Values', subtitle: 'Choose the form that makes the work short' }],
      lines: [
        { say: 'When an identity contains a double angle, the first step is usually to replace it. Cosine two x has three forms, and a good choice makes the proof short.', show: 'title' },
        { say: 'In this video, you will prove an identity with a double angle, and state the non-permissible values of an identity from both of its sides.' },
      ],
    },
    {
      chapter: 'Choosing the form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'p', size: 'md', lines: ['\\dfrac{\\sin 2x}{1 - \\cos 2x} = \\cot x'] },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\sin 2x = 2\\sin x\\cos x', '\\cos 2x = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 - \\cos 2x = 1 - (1 - 2\\sin^2 x)', '= 2\\sin^2 x'] },
      ],
      lines: [
        { say: 'Prove that sine two x, over one minus cosine two x, equals cotangent x. The right side has only x, so replace the double angles on the left.', show: 'p' },
        { say: 'Sine two x is two sine x cosine x. For cosine two x, there are three forms to choose from.', show: ['f.0', 'f.1'], focus: ['f.0', 'f.1'] },
        { say: 'The denominator is one minus cosine two x. Choose cosine two x equals one minus two sine squared x, because then the ones cancel.', show: 'm.0', focus: 'm.0' },
        { say: 'One minus the quantity one minus two sine squared x is just two sine squared x: a single term.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A proof with a double angle',
      layout: 'split',
      leftWidth: 400,
      left: [
        { kind: 'text', id: 'goal', size: 'md', md: 'Prove:' },
        { kind: 'math', id: 'p', size: 'md', lines: ['\\dfrac{\\sin 2x}{1 - \\cos 2x} = \\cot x'] },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Left side} = \\dfrac{2\\sin x\\cos x}{1 - (1 - 2\\sin^2 x)}', '= \\dfrac{2\\sin x\\cos x}{2\\sin^2 x}', '= \\dfrac{\\cos x}{\\sin x}', '= \\cot x = \\text{Right side}'],
        },
      ],
      lines: [
        { say: 'Here is the proof. Start with the left side, and replace both double angles: two sine x cosine x, over one minus the quantity one minus two sine squared x.', show: ['goal', 'p', 'm.0'], focus: 'm.0' },
        { say: 'The ones cancel in the denominator, leaving two sine x cosine x over two sine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide out the common factor, two sine x. That leaves cosine x over sine x.', show: 'm.2', focus: 'm.2' },
        { say: 'By the quotient identity, cosine x over sine x is cotangent x, which is the right side.', show: 'm.3', focus: 'm.3' },
        { say: 'Where is it true? One minus cosine two x is zero when cosine two x is one, which happens at x equals pi n. And cotangent x needs sine x not equal to zero, also at x equals pi n. So the identity is true for x not equal to pi n, where n is an integer.' },
      ],
    },
    {
      chapter: 'Restrictions from both sides',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 90, tex: '\\frac{\\pi}{2}', tone: 'adj', place: 'above right', group: 'cos0' },
            { deg: 270, tex: '\\frac{3\\pi}{2}', tone: 'adj', place: 'below right', group: 'cos0' },
            { deg: 0, tex: '0', tone: 'opp', place: 'above right', group: 'sin0' },
            { deg: 180, tex: '\\pi', tone: 'opp', place: 'above left', group: 'sin0' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\tan x + \\cot x = \\sec x\\csc x', '\\tan x,\\ \\sec x:\\ \\ x \\ne \\dfrac{\\pi}{2} + \\pi n', '\\cot x,\\ \\csc x:\\ \\ x \\ne \\pi n', 'x \\ne \\dfrac{\\pi}{2}n,\\ n \\in \\mathrm{I}'],
        },
      ],
      lines: [
        { say: 'An identity only claims equality where both sides are defined. So list the restrictions from every denominator, and from every tan, secant, cotangent or cosecant, on either side.', show: ['uc.axes', 'uc.circle'] },
        { say: 'State the non-permissible values of tan x plus cotangent x equals secant x cosecant x.', show: 'm.0', focus: 'm.0' },
        { say: 'Tan x and secant x need cosine x not equal to zero. So x cannot be pi over two plus pi n.', show: ['m.1', 'uc.cos0'], focus: ['m.1', 'uc.cos0'] },
        { say: 'Cotangent x and cosecant x need sine x not equal to zero. So x cannot be pi n.', show: ['m.2', 'uc.sin0'], focus: ['m.2', 'uc.sin0'] },
        { say: 'Together, the four values are a quarter turn apart: every multiple of 90 degrees. So x cannot equal pi over two times n, where n is an integer.', show: 'm.3', focus: ['m.3', 'uc.cos0', 'uc.sin0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the non-permissible values of the identity $\\dfrac{\\sin x}{1 + \\cos x} = \\csc x - \\cot x$?',
          choices: ['$x \\ne \\pi n,\\ n \\in \\mathrm{I}$', '$x \\ne \\pi + 2\\pi n,\\ n \\in \\mathrm{I}$', '$x \\ne \\dfrac{\\pi}{2} + \\pi n,\\ n \\in \\mathrm{I}$', '$x \\ne \\dfrac{\\pi}{2}n,\\ n \\in \\mathrm{I}$'],
          answer: 0,
          working: 'Left side: $1 + \\cos x \\ne 0$, so $x \\ne \\pi + 2\\pi n$. Right side: $\\csc x$ and $\\cot x$ need $\\sin x \\ne 0$, so $x \\ne \\pi n$. Together: $x \\ne \\pi n$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the non-permissible values of the identity sine x over one plus cosine x, equals cosecant x minus cotangent x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The left side needs one plus cosine x not equal to zero, so x cannot be pi plus two pi n. The right side needs sine x not equal to zero, so x cannot be pi n, which includes those values. Choice B looks only at the left side.', show: 'q.answer' },
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
          items: ['With a double angle, choose the form of $\\cos 2x$ that simplifies the work.', 'An identity is only true where both sides are defined.', 'List the restrictions from every denominator and every $\\tan$, $\\sec$, $\\cot$ or $\\csc$ on either side, with $n \\in \\mathrm{I}$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. With a double angle, choose the form of cosine two x that simplifies the work.', show: 'sum.0' },
        { say: 'An identity is only true where both sides are defined.', show: 'sum.1' },
        { say: 'So list the restrictions from every denominator, and every tan, secant, cotangent or cosecant, on either side. In part four, you will find the error in a proof that goes wrong. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
