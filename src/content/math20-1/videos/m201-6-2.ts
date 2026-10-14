import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-2',
  lessonId: 'm201-6-2',
  title: 'Multiplying and Dividing Rational Expressions, Part 1: Multiplying',
  thumbnailTitle: 'Multiplying Rational Expressions',
  thumbnail: 'm',
  summary: 'Multiplying rational expressions the way you multiply fractions: factor, state the restrictions from every denominator, divide out common factors, then multiply, with monomial and polynomial examples. Part 2 divides.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.2 · Part 1', title: 'Multiplying Rational Expressions', subtitle: 'Factor first, multiply last' }],
      lines: [
        { say: 'To multiply two thirds by nine tenths quickly, you cancel before you multiply, and get three fifths. Rational expressions follow exactly the same rules: the numbers are now polynomial factors.', show: 'title' },
        { say: 'In this video, you will multiply rational expressions, and state their restrictions.' },
      ],
    },
    {
      chapter: 'Multiplying',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'bullets', id: 'b', items: ['Factor every numerator and denominator.', 'State the restrictions from **every** denominator.', 'Divide out common factors, then multiply.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{AC}{BD},\\quad B, D \\ne 0', '\\dfrac{2}{3} \\times \\dfrac{9}{10} = \\dfrac{2 \\cdot 3 \\cdot 3}{3 \\cdot 2 \\cdot 5} = \\dfrac{3}{5}'] }],
      lines: [
        { say: 'To multiply rational expressions, multiply the numerators, and multiply the denominators. Neither denominator can be zero.', show: 'm.0', focus: 'm.0' },
        { say: 'With fractions, cancelling first keeps the numbers small. Two thirds times nine tenths is two times three times three, over three times two times five, which is three fifths.', show: 'm.1', focus: 'm.1' },
        { say: 'So: factor every numerator and denominator, state the restrictions from every denominator, then divide out common factors, and multiply what is left.', show: ['b.0', 'b.1', 'b.2'] },
      ],
    },
    {
      chapter: 'Monomials',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{6x^2}{5y} \\times \\dfrac{10y^2}{9x},\\quad x \\ne 0,\\ y \\ne 0', '= \\dfrac{60x^2y^2}{45xy}', '= \\dfrac{4xy}{3}'] }],
      lines: [
        { say: 'Simplify six x squared over five y, times ten y squared over nine x. The denominators give the restrictions: x and y cannot be zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply: sixty x squared y squared, over forty-five x y.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide the numerator and the denominator by their greatest common factor, fifteen x y. The result is four x y over three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Polynomials',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2 - 9}{x^2 + 5x + 6} \\times \\dfrac{x + 2}{4x} = \\dfrac{(x - 3)(x + 3)}{(x + 2)(x + 3)} \\times \\dfrac{x + 2}{4x}', 'x \\ne -3,\\ -2,\\ 0', '= \\dfrac{x - 3}{4x}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Factor first, multiply last', md: 'Never expand before cancelling. Factored, the common factors show; multiplied out into cubics, they hide.' },
      ],
      lines: [
        { say: 'Simplify x squared minus nine, over x squared, plus five x, plus six, times x plus two over four x. Factor everything first.', show: 'm.0', focus: 'm.0' },
        { say: 'The denominators give the restrictions: x cannot be negative three, negative two, or zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide out x plus three, and x plus two. What is left is x minus three, over four x.', show: 'm.2', focus: 'm.2' },
        { say: 'Never expand the products before cancelling. Factored, the common factors are easy to see. Multiplied out into a cubic over a cubic, they are hidden.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{x + 1}{x - 2} \\times \\dfrac{x^2 - 4}{3x + 3}$.',
          choices: ['$\\dfrac{x + 2}{3}$, $x \\ne -1,\\ 2$', '$\\dfrac{x + 2}{3}$, $x \\ne 2$', '$\\dfrac{x - 2}{3}$, $x \\ne -1,\\ 2$', '$\\dfrac{x + 2}{3x}$, $x \\ne -1,\\ 2$'],
          answer: 0,
          working: '$\\dfrac{x + 1}{x - 2} \\times \\dfrac{(x - 2)(x + 2)}{3(x + 1)} = \\dfrac{x + 2}{3}$. The denominators give $x \\ne 2$ and $x \\ne -1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify x plus one over x minus two, times x squared minus four, over three x plus three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Factor: x squared minus four is x minus two times x plus two, and three x plus three is three times x plus one. Divide out x minus two and x plus one, to get x plus two over three, with x not equal to two or negative one. B loses a restriction.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor every numerator and denominator first.', 'State the restrictions from every denominator.', 'Divide out common factors, then multiply what is left.'] }],
      lines: [
        { say: 'Let’s sum up. To multiply rational expressions, factor every numerator and denominator first.', show: 'sum.0' },
        { say: 'State the restrictions from every denominator.', show: 'sum.1' },
        { say: 'Then divide out common factors, and multiply what is left. In part two, we divide rational expressions. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
