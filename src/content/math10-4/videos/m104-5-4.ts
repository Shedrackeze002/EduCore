import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const pay = plane({ name: 'p', x: [0, 8], y: [0, 160], yStep: 20, width: 8, height: 6, titles: { x: '\\text{Hours worked}', y: '\\text{Pay (\\$)}' } });
const taxi = plane({ name: 't', x: [0, 8], y: [0, 20], yStep: 2, width: 8, height: 6, titles: { x: '\\text{Distance (km)}', y: '\\text{Fare (\\$)}' } });
const walk = plane({ name: 'w', x: [0, 60], y: [0, 2], xStep: 10, yStep: 0.5, width: 9, height: 5, titles: { x: '\\text{Time (min)}', y: '\\text{Distance from home (km)}' } });

const video: Explainer = {
  id: 'm104-5-4',
  lessonId: 'm104-5-4',
  title: 'Reading Graphs',
  thumbnailTitle: 'Reading Graphs',
  thumbnail: 'pay',
  summary: 'Reading values from a pay graph forwards and backwards, checking the scale, describing a line as up, down or flat, a taxi graph’s starting fee and cost per kilometre, and a distance–time graph of a walk with a stop.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.4', title: 'Reading Graphs', subtitle: 'A price list in one picture' }],
      lines: [
        { say: 'A graph can show a whole price list or pay chart in one picture. You do not need to calculate: you just need to read carefully.', show: 'title' },
        { say: 'In this video, you will read values from graphs, and describe what a graph shows.' },
      ],
    },
    {
      chapter: 'Reading values',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('pay', [
          pay,
          polyline(pay, { id: 'line', points: [[0, 0], [8, 160]], tone: 'adj' }),
          polyline(pay, { id: 'r5', points: [[5, 0], [5, 100], [0, 100]], tone: 'good', dashed: true }),
          polyline(pay, { id: 'r140', points: [[0, 140], [7, 140], [7, 0]], tone: 'opp', dashed: true }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 \\text{ h} \\;\\to\\; \\$100', '\\$140 \\;\\to\\; 7 \\text{ h}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not checking the scale', md: 'Each grid line up here is \\$20, not \\$1. Read the axis numbers before you count lines.' },
      ],
      lines: [
        { say: 'An axis is one of the two number lines on a graph. The horizontal axis goes across, and the vertical axis goes up. This graph shows Jordan’s pay at a car wash.', show: ['pay.p-grid', 'pay.p-axes', 'pay.p-line'] },
        { say: 'How much does Jordan earn for five hours? Find five on the horizontal axis, go straight up to the line, then straight across: 100 dollars.', show: ['pay.p-r5', 'm.0'], focus: ['pay.p-r5', 'm.0'] },
        { say: 'To work backwards, start on the vertical axis. For 140 dollars, go across to the line, then down: seven hours.', show: ['pay.p-r140', 'm.1'], focus: ['pay.p-r140', 'm.1'] },
        { say: 'Check the scale first. On this graph, each grid line up is twenty dollars, not one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Describing a graph',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('taxi', [
          taxi,
          polyline(taxi, { id: 'line', points: [[0, 4], [8, 20]], tone: 'adj' }),
          dots(taxi, [{ id: 'start', x: 0, y: 4, tex: '\\$4', tone: 'good', place: 'right' }, { id: 'a', x: 2, y: 8, tex: '(2, 8)', place: 'above left' }, { id: 'b', x: 5, y: 14, tex: '(5, 14)', place: 'above left' }]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['**Up:** both amounts grow.', '**Down:** one shrinks as the other grows.', '**Flat:** nothing changes.'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(14 - 8) \\div (5 - 2) = 6 \\div 3 = 2'] },
      ],
      lines: [
        { say: 'Read a graph from left to right. A line going up means both amounts grow together. Down means one shrinks as the other grows, and flat means nothing is changing.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'This graph shows taxi fares. At zero kilometres, the line is already at four dollars: the taxi has not moved, but the fare is four dollars. That is the starting fee.', show: ['taxi.t-grid', 'taxi.t-axes', 'taxi.t-line', 'taxi.t-start'], focus: 'taxi.t-start' },
        { say: 'At two kilometres, the fare is eight dollars, and at five kilometres, fourteen. The fare goes up six dollars over three kilometres: two dollars for each kilometre.', show: ['taxi.t-a', 'taxi.t-b', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Distance and time',
      layout: 'split',
      leftWidth: 620,
      left: [figure('walk', [walk, polyline(walk, { id: 'line', points: [[0, 0], [20, 1.5], [30, 1.5], [60, 0]], tone: 'adj' })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{stop: } 30 - 20 = 10 \\text{ min}', '\\text{total: } 1.5 + 1.5 = 3\\text{ km}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Down is not slower', md: 'A line going down means getting **closer to home**. A flat line means not moving.' },
      ],
      lines: [
        { say: 'A distance–time graph shows how far someone is from a place as time goes on. Ravi walks a neighbour’s dog. For the first twenty minutes, the line goes up: he walks away from home.', show: ['walk.w-grid', 'walk.w-axes', 'walk.w-line'] },
        { say: 'From twenty to thirty minutes, the line is flat: he stops at the dog park for ten minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the line goes down to zero: he walks back home. He walked 1.5 kilometres out and 1.5 back: three kilometres in total.', show: 'm.1', focus: 'm.1' },
        { say: 'A line going down does not mean he slowed down. It means he is getting closer to home.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On Jordan’s pay graph, the line goes from \\$0 at 0 hours to \\$160 at 8 hours. How much does Jordan earn for 3 hours?',
          choices: ['\\$60', '\\$3', '\\$20', '\\$80'],
          answer: 0,
          working: 'The pay goes up \\$20 each hour: $3 \\times 20 = 60$.',
        },
      ],
      lines: [
        { say: 'Your turn. On Jordan’s pay graph, the line goes from zero dollars at zero hours, to 160 dollars at eight hours. How much does he earn for three hours? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The pay goes up twenty dollars each hour, so three hours pays sixty dollars. B counts grid lines without checking the scale.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the axis labels and the scale first.', 'Up from the horizontal axis, then across. Work backwards: across, then down.', 'Up, down or flat. Flat on a distance–time graph is a stop.'] }],
      lines: [
        { say: 'Let’s sum up. Read each axis label and scale before you read a value.', show: 'sum.0' },
        { say: 'Go up from the horizontal axis to the line, then across. To work backwards, go across, then down.', show: 'sum.1' },
        { say: 'And describe a line as going up, down or flat. On a distance–time graph, a flat part is a stop. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
