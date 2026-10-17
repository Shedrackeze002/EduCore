import type { Explainer } from '@/video/script.ts';
import { dots, plane } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';
import { branches, hAsym, numbers, tag, vAsym } from './lib/m301-8-graphs.ts';

const g1 = plane({ x: [-5, 5], y: [-5, 5], every: 0 });
const g2 = plane({ x: [-4, 6], y: [-3, 8], every: 0 });
const f = (x: number) => 2 / (x - 1) + 3;

/** y = 1/x in grey, y = 2/(x − 1) + 3 and its asymptotes, and (with `points`) its y-intercept and (2, 5). */
const moved = (id: string, points = false) =>
  figure(id, [
    g2,
    numbers(g2, 2),
    branches(g2, { id: 'base', f: (x) => 1 / x, breaks: [0], tone: 'muted' }),
    vAsym(g2, 'va', 1),
    hAsym(g2, 'ha', 3),
    tag(g2, 'va-name', 1, 7.4, 'x = 1', 'right'),
    tag(g2, 'ha-name', 6, 3, 'y = 3', 'below left'),
    branches(g2, { id: 'image', f, breaks: [1] }),
    ...(points
      ? [
          dots(g2, [
            { id: 'Y', x: 0, y: 1, tex: '(0, 1)', tone: 'adj', place: 'left' },
            { id: 'P', x: 2, y: 5, tex: '(2, 5)', tone: 'adj', place: 'right' },
          ]),
        ]
      : []),
  ]);

