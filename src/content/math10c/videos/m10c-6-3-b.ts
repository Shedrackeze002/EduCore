import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });
const d = plane({ x: [-2, 8], y: [-2, 8], every: 2 });
const candle = plane({ x: [0, 8], y: [0, 30], xStep: 1, yStep: 5, width: 9, height: 6.5, titles: { x: '\\text{Time (h)}', y: '\\text{Height (cm)}' } });

const video: Explainer = {
  id: 'm10c-6-3-b',
  lessonId: 'm10c-6-3',
  title: 'Slope, Part 2: Kinds of Slope, Rates and Drawing Lines',
  thumbnailTitle: 'Using Slope',
  thumbnail: 'kinds',
  summary: 'Positive, negative, zero and undefined slopes, slope as a rate of change with units, drawing a line from a point and its slope, and finding a missing coordinate from the slope.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.3 · Part 2', title: 'Using Slope', subtitle: 'Kinds of slope, rates and drawing lines' }],
      lines: [
        { say: 'A slope tells you more than how steep a line is. Its sign tells you which way the line goes, and in a real situation, it is a rate.', show: 'title' },
        { say: 'In this video, you will classify slopes, read slope as a rate of change, and use slope to draw a line and find a missing coordinate.' },
      ],
    },
    {
      chapter: 'Four kinds of slope',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('kinds', [
          g,
          plot(g, { id: 'pos', f: (x) => 0.5 * x + 3, tone: 'adj' }),
          plot(g, { id: 'neg', f: (x) => -2 * x - 1, tone: 'opp' }),
          plot(g, { id: 'hor', f: () => -5, tone: 'good' }),
          polyline(g, { id: 'ver', points: [[4, -6], [4, 6]], tone: 'bad' }),
        ]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['Line', 'Slope'],
          rows: [
            ['rises left to right', '[[adj:positive]]'],
            ['falls left to right', '[[opp:negative]]'],
            ['horizontal', '[[good:zero]]: no rise'],
            ['vertical', '[[bad:undefined]]: no run'],
          ],
        },
      ],
      lines: [
        { say: 'Read a line from left to right. A line that rises has a positive slope.', show: ['kinds.grid', 'kinds.axes', 'kinds.pos', 't.0'], focus: ['kinds.pos', 't.0'] },
        { say: 'A line that falls has a negative slope.', show: ['kinds.neg', 't.1'], focus: ['kinds.neg', 't.1'] },
        { say: 'A horizontal line has no rise at all, so its slope is zero over the run, which is zero.', show: ['kinds.hor', 't.2'], focus: ['kinds.hor', 't.2'] },
        { say: 'A vertical line has no run. Its slope would be the rise over zero, and you cannot divide by zero, so the slope of a vertical line is undefined.', show: ['kinds.ver', 't.3'], focus: ['kinds.ver', 't.3'] },
      ],
    },
    {
      chapter: 'Slope as a rate',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('candle', [
          candle,
          plot(candle, { id: 'h', f: (t) => 30 - 3 * t, from: 0, to: 8 }),
          polyline(candle, { id: 'step', points: [[2, 24], [5, 24], [5, 15]], tone: 'opp', labels: ['+3\\text{ h}', '-9\\text{ cm}'], dashed: true }),
          dots(candle, [
            { id: 'a', x: 2, y: 24, tex: '(2,\\,24)', place: 'below left' },
            { id: 'b', x: 5, y: 15, tex: '(5,\\,15)', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{15 - 24}{5 - 2} = \\dfrac{-9}{3} = -3', '-3\\text{ cm/h}'] }],
      lines: [
        { say: 'A candle is twenty-four centimetres tall after two hours, and fifteen centimetres tall after five hours. Find and interpret the slope.', show: ['candle.grid', 'candle.axes', 'candle.h', 'candle.a', 'candle.b'] },
        { say: 'In three hours, the height changes by negative nine centimetres.', show: 'candle.step', focus: 'candle.step' },
        { say: 'So the slope is negative nine over three, which is negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'In context, slope is a rate of change, with units: negative three centimetres per hour. The candle gets three centimetres shorter each hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Drawing a line',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('draw', [
          d,
          plot(d, { id: 'line', f: (x) => 9 - 1.5 * x }),
          polyline(d, { id: 'step', points: [[2, 6], [4, 6], [4, 3]], tone: 'opp', labels: ['\\text{right } 2', '\\text{down } 3'], dashed: true }),
          dots(d, [
            { id: 'P', x: 2, y: 6, tex: 'P', place: 'below left' },
            { id: 'Q', x: 4, y: 3, tex: 'Q', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{2}{3}\\text{: up } 2,\\ \\text{right } 3', 'm = -\\dfrac{3}{2} = \\dfrac{-3}{2}\\text{: down } 3,\\ \\text{right } 2', 'Q = (2 + 2,\\ 6 - 3) = (4,\\ 3)'] }],
      lines: [
        { say: 'A slope of two thirds means up two for every three to the right.', show: 'm.0', focus: 'm.0' },
        { say: 'Draw the line through P, two, six, with a slope of negative three halves. Write the slope as negative three over two: down three for every two to the right.', show: ['m.1', 'draw.grid', 'draw.axes', 'draw.P'], focus: ['m.1', 'draw.P'] },
        { say: 'Start at P. Go right two, and down three, to Q, the point at four, three.', show: ['draw.step', 'draw.Q', 'm.2'], focus: ['draw.step', 'draw.Q', 'm.2'] },
        { say: 'Then draw the line through both points.', show: 'draw.line', focus: 'draw.line' },
      ],
    },
    {
      chapter: 'A missing coordinate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The line through $(2, 3)$ and $(6, k)$ has slope $\\tfrac34$. Find $k$.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{k - 3}{6 - 2} = \\dfrac34', '\\dfrac{k - 3}{4} = \\dfrac34', 'k - 3 = 3', 'k = 6'] },
      ],
      lines: [
        { say: 'The line through two, three, and six, k, has a slope of three quarters. Find k.', show: 'q' },
        { say: 'Use the slope formula, and set it equal to three quarters. The run is six minus two, which is four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Both fractions are over four, so k minus three is three, and k is six.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The line through $(-1, k)$ and $(3, 5)$ has slope $2$. Find $k$.',
          choices: ['$k = -3$', '$k = 13$', '$k = 3$', '$k = 1$'],
          answer: 0,
          working: '$\\dfrac{5 - k}{3 - (-1)} = 2$, so $\\dfrac{5 - k}{4} = 2$, $5 - k = 8$ and $k = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The line through negative one, k, and three, five, has a slope of two. Find k. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The run is three minus negative one, which is four. So five minus k, over four, equals two. Then five minus k is eight, and k is negative three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Positive rises, negative falls, horizontal is $0$, vertical is undefined.', 'In context, slope is a rate of change with units.', 'From a point, use the rise and run to draw a line or find more points.'] }],
      lines: [
        { say: "Let's sum up. A positive slope rises, a negative slope falls, a horizontal line has slope zero, and a vertical line's slope is undefined.", show: 'sum.0' },
        { say: 'In context, slope is a rate of change, with units.', show: 'sum.1' },
        { say: 'And from a point, use the rise and the run to draw the line, or find more points on it. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
