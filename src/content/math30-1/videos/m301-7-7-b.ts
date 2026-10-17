import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-2, 5], y: [-5, 30], yStep: 5, every: 2, width: 9, height: 9 });

/** The name of the line y = 20, above it at the right edge of the graph. */
const name: Part = { points: { ln: g.map(4.95, 20) }, items: [{ kind: 'label', id: 'line-name', at: 'ln', tex: 'y = 20', tone: 'opp', place: 'above left' }] };

const video: Explainer = {
  id: 'm301-7-7-b',
  lessonId: 'm301-7-7',
  title: 'Logarithmic and Exponential Equations, Part 2: Exponential Equations with Logarithms',
  thumbnailTitle: 'Taking the Logarithm of Both Sides',
  thumbnail: 'gr',
  summary: 'Solving exponential equations with no common base by taking the logarithm of both sides and using the power law: 3ˣ = 20 (x ≈ 2.73, shown on a graph) and 2^(x + 1) = 5ˣ (x ≈ 0.76); an equation quadratic in 2ˣ; and why the whole exponent comes down and the power must be isolated first. Part 3 applies these to growth, decay and logarithmic scales.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.7 · Part 2', title: 'Exponential Equations with Logarithms', subtitle: 'Take the logarithm of both sides' }],
      lines: [
        { say: 'Three to the power x equals 20. Twenty is not a power of three, so there is no common base. In lesson 7.3, you could not solve this one exactly.', show: 'title' },
        { say: 'In this video, you will solve it with logarithms, then handle two different bases, and an equation that hides a quadratic.' },
      ],
    },
    {
      chapter: 'One power',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3^{x} = 20', '\\log 3^{x} = \\log 20', 'x\\log 3 = \\log 20', 'x = \\dfrac{\\log 20}{\\log 3} \\approx \\dfrac{1.3010}{0.4771} \\approx 2.73'] },
      ],
      lines: [
        { say: 'Solve three to the power x equals 20, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'If two numbers are equal, their logarithms are equal. So take the common logarithm of both sides: log of three to the power x equals log 20.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the power law brings the exponent down: x times log three equals log 20. The unknown is no longer stuck in an exponent.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by log three: x equals log 20 over log three, about 1.3010 over 0.4771. That is about 2.73.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'On the graph',
      layout: 'split',
      leftWidth: 580,
      left: [
        figure('gr', [
          g,
          plot(g, { id: 'curve', f: (x) => 3 ** x, samples: 200 }),
          polyline(g, { id: 'line', points: [[-2, 20], [5, 20]], tone: 'opp' }),
          name,
          dots(g, [{ id: 'S', x: Math.log(20) / Math.log(3), y: 20, tex: '(2.73, 20)', tone: 'good', place: 'below right' }]),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['$3^{2} = 9 < 20 < 27 = 3^{3}$', 'So $2 < x < 3$ ✓'] }],
      lines: [
        { say: 'On a graph, the solution is the x-coordinate where y equals three to the power x meets the line y equals 20.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.line', 'gr.line-name'] },
        { say: 'They meet at about 2.73, 20.', show: 'gr.S', focus: 'gr.S' },
        { say: 'That makes sense. Three squared is nine and three cubed is 27, and 20 is between them, so x must be between two and three.', show: 'b', focus: 'b' },
      ],
    },
    {
      chapter: 'Different bases',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2^{x + 1} = 5^{x}', '(x + 1)\\log 2 = x\\log 5', 'x\\log 2 + \\log 2 = x\\log 5', '\\log 2 = x\\log 5 - x\\log 2 = x(\\log 5 - \\log 2)', 'x = \\dfrac{\\log 2}{\\log 5 - \\log 2} \\approx \\dfrac{0.3010}{0.3979} \\approx 0.76'] },
      ],
      lines: [
        { say: 'Solve two to the power x plus one equals five to the power x, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the logarithm of both sides, and bring each exponent down. On the left, the whole exponent, x plus one, comes down in brackets.', show: 'm.1', focus: 'm.1' },
        { say: 'Expand the brackets: x log two plus log two equals x log five.', show: 'm.2', focus: 'm.2' },
        { say: 'Collect the x terms on one side, and factor out x: log two equals x times log five minus log two.', show: 'm.3', focus: 'm.3' },
        { say: 'Divide: x equals log two over log five minus log two, about 0.3010 over 0.3979. That is about 0.76.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Quadratic form',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4^{x} - 6(2^{x}) + 8 = 0', '4^{x} = \\left(2^{x}\\right)^{2}.\\ \\text{Let } A = 2^{x}:\\quad A^{2} - 6A + 8 = 0', '(A - 2)(A - 4) = 0', '2^{x} = 2 \\to x = 1 \\qquad 2^{x} = 4 \\to x = 2'] },
      ],
      lines: [
        { say: 'Solve four to the power x, minus six times two to the power x, plus eight, equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Four to the power x is two to the power x, squared. So let A equal two to the power x. The equation becomes A squared minus six A plus eight equals zero: a quadratic.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor it: A minus two, times A minus four, equals zero. So A is two or four.', show: 'm.2', focus: 'm.2' },
        { say: 'Now put two to the power x back. Two to the power x equals two gives x equals one. Two to the power x equals four gives x equals two. If a root for A had been negative, you would reject it, because a power of two is never negative.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log 2^{x + 1} = (x + 1)\\log 2', '5(2)^{x} = 35 \\;\\to\\; 2^{x} = 7 \\;\\to\\; x = \\dfrac{\\log 7}{\\log 2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Bring down the whole exponent', md: 'Without brackets, $x + 1\\log 2$ means something different. Isolate the power first, too.' },
      ],
      lines: [
        { say: 'Two slips to avoid. First, bring down the whole exponent. Log of two to the power x plus one is x plus one, in brackets, times log two. Without the brackets, only the one would be multiplied.', show: 'm.0', focus: 'm.0' },
        { say: 'Second, isolate the power before you take logarithms. In five times two to the power x equals 35, divide by five first: two to the power x equals seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Five times two to the power x is not ten to the power x, so never multiply the five into the base.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $5(2)^{x} = 35$. Round to the nearest hundredth.',
          choices: ['$x \\approx 1.54$', '$x \\approx 2.81$', '$x = 3.5$', '$x \\approx 0.36$'],
          answer: 1,
          working: '$2^{x} = 7$, so $x\\log 2 = \\log 7$ and $x = \\dfrac{\\log 7}{\\log 2} \\approx \\dfrac{0.8451}{0.3010} \\approx 2.81$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five times two to the power x equals 35, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Divide by five: two to the power x equals seven. Then x equals log seven over log two, about 2.81. Choice A treats five times two to the power x as ten to the power x.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Isolate the power, take the logarithm of both sides, and use the power law.', 'Bring down the whole exponent, in brackets.', 'An equation such as $4^{x} - 6(2^{x}) + 8 = 0$ is quadratic in $2^{x}$; a power is never negative.'] }],
      lines: [
        { say: 'Let’s sum up. When there is no common base, isolate the power, take the logarithm of both sides, and use the power law.', show: 'sum.0' },
        { say: 'Bring down the whole exponent, in brackets.', show: 'sum.1' },
        { say: 'And watch for equations that are quadratic in a power, remembering that a power is never negative. In part three, we put all of this to work on growth, decay and logarithmic scales. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
