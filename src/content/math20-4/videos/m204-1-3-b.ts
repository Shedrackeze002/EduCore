import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-3-b',
  lessonId: 'm204-1-3',
  title: 'Ratios, Rates and Proportions, Part 2: Rates and Unit Rates',
  thumbnailTitle: 'Rates and Unit Rates',
  thumbnail: 'm',
  summary: 'What a rate and a unit rate are, finding a price per kilogram (8.40 dollars for 3 kg is 2.80 dollars per kilogram), an hourly wage (17 dollars), a speed (80 km/h), and why “per” means divide to find the amount for one.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.3 · Part 2', title: 'Rates and Unit Rates', subtitle: 'The amount for one' }],
      lines: [
        { say: 'Dollars per kilogram, dollars per hour, kilometres per hour: rates are everywhere at work and in stores.', show: 'title' },
        { say: 'In this video, you will find unit rates, the amount for one.' },
      ],
    },
    {
      chapter: 'Rates',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate', md: 'Compares two amounts with **different units**, such as \\$12 for $4$ kg, or $240$ km in $3$ hours.' },
        { kind: 'callout', id: 'unit', tone: 'definition', title: 'Unit rate', md: 'A rate for **one** unit: one kilogram, one hour, one litre. To find it, **divide** by the number of units.' },
      ],
      lines: [
        { say: 'A rate compares two amounts with different units, such as twelve dollars for four kilograms, or 240 kilometres in three hours.', show: 'def' },
        { say: 'A unit rate is a rate for one unit: one kilogram, one hour, or one litre. To find it, divide by the number of units.', show: 'unit' },
      ],
    },
    {
      chapter: 'Price per kilogram',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A $3$ kg bag of apples costs \\$8.40.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8.40 \\div 3 = 2.80', '\\$2.80 \\text{ per kilogram}'] },
      ],
      lines: [
        { say: 'A three-kilogram bag of apples costs eight dollars forty. What is the price per kilogram?', show: 'q' },
        { say: 'Divide the price by the number of kilograms: 8.40 divided by three is 2.80.', show: 'm.0', focus: 'm.0' },
        { say: 'So the apples cost two dollars eighty per kilogram. That makes it easy to compare with loose apples, or another size of bag.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Pay per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$136 for an $8$-hour shift.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['136 \\div 8 = 17', '\\$17 \\text{ per hour}'] },
      ],
      lines: [
        { say: 'Hana earns 136 dollars for an eight-hour shift. What is her hourly wage?', show: 'q' },
        { say: 'Divide the pay by the hours: 136 divided by eight is seventeen.', show: 'm.0', focus: 'm.0' },
        { say: 'So Hana earns seventeen dollars per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Kilometres per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$240$ km in $3$ hours.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['240 \\div 3 = 80', '80 \\text{ km/h}'] },
      ],
      lines: [
        { say: 'A truck travels 240 kilometres in three hours. What is its average speed?', show: 'q' },
        { say: 'A speed is a unit rate too: the distance for one hour. 240 divided by three is eighty.', show: 'm.0', focus: 'm.0' },
        { say: 'So the average speed is eighty kilometres per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using a unit rate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2.80 \\times 5 = 14.00', '17 \\times 30 = 510'] }],
      lines: [
        { say: 'Once you know a unit rate, multiply to find any amount. At two dollars eighty per kilogram, five kilograms of apples cost 2.80 times five: fourteen dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'And at seventeen dollars per hour, Hana earns seventeen times thirty, which is 510 dollars, for thirty hours of work.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Per',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: '“Per” means “for each one”', md: '\\$17 **per** hour means \\$17 for each hour. When you see “per”, think: divide to find the amount for one. Divide by the unit that comes **after** “per”.' }],
      lines: [
        { say: 'Seventeen dollars per hour means seventeen dollars for each hour. When you see the word per, think: divide to find the amount for one.', show: 'tip' },
        { say: 'Divide by the unit that comes after the word per. Dollars per kilogram: divide the dollars by the kilograms.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $4$ L jug of milk costs \\$6.20. What is the price per litre?',
          choices: ['\\$1.55', '\\$24.80', '\\$0.65', '\\$2.20'],
          answer: 0,
          working: 'Divide the price by the litres: $6.20 \\div 4 = 1.55$. B multiplies, and C divides the litres by the price.',
        },
      ],
      lines: [
        { say: 'Your turn. A four-litre jug of milk costs six dollars twenty. What is the price per litre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide the price by the litres: 6.20 divided by four is one dollar 55 per litre. B multiplies, and C divides the litres by the price.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A rate compares amounts with different units.', 'A unit rate is the amount for one unit.', '“Per” means divide by the unit after it.'] }],
      lines: [
        { say: 'Let’s sum up. A rate compares amounts with different units.', show: 'sum.0' },
        { say: 'A unit rate is the amount for one unit.', show: 'sum.1' },
        { say: 'And “per” means divide by the unit that comes after it. In part three, we use proportions to scale mixes and recipes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
