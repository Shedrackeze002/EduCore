import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-2, 7], y: [-3, 6], every: 0 });

const video: Explainer = {
  id: 'm301-1-3-c',
  lessonId: 'm301-1-3',
  title: 'Combining Transformations, Part 3: Writing Equations',
  thumbnailTitle: 'Writing Equations',
  thumbnail: 'eq',
  summary: 'Writing the equation of a transformed function from a description, y = 3√(−(x − 2)) + 5, and from a graph, y = −2|x − 3| + 4, by finding h and k from a key point and a from one more point, then checking with a second point.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.3 · Part 3', title: 'Writing Equations', subtitle: 'From a description or a graph' }],
      lines: [
        { say: 'So far, you have started with an equation and found the graph. Working backwards is just as useful: given a description or a graph, find the equation.', show: 'title' },
        { say: 'In this video, you will write the equation of a transformed function from a description, and then from a graph.' },
      ],
    },
    {
      chapter: 'From a description',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Vertical stretch by a factor of $3$: $a = 3$', 'Reflection in the $y$-axis: $b = -1$', '2 units right and 5 units up: $h = 2$, $k = 5$'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = af(b(x - h)) + k', 'y = 3\\sqrt{-(x - 2)} + 5'] },
      ],
      lines: [
        { say: 'From a description, read off "a", b, h and k, and substitute them into y equals "a" f of b, times x minus h, plus k.', show: 'm.0', focus: 'm.0' },
        { say: 'The graph of y equals the square root of x is stretched vertically by a factor of three, reflected in the y-axis, and translated two units right and five units up. Write its equation.' },
        { say: 'A vertical stretch by a factor of three gives "a" equals three.', show: 'b.0', focus: 'b.0' },
        { say: 'A reflection in the y-axis, with no horizontal stretch, gives b equals negative one.', show: 'b.1', focus: 'b.1' },
        { say: 'Two right and five up give h equals two and k equals five.', show: 'b.2', focus: 'b.2' },
        { say: 'Substitute: y equals three times the square root of negative one times x minus two, plus five. The negative inside the root is the reflection.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('eq', [
          g,
          plot(g, { id: 'base', f: (x) => Math.abs(x), tone: 'muted' }),
          plot(g, { id: 'image', f: (x) => -2 * Math.abs(x - 3) + 4, tone: 'brand' }),
          dots(g, [
            { id: 'O', x: 0, y: 0, tone: 'muted' },
            { id: 'V', x: 3, y: 4, tex: '(3, 4)', tone: 'opp', place: 'above' },
            { id: 'P', x: 4, y: 2, tex: '(4, 2)', tone: 'opp', place: 'right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(0, 0) \\to (3, 4):\\ h = 3,\\ k = 4', 'y = a|x - 3| + 4', '(4, 2):\\ 2 = a|4 - 3| + 4', '2 = a + 4,\\quad a = -2', 'y = -2|x - 3| + 4'] }],
      lines: [
        { say: 'From a graph, find where a key point of the base function has moved: the vertex of y equals the absolute value of x, or of y equals x squared, or the endpoint of y equals the square root of x. That gives h and k. Then substitute one more point to find "a".' },
        { say: 'The grey graph is y equals the absolute value of x. Write the equation of the coloured graph.', show: ['eq.grid', 'eq.axes', 'eq.base', 'eq.image'] },
        { say: 'The vertex moved from zero, zero, to three, four. So h is three and k is four, and the equation is y equals "a" times the absolute value of x minus three, plus four.', show: ['eq.O', 'eq.V', 'm.0', 'm.1'], focus: ['eq.V', 'm.0', 'm.1'] },
        { say: 'To find "a", substitute another point on the graph: four, two. Two equals "a" times the absolute value of four minus three, plus four.', show: ['eq.P', 'm.2'], focus: ['eq.P', 'm.2'] },
        { say: 'The absolute value of one is one, so two equals "a" plus four, and "a" is negative two.', show: 'm.3', focus: 'm.3' },
        { say: 'The equation is y equals negative two times the absolute value of x minus three, plus four.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check with two points',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ck', [
          g,
          plot(g, { id: 'base', f: (x) => Math.abs(x), tone: 'muted' }),
          plot(g, { id: 'image', f: (x) => -2 * Math.abs(x - 3) + 4, tone: 'brand' }),
          dots(g, [
            { id: 'V', x: 3, y: 4, tex: '(3, 4)', tone: 'opp', place: 'above' },
            { id: 'Q', x: 1, y: 0, tex: '(1, 0)', tone: 'good', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(1, 0):\\ {-2}|1 - 3| + 4', '= -2(2) + 4 = 0\\ \\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with two points', md: 'After writing an equation, substitute a second point from the graph. It catches sign errors in $h$ and wrong stretch factors.' },
      ],
      lines: [
        { say: 'Always check with a second point from the graph. One, zero, is on the coloured graph, where it crosses the x-axis.', show: ['ck.grid', 'ck.axes', 'ck.base', 'ck.image', 'ck.V', 'ck.Q'], focus: 'ck.Q' },
        { say: 'Negative two times the absolute value of one minus three, plus four, is negative two times two, plus four, which is zero. It checks.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The answer makes sense, too. The graph opens down, so "a" is negative, and its sides are twice as steep as y equals the absolute value of x, so the stretch factor is two.', focus: 'ck.image' },
        { say: 'A check like this catches a wrong sign for h, or a wrong stretch factor.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of $y = x^2$ is stretched vertically by a factor of $2$, reflected in the $x$-axis, and translated 1 unit left and 3 units up. Which is its equation?',
          choices: ['$y = -2(x + 1)^2 + 3$', '$y = -2(x - 1)^2 + 3$', '$y = 2(x + 1)^2 + 3$', '$y = -\\tfrac{1}{2}(x + 1)^2 + 3$'],
          answer: 0,
          working: '$a = -2$ (a stretch by $2$ and a reflection in the $x$-axis), $h = -1$ and $k = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of y equals x squared is stretched vertically by a factor of two, reflected in the x-axis, and translated one unit left and three units up. Which is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The stretch and the reflection give "a" equals negative two, one unit left gives h equals negative one, and three up gives k equals three. B moves the graph right instead of left.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From a description: read $a$, $b$, $h$ and $k$, and substitute.', 'From a graph: a key point gives $h$ and $k$; one more point gives $a$.', 'Check with a second point.'] }],
      lines: [
        { say: 'Let’s sum up. From a description, read off "a", b, h and k, and substitute them into the general form.', show: 'sum.0' },
        { say: 'From a graph, a key point like a vertex gives h and k, and one more point gives "a".', show: 'sum.1' },
        { say: 'And always check with a second point. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
