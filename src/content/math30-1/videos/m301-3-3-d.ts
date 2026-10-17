import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-3-3-d',
  lessonId: 'm301-3-3',
  title: 'The Factor Theorem, Part 4: Grouping and Unknown Coefficients',
  thumbnailTitle: 'Grouping and Unknowns',
  summary: 'Factoring x³ + 2x² − 9x − 18 by grouping, what "factored completely" means (a difference of squares still factors; a quadratic with a negative discriminant does not), and finding k so that x + 2 is a factor of x³ + kx² − x − 6.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.3 · Part 4', title: 'Grouping and Unknowns', subtitle: 'Factoring completely' }],
      lines: [
        { say: 'Not every polynomial needs a search for zeros. Some factor quickly by grouping. And the factor theorem can also work backward, to find a missing coefficient.', show: 'title' },
        { say: 'In this video, you will factor by grouping, decide when a polynomial is factored completely, and find k so that a binomial is a factor.' },
      ],
    },
    {
      chapter: 'Factoring by grouping',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x^3 + 2x^2 - 9x - 18', '= x^2(x + 2) - 9(x + 2)', '= (x + 2)(x^2 - 9)', '= (x + 2)(x - 3)(x + 3)'] }],
      lines: [
        { say: 'Factor x cubed, plus two x squared, minus nine x, minus eighteen. Look at the terms in pairs.', show: 'm.0', focus: 'm.0' },
        { say: 'From the first pair, take out x squared: x squared, times x plus two. From the second pair, take out negative nine: negative nine, times x plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Now x plus two is a common factor. Take it out: x plus two, times x squared minus nine.', show: 'm.2', focus: 'm.2' },
        { say: 'And x squared minus nine is a difference of squares: x minus three, times x plus three. So the answer is x plus two, times x minus three, times x plus three.', show: 'm.3', focus: 'm.3' },
        { say: 'Check one factor with the factor theorem. At negative two, the polynomial is negative eight, plus eight, plus eighteen, minus eighteen, which is zero.', focus: 'm' },
      ],
    },
    {
      chapter: 'Factored completely',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping too early, or going too far', md: '"Completely" means every factor is linear, or a quadratic that cannot be factored over the integers.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(x + 2)(x^2 - 9) \\quad \\text{is not finished}', 'x^3 - x^2 + 3x - 10 = (x - 2)(x^2 + x + 5)', 'x^2 + x + 5\\colon\\quad b^2 - 4ac = 1 - 20 < 0'] },
      ],
      lines: [
        { say: 'Factored completely means that every factor is linear, or a quadratic that cannot be factored over the integers.', show: 'oops' },
        { say: 'So x plus two, times x squared minus nine, is not finished. x squared minus nine is a difference of squares, and it still factors.', show: 'm.0', focus: 'm.0' },
        { say: 'But do not try to go too far. x cubed, minus x squared, plus three x, minus ten, equals x minus two, times x squared plus x plus five.', show: 'm.1', focus: 'm.1' },
        { say: 'The discriminant of that quadratic is one minus twenty, which is negative. It has no real roots, so it cannot be factored, and it stays as it is.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Finding k',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', size: 'md', md: 'Find $k$ so that $x + 2$ is a factor of $P(x) = x^3 + kx^2 - x - 6$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['x + 2 \\text{ is a factor} \\iff P(-2) = 0', 'P(-2) = (-2)^3 + k(-2)^2 - (-2) - 6', '= -8 + 4k + 2 - 6 = 4k - 12', '4k - 12 = 0 \\;\\Rightarrow\\; k = 3'] },
      ],
      lines: [
        { say: 'The factor theorem can also find an unknown coefficient. Find k so that x plus two is a factor of P of x equals x cubed, plus k x squared, minus x, minus six.', show: 'q' },
        { say: 'x plus two is a factor exactly when P of negative two is zero.', show: 'm.0', focus: 'm.0' },
        { say: 'Substitute negative two, in brackets. Negative two cubed, plus k times negative two squared, minus negative two, minus six.', show: 'm.1', focus: 'm.1' },
        { say: 'That is negative eight, plus four k, plus two, minus six, which simplifies to four k minus twelve.', show: 'm.2', focus: 'm.2' },
        { say: 'Set it equal to zero. Four k minus twelve equals zero, so k equals three. It is the same idea as finding a coefficient from a remainder, except that here the remainder must be zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $k$ so that $x - 3$ is a factor of $P(x) = x^3 - 2x^2 + kx + 6$.',
          choices: ['$k = -13$', '$k = 5$', '$k = -5$', '$k = -3$'],
          answer: 2,
          working: '$P(3) = 27 - 18 + 3k + 6 = 3k + 15$. Set $3k + 15 = 0$: $k = -5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find k so that x minus three is a factor of P of x equals x cubed, minus two x squared, plus k x, plus six. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C. x minus three is a factor exactly when P of three is zero. P of three is 27, minus eighteen, plus three k, plus six, which is three k plus fifteen. So three k equals negative fifteen, and k is negative five. Choice A uses P of negative three instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Grouping: factor each pair of terms to find a common binomial.', 'Completely: every factor is linear, or a quadratic that cannot be factored over the integers.', 'To find $k$, set $P(a) = 0$ and solve.'] }],
      lines: [
        { say: 'Let’s sum up. To factor by grouping, factor each pair of terms, and look for a common binomial.', show: 'sum.0' },
        { say: 'Factored completely means every factor is linear, or a quadratic that cannot be factored over the integers.', show: 'sum.1' },
        { say: 'And to find an unknown coefficient, set P of "a" equal to zero, and solve. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
