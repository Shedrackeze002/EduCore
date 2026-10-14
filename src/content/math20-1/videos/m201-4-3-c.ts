import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-3-c',
  lessonId: 'm201-4-3',
  title: 'Completing the Square and the Quadratic Formula, Part 3: Using the Formula',
  thumbnailTitle: 'Using the Quadratic Formula',
  thumbnail: 'm',
  summary: 'Using the quadratic formula for the exact roots of 3x² − 4x − 2 = 0 and the decimal roots of 2x² + 5x − 1 = 0, and the two most common slips: the sign of −b, and dividing the whole numerator by 2a.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.3 · Part 3', title: 'Using the Quadratic Formula', subtitle: 'Exact and decimal roots' }],
      lines: [
        { say: 'The quadratic formula solves every quadratic equation, but only if you substitute carefully. Most errors come from signs.', show: 'title' },
        { say: 'In this video, you will use the formula to find exact roots and decimal roots, and avoid the two most common slips.' },
      ],
    },
    {
      chapter: 'Exact roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3x^2 - 4x - 2 = 0:\\quad a = 3,\\ b = -4,\\ c = -2', 'x = \\dfrac{-(-4) \\pm \\sqrt{(-4)^2 - 4(3)(-2)}}{2(3)} = \\dfrac{4 \\pm \\sqrt{40}}{6}', '\\sqrt{40} = 2\\sqrt{10}:\\quad x = \\dfrac{4 \\pm 2\\sqrt{10}}{6}', 'x = \\dfrac{2 \\pm \\sqrt{10}}{3}'] }],
      lines: [
        { say: 'Write the equation in standard form, and identify "a", b and c, with their signs. For three x squared, minus four x, minus two, equals zero, "a" is three, b is negative four, and c is negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute. Negative b is positive four. Under the root, negative four, squared, is sixteen, and negative four, times three, times negative two, is plus twenty-four, for a total of forty. The denominator is six.', show: 'm.1', focus: 'm.1' },
        { say: 'Simplify the radical: root forty is root four times root ten, which is two root ten.', show: 'm.2', focus: 'm.2' },
        { say: 'Every term, in the numerator and the denominator, has a factor of two. Divide it out: x equals two, plus or minus root ten, all over three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Decimal roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 + 5x - 1 = 0', 'b^2 - 4ac = 25 - 4(2)(-1) = 33', 'x = \\dfrac{-5 \\pm \\sqrt{33}}{4}', 'x \\approx 0.19 \\text{ or } x \\approx -2.69'] }],
      lines: [
        { say: 'Solve two x squared, plus five x, minus one, equals zero, to the nearest hundredth.', show: 'm.0', focus: 'm.0' },
        { say: 'Start with the part under the root: twenty-five, minus four, times two, times negative one, is thirty-three.', show: 'm.1', focus: 'm.1' },
        { say: 'So x equals negative five, plus or minus root thirty-three, all over four.', show: 'm.2', focus: 'm.2' },
        { say: 'Use a calculator, and round only at the end: x is about 0.19, or about negative 2.69.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two common slips',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two common slips', md: 'When $b$ is negative, $-b$ is positive: for $b = -4$, $-b = 4$ and $b^2 = 16$. And $2a$ divides the **whole** numerator, not just the radical.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{4 \\pm 2\\sqrt{10}}{6} \\ne 4 \\pm \\dfrac{2\\sqrt{10}}{6}'] },
      ],
      lines: [
        { say: 'Two slips cause most errors. First, when b is negative, negative b is positive. For b equals negative four, negative b is four, and b squared is sixteen, not negative sixteen.', show: 'oops' },
        { say: 'Second, the two "a" in the denominator divides the whole numerator, not just the radical. Four, plus or minus two root ten, all over six, is not four, plus or minus two root ten over six.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - 2x - 4 = 0$. Give exact roots.',
          choices: ['$x = 1 \\pm \\sqrt{5}$', '$x = -1 \\pm \\sqrt{5}$', '$x = 2 \\pm \\sqrt{5}$', '$x = 1 \\pm 2\\sqrt{5}$'],
          answer: 0,
          working: '$x = \\dfrac{2 \\pm \\sqrt{4 + 16}}{2} = \\dfrac{2 \\pm 2\\sqrt{5}}{2} = 1 \\pm \\sqrt{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared, minus two x, minus four, equals zero. Give exact roots. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Negative b is two, and under the root, four plus sixteen is twenty, which is two root five. Divide every term by two: one, plus or minus root five. B gets the sign of negative b wrong, and C divides only the radical by two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Identify $a$, $b$ and $c$ with their signs.', 'Simplify the radical, and divide every term by a common factor.', 'For decimal roots, round only at the end.'] }],
      lines: [
        { say: 'Let’s sum up. Write the equation in standard form, and identify "a", b and c with their signs.', show: 'sum.0' },
        { say: 'For exact roots, simplify the radical, and divide every term by a common factor.', show: 'sum.1' },
        { say: 'And for decimal roots, round only at the end. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
