import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-2-2',
  lessonId: 'm10c-2-2',
  title: 'The Sine and Cosine Ratios, Part 1: SOH CAH TOA',
  thumbnailTitle: 'Sine, Cosine and SOH CAH TOA',
  summary: 'Meet the sine and cosine ratios, remember all three primary ratios with SOH CAH TOA, write them for an angle, and choose the right ratio for a problem. Part 2 uses them to find sides and angles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 2.2 · Part 1', title: 'The Sine and Cosine Ratios', subtitle: 'Completing the trigonometry toolkit' }],
      lines: [
        { say: 'The tangent ratio uses the two legs of a right triangle. But what if a problem involves the hypotenuse, like the length of a ladder or a kite string?', show: 'title' },
        { say: "That's where two more ratios come in: sine and cosine." },
      ],
    },
    {
      chapter: 'Three ratios',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 12, opp: 9, labels: { hyp: '\\text{hypotenuse}', opp: '\\text{opposite}', adj: '\\text{adjacent}', theta: '\\theta' } }],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: [
            '\\sin\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\hyp{\\text{hypotenuse}}}',
            '\\cos\\thc{\\theta} = \\dfrac{\\adj{\\text{adjacent}}}{\\hyp{\\text{hypotenuse}}}',
            '\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opposite}}}{\\adj{\\text{adjacent}}}',
          ],
        },
      ],
      lines: [
        { say: "Here's a right triangle with an angle theta, and its three sides: the opposite side, the adjacent side and the hypotenuse.", show: 'tri' },
        { say: 'The sine of theta is the opposite side divided by the hypotenuse.', show: 'm.0', focus: ['tri.opp', 'tri.hyp', 'm.0'] },
        { say: 'The cosine of theta is the adjacent side divided by the hypotenuse.', show: 'm.1', focus: ['tri.adj', 'tri.hyp', 'm.1'] },
        { say: 'And, as before, the tangent is the opposite side divided by the adjacent side.', show: 'm.2', focus: ['tri.opp', 'tri.adj', 'm.2'] },
        { say: 'Together, these are the three primary trigonometric ratios.', focus: ['tri', 'm'] },
      ],
    },
    {
      chapter: 'SOH CAH TOA',
      layout: 'center',
      main: [
        { kind: 'text', id: 'soh', md: '**SOH · CAH · TOA**', size: 'xl' },
        {
          kind: 'bullets',
          id: 'mn',
          items: [
            '**S**ine $=$ [[opp:**O**pposite]] $\\div$ [[hyp:**H**ypotenuse]]',
            '**C**osine $=$ [[adj:**A**djacent]] $\\div$ [[hyp:**H**ypotenuse]]',
            '**T**angent $=$ [[opp:**O**pposite]] $\\div$ [[adj:**A**djacent]]',
          ],
        },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Between 0 and 1', md: 'The hypotenuse is the longest side, so $\\sin\\theta$ and $\\cos\\theta$ are always between 0 and 1.' },
      ],
      lines: [
        { say: 'A popular way to remember them is SOH CAH TOA.', show: 'soh' },
        { say: 'SOH: sine is opposite over hypotenuse.', show: 'mn.0', focus: 'mn.0' },
        { say: 'CAH: cosine is adjacent over hypotenuse.', show: 'mn.1', focus: 'mn.1' },
        { say: 'TOA: tangent is opposite over adjacent.', show: 'mn.2', focus: 'mn.2' },
        { say: 'And because the hypotenuse is the longest side, sine and cosine are always between zero and one.', show: 'tip', focus: 'mn' },
      ],
    },
    {
      chapter: 'Writing all three ratios',
      layout: 'split',
      left: [{ kind: 'triangle', id: 'tri', adj: 5, opp: 12, vertices: ['P', 'R', 'Q'], labels: { adj: '5', opp: '12', hyp: '13' } }],
      right: [
        { kind: 'text', id: 'given', md: 'Write the three ratios for $\\angle P$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sin P = \\dfrac{\\opp{12}}{\\hyp{13}}', '\\cos P = \\dfrac{\\adj{5}}{\\hyp{13}}', '\\tan P = \\dfrac{\\opp{12}}{\\adj{5}}'] },
      ],
      lines: [
        { say: "Let's write all three ratios for angle P in this triangle. P R is five, Q R is twelve, and P Q is thirteen.", show: ['tri', 'given'] },
        { say: 'First, label the sides from angle P. The hypotenuse, across from the right angle, is thirteen.', focus: 'tri.hyp' },
        { say: 'The opposite side is twelve, and the adjacent side is five.', focus: ['tri.opp', 'tri.adj'] },
        { say: 'So sine P is twelve over thirteen,', show: 'm.0', focus: ['m.0', 'tri.opp', 'tri.hyp'] },
        { say: 'cosine P is five over thirteen,', show: 'm.1', focus: ['m.1', 'tri.adj', 'tri.hyp'] },
        { say: 'and tangent P is twelve over five.', show: 'm.2', focus: ['m.2', 'tri.opp', 'tri.adj'] },
      ],
    },
    {
      chapter: 'Choosing the right ratio',
      layout: 'center',
      main: [
        { kind: 'text', id: 'ask', md: 'Which side do I **know**? Which side do I **want**?', size: 'lg' },
        {
          kind: 'table',
          id: 'tab',
          head: ['The two sides', 'Ratio'],
          rows: [
            ['[[opp:opposite]] and [[hyp:hypotenuse]]', '**sine**'],
            ['[[adj:adjacent]] and [[hyp:hypotenuse]]', '**cosine**'],
            ['[[opp:opposite]] and [[adj:adjacent]]', '**tangent**'],
          ],
        },
      ],
      lines: [
        { say: 'With three ratios, how do you choose? Ask yourself two questions.', show: 'ask' },
        { say: 'Which side do I know, and which side do I want? Then pick the ratio that uses exactly those two sides.' },
        { say: 'Opposite and hypotenuse: use sine.', show: 'tab.0', focus: 'tab.0' },
        { say: 'Adjacent and hypotenuse: use cosine.', show: 'tab.1', focus: 'tab.1' },
        { say: 'Opposite and adjacent: use tangent.', show: 'tab.2', focus: 'tab.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'You know the [[hyp:hypotenuse]] and want the side [[adj:adjacent]] to $\\thc{\\theta}$. Which ratio do you use?',
          choices: ['sine', 'cosine', 'tangent', 'none of them'],
          answer: 1,
          working: 'Adjacent and hypotenuse: **CAH**, so cosine. $\\cos\\theta = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$.',
        },
      ],
      lines: [
        { say: "Your turn. You know the hypotenuse, and you want the side adjacent to theta. Which ratio do you use? Pause the video and try it.", show: 'q', wait: 5 },
        { say: 'The answer is B, cosine. Adjacent and hypotenuse is C A H, so cosine.', show: 'q.answer' },
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
            '$\\sin\\thc{\\theta} = \\dfrac{\\opp{\\text{opp}}}{\\hyp{\\text{hyp}}}$, $\\cos\\thc{\\theta} = \\dfrac{\\adj{\\text{adj}}}{\\hyp{\\text{hyp}}}$, $\\tan\\thc{\\theta} = \\dfrac{\\opp{\\text{opp}}}{\\adj{\\text{adj}}}$',
            'Remember them with **SOH CAH TOA**.',
            'Label the sides from your angle: [[hyp:hypotenuse]] first.',
            'Choose the ratio that links the side you know and the side you want.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent.", show: 'sum.0' },
        { say: 'Remember them with SOH CAH TOA.', show: 'sum.1' },
        { say: 'Label the sides from your angle, starting with the hypotenuse.', show: 'sum.2' },
        { say: 'And choose the ratio that links the side you know and the side you want. In part two, we will use these ratios to find sides and angles. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
