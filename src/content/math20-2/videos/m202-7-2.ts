import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-7-2',
  lessonId: 'm202-7-2',
  title: 'The Quadratic Formula, Part 1: Using the Formula',
  thumbnailTitle: 'The Quadratic Formula',
  thumbnail: 'm',
  summary: 'The quadratic formula x = (−b ± √(b² − 4ac))/(2a), the three steps for using it, solving 2x² − x − 3 = 0 to get 3/2 and −1, checking by factoring, and where the formula comes from.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.2 · Part 1', title: 'The Quadratic Formula', subtitle: 'One method that always works' }],
      lines: [
        { say: 'Try to factor two x squared, plus three x, minus four, and you will get stuck: no pair of integers works. But the equation still has roots.', show: 'title' },
        { say: 'The quadratic formula solves every quadratic equation, whether it factors or not. In this video, you will learn to use it.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'] },
        { kind: 'bullets', id: 'b', items: ['Write the equation in standard form; identify $a$, $b$ and $c$ with their signs.', 'Calculate $b^2 - 4ac$.', 'Substitute, and work out both roots: one with $+$, one with $-$.'] },
      ],
      lines: [
        { say: 'The roots of "a" x squared, plus b x, plus c, equals zero, are x equals negative b, plus or minus the square root of b squared minus four "a" c, all over two "a".', show: 'm.0', focus: 'm.0' },
        { say: 'Plus or minus means you use plus for one root, and minus for the other.' },
        { say: 'To use it, first write the equation in standard form, and identify "a", b and c, with their signs. Then calculate b squared minus four "a" c.', show: ['b.0', 'b.1'] },
        { say: 'Finally, substitute into the formula, and work out both roots.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Two rational roots',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 - x - 3 = 0:\\quad a = 2,\\ b = -1,\\ c = -3', 'b^2 - 4ac = (-1)^2 - 4(2)(-3) = 1 + 24 = 25', 'x = \\dfrac{1 \\pm \\sqrt{25}}{4} = \\dfrac{1 \\pm 5}{4}', 'x = \\dfrac{6}{4} = \\dfrac{3}{2} \\text{ or } x = \\dfrac{-4}{4} = -1'] }],
      lines: [
        { say: 'Solve two x squared, minus x, minus three, equals zero. Here "a" is two, b is negative one, and c is negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'b squared minus four "a" c is one, minus four times two times negative three, which is one plus twenty-four, or twenty-five.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative b is positive one, and two "a" is four. So x is one plus or minus root twenty-five, over four: one plus or minus five, over four.', show: 'm.2', focus: 'm.2' },
        { say: 'With plus, six over four is three halves. With minus, negative four over four is negative one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Check by factoring',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2x^2 - x - 3 = (2x - 3)(x + 1)'] },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Where does the formula come from?', md: 'It comes from rearranging $ax^2 + bx + c = 0$ step by step until $x$ is alone, a method called **completing the square**. You can test it on any equation you have already solved by factoring.' },
      ],
      lines: [
        { say: 'When b squared minus four "a" c is a perfect square, like twenty-five, the equation also factors. Here it is two x minus three, times x plus one, which gives the same roots.', show: 'm.0', focus: 'm.0' },
        { say: 'Where does the formula come from? It comes from rearranging the general equation step by step until x is alone, a method called completing the square. You do not need the derivation in this course, but testing the formula on an equation you can factor builds trust in it.', show: 'note' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use the quadratic formula to solve $x^2 + 5x + 6 = 0$.',
          choices: ['$x = -2$ or $x = -3$', '$x = 2$ or $x = 3$', '$x = -2$ or $x = 3$', '$x = -5$ or $x = 1$'],
          answer: 0,
          working: '$b^2 - 4ac = 25 - 24 = 1$, so $x = \\dfrac{-5 \\pm 1}{2}$: $-2$ or $-3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use the quadratic formula to solve x squared, plus five x, plus six, equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. b squared minus four "a" c is twenty-five minus twenty-four, which is one. So x is negative five, plus or minus one, over two: negative two, or negative three.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$', 'Standard form first; keep the signs of $a$, $b$ and $c$.', 'Use $+$ for one root and $-$ for the other.'] }],
      lines: [
        { say: 'Let’s sum up. The quadratic formula gives the roots of any quadratic equation.', show: 'sum.0' },
        { say: 'Write the equation in standard form first, and keep the signs of "a", b and c.', show: 'sum.1' },
        { say: 'And use plus for one root, and minus for the other. In part two, we find roots that are not whole numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
