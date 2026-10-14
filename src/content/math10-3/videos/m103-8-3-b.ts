import type { DiagramEl, Explainer } from '@/video/script.ts';

/** A transit 1.5 m above the ground, 40 m from a building, sighting its top at 35°. */
const transit: DiagramEl = {
  kind: 'diagram',
  id: 'tr',
  points: { G: [0, 0], P: [0, 1.5], Q: [40, 1.5], F: [40, 0], T: [40, 29.51] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'G' },
    { kind: 'thing', id: 'bldg', type: 'building', at: 'F', top: 'T', width: 12, side: 'right' },
    { kind: 'line', id: 'tripod', from: 'G', to: 'P', tone: 'opp', weight: 5, label: '1.5\\text{ m}', labelSide: 'left' },
    { kind: 'line', id: 'dist', from: 'G', to: 'F', tone: 'muted', label: '40\\text{ m}', labelSide: 'right' },
    { kind: 'line', id: 'level', from: 'P', to: 'Q', tone: 'adj', dashed: true },
    { kind: 'line', id: 'sight', from: 'P', to: 'T' },
    { kind: 'line', id: 'x', from: 'Q', to: 'T', tone: 'opp', label: 'x', labelSide: 'left' },
    { kind: 'right', id: 'right', at: 'Q', from: 'P', to: 'T' },
    { kind: 'angle', id: 'ang', at: 'P', from: 'Q', to: 'T', r: 60, label: '35^\\circ' },
  ],
};

