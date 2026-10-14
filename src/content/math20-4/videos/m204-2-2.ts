import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-2',
  lessonId: 'm204-2-2',
  title: 'Sales, Discounts and Taxes, Part 1: Discounts and Sale Prices',
  thumbnailTitle: 'Discounts and Sale Prices',
  thumbnail: 'f',
  summary: 'The discount and the sale price: a 40 dollar hoodie at 25% off (save 10 dollars, pay 30 dollars), jeans at 30% off 59.99 dollars (41.99 dollars), and the mistake of stopping at the discount.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.2 · Part 1', title: 'Discounts and Sale Prices', subtitle: 'How much will you really pay?' }],
      lines: [
        { say: 'A sign that says “25 percent off” sounds great. But how much will you really pay?', show: 'title' },
        { say: 'In this video, you will find the discount, and the sale price.' },
      ],
    },
    {
      chapter: 'Discount and sale price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Discount and sale price', md: 'The **discount** is the money you save. The **sale price** is what you pay after the discount.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{discount} = \\text{percent off} \\times \\text{regular price}', '\\text{sale price} = \\text{regular price} - \\text{discount}'] },
      ],
      lines: [
        { say: 'A sale takes a percent off the regular price. The discount is the money you save, and the sale price is what you pay after the discount.', show: 'def' },
        { say: 'The discount is the percent off, as a decimal, times the regular price.', show: 'f.0', focus: 'f.0' },
        { say: 'And the sale price is the regular price minus the discount.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A hoodie on sale',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A hoodie is regularly \\$40. It is $25\\%$ off.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['25\\% = 0.25', '\\text{discount: } 0.25 \\times 40 = 10.00', '\\text{sale price: } 40.00 - 10.00 = 30.00'] },
      ],
      lines: [
        { say: 'A hoodie is regularly forty dollars, and it is on sale for 25 percent off. How much do you save, and what is the sale price?', show: 'q' },
        { say: 'Change the percent to a decimal: 25 percent is 0.25.', show: 'm.0', focus: 'm.0' },
        { say: 'The discount is 0.25 times forty: ten dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The sale price is forty minus ten: thirty dollars. You save ten dollars, and pay thirty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Jeans at 30% off',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Jeans are regularly \\$59.99. They are $30\\%$ off.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{discount: } 0.3 \\times 59.99 = 17.997 \\approx 18.00', '\\text{sale price: } 59.99 - 18.00 = 41.99'] },
      ],
      lines: [
        { say: 'A pair of jeans is regularly 59 dollars 99, on sale for thirty percent off.', show: 'q' },
        { say: 'The discount is 0.3 times 59.99, which is 17.997. Rounded to the nearest cent, you save eighteen dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The sale price is 59.99 minus eighteen: 41 dollars 99.', show: 'm.1', focus: 'm.1' },
        { say: 'Estimate to check: thirty percent of about sixty dollars is about eighteen, so a sale price of about 42 makes sense.' },
      ],
    },
    {
      chapter: 'Stopping too soon',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping too soon', md: '$0.3 \\times 59.99$ is the money you **save**, not the price you pay. Subtract it from the regular price to get the sale price.' }],
      lines: [
        { say: 'A common mistake is to stop too soon. 0.3 times 59.99 is the money you save, not the price you pay. Subtract it from the regular price to get the sale price.', show: 'oops' },
        { say: 'Read the question: does it ask how much you save, or how much you pay?' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A drill is regularly \\$120. It is $15\\%$ off. What is the sale price?',
          choices: ['\\$102.00', '\\$18.00', '\\$105.00', '\\$138.00'],
          answer: 0,
          working: 'Discount: $0.15 \\times 120 = 18$. Sale price: $120 - 18 = 102$. B is the discount, and C takes off \\$15 instead of $15\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A drill is regularly 120 dollars, and it is fifteen percent off. What is the sale price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The discount is 0.15 times 120, eighteen dollars, so the sale price is 120 minus eighteen: 102 dollars. B is the discount, and C takes off fifteen dollars instead of fifteen percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Discount = percent off × regular price.', 'Sale price = regular price − discount.', 'Check whether the question asks what you save or what you pay.'] }],
      lines: [
        { say: 'Let’s sum up. The discount is the percent off, as a decimal, times the regular price.', show: 'sum.0' },
        { say: 'The sale price is the regular price minus the discount.', show: 'sum.1' },
        { say: 'And check whether the question asks what you save, or what you pay. In part two, we handle two deals at once. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
