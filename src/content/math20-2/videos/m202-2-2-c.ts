import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Triangle ABC (A = 55°, C = 50°, so B = 75°) with AB extended to D, and the exterior angle CBD. */
function exterior(): Part {
  const points: Record<string, P> = { A: [0.7, 0.9], B: [6.7, 0.9], C: [5.04, 7.1], D: [10, 0.9] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'AB', from: 'A', to: 'B', tone: 'brand', group: 'shape' },
    { kind: 'line', id: 'BC', from: 'B', to: 'C', tone: 'brand', group: 'shape' },
    { kind: 'line', id: 'CA', from: 'C', to: 'A', tone: 'brand', group: 'shape' },
    { kind: 'label', id: 'nA', at: 'A', tex: 'A', place: 'below left', group: 'shape' },
    { kind: 'label', id: 'nB', at: 'B', tex: 'B', place: 'below', group: 'shape' },
    { kind: 'label', id: 'nC', at: 'C', tex: 'C', place: 'above', group: 'shape' },
    { kind: 'line', id: 'BD', from: 'B', to: 'D', tone: 'muted', dashed: true, group: 'ext' },
    { kind: 'label', id: 'nD', at: 'D', tex: 'D', place: 'below', group: 'ext' },
    { kind: 'angle', id: 'aA', at: 'A', from: 'B', to: 'C', tone: 'adj', label: '55^\\circ' },
    { kind: 'angle', id: 'aC', at: 'C', from: 'A', to: 'B', tone: 'adj', label: '50^\\circ' },
    { kind: 'angle', id: 'aB', at: 'B', from: 'C', to: 'A', tone: 'muted', label: '\\angle ABC', r: 28, labelDist: 108 },
    { kind: 'angle', id: 'x', at: 'B', from: 'D', to: 'C', tone: 'opp', label: 'x' },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-2-2-c',
  lessonId: 'm202-2-2',
  title: 'Angles in Triangles, Part 3: Exterior Angles',
  thumbnailTitle: 'The Exterior Angle Property',
  thumbnail: 'ex',
  summary: 'What an exterior angle of a triangle is, a proof that it equals the sum of the two non-adjacent interior angles, finding a 105° exterior angle, solving 4x − 10 = 3x + 25, which angles not to add, and why the exterior angles add to 360°.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.2 · Part 3', title: 'The Exterior Angle Property', subtitle: 'A shortcut from the angle sum' }],
      lines: [
        { say: 'Extend one side of a triangle, and a new angle appears outside it. That angle has a simple connection to the angles inside.', show: 'title' },
        { say: 'In this video, you will prove the exterior angle property, and use it to find angles, with and without algebra.' },
      ],
    },
    {
      chapter: 'Exterior angles',
      layout: 'split',
      leftWidth: 560,
      left: [figure('ex', [exterior()], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 180^\\circ - \\angle ABC', '\\angle A + \\angle C = 180^\\circ - \\angle ABC', 'x = \\angle A + \\angle C', 'x = 55^\\circ + 50^\\circ = 105^\\circ'] }],
      lines: [
        { say: 'An exterior angle of a triangle is formed by one side and the extension of the side next to it. Here, side "A" B is extended to D, and angle C B D, marked x, is an exterior angle.', show: ['ex.shape', 'ex.ext', 'ex.x'], focus: 'ex.x' },
        { say: 'The two interior angles that are not next to it, at "A" and C, are its non-adjacent interior angles.', show: ['ex.aA', 'ex.aC'], focus: ['ex.aA', 'ex.aC'] },
        { say: 'Why are they connected? The exterior angle and angle "A" B C form a straight line, so x is 180 minus angle "A" B C.', show: ['ex.aB', 'm.0'], focus: ['ex.aB', 'ex.x', 'm.0'] },
        { say: 'And by the angle sum, angles "A" and C also add to 180 minus angle "A" B C. Both equal the same thing, so the exterior angle equals the sum of the two non-adjacent interior angles.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Here, x is fifty-five plus fifty, which is 105 degrees.', show: 'm.3', focus: ['m.3', 'ex.x'] },
      ],
    },
    {
      chapter: 'With algebra',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4x - 10 = (x + 20) + (2x + 5)', '4x - 10 = 3x + 25,\\quad x = 35', '4(35) - 10 = 130^\\circ', '55^\\circ + 75^\\circ = 130^\\circ \\;\\checkmark'] },
      ],
      lines: [
        { say: 'An exterior angle measures four x minus ten degrees, and its non-adjacent interior angles measure x plus twenty, and two x plus five degrees. Find x, and the exterior angle.', show: 'm.0', focus: 'm.0' },
        { say: 'The exterior angle equals the sum of the other two, so four x minus ten equals three x plus twenty-five. Subtract three x and add ten: x is thirty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'The exterior angle is four times thirty-five, minus ten, which is 130 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: the interior angles are fifty-five and seventy-five degrees, and they add to 130.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Adding the wrong angles',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the wrong angles', md: 'The exterior angle equals the two interior angles that are **not** next to it. The interior angle next to it is its supplement, not part of the sum.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The exterior angles add to 360°', md: 'One exterior angle at each vertex: each pairs with an interior angle to make $180^\\circ$, so $3 \\times 180^\\circ - 180^\\circ = 360^\\circ$.' },
      ],
      lines: [
        { say: 'Be careful to add the right angles. The exterior angle equals the two interior angles that are not next to it. The interior angle next to it is its supplement, and is not part of the sum.', show: 'oops' },
        { say: 'One more fact: draw one exterior angle at each vertex. Each pairs with an interior angle to make 180, so all six make 540 degrees. The interior angles use 180 of those, so the exterior angles add to 360 degrees.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An exterior angle of a triangle measures $120^\\circ$. One of its non-adjacent interior angles measures $45^\\circ$. What is the other one?',
          choices: ['$75^\\circ$', '$60^\\circ$', '$165^\\circ$', '$15^\\circ$'],
          answer: 0,
          working: 'The exterior angle equals the sum of the non-adjacent interior angles: $45^\\circ + x = 120^\\circ$, so $x = 75^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. An exterior angle of a triangle measures 120 degrees. One of its non-adjacent interior angles measures forty-five degrees. What is the other one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty-five plus the other angle must equal 120, so the other angle is seventy-five degrees. The interior angle next to the exterior angle would be sixty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exterior angle equals the sum of the two non-adjacent interior angles.', 'The interior angle next to it is its supplement.', 'One exterior angle at each vertex: they add to $360^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.', show: 'sum.0' },
        { say: 'The interior angle next to it is its supplement, and is not part of the sum.', show: 'sum.1' },
        { say: 'And with one exterior angle at each vertex, the exterior angles add to 360 degrees. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
