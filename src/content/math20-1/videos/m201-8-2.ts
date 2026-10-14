import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-8-2',
  lessonId: 'm201-8-2',
  title: 'Solving Systems Algebraically, Part 1: Substitution',
  thumbnailTitle: 'Systems by Substitution',
  thumbnail: 'm',
  summary: 'Solving linear-quadratic systems by substitution: y = x² − 4x + 1 with y = 2x − 7, and y = 2x² + 6x − 2 with a line in general form, finding each y from the linear equation. Parts 2 and 3 cover tangents, elimination and problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 8.2 · Part 1', title: 'Systems by Substitution', subtitle: 'Exact answers from algebra' }],
      lines: [
        { say: 'A graph shows how many solutions a system has, but exact answers, especially fractions and irrational values, come from algebra.', show: 'title' },
        { say: 'In this video, you will solve linear-quadratic systems by substitution, the same method you used for linear systems.' },
      ],
    },
    {
      chapter: 'Substitution',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'bullets', id: 'b', items: ['Solve the linear equation for $y$.', 'Substitute into the quadratic, and collect the terms on one side.', 'Solve the quadratic equation for $x$.', 'Substitute each $x$ into the **linear** equation.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x^2 - 4x + 1,\\quad y = 2x - 7', 'x^2 - 4x + 1 = 2x - 7', 'x^2 - 6x + 8 = (x - 2)(x - 4) = 0', 'x = 2:\\ y = -3;\\quad x = 4:\\ y = 1'] }],
      lines: [
        { say: 'Substitution means solving one equation for a variable, and replacing that variable in the other equation. That leaves one equation in one variable.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Solve y equals x squared, minus four x, plus one, and y equals two x minus seven. Both are already solved for y, so set them equal.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Collect the terms on one side: x squared, minus six x, plus eight, equals zero, which factors as x minus two, times x minus four.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute each x into the linear equation. Two gives two times two, minus seven, which is negative three, and four gives one. The solutions are two, negative three, and four, one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A line in general form',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 2x^2 + 6x - 2,\\quad x - y = -1', 'y = x + 1', '2x^2 + 6x - 2 = x + 1:\\quad 2x^2 + 5x - 3 = 0', '(2x - 1)(x + 3) = 0:\\quad x = \\tfrac{1}{2} \\text{ or } x = -3', '\\left(\\tfrac{1}{2}, \\tfrac{3}{2}\\right),\\quad (-3, -2)'] }],
      lines: [
        { say: 'Solve y equals two x squared, plus six x, minus two, and x minus y equals negative one. First, solve the linear equation for y: y equals x plus one.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Substitute into the quadratic, and collect the terms: two x squared, plus five x, minus three, equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'It factors as two x minus one, times x plus three, so x is one half, or negative three.', show: 'm.3', focus: 'm.3' },
        { say: 'Use the linear equation to find y, because it is quicker, and gives exactly one y for each x. y is x plus one: three halves, and negative two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $y = x^2$ and $y = x + 6$.',
          choices: ['$(3, 9)$ and $(-2, 4)$', '$(3, 9)$ only', '$(-3, 9)$ and $(2, 4)$', '$(3, 6)$ and $(-2, 6)$'],
          answer: 0,
          working: '$x^2 = x + 6$, so $x^2 - x - 6 = (x - 3)(x + 2) = 0$. Then $y = x + 6$ gives $(3, 9)$ and $(-2, 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the system y equals x squared, and y equals x plus six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x squared equals x plus six, so x squared, minus x, minus six, is zero, and x is three, or negative two. Then y is x plus six: nine, and four. C gets the signs of x wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Solve the linear equation for $y$, and substitute into the quadratic.', 'Solve the quadratic equation for $x$.', 'Find each $y$ from the linear equation, and check.'] }],
      lines: [
        { say: 'Let’s sum up. Solve the linear equation for y, and substitute into the quadratic.', show: 'sum.0' },
        { say: 'Solve the quadratic equation for x.', show: 'sum.1' },
        { say: 'Then find each y from the linear equation, and check. In part two, we spot tangent lines, and solve systems of two parabolas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
