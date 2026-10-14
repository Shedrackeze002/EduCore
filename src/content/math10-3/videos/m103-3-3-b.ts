import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-3-3-b',
  lessonId: 'm103-3-3',
  title: 'Converting Between Systems, Part 2: Imperial to SI and Estimates',
  thumbnailTitle: 'Imperial to SI',
  summary: 'Converting imperial to SI in steps (feet and inches to centimetres, a wrench size, pounds to tonnes, cups to millilitres), and checking with rounded factors so you never multiply when you should divide.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.3 · Part 2', title: 'Imperial to SI', subtitle: 'Convert in steps, then check' }],
      lines: [
        { say: 'An American recipe in cups, a bolt sized in inches, a load weighed in pounds. How do you change them to metric?', show: 'title' },
        { say: 'In this video, you will convert imperial units to S I in steps, and check your answers with quick estimates.' },
      ],
    },
    {
      chapter: 'Imperial to SI',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['6\\text{ ft } 2\\text{ in} = 6 \\times 12 + 2 = 74\\text{ in}', '74 \\times 2.54 = 187.96 \\approx 188\\text{ cm}', '\\tfrac34\\text{ in} = 0.75 \\times 25.4 = 19.05\\text{ mm} \\;\\to\\; 19\\text{ mm wrench}'] },
      ],
      lines: [
        { say: 'A basketball player is six feet two inches tall. Change to inches first: six times twelve plus two is 74 inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply by 2.54: 187.96, or about 188 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'A mechanic needs a metric wrench for a three-quarter-inch bolt. An inch is 25.4 millimetres, so 0.75 times 25.4 is 19.05 millimetres. The closest metric wrench is nineteen millimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'center',
      main: [
        { kind: 'bullets', id: 'b', items: ['1 in is about 2.5 cm.', '1 kg is about 2 lb.', '1 mi is about 1.6 km, so 100 km/h is about 60 mph.', '1 US gallon is about 4 L.'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Multiplying by the wrong factor', md: '$165\\text{ lb} \\times 2.2 = 363\\text{ kg}$ is wrong. A kilogram is **heavier** than a pound, so there are **fewer** kilograms: $165 \\div 2.2 = 75\\text{ kg}$.' },
      ],
      lines: [
        { say: 'Rounded factors make quick checks easy. An inch is about two and a half centimetres, and a kilogram is about two pounds.', show: ['b.0', 'b.1'] },
        { say: 'A mile is about 1.6 kilometres, so a hundred kilometres an hour is about sixty miles an hour. And a US gallon is about four litres.', show: ['b.2', 'b.3'] },
        { say: 'Compare your answer with an estimate. To change 165 pounds to kilograms, multiplying by 2.2 gives 363 kilograms. But a kilogram is heavier than a pound, so there must be fewer kilograms: 165 divided by 2.2 is 75.', show: 'oops' },
      ],
    },
    {
      chapter: 'In steps',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['44\\,000\\text{ lb} \\div 2.2 = 20\\,000\\text{ kg} = 20\\text{ t}', '\\text{check: } 44\\,000 \\div 2 = 22\\,000\\text{ kg} \\;\\checkmark', '2 \\text{ cups} = 16\\text{ fl oz}, \\quad 16 \\times 29.57 \\approx 473\\text{ mL}'] },
      ],
      lines: [
        { say: 'A truck from Montana carries 44,000 pounds of lumber, and the Alberta scale reads in tonnes. Pounds to kilograms: 44,000 divided by 2.2 is 20,000 kilograms, which is twenty tonnes.', show: 'm.0', focus: 'm.0' },
        { say: 'Check: a kilogram is about two pounds, so 44,000 pounds is about 22,000 kilograms. Close enough.', show: 'm.1', focus: 'm.1' },
        { say: 'A US recipe calls for two cups of milk. Two cups is sixteen US fluid ounces, and with one fluid ounce about 29.57 millilitres, that is about 473 millilitres. Round only at the end.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A board is $8\\text{ ft}$ long. How long is it in centimetres? Use $1\\text{ ft} = 30.48\\text{ cm}$.',
          choices: ['$243.84\\text{ cm}$', '$3.81\\text{ cm}$', '$96\\text{ cm}$', '$20.32\\text{ cm}$'],
          answer: 0,
          working: 'Centimetres are smaller, so multiply: $8 \\times 30.48 = 243.84\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A board is eight feet long. How long is it in centimetres? Use one foot is 30.48 centimetres. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Centimetres are smaller, so multiply: eight times 30.48 is 243.84 centimetres, about two and a half metres. That fits an eight-foot board.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Convert in steps, and round only at the end.', 'Smaller unit: more of them. Bigger unit: fewer of them.', 'Estimate with rounded factors to check.'] }],
      lines: [
        { say: 'Let’s sum up. Convert in steps, and round only at the end.', show: 'sum.0' },
        { say: 'A smaller unit means more of them, and a bigger unit means fewer.', show: 'sum.1' },
        { say: 'And estimate with rounded factors to check your answer. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
