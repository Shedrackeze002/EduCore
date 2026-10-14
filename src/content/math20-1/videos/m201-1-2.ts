import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-1-2',
  lessonId: 'm201-1-2',
  title: 'Arithmetic Series, Part 1: Reverse and Add',
  thumbnailTitle: 'Arithmetic Series',
  summary: 'Series and partial sums, the reverse-and-add trick for 1 + 2 + … + 100, the two formulas for the sum of an arithmetic series, and when to use each. Part 2 finds the number of terms first and solves problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.2 · Part 1', title: 'Arithmetic Series', subtitle: 'Reverse and add' }],
      lines: [
        { say: 'A well-known story says that a young Carl Friedrich Gauss was told to add the whole numbers from one to 100, and finished in moments. His trick works for every arithmetic series.', show: 'title' },
        { say: 'In this video, you will see why the trick works, and use it to write two formulas for the sum of an arithmetic series.' },
      ],
    },
    {
      chapter: 'Partial sums',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Series and partial sum', md: 'A **series** is the sum of the terms of a sequence; an **arithmetic series** adds an arithmetic sequence. $S_n$ is the sum of the first $n$ terms.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['S_1 = 3,\\quad S_2 = 3 + 7 = 10,\\quad S_3 = 10 + 11 = 21', 'S_4 = 21 + 15 = 36,\\quad S_5 = 36 + 19 = 55'] },
      ],
      lines: [
        { say: 'A series is the sum of the terms of a sequence. If the terms form an arithmetic sequence, the sum is an arithmetic series.', show: 'def' },
        { say: 'S sub n is a partial sum: the sum of the first n terms. For three plus seven plus eleven, and so on, S sub one is three, S sub two is ten, and S sub three is 21.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep adding: S sub four is 36, and S sub five is 55. Adding term by term is fine for five terms, but not for fifty. We need a formula.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Reverse and add',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['', '1st', '2nd', '3rd', '⋯', '100th'], rows: [['$S$', '1', '2', '3', '⋯', '100'], ['$S$', '100', '99', '98', '⋯', '1'], ['$2S$', '[[good:101]]', '[[good:101]]', '[[good:101]]', '⋯', '[[good:101]]']] },
        { kind: 'math', id: 'm', size: 'md', lines: ['2S = 100(101),\\quad S = 5050'] },
      ],
      lines: [
        { say: 'Here is the trick. Write the sum of one to 100 forwards, and then backwards.', show: ['t.0', 't.1'] },
        { say: 'Now add the two lines column by column. One plus 100 is 101. Two plus 99 is 101. Every column adds to 101.', show: 't.2', focus: 't.2' },
        { say: 'There are 100 columns, so two S is 100 times 101, and S is 5,050.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'The formulas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['S_n = t_1 + (t_1 + d) + \\cdots + t_n', 'S_n = t_n + (t_n - d) + \\cdots + t_1', '2S_n = n(t_1 + t_n)', 'S_n = \\dfrac{n(t_1 + t_n)}{2} \\qquad S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which formula?', md: 'Know the last term? Use $\\dfrac{n(t_1 + t_n)}{2}$. Know $d$ but not the last term? Use $\\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$.' },
      ],
      lines: [
        { say: 'The same argument works for any arithmetic series. Forwards, each term goes up by d. Backwards, each term goes down by d.', show: ['m.0', 'm.1'] },
        { say: 'So every column adds to the same thing: t sub one plus t sub n. There are n columns, so two S sub n is n times t sub one plus t sub n.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide by two for the first formula. Then replace t sub n with t sub one plus n minus one times d for the second.', show: 'm.3', focus: 'm.3' },
        { say: 'Use the first formula when you know the last term. Use the second when you know the common difference, but not the last term.', show: 'tip' },
      ],
    },
    {
      chapter: 'Using a formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['t_1 = 3,\\quad d = 4,\\quad n = 20', 'S_{20} = \\dfrac{20}{2}\\left[2(3) + (20 - 1)(4)\\right]', '= 10(6 + 76) = 820'] }],
      lines: [
        { say: 'Find the sum of the first twenty terms of three plus seven plus eleven, and so on. t sub one is three, d is four, and n is twenty.', show: 'm.0', focus: 'm.0' },
        { say: 'We know d, but not the last term, so use the second formula: twenty over two, times two times three, plus nineteen times four.', show: 'm.1', focus: 'm.1' },
        { say: 'That is ten times six plus 76: ten times 82, which is 820.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the sum of the first $10$ terms of $2 + 5 + 8 + \\cdots$',
          choices: ['$155$', '$29$', '$145$', '$310$'],
          answer: 0,
          working: '$S_{10} = \\dfrac{10}{2}\\left[2(2) + 9(3)\\right] = 5(31) = 155$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of the first ten terms of two plus five plus eight, and so on. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. S sub ten is five times four plus 27: five times 31, which is 155. B is the tenth term, not the sum, and D forgets to divide by two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$S_n$ is the sum of the first $n$ terms.', 'Reverse and add: every pair sums to $t_1 + t_n$.', '$S_n = \\dfrac{n(t_1 + t_n)}{2} = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$'] }],
      lines: [
        { say: 'Let’s sum up. S sub n is the sum of the first n terms.', show: 'sum.0' },
        { say: 'Reverse and add: every pair sums to t sub one plus t sub n.', show: 'sum.1' },
        { say: 'And that gives two formulas for S sub n. In part two, we find the number of terms first, and solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
