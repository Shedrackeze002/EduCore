import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm301-7-4-b',
  lessonId: 'm301-7-4',
  title: 'Understanding Logarithms, Part 2: Evaluating and Estimating Logarithms',
  thumbnailTitle: 'Evaluating Logarithms',
  thumbnail: 'nl',
  summary: 'Four facts that follow from the definition (log_c 1 = 0, log_c c = 1, log_c cⁿ = n and c^(log_c x) = x), evaluating log₂ 32, log₃ (1/9), log 0.001 and log₈ 4, why the argument must be positive, and estimating log₂ 50 between 5 and 6. Part 3 solves equations by converting to exponential form.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.4 · Part 2', title: 'Evaluating and Estimating Logarithms', subtitle: 'Write the argument as a power of the base' }],
      lines: [
        { say: 'Now that you know a logarithm is an exponent, you can work out many logarithms in your head. You just ask: the base to what exponent gives this number?', show: 'title' },
        { say: 'In this video, you will evaluate logarithms that are whole numbers, negative and fractions, and estimate one that is not exact.' },
      ],
    },
    {
      chapter: 'Four facts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{c} 1 = 0 \\quad\\text{because}\\quad c^{0} = 1', '\\log_{c} c = 1 \\quad\\text{because}\\quad c^{1} = c', '\\log_{c} c^{n} = n', 'c^{\\log_{c} x} = x'] },
      ],
      lines: [
        { say: 'Four facts follow straight from the definition. Log base c of one is zero, because c to the power zero is one.', show: 'm.0', focus: 'm.0' },
        { say: 'Log base c of c is one, because c to the power one is c.', show: 'm.1', focus: 'm.1' },
        { say: 'Log base c of c to the power n is n. The question is: c to what exponent gives c to the power n? The answer is n.', show: 'm.2', focus: 'm.2' },
        { say: 'And c to the power log base c of x is x. A power and a logarithm with the same base undo each other.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2} 32 = 5 \\qquad (32 = 2^{5})', '\\log_{3} \\tfrac{1}{9} = -2 \\qquad \\left(\\tfrac{1}{9} = 3^{-2}\\right)', '\\log 0.001 = -3 \\qquad (0.001 = 10^{-3})'] },
      ],
      lines: [
        { say: 'To evaluate a logarithm, write the argument, the number inside, as a power of the base.', show: 'm' },
        { say: 'Log base two of 32: 32 is two to the power five, so the answer is five.', focus: 'm.0' },
        { say: 'Log base three of one ninth: one ninth is one over three squared, which is three to the power negative two. So the answer is negative two.', focus: 'm.1' },
        { say: 'Log 0.001 has base ten. 0.001 is one over one thousand, which is ten to the power negative three. So the answer is negative three.', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A fractional value',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{8} 4 = y', '8^{y} = 4', '\\left(2^{3}\\right)^{y} = 2^{2}', '3y = 2,\\quad y = \\dfrac{2}{3}'] },
      ],
      lines: [
        { say: 'What about log base eight of four? Four is not a whole-number power of eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Call the answer y. In exponential form, eight to the power y equals four.', show: 'm.1', focus: 'm.1' },
        { say: 'Write both eight and four as powers of a smaller number, two. Eight is two cubed, and four is two squared.', show: 'm.2', focus: 'm.2' },
        { say: 'So three y equals two, and y equals two thirds. Log base eight of four is two thirds.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A common mistake',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\log_{2} 0 \\text{ and } \\log_{2}(-8) \\text{ are undefined}', '\\log_{3} \\tfrac{1}{9} = -2 \\text{ is fine}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Arguments must be positive', md: 'A logarithm itself can be negative, but its argument cannot.' },
      ],
      lines: [
        { say: 'What is log base two of zero? Or log base two of negative eight? No power of two is zero or negative, so both are undefined.', show: 'm.0', focus: 'm.0' },
        { say: 'Do not confuse that with a negative answer. Log base three of one ninth is negative two, and that is perfectly fine.', show: 'm.1', focus: 'm.1' },
        { say: 'So a logarithm itself can be negative, but the argument, the number you take the logarithm of, must be positive.', show: 'oops' },
      ],
    },
    {
      chapter: 'Estimating',
      layout: 'center',
      main: [
        figure('nl', [
          numberLine({
            min: 28,
            max: 68,
            step: 4,
            length: 14,
            points: [
              { id: 'a', value: 32, tex: '2^{5} = 32', tone: 'adj' },
              { id: 'b', value: 50, tex: '50', tone: 'opp' },
              { id: 'c', value: 64, tex: '2^{6} = 64', tone: 'adj' },
            ],
          }),
        ]),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 < \\log_{2} 50 < 6, \\quad \\log_{2} 50 \\approx 5.6', '\\log 50 \\approx 1.699 \\qquad (10^{1} < 50 < 10^{2})'] },
      ],
      lines: [
        { say: 'Log base two of 50 is not a whole number, because 50 is not a power of two. But you can estimate it.', show: ['nl.line', 'nl.axis', 'nl.b'], focus: 'nl.b' },
        { say: 'Find the powers of two on either side. Two to the power five is 32, and two to the power six is 64. Fifty is between them.', show: ['nl.a', 'nl.c'], focus: ['nl.a', 'nl.c'] },
        { say: 'So log base two of 50 is between five and six. Fifty is a bit closer to 64 than to 32, so a reasonable estimate is about 5.6.', show: 'm.0', focus: 'm.0' },
        { say: 'For common logarithms, use the log key on a calculator. Log 50 is about 1.699, which makes sense: 50 is between ten and one hundred, so its logarithm is between one and two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $\\log_{9} 27$.',
          choices: ['$3$', '$\\frac{1}{3}$', '$\\frac{2}{3}$', '$\\frac{3}{2}$'],
          answer: 3,
          working: 'If $9^{y} = 27$, then $3^{2y} = 3^{3}$, so $2y = 3$ and $y = \\frac{3}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate log base nine of 27. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. If nine to the power y equals 27, then three to the power two y equals three cubed, so two y equals three, and y is three halves. C is upside down: it is log base 27 of nine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$\\log_{c} 1 = 0$, $\\log_{c} c = 1$, $\\log_{c} c^{n} = n$ and $c^{\\log_{c} x} = x$.', 'To evaluate, write the argument as a power of the base, or both as powers of a smaller number.', 'The argument must be positive; the logarithm can be negative.', 'To estimate, find the powers the argument lies between.'] }],
      lines: [
        { say: 'Let’s sum up. Log base c of one is zero, log base c of c is one, and a power and a logarithm with the same base undo each other.', show: 'sum.0' },
        { say: 'To evaluate, write the argument as a power of the base, or write both as powers of a smaller number.', show: 'sum.1' },
        { say: 'The argument must be positive, but the logarithm can be negative.', show: 'sum.2' },
        { say: 'And to estimate, find the two powers the argument lies between. In part three, we solve equations by converting to exponential form. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
