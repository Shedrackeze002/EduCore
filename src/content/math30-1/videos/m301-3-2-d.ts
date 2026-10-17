import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-3-2-d',
  lessonId: 'm301-3-2',
  title: 'The Remainder Theorem, Part 4: Unknown Coefficients',
  thumbnailTitle: 'Unknown Coefficients',
  summary: 'Using a given remainder to find an unknown coefficient with P(a) = R, two remainders to find two unknowns from a system, and the division statement P(x) = (x − a)Q(x) + R to rebuild a polynomial from its divisor, quotient and remainder.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.2 · Part 4', title: 'Unknown Coefficients', subtitle: 'Working backward from a remainder' }],
      lines: [
        { say: 'The remainder theorem also works backward. If you know the remainder, it turns into an equation, and that equation can find a coefficient you do not know.', show: 'title' },
        { say: 'In this video, you will find one unknown from one remainder, two unknowns from two remainders, and rebuild a polynomial from its division.' },
      ],
    },
    {
      chapter: 'One unknown',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'When $P(x) = x^3 + kx^2 - 4x + 1$ is divided by $x - 2$, the remainder is $5$. Find $k$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(2) = 5', '(2)^3 + k(2)^2 - 4(2) + 1 = 8 + 4k - 8 + 1 = 4k + 1', '4k + 1 = 5 \\;\\Rightarrow\\; 4k = 4 \\;\\Rightarrow\\; k = 1'] },
      ],
      lines: [
        { say: 'When P of x equals x cubed, plus k x squared, minus four x, plus one, is divided by x minus two, the remainder is five. Find k.', show: 'q' },
        { say: 'By the remainder theorem, the remainder is P of two. So P of two equals five.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute two for x: two cubed is eight, plus k times four, minus eight, plus one. That simplifies to four k plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'Set it equal to five. Four k plus one equals five, so four k equals four, and k equals one.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: with k equal to one, P of two is eight, plus four, minus eight, plus one, which is five. One unknown needs one remainder.', focus: 'm' },
      ],
    },
    {
      chapter: 'Two unknowns',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: '$P(x) = x^3 + mx^2 + nx - 2$ leaves a remainder of $4$ when divided by $x - 1$, and $-4$ when divided by $x + 1$. Find $m$ and $n$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(1) = 1 + m + n - 2 = 4 \\;\\Rightarrow\\; m + n = 5', 'P(-1) = -1 + m - n - 2 = -4 \\;\\Rightarrow\\; m - n = -1', '2m = 4 \\;\\Rightarrow\\; m = 2, \\quad n = 5 - 2 = 3'] },
      ],
      lines: [
        { say: 'Two unknowns need two remainders. P of x equals x cubed, plus m x squared, plus n x, minus two. Divided by x minus one, the remainder is four. Divided by x plus one, it is negative four.', show: 'q' },
        { say: 'The first remainder gives P of one equals four. One, plus m, plus n, minus two, equals four, so m plus n equals five.', show: 'm.0', focus: 'm.0' },
        { say: 'The second gives P of negative one equals negative four. Negative one, plus m, minus n, minus two, equals negative four, so m minus n equals negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the two equations. The n terms cancel, and two m equals four, so m equals two. Then n is five minus two, which is three.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rebuilding a polynomial',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Divided by $x - 3$, a polynomial gives the quotient $x^2 + 2x - 1$ and the remainder $4$. Find the polynomial.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = (x - 3)(x^2 + 2x - 1) + 4', '= x^3 + 2x^2 - x - 3x^2 - 6x + 3 + 4', '= x^3 - x^2 - 7x + 7'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with the remainder theorem', md: '$P(3) = 27 - 9 - 21 + 7 = 4$, the remainder.' },
      ],
      lines: [
        { say: 'The division statement works backward too. Divided by x minus three, a polynomial gives the quotient x squared, plus two x, minus one, and the remainder four. What is the polynomial?', show: 'q' },
        { say: 'Use the division statement: P of x equals x minus three, times the quotient, plus the remainder.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply out: x cubed, plus two x squared, minus x, then minus three x squared, minus six x, plus three. Then add the four.', show: 'm.1', focus: 'm.1' },
        { say: 'Collect like terms: P of x equals x cubed, minus x squared, minus seven x, plus seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with the remainder theorem: P of three is 27, minus nine, minus 21, plus seven, which is four. That matches the remainder.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'When $P(x) = 2x^3 + kx^2 - x + 5$ is divided by $x + 1$, the remainder is $8$. Find $k$.',
          choices: ['$k = 6$', '$k = 2$', '$k = 4$', '$k = 12$'],
          answer: 2,
          working: '$R = P(-1) = -2 + k + 1 + 5 = k + 4$, and $k + 4 = 8$, so $k = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. When P of x equals two x cubed, plus k x squared, minus x, plus five, is divided by x plus one, the remainder is eight. Find k. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The remainder is P of negative one: negative two, plus k, plus one, plus five, which is k plus four. k plus four equals eight, so k is four. B uses P of one instead of P of negative one.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A given remainder gives an equation: $P(a) = R$.', 'Two unknowns need two remainders: solve the system.', 'Rebuild a polynomial with $P(x) = (x - a)Q(x) + R$.'] }],
      lines: [
        { say: 'Let’s sum up. A given remainder gives an equation: P of "a" equals R. Solve it for the unknown.', show: 'sum.0' },
        { say: 'Two unknowns need two remainders, which give a system of two equations.', show: 'sum.1' },
        { say: 'And the division statement rebuilds a polynomial from its divisor, quotient and remainder. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
