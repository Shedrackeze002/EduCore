import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-3-2-b',
  lessonId: 'm103-3-2',
  title: 'Imperial Units, Part 2: Mass and Capacity',
  thumbnailTitle: 'Pounds, Cups and Gallons',
  summary: 'Ounces, pounds and short tons, the US capacity chain from gallons to fluid ounces, and why an imperial gallon is bigger than a US gallon.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.2 · Part 2', title: 'Imperial Mass and Capacity', subtitle: 'Pounds, cups and two kinds of gallon' }],
      lines: [
        { say: 'Recipes from the United States use cups and gallons, and a turkey is sold by the pound.', show: 'title' },
        { say: 'In this video, you will convert imperial mass and capacity, and meet two different gallons.' },
      ],
    },
    {
      chapter: 'Mass',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['16\\text{ oz} = 1\\text{ lb}, \\qquad 2000\\text{ lb} = 1\\text{ ton}', '7\\text{ lb } 5\\text{ oz} = 7 \\times 16 + 5 = 117\\text{ oz}'] },
      ],
      lines: [
        { say: 'In everyday speech we say weight, but these units measure mass. Sixteen ounces make a pound, and 2,000 pounds make a ton: the short ton used in North America.', show: 'm.0', focus: 'm.0' },
        { say: 'A turkey weighs seven pounds five ounces. Seven pounds is seven times sixteen, 112 ounces, plus five is 117 ounces.', show: 'm.1', focus: 'm.1' },
        { say: 'To go the other way, divide by sixteen. Forty ounces divided by sixteen is two, remainder eight: two pounds eight ounces. And a short ton is not the same as a metric tonne, which is 1,000 kilograms.' },
      ],
    },
    {
      chapter: 'US capacity',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\text{ gal} = 4\\text{ qt}, \\quad 1\\text{ qt} = 2\\text{ pt}', '1\\text{ pt} = 2\\text{ cups}, \\quad 1\\text{ cup} = 8\\text{ fl oz}', '1\\text{ gal} = 4 \\times 2 \\times 2 = 16 \\text{ cups} = 128\\text{ fl oz}', '3\\text{ gal} = 3 \\times 16 = 48 \\text{ cups}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Build the chain', md: 'If you forget how many cups are in a gallon, multiply along the chain: $4 \\times 2 \\times 2 = 16$.' },
      ],
      lines: [
        { say: 'Recipes and products from the United States use US units. A gallon is four quarts, a quart is two pints, a pint is two cups, and a cup is eight fluid ounces.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Multiply along the chain: a gallon is four times two times two, sixteen cups, or 128 fluid ounces.', show: ['m.2', 'tip'], focus: 'm.2' },
        { say: 'So three US gallons of milk is three times sixteen: 48 cups.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two gallons',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Gallon', 'Litres', 'Fluid ounces'],
          rows: [
            ['US gallon', 'about 3.785 L', '128 US fl oz'],
            ['imperial gallon', 'about 4.546 L', '160 imperial fl oz'],
          ],
        },
        { kind: 'math', id: 'm', lines: ['12 \\times 4.546 = 54.552\\text{ L}', '54.552 \\div 3.785 \\approx 14.4 \\text{ US gal}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A gallon is not just a gallon', md: 'Always check **which** gallon a recipe, manual or label uses.' },
      ],
      lines: [
        { say: 'Here is a trap. The United States and Britain both use the word gallon, but they are different sizes. A US gallon is about 3.785 litres, and an imperial, or British, gallon is about 4.546 litres.', show: 't' },
        { say: 'A British-made boat has a twelve-gallon imperial fuel tank. In litres, that is twelve times 4.546: about 54.6 litres.', show: 'm.0', focus: 'm.0' },
        { say: 'In US gallons, divide by 3.785: about 14.4. Filling it with twelve US gallons would leave you about 2.4 gallons short. Always check which gallon is meant.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A recipe needs $5$ US quarts of stock. How many cups is that?',
          choices: ['20 cups', '10 cups', '40 cups', '80 cups'],
          answer: 0,
          working: '$1\\text{ qt} = 2\\text{ pt} = 4$ cups, so $5\\text{ qt} = 5 \\times 4 = 20$ cups.',
        },
      ],
      lines: [
        { say: 'Your turn. A recipe needs five US quarts of stock. How many cups is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A quart is two pints, and a pint is two cups, so a quart is four cups. Five quarts is twenty cups. B stops at pints.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['16 oz = 1 lb; 2000 lb = 1 (short) ton.', 'US: 1 gal = 4 qt = 8 pt = 16 cups = 128 fl oz.', 'An imperial gallon (about 4.546 L) is bigger than a US gallon (about 3.785 L).'] }],
      lines: [
        { say: 'Let’s sum up. Sixteen ounces make a pound, and 2,000 pounds make a short ton.', show: 'sum.0' },
        { say: 'A US gallon is four quarts, eight pints, sixteen cups, or 128 fluid ounces.', show: 'sum.1' },
        { say: 'And an imperial gallon is bigger than a US gallon, so always check which one is meant. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
