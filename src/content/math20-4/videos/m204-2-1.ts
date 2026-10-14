import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-1',
  lessonId: 'm204-2-1',
  title: 'Unit Price and the Best Buy, Part 1: What Is a Unit Price?',
  thumbnailTitle: 'Unit Price',
  thumbnail: 't',
  summary: 'What a unit price is, the price of one granola bar from a box of 8 (4.00 dollars ÷ 8 = 0.50 dollars), shelf tags, why the money goes first, and comparing two box sizes by their unit prices.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.1 · Part 1', title: 'What Is a Unit Price?', subtitle: 'The cost of one' }],
      lines: [
        { say: 'Stores sell the same food in many sizes, and the biggest box is not always the best deal. The unit price tells you which size really costs less.', show: 'title' },
        { say: 'In this video, you will find a unit price, the cost of one unit.' },
      ],
    },
    {
      chapter: 'Unit price',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit price', md: 'The cost of **one** unit, such as one item, one kilogram or one litre.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{unit price} = \\text{price} \\div \\text{number of units}'] },
      ],
      lines: [
        { say: 'When you buy a pack of something, you pay for many units at once. The unit price is the cost of just one unit, such as one item, one kilogram, or one litre.', show: 'def' },
        { say: 'To find it, divide the price by the number of units.', show: 'f', focus: 'f.0' },
      ],
    },
    {
      chapter: 'Price for one item',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Item', 'Price', 'Unit price'], rows: [['Granola bars, box of 8', '\\$4.00', '\\$0.50 per bar']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['4.00 \\div 8 = 0.50'] },
      ],
      lines: [
        { say: 'A box of eight granola bars costs four dollars. What is the price for one bar?', show: ['t'] },
        { say: 'Divide the price by the number of bars: four dollars divided by eight is fifty cents.', show: 'm.0', focus: 'm.0' },
        { say: 'So the unit price is fifty cents per bar. Many stores print the unit price in small type on the shelf tag, like this, so you can compare without a calculator.', focus: 't.0' },
      ],
    },
    {
      chapter: 'Money goes first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: '$8 \\div 4.00 = 2$ tells you how many bars you get for one dollar. It is not the price. For a unit price, the **money goes first**: price $\\div$ amount.' }],
      lines: [
        { say: 'A common mistake is to divide the wrong way. Eight divided by four dollars is two, which tells you how many bars you get for one dollar. It is not the price.', show: 'oops' },
        { say: 'For a unit price, the money goes first: price divided by amount.' },
      ],
    },
    {
      chapter: 'Comparing two boxes',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Box', 'Price', 'Unit price'], rows: [['$8$ bars', '\\$4.00', '\\$0.50 per bar'], ['$12$ bars', '\\$5.40', '\\$0.45 per bar']] },
      ],
      lines: [
        { say: 'Unit prices let you compare sizes. In this example, the same granola bars also come in a box of twelve for five dollars forty.', show: 't', focus: 't.1' },
        { say: 'Five dollars forty divided by twelve is 45 cents per bar. That is five cents less than the box of eight, so here the bigger box costs less per bar.' },
        { say: 'But that is not always true. In part three, you will see a bigger size that costs more per unit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pack of $12$ pencils costs \\$3.60. What is the unit price?',
          choices: ['\\$0.30 per pencil', '\\$3.33 per pencil', '\\$43.20 per pencil', '\\$0.36 per pencil'],
          answer: 0,
          working: 'Money first: $3.60 \\div 12 = 0.30$. B divides the wrong way, and C multiplies.',
        },
      ],
      lines: [
        { say: 'Your turn. A pack of twelve pencils costs three dollars sixty. What is the unit price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Money first: 3.60 divided by twelve is thirty cents per pencil. B divides the wrong way, and C multiplies.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unit price = price ÷ number of units.', 'The money goes first.', 'Unit prices let you compare sizes.'] }],
      lines: [
        { say: 'Let’s sum up. The unit price is the price divided by the number of units.', show: 'sum.0' },
        { say: 'The money always goes first.', show: 'sum.1' },
        { say: 'And unit prices let you compare different sizes fairly. In part two, we find unit prices per 100 grams, per kilogram, and per 100 millilitres. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
