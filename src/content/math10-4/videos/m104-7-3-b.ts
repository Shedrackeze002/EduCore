import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-7-3-b',
  lessonId: 'm104-7-3',
  title: 'Volume, Part 2: Capacity and Packing',
  thumbnailTitle: 'Capacity and Packing',
  thumbnail: 'tank',
  summary: 'Turning cubic centimetres into litres (1000 cm³ holds 1 L) for a cooler and a fish tank filled to 5 cm below the top, and packing small boxes into a carton by finding how many fit along each edge.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.3 · Part 2', title: 'Capacity and Packing', subtitle: 'Litres, and how many fit' }],
      lines: [
        { say: 'How many litres of water fill a fish tank? How many small boxes fit in a shipping carton? Volume answers both.', show: 'title' },
        { say: 'In this video, you will change volume to litres, and pack boxes.' },
      ],
    },
    {
      chapter: 'Volume and capacity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Capacity', md: 'How much a container can hold, in litres and millilitres. $1000\\text{ cm}^3$ holds $1\\text{ L}$, and $1\\text{ cm}^3$ holds $1\\text{ mL}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['V = 50 \\times 30 \\times 30 = 45\\,000\\text{ cm}^3', '45\\,000 \\div 1000 = 45\\text{ L}'] },
      ],
      lines: [
        { say: 'Capacity is how much a container can hold, in litres and millilitres. Volume and capacity are linked: 1,000 cubic centimetres holds one litre, so to change cubic centimetres to litres, divide by 1,000.', show: 'def' },
        { say: 'A cooler is fifty centimetres long, thirty wide and thirty high inside. Its volume is 45,000 cubic centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by 1,000: the cooler holds 45 litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Filling a fish tank',
      layout: 'split',
      leftWidth: 440,
      left: [figure('tank', [box({ l: 6, w: 3, h: 4, labels: { l: '60\\text{ cm}', w: '30\\text{ cm}', h: '40\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40 - 5 = 35\\text{ cm deep}', '60 \\times 30 \\times 35 = 63\\,000\\text{ cm}^3', '63\\,000 \\div 1000 = 63\\text{ L}'] }],
      lines: [
        { say: 'A fish tank at a pet store is sixty centimetres long, thirty wide and forty high. It is filled with water up to five centimetres below the top. How many litres of water are in it?', show: ['tank.shape', 'tank.l', 'tank.w', 'tank.h'] },
        { say: 'The water is forty minus five: 35 centimetres deep.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume of water is sixty times thirty times 35: 63,000 cubic centimetres. Divide by 1,000: 63 litres.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Packing a carton',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['60 \\div 20 = 3, \\quad 40 \\div 10 = 4, \\quad 30 \\div 15 = 2', '3 \\times 4 \\times 2 = 24 \\text{ boxes}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with volume', md: '$60 \\times 40 \\times 30 = 72\\,000$ and $20 \\times 10 \\times 15 = 3000$. And $72\\,000 \\div 3000 = 24$.' },
      ],
      lines: [
        { say: 'A carton is sixty by forty by thirty centimetres. Small boxes are twenty by ten by fifteen, all facing the same way. How many fit?', show: 'm.0' },
        { say: 'Find how many fit along each edge: three along the length, four along the width, and two up the height.', focus: 'm.0' },
        { say: 'Multiply: three times four times two is 24 small boxes.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with volume: the carton is 72,000 cubic centimetres, each small box is 3,000, and 72,000 divided by 3,000 is also 24.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A water tank is $100\\text{ cm}$ by $50\\text{ cm}$ by $40\\text{ cm}$. How many litres does it hold?',
          choices: ['$200\\text{ L}$', '$200\\,000\\text{ L}$', '$190\\text{ L}$', '$20\\text{ L}$'],
          answer: 0,
          working: '$100 \\times 50 \\times 40 = 200\\,000\\text{ cm}^3$, and $200\\,000 \\div 1000 = 200\\text{ L}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A water tank is 100 by fifty by forty centimetres. How many litres does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The volume is 200,000 cubic centimetres, and dividing by 1,000 gives 200 litres. B forgets to divide by 1,000.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$1000\\text{ cm}^3$ holds $1\\text{ L}$.', 'Divide cubic centimetres by $1000$ to get litres.', 'Packing: how many fit along each edge, then multiply.'] }],
      lines: [
        { say: 'Let’s sum up. A thousand cubic centimetres holds one litre.', show: 'sum.0' },
        { say: 'So divide cubic centimetres by 1,000 to get litres.', show: 'sum.1' },
        { say: 'And for packing, find how many fit along each edge, then multiply. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
