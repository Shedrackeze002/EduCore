import type { Explainer } from '@/video/script.ts';
import { realNumbers } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-3-3',
  lessonId: 'm10c-3-3',
  title: 'The Real Number System, Part 1: Rational and Irrational Numbers',
  thumbnailTitle: 'The Real Number System',
  thumbnail: 'sets',
  summary: 'Rational numbers (fractions of integers, whose decimals terminate or repeat), irrational numbers (whose decimals never do), and how the natural, whole, integer, rational and irrational numbers fit together into the real numbers. Part 2 covers radicals, estimating and ordering.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 3.3 · Part 1', title: 'Rational and Irrational Numbers', subtitle: 'And how all numbers fit together' }],
      lines: [
        { say: 'Some numbers, like three quarters, or 0.6 repeating, can be written as fractions. Others, like the square root of two, or pi, cannot.', show: 'title' },
        { say: 'In this video, you will learn to tell rational and irrational numbers apart, and see how every number you know fits into the real number system.' },
      ],
    },
    {
      chapter: 'Rational numbers',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'math', id: 'm', lines: ['\\tfrac34 = 0.75', '\\tfrac23 = 0.\\overline{6}', '-5 = \\tfrac{-5}{1}'] }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rational number', md: 'A number that can be written as $\\dfrac{a}{b}$, where $a$ and $b$ are integers and $b \\neq 0$.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'As a decimal', md: 'A rational number’s decimal **terminates** (stops) or **repeats**.' },
      ],
      lines: [
        { say: 'A rational number can be written as a fraction, "a" over b, where "a" and b are integers, and b is not zero.', show: 'def' },
        { say: 'Three quarters is rational. As a decimal it is 0.75, which terminates: it stops.', show: 'm.0', focus: 'm.0' },
        { say: 'Two thirds is 0.6 repeating. Its decimal goes on forever, but it repeats, so it is rational too.', show: 'm.1', focus: 'm.1' },
        { say: 'Every integer is rational as well: negative five is negative five over one. So a rational number’s decimal always terminates or repeats.', show: ['m.2', 'key'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Irrational numbers',
      layout: 'split',
      leftWidth: 500,
      left: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\sqrt{2} = 1.41421356\\ldots', '\\pi = 3.14159265\\ldots', '\\sqrt[3]{4} = 1.58740105\\ldots', '0.1010010001\\ldots'] }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Irrational number', md: 'A real number that **cannot** be written as a fraction of integers. Its decimal never terminates and never repeats.' }],
      lines: [
        { say: 'An irrational number cannot be written as a fraction of integers. Its decimal never stops, and never repeats.', show: 'def' },
        { say: 'The square root of any whole number that is not a perfect square is irrational, like the square root of two.', show: 'm.0', focus: 'm.0' },
        { say: 'So is pi, and so is the cube root of any number that is not a perfect cube, like the cube root of four.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'A decimal with a pattern that never repeats exactly is irrational too. In this one, each one has one more zero before it.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Simplify first',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\sqrt{49} = 7', '\\sqrt{\\tfrac{9}{16}} = \\tfrac34', '\\sqrt{20} = 4.4721\\ldots'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Simplify before you classify', md: 'A root sign does not make a number irrational. Check for a perfect square (or cube) first.' },
      ],
      lines: [
        { say: 'Careful: a square root sign does not make a number irrational. The square root of 49 is seven, which is rational.', show: 'm.0', focus: 'm.0' },
        { say: 'The square root of nine sixteenths is three quarters, also rational.', show: 'm.1', focus: 'm.1' },
        { say: 'But twenty is not a perfect square, so the square root of twenty is irrational. Always check for a perfect square, or a perfect cube, first.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'The real number system',
      layout: 'center',
      main: [figure('sets', [realNumbers()], 520)],
      lines: [
        { say: 'Now let’s see how all these numbers fit together. The natural numbers are the counting numbers: one, two, three, and so on.', show: ['sets.N', 'sets.N-ex'], focus: 'sets.N' },
        { say: 'Add zero, and you have the whole numbers.', show: ['sets.W', 'sets.W-ex'], focus: 'sets.W' },
        { say: 'Add the negatives, and you have the integers.', show: ['sets.I', 'sets.I-ex'], focus: 'sets.I' },
        { say: 'Every integer is rational, and so is every fraction, and every decimal that terminates or repeats.', show: ['sets.Q', 'sets.Q-ex'], focus: 'sets.Q' },
        { say: 'The irrational numbers sit beside the rational numbers. They do not overlap: every number is one or the other.', show: ['sets.Qbar', 'sets.Qbar-ex'], focus: 'sets.Qbar' },
        { say: 'Together, the rational and irrational numbers make up the real numbers.', show: 'sets.R', focus: 'sets.R' },
      ],
    },
    {
      chapter: 'Classifying a number',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['-\\sqrt{25} = -5'] },
        figure('sets', [realNumbers({ examples: { N: [], W: [], I: ['-\\sqrt{25}'], Q: [], Qbar: [] }, widths: { I: 2.4 } })], 470),
      ],
      lines: [
        { say: 'To which sets does the opposite of the square root of 25 belong? Simplify first: the square root of 25 is five, so this is negative five.', show: ['m.0', 'sets.R', 'sets.Q', 'sets.Qbar', 'sets.I', 'sets.W', 'sets.N'], focus: 'm.0' },
        { say: 'Negative five is an integer.', show: 'sets.I-ex', focus: ['sets.I-ex', 'sets.I'] },
        { say: 'The integers are inside the rational numbers, which are inside the real numbers, so negative five belongs to all three: the integers, the rational numbers and the real numbers.', focus: ['sets.I', 'sets.Q', 'sets.R'] },
        { say: 'But it is not a natural or whole number, because it is negative.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which number is irrational?',
          choices: ['$\\sqrt{12}$', '$\\sqrt{\\tfrac{4}{9}}$', '$0.\\overline{3}$', '$\\sqrt[3]{-8}$'],
          answer: 0,
          working: '$12$ is not a perfect square, so $\\sqrt{12} = 3.4641\\ldots$ never terminates or repeats. The others are $\\tfrac23$, $\\tfrac13$ and $-2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Which of these numbers is irrational? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve is not a perfect square, so the square root of twelve is irrational. B is two thirds, C is one third, and D is negative two: all rational.', show: 'q.answer' },
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
            'Rational: can be written as $\\tfrac{a}{b}$; its decimal terminates or repeats.',
            'Irrational: cannot; its decimal never terminates or repeats.',
            '$\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{I} \\subset \\mathbb{Q}$, and $\\mathbb{Q}$ and $\\overline{\\mathbb{Q}}$ together make $\\mathbb{R}$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A rational number can be written as a fraction of integers, and its decimal terminates or repeats.", show: 'sum.0' },
        { say: 'An irrational number cannot, and its decimal never terminates or repeats.', show: 'sum.1' },
        { say: 'The natural numbers sit inside the whole numbers, inside the integers, inside the rational numbers. With the irrational numbers, they make the real numbers. In part two, we estimate and order irrational numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
