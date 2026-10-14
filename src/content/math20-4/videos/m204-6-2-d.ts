import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-2-d',
  lessonId: 'm204-6-2',
  title: 'SI and Imperial, Part 4: Filling a Gas Tank',
  thumbnailTitle: 'Filling a Gas Tank',
  thumbnail: 'm',
  summary: 'A two-step conversion with money: a 20 US gallon tank as 75.8 litres, the cost to fill it at a price per litre given in the question (113.70 dollars), and why rounding the litres too early changes the cost.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.2 · Part 4', title: 'Filling a Gas Tank', subtitle: 'Gallons, litres and dollars' }],
      lines: [
        { say: 'A truck built for the US market may list its tank size in gallons. But gas in Canada is sold by the litre.', show: 'title' },
        { say: 'In this video, you will convert gallons to litres, then find the cost to fill a tank.' },
      ],
    },
    {
      chapter: 'Gallons to litres',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Jordan’s pickup truck has a $20$-gallon (US) gas tank. In this example, gas costs \\$1.50 per litre. Use $1$ US gallon $\\approx 3.79$ L.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{step 1: } 20 \\times 3.79 = 75.8 \\text{ L}', '\\text{step 2: } 75.8 \\times 1.50 = 113.70'] },
      ],
      lines: [
        { say: 'Jordan’s pickup truck has a twenty-gallon US gas tank. In this example, gas costs one dollar fifty per litre. How much does it cost to fill the empty tank? Use one US gallon is about 3.79 litres.', show: 'q' },
        { say: 'Step one: change gallons to litres. A litre is smaller than a gallon, so multiply: twenty times 3.79 is 75.8 litres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: find the cost. 75.8 litres times one dollar fifty is 113 dollars seventy.', show: 'm.1', focus: 'm.1' },
        { say: 'Estimate to check: a gallon is about four litres, so the tank holds about eighty litres. Eighty times 1.50 is 120 dollars. Close.' },
      ],
    },
    {
      chapter: 'Rounding too early',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding too early', md: 'If you round $75.8$ L to $76$ L before you multiply, the cost comes out as \\$114.00 instead of \\$113.70. Round only at the end.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['76 \\times 1.50 = 114.00', '75.8 \\times 1.50 = 113.70'] },
      ],
      lines: [
        { say: 'A common mistake is to round too early. If you round 75.8 litres to 76 litres before you multiply, the cost comes out as 114 dollars.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Using the full 75.8 litres gives 113 dollars seventy. Thirty cents may seem small, but on a bigger job, early rounding can add up. Round only at the end.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Planning a road trip',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A road trip is $300$ miles. A car uses $8$ L/100 km. Use $1$ mi $\\approx 1.6$ km.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{step 1: } 300 \\times 1.6 = 480 \\text{ km}', '\\text{step 2: } 480 \\div 100 \\times 8 = 38.4 \\text{ L}'] },
      ],
      lines: [
        { say: 'Here is another two-step job. A road trip in the United States is 300 miles. A car uses eight litres per 100 kilometres. How many litres of gas will the trip use?', show: 'q' },
        { say: 'Step one: change miles to kilometres. A kilometre is smaller, so multiply: 300 times 1.6 is 480 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: use the fuel economy from Lesson 4.4. 480 divided by 100 is 4.8, and 4.8 times eight is 38.4 litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car has a $15$-gallon (US) tank. Gas costs \\$1.60 per litre. Use $1$ US gallon $\\approx 3.79$ L. What does it cost to fill the empty tank?',
          choices: ['\\$90.96', '\\$24.00', '\\$91.20', '\\$6.33'],
          answer: 0,
          working: 'Litres: $15 \\times 3.79 = 56.85$ L. Cost: $56.85 \\times 1.60 = 90.96$. B forgets to convert, and C rounds to $57$ L too early.',
        },
      ],
      lines: [
        { say: 'Your turn. A car has a fifteen-gallon US tank. Gas costs one dollar sixty per litre. Use one US gallon is about 3.79 litres. What does it cost to fill the empty tank? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen times 3.79 is 56.85 litres, and 56.85 times 1.60 is 90 dollars 96. B forgets to convert to litres, and C rounds to 57 litres too early.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Convert the units first, then find the cost.', 'Keep every digit until the last step.', 'Estimate to check the total.'] }],
      lines: [
        { say: 'Let’s sum up. Convert the units first, then find the cost.', show: 'sum.0' },
        { say: 'Keep every digit until the last step, and round only at the end.', show: 'sum.1' },
        { say: 'And estimate to check the total. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
