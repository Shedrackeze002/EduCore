import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-2-b',
  lessonId: 'm204-6-2',
  title: 'SI and Imperial, Part 2: Multiply or Divide?',
  thumbnailTitle: 'Multiply or Divide?',
  thumbnail: 'm',
  summary: 'Deciding whether to multiply or divide by a conversion factor (is the new unit smaller or bigger?), a 50-inch TV as 127 cm, a 30 lb bag of dog food as about 13.6 kg, and catching a wrong step with common sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.2 · Part 2', title: 'Multiply or Divide?', subtitle: 'Is the new unit bigger or smaller?' }],
      lines: [
        { say: 'Once you have a conversion factor, there is only one decision left: multiply or divide? The same question as before gives the answer.', show: 'title' },
        { say: 'In this video, you will decide whether to multiply or divide by a conversion factor.' },
      ],
    },
    {
      chapter: 'The rule',
      layout: 'center',
      main: [{ kind: 'callout', id: 'rule', tone: 'tip', title: 'Bigger or smaller?', md: 'If the new unit is **smaller**, you need more of them: **multiply** by the factor.\n\nIf the new unit is **bigger**, you need fewer of them: **divide** by the factor.' }],
      lines: [
        { say: 'Ask the same question as before: is the new unit bigger or smaller?', show: 'rule' },
        { say: 'If the new unit is smaller, you need more of them, so multiply by the factor. If the new unit is bigger, you need fewer of them, so divide by the factor.' },
      ],
    },
    {
      chapter: 'A TV in centimetres',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A TV is $50$ in across. Use $1$ in $= 2.54$ cm.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['50 \\times 2.54 = 127 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A TV from a US store is 50 inches across. How many centimetres is that? Use one inch equals 2.54 centimetres.', show: 'q' },
        { say: 'A centimetre is smaller than an inch, so multiply: 50 times 2.54 is 127 centimetres.', show: 'm', focus: 'm' },
        { say: 'Estimate to check: 50 times 2.5 is 125. Close, and bigger than 50, as it should be, since centimetres are smaller.' },
      ],
    },
    {
      chapter: 'Dog food in kilograms',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A bag of dog food weighs $30$ lb. Use $1$ kg $\\approx 2.2$ lb. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['30 \\div 2.2 \\approx 13.636 \\approx 13.6 \\text{ kg}'] },
      ],
      lines: [
        { say: 'A bag of dog food from a US store weighs thirty pounds. What is its mass in kilograms, to the nearest tenth? Use one kilogram is about 2.2 pounds.', show: 'q' },
        { say: 'A kilogram is bigger than a pound, so divide: thirty divided by 2.2 is about 13.636, which rounds to 13.6 kilograms.', show: 'm', focus: 'm' },
        { say: 'Estimate to check: a kilogram is about two pounds, so thirty pounds is about fifteen kilograms. 13.6 is close.' },
      ],
    },
    {
      chapter: 'Dividing when you should multiply',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing when you should multiply', md: '$50 \\div 2.54 \\approx 19.7$, but a $50$-inch TV is not $20$ cm across. That is narrower than a sheet of paper! Before you calculate, decide if the number should get bigger or smaller.' }],
      lines: [
        { say: 'A common mistake is to divide when you should multiply. 50 divided by 2.54 is about 19.7. But a 50-inch TV is not twenty centimetres across. That is narrower than a sheet of paper! Before you calculate, decide if the number should get bigger or smaller.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A suitcase weighs $44$ lb. Use $1$ kg $\\approx 2.2$ lb. What is its mass in kilograms?',
          choices: ['$20$ kg', '$96.8$ kg', '$41.8$ kg', '$46.2$ kg'],
          answer: 0,
          working: 'A kilogram is bigger, so divide: $44 \\div 2.2 = 20$ kg. B multiplies, and C and D subtract or add.',
        },
      ],
      lines: [
        { say: 'Your turn. A suitcase weighs 44 pounds. Use one kilogram is about 2.2 pounds. What is its mass in kilograms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A kilogram is bigger than a pound, so divide: 44 divided by 2.2 is twenty kilograms. B multiplies, so the number gets bigger instead of smaller.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['New unit smaller: multiply by the factor.', 'New unit bigger: divide by the factor.', 'Estimate to check the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. If the new unit is smaller, multiply by the factor.', show: 'sum.0' },
        { say: 'If the new unit is bigger, divide by the factor.', show: 'sum.1' },
        { say: 'And estimate to check that the answer makes sense. In part three, we round and convert in two steps. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
