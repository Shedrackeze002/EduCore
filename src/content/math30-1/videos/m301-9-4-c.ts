import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { pascal } from './lib/m301-9-counting.ts';

const video: Explainer = {
  id: 'm301-9-4-c',
  lessonId: 'm301-9-4',
  title: 'The Binomial Theorem, Part 3: Expanding a Binomial',
  thumbnailTitle: 'Expanding a Binomial',
  thumbnail: 'p',
  summary: 'The coefficients of (x + y)ⁿ come from Pascal’s triangle because each term chooses which brackets give y, the binomial theorem with its n + 1 terms, expanding (x − 2)⁴ = x⁴ − 8x³ + 24x² − 32x + 16, and keeping a negative term in brackets so the signs come out right. Part 4 finds a single term.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.4 · Part 3', title: 'The Binomial Theorem', subtitle: 'Expanding $(x + y)^n$ with Pascal’s triangle' }],
      lines: [
        { say: 'Expanding x plus y, to the power five, by multiplying five brackets is slow, and easy to get wrong. Pascal’s triangle gives every coefficient at once.', show: 'title' },
        { say: 'In this video, you will see where the binomial theorem comes from, and use it to expand a power of a binomial, including one with a negative term.' },
      ],
    },
    {
      chapter: 'Coefficients from the triangle',
      layout: 'split',
      leftWidth: 420,
      left: [figure('p', [pascal({ rows: 5, dx: 1.4 })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['(x + y)^1 = \\brand{1}x + \\brand{1}y', '(x + y)^2 = \\brand{1}x^2 + \\brand{2}xy + \\brand{1}y^2', '(x + y)^3 = \\brand{1}x^3 + \\brand{3}x^2y', '\\qquad + \\brand{3}xy^2 + \\brand{1}y^3'] }],
      lines: [
        { say: 'Expand a few powers of x plus y, and look at the coefficients. x plus y, to the power one, is just one x plus one y.', show: ['p.row0', 'p.row1', 'm.0'], focus: ['p.row1', 'm.0'] },
        { say: 'x plus y, squared, is x squared plus two x y plus y squared. The coefficients are one, two, one.', show: ['p.row2', 'm.1'], focus: ['p.row2', 'm.1'] },
        { say: 'x plus y, cubed, is x cubed, plus three x squared y, plus three x y squared, plus y cubed. The coefficients are one, three, three, one.', show: ['p.row3', 'm.2', 'm.3'], focus: ['p.row3', 'm.2', 'm.3'] },
        { say: 'These are the rows of Pascal’s triangle. The row that begins one, n gives the coefficients of x plus y, to the power n. So x plus y, to the fourth, has coefficients one, four, six, four, one.', show: 'p.row4', focus: 'p.row4' },
      ],
    },
    {
      chapter: 'Why combinations appear',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x + y)(x + y)(x + y)', 'x^2y\\colon\\quad xx\\brand{y},\\ \\ x\\brand{y}x,\\ \\ \\brand{y}xx', '{}_{3}C_{1} = 3 \\text{ ways}', 'x^{n - k}y^k\\colon\\quad {}_{n}C_{k} \\text{ ways}'] },
      ],
      lines: [
        { say: 'Why does this happen? When you multiply out n brackets, x plus y, times x plus y, and so on, each term picks either x or y from every bracket.', show: 'm.0', focus: 'm.0' },
        { say: 'In x plus y, cubed, the term x squared y comes from picking y from one bracket, and x from the other two. The y can come from the first, second or third bracket.', show: 'm.1', focus: 'm.1' },
        { say: 'Choosing one bracket of three is three choose one, which is three ways. That is why the coefficient is three.', show: 'm.2', focus: 'm.2' },
        { say: 'In general, a term x to the n minus k, y to the k, appears once for every way of choosing which k brackets give y. That is n choose k ways.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'The binomial theorem',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x + y)^n = {}_{n}C_{0}\\,x^n + {}_{n}C_{1}\\,x^{n - 1}y + {}_{n}C_{2}\\,x^{n - 2}y^2', '+ \\cdots + {}_{n}C_{n}\\,y^n'] },
        { kind: 'bullets', id: 'b', items: ['The expansion has $n + 1$ terms.', 'The powers of $x$ go down from $n$ to $0$; the powers of $y$ go up from $0$ to $n$.', 'In every term, the powers add to $n$.'] },
      ],
      lines: [
        { say: 'This is the binomial theorem. x plus y, to the power n, equals n choose zero, x to the n, plus n choose one, x to the n minus one, y, plus n choose two, x to the n minus two, y squared, and so on, up to n choose n, y to the n.', show: ['m.0', 'm.1'], focus: 'm' },
        { say: 'The expansion has n plus one terms, one for each number in the row of Pascal’s triangle.', show: 'b.0', focus: 'b.0' },
        { say: 'The powers of x go down from n to zero, and the powers of y go up from zero to n.', show: 'b.1', focus: 'b.1' },
        { say: 'And in every term, the two powers add to n.', show: 'b.2', focus: 'b.2' },
      ],
    },
    {
      chapter: 'A negative term',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['(x - 2)^4\\colon\\quad y = -2, \\quad \\text{row } 1,\\ 4,\\ 6,\\ 4,\\ 1', '1x^4 + 4x^3(-2) + 6x^2(-2)^2 + 4x(-2)^3 + 1(-2)^4', '= x^4 + 4x^3(-2) + 6x^2(4) + 4x(-8) + 16', '= x^4 - 8x^3 + 24x^2 - 32x + 16'] },
      ],
      lines: [
        { say: 'Expand x minus two, to the power four. Treat it as x plus negative two, so y is negative two. The power is four, so the coefficients come from the row one, four, six, four, one.', show: 'm.0', focus: 'm.0' },
        { say: 'Write each term, with negative two in brackets: one x to the fourth, plus four x cubed times negative two, plus six x squared times negative two squared, plus four x times negative two cubed, plus one times negative two to the fourth.', show: 'm.1', focus: 'm.1' },
        { say: 'Now work out the powers. Negative two squared is four, negative two cubed is negative eight, and negative two to the fourth is sixteen.', show: 'm.2', focus: 'm.2' },
        { say: 'Multiply: x to the fourth, minus eight x cubed, plus twenty-four x squared, minus thirty-two x, plus sixteen.', show: 'm.3', focus: 'm.3' },
        { say: 'Notice that the signs alternate. Odd powers of negative two are negative, and even powers are positive.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keep the negative term in brackets', md: 'In $(x - 2)^4$, the second term of the binomial is $-2$, not $2$. Write $(-2)^k$ in every term: odd powers are negative and even powers are positive, so the signs alternate.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['(-2)^3 = -8, \\qquad (-2)^4 = 16', '\\bad{-2^4 = -16}'] },
      ],
      lines: [
        { say: 'A common mistake is to drop the negative sign, and give every term a plus. Another is to write negative two to the fourth without brackets.', show: 'oops' },
        { say: 'With brackets, negative two cubed is negative eight, and negative two to the fourth is positive sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Without brackets, negative two to the fourth means the negative of two to the fourth, which is negative sixteen, and the last term comes out wrong. Keep the negative term in brackets in every term.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Expand $(x - 3)^3$.',
          choices: ['$x^3 + 9x^2 + 27x + 27$', '$x^3 - 9x^2 + 27x + 27$', '$x^3 - 3x^2 + 3x - 27$', '$x^3 - 9x^2 + 27x - 27$'],
          answer: 3,
          working: 'Row $1,\\ 3,\\ 3,\\ 1$ with $y = -3$: $x^3 + 3x^2(-3) + 3x(-3)^2 + (-3)^3 = x^3 - 9x^2 + 27x - 27$.',
        },
      ],
      lines: [
        { say: 'Your turn. Expand x minus three, cubed. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. Use the row one, three, three, one, with y equal to negative three: x cubed, plus three x squared times negative three, plus three x times negative three squared, plus negative three cubed. That is x cubed, minus nine x squared, plus twenty-seven x, minus twenty-seven. Choice B gets the last sign wrong: negative three cubed is negative twenty-seven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The row that begins $1,\\ n$ gives the coefficients of $(x + y)^n$.', '$(x + y)^n = {}_{n}C_{0}\\,x^n + {}_{n}C_{1}\\,x^{n - 1}y + \\cdots + {}_{n}C_{n}\\,y^n$, with $n + 1$ terms.', 'Put a negative term in brackets: its odd powers are negative.'] }],
      lines: [
        { say: 'Let’s sum up. The row of Pascal’s triangle that begins one, n gives the coefficients of x plus y, to the power n.', show: 'sum.0' },
        { say: 'The binomial theorem writes them as n choose zero, n choose one, and so on, up to n choose n. The expansion has n plus one terms.', show: 'sum.1' },
        { say: 'And put a negative term in brackets: its odd powers are negative. In part four, we find a single term of an expansion, without writing out the rest. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
