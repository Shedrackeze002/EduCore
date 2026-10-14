import type { DiagramItem, Explainer } from '@/video/script.ts';
import { transversal } from '@/video/angles.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/**
 * Parallel lines m and n with a bent path between them: from A on m down to the bend B, and back
 * to C on n. The path makes 35° with m at A and 50° with n at C, so the bend is 85°. `extra` is
 * the dashed line through B, parallel to m and n, and its two angles `up` and `low`.
 */
function bend(): Part {
  const points: Record<string, P> = {
    mW: [0, 6.1], mE: [9.4, 6.1], nW: [0, 0.9], nE: [9.4, 0.9],
    A: [3.04, 6.1], B: [6.76, 3.5], C: [4.58, 0.9],
    pW: [1.2, 3.5], pE: [9.4, 3.5],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'm', from: 'mW', to: 'mE', group: 'lines' },
    { kind: 'line', id: 'n', from: 'nW', to: 'nE', group: 'lines' },
    { kind: 'label', id: 'm-name', at: 'mE', tex: 'm', place: 'right', group: 'lines' },
    { kind: 'label', id: 'n-name', at: 'nE', tex: 'n', place: 'right', group: 'lines' },
    { kind: 'line', id: 'AB', from: 'A', to: 'B', tone: 'adj', group: 'path' },
    { kind: 'line', id: 'BC', from: 'B', to: 'C', tone: 'adj', group: 'path' },
    { kind: 'angle', id: 'top', at: 'A', from: 'mE', to: 'B', label: '35^\\circ', r: 40 },
    { kind: 'angle', id: 'bot', at: 'C', from: 'nE', to: 'B', label: '50^\\circ', r: 40 },
    { kind: 'angle', id: 'x', at: 'B', from: 'A', to: 'C', label: 'x', r: 30 },
    { kind: 'line', id: 'p', from: 'pW', to: 'pE', tone: 'muted', dashed: true, group: 'extra' },
    { kind: 'angle', id: 'up', at: 'B', from: 'A', to: 'pW', label: '35^\\circ', r: 46, labelDist: 82, group: 'extra' },
    { kind: 'angle', id: 'low', at: 'B', from: 'pW', to: 'C', label: '50^\\circ', r: 46, labelDist: 82, group: 'extra' },
  ];
  // A chevron on each line, near its left end, to mark them parallel.
  for (const [key, y] of [['m', 6.1], ['n', 0.9]] as const) {
    Object.assign(points, { [`${key}k1`]: [0.65, y + 0.25], [`${key}k2`]: [1.0, y], [`${key}k3`]: [0.65, y - 0.25] });
    items.push(
      { kind: 'line', id: `${key}-mark1`, from: `${key}k1`, to: `${key}k2`, tone: 'brand', group: 'lines' },
      { kind: 'line', id: `${key}-mark2`, from: `${key}k3`, to: `${key}k2`, tone: 'brand', group: 'lines' },
    );
  }
  return { points, items };
}

const numbered = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' };

