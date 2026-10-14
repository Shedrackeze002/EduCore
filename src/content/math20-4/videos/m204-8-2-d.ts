import type { Explainer } from '@/video/script.ts';
import { compassRose, gridMap } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const town = gridMap({
  cols: 6,
  rows: 5,
  places: [
    { id: 'school', col: 1, row: 1, tex: '\\text{School}' },
    { id: 'arena', col: 4, row: 3, tex: '\\text{Arena}' },
    { id: 'library', col: 1, row: 4, tex: '\\text{Library}' },
    { id: 'gas', col: 4, row: 0, tex: '\\text{Gas station}' },
  ],
});

const video: Explainer = {
  id: 'm204-8-2-d',
  lessonId: 'm204-8-2',
  title: 'Maps, Part 4: Compass Directions',
  thumbnailTitle: 'Compass Directions',
  thumbnail: 'cr',
  summary: 'The eight compass directions with north at the top of the map, the Arena as northeast of the School (3 squares east, then 2 north), and why “from the School” means starting at the School.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.2 · Part 4', title: 'Compass Directions', subtitle: 'North is up' }],
      lines: [
        { say: 'Turn left at the lights works only if you know which way you are facing. Compass directions work from anywhere.', show: 'title' },
        { say: 'In this video, you will use compass directions to describe where a place is, and how to get there.' },
      ],
    },
    {
      chapter: 'The compass',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cr', [compassRose()], 420)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Compass directions', md: 'The four main directions are **north** (N), **south** (S), **east** (E) and **west** (W). On most maps, north is at the top. Between them are NE, NW, SE and SW.' }],
      lines: [
        { say: 'The four main compass directions are north, south, east and west. On most maps, north is at the top, so south is down, east is right, and west is left.', show: ['cr.main', 'def'], focus: 'cr.main' },
        { say: 'Between them are four more: northeast, northwest, southeast and southwest. Northeast is halfway between north and east: up and to the right.', show: 'cr.between', focus: 'cr.between' },
      ],
    },
    {
      chapter: 'Directions to the arena',
      layout: 'split',
      leftWidth: 660,
      left: [figure('gm', [town], 500)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{B2} \\to \\text{E4}', '\\text{B to E: } 3 \\text{ east}', '\\text{2 to 4: } 2 \\text{ north}', '\\text{Arena is NE}'] }],
      lines: [
        { say: 'Use the grid map. Which direction is the Arena from the School, and how do you get there?', show: ['gm.grid', 'gm.letters', 'gm.numbers', 'gm.north', 'gm.school', 'gm.arena', 'gm.library', 'gm.gas'] },
        { say: 'Start at the School, in B2. The Arena is in E4.', show: 'm.0', focus: ['gm.school', 'gm.arena', 'm.0'] },
        { say: 'From B to E is three squares to the right, which is east.', show: 'm.1', focus: 'm.1' },
        { say: 'From row two to row four is two squares up, which is north.', show: 'm.2', focus: 'm.2' },
        { say: 'Right and up together is northeast. So the Arena is northeast of the School: go three squares east, then two squares north.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'From where?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'From where?', md: '"The Arena **from** the School" means you **start at the School**. Going the other way, from the Arena to the School, is **southwest**.' }],
      lines: [
        { say: 'A common mistake is to start in the wrong place. The Arena from the School means you start at the School. Going the other way, from the Arena to the School, is the opposite direction: southwest.', show: 'oops' },
      ],
    },
    {
      chapter: 'Distance on the grid',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'On this map, each square is $200$ m.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 + 2 = 5 \\text{ squares}', '5 \\times 200 = 1000 \\text{ m} = 1 \\text{ km}'] },
      ],
      lines: [
        { say: 'A grid also works like a scale. Suppose each square on this map is 200 metres. How far is the walk from the School to the Arena, along the streets?', show: 'q' },
        { say: 'The route is three squares east and two squares north: five squares in all.', show: 'm.0', focus: 'm.0' },
        { say: 'Five times 200 is 1,000 metres, which is one kilometre.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid map, the Library is in B5 and the Gas station is in E1. Which direction is the Gas station from the Library?',
          choices: ['southeast (SE)', 'northwest (NW)', 'northeast (NE)', 'southwest (SW)'],
          answer: 0,
          working: 'Start at the Library (B5). E is to the right (east) and row 1 is down (south): southeast. B is the way back.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid map, the Library is in B5, and the Gas station is in E1. Which direction is the Gas station from the Library? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Start at the Library, in B5. Column E is to the right, which is east, and row one is down, which is south. So the Gas station is southeast. B, northwest, is the way back.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['North is up, south down, east right, west left.', 'NE is up and right; SW is down and left.', '“A from B” means start at B.'] }],
      lines: [
        { say: 'Let’s sum up. On most maps, north is up, south is down, east is right and west is left.', show: 'sum.0' },
        { say: 'Northeast is up and to the right, and southwest is down and to the left.', show: 'sum.1' },
        { say: 'And A from B means you start at B. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
