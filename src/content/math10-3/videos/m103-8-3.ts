import type { DiagramEl, Explainer } from '@/video/script.ts';

/** A grain elevator 32 m tall and a truck 71.9 m from its base: the angle of depression is 24°. */
const elevator: DiagramEl = {
  kind: 'diagram',
  id: 'el',
  points: { C: [0, 0], T: [0, 32], B: [71.9, 0], H: [86, 32] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'C' },
    { kind: 'thing', id: 'tower', type: 'building', at: 'C', top: 'T', width: 12, side: 'left' },
    { kind: 'label', id: 'truck', at: 'B', tex: '\\text{truck}', place: 'below', dot: true },
    { kind: 'line', id: 'h', from: 'C', to: 'T', tone: 'opp', label: '32\\text{ m}', labelSide: 'right' },
    { kind: 'line', id: 'd', from: 'C', to: 'B', tone: 'adj', label: 'd', labelSide: 'left', labelAt: 0.35 },
    { kind: 'right', id: 'right', at: 'C', from: 'B', to: 'T' },
    { kind: 'line', id: 'sight', from: 'T', to: 'B' },
    { kind: 'line', id: 'horiz', from: 'T', to: 'H', tone: 'muted', dashed: true },
    { kind: 'angle', id: 'dep', at: 'T', from: 'H', to: 'B', r: 60, labelDist: 100, label: '24^\\circ' },
    { kind: 'angle', id: 'elev', at: 'B', from: 'C', to: 'T', r: 60, labelDist: 100, label: '24^\\circ' },
  ],
};

const video: Explainer = {
  id: 'm103-8-3',
  lessonId: 'm103-8-3',
  title: 'Trigonometry on the Job, Part 1: Elevation and Depression',
  thumbnailTitle: 'Elevation and Depression',
  thumbnail: 'el',
  summary: 'A five-step plan for any right-triangle problem (sketch, mark, name, choose, check), the height of a kite, and angles of elevation and depression, with the distance from a grain elevator to a truck. Part 2 covers roofs, ramps, ladders and two-step problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.3 · Part 1', title: 'Trigonometry on the Job', subtitle: 'Elevation and depression' }],
      lines: [
        { say: 'Carpenters, surveyors and roofers solve right triangles every day, but nobody hands them a labelled diagram. The hard part is turning the words into a sketch.', show: 'title' },
        { say: 'In this video, you will follow a plan for any problem, and work with angles of elevation and depression.' },
      ],
    },
    {
      chapter: 'A plan for any problem',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sketch** the situation and mark the right angle.', '**Mark** the angle and the sides you know, or want.', '**Name** the sides from that angle.', '**Choose** the ratio with SOH CAH TOA, and solve.', '**Check**: is the hypotenuse longest? Is the size sensible? Units?'] }],
      lines: [
        { say: 'Use the same five steps every time. Sketch the situation, and mark the right angle.', show: 'b.0' },
        { say: 'Mark the angle you know or want, and the sides you know or want.', show: 'b.1' },
        { say: 'Name the sides from that angle: opposite, adjacent and hypotenuse.', show: 'b.2' },
        { say: 'Choose the ratio with SOH CAH TOA, write the equation, and solve it.', show: 'b.3' },
        { say: 'And check: is the hypotenuse the longest side, is the size sensible, and did you include units?', show: 'b.4' },
      ],
    },
    {
      chapter: 'How high is the kite?',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'triangle', id: 'kite', adj: 46, opp: 38.6, labels: { theta: '40^\\circ', hyp: '60\\text{ m}', opp: 'h' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin 40^\\circ = \\dfrac{\\opp{h}}{\\hyp{60}}', 'h = 60 \\sin 40^\\circ \\approx 38.6\\text{ m}'] }],
      lines: [
        { say: 'A kite string is sixty metres long, and makes an angle of forty degrees with the ground. How high is the kite? Ignore the sag in the string.', show: ['kite.shape', 'kite.theta', 'kite.hyp'] },
        { say: 'The string is the hypotenuse, and the height h is opposite the forty-degree angle. Opposite and hypotenuse: SOH. Sine forty degrees equals h over sixty.', show: ['kite.opp', 'm.0'], focus: ['kite.opp', 'kite.hyp', 'm.0'] },
        { say: 'Multiply: h is sixty times sine forty degrees, about 38.6 metres. Check: the height is shorter than the string, as it must be.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Elevation and depression',
      layout: 'split',
      leftWidth: 620,
      left: [elevator],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan 24^\\circ = \\dfrac{\\opp{32}}{\\adj{d}}', 'd = \\dfrac{32}{\\tan 24^\\circ} \\approx 71.9\\text{ m}'] }],
      lines: [
        { say: 'Many problems describe an angle by where you are looking. The angle of elevation is measured up from the horizontal to your line of sight. The angle of depression is measured down from the horizontal.', show: ['el.ground', 'el.tower', 'el.truck', 'el.sight', 'el.horiz'] },
        { say: 'From the top of a 32-metre grain elevator, a worker sees a truck at an angle of depression of 24 degrees.', show: ['el.dep', 'el.h'], focus: 'el.dep' },
        { say: 'The horizontal line at the top is parallel to the ground, so the angle at the truck is also 24 degrees. They are alternate angles. Put that angle at the bottom of your triangle.', show: ['el.elev', 'el.right'], focus: ['el.dep', 'el.elev'] },
        { say: 'From that angle, the height is opposite and the distance d is adjacent: TOA. The unknown is on the bottom, so divide: about 71.9 metres.', show: ['el.d', 'm.0', 'm.1'], focus: ['el.d', 'm.1'] },
      ],
    },
    {
      chapter: 'The wrong line',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Measuring from the wrong line', md: 'An angle of depression is measured from the **horizontal**, not from the wall. Putting $24^\\circ$ between the line of sight and the wall gives the wrong triangle.' }],
      lines: [
        { say: 'An angle of depression is measured from the horizontal, not from the wall of the building.', show: 'oops' },
        { say: 'If you put the 24 degrees between the line of sight and the wall, you get the wrong triangle, and the wrong answer.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From the top of a $20\\text{ m}$ cliff, a boat is at an angle of depression of $30^\\circ$. How far is the boat from the base of the cliff?',
          choices: ['$34.6\\text{ m}$', '$11.5\\text{ m}$', '$40\\text{ m}$', '$17.3\\text{ m}$'],
          answer: 0,
          working: 'The angle at the boat is also $30^\\circ$. The height is opposite and the distance is adjacent: $d = \\dfrac{20}{\\tan 30^\\circ} \\approx 34.6\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. From the top of a twenty-metre cliff, a boat is at an angle of depression of thirty degrees. How far is the boat from the base of the cliff? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The angle at the boat is also thirty degrees. The height is opposite and the distance is adjacent, so d is twenty over tan thirty degrees: about 34.6 metres. B multiplies instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch, mark, name, choose, then check.', 'Elevation and depression are measured from the horizontal.', 'The angle of depression from the top equals the angle of elevation from the bottom.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the problem, mark it, name the sides, choose the ratio, and check your answer.', show: 'sum.0' },
        { say: 'Angles of elevation and depression are measured from the horizontal.', show: 'sum.1' },
        { say: 'And the angle of depression from the top equals the angle of elevation from the bottom. In part two, we solve roof, ramp and ladder problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
