import type { DiagramTone, Explainer } from '@/video/script.ts';
import { dots, plane, polyline, type Plane } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A triangle on a plane: its sides (group `id`) and a shaded inside in the same group. */
function tri(g: Plane, id: string, corners: [P, P, P], tone: DiagramTone): Part {
  const sides = polyline(g, { id, points: [...corners, corners[0]], tone });
  sides.items.push({ kind: 'region', id: g.n(`${id}-fill`), points: [0, 1, 2].map((i) => g.n(`${id}-v${i}`)), tone, shade: 0.18, group: g.n(id) });
  return sides;
}

const slide = plane({ x: [0, 10], y: [0, 7] });
const flip = plane({ x: [0, 10], y: [0, 6] });
const axis = plane({ x: [-5, 5], y: [-4, 4], every: 2 });
const turn = plane({ x: [0, 10], y: [0, 8] });

const video: Explainer = {
  id: 'm104-8-3-b',
  lessonId: 'm104-8-3',
  title: 'Symmetry and Transformations, Part 2: Slides, Flips and Turns',
  thumbnailTitle: 'Slides, Flips and Turns',
  thumbnail: 'fl',
  summary: 'Translations on a grid (a game piece sliding from P(2, 3) to P′(6, 5)), reflections in a mirror line and in the x-axis, a half turn, and how tracing the corners tells a flip from a turn.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.3 · Part 2', title: 'Slides, Flips and Turns', subtitle: 'Moving shapes on a grid' }],
      lines: [
        { say: 'Game boards, floor plans and computer screens all move shapes around. Every move is a slide, a flip or a turn.', show: 'title' },
        { say: 'In this video, you will slide, flip and turn points and shapes on a grid.' },
      ],
    },
    {
      chapter: 'Slides',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('sl', [
          slide,
          polyline(slide, { id: 'path', points: [[2, 3], [6, 3], [6, 5]], tone: 'muted', dashed: true, labels: ['4 \\text{ right}', '2 \\text{ up}'], sides: ['right', 'right'] }),
          dots(slide, [
            { id: 'P', x: 2, y: 3, tex: 'P(2, 3)', tone: 'adj', place: 'above' },
            { id: 'Q', x: 6, y: 5, tex: "P'(6, 5)", tone: 'opp', place: 'above' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Translation', md: 'A slide: every point moves the same distance in the same direction. The new position is the **image**, $P\'$ ("P prime").' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x\\text{: } 2 + 4 = 6', 'y\\text{: } 3 + 2 = 5'] },
      ],
      lines: [
        { say: 'A translation is a slide. Every point moves the same distance in the same direction. The new position is called the image, and we name the image of P as P prime.', show: 'def' },
        { say: 'On a grid, a point is written as x, y. The first number tells how far across, and the second tells how far up. A game piece is at P, two, three.', show: ['sl.grid', 'sl.axes', 'sl.P'] },
        { say: 'It slides four units right and two units up. Right adds to x: two plus four is six.', show: ['sl.path-0', 'm.0'], focus: 'm.0' },
        { say: 'Up adds to y: three plus two is five. So the image is P prime at six, five.', show: ['sl.path-1', 'sl.Q', 'm.1'], focus: ['sl.Q', 'm.1'] },
        { say: 'Always write x, across, first, and y, up, second. Six, five and five, six are different points.' },
      ],
    },
    {
      chapter: 'Flips',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('fl', [
          flip,
          polyline(flip, { id: 'mirror', points: [[5, 0], [5, 6]], tone: 'good', dashed: true }),
          tri(flip, 'abc', [[1, 2], [4, 2], [1, 4]], 'adj'),
          tri(flip, 'img', [[9, 2], [6, 2], [9, 4]], 'opp'),
          dots(flip, [
            { id: 'A', x: 1, y: 2, tex: 'A', tone: 'adj', place: 'below left' },
            { id: 'A2', x: 9, y: 2, tex: "A'", tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Reflection', md: 'A flip over a mirror line. Each image point is the same distance from the line, on the other side.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['5 - 1 = 4 \\text{ units left}', '5 + 4 = 9', "A(1, 2) \\to A'(9, 2)"] },
      ],
      lines: [
        { say: 'A reflection is a flip over a mirror line. Each image point is the same distance from the line as the original point, but on the other side.', show: ['fl.grid', 'fl.axes', 'fl.mirror', 'def'] },
        { say: 'Reflect A at one, two in the dashed line where x is five. A is five minus one: four units left of the line.', show: ['fl.A', 'm.0'], focus: 'm.0' },
        { say: 'So its image is four units right of the line: five plus four is nine. The y stays two, so the image is A prime at nine, two.', show: ['fl.A2', 'm.1', 'm.2'], focus: ['fl.A2', 'm.2'] },
        { say: 'Do the same for every corner, and the whole triangle flips over the line, like a reflection in a mirror.', show: ['fl.abc', 'fl.img'], focus: ['fl.abc', 'fl.img'] },
      ],
    },
    {
      chapter: 'Flips in an axis',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ax', [
          axis,
          dots(axis, [
            { id: 'P', x: 3, y: 2, tex: 'P(3, 2)', tone: 'adj', place: 'above right' },
            { id: 'X', x: 3, y: -2, tex: "(3, {-2})", tone: 'opp', place: 'below right' },
            { id: 'Y', x: -3, y: 2, tex: "({-3}, 2)", tone: 'theta', place: 'above' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x\\text{-axis: } (3, 2) \\to (3, {-2})', 'y\\text{-axis: } (3, 2) \\to ({-3}, 2)'] }],
      lines: [
        { say: 'When the mirror line is an axis, use the signs. Here is P at three, two.', show: ['ax.grid', 'ax.axes', 'ax.P'] },
        { say: 'A reflection in the x-axis keeps x, and changes the sign of y. So three, two becomes three, negative two: the same distance below the axis as P is above it.', show: ['ax.X', 'm.0'], focus: ['ax.X', 'm.0'] },
        { say: 'A reflection in the y-axis changes the sign of x instead. Three, two becomes negative three, two.', show: ['ax.Y', 'm.1'], focus: ['ax.Y', 'm.1'] },
      ],
    },
    {
      chapter: 'Turns',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('tu', [
          turn,
          tri(turn, 'abc', [[2, 5], [5, 5], [2, 7]], 'adj'),
          tri(turn, 'img', [[8, 3], [5, 3], [8, 1]], 'opp'),
          dots(turn, [
            { id: 'O', x: 5, y: 4, tex: '', tone: 'good' },
            { id: 'A', x: 2, y: 5, tex: 'A', tone: 'adj', place: 'below left' },
            { id: 'B', x: 5, y: 5, tex: 'B', tone: 'adj', place: 'above right' },
            { id: 'C', x: 2, y: 7, tex: 'C', tone: 'adj', place: 'above left' },
            { id: 'A2', x: 8, y: 3, tex: "A'", tone: 'opp', place: 'above right' },
            { id: 'B2', x: 5, y: 3, tex: "B'", tone: 'opp', place: 'below left' },
            { id: 'C2', x: 8, y: 1, tex: "C'", tone: 'opp', place: 'below right' },
          ]),
        ]),
      ],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Flip or turn?', md: "Trace $A \\to B \\to C$, then $A' \\to B' \\to C'$. Opposite ways round: it was **flipped**. The same way round: it was slid or turned." }],
      lines: [
        { say: 'A rotation is a turn around a point. In a rotation, the shape turns, but it is not flipped.', show: ['tu.grid', 'tu.axes', 'tu.abc', 'tu.A', 'tu.B', 'tu.C'] },
        { say: 'This triangle made a half turn around the green dot. Each corner turned half way around, to the other side of the dot.', show: ['tu.O', 'tu.img', 'tu.A2', 'tu.B2', 'tu.C2'], focus: ['tu.O', 'tu.img'] },
        { say: 'How can you tell a flip from a turn? Trace A, B, C, and then A prime, B prime, C prime.', show: 'tip' },
        { say: 'If one goes clockwise and the other goes counterclockwise, the shape was flipped. Here, both go the same way round, so it was turned.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A game piece at $(3, 1)$ slides $2$ units left and $4$ units up. Where is its image?',
          choices: ['$(1, 5)$', '$(5, 5)$', '$(5, 1)$', '$(3, 5)$'],
          answer: 0,
          working: 'Left subtracts from $x$: $3 - 2 = 1$. Up adds to $y$: $1 + 4 = 5$. The image is $(1, 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. A game piece at three, one slides two units left and four units up. Where is its image? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Left subtracts from x: three minus two is one. Up adds to y: one plus four is five. B moves right instead of left, and C writes the numbers in the wrong order.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A translation slides a shape: right and left change $x$, up and down change $y$.', 'A reflection flips a shape over a mirror line, to the same distance on the other side.', 'A rotation turns a shape around a point.'] }],
      lines: [
        { say: 'Let’s sum up. A translation slides a shape: right and left change x, and up and down change y.', show: 'sum.0' },
        { say: 'A reflection flips a shape over a mirror line. Each image point is the same distance from the line, on the other side.', show: 'sum.1' },
        { say: 'And a rotation turns a shape around a point. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
