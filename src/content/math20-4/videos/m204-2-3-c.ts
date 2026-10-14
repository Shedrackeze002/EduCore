import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-3-c',
  lessonId: 'm204-2-3',
  title: 'Paying Over Time, Part 3: Comparing Payment Plans',
  thumbnailTitle: 'Comparing Payment Plans',
  thumbnail: 't',
  summary: 'A percent down payment (20% down on a 1,500 dollar e-bike, then 12 payments of 109.99 dollars, costs 1,619.88 dollars), comparing two plans by their total costs (Plan A is 99.76 dollars cheaper), and why a smaller monthly payment can cost more.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.3 · Part 3', title: 'Comparing Payment Plans', subtitle: 'Look at the total' }],
      lines: [
        { say: 'Two payment plans for the same thing: one with a smaller monthly payment, one with a bigger one. Which costs less?', show: 'title' },
        { say: 'In this video, you will work out a percent down payment, and compare two plans by their total costs.' },
      ],
    },
    {
      chapter: '20% down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'An e-bike: \\$1,500 cash, or $20\\%$ down and $12$ monthly payments of \\$109.99.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{down: } 0.2 \\times 1{,}500 = 300.00', '\\text{payments: } 12 \\times 109.99 = 1{,}319.88', '\\text{total: } 300.00 + 1{,}319.88 = 1{,}619.88', '\\text{finance charge: } 1{,}619.88 - 1{,}500.00 = 119.88'] },
      ],
      lines: [
        { say: 'In this example, an e-bike costs 1,500 dollars cash. The plan is twenty percent down, then twelve monthly payments of 109 dollars 99.', show: 'q' },
        { say: 'When the down payment is a percent, it is a percent of the cash price. Twenty percent of 1,500 is 0.2 times 1,500: 300 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The monthly payments are twelve times 109.99: 1,319 dollars 88.', show: 'm.1', focus: 'm.1' },
        { say: 'The total cost is 300 plus 1,319.88: 1,619 dollars 88.', show: 'm.2', focus: 'm.2' },
        { say: 'So the finance charge is 119 dollars 88 more than cash.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which plan costs less?',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Plan', 'Down payment', 'Monthly payment', 'Number of payments'], rows: [['Plan A', '\\$200.00', '\\$85.00', '$12$'], ['Plan B', '\\$0.00', '\\$54.99', '$24$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{A: } 200.00 + 12 \\times 85.00 = 1{,}220.00', '\\text{B: } 24 \\times 54.99 = 1{,}319.76', '1{,}319.76 - 1{,}220.00 = 99.76'] },
      ],
      lines: [
        { say: 'To compare two plans, find the total cost of each one. Here are two plans for the same item.', show: 't' },
        { say: 'Plan A: 200 dollars down, plus twelve times 85 dollars. That is 200 plus 1,020: 1,220 dollars.', show: 'm.0', focus: ['t.0', 'm.0'] },
        { say: 'Plan B: no money down, and 24 payments of 54 dollars 99: 1,319 dollars 76.', show: 'm.1', focus: ['t.1', 'm.1'] },
        { say: 'Plan A costs 99 dollars 76 less, even though Plan B has the smaller monthly payment.', show: 'm.2', focus: 'm.2' },
        { say: 'So why would anyone choose Plan B? If you do not have 200 dollars today, or 85 dollars a month does not fit your budget, Plan B may be the only way. Just know that it costs more.' },
      ],
    },
    {
      chapter: 'Look at the total',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Look at the total, not the monthly payment', md: 'A small monthly payment often means **more** payments. Always find the total cost before you sign. Saving up and paying cash is usually cheapest.' }],
      lines: [
        { say: 'A small monthly payment often means more payments. Always find the total cost before you sign. And saving up to pay cash is usually the cheapest choice of all.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fridge costs \\$1,200 cash. The plan is $10\\%$ down, then $18$ monthly payments of \\$66. What is the total cost of the plan?',
          choices: ['\\$1,308.00', '\\$1,188.00', '\\$1,200.00', '\\$108.00'],
          answer: 0,
          working: 'Down: $0.1 \\times 1{,}200 = 120$. Payments: $18 \\times 66 = 1{,}188$. Total: $120 + 1{,}188 = 1{,}308$. B forgets the down payment, and D is the finance charge.',
        },
      ],
      lines: [
        { say: 'Your turn. A fridge costs 1,200 dollars cash. The plan is ten percent down, then eighteen monthly payments of 66 dollars. What is the total cost of the plan? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The down payment is ten percent of 1,200: 120 dollars. The payments are eighteen times 66: 1,188 dollars. Together, 1,308 dollars. B forgets the down payment, and D is the finance charge.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A percent down payment is a percent of the cash price.', 'Compare plans by their total costs.', 'A smaller payment can mean a bigger total.'] }],
      lines: [
        { say: 'Let’s sum up. A percent down payment is a percent of the cash price.', show: 'sum.0' },
        { say: 'Compare payment plans by their total costs.', show: 'sum.1' },
        { say: 'And a smaller monthly payment can mean a bigger total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
