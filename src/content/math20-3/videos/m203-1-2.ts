import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-1-2',
  lessonId: 'm203-1-2',
  title: 'Rate of Change, Part 1: Rate of Change from a Table',
  thumbnailTitle: 'Rate of Change from a Table',
  thumbnail: 't',
  summary: 'Rate of change as change in output over change in input, with units, the −4.5 L/h rate for the fuel in a generator’s tank, checking that a rate is constant with two other rows, and why both subtractions must go in the same order.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.2 · Part 1', title: 'Rate of Change from a Table', subtitle: 'A slope with units' }],
      lines: [
        { say: 'How fast does a generator burn fuel? How much does each extra kilometre of a rental cost? Both questions ask for a rate of change, and a rate of change is just a slope with units.', show: 'title' },
        { say: 'In this video, you will find a rate of change from a table, and get its sign right.' },
      ],
    },
    {
      chapter: 'Rate of change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rate of change', md: 'A **rate of change** compares how much one quantity changes for each unit of change in another. Its units are output units **per** input unit, such as litres per hour or dollars per kilometre.' },
        { kind: 'math', id: 'm', size: 'lg', lines: ['\\text{rate of change} = \\dfrac{\\text{change in output}}{\\text{change in input}}'] },
      ],
      lines: [
        { say: 'A rate of change compares how much one quantity changes for each unit of change in another.', show: 'def' },
        { say: 'It is the change in the output, divided by the change in the input. Its units are output units per input unit, such as litres per hour, or dollars per kilometre.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Fuel in a generator',
      layout: 'split',
      leftWidth: 560,
      left: [{ kind: 'table', id: 't', head: ['Time running (h)', 'Fuel in tank (L)'], rows: [['$0$', '$120$'], ['$2$', '$111$'], ['$5$', '$97.5$'], ['$8$', '$84$']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{111 - 120}{2 - 0} = \\dfrac{-9}{2} = -4.5', '\\dfrac{84 - 97.5}{8 - 5} = \\dfrac{-13.5}{3} = -4.5', '-4.5 \\text{ L/h}'] }],
      lines: [
        { say: 'A diesel generator powers a work camp near Fort McMurray. The table shows the fuel left in its tank. What is the rate of change?', show: 't' },
        { say: 'Pick two rows, subtract, and divide. Use zero hours and two hours: 111 minus 120, over two minus zero, is negative nine over two, negative 4.5.', show: 'm.0', focus: ['t.0', 't.1', 'm.0'] },
        { say: 'Check with two other rows: eighty-four minus 97.5, over eight minus five, is negative 13.5 over three, also negative 4.5. The rate is the same, so it is constant.', show: 'm.1', focus: ['t.2', 't.3', 'm.1'] },
        { say: 'The rate of change is negative 4.5 litres per hour: the tank loses 4.5 litres every hour.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same order, top and bottom',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting in different orders', md: 'If you subtract “later minus earlier” on top, do the same on the bottom. A quantity that goes **down** has a **negative** rate of change.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{111 - 120}{0 - 2} = +4.5 \\quad \\text{wrong order}', '\\dfrac{111 - 120}{2 - 0} = -4.5 \\quad \\text{same order}'] },
      ],
      lines: [
        { say: 'Here is the most common slip. If you subtract later minus earlier on top, you must do the same on the bottom.', show: 'oops' },
        { say: '111 minus 120, over zero minus two, gives positive 4.5, which wrongly says the fuel is going up.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep the same order, and you get negative 4.5. A quantity that goes down always has a negative rate of change.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A candle is $24$ cm tall when lit. After $3$ h it is $16.5$ cm tall. What is the rate of change of its height?',
          choices: ['$-2.5$ cm/h', '$2.5$ cm/h', '$-7.5$ cm/h', '$-0.4$ cm/h'],
          answer: 0,
          working: '$\\dfrac{16.5 - 24}{3 - 0} = \\dfrac{-7.5}{3} = -2.5$ cm/h. The height goes down, so the rate is negative. D divides the wrong way.',
        },
      ],
      lines: [
        { say: 'Your turn. A candle is twenty-four centimetres tall when it is lit. After three hours, it is 16.5 centimetres tall. What is the rate of change of its height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 16.5 minus twenty-four, over three minus zero, is negative 7.5 over three, negative 2.5 centimetres per hour. The candle gets shorter, so the rate is negative.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Rate of change $= \\dfrac{\\text{change in output}}{\\text{change in input}}$, with units.', 'Subtract in the same order on the top and the bottom.', 'A decreasing quantity has a negative rate.'] }],
      lines: [
        { say: 'Let’s sum up. A rate of change is the change in output over the change in input, and it always has units.', show: 'sum.0' },
        { say: 'Subtract in the same order on the top and the bottom.', show: 'sum.1' },
        { say: 'And a quantity that decreases has a negative rate. In part two, we read what a rate means, and use it to predict. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
