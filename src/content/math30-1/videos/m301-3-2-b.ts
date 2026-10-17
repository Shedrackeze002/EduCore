import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { steps, synthetic } from './lib/division.ts';

const s1 = steps('sd');
const s2 = steps('sd');

const video: Explainer = {
  id: 'm301-3-2-b',
  lessonId: 'm301-3-2',
  title: 'The Remainder Theorem, Part 2: Synthetic Division',
  thumbnailTitle: 'Synthetic Division',
  thumbnail: 'sd',
  summary: 'Synthetic division by x − a: coefficients in descending order with 0 placeholders, bring down, multiply by a and add. Dividing x³ + 2x² − 5x + 7 by x − 2 and 2x³ − 7x + 3 by x + 2, and the two slips to avoid. Part 3 finds remainders without dividing.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 3.2 · Part 2', title: 'Synthetic Division', subtitle: 'A shortcut for dividing by x − a' }],
      lines: [
        { say: 'Long division works, but it writes every power of x again and again. Synthetic division keeps only the coefficients, and gives the same answer in a fraction of the time.', show: 'title' },
        { say: 'In this video, you will divide by x minus "a" with synthetic division, including a polynomial with a missing term.' },
      ],
    },
    {
      chapter: 'The steps',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sd', [synthetic({ a: 2, coeffs: [1, 2, -5, 7] })])],
      right: [{ kind: 'bullets', id: 'st', items: ['Coefficients in order; $a$ on the left.', 'Bring down the first coefficient.', 'Multiply by $a$; add down the column.', 'The last number is the remainder.'] }],
      lines: [
        { say: 'Here is the division from part one: x cubed, plus two x squared, minus five x, plus seven, divided by x minus two. Write the coefficients in order: one, two, negative five, seven. We divide by x minus two, so write two on the left.', show: [...s1.setup, 'st.0'], focus: 'st.0' },
        { say: 'Bring down the first coefficient, one.', show: [s1.bring, 'st.1'], focus: ['st.1', 'sd.s0'] },
        { say: 'Multiply it by two, and write the product, two, under the next coefficient. Then add down the column: two plus two is four.', show: [...s1.step(1), 'st.2'], focus: ['st.2', 'sd.p1', 'sd.s1'] },
        { say: 'Repeat. Four times two is eight, and negative five plus eight is three.', show: s1.step(2), focus: ['sd.p2', 'sd.s2'] },
        { say: 'Three times two is six, and seven plus six is thirteen.', show: s1.step(3), focus: ['sd.p3', 'sd.s3'] },
        { say: 'The last number, thirteen, is the remainder.', show: [s1.box, 'st.3'], focus: ['st.3', 'sd.box'] },
        { say: 'The other numbers, one, four and three, are the coefficients of the quotient, starting one degree lower than P of x: x squared, plus four x, plus three. That matches the long division.', focus: ['sd.s0', 'sd.s1', 'sd.s2'] },
      ],
    },
    {
      chapter: 'A missing term',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sd', [synthetic({ a: -2, coeffs: [2, 0, -7, 3], powers: ['x^3', 'x^2', 'x', '1'] })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2x^3 + 0x^2 - 7x + 3', 'x + 2 = x - (-2)', 'Q(x) = 2x^2 - 4x + 1', 'R = 1'] }],
      lines: [
        { say: 'Divide two x cubed, minus seven x, plus three, by x plus two. There is no x squared term, so write it with a zero. The coefficients are two, zero, negative seven and three.', show: ['m.0', 'sd.powers', 'sd.top'], focus: ['m.0', 'sd.c1'] },
        { say: 'x plus two is x minus negative two, so "a" is negative two: the value of x that makes the divisor zero.', show: ['m.1', 'sd.a', 'sd.frame'], focus: ['m.1', 'sd.a'] },
        { say: 'Bring down the two. Two times negative two is negative four, and zero plus negative four is negative four.', show: [s2.bring, ...s2.step(1)], focus: ['m', 'sd.s1'] },
        { say: 'Negative four times negative two is eight, and negative seven plus eight is one.', show: s2.step(2), focus: 'sd.s2' },
        { say: 'One times negative two is negative two, and three plus negative two is one.', show: [...s2.step(3), s2.box], focus: 'sd.s3' },
        { say: 'So the quotient is two x squared, minus four x, plus one, and the remainder is one.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3', 'sd'] },
        { say: 'As a division statement: two x cubed, minus seven x, plus three, equals x plus two, times two x squared minus four x plus one, plus one.' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Placeholders and the sign of a', md: 'Leaving out the $0$ for a missing power pushes every coefficient into the wrong column. And to divide by $x + 2$, use $a = -2$: the value of $x$ that makes the divisor zero.' },
        { kind: 'table', id: 't', head: ['Slip in dividing $2x^3 - 7x + 3$ by $x + 2$', 'Result'], rows: [['No placeholder: $2,\\ -7,\\ 3$', '[[bad:$2x - 11$, remainder $25$]]'], ['Using $a = 2$', '[[bad:$2x^2 + 4x + 1$, remainder $5$]]']] },
      ],
      lines: [
        { say: 'Two slips spoil a synthetic division. The first is leaving out the zero for a missing power. Every coefficient after it slides into the wrong column.', show: 'oops' },
        { say: 'Without the zero, this division gives two x minus eleven, remainder 25. The quotient of a cubic should be a quadratic, so that cannot be right.', show: 't.0', focus: 't.0' },
        { say: 'The second slip is the sign of "a". To divide by x plus two, use negative two. Using positive two divides by x minus two instead, and gives a different answer.', show: 't.1', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use synthetic division to divide $x^3 - 4x + 5$ by $x - 3$.',
          choices: ['$x^3 + 3x^2 + 5x$, remainder $20$', '$x - 1$, remainder $2$', '$x^2 - 3x + 5$, remainder $-10$', '$x^2 + 3x + 5$, remainder $20$'],
          answer: 3,
          working: 'Coefficients $1, 0, -4, 5$ and $a = 3$: bring down $1$; $0 + 3 = 3$; $-4 + 9 = 5$; $5 + 15 = 20$. The quotient starts at $x^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use synthetic division to divide x cubed, minus four x, plus five, by x minus three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D. With a zero for the missing x squared term, and "a" equal to three, the bottom row is one, three, five and twenty. B leaves out the zero placeholder, so every coefficient lands in the wrong column.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Write the coefficients in descending order, with $0$ for any missing power, and $a$ on the left.', 'Bring down, multiply by $a$, add. The last number is the remainder.', 'To divide by $x + 2$, use $a = -2$.'] }],
      lines: [
        { say: 'Let’s sum up. Write the coefficients in descending order, with a zero for any missing power, and "a" on the left.', show: 'sum.0' },
        { say: 'Bring down the first coefficient, then multiply by "a" and add, column by column. The last number is the remainder, and the others are the quotient.', show: 'sum.1' },
        { say: 'And to divide by x plus two, use "a" equals negative two. In part three, we find the remainder without dividing at all, with the remainder theorem. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
