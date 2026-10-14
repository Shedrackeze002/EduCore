import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-1-c',
  lessonId: 'm202-3-1',
  title: 'The Sine Law, Part 3: Finding an Angle',
  thumbnailTitle: 'Finding an Angle with the Sine Law',
  thumbnail: 'ssa',
  summary: 'Finding an angle with the sine law and inverse sine (∠B ≈ 53°), why the given information fixes one triangle, finishing the triangle with the angle sum and the sine law, and why rounding too early changes the last answer from 9.7 cm to 9.6 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.1 · Part 3', title: 'Finding an Angle', subtitle: 'Sines on top' }],
      lines: [
        { say: 'The sine law also finds angles. The only extra step is undoing the sine at the end, with the inverse sine key on your calculator.', show: 'title' },
        { say: 'In this video, you will find an angle, and then solve the whole triangle.' },
      ],
    },
    {
      chapter: 'Finding an angle',
      layout: 'split',
      leftWidth: 520,
      left: [figure('ssa', [triangle({ A: [0, 0], B: [5.31, 0], C: [1.6, 4.92], names: ['A', 'B', 'C'], sides: { BC: '11.2\\text{ cm}', CA: '9.4\\text{ cm}' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '72^\\circ', B: '?' }, angleTones: { A: 'opp', B: 'adj' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{\\sin B}{9.4} = \\dfrac{\\sin 72^\\circ}{11.2}', '\\sin B = \\dfrac{9.4\\sin 72^\\circ}{11.2} \\approx 0.7982', '\\angle B = \\sin^{-1}(0.7982) \\approx 53^\\circ'] }],
      lines: [
        { say: 'In acute triangle "A" B C, "a" is 11.2 centimetres, b is 9.4 centimetres, and angle "A" is seventy-two degrees. Find angle B, to the nearest degree.', show: ['ssa.shape', 'ssa.names', 'ssa.BC', 'ssa.CA', 'ssa.aA', 'ssa.aB'] },
        { say: 'Side "a" and angle "A" are a matching pair, and angle B is across from b. To find an angle, put the sines on top: sine B over 9.4 equals sine seventy-two over 11.2.', show: 'm.0', focus: ['ssa.BC', 'ssa.aA', 'm.0'] },
        { say: 'Multiply both sides by 9.4. Sine B is about 0.7982.', show: 'm.1', focus: 'm.1' },
        { say: 'Now undo the sine with the inverse sine key. Angle B is about fifty-three degrees.', show: 'm.2', focus: ['ssa.aB', 'm.2'] },
      ],
    },
    {
      chapter: 'Why there is one answer',
      layout: 'center',
      main: [{ kind: 'callout', id: 'note', tone: 'key', title: 'Why there is only one answer', md: 'The known angle is opposite the **longer** known side ($a > b$), so $\\angle B$ must be smaller than $\\angle A$. That fixes the shape of the triangle. Every triangle in this course is set up so the information fixes one triangle.' }],
      lines: [
        { say: 'Why is there only one answer? The known angle is opposite the longer known side, since "a" is greater than b. So angle B must be smaller than angle "A", and that fixes the shape of the triangle.', show: 'note' },
        { say: 'Every triangle you solve in this course is set up so that the given information fixes exactly one triangle.' },
      ],
    },
    {
      chapter: 'Solving the whole triangle',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\angle C = 180^\\circ - 72^\\circ - 52.96^\\circ = 55.04^\\circ', 'c = \\dfrac{11.2\\sin 55.04^\\circ}{\\sin 72^\\circ} \\approx 9.65 \\approx 9.7\\text{ cm}', '\\text{Rounded too early: } \\dfrac{11.2\\sin 55^\\circ}{\\sin 72^\\circ} \\approx 9.6\\text{ cm}'] },
      ],
      lines: [
        { say: 'Once you know two angles, the angle sum gives the third. Using the full calculator value for angle B, angle C is 180 minus seventy-two minus 52.96, which is 55.04 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the sine law gives the last side: c is 11.2 sine 55.04, over sine seventy-two, which is about 9.65, or 9.7 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'If you had rounded angle B to fifty-three first, angle C would be fifty-five, and c would come out as 9.6 centimetres instead. So keep full calculator values until the very end, and round only your final answers.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In acute $\\triangle ABC$, $a = 9$ cm, $b = 7$ cm and $\\angle A = 64^\\circ$. Determine $\\angle B$, to the nearest degree.',
          choices: ['$44^\\circ$', '$46^\\circ$', '$56^\\circ$', '$35^\\circ$'],
          answer: 0,
          working: '$\\sin B = \\dfrac{7\\sin 64^\\circ}{9} \\approx 0.6991$, so $\\angle B = \\sin^{-1}(0.6991) \\approx 44^\\circ$. It is smaller than $64^\\circ$, because $b < a$.',
        },
      ],
      lines: [
        { say: 'Your turn. In acute triangle "A" B C, "a" is nine centimetres, b is seven centimetres, and angle "A" is sixty-four degrees. Find angle B, to the nearest degree. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sine B is seven sine sixty-four, over nine, about 0.6991, and the inverse sine gives forty-four degrees. That is smaller than sixty-four, as it should be, because b is shorter than "a".', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['To find an angle, put the sines on top and solve for the sine.', 'Then use $\\sin^{-1}$ to find the angle.', 'Keep full calculator values; round only the final answers.'] }],
      lines: [
        { say: 'Let’s sum up. To find an angle, put the sines on top, and solve for the sine of the angle.', show: 'sum.0' },
        { say: 'Then use the inverse sine to find the angle itself.', show: 'sum.1' },
        { say: 'And keep full calculator values until the end, rounding only your final answers. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
