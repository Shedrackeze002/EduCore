import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm202-8-3-b',
  lessonId: 'm202-8-3',
  title: 'Scale Diagrams, Part 2: Scales Written as Ratios',
  thumbnailTitle: 'Scales as Ratios',
  thumbnail: 'trail',
  summary: 'What a scale of 1 : n means, reading a real wall length of 4.3 m from a 1 : 50 floor plan, drawing a 3 m room on the same plan, and measuring a 3.7 km trail on a 1 : 50 000 topographic map.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.3 · Part 2', title: 'Scales Written as Ratios', subtitle: 'Reading plans and maps' }],
      lines: [
        { say: 'Floor plans and maps usually print their scale as a ratio, like one to fifty, in a corner of the page.', show: 'title' },
        { say: 'In this video, you will use a ratio scale to find real lengths, and to draw lengths on a plan.' },
      ],
    },
    {
      chapter: 'What 1 : n means',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'A scale of 1 : 50', md: '$1$ unit on the diagram stands for $50$ of the **same unit** in real life. It is the same as a scale factor of $k = \\dfrac{1}{50}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{real length} = n \\times \\text{diagram length}', '\\text{diagram length} = \\text{real length} \\div n'] },
      ],
      lines: [
        { say: 'A scale of one to fifty means one unit on the diagram stands for fifty of the same unit in real life. One centimetre on the plan is fifty centimetres in the house. It is the same as a scale factor of one fiftieth.', show: 'key' },
        { say: 'So to find a real length, multiply the diagram length by n.', show: 'm.0', focus: 'm.0' },
        { say: 'And to draw a real length on the plan, divide it by n. Keep both in the same unit, and convert to metres or kilometres at the end.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A floor plan',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['8.6 \\times 50 = 430 \\text{ cm}', '430 \\text{ cm} = 4.3 \\text{ m}', '3 \\text{ m} = 300 \\text{ cm};\\ \\ 300 \\div 50 = 6 \\text{ cm}'] }],
      lines: [
        { say: 'A floor plan has a scale of one to fifty. A wall is 8.6 centimetres long on the plan. How long is the real wall, in metres? Multiply by fifty: 430 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'There are 100 centimetres in a metre, so the wall is 4.3 metres long.', show: 'm.1', focus: 'm.1' },
        { say: 'Now go the other way. A new room will be three metres wide. How wide is it on the plan? Three metres is 300 centimetres, and 300 divided by fifty is six centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A hiking map',
      layout: 'center',
      main: [
        figure('trail', [ruler({ system: 'metric', length: 10, start: 0, end: 7.4, reading: '7.4\\text{ cm}' })], 240),
        { kind: 'math', id: 'm', size: 'md', lines: ['7.4 \\times 50\\,000 = 370\\,000 \\text{ cm}', '1 \\text{ km} = 100\\,000 \\text{ cm}', '370\\,000 \\text{ cm} = 3.7 \\text{ km}'] },
      ],
      lines: [
        { say: 'A trail on a one to 50,000 topographic map measures 7.4 centimetres, as shown on the ruler. How long is the real trail?', show: ['trail.scale', 'trail.bar', 'trail.start', 'trail.end', 'trail.reading'] },
        { say: 'Multiply by 50,000: 7.4 times 50,000 is 370,000 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is a big number of centimetres, so convert. There are 100 centimetres in a metre and 1,000 metres in a kilometre, so 100,000 centimetres in a kilometre.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide 370,000 by 100,000: the trail is 3.7 kilometres long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a $1 : 25\\,000$ map, a lake is $4.2$ cm across. How wide is the real lake?',
          choices: ['$1.05$ km', '$10.5$ km', '$105$ km', '$0.105$ km'],
          answer: 0,
          working: '$4.2 \\times 25\\,000 = 105\\,000$ cm, and $105\\,000 \\div 100\\,000 = 1.05$ km.',
        },
      ],
      lines: [
        { say: 'Your turn. On a one to 25,000 map, a lake is 4.2 centimetres across. How wide is the real lake? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 4.2 times 25,000 is 105,000 centimetres, and dividing by 100,000 gives 1.05 kilometres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1 : n$ means $1$ unit on the diagram is $n$ of the same unit in real life.', 'Real length $= n \\times$ diagram length; diagram length $=$ real length $\\div n$.', 'Convert to metres or kilometres at the end: $1$ km $= 100\\,000$ cm.'] }],
      lines: [
        { say: 'Let’s sum up. A scale of one to n means one unit on the diagram is n of the same unit in real life.', show: 'sum.0' },
        { say: 'Multiply by n to find a real length, and divide by n to draw one.', show: 'sum.1' },
        { say: 'And convert at the end: one kilometre is 100,000 centimetres. In part three, we find a scale, and choose one that fits. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
