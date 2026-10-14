import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-8-2-b',
  lessonId: 'm10c-8-2',
  title: 'Solving by Substitution, Part 2: Isolating First and Fractions',
  thumbnailTitle: 'Substitution with Fractions',
  summary: 'Using substitution when no variable is isolated (choose one with a coefficient of 1), keeping the substituted expression in brackets, and finding a solution that is a fraction, which graphing struggles with.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.2 · Part 2', title: 'Isolating First and Fractions', subtitle: 'More substitution' }],
      lines: [
        { say: 'Most systems do not arrive with a variable already isolated. And many solutions are not whole numbers.', show: 'title' },
        { say: 'In this video, you will isolate a variable before substituting, and find a solution that is a fraction.' },
      ],
    },
    {
      chapter: 'Isolate first',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} x + 3y = 7 \\\\ 2x - 5y = -8 \\end{cases}', 'x = 7 - 3y', '2(7 - 3y) - 5y = -8', '14 - 6y - 5y = -8', '-11y = -22, \\quad y = 2', 'x = 7 - 3(2) = 1'],
        },
      ],
      lines: [
        { say: 'Solve x plus three y equals seven, and two x minus five y equals negative eight. No variable is isolated yet, so choose one with a coefficient of one: the x in the first equation.', show: 'm.0' },
        { say: 'Isolate it: x equals seven minus three y.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute into the second equation, in brackets: two, times seven minus three y, minus five y, equals negative eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Expand: fourteen minus six y minus five y equals negative eight. So negative eleven y equals negative twenty-two, and y is two.', show: ['m.3', 'm.4'], focus: 'm.4' },
        { say: 'Substitute back: x equals seven minus three times two, which is one. The solution is one, two.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'Keep the brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2(7 - 3y) = 14 - 6y \\quad \\good{\\checkmark}', '2 \\cdot 7 - 3y = 14 - 3y \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the brackets', md: 'Substitute the whole expression in brackets, so the coefficient multiplies every term.' },
      ],
      lines: [
        { say: 'The brackets matter. Two, times seven minus three y, is fourteen minus six y: the two multiplies both terms.', show: 'm.0', focus: 'm.0' },
        { say: 'Without brackets, you would only multiply the seven, and get fourteen minus three y, which is wrong.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A fractional solution',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\begin{cases} x - 2y = 1 \\\\ 4x + 2y = 9 \\end{cases}', 'x = 1 + 2y', '4(1 + 2y) + 2y = 9', '4 + 10y = 9, \\quad y = \\tfrac12', 'x = 1 + 2\\left(\\tfrac12\\right) = 2'] },
      ],
      lines: [
        { say: 'Substitution handles answers that are not whole numbers, which graphing struggles with. Solve x minus two y equals one, and four x plus two y equals nine.', show: 'm.0' },
        { say: 'Isolate x in the first equation: x equals one plus two y.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute: four, times one plus two y, plus two y, equals nine. That is four plus ten y equals nine, so ten y is five, and y is one half.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Substitute back: x equals one plus two times one half, which is two. The solution is two, one half.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $x - y = 3$ and $2x + 4y = 3$.',
          choices: ['$\\left(\\tfrac52, -\\tfrac12\\right)$', '$\\left(-\\tfrac12, \\tfrac52\\right)$', '$(3, 0)$', '$(2, -1)$'],
          answer: 0,
          working: '$x = 3 + y$, so $2(3 + y) + 4y = 3$, $6 + 6y = 3$ and $y = -\\tfrac12$. Then $x = 3 - \\tfrac12 = \\tfrac52$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x minus y equals three, and two x plus four y equals three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Isolate x: x equals three plus y. Substitute: two, times three plus y, plus four y, equals three. So six plus six y equals three, and y is negative one half. Then x is three minus one half, which is five halves.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isolate a variable with a coefficient of $1$ or $-1$.', 'Substitute the whole expression in brackets.', 'Substitution finds fractional solutions exactly.'] }],
      lines: [
        { say: 'Let’s sum up. Isolate a variable with a coefficient of one, or negative one, if you can.', show: 'sum.0' },
        { say: 'Substitute the whole expression, in brackets.', show: 'sum.1' },
        { say: 'And substitution finds fractional solutions exactly. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
