import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { unitSquare } from '@/video/measure.ts';

const video: Explainer = {
  id: 'm103-3-2',
  lessonId: 'm103-3-2',
  title: 'Imperial Units, Part 1: Length',
  thumbnailTitle: 'Feet and Inches',
  summary: 'Inches, feet, yards and miles and their referents, changing feet and inches to inches, changing inches to feet and inches with the remainder (not the decimal), and adding lengths with a carry. Part 2 covers mass and capacity.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.2 · Part 1', title: 'Imperial Length', subtitle: 'Inches, feet, yards and miles' }],
      lines: [
        { say: 'Canada uses the S I system, but walk into any lumber yard and you will buy eight-foot two-by-fours. Tires are sized in inches, and hay is sold by the ton.', show: 'title' },
        { say: 'Workers in the trades need imperial units too. In this video, you will convert imperial lengths. In part two, mass and capacity.' },
      ],
    },
    {
      chapter: 'Imperial length',
      layout: 'split',
      leftWidth: 420,
      left: [figure('ft', [unitSquare({ split: 12, labels: { side: '1\\text{ ft} = 12\\text{ in}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12\\text{ in} = 1\\text{ ft}', '3\\text{ ft} = 1\\text{ yd} = 36\\text{ in}', '5280\\text{ ft} = 1\\text{ mi} = 1760\\text{ yd}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Referents', md: 'An inch is about the width of your thumb, a foot about an adult’s shoe, a yard one big step, and a mile about a 20-minute walk.' },
      ],
      lines: [
        { say: 'Imperial units are not based on powers of ten, so you need to know the relationships. Twelve inches make a foot.', show: ['m.0', 'ft.square', 'ft.grid', 'ft.side'], focus: 'm.0' },
        { say: 'Three feet make a yard, which is 36 inches. And 5,280 feet make a mile, which is 1,760 yards.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'An inch is about the width of your thumb, a foot is about the length of an adult’s shoe, a yard is one big step, and a mile is about a twenty-minute walk.', show: 'tip' },
        { say: 'The same rule as in S I applies: to a smaller unit, multiply, and to a larger unit, divide.' },
      ],
    },
    {
      chapter: 'Feet and inches',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['5\\text{ ft } 7\\text{ in} = 5 \\times 12 + 7 = 67\\text{ in}', '89 \\div 12 = 7 \\text{ R } 5 \\;\\to\\; 7\\text{ ft } 5\\text{ in}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A decimal is not feet and inches', md: '$89 \\div 12 = 7.4166\\ldots$ does **not** mean 7 ft 4 in. The decimal is part of a foot: $0.4166\\ldots \\times 12 = 5$ inches.' },
      ],
      lines: [
        { say: 'A workbench is five feet seven inches long. In inches: five feet is five times twelve, sixty inches, plus seven is 67 inches.', show: 'm.0', focus: 'm.0' },
        { say: 'A board is 89 inches long. In feet and inches: 89 divided by twelve is seven, remainder five, because seven twelves are 84. So it is seven feet five inches.', show: 'm.1', focus: 'm.1' },
        { say: 'A calculator shows 7.4166, but that does not mean seven feet four inches. The decimal is part of a foot: 0.4166 times twelve is five inches. Use the remainder.', show: 'oops' },
      ],
    },
    {
      chapter: 'Adding lengths',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4\\text{ ft } 9\\text{ in} + 3\\text{ ft } 7\\text{ in} = 7\\text{ ft } 16\\text{ in}', '16\\text{ in} = 1\\text{ ft } 4\\text{ in}', '7\\text{ ft } 16\\text{ in} = 8\\text{ ft } 4\\text{ in}'] },
      ],
      lines: [
        { say: 'A carpenter needs two pieces of trim: four feet nine inches, and three feet seven inches. Add the feet and the inches separately: seven feet, sixteen inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixteen inches is more than a foot: it is one foot four inches.', show: 'm.1', focus: 'm.1' },
        { say: 'So carry the foot: the total is eight feet four inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pipe is $103\\text{ in}$ long. What is this in feet and inches?',
          choices: ['$8\\text{ ft } 7\\text{ in}$', '$8\\text{ ft } 5\\text{ in}$', '$8.58\\text{ ft}$, or 8 ft 58 in', '$9\\text{ ft } 1\\text{ in}$'],
          answer: 0,
          working: '$103 \\div 12 = 8$ remainder $7$, since $8 \\times 12 = 96$. So $103\\text{ in} = 8\\text{ ft } 7\\text{ in}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A pipe is 103 inches long. What is this in feet and inches? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 103 divided by twelve is eight, remainder seven, because eight twelves are 96. So it is eight feet seven inches. C reads the decimal part as inches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['12 in = 1 ft, 3 ft = 1 yd, 5280 ft = 1 mi.', 'For feet and inches, divide by 12 and use the remainder.', 'Add feet and inches separately, then carry.'] }],
      lines: [
        { say: 'Let’s sum up. Twelve inches make a foot, three feet make a yard, and 5,280 feet make a mile.', show: 'sum.0' },
        { say: 'For feet and inches, divide by twelve and use the remainder, not the decimal.', show: 'sum.1' },
        { say: 'And add feet and inches separately, then carry. In part two, we convert imperial mass and capacity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
