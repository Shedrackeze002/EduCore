import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-4, 6], y: [-5, 6], every: 0 });
const g2 = plane({ x: [-4, 4], y: [-1, 8], every: 2 });
const g3 = plane({ x: [-3, 7], y: [-1, 8], every: 2 });

const video: Explainer = {
  id: 'm201-3-1',
  lessonId: 'm201-3-1',
  title: 'Quadratic Functions in Vertex Form, Part 1: Transforming y = x²',
  thumbnailTitle: 'Vertex Form',
  thumbnail: 'par',
  summary: 'Quadratic functions and parabolas, the vertex, axis of symmetry and intercepts of y = (x − 1)² − 4, and how a stretches or reflects y = x² while p and q translate it, including the sign of p. Parts 2 and 3 read features, domain and range from vertex form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.1 · Part 1', title: 'Vertex Form', subtitle: 'y = a(x − p)² + q' }],
      lines: [
        { say: 'The arc of a basketball shot, the curve of a satellite dish, and the path of water from a fountain are all parabolas.', show: 'title' },
        { say: 'Written in vertex form, a quadratic function shows its most important features at a glance. In this video, you will see how each part of vertex form changes the graph of y equals x squared.' },
      ],
    },
    {
      chapter: 'Parabolas',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('par', [
          g1,
          polyline(g1, { id: 'axis', points: [[1, -5], [1, 6]], tone: 'muted', dashed: true }),
          plot(g1, { id: 'curve', f: (x) => (x - 1) ** 2 - 4, tone: 'brand' }),
          dots(g1, [
            { id: 'V', x: 1, y: -4, tex: '(1, -4)', tone: 'opp', place: 'below right' },
            { id: 'r1', x: -1, y: 0, tex: '-1', tone: 'adj', place: 'above left', group: 'ints' },
            { id: 'r2', x: 3, y: 0, tex: '3', tone: 'adj', place: 'above right', group: 'ints' },
            { id: 'yi', x: 0, y: -3, tex: '-3', tone: 'good', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['A **quadratic function**: $y = ax^2 + bx + c$, $a \\ne 0$.', 'The **vertex** is the turning point: a minimum or a maximum.', 'The **axis of symmetry** is the vertical line through it.'] }],
      lines: [
        { say: 'A quadratic function can be written as y equals "a" x squared, plus b x, plus c, where "a" is not zero. Its graph is a U-shaped curve called a parabola.', show: ['par.grid', 'par.axes', 'par.curve', 'b.0'] },
        { say: 'The vertex is the turning point: the lowest point, a minimum, when the parabola opens up, or the highest point, a maximum, when it opens down.', show: ['par.V', 'b.1'], focus: 'par.V' },
        { say: 'The axis of symmetry is the vertical line through the vertex. The parabola is its own mirror image in this line.', show: ['par.axis', 'b.2'], focus: 'par.axis' },
        { say: 'This is y equals x minus one, squared, minus four. Its vertex is one, negative four, and its axis of symmetry is x equals one. It opens up, so negative four is its minimum value.', focus: ['par.V', 'par.axis'] },
        { say: 'Its x-intercepts, negative one and three, are each two units from the axis, and its y-intercept is negative three.', show: ['par.ints', 'par.yi'], focus: ['par.ints', 'par.yi'] },
      ],
    },
    {
      chapter: 'Stretching with a',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('st', [
          g2,
          plot(g2, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g2, { id: 'narrow', f: (x) => 2 * x * x, tone: 'opp' }),
          plot(g2, { id: 'wide', f: (x) => 0.5 * x * x, tone: 'adj' }),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['[[opp:Orange]], $y = 2x^2$: stretched, **narrower**.', '[[adj:Blue]], $y = \\tfrac{1}{2}x^2$: **wider**.', '$a < 0$: also reflected in the $x$-axis: it opens **down**.'] }],
      lines: [
        { say: 'The vertex form of a quadratic function is y equals "a" times x minus p, squared, plus q. Each parameter transforms the graph of y equals x squared, shown in grey.', show: ['st.grid', 'st.axes', 'st.base'] },
        { say: 'For y equals two x squared, every y-value of x squared is doubled. That stretches the graph vertically, so it is narrower.', show: ['st.narrow', 'b.0'], focus: 'st.narrow' },
        { say: 'For y equals one half x squared, every y-value is halved, so the graph is wider.', show: ['st.wide', 'b.1'], focus: 'st.wide' },
        { say: 'And when "a" is negative, the graph is also reflected in the x-axis, so it opens down.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Translating with p and q',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('tr', [
          g3,
          plot(g3, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g3, { id: 'moved', f: (x) => (x - 3) ** 2 + 2, tone: 'brand' }),
          dots(g3, [
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'muted', place: 'above left' },
            { id: 'V', x: 3, y: 2, tex: '(3, 2)', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'bullets', id: 'b', items: ['$p$: right when $p > 0$, left when $p < 0$.', '$q$: up when $q > 0$, down when $q < 0$.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of p', md: '$y = (x + 3)^2$ moves **left** 3. Write $x + 3$ as $x - (-3)$: then $p = -3$.' },
      ],
      lines: [
        { say: 'p gives a horizontal translation: right when p is positive, and left when p is negative. q gives a vertical translation: up when q is positive, and down when q is negative.', show: ['tr.grid', 'tr.axes', 'tr.base', 'tr.O', 'b.0', 'b.1'] },
        { say: 'y equals x minus three, squared, plus two, is the graph of y equals x squared moved three units right and two units up. The vertex moves from zero, zero, to three, two.', show: ['tr.moved', 'tr.V'], focus: ['tr.moved', 'tr.V'] },
        { say: 'Watch the sign of p. In y equals x plus three, squared, the graph moves three units left, not right. Write x plus three as x minus negative three: then p is negative three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How is the graph of $y = (x + 5)^2 - 2$ related to the graph of $y = x^2$?',
          choices: ['$5$ units left, $2$ units down', '$5$ units right, $2$ units down', '$5$ units left, $2$ units up', '$2$ units left, $5$ units down'],
          answer: 0,
          working: '$x + 5 = x - (-5)$, so $p = -5$: $5$ units left. $q = -2$: $2$ units down.',
        },
      ],
      lines: [
        { say: 'Your turn. How is the graph of y equals x plus five, squared, minus two, related to the graph of y equals x squared? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus five is x minus negative five, so p is negative five: five units left. And q is negative two: two units down. B gets the sign of p wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$|a|$ stretches the graph; $a < 0$ reflects it so it opens down.', '$p$ translates it horizontally: watch the sign.', '$q$ translates it vertically.'] }],
      lines: [
        { say: 'Let’s sum up. In vertex form, the size of "a" stretches the graph, and a negative "a" reflects it so it opens down.', show: 'sum.0' },
        { say: 'p translates the graph horizontally, so watch its sign.', show: 'sum.1' },
        { say: 'And q translates the graph vertically. In part two, we read the vertex and other features straight from vertex form. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
