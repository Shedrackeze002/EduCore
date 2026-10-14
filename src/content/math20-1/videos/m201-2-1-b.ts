import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-2-1-b',
  lessonId: 'm201-2-1',
  title: 'Angles in Standard Position, Part 2: Special Triangles',
  thumbnailTitle: 'Special Triangles',
  thumbnail: 't30',
  summary: 'The 45°–45°–90° triangle with sides 1, 1 and √2, the 30°–60°–90° triangle cut from an equilateral triangle with sides 1, √3 and 2, and the exact sine, cosine and tangent of 30°, 45° and 60°. Part 3 uses them in every quadrant.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 2.1 · Part 2', title: 'Special Triangles', subtitle: 'Exact values for 30°, 45° and 60°' }],
      lines: [
        { say: 'A calculator says the sine of sixty degrees is 0.8660254, and the digits never end. Two special triangles give the exact value instead.', show: 'title' },
        { say: 'In this video, you will build the two special triangles, and read exact trigonometric ratios from them.' },
      ],
    },
    {
      chapter: '45°–45°–90°',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'triangle', id: 't45', adj: 1, opp: 1, labels: { theta: '45^\\circ', other: '45^\\circ', opp: '1', adj: '1', hyp: '\\sqrt{2}' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['c = \\sqrt{1^2 + 1^2} = \\sqrt{2}', '\\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}', '\\tan 45^\\circ = \\dfrac{1}{1} = 1'] }],
      lines: [
        { say: 'The first is an isosceles right triangle, with both legs one. Its two acute angles are equal, so each is 45 degrees.', show: ['t45.shape', 't45.theta', 't45.other', 't45.opp', 't45.adj'] },
        { say: 'By the Pythagorean theorem, the hypotenuse is the square root of one squared plus one squared: root two.', show: ['t45.hyp', 'm.0'], focus: ['t45.hyp', 'm.0'] },
        { say: 'So the sine and cosine of 45 degrees are both one over root two, which we usually write as root two over two. And the tangent is one over one: one.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: '30°–60°–90°',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'triangle', id: 't30', adj: 1.7320508, opp: 1, labels: { theta: '30^\\circ', other: '60^\\circ', opp: '1', adj: '\\sqrt{3}', hyp: '2' } }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{equilateral, sides } 2', '\\text{half: hypotenuse } 2,\\ \\text{base } 1', '\\sqrt{2^2 - 1^2} = \\sqrt{3}'] }],
      lines: [
        { say: 'For the second, start with an equilateral triangle with sides of two. All its angles are sixty degrees. Cut it in half down the middle.', show: 'm.0' },
        { say: 'Each half is a right triangle with angles of thirty, sixty and ninety degrees. Its hypotenuse is two, and the side opposite thirty degrees is half the base: one.', show: ['t30.shape', 't30.theta', 't30.other', 't30.hyp', 't30.opp', 'm.1'], focus: ['t30.hyp', 't30.opp'] },
        { say: 'The third side is the square root of two squared minus one squared: root three.', show: ['t30.adj', 'm.2'], focus: ['t30.adj', 'm.2'] },
      ],
    },
    {
      chapter: 'Exact values',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['$\\theta$', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$'], rows: [['$\\sin\\theta$', '$\\frac{1}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{\\sqrt{3}}{2}$'], ['$\\cos\\theta$', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{1}{2}$'], ['$\\tan\\theta$', '$\\frac{\\sqrt{3}}{3}$', '$1$', '$\\sqrt{3}$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Rationalized form', md: '$\\tan 30^\\circ = \\dfrac{1}{\\sqrt{3}}$, which we usually write as $\\dfrac{\\sqrt{3}}{3}$. Both are exact, and both are correct.' },
      ],
      lines: [
        { say: 'Read the exact values from the triangles with SOH CAH TOA. Opposite thirty degrees is one, and the hypotenuse is two, so the sine of thirty is one half.', show: 't.0', focus: 't.0' },
        { say: 'The side adjacent to thirty degrees is root three, so the cosine of thirty is root three over two. From sixty degrees, the opposite side is root three and the adjacent side is one, so the tangent of sixty is root three.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'The tangent of thirty is one over root three, which we usually write as root three over three. Both forms are exact, and both are correct.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the exact value of $\\cos 60^\\circ$?',
          choices: ['$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\sqrt{3}$', '$\\dfrac{\\sqrt{2}}{2}$'],
          answer: 0,
          working: 'In the $30^\\circ$–$60^\\circ$–$90^\\circ$ triangle, the side adjacent to $60^\\circ$ is $1$ and the hypotenuse is $2$: $\\cos 60^\\circ = \\dfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the exact value of the cosine of sixty degrees? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. From sixty degrees, the adjacent side is one and the hypotenuse is two, so the cosine is one half. B is the sine of sixty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$45^\\circ$–$45^\\circ$–$90^\\circ$: sides $1$, $1$, $\\sqrt{2}$.', '$30^\\circ$–$60^\\circ$–$90^\\circ$: sides $1$, $\\sqrt{3}$, $2$.', 'Read exact values with SOH CAH TOA.'] }],
      lines: [
        { say: 'Let’s sum up. The 45, 45, ninety triangle has sides one, one and root two.', show: 'sum.0' },
        { say: 'The thirty, sixty, ninety triangle has sides one, root three and two, with the one opposite thirty degrees.', show: 'sum.1' },
        { say: 'And read exact values from them with SOH CAH TOA. In part three, we find exact values in every quadrant. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
