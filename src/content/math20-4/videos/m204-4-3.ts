import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-3',
  lessonId: 'm204-4-3',
  title: 'Credit Cards and Loans, Part 1: How a Credit Card Bill Works',
  thumbnailTitle: 'Credit Card Bills',
  thumbnail: 't',
  summary: 'Credit, the statement balance, the unpaid balance and the minimum payment, reading a credit card statement, and one month of interest on an unpaid balance at a monthly rate given in the question (2% of 400 dollars is 8 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.3 · Part 1', title: 'How a Credit Card Bill Works', subtitle: 'Buy now, pay later' }],
      lines: [
        { say: 'A credit card lets you buy now and pay later. If you pay the whole bill on time, it costs nothing extra. If you do not, the bank charges interest, and it adds up fast.', show: 'title' },
        { say: 'In this video, you will read a credit card statement, and find one month of interest on an unpaid balance.' },
      ],
    },
    {
      chapter: 'Credit and balances',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'c', tone: 'definition', title: 'Credit', md: '**Credit** means buying something now with borrowed money and paying it back later. Credit cards and loans are both credit.' },
        { kind: 'callout', id: 'b', tone: 'definition', title: 'Balance', md: 'The **balance** is the amount you owe. The **statement balance** is what you owe on the monthly bill. The **unpaid balance** is the part you still owe after you make a payment.' },
        { kind: 'callout', id: 'mp', tone: 'definition', title: 'Minimum payment', md: 'The **minimum payment** is the smallest amount you must pay by the due date. It is often only a small percent of the balance.' },
      ],
      lines: [
        { say: 'Credit means buying something now with borrowed money, and paying it back later. Credit cards and loans are both credit.', show: 'c' },
        { say: 'The balance is the amount you owe. The statement balance is what you owe on the monthly bill. And the unpaid balance is the part you still owe after you make a payment.', show: 'b' },
        { say: 'The minimum payment is the smallest amount you must pay by the due date. It is often only a small percent of the balance.', show: 'mp' },
      ],
    },
    {
      chapter: 'Reading a statement',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Credit card statement', 'Amount'], rows: [['Statement balance', '\\$640.00'], ['Minimum payment', '\\$19.20'], ['Payment due date', 'June 21'], ['Interest rate', '$19.99\\%$ per year']] }],
      lines: [
        { say: 'Here is a credit card statement. The statement balance is 640 dollars. That is what you owe for the month.', show: 't', focus: 't.0' },
        { say: 'The minimum payment is only nineteen dollars twenty. That is three percent of the balance.', focus: 't.1' },
        { say: 'You must pay at least that much by the due date, June 21st. And this card charges 19.99 percent per year on any unpaid balance.', focus: ['t.2', 't.3'] },
        { say: 'For most cards, if you pay the full statement balance by the due date, you pay no interest. If you pay less, the card charges interest on the unpaid balance. Each card has its own rules, so read your statement.' },
      ],
    },
    {
      chapter: 'Interest for one month',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Tariq has an unpaid balance of \\$400. His card charges $2\\%$ per month on the unpaid balance.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\% = 0.02', '400 \\times 0.02 = 8'] },
      ],
      lines: [
        { say: 'In this example, Tariq has an unpaid balance of 400 dollars. His card charges two percent per month on the unpaid balance. How much interest is he charged?', show: 'q' },
        { say: 'Two percent is 0.02.', show: 'm.0', focus: 'm.0' },
        { say: 'And 400 times 0.02 is eight dollars of interest this month.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An unpaid balance is \\$650. The card charges $1.5\\%$ per month on the unpaid balance. How much interest is charged this month?',
          choices: ['\\$9.75', '\\$97.50', '\\$975.00', '\\$659.75'],
          answer: 0,
          working: '$1.5\\% = 0.015$, and $650 \\times 0.015 = 9.75$. B uses $0.15$, C uses $1.5$, and D is the new balance.',
        },
      ],
      lines: [
        { say: 'Your turn. An unpaid balance is 650 dollars. The card charges 1.5 percent per month on the unpaid balance. How much interest is charged this month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1.5 percent is 0.015, and 650 times 0.015 is nine dollars 75. B uses 0.15, C uses 1.5, and D is the new balance, not the interest.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A credit card is a loan you pay back later.', 'Pay the full statement balance on time to avoid interest.', 'Interest for one month = unpaid balance × monthly rate.'] }],
      lines: [
        { say: 'Let’s sum up. A credit card is a loan that you pay back later.', show: 'sum.0' },
        { say: 'Pay the full statement balance by the due date, and on most cards you pay no interest.', show: 'sum.1' },
        { say: 'And one month of interest is the unpaid balance times the monthly rate. In part two, we use a yearly rate. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
