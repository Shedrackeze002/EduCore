import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-7, 5], y: [-1, 8], every: 2 });
const root = (x: number) => Math.sqrt(Math.max(0, x));

const video: Explainer = {
  id: 'm301-2-1-b',
  lessonId: 'm301-2-1',
  title: 'Radical Functions and Transformations, Part 2: Mapping the Key Points',
  thumbnailTitle: 'Mapping the Key Points',
  thumbnail: 'map',
  summary: 'What the parameters a, b, h and k do in y = a√(b(x − h)) + k, the mapping (x, y) → (x/b + h, ay + k) that moves the endpoint (0, 0) to (h, k), and graphing y = 2√(−(x − 3)) + 1 from the images of the key points of y = √x.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.1 · Part 2', title: 'Mapping the Key Points', subtitle: 'Stretch, reflect, translate' }],
      lines: [
        { say: 'Every radical function in this unit is the graph of y equals the square root of x, stretched, reflected or moved somewhere new.', show: 'title' },
        { say: 'In this video, you will read the four parameters, "a", b, h and k, and use a mapping rule to move the key points onto the new graph.' },
      ],
    },
    {
      chapter: 'The four parameters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a\\sqrt{b(x - h)} + k'] },
        {
          kind: 'table',
          id: 't',
          head: ['Parameter', 'What it does'],
          rows: [
            ['$a$', 'Vertical stretch by a factor of $|a|$; if $a < 0$, a reflection in the $x$-axis'],
            ['$b$', 'Horizontal stretch by a factor of $\\frac{1}{|b|}$; if $b < 0$, a reflection in the $y$-axis'],
            ['$h$', 'Horizontal translation of $h$ units'],
            ['$k$', 'Vertical translation of $k$ units'],
          ],
        },
      ],
      lines: [
        { say: 'The transformed function is y equals "a" times the square root of b times x minus h, plus k.', show: 'm.0' },
        { say: 'The parameter "a" stretches the graph vertically, by a factor of the absolute value of "a". If "a" is negative, the graph is also reflected in the x-axis, so it falls instead of rising.', show: 't.0', focus: 't.0' },
        { say: 'b stretches the graph horizontally, by a factor of one over the absolute value of b. If b is negative, the graph is reflected in the y-axis, so it opens to the left instead of the right.', show: 't.1', focus: 't.1' },
        { say: 'h and k translate the graph: h units horizontally, and k units vertically.', show: ['t.2', 't.3'], focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'The mapping rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)', '(0, 0) \\to (h, k)'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Stretch first, then translate', md: 'For $x$, divide by $b$, then add $h$. For $y$, multiply by $a$, then add $k$.' },
      ],
      lines: [
        { say: 'Each point x, y on y equals the square root of x moves to a new point. Its x-coordinate is divided by b, and then h is added. Its y-coordinate is multiplied by "a", and then k is added.', show: 'm.0', focus: 'm.0' },
        { say: 'Stretches and reflections come first, and translations last.', show: 'tip' },
        { say: 'Watch what happens to the endpoint, zero, zero. Zero over b, plus h, is h. And "a" times zero, plus k, is k. So the endpoint always moves to h, k.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reading the parameters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2\\sqrt{-(x - 3)} + 1', 'a = 2,\\quad b = -1,\\quad h = 3,\\quad k = 1', '(x, y) \\to (-x + 3,\\ 2y + 1)'] },
        { kind: 'bullets', id: 'b', items: ['Vertical stretch by a factor of $2$', 'Reflection in the $y$-axis', 'Translation $3$ units right and $1$ unit up'] },
      ],
      lines: [
        { say: 'Let’s graph y equals two times the square root of negative, x minus three, plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Match it to the general form. "a" is two, b is negative one, h is three, and k is one.', show: 'm.1', focus: 'm.1' },
        { say: 'So the graph of y equals the square root of x is stretched vertically by a factor of two, reflected in the y-axis, and translated three units right and one unit up.', show: 'b' },
        { say: 'The mapping rule becomes: x, y goes to negative x plus three, two y plus one. Dividing by negative one just changes the sign of x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Plotting the image',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('map', [
          g,
          plot(g, { id: 'base', f: root, from: 0, to: 5, tone: 'muted', samples: 200 }),
          plot(g, { id: 'image', f: (x) => 2 * root(3 - x) + 1, from: -7, to: 3, samples: 300 }),
          dots(g, [
            { id: 'P0', x: 3, y: 1, tex: '(3, 1)', tone: 'opp', place: 'right' },
            { id: 'P1', x: 2, y: 3, tex: '(2, 3)', tone: 'opp', place: 'above right' },
            { id: 'P2', x: -1, y: 5, tex: '(-1, 5)', tone: 'opp', place: 'below left' },
            { id: 'P3', x: -6, y: 7, tex: '(-6, 7)', tone: 'opp', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'table', id: 't', head: ['$(x, y)$', '$(-x + 3,\\ 2y + 1)$'], rows: [['$(0, 0)$', '$(3, 1)$'], ['$(1, 1)$', '$(2, 3)$'], ['$(4, 2)$', '$(-1, 5)$'], ['$(9, 3)$', '$(-6, 7)$']] }],
      lines: [
        { say: 'The grey curve is y equals the square root of x. Now map its key points.', show: ['map.grid', 'map.axes', 'map.base'] },
        { say: 'Zero, zero goes to negative zero plus three, and two times zero plus one: the endpoint, three, one.', show: ['t.0', 'map.P0'], focus: ['t.0', 'map.P0'] },
        { say: 'One, one goes to negative one plus three, and two plus one: the point at two, three.', show: ['t.1', 'map.P1'], focus: ['t.1', 'map.P1'] },
        { say: 'In the same way, four, two goes to negative one, five, and nine, three goes to negative six, seven.', show: ['t.2', 't.3', 'map.P2', 'map.P3'], focus: ['t.2', 't.3', 'map.P2', 'map.P3'] },
        { say: 'Join the points with a smooth curve. Because b is negative, it opens to the left from the endpoint, three, one. Because "a" is positive, it rises as it goes.', show: 'map.image', focus: 'map.image' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sqrt{x + 2} = \\sqrt{x - (-2)}', 'h = -2:\\quad (0, 0) \\to (-2, 0)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of h', md: 'In $y = \\sqrt{x + 2}$, $h$ is $-2$, not $2$: the graph moves $2$ units **left**. Write the radicand as $x - h$ before you read $h$.' },
      ],
      lines: [
        { say: 'Watch the sign of h. In y equals the square root of x plus two, h is not two.', show: 'm.0', focus: 'm.0' },
        { say: 'The general form has x minus h, and x plus two is x minus negative two. So h is negative two, and the endpoint moves two units left, to negative two, zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So write the radicand, the expression under the root, as x minus h before you read h.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(4, 2)$ is on $y = \\sqrt{x}$. Where is its image on the graph of $y = 3\\sqrt{x + 1} - 2$?',
          choices: ['$(5, 4)$', '$(3, 4)$', '$(3, 0)$', '$(5, 0)$'],
          answer: 1,
          working: '$a = 3$, $b = 1$, $h = -1$ and $k = -2$, so $(x, y) \\to (x - 1,\\ 3y - 2)$ and $(4, 2) \\to (4 - 1,\\ 3(2) - 2) = (3, 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at four, two is on y equals the square root of x. Where is its image on the graph of y equals three times the square root of x plus one, minus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Here "a" is three, h is negative one, and k is negative two, so x, y goes to x minus one, three y minus two. Four, two goes to three, four. Choice A moves the point right instead of left: x plus one means h is negative one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['In $y = a\\sqrt{b(x - h)} + k$, $a$ and $b$ stretch and reflect; $h$ and $k$ translate.', 'Mapping: $(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.', 'The endpoint $(0, 0)$ moves to $(h, k)$.'] }],
      lines: [
        { say: 'Let’s sum up. In y equals "a" times the square root of b times x minus h, plus k, "a" and b stretch and reflect the graph, and h and k translate it.', show: 'sum.0' },
        { say: 'Each point x, y maps to x over b plus h, "a" y plus k.', show: 'sum.1' },
        { say: 'And the endpoint, zero, zero, moves to h, k. In part three, we read the domain and range straight from the equation. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
