import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm201-1-4',
  lessonId: 'm201-1-4',
  title: 'Geometric Series, Part 1: The Sum Formula',
  thumbnailTitle: 'Geometric Series',
  summary: 'A penny that doubles every day for 30 days, why multiplying a geometric series by r and subtracting gives Sₙ = t₁(rⁿ − 1)/(r − 1), the special case r = 1, and sums with a positive and a negative ratio. Part 2 uses the last term and solves problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.4 · Part 1', title: 'Geometric Series', subtitle: 'Multiply by r and subtract' }],
      lines: [
        { say: 'Would you take a job that pays one cent on the first day, two cents on the second, four on the third, doubling every day for thirty days? The total is more than ten million dollars.', show: 'title' },
        { say: 'Adding the terms of a geometric sequence like this is a geometric series. In this video, you will see where its sum formula comes from, and use it.' },
      ],
    },
    {
      chapter: 'Multiply and subtract',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['S_n = t_1 + t_1 r + t_1 r^2 + \\cdots + t_1 r^{n-1}', 'rS_n = \\phantom{t_1 + {}} t_1 r + t_1 r^2 + \\cdots + t_1 r^{n-1} + t_1 r^n', 'rS_n - S_n = t_1 r^n - t_1', 'S_n(r - 1) = t_1(r^n - 1)'] },
      ],
      lines: [
        { say: 'A geometric series is the sum of the terms of a geometric sequence: t sub one, plus t sub one times r, plus t sub one times r squared, and so on.', show: 'm.0', focus: 'm.0' },
        { say: 'Here is the trick. Multiply the whole sum by r. Every term moves one place along: t sub one becomes t sub one r, and so on, with one new term at the end.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract the first line from the second. All the middle terms cancel, leaving only t sub one r to the n, minus t sub one.', show: 'm.2', focus: 'm.2' },
        { say: 'Factor both sides: S sub n times r minus one, equals t sub one times r to the n, minus one.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The formulas',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['S_n = \\dfrac{t_1(r^n - 1)}{r - 1} \\qquad S_n = \\dfrac{rt_n - t_1}{r - 1} \\qquad (r \\ne 1)'] },
        { kind: 'bullets', id: 'b', items: ['If $r = 1$, every term is $t_1$, so $S_n = nt_1$.', 'For $0 < r < 1$, use $S_n = \\dfrac{t_1(1 - r^n)}{1 - r}$: the same formula, with both brackets positive.'] },
      ],
      lines: [
        { say: 'Divide by r minus one, and you have the sum formula: S sub n equals t sub one, times r to the n minus one, over r minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'Since t sub one times r to the n is r times the last term, there is a second version: r times t sub n, minus t sub one, over r minus one.' },
        { say: 'Neither works when r is one, because you would divide by zero. But then every term equals t sub one, so the sum is just n times t sub one.', show: 'b.0' },
        { say: 'When r is between zero and one, multiply the top and bottom by negative one. It is the same formula, but both brackets are positive, which is easier to check.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Finding sums',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['S_8 = \\dfrac{3(2^8 - 1)}{2 - 1} = \\dfrac{3(255)}{1} = 765', 'S_9 = \\dfrac{5\\left((-2)^9 - 1\\right)}{-2 - 1} = \\dfrac{5(-513)}{-3} = 855'] },
      ],
      lines: [
        { say: 'Find the sum of the first eight terms of three plus six plus twelve, and so on. t sub one is three, r is two, and n is eight.', show: 'm.0' },
        { say: 'S sub eight is three times two to the eighth minus one, over two minus one: three times 255, which is 765.', focus: 'm.0' },
        { say: 'Now a negative ratio: the first nine terms of five, minus ten, plus twenty, and so on. t sub one is five and r is negative two.', show: 'm.1' },
        { say: 'Negative two, in brackets, to the ninth is negative 512. Minus one is negative 513. So S sub nine is five times negative 513, over negative three: 855.', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the sum of the first $6$ terms of $4 + 12 + 36 + \\cdots$',
          choices: ['$1456$', '$2916$', '$484$', '$728$'],
          answer: 0,
          working: '$S_6 = \\dfrac{4(3^6 - 1)}{3 - 1} = \\dfrac{4(728)}{2} = 1456$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of the first six terms of four plus twelve plus 36, and so on. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. S sub six is four times three to the sixth, minus one, over three minus one: four times 728, over two, which is 1,456. D forgets to multiply by four.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply by $r$ and subtract: the middle terms cancel.', '$S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$, for $r \\ne 1$.', 'If $r = 1$, $S_n = nt_1$. Bracket a negative ratio.'] }],
      lines: [
        { say: 'Let’s sum up. Multiply a geometric series by r and subtract, and the middle terms cancel.', show: 'sum.0' },
        { say: 'That gives the sum formula, for any ratio except one.', show: 'sum.1' },
        { say: 'If r is one, the sum is n times t sub one. And bracket a negative ratio. In part two, we use the last term, and solve problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
