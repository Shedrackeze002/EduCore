import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-5-2',
  lessonId: 'm201-5-2',
  title: 'Multiplying and Dividing Radicals, Part 1: Multiplying',
  thumbnailTitle: 'Multiplying Radicals',
  thumbnail: 'am',
  summary: 'Multiplying coefficients and radicands, as in (2√6)(5√15) = 30√10 and (3√(2x))(4√(6x)) = 24x√3, expanding (2 + √3)(4 − √3) with an area model, and squaring (3 − √2) without losing the middle term. Parts 2 and 3 rationalize denominators.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.2 · Part 1', title: 'Multiplying Radicals', subtitle: 'Coefficients and radicands' }],
      lines: [
        { say: 'Formulas in physics and engineering often produce products like two plus root three, times four minus root three. They can be simplified exactly.', show: 'title' },
        { say: 'In this video, you will multiply radicals, from single terms to binomials.' },
      ],
    },
    {
      chapter: 'Multiplying monomials',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\left(a\\sqrt{m}\\right)\\left(b\\sqrt{n}\\right) = ab\\sqrt{mn} \\quad (m, n \\ge 0)', '\\left(2\\sqrt{6}\\right)\\left(5\\sqrt{15}\\right) = 10\\sqrt{90} = 10 \\times 3\\sqrt{10} = 30\\sqrt{10}', '\\left(3\\sqrt{2x}\\right)\\left(4\\sqrt{6x}\\right) = 12\\sqrt{12x^2} = 24x\\sqrt{3}'] }],
      lines: [
        { say: 'To multiply radicals, multiply the coefficients together, and the radicands together. Then simplify.', show: 'm.0', focus: 'm.0' },
        { say: 'Two root six, times five root fifteen: two times five is ten, and six times fifteen is ninety. Root ninety is three root ten, so the product is thirty root ten.', show: 'm.1', focus: 'm.1' },
        { say: 'With variables, assume x is non-negative. Three root two x, times four root six x, is twelve root twelve x squared. Root twelve x squared is two x root three, so the product is twenty-four x root three.', show: 'm.2', focus: 'm.2' },
        { say: 'You may simplify each radical first, or multiply first. The result is the same, but multiplying first, then taking out the largest perfect square, is usually less work.' },
      ],
    },
    {
      chapter: 'Multiplying binomials',
      layout: 'split',
      leftWidth: 460,
      left: [figure('am', [areaModel({ top: ['4', '-\\sqrt{3}'], side: ['2', '\\sqrt{3}'], cells: [['8', '-2\\sqrt{3}'], ['4\\sqrt{3}', '-3']] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\left(2 + \\sqrt{3}\\right)\\left(4 - \\sqrt{3}\\right)', '= 8 - 2\\sqrt{3} + 4\\sqrt{3} - \\left(\\sqrt{3}\\right)^2', '= 8 + 2\\sqrt{3} - 3', '= 5 + 2\\sqrt{3}'] }],
      lines: [
        { say: 'Multiply binomials with the distributive property, just as with polynomials, and use the fact that root m, squared, is m. Expand two plus root three, times four minus root three.', show: ['m.0', 'am.top', 'am.side', 'am.outline', 'am.grid'], focus: 'm.0' },
        { say: 'The four products are eight, negative two root three, four root three, and negative root three, squared, which is negative three.', show: ['am.c0-0', 'am.c0-1', 'am.c1-0', 'am.c1-1', 'm.1'], focus: 'm.1' },
        { say: 'Collect like terms. Negative two root three plus four root three is two root three.', show: 'm.2', focus: 'm.2' },
        { say: 'And eight minus three is five. So the product is five plus two root three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Squaring a binomial',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(3 - \\sqrt{2}\\right)^2 = 9 - 3\\sqrt{2} - 3\\sqrt{2} + 2', '= 11 - 6\\sqrt{2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The missing middle term', md: '$\\left(3 - \\sqrt{2}\\right)^2$ is **not** $9 + 2$ or $9 - 2$. Squaring a binomial always gives a middle term: $(a - b)^2 = a^2 - 2ab + b^2$.' },
      ],
      lines: [
        { say: 'Expand three minus root two, squared. Write it as three minus root two, times itself: nine, minus three root two, minus three root two, plus two.', show: 'm.0', focus: 'm.0' },
        { say: 'So it is eleven minus six root two.', show: 'm.1', focus: 'm.1' },
        { say: 'Squaring a binomial always produces a middle term. Three minus root two, squared, is not nine plus two, and not nine minus two.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $\\left(1 + \\sqrt{5}\\right)^2$.',
          choices: ['$6 + 2\\sqrt{5}$', '$6$', '$6 + \\sqrt{5}$', '$1 + 2\\sqrt{5}$'],
          answer: 0,
          working: '$\\left(1 + \\sqrt{5}\\right)^2 = 1 + \\sqrt{5} + \\sqrt{5} + 5 = 6 + 2\\sqrt{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand one plus root five, squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One plus root five, times itself, is one, plus root five, plus root five, plus five: six plus two root five. B forgets the middle term, and C counts it only once.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\left(a\\sqrt{m}\\right)\\left(b\\sqrt{n}\\right) = ab\\sqrt{mn}$, then simplify.', 'Expand binomials with the distributive property; $\\left(\\sqrt{m}\\right)^2 = m$.', 'Squaring a binomial gives a middle term.'] }],
      lines: [
        { say: 'Let’s sum up. Multiply coefficients together, and radicands together, then simplify.', show: 'sum.0' },
        { say: 'Expand binomials with the distributive property, using root m, squared, equals m.', show: 'sum.1' },
        { say: 'And squaring a binomial always gives a middle term. In part two, we rationalize denominators. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
