import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 6], y: [-6, 6], every: 2 });
const near = plane({ x: [0, 6], y: [0, 8], every: 2 });

const video: Explainer = {
  id: 'm10c-8-1-b',
  lessonId: 'm10c-8-1',
  title: 'Systems of Linear Equations, Part 2: Solving by Graphing',
  thumbnailTitle: 'Solving Systems by Graphing',
  thumbnail: 'cross',
  summary: 'Solving a system by graphing both lines and reading their point of intersection, verifying it in both equations, and why a graphical solution is only an estimate when the coordinates are not whole numbers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 8.1 · Part 2', title: 'Solving by Graphing', subtitle: 'Where the lines cross' }],
      lines: [
        { say: 'The solution of a system is the point where its lines intersect. So one way to solve a system is to draw it.', show: 'title' },
        { say: 'In this video, you will solve a system by graphing, and see when a graph can only give an estimate.' },
      ],
    },
    {
      chapter: 'Solving by graphing',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('cross', [
          g,
          plot(g, { id: 'l1', f: (x) => x + 1, tone: 'adj' }),
          plot(g, { id: 'l2', f: (x) => 5 - x, tone: 'opp' }),
          dots(g, [{ id: 'P', x: 2, y: 3, tex: '(2,\\,3)', place: 'right' }]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['Write each equation in a form that is easy to graph.', 'Graph both lines on the same grid.', 'Read the point of intersection.', 'Verify it in both equations.'] },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{y = x + 1} \\qquad \\opp{y = -x + 5}', '3 = 2 + 1 \\ \\checkmark', '3 = -2 + 5 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'Solve y equals x plus one, and y equals negative x plus five, by graphing. First, write each equation in a form that is easy to graph. These are already in slope-intercept form.', show: ['b.0', 'm.0'] },
        { say: 'Graph both lines on the same grid. For the first, start at one on the y axis, and go up one for every one across. For the second, start at five, and go down one for every one across.', show: ['b.1', 'cross.grid', 'cross.axes', 'cross.l1', 'cross.l2'] },
        { say: 'Read the point of intersection: two, three.', show: ['b.2', 'cross.P'], focus: 'cross.P' },
        { say: 'Then verify it in both equations. Three equals two plus one, and three equals negative two plus five. Both are true, so the solution is two, three.', show: ['b.3', 'm.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Only an estimate',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('near', [
          near,
          plot(near, { id: 'l1', f: (x) => x + 1.7, tone: 'adj' }),
          plot(near, { id: 'l2', f: (x) => 11.3 - 2 * x, tone: 'opp' }),
          dots(near, [{ id: 'P', x: 3.2, y: 4.9, tex: '(3.2,\\,4.9)', place: 'right' }]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Limits of graphing', md: 'Graphing is exact only when the solution has whole-number coordinates. Otherwise you can only estimate.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not exact', md: 'Treat a graphical solution as an estimate, and verify it algebraically. Graphing technology finds intersections precisely.' },
      ],
      lines: [
        { say: 'Graphing works well when the solution has whole-number coordinates. But look at these two lines. Where do they cross? It looks like three, five.', show: ['near.grid', 'near.axes', 'near.l1', 'near.l2', 'tip'] },
        { say: 'Really, it is 3.2, 4.9. On a hand-drawn graph, you can only estimate a point like that.', show: 'near.P', focus: 'near.P' },
        { say: 'If you substitute three, five into the two equations, they will not quite balance. That is the sign that your reading is only close, not exact.' },
        { say: 'So treat a graphical solution as an estimate, and verify it algebraically. Graphing technology can find the intersection precisely, and the next lessons give exact methods.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is the solution of $y = 2x - 1$ and $y = -x + 5$?',
          choices: ['$(2, 3)$', '$(3, 2)$', '$(1, 1)$', '$(0, 5)$'],
          answer: 0,
          working: 'Check $(2, 3)$: $3 = 2(2) - 1$ and $3 = -2 + 5$. Both are true.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is the solution of y equals two x minus one, and y equals negative x plus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three equals two times two minus one, and three equals negative two plus five. C is only on the first line, and D is only on the second.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Graph both lines and read the point of intersection.', 'Verify it in both equations.', 'A graph gives an estimate unless the coordinates are whole numbers.'] }],
      lines: [
        { say: 'Let’s sum up. To solve a system by graphing, graph both lines, and read the point of intersection.', show: 'sum.0' },
        { say: 'Then verify it in both equations.', show: 'sum.1' },
        { say: 'And remember that a graph only gives an estimate, unless the coordinates are whole numbers. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
