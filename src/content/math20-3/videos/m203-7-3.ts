import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-3',
  lessonId: 'm203-7-3',
  title: 'Credit Cards and Loans, Part 1: Credit Card Interest',
  thumbnailTitle: 'Credit Card Interest',
  thumbnail: 'f',
  summary: 'Credit, credit limits and finance charges, the interest-free period, daily interest on an unpaid balance (850 dollars at 19.99% for 30 days is 13.97 dollars, with the rule given in the question), and why the rate must be a decimal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.3 · Part 1', title: 'Credit Card Interest', subtitle: 'Borrowing is almost never free' }],
      lines: [
        { say: 'Credit lets you buy a truck in Grande Prairie today and pay for it over five years, or put a new laptop on a card and pay next month. It is useful, but it is almost never free.', show: 'title' },
        { say: 'In this video, you will find the interest a credit card charges on an unpaid balance.' },
      ],
    },
    {
      chapter: 'Credit and finance charges',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Credit, credit limit and finance charge', md: '**Credit** is money you borrow now and pay back later. A credit card’s **credit limit** is the most you can owe at one time. A **finance charge** is the cost of using credit: interest plus any fees.' }],
      lines: [
        { say: 'Credit is money you borrow now and pay back later.', show: 'def' },
        { say: 'A credit card has a credit limit: the most you can owe on it at one time. And a finance charge is the cost of using credit: the interest, plus any fees.' },
      ],
    },
    {
      chapter: 'The interest-free period',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Pay the whole balance', md: 'On most cards, if you pay the **whole** statement balance by the due date, you pay no interest on purchases. Leave part of it unpaid, and the card charges interest **every day** on what you owe.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{interest} = \\text{balance} \\times \\text{rate} \\div 365 \\times \\text{days}'] },
      ],
      lines: [
        { say: 'Most cards give you an interest-free period. If you pay the whole statement balance by the due date, you pay no interest on your purchases.', show: 'key' },
        { say: 'But if you leave part of it unpaid, the card charges interest every day on what you owe. Each card has its own rules, so every question tells you the rule to use.' },
        { say: 'A common rule is: interest equals the balance, times the yearly rate as a decimal, divided by 365, times the number of days.', show: 'f', focus: 'f.0' },
      ],
    },
    {
      chapter: 'Interest for one month',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Unpaid balance \\$850, at $19.99\\%$ per year charged daily, for $30$ days.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['19.99\\% = 0.1999', '850 \\times 0.1999 \\div 365 \\times 30 \\approx 13.97'] },
      ],
      lines: [
        { say: 'Cole has an unpaid balance of 850 dollars, on a card that charges 19.99 percent per year, charged daily. How much interest is charged for thirty days?', show: 'q' },
        { say: 'First, write the rate as a decimal: 19.99 percent is 0.1999.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the interest is 850, times 0.1999, divided by 365, times thirty. That is about thirteen dollars 97.', show: 'm.1', focus: 'm.1' },
        { say: 'Thirteen dollars 97 for one month can seem small. But it is charged again every month the balance stays, and it would have been zero if the balance had been paid in full.' },
      ],
    },
    {
      chapter: 'The rate as a decimal',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using 19.99 instead of 0.1999', md: 'Using the percent gives $850 \\times 19.99 \\div 365 \\times 30 \\approx 1{,}396.56$, more than the balance itself. Divide the percent by $100$ first: $19.99\\% = 0.1999$.' }],
      lines: [
        { say: 'A common mistake is to use 19.99 instead of 0.1999. That gives about 1,396 dollars of interest for one month, more than the balance itself. Divide the percent by 100 first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A card charges $18.99\\%$ per year, charged daily. How much interest is charged on an unpaid balance of \\$600 for $31$ days?',
          choices: ['\\$9.68', '\\$967.71', '\\$113.94', '\\$9.37'],
          answer: 0,
          working: '$600 \\times 0.1899 \\div 365 \\times 31 \\approx 9.68$. B uses $18.99$ instead of $0.1899$, and C is the interest for a whole year.',
        },
      ],
      lines: [
        { say: 'Your turn. A card charges 18.99 percent per year, charged daily. How much interest is charged on an unpaid balance of 600 dollars for 31 days? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 600, times 0.1899, divided by 365, times 31, is about nine dollars 68. B uses 18.99 instead of 0.1899, and C is the interest for a whole year.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A finance charge is interest plus fees.', 'Pay the whole balance by the due date to pay no interest.', 'Interest = balance × rate ÷ 365 × days, rate as a decimal.'] }],
      lines: [
        { say: 'Let’s sum up. A finance charge is the cost of credit: interest plus fees.', show: 'sum.0' },
        { say: 'Pay the whole statement balance by the due date, and you pay no interest on purchases.', show: 'sum.1' },
        { say: 'Otherwise, interest is the balance, times the rate as a decimal, divided by 365, times the days. In part two, we read a statement and its minimum payment. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
