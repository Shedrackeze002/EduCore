import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-4-4-b',
  lessonId: 'm204-4-4',
  title: 'Cars and Homes, Part 2: Fuel Costs',
  thumbnailTitle: 'Fuel Costs',
  thumbnail: 'bg',
  summary: 'Fuel economy in litres per 100 km, the litres used for 1,500 km at 8.2 L/100 km (123 litres, 178.35 dollars at 1.45 dollars a litre), why you divide by 100, and a pickup truck that costs 117.45 dollars more each month.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.4 · Part 2', title: 'Fuel Costs', subtitle: 'Litres per 100 km' }],
      lines: [
        { say: 'Two vehicles can have the same payment, but very different gas bills. The difference is how much fuel each one uses.', show: 'title' },
        { say: 'In this video, you will use fuel economy to find the monthly cost of gas.' },
      ],
    },
    {
      chapter: 'Fuel economy',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Fuel economy', md: '**Fuel economy** tells how much fuel a vehicle uses. In Canada it is given in **litres per 100 km** (L/100 km). A smaller number means the vehicle uses less fuel.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{litres used} = \\text{distance} \\div 100 \\times \\text{L/100 km}'] },
      ],
      lines: [
        { say: 'Fuel economy tells how much fuel a vehicle uses. In Canada, it is given in litres per 100 kilometres. A smaller number means the vehicle uses less fuel.', show: 'def' },
        { say: 'To find the litres used, divide the distance by 100 to find how many hundreds of kilometres you drive. Then multiply by the litres per 100 kilometres.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Gas for one month',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Arjun drives about $1500$ km a month. His car uses $8.2$ L/100 km, and gas costs \\$1.45 per litre.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1500 \\div 100 \\times 8.2 = 15 \\times 8.2 = 123 \\text{ L}', '123 \\times 1.45 = 178.35'] },
      ],
      lines: [
        { say: 'Arjun drives about fifteen hundred kilometres a month. His car uses 8.2 litres per 100 kilometres, and in this example, gas costs one dollar 45 per litre. What does his gas cost each month?', show: 'q' },
        { say: 'Fifteen hundred kilometres is fifteen hundreds. Fifteen times 8.2 is 123 litres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the cost: 123 times 1.45 is 178 dollars 35 a month.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to forget to divide by 100. Fifteen hundred times 8.2 is 12,300 litres, which is far too much. The rate is per 100 kilometres.' },
      ],
    },
    {
      chapter: 'A car or a pickup truck?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('bg', [barGraph({ categories: ['Car', 'Truck'], values: [178.35, 295.8], max: 300, step: 50, height: 4, titles: { y: 'Gas per month (\\$)' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['15 \\times 13.6 = 204 \\text{ L}', '204 \\times 1.45 = 295.80', '295.80 - 178.35 = 117.45', '117.45 \\times 12 = 1{,}409.40'] }],
      lines: [
        { say: 'Arjun also looks at a pickup truck that uses 13.6 litres per 100 kilometres. Fifteen times 13.6 is 204 litres a month.', show: ['bg.scale', 'bg.b0', 'm.0'], focus: 'm.0' },
        { say: '204 times 1.45 is 295 dollars eighty.', show: ['bg.b1', 'm.1'], focus: ['bg.b1', 'm.1'] },
        { say: 'The difference is 295.80 minus 178.35: the truck costs 117 dollars 45 more each month.', show: 'm.2', focus: 'm.2' },
        { say: 'Over a year, that is twelve times as much: 1,409 dollars 40 more, just for gas.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A car uses $7.5$ L/100 km and drives $1200$ km a month. Gas costs \\$1.60 per litre. What is the monthly gas cost?',
          choices: ['\\$144.00', '\\$14,400.00', '\\$90.00', '\\$12.00'],
          answer: 0,
          working: 'Litres: $1200 \\div 100 \\times 7.5 = 12 \\times 7.5 = 90$ L. Cost: $90 \\times 1.60 = 144.00$. B forgets to divide by $100$, and C is the litres, not the dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A car uses 7.5 litres per 100 kilometres, and drives twelve hundred kilometres a month. Gas costs one dollar sixty per litre. What is the monthly gas cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve hundreds times 7.5 is 90 litres, and 90 times 1.60 is 144 dollars. B forgets to divide by 100, and C is the litres, not the dollars.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Litres used = distance ÷ 100 × L/100 km.', 'Cost = litres × price per litre.', 'A smaller L/100 km means lower fuel costs.'] }],
      lines: [
        { say: 'Let’s sum up. The litres used are the distance divided by 100, times the litres per 100 kilometres.', show: 'sum.0' },
        { say: 'The cost is the litres times the price per litre.', show: 'sum.1' },
        { say: 'And a smaller number of litres per 100 kilometres means lower fuel costs. In part three, we rent a home. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
