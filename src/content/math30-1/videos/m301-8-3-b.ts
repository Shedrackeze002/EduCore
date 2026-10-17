import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-3-b',
  lessonId: 'm301-8-3',
  title: 'Connecting Graphs and Rational Equations, Part 2: Extraneous Roots',
  thumbnailTitle: 'Extraneous Roots',
  summary: 'Why multiplying by an expression that can be zero can create an extraneous root, solving 2/(x − 3) + x/(x + 1) = 8/(x² − 2x − 3) and rejecting the root x = 3, and an equation in which every root is rejected, so it has no solution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.3 · Part 2', title: 'Extraneous Roots', subtitle: 'Roots that make a denominator zero' }],
      lines: [
        { say: 'Multiplying both sides of an equation by an expression that can be zero is risky. It can create a root that does not satisfy the original equation.', show: 'title' },
        { say: 'In this video, you will solve a rational equation with an extraneous root, reject it, and see when an equation has no solution at all.' },
      ],
    },
    {
      chapter: 'Extraneous roots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'A root of the simplified (polynomial) equation that is not a solution of the original equation, usually because it is a non-permissible value.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 3:\\quad (x - 3) \\cdot \\text{anything} = 0'] },
      ],
      lines: [
        { say: 'An extraneous root is a root of the simplified polynomial equation that is not a solution of the original equation. Usually, it is a non-permissible value.', show: 'def' },
        { say: 'Why does this happen? Suppose you multiply both sides by x minus three. When x is three, you are multiplying both sides by zero, and zero times anything is zero.', show: 'm' },
        { say: 'So the new equation can be true at x equals three, even though the original equation is undefined there.' },
      ],
    },
    {
      chapter: 'Clearing the fractions',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{2}{x - 3} + \\dfrac{x}{x + 1} = \\dfrac{8}{x^2 - 2x - 3}',
            'x^2 - 2x - 3 = (x - 3)(x + 1):\\quad x \\ne 3,\\ x \\ne -1',
            '2(x + 1) + x(x - 3) = 8',
            '2x + 2 + x^2 - 3x = 8 \\quad\\to\\quad x^2 - x + 2 = 8',
            'x^2 - x - 6 = 0 \\quad\\to\\quad (x - 3)(x + 2) = 0',
          ],
        },
      ],
      lines: [
        { say: 'Solve two over x minus three, plus x over x plus one, equals eight over x squared minus two x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor the last denominator: x minus three, times x plus one. So the non-permissible values are x equals three and x equals negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'The LCD is x minus three, times x plus one. Multiply every term by it. The first term keeps x plus one: two times x plus one. The second term keeps x minus three: x times x minus three. And the right side is just eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand: two x plus two, plus x squared minus three x. That is x squared minus x plus two, equals eight.', show: 'm.3', focus: 'm.3' },
        { say: 'Subtract eight: x squared minus x minus six equals zero, which factors as x minus three, times x plus two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Reject and check',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x = 3 \\quad\\text{or}\\quad x = -2',
            'x = 3 \\text{ is non-permissible: extraneous}',
            '\\text{left: } \\dfrac{2}{-5} + \\dfrac{-2}{-1} = -0.4 + 2 = 1.6',
            '\\text{right: } \\dfrac{8}{4 + 4 - 3} = \\dfrac{8}{5} = 1.6\\ \\checkmark',
            'x = -2',
          ],
        },
      ],
      lines: [
        { say: 'So the roots are x equals three and x equals negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'But three is a non-permissible value: it makes two of the denominators zero. It is extraneous, so reject it.', show: 'm.1', focus: 'm.1' },
        { say: 'Check negative two. The left side is two over negative five, plus negative two over negative one: negative 0.4 plus two, which is 1.6.', show: 'm.2', focus: 'm.2' },
        { say: 'The right side is eight over four plus four minus three: eight fifths, which is also 1.6.', show: 'm.3', focus: 'm.3' },
        { say: 'So the equation has only one solution: x equals negative two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Skipping the check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'The quadratic $x^2 - x - 6 = 0$ has two roots, but the equation has only one solution. Always compare your roots with the non-permissible values. If every root is rejected, the equation has **no solution**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{x - 2} = \\dfrac{2}{x - 2},\\quad x \\ne 2', 'x = 2 \\ \\text{ is rejected: no solution}'] },
      ],
      lines: [
        { say: 'The most common mistake is to stop after factoring. The quadratic has two roots, but the equation has only one solution.', show: 'oops' },
        { say: 'So always compare your roots with the non-permissible values before you give an answer.' },
        { say: 'And if every root is rejected, the equation has no solution. For example, solve x over x minus two equals two over x minus two. The non-permissible value is two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiplying both sides by x minus two gives x equals two. But two is non-permissible, so it is rejected, and this equation has no solution.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x^2}{x + 3} = \\dfrac{9}{x + 3}$.',
          choices: ['$x = 3$', '$x = -3$', '$x = 3$ or $x = -3$', 'No solution'],
          answer: 0,
          working: '$x \\ne -3$. Multiply by $x + 3$: $x^2 = 9$, so $x = \\pm 3$. $x = -3$ is non-permissible, so it is extraneous. Check $x = 3$: $\\dfrac{9}{6} = \\dfrac{9}{6}$ ✓.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared over x plus three equals nine over x plus three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiplying by x plus three gives x squared equals nine, so x is three or negative three. But negative three makes the denominators zero, so it is extraneous. Choice C forgets to reject it.', show: 'q.answer' },
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
          items: [
            'An extraneous root solves the polynomial equation but not the original one.',
            'Reject every root that is a non-permissible value.',
            'If every root is rejected, the equation has no solution.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. An extraneous root solves the polynomial equation, but not the original one.', show: 'sum.0' },
        { say: 'Reject every root that is a non-permissible value, and check the others.', show: 'sum.1' },
        { say: 'If every root is rejected, the equation has no solution. In part three, we solve rational equations with graphs, and see extraneous roots as holes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
