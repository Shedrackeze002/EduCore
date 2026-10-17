import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 4], y: [-1, 9], every: 2, width: 10, height: 8.5 });
const m = plane({ x: [-3, 5], y: [-1, 10], every: 2, width: 10, height: 9 });

/** A label (TeX) beside the point (x, y) of a plane, with no dot: the name of a curve. */
const tag = (id: string, at: [number, number], tex: string, tone: 'brand' | 'muted', place: 'left' | 'right'): Part => ({
  points: { [id]: m.map(...at) },
  items: [{ kind: 'label', id, at: id, tex, tone, place }],
});

const video: Explainer = {
  id: 'm301-7-1',
  lessonId: 'm301-7-1',
  title: 'Characteristics of Exponential Functions, Part 1: What an Exponential Function Is',
  thumbnailTitle: 'Exponential Functions',
  thumbnail: 'tab',
  summary: 'What an exponential function y = cˣ is, why its base must be positive and not 1, the table and graph of y = 2ˣ, evaluating 4⁻³ and 4^(1/2), and how y = 3ˣ differs from a power function. Part 2 compares growth and decay and lists the key characteristics of the graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.1 · Part 1', title: 'Exponential Functions', subtitle: 'The variable is in the exponent' }],
      lines: [
        { say: 'A culture of 100 bacteria doubles every hour. After just ten hours, it holds more than one hundred thousand bacteria.', show: 'title' },
        { say: 'In this video, you will meet the functions that grow like that: exponential functions. You will see why their base has rules, draw a first graph, and evaluate one.' },
      ],
    },
    {
      chapter: 'The same factor each step',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['100 \\to 200 \\to 400 \\to 800 \\to \\cdots', '100 \\times 2^{10} = 102\\,400'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Exponential change', md: 'An exponential function grows or shrinks by the same **factor** each step, not by the same amount.' },
      ],
      lines: [
        { say: 'Follow the bacteria. One hundred becomes two hundred, then four hundred, then eight hundred. Each hour, the number is multiplied by two.', show: 'm.0', focus: 'm.0' },
        { say: 'After ten hours, it has been multiplied by two ten times. That is 100 times two to the power ten, which is 102,400.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice that the number does not go up by the same amount each hour. It goes up by the same factor. When the variable, here the number of hours, is in the exponent, that is what happens.', show: 'key' },
      ],
    },
    {
      chapter: 'Exponential functions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Exponential function', md: 'A function of the form $y = c^{x}$, where the base $c$ is a constant with $c > 0$ and $c \\ne 1$, and the exponent $x$ is the variable.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['c = 1:\\quad 1^{x} = 1 \\text{ for every } x', 'c < 0:\\quad (-4)^{\\frac{1}{2}} = \\sqrt{-4} \\text{ is not real}'] },
      ],
      lines: [
        { say: 'An exponential function has the form y equals c to the power x. The base, c, is a constant, and the exponent, x, is the variable.', show: 'def' },
        { say: 'The base must be greater than zero, and it cannot be one. Here is why.' },
        { say: 'If c were one, then one to the power x is one, for every x. The graph is a flat horizontal line, with no growth at all.', show: 'm.0', focus: 'm.0' },
        { say: 'If c were negative, some powers would not be real. Negative four to the power one half is the square root of negative four, which is not a real number. The graph would be full of gaps.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A table of values',
      layout: 'split',
      leftWidth: 800,
      left: [
        figure('tab', [
          g,
          plot(g, { id: 'curve', f: (x) => 2 ** x, samples: 200 }),
          dots(g, [
            { id: 'P0', x: -2, y: 0.25, tone: 'opp', group: 'neg' },
            { id: 'P1', x: -1, y: 0.5, tone: 'opp', group: 'neg' },
            { id: 'P2', x: 0, y: 1, tex: '(0, 1)', tone: 'opp', place: 'below right' },
            { id: 'P3', x: 1, y: 2, tex: '(1, 2)', tone: 'opp', place: 'below right' },
            { id: 'P4', x: 2, y: 4, tex: '(2, 4)', tone: 'opp', place: 'below right' },
            { id: 'P5', x: 3, y: 8, tex: '(3, 8)', tone: 'opp', place: 'right' },
          ]),
        ]),
      ],
      right: [{ kind: 'table', id: 't', head: ['$x$', '$y = 2^{x}$'], rows: [['$-2$', '$\\frac{1}{4}$'], ['$-1$', '$\\frac{1}{2}$'], ['$0$', '$1$'], ['$1$', '$2$'], ['$2$', '$4$'], ['$3$', '$8$']] }],
      lines: [
        { say: 'Make a table of values for y equals two to the power x.', show: ['tab.grid', 'tab.axes'] },
        { say: 'Two to the power zero is one. Two to the power one is two, two squared is four, and two cubed is eight. Each time x goes up by one, y doubles.', show: ['t.2', 't.3', 't.4', 't.5', 'tab.P2', 'tab.P3', 'tab.P4', 'tab.P5'], focus: ['t.2', 't.3', 't.4', 't.5'] },
        { say: 'Going the other way, y halves. Two to the power negative one is one half, and two to the power negative two is one quarter.', show: ['t.0', 't.1', 'tab.neg'], focus: ['t.0', 't.1', 'tab.neg'] },
        { say: 'Join the points with a smooth curve. On the left, it creeps closer and closer to the x-axis. On the right, it shoots up faster and faster.', show: 'tab.curve', focus: 'tab.curve' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 4^{x}', 'f(-3) = 4^{-3} = \\dfrac{1}{4^{3}} = \\dfrac{1}{64}', 'f\\left(\\tfrac{1}{2}\\right) = 4^{\\frac{1}{2}} = \\sqrt{4} = 2'] },
      ],
      lines: [
        { say: 'For f of x equals four to the power x, find f of negative three and f of one half.', show: 'm.0', focus: 'm.0' },
        { say: 'A negative exponent means a reciprocal. Four to the power negative three is one over four cubed, which is one over 64.', show: 'm.1', focus: 'm.1' },
        { say: 'An exponent of one half means a square root. Four to the power one half is the square root of four, which is two.', show: 'm.2', focus: 'm.2' },
        { say: 'Notice that both answers are positive. A positive base to any power is always positive.' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('pw', [
          m,
          plot(m, { id: 'sq', f: (x) => x * x, tone: 'muted', samples: 200 }),
          plot(m, { id: 'exp', f: (x) => 3 ** x, samples: 200 }),
          tag('Ls', [-2.55, 6.5], 'y = x^{2}', 'muted', 'right'),
          tag('Le', [2.0, 9.4], 'y = 3^{x}', 'brand', 'left'),
        ]),
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Power or exponential?', md: 'In $x^{3}$, the variable is the **base**: a power function. In $3^{x}$, the variable is the **exponent**: an exponential function.' }],
      lines: [
        { say: 'Do not mix up x cubed and three to the power x. In x cubed, the variable is the base: that is a power function. In three to the power x, the variable is the exponent: that is an exponential function.', show: 'oops' },
        { say: 'Their graphs look different too. Here, the grey curve is the power function y equals x squared. It touches the x-axis at the origin.', show: ['pw.grid', 'pw.axes', 'pw.sq', 'pw.Ls'], focus: 'pw.sq' },
        { say: 'The purple curve is y equals three to the power x. It never touches the x-axis, and soon it rises far faster than x squared.', show: ['pw.exp', 'pw.Le'], focus: 'pw.exp' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $f(x) = 9^{x}$, find $f\\left(-\\frac{1}{2}\\right)$.',
          choices: ['$\\frac{1}{3}$', '$-3$', '$-\\frac{9}{2}$', '$3$'],
          answer: 0,
          working: '$9^{-\\frac{1}{2}} = \\dfrac{1}{9^{\\frac{1}{2}}} = \\dfrac{1}{\\sqrt{9}} = \\dfrac{1}{3}$. The negative sign makes a reciprocal; the one half makes a square root.',
        },
      ],
      lines: [
        { say: 'Your turn. For f of x equals nine to the power x, find f of negative one half. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The negative exponent means a reciprocal, and the one half means a square root: one over the square root of nine, which is one third. B is wrong because a negative exponent never makes the value negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An exponential function has the form $y = c^{x}$, with $c > 0$ and $c \\ne 1$.', 'Each step in $x$ multiplies $y$ by the same factor, $c$.', 'A negative exponent is a reciprocal; an exponent of $\\frac{1}{2}$ is a square root.', 'In $3^{x}$ the variable is the exponent; in $x^{3}$ it is the base.'] }],
      lines: [
        { say: 'Let’s sum up. An exponential function has the form y equals c to the power x, where c is greater than zero and not equal to one.', show: 'sum.0' },
        { say: 'Each time x goes up by one, y is multiplied by the same factor, c.', show: 'sum.1' },
        { say: 'A negative exponent means a reciprocal, and an exponent of one half means a square root.', show: 'sum.2' },
        { say: 'And three to the power x is not x cubed. In part two, we compare growth and decay, and list the key features of every exponential graph. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
