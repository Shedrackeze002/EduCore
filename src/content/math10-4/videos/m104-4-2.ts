import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-4-2',
  lessonId: 'm104-4-2',
  title: 'Adding and Subtracting Integers',
  thumbnailTitle: 'Adding Integers',
  thumbnail: 'nl',
  summary: 'Adding integers on a number line (right for positive, left for negative), the sign rules, subtracting by adding the opposite, the rise in temperature during a chinook, and tracking a bank balance through several changes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 4.2', title: 'Adding and Subtracting Integers', subtitle: 'Keeping track of changes' }],
      lines: [
        { say: 'The temperature is negative six degrees at sunrise, and warms up ten degrees by noon. Your bank balance drops below zero after groceries. To keep track of changes like these, you add and subtract integers.', show: 'title' },
      ],
    },
    {
      chapter: 'On a number line',
      layout: 'center',
      main: [
        figure('a', [numberLine({ min: -8, max: 8, step: 1, length: 16, points: [{ id: 's', value: -6, tex: '-6', tone: 'opp' }, { id: 'e', value: 4, tex: '4', tone: 'good' }], spans: [{ id: 'jump', from: -6, to: 4, tone: 'adj', label: '+10' }] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['-6 + 10 = 4', '3 + (-7) = -4'] },
      ],
      lines: [
        { say: 'Start at the first number. Adding a positive number moves right, and adding a negative number moves left.', show: 'a.axis' },
        { say: 'Negative six plus ten: start at negative six, and move ten steps to the right. You land on four.', show: ['a.s', 'a.jump', 'a.e', 'm.0'], focus: 'm.0' },
        { say: 'Three plus negative seven: start at three, and move seven steps to the left. You land on negative four.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Sign rules',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Same signs:** add the sizes and keep the sign. $-9 + (-6) = -15$', '**Different signs:** subtract the sizes, and use the sign of the bigger size. $-14 + 9 = -5$'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['-4 - 5 = -4 + (-5) = -9', '7 - (-3) = 7 + 3 = 10'] },
      ],
      lines: [
        { say: 'For bigger numbers, use rules. With the same signs, add the sizes and keep the sign: negative nine plus negative six is negative fifteen.', show: 'b.0' },
        { say: 'With different signs, subtract the sizes, and use the sign of the bigger size: negative fourteen plus nine is negative five.', show: 'b.1' },
        { say: 'To subtract an integer, add its opposite. Negative four minus five is negative four plus negative five: negative nine.', show: 'm.0', focus: 'm.0' },
        { say: 'And seven minus negative three is seven plus three: ten. If someone cancels a three-dollar debt you owe, you are three dollars better off.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A chinook',
      layout: 'center',
      main: [
        figure('ch', [numberLine({ min: -20, max: 10, step: 1, every: 5, length: 16, points: [{ id: 'b', value: -18, tex: '-18', tone: 'adj' }, { id: 'a', value: 7, tex: '7', tone: 'opp' }], spans: [{ id: 's1', from: -18, to: 0, tone: 'adj', label: '+18' }, { id: 's2', from: 0, to: 7, tone: 'opp', label: '+7' }] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['7 - (-18) = 7 + 18 = 25'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting only the digits', md: '$18 - 7 = 11$ is **not** the change. It climbs $18$ degrees just to reach $0$, then $7$ more.' },
      ],
      lines: [
        { say: 'A change is the higher number minus the lower one. A chinook is a warm winter wind. When one blew into Calgary, the temperature rose from negative eighteen to seven degrees.', show: ['ch.axis', 'ch.b', 'ch.a'] },
        { say: 'The rise is seven minus negative eighteen, which is seven plus eighteen: 25 degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'Check by counting through zero: eighteen degrees up to zero, then seven more. That is 25. Eighteen minus seven, eleven, is not the change.', show: ['ch.s1', 'ch.s2', 'oops'] },
      ],
    },
    {
      chapter: 'A bank account',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['Transaction', 'Amount'], rows: [['Starting balance', '\\$85'], ['Groceries', '−\\$120'], ['Paycheque', '+\\$200'], ['Gas', '−\\$45']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['85 - 120 = -35', '-35 + 200 = 165', '165 - 45 = 120'] }],
      lines: [
        { say: 'For several changes, go one step at a time. Malik starts the week with 85 dollars. After 120 dollars of groceries, the balance is negative 35: the account is overdrawn.', show: ['t.0', 't.1', 'm.0'], focus: 'm.0' },
        { say: 'His 200-dollar paycheque brings it to 165 dollars.', show: ['t.2', 'm.1'], focus: 'm.1' },
        { say: 'And after 45 dollars of gas, the balance at the end of the week is 120 dollars.', show: ['t.3', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The temperature is $-9^\\circ\\text{C}$ at night and $4^\\circ\\text{C}$ the next afternoon. By how many degrees did it rise?',
          choices: ['$13$', '$5$', '$-5$', '$-13$'],
          answer: 0,
          working: 'Rise = higher − lower: $4 - (-9) = 4 + 9 = 13$ degrees.',
        },
      ],
      lines: [
        { say: 'Your turn. It is negative nine degrees at night, and four degrees the next afternoon. By how many degrees did it rise? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four minus negative nine is four plus nine: thirteen degrees. Nine degrees up to zero, then four more. B subtracts only the digits.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add a positive: move right. Add a negative: move left.', 'To subtract, add the opposite: $7 - (-3) = 10$.', 'A change is higher − lower. Count through $0$ to check.'] }],
      lines: [
        { say: 'Let’s sum up. Adding a positive moves right on a number line, and adding a negative moves left.', show: 'sum.0' },
        { say: 'To subtract, add the opposite: seven minus negative three is ten.', show: 'sum.1' },
        { say: 'And a change is the higher number minus the lower one. Count through zero to check. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
