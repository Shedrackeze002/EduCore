import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm201-2-5',
  lessonId: 'm201-2-5',
  title: 'The Cosine Law, Part 1: Finding a Side',
  thumbnailTitle: 'The Cosine Law',
  thumbnail: 'proof',
  summary: 'Why the sine law cannot start without a side–angle pair, a proof of the cosine law a² = b² + c² − 2bc cos A from the height of the triangle, its link to the Pythagorean theorem, and finding the third side from two sides and the angle between them (SAS), including an obtuse angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.5 · Part 1', title: 'The Cosine Law', subtitle: 'The Pythagorean theorem, corrected' }],
      lines: [
        { say: 'The sine law needs a complete side and angle pair. When you know two sides and the angle between them, there is no pair to start with.', show: 'title' },
        { say: 'The cosine law handles that case, and it turns out to be the Pythagorean theorem with a correction. In this video, you will see why it works, and use it to find a side.' },
      ],
    },
    {
      chapter: 'Proving the cosine law',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('proof', [
          triangle({ A: [0, 0], B: [6.5, 0], C: [4.5, 5], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: 'A' }, altitude: 'C', altitudeLabel: 'h' }),
          { points: { xl: [2.25, 0], cl: [5.5, 0] }, items: [{ kind: 'label', id: 'x', at: 'xl', tex: 'x', place: 'below', group: 'parts' }, { kind: 'label', id: 'cx', at: 'cl', tex: 'c - x', place: 'below', group: 'parts' }] },
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x = b\\cos A,\\quad h^2 = b^2 - x^2', 'a^2 = h^2 + (c - x)^2', 'a^2 = b^2 - x^2 + c^2 - 2cx + x^2', 'a^2 = b^2 + c^2 - 2bc\\cos A'] }],
      lines: [
        { say: 'Draw the height h from C to side c, meeting it at D. Call the part of side c from A to D, x. Then the rest of side c is c minus x.', show: ['proof.shape', 'proof.names', 'proof.BC', 'proof.CA', 'proof.alt', 'proof.parts'], focus: ['proof.alt', 'proof.parts'] },
        { say: 'In the left right triangle, x is b cosine A, and by the Pythagorean theorem, h squared is b squared minus x squared.', show: ['proof.aA', 'm.0'], focus: ['proof.CA', 'm.0'] },
        { say: 'In the right right triangle, "a" squared is h squared plus c minus x, all squared.', show: 'm.1', focus: ['proof.BC', 'm.1'] },
        { say: 'Substitute for h squared and expand. The x squared terms cancel, leaving b squared plus c squared minus two c x.', show: 'm.2', focus: 'm.2' },
        { say: 'Finally, replace x with b cosine A: "a" squared equals b squared plus c squared, minus two b c cosine A. That is the cosine law.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The Pythagorean link',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a^2 = b^2 + c^2 - 2bc\\cos A', 'b^2 = a^2 + c^2 - 2ac\\cos B', 'c^2 = a^2 + b^2 - 2ab\\cos C'] },
        { kind: 'bullets', id: 'b', items: ['$\\angle A = 90^\\circ$: $\\cos A = 0$, so $a^2 = b^2 + c^2$.', '$\\angle A$ obtuse: $\\cos A < 0$, so the last term **adds**.'] },
      ],
      lines: [
        { say: 'The same argument works for every side, so there are three versions. Each starts with one side squared, and ends with the cosine of the angle opposite it.', show: ['m.0', 'm.1', 'm.2'] },
        { say: 'If angle A is ninety degrees, the cosine of "A" is zero, and the law becomes "a" squared equals b squared plus c squared: the Pythagorean theorem.', show: 'b.0', focus: 'b.0' },
        { say: 'If angle A is obtuse, its cosine is negative, so the last term adds. Side a is then longer than it would be in a right triangle.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Finding a side',
      layout: 'split',
      leftWidth: 480,
      left: [figure('sas', [triangle({ A: [0, 0], B: [4.95, 0], C: [2.22, 2.84], names: ['A', 'B', 'C'], sides: { AB: '11\\text{ m}', CA: '8\\text{ m}', BC: 'a' }, tones: { BC: 'opp' }, angles: { A: '52^\\circ' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a^2 = 8^2 + 11^2 - 2(8)(11)\\cos 52^\\circ', 'a^2 \\approx 185 - 108.36 = 76.64', 'a \\approx \\sqrt{76.64} \\approx 8.8\\text{ m}'] }],
      lines: [
        { say: 'In triangle ABC, b is eight metres, c is eleven metres, and angle A, between them, is 52 degrees. Find side "a" to the nearest tenth.', show: ['sas.shape', 'sas.names', 'sas.aA'] },
        { say: 'Two sides and the angle between them: that is SAS, so use the cosine law. "a" squared is eight squared plus eleven squared, minus two times eight times eleven times cosine 52.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 185 minus about 108.36: about 76.64. So a is the square root, about 8.8 metres.', show: ['m.1', 'm.2'], focus: ['sas.BC', 'm.2'] },
      ],
    },
    {
      chapter: 'An obtuse angle',
      layout: 'split',
      leftWidth: 400,
      left: [figure('obt', [triangle({ A: [0, 0], B: [3.68, 0], C: [-1.22, 2.3], names: ['A', 'B', 'C'], sides: { AB: '9.2\\text{ cm}', CA: '6.5\\text{ cm}', BC: 'a' }, tones: { BC: 'opp' }, angles: { A: '118^\\circ' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['a^2 = 6.5^2 + 9.2^2 - 2(6.5)(9.2)\\cos 118^\\circ', '\\cos 118^\\circ \\approx -0.4695:\\ a^2 \\approx 183.04', 'a \\approx 13.5\\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Order of operations', md: 'Find $2bc\\cos A$ as one product and subtract it last. $(b^2 + c^2 - 2bc)\\cos A$ is a common calculator error.' },
      ],
      lines: [
        { say: 'Now b is 6.5 centimetres, c is 9.2 centimetres, and angle A is 118 degrees. Find a.', show: ['obt.shape', 'obt.names', 'obt.aA'] },
        { say: '"a" squared is 6.5 squared plus 9.2 squared, minus two times 6.5 times 9.2 times cosine 118.', show: 'm.0', focus: 'm.0' },
        { say: 'The cosine of 118 degrees is negative, about negative 0.4695, so the last term adds. "a" squared is about 183.04, and a is about 13.5 centimetres.', show: ['m.1', 'm.2'], focus: ['obt.BC', 'm.2'] },
        { say: 'Watch the order of operations: find two b c cosine A as one product, and subtract it last. Working left to right gives a very wrong answer.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$, $b = 5$, $c = 7$ and $\\angle A = 60^\\circ$. Find $a$.',
          choices: ['$\\sqrt{39} \\approx 6.2$', '$\\sqrt{74} \\approx 8.6$', '$\\sqrt{109} \\approx 10.4$', '$7$'],
          answer: 0,
          working: '$a^2 = 25 + 49 - 2(5)(7)(0.5) = 74 - 35 = 39$, so $a = \\sqrt{39} \\approx 6.2$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle ABC, b is five, c is seven, and angle A is sixty degrees. Find a. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. "a" squared is 25 plus 49, minus two times five times seven times one half: 74 minus 35, which is 39. So a is root 39, about 6.2. B leaves out the correction term, and C adds it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$a^2 = b^2 + c^2 - 2bc\\cos A$.', 'Use it for two sides and the angle between them (SAS).', 'An obtuse angle has a negative cosine, so the last term adds.'] }],
      lines: [
        { say: 'Let’s sum up. The cosine law says "a" squared equals b squared plus c squared, minus two b c cosine A.', show: 'sum.0' },
        { say: 'Use it to find the third side when you know two sides and the angle between them.', show: 'sum.1' },
        { say: 'And an obtuse angle has a negative cosine, so the last term adds. In part two, we find angles, and choose between the laws. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
