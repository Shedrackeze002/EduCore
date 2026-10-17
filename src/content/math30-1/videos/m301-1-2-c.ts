import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-6, 4], y: [-2, 4], every: 0 });

/** The lesson's y = f(x): through (−4, 1), (−2, 3), (1, 3) and (3, −1). */
const f: [number, number][] = [[-4, 1], [-2, 3], [1, 3], [3, -1]];

const video: Explainer = {
  id: 'm301-1-2-c',
  lessonId: 'm301-1-2',
  title: 'Reflections and Stretches, Part 3: Horizontal Stretches',
  thumbnailTitle: 'Horizontal Stretches',
  thumbnail: 'hs',
  summary: 'How y = f(bx) stretches a graph horizontally by a factor of 1/|b| about the y-axis with (x, y) → (x/b, y), why the factor is the reciprocal of b, a negative b, and the images of (6, −4) on y = f(3x), y = ½f(x) and y = f(½x). Part 4 finds invariant points.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.2 · Part 3', title: 'Horizontal Stretches', subtitle: 'y = f(bx)' }],
      lines: [
        { say: 'Play a video at double speed, and everything happens in half the time. The same thing happens to a graph when you double x inside the function.', show: 'title' },
        { say: 'In this video, you will stretch a graph horizontally, and see why y equals f of b x stretches it by a factor of one over b, and not b.' },
      ],
    },
    {
      chapter: 'The horizontal stretch',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = f(bx):\\quad (x, y) \\to \\left(\\dfrac{x}{b},\\ y\\right)', '\\text{horizontal stretch by a factor of } \\dfrac{1}{|b|} \\text{ about the } y\\text{-axis}'] },
        { kind: 'callout', id: 'neg', tone: 'key', title: 'A negative b', md: 'If $b < 0$, the graph is also reflected in the $y$-axis.' },
      ],
      lines: [
        { say: 'This time the number multiplies x, inside the function. The graph of y equals f of b x is a horizontal stretch about the y-axis.' },
        { say: 'Every x-coordinate is divided by b: the point x, y maps to x over b, y. The y-coordinates do not change.', show: 'm.0', focus: 'm.0' },
        { say: 'So we say it is a horizontal stretch by a factor of one over the absolute value of b, about the y-axis.', show: 'm.1', focus: 'm.1' },
        { say: 'And if b is negative, the graph is also reflected in the y-axis, just as f of negative x is.', show: 'neg' },
      ],
    },
    {
      chapter: 'Why the reciprocal',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('hs', [
          g,
          polyline(g, { id: 'f', points: f, tone: 'muted' }),
          polyline(g, { id: 'image', points: f.map(([x, y]) => [x / 2, y]), tone: 'brand' }),
          dots(g, [
            { id: 'A', x: -4, y: 1, tex: '(-4, 1)', tone: 'muted', place: 'left' },
            { id: 'B', x: -2, y: 1, tex: '(-2, 1)', tone: 'opp', place: 'right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = f(2x)', 'f(-4) \\text{ when } 2x = -4', 'x = -2', '(x, y) \\to \\left(\\dfrac{x}{2},\\ y\\right)'] }],
      lines: [
        { say: 'Why one over b? Look at y equals f of two x. The grey graph of f starts at negative four, one, so f of negative four is one.', show: ['hs.grid', 'hs.axes', 'hs.f', 'hs.A', 'm.0'], focus: 'hs.A' },
        { say: 'The new graph reaches that same output, f of negative four, when two x equals negative four: that is, at x equals negative two.', show: ['m.1', 'm.2', 'hs.B'], focus: ['m.1', 'm.2', 'hs.B'] },
        { say: 'Every output arrives twice as soon, so every x-coordinate is halved. The graph is squeezed to half its width: a horizontal stretch by a factor of one half.', show: ['hs.image', 'm.3'], focus: ['hs.image', 'm.3'] },
        { say: 'In general, the image reaches the output f of six when b x equals six, that is, at x equals six over b. Every x-value is divided by b, which is why the factor is one over b.' },
      ],
    },
    {
      chapter: 'Stretching a point',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(6, -4) \\text{ on } y = f(x)', 'y = f(3x):\\quad \\left(\\dfrac{6}{3},\\ -4\\right) = (2, -4)', 'y = \\tfrac{1}{2}f(x):\\quad (6, -2)', 'y = f\\left(\\tfrac{1}{2}x\\right):\\quad \\left(\\dfrac{6}{\\frac{1}{2}},\\ -4\\right) = (12, -4)'] },
      ],
      lines: [
        { say: 'The point at six, negative four, is on the graph of y equals f of x. Find the corresponding point on three different graphs.', show: 'm.0', focus: 'm.0' },
        { say: 'For y equals f of three x, divide x by three: two, negative four. That is a horizontal stretch by a factor of one third.', show: 'm.1', focus: 'm.1' },
        { say: 'For y equals one half f of x, the one half is outside the function, so it multiplies y: six, negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'For y equals f of one half x, divide x by one half, which is the same as multiplying by two: twelve, negative four. A horizontal stretch by a factor of two pulls the graph away from the y-axis.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The horizontal factor',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The horizontal factor', md: '$y = f(3x)$ is a horizontal stretch by a factor of $\\frac{1}{3}$, **not** $3$. Numbers inside the brackets act on $x$ “backwards”: multiplying $x$ by $3$ inside the function divides every $x$-coordinate of the graph by $3$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = f(-2x):\\ \\text{stretch by } \\tfrac{1}{2},\\ \\text{reflect in the } y\\text{-axis}'] },
      ],
      lines: [
        { say: 'Here is a common mistake. y equals f of three x is a horizontal stretch by a factor of one third, not three.', show: 'oops' },
        { say: 'Numbers inside the brackets act on x backwards. Multiplying x by three inside the function divides every x-coordinate of the graph by three.' },
        { say: 'And watch for a negative b. y equals f of negative two x is a horizontal stretch by a factor of one half, and a reflection in the y-axis.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The point $(8, 3)$ is on the graph of $y = f(x)$. Which point is on the graph of $y = f(4x)$?',
          choices: ['$(32, 3)$', '$(2, 3)$', '$(8, 12)$', '$(2, 12)$'],
          answer: 1,
          working: '$(x, y) \\to \\left(\\frac{x}{4},\\ y\\right)$: $\\frac{8}{4} = 2$, and $y$ does not change.',
        },
      ],
      lines: [
        { say: 'Your turn. The point at eight, three, is on the graph of y equals f of x. Which point is on the graph of y equals f of four x? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide x by four: eight over four is two, and y stays three. Choice A multiplies x by four instead of dividing, and C stretches vertically instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = f(bx)$: horizontal stretch by a factor of $\\frac{1}{|b|}$ about the $y$-axis.', '$(x, y) \\to \\left(\\frac{x}{b},\\ y\\right)$: divide $x$ by $b$.', '$b < 0$ also reflects in the $y$-axis.'] }],
      lines: [
        { say: 'Let’s sum up. y equals f of b x is a horizontal stretch by a factor of one over the absolute value of b, about the y-axis.', show: 'sum.0' },
        { say: 'x, y maps to x over b, y: divide every x-coordinate by b.', show: 'sum.1' },
        { say: 'And a negative b also reflects the graph in the y-axis. In part four, we find the points that stretches and reflections leave in place. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
