import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { cast, standardAngle } from '@/video/trig.ts';

const deg = (y: number, x: number) => ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

const video: Explainer = {
  id: 'm201-2-2',
  lessonId: 'm201-2-2',
  title: 'Trigonometric Ratios of Any Angle, Part 1: Points and CAST',
  thumbnailTitle: 'Ratios of Any Angle',
  thumbnail: 'cast',
  summary: 'The sine, cosine and tangent of an angle from a point P(x, y) on its terminal arm with r = √(x² + y²), finding the angle from a point, and the CAST rule for the sign of each ratio in each quadrant. Part 2 goes from one ratio to the others and solves for angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.2 · Part 1', title: 'Ratios of Any Angle', subtitle: 'A point on the terminal arm, and CAST' }],
      lines: [
        { say: 'A robot arm swings to a point three metres to the left of its base, and four metres up. What angle did it turn through, and what are the sine, cosine and tangent of that angle?', show: 'title' },
        { say: 'In this video, you will find all three ratios from any point on the terminal arm, and use the CAST rule to know their signs.' },
      ],
    },
    {
      chapter: 'A point on the arm',
      layout: 'split',
      leftWidth: 520,
      left: [figure('p1', [standardAngle({ deg: deg(4, -3), len: 5, label: '\\theta', drop: true, compact: true, point: 'P(-3,\\ 4)', sides: { x: '-3', y: '4', r: '5' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = \\sqrt{x^2 + y^2}', 'r = \\sqrt{(-3)^2 + 4^2} = \\sqrt{25} = 5', '\\sin\\theta = \\dfrac{4}{5} \\qquad \\cos\\theta = -\\dfrac{3}{5}', '\\tan\\theta = \\dfrac{4}{-3} = -\\dfrac{4}{3}'] }],
      lines: [
        { say: 'Let P, x, y, be any point other than the origin on the terminal arm of theta, at a distance r from the origin. By the Pythagorean theorem, r is the square root of x squared plus y squared.', show: ['p1.axes', 'p1.arm', 'p1.arc', 'p1.P', 'm.0'], focus: 'm.0' },
        { say: 'Then the sine is y over r, the cosine is x over r, and the tangent is y over x. Any point on the arm gives the same ratios.' },
        { say: 'For the robot arm, P is negative three, four. So r is the square root of nine plus sixteen: root 25, which is five.', show: ['p1.tri', 'p1.x', 'p1.y', 'p1.r', 'm.1'], focus: ['p1.x', 'p1.y', 'm.1'] },
        { say: 'The sine is four fifths, and the cosine is negative three fifths. The tangent is four over negative three: negative four thirds.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Finding the angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('p2', [standardAngle({ deg: deg(-5, 2), len: Math.sqrt(29), ref: '68.2^\\circ', drop: true, compact: true, point: 'P(2,\\ {-5})', sides: { x: '2', y: '-5' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = \\sqrt{2^2 + (-5)^2} = \\sqrt{29}', '\\cos\\theta = \\dfrac{2}{\\sqrt{29}} = \\dfrac{2\\sqrt{29}}{29}', '\\theta_R = \\tan^{-1}\\left(\\dfrac{5}{2}\\right) \\approx 68.2^\\circ', '\\theta = 360^\\circ - 68.2^\\circ \\approx 291.8^\\circ'] }],
      lines: [
        { say: 'Now P is two, negative five. Find the exact value of the cosine, and the angle, between zero and 360 degrees.', show: ['p2.axes', 'p2.arm', 'p2.arc', 'p2.P'] },
        { say: 'r is the square root of four plus 25: root 29. So the cosine is two over root 29, or two root 29 over 29.', show: ['p2.tri', 'p2.x', 'p2.y', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'For the angle, find the reference angle first, from the positive lengths: the inverse tangent of five over two, about 68.2 degrees.', show: ['p2.ref', 'm.2'], focus: ['p2.ref', 'm.2'] },
        { say: 'P is in quadrant four, so theta is 360 minus 68.2: about 291.8 degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The CAST rule',
      layout: 'split',
      leftWidth: 540,
      left: [figure('cast', [cast()])],
      right: [{ kind: 'table', id: 't', head: ['Quadrant', '$x$', '$y$', 'Positive'], rows: [['I', '$+$', '$+$', 'all three'], ['II', '$-$', '$+$', '[[opp:sine]]'], ['III', '$-$', '$-$', '[[theta:tangent]]'], ['IV', '$+$', '$-$', '[[adj:cosine]]']] }],
      lines: [
        { say: 'Because r is always positive, the sign of each ratio depends only on the signs of x and y.', show: 'cast.axes' },
        { say: 'In quadrant one, x and y are both positive, so all three ratios are positive.', show: ['t.0', 'cast.A'], focus: ['t.0', 'cast.A'] },
        { say: 'In quadrant two, only y is positive, so only the sine is positive. In quadrant three, x and y are both negative, so their quotient, the tangent, is positive. And in quadrant four, only x is positive, so only the cosine is.', show: ['t.1', 't.2', 't.3', 'cast.S', 'cast.T', 'cast.C'], focus: ['cast.S', 'cast.T', 'cast.C'] },
        { say: 'Reading counterclockwise from quadrant four, the letters spell CAST: cosine, all, sine, tangent.', focus: 'cast' },
      ],
    },
    {
      chapter: 'Locating an angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin\\theta < 0: \\text{ quadrants III and IV}', '\\tan\\theta > 0: \\text{ quadrants I and III}', '\\text{both: quadrant III}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Tangent in quadrant III', md: 'Both $x$ and $y$ are negative, so $\\dfrac{y}{x}$ is **positive**, even though sine and cosine are negative.' },
      ],
      lines: [
        { say: 'The sine of theta is negative, and the tangent is positive. In which quadrant is the terminal arm?' },
        { say: 'The sine is negative in quadrants three and four. The tangent is positive in quadrants one and three.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Both are true only in quadrant three.', show: 'm.2', focus: 'm.2' },
        { say: 'Do not forget the tangent in quadrant three. A negative over a negative is positive, so the tangent is positive there, even though the sine and the cosine are both negative.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P(-6, -8)$ is on the terminal arm of $\\theta$. What is $\\sin\\theta$?',
          choices: ['$-\\dfrac{4}{5}$', '$\\dfrac{4}{5}$', '$-\\dfrac{3}{5}$', '$\\dfrac{4}{3}$'],
          answer: 0,
          working: '$r = \\sqrt{36 + 64} = 10$, so $\\sin\\theta = \\dfrac{-8}{10} = -\\dfrac{4}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. P, negative six, negative eight, is on the terminal arm of theta. What is the sine of theta? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. r is the square root of 36 plus 64: ten. So the sine is negative eight over ten: negative four fifths. C is the cosine, and D is the tangent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$r = \\sqrt{x^2 + y^2}$, $\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$.', 'Find the angle from its reference angle and quadrant.', 'CAST: all in I, sine in II, tangent in III, cosine in IV.'] }],
      lines: [
        { say: 'Let’s sum up. From a point on the terminal arm, find r, then the sine is y over r, the cosine is x over r, and the tangent is y over x.', show: 'sum.0' },
        { say: 'To find the angle, find the reference angle from the positive lengths, then place it in the quadrant.', show: 'sum.1' },
        { say: 'And CAST tells you which ratios are positive in each quadrant. In part two, we go from one ratio to the others, and solve for angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
