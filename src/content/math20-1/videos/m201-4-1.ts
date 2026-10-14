import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-4-1',
  lessonId: 'm201-4-1',
  title: 'Factoring Polynomial Expressions, Part 1: Decomposition',
  thumbnailTitle: 'Factoring by Decomposition',
  thumbnail: 'm',
  summary: 'Why the two numbers that split the middle term of ax² + bx + c have product ac and sum b, factoring 6x² − 7x − 3 and 4x² + 4xy − 15y² by decomposition, and matching the brackets when the second group is negative. Parts 2 and 3 cover common factors, differences of squares and substitution.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 4.1 · Part 1', title: 'Factoring by Decomposition', subtitle: 'ax² + bx + c' }],
      lines: [
        { say: 'Factoring turns a sum into a product, and products are what let you solve equations and find the zeros of a function.', show: 'title' },
        { say: 'In Math 10C, you factored x squared, plus b x, plus c. In this video, you will factor any trinomial, "a" x squared, plus b x, plus c, by decomposition.' },
      ],
    },
    {
      chapter: 'Product ac, sum b',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(px + q)(rx + s) = prx^2 + (ps + qr)x + qs', 'ps + qr = b', '(ps)(qr) = (pr)(qs) = ac'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Decomposition', md: 'Find integers $m$ and $n$ with $mn = ac$ and $m + n = b$. Rewrite $bx$ as $mx + nx$, then factor the four terms by grouping.' },
      ],
      lines: [
        { say: 'Multiply two binomials, p x plus q, and r x plus s, and watch where each term comes from. The first term is p r x squared, and the last is q s.', show: 'm.0', focus: 'm.0' },
        { say: 'The middle coefficient is the sum of two products, p s and q r. They add to b.', show: 'm.1', focus: 'm.1' },
        { say: 'And they multiply to p r times q s, which is "a" times c.', show: 'm.2', focus: 'm.2' },
        { say: 'So, to factor "a" x squared plus b x plus c, look for two integers whose product is "a" c, and whose sum is b. Use them to split the middle term, then factor by grouping.', show: 'def' },
      ],
    },
    {
      chapter: 'A negative constant',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['6x^2 - 7x - 3', 'ac = -18:\\quad (-9)(2) = -18,\\ \\ -9 + 2 = -7', '6x^2 - 9x + 2x - 3', '3x(2x - 3) + 1(2x - 3)', '(3x + 1)(2x - 3)'] }],
      lines: [
        { say: 'Factor six x squared, minus seven x, minus three. "a" c is six times negative three, which is negative eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Two integers with product negative eighteen and sum negative seven are negative nine and two.', show: 'm.1', focus: 'm.1' },
        { say: 'Split the middle term: six x squared, minus nine x, plus two x, minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Group the first two terms, and the last two: three x times two x minus three, plus one times two x minus three.', show: 'm.3', focus: 'm.3' },
        { say: 'The bracket two x minus three is common, so the answer is three x plus one, times two x minus three. Expand it to check.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'split',
      leftWidth: 620,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4x^2 + 4xy - 15y^2', 'ac = -60:\\quad 10 + (-6) = 4', '4x^2 + 10xy - 6xy - 15y^2', '2x(2x + 5y) - 3y(2x + 5y)', '(2x - 3y)(2x + 5y)'] }],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Signs in the second group', md: 'From $-6xy - 15y^2$, factor out $-3y$, not $3y$, so the brackets match: $-3y(2x + 5y)$.' }],
      lines: [
        { say: 'The same method works with two variables. Factor four x squared, plus four x y, minus fifteen y squared.', show: 'm.0', focus: 'm.0' },
        { say: '"a" c is four times negative fifteen, negative sixty. Two integers with product negative sixty and sum four are ten and negative six.', show: 'm.1', focus: 'm.1' },
        { say: 'Split the middle term: plus ten x y, minus six x y.', show: 'm.2', focus: 'm.2' },
        { say: 'Group. From the second pair, factor out negative three y, not three y, so the bracket is two x plus five y, matching the first.', show: ['m.3', 'oops'], focus: 'm.3' },
        { say: 'So the answer is two x minus three y, times two x plus five y.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $2x^2 + 5x - 12$.',
          choices: ['$(2x - 3)(x + 4)$', '$(2x + 3)(x - 4)$', '$(2x - 4)(x + 3)$', '$(2x + 4)(x - 3)$'],
          answer: 0,
          working: '$ac = -24$, and $8 + (-3) = 5$: $2x^2 + 8x - 3x - 12 = 2x(x + 4) - 3(x + 4) = (2x - 3)(x + 4)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor two x squared, plus five x, minus twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. "a" c is negative twenty-four, and eight plus negative three is five. Split and group: two x times x plus four, minus three times x plus four. That is two x minus three, times x plus four. B has the signs the wrong way round.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find two integers with product $ac$ and sum $b$.', 'Split the middle term, then factor by grouping.', 'Factor a negative out of the second group if needed, so the brackets match.'] }],
      lines: [
        { say: 'Let’s sum up. To factor "a" x squared plus b x plus c, find two integers with product "a" c, and sum b.', show: 'sum.0' },
        { say: 'Split the middle term with them, then factor by grouping.', show: 'sum.1' },
        { say: 'And factor a negative out of the second group if you need to, so the brackets match. In part two, we remove common factors and factor differences of squares. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
