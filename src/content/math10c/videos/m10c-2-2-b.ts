import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-2-b',
  lessonId: 'm10c-2-2',
  title: 'The Sine and Cosine Ratios, Part 2: Finding Sides and Angles',
  thumbnailTitle: 'Sine and Cosine: Sides and Angles',
  summary: 'Use sine and cosine to find a missing side, including the hypotenuse, and the inverse ratios to find an angle, with two mistakes to avoid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.2 · Part 2', title: 'Sine and Cosine: Sides and Angles', subtitle: 'Ladders, ramps and kite strings' }],
      lines: [{ say: "In part one, we met sine, cosine and tangent. Now let's use them to solve real problems, where the hypotenuse is part of the story.", show: 'title' }],
    },
    {
      chapter: 'Finding a side with sine',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 1.85, opp: 5.7, setting: 'ladder', labels: { theta: '72^\\circ', hyp: '6\\text{ m}', opp: 'h' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\sin 72^\\circ = \\dfrac{\\opp{h}}{\\hyp{6}}', '\\opp{h} = 6\\sin 72^\\circ', '\\opp{h} \\approx 5.7\\text{ m}'] },
        { kind: 'calc', id: 'calc', keys: '6 × sin(72)', result: '5.7063' },
      ],
      lines: [
        { say: 'A six metre ladder leans against a wall, making a seventy-two degree angle with the ground. How high up the wall does it reach?', show: 'tri' },
        { say: 'The ladder is the hypotenuse, and the height is opposite the angle. Opposite and hypotenuse means sine.', focus: ['tri.hyp', 'tri.opp'] },
        { say: 'Sine seventy-two degrees equals h over six.', show: 'm.0', focus: 'm.0' },
        { say: 'Here h is on the top, so multiply both sides by six.', show: 'm.1', focus: 'm.1' },
        { say: 'Six times sine seventy-two degrees is about 5.71,', show: 'calc', focus: 'm' },
        { say: 'so the ladder reaches about 5.7 metres up the wall.', show: 'm.2', focus: ['m.2', 'tri.opp'] },
      ],
    },
    {
      chapter: 'Finding the hypotenuse',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 18, opp: 15.1, labels: { theta: '40^\\circ', adj: '18\\text{ cm}', hyp: 'x' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\cos 40^\\circ = \\dfrac{\\adj{18}}{\\hyp{x}}', '\\hyp{x} = \\dfrac{18}{\\cos 40^\\circ}', '\\hyp{x} \\approx 23.5\\text{ cm}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check your answer', md: 'The hypotenuse is the longest side. If yours is shorter than a leg, you multiplied when you should have divided.' },
      ],
      lines: [
        { say: 'Now the unknown is the hypotenuse. The side adjacent to a forty degree angle is eighteen centimetres.', show: 'tri', focus: 'tri.hyp' },
        { say: 'Adjacent and hypotenuse means cosine. Cosine forty degrees equals eighteen over x.', show: 'm.0', focus: ['m.0', 'tri.adj'] },
        { say: 'This time x is on the bottom, so divide. x equals eighteen divided by cosine forty degrees,', show: 'm.1', focus: 'm.1' },
        { say: 'which is about 23.5 centimetres.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: the hypotenuse must be the longest side, and 23.5 is longer than eighteen. If your hypotenuse comes out shorter than a leg, you multiplied when you should have divided.', show: 'tip', focus: 'm' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 30, opp: 40, labels: { theta: '\\theta', hyp: '50\\text{ m}', adj: '30\\text{ m}' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\cos\\thc{\\theta} = \\dfrac{\\adj{30}}{\\hyp{50}} = 0.6', '\\thc{\\theta} = \\cos^{-1}(0.6)', '\\thc{\\theta} \\approx 53.1^\\circ'] },
        { kind: 'calc', id: 'calc', keys: 'cos⁻¹(0.6)', result: '53.1301' },
      ],
      lines: [
        { say: 'To find an angle, use an inverse ratio. A kite string is fifty metres long, and the kite is directly above a point thirty metres away.', show: 'tri' },
        { say: 'What angle does the string make with the ground? We know the adjacent side and the hypotenuse, so we use cosine.', focus: ['tri.adj', 'tri.hyp'] },
        { say: 'Cosine theta equals thirty over fifty, which is 0.6.', show: 'm.0', focus: 'm.0' },
        { say: 'So theta is the inverse cosine of 0.6,', show: 'm.1', focus: 'm.1' },
        { say: 'which is about 53.1 degrees.', show: ['calc', 'm.2'], focus: ['m.2', 'tri.theta'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w1', tone: 'mistake', title: 'Label from your angle', md: 'Mark the angle, then label the [[hyp:hypotenuse]] first, then the [[opp:opposite]] side, and the [[adj:adjacent]] side last.' },
        { kind: 'callout', id: 'w2', tone: 'mistake', title: 'Degree mode', md: 'If $\\sin 30^\\circ$ gives $-0.988$ instead of $0.5$, your calculator is in radians. Look for **DEG** on the screen.' },
      ],
      lines: [
        { say: 'Two common mistakes to watch out for.' },
        { say: 'First, opposite and adjacent depend on the angle you use. Mark the angle, then label the hypotenuse first, then the opposite side, and the adjacent side last.', show: 'w1' },
        { say: "Second, check that your calculator is in degree mode. If sine thirty degrees gives negative 0.988 instead of 0.5, it's in radians.", show: 'w2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ramp is $4$ m long and makes an angle of $\\thc{12^\\circ}$ with the ground. How high does it rise?',
          choices: ['$4\\sin 12^\\circ \\approx 0.83$ m', '$4\\cos 12^\\circ \\approx 3.91$ m', '$4\\tan 12^\\circ \\approx 0.85$ m', '$\\dfrac{4}{\\sin 12^\\circ} \\approx 19.2$ m'],
          answer: 0,
          working: 'The ramp is the [[hyp:hypotenuse]] and the rise is [[opp:opposite]] the angle, so use sine: $h = 4\\sin 12^\\circ \\approx 0.83$ m.',
        },
      ],
      lines: [
        { say: 'Your turn. A ramp is four metres long and makes a twelve degree angle with the ground. How high does it rise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The ramp is the hypotenuse, and the rise is opposite the angle, so we use sine. h equals four times sine twelve degrees, which is about 0.83 metres.', show: 'q.answer' },
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
            'Choose the ratio that links the side you know and the side you want.',
            'Unknown on top: multiply. Unknown on the bottom, often the [[hyp:hypotenuse]]: divide.',
            'The hypotenuse is always the longest side.',
            'Use $\\sin^{-1}$, $\\cos^{-1}$ and $\\tan^{-1}$ to find angles, in degree mode.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Choose the ratio that links the side you know and the side you want.", show: 'sum.0' },
        { say: 'When the unknown is on top, multiply. When it is on the bottom, as the hypotenuse often is, divide.', show: 'sum.1' },
        { say: 'The hypotenuse is always the longest side, so use that to check your answers.', show: 'sum.2' },
        { say: 'And use the inverse ratios to find angles, in degree mode. Now practise these skills in your EduCore lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
