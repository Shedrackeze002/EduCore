import type { Explainer, Place } from '@/video/script.ts';
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

const video: Explainer = {
  id: 'm301-4-4-b',
  lessonId: 'm301-4-4',
  title: 'Introduction to Trigonometric Equations, Part 2: When the Value Is Not Special',
  thumbnailTitle: 'When the Value Is Not Special',
  thumbnail: 'calc',
  summary: 'Solving 5 sin θ + 2 = 0 for 0 ≤ θ < 2π with a calculator (θ ≈ 3.55 or 5.87), using the positive value for the reference angle and checking the mode, and equations with only one solution (sin θ = −1) or none (cos θ = 4/3).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.4 · Part 2', title: 'When the Value Is Not Special', subtitle: 'Calculator solutions, and one solution or none' }],
      lines: [
        { say: 'Most trigonometric equations do not give a special value like one half or root three over two.', show: 'title' },
        { say: 'In this video, you will solve equations with a calculator, avoid the calculator’s traps, and see why some equations have only one solution, or none at all.' },
      ],
    },
    {
      chapter: 'With a calculator',
      layout: 'split',
      leftWidth: 600,
      left: [figure('calc', [unitCircle({ points: [{ deg: 204, tex: '3.55' }, { deg: 336, tex: '5.87' }] }), across('line', [-1.3, -0.4], [1.3, -0.4], { tex: 'y = -0.4', at: [-0.5, -0.4], place: 'above' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5\\sin\\theta + 2 = 0', '\\sin\\theta = -\\dfrac{2}{5} = -0.4', '\\theta_R = \\sin^{-1}(0.4) \\approx 0.4115', '\\theta = \\pi + 0.4115 \\approx 3.5531', '\\theta = 2\\pi - 0.4115 \\approx 5.8717', '\\theta \\approx 3.55 \\text{ or } \\theta \\approx 5.87'] }],
      lines: [
        { say: 'Solve five sine theta plus two equals zero, for theta from zero up to two pi, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the sine: subtract two, then divide by five. Sine theta equals negative two fifths, which is negative 0.4. That is not a special value.', show: 'm.1', focus: 'm.1' },
        { say: 'So find the reference angle with the inverse sine key, always using the positive value. In radian mode, the inverse sine of 0.4 is about 0.4115.', show: 'm.2', focus: 'm.2' },
        { say: 'The sine is negative in quadrants three and four. In quadrant three, theta is pi plus 0.4115, about 3.5531.', show: 'm.3', focus: 'm.3' },
        { say: 'In quadrant four, theta is two pi minus 0.4115, about 5.8717.', show: 'm.4', focus: 'm.4' },
        { say: 'So theta is about 3.55 or 5.87. On the unit circle, these are the two points where y equals negative 0.4.', show: ['m.5', 'calc.axes', 'calc.circle', 'calc.line', 'calc.pts'], focus: ['m.5', 'calc.pts'] },
      ],
    },
    {
      chapter: 'A negative calculator angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin^{-1}(-0.4) \\approx -0.41 \\quad \\text{not in } 0 \\le \\theta < 2\\pi', '\\text{Degree mode: } \\sin^{-1}(0.4) \\approx 23.6 \\quad \\text{(degrees)}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using a negative calculator angle', md: 'Use the **positive** value to get the reference angle, then place it in the correct quadrants. Radian answers between $0$ and $2\\pi$ are always less than about $6.28$.' },
      ],
      lines: [
        { say: 'Why use the positive value? If you enter the inverse sine of negative 0.4, the calculator gives about negative 0.41. That angle is not even in the domain, from zero up to two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the positive value to get the reference angle, then place it in the correct quadrants yourself.', show: 'oops' },
        { say: 'Check your mode too. If your answer looks like 23.6 instead of 0.41, the calculator is in degree mode. Radian answers between zero and two pi are always less than about 6.28.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'One solution, or none',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('few', [
          unitCircle({ points: [{ deg: 270, tone: 'theta' }] }),
          { points: {}, items: [{ kind: 'label', id: 'bot', at: 'p270', tex: '\\tfrac{3\\pi}{2}', tone: 'theta', place: 'below right' }] },
          across('low', [-1.3, -1], [1.3, -1], { tex: 'y = -1', at: [-1.15, -1], place: 'above' }),
          across('far', [4 / 3, -1.3], [4 / 3, 1.3], { tex: 'x = \\tfrac{4}{3}', at: [4 / 3, -1.3], place: 'below' }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin\\theta = -1: \\quad \\theta = \\dfrac{3\\pi}{2}', '3\\cos\\theta - 4 = 0', '\\cos\\theta = \\dfrac{4}{3} > 1', '-1 \\le \\cos\\theta \\le 1: \\text{ no solution}'] }],
      lines: [
        { say: 'Not every equation has two solutions in one rotation. Solve sine theta equals negative one.', show: ['few.x-axis', 'few.y-axis', 'few.y-name', 'few.circle'] },
        { say: 'The sine is the y-coordinate, and y is negative one at only one point on the unit circle: the bottom, where the terminal arm points straight down. The line y equals negative one just touches the circle there. So the only solution is three pi over two.', show: ['few.low', 'few.pts', 'few.bot', 'm.0'], focus: ['few.pts', 'few.bot', 'm.0'] },
        { say: 'Now solve three cosine theta minus four equals zero. Isolate the cosine: cosine theta equals four thirds.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'But the cosine is the x-coordinate of a point on the unit circle, so it is always between negative one and one. The line x equals four thirds misses the circle completely. There is no solution.', show: ['few.far', 'm.3'], focus: ['few.far', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4\\cos\\theta - 1 = 0$ for $0 \\le \\theta < 2\\pi$, to the nearest hundredth.',
          choices: ['$\\theta \\approx 1.32$ only', '$\\theta \\approx 1.32$ or $\\theta \\approx 1.82$', '$\\theta \\approx 75.52$ or $\\theta \\approx 284.48$', '$\\theta \\approx 1.32$ or $\\theta \\approx 4.97$'],
          answer: 3,
          working: '$\\cos\\theta = 0.25$, so $\\theta_R = \\cos^{-1}(0.25) \\approx 1.3181$. Cosine is positive in quadrants I and IV: $\\theta \\approx 1.32$ or $\\theta = 2\\pi - 1.3181 \\approx 4.97$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four cosine theta minus one equals zero, for theta from zero up to two pi, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The cosine of theta is one quarter, so the reference angle is the inverse cosine of 0.25, about 1.3181. The cosine is positive in quadrants one and four: about 1.32, and two pi minus 1.3181, about 4.97. C comes from degree mode, and B uses quadrant two, where the cosine is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find $\\theta_R$ with an inverse key, using the positive value.', 'Check the mode: radian answers lie between $0$ and about $6.28$.', 'One solution when $\\sin\\theta$ or $\\cos\\theta$ is $\\pm 1$; none outside $[-1, 1]$.'] }],
      lines: [
        { say: 'Let’s sum up. When the value is not special, find the reference angle with an inverse key, using the positive value.', show: 'sum.0' },
        { say: 'Check the mode: radian answers between zero and two pi are less than about 6.28.', show: 'sum.1' },
        { say: 'Sine or cosine equal to one or negative one has just one solution per rotation, and a value outside negative one to one has none. In part three, we solve over larger domains, and write the general solution. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
