import type { Explainer } from '@/video/script.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-3-1',
  lessonId: 'm104-3-1',
  title: 'Decimals and Money, Part 1: Place Value, Adding and Subtracting',
  thumbnailTitle: 'Decimals',
  thumbnail: 'nl',
  summary: 'Tenths and hundredths, reading a gas price to the thousandth of a dollar, rounding money to the nearest cent, and adding and subtracting decimals by lining up the decimal points. Part 2 multiplies, divides and makes change.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 3.1 · Part 1', title: 'Decimals', subtitle: 'Tenths, hundredths and lining up the points' }],
      lines: [
        { say: 'Money, tape measures and gas pumps all use decimals. At work, you might run a cash register, or cut pipe to length.', show: 'title' },
        { say: 'In this video, you will read decimals, and add and subtract them.' },
      ],
    },
    {
      chapter: 'Tenths and hundredths',
      layout: 'center',
      main: [
        figure('nl', [numberLine({ min: 0, max: 1, step: 0.1, length: 15, points: [{ id: 'p', value: 0.75, tex: '0.75', tone: 'adj' }] })], 200),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Decimal', md: 'A number with a decimal point, like $4.75$. The first place after the point is **tenths**, and the second is **hundredths**.' },
      ],
      lines: [
        { say: 'A decimal is a number with a decimal point, like 4.75. The digits after the point are parts of one whole.', show: 'def' },
        { say: 'The first place after the point is tenths: 0.1 is one tenth. The second place is hundredths: 0.01 is one hundredth.' },
        { say: 'On this number line, each small step is one tenth. The dot at 0.75 sits halfway between 0.7 and 0.8.', show: ['nl.axis', 'nl.p'] },
        { say: 'Money uses hundredths. One cent is one hundredth of a dollar, so 4.75 dollars means four dollars and 75 cents.' },
      ],
    },
    {
      chapter: 'Reading a gas price',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Ones', 'Tenths', 'Hundredths', 'Thousandths'], rows: [['$1$', '$4$', '$5$', '$9$']] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Money has two decimal places', md: 'Write \\$6.50, not \\$6.5. To round to the nearest cent, look at the third decimal place.' },
      ],
      lines: [
        { say: 'A sign says gas costs 1.459 dollars per litre. The one is one whole dollar. The four is four tenths of a dollar, forty cents, and the five is five hundredths, five cents.', show: 't.0' },
        { say: 'The nine is nine thousandths of a dollar: less than one cent. So gas costs a little less than 1.46 dollars a litre.', focus: 't.0' },
        { say: 'Write money with two decimal places. To round money to the nearest cent, look at the third decimal place. If it is five or more, round up. If it is four or less, round down.', show: 'tip' },
      ],
    },
    {
      chapter: 'Adding and subtracting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2.40 + 1.35 + 0.80 = 4.55\\text{ m}', '3.20 - 1.45 = 1.75\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Lining up the last digits', md: 'Lining up the last digits of $2.4 + 1.35$ gives $1.59$, less than $2.4$ alone. Line up the **decimal points**: $2.40 + 1.35 = 3.75$.' },
      ],
      lines: [
        { say: 'To add or subtract decimals, line up the decimal points. Fill any empty places with zeros, then add or subtract like whole numbers.' },
        { say: 'A plumber needs pipes 2.4, 1.35 and 0.8 metres long. Give each two decimal places: 2.40, 1.35 and 0.80. The total is 4.55 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Jordan cuts 1.45 metres off a board 3.2 metres long. Write 3.2 as 3.20, then subtract: 1.75 metres is left.', show: 'm.1', focus: 'm.1' },
        { say: 'If you line up the last digits instead of the points, 2.4 plus 1.35 gives 1.59. That is less than 2.4 alone, so it cannot be right.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $5.6 - 2.35$.',
          choices: ['$3.25$', '$3.35$', '$2.21$', '$3.31$'],
          answer: 0,
          working: 'Write $5.6$ as $5.60$, line up the points, and subtract: $5.60 - 2.35 = 3.25$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find 5.6 minus 2.35. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Write 5.6 as 5.60, line up the decimal points, and subtract: 3.25. C lines up the last digits instead of the points.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Tenths, then hundredths. One cent is one hundredth of a dollar.', 'Round money to two decimal places.', 'Line up the decimal points, and fill empty places with zeros.'] }],
      lines: [
        { say: 'Let’s sum up. Tenths are the first place after the point, and hundredths the second. One cent is one hundredth of a dollar.', show: 'sum.0' },
        { say: 'Round money to the nearest cent: two decimal places.', show: 'sum.1' },
        { say: 'And to add or subtract decimals, line up the decimal points. In part two, we multiply, divide and make change. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
