import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-7-1-c',
  lessonId: 'm202-7-1',
  title: 'Solving Quadratic Equations by Graphing and Factoring, Part 3: Special Cases and Decomposition',
  thumbnailTitle: 'Special Cases and Decomposition',
  thumbnail: 'm',
  summary: 'Solving 3x² = 12x with a common factor instead of dividing by x, a difference of squares (x² − 49 = 0), a perfect square with one root (x² − 6x + 9 = 0), and factoring 2x² − 5x − 3 = 0 by decomposition.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 7.1 · Part 3', title: 'Special Cases and Decomposition', subtitle: 'More ways to factor' }],
      lines: [
        { say: 'Not every quadratic equation is a simple trinomial with "a" equal to one. Some have a common factor, some are special products, and some need decomposition.', show: 'title' },
        { say: 'In this video, you will solve each kind.' },
      ],
    },
    {
      chapter: 'A common factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3x^2 = 12x \\;\\Rightarrow\\; 3x^2 - 12x = 0', '3x(x - 4) = 0', 'x = 0 \\text{ or } x = 4'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not divide by x', md: 'Dividing both sides of $3x^2 = 12x$ by $3x$ gives only $x = 4$; the root $x = 0$ is lost. Factor instead.' },
      ],
      lines: [
        { say: 'Solve three x squared equals twelve x. Get zero on one side: three x squared minus twelve x equals zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Take out the common factor, three x: three x, times x minus four, equals zero. So x is zero, or four.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'It is tempting to divide both sides by three x, but that gives only four, and loses the root zero. Dividing by x is not allowed when x could be zero. Factor instead.', show: 'oops' },
      ],
    },
    {
      chapter: 'Special products',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^2 - 49 = (x - 7)(x + 7) = 0', 'x = 7 \\text{ or } x = -7', 'x^2 - 6x + 9 = (x - 3)(x - 3) = 0', 'x = 3 \\text{ (one root)}'] }],
      lines: [
        { say: 'Solve x squared minus forty-nine equals zero. This is a difference of squares, so it factors as x minus seven, times x plus seven.', show: 'm.0', focus: 'm.0' },
        { say: 'So x is seven, or negative seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Now x squared, minus six x, plus nine, equals zero. This is a perfect square: x minus three, times x minus three.', show: 'm.2', focus: 'm.2' },
        { say: 'Both factors give three, so there is just one root. The graph of y equals x squared minus six x plus nine touches the x-axis only at its vertex, three, zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Decomposition',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2x^2 - 5x - 3 = 0:\\quad ac = -6,\\ \\ -6 + 1 = -5', '2x^2 - 6x + x - 3 = 0', '2x(x - 3) + 1(x - 3) = 0', '(2x + 1)(x - 3) = 0', 'x = -\\tfrac{1}{2} \\text{ or } x = 3'] }],
      lines: [
        { say: 'When "a" is not one, factor by decomposition. Solve two x squared, minus five x, minus three, equals zero. Find two integers with a product of "a" c, negative six, and a sum of b, negative five: negative six and one.', show: 'm.0', focus: 'm.0' },
        { say: 'Use them to split the middle term: negative five x becomes negative six x plus x.', show: 'm.1', focus: 'm.1' },
        { say: 'Now group: two x times x minus three, plus one times x minus three. The common bracket gives two x plus one, times x minus three.', show: ['m.2', 'm.3'], focus: 'm.3' },
        { say: 'So two x plus one is zero, giving x equals negative one half, or x minus three is zero, giving three.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $3x^2 + 5x - 2 = 0$.',
          choices: ['$x = \\tfrac{1}{3}$ or $x = -2$', '$x = -\\tfrac{1}{3}$ or $x = 2$', '$x = 3$ or $x = -2$', '$x = 1$ or $x = -2$'],
          answer: 0,
          working: '$ac = -6$: $6$ and $-1$. $3x^2 + 6x - x - 2 = 3x(x + 2) - 1(x + 2) = (3x - 1)(x + 2) = 0$, so $x = \\tfrac{1}{3}$ or $x = -2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve three x squared, plus five x, minus two, equals zero. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. "A" c is negative six, and six and negative one add to five. Decomposing gives three x minus one, times x plus two. So x is one third, or negative two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Never divide by $x$: take out the common factor instead.', 'Watch for differences of squares and perfect squares.', 'When $a \\ne 1$: product $ac$, sum $b$, split the middle term, group.'] }],
      lines: [
        { say: 'Let’s sum up. Never divide both sides by x: take out the common factor instead.', show: 'sum.0' },
        { say: 'Watch for differences of squares, and perfect squares, which give one root.', show: 'sum.1' },
        { say: 'And when "a" is not one, use decomposition: two integers with a product of "a" c and a sum of b, then split the middle term and group. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
