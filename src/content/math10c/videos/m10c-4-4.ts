import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

/** x² + 7x + 10 as algebra tiles: a rectangle x + 5 wide and x + 2 tall. */
const rectangle = (id: string) => figure(id, [areaModel({ top: ['x', '5'], side: ['x', '2'], cells: [['x^2', '5x'], ['2x', '10']], tiles: true })]);

const video: Explainer = {
  id: 'm10c-4-4',
  lessonId: 'm10c-4-4',
  title: 'Factoring x² + bx + c, Part 1: The Product and Sum',
  thumbnailTitle: 'Factoring $x^2 + bx + c$',
  thumbnail: 'tiles',
  summary: 'Why x² + bx + c factors into (x + p)(x + q) with p + q = b and pq = c, seen with algebra tiles, and finding the two numbers from the factor pairs of c. Part 2 uses the signs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.4 · Part 1', title: 'Factoring $x^2 + bx + c$', subtitle: 'Find the product and the sum' }],
      lines: [
        { say: 'When you expand x plus two, times x plus five, you get x squared plus seven x plus ten. Notice that two plus five is seven, and two times five is ten.', show: 'title' },
        { say: 'That pattern is the key to factoring every trinomial like this one. In this video, you will see why it works, with algebra tiles. In part two, we deal with negative signs.' },
      ],
    },
    {
      chapter: 'Seeing the pattern',
      layout: 'split',
      left: [rectangle('tiles')],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + 2)(x + 5)', '= x^2 + 5x + 2x + 10', '= x^2 + 7x + 10', '(x + p)(x + q)', '= x^2 + (p + q)x + pq'] }],
      lines: [
        { say: 'Here is x plus two, times x plus five, as algebra tiles.', show: ['tiles.top', 'tiles.side', 'tiles.outline', 'tiles.grid', 'tiles.c0-0', 'tiles.c0-1', 'tiles.c1-0', 'tiles.c1-1', 'm.0', 'm.1'], focus: 'm.1' },
        { say: 'The x tiles come from the two numbers: five x and two x make seven x. And the unit tiles are two times five, which is ten.', show: 'm.2', focus: ['m.2', 'tiles.c0-1', 'tiles.c1-0', 'tiles.c1-1'] },
        { say: 'In general, x plus p, times x plus q, is x squared, plus p plus q times x, plus p q. The middle coefficient is the sum of the two numbers, and the last term is their product.', show: ['m.3', 'm.4'], focus: 'm.4' },
      ],
    },
    {
      chapter: 'Factoring with tiles',
      layout: 'split',
      left: [rectangle('tiles')],
      right: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Factoring $x^2 + bx + c$', md: 'Find two integers $p$ and $q$ with $p + q = b$ and $pq = c$. Then $x^2 + bx + c = (x + p)(x + q)$.' }],
      lines: [
        { say: 'Factoring goes the other way. Given x squared plus seven x plus ten, arrange one x squared tile, seven x tiles and ten unit tiles into a rectangle.', show: ['tiles.c0-0', 'tiles.c0-1', 'tiles.c1-0', 'tiles.c1-1', 'tiles.outline', 'tiles.grid'] },
        { say: 'The ten unit tiles fill a rectangle two by five, which leaves five x tiles along the top and two down the side. So the sides are x plus five and x plus two.', show: ['tiles.top', 'tiles.side'], focus: ['tiles.c1-1', 'tiles.top', 'tiles.side'] },
        { say: 'So to factor x squared plus b x plus c, find two integers whose sum is b and whose product is c.', show: 'key' },
      ],
    },
    {
      chapter: 'Finding the numbers',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Factor $x^2 + 9x + 20$.', size: 'md' },
        {
          kind: 'table',
          id: 't',
          head: ['Factor pair of 20', 'Sum'],
          rows: [
            ['$1 \\times 20$', '$21$'],
            ['$2 \\times 10$', '$12$'],
            ['$4 \\times 5$', '$9$ ✓'],
          ],
        },
        { kind: 'math', id: 'm', lines: ['x^2 + 9x + 20 = (x + 4)(x + 5)'] },
      ],
      lines: [
        { say: 'Factor x squared plus nine x plus twenty. We need two numbers with a product of twenty and a sum of nine.', show: 'q' },
        { say: 'List the factor pairs of twenty. One and twenty add to 21. Two and ten add to twelve.', show: ['t.0', 't.1'] },
        { say: 'Four and five add to nine. Those are the numbers.', show: 't.2', focus: 't.2' },
        { say: 'So the answer is x plus four, times x plus five. Check: four times five is twenty, and four plus five is nine.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $x^2 + 8x + 12$.',
          choices: ['$(x + 2)(x + 6)$', '$(x + 3)(x + 4)$', '$(x + 1)(x + 12)$', '$(x + 4)(x + 4)$'],
          answer: 0,
          working: '$2 \\times 6 = 12$ and $2 + 6 = 8$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor x squared plus eight x plus twelve. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two and six multiply to twelve, and add to eight. B multiplies to twelve too, but adds to seven, and D adds to eight but multiplies to sixteen.', show: 'q.answer' },
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
          items: ['$(x + p)(x + q) = x^2 + (p + q)x + pq$.', 'To factor $x^2 + bx + c$, find two integers with sum $b$ and product $c$.', 'List the factor pairs of $c$, and check their sums.'],
        },
      ],
      lines: [
        { say: "Let's sum up. x plus p, times x plus q, is x squared, plus p plus q times x, plus p q.", show: 'sum.0' },
        { say: 'So to factor x squared plus b x plus c, find two integers whose sum is b and whose product is c.', show: 'sum.1' },
        { say: 'List the factor pairs of c, and check their sums. In part two, we use the signs to find the numbers when some terms are negative. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
