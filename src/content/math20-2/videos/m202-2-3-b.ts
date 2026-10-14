import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** The vertices of a regular `n`-gon centred at the origin, radius `r`, with a flat bottom, anticlockwise from the bottom left. */
function vertices(n: number, r: number): P[] {
  const start = -90 - 180 / n;
  return Array.from({ length: n }, (_, i) => {
    const t = ((start + (360 * i) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  });
}

/**
 * A regular polygon with each side extended past the vertex it leads to, and an exterior angle
 * there, labelled `ext`. With `only`, just that one vertex gets an extension and exterior angle,
 * and `int` labels its interior angle. Parts: `shape`, and each vertex's `x<i>` (a group: the
 * dashed extension and the angle `e<i>`), plus `in` (the interior angle).
 */
function polygon(n: number, ext: string, o: { only?: number; int?: string } = {}): Part {
  const v = vertices(n, 2);
  const points: Record<string, P> = {};
  v.forEach((p, i) => (points[`v${i}`] = p));
  const items: DiagramItem[] = [{ kind: 'curve', id: 'edge', points: v.map((_, i) => `v${i}`), closed: true, tone: 'brand', group: 'shape' }];
  const which = o.only === undefined ? v.map((_, i) => i) : [o.only];
  for (const i of which) {
    const prev = v[(i + n - 1) % n];
    const len = Math.hypot(v[i][0] - prev[0], v[i][1] - prev[1]);
    points[`x${i}`] = [v[i][0] + ((v[i][0] - prev[0]) / len) * 1.3, v[i][1] + ((v[i][1] - prev[1]) / len) * 1.3];
    items.push({ kind: 'line', id: `xl${i}`, from: `v${i}`, to: `x${i}`, tone: 'muted', dashed: true, group: `x${i}` });
    items.push({ kind: 'angle', id: `e${i}`, at: `v${i}`, from: `x${i}`, to: `v${(i + 1) % n}`, tone: 'opp', label: ext, r: 30, group: `x${i}` });
  }
  if (o.only !== undefined && o.int) {
    const i = o.only;
    items.push({ kind: 'angle', id: 'in', at: `v${i}`, from: `v${(i + 1) % n}`, to: `v${(i + n - 1) % n}`, label: o.int, r: 36 });
  }
  return { points, items };
}

const video: Explainer = {
  id: 'm202-2-3-b',
  lessonId: 'm202-2-3',
  title: 'Angle Properties of Polygons, Part 2: Regular Polygons',
  thumbnailTitle: 'Angles of Regular Polygons',
  thumbnail: 'oc',
  summary: 'Each interior angle of a regular polygon, the 135° and 45° angles of a stop sign, why the exterior angles of any convex polygon add to 360°, and finding that a regular polygon with 156° angles has 15 sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.3 · Part 2', title: 'Angles of Regular Polygons', subtitle: 'Interior and exterior' }],
      lines: [
        { say: 'In a regular polygon every angle is the same, so one formula gives each of them. And there is a second, even simpler set of angles to work with: the exterior angles.', show: 'title' },
        { say: 'In this video, you will find the interior and exterior angles of regular polygons, and work backwards to the number of sides.' },
      ],
    },
    {
      chapter: 'A regular octagon',
      layout: 'split',
      leftWidth: 520,
      left: [figure('oc', [polygon(8, '45^\\circ', { only: 1, int: '135^\\circ' })], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{each interior} = \\dfrac{180^\\circ(n - 2)}{n}', '\\dfrac{180^\\circ(6)}{8} = \\dfrac{1080^\\circ}{8} = 135^\\circ', '180^\\circ - 135^\\circ = 45^\\circ'] }],
      lines: [
        { say: 'A regular polygon has n equal interior angles, so each one is the angle sum divided by n.', show: ['oc.shape', 'm.0'], focus: 'm.0' },
        { say: 'A stop sign is a regular octagon, with eight sides. Its angles add to 180 times six, which is 1,080 degrees, so each interior angle is 1,080 divided by eight, which is 135 degrees.', show: ['oc.in', 'm.1'], focus: ['oc.in', 'm.1'] },
        { say: 'An exterior angle of a polygon is formed by one side and the extension of the next side. It makes a straight line with the interior angle, so here it is 180 minus 135, which is forty-five degrees.', show: ['oc.x1', 'm.2'], focus: ['oc.x1', 'm.2'] },
      ],
    },
    {
      chapter: 'The exterior angles',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pe', [polygon(5, '72^\\circ')], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{exterior angles: } 360^\\circ', '\\text{each, if regular} = \\dfrac{360^\\circ}{n}', '\\dfrac{360^\\circ}{5} = 72^\\circ', '\\dfrac{360^\\circ}{8} = 45^\\circ \\;\\checkmark'] }],
      lines: [
        { say: 'Imagine walking around a convex polygon. At each corner, you turn through its exterior angle.', show: ['pe.shape', 'pe.x0', 'pe.x1', 'pe.x2', 'pe.x3', 'pe.x4'], focus: ['pe.e0', 'pe.e1', 'pe.e2', 'pe.e3', 'pe.e4'] },
        { say: 'When you get back to the start, you are facing the way you began, so you have turned exactly once around: 360 degrees. So the exterior angles, one at each vertex, add to 360 degrees, for any convex polygon.', show: 'm.0', focus: 'm.0' },
        { say: 'In a regular polygon the exterior angles are equal, so each one is 360 divided by n. For a regular pentagon, that is seventy-two degrees.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'And for the stop sign, 360 divided by eight is forty-five degrees, which matches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Finding the number of sides',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{exterior} = 180^\\circ - 156^\\circ = 24^\\circ', 'n = 360^\\circ \\div 24^\\circ = 15', '\\dfrac{180^\\circ(13)}{15} = 156^\\circ \\;\\checkmark'] }],
      lines: [
        { say: 'Each interior angle of a regular polygon measures 156 degrees. How many sides does it have? Exterior angles make this quick.', show: 'm.0', focus: 'm.0' },
        { say: 'Each exterior angle is 180 minus 156, which is twenty-four degrees. The exterior angles add to 360, so there are 360 divided by twenty-four, or fifteen of them. The polygon has fifteen sides.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the interior angle formula: 180 times thirteen, divided by fifteen, is 156 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Each interior angle of a regular polygon measures $140^\\circ$. How many sides does it have?',
          choices: ['$9$', '$8$', '$10$', '$7$'],
          answer: 0,
          working: 'Each exterior angle is $180^\\circ - 140^\\circ = 40^\\circ$, so $n = 360^\\circ \\div 40^\\circ = 9$.',
        },
      ],
      lines: [
        { say: 'Your turn. Each interior angle of a regular polygon measures 140 degrees. How many sides does it have? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Each exterior angle is 180 minus 140, which is forty degrees, and 360 divided by forty is nine. So the polygon has nine sides.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each interior angle of a regular polygon is $\\dfrac{180^\\circ(n - 2)}{n}$.', 'The exterior angles of a convex polygon add to $360^\\circ$.', 'Interior + exterior $= 180^\\circ$; then $n = 360^\\circ \\div$ exterior.'] }],
      lines: [
        { say: 'Let’s sum up. Each interior angle of a regular polygon is 180, times n minus two, divided by n.', show: 'sum.0' },
        { say: 'The exterior angles of any convex polygon, one at each vertex, add to 360 degrees.', show: 'sum.1' },
        { say: 'And an interior angle and its exterior angle add to 180, so to find n, divide 360 by the exterior angle. In part three, we solve polygon problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
