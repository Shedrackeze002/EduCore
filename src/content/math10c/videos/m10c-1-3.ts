import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-1-3',
  lessonId: 'm10c-1-3',
  title: 'Converting Within a Measurement System, Part 1: Conversion Factors',
  thumbnailTitle: 'Conversion Factors',
  thumbnail: 'same',
  summary: 'Converting units within SI and within imperial by multiplying by a conversion factor, a fraction equal to 1, with unit analysis to check the setup. Also: mixed units such as 5 ft 9 in. Part 2 converts area and volume units.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.3 · Part 1', title: 'Conversion Factors', subtitle: 'Converting within SI and within imperial' }],
      lines: [
        { say: 'A trail is 3.4 kilometres long. A board is 89 inches. Converting between units of the same system is a skill you will use for the rest of your life.', show: 'title' },
        { say: 'The key idea is proportional reasoning: multiplying by a fraction that equals one.' },
      ],
    },
    {
      chapter: 'A fraction equal to 1',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'same',
          points: { a0: [0, 2], a1: [10, 2], b0: [0, 0], b1: [10, 0] },
          items: [
            { kind: 'line', id: 'm', from: 'a0', to: 'a1', tone: 'adj', label: '1\\text{ m}', labelSide: 'left' },
            { kind: 'line', id: 'cm', from: 'b0', to: 'b1', tone: 'opp', label: '100\\text{ cm}', labelSide: 'right' },
          ],
        },
      ],
      right: [
        { kind: 'math', id: 'f', lines: ['\\dfrac{100\\text{ cm}}{1\\text{ m}} = 1', '\\dfrac{1\\text{ m}}{100\\text{ cm}} = 1'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Conversion factor', md: 'A fraction equal to 1. Choose the one that **cancels the unit you start with**.' },
      ],
      lines: [
        { say: 'One metre is exactly the same length as one hundred centimetres.', show: ['same.m', 'same.cm'] },
        { say: 'So the fraction one hundred centimetres over one metre equals one.', show: 'f.0', focus: 'f.0' },
        { say: 'So does its flip: one metre over one hundred centimetres.', show: 'f.1', focus: 'f.1' },
        { say: 'Multiplying a measurement by one does not change its size, only its units. A fraction like this is called a conversion factor. Choose the one that cancels the unit you start with.', show: 'tip' },
      ],
    },
    {
      chapter: 'Unit analysis',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Convert $3.75\\text{ km}$ to metres.', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['3.75\\,\\cancel{\\text{km}} \\times \\dfrac{1000\\text{ m}}{1\\,\\cancel{\\text{km}}}', '= 3750\\text{ m}'] },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Unit analysis', md: 'Write the units at every step and cancel them like factors. If the units left are the ones you want, the setup is right.' },
      ],
      lines: [
        { say: 'Convert 3.75 kilometres to metres.', show: 'q' },
        { say: 'One kilometre is a thousand metres. We start in kilometres, so we multiply by a thousand metres over one kilometre, with kilometres on the bottom.', show: 'm.0', focus: 'm.0' },
        { say: 'The kilometres cancel, like factors, leaving metres. 3.75 times a thousand is 3750 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'This is called unit analysis. Write the units at every step, and cancel them. If the units you are left with are the ones you want, your setup is right.', show: 'def', focus: 'm' },
      ],
    },
    {
      chapter: 'Bigger or smaller?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Ask first', md: 'To a **smaller** unit: a **bigger** number (multiply). To a **larger** unit: a **smaller** number (divide).' },
        { kind: 'text', id: 'q', md: 'Convert $4560\\text{ mm}$ to metres.', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['4560\\,\\cancel{\\text{mm}} \\times \\dfrac{1\\text{ m}}{1000\\,\\cancel{\\text{mm}}} = 4.56\\text{ m}'] },
      ],
      lines: [
        { say: 'Before you calculate, ask yourself: bigger or smaller? Converting to a smaller unit gives a bigger number, so you multiply. Converting to a larger unit gives a smaller number, so you divide.', show: 'tip' },
        { say: 'Convert 4560 millimetres to metres. A metre is larger than a millimetre, so expect a smaller number.', show: 'q' },
        { say: 'Multiply by one metre over a thousand millimetres. The millimetres cancel, and 4560 divided by a thousand is 4.56 metres. A smaller number, as expected.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Within SI',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'si',
          head: ['From → to', 'Multiply by'],
          rows: [
            ['km → m', '$1000$'],
            ['m → cm', '$100$'],
            ['cm → mm', '$10$'],
            ['km → cm', '$100\\,000$'],
          ],
        },
      ],
      lines: [
        { say: 'Every step in the S I system is a power of ten, so an S I conversion just moves the decimal point.', caption: 'Every step in the SI system is a power of ten, so an SI conversion just moves the decimal point.' },
        { say: 'Kilometres to metres, multiply by a thousand. Metres to centimetres, multiply by a hundred. Centimetres to millimetres, multiply by ten.', show: ['si.0', 'si.1', 'si.2'] },
        { say: 'And kilometres to centimetres, a thousand times a hundred: multiply by one hundred thousand. Going the other way, divide.', show: 'si.3', focus: 'si.3' },
      ],
    },
    {
      chapter: 'Mixed imperial units',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'text', id: 'q1', md: 'A student is $5\\text{ ft}\\ 9\\text{ in}$ tall. How many inches is that?', size: 'md' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['5 \\times 12 = 60\\text{ in}', '60 + 9 = 69\\text{ in}'] },
      ],
      right: [
        { kind: 'text', id: 'q2', md: 'A board is $89\\text{ in}$ long. How long is it in feet and inches?', size: 'md' },
        { kind: 'math', id: 'm2', size: 'md', lines: ['89 \\div 12 = 7\\ \\text{R}\\ 5', '89\\text{ in} = 7\\text{ ft}\\ 5\\text{ in}'] },
      ],
      lines: [
        { say: 'Imperial units are not powers of ten, so you need to know the facts: twelve inches in a foot, three feet in a yard, and 5280 feet in a mile.' },
        { say: 'A student is five feet nine inches tall. How many inches is that?', show: 'q1' },
        { say: 'Five feet is five times twelve, which is sixty inches. Add the nine: 69 inches.', show: ['m1.0', 'm1.1'], focus: 'm1' },
        { say: 'Now the other way. A board is 89 inches long. How long is it in feet and inches?', show: 'q2' },
        { say: 'Divide by twelve. 89 divided by twelve is seven, remainder five. The quotient is the feet, and the remainder is the inches left over: seven feet five inches.', show: ['m2.0', 'm2.1'], focus: 'm2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['89 \\div 12 = 7.41\\overline{6}', '\\text{not } 7\\text{ ft } 4\\text{ in}', '0.41\\overline{6} \\times 12 = 5\\text{ in}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'A decimal is not feet and inches', md: 'The decimal part is a fraction of a **foot**. Multiply it by 12 to get inches.' },
      ],
      lines: [
        { say: 'On a calculator, 89 divided by twelve is 7.41666, repeating.', show: 'm.0', focus: 'm.0' },
        { say: 'That does not mean seven feet four inches.', show: 'm.1', focus: 'm.1' },
        { say: 'The decimal part is a fraction of a foot. Multiply it by twelve to get inches: 0.41666 times twelve is five inches. Seven feet five inches, as before.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A shelf is $50\\text{ in}$ long. How long is it in feet and inches?',
          choices: ['$4\\text{ ft}\\ 2\\text{ in}$', '$4\\text{ ft}\\ 1\\text{ in}$', '$4\\text{ ft}\\ 17\\text{ in}$', '$5\\text{ ft}\\ 0\\text{ in}$'],
          answer: 0,
          working: '$50 \\div 12 = 4$ remainder $2$, so the shelf is $4\\text{ ft}\\ 2\\text{ in}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A shelf is fifty inches long. How long is it in feet and inches? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifty divided by twelve is four, remainder two, so the shelf is four feet two inches. C comes from reading the calculator\'s 4.17 as feet and inches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'A conversion factor is a fraction equal to 1. Choose the one that cancels the starting unit.',
            'Smaller unit: bigger number (multiply). Larger unit: smaller number (divide).',
            'SI steps are powers of 10. Imperial: $12\\text{ in} = 1\\text{ ft}$, $3\\text{ ft} = 1\\text{ yd}$, $5280\\text{ ft} = 1\\text{ mi}$.',
            'For feet and inches, divide by 12 and use the remainder.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A conversion factor is a fraction equal to one. Choose the one that cancels the unit you start with.", show: 'sum.0' },
        { say: 'Converting to a smaller unit gives a bigger number, and to a larger unit, a smaller number.', show: 'sum.1' },
        { say: 'S I steps are powers of ten. In imperial, learn the facts: twelve inches in a foot, three feet in a yard, and 5280 feet in a mile.', caption: 'SI steps are powers of ten. In imperial, learn the facts: twelve inches in a foot, three feet in a yard, and 5280 feet in a mile.', show: 'sum.2' },
        { say: 'And for feet and inches, divide by twelve and use the remainder. In part two, we convert units of area and volume. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
