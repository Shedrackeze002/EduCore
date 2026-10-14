import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-6-1-b',
  lessonId: 'm204-6-1',
  title: 'Converting Units, Part 2: Imperial Units',
  thumbnailTitle: 'Imperial Units',
  thumbnail: 'ft',
  summary: 'Imperial units (inch, foot, yard, ounce and pound) and their facts (12 in in a foot, 3 ft in a yard, 16 oz in a pound), converting 8 ft to 96 in and 40 oz to 2.5 lb, and why imperial units do not go up by 10.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.1 · Part 2', title: 'Imperial Units', subtitle: '12, 3 and 16' }],
      lines: [
        { say: 'Lumber is sold in feet. Many recipes and scales use pounds and ounces. Canada uses SI units, but many tools and products still use imperial units.', show: 'title' },
        { say: 'In this video, you will change between imperial units.' },
      ],
    },
    {
      chapter: 'Imperial units',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Imperial units', md: '**Imperial** units are an older system. They are still used in the United States and on many Canadian job sites: the inch (in), foot (ft), yard (yd), ounce (oz) and pound (lb).' }],
      right: [{ kind: 'table', id: 't', head: ['Measure', 'Fact'], rows: [['Length', '$1$ ft $= 12$ in'], ['Length', '$1$ yd $= 3$ ft'], ['Weight', '$1$ lb $= 16$ oz']] }],
      lines: [
        { say: 'Imperial units are an older system of units. They are still used in the United States, and on many Canadian job sites. They include the inch, the foot, the yard, the ounce and the pound.', show: 'def' },
        { say: 'A foot is twelve inches. A yard is three feet. And a pound, a unit of weight, is sixteen ounces.', show: 't' },
      ],
    },
    {
      chapter: 'A foot is 12 inches',
      layout: 'center',
      main: [
        figure('ft', [strip({ name: 'f', parts: 12, shaded: 12, width: 10, height: 1.2, label: '1\\text{ ft} = 12\\text{ in}' })], 200),
        { kind: 'text', id: 'q', md: 'A board is $8$ ft long. How many inches is that?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['8 \\times 12 = 96 \\text{ in}'] },
      ],
      lines: [
        { say: 'Here is one foot, cut into its twelve inches. A standard ruler is one foot long, so this is a ruler’s length.', show: 'ft' },
        { say: 'Use the same rule as before: big unit to small unit, multiply. Small unit to big unit, divide. A board is eight feet long. How many inches is that?', show: 'q' },
        { say: 'Inches are smaller, so multiply by twelve: eight times twelve is 96 inches.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Cheese at a deli',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A block of cheese weighs $40$ oz. How many pounds is that?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['40 \\div 16 = 2.5 \\text{ lb}'] },
      ],
      lines: [
        { say: 'A block of cheese at a deli weighs 40 ounces. How many pounds is that?', show: 'q' },
        { say: 'One pound is sixteen ounces. Pounds are bigger, so divide: 40 divided by sixteen is 2.5 pounds.', show: 'm', focus: 'm' },
        { say: 'Check: two pounds is 32 ounces, and half a pound is eight more. 32 plus eight is 40.' },
      ],
    },
    {
      chapter: 'Not 10 or 100',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using 10 or 100 like in SI', md: 'Imperial units do not go up by $10$ or $100$. A board $8$ ft long is $96$ in, not $800$ in. Use $12$, $3$ or $16$.' }],
      lines: [
        { say: 'A common mistake is to use ten or 100, like in SI. Imperial units do not go up by ten or 100. A board eight feet long is 96 inches, not 800 inches. Use twelve, three or sixteen.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A roll of fabric is $4$ yd long. How many feet is that?',
          choices: ['$12$ ft', '$48$ ft', '$1.33$ ft', '$400$ ft'],
          answer: 0,
          working: '$1$ yd $= 3$ ft. Feet are smaller, so multiply: $4 \\times 3 = 12$ ft. B uses $12$, C divides, and D uses $100$.',
        },
      ],
      lines: [
        { say: 'Your turn. A roll of fabric is four yards long. How many feet is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One yard is three feet, and feet are smaller, so multiply: four times three is twelve feet. B uses twelve, the inches in a foot, C divides, and D uses 100.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['1 ft = 12 in, 1 yd = 3 ft, 1 lb = 16 oz.', 'Big to small: multiply. Small to big: divide.', 'Imperial units do not go up by 10.'] }],
      lines: [
        { say: 'Let’s sum up. One foot is twelve inches, one yard is three feet, and one pound is sixteen ounces.', show: 'sum.0' },
        { say: 'From a big unit to a small unit, multiply. From a small unit to a big unit, divide.', show: 'sum.1' },
        { say: 'And imperial units do not go up by ten. In part three, we use mixed units like feet and inches. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
