import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-1-c',
  lessonId: 'm204-2-1',
  title: 'Unit Price and the Best Buy, Part 3: Finding the Best Buy',
  thumbnailTitle: 'The Best Buy',
  thumbnail: 't',
  summary: 'Finding the best buy by comparing unit prices in the same unit: three bags of rice where the 4 kg bag (about 2.50 dollars per kilogram) beats the 8 kg bag, a quick check when one size is double another, and why bigger is not always cheaper.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.1 · Part 3', title: 'Finding the Best Buy', subtitle: 'The lowest unit price wins' }],
      lines: [
        { say: 'Small, medium or large? Most people grab the biggest bag, thinking it must be the cheapest. Sometimes it is not.', show: 'title' },
        { say: 'In this video, you will compare sizes with unit prices, and find the best buy.' },
      ],
    },
    {
      chapter: 'The best buy',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Best buy', md: 'The choice with the **lowest unit price**, as long as you need that much and will use it. Compare unit prices in the **same** unit.' }],
      lines: [
        { say: 'The best buy is the choice with the lowest unit price, as long as you need that much and will use it.', show: 'def' },
        { say: 'To compare sizes fairly, find the unit price of each size in the same unit, such as dollars per kilogram for all of them.' },
      ],
    },
    {
      chapter: 'Three bags of rice',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Size', 'Price', 'Unit price'], rows: [['$1$ kg', '\\$2.99', '\\$2.99 per kg'], ['$4$ kg', '\\$9.99', '\\$2.50 per kg'], ['$8$ kg', '\\$21.99', '\\$2.75 per kg']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['9.99 \\div 4 = 2.4975', '21.99 \\div 8 = 2.74875'] },
      ],
      lines: [
        { say: 'In this example, a store sells rice in three sizes: one kilogram for 2.99, four kilograms for 9.99, and eight kilograms for 21.99. Which is the best buy?', show: 't' },
        { say: 'The one-kilogram bag is already a unit price: two dollars 99 per kilogram.', focus: 't.0' },
        { say: 'The four-kilogram bag: 9.99 divided by four is 2.4975, about two dollars fifty per kilogram.', show: 'm.0', focus: ['t.1', 'm.0'] },
        { say: 'The eight-kilogram bag: 21.99 divided by eight is 2.74875, about two dollars 75 per kilogram.', show: 'm.1', focus: ['t.2', 'm.1'] },
        { say: 'So the four-kilogram bag is the best buy. The biggest bag is not the cheapest per kilogram.', focus: 't.1' },
      ],
    },
    {
      chapter: 'A quick check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A quick check', md: 'If one size is exactly **double** another, compare the big price with **two** small ones.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 5.50 = 11.00 > 9.00'] },
      ],
      lines: [
        { say: 'Here is a quick check. If one size is exactly double another, compare the big price with two of the small ones.', show: 'tip' },
        { say: 'In this example, a two-litre jug costs five dollars fifty, and a four-litre jug costs nine dollars. Two small jugs cost two times 5.50: eleven dollars. That is more than nine, so the four-litre jug is the better buy.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Bigger is always cheaper?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bigger is always cheaper', md: 'Stores know shoppers think this. A middle size or a sale item can be cheaper per unit. **Always check** the unit prices.' }],
      lines: [
        { say: 'A common mistake is to assume bigger is always cheaper. Stores know that shoppers think this. A middle size, or an item on sale, can be cheaper per unit. Always check the unit prices.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Laundry soap costs \\$7.50 for $2$ L or \\$17.50 for $5$ L. Which is the best buy?',
          choices: ['the $5$ L jug, at \\$3.50 per litre', 'the $2$ L jug, at \\$3.75 per litre', 'They cost the same per litre.', 'the $5$ L jug, at \\$17.50 per litre'],
          answer: 0,
          working: '$7.50 \\div 2 = 3.75$ and $17.50 \\div 5 = 3.50$, so the $5$ L jug costs less per litre.',
        },
      ],
      lines: [
        { say: 'Your turn. Laundry soap costs seven dollars fifty for two litres, or seventeen dollars fifty for five litres. Which is the best buy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 7.50 divided by two is 3.75 per litre, and 17.50 divided by five is 3.50 per litre. The five-litre jug costs less per litre.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find each unit price in the same unit.', 'The lowest unit price is the best buy.', 'Bigger is not always cheaper.'] }],
      lines: [
        { say: 'Let’s sum up. Find the unit price of each size, in the same unit.', show: 'sum.0' },
        { say: 'The lowest unit price is the best buy, if you need that much.', show: 'sum.1' },
        { say: 'And bigger is not always cheaper, so always check. In part four, we look at deals, coupons and common sense. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
