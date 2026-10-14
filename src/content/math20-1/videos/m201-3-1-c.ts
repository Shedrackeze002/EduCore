import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-6, 2], y: [-6, 4], every: 2 });
const g2 = plane({ x: [-6, 3], y: [-8, 5], every: 2 });
const g3 = plane({ x: [0, 11], y: [0, 7], every: 2, titles: { x: 'd\\text{ (m)}', y: 'h\\text{ (m)}' } });
const land = 5 + Math.sqrt(30);

const video: Explainer = {
  id: 'm201-3-1-c',
  lessonId: 'm201-3-1',
  title: 'Quadratic Functions in Vertex Form, Part 3: Domain, Range and Models',
  thumbnailTitle: 'Domain, Range and Models',
  thumbnail: 'ball',
  summary: 'The domain and range of a quadratic function in set and interval notation, why the range depends on q and not p, mapping a point (x, y) on y = x² to (x + p, ay + q), and the maximum height and range of a thrown ball modelled in vertex form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.1 · Part 3', title: 'Domain, Range and Models', subtitle: 'Where the parabola can go' }],
      lines: [
        { say: 'A parabola stretches forever left and right, but it only goes so high, or so low. Vertex form tells you exactly where it stops.', show: 'title' },
        { say: 'In this video, you will state the domain and range of a quadratic function, map points onto a transformed graph, and model a thrown ball.' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('dr', [
          g1,
          polyline(g1, { id: 'floor', points: [[-6, -5], [2, -5]], tone: 'good', dashed: true }),
          plot(g1, { id: 'curve', f: (x) => 3 * (x + 2) ** 2 - 5, tone: 'brand' }),
          dots(g1, [{ id: 'V', x: -2, y: -5, tex: '(-2, -5)', tone: 'opp', place: 'below right' }]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Domain and range', md: 'The **domain** is every possible $x$-value; the **range**, every possible $y$-value. $\\{y \\mid y \\ge 3,\\ y \\in \\mathbb{R}\\}$ is "all real $y$ such that $y \\ge 3$".' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\{x \\mid x \\in \\mathbb{R}\\}', '\\{y \\mid y \\ge -5,\\ y \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'The domain is the set of all possible x-values of a function, and the range is the set of all possible y-values. The set notation here reads: all real numbers y, such that y is at least three.', show: 'def' },
        { say: 'Any real number can be put in for x, so the domain of every quadratic function is all real numbers.', show: ['dr.grid', 'dr.axes', 'dr.curve', 'm.0'], focus: 'm.0' },
        { say: 'The range starts at the y-coordinate of the vertex. For y equals three times x plus two, squared, minus five, the vertex is negative two, negative five, and "a" is positive, so the parabola opens up.', show: ['dr.V', 'dr.floor'], focus: ['dr.V', 'dr.floor'] },
        { say: 'So the range is all real y greater than or equal to negative five. In interval notation, that is the square bracket negative five, to infinity.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'q, not p',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using p in the range', md: 'The range depends on $q$, the $y$-coordinate of the vertex. For $y = 3(x + 2)^2 - 5$ the range is $y \\ge -5$, **not** $y \\ge -2$.' },
        { kind: 'bullets', id: 'b', items: ['$a > 0$: range $\\{y \\mid y \\ge q,\\ y \\in \\mathbb{R}\\}$, or $[q, \\infty)$.', '$a < 0$: range $\\{y \\mid y \\le q,\\ y \\in \\mathbb{R}\\}$, or $(-\\infty, q]$.'] },
      ],
      lines: [
        { say: 'The range depends on q, the y-coordinate of the vertex, not on p. For this parabola, the range is y greater than or equal to negative five, not negative two.', show: 'oops' },
        { say: 'In general, when "a" is positive, the range is y greater than or equal to q. When "a" is negative, it is y less than or equal to q.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'Mapping points',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('map', [
          g2,
          plot(g2, { id: 'base', f: (x) => x * x, tone: 'muted' }),
          plot(g2, { id: 'image', f: (x) => -2 * (x + 4) ** 2 + 1, tone: 'brand' }),
          dots(g2, [
            { id: 'P', x: 2, y: 4, tex: '(2, 4)', tone: 'adj', place: 'right' },
            { id: 'Q', x: -2, y: -7, tex: '(-2, -7)', tone: 'opp', place: 'right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x, y) \\to (x + p,\\ ay + q)', 'x: 2 + (-4) = -2', 'y: -2(4) + 1 = -7', '-2(-2 + 4)^2 + 1 = -7 \\;\\checkmark'] }],
      lines: [
        { say: 'Each point x, y on y equals x squared maps to the point x plus p, "a" y plus q, on the transformed graph. Stretch and reflect the y-coordinate first, then translate.', show: ['map.grid', 'map.axes', 'map.base', 'm.0'], focus: 'm.0' },
        { say: 'The point at two, four is on y equals x squared. Find its image on y equals negative two times x plus four, squared, plus one. For x: two plus negative four is negative two.', show: ['map.P', 'm.1'], focus: ['map.P', 'm.1'] },
        { say: 'For y: negative two times four, plus one, is negative seven. The image is negative two, negative seven.', show: ['map.image', 'map.Q', 'm.2'], focus: ['map.Q', 'm.2'] },
        { say: 'Check it in the equation: negative two times two squared, plus one, is negative seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A thrown ball',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('ball', [
          g3,
          plot(g3, { id: 'path', f: (d) => -0.2 * (d - 5) ** 2 + 6, from: 0, to: land, tone: 'opp' }),
          dots(g3, [
            { id: 'S', x: 0, y: 1, tex: '1', tone: 'adj', place: 'right' },
            { id: 'V', x: 5, y: 6, tex: '(5, 6)', tone: 'opp', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = -0.2(d - 5)^2 + 6', '\\text{maximum } 6\\text{ m at } d = 5\\text{ m}', '\\{h \\mid 0 \\le h \\le 6,\\ h \\in \\mathbb{R}\\}'] }],
      lines: [
        { say: 'A ball thrown from a height of one metre follows h equals negative 0.2 times d minus five, squared, plus six, where h is its height and d the horizontal distance, both in metres.', show: ['ball.grid', 'ball.axes', 'ball.path', 'ball.S', 'm.0'] },
        { say: 'The vertex is five, six, and "a" is negative, so the maximum height is six metres, at a distance of five metres.', show: ['ball.V', 'm.1'], focus: ['ball.V', 'm.1'] },
        { say: 'The ball starts at one metre, rises to six, then falls to the ground. From release until it lands, its heights run from zero to six metres, so the range is h between zero and six.', show: 'm.2', focus: ['ball.path', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the range of $y = -(x - 1)^2 + 4$?',
          choices: ['$\\{y \\mid y \\le 4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\ge 4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\le 1,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid y \\in \\mathbb{R}\\}$'],
          answer: 0,
          working: 'The vertex is $(1, 4)$ and $a = -1 < 0$, so the parabola opens down and $4$ is the maximum value: $y \\le 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the range of y equals negative, x minus one, squared, plus four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The vertex is one, four, and "a" is negative one, so the parabola opens down, and four is the maximum value. B has the inequality the wrong way, and C uses p instead of q.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Domain: $\\{x \\mid x \\in \\mathbb{R}\\}$. Range: $y \\ge q$ or $y \\le q$.', '$(x, y)$ on $y = x^2$ maps to $(x + p,\\ ay + q)$.', 'A context can limit the domain and range.'] }],
      lines: [
        { say: 'Let’s sum up. The domain of a quadratic function is all real numbers, and its range is y at least q, or y at most q.', show: 'sum.0' },
        { say: 'A point x, y on y equals x squared maps to x plus p, "a" y plus q.', show: 'sum.1' },
        { say: 'And in a context, the situation can limit the domain and range. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
