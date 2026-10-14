import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 12], y: [0, 500], xStep: 1, yStep: 50, every: 2, width: 7, height: 5, titles: { x: 't\\text{ (min)}', y: 'V\\text{ (L)}' } });

const video: Explainer = {
  id: 'm203-1-2-c',
  lessonId: 'm203-1-2',
  title: 'Rate of Change, Part 3: The Slope of a Line Graph',
  thumbnailTitle: 'Rate of Change on a Graph',
  thumbnail: 'tk',
  summary: 'Reading a rate of change as the slope of a line graph, the −40 L/min rate of a draining stock tank from the points (2, 400) and (8, 160), why you use the axis scales and not the number of squares, and predicting when the tank is empty.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.2 · Part 3', title: 'The Slope of a Line Graph', subtitle: 'Rate of change on a graph' }],
      lines: [
        { say: 'When data is shown as a graph, the rate of change is right there in the picture: it is the slope of the line.', show: 'title' },
        { say: 'In this video, you will read a rate of change from a graph, using the scales on the axes.' },
      ],
    },
    {
      chapter: 'Draining a stock tank',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('tk', [
          g,
          plot(g, { id: 'line', f: (t) => 480 - 40 * t, from: 0, to: 12, tone: 'brand' }),
          dots(g, [{ id: 'p1', x: 2, y: 400, tex: '(2, 400)', tone: 'adj', place: 'above right' }, { id: 'p2', x: 8, y: 160, tex: '(8, 160)', tone: 'adj', place: 'above right' }]),
        ], 420),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{slope} = \\dfrac{160 - 400}{8 - 2}', '= \\dfrac{-240}{6} = -40', '-40 \\text{ L/min}'] }],
      lines: [
        { say: 'The graph shows the water left in a stock tank on a farm near Brooks, as it drains. What is the rate of change?', show: ['tk.grid', 'tk.axes', 'tk.line'] },
        { say: 'Pick two points where the line crosses grid lines exactly: two, 400, and eight, 160.', show: ['tk.p1', 'tk.p2'], focus: ['tk.p1', 'tk.p2'] },
        { say: 'The slope is 160 minus 400, over eight minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'That is negative 240 over six, which is negative forty.', show: 'm.1', focus: 'm.1' },
        { say: 'The rate of change is negative forty litres per minute: the tank loses forty litres each minute.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Use the axis scales',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting grid squares', md: 'The two axes often have different scales. Here each square across is $1$ minute, but each square up is $50$ litres. Always use the **numbers on the axes**, not the number of squares.' }],
      lines: [
        { say: 'A common mistake is to count grid squares. From the first point to the second, the line drops about five squares and runs six, which would give a slope of about negative five sixths.', show: 'oops' },
        { say: 'But the axes have different scales. Each square across is one minute, while each square up is fifty litres. Always use the numbers on the axes, not the number of squares.' },
      ],
    },
    {
      chapter: 'Predicting from the rate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{start: } 480 \\text{ L}', '480 - 40 \\times 5 = 280 \\text{ L}', '480 \\div 40 = 12 \\text{ min}'] }],
      lines: [
        { say: 'The rate lets you predict. The line starts at 480 litres when the tank begins to drain.', show: 'm.0', focus: 'm.0' },
        { say: 'After five minutes, it has lost forty times five, 200 litres, so 280 litres are left.', show: 'm.1', focus: 'm.1' },
        { say: 'And it is empty after 480 divided by forty, twelve minutes. That matches where the line meets the time axis.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line graph of a hiker’s elevation passes through $(1, 1350)$ and $(4, 1800)$, with time in hours and elevation in metres. What is the rate of change?',
          choices: ['$150$ m/h', '$450$ m/h', '$-150$ m/h', '$0.0067$ m/h'],
          answer: 0,
          working: '$\\dfrac{1800 - 1350}{4 - 1} = \\dfrac{450}{3} = 150$ m/h. B forgets to divide by the change in time.',
        },
      ],
      lines: [
        { say: 'Your turn. A line graph of a hiker’s elevation passes through one, 1,350, and four, 1,800, with time in hours and elevation in metres. What is the rate of change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1,800 minus 1,350 is 450, over four minus one, three. That is 150 metres per hour: the hiker climbs 150 metres each hour.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The slope of a line graph is its rate of change.', 'Use points on grid lines and the numbers on the axes.', 'Use the rate to predict, such as when a tank is empty.'] }],
      lines: [
        { say: 'Let’s sum up. The slope of a line graph is its rate of change.', show: 'sum.0' },
        { say: 'Use points where the line crosses grid lines, and the numbers on the axes, not the squares.', show: 'sum.1' },
        { say: 'And use the rate to predict. In part four, we read graphs made of several pieces. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
