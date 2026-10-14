import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-3, 5], y: [-5, 5], every: 0 });
const f = (x: number) => -x * x + 2 * x + 3;

/** The points on or below the arch, inside the plane: the curve from x = −2 to x = 4, closed along the bottom edge. */
const xs = Array.from({ length: 49 }, (_, i) => -2 + (6 * i) / 48);
const below: Part = {
  points: Object.fromEntries(xs.map((x, i) => [`s${i}`, g.map(x, f(x))])),
  items: [{ kind: 'region', id: 'shade', points: xs.map((_, i) => `s${i}`), tone: 'opp', shade: 0.22 }],
};

const video: Explainer = {
  id: 'm201-9-3',
  lessonId: 'm201-9-3',
  title: 'Quadratic Inequalities in Two Variables, Part 1: Graphing the Region',
  thumbnailTitle: 'Quadratic Inequalities in Two Variables',
  thumbnail: 'ar',
  summary: 'Testing points against y > x² − 3x + 1, graphing y ≤ −x² + 2x + 3 with a solid boundary and a test point, where y > and y < shade, and why a test point on the boundary cannot decide. Part 2 reads inequalities from graphs and models a bridge arch.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.3 · Part 1', title: 'Quadratic Inequalities', subtitle: 'Above or below a parabola' }],
      lines: [
        { say: 'A parabola splits the coordinate plane into two parts: the points above it, and the points below it. A quadratic inequality in two variables picks one of those parts, just as a linear inequality picks one side of a line.', show: 'title' },
        { say: 'In this video, you will test points, and graph the solution region of a quadratic inequality.' },
      ],
    },
    {
      chapter: 'Testing points',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic inequality in two variables', md: 'An inequality such as $y > ax^2 + bx + c$, with $<$, $\\le$, $>$ or $\\ge$ and $a \\ne 0$. Its **boundary** is the parabola $y = ax^2 + bx + c$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(1, 2):\\quad 1 - 3 + 1 = -1,\\quad 2 > -1 \\;\\checkmark', '(3, 1):\\quad 9 - 9 + 1 = 1,\\quad 1 > 1\\,?\\ \\text{No}'] },
      ],
      lines: [
        { say: 'A quadratic inequality in two variables compares y with a quadratic expression in x. Its boundary is the parabola y equals "a" x squared, plus b x, plus c.', show: 'def' },
        { say: 'To test a point, evaluate the quadratic at the point’s x-coordinate, and compare the result with its y-coordinate. Are one, two, and three, one, solutions of y greater than x squared, minus three x, plus one?' },
        { say: 'For one, two: one, minus three, plus one, is negative one. Is two greater than negative one? Yes, so one, two is a solution.', show: 'm.0', focus: 'm.0' },
        { say: 'For three, one: nine, minus nine, plus one, is one. Is one greater than one? No. The point is on the boundary, which is not included for greater than.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Graphing the region',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'bullets', id: 'b', items: ['Graph the boundary: **solid** for $\\le$ or $\\ge$, **dashed** for $<$ or $>$.', 'Choose a test point that is not on the parabola.', 'Shade its region if it is true; otherwise, the other region.'] }],
      right: [
        figure('ar', [
          g,
          below,
          plot(g, { id: 'curve', f, tone: 'brand' }),
          dots(g, [
            { id: 'V', x: 1, y: 4, tex: '(1, 4)', tone: 'adj', place: 'above right' },
            { id: 'O', x: 0, y: 0, tex: '(0, 0)', tone: 'good', place: 'below right' },
          ]),
        ]),
      ],
      lines: [
        { say: 'To graph the solution region, graph the boundary parabola: solid for at most or at least, and dashed for less than or greater than. Then choose a test point that is not on the parabola, and shade the region that makes the inequality true.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Graph y at most negative x squared, plus two x, plus three. In vertex form, that is negative, x minus one, squared, plus four: vertex one, four, opening down, and crossing the x-axis at negative one and three. The sign is at most, so the parabola is solid.', show: ['ar.grid', 'ar.axes', 'ar.curve', 'ar.V'], focus: ['ar.curve', 'ar.V'] },
        { say: 'Test zero, zero. The right side is three, and zero is at most three: true.', show: 'ar.O', focus: 'ar.O' },
        { say: 'So shade the region containing zero, zero: the points on or below the parabola, inside the arch and beneath it.', show: 'ar.shade', focus: 'ar.shade' },
      ],
    },
    {
      chapter: 'Above and below',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'When y is alone', md: '$y >$ or $y \\ge$ means the points **above** the parabola; $y <$ or $y \\le$ means the points **below** it. That may be inside or outside the curve.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A test point on the boundary', md: 'A point **on** the parabola makes both sides equal, so it cannot decide. If $(0, 0)$ is on the boundary, use another point, such as $(0, 1)$.' },
      ],
      lines: [
        { say: 'When y is alone on the left, greater than, or at least, means the points above the parabola, and less than, or at most, means the points below it. Depending on which way the parabola opens, that region may be inside or outside the curve.', show: 'tip' },
        { say: 'And choose the test point carefully. A point on the parabola makes both sides equal, so it cannot tell you which side to shade. If zero, zero is on the boundary, use another point, such as zero, one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Is $(2, 5)$ a solution of $y \\le x^2 + 1$?',
          choices: ['Yes: it is on the boundary, which is included.', 'No: it is on the boundary.', 'Yes: it is above the parabola.', 'No: it is below the parabola.'],
          answer: 0,
          working: '$2^2 + 1 = 5$, and $5 \\le 5$ is true. The point is on the solid boundary, so it is a solution.',
        },
      ],
      lines: [
        { say: 'Your turn. Is two, five a solution of y at most x squared plus one? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two squared plus one is five, and five is at most five, so it is true. The point is on the boundary, which is solid, and included, for at most.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Test a point: evaluate the quadratic at its $x$, and compare with its $y$.', 'Boundary: solid for $\\le$, $\\ge$; dashed for $<$, $>$.', '$y >$ shades above the parabola, $y <$ below; confirm with a test point.'] }],
      lines: [
        { say: 'Let’s sum up. To test a point, evaluate the quadratic at its x-coordinate, and compare with its y-coordinate.', show: 'sum.0' },
        { say: 'The boundary is solid for at most or at least, and dashed for less than or greater than.', show: 'sum.1' },
        { say: 'And y greater than shades above the parabola, while y less than shades below. In part two, we read inequalities from graphs, and model an arch. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
