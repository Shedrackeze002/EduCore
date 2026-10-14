import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-3-d',
  lessonId: 'm203-7-3',
  title: 'Credit Cards and Loans, Part 4: The Cost of a Loan',
  thumbnailTitle: 'The Cost of a Loan',
  thumbnail: 'f',
  summary: 'Loans, terms, total paid and finance charge: a 24,000 dollar truck loan at 480.80 dollars a month for 5 years costs 4,848 dollars, why 5 years of monthly payments is 60 payments, and the finance charge as a percent of the amount borrowed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.3 · Part 4', title: 'The Cost of a Loan', subtitle: 'Add up every payment' }],
      lines: [
        { say: 'A lender tells you the monthly payment. But what does the loan really cost you, from the first payment to the last?', show: 'title' },
        { say: 'In this video, you will find the total paid on a loan, and its finance charge.' },
      ],
    },
    {
      chapter: 'Loans and terms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Loan and term', md: 'A **loan** is paid back in equal payments over a set time, called the **term**.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{total paid} = \\text{payment} \\times \\text{number of payments}', '\\text{finance charge} = \\text{total paid} - \\text{amount borrowed}'] },
      ],
      lines: [
        { say: 'A loan is paid back in equal payments over a set time, called the term.', show: 'def' },
        { say: 'The total paid is the payment, times the number of payments.', show: 'f.0', focus: 'f.0' },
        { say: 'And the finance charge, the cost of the loan, is the total paid minus the amount borrowed.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A truck loan',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$24,000 borrowed. Payments of \\$480.80 a month for $5$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 12 = 60 \\text{ payments}', '480.80 \\times 60 = 28{,}848.00', '28{,}848.00 - 24{,}000 = 4{,}848.00'] },
      ],
      lines: [
        { say: 'Simran borrows 24,000 dollars from a credit union for a truck. The payments are 480 dollars 80 a month, for five years. What does the loan cost?', show: 'q' },
        { say: 'Monthly payments for five years means five times twelve: sixty payments.', show: 'm.0', focus: 'm.0' },
        { say: 'The total paid is 480.80 times sixty, which is 28,848 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The finance charge is 28,848 minus the 24,000 borrowed: 4,848 dollars. That is what the truck costs on top of its price.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixing months and years',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing months and years', md: 'Monthly payments for $5$ years means $5 \\times 12 = 60$ payments, not $5$. Using $5$ gives a total of \\$2,404.00, far less than the \\$24,000 borrowed. Check that the total paid is **more** than the amount borrowed.' }],
      lines: [
        { say: 'A common mistake is to use five payments instead of sixty. That gives a total of 2,404 dollars, far less than the 24,000 borrowed, which cannot be right. Always check that the total paid is more than the amount borrowed.', show: 'oops' },
      ],
    },
    {
      chapter: 'As a percent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4{,}848}{24{,}000} \\times 100 = 20.2\\%'] }],
      lines: [
        { say: 'To see how big a finance charge is, compare it with the amount borrowed. 4,848 divided by 24,000, times 100, is 20.2 percent.', show: 'm.0', focus: 'm.0' },
        { say: 'So over the five years, Simran pays about one fifth more than the truck’s price. A shorter term or a lower rate would shrink that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car loan of \\$15,000 has payments of \\$295.50 a month for $5$ years. What is the finance charge?',
          choices: ['\\$2,730.00', '\\$17,730.00', '\\$1,477.50', '\\$3,546.00'],
          answer: 0,
          working: '$5 \\times 12 = 60$ payments, and $295.50 \\times 60 = 17{,}730.00$. Finance charge: $17{,}730.00 - 15{,}000 = 2{,}730.00$. B is the total paid.',
        },
      ],
      lines: [
        { say: 'Your turn. A car loan of 15,000 dollars has payments of 295 dollars fifty a month, for five years. What is the finance charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. There are sixty payments, so the total paid is 295.50 times sixty: 17,730 dollars. Take away the 15,000 borrowed: the finance charge is 2,730 dollars. B is the total paid, not the finance charge.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Total paid = payment × number of payments.', 'Monthly payments: number of payments = years × 12.', 'Finance charge = total paid − amount borrowed.'] }],
      lines: [
        { say: 'Let’s sum up. The total paid is the payment times the number of payments.', show: 'sum.0' },
        { say: 'For monthly payments, the number of payments is the years times twelve.', show: 'sum.1' },
        { say: 'And the finance charge is the total paid minus the amount borrowed. In part five, we compare credit options, including rent-to-own. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
