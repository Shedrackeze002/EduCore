import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-2, 8], y: [-5, 7], every: 0 });
const g2 = plane({ x: [-2, 8], y: [-6, 7], every: 0 });

const video: Explainer = {
  id: 'm201-3-3',
  lessonId: 'm201-3-3',
  title: 'Quadratic Functions in Standard Form, Part 1: The Axis of Symmetry',
  thumbnailTitle: 'Vertex from Standard Form',
  thumbnail: 'ax',
  summary: 'Standard form y = ax² + bx + c, what a and c tell you, why the axis of symmetry is x = −b/(2a), and finding the vertex, range and y-intercept of y = 2x² − 12x + 7. Parts 2 and 3 complete the square and analyze functions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.3 · Part 1', title: 'Vertex from Standard Form', subtitle: 'x = −b ⁄ 2a' }],
      lines: [
        { say: 'The height of a model rocket might be given as h equals negative five t squared, plus thirty t, plus two. That is easy to evaluate, but where is the highest point?', show: 'title' },
        { say: 'In this video, you will read the features of standard form, and find the vertex with the formula x equals negative b over two "a".' },
      ],
    },
    {
      chapter: 'Standard form',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('sf', [
          g1,
          plot(g1, { id: 'curve', f: (x) => x * x - 6 * x + 5, tone: 'brand' }),
          dots(g1, [{ id: 'Y', x: 0, y: 5, tex: '5', tone: 'good', place: 'left' }]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Standard form**: $y = ax^2 + bx + c$, $a \\ne 0$.', '$a > 0$: opens up. $a < 0$: opens down.', '$x = 0$ gives $y = c$: the $y$-intercept.'] }],
      lines: [
        { say: 'A quadratic function in standard form is y equals "a" x squared, plus b x, plus c, where "a" is not zero.', show: 'b.0' },
        { say: 'Two features can be read straight away. The sign of "a" gives the direction of opening: up when "a" is positive, and down when it is negative.', show: 'b.1' },
        { say: 'And substituting x equals zero leaves y equals c, so c is the y-intercept.', show: 'b.2' },
        { say: 'For y equals x squared, minus six x, plus five, "a" is one, so the parabola opens up, and the y-intercept is five. But the vertex is hidden.', show: ['sf.grid', 'sf.axes', 'sf.curve', 'sf.Y'], focus: ['sf.curve', 'sf.Y'] },
      ],
    },
    {
      chapter: 'Why x = −b/2a',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('ax', [
          g2,
          polyline(g2, { id: 'axis', points: [[3, -6], [3, 7]], tone: 'muted', dashed: true }),
          polyline(g2, { id: 'level', points: [[0, 5], [6, 5]], tone: 'opp', dashed: true }),
          plot(g2, { id: 'curve', f: (x) => x * x - 6 * x + 5, tone: 'brand' }),
          dots(g2, [
            { id: 'A', x: 0, y: 5, tex: '(0, 5)', tone: 'opp', place: 'left' },
            { id: 'B', x: 6, y: 5, tex: '(6, 5)', tone: 'opp', place: 'right' },
            { id: 'V', x: 3, y: -4, tex: '(3, -4)', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['ax^2 + bx + c = c', 'x(ax + b) = 0:\\ x = 0 \\text{ or } {-\\tfrac{b}{a}}', 'x = \\dfrac{0 + \\left(-\\frac{b}{a}\\right)}{2} = -\\dfrac{b}{2a}', 'x = 3:\\quad y = 9 - 18 + 5 = -4'] }],
      lines: [
        { say: 'Here is where the formula comes from. Find the two points at the height of the y-intercept, where y equals c. Subtracting c from both sides leaves "a" x squared, plus b x, equals zero.', show: ['ax.grid', 'ax.axes', 'ax.curve', 'ax.A', 'ax.B', 'ax.level', 'm.0'], focus: ['ax.level', 'm.0'] },
        { say: 'Factor out x: x times "a" x plus b equals zero. So x is zero, or x is negative b over "a".', show: 'm.1', focus: 'm.1' },
        { say: 'The two points are at the same height, so the axis of symmetry is halfway between them. Their mean is x equals negative b over two "a".', show: ['m.2', 'ax.axis'], focus: ['m.2', 'ax.axis'] },
        { say: 'For y equals x squared, minus six x, plus five, the points at zero, five, and at six, five, give the axis x equals three. Then y is nine, minus eighteen, plus five, which is negative four. The vertex is three, negative four.', show: ['m.3', 'ax.V'], focus: ['m.3', 'ax.V'] },
      ],
    },
    {
      chapter: 'Vertex from standard form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2x^2 - 12x + 7', 'x = -\\dfrac{-12}{2(2)} = 3', 'y = 2(3)^2 - 12(3) + 7 = -11', '\\text{vertex } (3, -11),\\quad y \\ge -11,\\quad y\\text{-intercept } 7'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of b', md: '$b = -12$, so $-b = +12$ and the axis is $x = 3$, not $x = -3$.' },
      ],
      lines: [
        { say: 'Find the vertex, the range, and the y-intercept of y equals two x squared, minus twelve x, plus seven.', show: 'm.0', focus: 'm.0' },
        { say: '"a" is two, and b is negative twelve. So x equals negative, negative twelve, over two times two, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch the sign of b. b is negative twelve, so negative b is positive twelve, and the axis is x equals three, not negative three.', show: 'oops' },
        { say: 'Substitute x equals three: two times nine, minus thirty-six, plus seven, is negative eleven. The vertex is three, negative eleven.', show: 'm.2', focus: 'm.2' },
        { say: '"a" is positive, so the parabola opens up, and negative eleven is the minimum value. The range is y greater than or equal to negative eleven, and the y-intercept is c, which is seven.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the vertex of $y = x^2 + 4x - 1$?',
          choices: ['$(-2, -5)$', '$(2, 11)$', '$(-4, -1)$', '$(-2, -13)$'],
          answer: 0,
          working: '$x = -\\dfrac{4}{2(1)} = -2$, and $y = (-2)^2 + 4(-2) - 1 = 4 - 8 - 1 = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the vertex of y equals x squared, plus four x, minus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x equals negative four, over two, which is negative two. Then y is four, minus eight, minus one: negative five. B gets the sign of x wrong, and C uses negative b over "a", without the two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The sign of $a$ gives the direction of opening; $c$ is the $y$-intercept.', 'The axis of symmetry is $x = -\\dfrac{b}{2a}$.', 'Substitute it to find the $y$-coordinate of the vertex.'] }],
      lines: [
        { say: 'Let’s sum up. In standard form, the sign of "a" gives the direction of opening, and c is the y-intercept.', show: 'sum.0' },
        { say: 'The axis of symmetry is x equals negative b over two "a".', show: 'sum.1' },
        { say: 'Substitute it into the function to find the y-coordinate of the vertex. In part two, we complete the square. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
