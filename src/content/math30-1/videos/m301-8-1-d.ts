import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

const g = plane({ x: [-6, 6], y: [-4, 8], every: 0 });

const video: Explainer = {
  id: 'm301-8-1-d',
  lessonId: 'm301-8-1',
  title: 'Exploring Rational Functions, Part 4: Intercepts, Domain and Every Feature',
  thumbnailTitle: 'Putting It Together',
  thumbnail: 'gr',
  summary: 'Where the domain and the x- and y-intercepts of a rational function come from, then a complete analysis of f(x) = (2x² − 2x − 12)/(x² + x − 2): its domain, hole, asymptotes, intercepts and graph, and why a cancelled zero is not an x-intercept.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.1 · Part 4', title: 'Putting It Together', subtitle: 'Domain, holes, asymptotes and intercepts' }],
      lines: [
        { say: 'You can now find the holes, the vertical asymptotes and the horizontal asymptote of a rational function. Add the domain and the intercepts, and you can describe it completely.', show: 'title' },
        { say: 'In this video, you will analyze one function from start to finish, and avoid a trap with cancelled factors.' },
      ],
    },
    {
      chapter: 'Intercepts and domain',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Domain:** exclude every zero of the **original** denominator, including the ones that cancel.',
            '**$x$-intercepts:** the zeros of the numerator that are left **after** cancelling.',
            '**$y$-intercept:** $f(0)$, if $0$ is in the domain.',
          ],
        },
      ],
      lines: [
        { say: 'The domain comes from the original denominator. Exclude every value that makes it zero, including the ones that cancel.', show: 'b.0', focus: 'b.0' },
        { say: 'The x-intercepts are where the output is zero. A fraction is zero when its numerator is zero, so use the zeros of the numerator that are left after cancelling.', show: 'b.1', focus: 'b.1' },
        { say: 'The y-intercept is f of zero, as long as zero is in the domain.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Factor and find the domain',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{2x^2 - 2x - 12}{x^2 + x - 2}',
            '= \\dfrac{2(x - 3)(x + 2)}{(x + 2)(x - 1)} = \\dfrac{2(x - 3)}{x - 1},\\quad x \\ne -2',
            '\\text{domain: } \\{x \\mid x \\ne -2,\\ x \\ne 1,\\ x \\in \\mathbb{R}\\}',
          ],
        },
      ],
      lines: [
        { say: 'Analyze f of x equals two x squared minus two x minus twelve, over x squared plus x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor first. Take out the common factor two from the numerator: two times x squared minus x minus six, which is two times x minus three, times x plus two. The denominator is x plus two, times x minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'x plus two cancels. So f of x equals two times x minus three, over x minus one, with x not equal to negative two.' },
        { say: 'The original denominator is zero at negative two and at one, so the domain is all real x, except negative two and one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Hole, asymptotes and intercepts',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{hole: } x = -2,\\quad y = \\dfrac{2(-5)}{-3} = \\dfrac{10}{3}',
            '\\text{vertical asymptote: } x = 1',
            '\\text{horizontal asymptote: } y = \\dfrac{2}{1} = 2',
            'x\\text{-intercept: } 3 \\qquad y\\text{-intercept: } f(0) = \\dfrac{-12}{-2} = 6',
          ],
        },
      ],
      lines: [
        { say: 'The hole is at x equals negative two. Put negative two into the simplified function: two times negative five, over negative three, is ten thirds. So the hole is at negative two, ten thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'The factor x minus one remains in the denominator, so x equals one is a vertical asymptote.', show: 'm.1', focus: 'm.1' },
        { say: 'The numerator and the denominator both have degree two, with leading coefficients two and one. So the horizontal asymptote is y equals two over one, which is two.', show: 'm.2', focus: 'm.2' },
        { say: 'The simplified numerator, two times x minus three, is zero at x equals three, so the x-intercept is three. And f of zero is negative twelve over negative two, so the y-intercept is six.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('gr', [
          g,
          numbers(g, 2),
          vAsym(g, 'va', 1),
          hAsym(g, 'ha', 2),
          tag(g, 'va-name', 1, 7.4, 'x = 1', 'right'),
          tag(g, 'ha-name', 6, 2, 'y = 2', 'above left'),
          branches(g, { id: 'c', f: (x) => (2 * (x - 3)) / (x - 1), breaks: [1] }),
          dots(g, [
            { id: 'H', x: -2, y: 10 / 3, tex: '\\left(-2, \\tfrac{10}{3}\\right)', tone: 'opp', place: 'above left', open: true },
            { id: 'X', x: 3, y: 0, tex: '(3, 0)', tone: 'adj', place: 'below right', group: 'ints' },
            { id: 'Y', x: 0, y: 6, tex: '(0, 6)', tone: 'adj', place: 'left', group: 'ints' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 1,\\quad y = 2', '\\text{hole: } \\left(-2, \\tfrac{10}{3}\\right)', '(3, 0) \\text{ and } (0, 6)'] }],
      lines: [
        { say: 'Now draw the graph from its features. First, the dashed asymptotes, x equals one and y equals two.', show: ['gr.grid', 'gr.axes', 'gr.va', 'gr.ha', 'gr.va-name', 'gr.ha-name', 'm.0'], focus: ['gr.va', 'gr.ha'] },
        { say: 'Then the intercepts, at three, zero and zero, six.', show: ['gr.ints', 'm.2'], focus: ['gr.ints', 'm.2'] },
        { say: 'On the left of x equals one, the graph comes in from just above y equals two, passes through zero, six, and rises beside the asymptote. On the right, it comes up from below, crosses the x-axis at three, and levels off just under y equals two.', show: 'gr.c', focus: 'gr.c' },
        { say: 'Last, the open circle at negative two, ten thirds. The graph is the graph of the simplified function, with that one point missing.', show: ['gr.H', 'm.1'], focus: ['gr.H', 'm.1'] },
      ],
    },
    {
      chapter: 'A cancelled zero is not an intercept',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A cancelled zero is not an intercept', md: 'The numerator $2x^2 - 2x - 12$ is $0$ at $x = -2$, but $f(-2)$ is undefined. The graph has a hole there, not an $x$-intercept.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2(-2)^2 - 2(-2) - 12 = 8 + 4 - 12 = 0', 'f(-2) = \\dfrac{0}{0}:\\ \\text{undefined}'] },
      ],
      lines: [
        { say: 'A common mistake is to find the x-intercepts from the original numerator.', show: 'oops' },
        { say: 'The numerator two x squared minus two x minus twelve is zero at x equals three, and also at x equals negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'But at x equals negative two, the denominator is zero too, so f of negative two is zero over zero, which is undefined.', show: 'm.1', focus: 'm.1' },
        { say: 'So the graph has a hole at x equals negative two, not an x-intercept. The only x-intercept is three.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the intercepts of $f(x) = \\dfrac{x^2 - 1}{x^2 - 4x + 3}$?',
          choices: [
            '$x$-intercepts $-1$ and $1$; $y$-intercept $-\\tfrac{1}{3}$',
            '$x$-intercept $-1$; $y$-intercept $\\tfrac{1}{3}$',
            '$x$-intercept $-1$; $y$-intercept $-\\tfrac{1}{3}$',
            '$x$-intercept $1$; $y$-intercept $-\\tfrac{1}{3}$',
          ],
          answer: 2,
          working: '$f(x) = \\dfrac{(x - 1)(x + 1)}{(x - 1)(x - 3)} = \\dfrac{x + 1}{x - 3}$, $x \\ne 1$, so the only $x$-intercept is $-1$ (there is a hole at $x = 1$). $f(0) = \\dfrac{-1}{3} = -\\dfrac{1}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the intercepts of f of x equals x squared minus one, over x squared minus four x plus three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The function simplifies to x plus one, over x minus three, with a hole at x equals one. So the only x-intercept is negative one, and f of zero is negative one third. Choice A counts the cancelled zero, one, as an intercept.', show: 'q.answer' },
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
            'Domain: exclude every zero of the original denominator.',
            'A cancelled factor gives a hole; a factor left in the denominator gives a vertical asymptote.',
            'Horizontal asymptote: compare the degrees.',
            '$x$-intercepts come from the simplified numerator; the $y$-intercept is $f(0)$.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. The domain excludes every zero of the original denominator.', show: 'sum.0' },
        { say: 'A cancelled factor gives a hole, and a factor left in the denominator gives a vertical asymptote.', show: 'sum.1' },
        { say: 'The horizontal asymptote comes from comparing the degrees.', show: 'sum.2' },
        { say: 'And the x-intercepts come from the simplified numerator, while the y-intercept is f of zero. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