const video: Explainer = {
  id: 'm103-8-3-b',
  lessonId: 'm103-8-3',
  title: 'Trigonometry on the Job, Part 2: Roofs, Ramps and Ladders',
  thumbnailTitle: 'Roofs, Ramps and Ladders',
  thumbnail: 'tr',
  summary: 'Turning a roof pitch or ramp slope into an angle with inverse tangent, the angle and rafter length of a 6/12 roof, setting up a ladder at 75°, and a two-step problem with a surveyor’s transit on a tripod, keeping every digit until the end.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.3 · Part 2', title: 'Roofs, Ramps and Ladders', subtitle: 'Trigonometry on the job' }],
      lines: [
        { say: 'On the job, a slope is often given as a ratio, like a six-twelve roof, instead of an angle.', show: 'title' },
        { say: 'In this video, you will turn slopes into angles, set up a ladder safely, and solve a two-step problem.' },
      ],
    },
    {
      chapter: 'Pitch and slope',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Roof pitch', md: 'The rise for every $12$ units of run. A **6/12 pitch** rises $6\\text{ in}$ for every $12\\text{ in}$ of run.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{6/12 roof: } \\tan^{-1}\\left(\\tfrac{6}{12}\\right) \\approx 26.6^\\circ', '\\text{1 : 12 ramp: } \\tan^{-1}\\left(\\tfrac{1}{12}\\right) \\approx 4.8^\\circ'] },
      ],
      lines: [
        { say: 'Pitch is the rise of a roof for every twelve units of run. A six-twelve pitch rises six inches for every twelve inches.', show: 'def' },
        { say: 'To change a slope ratio into an angle, take the inverse tangent of the rise over the run. A six-twelve roof makes about 26.6 degrees with the horizontal.', show: 'm.0', focus: 'm.0' },
        { say: 'And a wheelchair ramp with a one-to-twelve slope makes about 4.8 degrees with the ground.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A rafter for a 6/12 roof',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'triangle', id: 'raf', adj: 12, opp: 6, labels: { theta: '\\theta', adj: '12\\text{ ft}', opp: '6\\text{ ft}', hyp: 'L' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\thc{\\theta} = \\tan^{-1}(0.5) \\approx 26.6^\\circ', 'L = \\dfrac{12}{\\cos\\thc{\\theta}} \\approx 13.4\\text{ ft}', '\\sqrt{12^2 + 6^2} \\approx 13.4 \\;\\checkmark'] }],
      lines: [
        { say: 'Each rafter on a six-twelve roof covers a horizontal run of twelve feet, so it rises six feet. The angle is the inverse tangent of six over twelve: about 26.6 degrees.', show: ['raf.shape', 'raf.adj', 'raf.opp', 'raf.theta', 'm.0'], focus: 'm.0' },
        { say: 'The run is adjacent, and the rafter is the hypotenuse, so L is twelve over the cosine of the angle. Use the full angle from your calculator: about 13.4 feet.', show: ['raf.hyp', 'm.1'], focus: ['raf.hyp', 'm.1'] },
        { say: 'The Pythagorean theorem agrees: about 13.4 feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Setting up a ladder',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'lad', adj: 2.07, opp: 7.73, setting: 'ladder', labels: { theta: '75^\\circ', hyp: '8\\text{ m}', adj: 'd', opp: 'h' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d = 8 \\cos 75^\\circ \\approx 2.1\\text{ m}', 'h = 8 \\sin 75^\\circ \\approx 7.7\\text{ m}'] }],
      lines: [
        { say: 'A common safety guideline says a ladder should make about 75 degrees with the ground: roughly one metre out from the wall for every four metres up.', show: ['lad.shape', 'lad.theta', 'lad.hyp'] },
        { say: 'An eight-metre ladder is set at 75 degrees. The ladder is the hypotenuse, and the foot distance is adjacent: d is eight times cosine 75 degrees, about 2.1 metres.', show: ['lad.adj', 'm.0'], focus: ['lad.adj', 'm.0'] },
        { say: 'The height is opposite: h is eight times sine 75 degrees, about 7.7 metres.', show: ['lad.opp', 'm.1'], focus: ['lad.opp', 'm.1'] },
      ],
    },
    {
      chapter: 'Two-step problems',
      layout: 'split',
      leftWidth: 540,
      left: [transit],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 40 \\tan 35^\\circ \\approx 28.01\\text{ m}', '28.01 + 1.5 \\approx 29.5\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding too early', md: 'Keep every digit on your calculator until the last step.' },
      ],
      lines: [
        { say: 'A surveyor’s transit sits on a tripod 1.5 metres above the ground, forty metres from an office building. The angle of elevation to the top of the building is 35 degrees. How tall is the building?', show: ['tr.ground', 'tr.bldg', 'tr.tripod', 'tr.dist', 'tr.level', 'tr.sight', 'tr.ang'] },
        { say: 'The triangle starts at the transit, not at the ground. The forty metres is adjacent, and x, the height above the transit, is opposite: TOA. x is forty times tan 35 degrees, about 28.01 metres.', show: ['tr.x', 'tr.right', 'm.0'], focus: ['tr.x', 'm.0'] },
        { say: 'Then add the height of the transit: about 29.5 metres. Keep all the digits until the last step, because rounding in the middle can change the answer.', show: ['m.1', 'oops'], focus: ['tr.tripod', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $10\\text{ m}$ ladder is set at $75^\\circ$ to the ground. How high up the wall does it reach, to the nearest tenth of a metre?',
          choices: ['$9.7\\text{ m}$', '$2.6\\text{ m}$', '$37.3\\text{ m}$', '$10.4\\text{ m}$'],
          answer: 0,
          working: 'The height is opposite and the ladder is the hypotenuse: $h = 10 \\sin 75^\\circ \\approx 9.7\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ten-metre ladder is set at 75 degrees to the ground. How high up the wall does it reach, to the nearest tenth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The height is opposite, and the ladder is the hypotenuse, so h is ten times sine 75 degrees: about 9.7 metres. B uses cosine, which gives the distance from the wall.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A slope becomes an angle with $\\tan^{-1}\\left(\\dfrac{\\text{rise}}{\\text{run}}\\right)$.', 'A ladder should make about $75^\\circ$ with the ground.', 'In two-step problems, keep every digit until the end.'] }],
      lines: [
        { say: 'Let’s sum up. A slope ratio becomes an angle with the inverse tangent of the rise over the run.', show: 'sum.0' },
        { say: 'A ladder should make about 75 degrees with the ground.', show: 'sum.1' },
        { say: 'And in two-step problems, keep every digit until the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
