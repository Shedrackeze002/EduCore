import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-4',
  lessonId: 'm201-6-4',
  title: 'Rational Equations, Part 1: Multiplying by the LCD',
  thumbnailTitle: 'Solving Rational Equations',
  thumbnail: 'm',
  summary: 'Solving rational equations by multiplying every term by the lowest common denominator, as in 3/x + 1/(2x) = 7/4, and why x/(x − 3) = 3/(x − 3) + 2 has no solution because its only root is extraneous. Parts 2 and 3 cover quadratic results and word problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.4 · Part 1', title: 'Solving Rational Equations', subtitle: 'Multiply by the LCD' }],
      lines: [
        { say: 'Aisha can clear the snow from the community rink in four hours, and Mateo in six. How long will it take them together? Not five hours, and not ten: the answer comes from a rational equation.', show: 'title' },
        { say: 'In this video, you will solve rational equations by multiplying by the LCD, and see why some answers must be rejected.' },
      ],
    },
    {
      chapter: 'Multiplying by the LCD',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'bullets', id: 'b', items: ['Find the non-permissible values.', 'Multiply **every** term by the LCD.', 'Solve the polynomial equation.', 'Reject non-permissible values; check the rest.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3}{x} + \\dfrac{1}{2x} = \\dfrac{7}{4},\\quad x \\ne 0', '\\text{LCD} = 4x:\\quad 12 + 2 = 7x', 'x = 2', '\\tfrac{3}{2} + \\tfrac{1}{4} = \\tfrac{7}{4} \\;\\checkmark'] }],
      lines: [
        { say: 'A rational equation has the variable in a denominator. To solve one, find the non-permissible values, and multiply every term on both sides by the LCD, so the denominators disappear. Then solve, reject any non-permissible answer, and check the others.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Solve three over x, plus one over two x, equals seven quarters. The restriction is x not equal to zero, and the LCD is four x.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply every term by four x. Four x times three over x is twelve, four x times one over two x is two, and four x times seven quarters is seven x.', show: 'm.1', focus: 'm.1' },
        { say: 'So fourteen equals seven x, and x is two. Check: three halves plus one quarter is seven quarters.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Extraneous roots',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'A solution of the multiplied-out equation that is not a solution of the original equation. In a rational equation, it is always a non-permissible value.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{x - 3} = \\dfrac{3}{x - 3} + 2,\\quad x \\ne 3', 'x = 3 + 2(x - 3)', 'x = 2x - 3:\\quad x = 3', '\\text{non-permissible: no solution}'] },
      ],
      lines: [
        { say: 'Multiplying by an expression that contains the variable can create answers that do not satisfy the original equation. These extraneous roots are always non-permissible values.', show: 'def' },
        { say: 'Solve x over x minus three, equals three over x minus three, plus two. The restriction is x not equal to three. Multiply every term by x minus three: x equals three, plus two times x minus three.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So x equals two x minus three, and x is three.', show: 'm.2', focus: 'm.2' },
        { say: 'But three is non-permissible: it makes the denominators zero. So it is extraneous, and the equation has no solution.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\dfrac{5}{x} - \\dfrac{1}{3x} = \\dfrac{2}{3}$.',
          choices: ['$x = 7$', '$x = \\tfrac{1}{7}$', '$x = 6$', 'No solution'],
          answer: 0,
          working: 'Multiply every term by $3x$: $15 - 1 = 2x$, so $x = 7$. Check: $\\tfrac{5}{7} - \\tfrac{1}{21} = \\tfrac{14}{21} = \\tfrac{2}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five over x, minus one over three x, equals two thirds. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The LCD is three x. Multiply every term by it: fifteen minus one equals two x, so x is seven. Check: five sevenths minus one twenty-first is fourteen twenty-firsts, which is two thirds.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['State the non-permissible values first.', 'Multiply every term by the LCD to clear the denominators.', 'Reject non-permissible answers, and check the rest.'] }],
      lines: [
        { say: 'Let’s sum up. State the non-permissible values first.', show: 'sum.0' },
        { say: 'Multiply every term by the LCD, to clear the denominators, and solve.', show: 'sum.1' },
        { say: 'Then reject any non-permissible answer, and check the rest. In part two, we solve equations that become quadratic. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
