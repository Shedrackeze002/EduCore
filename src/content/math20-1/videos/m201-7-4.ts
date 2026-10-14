import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 6], y: [-4, 4], every: 0 });
const r = (x: number) => 1 / (x - 2);

const video: Explainer = {
  id: 'm201-7-4',
  lessonId: 'm201-7-4',
  title: 'Reciprocal Functions, Part 1: Asymptotes and Invariant Points',
  thumbnailTitle: 'Reciprocal Functions',
  thumbnail: 'rc',
  summary: 'What y = 1/f(x) does to each point, a table for f(x) = x − 2 showing small values becoming large and signs staying the same, and the vertical asymptote, horizontal asymptote and invariant points of y = 1/(x − 2). Parts 2 and 3 cover sketching and quadratics.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.4 · Part 1', title: 'Reciprocal Functions', subtitle: 'y = 1 ⁄ f(x)' }],
      lines: [
        { say: 'A twelve-volt battery pushes a current of twelve over R amperes through a resistance of R ohms. Double the resistance, and the current is halved. Let the resistance shrink toward zero, and the current shoots up.', show: 'title' },
        { say: 'That is exactly how a reciprocal function behaves. In this video, you will see what happens to each point when you take the reciprocal of a function.' },
      ],
    },
    {
      chapter: 'The reciprocal of a function',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Reciprocal function', md: 'For $y = f(x)$, the reciprocal function is $y = \\dfrac{1}{f(x)}$: the point $(x, y)$ becomes $\\left(x, \\dfrac{1}{y}\\right)$.' }],
      right: [
        { kind: 'table', id: 't', head: ['$x$', '$f(x) = x - 2$', '$1/f(x)$'], rows: [['$0$', '$-2$', '$-0.5$'], ['$1.9$', '$-0.1$', '$-10$'], ['$2$', '$0$', 'undefined'], ['$2.1$', '$0.1$', '$10$'], ['$3$', '$1$', '$1$'], ['$12$', '$10$', '$0.1$']] },
      ],
      lines: [
        { say: 'For a function y equals f of x, its reciprocal function is y equals one over f of x. Each y-value is replaced by its reciprocal: the point x, y becomes x, one over y.', show: 'def' },
        { say: 'Here is what happens to f of x equals x minus two. Small values of f become huge values of one over f: negative 0.1 becomes negative ten, and 0.1 becomes ten.', show: 't' },
        { say: 'Huge values become tiny ones: ten becomes 0.1. And at x equals two, f is zero, so its reciprocal is undefined.' },
        { say: 'The sign never changes: a negative value has a negative reciprocal, and a positive value a positive one.' },
      ],
    },
    {
      chapter: 'Asymptotes and invariant points',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('rc', [
          g,
          polyline(g, { id: 'asym', points: [[2, -4], [2, 4]], tone: 'muted', dashed: true }),
          plot(g, { id: 'f', f: (x) => x - 2, tone: 'muted' }),
          plot(g, { id: 'left', f: r, from: -2, to: 1.99, samples: 200, tone: 'brand' }),
          plot(g, { id: 'right', f: r, from: 2.01, to: 6, samples: 200, tone: 'brand' }),
          dots(g, [
            { id: 'P', x: 3, y: 1, tex: '', tone: 'good', group: 'inv' },
            { id: 'Q', x: 1, y: -1, tex: '', tone: 'good', group: 'inv' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Vertical asymptote** where $f(x) = 0$: $x = 2$.', '**Horizontal asymptote**: $y = 0$.', '**Invariant points** where $f(x) = \\pm 1$: $(3, 1)$ and $(1, -1)$.'] }],
      lines: [
        { say: 'Here, y equals x minus two is grey, and y equals one over x minus two is in colour.', show: ['rc.grid', 'rc.axes', 'rc.f', 'rc.left', 'rc.right'] },
        { say: 'Where f of x is zero, the reciprocal has a vertical asymptote: a line the graph approaches more and more closely, without reaching it. Here, it is x equals two.', show: ['b.0', 'rc.asym'], focus: ['b.0', 'rc.asym'] },
        { say: 'As f of x grows without bound, one over f of x approaches zero. So y equals zero, the x-axis, is a horizontal asymptote.', show: 'b.1', focus: 'b.1' },
        { say: 'Invariant points are on both graphs. They occur where f of x is one or negative one, because one and negative one are their own reciprocals. Here, they are three, one, and one, negative one.', show: ['b.2', 'rc.inv'], focus: ['b.2', 'rc.inv'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Where is the vertical asymptote of $y = \\dfrac{1}{x + 4}$?',
          choices: ['$x = -4$', '$x = 4$', '$y = -4$', '$y = 0$'],
          answer: 0,
          working: '$x + 4 = 0$ when $x = -4$, so the reciprocal is undefined there.',
        },
      ],
      lines: [
        { say: 'Your turn. Where is the vertical asymptote of y equals one over x plus four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus four is zero when x is negative four, so the reciprocal is undefined there. D is the horizontal asymptote.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = \\dfrac{1}{f(x)}$ replaces each $y$ with $\\dfrac{1}{y}$, keeping its sign.', 'Zeros of $f$ give vertical asymptotes; $y = 0$ is a horizontal asymptote.', 'Invariant points are where $f(x) = 1$ or $f(x) = -1$.'] }],
      lines: [
        { say: 'Let’s sum up. The reciprocal function replaces each y-value with its reciprocal, keeping its sign.', show: 'sum.0' },
        { say: 'The zeros of f give vertical asymptotes, and y equals zero is a horizontal asymptote.', show: 'sum.1' },
        { say: 'And the invariant points are where f of x is one or negative one. In part two, we read the features from an equation, and sketch. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
