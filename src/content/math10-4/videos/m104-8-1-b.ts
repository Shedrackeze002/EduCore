import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

type P = [number, number];

/** The five quadrilaterals in a column, each a part (`sq`, `re`, `rh`, `pa`, `tr`) with its name to its right. */
const quads: Part = (() => {
  const shapes: [string, string, P[]][] = [
    ['sq', 'square', [[0.6, 0], [2.4, 0], [2.4, 1.8], [0.6, 1.8]]],
    ['re', 'rectangle', [[0, 0], [3, 0], [3, 1.6], [0, 1.6]]],
    ['rh', 'rhombus', [[0, 0], [2, 0], [3.2, 1.6], [1.2, 1.6]]],
    ['pa', 'parallelogram', [[0, 0], [2.6, 0], [3.4, 1.6], [0.8, 1.6]]],
    ['tr', 'trapezoid', [[0, 0], [3.4, 0], [2.6, 1.6], [0.8, 1.6]]],
  ];
  // Room on the right for the longest name.
  const points: Record<string, P> = { pad: [8.6, 0] };
  const items: DiagramItem[] = [];
  shapes.forEach(([id, name, corners], k) => {
    const dy = (shapes.length - 1 - k) * 2.6;
    const ids = corners.map(([x, y], i) => {
      points[`${id}${i}`] = [x, y + dy];
      return `${id}${i}`;
    });
    points[`${id}-at`] = [4, dy + 0.85];
    items.push(
      { kind: 'region', id: `${id}-fill`, points: ids, tone: 'brand', shade: 0.18, group: id },
      { kind: 'curve', id: `${id}-edge`, points: ids, closed: true, weight: 3, group: id },
      { kind: 'label', id: `${id}-name`, at: `${id}-at`, tex: `\\text{${name}}`, place: 'right', group: id },
    );
  });
  return { points, items };
})();

const video: Explainer = {
  id: 'm104-8-1-b',
  lessonId: 'm104-8-1',
  title: 'Angles and Shapes, Part 2: Triangles and Quadrilaterals',
  thumbnailTitle: 'Naming Shapes',
  thumbnail: 'tri',
  summary: 'Naming triangles by their sides (equilateral, isosceles, scalene) and by their angles (acute, right, obtuse), the three angles adding to 180°, and the most exact name for a quadrilateral: square, rectangle, rhombus, parallelogram or trapezoid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 8.1 · Part 2', title: 'Naming Shapes', subtitle: 'Triangles and quadrilaterals' }],
      lines: [
        { say: 'Knowing the names of shapes helps you read a plan and follow instructions on the job.', show: 'title' },
        { say: 'In this video, you will name triangles and four-sided shapes.' },
      ],
    },
    {
      chapter: 'Triangles by sides',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('tri', [
          triangle({ name: 'eq', A: [0, 0], B: [4, 0], C: [2, 3.46], tones: { AB: 'adj', BC: 'adj', CA: 'adj' } }),
          triangle({ name: 'iso', A: [5.5, 0], B: [8.5, 0], C: [7, 4.2], tones: { BC: 'opp', CA: 'opp' } }),
          triangle({ name: 'sc', A: [10, 0], B: [14.5, 0], C: [11.2, 2.6] }),
        ]),
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['**Equilateral:** 3 equal sides.', '**Isosceles:** 2 equal sides.', '**Scalene:** no equal sides.'] }],
      lines: [
        { say: 'A polygon is a closed shape with straight sides. A triangle has three sides, and a quadrilateral has four. We can name a triangle by its sides.', show: ['tri.eq-shape', 'tri.iso-shape', 'tri.sc-shape'] },
        { say: 'An equilateral triangle has three equal sides. An isosceles triangle has two equal sides. A scalene triangle has no equal sides.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'A roof truss has sides of six, six and four metres. Two sides are equal, so it is isosceles.', focus: ['tri.iso-shape', 'b.1'] },
      ],
    },
    {
      chapter: 'Triangles by angles',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Acute:** all angles less than $90^\\circ$.', '**Right:** one $90^\\circ$ angle.', '**Obtuse:** one angle more than $90^\\circ$.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['90 + 35 = 125, \\quad 180 - 125 = 55^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Sides or angles?', md: '"By its sides": equilateral, isosceles or scalene. "By its angles": acute, right or obtuse.' },
      ],
      lines: [
        { say: 'We can also name a triangle by its angles: acute if all its angles are less than ninety, right if it has one ninety-degree angle, and obtuse if one angle is more than ninety.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'The three angles of a triangle always add to 180 degrees. Two angles of a corner shelf are ninety and 35. Together they make 125, so the third is 180 minus 125: 55 degrees. With a ninety-degree angle, it is a right triangle.', show: 'm.0', focus: 'm.0' },
        { say: 'Read the question carefully. By its sides means equilateral, isosceles or scalene. By its angles means acute, right or obtuse.', show: 'oops' },
      ],
    },
    {
      chapter: 'Quadrilaterals',
      layout: 'split',
      leftWidth: 420,
      left: [figure('q4', [quads])],
      right: [
        { kind: 'table', id: 't', head: ['Shape', 'Sides', 'Right angles'], rows: [['Square', '4 equal', '4'], ['Rectangle', 'opposites equal', '4'], ['Rhombus', '4 equal', 'not needed'], ['Parallelogram', 'opposites equal, parallel', 'not needed'], ['Trapezoid', '1 pair parallel', 'any']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The most exact name', md: 'A square is also a rectangle and a rhombus, but "square" tells the most.' },
      ],
      lines: [
        { say: 'Two lines are parallel if they never meet, like the rails of a train track. A square has four equal sides and four right angles. A rectangle has opposite sides equal, and four right angles.', show: ['q4.sq', 'q4.re', 't.0', 't.1'] },
        { say: 'A rhombus has four equal sides. A parallelogram has opposite sides equal and parallel. And a trapezoid has one pair of parallel sides.', show: ['q4.rh', 'q4.pa', 'q4.tr', 't.2', 't.3', 't.4'] },
        { say: 'A piece of fabric has opposite sides of sixty and 36 centimetres, equal and parallel, but no square corners. Not all four sides are equal, and there are no right angles, so it is a parallelogram.', focus: ['q4.pa', 't.3'] },
        { say: 'A square is also a rectangle and a rhombus, but square tells the most, so it is the most exact name.', show: 'tip', focus: 'q4.sq' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A triangle has sides of $5\\text{ cm}$, $7\\text{ cm}$ and $9\\text{ cm}$. Name it by its sides.',
          choices: ['scalene', 'isosceles', 'equilateral', 'right'],
          answer: 0,
          working: 'No two sides are equal, so the triangle is scalene.',
        },
      ],
      lines: [
        { say: 'Your turn. A triangle has sides of five, seven and nine centimetres. Name it by its sides. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, scalene: no two sides are equal. D names a triangle by its angles, not its sides.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['By sides: equilateral, isosceles, scalene.', 'By angles: acute, right, obtuse. The angles add to $180^\\circ$.', 'Use the most exact name for a quadrilateral.'] }],
      lines: [
        { say: 'Let’s sum up. By its sides, a triangle is equilateral, isosceles or scalene.', show: 'sum.0' },
        { say: 'By its angles, it is acute, right or obtuse, and its angles add to 180 degrees.', show: 'sum.1' },
        { say: 'And name a quadrilateral with its most exact name. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
