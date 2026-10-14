import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 7], y: [0, 210], xStep: 1, yStep: 30, every: 1, width: 7, height: 5, titles: { x: 't\\text{ (h)}', y: 'd\\text{ (km)}' } });

const video: Explainer = {
  id: 'm203-1-2-d',
  lessonId: 'm203-1-2',
  title: 'Rate of Change, Part 4: Graphs with Several Pieces',
  thumbnailTitle: 'Graphs with Several Pieces',
  thumbnail: 'tr',
  summary: 'Reading a graph made of straight pieces, each with its own rate: a delivery truck drives away at 90 km/h, stops (0 km/h), and drives back at −60 km/h, so it moved fastest on the way out.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.2 · Part 4', title: 'Graphs with Several Pieces', subtitle: 'One rate for each piece' }],
      lines: [
        { say: 'Real trips and real jobs rarely run at one steady rate. Their graphs are made of straight pieces, and each piece has its own rate of change.', show: 'title' },
        { say: 'In this video, you will find the rate for each piece of a graph, and describe what is happening.' },
      ],
    },
    {
      chapter: 'Reading the pieces',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['A **steeper** piece means a **faster** change.', 'A piece that goes **down** has a **negative** rate.', 'A **flat** piece means **no change**: the rate is $0$.'] }],
      lines: [
        { say: 'Before you calculate anything, read the shape. A steeper piece means a faster change.', show: 'b.0' },
        { say: 'A piece that goes down has a negative rate: the quantity is decreasing.', show: 'b.1' },
        { say: 'And a flat piece means no change at all: the rate is zero.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A delivery truck',
      layout: 'split',
      leftWidth: 600,
      left: [figure('tr', [g, polyline(g, { id: 'trip', points: [[0, 0], [2, 180], [3, 180], [6, 0]], tone: 'brand', labels: ['A', 'B', 'C'] })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A:\\ \\dfrac{180 - 0}{2 - 0} = 90 \\text{ km/h}', 'B:\\ \\dfrac{180 - 180}{3 - 2} = 0 \\text{ km/h}', 'C:\\ \\dfrac{0 - 180}{6 - 3} = -60 \\text{ km/h}'] }],
      lines: [
        { say: 'The graph shows a delivery truck’s distance from its warehouse. Piece A goes from zero to 180 kilometres in two hours.', show: ['tr.grid', 'tr.axes', 'tr.trip-0'], focus: 'tr.trip-0' },
        { say: 'Its rate is 180 over two: ninety kilometres per hour, driving away from the warehouse.', show: 'm.0', focus: ['tr.trip-0', 'm.0'] },
        { say: 'Piece B is flat. The distance stays at 180 for one hour, so the rate is zero: the truck is stopped while it is unloaded.', show: ['tr.trip-1', 'm.1'], focus: ['tr.trip-1', 'm.1'] },
        { say: 'Piece C goes down from 180 to zero in three hours: negative 180 over three, negative sixty kilometres per hour. The truck is driving back.', show: ['tr.trip-2', 'm.2'], focus: ['tr.trip-2', 'm.2'] },
      ],
    },
    {
      chapter: 'When was it fastest?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['|90| > |{-60}| > 0'] },
        { kind: 'callout', id: 'k', tone: 'key', title: 'Speed and direction', md: 'The **size** of the rate tells how fast. The **sign** tells the direction: positive is away from the warehouse, negative is back toward it.' },
      ],
      lines: [
        { say: 'When was the truck moving fastest? Compare the sizes of the rates: ninety, sixty, and zero. Piece A, at ninety kilometres per hour, is the fastest, and it is also the steepest piece.', show: 'm.0', focus: 'm.0' },
        { say: 'The size of a rate tells you how fast, and its sign tells you the direction. The negative sign on piece C does not mean slow: it means the truck is coming back.', show: 'k' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph of water in a rain barrel has three pieces: $0$ to $2$ h rises from $20$ L to $80$ L, $2$ to $5$ h is flat, and $5$ to $6$ h falls to $30$ L. Which piece changes fastest?',
          choices: ['the last piece, at $-50$ L/h', 'the first piece, at $30$ L/h', 'the flat piece', 'They all change at the same rate.'],
          answer: 0,
          working: 'First: $\\dfrac{80 - 20}{2} = 30$ L/h. Flat: $0$. Last: $\\dfrac{30 - 80}{1} = -50$ L/h. The size $50$ is the largest.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph of water in a rain barrel has three pieces. From zero to two hours, it rises from twenty litres to eighty. From two to five hours, it is flat. From five to six hours, it falls to thirty litres. Which piece changes fastest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The first piece is thirty litres per hour, the flat piece is zero, and the last piece is negative fifty. Fifty is the largest size, so the barrel empties faster than it filled.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each straight piece has its own rate of change.', 'Steeper: faster. Flat: no change. Down: negative.', 'The size of a rate tells how fast; the sign tells the direction.'] }],
      lines: [
        { say: 'Let’s sum up. Each straight piece of a graph has its own rate of change.', show: 'sum.0' },
        { say: 'Steeper means faster, flat means no change, and down means negative.', show: 'sum.1' },
        { say: 'And the size of a rate tells how fast, while the sign tells the direction. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
