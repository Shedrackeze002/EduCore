import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-4-1',
  lessonId: 'm104-4-1',
  title: 'Integers: Below Zero',
  thumbnailTitle: 'Integers',
  thumbnail: 'nl',
  summary: 'Integers as whole numbers and their opposites, words that mean negative or positive, opposites on a number line, comparing integers (−15 < −4), and ordering bank balances and golf scores.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 4.1', title: 'Integers', subtitle: 'Numbers below zero' }],
      lines: [
        { say: 'On a January morning, it can be thirty degrees below zero. A bank account can drop below zero dollars. A diver can swim ten metres below the surface of a lake.', show: 'title' },
        { say: 'We use negative numbers to describe all of these. In this video, you will read, compare and order integers.' },
      ],
    },
    {
      chapter: 'What is an integer?',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Situation', 'Integer'], rows: [['8 degrees below zero', '$-8$'], ['A deposit of \\$50', '$+50$'], ['A withdrawal of \\$20', '$-20$'], ['A diver 12 m below the surface', '$-12$']] }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Integer', md: 'A whole number or its opposite: $\\ldots, -2, -1, 0, 1, 2, \\ldots$ A **negative** number is less than $0$. Zero is neither positive nor negative.' }],
      lines: [
        { say: 'An integer is a whole number or its opposite: no fractions or decimals. A positive number is greater than zero, and a negative number is less than zero, with a minus sign.', show: 'def' },
        { say: 'Words like below, loss, drop and withdrawal usually mean a negative number. Eight degrees below zero is negative eight, and a withdrawal of twenty dollars is negative twenty.', show: ['t.0', 't.2', 't.3'], focus: ['t.0', 't.2', 't.3'] },
        { say: 'Words like above, gain, rise and deposit usually mean a positive number. A deposit of fifty dollars is positive fifty.', show: 't.1', focus: 't.1' },
        { say: 'Do not forget the minus sign. Fifteen degrees below zero is negative fifteen. Without the sign, it would be a warm spring day.' },
      ],
    },
    {
      chapter: 'Opposites',
      layout: 'center',
      main: [
        figure('op', [numberLine({ min: -8, max: 8, step: 1, length: 16, points: [{ id: 'a', value: -5, tex: '-5', tone: 'opp' }, { id: 'b', value: 5, tex: '5', tone: 'adj' }], spans: [{ id: 'sa', from: -5, to: 0, tone: 'opp', label: '5\\text{ units}' }, { id: 'sb', from: 0, to: 5, tone: 'adj', label: '5\\text{ units}' }] })], 220),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Opposites', md: 'The same distance from $0$, on opposite sides. The opposite of $5$ is $-5$, and the opposite of $-12$ is $12$.' },
      ],
      lines: [
        { say: 'On a number line, positive integers are to the right of zero, and negative integers are to the left. A thermometer is a number line standing up: warmer is higher.', show: 'op.axis' },
        { say: 'Opposite numbers are the same distance from zero, on opposite sides. Five and negative five are both five units from zero.', show: ['op.a', 'op.b', 'op.sa', 'op.sb', 'def'] },
        { say: 'So the opposite of negative twelve is twelve.' },
      ],
    },
    {
      chapter: 'Comparing integers',
      layout: 'center',
      main: [
        figure('cmp', [numberLine({ min: -20, max: 5, step: 1, every: 5, length: 16, points: [{ id: 'fm', value: -15, tex: '-15', tone: 'adj' }, { id: 'cg', value: -4, tex: '-4', tone: 'opp' }] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['-15 < -4'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: '−15 is not bigger than −4', md: 'With negative numbers, the bigger the number after the minus sign, the smaller the value. Owing \\$15 is worse than owing \\$4.' },
      ],
      lines: [
        { say: 'On a number line, numbers get bigger as you move to the right. So the number farther right is greater.', show: 'cmp.axis' },
        { say: 'At seven in the morning, it is negative fifteen degrees in Fort McMurray, and negative four in Calgary. Negative fifteen is farther left, so it is less: Fort McMurray is colder.', show: ['cmp.fm', 'cmp.cg', 'm.0'], focus: 'm.0' },
        { say: 'Fifteen is bigger than four, but negative fifteen is less than negative four. Owing fifteen dollars is worse than owing four.', show: 'oops' },
      ],
    },
    {
      chapter: 'Ordering',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['-40 < -5 < 0 < 10 < 25', '\\text{golf: } {-5}, \\; {-3}, \\; 0, \\; {+2}'] }],
      lines: [
        { say: 'To put integers in order, picture them on a number line. Bank balances of 25 dollars, negative forty, zero, negative five and ten dollars go: negative forty, negative five, zero, ten, then 25.', show: 'm.0', focus: 'm.0' },
        { say: 'In golf, the lowest score wins. Scores of negative three, positive two, zero and negative five go from negative five, the winner, up to positive two, last place.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which temperature is the coldest?',
          choices: ['$-12^\\circ\\text{C}$', '$-3^\\circ\\text{C}$', '$0^\\circ\\text{C}$', '$5^\\circ\\text{C}$'],
          answer: 0,
          working: '$-12$ is farthest left on a number line, so it is the least, and the coldest.',
        },
      ],
      lines: [
        { say: 'Your turn. Which temperature is the coldest? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A, negative twelve degrees. It is farthest left on a number line, so it is the least. B is closer to zero, so it is warmer.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Below, loss, drop and withdrawal are negative.', 'Opposites are the same distance from $0$.', 'Farther right is greater: $-15 < -4$.'] }],
      lines: [
        { say: 'Let’s sum up. Below zero, a loss, a drop or a withdrawal is negative.', show: 'sum.0' },
        { say: 'Opposites are the same distance from zero, on opposite sides.', show: 'sum.1' },
        { say: 'And on a number line, the number farther right is greater. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
