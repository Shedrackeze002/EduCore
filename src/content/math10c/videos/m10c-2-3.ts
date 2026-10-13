import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-3',
  lessonId: 'm10c-2-3',
  title: 'Solving Right Triangles, Part 1: One Side and One Angle',
  thumbnailTitle: 'Solving Right Triangles',
  summary: 'What it means to solve a triangle, the three tools for doing it (the Pythagorean theorem, the angle sum and SOH CAH TOA), and how to solve a right triangle from one side and one angle. Part 2 solves from two sides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.3 · Part 1', title: 'Solving Right Triangles', subtitle: 'Every side and every angle' }],
      lines: [
        { say: 'To solve a triangle means to find all of its unknown sides and angles.', show: 'title' },
        { say: 'With the Pythagorean theorem and the three trigonometric ratios, you can solve any right triangle from just two pieces of information, as long as one of them is a side.' },
      ],
    },
    {
      chapter: 'Three tools',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 12, opp: 9, labels: { adj: 'b', opp: 'a', hyp: 'c', theta: 'A', other: 'B' } }],
      right: [
        {
          kind: 'bullets',
          id: 'tools',
          items: [
            '**Pythagorean theorem:** $\\opp{a}^2 + \\adj{b}^2 = \\hyp{c}^2$, when you know two sides',
            '**Angle sum:** $\\angle A + \\angle B = 90^\\circ$',
            '**SOH CAH TOA:** links an angle with two sides',
          ],
        },
      ],
      lines: [
        { say: 'Solving a right triangle takes three tools.', show: 'tri' },
        {
          say: 'First, the Pythagorean theorem: A squared plus b squared equals c squared, where c is the hypotenuse. Use it when you know two sides.',
          caption: 'First, the Pythagorean theorem: a squared plus b squared equals c squared, where c is the hypotenuse. Use it when you know two sides.',
          show: 'tools.0',
          focus: ['tools.0', 'tri.opp', 'tri.adj', 'tri.hyp'],
        },
        { say: 'Second, the angle sum. The two acute angles always add to ninety degrees, so knowing one gives you the other.', show: 'tools.1', focus: ['tools.1', 'tri.theta', 'tri.other'] },
        { say: 'Third, SOH CAH TOA, which links an angle with two of the sides.', show: 'tools.2', focus: ['tools.2', 'tri.theta'] },
      ],
    },
    {
      chapter: 'Finding a missing leg',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 15, labels: { adj: '8', opp: 'b', hyp: '17' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\opp{b}^2 = \\hyp{17}^2 - \\adj{8}^2', '\\opp{b}^2 = 289 - 64 = 225', '\\opp{b} = \\sqrt{225} = 15'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Finding a leg? Subtract.', md: 'The [[hyp:hypotenuse]] squared, minus the other leg squared.' },
      ],
      lines: [
        { say: "Let's start with two sides. A right triangle has a hypotenuse of seventeen and one leg of eight. Find the other leg.", show: 'tri' },
        { say: 'We know two sides, so we use the Pythagorean theorem. The leg we want is b, so b squared equals seventeen squared minus eight squared.', show: 'm.0', focus: ['m.0', 'tri.hyp', 'tri.adj'] },
        { say: "That's 289 minus 64, which is 225.", show: 'm.1', focus: 'm.1' },
        { say: 'So b is the square root of 225, which is fifteen.', show: 'm.2', focus: ['m.2', 'tri.opp'] },
        { say: 'Notice that to find a leg, we subtract: the hypotenuse squared minus the other leg squared. We add only when we want the hypotenuse.', show: 'tip', focus: 'm' },
      ],
    },
    {
      chapter: 'One side and one angle',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 19.66, opp: 13.77, vertices: ['A', 'C', 'B'], labels: { theta: '35^\\circ', hyp: '24', opp: '\\text{BC}', adj: '\\text{AC}', other: '55^\\circ' } }],
      right: [
        { kind: 'text', id: 'given', md: '$\\angle C = 90^\\circ$, $\\angle A = 35^\\circ$, $AB = 24$', size: 'md' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\angle B = 90^\\circ - 35^\\circ = 55^\\circ',
            '\\sin 35^\\circ = \\dfrac{\\opp{BC}}{\\hyp{24}}',
            '\\opp{BC} = 24\\sin 35^\\circ \\approx 13.8',
            '\\adj{AC} = 24\\cos 35^\\circ \\approx 19.7',
          ],
        },
      ],
      lines: [
        { say: 'Now one side and one angle. In triangle A B C, angle C is ninety degrees, angle A is thirty-five degrees, and A B is twenty-four. Solve the triangle.', show: ['tri.theta', 'tri.hyp', 'tri.opp', 'tri.adj', 'given'] },
        { say: 'Start with the easy part. The acute angles add to ninety degrees, so angle B is ninety minus thirty-five, which is fifty-five degrees.', show: ['m.0', 'tri.other'], focus: ['m.0', 'tri.other'] },
        { say: 'Next, B C. It is opposite angle A, and A B is the hypotenuse. Opposite and hypotenuse means sine.', show: 'm.1', focus: ['m.1', 'tri.opp', 'tri.hyp'] },
        { say: 'B C is on top, so multiply: twenty-four times sine thirty-five degrees, which is about 13.8.', show: 'm.2', focus: ['m.2', 'tri.opp'] },
        { say: 'Then A C. It is adjacent to angle A, so we use cosine. A C equals twenty-four times cosine thirty-five degrees, which is about 19.7.', show: 'm.3', focus: ['m.3', 'tri.adj', 'tri.hyp'] },
      ],
    },
    {
      chapter: 'Check with Pythagoras',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\opp{13.8}^2 + \\adj{19.7}^2 \\approx 578', '\\hyp{24}^2 = 576'] },
        { kind: 'text', id: 'ok', md: 'Close, given the rounding, so the solution is [[good:consistent]].', size: 'lg' },
      ],
      lines: [
        { say: 'When you can, check with a second method. The Pythagorean theorem should still hold.' },
        { say: '13.8 squared plus 19.7 squared is about 578,', show: 'm.0', focus: 'm.0' },
        { say: 'and twenty-four squared is 576.', show: 'm.1', focus: 'm.1' },
        { say: 'They are not exactly equal, because the sides were rounded, but they are close, so the solution is consistent.', show: 'ok', focus: 'm' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle PQR$, $\\angle R = 90^\\circ$, $\\angle P = \\thc{50^\\circ}$ and $PQ = 10$. How long is $QR$, the side [[opp:opposite]] $\\angle P$?',
          choices: ['$10\\sin 50^\\circ \\approx 7.66$', '$10\\cos 50^\\circ \\approx 6.43$', '$10\\tan 50^\\circ \\approx 11.92$', '$\\dfrac{10}{\\sin 50^\\circ} \\approx 13.05$'],
          answer: 0,
          working: '$PQ$ is the [[hyp:hypotenuse]] and $QR$ is [[opp:opposite]] $\\angle P$, so use sine: $QR = 10\\sin 50^\\circ \\approx 7.66$.',
        },
      ],
      lines: [
        { say: 'Your turn. In triangle P Q R, angle R is ninety degrees, angle P is fifty degrees, and P Q is ten. How long is Q R, the side opposite angle P? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. P Q is the hypotenuse, and Q R is opposite angle P, so we use sine. Q R equals ten times sine fifty degrees, which is about 7.66.', show: 'q.answer' },
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
            'Solving a triangle means finding every unknown side and angle.',
            'Two sides: the Pythagorean theorem. To find a leg, subtract.',
            'One angle: the other acute angle is $90^\\circ$ minus it.',
            'SOH CAH TOA connects an angle with two sides. Check with a second method.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Solving a triangle means finding every unknown side and angle.", show: 'sum.0' },
        { say: 'With two sides, use the Pythagorean theorem, and remember to subtract when you want a leg.', show: 'sum.1' },
        { say: 'With one acute angle, the other is ninety degrees minus it.', show: 'sum.2' },
        { say: 'And SOH CAH TOA connects an angle with two sides. Check your answers with a second method when you can. In part two, we will solve a triangle from two sides, and in context. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
