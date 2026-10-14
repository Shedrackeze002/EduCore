import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-3-b',
  lessonId: 'm203-7-3',
  title: 'Credit Cards and Loans, Part 2: The New Balance and the Minimum Payment',
  thumbnailTitle: 'New Balance and Minimum Payment',
  thumbnail: 'm',
  summary: 'Finding next month’s credit card balance from a payment, interest on the unpaid amount and new purchases (1,040.94 dollars), the minimum payment by a rule given in the question (31.23 dollars), and why cash advances cost more.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.3 · Part 2', title: 'The New Balance', subtitle: 'And the minimum payment' }],
      lines: [
        { say: 'Every month, a credit card statement shows a new balance, and a minimum payment: the least you must pay by the due date.', show: 'title' },
        { say: 'In this video, you will work out next month’s balance and minimum payment, step by step.' },
      ],
    },
    {
      chapter: 'The minimum payment',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Minimum payment', md: 'Paying the **minimum** keeps the account in good standing, but the rest of the balance keeps collecting interest.' }],
      lines: [
        { say: 'Paying only the minimum keeps the account in good standing, so there is no late fee. But the rest of the balance keeps collecting interest, every day.', show: 'key' },
      ],
    },
    {
      chapter: 'Next month’s statement',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Mei’s card', ''], rows: [['Statement balance', '\\$1,240.00'], ['Payment', '\\$400.00'], ['Interest on the unpaid amount', '$20.99\\%$ a year, $30$ days'], ['New purchases', '\\$186.45'], ['Minimum payment', '$3\\%$ of the new balance, or \\$10 if greater']] },
      ],
      lines: [
        { say: 'Mei’s statement balance was 1,240 dollars, and she paid 400 dollars.', show: 't', focus: ['t.0', 't.1'] },
        { say: 'In this example, interest is charged on the unpaid amount only, at 20.99 percent per year, for thirty days. She also made 186 dollars 45 in new purchases.', focus: ['t.2', 't.3'] },
        { say: 'The minimum payment is three percent of the new balance, or ten dollars, whichever is greater. Find the new balance and the minimum payment.', focus: 't.4' },
      ],
    },
    {
      chapter: 'Step by step',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{unpaid: } 1{,}240.00 - 400.00 = 840.00', '\\text{interest: } 840.00 \\times 0.2099 \\div 365 \\times 30 \\approx 14.49', '\\text{new balance: } 840.00 + 14.49 + 186.45 = 1{,}040.94', '\\text{minimum: } 1{,}040.94 \\times 0.03 \\approx 31.23'] }],
      lines: [
        { say: 'First, the unpaid amount: 1,240 minus 400 is 840 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The interest on it: 840, times 0.2099, divided by 365, times thirty, is about fourteen dollars 49.', show: 'm.1', focus: 'm.1' },
        { say: 'The new balance is the unpaid amount, plus the interest, plus the new purchases: 840 plus 14.49 plus 186.45, which is 1,040 dollars 94.', show: 'm.2', focus: 'm.2' },
        { say: 'The minimum payment is three percent of that: about 31 dollars 23. That is more than ten dollars, so the minimum payment is 31 dollars 23.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Cash advances',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Cash advances cost more', md: 'Taking cash from an ATM with a credit card usually has a fee, and interest starts **the same day**, with no interest-free period. It is one of the most expensive ways to borrow.' }],
      lines: [
        { say: 'Watch out for cash advances. Taking cash from an ATM with a credit card usually has a fee, and interest starts the same day, with no interest-free period. It is one of the most expensive ways to borrow.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A statement balance is \\$900.00, and \\$300.00 is paid. Interest is charged on the unpaid amount at $19.99\\%$ per year for $30$ days, and there are \\$75.50 in new purchases. What is the new balance?',
          choices: ['\\$685.36', '\\$690.29', '\\$609.86', '\\$990.29'],
          answer: 0,
          working: 'Unpaid: $900 - 300 = 600$. Interest: $600 \\times 0.1999 \\div 365 \\times 30 \\approx 9.86$. New balance: $600 + 9.86 + 75.50 = 685.36$. B charges interest on the whole \\$900, and C leaves out the new purchases.',
        },
      ],
      lines: [
        { say: 'Your turn. A statement balance is 900 dollars, and 300 dollars is paid. Interest is charged on the unpaid amount at 19.99 percent per year for thirty days, and there are 75 dollars fifty in new purchases. What is the new balance? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The unpaid amount is 600 dollars, and its interest is about nine dollars 86. Add the new purchases: 685 dollars 36. B charges interest on the whole 900 dollars, and C leaves out the new purchases.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unpaid amount = statement balance − payment.', 'New balance = unpaid amount + interest + new purchases.', 'The minimum payment follows the rule given.'] }],
      lines: [
        { say: 'Let’s sum up. The unpaid amount is the statement balance minus your payment.', show: 'sum.0' },
        { say: 'The new balance is the unpaid amount, plus its interest, plus new purchases.', show: 'sum.1' },
        { say: 'And the minimum payment follows the rule on the statement. In part three, we see what carrying a balance really costs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
