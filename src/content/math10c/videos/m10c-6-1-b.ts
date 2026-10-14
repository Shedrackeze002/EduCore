import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-6-1-b',
  lessonId: 'm10c-6-1',
  title: 'Linear Relations, Part 2: Tables, Equations and Rates',
  thumbnailTitle: 'Linear Tables and Equations',
  summary: 'Checking whether a table of values is linear (including when the x-steps are unequal), recognising linear equations, and finding a rate of change with units from two data points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.1 · Part 2', title: 'Tables, Equations and Rates', subtitle: 'Is it linear?' }],
      lines: [
        { say: 'Given a table of values or an equation, how can you tell whether a relation is linear?', show: 'title' },
        { say: 'In this video, you will check tables and equations, and find a rate of change from two data points.' },
      ],
    },
    {
      chapter: 'Equal steps',
      layout: 'center',
      main: [
        { kind: 'math', id: 't', lines: ['\\begin{array}{c|cccc} x & 0 & 1 & 2 & 3 \\\\ \\hline y & 5 & 8 & 11 & 14 \\end{array}'] },
        { kind: 'math', id: 'm', lines: ['\\Delta x = 1, \\quad \\Delta y = 3 \\text{ each time}', '\\text{rate} = 3\\text{: linear}'] },
      ],
      lines: [
        { say: 'Is this relation linear? x goes up by one each time.', show: 't.0' },
        { say: 'And y goes up by three each time: five, eight, eleven, fourteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The rate of change is always three, so the relation is linear.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Unequal steps',
      layout: 'center',
      main: [
        { kind: 'math', id: 't', lines: ['\\begin{array}{c|cccc} x & 1 & 2 & 4 & 7 \\\\ \\hline y & 3 & 5 & 9 & 15 \\end{array}'] },
        { kind: 'math', id: 'm', lines: ['\\dfrac{2}{1} = 2 \\qquad \\dfrac{4}{2} = 2 \\qquad \\dfrac{6}{3} = 2', '\\text{rate} = 2\\text{: linear}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not just the y-differences', md: 'When the $x$-steps are unequal, compare $\\dfrac{\\Delta y}{\\Delta x}$, not just $\\Delta y$.' },
      ],
      lines: [
        { say: 'Now this table. The y values go up by two, then four, then six. Is it linear?', show: 't.0' },
        { say: 'Look at the x values too: they go up by one, then two, then three. So divide each change in y by its change in x: two over one, four over two, six over three. Every rate is two.', show: 'm.0', focus: 'm.0' },
        { say: 'The rate is constant, so this relation is linear, even though the steps are unequal.', show: 'm.1', focus: 'm.1' },
        { say: 'When the x steps are unequal, compare the change in y over the change in x, not just the change in y.', show: 'oops' },
      ],
    },
    {
      chapter: 'Linear equations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\good{\\text{Linear: }} y = 3x - 2,\\quad 2x + 5y = 10,\\quad y = 4,\\quad x = -1', '\\bad{\\text{Not linear: }} y = x^2,\\quad xy = 6,\\quad y = \\tfrac1x,\\quad y = \\sqrt{x},\\quad y = 2^x'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'A linear equation', md: 'Each variable is to the first power, the variables are not multiplied together, and no variable is in a denominator, a root or an exponent.' },
      ],
      lines: [
        { say: 'An equation is linear when each variable is to the first power, the variables are not multiplied together, and no variable sits in a denominator, under a root, or in an exponent.', show: 'key' },
        { say: 'So y equals three x minus two, two x plus five y equals ten, y equals four, and x equals negative one are all linear.', show: 'm.0', focus: 'm.0' },
        { say: 'But y equals x squared, x y equals six, y equals one over x, y equals the square root of x, and y equals two to the x are not.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A rate from two points',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A tank holds $600\\text{ L}$ after $2$ min and $440\\text{ L}$ after $10$ min, draining at a constant rate. Find the rate of change.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{440 - 600}{10 - 2} = \\dfrac{-160}{8} = -20', '-20 \\text{ L/min}'] },
      ],
      lines: [
        { say: 'A tank holds 600 litres after two minutes, and 440 litres after ten minutes, draining at a constant rate. Find the rate of change.', show: 'q' },
        { say: 'The change in volume is 440 minus 600, negative 160 litres. The change in time is ten minus two, eight minutes. Negative 160 over eight is negative twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'So the rate of change is negative twenty litres per minute: the tank loses twenty litres every minute. A negative rate means the quantity is decreasing.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which equation is linear?',
          choices: ['$3x - 4y = 12$', '$y = x^2 + 1$', '$xy = 8$', '$y = \\dfrac{2}{x}$'],
          answer: 0,
          working: 'In $3x - 4y = 12$ both variables are to the first power and are not multiplied together.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these equations is linear? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Both variables are to the first power, and they are not multiplied together. B has x squared, C multiplies x and y, and D has x in a denominator.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In a table, check $\\Delta y \\div \\Delta x$ between every pair of rows.', 'Linear equations have each variable to the first power only.', 'A rate of change has units; a negative rate means decreasing.'] }],
      lines: [
        { say: "Let's sum up. In a table, check the change in y divided by the change in x between every pair of rows.", show: 'sum.0' },
        { say: 'A linear equation has each variable to the first power only.', show: 'sum.1' },
        { say: 'And a rate of change has units, and a negative rate means the quantity is decreasing. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
