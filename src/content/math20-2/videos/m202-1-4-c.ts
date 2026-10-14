import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** The lines of an n × n grid of unit squares with its bottom left corner at `ox`, as group `name`. */
function grid(points: Record<string, P>, items: DiagramItem[], name: string, n: number, ox: number) {
  for (let k = 0; k <= n; k++) {
    Object.assign(points, { [`${name}-h${k}a`]: [ox, k], [`${name}-h${k}b`]: [ox + n, k], [`${name}-v${k}a`]: [ox + k, 0], [`${name}-v${k}b`]: [ox + k, n] });
    items.push({ kind: 'line', id: `${name}-h${k}`, from: `${name}-h${k}a`, to: `${name}-h${k}b`, tone: 'ink', group: name });
    items.push({ kind: 'line', id: `${name}-v${k}`, from: `${name}-v${k}a`, to: `${name}-v${k}b`, tone: 'ink', group: name });
  }
}

/** A shaded square of side `s` with its bottom left corner at `at`. */
function square(points: Record<string, P>, items: DiagramItem[], id: string, at: P, s: number, tone: DiagramTone, group?: string) {
  const [x, y] = at;
  Object.assign(points, { [`${id}a`]: [x, y], [`${id}b`]: [x + s, y], [`${id}c`]: [x + s, y + s], [`${id}d`]: [x, y + s] });
  items.push({ kind: 'region', id, points: [`${id}a`, `${id}b`, `${id}c`, `${id}d`], tone, shade: 0.3, group });
}

/** The magic square 8 3 4 / ? 5 9 / 6 7 2, with the middle row and the first column to highlight. */
function magic(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  grid(points, items, 'grid', 3, 0);
  const rows = [['8', '3', '4'], ['?', '5', '9'], ['6', '7', '2']];
  rows.forEach((row, i) =>
    row.forEach((tex, j) => {
      const id = `n${i}${j}`;
      points[id] = [j + 0.5, 2.5 - i];
      if (tex === '?') items.push({ kind: 'label', id: 'q', at: id, tex: '?', tone: 'opp', place: 'center' });
      else items.push({ kind: 'label', id, at: id, tex, place: 'center', group: 'nums' });
    }),
  );
  items.push({ kind: 'label', id: 'one', at: 'n10', tex: '1', tone: 'good', place: 'center' });
  Object.assign(points, { ra: [0, 1], rb: [3, 1], rc: [3, 2], rd: [0, 2], ca: [0, 0], cb: [1, 0], cc: [1, 3], cd: [0, 3] });
  items.push({ kind: 'region', id: 'row', points: ['ra', 'rb', 'rc', 'rd'], tone: 'adj', shade: 0.25 });
  items.push({ kind: 'region', id: 'col', points: ['ca', 'cb', 'cc', 'cd'], tone: 'theta', shade: 0.25 });
  return { points, items };
}

/** Three 3 × 3 grids, with one square of each size shaded and the count of that size underneath. */
function sizes(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const tones: DiagramTone[] = ['adj', 'opp', 'theta'];
  const counts = ['9', '4', '1'];
  for (let s = 1; s <= 3; s++) {
    const ox = (s - 1) * 4.5;
    const name = `g${s}`;
    grid(points, items, name, 3, ox);
    square(points, items, `${name}-sq`, [ox, 3 - s], s, tones[s - 1], name);
    points[`${name}-c`] = [ox + 1.5, -0.15];
    items.push({ kind: 'label', id: `${name}-n`, at: `${name}-c`, tex: `${s} \\times ${s}:\\ ${counts[s - 1]}`, place: 'below', group: name });
  }
  return { points, items };
}

