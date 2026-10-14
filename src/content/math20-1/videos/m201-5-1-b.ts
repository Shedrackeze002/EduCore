import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-5-1-b',
  lessonId: 'm201-5-1',
  title: 'Working with Radicals, Part 2: Variables and Comparing',
  thumbnailTitle: 'Variables and Comparing Radicals',
  thumbnail: 'nl',
  summary: 'Why √x⁶ = x³ and √x² = |x|, simplifying √(72x⁵y²), writing 3a²√(2a) as an entire radical, and ordering 3√5, 2√11, 4√3 and 7 by converting them to entire radicals, including why the order flips for negatives.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 5.1 · Part 2', title: 'Variables and Comparing', subtitle: 'Even exponents and entire radicals' }],
      lines: [
        { say: 'Radicals can hold variables too, and two radicals that look quite different can be surprisingly close in value.', show: 'title' },
        { say: 'In this video, you will simplify radicals with variables, write mixed radicals as entire radicals, and use that to put radicals in order.' },
      ],
    },
    {
      chapter: 'Variable radicands',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\sqrt{x^6} = x^3, \\ \\text{since}\\ \\left(x^3\\right)^2 = x^6', '\\sqrt{x^2} = |x|:\\quad \\sqrt{(-3)^2} = \\sqrt{9} = 3', '\\sqrt{72x^5y^2} = \\sqrt{36x^4y^2}\\,\\sqrt{2x} = 6x^2y\\sqrt{2x}'] }],
      lines: [
        { say: 'A power with an even exponent is a perfect square. x to the sixth is x cubed, squared, so the square root of x to the sixth is x cubed. Taking a square root halves an even exponent.', show: 'm.0', focus: 'm.0' },
        { say: 'Careful: the square root of x squared is the absolute value of x, not x. The square root of negative three, squared, is the square root of nine, which is three.', show: 'm.1', focus: 'm.1' },
        { say: 'In this unit, we state that the variables are non-negative, so no absolute value signs are needed.' },
        { say: 'Assume x and y are non-negative, and simplify the square root of seventy-two x to the fifth, y squared. Split off the largest perfect square, thirty-six x to the fourth, y squared. Its square root is six x squared y, which leaves root two x inside.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixed to entire',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3a^2\\sqrt{2a} = \\sqrt{9a^4}\\,\\sqrt{2a} = \\sqrt{18a^5}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Taking the root of the exponent', md: '$\\sqrt{x^6}$ is $x^3$, not $x^4$ or $x^{\\sqrt{6}}$. Halve the exponent: $\\left(x^3\\right)^2 = x^6$.' },
      ],
      lines: [
        { say: 'To go the other way, write the outside factor as a square root. Assume "a" is non-negative. Three "a" squared is the square root of nine "a" to the fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply the radicands: three "a" squared, times root two "a", is the square root of eighteen "a" to the fifth.' },
        { say: 'And remember that a square root halves an even exponent. The square root of x to the sixth is x cubed, not x to the fourth.', show: 'oops' },
      ],
    },
    {
      chapter: 'Comparing radicals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\sqrt{5} = \\sqrt{45},\\ \\ 2\\sqrt{11} = \\sqrt{44},\\ \\ 4\\sqrt{3} = \\sqrt{48},\\ \\ 7 = \\sqrt{49}', '2\\sqrt{11} < 3\\sqrt{5} < 4\\sqrt{3} < 7'] },
        figure(
          'nl',
          [
            numberLine({
              min: 6.5,
              max: 7.1,
              step: 0.1,
              every: 0,
              length: 16,
              points: [
                { id: 'p1', value: 2 * Math.sqrt(11), tex: '2\\sqrt{11}', tone: 'adj' },
                { id: 'p2', value: 3 * Math.sqrt(5), tex: '3\\sqrt{5}', tone: 'opp', below: true },
                { id: 'p3', value: 4 * Math.sqrt(3), tex: '4\\sqrt{3}', tone: 'good' },
                { id: 'p4', value: 7, tex: '7', tone: 'brand', below: true },
              ],
            }),
          ],
          150,
        ),
      ],
      lines: [
        { say: 'To compare radicals without a calculator, write each one as an entire radical. Order three root five, two root eleven, four root three, and seven, from least to greatest.' },
        { say: 'Three root five is root forty-five, two root eleven is root forty-four, four root three is root forty-eight, and seven is root forty-nine.', show: 'm.0', focus: 'm.0' },
        { say: 'For non-negative numbers, the larger radicand gives the larger root. So the order is two root eleven, three root five, four root three, then seven.', show: ['m.1', 'nl.axis', 'nl.p1', 'nl.p2', 'nl.p3', 'nl.p4'], focus: 'm.1' },
        { say: 'The four numbers are very close together, which is why converting is more reliable than estimating.', focus: 'nl.axis' },
        { say: 'For negative radicals, the order flips. Negative two root five is less than negative three root two, because root twenty is farther from zero than root eighteen.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is greater, $5\\sqrt{2}$ or $3\\sqrt{6}$?',
          choices: ['$3\\sqrt{6}$', '$5\\sqrt{2}$', 'They are equal.', 'It cannot be decided without a calculator.'],
          answer: 0,
          working: '$5\\sqrt{2} = \\sqrt{50}$ and $3\\sqrt{6} = \\sqrt{54}$. Since $54 > 50$, $3\\sqrt{6}$ is greater.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is greater, five root two, or three root six? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five root two is root fifty, and three root six is root fifty-four. Fifty-four is greater than fifty, so three root six is greater, even though its coefficient is smaller.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Even exponents are perfect squares: $\\sqrt{x^6} = x^3$.', 'State that variables are non-negative, since $\\sqrt{x^2} = |x|$.', 'Compare radicals as entire radicals; for negatives, the order flips.'] }],
      lines: [
        { say: 'Let’s sum up. A power with an even exponent is a perfect square, and its square root halves the exponent.', show: 'sum.0' },
        { say: 'Since the square root of x squared is the absolute value of x, state that the variables are non-negative.', show: 'sum.1' },
        { say: 'And compare radicals by writing them as entire radicals, remembering that the order flips for negatives. In part three, we add and subtract radicals. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
