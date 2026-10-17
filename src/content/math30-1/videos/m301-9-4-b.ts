import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { pascal, streets } from './lib/m301-9-counting.ts';

// The first five rows twice: as combinations on the left and as numbers on the right.
const equals: Part = { points: { eq: [5, -2] }, items: [{ kind: 'label', id: 'eq', at: 'eq', tex: '=', tone: 'muted', place: 'center' }] };
const both = figure('c', [pascal({ name: 'c', rows: 5, dx: 1.5, entry: (n, r) => `{}_{${n}}C_{${r}}` }), equals, pascal({ name: 'v', rows: 5, dx: 1.5, at: [10, 0] })]);
const rows = (n: number) => Array.from({ length: n }, (_, k) => [`c.c-row${k}`, `c.v-row${k}`]).flat();

const video: Explainer = {
  id: 'm301-9-4-b',
  lessonId: 'm301-9-4',
  title: 'The Binomial Theorem, Part 2: Pascal’s Triangle and Combinations',
  thumbnailTitle: 'Pascal and Combinations',
  thumbnail: 'g',
  summary: 'The row of Pascal’s triangle that begins 1, n holds nC0, nC1, …, nCn, so the 4th number in the row that begins 1, 9 is 9C3 = 84. Why Pascal’s identity nC(r − 1) + nCr = (n + 1)Cr holds, and using the adding rule to count 17 shortest routes that avoid a closed corner.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.4 · Part 2', title: 'Pascal and Combinations', subtitle: '${}_{n}C_{r - 1} + {}_{n}C_{r} = {}_{n + 1}C_{r}$' }],
      lines: [
        { say: 'The numbers in Pascal’s triangle are not just a pattern. Every one of them is a combination.', show: 'title' },
        { say: 'In this video, you will find any entry of the triangle with n choose r, see why the adding rule works, and use it to count routes on a grid.' },
      ],
    },
    {
      chapter: 'The entries are combinations',
      layout: 'center',
      main: [both, { kind: 'math', id: 'm', size: 'md', lines: ['\\text{row } 1,\\ n\\text{: } {}_{n}C_{0},\\ {}_{n}C_{1},\\ {}_{n}C_{2},\\ \\ldots,\\ {}_{n}C_{n}'] }],
      lines: [
        { say: 'Here are the first five rows of Pascal’s triangle, on the right. On the left, the same places hold combinations.', show: [...rows(5), 'c.eq'] },
        { say: 'The row that begins one, n holds n choose zero, n choose one, n choose two, and so on, up to n choose n.', show: 'm.0', focus: 'm.0' },
        { say: 'For example, in the row that begins one, four: four choose zero is one, four choose one is four, four choose two is six, four choose three is four, and four choose four is one.', focus: ['c.c-row4', 'c.v-row4'] },
        { say: 'So the symmetry of each row is the rule you met with combinations: n choose r equals n choose n minus r.' },
      ],
    },
    {
      chapter: 'An entry from a combination',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'What is the 4th number in the row that begins $1,\\ 9$?' },
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{9}C_{0},\\ \\ {}_{9}C_{1},\\ \\ {}_{9}C_{2},\\ \\ \\good{{}_{9}C_{3}},\\ \\ \\ldots', '{}_{9}C_{3} = \\dfrac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84'] },
      ],
      lines: [
        { say: 'So you can find any entry without building the whole triangle. What is the fourth number in the row that begins one, nine?', show: 'p' },
        { say: 'The row is nine choose zero, nine choose one, nine choose two, nine choose three, and so on. The first number is nine choose zero, so the fourth number is nine choose three.', show: 'm.0', focus: 'm.0' },
        { say: 'Nine choose three is nine times eight times seven, over three times two times one, which is eighty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'Notice the count: the fourth number uses r equals three, one less than its place in the row, because the row starts at r equals zero.' },
      ],
    },
    {
      chapter: 'Pascal’s identity',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pascal’s identity', md: '${}_{n}C_{r - 1} + {}_{n}C_{r} = {}_{n + 1}C_{r}$' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Ana is chosen: } {}_{n}C_{r - 1} \\text{ ways}', '\\text{Ana is not chosen: } {}_{n}C_{r} \\text{ ways}', '\\text{either way: } {}_{n}C_{r - 1} + {}_{n}C_{r} = {}_{n + 1}C_{r}'] },
      ],
      lines: [
        { say: 'The adding rule of the triangle, written with combinations, is called Pascal’s identity: n choose r minus one, plus n choose r, equals n plus one, choose r.', show: 'def' },
        { say: 'Why is it true? Suppose you choose r people from a group of n plus one people. Single out one person, Ana.' },
        { say: 'Either Ana is chosen, and the other r minus one people come from the remaining n. That is n choose r minus one ways.', show: 'm.0', focus: 'm.0' },
        { say: 'Or Ana is not chosen, and all r people come from the other n. That is n choose r ways.', show: 'm.1', focus: 'm.1' },
        { say: 'Every selection is in one case or the other, never both, so add them. Together they count every way to choose r people from n plus one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Routes on a grid',
      layout: 'split',
      leftWidth: 560,
      left: [figure('g', [streets({ cols: 4, rows: 3, closed: [2, 1], counts: true })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{routes to a corner}', '= \\text{left} + \\text{below}', '\\text{closed corner: } \\bad{0}', '\\text{B: } 11 + 6 = \\good{17}'] }],
      lines: [
        { say: 'The same adding rule counts routes on a grid. How many shortest routes go from A to B without passing through the closed corner X?', show: ['g.grid', 'g.A', 'g.B', 'g.X'] },
        { say: 'A shortest route only goes east or north. So you reach any corner from the corner on its left, or from the corner below it. The number of routes to a corner is the sum of those two numbers.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'Along the bottom and up the left side, there is only one route to each corner, so write one at each.', show: 'g.edge', focus: 'g.edge' },
        { say: 'X is closed, so no route can pass through it. It gets zero.', show: ['g.closed', 'm.2'], focus: ['g.closed', 'm.2'] },
        { say: 'Now add, corner by corner. One plus one is two. Above that, one plus two is three.', show: ['g.d2', 'g.d3'], focus: ['g.d2', 'g.d3'] },
        { say: 'Next to X, add zero. The corner above X gets three plus zero, which is three, and the corner to the right of X gets zero plus one, which is one. At the top, one plus three is four.', show: 'g.d4', focus: 'g.d4' },
        { say: 'Keep adding left and below: seven, four and two, then eleven and six. Finally, B gets eleven plus six, which is seventeen routes.', show: ['g.d5', 'g.d6', 'g.d7', 'm.3'], focus: ['g.d7', 'm.3'] },
      ],
    },
    {
      chapter: 'Check by subtracting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{all routes: } \\dfrac{7!}{4!\\,3!} = 35', '\\text{A to X: } {}_{3}C_{1} = 3, \\qquad \\text{X to B: } {}_{4}C_{2} = 6', '\\text{through X: } 3 \\times 6 = 18', '35 - 18 = 17'] },
      ],
      lines: [
        { say: 'Check the answer another way. Every shortest route from A to B is four east moves and three north moves: seven factorial over four factorial, three factorial, which is thirty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'A route through X goes from A to X, two east and one north: three choose one, or three routes. Then from X to B, two east and two north: four choose two, or six routes.', show: 'm.1', focus: 'm.1' },
        { say: 'So three times six, or eighteen routes, pass through X.', show: 'm.2', focus: 'm.2' },
        { say: 'Thirty-five minus eighteen is seventeen, which matches the number at B.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is the 3rd number in the row of Pascal’s triangle that begins $1,\\ 10$?',
          choices: ['$120$', '$10$', '$45$', '$90$'],
          answer: 2,
          working: 'The row is ${}_{10}C_{0},\\ {}_{10}C_{1},\\ {}_{10}C_{2},\\ \\ldots$, so the 3rd number is ${}_{10}C_{2} = \\dfrac{10 \\times 9}{2 \\times 1} = 45$.',
        },
      ],
      lines: [
        { say: 'Your turn. What is the third number in the row of Pascal’s triangle that begins one, ten? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, forty-five. The row starts with ten choose zero, so the third number is ten choose two: ten times nine, over two, which is forty-five. Choice A, 120, is ten choose three, the fourth number.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The row that begins $1,\\ n$ is ${}_{n}C_{0},\\ {}_{n}C_{1},\\ \\ldots,\\ {}_{n}C_{n}$.', 'Pascal’s identity: ${}_{n}C_{r - 1} + {}_{n}C_{r} = {}_{n + 1}C_{r}$.', 'Routes to a corner = routes to the corner on its left + routes to the corner below it.'] }],
      lines: [
        { say: 'Let’s sum up. The row that begins one, n is n choose zero, n choose one, and so on, up to n choose n.', show: 'sum.0' },
        { say: 'Pascal’s identity says that n choose r minus one, plus n choose r, equals n plus one, choose r.', show: 'sum.1' },
        { say: 'And the routes to a corner of a grid are the routes to the corner on its left, plus the routes to the corner below it. In part three, Pascal’s triangle gives the coefficients of the binomial theorem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
