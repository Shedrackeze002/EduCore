import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-5, 5], y: [-3, 7], every: 0 });
const g2 = plane({ x: [-5, 5], y: [-7, 4], every: 0 });

/** The lesson's y = f(x): through (−4, 1), (−2, 3), (1, 3) and (3, −1). */
const f: [number, number][] = [[-4, 1], [-2, 3], [1, 3], [3, -1]];
const times = (a: number) => f.map(([x, y]) => [x, a * y] as [number, number]);

const video: Explainer = {
  id: 'm301-1-2-b',
  lessonId: 'm301-1-2',
  title: 'Reflections and Stretches, Part 2: Vertical Stretches',
  thumbnailTitle: 'Vertical Stretches',
  thumbnail: 'vs',
  summary: 'What a stretch factor is, how y = af(x) stretches a graph vertically by a factor of |a| about the x-axis with (x, y) → (x, ay), squeezing when 0 < a < 1 and also reflecting when a < 0, and image points on y = ½f(x) and y = −3f(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.2 · Part 2', title: 'Vertical Stretches', subtitle: 'y = af(x)' }],
      lines: [
        { say: 'Turn up the volume of a sound wave, and its peaks get taller and its valleys get deeper, but they still happen at the same moments.', show: 'title' },
        { say: 'That is a vertical stretch. In this video, you will stretch a graph vertically, find image points, and see what a negative value of "a" does.' },
      ],
    },
    {
      chapter: 'What a stretch is',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Stretch', md: 'A transformation that multiplies the distance of every point from an axis by a constant, the **stretch factor**. A factor greater than 1 pulls the graph away from the axis; a factor between 0 and 1 squeezes it toward the axis.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = af(x):\\quad (x, y) \\to (x, ay)', '\\text{vertical stretch by a factor of } |a| \\text{ about the } x\\text{-axis}'] },
      ],
      lines: [
        { say: 'A stretch multiplies the distance of every point from an axis by the same number, called the stretch factor.', show: 'def' },
        { say: 'A factor greater than one pulls the graph away from the axis. A factor between zero and one squeezes it toward the axis.' },
        { say: 'The graph of y equals "a" f of x is a vertical stretch about the x-axis. Every y-coordinate is multiplied by "a": the point x, y maps to x, "a" y.', show: 'm.0', focus: 'm.0' },
        { say: 'We say it is a vertical stretch by a factor of the absolute value of "a", about the x-axis. The x-coordinates do not change at all.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Doubling every y-value',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('vs', [
          g1,
          polyline(g1, { id: 'f', points: f, tone: 'muted' }),
          polyline(g1, { id: 'image', points: times(2), tone: 'brand' }),
          dots(g1, [
            { id: 'A', x: -2, y: 3, tex: '(-2, 3)', tone: 'muted', place: 'below right' },
            { id: 'B', x: -2, y: 6, tex: '(-2, 6)', tone: 'opp', place: 'above' },
            { id: 'C', x: 3, y: -1, tone: 'muted', group: 'low' },
            { id: 'D', x: 3, y: -2, tone: 'opp', group: 'low' },
            { id: 'I', x: 2.5, y: 0, tone: 'good' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = 2f(x)', '(x, y) \\to (x, 2y)', '(-2, 3) \\to (-2, 6)', '(3, -1) \\to (3, -2)', '(2.5, 0) \\to (2.5, 0)'] }],
      lines: [
        { say: 'Here is the graph of f from part one, in grey. The graph of y equals two f of x doubles every y-coordinate.', show: ['vs.grid', 'vs.axes', 'vs.f', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'Negative two, three, goes to negative two, six: twice as far from the x-axis.', show: ['vs.image', 'vs.A', 'vs.B', 'm.2'], focus: ['vs.A', 'vs.B', 'm.2'] },
        { say: 'Points below the axis are doubled too. Three, negative one, goes to three, negative two: they move further down.', show: ['vs.low', 'm.3'], focus: ['vs.low', 'm.3'] },
        { say: 'And a point on the x-axis stays where it is, because two times zero is zero. The x-intercept, 2.5, zero, is an invariant point.', show: ['vs.I', 'm.4'], focus: ['vs.I', 'm.4'] },
      ],
    },
    {
      chapter: 'Squeezing, and a negative a',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('sq', [
          g2,
          polyline(g2, { id: 'f', points: f, tone: 'muted' }),
          polyline(g2, { id: 'half', points: times(0.5), tone: 'adj' }),
          polyline(g2, { id: 'neg', points: times(-2), tone: 'opp' }),
          dots(g2, [
            { id: 'A', x: -2, y: 3, tone: 'muted' },
            { id: 'H', x: -2, y: 1.5, tone: 'adj' },
            { id: 'N', x: -2, y: -6, tone: 'opp' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(-2, 3) \\text{ on } y = f(x)', '\\adj{y = \\tfrac{1}{2}f(x)}:\\ (-2, 1.5)', '\\opp{y = -2f(x)}:\\ (-2, -6)'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'A negative a', md: '$y = -2f(x)$: reflect in the $x$-axis, and stretch vertically by a factor of $2$.' },
      ],
      lines: [
        { say: 'When "a" is between zero and one, the graph is squeezed toward the x-axis. For y equals one half f of x, in blue, negative two, three, goes to negative two, 1.5: half as far from the axis.', show: ['sq.grid', 'sq.axes', 'sq.f', 'sq.half', 'sq.A', 'sq.H', 'm.0', 'm.1'], focus: ['sq.half', 'm.1'] },
        { say: 'We still call this a stretch: a vertical stretch by a factor of one half.' },
        { say: 'When "a" is negative, the graph is stretched by the absolute value of "a", and also reflected in the x-axis. For y equals negative two f of x, in orange, negative two, three, goes to negative two, negative six: twice as far from the axis, on the other side.', show: ['sq.neg', 'sq.N', 'm.2'], focus: ['sq.neg', 'm.2'] },
        { say: 'So y equals negative two f of x is a vertical stretch by a factor of two, and a reflection in the x-axis.', show: 'tip' },
      ],
    },
    {
      chapter: 'Finding image points',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(6, -4) \\text{ on } y = f(x)', 'y = \\tfrac{1}{2}f(x):\\quad (6, \\tfrac{1}{2}(-4)) = (6, -2)', 'y = -3f(x):\\quad (6, -3(-4)) = (6, 12)'] },
      ],
      lines: [
        { say: 'The point at six, negative four, is on the graph of y equals f of x. Find the corresponding points on y equals one half f of x, and on y equals negative three f of x.', show: 'm.0', focus: 'm.0' },
        { say: 'A vertical stretch changes only y. For one half f of x, multiply negative four by one half: six, negative two.', show: 'm.1', focus: 'm.1' },
        { say: 'For negative three f of x, multiply negative four by negative three: six, twelve. That is a vertical stretch by a factor of three, and a reflection in the x-axis, so the point jumps to the other side.', show: 'm.2', focus: 'm.2' },
        { say: 'In both cases x stays six: a vertical stretch never changes the x-coordinate.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(-1, 5)$ is on the graph of $y = f(x)$. Which point is on the graph of $y = -4f(x)$?',
          choices: ['$(4, 5)$', '$(-1, 20)$', '$(-1, -20)$', '$(-1, -\\tfrac{5}{4})$'],
          answer: 2,
          working: '$(x, y) \\to (x, -4y)$: $-4(5) = -20$, and $x$ does not change.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at negative one, five, is on the graph of y equals f of x. Which point is on the graph of y equals negative four f of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Multiply the y-coordinate by negative four: negative four times five is negative twenty, and x stays negative one. B forgets the reflection that comes with the negative sign.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = af(x)$: vertical stretch by a factor of $|a|$ about the $x$-axis.', '$(x, y) \\to (x, ay)$: only $y$ changes.', '$a < 0$ also reflects in the $x$-axis; points with $y = 0$ do not move.'] }],
      lines: [
        { say: 'Let’s sum up. y equals "a" f of x is a vertical stretch by a factor of the absolute value of "a", about the x-axis.', show: 'sum.0' },
        { say: 'x, y maps to x, "a" y: only the y-coordinate changes.', show: 'sum.1' },
        { say: 'A negative "a" also reflects the graph in the x-axis, and points on the x-axis do not move. In part three, we stretch graphs horizontally, where the numbers work backwards. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
