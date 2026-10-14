import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-1',
  lessonId: 'm204-3-1',
  title: 'Wages and Overtime, Part 1: Gross Pay from an Hourly Wage',
  thumbnailTitle: 'Gross Pay',
  thumbnail: 'f',
  summary: 'Gross pay as hourly wage times hours worked (16.50 dollars an hour for 24 hours is 396 dollars), a quick way to multiply by a wage with fifty cents, and a job with two rates (weekday and weekend hours paid separately, then added: 428 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.1 · Part 1', title: 'Gross Pay', subtitle: 'Paid by the hour' }],
      lines: [
        { say: 'Most first jobs pay by the hour. When payday comes, you should be able to check that your pay is right. All you need is your hours, your hourly wage and a calculator.', show: 'title' },
        { say: 'In this video, you will find gross pay from an hourly wage, including a job that pays two different rates.' },
      ],
    },
    {
      chapter: 'Hourly wage and gross pay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hourly wage and gross pay', md: 'An **hourly wage** is the money you earn for each hour of work. **Gross pay** is the total you earn **before** anything is taken off.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{gross pay} = \\text{hourly wage} \\times \\text{hours worked}'] },
      ],
      lines: [
        { say: 'An hourly wage is the money you earn for each hour of work. Gross pay is the total you earn before anything is taken off, such as taxes.', show: 'def' },
        { say: 'Every hour earns the same amount, so to find gross pay, multiply the hourly wage by the hours worked.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Pay for one week',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Amara is a cashier who earns \\$16.50 per hour. Last week she worked $24$ hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['16.50 \\times 24 = 396.00', '16 \\times 24 = 384, \\quad 0.50 \\times 24 = 12', '384 + 12 = 396'] },
      ],
      lines: [
        { say: 'Amara is a cashier who earns sixteen dollars fifty per hour. Last week she worked 24 hours. What was her gross pay?', show: 'q' },
        { say: 'Gross pay is the hourly wage times the hours: 16.50 times 24 is 396 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'You can check this without a calculator. Split the wage into sixteen dollars and fifty cents. Sixteen times 24 is 384.', show: 'm.1', focus: 'm.1' },
        { say: 'And fifty cents is half a dollar, so fifty cents times 24 is twelve dollars. 384 plus twelve is 396, so the pay is right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Two rates',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Hourly wage', 'Hours'], rows: [['Weekdays', '\\$16.00', '$18$'], ['Weekends', '\\$17.50', '$8$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{weekdays: } 18 \\times 16.00 = 288.00', '\\text{weekends: } 8 \\times 17.50 = 140.00', '\\text{gross pay: } 288.00 + 140.00 = 428.00'] },
      ],
      lines: [
        { say: 'Some jobs pay more for weekend or evening shifts. Kai earns sixteen dollars per hour on weekdays and seventeen fifty per hour on weekends. This week, Kai worked 18 weekday hours and eight weekend hours.', show: 't' },
        { say: 'Pay the hours at each rate separately. Weekdays: 18 times sixteen is 288 dollars.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'Weekends: eight times 17.50 is 140 dollars.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'Then add: 288 plus 140 is 428 dollars of gross pay.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Nadia earns \\$15.00 per hour on weekdays and \\$18.00 per hour on weekends. This week Nadia worked $20$ weekday hours and $6$ weekend hours. What is the gross pay?',
          choices: ['\\$408.00', '\\$390.00', '\\$468.00', '\\$429.00'],
          answer: 0,
          working: 'Weekdays: $20 \\times 15.00 = 300.00$. Weekends: $6 \\times 18.00 = 108.00$. Gross pay: $300.00 + 108.00 = 408.00$. B pays every hour at the weekday rate, and C at the weekend rate.',
        },
      ],
      lines: [
        { say: 'Your turn. Nadia earns fifteen dollars per hour on weekdays and eighteen dollars per hour on weekends. This week Nadia worked twenty weekday hours and six weekend hours. What is the gross pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty times fifteen is 300 dollars, and six times eighteen is 108 dollars. Together, 408 dollars. B pays every hour at the weekday rate, and C pays every hour at the weekend rate.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Gross pay = hourly wage × hours worked.', 'Gross pay is before anything is taken off.', 'Two rates: pay each set of hours separately, then add.'] }],
      lines: [
        { say: 'Let’s sum up. Gross pay is the hourly wage times the hours worked.', show: 'sum.0' },
        { say: 'It is the pay before anything is taken off.', show: 'sum.1' },
        { say: 'And with two rates, pay each set of hours separately, then add. In part two, we read a timecard. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
