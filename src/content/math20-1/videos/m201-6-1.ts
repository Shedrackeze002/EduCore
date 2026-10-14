import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-1',
  lessonId: 'm201-6-1',
  title: 'Rational Expressions, Part 1: Non-Permissible Values',
  thumbnailTitle: 'Non-Permissible Values',
  thumbnail: 'm',
  summary: 'What a rational expression is, why a denominator of zero creates non-permissible values, finding them for (x + 4)/(x² − 7x + 10) and 3x/(2x² + x − 6), and why the numerator never creates a restriction. Parts 2 and 3 cover equivalent expressions and simplifying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.1 · Part 1', title: 'Non-Permissible Values', subtitle: 'You can never divide by zero' }],
      lines: [
        { say: 'The average cost of making n snowboards might be 500 plus twelve n, over n. That is a rational expression: a fraction made of polynomials.', show: 'title' },
        { say: 'Everything you know about fractions carries over, with one new rule: you can never divide by zero. In this video, you will find the values a rational expression must exclude.' },
      ],
    },
    {
      chapter: 'Rational expressions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational expression', md: 'A **rational expression** is a quotient $\\dfrac{P}{Q}$ of two polynomials, where $Q \\ne 0$. A **non-permissible value** is a value of the variable that makes a denominator $0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{5}{x},\\qquad \\dfrac{x + 4}{x^2 - 7x + 10},\\qquad \\dfrac{3a^2}{2b}', '\\dfrac{1}{\\sqrt{x}}:\\ \\text{not rational}'] },
      ],
      lines: [
        { say: 'A rational expression is a quotient of two polynomials, where the denominator is not zero. Five over x, and x plus four over x squared minus seven x plus ten, are rational expressions.', show: ['def', 'm.0'], focus: 'm.0' },
        { say: 'One over root x is not, because root x is not a polynomial.', show: 'm.1', focus: 'm.1' },
        { say: 'A rational expression is undefined whenever its denominator is zero. A value of the variable that makes a denominator zero is called a non-permissible value, and we state these values as restrictions.' },
      ],
    },
    {
      chapter: 'Finding restrictions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x + 4}{x^2 - 7x + 10}:\\quad x^2 - 7x + 10 = 0', '(x - 2)(x - 5) = 0', 'x \\ne 2,\\ 5'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at the numerator', md: '$x = -4$ makes the numerator $0$, so the expression equals $0$. That is allowed: only denominators create restrictions.' },
      ],
      lines: [
        { say: 'Find the non-permissible values of x plus four, over x squared, minus seven x, plus ten. Set the denominator equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor: x minus two, times x minus five, equals zero. So x cannot be two, and cannot be five.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Do not look at the numerator. x equals negative four makes the numerator zero, which just makes the whole expression equal zero. That is allowed: only denominators create restrictions.', show: 'oops' },
      ],
    },
    {
      chapter: 'A non-monic denominator',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{3x}{2x^2 + x - 6}', '2x^2 + x - 6 = (2x - 3)(x + 2)', '2x - 3 = 0:\\ x = \\tfrac{3}{2};\\qquad x + 2 = 0:\\ x = -2', 'x \\ne -2,\\ \\tfrac{3}{2}'] }],
      lines: [
        { say: 'When the leading coefficient is not one, factor carefully. Find the non-permissible values of three x, over two x squared, plus x, minus six.', show: 'm.0', focus: 'm.0' },
        { say: 'By decomposition, the denominator factors as two x minus three, times x plus two. Expand to check: two x squared, plus four x, minus three x, minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Two x minus three is zero when x is three halves, and x plus two is zero when x is negative two. So x cannot be negative two, or three halves.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What are the non-permissible values of $\\dfrac{x - 3}{x^2 - 9x + 14}$?',
          choices: ['$x \\ne 2,\\ 7$', '$x \\ne 3$', '$x \\ne 2,\\ 3,\\ 7$', '$x \\ne -2,\\ -7$'],
          answer: 0,
          working: '$x^2 - 9x + 14 = (x - 2)(x - 7)$, which is $0$ when $x = 2$ or $x = 7$.',
        },
      ],
      lines: [
        { say: 'Your turn. What are the non-permissible values of x minus three, over x squared, minus nine x, plus fourteen? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The denominator factors as x minus two, times x minus seven, which is zero when x is two or seven. B and C use the numerator, and D gets the signs wrong.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A rational expression is a quotient of polynomials.', 'Non-permissible values make a denominator $0$: factor it, and set each factor to $0$.', 'The numerator can be $0$; only denominators create restrictions.'] }],
      lines: [
        { say: 'Let’s sum up. A rational expression is a quotient of polynomials.', show: 'sum.0' },
        { say: 'Its non-permissible values make a denominator zero. Factor the denominator, and set each factor equal to zero.', show: 'sum.1' },
        { say: 'And the numerator can be zero: only denominators create restrictions. In part two, we see when two rational expressions are equivalent. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
