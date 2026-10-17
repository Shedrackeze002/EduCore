import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

const deg = (y: number, x: number) => ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

const video: Explainer = {
  id: 'm301-4-3-c',
  lessonId: 'm301-4-3',
  title: 'Trigonometric Ratios, Part 3: From One Ratio to the Others',
  thumbnailTitle: 'From One Ratio to the Others',
  thumbnail: 'csc',
  summary: 'Given one ratio and the quadrant, sketch a point on the terminal arm, read two of x, y and r with the right signs (r is always positive), and find the third with x² + y² = r²: csc θ = −17/8 in quadrant IV gives cos θ = 15/17 and cot θ = −15/8. Part 4 uses a calculator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.3 · Part 3', title: 'From One Ratio to the Others', subtitle: 'Sketch a point, then use $x^2 + y^2 = r^2$' }],
      lines: [
        { say: 'Sometimes you know just one trigonometric ratio of an angle, and which quadrant the angle ends in. That is enough to find all the others.', show: 'title' },
        { say: 'In this video, you will build a point on the terminal arm from one ratio, and use it to find exact values of the other ratios.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Sketch the angle in its quadrant.', 'Read two of $x$, $y$ and $r$ from the ratio, with the correct signs.', 'Find the third with $x^2 + y^2 = r^2$.', 'Write the ratios you need.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin\\theta = \\dfrac{y}{r} \\qquad \\cos\\theta = \\dfrac{x}{r} \\qquad \\tan\\theta = \\dfrac{y}{x}', '\\csc\\theta = \\dfrac{r}{y} \\qquad \\sec\\theta = \\dfrac{r}{x} \\qquad \\cot\\theta = \\dfrac{x}{y}'] },
      ],
      lines: [
        { say: 'Here is the method. First, sketch the angle in its quadrant, so you know the signs of x and y.', show: ['b.0', 'm'] },
        { say: 'Second, read two of x, y and r from the ratio you are given, with the correct signs. Every ratio is one of these six fractions.', show: 'b.1', focus: 'm' },
        { say: 'Third, find the missing one with x squared plus y squared equals r squared.', show: 'b.2', focus: 'b.2' },
        { say: 'Then write whichever ratios you need.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Given cosecant',
      layout: 'split',
      leftWidth: 500,
      left: [figure('csc', [standardAngle({ deg: deg(-8, 15), len: 17 / 4, label: '\\theta', drop: true, compact: true, point: 'P(15,\\ {-8})', sides: { x: '15', y: '-8', r: '17' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\csc\\theta = \\dfrac{r}{y} = -\\dfrac{17}{8}', 'r = 17, \\quad y = -8', 'x^2 = 17^2 - (-8)^2 = 225', 'x = 15', '\\cos\\theta = \\dfrac{15}{17}, \\quad \\cot\\theta = -\\dfrac{15}{8}'] }],
      lines: [
        { say: 'The cosecant of theta is negative seventeen eighths, and theta terminates in quadrant four. Determine the exact values of the cosine and the cotangent of theta.', show: ['csc.axes', 'csc.arm', 'csc.arc'] },
        { say: 'The cosecant is r over y. The radius r is a distance, so it is always positive. The negative sign must belong to y: r is seventeen, and y is negative eight.', show: ['csc.r', 'csc.tri', 'csc.y', 'm.0', 'm.1'], focus: ['csc.r', 'csc.y', 'm.1'] },
        { say: 'That fits quadrant four, where y is negative. Now find x: x squared is seventeen squared minus negative eight squared, which is 289 minus 64: 225.', show: 'm.2', focus: 'm.2' },
        { say: 'So x is plus or minus fifteen, and in quadrant four, x is positive: fifteen.', show: ['csc.x', 'csc.P', 'm.3'], focus: ['csc.x', 'm.3'] },
        { say: 'Now write the ratios. The cosine is x over r, fifteen seventeenths. The cotangent is x over y, fifteen over negative eight: negative fifteen eighths.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'r is always positive',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\csc\\theta = -\\dfrac{17}{8} = \\dfrac{17}{-8}:\\quad r = 17,\\ y = -8'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A negative r', md: '$r$ is a distance, so it is **always positive**. Put the negative sign on $x$ or $y$, whichever the quadrant makes negative.' },
      ],
      lines: [
        { say: 'Watch the sign. It is tempting to read negative seventeen eighths as r equals negative seventeen. But r is a distance from the origin, and a distance is never negative.', show: 'oops' },
        { say: 'So write the fraction as seventeen over negative eight, and put the negative sign on x or y, whichever the quadrant makes negative. In quadrant four, that is y.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Given tangent',
      layout: 'split',
      leftWidth: 500,
      left: [figure('tan', [standardAngle({ deg: deg(5, -12), len: 13 / 3, label: '\\theta', drop: true, compact: true, point: 'P(-12,\\ 5)', sides: { x: '-12', y: '5', r: '13' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tan\\theta = \\dfrac{y}{x} = \\dfrac{5}{-12}', 'r = \\sqrt{(-12)^2 + 5^2} = 13', '\\sin\\theta = \\dfrac{5}{13}, \\quad \\sec\\theta = -\\dfrac{13}{12}'] }],
      lines: [
        { say: 'One more. The tangent of theta is negative five twelfths, and theta terminates in quadrant two. Determine the sine and the secant of theta.', show: ['tan.axes', 'tan.arm', 'tan.arc'] },
        { say: 'The tangent is y over x. In quadrant two, x is negative and y is positive, so write it as five over negative twelve: y is five, and x is negative twelve.', show: ['tan.tri', 'tan.x', 'tan.y', 'tan.P', 'm.0'], focus: ['tan.x', 'tan.y', 'm.0'] },
        { say: 'Then r is the square root of 144 plus 25, which is the square root of 169: thirteen.', show: ['tan.r', 'm.1'], focus: ['tan.r', 'm.1'] },
        { say: 'So the sine is y over r, five thirteenths, and the secant is r over x, thirteen over negative twelve: negative thirteen twelfths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\cot\\theta = \\dfrac{3}{4}$ and $\\theta$ terminates in quadrant III. Determine $\\sin\\theta$.',
          choices: ['$\\dfrac{4}{5}$', '$-\\dfrac{3}{5}$', '$-\\dfrac{5}{4}$', '$-\\dfrac{4}{5}$'],
          answer: 3,
          working: 'In quadrant III, $x < 0$ and $y < 0$: $\\cot\\theta = \\dfrac{x}{y} = \\dfrac{-3}{-4}$. Then $r = \\sqrt{9 + 16} = 5$, so $\\sin\\theta = \\dfrac{y}{r} = -\\dfrac{4}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The cotangent of theta is three quarters, and theta terminates in quadrant three. Determine the sine of theta. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. In quadrant three, x and y are both negative, so the cotangent, x over y, is negative three over negative four. Then r is the square root of nine plus sixteen, which is five. So the sine is y over r: negative four fifths. Choice A forgets that y is negative in quadrant three, and B is the cosine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read two of $x$, $y$ and $r$ from the ratio; the quadrant gives the signs.', '$r$ is always positive.', 'Find the third with $x^2 + y^2 = r^2$, then write the ratios.'] }],
      lines: [
        { say: 'Let’s sum up. From one ratio, read two of x, y and r, and let the quadrant give the signs.', show: 'sum.0' },
        { say: 'r is a distance, so it is always positive.', show: 'sum.1' },
        { say: 'Find the third value with x squared plus y squared equals r squared, then write the ratios you need. In part four, we use a calculator for the reciprocal ratios, and find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
