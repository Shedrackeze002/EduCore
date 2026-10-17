import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

/** θ = π + cos⁻¹(0.4), in degrees for drawing. */
const theta = ((Math.PI + Math.acos(0.4)) * 180) / Math.PI;

const video: Explainer = {
  id: 'm301-4-3-d',
  lessonId: 'm301-4-3',
  title: 'Trigonometric Ratios, Part 4: Calculator Values and Angles',
  thumbnailTitle: 'Calculator Values and Angles',
  thumbnail: 'ang',
  summary: 'Evaluating reciprocal ratios on a calculator as 1/sin, 1/cos and 1/tan in the correct mode (csc 2.1 ≈ 1.158), and finding an angle from a reciprocal ratio: sec θ = −2.5 with π < θ < 3π/2 gives θ ≈ 4.30, from the reference angle cos⁻¹(0.4) and the quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.3 · Part 4', title: 'Calculator Values and Angles', subtitle: 'Reciprocal ratios on a calculator' }],
      lines: [
        { say: 'Most angles are not special, so their ratios need a calculator. But a calculator has no cosecant, secant or cotangent keys.', show: 'title' },
        { say: 'In this video, you will evaluate the reciprocal ratios on a calculator, in the correct mode, and find an angle from a reciprocal ratio.' },
      ],
    },
    {
      chapter: 'No reciprocal keys',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\csc\\theta = \\dfrac{1}{\\sin\\theta} \\qquad \\sec\\theta = \\dfrac{1}{\\cos\\theta} \\qquad \\cot\\theta = \\dfrac{1}{\\tan\\theta}', '\\sin 2.1 \\approx 0.86321', '\\csc 2.1 = \\dfrac{1}{\\sin 2.1} \\approx 1.15847 \\approx 1.158'] },
      ],
      lines: [
        { say: 'To evaluate a reciprocal ratio, use its definition. The cosecant is one over sine, the secant is one over cosine, and the cotangent is one over tangent.', show: 'm.0', focus: 'm.0' },
        { say: 'Determine the cosecant of 2.1, to the nearest thousandth. There is no degree sign, so 2.1 is in radians. Set the calculator to radian mode.', show: 'm.1' },
        { say: 'The sine of 2.1 is about 0.86321.', focus: 'm.1' },
        { say: 'So the cosecant of 2.1 is one divided by the sine of 2.1: about 1.15847. To the nearest thousandth, that is 1.158.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check your mode',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Degree mode: } \\dfrac{1}{\\sin 2.1^\\circ} \\approx 27.29 \\quad \\text{(wrong)}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degree mode for a radian angle', md: 'An angle written without a degree sign is in radians. In degree mode, the calculator finds $\\csc 2.1^\\circ$ instead, a completely different number.' },
      ],
      lines: [
        { say: 'Here is a mistake that is easy to make. In degree mode, the calculator treats 2.1 as 2.1 degrees, a tiny angle.', show: 'm.0', focus: 'm.0' },
        { say: 'One over the sine of 2.1 degrees is about 27.29, nothing like 1.158.' },
        { say: 'An angle written without a degree sign is in radians. Check the mode before every calculation.', show: 'oops' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('ang', [standardAngle({ deg: theta, label: '\\theta', ref: '\\theta_R', compact: true })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos\\theta = \\dfrac{1}{-2.5} = -0.4', '\\theta_R = \\cos^{-1}(0.4) \\approx 1.1593', '\\theta = \\pi + 1.1593 \\approx 4.3009', '\\theta \\approx 4.30'] }],
      lines: [
        { say: 'Now go the other way. The secant of theta is negative 2.5, and theta is between pi and three pi over two. Determine theta to the nearest hundredth of a radian.' },
        { say: 'First, turn the secant into a cosine. The cosine is one over the secant: one over negative 2.5, which is negative 0.4.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the reference angle from the positive value. In radian mode, the inverse cosine of 0.4 is about 1.1593.', show: ['ang.axes', 'ang.arm', 'ang.P', 'ang.ref', 'm.1'], focus: ['ang.ref', 'm.1'] },
        { say: 'Between pi and three pi over two is quadrant three, where the cosine is negative, as it should be. In quadrant three, the arm is the reference angle past pi.', show: 'ang.arc', focus: 'ang.arc' },
        { say: 'So theta is pi plus 1.1593, about 4.3009. To the nearest hundredth, theta is about 4.30.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Inverse secant',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sec\\theta = -2.5 \\;\\Longrightarrow\\; \\cos\\theta = \\dfrac{1}{-2.5}, \\text{ then } \\cos^{-1}', '\\dfrac{1}{\\cos^{-1}(-2.5)}: \\text{ error}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reciprocal first, then the inverse', md: 'To undo $\\sec\\theta = -2.5$, first write $\\cos\\theta = \\dfrac{1}{-2.5}$, then use $\\cos^{-1}$. The inverse cosine only accepts values from $-1$ to $1$.' },
      ],
      lines: [
        { say: 'Be careful with the order. To undo a secant, take the reciprocal first, to get a cosine, and then use the inverse cosine.', show: 'm.0', focus: 'm.0' },
        { say: 'Do not compute one over the inverse cosine of negative 2.5. The calculator gives an error, because the inverse cosine only accepts values from negative one to one, and negative 2.5 is outside that range.', show: 'm.1', focus: 'm.1' },
        { say: 'Reciprocal first, then the inverse key.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine $\\cot 5$ to the nearest thousandth.',
          choices: ['$-3.381$', '$11.430$', '$-0.296$', '$1.373$'],
          answer: 2,
          working: 'Radian mode: $\\tan 5 \\approx -3.38052$, so $\\cot 5 = \\dfrac{1}{\\tan 5} \\approx -0.296$.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the cotangent of five, to the nearest thousandth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. In radian mode, the tangent of five is about negative 3.3805, and one over that is about negative 0.296. B comes from degree mode, and D uses the inverse tangent key, which finds an angle, not a reciprocal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Evaluate $\\csc$, $\\sec$ and $\\cot$ as $\\dfrac{1}{\\sin}$, $\\dfrac{1}{\\cos}$ and $\\dfrac{1}{\\tan}$.', 'No degree sign: radian mode.', 'For an angle: reciprocal first, reference angle from the positive value, then the quadrant.'] }],
      lines: [
        { say: 'Let’s sum up. Evaluate the cosecant, secant and cotangent as one over sine, one over cosine and one over tangent.', show: 'sum.0' },
        { say: 'An angle with no degree sign is in radians, so use radian mode.', show: 'sum.1' },
        { say: 'To find an angle from a reciprocal ratio, take the reciprocal first, find the reference angle from the positive value, then place it in the quadrant. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
