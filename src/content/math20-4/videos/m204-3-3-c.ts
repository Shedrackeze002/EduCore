import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-3-c',
  lessonId: 'm204-3-3',
  title: 'Deductions and Net Pay, Part 3: From Hours to Net Pay',
  thumbnailTitle: 'From Hours to Net Pay',
  thumbnail: 't',
  summary: 'A whole pay stub, step by step: gross pay from hours (36 hours at 17.50 dollars is 630 dollars), percent deductions at rates given in the question, union dues, net pay of 507.90 dollars, and why deductions come off the gross pay, not the hourly wage.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.3 · Part 3', title: 'From Hours to Net Pay', subtitle: 'The whole pay stub' }],
      lines: [
        { say: 'Now let’s put it all together: from the hours on a timecard, all the way to the money you take home.', show: 'title' },
        { say: 'In this video, you will find the gross pay, the deductions and the net pay on a whole pay stub.' },
      ],
    },
    {
      chapter: 'Gross pay and deductions',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Pay stub', 'Amount'], rows: [['Hours worked', '$36$'], ['Hourly wage', '\\$17.50'], ['Gross pay', '?'], ['CPP ($5\\%$)', '?'], ['EI ($2\\%$)', '?'], ['Income tax ($10\\%$)', '?'], ['Union dues', '\\$15.00'], ['Net pay', '?']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['36 \\times 17.50 = 630.00', '\\text{CPP: } 0.05 \\times 630.00 = 31.50', '\\text{EI: } 0.02 \\times 630.00 = 12.60', '\\text{tax: } 0.1 \\times 630.00 = 63.00'] }],
      lines: [
        { say: 'Here is a pay stub. In this example, CPP is five percent of the gross pay, EI is two percent, and income tax is ten percent. Union dues are a set fifteen dollars.', show: 't' },
        { say: 'Find the gross pay first: 36 hours times 17.50 is 630 dollars.', show: 'm.0', focus: ['t.2', 'm.0'] },
        { say: 'Now each percent deduction comes from the gross pay. CPP is 0.05 times 630: 31 dollars fifty.', show: 'm.1', focus: ['t.3', 'm.1'] },
        { say: 'EI is 0.02 times 630: twelve dollars sixty.', show: 'm.2', focus: ['t.4', 'm.2'] },
        { say: 'And income tax is 0.1 times 630: 63 dollars.', show: 'm.3', focus: ['t.5', 'm.3'] },
      ],
    },
    {
      chapter: 'Net pay',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['31.50 + 12.60 + 63.00 + 15.00 = 122.10', '630.00 - 122.10 = 507.90'] },
      ],
      lines: [
        { say: 'Add all four deductions, and don’t forget the union dues: 31.50 plus 12.60 plus 63 plus fifteen is 122 dollars ten.', show: 'm.0', focus: 'm.0' },
        { say: 'The net pay is 630 minus 122.10: 507 dollars 90.', show: 'm.1', focus: 'm.1' },
        { say: 'So of the 630 dollars earned, 507 dollars 90 is take-home pay. That is a little over eighty percent of the gross pay.' },
      ],
    },
    {
      chapter: 'Gross pay first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking deductions off the hourly wage', md: 'Deductions are a percent of your **gross pay** for the whole pay period, not of your hourly wage. Find the gross pay first.' }],
      lines: [
        { say: 'A common mistake is to take the deductions off the hourly wage. Deductions are a percent of your gross pay for the whole pay period, not of your hourly wage. So always find the gross pay first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Sam works $30$ hours at \\$18.00 per hour. Suppose $5\\%$ is taken for CPP, $2\\%$ for EI and $10\\%$ for income tax, and union dues are \\$10.00. What is the net pay?',
          choices: ['\\$438.20', '\\$448.20', '\\$101.80', '\\$14.94'],
          answer: 0,
          working: 'Gross pay: $30 \\times 18.00 = 540.00$. Deductions: $27.00 + 10.80 + 54.00 + 10.00 = 101.80$. Net pay: $540.00 - 101.80 = 438.20$. B forgets the union dues, C is the total deductions, and D takes the percents off the hourly wage.',
        },
      ],
      lines: [
        { say: 'Your turn. Sam works thirty hours at eighteen dollars per hour. Suppose five percent is taken for CPP, two percent for EI, and ten percent for income tax, and union dues are ten dollars. What is the net pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The gross pay is 540 dollars. The deductions are 27, 10.80, 54 and ten: 101 dollars 80. 540 minus 101.80 is 438 dollars twenty. B forgets the union dues, C is the total deductions, and D takes the percents off the hourly wage.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the gross pay first.', 'Percent deductions come from the gross pay.', 'Add every deduction, then subtract from the gross pay.'] }],
      lines: [
        { say: 'Let’s sum up. Find the gross pay first.', show: 'sum.0' },
        { say: 'Percent deductions come from the gross pay, not the hourly wage.', show: 'sum.1' },
        { say: 'And add every deduction, including set amounts like union dues, then subtract the total from the gross pay. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
