import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rad } from './lib/m301-6-figures.ts';

const at = (deg: number, r = 4): [number, number] => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))];

const video: Explainer = {
  id: 'm301-6-2-b',
  lessonId: 'm301-6-2',
  title: 'Sum, Difference and Double-Angle Identities, Part 2: Exact Values',
  thumbnailTitle: 'Exact Values with Sums and Differences',
  thumbnail: 'ang',
  summary: 'Finding exact values by writing an angle as a sum or difference of special angles: sin 75° = sin(45° + 30°) = (√6 + √2)/4, and tan(π/12) = tan(π/3 − π/4) = 2 − √3, rationalizing with a conjugate.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 6.2 · Part 2', title: 'Exact Values', subtitle: 'Write the angle as a sum or difference of special angles' }],
      lines: [
        { say: 'Special angles like 30, 45 and 60 degrees have exact trigonometric ratios. With the sum and difference identities, you can find exact values for many more angles.', show: 'title' },
        { say: 'In this video, you will find the exact values of sine 75 degrees and tan pi over twelve.' },
      ],
    },
    {
      chapter: 'Special angles',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('ang', [{
          points: { O: [0, 0], X: [4.6, 0], P45: at(45), P75: at(75) },
          items: [
            { kind: 'line', id: 'axis', from: 'O', to: 'X', tone: 'muted', weight: 2 },
            { kind: 'line', id: 'a45', from: 'O', to: 'P45', tone: 'adj', weight: 3.5 },
            { kind: 'line', id: 'a75', from: 'O', to: 'P75', tone: 'brand', weight: 3.5 },
            { kind: 'angle', id: 'g45', at: 'O', from: 'X', to: 'P45', tone: 'adj', label: '45^\\circ', r: 70, labelDist: 112 },
            { kind: 'angle', id: 'g30', at: 'O', from: 'P45', to: 'P75', tone: 'opp', label: '30^\\circ', r: 70, labelDist: 112 },
            { kind: 'angle', id: 'g75', at: 'O', from: 'X', to: 'P75', tone: 'theta', label: '75^\\circ', r: 175, labelDist: 205, labelAt: 0.12 },
          ],
        }]),
      ],
      right: [
        {
          kind: 'table',
          id: 't',
          head: ['$\\theta$', '$\\sin\\theta$', '$\\cos\\theta$', '$\\tan\\theta$'],
          rows: [
            ['$30^\\circ$', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{3}}{3}$'],
            ['$45^\\circ$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$'],
            ['$60^\\circ$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{1}{2}$', '$\\sqrt{3}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are the exact ratios of the special angles, 30, 45 and 60 degrees, from the special triangles. Their relatives in the other quadrants work too.', show: 't' },
        { say: 'The trick is to write a new angle as a sum or difference of two special angles. For example, 75 degrees is 45 degrees plus 30 degrees.', show: ['ang.axis', 'ang.a45', 'ang.a75', 'ang.g45', 'ang.g30'], focus: ['ang.g45', 'ang.g30'] },
        { say: 'So the sum identities can turn the ratios of 75 degrees into the ratios of 45 and 30 degrees, which you know exactly.', show: 'ang.g75', focus: 'ang.g75' },
      ],
    },
    {
      chapter: 'The sine of 75°',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sin 75^\\circ = \\sin(45^\\circ + 30^\\circ)',
            '= \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ',
            '= \\left(\\dfrac{\\sqrt{2}}{2}\\right)\\left(\\dfrac{\\sqrt{3}}{2}\\right) + \\left(\\dfrac{\\sqrt{2}}{2}\\right)\\left(\\dfrac{1}{2}\\right)',
            '= \\dfrac{\\sqrt{6}}{4} + \\dfrac{\\sqrt{2}}{4} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4} \\approx 0.9659',
          ],
        },
      ],
      lines: [
        { say: 'Determine the exact value of sine 75 degrees. Write it as the sine of 45 degrees plus 30 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the sum identity: sine 45 degrees cosine 30 degrees, plus cosine 45 degrees sine 30 degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute the exact values: root two over two, times root three over two, plus root two over two, times one half.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply. Root two times root three is root six, so the first product is root six over four, and the second is root two over four. Together, sine 75 degrees is root six plus root two, all over four. That is about 0.9659, just as the calculator said.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A tangent in radians',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\dfrac{\\pi}{12} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}',
            '\\tan\\dfrac{\\pi}{12} = \\dfrac{\\tan\\frac{\\pi}{3} - \\tan\\frac{\\pi}{4}}{1 + \\tan\\frac{\\pi}{3}\\tan\\frac{\\pi}{4}} = \\dfrac{\\sqrt{3} - 1}{1 + \\sqrt{3}}',
            '= \\dfrac{(\\sqrt{3} - 1)(\\sqrt{3} - 1)}{(\\sqrt{3} + 1)(\\sqrt{3} - 1)} = \\dfrac{4 - 2\\sqrt{3}}{2}',
            '= 2 - \\sqrt{3} \\approx 0.2679',
          ],
        },
      ],
      lines: [
        { say: 'Now determine the exact value of tan pi over twelve. Pi over twelve is fifteen degrees, which is sixty degrees minus forty-five degrees. In radians, that is pi over three minus pi over four.', show: 'm.0', focus: 'm.0' },
        { say: 'Use the difference identity for tangent: tan pi over three minus tan pi over four, all over one plus tan pi over three times tan pi over four. Remember, the bottom has the opposite sign.', show: 'm.1', focus: 'm.1' },
        { say: 'Tan pi over three is root three, and tan pi over four is one. So this is root three minus one, over one plus root three.' },
        { say: 'To rationalize the denominator, multiply the top and the bottom by the conjugate, root three minus one. The top becomes three minus two root three plus one, which is four minus two root three. The bottom becomes three minus one, which is two.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide each term by two: tan pi over twelve is exactly two minus root three, about 0.2679.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Determine the exact value of $\\cos 15^\\circ$.',
          choices: ['$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$', '$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$', '$\\dfrac{\\sqrt{3} - 1}{2}$', '$\\dfrac{\\sqrt{2} - \\sqrt{3}}{2}$'],
          answer: 0,
          working: '$\\cos(45^\\circ - 30^\\circ) = \\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ\\sin 30^\\circ = \\dfrac{\\sqrt{6}}{4} + \\dfrac{\\sqrt{2}}{4} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$',
        },
      ],
      lines: [
        { say: 'Your turn. Determine the exact value of cosine 15 degrees. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen degrees is 45 degrees minus 30 degrees, and the cosine of a difference has a plus sign: root six over four, plus root two over four. Choice B uses a minus sign, which gives sine 15 degrees instead. Choice D is cosine 45 degrees minus cosine 30 degrees, as if cosine distributed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['Write the angle as a sum or difference of special angles: $75^\\circ = 45^\\circ + 30^\\circ$, $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}$.', 'Use the identity, substitute the exact ratios, and simplify.', 'Rationalize a denominator by multiplying by its conjugate.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Write the angle as a sum or difference of special angles.', show: 'sum.0' },
        { say: 'Use the right identity, substitute the exact ratios, and simplify.', show: 'sum.1' },
        { say: 'And rationalize a denominator by multiplying by its conjugate. In part three, you will meet the double-angle identities. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
