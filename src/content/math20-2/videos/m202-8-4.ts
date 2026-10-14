import type { DiagramItem, Explainer } from '@/video/script.ts';
import { cylinder, figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

type P = [number, number];

/** Dashed lines that split the 6 by 9 rectangle into nine copies of the 2 by 3 one. */
function copies(): Part {
  const points: Record<string, P> = {};
  const items: DiagramItem[] = [];
  const x0 = 4.5;
  for (const [i, x] of [x0 + 2, x0 + 4].entries()) {
    points[`v${i}a`] = [x, 0];
    points[`v${i}b`] = [x, 9];
    items.push({ kind: 'line', id: `v${i}`, from: `v${i}a`, to: `v${i}b`, tone: 'muted', dashed: true, group: 'copies' });
  }
  for (const [i, y] of [3, 6].entries()) {
    points[`h${i}a`] = [x0, y];
    points[`h${i}b`] = [x0 + 6, y];
    items.push({ kind: 'line', id: `h${i}`, from: `h${i}a`, to: `h${i}b`, tone: 'muted', dashed: true, group: 'copies' });
  }
  return { points, items };
}

const video: Explainer = {
  id: 'm202-8-4',
  lessonId: 'm202-8-4',
  title: 'Similar Objects: Length, Area and Volume, Part 1: Areas Grow by k²',
  thumbnailTitle: 'Areas Grow by k²',
  thumbnail: 'grid',
  summary: 'What similar objects are, why enlarging a 2 cm by 3 cm rectangle by k = 3 multiplies its area by 9, the rule new area = k² × original area, and the surface area of a similar water tank 1.5 times as tall (about 21.4 m²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.4 · Part 1', title: 'Areas Grow by k²', subtitle: 'Similar objects' }],
      lines: [
        { say: 'If you double every length of a box, does it hold twice as much? No: it holds eight times as much. Lengths, areas and volumes grow at different rates.', show: 'title' },
        { say: 'In this video, you will see how the area of a similar shape or object changes, and use it to predict the surface area of a bigger tank.' },
      ],
    },
    {
      chapter: 'Similar objects',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Similar objects', md: 'Two 2-D shapes or 3-D objects are **similar** if every length on one is the same multiple $k$ of the corresponding length on the other. The number $k$ is the **scale factor**.' },
        { kind: 'bullets', id: 'b', items: ['Heights, widths, radii, diagonals and edges are all **lengths**: each is multiplied by $k$.', 'Areas and volumes are **not** lengths, so they change differently.'] },
      ],
      lines: [
        { say: 'Two shapes or objects are similar if every length on one is the same multiple, k, of the matching length on the other. The number k is the scale factor.', show: 'def' },
        { say: 'Heights, widths, radii, diagonals and edges are all lengths, so each one is multiplied by k.', show: 'b.0' },
        { say: 'But areas and volumes are not lengths, so they change differently. Let’s see how.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Why area grows by k squared',
      layout: 'split',
      leftWidth: 600,
      left: [
        figure('ar', [
          rectangle({ name: 'o', w: 2, h: 3, labels: { w: '2', h: '3' } }),
          rectangle({ name: 'e', at: [4.5, 0], w: 6, h: 9, labels: { w: '6', h: '9' } }),
          copies(),
        ], 420),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2 \\times 3 = 6 \\text{ cm}^2', '6 \\times 9 = 54 \\text{ cm}^2', '54 \\div 6 = 9 = 3^2'] }],
      lines: [
        { say: 'A two centimetre by three centimetre rectangle has an area of six square centimetres.', show: ['ar.o-shape', 'm.0'], focus: 'm.0' },
        { say: 'Enlarge it with a scale factor of three. It becomes six by nine, with an area of fifty-four square centimetres.', show: ['ar.e-shape', 'm.1'], focus: 'm.1' },
        { say: 'That is nine times the original area, not three times. Here we can see why: nine copies of the small rectangle fit inside the large one.', show: ['ar.copies', 'm.2'], focus: ['ar.copies', 'm.2'] },
        { say: 'Both dimensions were multiplied by three, so the area was multiplied by three times three: three squared.' },
      ],
    },
    {
      chapter: 'The area rule',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{new area} = k^2 \\times \\text{original area}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Surface area too', md: 'The same rule holds for the **surface areas** of similar 3-D objects: every face is an area, and each one is multiplied by $k^2$.' },
      ],
      lines: [
        { say: 'So if two shapes or objects are similar with scale factor k, the new area is k squared times the original area.', show: 'm.0', focus: 'm.0' },
        { say: 'The same rule holds for the surface areas of similar 3-D objects. Every face is an area, so every face is multiplied by k squared, and so is the total.', show: 'key' },
      ],
    },
    {
      chapter: 'A larger tank',
      layout: 'split',
      leftWidth: 620,
      left: [figure('tank', [cylinder({ name: 's', r: 1.6, h: 3.2, labels: { h: '1.2\\text{ m}' } }), cylinder({ name: 'l', at: [7.2, 0], r: 2.4, h: 4.8, labels: { h: '1.8\\text{ m}' } })], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['k = \\dfrac{1.8}{1.2} = 1.5', 'k^2 = 1.5^2 = 2.25', '9.5 \\times 2.25 = 21.375', '\\approx 21.4 \\text{ m}^2'] }],
      lines: [
        { say: 'A cylindrical water tank is 1.2 metres tall, and has a surface area of 9.5 square metres. A similar tank is 1.8 metres tall. What is its surface area?', show: ['tank.s-shape', 'tank.s-h', 'tank.l-shape', 'tank.l-h'] },
        { say: 'First, find k from the lengths: 1.8 over 1.2 is 1.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Surface area is an area, so square it: 1.5 squared is 2.25.', show: 'm.1', focus: 'm.1' },
        { say: '9.5 times 2.25 is 21.375, so the larger tank has a surface area of about 21.4 square metres.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Multiplying an area by k',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying an area by k', md: 'The larger tank is $1.5$ times as tall, but its surface area is **not** $1.5$ times as big: $9.5 \\times 1.5 = 14.25$ is too small. Area grows in two directions, so multiply by $k^2$.' }],
      lines: [
        { say: 'A common mistake is to multiply the area by k. The larger tank is 1.5 times as tall, but its surface area is not 1.5 times as big. Area grows in two directions, so multiply by k squared.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two triangles are similar with scale factor $k = 4$. The small triangle has an area of $5\\ \\text{cm}^2$. What is the area of the large triangle?',
          choices: ['$80\\ \\text{cm}^2$', '$20\\ \\text{cm}^2$', '$320\\ \\text{cm}^2$', '$25\\ \\text{cm}^2$'],
          answer: 0,
          working: 'Areas are multiplied by $k^2 = 16$, so the area is $5 \\times 16 = 80\\ \\text{cm}^2$. B multiplies by $k$, and C by $k^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Two triangles are similar, with a scale factor of four. The small triangle has an area of five square centimetres. What is the area of the large triangle? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Areas are multiplied by k squared, which is sixteen, so the area is eighty square centimetres. B multiplies by k, and C by k cubed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Similar: every length is multiplied by the same $k$.', 'Areas and surface areas are multiplied by $k^2$.', 'Find $k$ from lengths first, then square it.'] }],
      lines: [
        { say: 'Let’s sum up. In similar objects, every length is multiplied by the same scale factor, k.', show: 'sum.0' },
        { say: 'Areas and surface areas are multiplied by k squared.', show: 'sum.1' },
        { say: 'And find k from lengths first, then square it. In part two, we see what happens to volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
