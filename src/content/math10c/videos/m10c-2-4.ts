import type { DiagramEl, Explainer } from '@/video/script.ts';

/** A cliff 80 m high and a boat 171.6 m from its base: the angle of depression is 25°. */
const cliff = (id: string, numbers: boolean, height?: number): DiagramEl => ({
  kind: 'diagram',
  id,
  height,
  points: { C: [0, 0], T: [0, 80], B: [171.6, 0], H: [195, 80] },
  items: [
    { kind: 'thing', id: 'water', type: 'water', at: 'C' },
    { kind: 'thing', id: 'cliff', type: 'cliff', at: 'C', top: 'T', width: 18 },
    { kind: 'thing', id: 'boat', type: 'boat', at: 'B' },
    ...(numbers
      ? ([
          { kind: 'line', id: 'h', from: 'C', to: 'T', tone: 'opp', label: '80\\text{ m}', labelSide: 'right' },
          { kind: 'line', id: 'x', from: 'C', to: 'B', tone: 'adj', label: 'x', labelSide: 'right' },
          { kind: 'right', id: 'right', at: 'C', from: 'B', to: 'T' },
        ] as const)
      : ([{ kind: 'line', id: 'hb', from: 'B', to: 'C', tone: 'muted', dashed: true }] as const)),
    { kind: 'line', id: 'sight', from: 'B', to: 'T', ...(numbers ? {} : { label: '\\text{line of sight}', labelSide: 'right' as const, labelAt: 0.3 }) },
    { kind: 'line', id: 'ht', from: 'T', to: 'H', tone: 'muted', dashed: true },
    { kind: 'angle', id: 'dep', at: 'T', from: 'H', to: 'B', r: 54, label: numbers ? '25^\\circ' : '\\text{depression}', labelDist: numbers ? undefined : 230 },
    { kind: 'angle', id: 'elev', at: 'B', from: 'C', to: 'T', r: 54, label: numbers ? '25^\\circ' : '\\text{elevation}', labelDist: numbers ? undefined : 230 },
  ],
});

/** Ella, 20 m from a flagpole, with her eyes 1.6 m above the ground; the angle of elevation is 38°. */
const flagpole = (id: string, numbers: boolean): DiagramEl => ({
  kind: 'diagram',
  id,
  // Z leaves room on the right for the eye-height label.
  points: { P: [0, 0], E: [0, 1.6], F: [20, 0], Q: [20, 1.6], T: [20, 17.23], Z: [27, 0] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'P' },
    { kind: 'thing', id: 'pole', type: 'flagpole', at: 'F', top: 'T' },
    { kind: 'thing', id: 'person', type: 'person', at: 'P', top: 'E' },
    { kind: 'line', id: 'dist', from: 'P', to: 'F', tone: 'adj', label: numbers ? '20\\text{ m}' : 'd', labelSide: 'right' },
    { kind: 'line', id: 'eq', from: 'E', to: 'Q', tone: 'muted', dashed: true },
    { kind: 'line', id: 'sight', from: 'E', to: 'T' },
    { kind: 'angle', id: 'theta', at: 'E', from: 'Q', to: 'T', r: 60, label: numbers ? '38^\\circ' : '\\theta' },
    { kind: 'line', id: 'h', from: 'Q', to: 'T', tone: 'opp', label: 'h', labelSide: 'left' },
    { kind: 'right', id: 'right', at: 'Q', from: 'E', to: 'T' },
    { kind: 'line', id: 'eye', from: 'F', to: 'Q', tone: 'brand', label: numbers ? '1.6\\text{ m}' : '\\text{eye height}', labelSide: 'right', labelAt: 1 },
  ],
});

