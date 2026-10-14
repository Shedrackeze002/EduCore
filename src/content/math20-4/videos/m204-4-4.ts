import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-4',
  lessonId: 'm204-4-4',
  title: 'Cars and Homes, Part 1: The Monthly Cost of a Vehicle',
  thumbnailTitle: 'The Cost of a Car',
  thumbnail: 't',
  summary: 'The real monthly cost of a car: the payment plus insurance (1,740 dollars a year is 145 dollars a month), gas and maintenance, for a total of 640 dollars a month, much more than the 285 dollar payment.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.4 · Part 1', title: 'The Cost of a Car', subtitle: 'More than the payment' }],
      lines: [
        { say: 'Your first vehicle is a big step. It costs much more than the price tag, or the monthly payment. Work out the real monthly cost before you sign anything.', show: 'title' },
        { say: 'In this video, you will find the full monthly cost of owning a car.' },
      ],
    },
    {
      chapter: 'More than the payment',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Insurance', md: '**Insurance** is a plan you pay for that covers the cost if something goes wrong, like a crash, a fire or a theft.' },
        { kind: 'bullets', id: 'b', items: ['the car payment', 'insurance', 'fuel, like gas', 'maintenance, like oil changes and tires'] },
      ],
      lines: [
        { say: 'A car payment is only part of the cost. You also pay for insurance. Insurance is a plan you pay for that covers the cost if something goes wrong, like a crash, a fire or a theft.', show: 'def' },
        { say: 'So the monthly cost of a car includes the car payment, insurance, fuel like gas, and maintenance, like oil changes and tires.', show: 'b' },
        { say: 'Insurance is often quoted per year. To put it in a monthly budget, divide by twelve.' },
      ],
    },
    {
      chapter: 'The real cost of a car',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Cost', 'Amount'], rows: [['Car payment', '\\$285 per month'], ['Insurance', '\\$1,740 per year'], ['Gas', '\\$160 per month'], ['Maintenance', '\\$50 per month']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{insurance: } 1{,}740 \\div 12 = 145', '285 + 145 + 160 + 50 = 640'] }],
      lines: [
        { say: 'Sofia’s costs for her car are in the table. What does the car cost her each month?', show: 't' },
        { say: 'The insurance is per year, so divide by twelve: 1,740 divided by twelve is 145 dollars a month.', show: 'm.0', focus: ['t.1', 'm.0'] },
        { say: 'Now add the monthly costs: 285 plus 145 plus 160 plus fifty is 640 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So the car costs Sofia 640 dollars a month, more than twice the 285 dollar payment. That is 7,680 dollars a year.' },
      ],
    },
    {
      chapter: 'Every cost, every month',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting only the payment', md: 'A dealer may talk about the **payment**. Before you buy, add insurance, fuel and maintenance, and change any yearly costs to monthly costs.' }],
      lines: [
        { say: 'A common mistake is to count only the payment. A dealer may talk about the low monthly payment. Before you buy, add insurance, fuel and maintenance, and change any yearly costs to monthly costs. Then check that the total fits your budget.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car payment is \\$310 a month. Insurance is \\$1,920 a year, gas is \\$140 a month and maintenance is \\$45 a month. What is the total monthly cost?',
          choices: ['\\$655', '\\$495', '\\$2,415', '\\$310'],
          answer: 0,
          working: 'Insurance: $1{,}920 \\div 12 = 160$. Total: $310 + 160 + 140 + 45 = 655$. B forgets the insurance, C adds the yearly insurance, and D is only the payment.',
        },
      ],
      lines: [
        { say: 'Your turn. A car payment is 310 dollars a month. Insurance is 1,920 dollars a year, gas is 140 dollars a month, and maintenance is 45 dollars a month. What is the total monthly cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The insurance is 1,920 divided by twelve: 160 dollars a month. Then 310 plus 160 plus 140 plus 45 is 655 dollars. B forgets the insurance, C adds the yearly insurance, and D is only the payment.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A car costs its payment plus insurance, fuel and maintenance.', 'Divide yearly costs by 12.', 'Check that the total fits your budget.'] }],
      lines: [
        { say: 'Let’s sum up. A car costs its payment, plus insurance, fuel and maintenance.', show: 'sum.0' },
        { say: 'Divide yearly costs by twelve to get monthly costs.', show: 'sum.1' },
        { say: 'And check that the total fits your budget. In part two, we find fuel costs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
