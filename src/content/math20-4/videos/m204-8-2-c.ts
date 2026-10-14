import type { Explainer } from '@/video/script.ts';
import { gridMap } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const town = gridMap({
  cols: 6,
  rows: 5,
  places: [
    { id: 'school', col: 1, row: 1, tex: '\\text{School}' },
    { id: 'arena', col: 4, row: 3, tex: '\\text{Arena}' },
    { id: 'library', col: 1, row: 4, tex: '\\text{Library}' },
    { id: 'gas', col: 4, row: 0, tex: '\\text{Gas station}' },
    { id: 'park', col: 2, row: 3, tex: '\\text{Park}' },
  ],
});

const video: Explainer = {
  id: 'm204-8-2-c',
  lessonId: 'm204-8-2',
  title: 'Maps, Part 3: Grid Locations',
  thumbnailTitle: 'Grid Maps',
  thumbnail: 'gm',
  summary: 'Naming squares on a grid map by column letter, then row number (like B2), finding the Library in B5, and finding what is in square E1 (the Gas station).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.2 · Part 3', title: 'Grid Maps', subtitle: 'Letter, then number' }],
      lines: [
        { say: 'Town maps, mall directories and campground maps often have a grid. It lets you find a place quickly without searching the whole map.', show: 'title' },
        { say: 'In this video, you will name squares on a grid map, and find places from their squares.' },
      ],
    },
    {
      chapter: 'A grid',
      layout: 'split',
      leftWidth: 660,
      left: [figure('gm', [town], 500)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Grid', md: 'Many maps have a **grid** of squares. Each column has a letter and each row has a number. A square is named by its **letter**, then its **number**, like B2.' }],
      lines: [
        { say: 'Many maps have a grid of squares.', show: ['gm.grid', 'gm.north'] },
        { say: 'Each column has a letter, A, B, C and so on, along the bottom.', show: 'gm.letters', focus: 'gm.letters' },
        { say: 'And each row has a number, one, two, three, up the side.', show: 'gm.numbers', focus: 'gm.numbers' },
        { say: 'A square is named by its letter, then its number. The School is in column B, row two, so it is in square B2. Some maps put the letters along the top instead, but the rule is the same.', show: ['def', 'gm.school'], focus: 'gm.school' },
      ],
    },
    {
      chapter: 'Finding places',
      layout: 'split',
      leftWidth: 660,
      left: [figure('gm', [town], 500)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Library: B5}', '\\text{E1: Gas station}'] }],
      lines: [
        { say: 'Here is the town map with all its places. In which square is the Library?', show: ['gm.grid', 'gm.letters', 'gm.numbers', 'gm.north', 'gm.school', 'gm.arena', 'gm.library', 'gm.gas', 'gm.park'] },
        { say: 'Look down from the Library to the letters: column B. Look across to the numbers: row five. So the Library is in B5.', show: 'm.0', focus: ['gm.library', 'm.0'] },
        { say: 'Now go the other way. What is in square E1? Find column E along the bottom, and row one up the side. Where they meet is the Gas station.', show: 'm.1', focus: ['gm.gas', 'm.1'] },
        { say: 'Also notice that the Park, in C4, and the Arena, in E4, are in the same row, so they are straight across from each other on the map.', focus: ['gm.park', 'gm.arena'] },
      ],
    },
    {
      chapter: 'Letter first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up the order', md: 'Write the **letter first**, then the number: B5, not 5B. And check that you read the column along the bottom and the row up the side, not the other way round.' }],
      lines: [
        { say: 'A common mistake is to mix up the order. Write the letter first, then the number: B5, not five B. And check that you read the column along the bottom and the row up the side, not the other way round. Square B5 and square E2 are far apart on this map.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid map, a place is in column D and row $3$. How is its square named?',
          choices: ['D3', '3D', 'C3', 'D4'],
          answer: 0,
          working: 'Letter first, then number: D3. B writes the number first, and C and D are one square off.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid map, a place is in column D and row three. How is its square named? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The letter comes first, then the number: D3. B writes the number first, and C and D are each one square off.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Columns have letters; rows have numbers.', 'Name a square letter first, then number: B2.', 'Read down to the letter and across to the number.'] }],
      lines: [
        { say: 'Let’s sum up. On a grid map, columns have letters and rows have numbers.', show: 'sum.0' },
        { say: 'Name a square with the letter first, then the number, like B2.', show: 'sum.1' },
        { say: 'And to find a square, read down to the letter and across to the number. In part four, we use compass directions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
