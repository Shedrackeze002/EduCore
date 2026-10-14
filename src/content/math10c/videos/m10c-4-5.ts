import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-5',
  lessonId: 'm10c-4-5',
  title: 'Factoring ax² + bx + c, Part 1: Decomposition',
  thumbnailTitle: 'Factoring by Decomposition',
  thumbnail: 'am',
  summary: 'The decomposition method for trinomials whose leading coefficient is not 1: find two numbers with product ac and sum b, split the middle term, group the terms in pairs and factor out the common binomial. Part 2 covers more cases and guess and check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.5 · Part 1', title: 'Factoring $ax^2 + bx + c$', subtitle: 'The decomposition method' }],
      lines: [
        { say: 'When x squared has a coefficient other than one, as in six x squared plus seven x minus three, the product and sum trick needs one more step.', show: 'title' },
        { say: 'In this video, you will learn the decomposition method, which works for every trinomial that can be factored. In part two, we look at more cases, and at guess and check.' },
      ],
    },
    {
      chapter: 'Step by step',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            'Multiply $a \\times c$.',
            'Find two integers $m$ and $n$ with $mn = ac$ and $m + n = b$.',
            '**Decompose** the middle term: $bx = mx + nx$.',
            '**Group** the four terms in pairs, and factor each pair.',
            'Factor out the common binomial.',
          ],
        },
      ],
      lines: [
        { say: 'Here is the method. First, multiply the first coefficient, "a", by the last term, c.', show: 'steps.0' },
        { say: 'Then find two numbers whose product is "a" times c, and whose sum is b.', show: 'steps.1' },
        { say: 'Split the middle term into two terms, using those numbers. This is the decomposition.', show: 'steps.2' },
        { say: 'Group the four terms in pairs, and factor each pair.', show: 'steps.3' },
        { say: 'Finally, factor out the common binomial.', show: 'steps.4' },
      ],
    },
    {
      chapter: 'An example',
      layout: 'split',
      leftWidth: 440,
      left: [figure('am', [areaModel({ top: ['2x', '3'], side: ['x', '4'], cells: [['2x^2', '3x'], ['8x', '12']] })])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['2 \\times 12 = 24', '3 \\times 8 = 24 \\qquad 3 + 8 = 11', '2x^2 + 3x + 8x + 12', '= x(2x + 3) + 4(2x + 3)', '= (2x + 3)(x + 4)'],
        },
      ],
      lines: [
        { say: 'Factor two x squared plus eleven x plus twelve. Multiply the first coefficient by the last term: two times twelve is 24.', show: 'm.0', focus: 'm.0' },
        { say: 'Now find two numbers with a product of 24 and a sum of eleven: three and eight.', show: 'm.1', focus: 'm.1' },
        { say: 'Split eleven x into three x plus eight x.', show: 'm.2', focus: 'm.2' },
        { say: 'Group the terms in pairs. The first pair has a common factor of x, which leaves two x plus three. The second pair has a common factor of four, which leaves two x plus three as well.', show: 'm.3', focus: 'm.3' },
        { say: 'Factor out the common binomial: two x plus three, times x plus four. The area model shows the same four parts.', show: ['m.4', 'am.top', 'am.side', 'am.outline', 'am.grid', 'am.c0-0', 'am.c0-1', 'am.c1-0', 'am.c1-1'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'A negative constant',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['6x^2 + 7x - 3', '6 \\times (-3) = -18 \\qquad 9 \\times (-2) = -18,\\ 9 + (-2) = 7', '6x^2 + 9x - 2x - 3', '= 3x(2x + 3) - 1(2x + 3)', '= (2x + 3)(3x - 1)'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Signs when grouping', md: 'In $-2x - 3$, factor out $-1$, so the binomials match: $-1(2x + 3)$.' },
      ],
      lines: [
        { say: 'Now six x squared plus seven x minus three. Six times negative three is negative eighteen. We need a product of negative eighteen and a sum of seven: nine and negative two.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Split the middle term: six x squared plus nine x minus two x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'The first pair has a common factor of three x, leaving two x plus three. For the second pair, factor out negative one, so it also leaves two x plus three.', show: 'm.3', focus: 'm.3' },
        { say: 'So the answer is two x plus three, times three x minus one.', show: 'm.4', focus: 'm.4' },
        { say: 'Watch the signs in the second pair. Factor out positive one instead, and you get negative two x minus three, which does not match the first binomial.', show: 'oops' },
      ],
    },
    {
      chapter: 'Order does not matter',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['6x^2 - 2x + 9x - 3', '= 2x(3x - 1) + 3(3x - 1)', '= (3x - 1)(2x + 3)'] }],
      lines: [
        { say: 'Does it matter which way round you split the middle term? No. Write the negative two x first instead.', show: 'm.0', focus: 'm.0' },
        { say: 'Then the first pair gives two x times three x minus one, and the second gives three times three x minus one. The result is the same pair of factors.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $3x^2 + 10x + 8$.',
          choices: ['$(3x + 4)(x + 2)$', '$(3x + 2)(x + 4)$', '$(3x + 8)(x + 1)$', '$(3x + 1)(x + 8)$'],
          answer: 0,
          working: '$ac = 24$, and $4 \\times 6 = 24$, $4 + 6 = 10$: $3x^2 + 4x + 6x + 8 = x(3x + 4) + 2(3x + 4) = (3x + 4)(x + 2)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor three x squared plus ten x plus eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three times eight is 24, and four and six multiply to 24 and add to ten. Split the middle term and group: x times three x plus four, plus two times three x plus four. So three x plus four, times x plus two. Expanding B gives fourteen x in the middle, not ten.', show: 'q.answer' },
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
          items: ['Find $m$ and $n$ with $mn = ac$ and $m + n = b$.', 'Split the middle term, group in pairs, and factor out the common binomial.', 'Watch the signs: factor a negative out of the second pair when needed.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. Find two numbers whose product is "a" times c, and whose sum is b.', show: 'sum.0' },
        { say: 'Split the middle term with them, group the terms in pairs, and factor out the common binomial.', show: 'sum.1' },
        { say: 'And watch the signs: factor a negative out of the second pair when you need to. In part two, we look at more cases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
