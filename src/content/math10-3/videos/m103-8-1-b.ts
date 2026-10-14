import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-8-1-b',
  lessonId: 'm103-8-1',
  title: 'The Tangent Ratio, Part 2: Finding Sides and Angles',
  thumbnailTitle: 'Using the Tangent Ratio',
  thumbnail: 'tri',
  summary: 'Finding a leg with tangent when the unknown is on top (multiply) or on the bottom (divide), checking that the answer makes sense, and finding an angle with inverse tangent, as for the angle of a staircase.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.1 · Part 2', title: 'Using the Tangent Ratio', subtitle: 'Finding sides and angles' }],
      lines: [
        { say: 'How high up a tower is a guy wire attached? How steep is a staircase? If you know one angle and one leg, or both legs, tangent tells you.', show: 'title' },
        { say: 'In this video, you will use tangent to find a missing side, and the inverse tangent to find an angle.' },
      ],
    },
    {
      chapter: 'The unknown on top',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'triangle', id: 'tri', adj: 12, opp: 19.2, labels: { theta: '58^\\circ', adj: '12\\text{ m}', opp: 'h' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan 58^\\circ = \\dfrac{\\opp{h}}{\\adj{12}}', 'h = 12 \\tan 58^\\circ', 'h \\approx 19.2\\text{ m}'] },
        { kind: 'calc', id: 'calc', keys: '12 × tan(58)', result: '19.2041' },
      ],
      lines: [
        { say: 'A guy wire is anchored twelve metres from the base of a radio tower, and makes an angle of 58 degrees with the ground. How high up the tower is it attached?', show: ['tri.shape', 'tri.theta', 'tri.adj'] },
        { say: 'The height h is opposite the 58-degree angle, and the twelve metres is adjacent. Opposite and adjacent: use tangent. Tan 58 degrees equals h over twelve.', show: ['tri.opp', 'm.0'], focus: ['tri.opp', 'tri.adj', 'm.0'] },
        { say: 'The unknown is on top, so multiply both sides by twelve: h is twelve times tan 58 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 19.2 metres.', show: ['calc', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The unknown on the bottom',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'triangle', id: 'tri', adj: 4.48, opp: 1.2, setting: 'ramp', labels: { theta: '15^\\circ', adj: 'x', opp: '1.2\\text{ m}' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan 15^\\circ = \\dfrac{\\opp{1.2}}{\\adj{x}}', 'x = \\dfrac{1.2}{\\tan 15^\\circ} \\approx 4.5\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying when you should divide', md: '$1.2 \\times \\tan 15^\\circ \\approx 0.3\\text{ m}$ is far too short for a gentle ramp. Does the answer make sense?' },
      ],
      lines: [
        { say: 'A loading dock is 1.2 metres high. A ramp up to it makes an angle of fifteen degrees with the ground. What horizontal distance does the ramp cover?', show: ['tri.shape', 'tri.theta', 'tri.opp'] },
        { say: 'The rise is opposite, and the run x is adjacent. So tan fifteen degrees equals 1.2 over x.', show: ['tri.adj', 'm.0'], focus: ['tri.adj', 'm.0'] },
        { say: 'This time, x is on the bottom. Multiply both sides by x, then divide by tan fifteen degrees: x is 1.2 over tan fifteen, about 4.5 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying instead gives about 0.3 metres, which is far too short for a gentle ramp that climbs 1.2 metres. Always ask: does my answer make sense?', show: 'oops' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'triangle', id: 'tri', adj: 28, opp: 18, labels: { theta: '\\theta', adj: '28\\text{ cm}', opp: '18\\text{ cm}' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\thc{\\theta} = \\dfrac{\\opp{18}}{\\adj{28}}', '\\thc{\\theta} = \\tan^{-1}\\left(\\dfrac{18}{28}\\right) \\approx 32.7^\\circ'] },
        { kind: 'calc', id: 'calc', keys: 'tan⁻¹(18 ÷ 28)', result: '32.7352' },
      ],
      lines: [
        { say: 'If you know both legs, use the inverse tangent to find the angle. It undoes tangent, turning a ratio back into an angle. On most calculators, it is second, or shift, then tan.', show: 'tri.shape' },
        { say: 'Each step of a staircase has a rise of eighteen centimetres and a run of 28. The rise is opposite theta, and the run is adjacent. So tan theta is eighteen over 28.', show: ['tri.theta', 'tri.opp', 'tri.adj', 'm.0'], focus: 'm.0' },
        { say: 'Theta is the inverse tangent of eighteen over 28: about 32.7 degrees.', show: ['calc', 'm.1'], focus: 'm.1' },
        { say: 'Is that reasonable? The opposite side is shorter than the adjacent side, so the angle should be less than 45 degrees. It is.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ramp rises $0.8\\text{ m}$ over a horizontal run of $6\\text{ m}$. What angle does it make with the ground, to the nearest tenth of a degree?',
          choices: ['$7.6^\\circ$', '$82.4^\\circ$', '$0.1^\\circ$', '$7.5^\\circ$'],
          answer: 0,
          working: '$\\theta = \\tan^{-1}\\left(\\dfrac{0.8}{6}\\right) \\approx 7.6^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ramp rises 0.8 metres over a horizontal run of six metres. What angle does it make with the ground, to the nearest tenth of a degree? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The inverse tangent of 0.8 over six is about 7.6 degrees. B puts the run over the rise, which is the angle at the top. C forgets the inverse tangent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write the ratio, put in what you know, then solve.', 'Unknown on top: multiply. Unknown on the bottom: divide.', 'To find an angle, use $\\tan^{-1}$ in degree mode.'] }],
      lines: [
        { say: 'Let’s sum up. Write the ratio, put in what you know, then solve for the unknown.', show: 'sum.0' },
        { say: 'If the unknown is on top, multiply. If it is on the bottom, divide.', show: 'sum.1' },
        { say: 'And to find an angle, use the inverse tangent, with your calculator in degree mode. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
