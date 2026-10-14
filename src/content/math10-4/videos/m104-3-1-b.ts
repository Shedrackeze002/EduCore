import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-3-1-b',
  lessonId: 'm104-3-1',
  title: 'Decimals and Money, Part 2: Multiplying, Dividing and Making Change',
  thumbnailTitle: 'Making Change',
  summary: 'Multiplying a price per litre, sharing a bill equally, rounding money to the nearest cent, finding a total and the change from a $20 bill, counting up, and rounding a cash total to the nearest 5 cents.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 3.1 · Part 2', title: 'Making Change', subtitle: 'Multiplying, dividing and paying' }],
      lines: [
        { say: 'Filling up a truck, splitting a lunch bill, and giving change at the till all use decimals.', show: 'title' },
        { say: 'In this video, you will multiply and divide money, and make change.' },
      ],
    },
    {
      chapter: 'Multiplying and dividing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['42.6 \\times 1.459 = 62.1534 \\;\\to\\; \\$62.15', '58.70 \\div 3 = 19.5666\\ldots \\;\\to\\; \\$19.57'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate to check', md: '$43\\text{ L}$ at about \\$1.50 is about \\$64, close to \\$62.15.' },
      ],
      lines: [
        { say: 'Multiply when you have several of the same amount. Gas costs 1.459 dollars a litre, and Priya pumps 42.6 litres. 42.6 times 1.459 is 62.1534.', show: 'm.0' },
        { say: 'That is not an amount you can pay, so round to two decimal places. The third decimal digit is three, so round down: 62 dollars 15.', focus: 'm.0' },
        { say: 'Check with an estimate: 43 litres at about a dollar fifty is about 64 dollars. That is close, so the answer makes sense.', show: 'tip' },
        { say: 'Divide to share equally. Three co-workers split a lunch bill of 58 dollars 70. That is 19.5666 and so on. The third decimal digit is six, so round up: each pays about 19 dollars 57.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Making change',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Item', 'Price'], rows: [['Breakfast wrap', '\\$5.49'], ['Coffee', '\\$2.15'], ['Muffin', '\\$2.79']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5.49 + 2.15 + 2.79 = 10.43', '20.00 - 10.43 = 9.57', '0.07 + 0.50 + 9.00 = 9.57'] }],
      lines: [
        { say: 'Change is the money you get back when you pay more than the total: the money paid, minus the total. Mei buys a breakfast wrap, a coffee and a muffin.', show: ['t.0', 't.1', 't.2'] },
        { say: 'The total is 10 dollars 43. She pays with a twenty-dollar bill, so her change is twenty minus 10.43: 9 dollars 57.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Cashiers often count up from the total. From 10.43, add seven cents to get 10.50, fifty cents to get eleven dollars, and nine dollars to get twenty. That is 9 dollars 57 again.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Paying with cash',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['Total ends in', 'Cash total ends in'], rows: [['1 or 2', '0 (down)'], ['3 or 4', '5 (up)'], ['6 or 7', '5 (down)'], ['8 or 9', '10 (up)']] }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\$10.43 \\;\\to\\; \\$10.45', '20.00 - 10.45 = 9.55'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding each price', md: 'Add all the prices first. Then round the total.' },
      ],
      lines: [
        { say: 'Canada stopped making pennies, so when you pay with cash, the total is rounded to the nearest five cents. Card payments are not rounded.', show: ['t.0', 't.1', 't.2', 't.3'] },
        { say: 'Mei’s total of 10.43 ends in three, and a three rounds up to five. So she pays 10 dollars 45 in cash, and gets 9 dollars 55 back.', show: ['m.0', 'm.1'], focus: ['t.1', 'm.1'] },
        { say: 'Add all the prices first, then round the total. Do not round each price on its own.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A total is \\$7.38. You pay with a \\$10 bill by card. What is your change?',
          choices: ['\\$2.62', '\\$2.60', '\\$3.62', '\\$2.72'],
          answer: 0,
          working: 'Card payments are not rounded: $10.00 - 7.38 = 2.62$.',
        },
      ],
      lines: [
        { say: 'Your turn. A total is 7 dollars 38, and you pay ten dollars by card. What is your change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Card payments are not rounded, so the change is ten minus 7.38: 2 dollars 62. B rounds the total, which only happens with cash.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply for several of the same amount. Divide to share.', 'Change = money paid − total.', 'A cash total is rounded to the nearest 5 cents.'] }],
      lines: [
        { say: 'Let’s sum up. Multiply for several of the same amount, and divide to share equally. Round money to the nearest cent.', show: 'sum.0' },
        { say: 'Change is the money paid, minus the total.', show: 'sum.1' },
        { say: 'And a cash total is rounded to the nearest five cents. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
