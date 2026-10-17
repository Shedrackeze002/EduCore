import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-8-3',
  lessonId: 'm301-8-3',
  title: 'Connecting Graphs and Rational Equations, Part 1: Solving Algebraically',
  thumbnailTitle: 'Solving Rational Equations',
  summary: 'Solving rational equations with algebra in four steps: state the non-permissible values, multiply every term by the lowest common denominator, solve the polynomial equation, and check, for (x + 5)/(x − 1) = 3 and x + 6/x = 5. Parts 2 to 4 cover extraneous roots, graphs and applications.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.3 · Part 1', title: 'Solving Rational Equations', subtitle: 'Clear the fractions with the LCD' }],
      lines: [
        { say: 'Two resistors in parallel, two workers sharing a job, a boat fighting a river current: each of these leads to an equation with the variable in a denominator.', show: 'title' },
        { say: 'That is a rational equation. In this video, you will solve rational equations with algebra, in four steps.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Factor every denominator and state the **non-permissible values**.',
            'Multiply every term by the **lowest common denominator** (LCD) to clear the fractions.',
            'Solve the resulting polynomial equation.',
            'Reject any root that is non-permissible, and check the others.',
          ],
        },
      ],
      lines: [
        { say: 'To solve a rational equation, first factor every denominator, and state the non-permissible values: the values of x that make a denominator zero.', show: 'b.0', focus: 'b.0' },
        { say: 'Next, multiply every term by the lowest common denominator, the LCD. That clears all the fractions.', show: 'b.1', focus: 'b.1' },
        { say: 'Then solve the polynomial equation that is left.', show: 'b.2', focus: 'b.2' },
        { say: 'Finally, reject any root that is non-permissible, and check the others in the original equation.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'One solution',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{x + 5}{x - 1} = 3,\\quad x \\ne 1',
            '(x - 1) \\cdot \\dfrac{x + 5}{x - 1} = 3(x - 1)',
            'x + 5 = 3x - 3',
            '8 = 2x \\quad\\to\\quad x = 4',
            '\\text{check: } \\dfrac{4 + 5}{4 - 1} = \\dfrac{9}{3} = 3\\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Solve x plus five, over x minus one, equals three.', show: 'm.0' },
        { say: 'The denominator, x minus one, is zero when x is one. So the non-permissible value is x equals one.', focus: 'm.0' },
        { say: 'Multiply both sides by x minus one. On the left, x minus one cancels, leaving x plus five. On the right, three times x minus one is three x minus three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Subtract x from both sides, and add three: eight equals two x, so x equals four.', show: 'm.3', focus: 'm.3' },
        { say: 'Four is permissible. Check it: four plus five, over four minus one, is nine over three, which is three. It works.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A quadratic',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x + \\dfrac{6}{x} = 5,\\quad x \\ne 0',
            'x \\cdot x + x \\cdot \\dfrac{6}{x} = 5x',
            'x^2 + 6 = 5x \\quad\\to\\quad x^2 - 5x + 6 = 0',
            '(x - 2)(x - 3) = 0 \\quad\\to\\quad x = 2 \\text{ or } x = 3',
            '2 + \\dfrac{6}{2} = 5\\ \\checkmark \\qquad 3 + \\dfrac{6}{3} = 5\\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Solve x plus six over x equals five. The non-permissible value is x equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by x, including the x on the left and the five on the right. x times x is x squared, and x times six over x is six.', show: 'm.1', focus: 'm.1' },
        { say: 'So x squared plus six equals five x. Move everything to one side: x squared minus five x plus six equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Factor: x minus two, times x minus three, equals zero. So x is two, or x is three. Neither is zero, so both are permissible.', show: 'm.3', focus: 'm.3' },
        { say: 'Check them. Two plus six over two is two plus three: five. And three plus six over three is three plus two: five. Both are solutions.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Multiply every term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'mistake', title: 'Multiply every term', md: 'Multiply **every** term on **both** sides by the LCD, not just the fractions. Writing $x^2 + 6 = 5$ forgets to multiply $5$ by $x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\bad{x^2 + 6 = 5} \\qquad \\good{x^2 + 6 = 5x}'] },
      ],
      lines: [
        { say: 'A common slip is to multiply only the fractions by the LCD.', show: 'tip' },
        { say: 'If you multiply the left side by x but forget the five on the right, you get x squared plus six equals five, which has no real solutions at all.', show: 'm', focus: 'm' },
        { say: 'Every term, on both sides, must be multiplied by the LCD, so that the equation stays balanced.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{x + 7}{x - 2} = 4$.',
          choices: ['$x = 3$', '$x = 5$', '$x = 2$', '$x = -5$'],
          answer: 1,
          working: '$x \\ne 2$. Multiply by $x - 2$: $x + 7 = 4x - 8$, so $15 = 3x$ and $x = 5$. Check: $\\dfrac{12}{3} = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x plus seven, over x minus two, equals four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Multiply both sides by x minus two: x plus seven equals four x minus eight. So fifteen equals three x, and x equals five. Check: twelve over three is four. Choice A multiplies the x by four, but forgets to multiply the two by four.', show: 'q.answer' },
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
          items: ['State the non-permissible values first.', 'Multiply every term by the LCD to clear the fractions.', 'Solve, then check each root in the original equation.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Start by stating the non-permissible values.', show: 'sum.0' },
        { say: 'Multiply every term by the LCD, to clear the fractions.', show: 'sum.1' },
        { say: 'Then solve, and check each root in the original equation. In part two, we meet roots that do not work: extraneous roots. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
