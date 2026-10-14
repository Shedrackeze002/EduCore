import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-1-b',
  lessonId: 'm204-2-1',
  title: 'Unit Price and the Best Buy, Part 2: Different Sizes and Units',
  thumbnailTitle: 'Unit Prices in Different Units',
  thumbnail: 't',
  summary: 'Unit prices per 100 g (a 750 g box of cereal for 5.49 dollars is about 0.73 dollars per 100 g), rounding to the nearest cent, changing grams to kilograms (ground beef at 12.98 dollars per kilogram), and litres to groups of 100 mL.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.1 · Part 2', title: 'Different Sizes and Units', subtitle: 'Per 100 g, per kilogram, per 100 mL' }],
      lines: [
        { say: 'Shelf tags often give a price per 100 grams, per kilogram, or per 100 millilitres. The box itself might be measured in a different unit.', show: 'title' },
        { say: 'In this video, you will find unit prices when the size and the unit price use different units.' },
      ],
    },
    {
      chapter: 'Price per 100 g',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A $750$ g box of cereal costs \\$5.49.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['750 \\div 100 = 7.5 \\text{ groups of } 100 \\text{ g}', '5.49 \\div 7.5 = 0.732', '\\approx \\$0.73 \\text{ per } 100 \\text{ g}'] },
      ],
      lines: [
        { say: 'Small things, like cereal or shampoo, are often priced per 100 grams or per 100 millilitres. A 750-gram box of cereal costs five dollars 49. Find the unit price per 100 grams.', show: 'q' },
        { say: 'First, count the groups of 100 grams: 750 divided by 100 is 7.5 groups.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide the price by that number: 5.49 divided by 7.5 is 0.732.', show: 'm.1', focus: 'm.1' },
        { say: 'Rounded to the nearest cent, that is about 73 cents per 100 grams.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rounding to the nearest cent',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Rounding to the nearest cent', md: 'Look at the **third** digit after the decimal point. In $0.732$ it is $2$, so round down to $0.73$. If it is $5$ or more, round up.' }],
      lines: [
        { say: 'To round to the nearest cent, look at the third digit after the decimal point. In 0.732, it is two, so round down to 0.73. If it is five or more, round up.', show: 'tip' },
      ],
    },
    {
      chapter: 'Grams to kilograms',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Big unit', '$1$ kg', '$1$ L'], rows: [['Small unit', '$1000$ g', '$1000$ mL']] },
        { kind: 'text', id: 'q', md: 'A $500$ g pack of ground beef costs \\$6.49. Price per kilogram?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['500 \\text{ g} \\div 1000 = 0.5 \\text{ kg}', '6.49 \\div 0.5 = 12.98'] },
      ],
      lines: [
        { say: 'Sometimes the size and the unit price use different units, so change the size first. One kilogram is 1,000 grams, and one litre is 1,000 millilitres.', show: 't' },
        { say: 'A 500-gram pack of ground beef costs six dollars 49. What is the price per kilogram?', show: 'q' },
        { say: 'Change to kilograms: 500 grams divided by 1,000 is half a kilogram.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide the price by 0.5: 6.49 divided by 0.5 is twelve dollars 98 per kilogram. Dividing by a half doubles the price, which makes sense: a kilogram is two of these packs.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Litres to groups of 100 mL',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A $2$ L jug of apple juice costs \\$3.79. Price per $100$ mL?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\text{ L} = 2000 \\text{ mL} = 20 \\text{ groups of } 100 \\text{ mL}', '3.79 \\div 20 = 0.1895 \\approx \\$0.19'] },
      ],
      lines: [
        { say: 'A two-litre jug of apple juice costs three dollars 79. Find the unit price per 100 millilitres.', show: 'q' },
        { say: 'Change to millilitres: two litres is 2,000 millilitres, which is twenty groups of 100 millilitres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide: 3.79 divided by twenty is 0.1895, about nineteen cents per 100 millilitres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $400$ g jar of peanut butter costs \\$3.20. What is the price per $100$ g?',
          choices: ['\\$0.80', '\\$0.008', '\\$1.25', '\\$12.80'],
          answer: 0,
          working: '$400 \\div 100 = 4$ groups, and $3.20 \\div 4 = 0.80$. B divides by $400$ instead of $4$, and C divides the wrong way.',
        },
      ],
      lines: [
        { say: 'Your turn. A 400-gram jar of peanut butter costs three dollars twenty. What is the price per 100 grams? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 400 grams is four groups of 100 grams, and 3.20 divided by four is eighty cents. B divides by 400 instead of four, and C divides the wrong way.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Per 100 g: divide the price by the number of groups of 100.', '1 kg = 1000 g and 1 L = 1000 mL.', 'Change units first, then divide.'] }],
      lines: [
        { say: 'Let’s sum up. For a price per 100 grams, divide the price by the number of groups of 100 grams.', show: 'sum.0' },
        { say: 'One kilogram is 1,000 grams, and one litre is 1,000 millilitres.', show: 'sum.1' },
        { say: 'And if the units do not match, change them first, then divide. In part three, we find the best buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
