import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const draw = plane({ x: [-2, 8], y: [-3, 6], every: 2 });
const read = plane({ x: [-2, 8], y: [-2, 8], every: 2 });

const video: Explainer = {
  id: 'm10c-7-1-b',
  lessonId: 'm10c-7-1',
  title: 'Slope-Intercept Form, Part 2: Graphing and Writing Equations',
  thumbnailTitle: 'Graphing y = mx + b',
  thumbnail: 'draw',
  summary: 'Graphing a line from y = mx + b by plotting the y-intercept and using the slope as rise over run, checking with a third point, and writing the equation of a line from its graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.1 · Part 2', title: 'Graphing and Writing Equations', subtitle: 'From $y = mx + b$ to a line, and back' }],
      lines: [
        { say: 'Because y equals m x plus b shows the y intercept and the slope, it tells you exactly how to draw the line.', show: 'title' },
        { say: 'In this video, you will graph a line from its equation, and write the equation of a line from its graph.' },
      ],
    },
    {
      chapter: 'Graphing a line',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('draw', [
          draw,
          plot(draw, { id: 'line', f: (x) => 3 - (2 / 3) * x }),
          polyline(draw, { id: 's1', points: [[0, 3], [3, 3], [3, 1]], tone: 'opp', labels: ['\\text{right } 3', '\\text{down } 2'], dashed: true }),
          polyline(draw, { id: 's2', points: [[3, 1], [6, 1], [6, -1]], tone: 'opp', dashed: true }),
          dots(draw, [
            { id: 'A', x: 0, y: 3, tex: '(0,\\,3)', tone: 'adj', place: 'left' },
            { id: 'B', x: 3, y: 1, tex: '(3,\\,1)', place: 'below left' },
            { id: 'C', x: 6, y: -1, tex: '(6,\\,{-1})', tone: 'good', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = -\\tfrac23 x + 3', 'b = 3\\text{: plot } (0,\\ 3)', 'm = \\dfrac{-2}{3}\\text{: right } 3,\\ \\text{down } 2'] }],
      lines: [
        { say: 'Graph y equals negative two thirds x plus three. Start with the y intercept: b is three, so plot zero, three.', show: ['m.0', 'm.1', 'draw.grid', 'draw.axes', 'draw.A'], focus: ['m.1', 'draw.A'] },
        { say: 'Then use the slope, negative two over three: right three, and down two. That gives the point at three, one.', show: ['m.2', 'draw.s1', 'draw.B'], focus: ['m.2', 'draw.s1', 'draw.B'] },
        { say: 'Draw the line through the two points. The slope is negative, so the line falls from left to right.', show: 'draw.line', focus: 'draw.line' },
        { say: 'A third point is a good check. Go right three and down two again, to six, negative one. It lands on the line.', show: ['draw.s2', 'draw.C'], focus: ['draw.s2', 'draw.C'] },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('read', [
          read,
          plot(read, { id: 'line', f: (x) => 0.75 * x + 1 }),
          polyline(read, { id: 'step', points: [[0, 1], [4, 1], [4, 4]], tone: 'opp', labels: ['4', '3'], sides: ['right', 'right'], dashed: true }),
          dots(read, [
            { id: 'b', x: 0, y: 1, tex: '(0,\\,1)', tone: 'adj', place: 'left' },
            { id: 'p', x: 4, y: 4, tex: '(4,\\,4)', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['b = 1', 'm = \\dfrac{\\text{rise}}{\\text{run}} = \\dfrac34', 'y = \\tfrac34 x + 1'] }],
      lines: [
        { say: 'Now go the other way. To write the equation of a line from its graph, first read b, where the line crosses the y axis. Here, b is one.', show: ['read.grid', 'read.axes', 'read.line', 'read.b', 'm.0'], focus: ['read.b', 'm.0'] },
        { say: 'Then count the rise and run between two points on the grid. From zero, one, to four, four, the run is four and the rise is three. So m is three quarters.', show: ['read.p', 'read.step', 'm.1'], focus: ['read.step', 'm.1'] },
        { say: 'Choose points where the line crosses the grid exactly, at the corner of a square. Then the rise and the run are whole numbers, and the slope you read is exact.', focus: ['read.b', 'read.p'] },
        { say: 'Write y equals m x plus b: y equals three quarters x plus one. Check the sign: the line rises from left to right, so its slope is positive.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line crosses the $y$-axis at $-2$ and passes through $(4, 1)$. What is its equation?',
          choices: ['$y = \\tfrac34 x - 2$', '$y = \\tfrac43 x - 2$', '$y = \\tfrac34 x + 2$', '$y = -2x + \\tfrac34$'],
          answer: 0,
          working: '$b = -2$. From $(0, -2)$ to $(4, 1)$: rise $3$, run $4$, so $m = \\tfrac34$ and $y = \\tfrac34 x - 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A line crosses the y axis at negative two, and passes through four, one. What is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b is negative two. From zero, negative two, to four, one, the rise is three and the run is four, so m is three quarters. B has run over rise, and C has the wrong sign on b.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To graph: plot $(0, b)$, then use rise over run.', 'A third point is a good check.', 'From a graph: read $b$, count $m$, write $y = mx + b$.'] }],
      lines: [
        { say: "Let's sum up. To graph y equals m x plus b, plot zero, b, then use the slope as rise over run.", show: 'sum.0' },
        { say: 'A third point is a good check.', show: 'sum.1' },
        { say: 'And from a graph, read b, count the slope, and write y equals m x plus b. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
