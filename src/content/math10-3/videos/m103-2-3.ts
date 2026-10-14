import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-3',
  lessonId: 'm103-2-3',
  title: 'Comparing Pay and Contracts, Part 1: Job Offers and Break-Even',
  thumbnailTitle: 'Comparing Job Offers',
  summary: 'Comparing two job offers for the same week, hours and sales, changing pay to the same time period, and finding the break-even sales where two offers pay the same. Part 2 covers contracts and bids.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.3 · Part 1', title: 'Comparing Job Offers', subtitle: 'Which pays more?' }],
      lines: [
        { say: 'Two job offers can look very different. One pays eighteen fifty an hour. The other pays a weekly base, plus commission. Which is better?', show: 'title' },
        { say: 'In this video, you will compare offers fairly, and find the break-even point. In part two, you will work on contract.' },
      ],
    },
    {
      chapter: 'The same situation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{Job A: } \\$18.50 \\times 40 = \\$740.00', '\\text{Job B: } \\$450 + 0.05 \\times \\$6{,}200 = \\$760.00', '\\$760.00 - \\$740.00 = \\$20.00'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Money is not the only thing', md: 'Commission can drop in a slow month, while hourly pay is steady. Think about benefits, travel, safety and hours too.' },
      ],
      lines: [
        { say: 'To compare two ways of being paid, work out what each pays for the same situation. Job A pays eighteen fifty an hour, for forty hours a week: 740 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Job B pays 450 dollars a week, plus five percent commission. Ahmed expects to sell about 6,200 dollars a week, so Job B pays 450 plus 310: 760 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So Job B pays twenty dollars more a week, if the sales estimate is right.', show: 'm.2', focus: 'm.2' },
        { say: 'But money is not the only thing. Commission can drop in a slow month, while hourly pay is steady. Think about benefits, travel time, safety, and how many hours you want to work.', show: 'tip' },
      ],
    },
    {
      chapter: 'The same time period',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\$1{,}950 \\text{ biweekly: } 1950 \\times 26 = \\$50{,}700 \\text{ a year}', '\\$4{,}100 \\text{ monthly: } 4100 \\times 12 = \\$49{,}200 \\text{ a year}'] },
      ],
      lines: [
        { say: 'You also need the same time period. You cannot compare 1,950 dollars every two weeks with 4,100 dollars a month directly.', show: 'm.0' },
        { say: 'Change both to a year. 1,950 times 26 is 50,700 dollars, and 4,100 times twelve is 49,200 dollars. So the biweekly pay is higher.', show: 'm.1', focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'The break-even point',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Break-even point', md: 'The sales, hours or pieces where two ways of being paid give the same amount.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1200 + 0.06S = 3000', '0.06S = 1800', 'S = 1800 \\div 0.06 = 30{,}000'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtract the base first', md: '$3000 \\div 0.06 = 50{,}000$ ignores the \\$1,200 base. Undo the addition before the multiplication.' },
      ],
      lines: [
        { say: 'With commission, what you earn depends on your sales. The break-even point is where two offers pay exactly the same.', show: 'def' },
        { say: 'Job A pays 3,000 dollars a month. Job B pays 1,200 dollars a month, plus six percent of sales. Let S be the monthly sales, and set the pays equal: 1,200 plus 0.06 S equals 3,000.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract 1,200 from both sides: 0.06 S equals 1,800. Then divide by 0.06: S is 30,000 dollars.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'At 30,000 dollars in sales, both jobs pay 3,000. With higher sales, Job B pays more. Subtract the base pay first: dividing 3,000 by 0.06 would ignore it.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Job A pays \\$900 a week. Job B pays \\$300 a week plus 8% of sales. What weekly sales make them pay the same?',
          choices: ['\\$7,500', '\\$11,250', '\\$4,800', '\\$600'],
          answer: 0,
          working: '$300 + 0.08S = 900$, so $0.08S = 600$ and $S = 600 \\div 0.08 = 7500$.',
        },
      ],
      lines: [
        { say: 'Your turn. Job A pays 900 dollars a week. Job B pays 300 dollars a week, plus eight percent of sales. What weekly sales make them pay the same? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 300 plus 0.08 S equals 900, so 0.08 S equals 600, and S is 7,500 dollars. B divides 900 by 0.08, and forgets the base.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare offers for the same situation and the same time period.', 'Break-even: set the pays equal and solve.', 'Think about more than the money.'] }],
      lines: [
        { say: 'Let’s sum up. Compare offers for the same situation, and the same time period.', show: 'sum.0' },
        { say: 'To find the break-even point, set the pays equal and solve.', show: 'sum.1' },
        { say: 'And think about more than the money. In part two, we work on contract, and bid on a job. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
