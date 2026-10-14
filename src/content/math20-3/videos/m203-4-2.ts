import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A tower with a horizontal at its top: the angle of depression above, the angle of elevation below. */
const sightLines: Part = {
  points: { B: [0, 0], T: [0, 5], P: [8, 0], H: [8, 5], dl: [2.2, 5.15], el: [6.4, -0.15] },
  items: [
    { kind: 'line', id: 'ground', from: 'B', to: 'P', tone: 'muted', group: 'frame' },
    { kind: 'line', id: 'tower', from: 'B', to: 'T', tone: 'opp', weight: 5, group: 'frame' },
    { kind: 'right', id: 'right', at: 'B', from: 'P', to: 'T', group: 'frame' },
    { kind: 'line', id: 'sight', from: 'T', to: 'P', tone: 'hyp' },
    { kind: 'line', id: 'horizontal', from: 'T', to: 'H', tone: 'muted', dashed: true },
    // Each name sits outside the triangle, by its arc: above the horizontal, and below the ground.
    { kind: 'angle', id: 'dep-arc', at: 'T', from: 'H', to: 'P', r: 80, tone: 'opp', group: 'dep' },
    { kind: 'label', id: 'dep-name', at: 'dl', tex: '\\text{depression}', tone: 'opp', place: 'above', group: 'dep' },
    { kind: 'angle', id: 'elev-arc', at: 'P', from: 'B', to: 'T', r: 80, tone: 'theta', group: 'elev' },
    { kind: 'label', id: 'elev-name', at: 'el', tex: '\\text{elevation}', tone: 'theta', place: 'below', group: 'elev' },
  ],
};

const video: Explainer = {
  id: 'm203-4-2',
  lessonId: 'm203-4-2',
  title: 'Problems with Two Right Triangles, Part 1: Angles of Elevation and Depression',
  thumbnailTitle: 'Elevation and Depression',
  thumbnail: 'el',
  summary: 'Angles of elevation and depression, why the angle of depression from the top equals the angle of elevation from the bottom, a truck 46.6 m from a 28 m grain elevator, and why the angle is never measured from the wall.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.2 · Part 1', title: 'Angles of Elevation and Depression', subtitle: 'Measuring what you cannot reach' }],
      lines: [
        { say: 'From the top of a cliff, a lookout or a grain elevator, you can measure distances you could never reach with a tape. It starts with two special angles.', show: 'title' },
        { say: 'In this video, you will learn the angles of elevation and depression, and use one to find a distance.' },
      ],
    },
    {
      chapter: 'Two angles from the horizontal',
      layout: 'split',
      leftWidth: 640,
      left: [figure('sl', [sightLines], 360)],
      right: [{ kind: 'bullets', id: 'b', items: ['**Elevation**: measured **up** from the horizontal to the line of sight.', '**Depression**: measured **down** from the horizontal to the line of sight.'] }],
      lines: [
        { say: 'Both angles are measured from the horizontal. Someone on the ground looking up to the top of a tower sees along a line of sight. The angle of elevation is measured up, from the horizontal ground to that line.', show: ['sl.frame', 'sl.sight', 'sl.elev', 'b.0'], focus: 'sl.elev' },
        { say: 'Someone at the top looking down measures the angle of depression: down, from their own horizontal, to the same line of sight.', show: ['sl.horizontal', 'sl.dep', 'b.1'], focus: 'sl.dep' },
      ],
    },
    {
      chapter: 'They are equal',
      layout: 'center',
      main: [{ kind: 'callout', id: 'k', tone: 'key', title: 'Depression equals elevation', md: 'The horizontal at the top and the ground are parallel, so the angle of depression from the top **equals** the angle of elevation from the bottom: they are alternate angles. Put the angle inside the triangle, at the bottom.' }],
      lines: [
        { say: 'Here is the key fact. The horizontal line at the top and the ground are parallel, and the line of sight crosses both. So the angle of depression and the angle of elevation are alternate angles, and they are equal.', show: 'k' },
        { say: 'That lets you move the angle to the bottom, inside the right triangle, where SOH CAH TOA can use it.' },
      ],
    },
    {
      chapter: 'A truck below a grain elevator',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'triangle', id: 'ge', adj: 46.6, opp: 28, setting: 'building', labels: { theta: '31^\\circ', opp: '28\\text{ m}', adj: 'd' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan 31^\\circ = \\dfrac{28}{d}', 'd = \\dfrac{28}{\\tan 31^\\circ}', 'd \\approx 46.6 \\text{ m}'] }],
      lines: [
        { say: 'From the top of a twenty-eight-metre grain elevator, a worker sees a truck at an angle of depression of thirty-one degrees. How far is the truck from the base of the elevator? The angle at the truck is also thirty-one degrees.', show: ['ge.shape', 'ge.theta', 'ge.opp', 'ge.adj'] },
        { say: 'From that angle, the height is opposite, and the distance d is adjacent: TOA. Tangent thirty-one degrees equals twenty-eight over d.', show: 'm.0', focus: ['ge.opp', 'ge.adj', 'm.0'] },
        { say: 'The unknown is on the bottom, so divide: d is twenty-eight over tangent thirty-one degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The truck is about 46.6 metres from the base.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Not from the wall',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measuring from the wall', md: 'An angle of depression is measured from the **horizontal**, not from the wall or cliff face. Putting the $31^\\circ$ between the line of sight and the wall gives the wrong triangle.' }],
      lines: [
        { say: 'A common mistake is to measure the angle of depression from the wall or the cliff face. It is always measured from the horizontal. Putting thirty-one degrees between the line of sight and the wall builds the wrong triangle, and the wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the top of a $60$ m cliff, the angle of depression to a canoe is $25^\\circ$. How far is the canoe from the base of the cliff?',
          choices: ['$128.7$ m', '$28.0$ m', '$142.0$ m', '$54.4$ m'],
          answer: 0,
          working: 'The angle at the canoe is $25^\\circ$. $\\tan 25^\\circ = \\dfrac{60}{d}$, so $d = \\dfrac{60}{\\tan 25^\\circ} \\approx 128.7$ m. B multiplies instead of dividing.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a sixty-metre cliff, the angle of depression to a canoe is twenty-five degrees. How far is the canoe from the base of the cliff? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angle at the canoe is also twenty-five degrees, so d is sixty over tangent twenty-five degrees, about 128.7 metres. B multiplies instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Elevation: up from the horizontal. Depression: down from the horizontal.', 'Depression from the top equals elevation from the bottom.', 'Never measure from the wall.'] }],
      lines: [
        { say: 'Let’s sum up. The angle of elevation is measured up from the horizontal, and the angle of depression is measured down from it.', show: 'sum.0' },
        { say: 'The angle of depression from the top equals the angle of elevation from the bottom.', show: 'sum.1' },
        { say: 'And never measure from the wall. In part two, we solve problems with two triangles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
