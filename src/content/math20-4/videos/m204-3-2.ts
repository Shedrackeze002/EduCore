import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-2',
  lessonId: 'm204-3-2',
  title: 'Other Ways to Earn, Part 1: Salary',
  thumbnailTitle: 'Salary',
  thumbnail: 'p',
  summary: 'A salary split into equal pays (52, 26, 24 or 12 a year), 39,000 dollars paid every two weeks (1,500 dollars a pay), and why every two weeks (26 pays) is not the same as twice a month (24 pays).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.2 · Part 1', title: 'Salary', subtitle: 'A set amount for the year' }],
      lines: [
        { say: 'Not every job pays by the hour. Some jobs pay a set amount for the year. Others pay you for what you sell or what you make, and some come with tips.', show: 'title' },
        { say: 'In this video, you will find how much each pay is when you earn a salary.' },
      ],
    },
    {
      chapter: 'Salary',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Salary', md: 'A **salary** is a set amount of pay for a whole year. Each pay is the salary divided by the number of pays in a year.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{each pay} = \\text{yearly salary} \\div \\text{pays in a year}'] },
      ],
      lines: [
        { say: 'A salary is a set amount of pay for a whole year. It is the same no matter how many hours you work in a week.', show: 'def' },
        { say: 'The salary is split into equal pays through the year, so each pay is the yearly salary divided by the number of pays in a year.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'How often you are paid',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'table', id: 'p', head: ['How often you are paid', 'Pays in a year'], rows: [['Weekly', '$52$'], ['Every two weeks', '$26$'], ['Twice a month', '$24$'], ['Monthly', '$12$']] }],
      right: [
        { kind: 'text', id: 'q', md: 'Priya earns \\$39,000 a year, paid every two weeks.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['39{,}000 \\div 26 = 1{,}500.00'] },
      ],
      lines: [
        { say: 'How many pays are there in a year? Weekly pay gives 52 pays, one for each week. Every two weeks gives half as many, 26. Twice a month gives 24, and monthly gives twelve.', show: 'p' },
        { say: 'Priya earns a salary of 39,000 dollars a year. She is paid every two weeks. How much is each pay?', show: 'q', focus: 'p.1' },
        { say: 'Every two weeks means 26 pays a year. So each pay is 39,000 divided by 26: 1,500 dollars.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Two weeks or twice a month?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Every two weeks is not twice a month', md: '"Every two weeks" gives $26$ pays. "Twice a month" gives only $24$ pays.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{twice a month: } 42{,}000 \\div 24 = 1{,}750.00', '\\text{every two weeks: } 42{,}000 \\div 26 \\approx 1{,}615.38'] },
      ],
      lines: [
        { say: 'Every two weeks and twice a month sound alike, but they are not. Every two weeks gives 26 pays, while twice a month gives only 24.', show: 'oops' },
        { say: 'A salary of 42,000 dollars paid twice a month is 42,000 divided by 24: 1,750 dollars each pay.', show: 'm.0', focus: 'm.0' },
        { say: 'Paid every two weeks, it is 42,000 divided by 26: about 1,615 dollars 38. The pays are smaller, but there are two extra pays in the year.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Diego earns a salary of \\$45,600 a year, paid monthly. How much is each pay?',
          choices: ['\\$3,800.00', '\\$1,900.00', '\\$1,753.85', '\\$876.92'],
          answer: 0,
          working: 'Monthly means $12$ pays: $45{,}600 \\div 12 = 3{,}800.00$. B divides by $24$, C by $26$, and D by $52$.',
        },
      ],
      lines: [
        { say: 'Your turn. Diego earns a salary of 45,600 dollars a year, paid monthly. How much is each pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Monthly means twelve pays, and 45,600 divided by twelve is 3,800 dollars. B divides by 24, C by 26, and D by 52.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A salary is a set amount for the year.', 'Each pay = yearly salary ÷ number of pays.', 'Weekly 52, every two weeks 26, twice a month 24, monthly 12.'] }],
      lines: [
        { say: 'Let’s sum up. A salary is a set amount of pay for the whole year.', show: 'sum.0' },
        { say: 'Each pay is the yearly salary divided by the number of pays.', show: 'sum.1' },
        { say: 'And the number of pays is 52 for weekly, 26 for every two weeks, 24 for twice a month, and twelve for monthly. In part two, we look at commission. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
