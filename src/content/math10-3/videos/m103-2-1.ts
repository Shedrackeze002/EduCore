import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-1',
  lessonId: 'm103-2-1',
  title: 'Hourly Wages and Overtime, Part 1: Gross Pay and Timecards',
  thumbnailTitle: 'Hourly Wages',
  summary: 'Gross pay as hourly wage times hours worked, changing hours and minutes to decimal hours, and reading a timecard with unpaid breaks. Part 2 covers overtime.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.1 · Part 1', title: 'Gross Pay and Timecards', subtitle: 'Checking your pay' }],
      lines: [
        { say: 'Most first jobs pay by the hour. Whether you cook on the line or haul lumber on a job site, you should be able to check that your pay is right.', show: 'title' },
        { say: 'In this video, you will find gross pay, and read a timecard. In part two, you will add overtime.' },
      ],
    },
    {
      chapter: 'Gross pay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hourly wage and gross pay', md: 'An **hourly wage** is what you earn for each hour. **Gross pay** is your total pay before anything is taken off.' },
        { kind: 'math', id: 'm', lines: ['\\text{gross pay} = \\text{hourly wage} \\times \\text{hours worked}', '\\$17.50 \\times 32 = \\$560.00'] },
      ],
      lines: [
        { say: 'An hourly wage is the amount you earn for each hour of work. Gross pay is the total you earn, before anything is taken off.', show: 'def' },
        { say: 'Every hour earns the same amount, so gross pay is the hourly wage times the hours worked.', show: 'm.0', focus: 'm.0' },
        { say: 'Amara works as a line cook for seventeen dollars fifty an hour, and worked 32 hours last week. Seventeen fifty times 32 is 560 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Hours and minutes',
      layout: 'center',
      main: [
        { kind: 'math', id: 't', lines: ['\\begin{array}{c|ccc} \\text{minutes} & 15 & 30 & 45 \\\\ \\hline \\text{hours} & 0.25 & 0.5 & 0.75 \\end{array}'] },
        { kind: 'math', id: 'm', lines: ['6\\text{ h } 45\\text{ min} + 5\\text{ h } 30\\text{ min} = 6.75 + 5.5 = 12.25\\text{ h}', '12.25 \\times \\$16.40 = \\$200.90'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '7 h 30 min is not 7.30 h', md: 'It is half an hour past 7: $7.5\\text{ h}$. Writing $7.30$ would cheat you out of pay.' },
      ],
      lines: [
        { say: 'Hours are often not whole numbers. Before you multiply, change the minutes to a decimal part of an hour by dividing by sixty. Fifteen minutes is 0.25 hours, thirty is 0.5, and forty-five is 0.75.', show: 't' },
        { say: 'Tariq earns sixteen forty an hour, and worked six hours forty-five minutes on Saturday, and five hours thirty minutes on Sunday. That is 6.75 plus 5.5: 12.25 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'So the gross pay is 12.25 times sixteen forty: 200 dollars ninety.', show: 'm.1', focus: 'm.1' },
        { say: 'Seven hours thirty minutes is not 7.30 hours. It is half an hour past seven: 7.5 hours. Writing 7.30 would cheat you out of pay.', show: 'oops' },
      ],
    },
    {
      chapter: 'Reading a timecard',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Day', 'Start', 'End', 'Unpaid break', 'Paid'],
          rows: [
            ['Monday', '8:00 a.m.', '4:30 p.m.', '30 min', '8 h'],
            ['Tuesday', '7:45 a.m.', '3:15 p.m.', '30 min', '7 h'],
            ['Wednesday', '12:15 p.m.', '6:00 p.m.', '15 min', '5.5 h'],
          ],
        },
        { kind: 'math', id: 'm', lines: ['8 + 7 + 5.5 = 20.5\\text{ h}, \\qquad 20.5 \\times \\$18.20 = \\$373.10'] },
      ],
      lines: [
        { say: 'A timecard records when each shift starts and ends. Most meal breaks are unpaid, so subtract them. Jordan earns eighteen twenty an hour at a warehouse.', show: 't' },
        { say: 'On Monday, eight a.m. to four thirty p.m. is eight hours thirty minutes. Take off the thirty-minute break: eight hours.', focus: 't.0' },
        { say: 'On Tuesday, count up in easy steps. Seven forty-five to eight is fifteen minutes, eight to three is seven hours, and three to three fifteen is fifteen minutes: seven hours thirty. Take off the break: seven hours.', focus: 't.1' },
        { say: 'On Wednesday, twelve fifteen to six is five hours forty-five minutes. Take off fifteen minutes: five and a half hours.', focus: 't.2' },
        { say: 'The total is 20.5 hours, and 20.5 times eighteen twenty is 373 dollars ten.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shift runs from 9:30 a.m. to 5:00 p.m. with a 30-minute unpaid break, at \\$16.80 per hour. What is the gross pay?',
          choices: ['\\$117.60', '\\$126.00', '\\$114.24', '\\$134.40'],
          answer: 0,
          working: '9:30 a.m. to 5:00 p.m. is 7 h 30 min. Minus 30 min: 7 h. Then $7 \\times 16.80 = 117.60$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A shift runs from nine thirty a.m. to five p.m., with a thirty-minute unpaid break, at sixteen eighty an hour. What is the gross pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine thirty to five is seven hours thirty minutes. Take off the break: seven hours. Seven times sixteen eighty is 117 dollars sixty. B forgets to take off the break.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Gross pay = hourly wage × hours worked.', 'Divide minutes by 60: 15 min = 0.25 h, 30 min = 0.5 h, 45 min = 0.75 h.', 'On a timecard, count up from start to end, then subtract unpaid breaks.'] }],
      lines: [
        { say: 'Let’s sum up. Gross pay is the hourly wage times the hours worked.', show: 'sum.0' },
        { say: 'Change minutes to hours by dividing by sixty.', show: 'sum.1' },
        { say: 'And on a timecard, count up from the start to the end, then subtract unpaid breaks. In part two, we add overtime. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
