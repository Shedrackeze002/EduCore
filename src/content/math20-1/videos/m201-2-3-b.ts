import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm201-2-3-b',
  lessonId: 'm201-2-3',
  title: 'The Sine Law, Part 2: Finding Angles',
  thumbnailTitle: 'Finding Angles with the Sine Law',
  thumbnail: 'fire',
  summary: 'Finding an angle with the sine law, why every sine between 0 and 1 belongs to an acute angle and its supplement, finding an obtuse angle, keeping full calculator values, and locating a fire from two lookout towers 18.4 km apart.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.3 · Part 2', title: 'Finding Angles', subtitle: 'The sine law, with sines on top' }],
      lines: [
        { say: 'The sine law finds angles as well as sides. But there is a catch: every sine value belongs to two angles, and the calculator only tells you about one of them.', show: 'title' },
        { say: 'In this video, you will find acute and obtuse angles with the sine law, and solve a real problem.' },
      ],
    },
    {
      chapter: 'An acute angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('acute', [triangle({ A: [0, 0], B: [5.66, 0], C: [1.36, 4.18], names: ['A', 'B', 'C'], sides: { BC: '15\\text{ cm}', CA: '11\\text{ cm}' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '72^\\circ', B: 'B' }, angleTones: { A: 'opp', B: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\sin B}{11} = \\dfrac{\\sin 72^\\circ}{15}', '\\sin B = \\dfrac{11\\sin 72^\\circ}{15} \\approx 0.6974', '\\angle B = \\sin^{-1}(0.6974) \\approx 44.2^\\circ', '\\angle C \\approx 180^\\circ - 72^\\circ - 44.2^\\circ = 63.8^\\circ'] }],
      lines: [
        { say: 'In triangle ABC, angle A is 72 degrees, side a is fifteen centimetres, and side b is eleven centimetres. Find angles B and C.', show: ['acute.shape', 'acute.names', 'acute.aA'] },
        { say: 'To find an angle, put the sines in the numerators: sine B over eleven equals sine 72 over fifteen.', show: ['acute.aB', 'm.0'], focus: ['acute.aB', 'm.0'] },
        { say: 'So sine B is eleven sine 72 over fifteen: about 0.6974. The inverse sine gives about 44.2 degrees.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Could angle B be obtuse? No: side b is shorter than side a, so angle B is smaller than angle A. Then angle C is 180 minus 72 minus 44.2: about 63.8 degrees.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two angles, one sine',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin(180^\\circ - x) = \\sin x', '\\sin 56.1^\\circ \\approx \\sin 123.9^\\circ \\approx 0.83'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The calculator gives the acute one', md: '$\\sin^{-1}$ always gives an angle from $0^\\circ$ to $90^\\circ$. If the angle you need is obtuse, use $180^\\circ$ minus that value.' },
      ],
      lines: [
        { say: 'Every sine value between zero and one belongs to two angles: an acute angle and its supplement, because the sine of 180 minus x equals the sine of x.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, 56.1 degrees and 123.9 degrees have the same sine, about 0.83. In standard position, one is in quadrant one and the other in quadrant two, where the sine is also positive.', show: 'm.1', focus: 'm.1' },
        { say: 'The calculator’s inverse sine always gives the acute angle. If the angle you need is obtuse, subtract the calculator’s answer from 180.', show: 'tip' },
      ],
    },
    {
      chapter: 'An obtuse angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('obt', [triangle({ A: [0, 0], B: [2.96, 0], C: [4.97, 2.99], names: ['A', 'B', 'C'], sides: { BC: '9\\text{ m}', CA: '14.5\\text{ m}' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '31^\\circ', B: 'B' }, angleTones: { A: 'opp', B: 'adj' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sin B = \\dfrac{14.5\\sin 31^\\circ}{9} \\approx 0.8298', '\\sin^{-1}(0.8298) \\approx 56.08^\\circ', '\\angle B \\approx 180^\\circ - 56.08^\\circ \\approx 123.9^\\circ'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding too early', md: 'Keep the full value of $\\sin B$ until the last step. Rounding it to $0.7$ in the first example gives $44.4^\\circ$ instead of $44.2^\\circ$.' },
      ],
      lines: [
        { say: 'In triangle ABC, angle A is 31 degrees, side a is nine metres, side b is 14.5 metres, and angle B is obtuse. Find angle B.', show: ['obt.shape', 'obt.names', 'obt.aA', 'obt.aB'] },
        { say: 'Sine B is 14.5 sine 31 over nine: about 0.8298. The inverse sine gives about 56.08 degrees, but angle B is obtuse.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'So angle B is 180 minus 56.08: about 123.9 degrees.', show: 'm.2', focus: ['obt.aB', 'm.2'] },
        { say: 'Keep the full calculator value of sine B until the last step. Rounding it to 0.7 in the first example gives 44.4 degrees instead of 44.2.', show: 'oops' },
      ],
    },
    {
      chapter: 'Fire lookouts',
      layout: 'split',
      leftWidth: 520,
      left: [figure('fire', [triangle({ A: [0, 0], B: [5.52, 0], C: [3.23, 4.13], names: ['A', 'B', 'F'], sides: { AB: '18.4\\text{ km}', BC: '?' }, tones: { AB: 'adj', BC: 'opp' }, angles: { A: '52^\\circ', B: '61^\\circ', C: '67^\\circ' }, angleTones: { A: 'opp', C: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\angle F = 180^\\circ - 52^\\circ - 61^\\circ = 67^\\circ', '\\dfrac{BF}{\\sin 52^\\circ} = \\dfrac{18.4}{\\sin 67^\\circ}', 'BF = \\dfrac{18.4\\sin 52^\\circ}{\\sin 67^\\circ} \\approx 15.8\\text{ km}'] }],
      lines: [
        { say: 'Two fire lookout towers, A and B, are 18.4 kilometres apart. The ranger in tower A sees smoke at F, at an angle of 52 degrees from the line to B. The ranger in tower B measures 61 degrees. How far is the fire from tower B?', show: ['fire.shape', 'fire.names', 'fire.aA', 'fire.aB'] },
        { say: 'Sketch it, and look for a complete pair. Angle F is 180 minus 52 minus 61: 67 degrees, and it pairs with the known side AB.', show: ['fire.aC', 'm.0'], focus: ['fire.AB', 'fire.aC', 'm.0'] },
        { say: 'BF is opposite angle A. So BF over sine 52 equals 18.4 over sine 67, and BF is about 15.8 kilometres.', show: ['m.1', 'm.2'], focus: ['fire.BC', 'fire.aA', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '$\\sin B = 0.5$ and $\\angle B$ is obtuse. What is $\\angle B$?',
          choices: ['$150^\\circ$', '$30^\\circ$', '$120^\\circ$', '$210^\\circ$'],
          answer: 0,
          working: '$\\sin^{-1}(0.5) = 30^\\circ$, and the obtuse angle with the same sine is $180^\\circ - 30^\\circ = 150^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. The sine of B is 0.5, and angle B is obtuse. What is angle B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The inverse sine of 0.5 is thirty degrees, and the obtuse angle with the same sine is 180 minus thirty: 150 degrees. B is the acute angle, and D is not an angle of a triangle.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For an angle, put the sines in the numerators.', '$\\sin^{-1}$ gives the acute angle; an obtuse angle is $180^\\circ$ minus it.', 'Keep full calculator values until the end.'] }],
      lines: [
        { say: 'Let’s sum up. To find an angle with the sine law, put the sines in the numerators.', show: 'sum.0' },
        { say: 'The inverse sine gives the acute angle. If the angle is obtuse, use 180 minus that value.', show: 'sum.1' },
        { say: 'And keep full calculator values until the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
