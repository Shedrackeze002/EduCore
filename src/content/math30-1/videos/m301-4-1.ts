import type { Explainer } from '@/video/script.ts';
import type { DiagramItem } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** A circle of radius 3, drawn with its points every 3.75°. */
const R = 3;
const on = (t: number, k = 1): P => [k * R * Math.cos(t), k * R * Math.sin(t)];

/** Points along the circle from angle `from` to `to` (radians), as point names. */
function arcPoints(points: Record<string, P>, key: string, from: number, to: number, k = 1): string[] {
  const steps = Math.max(6, Math.ceil(Math.abs(to - from) / 0.05));
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    points[`${key}${i}`] = on(from + ((to - from) * i) / steps, k);
    names.push(`${key}${i}`);
  }
  return names;
}

/** The circle, two radii one radian apart, and the arc between them, as long as the radius. */
function oneRadian(): Part {
  const points: Record<string, P> = { O: [0, 0], A: on(0), B: on(1) };
  const ring: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[`c${i}`] = on((i * Math.PI) / 48);
    ring.push(`c${i}`);
  }
  const items: DiagramItem[] = [
    { kind: 'curve', id: 'circle', points: ring, closed: true, tone: 'muted', weight: 2.5 },
    { kind: 'label', id: 'O', at: 'O', tex: '', tone: 'brand', dot: true },
    { kind: 'line', id: 'rA', from: 'O', to: 'A', tone: 'brand', label: 'r', labelSide: 'right' },
    { kind: 'line', id: 'rB', from: 'O', to: 'B', tone: 'brand', label: 'r', labelSide: 'left' },
    { kind: 'curve', id: 'arc', points: arcPoints(points, 'm', 0, 1), tone: 'opp', weight: 6, label: '\\text{arc length } r', labelSide: 'right', labelAt: 0.85 },
    { kind: 'angle', id: 'ang', at: 'O', from: 'A', to: 'B', tone: 'theta', label: '1\\text{ rad}', r: 36, labelDist: 118 },
  ];
  return { points, items };
}

