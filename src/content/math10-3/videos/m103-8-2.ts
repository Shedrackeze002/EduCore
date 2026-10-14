import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-8-2',
  lessonId: 'm103-8-2',
  title: 'Sine and Cosine, Part 1: Choosing the Ratio',
  thumbnailTitle: 'Sine and Cosine',
  thumbnail: 'tri',
  summary: 'The sine and cosine ratios, which compare a leg with the hypotenuse, why they are always less than 1, and choosing the right ratio with SOH CAH TOA from the side you know and the side you want. Part 2 finds sides and angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 8.2 · Part 1', title: 'Sine and Cosine', subtitle: 'SOH CAH TOA' }],
      lines: [
        { say: 'A painter knows how long the ladder is. A carpenter knows the length of a rafter. In many jobs, the side you know or need is the hypotenuse, and tangent does not use it.', show: 'title' },
        { say: 'In this video, you will meet two more ratios, sine and cosine, and learn to choose the right one.' },
      ],
    },
    {
      chapter: 'Sine and cosine',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'triangle', id: 'tri', adj: 12, opp: 5, vertices: ['A', 'C', 'B'], labels: { adj: '12\\text{ cm}', opp: '5\\text{ cm}', hyp: '13\\text{ cm}' } }],
      right: [
        { kind: 'math', id: 'def', size: 'md', lines: ['\\sin\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\hyp{\\text{hypotenuse}}}', '\\cos\\thc{\\theta} = \\dfrac{\\adj{\\text{adjacent}}}{\\hyp{\\text{hypotenuse}}}'] },
        { kind: 'math', id: 'ex', size: 'md', align: 'left', lines: ['\\sin A = \\dfrac{\\opp{5}}{\\hyp{13}} \\approx 0.3846', '\\cos A = \\dfrac{\\adj{12}}{\\hyp{13}} \\approx 0.9231'] },
      ],
      lines: [
        { say: 'Tangent compares the two legs. Sine and cosine compare a leg with the hypotenuse. Sine theta is the opposite over the hypotenuse.', show: 'def.0', focus: 'def.0' },
        { say: 'And cosine theta is the adjacent over the hypotenuse. Like tangent, they come from similar triangles, so they depend only on the angle.', show: 'def.1', focus: 'def.1' },
        { say: 'In triangle "A" B C, the hypotenuse is thirteen centimetres. For angle "A", the opposite side is five, so sine "A" is five over thirteen: about 0.3846.', show: ['tri', 'ex.0'], focus: ['tri.opp', 'tri.hyp', 'ex.0'] },
        { say: 'The adjacent side is twelve, so cosine "A" is twelve over thirteen: about 0.9231.', show: 'ex.1', focus: ['tri.adj', 'tri.hyp', 'ex.1'] },
      ],
    },
    {
      chapter: 'Always less than one',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Always less than 1', md: 'The hypotenuse is the longest side, so $\\sin\\theta$ and $\\cos\\theta$ are always less than $1$. A sine or cosine bigger than $1$ means your fraction is upside down.' }],
      lines: [
        { say: 'The hypotenuse is the longest side, so for an acute angle, sine and cosine are always less than one.', show: 'tip' },
        { say: 'If you ever get a sine or a cosine bigger than one, your fraction is upside down.' },
      ],
    },
    {
      chapter: 'Choosing the ratio',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['', 'Ratio', 'Sides'],
          rows: [
            ['**SOH**', 'sine', '[[opp:opposite]] ÷ [[hyp:hypotenuse]]'],
            ['**CAH**', 'cosine', '[[adj:adjacent]] ÷ [[hyp:hypotenuse]]'],
            ['**TOA**', 'tangent', '[[opp:opposite]] ÷ [[adj:adjacent]]'],
          ],
        },
      ],
      right: [{ kind: 'bullets', id: 'b', items: ['Label the sides from the angle.', 'Find the side you **know** and the side you **want**.', 'Pick the ratio that uses exactly those two sides.'] }],
      lines: [
        { say: 'You now have three ratios: the primary trigonometric ratios. A memory aid is SOH CAH TOA. SOH: sine is opposite over hypotenuse.', show: 't.0', focus: 't.0' },
        { say: 'CAH: cosine is adjacent over hypotenuse. TOA: tangent is opposite over adjacent.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'To choose one, first label the sides from the angle. Then find the side you know, and the side you want.', show: ['b.0', 'b.1'] },
        { say: 'Then pick the ratio that uses exactly those two sides.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Which ratio?',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'triangle', id: 'lad', adj: 1.68, opp: 6.28, setting: 'ladder', labels: { theta: '75^\\circ', hyp: '6.5\\text{ m}', opp: 'h' } }],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{know: } \\hyp{\\text{hypotenuse}}, \\; \\text{want: } \\opp{\\text{opposite}}', '\\text{SOH: } \\sin 75^\\circ = \\dfrac{\\opp{h}}{\\hyp{6.5}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Tangent for everything', md: 'Tangent never uses the hypotenuse. If you know or want the hypotenuse, use sine or cosine.' },
      ],
      lines: [
        { say: 'A 6.5-metre ladder leans against a wall, at an angle of 75 degrees with the ground. You want the height h it reaches. Which ratio?', show: ['lad.shape', 'lad.theta', 'lad.hyp', 'lad.opp'] },
        { say: 'The ladder is across from the right angle, so it is the hypotenuse: the side you know. The height is across from the 75-degree angle, so it is opposite: the side you want.', show: 'm.0', focus: ['lad.hyp', 'lad.opp', 'm.0'] },
        { say: 'Opposite and hypotenuse: that is SOH. Use sine: sine 75 degrees equals h over 6.5.', show: 'm.1', focus: 'm.1' },
        { say: 'Tangent never uses the hypotenuse. If the hypotenuse is the side you know or want, you need sine or cosine.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $4\\text{ m}$ ladder makes a $70^\\circ$ angle with the ground. You want the distance from the wall to its foot. Which ratio should you use?',
          choices: ['cosine', 'sine', 'tangent', 'none of them'],
          answer: 0,
          working: 'The ladder is the hypotenuse, and the distance along the ground touches the $70^\\circ$ angle, so it is adjacent. Adjacent and hypotenuse: CAH, cosine.',
        },
      ],
      lines: [
        { say: 'Your turn. A four-metre ladder makes a seventy-degree angle with the ground. You want the distance from the wall to its foot. Which ratio should you use? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, cosine. The ladder is the hypotenuse, and the distance along the ground touches the angle, so it is adjacent. Adjacent and hypotenuse: CAH.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\sin\\theta = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$ and $\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$.', 'Sine and cosine are always less than $1$.', 'SOH CAH TOA: pick the ratio with the side you know and the side you want.'] }],
      lines: [
        { say: 'Let’s sum up. Sine is the opposite over the hypotenuse, and cosine is the adjacent over the hypotenuse.', show: 'sum.0' },
        { say: 'For an acute angle, sine and cosine are always less than one.', show: 'sum.1' },
        { say: 'And with SOH CAH TOA, pick the ratio that uses the side you know and the side you want. In part two, we use sine and cosine to find sides and angles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
