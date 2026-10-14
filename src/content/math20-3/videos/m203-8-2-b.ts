import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const DATA: [number, number][] = [[6, 14], [8, 16], [10, 20], [12, 24], [14, 28], [16, 26], [18, 22]];
const temps = (name: string) => {
  const g = plane({ x: [4, 18], y: [0, 32], xStep: 2, yStep: 4, every: 1, width: 7, height: 5, titles: { x: '\\text{time of day (h)}', y: '\\text{temperature } (^\\circ\\text{C})' } });
  return figure(name, [g, polyline(g, { id: 'line', points: DATA, tone: 'brand' }), dots(g, DATA.map(([x, y], i) => ({ id: `p${i}`, x, y, tone: 'brand' })))], 440);
};
const graph = (n: string) => [`${n}.grid`, `${n}.axes`, `${n}.line`, ...DATA.map((_, i) => `${n}.p${i}`)];

const video: Explainer = {
  id: 'm203-8-2-b',
  lessonId: 'm203-8-2',
  title: 'Line Graphs and Choosing a Graph, Part 2: Rate of Change on a Line Graph',
  thumbnailTitle: 'Rate of Change on a Line Graph',
  thumbnail: 'rc',
  summary: 'The rate of change between two points of a line graph: the temperature rose 2°C per hour from 8:00 to 14:00 and fell 1.5°C per hour after, why you divide by the time and not the number of points, and steeper means faster.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.2 · Part 2', title: 'Rate of Change', subtitle: 'How fast is it changing?' }],
      lines: [
        { say: 'The steeper a line graph, the faster the quantity is changing. A rate of change puts a number on how fast.', show: 'title' },
        { say: 'In this video, you will find the rate of change between two points on a line graph.' },
      ],
    },
    {
      chapter: 'How fast did it warm up?',
      layout: 'split',
      leftWidth: 620,
      left: [temps('rc')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{rate} = \\dfrac{\\text{change in value}}{\\text{change in time}}', '28 - 16 = 12^\\circ\\text{C}', '14 - 8 = 6 \\text{ h}', '12 \\div 6 = 2^\\circ\\text{C per hour}'] }],
      lines: [
        { say: 'The rate of change between two points is the change in the value, divided by the change in time.', show: [...graph('rc'), 'm.0'], focus: 'm.0' },
        { say: 'At what average rate did the temperature rise from 8 a.m. to 2 p.m.? At eight, it was sixteen degrees. At fourteen, it was 28.', focus: ['rc.p1', 'rc.p4'] },
        { say: 'The change in temperature is 28 minus sixteen: twelve degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'The change in time is fourteen minus eight: six hours.', show: 'm.2', focus: 'm.2' },
        { say: 'Twelve divided by six is two. The temperature rose at an average of two degrees per hour.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Counting points instead of time',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting points instead of time', md: 'From 8:00 to 14:00 there are $3$ steps between points, but $6$ hours. Divide by the **time**, read from the bottom axis, not by the number of steps.' }],
      lines: [
        { say: 'A common mistake is to count the steps between points. From 8 a.m. to 2 p.m., there are three steps between points, but six hours. Divide by the time, read from the bottom axis, not by the number of steps.', show: 'oops' },
      ],
    },
    {
      chapter: 'Cooling down',
      layout: 'split',
      leftWidth: 620,
      left: [temps('cd')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{22 - 28}{18 - 14} = \\dfrac{-6}{4}', '= -1.5^\\circ\\text{C per hour}'] }],
      lines: [
        { say: 'After 2 p.m., the line goes down. From fourteen to eighteen, the temperature went from 28 degrees to 22.', show: graph('cd'), focus: ['cd.p4', 'cd.p6'] },
        { say: 'The change in temperature is 22 minus 28, negative six degrees, over four hours.', show: 'm.0', focus: 'm.0' },
        { say: 'So the rate is negative 1.5 degrees per hour. A negative rate means the quantity is going down.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Steeper means faster',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6 \\text{ to } 8\\text{: } \\dfrac{16 - 14}{2} = 1^\\circ\\text{C per hour}', '10 \\text{ to } 12\\text{: } \\dfrac{24 - 20}{2} = 2^\\circ\\text{C per hour}'] }],
      lines: [
        { say: 'Compare two pieces of the line. From six to eight, the temperature rose two degrees in two hours: one degree per hour.', show: 'm.0', focus: 'm.0' },
        { say: 'From ten to twelve, it rose four degrees in two hours: two degrees per hour. That piece of the line is steeper, because the temperature was changing faster.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a line graph, the water in a dugout is $240$ cm deep on June 1 and $180$ cm deep on August 1. What is the average rate of change?',
          choices: ['$-30$ cm per month', '$-60$ cm per month', '$30$ cm per month', '$-20$ cm per month'],
          answer: 0,
          working: 'Change in depth: $180 - 240 = -60$ cm, over $2$ months, so $-60 \\div 2 = -30$ cm per month. B forgets to divide by the time.',
        },
      ],
      lines: [
        { say: 'Your turn. On a line graph, the water in a dugout is 240 centimetres deep on June first, and 180 centimetres deep on August first. What is the average rate of change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The depth changes by 180 minus 240, negative sixty centimetres, over two months. That is negative thirty centimetres per month. B forgets to divide by the time.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate of change = change in value ÷ change in time.', 'Read the time from the axis, not the number of points.', 'A negative rate means going down; steeper means faster.'] }],
      lines: [
        { say: 'Let’s sum up. The rate of change is the change in value, divided by the change in time.', show: 'sum.0' },
        { say: 'Read the time from the axis, not from the number of points.', show: 'sum.1' },
        { say: 'And a negative rate means the quantity is going down, while a steeper line means a faster change. In part three, we use a steady trend to predict. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
