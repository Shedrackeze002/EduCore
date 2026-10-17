import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const root = (x: number) => Math.sqrt(Math.max(0, x));
const g1 = plane({ x: [-5, 6], y: [-1, 4], every: 2 });
const g2 = plane({ x: [-5, 4], y: [-2, 5], every: 2 });

const video: Explainer = {
  id: 'm301-2-1-d',
  lessonId: 'm301-2-1',
  title: 'Radical Functions and Transformations, Part 4: Equations from Graphs',
  thumbnailTitle: 'Equations from Graphs',
  thumbnail: 'ex',
  summary: 'Writing the equation of a radical function from its graph: read the endpoint (h, k), choose b = 1 or b = −1 from the direction, substitute a point to find a, and check with another point. Also why √(4x) and 2√x give the same graph.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 2.1 · Part 4', title: 'Equations from Graphs', subtitle: 'Endpoint, direction, one more point' }],
      lines: [
        { say: 'Given the graph of a radical function, can you find its equation? Three pieces of information are enough.', show: 'title' },
        { say: 'In this video, you will write an equation from a graph, check it, and see why one graph can have more than one correct equation.' },
      ],
    },
    {
      chapter: 'The method',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['y = a\\sqrt{b(x - h)} + k'] },
        { kind: 'bullets', id: 'b', items: ['Read the endpoint $(h, k)$.', 'From the direction, choose $b = 1$ (opens right) or $b = -1$ (opens left).', 'Substitute one more point to find $a$.', 'Check with another point.'] },
      ],
      lines: [
        { say: 'Start from the general form, y equals "a" times the square root of b times x minus h, plus k.', show: 'm.0' },
        { say: 'First, read the endpoint from the graph. That gives h and k.', show: 'b.0' },
        { say: 'Second, look at the direction. If the graph opens to the right, use b equals one. If it opens to the left, use b equals negative one.', show: 'b.1' },
        { say: 'Third, substitute the coordinates of one more point on the graph, and solve for "a".', show: 'b.2' },
        { say: 'Finally, check your equation with another point.', show: 'b.3' },
      ],
    },
    {
      chapter: 'A graph that opens right',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('ex', [
          g1,
          plot(g1, { id: 'curve', f: (x) => -root(x + 4) + 3, from: -4, to: 6, samples: 300 }),
          dots(g1, [
            { id: 'E', x: -4, y: 3, tex: '(-4, 3)', tone: 'opp', place: 'above' },
            { id: 'P', x: -3, y: 2, tex: '(-3, 2)', tone: 'adj', place: 'above right' },
            { id: 'Q', x: 5, y: 0, tex: '(5, 0)', tone: 'good', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a\\sqrt{x + 4} + 3', '2 = a\\sqrt{-3 + 4} + 3', '2 = a + 3 \\;\\Rightarrow\\; a = -1', 'y = -\\sqrt{x + 4} + 3', '(5, 0):\\ -\\sqrt{9} + 3 = 0 \\;\\checkmark'] }],
      lines: [
        { say: 'Write an equation of the radical function shown.', show: ['ex.grid', 'ex.axes', 'ex.curve'] },
        { say: 'The graph starts at the endpoint, negative four, three, so h is negative four and k is three.', show: 'ex.E', focus: 'ex.E' },
        { say: 'It opens to the right, so b is one. So far, y equals "a" times the square root of x plus four, plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'To find "a", substitute another point on the graph: negative three, two. Two equals "a" times the square root of negative three plus four, plus three.', show: ['ex.P', 'm.1'], focus: ['ex.P', 'm.1'] },
        { say: 'The square root of one is one, so two equals "a" plus three, and "a" is negative one. That makes sense: the graph falls from its endpoint.', show: 'm.2', focus: 'm.2' },
        { say: 'The equation is y equals negative the square root of x plus four, plus three.', show: 'm.3', focus: 'm.3' },
        { say: 'Check with a third point, five, zero. Negative the square root of nine, plus three, is zero. It works.', show: ['ex.Q', 'm.4'], focus: ['ex.Q', 'm.4'] },
      ],
    },
    {
      chapter: 'A graph that opens left',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('left', [
          g2,
          plot(g2, { id: 'curve', f: (x) => 2 * root(-(x - 2)) - 1, from: -5, to: 2, samples: 300 }),
          dots(g2, [
            { id: 'E', x: 2, y: -1, tex: '(2, -1)', tone: 'opp', place: 'below right' },
            { id: 'P', x: 1, y: 1, tex: '(1, 1)', tone: 'adj', place: 'right' },
            { id: 'Q', x: -2, y: 3, tex: '(-2, 3)', tone: 'good', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a\\sqrt{-(x - 2)} - 1', '1 = a\\sqrt{-(1 - 2)} - 1', '1 = a - 1 \\;\\Rightarrow\\; a = 2', 'y = 2\\sqrt{-(x - 2)} - 1', '(-2, 3):\\ 2\\sqrt{4} - 1 = 3 \\;\\checkmark'] }],
      lines: [
        { say: 'Here is a graph that opens to the left. Its endpoint is two, negative one, so h is two and k is negative one.', show: ['left.grid', 'left.axes', 'left.curve', 'left.E'], focus: 'left.E' },
        { say: 'It opens to the left, so b is negative one: y equals "a" times the square root of negative, x minus two, minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute the point at one, one. Inside the root, negative, one minus two, is one, and the square root of one is one.', show: ['left.P', 'm.1'], focus: ['left.P', 'm.1'] },
        { say: 'So one equals "a" minus one, and "a" is two.', show: 'm.2', focus: 'm.2' },
        { say: 'The equation is y equals two times the square root of negative, x minus two, minus one. Check the point at negative two, three: two times the square root of four, minus one, is three.', show: ['m.3', 'm.4', 'left.Q'], focus: ['m.3', 'm.4', 'left.Q'] },
      ],
    },
    {
      chapter: 'More than one equation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{4x} = \\sqrt{4}\\,\\sqrt{x} = 2\\sqrt{x},\\quad x \\ge 0'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two stretches, one graph', md: 'A horizontal stretch by a factor of $\\frac{1}{4}$ gives the same graph as a vertical stretch by a factor of $2$. This is why one radical graph can have more than one correct equation.' },
      ],
      lines: [
        { say: 'Can two different equations give exactly the same graph? For x at least zero, the square root of four x equals the square root of four, times the square root of x: two times the square root of x.', show: 'm.0', focus: 'm.0' },
        { say: 'So y equals the square root of four x, a horizontal stretch by a factor of one quarter, gives the same graph as y equals two times the square root of x, a vertical stretch by a factor of two.', show: 'tip' },
        { say: 'That is why one radical graph can have more than one correct equation. Choosing b equals one or negative one, as we did, gives the simplest one.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The graph of a radical function has its endpoint at $(1, -2)$, opens to the right, and passes through $(5, 4)$. Which is its equation?',
          choices: ['$y = 3\\sqrt{x - 1} - 2$', '$y = 3\\sqrt{x + 1} - 2$', '$y = 2\\sqrt{x - 1} - 2$', '$y = 3\\sqrt{x - 1} + 2$'],
          answer: 0,
          working: '$h = 1$, $k = -2$ and $b = 1$: $y = a\\sqrt{x - 1} - 2$. Substitute $(5, 4)$: $4 = a\\sqrt{4} - 2$, so $2a = 6$ and $a = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. The graph of a radical function has its endpoint at one, negative two, opens to the right, and passes through the point at five, four. Which is its equation? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. h is one and k is negative two, so y equals "a" times the square root of x minus one, minus two. Substitute five, four: four equals two "a" minus two, so "a" is three. B has the wrong sign for h: x plus one would put the endpoint at negative one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read the endpoint $(h, k)$ from the graph.', 'Use $b = 1$ if the graph opens right, $b = -1$ if it opens left.', 'Substitute a point to find $a$, and check with another.', 'One graph can have more than one correct equation.'] }],
      lines: [
        { say: 'Let’s sum up. To write an equation from a graph, read the endpoint to get h and k.', show: 'sum.0' },
        { say: 'Use b equals one if the graph opens to the right, and b equals negative one if it opens to the left.', show: 'sum.1' },
        { say: 'Substitute one more point to find "a", and check with another.', show: 'sum.2' },
        { say: 'And remember that one graph can have more than one correct equation. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
