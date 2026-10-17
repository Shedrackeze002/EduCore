import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { hline, vline } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const h = (t: number) => -20 * Math.cos((PI / 30) * t) + 22;
const theta = Math.acos(-0.4);
const [t1, t2] = [(30 * theta) / PI, (30 * (2 * PI - theta)) / PI];

/** Two rotations, and the line h = 30. */
const g = plane({ x: [0, 120], y: [0, 45], xStep: 10, yStep: 5, every: 2, width: 8, height: 5.5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
/** The first rotation. */
const k = plane({ x: [0, 60], y: [0, 45], xStep: 5, yStep: 5, every: 2, width: 7, height: 5.5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });

const video: Explainer = {
  id: 'm301-5-4-b',
  lessonId: 'm301-5-4',
  title: 'Equations and Graphs of Trigonometric Functions, Part 2: When Does It Reach a Value?',
  thumbnailTitle: 'When Does It Reach a Value?',
  thumbnail: 'two',
  summary: 'Solving the Ferris wheel model h(t) = −20 cos(πt/30) + 22 for h = 30: cos(πt/30) = −0.4, the two angles 1.9823 and 2π − 1.9823 in one cycle, the times 18.93 s and 41.07 s, and 22.14 s above 30 m in each rotation, with a graph showing how many solutions to expect.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.4 · Part 2', title: 'When Does It Reach a Value?', subtitle: 'Solving a sinusoidal model for the time' }],
      lines: [
        { say: 'A model tells you the height at any time. But often the question is the other way round: when is the rider thirty metres up?', show: 'title' },
        { say: 'In this video, you will solve a sinusoidal model for the time, find both times in each cycle, and work out how long the rider stays above a height.' },
      ],
    },
    {
      chapter: 'Use the graph first',
      layout: 'split',
      leftWidth: 640,
      left: [
        figure('two', [
          g,
          plot(g, { id: 'curve', f: h, samples: 300 }),
          hline(g, { id: 'k', y: 30, tone: 'opp', dashed: false }),
          dots(g, [t1, t2, t1 + 60, t2 + 60].map((x, i) => ({ id: `p${i}`, x, y: 30, tone: 'theta' as const, group: i < 2 ? 'first' : 'second' }))),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h(t) = -20\\cos\\left(\\dfrac{\\pi}{30}t\\right) + 22', 'h(t) = 30'] }],
      lines: [
        { say: 'Here is the model from part one: h of t equals negative twenty cosine, pi over thirty t, plus 22. It gives the rider’s height in metres, t seconds after boarding.', show: ['two.grid', 'two.axes', 'two.curve', 'm.0'], focus: 'm.0' },
        { say: 'When is the rider thirty metres above the ground? Draw the line h equals thirty.', show: ['two.k', 'm.1'], focus: ['two.k', 'm.1'] },
        { say: 'It meets the curve twice in each rotation: once on the way up, and once on the way down.', show: ['two.first', 'two.second'], focus: ['two.first', 'two.second'] },
        { say: 'So in the first rotation, from zero to sixty seconds, expect two answers.', focus: 'two.first' },
      ],
    },
    {
      chapter: 'Solve for the angle',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['-20\\cos\\left(\\dfrac{\\pi}{30}t\\right) + 22 = 30', '\\cos\\left(\\dfrac{\\pi}{30}t\\right) = \\dfrac{30 - 22}{-20} = -0.4', '\\text{Let } \\theta = \\tfrac{\\pi}{30}t:\\quad \\theta = \\cos^{-1}(-0.4) \\approx 1.9823', '\\text{or}\\quad \\theta = 2\\pi - 1.9823 \\approx 4.3009'],
        },
      ],
      lines: [
        { say: 'Set the model equal to thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the cosine. Subtract 22 from both sides, then divide by negative twenty: cosine of pi over thirty t equals negative 0.4.', show: 'm.1', focus: 'm.1' },
        { say: 'Let theta stand for the angle, pi over thirty t. In radian mode, the inverse cosine of negative 0.4 is about 1.9823.', show: 'm.2', focus: 'm.2' },
        { say: 'But cosine has the same value at two angles in each cycle. The second one is two pi minus 1.9823, which is about 4.3009.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Solve for the time',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('one', [
          k,
          plot(k, { id: 'curve', f: h, samples: 200 }),
          hline(k, { id: 'k', y: 30, tone: 'opp', dashed: false }),
          plot(k, { id: 'above', f: h, from: t1, to: t2, tone: 'good', samples: 120 }),
          vline(k, { id: 'v1', x: t1, tone: 'theta', group: 'times' }),
          vline(k, { id: 'v2', x: t2, tone: 'theta', group: 'times' }),
          dots(k, [
            { id: 'A', x: t1, y: 30, tex: '18.93', tone: 'theta', place: 'above left', group: 'times' },
            { id: 'B', x: t2, y: 30, tex: '41.07', tone: 'theta', place: 'above right', group: 'times' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{\\pi}{30}t = \\theta \\;\\Rightarrow\\; t = \\dfrac{30\\theta}{\\pi}', 't \\approx 18.93 \\text{ s or } 41.07 \\text{ s}', '41.07 - 18.93 = 22.14 \\text{ s}'] }],
      lines: [
        { say: 'Now turn each angle back into a time. Theta is pi over thirty t, so t is thirty theta over pi.', show: ['one.grid', 'one.axes', 'one.curve', 'one.k', 'm.0'], focus: 'm.0' },
        { say: 'That gives t is about 18.93 seconds, or about 41.07 seconds: one on the way up, and one on the way down.', show: ['one.times', 'm.1'], focus: ['one.times', 'm.1'] },
        { say: 'Between those times, the graph is above the line, so the rider is higher than thirty metres. That lasts 41.07 minus 18.93: about 22.14 seconds.', show: ['one.above', 'm.2'], focus: ['one.above', 'm.2'] },
        { say: 'So the rider is thirty metres up at about 18.9 seconds and 41.1 seconds, and stays above thirty metres for about 22.1 seconds of each rotation.' },
      ],
    },
    {
      chapter: 'Only one time',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\cos:\\ \\theta \\text{ and } 2\\pi - \\theta \\qquad \\sin:\\ \\theta \\text{ and } \\pi - \\theta'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Only one time', md: 'The inverse cosine gives a single angle. The second angle in the same cycle, $2\\pi - \\theta$ for cosine or $\\pi - \\theta$ for sine, gives the second time.' },
      ],
      lines: [
        { say: 'A common mistake is to stop after one time. Your calculator’s inverse cosine gives only one angle.', show: 'oops' },
        { say: 'The second angle in the same cycle is two pi minus theta for cosine, or pi minus theta for sine. Use both, and the graph will show you whether you have them all.', show: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $h(t) = -20\\cos\\left(\\frac{\\pi}{30}t\\right) + 22$, when during the first rotation ($0 \\le t \\le 60$) is the rider $12$ m above the ground?',
          choices: ['$t = 10$ s only', '$t = 10$ s and $t = 20$ s', '$t = 20$ s and $t = 40$ s', '$t = 10$ s and $t = 50$ s'],
          answer: 3,
          working: '$\\cos\\left(\\frac{\\pi}{30}t\\right) = \\frac{12 - 22}{-20} = 0.5$, so $\\theta = \\frac{\\pi}{3}$ or $2\\pi - \\frac{\\pi}{3} = \\frac{5\\pi}{3}$. Then $t = \\frac{30\\theta}{\\pi}$ gives $t = 10$ or $t = 50$.',
        },
      ],
      lines: [
        { say: 'Your turn. For h of t equals negative twenty cosine, pi over thirty t, plus 22, when during the first rotation is the rider twelve metres above the ground? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Cosine of pi over thirty t equals twelve minus 22, over negative twenty, which is 0.5. So theta is pi over three, or two pi minus pi over three, which is five pi over three. Thirty theta over pi gives ten seconds and fifty seconds. B uses pi minus theta, which is the rule for sine, not cosine.', show: 'q.answer' },
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
          items: ['Set the model equal to the value, and isolate the sine or cosine.', 'Use both angles in the cycle: $2\\pi - \\theta$ for cosine, $\\pi - \\theta$ for sine.', 'Turn each angle into a time; the graph shows when the model is above or below the value.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. To find when a model reaches a value, set it equal to the value, and isolate the sine or cosine.', show: 'sum.0' },
        { say: 'Find both angles in the cycle: two pi minus theta for cosine, or pi minus theta for sine.', show: 'sum.1' },
        { say: 'Then turn each angle into a time. The graph shows when the model is above or below the value. In part three, we use a model of daylight in Edmonton, and find how many days are longer than fifteen hours. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
