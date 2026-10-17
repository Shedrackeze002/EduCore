import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m301-9-counting.ts';

const letter = '\\text{letter}';
const digit = '\\text{digit}';

const video: Explainer = {
  id: 'm301-9-1-b',
  lessonId: 'm301-9-1',
  title: 'The Fundamental Counting Principle, Part 2: Repetition and Restricted Boxes',
  thumbnailTitle: 'Repetition and Restrictions',
  thumbnail: 'odd',
  summary: 'Counting licence plates with and without repetition by drawing a box for each character, why a whole number cannot start with 0 (9 × 9 × 8 × 7 = 4536 four-digit numbers with no repeated digits), and filling the most restricted box first to count 320 odd three-digit numbers. Part 3 splits counts into cases.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.1 · Part 2', title: 'Repetition and Restrictions', subtitle: 'A box for each position' }],
      lines: [
        { say: 'Licence plates, PINs and passwords are all codes, and the counting principle counts them in a few lines.', show: 'title' },
        { say: 'In this video, you will draw a box for each character, decide whether a character can be used again, and handle a box that has a rule.' },
      ],
    },
    {
      chapter: 'Repetition allowed',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'A plate has 3 letters followed by 3 digits. How many plates are possible (a) if letters and digits may repeat, and (b) if nothing may repeat?' },
        figure('s', [slots({ values: ['26', '26', '26', '10', '10', '10'], captions: [letter, letter, letter, digit, digit, digit] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['26 \\times 26 \\times 26 \\times 10 \\times 10 \\times 10 = 17\\,576\\,000'] },
      ],
      lines: [
        { say: 'A licence plate has three letters followed by three digits. How many plates are possible if letters and digits may repeat? And how many if nothing may repeat?', show: 'p' },
        { say: 'Draw one box for each character: three boxes for the letters, then three for the digits. In each box, you will write the number of choices.', show: ['s.boxes', 's.captions'] },
        { say: 'The key question is whether a character may be used again. In part a, repetition is allowed. So every letter box has twenty-six choices, and every digit box has ten.', show: 's.values', focus: 's.values' },
        { say: 'Multiply: twenty-six times twenty-six times twenty-six, times ten times ten times ten. That is 17,576,000 plates.', show: ['s.times', 'm.0'], focus: ['s', 'm.0'] },
      ],
    },
    {
      chapter: 'No repetition',
      layout: 'center',
      main: [
        figure('s', [slots({ values: ['26', '25', '24', '10', '9', '8'], captions: [letter, letter, letter, digit, digit, digit] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['26 \\times 25 \\times 24 \\times 10 \\times 9 \\times 8 = 11\\,232\\,000'] },
      ],
      lines: [
        { say: 'In part b, nothing may repeat. The first letter still has twenty-six choices.', show: ['s.boxes', 's.captions', 's.v0'], focus: 's.v0' },
        { say: 'But the second letter cannot be the letter already used, so it has twenty-five choices. And the third letter has twenty-four.', show: ['s.v1', 's.v2'], focus: ['s.v1', 's.v2'] },
        { say: 'The digits work the same way: ten choices for the first digit, then nine, then eight.', show: ['s.v3', 's.v4', 's.v5'], focus: ['s.v3', 's.v4', 's.v5'] },
        { say: 'Multiply: twenty-six times twenty-five times twenty-four, times ten times nine times eight. That is 11,232,000 plates. There are fewer than before, because each box has one fewer choice than the box before it in its group.', show: ['s.times', 'm.0'], focus: ['s', 'm.0'] },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A number cannot start with 0', md: '"How many 4-digit numbers have no repeated digits?" is **not** $10 \\times 9 \\times 8 \\times 7$. The first digit has only 9 choices (1 to 9).' },
        figure('s', [slots({ values: ['9', '9', '8', '7'], captions: ['1\\text{ to }9', '\\text{not first}', '', ''] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['9 \\times 9 \\times 8 \\times 7 = 4536'] },
      ],
      lines: [
        { say: 'Here is a common mistake. How many four-digit numbers have no repeated digits? It is tempting to write ten times nine times eight times seven.', show: 'oops' },
        { say: 'But a whole number cannot start with zero. Zero, three, five, seven is really the three-digit number 357. So the first digit has only nine choices: one to nine.', show: ['s.boxes', 's.v0', 's.c0'], focus: 's.v0' },
        { say: 'The second digit may be zero, but it cannot repeat the first digit. That leaves nine choices again.', show: ['s.v1', 's.c1'], focus: 's.v1' },
        { say: 'Then there are eight choices for the third digit, and seven for the fourth. So there are nine times nine times eight times seven, which is 4,536 numbers.', show: ['s.v2', 's.v3', 's.times', 'm.0'], focus: ['s.v2', 's.v3', 'm.0'] },
      ],
    },
    {
      chapter: 'Fill the restricted box first',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'How many odd 3-digit numbers have no repeated digits?' },
        figure('odd', [slots({ values: ['8', '8', '5'], captions: ['\\text{first}', '\\text{middle}', '\\text{last: odd}'], shade: [2] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 8 \\times 8 = 320'] },
      ],
      lines: [
        { say: 'When one position has a rule, fill that box first, even if it is not the first box. How many odd three-digit numbers have no repeated digits?', show: ['p', 'odd.boxes', 'odd.captions'] },
        { say: 'A number is odd when its last digit is odd. So start with the last box. It must be one, three, five, seven or nine: five choices.', show: ['odd.f2', 'odd.v2'], focus: 'odd.v2' },
        { say: 'Now the first digit. It cannot be zero, and it cannot be the digit already used in the last box. That leaves eight choices.', show: 'odd.v0', focus: 'odd.v0' },
        { say: 'The middle digit can be any digit not used yet. Ten digits, minus the two already used, leaves eight choices.', show: 'odd.v1', focus: 'odd.v1' },
        { say: 'Multiply: five times eight times eight is 320 odd numbers.', show: ['odd.times', 'm.0'], focus: 'm.0' },
        { say: 'If you start with the first box instead, you cannot tell whether its digit is odd, so you do not know how many choices are left for the last box. The order you fill the boxes in does not change the product, so start with the box that has the strongest rule.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many 3-digit numbers have no repeated digits?',
          choices: ['$720$', '$900$', '$504$', '$648$'],
          answer: 3,
          working: 'First digit: 1 to 9, so $9$ choices. Second: any digit except the first (0 is allowed now), so $9$. Third: $8$. So $9 \\times 9 \\times 8 = 648$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many three-digit numbers have no repeated digits? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 648. The first digit cannot be zero, so it has nine choices. The second digit may be zero, but not the first digit: nine choices. The third has eight. Nine times nine times eight is 648. Choice A, 720, forgets that a number cannot start with zero.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Draw a box for each position and write the number of choices in it.', 'Decide whether repetition is allowed. Without it, each box has one fewer choice.', 'A whole number cannot start with $0$. Fill the most restricted box first.'] }],
      lines: [
        { say: 'Let’s sum up. Draw a box for each position, and write the number of choices in it.', show: 'sum.0' },
        { say: 'Decide whether repetition is allowed. Without repetition, each box has one fewer choice than the one before it.', show: 'sum.1' },
        { say: 'A whole number cannot start with zero, and the most restricted box is filled first. In part three, we see when to add instead of multiply, by splitting a count into cases. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
