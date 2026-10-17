import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/**
 * The reference angle between the terminal arm and the nearer half of the x-axis, for a unit
 * circle's arm (`left` when the arm is on the left of the y-axis).
 */
const refAngle = (label: string, left: boolean, dist = 112): Part => ({
  points: {},
  items: [{ kind: 'angle', id: 'ref', at: 'O', from: left ? 'xl' : 'xr', to: 'P', tone: 'hyp', label, r: 58, labelDist: dist }],
});

/** The label of −3π/4, set farther out than the circle's own arc label so it clears the arc. */
const negLabel: Part = {
  points: { 'neg-at': [2.3 * Math.cos((-67.5 * Math.PI) / 180), 2.3 * Math.sin((-67.5 * Math.PI) / 180)] },
  items: [{ kind: 'label', id: 'neg-lab', at: 'neg-at', tex: '-\\tfrac{3\\pi}{4}', tone: 'theta', place: 'center' }],
};

const video: Explainer = {
  id: 'm301-4-2-c',
  lessonId: 'm301-4-2',
  title: 'The Unit Circle, Part 3: Points in Every Quadrant',
  thumbnailTitle: 'Points in Every Quadrant',
  thumbnail: 'four',
  summary: 'Finding exact points on the unit circle in any quadrant, such as P(4π/3) and P(−3π/4): the reference angle gives the numbers and the quadrant gives the signs. Then going backward from a point to its angle. Part 4 covers symmetry and larger circles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.2 · Part 3', title: 'Points in Every Quadrant', subtitle: 'The reference angle gives the numbers; the quadrant gives the signs' }],
      lines: [
        { say: 'The three special points in quadrant one are all you need for the rest of the unit circle.', show: 'title' },
        { say: 'In this video, you will find exact points in every quadrant, for positive and negative angles, and go backward from a point to its angle.' },
      ],
    },
    {
      chapter: 'One reference angle, four points',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('four', [
          unitCircle({
            points: [
              { deg: 30, tex: '\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac{1}{2}\\right)' },
              { deg: 150, tex: '\\left(-\\tfrac{\\sqrt{3}}{2}, \\tfrac{1}{2}\\right)' },
              { deg: 210, tex: '\\left(-\\tfrac{\\sqrt{3}}{2}, -\\tfrac{1}{2}\\right)' },
              { deg: 330, tex: '\\left(\\tfrac{\\sqrt{3}}{2}, -\\tfrac{1}{2}\\right)' },
            ],
          }),
        ]),
      ],
      right: [
        { kind: 'table', id: 't', head: ['Quadrant', '$x$', '$y$'], rows: [['I', '$+$', '$+$'], ['II', '$-$', '$+$'], ['III', '$-$', '$-$'], ['IV', '$+$', '$-$']] },
      ],
      lines: [
        { say: 'Here is P of pi over six, in quadrant one: root three over two, one half.', show: ['four.axes', 'four.circle', 'four.p30', 't.0'], focus: 'four.p30' },
        { say: 'The angles five pi over six, seven pi over six and eleven pi over six all have the same reference angle, pi over six. Their points are reflections of this one in the axes.', show: ['four.p150', 'four.p210', 'four.p330'] },
        { say: 'So they have the same two numbers, root three over two and one half. Only the signs change.' },
        { say: 'The quadrant gives the signs. In quadrant two, x is negative. In quadrant three, both are negative. And in quadrant four, y is negative.', show: ['t.1', 't.2', 't.3'], focus: 't' },
      ],
    },
    {
      chapter: 'A quadrant III point',
      layout: 'split',
      leftWidth: 560,
      left: [figure('p240', [unitCircle({ arm: 240, armLabel: '\\tfrac{4\\pi}{3}', drop: true, points: [{ deg: 240, tex: '\\left(-\\tfrac{1}{2}, -\\tfrac{\\sqrt{3}}{2}\\right)' }] }), refAngle('\\tfrac{\\pi}{3}', true, 80)])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{4\\pi}{3} - \\pi = \\dfrac{\\pi}{3}', 'P\\left(\\dfrac{\\pi}{3}\\right) = \\left(\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)', '\\text{Quadrant III: both negative}', 'P\\left(\\dfrac{4\\pi}{3}\\right) = \\left(-\\dfrac{1}{2}, -\\dfrac{\\sqrt{3}}{2}\\right)'] }],
      lines: [
        { say: 'Determine the exact coordinates of P of four pi over three.', show: ['p240.axes', 'p240.circle'] },
        { say: 'Pi is three pi over three, and three pi over two is four and a half pi over three. So four pi over three is between pi and three pi over two: quadrant three.', show: ['p240.arm', 'p240.arc'], focus: 'p240.arc' },
        { say: 'The arm is four pi over three minus pi past the negative x-axis. That is the reference angle, pi over three.', show: ['p240.ref', 'm.0'], focus: ['p240.ref', 'm.0'] },
        { say: 'The numbers come from P of pi over three: one half and root three over two.', show: ['p240.tri', 'm.1'], focus: 'm.1' },
        { say: 'In quadrant three, both coordinates are negative. So P of four pi over three is negative one half, negative root three over two.', show: ['m.2', 'm.3', 'p240.pts'], focus: ['m.3', 'p240.pts'] },
      ],
    },
    {
      chapter: 'A negative angle',
      layout: 'split',
      leftWidth: 560,
      left: [figure('neg', [negLabel, unitCircle({ arm: -135, drop: true, points: [{ deg: 225, tex: '\\left(-\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)' }] }), refAngle('\\tfrac{\\pi}{4}', true, 80)])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-\\dfrac{3\\pi}{4} + 2\\pi = \\dfrac{5\\pi}{4}', '\\theta_R = \\dfrac{\\pi}{4}, \\quad \\text{quadrant III}', 'P\\left(-\\dfrac{3\\pi}{4}\\right) = \\left(-\\dfrac{\\sqrt{2}}{2}, -\\dfrac{\\sqrt{2}}{2}\\right)'] }],
      lines: [
        { say: 'Determine the exact coordinates of P of negative three pi over four.', show: ['neg.axes', 'neg.circle'] },
        { say: 'A negative angle turns clockwise. Three pi over four clockwise lands in quadrant three.', show: ['neg.arm', 'neg.arc', 'neg.neg-lab'], focus: ['neg.arc', 'neg.neg-lab'] },
        { say: 'To check, add a full turn: negative three pi over four plus two pi is five pi over four. That is the same terminal arm, in quadrant three.', show: 'm.0', focus: 'm.0' },
        { say: 'The arm is pi over four from the negative x-axis, so the reference angle is pi over four, and both coordinates are negative.', show: ['neg.ref', 'neg.tri', 'm.1'], focus: ['neg.ref', 'm.1'] },
        { say: 'So P of negative three pi over four is negative root two over two, negative root two over two.', show: ['neg.pts', 'm.2'], focus: ['neg.pts', 'm.2'] },
      ],
    },
    {
      chapter: 'From a point to the angle',
      layout: 'split',
      leftWidth: 560,
      left: [figure('back', [unitCircle({ arm: 315, armLabel: '\\theta', points: [{ deg: 315, tex: '\\left(\\tfrac{\\sqrt{2}}{2}, -\\tfrac{\\sqrt{2}}{2}\\right)' }] }), refAngle('\\tfrac{\\pi}{4}', false)])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x > 0,\\ y < 0: \\text{ quadrant IV}', '\\theta_R = \\dfrac{\\pi}{4}', '\\theta = 2\\pi - \\dfrac{\\pi}{4} = \\dfrac{7\\pi}{4}'] }],
      lines: [
        { say: 'You can also go backward. The terminal arm of theta, from zero up to two pi, meets the unit circle at root two over two, negative root two over two. Determine theta.', show: ['back.axes', 'back.circle', 'back.pts'], focus: 'back.pts' },
        { say: 'x is positive and y is negative, so the point is in quadrant four.', show: 'm.0', focus: 'm.0' },
        { say: 'The two coordinates have the same size, root two over two, so the reference angle is pi over four.', show: ['back.arm', 'back.ref', 'm.1'], focus: ['back.ref', 'm.1'] },
        { say: 'In quadrant four, the arm is pi over four short of a full turn. So theta is two pi minus pi over four, which is seven pi over four.', show: ['back.arc', 'm.2'], focus: ['back.arc', 'm.2'] },
      ],
    },
    {
      chapter: 'Forgetting the signs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P\\left(\\dfrac{4\\pi}{3}\\right) \\ne \\left(\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the signs', md: 'The reference angle gives only the **sizes** of the coordinates. Before you write the point, ask which quadrant it is in, and give each coordinate its sign.' },
      ],
      lines: [
        { say: 'A common mistake is to find the reference angle, copy the point from quadrant one, and stop.', show: 'm.0', focus: 'm.0' },
        { say: 'One half, root three over two, is in quadrant one. It cannot be P of four pi over three, which is in quadrant three.' },
        { say: 'The reference angle gives only the sizes of the coordinates. Always ask which quadrant the point is in, and give each coordinate its sign.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the exact coordinates of $P\\left(\\dfrac{5\\pi}{6}\\right)$.',
          choices: ['$\\left(\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}\\right)$', '$\\left(-\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)$', '$\\left(-\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)$', '$\\left(-\\dfrac{\\sqrt{3}}{2}, -\\dfrac{1}{2}\\right)$'],
          answer: 1,
          working: '$\\dfrac{5\\pi}{6}$ is in quadrant II with reference angle $\\pi - \\dfrac{5\\pi}{6} = \\dfrac{\\pi}{6}$. $P\\left(\\dfrac{\\pi}{6}\\right) = \\left(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)$; in quadrant II, $x < 0$ and $y > 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the exact coordinates of P of five pi over six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Five pi over six is pi over six short of pi, so it is in quadrant two, with reference angle pi over six. The numbers are root three over two and one half, and in quadrant two, x is negative and y is positive. C swaps x and y: it is the point for two pi over three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The reference angle gives the numbers.', 'The quadrant gives the signs.', 'Backward: the signs give the quadrant, the sizes give $\\theta_R$, then place it.'] }],
      lines: [
        { say: 'Let’s sum up. To find P of theta in any quadrant, the reference angle gives the numbers.', show: 'sum.0' },
        { say: 'The quadrant gives the signs. For a negative angle, add two pi to see where it lands.', show: 'sum.1' },
        { say: 'To go backward from a point, the signs give the quadrant, and the sizes give the reference angle. In part four, we use symmetry, and circles bigger than the unit circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
