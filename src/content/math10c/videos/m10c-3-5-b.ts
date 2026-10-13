import type { Explainer } from '@/video/script.ts';
import { pattern } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-5-b',
  lessonId: 'm10c-3-5',
  title: 'Integral Exponents, Part 2: Zero and Negative Exponents',
  thumbnailTitle: 'Zero and Negative Exponents',
  thumbnail: 'pat',
  summary: 'What zero and negative exponents mean, discovered from the pattern in the powers of two and confirmed by the quotient law, evaluating powers with negative exponents, and simplifying expressions to positive exponents.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.5 · Part 2', title: 'Zero and Negative Exponents', subtitle: 'Follow the pattern' }],
      lines: [
        { say: 'What could two to the power of zero mean? You cannot multiply two by itself zero times. But a pattern tells us exactly what it must be.', show: 'title' },
        { say: 'In this video, you will find out what zero and negative exponents mean, and simplify expressions that use them.' },
      ],
    },
    {
      chapter: 'Follow the pattern',
      layout: 'center',
      main: [
        figure(
          'pat',
          [pattern({ top: ['2^3', '2^2', '2^1', '2^0', '2^{-1}', '2^{-2}', '2^{-3}'], values: ['8', '4', '2', '1', '\\tfrac12', '\\tfrac14', '\\tfrac18'], step: '\\div 2' })],
          360,
        ),
      ],
      lines: [
        { say: 'Look at the powers of two. Two cubed is eight, two squared is four, and two to the first is two.', show: ['pat.c0', 'pat.c1', 'pat.c2'] },
        { say: 'Each time the exponent goes down by one, the value is divided by two.', focus: ['pat.step1', 'pat.step2'] },
        { say: 'So keep the pattern going. Two to the zero is two divided by two: one.', show: 'pat.c3', focus: ['pat.top3', 'pat.value3'] },
        { say: 'Then two to the negative one is one half, two to the negative two is one quarter, and two to the negative three is one eighth.', show: ['pat.c4', 'pat.c5', 'pat.c6'], focus: ['pat.value4', 'pat.value5', 'pat.value6'] },
      ],
    },
    {
      chapter: 'The zero exponent',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\dfrac{a^n}{a^n} = a^{n-n} = a^0', '\\dfrac{a^n}{a^n} = 1, \\text{ so } a^0 = 1'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Where is the base?', md: '$-5^0 = -(5^0) = -1$, but $(-5)^0 = 1$. The exponent applies only to what is directly in front of it.' },
      ],
      lines: [
        { say: 'The quotient law agrees. Any power divided by itself is "a" to the n minus n, which is "a" to the zero.', show: 'm.0', focus: 'm.0' },
        { say: 'But anything divided by itself is one. So "a" to the zero is one, for any base except zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Watch where the base is. In negative five to the zero, without brackets, the exponent applies only to the five, so it is negative one. With brackets, negative five, to the zero, is one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Negative exponents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2^{-3} = \\dfrac{1}{2^3} = \\dfrac18', 'a^{-n} = \\dfrac{1}{a^n} \\qquad \\dfrac{1}{a^{-n}} = a^n'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Reciprocal, not negative', md: 'A negative exponent means take the **reciprocal**. It does not make the number negative.' },
      ],
      lines: [
        { say: 'The pattern shows that two to the negative three is one over two cubed: one eighth.', show: 'm.0', focus: 'm.0' },
        { say: 'In general, "a" to the negative n is one over "a" to the n, and one over "a" to the negative n is "a" to the n.', show: 'm.1', focus: 'm.1' },
        { say: 'So a negative exponent means take the reciprocal. It does not make the number negative.', show: 'key' },
      ],
    },
    {
      chapter: 'Evaluating powers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4^{-2} = \\dfrac{1}{4^2} = \\dfrac{1}{16}', '\\left(\\tfrac23\\right)^{-3} = \\left(\\tfrac32\\right)^3 = \\dfrac{27}{8}', '(-2)^{-3} = \\dfrac{1}{(-2)^3} = -\\dfrac18'] },
      ],
      lines: [
        { say: 'Evaluate four to the negative two. Take the reciprocal: one over four squared, which is one sixteenth.', show: 'm.0', focus: 'm.0' },
        { say: 'Two thirds to the negative three: flip the fraction, and cube it. Three halves, cubed, is 27 eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Negative two to the negative three is one over negative two cubed, which is negative one eighth. The answer is negative because the base is negative, not because of the exponent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Simplifying expressions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\dfrac{(2x^{-2}y^3)^3}{4x^{-5}y} = \\dfrac{8x^{-6}y^9}{4x^{-5}y}', '= 2x^{-1}y^8', '= \\dfrac{2y^8}{x}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Positive exponents', md: 'Apply the laws, then write the final answer with **positive** exponents only.' },
      ],
      lines: [
        { say: 'Simplify this expression. First, the power of a product: two cubed is eight, negative two times three is negative six, and three times three is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide. Eight over four is two. For x, negative six minus negative five is negative one. For y, nine minus one is eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Final answers use positive exponents, so x to the negative one moves below the fraction bar: two y to the eighth, over x.', show: ['m.2', 'tip'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $5^{-2}$.',
          choices: ['$\\tfrac{1}{25}$', '$-25$', '$-10$', '$\\tfrac{1}{10}$'],
          answer: 0,
          working: '$5^{-2} = \\dfrac{1}{5^2} = \\dfrac{1}{25}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate five to the negative two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five to the negative two is one over five squared: one twenty-fifth. B makes the answer negative, but a negative exponent means a reciprocal, not a negative number.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: ['$a^0 = 1$ for any $a \\neq 0$.', '$a^{-n} = \\dfrac{1}{a^n}$: a negative exponent means reciprocal.', 'Simplify with the laws, then write the answer with positive exponents.'],
        },
      ],
      lines: [
        { say: "Let's sum up. Any base except zero, to the power of zero, is one.", show: 'sum.0' },
        { say: 'A negative exponent means the reciprocal: "a" to the negative n is one over "a" to the n.', show: 'sum.1' },
        { say: 'To simplify, apply the laws, then write the answer with positive exponents. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
