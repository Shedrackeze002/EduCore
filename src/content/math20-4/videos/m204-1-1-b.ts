import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-1-b',
  lessonId: 'm204-1-1',
  title: 'Integers and the Order of Operations, Part 2: The Order of Operations',
  thumbnailTitle: 'The Order of Operations',
  thumbnail: 'b',
  summary: 'The order of operations (BEDMAS) with integers: multiply before you add in −7 + 4 × (−2) = −15, brackets first in (−10 + 4) ÷ (−3) = 2, an exponent before multiplying, and the mistake of working left to right.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.1 · Part 2', title: 'The Order of Operations', subtitle: 'Which step comes first?' }],
      lines: [
        { say: 'What is negative seven plus four times negative two? Add first, and you get one answer. Multiply first, and you get another. Everyone needs to agree on the order.', show: 'title' },
        { say: 'In this video, you will use the order of operations with integers.' },
      ],
    },
    {
      chapter: 'BEDMAS',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**B**rackets', '**E**xponents (powers)', '**D**ivide and **M**ultiply, from left to right', '**A**dd and **S**ubtract, from left to right'] }],
      lines: [
        { say: 'The order of operations tells you which step to do first. First, work out anything in brackets.', show: 'b.0' },
        { say: 'Second, exponents, or powers.', show: 'b.1' },
        { say: 'Third, divide and multiply, working from left to right.', show: 'b.2' },
        { say: 'And last, add and subtract, from left to right. Many people remember the order with the first letters: B, E, D, M, A, S.', show: 'b.3' },
      ],
    },
    {
      chapter: 'Multiply before you add',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-7 + 4 \\times (-2)', '= -7 + (-8)', '= -15'] }],
      lines: [
        { say: 'Calculate negative seven plus four times negative two.', show: 'm.0', focus: 'm.0' },
        { say: 'There are no brackets to work out and no exponents, so multiply first. Four times negative two is negative eight, because the signs are different.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: negative seven plus negative eight is negative fifteen.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Going left to right',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Going left to right', md: 'In $-7 + 4 \\times (-2)$, adding first gives $-3 \\times (-2) = 6$. That is wrong. Multiply and divide **before** you add and subtract.' }],
      lines: [
        { say: 'A common mistake is to work from left to right. Adding first gives negative three, times negative two, which is six. That is wrong. Multiply and divide before you add and subtract.', show: 'oops' },
      ],
    },
    {
      chapter: 'Brackets first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['(-10 + 4) \\div (-3)', '= (-6) \\div (-3)', '= 2'] }],
      lines: [
        { say: 'Calculate negative ten plus four, in brackets, divided by negative three.', show: 'm.0', focus: 'm.0' },
        { say: 'Brackets come first. Negative ten plus four is negative six.', show: 'm.1', focus: 'm.1' },
        { say: 'Then divide: negative six divided by negative three is positive two, because the signs are the same.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Left to right',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-12 \\div 4 \\times 2', '= -3 \\times 2', '= -6'] }],
      lines: [
        { say: 'Divide and multiply are on the same level, so do them in order, from left to right. Calculate negative twelve divided by four, times two.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide first, because it comes first: negative twelve divided by four is negative three.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply: negative three times two is negative six. Multiplying first would give negative twelve divided by eight, a different answer.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An exponent',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-20 + 2 \\times 3^2', '= -20 + 2 \\times 9', '= -20 + 18', '= -2'] }],
      lines: [
        { say: 'Here is one with an exponent: negative twenty plus two times three squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Exponents come before multiplying. Three squared is three times three: nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply: two times nine is eighteen.', show: 'm.2', focus: 'm.2' },
        { say: 'And last, add: negative twenty plus eighteen is negative two.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Calculate $6 + (-12) \\div 3$.',
          choices: ['$2$', '$-2$', '$-6$', '$10$'],
          answer: 0,
          working: 'Divide first: $(-12) \\div 3 = -4$. Then add: $6 + (-4) = 2$. B adds first, working left to right.',
        },
      ],
      lines: [
        { say: 'Your turn. Calculate six plus negative twelve divided by three. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide first: negative twelve divided by three is negative four. Then add: six plus negative four is two. B adds first, working left to right.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Brackets, then exponents.', 'Then divide and multiply, left to right.', 'Then add and subtract, left to right.'] }],
      lines: [
        { say: 'Let’s sum up. Work out brackets first, then exponents.', show: 'sum.0' },
        { say: 'Then divide and multiply, from left to right.', show: 'sum.1' },
        { say: 'And last, add and subtract, from left to right. In part three, we use integers for averages and money owed. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
