import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cast, standardAngle } from '@/video/trig.ts';

const video: Explainer = {
  id: 'm201-2-2-b',
  lessonId: 'm201-2-2',
  title: 'Trigonometric Ratios of Any Angle, Part 2: Solving for Angles',
  thumbnailTitle: 'Solving for Angles',
  thumbnail: 'c3',
  summary: 'Finding the other two ratios from one ratio and the quadrant, and solving equations such as sin θ = −√3/2 and 5 cos θ + 2 = 0 for 0° ≤ θ < 360°: the reference angle from the positive value, the quadrants from CAST, then one angle in each quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.2 · Part 2', title: 'Solving for Angles', subtitle: 'Reference angle, CAST, then place it' }],
      lines: [
        { say: 'If you know one trigonometric ratio of an angle, and which quadrant it is in, you can find the other two. And an equation like sine theta equals negative one half usually has two answers between zero and 360 degrees.', show: 'title' },
        { say: 'In this video, you will build a point from one ratio, and solve trigonometric equations.' },
      ],
    },
    {
      chapter: 'From one ratio',
      layout: 'split',
      leftWidth: 420,
      left: [figure('c3', [standardAngle({ deg: 180 + (Math.atan2(12, 5) * 180) / Math.PI, len: 13 / 2.6, drop: true, compact: true, sides: { x: '-5', y: '-12', r: '13' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -5,\\quad r = 13', 'y^2 = 13^2 - (-5)^2 = 144,\\quad y = -12', '\\sin\\theta = -\\dfrac{12}{13}', '\\tan\\theta = \\dfrac{-12}{-5} = \\dfrac{12}{5}'] }],
      lines: [
        { say: 'The cosine of theta is negative five thirteenths, and theta is in quadrant three. Find the exact values of the sine and the tangent.' },
        { say: 'Build a point on the terminal arm. The cosine is x over r, so take x equal to negative five and r equal to thirteen. In quadrant three, x is negative, which matches.', show: ['c3.axes', 'c3.arm', 'c3.arc', 'c3.r', 'c3.x', 'm.0'], focus: ['c3.x', 'c3.r', 'm.0'] },
        { say: 'Use x squared plus y squared equals r squared: y squared is 169 minus 25, which is 144. y could be twelve or negative twelve, but in quadrant three it is negative: negative twelve.', show: ['c3.tri', 'c3.y', 'm.1'], focus: ['c3.y', 'm.1'] },
        { say: 'So the sine is negative twelve thirteenths, and the tangent is negative twelve over negative five: positive twelve fifths, as CAST says for quadrant three.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Solving an equation',
      layout: 'split',
      leftWidth: 480,
      left: [figure('cast', [cast()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin\\theta_R = \\dfrac{\\sqrt{3}}{2},\\quad \\theta_R = 60^\\circ', '\\sin\\theta < 0: \\text{ III and IV}', '\\theta = 180^\\circ + 60^\\circ = 240^\\circ', '\\theta = 360^\\circ - 60^\\circ = 300^\\circ'] }],
      lines: [
        { say: 'Solve the sine of theta equals negative root three over two, for theta from zero to 360 degrees. There are three steps.' },
        { say: 'First, find the reference angle from the positive value. The sine of the reference angle is root three over two, so the reference angle is sixty degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Second, use CAST to find where the sine is negative: quadrants three and four.', show: ['cast', 'm.1'], focus: ['cast.T', 'cast.C', 'm.1'] },
        { say: 'Third, place the reference angle in each of those quadrants: 180 plus sixty is 240 degrees, and 360 minus sixty is 300 degrees.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'With a calculator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\cos\\theta + 2 = 0,\\quad \\cos\\theta = -0.4', '\\theta_R = \\cos^{-1}(0.4) \\approx 66.42^\\circ', '\\theta = 180^\\circ - 66.42^\\circ \\approx 113.6^\\circ \\quad \\text{or} \\quad \\theta = 180^\\circ + 66.42^\\circ \\approx 246.4^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Trusting the calculator’s single answer', md: '$\\sin^{-1}(-0.42) \\approx -24.8^\\circ$ is not even between $0^\\circ$ and $360^\\circ$. Use $0.42$ for $\\theta_R \\approx 24.8^\\circ$, then place it in III and IV: $204.8^\\circ$ or $335.2^\\circ$.' },
      ],
      lines: [
        { say: 'Solve five cosine theta plus two equals zero, to the nearest tenth of a degree. First, isolate the cosine: negative two fifths, which is negative 0.4.', show: 'm.0', focus: 'm.0' },
        { say: 'The reference angle is the inverse cosine of positive 0.4: about 66.42 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The cosine is negative in quadrants two and three. So theta is 180 minus 66.42, about 113.6 degrees, or 180 plus 66.42, about 246.4 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'A calculator gives only one angle, and it may not even be between zero and 360. The inverse sine of negative 0.42 is about negative 24.8 degrees. Use the positive value for the reference angle instead, then place it with CAST.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\cos\\theta = \\dfrac{1}{2}$ for $0^\\circ \\le \\theta < 360^\\circ$.',
          choices: ['$60^\\circ$ and $300^\\circ$', '$60^\\circ$ only', '$60^\\circ$ and $120^\\circ$', '$120^\\circ$ and $240^\\circ$'],
          answer: 0,
          working: '$\\theta_R = 60^\\circ$, and cosine is positive in quadrants I and IV: $60^\\circ$ and $360^\\circ - 60^\\circ = 300^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the cosine of theta equals one half, for theta from zero to 360 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The reference angle is sixty degrees, and the cosine is positive in quadrants one and four: sixty and 300 degrees. B stops at the calculator’s answer, and D solves cosine equals negative one half.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From one ratio and the quadrant, build $x$, $y$ and $r$ with the right signs.', 'Reference angle from the positive value.', 'Quadrants from CAST, then place $\\theta_R$ in each.'] }],
      lines: [
        { say: 'Let’s sum up. From one ratio and the quadrant, build x, y and r, with the right signs.', show: 'sum.0' },
        { say: 'To solve for theta, find the reference angle from the positive value.', show: 'sum.1' },
        { say: 'Then find the quadrants with CAST, and place the reference angle in each one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
