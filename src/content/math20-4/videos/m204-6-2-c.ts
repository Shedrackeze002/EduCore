import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-2-c',
  lessonId: 'm204-6-2',
  title: 'SI and Imperial, Part 3: Speeds and Heights',
  thumbnailTitle: 'Speeds and Heights',
  thumbnail: 'm',
  summary: 'Rounding only at the end: a speed of 110 km/h as about 69 miles per hour, and a two-step conversion of a height of 5 ft 9 in to 69 in, then to about 175.3 cm.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.2 · Part 3', title: 'Speeds and Heights', subtitle: 'Round at the end' }],
      lines: [
        { say: 'Speed signs, sports rosters and driver’s licences can use different units on each side of the border.', show: 'title' },
        { say: 'In this video, you will convert a speed, and a height in two steps, rounding only at the end.' },
      ],
    },
    {
      chapter: 'A speed in miles per hour',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A highway speed limit is $110$ km/h. Use $1$ mi $\\approx 1.6$ km. Answer to the nearest whole number.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['110 \\div 1.6 = 68.75 \\approx 69 \\text{ mi/h}'] },
      ],
      lines: [
        { say: 'In this example, a highway speed limit is 110 kilometres per hour. What is this in miles per hour, to the nearest whole number? Use one mile is about 1.6 kilometres.', show: 'q' },
        { say: 'A mile is longer than a kilometre, so divide: 110 divided by 1.6 is 68.75.', show: 'm', focus: 'm' },
        { say: 'Round only at the end, to the place the question asks for. The nearest whole number is 69, so the limit is about 69 miles per hour.' },
        { say: 'Estimate to check: a mile is about 1.5 kilometres, and 110 divided by 1.5 is about 73. Close enough to trust 69. So a sign of 69 miles per hour across the border means about the same speed as 110 here.' },
      ],
    },
    {
      chapter: 'A height in two steps',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A hockey player is $5$ ft $9$ in tall. Use $1$ in $= 2.54$ cm. Answer to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{step 1: } 5 \\times 12 + 9 = 69 \\text{ in}', '\\text{step 2: } 69 \\times 2.54 = 175.26 \\approx 175.3 \\text{ cm}'] },
      ],
      lines: [
        { say: 'Some conversions take two steps. Do one step at a time. A hockey player from the United States is five feet nine inches tall. What is this in centimetres, to the nearest tenth?', show: 'q' },
        { say: 'Step one: change the height to inches. Five times twelve is sixty, plus nine is 69 inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: change to centimetres. A centimetre is smaller, so multiply: 69 times 2.54 is 175.26, which rounds to 175.3 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'You cannot use 5.9 feet here, because nine inches is not 0.9 of a foot. Change to inches first.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A basketball player is $6$ ft $1$ in tall. Use $1$ in $= 2.54$ cm. What is the height in centimetres, to the nearest tenth?',
          choices: ['$185.4$ cm', '$154.9$ cm', '$28.7$ cm', '$15.5$ cm'],
          answer: 0,
          working: 'Step 1: $6 \\times 12 + 1 = 73$ in. Step 2: $73 \\times 2.54 = 185.42 \\approx 185.4$ cm. B uses $6.1$ ft as $61$ in, and C divides.',
        },
      ],
      lines: [
        { say: 'Your turn. A basketball player is six feet one inch tall. Use one inch equals 2.54 centimetres. What is the height in centimetres, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six times twelve plus one is 73 inches, and 73 times 2.54 is 185.42, which rounds to 185.4 centimetres. B treats six feet one inch as 61 inches, and C divides instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Round only at the end, to the place asked for.', 'For two steps, do one conversion at a time.', 'Change feet and inches to inches first.'] }],
      lines: [
        { say: 'Let’s sum up. Round only at the end, to the place the question asks for.', show: 'sum.0' },
        { say: 'For a two-step conversion, do one step at a time.', show: 'sum.1' },
        { say: 'And change feet and inches to inches before you convert to centimetres. In part four, we find the cost to fill a gas tank. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
