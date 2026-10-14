import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-8-2',
  lessonId: 'm10c-8-2',
  title: 'Solving by Substitution, Part 1: The Method',
  thumbnailTitle: 'Solving by Substitution',
  summary: 'The substitution method for a system of two linear equations: isolate, substitute in brackets, solve, substitute back and verify, with a variable that is already isolated. Part 2 isolates first and finds fractional solutions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.2 · Part 1', title: 'Solving by Substitution', subtitle: 'An exact method' }],
      lines: [
        { say: 'Graphing shows the solution of a system, but it is not always exact. Substitution is an algebraic method that always gives the exact solution.', show: 'title' },
        { say: 'In this video, you will learn the five steps of substitution. In part two, you will use it when no variable is isolated, and when the answer is a fraction.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**Isolate** one variable in one equation.', '**Substitute** that expression into the other equation.', '**Solve** the one-variable equation.', '**Substitute back** to find the other variable.', '**Verify** in both original equations.'],
        },
      ],
      lines: [
        { say: 'Substitution has five steps. First, isolate one variable in one of the equations. A variable with a coefficient of one, or negative one, is easiest.', show: 'b.0' },
        { say: 'Second, substitute that expression into the other equation. Now it has only one variable.', show: 'b.1' },
        { say: 'Third, solve that equation. Fourth, substitute back to find the other variable.', show: ['b.2', 'b.3'] },
        { say: 'And fifth, verify the solution in both of the original equations.', show: 'b.4' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} y = 2x - 3 \\\\ 3x + 2y = 15 \\end{cases}', '3x + 2(2x - 3) = 15', '3x + 4x - 6 = 15', '7x = 21, \\quad x = 3', 'y = 2(3) - 3 = 3', '3(3) + 2(3) = 15 \\ \\checkmark'],
        },
      ],
      lines: [
        { say: 'Solve y equals two x minus three, and three x plus two y equals fifteen. The first equation already has y by itself.', show: 'm.0' },
        { say: 'So substitute two x minus three for y in the second equation, in brackets: three x plus two, times two x minus three, equals fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand: three x plus four x minus six equals fifteen. So seven x equals twenty-one, and x is three.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Substitute back: y equals two times three, minus three, which is three.', show: 'm.4', focus: 'm.4' },
        { say: 'Verify in the second equation: three times three, plus two times three, is fifteen. The solution is three, three.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $y = x + 2$ and $2x + y = 11$.',
          choices: ['$(3, 5)$', '$(5, 3)$', '$(3, 1)$', '$(2, 4)$'],
          answer: 0,
          working: '$2x + (x + 2) = 11$, so $3x = 9$ and $x = 3$. Then $y = 3 + 2 = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve y equals x plus two, and two x plus y equals eleven. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Substitute x plus two for y: two x plus x plus two equals eleven, so three x equals nine, and x is three. Then y is three plus two, which is five. B swaps the coordinates.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isolate, substitute, solve, substitute back, verify.', 'Put the substituted expression in brackets.', 'Substitution gives the exact solution.'] }],
      lines: [
        { say: 'Let’s sum up. Isolate, substitute, solve, substitute back, and verify.', show: 'sum.0' },
        { say: 'Put the expression you substitute in brackets.', show: 'sum.1' },
        { say: 'And substitution always gives the exact solution. In part two, we isolate a variable first, and meet fractional solutions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