const video: Explainer = {
  id: 'm202-1-4-c',
  lessonId: 'm202-1-4',
  title: 'Reasoning to Solve Problems and Puzzles, Part 3: Spatial Puzzles',
  thumbnailTitle: 'Spatial Puzzles',
  thumbnail: 'sz',
  summary: 'Why the magic sum of a 3 × 3 magic square is 15, finding its missing number, and counting the 14 squares in a 3 × 3 grid one size at a time, without stopping at the 9 small ones.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.4 · Part 3', title: 'Spatial Puzzles', subtitle: 'Squares, sums and systems' }],
      lines: [
        { say: 'Some puzzles are about arrangements and shapes. They reward a system: a reason for every number, and a careful way to count.', show: 'title' },
        { say: 'In this video, you will complete a magic square, and count all the squares in a grid.' },
      ],
    },
    {
      chapter: 'A magic square',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'math', id: 'm', size: 'md', lines: ['1 + 2 + \\cdots + 9 = 45', '45 \\div 3 = 15', '? = 15 - 5 - 9 = 1', '\\text{Column 1: } 8 + 1 + 6 = 15'] }],
      right: [figure('ms', [magic()], 400)],
      lines: [
        { say: 'In a magic square, every row, every column, and both diagonals have the same sum, called the magic sum. This square uses the numbers one to nine.', show: ['ms.grid', 'ms.nums', 'ms.q'] },
        { say: 'Deductive reasoning gives the magic sum. The numbers one to nine add to forty-five, and the three rows share that total equally, so each row adds to fifteen.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'The middle row has two known numbers, five and nine. So the missing number is fifteen, minus five, minus nine, which is one.', show: ['ms.row', 'm.2'], focus: ['ms.row', 'm.2'], hide: 'ms.q' },
        { say: 'Check it with the first column: eight plus one plus six is fifteen. A diagonal works too: eight plus five plus two is also fifteen.', show: ['ms.one', 'ms.col', 'm.3'], focus: ['ms.col', 'm.3'], hide: 'ms.row' },
      ],
    },
    {
      chapter: 'Counting squares',
      layout: 'center',
      main: [figure('sz', [sizes()], 240), { kind: 'math', id: 'm', size: 'md', lines: ['9 + 4 + 1 = 14'] }],
      lines: [
        { say: 'How many squares are in a three by three grid? Counting problems need a system, so count one size at a time.', show: 'sz.g1' },
        { say: 'There are nine one by one squares.', focus: 'sz.g1' },
        { say: 'A two by two square can start in two positions across and two positions down, so there are four of them.', show: 'sz.g2', focus: 'sz.g2' },
        { say: 'And there is one three by three square: the whole grid. So there are nine plus four plus one, which is fourteen squares. The same system works for counting rectangles, or triangles, in a figure: one size or one case at a time.', show: ['sz.g3', 'm.0'], focus: ['sz.g3', 'm.0'] },
      ],
    },
    {
      chapter: 'Counting only the small squares',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting only the small squares', md: 'The answer is not $9$. Larger squares are made of several small ones, so work through every size, from $1 \\times 1$ up to the whole grid.' }],
      lines: [
        { say: 'A common mistake is to answer nine. The larger squares are made of several small ones, so work through every size, from one by one up to the whole grid.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many squares, of all sizes, are in a $4 \\times 4$ grid?',
          choices: ['$30$', '$16$', '$20$', '$25$'],
          answer: 0,
          working: '$16$ squares that are $1 \\times 1$, $9$ that are $2 \\times 2$, $4$ that are $3 \\times 3$ and $1$ that is $4 \\times 4$: $16 + 9 + 4 + 1 = 30$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many squares, of all sizes, are in a four by four grid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. There are sixteen one by one squares, nine two by two, four three by three, and one four by four. Sixteen plus nine plus four plus one is thirty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In a magic square, every row, column and diagonal has the same sum.', 'Use reasoning to find the magic sum and the missing numbers.', 'Count systematically, one size or one case at a time.'] }],
      lines: [
        { say: 'Let’s sum up. In a magic square, every row, column and diagonal has the same sum.', show: 'sum.0' },
        { say: 'Use reasoning to find the magic sum, and then the missing numbers.', show: 'sum.1' },
        { say: 'And count systematically, one size or one case at a time, so nothing is missed. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
