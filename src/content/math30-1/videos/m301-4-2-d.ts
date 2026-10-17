import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/**
 * P(θ) for θ ≈ 67° (the point (5/13, 12/13)) and its images: reflected in the x-axis (−θ), in the
 * y-axis (π − θ), and turned half a turn (θ + π), with a dashed line for each move.
 */
function symmetry(labels: [string, string, string, string]): Part[] {
  const circle = unitCircle({
    points: [
      { deg: 67, tex: labels[0] },
      { deg: 113, tex: labels[1], tone: 'good' },
      { deg: 247, tex: labels[2], tone: 'opp' },
      { deg: -67, tex: labels[3], tone: 'adj' },
    ],
  });
  const moves: Part = {
    points: {},
    items: [
      { kind: 'line', id: 'arm', from: 'O', to: 'p67', tone: 'brand', weight: 3 },
      { kind: 'line', id: 'half', from: 'p67', to: 'p247', tone: 'opp', dashed: true, weight: 2 },
      { kind: 'line', id: 'refl-x', from: 'p67', to: 'p-67', tone: 'adj', dashed: true, weight: 2 },
      { kind: 'line', id: 'refl-y', from: 'p67', to: 'p113', tone: 'good', dashed: true, weight: 2 },
    ],
  };
  return [circle, moves];
}

/**
 * Labels for the circle of radius 4: the angle 2π/3, set outside the small unit circle drawn
 * inside it, and the x-coordinate −2 under the foot of the perpendicular.
 */
const radiusFour: Part = {
  points: { 'arc-at': [1.9 * Math.cos(Math.PI / 3), 1.9 * Math.sin(Math.PI / 3)] },
  items: [
    { kind: 'label', id: 'arc-lab', at: 'arc-at', tex: '\\tfrac{2\\pi}{3}', tone: 'theta', place: 'center' },
    { kind: 'label', id: 'F-lab', at: 'F', tex: '-2', tone: 'adj', place: 'below' },
  ],
};

