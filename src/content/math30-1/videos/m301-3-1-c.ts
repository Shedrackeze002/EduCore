import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

// y = x³ − 2x² − 5x + 6 = (x + 2)(x − 1)(x − 3), with its turning points where 3x² − 4x − 5 = 0.
const f = (x: number) => x ** 3 - 2 * x ** 2 - 5 * x + 6;
const [t1, t2] = [(4 - Math.sqrt(76)) / 6, (4 + Math.sqrt(76)) / 6];
const g = plane({ x: [-4, 5], y: [-10, 12], yStep: 2, every: 0, width: 9, height: 11 });
const cubic = (id: string) =>
  figure(id, [
    g,
    plot(g, { id: 'curve', f, tone: 'brand' }),
    dots(g, [
      { id: 'T1', x: t1, y: f(t1), tex: '\\text{local max}', tone: 'opp', place: 'above left', group: 'turns' },
      { id: 'T2', x: t2, y: f(t2), tex: '\\text{local min}', tone: 'opp', place: 'below', group: 'turns' },
      { id: 'X1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below right', group: 'xints' },
      { id: 'X2', x: 1, y: 0, tex: '1', tone: 'adj', place: 'above right', group: 'xints' },
      { id: 'X3', x: 3, y: 0, tex: '3', tone: 'adj', place: 'below right', group: 'xints' },
      { id: 'Y', x: 0, y: 6, tex: '(0, 6)', tone: 'good', place: 'right' },
    ]),
  ]);

