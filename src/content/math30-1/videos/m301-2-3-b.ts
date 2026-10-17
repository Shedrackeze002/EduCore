import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const g = plane({ x: [-8, 4], y: [-5, 5], every: 2 });

/** The extraneous root's label, set in the clear space between the line and the grey curve. */
const extraneous: Part = {
  points: { 'E-at': g.map(-6.3, -2.8) },
  items: [{ kind: 'label', id: 'E-t', at: 'E-at', tex: '(-3, -2)', tone: 'bad', place: 'center' }],
};

const video: Explainer = {
  id: 'm301-2-3-b',
  lessonId: 'm301-2-3',
  title: 'Solving Radical Equations Graphically, Part 2: Extraneous Roots',
  thumbnailTitle: 'Extraneous Roots',
  thumbnail: 'ex',
  summary: 'Solving √(x + 7) = x + 1 by squaring both sides, checking both roots and rejecting the extraneous root x = −3, and a graph that shows where it comes from: the line meets y = −√(x + 7) there, not y = √(x + 7).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.3 · Part 2', title: 'Extraneous Roots', subtitle: 'What the graph shows about squaring' }],
      lines: [
        { say: 'Algebra gives exact solutions, but squaring both sides of an equation can create answers that do not work.', show: 'title' },
        { say: 'In this video, you will solve a radical equation by squaring, check every root, and use a graph to see where the extra root comes from.' },
      ],
    },
    {
      chapter: 'Squaring both sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x + 7} = x + 1', 'x + 7 = (x + 1)^2 = x^2 + 2x + 1', 'x^2 + x - 6 = 0', '(x + 3)(x - 2) = 0', 'x = -3 \\quad\\text{or}\\quad x = 2'] }],
      lines: [
        { say: 'Solve the square root of x plus seven equals x plus one. The radical is already alone on the left side, so square both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'The left side becomes x plus seven. The right side is x plus one, squared, which is x squared plus two x plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Move everything to one side: x squared plus x minus six equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Factor: x plus three, times x minus two, equals zero. So x is negative three, or x is two.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
      ],
    },
    {
      chapter: 'Check every root',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = 2:\\quad \\sqrt{9} = 3 \\ \\text{ and } \\ 2 + 1 = 3 \\;\\checkmark', 'x = -3:\\quad \\sqrt{4} = 2 \\ \\text{ but } \\ {-3} + 1 = -2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Extraneous root', md: 'A value produced by the solving process (such as squaring both sides) that does not satisfy the original equation.' },
      ],
      lines: [
        { say: 'Now check both roots in the original equation. For x equals two, the left side is the square root of nine, which is three, and the right side is two plus one, which is also three. It works.', show: 'm.0', focus: 'm.0' },
        { say: 'For x equals negative three, the left side is the square root of four, which is two. But the right side is negative three plus one: negative two. Two is not negative two, so negative three does not work.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative three is an extraneous root: a value produced by the solving process, here squaring both sides, that does not satisfy the original equation. The only solution is x equals two.', show: 'def' },
      ],
    },
    {
      chapter: 'What the graph shows',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('ex', [
          g,
          plot(g, { id: 'neg', f: (x) => -root(x + 7), from: -7, to: 4, tone: 'muted', samples: 300 }),
          plot(g, { id: 'curve', f: (x) => root(x + 7), from: -7, to: 4, samples: 300 }),
          plot(g, { id: 'line', f: (x) => x + 1, tone: 'opp' }),
          polyline(g, { id: 'gap', points: [[-3, 2], [-3, -2]], tone: 'muted', dashed: true }),
          dots(g, [
            { id: 'S', x: 2, y: 3, tex: '(2, 3)', tone: 'good', place: 'below right' },
            { id: 'C', x: -3, y: 2, tex: '(-3, 2)', tone: 'adj', place: 'above left' },
            { id: 'E', x: -3, y: -2, tone: 'bad' },
          ]),
          extraneous,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = \\sqrt{x + 7}', 'y = x + 1', '\\text{They meet only at } (2, 3).', '-\\sqrt{x + 7} = x + 1 \\text{ at } x = -3'] }],
      lines: [
        { say: 'The graph shows why. Here is the curve y equals the square root of x plus seven, and the line y equals x plus one.', show: ['ex.grid', 'ex.axes', 'ex.curve', 'ex.line', 'm.0', 'm.1'] },
        { say: 'They meet only once, at two, three. So there is only one solution, x equals two.', show: ['ex.S', 'm.2'], focus: ['ex.S', 'm.2'] },
        { say: 'At x equals negative three, the curve is at negative three, two, but the line is down at negative three, negative two. They do not meet there.', show: ['ex.C', 'ex.gap', 'ex.E', 'ex.E-t'], focus: ['ex.C', 'ex.E', 'ex.E-t'] },
        { say: 'Squaring both sides gives the same result as squaring negative the square root of x plus seven equals x plus one. That is the grey curve, and the line does meet it, at negative three, negative two.', show: 'ex.neg', focus: ['ex.neg', 'ex.E'] },
        { say: 'So the root negative three belongs to that other equation, not to ours. Squaring mixed the two equations together.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Skipping the check',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x = -3:\\quad x + 1 = -2 < 0'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Skipping the check', md: 'A square root is never negative, so any root that makes the other side negative must be rejected. Always substitute every root into the **original** equation, or compare with the graph.' },
      ],
      lines: [
        { say: 'The most common mistake is to stop after factoring, and give both roots as the answer.', show: 'm.0' },
        { say: 'A square root is never negative, so any root that makes the other side negative must be rejected. Here, negative three makes x plus one equal negative two.', focus: 'm.0' },
        { say: 'So always substitute every root into the original equation, not the squared one, or compare your roots with the graph.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $\\sqrt{x + 5} = x - 1$.',
          choices: ['$x = -1$', '$x = -1$ or $x = 4$', '$x = 4$', 'No solution'],
          answer: 2,
          working: 'Squaring gives $x + 5 = x^2 - 2x + 1$, so $x^2 - 3x - 4 = 0$ and $(x - 4)(x + 1) = 0$. $x = 4$: $\\sqrt{9} = 3 = 4 - 1$ ✓. $x = -1$: $\\sqrt{4} = 2$, but $-1 - 1 = -2$, so $x = -1$ is extraneous.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve the square root of x plus five equals x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Squaring gives x squared minus three x minus four equals zero, so x is four or negative one. Four works: the square root of nine is three, and four minus one is three. Negative one makes the right side negative two, so it is extraneous. B forgets the check.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Squaring both sides can introduce extraneous roots.', 'Check every root in the original equation.', 'A square root is never negative: a root that makes the other side negative is extraneous.'] }],
      lines: [
        { say: 'Let’s sum up. Squaring both sides can introduce extraneous roots.', show: 'sum.0' },
        { say: 'So check every root in the original equation, or compare with the graph.', show: 'sum.1' },
        { say: 'A square root is never negative, so a root that makes the other side negative is extraneous. In part three, we find solutions that are not whole numbers, and work out the height of the bridge. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
