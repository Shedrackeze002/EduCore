import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-2-b',
  lessonId: 'm201-6-2',
  title: 'Multiplying and Dividing Rational Expressions, Part 2: Dividing',
  thumbnailTitle: 'Dividing Rational Expressions',
  thumbnail: 'm',
  summary: 'Dividing rational expressions by multiplying by the reciprocal, why the divisor’s numerator adds a restriction, the hidden division by zero at x = 3, and simplifying a mix of division and multiplication from left to right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.2 · Part 2', title: 'Dividing Rational Expressions', subtitle: 'Multiply by the reciprocal' }],
      lines: [
        { say: 'Dividing by a fraction means multiplying by its reciprocal. With rational expressions, that flip hides an extra restriction.', show: 'title' },
        { say: 'In this video, you will divide rational expressions, and simplify a mix of multiplication and division.' },
      ],
    },
    {
      chapter: 'Dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{A}{B} \\div \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C},\\quad B \\ne 0,\\ C \\ne 0,\\ D \\ne 0'] },
        { kind: 'bullets', id: 'b', items: ['Restrictions come from **both** denominators,', 'and from the **numerator of the divisor**.'] },
      ],
      lines: [
        { say: 'Dividing by a fraction means multiplying by its reciprocal. So "A" over B, divided by C over D, is "A" over B, times D over C.', show: 'm.0', focus: 'm.0' },
        { say: 'The new condition is that C is not zero. If the numerator of the divisor is zero, the divisor itself is zero, and you cannot divide by zero.' },
        { say: 'So a division has three sources of restrictions: both denominators, and the numerator of the divisor.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2 - x - 6}{x^2 - 16} \\div \\dfrac{x - 3}{x + 4} = \\dfrac{(x - 3)(x + 2)}{(x - 4)(x + 4)} \\div \\dfrac{x - 3}{x + 4}', 'x \\ne 4,\\ -4,\\ 3', '= \\dfrac{(x - 3)(x + 2)}{(x - 4)(x + 4)} \\times \\dfrac{x + 4}{x - 3} = \\dfrac{x + 2}{x - 4}'] }],
      lines: [
        { say: 'Simplify x squared, minus x, minus six, over x squared minus sixteen, divided by x minus three over x plus four. Factor first.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the restrictions. The denominators give x not equal to four, or negative four. And the divisor’s numerator gives x not equal to three.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply by the reciprocal, and divide out x minus three, and x plus four. The result is x plus two, over x minus four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The hidden restriction',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3:\\quad \\dfrac{0}{-7} \\div \\dfrac{0}{7}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Missing the hidden restriction', md: 'The answer $\\dfrac{x + 2}{x - 4}$ looks fine at $x = 3$, but the original is a division by $0$ there. Write the restrictions **before** you flip and cancel.' },
      ],
      lines: [
        { say: 'The answer, x plus two over x minus four, looks fine at x equals three. But the original division at x equals three is zero over negative seven, divided by zero over seven: a division by zero.', show: 'm.0', focus: 'm.0' },
        { say: 'So always write the restrictions before you flip and cancel.', show: 'oops' },
      ],
    },
    {
      chapter: 'Mixed operations',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{2x + 6}{x^2 - 4} \\div \\dfrac{x^2 + 3x}{x - 2} \\times \\dfrac{x + 2}{8}', 'x \\ne \\pm 2;\\quad x(x + 3) \\ne 0:\\ x \\ne 0,\\ -3', '\\dfrac{2(x + 3)}{(x - 2)(x + 2)} \\times \\dfrac{x - 2}{x(x + 3)} \\times \\dfrac{x + 2}{8} = \\dfrac{1}{4x}'] }],
      lines: [
        { say: 'With several operations, work from left to right, turning each division into multiplication by the reciprocal. Simplify two x plus six over x squared minus four, divided by x squared plus three x over x minus two, times x plus two over eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect all the restrictions first. The denominators give x not equal to two, or negative two. The divisor’s numerator, x times x plus three, gives x not equal to zero, or negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Flip the divisor, and divide out x plus three, x minus two, x plus two, and a factor of two. What is left is one over four x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the restrictions on $\\dfrac{x}{x + 1} \\div \\dfrac{x - 5}{x + 2}$?',
          choices: ['$x \\ne -2,\\ -1,\\ 5$', '$x \\ne -2,\\ -1$', '$x \\ne -1,\\ 5$', '$x \\ne 0,\\ -1,\\ -2,\\ 5$'],
          answer: 0,
          working: 'The denominators give $x \\ne -1$ and $x \\ne -2$, and the divisor’s numerator gives $x \\ne 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the restrictions on x over x plus one, divided by x minus five over x plus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The denominators give x not equal to negative one, or negative two, and the divisor’s numerator gives x not equal to five. B misses the hidden restriction, and D adds one from the first numerator, which is allowed to be zero.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Divide by multiplying by the reciprocal of the divisor.', 'Restrictions: every denominator, and the divisor’s numerator.', 'Write the restrictions before you flip and cancel.'] }],
      lines: [
        { say: 'Let’s sum up. To divide, multiply by the reciprocal of the divisor.', show: 'sum.0' },
        { say: 'The restrictions come from every denominator, and from the numerator of the divisor.', show: 'sum.1' },
        { say: 'And write the restrictions before you flip and cancel. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
