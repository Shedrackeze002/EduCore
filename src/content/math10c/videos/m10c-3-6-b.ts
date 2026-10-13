import type { Explainer } from '@/video/script.ts';
import { figure, sphere } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-6-b',
  lessonId: 'm10c-3-6',
  title: 'Rational Exponents, Part 2: The Exponent Laws with Rational Exponents',
  thumbnailTitle: 'Rational Exponents and the Laws',
  thumbnail: 'ball',
  summary: 'Simplifying expressions with rational exponents using the exponent laws and fraction arithmetic, typing rational exponents in Gradileo, finding and fixing common errors, and finding the radius of a balloon from its volume.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.6 · Part 2', title: 'Rational Exponents and the Laws', subtitle: 'Same laws, careful fractions' }],
      lines: [
        { say: 'The exponent laws still work when the exponents are fractions. You just need to be careful with the fraction arithmetic.', show: 'title' },
        { say: 'In this video, you will simplify expressions with rational exponents, find and fix errors, and use a rational exponent to solve a real problem.' },
      ],
    },
    {
      chapter: 'Simplifying',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['x^{\\frac12} \\cdot x^{\\frac13} = x^{\\frac36 + \\frac26} = x^{\\frac56}', '\\left(x^{\\frac34}\\right)^{-2} = x^{\\frac34 \\times (-2)} = x^{-\\frac32} = \\dfrac{1}{x^{\\frac32}}', '(8x^6)^{\\frac23} = 8^{\\frac23} x^{6 \\times \\frac23} = 4x^4'],
        },
      ],
      lines: [
        { say: 'Simplify x to the one half, times x to the one third. Same base, so add the exponents. With a common denominator of six, that is three sixths plus two sixths: x to the five sixths.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, x to the three quarters, all to the negative two. A power of a power, so multiply. Three quarters times negative two is negative three halves, so the answer is one over x to the three halves.', show: 'm.1', focus: 'm.1' },
        { say: 'Eight x to the sixth, to the two thirds. Apply the exponent to both factors. Eight to the two thirds is the cube root of eight, two, squared: four. And six times two thirds is four. So the answer is four x to the fourth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Typing your answer',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Brackets around the exponent', md: 'In Gradileo, type `x^(5/6)` for $x^{\\frac56}$. Without brackets, `x^5/6` means $\\dfrac{x^5}{6}$.' },
      ],
      lines: [
        { say: 'When you type an answer like x to the five sixths in Gradileo, put the fractional exponent in brackets: x, caret, open bracket, five, slash, six, close bracket.', show: 'tip' },
        { say: 'Without the brackets, it means x to the fifth, divided by six.' },
      ],
    },
    {
      chapter: 'Spot the error',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['(2x^3)^2 = 2x^6 \\quad \\bad{\\text{✗}}', '(2x^3)^2 = 2^2 x^6 = 4x^6 \\quad \\good{\\text{✓}}', '16^{-\\frac12} = -4 \\quad \\bad{\\text{✗}}', '16^{-\\frac12} = \\dfrac{1}{\\sqrt{16}} = \\dfrac14 \\quad \\good{\\text{✓}}'] },
      ],
      lines: [
        { say: 'A student wrote that two x cubed, squared, is two x to the sixth. What went wrong?', show: 'm.0', focus: 'm.0' },
        { say: 'The exponent two applies to the coefficient too. Two squared is four, so the correct answer is four x to the sixth.', show: 'm.1', focus: 'm.1' },
        { say: 'Another student wrote that sixteen to the negative one half is negative four.', show: 'm.2', focus: 'm.2' },
        { say: 'But a negative exponent means a reciprocal: one over the square root of sixteen, which is one quarter.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A balloon',
      layout: 'split',
      leftWidth: 440,
      left: [figure('ball', [sphere({ r: 5, labels: { r: 'r' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A spherical balloon holds $4000\\text{ cm}^3$. Use $r = \\left(\\dfrac{3V}{4\\pi}\\right)^{\\frac13}$ to find its radius.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{3(4000)}{4\\pi} \\approx 954.93', 'r \\approx 954.93^{\\frac13} \\approx 9.8\\text{ cm}'] },
      ],
      lines: [
        { say: 'A spherical balloon holds 4,000 cubic centimetres of air. Its radius is three V over four pi, to the power of one third. Find the radius.', show: ['ball.shape', 'ball.r', 'q'] },
        { say: 'Substitute the volume: three times 4,000, over four pi, is about 954.93.', show: 'm.0', focus: 'm.0' },
        { say: 'The power of one third is a cube root, so take the cube root on your calculator: about 9.8 centimetres.', show: 'm.1', focus: ['m.1', 'ball.r'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\left(27x^9\\right)^{\\frac13}$.',
          choices: ['$3x^3$', '$9x^3$', '$3x^{\\frac{28}{3}}$', '$27x^3$'],
          answer: 0,
          working: '$27^{\\frac13} = \\sqrt[3]{27} = 3$ and $x^{9 \\times \\frac13} = x^3$, so the answer is $3x^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify 27 x to the ninth, to the one third. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The one third applies to both factors. The cube root of 27 is three, and nine times one third is three, so three x cubed. B divides 27 by three instead of taking its cube root, C adds one third instead of multiplying, and D forgets the coefficient.', show: 'q.answer' },
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
            'Every exponent law works with rational exponents: add, subtract or multiply the fractions.',
            'An exponent outside brackets applies to every factor inside, including the coefficient.',
            'A negative exponent means reciprocal, not negative.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Every exponent law works with rational exponents. You add, subtract or multiply the fractions.", show: 'sum.0' },
        { say: 'An exponent outside brackets applies to every factor inside, including the coefficient.', show: 'sum.1' },
        { say: 'And a negative exponent means a reciprocal, not a negative number. That completes unit three. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
