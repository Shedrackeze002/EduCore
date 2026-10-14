import type { Explainer } from '@/video/script.ts';
import { areaModel, X } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-1',
  lessonId: 'm10c-4-1',
  title: 'Multiplying Binomials, Part 1: Area Models and Algebra Tiles',
  thumbnailTitle: 'Multiplying with Area Models',
  thumbnail: 'tiles',
  summary: 'The words for polynomials, multiplying two binomials with algebra tiles and an area model, and why it is the same as two-digit multiplication. Part 2 multiplies binomials with symbols.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.1 · Part 1', title: 'Multiplying with Area Models', subtitle: 'Algebra tiles and arithmetic' }],
      lines: [
        { say: 'How do you multiply x plus three by x plus two? You can draw it, the same way you might draw 23 times fourteen.', show: 'title' },
        { say: 'In this video, you will learn the words for polynomials, and multiply binomials with algebra tiles and area models. In part two, we multiply without pictures.' },
      ],
    },
    {
      chapter: 'The words',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Word', 'Meaning', 'Example'],
          rows: [
            ['term', 'a number, a variable, or their product', '$-5x^2$'],
            ['monomial', 'one term', '$3xy$'],
            ['binomial', 'two terms', '$2x + 3$'],
            ['trinomial', 'three terms', '$x^2 - 4x + 7$'],
            ['polynomial', 'one or more terms added together', '$x^3 + 2x - 1$'],
            ['like terms', 'the same variables, with the same exponents', '$4x$ and $-9x$'],
          ],
        },
      ],
      lines: [
        { say: 'First, some words. A term is a number, a variable, or their product, like negative five x squared.', show: 't.0', focus: 't.0' },
        { say: 'A monomial has one term, a binomial has two, and a trinomial has three.', show: ['t.1', 't.2', 't.3'], focus: ['t.1', 't.2', 't.3'] },
        { say: 'A polynomial is one or more terms added together.', show: 't.4', focus: 't.4' },
        { say: 'And like terms have the same variables, with the same exponents, like four x and negative nine x. Only like terms can be combined.', show: 't.5', focus: 't.5' },
      ],
    },
    {
      chapter: 'Algebra tiles',
      layout: 'center',
      main: [
        figure(
          'kit',
          [
            areaModel({ name: 'sq', top: ['x'], side: ['x'], cells: [['x^2']], tiles: true }),
            areaModel({ name: 'rect', top: ['x'], side: ['1'], cells: [['x']], tiles: true, at: [X + 2, 0] }),
            areaModel({ name: 'unit', top: ['1'], side: ['1'], cells: [['1']], tiles: true, at: [2 * X + 4, 0] }),
          ],
          340,
        ),
        { kind: 'callout', id: 'key', tone: 'key', title: 'Area', md: 'Each tile’s area is the product of its sides: $x \\cdot x = x^2$, $x \\cdot 1 = x$ and $1 \\cdot 1 = 1$.' },
      ],
      lines: [
        { say: 'Algebra tiles show multiplication as area. The big square has sides x and x, so its area is x squared.', show: ['kit.sq-outline', 'kit.sq-c0-0', 'kit.sq-top', 'kit.sq-side'] },
        { say: 'The long rectangle is x by one, so its area is x.', show: ['kit.rect-outline', 'kit.rect-c0-0', 'kit.rect-top', 'kit.rect-side'] },
        { say: 'And the small square is one by one, with an area of one.', show: ['kit.unit-outline', 'kit.unit-c0-0', 'kit.unit-top', 'kit.unit-side', 'key'] },
      ],
    },
    {
      chapter: 'A rectangle of tiles',
      layout: 'split',
      left: [figure('tiles', [areaModel({ top: ['x', '2'], side: ['x', '3'], cells: [['x^2', '2x'], ['3x', '6']], tiles: true })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + 3)(x + 2)', '= x^2 + 2x + 3x + 6', '= x^2 + 5x + 6'] }],
      lines: [
        { say: 'Multiply x plus three by x plus two. Build a rectangle with x plus two along the top, and x plus three down the side.', show: ['tiles.top', 'tiles.side', 'tiles.outline', 'm.0'] },
        { say: 'Fill it with tiles. The corner is x by x: one x squared tile.', show: 'tiles.c0-0', focus: 'tiles.c0-0' },
        { say: 'Beside it, x by two makes two x tiles. Below it, three by x makes three more x tiles.', show: ['tiles.c0-1', 'tiles.c1-0'], focus: ['tiles.c0-1', 'tiles.c1-0'] },
        { say: 'And the last corner is three by two: six unit tiles.', show: ['tiles.c1-1', 'tiles.grid'], focus: 'tiles.c1-1' },
        { say: 'Add up the tiles: x squared, plus two x, plus three x, plus six.', show: 'm.1', focus: 'm.1' },
        { say: 'Combine the like terms, two x and three x, and the product is x squared plus five x plus six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Like two-digit multiplication',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('num', [
          areaModel({
            top: ['20', '3'],
            side: ['10', '4'],
            cells: [
              ['200', '30'],
              ['80', '12'],
            ],
            widths: [4.4, 1.8],
            heights: [2.6, 1.4],
            tones: [
              ['brand', 'brand'],
              ['brand', 'brand'],
            ],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['23 \\times 14 = (20 + 3)(10 + 4)', '= 200 + 30 + 80 + 12 = 322', '(2x + 3)(x + 4) = 2x^2 + 11x + 12', '\\text{at } x = 10\\text{: } 200 + 110 + 12 = 322'] }],
      lines: [
        { say: 'This is just like multiplying numbers. To find 23 times fourteen, split 23 into twenty plus three, and fourteen into ten plus four.', show: ['num.top', 'num.side', 'num.outline', 'num.grid', 'm.0'], focus: 'm.0' },
        { say: 'Multiply each part by each part: 200, 30, 80 and 12. Add them, and you get 322.', show: ['num.c0-0', 'num.c0-1', 'num.c1-0', 'num.c1-1', 'm.1'], focus: 'm.1' },
        { say: 'Now compare two x plus three, times x plus four. It is two x squared plus eleven x plus twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'Put x equal to ten, and you get 200, plus 110, plus 12: the same 322. Multiplying binomials really is two-digit multiplication.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $(x + 4)(x + 1)$.',
          choices: ['$x^2 + 5x + 4$', '$x^2 + 4x + 4$', '$x^2 + 5$', '$2x + 5$'],
          answer: 0,
          working: 'The tiles are one $x^2$, one $x$ and four more $x$ tiles, and four units: $x^2 + x + 4x + 4 = x^2 + 5x + 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand x plus four, times x plus one. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The rectangle holds one x squared tile, one x tile and four more x tiles, which is five x, and four unit tiles. C forgets the x tiles, and D adds the binomials instead of multiplying them.', show: 'q.answer' },
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
            'A binomial has two terms and a trinomial three; like terms have the same variables and exponents.',
            'In an area model, each term of one factor multiplies each term of the other.',
            'Multiplying binomials works just like two-digit multiplication.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A binomial has two terms, a trinomial has three, and like terms have the same variables with the same exponents.", show: 'sum.0' },
        { say: 'In an area model, or with algebra tiles, each term of one factor multiplies each term of the other.', show: 'sum.1' },
        { say: 'And multiplying binomials works just like two-digit multiplication. In part two, we multiply binomials with symbols. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
