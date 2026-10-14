import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/**
 * A 3 by 3 grid with a number (or letter) in each cell: label `c<r><c>`, row 0 at the top. The
 * lines and numbers form the group `grid`; each letter is a part of its own, with its answer as a
 * second label `s<r><c>` in the same spot, so the letter can be hidden and the answer shown.
 */
function grid(cells: string[][], answers: Record<string, string> = {}): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  for (let i = 0; i <= 3; i++) {
    Object.assign(points, { [`h${i}a`]: [0, i], [`h${i}b`]: [3, i], [`v${i}a`]: [i, 0], [`v${i}b`]: [i, 3] });
    items.push({ kind: 'line', id: `h${i}`, from: `h${i}a`, to: `h${i}b`, weight: 3, group: 'grid' }, { kind: 'line', id: `v${i}`, from: `v${i}a`, to: `v${i}b`, weight: 3, group: 'grid' });
  }
  cells.forEach((row, r) =>
    row.forEach((v, c) => {
      points[`p${r}${c}`] = [c + 0.5, 2.5 - r];
      const letter = /[A-Z]/.test(v);
      if (letter) items.push({ kind: 'label', id: `c${r}${c}`, at: `p${r}${c}`, tex: `\\text{${v}}`, tone: 'opp', place: 'center' });
      else items.push({ kind: 'label', id: `c${r}${c}`, at: `p${r}${c}`, tex: v, place: 'center', group: 'grid' });
      if (answers[v]) items.push({ kind: 'label', id: `s${r}${c}`, at: `p${r}${c}`, tex: answers[v], tone: 'good', place: 'center' });
    }),
  );
  return { points, items };
}

const video: Explainer = {
  id: 'm203-8-3-b',
  lessonId: 'm203-8-3',
  title: 'Numerical Puzzles and Games, Part 2: Magic Squares',
  thumbnailTitle: 'Magic Squares',
  thumbnail: 'sq',
  summary: 'What a magic square and its magic sum are, checking the 8-1-6 square (every line adds to 15), filling in a magic square with magic sum 45 one gap at a time, and why the centre number is one third of the magic sum.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.3 · Part 2', title: 'Magic Squares', subtitle: 'Every line, the same sum' }],
      lines: [
        { say: 'A magic square looks like a simple grid of numbers. But every row, every column and both diagonals add to the same number.', show: 'title' },
        { say: 'In this video, you will check a magic square, and fill in the missing numbers of another.' },
      ],
    },
    {
      chapter: 'Magic squares',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sq', [grid([['8', '1', '6'], ['3', '5', '7'], ['4', '9', '2']])], 380)],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Magic square', md: 'Every row, every column and both diagonals add to the same number, the **magic sum**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{row: } 8 + 1 + 6 = 15', '\\text{column: } 1 + 5 + 9 = 15', '\\text{diagonal: } 8 + 5 + 2 = 15'] },
      ],
      lines: [
        { say: 'In a magic square, every row, every column and both diagonals add to the same number, called the magic sum.', show: ['def', 'sq'] },
        { say: 'In this one, the top row is eight plus one plus six: fifteen.', show: 'm.0', focus: ['sq.c00', 'sq.c01', 'sq.c02', 'm.0'] },
        { say: 'The middle column is one plus five plus nine: also fifteen.', show: 'm.1', focus: ['sq.c01', 'sq.c11', 'sq.c21', 'm.1'] },
        { say: 'And a diagonal: eight plus five plus two, fifteen again. Every line adds to fifteen, so the magic sum is fifteen.', show: 'm.2', focus: ['sq.c00', 'sq.c11', 'sq.c22', 'm.2'] },
      ],
    },
    {
      chapter: 'Filling in a magic square',
      layout: 'split',
      leftWidth: 560,
      left: [figure('fill', [grid([['18', '16', '11'], ['A', '15', 'B'], ['19', 'C', 'D']], { A: '8', B: '22', C: '14', D: '12' })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['18 + 16 + 11 = 45', '\\text{A} = 45 - (18 + 19) = 8', '\\text{B} = 45 - (8 + 15) = 22', '\\text{C} = 45 - (16 + 15) = 14', '\\text{D} = 45 - (19 + 14) = 12'] }],
      lines: [
        { say: 'Find the missing numbers "A", B, C and D in this magic square. First, find the magic sum from a complete line. The top row is complete: 18 plus 16 plus 11 is 45.', show: ['fill.grid', 'fill.c10', 'fill.c12', 'fill.c21', 'fill.c22', 'm.0'], focus: ['fill.c00', 'fill.c01', 'fill.c02', 'm.0'] },
        { say: 'Now look for a line with only one gap. The left column has 18, "A" and 19, so "A" is 45 minus 37: eight.', show: ['m.1', 'fill.s10'], hide: 'fill.c10', focus: ['fill.s10', 'm.1'] },
        { say: 'With "A" known, the middle row has only B missing: eight plus fifteen plus B is 45, so B is 45 minus 23, which is 22.', show: ['m.2', 'fill.s12'], hide: 'fill.c12', focus: ['fill.s12', 'm.2'] },
        { say: 'The middle column: sixteen plus fifteen plus C is 45, so C is fourteen.', show: ['m.3', 'fill.s21'], hide: 'fill.c21', focus: ['fill.s21', 'm.3'] },
        { say: 'And the bottom row: nineteen plus fourteen plus D is 45, so D is twelve. Check a diagonal: 18 plus 15 plus 12 is 45. It works.', show: ['m.4', 'fill.s22'], hide: 'fill.c22', focus: ['fill.s22', 'fill.c00', 'fill.c11', 'm.4'] },
      ],
    },
    {
      chapter: 'The centre number',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Look for a line with one gap', md: 'Each step uses a row, column or diagonal with only **one** missing number. In a $3$ by $3$ magic square, the centre number is always one third of the magic sum: $15 = 45 \\div 3$, and $5 = 15 \\div 3$.' }],
      lines: [
        { say: 'Each step used a row, column or diagonal with only one missing number. Look for one of those every time.', show: 'tip' },
        { say: 'And here is a shortcut. In a three by three magic square, the centre number is always one third of the magic sum. Fifteen is 45 divided by three, and in the first square, five is fifteen divided by three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $3$ by $3$ magic square has a top row of $10,\\ 3,\\ 8$. Its left column is $10,\\ 5$ and a missing number. What is the missing number?',
          choices: ['$6$', '$21$', '$7$', '$15$'],
          answer: 0,
          working: 'The magic sum is $10 + 3 + 8 = 21$, so the missing number is $21 - (10 + 5) = 6$. C is the centre number, $21 \\div 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A three by three magic square has a top row of ten, three, eight. Its left column is ten, five, and a missing number. What is the missing number? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The magic sum is ten plus three plus eight, 21. So the missing number is 21 minus fifteen: six. C is the centre number, 21 divided by three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the magic sum from a complete line.', 'Fill a line that has only one gap.', 'In a 3 by 3 square, the centre is one third of the magic sum.'] }],
      lines: [
        { say: 'Let’s sum up. Find the magic sum from a complete line.', show: 'sum.0' },
        { say: 'Then fill a line that has only one gap, and repeat.', show: 'sum.1' },
        { say: 'And in a three by three magic square, the centre is one third of the magic sum. In part three, we solve cage puzzles and logic puzzles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
