import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, type Plane } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const f = (x: number) => x * x - 4;
const r5 = Math.sqrt(5);

const g = plane({ x: [-5, 5], y: [-5, 5], every: 4 });

const abs = plane({ name: 'p', x: [-4, 4], y: [-4, 5], every: 0, at: [0, 0] });
const sq = plane({ name: 'q', x: [-4, 4], y: [-4, 5], every: 0, at: [10.5, 0] });

/** A plane for the side-by-side comparison, with the grey parabola on it and an equation below it. */
function compare(p: Plane, at: number, tex: string): Part[] {
  const label: Part = { points: { [p.n('tt')]: [at, -4] }, items: [{ kind: 'label', id: p.n('eq'), at: p.n('tt'), tex, place: 'below' }] };
  return [p, plot(p, { id: 'f', f, from: -3, to: 3, tone: 'muted', dashed: true }), label];
}

const video: Explainer = {
  id: 'm301-2-2-b',
  lessonId: 'm301-2-2',
  title: 'Square Root of a Function, Part 2: Domain, Range and Quadratics',
  thumbnailTitle: 'Domain, Range and Quadratics',
  thumbnail: 'up',
  summary: 'The domain of y = √f(x) is where f(x) ≥ 0 and its range is the square roots of the non-negative values of f, for √(2x − 4) and √(x² − 4), whose graph has two branches. Also why √f(x) removes the negative part of a graph while |f(x)| reflects it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.2 · Part 2', title: 'Domain, Range and Quadratics', subtitle: 'Only where $f(x) \\ge 0$' }],
      lines: [
        { say: 'The graph of the square root of f of x exists only where f of x is not negative. That one fact gives you its domain.', show: 'title' },
        { say: 'In this video, you will state the domain and range of y equals the square root of f of x, and graph the square root of a parabola that opens up.' },
      ],
    },
    {
      chapter: 'Domain and range',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Domain:** every $x$ with $f(x) \\ge 0$.', '**Range:** the square roots of the non-negative values of $f$.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\sqrt{2x - 4}:\\quad 2x - 4 \\ge 0 \\;\\Rightarrow\\; x \\ge 2', '\\text{Domain: } \\{x \\mid x \\ge 2,\\ x \\in \\mathbb{R}\\}', '\\text{Range: } \\{y \\mid y \\ge 0,\\ y \\in \\mathbb{R}\\}'] },
      ],
      lines: [
        { say: 'The domain of y equals the square root of f of x is every x where f of x is greater than or equal to zero.', show: 'b.0' },
        { say: 'The range is the set of square roots of the values of f that are not negative.', show: 'b.1' },
        { say: 'State the domain and range of y equals the square root of two x minus four. Solve two x minus four greater than or equal to zero: two x is at least four, so x is at least two.', show: 'm.0', focus: 'm.0' },
        { say: 'So the domain is all real x greater than or equal to two.', show: 'm.1', focus: 'm.1' },
        { say: 'On that domain, two x minus four takes every value from zero up, so its square root also takes every value from zero up. The range is all real y greater than or equal to zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A parabola that opens up',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('up', [
          g,
          plot(g, { id: 'f', f, tone: 'muted' }),
          plot(g, { id: 'sl', f: (x) => root(f(x)), from: -5, to: -2, samples: 300 }),
          plot(g, { id: 'sr', f: (x) => root(f(x)), from: 2, to: 5, samples: 300 }),
          dots(g, [
            { id: 'Z1', x: -2, y: 0, tex: '-2', tone: 'opp', place: 'below left' },
            { id: 'Z2', x: 2, y: 0, tex: '2', tone: 'opp', place: 'below right' },
            { id: 'V', x: 0, y: -4, tex: '(0, -4)', tone: 'muted', place: 'below right' },
            { id: 'I1', x: -r5, y: 1, tone: 'good', group: 'inv' },
            { id: 'I2', x: r5, y: 1, tone: 'good', group: 'inv' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f(x) = x^2 - 4 = (x + 2)(x - 2)', '\\text{Zeros: } {-2} \\text{ and } 2', '\\text{Vertex: } (0, -4)', '\\text{Domain: } x \\le -2 \\text{ or } x \\ge 2', '\\text{Range: } y \\ge 0'] }],
      lines: [
        { say: 'For a quadratic, find the zeros and the vertex first. f of x equals x squared minus four factors as x plus two, times x minus two.', show: ['up.grid', 'up.axes', 'up.f', 'm.0'], focus: 'm.0' },
        { say: 'So its zeros are negative two and two, and its vertex is zero, negative four.', show: ['m.1', 'm.2', 'up.Z1', 'up.Z2', 'up.V'], focus: ['m.1', 'm.2', 'up.Z1', 'up.Z2', 'up.V'] },
        { say: 'The parabola opens up, so f of x is negative between the zeros, and positive outside them. Between negative two and two, the new graph has no points at all.', focus: 'up.f' },
        { say: 'Outside the zeros, take square roots of the heights. Each branch starts at a zero, shoots straight up from the x-axis, and passes through an invariant point where f equals one, at x equals plus or minus root five. After that, it grows more slowly than the parabola.', show: ['up.sl', 'up.sr', 'up.inv'], focus: ['up.sl', 'up.sr', 'up.inv'] },
        { say: 'So y equals the square root of x squared minus four has two branches. Its domain is x less than or equal to negative two, or x greater than or equal to two.', show: 'm.3', focus: 'm.3' },
        { say: 'Its range is y greater than or equal to zero, because the heights of f run from zero up.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Not the absolute value',
      layout: 'center',
      main: [
        figure('cmp', [
          ...compare(abs, 0, 'y = |x^2 - 4|'),
          plot(abs, { id: 'g', f: (x) => Math.abs(f(x)), samples: 300 }),
          ...compare(sq, 10.5, 'y = \\sqrt{x^2 - 4}'),
          plot(sq, { id: 'gl', f: (x) => root(f(x)), from: -4, to: -2, samples: 200 }),
          plot(sq, { id: 'gr', f: (x) => root(f(x)), from: 2, to: 4, samples: 200 }),
        ]),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The square root is not the absolute value', md: 'The absolute value **reflects** the negative part of a graph above the $x$-axis. The square root **removes** it: where $f(x) < 0$, $\\sqrt{f(x)}$ is undefined.' },
      ],
      lines: [
        { say: 'Do not confuse the square root of f of x with the absolute value of f of x. Both start from the grey parabola, y equals x squared minus four.', show: ['cmp.p-grid', 'cmp.p-axes', 'cmp.p-f', 'cmp.p-eq', 'cmp.q-grid', 'cmp.q-axes', 'cmp.q-f', 'cmp.q-eq'] },
        { say: 'The absolute value reflects the negative part of the graph above the x-axis. So y equals the absolute value of x squared minus four has a hump between negative two and two.', show: 'cmp.p-g', focus: 'cmp.p-g' },
        { say: 'The square root removes the negative part. Where f of x is negative, its square root is undefined, so y equals the square root of x squared minus four has no points at all between negative two and two.', show: ['cmp.q-gl', 'cmp.q-gr'], focus: ['cmp.q-gl', 'cmp.q-gr'] },
        { say: 'Reflect for the absolute value; remove for the square root.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the domain of $y = \\sqrt{x^2 - 9}$?',
          choices: ['$\\{x \\mid -3 \\le x \\le 3,\\ x \\in \\mathbb{R}\\}$', '$\\{x \\mid x \\le -3 \\text{ or } x \\ge 3,\\ x \\in \\mathbb{R}\\}$', '$\\{x \\mid x \\ge 3,\\ x \\in \\mathbb{R}\\}$', '$\\{x \\mid x \\in \\mathbb{R}\\}$'],
          answer: 1,
          working: '$x^2 - 9 = (x + 3)(x - 3)$ has zeros $-3$ and $3$, and the parabola opens up, so $x^2 - 9 \\ge 0$ outside the zeros: $x \\le -3$ or $x \\ge 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the domain of y equals the square root of x squared minus nine? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. x squared minus nine has zeros at negative three and three, and the parabola opens up, so it is not negative outside the zeros. Choice A is the interval between the zeros, where the parabola is below the x-axis: the part that the square root removes.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Domain: where $f(x) \\ge 0$. Range: the square roots of the non-negative values of $f$.', 'A parabola that opens up and crosses the $x$-axis gives two branches.', '$\\sqrt{f(x)}$ removes the negative part of a graph; $|f(x)|$ reflects it.'] }],
      lines: [
        { say: 'Let’s sum up. The domain of y equals the square root of f of x is where f of x is not negative, and its range is the square roots of the values of f that are not negative.', show: 'sum.0' },
        { say: 'A parabola that opens up and crosses the x-axis gives two branches, one outside each zero.', show: 'sum.1' },
        { say: 'And the square root removes the negative part of a graph, while the absolute value reflects it. In part three, we take the square root of a parabola that opens down, and learn to sketch quickly. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
