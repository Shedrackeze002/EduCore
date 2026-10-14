import type { DiagramItem, Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A tick mark across the middle of the side from `p` to `q`, to show equal sides. */
function ticks(sides: [P, P][]): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  sides.forEach(([p, q], i) => {
    const [mx, my] = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const [ux, uy] = [-(q[1] - p[1]) / len, (q[0] - p[0]) / len];
    Object.assign(points, { [`k${i}a`]: [mx - 0.3 * ux, my - 0.3 * uy], [`k${i}b`]: [mx + 0.3 * ux, my + 0.3 * uy] });
    items.push({ kind: 'line', id: `k${i}`, from: `k${i}a`, to: `k${i}b`, tone: 'opp', weight: 3, group: 'ticks' });
  });
  return { points, items };
}

/** Triangle ABC (angles 50°, 70°, 60°) with D on AB and E on AC, and DE parallel to BC. */
function parallelSide(): Part {
  const points: Record<string, P> = { A: [2.32, 6.37], B: [0, 0], C: [6, 0], D: [0.7, 1.91], E: [4.9, 1.91] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'AB', from: 'A', to: 'B', group: 'shape' },
    { kind: 'line', id: 'AC', from: 'A', to: 'C', group: 'shape' },
    { kind: 'line', id: 'BC', from: 'B', to: 'C', tone: 'brand', group: 'shape' },
    { kind: 'line', id: 'DE', from: 'D', to: 'E', tone: 'brand', group: 'shape' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'above', group: 'shape' },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below left', group: 'shape' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'below right', group: 'shape' },
    { kind: 'label', id: 'nD', at: 'D', tex: 'D', place: 'left', group: 'shape' },
    { kind: 'label', id: 'nE', at: 'E', tex: 'E', place: 'right', group: 'shape' },
    { kind: 'angle', id: 'aA', at: 'A', from: 'D', to: 'E', label: '50^\\circ' },
    { kind: 'angle', id: 'aD', at: 'D', from: 'A', to: 'E', tone: 'adj', label: '70^\\circ' },
    { kind: 'angle', id: 'aB', at: 'B', from: 'C', to: 'A', tone: 'adj', label: '70^\\circ' },
    { kind: 'angle', id: 'aE', at: 'E', from: 'D', to: 'A', tone: 'opp', label: '60^\\circ' },
    { kind: 'angle', id: 'aC', at: 'C', from: 'A', to: 'B', tone: 'opp', label: '60^\\circ' },
  ];
  // Matching chevrons on DE and BC mark them parallel.
  for (const [key, x, y] of [['de', 2.9, 1.91], ['bc', 2.9, 0]] as const) {
    Object.assign(points, { [`${key}1`]: [x - 0.22, y + 0.22], [`${key}2`]: [x + 0.08, y], [`${key}3`]: [x - 0.22, y - 0.22] });
    items.push(
      { kind: 'line', id: `${key}-m1`, from: `${key}1`, to: `${key}2`, tone: 'brand', group: 'shape' },
      { kind: 'line', id: `${key}-m2`, from: `${key}3`, to: `${key}2`, tone: 'brand', group: 'shape' },
    );
  }
  return { points, items };
}

const iso: [P, P, P] = [[0, 0], [6, 0], [3, 8.24]];

