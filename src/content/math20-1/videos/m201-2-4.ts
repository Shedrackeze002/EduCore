import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/**
 * ∠A = 35°, b = 14 and a = 9, drawn at 0.4 scale: side a swings from C like a gate and crosses
 * the base twice, at B₁ and B₂.
 */
const gate: Part = (() => {
  const s = 0.4;
  const C: P = [14 * Math.cos((35 * Math.PI) / 180), 14 * Math.sin((35 * Math.PI) / 180)];
  const reach = Math.sqrt(81 - C[1] * C[1]);
  const points: Record<string, P> = { A: [0, 0], E: [17.5 * s, 0], C: [C[0] * s, C[1] * s], B1: [(C[0] + reach) * s, 0], B2: [(C[0] - reach) * s, 0] };
  const arc: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = ((-135 + (90 * i) / 24) * Math.PI) / 180;
    points[`s${i}`] = [(C[0] + 9 * Math.cos(t)) * s, (C[1] + 9 * Math.sin(t)) * s];
    arc.push(`s${i}`);
  }
  const items: DiagramItem[] = [
    { kind: 'line', id: 'base', from: 'A', to: 'E', tone: 'muted', weight: 2, arrow: true },
    { kind: 'line', id: 'b', from: 'A', to: 'C', tone: 'adj', label: 'b = 14', labelSide: 'left' },
    { kind: 'angle', id: 'aA', at: 'A', from: 'E', to: 'C', label: '35^\\circ' },
    { kind: 'curve', id: 'swing', points: arc, tone: 'muted', dashed: true },
    { kind: 'line', id: 'a1', from: 'C', to: 'B1', tone: 'opp', label: 'a = 9', labelSide: 'left', group: 't1' },
    { kind: 'line', id: 'a2', from: 'C', to: 'B2', tone: 'opp', dashed: true, group: 't2' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'below left' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'above' },
    { kind: 'label', id: 'nB1', at: 'B1', tex: 'B_1', place: 'below right', group: 't1' },
    { kind: 'label', id: 'nB2', at: 'B2', tex: 'B_2', place: 'below', group: 't2' },
  ];
  return { points, items };
})();

