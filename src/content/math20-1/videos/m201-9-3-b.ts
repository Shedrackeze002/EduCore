import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const g1 = plane({ x: [-4, 3], y: [-3, 6], every: 0 });
const f = (x: number) => x * x + 2 * x - 1;
const g2 = plane({ x: [-9, 9], y: [0, 7], every: 0, width: 9, height: 3.5 });
const arch = (x: number) => -0.1 * x * x + 6;

/** The points above the dashed parabola, inside the plane: the curve where it is below the top edge. */
const top = Math.sqrt(8);
const ax = Array.from({ length: 49 }, (_, i) => -1 - top + (2 * top * i) / 48);
const above: Part = {
  points: Object.fromEntries(ax.map((x, i) => [`a${i}`, g1.map(x, f(x))])),
  items: [{ kind: 'region', id: 'shade', points: ax.map((_, i) => `a${i}`), tone: 'opp', shade: 0.22 }],
};

/** The opening under the arch, and a truck 4 m wide and 3 m tall in the middle of the road. */
const span = Math.sqrt(60);
const bx = Array.from({ length: 49 }, (_, i) => -span + (2 * span * i) / 48);
const opening: Part = {
  points: {
    ...Object.fromEntries(bx.map((x, i) => [`b${i}`, g2.map(x, arch(x))])),
    t1: g2.map(-2, 0), t2: g2.map(2, 0), t3: g2.map(2, 3), t4: g2.map(-2, 3),
  },
  items: [
    { kind: 'region', id: 'shade', points: bx.map((_, i) => `b${i}`), tone: 'good', shade: 0.18 },
    { kind: 'region', id: 'truck', points: ['t1', 't2', 't3', 't4'], tone: 'opp', shade: 0.45 },
  ],
};

const video: Explainer = {
  id: 'm201-9-3-b',
  lessonId: 'm201-9-3',
  title: 'Quadratic Inequalities in Two Variables, Part 2: Reading Graphs and Models',
  thumbnailTitle: 'Reading Quadratic Inequalities',
  thumbnail: 'br',
  summary: 'Writing the inequality y > x² + 2x − 1 from a dashed parabola shaded above, and deciding whether a truck 4 m wide and 3 m tall fits under a bridge arch described by y ≤ −0.1x² + 6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 9.3 · Part 2', title: 'Reading and Modelling', subtitle: 'From a graph, and under an arch' }],
      lines: [
        { say: 'You can also work backwards, from a shaded graph to its inequality, and use a region to decide whether something fits.', show: 'title' },
        { say: 'In this video, you will write an inequality from a graph, and check whether a truck fits under a bridge arch.' },
      ],
    },
    {
      chapter: 'From graph to inequality',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('gr', [
          g1,
          above,
          plot(g1, { id: 'curve', f, tone: 'brand', dashed: true }),
          dots(g1, [
            { id: 'V', x: -1, y: -2, tex: '(-1, -2)', tone: 'adj', place: 'below' },
            { id: 'P', x: 0, y: -1, tex: '(0, -1)', tone: 'adj', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y = a(x + 1)^2 - 2', '(0, -1):\\quad {-1} = a(1)^2 - 2,\\ \\ a = 1', 'y = x^2 + 2x - 1', '\\text{dashed, above: } y > x^2 + 2x - 1'] }],
      lines: [
        { say: 'Work backwards: find the equation of the boundary, then use the line style to choose the sign, and the shading for its direction.' },
        { say: 'This graph shows a dashed parabola with vertex negative one, negative two, through zero, negative one, with the region above it shaded. In vertex form, y equals "a" times x plus one, squared, minus two.', show: ['gr.grid', 'gr.axes', 'gr.shade', 'gr.curve', 'gr.V', 'gr.P', 'm.0'], focus: ['gr.V', 'm.0'] },
        { say: 'Substitute zero, negative one: negative one equals "a" times one, minus two, so "a" is one.', show: 'm.1', focus: ['gr.P', 'm.1'] },
        { say: 'Expand: y equals x squared, plus two x, minus one.', show: 'm.2', focus: 'm.2' },
        { say: 'The boundary is dashed, so the sign is less than or greater than, and the shading is above, so it is greater than: y is greater than x squared, plus two x, minus one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Will the truck fit?',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('br', [
          g2,
          opening,
          plot(g2, { id: 'arch', f: arch, from: -span, to: span, tone: 'brand' }),
          dots(g2, [
            { id: 'c1', x: -2, y: 3, tex: '', tone: 'opp', group: 'corners' },
            { id: 'c2', x: 2, y: 3, tex: '', tone: 'opp', group: 'corners' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['y \\le -0.1x^2 + 6', '\\text{corners: } (-2, 3),\\ (2, 3)', 'x = 2:\\quad {-0.1}(4) + 6 = 5.6', '3 \\le 5.6 \\;\\checkmark'] }],
      lines: [
        { say: 'In this example, the opening under a bridge arch is the region y at most negative 0.1 x squared, plus six, in metres, with the road along the x-axis. A truck four metres wide and three metres tall drives along the centre of the road. Does it fit?', show: ['br.grid', 'br.axes', 'br.arch', 'br.shade', 'm.0'], focus: 'm.0' },
        { say: 'The truck is centred, so its top corners are at negative two, three, and two, three.', show: ['br.truck', 'br.corners', 'm.1'], focus: ['br.corners', 'm.1'] },
        { say: 'At x equals two, the arch is at negative 0.1 times four, plus six, which is 5.6 metres. It is the same at negative two.', show: 'm.2', focus: 'm.2' },
        { say: 'Three is at most 5.6, so both corners are inside the region, and the truck fits, with 2.6 metres to spare above its corners.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which inequality describes the region on and above the solid parabola $y = x^2 - 4$?',
          choices: ['$y \\ge x^2 - 4$', '$y > x^2 - 4$', '$y \\le x^2 - 4$', '$y < x^2 - 4$'],
          answer: 0,
          working: 'A solid boundary is included, so the sign is $\\ge$ or $\\le$; shading above means $y \\ge$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which inequality describes the region on and above the solid parabola y equals x squared minus four? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A solid boundary is included, so the sign is at least, or at most, and shading above means y is at least x squared minus four. B would need a dashed boundary.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the boundary’s equation from the graph.', 'Dashed: $<$ or $>$; solid: $\\le$ or $\\ge$. Shaded above: $y >$ or $y \\ge$.', 'In a model, test the critical points against the region.'] }],
      lines: [
        { say: 'Let’s sum up. To read an inequality from a graph, first find the equation of the boundary.', show: 'sum.0' },
        { say: 'Then the line style gives the sign, and the shading gives its direction.', show: 'sum.1' },
        { say: 'And in a model, test the critical points, like the corners of a truck, against the region. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
