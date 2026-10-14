import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-1',
  lessonId: 'm204-4-1',
  title: 'Making a Budget, Part 1: Income and Expenses',
  thumbnailTitle: 'Income and Expenses',
  thumbnail: 't',
  summary: 'What a budget, income (take-home pay) and expenses are, money left over as income minus total expenses (1,600 dollars minus 1,260 dollars is 340 dollars), and why a budget uses net pay, not gross pay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.1 · Part 1', title: 'Income and Expenses', subtitle: 'Tell your money where to go' }],
      lines: [
        { say: 'Moving out, buying a car, or just making it to the next payday all start with one plan: a budget. A budget tells your money where to go, so you do not have to wonder where it went.', show: 'title' },
        { say: 'In this video, you will list income and expenses, and find the money left over each month.' },
      ],
    },
    {
      chapter: 'Budget, income and expenses',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Budget', md: 'A **budget** is a plan for how you will use your money each month. It lists the money coming in and the money going out.' },
        { kind: 'callout', id: 'inc', tone: 'definition', title: 'Income and expense', md: 'Your **income** is the money you get, usually from a job. Use your **take-home pay**. An **expense** is something you spend money on, like rent or groceries.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{money left over} = \\text{income} - \\text{total expenses}'] },
      ],
      lines: [
        { say: 'A budget is a plan for how you will use your money each month. It lists the money coming in, and the money going out.', show: 'def' },
        { say: 'Your income is the money you get, usually from a job. In a budget, use your take-home pay, the money that lands in your bank account after deductions. An expense is something you spend money on, like rent or groceries.', show: 'inc' },
        { say: 'To balance a budget, add up the expenses. Then subtract the total from the income to find the money left over.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Money left over',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Expense', 'Cost per month'], rows: [['Rent', '\\$750'], ['Phone plan', '\\$50'], ['Bus pass', '\\$100'], ['Groceries', '\\$300'], ['Entertainment', '\\$60']] }],
      right: [
        { kind: 'text', id: 'q', md: 'Jasmine takes home \\$1,600 each month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['750 + 50 + 100 + 300 + 60 = 1{,}260', '1{,}600 - 1{,}260 = 340'] },
      ],
      lines: [
        { say: 'Jasmine works at a coffee shop. She takes home 1,600 dollars each month, and her expenses are in the table. How much money is left over each month?', show: ['t', 'q'] },
        { say: 'First, add the expenses: 750 plus fifty plus 100 plus 300 plus sixty is 1,260 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract from the take-home pay: 1,600 minus 1,260 is 340 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So Jasmine has 340 dollars left over each month. She can save it, or plan how to use it.' },
      ],
    },
    {
      chapter: 'Take-home pay',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using gross pay', md: 'A pay stub shows **gross pay** (before deductions) and **net pay** (take-home pay). Gross pay is bigger, but you never get all of it. Build your budget with take-home pay.' }],
      lines: [
        { say: 'A common mistake is to build a budget with gross pay. A pay stub shows gross pay, before deductions, and net pay, the take-home pay. Gross pay is bigger, but you never get all of it. So build your budget with take-home pay, or you will plan to spend money you do not have.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Tomas takes home \\$1,850 a month. His expenses are rent \\$820, phone \\$60, bus pass \\$110, groceries \\$350 and entertainment \\$90. How much is left over each month?',
          choices: ['\\$420', '\\$1,430', '\\$510', '\\$3,280'],
          answer: 0,
          working: 'Expenses: $820 + 60 + 110 + 350 + 90 = 1{,}430$. Left over: $1{,}850 - 1{,}430 = 420$. B is the total expenses, and C forgets the entertainment.',
        },
      ],
      lines: [
        { say: 'Your turn. Tomas takes home 1,850 dollars a month. The expenses are rent, 820 dollars, phone, sixty, bus pass, 110, groceries, 350, and entertainment, ninety. How much is left over each month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The expenses add to 1,430 dollars, and 1,850 minus 1,430 is 420 dollars. B is the total expenses, and C forgets the entertainment.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A budget lists your income and your expenses.', 'Use take-home pay as your income.', 'Money left over = income − total expenses.'] }],
      lines: [
        { say: 'Let’s sum up. A budget lists the money coming in, and the money going out.', show: 'sum.0' },
        { say: 'Use your take-home pay as your income.', show: 'sum.1' },
        { say: 'And the money left over is the income minus the total expenses. In part two, we sort expenses into fixed and variable. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
