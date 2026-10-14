import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

const mid = plane({ x: [-4, 7], y: [-3, 9], every: 2 });
const end = plane({ x: [-1, 11], y: [-1, 10], every: 2 });
const circ = plane({ x: [-3, 9], y: [-4, 8], every: 2 });

/** The circle with centre (3, 2) and radius 5. */
const ring: Part = (() => {
  const points: Part['points'] = {};
  const names = Array.from({ length: 72 }, (_, i) => {
    const a = (2 * Math.PI * i) / 72;
    points[`ring${i}`] = circ.map(3 + 5 * Math.cos(a), 2 + 5 * Math.sin(a));
    return `ring${i}`;
  });
  return { points, items: [{ kind: 'curve', id: 'circle', points: names, closed: true, tone: 'adj' }] };
})();

const video: Explainer = {
  id: 'm10c-6-5-b',
  lessonId: 'm10c-6-5',
  title: 'Distance and Midpoint, Part 2: Midpoints, Endpoints and Circles',
  thumbnailTitle: 'The Midpoint Formula',
  thumbnail: 'mid',
  summary: 'The midpoint formula as the average of the coordinates, finding the other endpoint from a midpoint, finding the centre and radius of a circle from a diameter, and not mixing up the distance and midpoint formulas.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 6.5 · Part 2', title: 'The Midpoint Formula', subtitle: 'Halfway in both directions' }],
      lines: [
        { say: 'Where is the point exactly halfway between two points on a grid?', show: 'title' },
        { say: 'In this video, you will find midpoints, use a midpoint to find a missing endpoint, and find the centre and radius of a circle.' },
      ],
    },
    {
      chapter: 'The midpoint formula',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('mid', [
          mid,
          polyline(mid, { id: 'seg', points: [[-3, 8], [6, -2]] }),
          dots(mid, [
            { id: 'A', x: -3, y: 8, tex: '(-3,\\,8)', place: 'left' },
            { id: 'B', x: 6, y: -2, tex: '(6,\\,{-2})', place: 'below left' },
            { id: 'M', x: 1.5, y: 3, tex: 'M', tone: 'opp', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['M = \\left(\\dfrac{x_1 + x_2}{2},\\ \\dfrac{y_1 + y_2}{2}\\right)', 'x\\text{: } \\dfrac{-3 + 6}{2} = \\dfrac32', 'y\\text{: } \\dfrac{8 + (-2)}{2} = 3', 'M(1.5,\\ 3)'] }],
      lines: [
        { say: 'The midpoint of a segment is halfway along it, so it is halfway in both directions. Its coordinates are the averages of the coordinates of the endpoints.', show: 'm.0', focus: 'm.0' },
        { say: 'Find the midpoint of the segment from negative three, eight, to six, negative two.', show: ['mid.grid', 'mid.axes', 'mid.seg', 'mid.A', 'mid.B'] },
        { say: 'Average the x coordinates: negative three plus six, over two, is three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'Average the y coordinates: eight plus negative two, over two, is three. So the midpoint is one and a half, three.', show: ['m.2', 'm.3', 'mid.M'], focus: ['m.3', 'mid.M'] },
      ],
    },
    {
      chapter: 'Finding an endpoint',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('end', [
          end,
          polyline(end, { id: 'seg', points: [[1, 9], [9, 3]] }),
          polyline(end, { id: 's1', points: [[1, 9], [5, 9], [5, 6]], tone: 'adj', labels: ['+4', '-3'], sides: ['left', 'right'], dashed: true }),
          polyline(end, { id: 's2', points: [[5, 6], [9, 6], [9, 3]], tone: 'adj', labels: ['+4', '-3'], sides: ['left', 'right'], dashed: true }),
          dots(end, [
            { id: 'A', x: 1, y: 9, tex: 'A', place: 'below left' },
            { id: 'M', x: 5, y: 6, tex: 'M', tone: 'opp', place: 'below left' },
            { id: 'B', x: 9, y: 3, tex: 'B', place: 'below left' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A(1,\\ 9), \\quad M(5,\\ 6)', 'A \\to M\\text{: } x + 4,\\ y - 3', 'B = (5 + 4,\\ 6 - 3) = (9,\\ 3)'] }],
      lines: [
        { say: 'If you know the midpoint and one endpoint, you can find the other endpoint. M, five, six, is the midpoint of A B, and A is one, nine. Find B.', show: ['m.0', 'end.grid', 'end.axes', 'end.A', 'end.M'] },
        { say: 'From A to M, x increases by four, and y decreases by three.', show: ['m.1', 'end.s1'], focus: ['m.1', 'end.s1'] },
        { say: 'M is halfway, so the trip from M to B is the same: add four to x, and subtract three from y.', show: 'end.s2', focus: 'end.s2' },
        { say: 'So B is five plus four, six minus three: the point at nine, three.', show: ['m.2', 'end.B', 'end.seg'], focus: ['m.2', 'end.B'] },
      ],
    },
    {
      chapter: 'The centre of a circle',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('circ', [
          circ,
          ring,
          polyline(circ, { id: 'diam', points: [[-1, 5], [7, -1]] }),
          polyline(circ, { id: 'r', points: [[3, 2], [7, -1]], tone: 'opp', labels: ['r'] }),
          dots(circ, [
            { id: 'E', x: -1, y: 5, tex: '(-1,\\,5)', place: 'above left' },
            { id: 'F', x: 7, y: -1, tex: '(7,\\,{-1})', place: 'below right' },
            { id: 'C', x: 3, y: 2, tex: 'C', tone: 'opp', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = \\left(\\dfrac{-1 + 7}{2},\\ \\dfrac{5 + (-1)}{2}\\right) = (3,\\ 2)', 'r = \\sqrt{(7 - 3)^2 + (-1 - 2)^2}', 'r = \\sqrt{16 + 9} = \\sqrt{25} = 5'] }],
      lines: [
        { say: 'A diameter of a circle has endpoints negative one, five, and seven, negative one. Find the centre and the radius.', show: ['circ.grid', 'circ.axes', 'circ.circle', 'circ.diam', 'circ.E', 'circ.F'] },
        { say: 'The centre is halfway along the diameter, so it is the midpoint: the point at three, two.', show: ['m.0', 'circ.C'], focus: ['m.0', 'circ.C'] },
        { say: 'The radius is the distance from the centre to an endpoint: the square root of four squared, plus negative three, squared.', show: ['m.1', 'circ.r'], focus: ['m.1', 'circ.r'] },
        { say: 'That is the square root of twenty-five, so the radius is five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Do not mix them up',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{distance: } d = \\sqrt{(\\bad{x_2 - x_1})^2 + (\\bad{y_2 - y_1})^2}', '\\text{midpoint: } M = \\left(\\dfrac{\\good{x_1 + x_2}}{2},\\ \\dfrac{\\good{y_1 + y_2}}{2}\\right)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Differences or sums?', md: 'The distance formula uses **differences**. The midpoint formula uses **sums** divided by $2$. Mixing them is the most common error.' },
      ],
      lines: [
        { say: 'The most common error is mixing up the two formulas. The distance formula uses differences, squared, under a square root.', show: 'm.0', focus: 'm.0' },
        { say: 'The midpoint formula uses sums, divided by two.', show: 'm.1', focus: 'm.1' },
        { say: 'Before you substitute, ask yourself: am I finding how far, or where halfway is?', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the midpoint of the segment from $(2, -5)$ to $(8, 1)$.',
          choices: ['$(5, -2)$', '$(3, 3)$', '$(10, -4)$', '$(6, 6)$'],
          answer: 0,
          working: '$M = \\left(\\dfrac{2 + 8}{2}, \\dfrac{-5 + 1}{2}\\right) = (5, -2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the midpoint of the segment from two, negative five, to eight, one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two plus eight, over two, is five, and negative five plus one, over two, is negative two. B halves the differences, C adds without dividing by two, and D is the differences.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Midpoint: average each coordinate.', 'To find an endpoint, repeat the move from the known endpoint to the midpoint.', 'The centre of a circle is the midpoint of a diameter.'] }],
      lines: [
        { say: "Let's sum up. To find a midpoint, average the x coordinates, and average the y coordinates.", show: 'sum.0' },
        { say: 'To find a missing endpoint, repeat the move from the known endpoint to the midpoint.', show: 'sum.1' },
        { say: 'And the centre of a circle is the midpoint of a diameter. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
