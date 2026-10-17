import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-5, 3], y: [-4, 6], every: 4, width: 9, height: 9 });

/** The name of the asymptote, above the dashed line at the left edge of the graph. */
const name: Part = { points: { an: g.map(-4.9, 3) }, items: [{ kind: 'label', id: 'asy-name', at: 'an', tex: 'y = 3', tone: 'theta', place: 'above right' }] };

const video: Explainer = {
  id: 'm301-7-2',
  lessonId: 'm301-7-2',
  title: 'Transformations of Exponential Functions, Part 1: The Transformation Equation',
  thumbnailTitle: 'Transforming Exponential Functions',
  thumbnail: 'tr',
  summary: 'What a, b, h and k do in y = a(c)^(b(x − h)) + k, why only k moves the horizontal asymptote, and the transformations, graph, asymptote, domain and range of y = −2^(x + 2) + 3. Also how to read the sign of h. Part 2 maps points with the mapping rule.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.2 · Part 1', title: 'The Transformation Equation', subtitle: 'Stretch, reflect and translate $y = c^{x}$' }],
      lines: [
        { say: 'A cup of tea left on a counter cools toward room temperature, not toward zero degrees. Its graph is an exponential decay curve that has been moved up, so that its asymptote sits at room temperature.', show: 'title' },
        { say: 'In this video, you will read the four parameters of a transformed exponential function, and find its asymptote, domain and range.' },
      ],
    },
    {
      chapter: 'The four parameters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a(c)^{b(x - h)} + k'] },
        {
          kind: 'table',
          id: 't',
          head: ['Parameter', 'Effect on the graph of $y = c^{x}$'],
          rows: [
            ['$a$', 'Vertical stretch by a factor of $|a|$; if $a < 0$, a reflection in the $x$-axis'],
            ['$b$', 'Horizontal stretch by a factor of $\\frac{1}{|b|}$; if $b < 0$, a reflection in the $y$-axis'],
            ['$h$', 'Horizontal translation: right if $h > 0$, left if $h < 0$'],
            ['$k$', 'Vertical translation: up if $k > 0$, down if $k < 0$'],
          ],
        },
      ],
      lines: [
        { say: 'Every transformation you have studied works on exponential functions too. Starting from y equals c to the power x, the transformed function is y equals "a" times c to the power b times x minus h, plus k.', show: 'm.0' },
        { say: '"a" stretches the graph vertically, by a factor of the absolute value of "a". If "a" is negative, it also reflects the graph in the x-axis.', show: 't.0', focus: 't.0' },
        { say: 'b stretches the graph horizontally, by a factor of one over the absolute value of b. If b is negative, it reflects the graph in the y-axis.', show: 't.1', focus: 't.1' },
        { say: 'h translates the graph left or right, and k translates it up or down.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
        { say: 'Only k moves the horizontal asymptote. The asymptote y equals zero moves up or down with the graph, to y equals k.' },
      ],
    },
    {
      chapter: 'Reading the parameters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = -2^{x + 2} + 3', 'y = -1(2)^{x - (-2)} + 3', 'a = -1,\\quad h = -2,\\quad k = 3'] },
        { kind: 'bullets', id: 'b', items: ['$a = -1$: reflection in the $x$-axis', '$h = -2$: translation $2$ units left', '$k = 3$: translation $3$ units up'] },
      ],
      lines: [
        { say: 'Describe how y equals negative two to the power x plus two, plus three, is related to y equals two to the power x.', show: 'm.0', focus: 'm.0' },
        { say: 'The negative sign is in front of the power, not part of the base. The base is still two, and "a" is negative one. Writing x plus two as x minus negative two shows that h is negative two. And k is three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So the graph of y equals two to the power x is reflected in the x-axis, then translated two units left and three units up.', show: 'b' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('tr', [
          g,
          polyline(g, { id: 'asy', points: [[-5, 3], [3, 3]], tone: 'theta', dashed: true }),
          name,
          plot(g, { id: 'parent', f: (x) => 2 ** x, tone: 'muted', samples: 200 }),
          plot(g, { id: 'image', f: (x) => -(2 ** (x + 2)) + 3, samples: 200 }),
          dots(g, [
            { id: 'P1', x: 1, y: 2, tex: '(1, 2)', tone: 'muted', place: 'below right' },
            { id: 'P2', x: 2, y: 4, tex: '(2, 4)', tone: 'muted', place: 'above left' },
            { id: 'Q1', x: -1, y: 1, tex: '(-1, 1)', tone: 'opp', place: 'left' },
            { id: 'Q2', x: 0, y: -1, tex: '(0, -1)', tone: 'opp', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{Asymptote: } y = 3', '\\text{Domain: } \\{x \\mid x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y < 3,\\ y \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'The grey curve is y equals two to the power x, through the points at one, two, and two, four.', show: ['tr.grid', 'tr.axes', 'tr.parent', 'tr.P1', 'tr.P2'], focus: 'tr.parent' },
        { say: 'Reflecting in the x-axis turns one, two, into one, negative two. Moving it two left and three up gives negative one, one. In the same way, two, four, goes to zero, negative one.', show: ['tr.Q1', 'tr.Q2'], focus: ['tr.Q1', 'tr.Q2'] },
        { say: 'The asymptote, y equals zero, moves up three units, to y equals three.', show: ['tr.asy', 'tr.asy-name', 'm.0'], focus: ['tr.asy', 'm.0'] },
        { say: 'Now draw the purple curve through the new points, getting closer and closer to the asymptote on the left. Because of the reflection, the graph lies below the asymptote.', show: 'tr.image', focus: 'tr.image' },
        { say: 'The domain is still all real numbers. But the range is now y less than three.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2^{x + 2} = 2^{x - (-2)}', 'h = -2:\\quad 2 \\text{ units left}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of h', md: 'In $y = 2^{x + 2}$, $h = -2$, so the graph moves **left** $2$ units. Write the exponent as $x - (-2)$ to read $h$ correctly.' },
      ],
      lines: [
        { say: 'Watch the sign of h. In y equals two to the power x plus two, h is not two.', show: 'm.0', focus: 'm.0' },
        { say: 'The general form has x minus h, and x plus two is x minus negative two. So h is negative two, and the graph moves two units left, not right.', show: 'm.1', focus: 'm.1' },
        { say: 'So write the exponent in the form x minus h before you read h.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the range of $y = -4(3)^{x - 1} + 2$.',
          choices: ['$\\{y \\mid y > 2,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y < -2,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y > -4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y < 2,\\ y \\in \\mathbb{R}\\}$'],
          answer: 3,
          working: '$k = 2$, so the asymptote is $y = 2$. Because $a = -4 < 0$, the graph is reflected in the $x$-axis and lies below the asymptote: $y < 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the range of y equals negative four times three to the power x minus one, plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. k is two, so the asymptote is y equals two. "a" is negative, so the graph is reflected and lies below the asymptote: y less than two. Choice A would be right only if "a" were positive.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In $y = a(c)^{b(x - h)} + k$, $a$ and $b$ stretch and reflect; $h$ and $k$ translate.', 'The horizontal asymptote is $y = k$.', 'The range is $y > k$ when $a > 0$, and $y < k$ when $a < 0$. The domain is all real numbers.', 'Write the exponent as $x - h$ before reading $h$.'] }],
      lines: [
        { say: 'Let’s sum up. In y equals "a" times c to the power b times x minus h, plus k, "a" and b stretch and reflect the graph, and h and k translate it.', show: 'sum.0' },
        { say: 'The horizontal asymptote is y equals k.', show: 'sum.1' },
        { say: 'The range is y greater than k when "a" is positive, and y less than k when "a" is negative. The domain is always all real numbers.', show: 'sum.2' },
        { say: 'And write the exponent as x minus h before you read h. In part two, we use a mapping rule to find image points. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
