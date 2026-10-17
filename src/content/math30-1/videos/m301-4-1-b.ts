import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const rad = (deg: number) => (deg * Math.PI) / 180;
/** The point `k` units from the origin in the direction `deg`. */
const polar = (deg: number, k: number): P => [k * Math.cos(rad(deg)), k * Math.sin(rad(deg))];

/** The x and y axes, reaching 4.6 units each way. */
const axes: Part = {
  points: { xl: [-4.6, 0], xr: [4.6, 0], yd: [0, -4.6], yu: [0, 4.6] },
  items: [
    { kind: 'line', id: 'x-axis', from: 'xl', to: 'xr', tone: 'muted', weight: 2, arrow: true, group: 'axes' },
    { kind: 'line', id: 'y-axis', from: 'yd', to: 'yu', tone: 'muted', weight: 2, arrow: true, group: 'axes' },
    { kind: 'label', id: 'x-name', at: 'xr', tex: 'x', tone: 'muted', place: 'right', group: 'axes' },
    { kind: 'label', id: 'y-name', at: 'yu', tex: 'y', tone: 'muted', place: 'above', group: 'axes' },
  ],
};

/** The terminal arm at `deg`, 4 units long, with a dot at its end. */
function arm(deg: number): Part {
  return {
    points: { O: [0, 0], P: polar(deg, 4) },
    items: [
      { kind: 'line', id: 'arm', from: 'O', to: 'P', tone: 'brand', weight: 3.5 },
      { kind: 'label', id: 'P', at: 'P', tex: '', tone: 'brand', dot: true },
    ],
  };
}

/**
 * The turn from the positive x-axis through `deg` (clockwise when negative), as a curve whose
 * distance from the origin grows from `k0` to `k1` (a spiral when it passes a full turn), with an
 * arrowhead at its end and a label at `at`. Parts: the group `name`.
 */
