import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-3, 4], y: [-1, 10], every: 2 });

const video: Explainer = {
  id: 'm10c-7-1',
  lessonId: 'm10c-7-1',
  title: 'Slope-Intercept Form, Part 1: Reading m and b',
  thumbnailTitle: 'Slope-Intercept Form',
  thumbnail: 'mb',
  summary: 'Why y = mx + b shows the slope and the y-intercept, reading m and b from an equation (including fractions and horizontal lines), and solving for y first. Part 2 graphs lines and writes equations from graphs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.1 · Part 1', title: 'Slope-Intercept Form', subtitle: 'Reading $m$ and $b$' }],
      lines: [
        { say: 'Every non-vertical line can be described by two numbers: how steep it is, and where it crosses the y axis.', show: 'title' },
        { say: 'Slope-intercept form puts both numbers right in the equation. In this video, you will read them. In part two, you will graph lines and write their equations.' },
      ],
    },
    {
      chapter: 'Slope and intercept',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('mb', [
          g,
          plot(g, { id: 'line', f: (x) => 2 * x + 3 }),
          polyline(g, { id: 's1', points: [[0, 3], [1, 3], [1, 5]], tone: 'opp', dashed: true }),
          polyline(g, { id: 's2', points: [[1, 5], [2, 5], [2, 7]], tone: 'opp', labels: ['+1', '+2'], sides: ['right', 'right'], dashed: true }),
          dots(g, [{ id: 'b', x: 0, y: 3, tex: '(0,\\,3)', tone: 'adj', place: 'left' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 2x + 3', 'x = 0\\text{: } y = 2(0) + 3 = 3', '\\text{each } {+1} \\text{ in } x\\text{: } {+2} \\text{ in } y'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Slope-intercept form', md: '$y = mx + b$, where $m$ is the **slope** and $b$ is the **$y$-intercept**: the line passes through $(0, b)$.' },
      ],
      lines: [
        { say: 'Here is the line y equals two x plus three.', show: ['m.0', 'mb.grid', 'mb.axes', 'mb.line'] },
        { say: 'When x is zero, y is two times zero plus three, which is three. So the line crosses the y axis at zero, three.', show: ['m.1', 'mb.b'], focus: ['m.1', 'mb.b'] },
        { say: 'And each time x goes up by one, y goes up by two: a constant rate of change. So the slope is two.', show: ['m.2', 'mb.s1', 'mb.s2'], focus: ['m.2', 'mb.s1', 'mb.s2'] },
        { say: 'This is slope-intercept form: y equals m x plus b. m is the slope, and b is the y intercept, so the line passes through zero, b.', show: 'def' },
      ],
    },
    {
      chapter: 'Reading m and b',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['y = -3x + 7 \\;\\to\\; m = -3,\\ b = 7', 'y = \\tfrac{x}{2} - 4 = \\tfrac12 x - 4 \\;\\to\\; m = \\tfrac12,\\ b = -4', 'y = 5 = 0x + 5 \\;\\to\\; m = 0,\\ b = 5'],
        },
      ],
      lines: [
        { say: 'Read the slope and y intercept of y equals negative three x plus seven. The slope is the coefficient of x, negative three, and b is seven.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, y equals x over two, minus four. x over two is one half x, so m is one half, and b is negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'And y equals five is the same as zero x plus five. So m is zero, and b is five: a horizontal line.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Solve for y first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4x + 2y = 10', '2y = -4x + 10', 'y = -2x + 5', 'm = -2, \\quad b = 5'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the sign of b', md: 'In $y = 3x - 8$, the $y$-intercept is $-8$, not $8$.' },
      ],
      lines: [
        { say: 'An equation must be solved for y before you can read m and b. Find the slope and y intercept of four x plus two y equals ten.', show: 'm.0' },
        { say: 'Subtract four x from both sides: two y equals negative four x plus ten.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide every term by two: y equals negative two x plus five.', show: 'm.2', focus: 'm.2' },
        { say: 'So m is negative two, and b is five.', show: 'm.3', focus: 'm.3' },
        { say: 'And keep the sign. In y equals three x minus eight, the y intercept is negative eight, not eight.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the slope and $y$-intercept of $6x - 3y = 12$?',
          choices: ['$m = 2,\\ b = -4$', '$m = 6,\\ b = 12$', '$m = -2,\\ b = 4$', '$m = 2,\\ b = 4$'],
          answer: 0,
          working: '$-3y = -6x + 12$, so $y = 2x - 4$: $m = 2$ and $b = -4$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the slope and y intercept of six x minus three y equals twelve? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract six x: negative three y equals negative six x plus twelve. Divide by negative three: y equals two x minus four. So m is two, and b is negative four. B reads the numbers before solving for y.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = mx + b$: $m$ is the slope and $b$ is the $y$-intercept.', 'Solve for $y$ before reading $m$ and $b$.', 'Keep the sign of $b$.'] }],
      lines: [
        { say: "Let's sum up. In y equals m x plus b, m is the slope, and b is the y intercept.", show: 'sum.0' },
        { say: 'Solve for y before you read m and b.', show: 'sum.1' },
        { say: 'And keep the sign of b. In part two, we graph lines and write their equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
