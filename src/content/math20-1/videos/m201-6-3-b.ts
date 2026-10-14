import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-6-3-b',
  lessonId: 'm201-6-3',
  title: 'Adding and Subtracting Rational Expressions, Part 2: Factoring Denominators',
  thumbnailTitle: 'Factor the Denominators',
  thumbnail: 'm',
  summary: 'Factoring denominators to find the lowest common denominator in x/(x² − 9) + 2/(x + 3), opposite denominators such as x − 4 and 4 − x, and simplifying 1/(x − 1) − 2/(x² − 1) to 1/(x + 1) while keeping the original restrictions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 6.3 · Part 2', title: 'Factor the Denominators', subtitle: 'Then find the LCD' }],
      lines: [
        { say: 'When denominators are trinomials or differences of squares, they often share a factor. Factoring them first keeps the common denominator as small as possible.', show: 'title' },
        { say: 'In this video, you will factor denominators to find the LCD, handle opposite denominators, and simplify the result.' },
      ],
    },
    {
      chapter: 'A shared factor',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{x}{x^2 - 9} + \\dfrac{2}{x + 3}:\\quad x^2 - 9 = (x - 3)(x + 3)', '\\text{LCD} = (x - 3)(x + 3),\\quad x \\ne \\pm 3', '\\dfrac{x + 2(x - 3)}{(x - 3)(x + 3)} = \\dfrac{3x - 6}{(x - 3)(x + 3)}', '= \\dfrac{3(x - 2)}{(x - 3)(x + 3)}'] }],
      lines: [
        { say: 'Factor every denominator first. The LCD then uses each different factor the greatest number of times it appears in any one denominator. Simplify x over x squared minus nine, plus two over x plus three.', show: 'm.0', focus: 'm.0' },
        { say: 'x squared minus nine is x minus three, times x plus three. That already contains x plus three, so the LCD is just x minus three, times x plus three, and x cannot be three or negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'The second fraction is missing x minus three, so its numerator becomes two times x minus three. Add the numerators: x, plus two x, minus six, is three x minus six.', show: 'm.2', focus: 'm.2' },
        { say: 'Factor the numerator: three times x minus two. It shares no factor with the denominator, so this is the simplest form.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Opposite denominators',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{3}{4 - x} = -\\dfrac{3}{x - 4}', '\\dfrac{5}{x - 4} + \\dfrac{3}{4 - x} = \\dfrac{5}{x - 4} - \\dfrac{3}{x - 4} = \\dfrac{2}{x - 4},\\quad x \\ne 4'] }],
      lines: [
        { say: 'x minus four and four minus x are opposites, so three over four minus x is the same as negative three over x minus four.', show: 'm.0', focus: 'm.0' },
        { say: 'That turns five over x minus four, plus three over four minus x, into five over x minus four, minus three over x minus four. The result is two over x minus four, with x not equal to four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Simplify at the end',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}:\\quad \\text{LCD} = (x - 1)(x + 1),\\quad x \\ne \\pm 1', '\\dfrac{(x + 1) - 2}{(x - 1)(x + 1)} = \\dfrac{x - 1}{(x - 1)(x + 1)}', '= \\dfrac{1}{x + 1},\\quad x \\ne \\pm 1'] }],
      lines: [
        { say: 'After combining, factor the numerator, and check for a factor it shares with the denominator. Simplify one over x minus one, minus two over x squared minus one. The LCD is x minus one, times x plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'The first fraction is missing x plus one, so the numerator is x plus one, minus two, which is x minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'That matches a factor of the denominator. Divide it out: one over x plus one. But keep both original restrictions: x is not one, and not negative one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{4}{x^2 - 4} + \\dfrac{1}{x + 2}$.',
          choices: ['$\\dfrac{1}{x - 2}$, $x \\ne \\pm 2$', '$\\dfrac{5}{x^2 + x - 2}$', '$\\dfrac{x + 6}{(x - 2)(x + 2)}$', '$\\dfrac{1}{x - 2}$, $x \\ne 2$'],
          answer: 0,
          working: 'The LCD is $(x - 2)(x + 2)$: $\\dfrac{4 + (x - 2)}{(x - 2)(x + 2)} = \\dfrac{x + 2}{(x - 2)(x + 2)} = \\dfrac{1}{x - 2}$, with $x \\ne \\pm 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify four over x squared minus four, plus one over x plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The LCD is x minus two, times x plus two. The second numerator becomes x minus two, so the numerator is four plus x minus two, which is x plus two. Divide it out, to leave one over x minus two, and keep both restrictions. D loses one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor every denominator; the LCD takes each factor to its highest power.', 'Opposite denominators: $\\dfrac{a}{4 - x} = -\\dfrac{a}{x - 4}$.', 'Simplify the result, and keep the original restrictions.'] }],
      lines: [
        { say: 'Let’s sum up. Factor every denominator, and build the LCD from each different factor, to its highest power.', show: 'sum.0' },
        { say: 'Turn an opposite denominator around by changing the sign of the fraction.', show: 'sum.1' },
        { say: 'And simplify the result, keeping the original restrictions. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
