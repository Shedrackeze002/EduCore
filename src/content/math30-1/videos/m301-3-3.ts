import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm301-3-3',
  lessonId: 'm301-3-3',
  title: 'The Factor Theorem, Part 1: A Remainder of Zero',
  thumbnailTitle: 'The Factor Theorem',
  summary: 'Why x − a is a factor of P(x) exactly when P(a) = 0, the four ways of saying it (factor, zero, root, x-intercept), and testing whether x − 3 and x + 2 are factors of x³ − 4x² + x + 6 without dividing. Part 2 finds which values are worth testing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.3 · Part 1', title: 'The Factor Theorem', subtitle: 'x − a is a factor when P(a) = 0' }],
      lines: [
        { say: 'When a division by x minus "a" leaves a remainder of zero, x minus "a" divides the polynomial exactly. It is a factor.', show: 'title' },
        { say: 'In this video, you will see why, and use that idea to test whether a binomial is a factor of a polynomial, without dividing.' },
      ],
    },
    {
      chapter: 'A remainder of zero',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factor theorem', md: 'A polynomial $P(x)$ has a factor $x - a$ if and only if $P(a) = 0$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['12 \\div 3 = 4 \\text{ remainder } 0\\colon\\quad 12 = 3 \\times 4', 'P(x) = (x - a)Q(x) + P(a)', 'P(a) = 0\\colon\\quad P(x) = (x - a)Q(x)', 'P(x) = (x - a)Q(x)\\colon\\quad P(a) = 0 \\cdot Q(a) = 0'] },
      ],
      lines: [
        { say: 'Think of numbers first. Twelve divided by three leaves no remainder, so three is a factor of twelve: twelve equals three times four.', show: 'm.0', focus: 'm.0' },
        { say: 'The factor theorem says the same about polynomials: P of x has a factor x minus "a", if and only if P of "a" equals zero.', show: 'def' },
        { say: 'Here is why. By the remainder theorem, dividing P of x by x minus "a" leaves the remainder P of "a".', show: 'm.1', focus: 'm.1' },
        { say: 'If P of "a" is zero, the division statement becomes P of x equals x minus "a", times Q of x. So x minus "a" is a factor.', show: 'm.2', focus: 'm.2' },
        { say: 'And the other way round: if P of x equals x minus "a" times Q of x, then P of "a" is zero times Q of "a", which is zero.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Four ways to say it',
      layout: 'center',
      main: [
        { kind: 'text', id: 'intro', size: 'md', md: 'These four statements say the same thing:' },
        { kind: 'bullets', id: 'b', items: ['$x - a$ is a **factor** of $P(x)$.', '$P(a) = 0$.', '$a$ is a **zero** of the function $P$.', '$x = a$ is a **root** of $P(x) = 0$, and an **$x$-intercept** of the graph of $y = P(x)$.'] },
      ],
      lines: [
        { say: 'So these four statements all say the same thing.', show: 'intro' },
        { say: 'x minus "a" is a factor of P of x.', show: 'b.0', focus: 'b.0' },
        { say: 'P of "a" equals zero.', show: 'b.1', focus: 'b.1' },
        { say: 'The number "a" is a zero of the function P.', show: 'b.2', focus: 'b.2' },
        { say: 'And x equals "a" is a root of the equation P of x equals zero, and an x-intercept of the graph. Know one of them, and you know all four.', show: 'b.3', focus: 'b.3' },
      ],
    },
    {
      chapter: 'Testing a factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = x^3 - 4x^2 + x + 6', 'x - 3\\colon\\quad P(3) = 27 - 36 + 3 + 6 = 0 \\;\\checkmark', 'x + 2\\colon\\quad P(-2) = -8 - 16 - 2 + 6 = -20'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Testing P(2) for x + 2', md: '$x + 2$ is zero when $x = -2$, so test $P(-2)$. Here $P(2) = 8 - 16 + 2 + 6 = 0$, but that shows $x - 2$ is a factor, not $x + 2$.' },
      ],
      lines: [
        { say: 'Is x minus three a factor of P of x equals x cubed, minus four x squared, plus x, plus six? And is x plus two?', show: 'm.0', focus: 'm.0' },
        { say: 'For x minus three, find P of three: 27, minus 36, plus three, plus six, which is zero. So x minus three is a factor.', show: 'm.1', focus: 'm.1' },
        { say: 'For x plus two, use "a" equals negative two. P of negative two is negative eight, minus sixteen, minus two, plus six: negative twenty.', show: 'm.2', focus: 'm.2' },
        { say: 'That is not zero, so x plus two is not a factor. Dividing by it would leave a remainder of negative twenty.' },
        { say: 'Watch the sign. P of two happens to be zero here, but that shows x minus two is a factor. It tells you nothing about x plus two.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which binomial is a factor of $P(x) = x^3 + 2x^2 - x - 2$?',
          choices: ['$x - 2$', '$x + 2$', '$x + 3$', '$x - 3$'],
          answer: 1,
          working: '$P(-2) = -8 + 8 + 2 - 2 = 0$, so $x + 2$ is a factor. $P(2) = 12$, $P(-3) = -8$ and $P(3) = 40$ are not zero.',
        },
      ],
      lines: [
        { say: 'Your turn. Which binomial is a factor of P of x equals x cubed, plus two x squared, minus x, minus two? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. For x plus two, test P of negative two: negative eight, plus eight, plus two, minus two, which is zero. Choice A would need P of two to be zero, but P of two is twelve.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Factor theorem: $x - a$ is a factor of $P(x)$ exactly when $P(a) = 0$.', 'A factor, a zero, a root and an $x$-intercept are four views of one fact.', 'To test $x + 2$, find $P(-2)$.'] }],
      lines: [
        { say: 'Let’s sum up. The factor theorem: x minus "a" is a factor of P of x exactly when P of "a" equals zero.', show: 'sum.0' },
        { say: 'A factor, a zero, a root and an x-intercept are four views of the same fact.', show: 'sum.1' },
        { say: 'And to test x plus two, find P of negative two. In part two, we find which values are worth testing, and factor a cubic completely. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
