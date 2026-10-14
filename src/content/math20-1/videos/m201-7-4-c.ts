import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const p1 = plane({ name: 'p1', x: [-4, 4], y: [-5, 5], every: 0 });
const p2 = plane({ name: 'p2', x: [-2, 4], y: [-5, 5], every: 0, at: [8, 0] });
const p3 = plane({ name: 'p3', x: [-2, 4], y: [-5, 5], every: 0, at: [16, 0] });

/** The number of zeros under each plane. */
const captions: Part = {
  points: { n1: [0, -5.2], n2: [9, -5.2], n3: [17, -5.2] },
  items: [
    { kind: 'label', id: 'n1-t', at: 'n1', tex: '\\text{two zeros}', place: 'below' },
    { kind: 'label', id: 'n2-t', at: 'n2', tex: '\\text{one zero}', place: 'below' },
    { kind: 'label', id: 'n3-t', at: 'n3', tex: '\\text{no zeros}', place: 'below' },
  ],
};

const two = (x: number) => 1 / (x * x - 4);
const one = (x: number) => 1 / (x - 1) ** 2;

const video: Explainer = {
  id: 'm201-7-4-c',
  lessonId: 'm201-7-4',
  title: 'Reciprocal Functions, Part 3: Quadratic Functions',
  thumbnailTitle: 'Reciprocals of Quadratics',
  thumbnail: 'qd',
  summary: 'How the number of zeros of a quadratic function gives its reciprocal three, two or one branch, the asymptotes, local maximum and four invariant points of the reciprocal of x² − 2x − 3, and reading the zeros and signs of f from the graph of 1/f.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.4 · Part 3', title: 'Reciprocals of Quadratics', subtitle: 'Three, two or one branch' }],
      lines: [
        { say: 'Take the reciprocal of a parabola, and the number of its zeros decides the shape: three branches, two, or one.', show: 'title' },
        { say: 'In this video, you will sketch the reciprocals of quadratic functions, and find their key features.' },
      ],
    },
    {
      chapter: 'Three cases',
      layout: 'center',
      main: [
        figure('qd', [
          p1,
          p2,
          p3,
          captions,
          polyline(p1, { id: 'a1', points: [[-2, -5], [-2, 5]], tone: 'muted', dashed: true }),
          polyline(p1, { id: 'a2', points: [[2, -5], [2, 5]], tone: 'muted', dashed: true }),
          plot(p1, { id: 'f', f: (x) => x * x - 4, tone: 'muted' }),
          plot(p1, { id: 'r1', f: two, from: -4, to: -2.01, samples: 200, tone: 'brand' }),
          plot(p1, { id: 'r2', f: two, from: -1.99, to: 1.99, samples: 200, tone: 'brand' }),
          plot(p1, { id: 'r3', f: two, from: 2.01, to: 4, samples: 200, tone: 'brand' }),
          polyline(p2, { id: 'a', points: [[1, -5], [1, 5]], tone: 'muted', dashed: true }),
          plot(p2, { id: 'f', f: (x) => (x - 1) ** 2, tone: 'muted' }),
          plot(p2, { id: 'r1', f: one, from: -2, to: 0.99, samples: 200, tone: 'opp' }),
          plot(p2, { id: 'r2', f: one, from: 1.01, to: 4, samples: 200, tone: 'opp' }),
          plot(p3, { id: 'f', f: (x) => (x - 1) ** 2 + 1, tone: 'muted' }),
          plot(p3, { id: 'r', f: (x) => 1 / ((x - 1) ** 2 + 1), tone: 'adj' }),
          dots(p1, [{ id: 'M', x: 0, y: -0.25, tex: '', tone: 'brand' }]),
          dots(p3, [{ id: 'M', x: 1, y: 1, tex: '', tone: 'good' }]),
        ]),
      ],
      lines: [
        { say: 'With two zeros, like x squared minus four, the reciprocal has two vertical asymptotes, at negative two and two. Between them, f is negative, with its minimum at the vertex, zero, negative four.', show: ['qd.p1-grid', 'qd.p1-axes', 'qd.p1-f', 'qd.p1-a1', 'qd.p1-a2', 'qd.n1-t'] },
        { say: 'So the reciprocal has three branches, with a middle branch below the axis, and a local maximum at zero, negative one quarter.', show: ['qd.p1-r1', 'qd.p1-r2', 'qd.p1-r3', 'qd.p1-M'], focus: ['qd.p1-r2', 'qd.p1-M'] },
        { say: 'With one zero, like x minus one, squared, the parabola touches the axis at one, and is positive elsewhere. So both branches of the reciprocal are above the axis, on either side of the asymptote x equals one.', show: ['qd.p2-grid', 'qd.p2-axes', 'qd.p2-f', 'qd.p2-a', 'qd.p2-r1', 'qd.p2-r2', 'qd.n2-t'], focus: ['qd.p2-r1', 'qd.p2-r2'] },
        { say: 'With no zeros, like x minus one, squared, plus one, f is always at least one. There is no vertical asymptote, and the minimum, one, one, becomes a maximum of the reciprocal: an invariant point.', show: ['qd.p3-grid', 'qd.p3-axes', 'qd.p3-f', 'qd.p3-r', 'qd.p3-M', 'qd.n3-t'], focus: ['qd.p3-r', 'qd.p3-M'] },
      ],
    },
    {
      chapter: 'An example',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['f(x) = x^2 - 2x - 3 = (x - 3)(x + 1)', '\\text{asymptotes: } x = -1,\\ \\ x = 3,\\ \\ y = 0', '(1, -4) \\to \\left(1, -\\tfrac{1}{4}\\right)', 'f(x) = 1:\\ x = 1 \\pm \\sqrt{5};\\qquad f(x) = -1:\\ x = 1 \\pm \\sqrt{3}'] }],
      lines: [
        { say: 'For f of x equals x squared, minus two x, minus three, find the features of its reciprocal. f factors as x minus three, times x plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'So the vertical asymptotes are x equals negative one, and x equals three, and the horizontal asymptote is y equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The vertex of f is one, negative four. Its reciprocal y-value is negative one quarter, so the reciprocal has a local maximum at one, negative one quarter.', show: 'm.2', focus: 'm.2' },
        { say: 'For the invariant points, solve f of x equals one: x is one, plus or minus root five. And f of x equals negative one: x is one, plus or minus root three. That makes four invariant points.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(p, q) \\;\\to\\; \\left(p, \\tfrac{1}{q}\\right),\\quad q \\ne 0'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Working backwards', md: 'From the graph of $y = \\dfrac{1}{f(x)}$: its vertical asymptotes are the zeros of $f$, and the sign of each branch is the sign of $f$.' },
      ],
      lines: [
        { say: 'In general, a maximum or minimum p, q of f, where q is not zero, becomes a minimum or maximum p, one over q, of the reciprocal.', show: 'm.0', focus: 'm.0' },
        { say: 'You can also work backwards. Given the graph of y equals one over f of x, its vertical asymptotes tell you the zeros of f, and the sign of each branch tells you where f is positive or negative.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many vertical asymptotes does $y = \\dfrac{1}{x^2 + 4}$ have?',
          choices: ['None', 'One', 'Two', 'Four'],
          answer: 0,
          working: '$x^2 + 4 \\ge 4$, so it is never $0$. There are no vertical asymptotes, and the graph has one branch.',
        },
      ],
      lines: [
        { say: 'Your turn. How many vertical asymptotes does y equals one over x squared plus four have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x squared plus four is at least four, so it is never zero. There are no vertical asymptotes, and the graph is a single branch, with a maximum at zero, one quarter.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two, one or no zeros of $f$: three, two or one branch.', 'A vertex $(p, q)$ becomes $\\left(p, \\tfrac{1}{q}\\right)$.', 'Asymptotes give the zeros of $f$; the branches give its signs.'] }],
      lines: [
        { say: 'Let’s sum up. A quadratic with two, one or no zeros has a reciprocal with three, two or one branch.', show: 'sum.0' },
        { say: 'A vertex p, q becomes p, one over q.', show: 'sum.1' },
        { say: 'And the asymptotes give the zeros of f, while the branches give its signs. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
