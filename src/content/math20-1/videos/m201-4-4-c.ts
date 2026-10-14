import type { Explainer } from '@/video/script.ts';
import { dots, plane, plot } from '@/video/graph.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A right triangle with legs x and x + 7 and hypotenuse 13, drawn at its true 5-12-13 shape. */
const tri: Part = {
  points: { C: [0, 0], A: [0, 5], B: [12, 0] },
  items: [
    { kind: 'region', id: 'fill', points: ['C', 'A', 'B'], tone: 'adj', shade: 0.12 },
    { kind: 'line', id: 'ca', from: 'C', to: 'A', tone: 'opp', weight: 3, label: 'x', labelSide: 'left' },
    { kind: 'line', id: 'cb', from: 'C', to: 'B', tone: 'adj', weight: 3, label: 'x + 7', labelSide: 'right' },
    { kind: 'line', id: 'ab', from: 'A', to: 'B', tone: 'hyp', weight: 3, label: '13', labelSide: 'left' },
    { kind: 'right', id: 'rt', at: 'C', from: 'A', to: 'B' },
  ],
};

/** A 30 by 20 photograph in a frame, drawn wider than to scale so its width x can be labelled. */
const frame: Part = {
  points: {
    O1: [0, 0], O2: [40, 0], O3: [40, 30], O4: [0, 30],
    I1: [5, 5], I2: [35, 5], I3: [35, 25], I4: [5, 25],
    top: [20, 25], left: [5, 15], band: [20, 27.5], side: [37.5, 15], bottom: [20, 0], outer: [0, 15],
  },
  items: [
    { kind: 'region', id: 'wood', points: ['O1', 'O2', 'O3', 'O4'], tone: 'opp', shade: 0.25 },
    { kind: 'region', id: 'photo', points: ['I1', 'I2', 'I3', 'I4'], tone: 'adj', shade: 0.3 },
    { kind: 'curve', id: 'photo-edge', points: ['I1', 'I2', 'I3', 'I4'], closed: true, tone: 'adj' },
    { kind: 'curve', id: 'outer-edge', points: ['O1', 'O2', 'O3', 'O4'], closed: true, tone: 'opp' },
    { kind: 'label', id: 'w30', at: 'top', tex: '30', place: 'below' },
    { kind: 'label', id: 'h20', at: 'left', tex: '20', place: 'right' },
    { kind: 'label', id: 'x1', at: 'band', tex: 'x', tone: 'opp', place: 'center' },
    { kind: 'label', id: 'x2', at: 'side', tex: 'x', tone: 'opp', place: 'center' },
    { kind: 'label', id: 'ow', at: 'bottom', tex: '30 + 2x', tone: 'opp', place: 'below' },
    { kind: 'label', id: 'oh', at: 'outer', tex: '20 + 2x', tone: 'opp', place: 'left' },
  ],
};

const g = plane({ x: [0, 4], y: [0, 15], yStep: 5, width: 6, height: 5, titles: { x: 't\\text{ (s)}', y: 'h\\text{ (m)}' } });
const land = (15 + Math.sqrt(264.2)) / 9.8;

