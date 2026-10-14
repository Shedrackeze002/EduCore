import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-8-3',
  lessonId: 'm10c-8-3',
  title: 'Solving by Elimination, Part 1: Adding Equations',
  thumbnailTitle: 'Solving by Elimination',
  summary: 'Why adding two true equations gives a true equation, eliminating a variable whose coefficients are opposites, and multiplying one equation first to make them opposites. Part 2 multiplies both equations, clears decimals and chooses a method.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.3 · Part 1', title: 'Solving by Elimination', subtitle: 'Add the equations, lose a variable' }],
      lines: [
        { say: 'When no variable has a coefficient of one, substitution creates fractions. Elimination avoids that, by adding or subtracting the equations to make one variable disappear.', show: 'title' },
        { say: 'In this video, you will see why elimination works, and use it. In part two, we multiply both equations, and clear decimals.' },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['a = b \\text{ and } c = d \\;\\Rightarrow\\; a + c = b + d'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Opposite coefficients', md: 'If one variable has **opposite coefficients** in the two equations, adding the equations eliminates it.' },
      ],
      lines: [
        { say: 'If "a" equals b, and c equals d, then "a" plus c equals b plus d. Adding two true equations gives another true equation.', show: 'm.0', focus: 'm.0' },
        { say: 'So if a variable has opposite coefficients in the two equations, like two y and negative two y, adding the equations makes it disappear.', show: 'key' },
      ],
    },
    {
      chapter: 'Adding to eliminate',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{array}{r} 3x + \\adj{2y} = 16 \\\\ +\\;\\; 5x - \\adj{2y} = 8 \\\\ \\hline 8x \\phantom{{}+2y} = 24 \\end{array}', 'x = 3', '3(3) + 2y = 16, \\quad 2y = 7, \\quad y = \\tfrac72', '\\left(3,\\ \\tfrac72\\right)'],
        },
      ],
      lines: [
        { say: 'Solve three x plus two y equals sixteen, and five x minus two y equals eight. The y coefficients, two and negative two, are opposites.', show: 'm.0' },
        { say: 'Add the equations. The y terms cancel, leaving eight x equals twenty-four. So x is three.', show: 'm.1', focus: ['m.0', 'm.1'] },
        { say: 'Substitute x equals three into the first equation: nine plus two y equals sixteen. So two y is seven, and y is seven halves.', show: 'm.2', focus: 'm.2' },
        { say: 'The solution is three, seven halves.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Multiplying one equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} 2x + 3y = 12 \\\\ x - y = 1 \\end{cases}', '\\times 3\\text{: } 3x - 3y = 3', '(2x + 3y) + (3x - 3y) = 12 + 3, \\quad 5x = 15, \\quad x = 3', '3 - y = 1, \\quad y = 2'],
        },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Equivalent equations', md: 'Multiplying an equation by a non-zero number gives the same line, so the solution does not change.' },
      ],
      lines: [
        { say: 'Solve two x plus three y equals twelve, and x minus y equals one. No coefficients are opposites yet.', show: 'm.0' },
        { say: 'Multiply the second equation by three: three x minus three y equals three. Now the y coefficients are three and negative three. Multiplying an equation by a number gives the same line, so the solution does not change.', show: ['m.1', 'key'], focus: 'm.1' },
        { say: 'Add the equations: five x equals fifteen, so x is three.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute back into x minus y equals one: three minus y equals one, so y is two. The solution is three, two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $x + 2y = 7$ and $3x - 2y = 5$.',
          choices: ['$(3, 2)$', '$(2, 3)$', '$(3, -2)$', '$(1, 3)$'],
          answer: 0,
          working: 'Add: $4x = 12$, so $x = 3$. Then $3 + 2y = 7$, so $y = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x plus two y equals seven, and three x minus two y equals five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The y coefficients are opposites, so add: four x equals twelve, and x is three. Then three plus two y equals seven, so y is two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Adding two true equations gives a true equation.', 'Opposite coefficients cancel when you add.', 'Multiply an equation first to make coefficients opposites.'] }],
      lines: [
        { say: 'Let’s sum up. Adding two true equations gives another true equation.', show: 'sum.0' },
        { say: 'So opposite coefficients cancel when you add the equations.', show: 'sum.1' },
        { say: 'And you can multiply an equation first, to make the coefficients opposites. In part two, we multiply both equations, and clear decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
