import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-8-2-b',
  lessonId: 'm202-8-2',
  title: 'Solving Problems with Rates, Part 2: Changing Units Along the Way',
  thumbnailTitle: 'Multi-Step Rate Problems',
  thumbnail: 'pool',
  summary: 'Multi-step rate problems with a change of units: the gas cost of a 640 km trip at 8.2 L/100 km, the time to fill an 8 m by 4 m by 1.5 m pool at 60 L/min (about 13.3 h), and why 13.3 h is not 13 h 30 min.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.2 · Part 2', title: 'Changing Units Along the Way', subtitle: 'One rate at a time' }],
      lines: [
        { say: 'Many rate problems take more than one step, and often the units change along the way.', show: 'title' },
        { say: 'In this video, you will plan the cost of gas for a road trip, and the time it takes to fill a pool.' },
      ],
    },
    {
      chapter: 'Gas for a road trip',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['640 \\text{ km} = 6.4 \\text{ hundreds of km}', '6.4 \\times 8.2 = 52.48 \\text{ L}', '52.48 \\times \\$1.489 \\approx \\$78.14'] }],
      lines: [
        { say: 'In this example, a car uses 8.2 litres per 100 kilometres, and gas costs 148.9 cents per litre. How much will the gas cost for a 640 kilometre trip?', show: 'm.0' },
        { say: 'There are two rates, so take them one at a time. The fuel rate is per 100 kilometres, so first change 640 kilometres to 6.4 hundreds of kilometres.', focus: 'm.0' },
        { say: 'Multiply by the fuel rate: 6.4 times 8.2 is 52.48 litres of gas.', show: 'm.1', focus: 'm.1' },
        { say: 'Now multiply by the price per litre. 52.48 times 1.489 is about seventy-eight dollars fourteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Filling a pool',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pool', [box({ l: 8, w: 4, h: 2.6, labels: { l: '8\\text{ m}', w: '4\\text{ m}', h: '1.5\\text{ m}' } })], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 8 \\times 4 \\times 1.5 = 48 \\text{ m}^3', '48 \\text{ m}^3 = 48\\,000 \\text{ L}', '48\\,000 \\div 60 = 800 \\text{ min}', '800 \\div 60 \\approx 13.3 \\text{ h}'] }],
      lines: [
        { say: 'A pool is a rectangular prism, eight metres long, four metres wide, and 1.5 metres deep. A hose fills it at sixty litres per minute. How many hours will it take?', show: ['pool.shape', 'pool.l', 'pool.w', 'pool.h'] },
        { say: 'First, the volume: eight times four times 1.5 is forty-eight cubic metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The hose rate is in litres, so change units. In this example, use one cubic metre equals 1,000 litres: forty-eight cubic metres is 48,000 litres.', show: 'm.1', focus: 'm.1' },
        { say: 'You know the litres, and the rate is litres per minute, so divide: 48,000 divided by sixty is 800 minutes.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by sixty again to change minutes to hours: about 13.3 hours.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Decimal hours are not minutes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Decimal hours are not minutes', md: '$13.3$ h is **not** $13$ h $30$ min. The decimal part is a fraction of an hour, so multiply it by $60$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.3 \\text{ h} = 0.3 \\times 60 = 18 \\text{ min}', '13.3 \\text{ h} \\approx 13 \\text{ h } 18 \\text{ min}'] },
      ],
      lines: [
        { say: 'A common mistake is to read 13.3 hours as thirteen hours and thirty minutes. The decimal part is a fraction of an hour, not a number of minutes.', show: 'oops' },
        { say: 'Multiply it by sixty: 0.3 hours is eighteen minutes. So 13.3 hours is about thirteen hours and eighteen minutes.', show: ['m.0', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, a car uses $6.5$ L/100 km and gas costs \\$1.52 per litre. How much does the gas cost for a $300$ km trip?',
          choices: ['\\$29.64', '\\$2,964.00', '\\$12.83', '\\$9.88'],
          answer: 0,
          working: '$300$ km is $3$ hundreds, so the car uses $3 \\times 6.5 = 19.5$ L. The cost is $19.5 \\times 1.52 =$ \\$29.64. B forgets that the rate is per $100$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, a car uses 6.5 litres per 100 kilometres, and gas costs one dollar fifty-two per litre. How much does the gas cost for a 300 kilometre trip? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 300 kilometres is three hundreds, so the car uses 19.5 litres, and 19.5 times 1.52 is twenty-nine dollars sixty-four. B forgets that the rate is per 100 kilometres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Take one rate at a time.', 'Change units as you go: km to hundreds of km, $\\text{m}^3$ to L, min to h.', 'Multiply a decimal part of an hour by $60$ to get minutes.'] }],
      lines: [
        { say: 'Let’s sum up. In a multi-step problem, take one rate at a time.', show: 'sum.0' },
        { say: 'Change units as you go: kilometres to hundreds of kilometres, cubic metres to litres, and minutes to hours.', show: 'sum.1' },
        { say: 'And multiply a decimal part of an hour by sixty to get minutes. In part three, we combine rates. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
