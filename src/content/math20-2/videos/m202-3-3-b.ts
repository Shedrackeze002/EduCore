import type { DiagramItem, Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

type P = [number, number];

const S: P = [0, 0];
const P1: P = [-2.23, 3.56];
const Q1: P = [1.91, 3.05];

/** A lake: an oval around the segment from `p` to `q`, a little longer than it. */
function lake(p: P, q: P): Part {
  const c: P = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const half = Math.hypot(q[0] - p[0], q[1] - p[1]) / 2 + 0.25;
  const t = Math.atan2(q[1] - p[1], q[0] - p[0]);
  const points: Record<string, P> = {};
  const ids: string[] = [];
  for (let i = 0; i < 40; i++) {
    const u = (i / 40) * 2 * Math.PI;
    const [x, y] = [half * Math.cos(u), 0.75 * Math.sin(u)];
    points[`w${i}`] = [c[0] + x * Math.cos(t) - y * Math.sin(t), c[1] + 0.35 + x * Math.sin(t) + y * Math.cos(t)];
    ids.push(`w${i}`);
  }
  const items: DiagramItem[] = [{ kind: 'region', id: 'water', points: ids, tone: 'adj', shade: 0.25 }];
  return { points, items };
}

const video: Explainer = {
  id: 'm202-3-3-b',
  lessonId: 'm202-3-3',
  title: 'Solving Problems with the Sine and Cosine Laws, Part 2: Surveying and Navigation',
  thumbnailTitle: 'Surveying and Navigation',
  thumbnail: 'lk',
  summary: 'Measuring the length of a lake from one point with the cosine law (about 416 m), and locating a fire from two lookout towers with the angle sum and the sine law (about 20.9 km).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.3 · Part 2', title: 'Surveying and Navigation', subtitle: 'Distances you cannot walk' }],
      lines: [
        { say: 'Some distances cannot be measured with a tape: across a lake, or out to a forest fire. But the distances and angles around them can, and a triangle does the rest.', show: 'title' },
        { say: 'In this video, you will measure a lake with the cosine law, and locate a fire with the sine law.' },
      ],
    },
    {
      chapter: 'Measuring a lake',
      layout: 'split',
      leftWidth: 380,
      left: [figure('lk', [lake(P1, Q1), triangle({ A: S, B: P1, C: Q1, names: ['S', 'P', 'Q'], sides: { AB: '420\\text{ m}', CA: '360\\text{ m}', BC: '?' }, tones: { BC: 'opp' }, angles: { A: '64^\\circ' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['PQ^2 = 420^2 + 360^2 - 2(420)(360)\\cos 64^\\circ', 'PQ^2 \\approx 306\\,000 - 132\\,563.43', 'PQ^2 \\approx 173\\,436.57', 'PQ \\approx 416\\text{ m}'] }],
      lines: [
        { say: 'A surveyor at point S measures 420 metres to point P, at one end of a lake, and 360 metres to point Q, at the other end. The angle between the two lines of sight is sixty-four degrees. How long is the lake, to the nearest metre?', show: ['lk.water', 'lk.shape', 'lk.names', 'lk.AB', 'lk.CA', 'lk.aA'] },
        { say: 'The sixty-four degree angle is between the two known sides, and the length of the lake is opposite it. That is two sides and the contained angle, so use the cosine law.', show: ['lk.BC', 'm.0'], focus: ['lk.BC', 'lk.aA', 'm.0'] },
        { say: 'The squares are 176,400 and 129,600, which add to 306,000. And two times 420 times 360 times cosine sixty-four is about 132,563.43.', show: 'm.1', focus: 'm.1' },
        { say: 'So P Q squared is about 173,436.57. Take the square root: the lake is about 416 metres long.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Locating a fire',
      layout: 'split',
      leftWidth: 480,
      left: [figure('fr', [triangle({ A: [0, 0], B: [5.55, 0], C: [3.42, 5.27], names: ['A', 'B', 'F'], sides: { AB: '18.5\\text{ km}', CA: '?' }, tones: { CA: 'opp' }, angles: { A: '57^\\circ', B: '68^\\circ', C: '55^\\circ' }, angleTones: { B: 'opp', C: 'adj' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle F = 180^\\circ - 57^\\circ - 68^\\circ = 55^\\circ', '\\dfrac{AF}{\\sin 68^\\circ} = \\dfrac{18.5}{\\sin 55^\\circ}', 'AF = \\dfrac{18.5\\sin 68^\\circ}{\\sin 55^\\circ} \\approx 20.9\\text{ km}'] }],
      lines: [
        { say: 'Two fire lookout towers, "A" and B, are 18.5 kilometres apart. Both spot smoke at F. At "A", the angle between the line to B and the line to F is fifty-seven degrees. At B, the angle is sixty-eight degrees. How far is the fire from tower "A"?', show: ['fr.shape', 'fr.names', 'fr.AB', 'fr.aA', 'fr.aB'] },
        { say: 'The known side, "A" B, is opposite angle F, which is not given. So use the angle sum first: angle F is 180 minus fifty-seven minus sixty-eight, which is fifty-five degrees.', show: ['fr.aC', 'm.0'], focus: ['fr.AB', 'fr.aC', 'm.0'] },
        { say: 'Now "A" B and angle F are a matching pair. The distance "A" F is opposite angle B, so "A" F over sine sixty-eight equals 18.5 over sine fifty-five.', show: ['fr.CA', 'm.1'], focus: ['fr.CA', 'fr.aB', 'm.1'] },
        { say: '"A" F is 18.5 sine sixty-eight, over sine fifty-five, so the fire is about 20.9 kilometres from tower "A".', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'From a point, it is $300$ m to one end of a pond and $250$ m to the other end, with $48^\\circ$ between the lines of sight. How long is the pond, to the nearest metre?',
          choices: ['$228$ m', '$391$ m', '$41$ m', '$52\\,130$ m'],
          answer: 0,
          working: '$d^2 = 300^2 + 250^2 - 2(300)(250)\\cos 48^\\circ \\approx 52\\,130$, so $d \\approx 228$ m. D forgets the square root, and C subtracts before multiplying.',
        },
      ],
      lines: [
        { say: 'Your turn. From a point, it is 300 metres to one end of a pond, and 250 metres to the other end, with forty-eight degrees between the lines of sight. How long is the pond? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. This is two sides and the contained angle, so use the cosine law. d squared is about 52,130, and d is about 228 metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Sketch the situation as a triangle and mark what you know.', 'An angle between two measured distances: cosine law.', 'Two angles and the distance between them: angle sum, then sine law.'] }],
      lines: [
        { say: 'Let’s sum up. Sketch the situation as a triangle, and mark what you know.', show: 'sum.0' },
        { say: 'An angle between two measured distances calls for the cosine law.', show: 'sum.1' },
        { say: 'And two angles, with the distance between them, call for the angle sum, then the sine law. In part three, we solve problems that take two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
