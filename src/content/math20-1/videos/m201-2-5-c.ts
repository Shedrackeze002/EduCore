import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Angles of elevation of 28° from A and 52° from B, 40 m closer, to the top of a tree (0.08 scale). */
const tree: Part = (() => {
  const points: Record<string, P> = { A: [0, 0], B: [3.2, 0], F: [5.47, 0], T: [5.47, 2.91] };
  const items: DiagramItem[] = [
    { kind: 'thing', id: 'tree', type: 'tree', at: 'F', top: 'T' },
    { kind: 'line', id: 'ground', from: 'A', to: 'F', tone: 'muted', group: 'base' },
    { kind: 'line', id: 'AB', from: 'A', to: 'B', tone: 'adj', label: '40\\text{ m}', labelSide: 'right', group: 'base' },
    { kind: 'line', id: 'AT', from: 'A', to: 'T', tone: 'muted', dashed: true, group: 'sights' },
    { kind: 'line', id: 'BT', from: 'B', to: 'T', tone: 'opp', label: 'BT', labelSide: 'left', group: 'sights' },
    { kind: 'angle', id: 'aA', at: 'A', from: 'F', to: 'T', label: '28^\\circ', group: 'sights' },
    { kind: 'angle', id: 'aB', at: 'B', from: 'F', to: 'T', label: '52^\\circ', group: 'sights' },
    { kind: 'angle', id: 'aB2', at: 'B', from: 'A', to: 'T', label: '128^\\circ', tone: 'hyp', r: 30, labelDist: 70 },
    { kind: 'line', id: 'h', from: 'F', to: 'T', tone: 'good', label: 'h', labelSide: 'right' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'below' },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below' },
    { kind: 'label', id: 'nT', at: 'T', tex: 'T', place: 'above right' },
  ];
  return { points, items };
})();

/** A 12 km paddle east, a 40° turn to the left, then 9 km (0.25 scale). */
const lake: Part = (() => {
  const t = (40 * Math.PI) / 180;
  const points: Record<string, P> = { S: [0, 0], T: [3, 0], X: [4.4, 0], E: [3 + 2.25 * Math.cos(t), 2.25 * Math.sin(t)] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ST', from: 'S', to: 'T', tone: 'adj', label: '12\\text{ km}', labelSide: 'right' },
    { kind: 'line', id: 'TE', from: 'T', to: 'E', tone: 'adj', label: '9\\text{ km}', labelSide: 'right', labelAt: 0.8 },
    { kind: 'line', id: 'ahead', from: 'T', to: 'X', tone: 'muted', dashed: true, group: 'turn' },
    { kind: 'angle', id: 'a40', at: 'T', from: 'X', to: 'E', label: '40^\\circ', r: 44, labelDist: 104, group: 'turn' },
    { kind: 'angle', id: 'a140', at: 'T', from: 'S', to: 'E', label: '140^\\circ', tone: 'hyp', r: 30, labelDist: 62 },
    { kind: 'line', id: 'SE', from: 'S', to: 'E', tone: 'opp', dashed: true, label: '?', labelSide: 'left' },
    { kind: 'label', id: 'nS', at: 'S', tex: 'S', place: 'below left' },
    { kind: 'label', id: 'nT', at: 'T', tex: 'T', place: 'below' },
    { kind: 'label', id: 'nE', at: 'E', tex: 'E', place: 'above right' },
  ];
  return { points, items };
})();

