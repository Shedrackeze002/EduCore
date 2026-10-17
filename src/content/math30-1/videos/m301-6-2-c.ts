import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

/** θ in quadrant II with sin θ = 3/5: the point (−4, 3) at r = 5. */
const theta = 180 - (Math.atan2(3, 4) * 180) / Math.PI;

const video: Explainer = {
  id: 'm301-6-2-c',
  lessonId: 'm301-6-2',
  title: 'Sum, Difference and Double-Angle Identities, Part 3: Double-Angle Identities',
  thumbnailTitle: 'Double-Angle Identities',
  thumbnail: 'sa',
  summary: 'Deriving sin 2A = 2 sin A cos A, the three forms of cos 2A and tan 2A from the sum identities, using them in both directions, and finding sin 2θ and cos 2θ from sin θ = 3/5 in quadrant II. Why sin 2θ is not 2 sin θ.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.2 · Part 3', title: 'Double-Angle Identities', subtitle: 'The sum identities with $B = A$' }],
      lines: [
        { say: 'What is the sine of two x? It is not two sine x, as you will see. The sum identities give the real answer.', show: 'title' },
        { say: 'In this video, you will derive the double-angle identities, use them in both directions, and find sine two theta and cosine two theta from one given ratio.' },
      ],
    },
    {
      chapter: 'Deriving the identities',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sin 2A = \\sin(A + A) = \\sin A\\cos A + \\cos A\\sin A',
            '= 2\\sin A\\cos A',
            '\\cos 2A = \\cos(A + A) = \\cos A\\cos A - \\sin A\\sin A',
            '= \\cos^2 A - \\sin^2 A',
            '= \\cos^2 A - (1 - \\cos^2 A) = 2\\cos^2 A - 1',
            '= (1 - \\sin^2 A) - \\sin^2 A = 1 - 2\\sin^2 A',
          ],
        },
      ],
      lines: [
        { say: 'Put B equal to A in the sum identities. The sine of two A is the sine of A plus A, which is sine A cosine A plus cosine A sine A.', show: 'm.0', focus: 'm.0' },
        { say: 'Those two terms are the same, so the sine of two A equals two sine A cosine A.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, the cosine of two A is the cosine of A plus A: cosine A cosine A, minus sine A sine A.', show: 'm.2', focus: 'm.2' },
        { say: 'That is cosine squared A minus sine squared A.', show: 'm.3', focus: 'm.3' },
        { say: 'Two more forms come from sine squared plus cosine squared equals one. Replace sine squared A with one minus cosine squared A, and you get two cosine squared A minus one.', show: 'm.4', focus: 'm.4' },
        { say: 'Or replace cosine squared A with one minus sine squared A, and you get one minus two sine squared A.', show: 'm.5', focus: 'm.5' },
      ],
    },
    {
      chapter: 'The double-angle identities',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin 2A = 2\\sin A\\cos A \\qquad \\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}', '\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A', '2\\sin 15^\\circ\\cos 15^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}', '1 - 2\\sin^2 4x = \\cos 8x'] },
      ],
      lines: [
        { say: 'Here they are together. The sine of two A is two sine A cosine A. The tan of two A, from the tan of A plus A, is two tan A, over one minus tan squared A.', show: 'm.0', focus: 'm.0' },
        { say: 'And the cosine of two A has three forms: cosine squared A minus sine squared A, two cosine squared A minus one, and one minus two sine squared A. Choose whichever form suits the problem.', show: 'm.1', focus: 'm.1' },
        { say: 'They work in both directions. Two sine 15 degrees cosine 15 degrees matches two sine A cosine A, with A equal to 15 degrees. So it equals sine 30 degrees, which is one half.', show: 'm.2', focus: 'm.2' },
        { say: 'And one minus two sine squared 4 x matches one minus two sine squared A, with A equal to 4 x. So it equals the cosine of twice 4 x, which is cosine 8 x. The angle on the left is always half the angle on the right.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'From one ratio and a quadrant',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sa', [standardAngle({ deg: theta, label: '\\theta', drop: true, sides: { x: '-4', y: '3', r: '5' } })])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: [
            '\\sin\\theta = \\dfrac{3}{5},\\quad \\dfrac{\\pi}{2} < \\theta < \\pi',
            'x = -\\sqrt{5^2 - 3^2} = -4,\\quad \\cos\\theta = -\\dfrac{4}{5}',
            '\\sin 2\\theta = 2\\left(\\dfrac{3}{5}\\right)\\left(-\\dfrac{4}{5}\\right) = -\\dfrac{24}{25}',
            '\\cos 2\\theta = \\dfrac{16}{25} - \\dfrac{9}{25} = \\dfrac{7}{25}',
          ],
        },
      ],
      lines: [
        { say: 'Given sine theta equals three fifths, with theta between pi over two and pi, determine sine two theta and cosine two theta.', show: 'm.0', focus: 'm.0' },
        { say: 'Theta is in quadrant two. Sine theta is y over r, so draw a point with y equal to three and r equal to five.', show: ['sa.axes', 'sa.arm', 'sa.arc', 'sa.P', 'sa.tri', 'sa.y', 'sa.r'], focus: ['sa.y', 'sa.r'] },
        { say: 'By the Pythagorean theorem, x is the square root of five squared minus three squared, which is four. But in quadrant two, x is negative, so x is negative four, and cosine theta is negative four fifths.', show: ['m.1', 'sa.x'], focus: ['m.1', 'sa.x'] },
        { say: 'Now sine two theta is two sine theta cosine theta: two, times three fifths, times negative four fifths. That is negative 24 over 25.', show: 'm.2', focus: 'm.2' },
        { say: 'And cosine two theta is cosine squared theta minus sine squared theta: sixteen over 25, minus nine over 25, which is seven over 25.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Doubling the ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sin\\theta = 2\\left(\\dfrac{3}{5}\\right) = \\dfrac{6}{5} > 1'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Doubling the ratio', md: '$\\sin 2\\theta$ is **not** $2\\sin\\theta$. Doubling the angle does not double the ratio.' },
      ],
      lines: [
        { say: 'A very common mistake is to think that sine two theta is two sine theta. Doubling the angle does not double the ratio.', show: 'oops' },
        { say: 'In the example, two sine theta would be two times three fifths, which is six fifths. That is greater than one, so it is not even a possible value of sine. The correct value was negative 24 over 25.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $\\cos\\theta = \\dfrac{5}{13}$ with $\\dfrac{3\\pi}{2} < \\theta < 2\\pi$, determine $\\sin 2\\theta$.',
          choices: ['$\\dfrac{120}{169}$', '$\\dfrac{10}{13}$', '$-\\dfrac{24}{13}$', '$-\\dfrac{120}{169}$'],
          answer: 3,
          working: 'In quadrant IV, $y = -\\sqrt{13^2 - 5^2} = -12$, so $\\sin\\theta = -\\dfrac{12}{13}$. Then $\\sin 2\\theta = 2\\left(-\\dfrac{12}{13}\\right)\\left(\\dfrac{5}{13}\\right) = -\\dfrac{120}{169}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Given cosine theta equals five over thirteen, with theta between three pi over two and two pi, determine sine two theta. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Theta is in quadrant four, where y is negative, so sine theta is negative twelve over thirteen. Then sine two theta is two, times negative twelve over thirteen, times five over thirteen: negative 120 over 169. Choice A forgets that sine is negative in quadrant four.', show: 'q.answer' },
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
          items: ['$\\sin 2A = 2\\sin A\\cos A$ and $\\tan 2A = \\dfrac{2\\tan A}{1 - \\tan^2 A}$.', '$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$.', 'Find the other ratios, with the correct signs, before using an identity. $\\sin 2\\theta \\ne 2\\sin\\theta$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The sine of two A is two sine A cosine A, and the tan of two A is two tan A over one minus tan squared A.', show: 'sum.0' },
        { say: 'The cosine of two A has three forms: cosine squared A minus sine squared A, two cosine squared A minus one, and one minus two sine squared A.', show: 'sum.1' },
        { say: 'From one ratio and a quadrant, find the other ratios with the correct signs first. And remember, sine two theta is not two sine theta. In part four, you will combine two angles from given ratios. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
