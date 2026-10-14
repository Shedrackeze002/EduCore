import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-1-b',
  lessonId: 'm201-4-1',
  title: 'Factoring Polynomial Expressions, Part 2: Common Factors and Differences of Squares',
  thumbnailTitle: 'Common Factors and Squares',
  thumbnail: 'm',
  summary: 'Factoring completely: removing a negative common factor from −12x² + 2x + 4 and a fractional one from ⅔x² + ⅔x − 4, then the difference of squares A² − B² = (A − B)(A + B) for 49x² − 16y², 3x³ − 12xy² and 16x⁴ − 81, and why a sum of squares does not factor.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.1 · Part 2', title: 'Common Factors and Squares', subtitle: 'Factor completely' }],
      lines: [
        { say: 'Before you split any middle term, look for a common factor. It makes the numbers smaller, and it is the first step to factoring completely.', show: 'title' },
        { say: 'In this video, you will remove common factors, including negatives and fractions, and factor differences of squares.' },
      ],
    },
    {
      chapter: 'Common factors first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-12x^2 + 2x + 4', '-2(6x^2 - x - 2)', '-2(6x^2 - 4x + 3x - 2)', '-2(3x - 2)(2x + 1)'] }],
      lines: [
        { say: 'Factor completely means that no factor can be factored any further. Always remove the greatest common factor first, and if the leading coefficient is negative, factor out a negative.', show: 'm.0' },
        { say: 'Factor negative twelve x squared, plus two x, plus four, completely. Factor out negative two: negative two, times six x squared, minus x, minus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Inside the brackets, "a" c is negative twelve, and the sum is negative one: negative four and three. Split the middle term.', show: 'm.2', focus: 'm.2' },
        { say: 'Grouping gives negative two, times three x minus two, times two x plus one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A fraction in front',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac{2}{3}x^2 + \\tfrac{2}{3}x - 4', '\\tfrac{2}{3}(x^2 + x - 6)', '\\tfrac{2}{3}(x + 3)(x - 2)', '\\tfrac{2}{3} \\times (-6) = -4 \\;\\checkmark'] }],
      lines: [
        { say: 'The coefficients can be fractions. Factor out a fraction so the brackets have integer coefficients. For two thirds x squared, plus two thirds x, minus four, factor out two thirds.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide each coefficient by two thirds. Negative four divided by two thirds is negative six, so the bracket is x squared, plus x, minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'That factors as x plus three, times x minus two.', show: 'm.2', focus: 'm.2' },
        { say: 'Check the constant term: two thirds of negative six is negative four.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Difference of squares',
      layout: 'split',
      leftWidth: 700,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(A - B)(A + B) = A^2 - B^2', '49x^2 - 16y^2 = (7x - 4y)(7x + 4y)', '3x^3 - 12xy^2 = 3x(x - 2y)(x + 2y)', '16x^4 - 81 = (4x^2 - 9)(4x^2 + 9)', '= (2x - 3)(2x + 3)(4x^2 + 9)'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'A sum of squares does not factor', md: '$4x^2 + 9$ cannot be factored over the integers: no two integers have product $36$ and sum $0$.' }],
      lines: [
        { say: 'Multiply "A" minus B by "A" plus B, and the middle terms cancel, leaving "A" squared minus B squared. "A" and B can be any expressions.', show: 'm.0', focus: 'm.0' },
        { say: 'Forty-nine x squared, minus sixteen y squared, is seven x, squared, minus four y, squared. So it factors as seven x minus four y, times seven x plus four y.', show: 'm.1', focus: 'm.1' },
        { say: 'For three x cubed, minus twelve x y squared, remove the common factor three x first. That leaves x squared minus four y squared: three x, times x minus two y, times x plus two y.', show: 'm.2', focus: 'm.2' },
        { say: 'Sixteen x to the fourth, minus eighty-one, is four x squared, squared, minus nine squared. The first factor, four x squared minus nine, is a difference of squares again, so it factors further.', show: ['m.3', 'm.4'], focus: ['m.3', 'm.4'] },
        { say: 'But four x squared plus nine does not factor. No two integers have product thirty-six and sum zero. Only a difference of squares factors.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $2x^2 - 50$ completely.',
          choices: ['$2(x - 5)(x + 5)$', '$2(x - 5)^2$', '$(2x - 10)(x + 5)$', '$2(x^2 - 25)$'],
          answer: 0,
          working: 'Remove the common factor $2$: $2(x^2 - 25)$. Then $x^2 - 25 = (x - 5)(x + 5)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor two x squared, minus fifty, completely. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Remove the common factor two, to leave x squared minus twenty-five, a difference of squares. C and D are equal to it, but they are not factored completely.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Remove the greatest common factor first, including a negative or a fraction.', '$A^2 - B^2 = (A - B)(A + B)$.', 'A sum of squares does not factor. Factor completely.'] }],
      lines: [
        { say: 'Let’s sum up. Remove the greatest common factor first, including a negative or a fraction.', show: 'sum.0' },
        { say: 'A difference of squares, "A" squared minus B squared, factors as "A" minus B, times "A" plus B.', show: 'sum.1' },
        { say: 'A sum of squares does not factor, and always factor completely. In part three, we factor by substitution. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
