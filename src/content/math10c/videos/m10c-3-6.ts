import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-3-6',
  lessonId: 'm10c-3-6',
  title: 'Rational Exponents, Part 1: Exponents and Radicals',
  thumbnailTitle: 'Rational Exponents',
  summary: 'Why nine to the one half is the square root of nine, what a to the m over n means as a radical, converting between the two forms, and evaluating rational exponents by taking the root first. Part 2 uses the exponent laws with rational exponents.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.6 · Part 1', title: 'Rational Exponents', subtitle: 'Where exponents meet radicals' }],
      lines: [
        { say: 'What could nine to the power of one half mean? You cannot multiply nine by itself half a time. But the exponent laws tell us exactly what it must be.', show: 'title' },
        { say: 'In this video, you will connect fractional exponents to radicals, and evaluate them. In part two, we use the exponent laws with rational exponents.' },
      ],
    },
    {
      chapter: 'Unit fraction exponents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['9^{\\frac12} \\times 9^{\\frac12} = 9^{\\frac12 + \\frac12} = 9^1 = 9', '9^{\\frac12} = \\sqrt{9} = 3', '8^{\\frac13} \\times 8^{\\frac13} \\times 8^{\\frac13} = 8^1, \\text{ so } 8^{\\frac13} = \\sqrt[3]{8} = 2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit fraction exponent', md: '$a^{\\frac1n} = \\sqrt[n]{a}$, for a natural number $n$ (and $a \\ge 0$ when $n$ is even).' },
      ],
      lines: [
        { say: 'If the product law still works, then nine to the one half, times nine to the one half, is nine to the one half plus one half: nine to the one, which is nine.', show: 'm.0', focus: 'm.0' },
        { say: 'So nine to the one half is the number that, times itself, makes nine. That is the square root of nine: three.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, three lots of eight to the one third multiply to eight, so eight to the one third is the cube root of eight: two.', show: 'm.2', focus: 'm.2' },
        { say: 'In general, "a" to the one over n is the nth root of "a".', show: 'def' },
      ],
    },
    {
      chapter: 'Rational exponents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['a^{\\frac{\\adj{m}}{\\opp{n}}} = \\left(a^{\\frac{1}{\\opp{n}}}\\right)^{\\adj{m}} = \\left(\\sqrt[\\opp{n}]{a}\\right)^{\\adj{m}}', 'a^{\\frac{\\adj{m}}{\\opp{n}}} = \\left(a^{\\adj{m}}\\right)^{\\frac{1}{\\opp{n}}} = \\sqrt[\\opp{n}]{a^{\\adj{m}}}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Root at the bottom', md: 'The **denominator** is the root (the index), and the **numerator** is the power, like the root of a tree at the bottom.' },
      ],
      lines: [
        { say: 'What about other fractions? Use the power of a power law. "a" to the m over n is "a" to the one over n, to the power m: the nth root of "a", to the power m.', show: 'm.0', focus: 'm.0' },
        { say: 'Or multiply in the other order: "a" to the m, to the one over n, which is the nth root of "a" to the m.', show: 'm.1', focus: 'm.1' },
        { say: 'Either way, the denominator is the root, and the numerator is the power. Remember: the root is at the bottom, like the root of a tree.', show: 'key' },
      ],
    },
    {
      chapter: 'Converting forms',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['x^{\\frac{3}{4}} = \\sqrt[4]{x^3} = \\left(\\sqrt[4]{x}\\right)^3', '\\sqrt[5]{y^2} = y^{\\frac25}'] }],
      lines: [
        { say: 'Write x to the three quarters in radical form. The denominator, four, is the index, and the numerator, three, is the power: the fourth root of x cubed, or the fourth root of x, cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Going the other way, the fifth root of y squared is y to the two fifths. The power goes on top, and the index on the bottom.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Evaluating',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['27^{\\frac23} = \\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9', '16^{-\\frac34} = \\dfrac{1}{\\left(\\sqrt[4]{16}\\right)^3} = \\dfrac{1}{2^3} = \\dfrac18', '\\left(\\tfrac{8}{125}\\right)^{\\frac23} = \\left(\\tfrac25\\right)^2 = \\tfrac{4}{25}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Root first', md: 'Take the root first, then the power, so the numbers stay small.' },
      ],
      lines: [
        { say: 'To evaluate, take the root first, then the power, so the numbers stay small. 27 to the two thirds: the cube root of 27 is three, and three squared is nine.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'Sixteen to the negative three quarters. The negative means reciprocal: one over sixteen to the three quarters. The fourth root of sixteen is two, and two cubed is eight, so the answer is one eighth.', show: 'm.1', focus: 'm.1' },
        { say: 'For a fraction, take the root of the top and of the bottom. The cube root of eight over 125 is two fifths, and two fifths squared is four twenty-fifths.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Upside down',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['8^{\\frac23} = \\left(\\sqrt[3]{8}\\right)^2 = 4, \\text{ not } \\left(\\sqrt{8}\\right)^3', '16^{-\\frac12} = \\dfrac{1}{\\sqrt{16}} = \\dfrac14, \\text{ not } {-4}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Two common mistakes', md: 'Reading the fraction upside down, and making the answer negative when the exponent is negative.' },
      ],
      lines: [
        { say: 'Watch out for two common mistakes. The first is reading the fraction upside down. Eight to the two thirds is the cube root of eight, squared, which is four, not the square root of eight, cubed.', show: ['m.0', 'oops'], focus: 'm.0' },
        { say: 'The second is making the answer negative. Sixteen to the negative one half is one over the square root of sixteen: one quarter, not negative four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Evaluate $32^{\\frac35}$.',
          choices: ['$8$', '$19.2$', '$\\tfrac{1}{8}$', '$96$'],
          answer: 0,
          working: '$32^{\\frac35} = \\left(\\sqrt[5]{32}\\right)^3 = 2^3 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Evaluate 32 to the three fifths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The fifth root of 32 is two, and two cubed is eight. B multiplies 32 by three fifths, and C would need a negative exponent.', show: 'q.answer' },
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
          items: [
            '$a^{\\frac1n} = \\sqrt[n]{a}$.',
            '$a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$: the denominator is the root, the numerator the power.',
            'Evaluate by taking the root first. A negative exponent means reciprocal.',
          ],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a" to the one over n is the nth root of "a".', show: 'sum.0' },
        { say: '"a" to the m over n is the nth root of "a", to the power m. The denominator is the root, and the numerator is the power.', show: 'sum.1' },
        { say: 'To evaluate, take the root first, and remember that a negative exponent means a reciprocal. In part two, we use the exponent laws with rational exponents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
