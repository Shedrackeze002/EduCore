import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/** The radius from the origin to the arm's point P (of the circle named `name`), labelled 1. */
const hyp = (name = ''): Part => {
  const n = (s: string) => (name ? `${name}-${s}` : s);
  return { points: {}, items: [{ kind: 'line', id: n('one-r'), from: n('O'), to: n('P'), tone: 'hyp', weight: 3.5, label: '1', labelSide: 'left' }] };
};

/** Labels for the points at 0 and π/2, set clear of the axes' arrows. */
const ends: Part = {
  points: {},
  items: [
    { kind: 'label', id: 'l0', at: 'p0', tex: '0', tone: 'brand', place: 'below right' },
    { kind: 'label', id: 'l90', at: 'p90', tex: '\\tfrac{\\pi}{2}', tone: 'brand', place: 'above left' },
  ],
};

const video: Explainer = {
  id: 'm301-4-2-b',
  lessonId: 'm301-4-2',
  title: 'The Unit Circle, Part 2: Points for Special Angles',
  thumbnailTitle: 'Points for Special Angles',
  thumbnail: 'q1',
  summary: 'P(θ) = (cos θ, sin θ) is where the terminal arm of θ meets the unit circle, and the special triangles give the exact points for π/6, π/4 and π/3 in quadrant I, along with the quadrantal points (1, 0) and (0, 1). Part 3 finds the points in the other quadrants.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.2 · Part 2', title: 'Points for Special Angles', subtitle: '$P(\\theta) = (\\cos\\theta, \\sin\\theta)$' }],
      lines: [
        { say: 'Every angle in standard position has a terminal arm, and that arm meets the unit circle at exactly one point.', show: 'title' },
        { say: 'In this video, you will see why that point’s coordinates are the cosine and sine of the angle, and find the exact points for pi over six, pi over four and pi over three.' },
      ],
    },
    {
      chapter: 'P of theta',
      layout: 'split',
      leftWidth: 560,
      left: [figure('pt', [unitCircle({ arm: 40, armLabel: '\\theta', drop: true, sides: { x: '\\cos\\theta', y: '\\sin\\theta' }, points: [{ deg: 40, tex: 'P(\\theta)' }] }), hyp()])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos\\theta = \\dfrac{x}{1} = x', '\\sin\\theta = \\dfrac{y}{1} = y'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'The point on the unit circle', md: 'The point where the terminal arm of $\\theta$ in standard position meets the unit circle: $P(\\theta) = (\\cos\\theta, \\sin\\theta)$.' },
      ],
      lines: [
        { say: 'Let the terminal arm of theta meet the unit circle at a point. We call it P of theta, with coordinates x, y.', show: ['pt.axes', 'pt.circle', 'pt.arm', 'pt.arc', 'pt.pts'], focus: 'pt.pts' },
        { say: 'Drop a perpendicular to the x-axis. That makes a right triangle with hypotenuse one, the radius.', show: ['pt.tri', 'pt.one-r'], focus: 'pt.one-r' },
        { say: 'The cosine of theta is adjacent over hypotenuse: x over one, which is just x.', show: ['pt.x', 'm.0'], focus: ['pt.x', 'm.0'] },
        { say: 'The sine of theta is opposite over hypotenuse: y over one, which is just y.', show: ['pt.y', 'm.1'], focus: ['pt.y', 'm.1'] },
        { say: 'So because the radius is one, the coordinates of P of theta are exactly the cosine and the sine. P of theta equals cosine theta, sine theta. The x-coordinate is the cosine, and the y-coordinate is the sine.', show: 'def' },
      ],
    },
    {
      chapter: 'The angle π/4',
      layout: 'split',
      leftWidth: 560,
      left: [figure('p4', [unitCircle({ arm: 45, armLabel: '\\tfrac{\\pi}{4}', drop: true, sides: { x: '\\tfrac{\\sqrt{2}}{2}', y: '\\tfrac{\\sqrt{2}}{2}' } }), hyp()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x', 'x^2 + x^2 = 1', '2x^2 = 1,\\quad x = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}', 'P\\left(\\dfrac{\\pi}{4}\\right) = \\left(\\dfrac{\\sqrt{2}}{2}, \\dfrac{\\sqrt{2}}{2}\\right)'] }],
      lines: [
        { say: 'Start with pi over four, which is 45 degrees. The terminal arm cuts the first quadrant exactly in half.', show: ['p4.axes', 'p4.circle', 'p4.arm', 'p4.arc'] },
        { say: 'So the point lies on the line y equals x: its two coordinates are equal.', show: ['p4.tri', 'p4.one-r', 'm.0'], focus: 'm.0' },
        { say: 'Put y equals x into x squared plus y squared equals one. x squared plus x squared is one, so two x squared is one.', show: 'm.1', focus: 'm.1' },
        { say: 'x squared is one half, so x is one over root two. Rationalize: multiply the top and bottom by root two to get root two over two.', show: 'm.2', focus: 'm.2' },
        { say: 'So P of pi over four is root two over two, root two over two. Both coordinates are about 0.71.', show: ['p4.x', 'p4.y', 'm.3'], focus: ['p4.x', 'p4.y', 'm.3'] },
      ],
    },
    {
      chapter: 'The angles π/6 and π/3',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('p63', [
          unitCircle({ arm: 30, armLabel: '\\tfrac{\\pi}{6}', drop: true, sides: { x: '\\tfrac{\\sqrt{3}}{2}', y: '\\tfrac{1}{2}' } }),
          hyp(),
          unitCircle({ name: 'b', arm: 60, armLabel: '\\tfrac{\\pi}{3}', drop: true, sides: { x: '\\tfrac{1}{2}', y: '\\tfrac{\\sqrt{3}}{2}' } }),
          hyp('b'),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{short side} = \\dfrac{1}{2}', '\\text{long side} = \\dfrac{\\sqrt{3}}{2}', 'P\\left(\\dfrac{\\pi}{6}\\right) = \\left(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)', 'P\\left(\\dfrac{\\pi}{3}\\right) = \\left(\\dfrac{1}{2}, \\dfrac{\\sqrt{3}}{2}\\right)'] }],
      lines: [
        { say: 'Next, pi over six, which is thirty degrees. Dropping the perpendicular makes a thirty, sixty, ninety triangle with hypotenuse one.', show: ['p63.axes', 'p63.circle', 'p63.arm', 'p63.arc', 'p63.tri', 'p63.one-r'] },
        { say: 'In that special triangle, the shortest side is half the hypotenuse: one half. The longer leg is root three times the short side: root three over two.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The short side is opposite the thirty-degree angle, so it is the height, y. So P of pi over six is root three over two, one half.', show: ['p63.x', 'p63.y', 'm.2'], focus: ['p63.x', 'p63.y', 'm.2'] },
        { say: 'Now pi over three, sixty degrees. It is the same triangle, standing up, so the two numbers swap places. P of pi over three is one half, root three over two.', show: ['p63.b-arm', 'p63.b-arc', 'p63.b-tri', 'p63.b-one-r', 'p63.b-x', 'p63.b-y', 'm.3'], hide: ['p63.arm', 'p63.arc', 'p63.tri', 'p63.one-r', 'p63.x', 'p63.y'], focus: ['p63.b-x', 'p63.b-y', 'm.3'] },
      ],
    },
    {
      chapter: 'Quadrant I',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('q1', [
          unitCircle({
            points: [
              { deg: 0 },
              { deg: 30, tex: '\\tfrac{\\pi}{6}' },
              { deg: 45, tex: '\\tfrac{\\pi}{4}' },
              { deg: 60, tex: '\\tfrac{\\pi}{3}' },
              { deg: 90 },
            ],
          }),
          ends,
        ]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$\\theta$', '$P(\\theta)$'],
          rows: [
            ['$0$', '$(1, 0)$'],
            ['$\\frac{\\pi}{6}$', '$\\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$'],
            ['$\\frac{\\pi}{4}$', '$\\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$'],
            ['$\\frac{\\pi}{3}$', '$\\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$'],
            ['$\\frac{\\pi}{2}$', '$(0, 1)$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all the special points in quadrant one. At zero, the arm lies along the positive x-axis, so the point is one, zero.', show: ['q1.axes', 'q1.circle', 'q1.p0', 'q1.l0', 't.0'], focus: 't.0' },
        { say: 'Then pi over six, pi over four and pi over three, which you have just found.', show: ['q1.p30', 'q1.p45', 'q1.p60', 't.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'At pi over two, the arm points straight up, so the point is zero, one.', show: ['q1.p90', 'q1.l90', 't.4'], focus: 't.4' },
        { say: 'Look at the y-coordinates as the angle grows: zero, one half, root two over two, root three over two, one. The sine rises from zero to one, while the cosine falls from one to zero.', focus: 't' },
      ],
    },
    {
      chapter: 'Swapping the coordinates',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('sw', [
          unitCircle({
            points: [
              { deg: 30, tex: '\\left(\\tfrac{\\sqrt{3}}{2}, \\tfrac{1}{2}\\right)' },
              { deg: 60, tex: '\\left(\\tfrac{1}{2}, \\tfrac{\\sqrt{3}}{2}\\right)', tone: 'opp' },
            ],
          }),
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up x and y', md: '$P\\left(\\frac{\\pi}{6}\\right)$ is close to the $x$-axis, so its $x$-coordinate is the larger one: $\\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$. For $\\frac{\\pi}{3}$, the larger value is $y$.' }],
      lines: [
        { say: 'It is easy to mix up the points for pi over six and pi over three, because they use the same two numbers.', show: ['sw.axes', 'sw.circle', 'oops'] },
        { say: 'Picture where the point is. Pi over six is a small angle, close to the x-axis. Its point is far to the right and only a little way up, so its x-coordinate is the larger one: root three over two, one half.', show: 'sw.p30', focus: 'sw.p30' },
        { say: 'Pi over three is close to the y-axis. Its point is high up and only a little way right, so its larger value is y: one half, root three over two.', show: 'sw.p60', focus: 'sw.p60' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the exact value of $\\cos\\dfrac{\\pi}{6}$?',
          choices: ['$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\sqrt{3}$'],
          answer: 2,
          working: '$P\\left(\\dfrac{\\pi}{6}\\right) = \\left(\\dfrac{\\sqrt{3}}{2}, \\dfrac{1}{2}\\right)$, and $\\cos\\theta$ is the $x$-coordinate: $\\dfrac{\\sqrt{3}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the exact value of the cosine of pi over six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The cosine is the x-coordinate of P of pi over six, which is root three over two. Choice A is the y-coordinate, the sine, which mixes up x and y.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$P(\\theta) = (\\cos\\theta, \\sin\\theta)$: $x$ is the cosine, $y$ is the sine.', '$P\\left(\\frac{\\pi}{6}\\right) = \\left(\\frac{\\sqrt{3}}{2}, \\frac{1}{2}\\right)$, $P\\left(\\frac{\\pi}{4}\\right) = \\left(\\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{2}}{2}\\right)$, $P\\left(\\frac{\\pi}{3}\\right) = \\left(\\frac{1}{2}, \\frac{\\sqrt{3}}{2}\\right)$', 'Near the $x$-axis, $x$ is larger; near the $y$-axis, $y$ is larger.'] }],
      lines: [
        { say: 'Let’s sum up. P of theta is where the terminal arm meets the unit circle, and its coordinates are cosine theta and sine theta.', show: 'sum.0' },
        { say: 'P of pi over six is root three over two, one half. P of pi over four is root two over two, root two over two. P of pi over three is one half, root three over two.', show: 'sum.1' },
        { say: 'Near the x-axis, x is the larger coordinate, and near the y-axis, y is. In part three, we find the points in the other quadrants. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
