import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A 60 m tower (drawn a tenth of size) sighted from stakes P, Q and R at 55°, 38° and 24°. */
function stakes(): Part {
  const h = 6;
  const at = (a: number) => h / Math.tan((a * Math.PI) / 180);
  const points: Record<string, P> = { B: [0, 0], T: [0, h], P: [at(55), 0], Q: [at(38), 0], R: [at(24), 0], E: [at(24) + 0.4, 0] };
  points.x0 = [points.P[0], -1.3];
  points.x1 = [points.Q[0], -1.3];
  points.y1 = [points.R[0], -1.3];
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ground', from: 'B', to: 'E', tone: 'muted', group: 'frame' },
    { kind: 'line', id: 'tower', from: 'B', to: 'T', tone: 'opp', weight: 5, label: '60\\text{ m}', labelSide: 'left', group: 'frame' },
    { kind: 'right', id: 'right', at: 'B', from: 'E', to: 'T', group: 'frame' },
  ];
  for (const [k, a, dist] of [['P', 55, 75], ['Q', 38, 80], ['R', 24, 125]] as const) {
    items.push(
      { kind: 'line', id: `s${k}`, from: 'T', to: k, tone: 'hyp', group: `g${k}` },
      { kind: 'angle', id: `a${k}`, at: k, from: 'B', to: 'T', label: `${a}^\\circ`, r: 40, labelDist: dist, tone: 'theta', group: `g${k}` },
      { kind: 'label', id: `n${k}`, at: k, tex: k, place: 'below', group: `g${k}` },
    );
  }
  items.push(
    { kind: 'line', id: 'x', from: 'x0', to: 'x1', tone: 'adj', label: 'x', labelSide: 'right', group: 'xy' },
    { kind: 'line', id: 'y', from: 'x1', to: 'y1', tone: 'adj', label: 'y', labelSide: 'right', group: 'xy' },
  );
  return { points, items };
}

const video: Explainer = {
  id: 'm203-4-3',
  lessonId: 'm203-4-3',
  title: 'Chains of Right Triangles, Part 1: A Plan and Survey Sightings',
  thumbnailTitle: 'Chains of Triangles',
  thumbnail: 'sv',
  summary: 'A five-step plan for chains of right triangles, naming every side you find, and three survey stakes sighting a 60 m tower at 55°, 38° and 24°, with the stakes about 34.8 m and 58.0 m apart.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.3 · Part 1', title: 'Chains of Right Triangles', subtitle: 'One triangle unlocks the next' }],
      lines: [
        { say: 'A roof truss, a staircase with a landing, a survey with several sightings: each is a chain of right triangles. Solve them one at a time, and use what you find in one triangle to unlock the next.', show: 'title' },
        { say: 'In this video, you will learn a plan for chains of triangles, and use it for a survey.' },
      ],
    },
    {
      chapter: 'A plan',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Sketch** and number the right triangles $1$, $2$, $3$.', '**Mark the shared sides.**', '**Start** where you know an angle and a side, or two sides.', '**Find the shared side first**, then move along the chain.', '**Keep all the digits**, and check each hypotenuse is the longest side.'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Name what you find', md: 'Give every side you calculate a letter ($h$, $d$, $k$ …) and write its value on the sketch.' },
      ],
      lines: [
        { say: 'The plan from two-triangle problems still works; you just use it more than once. Sketch the situation, and number the right triangles one, two, three.', show: 'b.0' },
        { say: 'Mark the sides they share. A side you find in one triangle is a known side in the next.', show: 'b.1' },
        { say: 'Start with a triangle where you know enough: an angle and a side, or two sides.', show: 'b.2' },
        { say: 'Find the shared side first, then move along the chain.', show: 'b.3' },
        { say: 'Keep all the digits until the end, and check that each hypotenuse is the longest side in its triangle. And give every side you find a letter, written on the sketch, so your work is easy to follow.', show: ['b.4', 'tip'] },
      ],
    },
    {
      chapter: 'Three survey stakes',
      layout: 'split',
      leftWidth: 700,
      left: [figure('sv', [stakes()], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P: \\dfrac{60}{\\tan 55^\\circ} \\approx 42.01', 'Q: \\dfrac{60}{\\tan 38^\\circ} \\approx 76.80', 'R: \\dfrac{60}{\\tan 24^\\circ} \\approx 134.76', 'x \\approx 34.8,\\;\\; y \\approx 58.0'] }],
      lines: [
        { say: 'Stakes P, Q and R are in a line going away from the base of a sixty-metre communications tower. The angles of elevation to the top are fifty-five degrees from P, thirty-eight from Q, and twenty-four from R. Find the distances between the stakes.', show: ['sv.frame', 'sv.gP', 'sv.gQ', 'sv.gR'] },
        { say: 'All three triangles share the tower’s height, which is opposite each angle. Each distance from the base is adjacent: TOA. P is sixty over tangent fifty-five degrees, about 42.01 metres from the base.', show: 'm.0', focus: ['sv.gP', 'm.0'] },
        { say: 'Q is sixty over tangent thirty-eight degrees, about 76.80 metres.', show: 'm.1', focus: ['sv.gQ', 'm.1'] },
        { say: 'R is sixty over tangent twenty-four degrees, about 134.76 metres.', show: 'm.2', focus: ['sv.gR', 'm.2'] },
        { say: 'Now subtract neighbours. x, from P to Q, is about 34.8 metres, and y, from Q to R, is about 58.0 metres.', show: ['sv.xy', 'm.3'], focus: ['sv.xy', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two stakes are in line with the base of a $40$ m tower. The angles of elevation to the top are $50^\\circ$ and $30^\\circ$. How far apart are the stakes?',
          choices: ['$35.7$ m', '$69.3$ m', '$33.6$ m', '$102.9$ m'],
          answer: 0,
          working: '$\\dfrac{40}{\\tan 30^\\circ} \\approx 69.28$ and $\\dfrac{40}{\\tan 50^\\circ} \\approx 33.56$. Subtract: about $35.7$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. Two stakes are in line with the base of a forty-metre tower. The angles of elevation to the top are fifty degrees and thirty degrees. How far apart are the stakes? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The far stake is forty over tangent thirty, about 69.28 metres from the base, and the near one is forty over tangent fifty, about 33.56. Subtract: about 35.7 metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Number the triangles and mark the shared sides.', 'A side found in one triangle is known in the next.', 'Survey sightings all share the height.'] }],
      lines: [
        { say: 'Let’s sum up. Number the triangles, and mark the sides they share.', show: 'sum.0' },
        { say: 'A side you find in one triangle becomes a known side in the next.', show: 'sum.1' },
        { say: 'And survey sightings of one tall object all share its height. In part two, we work through a roof truss. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