const video: Explainer = {
  id: 'm201-4-4-c',
  lessonId: 'm201-4-4',
  title: 'The Discriminant and Applications, Part 3: Triangles, Projectiles and Frames',
  thumbnailTitle: 'Quadratic Problems',
  thumbnail: 'ball',
  summary: 'Three problems solved with quadratic equations: the legs of a right triangle with hypotenuse 13 cm, when a ball thrown from 2 m lands, using the quadratic formula, and the width of a frame around a 20 cm by 30 cm photograph, rejecting the roots that make no sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.4 · Part 3', title: 'Quadratic Problems', subtitle: 'Triangles, projectiles and frames' }],
      lines: [
        { say: 'Quadratic equations turn up wherever lengths are squared or multiplied: in right triangles, in the flight of a ball, and around a picture frame.', show: 'title' },
        { say: 'In this video, you will solve three problems, and decide which roots make sense.' },
      ],
    },
    {
      chapter: 'A right triangle',
      layout: 'split',
      leftWidth: 460,
      left: [figure('tri', [tri])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + (x + 7)^2 = 13^2', '2x^2 + 14x - 120 = 0', '(x - 5)(x + 12) = 0', 'x = 5 \\quad (\\text{reject } {-12})'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping the impossible root', md: 'Both roots solve the equation, but only one fits. Can a length or a time be negative?' },
      ],
      lines: [
        { say: 'One leg of a right triangle is seven centimetres longer than the other, and the hypotenuse is thirteen centimetres. Let the shorter leg be x, so the longer leg is x plus seven.', show: ['tri.fill', 'tri.ca', 'tri.cb', 'tri.ab', 'tri.rt'] },
        { say: 'By the Pythagorean theorem, x squared, plus x plus seven, squared, equals thirteen squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand and collect: two x squared, plus fourteen x, minus 120, equals zero. Divide by two and factor: x minus five, times x plus twelve.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Both roots solve the equation, but a length cannot be negative, so reject negative twelve. The legs are five centimetres and twelve centimetres.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A projectile',
      layout: 'split',
      leftWidth: 440,
      left: [
        figure('ball', [
          g,
          plot(g, { id: 'path', f: (t) => -4.9 * t * t + 15 * t + 2, from: 0, to: land, tone: 'opp' }),
          dots(g, [
            { id: 'S', x: 0, y: 2, tex: '2', tone: 'adj', place: 'left' },
            { id: 'G', x: land, y: 0, tex: '3.19', tone: 'good', place: 'above right' },
          ]),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-4.9t^2 + 15t + 2 = 0', 't = \\dfrac{-15 \\pm \\sqrt{15^2 - 4(-4.9)(2)}}{2(-4.9)}', 't = \\dfrac{-15 \\pm \\sqrt{264.2}}{-9.8}', 't \\approx 3.19 \\quad (\\text{reject } {-0.13})'] }],
      lines: [
        { say: 'The height of an object thrown upward is often modelled by negative 4.9 t squared, plus its starting speed times t, plus its starting height. The negative 4.9 comes from gravity pulling it down.', show: ['ball.grid', 'ball.axes'] },
        { say: 'In this example, a ball is thrown upward from two metres, and its height is h equals negative 4.9 t squared, plus fifteen t, plus two. When does it hit the ground? Set h to zero.', show: ['ball.path', 'ball.S', 'm.0'], focus: 'm.0' },
        { say: 'This does not factor, so use the quadratic formula. Under the root is 225, minus four times negative 4.9 times two, which is 264.2.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'So t is about 3.19, or about negative 0.13. Time after the throw cannot be negative, so the ball lands after about 3.19 seconds.', show: ['m.3', 'ball.G'], focus: ['m.3', 'ball.G'] },
      ],
    },
    {
      chapter: 'A frame',
      layout: 'split',
      leftWidth: 480,
      left: [figure('fr', [frame])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(20 + 2x)(30 + 2x) = 936', '4x^2 + 100x + 600 = 936', 'x^2 + 25x - 84 = 0', '(x - 3)(x + 28) = 0:\\quad x = 3'] }],
      lines: [
        { say: 'A twenty by thirty centimetre photograph has a frame of uniform width. Together, they cover 936 square centimetres. How wide is the frame?', show: ['fr.wood', 'fr.photo', 'fr.photo-edge', 'fr.outer-edge', 'fr.w30', 'fr.h20'] },
        { say: 'Let the frame be x centimetres wide. It adds x to each side, so the outer dimensions are twenty plus two x, and thirty plus two x. Their product is 936.', show: ['fr.x1', 'fr.x2', 'fr.ow', 'fr.oh', 'm.0'], focus: ['fr.ow', 'fr.oh', 'm.0'] },
        { say: 'Expand: four x squared, plus 100 x, plus 600, equals 936. Subtract 936, and divide by four: x squared, plus twenty-five x, minus eighty-four, equals zero.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'That factors as x minus three, times x plus twenty-eight. Reject negative twenty-eight: the frame is three centimetres wide.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangle is $2$ m longer than it is wide, and its area is $48\\text{ m}^2$. How wide is it?',
          choices: ['$6$ m', '$8$ m', '$-8$ m', '$24$ m'],
          answer: 0,
          working: '$w(w + 2) = 48$, so $w^2 + 2w - 48 = (w - 6)(w + 8) = 0$. Reject $-8$: $w = 6$.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangle is two metres longer than it is wide, and its area is forty-eight square metres. How wide is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. w times w plus two is forty-eight, so w squared, plus two w, minus forty-eight, factors as w minus six, times w plus eight. Reject negative eight: the width is six metres. B gives the length.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write the equation from a formula: Pythagoras, area or a height model.', 'Factor if you can; otherwise use the quadratic formula.', 'Reject roots that make no sense, and answer with units.'] }],
      lines: [
        { say: 'Let’s sum up. Write the equation from a formula that fits: the Pythagorean theorem, an area, or a height model.', show: 'sum.0' },
        { say: 'Factor if you can, and otherwise use the quadratic formula.', show: 'sum.1' },
        { say: 'And reject roots that make no sense, then answer with units. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
