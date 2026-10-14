import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 6], y: [-6, 8], every: 0 });

const video: Explainer = {
  id: 'm201-7-2',
  lessonId: 'm201-7-2',
  title: 'Absolute Value Functions, Part 1: Reflecting the Negative Part',
  thumbnailTitle: 'Absolute Value Functions',
  thumbnail: 'v',
  summary: 'How y = |f(x)| keeps the points of y = f(x) on or above the x-axis and reflects the rest, invariant points, and the V-shaped graph of y = |2x − 4| with its intercepts, domain and range. Parts 2 and 3 cover quadratics and piecewise form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.2 · Part 1', title: 'Absolute Value Functions', subtitle: 'y = |f(x)|' }],
      lines: [
        { say: 'What happens to a graph if negative outputs are not allowed? Taking the absolute value of a function keeps every point on or above the x-axis, and flips every point below it.', show: 'title' },
        { say: 'In this video, you will graph the absolute value of a linear function, and find its intercepts, domain and range.' },
      ],
    },
    {
      chapter: 'Reflecting the negative part',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('v', [
          g,
          plot(g, { id: 'line', f: (x) => 2 * x - 4, tone: 'muted' }),
          plot(g, { id: 'abs', f: (x) => Math.abs(2 * x - 4), tone: 'brand' }),
          dots(g, [
            { id: 'V', x: 2, y: 0, tex: '(2, 0)', tone: 'opp', place: 'below right' },
            { id: 'Y', x: 0, y: 4, tex: '4', tone: 'good', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['Keep the points where $f(x) \\ge 0$.', 'Reflect the points where $f(x) < 0$ in the $x$-axis: $(x, y) \\to (x, -y)$.', '**Invariant points**, such as the $x$-intercepts, do not move.'] }],
      lines: [
        { say: 'An absolute value function has the form y equals the absolute value of f of x. Its graph keeps every point of y equals f of x where f of x is zero or positive.', show: ['v.grid', 'v.axes', 'v.line', 'b.0'] },
        { say: 'And it reflects every point where f of x is negative in the x-axis: the point x, y becomes x, negative y.', show: 'b.1' },
        { say: 'Here, y equals two x minus four is in grey. The part of the line left of x equals two is below the axis, so it is reflected upward, making a V.', show: ['v.abs', 'v.Y'], focus: 'v.abs' },
        { say: 'Points that do not move are called invariant points. Every point on or above the x-axis is invariant, including the x-intercept, where the graph bounces.', show: ['b.2', 'v.V'], focus: ['b.2', 'v.V'] },
      ],
    },
    {
      chapter: 'Intercepts, domain and range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x - 4 = 0:\\quad x = 2,\\ \\text{vertex } (2, 0)', 'y = |2(0) - 4| = |{-}4| = 4', '\\text{domain: } \\{x \\mid x \\in \\mathbb{R}\\}', '\\text{range: } \\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'Find the intercepts of y equals the absolute value of two x minus four. For the x-intercept, two x minus four equals zero, so x is two. That is the vertex of the V, at two, zero.', show: 'm.0', focus: 'm.0' },
        { say: 'For the y-intercept, substitute zero: the absolute value of negative four is four.', show: 'm.1', focus: 'm.1' },
        { say: 'An absolute value is never negative, so the range of y equals the absolute value of f of x never includes negative numbers.' },
        { say: 'For a linear function that is not horizontal, the domain is all real numbers, and the range is all real y greater than or equal to zero.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the $y$-intercept of $y = |3x - 6|$?',
          choices: ['$6$', '$-6$', '$2$', '$3$'],
          answer: 0,
          working: '$|3(0) - 6| = |{-}6| = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the y-intercept of y equals the absolute value of three x minus six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Substitute zero: the absolute value of negative six is six. B forgets the absolute value, and C is the x-intercept.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Keep the points with $f(x) \\ge 0$; reflect those with $f(x) < 0$.', 'The $x$-intercepts are invariant points.', 'The range of $y = |f(x)|$ never includes negative values.'] }],
      lines: [
        { say: 'Let’s sum up. The graph of y equals the absolute value of f of x keeps the points where f of x is at least zero, and reflects the rest in the x-axis.', show: 'sum.0' },
        { say: 'The x-intercepts are invariant points.', show: 'sum.1' },
        { say: 'And the range never includes negative values. In part two, we take the absolute value of a quadratic. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
