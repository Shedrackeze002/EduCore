import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-4',
  lessonId: 'm301-7-4',
  title: 'Understanding Logarithms, Part 1: Logarithms Are Exponents',
  thumbnailTitle: 'Logarithms Are Exponents',
  summary: 'What a logarithm is (log_c x = y means c^y = x), the common logarithm log x with base 10, and converting between exponential and logarithmic form: 3⁴ = 81, 8^(2/3) = 4 and log 0.01 = −2. Part 2 evaluates and estimates logarithms.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.4 · Part 1', title: 'Logarithms Are Exponents', subtitle: 'Two to what exponent gives 32?' }],
      lines: [
        { say: 'To undo squaring, you take a square root. But to undo raising two to a power, you need a new operation.', show: 'title' },
        { say: 'Two to what exponent gives 32? The answer, five, is called a logarithm. In this video, you will see what a logarithm is, and switch between exponential form and logarithmic form.' },
      ],
    },
    {
      chapter: 'What a logarithm is',
      layout: 'center',
      main: [
        { kind: 'math', id: 'q', size: 'lg', lines: ['2^{?} = 32', '2^{5} = 32 \\quad\\Longleftrightarrow\\quad \\log_{2} 32 = 5'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Logarithm', md: 'For $c > 0$, $c \\ne 1$ and $x > 0$, $\\log_{c} x = y$ means $c^{y} = x$. The logarithm of $x$ to base $c$ is the exponent that $c$ must be raised to in order to give $x$.' },
      ],
      lines: [
        { say: 'Ask the question: two to what exponent gives 32? Two, four, eight, sixteen, 32. Five factors of two, so the exponent is five.', show: 'q.0', focus: 'q.0' },
        { say: 'We write that as log base two of 32 equals five. It means exactly the same as two to the power five equals 32.', show: 'q.1', focus: 'q.1' },
        { say: 'In general, log base c of x equals y means c to the power y equals x. The logarithm is the exponent that the base must be raised to, to give x. A logarithm is an exponent.', show: 'def' },
        { say: 'The base c follows the same rules as before: positive, and not one. And x must be positive, because a positive base to any power is positive.' },
      ],
    },
    {
      chapter: 'Two forms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\adj{c}^{\\opp{y}} = x \\quad\\Longleftrightarrow\\quad \\log_{\\adj{c}} x = \\opp{y}'] },
        { kind: 'bullets', id: 'b', items: ['The [[adj:base]] stays the base.', 'The [[opp:exponent]] becomes the value of the logarithm.'] },
      ],
      lines: [
        { say: 'Every exponential statement has a logarithmic form, and every logarithmic statement has an exponential form.', show: 'm.0' },
        { say: 'To switch between them, look at the blue base. The base stays the base.', show: 'b.0' },
        { say: 'And look at the orange exponent. The exponent becomes the value of the logarithm, on its own on one side of the equals sign.', show: 'b.1' },
      ],
    },
    {
      chapter: 'The common logarithm',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Common logarithm', md: 'A logarithm with base $10$. It is written without a base: $\\log x$ means $\\log_{10} x$. It is the LOG key on a calculator.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log 1000 = 3 \\quad\\text{because}\\quad 10^{3} = 1000', '\\log 0.01 = -2 \\quad\\text{because}\\quad 10^{-2} = 0.01'] },
      ],
      lines: [
        { say: 'Base ten is so useful that it has its own name. A logarithm with base ten is a common logarithm. It is written without a base: log x means log base ten of x. It is the log key on your calculator.', show: 'def' },
        { say: 'For example, log one thousand equals three, because ten cubed is one thousand.', show: 'm.0', focus: 'm.0' },
        { say: 'And log 0.01 equals negative two, because ten to the power negative two is one over one hundred, which is 0.01.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Converting between forms',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3^{4} = 81 \\quad\\to\\quad \\log_{3} 81 = 4', '8^{\\frac{2}{3}} = 4 \\quad\\to\\quad \\log_{8} 4 = \\tfrac{2}{3}', '\\log 0.01 = -2 \\quad\\to\\quad 10^{-2} = 0.01'] },
      ],
      lines: [
        { say: 'Now practise. Write three to the power four equals 81 in logarithmic form. The base is three, and the exponent is four. So log base three of 81 equals four.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight to the power two thirds equals four. The base is eight, and the exponent is two thirds. So log base eight of four equals two thirds. A logarithm does not have to be a whole number.', show: 'm.1', focus: 'm.1' },
        { say: 'Going the other way, log 0.01 equals negative two has base ten, so ten to the power negative two equals 0.01. A logarithm can be negative, too.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $5^{-2} = \\frac{1}{25}$ in logarithmic form.',
          choices: ['$\\log_{5} (-2) = \\frac{1}{25}$', '$\\log_{\\frac{1}{25}} 5 = -2$', '$\\log_{5} \\frac{1}{25} = -2$', '$\\log_{-2} \\frac{1}{25} = 5$'],
          answer: 2,
          working: 'The base $5$ stays the base, and the exponent $-2$ becomes the value of the logarithm: $\\log_{5} \\frac{1}{25} = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write five to the power negative two equals one over 25 in logarithmic form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. The base, five, stays the base, and the exponent, negative two, becomes the value of the logarithm. Choice A swaps the exponent and the result: the logarithm is the exponent, not one over 25.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\log_{c} x = y$ means $c^{y} = x$: a logarithm is an exponent.', 'The base stays the base; the exponent becomes the value of the logarithm.', '$\\log x$ is the common logarithm, with base $10$.'] }],
      lines: [
        { say: 'Let’s sum up. Log base c of x equals y means c to the power y equals x. A logarithm is an exponent.', show: 'sum.0' },
        { say: 'To switch forms, the base stays the base, and the exponent becomes the value of the logarithm.', show: 'sum.1' },
        { say: 'And log x, with no base written, is the common logarithm, with base ten. In part two, we evaluate and estimate logarithms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
