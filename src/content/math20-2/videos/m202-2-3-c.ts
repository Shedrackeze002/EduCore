import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

/** The pentagon with angles 100°, 120°, 95°, 110° and x (115°). */
function pentagon(): Part {
  const v: P[] = [[1.46, 1.06], [4.74, 1.06], [5.94, 3.139], [3.367, 4.94], [1.06, 3.324]];
  const labels = ['100^\\circ', '120^\\circ', '95^\\circ', '110^\\circ', 'x'];
  const points: Record<string, P> = {};
  v.forEach((p, i) => (points[`v${i}`] = p));
  const items: DiagramItem[] = [{ kind: 'curve', id: 'edge', points: v.map((_, i) => `v${i}`), closed: true, tone: 'brand', group: 'shape' }];
  labels.forEach((tex, i) =>
    items.push({ kind: 'angle', id: i === 4 ? 'x' : `a${i}`, at: `v${i}`, from: `v${(i + 1) % 5}`, to: `v${(i + 4) % 5}`, label: tex, tone: i === 4 ? 'opp' : 'theta', group: i === 4 ? undefined : 'known' }),
  );
  return { points, items };
}

/**
 * Three copies of a regular `n`-gon with side `s`, sharing the vertex `O` (at `ox`), each with its
 * interior angle there. They go round anticlockwise, and any space left over is marked as a gap.
 */
