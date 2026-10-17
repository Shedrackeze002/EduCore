import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [0, 7], y: [0, 7] });

/** The name of the line y = x, above it on the left, clear of the points. */
const name: Part = { points: { yx: g.map(5, 5) }, items: [{ kind: 'label', id: 'yx-name', at: 'yx', tex: 'y = x', tone: 'muted', place: 'above left' }] };

const video: Explainer = {
  id: 'm301-1-4',
  lessonId: 'm301-1-4',
  title: 'Inverse of a Relation, Part 1: Interchanging x and y',
  thumbnailTitle: 'Inverse of a Relation',
  thumbnail: 'pts',
  summary: 'The inverse of a relation interchanges the coordinates of every point, (x, y) → (y, x), reflecting its graph in the line y = x; its domain and range swap, points on y = x are invariant, and the inverse of {(1, 4), (2, 6), (3, 6)} is not a function. Parts 2 and 3 find inverses algebraically and restrict domains.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.4 · Part 1', title: 'Inverse of a Relation', subtitle: '(x, y) → (y, x)' }],
      lines: [
        { say: 'A thermostat converts degrees Celsius to Fahrenheit, and a second formula converts back. A function and its inverse undo each other.', show: 'title' },
        { say: 'In this video, you will find the inverse of a relation, see why its graph is a reflection in the line y equals x, and decide whether the inverse is a function.' },
      ],
    },
    {
      chapter: 'What an inverse is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Inverse', md: 'The inverse of a relation interchanges the $x$- and $y$-coordinates of every point: $(x, y) \\to (y, x)$. The inverse of a function $f$ is written $f^{-1}$. Its graph is the reflection of the graph of $f$ in the line $y = x$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f^{-1}(x) \\text{ is read “} f \\text{ inverse of } x \\text{”}'] },
      ],
      lines: [
        { say: 'The inverse of a relation interchanges the x- and y-coordinates of every point: the point x, y maps to y, x.', show: 'def' },
        { say: 'The inverse of a function f is written with a small negative one, and read f inverse. That negative one is not an exponent. It is part of the name.', show: 'm.0', focus: 'm.0' },
        { say: 'Swapping the coordinates of every point reflects the whole graph in the line y equals x, the diagonal line through the origin where both coordinates are equal.' },
      ],
    },
    {
      chapter: 'A set of points',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('pts', [
          g,
          polyline(g, { id: 'yx', points: [[0, 0], [7, 7]], tone: 'muted', dashed: true }),
          name,
          dots(g, [
            { id: 'a', x: 1, y: 4, tone: 'adj', group: 'rel' },
            { id: 'b', x: 2, y: 6, tone: 'adj', group: 'rel' },
            { id: 'c', x: 3, y: 6, tone: 'adj', group: 'rel' },
            { id: 'a2', x: 4, y: 1, tone: 'opp', group: 'inv' },
            { id: 'b2', x: 6, y: 2, tone: 'opp', group: 'inv' },
            { id: 'c2', x: 6, y: 3, tone: 'opp', group: 'inv' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{\\{(1, 4),\\ (2, 6),\\ (3, 6)\\}}', '\\opp{\\{(4, 1),\\ (6, 2),\\ (6, 3)\\}}', '(6, 2) \\text{ and } (6, 3)', '\\text{not a function}'] }],
      lines: [
        { say: 'Find the inverse of the relation one, four; two, six; three, six. Is the inverse a function?', show: ['pts.grid', 'pts.axes', 'pts.rel', 'm.0'], focus: ['pts.rel', 'm.0'] },
        { say: 'Interchange the coordinates of each point: four, one; six, two; and six, three.', show: ['pts.inv', 'm.1'], focus: ['pts.inv', 'm.1'] },
        { say: 'On the graph, the blue points are the relation and the orange points are its inverse. Each orange point is the mirror image of a blue point in the dashed line y equals x.', show: ['pts.yx', 'pts.yx-name'], focus: 'pts.yx' },
        { say: 'But the inverse contains six, two, and six, three: one input, six, with two different outputs. So the inverse is not a function, even though the original relation was.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'That happened because the original had two points with the same output, six. Swapping turned them into two points with the same input.' },
      ],
    },
    {
      chapter: 'Domain and range swap',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Relation', 'Inverse'],
          rows: [
            ['Points', '$(1, 4),\\ (2, 6),\\ (3, 6)$', '$(4, 1),\\ (6, 2),\\ (6, 3)$'],
            ['Domain', '$\\{1, 2, 3\\}$', '$\\{4, 6\\}$'],
            ['Range', '$\\{4, 6\\}$', '$\\{1, 2, 3\\}$'],
          ],
        },
        { kind: 'callout', id: 'inv', tone: 'key', title: 'Invariant points', md: 'Points on the line $y = x$, such as $(2, 2)$, have equal coordinates, so swapping them changes nothing.' },
      ],
      lines: [
        { say: 'Interchanging the coordinates swaps the roles of input and output.', show: 't.0', focus: 't.0' },
        { say: 'The relation has domain one, two, three, and range four, six.', show: ['t.1', 't.2'], focus: 't' },
        { say: 'The inverse has domain four, six, and range one, two, three. So the domain of the inverse is the range of the original, and the range of the inverse is the domain of the original.', focus: ['t.1', 't.2'] },
        { say: 'And a point on the line y equals x, like two, two, has equal coordinates. Swapping them changes nothing, so points on the line y equals x are invariant.', show: 'inv' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A function $f$ has domain $\\{x \\mid x \\ge 2\\}$ and range $\\{y \\mid y \\le 5\\}$. What is the domain of $f^{-1}$?',
          choices: ['$\\{x \\mid x \\le 5\\}$', '$\\{x \\mid x \\ge 2\\}$', '$\\{x \\mid x \\ge 5\\}$', '$\\{x \\mid x \\le 2\\}$'],
          answer: 0,
          working: 'The domain of $f^{-1}$ is the range of $f$: all values at most $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. A function f has domain x greater than or equal to two, and range y less than or equal to five. What is the domain of f inverse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The domain of the inverse is the range of the original: all values less than or equal to five. B is the domain of f itself.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The inverse interchanges coordinates: $(x, y) \\to (y, x)$.', 'Its graph is the reflection in $y = x$; points on $y = x$ are invariant.', 'The domain and range swap.'] }],
      lines: [
        { say: 'Let’s sum up. The inverse of a relation interchanges the coordinates of every point: x, y maps to y, x.', show: 'sum.0' },
        { say: 'Its graph is the reflection in the line y equals x, and points on that line are invariant.', show: 'sum.1' },
        { say: 'And the domain and range swap. In part two, we find the inverse of a function algebraically. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
