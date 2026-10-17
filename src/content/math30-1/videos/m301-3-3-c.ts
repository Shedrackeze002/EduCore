import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const s1 = steps('sd');
const s2 = steps('sd');
const s3 = steps('sd');

const video: Explainer = {
  id: 'm301-3-3-c',
  lessonId: 'm301-3-3',
  title: 'The Factor Theorem, Part 3: Factoring Higher Degrees',
  thumbnailTitle: 'Factoring Higher Degrees',
  thumbnail: 'sd',
  summary: 'Factoring the quartic x⁴ − 5x³ + 5x² + 5x − 6 completely with two synthetic divisions, testing values again on each quotient, and factoring 3x³ − 2x² − 37x − 12, whose fractional zero the integral zero theorem cannot find. Part 4 covers grouping and unknown coefficients.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.3 · Part 3', title: 'Factoring Higher Degrees', subtitle: 'Find a zero, divide, repeat' }],
      lines: [
        { say: 'A quartic has degree four, so one division is not enough. You find a zero and divide, then do it all again with the quotient.', show: 'title' },
        { say: 'In this video, you will factor a quartic with two synthetic divisions, and a cubic whose leading coefficient is not one.' },
      ],
    },
    {
      chapter: 'The first division',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = x^4 - 5x^3 + 5x^2 + 5x - 6', 'P(1) = 1 - 5 + 5 + 5 - 6 = 0'] },
        figure('sd', [synthetic({ a: 1, coeffs: [1, -5, 5, 5, -6] })], 250),
        { kind: 'math', id: 'q', size: 'md', lines: ['Q(x) = x^3 - 4x^2 + x + 6'] },
      ],
      lines: [
        { say: 'Factor P of x equals x to the fourth, minus five x cubed, plus five x squared, plus five x, minus six, completely.', show: 'm.0', focus: 'm.0' },
        { say: 'The possible integral zeros are the factors of negative six: plus or minus one, two, three and six. Test one: the sum of the coefficients is one, minus five, plus five, plus five, minus six, which is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'So divide by x minus one. Bring down the one. One times one is one, and negative five plus one is negative four.', show: [...s1.setup, s1.bring, ...s1.step(1)], focus: ['m', 'sd.s1'] },
        { say: 'Negative four times one is negative four, and five plus negative four is one. Then one times one is one, and five plus one is six.', show: [...s1.step(2), ...s1.step(3)], focus: 'sd.s3' },
        { say: 'Six times one is six, and negative six plus six is zero. The remainder is zero, so x minus one is a factor.', show: [...s1.step(4), s1.box], focus: 'sd.s4' },
        { say: 'The quotient is a cubic. Call it Q of x: x cubed, minus four x squared, plus x, plus six.', show: 'q.0', focus: ['q.0', 'sd'] },
      ],
    },
    {
      chapter: 'The second division',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['Q(1) = 4,\\qquad Q(-1) = -1 - 4 - 1 + 6 = 0'] },
        figure('sd', [synthetic({ a: -1, coeffs: [1, -4, 1, 6] })], 250),
        { kind: 'math', id: 'q', size: 'md', lines: ['x^2 - 5x + 6 = (x - 2)(x - 3)', 'P(x) = (x + 1)(x - 1)(x - 2)(x - 3)'] },
      ],
      lines: [
        { say: 'Now factor Q of x. A zero can repeat, so test one again: Q of one is four, so this time one is not a zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Try negative one. Q of negative one is negative one, minus four, minus one, plus six, which is zero. So x plus one is a factor.' },
        { say: 'Divide Q of x by x plus one, using negative one. Bring down the one. One times negative one is negative one, and negative four plus negative one is negative five.', show: [...s2.setup, s2.bring, ...s2.step(1)], focus: ['m', 'sd.s1'] },
        { say: 'Negative five times negative one is five, and one plus five is six. Six times negative one is negative six, and six plus negative six is zero.', show: [...s2.step(2), ...s2.step(3), s2.box], focus: 'sd.s3' },
        { say: 'The quotient is x squared, minus five x, plus six, which factors as x minus two, times x minus three.', show: 'q.0', focus: ['q.0', 'sd'] },
        { say: 'Put all the factors together. P of x equals x plus one, times x minus one, times x minus two, times x minus three.', show: 'q.1', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Other leading coefficients',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = 3x^3 - 2x^2 - 37x - 12', 'P(-3) = -81 - 18 + 111 - 12 = 0'] },
        figure('sd', [synthetic({ a: -3, coeffs: [3, -2, -37, -12], gap: 2.4 })], 250),
        { kind: 'math', id: 'q', size: 'md', lines: ['3x^2 - 11x - 4 = (3x + 1)(x - 4)', 'P(x) = (x + 3)(3x + 1)(x - 4)'] },
      ],
      lines: [
        { say: 'When the leading coefficient is not one, some zeros may be fractions, which the integral zero theorem cannot find. Factor P of x equals three x cubed, minus two x squared, minus 37 x, minus twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Any integer zero must still divide negative twelve. Testing those values, negative three works: negative 81, minus eighteen, plus 111, minus twelve, is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by x plus three. Bring down the three. Three times negative three is negative nine, and negative two plus negative nine is negative eleven.', show: [...s3.setup, s3.bring, ...s3.step(1)], focus: ['m', 'sd.s1'] },
        { say: 'Negative eleven times negative three is 33, and negative 37 plus 33 is negative four. Negative four times negative three is twelve, and negative twelve plus twelve is zero.', show: [...s3.step(2), ...s3.step(3), s3.box], focus: 'sd.s3' },
        { say: 'The quotient is three x squared, minus eleven x, minus four. Factor it as usual: three x plus one, times x minus four.', show: 'q.0', focus: ['q.0', 'sd'] },
        { say: 'So P of x equals x plus three, times three x plus one, times x minus four. One zero is negative one third, a fraction. The list of integer factors could never find it, but dividing did.', show: 'q.1', focus: 'q.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $P(x) = x^3 - 7x - 6$ completely.',
          choices: ['$(x + 1)(x + 2)(x - 3)$', '$(x - 1)(x - 2)(x + 3)$', '$(x + 1)(x^2 - x - 6)$', '$(x + 1)(x - 2)(x + 3)$'],
          answer: 0,
          working: '$P(-1) = -1 + 7 - 6 = 0$. Dividing $1, 0, -7, -6$ by $x + 1$ leaves $x^2 - x - 6 = (x - 3)(x + 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor P of x equals x cubed, minus seven x, minus six, completely. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. P of negative one is negative one, plus seven, minus six, which is zero, so x plus one is a factor. Synthetic division, with a zero for the missing x squared term, leaves x squared, minus x, minus six, which is x minus three, times x plus two. C stops too early: its quadratic still factors.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['For a quartic, find a zero, divide, and repeat with the cubic quotient.', 'A zero can repeat, so test values again on each quotient.', 'When $a_n \\ne 1$, find the integer zeros, divide, and factor the quadratic quotient.'] }],
      lines: [
        { say: 'Let’s sum up. To factor a quartic, find a zero, divide, and repeat with the cubic quotient.', show: 'sum.0' },
        { say: 'A zero can repeat, so test values again on each quotient.', show: 'sum.1' },
        { say: 'And when the leading coefficient is not one, find the integer zeros, divide, and factor the quadratic quotient as usual. In part four, we factor by grouping, decide when a factorization is complete, and find unknown coefficients. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
