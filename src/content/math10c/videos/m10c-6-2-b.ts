import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const pool = plane({ x: [0, 25], y: [0, 1000], xStep: 5, yStep: 200, width: 9, height: 6.5, titles: { x: '\\text{Time (min)}', y: '\\text{Volume (L)}' } });

const video: Explainer = {
  id: 'm10c-6-2-b',
  lessonId: 'm10c-6-2',
  title: 'Characteristics of Linear Relations, Part 2: Domain, Range and Meaning',
  thumbnailTitle: 'Intercepts in Context',
  thumbnail: 'pool',
  summary: 'The domain and range of slanted, horizontal and vertical lines, and what the intercepts, rate of change, domain and range mean in a real situation such as a draining pool or a taxi fare.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.2 · Part 2', title: 'Domain, Range and Meaning', subtitle: 'Linear relations in context' }],
      lines: [
        { say: 'A line drawn on its own goes on forever. A real situation usually does not.', show: 'title' },
        { say: 'In this video, you will state the domain and range of a linear relation, and say what its intercepts and rate of change mean in context.' },
      ],
    },
    {
      chapter: 'Domain and range of lines',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Line', 'Domain', 'Range'],
          rows: [
            ['slanted, like $y = 2x + 1$', '$\\{x \\mid x \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
            ['horizontal, $y = 3$', '$\\{x \\mid x \\in \\mathbb{R}\\}$', '$\\{3\\}$'],
            ['vertical, $x = -2$', '$\\{-2\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
          ],
        },
      ],
      lines: [
        { say: 'A slanted line goes on forever in both directions, so its domain and range are all real numbers.', show: 't.0', focus: 't.0' },
        { say: 'A horizontal line, like y equals three, still covers every x, but its only y value is three.', show: 't.1', focus: 't.1' },
        { say: 'And a vertical line, like x equals negative two, has only one x value, but every y.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A draining pool',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('pool', [
          pool,
          polyline(pool, { id: 'v', points: [[0, 800], [20, 0]] }),
          dots(pool, [
            { id: 'vi', x: 0, y: 800, tex: '(0,\\,800)', place: 'right' },
            { id: 'ti', x: 20, y: 0, tex: '(20,\\,0)', place: 'above right' },
          ]),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['V = 800 - 40t', 't = 0\\text{: } V = 800', 'V = 0\\text{: } t = 20', '0 \\le t \\le 20,\\ \\ 0 \\le V \\le 800'],
        },
      ],
      lines: [
        { say: 'A pool holds 800 litres and drains at forty litres per minute, so V equals 800 minus forty t.', show: ['m.0', 'pool.grid', 'pool.axes', 'pool.v'] },
        { say: 'The V intercept, when t is zero, is 800: the starting volume.', show: ['m.1', 'pool.vi'], focus: ['m.1', 'pool.vi'] },
        { say: 'The t intercept: zero equals 800 minus forty t, so t is twenty. The pool is empty after twenty minutes.', show: ['m.2', 'pool.ti'], focus: ['m.2', 'pool.ti'] },
        { say: 'The rate of change, negative forty, means the volume falls by forty litres each minute.', focus: 'pool.v' },
        { say: 'Time cannot be negative, and the pool cannot hold less than nothing. So the domain is t from zero to twenty, and the range is V from zero to 800.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A taxi fare',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['C = 3.75 + 2.10d'] },
        {
          kind: 'bullets',
          id: 'b',
          items: ['$3.75$: the $C$-intercept, the fee before the taxi moves.', '$2.10$: the rate of change, the cost per kilometre.'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mind the context', md: 'In a situation, the domain and range are usually restricted. When only whole items are possible, the graph is a set of points, not a line.' },
      ],
      lines: [
        { say: 'A taxi charges C equals 3.75 plus 2.10 d dollars for d kilometres. What does each number mean?', show: 'm.0' },
        { say: '3.75 is the C intercept: the fee before the taxi moves at all.', show: 'b.0' },
        { say: '2.10 is the rate of change: the cost for each kilometre.', show: 'b.1' },
        { say: 'Always think about the context. The distance cannot be negative, and when only whole items are possible, like tickets or people, the graph is a set of points, not a line.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A candle is $30\\text{ cm}$ tall and burns $2\\text{ cm}$ per hour: $h = 30 - 2t$. What does the $t$-intercept mean?',
          choices: ['The candle burns out after $15$ hours.', 'The candle starts $30\\text{ cm}$ tall.', 'The candle burns $2\\text{ cm}$ each hour.', 'The candle burns out after $30$ hours.'],
          answer: 0,
          working: 'At the $t$-intercept, $h = 0$: $0 = 30 - 2t$, so $t = 15$. The candle has burned down after $15$ hours.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle is thirty centimetres tall and burns two centimetres per hour, so h equals thirty minus two t. What does the t intercept mean? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. At the t intercept the height is zero: zero equals thirty minus two t, so t is fifteen. The candle has burned out after fifteen hours. B describes the h intercept, and C the rate of change.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Slanted lines: all real numbers. Horizontal and vertical lines are special.', 'In context, intercepts are often a starting value or a time when something runs out.', 'Restrict the domain and range to what makes sense.'] }],
      lines: [
        { say: "Let's sum up. A slanted line has all real numbers as its domain and range, while horizontal and vertical lines are special.", show: 'sum.0' },
        { say: 'In context, the intercepts are often a starting value, or a time when something runs out.', show: 'sum.1' },
        { say: 'And restrict the domain and range to what makes sense in the situation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
