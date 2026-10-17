import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/** The radius drawn to the circle's point P, labelled 1, and P's name. */
const radiusToP: Part = {
  points: {},
  items: [
    { kind: 'line', id: 'one-r', from: 'O', to: 'P', tone: 'hyp', weight: 3.5, label: '1', labelSide: 'left' },
    { kind: 'label', id: 'P-name', at: 'P', tex: 'P(x,\\ y)', tone: 'brand', dot: true, place: 'above right' },
  ],
};

/** The line y = −5/13 (on a circle drawn 4 units across), which meets the circle twice. */
const level: Part = {
  points: { h1: [-4.8, (-5 / 13) * 4], h2: [4.8, (-5 / 13) * 4] },
  items: [{ kind: 'line', id: 'level', from: 'h1', to: 'h2', tone: 'opp', dashed: true, weight: 2 }],
};

const deg = (y: number, x: number) => Math.round(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);

const video: Explainer = {
  id: 'm301-4-2',
  lessonId: 'm301-4-2',
  title: 'The Unit Circle, Part 1: The Equation of the Unit Circle',
  thumbnailTitle: 'The Unit Circle',
  thumbnail: 'uc',
  summary: 'The unit circle x² + y² = 1 from the distance to the origin (and x² + y² = r² for a circle of radius r), checking that a point such as (−3/5, 4/5) is on it, and finding a missing coordinate with the sign the quadrant gives. Part 2 finds the points for the special angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.2 · Part 1', title: 'The Unit Circle', subtitle: '$x^2 + y^2 = 1$' }],
      lines: [
        { say: 'Wrap a number line around a circle of radius one, and every angle lands on exactly one point. The coordinates of that point make the rest of trigonometry fit together.', show: 'title' },
        { say: 'In this video, you will find the equation of that circle, the unit circle, and use it to check points and find missing coordinates.' },
      ],
    },
    {
      chapter: 'The equation',
      layout: 'split',
      leftWidth: 560,
      left: [figure('uc', [unitCircle({ arm: 50, drop: true, sides: { x: 'x', y: 'y' } }), radiusToP])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{(x - 0)^2 + (y - 0)^2} = 1', 'x^2 + y^2 = 1'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit circle', md: 'Centre $(0, 0)$, radius $1$: $x^2 + y^2 = 1$. A circle with centre $(0, 0)$ and radius $r$ is $x^2 + y^2 = r^2$.' },
      ],
      lines: [
        { say: 'The unit circle is the circle of radius one, centred at the origin.', show: ['uc.axes', 'uc.circle'], focus: 'uc.circle' },
        { say: 'Take any point P, x, y, on it. Its distance from the origin is the radius, one.', show: ['uc.one-r', 'uc.P-name'], focus: 'uc.one-r' },
        { say: 'By the distance formula, the square root of x minus zero, squared, plus y minus zero, squared, equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'You can see the same thing in the right triangle under the point. Its legs are x and y, and its hypotenuse is one. Squaring both sides gives x squared plus y squared equals one.', show: ['uc.tri', 'uc.x', 'uc.y', 'm.1'], focus: ['uc.x', 'uc.y', 'm.1'] },
        { say: 'A point is on the unit circle exactly when its coordinates satisfy this equation. And a circle centred at the origin with radius r has the equation x squared plus y squared equals r squared.', show: 'def' },
      ],
    },
    {
      chapter: 'Is the point on the circle?',
      layout: 'split',
      leftWidth: 560,
      left: [figure('on', [unitCircle({ points: [{ deg: deg(4, -3), tex: '\\left(-\\tfrac{3}{5}, \\tfrac{4}{5}\\right)' }] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\left(-\\dfrac{3}{5}\\right)^2 + \\left(\\dfrac{4}{5}\\right)^2', '= \\dfrac{9}{25} + \\dfrac{16}{25} = \\dfrac{25}{25} = 1 \\;\\checkmark', '\\left(\\dfrac{1}{2}\\right)^2 + \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{2} \\ne 1'] },
      ],
      lines: [
        { say: 'Show that the point at negative three fifths, four fifths, lies on the unit circle.', show: ['on.axes', 'on.circle', 'on.pts'] },
        { say: 'Substitute into x squared plus y squared. Negative three fifths, squared, is nine twenty-fifths. Four fifths, squared, is sixteen twenty-fifths.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine twenty-fifths plus sixteen twenty-fifths is twenty-five twenty-fifths, which is one. The coordinates satisfy the equation, so the point is on the unit circle.', show: 'm.1', focus: 'm.1' },
        { say: 'Compare the point at one half, one half. One quarter plus one quarter is one half, not one. That point is inside the circle, not on it.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A missing coordinate',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('miss', [
          unitCircle({
            points: [
              { deg: deg(-5, -12), tex: '\\left(x, -\\tfrac{5}{13}\\right)' },
              { deg: deg(-5, 12), tex: '\\left(\\tfrac{12}{13}, -\\tfrac{5}{13}\\right)', tone: 'muted' },
            ],
          }),
          level,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + \\left(-\\dfrac{5}{13}\\right)^2 = 1', 'x^2 = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}', 'x = \\pm\\dfrac{12}{13}', '\\text{Quadrant III: } x = -\\dfrac{12}{13}'] }],
      lines: [
        { say: 'The point x, negative five thirteenths, is on the unit circle in quadrant three. Determine x.', show: ['miss.axes', 'miss.circle'] },
        { say: 'Substitute y into the equation: x squared plus negative five thirteenths, squared, equals one.', show: 'm.0', focus: 'm.0' },
        { say: 'So x squared is one minus 25 over 169. Write one as 169 over 169: x squared is 144 over 169.', show: 'm.1', focus: 'm.1' },
        { say: 'Taking the square root gives two values, plus or minus twelve thirteenths. The picture shows why: the line y equals negative five thirteenths meets the circle twice.', show: ['m.2', 'miss.level', 'miss.pts'], focus: ['m.2', 'miss.level'] },
        { say: 'In quadrant three, x is negative. So x is negative twelve thirteenths. The other point, twelve thirteenths, negative five thirteenths, is in quadrant four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Dropping the sign',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Quadrant', 'I', 'II', 'III', 'IV'], rows: [['$x$', '$+$', '$-$', '$-$', '$+$'], ['$y$', '$+$', '$+$', '$-$', '$-$']] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping the sign', md: 'A square root gives two values. The quadrant decides which one is correct: in quadrant III, both coordinates are negative.' },
      ],
      lines: [
        { say: 'The most common mistake here is to take only the positive square root, and write x equals twelve thirteenths.', show: 'oops' },
        { say: 'The quadrant decides the signs. In quadrant one, x and y are both positive. In quadrant two, x is negative and y is positive.', show: 't', focus: 't' },
        { say: 'In quadrant three, both are negative. And in quadrant four, x is positive and y is negative. Always check the quadrant before you choose the sign.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $\\left(\\dfrac{3}{5}, y\\right)$ is on the unit circle in quadrant IV. Determine $y$.',
          choices: ['$-\\dfrac{4}{5}$', '$\\dfrac{4}{5}$', '$-\\dfrac{2}{5}$', '$\\dfrac{16}{25}$'],
          answer: 0,
          working: '$y^2 = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$, so $y = \\pm\\dfrac{4}{5}$. In quadrant IV, $y < 0$: $y = -\\dfrac{4}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at three fifths, y, is on the unit circle in quadrant four. Determine y. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. y squared is one minus nine twenty-fifths, which is sixteen twenty-fifths, so y is plus or minus four fifths. In quadrant four, y is negative. B drops the sign, and D forgets to take the square root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The unit circle: $x^2 + y^2 = 1$.', 'A circle of radius $r$ centred at the origin: $x^2 + y^2 = r^2$.', 'A square root gives two values; the quadrant decides the sign.'] }],
      lines: [
        { say: 'Let’s sum up. The unit circle has centre zero, zero and radius one. Its equation is x squared plus y squared equals one.', show: 'sum.0' },
        { say: 'A circle centred at the origin with radius r is x squared plus y squared equals r squared.', show: 'sum.1' },
        { say: 'When you solve for a missing coordinate, the square root gives two values, and the quadrant decides the sign. In part two, we find the points for the special angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
