import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-2',
  lessonId: 'm204-5-2',
  title: 'Solving Equations, Part 1: Inverse Operations',
  thumbnailTitle: 'Inverse Operations',
  thumbnail: 't',
  summary: 'What an equation and solving it mean, inverse operations (add and subtract, multiply and divide undo each other), keeping an equation balanced, and solving the one-step equations x + 7 = 15 (x = 8) and 4n = 36 (n = 9) with a check.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.2 · Part 1', title: 'Inverse Operations', subtitle: 'Undo to solve' }],
      lines: [
        { say: 'You know you earned 612 dollars fifty this pay period, at seventeen fifty an hour. How many hours were you paid for? To answer, you use the pay formula backwards, by solving an equation.', show: 'title' },
        { say: 'In this video, you will review equations and inverse operations, and solve one-step equations, with a check each time.' },
      ],
    },
    {
      chapter: 'Equations and inverse operations',
      layout: 'split',
      leftWidth: 640,
      left: [
        { kind: 'callout', id: 'eq', tone: 'definition', title: 'Equation', md: 'An **equation** is a math sentence with an equal sign, such as $x + 7 = 15$. To **solve** it means to find the number that makes it true.' },
        { kind: 'callout', id: 'inv', tone: 'definition', title: 'Inverse operation', md: 'An **inverse operation** undoes another operation.' },
      ],
      right: [{ kind: 'table', id: 't', head: ['To undo...', 'use...'], rows: [['$+$ (add)', '$-$ (subtract)'], ['$-$ (subtract)', '$+$ (add)'], ['$\\times$ (multiply)', '$\\div$ (divide)'], ['$\\div$ (divide)', '$\\times$ (multiply)']] }],
      lines: [
        { say: 'An equation is a math sentence with an equal sign, such as x plus seven equals fifteen. To solve it means to find the number that makes it true.', show: 'eq' },
        { say: 'An inverse operation undoes another operation.', show: 'inv' },
        { say: 'Adding and subtracting undo each other. Multiplying and dividing undo each other.', show: 't' },
        { say: 'An equation is like a balance. Whatever you do to one side, do the same to the other side, so it stays balanced.' },
      ],
    },
    {
      chapter: 'One step: adding',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['x + 7 = 15', 'x + 7 - 7 = 15 - 7', 'x = 8', '\\text{Check: } 8 + 7 = 15'] }],
      lines: [
        { say: 'Solve x plus seven equals fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Seven is added to x. To undo plus seven, subtract seven from both sides.', show: 'm.1', focus: 'm.1' },
        { say: 'On the left, plus seven minus seven cancels, leaving x. On the right, fifteen minus seven is eight. So x equals eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Check by putting eight back in: eight plus seven is fifteen. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'One step: multiplying',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4n = 36', 'n = 36 \\div 4', 'n = 9', '\\text{Check: } 4 \\times 9 = 36'] }],
      lines: [
        { say: 'Now solve four n equals 36. Four n means four times n.', show: 'm.0', focus: 'm.0' },
        { say: 'To undo times four, divide both sides by four.', show: 'm.1', focus: 'm.1' },
        { say: '36 divided by four is nine, so n equals nine.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: four times nine is 36. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'One step: dividing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{m}{5} = 6', 'm = 6 \\times 5', 'm = 30', '\\text{Check: } 30 \\div 5 = 6'] }],
      lines: [
        { say: 'One more: solve m divided by five equals six.', show: 'm.0', focus: 'm.0' },
        { say: 'm is divided by five. To undo dividing by five, multiply both sides by five.', show: 'm.1', focus: 'm.1' },
        { say: 'Six times five is thirty, so m equals thirty.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: thirty divided by five is six. It works.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $y - 9 = 14$.',
          choices: ['$y = 23$', '$y = 5$', '$y = -23$', '$y = 126$'],
          answer: 0,
          working: 'To undo $-\\ 9$, add $9$ to both sides: $y = 14 + 9 = 23$. Check: $23 - 9 = 14$. B subtracts instead of adding.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve y minus nine equals fourteen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. To undo minus nine, add nine to both sides: y equals fourteen plus nine, which is 23. Check: 23 minus nine is fourteen. B subtracts nine again instead of adding it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Inverse operations undo each other.', 'Do the same thing to both sides.', 'Check by putting the answer back in.'] }],
      lines: [
        { say: 'Let’s sum up. Inverse operations undo each other: add and subtract, multiply and divide.', show: 'sum.0' },
        { say: 'Do the same thing to both sides, so the equation stays balanced.', show: 'sum.1' },
        { say: 'And check by putting your answer back in. In part two, we solve two-step equations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
