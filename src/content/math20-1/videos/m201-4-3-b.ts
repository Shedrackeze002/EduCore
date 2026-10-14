import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-3-b',
  lessonId: 'm201-4-3',
  title: 'Completing the Square and the Quadratic Formula, Part 2: Deriving the Formula',
  thumbnailTitle: 'Deriving the Quadratic Formula',
  thumbnail: 'm',
  summary: 'Solving 2x² − 8x + 3 = 0 by completing the square after dividing by a, then completing the square on ax² + bx + c = 0 with letters to prove the quadratic formula, and checking it against x² + 6x + 4 = 0.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.3 · Part 2', title: 'The Quadratic Formula', subtitle: 'Completing the square, with letters' }],
      lines: [
        { say: 'Completing the square works for every quadratic equation. Do it once with letters instead of numbers, and you get a formula that solves them all.', show: 'title' },
        { say: 'In this video, you will complete the square when "a" is not one, and then derive the quadratic formula.' },
      ],
    },
    {
      chapter: 'When a ≠ 1',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 - 8x + 3 = 0', 'x^2 - 4x = -\\tfrac{3}{2}', 'x^2 - 4x + 4 = \\tfrac{5}{2}:\\quad (x - 2)^2 = \\tfrac{5}{2}', 'x - 2 = \\pm\\sqrt{\\tfrac{5}{2}} = \\pm\\dfrac{\\sqrt{10}}{2}', 'x = \\dfrac{4 \\pm \\sqrt{10}}{2}'] }],
      lines: [
        { say: 'Solve two x squared, minus eight x, plus three, equals zero. First divide every term by two, so the coefficient of x squared is one. Then move the constant: x squared, minus four x, equals negative three halves.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Half of negative four is negative two, and its square is four. Add four to both sides: x minus two, squared, equals five halves.', show: 'm.2', focus: 'm.2' },
        { say: 'Take square roots. The square root of five halves is root ten, over two, after multiplying the top and bottom by root two.', show: 'm.3', focus: 'm.3' },
        { say: 'So x is two, plus or minus root ten over two, which is four, plus or minus root ten, all over two.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'With letters',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['ax^2 + bx + c = 0', 'x^2 + \\dfrac{b}{a}x = -\\dfrac{c}{a}', '\\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{b^2}{4a^2} - \\dfrac{c}{a} = \\dfrac{b^2 - 4ac}{4a^2}', 'x + \\dfrac{b}{2a} = \\pm\\dfrac{\\sqrt{b^2 - 4ac}}{2a}', 'x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'] }],
      lines: [
        { say: 'Now do the same steps with letters. Start with "a" x squared, plus b x, plus c, equals zero, where "a" is not zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by "a", and move the constant: x squared, plus b over "a" x, equals negative c over "a".', show: 'm.1', focus: 'm.1' },
        { say: 'Half of b over "a" is b over two "a". Add its square, b squared over four "a" squared, to both sides. The left side is x plus b over two "a", all squared. Over a common denominator, the right side is b squared minus four "a" c, over four "a" squared.', show: 'm.2', focus: 'm.2' },
        { say: 'Take square roots of both sides. The square root of four "a" squared is two "a", up to its sign, and the plus or minus covers that.', show: 'm.3', focus: 'm.3' },
        { say: 'Subtract b over two "a": x equals negative b, plus or minus the square root of b squared minus four "a" c, all over two "a". This is the quadratic formula.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Check with numbers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Quadratic formula', md: 'The roots of $ax^2 + bx + c = 0$, $a \\ne 0$, are $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x^2 + 6x + 4 = 0:\\quad x = \\dfrac{-6 \\pm \\sqrt{36 - 16}}{2}', '= \\dfrac{-6 \\pm 2\\sqrt{5}}{2} = -3 \\pm \\sqrt{5} \\;\\checkmark'] },
      ],
      lines: [
        { say: 'So the roots of "a" x squared, plus b x, plus c, equals zero, for any "a" that is not zero, are given by the quadratic formula.', show: 'def' },
        { say: 'Check it on x squared, plus six x, plus four, equals zero, from part one. Here "a" is one, b is six, and c is four, so under the root is thirty-six minus sixteen, which is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'Root twenty is two root five. Divide every term by two: x is negative three, plus or minus root five. These are the same roots that completing the square gave.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For $2x^2 - 3x - 5 = 0$, what is $b^2 - 4ac$?',
          choices: ['$49$', '$-31$', '$-49$', '$31$'],
          answer: 0,
          working: '$a = 2$, $b = -3$ and $c = -5$: $(-3)^2 - 4(2)(-5) = 9 + 40 = 49$.',
        },
      ],
      lines: [
        { say: 'Your turn. For two x squared, minus three x, minus five, equals zero, what is b squared, minus four "a" c? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b is negative three, so b squared is nine. And negative four, times two, times negative five, is plus forty. So the total is forty-nine. B forgets that c is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['When $a \\ne 1$, divide every term by $a$ first.', 'Completing the square on $ax^2 + bx + c = 0$ proves the formula.', '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$'] }],
      lines: [
        { say: 'Let’s sum up. To complete the square when "a" is not one, divide every term by "a" first.', show: 'sum.0' },
        { say: 'Completing the square on "a" x squared, plus b x, plus c, equals zero, proves the quadratic formula.', show: 'sum.1' },
        { say: 'x equals negative b, plus or minus the square root of b squared minus four "a" c, all over two "a". In part three, we use the formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
