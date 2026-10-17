import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-6-3-b',
  lessonId: 'm301-6-3',
  title: 'Proving Identities, Part 2: Proving an Identity with Algebra',
  thumbnailTitle: 'Proving an Identity',
  thumbnail: false,
  summary: 'The strategies for an algebraic proof: work on one side until it matches the other, using sine and cosine, common denominators, identities, factoring and conjugates. Proving sin x/(1 − cos x) = (1 + cos x)/sin x, and why you must not treat an identity as an equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.3 · Part 2', title: 'Proving an Identity', subtitle: 'Work on one side until it matches the other' }],
      lines: [
        { say: 'A proof shows, step by step, that the two sides of an identity are equal for every permissible value. No checking of examples can do that.', show: 'title' },
        { say: 'In this video, you will learn the strategies for an algebraic proof, prove an identity by multiplying by a conjugate, and see the moves that are not allowed.' },
      ],
    },
    {
      chapter: 'Strategies',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two separate expressions', md: 'Work on one side, usually the more complicated one, until it looks exactly like the other side. Or simplify each side separately to the same expression.' },
        {
          kind: 'bullets',
          id: 'b',
          items: ['Rewrite in terms of $\\sin x$ and $\\cos x$.', 'Use a common denominator, or split a single fraction into two.', 'Replace $\\sin^2 x + \\cos^2 x$, $1 - \\sin^2 x$, $1 + \\tan^2 x$, $\\sin 2x$ or $\\cos 2x$ using an identity.', 'Factor, expand, or multiply by a conjugate such as $\\dfrac{1 + \\cos x}{1 + \\cos x}$.'],
        },
      ],
      lines: [
        { say: 'Treat the two sides as separate expressions. Work on one side, usually the more complicated one, until it looks exactly like the other side. Or simplify each side separately until both reach the same expression.', show: 'key' },
        { say: 'Here are the moves that help. First, rewrite everything in terms of sine x and cosine x.', show: 'b.0', focus: 'b.0' },
        { say: 'Use a common denominator, or split a single fraction into two.', show: 'b.1', focus: 'b.1' },
        { say: 'Replace a Pythagorean pattern or a double angle using an identity.', show: 'b.2', focus: 'b.2' },
        { say: 'And factor, expand, or multiply by a conjugate, such as one plus cosine x over one plus cosine x. That fraction equals one, so multiplying by it does not change the value.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Multiplying by a conjugate',
      layout: 'split',
      leftWidth: 440,
      left: [
        { kind: 'text', id: 'goal', size: 'md', md: 'Prove:' },
        { kind: 'math', id: 'p', size: 'md', lines: ['\\dfrac{\\sin x}{1 - \\cos x} = \\dfrac{1 + \\cos x}{\\sin x}'] },
        { kind: 'callout', id: 'why', tone: 'tip', title: 'Why the conjugate?', md: '$(1 - \\cos x)(1 + \\cos x)$ is $1 - \\cos^2 x$, which is $\\sin^2 x$.' },
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{Left side} = \\dfrac{\\sin x}{1 - \\cos x}\\cdot\\dfrac{1 + \\cos x}{1 + \\cos x}', '= \\dfrac{\\sin x(1 + \\cos x)}{1 - \\cos^2 x}', '= \\dfrac{\\sin x(1 + \\cos x)}{\\sin^2 x}', '= \\dfrac{1 + \\cos x}{\\sin x} = \\text{Right side}'],
        },
      ],
      lines: [
        { say: 'Prove that sine x over one minus cosine x equals one plus cosine x over sine x.', show: ['goal', 'p'] },
        { say: 'Work on the left side. Its denominator, one minus cosine x, has a partner: one plus cosine x. Their product is one minus cosine squared x, which is sine squared x.', show: 'why' },
        { say: 'So multiply the left side by one plus cosine x over one plus cosine x. This is multiplying by one, so the value does not change.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply out the denominator: one minus cosine x, times one plus cosine x, is one minus cosine squared x. Leave the numerator factored.', show: 'm.1', focus: 'm.1' },
        { say: 'By the Pythagorean identity, one minus cosine squared x is sine squared x.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide out one factor of sine x. That leaves one plus cosine x over sine x, which is exactly the right side. The proof is complete.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Where it is true',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Left side: } 1 - \\cos x \\ne 0,\\ \\text{ so } x \\ne 2\\pi n', '\\text{Right side: } \\sin x \\ne 0,\\ \\text{ so } x \\ne \\pi n', 'x \\ne \\pi n,\\ n \\in \\mathrm{I}'] },
      ],
      lines: [
        { say: 'An identity is only true where both sides are defined. On the left side, one minus cosine x cannot be zero, so x cannot be a multiple of two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'On the right side, sine x cannot be zero, so x cannot be a multiple of pi. That includes the multiples of two pi.', show: 'm.1', focus: 'm.1' },
        { say: 'So the identity is true for x not equal to pi times n, where n is an integer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Treating it as an equation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Treating it as an equation', md: 'Do not add the same thing to both sides, cross-multiply, or square both sides. Those moves assume the two sides are already equal, which is what you are trying to prove.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1 + \\sin x}{\\sin x} = \\dfrac{1}{\\sin x} + \\dfrac{\\sin x}{\\sin x} = \\csc x + 1,\\ \\text{ not } 1'] },
      ],
      lines: [
        { say: 'Here is the biggest mistake to avoid. A proof is not an equation to solve. Do not add the same thing to both sides, cross-multiply, or square both sides.', show: 'oops' },
        { say: 'Those moves assume the two sides are already equal, and that is exactly what you are trying to prove. Keep the two sides apart, and change only one side at a time.' },
        { say: 'And never cancel terms. One plus sine x, over sine x, splits into one over sine x plus sine x over sine x. That is cosecant x plus one, not one. Only a factor of the whole numerator and the whole denominator can be divided out.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To prove $\\dfrac{\\cos x}{1 + \\sin x} = \\dfrac{1 - \\sin x}{\\cos x}$, which first step is valid?',
          choices: ['Cross-multiply: $\\cos^2 x = (1 + \\sin x)(1 - \\sin x)$', 'Multiply the left side by $\\dfrac{1 - \\sin x}{1 - \\sin x}$', 'Square both sides', 'Cancel the $1$s on the left: $\\dfrac{\\cos x}{\\sin x}$'],
          answer: 1,
          working: 'Left side $= \\dfrac{\\cos x(1 - \\sin x)}{1 - \\sin^2 x} = \\dfrac{\\cos x(1 - \\sin x)}{\\cos^2 x} = \\dfrac{1 - \\sin x}{\\cos x}$, the right side.',
        },
      ],
      lines: [
        { say: 'Your turn. To prove cosine x over one plus sine x equals one minus sine x over cosine x, which first step is valid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Multiplying by one minus sine x over one minus sine x is multiplying by one, and it turns the denominator into one minus sine squared x, which is cosine squared x. Choices A and C treat the identity as an equation that is already true, and choice D cancels terms instead of factors.', show: 'q.answer' },
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
          items: ['Work on one side, or on each side separately, until both sides match.', 'Use sine and cosine, common denominators, identities, factoring and conjugates. Never move terms across the equals sign.', 'State where the identity is true, from the restrictions on both sides.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To prove an identity, work on one side, or on each side separately, until both sides match.', show: 'sum.0' },
        { say: 'Use sine and cosine, common denominators, identities, factoring and conjugates. Never move terms across the equals sign.', show: 'sum.1' },
        { say: 'And state where the identity is true, from the restrictions on both sides. In part three, you will prove an identity with a double angle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
