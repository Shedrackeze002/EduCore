import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-6-1-b',
  lessonId: 'm104-6-1',
  title: 'Metric Units, Part 2: Converting',
  thumbnailTitle: 'Converting Units',
  summary: 'Metric unit facts, multiplying to change to a smaller unit and dividing to change to a bigger one (2.35 m is 235 cm, 750 mL is 0.75 L), and converting first in a two-step job such as cutting pieces from a board.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 6.1 · Part 2', title: 'Converting Units', subtitle: 'Bigger or smaller?' }],
      lines: [
        { say: 'A board is 2.35 metres long. How many centimetres is that? A carton holds 750 millilitres. How many litres?', show: 'title' },
        { say: 'In this video, you will convert between metric units, and use them in two-step jobs.' },
      ],
    },
    {
      chapter: 'Unit facts',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Measure', 'Unit facts'], rows: [['Length', '$1\\text{ km} = 1000\\text{ m}$'], ['Length', '$1\\text{ m} = 100\\text{ cm}$'], ['Length', '$1\\text{ cm} = 10\\text{ mm}$'], ['Mass', '$1\\text{ kg} = 1000\\text{ g}$'], ['Capacity', '$1\\text{ L} = 1000\\text{ mL}$']] }],
      right: [{ kind: 'bullets', id: 'b', items: ['Big unit to small unit: **multiply**.', 'Small unit to big unit: **divide**.'] }],
      lines: [
        { say: 'To convert means to change a measurement to a different unit. You need to know how the units are related: a kilometre is 1,000 metres, a metre is 100 centimetres, and a litre is 1,000 millilitres.', show: ['t.0', 't.1', 't.2', 't.3', 't.4'] },
        { say: 'From a bigger unit to a smaller unit, multiply: you get more of the small units.', show: 'b.0' },
        { say: 'From a smaller unit to a bigger unit, divide: you get fewer of the big units.', show: 'b.1' },
      ],
    },
    {
      chapter: 'Converting',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['2.35\\text{ m} = 2.35 \\times 100 = 235\\text{ cm}', '750\\text{ mL} = 750 \\div 1000 = 0.75\\text{ L}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying the wrong way', md: '$750\\text{ mL}$ is **not** $750\\,000\\text{ L}$. Ask: should my answer be bigger or smaller than the number I started with?' },
      ],
      lines: [
        { say: 'A shelf board is 2.35 metres long. Metres to centimetres is big to small, so multiply by 100: 235 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'A carton holds 750 millilitres of cream. Millilitres to litres is small to big, so divide by 1,000: 0.75 litres.', show: 'm.1', focus: 'm.1' },
        { say: 'It is not 750,000 litres. A litre is a big unit, so you need fewer of them. Always ask: should my answer be bigger or smaller than the number I started with?', show: 'oops' },
      ],
    },
    {
      chapter: 'Two-step jobs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\text{ m} = 500\\text{ cm}', '12 \\times 35 = 420\\text{ cm}', '500 - 420 = 80\\text{ cm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtracting different units', md: '$5 - 420$ makes no sense: $5$ is in metres and $420$ is in centimetres. Convert first.' },
      ],
      lines: [
        { say: 'At work, you often convert first, then do the job. A carpenter cuts twelve pieces, each 35 centimetres long, from a board five metres long. How much is left?', show: 'm.0' },
        { say: 'Put everything in the same unit. Five metres is 500 centimetres.', focus: 'm.0' },
        { say: 'Twelve pieces of 35 centimetres is 420 centimetres. So 500 minus 420: eighty centimetres is left.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Five minus 420 makes no sense, because the five is in metres and the 420 is in centimetres. Convert first, then subtract.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag of flour has a mass of $2.5\\text{ kg}$. How many grams is that?',
          choices: ['$2500\\text{ g}$', '$0.0025\\text{ g}$', '$250\\text{ g}$', '$25\\text{ g}$'],
          answer: 0,
          working: 'Kilograms to grams is big to small, so multiply: $2.5 \\times 1000 = 2500\\text{ g}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag of flour has a mass of 2.5 kilograms. How many grams is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Kilograms to grams is big to small, so multiply by 1,000: 2,500 grams. B divides, which makes the number smaller.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Big unit to small unit: multiply.', 'Small unit to big unit: divide.', 'In a two-step job, change everything to the same unit first.'] }],
      lines: [
        { say: 'Let’s sum up. From a big unit to a small unit, multiply.', show: 'sum.0' },
        { say: 'From a small unit to a big unit, divide.', show: 'sum.1' },
        { say: 'And in a two-step job, change everything to the same unit first. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
