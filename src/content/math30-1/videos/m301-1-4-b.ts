import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g = plane({ x: [-2, 7], y: [-2, 7], every: 0 });

/** The name of the line y = x, above it on the left, clear of the lines. */
const name: Part = { points: { yx: g.map(5.5, 5.5) }, items: [{ kind: 'label', id: 'yx-name', at: 'yx', tex: 'y = x', tone: 'muted', place: 'above left' }] };

const video: Explainer = {
  id: 'm301-1-4-b',
  lessonId: 'm301-1-4',
  title: 'Inverse of a Relation, Part 2: Finding an Inverse Algebraically',
  thumbnailTitle: 'Finding an Inverse',
  thumbnail: 'lin',
  summary: 'Finding an inverse by interchanging x and y and solving for y: f(x) = 3x − 4 gives f⁻¹(x) = (x + 4)/3, checked algebraically and on the graph; why f⁻¹(x) is not 1/f(x); and the inverse of f(x) = 2x³ + 5. Part 3 covers the horizontal line test and restricted domains.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 1.4 · Part 2', title: 'Finding an Inverse', subtitle: 'Interchange x and y, then solve' }],
      lines: [
        { say: 'You could find an inverse by swapping the coordinates of every point, one at a time. But a function has infinitely many points. An equation lets you swap them all at once.', show: 'title' },
        { say: 'In this video, you will find the inverse of a linear function and a cubic function, check each answer, and avoid a common mix-up with the notation.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'steps', tone: 'key', title: 'Finding an inverse', md: 'Write $y = f(x)$, interchange $x$ and $y$, then solve for $y$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 3x - 4:\\quad y = 3x - 4', '\\text{interchange: } x = 3y - 4', '3y = x + 4', 'f^{-1}(x) = \\dfrac{x + 4}{3}'] },
      ],
      lines: [
        { say: 'To find an inverse algebraically, write y equals f of x, interchange x and y, and then solve for y.', show: 'steps' },
        { say: 'Find the inverse of f of x equals three x minus four. Start by writing y equals three x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'Interchange x and y: x equals three y minus four. This one step swaps the coordinates of every point at once.', show: 'm.1', focus: 'm.1' },
        { say: 'Now solve for y. Add four to both sides: three y equals x plus four.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by three. So f inverse of x equals x plus four, all over three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Checking the inverse',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('lin', [
          g,
          polyline(g, { id: 'yx', points: [[-2, -2], [7, 7]], tone: 'muted', dashed: true }),
          name,
          plot(g, { id: 'f', f: (x) => 3 * x - 4, tone: 'muted' }),
          plot(g, { id: 'inv', f: (x) => (x + 4) / 3, tone: 'brand' }),
          dots(g, [
            { id: 'P', x: 3, y: 5, tex: '(3, 5)', tone: 'muted', place: 'left' },
            { id: 'Q', x: 5, y: 3, tex: '(5, 3)', tone: 'opp', place: 'below right' },
            { id: 'I', x: 2, y: 2, tex: '(2, 2)', tone: 'good', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['f\\left(\\dfrac{x + 4}{3}\\right) = 3 \\cdot \\dfrac{x + 4}{3} - 4', '= x + 4 - 4 = x', '(3, 5) \\to (5, 3)'] }],
      lines: [
        { say: 'Check by putting the inverse into f. Three times x plus four over three is x plus four, and taking away four leaves x.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So f undoes f inverse: you get back exactly the x you started with.' },
        { say: 'On the graph, the grey line is y equals three x minus four, and its inverse is in colour. They are mirror images in the dashed line y equals x.', show: ['lin.grid', 'lin.axes', 'lin.yx', 'lin.yx-name', 'lin.f', 'lin.inv'], focus: 'lin.inv' },
        { say: 'The point at three, five, on f becomes five, three, on the inverse. And two, two, which is on the line y equals x, is invariant: it is on both graphs.', show: ['lin.P', 'lin.Q', 'lin.I', 'm.2'], focus: ['lin.P', 'lin.Q', 'lin.I', 'm.2'] },
      ],
    },
    {
      chapter: 'Not a reciprocal',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The inverse is not a reciprocal', md: '$f^{-1}(x)$ means the inverse function, not $\\dfrac{1}{f(x)}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['f^{-1}(x) = \\dfrac{x + 4}{3}', '\\dfrac{1}{f(x)} = \\dfrac{1}{3x - 4}'] },
      ],
      lines: [
        { say: 'Be careful with the notation. f inverse of x means the inverse function. It does not mean one over f of x.', show: 'oops' },
        { say: 'For f of x equals three x minus four, the inverse is x plus four, all over three.', show: 'm.0', focus: 'm.0' },
        { say: 'But one over f of x is one over three x minus four: a completely different function. The negative one in f inverse is a label, not an exponent.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A cubic function',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['f(x) = 2x^3 + 5:\\quad x = 2y^3 + 5', 'y^3 = \\dfrac{x - 5}{2}', 'f^{-1}(x) = \\sqrt[3]{\\dfrac{x - 5}{2}}', 'f(1) = 7,\\quad \\sqrt[3]{\\tfrac{7 - 5}{2}} = \\sqrt[3]{1} = 1\\ \\checkmark'] },
      ],
      lines: [
        { say: 'The same steps work for other functions. Find the inverse of f of x equals two x cubed, plus five. Interchange x and y: x equals two y cubed, plus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract five from both sides, then divide by two: y cubed equals x minus five, over two.', show: 'm.1', focus: 'm.1' },
        { say: 'To undo a cube, take the cube root of both sides. So f inverse of x equals the cube root of x minus five, over two.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with a point. f of one is two plus five, which is seven. The inverse at seven is the cube root of seven minus five, over two: the cube root of one, which is one. The inverse takes seven back to one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the inverse of $f(x) = 5x + 2$.',
          choices: ['$f^{-1}(x) = \\dfrac{x - 2}{5}$', '$f^{-1}(x) = \\dfrac{x + 2}{5}$', '$f^{-1}(x) = \\dfrac{1}{5x + 2}$', '$f^{-1}(x) = 5x - 2$'],
          answer: 0,
          working: 'Interchange: $x = 5y + 2$. Then $5y = x - 2$, so $y = \\dfrac{x - 2}{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the inverse of f of x equals five x plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Interchange x and y: x equals five y plus two. Subtract two, then divide by five: y equals x minus two, over five. C is the reciprocal of f, not its inverse.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write $y = f(x)$, interchange $x$ and $y$, and solve for $y$.', 'Check: $f$ undoes $f^{-1}$, or test a point.', '$f^{-1}(x)$ is the inverse, not $\\dfrac{1}{f(x)}$.'] }],
      lines: [
        { say: 'Let’s sum up. To find an inverse, write y equals f of x, interchange x and y, and solve for y.', show: 'sum.0' },
        { say: 'Check that f undoes f inverse, or test a point.', show: 'sum.1' },
        { say: 'And f inverse of x is the inverse function, not one over f of x. In part three, we see when an inverse is a function, and restrict the domain of a quadratic so that it is. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
