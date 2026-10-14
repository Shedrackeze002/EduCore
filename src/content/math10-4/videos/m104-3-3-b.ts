import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-3-3-b',
  lessonId: 'm104-3-3',
  title: 'Percents of Money, Part 2: Discounts and GST',
  thumbnailTitle: 'Discounts and GST',
  summary: 'Sale price = price − discount, paying 70% of the price at 30% off, adding 5% GST (as set in this course) or multiplying by 1.05, and taking the discount off first, then adding GST to the sale price.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 3.3 · Part 2', title: 'Discounts and GST', subtitle: 'What you really pay' }],
      lines: [
        { say: 'A jacket is thirty percent off, and tax is added at the till. What do you really pay?', show: 'title' },
        { say: 'In this video, you will find sale prices, add GST, and do both on one receipt.' },
      ],
    },
    {
      chapter: 'Discounts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{discount: } 0.30 \\times 89.99 = 26.997 \\approx 27.00', '\\text{sale price: } 89.99 - 27.00 = 62.99', '\\text{or } 0.70 \\times 89.99 \\approx 62.99'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at the discount', md: 'The discount is what you **save**, not what you pay. Subtract it from the price.' },
      ],
      lines: [
        { say: 'A discount is the amount taken off the price. The sale price is what you pay: the price, minus the discount.' },
        { say: 'A winter jacket costs 89 dollars 99, and it is thirty percent off. The discount is 0.30 times 89.99, which rounds to 27 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The sale price is 89.99 minus 27: 62 dollars 99. The 27 dollars is what you save, not what you pay.', show: ['m.1', 'oops'], focus: 'm.1' },
        { say: 'Here is a shortcut: with thirty percent off, you pay seventy percent of the price. 0.70 times 89.99 is about 62 dollars 99 again.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'GST',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'GST', md: 'The Goods and Services Tax, added to the price of most things you buy. In this course, the GST is $5\\%$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.05 \\times 129.99 = 6.4995 \\approx 6.50', '129.99 + 6.50 = 136.49', '\\text{or } 129.99 \\times 1.05 \\approx 136.49'] },
      ],
      lines: [
        { say: 'The G S T, the Goods and Services Tax, is added to the price of most things you buy. In this course, the G S T is five percent.', show: 'def' },
        { say: 'Kai buys work boots for 129 dollars 99. The G S T is 0.05 times 129.99, which rounds to 6 dollars 50.', show: 'm.0', focus: 'm.0' },
        { say: 'The total is 129.99 plus 6.50: 136 dollars 49.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying by 1.05 adds five percent in one step, and gives the same total.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sale price, then GST',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['Receipt', 'Amount'], rows: [['Cordless drill', '\\$149.99'], ['20% off', '−\\$30.00'], ['Sale price', '\\$119.99'], ['GST (5%)', '\\$6.00'], ['Total', '\\$125.99']] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'GST on the old price', md: 'Find the GST on the price you actually pay: the **sale price**.' }],
      lines: [
        { say: 'When an item is on sale, the store takes off the discount first, then adds G S T to the sale price. A cordless drill costs 149 dollars 99, and it is twenty percent off.', show: 't.0' },
        { say: 'The discount is twenty percent of 149.99, which rounds to thirty dollars. So the sale price is 119 dollars 99.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'The G S T is five percent of the sale price: six dollars. So the total is 125 dollars 99.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'Find the G S T on the price you actually pay. G S T on the old price would be too much.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shirt costs \\$40 and is $25\\%$ off. Then $5\\%$ GST is added. What is the total?',
          choices: ['\\$31.50', '\\$30.00', '\\$32.00', '\\$52.50'],
          answer: 0,
          working: 'Discount: $0.25 \\times 40 = 10$, so the sale price is \\$30. GST: $0.05 \\times 30 = 1.50$. Total: \\$31.50.',
        },
      ],
      lines: [
        { say: 'Your turn. A shirt costs forty dollars and is 25 percent off. Then five percent G S T is added. What is the total? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A quarter of forty is ten, so the sale price is thirty dollars. Five percent of thirty is 1 dollar 50, so the total is 31 dollars 50. B forgets the G S T, and C finds the G S T on the old price.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sale price = price − discount.', 'With $30\\%$ off, you pay $70\\%$ of the price.', 'Take off the discount first, then add GST.'] }],
      lines: [
        { say: 'Let’s sum up. The sale price is the price minus the discount.', show: 'sum.0' },
        { say: 'With thirty percent off, you pay seventy percent of the price.', show: 'sum.1' },
        { say: 'And with a sale, take off the discount first, then add the G S T. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
