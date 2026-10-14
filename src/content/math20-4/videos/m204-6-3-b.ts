import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-3-b',
  lessonId: 'm204-6-3',
  title: 'Temperature, Part 2: Celsius to Fahrenheit',
  thumbnailTitle: 'Celsius to Fahrenheit',
  thumbnail: 'm',
  summary: 'Changing Celsius to Fahrenheit with F = 1.8C + 32, multiplying first: 25°C is 77°F and −10°C is 14°F, why adding first gives 102.6°F, and checking with benchmarks.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.3 · Part 2', title: 'Celsius to Fahrenheit', subtitle: 'Multiply, then add' }],
      lines: [
        { say: 'A cousin in Texas wants to know how warm it is here. You know the temperature in Celsius. They think in Fahrenheit.', show: 'title' },
        { say: 'In this video, you will change Celsius to Fahrenheit with a formula, including below zero.' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['F = 1.8C + 32'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two steps', md: '**Multiply** by $1.8$ first. **Then add** $32$.' },
      ],
      lines: [
        { say: 'To change Celsius to Fahrenheit, use F equals 1.8 C plus 32.', show: 'f', focus: 'f' },
        { say: 'Multiply by 1.8 first, then add 32. The 1.8 is there because a Fahrenheit degree is smaller than a Celsius degree, and the 32 is there because water freezes at 32 Fahrenheit, not zero.', show: 'tip' },
      ],
    },
    {
      chapter: 'Weather for a cousin',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The forecast is $25^\\circ$C. What is this in degrees Fahrenheit?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1.8 \\times 25 = 45', '45 + 32 = 77^\\circ\\text{F}'] },
      ],
      lines: [
        { say: 'The forecast for tomorrow is 25 degrees Celsius. What is this in degrees Fahrenheit?', show: 'q' },
        { say: 'Multiply first: 1.8 times 25 is 45.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add 32: 45 plus 32 is 77. It will be 77 degrees Fahrenheit.', show: 'm.1', focus: 'm.1' },
        { say: 'Check with the benchmarks: 25 Celsius is a bit warmer than a room, and 77 Fahrenheit is a bit more than a room’s 68. It makes sense.' },
      ],
    },
    {
      chapter: 'A cold day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'It is $-10^\\circ$C. What is this in degrees Fahrenheit?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1.8 \\times (-10) = -18', '-18 + 32 = 14^\\circ\\text{F}'] },
      ],
      lines: [
        { say: 'On a cold winter day, it is minus ten degrees Celsius. What is this in degrees Fahrenheit?', show: 'q' },
        { say: 'Multiply first: 1.8 times negative ten is negative eighteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add 32: negative eighteen plus 32 is fourteen. It is fourteen degrees Fahrenheit, below freezing on both scales, as it should be.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Multiply first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding first', md: '$(25 + 32) \\times 1.8 = 102.6$ is wrong. A warm day of $25^\\circ$C is not $102.6^\\circ$F. Multiply by $1.8$ first, then add $32$.' }],
      lines: [
        { say: 'A common mistake is to add first. 25 plus 32, times 1.8, is 102.6. But a warm day of 25 Celsius is not 102.6 Fahrenheit, hotter than your body! Multiply by 1.8 first, then add 32.', show: 'oops' },
      ],
    },
    {
      chapter: 'A quick check',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Double it and add 30', md: 'To estimate Fahrenheit, double the Celsius temperature and add $30$. For $25^\\circ$C: $2 \\times 25 + 30 = 80$, close to the exact $77^\\circ$F.' }],
      lines: [
        { say: 'Here is a quick check you can do in your head. To estimate Fahrenheit, double the Celsius temperature and add thirty. For 25 Celsius, two times 25 is fifty, plus thirty is eighty, close to the exact answer of 77. If your answer is far from the estimate, check your steps.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $F = 1.8C + 32$. What is $15^\\circ$C in degrees Fahrenheit?',
          choices: ['$59^\\circ$F', '$84.6^\\circ$F', '$27^\\circ$F', '$47^\\circ$F'],
          answer: 0,
          working: '$1.8 \\times 15 = 27$, and $27 + 32 = 59$. B adds first, C forgets to add $32$, and D adds $32$ to $15$ without multiplying.',
        },
      ],
      lines: [
        { say: 'Your turn. Use F equals 1.8 C plus 32. What is fifteen degrees Celsius in degrees Fahrenheit? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1.8 times fifteen is 27, and 27 plus 32 is 59 degrees Fahrenheit. B adds first, C forgets to add 32, and D adds 32 without multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Celsius to Fahrenheit: F = 1.8C + 32.', 'Multiply by 1.8 first, then add 32.', 'Check with a benchmark.'] }],
      lines: [
        { say: 'Let’s sum up. To change Celsius to Fahrenheit, use F equals 1.8 C plus 32.', show: 'sum.0' },
        { say: 'Multiply by 1.8 first, then add 32.', show: 'sum.1' },
        { say: 'And check your answer with a benchmark. In part three, we go from Fahrenheit back to Celsius. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
