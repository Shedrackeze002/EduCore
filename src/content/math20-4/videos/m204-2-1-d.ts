import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-1-d',
  lessonId: 'm204-2-1',
  title: 'Unit Price and the Best Buy, Part 4: Deals, Coupons and Common Sense',
  thumbnailTitle: 'Deals and Coupons',
  thumbnail: 'm',
  summary: 'Checking a “3 for 12 dollars” deal against a 24-pack (0.50 against about 0.46 dollars a box), how a coupon can make the small bag of coffee the better buy, and why need, waste, quality and space matter as well as the unit price.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.1 · Part 4', title: 'Deals and Coupons', subtitle: 'What you really pay' }],
      lines: [
        { say: '“Three for twelve dollars!” A big sale sign, or a coupon, changes what you really pay. But is it really the best deal?', show: 'title' },
        { say: 'In this video, you will check deals and coupons with unit prices, and think about what else matters.' },
      ],
    },
    {
      chapter: 'Is the deal better?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Juice boxes: $8$-packs at 3 for \\$12, or a $24$-pack for \\$10.99.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{deal: } 3 \\times 8 = 24 \\text{ boxes for } \\$12', '12 \\div 24 = 0.50', '\\text{24-pack: } 10.99 \\div 24 \\approx 0.46'] },
      ],
      lines: [
        { say: 'Juice boxes come in packs of eight. In this example, the eight-pack is on sale: three for twelve dollars. A 24-pack costs ten dollars 99. Which is the better buy?', show: 'q' },
        { say: 'Work out what you pay and what you get. The deal gives three times eight, 24 juice boxes, for twelve dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Twelve divided by 24 is fifty cents per box.', show: 'm.1', focus: 'm.1' },
        { say: 'The 24-pack: 10.99 divided by 24 is about 46 cents per box. So the 24-pack is the better buy. A sale sign does not always mean the lowest price.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using a coupon',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Coffee: $300$ g for \\$6.49, or $900$ g for \\$16.99. Coupon: \\$2.00 off the small bag.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['6.49 - 2.00 = 4.49', '4.49 \\div 3 \\approx 1.50 \\text{ per } 100 \\text{ g}', '16.99 \\div 9 \\approx 1.89 \\text{ per } 100 \\text{ g}'] },
      ],
      lines: [
        { say: 'In this example, a 300-gram bag of coffee costs six dollars 49, and a 900-gram bag costs sixteen dollars 99. Kai has a coupon for two dollars off the small bag.', show: 'q' },
        { say: 'With the coupon, the small bag costs 6.49 minus two: four dollars 49.', show: 'm.0', focus: 'm.0' },
        { say: 'The small bag is three groups of 100 grams, so 4.49 divided by three is about one dollar fifty per 100 grams.', show: 'm.1', focus: 'm.1' },
        { say: 'The big bag is nine groups: 16.99 divided by nine is about one dollar 89 per 100 grams. With the coupon, the small bag is the better buy.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Common sense',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Need:** will you use it all?', '**Waste:** fresh food can spoil before you finish it.', '**Quality and space:** a cheap brand may not work as well, and big packs need room.'] }],
      lines: [
        { say: 'The lowest unit price is not always the best choice. First, need: will you use it all? A huge bag is not a deal if half of it goes in the garbage.', show: 'b.0' },
        { say: 'Waste: fresh food, like bread or fruit, can spoil before you finish it.', show: 'b.1' },
        { say: 'And quality and space: a cheap brand may not work as well, and you need room to store a big pack.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Granola bars: a box of $6$ for \\$3.00, with a coupon for \\$0.60 off, or a box of $10$ for \\$4.50. Which is the better buy per bar?',
          choices: ['the box of $6$ with the coupon, at \\$0.40 per bar', 'the box of $10$, at \\$0.45 per bar', 'the box of $6$, at \\$0.50 per bar', 'They cost the same per bar.'],
          answer: 0,
          working: 'With the coupon: $3.00 - 0.60 = 2.40$, and $2.40 \\div 6 = 0.40$. Box of $10$: $4.50 \\div 10 = 0.45$. C forgets the coupon.',
        },
      ],
      lines: [
        { say: 'Your turn. Granola bars come in a box of six for three dollars, and you have a coupon for sixty cents off it. Or there is a box of ten for four dollars fifty. Which is the better buy per bar? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With the coupon, the box of six costs 2.40, which is forty cents per bar. The box of ten is 45 cents per bar. C forgets the coupon.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Work out what you really pay and what you really get.', 'Then compare unit prices.', 'Think about need, waste, quality and space.'] }],
      lines: [
        { say: 'Let’s sum up. For deals and coupons, work out what you really pay and what you really get.', show: 'sum.0' },
        { say: 'Then compare the unit prices.', show: 'sum.1' },
        { say: 'And think about need, waste, quality and space before you buy. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
