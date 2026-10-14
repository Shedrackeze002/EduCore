import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-2',
  lessonId: 'm103-1-2',
  title: 'Unit Price and Best Buys, Part 1: Finding a Unit Price',
  thumbnailTitle: 'Unit Price',
  summary: 'The unit price as price divided by the number of units: per item, per 100 g, and per kilogram after converting units, with the money always first. Part 2 finds the best buy and works with deals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.2 · Part 1', title: 'Finding a Unit Price', subtitle: 'The cost of one unit' }],
      lines: [
        { say: 'The same product often comes in several sizes. The price on the shelf does not tell you which size is the best deal. The unit price does.', show: 'title' },
        { say: 'In this video, you will find unit prices, including when the units do not match. In part two, you will use them to find the best buy.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit price', md: 'The cost for one unit: one item, one kilogram, one litre, or a group like $100\\text{ g}$.' },
        { kind: 'math', id: 'm', lines: ['\\text{unit price} = \\text{price} \\div \\text{number of units}', '\\$38 \\div 8 = \\$4.75 \\text{ per spark plug}'] },
      ],
      lines: [
        { say: 'A unit price is a unit rate for money: the cost of one unit of the product. Stores often print it in small type on the shelf tag.', show: 'def' },
        { say: 'The unit price is the price, divided by the number of units.', show: 'm.0', focus: 'm.0' },
        { say: 'A pack of eight spark plugs costs 38 dollars. 38 divided by eight is 4.75, so each spark plug costs four dollars seventy-five.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Per 100 grams',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A $750\\text{ g}$ box of cereal costs \\$5.49. Find the unit price per $100\\text{ g}$.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['750 \\div 100 = 7.5 \\text{ groups of } 100\\text{ g}', '\\$5.49 \\div 7.5 \\approx \\$0.73 \\text{ per } 100\\text{ g}'] },
      ],
      lines: [
        { say: 'Small items like cereal or coffee are usually priced per hundred grams, or per hundred millilitres. A 750-gram box of cereal costs five dollars forty-nine. Find the unit price per hundred grams.', show: 'q' },
        { say: 'Count the groups of a hundred grams in the box: 750 divided by a hundred is 7.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide the price by 7.5: about 73 cents per hundred grams.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'When units do not match',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['1\\text{ kg} = 1000\\text{ g}, \\qquad 1\\text{ L} = 1000\\text{ mL}', '2.5\\text{ kg} = 2500\\text{ g} = 25 \\text{ groups of } 100\\text{ g}', '\\$8.99 \\div 25 \\approx \\$0.36 \\text{ per } 100\\text{ g}', '680\\text{ g} = 0.68\\text{ kg}, \\quad \\$8.79 \\div 0.68 \\approx \\$12.93 \\text{ per kg}'] },
      ],
      lines: [
        { say: 'Sometimes the package and the unit price use different units. Convert first: a kilogram is 1,000 grams, and a litre is 1,000 millilitres.', show: 'm.0', focus: 'm.0' },
        { say: 'A 2.5-kilogram bag of rice costs eight dollars ninety-nine. 2.5 kilograms is 2,500 grams, which is 25 groups of a hundred grams.', show: 'm.1', focus: 'm.1' },
        { say: 'So the unit price is eight ninety-nine divided by 25: about 36 cents per hundred grams.', show: 'm.2', focus: 'm.2' },
        { say: 'And a 680-gram package of ground beef costs eight dollars seventy-nine. 680 grams is 0.68 kilograms, so the price per kilogram is eight seventy-nine divided by 0.68: about twelve dollars ninety-three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Money first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\$8.79 \\div 0.68\\text{ kg} \\approx \\$12.93 \\text{ per kg} \\quad \\good{\\checkmark}', '680\\text{ g} \\div \\$8.79 \\approx 77 \\text{ g per dollar} \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'For a unit price, the money goes first: price $\\div$ amount.' },
      ],
      lines: [
        { say: 'Divide in the right order. For a unit price, the money goes first: the price, divided by the amount.', show: 'm.0', focus: 'm.0' },
        { say: '680 divided by eight seventy-nine gives about 77 grams per dollar. That is a rate too, but it is not a unit price.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $1.5\\text{ L}$ bottle of dish soap costs \\$6.30. What is the unit price per $100\\text{ mL}$?',
          choices: ['\\$0.42', '\\$4.20', '\\$0.24', '\\$2.38'],
          answer: 0,
          working: '$1.5\\text{ L} = 1500\\text{ mL}$, which is $15$ groups of $100\\text{ mL}$. Then $6.30 \\div 15 = 0.42$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A 1.5-litre bottle of dish soap costs six dollars thirty. What is the unit price per hundred millilitres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1.5 litres is 1,500 millilitres, which is fifteen groups of a hundred millilitres. Six thirty divided by fifteen is 42 cents. B is the price per litre.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price = price ÷ number of units. Money first.', 'For small items, divide by the groups of $100\\text{ g}$ or $100\\text{ mL}$.', 'Convert units first when they do not match.'] }],
      lines: [
        { say: 'Let’s sum up. The unit price is the price divided by the number of units, with the money first.', show: 'sum.0' },
        { say: 'For small items, divide by the number of groups of a hundred grams, or a hundred millilitres.', show: 'sum.1' },
        { say: 'And convert units first when the size and the unit price do not match. In part two, we find the best buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
