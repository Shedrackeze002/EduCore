import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-2-b',
  lessonId: 'm103-1-2',
  title: 'Unit Price and Best Buys, Part 2: The Best Buy',
  thumbnailTitle: 'Finding the Best Buy',
  summary: 'Comparing unit prices in the same unit to find the best buy, a quick doubling check, working out deals such as buy 2 get 1 free, and why the lowest unit price is not always the best choice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.2 · Part 2', title: 'The Best Buy', subtitle: 'Compare unit prices' }],
      lines: [
        { say: 'Is the biggest package always the cheapest? Stores know that shoppers think so.', show: 'title' },
        { say: 'In this video, you will compare unit prices to find the best buy, and work out what deals really cost.' },
      ],
    },
    {
      chapter: 'Three sizes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Size', 'Price', 'Per 100 grams'],
          rows: [
            ['175 g', '\\$1.29', '$1.29 \\div 1.75 \\approx 0.737$'],
            ['650 g', '\\$3.99', '$3.99 \\div 6.5 \\approx 0.614$'],
            ['1500 g', '\\$9.79', '$9.79 \\div 15 \\approx 0.653$'],
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Best buy', md: 'The choice with the **lowest** unit price, as long as you need that amount and will use it.' },
      ],
      lines: [
        { say: 'To compare sizes fairly, find every unit price in the same unit. A store sells yogurt in three sizes. Which is the best buy?', show: 't' },
        { say: 'The 175-gram cup: a dollar twenty-nine divided by 1.75 groups is about 73.7 cents per hundred grams.', focus: 't.0' },
        { say: 'The 650-gram tub: three ninety-nine divided by 6.5 is about 61.4 cents.', focus: 't.1' },
        { say: 'And the 1,500-gram tub: nine seventy-nine divided by fifteen is about 65.3 cents.', focus: 't.2' },
        { say: 'The lowest unit price is the best buy, so the 650-gram tub wins. The biggest size is not always the cheapest per unit.', show: 'def', focus: 't.1' },
      ],
    },
    {
      chapter: 'A quick check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2 \\times \\$4.99 = \\$9.98 \\text{ for } 8 \\text{ batteries}', '\\$8.49 \\text{ for an 8-pack} \\;\\to\\; \\text{better deal}'] },
      ],
      lines: [
        { say: 'If one size is exactly double another, you can check without a calculator. Two four-packs of batteries at four ninety-nine each cost nine ninety-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'An eight-pack costs eight forty-nine, so the eight-pack is the better deal.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Deals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Washer fluid: a $1\\text{ L}$ jug costs \\$2.49 with "buy 2, get 1 free". A $4\\text{ L}$ jug costs \\$6.99. Which is the better buy?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\$4.98 \\text{ for } 3\\text{ L} \\;\\to\\; \\$4.98 \\div 3 = \\$1.66 \\text{ per L}', '\\$6.99 \\div 4 \\approx \\$1.75 \\text{ per L}'] },
      ],
      lines: [
        { say: 'Deals change the real price. A one-litre jug of washer fluid costs two forty-nine, with a buy two, get one free deal. A four-litre jug costs six ninety-nine. Which is the better buy?', show: 'q' },
        { say: 'With the deal, you pay for two jugs and get three: four ninety-eight for three litres, which is a dollar sixty-six per litre.', show: 'm.0', focus: 'm.0' },
        { say: 'The big jug is six ninety-nine for four litres: about a dollar seventy-five per litre. So the deal is the better buy.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Common sense',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Need:** will you use it all before it goes stale?', '**Waste:** fresh food can spoil before you finish it.', '**Quality and storage:** a cheaper brand may not work as well, and bulk packs need space.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bigger is always cheaper', md: 'Medium sizes and sale items are sometimes cheaper per unit, so always check.' },
      ],
      lines: [
        { say: 'The lowest unit price is not always the best choice. A big package is only a good deal if you use it all. Will you use ten kilograms of flour before it goes stale?', show: 'b.0' },
        { say: 'Fresh food can spoil before you finish it. And a cheaper brand may not work as well, and you need room to store a bulk pack.', show: ['b.1', 'b.2'] },
        { say: 'And never assume that bigger is cheaper. Medium sizes and sale items are sometimes cheaper per unit, so always check.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Coffee costs \\$7.49 for $340\\text{ g}$ or \\$19.99 for $925\\text{ g}$. Which is the better buy?',
          choices: ['The $925\\text{ g}$ bag, at about \\$2.16 per $100\\text{ g}$', 'The $340\\text{ g}$ bag, at about \\$2.20 per $100\\text{ g}$', 'The $340\\text{ g}$ bag, because it costs less', 'They cost the same per gram'],
          answer: 0,
          working: '$7.49 \\div 3.4 \\approx 2.20$ and $19.99 \\div 9.25 \\approx 2.16$ dollars per $100\\text{ g}$, so the big bag is slightly cheaper per unit.',
        },
      ],
      lines: [
        { say: 'Your turn. Coffee costs seven forty-nine for 340 grams, or nineteen ninety-nine for 925 grams. Which is the better buy? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Seven forty-nine divided by 3.4 is about two dollars twenty per hundred grams, and nineteen ninety-nine divided by 9.25 is about two dollars sixteen. The big bag is slightly cheaper per unit, if you will use it all.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare unit prices in the same unit: the lowest is the best buy.', 'For deals, find what you really pay and what you really get.', 'Think about need, waste and quality too.'] }],
      lines: [
        { say: 'Let’s sum up. Compare unit prices in the same unit, and the lowest is the best buy.', show: 'sum.0' },
        { say: 'For deals and coupons, work out what you really pay, and what you really get.', show: 'sum.1' },
        { say: 'And think about need, waste and quality too. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
