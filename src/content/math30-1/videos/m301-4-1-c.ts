import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** Points on a circle of radius `r` about `c`, from angle `from` to `to` (radians), as point names. */
function arcPoints(points: Record<string, P>, key: string, c: P, r: number, from: number, to: number): string[] {
  const steps = Math.max(6, Math.ceil(Math.abs(to - from) / 0.05));
  const names: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = from + ((to - from) * i) / steps;
    points[`${key}${i}`] = [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
    names.push(`${key}${i}`);
  }
  return names;
}

/** A circle of radius 3 with a central angle of 3π/4: the radii, the angle and its arc `a`. */
function sector(): Part {
  const t = (3 * Math.PI) / 4;
  const points: Record<string, P> = { O: [0, 0], A: [3, 0], B: [3 * Math.cos(t), 3 * Math.sin(t)] };
  const items: DiagramItem[] = [
    { kind: 'curve', id: 'circle', points: arcPoints(points, 'c', [0, 0], 3, 0, 2 * Math.PI), tone: 'muted', weight: 2.5 },
    { kind: 'label', id: 'O', at: 'O', tex: '', tone: 'brand', dot: true },
    { kind: 'line', id: 'rA', from: 'O', to: 'A', tone: 'brand', label: '8\\text{ cm}', labelSide: 'right' },
    { kind: 'line', id: 'rB', from: 'O', to: 'B', tone: 'brand' },
    { kind: 'angle', id: 'ang', at: 'O', from: 'A', to: 'B', tone: 'theta', label: '\\tfrac{3\\pi}{4}', r: 40, labelDist: 80 },
    { kind: 'curve', id: 'arc', points: arcPoints(points, 'm', [0, 0], 3, 0, t), tone: 'opp', weight: 6, label: 'a', labelSide: 'right' },
  ];
  return { points, items };
}

/** A pendulum 75 cm long swinging 20° either side of straight down: 40° in all. */
function pendulum(): Part {
  const L = 3;
  const left = (-110 * Math.PI) / 180;
  const right = (-70 * Math.PI) / 180;
  const points: Record<string, P> = { O: [0, 0], c1: [-1.2, 0], c2: [1.2, 0], D: [0, -L], Lb: [L * Math.cos(left), L * Math.sin(left)], Rb: [L * Math.cos(right), L * Math.sin(right)] };
  const items: DiagramItem[] = [
    { kind: 'line', id: 'ceiling', from: 'c1', to: 'c2', tone: 'muted', weight: 5 },
    { kind: 'line', id: 'down', from: 'O', to: 'D', tone: 'muted', dashed: true, weight: 2 },
    { kind: 'line', id: 'sL', from: 'O', to: 'Lb', tone: 'brand', weight: 3 },
    { kind: 'line', id: 'sR', from: 'O', to: 'Rb', tone: 'brand', weight: 3, label: '75\\text{ cm}', labelSide: 'left' },
    { kind: 'angle', id: 'ang', at: 'O', from: 'Lb', to: 'Rb', tone: 'theta', label: '40^\\circ', r: 60, labelDist: 104 },
    { kind: 'curve', id: 'arc', points: arcPoints(points, 'm', [0, 0], L, left, right), tone: 'opp', weight: 6, label: 'a', labelSide: 'right' },
    { kind: 'label', id: 'bobL', at: 'Lb', tex: '', tone: 'adj', dot: true },
    { kind: 'label', id: 'bobR', at: 'Rb', tex: '', tone: 'adj', dot: true },
  ];
  return { points, items };
}

