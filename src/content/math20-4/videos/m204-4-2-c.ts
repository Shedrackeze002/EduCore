import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-2-c',
  lessonId: 'm204-4-2',
  title: 'Simple Interest, Part 3: Months and the Total Amount',
  thumbnailTitle: 'Months and Totals',
  thumbnail: 'm',
  summary: 'Changing months to years (t = months ÷ 12), the total amount A = P + I, a 3,600 dollar loan for 18 months at 7.5% (405 dollars of interest, 4,005 dollars to pay back), savings for 8 months rounded to the cent, and why t is never the number of months.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.2 · Part 3', title: 'Months and the Total Amount', subtitle: 'Time in years, always' }],
      lines: [
        { say: 'Many loans and savings plans last a number of months, not whole years. The formula still works, as long as you change the months to years.', show: 'title' },
        { say: 'In this video, you will use months in the formula, and find the total amount to pay back or to keep.' },
      ],
    },
    {
      chapter: 'Months and the total',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['t = \\text{months} \\div 12', 'A = P + I'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Total amount', md: 'For a loan, $A$ is what you pay back. For savings, it is what you have at the end.' },
      ],
      lines: [
        { say: 'The formula needs time in years. If the time is in months, divide by twelve.', show: 'f.0', focus: 'f.0' },
        { say: 'The total amount, A, is the principal plus the interest.', show: 'f.1', focus: 'f.1' },
        { say: 'For a loan, the total amount is what you pay back. For savings, it is what you have at the end.', show: 'def' },
      ],
    },
    {
      chapter: 'A car loan for 18 months',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Jordan borrows \\$3,600 for $18$ months at $7.5\\%$ per year simple interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['r = 0.075, \\quad t = 18 \\div 12 = 1.5', 'I = 3{,}600 \\times 0.075 \\times 1.5 = 405', 'A = 3{,}600 + 405 = 4{,}005'] },
      ],
      lines: [
        { say: 'Jordan borrows 3,600 dollars for eighteen months, at 7.5 percent per year simple interest. Find the interest, and the total to pay back.', show: 'q' },
        { say: '7.5 percent is 0.075. And eighteen months divided by twelve is 1.5 years.', show: 'm.0', focus: 'm.0' },
        { say: 'I equals 3,600 times 0.075 times 1.5: 405 dollars of interest.', show: 'm.1', focus: 'm.1' },
        { say: 'And the total is 3,600 plus 405: Jordan pays back 4,005 dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'So Jordan pays 405 dollars for the use of the money, on top of the 3,600 dollars borrowed.' },
      ],
    },
    {
      chapter: 'Savings for 8 months',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Lena saves \\$1,850 for $8$ months at $2.5\\%$ per year simple interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['I = 1{,}850 \\times 0.025 \\times \\dfrac{8}{12} \\approx 30.833 \\approx 30.83', 'A = 1{,}850 + 30.83 = 1{,}880.83'] },
      ],
      lines: [
        { say: 'Lena saves 1,850 dollars for eight months, at 2.5 percent per year simple interest. Here, t is eight twelfths of a year.', show: 'q' },
        { say: '1,850 times 0.025 times eight twelfths is about 30.833. Round to the nearest cent: thirty dollars 83.', show: 'm.0', focus: 'm.0' },
        { say: 'So Lena has 1,850 plus 30.83: 1,880 dollars 83 at the end.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to use the months for t. For eighteen months, t is 1.5, not eighteen. Using eighteen makes the interest twelve times too big.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A loan of \\$2,400 is for $9$ months at $6\\%$ per year simple interest. What is the total to pay back?',
          choices: ['\\$2,508', '\\$108', '\\$3,696', '\\$2,544'],
          answer: 0,
          working: '$t = 9 \\div 12 = 0.75$. $I = 2{,}400 \\times 0.06 \\times 0.75 = 108$. $A = 2{,}400 + 108 = 2{,}508$. B is the interest only, C uses $t = 9$, and D uses a whole year.',
        },
      ],
      lines: [
        { say: 'Your turn. A loan of 2,400 dollars is for nine months, at six percent per year simple interest. What is the total to pay back? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine months is 0.75 years. The interest is 2,400 times 0.06 times 0.75: 108 dollars. So the total is 2,508 dollars. B is the interest only, C uses nine for t, and D uses a whole year.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Months to years: t = months ÷ 12.', 'Total amount: A = P + I.', 'Round the interest to the nearest cent.'] }],
      lines: [
        { say: 'Let’s sum up. To change months to years, divide by twelve.', show: 'sum.0' },
        { say: 'The total amount is the principal plus the interest.', show: 'sum.1' },
        { say: 'And round the interest to the nearest cent. In part four, we find the rate or the time. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
