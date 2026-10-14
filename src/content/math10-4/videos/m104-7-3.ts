import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-7-3',
  lessonId: 'm104-7-3',
  title: 'Volume, Part 1: Boxes',
  thumbnailTitle: 'Volume of a Box',
  thumbnail: 'box',
  summary: 'Volume in cubic units, V = l × w × h for a shipping box, multiplying rather than adding, and cubic metres for a raised garden bed with every measurement in metres. Part 2 covers capacity and packing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.3 · Part 1', title: 'Volume of a Box', subtitle: 'Length times width times height' }],
      lines: [
        { say: 'How much soil fills a garden bed? How much space is inside a shipping box? These questions are about volume: the space inside a 3-D object.', show: 'title' },
        { say: 'In this video, you will find the volume of a box, and see why you multiply instead of adding.' },
      ],
    },
    {
      chapter: 'Volume and cubic units',
      layout: 'split',
      leftWidth: 460,
      left: [figure('box', [box({ l: 4, w: 3, h: 2, labels: { l: '40\\text{ cm}', w: '30\\text{ cm}', h: '20\\text{ cm}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Volume', md: 'The space inside a 3-D object, in **cubic units**. A cubic centimetre is a little cube $1\\text{ cm}$ on each edge.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = l \\times w \\times h', '40 \\times 30 \\times 20 = 24\\,000\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A rectangular prism is a box shape: six flat faces, and every face is a rectangle. Volume is the amount of space inside it, measured in cubic units, like cubic centimetres.', show: ['box.shape', 'def'] },
        { say: 'To find the volume of a box, multiply its three measurements: length times width times height.', show: ['box.l', 'box.w', 'box.h', 'm.0'], focus: 'm.0' },
        { say: 'A shipping box is forty centimetres long, thirty wide and twenty high. Think of it in layers. The bottom layer holds forty times thirty: 1,200 little cubes. There are twenty layers, and 1,200 times twenty is 24,000 cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Adding the measurements, ninety, is not the volume. Volume counts cubes in every row, every layer and every stack, so you multiply.' },
      ],
    },
    {
      chapter: 'Cubic metres',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['V = 2.4 \\times 1.2 \\times 0.4 = 1.152\\text{ m}^3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing metres and centimetres', md: 'A depth of $40\\text{ cm}$ is $0.4\\text{ m}$. Using $2.4 \\times 1.2 \\times 40$ gives an answer $100$ times too big.' },
      ],
      lines: [
        { say: 'Big spaces, like a garden bed or the box of a truck, are measured in cubic metres. Make sure all three measurements are in metres before you multiply.' },
        { say: 'A raised garden bed is 2.4 metres long, 1.2 metres wide and 0.4 metres deep. It holds 2.4 times 1.2 times 0.4: 1.152 cubic metres of soil.', show: 'm.0', focus: 'm.0' },
        { say: 'If the depth is given as forty centimetres, change it to 0.4 metres first. Using forty gives an answer 100 times too big.', show: 'oops' },
        { say: 'If the soil comes by the cubic metre, you would order a little more than one cubic metre for this bed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A storage bin is $50\\text{ cm}$ long, $40\\text{ cm}$ wide and $30\\text{ cm}$ high. What is its volume?',
          choices: ['$60\\,000\\text{ cm}^3$', '$120\\text{ cm}^3$', '$6\\,000\\text{ cm}^3$', '$2\\,000\\text{ cm}^3$'],
          answer: 0,
          working: '$V = 50 \\times 40 \\times 30 = 60\\,000\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A storage bin is fifty centimetres long, forty wide and thirty high. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifty times forty is 2,000, and 2,000 times thirty is 60,000 cubic centimetres. B adds instead of multiplying, C drops a zero, and D stops after two measurements.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume is measured in cubic units.', 'Box: $V = l \\times w \\times h$.', 'Use the same unit for all three measurements.'] }],
      lines: [
        { say: 'Let’s sum up. Volume is the space inside a 3-D object, measured in cubic units.', show: 'sum.0' },
        { say: 'For a box, multiply the length, the width and the height, in any order.', show: 'sum.1' },
        { say: 'And use the same unit for all three. In part two, we turn volume into litres, and pack boxes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
