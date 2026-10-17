import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-6-c',
  lessonId: 'm301-7-6',
  title: 'Laws of Logarithms, Part 3: Expanding and Condensing',
  thumbnailTitle: 'Expanding and Condensing',
  summary: 'Using the product, quotient and power laws in both directions: expanding log₃ (x²√y / z⁴), condensing 3 log x − ½ log y + log z into one logarithm, and writing log₅ 72 and log₅ 30 in terms of log₅ 2 = p and log₅ 3 = q.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.6 · Part 3', title: 'Expanding and Condensing', subtitle: 'The laws work in both directions' }],
      lines: [
        { say: 'The laws of logarithms work in both directions. Expanding splits one logarithm into several. Condensing combines several into one.', show: 'title' },
        { say: 'In this video, you will do both, and then write logarithms in terms of given values. Assume every variable is positive, so that each logarithm is defined.' },
      ],
    },
    {
      chapter: 'Expanding',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{3} \\dfrac{x^{2}\\sqrt{y}}{z^{4}}', '= \\log_{3} x^{2} + \\log_{3} \\sqrt{y} - \\log_{3} z^{4}', '= \\log_{3} x^{2} + \\log_{3} y^{\\frac{1}{2}} - \\log_{3} z^{4}', '= 2\\log_{3} x + \\tfrac{1}{2}\\log_{3} y - 4\\log_{3} z'] },
      ],
      lines: [
        { say: 'Expand log base three of x squared times the square root of y, all over z to the power four.', show: 'm.0', focus: 'm.0' },
        { say: 'First split it up. The numerator is a product, so its two factors are added. The denominator is divided, so its logarithm is subtracted.', show: 'm.1', focus: 'm.1' },
        { say: 'Write the square root of y as y to the power one half.', show: 'm.2', focus: 'm.2' },
        { say: 'Now the power law brings each exponent down in front: two log base three of x, plus one half log base three of y, minus four log base three of z.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Condensing',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3\\log x - \\tfrac{1}{2}\\log y + \\log z', '= \\log x^{3} - \\log \\sqrt{y} + \\log z', '= \\log \\dfrac{x^{3}z}{\\sqrt{y}}'] },
      ],
      lines: [
        { say: 'Now go the other way. Write three log x, minus one half log y, plus log z, as a single logarithm.', show: 'm.0', focus: 'm.0' },
        { say: 'Start with the power law, in reverse. Each number in front becomes an exponent: log x cubed, minus log of y to the power one half, which is the square root of y, plus log z.', show: 'm.1', focus: 'm.1' },
        { say: 'Then combine. The added terms multiply in the numerator: x cubed times z. The subtracted term divides: the square root of y goes in the denominator.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'In terms of given values',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Given $\\log_{5} 2 = p$ and $\\log_{5} 3 = q$:' },
        { kind: 'math', id: 'm', size: 'md', lines: ['72 = 2^{3} \\times 3^{2}:\\quad \\log_{5} 72 = 3\\log_{5} 2 + 2\\log_{5} 3 = 3p + 2q', '30 = 2 \\times 3 \\times 5:\\quad \\log_{5} 30 = \\log_{5} 2 + \\log_{5} 3 + \\log_{5} 5 = p + q + 1'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Factor into primes', md: 'Factor the argument into the given numbers and the base, whose logarithm is $1$.' },
      ],
      lines: [
        { say: 'Given that log base five of two is p, and log base five of three is q, write log base five of 72 and log base five of 30 in terms of p and q.', show: 'q' },
        { say: 'Factor 72 into primes: it is two cubed times three squared. The product law and the power law give three log base five of two, plus two log base five of three. That is three p plus two q.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirty is two times three times five. So log base five of 30 is p plus q plus log base five of five. And log base five of five is one, so the answer is p plus q plus one.', show: 'm.1', focus: 'm.1' },
        { say: 'So factor the argument into the given numbers, and the base, whose logarithm is one.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Given $\\log_{5} 2 = p$ and $\\log_{5} 3 = q$, write $\\log_{5} 60$ in terms of $p$ and $q$.',
          choices: ['$2p + q$', '$p^{2}q + 1$', '$2p + q + 1$', '$2p + q + 5$'],
          answer: 2,
          working: '$60 = 2^{2} \\times 3 \\times 5$, so $\\log_{5} 60 = 2\\log_{5} 2 + \\log_{5} 3 + \\log_{5} 5 = 2p + q + 1$.',
        },
      ],
      lines: [
        { say: 'Your turn. Given that log base five of two is p, and log base five of three is q, write log base five of 60 in terms of p and q. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. Sixty is two squared, times three, times five, so log base five of 60 is two p plus q plus log base five of five, which is one. D adds five, but log base five of five is one, not five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Expanding: a product adds logarithms, a quotient subtracts them, and exponents come down in front.', 'Condensing: numbers in front become exponents; added terms multiply, subtracted terms divide.', 'To write in terms of given values, factor the argument into primes; $\\log_{c} c = 1$.'] }],
      lines: [
        { say: 'Let’s sum up. To expand, a product adds logarithms, a quotient subtracts them, and exponents come down in front.', show: 'sum.0' },
        { say: 'To condense, numbers in front become exponents first. Then added terms multiply, and subtracted terms divide.', show: 'sum.1' },
        { say: 'And to write a logarithm in terms of given values, factor the argument into primes, remembering that the log of the base is one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
