import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-4-1-b',
  lessonId: 'm203-4-1',
  title: 'Right Triangle Review, Part 2: Finding a Side with SOH CAH TOA',
  thumbnailTitle: 'Finding a Side',
  thumbnail: 'tri',
  summary: 'The three trigonometric ratios, a four-step plan (sketch, label, choose, solve), the 17.7 m guy wire attached 15 m up a tower at 58°, the height of a kite on an 80 m string at 40° (about 51.4 m), and checking degree mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.1 · Part 2', title: 'Finding a Side with SOH CAH TOA', subtitle: 'When an angle is involved' }],
      lines: [
        { say: 'When an angle is part of the problem, the Pythagorean theorem is not enough. You need a trigonometric ratio.', show: 'title' },
        { say: 'In this video, you will choose the right ratio, and find a missing side.' },
      ],
    },
    {
      chapter: 'The three ratios',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}', '\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}', '\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}'] }],
      lines: [
        { say: 'The memory aid SOH CAH TOA tells you the three ratios. SOH: sine is opposite over hypotenuse.', show: 'm.0', focus: 'm.0' },
        { say: 'CAH: cosine is adjacent over hypotenuse.', show: 'm.1', focus: 'm.1' },
        { say: 'TOA: tangent is opposite over adjacent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sketch** the triangle and mark the right angle.', '**Label** the sides from the angle: opposite, adjacent, hypotenuse.', '**Choose** the ratio that uses the side you know and the side you want.', '**Solve**: multiply if the unknown is on top; divide if it is on the bottom.'] }],
      lines: [
        { say: 'Use the same four steps every time. Sketch the triangle, and mark the right angle.', show: 'b.0' },
        { say: 'Label the sides from the angle: opposite, adjacent, and hypotenuse.', show: 'b.1' },
        { say: 'Choose the ratio that uses the side you know and the side you want.', show: 'b.2' },
        { say: 'Then solve. If the unknown is on the top of the ratio, multiply. If it is on the bottom, divide.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A guy wire',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'triangle', id: 'gw', adj: 9.37, opp: 15, labels: { theta: '58^\\circ', opp: '15\\text{ m}', hyp: 'L' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin 58^\\circ = \\dfrac{15}{L}', 'L = \\dfrac{15}{\\sin 58^\\circ} \\approx \\dfrac{15}{0.8480}', 'L \\approx 17.7 \\text{ m}'] }],
      lines: [
        { say: 'A guy wire is attached fifteen metres up a radio tower, and makes an angle of fifty-eight degrees with the ground. How long is the wire?', show: ['gw.shape', 'gw.theta', 'gw.opp', 'gw.hyp'] },
        { say: 'From the fifty-eight degree angle, the fifteen-metre height is opposite, and the wire is the hypotenuse. Opposite and hypotenuse: SOH. Sine fifty-eight degrees equals fifteen over L.', show: 'm.0', focus: ['gw.opp', 'gw.hyp', 'm.0'] },
        { say: 'The unknown is on the bottom, so divide: L is fifteen divided by sine fifty-eight degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'L is about 17.7 metres. Check: the wire is longer than the fifteen-metre height, as a hypotenuse must be.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How high is the kite?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sin 40^\\circ = \\dfrac{h}{80}', 'h = 80 \\sin 40^\\circ \\approx 80 \\times 0.6428 \\approx 51.4 \\text{ m}'] }],
      lines: [
        { say: 'A kite string is eighty metres long, and makes an angle of forty degrees with the ground. Ignoring sag, how high is the kite? The string is the hypotenuse, and the height is opposite the angle: SOH again.', show: 'm.0', focus: 'm.0' },
        { say: 'This time the unknown is on top, so multiply: eighty times sine forty degrees, about 51.4 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Degree mode',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree mode and dividing the wrong way', md: 'Check that your calculator is in **degree** mode: $\\sin 40^\\circ \\approx 0.6428$. If you get $0.7451$, it is in radian mode. And when the unknown is on the bottom, divide: $\\dfrac{15}{\\sin 58^\\circ}$, not $15\\sin 58^\\circ$.' }],
      lines: [
        { say: 'Two quick checks. First, your calculator must be in degree mode. Sine forty should be about 0.6428. If you get 0.7451, it is in radian mode.', show: 'oops' },
        { say: 'Second, when the unknown is on the bottom, divide. Fifteen times sine fifty-eight would give a wire shorter than the height it reaches, which is impossible.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ramp makes an angle of $5^\\circ$ with the ground and has a horizontal run of $8$ m. How high does it rise, to the nearest hundredth of a metre?',
          choices: ['$0.70$ m', '$91.44$ m', '$8.03$ m', '$7.97$ m'],
          answer: 0,
          working: 'The run is adjacent and the rise is opposite: $\\tan 5^\\circ = \\dfrac{h}{8}$, so $h = 8\\tan 5^\\circ \\approx 0.70$ m. B divides instead of multiplying.',
        },
      ],
      lines: [
        { say: 'Your turn. A ramp makes an angle of five degrees with the ground, and has a horizontal run of eight metres. How high does it rise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The run is adjacent and the rise is opposite: TOA. h is eight times tangent five degrees, about 0.70 metres. B divides instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['SOH CAH TOA: sine, cosine, tangent.', 'Label from the angle, then choose the ratio with the known and wanted sides.', 'Unknown on top: multiply. On the bottom: divide.'] }],
      lines: [
        { say: 'Let’s sum up. SOH CAH TOA gives the sine, cosine and tangent ratios.', show: 'sum.0' },
        { say: 'Label the sides from the angle, then choose the ratio with the side you know and the side you want.', show: 'sum.1' },
        { say: 'And if the unknown is on top, multiply. If it is on the bottom, divide. In part three, we find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
