import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-5-1-c',
  lessonId: 'm201-5-1',
  title: 'Working with Radicals, Part 3: Adding and Subtracting',
  thumbnailTitle: 'Adding and Subtracting Radicals',
  thumbnail: 'm',
  summary: 'Like radicals and why they combine like like terms, simplifying first in √50 + √18 − √8 and √12 + √50 − √27 + √8, variable radicands, and why √2 + √3 is not √5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.1 · Part 3', title: 'Adding and Subtracting Radicals', subtitle: 'Combine like radicals' }],
      lines: [
        { say: 'Can you add root two and root three to get root five? Try it on a calculator, and you will see why not.', show: 'title' },
        { say: 'In this video, you will add and subtract radicals by combining like radicals, the same way you combine like terms.' },
      ],
    },
    {
      chapter: 'Like radicals',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Like radicals', md: '**Like radicals** have the same index and the same radicand, such as $5\\sqrt{2}$ and $-3\\sqrt{2}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\sqrt{2} - 3\\sqrt{2} = 2\\sqrt{2}', '5x - 3x = 2x'] },
      ],
      lines: [
        { say: 'Like radicals have the same index and the same radicand, such as five root two and negative three root two.', show: 'def' },
        { say: 'They combine the way like terms do. Five root two, minus three root two, is two root two, just as five x, minus three x, is two x.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'Simplify, then combine',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{50} + \\sqrt{18} - \\sqrt{8} = 5\\sqrt{2} + 3\\sqrt{2} - 2\\sqrt{2}', '= 6\\sqrt{2}', '\\sqrt{12} + \\sqrt{50} - \\sqrt{27} + \\sqrt{8}', '= 2\\sqrt{3} + 5\\sqrt{2} - 3\\sqrt{3} + 2\\sqrt{2} = 7\\sqrt{2} - \\sqrt{3}'] }],
      lines: [
        { say: 'Radicals that do not look alike may become like radicals once they are simplified. Simplify root fifty, plus root eighteen, minus root eight. Root fifty is five root two, root eighteen is three root two, and root eight is two root two.', show: 'm.0', focus: 'm.0' },
        { say: 'Now they are like radicals. Five plus three minus two is six, so the result is six root two.', show: 'm.1', focus: 'm.1' },
        { say: 'With two kinds of radicals, simplify, then group them. Simplify root twelve, plus root fifty, minus root twenty-seven, plus root eight.', show: 'm.2', focus: 'm.2' },
        { say: 'That is two root three, plus five root two, minus three root three, plus two root two. The root twos add to seven root two, and the root threes to negative root three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Variable radicands',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x\\sqrt{12x} + 3\\sqrt{27x^3} - 2x\\sqrt{3x}', '= 2x\\sqrt{3x} + 9x\\sqrt{3x} - 2x\\sqrt{3x}', '= 9x\\sqrt{3x}'] }],
      lines: [
        { say: 'Assume x is non-negative, and simplify x root twelve x, plus three root twenty-seven x cubed, minus two x root three x.', show: 'm.0', focus: 'm.0' },
        { say: 'x root twelve x is x times two root three x, or two x root three x. And three root twenty-seven x cubed is three times three x root three x, or nine x root three x.', show: 'm.1', focus: 'm.1' },
        { say: 'All three terms are multiples of x root three x. Two plus nine minus two is nine, so the result is nine x root three x.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Adding radicands',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{2} + \\sqrt{3} \\approx 1.414 + 1.732 = 3.146', '\\sqrt{5} \\approx 2.236'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding radicands', md: '$\\sqrt{2} + \\sqrt{3} \\ne \\sqrt{5}$. Only the **coefficients** of like radicals are added; the radicand never changes.' },
      ],
      lines: [
        { say: 'Root two plus root three is not root five. Check with a calculator: 1.414 plus 1.732 is 3.146, but root five is only about 2.236.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Only the coefficients of like radicals are added. The radicand never changes, and unlike radicals stay separate.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\sqrt{75} - \\sqrt{12}$.',
          choices: ['$3\\sqrt{3}$', '$\\sqrt{63}$', '$7\\sqrt{3}$', '$3$'],
          answer: 0,
          working: '$\\sqrt{75} = 5\\sqrt{3}$ and $\\sqrt{12} = 2\\sqrt{3}$, so $\\sqrt{75} - \\sqrt{12} = 3\\sqrt{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify root seventy-five, minus root twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Root seventy-five is five root three, and root twelve is two root three. Five minus two is three, so the result is three root three. B subtracts the radicands, and C adds the coefficients.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Like radicals have the same index and radicand.', 'Simplify first, then combine the coefficients of like radicals.', 'Never add the radicands.'] }],
      lines: [
        { say: 'Let’s sum up. Like radicals have the same index and the same radicand.', show: 'sum.0' },
        { say: 'Simplify each radical first, then combine the coefficients of like radicals.', show: 'sum.1' },
        { say: 'And never add the radicands. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
