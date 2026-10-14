import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-1-b',
  lessonId: 'm10c-4-1',
  title: 'Multiplying Binomials, Part 2: The Distributive Property',
  thumbnailTitle: 'Multiplying Binomials',
  thumbnail: 'foil',
  summary: 'Multiplying binomials with the distributive property (FOIL), with negative terms and two variables, and squaring a binomial without losing the middle term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.1 · Part 2', title: 'Multiplying Binomials', subtitle: 'Every term times every term' }],
      lines: [
        { say: 'Drawing tiles gets slow when the numbers grow, or turn negative. But the same idea works with symbols.', show: 'title' },
        { say: 'In this video, you will multiply binomials with the distributive property, including two variables, and the square of a binomial.' },
      ],
    },
    {
      chapter: 'First, outer, inner, last',
      layout: 'split',
      leftWidth: 480,
      left: [figure('foil', [areaModel({ top: ['3x', '4'], side: ['2x', '-5'], cells: [['6x^2', '8x'], ['-15x', '-20']] })])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{First: } 2x \\cdot 3x = 6x^2', '\\text{Outer: } 2x \\cdot 4 = 8x', '\\text{Inner: } {-5} \\cdot 3x = -15x', '\\text{Last: } {-5} \\cdot 4 = -20', '6x^2 - 7x - 20'],
        },
      ],
      lines: [
        { say: 'Expand two x minus five, times three x plus four. Multiply each term of the first binomial by each term of the second. For two binomials, a memory aid is FOIL: first, outer, inner, last.', show: ['foil.top', 'foil.side', 'foil.outline', 'foil.grid'] },
        { say: 'First: two x times three x is six x squared.', show: ['m.0', 'foil.c0-0'], focus: ['m.0', 'foil.c0-0'] },
        { say: 'Outer: two x times four is eight x.', show: ['m.1', 'foil.c0-1'], focus: ['m.1', 'foil.c0-1'] },
        { say: 'Inner: negative five times three x is negative fifteen x. Keep the sign with its term.', show: ['m.2', 'foil.c1-0'], focus: ['m.2', 'foil.c1-0'] },
        { say: 'Last: negative five times four is negative twenty.', show: ['m.3', 'foil.c1-1'], focus: ['m.3', 'foil.c1-1'] },
        { say: 'Combine the like terms: eight x minus fifteen x is negative seven x. So the product is six x squared minus seven x minus twenty.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Two variables',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['(x + 2y)(3x - y)', '= 3x^2 - xy + 6xy - 2y^2', '= 3x^2 + 5xy - 2y^2'] }],
      lines: [
        { say: 'It works with two variables too. Expand x plus two y, times three x minus y.', show: 'm.0', focus: 'm.0' },
        { say: 'x times three x is three x squared. x times negative y is negative x y. Two y times three x is six x y. And two y times negative y is negative two y squared.', show: 'm.1', focus: 'm.1' },
        { say: 'The like terms are negative x y and six x y, which make five x y. So the answer is three x squared plus five x y minus two y squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squaring a binomial',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sq', [areaModel({ top: ['x', '-6'], side: ['x', '-6'], cells: [['x^2', '-6x'], ['-6x', '36']] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x - 6)^2 = (x - 6)(x - 6)', '= x^2 - 6x - 6x + 36', '= x^2 - 12x + 36'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The missing middle term', md: '$(x - 6)^2$ is **not** $x^2 + 36$. Write it as a product and multiply every pair.' },
      ],
      lines: [
        { say: 'Expand x minus six, squared. Squaring means multiplying by itself, so write it as x minus six, times x minus six.', show: ['m.0', 'sq.top', 'sq.side', 'sq.outline', 'sq.grid'], focus: 'm.0' },
        { say: 'x times x is x squared. The two middle cells are each negative six x. And negative six times negative six is positive 36.', show: ['m.1', 'sq.c0-0', 'sq.c0-1', 'sq.c1-0', 'sq.c1-1'], focus: 'm.1' },
        { say: 'Together, that is x squared minus twelve x plus 36.', show: 'm.2', focus: 'm.2' },
        { say: 'A common mistake is to square each term, and get x squared plus 36. That misses the two middle terms. Always write the square as a product, and multiply every pair.', show: 'oops', focus: ['sq.c0-1', 'sq.c1-0'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $(3x - 2)(x + 5)$.',
          choices: ['$3x^2 + 13x - 10$', '$3x^2 + 17x - 10$', '$3x^2 - 10$', '$3x^2 + 13x + 10$'],
          answer: 0,
          working: '$3x^2 + 15x - 2x - 10 = 3x^2 + 13x - 10$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand three x minus two, times x plus five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. First, three x squared. Outer, fifteen x. Inner, negative two x. Last, negative ten. Fifteen x minus two x is thirteen x. B gets the sign of the inner product wrong, and C forgets the middle terms.', show: 'q.answer' },
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
          items: ['Multiply every term of one binomial by every term of the other (FOIL), then combine like terms.', 'Keep each sign with its term.', '$(x + y)^2 = x^2 + 2xy + y^2$: never forget the middle term.'],
        },
      ],
      lines: [
        { say: "Let's sum up. Multiply every term of one binomial by every term of the other, first, outer, inner, last, then combine the like terms.", show: 'sum.0' },
        { say: 'Keep each sign with its term.', show: 'sum.1' },
        { say: 'And when you square a binomial, never forget the middle term. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
