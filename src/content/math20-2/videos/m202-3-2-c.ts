import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-2-c',
  lessonId: 'm202-3-2',
  title: 'The Cosine Law, Part 3: Finding an Angle and Using Both Laws',
  thumbnailTitle: 'Finding Angles with the Cosine Law',
  thumbnail: 'sss',
  summary: 'Rearranging the cosine law to find an angle from three sides (the largest angle of a 7, 9, 10 triangle is about 76°), then using the cosine law for a side and the sine law for an angle in the same triangle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.2 · Part 3', title: 'Finding Angles', subtitle: 'Three sides, and both laws' }],
      lines: [
        { say: 'Three sides fix a triangle completely, so its angles are already decided. The cosine law can find them.', show: 'title' },
        { say: 'In this video, you will find an angle from three sides, and then use the cosine law and the sine law together.' },
      ],
    },
    {
      chapter: 'Rearranging for the angle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C', '\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}'] },
      ],
      lines: [
        { say: 'To find an angle, rearrange the cosine law so the cosine is on its own. Add two "a" b cosine C to both sides, subtract c squared, and divide by two "a" b.', show: 'm.0', focus: 'm.0' },
        { say: 'Cosine C equals "a" squared plus b squared, minus c squared, all over two "a" b. The side opposite the angle you want is the one that is subtracted.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Three sides',
      layout: 'split',
      leftWidth: 520,
      left: [figure('sss', [triangle({ A: [0, 0], B: [5, 0], C: [3.3, 3.06], names: ['D', 'E', 'F'], sides: { BC: '7\\text{ m}', CA: '9\\text{ m}', AB: '10\\text{ m}' }, tones: { AB: 'opp' }, angles: { C: '?' }, angleTones: { C: 'opp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos F = \\dfrac{7^2 + 9^2 - 10^2}{2(7)(9)}', '\\cos F = \\dfrac{30}{126} \\approx 0.2381', '\\angle F = \\cos^{-1}(0.2381) \\approx 76^\\circ'] }],
      lines: [
        { say: 'In acute triangle D E F, d is seven metres, e is nine metres, and f is ten metres. Find the largest angle, to the nearest degree.', show: ['sss.shape', 'sss.names', 'sss.BC', 'sss.CA', 'sss.AB'] },
        { say: 'The largest angle is opposite the longest side, f, so find angle F. Ten squared is the term that is subtracted.', show: ['sss.aC', 'm.0'], focus: ['sss.AB', 'sss.aC', 'm.0'] },
        { say: 'Forty-nine plus eighty-one, minus 100, is thirty, and two times seven times nine is 126. So cosine F is thirty over 126, about 0.2381.', show: 'm.1', focus: 'm.1' },
        { say: 'Use the inverse cosine: angle F is about seventy-six degrees.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Using both laws',
      layout: 'split',
      leftWidth: 440,
      left: [figure('pq', [triangle({ A: [0, 0], B: [5.04, 0], C: [3.52, 4.37], names: ['P', 'Q', 'R'], sides: { BC: '14\\text{ m}', CA: '17\\text{ m}', AB: 'r' }, tones: { AB: 'opp' }, angles: { C: '58^\\circ', A: 'P' }, angleTones: { C: 'opp', A: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r^2 = 14^2 + 17^2 - 2(14)(17)\\cos 58^\\circ', 'r^2 \\approx 232.76,\\quad r \\approx 15.3\\text{ m}', '\\sin P = \\dfrac{14\\sin 58^\\circ}{15.26} \\approx 0.7782', '\\angle P \\approx 51^\\circ'] }],
      lines: [
        { say: 'In acute triangle P Q R, p is fourteen metres, q is seventeen metres, and angle R is fifty-eight degrees. Find r, and angle P.', show: ['pq.shape', 'pq.names', 'pq.BC', 'pq.CA', 'pq.aC'] },
        { say: 'This is two sides and the contained angle, so start with the cosine law. r squared is about 232.76, and r is about 15.3 metres.', show: ['pq.AB', 'm.0', 'm.1'], focus: ['pq.AB', 'm.1'] },
        { say: 'Now r and angle R are a matching pair, so the sine law can finish the job. Using the full value of r, sine P is fourteen sine fifty-eight over 15.26, about 0.7782.', show: ['pq.aA', 'm.2'], focus: ['pq.aA', 'm.2'] },
        { say: 'So angle P is about fifty-one degrees. Check: p is the shortest side, and angle P is the smallest angle. Angle Q is about seventy-one degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An acute triangle has sides $6$ cm, $8$ cm and $9$ cm. Determine its largest angle, to the nearest degree.',
          choices: ['$79^\\circ$', '$41^\\circ$', '$61^\\circ$', '$101^\\circ$'],
          answer: 0,
          working: 'The largest angle is opposite $9$: $\\cos\\theta = \\dfrac{6^2 + 8^2 - 9^2}{2(6)(8)} = \\dfrac{19}{96} \\approx 0.1979$, so $\\theta \\approx 79^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. An acute triangle has sides six, eight and nine centimetres. Find its largest angle, to the nearest degree. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The largest angle is opposite the nine. Thirty-six plus sixty-four, minus eighty-one, is nineteen, and nineteen over ninety-six is about 0.1979. The inverse cosine gives seventy-nine degrees.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$: subtract the side opposite the angle.', 'The largest angle is opposite the longest side.', 'After the cosine law gives a side, the sine law can find the angles.'] }],
      lines: [
        { say: 'Let’s sum up. To find an angle, rearrange the cosine law, and subtract the square of the side opposite the angle you want.', show: 'sum.0' },
        { say: 'The largest angle is always opposite the longest side.', show: 'sum.1' },
        { say: 'And after the cosine law gives a side, you have a matching pair, so the sine law can find the other angles. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
