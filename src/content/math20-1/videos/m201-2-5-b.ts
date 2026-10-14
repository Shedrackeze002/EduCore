import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm201-2-5-b',
  lessonId: 'm201-2-5',
  title: 'The Cosine Law, Part 2: Finding Angles and Choosing a Law',
  thumbnailTitle: 'Finding Angles with the Cosine Law',
  thumbnail: 'sss',
  summary: 'Rearranging the cosine law to cos A = (b² + c² − a²)/2bc, finding the largest angle of a triangle from its three sides, why the cosine law is never ambiguous, and choosing between the primary ratios, the sine law and the cosine law. Part 3 solves two-step problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.5 · Part 2', title: 'Finding Angles', subtitle: 'Three sides, and which law to use' }],
      lines: [
        { say: 'If you know all three sides of a triangle, there is no angle to start the sine law with. The cosine law can find an angle instead, and it never gives an ambiguous answer.', show: 'title' },
        { say: 'In this video, you will find angles from three sides, and decide which law fits a problem.' },
      ],
    },
    {
      chapter: 'Rearranging the law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['a^2 = b^2 + c^2 - 2bc\\cos A', '2bc\\cos A = b^2 + c^2 - a^2', '\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Never ambiguous', md: 'A negative cosine means an obtuse angle, and $\\cos^{-1}$ returns it directly. The side opposite the angle you want is the one **subtracted**.' },
      ],
      lines: [
        { say: 'Rearrange the cosine law to isolate the cosine. Add two b c cosine A to both sides, and subtract "a" squared.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Then divide by two b c: the cosine of A is b squared plus c squared minus "a" squared, over two b c. The side opposite the angle you want is the one that is subtracted.', show: 'm.2', focus: 'm.2' },
        { say: 'Unlike the sine law, this is never ambiguous. The cosine of an obtuse angle is negative, so a negative cosine means an obtuse angle, and the inverse cosine returns it directly.', show: 'tip' },
      ],
    },
    {
      chapter: 'The largest angle',
      layout: 'split',
      leftWidth: 500,
      left: [figure('sss', [triangle({ A: [0, 0], B: [5.2, 0], C: [3.09, 1.84], names: ['Q', 'R', 'P'], sides: { AB: '13\\text{ cm}', BC: '7\\text{ cm}', CA: '9\\text{ cm}' }, tones: { AB: 'opp' }, angles: { C: '108.0^\\circ' }, angleTones: { C: 'opp' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\cos P = \\dfrac{7^2 + 9^2 - 13^2}{2(7)(9)}', '= \\dfrac{-39}{126} \\approx -0.3095', '\\angle P = \\cos^{-1}(-0.3095) \\approx 108.0^\\circ'] }],
      lines: [
        { say: 'In triangle PQR, p is thirteen centimetres, q is seven, and r is nine. Find the largest angle.', show: ['sss.shape', 'sss.names'] },
        { say: 'The largest angle is opposite the longest side, so find angle P, opposite the thirteen. Thirteen is the side subtracted: the cosine of P is seven squared plus nine squared minus thirteen squared, over two times seven times nine.', show: 'm.0', focus: ['sss.AB', 'm.0'] },
        { say: 'That is negative 39 over 126: about negative 0.3095. The cosine is negative, so the angle is obtuse.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse cosine gives about 108.0 degrees.', show: ['m.2', 'sss.aC'], focus: ['sss.aC', 'm.2'] },
        { say: 'When you solve a whole triangle from three sides, find the largest angle first with the cosine law. The other two must then be acute, so you can safely finish with the sine law.' },
      ],
    },
    {
      chapter: 'Choosing a law',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['You know', 'Use'], rows: [['a right angle', 'the primary trigonometric ratios'], ['two angles and any side (AAS or ASA)', 'the sine law'], ['two sides and a non-contained angle (SSA)', 'the sine law: check the ambiguous case'], ['two sides and the contained angle (SAS)', 'the cosine law'], ['three sides (SSS)', 'the cosine law']] }],
      lines: [
        { say: 'Which tool should you use? With a right angle, use the primary trigonometric ratios: SOH CAH TOA.', show: 't.0', focus: 't.0' },
        { say: 'With two angles and any side, use the sine law, finding the third angle first if you need to. With two sides and an angle that is not between them, use the sine law too, but check the ambiguous case.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'With two sides and the angle between them, or all three sides, there is no complete pair, so use the cosine law.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'In short: use the sine law when you have a complete side and angle pair, and the cosine law when you do not.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle ABC$, $a = 8$, $b = 5$ and $c = 6$. Which expression gives $\\cos A$?',
          choices: ['$\\dfrac{5^2 + 6^2 - 8^2}{2(5)(6)}$', '$\\dfrac{8^2 + 5^2 - 6^2}{2(8)(5)}$', '$\\dfrac{5^2 + 6^2 + 8^2}{2(5)(6)}$', '$\\dfrac{8^2 - 5^2 - 6^2}{2(5)(6)}$'],
          answer: 0,
          working: 'The side opposite $\\angle A$, $a = 8$, is the one subtracted: $\\cos A = \\dfrac{25 + 36 - 64}{60} = -0.05$, so $\\angle A \\approx 92.9^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle ABC, "a" is eight, b is five, and c is six. Which expression gives the cosine of A? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The side opposite angle A, eight, is the one subtracted. The cosine comes out at negative 0.05, so angle A is just over ninety degrees. B is the expression for the cosine of C.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$: subtract the side opposite the angle.', 'The cosine law is never ambiguous.', 'Sine law with a complete pair; cosine law without one.'] }],
      lines: [
        { say: 'Let’s sum up. To find an angle from three sides, the cosine is b squared plus c squared minus "a" squared, over two b c, subtracting the side opposite the angle.', show: 'sum.0' },
        { say: 'A negative cosine means an obtuse angle, so the cosine law is never ambiguous.', show: 'sum.1' },
        { say: 'And use the sine law with a complete pair, and the cosine law without one. In part three, we solve problems that take two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
