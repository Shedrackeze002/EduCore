import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-6-2',
  lessonId: 'm203-6-2',
  title: 'Banking Services, Part 1: Service Charges',
  thumbnailTitle: 'Service Charges',
  thumbnail: 'm',
  summary: 'What a chequing account, a transaction and a service charge are, counting transactions, the service charge on a plan with 12 included transactions (13.70 dollars for 19 transactions), why only the extra transactions cost extra, and ATM fees.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.2 · Part 1', title: 'Service Charges', subtitle: 'What your account costs' }],
      lines: [
        { say: 'A chequing account is where your pay lands and your bills leave. Banks and credit unions charge for that service, and choosing the right plan can save you a hundred dollars or more a year.', show: 'title' },
        { say: 'In this video, you will find the monthly service charge on a chequing account.' },
      ],
    },
    {
      chapter: 'Accounts and transactions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Chequing account and transaction', md: 'A **chequing account** is for everyday money. Each deposit, debit purchase, bill payment, e-transfer or cheque is a **transaction**.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Service charge', md: 'The fee for the account: usually a **monthly fee**, plus a fee for each transaction **past** the number the plan includes.' },
      ],
      lines: [
        { say: 'A chequing account is for everyday money. Each deposit, debit purchase, bill payment, e-transfer or cheque is a transaction.', show: 'def' },
        { say: 'A service charge is the fee for the account. It is usually a monthly fee, plus a fee for each transaction past the number the plan includes.', show: 'def2' },
        { say: 'Plans and fees differ from one bank or credit union to another, and they change often. So every question gives you the fees to use.' },
      ],
    },
    {
      chapter: 'Counting transactions',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Bao’s transactions in May', 'Number'], rows: [['Debit purchases', '$9$'], ['Bill payments', '$4$'], ['E-transfers', '$3$'], ['Deposits', '$2$'], ['Cheques', '$1$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['9 + 4 + 3 + 2 + 1 = 19'] },
      ],
      lines: [
        { say: 'Before you can find a service charge, count the transactions. Here is what Bao did with the account in May.', show: 't' },
        { say: 'Nine debit purchases, four bill payments and three e-transfers.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'He also made two deposits and wrote one cheque. Each of these counts too.', focus: ['t.3', 't.4'] },
        { say: 'Altogether, that is nineteen transactions.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A limited plan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Everyday plan: \\$4.95 a month, $12$ transactions included, \\$1.25 for each extra.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['19 - 12 = 7 \\text{ extra}', '7 \\times 1.25 = 8.75', '4.95 + 8.75 = \\$13.70'] },
      ],
      lines: [
        { say: 'In this example, Bao’s credit union has an Everyday plan that costs four dollars 95 a month, includes twelve transactions, and charges one dollar 25 for each extra transaction. What was Bao’s service charge for May?', show: 'q' },
        { say: 'First, find the extra transactions: nineteen minus twelve is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Each extra costs 1.25, so seven extras cost seven times 1.25: eight dollars 75.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the monthly fee: 4.95 plus 8.75 is thirteen dollars seventy. That was Bao’s service charge for May.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Only the extras cost extra',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Charging for the included transactions', md: 'Only the transactions **past** the included ones cost extra. Charging for all $19$ gives $4.95 + 19 \\times 1.25 = 28.70$, more than double the real charge.' }],
      lines: [
        { say: 'A common mistake is to charge for every transaction. Only the transactions past the included ones cost extra. Charging for all nineteen gives 4.95 plus nineteen times 1.25, which is 28 dollars seventy, more than double the real charge.', show: 'oops' },
      ],
    },
    {
      chapter: 'ATM fees',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Watch for other fees', md: 'Using another bank’s ATM can cost twice: your own bank charges a fee, and the owner of the ATM adds its own.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times (2.00 + 3.00) = 10.00'] },
      ],
      lines: [
        { say: 'Watch for other fees too. Using another bank’s ATM can cost twice: your own bank charges a fee, and the owner of the ATM adds its own.', show: 'tip' },
        { say: 'In this example, Bao’s credit union charges two dollars for each withdrawal at another bank’s machine, and the owner of the machine adds three dollars. Two withdrawals there cost two times five, which is ten dollars, more than double the monthly fee.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plan costs \\$5.50 a month, includes $15$ transactions, and charges \\$0.75 for each extra. Ana makes $23$ transactions in a month. What is Ana’s service charge?',
          choices: ['\\$11.50', '\\$22.75', '\\$6.00', '\\$5.50'],
          answer: 0,
          working: 'Extras: $23 - 15 = 8$, and $8 \\times 0.75 = 6.00$. Service charge: $5.50 + 6.00 = 11.50$. B charges for all $23$ transactions, and C leaves out the monthly fee.',
        },
      ],
      lines: [
        { say: 'Your turn. A plan costs five dollars fifty a month, includes fifteen transactions, and charges 75 cents for each extra. Ana makes 23 transactions in a month. What is Ana’s service charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ana made 23 minus fifteen, which is eight extra transactions, and eight times 75 cents is six dollars. Add the monthly fee: eleven dollars fifty. B charges for all 23 transactions, and C leaves out the monthly fee.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count every transaction: deposits, purchases, payments, transfers and cheques.', 'Service charge = monthly fee + extra transactions × fee for each.', 'Only transactions past the included ones cost extra.'] }],
      lines: [
        { say: 'Let’s sum up. Count every transaction: deposits, purchases, bill payments, transfers and cheques.', show: 'sum.0' },
        { say: 'The service charge is the monthly fee, plus the extra transactions times the fee for each.', show: 'sum.1' },
        { say: 'And only the transactions past the included ones cost extra. In part two, we compare two plans, and find where they cost the same. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
