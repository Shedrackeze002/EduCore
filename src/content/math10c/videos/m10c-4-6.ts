import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-6',
  lessonId: 'm10c-4-6',
  title: 'Special Products and Factoring Strategies, Part 1: The Difference of Squares',
  thumbnailTitle: 'The Difference of Squares',
  thumbnail: 'ds',
  summary: 'Why (a − b)(a + b) = a² − b², factoring differences of squares (with a common factor first, and twice), and why a sum of squares does not factor. Part 2 covers perfect square trinomials and a strategy for factoring completely.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.6 · Part 1', title: 'The Difference of Squares', subtitle: 'When the middle terms cancel' }],
      lines: [
        { say: 'Some polynomials have special patterns that let you factor them in a single step. The first is the difference of squares.', show: 'title' },
        { say: 'In this video, you will see why x squared minus 49 factors as x minus seven, times x plus seven, and factor differences of squares. In part two, we meet perfect square trinomials, and a strategy for factoring anything.' },
      ],
    },
    {
      chapter: 'The middle terms cancel',
      layout: 'split',
      leftWidth: 440,
      left: [figure('ds', [areaModel({ top: ['x', '7'], side: ['x', '-7'], cells: [['x^2', '7x'], ['-7x', '-49']] })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x - 7)(x + 7) = x^2 + 7x - 7x - 49', '= x^2 - 49', '(a - b)(a + b) = a^2 - b^2'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Difference of squares', md: '$a^2 - b^2 = (a - b)(a + b)$' },
      ],
      lines: [
        { say: 'Multiply x minus seven by x plus seven. x times x is x squared, and negative seven times seven is negative 49.', show: ['ds.top', 'ds.side', 'ds.outline', 'ds.grid', 'ds.c0-0', 'ds.c1-1'] },
        { say: 'The middle terms are seven x and negative seven x, and they cancel. So the product is x squared minus 49.', show: ['ds.c0-1', 'ds.c1-0', 'm.0', 'm.1'], focus: ['ds.c0-1', 'ds.c1-0', 'm.1'] },
        { say: 'In general, "a" minus b, times "a" plus b, is "a" squared minus b squared. This is called a difference of squares.', show: ['m.2', 'def'], focus: 'm.2' },
        { say: 'You can also see it as a trinomial with no middle term. For x squared minus 49, we need two numbers with a product of negative 49 and a sum of zero: seven and negative seven.' },
      ],
    },
    {
      chapter: 'Factoring differences of squares',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['x^2 - 81 = x^2 - 9^2 = (x - 9)(x + 9)', '16m^2 - 25n^2 = (4m)^2 - (5n)^2 = (4m - 5n)(4m + 5n)', '2x^2 - 50 = 2(x^2 - 25) = 2(x - 5)(x + 5)'] },
      ],
      lines: [
        { say: 'Factor x squared minus 81. 81 is nine squared, so it is x minus nine, times x plus nine.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixteen m squared minus 25 n squared. Sixteen m squared is four m, squared, and 25 n squared is five n, squared. So: four m minus five n, times four m plus five n.', show: 'm.1', focus: 'm.1' },
        { say: 'Two x squared minus fifty is not a difference of squares as it stands. But take out the common factor two first, and you get two, times x squared minus 25: two, times x minus five, times x plus five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Factoring twice',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['x^4 - 16 = (x^2)^2 - 4^2', '= (x^2 - 4)(x^2 + 4)', '= (x - 2)(x + 2)(x^2 + 4)'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A sum of squares does not factor', md: '$x^2 + 4$ cannot be factored over the integers: no two integers have a product of 4 and a sum of 0.' },
      ],
      lines: [
        { say: 'Factor x to the fourth minus sixteen. x to the fourth is x squared, squared, and sixteen is four squared. So it is x squared minus four, times x squared plus four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'But x squared minus four is another difference of squares: x minus two, times x plus two.', show: 'm.2', focus: 'm.2' },
        { say: 'And x squared plus four? A sum of squares does not factor, because no two integers have a product of four and a sum of zero. So the complete answer is x minus two, times x plus two, times x squared plus four.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $9x^2 - 64$.',
          choices: ['$(3x - 8)(3x + 8)$', '$(9x - 8)(x + 8)$', '$(3x - 8)^2$', '$(3x - 32)(3x + 32)$'],
          answer: 0,
          working: '$9x^2 - 64 = (3x)^2 - 8^2 = (3x - 8)(3x + 8)$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor nine x squared minus 64. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine x squared is three x, squared, and 64 is eight squared. So it is three x minus eight, times three x plus eight. C would have a middle term, and D halves 64 instead of taking its square root.', show: 'q.answer' },
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
          items: ['$a^2 - b^2 = (a - b)(a + b)$: the middle terms cancel.', 'Take out a common factor first, and factor again if you can.', 'A sum of squares, like $x^2 + 4$, does not factor.'],
        },
      ],
      lines: [
        { say: 'Let’s sum up. "a" squared minus b squared is "a" minus b, times "a" plus b, because the middle terms cancel.', show: 'sum.0' },
        { say: 'Take out a common factor first, and factor again if you can.', show: 'sum.1' },
        { say: 'But a sum of squares does not factor. In part two, we meet perfect square trinomials, and a strategy for factoring anything. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
