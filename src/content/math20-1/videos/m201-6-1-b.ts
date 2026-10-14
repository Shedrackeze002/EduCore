import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-1-b',
  lessonId: 'm201-6-1',
  title: 'Rational Expressions, Part 2: Equivalent Expressions',
  thumbnailTitle: 'Equivalent Rational Expressions',
  thumbnail: 'm',
  summary: 'Denominators that are never zero, such as x² + 4, and using the discriminant to tell; why dividing out a common factor is multiplying by 1; and why the simplified expression keeps the restrictions of the original, checked at x = 3 and x = 1.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.1 · Part 2', title: 'Equivalent Expressions', subtitle: 'Why cancelling works, and when' }],
      lines: [
        { say: 'Six eighths and three quarters are the same number. Rational expressions can be equivalent in the same way, but with a catch.', show: 'title' },
        { say: 'In this video, you will see when a denominator is never zero, and why the restrictions of an expression stay with it when you simplify.' },
      ],
    },
    {
      chapter: 'Never zero',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{5}{x^2 + 4}:\\quad x^2 \\ge 0,\\ \\ x^2 + 4 \\ge 4', '\\dfrac{1}{x^2 + x + 1}:\\quad b^2 - 4ac = 1 - 4 = -3 < 0'] }],
      lines: [
        { say: 'Some denominators are never zero. In five over x squared plus four, x squared is at least zero, so x squared plus four is at least four. There are no non-permissible values.', show: 'm.0', focus: 'm.0' },
        { say: 'For a trinomial that does not factor, check the discriminant. In one over x squared, plus x, plus one, the discriminant is one minus four, which is negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'It is negative, so the denominator has no real zeros, and every value of x is permitted.' },
      ],
    },
    {
      chapter: 'Equivalent expressions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6}{8} = \\dfrac{2 \\cdot 3}{2 \\cdot 4} = \\dfrac{3}{4}', '\\dfrac{(x + 2)(x - 1)}{(x - 1)(x + 5)} = \\dfrac{x + 2}{x + 5} \\cdot \\dfrac{x - 1}{x - 1} = \\dfrac{x + 2}{x + 5}', 'x \\ne 1,\\ -5'] }],
      lines: [
        { say: 'For any number k that is not zero, k over k is one. That is why six eighths is three quarters: the factor two over two is one.', show: 'm.0', focus: 'm.0' },
        { say: 'It works the same way with polynomial factors. x plus two, times x minus one, over x minus one, times x plus five, is x plus two over x plus five, times x minus one over x minus one, which is one.', show: 'm.1', focus: 'm.1' },
        { say: 'So the two expressions are equivalent, as long as x is not one, and not negative five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Restrictions travel',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$x$', 'original', 'simplified'], rows: [['$3$', '$\\tfrac{5}{8}$', '$\\tfrac{5}{8}$'], ['$1$', '$\\tfrac{0}{0}$: undefined', '$\\tfrac{1}{2}$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Why cancelling is legal', md: 'Dividing out $x - 1$ is multiplying by $\\dfrac{x - 1}{x - 1} = 1$ in reverse. It is allowed only when $x - 1 \\ne 0$, which is what the restriction promises.' },
      ],
      lines: [
        { say: 'Check some values. At x equals three, both expressions equal five eighths.', show: 't' },
        { say: 'But at x equals one, the original is zero over zero, which is undefined, while x plus two over x plus five equals one half.' },
        { say: 'So they are equivalent only with the restriction x not equal to one. The restrictions of the original expression always travel with the simplified one.' },
        { say: 'Dividing out a common factor is multiplying by x minus one over x minus one, which is one, in reverse. It is allowed only when that factor is not zero, which is exactly what the restriction promises.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\dfrac{(x + 3)(x - 4)}{(x - 4)(x + 1)}$ simplifies to $\\dfrac{x + 3}{x + 1}$. What are the restrictions?',
          choices: ['$x \\ne 4,\\ -1$', '$x \\ne -1$', '$x \\ne 4$', '$x \\ne -3,\\ 4,\\ -1$'],
          answer: 0,
          working: 'The restrictions come from the original denominator, $(x - 4)(x + 1)$: $x \\ne 4$ and $x \\ne -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. x plus three, times x minus four, over x minus four, times x plus one, simplifies to x plus three over x plus one. What are the restrictions? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The restrictions come from the original denominator, so x cannot be four or negative one. B forgets the factor that was divided out, and D uses the numerator.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A denominator like $x^2 + 4$, or one with $b^2 - 4ac < 0$, is never zero.', 'Dividing out a common factor multiplies by $1$.', 'The restrictions of the original stay with the simplified expression.'] }],
      lines: [
        { say: 'Let’s sum up. A denominator like x squared plus four, or a trinomial with a negative discriminant, is never zero.', show: 'sum.0' },
        { say: 'Dividing out a common factor is multiplying by one, in reverse.', show: 'sum.1' },
        { say: 'And the restrictions of the original expression stay with the simplified one. In part three, we simplify rational expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
