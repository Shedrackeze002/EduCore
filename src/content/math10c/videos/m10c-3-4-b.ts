import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-4-b',
  lessonId: 'm10c-3-4',
  title: 'Mixed and Entire Radicals, Part 2: Entire Radicals and Comparing',
  thumbnailTitle: 'Comparing Radicals',
  thumbnail: 'line',
  summary: 'Writing mixed radicals as entire radicals by bringing the coefficient inside (squared for a square root, cubed for a cube root), and comparing and ordering radicals by their radicands.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.4 · Part 2', title: 'Comparing Radicals', subtitle: 'Bring the number inside' }],
      lines: [
        { say: 'Which is bigger: three root five, or two root eleven? As they are written, it is hard to tell.', show: 'title' },
        { say: 'In this video, you will write mixed radicals as entire radicals, and use that to compare and order them.' },
      ],
    },
    {
      chapter: 'Mixed to entire',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4\\sqrt{3} = \\sqrt{16} \\times \\sqrt{3}', '= \\sqrt{16 \\times 3} = \\sqrt{48}'] },
        { kind: 'callout', id: 'how', tone: 'key', title: 'Mixed to entire', md: 'Write the number in front as a radical with the same index, then multiply the radicands.' },
      ],
      lines: [
        { say: 'To write four root three as an entire radical, write the four as a square root. Four is the square root of sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply the radicands: the square root of sixteen times three, which is the square root of 48.', show: 'm.1', focus: 'm.1' },
        { say: 'In other words, square the number in front, and multiply it by the radicand.', show: 'how' },
      ],
    },
    {
      chapter: 'A cube root',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2\\sqrt[3]{5} = \\sqrt[3]{8} \\times \\sqrt[3]{5}', '= \\sqrt[3]{8 \\times 5} = \\sqrt[3]{40}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Match the index', md: 'For a cube root, **cube** the number in front: $2 = \\sqrt[3]{8}$, not $\\sqrt[3]{4}$.' },
      ],
      lines: [
        { say: 'For a cube root, write the number in front as a cube root. Two is the cube root of eight, because two cubed is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'So two times the cube root of five is the cube root of eight times five: the cube root of 40.', show: 'm.1', focus: 'm.1' },
        { say: 'Careful: for a cube root, cube the number in front. Squaring it would give the cube root of twenty, which is wrong.', show: 'oops' },
      ],
    },
    {
      chapter: 'Comparing radicals',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['3\\sqrt{5} = \\sqrt{9 \\times 5} = \\sqrt{45}', '2\\sqrt{11} = \\sqrt{4 \\times 11} = \\sqrt{44}', '\\sqrt{45} > \\sqrt{44}, \\text{ so } 3\\sqrt{5} > 2\\sqrt{11}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Compare radicands', md: 'With the same index, the larger radicand gives the larger number.' },
      ],
      lines: [
        { say: 'Now compare three root five and two root eleven. Write each one as an entire radical. Three root five is the square root of nine times five: root 45.', show: 'm.0', focus: 'm.0' },
        { say: 'Two root eleven is the square root of four times eleven: root 44.', show: 'm.1', focus: 'm.1' },
        { say: 'With the same index, the larger radicand gives the larger number. Root 45 is greater than root 44, so three root five is greater, just barely.', show: ['m.2', 'key'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Ordering radicals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Order from least to greatest: $2\\sqrt{7}$, $3\\sqrt{3}$, $\\sqrt{30}$, $4\\sqrt{2}$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2\\sqrt{7} = \\sqrt{28} \\qquad 3\\sqrt{3} = \\sqrt{27} \\qquad 4\\sqrt{2} = \\sqrt{32}', '3\\sqrt{3},\\ 2\\sqrt{7},\\ \\sqrt{30},\\ 4\\sqrt{2}'] },
        figure(
          'line',
          [
            numberLine({
              min: 5,
              max: 6,
              step: 0.1,
              every: 5,
              length: 14,
              points: [
                { id: 'a', value: Math.sqrt(27), tex: '3\\sqrt{3}', tone: 'adj' },
                { id: 'b', value: Math.sqrt(28), tex: '2\\sqrt{7}', tone: 'good', below: true },
                { id: 'c', value: Math.sqrt(30), tex: '\\sqrt{30}', tone: 'opp' },
                { id: 'd', value: Math.sqrt(32), tex: '4\\sqrt{2}', tone: 'hyp', below: true },
              ],
            }),
          ],
          220,
        ),
      ],
      lines: [
        { say: 'Order these from least to greatest: two root seven, three root three, root 30, and four root two.', show: 'q' },
        { say: 'Write them all as entire radicals. Two root seven is root 28, three root three is root 27, and four root two is root 32.', show: 'm.0', focus: 'm.0' },
        { say: 'Now compare the radicands: 27, 28, 30 and 32. On a number line, they all sit between five and six, in that order.', show: ['line.axis', 'line.a', 'line.b', 'line.c', 'line.d'] },
        { say: 'So the order is three root three, two root seven, root 30, then four root two.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is greater, $5\\sqrt{2}$ or $4\\sqrt{3}$?',
          choices: ['$5\\sqrt{2}$', '$4\\sqrt{3}$', 'They are equal.', 'You cannot tell without a calculator.'],
          answer: 0,
          working: '$5\\sqrt{2} = \\sqrt{25 \\times 2} = \\sqrt{50}$ and $4\\sqrt{3} = \\sqrt{16 \\times 3} = \\sqrt{48}$, so $5\\sqrt{2}$ is greater.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is greater, five root two, or four root three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five root two is the square root of 25 times two, root 50. Four root three is the square root of sixteen times three, root 48. 50 is larger, so five root two is greater.', show: 'q.answer' },
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
            'To make an entire radical, write the number in front as a radical with the same index, then multiply the radicands.',
            'Square the number for a square root; cube it for a cube root.',
            'Compare radicals by writing them as entire radicals with the same index.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. To make an entire radical, write the number in front as a radical with the same index, then multiply the radicands.", show: 'sum.0' },
        { say: 'That means squaring the number for a square root, and cubing it for a cube root.', show: 'sum.1' },
        { say: 'And to compare radicals, write them as entire radicals with the same index, and compare the radicands. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
