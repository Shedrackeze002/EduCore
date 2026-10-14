import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-3',
  lessonId: 'm204-2-3',
  title: 'Paying Over Time, Part 1: Instalment Plans and the Finance Charge',
  thumbnailTitle: 'Instalment Plans',
  thumbnail: 't',
  summary: 'Down payments, instalments and the total cost of a plan (a TV for 100 dollars down and 12 payments of 65 dollars costs 880 dollars), the finance charge (80 dollars more than cash), and the mistake of forgetting the down payment.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.3 · Part 1', title: 'Instalment Plans', subtitle: 'Take it home now, pay later' }],
      lines: [
        { say: 'A couch, a laptop or a washing machine can cost a lot. Many stores let you take it home now, and pay a little each month. That can help, but paying over time almost always costs more than paying cash.', show: 'title' },
        { say: 'In this video, you will find the total cost of an instalment plan, and how much extra it costs.' },
      ],
    },
    {
      chapter: 'Down payment and instalments',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Down payment and instalment', md: 'A **down payment** is the money you pay at the start. An **instalment** is one of the regular payments after that. A plan made of instalments is an **instalment plan**.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{total cost} = \\text{down payment} + \\text{number of payments} \\times \\text{each payment}'] },
      ],
      lines: [
        { say: 'A down payment is the money you pay at the start. An instalment is one of the regular payments after that, every month or every week, until the plan ends.', show: 'def' },
        { say: 'The total cost of the plan is the down payment, plus the number of payments times each payment.', show: 'f', focus: 'f.0' },
      ],
    },
    {
      chapter: 'A TV plan',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Payment plan for a TV', 'Amount'], rows: [['Cash price', '\\$800.00'], ['Down payment', '\\$100.00'], ['Monthly payment', '\\$65.00'], ['Number of payments', '$12$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['12 \\times 65.00 = 780.00', '100.00 + 780.00 = 880.00'] },
      ],
      lines: [
        { say: 'In this example, a TV has a cash price of 800 dollars. The payment plan is 100 dollars down, then twelve monthly payments of 65 dollars. What is the total cost of the plan?', show: 't' },
        { say: 'First, all the monthly payments: twelve times 65 is 780 dollars.', show: 'm.0', focus: ['t.2', 't.3', 'm.0'] },
        { say: 'Then add the down payment: 100 plus 780 is 880 dollars. The plan costs 880 dollars in all.', show: 'm.1', focus: ['t.1', 'm.1'] },
      ],
    },
    {
      chapter: 'Forgetting the down payment',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the down payment', md: 'The down payment is part of the cost. If you only add up the monthly payments, you get \\$780.00, which is \\$100.00 too low.' }],
      lines: [
        { say: 'A common mistake is to forget the down payment. It is part of the cost too. Adding up only the monthly payments gives 780 dollars, which is 100 dollars too low.', show: 'oops' },
      ],
    },
    {
      chapter: 'The finance charge',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Finance charge', md: 'The **extra** cost of paying over time.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{finance charge} = \\text{total cost of the plan} - \\text{cash price}', '880.00 - 800.00 = 80.00'] },
      ],
      lines: [
        { say: 'The extra money you pay for the chance to pay over time is called the finance charge.', show: 'def' },
        { say: 'The finance charge is the total cost of the plan, minus the cash price.', show: 'm.0', focus: 'm.0' },
        { say: 'For the TV, 880 minus 800 is eighty dollars. Paying over time costs eighty dollars more than paying cash.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A stereo costs \\$340 cash. The plan is \\$50 down and $10$ monthly payments of \\$32. What is the finance charge?',
          choices: ['\\$30', '\\$370', '\\$320', '\\$50'],
          answer: 0,
          working: 'Total cost: $50 + 10 \\times 32 = 370$. Finance charge: $370 - 340 = 30$. B is the total cost of the plan.',
        },
      ],
      lines: [
        { say: 'Your turn. A stereo costs 340 dollars cash. The plan is fifty dollars down and ten monthly payments of 32 dollars. What is the finance charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The plan costs fifty plus ten times 32: 370 dollars. That is thirty dollars more than the cash price. B is the total cost of the plan, not the finance charge.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Total cost = down payment + payments × each payment.', 'Include the down payment.', 'Finance charge = total cost − cash price.'] }],
      lines: [
        { say: 'Let’s sum up. The total cost of a plan is the down payment, plus the number of payments times each payment.', show: 'sum.0' },
        { say: 'Always include the down payment.', show: 'sum.1' },
        { say: 'And the finance charge is the total cost minus the cash price. In part two, we look at no-money-down plans and weekly payments. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
