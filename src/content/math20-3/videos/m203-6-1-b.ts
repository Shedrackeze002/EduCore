import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-6-1-b',
  lessonId: 'm203-6-1',
  title: 'Personal Budgets, Part 2: Expenses, Surplus and Deficit',
  thumbnailTitle: 'Surplus or Deficit?',
  thumbnail: 'm',
  summary: 'Fixed and variable expenses, setting aside a yearly cost each month, sorting and adding Amara’s monthly expenses (1,655.40 dollars), her surplus of 494.60 dollars, and checking a total with an estimate so no expense is missed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.1 · Part 2', title: 'Balancing a Budget', subtitle: 'Surplus or deficit?' }],
      lines: [
        { say: 'Once you know your net pay, the next question is: where does it all go?', show: 'title' },
        { say: 'In this video, you will sort expenses, add them up, and find whether a budget has money left over, or not enough.' },
      ],
    },
    {
      chapter: 'Fixed and variable expenses',
      layout: 'split',
      leftWidth: 620,
      left: [
        { kind: 'callout', id: 'fixed', tone: 'definition', title: 'Fixed expense', md: 'Costs the **same** amount every month.' },
        { kind: 'callout', id: 'var', tone: 'definition', title: 'Variable expense', md: '**Changes** from month to month, depending on how much you buy or use.' },
      ],
      right: [{ kind: 'table', id: 't', head: ['Fixed', 'Variable'], rows: [['Rent', 'Groceries'], ['Phone plan', 'Gas for a vehicle'], ['Vehicle insurance', 'Utilities'], ['Gym membership', 'Eating out']] }],
      lines: [
        { say: 'Expenses are the things you spend money on each month, and it helps to sort them into two kinds. A fixed expense costs the same amount every month, such as rent, a phone plan, a bus pass or a truck payment.', show: 'fixed' },
        { say: 'A variable expense changes from month to month, depending on how much you buy or use, such as groceries, gas, utilities, eating out and entertainment.', show: 'var' },
        { say: 'Here are some of each.', show: 't' },
        { say: 'Fixed expenses are easy to plan for. For a variable expense, look at what you spent over the last few months, and use the average.' },
      ],
    },
    {
      chapter: 'Yearly costs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Do not forget yearly costs', md: 'Some bills come once a year, such as a vehicle registration or a hunting licence. Divide a yearly cost by $12$, and set that much aside every month.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['180 \\div 12 = 15 \\text{ dollars a month}'] },
      ],
      lines: [
        { say: 'Some bills come only once a year, such as a vehicle registration or a hunting licence. Divide a yearly cost by twelve, and set that much aside every month.', show: 'tip' },
        { say: 'In this example, Cody’s truck registration costs 180 dollars a year. 180 divided by twelve is fifteen dollars, so Cody sets aside fifteen dollars a month, and the bill never catches him short.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Amara’s expenses',
      layout: 'split',
      leftWidth: 700,
      left: [
        { kind: 'table', id: 'f', head: ['Fixed', 'Per month'], rows: [['Rent (her share)', '\\$725.00'], ['Tenant insurance', '\\$22.00'], ['Phone plan', '\\$55.00'], ['Bus pass', '\\$105.00'], ['Gym membership', '\\$40.00']] },
        { kind: 'math', id: 'mf', size: 'md', lines: ['\\text{fixed} = 947.00'] },
      ],
      right: [
        { kind: 'table', id: 'v', head: ['Variable', 'Per month'], rows: [['Utilities (her share)', '\\$68.40'], ['Groceries', '\\$380.00'], ['Eating out', '\\$90.00'], ['Entertainment', '\\$75.00'], ['Clothing', '\\$60.00'], ['Personal care', '\\$35.00']] },
        { kind: 'math', id: 'mv', size: 'md', lines: ['\\text{variable} = 708.40'] },
      ],
      lines: [
        { say: 'Amara shares a two-bedroom apartment in Lethbridge. Here are her monthly expenses, sorted into fixed and variable. Her fixed expenses are her share of the rent, tenant insurance, her phone plan, a bus pass and a gym membership.', show: 'f' },
        { say: 'Together, they come to 947 dollars.', show: 'mf.0', focus: 'mf.0' },
        { say: 'Her variable expenses are her share of the utilities, groceries, eating out, entertainment, clothing and personal care.', show: 'v' },
        { say: 'Together, they come to 708 dollars 40.', show: 'mv.0', focus: 'mv.0' },
      ],
    },
    {
      chapter: 'Surplus or deficit',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Surplus and deficit', md: 'If net income is **more** than total expenses, the difference is a **surplus**: money you can save. If total expenses are **more** than net income, the difference is a **deficit**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{total: } 947.00 + 708.40 = 1{,}655.40', '\\text{surplus: } 2{,}150.00 - 1{,}655.40 = \\$494.60'] },
      ],
      lines: [
        { say: 'To balance a budget, compare total expenses with net income. If income is more, the difference is a surplus: money you can save. If expenses are more, the difference is a deficit: you are spending money you do not have.', show: 'def' },
        { say: 'Amara’s total expenses are 947 plus 708.40, which is 1,655 dollars 40.', show: 'm.0', focus: 'm.0' },
        { say: 'Her net income is 2,150 dollars a month. Income is bigger, so there is a surplus: 2,150 minus 1,655.40 is 494 dollars 60, which she can save.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Missing an expense',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Missing an expense', md: 'Leaving out even one small expense makes the surplus look bigger than it really is. Check with an estimate: round each expense and add,\n\n$700 + 70 + 20 + 60 + 100 + 40 + 380 + 90 + 80 + 60 + 40 \\approx 1{,}640$\n\nwhich is close to the exact total, $1{,}655.40$.' }],
      lines: [
        { say: 'A common mistake is to miss an expense. Leaving out even one small line makes the surplus look bigger than it really is.', show: 'oops' },
        { say: 'A quick check: round each expense, and add the rounded amounts. For Amara, that gives about 1,640 dollars, close to the exact total of 1,655.40. If your exact total is far from your estimate, look for a missing or doubled line.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Leah’s net income is \\$1,900.00 a month, and her expenses total \\$1,985.50. Does Leah’s budget have a surplus or a deficit, and how much?',
          choices: ['a deficit of \\$85.50', 'a surplus of \\$85.50', 'a deficit of \\$185.50', 'a surplus of \\$1,985.50'],
          answer: 0,
          working: 'Expenses are more than income, so there is a deficit: $1{,}985.50 - 1{,}900.00 = 85.50$. B has the right amount, but calls it a surplus.',
        },
      ],
      lines: [
        { say: 'Your turn. Leah’s net income is 1,900 dollars a month, and her expenses total 1,985 dollars 50. Does Leah’s budget have a surplus or a deficit, and how much? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Leah’s expenses are more than the income, so there is a deficit: 1,985.50 minus 1,900 is 85 dollars 50. B has the right amount, but calls it a surplus.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fixed expenses stay the same; variable expenses change.', 'Set aside a yearly cost ÷ 12 each month.', 'Surplus: income is more. Deficit: expenses are more.'] }],
      lines: [
        { say: 'Let’s sum up. Fixed expenses stay the same each month, and variable expenses change.', show: 'sum.0' },
        { say: 'For a yearly bill, set aside one twelfth of it each month.', show: 'sum.1' },
        { say: 'And compare total expenses with net income: a surplus means income is more, and a deficit means expenses are more. In part three, we compare each expense with income, using percents and circle graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