const video: Explainer = {
  id: 'm202-2-2-b',
  lessonId: 'm202-2-2',
  title: 'Angles in Triangles, Part 2: Isosceles Triangles and Algebra',
  thumbnailTitle: 'Isosceles Triangles and Algebra',
  thumbnail: 'ps',
  summary: 'Equal base angles in an isosceles triangle, angles written as expressions such as x, 2x + 15 and 3x − 9, and combining corresponding angles with the angle sum in a triangle cut by a line parallel to one side.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.2 · Part 2', title: 'Isosceles Triangles and Algebra', subtitle: 'Equations from angle properties' }],
      lines: [
        { say: 'The angle sum becomes even more useful when you combine it with other properties, or write the angles with algebra.', show: 'title' },
        { say: 'In this video, you will find angles in isosceles triangles, solve for angles written as expressions, and use several properties in a row.' },
      ],
    },
    {
      chapter: 'Isosceles triangles',
      layout: 'split',
      leftWidth: 500,
      left: [figure('is', [triangle({ A: iso[0], B: iso[1], C: iso[2], names: ['A', 'B', 'C'], angles: { A: 'x', B: 'x', C: '40^\\circ' } }), ticks([[iso[2], iso[0]], [iso[2], iso[1]]])], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x + x + 40^\\circ = 180^\\circ', '2x = 140^\\circ', 'x = 70^\\circ'] }],
      lines: [
        { say: 'In an isosceles triangle, the angles opposite the equal sides are equal. Tick marks show the equal sides.', show: ['is.shape', 'is.names', 'is.ticks'], focus: 'is.ticks' },
        { say: 'Here, C "A" equals C B, and angle C is forty degrees. Angles "A" and B are opposite the equal sides, so both are x.', show: ['is.aC', 'is.aA', 'is.aB'], focus: ['is.aA', 'is.aB'] },
        { say: 'The angles add to 180, so x plus x plus forty is 180. Two x is 140, and x is seventy degrees.', show: ['m.0', 'm.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Angles as expressions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x + (2x + 15) + (3x - 9) = 180', '6x + 6 = 180,\\quad 6x = 174,\\quad x = 29', '29^\\circ,\\quad 2(29) + 15 = 73^\\circ,\\quad 3(29) - 9 = 78^\\circ', '29 + 73 + 78 = 180 \\;\\checkmark'] }],
      lines: [
        { say: 'The angles of a triangle measure x, two x plus fifteen, and three x minus nine degrees. Find each angle. Write an equation from the angle sum.', show: 'm.0', focus: 'm.0' },
        { say: 'Collect like terms: six x plus six is 180. So six x is 174, and x is twenty-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Now substitute to find each angle: twenty-nine degrees, seventy-three degrees, and seventy-eight degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: twenty-nine plus seventy-three plus seventy-eight is 180. Finding x is not the end; the question asks for the angles.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Combining properties',
      layout: 'split',
      leftWidth: 480,
      left: [figure('ps', [parallelSide()], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle B = \\angle ADE = 70^\\circ', '\\angle AED = 180^\\circ - 50^\\circ - 70^\\circ', '\\angle AED = 60^\\circ', '\\angle C = \\angle AED = 60^\\circ'] }],
      lines: [
        { say: 'Many problems need several properties in a row, so name the property at each step. In triangle "A" B C, D E is parallel to B C. Angle "A" is fifty degrees, and angle "A" D E is seventy. Find angles B and C.', show: ['ps.shape', 'ps.aA', 'ps.aD'], focus: ['ps.aA', 'ps.aD'] },
        { say: 'Side "A" B is a transversal of the parallel lines, so angle B corresponds to angle "A" D E. Angle B is seventy degrees.', show: ['ps.aB', 'm.0'], focus: ['ps.aD', 'ps.aB', 'm.0'] },
        { say: 'In the small triangle "A" D E, the angle sum gives angle "A" E D: 180 minus fifty minus seventy, which is sixty degrees.', show: ['ps.aE', 'm.1', 'm.2'], focus: ['ps.aE', 'm.2'] },
        { say: 'And angle C corresponds to angle "A" E D, so angle C is sixty degrees.', show: ['ps.aC', 'm.3'], focus: ['ps.aE', 'ps.aC', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In an isosceles triangle, the angle between the two equal sides is $52^\\circ$. What is each of the other two angles?',
          choices: ['$64^\\circ$', '$52^\\circ$', '$128^\\circ$', '$76^\\circ$'],
          answer: 0,
          working: 'The other two angles are equal: $2x + 52^\\circ = 180^\\circ$, so $2x = 128^\\circ$ and $x = 64^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In an isosceles triangle, the angle between the two equal sides is fifty-two degrees. What is each of the other two angles? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The other two angles are opposite the equal sides, so they are equal. Two x plus fifty-two is 180, so two x is 128, and each angle is sixty-four degrees.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In an isosceles triangle, the angles opposite the equal sides are equal.', 'Write an equation from the angle sum, solve it, and find each angle.', 'In multi-step problems, name the property at each step.'] }],
      lines: [
        { say: 'Let’s sum up. In an isosceles triangle, the angles opposite the equal sides are equal.', show: 'sum.0' },
        { say: 'With expressions, write an equation from the angle sum, solve it, and then find each angle.', show: 'sum.1' },
        { say: 'And in multi-step problems, name the property you use at each step. In part three, we look at exterior angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
