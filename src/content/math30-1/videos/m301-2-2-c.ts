import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const f = (x: number) => 9 - x * x;
const r8 = 2 * Math.SQRT2;

const g = plane({ x: [-5, 5], y: [-2, 11], every: 2 });

/** y = 9 − x² (grey) and the arch y = √(9 − x²), with its key points. */
const arch = figure('arch', [
  g,
  plot(g, { id: 'f', f, tone: 'muted' }),
  plot(g, { id: 'sf', f: (x) => root(f(x)), from: -3, to: 3, samples: 300 }),
  dots(g, [
    { id: 'Z1', x: -3, y: 0, tex: '(-3, 0)', tone: 'opp', place: 'above left' },
    { id: 'Z2', x: 3, y: 0, tex: '(3, 0)', tone: 'opp', place: 'above right' },
    { id: 'M', x: 0, y: 9, tex: '(0, 9)', tone: 'muted', place: 'above right' },
    { id: 'T', x: 0, y: 3, tex: '(0, 3)', tone: 'adj', place: 'above right' },
    { id: 'I1', x: -r8, y: 1, tone: 'good', group: 'inv' },
    { id: 'I2', x: r8, y: 1, tone: 'good', group: 'inv' },
  ]),
]);

const video: Explainer = {
  id: 'm301-2-2-c',
  lessonId: 'm301-2-2',
  title: 'Square Root of a Function, Part 3: Arches and Quick Sketches',
  thumbnailTitle: 'Arches and Quick Sketches',
  thumbnail: 'arch',
  summary: 'The square root of a parabola that opens down is a single arch: the domain, range and invariant points of y = √(9 − x²), why its maximum is √9 = 3 and not 9, and a quick way to sketch y = √f(x) from the graph of f.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.2 · Part 3', title: 'Arches and Quick Sketches', subtitle: 'A parabola that opens down' }],
      lines: [
        { say: 'When a parabola opens down, it is above the x-axis only between its zeros. Its square root becomes a single arch.', show: 'title' },
        { say: 'In this video, you will find the domain, range and invariant points of that arch, and learn a quick way to sketch the square root of any function.' },
      ],
    },
    {
      chapter: 'An arch',
      layout: 'split',
      leftWidth: 520,
      left: [arch],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = 9 - x^2', '9 - x^2 \\ge 0 \\;\\Rightarrow\\; -3 \\le x \\le 3', '\\text{Maximum of } f\\text{: } 9 \\text{ at } x = 0', '\\text{Maximum of } \\sqrt{f(x)}\\text{: } \\sqrt{9} = 3', '\\text{Domain } [-3, 3],\\ \\text{range } [0, 3]'] }],
      lines: [
        { say: 'Let f of x equal nine minus x squared: a parabola that opens down, with zeros at negative three and three. State the domain, the range and the invariant points of y equals the square root of f of x.', show: ['arch.grid', 'arch.axes', 'arch.f', 'arch.Z1', 'arch.Z2', 'm.0'], focus: 'm.0' },
        { say: 'Nine minus x squared is greater than or equal to zero when x is between negative three and three. That is the domain.', show: 'm.1', focus: 'm.1' },
        { say: 'The maximum of f is nine, at x equals zero.', show: ['m.2', 'arch.M'], focus: ['m.2', 'arch.M'] },
        { say: 'So the maximum of the square root of f is the square root of nine: three. The smallest value is zero, at the zeros.', show: ['m.3', 'arch.T', 'arch.sf'], focus: ['m.3', 'arch.T', 'arch.sf'] },
        { say: 'In interval notation, the domain is negative three to three, and the range is zero to three, with square brackets, because the ends are included.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sqrt{9 - x^2}:\\quad \\text{range } [0, 3],\\ \\text{not } [0, 9]'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the root of the maximum', md: 'The range of $y = \\sqrt{f(x)}$ comes from the square roots of the values of $f$. The maximum of $f$ is $9$, so the maximum of $\\sqrt{f(x)}$ is $\\sqrt{9} = 3$.' },
      ],
      lines: [
        { say: 'A common mistake is to read the range from the parabola, and say zero to nine.', show: 'm.0', focus: 'm.0' },
        { say: 'But every height is replaced by its square root, including the highest one. The maximum of f is nine, so the maximum of the square root of f is three.', show: 'oops' },
      ],
    },
    {
      chapter: 'Invariant points',
      layout: 'split',
      leftWidth: 520,
      left: [arch],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = 0:\\ x = \\pm 3', 'f(x) = 1:\\ 9 - x^2 = 1,\\ x^2 = 8', 'x = \\pm 2\\sqrt{2} \\approx \\pm 2.83', '(-3, 0),\\ (3, 0)', '(-2\\sqrt{2}, 1),\\ (2\\sqrt{2}, 1)'] }],
      lines: [
        { say: 'Now the invariant points. They come from f of x equals zero, and f of x equals one.', show: ['arch.grid', 'arch.axes', 'arch.f', 'arch.sf', 'arch.Z1', 'arch.Z2'] },
        { say: 'f of x is zero at x equals negative three and three.', show: 'm.0', focus: ['m.0', 'arch.Z1', 'arch.Z2'] },
        { say: 'Nine minus x squared equals one when x squared is eight. So x is plus or minus the square root of eight, which simplifies to two root two: about 2.83.', show: ['m.1', 'm.2', 'arch.inv'], focus: ['m.1', 'm.2', 'arch.inv'] },
        { say: 'So the arch has four invariant points: negative three, zero; three, zero; negative two root two, one; and two root two, one.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'Between the two invariant points at a height of one, f is greater than one, so the arch is below the parabola. Outside them, f is between zero and one, so the arch is above it.', focus: ['arch.sf', 'arch.inv'] },
      ],
    },
    {
      chapter: 'Sketching quickly',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: [
            'Plot the invariant points, where $f(x) = 0$ and $f(x) = 1$.',
            'Mark where $f(x) < 0$: there is no graph there.',
            'Take square roots of a few easy values, such as $4 \\to 2$ and $9 \\to 3$.',
            'Join the points with a smooth curve that meets the $x$-axis vertically.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a quick way to sketch the square root of any function from its graph. First, plot the invariant points, where f of x is zero or one.', show: 'b.0' },
        { say: 'Second, mark where f of x is negative. There is no graph there at all.', show: 'b.1' },
        { say: 'Third, take square roots of a few easy heights: four becomes two, and nine becomes three.', show: 'b.2' },
        { say: 'Finally, join the points with a smooth curve. Near a zero of f, the heights are tiny, and the square root of a tiny number is much bigger: the square root of 0.01 is 0.1. So the curve meets the x-axis vertically, shooting straight up.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the range of $y = \\sqrt{16 - x^2}$?',
          choices: ['$\\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid 0 \\le y \\le 16,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid -4 \\le y \\le 4,\\ y \\in \\mathbb{R}\\}$', '$\\{y \\mid 0 \\le y \\le 4,\\ y \\in \\mathbb{R}\\}$'],
          answer: 3,
          working: 'The maximum of $16 - x^2$ is $16$, at $x = 0$, so the maximum of $\\sqrt{16 - x^2}$ is $\\sqrt{16} = 4$. The smallest value is $0$, at $x = \\pm 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the range of y equals the square root of sixteen minus x squared? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. The maximum of sixteen minus x squared is sixteen, at x equals zero, so the maximum of its square root is four. The smallest value is zero, at x equals plus or minus four. B forgets to take the square root of the maximum.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A parabola that opens down gives a single arch, between its zeros.', 'The maximum of $\\sqrt{f(x)}$ is the square root of the maximum of $f$.', 'Sketch from the invariant points, the gaps where $f(x) < 0$, and a few easy square roots.'] }],
      lines: [
        { say: 'Let’s sum up. A parabola that opens down gives a single arch, between its zeros.', show: 'sum.0' },
        { say: 'The maximum of the square root of f is the square root of the maximum of f.', show: 'sum.1' },
        { say: 'And to sketch quickly, use the invariant points, the gaps where f is negative, and a few easy square roots. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
