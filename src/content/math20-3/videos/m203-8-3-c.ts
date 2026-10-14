import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const SOLUTION = [['1', '2', '3'], ['3', '1', '2'], ['2', '3', '1']];

/**
 * The 3 by 3 cage puzzle: solid lines round the cages, dashed lines inside them, each cage's sum
 * in its first cell's corner, and the answer in each cell as `v<r><c>` (row 0 at the top).
 */
function cagePuzzle(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const line = (id: string, a: P, b: P, inside: boolean) => {
    points[`${id}a`] = a;
    points[`${id}b`] = b;
    items.push(inside ? { kind: 'line', id, from: `${id}a`, to: `${id}b`, tone: 'muted', dashed: true, weight: 1.5, group: 'grid' } : { kind: 'line', id, from: `${id}a`, to: `${id}b`, weight: 4, group: 'grid' });
  };
  // The outside, then each inner edge: [from, to, inside a cage?]. Rows count down from y = 3.
  line('o0', [0, 0], [3, 0], false);
  line('o1', [3, 0], [3, 3], false);
  line('o2', [3, 3], [0, 3], false);
  line('o3', [0, 3], [0, 0], false);
  const edges: [P, P, boolean][] = [
    [[1, 3], [1, 2], true], [[2, 3], [2, 2], false], [[0, 2], [1, 2], false], [[1, 2], [2, 2], false], [[2, 2], [3, 2], true],
    [[1, 2], [1, 1], false], [[2, 2], [2, 1], false], [[0, 1], [1, 1], true], [[1, 1], [2, 1], false], [[2, 1], [3, 1], false],
    [[1, 1], [1, 0], false], [[2, 1], [2, 0], true],
  ];
  edges.forEach(([a, b, inside], i) => line(`e${i}`, a, b, inside));
  const cages: [number, number, string][] = [[0, 0, '3+'], [0, 2, '5+'], [1, 0, '5+'], [1, 1, '1'], [2, 1, '4+']];
  cages.forEach(([r, c, t], i) => {
    points[`k${i}`] = [c + 0.27, 2.8 - r];
    items.push({ kind: 'label', id: `k${i}`, at: `k${i}`, tex: t, tone: 'theta', place: 'center', group: 'grid' });
  });
  SOLUTION.forEach((row, r) =>
    row.forEach((v, c) => {
      points[`p${r}${c}`] = [c + 0.55, 2.45 - r];
      items.push({ kind: 'label', id: `v${r}${c}`, at: `p${r}${c}`, tex: v, tone: 'good', place: 'center' });
    }),
  );
  return { points, items };
}

