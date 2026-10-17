import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { hline, note } from './lib/m301-5-graphs.ts';

const PI = Math.PI;
const L = (t: number) => 4.9 * Math.sin(((2 * PI) / 365) * (t - 80)) + 12.2;
const s = Math.asin((15 - 12.2) / 4.9);
const [d1, d2] = [80 + (365 * s) / (2 * PI), 80 + (365 * (PI - s)) / (2 * PI)];

/** The x-axis is named at its right-hand end ("t (day)"), where it has room, instead of below its numbers. */
const g0 = plane({ x: [0, 365], y: [0, 20], xStep: 50, yStep: 2, every: 2, width: 10, height: 4, titles: { y: 'L\\text{ (hours)}' } });
const g = { ...g0, items: g0.items.filter((i) => i.id !== 'x-name') };
const tName = note(g, { id: 't-name', x: 365, y: 0, tex: 't\\text{ (day)}', place: 'right', group: 'axes' });

const video: Explainer = {
  id: 'm301-5-4-c',
  lessonId: 'm301-5-4',
  title: 'Equations and Graphs of Trigonometric Functions, Part 3: Daylight in Edmonton',
  thumbnailTitle: 'Daylight in Edmonton',
  thumbnail: 'dl',
  summary: 'A sinusoidal model of the hours of daylight in Edmonton, L(t) = 4.9 sin(2π/365 (t − 80)) + 12.2: its period, midline, amplitude and start, an estimate of 9.4 hours on February 14 (day 45), and solving L(t) = 15 to find about 112 days with more than 15 hours of daylight, checked with a graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 5.4 · Part 3', title: 'Daylight in Edmonton', subtitle: 'Reading, evaluating and solving a model' }],
      lines: [
        { say: 'In Edmonton, summer days are long and winter days are short, and the pattern repeats every year.', show: 'title' },
        { say: 'In this video, you will read a sinusoidal model of daylight, estimate the daylight on one day, and find how many days have more than fifteen hours.' },
      ],
    },
    {
      chapter: 'The model',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['L(t) = 4.9\\sin\\left(\\dfrac{2\\pi}{365}(t - 80)\\right) + 12.2'] },
        figure(
          'dl',
          [
            g,
            tName,
            hline(g, { id: 'mid', y: 12.2, tone: 'adj' }),
            plot(g, { id: 'curve', f: L, samples: 300 }),
            dots(g, [
              { id: 'S', x: 80, y: 12.2, tex: '80', tone: 'theta', place: 'below right' },
              { id: 'M', x: 171.25, y: 17.1, tex: '17.1', tone: 'theta', place: 'above' },
              { id: 'N', x: 353.75, y: 7.3, tex: '7.3', tone: 'theta', place: 'below' },
            ]),
          ],
          380,
        ),
      ],
      lines: [
        { say: 'A model for the hours of daylight in Edmonton, on day t of the year, is L of t equals 4.9 sine, two pi over 365, times t minus 80, plus 12.2.', show: ['m', 'dl.grid', 'dl.axes', 'dl.curve'] },
        { say: 'b is two pi over 365, so the period is two pi divided by two pi over 365, which is 365 days. One cycle every year.' },
        { say: 'The midline is 12.2 hours, and the amplitude is 4.9 hours.', show: 'dl.mid', focus: 'dl.mid' },
        { say: 'And c is 80. A sine function starts its cycle on the midline, going up, so this cycle starts on day 80: about March twenty-first, when day and night are nearly equal.', show: 'dl.S', focus: 'dl.S' },
        { say: 'The model’s maximum is 12.2 plus 4.9: 17.1 hours, a quarter of a year later, on day 171. Its minimum is 12.2 minus 4.9: 7.3 hours, in December.', show: ['dl.M', 'dl.N'], focus: ['dl.M', 'dl.N'] },
      ],
    },
    {
      chapter: 'A winter day',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['L(45) = 4.9\\sin\\left(\\dfrac{2\\pi}{365}(45 - 80)\\right) + 12.2', '= 4.9\\sin(-0.6025) + 12.2', '\\approx 4.9(-0.5668) + 12.2 \\approx 9.42'] },
      ],
      lines: [
        { say: 'Use the model to estimate the hours of daylight on February fourteenth, which is day 45.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute 45 for t. 45 minus 80 is negative 35, and two pi over 365, times negative 35, is about negative 0.6025 radians.', show: 'm.1', focus: 'm.1' },
        { say: 'In radian mode, the sine of negative 0.6025 is about negative 0.5668. Times 4.9, that is about negative 2.78, and adding 12.2 gives about 9.42.', show: 'm.2', focus: 'm.2' },
        { say: 'So the model estimates about 9.4 hours of daylight on February fourteenth.' },
      ],
    },
    {
      chapter: 'Long days',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'L(t) = 15',
            '\\sin\\left(\\dfrac{2\\pi}{365}(t - 80)\\right) = \\dfrac{15 - 12.2}{4.9} \\approx 0.5714',
            '\\theta \\approx 0.6082 \\quad \\text{or} \\quad \\theta \\approx \\pi - 0.6082 \\approx 2.5333',
            't = 80 + \\dfrac{365\\theta}{2\\pi}:\\quad t \\approx 115.3 \\ \\text{ or } \\ t \\approx 227.2',
            '227.2 - 115.3 \\approx 112 \\text{ days}',
          ],
        },
      ],
      lines: [
        { say: 'For how many days of the year does the model give more than fifteen hours of daylight? Start by solving L of t equals fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract 12.2, and divide by 4.9. The sine of the angle is 2.8 over 4.9, which is about 0.5714.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse sine gives one angle, about 0.6082. For sine, the second angle in the cycle is pi minus that: about 2.5333.', show: 'm.2', focus: 'm.2' },
        { say: 'Now solve for t. The angle is two pi over 365, times t minus 80, so t is 80 plus 365 theta over two pi. That gives t is about 115.3, or about 227.2.', show: 'm.3', focus: 'm.3' },
        { say: 'Daylight is above fifteen hours between those days: 227.2 minus 115.3, which is about 112 days.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check with a graph',
      layout: 'center',
      main: [
        figure(
          'ck',
          [
            g,
            tName,
            plot(g, { id: 'curve', f: L, samples: 300 }),
            hline(g, { id: 'k', y: 15, tone: 'opp', dashed: false }),
            plot(g, { id: 'above', f: L, from: d1, to: d2, tone: 'good', samples: 120 }),
            dots(g, [
              { id: 'A', x: d1, y: 15, tex: '115.3', tone: 'theta', place: 'above left' },
              { id: 'B', x: d2, y: 15, tex: '227.2', tone: 'theta', place: 'above right' },
            ]),
          ],
          370,
        ),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with a graph', md: 'Graph the model and the line $y = k$ on a graphing calculator. The intersection points confirm your algebra and show whether the function is above or below $k$ between them.' },
      ],
      lines: [
        { say: 'A graph confirms the algebra. The line L equals fifteen meets the curve at about day 115 and day 227.', show: ['ck.grid', 'ck.axes', 'ck.curve', 'ck.k', 'ck.A', 'ck.B'], focus: ['ck.A', 'ck.B'] },
        { say: 'Between them, the curve is above the line, so those are the days with more than fifteen hours of daylight.', show: 'ck.above', focus: 'ck.above' },
        { say: 'On a graphing calculator, graph the model and the line y equals k. The intersection points confirm your algebra, and show whether the function is above or below k between them.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $L(t) = 4.9\\sin\\left(\\frac{2\\pi}{365}(t - 80)\\right) + 12.2$ to estimate the hours of daylight on day $200$.',
          choices: ['$12.4$ hours', '$16.5$ hours', '$7.9$ hours', '$17.1$ hours'],
          answer: 1,
          working: '$\\frac{2\\pi}{365}(200 - 80) \\approx 2.0657$, and $\\sin 2.0657 \\approx 0.8803$ in radian mode, so $L(200) \\approx 4.9(0.8803) + 12.2 \\approx 16.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the model L of t equals 4.9 sine, two pi over 365, times t minus 80, plus 12.2, to estimate the hours of daylight on day 200. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. 200 minus 80 is 120, and two pi over 365, times 120, is about 2.0657 radians. Its sine is about 0.8803, so L is 4.9 times 0.8803, plus 12.2: about 16.5 hours. A comes from degree mode.', show: 'q.answer' },
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
          items: ['Read the period, midline, amplitude and start of the cycle from the model.', 'Evaluate the model in radian mode.', 'To find when a value is reached, solve for the angle, use both angles in the cycle, then solve for $t$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. You can read the period, the midline, the amplitude and the start of the cycle straight from the model.', show: 'sum.0' },
        { say: 'Evaluate the model in radian mode.', show: 'sum.1' },
        { say: 'And to find when a value is reached, solve for the angle, use both angles in the cycle, then solve for t. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
