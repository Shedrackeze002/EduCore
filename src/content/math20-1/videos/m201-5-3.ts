import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-3',
  lessonId: 'm201-5-3',
  title: 'Radical Equations, Part 1: Restrictions and Squaring',
  thumbnailTitle: 'Solving Radical Equations',
  thumbnail: 'm',
  summary: 'Restrictions that keep every radicand non-negative, including reversing the inequality for √(6 − 2x) and a radical in a denominator, then solving √(2x + 3) + 4 = 9 by isolating, squaring, solving and checking. Parts 2 and 3 cover extraneous roots, two radicals and a pendulum.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.3 · Part 1', title: 'Solving Radical Equations', subtitle: 'Isolate, square, solve, check' }],
      lines: [
        { say: 'The period of a pendulum, the speed of a car from its skid marks, and the time for an object to fall are all modelled with square roots. To work backwards, you solve a radical equation.', show: 'title' },
        { say: 'In this video, you will find the restrictions on the variable, and solve a radical equation by squaring.' },
      ],
    },
    {
      chapter: 'Restrictions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Restriction', md: 'A **restriction** is a condition on the variable that keeps every radicand non-negative, and every denominator non-zero.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{3x - 12}:\\quad 3x - 12 \\ge 0,\\ \\ x \\ge 4', '\\sqrt{6 - 2x}:\\quad {-2x} \\ge -6,\\ \\ x \\le 3', '\\dfrac{5}{\\sqrt{x + 4}}:\\quad x + 4 > 0,\\ \\ x > -4'] },
      ],
      lines: [
        { say: 'A square root is a real number only when its radicand is non-negative. A restriction is a condition on the variable that keeps every radicand non-negative, and every denominator non-zero.', show: 'def' },
        { say: 'For root three x minus twelve, three x minus twelve must be at least zero, so x is at least four.', show: 'm.0', focus: 'm.0' },
        { say: 'For root six minus two x, negative two x is at least negative six. Dividing by negative two reverses the inequality, so x is at most three.', show: 'm.1', focus: 'm.1' },
        { say: 'For five over root x plus four, the radicand must be non-negative, and the denominator cannot be zero. So x plus four is greater than zero, and x is greater than negative four.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two conditions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x - 2} + \\sqrt{8 - x}:\\quad x \\ge 2 \\text{ and } x \\le 8', '2 \\le x \\le 8'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to reverse the inequality', md: 'From $-2x \\ge -6$, dividing by $-2$ gives $x \\le 3$, not $x \\ge 3$. Test $x = 0$: $\\sqrt{6}$ is real, so $0$ is allowed.' },
      ],
      lines: [
        { say: 'With two radicals, both conditions must hold. For root x minus two, plus root eight minus x, x is at least two, and x is at most eight.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Watch the inequality sign. Dividing by a negative number reverses it. Test a value to be sure: in root six minus two x, x equals zero gives root six, which is real, so zero must be allowed.', show: 'oops' },
      ],
    },
    {
      chapter: 'Solving by squaring',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'bullets', id: 'b', items: ['**Isolate** the radical.', '**Square** both sides.', '**Solve** the equation.', '**Check** every answer in the original.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{2x + 3} + 4 = 9', '\\sqrt{2x + 3} = 5', '2x + 3 = 25,\\quad x = 11', '\\sqrt{2(11) + 3} + 4 = \\sqrt{25} + 4 = 9 \\;\\checkmark'] }],
      lines: [
        { say: 'To solve a radical equation, isolate the radical on one side, square both sides to remove it, solve the equation that is left, and check every answer in the original equation.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
        { say: 'Solve root two x plus three, plus four, equals nine. Subtract four to isolate the radical: root two x plus three equals five.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Square both sides: two x plus three equals twenty-five. So two x is twenty-two, and x is eleven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check in the original equation: root twenty-five, plus four, is nine. The solution is x equals eleven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the restriction on $x$ in $\\sqrt{10 - 5x}$.',
          choices: ['$x \\le 2$', '$x \\ge 2$', '$x \\ge -2$', '$x \\le 10$'],
          answer: 0,
          working: '$10 - 5x \\ge 0$, so $-5x \\ge -10$. Dividing by $-5$ reverses the inequality: $x \\le 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the restriction on x in root ten minus five x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ten minus five x is at least zero, so negative five x is at least negative ten. Dividing by negative five reverses the inequality: x is at most two. B forgets to reverse it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Every radicand $\\ge 0$, and $> 0$ in a denominator.', 'Reverse the inequality when you divide by a negative.', 'Isolate, square, solve, and check every answer.'] }],
      lines: [
        { say: 'Let’s sum up. A restriction keeps every radicand non-negative, and strictly positive in a denominator.', show: 'sum.0' },
        { say: 'Reverse the inequality when you divide by a negative number.', show: 'sum.1' },
        { say: 'And to solve, isolate the radical, square, solve, and check every answer. In part two, we see why checking matters. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
