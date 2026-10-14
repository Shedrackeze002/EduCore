import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-1, 9], y: [-1, 8], every: 2 });
const t = plane({ x: [-4, 6], y: [-2, 6], every: 2 });

const video: Explainer = {
  id: 'm10c-6-5',
  lessonId: 'm10c-6-5',
  title: 'Distance and Midpoint, Part 1: The Distance Formula',
  thumbnailTitle: 'The Distance Formula',
  thumbnail: 'dist',
  summary: 'The distance formula as the Pythagorean theorem on a grid, using brackets when subtracting a negative, and using squared side lengths to decide whether a triangle is a right triangle. Part 2 covers midpoints, endpoints and circles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.5 · Part 1', title: 'The Distance Formula', subtitle: 'The Pythagorean theorem on a grid' }],
      lines: [
        { say: 'How far apart are two points on a grid? When they are not in the same row or column, you cannot just count the squares.', show: 'title' },
        { say: 'In this video, you will build the distance formula from an idea you already know, the Pythagorean theorem. In part two, we find midpoints.' },
      ],
    },
    {
      chapter: 'A right triangle',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('dist', [
          g,
          polyline(g, { id: 'run', points: [[1, 2], [7, 2]], tone: 'adj', labels: ['6'], dashed: true }),
          polyline(g, { id: 'rise', points: [[7, 2], [7, 6]], tone: 'opp', labels: ['4'], sides: ['right'], dashed: true }),
          polyline(g, { id: 'd', points: [[1, 2], [7, 6]], labels: ['d'] }),
          dots(g, [
            { id: 'A', x: 1, y: 2, tex: 'A(1,\\,2)', place: 'below right' },
            { id: 'B', x: 7, y: 6, tex: 'B(7,\\,6)', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\adj{x_2 - x_1 = 7 - 1 = 6}', '\\opp{y_2 - y_1 = 6 - 2 = 4}', 'd^2 = \\adj{6}^2 + \\opp{4}^2'] }],
      lines: [
        { say: 'How far apart are A, one, two, and B, seven, six? Join them, and draw a right triangle with a horizontal leg and a vertical leg.', show: ['dist.grid', 'dist.axes', 'dist.A', 'dist.B', 'dist.d', 'dist.run', 'dist.rise'] },
        { say: 'The horizontal leg is x two minus x one: seven minus one, which is six.', show: 'm.0', focus: ['m.0', 'dist.run'] },
        { say: 'The vertical leg is y two minus y one: six minus two, which is four.', show: 'm.1', focus: ['m.1', 'dist.rise'] },
        { say: 'The distance d is the hypotenuse. So by the Pythagorean theorem, d squared is six squared plus four squared.', show: 'm.2', focus: ['m.2', 'dist.d'] },
      ],
    },
    {
      chapter: 'The distance formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Distance formula', md: '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$' },
        { kind: 'math', id: 'm', lines: ['d = \\sqrt{(7 - 1)^2 + (6 - 2)^2} = \\sqrt{36 + 16} = \\sqrt{52}', 'd = 2\\sqrt{13} \\approx 7.2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Order does not matter here', md: 'The differences are squared, so $(1 - 7)^2 = (7 - 1)^2$. Just be consistent.' },
      ],
      lines: [
        { say: 'Take the square root of both sides, and you have the distance formula: the square root of x two minus x one, squared, plus y two minus y one, squared.', show: 'def' },
        { say: 'For A and B, that is the square root of thirty-six plus sixteen: the square root of fifty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'That simplifies to two root thirteen, or about 7.2 units.', show: 'm.1', focus: 'm.1' },
        { say: 'Because the differences are squared, the order of the points does not matter. Just be consistent.', show: 'tip' },
      ],
    },
    {
      chapter: 'Subtracting a negative',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Find the distance between $(-3, 2)$ and $(5, -4)$.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['x_2 - x_1 = 5 - (-3) = 8', 'y_2 - y_1 = -4 - 2 = -6', 'd = \\sqrt{8^2 + (-6)^2} = \\sqrt{100} = 10'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Use brackets', md: '$5 - (-3)$ is $8$, not $2$. Put brackets around every coordinate you substitute.' },
      ],
      lines: [
        { say: 'Find the distance between negative three, two, and five, negative four.', show: 'q' },
        { say: 'The change in x is five minus negative three, which is eight, not two. The change in y is negative four minus two, which is negative six.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So d is the square root of eight squared plus negative six, squared: the square root of one hundred, which is ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Losing the sign is an easy mistake. Put brackets around every coordinate you substitute.', show: 'oops' },
      ],
    },
    {
      chapter: 'Is it a right triangle?',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('tri', [
          t,
          polyline(t, { id: 'sides', points: [[0, 0], [4, 2], [-2, 4], [0, 0]] }),
          dots(t, [
            { id: 'P', x: 0, y: 0, tex: 'P', place: 'below right' },
            { id: 'Q', x: 4, y: 2, tex: 'Q', place: 'right' },
            { id: 'R', x: -2, y: 4, tex: 'R', place: 'above left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PQ^2 = 4^2 + 2^2 = 20', 'PR^2 = (-2)^2 + 4^2 = 20', 'QR^2 = (-6)^2 + 2^2 = 40', '20 + 20 = 40 \\ \\checkmark'] }],
      lines: [
        { say: 'Is the triangle with vertices P, zero, zero; Q, four, two; and R, negative two, four, a right triangle?', show: ['tri.grid', 'tri.axes', 'tri.sides', 'tri.P', 'tri.Q', 'tri.R'] },
        { say: 'Find the square of each side. You can skip the square roots, because the Pythagorean theorem uses the squares. P Q squared is four squared plus two squared, which is twenty.', show: 'm.0', focus: ['m.0', 'tri.sides-0'] },
        { say: 'P R squared is negative two, squared, plus four squared: also twenty.', show: 'm.1', focus: ['m.1', 'tri.sides-2'] },
        { say: 'And Q R squared is negative six, squared, plus two squared, which is forty.', show: 'm.2', focus: ['m.2', 'tri.sides-1'] },
        { say: 'Twenty plus twenty is forty, so the sides fit the Pythagorean theorem. It is a right triangle, with the right angle at P. And since P Q equals P R, it is isosceles too.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the distance between $(2, -1)$ and $(5, 3)$.',
          choices: ['$5$', '$25$', '$\\sqrt{53}$', '$7$'],
          answer: 0,
          working: '$d = \\sqrt{(5 - 2)^2 + (3 - (-1))^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the distance between two, negative one, and five, three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The changes are three and four, so d is the square root of nine plus sixteen, the square root of twenty-five, which is five. B forgets the square root, C adds the coordinates, and D adds the legs.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$: the Pythagorean theorem on a grid.', 'Use brackets when you subtract a negative coordinate.', 'Compare squared side lengths to test for a right triangle.'] }],
      lines: [
        { say: "Let's sum up. The distance formula is the Pythagorean theorem on a grid.", show: 'sum.0' },
        { say: 'Use brackets when you subtract a negative coordinate.', show: 'sum.1' },
        { say: 'And compare the squared side lengths to test for a right triangle. In part two, we find midpoints, endpoints and the centre of a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