/** Arcs one radius long laid around the circle: six of them, and a piece about 0.28 of a radius. */
function aroundTheCircle(): Part {
  const points: Record<string, P> = { O: [0, 0] };
  const ring: string[] = [];
  for (let i = 0; i < 96; i++) {
    points[`c${i}`] = on((i * Math.PI) / 48);
    ring.push(`c${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'curve', id: 'circle', points: ring, closed: true, tone: 'muted', weight: 2.5 }];
  for (let k = 0; k <= 6; k++) {
    points[`s${k}`] = on(k);
    items.push({ kind: 'line', id: `spoke${k}`, from: 'O', to: `s${k}`, tone: 'muted', weight: 1.5, group: 'spokes' });
  }
  for (let k = 0; k < 6; k++) {
    items.push({ kind: 'curve', id: `arc${k}`, points: arcPoints(points, `m${k}-`, k, k + 1), tone: k % 2 ? 'adj' : 'opp', weight: 6, label: `${k + 1}`, labelSide: 'right', group: 'arcs' });
  }
  items.push({ kind: 'curve', id: 'rest', points: arcPoints(points, 'm6-', 6, 2 * Math.PI), tone: 'theta', weight: 6, label: '0.28', labelSide: 'right' });
  return { points, items };
}

const video: Explainer = {
  id: 'm301-4-1',
  lessonId: 'm301-4-1',
  title: 'Angles and Angle Measure, Part 1: Radian Measure',
  thumbnailTitle: 'Radian Measure',
  thumbnail: 'one',
  summary: 'What one radian is (the angle whose arc is as long as the radius), why a full turn is 2π radians, so π = 180°, and how to convert between degrees and radians, such as 225° = 5π/4 and 7π/6 = 210°. Part 2 covers coterminal angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.1 · Part 1', title: 'Radian Measure', subtitle: 'Measuring an angle with the circle itself' }],
      lines: [
        { say: 'A wind turbine blade, a bicycle wheel and a satellite in orbit all turn through angles far larger than 360 degrees.', show: 'title' },
        { say: 'Degrees split one turn into 360 parts only because people chose that number. Radians measure an angle with the circle itself. In this video, you will see what a radian is, and convert between degrees and radians.' },
      ],
    },
    {
      chapter: 'One radian',
      layout: 'split',
      leftWidth: 560,
      left: [figure('one', [oneRadian()])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Radian', md: 'One **radian** is the measure of a central angle that subtends an arc equal in length to the radius of the circle.' }],
      lines: [
        { say: 'Draw a circle with radius r, and draw one radius out to the right.', show: ['one.circle', 'one.O', 'one.rA'], focus: 'one.rA' },
        { say: 'Now walk around the circle, counterclockwise, for a distance equal to the radius. That arc has length r too.', show: 'one.arc', focus: 'one.arc' },
        { say: 'Join the end of the arc to the centre. The angle at the centre is one radian.', show: ['one.rB', 'one.ang'], focus: 'one.ang' },
        { say: 'So one radian is the central angle that subtends an arc equal in length to the radius. It does not matter how big the circle is: a bigger circle has a longer radius and a longer arc, but the same angle.', show: 'def' },
      ],
    },
    {
      chapter: 'A full turn',
      layout: 'split',
      leftWidth: 560,
      left: [figure('turn', [aroundTheCircle()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['C = 2\\pi r', '\\dfrac{2\\pi r}{r} = 2\\pi \\text{ radians}', '2\\pi = 360^\\circ \\qquad \\pi = 180^\\circ', '1 \\text{ radian} = \\dfrac{180^\\circ}{\\pi} \\approx 57.3^\\circ'] }],
      lines: [
        { say: 'How many radians are in one full turn? Lay arcs as long as the radius around the circle, one after another.', show: ['turn.circle', 'turn.spokes'] },
        { say: 'Six of them fit, with a small piece left over, about 0.28 of a radius. So a full turn is about 6.28 radians.', show: ['turn.arcs', 'turn.rest'], focus: 'turn.rest' },
        { say: 'Here is the exact number. The circumference of the circle is two pi r. Dividing by the radius, r, gives two pi radians in a full turn, and two pi is about 6.28.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So two pi radians equals 360 degrees, and half a turn, pi radians, equals 180 degrees. This is the fact to remember.', show: 'm.2', focus: 'm.2' },
        { say: 'Dividing by pi, one radian is 180 degrees over pi, about 57.3 degrees: a little less than sixty.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Degrees to radians',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Degrees to radians: multiply by } \\dfrac{\\pi}{180^\\circ}', '225^\\circ \\times \\dfrac{\\pi}{180^\\circ} = \\dfrac{225\\pi}{180}', '\\dfrac{225\\pi}{180} = \\dfrac{5\\pi}{4}'] },
        { kind: 'text', id: 'note', size: 'md', md: 'An angle written **without** a degree sign is in radians.' },
      ],
      lines: [
        { say: 'Because pi equals 180 degrees, pi over 180 degrees equals one. Multiplying by it changes the units, but not the angle. So to convert degrees to radians, multiply by pi over 180 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Convert 225 degrees to radians, as an exact answer. 225 degrees times pi over 180 degrees is 225 pi over 180. The degrees cancel.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide the numerator and the denominator by 45: 225 divided by 45 is five, and 180 divided by 45 is four. So 225 degrees is five pi over four.', show: 'm.2', focus: 'm.2' },
        { say: 'Exact radian measures are written as multiples of pi, and the word radians is usually left out. An angle written without a degree sign is in radians.', show: 'note' },
      ],
    },
    {
      chapter: 'Radians to degrees',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Radians to degrees: multiply by } \\dfrac{180^\\circ}{\\pi}', '\\dfrac{7\\pi}{6} \\times \\dfrac{180^\\circ}{\\pi} = \\dfrac{7(180^\\circ)}{6} = 210^\\circ', '2.5 \\times \\dfrac{180^\\circ}{\\pi} \\approx 143.24^\\circ \\approx 143.2^\\circ'] },
        {
          kind: 'table',
          id: 't',
          head: ['Degrees', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$', '$180^\\circ$', '$270^\\circ$', '$360^\\circ$'],
          rows: [['Radians', '$\\frac{\\pi}{6}$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$', '$\\frac{\\pi}{2}$', '$\\pi$', '$\\frac{3\\pi}{2}$', '$2\\pi$']],
        },
      ],
      lines: [
        { say: 'To go the other way, from radians to degrees, multiply by 180 degrees over pi.', show: 'm.0', focus: 'm.0' },
        { say: 'Convert seven pi over six to degrees. Times 180 degrees over pi: pi cancels, leaving seven times 180 degrees, over six. 180 divided by six is thirty, and seven times thirty is 210 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'An angle does not have to be a multiple of pi. Convert 2.5 radians to the nearest tenth of a degree. 2.5 times 180 over pi is about 143.24, so about 143.2 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'These angles come up again and again. Thirty degrees is pi over six, 45 is pi over four, sixty is pi over three, and ninety is pi over two. 180 is pi, 270 is three pi over two, and 360 is two pi.', show: 't', focus: 't' },
      ],
    },
    {
      chapter: 'Upside-down factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['180^\\circ \\times \\dfrac{\\pi}{180^\\circ} = \\pi \\;\\checkmark', '180^\\circ \\times \\dfrac{180^\\circ}{\\pi} = \\dfrac{180^2}{\\pi} \\approx 10\\,313'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Upside-down conversion factor', md: 'To go **to** radians, the factor has $\\pi$ on top: $\\dfrac{\\pi}{180^\\circ}$. Check with $180^\\circ$: it must become $\\pi$.' },
      ],
      lines: [
        { say: 'The most common mistake is to use the conversion factor upside down. Here is a quick check: 180 degrees must become pi.', show: 'm.0', focus: 'm.0' },
        { say: 'With pi on top, 180 degrees times pi over 180 degrees is pi. That is right.' },
        { say: 'With 180 over pi, you get 180 squared over pi, which is more than ten thousand. That cannot be half a turn, so the factor is upside down.', show: 'm.1', focus: 'm.1' },
        { say: 'To go to radians, put pi on top. To go to degrees, put 180 degrees on top.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Convert $150^\\circ$ to radians. Give an exact answer.',
          choices: ['$\\dfrac{6\\pi}{5}$', '$\\dfrac{5\\pi}{6}$', '$\\dfrac{5\\pi}{3}$', '$\\dfrac{27\\,000}{\\pi}$'],
          answer: 1,
          working: '$150^\\circ \\times \\dfrac{\\pi}{180^\\circ} = \\dfrac{150\\pi}{180} = \\dfrac{5\\pi}{6}$, dividing the numerator and denominator by $30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Convert 150 degrees to radians, as an exact answer. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. 150 degrees times pi over 180 degrees is 150 pi over 180, and dividing the top and bottom by thirty gives five pi over six. D multiplies by the upside-down factor, 180 over pi.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One radian subtends an arc equal to the radius.', '$2\\pi = 360^\\circ$ and $\\pi = 180^\\circ$.', 'Degrees to radians: multiply by $\\dfrac{\\pi}{180^\\circ}$.', 'Radians to degrees: multiply by $\\dfrac{180^\\circ}{\\pi}$.'] }],
      lines: [
        { say: 'Let’s sum up. One radian is the central angle that subtends an arc equal in length to the radius.', show: 'sum.0' },
        { say: 'A full turn is two pi radians, so pi radians equals 180 degrees.', show: 'sum.1' },
        { say: 'To convert degrees to radians, multiply by pi over 180 degrees.', show: 'sum.2' },
        { say: 'To convert radians to degrees, multiply by 180 degrees over pi. In part two, we find angles that end in the same place: coterminal angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
