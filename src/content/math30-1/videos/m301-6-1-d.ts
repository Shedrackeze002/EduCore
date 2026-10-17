import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';
import { circleMarks } from './lib/m301-6-figures.ts';

const video: Explainer = {
  id: 'm301-6-1-d',
  lessonId: 'm301-6-1',
  title: 'Reciprocal, Quotient and Pythagorean Identities, Part 4: Simplifying Harder Expressions',
  thumbnailTitle: 'Simplifying Harder Expressions',
  thumbnail: false,
  summary: 'A four-step strategy for simplifying trigonometric expressions: write them in sine and cosine, combine fractions, replace sin²x + cos²x, then factor and divide out. Worked through cos x/(1 − sin x) − tan x = sec x, with its non-permissible values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.1 · Part 4', title: 'Simplifying Harder Expressions', subtitle: 'A four-step strategy' }],
      lines: [
        { say: 'Some expressions mix fractions, several functions and squares all at once. A plan keeps you from getting lost.', show: 'title' },
        { say: 'In this video, you will use a four-step strategy to simplify a harder expression, and state its non-permissible values.' },
      ],
    },
    {
      chapter: 'A strategy',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Step 1.** Write everything in terms of $\\sin x$ and $\\cos x$.', '**Step 2.** Combine fractions over a common denominator.', '**Step 3.** Look for $\\sin^2 x + \\cos^2 x$, or a rearrangement, and replace it.', '**Step 4.** Factor, then divide out common factors.'],
        },
      ],
      lines: [
        { say: 'Here is the strategy. Step one: write everything in terms of sine x and cosine x.', show: 'b.0', focus: 'b.0' },
        { say: 'Step two: combine fractions over a common denominator, just as you would with numbers.', show: 'b.1', focus: 'b.1' },
        { say: 'Step three: look for sine squared x plus cosine squared x, or one of its rearrangements, and replace it.', show: 'b.2', focus: 'b.2' },
        { say: 'Step four: factor, then divide out common factors.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Combining fractions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{\\cos x}{1 - \\sin x} - \\tan x', '= \\dfrac{\\cos x}{1 - \\sin x} - \\dfrac{\\sin x}{\\cos x}', '= \\dfrac{\\cos^2 x - \\sin x(1 - \\sin x)}{\\cos x(1 - \\sin x)}', '= \\dfrac{\\cos^2 x - \\sin x + \\sin^2 x}{\\cos x(1 - \\sin x)}'],
        },
      ],
      lines: [
        { say: 'Simplify cosine x over one minus sine x, minus tan x.', show: 'm.0', focus: 'm.0' },
        { say: 'Step one. The first fraction is already in sine and cosine. Tan x becomes sine x over cosine x.', show: 'm.1', focus: 'm.1' },
        { say: 'Step two. The common denominator is cosine x times one minus sine x. The first numerator is multiplied by cosine x, giving cosine squared x. The second is multiplied by one minus sine x.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand carefully. Minus sine x times one minus sine x is minus sine x plus sine squared x. Notice how the subtraction changes the sign of both terms.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Replace and divide out',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\cos^2 x + \\sin^2 x - \\sin x}{\\cos x(1 - \\sin x)}', '= \\dfrac{1 - \\sin x}{\\cos x(1 - \\sin x)}', '= \\dfrac{1}{\\cos x} = \\sec x'] },
      ],
      lines: [
        { say: 'Step three. Put cosine squared x and sine squared x side by side. Together they make one, so the numerator becomes one minus sine x.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Step four. The factor one minus sine x is in the numerator and in the denominator, so it divides out.', show: 'm.2', focus: 'm.2' },
        { say: 'That leaves one over cosine x, which is secant x. A long expression has become a single function.' },
      ],
    },
    {
      chapter: 'Non-permissible values',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('uc', [
          unitCircle({ r: 3 }),
          circleMarks(3, [
            { deg: 90, tex: '\\frac{\\pi}{2}', tone: 'opp', place: 'above right' },
            { deg: 270, tex: '\\frac{3\\pi}{2}', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos x \\ne 0:\\quad x \\ne \\dfrac{\\pi}{2},\\ \\dfrac{3\\pi}{2}', '\\sin x \\ne 1:\\quad x \\ne \\dfrac{\\pi}{2}', 'x \\ne \\dfrac{\\pi}{2} + \\pi n,\\ n \\in \\mathrm{I}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use the original expression', md: 'Take the restrictions from the expression you started with. Dividing out $1 - \\sin x$ hides $\\sin x \\ne 1$, but it still applies.' },
      ],
      lines: [
        { say: 'Now the non-permissible values. Take them from the original expression, before anything was divided out.', show: ['uc.axes', 'uc.circle'] },
        { say: 'Tan x, and the denominator cosine x, need cosine x not equal to zero. So x cannot be pi over two or three pi over two.', show: ['m.0', 'uc.m90', 'uc.m270'], focus: ['m.0', 'uc.m90', 'uc.m270'] },
        { say: 'The denominator one minus sine x cannot be zero either, so sine x cannot be one. That rules out pi over two, again.', show: 'm.1', focus: ['m.1', 'uc.m90'] },
        { say: 'The two values are half a turn apart. So for all real numbers, x cannot equal pi over two plus pi times n, where n is an integer. The answer is secant x, for those values of x.', show: 'm.2', focus: 'm.2' },
        { say: 'A common mistake is to look only at the simplified answer. Secant x does not show the restriction sine x not equal to one, but the original expression does, so it still applies.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{1}{\\cos x} - \\sin x\\tan x$.',
          choices: ['$\\sec x$', '$\\sin x$', '$\\cos x$', '$1$'],
          answer: 2,
          working: '$\\dfrac{1}{\\cos x} - \\dfrac{\\sin^2 x}{\\cos x} = \\dfrac{1 - \\sin^2 x}{\\cos x} = \\dfrac{\\cos^2 x}{\\cos x} = \\cos x$',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify one over cosine x, minus sine x times tan x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Sine x times tan x is sine squared x over cosine x. Over the common denominator, cosine x, the numerator is one minus sine squared x, which is cosine squared x. Divide out one cosine x, and cosine x is left. Choice A, secant x, is only the first term: it ignores the second term completely.', show: 'q.answer' },
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
          items: ['Write everything in sine and cosine, and combine fractions over a common denominator.', 'Replace $\\sin^2 x + \\cos^2 x$, or a rearrangement, then factor and divide out.', 'Take the non-permissible values from the original expression.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write everything in sine and cosine, and combine fractions over a common denominator.', show: 'sum.0' },
        { say: 'Replace sine squared x plus cosine squared x, or a rearrangement, then factor and divide out.', show: 'sum.1' },
        { say: 'And take the non-permissible values from the original expression, not from the answer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
