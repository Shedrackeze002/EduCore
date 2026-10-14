import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-3-b',
  lessonId: 'm204-4-3',
  title: 'Credit Cards and Loans, Part 2: Yearly Rates and Monthly Interest',
  thumbnailTitle: 'Yearly Rates',
  thumbnail: 'm',
  summary: 'One month of interest from a yearly rate (1,250 dollars at 19.99% per year is about 20.82 dollars), why you divide by 12, and the minimum payment trap (a 37.50 dollar payment lowers the balance by only 17.30 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.3 · Part 2', title: 'Yearly Rates and Monthly Interest', subtitle: 'Divide by 12' }],
      lines: [
        { say: 'Most credit cards show their rate per year, but the bill comes every month. So you need a way to turn a yearly rate into one month of interest.', show: 'title' },
        { say: 'In this video, you will find one month of interest from a yearly rate, and see why the minimum payment is a trap.' },
      ],
    },
    {
      chapter: 'One month from a yearly rate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{interest for one month} = \\text{unpaid balance} \\times \\text{yearly rate} \\div 12'] },
        { kind: 'text', id: 'q', md: 'Nadia has an unpaid balance of \\$1,250. Her card charges $19.99\\%$ per year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['19.99\\% = 0.1999', '1{,}250 \\times 0.1999 \\div 12 \\approx 20.823 \\approx 20.82'] },
      ],
      lines: [
        { say: 'For one month of simple interest, multiply the unpaid balance by the yearly rate, then divide by twelve, since a year has twelve months.', show: 'f', focus: 'f' },
        { say: 'In this example, Nadia has an unpaid balance of 1,250 dollars. Her card charges 19.99 percent per year. Find the interest for one month, to the nearest cent.', show: 'q' },
        { say: '19.99 percent as a decimal is 0.1999. Move the decimal point two places to the left.', show: 'm.0', focus: 'm.0' },
        { say: '1,250 times 0.1999, divided by twelve, is about 20.823. So Nadia is charged about twenty dollars 82 for one month.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Divide by 12',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to divide by 12', md: '$1{,}250 \\times 0.1999 \\approx 249.88$ is the interest for a whole **year**. For one month, divide by $12$.' }],
      lines: [
        { say: 'A common mistake is to forget to divide by twelve. 1,250 times 0.1999 is about 249 dollars 88. That is the interest for a whole year. For one month, divide by twelve.', show: 'oops' },
      ],
    },
    {
      chapter: 'The minimum payment trap',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Nadia pays only the $3\\%$ minimum on \\$1,250.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.03 \\times 1{,}250 = 37.50', '1{,}212.50 \\times 0.1999 \\div 12 \\approx 20.20', '37.50 - 20.20 = 17.30'] },
      ],
      lines: [
        { say: 'Suppose Nadia pays only the three percent minimum. Three percent of 1,250 is 37 dollars fifty.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'That leaves 1,212 dollars fifty unpaid, and next month the card adds about twenty dollars twenty in interest.', show: 'm.1', focus: 'm.1' },
        { say: 'So her 37.50 payment lowers what she owes by only seventeen dollars thirty. More than half of the payment just covers the interest.', show: 'm.2', focus: 'm.2' },
        { say: 'Paying only the minimum can take years, and cost hundreds of dollars in interest.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An unpaid balance is \\$2,400. The card charges $18\\%$ per year. What is the interest for one month?',
          choices: ['\\$36.00', '\\$432.00', '\\$133.33', '\\$2,436.00'],
          answer: 0,
          working: '$2{,}400 \\times 0.18 \\div 12 = 36.00$. B is the interest for a whole year, and D is the new balance.',
        },
      ],
      lines: [
        { say: 'Your turn. An unpaid balance is 2,400 dollars. The card charges eighteen percent per year. What is the interest for one month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 2,400 times 0.18 is 432, and divided by twelve, that is 36 dollars. B is the interest for a whole year, and D is the new balance.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One month = unpaid balance × yearly rate ÷ 12.', 'Without ÷ 12, you get a whole year of interest.', 'Paying only the minimum keeps you in debt longer.'] }],
      lines: [
        { say: 'Let’s sum up. One month of interest is the unpaid balance times the yearly rate, divided by twelve.', show: 'sum.0' },
        { say: 'Without dividing by twelve, you get a whole year of interest.', show: 'sum.1' },
        { say: 'And paying only the minimum keeps you in debt longer. In part three, we find the cost of a loan. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
