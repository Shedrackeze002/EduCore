import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 7], y: [0, 1.2], yStep: 0.2, width: 7, height: 5, titles: { x: 'n', y: 'S_n' } });
const sums = [0.5, 0.75, 0.875, 0.9375, 0.96875, 0.984375];

const video: Explainer = {
  id: 'm201-1-5',
  lessonId: 'm201-1-5',
  title: 'Infinite Geometric Series, Part 1: Converging to a Sum',
  thumbnailTitle: 'Infinite Geometric Series',
  thumbnail: 'conv',
  summary: 'Walking half way to a wall forever, partial sums that approach 1, series that converge or diverge, the test |r| < 1, and why the sum of a converging geometric series is t₁/(1 − r). Part 2 covers negative ratios, ratios with a variable, bouncing balls and repeating decimals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.5 · Part 1', title: 'Infinite Geometric Series', subtitle: 'Infinitely many terms, one finite sum' }],
      lines: [
        { say: 'Walk halfway to a wall, then half of the remaining distance, then half of what is left, and so on forever. You take infinitely many steps, yet you never travel more than the distance to the wall.', show: 'title' },
        { say: 'Some infinite sums really do have a finite value. In this video, you will see when, and find it.' },
      ],
    },
    {
      chapter: 'Partial sums',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('conv', [
          g,
          plot(g, { id: 'limit', f: () => 1, tone: 'good', dashed: true, label: 'S = 1', labelAt: 0.9 }),
          dots(g, sums.map((s, i) => ({ id: `p${i}`, x: i + 1, y: s, tone: 'adj', group: 'pts' }))),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots', 'S_1 = 0.5,\\ S_2 = 0.75,\\ S_3 = 0.875', 'S_4 = 0.9375,\\ S_5 = 0.96875'] }],
      lines: [
        { say: 'In units of the distance to the wall, the steps are one half, plus one quarter, plus one eighth, and so on.', show: ['m.0', 'conv.grid', 'conv.axes'] },
        { say: 'Look at the partial sums: 0.5, then 0.75, then 0.875, 0.9375, and 0.96875.', show: ['m.1', 'm.2', 'conv.pts'], focus: 'conv.pts' },
        { say: 'Each one closes half of the gap that is left. The partial sums get closer and closer to one, but never pass it.', show: 'conv.limit', focus: 'conv.limit' },
      ],
    },
    {
      chapter: 'Converge or diverge',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Converge and diverge', md: 'An infinite series **converges** if its partial sums approach a single finite value, its **sum**. Otherwise it **diverges**.' },
        { kind: 'table', id: 't', head: ['Series', 'Ratio', 'Partial sums'], rows: [['$1 + 2 + 4 + 8 + \\cdots$', '$r = 2$', '[[bad:grow without bound]]'], ['$5 - 5 + 5 - 5 + \\cdots$', '$r = -1$', '[[bad:5, 0, 5, 0, … never settle]]'], ['$\\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots$', '$r = \\frac{1}{2}$', '[[good:approach 1]]']] },
      ],
      lines: [
        { say: 'An infinite series converges if its partial sums approach a single finite value, called its sum. Otherwise, it diverges.', show: 'def' },
        { say: 'One plus two plus four plus eight, with r equal to two: the partial sums grow without bound. It diverges.', show: 't.0', focus: 't.0' },
        { say: 'Five minus five plus five minus five, with r equal to negative one: the partial sums go five, zero, five, zero, and never settle. It diverges too.', show: 't.1', focus: 't.1' },
        { say: 'But with r equal to one half, the terms shrink toward zero, and the partial sums approach one. It converges.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'The test and the sum',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{converges when } |r| < 1, \\text{ that is, } {-1} < r < 1', 'S_n = \\dfrac{t_1(1 - r^n)}{1 - r} \\;\\to\\; \\dfrac{t_1(1 - 0)}{1 - r}', 'S_\\infty = \\dfrac{t_1}{1 - r}'] },
      ],
      lines: [
        { say: 'So an infinite geometric series converges when the absolute value of r is less than one: when r is between negative one and one. It diverges when the absolute value of r is one or more.', show: 'm.0', focus: 'm.0' },
        { say: 'Now find the sum. Start from the partial sum, written as t sub one times one minus r to the n, over one minus r.', show: 'm.1' },
        { say: 'When the absolute value of r is less than one, r to the n gets closer and closer to zero as n grows. 0.5 to the tenth is about 0.001, and 0.5 to the twentieth is about one millionth.', focus: 'm.1' },
        { say: 'So the numerator approaches t sub one, and the sum is t sub one over one minus r.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = \\dfrac{12}{24} = \\dfrac{1}{2},\\quad |r| < 1', 'S_\\infty = \\dfrac{24}{1 - \\frac{1}{2}} = \\dfrac{24}{\\frac{1}{2}} = 48'] }],
      lines: [
        { say: 'Find the sum of 24 plus twelve plus six, and so on. First, check that it converges: r is twelve over 24, one half, which is between negative one and one.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the sum is 24 over one minus one half: 24 over one half, which is 48.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which infinite geometric series converges?',
          choices: ['$9 + 3 + 1 + \\cdots$', '$2 + 4 + 8 + \\cdots$', '$3 - 3 + 3 - \\cdots$', '$1 + 1.5 + 2.25 + \\cdots$'],
          answer: 0,
          working: 'Its ratio is $\\frac{1}{3}$, and $|r| < 1$. The others have $r = 2$, $r = -1$ and $r = 1.5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which infinite geometric series converges? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Its ratio is one third, which is between negative one and one. The others have ratios of two, negative one, and 1.5, so they diverge.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A series converges if its partial sums approach a finite value.', 'A geometric series converges exactly when $|r| < 1$.', 'Then $S_\\infty = \\dfrac{t_1}{1 - r}$, because $r^n \\to 0$.'] }],
      lines: [
        { say: 'Let’s sum up. An infinite series converges if its partial sums approach a finite value. Otherwise, it diverges.', show: 'sum.0' },
        { say: 'An infinite geometric series converges exactly when the absolute value of r is less than one.', show: 'sum.1' },
        { say: 'And then its sum is t sub one over one minus r. In part two, we use it with negative ratios, bouncing balls and repeating decimals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
