import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

// Stretched upward, so the labels of the intercept and the hole fit between the axis and the asymptote.
const g = plane({ x: [-7, 7], y: [-3, 5], yStep: 0.5, every: 0, width: 14, height: 14 });

const video: Explainer = {
  id: 'm301-8-2-c',
  lessonId: 'm301-8-2',
  title: 'Analyzing Rational Functions, Part 3: Writing an Equation from a Graph',
  thumbnailTitle: 'An Equation from a Graph',
  thumbnail: 'rd',
  summary: 'Turning the features of a graph into factors: a vertical asymptote into a factor of the denominator, an x-intercept into a factor of the numerator, a hole into a factor of both, and the horizontal asymptote into the constant in front, for a graph with a hole at (4, 1).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.2 · Part 3', title: 'An Equation from a Graph', subtitle: 'Turn each feature into a factor' }],
      lines: [
        { say: 'So far, you have gone from an equation to a graph. Now go the other way: read the features of a graph, and build its equation.', show: 'title' },
        { say: 'In this video, you will turn each feature into a factor, then use the horizontal asymptote to find the constant in front.' },
      ],
    },
    {
      chapter: 'Features into factors',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'A vertical asymptote $x = h$ gives a factor $(x - h)$ in the denominator.',
            'An $x$-intercept $r$ gives a factor $(x - r)$ in the numerator.',
            'A point of discontinuity at $x = a$ gives $(x - a)$ in both.',
            'The horizontal asymptote, or one point on the graph, gives the constant in front.',
          ],
        },
      ],
      lines: [
        { say: 'A vertical asymptote x equals h comes from a factor x minus h that stays in the denominator.', show: 'b.0', focus: 'b.0' },
        { say: 'An x-intercept r comes from a factor x minus r in the numerator, because that factor makes the output zero.', show: 'b.1', focus: 'b.1' },
        { say: 'A point of discontinuity at x equals "a" comes from a factor x minus "a" in both the numerator and the denominator, so that it cancels.', show: 'b.2', focus: 'b.2' },
        { say: 'Finally, the horizontal asymptote, or one point on the graph, tells you the constant in front.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('rd', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va', -2),
          hAsym(g, 'ha', 2),
          tag(g, 'va-name', -2, -2.6, 'x = -2', 'left'),
          tag(g, 'ha-name', 7, 2, 'y = 2', 'above left'),
          branches(g, { id: 'c', f: (x) => (2 * (x - 1)) / (x + 2), breaks: [-2] }),
          dots(g, [
            { id: 'X', x: 1, y: 0, tex: '(1, 0)', tone: 'adj', place: 'below right' },
            { id: 'H', x: 4, y: 1, tex: '(4, 1)', tone: 'opp', place: 'below right', open: true },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = -2,\\quad y = 2', 'x\\text{-intercept: } 1', '\\text{hole: } (4, 1)'] }],
      lines: [
        { say: 'Write an equation for this graph.', show: ['rd.grid', 'rd.axes', 'rd.c', 'rd.X', 'rd.H'] },
        { say: 'It has a vertical asymptote x equals negative two, and a horizontal asymptote y equals two.', show: ['rd.va', 'rd.ha', 'rd.va-name', 'rd.ha-name', 'm.0'], focus: ['rd.va', 'rd.ha', 'm.0'] },
        { say: 'It crosses the x-axis at one.', show: 'm.1', focus: ['rd.X', 'm.1'] },
        { say: 'And it has a point of discontinuity, an open circle, at four, one.', show: 'm.2', focus: ['rd.H', 'm.2'] },
      ],
    },
    {
      chapter: 'Building the equation',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{a(x - 1)(x - 4)}{(x + 2)(x - 4)}',
            '\\text{equal degrees: horizontal asymptote } y = a,\\ \\text{so } a = 2',
            'f(x) = \\dfrac{2(x - 1)(x - 4)}{(x + 2)(x - 4)}',
            '\\text{check: } \\dfrac{2(4 - 1)}{4 + 2} = \\dfrac{6}{6} = 1\\ \\checkmark',
          ],
        },
      ],
      lines: [
        { say: 'Turn each feature into a factor. The asymptote x equals negative two gives x plus two in the denominator. The intercept one gives x minus one in the numerator. And the hole at x equals four gives x minus four in both.' },
        { say: 'Put a constant "a" in front: f of x equals "a" times x minus one, times x minus four, over x plus two, times x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'The numerator and the denominator both have degree two, and the leading coefficients are "a" and one. So the horizontal asymptote is y equals "a". The graph’s horizontal asymptote is y equals two, so "a" equals two.', show: 'm.1', focus: 'm.1' },
        { say: 'So f of x equals two times x minus one, times x minus four, over x plus two, times x minus four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check the hole. The simplified function is two times x minus one, over x plus two. At x equals four, that is two times three, over six: one. That matches the open circle at four, one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Forgetting the constant',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the constant', md: '$f(x) = \\dfrac{(x - 1)(x - 4)}{(x + 2)(x - 4)}$ has the right asymptote, intercept and hole location, but its horizontal asymptote is $y = 1$ and its hole is at $\\left(4, \\tfrac{1}{2}\\right)$. Always check the horizontal asymptote or a point.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4 - 1}{4 + 2} = \\dfrac{3}{6} = \\dfrac{1}{2} \\ne 1'] },
      ],
      lines: [
        { say: 'A common mistake is to leave out the constant.', show: 'oops' },
        { say: 'Without the two, the function has the right vertical asymptote, the right intercept, and a hole at the right x-value.' },
        { say: 'But its horizontal asymptote is y equals one, not two. And its hole is at four, one half, because three over six is one half.', show: 'm', focus: 'm' },
        { say: 'So always check the horizontal asymptote, or a point, before you finish.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A graph has a vertical asymptote $x = 3$, a horizontal asymptote $y = -1$, an $x$-intercept of $-2$ and no holes. Which equation fits?',
          choices: ['$f(x) = \\dfrac{x + 2}{x - 3}$', '$f(x) = \\dfrac{-(x - 2)}{x + 3}$', '$f(x) = \\dfrac{-(x + 3)}{x - 2}$', '$f(x) = \\dfrac{-(x + 2)}{x - 3}$'],
          answer: 3,
          working: '$x = 3$ gives $(x - 3)$ in the denominator, the intercept $-2$ gives $(x + 2)$ in the numerator, and equal degrees give the horizontal asymptote $y = a$, so $a = -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. A graph has a vertical asymptote x equals three, a horizontal asymptote y equals negative one, an x-intercept of negative two, and no holes. Which equation fits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The asymptote x equals three gives x minus three in the denominator, the intercept negative two gives x plus two in the numerator, and the horizontal asymptote y equals negative one makes the constant negative one. Choice A has the right factors, but its horizontal asymptote is y equals one.', show: 'q.answer' },
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
            'A vertical asymptote $x = h$: a factor $(x - h)$ in the denominator.',
            'An $x$-intercept $r$: a factor $(x - r)$ in the numerator.',
            'A hole at $x = a$: a factor $(x - a)$ in both.',
            'Use the horizontal asymptote or a point to find the constant.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A vertical asymptote x equals h gives a factor x minus h in the denominator.', show: 'sum.0' },
        { say: 'An x-intercept r gives a factor x minus r in the numerator.', show: 'sum.1' },
        { say: 'A hole at x equals "a" gives a factor x minus "a" in both.', show: 'sum.2' },
        { say: 'And the horizontal asymptote, or a point, gives the constant in front. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
