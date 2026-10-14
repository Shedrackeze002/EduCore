import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 6], y: [-4, 4], every: 0 });
const r = (x: number) => 1 / (2 * x - 6);

const video: Explainer = {
  id: 'm201-7-4-b',
  lessonId: 'm201-7-4',
  title: 'Reciprocal Functions, Part 2: Features and Sketching',
  thumbnailTitle: 'Sketching Reciprocal Functions',
  thumbnail: 'sk',
  summary: 'Reading the asymptotes, invariant points and y-intercept of y = 1/(2x − 6) from its equation, why the reciprocal is not the inverse, and five steps for sketching y = 1/f(x) from the graph of y = f(x).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 7.4 · Part 2', title: 'Features and Sketching', subtitle: 'From the equation, and from a graph' }],
      lines: [
        { say: 'You can read the key features of a reciprocal function straight from its equation, then use them to sketch it.', show: 'title' },
        { say: 'In this video, you will find asymptotes, invariant points and intercepts, and sketch y equals one over f of x from the graph of f.' },
      ],
    },
    {
      chapter: 'From the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\dfrac{1}{2x - 6}', '2x - 6 = 0:\\quad x = 3;\\qquad y = 0', '2x - 6 = 1:\\ x = \\tfrac{7}{2};\\qquad 2x - 6 = -1:\\ x = \\tfrac{5}{2}', 'y\\text{-intercept: } \\tfrac{1}{2(0) - 6} = -\\tfrac{1}{6}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reciprocal is not inverse', md: '$1/f(x)$ is not the inverse $f^{-1}(x)$, and not a reflection: it keeps every $x$ and replaces each $y$ with $1/y$.' },
      ],
      lines: [
        { say: 'State the asymptotes, invariant points and y-intercept of y equals one over two x minus six.', show: 'm.0', focus: 'm.0' },
        { say: 'Two x minus six is zero when x is three: that is the vertical asymptote. The horizontal asymptote is y equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'For the invariant points, set two x minus six equal to one, which gives seven halves, and equal to negative one, which gives five halves. The points are seven halves, one, and five halves, negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'For the y-intercept, substitute zero: one over negative six, which is negative one sixth.', show: 'm.3', focus: 'm.3' },
        { say: 'The reciprocal is not the inverse function, and it is not a reflection of the graph. It keeps every x, and replaces each y with one over y.', show: 'oops' },
      ],
    },
    {
      chapter: 'Sketching',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'bullets', id: 'b', items: ['Draw $y = f(x)$ and the asymptote $y = 0$.', 'Draw a dashed vertical asymptote at each zero of $f$.', 'Mark the invariant points, where $f(x) = \\pm 1$.', 'Keep the sign of $f$ on each side.', 'Draw each branch: near the $x$-axis where $|f|$ is large, along the asymptote where $f$ is near $0$.'] }],
      right: [
        figure('sk', [
          g,
          polyline(g, { id: 'asym', points: [[3, -4], [3, 4]], tone: 'muted', dashed: true }),
          plot(g, { id: 'f', f: (x) => 2 * x - 6, tone: 'muted' }),
          plot(g, { id: 'left', f: r, from: 0, to: 2.995, samples: 240, tone: 'brand' }),
          plot(g, { id: 'right', f: r, from: 3.005, to: 6, samples: 240, tone: 'brand' }),
          dots(g, [
            { id: 'P', x: 3.5, y: 1, tex: '', tone: 'good', group: 'inv' },
            { id: 'Q', x: 2.5, y: -1, tex: '', tone: 'good', group: 'inv' },
          ]),
        ]),
      ],
      lines: [
        { say: 'To sketch y equals one over f of x, first draw y equals f of x. Here, f of x is two x minus six.', show: ['b.0', 'sk.grid', 'sk.axes', 'sk.f'] },
        { say: 'At each zero of f, draw a dashed vertical asymptote. Here, x equals three.', show: ['b.1', 'sk.asym'], focus: 'sk.asym' },
        { say: 'Mark the invariant points, where f of x is one or negative one.', show: ['b.2', 'sk.inv'], focus: 'sk.inv' },
        { say: 'Where f is positive, so is the reciprocal, and where f is negative, so is the reciprocal.', show: 'b.3' },
        { say: 'Then draw each branch through the invariant points: close to the x-axis where f is large, and heading along the asymptote where f is close to zero.', show: ['b.4', 'sk.left', 'sk.right'], focus: ['sk.left', 'sk.right'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the invariant points of $y = \\dfrac{1}{x - 5}$?',
          choices: ['$(6, 1)$ and $(4, -1)$', '$(5, 0)$', '$(6, -1)$ and $(4, 1)$', '$(1, 6)$ and $(-1, 4)$'],
          answer: 0,
          working: '$x - 5 = 1$ gives $x = 6$, the point $(6, 1)$; $x - 5 = -1$ gives $x = 4$, the point $(4, -1)$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the invariant points of y equals one over x minus five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x minus five is one when x is six, giving six, one. And x minus five is negative one when x is four, giving four, negative one. C swaps the y-values, and D swaps the coordinates.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Vertical asymptote: a zero of $f$. Horizontal asymptote: $y = 0$.', 'Invariant points: solve $f(x) = 1$ and $f(x) = -1$.', 'The reciprocal is not the inverse.'] }],
      lines: [
        { say: 'Let’s sum up. The vertical asymptotes are at the zeros of f, and the horizontal asymptote is y equals zero.', show: 'sum.0' },
        { say: 'Find the invariant points by solving f of x equals one, and f of x equals negative one.', show: 'sum.1' },
        { say: 'And remember that the reciprocal is not the inverse. In part three, we take reciprocals of quadratic functions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
