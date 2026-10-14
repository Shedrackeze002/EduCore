import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-3-b',
  lessonId: 'm204-2-3',
  title: 'Paying Over Time, Part 2: No Money Down and Weekly Payments',
  thumbnailTitle: 'No Money Down',
  thumbnail: 'm',
  summary: 'A laptop with no money down and 24 payments of 46.50 dollars (166.01 dollars more than cash), rent-to-own with 78 weekly payments of 19.99 dollars (659.23 dollars more than the 899.99 dollar cash price), and why small payments add up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.3 · Part 2', title: 'No Money Down', subtitle: 'Small payments add up' }],
      lines: [
        { say: '“No money down!” “Only twenty dollars a week!” Offers like these make expensive things feel cheap. The math tells a different story.', show: 'title' },
        { say: 'In this video, you will find the real cost of no-money-down plans and weekly payments.' },
      ],
    },
    {
      chapter: 'No money down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A laptop: \\$949.99 cash, or \\$0 down and $24$ monthly payments of \\$46.50.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['24 \\times 46.50 = 1{,}116.00', '1{,}116.00 - 949.99 = 166.01'] },
      ],
      lines: [
        { say: 'In this example, a laptop costs 949 dollars 99 cash. The store also offers no money down, and 24 monthly payments of 46 dollars fifty. How much more does the plan cost?', show: 'q' },
        { say: 'With no down payment, the total cost is just the payments: 24 times 46.50 is 1,116 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The finance charge is 1,116 minus 949.99: 166 dollars and one cent more than paying cash.', show: 'm.1', focus: 'm.1' },
        { say: 'No money down does not mean no extra cost. It usually means more payments.' },
      ],
    },
    {
      chapter: 'Rent-to-own',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A washer: \\$899.99 cash, or $78$ weekly payments of \\$19.99.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['78 \\times 19.99 = 1{,}559.22', '1{,}559.22 - 899.99 = 659.23'] },
      ],
      lines: [
        { say: 'Some stores, called rent-to-own stores, let you pay every week. The payment looks small, but it adds up. In this example, a washer has a cash price of 899 dollars 99, or 78 weekly payments of nineteen dollars 99.', show: 'q' },
        { say: '78 times 19.99 is 1,559 dollars 22.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 659 dollars 23 more than the cash price, almost three quarters of the washer’s price again.', show: 'm.1', focus: 'm.1' },
        { say: 'A weekly payment feels smaller than a monthly one, but there are about four weeks in a month, so 19.99 a week is roughly 80 dollars a month.' },
      ],
    },
    {
      chapter: 'How long is 78 weeks?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['78 \\div 52 = 1.5 \\text{ years}', '899.99 \\div 19.99 \\approx 45.02 \\to 46 \\text{ weeks}'] }],
      lines: [
        { say: 'There are 52 weeks in a year, so 78 weekly payments last a year and a half.', show: 'm.0', focus: 'm.0' },
        { say: 'If you saved the same 19.99 each week instead, 899.99 divided by 19.99 is about 45.02, so after 46 weeks you could pay cash, and keep the 659 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A phone costs \\$999 cash, or \\$0 down and $36$ monthly payments of \\$35. What is the finance charge?',
          choices: ['\\$261', '\\$1,260', '\\$35', '\\$999'],
          answer: 0,
          working: 'Total cost: $36 \\times 35 = 1{,}260$. Finance charge: $1{,}260 - 999 = 261$. B is the total cost of the plan.',
        },
      ],
      lines: [
        { say: 'Your turn. A phone costs 999 dollars cash, or no money down and 36 monthly payments of 35 dollars. What is the finance charge? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 36 times 35 is 1,260 dollars, and 1,260 minus 999 is 261 dollars extra. B is the total cost of the plan.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['No money down: total cost = payments × each payment.', 'Weekly payments add up fast.', 'Saving up and paying cash is usually cheapest.'] }],
      lines: [
        { say: 'Let’s sum up. With no money down, the total cost is the number of payments times each payment.', show: 'sum.0' },
        { say: 'Small weekly payments add up fast.', show: 'sum.1' },
        { say: 'And saving up and paying cash is usually the cheapest way. In part three, we compare payment plans. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
