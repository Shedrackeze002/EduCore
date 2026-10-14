import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-6-3-b',
  lessonId: 'm104-6-3',
  title: 'Time and Temperature, Part 2: Reading Temperatures',
  thumbnailTitle: 'Reading Temperatures',
  thumbnail: 'nl',
  summary: 'Degrees Celsius and temperature referents, reading a temperature below zero on a number line with a scale of 2 degrees, and finding a rise across zero by counting to 0 and past it.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 6.3 · Part 2', title: 'Reading Temperatures', subtitle: 'Above and below zero' }],
      lines: [
        { say: 'How much colder will it be tonight? How much warmer after a chinook? Temperature questions come up every day in Alberta.', show: 'title' },
        { say: 'In this video, you will read temperatures, and find changes across zero.' },
      ],
    },
    {
      chapter: 'Degrees Celsius',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Temperature', 'What it feels like'], rows: [['$-30^\\circ\\text{C}$', 'a very cold January night'], ['$0^\\circ\\text{C}$', 'water freezes'], ['$4^\\circ\\text{C}$', 'inside a fridge'], ['$21^\\circ\\text{C}$', 'a comfortable room'], ['$30^\\circ\\text{C}$', 'a hot summer day']] }],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Degrees Celsius', md: 'Water freezes at $0^\\circ\\text{C}$ and boils at $100^\\circ\\text{C}$. Temperatures below zero are negative.' }],
      lines: [
        { say: 'In Canada, temperature is measured in degrees Celsius. Water freezes at zero degrees, and boils at 100. Temperatures below zero are negative, like negative twenty.', show: 'def' },
        { say: 'Referents help you picture a temperature. Inside a fridge is about four degrees, a comfortable room is about 21, and a hot summer day is about thirty.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
      ],
    },
    {
      chapter: 'Reading below zero',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: -14, max: 6, step: 2, length: 15, points: [{ id: 'p', value: -9, tex: '7\\text{ a.m.}', tone: 'adj' }] })], 200),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the minus sign', md: '$9^\\circ\\text{C}$ is a cool spring day. $-9^\\circ\\text{C}$ is a cold winter morning. Check which side of $0$ you are on.' },
      ],
      lines: [
        { say: 'A thermometer is like a number line standing up. On this number line, each tick is two degrees.', show: 'nl.axis' },
        { say: 'At seven in the morning, the dot is halfway between negative ten and negative eight. Halfway between them is negative nine, so it is negative nine degrees.', show: 'nl.p', focus: 'nl.p' },
        { say: 'Nine degrees is a cool spring day, but negative nine is a cold winter morning. Always check which side of zero you are on.', show: 'oops' },
      ],
    },
    {
      chapter: 'Changes across zero',
      layout: 'center',
      main: [
        figure('ch', [numberLine({ min: -15, max: 10, step: 5, length: 15, points: [{ id: 'a', value: -14, tex: '-14', tone: 'adj' }, { id: 'b', value: 5, tex: '5', tone: 'opp' }], spans: [{ id: 's1', from: -14, to: 0, tone: 'adj', label: '+14' }, { id: 's2', from: 0, to: 5, tone: 'opp', label: '+5' }] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['14 + 5 = 19 \\text{ degrees}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting without the signs', md: '$14 - 5 = 9$ is wrong here. The temperatures are on opposite sides of $0$, so the distances add.' },
      ],
      lines: [
        { say: 'To find how much the temperature rose or dropped, find the distance between the two temperatures. When one is below zero and one is above, count to zero first.', show: 'ch.axis' },
        { say: 'In Lethbridge it was negative fourteen degrees at six in the morning. A chinook blew in, and by three in the afternoon it was five degrees.', show: ['ch.a', 'ch.b'] },
        { say: 'From negative fourteen up to zero is fourteen degrees, and from zero up to five is five more. So the temperature rose nineteen degrees.', show: ['ch.s1', 'ch.s2', 'm.0'], focus: 'm.0' },
        { say: 'Fourteen minus five, nine, is wrong here. The temperatures are on opposite sides of zero, so the distances add.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'It was $3^\\circ\\text{C}$ at noon and $-8^\\circ\\text{C}$ at midnight. How many degrees did the temperature drop?',
          choices: ['$11$', '$5$', '$-5$', '$8$'],
          answer: 0,
          working: 'From $3$ down to $0$ is $3$ degrees, and from $0$ down to $-8$ is $8$ more: $3 + 8 = 11$.',
        },
      ],
      lines: [
        { say: 'Your turn. It was three degrees at noon, and negative eight at midnight. How many degrees did the temperature drop? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. From three down to zero is three degrees, and from zero down to negative eight is eight more: eleven degrees. B subtracts the numbers without their signs.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Temperatures below $0^\\circ\\text{C}$ are negative.', 'Check the scale of a thermometer or number line.', 'Across zero: count to $0$, then past it, and add.'] }],
      lines: [
        { say: 'Let’s sum up. Temperatures below zero degrees are negative.', show: 'sum.0' },
        { say: 'Check the scale of a thermometer or number line before you read it.', show: 'sum.1' },
        { say: 'And to find a change across zero, count to zero, then past it, and add the two parts. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
