import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-4-2',
  lessonId: 'm204-4-2',
  title: 'Simple Interest, Part 1: What Is Interest?',
  thumbnailTitle: 'What Is Interest?',
  thumbnail: 'bg',
  summary: 'Principal, interest and the interest rate per year, one year of interest on 1,000 dollars at 3% (30 dollars), and simple interest growing by the same amount each year (120 dollars after 4 years, for 1,120 dollars in the account).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.2 · Part 1', title: 'What Is Interest?', subtitle: 'Paying for the use of money' }],
      lines: [
        { say: 'When you save money in a bank, the bank pays you for using it. When you borrow money, you pay the lender. That payment is called interest.', show: 'title' },
        { say: 'In this video, you will learn the words for interest, and find the interest for one year and for several years.' },
      ],
    },
    {
      chapter: 'Principal, interest and rate',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'p', tone: 'definition', title: 'Principal', md: 'The **principal** is the amount of money you save or borrow at the start.' },
        { kind: 'callout', id: 'i', tone: 'definition', title: 'Interest', md: '**Interest** is the extra money paid for using money. A bank pays you interest on savings. You pay interest on a loan.' },
        { kind: 'callout', id: 'r', tone: 'definition', title: 'Interest rate', md: 'The **interest rate** is the percent of the principal paid as interest. In this lesson, every rate is a percent **per year**.' },
      ],
      lines: [
        { say: 'The principal is the amount of money you save or borrow at the start.', show: 'p' },
        { say: 'Interest is the extra money paid for using money. A bank pays you interest on your savings, and you pay interest on a loan.', show: 'i' },
        { say: 'The interest rate is the percent of the principal paid as interest. In this lesson, every rate is a percent per year.', show: 'r' },
      ],
    },
    {
      chapter: 'One year of interest',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Ama puts \\$1,000 in a savings account that pays $3\\%$ per year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\% = 0.03', '1{,}000 \\times 0.03 = 30'] },
      ],
      lines: [
        { say: 'Ama puts 1,000 dollars in a savings account that pays three percent per year. How much interest does she earn in one year?', show: 'q' },
        { say: 'Write the rate as a decimal: three percent is 0.03.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by the principal: 1,000 times 0.03 is thirty dollars of interest in one year.', show: 'm.1', focus: 'm.1' },
        { say: 'So every year, Ama’s 1,000 dollars earns thirty dollars, just for sitting in the account.' },
      ],
    },
    {
      chapter: 'Year after year',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bg', [barGraph({ categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], values: [30, 60, 90, 120], max: 150, step: 30, height: 4, titles: { y: 'Total interest (\\$)' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['30 \\times 4 = 120', '1{,}000 + 120 = 1{,}120'] }],
      lines: [
        { say: 'With simple interest, the interest is the same every year. Ama earns thirty dollars in the first year.', show: ['bg.scale', 'bg.b0'], focus: 'bg.b0' },
        { say: 'Thirty more in the second year, for sixty in all, then ninety after three years.', show: ['bg.b1', 'bg.b2'], focus: ['bg.b1', 'bg.b2'] },
        { say: 'And 120 dollars after four years. Each bar is thirty dollars taller than the one before.', show: 'bg.b3', focus: 'bg.b3' },
        { say: 'So after four years, the interest is thirty times four: 120 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'And Ama has 1,000 plus 120: 1,120 dollars in the account.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Felix puts \\$1,500 in a savings account that pays $4\\%$ per year simple interest. How much interest does it earn in $2$ years?',
          choices: ['\\$120', '\\$60', '\\$1,620', '\\$12,000'],
          answer: 0,
          working: 'One year: $1{,}500 \\times 0.04 = 60$. Two years: $60 \\times 2 = 120$. B is one year only, C is the total in the account, and D uses $4$ instead of $0.04$.',
        },
      ],
      lines: [
        { say: 'Your turn. Felix puts 1,500 dollars in a savings account that pays four percent per year simple interest. How much interest does it earn in two years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One year of interest is 1,500 times 0.04: sixty dollars. Two years is twice that: 120 dollars. B is one year only, C is the total in the account, and D uses four instead of 0.04.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Principal: the money saved or borrowed at the start.', 'Interest for one year = principal × rate as a decimal.', 'Simple interest is the same every year.'] }],
      lines: [
        { say: 'Let’s sum up. The principal is the money saved or borrowed at the start.', show: 'sum.0' },
        { say: 'One year of interest is the principal times the rate as a decimal.', show: 'sum.1' },
        { say: 'And simple interest is the same every year. In part two, we use the simple interest formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
