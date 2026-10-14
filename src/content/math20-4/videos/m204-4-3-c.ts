import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-3-c',
  lessonId: 'm204-4-3',
  title: 'Credit Cards and Loans, Part 3: The Cost of a Loan',
  thumbnailTitle: 'The Cost of a Loan',
  thumbnail: 'm',
  summary: 'The total paid on a loan (48 monthly payments of 219.75 dollars is 10,548 dollars), the cost of borrowing (1,548 dollars on a 9,000 dollar car loan), and how a longer loan with smaller payments costs more.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.3 · Part 3', title: 'The Cost of a Loan', subtitle: 'What borrowing really costs' }],
      lines: [
        { say: 'A loan for a car or a computer is paid back in equal monthly payments. Those payments add up to more than you borrowed.', show: 'title' },
        { say: 'In this video, you will find the total paid on a loan, and the cost of borrowing.' },
      ],
    },
    {
      chapter: 'Cost of borrowing',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Cost of borrowing', md: 'The **cost of borrowing** is the extra money you pay for a loan.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{total paid} = \\text{payment} \\times \\text{number of payments}', '\\text{cost of borrowing} = \\text{total paid} - \\text{amount borrowed}'] },
      ],
      lines: [
        { say: 'The cost of borrowing is the extra money you pay for a loan. It is the price of using someone else’s money now, instead of saving up first.', show: 'def' },
        { say: 'First, find the total paid: the payment times the number of payments.', show: 'f.0', focus: 'f.0' },
        { say: 'Then the cost of borrowing is the total paid minus the amount borrowed.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A loan for a used car',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Marcus borrows \\$9,000 for a used car. He pays it back with $48$ monthly payments of \\$219.75.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['219.75 \\times 48 = 10{,}548', '10{,}548 - 9{,}000 = 1{,}548'] },
      ],
      lines: [
        { say: 'Marcus borrows 9,000 dollars for a used car. He pays it back with 48 monthly payments of 219 dollars 75. Find the total paid, and the cost of borrowing.', show: 'q' },
        { say: 'The total paid is 219.75 times 48: 10,548 dollars. Check with an estimate: 220 times 50 is 11,000, and 48 payments is a little less than 50, so 10,548 makes sense.', show: 'm.0', focus: 'm.0' },
        { say: 'The cost of borrowing is 10,548 minus 9,000: 1,548 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So borrowing costs Marcus 1,548 dollars extra. Forty-eight months is four years of payments.' },
      ],
    },
    {
      chapter: 'Longer loans cost more',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Loan of \\$9,000', 'Payment', 'Total paid', 'Cost of borrowing'], rows: [['$48$ months', '\\$219.75', '\\$10,548', '\\$1,548'], ['$60$ months', '\\$182.50', '\\$10,950', '\\$1,950']] },
      ],
      lines: [
        { say: 'Suppose the lender also offers sixty monthly payments of 182 dollars fifty. The payment is smaller. Is the loan cheaper?', show: 't', focus: 't.1' },
        { say: '182.50 times sixty is 10,950 dollars, so the cost of borrowing is 1,950 dollars.', focus: 't.1' },
        { say: 'That is 402 dollars more than the 48-month loan. A longer loan with smaller payments usually costs more, because you pay interest for longer.', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ivy borrows \\$6,000 and pays it back with $36$ monthly payments of \\$189.50. What is the cost of borrowing?',
          choices: ['\\$822', '\\$6,822', '\\$189.50', '\\$6,189.50'],
          answer: 0,
          working: 'Total paid: $189.50 \\times 36 = 6{,}822$. Cost of borrowing: $6{,}822 - 6{,}000 = 822$. B is the total paid.',
        },
      ],
      lines: [
        { say: 'Your turn. Ivy borrows 6,000 dollars, and pays it back with 36 monthly payments of 189 dollars fifty. What is the cost of borrowing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The total paid is 189.50 times 36: 6,822 dollars. Take away the 6,000 borrowed, and the cost of borrowing is 822 dollars. B is the total paid, not the extra cost.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Total paid = payment × number of payments.', 'Cost of borrowing = total paid − amount borrowed.', 'Smaller payments over longer usually cost more.'] }],
      lines: [
        { say: 'Let’s sum up. The total paid is the payment times the number of payments.', show: 'sum.0' },
        { say: 'The cost of borrowing is the total paid minus the amount borrowed.', show: 'sum.1' },
        { say: 'And smaller payments over a longer time usually cost more. In part four, we see why paying the full balance matters. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
