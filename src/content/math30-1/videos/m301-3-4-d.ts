import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-3, 4], y: [-10, 10], yStep: 2, every: 0, width: 7, height: 8 });
const g2 = plane({ x: [-3, 3], y: [-10, 10], yStep: 2, every: 0, width: 6, height: 8 });

const video: Explainer = {
  id: 'm301-3-4-d',
  lessonId: 'm301-3-4',
  title: 'Equations and Graphs of Polynomial Functions, Part 4: Equations from Graphs',
  thumbnailTitle: 'Equations from Graphs',
  thumbnail: 'g1',
  summary: 'Writing the equation of a polynomial function of least degree from its graph: a factor for each zero with the multiplicity its shape shows, then a point such as the y-intercept to find a. Examples y = 2(x + 1)²(x − 2) and y = −(x + 2)(x − 1)³.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.4 · Part 4', title: 'Equations from Graphs', subtitle: 'Read the zeros, then find a' }],
      lines: [
        { say: 'A graph shows its zeros, and the shape at each zero shows its multiplicity. That is almost the whole equation.', show: 'title' },
        { say: 'In this video, you will write the equation of a polynomial function from its graph, and find the stretch factor "a" from one more point.' },
      ],
    },
    {
      chapter: 'Reading the graph',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('g1', [
          g1,
          plot(g1, { id: 'curve', f: (x) => 2 * (x + 1) ** 2 * (x - 2), tone: 'brand' }),
          dots(g1, [
            { id: 'Z1', x: -1, y: 0, tex: '-1', tone: 'opp', place: 'above' },
            { id: 'Z2', x: 2, y: 0, tex: '2', tone: 'adj', place: 'above left' },
            { id: 'Y', x: 0, y: -4, tex: '-4', tone: 'good', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a(x + 1)^2(x - 2)', '-4 = a(1)^2(-2) = -2a', 'a = 2', 'y = 2(x + 1)^2(x - 2)'] }],
      lines: [
        { say: 'Write the equation, in factored form, of the polynomial function of least degree shown here.', show: ['g1.grid', 'g1.axes', 'g1.curve'] },
        { say: 'At x equals negative one, the graph touches the x-axis and turns back. That is a zero of multiplicity two: the factor x plus one, squared.', show: 'g1.Z1', focus: 'g1.Z1' },
        { say: 'At x equals two, the graph crosses the axis like a line: the factor x minus two.', show: 'g1.Z2', focus: 'g1.Z2' },
        { say: 'So y equals "a", times x plus one, squared, times x minus two. The number "a" stretches the graph, and the zeros alone cannot tell you what it is.', show: 'm.0', focus: ['m.0', 'g1'] },
        { say: 'So use one more point on the graph: the y-intercept, negative four. Substitute zero for x and negative four for y: negative four equals "a", times one squared, times negative two, which is negative two "a".', show: ['g1.Y', 'm.1'], focus: ['m.1', 'g1.Y'] },
        { say: 'So "a" equals two, and the equation is y equals two, times x plus one, squared, times x minus two.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Least degree',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Least degree', md: 'Use the smallest multiplicity that matches each shape: $1$ for a crossing, $2$ for a touch, $3$ for a flattened crossing. Then check that the end behaviour agrees with the degree you get.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{degree } 2 + 1 = 3,\\quad a = 2 > 0\\colon\\quad \\text{quadrant III to quadrant I}'] },
      ],
      lines: [
        { say: 'Why least degree? A touch could also come from a power of four, but the simplest equation uses the smallest multiplicity that matches each shape: one for a crossing, two for a touch, and three for a flattened crossing.', show: 'tip' },
        { say: 'Then check the end behaviour. The degree is two plus one, which is three, and "a" is positive, so the graph should go from quadrant three to quadrant one. It does.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A flattened crossing',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('g2', [
          g2,
          plot(g2, { id: 'curve', f: (x) => -(x + 2) * (x - 1) ** 3, tone: 'brand' }),
          dots(g2, [
            { id: 'Z1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'above left' },
            { id: 'Z2', x: 1, y: 0, tex: '1', tone: 'opp', place: 'above right' },
            { id: 'Y', x: 0, y: 2, tex: '2', tone: 'good', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a(x + 2)(x - 1)^3', '2 = a(2)(-1)^3 = -2a', 'a = -1', 'y = -(x + 2)(x - 1)^3'] }],
      lines: [
        { say: 'Here is a second graph. It crosses the axis at negative two like a line, so one factor is x plus two.', show: ['g2.grid', 'g2.axes', 'g2.curve', 'g2.Z1'], focus: 'g2.Z1' },
        { say: 'At one, it crosses with a flattened bend, so that zero has multiplicity three: the factor x minus one, cubed.', show: 'g2.Z2', focus: 'g2.Z2' },
        { say: 'So y equals "a", times x plus two, times x minus one, cubed.', show: 'm.0', focus: ['m.0', 'g2'] },
        { say: 'The y-intercept is two. Two equals "a", times two, times negative one cubed, which is negative two "a". So "a" equals negative one.', show: ['g2.Y', 'm.1', 'm.2'], focus: ['m.2', 'g2.Y'] },
        { say: 'The equation is y equals negative, x plus two, times x minus one, cubed. Check: the degree is four, and "a" is negative, so both ends fall, just as the graph shows.', show: 'm.3', focus: ['m.3', 'g2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cubic function has a zero of multiplicity $2$ at $x = 3$, a zero of multiplicity $1$ at $x = -1$, and a $y$-intercept of $18$. Which is its equation?',
          choices: ['$y = 18(x - 3)^2(x + 1)$', '$y = 2(x + 3)^2(x - 1)$', '$y = 2(x - 3)^2(x + 1)$', '$y = 2(x - 3)(x + 1)^2$'],
          answer: 2,
          working: '$y = a(x - 3)^2(x + 1)$. At $(0, 18)$: $18 = a(9)(1) = 9a$, so $a = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cubic function has a zero of multiplicity two at x equals three, a zero of multiplicity one at x equals negative one, and a y-intercept of eighteen. Which is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Write y equals "a", times x minus three, squared, times x plus one. At x equals zero, that is nine "a", so nine "a" equals eighteen, and "a" is two. Choice A uses the y-intercept itself as "a", but "a" is what you solve for.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each zero gives a factor; the shape at the zero gives its multiplicity.', 'Write $y = a(\\dots)$, then substitute a point to find $a$.', 'Use the least multiplicities, and check the end behaviour.'] }],
      lines: [
        { say: 'Let’s sum up. Each zero gives a factor, and the shape of the graph at the zero gives its multiplicity.', show: 'sum.0' },
        { say: 'Write y equals "a" times the factors, then substitute one more point, often the y-intercept, to find "a".', show: 'sum.1' },
        { say: 'And use the least multiplicities that match the shapes, then check the end behaviour. In part five, we solve polynomial inequalities and problems in context. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
