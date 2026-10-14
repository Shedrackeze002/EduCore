import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-1',
  lessonId: 'm204-6-1',
  title: 'Converting Units, Part 1: SI Units',
  thumbnailTitle: 'SI Units',
  thumbnail: 't',
  summary: 'The SI (metric) units for length, mass and capacity, the prefixes kilo, centi and milli, the rule big to small multiply and small to big divide, and converting 2.4 m to 240 cm and 750 g to 0.75 kg.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.1 · Part 1', title: 'SI Units', subtitle: 'Bigger or smaller?' }],
      lines: [
        { say: 'At work you might cut rope in metres, weigh flour in kilograms, or measure a board in feet and inches. Changing from one unit to another helps you get the job right.', show: 'title' },
        { say: 'In this video, you will change between SI units by multiplying or dividing by 10, 100 or 1,000.' },
      ],
    },
    {
      chapter: 'SI units',
      layout: 'split',
      leftWidth: 600,
      left: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'SI', md: '**SI** is the system of units used in Canada. It is also called the metric system. Its units go up and down by $10$, $100$ or $1000$.' }],
      right: [{ kind: 'table', id: 't', head: ['Measure', 'Fact'], rows: [['Length', '$1$ km $= 1000$ m'], ['Length', '$1$ m $= 100$ cm'], ['Length', '$1$ cm $= 10$ mm'], ['Mass', '$1$ kg $= 1000$ g'], ['Capacity', '$1$ L $= 1000$ mL']] }],
      lines: [
        { say: 'SI is the system of units used in Canada. It is also called the metric system. Its units go up and down by ten, 100 or 1,000.', show: 'def' },
        { say: 'Here are the facts you will use most. The word kilo means one thousand, so a kilometre is 1,000 metres and a kilogram is 1,000 grams.', show: 't', focus: ['t.0', 't.3'] },
        { say: 'Centi means one hundredth: there are 100 centimetres in a metre. And milli means one thousandth: there are 1,000 millilitres in a litre.', focus: ['t.1', 't.4'] },
      ],
    },
    {
      chapter: 'Multiply or divide?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'rule', tone: 'tip', title: 'Bigger or smaller?', md: '**Big unit to small unit:** you need **more** of them, so **multiply**.\n\n**Small unit to big unit:** you need **fewer** of them, so **divide**.' }],
      lines: [
        { say: 'To change units, ask one question first: is the new unit bigger or smaller?', show: 'rule' },
        { say: 'Going from a big unit to a small unit, you need more of them, so multiply. Going from a small unit to a big unit, you need fewer of them, so divide.' },
      ],
    },
    {
      chapter: 'Rope and flour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q1', md: 'A piece of rope is $2.4$ m long. How many centimetres is that?', size: 'md' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['2.4 \\times 100 = 240 \\text{ cm}'] },
        { kind: 'text', id: 'q2', md: 'A bag of flour has a mass of $750$ g. What is it in kilograms?', size: 'md' },
        { kind: 'math', id: 'm2', size: 'md', lines: ['750 \\div 1000 = 0.75 \\text{ kg}'] },
      ],
      lines: [
        { say: 'A piece of rope on a job site is 2.4 metres long. How many centimetres is that?', show: 'q1' },
        { say: 'One metre is 100 centimetres. Centimetres are smaller, so multiply: 2.4 times 100 is 240 centimetres.', show: 'm1', focus: 'm1' },
        { say: 'A bag of flour at a bakery has a mass of 750 grams. What is its mass in kilograms?', show: 'q2' },
        { say: 'One kilogram is 1,000 grams. Kilograms are bigger, so divide: 750 divided by 1,000 is 0.75 kilograms.', show: 'm2', focus: 'm2' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying when you should divide', md: '$750 \\times 1000 = 750\\,000$, but a bag of flour cannot have a mass of $750\\,000$ kg. That is heavier than a loaded truck! Always check that your answer makes sense.' }],
      lines: [
        { say: 'A common mistake is to multiply when you should divide. 750 times 1,000 is 750 thousand. But a bag of flour cannot have a mass of 750 thousand kilograms. That is heavier than a loaded truck! Always check that your answer makes sense.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A jug holds $3500$ mL of juice. How many litres is that?',
          choices: ['$3.5$ L', '$3\\,500\\,000$ L', '$35$ L', '$350$ L'],
          answer: 0,
          working: '$1$ L $= 1000$ mL. Litres are bigger, so divide: $3500 \\div 1000 = 3.5$ L. B multiplies, and C and D divide by $100$ and $10$.',
        },
      ],
      lines: [
        { say: 'Your turn. A jug holds 3,500 millilitres of juice. How many litres is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One litre is 1,000 millilitres, and litres are bigger, so divide: 3,500 divided by 1,000 is 3.5 litres. B multiplies, and C and D divide by the wrong number.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['SI units go up and down by 10, 100 or 1000.', 'Big unit to small unit: multiply.', 'Small unit to big unit: divide. Then check it makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. SI units go up and down by ten, 100 or 1,000.', show: 'sum.0' },
        { say: 'From a big unit to a small unit, multiply.', show: 'sum.1' },
        { say: 'From a small unit to a big unit, divide, and check that the answer makes sense. In part two, we use imperial units. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