const video: Explainer = {
  id: 'm10c-2-4',
  lessonId: 'm10c-2-4',
  title: 'Angles of Elevation and Depression',
  thumbnailTitle: 'Elevation and Depression',
  thumbnail: 'cliff',
  summary: 'Measure what you cannot reach: angles of elevation and depression, why they are equal, how to use them to find a distance, and how to find a height with a clinometer. Part 2 solves problems with two right triangles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.4 · Part 1', title: 'Angles of Elevation and Depression', subtitle: 'Measuring what you cannot reach' }],
      lines: [
        { say: 'Trigonometry lets you measure things you cannot reach: the height of a cliff, the width of a river, or the distance to a ship.', show: 'title' },
        { say: 'This is called indirect measurement, and it starts with two kinds of angle.' },
      ],
    },
    {
      chapter: 'Elevation and depression',
      layout: 'center',
      main: [
        cliff('d', false, 340),
        {
          kind: 'bullets',
          id: 'list',
          items: ['**Angle of elevation:** measured [[theta:up]] from the horizontal, to an object above you', '**Angle of depression:** measured [[theta:down]] from the horizontal, to an object below you'],
        },
      ],
      lines: [
        { say: 'Picture someone at the top of a cliff, looking down at a boat. The line from their eyes to the boat is the line of sight.', show: ['d.water', 'd.cliff', 'd.boat', 'd.sight'] },
        { say: 'The angle of elevation is measured up from the horizontal, to an object above you. From the boat, you look up at the top of the cliff.', show: ['d.hb', 'd.elev', 'list.0'], focus: ['d.elev', 'list.0'] },
        { say: 'The angle of depression is measured down from the horizontal, to an object below you. From the cliff top, you look down at the boat.', show: ['d.ht', 'd.dep', 'list.1'], focus: ['d.dep', 'list.1'] },
        { say: 'The two horizontal lines are parallel, so these two angles are equal. They are alternate angles.', focus: ['d.hb', 'd.ht', 'd.elev', 'd.dep'] },
        { say: 'So you can always put the angle at the bottom of your triangle, as an angle of elevation.', focus: 'd.elev' },
      ],
    },
    {
      chapter: 'Finding a distance',
      layout: 'split',
      leftWidth: 660,
      left: [cliff('cliff', true)],
      right: [
        { kind: 'text', id: 'given', md: 'From the top of an $80$ m cliff, the angle of depression to a boat is $25^\\circ$. How far is the boat from the base of the cliff?', size: 'md', align: 'left' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan\\thc{25^\\circ} = \\dfrac{\\opp{80}}{\\adj{x}}', '\\adj{x} = \\dfrac{80}{\\tan 25^\\circ}', '\\adj{x} \\approx 171.6\\text{ m}'] },
      ],
      lines: [
        { say: 'Here is a problem. From the top of an eighty metre cliff, the angle of depression to a boat is twenty-five degrees. How far is the boat from the base of the cliff?', show: ['cliff.water', 'cliff.cliff', 'cliff.boat', 'cliff.sight', 'cliff.h', 'cliff.ht', 'cliff.dep', 'given'] },
        { say: 'The angle of depression is at the top, but alternate angles are equal, so the angle of elevation from the boat is also twenty-five degrees.', show: 'cliff.elev', focus: ['cliff.dep', 'cliff.elev'] },
        { say: 'From that angle, the cliff is the opposite side and the distance x is the adjacent side. Opposite and adjacent means tangent.', show: ['cliff.x', 'cliff.right', 'm.0'], focus: ['cliff.h', 'cliff.x', 'cliff.elev', 'm.0'] },
        { say: 'x is on the bottom, so divide. x equals eighty divided by tan twenty-five degrees,', show: 'm.1', focus: 'm.1' },
        { say: 'which is about 171.6 metres.', show: 'm.2', focus: ['m.2', 'cliff.x'] },
      ],
    },
    {
      chapter: 'Using a clinometer',
      layout: 'split',
      leftWidth: 580,
      left: [flagpole('d', false)],
      right: [
        {
          kind: 'bullets',
          id: 'steps',
          items: ['Stand a measured distance $\\adj{d}$ from the flagpole.', 'Sight the top, and read the angle $\\thc{\\theta}$.', 'Height above your eyes: $\\opp{h} = d\\tan\\theta$', '**Add your eye height.**'],
        },
      ],
      lines: [
        { say: 'A clinometer is a tool that measures angles of elevation. Here is how to find the height of a flagpole with one.', show: ['d.ground', 'd.pole', 'd.person'] },
        { say: 'First, stand a measured distance d from the flagpole.', show: ['d.dist', 'steps.0'], focus: ['d.dist', 'steps.0'] },
        { say: 'Second, sight the top of the flagpole through the clinometer, and read the angle of elevation, theta.', show: ['d.eq', 'd.sight', 'd.theta', 'steps.1'], focus: ['d.theta', 'steps.1'] },
        { say: 'Third, the height above your eyes is opposite theta, and d is adjacent, so h equals d times tan theta.', show: ['d.h', 'd.right', 'steps.2'], focus: ['d.h', 'steps.2'] },
        { say: 'Finally, add your eye height, because the angle was measured from your eyes, not from the ground.', show: ['d.eye', 'steps.3'], focus: ['d.eye', 'steps.3'] },
      ],
    },
    {
      chapter: 'Example: a flagpole',
      layout: 'split',
      leftWidth: 580,
      left: [flagpole('d', true)],
      right: [
        { kind: 'text', id: 'given', md: 'Ella stands $20$ m from a flagpole and measures an angle of elevation of $38^\\circ$ to the top. Her eyes are $1.6$ m above the ground. How tall is the flagpole?', size: 'md', align: 'left' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\opp{h} = 20\\tan 38^\\circ \\approx 15.6\\text{ m}', '\\text{height} \\approx 15.6 + 1.6 = 17.2\\text{ m}'] },
      ],
      lines: [
        { say: "Let's try one. Ella stands twenty metres from a flagpole and measures an angle of elevation of thirty-eight degrees to the top. Her eyes are 1.6 metres above the ground. How tall is the flagpole?", show: ['d.ground', 'd.pole', 'd.person', 'd.dist', 'd.eq', 'd.sight', 'd.theta', 'd.h', 'd.right', 'd.eye', 'given'] },
        { say: 'The height above her eyes is opposite the angle, and twenty metres is adjacent, so h equals twenty times tan thirty-eight degrees, which is about 15.6 metres.', show: 'm.0', focus: ['m.0', 'd.h', 'd.theta'] },
        { say: 'Then add her eye height: 15.6 plus 1.6 is about 17.2 metres. That is the height of the flagpole.', show: 'm.1', focus: ['m.1', 'd.eye'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w1', tone: 'mistake', title: 'From the horizontal, not the vertical', md: 'The angle of depression is measured **down from the horizontal** line, not from the wall or the cliff.' },
        { kind: 'callout', id: 'w2', tone: 'mistake', title: 'Forgetting the eye height', md: 'A clinometer gives the height **above your eyes**. Add your eye height to get the full height.' },
      ],
      lines: [
        { say: 'Two mistakes to watch out for.' },
        { say: 'First, the angle of depression is measured down from the horizontal, not from the vertical wall or cliff.', show: 'w1' },
        { say: 'Second, a clinometer gives the height above your eyes, so add your eye height to get the full height.', show: 'w2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the top of a $45$ m building, the angle of depression to a car is $\\thc{32^\\circ}$. How far is the car from the base of the building?',
          choices: ['$\\dfrac{45}{\\tan 32^\\circ} \\approx 72.0$ m', '$45\\tan 32^\\circ \\approx 28.1$ m', '$45\\sin 32^\\circ \\approx 23.8$ m', '$\\dfrac{45}{\\sin 32^\\circ} \\approx 84.9$ m'],
          answer: 0,
          working: 'The angle of elevation from the car is also $32^\\circ$ (alternate angles). The height $45$ m is [[opp:opposite]] it and the distance $x$ is [[adj:adjacent]], so $\\tan 32^\\circ = \\dfrac{45}{x}$ and $x = \\dfrac{45}{\\tan 32^\\circ} \\approx 72.0$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a forty-five metre building, the angle of depression to a car is thirty-two degrees. How far is the car from the base of the building? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angle of elevation from the car is also thirty-two degrees. The height is opposite it and the distance is adjacent, so x equals forty-five divided by tan thirty-two degrees, which is about 72.0 metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Elevation is measured **up** from the horizontal; depression is measured **down**.',
            'They are equal (alternate angles), so put the angle at the bottom of your triangle.',
            'With a clinometer, $h = d\\tan\\theta$, then add your eye height.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The angle of elevation is measured up from the horizontal, and the angle of depression is measured down.", show: 'sum.0' },
        { say: 'They are equal, because they are alternate angles, so you can always put the angle at the bottom of your triangle.', show: 'sum.1' },
        { say: 'And with a clinometer, the height above your eyes is d times tan theta. Then add your eye height. In part two, we will solve problems with two right triangles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
