import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-1-1-b',
  lessonId: 'm104-1-1',
  title: 'Place Value, Part 2: Comparing and Rounding',
  thumbnailTitle: 'Comparing and Rounding',
  thumbnail: 'nl',
  summary: 'Comparing whole numbers by counting digits and then comparing from the left, and rounding to the nearest ten, hundred or thousand, including rounding up past a 9, and the range of numbers that round to a given value.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.1 · Part 2', title: 'Comparing and Rounding', subtitle: 'Which is bigger, and about how much?' }],
      lines: [
        { say: 'Which used truck has gone farther? About how many people came to the game? Comparing and rounding answer questions like these.', show: 'title' },
        { say: 'In this video, you will compare whole numbers, and round them.' },
      ],
    },
    {
      chapter: 'Comparing numbers',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['Count the digits. **More** digits means a larger number.', 'Same number of digits? Compare from the **left**. The first place that differs decides.'] },
        { kind: 'table', id: 't', head: ['Truck', 'Ten thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'], rows: [['A', '4', '8', '[[good:2]]', '1', '5'], ['B', '4', '8', '[[bad:1]]', '5', '2']] },
      ],
      lines: [
        { say: 'To compare two whole numbers, first count the digits. The number with more digits is larger.', show: 'b.0' },
        { say: 'If they have the same number of digits, compare from the left. The first place where the digits are different decides.', show: 'b.1' },
        { say: 'Truck "A" has 48,215 kilometres on its odometer, and truck B has 48,152. Line the numbers up, one under the other.', show: ['t.0', 't.1'] },
        { say: 'Both have five digits. The ten thousands and the thousands are the same. In the hundreds, two is more than one, so truck "A" has gone farther.', focus: ['t.0', 't.1'] },
      ],
    },
    {
      chapter: 'Rounding',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: 340, max: 350, step: 1, length: 14, points: [{ id: 'p', value: 347, tex: '347', tone: 'adj' }, { id: 'up', value: 350, tex: '350', tone: 'good' }] })], 220),
        { kind: 'bullets', id: 'b', items: ['Find the digit in the rounding place.', 'Look at the digit just to its **right**.', '$5$ or more: round **up**. $4$ or less: round **down**.', 'Every digit after the rounding place becomes $0$.'] },
      ],
      lines: [
        { say: 'Sometimes an exact number is more than you need. A news report might say about 4,000 people, instead of 3,962. To round is to replace a number with a nearby one that is easier to use.' },
        { say: 'On this number line, 347 is between 340 and 350, and it is closer to 350. So 347 rounded to the nearest ten is 350.', show: ['nl.axis', 'nl.p', 'nl.up'] },
        { say: 'Here is how to round. Find the digit in the place you are rounding to, and look at the digit just to its right.', show: ['b.0', 'b.1'] },
        { say: 'If that digit is five or more, round up. If it is four or less, round down. Every digit after the rounding place becomes zero.', show: ['b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'Rounding examples',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2{,}\\underline{6}48 \\;\\to\\; 2{,}600', '3\\underline{9}{,}762 \\;\\to\\; 40{,}000'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Looking at the wrong digit', md: 'To round to the nearest **hundred**, look at the **tens** digit, not the ones digit.' },
      ],
      lines: [
        { say: 'Round 2,648 to the nearest hundred. The hundreds digit is six, and the digit to its right is four. Four is four or less, so round down: 2,600.', show: 'm.0', focus: 'm.0' },
        { say: 'An odometer reads 39,762 kilometres. Round it to the nearest thousand. The thousands digit is nine, and the digit to its right is seven, so round up. One more thousand than 39,000 is 40,000.', show: 'm.1', focus: 'm.1' },
        { say: 'Be careful: to round to the nearest hundred, look at the tens digit, not the ones digit.', show: 'oops' },
        { say: 'You can also work backwards. If a report says 4,500 people came, to the nearest hundred, the real crowd could be anything from 4,450 to 4,549.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Round $7{,}952$ to the nearest hundred.',
          choices: ['$8{,}000$', '$7{,}900$', '$7{,}950$', '$7{,}000$'],
          answer: 0,
          working: 'The hundreds digit is $9$ and the digit to its right is $5$, so round up. One more hundred than $7{,}900$ is $8{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. Round 7,952 to the nearest hundred. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The hundreds digit is nine, and the digit to its right is five, so round up. One more hundred than 7,900 is 8,000. B rounds down, and C rounds to the nearest ten.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Compare: count the digits, then compare from the left.', 'Round: look at the digit just to the right of the rounding place.', '$5$ or more rounds up. $4$ or less rounds down.'] }],
      lines: [
        { say: 'Let’s sum up. To compare, count the digits first, then compare from the left.', show: 'sum.0' },
        { say: 'To round, look at the digit just to the right of the rounding place.', show: 'sum.1' },
        { say: 'Five or more rounds up, and four or less rounds down. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
