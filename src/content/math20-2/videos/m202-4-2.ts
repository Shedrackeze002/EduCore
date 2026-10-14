import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-4-2',
  lessonId: 'm202-4-2',
  title: 'Adding, Subtracting and Multiplying Radicals, Part 1: Like Radicals',
  thumbnailTitle: 'Adding and Subtracting Radicals',
  thumbnail: 'm',
  summary: 'Like radicals and like terms, combining 4√2 + 3√5 − √2 + 2√5, why √2 + √3 is not √5, and simplifying first so that √12 + √75 becomes 7√3 and 3√20 − √45 becomes 3√5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 4.2 · Part 1', title: 'Like Radicals', subtitle: 'Adding and subtracting' }],
      lines: [
        { say: 'Adding radicals works a lot like collecting like terms in algebra. Once you see the connection, it is quick.', show: 'title' },
        { say: 'In this video, you will add and subtract radicals, and learn the one mistake to avoid.' },
      ],
    },
    {
      chapter: 'Like radicals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Like radicals', md: '**Like radicals** have the same radicand, such as $5\\sqrt{3}$ and $-2\\sqrt{3}$. Unlike radicals, such as $\\sqrt{2}$ and $\\sqrt{3}$, cannot be combined into one term.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5x + 2x - x = 6x', '5\\sqrt{3} + 2\\sqrt{3} - \\sqrt{3} = 6\\sqrt{3}'] },
      ],
      lines: [
        { say: 'Like radicals have the same radicand, such as five root three, and negative two root three. Unlike radicals, such as root two and root three, cannot be combined into one term.', show: 'def' },
        { say: 'Think of like terms. Five x plus two x minus x is six x: you combine the numbers in front, and the x stays the same.', show: 'm.0', focus: 'm.0' },
        { say: 'Like radicals work the same way. Five root three, plus two root three, minus root three, is six root three. Combine the coefficients, and the radical stays the same.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two kinds of radicals',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4\\sqrt{2} + 3\\sqrt{5} - \\sqrt{2} + 2\\sqrt{5}', '= (4 - 1)\\sqrt{2} + (3 + 2)\\sqrt{5}', '= 3\\sqrt{2} + 5\\sqrt{5}'] }],
      lines: [
        { say: 'Simplify four root two, plus three root five, minus root two, plus two root five.', show: 'm.0', focus: 'm.0' },
        { say: 'Group the like radicals. The root twos have coefficients four and negative one. The root fives have three and two.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is three root two, plus five root five. These are unlike radicals, so the answer stays as two terms.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adding the radicands',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the radicands', md: '$\\sqrt{2} + \\sqrt{3}$ is **not** $\\sqrt{5}$. Check: $1.414 + 1.732 = 3.146$, but $\\sqrt{5} \\approx 2.236$. The sum $\\sqrt{2} + \\sqrt{3}$ is already in simplest form.' }],
      lines: [
        { say: 'The one mistake to avoid: root two plus root three is not root five. Check with a calculator. Root two plus root three is about 3.146, but root five is only about 2.236. Root two plus root three is already in simplest form.', show: 'oops' },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{12} + \\sqrt{75} = 2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}', '3\\sqrt{20} - \\sqrt{45} = 3 \\times 2\\sqrt{5} - 3\\sqrt{5}', '= 6\\sqrt{5} - 3\\sqrt{5} = 3\\sqrt{5}'] }],
      lines: [
        { say: 'Radicals that look different may become like radicals once they are simplified. Root twelve is two root three, and root seventy-five is five root three. So their sum is seven root three.', show: 'm.0', focus: 'm.0' },
        { say: 'Now three root twenty, minus root forty-five. Root twenty is two root five, so three root twenty is six root five. And root forty-five is three root five.', show: 'm.1', focus: 'm.1' },
        { say: 'Six root five, minus three root five, is three root five. So always simplify every radical first.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\sqrt{50} + \\sqrt{8}$.',
          choices: ['$7\\sqrt{2}$', '$\\sqrt{58}$', '$3\\sqrt{2}$', '$10\\sqrt{2}$'],
          answer: 0,
          working: '$\\sqrt{50} = 5\\sqrt{2}$ and $\\sqrt{8} = 2\\sqrt{2}$, so the sum is $7\\sqrt{2}$. B adds the radicands.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify root fifty, plus root eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Root fifty is five root two, and root eight is two root two, so the sum is seven root two. B adds the radicands, which never works.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Like radicals have the same radicand: combine the coefficients.', '$\\sqrt{a} + \\sqrt{b} \\ne \\sqrt{a + b}$.', 'Simplify every radical first; it may become a like radical.'] }],
      lines: [
        { say: 'Let’s sum up. Like radicals have the same radicand, and you combine them by adding or subtracting the coefficients.', show: 'sum.0' },
        { say: 'Never add the radicands: root "a" plus root b is not the root of "a" plus b.', show: 'sum.1' },
        { say: 'And simplify every radical first, because unlike-looking radicals may turn out to be like radicals. In part two, we multiply radicals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
