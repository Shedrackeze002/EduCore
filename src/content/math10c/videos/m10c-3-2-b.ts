import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-2-b',
  lessonId: 'm10c-3-2',
  title: 'Squares, Cubes and Their Roots, Part 2: Square Roots and Cube Roots',
  thumbnailTitle: 'Square Roots and Cube Roots',
  thumbnail: 'sq',
  summary: 'Square roots and cube roots from prime factors, by splitting the primes into two or three equal groups or by dividing the exponents, roots of negative numbers, and finding a cube’s volume from its surface area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.2 · Part 2', title: 'Square Roots and Cube Roots', subtitle: 'Split the primes into equal groups' }],
      lines: [
        { say: 'A square has an area of 1,764 square centimetres. How long is each side? You need its square root.', show: 'title' },
        { say: 'In this video, you will find square roots and cube roots from prime factors, and use them to solve problems.' },
      ],
    },
    {
      chapter: 'Square roots',
      layout: 'split',
      leftWidth: 460,
      left: [figure('sq', [tiles({ cols: 1, rows: 1, size: 6, labels: { width: 's', area: '1764\\text{ cm}^2' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1764 = 2^2 \\times 3^2 \\times 7^2', '= \\adj{(2 \\times 3 \\times 7)} \\times \\opp{(2 \\times 3 \\times 7)}', '\\sqrt{1764} = 2 \\times 3 \\times 7 = 42', 's = 42\\text{ cm}'] },
      ],
      lines: [
        { say: 'A square root undoes squaring. The square root of 1,764 is the number that, times itself, makes 1,764. It is the side of a square with that area.', show: ['sq.outline', 'sq.area', 'sq.width'] },
        { say: 'Start with the prime factorization: 2 squared times 3 squared times 7 squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Split the primes into two equal groups: two times three times seven, twice.', show: 'm.1', focus: 'm.1' },
        { say: 'Each group is the square root. Two times three times seven is 42,', show: 'm.2', focus: 'm.2' },
        { say: 'so each side of the square is 42 centimetres.', show: 'm.3', focus: ['m.3', 'sq.width'] },
      ],
    },
    {
      chapter: 'Cube roots',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cube', [box({ l: 6, w: 6, h: 6, labels: { l: 's' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2744 = 2^3 \\times 7^3', '= \\adj{(2 \\times 7)} \\times \\opp{(2 \\times 7)} \\times \\good{(2 \\times 7)}', '\\sqrt[3]{2744} = 2 \\times 7 = 14'] },
      ],
      lines: [
        { say: 'A cube root undoes cubing. The cube root of 2,744 is the number that, used as a factor three times, makes 2,744: the edge of a cube with that volume.', show: ['cube.shape', 'cube.l'] },
        { say: '2,744 is 2 cubed times 7 cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Split the primes into three equal groups. Each group is two times seven,', show: 'm.1', focus: 'm.1' },
        { say: 'so the cube root is fourteen.', show: 'm.2', focus: ['m.2', 'cube.l'] },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\sqrt{2^4 \\times 3^2} = 2^2 \\times 3 = 12', '\\sqrt[3]{2^6 \\times 5^3} = 2^2 \\times 5 = 20'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Divide the exponents', md: 'Square root: **halve** every exponent. Cube root: divide every exponent by **3**.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not half the number', md: '$\\sqrt{64} = 8$, not $32$. Halve the exponents, not the number: $\\sqrt{2^6} = 2^3 = 8$.' },
      ],
      lines: [
        { say: 'There is a shortcut. For a square root, halve every exponent. The square root of 2 to the fourth times 3 squared is 2 squared times 3, which is twelve.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'For a cube root, divide every exponent by three. The cube root of 2 to the sixth times 5 cubed is 2 squared times 5, which is twenty.', show: 'm.1', focus: 'm.1' },
        { say: 'Careful: a square root is not half the number. The square root of 64 is eight, not 32. Halve the exponents, not the number.', show: 'oops' },
      ],
    },
    {
      chapter: 'Negative numbers',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['(-4)^3 = -64, \\text{ so } \\sqrt[3]{-64} = -4', '\\sqrt{-64} \\text{ is not a real number}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Roots of negative numbers', md: 'The cube root of a negative number is negative. No real number squared is negative, so the square root of a negative number is not real.' },
      ],
      lines: [
        { say: 'Can you take the root of a negative number? Negative four, cubed, is negative 64, so the cube root of negative 64 is negative four.', show: 'm.0', focus: 'm.0' },
        { say: 'But any real number times itself is positive, or zero. No real number squared is negative, so the square root of negative 64 is not a real number.', show: ['m.1', 'key'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'From surface area to volume',
      layout: 'split',
      leftWidth: 460,
      left: [figure('cube', [box({ l: 7, w: 7, h: 7, labels: { l: 's' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A cube has a surface area of $294\\text{ cm}^2$. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['294 \\div 6 = 49\\text{ cm}^2', 's = \\sqrt{49} = 7\\text{ cm}', 'V = 7^3 = 343\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A cube has a surface area of 294 square centimetres. Find its volume.', show: ['cube.shape', 'q'] },
        { say: 'A cube has six equal square faces, so each face is 294 divided by six: 49 square centimetres.', show: ['m.0', 'cube.front-face', 'cube.top-face', 'cube.side-face'], focus: ['m.0', 'cube.front-face'] },
        { say: 'Each face is a square, so the edge is the square root of 49: seven centimetres.', show: ['m.1', 'cube.l'], focus: ['m.1', 'cube.l'] },
        { say: 'The volume is seven cubed: 343 cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cube-shaped box has a volume of $3375\\text{ cm}^3$. What is its edge length?',
          choices: ['$15\\text{ cm}$', '$58.1\\text{ cm}$', '$25\\text{ cm}$', '$1125\\text{ cm}$'],
          answer: 0,
          working: '$3375 = 3^3 \\times 5^3$, so $s = \\sqrt[3]{3375} = 3 \\times 5 = 15\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cube-shaped box has a volume of 3,375 cubic centimetres. What is its edge length? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 3,375 is 3 cubed times 5 cubed, so its cube root is three times five: fifteen centimetres. B is the square root, and D divides by three instead of taking the cube root.', show: 'q.answer' },
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
            'Square root: split the primes into two equal groups, or halve the exponents.',
            'Cube root: split them into three equal groups, or divide the exponents by 3.',
            'The cube root of a negative number is negative; the square root of a negative number is not real.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. To find a square root, split the prime factors into two equal groups, or halve the exponents.", show: 'sum.0' },
        { say: 'To find a cube root, split them into three equal groups, or divide the exponents by three.', show: 'sum.1' },
        { say: 'The cube root of a negative number is negative, but the square root of a negative number is not real. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
