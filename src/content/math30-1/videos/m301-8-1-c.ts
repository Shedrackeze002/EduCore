import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

const lens = plane({ x: [0, 60], y: [0, 60], xStep: 10, yStep: 10, titles: { x: 'd\\text{ (cm)}', y: 'd_i\\text{ (cm)}' } });
// Stretched upward, so the small values near x = 1 can be seen.
const g = plane({ x: [-6, 6], y: [-3, 3], yStep: 0.5, every: 0, width: 12, height: 12 });

const video: Explainer = {
  id: 'm301-8-1-c',
  lessonId: 'm301-8-1',
  title: 'Exploring Rational Functions, Part 3: Horizontal Asymptotes',
  thumbnailTitle: 'Horizontal Asymptotes',
  thumbnail: 'ln',
  summary: 'Finding the horizontal asymptote of a rational function from its end behaviour, by dividing by the highest power of x and by comparing the degrees of the numerator and denominator, what the asymptotes of a lens equation mean, and why a graph can cross its horizontal asymptote.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.1 · Part 3', title: 'Horizontal Asymptotes', subtitle: 'Compare the degrees' }],
      lines: [
        { say: 'What happens to a rational function far out to the left and to the right? Its graph may settle down toward a horizontal line, or it may not settle at all.', show: 'title' },
        { say: 'In this video, you will find the horizontal asymptote by comparing the degrees of the numerator and the denominator, and see what it means in a real situation.' },
      ],
    },
    {
      chapter: 'End behaviour',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{2x^2 + 3x - 1}{x^2 - 4} = \\dfrac{2 + \\frac{3}{x} - \\frac{1}{x^2}}{1 - \\frac{4}{x^2}}', '\\to \\dfrac{2 + 0 - 0}{1 - 0} = 2'],
        },
        { kind: 'table', id: 't', head: ['$x$', '$10$', '$100$', '$1000$'], rows: [['$\\dfrac{2x^2 + 3x - 1}{x^2 - 4}$', '$2.385$', '$2.031$', '$2.003$']] },
      ],
      lines: [
        { say: 'The horizontal asymptote describes the end behaviour: what f of x approaches as x gets very large, either positive or negative.' },
        { say: 'Take two x squared plus three x minus one, over x squared minus four. Divide every term, top and bottom, by the highest power of x in the denominator: x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'That gives two, plus three over x, minus one over x squared, all over one, minus four over x squared.' },
        { say: 'As x grows, three over x, one over x squared and four over x squared all shrink toward zero. So the fraction approaches two over one, which is two.', show: 'm.1', focus: 'm.1' },
        { say: 'A table agrees. At x equals ten, the value is 2.385. At one hundred, it is 2.031, and at one thousand, 2.003. The values close in on two, so the horizontal asymptote is y equals two.', show: 't' },
      ],
    },
    {
      chapter: 'Comparing degrees',
      layout: 'center',
      main: [
        { kind: 'text', id: 'intro', md: 'Degree of the numerator $n$, degree of the denominator $d$:', size: 'md', align: 'center' },
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$n < d$: the horizontal asymptote is $y = 0$.',
            '$n = d$: the horizontal asymptote is $y = \\dfrac{\\text{leading coefficient of the numerator}}{\\text{leading coefficient of the denominator}}$.',
            '$n > d$: there is no horizontal asymptote.',
          ],
        },
      ],
      lines: [
        { say: 'You do not need to divide every time. Compare the degree of the numerator, n, with the degree of the denominator, d.', show: 'intro' },
        { say: 'If the numerator has the lower degree, the denominator grows faster, and the fraction shrinks toward zero. The horizontal asymptote is y equals zero.', show: 'b.0', focus: 'b.0' },
        { say: 'If the degrees are equal, the leading terms take over. The asymptote is the leading coefficient of the numerator, over the leading coefficient of the denominator. That is why the last example gave two over one.', show: 'b.1', focus: 'b.1' },
        { say: 'If the numerator has the higher degree, the values keep growing, and there is no horizontal asymptote.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Two examples',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'g(x) = \\dfrac{3x - 6}{x^2 + 2x}:\\quad \\text{degree } 1 \\text{ over degree } 2',
            'y = 0',
            'h(x) = \\dfrac{4x^2 - 1}{2x^2 + x - 3}:\\quad \\text{degree } 2 \\text{ over degree } 2',
            'y = \\dfrac{4}{2} = 2',
          ],
        },
      ],
      lines: [
        { say: 'Find the horizontal asymptote of g of x equals three x minus six, over x squared plus two x.', show: 'm.0', focus: 'm.0' },
        { say: 'The numerator has degree one, and the denominator has degree two. The numerator has the lower degree, so the horizontal asymptote is y equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Now h of x equals four x squared minus one, over two x squared plus x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Both have degree two. The leading coefficients are four and two, so the horizontal asymptote is y equals four over two, which is two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Asymptotes in context',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('ln', [
          lens,
          vAsym(lens, 'va', 10),
          hAsym(lens, 'ha', 10),
          tag(lens, 'va-name', 10, 4, 'd = 10', 'right'),
          tag(lens, 'ha-name', 60, 10, 'd_i = 10', 'below left'),
          branches(lens, { id: 'c', f: (d) => (10 * d) / (d - 10), from: 10.0001 }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d_i = \\dfrac{10d}{d - 10}', 'd \\to 10:', '\\quad d_i \\text{ grows without bound}', 'd \\text{ large}:\\ d_i \\to \\dfrac{10}{1} = 10'] }],
      lines: [
        { say: 'Asymptotes have meaning in context. For a lens with a focal length of ten centimetres, the image distance, d sub i, is ten d over d minus ten, where d is the object distance, in centimetres.', show: ['ln.grid', 'ln.axes', 'ln.c', 'm.0'], focus: 'm.0' },
        { say: 'As the object moves toward ten centimetres, the denominator approaches zero, and the image runs off without bound. That is the vertical asymptote d equals ten: the blur in the magnifying glass.', show: ['m.1', 'm.2', 'ln.va', 'ln.va-name'], focus: ['m.1', 'm.2', 'ln.va'] },
        { say: 'For very distant objects, the degrees are equal, so the image distance approaches ten over one: ten centimetres. That is the horizontal asymptote.', show: ['m.3', 'ln.ha', 'ln.ha-name'], focus: ['m.3', 'ln.ha'] },
      ],
    },
    {
      chapter: 'Crossing a horizontal asymptote',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('cr', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va1', -2),
          vAsym(g, 'va2', 2),
          tag(g, 'va1-name', -2, 2.7, 'x = -2', 'left'),
          tag(g, 'va2-name', 2, -2.6, 'x = 2', 'right'),
          branches(g, { id: 'c', f: (x) => (x - 1) / (x * x - 4), breaks: [-2, 2] }),
          dots(g, [{ id: 'X', x: 1, y: 0, tone: 'opp' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{x - 1}{x^2 - 4}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A graph can cross its horizontal asymptote', md: 'A vertical asymptote is never crossed, but a horizontal asymptote only describes the **ends** of the graph.' },
      ],
      lines: [
        { say: 'One more thing. A vertical asymptote is never crossed, because the function is undefined there. But a horizontal asymptote only describes the ends of the graph.', show: 'tip' },
        { say: 'For example, y equals x minus one, over x squared minus four, has degree one over degree two, so its horizontal asymptote is y equals zero: the x-axis.', show: ['cr.grid', 'cr.axes', 'cr.va1', 'cr.va2', 'cr.va1-name', 'cr.va2-name', 'cr.c', 'm'], focus: 'm' },
        { say: 'Yet the graph crosses y equals zero at x equals one, where its numerator is zero.', show: 'cr.X', focus: 'cr.X' },
        { say: 'Far to the left and far to the right, though, it still settles down toward zero.', focus: 'cr.c' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the horizontal asymptote of $f(x) = \\dfrac{6x^2 + 1}{3x^2 - 2x}$?',
          choices: ['$y = 2$', '$y = 0$', '$y = 6$', 'There is none.'],
          answer: 0,
          working: 'Both have degree $2$, so the asymptote is the ratio of the leading coefficients: $y = \\dfrac{6}{3} = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the horizontal asymptote of f of x equals six x squared plus one, over three x squared minus two x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The numerator and the denominator both have degree two, so the asymptote is the ratio of the leading coefficients: six over three, which is two. B would be right only if the numerator had the lower degree.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'The horizontal asymptote describes the end behaviour, as $|x|$ grows.',
            '$n < d$: $y = 0$. $n = d$: the ratio of the leading coefficients. $n > d$: none.',
            'A graph can cross its horizontal asymptote, but never a vertical one.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The horizontal asymptote describes the end behaviour: what the function approaches as x grows, to the left or to the right.', show: 'sum.0' },
        { say: 'Compare the degrees. A lower degree on top gives y equals zero. Equal degrees give the ratio of the leading coefficients. A higher degree on top gives no horizontal asymptote.', show: 'sum.1' },
        { say: 'And a graph can cross its horizontal asymptote, but never a vertical one. In part four, we put everything together: the domain, the holes, the asymptotes and the intercepts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
