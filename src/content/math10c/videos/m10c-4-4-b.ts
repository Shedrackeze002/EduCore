import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-4-4-b',
  lessonId: 'm10c-4-4',
  title: 'Factoring x² + bx + c, Part 2: Using the Signs',
  thumbnailTitle: 'Factoring: Using the Signs',
  summary: 'Using the signs of b and c to find the two numbers, trinomials with negative terms, factoring out a common factor first, trinomials in two variables, and checking by multiplying.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.4 · Part 2', title: 'Using the Signs', subtitle: 'Negative terms and common factors' }],
      lines: [
        { say: 'When a trinomial has negative terms, the two numbers can be negative too. The signs tell you which.', show: 'title' },
        { say: 'In this video, you will use the signs of b and c to find the numbers quickly, factor out a common factor first, and check by multiplying.' },
      ],
    },
    {
      chapter: 'What the signs tell you',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Last term', 'Middle term', 'The two integers'],
          rows: [
            ['positive', 'positive', 'both positive'],
            ['positive', 'negative', 'both negative'],
            ['negative', 'either', 'opposite signs; the larger one has the sign of $b$'],
          ],
        },
      ],
      lines: [
        { say: 'Look at the last term, c, first. If c is positive, the two numbers have the same sign. Then if b is positive, both are positive.', show: 't.0', focus: 't.0' },
        { say: 'And if b is negative, both are negative.', show: 't.1', focus: 't.1' },
        { say: 'If c is negative, the numbers have opposite signs, and the larger one has the same sign as b.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'A negative middle term',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['x^2 - 11x + 24', '(-3)(-8) = 24 \\qquad {-3} + (-8) = -11', '= (x - 3)(x - 8)'] }],
      lines: [
        { say: 'Factor x squared minus eleven x plus 24. The product, 24, is positive, and the sum, negative eleven, is negative, so both numbers are negative.', show: 'm.0', focus: 'm.0' },
        { say: 'Negative three times negative eight is 24, and negative three plus negative eight is negative eleven.', show: 'm.1', focus: 'm.1' },
        { say: 'So the answer is x minus three, times x minus eight.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A negative constant',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['x^2 + 2x - 35', '7 \\times (-5) = -35 \\qquad 7 + (-5) = 2', '= (x + 7)(x - 5)', '\\text{check: } x^2 - 5x + 7x - 35 = x^2 + 2x - 35 \\ \\good{\\text{✓}}'] }],
      lines: [
        { say: 'Factor x squared plus two x minus 35. The product is negative, so the numbers have opposite signs. The sum is positive, so the larger one is positive.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven and negative five: their product is negative 35, and their sum is two.', show: 'm.1', focus: 'm.1' },
        { say: 'So it is x plus seven, times x minus five.', show: 'm.2', focus: 'm.2' },
        { say: 'Always check by multiplying: x squared minus five x plus seven x minus 35, which is x squared plus two x minus 35.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A common factor first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['3x^2 - 15x - 42', '= 3(x^2 - 5x - 14)', '(-7)(2) = -14 \\qquad {-7} + 2 = -5', '= 3(x - 7)(x + 2)'] },
      ],
      lines: [
        { say: 'Always look for a common factor first. In three x squared minus fifteen x minus 42, every term divides by three.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor it out: three, times x squared minus five x minus fourteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the product is negative fourteen and the sum is negative five: negative seven and two.', show: 'm.2', focus: 'm.2' },
        { say: 'So the complete answer is three, times x minus seven, times x plus two. Do not forget the three.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['x^2 + 7xy + 12y^2', '3 \\times 4 = 12 \\qquad 3 + 4 = 7', '= (x + 3y)(x + 4y)'] }],
      lines: [
        { say: 'The same method works with two variables. Treat x squared plus seven x y plus twelve y squared like x squared plus seven x plus twelve, with y on the second terms.', show: 'm.0', focus: 'm.0' },
        { say: 'Three and four multiply to twelve, and add to seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So it is x plus three y, times x plus four y.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $x^2 - 3x - 28$.',
          choices: ['$(x - 7)(x + 4)$', '$(x + 7)(x - 4)$', '$(x - 7)(x - 4)$', '$(x - 14)(x + 2)$'],
          answer: 0,
          working: 'The product is $-28$ and the sum is $-3$: $-7$ and $4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor x squared minus three x minus 28. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The product is negative, so the signs are opposite, and the sum is negative, so the larger number is negative: negative seven and four. B has the signs the wrong way round, so its middle term would be positive three x.', show: 'q.answer' },
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
          items: ['If $c > 0$, both numbers have the sign of $b$. If $c < 0$, their signs are opposite.', 'Factor out a common factor first.', 'Check by multiplying.'],
        },
      ],
      lines: [
        { say: "Let's sum up. If c is positive, both numbers have the sign of b. If c is negative, their signs are opposite, and the larger one has the sign of b.", show: 'sum.0' },
        { say: 'Always factor out a common factor first.', show: 'sum.1' },
        { say: 'And check your answer by multiplying. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
