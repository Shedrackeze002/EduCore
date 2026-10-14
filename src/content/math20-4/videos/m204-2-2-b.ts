import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-2-b',
  lessonId: 'm204-2-2',
  title: 'Sales, Discounts and Taxes, Part 2: Two Deals at Once',
  thumbnailTitle: 'Two Deals at Once',
  thumbnail: 'm',
  summary: '“Buy one, get the second at 50% off” (two pairs of shoes for 110 dollars), two discounts in a row (20% off, then 10% off 100 dollars is 72 dollars, not 70), and why discounts in a row are not added.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.2 · Part 2', title: 'Two Deals at Once', subtitle: 'One step at a time' }],
      lines: [
        { say: '“Buy one, get the second half price.” “An extra ten percent off at the till.” Some sales stack two deals together, and they are trickier than they look.', show: 'title' },
        { say: 'In this video, you will work out two-deal sales, one step at a time.' },
      ],
    },
    {
      chapter: 'Second item 50% off',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Buy one, get the second at $50\\%$ off. Pairs of shoes at \\$80 and \\$60.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['60 \\div 2 = 30 \\text{ saved}', '80 + 60 - 30 = 110'] },
      ],
      lines: [
        { say: 'Shoes are on sale: buy one, get the second at fifty percent off. Maya buys a pair for eighty dollars, and a pair for sixty dollars. What does Maya pay before tax?', show: 'q' },
        { say: 'Only the second item, usually the cheaper one, is half price. Half of sixty is thirty, so Maya saves thirty dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The total is eighty plus sixty, minus thirty: 110 dollars before tax.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that this deal is not the same as fifty percent off everything. That would cost only seventy dollars.' },
      ],
    },
    {
      chapter: 'Two discounts in a row',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A \\$100 jacket is $20\\%$ off, then another $10\\%$ off at the till.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{after } 20\\% \\text{ off: } 0.8 \\times 100 = 80.00', '\\text{after another } 10\\% \\text{ off: } 0.9 \\times 80 = 72.00'] },
      ],
      lines: [
        { say: 'A jacket is regularly 100 dollars. It is twenty percent off, and the store takes another ten percent off at the till. What is the final price?', show: 'q' },
        { say: 'After twenty percent off, you pay eighty percent: 0.8 times 100 is eighty dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The second discount comes off the sale price, not the regular price. After another ten percent off, you pay ninety percent of eighty: 0.9 times eighty is 72 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Not 30% off',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: '20% then 10% is not 30% off', md: '$30\\%$ off \\$100 would be \\$70. But the second $10\\%$ comes off \\$80, not \\$100, so you save only \\$8 more. The final price is \\$72.' }],
      lines: [
        { say: 'A common mistake is to add the discounts. Thirty percent off 100 dollars would be seventy dollars. But the second ten percent comes off eighty, not 100, so it saves only eight dollars more. The final price is 72 dollars.', show: 'oops' },
        { say: 'Two discounts in a row always save a little less than their total, so take them one at a time.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A jacket is regularly \\$80. It is $25\\%$ off, then another $10\\%$ off at the till. What is the final price?',
          choices: ['\\$54.00', '\\$52.00', '\\$60.00', '\\$26.00'],
          answer: 0,
          working: 'After $25\\%$ off: $0.75 \\times 80 = 60$. After another $10\\%$ off: $0.9 \\times 60 = 54$. B adds the discounts to make $35\\%$, and C forgets the second discount.',
        },
      ],
      lines: [
        { say: 'Your turn. A jacket is regularly eighty dollars. It is 25 percent off, then another ten percent off at the till. What is the final price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. After 25 percent off, you pay 0.75 times eighty, sixty dollars. After another ten percent off, you pay 0.9 times sixty, 54 dollars. B adds the discounts together, and C forgets the second one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['“Second item 50% off”: only one item is half price.', 'Take a second discount off the sale price.', 'Discounts in a row are not added together.'] }],
      lines: [
        { say: 'Let’s sum up. For “second item fifty percent off”, only one item, usually the cheaper one, is half price.', show: 'sum.0' },
        { say: 'Take a second discount off the sale price, not the regular price.', show: 'sum.1' },
        { say: 'And discounts in a row are not added together. In part three, we add GST and read a receipt. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
