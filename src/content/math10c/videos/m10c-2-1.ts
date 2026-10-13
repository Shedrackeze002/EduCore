import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-1',
  lessonId: 'm10c-2-1',
  title: 'The Tangent Ratio, Part 1: Naming the Sides',
  thumbnailTitle: 'The Tangent Ratio',
  summary: 'Name the sides of a right triangle from an angle, see why similar right triangles share the same ratio, and write the tangent ratio for an angle. Part 2 uses it to find sides and angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.1 · Part 1', title: 'The Tangent Ratio', subtitle: 'Naming the sides of a right triangle' }],
      lines: [
        { say: 'How do surveyors measure the height of a mountain without ever climbing it?', show: 'title' },
        { say: 'They use trigonometry, the mathematics of triangles.' },
        { say: "And it all starts with one remarkable fact about right triangles. Let's find out what it is." },
      ],
    },
    {
      chapter: 'Naming the sides',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, labels: { hyp: '\\text{hypotenuse}', opp: '\\text{opposite}', adj: '\\text{adjacent}', theta: '\\theta' } }],
      right: [
        {
          kind: 'bullets',
          id: 'pts',
          items: [
            '[[hyp:Hypotenuse]]: across from the right angle, and always the longest side',
            '[[opp:Opposite]]: across from $\\thc{\\theta}$. It does not touch $\\thc{\\theta}$.',
            '[[adj:Adjacent]]: touches $\\thc{\\theta}$, and is not the hypotenuse',
          ],
        },
      ],
      lines: [
        { say: 'Here is a right triangle. The small square marks the right angle.', show: 'tri.shape' },
        { say: 'The side across from the right angle is called the hypotenuse. It is always the longest side.', show: ['tri.hyp', 'pts.0'], focus: 'tri.hyp' },
        { say: 'The other two sides get their names from an angle we choose. We usually call that angle theta.', show: 'tri.theta', focus: 'tri.theta' },
        { say: "The side across from theta is the opposite side. Notice that it doesn't touch theta at all.", show: ['tri.opp', 'pts.1'], focus: 'tri.opp' },
        { say: "And the side that touches theta, and isn't the hypotenuse, is the adjacent side.", show: ['tri.adj', 'pts.2'], focus: 'tri.adj' },
        { say: 'One warning: which side is opposite and which is adjacent depends on the angle you use. So always label the sides from your angle.', focus: 'tri' },
      ],
    },
    {
      chapter: 'Similar triangles',
      layout: 'split',
      left: [{ kind: 'similar', id: 'sim', angle: 35, sizes: [3, 6, 10] }],
      right: [
        {
          kind: 'table',
          id: 'tab',
          head: ['Triangle', '[[opp:Opp]]', '[[adj:Adj]]', 'Opp ÷ Adj'],
          rows: [
            ['Small', '2.1', '3.0', '0.70'],
            ['Medium', '4.2', '6.0', '0.70'],
            ['Large', '7.0', '10.0', '0.70'],
          ],
        },
        { kind: 'text', id: 'note', md: 'The ratio depends **only on the angle**, not on the size of the triangle.', size: 'md' },
      ],
      lines: [
        { say: "Let's draw a right triangle with a thirty-five degree angle.", show: 'sim.0' },
        { say: 'Then a bigger one with the same angle, and a bigger one again.', show: ['sim.1', 'sim.2'] },
        { say: 'Because their angles are the same, these triangles are similar. They have the same shape, but different sizes.' },
        { say: "Let's divide the opposite side by the adjacent side in each one. In the small triangle, 2.1 divided by 3 is 0.70.", show: 'tab.0', focus: ['sim.0', 'tab.0'] },
        { say: 'In the medium triangle, 4.2 divided by 6 is also 0.70.', show: 'tab.1', focus: ['sim.1', 'tab.1'] },
        { say: 'And in the large one, 7 divided by 10 is 0.70 again.', show: 'tab.2', focus: ['sim.2', 'tab.2'] },
        { say: 'The ratio is the same every time. It depends only on the angle, not on the size of the triangle.', show: 'note', focus: ['sim', 'tab'] },
      ],
    },
    {
      chapter: 'The tangent ratio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'lead', md: 'For an acute angle $\\thc{\\theta}$ in a right triangle:', size: 'lg' },
        { kind: 'math', id: 'def', lines: ['\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}'], size: 'xl' },
        { kind: 'calc', id: 'calc', keys: 'tan(45)', result: '1' },
      ],
      lines: [
        { say: "This ratio is so useful that it has a name. It's called the tangent of the angle.", show: 'lead' },
        { say: 'Tan theta equals the opposite side divided by the adjacent side.', show: 'def', focus: 'def.0' },
        { say: "Your calculator knows the tangent of every angle. Just make sure it's in degree mode.", focus: 'def' },
        { say: 'A quick check: the tangent of forty-five degrees should be exactly one.', show: 'calc' },
      ],
    },
    {
      chapter: 'Writing tangent ratios',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, vertices: ['A', 'C', 'B'], labels: { adj: '8', opp: '6' } }],
      right: [
        { kind: 'text', id: 'given', md: 'In $\\triangle ABC$, $\\angle C = 90^\\circ$, $AC = 8$ and $BC = 6$.', size: 'md' },
        { kind: 'math', id: 'ex', lines: ['\\tan A = \\dfrac{\\opp{BC}}{\\adj{AC}}', '\\tan A = \\dfrac{\\opp{6}}{\\adj{8}} = \\dfrac{3}{4} = 0.75'] },
      ],
      lines: [
        { say: "Let's practise. In triangle A B C, angle C is ninety degrees, A C is eight and B C is six.", show: ['tri', 'given'] },
        { say: "We want tan A. From angle A, the opposite side is B C, which is six,", show: 'ex.0', focus: 'tri.opp' },
        { say: 'and the adjacent side is A C, which is eight.', focus: 'tri.adj' },
        { say: 'So tan A equals six over eight, which simplifies to three quarters, or 0.75.', show: 'ex.1', focus: ['tri', 'ex.1'] },
      ],
    },
    {
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 6, opp: 8, vertices: ['B', 'C', 'A'], labels: { adj: '6', opp: '8' } }],
      right: [
        { kind: 'math', id: 'ex', lines: ['\\tan B = \\dfrac{\\opp{AC}}{\\adj{BC}}', '\\tan B = \\dfrac{\\opp{8}}{\\adj{6}} = \\dfrac{4}{3} \\approx 1.33'] },
        { kind: 'text', id: 'note', md: '$\\tan A$ and $\\tan B$ are **reciprocals**: switching the angle swaps [[opp:opposite]] and [[adj:adjacent]].', size: 'md' },
      ],
      lines: [
        { say: "Now let's find tan B. I've turned the triangle so that B is at the bottom.", show: 'tri' },
        { say: 'From angle B, the opposite side is A C, which is eight, and the adjacent side is B C, which is six.', show: 'ex.0', focus: ['tri.opp', 'tri.adj'] },
        { say: 'So tan B equals eight over six, or four thirds. That is about 1.33.', show: 'ex.1', focus: ['tri', 'ex.1'] },
        { say: 'Notice that tan A and tan B are reciprocals. Switching the angle swaps the opposite and adjacent sides.', show: 'note', focus: 'ex' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In $\\triangle PQR$, $\\angle R = 90^\\circ$, $PR = 12$ and $QR = 5$. What is $\\tan P$?',
          choices: ['$\\dfrac{12}{5}$', '$\\dfrac{5}{12}$', '$\\dfrac{5}{13}$', '$\\dfrac{12}{13}$'],
          answer: 1,
          working: 'From $\\angle P$, the [[opp:opposite]] side is $QR = 5$ and the [[adj:adjacent]] side is $PR = 12$, so $\\tan P = \\dfrac{5}{12} \\approx 0.42$.',
        },
      ],
      lines: [
        { say: "Now it's your turn. In triangle P Q R, angle R is ninety degrees, P R is twelve and Q R is five. What is tan P? Pause the video and try it.", show: 'q', wait: 6 },
        { say: 'The answer is B. From angle P, the opposite side is Q R, which is five, and the adjacent side is P R, which is twelve. So tan P is five twelfths, about 0.42.', show: 'q.answer' },
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
            '[[hyp:Hypotenuse]]: across from the right angle. [[opp:Opposite]]: across from $\\thc{\\theta}$. [[adj:Adjacent]]: next to $\\thc{\\theta}$.',
            'Label the sides from the angle you are using.',
            'Similar right triangles have equal ratios, so a ratio depends only on the angle.',
            '$\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}$, with the calculator in degree mode.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The hypotenuse is across from the right angle, the opposite side is across from theta, and the adjacent side is next to it.", show: 'sum.0' },
        { say: 'Always label the sides from the angle you are using.', show: 'sum.1' },
        { say: 'Similar right triangles have equal ratios, so a ratio depends only on the angle.', show: 'sum.2' },
        { say: 'And tan theta is the opposite side over the adjacent side. In part two, we will use it to find missing sides and angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
