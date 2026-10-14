import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-2-b',
  lessonId: 'm103-2-2',
  title: 'Salary, Commission and Piecework, Part 2: Graduated Commission and Piecework',
  thumbnailTitle: 'Commission and Piecework',
  summary: 'Graduated commission, where each rate applies only to its own part of the sales, and piecework pay for each item finished, with a bonus over a quota.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.2 · Part 2', title: 'Graduated Commission and Piecework', subtitle: 'Paid for what you sell or make' }],
      lines: [
        { say: 'Some salespeople earn a higher rate on higher sales. And a tree planter is paid for every seedling in the ground.', show: 'title' },
        { say: 'In this video, you will calculate graduated commission, and piecework pay.' },
      ],
    },
    {
      chapter: 'Graduated commission',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '3% on the first \\$10,000 of sales, and 5% on all sales above \\$10,000. Sales were \\$26,400.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.03 \\times \\$10{,}000 = \\$300.00', '\\$26{,}400 - \\$10{,}000 = \\$16{,}400', '0.05 \\times \\$16{,}400 = \\$820.00', '\\$300.00 + \\$820.00 = \\$1{,}120.00'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not the higher rate on everything', md: '5% of all \\$26,400 is \\$1,320, which is too much. The 5% applies only to the sales **above** \\$10,000.' },
      ],
      lines: [
        { say: 'With graduated commission, each rate applies only to its own part of the sales, like steps on a staircase. A furniture salesperson earns three percent on the first 10,000 dollars of sales, and five percent on all sales above 10,000. This month, the sales were 26,400 dollars.', show: 'q' },
        { say: 'The first 10,000 dollars earns three percent: 300 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The sales above 10,000 are 26,400 minus 10,000: 16,400 dollars. They earn five percent: 820 dollars.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So the commission is 300 plus 820: 1,120 dollars.', show: 'm.3', focus: 'm.3' },
        { say: 'Five percent of all 26,400 would be 1,320 dollars, which is too much. The higher rate applies only to the sales above 10,000.', show: 'oops' },
      ],
    },
    {
      chapter: 'Piecework',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Piecework', md: 'Pay based on the number of items completed: earnings $=$ number of pieces $\\times$ pay per piece.' },
        { kind: 'math', id: 'm', lines: ['1850 \\times \\$0.17 = \\$314.50'] },
      ],
      lines: [
        { say: 'In some jobs, you are paid for each item you finish, not for your time. Tree planting, sewing, roofing and flyer delivery often pay this way. Earnings are the number of pieces times the pay per piece.', show: 'def' },
        { say: 'A tree planter is paid seventeen cents per tree, and on a good day plants 1,850 trees. 1,850 times seventeen cents is 314 dollars fifty.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A bonus after a quota',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Simran sews jerseys for \\$3.20 each, plus \\$0.80 for each jersey over 40 in a day. Simran sews 52 jerseys.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['52 \\times \\$3.20 = \\$166.40', '(52 - 40) \\times \\$0.80 = 12 \\times \\$0.80 = \\$9.60', '\\$166.40 + \\$9.60 = \\$176.00'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Piecework rewards speed', md: 'A fast, careful worker can earn more than with an hourly wage. A beginner may earn less.' },
      ],
      lines: [
        { say: 'Simran sews hockey jerseys for three dollars twenty each, plus a bonus of eighty cents for each jersey over forty in a day. Simran sews 52 jerseys.', show: 'q' },
        { say: 'The base pay is 52 times three twenty: 166 dollars forty.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve jerseys are over the quota, so the bonus is twelve times eighty cents: nine dollars sixty. The total is 176 dollars.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Piecework rewards speed. A fast, careful worker can earn more than with an hourly wage, but a beginner may earn less. Compare both before you choose.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A salesperson earns 2% on the first \\$20,000 of sales and 6% on sales above \\$20,000. Sales were \\$35,000. What is the commission?',
          choices: ['\\$1,300', '\\$2,100', '\\$700', '\\$1,500'],
          answer: 0,
          working: '$0.02 \\times 20{,}000 = 400$, and $0.06 \\times 15{,}000 = 900$, so the commission is $1300$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A salesperson earns two percent on the first 20,000 dollars of sales, and six percent above 20,000. Sales were 35,000 dollars. What is the commission? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two percent of 20,000 is 400. The other 15,000 dollars earns six percent: 900. So the commission is 1,300 dollars. B uses six percent on everything.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Graduated commission: each rate applies only to its own part of the sales.', 'Piecework = number of pieces × pay per piece.', 'Add any bonus for pieces over a quota.'] }],
      lines: [
        { say: 'Let’s sum up. With graduated commission, each rate applies only to its own part of the sales.', show: 'sum.0' },
        { say: 'Piecework pay is the number of pieces times the pay per piece.', show: 'sum.1' },
        { say: 'And add any bonus for pieces over a quota. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
