import type { Explainer } from '@/video/script.ts';
import { areaModel } from '@/video/algebra.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-4-6-b',
  lessonId: 'm10c-4-6',
  title: 'Special Products and Factoring Strategies, Part 2: Perfect Squares and a Strategy',
  thumbnailTitle: 'Perfect Squares',
  thumbnail: 'sq',
  summary: 'Recognising and factoring perfect square trinomials, seen as a square of algebra tiles, and a strategy for factoring any polynomial completely, with a common error to avoid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 4.6 · Part 2', title: 'Perfect Squares and a Strategy', subtitle: 'Factoring anything, completely' }],
      lines: [
        { say: 'The square of a binomial has its own pattern. Recognise it, and you can factor it in one step.', show: 'title' },
        { say: 'In this video, you will factor perfect square trinomials, and learn a strategy for factoring any polynomial completely.' },
      ],
    },
    {
      chapter: 'Perfect square trinomials',
      layout: 'split',
      left: [figure('sq', [areaModel({ top: ['x', '3'], side: ['x', '3'], cells: [['x^2', '3x'], ['3x', '9']], tiles: true })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + 3)^2 = x^2 + 6x + 9', '(a + b)^2 = a^2 + 2ab + b^2', '(a - b)^2 = a^2 - 2ab + b^2'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'Recognise one', md: 'The first and last terms are perfect squares, and the middle term is $2 \\times \\sqrt{\\text{first}} \\times \\sqrt{\\text{last}}$, with either sign.' },
      ],
      lines: [
        { say: 'Square x plus three, and the tiles make a square: x squared, two groups of three x, and nine. So x plus three, squared, is x squared plus six x plus nine.', show: ['sq.top', 'sq.side', 'sq.outline', 'sq.grid', 'sq.c0-0', 'sq.c0-1', 'sq.c1-0', 'sq.c1-1', 'm.0'], focus: 'm.0' },
        { say: 'In general, "a" plus b, squared, is "a" squared plus two "a" b plus b squared. And "a" minus b, squared, has a minus sign in the middle.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'So to recognise a perfect square trinomial, check that the first and last terms are perfect squares, and that the middle term is two times their square roots.', show: 'key' },
      ],
    },
    {
      chapter: 'Recognising them',
      layout: 'center',
      main: [
        {
          kind: 'math',
          id: 'm',
          lines: ['x^2 + 14x + 49\\text{: } x,\\ 7,\\ 2(x)(7) = 14x \\ \\good{\\text{✓}}', '= (x + 7)^2', '9x^2 - 12xy + 4y^2\\text{: } 3x,\\ 2y,\\ 2(3x)(2y) = 12xy \\ \\good{\\text{✓}}', '= (3x - 2y)^2'],
        },
      ],
      lines: [
        { say: 'Factor x squared plus fourteen x plus 49. The square roots of the first and last terms are x and seven, and two times x times seven is fourteen x. It matches,', show: 'm.0', focus: 'm.0' },
        { say: 'so it is x plus seven, squared.', show: 'm.1', focus: 'm.1' },
        { say: 'Now nine x squared minus twelve x y plus four y squared. The square roots are three x and two y, and two times three x times two y is twelve x y.', show: 'm.2', focus: 'm.2' },
        { say: 'The middle term is negative, so it is three x minus two y, squared.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A strategy',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '**Common factor?** Always check first.',
            '**Two terms:** a difference of squares?',
            '**Three terms:** a perfect square? Otherwise product and sum, or decomposition.',
            '**Four terms:** grouping.',
            '**Factor again** if you can, then **check** by multiplying.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a strategy for factoring any polynomial completely. First, always look for a common factor.', show: 'steps.0' },
        { say: 'Then count the terms. Two terms: is it a difference of squares?', show: 'steps.1' },
        { say: 'Three terms: is it a perfect square? If not, use product and sum, or decomposition.', show: 'steps.2' },
        { say: 'Four terms: try grouping.', show: 'steps.3' },
        { say: 'Then look at each factor: can it be factored again? And check by multiplying.', show: 'steps.4' },
      ],
    },
    {
      chapter: 'Using the strategy',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', lines: ['3x^3 - 12x^2 + 12x', '= 3x(x^2 - 4x + 4)', '= 3x(x - 2)^2'] }],
      lines: [
        { say: 'Factor three x cubed minus twelve x squared plus twelve x completely. First, a common factor: three x. That leaves x squared minus four x plus four.', show: ['m.0', 'm.1'], focus: 'm.1' },
        { say: 'Three terms. Is it a perfect square? x squared and four are the squares of x and two, and two times x times two is four x. Yes.', focus: 'm.1' },
        { say: 'So the complete answer is three x, times x minus two, squared.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding errors',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['4x^2 - 36 = (2x - 6)(2x + 6) \\quad \\bad{\\text{not complete}}', '4x^2 - 36 = 4(x^2 - 9) = 4(x - 3)(x + 3) \\quad \\good{\\text{✓}}'] },
      ],
      lines: [
        { say: 'A student factored four x squared minus 36 as two x minus six, times two x plus six. Multiplying it out does give back the original, so what is wrong?', show: 'm.0', focus: 'm.0' },
        { say: 'Each bracket still has a common factor of two. The student skipped the first step. Take out the common factor four first: four, times x minus three, times x plus three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Factor $2x^2 - 12x + 18$ completely.',
          choices: ['$2(x - 3)^2$', '$(2x - 6)(x - 3)$', '$2(x - 9)(x + 1)$', '$2(x + 3)^2$'],
          answer: 0,
          working: '$2x^2 - 12x + 18 = 2(x^2 - 6x + 9) = 2(x - 3)^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Factor two x squared minus twelve x plus eighteen completely. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Take out the common factor two, which leaves x squared minus six x plus nine: a perfect square, x minus three, squared. B is equal, but not complete, because two x minus six still has a factor of two.', show: 'q.answer' },
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
          items: ['$a^2 \\pm 2ab + b^2 = (a \\pm b)^2$.', 'Strategy: common factor, count the terms, factor, factor again, check.'],
        },
      ],
      lines: [
        { say: "Let's sum up. A perfect square trinomial factors as the square of a binomial, with the sign of its middle term.", show: 'sum.0' },
        { say: 'And to factor anything completely: take out a common factor, count the terms, factor, factor again if you can, and check. That completes unit four. Practise these skills in your lesson. See you next time!', show: 'sum.1' },
      ],
    },
  ],
};

export default video;
