import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-4-1-c',
  lessonId: 'm203-4-1',
  title: 'Right Triangle Review, Part 3: Finding an Angle',
  thumbnailTitle: 'Finding an Angle',
  thumbnail: 'tri',
  summary: 'Finding an angle from two sides with the inverse keys sin⁻¹, cos⁻¹ and tan⁻¹: a ramp that rises 0.6 m over 7.5 m (about 4.6°), a 7 m ladder with its foot 1.8 m from a wall (about 75.1°), and checking that the angle makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.1 · Part 3', title: 'Finding an Angle', subtitle: 'The inverse keys' }],
      lines: [
        { say: 'How steep is a ramp? Is a ladder set at a safe angle? When you know two sides, the trigonometric ratios can give you the angle.', show: 'title' },
        { say: 'In this video, you will find an angle with the inverse keys on your calculator.' },
      ],
    },
    {
      chapter: 'Undo the ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tan\\theta = 0.08', '\\theta = \\tan^{-1}(0.08)'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Inverse keys', md: '$\\sin^{-1}$, $\\cos^{-1}$ and $\\tan^{-1}$ take a ratio and give back the angle. On most calculators they are the second function of the sin, cos and tan keys.' },
      ],
      lines: [
        { say: 'The trigonometric ratios turn an angle into a ratio. To go the other way, from a ratio back to an angle, use an inverse key.', show: 'm.0', focus: 'm.0' },
        { say: 'If tangent theta is 0.08, then theta is the inverse tangent of 0.08.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse keys are inverse sine, inverse cosine and inverse tangent. On most calculators, they are the second function of the sin, cos and tan keys.', show: 'k' },
      ],
    },
    {
      chapter: 'How steep is the ramp?',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'triangle', id: 'rp', adj: 7.5, opp: 0.6, setting: 'ramp', labels: { theta: '\\theta', opp: '0.6\\text{ m}', adj: '7.5\\text{ m}' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = \\dfrac{0.6}{7.5} = 0.08', '\\theta = \\tan^{-1}(0.08) \\approx 4.6^\\circ'] }],
      lines: [
        { say: 'A ramp rises 0.6 metres over a horizontal run of 7.5 metres. What angle does it make with the ground?', show: ['rp.shape', 'rp.theta', 'rp.opp', 'rp.adj'] },
        { say: 'The rise is opposite the angle, and the run is adjacent: TOA. Tangent theta is 0.6 over 7.5, which is 0.08.', show: 'm.0', focus: ['rp.opp', 'rp.adj', 'm.0'] },
        { say: 'Theta is the inverse tangent of 0.08: about 4.6 degrees. A gentle ramp, as it should be.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Setting a ladder',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'triangle', id: 'ld', adj: 1.8, opp: 6.76, setting: 'ladder', labels: { theta: '\\theta', hyp: '7\\text{ m}', adj: '1.8\\text{ m}' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos\\theta = \\dfrac{1.8}{7} \\approx 0.2571', '\\theta = \\cos^{-1}\\left(\\dfrac{1.8}{7}\\right) \\approx 75.1^\\circ'] }],
      lines: [
        { say: 'A seven-metre ladder has its foot 1.8 metres from a wall. What angle does it make with the ground?', show: ['ld.shape', 'ld.theta', 'ld.hyp', 'ld.adj'] },
        { say: 'The 1.8 metres is adjacent to the angle, and the ladder is the hypotenuse: CAH. Cosine theta is 1.8 over seven, about 0.2571.', show: 'm.0', focus: ['ld.adj', 'ld.hyp', 'm.0'] },
        { say: 'Theta is the inverse cosine of that: about 75.1 degrees. A ladder leaning steeply against a wall makes a large angle with the ground, so this makes sense.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Does the angle make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the angle', md: 'An acute angle in a right triangle is between $0^\\circ$ and $90^\\circ$. The bigger angle is across from the longer leg. If a gentle ramp comes out at $85^\\circ$, you probably divided the run by the rise.' }],
      lines: [
        { say: 'Always ask whether the angle makes sense. An acute angle in a right triangle is between zero and ninety degrees, and the bigger angle is across from the longer leg.', show: 'tip' },
        { say: 'If a gentle ramp comes out at eighty-five degrees, you probably divided the run by the rise.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $12$ m zip line drops $3$ m from start to finish. What angle does it make with the horizontal, to the nearest tenth of a degree?',
          choices: ['$14.5^\\circ$', '$75.5^\\circ$', '$14.0^\\circ$', '$0.3^\\circ$'],
          answer: 0,
          working: 'The drop is opposite and the line is the hypotenuse: $\\sin\\theta = \\dfrac{3}{12} = 0.25$, so $\\theta = \\sin^{-1}(0.25) \\approx 14.5^\\circ$. B uses cosine, and C uses tangent.',
        },
      ],
      lines: [
        { say: 'Your turn. A twelve-metre zip line drops three metres from start to finish. What angle does it make with the horizontal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The drop is opposite, and the line is the hypotenuse: SOH. Sine theta is three over twelve, 0.25, and the inverse sine is about 14.5 degrees. B uses cosine, and C uses tangent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the ratio from two sides.', 'Use $\\sin^{-1}$, $\\cos^{-1}$ or $\\tan^{-1}$ to get the angle.', 'Check that the angle makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. To find an angle, first find the ratio of two sides.', show: 'sum.0' },
        { say: 'Then use inverse sine, inverse cosine, or inverse tangent to get the angle.', show: 'sum.1' },
        { say: 'And check that the angle makes sense. In part four, we solve a whole roof problem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
