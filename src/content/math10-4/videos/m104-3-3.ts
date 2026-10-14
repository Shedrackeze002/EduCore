import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-3-3',
  lessonId: 'm104-3-3',
  title: 'Percents of Money, Part 1: Percent of an Amount and Tips',
  thumbnailTitle: 'Tips and Percents',
  summary: 'Finding a percent of an amount by changing the percent to a decimal and multiplying, mental shortcuts for 10%, 5%, 20%, 25% and 50%, and working out a 15% tip and the total. Part 2 covers discounts and GST.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 3.3 · Part 1', title: 'Percent of an Amount', subtitle: 'And leaving a tip' }],
      lines: [
        { say: 'Tips at a restaurant, sales at the mall, and the tax on a receipt are all percents. If you can find a percent of an amount, you can check your bill.', show: 'title' },
        { say: 'In this video, you will find a percent of an amount, and work out a tip.' },
      ],
    },
    {
      chapter: 'Percent of an amount',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['20\\% = 0.20', '0.20 \\times 45 = 9 \\text{ students}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by the whole percent number', md: '$20 \\times 45 = 900$ students is more than the whole class. Change $20\\%$ to $0.20$ first.' },
      ],
      lines: [
        { say: 'To find a percent of an amount, change the percent to a decimal, then multiply.' },
        { say: 'There are 45 students in a class, and twenty percent of them take the bus. Twenty percent is 0.20, and 0.20 times 45 is nine. So nine students take the bus.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Twenty times 45 is 900 students: far more than the whole class. Change the percent to a decimal before you multiply.', show: 'oops' },
      ],
    },
    {
      chapter: 'Mental shortcuts',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Percent', 'Shortcut', 'Of \\$80'], rows: [['$10\\%$', 'divide by $10$', '\\$8'], ['$5\\%$', 'half of $10\\%$', '\\$4'], ['$20\\%$', 'double $10\\%$', '\\$16'], ['$25\\%$', 'divide by $4$', '\\$20'], ['$50\\%$', 'divide by $2$', '\\$40']] }],
      lines: [
        { say: 'Some percents are easy in your head. Ten percent: divide by ten. Ten percent of eighty dollars is eight dollars.', show: 't.0', focus: 't.0' },
        { say: 'Five percent is half of ten percent: four dollars. Twenty percent is double ten percent: sixteen dollars.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Twenty-five percent is a quarter, so divide by four: twenty dollars. And fifty percent is half: forty dollars.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
      ],
    },
    {
      chapter: 'Tips',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Tip', md: 'Extra money you give for good service. Many people tip $15\\%$ to $20\\%$ of the bill.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.15 \\times 46.80 = 7.02', '46.80 + 7.02 = 53.82', '10\\% = 4.68, \\quad 5\\% = 2.34, \\quad 4.68 + 2.34 = 7.02'] },
      ],
      lines: [
        { say: 'A tip is extra money you give for good service, at a restaurant or a hair salon. Many people tip fifteen to twenty percent of the bill.', show: 'def' },
        { say: 'Hamid’s dinner bill is 46 dollars 80, and he leaves a fifteen percent tip. Fifteen percent is 0.15, and 0.15 times 46.80 is seven dollars and two cents.', show: 'm.0', focus: 'm.0' },
        { say: 'The total is the bill plus the tip: 53 dollars 82.', show: 'm.1', focus: 'm.1' },
        { say: 'Check in your head: fifteen percent is ten percent plus half of that. Ten percent is 4.68, half of it is 2.34, and together they make 7.02.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A haircut costs \\$32. You leave a $20\\%$ tip. How much is the tip?',
          choices: ['\\$6.40', '\\$3.20', '\\$640', '\\$38.40'],
          answer: 0,
          working: '$10\\%$ of \\$32 is \\$3.20, and $20\\%$ is double that: \\$6.40.',
        },
      ],
      lines: [
        { say: 'Your turn. A haircut costs 32 dollars, and you leave a twenty percent tip. How much is the tip? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ten percent of 32 dollars is 3 dollars 20, and twenty percent is double that: 6 dollars 40. D is the total, not the tip.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent of an amount: change to a decimal, then multiply.', '$10\\%$: divide by $10$. $5\\%$ is half of that.', 'Total = bill + tip.'] }],
      lines: [
        { say: 'Let’s sum up. To find a percent of an amount, change the percent to a decimal, then multiply.', show: 'sum.0' },
        { say: 'Ten percent is the amount divided by ten, and five percent is half of that.', show: 'sum.1' },
        { say: 'And the total is the bill plus the tip. In part two, we work out discounts and GST. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
