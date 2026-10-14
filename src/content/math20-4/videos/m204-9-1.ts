import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [0, 200], xStep: 1, yStep: 20, width: 7, height: 5, titles: { x: '\\text{week}', y: '\\text{iced coffees sold}' } });
const sales: [number, number][] = [[1, 60], [2, 80], [3, 110], [4, 140], [5, 150], [6, 130], [7, 100], [8, 90]];

const video: Explainer = {
  id: 'm204-9-1',
  lessonId: 'm204-9-1',
  title: 'Data Displays, Part 1: Line Graphs',
  thumbnailTitle: 'Line Graphs',
  thumbnail: 'lg',
  summary: 'What a line graph shows, reading points on the grid (including halfway between lines), and finding a change in weekly iced coffee sales from week 2 (80) to week 5 (150): up 70 a week.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.1 · Part 1', title: 'Line Graphs', subtitle: 'Change over time' }],
      lines: [
        { say: 'Managers, landlords and banks all use graphs. A line graph shows whether sales are going up. A circle graph shows where your paycheque goes.', show: 'title' },
        { say: 'In this video, you will read a line graph, and find a change from it.' },
      ],
    },
    {
      chapter: 'A line graph',
      layout: 'split',
      leftWidth: 680,
      left: [figure('lg', [g, polyline(g, { id: 'line', points: sales, tone: 'brand' }), dots(g, sales.map(([x, y]) => ({ id: `w${x}`, x, y, tone: 'adj', group: 'pts' })))], 500)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Line graph', md: 'A **line graph** shows how something changes over time. Each point is one value. Time goes along the bottom, and the line joins the points so you can see the trend.' }],
      lines: [
        { say: 'A line graph shows how something changes over time. Each point is one value, and time goes along the bottom.', show: ['lg.grid', 'lg.axes', 'lg.pts', 'def'] },
        { say: 'The line joins the points, so you can see the trend. This graph shows the iced coffees a café sold each week of the summer.', show: 'lg.line', focus: 'lg.line' },
        { say: 'Sales climb for the first five weeks, then fall as summer ends. That is the story of the graph at a glance.' },
      ],
    },
    {
      chapter: 'Reading a change',
      layout: 'split',
      leftWidth: 760,
      left: [
        figure('lg', [
          g,
          polyline(g, { id: 'line', points: sales, tone: 'brand' }),
          dots(g, sales.map(([x, y]) => ({ id: `w${x}`, x, y, tone: 'adj', group: 'pts' }))),
          polyline(g, { id: 'r2', points: [[2, 0], [2, 80], [0, 80]], tone: 'opp', dashed: true }),
          polyline(g, { id: 'r5', points: [[5, 0], [5, 150], [0, 150]], tone: 'opp', dashed: true }),
        ], 500),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{week 2: } 80', '\\text{week 5: } 150', '150 - 80 = 70'] }],
      lines: [
        { say: 'By how much did weekly sales go up from week two to week five? The grid lines go up by twenty.', show: ['lg.grid', 'lg.axes', 'lg.line', 'lg.pts'] },
        { say: 'Go straight up from week two to the point, then straight across to the scale. The point is on the 80 line.', show: ['lg.r2', 'm.0'], focus: ['lg.r2', 'm.0'] },
        { say: 'Now week five. The point is halfway between the 140 line and the 160 line. Halfway between them is 150.', show: ['lg.r5', 'm.1'], focus: ['lg.r5', 'm.1'] },
        { say: 'The change is 150 minus 80: seventy. Sales went up by seventy iced coffees a week.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Straight up, straight across',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the wrong point', md: 'Go **straight up** from the time on the bottom axis to the point, then **straight across** to the scale. Use a ruler or the edge of a card if it helps.' }],
      lines: [
        { say: 'A common mistake is to read the wrong point, or to drift up or down while reading across. Go straight up from the time on the bottom axis to the point, then straight across to the scale. Use a ruler or the edge of a card if it helps.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a line graph, the grid lines go up by $20$. A point is halfway between the $60$ line and the $80$ line. What value does it show?',
          choices: ['$70$', '$65$', '$75$', '$60$'],
          answer: 0,
          working: 'Halfway between $60$ and $80$ is $(60 + 80) \\div 2 = 70$. D reads the line below.',
        },
      ],
      lines: [
        { say: 'Your turn. On a line graph, the grid lines go up by twenty. A point is halfway between the sixty line and the eighty line. What value does it show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Halfway between sixty and eighty is seventy: sixty plus eighty is 140, and half of that is seventy. D reads the line below the point.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line graph shows change over time.', 'Go straight up from the time, then straight across.', 'Change = later value − earlier value.'] }],
      lines: [
        { say: 'Let’s sum up. A line graph shows how something changes over time.', show: 'sum.0' },
        { say: 'To read a point, go straight up from the time, then straight across to the scale.', show: 'sum.1' },
        { say: 'And the change is the later value minus the earlier one. In part two, we turn circle graph percents into dollars. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
