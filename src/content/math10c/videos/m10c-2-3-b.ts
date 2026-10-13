import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-3-b',
  lessonId: 'm10c-2-3',
  title: 'Solving Right Triangles, Part 2: From Two Sides, and in Context',
  thumbnailTitle: 'Solving from Two Sides',
  summary: 'Solve a right triangle from two sides with the Pythagorean theorem, an inverse ratio and the angle sum; see why to round only at the end; and solve a ladder problem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.3 · Part 2', title: 'Solving from Two Sides', subtitle: 'Then a ladder against a wall' }],
      lines: [{ say: 'In part one, we solved a right triangle from one side and one angle. Now we will solve one from two sides, and then use the same tools on a real problem.', show: 'title' }],
    },
    {
      chapter: 'Two sides given',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 9, opp: 12, vertices: ['D', 'F', 'E'], labels: { adj: '9', opp: '12', hyp: '\\text{DE}', theta: '53.1^\\circ', other: '36.9^\\circ' } }],
      right: [
        { kind: 'text', id: 'given', md: '$\\angle F = 90^\\circ$, $DF = 9$, $EF = 12$', size: 'md' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\hyp{DE} = \\sqrt{\\adj{9}^2 + \\opp{12}^2} = 15',
            '\\tan D = \\dfrac{\\opp{12}}{\\adj{9}}',
            '\\angle D = \\tan^{-1}\\left(\\tfrac{12}{9}\\right) \\approx 53.1^\\circ',
            '\\angle E \\approx 90^\\circ - 53.1^\\circ = 36.9^\\circ',
          ],
        },
      ],
      lines: [
        { say: 'In triangle D E F, angle F is ninety degrees, D F is nine, and E F is twelve. Solve the triangle.', show: ['tri.adj', 'tri.opp', 'tri.hyp', 'given'] },
        { say: 'We know two sides, so start with the Pythagorean theorem. D E is the hypotenuse, so add: the square root of nine squared plus twelve squared, which is the square root of 225, or fifteen.', show: 'm.0', focus: ['m.0', 'tri.hyp'] },
        { say: 'For angle D, E F is the opposite side and D F is the adjacent side. Opposite and adjacent means tangent, so tan D equals twelve over nine.', show: 'm.1', focus: ['m.1', 'tri.opp', 'tri.adj'] },
        { say: 'So angle D is the inverse tangent of twelve over nine, which is about 53.1 degrees.', show: ['m.2', 'tri.theta'], focus: ['m.2', 'tri.theta'] },
        { say: 'And the angles add to ninety degrees, so angle E is about ninety minus 53.1, or 36.9 degrees.', show: ['m.3', 'tri.other'], focus: ['m.3', 'tri.other'] },
      ],
    },
    {
      chapter: 'Round at the end',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'mistake', title: 'Rounding too early', md: 'Keep full calculator values for every step, and round only your final answers.' },
        {
          kind: 'math',
          id: 'm',
          lines: ['\\tan^{-1}(1.3333\\ldots) \\approx 53.1^\\circ \\quad \\good{\\checkmark}', '\\tan^{-1}(1.3) \\approx 52.4^\\circ \\quad \\bad{\\times}'],
        },
      ],
      lines: [
        { say: 'One mistake to avoid here is rounding too early.', show: 'rule' },
        { say: 'Twelve over nine is 1.333, and the threes go on forever. With the full value, the inverse tangent gives 53.1 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'But if we round to 1.3 first, we get 52.4 degrees, which is wrong.', show: 'm.1', focus: 'm.1' },
        { say: 'So keep full calculator values for every step, and round only your final answers.', focus: ['m', 'rule'] },
      ],
    },
    {
      chapter: 'A ladder',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 2.6, opp: 6.5, setting: 'ladder', labels: { theta: '\\theta', hyp: '7\\text{ m}', opp: '6.5\\text{ m}', adj: 'x' } }],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\adj{x} = \\sqrt{\\hyp{7}^2 - \\opp{6.5}^2} = \\sqrt{6.75}',
            '\\adj{x} \\approx 2.6\\text{ m}',
            '\\sin\\thc{\\theta} = \\dfrac{\\opp{6.5}}{\\hyp{7}}',
            '\\thc{\\theta} = \\sin^{-1}\\left(\\dfrac{6.5}{7}\\right) \\approx 68.2^\\circ',
          ],
        },
      ],
      lines: [
        { say: 'Now in context. A seven metre ladder reaches 6.5 metres up a wall. How far is its foot from the wall, and what angle does it make with the ground?', show: 'tri' },
        { say: 'The ladder is the hypotenuse, and two sides are known, so the Pythagorean theorem gives the distance. x is a leg, so subtract: the square root of seven squared minus 6.5 squared, which is the square root of 6.75.', show: 'm.0', focus: ['m.0', 'tri.adj'] },
        { say: 'That is about 2.6 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For the angle, 6.5 is opposite theta, and seven is the hypotenuse, so we use sine. Sine theta equals 6.5 over seven.', show: 'm.2', focus: ['m.2', 'tri.opp', 'tri.hyp'] },
        { say: 'So theta is the inverse sine of 6.5 over seven, which is about 68.2 degrees.', show: 'm.3', focus: ['m.3', 'tri.theta'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A right triangle has legs of $5$ and $12$. What is the angle $\\thc{\\theta}$ [[opp:opposite]] the side of length $5$?',
          choices: ['$\\tan^{-1}\\left(\\tfrac{5}{12}\\right) \\approx 22.6^\\circ$', '$\\tan^{-1}\\left(\\tfrac{12}{5}\\right) \\approx 67.4^\\circ$', '$\\sin^{-1}\\left(\\tfrac{5}{12}\\right) \\approx 24.6^\\circ$', '$\\cos^{-1}\\left(\\tfrac{5}{12}\\right) \\approx 65.4^\\circ$'],
          answer: 0,
          working: '$5$ is [[opp:opposite]] $\\theta$ and $12$ is [[adj:adjacent]], so use tangent: $\\theta = \\tan^{-1}\\left(\\tfrac{5}{12}\\right) \\approx 22.6^\\circ$. Neither leg is the hypotenuse, so sine and cosine do not fit.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has legs of five and twelve. What is the angle opposite the side of length five? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five is opposite the angle and twelve is adjacent, so we use tangent: the inverse tangent of five over twelve, which is about 22.6 degrees. Neither leg is the hypotenuse, so sine and cosine do not fit.', show: 'q.answer' },
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
          items: [
            'From two sides: the Pythagorean theorem gives the third side.',
            'An inverse ratio gives one angle, and the angle sum gives the other.',
            'Keep full values, and round only at the end.',
            'In context, draw the triangle and label what you know first.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. From two sides, the Pythagorean theorem gives the third side.", show: 'sum.0' },
        { say: 'An inverse ratio gives one acute angle, and the angle sum gives the other.', show: 'sum.1' },
        { say: 'Keep full calculator values, and round only at the end.', show: 'sum.2' },
        { say: 'And in context, draw the triangle and label what you know before you calculate. Next, we will use these skills to measure things we cannot reach. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
