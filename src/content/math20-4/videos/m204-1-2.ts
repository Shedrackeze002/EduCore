import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-1-2',
  lessonId: 'm204-1-2',
  title: 'Fractions and Mixed Numbers, Part 1: Mixed Numbers and Improper Fractions',
  thumbnailTitle: 'Mixed Numbers',
  thumbnail: 'q',
  summary: 'What mixed numbers and improper fractions are, why 2¼ is nine quarters, changing a mixed number to an improper fraction (multiply, then add) and back (divide), and the mistake of adding the whole number to the numerator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.2 · Part 1', title: 'Mixed Numbers', subtitle: 'Two ways to write the same amount' }],
      lines: [
        { say: 'Recipes and tape measures are full of fractions: two and a quarter cups of flour, or a board six and a half feet long.', show: 'title' },
        { say: 'In this video, you will switch between mixed numbers and improper fractions, the first step for working with them.' },
      ],
    },
    {
      chapter: 'Two kinds of fractions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'mixed', tone: 'definition', title: 'Mixed number', md: 'A whole number and a fraction, like $2\\tfrac14$.' },
        { kind: 'callout', id: 'improper', tone: 'definition', title: 'Improper fraction', md: 'A fraction whose numerator (top) is as big as or bigger than its denominator (bottom), like $\\tfrac94$.' },
      ],
      lines: [
        { say: 'A mixed number has a whole number and a fraction, like two and a quarter.', show: 'mixed' },
        { say: 'An improper fraction has a numerator, the top number, that is as big as or bigger than its denominator, the bottom number. Nine quarters is an improper fraction.', show: 'improper' },
      ],
    },
    {
      chapter: 'The same amount',
      layout: 'center',
      main: [
        figure('q', [strip({ name: 'a', parts: 4, shaded: 4, width: 4 }), strip({ name: 'b', parts: 4, shaded: 4, width: 4, at: [4.6, 0] }), strip({ name: 'c', parts: 4, shaded: 1, width: 4, at: [9.2, 0] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac44 + \\dfrac44 + \\dfrac14 = \\dfrac94', '2\\dfrac14 = \\dfrac94'] },
      ],
      lines: [
        { say: 'A mixed number and an improper fraction can name the same amount. Here is two and a quarter: two wholes, and one quarter of a third.', show: ['q.a-frame', 'q.a-shade', 'q.b-frame', 'q.b-shade', 'q.c-frame', 'q.c-shade'] },
        { say: 'Each whole is cut into four quarters. So two and a quarter is four quarters, plus four quarters, plus one quarter.', show: 'm.0', focus: 'm.0' },
        { say: 'That is nine quarters. So two and a quarter, and nine quarters, are the same amount.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Mixed to improper',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 4 = 8', '8 + 1 = 9', '2\\dfrac14 = \\dfrac94', '5\\dfrac23\\text{: } 5 \\times 3 + 2 = 17, \\text{ so } \\dfrac{17}{3}'] }],
      lines: [
        { say: 'There is a quick way. To write two and a quarter as an improper fraction, first multiply the whole number by the denominator: two times four is eight.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add the numerator: eight plus one is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Keep the same denominator. Two and a quarter is nine quarters.', show: 'm.2', focus: 'm.2' },
        { say: 'Try five and two thirds: five times three is fifteen, plus two is seventeen. So it is seventeen thirds.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Improper to mixed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['15 \\div 4 = 3 \\text{ with } 3 \\text{ left over}', '\\dfrac{15}{4} = 3\\dfrac34'] }],
      lines: [
        { say: 'To go back, divide. Fifteen quarters: fifteen divided by four is three, with three left over.', show: 'm.0', focus: 'm.0' },
        { say: 'The three becomes the whole number, and the three left over stays as quarters. So fifteen quarters is three and three quarters.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Adding instead of multiplying',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of multiplying', md: '$2\\tfrac14$ is **not** $\\tfrac{2 + 1}{4} = \\tfrac34$. Multiply first: $2 \\times 4 + 1 = 9$, so $2\\tfrac14 = \\tfrac94$.' }],
      lines: [
        { say: 'A common mistake is to add the whole number to the numerator. Two and a quarter is not three quarters: that is less than one! Multiply first: two times four, plus one, is nine. So two and a quarter is nine quarters.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Write $3\\tfrac58$ as an improper fraction.',
          choices: ['$\\dfrac{29}{8}$', '$\\dfrac88$', '$\\dfrac{24}{8}$', '$\\dfrac{23}{8}$'],
          answer: 0,
          working: '$3 \\times 8 = 24$, and $24 + 5 = 29$, so $3\\tfrac58 = \\tfrac{29}{8}$. B adds $3$ and $5$, and C forgets to add the $5$.',
        },
      ],
      lines: [
        { say: 'Your turn. Write three and five eighths as an improper fraction. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Three times eight is 24, and 24 plus five is 29: twenty-nine eighths. B adds the three and the five, and C forgets to add the five.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A mixed number and an improper fraction can name the same amount.', 'Mixed to improper: whole × denominator + numerator.', 'Improper to mixed: divide; the remainder stays as a fraction.'] }],
      lines: [
        { say: 'Let’s sum up. A mixed number and an improper fraction can name the same amount.', show: 'sum.0' },
        { say: 'To change a mixed number, multiply the whole number by the denominator, then add the numerator.', show: 'sum.1' },
        { say: 'And to change back, divide: the remainder stays as a fraction. In part two, we add and subtract mixed numbers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
