import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-2-b',
  lessonId: 'm204-3-2',
  title: 'Other Ways to Earn, Part 2: Commission',
  thumbnailTitle: 'Commission',
  thumbnail: 'm',
  summary: 'Commission as a percent of sales (5% of 8,400 dollars is 420 dollars), a base salary plus commission (400 dollars plus 3% of 6,500 dollars is 595 dollars), and why a base salary helps in a slow week.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.2 · Part 2', title: 'Commission', subtitle: 'Paid for what you sell' }],
      lines: [
        { say: 'People who sell cars, furniture or houses are often paid for what they sell. The more they sell, the more they earn.', show: 'title' },
        { say: 'In this video, you will find commission, and pay made of a base salary plus commission.' },
      ],
    },
    {
      chapter: 'Commission',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Commission', md: 'A **commission** is pay that is a percent of your sales.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{commission} = \\text{commission rate} \\times \\text{sales}'] },
      ],
      lines: [
        { say: 'A commission is pay that is a percent of your sales.', show: 'def' },
        { say: 'To find it, change the commission rate to a decimal, and multiply by the sales.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Selling furniture',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Tariq earns $5\\%$ commission. Last week he sold \\$8,400 worth of furniture.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\% = 0.05', '0.05 \\times 8{,}400 = 420.00', '10\\% \\text{ of } 8{,}400 = 840, \\quad \\tfrac{1}{2} \\text{ of } 840 = 420'] },
      ],
      lines: [
        { say: 'Tariq earns five percent commission. Last week he sold 8,400 dollars worth of furniture. How much commission did he earn?', show: 'q' },
        { say: 'Five percent as a decimal is 0.05.', show: 'm.0', focus: 'm.0' },
        { say: 'And 0.05 times 8,400 is 420 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Check it in your head. Ten percent of 8,400 is 840, and five percent is half of that: 420. So the commission is right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Base salary plus commission',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Mei earns \\$400 a week plus $3\\%$ of her sales. This week she sold \\$6,500 worth of shoes.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{commission: } 0.03 \\times 6{,}500 = 195.00', '\\text{total pay: } 400.00 + 195.00 = 595.00'] },
      ],
      lines: [
        { say: 'Some jobs pay a base salary plus commission, so you earn something even in a slow week. Mei earns 400 dollars a week, plus three percent of her sales. This week she sold 6,500 dollars worth of shoes.', show: 'q' },
        { say: 'First, the commission: three percent is 0.03, and 0.03 times 6,500 is 195 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the base: 400 plus 195 is 595 dollars for the week.', show: 'm.1', focus: 'm.1' },
        { say: 'In a week with no sales at all, Mei would still earn the 400 dollar base. With commission only, she would earn nothing.' },
      ],
    },
    {
      chapter: 'Which job pays more?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Job A pays \\$500 a week. Job B pays \\$200 a week plus $6\\%$ of sales.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{sales of } 5{,}000\\text{: } 200.00 + 0.06 \\times 5{,}000 = 500.00', '\\text{sales of } 8{,}000\\text{: } 200.00 + 0.06 \\times 8{,}000 = 680.00'] },
      ],
      lines: [
        { say: 'Which job pays more? Job A pays 500 dollars a week. Job B pays 200 dollars a week, plus six percent of sales.', show: 'q' },
        { say: 'With sales of 5,000 dollars, Job B pays 200 plus 300: 500 dollars, the same as Job A.', show: 'm.0', focus: 'm.0' },
        { say: 'With sales of 8,000 dollars, Job B pays 200 plus 480: 680 dollars. So Job B pays more when sales are high, and less when they are low.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jasmine earns \\$250 a week plus $4\\%$ of sales. This week Jasmine sold \\$7,200 worth of phones. What is the pay for the week?',
          choices: ['\\$538.00', '\\$288.00', '\\$278.80', '\\$7,450.00'],
          answer: 0,
          working: 'Commission: $0.04 \\times 7{,}200 = 288.00$. Total: $250.00 + 288.00 = 538.00$. B forgets the base, C uses $0.004$, and D adds the base to the sales.',
        },
      ],
      lines: [
        { say: 'Your turn. Jasmine earns 250 dollars a week, plus four percent of sales. This week Jasmine sold 7,200 dollars worth of phones. What is the pay for the week? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four percent is 0.04, and 0.04 times 7,200 is 288 dollars. Add the 250 dollar base: 538 dollars. B forgets the base, C uses 0.004 for four percent, and D adds the base to the sales.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Commission = rate × sales.', 'Change the percent to a decimal first.', 'Base plus commission: add the base to the commission.'] }],
      lines: [
        { say: 'Let’s sum up. Commission is the rate times the sales.', show: 'sum.0' },
        { say: 'Change the percent to a decimal first: five percent is 0.05.', show: 'sum.1' },
        { say: 'And with a base salary, add the base to the commission. In part three, we look at piecework. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
