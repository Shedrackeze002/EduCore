import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-7-1-b',
  lessonId: 'm202-7-1',
  title: 'Solving Quadratic Equations by Graphing and Factoring, Part 2: Solving by Factoring',
  thumbnailTitle: 'Solving by Factoring',
  thumbnail: 'm',
  summary: 'The zero product property, solving x² + 2x − 15 = 0 by factoring, rearranging x² = 6x − 8 into standard form first, and why (x − 2)(x + 1) = 4 does not mean x − 2 = 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.1 · Part 2', title: 'Solving by Factoring', subtitle: 'The zero product property' }],
      lines: [
        { say: 'Graphs give roots that you can see. Factoring gives exact roots with just algebra, and it rests on one simple fact about zero.', show: 'title' },
        { say: 'In this video, you will solve quadratic equations by factoring.' },
      ],
    },
    {
      chapter: 'The zero product property',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Zero product property', md: 'If $mn = 0$, then $m = 0$ or $n = 0$ (or both).' },
        { kind: 'bullets', id: 'b', items: ['Write the equation in standard form, with $0$ on one side.', 'Factor the other side.', 'Set each factor equal to $0$ and solve.', 'Check each root in the original equation.'] },
      ],
      lines: [
        { say: 'If two numbers multiply to zero, at least one of them must be zero. That is the zero product property.', show: 'def' },
        { say: 'So to solve by factoring, first write the equation in standard form, with zero on one side. Then factor the other side.', show: ['b.0', 'b.1'] },
        { say: 'Set each factor equal to zero and solve. And check each root in the original equation.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A trinomial',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 + 2x - 15 = 0', '5 \\times (-3) = -15,\\quad 5 + (-3) = 2', '(x + 5)(x - 3) = 0', 'x = -5 \\text{ or } x = 3'] }],
      lines: [
        { say: 'Solve x squared, plus two x, minus fifteen, equals zero. It is already in standard form.', show: 'm.0', focus: 'm.0' },
        { say: 'Find two integers with a product of negative fifteen and a sum of two: five and negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'So the equation factors as x plus five, times x minus three, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Set each factor equal to zero: x is negative five, or x is three. Check three: nine plus six minus fifteen is zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Rearrange first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 = 6x - 8', 'x^2 - 6x + 8 = 0', '(x - 2)(x - 4) = 0', 'x = 2 \\text{ or } x = 4'] }],
      lines: [
        { say: 'Solve x squared equals six x minus eight. First get zero on one side: subtract six x and add eight.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now find a product of eight and a sum of negative six: negative two and negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is two, or x is four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Get zero on one side first',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Get 0 on one side first', md: '$(x - 2)(x + 1) = 4$ does **not** mean $x - 2 = 4$. The zero product property only works when the product is $0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 - x - 2 = 4 \\;\\Rightarrow\\; x^2 - x - 6 = 0', '(x - 3)(x + 2) = 0,\\quad x = 3 \\text{ or } x = -2'] },
      ],
      lines: [
        { say: 'Be careful: x minus two, times x plus one, equals four, does not mean x minus two is four. Two numbers can multiply to four in endless ways. The property only works for zero.', show: 'oops' },
        { say: 'Expand and rearrange instead: x squared, minus x, minus six, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Then factor: x minus three, times x plus two. So x is three, or negative two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - x = 12$.',
          choices: ['$x = 4$ or $x = -3$', '$x = -4$ or $x = 3$', '$x = 12$ or $x = 13$', '$x = 0$ or $x = 1$'],
          answer: 0,
          working: '$x^2 - x - 12 = 0$, so $(x - 4)(x + 3) = 0$, and $x = 4$ or $x = -3$. Check: $16 - 4 = 12$ ✓',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared minus x equals twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract twelve first: x squared, minus x, minus twelve, equals zero. That factors as x minus four, times x plus three. So x is four, or negative three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['If $mn = 0$, then $m = 0$ or $n = 0$.', 'Standard form, factor, set each factor to $0$, solve, check.', 'The product must be $0$ before you split it up.'] }],
      lines: [
        { say: 'Let’s sum up. If a product is zero, one of its factors is zero.', show: 'sum.0' },
        { say: 'To solve, write the equation in standard form, factor, set each factor to zero, solve, and check.', show: 'sum.1' },
        { say: 'And the product must be zero before you split it up. In part three, we handle special cases, and factor when "a" is not one. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
