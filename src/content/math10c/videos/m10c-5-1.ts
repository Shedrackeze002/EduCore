import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

/** Nadia's walk: distance from home over 40 minutes, in four segments A to D. */
const walk = (id: string, height?: number) => {
  const g = plane({ x: [0, 40], y: [0, 1500], xStep: 5, yStep: 300, width: 12, height: 7, titles: { x: '\\text{Time (min)}', y: '\\text{Distance from home (m)}' } });
  return figure(id, [g, polyline(g, { id: 'walk', points: [[0, 0], [10, 600], [16, 600], [22, 1500], [40, 0]], labels: ['A', 'B', 'C', 'D'] })], height);
};

const video: Explainer = {
  id: 'm10c-5-1',
  lessonId: 'm10c-5-1',
  title: 'Graphs That Tell a Story, Part 1: Reading a Graph',
  thumbnailTitle: 'Reading a Graph',
  thumbnail: 'g',
  summary: 'Reading the story in a graph of a quantity against time: rising means increasing, falling means decreasing, flat means no change, and steeper means faster, with the speed of each part of a walk. Part 2 sketches graphs from stories and decides when to join the points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.1 · Part 1', title: 'Reading a Graph', subtitle: 'Every graph tells a story' }],
      lines: [
        { say: 'A graph tells a story. A flat stretch means nothing is changing. A steep climb means something is changing quickly.', show: 'title' },
        { say: 'In this video, you will read the story in a graph of a quantity against time. In part two, you will sketch a graph from a story.' },
      ],
    },
    {
      chapter: 'The shape of a graph',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Shape of a segment', 'Meaning'],
          rows: [
            ['rises from left to right', 'the quantity is **increasing**'],
            ['falls from left to right', 'the quantity is **decreasing**'],
            ['horizontal', 'the quantity is **not changing**'],
            ['steeper', 'changing **faster**'],
          ],
        },
      ],
      lines: [
        { say: 'When the horizontal axis is time, the shape of a graph shows how a quantity changes. Read it from left to right, the way time moves.' },
        { say: 'A segment that rises means the quantity is increasing.', show: 't.0', focus: 't.0' },
        { say: 'One that falls means it is decreasing.', show: 't.1', focus: 't.1' },
        { say: 'A horizontal segment means it is not changing at all.', show: 't.2', focus: 't.2' },
        { say: 'And the steeper the segment, the faster the change.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'A walk',
      layout: 'split',
      leftWidth: 640,
      left: [walk('g')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{A: } 60 \\text{ m/min}', '\\text{B: stopped}', '\\text{C: } 150 \\text{ m/min}', '\\text{D: back home}'],
        },
      ],
      lines: [
        { say: 'This graph shows Nadia’s distance from home during a walk. Time goes across, in minutes, and distance from home goes up, in metres.', show: ['g.grid', 'g.axes'] },
        { say: 'In segment A, she walks away from home: 600 metres in ten minutes, or sixty metres a minute.', show: ['g.walk-0', 'm.0'], focus: ['g.walk-0', 'm.0'] },
        { say: 'In segment B, the graph is flat for six minutes. Her distance is not changing, so she has stopped.', show: ['g.walk-1', 'm.1'], focus: ['g.walk-1', 'm.1'] },
        { say: 'In segment C, she moves away again: 900 metres in six minutes, which is 150 metres a minute. It is the steepest segment, so it is the fastest.', show: ['g.walk-2', 'm.2'], focus: ['g.walk-2', 'm.2'] },
        { say: 'In segment D, her distance falls to zero: she returns home, 1,500 metres in eighteen minutes.', show: ['g.walk-3', 'm.3'], focus: ['g.walk-3', 'm.3'] },
      ],
    },
    {
      chapter: 'Not a map',
      layout: 'split',
      leftWidth: 640,
      left: [walk('g')],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A distance–time graph is not a map', md: 'A segment going down does not mean walking downhill. It means the distance from home is **decreasing**.' }],
      lines: [
        { say: 'Careful: a graph like this is not a map of the walk. Segment D goes down, but that does not mean Nadia walked downhill.', show: ['g.grid', 'g.axes', 'g.walk'], focus: 'g.walk-3' },
        { say: 'It means her distance from home was decreasing: she was walking back.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a graph of a car’s distance from home against time, one segment is horizontal. What is the car doing?',
          choices: ['It is stopped.', 'It is driving at a steady speed.', 'It is driving on flat ground.', 'It is driving towards home.'],
          answer: 0,
          working: 'A horizontal segment means the distance from home is not changing, so the car is not moving.',
        },
      ],
      lines: [
        { say: 'Your turn. On a graph of a car’s distance from home against time, one segment is horizontal. What is the car doing? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A horizontal segment means the distance is not changing, so the car is stopped. C reads the graph like a map.', show: 'q.answer' },
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
          items: ['Rising: increasing. Falling: decreasing. Flat: no change.', 'Steeper means faster; find the speed as a change over a time.', 'A graph against time is not a picture of the path.'],
        },
      ],
      lines: [
        { say: "Let's sum up. A rising segment means increasing, a falling one means decreasing, and a flat one means no change.", show: 'sum.0' },
        { say: 'Steeper means faster, and you can find the speed by dividing the change by the time.', show: 'sum.1' },
        { say: 'And a graph against time is not a picture of the path. In part two, you will sketch graphs from stories. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
