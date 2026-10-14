import type { Explainer } from '@/video/script.ts';
import { strip } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-6-2',
  lessonId: 'm204-6-2',
  title: 'SI and Imperial, Part 1: Conversion Factors',
  thumbnailTitle: 'Conversion Factors',
  thumbnail: 'in',
  summary: 'Conversion factors between imperial and SI units (1 in = 2.54 cm, 1 mi ≈ 1.6 km, 1 US gallon ≈ 3.79 L, 1 kg ≈ 2.2 lb), quick estimates to check answers, a 12-inch ruler as 30.48 cm, and reading a factor the right way round.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.2 · Part 1', title: 'Conversion Factors', subtitle: 'From one system to the other' }],
      lines: [
        { say: 'A cousin in Texas asks how tall you are in feet. A recipe from a US website uses pounds. A truck from Montana has a gas tank measured in gallons. To change between SI and imperial units, you use a conversion factor.', show: 'title' },
        { say: 'In this video, you will use conversion factors, and estimate to check your answers.' },
      ],
    },
    {
      chapter: 'Conversion factors',
      layout: 'split',
      leftWidth: 600,
      left: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Conversion factor', md: 'A **conversion factor** tells you how many of one unit make one of another unit. For example, $1$ in $= 2.54$ cm. The sign $\\approx$ means "is about".' }],
      right: [{ kind: 'table', id: 't', head: ['Imperial', 'SI'], rows: [['$1$ inch', '$2.54$ cm'], ['$1$ mile', '$\\approx 1.6$ km'], ['$1$ US gallon', '$\\approx 3.79$ L'], ['$\\approx 2.2$ pounds', '$1$ kg']] }],
      lines: [
        { say: 'A conversion factor tells you how many of one unit make one of another unit. For example, one inch is exactly 2.54 centimetres.', show: 'def' },
        { say: 'These are the factors you will use. A question will always tell you which one to use.', show: 't' },
        { say: 'The wavy equal sign means is about. Most factors are rounded, so your answers will be close, not exact. The inch is the exception: 2.54 is exact.' },
      ],
    },
    {
      chapter: 'An inch and a centimetre',
      layout: 'center',
      main: [
        figure('in', [
          strip({ name: 'i', parts: 1, shaded: 1, width: 7.62, height: 1, at: [0, 1.6], label: '1\\text{ in}' }),
          strip({ name: 'c', parts: 3, shaded: 0, width: 9, height: 1, at: [0, 0], label: '3\\text{ cm}', pieces: '1\\text{ cm}' }),
        ], 220),
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Quick estimates', md: 'An inch is about $2.5$ cm. A kilogram is about $2$ pounds. A mile is about $1.5$ km. A US gallon is about $4$ L.' },
      ],
      lines: [
        { say: 'Here is one inch above three centimetres. An inch is a bit more than two and a half centimetres.', show: 'in' },
        { say: 'Rounded factors like these help you estimate. An inch is about 2.5 centimetres. A kilogram is about two pounds. A mile is about 1.5 kilometres. And a US gallon is about four litres.', show: 'tip' },
      ],
    },
    {
      chapter: 'A ruler from the United States',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A ruler is $12$ in long. About how many centimetres is that?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{estimate: } 12 \\times 2.5 = 30', '\\text{exact: } 12 \\times 2.54 = 30.48 \\text{ cm}'] },
      ],
      lines: [
        { say: 'A ruler from the United States is twelve inches long. About how many centimetres is that?', show: 'q' },
        { say: 'Estimate first: each inch is about 2.5 centimetres, so twelve times 2.5 is thirty.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the exact answer: twelve times 2.54 is 30.48 centimetres, close to the estimate of thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to read a factor backwards. One kilogram is about 2.2 pounds. That does not mean one pound is 2.2 kilograms. A kilogram is the bigger unit.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A tablet screen is $10$ in across. Use $1$ in $= 2.54$ cm. How many centimetres is that?',
          choices: ['$25.4$ cm', '$3.94$ cm', '$254$ cm', '$12.54$ cm'],
          answer: 0,
          working: '$10 \\times 2.54 = 25.4$ cm. Estimate: $10 \\times 2.5 = 25$. B divides, and D adds.',
        },
      ],
      lines: [
        { say: 'Your turn. A tablet screen is ten inches across. Use one inch equals 2.54 centimetres. How many centimetres is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ten times 2.54 is 25.4 centimetres, close to the estimate of ten times 2.5, which is 25. B divides instead of multiplying, and D adds.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A conversion factor links two units: 1 in = 2.54 cm.', 'Most factors are rounded, so answers are close.', 'Estimate first to check your answer.'] }],
      lines: [
        { say: 'Let’s sum up. A conversion factor links two units, such as one inch equals 2.54 centimetres.', show: 'sum.0' },
        { say: 'Most factors are rounded, so your answers are close, not exact.', show: 'sum.1' },
        { say: 'And estimate first, so you can check your answer. In part two, we decide whether to multiply or divide. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
