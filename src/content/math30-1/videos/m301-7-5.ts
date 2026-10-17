import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 7], y: [-3, 7], every: 2, width: 9, height: 9 });
const log2 = (x: number) => (x > 0 ? Math.log2(x) : NaN);

/** The name of the line y = x, above it near the top right, clear of the curves. */
const name: Part = { points: { yx: g.map(5.6, 5.6) }, items: [{ kind: 'label', id: 'yx-name', at: 'yx', tex: 'y = x', tone: 'muted', place: 'above left' }] };

const video: Explainer = {
  id: 'm301-7-5',
  lessonId: 'm301-7-5',
  title: 'Transformations of Logarithmic Functions, Part 1: The Inverse of an Exponential Function',
  thumbnailTitle: 'The Logarithmic Function',
  thumbnail: 'inv',
  summary: 'Why y = log_c x is the inverse of y = cˣ, its graph as the reflection of y = 2ˣ in the line y = x, how the domain, range, intercept, asymptote and key point swap, and the inverse of y = 5ˣ with three of its points. Part 2 transforms logarithmic functions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.5 · Part 1', title: 'The Logarithmic Function', subtitle: 'The inverse of $y = c^{x}$' }],
      lines: [
        { say: 'Interchange x and y in y equals two to the power x, and you get x equals two to the power y. Written in logarithmic form, that is y equals log base two of x.', show: 'title' },
        { say: 'In this video, you will see that every logarithmic function is the inverse of an exponential function, draw its graph, and compare their features.' },
      ],
    },
    {
      chapter: 'The inverse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2^{x}', '\\text{interchange: } x = 2^{y}', '\\text{logarithmic form: } y = \\log_{2} x'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Logarithmic function', md: 'A function of the form $y = \\log_{c} x$, where $c > 0$ and $c \\ne 1$. It is the inverse of $y = c^{x}$.' },
      ],
      lines: [
        { say: 'Start with y equals two to the power x. To find its inverse, interchange x and y: x equals two to the power y.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Now solve for y. Y is the exponent that two must be raised to, to give x. That is exactly what a logarithm is: y equals log base two of x.', show: 'm.2', focus: 'm.2' },
        { say: 'So a logarithmic function, y equals log base c of x, is the inverse of the exponential function y equals c to the power x. The base c is positive and not one, as before.', show: 'def' },
      ],
    },
    {
      chapter: 'Reflecting in y = x',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('inv', [
          g,
          polyline(g, { id: 'yx', points: [[-3, -3], [7, 7]], tone: 'muted', dashed: true }),
          name,
          plot(g, { id: 'exp', f: (x) => 2 ** x, tone: 'muted', samples: 200 }),
          plot(g, { id: 'log', f: log2, from: 0.001, to: 7, samples: 400 }),
          dots(g, [
            { id: 'E0', x: 0, y: 1, tone: 'muted', group: 'epts' },
            { id: 'E1', x: 1, y: 2, tone: 'muted', group: 'epts' },
            { id: 'E2', x: 2, y: 4, tone: 'muted', group: 'epts' },
            { id: 'L0', x: 1, y: 0, tone: 'opp', group: 'lpts' },
            { id: 'L1', x: 2, y: 1, tone: 'opp', group: 'lpts' },
            { id: 'L2', x: 4, y: 2, tone: 'opp', group: 'lpts' },
          ]),
        ]),
      ],
      right: [{ kind: 'table', id: 't', head: ['$y = 2^{x}$', '$y = \\log_{2} x$'], rows: [['$(0, 1)$', '$(1, 0)$'], ['$(1, 2)$', '$(2, 1)$'], ['$(2, 4)$', '$(4, 2)$']] }],
      lines: [
        { say: 'The grey curve is y equals two to the power x, through the points at zero, one; one, two; and two, four.', show: ['inv.grid', 'inv.axes', 'inv.exp', 'inv.epts'], focus: 'inv.exp' },
        { say: 'To get the inverse, swap the coordinates of each point. Zero, one becomes one, zero. One, two becomes two, one. And two, four becomes four, two.', show: ['t', 'inv.lpts'], focus: ['t', 'inv.lpts'] },
        { say: 'Join the new points, and you have y equals log base two of x, in purple. It is the reflection of the exponential graph in the dashed line y equals x.', show: ['inv.log', 'inv.yx', 'inv.yx-name'], focus: 'inv.log' },
        { say: 'The exponential graph hugs the x-axis on the left. So the logarithmic graph hugs the y-axis, plunging down as x gets close to zero.' },
      ],
    },
    {
      chapter: 'Features swap',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', '$y = c^{x}$', '$y = \\log_{c} x$'],
          rows: [
            ['Domain', 'all real numbers', '$x > 0$'],
            ['Range', '$y > 0$', 'all real numbers'],
            ['Intercept', '$y$-intercept $1$', '$x$-intercept $1$'],
            ['Asymptote', 'horizontal, $y = 0$', 'vertical, $x = 0$'],
            ['Key point', '$(1, c)$', '$(c, 1)$'],
          ],
        },
      ],
      lines: [
        { say: 'Because x and y swap, the features of the logarithmic function are those of the exponential function, with x and y interchanged.' },
        { say: 'The exponential function has domain all real numbers and range y greater than zero. So the logarithmic function has domain x greater than zero, and range all real numbers. You can only take the logarithm of a positive number.', show: ['t.0', 't.1'], focus: ['t.0', 't.1'] },
        { say: 'The y-intercept, one, becomes an x-intercept of one. The horizontal asymptote, y equals zero, becomes a vertical asymptote, x equals zero: the y-axis.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'And the point at one, c, becomes c, one. For c greater than one, both functions are increasing. For c between zero and one, both are decreasing.', show: 't.4', focus: 't.4' },
      ],
    },
    {
      chapter: 'Inverse and points',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 5^{x}:\\quad x = 5^{y},\\quad y = \\log_{5} x', '(0, 1),\\ (1, 5),\\ \\left(-1, \\tfrac{1}{5}\\right) \\text{ on } y = 5^{x}', '(1, 0),\\ (5, 1),\\ \\left(\\tfrac{1}{5}, -1\\right) \\text{ on } y = \\log_{5} x'] },
      ],
      lines: [
        { say: 'Write the inverse of y equals five to the power x, and find three points on its graph.', show: 'm.0', focus: 'm.0' },
        { say: 'Interchange x and y: x equals five to the power y. In logarithmic form, y equals log base five of x.' },
        { say: 'Three easy points on y equals five to the power x are zero, one; one, five; and negative one, one fifth.', show: 'm.1', focus: 'm.1' },
        { say: 'Swap each pair. One, zero; five, one; and one fifth, negative one are on y equals log base five of x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which point is on the graph of $y = \\log_{3} x$?',
          choices: ['$(9, 2)$', '$(2, 9)$', '$(0, 1)$', '$(3, 0)$'],
          answer: 0,
          working: '$\\log_{3} 9 = 2$, because $3^{2} = 9$. The point $(2, 9)$ is on the inverse, $y = 3^{x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which point is on the graph of y equals log base three of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Log base three of nine is two, because three squared is nine. B has the coordinates swapped: it is on the inverse, y equals three to the power x.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = \\log_{c} x$ is the inverse of $y = c^{x}$: reflect in $y = x$.', 'Domain $x > 0$, range all real numbers.', '$x$-intercept $1$, vertical asymptote $x = 0$, and it passes through $(c, 1)$.'] }],
      lines: [
        { say: 'Let’s sum up. Y equals log base c of x is the inverse of y equals c to the power x. Its graph is the reflection in the line y equals x.', show: 'sum.0' },
        { say: 'Its domain is x greater than zero, and its range is all real numbers.', show: 'sum.1' },
        { say: 'It has an x-intercept of one, a vertical asymptote at x equals zero, and passes through c, one. In part two, we stretch, reflect and translate logarithmic graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
