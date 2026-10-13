import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm10c-1-4-b',
  lessonId: 'm10c-1-4',
  title: 'Converting Between SI and Imperial Units, Part 2: Rates and Reasonable Answers',
  thumbnailTitle: 'Rates and Reasonable Answers',
  thumbnail: 'race',
  summary: 'Converting rates such as km/h to mi/h by chaining conversion factors, and checking whether an answer is reasonable with friendly numbers before trusting the calculator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.4 · Part 2', title: 'Rates and Reasonable Answers', subtitle: 'Converting speeds, and checking your work' }],
      lines: [
        { say: 'A speed limit is one hundred kilometres per hour. What is that in miles per hour?', show: 'title' },
        { say: 'In this video, you will convert rates like this, and check whether an answer is reasonable before you trust your calculator.' },
      ],
    },
    {
      chapter: 'Converting a rate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A speed limit is $100\\text{ km/h}$. What is it in miles per hour?', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{100\\,\\cancel{\\text{km}}}{1\\text{ h}} \\times \\dfrac{1\\text{ mi}}{1.609\\,\\cancel{\\text{km}}}', '\\approx 62.2\\text{ mi/h}'] },
      ],
      lines: [
        { say: 'A speed limit is one hundred kilometres per hour. What is it in miles per hour?', show: 'q' },
        { say: 'A rate is a fraction: one hundred kilometres over one hour. Only the distance unit changes, so we need one conversion factor, with kilometres on the bottom: one mile over 1.609 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'The kilometres cancel, leaving miles per hour. One hundred divided by 1.609 is about 62.2 miles per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Two units at once',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A runner covers $400\\text{ m}$ in $55\\text{ s}$. What is the speed in kilometres per hour?', size: 'lg' },
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\dfrac{400\\,\\cancel{\\text{m}}}{55\\,\\cancel{\\text{s}}} \\times \\dfrac{1\\text{ km}}{1000\\,\\cancel{\\text{m}}} \\times \\dfrac{3600\\,\\cancel{\\text{s}}}{1\\text{ h}}', '\\approx 26.2\\text{ km/h}'],
        },
      ],
      lines: [
        { say: 'Now both units change. A runner covers four hundred metres in 55 seconds. What is the speed in kilometres per hour?', show: 'q' },
        { say: 'Chain the conversion factors, so that each unit you do not want cancels. One kilometre over a thousand metres cancels the metres, and 3,600 seconds over one hour cancels the seconds.', show: 'm.0', focus: 'm.0' },
        { say: 'Four hundred times 3,600, divided by 55 times a thousand, is about 26.2 kilometres per hour.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Friendly numbers',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 'est',
          head: ['To estimate', 'Use'],
          rows: [
            ['inches ↔ centimetres', '$1\\text{ in} \\approx 2.5\\text{ cm}$'],
            ['feet ↔ centimetres', '$1\\text{ ft} \\approx 30\\text{ cm}$'],
            ['metres ↔ feet', '$1\\text{ m} \\approx 3.3\\text{ ft}$'],
            ['miles ↔ kilometres', '$1\\text{ mi} \\approx 1.6\\text{ km}$, $1\\text{ km} \\approx 0.6\\text{ mi}$'],
          ],
        },
      ],
      lines: [
        { say: 'Before you trust a calculator, estimate with friendly numbers.' },
        { say: 'An inch is about two and a half centimetres, and a foot is about thirty centimetres.', show: ['est.0', 'est.1'] },
        { say: 'A metre is about 3.3 feet, a little more than a yard.', show: 'est.2' },
        { say: 'And a mile is about 1.6 kilometres, so a kilometre is about 0.6 miles.', show: 'est.3' },
      ],
    },
    {
      chapter: 'Is it reasonable?',
      layout: 'split',
      left: [
        {
          kind: 'diagram',
          id: 'race',
          points: { a0: [0, 2], a1: [10, 2], b0: [0, 0], b1: [10, 0], s: [0, 0.9], f: [10, 0.9] },
          items: [
            { kind: 'line', id: 'mi', from: 'a0', to: 'a1', tone: 'adj', label: '26.2\\text{ mi}', labelSide: 'left' },
            { kind: 'line', id: 'km', from: 'b0', to: 'b1', tone: 'opp', label: '\\approx 42.2\\text{ km}', labelSide: 'right' },
            { kind: 'label', id: 'start', at: 's', tex: '\\text{start}', tone: 'muted', place: 'left' },
            { kind: 'label', id: 'finish', at: 'f', tex: '\\text{finish}', tone: 'muted', place: 'right' },
          ],
        },
      ],
      right: [
        { kind: 'text', id: 'q', md: 'A student converted the marathon’s $26.2\\text{ mi}$ to $16.3\\text{ km}$. Is this reasonable?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['26 \\times 1.6 \\approx 42\\text{ km}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Check the direction', md: 'To a **smaller** unit, the number must **increase**. If it goes the wrong way, flip the conversion fraction.' },
      ],
      lines: [
        { say: 'A student converted the marathon distance, 26.2 miles, to 16.3 kilometres. Is this reasonable?', show: ['q', 'race.mi', 'race.start', 'race.finish'] },
        { say: 'A mile is longer than a kilometre, so the same distance takes more kilometres than miles. The answer should be larger than 26.2, not smaller.', show: 'race.km', focus: ['race.mi', 'race.km'] },
        { say: 'Estimate: 26 times 1.6 is about 42. So no, it is not reasonable. The student divided instead of multiplying. A marathon is about 42.2 kilometres.', show: 'm.0', focus: 'm.0' },
        { say: 'Whenever you convert to a smaller unit, the number must increase. If your answer goes the wrong way, flip your conversion fraction.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Which is the best estimate of $50\\text{ mi}$ in kilometres?',
          choices: ['$80\\text{ km}$', '$31\\text{ km}$', '$50\\text{ km}$', '$8\\text{ km}$'],
          answer: 0,
          working: '$50 \\times 1.6 = 80$. A mile is longer than a kilometre, so there are more kilometres than miles.',
        },
      ],
      lines: [
        { say: 'Your turn. Which is the best estimate of fifty miles in kilometres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifty times 1.6 is eighty. A mile is longer than a kilometre, so there must be more kilometres than miles. B divides instead of multiplying.', show: 'q.answer' },
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
            'A rate is a fraction: convert its top, its bottom, or both, with a factor for each.',
            'Chain the factors so every unit you do not want cancels.',
            'Estimate with friendly numbers: $1\\text{ in} \\approx 2.5\\text{ cm}$, $1\\text{ mi} \\approx 1.6\\text{ km}$.',
            'To a smaller unit, the number must increase.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A rate is a fraction, so convert its top, its bottom, or both, with a conversion factor for each.", show: 'sum.0' },
        { say: 'Chain the factors so that every unit you do not want cancels.', show: 'sum.1' },
        { say: 'Before you trust the calculator, estimate with friendly numbers.', show: 'sum.2' },
        { say: 'And remember: converting to a smaller unit makes the number bigger. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
