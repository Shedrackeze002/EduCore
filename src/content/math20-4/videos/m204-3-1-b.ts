import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-1-b',
  lessonId: 'm204-3-1',
  title: 'Wages and Overtime, Part 2: Reading a Timecard',
  thumbnailTitle: 'Reading a Timecard',
  thumbnail: 't',
  summary: 'Counting up from the start to the end of a shift across noon, changing minutes to parts of an hour (30 minutes is 0.5 hours), taking away unpaid breaks, and finding the gross pay from a three-day timecard (19 hours at 17.20 dollars is 326.80 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.1 · Part 2', title: 'Reading a Timecard', subtitle: 'From clock times to hours' }],
      lines: [
        { say: 'Many jobs record when you start and finish each shift. To check your pay, you need to turn those clock times into hours.', show: 'title' },
        { say: 'In this video, you will find the hours on a timecard, and the gross pay they earn.' },
      ],
    },
    {
      chapter: 'Minutes as hours',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Timecard', md: 'A **timecard** is a record of the times you start and finish work each day. Meal breaks are often **unpaid**, so take them away.' },
        { kind: 'table', id: 'h', head: ['Minutes', '15 min', '30 min', '45 min'], rows: [['Hours', '$0.25$ h', '$0.5$ h', '$0.75$ h']] },
      ],
      lines: [
        { say: 'A timecard is a record of the times you start and finish work each day. Meal breaks are often unpaid, so you take them away.', show: 'def' },
        { say: 'Wages are paid per hour, so change minutes to part of an hour. Fifteen minutes is a quarter of an hour, 0.25. Thirty minutes is half an hour, 0.5. And 45 minutes is three quarters, 0.75.', show: 'h' },
      ],
    },
    {
      chapter: 'Count up across noon',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{9:00 a.m. to 12:00 noon: } 3 \\text{ h}', '\\text{12:00 noon to 3:00 p.m.: } 3 \\text{ h}', '\\text{3:00 p.m. to 3:30 p.m.: } 30 \\text{ min}', '6 \\text{ h } 30 \\text{ min} = 6.5 \\text{ h}'] }],
      lines: [
        { say: 'How long is a shift from nine a.m. to three thirty p.m.? Count up in easy steps. Nine a.m. to twelve noon is three hours.', show: 'm.0', focus: 'm.0' },
        { say: 'Noon to three p.m. is three hours more.', show: 'm.1', focus: 'm.1' },
        { say: 'And three p.m. to three thirty is thirty minutes more.', show: 'm.2', focus: 'm.2' },
        { say: 'So the shift is six hours thirty minutes, which is 6.5 hours.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Pay from a timecard',
      layout: 'split',
      leftWidth: 680,
      left: [{ kind: 'table', id: 't', head: ['Day', 'Start', 'End', 'Break'], rows: [['Monday', '9:00 a.m.', '3:30 p.m.', 'none'], ['Tuesday', '12:00 p.m.', '8:00 p.m.', '30 min'], ['Thursday', '7:30 a.m.', '12:30 p.m.', 'none']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Mon: } 6.5 \\text{ h}', '\\text{Tue: } 8 - 0.5 = 7.5 \\text{ h}', '\\text{Thu: } 5 \\text{ h}', '6.5 + 7.5 + 5 = 19 \\text{ h}', '19 \\times 17.20 = 326.80'] }],
      lines: [
        { say: 'Jordan earns seventeen dollars twenty per hour at a warehouse. Here is Jordan’s timecard for the week.', show: 't' },
        { say: 'Monday is the shift we just counted: 6.5 hours.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'Tuesday, twelve noon to eight p.m. is eight hours. Take away the thirty-minute break: 7.5 hours.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'Thursday, seven thirty a.m. to twelve thirty p.m. is five hours.', show: 'm.2', focus: ['t.2', 'm.2'] },
        { say: 'The total is 6.5 plus 7.5 plus five: nineteen hours.', show: 'm.3', focus: 'm.3' },
        { say: 'So Jordan’s gross pay is nineteen times 17.20: 326 dollars 80.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: '6 h 30 min is not 6.30 h',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: '6 h 30 min is not 6.30 h', md: 'The digits after the decimal point are **parts of an hour**, not minutes. Half an hour is $0.5$, so 6 h 30 min is $6.5$ h.' }],
      lines: [
        { say: 'A common mistake is to write six hours thirty minutes as 6.30. The digits after the decimal point are parts of an hour, not minutes. Half an hour is 0.5, so six hours thirty minutes is 6.5 hours.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shift runs from 8:00 a.m. to 2:45 p.m., with a 30-minute unpaid break. How many paid hours is that?',
          choices: ['$6.25$ h', '$6.75$ h', '$6.15$ h', '$7.25$ h'],
          answer: 0,
          working: '8:00 a.m. to noon is $4$ h, noon to 2:00 p.m. is $2$ h, then $45$ min: $6.75$ h. Take away the break: $6.75 - 0.5 = 6.25$ h. B forgets the break, and C treats minutes as decimals.',
        },
      ],
      lines: [
        { say: 'Your turn. A shift runs from eight a.m. to two forty-five p.m., with a thirty-minute unpaid break. How many paid hours is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight to noon is four hours, noon to two is two hours, then 45 minutes: 6.75 hours. Take away the half-hour break: 6.25 hours. B forgets the break, and C treats the minutes as decimals.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count up from start to end in easy steps.', 'Change minutes to hours: 30 min = 0.5 h.', 'Take away unpaid breaks, then multiply by the wage.'] }],
      lines: [
        { say: 'Let’s sum up. Count up from the start to the end of each shift in easy steps.', show: 'sum.0' },
        { say: 'Change minutes to part of an hour: thirty minutes is 0.5 hours.', show: 'sum.1' },
        { say: 'And take away unpaid breaks, then multiply the hours by the wage. In part three, we find overtime pay. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
