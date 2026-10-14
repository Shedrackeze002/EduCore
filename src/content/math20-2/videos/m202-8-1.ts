import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-8-1',
  lessonId: 'm202-8-1',
  title: 'Comparing and Interpreting Rates, Part 1: Unit Rates and Better Buys',
  thumbnailTitle: 'Unit Rates',
  thumbnail: 'm',
  summary: 'Rates and unit rates, the unit price of a 750 g bag of coffee per 100 g, comparing a 400 g bag with a 1 kg bag to find the better buy, and why the lowest unit price is not always the best choice.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.1 · Part 1', title: 'Unit Rates', subtitle: 'Comparing on the same base' }],
      lines: [
        { say: 'Is the big bag of coffee really the better deal? Which family vehicle is cheaper to drive? Each question compares rates.', show: 'title' },
        { say: 'The fairest way to compare rates is to bring them to the same base. In this video, you will find unit rates, and use them to choose the better buy.' },
      ],
    },
    {
      chapter: 'Rates and unit rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate', md: 'A **rate** compares two quantities measured in different units, such as $90$ km in $1.5$ h, or \\$17.49 for $750$ g.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Unit rate', md: 'A **unit rate** has a second quantity of one unit, such as $60$ km/h or \\$18.50 per hour. For prices and fuel, a handy base is often used instead: per $100$ g, or litres per $100$ km.' },
      ],
      lines: [
        { say: 'A rate compares two quantities measured in different units, such as ninety kilometres in 1.5 hours, or seventeen dollars forty-nine for 750 grams.', show: 'def' },
        { say: 'A unit rate has a second quantity of one unit, such as sixty kilometres per hour, or eighteen dollars fifty per hour.', show: 'def2' },
        { say: 'For prices and fuel, we often use a handier base instead of one unit: the price per 100 grams, or litres per 100 kilometres.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['750\\text{ g} = 7.5 \\times 100\\text{ g}', '\\$17.49 \\div 7.5 = \\$2.332', '\\approx \\$2.33 \\text{ per } 100\\text{ g}'] }],
      lines: [
        { say: 'A 750 gram bag of coffee beans costs seventeen dollars forty-nine. What is the unit price per 100 grams? To find a unit rate, divide by the number of base units.', show: 'm.0', focus: 'm.0' },
        { say: '750 grams is 7.5 portions of 100 grams. So divide seventeen forty-nine by 7.5, which is 2.332.', show: 'm.1', focus: 'm.1' },
        { say: 'Round to the nearest cent: the unit price is about two dollars thirty-three per 100 grams.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The better buy',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Size', 'Price', 'Price per 100 g'], rows: [['$400$ g', '\\$7.89', '\\$7.89 ÷ 4 ≈ \\$1.97'], ['$1$ kg', '\\$17.49', '\\$17.49 ÷ 10 ≈ \\$1.75']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A good decision uses more than one number', md: 'The lowest unit price is the best value only if you need that much. A real decision also weighs storage, waste, and how much money you have today.' },
      ],
      lines: [
        { say: 'A store sells coffee in two sizes: 400 grams for seven dollars eighty-nine, and one kilogram for seventeen dollars forty-nine. Which is the better buy? Bring both to the same base, 100 grams.', show: 't' },
        { say: '400 grams is four portions, so seven eighty-nine divided by four is about one dollar ninety-seven per 100 grams.', focus: 't.0' },
        { say: 'One kilogram is 1,000 grams, or ten portions. Seventeen forty-nine divided by ten is about one dollar seventy-five per 100 grams. The one kilogram bag has the lower unit price.', focus: 't.1' },
        { say: 'But it is the better buy only if you will use it all before it goes stale. A real decision also weighs storage, waste, and how much money you have today.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Juice costs \\$3.29 for $1.89$ L or \\$1.99 for $1$ L. Which has the lower price per litre?',
          choices: ['The $1.89$ L carton, at about \\$1.74 per litre', 'The $1$ L carton, at \\$1.99 per litre', 'They cost the same per litre.', 'The $1.89$ L carton, at about \\$6.22 per litre'],
          answer: 0,
          working: '\\$3.29 ÷ 1.89 ≈ \\$1.74 per litre, which is less than \\$1.99 per litre. D multiplies instead of dividing.',
        },
      ],
      lines: [
        { say: 'Your turn. Juice costs three dollars twenty-nine for 1.89 litres, or one dollar ninety-nine for one litre. Which has the lower price per litre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three twenty-nine divided by 1.89 is about one dollar seventy-four per litre, which is less than one ninety-nine. D multiplies instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A rate compares quantities in different units.', 'A unit rate uses one unit, or a handy base such as $100$ g.', 'Compare options with the same base, then weigh the whole situation.'] }],
      lines: [
        { say: 'Let’s sum up. A rate compares quantities measured in different units.', show: 'sum.0' },
        { say: 'A unit rate uses a base of one unit, or a handy base such as 100 grams.', show: 'sum.1' },
        { say: 'And compare options with the same base, then weigh the whole situation. In part two, we compare fuel use, and read rates from graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
