import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const p1 = plane({ name: 'p1', x: [-3, 4], y: [-5, 8], every: 0, at: [0, 0] });
const p2 = plane({ name: 'p2', x: [-2, 5], y: [-5, 8], every: 0, at: [10, 0] });
const p3 = plane({ name: 'p3', x: [-4, 3], y: [-5, 8], every: 0, at: [22, 0] });

const video: Explainer = {
  id: 'm202-7-2-c',
  lessonId: 'm202-7-2',
  title: 'The Quadratic Formula, Part 3: How Many Roots, and Choosing a Method',
  thumbnailTitle: 'How Many Roots?',
  thumbnail: 'nr',
  summary: 'How the sign of b² − 4ac tells whether there are two, one or no real roots, why x² + 2x + 5 = 0 has no real roots, rearranging x(x − 8) = 5 before using the formula, and choosing between graphing, factoring and the formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.2 · Part 3', title: 'How Many Roots?', subtitle: 'The number under the square root' }],
      lines: [
        { say: 'The number under the square root in the quadratic formula tells you something before you finish: how many real roots there are.', show: 'title' },
        { say: 'In this video, you will count roots, meet an equation with none, and choose the best method for a problem.' },
      ],
    },
    {
      chapter: 'Two, one or none',
      layout: 'center',
      main: [
        figure('nr', [
          p1, plot(p1, { id: 'c', f: (x) => x * x - 2 * x - 3, tone: 'brand' }), dots(p1, [{ id: 'a', x: -1, y: 0, tex: '', tone: 'good' }, { id: 'b', x: 3, y: 0, tex: '', tone: 'good' }]),
          p2, plot(p2, { id: 'c', f: (x) => x * x - 2 * x + 1, tone: 'brand' }), dots(p2, [{ id: 'a', x: 1, y: 0, tex: '', tone: 'good' }]),
          p3, plot(p3, { id: 'c', f: (x) => x * x + 2 * x + 5, tone: 'brand' }),
        ], 300),
        { kind: 'table', id: 't', head: ['$b^2 - 4ac$', 'positive', 'zero', 'negative'], rows: [['Real roots', 'two', 'one', 'none']] },
      ],
      lines: [
        { say: 'If b squared minus four "a" c is positive, its square root can be added or subtracted, giving two different real roots. The graph crosses the x-axis twice.', show: ['nr.p1-grid', 'nr.p1-axes', 'nr.p1-c', 'nr.p1-a', 'nr.p1-b', 't'], focus: ['nr.p1-c'] },
        { say: 'If it is zero, plus zero and minus zero give the same number, so there is one real root. The graph touches the x-axis at its vertex.', show: ['nr.p2-grid', 'nr.p2-axes', 'nr.p2-c', 'nr.p2-a'], focus: 'nr.p2-c' },
        { say: 'And if it is negative, there is no real square root at all, so there are no real roots. The graph does not meet the x-axis.', show: ['nr.p3-grid', 'nr.p3-axes', 'nr.p3-c'], focus: 'nr.p3-c' },
      ],
    },
    {
      chapter: 'No real roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 + 2x + 5 = 0', 'b^2 - 4ac = 4 - 20 = -16', '\\text{no real square root of } {-16}:\\ \\text{no real roots}'] }],
      lines: [
        { say: 'Solve x squared, plus two x, plus five, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'b squared minus four "a" c is four minus twenty, which is negative sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'No real number is the square root of negative sixteen, so there are no real roots. That is the third graph: its vertex is negative one, four, and it stays above the x-axis.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Choosing a method',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x(x - 8) = 5 \\;\\Rightarrow\\; x^2 - 8x - 5 = 0', 'b^2 - 4ac = 64 + 20 = 84', 'x = \\dfrac{8 \\pm \\sqrt{84}}{2} \\approx 8.58 \\text{ or } {-0.58}'] },
        { kind: 'bullets', id: 'b', items: ['**Graphing**: shows how many roots, and estimates them.', '**Factoring**: fastest when the equation factors easily.', '**The formula**: always works, for exact or decimal roots.'] },
      ],
      lines: [
        { say: 'Solve x times x minus eight, equals five. First expand and rearrange: x squared, minus eight x, minus five, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'b squared minus four "a" c is sixty-four plus twenty, which is eighty-four. That is not a perfect square, so this will not factor. Use the formula: about 8.58, or negative 0.58.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Which method should you choose? Graphing shows how many roots there are, and estimates them. Factoring is fastest when the equation factors easily. And the formula always works.', show: ['b.0', 'b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many real roots does $4x^2 - 12x + 9 = 0$ have?',
          choices: ['One', 'Two', 'None', 'It cannot be told without graphing.'],
          answer: 0,
          working: '$b^2 - 4ac = 144 - 4(4)(9) = 144 - 144 = 0$, so there is one real root. Indeed $4x^2 - 12x + 9 = (2x - 3)^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many real roots does four x squared, minus twelve x, plus nine, equals zero, have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b squared minus four "a" c is 144 minus 144, which is zero, so there is exactly one real root. In fact, the expression is two x minus three, all squared.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$b^2 - 4ac > 0$: two real roots; $= 0$: one; $< 0$: none.', 'Rearrange to standard form before using the formula.', 'Graph to estimate, factor when easy, use the formula always.'] }],
      lines: [
        { say: 'Let’s sum up. If b squared minus four "a" c is positive, there are two real roots; if it is zero, one; and if it is negative, none.', show: 'sum.0' },
        { say: 'Rearrange to standard form before you use the formula.', show: 'sum.1' },
        { say: 'And choose your method: graph to estimate, factor when it is easy, and use the formula when nothing else works. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
