import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-1, 6], y: [-3, 5], every: 2 });
const root = (x: number) => Math.sqrt(Math.max(0, x));

/** An arrow from (4, 4) on the line down to its image (4, 2). */
const drop: Part = {
  points: { 'drop-a': g.map(4, 3.8), 'drop-b': g.map(4, 2.2) },
  items: [{ kind: 'line', id: 'drop', from: 'drop-a', to: 'drop-b', tone: 'theta', dashed: true, arrow: true }],
};

const video: Explainer = {
  id: 'm301-2-2',
  lessonId: 'm301-2-2',
  title: 'Square Root of a Function, Part 1: Invariant Points',
  thumbnailTitle: 'Square Root of a Function',
  thumbnail: 'lin',
  summary: 'How the graph of y = √f(x) comes from the graph of y = f(x): each point (x, y) with y ≥ 0 becomes (x, √y), the invariant points where f(x) = 0 or 1, and where the new graph is above or below the old one, for f(x) = 2x − 4.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.2 · Part 1', title: 'Invariant Points', subtitle: 'The square root of every output' }],
      lines: [
        { say: 'What happens to a graph when you take the square root of every output? Values between zero and one grow, values above one shrink, and negative values disappear completely.', show: 'title' },
        { say: 'In this video, you will use that one idea to draw the graph of y equals the square root of f of x from the graph of f, starting with a straight line.' },
      ],
    },
    {
      chapter: 'Square roots of the outputs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['(x, y) \\to (x, \\sqrt{y}),\\quad y \\ge 0'] },
        { kind: 'math', id: 'r', size: 'md', lines: ['\\sqrt{0} = 0 \\qquad \\sqrt{0.25} = 0.5 \\qquad \\sqrt{1} = 1', '\\sqrt{4} = 2 \\qquad \\sqrt{9} = 3 \\qquad \\sqrt{-4}\\ \\text{is not real}'] },
      ],
      lines: [
        { say: 'Start with any point x, y on the graph of y equals f of x, where y is zero or positive. The graph of y equals the square root of f of x has the point x, root y.', show: 'm.0' },
        { say: 'The x-coordinate stays the same. Only the height changes: each height is replaced by its square root.' },
        { say: 'So compare some heights with their square roots. Zero stays zero, 0.25 becomes 0.5, and one stays one.', show: 'r.0', focus: 'r.0' },
        { say: 'Four becomes two, and nine becomes three. But negative four has no real square root at all.', show: 'r.1', focus: 'r.1' },
      ],
    },
    {
      chapter: 'Above, below or gone',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            '$y = 0$ or $y = 1$: $\\sqrt{y} = y$. These are the **invariant points**.',
            '$0 < y < 1$: $\\sqrt{y} > y$, so the new graph is **above** the old one.',
            '$y > 1$: $\\sqrt{y} < y$, so the new graph is **below** the old one.',
            '$y < 0$: no real square root, so there is **no point** at all.',
          ],
        },
      ],
      lines: [
        { say: 'Zero and one are their own square roots, so a point at a height of zero or one does not move. These are the invariant points.', show: 'b.0' },
        { say: 'Between zero and one, the square root is bigger: the square root of 0.25 is 0.5. So there, the new graph is above the old one.', show: 'b.1' },
        { say: 'Above one, the square root is smaller: the square root of nine is three. So there, the new graph is below the old one.', show: 'b.2' },
        { say: 'And a negative height has no real square root. Wherever f of x is negative, the new graph has no points at all.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A linear function',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('lin', [
          g,
          plot(g, { id: 'f', f: (x) => 2 * x - 4, from: 0.5, to: 4.5, tone: 'muted' }),
          plot(g, { id: 'sf', f: (x) => root(2 * x - 4), from: 2, to: 6, samples: 300 }),
          drop,
          dots(g, [
            { id: 'A', x: 2, y: 0, tex: '(2, 0)', tone: 'opp', place: 'above left' },
            { id: 'B', x: 2.5, y: 1, tex: '(2.5, 1)', tone: 'opp', place: 'above left' },
            { id: 'C', x: 4, y: 4, tex: '(4, 4)', tone: 'muted', place: 'left' },
            { id: 'D', x: 4, y: 2, tex: '(4, 2)', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = 2x - 4', 'f(x) = 0:\\ x = 2 \\to (2, 0)', 'f(x) = 1:\\ x = 2.5 \\to (2.5, 1)', '(4, 4) \\to (4, \\sqrt{4}) = (4, 2)'] }],
      lines: [
        { say: 'Let f of x equal two x minus four: the grey line. Find the invariant points, and one more point, on y equals the square root of f of x.', show: ['lin.grid', 'lin.axes', 'lin.f', 'm.0'], focus: 'm.0' },
        { say: 'Invariant points are where f of x is zero or one. Two x minus four equals zero when x is two, so the point at two, zero is invariant.', show: ['m.1', 'lin.A'], focus: ['m.1', 'lin.A'] },
        { say: 'Two x minus four equals one when x is 2.5, so the point at 2.5, one is invariant too.', show: ['m.2', 'lin.B'], focus: ['m.2', 'lin.B'] },
        { say: 'The point at four, four is on the line. Its height is four, and the square root of four is two, so the point at four, two is on the new graph.', show: ['m.3', 'lin.C', 'lin.drop', 'lin.D'], focus: ['m.3', 'lin.D'] },
        { say: 'Now join them. Left of x equals two, the line is below the x-axis, so the new graph has no points there. Between the invariant points, the curve is above the line. After 2.5, it is below the line, rising more and more slowly.', show: 'lin.sf', focus: 'lin.sf' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = x + 3$. What are the invariant points of the graph of $y = \\sqrt{f(x)}$?',
          choices: ['$(-3, 0)$ and $(-2, 1)$', '$(-3, 0)$ only', '$(0, 3)$ and $(1, 4)$', '$(3, 0)$ and $(4, 1)$'],
          answer: 0,
          working: '$f(x) = 0$ when $x = -3$, and $f(x) = 1$ when $x = -2$. At those $x$-values, $\\sqrt{f(x)} = f(x)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal x plus three. What are the invariant points of the graph of y equals the square root of f of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. f of x is zero when x is negative three, and one when x is negative two, so the invariant points are negative three, zero, and negative two, one. B forgets that a height of one is invariant too.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$(x, y)$ on $y = f(x)$, with $y \\ge 0$, becomes $(x, \\sqrt{y})$ on $y = \\sqrt{f(x)}$.', 'Invariant points are where $f(x) = 0$ or $f(x) = 1$.', '$\\sqrt{f(x)}$ is above $f$ where $0 < f(x) < 1$, below it where $f(x) > 1$, and missing where $f(x) < 0$.'] }],
      lines: [
        { say: 'Let’s sum up. A point x, y on y equals f of x, with y not negative, becomes the point x, root y on y equals the square root of f of x.', show: 'sum.0' },
        { say: 'The invariant points are where f of x is zero or one.', show: 'sum.1' },
        { say: 'The new graph is above f where f is between zero and one, below it where f is above one, and missing where f is negative. In part two, we find the domain and range, and take the square root of a quadratic. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
