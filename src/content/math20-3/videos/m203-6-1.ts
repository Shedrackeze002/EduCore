import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-6-1',
  lessonId: 'm203-6-1',
  title: 'Personal Budgets, Part 1: Gross Pay and Net Pay',
  thumbnailTitle: 'Gross Pay and Net Pay',
  thumbnail: 'm',
  summary: 'Gross pay, deductions and net pay: Jordan’s net pay for a month with 19% deductions given in the question (2,235.60 dollars), net pay from a pay stub that lists each deduction, and why a budget starts from net pay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.1 · Part 1', title: 'Gross Pay and Net Pay', subtitle: 'What actually lands in your account' }],
      lines: [
        { say: 'Your first full-time pay cheque can feel huge, until rent, a phone bill and groceries each take their share. A budget is a plan that tells your money where to go before it is gone.', show: 'title' },
        { say: 'In this video, you will find your take-home pay, the number every budget starts from.' },
      ],
    },
    {
      chapter: 'Gross pay, deductions and net pay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Gross pay, deductions and net pay', md: '**Gross pay** is everything you earn before anything is taken off. **Deductions** are amounts taken off, such as income tax, CPP and EI contributions. **Net pay** (take-home pay) is what is left.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{net pay} = \\text{gross pay} - \\text{deductions}'] },
      ],
      lines: [
        { say: 'Before you plan your spending, you need to know how much money you actually get. Gross pay is everything you earn, before anything is taken off.', show: 'def' },
        { say: 'Deductions are amounts your employer takes off each pay cheque, such as income tax, and Canada Pension Plan and Employment Insurance contributions.' },
        { say: 'Net pay, or take-home pay, is what is left: net pay equals gross pay minus deductions.', show: 'm.0', focus: 'm.0' },
        { say: 'The real deduction rates change every year, and depend on how much you earn. So every question in this course tells you the deductions to use.' },
      ],
    },
    {
      chapter: 'Net pay for a month',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Jordan: \\$18.40 an hour, $150$ hours in March. In this example, deductions take $19\\%$ of gross pay.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{gross: } 18.40 \\times 150 = 2{,}760.00', '\\text{deductions: } 2{,}760.00 \\times 0.19 = 524.40', '\\text{net: } 2{,}760.00 - 524.40 = \\$2{,}235.60'] },
      ],
      lines: [
        { say: 'Jordan works at a warehouse in Red Deer for 18 dollars 40 an hour, and worked 150 hours in March. In this example, deductions take nineteen percent of gross pay. What is Jordan’s net pay for March?', show: 'q' },
        { say: 'Start with gross pay: 18.40 times 150 is 2,760 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The deductions are nineteen percent of that. Nineteen percent is 0.19, and 2,760 times 0.19 is 524 dollars 40.', show: 'm.1', focus: 'm.1' },
        { say: 'Net pay is gross pay minus deductions: 2,760 minus 524.40 is 2,235 dollars 60. That is the amount Jordan can plan with.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Reading a pay stub',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Pay stub', 'Amount'], rows: [['Gross pay', '\\$1,850.00'], ['Income tax', '\\$214.60'], ['CPP', '\\$99.80'], ['EI', '\\$30.15']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['214.60 + 99.80 + 30.15 = 344.55', '1{,}850.00 - 344.55 = \\$1{,}505.45'] },
      ],
      lines: [
        { say: 'A pay stub often lists each deduction in dollars. In this example, Tyler’s stub for two weeks shows gross pay of 1,850 dollars,', show: 't', focus: 't.0' },
        { say: 'with income tax of 214 dollars 60, C P P of 99 dollars 80, and E I of thirty dollars 15.', focus: ['t.1', 't.2', 't.3'] },
        { say: 'Add the deductions first: together, they come to 344 dollars 55.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract them from gross pay: 1,850 minus 344.55 is 1,505 dollars 45. That is Tyler’s net pay for the two weeks.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Budget with net pay',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Budgeting with gross pay', md: 'Plan with **net** pay, the money that actually lands in your account. If Jordan planned to spend \\$2,760.00, the budget would be short by \\$524.40 every month.' }],
      lines: [
        { say: 'A common mistake is to budget with gross pay. If Jordan planned to spend all 2,760 dollars, the budget would be short by 524 dollars 40 every month, because that money never reaches the account. Always plan with net pay.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sam earns \\$17.50 an hour and works $120$ hours in a month. In this example, deductions take $18\\%$ of gross pay. What is Sam’s net pay?',
          choices: ['\\$1,722.00', '\\$2,100.00', '\\$378.00', '\\$2,478.00'],
          answer: 0,
          working: 'Gross: $17.50 \\times 120 = 2{,}100.00$. Deductions: $2{,}100.00 \\times 0.18 = 378.00$. Net: $2{,}100.00 - 378.00 = 1{,}722.00$. B is the gross pay.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam earns seventeen dollars fifty an hour, and works 120 hours in a month. In this example, deductions take eighteen percent of gross pay. What is Sam’s net pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Gross pay is 17.50 times 120, which is 2,100 dollars. The deductions are 0.18 times 2,100, which is 378 dollars. So net pay is 2,100 minus 378: 1,722 dollars. B is the gross pay, before deductions.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Gross pay is everything you earn.', 'Net pay = gross pay − deductions.', 'Budget with net pay, the money you actually get.'] }],
      lines: [
        { say: 'Let’s sum up. Gross pay is everything you earn, before anything is taken off.', show: 'sum.0' },
        { say: 'Net pay is gross pay minus deductions, such as income tax, C P P and E I.', show: 'sum.1' },
        { say: 'And budget with net pay, the money you actually get. In part two, we list expenses and balance a budget. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