const video: Explainer = {
  id: 'm301-8-1',
  lessonId: 'm301-8-1',
  title: 'Exploring Rational Functions, Part 1: The Graph of y = a/(x − h) + k',
  thumbnailTitle: 'Rational Functions',
  thumbnail: 'mv',
  summary: 'What a rational function is, the vertical and horizontal asymptotes of y = 1/x, how y = a/(x − h) + k moves them to x = h and y = k, the domain, range and y-intercept of y = 2/(x − 1) + 3, and rewriting (3x − 1)/(x − 2) in that form. Parts 2 to 4 cover holes, horizontal asymptotes and intercepts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 8.1 · Part 1', title: 'Rational Functions', subtitle: 'The graph of y = a/(x − h) + k' }],
      lines: [
        { say: 'Hold a magnifying glass over a page and slowly lift it. At one height, the image blurs away completely, because the image has moved infinitely far from the lens.', show: 'title' },
        { say: 'That blow-up is an asymptote, and it belongs to a rational function. In this video, you will meet rational functions, find the asymptotes of y equals "a" over x minus h, plus k, and use them to state the domain and range.' },
      ],
    },
    {
      chapter: 'What a rational function is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational function', md: 'A function of the form $f(x) = \\dfrac{p(x)}{q(x)}$, where $p(x)$ and $q(x)$ are polynomials and $q(x) \\ne 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\dfrac{1}{x} \\qquad y = \\dfrac{3x - 1}{x - 2} \\qquad y = \\dfrac{x^2 - x - 6}{x^2 - 9}'] },
      ],
      lines: [
        { say: 'A rational function is a function of the form f of x equals p of x over q of x, where p and q are polynomials, and q of x is not zero.', show: 'def' },
        { say: 'In this course, the numerator and the denominator are monomials, binomials or trinomials, like these three examples.', show: 'm' },
        { say: 'Like any fraction, a rational function is undefined wherever its denominator is zero. That one fact explains most of what its graph does.' },
      ],
    },
    {
      chapter: 'The graph of y = 1/x',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('rec', [
          g1,
          numbers(g1, 2),
          branches(g1, { id: 'c', f: (x) => 1 / x, breaks: [0] }),
          dots(g1, [
            { id: 'A', x: 0.25, y: 4, tex: '(0.25, 4)', tone: 'opp', place: 'right' },
            { id: 'B', x: 4, y: 0.25, tex: '(4, 0.25)', tone: 'opp', place: 'above' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{1}{x}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Asymptotes', md: 'A **vertical asymptote** $x = a$ is a vertical line the graph approaches as $f(x)$ grows without bound near $x = a$. A **horizontal asymptote** $y = b$ is a horizontal line the graph approaches as $|x|$ grows without bound.' },
      ],
      lines: [
        { say: 'The simplest rational function is y equals one over x. At x equals zero, it is undefined, because you cannot divide by zero.', show: ['rec.grid', 'rec.axes', 'rec.c', 'm'] },
        { say: 'Close to zero, the outputs are huge: one over 0.25 is four, and one over 0.01 is one hundred. So the graph shoots up beside the y-axis, without ever touching it.', show: 'rec.A', focus: 'rec.A' },
        { say: 'Far from zero, the outputs are tiny: one over four is 0.25. The graph gets closer and closer to the x-axis, but never reaches it.', show: 'rec.B', focus: 'rec.B' },
        { say: 'These lines are asymptotes. A vertical asymptote is a vertical line the graph approaches as the outputs grow without bound. Here, it is x equals zero.', show: 'def', focus: 'rec.c' },
        { say: 'A horizontal asymptote is a horizontal line the graph approaches as x grows without bound, to the right or to the left. Here, it is y equals zero.' },
      ],
    },
    {
      chapter: 'Moving the asymptotes',
      layout: 'split',
      leftWidth: 520,
      left: [moved('mv')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\dfrac{a}{x - h} + k', '\\text{vertical asymptote: } x = h', '\\text{horizontal asymptote: } y = k', 'y = \\dfrac{2}{x - 1} + 3'] }],
      lines: [
        { say: 'Transformations move the asymptotes with the graph. The graph of y equals "a" over x minus h, plus k, is the graph of y equals one over x, stretched by a factor of "a", then translated h units horizontally and k units vertically.', show: ['mv.grid', 'mv.axes', 'mv.base', 'm.0'], focus: 'm.0' },
        { say: 'So its vertical asymptote moves to x equals h, and its horizontal asymptote moves to y equals k.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'For example, y equals two over x minus one, plus three, is stretched vertically by a factor of two, then translated one unit right and three units up.', show: 'm.3', focus: 'm.3' },
        { say: 'Its asymptotes, the dashed lines, are x equals one and y equals three.', show: ['mv.va', 'mv.va-name', 'mv.ha', 'mv.ha-name'], focus: ['mv.va', 'mv.ha'] },
        { say: 'The two branches of the new graph hug these lines, just as y equals one over x hugs the axes.', show: 'mv.image', focus: 'mv.image' },
      ],
    },
    {
      chapter: 'Domain, range and intercept',
      layout: 'split',
      leftWidth: 520,
      left: [moved('dr', true)],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['a = 2,\\quad h = 1,\\quad k = 3', 'x = 1 \\ \\text{ and } \\ y = 3', '\\{x \\mid x \\ne 1,\\ x \\in \\mathbb{R}\\}', '\\{y \\mid y \\ne 3,\\ y \\in \\mathbb{R}\\}', '\\dfrac{2}{0 - 1} + 3 = 1'],
        },
      ],
      lines: [
        { say: 'State the asymptotes, domain, range and y-intercept of y equals two over x minus one, plus three.', show: ['dr.grid', 'dr.axes', 'dr.va', 'dr.ha', 'dr.va-name', 'dr.ha-name', 'dr.image'] },
        { say: 'Compare it with y equals "a" over x minus h, plus k. "a" is two, h is one, and k is three.', show: 'm.0', focus: 'm.0' },
        { say: 'So the vertical asymptote is x equals one, where the denominator is zero, and the horizontal asymptote is y equals three.', show: 'm.1', focus: ['m.1', 'dr.va', 'dr.ha'] },
        { say: 'The graph never reaches either asymptote. It has no point where x is one, so the domain is all real x, except one.', show: 'm.2', focus: ['m.2', 'dr.va'] },
        { say: 'And two over x minus one can never be zero, because its numerator is two. So y is never three: the range is all real y, except three.', show: 'm.3', focus: ['m.3', 'dr.ha'] },
        { say: 'For the y-intercept, put in x equals zero: two over negative one, plus three, is one. The graph crosses the y-axis at zero, one.', show: ['m.4', 'dr.Y', 'dr.P'], focus: ['m.4', 'dr.Y'] },
      ],
    },
    {
      chapter: 'Rewriting in this form',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['f(x) = \\dfrac{3x - 1}{x - 2}', '3x - 1 = 3(x - 2) + 5', 'f(x) = \\dfrac{3(x - 2) + 5}{x - 2} = \\dfrac{3(x - 2)}{x - 2} + \\dfrac{5}{x - 2}', 'f(x) = \\dfrac{5}{x - 2} + 3'],
        },
        { kind: 'text', id: 't', md: 'Asymptotes: $x = 2$ and $y = 3$', size: 'md', align: 'center' },
      ],
      lines: [
        { say: 'Some rational functions do not look like this form at first. Take f of x equals three x minus one, over x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Write the numerator using the denominator. Three times x minus two is three x minus six. You need three x minus one, so add five: three x minus one equals three times x minus two, plus five.', show: 'm.1', focus: 'm.1' },
        { say: 'Now split the fraction in two. Three times x minus two, over x minus two, is just three.', show: 'm.2', focus: 'm.2' },
        { say: 'So f of x equals five over x minus two, plus three.', show: 'm.3', focus: 'm.3' },
        { say: 'Now you can read the asymptotes: x equals two and y equals three.', show: 't' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the asymptotes of $y = \\dfrac{4}{x + 2} - 1$?',
          choices: ['$x = 2$ and $y = -1$', '$x = -2$ and $y = -1$', '$x = -2$ and $y = 4$', '$x = -1$ and $y = -2$'],
          answer: 1,
          working: '$x + 2 = x - (-2)$, so $h = -2$: the vertical asymptote is $x = -2$. $k = -1$, so the horizontal asymptote is $y = -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the asymptotes of y equals four over x plus two, minus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x plus two is x minus negative two, so h is negative two, and the vertical asymptote is x equals negative two. k is negative one, so the horizontal asymptote is y equals negative one. Choice A forgets that x plus two means h is negative two.', show: 'q.answer' },
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
          items: ['A rational function $\\dfrac{p(x)}{q(x)}$ is undefined where $q(x) = 0$.', '$y = \\dfrac{a}{x - h} + k$ has the asymptotes $x = h$ and $y = k$.', 'Its domain is $x \\ne h$ and its range is $y \\ne k$.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. A rational function is a quotient of polynomials, and it is undefined wherever its denominator is zero.', show: 'sum.0' },
        { say: 'The graph of y equals "a" over x minus h, plus k, has the vertical asymptote x equals h and the horizontal asymptote y equals k.', show: 'sum.1' },
        { say: 'Its domain is all real x except h, and its range is all real y except k. In part two, we factor rational functions to find their vertical asymptotes and holes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
