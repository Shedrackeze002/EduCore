import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-1-c',
  lessonId: 'm204-3-1',
  title: 'Wages and Overtime, Part 3: Overtime Pay',
  thumbnailTitle: 'Overtime Pay',
  thumbnail: 'r',
  summary: 'Overtime at time-and-a-half (1.5 times the wage) and double time (2 times the wage), a day with 3 overtime hours at a rule given in the question (8 regular hours at 18 dollars plus 3 hours at 27 dollars is 225 dollars), and why only the extra hours earn the higher rate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.1 · Part 3', title: 'Overtime Pay', subtitle: 'Extra hours, a higher rate' }],
      lines: [
        { say: 'A long shift can come with a bonus. Many jobs pay a higher rate for the extra hours, called overtime.', show: 'title' },
        { say: 'In this video, you will find overtime rates, and the gross pay for a day with overtime.' },
      ],
    },
    {
      chapter: 'Overtime',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Overtime', md: '**Overtime** is time worked past the usual hours. It is often paid at **time-and-a-half**, $1.5$ times your regular wage. Some jobs pay **double time**, $2$ times your regular wage.' },
        { kind: 'callout', id: 'rule', tone: 'tip', title: 'Read the rule', md: 'Your job tells you when overtime starts. In this course, **each question tells you the rule** to use.' },
      ],
      lines: [
        { say: 'Overtime is time worked past the usual hours. It is often paid at time-and-a-half, which is one and a half times your regular wage. Some jobs pay double time, which is two times your regular wage.', show: 'def' },
        { say: 'Your job tells you when overtime starts, for example, after eight hours in a day. In this course, each question tells you the rule to use.', show: 'rule' },
      ],
    },
    {
      chapter: 'Overtime rates',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Regular wage: \\$18.00 per hour', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{time-and-a-half: } 1.5 \\times 18.00 = 27.00', '\\text{double time: } 2 \\times 18.00 = 36.00'] },
      ],
      lines: [
        { say: 'Rosa earns eighteen dollars per hour. What are her overtime rates?', show: 'q' },
        { say: 'Time-and-a-half is 1.5 times eighteen: 27 dollars per hour. That is eighteen, plus half of eighteen, which is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Double time is two times eighteen: 36 dollars per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A long day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Hours over $8$ in a day are paid at time-and-a-half. On Saturday Rosa worked $11$ hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{regular: } 8 \\times 18.00 = 144.00', '\\text{overtime hours: } 11 - 8 = 3', '\\text{overtime: } 3 \\times 27.00 = 81.00', '\\text{gross pay: } 144.00 + 81.00 = 225.00'] },
      ],
      lines: [
        { say: 'In this example, hours over eight in a day are paid at time-and-a-half. On Saturday, Rosa worked eleven hours. What did she earn?', show: 'q' },
        { say: 'The first eight hours are regular hours: eight times eighteen is 144 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The overtime hours are the hours past eight: eleven minus eight is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Those three hours earn the time-and-a-half rate of 27 dollars: three times 27 is 81 dollars.', show: 'm.2', focus: 'm.2' },
        { say: 'So Rosa’s gross pay for the day is 144 plus 81: 225 dollars.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Only the extra hours',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Paying every hour at the overtime rate', md: 'Only the hours **past** the limit earn overtime. Paying all $11$ hours at \\$27.00 gives \\$297.00, which is \\$72.00 too much.' }],
      lines: [
        { say: 'A common mistake is to pay every hour at the overtime rate. Eleven times 27 is 297 dollars, which is 72 dollars too much. Only the hours past the limit earn overtime.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Theo earns \\$20.00 per hour. Hours over $8$ in a day are paid at time-and-a-half. On Friday Theo worked $10$ hours. What is the gross pay for the day?',
          choices: ['\\$220.00', '\\$300.00', '\\$200.00', '\\$240.00'],
          answer: 0,
          working: 'Regular: $8 \\times 20.00 = 160.00$. Overtime: $2 \\times 30.00 = 60.00$. Gross pay: $160.00 + 60.00 = 220.00$. B pays every hour at time-and-a-half, C forgets overtime, and D uses double time.',
        },
      ],
      lines: [
        { say: 'Your turn. Theo earns twenty dollars per hour. Hours over eight in a day are paid at time-and-a-half. On Friday, Theo worked ten hours. What is the gross pay for the day? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight regular hours at twenty dollars is 160 dollars. The time-and-a-half rate is thirty dollars, and two overtime hours earn sixty dollars. Together, 220 dollars. B pays every hour at time-and-a-half, C forgets the overtime, and D uses double time.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Time-and-a-half = 1.5 × wage. Double time = 2 × wage.', 'Only the hours past the limit earn overtime.', 'Gross pay = regular pay + overtime pay.'] }],
      lines: [
        { say: 'Let’s sum up. Time-and-a-half is 1.5 times the wage, and double time is two times the wage.', show: 'sum.0' },
        { say: 'Only the hours past the limit earn overtime.', show: 'sum.1' },
        { say: 'And gross pay is the regular pay plus the overtime pay. In part four, we find overtime on a weekly timecard. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
