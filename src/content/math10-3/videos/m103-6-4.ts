import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A 2 × 2 square and the whole 3 × 3 square, picked out on a 3 × 3 grid. */
const bigger: Part = {
  points: { s0: [0, 0], s1: [2, 0], s2: [2, 2], s3: [0, 2], w0: [0, 0], w1: [3, 0], w2: [3, 3], w3: [0, 3] },
  items: [
    { kind: 'region', id: 'two', points: ['s0', 's1', 's2', 's3'], tone: 'adj', shade: 0.45 },
    { kind: 'region', id: 'three', points: ['w0', 'w1', 'w2', 'w3'], tone: 'opp', shade: 0.3 },
  ],
};

/** On a 3 × 2 grid, the rectangle fixed by the vertical lines x = 1 and x = 3 and the horizontal lines y = 0 and y = 1. */
const pick: Part = {
  points: { v1a: [1, 0], v1b: [1, 2], v3a: [3, 0], v3b: [3, 2], h0a: [0, 0], h0b: [3, 0], h1a: [0, 1], h1b: [3, 1], p0: [1, 0], p1: [3, 0], p2: [3, 1], p3: [1, 1] },
  items: [
    { kind: 'region', id: 'rect', points: ['p0', 'p1', 'p2', 'p3'], tone: 'good', shade: 0.4 },
    { kind: 'line', id: 'v1', from: 'v1a', to: 'v1b', tone: 'opp', weight: 6, group: 'vertical' },
    { kind: 'line', id: 'v3', from: 'v3a', to: 'v3b', tone: 'opp', weight: 6, group: 'vertical' },
    { kind: 'line', id: 'h0', from: 'h0a', to: 'h0b', tone: 'adj', weight: 6, group: 'horizontal' },
    { kind: 'line', id: 'h1', from: 'h1a', to: 'h1b', tone: 'adj', weight: 6, group: 'horizontal' },
  ],
};

