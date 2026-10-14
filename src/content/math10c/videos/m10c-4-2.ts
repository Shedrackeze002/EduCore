import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-2',
  lessonId: 'm10c-4-2',
  title: 'Multiplying Polynomials, Part 1: Every Term Times Every Term',
  thumbnailTitle: 'Multiplying Polynomials',
  thumbnail: 't',
  summary: 'Multiplying a binomial by a trinomial and a trinomial by a trinomial, using a table so no product is missed and like terms line up on its diagonals. Part 2 simplifies expressions with several products and checks answers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.2 · Part 1', title: 'Multiplying Polynomials', subtitle: 'Every term times every term' }],
      lines: [
        { say: 'FOIL works for two binomials. But what about a binomial times a trinomial, or two trinomials?', show: 'title' },
        { say: 'In this video, you will multiply any two polynomials, using a table so you never miss a term. In part two, we simplify longer expressions and check our answers.' },
      ],
    },
    {
      chapter: 'Binomial times trinomial',
      layout: 'split',
      leftWidth: 460,
      left: [
        figure('t', [
          areaModel({
            top: ['2x^2', '-x', '4'],
            side: ['x', '3'],
            cells: [
              ['2x^3', '-x^2', '4x'],
              ['6x^2', '-3x', '12'],
            ],
            tones: [
              ['hyp', 'adj', 'good'],
              ['adj', 'good', 'opp'],
            ],
          }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['x(2x^2 - x + 4) = 2x^3 - x^2 + 4x', '3(2x^2 - x + 4) = 6x^2 - 3x + 12', '= 2x^3 + 5x^2 + x + 12'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Every term times every term', md: 'With 2 terms and 3 terms, there are $2 \\times 3 = 6$ products before you combine like terms.' },
      ],
      lines: [
        { say: 'To multiply any two polynomials, multiply every term in the first by every term in the second, then combine like terms. Expand x plus three, times two x squared minus x plus four.', show: ['t.top', 't.side', 't.outline', 't.grid'] },
        { say: 'Two terms times three terms makes six products. A table keeps track of them: one polynomial along the top, the other down the side.', show: 'key' },
        { say: 'x times each term: two x cubed, negative x squared, and four x.', show: ['t.c0-0', 't.c0-1', 't.c0-2', 'm.0'], focus: 'm.0' },
        { say: 'Three times each term: six x squared, negative three x, and twelve.', show: ['t.c1-0', 't.c1-1', 't.c1-2', 'm.1'], focus: 'm.1' },
        { say: 'Cells of the same colour are like terms. Negative x squared and six x squared make five x squared, and four x and negative three x make x.', focus: ['t.c0-1', 't.c1-0', 't.c0-2', 't.c1-1'] },
        { say: 'So the product is two x cubed plus five x squared plus x plus twelve.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Trinomial times trinomial',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('t', [
          areaModel({
            top: ['x^2', '-3x', '2'],
            side: ['x^2', '2x', '-1'],
            cells: [
              ['x^4', '-3x^3', '2x^2'],
              ['2x^3', '-6x^2', '4x'],
              ['-x^2', '3x', '-2'],
            ],
            tones: [
              ['brand', 'hyp', 'adj'],
              ['hyp', 'adj', 'good'],
              ['adj', 'good', 'opp'],
            ],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['-3x^3 + 2x^3 = -x^3', '2x^2 - 6x^2 - x^2 = -5x^2', '4x + 3x = 7x', 'x^4 - x^3 - 5x^2 + 7x - 2'] }],
      lines: [
        { say: 'Now a trinomial times a trinomial: x squared plus two x minus one, times x squared minus three x plus two. That makes nine products, so the table really helps.', show: ['t.top', 't.side', 't.outline', 't.grid'] },
        { say: 'Fill in every cell, multiplying the term at the side of its row by the term at the top of its column.', show: ['t.c0-0', 't.c0-1', 't.c0-2', 't.c1-0', 't.c1-1', 't.c1-2', 't.c2-0', 't.c2-1', 't.c2-2'] },
        { say: 'Like terms line up on the diagonals. The two x cubed terms make negative x cubed.', show: 'm.0', focus: ['m.0', 't.c0-1', 't.c1-0'] },
        { say: 'The three x squared terms make negative five x squared.', show: 'm.1', focus: ['m.1', 't.c0-2', 't.c1-1', 't.c2-0'] },
        { say: 'And the two x terms make seven x.', show: 'm.2', focus: ['m.2', 't.c1-2', 't.c2-1'] },
        { say: 'With x to the fourth and negative two, the product is x to the fourth minus x cubed minus five x squared plus seven x minus two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $(x - 2)(x^2 + 3x - 1)$.',
          choices: ['$x^3 + x^2 - 7x + 2$', '$x^3 + 5x^2 + 5x + 2$', '$x^3 + x^2 - 7x - 2$', '$x^3 - 6x + 2$'],
          answer: 0,
          working: '$x^3 + 3x^2 - x - 2x^2 - 6x + 2 = x^3 + x^2 - 7x + 2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand x minus two, times x squared plus three x minus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x times each term gives x cubed plus three x squared minus x. Negative two times each term gives negative two x squared minus six x plus two. Combined, that is x cubed plus x squared minus seven x plus two. C has the wrong sign on the last term: negative two times negative one is positive two.', show: 'q.answer' },
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
          items: ['Multiply every term in the first polynomial by every term in the second.', 'A table keeps track of the products, and like terms line up on its diagonals.', 'Then combine like terms.'],
        },
      ],
      lines: [
        { say: "Let's sum up. To multiply polynomials, multiply every term in the first by every term in the second.", show: 'sum.0' },
        { say: 'A table keeps track of all the products, and like terms line up on its diagonals.', show: 'sum.1' },
        { say: 'Then combine the like terms. In part two, we simplify expressions with several products, and check our answers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
