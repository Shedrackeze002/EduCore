import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-1-c',
  lessonId: 'm201-6-1',
  title: 'Rational Expressions, Part 3: Simplifying',
  thumbnailTitle: 'Simplifying Rational Expressions',
  thumbnail: 'm',
  summary: 'Simplifying rational expressions by factoring, stating restrictions and dividing out common factors: 12x³/18x⁵, (x² − 4x − 12)/(x² − 36), and (10 − 2x)/(x² − 25) with opposite factors, plus why terms such as x² can never be cancelled.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.1 · Part 3', title: 'Simplifying Rational Expressions', subtitle: 'Factor, restrict, divide out' }],
      lines: [
        { say: 'Simplifying a rational expression is like reducing a fraction: find the common factors, and divide them out.', show: 'title' },
        { say: 'In this video, you will simplify rational expressions with monomials, trinomials, and opposite factors.' },
      ],
    },
    {
      chapter: 'Three steps',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'bullets', id: 'b', items: ['Factor the numerator and denominator completely.', 'State the restrictions from the **original** denominator.', 'Divide out common factors.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{12x^3}{18x^5},\\quad x \\ne 0', '\\dfrac{12}{18} = \\dfrac{2}{3},\\quad \\dfrac{x^3}{x^5} = \\dfrac{1}{x^2}', '\\dfrac{2}{3x^2},\\quad x \\ne 0'] }],
      lines: [
        { say: 'To simplify, factor the numerator and the denominator completely, state the restrictions from the original denominator, then divide out common factors.', show: ['b.0', 'b.1', 'b.2'] },
        { say: 'Simplify twelve x cubed, over eighteen x to the fifth. The restriction is x not equal to zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the coefficients by their greatest common factor, six: twelve over eighteen is two thirds. And x cubed over x to the fifth is one over x squared.', show: 'm.1', focus: 'm.1' },
        { say: 'So the result is two, over three x squared, with x not equal to zero.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A trinomial over a difference of squares',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2 - 4x - 12}{x^2 - 36} = \\dfrac{(x - 6)(x + 2)}{(x - 6)(x + 6)}', 'x \\ne 6,\\ -6', '\\dfrac{x + 2}{x + 6},\\quad x \\ne \\pm 6'] }],
      lines: [
        { say: 'Simplify x squared, minus four x, minus twelve, over x squared minus thirty-six. The numerator factors as x minus six, times x plus two, and the denominator, a difference of squares, as x minus six, times x plus six.', show: 'm.0', focus: 'm.0' },
        { say: 'Before you divide anything out, state the restrictions: x cannot be six, or negative six.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide out x minus six, to get x plus two, over x plus six. The restriction x not equal to six stays, even though that factor is gone.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Opposite factors',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{10 - 2x}{x^2 - 25} = \\dfrac{-2(x - 5)}{(x - 5)(x + 5)}', '= -\\dfrac{2}{x + 5},\\quad x \\ne \\pm 5', '\\dfrac{5 - x}{x - 5} = -1'] }],
      lines: [
        { say: 'Simplify ten minus two x, over x squared minus twenty-five. In the numerator, x has a negative coefficient, so factor out negative two: negative two, times x minus five.', show: 'm.0', focus: 'm.0' },
        { say: 'Now x minus five is a common factor. Divide it out: negative two over x plus five, with x not equal to five, or negative five.', show: 'm.1', focus: 'm.1' },
        { say: 'In general, opposite factors, such as five minus x and x minus five, divide to negative one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cancelling terms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x^2 + 5}{x^2 + 3} \\ne \\dfrac{5}{3}', 'x = 1:\\quad \\dfrac{6}{4} = 1.5,\\quad \\dfrac{5}{3} \\approx 1.67'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Cancelling terms instead of factors', md: 'You may only divide out something that **multiplies** the whole numerator and the whole denominator.' },
      ],
      lines: [
        { say: 'Only factors cancel, never terms. x squared plus five, over x squared plus three, is not five thirds. Test x equals one: six fourths is 1.5, but five thirds is about 1.67.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'You may only divide out something that multiplies the whole numerator, and the whole denominator.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{x^2 - 9}{x^2 + 5x + 6}$.',
          choices: ['$\\dfrac{x - 3}{x + 2}$, $x \\ne -2,\\ -3$', '$\\dfrac{x - 3}{x + 2}$, $x \\ne -2$', '$\\dfrac{-9}{5x + 6}$', '$\\dfrac{x + 3}{x + 2}$, $x \\ne -2,\\ -3$'],
          answer: 0,
          working: '$\\dfrac{(x - 3)(x + 3)}{(x + 2)(x + 3)} = \\dfrac{x - 3}{x + 2}$, with $x \\ne -2,\\ -3$ from the original denominator.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify x squared minus nine, over x squared, plus five x, plus six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The numerator is x minus three, times x plus three, and the denominator is x plus two, times x plus three. Divide out x plus three, and keep both restrictions. B loses one restriction, and C cancels terms.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor completely, state the restrictions, then divide out common factors.', 'Opposite factors divide to $-1$.', 'Cancel factors, never terms.'] }],
      lines: [
        { say: 'Let’s sum up. To simplify, factor completely, state the restrictions, then divide out common factors.', show: 'sum.0' },
        { say: 'Opposite factors divide to negative one.', show: 'sum.1' },
        { say: 'And cancel factors, never terms. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
