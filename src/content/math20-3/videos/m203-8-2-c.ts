import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 12], y: [0, 260], xStep: 1, yStep: 20, every: 2, width: 7, height: 5, titles: { x: '\\text{time (h)}', y: '\\text{diesel in tank (L)}' } });
const DATA: [number, number][] = [0, 1, 2, 3, 4, 5].map((t) => [t, 240 - 20 * t]);

const video: Explainer = {
  id: 'm203-8-2-c',
  lessonId: 'm203-8-2',
  title: 'Line Graphs and Choosing a Graph, Part 3: Predicting from a Steady Trend',
  thumbnailTitle: 'Predicting from a Trend',
  thumbnail: 'ds',
  summary: 'Using a steady trend on a line graph to predict: a generator uses 20 L of diesel an hour, so 60 L are left after 9 hours and the tank is empty after 12, and why predictions far beyond the data are less reliable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.2 · Part 3', title: 'Predicting from a Trend', subtitle: 'Extend the pattern' }],
      lines: [
        { say: 'When the points of a line graph fall on a straight line, the quantity changes by the same amount every hour, week or month. That makes it easy to predict.', show: 'title' },
        { say: 'In this video, you will extend a steady trend to predict, and see when a prediction can be trusted.' },
      ],
    },
    {
      chapter: 'Diesel for a generator',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('ds', [
          g,
          polyline(g, { id: 'line', points: DATA, tone: 'brand' }),
          polyline(g, { id: 'ext', points: [[5, 140], [12, 0]], tone: 'brand', dashed: true }),
          dots(g, DATA.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'brand' }))),
          dots(g, [{ id: 'n9', x: 9, y: 60, tex: '(9,\\ 60)', tone: 'adj', place: 'left' }, { id: 'n12', x: 12, y: 0, tex: '(12,\\ 0)', tone: 'opp', place: 'above right' }]),
        ], 440),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['240 - 220 = 20 \\text{ L each hour}', '240 - 9 \\times 20 = 60 \\text{ L}', '240 \\div 20 = 12 \\text{ h}'] }],
      lines: [
        { say: 'A generator at a well site near Drayton Valley burns diesel at a steady rate. The graph shows the diesel left in its tank: 240 litres at the start.', show: ['ds.grid', 'ds.axes', 'ds.line', 'ds.p0', 'ds.p1', 'ds.p2', 'ds.p3', 'ds.p4', 'ds.p5'], focus: 'ds.p0' },
        { say: 'After one hour, 220 litres are left, so it uses twenty litres each hour. The points fall on a straight line, so the rate stays the same.', show: 'm.0', focus: ['ds.p1', 'm.0'] },
        { say: 'If the trend continues, how much will be left after nine hours? Nine hours use nine times twenty, 180 litres. 240 minus 180 is sixty litres.', show: ['ds.ext', 'ds.n9', 'm.1'], focus: ['ds.n9', 'm.1'] },
        { say: 'When will the tank be empty? 240 divided by twenty is twelve hours. The dashed line reaches zero at twelve hours.', show: ['ds.n12', 'm.2'], focus: ['ds.n12', 'm.2'] },
      ],
    },
    {
      chapter: 'Predictions and the trend',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Predictions are only as good as the trend', md: 'Extending a line assumes nothing changes. A generator that is turned down, or a calf that stops gaining weight, breaks the pattern. Predictions **close to the data** are more reliable than predictions far beyond it.' }],
      lines: [
        { say: 'Predictions are only as good as the trend. Extending a line assumes nothing changes.', show: 'tip' },
        { say: 'A generator that is turned down, or a calf that stops gaining weight, breaks the pattern. So a prediction for six hours, just past the data, is more reliable than one for twelve hours, far beyond it.' },
        { say: 'That is why a site supervisor would refuel long before the predicted twelve hours, rather than wait for the tank to run dry.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, a line graph shows a calf’s mass rising steadily from $250$ kg, by $1.2$ kg a day. If the trend continues, what will its mass be after $30$ days?',
          choices: ['$286$ kg', '$280$ kg', '$36$ kg', '$322$ kg'],
          answer: 0,
          working: '$30 \\times 1.2 = 36$ kg gained, and $250 + 36 = 286$ kg. B adds $30$ instead of $30 \\times 1.2$, and C is only the gain.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, a line graph shows a calf’s mass rising steadily from 250 kilograms, by 1.2 kilograms a day. If the trend continues, what will its mass be after thirty days? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. In thirty days, the calf gains thirty times 1.2, which is 36 kilograms, so its mass is 250 plus 36: 286 kilograms. B adds thirty instead, and C is only the gain.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A straight-line trend changes by the same amount each period.', 'Predict: start value ± rate × time.', 'Predictions close to the data are more reliable.'] }],
      lines: [
        { say: 'Let’s sum up. When the points fall on a straight line, the quantity changes by the same amount each period.', show: 'sum.0' },
        { say: 'To predict, start from the first value, and add or subtract the rate times the time.', show: 'sum.1' },
        { say: 'And predictions close to the data are more reliable than ones far beyond it. In part four, we choose the best graph for the data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
