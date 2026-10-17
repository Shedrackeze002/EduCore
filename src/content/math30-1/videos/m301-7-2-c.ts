import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 5], y: [-3, 7], every: 3, width: 9, height: 9 });

/** The name of the asymptote, above the dashed line at the right edge of the graph. */
const name: Part = { points: { an: g.map(4.9, -2) }, items: [{ kind: 'label', id: 'asy-name', at: 'an', tex: 'y = -2', tone: 'theta', place: 'above left' }] };

const video: Explainer = {
  id: 'm301-7-2-c',
  lessonId: 'm301-7-2',
  title: 'Transformations of Exponential Functions, Part 3: Writing the Equation',
  thumbnailTitle: 'Writing the Equation',
  thumbnail: 'gr',
  summary: 'Writing y = a(c)^(b(x − h)) + k from a description of the transformations of y = 3ˣ, and from a graph by reading k from the asymptote and the distances from it, giving y = 2(2)^(x − 1) − 2. Also why the same graph can have more than one correct equation.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.2 · Part 3', title: 'Writing the Equation', subtitle: 'From a description or from a graph' }],
      lines: [
        { say: 'So far, you have started with an equation and drawn its graph. Now go the other way: start with the transformations, or with a graph, and write the equation.', show: 'title' },
        { say: 'In this video, you will read off each parameter, and see why the same graph can have more than one correct equation.' },
      ],
    },
    {
      chapter: 'From a description',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'The graph of $y = 3^{x}$ is stretched vertically by a factor of $2$, stretched horizontally by a factor of $\\frac{1}{2}$, reflected in the $x$-axis and translated $4$ units left and $1$ unit up.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['a = -2', 'b = \\dfrac{1}{\\frac{1}{2}} = 2', 'h = -4,\\quad k = 1', 'y = -2(3)^{2(x + 4)} + 1'] },
      ],
      lines: [
        { say: 'The graph of y equals three to the power x is stretched vertically by a factor of two, stretched horizontally by a factor of one half, reflected in the x-axis, and translated four units left and one unit up. Write the equation.', show: 'q' },
        { say: 'The vertical stretch by two, with a reflection in the x-axis, makes "a" equal negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'The horizontal stretch factor is one over b. A factor of one half means b is one over one half, which is two.', show: 'm.1', focus: 'm.1' },
        { say: 'Four units left makes h negative four, and one unit up makes k one.', show: 'm.2', focus: 'm.2' },
        { say: 'Substitute: y equals negative two times three to the power two times x plus four, plus one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('gr', [
          g,
          polyline(g, { id: 'asy', points: [[-3, -2], [5, -2]], tone: 'theta', dashed: true }),
          name,
          plot(g, { id: 'curve', f: (x) => 2 ** x - 2, samples: 200 }),
          dots(g, [
            { id: 'A', x: 1, y: 0, tex: '(1, 0)', tone: 'opp', place: 'below right' },
            { id: 'B', x: 2, y: 2, tex: '(2, 2)', tone: 'opp', place: 'below right' },
            { id: 'C', x: 3, y: 6, tex: '(3, 6)', tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = -2', '\\text{distances: } 2,\\ 4,\\ 8', 'c = 2', 'h = 1,\\quad a = 2', 'y = 2(2)^{x - 1} - 2'] }],
      lines: [
        { say: 'This graph is a transformation of y equals two to the power x. Write its equation.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.A', 'gr.B', 'gr.C'] },
        { say: 'Start with the asymptote. It is the dashed line y equals negative two, so k is negative two.', show: ['gr.asy', 'gr.asy-name', 'm.0'], focus: ['gr.asy', 'm.0'] },
        { say: 'Now measure each point’s distance above the asymptote. The point at one, zero, is two units above it. The point at two, two, is four units above, and three, six, is eight units above.', show: 'm.1', focus: ['m.1', 'gr.A', 'gr.B', 'gr.C'] },
        { say: 'The distance doubles each time x goes up by one. That matches the base, two.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the point at one, zero, as the starting point, so h is one. There, the graph is "a" units above the asymptote, so "a" is two.', show: 'm.3', focus: ['m.3', 'gr.A'] },
        { say: 'The equation is y equals two times two to the power x minus one, minus two. Check three, six: two times two squared is eight, minus two is six.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'More than one equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2(2)^{x - 1} = 2^{1} \\cdot 2^{x - 1} = 2^{x}', 'y = 2(2)^{x - 1} - 2 \\quad\\text{is also}\\quad y = 2^{x} - 2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'More than one correct equation', md: 'Choosing a different point as the starting point changes $a$ and $h$, but not the graph.' },
      ],
      lines: [
        { say: 'Here is a surprise. Two times two to the power x minus one is two to the power one, times two to the power x minus one. Add the exponents, and that is just two to the power x.', show: 'm.0', focus: 'm.0' },
        { say: 'So the same graph is also y equals two to the power x, minus two. Both equations are correct.', show: 'm.1', focus: 'm.1' },
        { say: 'Choosing a different starting point changes "a" and h, but not the graph. Here, starting at zero, negative one, gives h equals zero and "a" equals one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of $y = 2^{x}$ is reflected in the $x$-axis, stretched horizontally by a factor of $\\frac{1}{3}$ and translated $5$ units right. Write the equation.',
          choices: ['$y = -2^{3(x - 5)}$', '$y = -2^{\\frac{1}{3}(x - 5)}$', '$y = -2^{3(x + 5)}$', '$y = 2^{-3(x - 5)}$'],
          answer: 0,
          working: 'Reflection in the $x$-axis: $a = -1$. Horizontal stretch by $\\frac{1}{3}$: $b = \\dfrac{1}{\\frac{1}{3}} = 3$. Right $5$: $h = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals two to the power x is reflected in the x-axis, stretched horizontally by a factor of one third, and translated five units right. Write the equation. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The reflection makes "a" negative one, b is one over one third, which is three, and h is five. B uses the stretch factor itself as b, but b is its reciprocal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From a description, read off $a$, $b$, $h$ and $k$; a horizontal stretch by a factor $s$ gives $b = \\frac{1}{s}$.', 'From a graph, the asymptote gives $k$.', 'The distances from the asymptote are multiplied by the base each step; they give $a$ and $h$.', 'The same graph can have more than one correct equation.'] }],
      lines: [
        { say: 'Let’s sum up. From a description, read off each parameter. Remember that b is the reciprocal of the horizontal stretch factor.', show: 'sum.0' },
        { say: 'From a graph, the asymptote gives k.', show: 'sum.1' },
        { say: 'The distances from the asymptote are multiplied by the base each step, and they give "a" and h.', show: 'sum.2' },
        { say: 'And the same graph can have more than one correct equation. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
