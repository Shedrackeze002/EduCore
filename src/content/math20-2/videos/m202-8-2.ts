import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-8-2',
  lessonId: 'm202-8-2',
  title: 'Solving Problems with Rates, Part 1: Multiply or Divide by a Rate',
  thumbnailTitle: 'Using a Unit Rate',
  thumbnail: 'm',
  summary: 'Using a rate in both directions: multiplying 46.5 L by a price per litre to find the cost of gas, dividing 342 km by 90 km/h to find a travel time of 3 h 48 min, and letting the units decide which to do.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.2 · Part 1', title: 'Using a Unit Rate', subtitle: 'Multiply or divide?' }],
      lines: [
        { say: 'How long will the drive to Jasper take? How much will the gas cost? Rates let you predict, by multiplying or dividing.', show: 'title' },
        { say: 'In this video, you will use a unit rate in both directions, and let the units tell you which operation to use.' },
      ],
    },
    {
      chapter: 'A rate works both ways',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['**Multiply** by the rate: $\\text{L} \\times \\dfrac{\\$}{\\text{L}} = \\$$', '**Divide** by the rate: $\\text{km} \\div \\dfrac{\\text{km}}{\\text{h}} = \\text{h}$'] },
      ],
      lines: [
        { say: 'A rate connects two quantities, so it works in both directions. Multiply by the rate to go from the second quantity to the first. Litres times dollars per litre gives dollars: the litres cancel.', show: 'b.0', focus: 'b.0' },
        { say: 'Divide by the rate to go the other way. Kilometres divided by kilometres per hour gives hours: the kilometres cancel.', show: 'b.1', focus: 'b.1' },
      ],
    },
    {
      chapter: 'Buying gas',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['46.5 \\text{ L} \\times \\dfrac{\\$1.539}{\\text{L}}', '= \\$71.5635', '\\approx \\$71.56'] }],
      lines: [
        { say: 'In this example, gas costs 153.9 cents per litre. How much do 46.5 litres cost, to the nearest cent? The rate is dollars per litre, and you know the litres, so multiply. The litres cancel, leaving dollars.', show: 'm.0', focus: 'm.0' },
        { say: '46.5 times 1.539 is 71.5635.', show: 'm.1', focus: 'm.1' },
        { say: 'Round to the nearest cent: the gas costs seventy-one dollars fifty-six.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Travel time',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{342 \\text{ km}}{90 \\text{ km/h}} = 3.8 \\text{ h}', '0.8 \\text{ h} = 0.8 \\times 60 = 48 \\text{ min}', '3.8 \\text{ h} = 3 \\text{ h } 48 \\text{ min}'] }],
      lines: [
        { say: 'A family drives 342 kilometres at an average speed of ninety kilometres per hour. How long does the drive take? You know the kilometres, and the rate is kilometres per hour, so divide. 342 divided by ninety is 3.8 hours.', show: 'm.0', focus: 'm.0' },
        { say: 'The 0.8 is a part of an hour, not minutes. Multiply by sixty: 0.8 times sixty is forty-eight minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'So the drive takes 3.8 hours, or three hours and forty-eight minutes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Let the units guide you',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Let the units guide you', md: 'Write the units in every step. If they cancel to leave the unit you want, the setup is right. If you get $\\text{km}^2/\\text{h}$ or $\\text{L}^2$, you multiplied when you should have divided, or the other way around.' }],
      lines: [
        { say: 'Here is a habit that saves marks. Write the units in every step. If they cancel to leave the unit you want, the setup is right.', show: 'tip' },
        { say: 'If you end up with strange units, like kilometres squared per hour, you multiplied when you should have divided, or the other way around.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In this example, gas costs \\$1.459 per litre. How many litres can you buy with \\$50? Round to the nearest tenth.',
          choices: ['$34.3$ L', '$73.0$ L', '$48.5$ L', '$0.03$ L'],
          answer: 0,
          working: 'You know dollars and the rate is dollars per litre, so divide: \\$50 ÷ \\$1.459 per litre ≈ $34.3$ L. B multiplies instead.',
        },
      ],
      lines: [
        { say: 'Your turn. In this example, gas costs 145.9 cents per litre. How many litres can you buy with fifty dollars? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. You know the dollars, and the rate is dollars per litre, so divide: fifty divided by 1.459 is about 34.3 litres. B multiplies instead, and its units would be dollars squared per litre.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Multiply by a rate, or divide by it.', 'Check that the units cancel to the unit you want.', 'A decimal part of an hour times $60$ gives minutes.'] }],
      lines: [
        { say: 'Let’s sum up. A rate works both ways: multiply by it, or divide by it.', show: 'sum.0' },
        { say: 'Check that the units cancel to leave the unit you want.', show: 'sum.1' },
        { say: 'And a decimal part of an hour, times sixty, gives minutes. In part two, we solve problems with more than one step. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
