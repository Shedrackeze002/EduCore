import type { Explainer, Place } from '@/video/script.ts';
import { dots, piTex, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';
import { unitCircle } from '@/video/trig.ts';

/**
 * A dashed line from `from` to `to` on a unit circle drawn 4 units across (coordinates in radii),
 * with its equation as a label at `at`, set where it clears the circle and its points. Parts: the
 * group `id` (the line and its label).
 */
const across = (id: string, from: [number, number], to: [number, number], label: { tex: string; at: [number, number]; place: Place }): Part => ({
  points: { [`${id}-a`]: [4 * from[0], 4 * from[1]], [`${id}-b`]: [4 * to[0], 4 * to[1]], [`${id}-at`]: [4 * label.at[0], 4 * label.at[1]] },
  items: [
    { kind: 'line', id: `${id}-line`, from: `${id}-a`, to: `${id}-b`, tone: 'opp', dashed: true, weight: 2.5, group: id },
    { kind: 'label', id: `${id}-label`, at: `${id}-at`, tex: label.tex, tone: 'opp', place: label.place, group: id },
  ],
});

const g = plane({ x: [0, 2 * Math.PI], y: [-1.5, 1.5], xStep: Math.PI / 4, yStep: 0.5, every: 2, width: 8, height: 4, xTex: piTex });
const k = -Math.SQRT1_2;

const video: Explainer = {
  id: 'm301-4-4',
  lessonId: 'm301-4-4',
  title: 'Introduction to Trigonometric Equations, Part 1: Solving Over One Rotation',
  thumbnailTitle: 'Solving Over One Rotation',
  thumbnail: 'cos',
  summary: 'Solving first-degree trigonometric equations over one rotation in four steps (isolate the ratio, find the reference angle from the positive value, choose the quadrants by sign, place the angle): 2 cos θ + 1 = 0 gives 120° and 240°, and √2 sin θ + 1 = 0 gives 5π/4 and 7π/4, as the graph confirms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.4 · Part 1', title: 'Solving Over One Rotation', subtitle: 'First-degree trigonometric equations' }],
      lines: [
        { say: 'The equation sine theta equals one half has two solutions in one turn of the unit circle, and infinitely many if the angle can keep turning.', show: 'title' },
        { say: 'Solving a trigonometric equation means finding all of the solutions in the domain you are given. In this video, you will solve equations over one rotation, in degrees and in radians.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'First-degree trigonometric equation', md: 'An equation with one trigonometric ratio, raised to the first power, such as $2\\cos\\theta + 1 = 0$.' },
        { kind: 'bullets', id: 'b', items: ['Isolate the ratio, as you would isolate $x$.', 'Find the reference angle from the **positive** value of the ratio.', 'Use CAST (or the signs of $x$ and $y$) to find the quadrants with the given sign.', 'Place the reference angle in each of those quadrants, within the domain.'] },
      ],
      lines: [
        { say: 'A first-degree trigonometric equation contains one trigonometric ratio, raised to the first power.', show: 'def' },
        { say: 'Solve it in four steps. First, isolate the ratio, just as you would isolate x.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, find the reference angle from the positive value of the ratio.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, use the CAST rule, or the signs of x and y on the unit circle, to find the quadrants where the ratio has the given sign.', show: 'b.2', focus: 'b.2' },
        { say: 'Fourth, place the reference angle in each of those quadrants, within the domain.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'In degrees',
      layout: 'split',
      leftWidth: 540,
      left: [figure('cos', [unitCircle({ points: [{ deg: 120, tex: '120^\\circ' }, { deg: 240, tex: '240^\\circ' }] }), across('line', [-0.5, -1.3], [-0.5, 1.3], { tex: 'x = -\\tfrac{1}{2}', at: [-0.5, -1.3], place: 'below' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2\\cos\\theta + 1 = 0', '2\\cos\\theta = -1,\\quad \\cos\\theta = -\\dfrac{1}{2}', '\\cos\\theta_R = \\dfrac{1}{2}: \\quad \\theta_R = 60^\\circ', '\\cos\\theta < 0: \\text{ quadrants II and III}', '\\theta = 180^\\circ - 60^\\circ = 120^\\circ', '\\theta = 180^\\circ + 60^\\circ = 240^\\circ'] }],
      lines: [
        { say: 'Solve two cosine theta plus one equals zero, for theta from zero up to 360 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the cosine. Subtract one: two cosine theta equals negative one. Divide by two: cosine theta equals negative one half.', show: 'm.1', focus: 'm.1' },
        { say: 'The reference angle comes from the positive value. The cosine of the reference angle is one half, so the reference angle is sixty degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'The cosine is negative in quadrants two and three. So theta is 180 minus sixty, or 180 plus sixty.', show: ['m.3', 'm.4', 'm.5'], focus: ['m.4', 'm.5'] },
        { say: 'The solutions are 120 degrees and 240 degrees. On the unit circle, the cosine is the x-coordinate, and the line x equals negative one half meets the circle at exactly these two points.', show: ['cos.axes', 'cos.circle', 'cos.line', 'cos.pts'], focus: ['m.4', 'm.5', 'cos.pts'] },
      ],
    },
    {
      chapter: 'In radians',
      layout: 'split',
      leftWidth: 600,
      left: [figure('sin', [unitCircle({ points: [{ deg: 225, tex: '\\tfrac{5\\pi}{4}' }, { deg: 315, tex: '\\tfrac{7\\pi}{4}' }] }), across('line', [-1.3, k], [1.3, k], { tex: 'y = -\\tfrac{\\sqrt{2}}{2}', at: [-0.38, k], place: 'above' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{2}\\sin\\theta + 1 = 0', '\\sin\\theta = -\\dfrac{1}{\\sqrt{2}} = -\\dfrac{\\sqrt{2}}{2}', '\\theta_R = \\dfrac{\\pi}{4}', '\\text{III and IV: } \\pi + \\dfrac{\\pi}{4},\\ 2\\pi - \\dfrac{\\pi}{4}', '\\theta = \\dfrac{5\\pi}{4} \\text{ or } \\theta = \\dfrac{7\\pi}{4}'] }],
      lines: [
        { say: 'Now in radians. Solve root two sine theta plus one equals zero, for theta from zero up to two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the sine: subtract one, then divide by root two. Sine theta equals negative one over root two, which is negative root two over two.', show: 'm.1', focus: 'm.1' },
        { say: 'The sine of the reference angle is root two over two, so the reference angle is pi over four.', show: 'm.2', focus: 'm.2' },
        { say: 'The sine is negative in quadrants three and four. In quadrant three, theta is pi plus pi over four. In quadrant four, it is two pi minus pi over four.', show: 'm.3', focus: 'm.3' },
        { say: 'So theta is five pi over four, or seven pi over four. The sine is the y-coordinate, and the line y equals negative root two over two meets the unit circle at these two points.', show: ['m.4', 'sin.axes', 'sin.circle', 'sin.line', 'sin.pts'], focus: ['m.4', 'sin.pts'] },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 700,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'sine', f: Math.sin, samples: 200 }),
          polyline(g, { id: 'level', points: [[0, k], [2 * Math.PI, k]], tone: 'opp', dashed: true }),
          dots(g, [
            { id: 'S1', x: (5 * Math.PI) / 4, y: k, tex: '\\tfrac{5\\pi}{4}', tone: 'theta', place: 'below left' },
            { id: 'S2', x: (7 * Math.PI) / 4, y: k, tex: '\\tfrac{7\\pi}{4}', tone: 'theta', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\sin\\theta', 'y = -\\dfrac{\\sqrt{2}}{2}'] }],
      lines: [
        { say: 'The graph shows the same solutions. Here is y equals sine theta, from zero to two pi.', show: ['gr.grid', 'gr.axes', 'gr.sine', 'm.0'] },
        { say: 'And here is the line y equals negative root two over two, about negative 0.71.', show: ['gr.level', 'm.1'], focus: 'gr.level' },
        { say: 'In one rotation, they cross twice: at five pi over four, and at seven pi over four. Each crossing is a solution.', show: ['gr.S1', 'gr.S2'], focus: ['gr.S1', 'gr.S2'] },
      ],
    },
    {
      chapter: 'Stopping at one answer',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\cos\\theta = -\\dfrac{1}{2}: \\quad \\cos^{-1}\\left(-\\dfrac{1}{2}\\right) = 120^\\circ \\text{ only}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at one answer', md: 'Most equations have **two** solutions in one rotation. After finding the first, ask which other quadrant gives the ratio the same sign.' },
      ],
      lines: [
        { say: 'A calculator gives only one angle. For cosine theta equals negative one half, the inverse cosine gives 120 degrees, and nothing else.', show: 'm.0', focus: 'm.0' },
        { say: 'Most equations have two solutions in one rotation. After you find the first, ask which other quadrant gives the ratio the same sign. Here, quadrant three gives 240 degrees.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $2\\sin\\theta - \\sqrt{3} = 0$ for $0 \\le \\theta < 2\\pi$.',
          choices: ['$\\theta = \\dfrac{\\pi}{3}$ or $\\theta = \\dfrac{2\\pi}{3}$', '$\\theta = \\dfrac{\\pi}{3}$ only', '$\\theta = \\dfrac{\\pi}{6}$ or $\\theta = \\dfrac{5\\pi}{6}$', '$\\theta = \\dfrac{4\\pi}{3}$ or $\\theta = \\dfrac{5\\pi}{3}$'],
          answer: 0,
          working: '$\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$, so $\\theta_R = \\dfrac{\\pi}{3}$. Sine is positive in quadrants I and II: $\\theta = \\dfrac{\\pi}{3}$ or $\\theta = \\pi - \\dfrac{\\pi}{3} = \\dfrac{2\\pi}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve two sine theta minus root three equals zero, for theta from zero up to two pi. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sine theta equals root three over two, so the reference angle is pi over three. The sine is positive in quadrants one and two: pi over three, and pi minus pi over three, which is two pi over three. B stops at one answer, and D gives the angles where the sine is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isolate the ratio.', 'Find $\\theta_R$ from the positive value.', 'Choose the quadrants by sign, then place $\\theta_R$ in each.', 'Expect two solutions in one rotation.'] }],
      lines: [
        { say: 'Let’s sum up. First, isolate the ratio.', show: 'sum.0' },
        { say: 'Find the reference angle from the positive value of the ratio.', show: 'sum.1' },
        { say: 'Choose the quadrants by the sign, and place the reference angle in each one.', show: 'sum.2' },
        { say: 'And expect two solutions in one rotation. In part two, we solve equations whose values are not special, and some with one solution or none. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
