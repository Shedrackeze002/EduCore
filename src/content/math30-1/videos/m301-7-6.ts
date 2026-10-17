import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-6',
  lessonId: 'm301-7-6',
  title: 'Laws of Logarithms, Part 1: The Product and Quotient Laws',
  thumbnailTitle: 'The Product and Quotient Laws',
  summary: 'The product law log_c MN = log_c M + log_c N and the quotient law log_c (M/N) = log_c M − log_c N, proved from the exponent laws, used to evaluate log₂ 40 − log₂ 5 and log 4 + log 25, and why log(M + N) is not log M + log N.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.6 · Part 1', title: 'The Product and Quotient Laws', subtitle: 'Multiplication becomes addition' }],
      lines: [
        { say: 'Before electronic calculators, scientists and engineers multiplied large numbers with tables of logarithms and slide rules.', show: 'title' },
        { say: 'The trick was a law you will prove in this video: the logarithm of a product is the sum of the logarithms. Multiplication becomes addition.' },
      ],
    },
    {
      chapter: 'The two laws',
      layout: 'center',
      main: [
        { kind: 'text', id: 'cond', size: 'md', md: 'For $c > 0$, $c \\ne 1$, and $M, N > 0$:' },
        { kind: 'callout', id: 'prod', tone: 'definition', title: 'Product law', md: '$\\log_{c} MN = \\log_{c} M + \\log_{c} N$' },
        { kind: 'callout', id: 'quot', tone: 'definition', title: 'Quotient law', md: '$\\log_{c} \\dfrac{M}{N} = \\log_{c} M - \\log_{c} N$' },
      ],
      lines: [
        { say: 'Here are the two laws. They work for any base c that is positive and not one, and for any positive numbers M and N.', show: 'cond' },
        { say: 'The product law: log base c of M times N equals log base c of M, plus log base c of N. The logarithm of a product is the sum of the logarithms.', show: 'prod' },
        { say: 'The quotient law: log base c of M over N equals log base c of M, minus log base c of N. The logarithm of a quotient is the difference of the logarithms.', show: 'quot' },
      ],
    },
    {
      chapter: 'Why they work',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['m = \\log_{c} M,\\quad n = \\log_{c} N', 'M = c^{m},\\quad N = c^{n}', 'MN = c^{m}c^{n} = c^{m + n}', '\\log_{c} MN = m + n = \\log_{c} M + \\log_{c} N', '\\dfrac{M}{N} = c^{m - n} \\;\\to\\; \\log_{c} \\dfrac{M}{N} = \\log_{c} M - \\log_{c} N'] },
      ],
      lines: [
        { say: 'Here is the proof. Let m be log base c of M, and n be log base c of N.', show: 'm.0', focus: 'm.0' },
        { say: 'In exponential form, M is c to the power m, and N is c to the power n.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply them. To multiply powers with the same base, add the exponents: M N is c to the power m plus n.', show: 'm.2', focus: 'm.2' },
        { say: 'Now write that in logarithmic form: log base c of M N is m plus n, which is log base c of M, plus log base c of N.', show: 'm.3', focus: 'm.3' },
        { say: 'Dividing works the same way, by subtracting exponents. So the laws of logarithms are just the exponent laws, written in logarithmic form.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Combine, then evaluate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2} 40 - \\log_{2} 5 = \\log_{2} \\dfrac{40}{5} = \\log_{2} 8 = 3', '\\log 4 + \\log 25 = \\log (4 \\times 25) = \\log 100 = 2'] },
      ],
      lines: [
        { say: 'Evaluate log base two of 40, minus log base two of five.', show: 'm.0' },
        { say: 'Neither logarithm is a whole number on its own. But the quotient law combines them into log base two of 40 over five, which is log base two of eight. And that is three.', focus: 'm.0' },
        { say: 'Now evaluate log four plus log 25. The product law gives log of four times 25, which is log one hundred. Ten squared is one hundred, so the answer is two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Laws that do not exist', md: '$\\log(M + N)$ is **not** $\\log M + \\log N$, and $\\dfrac{\\log M}{\\log N}$ is **not** $\\log \\dfrac{M}{N}$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log 10 + \\log 10 = 1 + 1 = 2', '\\log (10 + 10) = \\log 20 \\approx 1.301'] },
      ],
      lines: [
        { say: 'Be careful: these laws are about products and quotients, not sums. The log of M plus N is not log M plus log N. And log M divided by log N is not the log of M over N.', show: 'oops' },
        { say: 'Test it with numbers. Log ten plus log ten is one plus one, which is two.', show: 'm.0', focus: 'm.0' },
        { say: 'But the log of ten plus ten is log 20, which is only about 1.301. They are not equal, so there is no law for the log of a sum.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\log_{3} 54 - \\log_{3} 2$.',
          choices: ['$27$', '$3$', '$\\log_{3} 52$', '$2$'],
          answer: 1,
          working: '$\\log_{3} 54 - \\log_{3} 2 = \\log_{3} \\dfrac{54}{2} = \\log_{3} 27 = 3$, because $3^{3} = 27$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base three of 54, minus log base three of two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. The quotient law gives log base three of 54 over two, which is log base three of 27, and that is three. C subtracts the arguments, but the quotient law divides them.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Product law: $\\log_{c} MN = \\log_{c} M + \\log_{c} N$.', 'Quotient law: $\\log_{c} \\frac{M}{N} = \\log_{c} M - \\log_{c} N$.', 'Each comes from an exponent law; the arguments must be positive.', 'There is no law for $\\log(M + N)$.'] }],
      lines: [
        { say: 'Let’s sum up. The product law: the log of a product is the sum of the logs.', show: 'sum.0' },
        { say: 'The quotient law: the log of a quotient is the difference of the logs.', show: 'sum.1' },
        { say: 'Each law comes from an exponent law, and the arguments must be positive.', show: 'sum.2' },
        { say: 'And there is no law for the log of a sum. In part two, we meet the power law and the change of base formula. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
