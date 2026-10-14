import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** Two flights of stairs (drawn as their stringers) with a flat landing, at a twentieth of size. */
const flights: Part = {
  points: { S0: [0, 0], S1: [8.1, 5.4], S2: [13.1, 5.4], S3: [19.85, 9.9], G: [21, 0], b1: [8.1, 0], b3: [19.85, 0], l0: [8.1, 6.4], l1: [13.1, 6.4] },
  items: [
    { kind: 'line', id: 'floor', from: 'S0', to: 'G', tone: 'muted', group: 'frame' },
    { kind: 'line', id: 'f1', from: 'S0', to: 'S1', tone: 'brand', weight: 5, group: 'flights' },
    { kind: 'line', id: 'landing', from: 'S1', to: 'S2', weight: 5, group: 'flights' },
    { kind: 'line', id: 'f2', from: 'S2', to: 'S3', tone: 'brand', weight: 5, group: 'flights' },
    { kind: 'line', id: 'rise1', from: 'b1', to: 'S1', tone: 'opp', dashed: true, label: '108', labelSide: 'right', group: 'rises' },
    { kind: 'line', id: 'rise2', from: 'b3', to: 'S3', tone: 'opp', dashed: true, label: '198', labelSide: 'right', group: 'rises' },
    { kind: 'line', id: 'land', from: 'l0', to: 'l1', tone: 'adj', label: '100', labelSide: 'left', group: 'rises' },
    { kind: 'angle', id: 'alpha', at: 'S0', from: 'G', to: 'S1', label: '\\alpha', r: 120, labelDist: 160, tone: 'theta' },
    { kind: 'line', id: 'straight', from: 'S0', to: 'S3', tone: 'hyp', dashed: true, group: 'overall' },
    { kind: 'angle', id: 'theta', at: 'S0', from: 'G', to: 'S3', label: '\\theta', r: 60, labelDist: 90, tone: 'opp', group: 'overall' },
  ],
};

const video: Explainer = {
  id: 'm203-4-3-c',
  lessonId: 'm203-4-3',
  title: 'Chains of Right Triangles, Part 3: Stairs with a Landing',
  thumbnailTitle: 'Stairs with a Landing',
  thumbnail: 'st',
  summary: 'Two flights of stairs with 18 cm risers and 27 cm treads and a 100 cm landing: the step angle (about 33.7°), the stringer lengths (about 357 cm in all), and the angle of a straight line from bottom to top (about 26.5°), counting the landing in the run.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.3 · Part 3', title: 'Stairs with a Landing', subtitle: 'One step angle, several triangles' }],
      lines: [
        { say: 'Long staircases often have a flat landing halfway up. A carpenter needs the angle of the steps, and the length of the stringers, the boards that hold the steps.', show: 'title' },
        { say: 'In this video, you will solve a chain of triangles for two flights and a landing.' },
      ],
    },
    {
      chapter: 'The step angle',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tan\\alpha = \\dfrac{18}{27}', '\\alpha \\approx 33.7^\\circ'] }],
      lines: [
        { say: 'Every step has a riser of eighteen centimetres and a tread of twenty-seven. Triangle one is a single step: the riser is opposite the step angle, alpha, and the tread is adjacent. Tangent alpha is eighteen over twenty-seven.', show: 'm.0', focus: 'm.0' },
        { say: 'So alpha is about 33.7 degrees. Every flight built with these steps has this angle.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The stringers',
      layout: 'split',
      leftWidth: 700,
      left: [figure('st', [flights], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['L_1 = \\dfrac{108}{\\sin\\alpha} \\approx 194.70', 'L_2 = \\dfrac{90}{\\sin\\alpha} \\approx 162.25', '\\text{total} \\approx 357 \\text{ cm}'] }],
      lines: [
        { say: 'The first flight rises 108 centimetres, the landing is 100 centimetres long, and the second flight rises ninety more. Triangles two and three are the flights.', show: ['st.frame', 'st.flights', 'st.rises', 'st.alpha'] },
        { say: 'Each stringer is a hypotenuse, with the rise opposite alpha: SOH. The first is 108 over sine alpha, about 194.70 centimetres.', show: 'm.0', focus: ['st.f1', 'm.0'] },
        { say: 'The second is ninety over sine alpha, about 162.25. Together, about 357 centimetres of stringer on each side.', show: ['m.1', 'm.2'], focus: ['st.f2', 'm.2'] },
      ],
    },
    {
      chapter: 'From bottom to top',
      layout: 'split',
      leftWidth: 540,
      left: [figure('ov', [flights], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{108}{\\tan\\alpha} = 162, \\;\\; \\dfrac{90}{\\tan\\alpha} = 135', '\\text{run} = 162 + 100 + 135 = 397', '\\tan\\theta = \\dfrac{198}{397}', '\\theta \\approx 26.5^\\circ'] }],
      lines: [
        { say: 'What angle does a straight line from the bottom of the stairs to the top make with the floor? First, the runs of the flights: 108 over tangent alpha is 162 centimetres, and ninety over tangent alpha is 135.', show: ['ov.frame', 'ov.flights', 'ov.rises', 'm.0'], focus: 'm.0' },
        { say: 'The large triangle has a rise of 198, and a run of 162 plus the 100 centimetre landing, plus 135: 397 centimetres.', show: ['ov.overall', 'm.1'], focus: ['ov.straight', 'm.1'] },
        { say: 'Tangent theta is 198 over 397, so theta is about 26.5 degrees: less steep than the steps, because the landing adds run but no rise.', show: ['m.2', 'm.3'], focus: ['ov.theta', 'm.3'] },
      ],
    },
    {
      chapter: 'Forgetting the landing',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the landing', md: 'The landing is flat. It has **no** stringer, but it **does** add to the total run. Leave it out of the stringers, and include it in the large triangle.' }],
      lines: [
        { say: 'Two opposite slips are easy to make. The landing is flat, so it has no stringer: leave it out of the stringer lengths. But it does add to the total run, so include it in the large triangle.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Stairs have $17$ cm risers and $28$ cm treads. What angle do they make with the floor, to the nearest tenth of a degree?',
          choices: ['$31.3^\\circ$', '$58.7^\\circ$', '$37.4^\\circ$', '$0.6^\\circ$'],
          answer: 0,
          working: '$\\tan\\alpha = \\dfrac{17}{28}$, so $\\alpha \\approx 31.3^\\circ$. B divides the tread by the riser.',
        },
      ],
      lines: [
        { say: 'Your turn. Stairs have seventeen-centimetre risers and twenty-eight-centimetre treads. What angle do they make with the floor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Tangent alpha is seventeen over twenty-eight, so alpha is about 31.3 degrees. B divides the tread by the riser.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One step gives the angle for every flight.', 'Each stringer is a hypotenuse: rise ÷ sin of the step angle.', 'The landing adds run, but no rise and no stringer.'] }],
      lines: [
        { say: 'Let’s sum up. One step gives the angle for every flight.', show: 'sum.0' },
        { say: 'Each stringer is a hypotenuse: the rise divided by the sine of the step angle.', show: 'sum.1' },
        { say: 'And the landing adds run, but no rise and no stringer. In part four, we go into three dimensions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
