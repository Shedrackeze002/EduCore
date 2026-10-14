import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });

const video: Explainer = {
  id: 'm10c-6-2',
  lessonId: 'm10c-6-2',
  title: 'Characteristics of Linear Relations, Part 1: Intercepts',
  thumbnailTitle: 'Intercepts',
  thumbnail: 'ints',
  summary: 'The x- and y-intercepts of a line, finding them from an equation by setting the other variable to zero, graphing a line from its intercepts, and how many intercepts a line can have. Part 2 covers domain, range and meaning in context.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.2 · Part 1', title: 'Intercepts', subtitle: 'Where a line crosses the axes' }],
      lines: [
        { say: 'Where does a line cross the axes? In a real situation, these points often carry the most meaning: a starting fee, or the time when something runs out.', show: 'title' },
        { say: 'In this video, you will find the intercepts of a line and use them to draw it. In part two, we look at domain, range and meaning.' },
      ],
    },
    {
      chapter: 'Finding the intercepts',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('ints', [
          g,
          plot(g, { id: 'line', f: (x) => (3 * x - 12) / 4 }),
          dots(g, [
            { id: 'xi', x: 4, y: 0, tex: '(4,\\,0)', place: 'above left' },
            { id: 'yi', x: 0, y: -3, tex: '(0,\\,-3)', place: 'right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Intercepts', md: 'The **x-intercept** is where a graph crosses the $x$-axis, where $y = 0$. The **y-intercept** is where it crosses the $y$-axis, where $x = 0$.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3x - 4y = 12', 'y = 0\\text{: } 3x = 12, \\ x = 4', 'x = 0\\text{: } {-4y} = 12, \\ y = -3'] },
      ],
      lines: [
        { say: 'The x intercept is where a graph crosses the x axis. Every point on the x axis has a height of zero, so there, y equals zero.', show: 'def' },
        { say: 'The y intercept is where it crosses the y axis, where x equals zero.' },
        { say: 'Find the intercepts of three x minus four y equals twelve. For the x intercept, let y equal zero. Then three x equals twelve, so x is four: the point four, zero.', show: ['m.0', 'm.1', 'ints.grid', 'ints.axes', 'ints.xi'], focus: ['m.1', 'ints.xi'] },
        { say: 'For the y intercept, let x equal zero. Then negative four y equals twelve, so y is negative three: the point zero, negative three.', show: ['m.2', 'ints.yi'], focus: ['m.2', 'ints.yi'] },
        { say: 'Two intercepts are two points, which is all you need to draw the line.', show: 'ints.line', focus: 'ints.line' },
      ],
    },
    {
      chapter: 'How many intercepts?',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('few', [
          g,
          polyline(g, { id: 'h', points: [[-6, 3], [2, 3], [6, 3]], tone: 'adj', labels: ['', 'y = 3'] }),
          polyline(g, { id: 'v', points: [[-2, -6], [-2, -2], [-2, 6]], tone: 'opp', labels: ['x = -2'] }),
          plot(g, { id: 'o', f: (x) => -x, tone: 'good', label: 'y = -x', labelAt: 0.8 }),
        ]),
      ],
      right: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['Most lines have **two** intercepts.', 'Horizontal $y = k$: $y$-intercept only.', 'Vertical $x = h$: $x$-intercept only.', 'Through the origin: one point is both.'],
        },
      ],
      lines: [
        { say: 'Most lines have two intercepts. But not all.', show: ['few.grid', 'few.axes', 'b.0'] },
        { say: 'A horizontal line, like y equals three, never meets the x axis. It has only a y intercept.', show: ['few.h', 'b.1'], focus: 'few.h' },
        { say: 'A vertical line, like x equals negative two, has only an x intercept.', show: ['few.v', 'b.2'], focus: 'few.v' },
        { say: 'And a line through the origin, like y equals negative x, has one point, zero, zero, that is both intercepts at once.', show: ['few.o', 'b.3'], focus: 'few.o' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the $y$-intercept of $2x + 5y = 20$?',
          choices: ['$(0, 4)$', '$(10, 0)$', '$(0, 10)$', '$(4, 0)$'],
          answer: 0,
          working: 'Let $x = 0$: $5y = 20$, so $y = 4$. The $y$-intercept is $(0, 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the y intercept of two x plus five y equals twenty? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Let x equal zero. Then five y equals twenty, so y is four: the point zero, four. B is the x intercept.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x$-intercept: set $y = 0$. $y$-intercept: set $x = 0$.', 'Two intercepts are enough to draw a line.', 'Horizontal and vertical lines have only one intercept.'] }],
      lines: [
        { say: "Let's sum up. To find the x intercept, set y equal to zero. To find the y intercept, set x equal to zero.", show: 'sum.0' },
        { say: 'Two intercepts are enough to draw a line.', show: 'sum.1' },
        { say: 'And horizontal and vertical lines have only one intercept. In part two, we look at domain, range and meaning. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
