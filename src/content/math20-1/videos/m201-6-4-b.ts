import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-4-b',
  lessonId: 'm201-6-4',
  title: 'Rational Equations, Part 2: Quadratic Results',
  thumbnailTitle: 'Rational Equations with Quadratics',
  thumbnail: 'm',
  summary: 'A rational equation that becomes the quadratic x² − 2x = 0, rejecting the root x = 2 against the restrictions and checking x = 0, then the number problem "a number plus its reciprocal is 10/3".',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.4 · Part 2', title: 'Quadratic Results', subtitle: 'One root kept, one rejected' }],
      lines: [
        { say: 'Clearing the denominators sometimes leaves a quadratic equation, with two roots. Often only one of them survives the check.', show: 'title' },
        { say: 'In this video, you will solve a rational equation that becomes quadratic, and a number problem.' },
      ],
    },
    {
      chapter: 'A quadratic result',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{x - 2} - \\dfrac{3}{x + 1} = \\dfrac{6}{x^2 - x - 2}', 'x^2 - x - 2 = (x - 2)(x + 1):\\quad x \\ne 2,\\ -1', 'x(x + 1) - 3(x - 2) = 6', 'x^2 - 2x = 0:\\quad x = 0 \\text{ or } x = 2'] }],
      lines: [
        { say: 'Solve x over x minus two, minus three over x plus one, equals six over x squared, minus x, minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor the last denominator: x minus two, times x plus one. So x cannot be two, or negative one, and the LCD is x minus two, times x plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply every term by the LCD: x times x plus one, minus three times x minus two, equals six.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand: x squared, plus x, minus three x, plus six, equals six. So x squared minus two x is zero, and x is zero, or two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check against the restrictions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 2:\\quad \\text{non-permissible, reject}', 'x = 0:\\quad \\dfrac{0}{-2} - \\dfrac{3}{1} = -3,\\quad \\dfrac{6}{-2} = -3 \\;\\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'The algebra produced $x = 2$ honestly, but it makes two denominators $0$. Compare every answer with the restrictions before you report it.' },
      ],
      lines: [
        { say: 'Reject x equals two: it is non-permissible.', show: 'm.0', focus: 'm.0' },
        { say: 'Check x equals zero. The left side is zero, minus three, which is negative three. The right side is six over negative two, which is also negative three. So the solution is x equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The algebra produced two honestly, yet it is not a solution, because it makes two of the denominators zero. Compare every answer with the restrictions before you report it.', show: 'oops' },
      ],
    },
    {
      chapter: 'A number problem',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x + \\dfrac{1}{x} = \\dfrac{10}{3},\\quad x \\ne 0', '3x^2 + 3 = 10x', '3x^2 - 10x + 3 = (3x - 1)(x - 3) = 0', 'x = 3 \\text{ or } x = \\tfrac{1}{3}'] }],
      lines: [
        { say: 'A number plus its reciprocal is ten thirds. Find the number. Let the number be x: x plus one over x equals ten thirds, where x is not zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by three x: three x squared, plus three, equals ten x.', show: 'm.1', focus: 'm.1' },
        { say: 'Rearrange, and factor: three x minus one, times x minus three, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So the number is three, or one third. Both are permitted, and both check: three plus one third is ten thirds.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{1}{x - 2} + \\dfrac{x}{x + 2} = \\dfrac{4}{x^2 - 4}$.',
          choices: ['$x = -1$', '$x = 2$ or $x = -1$', '$x = 2$', 'No solution'],
          answer: 0,
          working: 'Multiply by $(x - 2)(x + 2)$: $(x + 2) + x(x - 2) = 4$, so $x^2 - x - 2 = 0$ and $x = 2$ or $x = -1$. Reject $x = 2$, which is non-permissible.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve one over x minus two, plus x over x plus two, equals four over x squared minus four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply by x minus two, times x plus two: x plus two, plus x times x minus two, equals four. That gives x squared, minus x, minus two, equals zero, so x is two, or negative one. Two is non-permissible, so reject it. B keeps the extraneous root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Clearing the denominators can leave a quadratic: solve it fully.', 'Reject roots that are non-permissible.', 'Check the rest in the original equation.'] }],
      lines: [
        { say: 'Let’s sum up. Clearing the denominators can leave a quadratic equation, so solve it fully.', show: 'sum.0' },
        { say: 'Reject any root that is non-permissible.', show: 'sum.1' },
        { say: 'And check the rest in the original equation. In part three, we solve work and travel problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
