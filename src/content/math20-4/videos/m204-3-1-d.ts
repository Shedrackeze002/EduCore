import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-1-d',
  lessonId: 'm204-3-1',
  title: 'Wages and Overtime, Part 4: Overtime Day by Day',
  thumbnailTitle: 'Overtime Day by Day',
  thumbnail: 't',
  summary: 'Overtime counted by the day on a weekly timecard (hours over 8 each day at time-and-a-half: 39 regular hours and 3.5 overtime hours at 20 dollars an hour is 885 dollars), checking the hours, and why a daily rule can give overtime even when the weekly total is short.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.1 · Part 4', title: 'Overtime Day by Day', subtitle: 'Check each day on its own' }],
      lines: [
        { say: 'Some weeks have a few long days and a few short ones. When overtime is counted by the day, every long day counts.', show: 'title' },
        { say: 'In this video, you will find the overtime on a weekly timecard, and the gross pay for the week.' },
      ],
    },
    {
      chapter: 'A weekly timecard',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Day', 'Hours worked'], rows: [['Monday', '$9$'], ['Tuesday', '$8$'], ['Wednesday', '$10.5$'], ['Thursday', '$7$'], ['Friday', '$8$']] }],
      right: [
        { kind: 'text', id: 'q', md: 'Liam earns \\$20.00 per hour. Hours over $8$ in a day are paid at time-and-a-half.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Mon: } 9 - 8 = 1', '\\text{Wed: } 10.5 - 8 = 2.5', '\\text{overtime: } 1 + 2.5 = 3.5 \\text{ h}'] },
      ],
      lines: [
        { say: 'Here is Liam’s timecard for a week. Liam earns twenty dollars per hour. In this example, hours over eight in a day are paid at time-and-a-half.', show: ['t', 'q'] },
        { say: 'Check each day on its own. Monday is nine hours, one more than eight, so one overtime hour.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'Tuesday and Friday are exactly eight hours, and Thursday is seven, so no overtime on those days. Wednesday is 10.5 hours: 2.5 overtime hours.', show: 'm.1', focus: ['t.2', 'm.1'] },
        { say: 'So Liam worked one plus 2.5: 3.5 overtime hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Pay for the week',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{regular hours: } 8 + 8 + 8 + 7 + 8 = 39', '\\text{regular pay: } 39 \\times 20.00 = 780.00', '\\text{overtime pay: } 3.5 \\times 30.00 = 105.00', '\\text{gross pay: } 780.00 + 105.00 = 885.00'] }],
      lines: [
        { say: 'Now the regular hours. Each day counts at most eight regular hours: eight, eight, eight, seven and eight make 39 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'Regular pay is 39 times twenty: 780 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The time-and-a-half rate is 1.5 times twenty, thirty dollars. So overtime pay is 3.5 times thirty: 105 dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'Liam’s gross pay for the week is 780 plus 105: 885 dollars.', show: 'm.3', focus: 'm.3' },
        { say: 'Check the hours: 39 regular plus 3.5 overtime is 42.5, the same as the total on the timecard.' },
      ],
    },
    {
      chapter: 'Read the rule',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using only the weekly total', md: 'Liam worked $42.5$ hours in all. A rule that only counts hours over $44$ in the week would give **no** overtime. But with a **daily** rule, the long days still earn overtime. Read the rule in the question carefully.' }],
      lines: [
        { say: 'Liam worked 42.5 hours in all. A rule that only counted hours over 44 in the week would give no overtime at all. But with a daily rule, the long days still earn overtime. So read the rule in the question carefully.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ava earns \\$16.00 per hour. Hours over $8$ in a day are paid at time-and-a-half. Ava worked $10$ hours on Monday, $6$ on Tuesday and $9$ on Wednesday. What is the gross pay?',
          choices: ['\\$424.00', '\\$400.00', '\\$448.00', '\\$600.00'],
          answer: 0,
          working: 'Overtime: $2 + 1 = 3$ h at $1.5 \\times 16.00 = 24.00$, so $72.00$. Regular: $8 + 6 + 8 = 22$ h, so $22 \\times 16.00 = 352.00$. Gross pay: $352.00 + 72.00 = 424.00$. B forgets overtime, and C uses double time.',
        },
      ],
      lines: [
        { say: 'Your turn. Ava earns sixteen dollars per hour. Hours over eight in a day are paid at time-and-a-half. Ava worked ten hours on Monday, six on Tuesday and nine on Wednesday. What is the gross pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Monday has two overtime hours and Wednesday has one: three hours at 24 dollars is 72 dollars. The regular hours are eight, six and eight, 22 hours at sixteen dollars: 352 dollars. Together, 424 dollars. B forgets the overtime, and C uses double time.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['With a daily rule, check each day on its own.', 'Each day counts at most the regular limit.', 'Check: regular + overtime hours = total hours.'] }],
      lines: [
        { say: 'Let’s sum up. With a daily overtime rule, check each day on its own.', show: 'sum.0' },
        { say: 'Each day counts at most the regular limit as regular hours.', show: 'sum.1' },
        { say: 'And check that the regular and overtime hours add up to the total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
