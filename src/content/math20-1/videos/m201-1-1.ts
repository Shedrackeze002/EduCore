import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 7], y: [0, 28], yStep: 4, width: 7, height: 6, titles: { x: 'n', y: 't_n' } });

const video: Explainer = {
  id: 'm201-1-1',
  lessonId: 'm201-1-1',
  title: 'Arithmetic Sequences, Part 1: The General Term',
  thumbnailTitle: 'Arithmetic Sequences',
  thumbnail: 'seq',
  summary: 'Sequences and terms, the common difference d of an arithmetic sequence, its graph as points on a line of slope d, and the general term tₙ = t₁ + (n − 1)d, simplified to a linear function of n. Part 2 finds missing terms, positions and counts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.1 · Part 1', title: 'Arithmetic Sequences', subtitle: 'The same step every time' }],
      lines: [
        { say: 'Rows of seats in a theatre, a savings account that grows by the same deposit every week, the distance a falling stone drops each second: each one changes by the same amount at every step.', show: 'title' },
        { say: 'In this video, you will find the common difference, and write a general term that jumps straight to the hundredth term.' },
      ],
    },
    {
      chapter: 'Common differences',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arithmetic sequence', md: 'An ordered list of numbers (**terms** $t_1, t_2, t_3, \\ldots$) where each term after the first adds the same **common difference**: $d = t_n - t_{n-1}$.' },
        { kind: 'table', id: 't', head: ['Sequence', 'Common difference'], rows: [['$5,\\ 9,\\ 13,\\ 17,\\ \\ldots$', '$d = 9 - 5 = 4$'], ['$20,\\ 14,\\ 8,\\ 2,\\ \\ldots$', '$d = 14 - 20 = -6$'], ['$\\frac{1}{2},\\ \\frac{5}{4},\\ 2,\\ \\frac{11}{4},\\ \\ldots$', '$d = \\frac{5}{4} - \\frac{1}{2} = \\frac{3}{4}$']] },
      ],
      lines: [
        { say: 'A sequence is an ordered list of terms: t sub one is the first, and t sub n is the term in position n.' },
        { say: 'In an arithmetic sequence, each term after the first is found by adding the same number, the common difference d. To find d, subtract any term from the term after it.', show: 'def' },
        { say: 'In five, nine, thirteen, seventeen, the common difference is nine minus five: four.', show: 't.0', focus: 't.0' },
        { say: 'In twenty, fourteen, eight, two, it is fourteen minus twenty: negative six. A negative common difference means the terms go down.', show: 't.1', focus: 't.1' },
        { say: 'And d does not have to be a whole number. Here, five quarters minus one half is three quarters.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('seq', [
          g,
          plot(g, { id: 'line', f: (n) => 4 * n - 1, from: 0.5, to: 6.8, tone: 'muted', dashed: true }),
          dots(g, [3, 7, 11, 15, 19, 23].map((t, i) => ({ id: `p${i}`, x: i + 1, y: t, tone: 'adj', group: 'pts' }))),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['The domain is $n = 1, 2, 3, \\ldots$', 'The points lie on a line with slope $d$.', 'Plot dots only: there is no term $2.5$.'] }],
      lines: [
        { say: 'A sequence is a function whose domain is the natural numbers: one, two, three, and so on.', show: ['seq.grid', 'seq.axes', 'b.0'] },
        { say: 'Plot each term against its position. For three, seven, eleven, fifteen, the points go up four for every one across: a line with slope four, the common difference.', show: ['seq.pts', 'seq.line', 'b.1'], focus: 'seq.pts' },
        { say: 'But the graph is only the dots. There is no term number 2.5, so we do not join them with a solid line.', show: 'b.2' },
      ],
    },
    {
      chapter: 'The general term',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['t_1,\\quad t_1 + d,\\quad t_1 + 2d,\\quad t_1 + 3d,\\quad \\ldots', 't_n = t_1 + (n - 1)d', 't_{40} = 5 + (40 - 1)(4) = 5 + 156 = 161'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying d by n', md: '$5 + 40(4) = 165$ adds $d$ one time too many. The first term already counts as one step, so there are $n - 1$ jumps.' },
      ],
      lines: [
        { say: 'Start at t sub one, and keep adding d: t sub one plus d, then plus two d, then plus three d.', show: 'm.0', focus: 'm.0' },
        { say: 'To reach term n, you add d exactly n minus one times. So the general term is t sub n equals t sub one, plus n minus one, times d.', show: 'm.1', focus: 'm.1' },
        { say: 'Find t sub forty for five, nine, thirteen. t sub one is five and d is four, so t sub forty is five plus 39 times four: five plus 156, which is 161.', show: 'm.2', focus: 'm.2' },
        { say: 'Do not multiply d by n: five plus forty times four adds d one time too many.', show: 'oops' },
      ],
    },
    {
      chapter: 'Simplified form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['t_n = 20 + (n - 1)(-6)', '= 20 - 6n + 6 = -6n + 26', 't_2 = -6(2) + 26 = 14 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A linear function in disguise', md: 'Expanding always gives $t_n = dn + (t_1 - d)$: a linear function of $n$ whose slope is the common difference.' },
      ],
      lines: [
        { say: 'Write the general term of twenty, fourteen, eight, two, in simplified form. t sub one is twenty, and d is negative six.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand: twenty minus six n plus six. So t sub n equals negative six n, plus 26.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with a term you know: t sub two is negative twelve plus 26, which is fourteen. It matches.', show: 'm.2', focus: 'm.2' },
        { say: 'Expanding always gives d n plus a constant: a linear function of n with slope d. That is why the points lie on a line.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $t_{25}$ for the arithmetic sequence $7,\\ 10,\\ 13,\\ \\ldots$',
          choices: ['$79$', '$82$', '$75$', '$72$'],
          answer: 0,
          working: '$t_1 = 7$ and $d = 3$: $t_{25} = 7 + (25 - 1)(3) = 7 + 72 = 79$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find t sub 25 for the arithmetic sequence seven, ten, thirteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. t sub one is seven and d is three, so t sub 25 is seven plus 24 times three: seven plus 72, which is 79. B multiplies d by 25 instead of 24.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An arithmetic sequence adds the same common difference $d = t_n - t_{n-1}$.', 'General term: $t_n = t_1 + (n - 1)d$.', 'It simplifies to a linear function of $n$ with slope $d$.'] }],
      lines: [
        { say: 'Let’s sum up. An arithmetic sequence adds the same common difference at every step.', show: 'sum.0' },
        { say: 'Its general term is t sub n equals t sub one, plus n minus one, times d.', show: 'sum.1' },
        { say: 'And it simplifies to a linear function of n, with slope d. In part two, we find missing terms, positions and counts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
