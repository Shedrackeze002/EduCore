import type { Explainer } from '@/video/script.ts';
import { unitSquare } from '@/video/measure.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-3-b',
  lessonId: 'm10c-1-3',
  title: 'Converting Within a Measurement System, Part 2: Area and Volume Units',
  thumbnailTitle: 'Area and Volume Units',
  thumbnail: 'sq',
  summary: 'Why a square foot is 144 square inches and a cubic yard is 27 cubic feet: to convert units of area, square the conversion factor, and for volume, cube it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.3 · Part 2', title: 'Area and Volume Units', subtitle: 'Square it for area, cube it for volume' }],
      lines: [
        { say: 'There are twelve inches in a foot. So how many square inches are in a square foot? If you said twelve, you are not alone, but it is wrong.', show: 'title' },
        { say: 'In this video, you will see why, and how to convert units of area and volume.' },
      ],
    },
    {
      chapter: 'Square units',
      layout: 'split',
      left: [figure('sq', [unitSquare({ split: 12, labels: { side: '1\\text{ ft} = 12\\text{ in}', cells: '12\\text{ in}' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['1\\text{ ft}^2 = 12\\text{ in} \\times 12\\text{ in}', '= 144\\text{ in}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not 12', md: '$1\\text{ ft}^2$ is **not** $12\\text{ in}^2$: it holds 12 rows of 12 one-inch squares.' },
      ],
      lines: [
        { say: 'A square foot is a square that is one foot on each side.', show: ['sq.square', 'sq.side'] },
        { say: 'But one foot is twelve inches, so the same square is twelve inches by twelve inches.', show: 'sq.cells', focus: ['sq.side', 'sq.cells'] },
        { say: 'Split it into one-inch squares. There are twelve rows of twelve,', show: 'sq.grid', focus: 'sq.grid' },
        { say: 'so a square foot is twelve times twelve, which is 144 square inches.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Not twelve. The linear factor, twelve, gives the side of the square, not its area.', show: 'oops', focus: 'sq' },
      ],
    },
    {
      chapter: 'Square the factor',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'For area, square the factor', md: '$1\\text{ m} = 100\\text{ cm}$, so $1\\text{ m}^2 = 100^2\\text{ cm}^2 = 10\\,000\\text{ cm}^2$.' },
        { kind: 'text', id: 'q', md: 'A rug has an area of $2.5\\text{ m}^2$. What is its area in square centimetres?', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['2.5 \\times 10\\,000 = 25\\,000\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'The same thing happens in any system. For area, square the linear conversion factor.', show: 'rule' },
        { say: 'One metre is a hundred centimetres, so one square metre is a hundred squared, which is ten thousand square centimetres.', focus: 'rule' },
        { say: 'A rug has an area of 2.5 square metres. What is its area in square centimetres?', show: 'q' },
        { say: 'Each square metre is ten thousand square centimetres, so 2.5 times ten thousand is twenty-five thousand square centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Cubic units',
      layout: 'split',
      left: [figure('cube', [box({ l: 3, w: 3, h: 3, cells: 3, labels: { l: '1\\text{ yd} = 3\\text{ ft}', h: '3\\text{ ft}', w: '3\\text{ ft}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\text{ yd}^3 = 3^3\\text{ ft}^3 = 27\\text{ ft}^3', '1\\text{ m}^3 = 100^3\\text{ cm}^3', '= 1\\,000\\,000\\text{ cm}^3'] },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'For volume, cube the factor', md: 'Length, width and height each change by the factor.' },
      ],
      lines: [
        { say: 'Now volume. A cubic yard is a cube one yard on each side, which is three feet on each side.', show: ['cube.shape', 'cube.l', 'cube.w', 'cube.h'] },
        { say: 'It holds three layers of three rows of three cubic feet: three cubed, which is 27 cubic feet.', show: ['cube.cells', 'm.0'], focus: ['cube.cells', 'm.0'] },
        { say: 'For volume, cube the linear factor, because the length, the width and the height each change.', show: 'rule' },
        { say: 'So a cubic metre is a hundred cubed,', show: 'm.1', focus: 'm.1' },
        { say: 'which is one million cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A volume conversion',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A garden bed needs $4\\text{ yd}^3$ of soil. How many cubic feet is that?', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['1\\text{ yd}^3 = 27\\text{ ft}^3', '4 \\times 27 = 108\\text{ ft}^3'] },
      ],
      lines: [
        { say: 'A garden bed needs four cubic yards of soil. How many cubic feet is that?', show: 'q' },
        { say: 'Each cubic yard is 27 cubic feet,', show: 'm.0', focus: 'm.0' },
        { say: 'so four cubic yards is four times 27, which is 108 cubic feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many square inches are in $3\\text{ ft}^2$?',
          choices: ['$36\\text{ in}^2$', '$108\\text{ in}^2$', '$432\\text{ in}^2$', '$144\\text{ in}^2$'],
          answer: 2,
          working: '$1\\text{ ft}^2 = 12^2 = 144\\text{ in}^2$, so $3\\text{ ft}^2 = 3 \\times 144 = 432\\text{ in}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many square inches are in three square feet? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. One square foot is twelve squared, which is 144 square inches, so three square feet is three times 144, which is 432 square inches. A uses twelve instead of 144.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'For area, **square** the linear factor: $1\\text{ ft}^2 = 144\\text{ in}^2$, $1\\text{ m}^2 = 10\\,000\\text{ cm}^2$.',
            'For volume, **cube** it: $1\\text{ yd}^3 = 27\\text{ ft}^3$, $1\\text{ m}^3 = 1\\,000\\,000\\text{ cm}^3$.',
            'Picture the square or cube to check: it is split in every direction.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. For units of area, square the linear conversion factor: a square foot is 144 square inches, and a square metre is ten thousand square centimetres.", show: 'sum.0' },
        { say: 'For volume, cube it: a cubic yard is 27 cubic feet, and a cubic metre is a million cubic centimetres.', show: 'sum.1' },
        { say: 'If in doubt, picture the square or the cube: it is split up in every direction. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
