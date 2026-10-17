import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-6-b',
  lessonId: 'm301-7-6',
  title: 'Laws of Logarithms, Part 2: The Power Law and Change of Base',
  thumbnailTitle: 'Power Law and Change of Base',
  summary: 'The power law log_c M^P = P log_c M and its proof, evaluating 2 log₆ 3 + log₆ 4, and the change of base formula log_c x = log x / log c, proved with the power law and used to find log₃ 50 ≈ 3.56.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.6 · Part 2', title: 'The Power Law and Change of Base', subtitle: 'Bring the exponent down' }],
      lines: [
        { say: 'Your calculator has a key for common logarithms, with base ten. But it has no key for log base three, or log base seven.', show: 'title' },
        { say: 'In this video, you will learn one more law, the power law, and use it to build a formula that evaluates a logarithm with any base.' },
      ],
    },
    {
      chapter: 'The power law',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Power law', md: '$\\log_{c} M^{P} = P\\log_{c} M$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['m = \\log_{c} M,\\quad M = c^{m}', 'M^{P} = \\left(c^{m}\\right)^{P} = c^{mP}', '\\log_{c} M^{P} = mP = P\\log_{c} M'] },
      ],
      lines: [
        { say: 'The power law says: log base c of M to the power P equals P times log base c of M. An exponent inside a logarithm can come down in front, as a multiplier.', show: 'def' },
        { say: 'Here is why. Let m be log base c of M, so M is c to the power m.', show: 'm.0', focus: 'm.0' },
        { say: 'Raise both sides to the power P. A power of a power multiplies the exponents, so M to the power P is c to the power m times P.', show: 'm.1', focus: 'm.1' },
        { say: 'In logarithmic form, log base c of M to the power P is m times P, which is P times log base c of M.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Use the power law first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\log_{6} 3 + \\log_{6} 4', '= \\log_{6} 3^{2} + \\log_{6} 4 = \\log_{6} 9 + \\log_{6} 4', '= \\log_{6} 36', '= 2'] },
      ],
      lines: [
        { say: 'Evaluate two log base six of three, plus log base six of four.', show: 'm.0', focus: 'm.0' },
        { say: 'The product law needs single logarithms, with no number in front. So use the power law first: two log base six of three is log base six of three squared, which is log base six of nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the product law: log base six of nine times four, which is log base six of 36.', show: 'm.2', focus: 'm.2' },
        { say: 'And six squared is 36, so the answer is two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Change of base',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\log_{c} x = \\dfrac{\\log x}{\\log c}'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['y = \\log_{c} x \\;\\to\\; c^{y} = x', '\\log c^{y} = \\log x', 'y\\log c = \\log x \\;\\to\\; y = \\dfrac{\\log x}{\\log c}'] },
      ],
      lines: [
        { say: 'The change of base formula says that log base c of x equals log x divided by log c. Both of those are common logarithms, which your calculator can do.', show: 'f' },
        { say: 'Here is the proof. Let y be log base c of x. In exponential form, c to the power y equals x.', show: 'm.0', focus: 'm.0' },
        { say: 'Take the common logarithm of both sides: log of c to the power y equals log x.', show: 'm.1', focus: 'm.1' },
        { say: 'The power law brings the y down: y times log c equals log x. Divide by log c, and y equals log x over log c.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Evaluate with a calculator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{3} 50 = \\dfrac{\\log 50}{\\log 3} \\approx \\dfrac{1.6990}{0.4771}', '\\approx 3.56', '3^{3} = 27 < 50 < 81 = 3^{4}\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Evaluate log base three of 50, to the nearest hundredth. By the change of base formula, it is log 50 divided by log three: about 1.6990 over 0.4771.', show: 'm.0', focus: 'm.0' },
        { say: 'That is about 3.56. On a calculator, divide the whole of log 50 by the whole of log three.', show: 'm.1', focus: 'm.1' },
        { say: 'Does it make sense? Three cubed is 27, and three to the power four is 81. Fifty is between them, so the answer should be between three and four. It is.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\log_{2} 20$ to the nearest hundredth.',
          choices: ['$4.32$', '$1.00$', '$0.23$', '$10$'],
          answer: 0,
          working: '$\\log_{2} 20 = \\dfrac{\\log 20}{\\log 2} \\approx \\dfrac{1.3010}{0.3010} \\approx 4.32$. Check: $2^{4} = 16 < 20 < 32 = 2^{5}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base two of 20, to the nearest hundredth. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Log 20 divided by log two is about 4.32, which is between four and five, since 20 is between 16 and 32. C is upside down: it divides log two by log 20.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Power law: $\\log_{c} M^{P} = P\\log_{c} M$.', 'Use the power law first, then the product and quotient laws.', 'Change of base: $\\log_{c} x = \\dfrac{\\log x}{\\log c}$.', 'Check an answer by finding the powers it lies between.'] }],
      lines: [
        { say: 'Let’s sum up. The power law brings an exponent down in front: log base c of M to the power P is P log base c of M.', show: 'sum.0' },
        { say: 'When numbers sit in front of logarithms, use the power law first, then the product and quotient laws.', show: 'sum.1' },
        { say: 'The change of base formula says log base c of x is log x over log c.', show: 'sum.2' },
        { say: 'And check each answer with the powers it lies between. In part three, we expand and condense logarithmic expressions. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
