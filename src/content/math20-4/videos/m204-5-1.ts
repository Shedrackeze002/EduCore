import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-1',
  lessonId: 'm204-5-1',
  title: 'Using Formulas, Part 1: Substituting into a Formula',
  thumbnailTitle: 'Using a Formula',
  thumbnail: 'm',
  summary: 'What a formula, a variable and substituting are, why two letters side by side mean multiply, and finding pay with E = rh (16.50 dollars an hour for 6 hours is 99 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.1 · Part 1', title: 'Using a Formula', subtitle: 'Put in the numbers you know' }],
      lines: [
        { say: 'A payroll clerk works out pay. A taxi meter works out a fare. A landscaper works out how much fence a yard needs. Each one uses a formula: a short rule that turns the numbers you know into the number you need.', show: 'title' },
        { say: 'In this video, you will review formulas and variables, and substitute into a formula.' },
      ],
    },
    {
      chapter: 'Formulas and variables',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'f', tone: 'definition', title: 'Formula', md: 'A **formula** is a rule written with letters and numbers, such as $E = rh$. It shows how one amount is found from other amounts.' },
        { kind: 'callout', id: 'v', tone: 'definition', title: 'Variable', md: 'A **variable** is a letter that stands for a number that can change, such as the hours you work.' },
        { kind: 'callout', id: 's', tone: 'definition', title: 'Substitute', md: 'To **substitute** means to replace each letter with its number.' },
      ],
      lines: [
        { say: 'A formula is a rule written with letters and numbers, such as E equals r h. It shows how one amount is found from other amounts.', show: 'f' },
        { say: 'A variable is a letter that stands for a number that can change, such as the hours you work.', show: 'v' },
        { say: 'And to substitute means to replace each letter with its number. Then you calculate.', show: 's' },
      ],
    },
    {
      chapter: 'Side by side means multiply',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['E = rh', 'rh = r \\times h'] }],
      lines: [
        { say: 'Here is the formula for pay: E equals r h. E is the pay in dollars, r is the hourly wage, and h is the hours worked.', show: 'm.0', focus: 'm.0' },
        { say: 'Two letters side by side, like r h, mean multiply: r times h. So the pay is the hourly wage times the hours. That is the same rule you used for gross pay in Unit 3.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Pay for a shift',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Kiona earns \\$16.50 per hour and works $6$ hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['E = rh', 'E = 16.50 \\times 6', 'E = 99'] },
      ],
      lines: [
        { say: 'Kiona earns sixteen dollars fifty per hour, and works six hours. What is her pay?', show: 'q' },
        { say: 'Write the formula first: E equals r h.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: r is 16.50, and h is six. So E equals 16.50 times six.', show: 'm.1', focus: 'm.1' },
        { say: 'Calculate: E equals 99. So Kiona earns 99 dollars for the shift.', show: 'm.2', focus: 'm.2' },
        { say: 'If Kiona works eight hours next time, only h changes: 16.50 times eight is 132 dollars. That is why h is a variable.' },
        { say: 'Writing the formula, then substituting, then calculating, one step per line, makes your work easy to check.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $E = rh$. Malik earns \\$17.25 per hour and works $8$ hours. What is the pay?',
          choices: ['\\$138.00', '\\$25.25', '\\$13.80', '\\$172.50'],
          answer: 0,
          working: '$E = 17.25 \\times 8 = 138.00$. B adds instead of multiplying, and D works ten hours.',
        },
      ],
      lines: [
        { say: 'Your turn. Use E equals r h. Malik earns seventeen dollars 25 per hour, and works eight hours. What is the pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. E equals 17.25 times eight: 138 dollars. B adds the numbers instead of multiplying, and D works ten hours instead of eight.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A formula is a rule with variables.', 'Letters side by side mean multiply: rh = r × h.', 'Write the formula, substitute, then calculate.'] }],
      lines: [
        { say: 'Let’s sum up. A formula is a rule written with variables.', show: 'sum.0' },
        { say: 'Letters side by side mean multiply.', show: 'sum.1' },
        { say: 'And to use a formula, write it, substitute a number for each letter, then calculate. In part two, we use formulas with more than one step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
