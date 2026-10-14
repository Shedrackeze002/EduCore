import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A pile of logs seen from the end: rows of circles, 24 at the bottom down to 6 at the top. */
const logs: Part = (() => {
  const points: Record<string, [number, number]> = {};
  const items: Part['items'] = [];
  for (let row = 0; row < 10; row++) {
    const count = 24 - 2 * row;
    for (let i = 0; i < count; i++) {
      const [cx, cy] = [row + i + 0.5, row * 0.87 + 0.5];
      const ids = Array.from({ length: 12 }, (_, j) => {
        const id = `l${row}-${i}-${j}`;
        points[id] = [cx + 0.45 * Math.cos((j * Math.PI) / 6), cy + 0.45 * Math.sin((j * Math.PI) / 6)];
        return id;
      });
      items.push({ kind: 'region', id: `l${row}-${i}`, points: ids, tone: row === 0 || row === 9 ? 'opp' : 'theta', shade: 0.5, group: row === 0 ? 'bottom' : row === 9 ? 'top' : 'middle' });
    }
  }
  return { points, items };
})();

const video: Explainer = {
  id: 'm201-1-2-b',
  lessonId: 'm201-1-2',
  title: 'Arithmetic Series, Part 2: Finding n, and Problems',
  thumbnailTitle: 'Arithmetic Series Problems',
  thumbnail: 'pile',
  summary: 'Finding the number of terms before using a sum formula, a pile of logs with 2 fewer in each row, and a theatre with 390 seats whose number of rows comes from a quadratic equation, keeping only the positive whole-number root.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.2 · Part 2', title: 'Arithmetic Series Problems', subtitle: 'Find n first' }],
      lines: [
        { say: 'Logs stacked in a pile, seats in a theatre, money saved week after week: each is an arithmetic series. Before you can add one up, you need to know how many terms it has.', show: 'title' },
        { say: 'In this video, you will find the number of terms first, then use the sum formulas to solve problems.' },
      ],
    },
    {
      chapter: 'When the last term is given',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['101 = 5 + 3(n - 1),\\quad 96 = 3(n - 1),\\quad n = 33', 'S_{33} = \\dfrac{33(5 + 101)}{2} = \\dfrac{33(106)}{2} = 1749'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the last term as n', md: 'In $5 + 8 + \\cdots + 101$, the $101$ is $t_n$, not $n$. Find how many terms there are first.' },
      ],
      lines: [
        { say: 'Find the sum of five plus eight plus eleven, and so on, up to 101. We know the last term, but not how many terms there are.' },
        { say: 'Find n first: 101 equals five plus three times n minus one. So 96 equals three times n minus one, n minus one is 32, and n is 33.', show: 'm.0', focus: 'm.0' },
        { say: 'Now use the first formula: 33 times five plus 101, over two. That is 33 times 106, over two: 1,749.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not use 101 as n. It is the last term, t sub n. Always find how many terms there are before you use a sum formula.', show: 'oops' },
      ],
    },
    {
      chapter: 'A pile of logs',
      layout: 'split',
      leftWidth: 600,
      left: [figure('pile', [logs])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6 = 24 - 2(n - 1),\\quad n = 10', 'S_{10} = \\dfrac{10(24 + 6)}{2} = 150'] }],
      lines: [
        { say: 'A pile of logs has 24 logs in the bottom row and six in the top row. Each row has two fewer logs than the row below. How many logs are there?', show: 'pile' },
        { say: 't sub one is 24, the last term is six, and d is negative two. So six equals 24 minus two times n minus one. Then n minus one is nine: there are ten rows.', show: 'm.0', focus: ['pile.bottom', 'pile.top', 'm.0'] },
        { say: 'Add them with the first formula: ten times 24 plus six, over two. That is 150 logs.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'How many rows?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['390 = \\dfrac{n}{2}\\left[2(12) + (n - 1)(2)\\right] = n(n + 11)', 'n^2 + 11n - 390 = 0', '(n - 15)(n + 26) = 0,\\quad n = 15 \\text{ or } {-26}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping the negative root', md: '$n$ counts terms, so it must be a natural number. Reject the negative root, and any root that is not a whole number.' },
      ],
      lines: [
        { say: 'Sometimes the total is known, and the number of terms is not. A theatre’s first row has twelve seats, and each row has two more than the row in front of it. The theatre has 390 seats. How many rows does it have?' },
        { say: 'Substitute into the second formula: 390 equals n over two, times 24 plus two times n minus one. That simplifies to n times n plus eleven.', show: 'm.0', focus: 'm.0' },
        { say: 'So we get a quadratic equation: n squared plus eleven n minus 390 equals zero.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor: n minus fifteen, times n plus 26. So n is fifteen, or negative 26.', show: 'm.2', focus: 'm.2' },
        { say: 'The number of rows cannot be negative, so the theatre has fifteen rows. n counts terms, so reject a negative root, and any root that is not a whole number.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the sum of $4 + 9 + 14 + \\cdots + 99$.',
          choices: ['$1030$', '$2060$', '$103$', '$5098.5$'],
          answer: 0,
          working: '$99 = 4 + 5(n - 1)$, so $n = 20$. $S_{20} = \\dfrac{20(4 + 99)}{2} = 1030$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the sum of four plus nine plus fourteen, and so on, up to 99. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. First, 99 equals four plus five times n minus one, so n is twenty. Then S sub twenty is twenty times 103, over two: 1,030. B forgets to divide by two, C adds only the first and last terms, and D uses 99 as n.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['When the last term is given, find $n$ first with $t_n = t_1 + (n - 1)d$.', 'Finding $n$ from $S_n$ gives a quadratic equation.', 'Keep only the positive whole-number root.'] }],
      lines: [
        { say: 'Let’s sum up. When the last term is given, find n first, with the general term.', show: 'sum.0' },
        { say: 'Finding n from the total gives a quadratic equation.', show: 'sum.1' },
        { say: 'And keep only the positive whole-number root. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
