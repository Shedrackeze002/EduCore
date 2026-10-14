import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-5-4-b',
  lessonId: 'm103-5-4',
  title: 'Area Units and Material Costs, Part 2: How Much to Buy',
  thumbnailTitle: 'Buying Flooring',
  summary: 'Coverage per box and rounding up to whole boxes, pricing by the square unit, and adding a waste allowance before rounding, then 5% GST, to find the total cost.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.4 · Part 2', title: 'How Much to Buy', subtitle: 'Coverage, waste and tax' }],
      lines: [
        { say: 'Flooring is not sold in partial boxes, and installers always waste a little at the edges. How many boxes should you order?', show: 'title' },
        { say: 'In this video, you will work out how much to buy, and what the job costs.' },
      ],
    },
    {
      chapter: 'Coverage',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coverage', md: 'The area one box, can or roll covers, as printed on the package.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['14 \\times 12 = 168\\text{ ft}^2', '168 \\div 22.5 \\approx 7.47 \\;\\to\\; 8 \\text{ boxes}', '8 \\times \\$54.99 = \\$439.92'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding down', md: 'Seven boxes leaves part of the floor bare. Even $7.1$ boxes means you must buy $8$.' },
      ],
      lines: [
        { say: 'The coverage of a product is the area one box, can or roll will cover. Divide the area by the coverage, and since stores do not sell part of a box, always round up.', show: 'def' },
        { say: 'A bedroom is fourteen feet by twelve: 168 square feet. Each box of laminate covers 22.5 square feet.', show: 'm.0', focus: 'm.0' },
        { say: '168 divided by 22.5 is about 7.47, so round up to eight boxes.', show: 'm.1', focus: 'm.1' },
        { say: 'At 54 dollars 99 a box, eight boxes cost 439 dollars 92 before tax. Rounding down to seven boxes would leave part of the floor bare.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Price per square unit',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['12 \\times 9 = 108\\text{ m}^2', '108 \\times \\$4.29 = \\$463.32'] },
      ],
      lines: [
        { say: 'When a price is given per square unit, multiply the area by the price. Sod costs four dollars 29 per square metre, for a yard twelve metres by nine.', show: 'm.0', focus: 'm.0' },
        { say: 'The yard is 108 square metres, so the sod costs 108 times 4.29: 463 dollars 32.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Waste and GST',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['168 \\times 1.10 = 184.8\\text{ ft}^2', '184.8 \\div 22.5 \\approx 8.21 \\;\\to\\; 9 \\text{ boxes}', '9 \\times \\$54.99 = \\$494.91', '\\$494.91 \\times 1.05 \\approx \\$519.66'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Multipliers save steps', md: 'Adding 10% is $\\times 1.10$, and adding 5% GST is $\\times 1.05$. Round money only at the very end.' },
      ],
      lines: [
        { say: 'Installers cut pieces to fit walls and corners, and the offcuts are wasted. So they order extra, often ten to fifteen percent more. For the same bedroom, add ten percent: 168 times 1.10 is 184.8 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the coverage: about 8.21 boxes. Round up to nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Nine boxes cost 494 dollars 91 before tax. Then add five percent G S T: times 1.05 is 519 dollars 66.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'Adding ten percent is multiplying by 1.10, and adding five percent G S T is multiplying by 1.05. Round money only at the very end.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A floor is $200\\text{ ft}^2$. Add 10% for waste. Each box of tile covers $15\\text{ ft}^2$. How many boxes are needed?',
          choices: ['15 boxes', '14 boxes', '14.67 boxes', '13 boxes'],
          answer: 0,
          working: '$200 \\times 1.10 = 220\\text{ ft}^2$, and $220 \\div 15 \\approx 14.67$. Round up: $15$ boxes.',
        },
      ],
      lines: [
        { say: 'Your turn. A floor is 200 square feet. Add ten percent for waste. Each box of tile covers fifteen square feet. How many boxes are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 200 times 1.10 is 220 square feet, and 220 divided by fifteen is about 14.67. Round up: fifteen boxes. D forgets the waste.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Number to buy = area ÷ coverage, rounded up.', 'Price per square unit: area × price.', 'Add waste first, round up, find the cost, then add GST.'] }],
      lines: [
        { say: 'Let’s sum up. The number to buy is the area divided by the coverage, always rounded up.', show: 'sum.0' },
        { say: 'When the price is per square unit, multiply the area by the price.', show: 'sum.1' },
        { say: 'And add the waste first, round up the boxes, find the cost, then add G S T. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
