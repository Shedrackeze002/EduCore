import type { Explainer } from '@/video/script.ts';
import { plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-2, 8], y: [-2, 8], every: 2, width: 9, height: 9 });
const log2 = (x: number) => (x > 0 ? Math.log2(x) : NaN);

/** Names for the two asymptotes, beside them and clear of the curves. */
const names: Part = {
  points: { ha: g.map(7.9, 1), va: g.map(1, 7.9) },
  items: [
    { kind: 'label', id: 'ha-name', at: 'ha', tex: 'y = 1', tone: 'theta', place: 'above left' },
    { kind: 'label', id: 'va-name', at: 'va', tex: 'x = 1', tone: 'theta', place: 'below right' },
  ],
};

const video: Explainer = {
  id: 'm301-7-5-c',
  lessonId: 'm301-7-5',
  title: 'Transformations of Logarithmic Functions, Part 3: Intercepts, Domains and Inverses',
  thumbnailTitle: 'Intercepts, Domains and Inverses',
  thumbnail: 'as',
  summary: 'Finding the x-intercept of y = 2 log₃(x + 1) − 4, the domain of y = log(6 − 2x), and the inverse of y = 2^(x − 3) + 1, whose horizontal asymptote y = 1 becomes the vertical asymptote x = 1 of the inverse.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.5 · Part 3', title: 'Intercepts, Domains and Inverses', subtitle: 'Isolate, then convert' }],
      lines: [
        { say: 'Where does a logarithmic graph cross the x-axis? Which x-values can it use? What is its inverse? All three questions come down to the same moves: isolate, then convert between logarithmic and exponential form.', show: 'title' },
        { say: 'In this video, you will find an x-intercept, a domain, and the inverse of a transformed exponential function.' },
      ],
    },
    {
      chapter: 'An x-intercept',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['0 = 2\\log_{3}(x + 1) - 4', '\\log_{3}(x + 1) = 2', 'x + 1 = 3^{2} = 9', 'x = 8'] },
      ],
      lines: [
        { say: 'Find the x-intercept of y equals two log base three of x plus one, minus four. On the x-axis, y is zero, so set y equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Isolate the logarithm. Add four to both sides, then divide by two: log base three of x plus one equals two.', show: 'm.1', focus: 'm.1' },
        { say: 'Convert to exponential form: x plus one equals three squared, which is nine.', show: 'm.2', focus: 'm.2' },
        { say: 'So x equals eight. The x-intercept is eight, which matches the point at eight, zero, that we plotted on this graph in part two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A domain',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\log(6 - 2x)', '6 - 2x > 0', '-2x > -6', 'x < 3'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Dividing by a negative', md: 'Dividing both sides of an inequality by a negative number reverses the inequality sign.' },
      ],
      lines: [
        { say: 'State the domain of y equals log of six minus two x.', show: 'm.0', focus: 'm.0' },
        { say: 'The argument must be positive, so six minus two x is greater than zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract six from both sides: negative two x is greater than negative six.', show: 'm.2', focus: 'm.2' },
        { say: 'Now divide by negative two. Dividing an inequality by a negative number reverses the sign. So x is less than three. The domain is all real x less than three.', show: ['m.3', 'tip'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'An inverse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2^{x - 3} + 1', '\\text{interchange: } x = 2^{y - 3} + 1', 'x - 1 = 2^{y - 3}', 'y - 3 = \\log_{2}(x - 1)', 'y = \\log_{2}(x - 1) + 3'] },
      ],
      lines: [
        { say: 'Find the inverse of y equals two to the power x minus three, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Interchange x and y: x equals two to the power y minus three, plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Isolate the power. Subtract one from both sides: x minus one equals two to the power y minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Convert to logarithmic form. The base is two, and the exponent is y minus three: so y minus three equals log base two of x minus one.', show: 'm.3', focus: 'm.3' },
        { say: 'Add three: the inverse is y equals log base two of x minus one, plus three.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Asymptotes swap',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('as', [
          g,
          polyline(g, { id: 'yx', points: [[-2, -2], [8, 8]], tone: 'muted', dashed: true }),
          polyline(g, { id: 'ha', points: [[-2, 1], [8, 1]], tone: 'theta', dashed: true }),
          polyline(g, { id: 'va', points: [[1, -2], [1, 8]], tone: 'theta', dashed: true }),
          names,
          plot(g, { id: 'exp', f: (x) => 2 ** (x - 3) + 1, tone: 'muted', samples: 200 }),
          plot(g, { id: 'log', f: (x) => log2(x - 1) + 3, from: 1.0001, to: 8, samples: 400 }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 2^{x - 3} + 1', '\\text{asymptote } y = 1', 'y = \\log_{2}(x - 1) + 3', '\\text{asymptote } x = 1'] }],
      lines: [
        { say: 'The grey curve is y equals two to the power x minus three, plus one. Its horizontal asymptote is y equals one.', show: ['as.grid', 'as.axes', 'as.exp', 'as.ha', 'as.ha-name', 'm.0', 'm.1'], focus: ['as.exp', 'm.0', 'm.1'] },
        { say: 'Its inverse, in purple, is its reflection in the dashed grey line, y equals x.', show: ['as.yx', 'as.log', 'm.2'], focus: ['as.log', 'm.2'] },
        { say: 'Reflecting turns the horizontal asymptote, y equals one, into a vertical asymptote, x equals one. That matches the domain of the inverse: x minus one must be positive, so x is greater than one.', show: ['as.va', 'as.va-name', 'm.3'], focus: ['as.va', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the $x$-intercept of $y = 3\\log_{2}(x + 1) - 6$.',
          choices: ['$x = 1$', '$x = 63$', '$x = 7$', '$x = 3$'],
          answer: 3,
          working: '$0 = 3\\log_{2}(x + 1) - 6$, so $\\log_{2}(x + 1) = 2$. Then $x + 1 = 2^{2} = 4$, and $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the x-intercept of y equals three log base two of x plus one, minus six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Set y to zero and isolate the logarithm: log base two of x plus one equals two. So x plus one is four, and x is three. B forgets to divide by three before converting.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x$-intercept: set $y = 0$, isolate the logarithm, and convert to exponential form.', 'Domain: the argument must be positive. Dividing by a negative reverses the inequality.', 'Inverse: interchange $x$ and $y$, isolate the power, and convert to logarithmic form.', 'The horizontal asymptote $y = k$ becomes the vertical asymptote $x = k$ of the inverse.'] }],
      lines: [
        { say: 'Let’s sum up. To find an x-intercept, set y to zero, isolate the logarithm, and convert to exponential form.', show: 'sum.0' },
        { say: 'For a domain, make the argument positive, and reverse the inequality if you divide by a negative.', show: 'sum.1' },
        { say: 'For an inverse, interchange x and y, isolate the power, and convert to logarithmic form.', show: 'sum.2' },
        { say: 'And a horizontal asymptote becomes a vertical asymptote of the inverse. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
