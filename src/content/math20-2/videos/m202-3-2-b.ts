import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm202-3-2-b',
  lessonId: 'm202-3-2',
  title: 'The Cosine Law, Part 2: Finding a Side',
  thumbnailTitle: 'Finding a Side with the Cosine Law',
  thumbnail: 'sas',
  summary: 'Finding the third side from two sides and the contained angle (c ≈ 9.3 cm), why 2ab cos C must be multiplied out before subtracting, and checking the answer against the angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 3.2 · Part 2', title: 'Finding a Side', subtitle: 'Two sides and the contained angle' }],
      lines: [
        { say: 'Two sides of a triangle, and the angle between them, fix the whole triangle. The cosine law finds the third side directly.', show: 'title' },
        { say: 'In this video, you will find a side with the cosine law, and avoid the most common calculator mistake.' },
      ],
    },
    {
      chapter: 'Two sides and the contained angle',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sas', [triangle({ A: [0, 0], B: [5.09, 0], C: [3.73, 4.76], names: ['A', 'B', 'C'], sides: { BC: '9\\text{ cm}', CA: '11\\text{ cm}', AB: 'c' }, tones: { AB: 'opp' }, angles: { C: '54^\\circ' }, angleTones: { C: 'opp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['c^2 = a^2 + b^2 - 2ab\\cos C', 'c^2 = 9^2 + 11^2 - 2(9)(11)\\cos 54^\\circ', 'c^2 \\approx 81 + 121 - 116.38 = 85.62', 'c \\approx \\sqrt{85.62} \\approx 9.3\\text{ cm}'] }],
      lines: [
        { say: 'In acute triangle "A" B C, "a" is nine centimetres, b is eleven centimetres, and angle C is fifty-four degrees. Find c, to the nearest tenth of a centimetre.', show: ['sas.shape', 'sas.names', 'sas.BC', 'sas.CA', 'sas.aC'] },
        { say: 'Angle C is the contained angle of "a" and b, and c is the side opposite it. So use c squared equals "a" squared plus b squared, minus two "a" b cosine C.', show: ['sas.AB', 'm.0'], focus: ['sas.AB', 'sas.aC', 'm.0'] },
        { say: 'Substitute: nine squared, plus eleven squared, minus two times nine times eleven times cosine fifty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'That is eighty-one plus 121, minus about 116.38, which is about 85.62.', show: 'm.2', focus: 'm.2' },
        { say: 'Take the square root: c is about 9.3 centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{9^2 + 11^2} \\approx 14.2', '54^\\circ < 90^\\circ \\text{, so } c < 14.2', '9.3 \\text{ is between } 9 \\text{ and } 11'] }],
      lines: [
        { say: 'Check that the answer makes sense. If angle C were ninety degrees, c would be the square root of eighty-one plus 121, about 14.2.', show: 'm.0', focus: 'm.0' },
        { say: 'Angle C is smaller than ninety, so the sides close in, and c must be shorter than 14.2. It is.', show: 'm.1', focus: 'm.1' },
        { say: 'And fifty-four degrees is the middle-sized angle here, so c should be the middle-sized side, between nine and eleven. It is.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Order of operations',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Order of operations', md: 'Multiply out $2ab\\cos C$ **before** you subtract. Working left to right, $(81 + 121 - 198) \\times \\cos 54^\\circ$, gives a tiny, wrong answer. Type the whole right side in one line, or find $2ab\\cos C$ first.' }],
      lines: [
        { say: 'Be careful with the order of operations. Multiply out two "a" b cosine C before you subtract.', show: 'oops' },
        { say: 'A common error is to work left to right: eighty-one plus 121, minus 198, and then times cosine fifty-four. That gives about 2.35, and a side of about 1.5 centimetres, which is far too small. Type the whole right side in one line, or find two "a" b cosine C first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In acute $\\triangle ABC$, $a = 8$ cm, $b = 10$ cm and $\\angle C = 50^\\circ$. Determine $c$, to the nearest tenth of a centimetre.',
          choices: ['$7.8$ cm', '$12.8$ cm', '$1.6$ cm', '$61.2$ cm'],
          answer: 0,
          working: '$c^2 = 64 + 100 - 160\\cos 50^\\circ \\approx 61.15$, so $c \\approx 7.8$ cm. D forgets the square root, and C subtracts before multiplying.',
        },
      ],
      lines: [
        { say: 'Your turn. In acute triangle "A" B C, "a" is eight centimetres, b is ten centimetres, and angle C is fifty degrees. Find c, to the nearest tenth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. c squared is sixty-four plus 100, minus 160 cosine fifty, about 61.15, so c is about 7.8 centimetres. D forgets the square root, and C works left to right.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For SAS, the unknown side is opposite the contained angle.', 'Find $2ab\\cos C$ before subtracting, then take the square root.', 'Check: the side should fit the size of its opposite angle.'] }],
      lines: [
        { say: 'Let’s sum up. For two sides and the contained angle, the unknown side is opposite the contained angle.', show: 'sum.0' },
        { say: 'Find two "a" b cosine C before you subtract, and then take the square root.', show: 'sum.1' },
        { say: 'And check that the side fits the size of its opposite angle. In part three, we find angles, and use both laws together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
