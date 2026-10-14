import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 10], y: [0, 12], every: 2 });
const data: [number, number][] = [[1, 3], [2, 3.5], [3, 5.5], [4, 6], [5, 6.5], [6, 8.5], [7, 9], [8, 9.5]];

const video: Explainer = {
  id: 'm10c-7-5-b',
  lessonId: 'm10c-7-5',
  title: 'Lines of Best Fit, Part 2: Equations and Predictions',
  thumbnailTitle: 'Predicting with a Line of Best Fit',
  thumbnail: 'eq',
  summary: 'Writing the equation of a line of best fit from two points on the line, and using it to predict by interpolation within the data and by extrapolation beyond it, which is less reliable.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 7.5 · Part 2', title: 'Equations and Predictions', subtitle: 'Using a line of best fit' }],
      lines: [
        { say: 'A line of best fit is useful because you can write its equation, and then make predictions.', show: 'title' },
        { say: 'In this video, you will write the equation of a line of best fit, and decide how far to trust a prediction.' },
      ],
    },
    {
      chapter: 'The equation',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('eq', [
          g,
          dots(g, data.map(([x, y], i) => ({ id: `d${i}`, x, y, tone: 'muted', group: 'pts' }))),
          plot(g, { id: 'line', f: (x) => x + 2, tone: 'opp' }),
          dots(g, [
            { id: 'A', x: 0, y: 2, tex: '(0,\\,2)', tone: 'adj', place: 'right' },
            { id: 'B', x: 8, y: 10, tex: '(8,\\,10)', tone: 'adj', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['m = \\dfrac{10 - 2}{8 - 0} = 1', 'b = 2', 'y = x + 2'] }],
      lines: [
        { say: 'To write the equation of a line of best fit, choose two points on the line that are far apart and easy to read. They do not need to be data points.', show: ['eq.grid', 'eq.axes', 'eq.pts', 'eq.line'] },
        { say: 'This line passes through zero, two, and eight, ten. The slope is ten minus two, over eight minus zero, which is one.', show: ['eq.A', 'eq.B', 'm.0'], focus: ['eq.A', 'eq.B', 'm.0'] },
        { say: 'The line crosses the y axis at two, so b is two. The equation is y equals x plus two.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Predictions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Interpolation and extrapolation', md: '**Interpolation** predicts a value **within** the range of the data. **Extrapolation** predicts **beyond** it, and is less reliable.' },
        { kind: 'math', id: 'm', lines: ['x = 5.5\\text{: } y = 7.5 \\quad \\good{\\text{interpolation}}', 'x = 15\\text{: } y = 17 \\quad \\bad{\\text{extrapolation}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not too far', md: 'A model of a child’s height from age 3 to 10 should not predict their height at age 40.' },
      ],
      lines: [
        { say: 'Interpolation predicts a value within the range of the data. Extrapolation predicts beyond it.', show: 'def' },
        { say: 'The data were collected from x equals one to x equals eight. At x equals 5.5, y is 7.5. That is interpolation, so it is fairly reliable.', show: 'm.0', focus: 'm.0' },
        { say: 'At x equals fifteen, y is seventeen. That is extrapolation, so use it with caution: the trend may not continue.', show: 'm.1', focus: 'm.1' },
        { say: 'For example, a model of a child’s height from age three to ten should not be used to predict their height at age forty.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A line of best fit for data from $x = 1$ to $x = 10$ is $y = 2x + 3$. Predict $y$ when $x = 6$.',
          choices: ['$y = 15$, by interpolation', '$y = 15$, by extrapolation', '$y = 11$, by interpolation', '$y = 9$, by interpolation'],
          answer: 0,
          working: '$y = 2(6) + 3 = 15$. Since $6$ is between $1$ and $10$, this is interpolation.',
        },
      ],
      lines: [
        { say: 'Your turn. A line of best fit for data from x equals one to x equals ten is y equals two x plus three. Predict y when x is six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two times six plus three is fifteen. And six is between one and ten, so this is interpolation.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use two points on the line, far apart, to write its equation.', 'Interpolation is within the data; extrapolation is beyond it.', 'Extrapolation is less reliable.'] }],
      lines: [
        { say: 'Let’s sum up. Use two points on the line, far apart, to write its equation.', show: 'sum.0' },
        { say: 'Interpolation predicts within the data, and extrapolation predicts beyond it.', show: 'sum.1' },
        { say: 'And extrapolation is less reliable, because the trend may not continue. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
