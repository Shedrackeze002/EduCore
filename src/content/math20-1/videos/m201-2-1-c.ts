import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { standardAngle } from '@/video/trig.ts';

const video: Explainer = {
  id: 'm201-2-1-c',
  lessonId: 'm201-2-1',
  title: 'Angles in Standard Position, Part 3: Exact Values in Every Quadrant',
  thumbnailTitle: 'Exact Values in Every Quadrant',
  thumbnail: 'q2',
  summary: 'sin θ = y/r, cos θ = x/r and tan θ = y/x for a point on the terminal arm, exact values for 150° and 225° from a special triangle placed against the x-axis, the signs of x and y in each quadrant, and the quadrantal angles, where a tangent can be undefined.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.1 · Part 3', title: 'Exact Values in Every Quadrant', subtitle: 'Size from the reference angle, sign from x and y' }],
      lines: [
        { say: 'SOH CAH TOA works for acute angles in a right triangle. But what is the sine of 150 degrees, or the cosine of 225?', show: 'title' },
        { say: 'In this video, you will use a point on the terminal arm to find exact values for angles in every quadrant.' },
      ],
    },
    {
      chapter: 'x, y and r',
      layout: 'split',
      leftWidth: 520,
      left: [figure('q2', [standardAngle({ deg: 150, label: '150^\\circ', ref: '30^\\circ', drop: true, compact: true, point: '(-\\sqrt{3},\\ 1)', sides: { x: '-\\sqrt{3}', y: '1', r: '2' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin\\theta = \\dfrac{\\opp{y}}{\\hyp{r}} \\qquad \\cos\\theta = \\dfrac{\\adj{x}}{\\hyp{r}}', '\\tan\\theta = \\dfrac{\\opp{y}}{\\adj{x}}', '\\sin 150^\\circ = \\dfrac{1}{2}', '\\cos 150^\\circ = -\\dfrac{\\sqrt{3}}{2}', '\\tan 150^\\circ = \\dfrac{1}{-\\sqrt{3}} = -\\dfrac{\\sqrt{3}}{3}'] }],
      lines: [
        { say: 'Take a point, x, y, on the terminal arm, at a distance r from the origin. Then the sine of theta is y over r, the cosine is x over r, and the tangent is y over x.', show: ['q2.axes', 'q2.arm', 'q2.arc', 'm.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'For an acute angle, these match SOH CAH TOA. In other quadrants, x or y can be negative, and that sets the sign.' },
        { say: 'For 150 degrees, the reference angle is thirty. Place the thirty, sixty, ninety triangle against the x-axis, in quadrant two. The point on the terminal arm is negative root three, one, with r equal to two.', show: ['q2.ref', 'q2.tri', 'q2.P', 'q2.x', 'q2.y', 'q2.r'], focus: ['q2.x', 'q2.y', 'q2.r'] },
        { say: 'So the sine of 150 is one over two: one half. The cosine is negative root three over two. And the tangent is one over negative root three: negative root three over three.', show: ['m.2', 'm.3', 'm.4'], focus: ['m.2', 'm.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Using the reference angle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('q3', [standardAngle({ deg: 225, label: '225^\\circ', ref: '45^\\circ', drop: true, compact: true, sides: { x: '-1', y: '-1', r: '\\sqrt{2}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\theta_R = 225^\\circ - 180^\\circ = 45^\\circ', 'x < 0, \\text{ so } \\cos 225^\\circ < 0', '\\cos 225^\\circ = -\\dfrac{\\sqrt{2}}{2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dropping the sign', md: 'The reference angle gives the **size** of the ratio, not its sign. Here $x$ is negative.' },
      ],
      lines: [
        { say: 'Find the exact value of the cosine of 225 degrees. It is in quadrant three, so the reference angle is 225 minus 180: 45 degrees.', show: ['q3.axes', 'q3.arm', 'q3.arc', 'q3.ref', 'm.0'], focus: ['q3.ref', 'm.0'] },
        { say: 'In quadrant three, x is negative, so the cosine, x over r, is negative.', show: ['q3.tri', 'q3.x', 'q3.y', 'q3.r', 'm.1'], focus: ['q3.x', 'm.1'] },
        { say: 'The cosine of 45 is root two over two, so the cosine of 225 is negative root two over two.', show: 'm.2', focus: 'm.2' },
        { say: 'The reference angle gives the size of the ratio, but not its sign. Always check the signs of x and y in the quadrant.', show: 'oops' },
      ],
    },
    {
      chapter: 'Quadrantal angles',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$\\theta$', '$0^\\circ$', '$90^\\circ$', '$180^\\circ$', '$270^\\circ$'], rows: [['point', '$(1, 0)$', '$(0, 1)$', '$({-1}, 0)$', '$(0, {-1})$']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin 270^\\circ = \\dfrac{-1}{1} = -1', '\\tan 90^\\circ = \\dfrac{1}{0} \\text{ is undefined}'] },
      ],
      lines: [
        { say: 'For the quadrantal angles, use the points one, zero; zero, one; negative one, zero; and zero, negative one. Each has r equal to one.', show: 't' },
        { say: 'So the sine of 270 degrees is y over r: negative one over one, which is negative one.', show: 'm.0', focus: 'm.0' },
        { say: 'And the tangent of ninety degrees is one over zero. You cannot divide by zero, so the tangent of ninety is undefined.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the exact value of $\\sin 300^\\circ$?',
          choices: ['$-\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$-\\dfrac{1}{2}$', '$\\dfrac{1}{2}$'],
          answer: 0,
          working: 'Quadrant IV: $\\theta_R = 60^\\circ$ and $y < 0$, so $\\sin 300^\\circ = -\\sin 60^\\circ = -\\dfrac{\\sqrt{3}}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the exact value of the sine of 300 degrees? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 300 degrees is in quadrant four, with a reference angle of sixty. There, y is negative, so the sine is negative root three over two. B drops the sign, and C uses the wrong special value.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sin\\theta = \\dfrac{y}{r}$, $\\cos\\theta = \\dfrac{x}{r}$, $\\tan\\theta = \\dfrac{y}{x}$.', 'The reference angle gives the size; the signs of $x$ and $y$ give the sign.', 'Quadrantal angles use $(\\pm 1, 0)$ and $(0, \\pm 1)$.'] }],
      lines: [
        { say: 'Let’s sum up. For a point on the terminal arm, the sine is y over r, the cosine is x over r, and the tangent is y over x.', show: 'sum.0' },
        { say: 'The reference angle gives the size of the ratio, and the signs of x and y give its sign.', show: 'sum.1' },
        { say: 'And quadrantal angles use the points on the axes, one unit from the origin. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