const video: Explainer = {
  id: 'm301-3-1-c',
  lessonId: 'm301-3-1',
  title: 'Characteristics of Polynomial Functions, Part 3: Intercepts and Turning Points',
  thumbnailTitle: 'Intercepts and Turning Points',
  thumbnail: 'g1',
  summary: 'Turning points, the y-intercept as the constant term, at most n x-intercepts (at least one for an odd degree) and at most n − 1 turning points, why "at most" is not "exactly", and matching the graph of y = x³ − 2x² − 5x + 6 to its equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.1 · Part 3', title: 'Intercepts and Turning Points', subtitle: 'What the degree allows' }],
      lines: [
        { say: 'The degree of a polynomial tells you more than its end behaviour. It also limits how many times the graph can cross the x-axis, and how many times it can turn.', show: 'title' },
        { say: 'In this video, you will find the y-intercept, count the possible x-intercepts and turning points, and match a graph to its equation.' },
      ],
    },
    {
      chapter: 'Turning points',
      layout: 'split',
      leftWidth: 540,
      left: [cubic('g1')],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Turning point', md: 'A **turning point** is a point where the graph changes from increasing to decreasing, or from decreasing to increasing. It is a local maximum or a local minimum.' }],
      lines: [
        { say: 'This is the graph of y equals x cubed, minus two x squared, minus five x, plus six.', show: ['g1.grid', 'g1.axes', 'g1.curve'] },
        { say: 'A turning point is a point where the graph changes from increasing to decreasing, or from decreasing to increasing. It is a local maximum, or a local minimum.', show: 'def' },
        { say: 'This cubic has two turning points. On the left, it rises, then turns and falls: a local maximum. On the right, it falls, then turns and rises: a local minimum.', show: 'g1.turns', focus: 'g1.turns' },
      ],
    },
    {
      chapter: 'What the degree allows',
      layout: 'split',
      leftWidth: 540,
      left: [cubic('g2')],
      right: [{ kind: 'bullets', id: 'b', items: ['$y$-intercept: $P(0) = a_0$, the constant term.', 'At most $n$ $x$-intercepts; at least $1$ when $n$ is odd.', 'At most $n - 1$ turning points.'] }],
      lines: [
        { say: 'For a polynomial function of degree n, the y-intercept is P of zero, which is the constant term. Here that is six.', show: ['g2.grid', 'g2.axes', 'g2.curve', 'g2.Y', 'b.0'], focus: ['b.0', 'g2.Y'] },
        { say: 'There are at most n x-intercepts. This cubic has three, at negative two, one and three: the most a cubic can have.', show: ['g2.xints', 'b.1'], focus: ['b.1', 'g2.xints'] },
        { say: 'An odd-degree graph always has at least one x-intercept, because its ends are on opposite sides of the x-axis, and the graph has no breaks. An even-degree graph may have none at all.', focus: 'b.1' },
        { say: 'And there are at most n minus one turning points. This cubic has two, the most that degree three allows.', show: ['g2.turns', 'b.2'], focus: ['b.2', 'g2.turns'] },
      ],
    },
    {
      chapter: 'Counting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 3x^4 - 2x^5 + x - 7', '\\text{degree } 5 \\text{ (odd)}\\colon\\quad 1 \\text{ to } 5 \\ x\\text{-intercepts}', '\\text{turning points: at most } 5 - 1 = 4'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '"At most" does not mean "exactly"', md: 'The degree only gives upper limits. A cubic can have three $x$-intercepts, but $y = x^3$ has just one, and it has no turning points at all.' },
      ],
      lines: [
        { say: 'For f of x equals three x to the fourth, minus two x to the fifth, plus x, minus seven, state the possible numbers of x-intercepts, and the greatest possible number of turning points.', show: 'm.0', focus: 'm.0' },
        { say: 'The degree is five, which is odd. So the graph has at least one and at most five x-intercepts: one, two, three, four or five.', show: 'm.1', focus: 'm.1' },
        { say: 'It has at most five minus one, which is four, turning points.', show: 'm.2', focus: 'm.2' },
        { say: 'But at most does not mean exactly. A cubic can have three x-intercepts, but y equals x cubed has just one, and no turning points at all.', show: 'oops' },
        { say: 'Read the other way, a graph with t turning points has degree at least t plus one, and its end behaviour tells you whether that degree is odd or even.' },
      ],
    },
    {
      chapter: 'Matching graphs and equations',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Which equation could represent a cubic that extends from quadrant III to quadrant I and passes through $(0, 6)$?' },
        { kind: 'table', id: 't', head: ['', 'Equation', 'Check'], rows: [['A', '$y = -x^3 + 2x^2 + 5x - 6$', '[[bad:No]]: $a_n < 0$'], ['B', '$y = x^4 - 2x^2 - 5x + 6$', '[[bad:No]]: even degree'], ['C', '$y = x^3 - 2x^2 - 5x - 6$', '[[bad:No]]: $y$-intercept $-6$'], ['D', '$y = x^3 - 2x^2 - 5x + 6$', '[[good:Yes]]']] },
      ],
      lines: [
        { say: 'To decide whether an equation could belong to a graph, check the end behaviour first, then the y-intercept, then the numbers of x-intercepts and turning points.' },
        { say: 'Which equation could represent the cubic we just saw? It extends from quadrant three to quadrant one, and it passes through the point at zero, six.', show: 'q' },
        { say: 'Quadrant three to quadrant one means an odd degree and a positive leading coefficient. That rules out A, whose leading coefficient is negative,', show: 't.0', focus: 't.0' },
        { say: 'and it rules out B, which has an even degree.', show: 't.1', focus: 't.1' },
        { say: 'The y-intercept is six, so the constant term must be six. That rules out C.', show: 't.2', focus: 't.2' },
        { say: 'So the answer is D: y equals x cubed, minus two x squared, minus five x, plus six.', show: 't.3', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A polynomial function has degree $4$. Which statement must be true?',
          choices: ['At least one $x$-intercept', 'Exactly $4$ $x$-intercepts', 'At most $3$ turning points', 'At most $4$ turning points'],
          answer: 2,
          working: 'Degree $4$ allows at most $4 - 1 = 3$ turning points and at most $4$ $x$-intercepts. The degree is even, so it may have no $x$-intercepts at all.',
        },
      ],
      lines: [
        { say: 'Your turn. A polynomial function has degree four. Which statement must be true? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. A polynomial of degree four has at most three turning points. Choice A is not always true: an even-degree graph can have no x-intercepts at all.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The $y$-intercept is the constant term: $P(0) = a_0$.', 'Degree $n$: at most $n$ $x$-intercepts (at least $1$ if $n$ is odd), and at most $n - 1$ turning points.', 'To match a graph and an equation, check the end behaviour first, then the $y$-intercept.'] }],
      lines: [
        { say: 'Let’s sum up. The y-intercept is the constant term.', show: 'sum.0' },
        { say: 'A polynomial of degree n has at most n x-intercepts, and at least one if n is odd. It has at most n minus one turning points.', show: 'sum.1' },
        { say: 'And to match a graph and an equation, check the end behaviour first, then the y-intercept. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