const video: Explainer = {
  id: 'm201-2-5-c',
  lessonId: 'm201-2-5',
  title: 'The Cosine Law, Part 3: Two-Step Problems',
  thumbnailTitle: 'Two-Step Triangle Problems',
  thumbnail: 'tree',
  summary: 'Two problems that need more than one law: the height of a tree from two angles of elevation 40 m apart (the sine law, then a primary ratio), and the distance across a lake after a 40° turn (the cosine law), keeping unrounded values between steps.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.5 · Part 3', title: 'Two-Step Problems', subtitle: 'One law finds a piece, another finishes' }],
      lines: [
        { say: 'Many real problems take two steps. One law finds a missing piece, and the other law, or a primary ratio, finishes the job.', show: 'title' },
        { say: 'In this video, you will find the height of a tree, and the distance across a lake.' },
      ],
    },
    {
      chapter: 'The height of a tree',
      layout: 'split',
      leftWidth: 540,
      left: [figure('tree', [tree])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle ABT = 180^\\circ - 52^\\circ = 128^\\circ', '\\angle ATB = 180^\\circ - 28^\\circ - 128^\\circ', '\\dfrac{BT}{\\sin 28^\\circ} = \\dfrac{40}{\\sin 24^\\circ}', 'BT \\approx 46.17\\text{ m}', 'h = BT\\sin 52^\\circ \\approx 36.4\\text{ m}'] }],
      lines: [
        { say: 'From point A, the angle of elevation to the top of a tree is 28 degrees. After walking forty metres toward the tree, to point B, the angle of elevation is 52 degrees. How tall is the tree?', show: ['tree.tree', 'tree.base', 'tree.sights', 'tree.nA', 'tree.nB', 'tree.nT'] },
        { say: 'Look at triangle ABT. The angle at B inside it is 180 minus 52: 128 degrees. So the angle at the top, T, is 180 minus 28 minus 128: 24 degrees.', show: ['tree.aB2', 'm.0', 'm.1'], focus: ['tree.aB2', 'm.0', 'm.1'] },
        { say: 'Now the forty-metre side pairs with the 24-degree angle. Use the sine law: BT over sine 28 equals forty over sine 24, so BT is about 46.17 metres.', show: ['m.2', 'm.3'], focus: ['tree.BT', 'm.3'] },
        { say: 'Finally, the right triangle under the tree: the height is BT sine 52. Keep the unrounded value of BT: the tree is about 36.4 metres tall.', show: ['tree.h', 'm.4'], focus: ['tree.h', 'm.4'] },
      ],
    },
    {
      chapter: 'Paddling across a lake',
      layout: 'center',
      main: [
        figure('lake', [lake], 250),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle T = 180^\\circ - 40^\\circ = 140^\\circ', 'SE^2 = 12^2 + 9^2 - 2(12)(9)\\cos 140^\\circ', 'SE^2 \\approx 390.47,\\quad SE \\approx 19.8\\text{ km}'] },
      ],
      lines: [
        { say: 'Ji-woo paddles twelve kilometres from S to T, turns forty degrees to the left, and paddles nine kilometres to E. How far is E from S?', show: ['lake.ST', 'lake.TE', 'lake.turn', 'lake.nS', 'lake.nT', 'lake.nE'] },
        { say: 'The forty degrees is measured from the direction she was heading, not inside the triangle. So the angle inside the triangle at T is 180 minus forty: 140 degrees.', show: ['lake.a140', 'm.0'], focus: ['lake.a140', 'm.0'] },
        { say: 'Two sides and the angle between them: SAS, so use the cosine law. S E squared is twelve squared plus nine squared, minus two times twelve times nine times cosine 140.', show: ['lake.SE', 'm.1'], focus: 'm.1' },
        { say: 'The cosine of 140 is negative, so the last term adds: S E squared is about 390.47, and S E is about 19.8 kilometres.', show: 'm.2', focus: ['lake.SE', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has two sides of $10$ m and $14$ m, with a $35^\\circ$ angle between them. Which law finds the third side?',
          choices: ['the cosine law', 'the sine law', 'SOH CAH TOA', 'the Pythagorean theorem'],
          answer: 0,
          working: 'Two sides and the contained angle (SAS): there is no complete side–angle pair, so use the cosine law.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has two sides of ten and fourteen metres, with a 35-degree angle between them. Which law finds the third side? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two sides and the angle between them give no complete pair, so the sine law cannot start. Use the cosine law. C and D need a right angle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch the problem, and find the triangle you can solve first.', 'Turn angles from directions into angles inside the triangle.', 'Keep unrounded values between steps.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the problem, and find the triangle you can solve first.', show: 'sum.0' },
        { say: 'Turn angles measured from directions or the ground into angles inside the triangle.', show: 'sum.1' },
        { say: 'And keep unrounded values between steps. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
