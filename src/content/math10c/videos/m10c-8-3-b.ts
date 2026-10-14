import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-8-3-b',
  lessonId: 'm10c-8-3',
  title: 'Solving by Elimination, Part 2: Multiplying Both and Choosing a Method',
  thumbnailTitle: 'Elimination: Harder Systems',
  summary: 'Multiplying both equations to reach a common multiple, subtracting every term, clearing decimals before eliminating, and choosing between substitution, elimination and graphing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.3 · Part 2', title: 'Harder Systems', subtitle: 'Multiplying both equations, and choosing a method' }],
      lines: [
        { say: 'Sometimes multiplying one equation is not enough, and sometimes the coefficients are decimals.', show: 'title' },
        { say: 'In this video, you will multiply both equations, clear decimals, and choose the best method for a system.' },
      ],
    },
    {
      chapter: 'Multiplying both',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} 4x + 3y = 5 \\\\ 3x - 2y = 8 \\end{cases}', '\\times 2\\text{: } 8x + 6y = 10 \\qquad \\times 3\\text{: } 9x - 6y = 24', '17x = 34, \\quad x = 2', '4(2) + 3y = 5, \\quad 3y = -3, \\quad y = -1'],
        },
      ],
      lines: [
        { say: 'Solve four x plus three y equals five, and three x minus two y equals eight. To eliminate y, make its coefficients six and negative six, using the lowest common multiple of three and two.', show: 'm.0' },
        { say: 'Multiply the first equation by two, and the second by three: eight x plus six y equals ten, and nine x minus six y equals twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them: seventeen x equals thirty-four, so x is two.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute back: eight plus three y equals five, so three y is negative three, and y is negative one. The solution is two, negative one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Subtract every term',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting carelessly', md: 'If you subtract one equation from another, subtract **every** term, including the constant. Or multiply by a negative number and add instead.' },
      ],
      lines: [
        { say: 'You can also subtract equations when a variable has equal coefficients. But subtract every term, including the constant.', show: 'oops' },
        { say: 'Many students prefer to multiply one equation by a negative number, and then add. That avoids sign errors.' },
      ],
    },
    {
      chapter: 'Decimals',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\begin{cases} 0.2x + 0.5y = 1.6 \\\\ 0.3x - 0.1y = 0.7 \\end{cases}', '\\times 10\\text{: } 2x + 5y = 16 \\qquad 3x - y = 7', '\\times 5\\text{: } 15x - 5y = 35', '17x = 51, \\quad x = 3, \\quad y = 2'],
        },
      ],
      lines: [
        { say: 'Clear decimals or fractions first. Solve 0.2 x plus 0.5 y equals 1.6, and 0.3 x minus 0.1 y equals 0.7.', show: 'm.0' },
        { say: 'Multiply both equations by ten: two x plus five y equals sixteen, and three x minus y equals seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply the second by five, so the y coefficients are opposites: fifteen x minus five y equals thirty-five.', show: 'm.2', focus: 'm.2' },
        { say: 'Add: seventeen x equals fifty-one, so x is three. Then nine minus y equals seven, so y is two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which method?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['When', 'Use'],
          rows: [
            ['a variable is isolated, or has a coefficient of $\\pm1$', 'substitution'],
            ['the coefficients are larger, or already match', 'elimination'],
            ['you want a picture or an estimate', 'graphing'],
          ],
        },
      ],
      lines: [
        { say: 'So which method should you choose? If a variable is already isolated, or has a coefficient of one or negative one, use substitution.', show: 't.0', focus: 't.0' },
        { say: 'If the coefficients are larger, or already match, use elimination.', show: 't.1', focus: 't.1' },
        { say: 'And if you want a picture, or an estimate, graph it.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve the system $2x + 5y = 1$ and $3x + 2y = -4$.',
          choices: ['$(-2, 1)$', '$(1, -2)$', '$(2, -1)$', '$(-2, -1)$'],
          answer: 0,
          working: 'Multiply by $3$ and $2$: $6x + 15y = 3$ and $6x + 4y = -8$. Subtract: $11y = 11$, so $y = 1$. Then $2x + 5 = 1$, so $x = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two x plus five y equals one, and three x plus two y equals negative four. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply the first equation by three and the second by two, so both have six x. Subtract: eleven y equals eleven, so y is one. Then two x plus five equals one, so x is negative two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply both equations to reach a common multiple.', 'Clear decimals and fractions first.', 'Choose the most efficient method.'] }],
      lines: [
        { say: 'Let’s sum up. Multiply both equations when you need a common multiple.', show: 'sum.0' },
        { say: 'Clear decimals and fractions before you eliminate.', show: 'sum.1' },
        { say: 'And choose the most efficient method for each system. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
