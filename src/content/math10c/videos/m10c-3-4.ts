import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-4',
  lessonId: 'm10c-3-4',
  title: 'Mixed and Entire Radicals, Part 1: Simplifying Radicals',
  thumbnailTitle: 'Simplifying Radicals',
  thumbnail: 'sq',
  summary: 'The multiplication property of radicals, why the square root of 72 equals six root two, and writing square roots and cube roots as mixed radicals in simplest form, using the largest perfect square or cube factor, or prime factors. Part 2 goes the other way and compares radicals.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.4 · Part 1', title: 'Simplifying Radicals', subtitle: 'From entire to mixed radicals' }],
      lines: [
        { say: 'The square root of 72 and six root two are the same number, written two different ways.', show: 'title' },
        { say: 'In this video, you will learn the multiplication property of radicals, and use it to write radicals in simplest form. In part two, we go the other way, and compare radicals.' },
      ],
    },
    {
      chapter: 'The multiplication property',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\sqrt{4 \\times 9} = \\sqrt{36} = 6', '\\sqrt{4} \\times \\sqrt{9} = 2 \\times 3 = 6', '\\sqrt[n]{ab} = \\sqrt[n]{a} \\times \\sqrt[n]{b}'] },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Multiplication property', md: 'The root of a product is the product of the roots, for any index (with $a, b \\ge 0$ for an even index).' },
      ],
      lines: [
        { say: 'The square root of four times nine is the square root of 36, which is six.', show: 'm.0', focus: 'm.0' },
        { say: 'And the square root of four, times the square root of nine, is two times three: also six.', show: 'm.1', focus: 'm.1' },
        { say: 'This is the multiplication property of radicals. The root of a product is the product of the roots, for any index, as long as the numbers under an even root are not negative.', show: ['m.2', 'note'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Entire and mixed radicals',
      layout: 'split',
      left: [figure('sq', [tiles({ cols: 6, rows: 6, labels: { height: '\\sqrt{72}', width: '6\\sqrt{2}', side: '2' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Entire and mixed radicals', md: 'An **entire radical** has nothing outside the root sign, like $\\sqrt{72}$. A **mixed radical** has a number in front, like $6\\sqrt{2}$.' },
        { kind: 'math', id: 'm', lines: ['\\sqrt{72} = 6\\sqrt{2}'] },
      ],
      lines: [
        { say: 'A radical with nothing outside the root sign, like root 72, is an entire radical. One with a number in front, like six root two, is a mixed radical.', show: 'def' },
        { say: 'Here is why they are equal. This square has an area of 72, so its side is root 72.', show: ['sq.outline', 'sq.height'], focus: 'sq.height' },
        { say: 'Cut it into 36 small squares. Each one has an area of two, so its side is root two.', show: ['sq.grid', 'sq.tile', 'sq.side'], focus: 'sq.tile' },
        { say: 'Six of those small sides make the whole side: six root two. So root 72 equals six root two.', show: ['sq.width', 'm.0'], focus: ['sq.width', 'm.0'] },
      ],
    },
    {
      chapter: 'Simplifying a square root',
      layout: 'split',
      leftWidth: 520,
      left: [
        { kind: 'text', id: 'q', md: 'Write $\\sqrt{72}$ as a mixed radical in simplest form.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{perfect squares: } 4,\\ 9,\\ 36', '\\sqrt{72} = \\sqrt{36 \\times 2}', '= \\sqrt{36} \\times \\sqrt{2}', '= 6\\sqrt{2}'] },
      ],
      right: [{ kind: 'callout', id: 'how', tone: 'key', title: 'Entire to mixed', md: 'Find the **largest** perfect square factor of the radicand (or perfect cube, for a cube root), split the radical, and take the root of that factor.' }],
      lines: [
        { say: 'To simplify a radical, find the largest perfect square factor of the radicand. Write the square root of 72 in simplest form.', show: ['q', 'how'] },
        { say: 'The perfect squares that divide 72 are four, nine and 36. The largest is 36.', show: 'm.0', focus: 'm.0' },
        { say: 'So 72 is 36 times two. Split the radical: the square root of 36, times the square root of two.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The square root of 36 is six, so the answer is six root two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using prime factors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\sqrt{180} = \\sqrt{\\adj{2^2} \\times \\opp{3^2} \\times 5}', '= \\adj{2} \\times \\opp{3} \\times \\sqrt{5}', '= 6\\sqrt{5}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Pairs come out', md: 'In a square root, each **pair** of equal primes comes out as one of them. In a cube root, each group of **three** does.' },
      ],
      lines: [
        { say: 'If the largest perfect square is hard to see, use prime factors. Simplify the square root of 180. 180 is 2 squared times 3 squared times 5.', show: 'm.0', focus: 'm.0' },
        { say: 'Each pair of equal primes comes out of the square root as one of them: a two, and a three. The five has no partner, so it stays inside.', show: ['m.1', 'tip'], focus: 'm.1' },
        { say: 'Two times three is six, so the square root of 180 is six root five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A cube root',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['\\sqrt[3]{54} = \\sqrt[3]{27 \\times 2}', '= \\sqrt[3]{27} \\times \\sqrt[3]{2}', '= 3\\sqrt[3]{2}'] }],
      lines: [
        { say: 'For a cube root, look for the largest perfect cube factor instead. Simplify the cube root of 54.' },
        { say: 'The perfect cubes are one, eight, 27, 64, and so on. 27 divides 54: 54 is 27 times two.', show: 'm.0', focus: 'm.0' },
        { say: 'Split the radical: the cube root of 27, times the cube root of two.', show: 'm.1', focus: 'm.1' },
        { say: 'The cube root of 27 is three, so the answer is three times the cube root of two.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Not simplified yet',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\sqrt{72} = \\sqrt{4 \\times 18} = 2\\sqrt{18}', '= 2\\sqrt{9 \\times 2} = 2 \\times 3\\sqrt{2} = 6\\sqrt{2}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Simplest form', md: 'The radicand has no perfect square factor other than 1 (no perfect cube factor, for a cube root).' },
      ],
      lines: [
        { say: 'What if you do not use the largest perfect square? 72 is also four times eighteen, so root 72 is two root eighteen. That is true, but it is not simplified.', show: 'm.0', focus: 'm.0' },
        { say: 'Eighteen still has a perfect square factor, nine. Keep going: two times three root two, which is six root two.', show: 'm.1', focus: 'm.1' },
        { say: 'A radical is in simplest form when its radicand has no perfect square factor other than one.', show: 'def' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $\\sqrt{48}$ in simplest form.',
          choices: ['$4\\sqrt{3}$', '$2\\sqrt{12}$', '$16\\sqrt{3}$', '$3\\sqrt{4}$'],
          answer: 0,
          working: 'The largest perfect square factor of $48$ is $16$: $\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write the square root of 48 in simplest form. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The largest perfect square factor of 48 is sixteen, so root 48 is four root three. B is equal, but not simplified, because twelve still has a factor of four.', show: 'q.answer' },
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
            '$\\sqrt[n]{ab} = \\sqrt[n]{a} \\times \\sqrt[n]{b}$.',
            'To simplify, take out the **largest** perfect square (or cube) factor.',
            'With prime factors, each pair comes out of a square root, and each group of three out of a cube root.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The root of a product is the product of the roots.", show: 'sum.0' },
        { say: 'To simplify a radical, take out the largest perfect square factor, or perfect cube factor for a cube root.', show: 'sum.1' },
        { say: 'With prime factors, each pair comes out of a square root, and each group of three comes out of a cube root. In part two, we turn mixed radicals back into entire radicals, and compare them. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