function turn(name: string, deg: number, k0: number, k1: number, tone: DiagramTone, label: string, at: P): Part {
  const steps = Math.max(10, Math.ceil(Math.abs(deg) / 4));
  const points: Record<string, P> = {};
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    points[`${name}${i}`] = polar((deg * i) / steps, k0 + ((k1 - k0) * i) / steps);
    names.push(`${name}${i}`);
  }
  points[`${name}-at`] = at;
  const items: DiagramItem[] = [
    { kind: 'curve', id: `${name}-curve`, points: names, tone, weight: 3, group: name },
    { kind: 'line', id: `${name}-head`, from: names[steps - 1], to: names[steps], tone, weight: 3, arrow: true, group: name },
    { kind: 'label', id: `${name}-label`, at: `${name}-at`, tex: label, tone, place: 'center', group: name },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm301-4-1-b',
  lessonId: 'm301-4-1',
  title: 'Angles and Angle Measure, Part 2: Coterminal Angles',
  thumbnailTitle: 'Coterminal Angles',
  thumbnail: 'std',
  summary: 'Angles in standard position turning counterclockwise (positive) or clockwise (negative), coterminal angles that share a terminal arm, and the general form θ + 360°n or θ + 2πn, n ∈ I, in degrees and in radians. Part 3 covers arc length.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.1 · Part 2', title: 'Coterminal Angles', subtitle: 'Different turns, the same terminal arm' }],
      lines: [
        { say: 'Turn a wheel 120 degrees forward, or 240 degrees backward, and the same spoke ends up pointing the same way.', show: 'title' },
        { say: 'In this video, you will draw positive and negative angles in standard position, find angles that share a terminal arm, and write all of them at once.' },
      ],
    },
    {
      chapter: 'Standard position',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('std', [
          axes,
          arm(120),
          turn('ccw', 120, 1, 1, 'theta', '120^\\circ', polar(42, 1.65)),
          turn('cw', -240, 1.6, 1.6, 'adj', '-240^\\circ', polar(-152, 2.9)),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Standard position', md: 'The vertex is at the origin, and the **initial arm** lies along the positive $x$-axis.' },
        { kind: 'bullets', id: 'b', items: ['A **positive** angle turns counterclockwise.', 'A **negative** angle turns clockwise.', '$-240^\\circ + 360^\\circ = 120^\\circ$'] },
      ],
      lines: [
        { say: 'An angle is in standard position when its vertex is at the origin, and its initial arm lies along the positive x-axis.', show: ['std.axes', 'def'] },
        { say: 'A positive angle turns counterclockwise. Turning 120 degrees counterclockwise puts the terminal arm here, in quadrant two.', show: ['std.arm', 'std.P', 'std.ccw', 'b.0'], focus: 'std.ccw' },
        { say: 'A negative angle turns clockwise. Turning 240 degrees clockwise, negative 240 degrees, ends on the same terminal arm.', show: ['std.cw', 'b.1'], focus: 'std.cw' },
        { say: 'You can check it: negative 240 degrees plus one full turn, 360 degrees, is 120 degrees.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'Coterminal angles',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('co', [
          axes,
          arm(140),
          turn('a', 140, 1, 1, 'theta', '140^\\circ', polar(42, 1.65)),
          turn('b', 500, 0.8, 2.4, 'adj', '500^\\circ', polar(-50, 2.7)),
          turn('c', -220, 1.6, 1.6, 'hyp', '-220^\\circ', polar(-152, 2.9)),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Coterminal angles', md: 'Angles in standard position that share the same terminal arm. They differ by a whole number of full turns.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['140^\\circ + 360^\\circ = 500^\\circ', '140^\\circ - 360^\\circ = -220^\\circ', '\\theta + 360^\\circ n, \\quad n \\in \\mathbb{I}'] },
      ],
      lines: [
        { say: 'Angles in standard position are coterminal when they share the same terminal arm. They differ by a whole number of full turns.', show: ['co.axes', 'def'] },
        { say: 'Find one positive and one negative angle coterminal with 140 degrees. Here is 140 degrees, in quadrant two.', show: ['co.arm', 'co.P', 'co.a'], focus: 'co.a' },
        { say: 'Add a full turn: 140 plus 360 is 500 degrees. That angle goes all the way round once, then on to the same arm.', show: ['co.b', 'm.0'], hide: 'co.a', focus: ['co.b', 'm.0'] },
        { say: 'Subtract a full turn: 140 minus 360 is negative 220 degrees. It turns clockwise, and still ends on the same arm.', show: ['co.c', 'm.1'], hide: 'co.b', focus: ['co.c', 'm.1'] },
        { say: 'You can add or subtract as many full turns as you like. Every angle coterminal with theta is theta plus 360 degrees times n, where n is an integer. This is the general form.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'In radians',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\pi = \\dfrac{8\\pi}{4}', '\\dfrac{17\\pi}{4} - \\dfrac{16\\pi}{4} = \\dfrac{\\pi}{4}', '\\dfrac{\\pi}{4} + 2\\pi n, \\quad n \\in \\mathbb{I}'] },
        { kind: 'callout', id: 'def', tone: 'key', title: 'General form', md: '$\\theta + 360^\\circ n$ in degrees, or $\\theta + 2\\pi n$ in radians, where $n \\in \\mathbb{I}$ (an integer).' },
      ],
      lines: [
        { say: 'In radians, a full turn is two pi. Find the angle between zero and two pi that is coterminal with seventeen pi over four.' },
        { say: 'Write two pi with the same denominator: two pi is eight pi over four. Seventeen pi over four is more than two full turns, because two turns is sixteen pi over four.', show: 'm.0', focus: 'm.0' },
        { say: 'So subtract two pi twice. Seventeen pi over four minus sixteen pi over four is pi over four.', show: 'm.1', focus: 'm.1' },
        { say: 'Every coterminal angle differs from pi over four by a multiple of two pi. So all of them are pi over four plus two pi n, where n is an integer.', show: 'm.2', focus: 'm.2' },
        { say: 'That is the general form: theta plus 360 degrees n, in degrees, or theta plus two pi n, in radians.', show: 'def' },
      ],
    },
    {
      chapter: 'Mixing units',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\pi}{4} + 360^\\circ n \\quad \\text{mixes units}', '\\dfrac{\\pi}{4} + 2\\pi n \\quad \\text{or} \\quad 45^\\circ + 360^\\circ n'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'Adding degrees to radians gives nonsense. If the angle is in radians, a full turn is $2\\pi$; if it is in degrees, a full turn is $360^\\circ$.' },
      ],
      lines: [
        { say: 'A common mistake is to write pi over four plus 360 degrees n. That adds degrees to radians, like adding metres to minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep one unit. Write pi over four plus two pi n, all in radians, or 45 degrees plus 360 degrees n, all in degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'If the angle is in radians, a full turn is two pi. If it is in degrees, a full turn is 360 degrees.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which angle is coterminal with $\\dfrac{5\\pi}{3}$?',
          choices: ['$\\dfrac{2\\pi}{3}$', '$-\\dfrac{5\\pi}{3}$', '$-\\dfrac{\\pi}{3}$', '$\\dfrac{8\\pi}{3}$'],
          answer: 2,
          working: 'Subtract a full turn, $2\\pi = \\dfrac{6\\pi}{3}$: $\\dfrac{5\\pi}{3} - \\dfrac{6\\pi}{3} = -\\dfrac{\\pi}{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which angle is coterminal with five pi over three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Subtract one full turn, two pi, which is six pi over three. Five pi over three minus six pi over three is negative pi over three. B only changes the sign, which reflects the arm in the x-axis instead of turning a full turn.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Standard position: vertex at the origin, initial arm on the positive $x$-axis.', 'Positive angles turn counterclockwise; negative angles turn clockwise.', 'Coterminal angles: $\\theta + 360^\\circ n$ or $\\theta + 2\\pi n$, $n \\in \\mathbb{I}$.'] }],
      lines: [
        { say: 'Let’s sum up. An angle in standard position has its vertex at the origin, and its initial arm on the positive x-axis.', show: 'sum.0' },
        { say: 'Positive angles turn counterclockwise, and negative angles turn clockwise.', show: 'sum.1' },
        { say: 'Coterminal angles share a terminal arm. They are theta plus 360 degrees n, or theta plus two pi n, where n is an integer. In part three, we use radians to find the length of an arc. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