function around(name: string, n: number, ox: number, tone: DiagramTone): Part {
  const s = 1.6;
  const interior = (180 * (n - 2)) / n;
  const points: Record<string, P> = { [`${name}-O`]: [ox, 0] };
  const items: DiagramItem[] = [];
  for (let k = 0; k < 3; k++) {
    let d = k * interior;
    let p: P = [ox, 0];
    const ids = [`${name}-O`];
    for (let i = 1; i < n; i++) {
      p = [p[0] + s * Math.cos((d * Math.PI) / 180), p[1] + s * Math.sin((d * Math.PI) / 180)];
      points[`${name}-${k}-${i}`] = p;
      ids.push(`${name}-${k}-${i}`);
      d += 360 / n;
    }
    items.push({ kind: 'region', id: `${name}-f${k}`, points: ids, tone, shade: 0.2, group: name });
    items.push({ kind: 'curve', id: `${name}-e${k}`, points: ids, closed: true, tone, group: name });
    items.push({ kind: 'angle', id: `${name}-a${k}`, at: `${name}-O`, from: ids[1], to: ids[n - 1], label: `${Math.round(interior)}^\\circ`, r: 22, labelDist: 72, group: `${name}-angles` });
  }
  const gap = 360 - 3 * interior;
  if (gap > 1) items.push({ kind: 'angle', id: `${name}-gap`, at: `${name}-O`, from: `${name}-2-${n - 1}`, to: `${name}-0-1`, tone: 'bad', label: `${Math.round(gap)}^\\circ`, r: 22, labelDist: 72, group: `${name}-angles` });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-2-3-c',
  lessonId: 'm202-2-3',
  title: 'Angle Properties of Polygons, Part 3: Solving Polygon Problems',
  thumbnailTitle: 'Solving Polygon Problems',
  thumbnail: 'tl',
  summary: 'Finding a missing angle of a pentagon from the 540° angle sum, solving for angles written as expressions, and why regular hexagons tile a floor while regular pentagons leave a gap.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.3 · Part 3', title: 'Solving Polygon Problems', subtitle: 'Missing angles and tiling' }],
      lines: [
        { say: 'The angle sum of a polygon is a total you can always count on. Subtract what you know, and what is left is the angle you need.', show: 'title' },
        { say: 'In this video, you will find missing angles in polygons, and see why some regular polygons tile a floor and others cannot.' },
      ],
    },
    {
      chapter: 'A missing angle',
      layout: 'split',
      leftWidth: 540,
      left: [figure('pg', [pentagon()], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['S = 180^\\circ(5 - 2) = 540^\\circ', '100^\\circ + 120^\\circ + 95^\\circ + 110^\\circ = 425^\\circ', 'x = 540^\\circ - 425^\\circ = 115^\\circ'] }],
      lines: [
        { say: 'Find x in this convex pentagon. Start with the angle sum: a pentagon’s angles add to 180, times five minus two, which is 540 degrees.', show: ['pg.shape', 'pg.known', 'pg.x', 'm.0'], focus: ['pg.x', 'm.0'] },
        { say: 'The four known angles add to 100 plus 120 plus ninety-five plus 110, which is 425 degrees.', show: 'm.1', focus: ['pg.known', 'm.1'] },
        { say: 'So x is 540 minus 425, which is 115 degrees. That is less than 180, as it must be in a convex polygon.', show: 'm.2', focus: ['pg.x', 'm.2'] },
      ],
    },
    {
      chapter: 'Angles as expressions',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x + 2x + (3x - 10) + (3x + 20) + 110 = 540', '10x + 120 = 540,\\quad 10x = 420,\\quad x = 42', '84^\\circ,\\ 84^\\circ,\\ 116^\\circ,\\ 146^\\circ,\\ 110^\\circ'] }],
      lines: [
        { say: 'The angles of a convex pentagon measure two x, two x, three x minus ten, three x plus twenty, and 110 degrees. Find x, and the largest angle.', show: 'm.0', focus: 'm.0' },
        { say: 'The angles add to 540. Collect like terms: ten x plus 120 is 540. So ten x is 420, and x is forty-two.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute to find each angle: eighty-four, eighty-four, 116, 146, and 110 degrees. They add to 540, and the largest angle is 146 degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Will it tile?',
      layout: 'center',
      main: [
        figure('tl', [around('hx', 6, 0, 'adj'), around('pt', 5, 8.5, 'opp')], 350),
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 120^\\circ = 360^\\circ', '3 \\times 108^\\circ = 324^\\circ:\\ \\text{a gap of } 36^\\circ'] },
      ],
      lines: [
        { say: 'Regular polygons cover a floor with no gaps only if their interior angles fit exactly around a point, making 360 degrees.', show: ['tl.hx', 'tl.pt'] },
        { say: 'Each angle of a regular hexagon is 120 degrees, and three of them make exactly 360. So hexagons tile, which is why honeycomb cells fit together.', show: ['tl.hx-angles', 'm.0'], focus: ['tl.hx', 'm.0'] },
        { say: 'Each angle of a regular pentagon is 108 degrees. Three make 324, leaving a gap of thirty-six degrees, and four would overlap. 360 divided by 108 is not a whole number, so regular pentagons cannot tile a floor.', show: ['tl.pt-angles', 'm.1'], focus: ['tl.pt', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five angles of a convex hexagon measure $130^\\circ$, $110^\\circ$, $125^\\circ$, $140^\\circ$ and $115^\\circ$. What is the sixth angle?',
          choices: ['$100^\\circ$', '$80^\\circ$', '$260^\\circ$', '$120^\\circ$'],
          answer: 0,
          working: 'A hexagon’s angles add to $180^\\circ(4) = 720^\\circ$. The five known angles add to $620^\\circ$, so the sixth is $720^\\circ - 620^\\circ = 100^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. Five angles of a convex hexagon measure 130, 110, 125, 140 and 115 degrees. What is the sixth angle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A hexagon’s angles add to 720 degrees. The five known angles add to 620, so the sixth angle is 720 minus 620, which is 100 degrees.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For a missing angle, subtract the known angles from the angle sum.', 'With expressions, set their sum equal to $180^\\circ(n - 2)$.', 'Regular polygons tile when their angles fit exactly into $360^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. To find a missing angle, subtract the known angles from the angle sum.', show: 'sum.0' },
        { say: 'With expressions, set their sum equal to 180, times n minus two, and solve.', show: 'sum.1' },
        { say: 'And regular polygons tile a floor when their angles fit exactly into 360 degrees. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
