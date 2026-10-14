import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-1-2',
  lessonId: 'm104-1-2',
  title: 'The Four Operations, Part 1: Choosing the Operation',
  thumbnailTitle: 'Choosing the Operation',
  summary: 'Sum, difference, product and quotient, clue words for choosing the operation, and what to do with a remainder: rounding down for full cartons and up for vans. Part 2 covers the order of operations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.2 · Part 1', title: 'Choosing the Operation', subtitle: 'Add, subtract, multiply or divide?' }],
      lines: [
        { say: 'Every shift at work has number questions. How many cans are on the pallets? How many boxes can you fill?', show: 'title' },
        { say: 'In this video, you will choose the right operation, and decide what to do with a remainder.' },
      ],
    },
    {
      chapter: 'Four operations',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Operation', 'Answer', 'Clue words'],
          rows: [
            ['Add $+$', '**sum**', 'total, altogether, in all'],
            ['Subtract $-$', '**difference**', 'how many more, how much is left'],
            ['Multiply $\\times$', '**product**', 'each, equal groups, per'],
            ['Divide $\\div$', '**quotient**', 'share, split, how many in each'],
          ],
        },
      ],
      lines: [
        { say: 'There are four operations, and each answer has its own name. The answer to an addition is the sum, and the answer to a subtraction is the difference.', show: ['t.0', 't.1'] },
        { say: 'The answer to a multiplication is the product, and the answer to a division is the quotient.', show: ['t.2', 't.3'] },
        { say: 'The words in a problem give clues about which operation to use. Total and altogether suggest adding. Equal groups suggest multiplying, and share or split suggest dividing.', focus: 't' },
      ],
    },
    {
      chapter: 'Choosing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6 \\times 24 = 144 \\text{ cans}', '49{,}015 - 48{,}236 = 779 \\text{ km}'] }],
      lines: [
        { say: 'A case holds 24 cans of juice. How many cans are in six cases? There are six equal groups of 24, so multiply: 144 cans.', show: 'm.0', focus: 'm.0' },
        { say: 'At the start of a trip, an odometer reads 48,236 kilometres. At the end, it reads 49,015. How far was the trip?', show: 'm.1' },
        { say: 'The distance is the difference between the readings, so subtract: 779 kilometres.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Remainders',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['250 \\div 12 = 20 \\text{ R } 10 \\;\\to\\; 20 \\text{ full cartons}', '39 \\div 12 = 3 \\text{ R } 3 \\;\\to\\; 4 \\text{ vans}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Up or down?', md: 'Ask: does the leftover part need one more? People need a seat: round **up**. A half-full carton is not full: round **down**.' },
      ],
      lines: [
        { say: 'Things do not always divide evenly. The part left over is the remainder.' },
        { say: 'A farm worker packs 250 eggs into cartons of twelve. 250 divided by twelve is twenty, remainder ten. The ten extra eggs cannot fill a carton, so round down: twenty full cartons.', show: 'm.0', focus: 'm.0' },
        { say: 'A hockey team has 39 people going to a tournament, and each van holds twelve. 39 divided by twelve is three, remainder three. Those three people still need a seat, so round up: four vans.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not just round the calculator answer the usual way. Ask: does the leftover part need one more?', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each shelf holds $15$ boxes. How many shelves do you need for $100$ boxes?',
          choices: ['$7$', '$6$', '$6.67$', '$85$'],
          answer: 0,
          working: '$100 \\div 15 = 6$ remainder $10$. The $10$ extra boxes still need a shelf, so round up to $7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each shelf holds fifteen boxes. How many shelves do you need for 100 boxes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 100 divided by fifteen is six, remainder ten. The ten extra boxes still need a shelf, so round up to seven. B leaves ten boxes on the floor.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sum, difference, product and quotient answer $+$, $-$, $\\times$ and $\\div$.', 'Look for clue words to choose the operation.', 'With a remainder, decide whether to round up or down.'] }],
      lines: [
        { say: 'Let’s sum up. The sum, difference, product and quotient are the answers to the four operations.', show: 'sum.0' },
        { say: 'Look for clue words to choose the operation.', show: 'sum.1' },
        { say: 'And with a remainder, decide whether to round up or down. In part two, we look at the order of operations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
