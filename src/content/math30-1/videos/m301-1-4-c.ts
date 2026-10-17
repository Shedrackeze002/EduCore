import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g1 = plane({ x: [-5, 5], y: [-5, 5], every: 0 });
const g2 = plane({ x: [-1, 7], y: [-1, 7], every: 0 });
const root = (x: number) => (x >= 0 ? Math.sqrt(x) : NaN);

/** The name of the line y = x, beside the point (at, at) on it, clear of the curves. */
const name = (g: typeof g1, at: number, place: 'left' | 'above left'): Part => ({ points: { yx: g.map(at, at) }, items: [{ kind: 'label', id: 'yx-name', at: 'yx', tex: 'y = x', tone: 'muted', place }] });

const video: Explainer = {
  id: 'm301-1-4-c',
  lessonId: 'm301-1-4',
  title: 'Inverse of a Relation, Part 3: The Horizontal Line Test',
  thumbnailTitle: 'The Horizontal Line Test',
  thumbnail: 'hl',
  summary: 'The horizontal line test for whether an inverse is a function, why the inverse of y = x² − 3 is not, restricting the domain at the vertex, and the inverse of f(x) = (x − 2)² + 1, x ≥ 2, with its domain and range and the choice of sign.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.4 · Part 3', title: 'The Horizontal Line Test', subtitle: 'When is the inverse a function?' }],
      lines: [
        { say: 'Every function has an inverse, but the inverse is not always a function. Reflect a parabola in the line y equals x, and it opens sideways.', show: 'title' },
        { say: 'In this video, you will use the horizontal line test, restrict the domain of a quadratic, and find its inverse with the right sign.' },
      ],
    },
    {
      chapter: 'The horizontal line test',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('hl', [
          g1,
          polyline(g1, { id: 'yx', points: [[-5, -5], [5, 5]], tone: 'muted', dashed: true }),
          name(g1, -3.5, 'above left'),
          plot(g1, { id: 'f', f: (x) => x * x - 3, tone: 'muted' }),
          plot(g1, { id: 'up', f: (x) => root(x + 3), from: -3, to: 5, samples: 400, tone: 'brand' }),
          plot(g1, { id: 'down', f: (x) => -root(x + 3), from: -3, to: 5, samples: 400, tone: 'brand' }),
          polyline(g1, { id: 'line', points: [[-5, 1], [5, 1]], tone: 'opp', dashed: true }),
          dots(g1, [
            { id: 'A', x: -2, y: 1, tone: 'opp', group: 'hits' },
            { id: 'B', x: 2, y: 1, tone: 'opp', group: 'hits' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Horizontal line test', md: 'If no horizontal line crosses the graph of $f$ more than once, then the inverse of $f$ is a function.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = x^2 - 3', 'y = \\pm\\sqrt{x + 3}'] },
      ],
      lines: [
        { say: 'Here is the horizontal line test. If no horizontal line crosses the graph of f more than once, then the inverse of f is a function.', show: 'def' },
        { say: 'Why does it work? Reflecting in y equals x turns horizontal lines into vertical lines. So it is really the vertical line test, applied to the inverse.' },
        { say: 'The parabola y equals x squared, minus three, in grey, fails the test. The orange line, y equals one, crosses it twice: at x equals negative two, and at x equals two.', show: ['hl.grid', 'hl.axes', 'hl.f', 'hl.line', 'hl.hits', 'm.0'], focus: ['hl.line', 'hl.hits'] },
        { say: 'So its inverse, y equals plus or minus the square root of x plus three, in purple, fails the vertical line test. It opens sideways, and most inputs have two outputs.', show: ['hl.yx', 'hl.yx-name', 'hl.up', 'hl.down', 'm.1'], focus: ['hl.up', 'hl.down', 'm.1'] },
      ],
    },
    {
      chapter: 'Restricting the domain',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('rs', [
          g1,
          polyline(g1, { id: 'yx', points: [[-5, -5], [5, 5]], tone: 'muted', dashed: true }),
          name(g1, -3.5, 'above left'),
          plot(g1, { id: 'f', f: (x) => x * x - 3, from: 0, to: 5, tone: 'muted' }),
          plot(g1, { id: 'inv', f: (x) => root(x + 3), from: -3, to: 5, samples: 400, tone: 'brand' }),
          dots(g1, [
            { id: 'V', x: 0, y: -3, tone: 'muted' },
            { id: 'E', x: -3, y: 0, tone: 'opp' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = x^2 - 3,\\quad x \\ge 0', 'f^{-1}(x) = \\sqrt{x + 3}'] }],
      lines: [
        { say: 'To make the inverse a function, restrict the domain of f, so that only one side of the vertex is left.' },
        { say: 'For example, keep only x greater than or equal to zero: the right half of the parabola. Now every horizontal line crosses it at most once.', show: ['rs.grid', 'rs.axes', 'rs.f', 'rs.V', 'm.0'], focus: ['rs.f', 'm.0'] },
        { say: 'Its inverse is y equals the square root of x plus three: only the upper half of the sideways parabola. That is a function.', show: ['rs.yx', 'rs.yx-name', 'rs.inv', 'rs.E', 'm.1'], focus: ['rs.inv', 'm.1'] },
        { say: 'The vertex, zero, negative three, reflects to the endpoint of the inverse, negative three, zero.', focus: ['rs.V', 'rs.E'] },
      ],
    },
    {
      chapter: 'A restricted quadratic',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = (x - 2)^2 + 1,\\quad x \\ge 2', '\\text{interchange: } x = (y - 2)^2 + 1', '(y - 2)^2 = x - 1', 'y - 2 = \\pm\\sqrt{x - 1}', 'y \\ge 2:\\quad f^{-1}(x) = \\sqrt{x - 1} + 2'] },
      ],
      lines: [
        { say: 'Find the inverse of f of x equals x minus two, all squared, plus one, for x greater than or equal to two. Then state its domain and range.', show: 'm.0', focus: 'm.0' },
        { say: 'Interchange x and y: x equals y minus two, all squared, plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract one from both sides: y minus two, all squared, equals x minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the square root of both sides: y minus two equals plus or minus the square root of x minus one.', show: 'm.3', focus: 'm.3' },
        { say: 'Which sign? The range of the inverse is the domain of f, so y must be at least two. That needs the positive root: f inverse of x equals the square root of x minus one, plus two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Domain, range and the sign',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('dr', [
          g2,
          polyline(g2, { id: 'yx', points: [[-1, -1], [7, 7]], tone: 'muted', dashed: true }),
          name(g2, 6.2, 'above left'),
          plot(g2, { id: 'f', f: (x) => (x - 2) ** 2 + 1, from: 2, to: 7, tone: 'muted' }),
          plot(g2, { id: 'inv', f: (x) => root(x - 1) + 2, from: 1, to: 7, samples: 400, tone: 'brand' }),
          dots(g2, [
            { id: 'V', x: 2, y: 1, tex: '(2, 1)', tone: 'muted', place: 'below right' },
            { id: 'E', x: 1, y: 2, tex: '(1, 2)', tone: 'opp', place: 'above left' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{domain: } \\{x \\mid x \\ge 1\\}', '\\text{range: } \\{y \\mid y \\ge 2\\}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Choosing the sign', md: 'If the restriction keeps the right half of the parabola ($x \\ge h$), the inverse uses $+\\sqrt{\\ }$. If it keeps the left half ($x \\le h$), it uses $-\\sqrt{\\ }$.' },
      ],
      lines: [
        { say: 'Now the domain and range. The domain of the inverse is the range of f. f starts at its vertex, two, one, and goes up, so its range is y greater than or equal to one.', show: ['dr.grid', 'dr.axes', 'dr.f', 'dr.V'], focus: 'dr.V' },
        { say: 'So the inverse has domain x greater than or equal to one.', show: 'm.0', focus: 'm.0' },
        { say: 'Its range is the domain of f: y greater than or equal to two.', show: 'm.1', focus: 'm.1' },
        { say: 'On the graph, the inverse is the reflection of f in the line y equals x. The vertex, two, one, reflects to the endpoint, one, two.', show: ['dr.yx', 'dr.yx-name', 'dr.inv', 'dr.E'], focus: ['dr.inv', 'dr.E'] },
        { say: 'A quick rule for the sign: if the restriction keeps the right half of the parabola, the inverse uses the positive square root. If it keeps the left half, it uses the negative square root.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = (x + 1)^2 - 4$ with $x \\le -1$. Which is $f^{-1}(x)$?',
          choices: ['$-\\sqrt{x - 4} + 1$', '$\\sqrt{x + 4} - 1$', '$-\\sqrt{x + 4} - 1$', '$\\sqrt{x - 1} + 4$'],
          answer: 2,
          working: 'Interchange: $(y + 1)^2 = x + 4$, so $y = -1 \\pm \\sqrt{x + 4}$. The left half ($x \\le -1$) means the inverse needs $y \\le -1$: the negative root.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal x plus one, all squared, minus four, with x less than or equal to negative one. Which is f inverse of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Interchanging gives y plus one, all squared, equals x plus four. The restriction keeps the left half, so the inverse needs y at most negative one: the negative root. B uses the positive root, which belongs to the right half.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The inverse is a function only if no horizontal line crosses $f$ more than once.', 'Restrict a quadratic at its vertex to make its inverse a function.', 'Right half: $+\\sqrt{\\ }$; left half: $-\\sqrt{\\ }$.'] }],
      lines: [
        { say: 'Let’s sum up. The inverse of f is a function only if no horizontal line crosses the graph of f more than once.', show: 'sum.0' },
        { say: 'To make the inverse of a quadratic a function, restrict its domain at the vertex.', show: 'sum.1' },
        { say: 'And the right half uses the positive square root, while the left half uses the negative one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
