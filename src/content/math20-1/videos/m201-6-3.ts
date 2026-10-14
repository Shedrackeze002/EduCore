import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-3',
  lessonId: 'm201-6-3',
  title: 'Adding and Subtracting Rational Expressions, Part 1: Common Denominators',
  thumbnailTitle: 'Common Denominators',
  thumbnail: 'm',
  summary: 'The lowest common denominator of monomial denominators, adding 3/(4x) and 5/(6x²), subtracting numerators with two terms, and subtracting over two binomial denominators while bracketing the numerator you subtract. Part 2 factors the denominators first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.3 · Part 1', title: 'Common Denominators', subtitle: 'Add and subtract like fractions' }],
      lines: [
        { say: 'You cannot add one quarter and one sixth until both fractions have the same denominator: three twelfths plus two twelfths is five twelfths. Rational expressions work the same way.', show: 'title' },
        { say: 'In this video, you will find the lowest common denominator, and add and subtract rational expressions with monomial and binomial denominators.' },
      ],
    },
    {
      chapter: 'Monomial denominators',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Lowest common denominator', md: 'The **LCD** is the simplest expression that every denominator divides into: the least common multiple of the coefficients, and each variable factor to its **highest** power.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{3}{4x} + \\dfrac{5}{6x^2}:\\quad \\text{LCD} = 12x^2', '\\dfrac{3}{4x} \\cdot \\dfrac{3x}{3x} + \\dfrac{5}{6x^2} \\cdot \\dfrac{2}{2} = \\dfrac{9x}{12x^2} + \\dfrac{10}{12x^2}', '= \\dfrac{9x + 10}{12x^2},\\quad x \\ne 0'] },
      ],
      lines: [
        { say: 'The lowest common denominator, or LCD, is the simplest expression that every denominator divides into. Build it from the least common multiple of the coefficients, and each variable to its highest power.', show: 'def' },
        { say: 'Simplify three over four x, plus five over six x squared. The least common multiple of four and six is twelve, and the highest power of x is x squared, so the LCD is twelve x squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each numerator and denominator by what its denominator is missing: three x for the first, and two for the second. That gives nine x, and ten, over twelve x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add the numerators: nine x plus ten, over twelve x squared, with x not equal to zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Numerators with two terms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x + 1}{4} - \\dfrac{x - 3}{6} = \\dfrac{3(x + 1) - 2(x - 3)}{12}', '3x + 3 - 2x + 6 = x + 9', '= \\dfrac{x + 9}{12}'] }],
      lines: [
        { say: 'Simplify x plus one over four, minus x minus three over six. The LCD is twelve, so the numerator is three times x plus one, minus two times x minus three.', show: 'm.0', focus: 'm.0' },
        { say: 'Expand carefully. Negative two times negative three is plus six, so the numerator is three x plus three, minus two x, plus six, which is x plus nine.', show: 'm.1', focus: 'm.1' },
        { say: 'The result is x plus nine, over twelve.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Binomial denominators',
      layout: 'split',
      leftWidth: 680,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{2}{x + 3} - \\dfrac{1}{x - 2}', '= \\dfrac{2(x - 2) - (x + 3)}{(x + 3)(x - 2)}', '2x - 4 - x - 3 = x - 7', '= \\dfrac{x - 7}{(x + 3)(x - 2)},\\quad x \\ne -3,\\ 2'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the first term', md: '$2(x - 2) - (x + 3)$ is $2x - 4 - x - 3$, not $2x - 4 - x + 3$. Bracket the numerator you subtract.' }],
      lines: [
        { say: 'When the denominators are different binomials with no common factor, the LCD is their product. For two over x plus three, minus one over x minus two, the LCD is x plus three, times x minus two, so x cannot be negative three, or two.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply each numerator by the factor its denominator is missing: two times x minus two, minus one times x plus three.', show: 'm.1', focus: 'm.1' },
        { say: 'Put the subtracted numerator in brackets, so the minus sign reaches every term: two x minus four, minus x, minus three, which is x minus seven.', show: ['m.2', 'oops'], focus: 'm.2' },
        { say: 'So the result is x minus seven, over x plus three, times x minus two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{2}{x} + \\dfrac{3}{x^2}$.',
          choices: ['$\\dfrac{2x + 3}{x^2}$', '$\\dfrac{5}{x^2}$', '$\\dfrac{5}{x + x^2}$', '$\\dfrac{6}{x^3}$'],
          answer: 0,
          working: 'The LCD is $x^2$: $\\dfrac{2x}{x^2} + \\dfrac{3}{x^2} = \\dfrac{2x + 3}{x^2}$, with $x \\ne 0$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify two over x, plus three over x squared. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The LCD is x squared, so multiply the first fraction by x over x, to get two x over x squared. Then add the numerators: two x plus three, over x squared. B forgets to multiply the numerator, and D multiplies the fractions instead of adding them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['LCD: the least common multiple of the coefficients, each variable to its highest power.', 'Multiply each numerator by what its denominator is missing.', 'Bracket any numerator you subtract.'] }],
      lines: [
        { say: 'Let’s sum up. The LCD is the least common multiple of the coefficients, with each variable to its highest power.', show: 'sum.0' },
        { say: 'Multiply each numerator by whatever its denominator is missing, then combine the numerators.', show: 'sum.1' },
        { say: 'And bracket any numerator you subtract. In part two, we factor the denominators first. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
