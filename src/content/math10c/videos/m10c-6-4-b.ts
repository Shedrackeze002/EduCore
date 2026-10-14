import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 8], y: [-2, 8], every: 2 });

const video: Explainer = {
  id: 'm10c-6-4-b',
  lessonId: 'm10c-6-4',
  title: 'Parallel and Perpendicular Lines, Part 2: Classifying and Finding Unknowns',
  thumbnailTitle: 'Parallel, Perpendicular or Neither?',
  thumbnail: 'pair',
  summary: 'Deciding whether two lines through given points are parallel, perpendicular or neither, and finding a missing coordinate that makes two lines perpendicular or parallel.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.4 · Part 2', title: 'Parallel, Perpendicular or Neither?', subtitle: 'Classifying pairs of lines' }],
      lines: [
        { say: 'Parallel lines have equal slopes, and perpendicular lines have slopes whose product is negative one.', show: 'title' },
        { say: 'In this video, you will use those facts to classify pairs of lines, and to find a missing coordinate.' },
      ],
    },
    {
      chapter: 'Classifying two lines',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('pair', [
          g,
          plot(g, { id: 'l1', f: (x) => 2 * x, tone: 'adj' }),
          plot(g, { id: 'l2', f: (x) => 5 - x / 2, tone: 'opp' }),
          dots(g, [
            { id: 'a', x: 1, y: 2, tex: '(1,\\,2)', tone: 'adj', place: 'right', group: 'p1' },
            { id: 'b', x: 4, y: 8, tex: '(4,\\,8)', tone: 'adj', place: 'right', group: 'p1' },
            { id: 'c', x: 0, y: 5, tex: '(0,\\,5)', tone: 'opp', place: 'above right', group: 'p2' },
            { id: 'd', x: 6, y: 2, tex: '(6,\\,2)', tone: 'opp', place: 'above right', group: 'p2' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{m_1} = \\dfrac{8 - 2}{4 - 1} = \\dfrac63 = 2', '\\opp{m_2} = \\dfrac{2 - 5}{6 - 0} = \\dfrac{-3}{6} = -\\dfrac12', 'm_1 \\times m_2 = 2 \\times \\left(-\\dfrac12\\right) = -1'] }],
      lines: [
        { say: 'Line one passes through one, two, and four, eight. Line two passes through zero, five, and six, two. Are they parallel, perpendicular, or neither?', show: ['pair.grid', 'pair.axes', 'pair.p1', 'pair.p2'] },
        { say: 'The slope of line one is eight minus two, over four minus one: six over three, which is two.', show: ['m.0', 'pair.l1'], focus: ['m.0', 'pair.l1'] },
        { say: 'The slope of line two is two minus five, over six minus zero: negative three over six, which is negative one half.', show: ['m.1', 'pair.l2'], focus: ['m.1', 'pair.l2'] },
        { say: 'The slopes are not equal, so the lines are not parallel. But their product is negative one, so the lines are perpendicular.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Three outcomes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Slopes', 'The lines are'],
          rows: [
            ['equal, like $\\tfrac23$ and $\\tfrac23$', 'parallel'],
            ['product $-1$, like $2$ and $-\\tfrac12$', 'perpendicular'],
            ['anything else, like $3$ and $-3$', 'neither'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Opposite is not enough', md: 'Slopes of $3$ and $-3$ have opposite signs, but $3 \\times (-3) = -9$. These lines are neither parallel nor perpendicular.' },
      ],
      lines: [
        { say: 'So there are three outcomes. If the slopes are equal, the lines are parallel.', show: 't.0', focus: 't.0' },
        { say: 'If the product of the slopes is negative one, the lines are perpendicular.', show: 't.1', focus: 't.1' },
        { say: 'Anything else, and the lines are neither.', show: 't.2', focus: 't.2' },
        { say: 'Slopes of three and negative three have opposite signs, but three times negative three is negative nine, not negative one. Those lines are neither parallel nor perpendicular.', show: 'oops' },
      ],
    },
    {
      chapter: 'Finding an unknown',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Line 1 has slope $\\tfrac23$. Line 2 passes through $(1, 4)$ and $(5, k)$. Find $k$ so the lines are perpendicular.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['m_2 = -\\dfrac32', '\\dfrac{k - 4}{5 - 1} = -\\dfrac32', '\\dfrac{k - 4}{4} = -\\dfrac64', 'k - 4 = -6, \\quad k = -2'] },
      ],
      lines: [
        { say: 'Line one has a slope of two thirds. Line two passes through one, four, and five, k. Find k, so the lines are perpendicular.', show: 'q' },
        { say: 'For the lines to be perpendicular, line two needs the negative reciprocal slope: negative three halves.', show: 'm.0', focus: 'm.0' },
        { say: 'Set the slope formula equal to negative three halves. The run is five minus one, which is four.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative three halves is the same as negative six quarters. So k minus four is negative six, and k is negative two.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Line 1 has slope $3$. Line 2 passes through $(2, k)$ and $(4, 1)$. Find $k$ so the lines are parallel.',
          choices: ['$k = -5$', '$k = 7$', '$k = 5$', '$k = -7$'],
          answer: 0,
          working: 'Parallel lines have equal slopes: $\\dfrac{1 - k}{4 - 2} = 3$, so $1 - k = 6$ and $k = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Line one has a slope of three. Line two passes through two, k, and four, one. Find k, so the lines are parallel. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Parallel lines have equal slopes, so one minus k, over four minus two, equals three. Then one minus k is six, and k is negative five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find both slopes first.', 'Equal: parallel. Product $-1$: perpendicular. Otherwise: neither.', 'To find an unknown, set the slope formula equal to the slope you need.'] }],
      lines: [
        { say: "Let's sum up. To classify two lines, find both slopes first.", show: 'sum.0' },
        { say: 'Equal slopes mean parallel, a product of negative one means perpendicular, and anything else means neither.', show: 'sum.1' },
        { say: 'And to find an unknown, set the slope formula equal to the slope you need. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
