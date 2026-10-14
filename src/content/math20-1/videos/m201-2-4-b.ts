import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

/** The two triangles with ∠A = 35°, a = 9 and b = 14, at 0.25 scale, one above the other. */
const s = 0.25;
const C: [number, number] = [14 * Math.cos((35 * Math.PI) / 180) * s, 14 * Math.sin((35 * Math.PI) / 180) * s];
const reach = Math.sqrt(81 - (C[1] / s) ** 2) * s;

const video: Explainer = {
  id: 'm201-2-4-b',
  lessonId: 'm201-2-4',
  title: 'The Ambiguous Case, Part 2: Solving Both Triangles',
  thumbnailTitle: 'Solving Both Triangles',
  thumbnail: 'two',
  summary: 'Solving both triangles when ∠A = 35°, a = 9 cm and b = 14 cm: the acute angle from the inverse sine and its supplement, checking the angle sum, finishing each triangle, and the two places on a highway that are exactly 16 km from a cell tower.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.4 · Part 2', title: 'Solving Both Triangles', subtitle: 'The acute angle and its supplement' }],
      lines: [
        { say: 'When SSA information gives two triangles, a complete answer solves both of them.', show: 'title' },
        { say: 'In this video, you will find both possible angles, solve each triangle, and use the ambiguous case to find where a car enters and leaves a cell tower’s range.' },
      ],
    },
    {
      chapter: 'Two angles for B',
      layout: 'split',
      leftWidth: 500,
      left: [
        figure('two', [
          triangle({ name: 't1', A: [0, 3.4], B: [C[0] + reach, 3.4], C: [C[0], C[1] + 3.4], names: ['A', 'B_1', 'C'], sides: { BC: '9', CA: '14' }, tones: { BC: 'opp', CA: 'adj' }, angles: { A: '35^\\circ', B: '63.2^\\circ' } }),
          triangle({ name: 't2', A: [0, 0], B: [C[0] - reach, 0], C, names: ['A', 'B_2', 'C'], sides: { BC: '9', CA: '14' }, tones: { BC: 'opp', CA: 'adj' }, angles: { B: '116.8^\\circ' } }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 14\\sin 35^\\circ \\approx 8.03', '\\sin B = \\dfrac{14\\sin 35^\\circ}{9} \\approx 0.8922', '\\angle B_1 \\approx 63.2^\\circ', '\\angle B_2 \\approx 180^\\circ - 63.2^\\circ = 116.8^\\circ'] }],
      lines: [
        { say: 'Solve triangle ABC, with angle A 35 degrees, side "a" nine centimetres, and side b fourteen centimetres. First, check: the height is fourteen sine 35, about 8.03, and nine is between 8.03 and fourteen. There are two triangles.', show: ['two.t1-shape', 'two.t2-shape', 'two.t1-names', 'two.t2-names', 'two.t1-aA', 'm.0'], focus: 'm.0' },
        { say: 'Use the sine law: sine B is fourteen sine 35 over nine, about 0.8922.', show: 'm.1', focus: 'm.1' },
        { say: 'The inverse sine gives the acute angle: about 63.2 degrees. That is angle B one.', show: ['two.t1-aB', 'm.2'], focus: ['two.t1-aB', 'm.2'] },
        { say: 'Its supplement, 180 minus 63.15, about 116.8 degrees, is angle B two. Check that it fits: 35 plus 116.8 is less than 180, so the second triangle exists.', show: ['two.t2-aB', 'm.3'], focus: ['two.t2-aB', 'm.3'] },
      ],
    },
    {
      chapter: 'Finish each triangle',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', 'Triangle 1', 'Triangle 2'], rows: [['$\\angle B$', '$63.2^\\circ$', '$116.8^\\circ$'], ['$\\angle C$', '$180^\\circ - 35^\\circ - 63.15^\\circ \\approx 81.8^\\circ$', '$180^\\circ - 35^\\circ - 116.85^\\circ \\approx 28.2^\\circ$'], ['$c$', '$\\dfrac{9\\sin 81.85^\\circ}{\\sin 35^\\circ} \\approx 15.5$ cm', '$\\dfrac{9\\sin 28.15^\\circ}{\\sin 35^\\circ} \\approx 7.4$ cm']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the obtuse angle', md: 'The supplement only works if the angle sum stays under $180^\\circ$. If the given angle plus the supplement reached $180^\\circ$, there would be only one triangle.' },
      ],
      lines: [
        { say: 'Now finish each triangle separately.', show: 't.0' },
        { say: 'In triangle one, angle C is 180 minus 35 minus 63.15: about 81.8 degrees. In triangle two, it is 180 minus 35 minus 116.85: about 28.2 degrees.', show: 't.1', focus: 't.1' },
        { say: 'Then the sine law gives side c: about 15.5 centimetres in triangle one, and about 7.4 centimetres in triangle two.', show: 't.2', focus: 't.2' },
        { say: 'Always check the obtuse angle. If the given angle plus the supplement reached 180 degrees, the second triangle would not exist.', show: 'tip' },
      ],
    },
    {
      chapter: 'Cell tower range',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['h = 30\\sin 25^\\circ \\approx 12.68 < 16 < 30: \\text{ two positions}', '\\sin X = \\dfrac{30\\sin 25^\\circ}{16} \\approx 0.7924:\\quad \\angle X \\approx 52.41^\\circ \\text{ or } 127.59^\\circ', '\\angle T \\approx 102.59^\\circ \\text{ or } 27.41^\\circ', 'd = \\dfrac{16\\sin T}{\\sin 25^\\circ} \\approx 36.9\\text{ km or } 17.4\\text{ km}'] }],
      lines: [
        { say: 'A straight highway leaves Camrose. A cell tower stands thirty kilometres from Camrose, and the line to it makes a 25-degree angle with the highway. In this example, the signal reaches sixteen kilometres in every direction. Where on the highway is a car exactly sixteen kilometres from the tower?' },
        { say: 'In the triangle of town, car and tower, the 25-degree angle is at the town, the sixteen-kilometre side is opposite it, and the thirty-kilometre side is next to it. The height is thirty sine 25, about 12.68, and sixteen is between 12.68 and thirty: two positions.', show: 'm.0', focus: 'm.0' },
        { say: 'At the car, the sine of the angle is thirty sine 25 over sixteen, about 0.7924, so the angle is about 52.41 degrees, or its supplement, 127.59.', show: 'm.1', focus: 'm.1' },
        { say: 'So the angle at the tower is about 102.59 or 27.41 degrees, and the sine law gives the distances from town: about 36.9 kilometres and 17.4 kilometres. Between those two points, the car is inside the tower’s range.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In an ambiguous case, $\\sin B \\approx 0.7660$. What are the two possible measures of $\\angle B$?',
          choices: ['$50^\\circ$ and $130^\\circ$', '$50^\\circ$ and $140^\\circ$', '$40^\\circ$ and $140^\\circ$', '$50^\\circ$ and $230^\\circ$'],
          answer: 0,
          working: '$\\sin^{-1}(0.7660) \\approx 50^\\circ$, and its supplement is $180^\\circ - 50^\\circ = 130^\\circ$.',
        },
      ],
      lines: [
        { say: 'Your turn. In an ambiguous case, the sine of B is about 0.7660. What are the two possible measures of angle B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The inverse sine gives fifty degrees, and its supplement is 180 minus fifty: 130 degrees. D adds 180 instead of subtracting from it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Two triangles: the angle is $\\sin^{-1}$ of the value, or its supplement.', 'Check that the given angle plus the supplement is under $180^\\circ$.', 'Solve each triangle separately.'] }],
      lines: [
        { say: 'Let’s sum up. In the two-triangle case, the possible angles are the inverse sine of the value, and its supplement.', show: 'sum.0' },
        { say: 'Check that the given angle plus the supplement is less than 180 degrees.', show: 'sum.1' },
        { say: 'And solve each triangle separately. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
