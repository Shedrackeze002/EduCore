import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-7-3-c',
  lessonId: 'm204-7-3',
  title: 'Composite Shapes, Part 3: How Much Material to Buy',
  thumbnailTitle: 'How Much to Buy',
  thumbnail: 'm',
  summary: 'Dividing an area by what one box covers and always rounding up: a 3.6 m by 3 m bedroom (10.8 m²) with boxes of laminate covering 2.2 m² needs 5 boxes, because 4 boxes cover only 8.8 m².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.3 · Part 3', title: 'How Much to Buy', subtitle: 'Always round up' }],
      lines: [
        { say: 'Flooring comes in boxes, sod comes in rolls, and grass seed comes in bags. Each one covers a certain area. Once you know the area, you can work out how many to buy.', show: 'title' },
        { say: 'In this video, you will find how many boxes of flooring a room needs.' },
      ],
    },
    {
      chapter: 'Divide, then round up',
      layout: 'center',
      main: [{ kind: 'callout', id: 'rule', tone: 'tip', title: 'Divide, then round up', md: 'Divide the area by what **one** box, roll or bag covers. Then **round up**, because you cannot buy part of a box.' }],
      lines: [
        { say: 'Divide the area by what one box, roll or bag covers. Then round up, because you cannot buy part of a box.', show: 'rule' },
        { say: 'This is different from the usual rounding rule. Even 4.1 boxes means you need five, or part of the floor stays bare.' },
      ],
    },
    {
      chapter: 'Boxes of flooring',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A bedroom floor is $3.6$ m by $3$ m. One box of laminate flooring covers $2.2$ m².', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{area: } 3.6 \\times 3 = 10.8 \\text{ m}^2', '10.8 \\div 2.2 \\approx 4.91', '\\text{round up: } 5 \\text{ boxes}'] },
      ],
      lines: [
        { say: 'A bedroom floor is 3.6 metres by three metres. One box of laminate flooring covers 2.2 square metres. How many boxes are needed?', show: 'q' },
        { say: 'First, the area: 3.6 times three is 10.8 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by what one box covers: 10.8 divided by 2.2 is about 4.91.', show: 'm.1', focus: 'm.1' },
        { say: 'You cannot buy 0.91 of a box, so round up: buy five boxes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Never round down',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding down', md: '$4$ boxes cover only $4 \\times 2.2 = 8.8$ m². That is not enough for $10.8$ m². When you buy materials, always round up.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 \\times 2.2 = 8.8 \\text{ m}^2 \\;\\text{(too little)}', '5 \\times 2.2 = 11 \\text{ m}^2 \\;\\text{(enough)}'] },
      ],
      lines: [
        { say: 'A common mistake is to round down. Four boxes cover only four times 2.2: 8.8 square metres. That is not enough for 10.8 square metres.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'Five boxes cover eleven square metres: enough, with a little to spare. When you buy materials, always round up.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Grass seed',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The lawn from part two has $90$ m² of grass. One bag of grass seed covers $50$ m².', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['90 \\div 50 = 1.8 \\to 2 \\text{ bags}'] },
      ],
      lines: [
        { say: 'The same idea works for any material. The lawn from part two has 90 square metres of grass. One bag of grass seed covers fifty square metres. How many bags are needed?', show: 'q' },
        { say: '90 divided by fifty is 1.8. Round up: two bags. One bag would leave forty square metres bare.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A lawn is $5$ m by $5$ m. One roll of sod covers $0.8$ m². How many rolls are needed?',
          choices: ['$32$ rolls', '$31$ rolls', '$20$ rolls', '$31.25$ rolls'],
          answer: 0,
          working: 'Area: $5 \\times 5 = 25$ m². $25 \\div 0.8 = 31.25$, so round up to $32$ rolls. B rounds down, C multiplies, and D cannot be bought.',
        },
      ],
      lines: [
        { say: 'Your turn. A lawn is five metres by five metres. One roll of sod covers 0.8 square metres. How many rolls are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The area is 25 square metres, and 25 divided by 0.8 is 31.25. Round up: 32 rolls. B rounds down and leaves a bare patch, C multiplies instead of dividing, and D is a part of a roll you cannot buy.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the area first.', 'Divide by what one item covers.', 'Always round up.'] }],
      lines: [
        { say: 'Let’s sum up. Find the area first.', show: 'sum.0' },
        { say: 'Then divide by what one box, roll or bag covers.', show: 'sum.1' },
        { say: 'And always round up, because you cannot buy part of a box. In part four, we add extra for waste, and GST. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
