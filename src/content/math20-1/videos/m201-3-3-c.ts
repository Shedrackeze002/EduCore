import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-4, 2], y: [-8, 4], every: 0 });
const g2 = plane({ x: [0, 7], y: [0, 50], yStep: 10, width: 7, height: 6, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const land = (30 + Math.sqrt(940)) / 10;

const video: Explainer = {
  id: 'm201-3-3-c',
  lessonId: 'm201-3-3',
  title: 'Quadratic Functions in Standard Form, Part 3: Analyzing a Function',
  thumbnailTitle: 'Analyzing Standard Form',
  thumbnail: 'rk',
  summary: 'Analyzing y = 2x² + 6x − 1, whose vertex has fractions: the vertex by formula and by completing the square, the domain, range, number of x-intercepts and y-intercept, then the maximum height of a model rocket, h = −5t² + 30t + 2.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.3 · Part 3', title: 'Analyzing Standard Form', subtitle: 'Find the vertex first' }],
      lines: [
        { say: 'Once you know the vertex, the other features follow: the maximum or minimum, the range, and how many x-intercepts there are.', show: 'title' },
        { say: 'In this video, you will analyze a function whose vertex has fractions, and find the maximum height of a rocket.' },
      ],
    },
    {
      chapter: 'Fractions in the vertex',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['y = 2x^2 + 6x - 1', 'x = -\\dfrac{6}{2(2)} = -\\dfrac{3}{2}', 'y = 2\\left(\\tfrac{9}{4}\\right) - 9 - 1 = \\tfrac{9}{2} - 10 = -\\tfrac{11}{2}', 'y = 2\\left(x + \\tfrac{3}{2}\\right)^2 - \\tfrac{11}{2}'] }],
      lines: [
        { say: 'Analyze y equals two x squared, plus six x, minus one. Start with the vertex. x equals negative six, over two times two, which is negative three halves.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Substitute negative three halves. Its square is nine quarters, and two times nine quarters is nine halves. Then six times negative three halves is negative nine, so y is nine halves, minus nine, minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Nine halves minus ten is negative eleven halves. So the vertex is negative three halves, negative eleven halves.' },
        { say: 'Completing the square gives the same vertex: y equals two times x plus three halves, squared, minus eleven halves. Keep fractions exact, rather than rounding.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The features',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('fr', [
          g1,
          plot(g1, { id: 'curve', f: (x) => 2 * x * x + 6 * x - 1, tone: 'brand' }),
          dots(g1, [
            { id: 'V', x: -1.5, y: -5.5, tex: '\\left(-\\tfrac{3}{2}, -\\tfrac{11}{2}\\right)', tone: 'opp', place: 'below' },
            { id: 'Y', x: 0, y: -1, tex: '-1', tone: 'good', place: 'left' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['Opens up: minimum value $-\\tfrac{11}{2}$.', 'Domain: all real $x$. Range: $y \\ge -\\tfrac{11}{2}$.', 'Vertex below the $x$-axis, opens up: **two** $x$-intercepts.', '$y$-intercept: $c = -1$.'] }],
      lines: [
        { say: '"a" is two, which is positive, so the parabola opens up, and negative eleven halves is the minimum value.', show: ['fr.grid', 'fr.axes', 'fr.curve', 'fr.V', 'b.0'], focus: ['fr.V', 'b.0'] },
        { say: 'The domain is all real numbers, and the range is y greater than or equal to negative eleven halves.', show: 'b.1', focus: 'b.1' },
        { say: 'The vertex is below the x-axis, and the parabola opens up, so it crosses the x-axis twice: two x-intercepts.', show: 'b.2', focus: ['fr.curve', 'b.2'] },
        { say: 'And the y-intercept is c, which is negative one.', show: ['b.3', 'fr.Y'], focus: ['fr.Y', 'b.3'] },
      ],
    },
    {
      chapter: 'A model rocket',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('rk', [
          g2,
          plot(g2, { id: 'path', f: (t) => -5 * t * t + 30 * t + 2, from: 0, to: land, tone: 'opp' }),
          dots(g2, [
            { id: 'S', x: 0, y: 2, tex: '2', tone: 'adj', place: 'left' },
            { id: 'V', x: 3, y: 47, tex: '(3, 47)', tone: 'opp', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = -5t^2 + 30t + 2', 't = -\\dfrac{30}{2(-5)} = 3', 'h = -5(9) + 90 + 2 = 47', '\\text{maximum } 47\\text{ m at } 3\\text{ s}'] }],
      lines: [
        { say: 'In this example, a model rocket’s height, in metres, t seconds after launch, is h equals negative five t squared, plus thirty t, plus two. What is its maximum height, and when does it reach it?', show: ['rk.grid', 'rk.axes', 'rk.path', 'rk.S', 'm.0'] },
        { say: '"a" is negative, so the parabola opens down, and the vertex is the highest point. t equals negative thirty, over two times negative five, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute t equals three: negative five times nine, plus ninety, plus two, is forty-seven.', show: ['m.2', 'rk.V'], focus: ['m.2', 'rk.V'] },
        { say: 'So the rocket reaches a maximum height of forty-seven metres, three seconds after launch. It started at two metres: that is c, the intercept on the h-axis.', show: 'm.3', focus: ['m.3', 'rk.S'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the maximum value of $y = -x^2 + 6x + 1$?',
          choices: ['$10$', '$3$', '$28$', '$-26$'],
          answer: 0,
          working: '$x = -\\dfrac{6}{2(-1)} = 3$, and $y = -(3)^2 + 6(3) + 1 = -9 + 18 + 1 = 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the maximum value of y equals negative x squared, plus six x, plus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x equals negative six over negative two, which is three. Then y is negative nine, plus eighteen, plus one: ten. B gives the x-coordinate instead of the maximum value, and C drops the negative sign in front of x squared.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the vertex first: $x = -\\dfrac{b}{2a}$, then substitute.', 'The vertex gives the maximum or minimum, the range and the number of $x$-intercepts.', 'In a model, the vertex answers "how high" and "when".'] }],
      lines: [
        { say: 'Let’s sum up. To analyze a quadratic function in standard form, find the vertex first, and keep fractions exact.', show: 'sum.0' },
        { say: 'The vertex gives the maximum or minimum value, the range, and the number of x-intercepts.', show: 'sum.1' },
        { say: 'And in a model, the vertex answers how high, and when. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
