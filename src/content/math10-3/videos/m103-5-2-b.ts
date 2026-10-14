import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const pond = plane({ x: [0, 8], y: [0, 6], every: 0 });
const lot = plane({ x: [0, 80], y: [0, 70], xStep: 10, yStep: 10, every: 0, width: 8, height: 7 });
// Each square is clearly full or partly covered: 12 full and 15 partly, true area about 18.6.
const slough: [number, number][] = [[6.7, 3], [6.9, 3.9], [6.5, 4.8], [5.3, 5.3], [4, 5], [3.1, 4.5], [2.5, 4.2], [1.6, 4.3], [1, 4], [0.5, 3.2], [0.5, 2.4], [1.8, 1.4], [2.9, 1.35], [4, 1.3], [5, 1.4], [5.8, 1.8], [6.2, 2.2], [6.7, 3]];

const video: Explainer = {
  id: 'm103-5-2-b',
  lessonId: 'm103-5-2',
  title: 'Composite and Irregular Areas, Part 2: Irregular Shapes',
  thumbnailTitle: 'Irregular Areas',
  thumbnail: 'pond',
  summary: 'Estimating the area of an irregular shape on a grid by counting full squares and half of the partly covered ones, scaling by the area of one square, and finding a straight-edged lot exactly with a rectangle and a triangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.2 · Part 2', title: 'Irregular Shapes', subtitle: 'Estimating with a grid' }],
      lines: [
        { say: 'A slough in a pasture has no straight edges at all. How can you find its area?', show: 'title' },
        { say: 'In this video, you will estimate irregular areas on a grid, and split a straight-edged lot into simple shapes.' },
      ],
    },
    {
      chapter: 'Counting squares',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pond', [pond, polyline(pond, { id: 'edge', points: slough })])],
      right: [
        { kind: 'bullets', id: 'b', items: ['Count the squares **completely** inside.', 'Count the squares **partly** inside.', 'Add **half** of the partly covered squares.'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['12 + 15 \\div 2 = 19.5\\text{ m}^2'] },
      ],
      lines: [
        { say: 'An irregular shape has curved or uneven edges that match no formula, like a pond, an oil spill, or a patch of hail damage. To estimate its area, draw it on a grid. Here, each square is one square metre.', show: ['pond.grid', 'pond.edge'] },
        { say: 'First, count the squares that are completely inside the shape: twelve.', show: 'b.0' },
        { say: 'Then count the squares that are partly inside: fifteen. On average, they are about half full, so they are worth about seven and a half full squares.', show: ['b.1', 'b.2'] },
        { say: 'So the slough covers about twelve plus 7.5: 19.5 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Two people may count one or two squares differently, and that is fine: an estimate should be close, not exact. If each square stands for more, say twenty-five square metres, multiply your count by that.' },
      ],
    },
    {
      chapter: 'A building lot',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('lot', [
          lot,
          polyline(lot, { id: 'edge', points: [[10, 10], [70, 10], [70, 40], [10, 60], [10, 10]], labels: ['60\\text{ m}', '30\\text{ m}', '', '50\\text{ m}'], sides: ['right', 'right', 'right', 'right'] }),
          polyline(lot, { id: 'split', points: [[10, 40], [70, 40]], tone: 'opp', dashed: true }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['60 \\times 30 = 1800\\text{ m}^2', '\\tfrac12 \\times 60 \\times (50 - 30) = 600\\text{ m}^2', '1800 + 600 = 2400\\text{ m}^2'] }],
      lines: [
        { say: 'When an irregular shape has straight edges, you can find its area exactly by splitting it into rectangles and right triangles. This building lot is drawn on a grid of ten-metre squares. Its bottom edge is 60 metres, the right edge thirty, and the left edge fifty.', show: ['lot.grid', 'lot.edge'] },
        { say: 'The rectangle below the dashed line is sixty by thirty: 1,800 square metres.', show: ['lot.split', 'm.0'], focus: ['lot.split', 'm.0'] },
        { say: 'The triangle on top has legs of sixty metres, and fifty minus thirty, twenty metres. Half of sixty times twenty is 600 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'So the lot has an area of 2,400 square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a grid of $1\\text{ m}^2$ squares, a pond covers $20$ full squares and $12$ partly covered squares. Estimate its area.',
          choices: ['about $26\\text{ m}^2$', 'about $32\\text{ m}^2$', 'about $20\\text{ m}^2$', 'about $16\\text{ m}^2$'],
          answer: 0,
          working: 'Full squares plus half of the partly covered ones: $20 + 12 \\div 2 = 26\\text{ m}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. On a grid of one-square-metre squares, a pond covers twenty full squares, and twelve partly covered squares. Estimate its area. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty full squares, plus half of twelve, which is six: about 26 square metres. B counts every partly covered square as full.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Estimate: full squares + half of the partly covered squares.', 'Multiply by the area of one square if it is not 1 square unit.', 'Straight edges: split into rectangles and triangles.'] }],
      lines: [
        { say: 'Let’s sum up. To estimate an irregular area, count the full squares, plus half of the partly covered ones.', show: 'sum.0' },
        { say: 'If each square is bigger than one square unit, multiply by the area of one square.', show: 'sum.1' },
        { say: 'And when the edges are straight, split the shape into rectangles and triangles. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
