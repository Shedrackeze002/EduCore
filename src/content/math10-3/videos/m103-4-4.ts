import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-4-4',
  lessonId: 'm103-4-4',
  title: 'Cutting and Buying Material, Part 1: How Many Pieces?',
  thumbnailTitle: 'How Many Pieces?',
  summary: 'Dividing a length into pieces and rounding down, finding the waste, allowing a saw kerf for each cut, and rounding up when deciding how many boards to buy. Part 2 prices material by the linear foot.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.4 · Part 1', title: 'How Many Pieces?', subtitle: 'Cutting material without waste' }],
      lines: [
        { say: 'Before a job starts, someone has to work out how much material to buy. Order too little and the crew stands around waiting. Order too much and the profit ends up in the scrap bin.', show: 'title' },
        { say: 'In this video, you will find how many pieces you can cut, and how many boards to buy. In part two, you will work out the cost.' },
      ],
    },
    {
      chapter: 'Round down',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A plumber cuts pieces $45\\text{ cm}$ long from a $3\\text{ m}$ length of copper pipe.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['300 \\div 45 \\approx 6.67 \\;\\to\\; 6 \\text{ pieces}', '300 - 6 \\times 45 = 300 - 270 = 30\\text{ cm left over}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding up the number of pieces', md: '$6.67$ pieces does **not** mean you can cut $7$: the seventh would be only part of a piece. Round down.' },
      ],
      lines: [
        { say: 'To find how many pieces fit in a board, pipe or rod, divide the full length by the length of one piece. A plumber cuts 45-centimetre pieces from a three-metre pipe. Three metres is 300 centimetres.', show: 'q' },
        { say: '300 divided by 45 is about 6.67. Only whole pieces are useful, so round down: six pieces.', show: 'm.0', focus: 'm.0' },
        { say: 'Six pieces use 270 centimetres, so thirty centimetres are left over. The leftover material that is too short to use is called waste.', show: 'm.1', focus: 'm.1' },
        { say: '6.67 does not mean you can cut seven. The seventh would be only part of a piece. When counting the pieces you can cut, round down.', show: 'oops' },
      ],
    },
    {
      chapter: 'The saw kerf',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Shelf pieces $350\\text{ mm}$ long from a $2.4\\text{ m}$ board, with a $3\\text{ mm}$ kerf for each cut.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['350 + 3 = 353\\text{ mm per piece}', '2400 \\div 353 \\approx 6.8 \\;\\to\\; 6 \\text{ pieces}', '2400 - 6 \\times 353 = 2400 - 2118 = 282\\text{ mm}'] },
      ],
      lines: [
        { say: 'Every saw cut turns a thin strip into sawdust: the saw kerf, about three millimetres, or an eighth of an inch. When you cut many pieces, it adds up, so each piece really uses its own length plus one kerf.', show: 'q' },
        { say: 'Aiyana cuts 350-millimetre shelf pieces from a 2.4-metre board. Each piece uses 353 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The board is 2,400 millimetres, and 2,400 divided by 353 is about 6.8. Round down: six pieces.', show: 'm.1', focus: 'm.1' },
        { say: 'They use 2,118 millimetres, so the leftover piece is 282 millimetres long.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How many boards?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['240 \\div 70 \\approx 3.43 \\;\\to\\; 3 \\text{ pieces per board}', '32 \\div 3 \\approx 10.67 \\;\\to\\; 11 \\text{ boards}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Down, then up', md: 'Pieces you can cut: round **down**. Boards you must buy: round **up**.' },
      ],
      lines: [
        { say: 'Omar needs 32 pieces, each seventy centimetres long, from boards 2.4 metres long, and the pieces cannot be joined. First, find how many pieces one board gives: 240 divided by seventy is about 3.43, so three pieces.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the boards: 32 divided by three is about 10.67. This time round up, because a store will not sell part of a board. Omar must buy eleven boards.', show: 'm.1', focus: 'm.1' },
        { say: 'So round down for the pieces you can cut, and round up for the boards you must buy.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many $60\\text{ cm}$ pieces can be cut from a $4\\text{ m}$ rod, ignoring the kerf?',
          choices: ['$6$ pieces', '$7$ pieces', '$6.67$ pieces', '$66$ pieces'],
          answer: 0,
          working: '$400 \\div 60 \\approx 6.67$. Round down: $6$ whole pieces, with $40\\text{ cm}$ left over.',
        },
      ],
      lines: [
        { say: 'Your turn. How many sixty-centimetre pieces can be cut from a four-metre rod, ignoring the kerf? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four metres is 400 centimetres, and 400 divided by sixty is about 6.67. Round down: six whole pieces, with forty centimetres left over. B rounds up.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Pieces you can cut: divide and round down.', 'With a kerf, each piece uses its length plus one cut.', 'Boards to buy: divide and round up.'] }],
      lines: [
        { say: 'Let’s sum up. To find the pieces you can cut, divide and round down.', show: 'sum.0' },
        { say: 'With a saw kerf, each piece uses its own length plus one cut.', show: 'sum.1' },
        { say: 'And to find the boards you must buy, divide and round up. In part two, we work out the cost of material. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
