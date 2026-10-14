import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const bath = plane({ x: [0, 30], y: [0, 200], xStep: 5, yStep: 50, width: 11, height: 6.5, titles: { x: '\\text{Time (min)}', y: '\\text{Volume (L)}' } });
const tickets = plane({ name: 't', x: [0, 5], y: [0, 60], xStep: 1, yStep: 12, width: 5, height: 4.4, titles: { x: '\\text{Tickets}', y: '\\text{Cost (\\$)}' } });
const plant = plane({ name: 'p', x: [0, 5], y: [0, 10], xStep: 1, yStep: 2, width: 5, height: 4.4, at: [8.5, 0], titles: { x: '\\text{Day}', y: '\\text{Height (cm)}' } });

const video: Explainer = {
  id: 'm10c-5-1-b',
  lessonId: 'm10c-5-1',
  title: 'Graphs That Tell a Story, Part 2: Sketching, and Continuous or Discrete',
  thumbnailTitle: 'Sketching Graphs from Stories',
  thumbnail: 'bath',
  summary: 'Sketching a graph from a story by breaking it into parts, and deciding whether to join the points: continuous data can take any value, discrete data only separate values.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 5.1 · Part 2', title: 'Sketching a Graph from a Story', subtitle: 'And when to join the points' }],
      lines: [
        { say: 'You can read a story from a graph. You can also go the other way, and draw a graph from a story.', show: 'title' },
        { say: 'In this video, you will sketch graphs from stories, and decide whether the points on a graph should be joined.' },
      ],
    },
    {
      chapter: 'Sketching from a story',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bath', [bath, polyline(bath, { id: 'tub', points: [[0, 0], [10, 150], [22, 150], [25, 0]], labels: ['\\text{filling}', '\\text{bathing}', '\\text{draining}'], sides: ['right', 'left', 'left'] })])],
      right: [{ kind: 'callout', id: 'how', tone: 'key', title: 'Break the story into parts', md: 'For each part, ask: is the quantity **increasing**, **decreasing** or **constant**? Quickly or slowly?' }],
      lines: [
        { say: 'To sketch a graph from a story, break the story into parts. For each part, ask: is the quantity increasing, decreasing, or constant? Quickly, or slowly?', show: 'how' },
        { say: 'A bathtub fills at a steady rate, stays full while someone bathes, then drains quickly. Sketch the volume of water against time.', show: ['bath.grid', 'bath.axes'] },
        { say: 'Filling at a steady rate: a straight segment, rising.', show: 'bath.tub-0', focus: 'bath.tub-0' },
        { say: 'Bathing: the volume does not change, so a horizontal segment.', show: 'bath.tub-1', focus: 'bath.tub-1' },
        { say: 'Draining quickly: a steep segment falling to zero, steeper than the filling, because the water leaves faster than it came in.', show: 'bath.tub-2', focus: 'bath.tub-2' },
        { say: 'A sketch does not need exact numbers. It needs the right shape: the right directions, and the right steepness. And label both axes with the quantities, here time and volume.' },
      ],
    },
    {
      chapter: 'Continuous or discrete?',
      layout: 'center',
      main: [
        figure(
          'two',
          [
            tickets,
            dots(tickets, [0, 1, 2, 3, 4, 5].map((n) => ({ id: `d${n}`, x: n, y: 12 * n, group: 'pts' }))),
            plant,
            polyline(plant, { id: 'grow', points: [[0, 1], [1, 2.4], [2, 4], [3, 5.8], [4, 7.2], [5, 8.6]], tone: 'good' }),
          ],
          380,
        ),
        { kind: 'callout', id: 'key', tone: 'key', title: 'To join or not to join', md: '**Continuous** data can take any value in an interval: join the points. **Discrete** data can only take separate values: do not join them.' },
      ],
      lines: [
        { say: 'Should you join the points on a graph? It depends on the data.' },
        { say: 'Continuous data can take any value in an interval, like time, distance or temperature. A plant keeps growing between your measurements, so join the points.', show: ['two.p-grid', 'two.p-axes', 'two.p-grow'], focus: 'two.p-grow' },
        { say: 'Discrete data can only take separate values, often whole numbers. You cannot buy two and a half movie tickets, so the cost is a set of separate points. Do not join them.', show: ['two.t-grid', 'two.t-axes', 'two.t-pts'], focus: 'two.t-pts' },
        { say: 'So, continuous: join the points. Discrete: leave them separate.', show: 'key' },
        { say: 'If you are not sure, ask: can the quantity take a value between two of the points? If it can, the data is continuous.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which data is discrete?',
          choices: ['The number of people in a room', 'The temperature outside', 'The height of a tree', 'The time a race takes'],
          answer: 0,
          working: 'You cannot have $2.5$ people, so the count is discrete. Temperature, height and time can take any value in between.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these data is discrete? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. You cannot have two and a half people, so the number of people is discrete. Temperature, height and time can take any value in between, so they are continuous.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To sketch, break the story into parts: the direction and speed of each.', 'Continuous data: join the points. Discrete data: separate points.'] }],
      lines: [
        { say: "Let's sum up. To sketch a graph from a story, break it into parts, and show the direction and the speed of each.", show: 'sum.0' },
        { say: 'Join the points for continuous data, and leave them separate for discrete data. Practise these skills in your lesson. See you next time!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
