import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-3',
  lessonId: 'm201-4-3',
  title: 'Completing the Square and the Quadratic Formula, Part 1: Square Roots',
  thumbnailTitle: 'Solving by Square Roots',
  thumbnail: 'm',
  summary: 'Solving (x − p)² = q by taking square roots, with exact roots, two whole-number roots and no real roots, why ± matters, and solving x² + 6x + 4 = 0 by completing the square. Parts 2 and 3 derive and use the quadratic formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.3 · Part 1', title: 'Solving by Square Roots', subtitle: '(x − p)² = q' }],
      lines: [
        { say: 'Many quadratic equations, such as x squared, plus six x, plus four, equals zero, cannot be factored over the integers. Two methods work for every quadratic equation: completing the square, and the quadratic formula that comes from it.', show: 'title' },
        { say: 'In this video, you will solve equations by taking square roots, and then by completing the square.' },
      ],
    },
    {
      chapter: 'Taking square roots',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x - p)^2 = q \\;\\Rightarrow\\; x - p = \\pm\\sqrt{q} \\;\\Rightarrow\\; x = p \\pm \\sqrt{q}', 'q < 0:\\quad \\text{no real roots}'] },
      ],
      lines: [
        { say: 'If one side of an equation is a perfect square, take the square root of both sides. A positive number has two square roots, one positive and one negative, so write plus or minus.', show: 'm.0', focus: 'm.0' },
        { say: 'So x minus p, squared, equals q, gives x equals p, plus or minus root q.' },
        { say: 'If q is negative, there are no real roots, because no real number squared is negative.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Three cases',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x + 3)^2 = 7:\\quad x = -3 \\pm \\sqrt{7}', '(x - 1)^2 = 16:\\quad x - 1 = \\pm 4,\\ \\ x = 5 \\text{ or } {-3}', '(x - 5)^2 = -4:\\quad \\text{no real roots}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the negative root', md: '$\\sqrt{16} = 4$, but $(-4)^2 = 16$ as well. Write $\\pm$ as soon as you take the square root of both sides.' },
      ],
      lines: [
        { say: 'Solve x plus three, squared, equals seven. x plus three is plus or minus root seven, so x is negative three, plus or minus root seven. These are exact roots.', show: 'm.0', focus: 'm.0' },
        { say: 'Solve x minus one, squared, equals sixteen. x minus one is plus or minus four, so x is five, or negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not forget the negative root. The square root of sixteen is four, but negative four, squared, is sixteen too, so this equation has two solutions.', show: 'oops' },
        { say: 'And x minus five, squared, equals negative four, has no real roots, because a square cannot be negative.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Completing the square',
      layout: 'split',
      leftWidth: 480,
      left: [{ kind: 'bullets', id: 'b', items: ['Divide every term by $a$, if $a \\ne 1$.', 'Move the constant term to the right side.', 'Add $\\left(\\tfrac{b}{2a}\\right)^2$ to **both** sides.', 'Write the left side as a square, and take square roots.'] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x^2 + 6x + 4 = 0', 'x^2 + 6x = -4', 'x^2 + 6x + 9 = -4 + 9', '(x + 3)^2 = 5', 'x = -3 \\pm \\sqrt{5}'] }],
      lines: [
        { say: 'When one side is not a perfect square, make it one. Solve x squared, plus six x, plus four, equals zero. Here "a" is one, so move the constant to the right side: x squared, plus six x, equals negative four.', show: ['b.0', 'b.1', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'Half of six is three, and three squared is nine. Add nine to both sides, so the equation stays balanced.', show: ['b.2', 'm.2'], focus: 'm.2' },
        { say: 'The left side is now x plus three, squared, and the right side is five.', show: ['b.3', 'm.3'], focus: 'm.3' },
        { say: 'Take square roots: x plus three is plus or minus root five. So x is negative three, plus or minus root five, which is about negative 0.76, or negative 5.24.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $x^2 - 4x - 1 = 0$ by completing the square.',
          choices: ['$x = 2 \\pm \\sqrt{5}$', '$x = -2 \\pm \\sqrt{5}$', '$x = 2 \\pm \\sqrt{3}$', '$x = 2 + \\sqrt{5}$'],
          answer: 0,
          working: '$x^2 - 4x = 1$. Add $(-2)^2 = 4$ to both sides: $(x - 2)^2 = 5$, so $x = 2 \\pm \\sqrt{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve x squared, minus four x, minus one, equals zero, by completing the square. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Move the constant: x squared, minus four x, equals one. Add four to both sides: x minus two, squared, equals five. So x is two, plus or minus root five. C moves the one with the wrong sign, and D forgets the negative root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$(x - p)^2 = q$ gives $x = p \\pm \\sqrt{q}$; no real roots if $q < 0$.', 'Write $\\pm$ as soon as you take square roots.', 'Complete the square: move the constant, then add $\\left(\\tfrac{b}{2}\\right)^2$ to both sides.'] }],
      lines: [
        { say: 'Let’s sum up. x minus p, squared, equals q, gives x equals p, plus or minus root q, and there are no real roots if q is negative.', show: 'sum.0' },
        { say: 'Write plus or minus as soon as you take square roots.', show: 'sum.1' },
        { say: 'And to complete the square, move the constant, then add the square of half the coefficient of x to both sides. In part two, we derive the quadratic formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
