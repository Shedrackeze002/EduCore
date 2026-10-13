import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-3-5',
  lessonId: 'm10c-3-5',
  title: 'Integral Exponents, Part 1: The Exponent Laws',
  thumbnailTitle: 'The Exponent Laws',
  summary: 'Why the product, quotient, power of a power, power of a product and power of a quotient laws work, shown by writing powers out in full, and using them together. Part 2 covers zero and negative exponents.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.5 · Part 1', title: 'The Exponent Laws', subtitle: 'Shortcuts for repeated multiplication' }],
      lines: [
        { say: 'An exponent is shorthand for repeated multiplication: x to the fifth means five x’s multiplied together.', show: 'title' },
        { say: 'In this video, you will see why the exponent laws work, by writing powers out in full. In part two, we find out what zero and negative exponents mean.' },
      ],
    },
    {
      chapter: 'The product law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['x^3 \\cdot x^4 = \\adj{(x \\cdot x \\cdot x)} \\cdot \\opp{(x \\cdot x \\cdot x \\cdot x)}', '= x^7', 'a^m \\cdot a^n = a^{m+n}'] },
      ],
      lines: [
        { say: 'Multiply x cubed by x to the fourth. Write them out in full: three x’s, times four x’s.', show: 'm.0', focus: 'm.0' },
        { say: 'That is seven x’s multiplied together: x to the seventh.', show: 'm.1', focus: 'm.1' },
        { say: 'So when you multiply powers with the same base, add the exponents. a to the m, times a to the n, is a to the m plus n.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The quotient law',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\dfrac{x^8}{x^3} = \\dfrac{x \\cdot x \\cdot x \\cdot x \\cdot x \\cdot \\bad{\\cancel{x \\cdot x \\cdot x}}}{\\bad{\\cancel{x \\cdot x \\cdot x}}}', '= x^5', '\\dfrac{a^m}{a^n} = a^{m-n}'] },
      ],
      lines: [
        { say: 'Divide x to the eighth by x cubed. Write them out: eight x’s on top, and three on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'Each x on the bottom cancels one on top, which leaves five: x to the fifth.', show: 'm.1', focus: 'm.1' },
        { say: 'So when you divide powers with the same base, subtract the exponents. a to the m, over a to the n, is a to the m minus n.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Power of a power',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['(x^2)^5 = x^2 \\cdot x^2 \\cdot x^2 \\cdot x^2 \\cdot x^2', '= x^{2+2+2+2+2} = x^{10}', '(a^m)^n = a^{mn}'] }],
      lines: [
        { say: 'Raise x squared to the fifth power. That means five x squareds, multiplied together.', show: 'm.0', focus: 'm.0' },
        { say: 'Add their exponents: two, five times, is ten. So it is x to the tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'Adding two five times is the same as multiplying two by five. So to raise a power to a power, multiply the exponents.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Products and quotients',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['(2x)^3 = 2x \\cdot 2x \\cdot 2x = 8x^3', '(ab)^m = a^m b^m', '\\left(\\dfrac{x}{3}\\right)^2 = \\dfrac{x}{3} \\cdot \\dfrac{x}{3} = \\dfrac{x^2}{9}', '\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}'],
        },
      ],
      lines: [
        { say: 'Cube two x. That is two x, times two x, times two x: two cubed, which is eight, times x cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'So a power of a product raises every factor to that power.', show: 'm.1', focus: 'm.1' },
        { say: 'Square x over three: x over three, times x over three, is x squared over nine.', show: 'm.2', focus: 'm.2' },
        { say: 'So a power of a quotient raises the top and the bottom to that power.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'All five laws',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Law', 'Rule', 'Example'],
          rows: [
            ['Product', '$a^m \\cdot a^n = a^{m+n}$', '$x^3 \\cdot x^4 = x^7$'],
            ['Quotient', '$\\dfrac{a^m}{a^n} = a^{m-n}$', '$\\dfrac{x^8}{x^3} = x^5$'],
            ['Power of a power', '$(a^m)^n = a^{mn}$', '$(x^2)^5 = x^{10}$'],
            ['Power of a product', '$(ab)^m = a^m b^m$', '$(2x)^3 = 8x^3$'],
            ['Power of a quotient', '$\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$', '$\\left(\\dfrac{x}{3}\\right)^2 = \\dfrac{x^2}{9}$'],
          ],
        },
      ],
      lines: [
        { say: 'Here are all five laws together. Each one comes from writing the powers out in full, so if you forget a law, you can always work it out again.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Everything in the brackets',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['(3x^2)^2 = 3^2 (x^2)^2 = 9x^4'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not 3x⁴', md: 'An exponent outside brackets applies to **everything** inside them, including the number in front.' },
      ],
      lines: [
        { say: 'A common mistake is to square three x squared and get three x to the fourth. But the exponent outside the brackets applies to everything inside them, including the three.', show: 'oops' },
        { say: 'So it is three squared, nine, times x to the fourth: nine x to the fourth.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Putting them together',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['\\dfrac{(2x^3)^2 \\cdot x^4}{4x^5} = \\dfrac{4x^6 \\cdot x^4}{4x^5}', '= \\dfrac{4x^{10}}{4x^5}', '= x^5'] }],
      lines: [
        { say: 'Let’s use the laws together. Simplify two x cubed, squared, times x to the fourth, all over four x to the fifth. First, the power of a product: two x cubed, squared, is four x to the sixth.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply by x to the fourth by adding the exponents: four x to the tenth.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide by four x to the fifth. Four over four is one, and ten minus five is five. The answer is x to the fifth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $(2x^4)^3$.',
          choices: ['$8x^{12}$', '$2x^{12}$', '$6x^{12}$', '$8x^7$'],
          answer: 0,
          working: '$(2x^4)^3 = 2^3 (x^4)^3 = 8x^{12}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify two x to the fourth, cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cube applies to the two and to x to the fourth. Two cubed is eight, and four times three is twelve. B forgets to cube the two, C multiplies two by three, and D adds the exponents instead of multiplying them.', show: 'q.answer' },
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
          items: ['Multiplying powers with the same base: add the exponents. Dividing: subtract them.', 'A power of a power: multiply the exponents.', 'An exponent outside brackets applies to every factor inside them.'],
        },
      ],
      lines: [
        { say: "Let's sum up. To multiply powers with the same base, add the exponents. To divide them, subtract.", show: 'sum.0' },
        { say: 'To raise a power to a power, multiply the exponents.', show: 'sum.1' },
        { say: 'And an exponent outside brackets applies to every factor inside them. In part two, we find out what zero and negative exponents mean. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
