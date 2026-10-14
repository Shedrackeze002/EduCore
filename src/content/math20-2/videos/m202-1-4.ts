import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const NAMES = ['Amara', 'Ben', 'Thanh'];
const SPORTS = ['hockey', 'curling', 'soccer'];

/** A logic chart: a name on each row, a sport on each column, and the marks each clue adds. */
function chart(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const cx = (j: number) => 2.4 + 2 * j;
  const cy = (i: number) => -1 - i;
  SPORTS.forEach((s, j) => {
    points[`h${j}`] = [cx(j), 0];
    items.push({ kind: 'label', id: `h${j}`, at: `h${j}`, tex: `\\text{${s}}`, tone: 'muted', place: 'center', group: 'frame' });
  });
  NAMES.forEach((name, i) => {
    points[`n${i}`] = [0.4, cy(i)];
    items.push({ kind: 'label', id: `n${i}`, at: `n${i}`, tex: `\\text{${name}}`, place: 'center', group: 'frame' });
  });
  for (let k = 0; k <= 3; k++) {
    Object.assign(points, { [`ha${k}`]: [1.4, -0.5 - k], [`hb${k}`]: [7.4, -0.5 - k], [`va${k}`]: [1.4 + 2 * k, -0.5], [`vb${k}`]: [1.4 + 2 * k, -3.5] });
    items.push({ kind: 'line', id: `hl${k}`, from: `ha${k}`, to: `hb${k}`, tone: 'muted', group: 'frame' });
    items.push({ kind: 'line', id: `vl${k}`, from: `va${k}`, to: `vb${k}`, tone: 'muted', group: 'frame' });
  }
  /** A mark in row `i`, column `j`: a check or a cross. */
  const mark = (i: number, j: number, yes: boolean, group: string) => {
    points[`m${i}${j}`] = [cx(j), cy(i)];
    items.push({ kind: 'label', id: `m${i}${j}`, at: `m${i}${j}`, tex: yes ? '\\checkmark' : '\\times', tone: yes ? 'good' : 'bad', place: 'center', group });
  };
  mark(0, 0, false, 'clue1');
  mark(1, 0, false, 'clue2');
  mark(2, 0, true, 'thanh');
  mark(2, 1, false, 'thanh');
  mark(2, 2, false, 'thanh');
  mark(0, 1, false, 'clue3');
  mark(0, 2, true, 'amara');
  mark(1, 2, false, 'amara');
  mark(1, 1, true, 'ben');
  return { points, items };
}

const video: Explainer = {
  id: 'm202-1-4',
  lessonId: 'm202-1-4',
  title: 'Reasoning to Solve Problems and Puzzles, Part 1: Number and Logic Puzzles',
  thumbnailTitle: 'Number and Logic Puzzles',
  thumbnail: 'ch',
  summary: 'Puzzle strategies, solving a number riddle by listing the multiples of 7 and crossing them off, and using a chart to work out who plays hockey, curling and soccer from three clues. Part 2 finds winning strategies in games, and Part 3 solves spatial puzzles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.4 · Part 1', title: 'Number and Logic Puzzles', subtitle: 'Reasoning with clues' }],
      lines: [
        { say: 'Puzzles and games are a great place to practise reasoning. You make conjectures about what works, and then use logic to be certain.', show: 'title' },
        { say: 'In this video, you will solve a number riddle, and a logic puzzle, by crossing off the possibilities one clue at a time.' },
      ],
    },
    {
      chapter: 'A number riddle',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Strategy', md: 'A **strategy** is a plan for solving a problem or winning a game, such as making a list, using a chart, working backwards, or looking for a pattern.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['14,\\ 21,\\ 28,\\ 35,\\ 42,\\ 49,\\ 56,\\ 63,\\ 70,\\ 77,\\ 84,\\ 91,\\ 98', '\\text{odd: } 21,\\ 35,\\ 49,\\ 63,\\ 77,\\ 91', '\\text{digit sums: } 3,\\ 8,\\ 13,\\ 9,\\ 14,\\ 10', '\\text{The number is } 91.'] },
      ],
      lines: [
        { say: 'A strategy is a plan for solving a problem or winning a game, such as making a list, using a chart, working backwards, or looking for a pattern.', show: 'def' },
        { say: 'Ravi is thinking of a two-digit number. It is a multiple of seven, it is odd, and the sum of its digits is ten. Start with the clue that allows the fewest numbers, and list them: the two-digit multiples of seven.', show: 'm.0', focus: 'm.0' },
        { say: 'The number is odd, so cross off the even ones. That leaves twenty-one, thirty-five, forty-nine, sixty-three, seventy-seven and ninety-one.', show: 'm.1', focus: 'm.1' },
        { say: 'Now add the digits of each. Only ninety-one has a digit sum of ten, so the number is ninety-one.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A logic puzzle',
      layout: 'split',
      leftWidth: 400,
      left: [{ kind: 'bullets', id: 'b', items: ['Clue 1: Amara does not play hockey.', 'Clue 2: Ben does not play hockey.', 'Clue 3: Amara does not play curling.'] }],
      right: [figure('ch', [chart()], 420)],
      lines: [
        { say: 'Amara, Ben and Thanh each play a different sport: hockey, curling or soccer. A chart keeps track of what you know.', show: 'ch.frame' },
        { say: 'Clue one: Amara does not play hockey. Clue two: Ben does not play hockey. Cross them off.', show: ['b.0', 'b.1', 'ch.clue1', 'ch.clue2'], focus: ['ch.clue1', 'ch.clue2'] },
        { say: 'Someone plays hockey, and it is not Amara or Ben, so Thanh plays hockey. That rules out Thanh for the other two sports.', show: 'ch.thanh', focus: 'ch.thanh' },
        { say: 'Clue three: Amara does not play curling. Hockey is taken, so Amara plays soccer.', show: ['b.2', 'ch.clue3', 'ch.amara'], focus: ['ch.clue3', 'ch.amara'] },
        { say: 'The only sport left for Ben is curling.', show: 'ch.ben', focus: 'ch.ben' },
      ],
    },
    {
      chapter: 'One mark per row',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'One check per row and column', md: 'Each person has exactly one answer, and each answer belongs to exactly one person. When a row or column has only one empty box left, it must be a check.' }],
      lines: [
        { say: 'Each person has exactly one answer, and each answer belongs to exactly one person. So when a row or a column has only one empty box left, it must be a check.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Kai is thinking of a two-digit multiple of $8$. The sum of its digits is $10$. What is the number?',
          choices: ['$64$', '$46$', '$28$', '$82$'],
          answer: 0,
          working: 'Two-digit multiples of 8: $16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96$. Only $64$ has a digit sum of $10$. The others are not multiples of 8.',
        },
      ],
      lines: [
        { say: 'Your turn. Kai is thinking of a two-digit multiple of eight. The sum of its digits is ten. What is the number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. List the two-digit multiples of eight, from sixteen to ninety-six. Only sixty-four has digits that add to ten. The other choices add to ten, but are not multiples of eight.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['List the possibilities from the strongest clue.', 'Use each other clue to cross possibilities off.', 'In a chart, each row and each column gets exactly one check.'] }],
      lines: [
        { say: 'Let’s sum up. To solve a number riddle, list the possibilities from the clue that allows the fewest.', show: 'sum.0' },
        { say: 'Then use each other clue to cross possibilities off.', show: 'sum.1' },
        { say: 'And in a logic chart, each row and each column gets exactly one check. In part two, we find winning strategies in games. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
