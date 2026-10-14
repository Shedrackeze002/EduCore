import type { DiagramItem, Explainer } from '@/video/script.ts';
import { triangle } from '@/video/triangles.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/**
 * Triangle ABC with BC on line n, and line m through A parallel to n. Angles 1 and 2 are on m,
 * either side of the triangle; 3, 4 and 5 are its interior angles at A, B and C. The pairs that
 * match (1 and 4, 2 and 5) share a colour.
 */
function proof(): Part {
  const points: Record<string, P> = {
    A: [4.9, 5.2], B: [2.85, 0.8], C: [8.6, 0.8],
    mW: [0.8, 5.2], mE: [10.2, 5.2], nW: [0.8, 0.8], nE: [10.2, 0.8],
  };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'm', from: 'mW', to: 'mE', group: 'lines' },
    { kind: 'line', id: 'n', from: 'nW', to: 'nE', group: 'lines' },
    { kind: 'label', id: 'm-name', at: 'mE', tex: 'm', place: 'right', group: 'lines' },
    { kind: 'label', id: 'n-name', at: 'nE', tex: 'n', place: 'right', group: 'lines' },
    { kind: 'line', id: 'AB', from: 'A', to: 'B', tone: 'brand', group: 'tri' },
    { kind: 'line', id: 'AC', from: 'A', to: 'C', tone: 'brand', group: 'tri' },
    { kind: 'line', id: 'BC', from: 'B', to: 'C', tone: 'brand', weight: 3, group: 'tri' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'above', group: 'tri' },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below', group: 'tri' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'below', group: 'tri' },
    { kind: 'angle', id: 'a1', at: 'A', from: 'mW', to: 'B', tone: 'adj', label: '1', r: 40 },
    { kind: 'angle', id: 'a2', at: 'A', from: 'C', to: 'mE', tone: 'opp', label: '2', r: 40 },
    { kind: 'angle', id: 'a3', at: 'A', from: 'B', to: 'C', label: '3', r: 34 },
    { kind: 'angle', id: 'a4', at: 'B', from: 'C', to: 'A', tone: 'adj', label: '4', r: 40 },
    { kind: 'angle', id: 'a5', at: 'C', from: 'A', to: 'B', tone: 'opp', label: '5', r: 40 },
  ];
  for (const [key, y] of [['m', 5.2], ['n', 0.8]] as const) {
    Object.assign(points, { [`${key}k1`]: [1.45, y + 0.25], [`${key}k2`]: [1.8, y], [`${key}k3`]: [1.45, y - 0.25] });
    items.push(
      { kind: 'line', id: `${key}-mark1`, from: `${key}k1`, to: `${key}k2`, tone: 'brand', group: 'marks' },
      { kind: 'line', id: `${key}-mark2`, from: `${key}k3`, to: `${key}k2`, tone: 'brand', group: 'marks' },
    );
  }
  return { points, items };
}

