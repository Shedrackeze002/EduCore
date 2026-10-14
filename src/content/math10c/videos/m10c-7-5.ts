import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

/** Three small scatterplots side by side: positive, negative and no correlation. */
const up: [number, number][] = [[0.5, 1], [1, 1.8], [1.5, 1.2], [2, 2.5], [2.5, 2.1], [3, 3.4], [3.5, 2.9], [4, 4.1], [4.5, 3.7], [5, 4.9], [5.5, 5.2]];
const none: [number, number][] = [[0.6, 4.5], [1.2, 1.5], [1.8, 3.2], [2.3, 5.1], [2.9, 0.9], [3.4, 2.6], [3.9, 4.4], [4.4, 1.8], [4.9, 3.6], [5.4, 5.3], [5.6, 2.2]];
const sets: [string, string, [number, number][], number][] = [
  ['p', '\\text{positive}', up, 0],
  ['n', '\\text{negative}', up.map(([x, y]) => [x, 6 - y]), 8],
  ['z', '\\text{none}', none, 16],
];
const corr: Part[] = sets.flatMap(([name, title, pts, at]) => {
  const g = plane({ name, x: [0, 6], y: [0, 6], every: 0, at: [at, 0] });
  const label: Part = { points: { [`${name}-tt`]: [at + 3, -0.6] }, items: [{ kind: 'label', id: `${name}-title`, at: `${name}-tt`, tex: title, place: 'below', group: name }] };
  const marks = dots(g, pts.map(([x, y], i) => ({ id: `d${i}`, x, y, group: 'pts' })));
  return [g, marks, label];
});

const g = plane({ x: [0, 10], y: [0, 12], every: 2 });
const data: [number, number][] = [[1, 3], [2, 3.5], [3, 5.5], [4, 6], [5, 6.5], [6, 8.5], [7, 9], [8, 9.5]];

const video: Explainer = {
  id: 'm10c-7-5',
  lessonId: 'm10c-7-5',
  title: 'Lines of Best Fit, Part 1: Scatterplots and Trends',
  thumbnailTitle: 'Scatterplots and Lines of Best Fit',
  thumbnail: 'fit',
  summary: 'Scatterplots of paired data, positive, negative and no correlation, and drawing a line of best fit that follows the trend with points balanced above and below. Part 2 writes its equation and makes predictions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.5 · Part 1', title: 'Scatterplots and Trends', subtitle: 'Lines of best fit' }],
      lines: [
        { say: 'Real data is messy: the points rarely lie exactly on a line. But if they follow a straight-line trend, a line of best fit captures the pattern.', show: 'title' },
        { say: 'In this video, you will describe the trend in a scatterplot, and draw a line of best fit. In part two, you will use it to make predictions.' },
      ],
    },
    {
      chapter: 'Correlation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scatterplot', md: 'A graph of paired data points that shows whether two variables are related.' },
        figure('corr', corr),
      ],
      lines: [
        { say: 'A scatterplot is a graph of paired data. It shows whether two variables are related.', show: 'def' },
        { say: 'When y tends to increase as x increases, the correlation is positive, like hours of study and test scores.', show: ['corr.p-grid', 'corr.p-axes', 'corr.p-pts', 'corr.p'], focus: 'corr.p-pts' },
        { say: 'When y tends to decrease as x increases, the correlation is negative, like the age of a car and its value.', show: ['corr.n-grid', 'corr.n-axes', 'corr.n-pts', 'corr.n'], focus: 'corr.n-pts' },
        { say: 'And when there is no clear pattern, there is no correlation, like shoe size and test scores.', show: ['corr.z-grid', 'corr.z-axes', 'corr.z-pts', 'corr.z'], focus: 'corr.z-pts' },
      ],
    },
    {
      chapter: 'A line of best fit',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('fit', [
          g,
          plot(g, { id: 'line', f: (x) => x + 2, tone: 'opp' }),
          dots(g, data.map(([x, y], i) => ({ id: `d${i}`, x, y, group: 'pts' }))),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['It follows the direction of the data.', 'It has about as many points above it as below it.', 'It does not have to pass through any data point.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not join-the-dots', md: 'Do not join the first and last points. Fit the overall trend.' },
      ],
      lines: [
        { say: 'These points follow a straight-line trend.', show: ['fit.grid', 'fit.axes', 'fit.pts'] },
        { say: 'A line of best fit follows the direction of the data.', show: ['fit.line', 'b.0'], focus: 'fit.line' },
        { say: 'It has roughly as many points above it as below it.', show: 'b.1', focus: 'fit.pts' },
        { say: 'And it does not have to pass through any data point. Technology can find the best line exactly; this is called linear regression. By hand, lay a ruler along the trend, and adjust it until the points are balanced.', show: 'b.2' },
        { say: 'So do not just join the first and last points. Fit the overall trend.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'As the outside temperature rises, sales of hot chocolate tend to fall. What kind of correlation is this?',
          choices: ['Negative', 'Positive', 'No correlation', 'It cannot be linear'],
          answer: 0,
          working: 'As one variable increases, the other tends to decrease: a negative correlation.',
        },
      ],
      lines: [
        { say: 'Your turn. As the outside temperature rises, sales of hot chocolate tend to fall. What kind of correlation is this? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. As the temperature increases, the sales tend to decrease, so the correlation is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Scatterplots show positive, negative or no correlation.', 'A line of best fit follows the trend.', 'Points are balanced above and below it.'] }],
      lines: [
        { say: 'Let’s sum up. A scatterplot shows positive, negative, or no correlation.', show: 'sum.0' },
        { say: 'A line of best fit follows the trend of the data.', show: 'sum.1' },
        { say: 'And the points are balanced above and below it. In part two, we write its equation, and make predictions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
