import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-7-2-b',
  lessonId: 'm202-7-2',
  title: 'The Quadratic Formula, Part 2: Decimal and Exact Roots',
  thumbnailTitle: 'Decimal and Exact Roots',
  thumbnail: 'm',
  summary: 'Solving 2x² + 3x − 4 = 0 to the nearest hundredth (0.85 and −2.35), exact roots 2 ± √5 for x² − 4x − 1 = 0, and three common slips: the sign of −b, squaring a negative on a calculator, and the fraction bar.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.2 · Part 2', title: 'Decimal and Exact Roots', subtitle: 'When the roots are not whole numbers' }],
      lines: [
        { say: 'Most quadratic equations have roots that are not whole numbers. The quadratic formula can give them as rounded decimals, or exactly, with a square root.', show: 'title' },
        { say: 'In this video, you will find both kinds of roots, and avoid three common slips.' },
      ],
    },
    {
      chapter: 'Rounding to the nearest hundredth',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 + 3x - 4 = 0:\\quad a = 2,\\ b = 3,\\ c = -4', 'b^2 - 4ac = 9 + 32 = 41', 'x = \\dfrac{-3 \\pm \\sqrt{41}}{4}', 'x \\approx 0.85 \\text{ or } x \\approx -2.35'] }],
      lines: [
        { say: 'Solve two x squared, plus three x, minus four, equals zero, and round the roots to the nearest hundredth. Here "a" is two, b is three, and c is negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'b squared minus four "a" c is nine, minus four times two times negative four: nine plus thirty-two, which is forty-one.', show: 'm.1', focus: 'm.1' },
        { say: 'Forty-one is not a perfect square, which is why the equation would not factor. So x is negative three, plus or minus root forty-one, over four.', show: 'm.2', focus: 'm.2' },
        { say: 'With plus, that is about 0.85. With minus, about negative 2.35. Round only at the very end.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Exact roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 - 4x - 1 = 0:\\quad b^2 - 4ac = 16 + 4 = 20', 'x = \\dfrac{4 \\pm \\sqrt{20}}{2} = \\dfrac{4 \\pm 2\\sqrt{5}}{2}', 'x = 2 \\pm \\sqrt{5}', '\\approx 4.24 \\text{ or } {-0.24}'] }],
      lines: [
        { say: 'Sometimes you are asked for exact roots. Then leave the square root in the answer, and simplify it. Solve x squared, minus four x, minus one, equals zero. b squared minus four "a" c is sixteen plus four, which is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'So x is four plus or minus root twenty, over two. Root twenty simplifies to two root five.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide each term of the numerator by two: x is two plus or minus root five.', show: 'm.2', focus: 'm.2' },
        { say: 'Those are the exact roots, about 4.24 and negative 0.24.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Three common slips',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**The sign of $-b$**: if $b = -4$, then $-b = 4$.', '**Squaring a negative**: enter $(-4)^2 = 16$, not $-4^2$, which a calculator reads as $-16$.', '**The fraction bar**: divide the whole numerator by $2a$, not just the square root.'] }],
      lines: [
        { say: 'Three slips cause most wrong answers. First, the sign of negative b: if b is negative four, then negative b is positive four.', show: 'b.0' },
        { say: 'Second, squaring a negative on a calculator. Enter negative four in brackets, then square it, to get sixteen. Without brackets, a calculator squares the four first, and gives negative sixteen.', show: 'b.1' },
        { say: 'Third, the fraction bar. Divide the whole numerator, negative b plus or minus the square root, by two "a", not just the square root.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3x^2 - 2x - 2 = 0$. Round to the nearest hundredth.',
          choices: ['$1.22$ or $-0.55$', '$0.55$ or $-1.22$', '$2.88$ or $1.12$', '$3.65$ or $-1.65$'],
          answer: 0,
          working: '$b^2 - 4ac = 4 + 24 = 28$, so $x = \\dfrac{2 \\pm \\sqrt{28}}{6} \\approx 1.22$ or $-0.55$. B uses $b$ instead of $-b$; C divides only the root by $6$; D divides by $2$, not $2a$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three x squared, minus two x, minus two, equals zero, and round to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b squared minus four "a" c is four plus twenty-four, which is twenty-eight. So x is two plus or minus root twenty-eight, over six: about 1.22, or negative 0.55. The other choices each make one of the three slips.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Decimal roots: round only at the end.', 'Exact roots: simplify the square root, then divide each term.', 'Watch $-b$, brackets when squaring, and the whole fraction bar.'] }],
      lines: [
        { say: 'Let’s sum up. For decimal roots, round only at the end.', show: 'sum.0' },
        { say: 'For exact roots, simplify the square root, then divide each term of the numerator.', show: 'sum.1' },
        { say: 'And watch the sign of negative b, use brackets when squaring a negative, and divide the whole numerator. In part three, we find how many roots an equation has. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
