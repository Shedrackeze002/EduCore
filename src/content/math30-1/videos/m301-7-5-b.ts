import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 10], y: [-7, 3], every: 2, width: 10, height: 8 });
const log3 = (x: number) => (x > 0 ? Math.log(x) / Math.log(3) : NaN);

/** The name of the asymptote, to the left of the dashed line. */
const name: Part = { points: { an: g.map(-1, 2) }, items: [{ kind: 'label', id: 'asy-name', at: 'an', tex: 'x = -1', tone: 'theta', place: 'left' }] };

const video: Explainer = {
  id: 'm301-7-5-b',
  lessonId: 'm301-7-5',
  title: 'Transformations of Logarithmic Functions, Part 2: Transforming Logarithmic Graphs',
  thumbnailTitle: 'Transforming Logarithmic Graphs',
  thumbnail: 'gr',
  summary: 'The transformed function y = a log_c(b(x − h)) + k and its mapping rule, why only h moves the vertical asymptote, and graphing y = 2 log₃(x + 1) − 4 from the images of (1, 0), (3, 1) and (9, 2). Also how to read a domain such as x > −3 or x < 4 correctly.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.5 · Part 2', title: 'Transforming Logarithmic Graphs', subtitle: 'Only $h$ moves the vertical asymptote' }],
      lines: [
        { say: 'Stretches, reflections and translations work on logarithmic graphs exactly as they do on every other graph you have studied.', show: 'title' },
        { say: 'In this video, you will find the asymptote and domain of a transformed logarithmic function, map its key points, and draw its graph.' },
      ],
    },
    {
      chapter: 'The transformed function',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = a\\log_{c}\\left(b(x - h)\\right) + k', '(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)'] },
        { kind: 'bullets', id: 'b', items: ['Vertical asymptote: $x = h$', 'Domain: $x > h$ when $b > 0$, and $x < h$ when $b < 0$', 'Range: all real numbers'] },
      ],
      lines: [
        { say: 'The transformed function is y equals "a" times log base c of b times x minus h, plus k. The parameters mean exactly what they did before.', show: 'm.0', focus: 'm.0' },
        { say: 'So the mapping rule is the same too. Divide x by b and add h. Multiply y by "a" and add k.', show: 'm.1', focus: 'm.1' },
        { say: 'This time, the asymptote is vertical, the line x equals zero. Only a horizontal translation moves it, so the new asymptote is x equals h.', show: 'b.0' },
        { say: 'The domain is x greater than h when b is positive. When b is negative, the graph is reflected in the y-axis, so the domain is x less than h.', show: 'b.1' },
        { say: 'The range stays all real numbers.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Reading the parameters',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2\\log_{3}(x + 1) - 4', 'a = 2,\\quad b = 1,\\quad h = -1,\\quad k = -4', '\\text{Asymptote } x = -1;\\quad \\text{domain } \\{x \\mid x > -1,\\ x \\in \\mathbb{R}\\}', '(x, y) \\to (x - 1,\\ 2y - 4)'] },
      ],
      lines: [
        { say: 'Take y equals two log base three of x plus one, minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Here "a" is two, b is one, h is negative one, and k is negative four.', show: 'm.1', focus: 'm.1' },
        { say: 'So the asymptote is x equals negative one. And since b is positive, the domain is x greater than negative one.', show: 'm.2', focus: 'm.2' },
        { say: 'The mapping rule becomes: x, y goes to x minus one, two y minus four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The graph',
      layout: 'split',
      leftWidth: 720,
      left: [
        figure('gr', [
          g,
          polyline(g, { id: 'asy', points: [[-1, -7], [-1, 3]], tone: 'theta', dashed: true }),
          name,
          plot(g, { id: 'parent', f: log3, from: 0.001, to: 10, tone: 'muted', samples: 400 }),
          plot(g, { id: 'image', f: (x) => 2 * log3(x + 1) - 4, from: -0.999, to: 10, samples: 400 }),
          dots(g, [
            { id: 'P0', x: 0, y: -4, tex: '(0, -4)', tone: 'opp', place: 'right' },
            { id: 'P1', x: 2, y: -2, tex: '(2, -2)', tone: 'opp', place: 'below right' },
            { id: 'P2', x: 8, y: 0, tex: '(8, 0)', tone: 'opp', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'table', id: 't', head: ['$y = \\log_{3} x$', '$(x - 1,\\ 2y - 4)$'], rows: [['$(1, 0)$', '$(0, -4)$'], ['$(3, 1)$', '$(2, -2)$'], ['$(9, 2)$', '$(8, 0)$']] }],
      lines: [
        { say: 'The grey curve is y equals log base three of x. Three easy points on it are one, zero; three, one; and nine, two.', show: ['gr.grid', 'gr.axes', 'gr.parent'], focus: 'gr.parent' },
        { say: 'Map them. One, zero goes to zero, negative four. Three, one goes to two, negative two. And nine, two goes to eight, zero.', show: ['t', 'gr.P0', 'gr.P1', 'gr.P2'], focus: ['gr.P0', 'gr.P1', 'gr.P2'] },
        { say: 'Draw the asymptote, the dashed line x equals negative one.', show: ['gr.asy', 'gr.asy-name'], focus: 'gr.asy' },
        { say: 'Then join the points with a smooth curve that plunges down beside the asymptote on the left, and rises slowly to the right.', show: 'gr.image', focus: 'gr.image' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\log(x + 3):\\quad x + 3 > 0,\\quad x > -3', 'y = \\log_{2}\\left(-(x - 4)\\right):\\quad {-(x - 4)} > 0,\\quad x < 4'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading the domain', md: 'The argument must be positive. For $y = \\log(x + 3)$, the domain is $x > -3$, not $x > 3$. A reflection in the $y$-axis puts the graph to the **left** of its asymptote.' },
      ],
      lines: [
        { say: 'Be careful reading a domain. The safest way is to remember that the argument must be positive.', show: 'oops' },
        { say: 'For y equals log of x plus three, the argument x plus three must be greater than zero. So x is greater than negative three, not greater than three.', show: 'm.0', focus: 'm.0' },
        { say: 'For y equals log base two of negative, x minus four, the argument negative, x minus four, must be positive. That happens when x is less than four. The reflection in the y-axis puts the graph to the left of its asymptote.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'State the vertical asymptote and the domain of $y = 3\\log\\left(-(x + 2)\\right) - 1$.',
          choices: ['$x = -2$; $x > -2$', '$x = 2$; $x < 2$', '$x = -2$; $x < -2$', '$x = -1$; $x < -1$'],
          answer: 2,
          working: 'The argument must be positive: $-(x + 2) > 0$, so $x + 2 < 0$ and $x < -2$. The asymptote is $x = h = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. State the vertical asymptote and the domain of y equals three log of negative, x plus two, minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. h is negative two, so the asymptote is x equals negative two. The argument, negative, x plus two, is positive only when x is less than negative two. Choice A forgets the reflection: b is negative, so the graph lies to the left of its asymptote.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$y = a\\log_{c}(b(x - h)) + k$ has the mapping $(x, y) \\to \\left(\\frac{x}{b} + h,\\ ay + k\\right)$.', 'The vertical asymptote is $x = h$; the range is all real numbers.', 'Domain: $x > h$ if $b > 0$, $x < h$ if $b < 0$. The argument must be positive.'] }],
      lines: [
        { say: 'Let’s sum up. A transformed logarithmic function uses the same mapping rule as every other function.', show: 'sum.0' },
        { say: 'Its vertical asymptote is x equals h, and its range is all real numbers.', show: 'sum.1' },
        { say: 'Its domain is x greater than h when b is positive, and x less than h when b is negative. When in doubt, make the argument positive. In part three, we find intercepts, domains and inverses. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
