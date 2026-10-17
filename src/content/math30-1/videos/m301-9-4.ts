import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pascal } from './lib/m301-9-counting.ts';

const rows = (id: string, n: number) => Array.from({ length: n }, (_, k) => `${id}.row${k}`);

const video: Explainer = {
  id: 'm301-9-4',
  lessonId: 'm301-9-4',
  title: 'The Binomial Theorem, Part 1: Pascal’s Triangle',
  thumbnailTitle: 'Pascal’s Triangle',
  thumbnail: 'q',
  summary: 'Building Pascal’s triangle, where each entry is the sum of the two above it, its two patterns (each row is symmetric, and the row that begins 1, n adds to 2ⁿ), and writing the row after 1, 6, 15, 20, 15, 6, 1. Part 2 shows that the entries are combinations.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.4 · Part 1', title: 'Pascal’s Triangle', subtitle: 'Each number is the sum of the two above it' }],
      lines: [
        { say: 'Multiplying out two x minus three, to the power six, bracket by bracket, takes a page of algebra. The binomial theorem jumps straight to any term you want, and it grows out of a famous triangle of numbers.', show: 'title' },
        { say: 'In this video, you will build Pascal’s triangle, and find two of its patterns.' },
      ],
    },
    {
      chapter: 'Building the triangle',
      layout: 'split',
      leftWidth: 600,
      left: [figure('p', [pascal({ rows: 7, adds: [[2, 1], [3, 1], [3, 2], [4, 2]] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 + 1 = 2', '1 + 2 = 3, \\quad 2 + 1 = 3', '3 + 3 = 6'] }],
      lines: [
        { say: 'Start with a one at the top. The next row is one, one.', show: ['p.row0', 'p.row1'] },
        { say: 'Each row starts and ends with one, and every other number is the sum of the two numbers just above it. So the next row is one, then one plus one, which is two, then one.', show: ['p.row2', 'p.add2-1', 'm.0'], focus: ['p.add2-1', 'm.0'] },
        { say: 'The next row is one, three, three, one: one plus two is three, and two plus one is three.', show: ['p.row3', 'p.add3-1', 'p.add3-2', 'm.1'], focus: ['p.add3-1', 'p.add3-2', 'm.1'] },
        { say: 'Then one, four, six, four, one. The six is three plus three.', show: ['p.row4', 'p.add4-2', 'm.2'], focus: ['p.add4-2', 'm.2'] },
        { say: 'Keep going: one, five, ten, ten, five, one, and then one, six, fifteen, twenty, fifteen, six, one.', show: ['p.row5', 'p.row6'], focus: ['p.row5', 'p.row6'] },
        { say: 'This is Pascal’s triangle. We name a row by its first two numbers. For example, one, five, ten, ten, five, one is the row that begins one, five.', focus: 'p.row5' },
      ],
    },
    {
      chapter: 'Two patterns',
      layout: 'split',
      leftWidth: 680,
      left: [figure('q', [pascal({ rows: 7, sums: true })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1,\\ 4,\\ 6,\\ 4,\\ 1', '1,\\ 2,\\ 4,\\ 8,\\ 16,\\ \\ldots', '\\text{row } 1,\\ n\\text{: sum } 2^n'] }],
      lines: [
        { say: 'Two patterns are worth remembering. First, every row is symmetric: it reads the same from left to right as from right to left, like one, four, six, four, one.', show: [...rows('q', 7), 'm.0'], focus: ['q.row4', 'm.0'] },
        { say: 'Second, add the numbers in each row. The sums are one, two, four, eight, sixteen, and so on: each row adds to double the row above it.', show: ['q.sums', 'm.1'], focus: ['q.sums', 'm.1'] },
        { say: 'That is because every number is added into two numbers of the next row, once on its left and once on its right.' },
        { say: 'So the row that begins one, n adds to two to the power n. The row that begins one, six adds to two to the sixth, which is sixty-four.', show: 'm.2', focus: ['q.s6', 'q.row6', 'm.2'] },
      ],
    },
    {
      chapter: 'The next row',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'Write the row after $1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 + 6 = 7, \\quad 6 + 15 = 21, \\quad 15 + 20 = 35', '20 + 15 = 35, \\quad 15 + 6 = 21, \\quad 6 + 1 = 7', '1,\\ 7,\\ 21,\\ 35,\\ 35,\\ 21,\\ 7,\\ 1', '\\text{check: } 1 + 7 + 21 + 35 + 35 + 21 + 7 + 1 = 128 = 2^7'] },
      ],
      lines: [
        { say: 'Write the row after one, six, fifteen, twenty, fifteen, six, one.', show: 'p' },
        { say: 'Start and end with one. Then add neighbours: one plus six is seven, six plus fifteen is twenty-one, and fifteen plus twenty is thirty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'The rest mirror these: twenty plus fifteen is thirty-five, fifteen plus six is twenty-one, and six plus one is seven.', show: 'm.1', focus: 'm.1' },
        { say: 'So the row is one, seven, twenty-one, thirty-five, thirty-five, twenty-one, seven, one. It is the row that begins one, seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with the sum pattern: the numbers add to 128, which is two to the seventh.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The row of Pascal’s triangle that begins $1,\\ 7$ is $1,\\ 7,\\ 21,\\ 35,\\ 35,\\ 21,\\ 7,\\ 1$. What is the 5th number in the row that begins $1,\\ 8$?',
          choices: ['$70$', '$56$', '$35$', '$28$'],
          answer: 0,
          working: 'Add neighbours: $1,\\ 8,\\ 28,\\ 56,\\ 70,\\ \\ldots$ The 5th number is $35 + 35 = 70$.',
        },
      ],
      lines: [
        { say: 'Your turn. The row of Pascal’s triangle that begins one, seven is one, seven, twenty-one, thirty-five, thirty-five, twenty-one, seven, one. What is the fifth number in the row that begins one, eight? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, seventy. Add neighbours: one, eight, twenty-eight, fifty-six, and then thirty-five plus thirty-five, which is seventy. Choice B, fifty-six, is the fourth number, not the fifth.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each row of Pascal’s triangle begins and ends with $1$; every other entry is the sum of the two above it.', 'Every row is symmetric.', 'The row that begins $1,\\ n$ adds to $2^n$.'] }],
      lines: [
        { say: 'Let’s sum up. Each row of Pascal’s triangle begins and ends with one, and every other entry is the sum of the two entries above it.', show: 'sum.0' },
        { say: 'Every row is symmetric.', show: 'sum.1' },
        { say: 'And the row that begins one, n adds to two to the power n. In part two, we see that the numbers in Pascal’s triangle are combinations, and use them to count routes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
