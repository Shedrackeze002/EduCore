import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-1-b',
  lessonId: 'm204-4-1',
  title: 'Making a Budget, Part 2: Fixed and Variable Expenses',
  thumbnailTitle: 'Fixed and Variable',
  thumbnail: 't',
  summary: 'Fixed expenses (the same every month) and variable expenses (they change), sorting a budget with cents (fixed 1,093.49 dollars, variable 557.20 dollars, 499.71 dollars left over), and why variable expenses are where you cut back.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.1 · Part 2', title: 'Fixed and Variable Expenses', subtitle: 'Which costs can change?' }],
      lines: [
        { say: 'Some bills are the same every month. Others go up and down. Knowing which is which helps you plan, and helps you cut back when money is tight.', show: 'title' },
        { say: 'In this video, you will sort expenses into fixed and variable, and find the money left over.' },
      ],
    },
    {
      chapter: 'Fixed and variable',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'fix', tone: 'definition', title: 'Fixed expense', md: 'A **fixed expense** costs the same amount every month, like rent, a phone plan, a bus pass or car insurance.' },
        { kind: 'callout', id: 'var', tone: 'definition', title: 'Variable expense', md: 'A **variable expense** changes from month to month, like groceries, gas for a car, eating out or clothing.' },
      ],
      lines: [
        { say: 'A fixed expense costs the same amount every month. Rent, a phone plan, a bus pass and car insurance are fixed expenses.', show: 'fix' },
        { say: 'A variable expense changes from month to month. Groceries, gas for a car, eating out and clothing are variable expenses.', show: 'var' },
        { say: 'Fixed expenses are easy to plan for. Variable expenses are where you can cut back when money is tight.' },
      ],
    },
    {
      chapter: 'Sorting a budget',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Expense', 'Cost per month'], rows: [['Rent', '\\$875.00'], ['Groceries', '\\$312.65'], ['Phone plan', '\\$54.99'], ['Gas for car', '\\$148.20'], ['Car insurance', '\\$163.50'], ['Eating out', '\\$96.35']] }],
      right: [
        { kind: 'text', id: 'q', md: 'Omar takes home \\$2,150.40 a month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{fixed: } 875 + 54.99 + 163.50', '= 1{,}093.49', '\\text{variable: } 312.65 + 148.20 + 96.35', '= 557.20', '2{,}150.40 - 1{,}093.49 - 557.20', '= 499.71'] },
      ],
      lines: [
        { say: 'Omar works at a warehouse and takes home 2,150 dollars 40 a month. His expenses are in the table. Find his fixed total, his variable total, and the money left over.', show: ['t', 'q'] },
        { say: 'The fixed expenses are the same every month: rent, the phone plan and car insurance. 875 plus 54.99 plus 163.50 is 1,093 dollars 49.', show: ['m.0', 'm.1'], focus: ['t.0', 't.2', 't.4', 'm.0', 'm.1'] },
        { say: 'The variable expenses change: groceries, gas and eating out. 312.65 plus 148.20 plus 96.35 is 557 dollars twenty.', show: ['m.2', 'm.3'], focus: ['t.1', 't.3', 't.5', 'm.2', 'm.3'] },
        { say: 'The money left over is 2,150.40 minus both totals: 499 dollars 71.', show: ['m.4', 'm.5'], focus: ['m.4', 'm.5'] },
        { say: 'Notice that the fixed expenses take about half of Omar’s take-home pay. If Omar needs to save more, the variable expenses, like eating out, are the place to look first.' },
      ],
    },
    {
      chapter: 'Track your spending',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Track your spending', md: 'For one month, write down everything you buy, even a \\$3 coffee. Small variable expenses add up fast.' }],
      lines: [
        { say: 'Here is a tip. For one month, write down everything you buy, even a three dollar coffee. A three dollar coffee every workday is about sixty dollars a month. Small variable expenses add up fast.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which list has only **variable** expenses?',
          choices: ['groceries, gas for a car, eating out', 'rent, groceries, clothing', 'phone plan, bus pass, car insurance', 'rent, gas for a car, phone plan'],
          answer: 0,
          working: 'Groceries, gas and eating out change from month to month. Rent, a phone plan, a bus pass and car insurance are fixed. C is a list of fixed expenses only.',
        },
      ],
      lines: [
        { say: 'Your turn. Which list has only variable expenses? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Groceries, gas and eating out all change from month to month. Rent, a phone plan, a bus pass and car insurance are fixed, so B and D each mix the two kinds, and C is a list of fixed expenses only.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fixed expenses stay the same each month.', 'Variable expenses change, so they are easier to cut.', 'Left over = income − fixed − variable.'] }],
      lines: [
        { say: 'Let’s sum up. Fixed expenses stay the same each month.', show: 'sum.0' },
        { say: 'Variable expenses change, so they are easier to cut back.', show: 'sum.1' },
        { say: 'And the money left over is the income minus the fixed and variable totals. In part three, we read a budget as percents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