const video: Explainer = {
  id: 'm202-2-2',
  lessonId: 'm202-2-2',
  title: 'Angles in Triangles, Part 1: The Angle Sum',
  thumbnailTitle: 'The Angle Sum of a Triangle',
  thumbnail: 'pf',
  summary: 'A two-column proof that the interior angles of any triangle add to 180°, using a line through one vertex parallel to the opposite side, finding a third angle, and what the angle sum says about right and obtuse angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.2 · Part 1', title: 'The Angle Sum of a Triangle', subtitle: 'Why it is always 180°' }],
      lines: [
        { say: 'Every triangle, from a roof truss to the brace on a gate, has angles that add to 180 degrees. Measuring a few triangles suggests it, but only a proof shows it is true for all of them.', show: 'title' },
        { say: 'In this video, you will prove the angle sum with parallel lines, and use it to find unknown angles.' },
      ],
    },
    {
      chapter: 'Proving the angle sum',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pf', [proof()], 340)],
      right: [{ kind: 'table', id: 't', head: ['Statement', 'Reason'], rows: [['$\\angle 1 = \\angle 4$', 'Alternate interior'], ['$\\angle 2 = \\angle 5$', 'Alternate interior'], ['$\\angle 1 + \\angle 3 + \\angle 2 = 180^\\circ$', 'Straight line'], ['$\\angle 4 + \\angle 3 + \\angle 5 = 180^\\circ$', 'Substitution']] }],
      lines: [
        { say: 'An interior angle of a triangle is an angle inside it, formed by two of its sides. Triangle "A" B C has its interior angles three, four and five. Side B C lies on line n.', show: ['pf.tri', 'pf.n', 'pf.n-name', 'pf.a3', 'pf.a4', 'pf.a5'], focus: ['pf.a3', 'pf.a4', 'pf.a5'] },
        { say: 'Draw line m through vertex "A", parallel to n. It makes angles one and two, on either side of the triangle.', show: ['pf.m', 'pf.m-name', 'pf.marks', 'pf.a1', 'pf.a2'], focus: ['pf.m', 'pf.a1', 'pf.a2'] },
        { say: 'Side "A" B is a transversal of the parallel lines, so angles one and four are alternate interior angles, and are equal. In the same way, using side "A" C, angle two equals angle five.', show: ['t.0', 't.1'], focus: ['pf.a1', 'pf.a4', 'pf.a2', 'pf.a5', 't.0', 't.1'] },
        { say: 'Angles one, three and two together make a straight line along m, so they add to 180 degrees.', show: 't.2', focus: ['pf.a1', 'pf.a3', 'pf.a2', 't.2'] },
        { say: 'Now substitute angle four for angle one, and angle five for angle two. Angles four, three and five, the interior angles of the triangle, add to 180 degrees. The argument works for any triangle.', show: 't.3', focus: ['pf.a4', 'pf.a3', 'pf.a5', 't.3'] },
      ],
    },
    {
      chapter: 'Finding the third angle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('th', [triangle({ A: [0, 0], B: [6, 0], C: [1.22, 5.3], names: ['P', 'Q', 'R'], angles: { A: '77^\\circ', B: '48^\\circ', C: 'x' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x + 48^\\circ + 77^\\circ = 180^\\circ', 'x = 180^\\circ - 48^\\circ - 77^\\circ', 'x = 55^\\circ'] }],
      lines: [
        { say: 'Two angles of a triangle measure forty-eight and seventy-seven degrees. Find the third angle.', show: ['th.shape', 'th.names', 'th.aA', 'th.aB', 'th.aC'] },
        { say: 'The three angles add to 180 degrees, so x plus forty-eight plus seventy-seven is 180.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract both known angles from 180, and x is fifty-five degrees.', show: ['m.1', 'm.2'], focus: ['m.2', 'th.aC'] },
      ],
    },
    {
      chapter: 'What the sum tells you',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A triangle has at most one right angle or obtuse angle.', 'In a right triangle, the two acute angles add to $90^\\circ$.', 'In an equilateral triangle, each angle is $60^\\circ$.'] }],
      lines: [
        { say: 'The angle sum leads to more facts by deduction. A triangle can have at most one right or obtuse angle, because two of them would already make 180 degrees or more.', show: 'b.0' },
        { say: 'In a right triangle, the right angle uses ninety degrees, so the two acute angles add to ninety.', show: 'b.1' },
        { say: 'And in an equilateral triangle, the three equal angles share 180 degrees, so each is sixty.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A right triangle has one angle of $34^\\circ$. What is its third angle?',
          choices: ['$56^\\circ$', '$146^\\circ$', '$34^\\circ$', '$66^\\circ$'],
          answer: 0,
          working: 'The angles are $90^\\circ$, $34^\\circ$ and $x$: $x = 180^\\circ - 90^\\circ - 34^\\circ = 56^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has one angle of thirty-four degrees. What is its third angle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angles are ninety, thirty-four and x, so x is 180 minus ninety minus thirty-four, which is fifty-six degrees. The two acute angles add to ninety.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The interior angles of a triangle add to $180^\\circ$.', 'A line parallel to one side proves it, with alternate interior angles.', 'Subtract the known angles from $180^\\circ$ to find the third.'] }],
      lines: [
        { say: 'Let’s sum up. The interior angles of any triangle add to 180 degrees.', show: 'sum.0' },
        { say: 'A line through one vertex, parallel to the opposite side, proves it, with alternate interior angles.', show: 'sum.1' },
        { say: 'And to find a third angle, subtract the two known angles from 180. In part two, we work with isosceles triangles and algebra. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
