import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm201-2-3',
  lessonId: 'm201-2-3',
  title: 'The Sine Law, Part 1: Finding Sides',
  thumbnailTitle: 'The Sine Law',
  thumbnail: 'proof',
  summary: 'Oblique triangles and side–angle pairs, a proof of the sine law from the height of the triangle, and finding a side when two angles and a side are known (AAS and ASA). Part 2 finds angles, including obtuse ones, and solves a fire-lookout problem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.3 · Part 1', title: 'The Sine Law', subtitle: 'Solving triangles with no right angle' }],
      lines: [
        { say: 'Forest-fire lookouts, surveyors and ship navigators rarely get a right angle to work with. The sine law lets you solve any triangle where you know a side and the angle opposite it.', show: 'title' },
        { say: 'In this video, you will see why the sine law is true, and use it to find sides.' },
      ],
    },
    {
      chapter: 'Oblique triangles',
      layout: 'split',
      leftWidth: 540,
      left: [figure('lab', [triangle({ A: [0, 0], B: [6, 0], C: [2.5, 4], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b', AB: 'c' }, tones: { BC: 'opp' }, angles: { A: 'A' }, angleTones: { A: 'opp' } })])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Oblique triangle', md: 'A triangle with no right angle. Side $a$ is opposite $\\angle A$, $b$ opposite $\\angle B$, and $c$ opposite $\\angle C$. A side and its opposite angle form a **pair**.' }],
      lines: [
        { say: 'An oblique triangle has no right angle. It can have three acute angles, or one obtuse angle.', show: ['lab.shape', 'lab.names', 'def'] },
        { say: 'We name each side with the lower-case letter of the angle opposite it. Side "a" is opposite angle A, side b is opposite angle B, and side c is opposite angle C.', show: ['lab.BC', 'lab.CA', 'lab.AB'] },
        { say: 'A side and its opposite angle form a pair, like side "a" and angle A.', show: 'lab.aA', focus: ['lab.BC', 'lab.aA'] },
      ],
    },
    {
      chapter: 'Why it works',
      layout: 'split',
      leftWidth: 520,
      left: [figure('proof', [triangle({ A: [0, 0], B: [6, 0], C: [2.5, 4], names: ['A', 'B', 'C'], sides: { BC: 'a', CA: 'b' }, angles: { A: 'A', B: 'B' }, altitude: 'C', altitudeLabel: 'h' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin A = \\dfrac{h}{b} \\;\\Rightarrow\\; h = b\\sin A', '\\sin B = \\dfrac{h}{a} \\;\\Rightarrow\\; h = a\\sin B', 'a\\sin B = b\\sin A', '\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}'] }],
      lines: [
        { say: 'Here is why the sine law is true. Draw the height h from C down to side c. It splits the triangle into two right triangles.', show: ['proof.shape', 'proof.names', 'proof.BC', 'proof.CA', 'proof.alt'], focus: 'proof.alt' },
        { say: 'In the left triangle, the sine of A is h over b, so h equals b sine A.', show: ['proof.aA', 'm.0'], focus: ['proof.aA', 'm.0'] },
        { say: 'In the right triangle, the sine of B is h over "a", so h equals "a" sine B.', show: ['proof.aB', 'm.1'], focus: ['proof.aB', 'm.1'] },
        { say: 'Both equal h, so "a" sine B equals b sine A. Divide both sides by sine A sine B: "a" over sine A equals b over sine B. A height from A brings in c and sine C the same way.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So in any triangle, each side over the sine of its opposite angle gives the same number. You can also flip every fraction. Use it when you know one complete pair, plus one more side or angle.' },
      ],
    },
    {
      chapter: 'Finding a side',
      layout: 'split',
      leftWidth: 520,
      left: [figure('aas', [triangle({ A: [0, 0], B: [5.94, 0], C: [3.92, 4.35], names: ['A', 'B', 'C'], sides: { BC: '12\\text{ cm}', CA: 'b' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '48^\\circ', B: '65^\\circ' }, angleTones: { A: 'opp', B: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{b}{\\sin 65^\\circ} = \\dfrac{12}{\\sin 48^\\circ}', 'b = \\dfrac{12\\sin 65^\\circ}{\\sin 48^\\circ} \\approx 14.6\\text{ cm}'] }],
      lines: [
        { say: 'In triangle ABC, angle A is 48 degrees, angle B is 65 degrees, and side "a" is twelve centimetres. Find side b to the nearest tenth.', show: ['aas.shape', 'aas.names', 'aas.aA', 'aas.aB'] },
        { say: 'The pair "a" and angle A is complete. Side b is opposite angle B. To find a side, put the sides in the numerators: b over sine 65 equals twelve over sine 48.', show: 'm.0', focus: ['aas.BC', 'aas.aA', 'm.0'] },
        { say: 'Multiply both sides by sine 65: b is twelve sine 65 over sine 48, about 14.6 centimetres.', show: 'm.1', focus: ['aas.CA', 'm.1'] },
      ],
    },
    {
      chapter: 'Find the third angle first',
      layout: 'split',
      leftWidth: 520,
      left: [figure('asa', [triangle({ A: [0, 0], B: [6.08, 0], C: [4.4, 3.44], names: ['A', 'B', 'C'], sides: { AB: '15.2\\text{ m}', BC: 'a' }, angles: { A: '38^\\circ', B: '64^\\circ', C: '78^\\circ' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle C = 180^\\circ - 38^\\circ - 64^\\circ = 78^\\circ', '\\dfrac{a}{\\sin 38^\\circ} = \\dfrac{15.2}{\\sin 78^\\circ}', 'a = \\dfrac{15.2\\sin 38^\\circ}{\\sin 78^\\circ} \\approx 9.6\\text{ m}'] }],
      lines: [
        { say: 'Now angle A is 38 degrees, angle B is 64 degrees, and side c is 15.2 metres. Find side "a".', show: ['asa.shape', 'asa.names', 'asa.aA', 'asa.aB'] },
        { say: 'No pair is complete yet: we know side c, but not angle C. The angles of a triangle add to 180, so angle C is 180 minus 38 minus 64: 78 degrees.', show: ['asa.aC', 'm.0'], focus: ['asa.AB', 'asa.aC', 'm.0'] },
        { say: 'Now the pair c and angle C is complete. "a" over sine 38 equals 15.2 over sine 78, so "a" is about 9.6 metres.', show: ['m.1', 'm.2'], focus: ['asa.BC', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$, $\\angle A = 40^\\circ$, $\\angle C = 75^\\circ$ and $a = 8$ cm. Which equation gives $c$?',
          choices: ['$c = \\dfrac{8\\sin 75^\\circ}{\\sin 40^\\circ}$', '$c = \\dfrac{8\\sin 40^\\circ}{\\sin 75^\\circ}$', '$c = 8\\sin 75^\\circ$', '$c = \\dfrac{\\sin 75^\\circ}{8\\sin 40^\\circ}$'],
          answer: 0,
          working: '$\\dfrac{c}{\\sin 75^\\circ} = \\dfrac{8}{\\sin 40^\\circ}$, so $c = \\dfrac{8\\sin 75^\\circ}{\\sin 40^\\circ} \\approx 12.0$ cm.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle ABC, angle A is forty degrees, angle C is 75 degrees, and side "a" is eight centimetres. Which equation gives side c? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. c over sine 75 equals eight over sine forty, so c is eight sine 75 over sine forty: about twelve centimetres. B pairs each side with the wrong angle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Side $a$ is opposite $\\angle A$: a side and its opposite angle are a pair.', '$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$ needs one complete pair.', 'For a side, put sides in the numerators. Find a missing third angle first.'] }],
      lines: [
        { say: 'Let’s sum up. Side "a" is opposite angle A, and a side with its opposite angle is a pair.', show: 'sum.0' },
        { say: 'The sine law says each side over the sine of its opposite angle is the same. It needs one complete pair.', show: 'sum.1' },
        { say: 'To find a side, put the sides in the numerators, and find a missing third angle first. In part two, we find angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
