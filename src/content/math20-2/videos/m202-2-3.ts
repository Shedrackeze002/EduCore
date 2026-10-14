import type { DiagramItem, DiagramTone, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

type P = [number, number];

const TONES: DiagramTone[] = ['adj', 'opp', 'theta', 'good'];

/**
 * A regular polygon with `n` sides, centred at `c` with circumradius 1.6 and a flat bottom, split
 * into triangles by every diagonal from its highest vertex. Parts, as group `name`: the outline,
 * the dashed diagonals, the shaded triangles with their numbers, and the caption underneath.
 */
function split(name: string, n: number, c: P): Part {
  const r = 1.6;
  const start = -90 - 180 / n;
  const v: P[] = Array.from({ length: n }, (_, i) => {
    const t = ((start + (360 * i) / n) * Math.PI) / 180;
    return [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)];
  });
  const id = (k: string) => `${name}-${k}`;
  const points: Record<string, P> = { [id('cap')]: [c[0], c[1] - r - 0.2] };
  v.forEach((p, i) => (points[id(`v${i}`)] = p));
  const items: DiagramItem[] = [];
  // Triangles fan out from the highest vertex (the left one of a level pair).
  const top = v.reduce((best, p, i) => (p[1] > v[best][1] + 1e-9 || (Math.abs(p[1] - v[best][1]) < 1e-9 && p[0] < v[best][0]) ? i : best), 0);
  for (let k = 1; k <= n - 2; k++) {
    const a = (top + k) % n;
    const b = (top + k + 1) % n;
    items.push({ kind: 'region', id: id(`t${k}`), points: [id(`v${top}`), id(`v${a}`), id(`v${b}`)], tone: TONES[(k - 1) % 4], shade: 0.22, group: id('tris') });
    const g: P = [(v[top][0] + v[a][0] + v[b][0]) / 3, (v[top][1] + v[a][1] + v[b][1]) / 3];
    points[id(`g${k}`)] = g;
    items.push({ kind: 'label', id: id(`n${k}`), at: id(`g${k}`), tex: `${k}`, place: 'center', group: id('tris') });
    if (k > 1) items.push({ kind: 'line', id: id(`d${k}`), from: id(`v${top}`), to: id(`v${a}`), tone: 'muted', dashed: true, group: id('tris') });
  }
  items.push({ kind: 'curve', id: id('edge'), points: v.map((_, i) => id(`v${i}`)), closed: true, tone: 'brand', group: name });
  items.push({ kind: 'label', id: id('c'), at: id('cap'), tex: `${n - 2} \\text{ triangle${n - 2 > 1 ? 's' : ''}}`, place: 'below', group: id('tris') });
  return { points, items };
}

const video: Explainer = {
  id: 'm202-2-3',
  lessonId: 'm202-2-3',
  title: 'Angle Properties of Polygons, Part 1: The Interior Angle Sum',
  thumbnailTitle: 'The Interior Angle Sum',
  thumbnail: 'sp',
  summary: 'Polygons, convex polygons and regular polygons, splitting a polygon into n − 2 triangles from one vertex, the angle sum 180°(n − 2), the 1800° of a dodecagon, and why the sum is not 180° × n.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 2.3 · Part 1', title: 'The Interior Angle Sum', subtitle: 'Polygons as triangles' }],
      lines: [
        { say: 'Stop signs, honeycomb cells, floor tiles and gazebo floors are all polygons. To cut and join the pieces, designers need their angles.', show: 'title' },
        { say: 'In this video, you will split polygons into triangles, and find the sum of their interior angles.' },
      ],
    },
    {
      chapter: 'Polygons',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Polygon, convex and regular', md: 'A **polygon** is a closed figure made of straight line segments that meet only at their endpoints. It is **convex** if every interior angle is less than $180^\\circ$, and **regular** if all its sides are equal and all its angles are equal.' }],
      lines: [
        { say: 'A polygon is a closed figure made of straight line segments that meet only at their endpoints. A triangle, a rectangle, and a stop sign are all polygons.', show: 'def' },
        { say: 'A polygon is convex if every interior angle is less than 180 degrees, so none of its corners point inward. And a polygon is regular if all its sides are equal, and all its angles are equal.' },
      ],
    },
    {
      chapter: 'Splitting into triangles',
      layout: 'center',
      main: [figure('sp', [split('q', 4, [0, 0]), split('p', 5, [5.2, 0]), split('h', 6, [10.4, 0])], 300), { kind: 'math', id: 'm', size: 'md', lines: ['n \\text{ sides: } n - 2 \\text{ triangles}', 'S = 180^\\circ(n - 2)'] }],
      lines: [
        { say: 'Here is a quadrilateral, a pentagon and a hexagon. From one vertex of each, draw every diagonal you can.', show: ['sp.q', 'sp.p', 'sp.h'] },
        { say: 'The quadrilateral splits into two triangles, the pentagon into three, and the hexagon into four.', show: ['sp.q-tris', 'sp.p-tris', 'sp.h-tris'], focus: ['sp.q-tris', 'sp.p-tris', 'sp.h-tris'] },
        { say: 'Each time, there are two fewer triangles than sides, because the vertex you start from and its two neighbours get no diagonal. So a polygon with n sides splits into n minus two triangles.', show: 'm.0', focus: 'm.0' },
        { say: 'The angles of the triangles make up the angles of the polygon, and each triangle adds 180 degrees. So the interior angles add to 180 degrees, times n minus two. A pentagon, for example, has three times 180, or 540 degrees.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A dodecagon',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['n = 12:\\quad 12 - 2 = 10 \\text{ triangles}', 'S = 180^\\circ(10) = 1800^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the 2', md: 'The sum is not $180^\\circ \\times n$. Check with a triangle: $n = 3$ must give $180^\\circ$, and $180^\\circ(3 - 2)$ does.' },
      ],
      lines: [
        { say: 'Find the sum of the interior angles of a convex twelve-sided polygon, called a dodecagon. It splits into twelve minus two, or ten triangles.', show: 'm.0', focus: 'm.0' },
        { say: 'So the sum is 180 times ten, which is 1,800 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to multiply 180 by the number of sides. Check any formula with a triangle: three sides must give 180 degrees, and 180 times three minus two does.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the sum of the interior angles of a convex heptagon (7 sides)?',
          choices: ['$900^\\circ$', '$1260^\\circ$', '$720^\\circ$', '$1080^\\circ$'],
          answer: 0,
          working: '$S = 180^\\circ(7 - 2) = 180^\\circ(5) = 900^\\circ$. $1260^\\circ$ is $180^\\circ \\times 7$, which forgets the 2.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the sum of the interior angles of a convex heptagon, with seven sides? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Seven minus two is five triangles, and five times 180 is 900 degrees. B is 180 times seven, which forgets to subtract two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From one vertex, an $n$-sided polygon splits into $n - 2$ triangles.', 'Its interior angles add to $180^\\circ(n - 2)$.', 'Check the formula with a triangle: $180^\\circ$.'] }],
      lines: [
        { say: 'Let’s sum up. From one vertex, a polygon with n sides splits into n minus two triangles.', show: 'sum.0' },
        { say: 'So its interior angles add to 180 degrees, times n minus two.', show: 'sum.1' },
        { say: 'And check the formula with a triangle, which must give 180. In part two, we find each angle of a regular polygon. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