const video: Explainer = {
  id: 'm103-6-4',
  lessonId: 'm103-6-4',
  title: 'Spatial Puzzles, Part 1: Counting Squares and Rectangles',
  thumbnailTitle: 'Counting Squares',
  thumbnail: 'g',
  summary: 'Systematic counting: sorting by size to count every square in a grid (14 in a 3 × 3 grid, and the pattern of square numbers), and counting rectangles by choosing two vertical and two horizontal grid lines. Part 2 covers the painted cube and dice puzzles.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 6.4 · Part 1', title: 'Counting Squares and Rectangles', subtitle: 'Count every one exactly once' }],
      lines: [
        { say: 'How many squares are in a three-by-three grid? If you said nine, you missed some. Puzzles like this train the same skill a tradesperson uses to picture how parts fit together.', show: 'title' },
        { say: 'In this video, you will count squares and rectangles systematically, so that nothing is missed or counted twice.' },
      ],
    },
    {
      chapter: 'Systematic counting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Systematic counting', md: 'Following a plan, such as sorting by size or by position, so that nothing is missed and nothing is counted twice.' },
        { kind: 'bullets', id: 'b', items: ['Start with a smaller version and look for a pattern.', 'Sort what you count into groups.', 'Record the groups in a table, and check that they add to the total.'] },
      ],
      lines: [
        { say: 'Systematic counting means following a plan, such as sorting by size or by position, so that nothing is missed and nothing is counted twice.', show: 'def' },
        { say: 'Start with a smaller version of the puzzle, and look for a pattern.', show: 'b.0' },
        { say: 'Sort what you are counting into groups, such as by size.', show: 'b.1' },
        { say: 'And record your counts in a table, then check that the groups add up to the total.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Squares in a grid',
      layout: 'split',
      leftWidth: 440,
      left: [figure('g', [tiles({ cols: 3, rows: 3 }), bigger])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 \\times 1: \\; 3 \\times 3 = 9', '2 \\times 2: \\; 2 \\times 2 = 4', '3 \\times 3: \\; 1', '9 + 4 + 1 = 14'] }],
      lines: [
        { say: 'Count all the squares in a three-by-three grid. Sort them by size.', show: ['g.outline', 'g.grid'] },
        { say: 'One-by-one squares: three across and three down, so nine.', show: ['g.tile', 'm.0'], focus: ['g.tile', 'm.0'] },
        { say: 'Two-by-two squares: each one fits in two positions across, and two down. So there are four.', show: ['g.two', 'm.1'], hide: 'g.tile', focus: ['g.two', 'm.1'] },
        { say: 'Three-by-three: just one, the whole grid.', show: ['g.three', 'm.2'], hide: 'g.two', focus: ['g.three', 'm.2'] },
        { say: 'So there are nine plus four plus one: fourteen squares.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The pattern',
      layout: 'split',
      leftWidth: 520,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['Grid', 'Squares'],
          rows: [
            ['$1 \\times 1$', '$1$'],
            ['$2 \\times 2$', '$1 + 4 = 5$'],
            ['$3 \\times 3$', '$5 + 9 = 14$'],
            ['$4 \\times 4$', '$14 + 16 = 30$'],
            ['$5 \\times 5$', '$30 + 25 = 55$'],
          ],
        },
      ],
      right: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the bigger squares', md: 'Counting only the small squares gives $9$ for a $3 \\times 3$ grid. Work through every size, up to the whole grid.' }],
      lines: [
        { say: 'Look for the pattern. A one-by-one grid has one square, and a two-by-two grid has one plus four: five.', show: ['t.0', 't.1'] },
        { say: 'Each bigger grid adds the next square number. Three by three: five plus nine, fourteen.', show: 't.2', focus: 't.2' },
        { say: 'Four by four: fourteen plus sixteen, thirty. And five by five: thirty plus 25, 55.', show: ['t.3', 't.4'], focus: ['t.3', 't.4'] },
        { say: 'The most common mistake is to count only the small squares. Always work through every size, from one by one up to the whole grid.', show: 'oops' },
      ],
    },
    {
      chapter: 'Counting rectangles',
      layout: 'split',
      leftWidth: 460,
      left: [figure('r', [tiles({ name: 'r', cols: 3, rows: 2 }), pick])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\text{ vertical lines: } 6 \\text{ pairs}', '3 \\text{ horizontal lines: } 3 \\text{ pairs}', '6 \\times 3 = 18 \\text{ rectangles}'] }],
      lines: [
        { say: 'To count rectangles, notice that every rectangle is fixed by two vertical grid lines, and two horizontal grid lines.', show: ['r.r-outline', 'r.r-grid', 'r.vertical', 'r.horizontal', 'r.rect'], focus: 'r.rect' },
        { say: 'This two-by-three grid has four vertical lines. You can choose a pair in six ways: the first and second, first and third, first and fourth, second and third, second and fourth, and third and fourth.', show: 'm.0', focus: ['r.vertical', 'm.0'] },
        { say: 'It has three horizontal lines, so three ways to choose a pair.', show: 'm.1', focus: ['r.horizontal', 'm.1'] },
        { say: 'Each choice of vertical pair goes with each horizontal pair, so there are six times three: eighteen rectangles.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many squares, of all sizes, are in a $4 \\times 4$ grid?',
          choices: ['$30$', '$16$', '$25$', '$20$'],
          answer: 0,
          working: '$16 + 9 + 4 + 1 = 30$ squares: sixteen $1 \\times 1$, nine $2 \\times 2$, four $3 \\times 3$ and one $4 \\times 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many squares, of all sizes, are in a four-by-four grid? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Sixteen small squares, nine two-by-two, four three-by-three and one four-by-four: thirty. B counts only the small squares.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Count systematically: sort into groups, and check the total.', 'Squares in an $n \\times n$ grid: $1^2 + 2^2 + \\dots + n^2$.', 'Rectangles: pairs of vertical lines × pairs of horizontal lines.'] }],
      lines: [
        { say: 'Let’s sum up. Count systematically: sort into groups, record them, and check the total.', show: 'sum.0' },
        { say: 'For the squares in an n by n grid, add the square numbers: one squared, plus two squared, and so on, up to n squared.', show: 'sum.1' },
        { say: 'And for rectangles, multiply the pairs of vertical lines by the pairs of horizontal lines. In part two, we solve cube and dice puzzles. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
