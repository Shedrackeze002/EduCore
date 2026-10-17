import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

// Stretched upward, so the hole at a height of 4/5 sits clearly below the asymptote y = 1.
const g = plane({ x: [-6, 7], y: [-2, 3], yStep: 0.5, every: 0, width: 13, height: 13 });

const video: Explainer = {
  id: 'm301-8-2',
  lessonId: 'm301-8-2',
  title: 'Analyzing Rational Functions, Part 1: Sketching with a Hole',
  thumbnailTitle: 'Sketching with a Hole',
  thumbnail: 'sk',
  summary: 'A checklist for sketching a rational function from its factored form, used to sketch f(x) = (x² − 4)/(x² − x − 6): its domain, hole, asymptotes, intercepts and behaviour near the vertical asymptote, and two mistakes to avoid when drawing a hole.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.2 · Part 1', title: 'Sketching a Rational Function', subtitle: 'A checklist, and a graph with a hole' }],
      lines: [
        { say: 'An engineer reading a sensor curve, or a student checking a calculator screen, needs to know at a glance whether a graph matches its equation.', show: 'title' },
        { say: 'Every feature of a rational function can be read from its factored equation. In this video, you will use a checklist to sketch a rational function, and draw its hole correctly.' },
      ],
    },
    {
      chapter: 'A sketching checklist',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '**Factor** the numerator and the denominator completely.',
            '**Domain:** exclude every zero of the denominator.',
            '**Holes:** for each cancelled factor, find $y$ from the simplified function.',
            '**Vertical asymptotes:** the zeros of the denominator that remain.',
            '**Horizontal asymptote:** compare the degrees.',
            '**Intercepts:** $x$-intercepts from the simplified numerator, and $f(0)$.',
            '**Near each vertical asymptote:** test a value on each side.',
          ],
        },
      ],
      lines: [
        { say: 'To sketch a rational function, or to match it with a graph, work through its features in order. First, factor the numerator and the denominator completely.', show: 'b.0', focus: 'b.0' },
        { say: 'Then find the domain, the holes from the cancelled factors, and the vertical asymptotes from the factors that remain.', show: ['b.1', 'b.2', 'b.3'], focus: ['b.1', 'b.2', 'b.3'] },
        { say: 'Next, the horizontal asymptote, from the degrees, and the intercepts.', show: ['b.4', 'b.5'], focus: ['b.4', 'b.5'] },
        { say: 'Finally, test a value just to the left and just to the right of each vertical asymptote, to see whether the graph goes up or down there.', show: 'b.6', focus: 'b.6' },
      ],
    },
    {
      chapter: 'Factor, domain and hole',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'f(x) = \\dfrac{x^2 - 4}{x^2 - x - 6} = \\dfrac{(x - 2)(x + 2)}{(x - 3)(x + 2)}',
            '= \\dfrac{x - 2}{x - 3},\\quad x \\ne -2',
            '\\text{domain: } \\{x \\mid x \\ne -2,\\ x \\ne 3,\\ x \\in \\mathbb{R}\\}',
            '\\text{hole: } \\dfrac{-2 - 2}{-2 - 3} = \\dfrac{4}{5} \\ \\to\\ \\left(-2, \\tfrac{4}{5}\\right)',
          ],
        },
      ],
      lines: [
        { say: 'Sketch f of x equals x squared minus four, over x squared minus x minus six.', show: 'm.0' },
        { say: 'Factor. The numerator is a difference of squares: x minus two, times x plus two. The denominator is x minus three, times x plus two.', focus: 'm.0' },
        { say: 'The factor x plus two cancels, leaving x minus two, over x minus three, with x not equal to negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'The original denominator is zero at negative two and at three, so both are excluded from the domain.', show: 'm.2', focus: 'm.2' },
        { say: 'x plus two cancelled, so there is a hole at x equals negative two. In the simplified function, negative two minus two, over negative two minus three, is negative four over negative five: four fifths. So the hole is at negative two, four fifths.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Asymptotes and intercepts',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\text{vertical asymptote: } x = 3',
            '\\text{horizontal asymptote: } y = \\dfrac{1}{1} = 1',
            'x\\text{-intercept: } 2 \\qquad y\\text{-intercept: } f(0) = \\dfrac{-2}{-3} = \\dfrac{2}{3}',
            'f(2.9) = \\dfrac{0.9}{-0.1} = -9 \\qquad f(3.1) = \\dfrac{1.1}{0.1} = 11',
          ],
        },
      ],
      lines: [
        { say: 'The factor x minus three remains, so x equals three is a vertical asymptote.', show: 'm.0', focus: 'm.0' },
        { say: 'The degrees are equal, and both leading coefficients are one, so the horizontal asymptote is y equals one.', show: 'm.1', focus: 'm.1' },
        { say: 'The simplified numerator is zero at x equals two, so the x-intercept is two. And f of zero is negative two over negative three, so the y-intercept is two thirds.', show: 'm.2', focus: 'm.2' },
        { say: 'Now test each side of the asymptote. Just to the left, f of 2.9 is 0.9 over negative 0.1: negative nine. Just to the right, f of 3.1 is 1.1 over 0.1: eleven.', show: 'm.3', focus: 'm.3' },
        { say: 'So the graph drops down on the left of the asymptote, and rises up on the right.' },
      ],
    },
    {
      chapter: 'The sketch',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('sk', [
          g,
          numbers(g, 2, 1),
          vAsym(g, 'va', 3),
          hAsym(g, 'ha', 1),
          tag(g, 'va-name', 3, 2.7, 'x = 3', 'left'),
          tag(g, 'ha-name', -6, 1, 'y = 1', 'above right'),
          branches(g, { id: 'c', f: (x) => (x - 2) / (x - 3), breaks: [3] }),
          dots(g, [
            { id: 'X', x: 2, y: 0, tone: 'adj', group: 'ints' },
            { id: 'Y', x: 0, y: 2 / 3, tone: 'adj', group: 'ints' },
            { id: 'H', x: -2, y: 0.8, tex: '\\left(-2, \\tfrac{4}{5}\\right)', tone: 'opp', place: 'below', open: true },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = 3,\\quad y = 1', '(2, 0),\\quad \\left(0, \\tfrac{2}{3}\\right)', '\\text{hole: } \\left(-2, \\tfrac{4}{5}\\right)'] }],
      lines: [
        { say: 'Now put the features on the grid. First, the asymptotes x equals three and y equals one, as dashed lines.', show: ['sk.grid', 'sk.axes', 'sk.va', 'sk.ha', 'sk.va-name', 'sk.ha-name', 'm.0'], focus: ['sk.va', 'sk.ha'] },
        { say: 'Then the intercepts, at two, zero and zero, two thirds.', show: ['sk.ints', 'm.1'], focus: ['sk.ints', 'm.1'] },
        { say: 'Then draw the branches. On the left, the graph comes in from just under y equals one, passes through the intercepts, and drops down beside the asymptote. On the right, it comes down from the top, and levels off just above y equals one.', show: 'sk.c', focus: 'sk.c' },
        { say: 'Last, the open circle at negative two, four fifths: the one point missing from the left branch.', show: ['sk.H', 'm.2'], focus: ['sk.H', 'm.2'] },
      ],
    },
    {
      chapter: 'Holes are not asymptotes',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Holes are not asymptotes', md: 'The factor $x + 2$ cancels, so there is **no** vertical asymptote at $x = -2$: the graph passes right through that $x$-value, with only one point missing. Drawing the graph without the open circle is also a mistake.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Matching a graph', md: 'Compare the hole (both coordinates), the asymptotes, the intercepts, and which side of the asymptotes each branch is on.' },
      ],
      lines: [
        { say: 'Two mistakes are common here. The first is drawing a vertical asymptote at x equals negative two. The factor x plus two cancels, so the graph passes right through that x-value, with only one point missing.', show: 'oops' },
        { say: 'The second is leaving out the open circle. Without it, the graph is the graph of x minus two, over x minus three, which is a different function.' },
        { say: 'When you match an equation with a graph, look for the features that tell the choices apart: the hole, with both its coordinates, the asymptotes, the intercepts, and which side of the asymptotes each branch is on.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Where is the hole in the graph of $f(x) = \\dfrac{x^2 - 9}{x^2 + x - 6}$?',
          choices: ['$\\left(-3, \\tfrac{6}{5}\\right)$', '$(3, 0)$', '$\\left(-3, -\\tfrac{6}{5}\\right)$', '$(-3, 0)$'],
          answer: 0,
          working: '$f(x) = \\dfrac{(x - 3)(x + 3)}{(x + 3)(x - 2)} = \\dfrac{x - 3}{x - 2}$, $x \\ne -3$. At $x = -3$: $\\dfrac{-3 - 3}{-3 - 2} = \\dfrac{-6}{-5} = \\dfrac{6}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is the hole in the graph of f of x equals x squared minus nine, over x squared plus x minus six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus three cancels, leaving x minus three, over x minus two. At x equals negative three, that is negative six over negative five: six fifths. Choice D has the right x-value, but a hole’s y-coordinate comes from the simplified function, not from the numerator being zero.', show: 'q.answer' },
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
            'Factor, then find the domain, holes, asymptotes and intercepts.',
            'Test a value on each side of a vertical asymptote to place the branches.',
            'A hole is an open circle on the graph of the simplified function, not an asymptote.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Factor first, then find the domain, the holes, the asymptotes and the intercepts.', show: 'sum.0' },
        { say: 'Test a value on each side of a vertical asymptote, to see which way each branch goes.', show: 'sum.1' },
        { say: 'And a hole is an open circle on the graph of the simplified function, not an asymptote. In part two, we sketch a function with two vertical asymptotes, using a sign chart. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
