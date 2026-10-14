import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-8-2-b',
  lessonId: 'm103-8-2',
  title: 'Sine and Cosine, Part 2: Finding Sides and Angles',
  thumbnailTitle: 'Using Sine and Cosine',
  thumbnail: 'raf',
  summary: 'Finding a side with sine or cosine (multiply when the unknown is on top, divide when it is on the bottom), checking that the hypotenuse is the longest side, and finding an angle with inverse sine or cosine: a ladder and a plumbing offset.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.2 · Part 2', title: 'Using Sine and Cosine', subtitle: 'Finding sides and angles' }],
      lines: [
        { say: 'How high does a ladder reach? How long is a rafter? How sharp is a bend in a pipe? Sine and cosine answer all three.', show: 'title' },
        { say: 'In this video, you will use sine and cosine to find missing sides and angles.' },
      ],
    },
    {
      chapter: 'The unknown on top',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'lad', adj: 1.68, opp: 6.28, setting: 'ladder', labels: { theta: '75^\\circ', hyp: '6.5\\text{ m}', opp: 'h' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin 75^\\circ = \\dfrac{\\opp{h}}{\\hyp{6.5}}', 'h = 6.5 \\sin 75^\\circ \\approx 6.3\\text{ m}'] },
        { kind: 'calc', id: 'calc', keys: '6.5 × sin(75)', result: '6.2785' },
      ],
      lines: [
        { say: 'The method is the same as with tangent: write the ratio, put in what you know, then solve. How high up the wall does a 6.5-metre ladder at 75 degrees reach?', show: ['lad.shape', 'lad.theta', 'lad.hyp', 'lad.opp'] },
        { say: 'The height is opposite, and the ladder is the hypotenuse: SOH. Sine 75 degrees equals h over 6.5.', show: 'm.0', focus: ['lad.opp', 'lad.hyp', 'm.0'] },
        { say: 'The unknown is on top, so multiply: h is 6.5 times sine 75 degrees, about 6.3 metres.', show: ['m.1', 'calc'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'The unknown on the bottom',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'triangle', id: 'raf', adj: 4.5, opp: 2.39, labels: { theta: '28^\\circ', adj: '4.5\\text{ m}', hyp: 'L' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos 28^\\circ = \\dfrac{\\adj{4.5}}{\\hyp{L}}', 'L = \\dfrac{4.5}{\\cos 28^\\circ} \\approx 5.1\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The hypotenuse is the longest side', md: '$4.5 \\times \\cos 28^\\circ \\approx 4.0\\text{ m}$ is shorter than the run, so it cannot be the rafter.' },
      ],
      lines: [
        { say: 'A roof rafter covers a horizontal run of 4.5 metres, at an angle of 28 degrees. How long is the rafter? Ignore the overhang.', show: ['raf.shape', 'raf.theta', 'raf.adj', 'raf.hyp'] },
        { say: 'The run is adjacent, and the rafter L is the hypotenuse: CAH. Cosine 28 degrees equals 4.5 over L.', show: 'm.0', focus: ['raf.adj', 'raf.hyp', 'm.0'] },
        { say: 'L is on the bottom, so divide: L is 4.5 over cosine 28 degrees, about 5.1 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiplying instead gives about four metres. That is shorter than the 4.5-metre run, so it cannot be the rafter. The hypotenuse must be the longest side.', show: 'oops' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\cos\\thc{\\theta} = \\dfrac{\\adj{1.3}}{\\hyp{5}} \\;\\to\\; \\thc{\\theta} = \\cos^{-1}(0.26) \\approx 74.9^\\circ', '\\sin\\thc{\\theta} = \\dfrac{\\opp{35}}{\\hyp{50}} \\;\\to\\; \\thc{\\theta} = \\sin^{-1}(0.7) \\approx 44.4^\\circ'] },
        { kind: 'calc', id: 'calc', keys: 'sin⁻¹(35 ÷ 50)', result: '44.4270' },
      ],
      lines: [
        { say: 'To find an angle from a leg and the hypotenuse, use the inverse keys: inverse sine or inverse cosine.' },
        { say: 'The foot of a five-metre ladder is 1.3 metres from the wall. The 1.3 metres touches the angle, so it is adjacent, and the ladder is the hypotenuse. The angle is the inverse cosine of 1.3 over five: about 74.9 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'A plumber moves a drain line sideways with a diagonal piece of pipe. The diagonal is fifty centimetres long, and moves the line over 35 centimetres. The offset is opposite the angle, and the diagonal is the hypotenuse.', show: 'm.1', focus: 'm.1' },
        { say: 'So the angle is the inverse sine of 35 over fifty: about 44.4 degrees.', show: 'calc' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $4\\text{ m}$ ladder makes a $70^\\circ$ angle with the ground. How far is its foot from the wall, to the nearest tenth of a metre?',
          choices: ['$1.4\\text{ m}$', '$3.8\\text{ m}$', '$11.7\\text{ m}$', '$1.5\\text{ m}$'],
          answer: 0,
          working: 'The distance is adjacent and the ladder is the hypotenuse: $d = 4\\cos 70^\\circ \\approx 1.4\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A four-metre ladder makes a seventy-degree angle with the ground. How far is its foot from the wall, to the nearest tenth of a metre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The distance is adjacent, and the ladder is the hypotenuse, so d is four times cosine seventy degrees: about 1.4 metres. B uses sine, which gives the height, and C divides.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Unknown on top: multiply. Unknown on the bottom: divide.', 'A hypotenuse must be longer than either leg.', 'Use $\\sin^{-1}$ or $\\cos^{-1}$ to find an angle.'] }],
      lines: [
        { say: 'Let’s sum up. Write the ratio. If the unknown is on top, multiply. If it is on the bottom, divide.', show: 'sum.0' },
        { say: 'Check that a hypotenuse is longer than either leg.', show: 'sum.1' },
        { say: 'And to find an angle, use inverse sine or inverse cosine, in degree mode. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
