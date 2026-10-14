import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-3',
  lessonId: 'm10c-4-3',
  title: 'Common Factors, Part 1: Factoring Out the GCF',
  thumbnailTitle: 'Factoring Out the GCF',
  thumbnail: 'rev',
  summary: 'Factoring as multiplication in reverse, finding the greatest common factor of a polynomial’s terms, factoring it out, and checking by expanding. Part 2 covers negative and binomial common factors.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.3 · Part 1', title: 'Factoring Out the GCF', subtitle: 'Multiplication in reverse' }],
      lines: [
        { say: 'Factoring is multiplication in reverse. When you multiply, you turn a product into a sum. When you factor, you turn the sum back into a product.', show: 'title' },
        { say: 'In this video, you will find the greatest common factor of a polynomial’s terms, and factor it out. In part two, we factor out negative and binomial common factors.' },
      ],
    },
    {
      chapter: 'The reverse of multiplying',
      layout: 'split',
      leftWidth: 480,
      left: [figure('rev', [areaModel({ top: ['2x', '-5'], side: ['3x'], cells: [['6x^2', '-15x']] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3x(2x - 5) = 6x^2 - 15x', '6x^2 - 15x = 3x(2x - 5)'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factored form', md: 'A polynomial written as a product, such as $3x(2x - 5)$.' },
      ],
      lines: [
        { say: 'Multiply three x by two x minus five. Each term is multiplied by three x, so you get six x squared minus fifteen x.', show: ['rev.top', 'rev.side', 'rev.outline', 'rev.grid', 'rev.c0-0', 'rev.c0-1', 'm.0'], focus: 'm.0' },
        { say: 'Factoring goes the other way. Start with the area, six x squared minus fifteen x, and find the sides: three x, times two x minus five.', show: 'm.1', focus: ['m.1', 'rev.side', 'rev.top'] },
        { say: 'A polynomial written as a product, like this, is in factored form.', show: 'def' },
      ],
    },
    {
      chapter: 'The GCF of the terms',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Find the GCF of $12x^3y^2$, $18x^2y^3$ and $-6x^2y$.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\text{coefficients: } \\text{GCF}(12, 18, 6) = 6', 'x\\text{: lowest power } x^2 \\qquad y\\text{: lowest power } y', '\\text{GCF} = 6x^2y'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'GCF of the terms', md: 'The GCF of the coefficients, times each variable that is in **every** term, to its **lowest** power.' },
      ],
      lines: [
        { say: 'The greatest common factor of a polynomial’s terms is the GCF of the coefficients, times each variable that is in every term, to its lowest power.', show: 'key' },
        { say: 'Find the GCF of twelve x cubed y squared, eighteen x squared y cubed, and negative six x squared y. The coefficients first: the GCF of twelve, eighteen and six is six.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'x is in every term, and its lowest power is x squared. y is in every term too, and its lowest power is y to the first.', show: 'm.1', focus: 'm.1' },
        { say: 'So the GCF is six x squared y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Factoring out the GCF',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Factor $8x^3 - 12x^2 + 4x$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{GCF} = 4x', '\\dfrac{8x^3}{4x} = 2x^2 \\qquad \\dfrac{-12x^2}{4x} = -3x \\qquad \\dfrac{4x}{4x} = 1', '8x^3 - 12x^2 + 4x = 4x(2x^2 - 3x + 1)'] },
        figure('f', [areaModel({ top: ['2x^2', '-3x', '1'], side: ['4x'], cells: [['8x^3', '-12x^2', '4x']] })], 200),
      ],
      lines: [
        { say: 'To factor out the GCF, find it, divide each term by it, and write the GCF times the quotients. Factor eight x cubed minus twelve x squared plus four x.', show: 'q' },
        { say: 'The GCF of eight, twelve and four is four, and every term has at least one x. So the GCF is four x.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide each term by four x: two x squared, negative three x, and one.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is four x, times two x squared minus three x plus one. In the area model, four x is one side, and the quotients make the other.', show: ['m.2', 'f.top', 'f.side', 'f.outline', 'f.grid', 'f.c0-0', 'f.c0-1', 'f.c0-2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check, and keep the 1',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4x(2x^2 - 3x + 1) = 8x^3 - 12x^2 + 4x \\quad \\good{\\text{✓}}', '4x(2x^2 - 3x) = 8x^3 - 12x^2 \\quad \\bad{\\text{✗}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the 1', md: 'When a term equals the GCF, it leaves **1** in the brackets: $4x = 4x \\cdot 1$.' },
      ],
      lines: [
        { say: 'Always check by multiplying back out. Four x times the brackets gives back all three terms.', show: 'm.0', focus: 'm.0' },
        { say: 'A common mistake is to leave out the one. When a term equals the GCF, it leaves a one in the brackets. Without it, you only get two terms back.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $10x^2 - 15x$ completely.',
          choices: ['$5x(2x - 3)$', '$5(2x^2 - 3x)$', '$x(10x - 15)$', '$5x(2x - 15)$'],
          answer: 0,
          working: 'The GCF is $5x$: $\\dfrac{10x^2}{5x} = 2x$ and $\\dfrac{-15x}{5x} = -3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor ten x squared minus fifteen x completely. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The GCF is five x. Ten x squared divided by five x is two x, and negative fifteen x divided by five x is negative three. B and C are true, but not complete: there is still a common factor inside the brackets.', show: 'q.answer' },
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
            'Factoring reverses multiplying: it writes a polynomial as a product.',
            'The GCF of the terms: the GCF of the coefficients, times each common variable to its lowest power.',
            'Divide each term by the GCF (a term equal to it leaves 1), then check by expanding.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Factoring reverses multiplying: it writes a polynomial as a product.", show: 'sum.0' },
        { say: 'The GCF of the terms is the GCF of the coefficients, times each common variable to its lowest power.', show: 'sum.1' },
        { say: 'Divide each term by the GCF, remembering that a term equal to it leaves a one, and check by expanding. In part two, we factor out negative and binomial common factors. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