const video: Explainer = {
  id: 'm202-2-1-c',
  lessonId: 'm202-2-1',
  title: 'Angles Formed by Parallel Lines, Part 3: Extra Lines and Proving Lines Parallel',
  thumbnailTitle: 'Proving Lines Parallel',
  thumbnail: 'bd',
  summary: 'Drawing an extra parallel line through a bend to find an 85° angle, the converses that prove two lines are parallel, why 72° and 66° corresponding angles mean the lines are not parallel, and a two-column proof that m ∥ n.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.1 · Part 3', title: 'Proving Lines Parallel', subtitle: 'Extra lines and converses' }],
      lines: [
        { say: 'Sometimes the angle you need is not on a single transversal. And sometimes the question is the other way round: are these lines parallel at all?', show: 'title' },
        { say: 'In this video, you will draw an extra line to find an angle, and prove that two lines are parallel.' },
      ],
    },
    {
      chapter: 'A bend between parallel lines',
      layout: 'split',
      leftWidth: 600,
      left: [figure('bd', [bend()], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{upper part} = 35^\\circ', '\\text{lower part} = 50^\\circ', 'x = 35^\\circ + 50^\\circ = 85^\\circ'] }],
      lines: [
        { say: 'Lines m and n are parallel. A path leaves m at thirty-five degrees, bends, and meets n at fifty degrees. Find x, the angle at the bend.', show: ['bd.lines', 'bd.path', 'bd.top', 'bd.bot', 'bd.x'], focus: 'bd.x' },
        { say: 'There is no single transversal here. So draw an extra line through the bend, parallel to m and n. It splits x into two parts.', show: 'bd.p', focus: 'bd.p' },
        { say: 'The upper part and the thirty-five degree angle are alternate interior angles between m and the new line, so the upper part is thirty-five degrees.', show: ['bd.up', 'm.0'], focus: ['bd.top', 'bd.up', 'm.0'], hide: 'bd.x' },
        { say: 'In the same way, the lower part and the fifty degree angle are alternate interior angles, so the lower part is fifty degrees. Then x is thirty-five plus fifty, which is eighty-five degrees.', show: ['bd.low', 'm.1', 'm.2'], focus: ['bd.bot', 'bd.low', 'm.2'] },
      ],
    },
    {
      chapter: 'Proving lines are parallel',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cv', [transversal({ deg: 72, turn: 6, labels: { 2: '72^\\circ', 6: '66^\\circ' } })])],
      right: [{ kind: 'bullets', id: 'b', items: ['Corresponding angles are equal, or', 'alternate angles are equal, or', 'same-side interior angles add to $180^\\circ$.'] }],
      lines: [
        { say: 'Each property has a converse. If a transversal crosses two lines, and any one of these is true, then the lines are parallel.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Here, the angles marked seventy-two and sixty-six degrees are corresponding angles. Is m parallel to n?', show: ['cv.lines', 'cv.a2', 'cv.a6'], focus: ['cv.a2', 'cv.a6'] },
        { say: 'For the lines to be parallel, corresponding angles must be equal. Seventy-two is not sixty-six, so m and n are not parallel, even though they might look close.', focus: 'b.0' },
      ],
    },
    {
      chapter: 'A two-column proof',
      layout: 'split',
      leftWidth: 500,
      left: [figure('tc', [transversal({ deg: 60, labels: numbered })])],
      right: [{ kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$\\angle 2 = \\angle 7$', 'Given'], ['$\\angle 7 = \\angle 6$', 'Vertically opposite angles'], ['$\\angle 2 = \\angle 6$', 'Transitive property'], ['$m \\parallel n$', 'Corresponding angles equal']] }],
      lines: [
        { say: 'A two-column proof writes each statement beside its reason. Suppose you only know that angle two equals angle seven. Prove that m is parallel to n.', show: ['tc.m', 'tc.n', 'tc.t', 'tc.m-name', 'tc.n-name', 'tc.t-name', 'tc.a2', 'tc.a7', 't.0'], focus: ['tc.a2', 'tc.a7', 't.0'] },
        { say: 'Angle seven equals angle six, because they are vertically opposite.', show: ['tc.a6', 't.1'], focus: ['tc.a7', 'tc.a6', 't.1'] },
        { say: 'Two things equal to the same thing are equal to each other, so angle two equals angle six. That is the transitive property.', show: 't.2', focus: ['tc.a2', 'tc.a6', 't.2'] },
        { say: 'Angles two and six are corresponding angles, and they are equal, so m is parallel to n.', show: ['t.3', 'tc.marks'], focus: ['t.3', 'tc.marks'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A transversal crosses two lines. A pair of same-side interior angles measure $95^\\circ$ and $85^\\circ$. Are the lines parallel?',
          choices: ['Yes: the angles add to $180^\\circ$.', 'No: the angles are not equal.', 'Yes: both angles are acute.', 'No: the angles add to $180^\\circ$.'],
          answer: 0,
          working: '$95^\\circ + 85^\\circ = 180^\\circ$, so the same-side interior angles are supplementary, and the lines are parallel.',
        },
      ],
      lines: [
        { say: 'Your turn. A transversal crosses two lines. A pair of same-side interior angles measure ninety-five and eighty-five degrees. Are the lines parallel? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ninety-five plus eighty-five is 180, and same-side interior angles that add to 180 mean the lines are parallel. They do not need to be equal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An extra parallel line can create the angle pairs you need.', 'Lines are parallel if corresponding or alternate angles are equal, or same-side interior angles add to $180^\\circ$.', 'In a two-column proof, every statement has a reason.'] }],
      lines: [
        { say: 'Let’s sum up. An extra line, parallel to the others, can create the angle pairs you need.', show: 'sum.0' },
        { say: 'Two lines are parallel if corresponding or alternate angles are equal, or if same-side interior angles add to 180 degrees.', show: 'sum.1' },
        { say: 'And in a two-column proof, every statement has a reason. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
