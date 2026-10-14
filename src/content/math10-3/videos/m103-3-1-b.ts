import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-3-1-b',
  lessonId: 'm103-3-1',
  title: 'SI Units, Part 2: Mixed Units, Volume and Capacity',
  thumbnailTitle: 'Volume and Capacity',
  thumbnail: 'cooler',
  summary: 'Changing mixed measurements to one unit before adding or comparing, linking volume and capacity with 1 cm³ = 1 mL, and squaring the conversion factor for area units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.1 · Part 2', title: 'Mixed Units, Volume and Capacity', subtitle: 'One unit at a time' }],
      lines: [
        { say: 'On a job site, measurements often come in different units. And a cooler is measured in centimetres, but holds litres.', show: 'title' },
        { say: 'In this video, you will work with mixed units, and link volume to capacity.' },
      ],
    },
    {
      chapter: 'Mixed units',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A carpenter cuts pieces $1.2\\text{ m}$, $85\\text{ cm}$ and $450\\text{ mm}$ long from a $3\\text{ m}$ board. How much is left, in centimetres?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['3\\text{ m} = 300\\text{ cm}, \\quad 1.2\\text{ m} = 120\\text{ cm}, \\quad 450\\text{ mm} = 45\\text{ cm}', '120 + 85 + 45 = 250\\text{ cm}', '300 - 250 = 50\\text{ cm}'] },
      ],
      lines: [
        { say: 'Before you add, subtract or compare, change everything to the same unit. A carpenter has a three-metre board, and cuts pieces 1.2 metres, 85 centimetres and 450 millimetres long. How much is left?', show: 'q' },
        { say: 'Change everything to centimetres: the board is 300 centimetres, and the pieces are 120, 85 and 45 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The pieces total 250 centimetres, so 50 centimetres of the board are left, ignoring the saw cuts.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'The same idea lets you compare. Is 0.85 kilograms more than 900 grams? 0.85 kilograms is 850 grams, so it is less.' },
      ],
    },
    {
      chapter: 'Volume and capacity',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cooler', [box({ l: 40, w: 25, h: 30, labels: { l: '40\\text{ cm}', w: '25\\text{ cm}', h: '30\\text{ cm}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Volume and capacity', md: '$1\\text{ cm}^3 = 1\\text{ mL}$, $\\ 1000\\text{ cm}^3 = 1\\text{ L}$, $\\ 1\\text{ m}^3 = 1000\\text{ L}$' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 40 \\times 25 \\times 30 = 30\\,000\\text{ cm}^3', '30\\,000\\text{ mL} \\div 1000 = 30\\text{ L}'] },
      ],
      lines: [
        { say: 'Volume is the space an object takes up, in cubic units like cubic centimetres. Capacity is how much a container can hold, in millilitres and litres. One fact links them: a one-centimetre cube holds exactly one millilitre.', show: 'def' },
        { say: 'So 1,000 cubic centimetres is one litre, and a cubic metre is 1,000 litres.' },
        { say: 'The inside of a cooler is forty centimetres long, 25 wide and thirty deep. Its volume is 30,000 cubic centimetres.', show: ['cooler.shape', 'cooler.l', 'cooler.w', 'cooler.h', 'm.0'], focus: 'm.0' },
        { say: 'That is 30,000 millilitres. Divide by 1,000: the cooler holds thirty litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Square units',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['1\\text{ m}^2 = 100\\text{ cm} \\times 100\\text{ cm} = 10\\,000\\text{ cm}^2', '2.5\\text{ m}^2 = 2.5 \\times 10\\,000 = 25\\,000\\text{ cm}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using 100 for square units', md: '$2.5\\text{ m}^2$ is **not** $250\\text{ cm}^2$. A square metre holds $10\\,000$ one-centimetre squares.' },
      ],
      lines: [
        { say: 'Area units work the same way, but you square the conversion factor. A square metre is a hundred centimetres by a hundred centimetres, so it is 10,000 square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'So 2.5 square metres is 2.5 times 10,000: 25,000 square centimetres, not 250.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cattle trough is $2.4\\text{ m}$ long, $60\\text{ cm}$ wide and $50\\text{ cm}$ deep. How many litres does it hold?',
          choices: ['$720\\text{ L}$', '$7.2\\text{ L}$', '$72\\,000\\text{ L}$', '$72\\text{ L}$'],
          answer: 0,
          working: '$2.4\\text{ m} = 240\\text{ cm}$. $V = 240 \\times 60 \\times 50 = 720\\,000\\text{ cm}^3 = 720\\,000\\text{ mL} = 720\\text{ L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cattle trough is 2.4 metres long, sixty centimetres wide and fifty centimetres deep. How many litres does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Use one unit: 2.4 metres is 240 centimetres. The volume is 240 times sixty times fifty: 720,000 cubic centimetres, or millilitres. Divide by 1,000: 720 litres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Change mixed measurements to one unit first.', '$1\\text{ cm}^3 = 1\\text{ mL}$, $1000\\text{ cm}^3 = 1\\text{ L}$, $1\\text{ m}^3 = 1000\\text{ L}$.', 'For area, square the factor: $1\\text{ m}^2 = 10\\,000\\text{ cm}^2$.'] }],
      lines: [
        { say: 'Let’s sum up. Change mixed measurements to one unit before you add, subtract or compare.', show: 'sum.0' },
        { say: 'A cubic centimetre holds one millilitre, so 1,000 cubic centimetres is a litre, and a cubic metre is 1,000 litres.', show: 'sum.1' },
        { say: 'And for area, square the conversion factor. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
