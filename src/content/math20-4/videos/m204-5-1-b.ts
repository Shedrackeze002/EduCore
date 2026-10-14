import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A rectangular yard, 12.5 m by 8.4 m, with its sides labelled. */
function yard(): Part {
  const points: Record<string, [number, number]> = { a: [0, 0], b: [12.5, 0], c: [12.5, 8.4], d: [0, 8.4], nl: [6.25, -0.9], nw: [-0.6, 4.2] };
  const items: DiagramItem[] = [
    { kind: 'region', id: 'fill', points: ['a', 'b', 'c', 'd'], tone: 'adj', shade: 0.25, group: 'yard' },
    { kind: 'curve', id: 'edge', points: ['a', 'b', 'c', 'd'], closed: true, tone: 'adj', group: 'yard' },
    { kind: 'label', id: 'll', at: 'nl', tex: 'l = 12.5\\text{ m}', place: 'center', group: 'yard' },
    { kind: 'label', id: 'lw', at: 'nw', tex: 'w = 8.4\\text{ m}', place: 'left', group: 'yard' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm204-5-1-b',
  lessonId: 'm204-5-1',
  title: 'Using Formulas, Part 2: Formulas with More Than One Step',
  thumbnailTitle: 'Two-Step Formulas',
  thumbnail: 'yd',
  summary: 'Using the order of operations in a formula: the perimeter of a yard with P = 2l + 2w (41.8 m of fence), a taxi fare with C = 4 + 2.5d (22.50 dollars for 7.4 km), and why adding first gives the wrong fare.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.1 · Part 2', title: 'Two-Step Formulas', subtitle: 'Multiply first, then add' }],
      lines: [
        { say: 'Many formulas have more than one operation, like a multiply and an add. The order you do them in changes the answer.', show: 'title' },
        { say: 'In this video, you will use formulas with two operations, following the order of operations.' },
      ],
    },
    {
      chapter: 'Fencing a yard',
      layout: 'split',
      leftWidth: 560,
      left: [figure('yd', [yard()], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P = 2l + 2w', 'P = 2 \\times 12.5 + 2 \\times 8.4', 'P = 25 + 16.8', 'P = 41.8'] }],
      lines: [
        { say: 'A rectangular yard is 12.5 metres long and 8.4 metres wide. Use P equals two l plus two w to find the perimeter, the length of fence it needs.', show: 'yd' },
        { say: 'Write the formula: P equals two l plus two w.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute: l is 12.5 and w is 8.4. So P equals two times 12.5, plus two times 8.4.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the order of operations: multiply first. Two times 12.5 is 25, and two times 8.4 is 16.8.', show: 'm.2', focus: 'm.2' },
        { say: 'Then add: 25 plus 16.8 is 41.8. The yard needs 41.8 metres of fence.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A taxi fare',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A taxi charges $C = 4 + 2.5d$, where $C$ is the fare in dollars and $d$ is the distance in kilometres. Find the fare for a $7.4$ km ride.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['C = 4 + 2.5 \\times 7.4', 'C = 4 + 18.5', 'C = 22.5'] },
      ],
      lines: [
        { say: 'In this example, a taxi charges C equals four plus 2.5 d. C is the fare in dollars, and d is the distance in kilometres. What is the fare for a 7.4 kilometre ride?', show: 'q' },
        { say: 'Substitute d equals 7.4: C equals four plus 2.5 times 7.4.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first: 2.5 times 7.4 is 18.5.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: four plus 18.5 is 22.5. So the fare is 22 dollars fifty. The four dollars is a fee you pay just to start the ride.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Multiply before you add',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding first', md: 'In $C = 4 + 2.5 \\times 7.4$, adding first gives $6.5 \\times 7.4 = 48.10$. That fare is more than double the right answer. Multiply before you add.' }],
      lines: [
        { say: 'A common mistake is to add first. In four plus 2.5 times 7.4, adding first gives 6.5 times 7.4: 48 dollars ten. That fare is more than double the right answer. Multiply before you add.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A taxi charges $C = 3.5 + 2d$, where $C$ is in dollars and $d$ is in kilometres. What is the fare for a $9$ km ride?',
          choices: ['\\$21.50', '\\$49.50', '\\$14.50', '\\$18.00'],
          answer: 0,
          working: '$C = 3.5 + 2 \\times 9 = 3.5 + 18 = 21.5$. B adds first, and D forgets the starting fee.',
        },
      ],
      lines: [
        { say: 'Your turn. A taxi charges C equals 3.5 plus two d, where C is in dollars and d is in kilometres. What is the fare for a nine kilometre ride? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two times nine is eighteen, and 3.5 plus eighteen is 21.5, so the fare is 21 dollars fifty. B adds first, and D forgets the starting fee.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute a number for each letter.', 'Multiply first, then add.', 'Write one step per line.'] }],
      lines: [
        { say: 'Let’s sum up. Substitute a number for each letter.', show: 'sum.0' },
        { say: 'Use the order of operations: multiply first, then add.', show: 'sum.1' },
        { say: 'And write one step per line, so your work is easy to check. In part three, we change temperatures with a formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
