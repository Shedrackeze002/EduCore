import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 5], y: [0, 40], xStep: 0.5, yStep: 5, every: 2, width: 7, height: 5, titles: { x: 't\\text{ (h)}', y: 'd\\text{ (km)}' } });

const video: Explainer = {
  id: 'm202-8-1-c',
  lessonId: 'm202-8-1',
  title: 'Comparing and Interpreting Rates, Part 3: Rates That Change',
  thumbnailTitle: 'Rates That Change',
  thumbnail: 'rd',
  summary: 'Reading a graph made of segments with different slopes: steeper means faster, horizontal means stopped, and downward means decreasing, with the four parts of Mei’s bike ride at 15, 0, 20 and −17.5 km/h.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.1 · Part 3', title: 'Rates That Change', subtitle: 'Reading a graph in segments' }],
      lines: [
        { say: 'Real trips are not steady. You speed up, stop, and turn around. When a rate changes, the graph is made of segments with different slopes.', show: 'title' },
        { say: 'In this video, you will read each segment of a graph as a rate, and describe what is happening.' },
      ],
    },
    {
      chapter: 'Steep, flat and falling',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A **steeper** segment shows a **greater** rate.', 'A **horizontal** segment shows a rate of $0$: nothing is changing.', 'A segment that goes **down** shows a negative rate: the quantity is decreasing.'] }],
      lines: [
        { say: 'On a graph made of segments, each segment has its own slope, and so its own rate. A steeper segment shows a greater rate.', show: 'b.0' },
        { say: 'A horizontal segment has a slope of zero, so nothing is changing.', show: 'b.1' },
        { say: 'And a segment that goes down has a negative slope, so the quantity is decreasing.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A bike ride',
      layout: 'split',
      leftWidth: 580,
      left: [figure('rd', [g, polyline(g, { id: 'ride', points: [[0, 0], [1, 15], [1.5, 15], [2.5, 35], [4.5, 0]], tone: 'brand', labels: ['A', 'B', 'C', 'D'] })], 400)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A:\\ \\dfrac{15}{1} = 15 \\text{ km/h}', 'B:\\ 0 \\text{ km/h}', 'C:\\ \\dfrac{35 - 15}{1} = 20 \\text{ km/h}', 'D:\\ \\dfrac{0 - 35}{2} = -17.5 \\text{ km/h}'] }],
      lines: [
        { say: 'The graph shows Mei’s distance from home on a bike ride. In segment "A", she rides fifteen kilometres in one hour: fifteen kilometres per hour, away from home.', show: ['rd.grid', 'rd.axes', 'rd.ride-0', 'm.0'], focus: ['rd.ride-0', 'm.0'] },
        { say: 'Segment B is horizontal, so the rate is zero. Mei is stopped, maybe for a snack.', show: ['rd.ride-1', 'm.1'], focus: ['rd.ride-1', 'm.1'] },
        { say: 'In segment C, she goes from fifteen to thirty-five kilometres in one hour: twenty kilometres per hour. It is the steepest segment, so this is her fastest part.', show: ['rd.ride-2', 'm.2'], focus: ['rd.ride-2', 'm.2'] },
        { say: 'Segment D goes down, from thirty-five kilometres to zero in two hours: negative 17.5 kilometres per hour. The negative sign means her distance from home is decreasing: she rides home at 17.5 kilometres per hour.', show: ['rd.ride-3', 'm.3'], focus: ['rd.ride-3', 'm.3'] },
      ],
    },
    {
      chapter: 'Reading the whole trip',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{farthest from home: } 35 \\text{ km, after } 2.5 \\text{ h}', '\\text{total distance ridden: } 35 + 35 = 70 \\text{ km}', '\\text{average speed: } 70 \\div 4.5 \\approx 15.6 \\text{ km/h}'] }],
      lines: [
        { say: 'The graph answers other questions too. Mei is farthest from home, thirty-five kilometres, after 2.5 hours, at the top of the graph.', show: 'm.0', focus: 'm.0' },
        { say: 'She rides thirty-five kilometres out and thirty-five back, so seventy kilometres in all.', show: 'm.1', focus: 'm.1' },
        { say: 'Her average speed for the whole trip, including the stop, is seventy divided by 4.5 hours, about 15.6 kilometres per hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a graph of water in a tank against time, one segment is horizontal and another goes down steeply. What do they show?',
          choices: ['Horizontal: no change. Steep and down: draining quickly.', 'Horizontal: filling quickly. Steep and down: no change.', 'Both show the tank filling.', 'Horizontal: draining. Steep and down: filling.'],
          answer: 0,
          working: 'A horizontal segment has a rate of $0$, and a steep downward segment has a large negative rate: the amount of water drops quickly.',
        },
      ],
      lines: [
        { say: 'Your turn. On a graph of the water in a tank against time, one segment is horizontal, and another goes down steeply. What do they show? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The horizontal segment has a rate of zero, so the amount does not change. The steep downward segment has a large negative rate, so the tank is draining quickly.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each segment’s slope is its rate.', 'Steeper: faster. Horizontal: zero. Downward: decreasing.', 'Read the whole graph for totals and averages.'] }],
      lines: [
        { say: 'Let’s sum up. On a graph made of segments, each segment’s slope is its rate.', show: 'sum.0' },
        { say: 'Steeper means faster, horizontal means zero, and downward means decreasing.', show: 'sum.1' },
        { say: 'And the whole graph gives totals and averages. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
