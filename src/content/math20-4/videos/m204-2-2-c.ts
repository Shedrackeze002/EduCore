import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-2-c',
  lessonId: 'm204-2-2',
  title: 'Sales, Discounts and Taxes, Part 3: Subtotal, GST and Total',
  thumbnailTitle: 'Subtotal, GST and Total',
  thumbnail: 't',
  summary: 'Reading a receipt: the subtotal of a toque, gloves and socks (37.49 dollars), GST at a rate given in the question (5%, 1.87 dollars), the total (39.36 dollars), and rounding the tax to the nearest cent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.2 · Part 3', title: 'Subtotal, GST and Total', subtitle: 'Reading a receipt' }],
      lines: [
        { say: 'At the till, the price on the tag is not the end of the story. The store adds up your items, then adds tax.', show: 'title' },
        { say: 'In this video, you will find the subtotal, the GST, and the total on a receipt.' },
      ],
    },
    {
      chapter: 'Subtotal and GST',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Subtotal and GST', md: 'The **subtotal** is the total of the prices **before** tax. **GST** (Goods and Services Tax) is a tax added to many things you buy. Each question tells you the rate to use.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{GST} = \\text{rate} \\times \\text{subtotal}', '\\text{total} = \\text{subtotal} + \\text{GST}'] },
      ],
      lines: [
        { say: 'The subtotal is the total of the prices before tax. GST, the Goods and Services Tax, is a tax added to many things you buy. Each question tells you the rate to use.', show: 'def' },
        { say: 'The GST is the rate, as a decimal, times the subtotal.', show: 'f.0', focus: 'f.0' },
        { say: 'And the total is the subtotal plus the GST.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'Reading a receipt',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Item', 'Price'], rows: [['Toque', '\\$15.00'], ['Gloves', '\\$12.50'], ['Socks', '\\$9.99'], ['Subtotal', '?'], ['GST ($5\\%$)', '?'], ['Total', '?']] },
      ],
      lines: [
        { say: 'Here is a receipt for a toque at fifteen dollars, gloves at twelve fifty, and socks at nine 99. In this example, GST is five percent. Find the subtotal, the GST and the total.', show: 't' },
      ],
    },
    {
      chapter: 'Working it out',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{subtotal: } 15.00 + 12.50 + 9.99 = 37.49', '\\text{GST: } 0.05 \\times 37.49 = 1.8745 \\approx 1.87', '\\text{total: } 37.49 + 1.87 = 39.36'] }],
      lines: [
        { say: 'First, the subtotal: fifteen plus 12.50 plus 9.99 is 37 dollars 49.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the GST: five percent is 0.05, and 0.05 times 37.49 is 1.8745. The third decimal digit is four, so round down to one dollar 87.', show: 'm.1', focus: 'm.1' },
        { say: 'The total is the subtotal plus the GST: 37.49 plus 1.87 is 39 dollars 36.', show: 'm.2', focus: 'm.2' },
        { say: 'Notice that the tax is worked out once, on the subtotal, and rounded once, at the end.' },
      ],
    },
    {
      chapter: 'A quick estimate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Estimate the tax', md: 'At $5\\%$, the tax is about **5 cents for every dollar**: half of $10\\%$. For a subtotal near \\$37, $10\\%$ is about \\$3.70, so $5\\%$ is about \\$1.85.' }],
      lines: [
        { say: 'You can estimate five percent tax in your head. It is half of ten percent. For a subtotal of about 37 dollars, ten percent is about three dollars seventy, so five percent is about one dollar 85. That is close to 1.87.', show: 'tip' },
        { say: 'Not every item has the same tax, and some items have none. The question, or the receipt, tells you which items are taxed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A subtotal is \\$24.60. In this example, GST is $5\\%$. What is the total?',
          choices: ['\\$25.83', '\\$1.23', '\\$24.60', '\\$29.60'],
          answer: 0,
          working: 'GST: $0.05 \\times 24.60 = 1.23$. Total: $24.60 + 1.23 = 25.83$. B is only the GST, and D adds \\$5 instead of $5\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. A subtotal is 24 dollars sixty. In this example, GST is five percent. What is the total? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The GST is 0.05 times 24.60, one dollar 23, so the total is 25 dollars 83. B is only the GST, and D adds five dollars instead of five percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Subtotal = the prices added up.', 'GST = rate × subtotal, rounded to the cent.', 'Total = subtotal + GST.'] }],
      lines: [
        { say: 'Let’s sum up. The subtotal is the prices added up, before tax.', show: 'sum.0' },
        { say: 'The GST is the rate times the subtotal, rounded to the nearest cent.', show: 'sum.1' },
        { say: 'And the total is the subtotal plus the GST. In part four, we pay and check our change. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
