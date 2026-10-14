import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 8], y: [0, 120], xStep: 1, yStep: 15, width: 7, height: 5, titles: { x: '\\text{hours worked}', y: '\\text{pay (\\$)}' } });

const video: Explainer = {
  id: 'm204-5-3-b',
  lessonId: 'm204-5-3',
  title: 'Tables and Graphs, Part 2: Reading a Graph',
  thumbnailTitle: 'Reading a Graph',
  thumbnail: 'pg',
  summary: 'What a graph of a relationship shows, reading the graph of P = 15h forwards (6 hours pays 90 dollars) and backwards (75 dollars is 5 hours), and checking a reading with the rule.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.3 · Part 2', title: 'Reading a Graph', subtitle: 'Up, then across' }],
      lines: [
        { say: 'A table shows a few pairs. A graph shows every pair at once, as a picture you can read in a second.', show: 'title' },
        { say: 'In this video, you will read a graph forwards and backwards.' },
      ],
    },
    {
      chapter: 'A graph',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Graph', md: 'A **graph** shows a relationship as a picture. The **horizontal** axis shows what you choose. The **vertical** axis shows what you get.' }],
      lines: [
        { say: 'A graph shows a relationship as a picture. The horizontal axis, going across, shows what you choose. The vertical axis, going up, shows what you get. Each point on the line is one pair from the table.', show: 'def' },
        { say: 'For Tariq’s pay, the line starts at zero, because zero hours earns zero dollars, and it rises fifteen dollars for every hour.' },
      ],
    },
    {
      chapter: 'Reading forwards',
      layout: 'split',
      leftWidth: 720,
      left: [
        figure('pg', [
          g,
          polyline(g, { id: 'pay', points: [[0, 0], [8, 120]], tone: 'brand' }),
          polyline(g, { id: 'up', points: [[6, 0], [6, 90], [0, 90]], tone: 'adj', dashed: true }),
          dots(g, [{ id: 'p6', x: 6, y: 90, tex: '(6,\\ 90)', tone: 'adj', place: 'below right' }]),
        ], 480),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['15 \\times 6 = 90', '75 \\div 15 = 5'] }],
      lines: [
        { say: 'Here is the graph of P equals fifteen h, Tariq’s pay. How much does Tariq earn for six hours?', show: ['pg.grid', 'pg.axes', 'pg.pay'], focus: 'pg.pay' },
        { say: 'Find six on the horizontal axis. Go straight up to the line, then straight across to the vertical axis.', show: 'pg.up', focus: 'pg.up' },
        { say: 'The line is at 90. So Tariq earns 90 dollars for six hours. The dashed path shows the route your eyes take: up, then across.', show: 'pg.p6', focus: 'pg.p6' },
        { say: 'Check with the rule: fifteen times six is 90. The graph and the rule agree.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Reading backwards',
      layout: 'split',
      leftWidth: 720,
      left: [
        figure('pg', [
          g,
          polyline(g, { id: 'pay', points: [[0, 0], [8, 120]], tone: 'brand' }),
          polyline(g, { id: 'back', points: [[0, 75], [5, 75], [5, 0]], tone: 'opp', dashed: true }),
          dots(g, [{ id: 'p5', x: 5, y: 75, tex: '(5,\\ 75)', tone: 'opp', place: 'above left' }]),
        ], 480),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['75 \\div 15 = 5'] }],
      lines: [
        { say: 'You can also read a graph backwards. How many hours give 75 dollars?', show: ['pg.grid', 'pg.axes', 'pg.pay'] },
        { say: 'This time, start at 75 on the vertical axis. Go across to the line, then straight down.', show: 'pg.back', focus: 'pg.back' },
        { say: 'You land on five. So 75 dollars is five hours of work.', show: 'pg.p5', focus: 'pg.p5' },
        { say: 'Check: 75 divided by fifteen is five. Reading backwards is the same as solving 75 equals fifteen h.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On the graph of $P = 15h$, you start at $105$ on the pay axis, go across to the line, then down. Which number of hours do you land on?',
          choices: ['$7$', '$90$', '$1{,}575$', '$6$'],
          answer: 0,
          working: '$105 \\div 15 = 7$, so the point is $(7,\\ 105)$. Check: $15 \\times 7 = 105$. C multiplies instead of dividing.',
        },
      ],
      lines: [
        { say: 'Your turn. On the graph of P equals fifteen h, you start at 105 on the pay axis, go across to the line, then down. Which number of hours do you land on? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 105 divided by fifteen is seven, so you land on seven hours. Check: fifteen times seven is 105. C multiplies instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Forwards: up from the horizontal axis, then across.', 'Backwards: across from the vertical axis, then down.', 'Check a reading with the rule.'] }],
      lines: [
        { say: 'Let’s sum up. To read a graph forwards, go up from the horizontal axis to the line, then across.', show: 'sum.0' },
        { say: 'To read it backwards, go across from the vertical axis to the line, then down.', show: 'sum.1' },
        { say: 'And check your reading with the rule. In part three, we graph rules with a start value. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
