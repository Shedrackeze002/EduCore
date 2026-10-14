import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-1-b',
  lessonId: 'm103-2-1',
  title: 'Hourly Wages and Overtime, Part 2: Overtime',
  thumbnailTitle: 'Overtime Pay',
  summary: 'Time-and-a-half and double time, paying the higher rate only for the hours past the limit, and why a daily overtime rule and a weekly one give different pay.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.1 · Part 2', title: 'Overtime', subtitle: 'Time-and-a-half and double time' }],
      lines: [
        { say: 'Working extra hours often earns a higher rate. But which hours, and how much more?', show: 'title' },
        { say: 'In this video, you will calculate overtime pay with a weekly rule and with a daily rule.' },
      ],
    },
    {
      chapter: 'Overtime rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Overtime', md: 'Time worked beyond the regular hours. **Time-and-a-half** pays $1.5$ times the regular wage, and **double time** pays $2$ times.' },
        { kind: 'text', id: 't', md: 'Employment standards and union agreements set the overtime rules. In this course, every question tells you the rule to use.', size: 'md' },
      ],
      lines: [
        { say: 'Overtime is time worked beyond the regular hours. Time-and-a-half pays one and a half times the regular hourly wage, and double time pays twice the wage.', show: 'def' },
        { say: 'Each workplace has a rule for when overtime starts, such as hours over eight in a day, or over forty in a week. In this course, every question tells you the rule to use.', show: 't' },
      ],
    },
    {
      chapter: 'A weekly rule',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Mateo earns \\$22.40 per hour. Hours over 40 in a week are paid at time-and-a-half. He worked 46 hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{regular: } 40 \\times \\$22.40 = \\$896.00', '\\text{overtime rate: } 1.5 \\times \\$22.40 = \\$33.60', '\\text{overtime: } 6 \\times \\$33.60 = \\$201.60', '\\text{gross: } \\$896.00 + \\$201.60 = \\$1{,}097.60'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Only the extra hours', md: 'Do not pay all 46 hours at the overtime rate. Only the hours past the limit earn time-and-a-half.' },
      ],
      lines: [
        { say: 'Mateo earns twenty-two forty an hour as a tire technician. Hours over forty in a week are paid at time-and-a-half, and he worked 46 hours. The first forty hours earn the regular wage: 896 dollars.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'The overtime rate is one and a half times twenty-two forty: thirty-three sixty an hour.', show: 'm.1', focus: 'm.1' },
        { say: 'He worked six overtime hours, so the overtime pay is six times thirty-three sixty: 201 dollars sixty.', show: 'm.2', focus: 'm.2' },
        { say: 'So the gross pay is 896 plus 201.60: one thousand and ninety-seven dollars sixty. Only the six extra hours earn the higher rate.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A daily rule',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Day', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          rows: [
            ['Hours', '9', '8', '10.5', '7.5', '9.5'],
            ['Overtime', '1', '0', '2.5', '0', '1.5'],
          ],
        },
        { kind: 'math', id: 'm', size: 'md', lines: ['39.5 \\times \\$19.60 = \\$774.20', '5 \\times (1.5 \\times \\$19.60) = 5 \\times \\$29.40 = \\$147.00', '\\$774.20 + \\$147.00 = \\$921.20'] },
      ],
      lines: [
        { say: 'When the rule is over eight hours in a day, check each day separately. Kiona earns nineteen sixty an hour as a farm hand, with time-and-a-half for hours over eight in a day.', show: 't.0' },
        { say: 'The overtime is one hour on Monday, none on Tuesday, two and a half on Wednesday, none on Thursday, and one and a half on Friday: five hours in all. The other 39.5 hours are regular.', show: 't.1', focus: 't.1' },
        { say: 'Regular pay is 39.5 times nineteen sixty: 774 dollars twenty. Overtime pay is five times twenty-nine forty: 147 dollars.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'So the gross pay is 921 dollars twenty. With a weekly rule of over forty hours, only 4.5 of her 44.5 hours would be overtime. Always read the rule carefully.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lee earns \\$20.00 per hour, with time-and-a-half for hours over 40 in a week. Lee worked 44 hours. What is the gross pay?',
          choices: ['\\$920.00', '\\$1,320.00', '\\$880.00', '\\$960.00'],
          answer: 0,
          working: '$40 \\times 20 = 800$, and $4 \\times 30 = 120$, so the gross pay is $920$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Lee earns twenty dollars an hour, with time-and-a-half for hours over forty in a week, and worked 44 hours. What is the gross pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty hours at twenty dollars is 800. Four overtime hours at thirty dollars is 120. So the gross pay is 920 dollars. B pays every hour at the overtime rate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Time-and-a-half is 1.5 × the wage; double time is 2 × the wage.', 'Only the hours past the limit earn the higher rate.', 'Check whether the rule is daily or weekly.'] }],
      lines: [
        { say: 'Let’s sum up. Time-and-a-half is one and a half times the wage, and double time is twice the wage.', show: 'sum.0' },
        { say: 'Only the hours past the limit earn the higher rate.', show: 'sum.1' },
        { say: 'And check whether the overtime rule is daily or weekly. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
