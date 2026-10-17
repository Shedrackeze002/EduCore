import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-7-3-c',
  lessonId: 'm301-7-3',
  title: 'Solving Exponential Equations, Part 3: Products, Quotients, Radicals and Half-Life',
  thumbnailTitle: 'Products, Quotients and Radicals',
  summary: 'Collecting each side into a single power with the exponent laws to solve 9ˣ = 27^(x − 1)/3, 4ˣ = 8√2 and 2^(x² − 3x) = 16, then finding when 5 mg of an 80 mg dose remains, with a half-life of 6 hours.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 7.3 · Part 3', title: 'Products, Quotients and Radicals', subtitle: 'Collect each side into a single power' }],
      lines: [
        { say: 'Some exponential equations have powers multiplied together, divided, or written under a root sign. The exponent laws collect each side into a single power.', show: 'title' },
        { say: 'In this video, you will solve three equations like that, and then use a common base to answer a half-life question.' },
      ],
    },
    {
      chapter: 'The exponent laws',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['c^{m} \\cdot c^{n} = c^{m + n}', '\\dfrac{c^{m}}{c^{n}} = c^{m - n}', '\\sqrt{c} = c^{\\frac{1}{2}}'] },
      ],
      lines: [
        { say: 'Three laws do the work. To multiply powers with the same base, add the exponents.', show: 'm.0', focus: 'm.0' },
        { say: 'To divide them, subtract the exponents.', show: 'm.1', focus: 'm.1' },
        { say: 'And write a square root as an exponent of one half.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quotient',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['9^{x} = \\dfrac{27^{x - 1}}{3}', '3^{2x} = \\dfrac{3^{3x - 3}}{3^{1}} = 3^{3x - 4}', '2x = 3x - 4,\\quad x = 4', '\\text{Check: } 9^{4} = 6561,\\quad \\dfrac{27^{3}}{3} = \\dfrac{19\\,683}{3} = 6561\\ \\checkmark'] },
      ],
      lines: [
        { say: 'Solve nine to the power x equals 27 to the power x minus one, all over three.', show: 'm.0', focus: 'm.0' },
        { say: 'Everything is a power of three. Nine to the power x is three to the power two x. On the right, 27 to the power x minus one is three to the power three x minus three, and dividing by three to the power one subtracts one more: three x minus four.', show: 'm.1', focus: 'm.1' },
        { say: 'Set the exponents equal: two x equals three x minus four, so x equals four.', show: 'm.2', focus: 'm.2' },
        { say: 'Check. Nine to the power four is 6,561. And 27 cubed is 19,683, which divided by three is also 6,561.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A radical',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4^{x} = 8\\sqrt{2}', '8\\sqrt{2} = 2^{3} \\cdot 2^{\\frac{1}{2}} = 2^{\\frac{7}{2}}', '2^{2x} = 2^{\\frac{7}{2}}', '2x = \\dfrac{7}{2},\\quad x = \\dfrac{7}{4}'] },
      ],
      lines: [
        { say: 'Solve four to the power x equals eight times the square root of two.', show: 'm.0', focus: 'm.0' },
        { say: 'Eight is two cubed, and the square root of two is two to the power one half. Multiplying adds the exponents: three plus one half is seven halves.', show: 'm.1', focus: 'm.1' },
        { say: 'On the left, four to the power x is two to the power two x.', show: 'm.2', focus: 'm.2' },
        { say: 'So two x equals seven halves, and x equals seven quarters.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A quadratic exponent',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2^{x^{2} - 3x} = 16 = 2^{4}', 'x^{2} - 3x = 4', 'x^{2} - 3x - 4 = 0', '(x - 4)(x + 1) = 0', 'x = -1 \\text{ or } x = 4'] },
      ],
      lines: [
        { say: 'Solve two to the power x squared minus three x, equals 16. Sixteen is two to the power four.', show: 'm.0', focus: 'm.0' },
        { say: 'Set the exponents equal: x squared minus three x equals four. This time, that is a quadratic equation.', show: 'm.1', focus: 'm.1' },
        { say: 'Move the four across, and factor: x minus four, times x plus one, equals zero.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'So x equals negative one or x equals four. Both check: each makes the exponent four, and two to the power four is 16. A quadratic exponent can give two solutions.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Half-life',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'A medical isotope has a half-life of $6$ hours, so the mass remaining from an $80$ mg dose is $A = 80\\left(\\frac{1}{2}\\right)^{\\frac{t}{6}}$. When will $5$ mg remain?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['5 = 80\\left(\\tfrac{1}{2}\\right)^{\\frac{t}{6}}', '\\left(\\tfrac{1}{2}\\right)^{\\frac{t}{6}} = \\tfrac{5}{80} = \\tfrac{1}{16} = \\left(\\tfrac{1}{2}\\right)^{4}', '\\dfrac{t}{6} = 4,\\quad t = 24 \\text{ hours}'] },
      ],
      lines: [
        { say: 'A medical isotope has a half-life of six hours, so the mass remaining from an 80 milligram dose is 80 times one half to the power t over six. When will five milligrams remain?', show: 'q' },
        { say: 'Set the mass equal to five.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by 80. Five over 80 is one sixteenth, and one sixteenth is one half to the power four.', show: 'm.1', focus: 'm.1' },
        { say: 'So t over six equals four, and t equals 24 hours. That makes sense: four half-lives of six hours each.', show: 'm.2', focus: 'm.2' },
        { say: 'Not every equation has a common base. Three to the power x equals 20 cannot be written that way. You will solve equations like that with logarithms in lesson 7.7.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An isotope has a half-life of $5$ days, so the mass left from a $96\\text{ mg}$ sample is $A = 96\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}}$. When will $3\\text{ mg}$ remain?',
          choices: ['$25$ days', '$5$ days', '$32$ days', '$160$ days'],
          answer: 0,
          working: '$\\left(\\frac{1}{2}\\right)^{\\frac{t}{5}} = \\frac{3}{96} = \\frac{1}{32} = \\left(\\frac{1}{2}\\right)^{5}$, so $\\frac{t}{5} = 5$ and $t = 25$ days.',
        },
      ],
      lines: [
        { say: 'Your turn. An isotope has a half-life of five days, so the mass left from a 96 milligram sample is 96 times one half to the power t over five. When will three milligrams remain? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three over 96 is one over 32, which is one half to the power five. So t over five equals five, and t is 25 days. B is the number of half-lives, not the time.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Collect each side into a single power: products add exponents; quotients subtract them.', 'Write roots as rational exponents: $\\sqrt{c} = c^{\\frac{1}{2}}$.', 'A quadratic exponent can give two solutions.', 'Half-life models often lead to a common base of $\\frac{1}{2}$.'] }],
      lines: [
        { say: 'Let’s sum up. Collect each side into a single power. Multiplying adds exponents, and dividing subtracts them.', show: 'sum.0' },
        { say: 'Write a square root as an exponent of one half.', show: 'sum.1' },
        { say: 'A quadratic exponent can give two solutions, so check both.', show: 'sum.2' },
        { say: 'And half-life problems often lead to a common base of one half. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
