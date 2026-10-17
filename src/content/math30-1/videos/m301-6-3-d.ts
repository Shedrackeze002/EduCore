import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-6-3-d',
  lessonId: 'm301-6-3',
  title: 'Proving Identities, Part 4: Finding the Error in a Proof',
  thumbnailTitle: 'Finding the Error in a Proof',
  thumbnail: false,
  summary: 'The usual errors in a proof (a missing middle term, a lost sign or square, the wrong identity, sin 2x written as 2 sin x, and a subtraction that does not change every sign), and how substituting x = 30° into two consecutive lines finds the first wrong step.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.3 · Part 4', title: 'Finding the Error in a Proof', subtitle: 'Find the first line that does not follow' }],
      lines: [
        { say: 'Sometimes a proof ends at something that does not match the other side. That does not always mean the equation is not an identity. Often, there is a mistake along the way.', show: 'title' },
        { say: 'In this video, you will learn the usual errors, and a quick test that finds the first wrong line.' },
      ],
    },
    {
      chapter: 'The usual culprits',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A missing middle term: $(\\sin x + \\cos x)^2 = \\sin^2 x + 2\\sin x\\cos x + \\cos^2 x$',
            'A lost sign or square: $1 - \\sin^2 x = \\cos^2 x$',
            'The wrong identity: $1 + \\tan^2 x = \\sec^2 x$, but $1 + \\cot^2 x = \\csc^2 x$',
            '$\\sin 2x$ written as $2\\sin x$',
            'Subtracting a fraction without changing the sign of every term in its numerator',
          ],
        },
      ],
      lines: [
        { say: 'When a proof ends in a mismatch, look for the first line that is not equal to the line before it. Here are the usual culprits.' },
        { say: 'A missing middle term. Sine x plus cosine x, all squared, is sine squared x, plus two sine x cosine x, plus cosine squared x.', show: 'b.0', focus: 'b.0' },
        { say: 'A sign or a square lost in a Pythagorean identity. One minus sine squared x is cosine squared x.', show: 'b.1', focus: 'b.1' },
        { say: 'The wrong identity. One plus tan squared x is secant squared x, but one plus cotangent squared x is cosecant squared x.', show: 'b.2', focus: 'b.2' },
        { say: 'Sine two x written as two sine x.', show: 'b.3', focus: 'b.3' },
        { say: 'And subtracting a fraction without changing the sign of every term in its numerator.', show: 'b.4', focus: 'b.4' },
      ],
    },
    {
      chapter: 'A proof that goes wrong',
      layout: 'center',
      main: [
        { kind: 'text', id: 'goal', size: 'md', md: 'A student tries to prove $(\\sin x + \\cos x)^2 = 1 + \\sin 2x$ by working on the left side:' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } (\\sin x + \\cos x)^2 = \\sin^2 x + \\cos^2 x', '\\text{Step 2: } = 1', '1 \\ne 1 + \\sin 2x,\\ \\text{ so it is not an identity?}'] },
      ],
      lines: [
        { say: 'A student tries to prove that sine x plus cosine x, all squared, equals one plus sine two x, by working on the left side.', show: 'goal' },
        { say: 'In step one, the student squares the bracket and writes sine squared x plus cosine squared x.', show: 'm.0', focus: 'm.0' },
        { say: 'In step two, that becomes one, by the Pythagorean identity.', show: 'm.1', focus: 'm.1' },
        { say: 'One does not match one plus sine two x, so the student concludes that the equation is not an identity. Is that right?', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Test the suspicious line',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Test the suspicious line', md: 'Substitute a value such as $x = 30^\\circ$ into two consecutive lines. If they give different numbers, the error is between them.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(\\sin 30^\\circ + \\cos 30^\\circ)^2 = \\left(\\dfrac{1 + \\sqrt{3}}{2}\\right)^2 \\approx 1.866', '\\sin^2 30^\\circ + \\cos^2 30^\\circ = 1'] },
      ],
      lines: [
        { say: 'Here is a quick test. Substitute a value such as thirty degrees into two consecutive lines. If they give different numbers, the error is between them.', show: 'tip' },
        { say: 'Before step one, the expression is sine thirty degrees plus cosine thirty degrees, all squared. That is one plus root three, over two, all squared: about 1.866.', show: 'm.0', focus: 'm.0' },
        { say: 'After step one, it is sine squared thirty degrees plus cosine squared thirty degrees, which is one. The numbers differ, so step one is wrong.', show: 'm.1', focus: 'm.1' },
        { say: 'The culprit is the missing middle term. Squaring a sum is not the same as squaring each term.' },
      ],
    },
    {
      chapter: 'The correct proof',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Left side} = (\\sin x + \\cos x)^2', '= \\sin^2 x + 2\\sin x\\cos x + \\cos^2 x', '= 1 + 2\\sin x\\cos x', '= 1 + \\sin 2x = \\text{Right side}'] },
      ],
      lines: [
        { say: 'Here is the correct proof. Start with the left side, sine x plus cosine x, all squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand it fully: sine squared x, plus two sine x cosine x, plus cosine squared x.', show: 'm.1', focus: 'm.1' },
        { say: 'Sine squared x plus cosine squared x is one, so this is one plus two sine x cosine x.', show: 'm.2', focus: 'm.2' },
        { say: 'And two sine x cosine x is sine two x. So the left side equals one plus sine two x, the right side. It was an identity after all.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student works on the left side of $\\sec^2 x - \\tan^2 x + \\cot^2 x = \\csc^2 x$, gets $\\sec^2 x$, and decides it is not an identity. Which step has the first error?',
          choices: ['Step 1: $(1 + \\tan^2 x) - \\tan^2 x + \\cot^2 x$', 'Step 2: $1 + \\cot^2 x$', 'Step 3: $\\sec^2 x$', 'No error: it is not an identity.'],
          answer: 2,
          working: '$1 + \\cot^2 x = \\csc^2 x$, not $\\sec^2 x$: Step 3 uses the wrong Pythagorean identity. The left side does equal $\\csc^2 x$, so it is an identity.',
        },
      ],
      lines: [
        { say: 'Your turn. A student works on the left side of secant squared x minus tan squared x plus cotangent squared x, equals cosecant squared x. The student gets secant squared x, and decides it is not an identity. Which step has the first error? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Step three uses the wrong identity: one plus cotangent squared x is cosecant squared x, not secant squared x. So the left side does equal cosecant squared x, and it is an identity. Step one is correct, because secant squared x is one plus tan squared x.', show: 'q.answer' },
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
          items: ['When a proof ends in a mismatch, look for an error before deciding the equation is not an identity.', 'Watch for a missing middle term, a lost sign or square, the wrong identity, and $\\sin 2x$ written as $2\\sin x$.', 'Test two consecutive lines at a value such as $x = 30^\\circ$: if they differ, the error is between them.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. When a proof ends in a mismatch, look for an error before deciding that the equation is not an identity.', show: 'sum.0' },
        { say: 'Watch for a missing middle term, a lost sign or square, the wrong identity, and sine two x written as two sine x.', show: 'sum.1' },
        { say: 'And test two consecutive lines at a value such as thirty degrees: if they differ, the error is between them. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
