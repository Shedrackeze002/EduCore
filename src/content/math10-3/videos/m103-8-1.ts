import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-8-1',
  lessonId: 'm103-8-1',
  title: 'The Tangent Ratio, Part 1: Naming the Sides',
  thumbnailTitle: 'The Tangent Ratio',
  thumbnail: 'tri',
  summary: 'Naming the hypotenuse, opposite and adjacent sides from an angle θ (and how they change when the angle changes), why similar triangles on a 6/12 roof share the same rise over run, and writing tan θ = opposite ÷ adjacent. Part 2 uses tangent to find sides and angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.1 · Part 1', title: 'The Tangent Ratio', subtitle: 'Naming the sides of a right triangle' }],
      lines: [
        { say: 'A roofer needs to know how steep a roof is, and a surveyor needs the height of a grain elevator without climbing it. Both use trigonometry.', show: 'title' },
        { say: 'In this video, you will name the sides of a right triangle, and meet the tangent ratio.' },
      ],
    },
    {
      chapter: 'Naming the sides',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, labels: { hyp: '\\text{hypotenuse}', opp: '\\text{opposite}', adj: '\\text{adjacent}', theta: '\\theta' } }],
      right: [
        {
          kind: 'bullets',
          id: 'pts',
          items: ['[[hyp:Hypotenuse]]: across from the right angle, and the longest side.', '[[opp:Opposite]]: across from $\\thc{\\theta}$. It does not touch $\\thc{\\theta}$.', '[[adj:Adjacent]]: touches $\\thc{\\theta}$, and is not the hypotenuse.'],
        },
      ],
      lines: [
        { say: 'The side across from the right angle is the hypotenuse. It is always the longest side.', show: ['tri.shape', 'tri.hyp', 'pts.0'], focus: 'tri.hyp' },
        { say: 'The other two sides are named from the angle you use, often called theta.', show: 'tri.theta', focus: 'tri.theta' },
        { say: 'The side across from theta is the opposite side. It does not touch theta.', show: ['tri.opp', 'pts.1'], focus: 'tri.opp' },
        { say: 'And the side that touches theta, and is not the hypotenuse, is the adjacent side.', show: ['tri.adj', 'pts.2'], focus: 'tri.adj' },
      ],
    },
    {
      chapter: 'Labels follow the angle',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'a', adj: 2.4, opp: 6, setting: 'ladder', labels: { theta: '\\theta', hyp: '\\text{hyp}', opp: '\\text{opp}', adj: '\\text{adj}' } }],
      right: [{ kind: 'bullets', id: 'b', items: ['Ladder: [[hyp:hypotenuse]]', 'Height up the wall: [[opp:opposite]]', 'Distance along the ground: [[adj:adjacent]]'] }],
      lines: [
        { say: 'A ladder leans against a wall, and theta is the angle between the ladder and the ground. The ladder is across from the right angle, so it is the hypotenuse.', show: ['a.shape', 'a.theta', 'a.hyp', 'b.0'], focus: 'a.hyp' },
        { say: 'The height up the wall does not touch theta, so it is opposite. The distance along the ground touches theta, so it is adjacent.', show: ['a.opp', 'a.adj', 'b.1', 'b.2'], focus: ['a.opp', 'a.adj'] },
      ],
    },
    {
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'b', adj: 2.4, opp: 6, setting: 'ladder', labels: { other: '\\theta', hyp: '\\text{hyp}', opp: '\\text{adj}', adj: '\\text{opp}' } }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Labels change with the angle', md: 'Only the hypotenuse never changes. Label the sides from **your** angle every time.' }],
      lines: [
        { say: 'Now move theta to the top of the ladder, between the ladder and the wall. The distance along the ground becomes the opposite side, and the height up the wall becomes adjacent.', show: ['b.shape', 'b.other', 'b.hyp', 'b.opp', 'b.adj'], focus: ['b.opp', 'b.adj'] },
        { say: 'Only the hypotenuse never changes, so always label the sides from your angle.', show: 'oops' },
      ],
    },
    {
      chapter: 'Similar triangles',
      layout: 'split',
      left: [{ kind: 'similar', id: 'sim', angle: 26.6, sizes: [3, 6, 10] }],
      right: [
        { kind: 'table', id: 'tab', head: ['Triangle', '[[opp:Rise]]', '[[adj:Run]]', 'Rise ÷ run'], rows: [['Small', '$1.5\\text{ ft}$', '$3\\text{ ft}$', '$0.5$'], ['Medium', '$3\\text{ ft}$', '$6\\text{ ft}$', '$0.5$'], ['Large', '$5\\text{ ft}$', '$10\\text{ ft}$', '$0.5$']] },
      ],
      lines: [
        { say: 'A roof with a six-twelve pitch rises six inches for every twelve of run. Cut right triangles of different sizes from the same roof.', show: ['sim.0', 'sim.1', 'sim.2'] },
        { say: 'A rise of 1.5 feet over a run of three is 0.5. Three over six is 0.5. And five over ten is 0.5 again.', show: ['tab.0', 'tab.1', 'tab.2'], focus: 'tab' },
        { say: 'The triangles have the same angle, so they are similar, and the opposite over the adjacent is the same in each. The ratio depends only on the angle.' },
      ],
    },
    {
      chapter: 'The tangent ratio',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'triangle', id: 'tri', adj: 8, opp: 6, vertices: ['A', 'C', 'B'], labels: { adj: '8\\text{ m}', opp: '6\\text{ m}' } }],
      right: [
        { kind: 'math', id: 'def', size: 'md', lines: ['\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}'] },
        { kind: 'math', id: 'ex', size: 'md', align: 'left', lines: ['\\tan A = \\dfrac{\\opp{6}}{\\adj{8}} = 0.75', '\\tan B = \\dfrac{8}{6} \\approx 1.33'] },
      ],
      lines: [
        { say: 'This ratio is the tangent of the angle: tan theta equals the opposite over the adjacent. Keep your calculator in degree mode.', show: 'def', focus: 'def.0' },
        { say: 'In triangle "A" B C, angle C is ninety degrees, B C is six metres, and "A" C is eight. For angle "A", the opposite side is six and the adjacent side is eight. So tan "A" is 0.75.', show: ['tri', 'ex.0'], focus: ['tri.opp', 'tri.adj', 'ex.0'] },
        { say: 'For angle B, the sides swap: the opposite side is eight and the adjacent side is six. So tan B is about 1.33.', show: 'ex.1', focus: 'ex.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In a right triangle, the side opposite $\\theta$ is $9$, the side adjacent to $\\theta$ is $12$ and the hypotenuse is $15$. What is $\\tan\\theta$?',
          choices: ['$0.75$', '$1.33$', '$0.6$', '$0.8$'],
          answer: 0,
          working: '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{9}{12} = 0.75$.',
        },
      ],
      lines: [
        { say: 'Your turn. The side opposite theta is nine, the side adjacent to theta is twelve, and the hypotenuse is fifteen. What is tan theta? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: the opposite over the adjacent is nine over twelve, 0.75. B is upside down, and C and D use the hypotenuse, which tangent never does.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Hypotenuse: across from the right angle. Opposite: across from $\\theta$. Adjacent: touches $\\theta$.', 'Similar right triangles have the same ratios.', '$\\tan\\theta = \\dfrac{\\text{opposite}}{\\text{adjacent}}$'] }],
      lines: [
        { say: 'Let’s sum up. The hypotenuse is across from the right angle, the opposite side is across from theta, and the adjacent side touches theta.', show: 'sum.0' },
        { say: 'Similar right triangles have the same side ratios, so a ratio depends only on the angle.', show: 'sum.1' },
        { say: 'And tan theta is the opposite over the adjacent. In part two, we use tangent to find sides and angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
