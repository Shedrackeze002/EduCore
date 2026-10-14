import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { twoTriangles } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm203-4-2-b',
  lessonId: 'm203-4-2',
  title: 'Problems with Two Right Triangles, Part 2: Triangles on Opposite Sides',
  thumbnailTitle: 'Two Triangles, Opposite Sides',
  thumbnail: 'tw',
  summary: 'A four-step plan for two-triangle problems, two technicians on opposite sides of a 45 m wind turbine tower at 38° and 52° (about 92.8 m apart), and a 6 m ladder swung across an alley (about 4.5 m wide), adding the pieces.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 4.2 · Part 2', title: 'Triangles on Opposite Sides', subtitle: 'Find the shared side, then add' }],
      lines: [
        { say: 'Many measuring jobs use two right triangles that share a side. The key skill is spotting the shared side, and deciding which triangle to solve first.', show: 'title' },
        { say: 'In this video, you will solve two triangles that sit on opposite sides of a shared side.' },
      ],
    },
    {
      chapter: 'A plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Sketch** both triangles and mark the right angles.', '**Find the shared side**: a height, a ground distance or a ladder.', '**Solve one triangle at a time**, with SOH CAH TOA or the Pythagorean theorem.', '**Combine**: add or subtract the pieces.'] }],
      lines: [
        { say: 'Use the same plan every time. Sketch both triangles, and mark the right angles.', show: 'b.0' },
        { say: 'Find the shared side. Is it a height, a ground distance, or a ladder?', show: 'b.1' },
        { say: 'Solve one triangle at a time.', show: 'b.2' },
        { say: 'Then combine the pieces: decide whether to add or subtract.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Opposite sides of a tower',
      layout: 'split',
      leftWidth: 700,
      left: [figure('wt', [twoTriangles({ arrangement: 'opposite', h: 45, a1: 38, a2: 52, labels: { h: '45\\text{ m}', a1: '38^\\circ', a2: '52^\\circ', x: 'x' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d_1 = \\dfrac{45}{\\tan 38^\\circ} \\approx 57.60', 'd_2 = \\dfrac{45}{\\tan 52^\\circ} \\approx 35.16', 'x \\approx 57.60 + 35.16', '\\approx 92.8 \\text{ m}'] }],
      lines: [
        { say: 'Two survey technicians stand on opposite sides of a forty-five-metre wind turbine tower, in line with its base. The angles of elevation to the top are thirty-eight degrees and fifty-two degrees. How far apart are they?', show: ['wt.ground', 'wt.height', 'wt.right', 'wt.sight1', 'wt.sight2', 'wt.a1', 'wt.a2'] },
        { say: 'The shared side is the tower. In each triangle, it is opposite the angle, and the ground distance is adjacent: TOA. On the left, the distance is forty-five over tangent thirty-eight degrees, about 57.60 metres.', show: 'm.0', focus: ['wt.sight1', 'wt.a1', 'm.0'] },
        { say: 'On the right, forty-five over tangent fifty-two degrees, about 35.16 metres.', show: 'm.1', focus: ['wt.sight2', 'wt.a2', 'm.1'] },
        { say: 'The technicians are on opposite sides of the tower, so add the two distances: about 92.8 metres apart.', show: ['wt.x', 'm.2', 'm.3'], focus: ['wt.x', 'm.3'] },
      ],
    },
    {
      chapter: 'A ladder in an alley',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['d_1 = 6\\cos 72^\\circ \\approx 1.85 \\text{ m}', 'd_2 = 6\\cos 64^\\circ \\approx 2.63 \\text{ m}', '1.85 + 2.63 \\approx 4.5 \\text{ m}'] }],
      lines: [
        { say: 'The foot of a six-metre ladder stands between two buildings. Leaned on one wall, it makes a seventy-two degree angle with the ground. Swung to the other wall, it makes a sixty-four degree angle. How wide is the alley? This time, the shared side is the ladder: the hypotenuse of both triangles. Each ground distance is adjacent: CAH.', show: 'm.0', focus: 'm.0' },
        { say: 'The first distance is six times cosine seventy-two degrees, about 1.85 metres. The second is six times cosine sixty-four degrees, about 2.63 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'The two distances are on either side of the ladder’s foot, so add: the alley is about 4.5 metres wide.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Two people stand on opposite sides of a $30$ m flagpole, in line with it. Their angles of elevation to the top are $40^\\circ$ and $55^\\circ$. How far apart are they?',
          choices: ['$56.8$ m', '$14.7$ m', '$68.0$ m', '$35.8$ m'],
          answer: 0,
          working: '$\\dfrac{30}{\\tan 40^\\circ} \\approx 35.75$ and $\\dfrac{30}{\\tan 55^\\circ} \\approx 21.01$. Opposite sides, so add: about $56.8$ m. B subtracts.',
        },
      ],
      lines: [
        { say: 'Your turn. Two people stand on opposite sides of a thirty-metre flagpole, in line with it. Their angles of elevation to the top are forty degrees and fifty-five degrees. How far apart are they? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The distances are thirty over tangent forty, about 35.75, and thirty over tangent fifty-five, about 21.01. They are on opposite sides, so add: about 56.8 metres. B subtracts.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch both triangles and find the shared side.', 'Solve one triangle at a time.', 'Opposite sides: add the pieces.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch both triangles, and find the side they share.', show: 'sum.0' },
        { say: 'Solve one triangle at a time.', show: 'sum.1' },
        { say: 'And when the triangles are on opposite sides, add the pieces. In part three, we see when to subtract. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
