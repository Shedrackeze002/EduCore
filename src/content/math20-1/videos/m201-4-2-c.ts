import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-2-c',
  lessonId: 'm201-4-2',
  title: 'Solving Quadratic Equations, Part 3: Standard Form First',
  thumbnailTitle: 'Standard Form First',
  thumbnail: 'm',
  summary: 'Four steps for solving by factoring, rearranging x(x + 2) = 15, why dividing 3x² = 12x by x loses a root, and using the known root x = 3 of x² + kx − 12 = 0 to find k and the other root.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.2 · Part 3', title: 'Standard Form First', subtitle: 'Rearrange, factor, solve, check' }],
      lines: [
        { say: 'Equations rarely arrive in standard form. Before you factor, you need every term on one side, and zero on the other.', show: 'title' },
        { say: 'In this video, you will rearrange equations, avoid losing a root, and use a known root to find a missing coefficient.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'bullets', id: 'b', items: ['Collect every term on one side: $ax^2 + bx + c = 0$.', 'Factor completely.', 'Set each factor equal to zero, and solve.', 'Check each root in the **original** equation.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x(x + 2) = 15', 'x^2 + 2x - 15 = 0', '(x + 5)(x - 3) = 0', 'x = -5 \\text{ or } x = 3', '3(5) = 15,\\ \\ (-5)(-3) = 15 \\;\\checkmark'] }],
      lines: [
        { say: 'To solve a quadratic equation by factoring, use four steps. First, expand and collect every term on one side, so the equation reads "a" x squared, plus b x, plus c, equals zero.', show: 'b.0' },
        { say: 'Second, factor completely. Third, set each factor equal to zero, and solve. And fourth, check each root in the original equation.', show: ['b.1', 'b.2', 'b.3'] },
        { say: 'Solve x times x plus two, equals fifteen. Expand, and subtract fifteen: x squared, plus two x, minus fifteen, equals zero.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Factor: x plus five, times x minus three. So x is negative five, or three.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Check in the original equation: three times five is fifteen, and negative five times negative three is fifteen.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Never divide by the variable',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Never divide by the variable', md: 'Dividing $3x^2 = 12x$ by $x$ gives only $x = 4$, and loses the root $x = 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3x^2 = 12x', '3x^2 - 12x = 0', '3x(x - 4) = 0', 'x = 0 \\text{ or } x = 4'] },
      ],
      lines: [
        { say: 'Solve three x squared equals twelve x. It is tempting to divide both sides by x, but that gives only x equals four, and loses a root.', show: ['oops', 'm.0'] },
        { say: 'Instead, subtract twelve x, so one side is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor out the common factor, three x: three x, times x minus four, equals zero. So x is zero, or four.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Dividing by x lost the root zero, because you cannot divide by x when x is zero.' },
      ],
    },
    {
      chapter: 'A known root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 + kx - 12 = 0,\\quad x = 3', '3^2 + 3k - 12 = 0:\\quad 3k = 3,\\ k = 1', 'x^2 + x - 12 = (x + 4)(x - 3) = 0', '\\text{other root: } x = -4'] }],
      lines: [
        { say: 'One root of x squared, plus k x, minus twelve, equals zero, is x equals three. Find k, and the other root.', show: 'm.0', focus: 'm.0' },
        { say: 'A root makes the equation true, so substitute x equals three: nine, plus three k, minus twelve, equals zero. So three k is three, and k is one.', show: 'm.1', focus: 'm.1' },
        { say: 'Now factor x squared, plus x, minus twelve: x plus four, times x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'The factor x minus three gives the known root, and x plus four gives the other root, negative four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2x^2 = 8x$.',
          choices: ['$x = 0$ or $x = 4$', '$x = 4$', '$x = 0$', '$x = -4$ or $x = 4$'],
          answer: 0,
          working: '$2x^2 - 8x = 0$, so $2x(x - 4) = 0$ and $x = 0$ or $x = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two x squared equals eight x. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract eight x: two x squared, minus eight x, equals zero. Factor out two x: two x, times x minus four. So x is zero, or four. B divides by x, and loses the root zero.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Collect every term on one side, then factor completely.', 'Never divide by the variable: factor it out.', 'Check each root in the original equation.'] }],
      lines: [
        { say: 'Let’s sum up. Collect every term on one side, so the other side is zero, then factor completely.', show: 'sum.0' },
        { say: 'Never divide by the variable. Factor it out instead, so no root is lost.', show: 'sum.1' },
        { say: 'And check each root in the original equation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
