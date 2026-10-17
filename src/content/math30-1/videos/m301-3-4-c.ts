import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [-4, 3], y: [-6, 6], yStep: 2, every: 0, width: 7, height: 7 });

const video: Explainer = {
  id: 'm301-3-4-c',
  lessonId: 'm301-3-4',
  title: 'Equations and Graphs of Polynomial Functions, Part 3: Sketching from Factored Form',
  thumbnailTitle: 'Sketching Polynomials',
  thumbnail: 'sk',
  summary: 'Sketching a polynomial function from its factored form in four steps (zeros and multiplicities, the y-intercept, the degree and the sign of the leading coefficient, then the curve), with y = −(x + 2)(x − 1)², and finding the leading coefficient of y = 2(3 − x)(x + 1)².',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.4 · Part 3', title: 'Sketching Polynomials', subtitle: 'From factored form to a graph' }],
      lines: [
        { say: 'Factored form tells you almost everything about a graph: where it meets the x-axis, what it does there, and where its ends go.', show: 'title' },
        { say: 'In this video, you will sketch a polynomial function from its factored form, in four steps.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Find the zeros and their multiplicities.', 'Find the $y$-intercept: substitute $x = 0$.', 'Find the degree (add the exponents) and the sign of the leading coefficient: they give the end behaviour.', 'Draw the curve from the left end to the right end, through the intercepts, with the right shape at each zero.'] }],
      lines: [
        { say: 'To sketch y equals P of x from its factored form, first find the zeros and their multiplicities. They tell you where the graph meets the x-axis, and whether it crosses or touches.', show: 'b.0', focus: 'b.0' },
        { say: 'Second, find the y-intercept by substituting zero for x.', show: 'b.1', focus: 'b.1' },
        { say: 'Third, find the degree, by adding the exponents, and the sign of the leading coefficient. Multiply the number in front by the coefficient of x in each factor, each raised to its exponent. Together, they give the end behaviour.', show: 'b.2', focus: 'b.2' },
        { say: 'Finally, draw the curve from the left end to the right end, through the intercepts, with the right shape at each zero.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Sketching a cubic',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('sk', [
          g,
          plot(g, { id: 'curve', f: (x) => -(x + 2) * (x - 1) ** 2, tone: 'brand' }),
          dots(g, [
            { id: 'Z1', x: -2, y: 0, tex: '-2', tone: 'adj', place: 'below left', group: 'zeros' },
            { id: 'Z2', x: 1, y: 0, tex: '1', tone: 'opp', place: 'above', group: 'zeros' },
            { id: 'Y', x: 0, y: -2, tex: '-2', tone: 'good', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['$y = -(x + 2)(x - 1)^2$', 'Zeros: $-2$ (crosses) and $1$ (touches).', '$y$-intercept: $-(2)(-1)^2 = -2$.', 'Degree $3$, leading coefficient $-1$: quadrant II to quadrant IV.'] }],
      lines: [
        { say: 'Sketch y equals negative, x plus two, times x minus one, squared.', show: ['b.0', 'sk.grid', 'sk.axes'], focus: 'b.0' },
        { say: 'Step one: the zeros. Negative two has multiplicity one, so the graph crosses there. One has multiplicity two, so the graph touches the axis there and turns back.', show: ['b.1', 'sk.zeros'], focus: ['b.1', 'sk.zeros'] },
        { say: 'Step two: the y-intercept. Substitute zero: negative, times two, times negative one squared, which is negative two.', show: ['b.2', 'sk.Y'], focus: ['b.2', 'sk.Y'] },
        { say: 'Step three: the degree is one plus two, which is three, an odd number. The leading coefficient is negative one. So the graph extends from quadrant two to quadrant four.', show: 'b.3', focus: 'b.3' },
        { say: 'Step four: draw it. Start high on the left, cross the axis at negative two, pass through the point at zero, negative two, rise to touch the axis at one, and fall to the right.', show: 'sk.curve', focus: ['b', 'sk.curve'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The leading coefficient of a factored form', md: 'In $y = 2(3 - x)(x + 1)^2$, the leading coefficient is $2 \\times (-1) \\times 1^2 = -2$, not $2$. A factor such as $(3 - x)$ contributes $-x$ when you expand.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = 2(3 - x)(x + 1)^2', '2 \\times (-x) \\times (x)^2 = -2x^3'] },
      ],
      lines: [
        { say: 'Be careful with the leading coefficient. In y equals two, times three minus x, times x plus one, squared, the leading coefficient is not two.', show: ['oops', 'm.0'], focus: 'm.0' },
        { say: 'The factor three minus x contributes negative x when you expand. Multiply the leading parts: two, times negative x, times x squared, is negative two x cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'So the leading coefficient is negative two. The degree is three, so this graph rises on the left and falls on the right.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the $y$-intercept and the end behaviour of $y = (x - 2)^2(x + 3)$.',
          choices: ['$12$; quadrant III to I', '$12$; quadrant II to I', '$-12$; quadrant III to I', '$-6$; quadrant III to I'],
          answer: 0,
          working: '$y$-intercept: $(0 - 2)^2(0 + 3) = 4 \\times 3 = 12$. Degree $2 + 1 = 3$, odd, and leading coefficient $1$: from quadrant III to quadrant I.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the y-intercept and the end behaviour of y equals x minus two, squared, times x plus three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Substitute zero: negative two, squared, is four, and four times three is twelve. The degree is two plus one, which is three, and the leading coefficient is one, so the graph goes from quadrant three to quadrant one. B treats the degree as even because of the square, but you add all the exponents.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The zeros and their multiplicities show where and how the graph meets the $x$-axis.', 'Substitute $x = 0$ for the $y$-intercept.', 'Degree: add the exponents. Sign: multiply the leading parts of the factors.'] }],
      lines: [
        { say: 'Let’s sum up. The zeros and their multiplicities show where the graph meets the x-axis, and how.', show: 'sum.0' },
        { say: 'Substitute zero for x to find the y-intercept.', show: 'sum.1' },
        { say: 'And for the end behaviour, add the exponents for the degree, and multiply the leading parts of the factors for the sign. In part four, we reverse the process, and write the equation from a graph. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
