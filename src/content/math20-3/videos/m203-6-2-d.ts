import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-6-2-d',
  lessonId: 'm203-6-2',
  title: 'Banking Services, Part 4: Reconciling an Account',
  thumbnailTitle: 'Reconciling an Account',
  thumbnail: 'm',
  summary: 'Reconciling a register with a bank statement: outstanding cheques and late deposits adjust the statement, fees and interest adjust the register, and both of Ngozi’s balances come to 1,545.95 dollars.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.2 · Part 4', title: 'Reconciling an Account', subtitle: 'Make two records agree' }],
      lines: [
        { say: 'At the end of the month, your own record of your account rarely matches the bank’s statement. That is usually not a mistake. It is timing.', show: 'title' },
        { say: 'In this video, you will reconcile an account, so that your record and the bank’s agree.' },
      ],
    },
    {
      chapter: 'Register and statement',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'reg', tone: 'definition', title: 'Register', md: 'Your **own record** of the account: every deposit and withdrawal, as you make it.' },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reconciling', md: 'Adjust the **statement** for things the bank has not seen yet, and the **register** for things you have not recorded yet. When both adjusted balances match, the account is reconciled.' },
      ],
      lines: [
        { say: 'Your own record of the account is called a register. You write down every deposit and withdrawal as you make it.', show: 'reg' },
        { say: 'To reconcile an account, adjust the statement for things the bank has not seen yet, and adjust the register for things you have not recorded yet. When both adjusted balances match, the account is reconciled.', show: 'def' },
      ],
    },
    {
      chapter: 'What to adjust',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Item', 'Adjust', 'How'], rows: [['Outstanding cheques', 'Statement', 'Subtract'], ['Deposits not on the statement', 'Statement', 'Add'], ['Fees', 'Register', 'Subtract'], ['Interest', 'Register', 'Add']] }],
      lines: [
        { say: 'Here is what to adjust, and how.', show: 't' },
        { say: 'An outstanding cheque has been written, but not yet cashed. The bank has not taken the money out yet, so subtract it from the statement balance.', focus: 't.0' },
        { say: 'A deposit you made too late to be on the statement is added to the statement balance.', focus: 't.1' },
        { say: 'Fees and interest are already on the statement, but often not in your register. So subtract fees from the register, and add interest to it.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Reconciling for June',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Statement', 'Register'], rows: [['Balance \\$1,482.35', 'Balance \\$1,550.40'], ['Cheques out: \\$250.00 and \\$86.40', 'Fee not recorded: \\$4.95'], ['Deposit not shown: \\$400.00', 'Interest not recorded: \\$0.50']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['1{,}482.35 + 400.00 - 250.00 - 86.40 = 1{,}545.95', '1{,}550.40 - 4.95 + 0.50 = 1{,}545.95'] },
      ],
      lines: [
        { say: 'Ngozi’s June statement shows a balance of 1,482 dollars 35. Cheque number 112, for 250 dollars, and cheque number 114, for 86 dollars 40, are outstanding. And a 400-dollar deposit she made on June 30 is not on the statement.', show: 't', focus: 't.0' },
        { say: 'Her register shows 1,550 dollars 40, but she has not recorded the four dollars 95 monthly fee, or fifty cents of interest.', focus: ['t.1', 't.2'] },
        { say: 'Adjust the statement: add the deposit, and subtract both cheques. 1,482.35 plus 400, minus 250, minus 86.40, is 1,545 dollars 95.', show: 'm.0', focus: 'm.0' },
        { say: 'Correct the register: subtract the fee, and add the interest. 1,550.40 minus 4.95, plus 0.50, is also 1,545 dollars 95.', show: 'm.1', focus: 'm.1' },
        { say: 'Both balances match, so the account is reconciled.' },
      ],
    },
    {
      chapter: 'Adjusting the wrong record',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adjusting the wrong record', md: 'Outstanding cheques and late deposits change the **statement** balance, because the bank has not seen them yet. Fees and interest change the **register**, because you have not recorded them yet.' }],
      lines: [
        { say: 'A common mistake is to adjust the wrong record. Outstanding cheques and late deposits change the statement balance, because the bank has not seen them yet.', show: 'oops' },
        { say: 'Fees and interest change the register, because you have not recorded them yet. Mix these up, and the two balances will not match. If they still do not match, check each line of the register against the statement, for a missing transaction or a number copied wrongly.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A statement balance is \\$820.00. A cheque for \\$120.00 is outstanding, and a deposit of \\$200.00 is not on the statement. What is the adjusted statement balance?',
          choices: ['\\$900.00', '\\$740.00', '\\$1,140.00', '\\$500.00'],
          answer: 0,
          working: '$820.00 + 200.00 - 120.00 = 900.00$. B subtracts the deposit and adds the cheque.',
        },
      ],
      lines: [
        { say: 'Your turn. A statement balance is 820 dollars. A cheque for 120 dollars is outstanding, and a deposit of 200 dollars is not on the statement. What is the adjusted statement balance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Add the deposit, and subtract the outstanding cheque: 820 plus 200, minus 120, is 900 dollars. B subtracts the deposit and adds the cheque.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Statement: add late deposits, subtract outstanding cheques.', 'Register: subtract fees, add interest.', 'When both adjusted balances match, the account is reconciled.'] }],
      lines: [
        { say: 'Let’s sum up. Adjust the statement: add deposits it does not show, and subtract outstanding cheques.', show: 'sum.0' },
        { say: 'Adjust the register: subtract fees, and add interest.', show: 'sum.1' },
        { say: 'And when both adjusted balances match, the account is reconciled. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
