import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, squarePyramidNet, triangularPrismNet, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Unit squares with these lower-left corners, shaded, in the group `name`; `at` moves them all. */
function squares(name: string, cells: P[], tone: DiagramTone, at: P = [0, 0]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  cells.forEach(([cx, cy], i) => {
    const ids = [[0, 0], [1, 0], [1, 1], [0, 1]].map(([dx, dy], k) => {
      const id = `${name}${i}-${k}`;
      points[id] = [at[0] + cx + dx, at[1] + cy + dy];
      return id;
    });
    items.push({ kind: 'region', id: `${name}${i}`, points: ids, tone, shade: 0.2, group: name }, { kind: 'curve', id: `${name}${i}-edge`, points: ids, closed: true, weight: 2.5, group: name });
  });
  return { points, items };
}

/** A label (TeX) at a point of its own, in `group` when given. */
function note(id: string, at: P, tex: string, place: 'above' | 'below' | 'center' = 'center', group?: string): Part {
  return { points: { [`${id}-at`]: at }, items: [{ kind: 'label', id, at: `${id}-at`, tex, place, ...(group ? { group } : {}) }] };
}

/** Moves every point of a part. */
const shift = (p: Part, dx: number, dy = 0): Part => ({ points: Object.fromEntries(Object.entries(p.points).map(([k, [x, y]]) => [k, [x + dx, y + dy]])), items: p.items });

/** The top view of a stack of boxes: how many boxes stand on each square (front row first). */
const stacks: [P, number][] = [[[0, 0], 1], [[1, 0], 3], [[2, 0], 2], [[0, 1], 2], [[1, 1], 1]];

