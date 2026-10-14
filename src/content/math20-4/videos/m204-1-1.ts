import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-1-1',
  lessonId: 'm204-1-1',
  title: 'Integers and the Order of Operations, Part 1: Working with Integers',
  thumbnailTitle: 'Working with Integers',
  thumbnail: 'nl',
  summary: 'What integers are, adding on a number line (−6 + 9 = 3 for a warming morning in Red Deer), why subtracting a negative means adding, and the sign rules for multiplying and dividing (5 × (−3) = −15 and (−36) ÷ (−4) = 9).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.1 · Part 1', title: 'Working with Integers', subtitle: 'Below zero and back' }],
      lines: [
        { say: 'On a January night in Grande Prairie, the temperature can fall to negative thirty degrees Celsius. When you owe someone money, your balance is below zero too. Integers help you work with both.', show: 'title' },
        { say: 'In this video, you will add, subtract, multiply and divide integers.' },
      ],
    },
    {
      chapter: 'Integers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Integer', md: 'A whole number that is positive, negative or zero, such as $-8$, $0$ and $15$. Negative numbers are less than zero.' },
        figure('nl', [numberLine({ min: -8, max: 8, step: 1, length: 16 })], 140),
      ],
      lines: [
        { say: 'An integer is a whole number that is positive, negative or zero, such as negative eight, zero, and fifteen.', show: 'def' },
        { say: 'On a number line, negative numbers sit to the left of zero, and they are less than zero. The further left, the smaller the number: negative eight is less than negative two.', show: 'nl.axis' },
      ],
    },
    {
      chapter: 'A cold morning',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'At 7 a.m. it is $-6^\\circ\\text{C}$. By noon it is $9$ degrees warmer.', size: 'md' },
        figure('cm', [numberLine({ min: -8, max: 8, step: 1, length: 16, points: [{ id: 'start', value: -6, tex: '\\text{start}', tone: 'adj' }, { id: 'end', value: 3, tex: '\\text{noon}', tone: 'good' }], spans: [{ id: 'move', from: -6, to: 3, tone: 'opp', label: '+9' }] })], 170),
        { kind: 'math', id: 'm', size: 'md', lines: ['-6 + 9 = 3'] },
      ],
      lines: [
        { say: 'At 7 a.m. in Red Deer, it is negative six degrees. By noon, it is nine degrees warmer. What is the temperature at noon?', show: 'q' },
        { say: 'Warmer means add: negative six plus nine. On a number line, adding a positive number moves you right. Start at negative six.', show: ['cm.axis', 'cm.start'], focus: 'cm.start' },
        { say: 'Now move nine steps to the right. You land on three.', show: ['cm.move', 'cm.end'], focus: 'cm.end' },
        { say: 'So negative six plus nine is three: at noon, it is three degrees. Adding a negative number works the other way: it moves you left.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Subtracting a negative',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting a negative', md: '$5 - (-3)$ is **not** $2$. Taking away a negative is the same as adding: $5 - (-3) = 5 + 3 = 8$.' }],
      lines: [
        { say: 'A common mistake is with subtracting a negative. Five minus negative three is not two. Taking away a negative is the same as adding, so five minus negative three is five plus three: eight.', show: 'oops' },
        { say: 'Think of a debt. If someone takes away three dollars that you owe, you are three dollars better off.' },
      ],
    },
    {
      chapter: 'Multiplying and dividing',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Signs', 'Answer', 'Example'], rows: [['$+$ and $+$', 'positive', '$4 \\times 3 = 12$'], ['$-$ and $-$', 'positive', '$(-4) \\times (-3) = 12$'], ['$+$ and $-$', 'negative', '$4 \\times (-3) = -12$'], ['$-$ and $+$', 'negative', '$(-12) \\div 3 = -4$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A short rule', md: '**Same signs: positive. Different signs: negative.** The rule is the same for multiplying and dividing.' },
      ],
      lines: [
        { say: 'To multiply or divide two integers, work out the number first, without the signs. Then decide the sign.', show: 't' },
        { say: 'Two positives, or two negatives, give a positive answer.', focus: ['t.0', 't.1'] },
        { say: 'A positive and a negative give a negative answer.', focus: ['t.2', 't.3'] },
        { say: 'In short: same signs, positive. Different signs, negative. The rule is the same for multiplying and dividing.', show: 'tip' },
      ],
    },
    {
      chapter: 'A cold front',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['5 \\times 3 = 15', '5 \\times (-3) = -15', '(-36) \\div (-4) = 9'] }],
      lines: [
        { say: 'The temperature in Lethbridge drops three degrees every hour for five hours. What is the total change? A drop of three degrees is a change of negative three. Multiply without the signs: five times three is fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'The signs are different, so the answer is negative: five times negative three is negative fifteen. The total change is negative fifteen degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'Now divide negative 36 by negative four. Without the signs, 36 divided by four is nine. The signs are the same, so the answer is positive nine.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The temperature drops $2$ degrees every hour for $6$ hours. What is the total change?',
          choices: ['$-12$ degrees', '$12$ degrees', '$-8$ degrees', '$4$ degrees'],
          answer: 0,
          working: 'A drop of $2$ is $-2$, and $6 \\times (-2) = -12$. B forgets that a drop is negative.',
        },
      ],
      lines: [
        { say: 'Your turn. The temperature drops two degrees every hour, for six hours. What is the total change? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A drop of two is negative two, and six times negative two is negative twelve, because the signs are different. B forgets that a drop is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Adding a positive moves right; adding a negative moves left.', 'Subtracting a negative is the same as adding.', 'Multiply or divide: same signs positive, different signs negative.'] }],
      lines: [
        { say: 'Let’s sum up. On a number line, adding a positive moves you right, and adding a negative moves you left.', show: 'sum.0' },
        { say: 'Subtracting a negative is the same as adding.', show: 'sum.1' },
        { say: 'And to multiply or divide, same signs give a positive answer, and different signs give a negative one. In part two, we use the order of operations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
