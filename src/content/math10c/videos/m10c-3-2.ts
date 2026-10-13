import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-2',
  lessonId: 'm10c-3-2',
  title: 'Squares, Cubes and Their Roots, Part 1: Perfect Squares and Perfect Cubes',
  thumbnailTitle: 'Perfect Squares and Cubes',
  thumbnail: 'cube',
  summary: 'What makes a number a perfect square or a perfect cube, seen as a square of unit squares and a cube of unit cubes, and how to tell from the exponents of its prime factorization. Part 2 finds square roots and cube roots.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.2 · Part 1', title: 'Perfect Squares and Cubes', subtitle: 'Read them from the prime factors' }],
      lines: [
        { say: 'Is 1,764 a perfect square? Is 1,728 a perfect cube? You can answer both without a calculator, once you know their prime factors.', show: 'title' },
        { say: 'In this video, you will learn what makes a number a perfect square or a perfect cube. In part two, we find square roots and cube roots.' },
      ],
    },
    {
      chapter: 'Perfect squares',
      layout: 'split',
      left: [figure('sq', [tiles({ cols: 12, rows: 12, labels: { width: '12', height: '12' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perfect square', md: 'The square of a whole number, like $144 = 12^2$.' },
        { kind: 'math', id: 'm', lines: ['144 = 12 \\times 12 = 12^2'] },
      ],
      lines: [
        { say: 'A perfect square is the square of a whole number. 144 is a perfect square, because it is twelve times twelve, or twelve squared.', show: ['def', 'm.0'] },
        { say: 'Picture 144 unit squares. They fit together into a square with twelve on each side. That is where the name comes from.', show: ['sq.outline', 'sq.grid', 'sq.width', 'sq.height'], focus: ['sq.width', 'sq.height'] },
      ],
    },
    {
      chapter: 'Perfect cubes',
      layout: 'split',
      left: [figure('cube', [box({ l: 6, w: 6, h: 6, cells: 6, labels: { l: '6', w: '6', h: '6' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Perfect cube', md: 'The cube of a whole number, like $216 = 6^3$.' },
        { kind: 'math', id: 'm', lines: ['216 = 6 \\times 6 \\times 6 = 6^3'] },
      ],
      lines: [
        { say: 'A perfect cube is the cube of a whole number. 216 is six times six times six, or six cubed, so it is a perfect cube.', show: ['def', 'm.0'] },
        { say: 'Picture 216 unit cubes. They stack into a cube with six on each edge.', show: ['cube.shape', 'cube.cells', 'cube.l', 'cube.w', 'cube.h'], focus: ['cube.l', 'cube.w', 'cube.h'] },
      ],
    },
    {
      chapter: 'Look at the exponents',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['144 = 2^4 \\times 3^2 = \\adj{(2^2 \\times 3)} \\times \\opp{(2^2 \\times 3)}', '216 = 2^3 \\times 3^3 = \\adj{(2 \\times 3)} \\times \\opp{(2 \\times 3)} \\times \\good{(2 \\times 3)}', '64 = 2^6 = 8^2 = 4^3'] },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Check the exponents', md: 'Perfect square: every exponent is **even**. Perfect cube: every exponent is divisible by **3**.' },
      ],
      lines: [
        { say: 'Now look at their prime factorizations. 144 is 2 to the fourth times 3 squared. Every exponent is even.', show: 'm.0', focus: 'm.0' },
        { say: 'That is no accident. A perfect square splits into two equal groups of primes, so every exponent must be even.' },
        { say: '216 is 2 cubed times 3 cubed. A perfect cube splits into three equal groups, so every exponent is divisible by three.', show: 'm.1', focus: 'm.1' },
        { say: 'And 64 is 2 to the sixth. Six is even, and divisible by three, so 64 is both: eight squared, and four cubed.', show: ['m.2', 'rule'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Square, cube, both or neither?',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Number', 'Prime factors', 'Type'],
          rows: [
            ['$1728$', '$2^6 \\times 3^3$', 'perfect cube, $12^3$'],
            ['$900$', '$2^2 \\times 3^2 \\times 5^2$', 'perfect square, $30^2$'],
            ['$200$', '$2^3 \\times 5^2$', 'neither'],
          ],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not by the last digit', md: 'Every perfect square ends in 0, 1, 4, 5, 6 or 9, but so do many other numbers: $26$ is not a perfect square. Use the prime factors.' },
      ],
      lines: [
        { say: 'Is 1,728 a perfect square, a perfect cube, both or neither? It is 2 to the sixth times 3 cubed. Both exponents are divisible by three, so it is a perfect cube, twelve cubed. But three is odd, so it is not a perfect square.', show: 't.0', focus: 't.0' },
        { say: '900 is 2 squared times 3 squared times 5 squared. Every exponent is even, so it is a perfect square, thirty squared. But two is not divisible by three, so it is not a cube.', show: 't.1', focus: 't.1' },
        { say: '200 is 2 cubed times 5 squared. Three is odd, and two is not divisible by three, so 200 is neither.', show: 't.2', focus: 't.2' },
        { say: 'Do not decide from the last digit. Every perfect square ends in zero, one, four, five, six or nine, but so do many other numbers. 26 ends in six, and it is not a perfect square.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which of these is a perfect cube?',
          choices: ['$2^3 \\times 5^3$', '$2^2 \\times 5^2$', '$2^3 \\times 5^2$', '$2^6 \\times 5$'],
          answer: 0,
          working: 'Every exponent in $2^3 \\times 5^3$ is divisible by 3: it is $(2 \\times 5)^3 = 10^3 = 1000$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these is a perfect cube? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Both exponents are three, so it is two times five, cubed: ten cubed, which is a thousand. B is a perfect square, C has an exponent of two, and in D, five has an exponent of one.', show: 'q.answer' },
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
            'A perfect square is the square of a whole number: every exponent in its prime factorization is even.',
            'A perfect cube is the cube of a whole number: every exponent is divisible by 3.',
            'Check the prime factors, not the last digit.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A perfect square is the square of a whole number, and every exponent in its prime factorization is even.", show: 'sum.0' },
        { say: 'A perfect cube is the cube of a whole number, and every exponent is divisible by three.', show: 'sum.1' },
        { say: 'So check the prime factors, not the last digit. In part two, we use them to find square roots and cube roots. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
