import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 5], y: [-8, 6], every: 0 });
const f = (x: number) => x * x - x - 6;

const video: Explainer = {
  id: 'm301-1-2-d',
  lessonId: 'm301-1-2',
  title: 'Reflections and Stretches, Part 4: Invariant Points',
  thumbnailTitle: 'Invariant Points',
  thumbnail: 'ip',
  summary: 'Why vertical stretches and reflections in the x-axis leave the x-intercepts in place, while horizontal stretches and reflections in the y-axis leave the y-intercept, and the invariant points of y = 4f(x) and y = f(2x) for f(x) = x² − x − 6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.2 · Part 4', title: 'Invariant Points', subtitle: 'The points that stay put' }],
      lines: [
        { say: 'Pin a rubber sheet along one line, and stretch it away from that line. Every point on the line stays exactly where it was.', show: 'title' },
        { say: 'In this video, you will find the invariant points of stretches and reflections, from the mapping and from the equation.' },
      ],
    },
    {
      chapter: 'Which points stay put',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Transformation', 'Mapping', 'Invariant points'],
          rows: [
            ['$y = -f(x)$ or $y = af(x)$', '$(x, y) \\to (x, ay)$', 'on the $x$-axis ($y = 0$)'],
            ['$y = f(-x)$ or $y = f(bx)$', '$(x, y) \\to \\left(\\frac{x}{b}, y\\right)$', 'on the $y$-axis ($x = 0$)'],
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Reflections are stretches too', md: '$y = -f(x)$ is $y = af(x)$ with $a = -1$, and $y = f(-x)$ is $y = f(bx)$ with $b = -1$.' },
      ],
      lines: [
        { say: 'An invariant point is its own image. To find the invariant points of a transformation, ask: which points does the mapping leave unchanged?' },
        { say: 'A vertical stretch maps x, y to x, "a" y. When "a" is not one, "a" y equals y only when y is zero. So the invariant points are on the x-axis: the x-intercepts.', show: 't.0', focus: 't.0' },
        { say: 'A horizontal stretch maps x, y to x over b, y. When b is not one, x over b equals x only when x is zero. So the invariant point is on the y-axis: the y-intercept.', show: 't.1', focus: 't.1' },
        { say: 'Reflections fit in the same rows. A reflection in the x-axis is a vertical stretch with "a" equal to negative one, and a reflection in the y-axis is a horizontal stretch with b equal to negative one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Finding invariant points',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('ip', [
          g,
          plot(g, { id: 'f', f, tone: 'muted' }),
          plot(g, { id: 'image', f: (x) => f(2 * x), tone: 'brand' }),
          dots(g, [
            { id: 'r1', x: -2, y: 0, tone: 'good', group: 'xi' },
            { id: 'r2', x: 3, y: 0, tone: 'good', group: 'xi' },
            { id: 'Y', x: 0, y: -6, tex: '(0, -6)', tone: 'opp', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = x^2 - x - 6', '= (x - 3)(x + 2)', 'x\\text{-intercepts: } (-2, 0),\\ (3, 0)', 'y\\text{-intercept: } (0, -6)', 'y = 4f(x):\\ (-2, 0),\\ (3, 0)', 'y = f(2x):\\ (0, -6)'] }],
      lines: [
        { say: 'Let f of x equal x squared, minus x, minus six. Find the invariant points for y equals four f of x, and for y equals f of two x.', show: ['ip.grid', 'ip.axes', 'ip.f', 'm.0'], focus: 'm.0' },
        { say: 'Start with the intercepts. f factors as x minus three, times x plus two. So the x-intercepts are negative two, zero, and three, zero.', show: ['m.1', 'm.2', 'ip.xi'], focus: ['m.2', 'ip.xi'] },
        { say: 'And f of zero is negative six, so the y-intercept is zero, negative six.', show: ['m.3', 'ip.Y'], focus: ['m.3', 'ip.Y'] },
        { say: 'y equals four f of x is a vertical stretch, so it keeps the points with y equal to zero: negative two, zero, and three, zero.', show: 'm.4', focus: ['m.4', 'ip.xi'] },
        { say: 'y equals f of two x is a horizontal stretch, so it keeps the point with x equal to zero: zero, negative six.', show: 'm.5', focus: ['m.5', 'ip.Y'] },
        { say: 'On the graph, y equals f of two x, in colour, is squeezed toward the y-axis, but it still passes through zero, negative six.', show: 'ip.image', focus: ['ip.image', 'ip.Y'] },
      ],
    },
    {
      chapter: 'Checking with the equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 4f(x):\\quad 4f(3) = 4(0) = 0\\ \\checkmark', 'y = f(2x):\\quad f(2 \\cdot 0) = f(0) = -6\\ \\checkmark', 'y = f(2x):\\quad (3, 0) \\to (1.5, 0)'] },
      ],
      lines: [
        { say: 'You can check with the equations. On y equals four f of x, when x is three, four times f of three is four times zero, which is zero. So three, zero, is still on the graph.', show: 'm.0', focus: 'm.0' },
        { say: 'On y equals f of two x, when x is zero, f of two times zero is f of zero: negative six. So zero, negative six, is still on the graph.', show: 'm.1', focus: 'm.1' },
        { say: 'But three, zero, is not invariant for y equals f of two x. Its x-coordinate is halved, so it moves to 1.5, zero. A point is invariant only if it lies on the line the stretch is about.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Let $f(x) = x^2 + 2x - 8 = (x + 4)(x - 2)$. Which points are invariant for $y = -3f(x)$?',
          choices: ['$(-4, 0)$ and $(2, 0)$', '$(0, -8)$ only', '$(4, 0)$ and $(-2, 0)$', '$(0, 24)$ only'],
          answer: 0,
          working: '$y = -3f(x)$ is a vertical stretch and a reflection in the $x$-axis, so the points with $y = 0$ stay put: the $x$-intercepts $(-4, 0)$ and $(2, 0)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Let f of x equal x squared, plus two x, minus eight, which factors as x plus four, times x minus two. Which points are invariant for y equals negative three f of x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Negative three f of x is a vertical stretch and a reflection in the x-axis, so the x-intercepts stay put: negative four, zero, and two, zero. B is the invariant point of a horizontal stretch.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = af(x)$ and $y = -f(x)$ keep the $x$-intercepts.', '$y = f(bx)$ and $y = f(-x)$ keep the $y$-intercept.', 'An invariant point is its own image under the mapping.'] }],
      lines: [
        { say: 'Let’s sum up. Vertical stretches, and reflections in the x-axis, keep the x-intercepts in place.', show: 'sum.0' },
        { say: 'Horizontal stretches, and reflections in the y-axis, keep the y-intercept in place.', show: 'sum.1' },
        { say: 'And an invariant point is one that the mapping leaves unchanged. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
