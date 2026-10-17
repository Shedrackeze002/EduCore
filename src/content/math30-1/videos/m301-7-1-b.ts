import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 4], y: [-1, 8], every: 2, width: 10, height: 8.5 });
const d = plane({ x: [-3, 4], y: [-1, 4], every: 2, width: 9, height: 7 });

const video: Explainer = {
  id: 'm301-7-1-b',
  lessonId: 'm301-7-1',
  title: 'Characteristics of Exponential Functions, Part 2: Growth, Decay and Key Features',
  thumbnailTitle: 'Growth and Decay',
  thumbnail: 'gd',
  summary: 'Exponential growth (c > 1) and decay (0 < c < 1), why y = (1/2)ˣ is the reflection of y = 2ˣ in the y-axis, classifying functions such as y = 3⁻ˣ, and the domain, range, y-intercept and horizontal asymptote of every graph of y = cˣ. Part 3 finds the equation y = a(c)ˣ from two points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.1 · Part 2', title: 'Growth, Decay and Key Features', subtitle: 'What every exponential graph shares' }],
      lines: [
        { say: 'Money in a savings account grows by the same factor every year. The medicine in your blood shrinks by the same factor every hour. Both are exponential functions.', show: 'title' },
        { say: 'In this video, you will tell growth from decay, see why their graphs are mirror images, and list the features that every exponential graph shares.' },
      ],
    },
    {
      chapter: 'Growth and decay',
      layout: 'split',
      leftWidth: 660,
      left: [
        figure('gd', [
          g,
          plot(g, { id: 'grow', f: (x) => 2 ** x, samples: 200 }),
          plot(g, { id: 'decay', f: (x) => 0.5 ** x, tone: 'opp', samples: 200 }),
          dots(g, [
            { id: 'P', x: 1, y: 2, tex: '(1, 2)', tone: 'brand', place: 'below right' },
            { id: 'Q', x: -1, y: 2, tex: '(-1, 2)', tone: 'opp', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['$c > 1$: increasing, **growth**', '$0 < c < 1$: decreasing, **decay**'] }],
      lines: [
        { say: 'In purple is y equals two to the power x. Its base, two, is greater than one, so as x increases, y increases. That is exponential growth.', show: ['gd.grid', 'gd.axes', 'gd.grow', 'b.0'], focus: ['gd.grow', 'b.0'] },
        { say: 'In orange is y equals one half to the power x. Its base is between zero and one, so as x increases, y decreases. That is exponential decay.', show: ['gd.decay', 'b.1'], focus: ['gd.decay', 'b.1'] },
        { say: 'Look closely, and the two graphs are mirror images in the y-axis. The point at one, two, on the growth curve matches the point at negative one, two, on the decay curve.', show: ['gd.P', 'gd.Q'], focus: ['gd.P', 'gd.Q'] },
      ],
    },
    {
      chapter: 'Mirror images',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(\\tfrac{1}{2}\\right)^{x} = \\left(2^{-1}\\right)^{x} = 2^{-x}', '\\left(\\tfrac{1}{c}\\right)^{x} = c^{-x}'] },
        { kind: 'table', id: 't', head: ['Function', 'Base', 'Type'], rows: [['$y = 0.75^{x}$', '$0.75$', 'decay'], ['$y = 3^{-x} = \\left(\\frac{1}{3}\\right)^{x}$', '$\\frac{1}{3}$', 'decay'], ['$y = \\left(\\frac{1}{3}\\right)^{-x} = 3^{x}$', '$3$', 'growth']] },
      ],
      lines: [
        { say: 'Why are they mirror images? One half is two to the power negative one. So one half to the power x is two to the power negative x. Replacing x with negative x reflects a graph in the y-axis.', show: 'm.0', focus: 'm.0' },
        { say: 'In general, one over c, to the power x, equals c to the power negative x.', show: 'm.1', focus: 'm.1' },
        { say: 'Use that to classify functions. Y equals 0.75 to the power x has a base between zero and one, so it shows decay.', show: 't.0', focus: 't.0' },
        { say: 'Y equals three to the power negative x is one third to the power x. The base is one third, so it shows decay too.', show: 't.1', focus: 't.1' },
        { say: 'But one third to the power negative x is three to the power x. Two flips make the base three, so it shows growth.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Key characteristics',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('kc', [
          d,
          polyline(d, { id: 'asy', points: [[-3, 0], [4, 0]], tone: 'theta', dashed: true }),
          plot(d, { id: 'curve', f: (x) => (1 / 3) ** x, samples: 200 }),
          dots(d, [
            { id: 'A', x: -1, y: 3, tex: '(-1, 3)', tone: 'opp', place: 'left' },
            { id: 'B', x: 0, y: 1, tex: '(0, 1)', tone: 'opp', place: 'above right' },
            { id: 'C', x: 1, y: 1 / 3, tex: '\\left(1, \\tfrac{1}{3}\\right)', tone: 'opp', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Domain: } \\{x \\mid x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y > 0,\\ y \\in \\mathbb{R}\\}', 'y\\text{-intercept: } 1', '\\text{Asymptote: } y = 0'] }],
      lines: [
        { say: 'Here is y equals one third to the power x. Its base is between zero and one, so it is decreasing.', show: ['kc.grid', 'kc.axes', 'kc.curve'], focus: 'kc.curve' },
        { say: 'Any real number can be an exponent, so the domain is all real numbers.', show: 'm.0', focus: 'm.0' },
        { say: 'A positive base to any power is positive, so the range is y greater than zero. The graph never touches the x-axis.', show: 'm.1', focus: 'm.1' },
        { say: 'Any base to the power zero is one, so the y-intercept is one. The graph also passes through one, c, and negative one, one over c: here, one, one third, and negative one, three.', show: ['m.2', 'kc.A', 'kc.B', 'kc.C'], focus: ['m.2', 'kc.A', 'kc.B', 'kc.C'] },
        { say: 'And as x increases, y gets closer and closer to zero. The x-axis, y equals zero, is a horizontal asymptote.', show: ['m.3', 'kc.asy'], focus: ['m.3', 'kc.asy'] },
      ],
    },
    {
      chapter: 'The asymptote',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Asymptote', md: 'A line that a graph approaches more and more closely but never reaches.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(\\tfrac{1}{3}\\right)^{2} = \\tfrac{1}{9} \\qquad \\left(\\tfrac{1}{3}\\right)^{5} = \\tfrac{1}{243} \\qquad \\left(\\tfrac{1}{3}\\right)^{10} = \\tfrac{1}{59\\,049}'] },
      ],
      lines: [
        { say: 'An asymptote is a line that a graph approaches more and more closely, but never reaches.', show: 'def' },
        { say: 'Watch the values of one third to the power x. At two, y is one ninth. At five, it is one over 243. At ten, it is one over 59,049.', show: 'm.0', focus: 'm.0' },
        { say: 'The values get tiny, but they are never zero. That is why there is no x-intercept.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which function shows exponential **growth**?',
          choices: ['$y = 0.9^{x}$', '$y = 4^{-x}$', '$y = \\left(\\frac{1}{5}\\right)^{-x}$', '$y = \\left(\\frac{2}{3}\\right)^{x}$'],
          answer: 2,
          working: '$\\left(\\frac{1}{5}\\right)^{-x} = 5^{x}$, and $5 > 1$. The others are decay: $0.9$ and $\\frac{2}{3}$ are between $0$ and $1$, and $4^{-x} = \\left(\\frac{1}{4}\\right)^{x}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which function shows exponential growth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. One fifth to the power negative x is five to the power x, and five is greater than one. B is not growth: four to the power negative x is one quarter to the power x, which is decay.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$c > 1$ gives growth; $0 < c < 1$ gives decay.', '$\\left(\\frac{1}{c}\\right)^{x} = c^{-x}$: the two graphs are reflections in the $y$-axis.', 'Domain: all real numbers. Range: $y > 0$.', '$y$-intercept $1$, no $x$-intercept, horizontal asymptote $y = 0$.'] }],
      lines: [
        { say: 'Let’s sum up. A base greater than one gives growth, and a base between zero and one gives decay.', show: 'sum.0' },
        { say: 'One over c, to the power x, is c to the power negative x, so the two graphs are mirror images in the y-axis.', show: 'sum.1' },
        { say: 'Every graph of y equals c to the power x has domain all real numbers and range y greater than zero.', show: 'sum.2' },
        { say: 'Its y-intercept is one, it has no x-intercept, and its horizontal asymptote is y equals zero. In part three, we find the equation of an exponential function from two points. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
