import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-1-3-b',
  lessonId: 'm201-1-3',
  title: 'Geometric Sequences, Part 2: Missing Terms, Growth and Decay',
  thumbnailTitle: 'Growth and Decay',
  thumbnail: 'bounce',
  summary: 'Finding the ratio from two terms (a cube root, and an even power with two possible ratios), finding which term a value is, depreciation of a truck at 15% a year, and a ball that bounces to three quarters of its height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.3 · Part 2', title: 'Growth and Decay', subtitle: 'Missing terms and real models' }],
      lines: [
        { say: 'The general term links four quantities, just as it does for an arithmetic sequence. But now, finding a missing ratio means taking a root.', show: 'title' },
        { say: 'In this video, you will work from two terms, find the position of a term, and model growth and decay.' },
      ],
    },
    {
      chapter: 'From two terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['t_5 = t_2 r^3:\\quad 324 = 12r^3,\\quad r^3 = 27,\\quad r = 3', 't_1 = \\dfrac{12}{3} = 4,\\quad t_7 = 4(3)^6 = 2916', '45 = 5r^2,\\quad r^2 = 9,\\quad r = \\pm 3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative square root', md: 'An even gap ($r^2$, $r^4$, …) gives two real ratios, $\\pm$. Keep both unless the terms must be positive. An odd gap ($r^3$) gives only one.' },
      ],
      lines: [
        { say: 'Between two terms, there is one factor of r for every step. In a geometric sequence, t sub two is twelve and t sub five is 324. Find t sub seven.' },
        { say: 'From term two to term five is three steps, so 324 equals twelve times r cubed. Then r cubed is 27, and r is the cube root: three.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide back one step for the first term: twelve over three is four. Then t sub seven is four times three to the sixth: 2,916.', show: 'm.1', focus: 'm.1' },
        { say: 'Now suppose t sub one is five and t sub three is 45. Then 45 equals five r squared, r squared is nine, and r is three, or negative three. Both work: five, fifteen, 45, and five, negative fifteen, 45.', show: 'm.2', focus: 'm.2' },
        { say: 'So with an even power, keep both ratios unless the question says the terms are positive. An odd power has only one real root.', show: 'oops' },
      ],
    },
    {
      chapter: 'Which term is it?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1536 = 3(2)^{n-1}', '2^{n-1} = 512 = 2^9', 'n - 1 = 9,\\quad n = 10'] }],
      lines: [
        { say: 'Which term of three, six, twelve is 1,536? Set up the general term: 1,536 equals three times two to the n minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by t sub one: two to the n minus one is 512. Now write 512 as a power of two: two to the ninth.', show: 'm.1', focus: 'm.1' },
        { say: 'So n minus one is nine, and n is ten. 1,536 is the tenth term.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Depreciation',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['r = 1 - 0.15 = 0.85', '\\$40\\,000(0.85)^3 = \\$40\\,000(0.614125) = \\$24\\,565'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the starting point', md: 'The price when new is the value at time $0$, so after $3$ years multiply by $r^3$, not $r^2$.' },
      ],
      lines: [
        { say: 'Growth by p percent each period multiplies by one plus p over 100. Decay by p percent multiplies by one minus p over 100.' },
        { say: 'In this example, a truck bought for 40,000 dollars loses fifteen percent of its value each year. So each year, its value is multiplied by 0.85.', show: 'm.0', focus: 'm.0' },
        { say: 'After three years, it is worth 40,000 times 0.85 cubed: 24,565 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Check the starting point. The price when new is the value at time zero, so after three years you multiply by r cubed, not r squared.', show: 'tip' },
      ],
    },
    {
      chapter: 'A bouncing ball',
      layout: 'split',
      leftWidth: 560,
      left: [figure('bounce', [barGraph({ categories: ['0', '1', '2', '3', '4'], values: [256, 192, 144, 108, 81], max: 280, step: 40, height: 5, tone: 'opp', titles: { x: 'Bounce', y: 'Height (cm)' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = 256\\left(\\tfrac{3}{4}\\right)^n', '81 = 256\\left(\\tfrac{3}{4}\\right)^n', '\\left(\\tfrac{3}{4}\\right)^n = \\tfrac{81}{256} = \\left(\\tfrac{3}{4}\\right)^4'] }],
      lines: [
        { say: 'A ball is dropped from 256 centimetres. After each bounce, it rises to three quarters of the height it fell from. After which bounce does it rise to 81 centimetres?', show: ['bounce.scale', 'bounce.b0'] },
        { say: 'After bounce n, the height is 256 times three quarters to the n.', show: ['bounce.b1', 'bounce.b2', 'bounce.b3', 'bounce.b4', 'm.0'], focus: 'm.0' },
        { say: 'Set it equal to 81 and divide: three quarters to the n is 81 over 256. That is three to the fourth over four to the fourth, so n is four: it rises to 81 centimetres after the fourth bounce.', show: ['m.1', 'm.2', 'bounce.v4'], focus: ['m.2', 'bounce.b4'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A town of $8000$ people grows by $5\\%$ each year. Which expression gives its population after $6$ years?',
          choices: ['$8000(1.05)^6$', '$8000(0.95)^6$', '$8000(1.05)^5$', '$8000(5)^6$'],
          answer: 0,
          working: 'Growth by $5\\%$ multiplies by $r = 1.05$ each year, and the starting value is at time $0$, so after $6$ years: $8000(1.05)^6$.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, a town of 8,000 people grows by five percent each year. Which expression gives its population after six years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Growth by five percent multiplies by 1.05 each year, and 8,000 is the value at time zero, so use the sixth power. B is decay, and C uses one year too few.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From two terms: $t_q = t_p\\, r^{\\,q-p}$. An even power gives $\\pm r$.', 'To find $n$, write the result as a power of $r$.', 'Growth: $r = 1 + \\frac{p}{100}$. Decay: $r = 1 - \\frac{p}{100}$.'] }],
      lines: [
        { say: 'Let’s sum up. From two terms, there is one factor of r for every step, and an even power gives two possible ratios.', show: 'sum.0' },
        { say: 'To find n, divide by the first term, and write the result as a power of r.', show: 'sum.1' },
        { say: 'And growth by p percent multiplies by one plus p over 100, while decay multiplies by one minus p over 100. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