const video: Explainer = {
  id: 'm203-8-3-c',
  lessonId: 'm203-8-3',
  title: 'Numerical Puzzles and Games, Part 3: Cage Puzzles and Logic Puzzles',
  thumbnailTitle: 'Cage and Logic Puzzles',
  thumbnail: 'cg',
  summary: 'The rules of a cage puzzle, solving a 3 by 3 cage puzzle one cell at a time, and solving a mystery number riddle by listing the possibilities for the strongest clue and crossing out the ones that break another clue (92).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.3 · Part 3', title: 'Cage and Logic Puzzles', subtitle: 'One answer fits every clue' }],
      lines: [
        { say: 'A good logic puzzle has exactly one answer, and every clue helps you find it. The trick is knowing which clue to use first.', show: 'title' },
        { say: 'In this video, you will solve a cage puzzle, and a mystery number riddle.' },
      ],
    },
    {
      chapter: 'Cage puzzles',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Cage puzzle', md: 'Fill the grid with the numbers $1$ to $3$ so that each number appears **once in every row and every column**. Solid lines mark the **cages**, and the numbers in each cage add to the small number in its corner.' }],
      lines: [
        { say: 'In a cage puzzle, you fill a grid with the numbers one to three, so that each number appears once in every row and every column.', show: 'def' },
        { say: 'Solid lines mark the cages, and the numbers in each cage add up to the small number in its corner.' },
      ],
    },
    {
      chapter: 'Solving a cage puzzle',
      layout: 'split',
      leftWidth: 560,
      left: [figure('cg', [cagePuzzle()], 480)],
      right: [{ kind: 'bullets', id: 'b', items: ['One-cell cages first.', 'Then cages with only one possible pair.', 'Each row and column: $1$, $2$, $3$ once.'] }],
      lines: [
        { say: 'Here is a cage puzzle. Start with the easiest clue. The centre cell is a cage of just one cell, marked one, so it is one.', show: ['cg.grid', 'b.0', 'cg.v11'], focus: 'cg.v11' },
        { say: 'The top-left cage needs two different numbers that add to three: one and two, in some order. So the top row’s last number is three.', show: ['b.1', 'cg.v02'], focus: ['cg.k0', 'cg.v02'] },
        { say: 'The right cage adds to five, and starts with three, so the middle-right cell is two. The middle row now has one and two, so its first cell is three.', show: ['b.2', 'cg.v12', 'cg.v10'], focus: ['cg.v12', 'cg.v10'] },
        { say: 'The left cage adds to five, and starts with three, so the bottom-left cell is two. The first column now has three and two, so the top-left cell is one, and the top-middle cell is two.', show: ['cg.v20', 'cg.v00', 'cg.v01'], focus: ['cg.v20', 'cg.v00', 'cg.v01'] },
        { say: 'The middle column has two and one, so the bottom-middle cell is three, and the bottom-right cell is one. Check the last cage: three plus one is four. Every rule works.', show: ['cg.v21', 'cg.v22'], focus: ['cg.v21', 'cg.v22'] },
      ],
    },
    {
      chapter: 'A mystery number',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'I am a two-digit number. My digits add up to $11$. I am a multiple of $4$. My tens digit is greater than my ones digit.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['29,\\ 38,\\ 47,\\ 56,\\ 65,\\ 74,\\ 83,\\ 92', '\\text{multiples of } 4\\text{: } 56,\\ 92', '\\text{tens digit greater: } 92'] },
      ],
      lines: [
        { say: 'Now a riddle. I am a two-digit number. My digits add up to eleven. I am a multiple of four. My tens digit is greater than my ones digit. What number am I?', show: 'q' },
        { say: 'Start with the clue that leaves the fewest possibilities, and list them. The digits add to eleven: 29, 38, 47, 56, 65, 74, 83 and 92.', show: 'm.0', focus: 'm.0' },
        { say: 'Cross out any that break another clue. Only 56 and 92 are multiples of four.', show: 'm.1', focus: 'm.1' },
        { say: 'In 56, the tens digit is smaller. In 92, it is greater. So the mystery number is 92.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'I am a two-digit number. My digits add up to $9$. I am a multiple of $4$. My tens digit is less than my ones digit. What number am I?',
          choices: ['$36$', '$72$', '$18$', '$45$'],
          answer: 0,
          working: 'Digits adding to $9$: $18, 27, 36, 45, 54, 63, 72, 81, 90$. Multiples of $4$: $36$ and $72$. Tens digit less than ones digit: $36$. B breaks the last clue.',
        },
      ],
      lines: [
        { say: 'Your turn. I am a two-digit number. My digits add up to nine. I am a multiple of four. My tens digit is less than my ones digit. What number am I? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Of the numbers whose digits add to nine, only 36 and 72 are multiples of four. In 36, the tens digit is less than the ones digit. B breaks the last clue.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cage puzzles: one-cell cages and single pairs first.', 'Each row and column has each number once.', 'Logic puzzles: list the possibilities, then cross out.'] }],
      lines: [
        { say: 'Let’s sum up. In a cage puzzle, start with one-cell cages, and cages with only one possible pair.', show: 'sum.0' },
        { say: 'Then use the rule that each row and column has each number once.', show: 'sum.1' },
        { say: 'And in a logic puzzle, list the possibilities for the strongest clue, then cross out any that break another. In part four, we find winning strategies for games. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
