import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const sd = steps('sd');

const video: Explainer = {
  id: 'm301-3-2-c',
  lessonId: 'm301-3-2',
  title: 'The Remainder Theorem, Part 3: Remainders Without Dividing',
  thumbnailTitle: 'The Remainder Theorem',
  thumbnail: 'sd',
  summary: 'Why the remainder when P(x) is divided by x − a is P(a), checking it against synthetic division, finding the remainder when x⁴ − 3x² + 2x − 5 is divided by x + 1, and choosing between the theorem and synthetic division. Part 4 finds unknown coefficients.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.2 · Part 3', title: 'The Remainder Theorem', subtitle: 'The remainder is P(a)' }],
      lines: [
        { say: 'Long division and synthetic division both found a remainder of thirteen when x cubed, plus two x squared, minus five x, plus seven, was divided by x minus two. There is a much quicker way to find that number.', show: 'title' },
        { say: 'In this video, you will see why the remainder is P of "a", and use it to find a remainder in one step, without dividing at all.' },
      ],
    },
    {
      chapter: 'The theorem',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Remainder theorem', md: 'When a polynomial $P(x)$ is divided by $x - a$, the remainder is $P(a)$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P(x) = (x - a)Q(x) + R', 'P(a) = (a - a)Q(a) + R', '= 0 \\cdot Q(a) + R = R'] },
      ],
      lines: [
        { say: 'The remainder theorem says: when a polynomial P of x is divided by x minus "a", the remainder is P of "a".', show: 'def' },
        { say: 'Here is why. The division statement, P of x equals x minus "a", times Q of x, plus R, is true for every value of x.', show: 'm.0', focus: 'm.0' },
        { say: 'So it is true when x equals "a". Substitute "a" for x. The bracket becomes "a" minus "a", which is zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Zero times Q of "a" is zero, whatever the quotient is. All that is left is R. So P of "a" is the remainder.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking it',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sd', [synthetic({ a: 2, coeffs: [1, 2, -5, 7] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P(x) = x^3 + 2x^2 - 5x + 7', 'P(2) = 8 + 8 - 10 + 7', '= 13'] }],
      lines: [
        { say: 'Check it on the first example. P of x is x cubed, plus two x squared, minus five x, plus seven. The divisor is x minus two, so "a" is two.', show: ['m.0', ...sd.all], focus: 'm.0' },
        { say: 'P of two is two cubed, which is eight, plus two times four, which is eight, minus ten, plus seven.', show: 'm.1', focus: 'm.1' },
        { say: 'That is thirteen: exactly the remainder we found by dividing.', show: 'm.2', focus: ['m.2', 'sd.box'] },
        { say: 'So the last number in a synthetic division is always P of "a". The theorem just finds it without the rest of the work.', focus: ['m', 'sd.s3'] },
      ],
    },
    {
      chapter: 'Using the theorem',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Divide } P(x) = x^4 - 3x^2 + 2x - 5 \\text{ by } x + 1', 'x + 1 = x - (-1) \\;\\Rightarrow\\; R = P(-1)', 'P(-1) = (-1)^4 - 3(-1)^2 + 2(-1) - 5', '= 1 - 3 - 2 - 5 = -9'] }],
      lines: [
        { say: 'Find the remainder when P of x equals x to the fourth, minus three x squared, plus two x, minus five, is divided by x plus one.', show: 'm.0', focus: 'm.0' },
        { say: 'x plus one is x minus negative one, so by the remainder theorem, the remainder is P of negative one.', show: 'm.1', focus: 'm.1' },
        { say: 'Substitute negative one, in brackets: negative one to the fourth, minus three times negative one squared, plus two times negative one, minus five.', show: 'm.2', focus: 'm.2' },
        { say: 'That is one, minus three, minus two, minus five, which is negative nine. The remainder is negative nine.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which method?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'The sign of a', md: '$x + 1 = x - (-1)$, so the remainder is $P(-1)$, not $P(1)$. Here $P(1) = -5$: that is the remainder for $x - 1$, a different division.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Which method?', md: 'If you only need the remainder, use the remainder theorem. If you also need the quotient, use synthetic division: its last number is $P(a)$ anyway.' },
      ],
      lines: [
        { say: 'Watch the sign. To divide by x plus one, substitute negative one, not one. P of one is negative five, which is the remainder for x minus one: a different division.', show: 'oops' },
        { say: 'So which method should you use? If you only need the remainder, the remainder theorem is fastest.', show: 'tip' },
        { say: 'If you also need the quotient, use synthetic division. Its last number is P of "a" anyway, so you get both.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the remainder when $P(x) = 2x^3 - x^2 + 3x - 4$ is divided by $x + 2$.',
          choices: ['$-30$', '$14$', '$-22$', '$30$'],
          answer: 0,
          working: '$x + 2 = x - (-2)$, so $R = P(-2) = 2(-8) - 4 + 3(-2) - 4 = -16 - 4 - 6 - 4 = -30$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the remainder when P of x equals two x cubed, minus x squared, plus three x, minus four, is divided by x plus two. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. x plus two is x minus negative two, so the remainder is P of negative two: negative sixteen, minus four, minus six, minus four, which is negative thirty. B substitutes positive two instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Remainder theorem: dividing $P(x)$ by $x - a$ leaves the remainder $P(a)$.', 'It works because $x = a$ makes $(x - a)Q(x)$ zero.', 'For $x + 1$, find $P(-1)$, with every negative in brackets.'] }],
      lines: [
        { say: 'Let’s sum up. The remainder theorem: when P of x is divided by x minus "a", the remainder is P of "a".', show: 'sum.0' },
        { say: 'It works because substituting "a" makes x minus "a", times Q of x, equal to zero.', show: 'sum.1' },
        { say: 'And to divide by x plus one, find P of negative one, with every negative in brackets. In part four, we use remainders to find unknown coefficients. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
