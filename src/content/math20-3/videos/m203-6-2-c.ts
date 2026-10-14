import type { Explainer } from '@/video/script.ts';

const statement = { kind: 'table' as const, id: 't', head: ['Date', 'Description', 'Withdrawal', 'Deposit', 'Balance'], rows: [['', 'Opening balance', '', '', '\\$642.15'], ['Oct 3', 'Debit purchase: groceries', '\\$87.42', '', '\\$554.73'], ['Oct 8', 'Payroll deposit', '', '\\$1,125.60', '\\$1,680.33'], ['Oct 12', 'Bill payment: phone', '\\$65.00', '', '\\$1,615.33'], ['Oct 31', 'Monthly account fee', '\\$4.95', '', '\\$1,610.38']] };

const video: Explainer = {
  id: 'm203-6-2-c',
  lessonId: 'm203-6-2',
  title: 'Banking Services, Part 3: Overdrafts and Statements',
  thumbnailTitle: 'Overdrafts and Statements',
  thumbnail: 't',
  summary: 'What an overdraft is and what it costs (a 5 dollar fee plus daily interest at a rate given in the question: 6.42 dollars for Liam), reading a bank statement, checking its closing balance with totals, and keeping a running balance.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.2 · Part 3', title: 'Overdrafts and Statements', subtitle: 'Know your balance' }],
      lines: [
        { say: 'Spend more than is in your account, and the bank may let the payment through, for a price. Your monthly statement shows exactly where your balance stands.', show: 'title' },
        { say: 'In this video, you will find the cost of an overdraft, and check the closing balance on a bank statement.' },
      ],
    },
    {
      chapter: 'Overdrafts',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Overdraft', md: 'An account is **overdrawn** when more money goes out than is in it, so the balance drops below zero. **Overdraft protection** lets the payment go through, but the bank usually charges a fee, plus interest on the overdrawn amount for each day until it is paid back.' }],
      lines: [
        { say: 'An account is overdrawn when more money goes out than is in it, so the balance drops below zero.', show: 'def' },
        { say: 'Overdraft protection lets the payment go through, but the bank usually charges a fee, plus interest on the overdrawn amount for each day, until it is paid back.' },
      ],
    },
    {
      chapter: 'The cost of an overdraft',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Balance \\$210.40, rent \\$485.00. Fee \\$5, plus $21\\%$ a year charged daily, for $9$ days.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['485.00 - 210.40 = 274.60', '274.60 \\times 0.21 \\div 365 \\times 9 \\approx 1.42', '5 + 1.42 = \\$6.42'] },
      ],
      lines: [
        { say: 'Liam has 210 dollars 40 in his account when a rent payment of 485 dollars goes through. In this example, his bank charges a five-dollar overdraft fee, plus interest of 21 percent a year on the overdrawn amount, charged daily. The account stays overdrawn for nine days. What does the overdraft cost?', show: 'q' },
        { say: 'First, how far below zero did the balance go? 485 minus 210.40 is 274 dollars 60.', show: 'm.0', focus: 'm.0' },
        { say: 'The interest is that amount, times 0.21, divided by 365 days, times nine days. That is about one dollar 42.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the fee: five plus 1.42 is six dollars 42. Most of the cost is the fee, so even a short overdraft is worth avoiding.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Reading a statement',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{closing} = \\text{opening} + \\text{deposits} - \\text{withdrawals}'] },
        statement,
      ],
      lines: [
        { say: 'A bank statement lists every transaction in a month. It starts with the opening balance, adds deposits, subtracts withdrawals, and ends with the closing balance.', show: 'f' },
        { say: 'Here is a statement for October. The opening balance is 642 dollars 15.', show: 't', focus: 't.0' },
        { say: 'A grocery purchase of 87 dollars 42 takes the balance down, and a payroll deposit of 1,125 dollars 60 brings it up.', focus: ['t.1', 't.2'] },
        { say: 'A phone bill and the monthly account fee take it down again, to a closing balance of 1,610 dollars 38.', focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Checking the closing balance',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{deposits: } 1{,}125.60', '\\text{withdrawals: } 87.42 + 65.00 + 4.95 = 157.37', '642.15 + 1{,}125.60 - 157.37 = 1{,}610.38'] }],
      lines: [
        { say: 'Use totals to check the closing balance. There is one deposit, 1,125 dollars 60.', show: 'm.0', focus: 'm.0' },
        { say: 'The withdrawals are 87.42, 65 and 4.95, which add to 157 dollars 37.', show: 'm.1', focus: 'm.1' },
        { say: 'Opening balance plus deposits, minus withdrawals: 642.15 plus 1,125.60, minus 157.37, is 1,610 dollars 38. That matches the statement.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Keep a running balance',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Keep a running balance', md: 'Work down the table one line at a time: add each deposit, and subtract each withdrawal. A running balance shows you right away if a payment would overdraw the account.' }],
      lines: [
        { say: 'You can also keep a running balance, like the last column of the statement. Work down one line at a time: add each deposit, and subtract each withdrawal.', show: 'tip' },
        { say: 'A running balance shows you right away if a payment would overdraw the account, before the bank charges you for it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A statement shows an opening balance of \\$350.00, deposits of \\$900.00, and withdrawals of \\$1,020.50. What is the closing balance?',
          choices: ['\\$229.50', '\\$2,270.50', '\\$670.50', '\\$120.50'],
          answer: 0,
          working: '$350.00 + 900.00 - 1{,}020.50 = 229.50$. B adds the withdrawals instead of subtracting them.',
        },
      ],
      lines: [
        { say: 'Your turn. A statement shows an opening balance of 350 dollars, deposits of 900 dollars, and withdrawals of 1,020 dollars 50. What is the closing balance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 350 plus 900 is 1,250, and 1,250 minus 1,020.50 is 229 dollars 50. B adds the withdrawals instead of subtracting them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An overdraft costs a fee plus daily interest: amount × rate ÷ 365 × days.', 'Closing balance = opening balance + deposits − withdrawals.', 'A running balance warns you before you overdraw.'] }],
      lines: [
        { say: 'Let’s sum up. An overdraft costs a fee, plus daily interest: the amount, times the rate, divided by 365, times the days.', show: 'sum.0' },
        { say: 'The closing balance is the opening balance, plus deposits, minus withdrawals.', show: 'sum.1' },
        { say: 'And a running balance warns you before you overdraw. In part four, we reconcile an account. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
