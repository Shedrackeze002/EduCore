import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-3-b',
  lessonId: 'm301-7-3',
  title: 'Solving Exponential Equations, Part 2: Rewriting Both Sides with a Common Base',
  thumbnailTitle: 'A Common Base',
  summary: 'Solving exponential equations whose bases are powers of the same number: 2^(x + 1) = 8^(x − 2) and (1/9)ˣ = 27^(x + 2), using the power of a power law, and why (2³)^(x − 2) is 2^(3x − 6), not 2^(3x − 2). Part 3 solves equations with products, quotients, radicals and a half-life.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.3 · Part 2', title: 'A Common Base', subtitle: 'When the two sides have different bases' }],
      lines: [
        { say: 'In part one, one side of each equation was already a power of the other side’s base. But what if the bases are different, like two and eight?', show: 'title' },
        { say: 'In this video, you will rewrite both sides as powers of a common base, and avoid a very common slip with brackets.' },
      ],
    },
    {
      chapter: 'Four steps',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Write each base as a power of the common base.', 'Use the power of a power law, $\\left(c^{m}\\right)^{n} = c^{mn}$.', 'Set the exponents equal and solve.', 'Check by substituting.'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['4 = 2^{2},\\quad 8 = 2^{3},\\quad 16 = 2^{4} \\qquad 9 = 3^{2},\\quad 27 = 3^{3}'] },
      ],
      lines: [
        { say: 'Many different bases are powers of the same number. Four, eight and sixteen are all powers of two. Nine and 27 are both powers of three.', show: 'm.0' },
        { say: 'So first, write each base as a power of the common base.', show: 'b.0' },
        { say: 'Then use the power of a power law: c to the power m, all to the power n, is c to the power m times n. Multiply the exponents.', show: 'b.1' },
        { say: 'Set the exponents equal and solve. Finally, check your answer by substituting it.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Two different bases',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2^{x + 1} = 8^{x - 2}', '2^{x + 1} = \\left(2^{3}\\right)^{x - 2} = 2^{3x - 6}', 'x + 1 = 3x - 6', '-2x = -7,\\quad x = \\dfrac{7}{2}', '\\text{Check: } 2^{\\frac{9}{2}} \\text{ and } 8^{\\frac{3}{2}} = \\left(2^{3}\\right)^{\\frac{3}{2}} = 2^{\\frac{9}{2}}\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Solve two to the power x plus one equals eight to the power x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight is two cubed. So the right side is two cubed, all to the power x minus two. Multiply the exponents: three times x minus two is three x minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Both sides are now powers of two, so set the exponents equal: x plus one equals three x minus six.', show: 'm.2', focus: 'm.2' },
        { say: 'Subtract three x and subtract one from both sides: negative two x equals negative seven. So x equals seven halves.', show: 'm.3', focus: 'm.3' },
        { say: 'Check. On the left, seven halves plus one is nine halves, so we get two to the power nine halves. On the right, seven halves minus two is three halves, and eight to the power three halves is also two to the power nine halves.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A fractional base',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(\\tfrac{1}{9}\\right)^{x} = 27^{x + 2}', '\\tfrac{1}{9} = 3^{-2},\\quad 27 = 3^{3}', '3^{-2x} = 3^{3x + 6}', '-2x = 3x + 6', '-5x = 6,\\quad x = -\\dfrac{6}{5}'] },
      ],
      lines: [
        { say: 'Solve one ninth to the power x equals 27 to the power x plus two.', show: 'm.0', focus: 'm.0' },
        { say: 'Both bases are powers of three. One ninth is one over three squared, which is three to the power negative two. And 27 is three cubed.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply the exponents. On the left, negative two times x is negative two x. On the right, three times x plus two is three x plus six.', show: 'm.2', focus: 'm.2' },
        { say: 'Set the exponents equal: negative two x equals three x plus six.', show: 'm.3', focus: 'm.3' },
        { say: 'Subtract three x from both sides: negative five x equals six. So x equals negative six fifths.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\left(2^{3}\\right)^{x - 2} = 2^{3(x - 2)} = 2^{3x - 6}', '\\text{not } 2^{3x - 2}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiply the whole exponent', md: 'Keep brackets around the exponent until you have multiplied every term.' },
      ],
      lines: [
        { say: 'Here is a very common slip. Two cubed, all to the power x minus two, is two to the power three times the whole of x minus two.', show: 'm.0', focus: 'm.0' },
        { say: 'That is three x minus six. It is not three x minus two: the three multiplies the two as well.', show: 'm.1', focus: 'm.1' },
        { say: 'So keep brackets around the exponent until you have multiplied every term.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $4^{x} = 8^{x - 1}$.',
          choices: ['$x = 1$', '$x = -3$', '$x = \\frac{3}{5}$', '$x = 3$'],
          answer: 3,
          working: '$4^{x} = 2^{2x}$ and $8^{x - 1} = 2^{3(x - 1)} = 2^{3x - 3}$. So $2x = 3x - 3$, and $x = 3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve four to the power x equals eight to the power x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Four to the power x is two to the power two x, and eight to the power x minus one is two to the power three x minus three. So two x equals three x minus three, and x is three. Choice A comes from writing three x minus one: the three must multiply the whole exponent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write each base as a power of a common base.', 'Power of a power: $\\left(c^{m}\\right)^{n} = c^{mn}$. Multiply the whole exponent.', 'Set the exponents equal, solve, and check by substituting.'] }],
      lines: [
        { say: 'Let’s sum up. When the bases are different, write each one as a power of a common base.', show: 'sum.0' },
        { say: 'Use the power of a power law, and multiply the whole exponent.', show: 'sum.1' },
        { say: 'Then set the exponents equal, solve, and check. In part three, we handle products, quotients and radicals, and solve a half-life problem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