const video: Explainer = {
  id: 'm201-2-4',
  lessonId: 'm201-2-4',
  title: 'The Ambiguous Case, Part 1: How Many Triangles?',
  thumbnailTitle: 'The Ambiguous Case',
  thumbnail: 'gate',
  summary: 'Why two sides and a non-included angle (SSA) can give two triangles, the height h = b sin A, and how comparing side a with h and with b counts zero, one or two triangles, for an acute and for an obtuse angle. Part 2 solves both triangles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.4 · Part 1', title: 'The Ambiguous Case', subtitle: 'Zero, one or two triangles' }],
      lines: [
        { say: 'Tell three friends to draw a triangle with angle A equal to 35 degrees, side b fourteen centimetres, and side "a" nine centimetres. They might not all draw the same triangle, and none of them would be wrong.', show: 'title' },
        { say: 'In this video, you will see why, and count how many triangles some information gives.' },
      ],
    },
    {
      chapter: 'A swinging gate',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gate', [gate])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Ambiguous case', md: 'Two sides and an angle **opposite one of them** (SSA). There may be no triangle, one triangle, or two.' }],
      lines: [
        { say: 'Start with angle A and side b fixed. Side "a" hangs from C, and must reach the base line.', show: ['gate.base', 'gate.b', 'gate.aA', 'gate.nA', 'gate.nC'] },
        { say: 'Picture side "a" as a gate swinging from C. It might miss the base, touch it once, or cross it in two places.', show: 'gate.swing', focus: 'gate.swing' },
        { say: 'Here it crosses the base at B one and at B two. So triangle A B one C and triangle A B two C both fit the information.', show: ['gate.t1', 'gate.t2'], focus: ['gate.t1', 'gate.t2'] },
        { say: 'This is the ambiguous case: two sides, and an angle opposite one of them. There may be no triangle, one, or two.', show: 'def' },
      ],
    },
    {
      chapter: 'Counting the triangles',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['h = b\\sin A'] },
        { kind: 'table', id: 't', head: ['$\\angle A$ acute', 'Number of triangles'], rows: [['$a < h$', 'none: $a$ is too short'], ['$a = h$', 'one right triangle'], ['$h < a < b$', '[[good:two]]'], ['$a \\ge b$', 'one']] },
      ],
      lines: [
        { say: 'The height from C to the base is h equals b sine A. Compare side "a", the side opposite the given angle, with h and with b.', show: 'm.0', focus: 'm.0' },
        { say: 'If "a" is shorter than h, it is too short to reach the base: no triangle. If "a" equals h, it just touches: one right triangle.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'If "a" is between h and b, the gate crosses the base twice: two triangles. And if "a" is at least as long as b, it crosses only once on the far side: one triangle.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Using the height',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['h = 12\\sin 30^\\circ = 6\\text{ cm}', 'a = 4 < 6: \\text{ none}\\qquad a = 6: \\text{ one right triangle}', '6 < 9 < 12: \\text{ two}\\qquad a = 15 \\ge 12: \\text{ one}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'The sine law will not warn you. Take only the acute angle and you may miss a second triangle; if $a < h$, $\\sin B$ comes out greater than $1$.' },
      ],
      lines: [
        { say: 'Angle A is thirty degrees, and side b is twelve centimetres. How many triangles are there when side "a" is four, six, nine or fifteen centimetres? First, the height: twelve sine thirty is six centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Four is less than six: no triangle. Six equals the height: one right triangle.', show: 'm.1', focus: 'm.1' },
        { say: 'Nine is between six and twelve: two triangles. And fifteen is at least twelve: one triangle.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check SSA information first. The sine law will not warn you: take only the calculator’s acute angle and you may miss a second triangle. And if "a" is shorter than h, the sine of B comes out greater than one, which is impossible.', show: 'oops' },
      ],
    },
    {
      chapter: 'An obtuse angle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\angle A = 110^\\circ,\\quad b = 15\\text{ m}', 'a = 12 < 15: \\text{ no triangle}', 'a = 18 > 15: \\text{ one triangle}'] }],
      lines: [
        { say: 'When angle A is obtuse, it is the largest angle of the triangle, so side "a" must be the longest side. That gives one triangle if "a" is longer than b, and none otherwise.', show: 'm.0' },
        { say: 'Angle A is 110 degrees and side b is fifteen metres. If "a" is twelve metres, it is shorter than b: no triangle.', show: 'm.1', focus: 'm.1' },
        { say: 'If "a" is eighteen metres, it is longer than b: exactly one triangle.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\angle A = 40^\\circ$, $b = 10$ cm and $a = 8$ cm. How many triangles are possible?',
          choices: ['two', 'one', 'none', 'three'],
          answer: 0,
          working: '$h = 10\\sin 40^\\circ \\approx 6.43$, and $6.43 < 8 < 10$, so there are two triangles.',
        },
      ],
      lines: [
        { say: 'Your turn. Angle A is forty degrees, side b is ten centimetres, and side "a" is eight centimetres. How many triangles are possible? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The height is ten sine forty, about 6.43. Eight is between 6.43 and ten, so there are two triangles.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['SSA can give zero, one or two triangles.', 'For an acute $\\angle A$: two triangles when $b\\sin A < a < b$.', 'For an obtuse $\\angle A$: one triangle if $a > b$, none otherwise.'] }],
      lines: [
        { say: 'Let’s sum up. Two sides and a non-included angle can give zero, one or two triangles.', show: 'sum.0' },
        { say: 'For an acute angle A, compare "a" with the height, b sine A, and with b. There are two triangles when "a" is between them.', show: 'sum.1' },
        { say: 'And for an obtuse angle A, there is one triangle if "a" is longer than b, and none otherwise. In part two, we solve both triangles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
