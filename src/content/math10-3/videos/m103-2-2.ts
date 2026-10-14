import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-2',
  lessonId: 'm103-2-2',
  title: 'Salary, Commission and Piecework, Part 1: Salary and Commission',
  thumbnailTitle: 'Salary and Commission',
  summary: 'Splitting a yearly salary into weekly, biweekly, semi-monthly or monthly pay cheques, and commission as a percent of sales, alone or on top of a base salary. Part 2 covers graduated commission and piecework.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.2 · Part 1', title: 'Salary and Commission', subtitle: 'Other ways to be paid' }],
      lines: [
        { say: 'Not every job pays by the hour. A store manager earns a salary, and a truck salesperson earns commission.', show: 'title' },
        { say: 'In this video, you will split a salary into pay cheques, and calculate commission. In part two, you will meet graduated commission and piecework.' },
      ],
    },
    {
      chapter: 'Pay periods',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Salary and pay period', md: 'A **salary** is a fixed amount of pay for a year. A **pay period** is the time each pay cheque covers.' },
        {
          kind: 'table',
          id: 't',
          head: ['Pay period', 'How often', 'Pays per year'],
          rows: [
            ['weekly', 'every week', '52'],
            ['biweekly', 'every two weeks', '26'],
            ['semi-monthly', 'twice a month', '24'],
            ['monthly', 'once a month', '12'],
          ],
        },
      ],
      lines: [
        { say: 'A salaried worker is paid a set amount for the year, no matter how many hours a particular week takes. The yearly amount is split into equal pay cheques.', show: 'def' },
        { say: 'Weekly pay comes 52 times a year, and biweekly pay, every two weeks, 26 times.', show: ['t.0', 't.1'] },
        { say: 'Semi-monthly pay comes twice a month, 24 times a year, and monthly pay twelve times.', show: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Salary to pay cheque',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{biweekly: } \\$58{,}500 \\div 26 = \\$2{,}250.00', '\\text{semi-monthly: } \\$58{,}500 \\div 24 = \\$2{,}437.50'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Biweekly is not semi-monthly', md: 'Biweekly is every two weeks (26 pays). Semi-monthly is twice a month (24 pays), so each semi-monthly cheque is bigger.' },
      ],
      lines: [
        { say: 'Mei is a safety coordinator with a salary of 58,500 dollars a year. Paid biweekly, Mei gets 26 cheques: 58,500 divided by 26 is 2,250 dollars each.', show: 'm.0', focus: 'm.0' },
        { say: 'Paid semi-monthly, Mei gets 24 cheques: 2,437 dollars fifty each.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not mix these up. Biweekly means every two weeks, 26 pays. Semi-monthly means twice a month, 24 pays. The yearly total is the same, but each semi-monthly cheque is bigger, because there are fewer of them.', show: 'oops' },
      ],
    },
    {
      chapter: 'Commission',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Commission', md: 'Pay calculated as a percent of sales. **Straight commission** is all commission. **Salary plus commission** adds a base salary.' },
        { kind: 'math', id: 'm', lines: ['0.04 \\times \\$42{,}650 = \\$1{,}706.00', '\\$1{,}800 + \\$1{,}706.00 = \\$3{,}506.00'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Change the percent first', md: '$4\\% = 0.04$. Multiplying the sales by $4$ gives an answer $100$ times too big.' },
      ],
      lines: [
        { say: 'Salespeople are often paid a percent of what they sell, which rewards them for selling more. That is commission. With straight commission, all of your pay is commission. With salary plus commission, you get a base salary, and commission on top.', show: 'def' },
        { say: 'Jaxon sells hot tubs for 1,800 dollars a month, plus four percent commission. Last month, Jaxon sold 42,650 dollars worth. Four percent is 0.04, and 0.04 times 42,650 is 1,706 dollars of commission.', show: 'm.0', focus: 'm.0' },
        { say: 'Add the base: 1,800 plus 1,706 is 3,506 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Change the percent to a decimal first. Multiplying by four instead of 0.04 gives an answer a hundred times too big.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A salary of \\$46,800 a year is paid weekly. How much is each pay cheque?',
          choices: ['\\$900.00', '\\$1,800.00', '\\$1,950.00', '\\$3,900.00'],
          answer: 0,
          working: 'Weekly means 52 pays: $46{,}800 \\div 52 = 900$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A salary of 46,800 dollars a year is paid weekly. How much is each pay cheque? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Weekly means 52 pays, and 46,800 divided by 52 is 900 dollars. B is biweekly, C is semi-monthly, and D is monthly.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pay per cheque = salary ÷ pays per year (52, 26, 24 or 12).', 'Commission = rate as a decimal × sales.', 'Salary plus commission adds a base amount.'] }],
      lines: [
        { say: 'Let’s sum up. Each pay cheque is the salary divided by the number of pays per year: 52, 26, 24, or twelve.', show: 'sum.0' },
        { say: 'Commission is the rate, as a decimal, times the sales.', show: 'sum.1' },
        { say: 'And salary plus commission adds a base amount. In part two, we look at graduated commission and piecework. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