const video: Explainer = {
  id: 'm301-4-2-d',
  lessonId: 'm301-4-2',
  title: 'The Unit Circle, Part 4: Symmetry and Larger Circles',
  thumbnailTitle: 'Symmetry and Larger Circles',
  thumbnail: 'sym',
  summary: 'How half a turn and reflections in the axes move P(θ) to P(θ + π) = (−x, −y), P(−θ) = (x, −y) and P(π − θ) = (−x, y), and why the terminal arm meets a circle of radius r at (r cos θ, r sin θ), such as (−2, 2√3) on x² + y² = 16.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.2 · Part 4', title: 'Symmetry and Larger Circles', subtitle: 'Same numbers, different signs' }],
      lines: [
        { say: 'Once you know one point on the unit circle, you know three more for free, because the circle is symmetric.', show: 'title' },
        { say: 'In this video, you will use half turns and reflections to find new points, and find points on circles bigger than the unit circle.' },
      ],
    },
    {
      chapter: 'Symmetry',
      layout: 'split',
      leftWidth: 500,
      left: [figure('sym', symmetry(['P(\\theta)', 'P(\\pi - \\theta)', 'P(\\theta + \\pi)', 'P(-\\theta)']))],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Angle', 'Point', 'Why'],
          rows: [
            ['$\\theta + \\pi$', '$(-x, -y)$', 'half a turn'],
            ['$-\\theta$', '$(x, -y)$', 'reflect in the $x$-axis'],
            ['$\\pi - \\theta$', '$(-x, y)$', 'reflect in the $y$-axis'],
          ],
        },
      ],
      lines: [
        { say: 'Let P of theta be the point x, y, in quadrant one.', show: ['sym.axes', 'sym.circle', 'sym.arm', 'sym.p67'], focus: 'sym.p67' },
        { say: 'Adding pi turns the arm half a turn, straight through the origin to the opposite side. Both coordinates change sign: P of theta plus pi is negative x, negative y.', show: ['sym.half', 'sym.p247', 't.0'], focus: ['sym.p247', 't.0'] },
        { say: 'Negative theta turns the same amount clockwise instead. That reflects the point in the x-axis, so only y changes sign: x, negative y.', show: ['sym.refl-x', 'sym.p-67', 't.1'], focus: ['sym.p-67', 't.1'] },
        { say: 'And pi minus theta reflects the point in the y-axis, so only x changes sign: negative x, y.', show: ['sym.refl-y', 'sym.p113', 't.2'], focus: ['sym.p113', 't.2'] },
      ],
    },
    {
      chapter: 'Using symmetry',
      layout: 'split',
      leftWidth: 600,
      left: [figure('use', symmetry(['\\left(\\tfrac{5}{13}, \\tfrac{12}{13}\\right)', '', '\\left(-\\tfrac{5}{13}, -\\tfrac{12}{13}\\right)', '\\left(\\tfrac{5}{13}, -\\tfrac{12}{13}\\right)']))],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(\\theta) = \\left(\\dfrac{5}{13}, \\dfrac{12}{13}\\right)', 'P(\\theta + \\pi) = \\left(-\\dfrac{5}{13}, -\\dfrac{12}{13}\\right)', 'P(-\\theta) = \\left(\\dfrac{5}{13}, -\\dfrac{12}{13}\\right)'] }],
      lines: [
        { say: 'P of theta is five thirteenths, twelve thirteenths. Determine P of theta plus pi, and P of negative theta.', show: ['use.axes', 'use.circle', 'use.arm', 'use.p67', 'm.0'], focus: ['use.p67', 'm.0'] },
        { say: 'Half a turn changes both signs. P of theta plus pi is negative five thirteenths, negative twelve thirteenths.', show: ['use.half', 'use.p247', 'm.1'], focus: ['use.p247', 'm.1'] },
        { say: 'Reflecting in the x-axis changes only the sign of y. P of negative theta is five thirteenths, negative twelve thirteenths.', show: ['use.refl-x', 'use.p-67', 'm.2'], focus: ['use.p-67', 'm.2'] },
        { say: 'You never needed to know theta itself. The symmetry of the circle did all the work.' },
      ],
    },
    {
      chapter: 'A circle of radius 4',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('big', [
          unitCircle({ arm: 120, drop: true, sides: { y: '2\\sqrt{3}' }, points: [{ deg: 120, tex: 'A' }] }),
          unitCircle({ name: 'u', r: 1, points: [{ deg: 120, tone: 'theta' }] }),
          radiusFour,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + y^2 = 16:\\quad r = 4', 'P\\left(\\dfrac{2\\pi}{3}\\right) = \\left(-\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)', 'A = \\left(4\\left(-\\dfrac{1}{2}\\right), 4\\left(\\dfrac{\\sqrt{3}}{2}\\right)\\right)', 'A = \\left(-2, 2\\sqrt{3}\\right)'] }],
      lines: [
        { say: 'On a circle of radius r, the terminal arm meets the circle at r cosine theta, r sine theta: the unit circle point, scaled by r.' },
        { say: 'The terminal arm of two pi over three meets the circle x squared plus y squared equals sixteen at point "A". Determine "A".', show: ['big.axes', 'big.circle', 'big.arm', 'big.arc', 'big.arc-lab', 'big.pts'] },
        { say: 'Sixteen is four squared, so the radius is four.', show: 'm.0', focus: 'm.0' },
        { say: 'On the unit circle, the arm passes through P of two pi over three: negative one half, root three over two. That is in quadrant two, with reference angle pi over three.', show: ['big.u-circle', 'big.u-pts', 'm.1'], focus: ['big.u-pts', 'm.1'] },
        { say: 'Point "A" is four times as far out along the same arm. Multiply both coordinates by four: negative two, and two root three.', show: ['big.tri', 'big.F-lab', 'big.y', 'm.2', 'm.3'], focus: ['big.F-lab', 'big.y', 'm.3'] },
      ],
    },
    {
      chapter: 'Forgetting the radius',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(-2)^2 + \\left(2\\sqrt{3}\\right)^2 = 4 + 12 = 16 \\;\\checkmark', '\\left(-\\dfrac{1}{2}\\right)^2 + \\left(\\dfrac{\\sqrt{3}}{2}\\right)^2 = 1 \\ne 16'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the radius', md: 'The unit-circle point is on the circle of radius $1$. On a circle of radius $r$, multiply both coordinates by $r$: $(r\\cos\\theta, r\\sin\\theta)$.' },
      ],
      lines: [
        { say: 'You can check the answer with the circle’s equation. Negative two, squared, is four, and two root three, squared, is four times three, twelve. Four plus twelve is sixteen, so the point is on the circle.', show: 'm.0', focus: 'm.0' },
        { say: 'A common mistake is to stop at the unit-circle point. Negative one half, root three over two, gives one, not sixteen, so it is on the unit circle, not this one.', show: 'm.1', focus: 'm.1' },
        { say: 'On a circle of radius r, multiply both coordinates by r.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$P(\\theta) = \\left(-\\dfrac{8}{17}, \\dfrac{15}{17}\\right)$. Determine $P(-\\theta)$.',
          choices: ['$\\left(\\dfrac{8}{17}, \\dfrac{15}{17}\\right)$', '$\\left(\\dfrac{8}{17}, -\\dfrac{15}{17}\\right)$', '$\\left(-\\dfrac{15}{17}, \\dfrac{8}{17}\\right)$', '$\\left(-\\dfrac{8}{17}, -\\dfrac{15}{17}\\right)$'],
          answer: 3,
          working: '$-\\theta$ reflects $P(\\theta)$ in the $x$-axis: $x$ stays the same and $y$ changes sign.',
        },
      ],
      lines: [
        { say: 'Your turn. P of theta is negative eight seventeenths, fifteen seventeenths. Determine P of negative theta. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Negative theta reflects the point in the x-axis, so x stays the same and y changes sign: negative eight seventeenths, negative fifteen seventeenths. B changes both signs, which is half a turn, P of theta plus pi.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P(\\theta + \\pi) = (-x, -y)$, $P(-\\theta) = (x, -y)$, $P(\\pi - \\theta) = (-x, y)$.', 'On a circle of radius $r$: $(r\\cos\\theta, r\\sin\\theta)$.', 'Check a point with $x^2 + y^2 = r^2$.'] }],
      lines: [
        { say: 'Let’s sum up. Half a turn changes both signs. Negative theta changes the sign of y, and pi minus theta changes the sign of x.', show: 'sum.0' },
        { say: 'On a circle of radius r, the terminal arm meets the circle at r cosine theta, r sine theta.', show: 'sum.1' },
        { say: 'And you can check any point with x squared plus y squared equals r squared. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
