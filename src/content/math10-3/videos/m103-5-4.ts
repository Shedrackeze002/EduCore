import type { Explainer } from '@/video/script.ts';
import { unitSquare } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-5-4',
  lessonId: 'm103-5-4',
  title: 'Area Units and Material Costs, Part 1: Square Units',
  thumbnailTitle: 'Square Units',
  thumbnail: 'sq',
  summary: 'Squaring the length factor to convert area units (144 in² in a square foot, 9 ft² in a square yard, 10 000 cm² in a square metre), and converting between SI and imperial area with 1 m² ≈ 10.76 ft². Part 2 works out how much to buy and the cost.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.4 · Part 1', title: 'Square Units', subtitle: 'Square the length factor' }],
      lines: [
        { say: 'Flooring is priced per square foot, carpet per square yard, and sod per square metre. To order materials, you need to switch between square units.', show: 'title' },
        { say: 'In this video, you will convert area units. In part two, you will work out how much to buy, and what it costs.' },
      ],
    },
    {
      chapter: 'Square units are squared',
      layout: 'split',
      leftWidth: 420,
      left: [figure('sq', [unitSquare({ split: 12, labels: { side: '1\\text{ ft} = 12\\text{ in}', cells: '12\\text{ in}' } })])],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Length', 'Area'],
          rows: [
            ['$1\\text{ ft} = 12\\text{ in}$', '$1\\text{ ft}^2 = 144\\text{ in}^2$'],
            ['$1\\text{ yd} = 3\\text{ ft}$', '$1\\text{ yd}^2 = 9\\text{ ft}^2$'],
            ['$1\\text{ m} = 100\\text{ cm}$', '$1\\text{ m}^2 = 10\\,000\\text{ cm}^2$'],
            ['$1\\text{ cm} = 10\\text{ mm}$', '$1\\text{ cm}^2 = 100\\text{ mm}^2$'],
          ],
        },
      ],
      lines: [
        { say: 'A square one foot on each side is twelve inches on each side. It holds twelve times twelve, 144 one-inch squares. So a square foot is 144 square inches.', show: ['sq.square', 'sq.grid', 'sq.side', 'sq.cells', 't.0'], focus: 't.0' },
        { say: 'For area, square the length conversion. A yard is three feet, so a square yard is nine square feet.', show: 't.1', focus: 't.1' },
        { say: 'A metre is a hundred centimetres, so a square metre is 10,000 square centimetres. And a square centimetre is a hundred square millimetres.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['6\\text{ ft}^2 = 6 \\times 144 = 864\\text{ in}^2', '4500\\text{ cm}^2 = 4500 \\div 10\\,000 = 0.45\\text{ m}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the length factor for area', md: '$1\\text{ yd}^2$ is **not** $3\\text{ ft}^2$: a square yard is 3 ft by 3 ft, so it holds $9\\text{ ft}^2$.' },
      ],
      lines: [
        { say: 'A piece of plywood has an area of six square feet. Square inches are smaller, so the number gets bigger: multiply by 144. That is 864 square inches.', show: 'm.0', focus: 'm.0' },
        { say: 'A sheet of glass has an area of 4,500 square centimetres. Square metres are bigger, so divide by 10,000: 0.45 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not use the length factor. A square yard is not three square feet. Picture the square: three feet by three feet, so it holds nine square feet.', show: 'oops' },
      ],
    },
    {
      chapter: 'Between systems',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['1\\text{ m}^2 \\approx 10.76\\text{ ft}^2', '75\\text{ m}^2 \\times 10.76 \\approx 807\\text{ ft}^2', '12 \\times 15 = 180\\text{ ft}^2, \\quad 180 \\div 9 = 20\\text{ yd}^2'] },
      ],
      lines: [
        { say: 'Homes are often listed in square feet, but building plans may use square metres. A metre is a little longer than a yard, so a square metre is a bit more than ten square feet. In this course, use 10.76.', show: 'm.0', focus: 'm.0' },
        { say: 'A condo has a floor area of 75 square metres. Square feet are smaller, so multiply: about 807 square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Carpet is sold by the square yard. A living room twelve feet by fifteen is 180 square feet. Divide by nine: twenty square yards. Check: twelve feet is four yards, fifteen feet is five, and four times five is twenty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A patio is $36\\text{ ft}^2$. How many square yards is that?',
          choices: ['$4\\text{ yd}^2$', '$12\\text{ yd}^2$', '$108\\text{ yd}^2$', '$324\\text{ yd}^2$'],
          answer: 0,
          working: '$1\\text{ yd}^2 = 9\\text{ ft}^2$, and square yards are bigger, so divide: $36 \\div 9 = 4\\text{ yd}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A patio is 36 square feet. How many square yards is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A square yard is nine square feet, and square yards are bigger, so divide: 36 divided by nine is four square yards. B uses the length factor, three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Square the length factor: $1\\text{ ft}^2 = 144\\text{ in}^2$, $1\\text{ yd}^2 = 9\\text{ ft}^2$.', 'Bigger unit, smaller number: divide. Smaller unit, bigger number: multiply.', 'Between systems, use the factor given, such as $1\\text{ m}^2 \\approx 10.76\\text{ ft}^2$.'] }],
      lines: [
        { say: 'Let’s sum up. For area units, square the length factor.', show: 'sum.0' },
        { say: 'To a bigger unit, the number gets smaller: divide. To a smaller unit, it gets bigger: multiply.', show: 'sum.1' },
        { say: 'And between systems, use the factor you are given. In part two, we work out how much material to buy. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