const video: Explainer = {
  id: 'm301-4-1-c',
  lessonId: 'm301-4-1',
  title: 'Angles and Angle Measure, Part 3: Arc Length',
  thumbnailTitle: 'Arc Length',
  thumbnail: 'sec',
  summary: 'Why the arc subtended by a central angle θ in radians has length a = rθ, three worked examples (an arc of a circle, a swinging pendulum with the angle in degrees, and finding the angle from the arc), and turning a number of revolutions into radians.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 4.1 · Part 3', title: 'Arc Length', subtitle: '$a = r\\theta$, with $\\theta$ in radians' }],
      lines: [
        { say: 'The tip of a pendulum, a point on a spinning wheel, and a satellite in orbit all travel along arcs of circles. How far do they go?', show: 'title' },
        { say: 'In this video, you will see why radians make arc length simple, use the formula "a" equals r theta, and turn revolutions into radians.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'split',
      leftWidth: 540,
      left: [figure('sec', [sector()])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{fraction of the circle} = \\dfrac{\\theta}{2\\pi}', 'a = \\dfrac{\\theta}{2\\pi} \\times 2\\pi r', 'a = r\\theta'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Arc length', md: 'A central angle of $\\theta$ **radians** subtends an arc of length $a = r\\theta$. Measure $a$ and $r$ in the same unit.' },
      ],
      lines: [
        { say: 'Here is a circle of radius eight centimetres, with a central angle of three pi over four. The arc it subtends is labelled "a".', show: ['sec.circle', 'sec.O', 'sec.rA', 'sec.rB', 'sec.ang', 'sec.arc'], focus: 'sec.arc' },
        { say: 'The arc is a fraction of the whole circle. A full turn is two pi radians, so the fraction is theta over two pi.', show: 'm.0', focus: 'm.0' },
        { say: 'The whole circle has circumference two pi r. So the arc length is theta over two pi, times two pi r.', show: 'm.1', focus: 'm.1' },
        { say: 'Two pi cancels, leaving "a" equals r theta. That is all there is to it.', show: 'm.2', focus: 'm.2' },
        { say: 'Two things to remember: theta must be in radians, and the arc comes out in the same unit as the radius.', show: 'def' },
      ],
    },
    {
      chapter: 'An arc of a circle',
      layout: 'split',
      leftWidth: 540,
      left: [figure('sec2', [sector()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a = r\\theta', 'a = 8 \\times \\dfrac{3\\pi}{4} = 6\\pi', '6\\pi \\approx 18.849', 'a \\approx 18.8\\text{ cm}'] }],
      lines: [
        { say: 'Now find that arc length, to the nearest tenth of a centimetre.', show: ['sec2.circle', 'sec2.O', 'sec2.rA', 'sec2.rB', 'sec2.ang', 'sec2.arc', 'm.0'] },
        { say: 'The radius is eight, and the angle is three pi over four, already in radians. Eight times three pi over four is 24 pi over four, which is six pi.', show: 'm.1', focus: 'm.1' },
        { say: 'Six pi is about 18.849, so to the nearest tenth, the arc is about 18.8 centimetres long.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Angle in degrees',
      layout: 'split',
      leftWidth: 500,
      left: [figure('pen', [pendulum()])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['40^\\circ \\times \\dfrac{\\pi}{180^\\circ} = \\dfrac{2\\pi}{9}', 'a = r\\theta = 75 \\times \\dfrac{2\\pi}{9}', 'a = \\dfrac{50\\pi}{3} \\approx 52.36', 'a \\approx 52.4\\text{ cm}'] }],
      lines: [
        { say: 'A pendulum 75 centimetres long swings through forty degrees. How far does its tip travel, to the nearest tenth of a centimetre?', show: ['pen.ceiling', 'pen.sL', 'pen.sR', 'pen.bobL', 'pen.bobR', 'pen.ang'] },
        { say: 'The tip moves along an arc with radius 75 centimetres. But the angle is in degrees, so convert it first: forty times pi over 180 is two pi over nine.', show: ['pen.arc', 'm.0'], focus: ['pen.arc', 'm.0'] },
        { say: 'Now use "a" equals r theta: 75 times two pi over nine.', show: 'm.1', focus: 'm.1' },
        { say: 'That simplifies to fifty pi over three, about 52.36. So the tip travels about 52.4 centimetres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Degrees in the formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a = 75 \\times 40 = 3000\\text{ cm} \\quad \\text{(30 metres!)}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Degrees in the formula', md: 'The formula $a = r\\theta$ only works with $\\theta$ in **radians**. Convert degrees to radians first.' },
      ],
      lines: [
        { say: 'Watch out for this mistake. Putting the angle in degrees straight into the formula gives 75 times forty, which is 3,000 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'That is thirty metres, far too long for the swing of a 75 centimetre pendulum.' },
        { say: 'The formula "a" equals r theta only works with theta in radians. Always convert degrees to radians first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Finding the angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a = r\\theta \\quad\\Longrightarrow\\quad \\theta = \\dfrac{a}{r}', '\\theta = \\dfrac{15}{6} = 2.5 \\text{ radians}', '2.5 \\times \\dfrac{180^\\circ}{\\pi} \\approx 143.2^\\circ'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Sector area', md: 'The same fraction of the circle gives the area of a sector: $A = \\dfrac{\\theta}{2\\pi} \\times \\pi r^2 = \\dfrac{1}{2}r^2\\theta$, again with $\\theta$ in radians.' },
      ],
      lines: [
        { say: 'You can also work backward. An arc fifteen metres long lies on a circle of radius six metres. Find the central angle in radians and in degrees.' },
        { say: 'Divide both sides of "a" equals r theta by r: theta equals "a" over r.', show: 'm.0', focus: 'm.0' },
        { say: 'Theta is fifteen over six, which is 2.5 radians. The arc is two and a half times as long as the radius.', show: 'm.1', focus: 'm.1' },
        { say: 'In degrees, 2.5 times 180 over pi is about 143.2 degrees.', show: 'm.2', focus: 'm.2' },
        { say: 'The same idea gives the area of a sector: theta over two pi of the whole area, pi r squared. That is one half r squared theta, again with theta in radians.', show: 'tip' },
      ],
    },
    {
      chapter: 'Rotations in radians',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['45 \\times \\dfrac{4}{60} = 3 \\text{ revolutions}', '3 \\times 2\\pi = 6\\pi \\text{ radians}', '3 \\times 360^\\circ = 1080^\\circ'] },
      ],
      lines: [
        { say: 'Radians make turning easy to count, because one revolution is two pi radians.' },
        { say: 'A wheel turns at 45 revolutions per minute. Through what angle does it turn in four seconds? Four seconds is four sixtieths of a minute, so it makes 45 times four over sixty: three revolutions.', show: 'm.0', focus: 'm.0' },
        { say: 'Each revolution is two pi radians, so three revolutions is six pi radians.', show: 'm.1', focus: 'm.1' },
        { say: 'In degrees, that is three times 360: 1,080 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A circle has a radius of $10$ cm. How long is the arc subtended by a central angle of $\\dfrac{\\pi}{5}$, to the nearest tenth of a centimetre?',
          choices: ['$15.9$ cm', '$360$ cm', '$0.1$ cm', '$6.3$ cm'],
          answer: 3,
          working: '$a = r\\theta = 10 \\times \\dfrac{\\pi}{5} = 2\\pi \\approx 6.28$, so about $6.3$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. A circle has a radius of ten centimetres. How long is the arc subtended by a central angle of pi over five, to the nearest tenth of a centimetre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. "a" equals r theta, which is ten times pi over five: two pi, about 6.3 centimetres. B changes the angle to 36 degrees and multiplies by ten, using degrees in the formula.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Arc length: $a = r\\theta$, with $\\theta$ in radians.', 'Convert degrees to radians first; $\\theta = \\dfrac{a}{r}$ finds the angle.', 'One revolution is $2\\pi$ radians.'] }],
      lines: [
        { say: 'Let’s sum up. A central angle of theta radians subtends an arc of length "a" equals r theta.', show: 'sum.0' },
        { say: 'If the angle is in degrees, convert it to radians first. And theta equals "a" over r finds the angle from the arc.', show: 'sum.1' },
        { say: 'One revolution is two pi radians. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
