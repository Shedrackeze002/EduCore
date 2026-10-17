import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const g = plane({ x: [-5, 6], y: [-4, 4], every: 2 });
const xs = (3 + Math.sqrt(21)) / 2;
const fall = plane({ x: [0, 50], y: [0, 3], xStep: 10, yStep: 1, width: 8, height: 4.8, titles: { x: 'd\\text{ (m)}', y: 't\\text{ (s)}' } });

const video: Explainer = {
  id: 'm301-2-3-c',
  lessonId: 'm301-2-3',
  title: 'Solving Radical Equations Graphically, Part 3: Approximate Solutions and Applications',
  thumbnailTitle: 'Approximate Solutions',
  thumbnail: 'g',
  summary: 'Using a graph to predict how many solutions √(x + 4) = x − 1 has, solving it to the nearest hundredth with the quadratic formula and rejecting the extraneous root, and finding the height of a bridge from a stone’s fall time with t = √(d/4.9).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.3 · Part 3', title: 'Approximate Solutions', subtitle: 'Count first, then calculate' }],
      lines: [
        { say: 'Not every radical equation has a whole-number answer. When the roots are irrational, the graph and the quadratic formula work as a team.', show: 'title' },
        { say: 'In this video, you will solve a radical equation to the nearest hundredth, and find the height of the bridge from the falling stone.' },
      ],
    },
    {
      chapter: 'Count the solutions first',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('g', [
          g,
          plot(g, { id: 'curve', f: (x) => root(x + 4), from: -4, to: 6, samples: 300 }),
          plot(g, { id: 'line', f: (x) => x - 1, tone: 'opp' }),
          dots(g, [{ id: 'S', x: xs, y: xs - 1, tex: 'x \\approx 3.8', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{x + 4} = x - 1', '\\text{One intersection, near } x = 3.8'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count first', md: 'Before you solve, count the intersection points on the graph. If the algebra gives more roots than the graph shows, the extra ones are extraneous.' },
      ],
      lines: [
        { say: 'Solve the square root of x plus four equals x minus one, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Graph both sides first: the curve y equals the square root of x plus four, and the line y equals x minus one.', show: ['g.grid', 'g.axes', 'g.curve', 'g.line'] },
        { say: 'They meet only once, near x equals 3.8. So expect exactly one solution, close to 3.8.', show: ['g.S', 'm.1'], focus: ['g.S', 'm.1'] },
        { say: 'This is a good habit. Count the intersection points before you solve. If the algebra gives more roots than the graph shows, the extra ones are extraneous.', show: 'tip' },
      ],
    },
    {
      chapter: 'The quadratic formula',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            'x + 4 = (x - 1)^2 = x^2 - 2x + 1',
            'x^2 - 3x - 3 = 0',
            'x = \\dfrac{3 \\pm \\sqrt{(-3)^2 - 4(1)(-3)}}{2(1)} = \\dfrac{3 \\pm \\sqrt{21}}{2}',
            'x \\approx 3.79 \\quad\\text{or}\\quad x \\approx -0.79',
            'x \\approx -0.79:\\quad x - 1 \\approx -1.79 < 0,\\ \\text{extraneous}',
          ],
        },
      ],
      lines: [
        { say: 'Now square both sides. The left side becomes x plus four. The right side is x minus one, squared: x squared minus two x plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Move everything to one side: x squared minus three x minus three equals zero. This does not factor, so use the quadratic formula.', show: 'm.1', focus: 'm.1' },
        { say: '"a" is one, b is negative three, and c is negative three. So x equals three, plus or minus the square root of nine plus twelve, all over two: three plus or minus root 21, over two.', show: 'm.2', focus: 'm.2' },
        { say: 'That gives x about 3.79, or x about negative 0.79.', show: 'm.3', focus: 'm.3' },
        { say: 'At negative 0.79, the right side, x minus one, is negative. A square root is never negative, so that root is extraneous, just as the graph predicted. The solution is x approximately equal to 3.79.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'The falling stone',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('fall', [
          fall,
          plot(fall, { id: 'curve', f: (d) => root(d / 4.9), from: 0, to: 50, samples: 300 }),
          plot(fall, { id: 'line', f: () => 2.5, tone: 'opp' }),
          dots(fall, [{ id: 'S', x: 30.625, y: 2.5, tex: '(30.6, 2.5)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{\\dfrac{d}{4.9}} = 2.5', '\\dfrac{d}{4.9} = 6.25', 'd = 6.25 \\times 4.9 = 30.625', 'd \\approx 30.6\\text{ m}'] }],
      lines: [
        { say: 'Back to the bridge. The model t equals the square root of d over 4.9 gives the time t, in seconds, for a stone to fall d metres. The stone fell for 2.5 seconds.', show: ['fall.grid', 'fall.axes', 'fall.curve'] },
        { say: 'So solve the square root of d over 4.9 equals 2.5. On the graph, the line t equals 2.5 meets the curve once, a little past d equals 30.', show: ['m.0', 'fall.line', 'fall.S'], focus: ['m.0', 'fall.S'] },
        { say: 'To solve it exactly, square both sides: d over 4.9 equals 2.5 squared, which is 6.25.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply both sides by 4.9: d equals 30.625.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: 30.625 over 4.9 is 6.25, and its square root is 2.5. So the bridge is about 30.6 metres high.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The time $t$, in seconds, for a stone to fall $d$ metres is modelled by $t = \\sqrt{\\dfrac{d}{4.9}}$. A stone falls for $2$ s. How far does it fall?',
          choices: ['$9.8$ m', '$19.6$ m', '$0.41$ m', '$96.04$ m'],
          answer: 1,
          working: 'Square both sides of $\\sqrt{\\dfrac{d}{4.9}} = 2$: $\\dfrac{d}{4.9} = 4$, so $d = 4 \\times 4.9 = 19.6$ m. Check: $\\sqrt{\\dfrac{19.6}{4.9}} = \\sqrt{4} = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. The time t, in seconds, for a stone to fall d metres is modelled by t equals the square root of d over 4.9. A stone falls for two seconds. How far does it fall? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Square both sides: d over 4.9 equals four, so d is four times 4.9, which is 19.6 metres. Choice A multiplies two by 4.9 without squaring the two first.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use the graph to predict how many solutions there are, and roughly where.', 'Use the quadratic formula for accurate values, and reject extraneous roots.', 'In a model, square both sides to undo the square root, then check.'] }],
      lines: [
        { say: 'Let’s sum up. Use the graph to predict how many solutions there are, and roughly where they are.', show: 'sum.0' },
        { say: 'Use the quadratic formula for accurate values, and reject any root the graph says is extraneous.', show: 'sum.1' },
        { say: 'And in a model, square both sides to undo the square root, then check your answer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
