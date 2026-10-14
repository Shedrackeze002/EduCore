import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-3-1',
  lessonId: 'm103-3-1',
  title: 'SI Units, Part 1: Prefixes and Converting',
  thumbnailTitle: 'SI Prefixes',
  summary: 'The metre, gram and litre, the prefixes kilo-, centi- and milli- as powers of 10, referents for choosing a unit, and converting by multiplying to a smaller unit or dividing to a bigger one. Part 2 covers mixed units, volume, capacity and area.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.1 · Part 1', title: 'SI Prefixes and Converting', subtitle: 'One system, linked by powers of 10' }],
      lines: [
        { say: 'A plumber cuts copper pipe in millimetres, a cook measures stock in litres, and a grain truck is weighed in tonnes.', show: 'title' },
        { say: 'All of these units belong to the S I, or metric, system, and they are linked by powers of ten. In this video, you will learn the prefixes, and use them to convert.' },
      ],
    },
    {
      chapter: 'SI prefixes',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Prefix', 'Meaning', 'Example'],
          rows: [
            ['kilo- (k)', '1000 times the unit', '$1\\text{ km} = 1000\\text{ m}$'],
            ['hecto- (h)', '100 times', '1 hectolitre = 100 L'],
            ['deca- (da)', '10 times', '1 decametre = 10 m'],
            ['deci- (d)', '$\\tfrac{1}{10}$ of the unit', '$10\\text{ dm} = 1\\text{ m}$'],
            ['centi- (c)', '$\\tfrac{1}{100}$', '$100\\text{ cm} = 1\\text{ m}$'],
            ['milli- (m)', '$\\tfrac{1}{1000}$', '$1000\\text{ mL} = 1\\text{ L}$'],
          ],
        },
      ],
      lines: [
        { say: 'Everyday metric units start from three units: the metre for length, the gram for mass, and the litre for capacity. A prefix in front of the unit tells you how many times bigger or smaller it is.', show: 't' },
        { say: 'Kilo means a thousand times: a kilometre is 1,000 metres. Hecto means a hundred times, and deca, ten times.', focus: ['t.0', 't.1', 't.2'] },
        { say: 'Deci means one tenth, centi one hundredth, and milli one thousandth. So a hundred centimetres make a metre, and 1,000 millilitres make a litre.', focus: ['t.3', 't.4', 't.5'] },
        { say: 'The three you will use every day are kilo, centi and milli. And a tonne, for heavy loads, is 1,000 kilograms.', focus: ['t.0', 't.4', 't.5'] },
      ],
    },
    {
      chapter: 'Referents',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Referents help you choose a unit', md: 'A millimetre is about the thickness of a dime. A centimetre is about the width of your little fingernail. A litre of water has a mass of one kilogram.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Centi- is not one hundred', md: '*Centi-* means one **hundredth**. A centimetre is tiny: it takes $100$ of them to make a metre.' },
      ],
      lines: [
        { say: 'Referents help you picture a unit. A millimetre is about the thickness of a dime. A centimetre is about the width of your little fingernail. And a litre of water has a mass of one kilogram.', show: 'tip' },
        { say: 'If a measurement does not match your picture, the prefix is probably wrong. And remember: centi means one hundredth, not one hundred. A centimetre is tiny.', show: 'oops' },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Bigger or smaller?', md: 'To a **smaller** unit, the number gets bigger: **multiply**. To a **larger** unit, the number gets smaller: **divide**.' },
        { kind: 'math', id: 'm', lines: ['3.75\\text{ km} = 3.75 \\times 1000 = 3750\\text{ m}', '2350\\text{ mL} = 2350 \\div 1000 = 2.35\\text{ L}'] },
      ],
      lines: [
        { say: 'To convert, ask one question first: is the new unit bigger or smaller? Changing to a smaller unit gives a bigger number, so multiply. Changing to a larger unit gives a smaller number, so divide.', show: 'key' },
        { say: 'A pipeline crew lays 3.75 kilometres of pipe. Metres are smaller, so multiply by 1,000: 3,750 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'A recipe uses 2,350 millilitres of stock. Litres are bigger, so divide by 1,000: 2.35 litres. Each step is a power of ten, so the decimal point just moves.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Check that it makes sense',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['450\\text{ mm} \\times 10 = 4500\\text{ cm} \\quad \\bad{\\times}', '450\\text{ mm} \\div 10 = 45\\text{ cm} \\quad \\good{\\checkmark}'] },
      ],
      lines: [
        { say: 'Changing 450 millimetres to centimetres by multiplying gives 4,500 centimetres. That is 45 metres, which is far too long.', show: 'm.0', focus: 'm.0' },
        { say: 'Centimetres are bigger than millimetres, so divide by ten: 45 centimetres. Always check that your answer makes sense.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A truck carries $4.2$ tonnes of gravel. How many kilograms is that?',
          choices: ['$4200\\text{ kg}$', '$420\\text{ kg}$', '$0.0042\\text{ kg}$', '$42\\,000\\text{ kg}$'],
          answer: 0,
          working: '$1\\text{ t} = 1000\\text{ kg}$. Kilograms are smaller, so multiply: $4.2 \\times 1000 = 4200\\text{ kg}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A truck carries 4.2 tonnes of gravel. How many kilograms is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A tonne is 1,000 kilograms. Kilograms are smaller, so multiply: 4.2 times 1,000 is 4,200 kilograms. C divides instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Kilo- = 1000, centi- = $\\tfrac{1}{100}$, milli- = $\\tfrac{1}{1000}$.', 'To a smaller unit, multiply. To a bigger unit, divide.', 'Check that the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. Kilo means a thousand, centi means one hundredth, and milli means one thousandth.', show: 'sum.0' },
        { say: 'To change to a smaller unit, multiply. To change to a bigger unit, divide.', show: 'sum.1' },
        { say: 'And check that your answer makes sense. In part two, we work with mixed units, volume and capacity. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
