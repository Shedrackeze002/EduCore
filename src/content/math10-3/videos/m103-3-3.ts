import type { Explainer } from '@/video/script.ts';
import { inchAndCentimetre } from '@/video/measure.ts';

const video: Explainer = {
  id: 'm103-3-3',
  lessonId: 'm103-3-3',
  title: 'Converting Between Systems, Part 1: Conversion Factors',
  thumbnailTitle: 'SI and Imperial',
  thumbnail: 'inch',
  summary: 'Conversion factors such as 1 in = 2.54 cm written as unit fractions that cancel the starting unit, and converting from SI to imperial: kilograms to pounds and centimetres to inches. Part 2 converts imperial to SI and checks answers with estimates.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.3 · Part 1', title: 'Conversion Factors', subtitle: 'From one system to the other' }],
      lines: [
        { say: 'A welder orders steel from a supplier in Montana, and a trucker crosses the border, where the speed signs switch to miles per hour.', show: 'title' },
        { say: 'Converting between S I and imperial units is part of many jobs. In this video, you will use conversion factors to change S I units to imperial ones.' },
      ],
    },
    {
      chapter: 'Conversion factors',
      layout: 'center',
      main: [
        inchAndCentimetre('inch'),
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conversion factor', md: 'A relationship such as $1\\text{ in} = 2.54\\text{ cm}$. As a fraction, $\\dfrac{2.54\\text{ cm}}{1\\text{ in}}$ equals $1$, so multiplying by it changes the units but not the size.' },
      ],
      lines: [
        { say: 'A conversion factor tells you how a unit in one system compares with a unit in the other. One inch is exactly 2.54 centimetres.', show: ['inch.cm-scale', 'inch.in-scale', 'inch.inch'], focus: 'inch.inch' },
        { say: 'Written as a fraction, 2.54 centimetres over one inch is equal to one. So multiplying by it changes the units, but not the size.', show: 'def' },
      ],
    },
    {
      chapter: 'Common factors',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Quantity', 'Factor'],
          rows: [
            ['length', '$1\\text{ in} = 2.54\\text{ cm}$ (exact)'],
            ['length', '$1\\text{ mi} \\approx 1.609\\text{ km}$'],
            ['mass', '$1\\text{ kg} \\approx 2.2\\text{ lb}$'],
            ['capacity', '1 US gal ≈ 3.785 L'],
          ],
        },
      ],
      lines: [
        { say: 'Some factors are exact, and some are rounded: a mile is about 1.609 kilometres, a kilogram is about 2.2 pounds, and a US gallon is about 3.785 litres. Questions always tell you which factor to use.', show: 't' },
      ],
    },
    {
      chapter: 'Unit fractions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{kg} \\to \\text{lb}\\text{: } \\quad \\cancel{\\text{kg}} \\times \\dfrac{2.2\\text{ lb}}{1\\ \\cancel{\\text{kg}}}', '\\text{lb} \\to \\text{kg}\\text{: } \\quad \\cancel{\\text{lb}} \\times \\dfrac{1\\text{ kg}}{2.2\\ \\cancel{\\text{lb}}} \\;=\\; \\div\\, 2.2'] },
      ],
      lines: [
        { say: 'Pick the fraction that cancels the unit you start with. To change kilograms to pounds, the kilograms must cancel, so put kilograms on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'To change pounds to kilograms, put pounds on the bottom instead. That is the same as dividing by 2.2.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'SI to imperial',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['75\\text{ kg} \\times \\dfrac{2.2\\text{ lb}}{1\\text{ kg}} = 165\\text{ lb}', '180\\text{ cm} \\div 2.54 \\approx 70.9\\text{ in}'] },
      ],
      lines: [
        { say: 'A bag of fertilizer has a mass of 75 kilograms. Using one kilogram is about 2.2 pounds, multiply: 75 times 2.2 is about 165 pounds.', show: 'm.0', focus: 'm.0' },
        { say: 'A shelf is 180 centimetres tall. Inches are bigger than centimetres, so there will be fewer of them: divide by 2.54. That is about 70.9 inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A trip is $240\\text{ km}$. About how many miles is it? Use $1\\text{ mi} \\approx 1.609\\text{ km}$.',
          choices: ['about $149\\text{ mi}$', 'about $386\\text{ mi}$', 'about $240\\text{ mi}$', 'about $1.5\\text{ mi}$'],
          answer: 0,
          working: 'Miles are bigger than kilometres, so divide: $240 \\div 1.609 \\approx 149\\text{ mi}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A trip is 240 kilometres. About how many miles is it? Use one mile is about 1.609 kilometres. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A mile is longer than a kilometre, so there are fewer miles: divide. 240 divided by 1.609 is about 149 miles. B multiplies.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Use the factor the question gives you.', 'Write it as a fraction that cancels the starting unit.', '$1\\text{ in} = 2.54\\text{ cm}$ exactly; most other factors are rounded.'] }],
      lines: [
        { say: 'Let’s sum up. Use the conversion factor the question gives you.', show: 'sum.0' },
        { say: 'Write it as a fraction that cancels the unit you start with.', show: 'sum.1' },
        { say: 'And remember that an inch is exactly 2.54 centimetres, but most other factors are rounded, so answers are approximate. In part two, we convert imperial to S I. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
