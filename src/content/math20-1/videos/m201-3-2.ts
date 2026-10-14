import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g1 = plane({ x: [-7, 1], y: [-4, 6], every: 0 });
const g2 = plane({ x: [0, 40], y: [0, 12], xStep: 5, yStep: 2, every: 2, width: 8, height: 4 });

const video: Explainer = {
  id: 'm201-3-2',
  lessonId: 'm201-3-2',
  title: 'Writing Quadratic Functions in Vertex Form, Part 1: The Equation',
  thumbnailTitle: 'Writing Vertex Form',
  thumbnail: 'gr',
  summary: 'Writing y = a(x − p)² + q from the vertex and one more point, reading the vertex and a grid point from a graph and checking a with the step pattern, and modelling a parabolic arch 40 m wide and 10 m high. Part 2 counts and finds the intercepts.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 3.2 · Part 1', title: 'Writing Vertex Form', subtitle: 'A vertex and one more point' }],
      lines: [
        { say: 'An engineer designing an arch knows how high it must be, and how wide it is at the base. That is enough to write its equation, because a parabola is fixed by its vertex and one other point.', show: 'title' },
        { say: 'In this video, you will write a quadratic function in vertex form, from a vertex and a point, and from a graph.' },
      ],
    },
    {
      chapter: 'Vertex and a point',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Substitute the vertex for $p$ and $q$.', 'Substitute another point for $x$ and $y$.', 'Solve for $a$.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = a(x - 2)^2 - 3', '5 = a(4 - 2)^2 - 3 = 4a - 3', '4a = 8,\\quad a = 2:\\quad y = 2(x - 2)^2 - 3'] },
      ],
      lines: [
        { say: 'To write y equals "a" times x minus p, squared, plus q, use three steps. Substitute the vertex for p and q. Substitute the coordinates of another point for x and y. Then solve for "a".', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'A parabola has its vertex at two, negative three, and passes through four, five. Substitute the vertex: y equals "a" times x minus two, squared, minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute four, five: five equals "a" times four minus two, squared, minus three. That is five equals four "a" minus three.', show: 'm.1', focus: 'm.1' },
        { say: 'So four "a" is eight, and "a" is two. The equation is y equals two times x minus two, squared, minus three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'From a graph',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('gr', [
          g1,
          plot(g1, { id: 'curve', f: (x) => -0.5 * (x + 3) ** 2 + 4, tone: 'brand' }),
          polyline(g1, { id: 'step', points: [[-3, 4], [-5, 4], [-5, 2]], tone: 'opp', dashed: true, labels: ['2', '2'], sides: ['right', 'right'] }),
          dots(g1, [
            { id: 'V', x: -3, y: 4, tex: '(-3, 4)', tone: 'opp', place: 'above right' },
            { id: 'P', x: -5, y: 2, tex: '(-5, 2)', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a(x + 3)^2 + 4', '2 = a(-5 + 3)^2 + 4 = 4a + 4', 'a = -\\tfrac{1}{2}:\\ y = -\\tfrac{1}{2}(x + 3)^2 + 4'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Use the step pattern to check', md: 'From the vertex of $y = x^2$, $2$ left goes up $4$. Here $2$ left goes **down** $2$, so $4a = -2$.' },
      ],
      lines: [
        { say: 'From a graph, read the vertex, and one other point with whole-number coordinates. Here the vertex is negative three, four, so y equals "a" times x plus three, squared, plus four.', show: ['gr.grid', 'gr.axes', 'gr.curve', 'gr.V', 'm.0'], focus: ['gr.V', 'm.0'] },
        { say: 'The parabola passes through negative five, two. Substitute: two equals "a" times negative five plus three, squared, plus four: four "a" plus four.', show: ['gr.P', 'm.1'], focus: ['gr.P', 'm.1'] },
        { say: 'So four "a" is negative two, and "a" is negative one half.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with the step pattern. From the vertex of y equals x squared, moving two left goes up four. Here, moving two left goes down two, so four "a" is negative two.', show: ['gr.step', 'tip'], focus: 'gr.step' },
      ],
    },
    {
      chapter: 'A parabolic arch',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('arch', [
          g2,
          plot(g2, { id: 'curve', f: (x) => -(1 / 40) * (x - 20) ** 2 + 10, from: 0, to: 40, tone: 'brand' }),
          dots(g2, [
            { id: 'L', x: 0, y: 0, tex: '(0, 0)', tone: 'adj', place: 'above left' },
            { id: 'V', x: 20, y: 10, tex: '(20, 10)', tone: 'opp', place: 'above' },
            { id: 'R', x: 40, y: 0, tex: '(40, 0)', tone: 'adj', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a(x - 20)^2 + 10', '0 = a(0 - 20)^2 + 10,\\quad 400a = -10', 'a = -\\tfrac{1}{40}', '-\\tfrac{1}{40}(40 - 20)^2 + 10 = 0 \\;\\checkmark'] }],
      lines: [
        { say: 'An arch is forty metres wide at ground level, and ten metres high at its centre. Write its equation, with the origin at the left end of the arch.', show: ['arch.grid', 'arch.axes', 'arch.curve', 'arch.L'] },
        { say: 'Choose the coordinates so the vertex is easy to find. The top of the arch is halfway across, so the vertex is twenty, ten: y equals "a" times x minus twenty, squared, plus ten.', show: ['arch.V', 'm.0'], focus: ['arch.V', 'm.0'] },
        { say: 'The left end is the origin, zero, zero. Substitute: zero equals "a" times 400, plus ten, so 400 "a" is negative ten.', show: 'm.1', focus: ['arch.L', 'm.1'] },
        { say: 'So "a" is negative one fortieth. Check the right end, forty, zero: negative one fortieth of 400, plus ten, is zero.', show: ['m.2', 'm.3', 'arch.R'], focus: ['arch.R', 'm.3'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parabola has vertex $(1, -2)$ and passes through $(3, 6)$. What is $a$?',
          choices: ['$2$', '$4$', '$\\tfrac{1}{2}$', '$-2$'],
          answer: 0,
          working: '$6 = a(3 - 1)^2 - 2$, so $6 = 4a - 2$, $4a = 8$ and $a = 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A parabola has its vertex at one, negative two, and passes through three, six. What is "a"? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six equals "a" times three minus one, squared, minus two: four "a" minus two. So four "a" is eight, and "a" is two. B forgets to subtract the two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute the vertex, then another point, and solve for $a$.', 'From a graph: the vertex and a point on the grid.', 'In a model, choose coordinates that make the vertex easy.'] }],
      lines: [
        { say: 'Let’s sum up. To write vertex form, substitute the vertex, then another point, and solve for "a".', show: 'sum.0' },
        { say: 'From a graph, read the vertex and a point on the grid, and check "a" with the step pattern.', show: 'sum.1' },
        { say: 'And in a model, choose coordinates that make the vertex easy to find. In part two, we count and find the intercepts. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
