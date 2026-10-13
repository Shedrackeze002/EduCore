import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-1-b',
  lessonId: 'm10c-2-1',
  title: 'The Tangent Ratio, Part 2: Finding Sides and Angles',
  thumbnailTitle: 'Finding Sides and Angles',
  summary: 'Use the tangent ratio to find a missing side, whether the unknown is on the top or the bottom of the ratio, and use the inverse tangent to find an angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.1 · Part 2', title: 'Finding Sides and Angles', subtitle: 'Putting the tangent ratio to work' }],
      lines: [
        { say: "In part one, we met the tangent ratio. Now let's put it to work, and find lengths and angles that we cannot measure directly.", show: 'title' },
      ],
    },
    {
      chapter: 'Recap',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, labels: { opp: '\\text{opposite}', adj: '\\text{adjacent}', theta: '\\theta' } }],
      right: [{ kind: 'math', id: 'def', lines: ['\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}'], size: 'lg' }],
      lines: [
        { say: 'A quick recap. In a right triangle, tan theta equals the opposite side divided by the adjacent side.', show: ['tri', 'def'], focus: 'def.0' },
        { say: 'So if we know an angle and one leg, we can find the other leg. And if we know both legs, we can find the angle.', focus: ['tri.opp', 'tri.adj'] },
      ],
    },
    {
      chapter: 'Finding a side',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 15, opp: 9.4, labels: { theta: '32^\\circ', adj: '15\\text{ cm}', opp: 'x' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\tan 32^\\circ = \\dfrac{\\opp{x}}{\\adj{15}}', '\\opp{x} = 15\\tan 32^\\circ', '\\opp{x} \\approx 9.4\\text{ cm}'] },
        { kind: 'calc', id: 'calc', keys: '15 × tan(32)', result: '9.3730' },
      ],
      lines: [
        { say: 'If you know an angle and one leg, the tangent ratio gives you the other leg.', show: 'tri.shape' },
        { say: 'Here theta is thirty-two degrees, the adjacent side is fifteen centimetres, and we want the opposite side, x.', show: 'tri', focus: 'tri.opp' },
        { say: 'Write the tangent ratio: tan thirty-two degrees equals x over fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Here x is on the top, so multiply both sides by fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'On the calculator, fifteen times tan thirty-two degrees is about 9.37.', show: 'calc', focus: 'm' },
        { say: 'So x is about 9.4 centimetres.', show: 'm.2', focus: ['m.2', 'tri.opp'] },
      ],
    },
    {
      chapter: 'Unknown on the bottom',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 12.5, opp: 20, labels: { theta: '58^\\circ', opp: '20\\text{ m}', adj: 'x' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\tan 58^\\circ = \\dfrac{\\opp{20}}{\\adj{x}}', '\\adj{x}\\tan 58^\\circ = 20', '\\adj{x} = \\dfrac{20}{\\tan 58^\\circ} \\approx 12.5\\text{ m}'] },
        { kind: 'callout', id: 'warn', tone: 'mistake', title: 'Unknown on the bottom', md: 'When $x$ is in the denominator, **divide**: $x = \\dfrac{\\text{opposite}}{\\tan\\theta}$. Check that the answer makes sense.' },
      ],
      lines: [
        { say: 'Sometimes the unknown is the adjacent side. Here theta is fifty-eight degrees and the opposite side is twenty metres.', show: 'tri', focus: 'tri.adj' },
        { say: 'Tan fifty-eight degrees equals twenty over x. This time, x is on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by x,', show: 'm.1', focus: 'm.1' },
        { say: 'then divide both sides by tan fifty-eight degrees. So x is twenty divided by tan fifty-eight degrees, which is about 12.5 metres.', show: 'm.2', focus: 'm.2' },
        { say: "A common mistake is to multiply here. When x is on the bottom, you divide.", show: 'warn', focus: 'm' },
        { say: 'And check that your answer makes sense. The angle is more than forty-five degrees, so the adjacent side should be shorter than the opposite side. And 12.5 is less than twenty.', focus: 'tri.adj' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 14, opp: 1.2, setting: 'ramp', labels: { theta: '\\theta', adj: '14\\text{ m}', opp: '1.2\\text{ m}' } }],
      right: [
        { kind: 'math', id: 'm', lines: ['\\tan\\thc{\\theta} = \\dfrac{\\opp{1.2}}{\\adj{14}}', '\\thc{\\theta} = \\tan^{-1}\\left(\\dfrac{1.2}{14}\\right)', '\\thc{\\theta} \\approx 4.9^\\circ'] },
        { kind: 'calc', id: 'calc', keys: 'tan⁻¹(1.2 ÷ 14)', result: '4.8990' },
      ],
      lines: [
        { say: 'If you know both legs, you can find the angle. A ramp rises 1.2 metres over a horizontal distance of fourteen metres.', show: 'tri' },
        { say: 'What angle does it make with the ground? Tan theta equals 1.2 over fourteen.', show: 'm.0', focus: ['m.0', 'tri.theta'] },
        { say: 'To undo the tangent, use the inverse tangent, written tan to the minus one. On most calculators it is the second function on the tan key.', show: 'm.1', focus: 'm.1' },
        { say: 'Tan to the minus one of 1.2 over fourteen is about 4.9 degrees.', show: ['calc', 'm.2'], focus: 'm.2' },
        { say: 'That is a gentle ramp, which makes sense, because it rises only a little over a long distance.', focus: 'tri.theta' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a right triangle, $\\thc{\\theta} = 40^\\circ$ and the [[adj:adjacent]] side is $10$ cm. Which expression gives the [[opp:opposite]] side $x$?',
          choices: ['$\\dfrac{10}{\\tan 40^\\circ}$', '$10\\tan 40^\\circ$', '$\\dfrac{\\tan 40^\\circ}{10}$', '$10 + \\tan 40^\\circ$'],
          answer: 1,
          working: '$\\tan 40^\\circ = \\dfrac{x}{10}$, so $x = 10\\tan 40^\\circ \\approx 8.4$ cm.',
        },
      ],
      lines: [
        { say: "Now it's your turn. Theta is forty degrees and the adjacent side is ten centimetres. Which expression gives the opposite side, x? Pause the video and try it.", show: 'q', wait: 6 },
        { say: 'The answer is B. Tan forty degrees equals x over ten, so x is ten times tan forty degrees. That is about 8.4 centimetres.', show: 'q.answer' },
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
            'Write the ratio: $\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}$',
            'Unknown on top: multiply. Unknown on the bottom: divide.',
            'Check that the answer makes sense.',
            'Use $\\tan^{-1}$ to find an angle, in degree mode.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Start by writing the tangent ratio with the numbers you know.", show: 'sum.0' },
        { say: "When the unknown is on top, multiply. When it's on the bottom, divide.", show: 'sum.1' },
        { say: 'Check that your answer makes sense.', show: 'sum.2' },
        { say: 'And use the inverse tangent to find an angle. Now practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
