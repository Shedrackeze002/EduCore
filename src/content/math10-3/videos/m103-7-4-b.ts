import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-7-4-b',
  lessonId: 'm103-7-4',
  title: 'Similar Figures, Part 2: Scale Diagrams',
  thumbnailTitle: 'Scale Diagrams',
  summary: 'Reading a scale written in words, as a ratio or with units: a 1:50 floor plan, a quarter-inch-to-a-foot blueprint, a 1:50 000 map, and finding the scale of a drawing, converting units at the end.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.4 · Part 2', title: 'Scale Diagrams', subtitle: 'Plans, blueprints and maps' }],
      lines: [
        { say: 'Blueprints, site plans and road maps are all drawings of something much bigger, made to scale.', show: 'title' },
        { say: 'In this video, you will read real lengths off a scale diagram, and find the scale of a drawing.' },
      ],
    },
    {
      chapter: 'Scales',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale diagram', md: 'A drawing **similar** to a real object. Its **scale** compares a length on the drawing with the real length.' },
        { kind: 'table', id: 't', head: ['Written', 'Example'], rows: [['In words', '$1\\text{ cm}$ represents $2\\text{ m}$'], ['As a ratio', '$1:50$'], ['With units', '$\\tfrac14\\text{ in} = 1\\text{ ft}$']] },
      ],
      lines: [
        { say: 'A scale diagram is a drawing that is similar to a real object. Its scale compares a length on the drawing with the real length.', show: 'def' },
        { say: 'A scale can be written in words, like one centimetre represents two metres.', show: 't.0', focus: 't.0' },
        { say: 'As a ratio, like one to fifty. Every real length is fifty times the length on the drawing, in the same unit.', show: 't.1', focus: 't.1' },
        { say: 'Or with units, like a quarter inch equals one foot.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A floor plan',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['9.2 \\times 50 = 460\\text{ cm}', '460 \\div 100 = 4.6\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to convert', md: 'With a ratio scale, multiplying gives the real length in the **same unit as the drawing**. Convert at the end.' },
      ],
      lines: [
        { say: 'A floor plan has a scale of one to fifty. A wall measures 9.2 centimetres on the plan. How long is the real wall, in metres?', },
        { say: 'Multiply by fifty: 9.2 times fifty is 460 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Change to metres: 460 divided by 100 is 4.6 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'With a ratio scale, multiplying gives the real length in the same unit as the drawing, usually centimetres. If the question asks for metres, divide by 100 at the end.', show: 'oops' },
      ],
    },
    {
      chapter: 'A blueprint',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac14\\text{ in} = 1\\text{ ft} \\;\\to\\; 1\\text{ in} = 4\\text{ ft}', '14\\text{ ft} \\div 4 = 3\\tfrac12\\text{ in}', '3\\tfrac34\\text{ in} \\times 4 = 15\\text{ ft}'] }],
      lines: [
        { say: 'A blueprint uses a quarter inch equals one foot. So each whole inch on the blueprint stands for four feet.', show: 'm.0', focus: 'm.0' },
        { say: 'A room is fourteen feet long. On the blueprint, it is fourteen divided by four: three and a half inches.', show: 'm.1', focus: 'm.1' },
        { say: 'A hallway measures three and three quarter inches on the blueprint. In real life, it is three and three quarters times four: fifteen feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Maps and finding the scale',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['7.4 \\times 50\\,000 = 370\\,000\\text{ cm}', '370\\,000 \\div 100\\,000 = 3.7\\text{ km}', '6\\text{ m} = 600\\text{ cm}, \\quad \\tfrac{600}{12} = 50 \\;\\to\\; 1:50'] }],
      lines: [
        { say: 'Maps use large ratios. On a one to 50,000 topographic map, a trail measures 7.4 centimetres. Multiply: 370,000 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'A kilometre is 100,000 centimetres, so the trail is 3.7 kilometres long.', show: 'm.1', focus: 'm.1' },
        { say: 'To find a scale, put both lengths in the same unit, then divide the real length by the drawn length. A six-metre wall is drawn twelve centimetres long. Six metres is 600 centimetres, and 600 over twelve is fifty. So the scale is one to fifty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a $1:100$ plan, a room is $4.5\\text{ cm}$ long. How long is the real room?',
          choices: ['$4.5\\text{ m}$', '$450\\text{ m}$', '$45\\text{ m}$', '$0.45\\text{ m}$'],
          answer: 0,
          working: '$4.5 \\times 100 = 450\\text{ cm}$, and $450 \\div 100 = 4.5\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a one to 100 plan, a room is 4.5 centimetres long. How long is the real room? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 4.5 times 100 is 450 centimetres, which is 4.5 metres. B forgets to change the centimetres to metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1:50$ means real length $= 50 \\times$ drawn length, in the same unit.', 'Convert units at the end.', 'To find a scale: same units, then real ÷ drawn.'] }],
      lines: [
        { say: 'Let’s sum up. A scale of one to fifty means the real length is fifty times the drawn length, in the same unit.', show: 'sum.0' },
        { say: 'Convert the units at the end.', show: 'sum.1' },
        { say: 'And to find a scale, put both lengths in the same unit, then divide the real length by the drawn length. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
