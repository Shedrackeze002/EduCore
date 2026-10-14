import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const DATA: [number, number][] = [[6, 14], [8, 16], [10, 20], [12, 24], [14, 28], [16, 26], [18, 22]];
const temps = (name: string) => {
  const g = plane({ x: [4, 18], y: [0, 32], xStep: 2, yStep: 4, every: 1, width: 7, height: 5, titles: { x: '\\text{time of day (h)}', y: '\\text{temperature } (^\\circ\\text{C})' } });
  return figure(name, [g, polyline(g, { id: 'line', points: DATA, tone: 'brand' }), dots(g, DATA.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'brand' })))], 480);
};
const graph = (n: string) => [`${n}.grid`, `${n}.axes`, `${n}.line`, ...DATA.map((_, i) => `${n}.p${i}`)];

const video: Explainer = {
  id: 'm203-8-2',
  lessonId: 'm203-8-2',
  title: 'Line Graphs and Choosing a Graph, Part 1: Reading a Line Graph',
  thumbnailTitle: 'Reading Line Graphs',
  thumbnail: 'lg',
  summary: 'What a line graph and its trend are, reading the temperature on a summer day in Lethbridge from a line graph (20°C at 10:00, a high of 28°C at 14:00), reading a point between grid lines, and describing a trend.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.2 · Part 1', title: 'Reading a Line Graph', subtitle: 'Change over time' }],
      lines: [
        { say: 'A rancher watches the water in a dugout drop through a dry summer, and a site supervisor watches the diesel in a generator go down hour by hour. A line graph shows changes like these at a glance.', show: 'title' },
        { say: 'In this video, you will read values from a line graph, and describe its trend.' },
      ],
    },
    {
      chapter: 'Line graphs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Line graph', md: 'Shows how one quantity **changes over time**. Time goes along the bottom axis. Each point is one measurement, and the line joins the points in order.' },
        { kind: 'callout', id: 'def2', tone: 'definition', title: 'Trend', md: 'The general **direction** of the line: going up, going down, staying about the same, or changing direction.' },
      ],
      lines: [
        { say: 'A line graph shows how one quantity changes over time. Time goes along the bottom axis. Each point is one measurement, and the line joins the points in order.', show: 'def' },
        { say: 'The trend is the general direction of the line: going up, going down, staying about the same, or changing direction.', show: 'def2' },
      ],
    },
    {
      chapter: 'Reading a value',
      layout: 'split',
      leftWidth: 700,
      left: [temps('rv')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10 \\text{ h: } 20^\\circ\\text{C}', '14 \\text{ h: } 28^\\circ\\text{C (high)}', '16 \\text{ h: } 26^\\circ\\text{C}'] }],
      lines: [
        { say: 'This line graph shows the temperature in Lethbridge on a summer day. The times use the 24-hour clock, so fourteen means 2 p.m. The grid lines go up by four degrees.', show: graph('rv') },
        { say: 'What was the temperature at 10 a.m.? Find ten on the bottom axis, go straight up to the point, then straight across to the scale.', focus: 'rv.p2' },
        { say: 'The point is on the twenty line, so it was twenty degrees.', show: 'm.0', focus: ['rv.p2', 'm.0'] },
        { say: 'The highest point is at fourteen, 2 p.m., on the 28 line: a high of 28 degrees.', show: 'm.1', focus: ['rv.p4', 'm.1'] },
        { say: 'At sixteen, 4 p.m., the point is halfway between the 24 and 28 lines, so it shows 26 degrees.', show: 'm.2', focus: ['rv.p5', 'm.2'] },
      ],
    },
    {
      chapter: 'Describing the trend',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Describing a trend', md: 'Say which way the line goes, **when** it changes direction, and the highest or lowest value.' },
        { kind: 'text', id: 't', md: 'The temperature went **up** from 6:00 to a high of $28^\\circ\\text{C}$ at 14:00, then went **down** until 18:00.', size: 'md' },
      ],
      lines: [
        { say: 'To describe a trend, say which way the line goes, when it changes direction, and the highest or lowest value.', show: 'key' },
        { say: 'From 6 a.m. to 2 p.m., the line goes up, to a high of 28 degrees. After 2 p.m., it goes down. So the temperature rose until mid-afternoon, then fell into the evening.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Month', 'May', 'June', 'July', 'August', 'September'], rows: [['Water depth (cm)', '$240$', '$220$', '$180$', '$150$', '$160$']] },
        {
          kind: 'try',
          id: 'q',
          prompt: 'The table gives the points of a line graph of the water in a dugout. Which describes the trend?',
          choices: ['down from May to August, then up in September', 'down the whole time', 'up from May to August, then down', 'about the same the whole time'],
          answer: 0,
          working: 'The depth falls from $240$ to $150$ cm by August, then rises to $160$ cm in September. B misses the change of direction.',
        },
      ],
      lines: [
        { say: 'Your turn. The table gives the points of a line graph of the water in a dugout. Which describes the trend? Pause the video and try it.', show: ['t', 'q'], wait: 6 },
        { say: 'The answer is A. The depth falls from 240 centimetres to 150 by August, then rises to 160 in September. B misses the change of direction at the end.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A line graph shows change over time.', 'Read a value: up from the time, across to the scale.', 'The trend is the general direction, and where it changes.'] }],
      lines: [
        { say: 'Let’s sum up. A line graph shows how a quantity changes over time.', show: 'sum.0' },
        { say: 'To read a value, go up from the time to the point, then across to the scale.', show: 'sum.1' },
        { say: 'And the trend is the general direction of the line, and where it changes. In part two, we find how fast it changes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