const video: Explainer = {
  id: 'm104-8-2-b',
  lessonId: 'm104-8-2',
  title: '3-D Objects, Part 2: Nets and Views',
  thumbnailTitle: 'Nets and Views',
  thumbnail: 'cube',
  summary: 'Nets that fold into a cube, a triangular prism and a square pyramid, six squares that will not fold into a cube, and the top and front views of a stack of boxes in a warehouse, where each column shows its tallest stack.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.2 · Part 2', title: 'Nets and Views', subtitle: 'Fold it up, look straight at it' }],
      lines: [
        { say: 'Box makers cut flat cardboard and fold it into boxes. Warehouse workers read flat drawings of stacks. Both jobs turn 3-D objects into flat pictures.', show: 'title' },
        { say: 'In this video, you will read nets, and draw the views of a stack of boxes.' },
      ],
    },
    {
      chapter: 'Nets',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('cube', [
          squares('band', [[0, 1], [1, 1], [2, 1], [3, 1]], 'brand'),
          squares('lids', [[0, 2], [1, 0]], 'good'),
        ]),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Net', md: 'A flat pattern that folds up into a 3-D object. Box makers cut nets out of cardboard.' }],
      lines: [
        { say: 'A net is a flat pattern that folds up into a 3-D object. Box makers cut nets out of cardboard, then fold along the lines.', show: 'def' },
        { say: 'This net has six squares, one for each face of a cube.', show: ['cube.band', 'cube.lids'] },
        { say: 'Picture the fold. The row of four squares wraps around to make the four sides.', focus: 'cube.band' },
        { say: 'The square above the row folds down to make the top, and the square below it folds up to make the bottom. So this net folds into a cube.', focus: 'cube.lids' },
      ],
    },
    {
      chapter: 'Not every net works',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('two', [
          squares('ok', [[0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 0]], 'good'),
          note('ok-mark', [2, -0.4], '\\checkmark', 'below', 'ok'),
          squares('no', [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]], 'bad', [6, 0]),
          note('no-mark', [8, -0.4], '\\times', 'below', 'no'),
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not every 6 squares make a cube', md: 'Squares in a $2$ by $2$ block will not fold into a cube: two squares land on the same face, and one face is left open.' }],
      lines: [
        { say: 'Six squares is not enough on its own. The way the squares are joined matters too.', show: 'two.ok' },
        { say: 'This pattern has four squares in a two by two block. When you fold it, two squares end up on the same face, and one face is left open. It will not fold into a cube, and neither will five squares in a row.', show: ['two.no', 'oops'] },
        { say: 'So picture the fold before you cut.' },
      ],
    },
    {
      chapter: 'Prism and pyramid nets',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('nets', [
          triangularPrismNet({ name: 'tn', a: 2, b: 2, c: 2, l: 3 }),
          shift(squarePyramidNet({ name: 'pn', b: 2, s: 1.8 }), 9.4),
        ]),
      ],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Pyramid nets', md: 'A net with $1$ square and $4$ triangles around it folds into a **square pyramid**. The triangles fold up and meet at the top.' }],
      lines: [
        { say: 'Liam folds up this net. What 3-D object does it make?', show: ['nets.tn-strip', 'nets.tn-bases'] },
        { say: 'The net has two triangles. They are the two ends.', focus: 'nets.tn-bases' },
        { say: 'The three rectangles wrap around to join the ends. Two triangle ends joined by rectangles: it folds into a triangular prism.', focus: 'nets.tn-strip' },
        { say: 'A net with one square and four triangles around it folds into a square pyramid. The square is the base, and the four triangles fold up and meet at the top.', show: ['nets.pn-base', 'nets.pn-sides', 'tip'], focus: ['nets.pn-base', 'nets.pn-sides'] },
      ],
    },
    {
      chapter: 'Top and front views',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('v', [
          squares('top', stacks.map(([c]) => c), 'brand'),
          ...stacks.map(([[x, y], k], i) => note(`n${i}`, [x + 0.5, y + 0.5], String(k), 'center', 'top')),
          note('top-title', [1.5, 2.3], '\\text{Top view}', 'above', 'top'),
          note('front-arrow', [1.5, -0.2], '\\text{front}', 'below', 'top'),
          squares('front', [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]], 'theta', [5, 0]),
          note('front-title', [6.5, 3.3], '\\text{Front view}', 'above', 'front'),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 + 3 + 2 + 2 + 1 = 9', '\\text{front view: } 2,\\ 3,\\ 2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of looking', md: 'From the front, a shorter stack hides behind a taller one. Use the **tallest** stack in each column.' },
      ],
      lines: [
        { say: 'A view is the flat picture you see when you look straight at an object from one side. The top view is from above, and the front view is from the front.' },
        { say: 'This is the top view of a stack of boxes in a warehouse. Each number tells how many boxes are stacked on that square.', show: 'v.top' },
        { say: 'To find the total, add the numbers: one plus three plus two plus two plus one is nine boxes.', show: 'm.0', focus: 'm.0' },
        { say: 'From the front, you see each column from left to right, and the height you see is the tallest stack in that column. The left column has stacks of one and two, so you see two. The middle has three and one, so you see three. And the right column shows two.', show: ['v.front', 'm.1'], focus: ['v.front', 'm.1'] },
        { say: 'Do not add the stacks in a column. The shorter stack hides behind the taller one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a top view, one column has a stack of $4$ boxes with a stack of $1$ box behind it. How many boxes high is that column in the front view?',
          choices: ['$4$', '$5$', '$1$', '$3$'],
          answer: 0,
          working: 'The front view shows the tallest stack in the column: $4$ boxes.',
        },
      ],
      lines: [
        { say: 'Your turn. In a top view, one column has a stack of four boxes, with a stack of one box behind it. How many boxes high is that column in the front view? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, four. The front view shows the tallest stack, and the stack of one hides behind it. B adds the stacks instead of looking.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A net is a flat pattern that folds into a 3-D object.', 'Picture the fold: not every 6 squares make a cube.', 'In a front view, each column shows its tallest stack.'] }],
      lines: [
        { say: 'Let’s sum up. A net is a flat pattern that folds into a 3-D object.', show: 'sum.0' },
        { say: 'Picture the fold before you cut: not every six squares make a cube.', show: 'sum.1' },
        { say: 'And in a front view, each column shows its tallest stack. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
