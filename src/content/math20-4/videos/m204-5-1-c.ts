import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-1-c',
  lessonId: 'm204-5-1',
  title: 'Using Formulas, Part 3: The Temperature Formula',
  thumbnailTitle: 'Celsius to Fahrenheit',
  thumbnail: 'm',
  summary: 'Changing degrees Celsius to degrees Fahrenheit with F = 1.8C + 32: a warm day of 25°C is 77°F, and a cold morning of −20°C is −4°F, with negative numbers in brackets on a calculator.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.1 · Part 3', title: 'Celsius to Fahrenheit', subtitle: 'F = 1.8C + 32' }],
      lines: [
        { say: 'Canada measures temperature in degrees Celsius, but many recipes, ovens and weather apps from the United States use degrees Fahrenheit.', show: 'title' },
        { say: 'In this video, you will use a formula to change degrees Celsius to degrees Fahrenheit, including below zero.' },
      ],
    },
    {
      chapter: 'The temperature formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['F = 1.8C + 32'] },
        { kind: 'bullets', id: 'v', items: ['$F$ is the temperature in degrees Fahrenheit.', '$C$ is the temperature in degrees Celsius.'] },
      ],
      lines: [
        { say: 'To change degrees Celsius to degrees Fahrenheit, use F equals 1.8 C plus 32.', show: 'f', focus: 'f' },
        { say: 'F is the temperature in degrees Fahrenheit, and C is the temperature in degrees Celsius. Like the taxi formula, it has a multiply and an add, so multiply first.', show: 'v' },
      ],
    },
    {
      chapter: 'A warm day',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'It is $25^\\circ\\text{C}$. What is that in degrees Fahrenheit?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['F = 1.8 \\times 25 + 32', 'F = 45 + 32', 'F = 77'] },
      ],
      lines: [
        { say: 'It is a warm day: 25 degrees Celsius. What is that in degrees Fahrenheit?', show: 'q' },
        { say: 'Substitute C equals 25: F equals 1.8 times 25, plus 32.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first: 1.8 times 25 is 45.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: 45 plus 32 is 77. So 25 degrees Celsius is 77 degrees Fahrenheit.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A quick estimate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Double it and add 30', md: 'For a rough answer, **double** the Celsius temperature and **add 30**: $2 \\times 25 + 30 = 80$, close to $77$.' }],
      lines: [
        { say: 'Here is a quick way to estimate in your head. Double the Celsius temperature, and add thirty. Two times 25 is fifty, plus thirty is eighty, close to the exact answer of 77. Use the formula when you need the exact value.', show: 'tip' },
      ],
    },
    {
      chapter: 'A cold morning',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'It is $-20^\\circ\\text{C}$. What is that in degrees Fahrenheit?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['F = 1.8 \\times (-20) + 32', 'F = -36 + 32', 'F = -4'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Negative numbers on a calculator', md: 'Put a negative number in brackets, like $1.8 \\times (-20)$. Use the $(-)$ key, not the subtract key.' },
      ],
      lines: [
        { say: 'Now a cold winter morning: minus twenty degrees Celsius. What is that in degrees Fahrenheit?', show: 'q' },
        { say: 'Substitute C equals negative twenty, in brackets: F equals 1.8 times negative twenty, plus 32.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply first: a positive times a negative is negative, so 1.8 times negative twenty is negative 36.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add: negative 36 plus 32 is negative four. So minus twenty degrees Celsius is minus four degrees Fahrenheit.', show: 'm.2', focus: 'm.2' },
        { say: 'On a calculator, put a negative number in brackets, and use the negative key, not the subtract key.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $F = 1.8C + 32$. What is $-10^\\circ\\text{C}$ in degrees Fahrenheit?',
          choices: ['$14^\\circ\\text{F}$', '$50^\\circ\\text{F}$', '$-50^\\circ\\text{F}$', '$-18^\\circ\\text{F}$'],
          answer: 0,
          working: '$F = 1.8 \\times (-10) + 32 = -18 + 32 = 14$. B uses $+10$, and D forgets to add $32$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use F equals 1.8 C plus 32. What is minus ten degrees Celsius in degrees Fahrenheit? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1.8 times negative ten is negative eighteen, and negative eighteen plus 32 is fourteen degrees Fahrenheit. B uses positive ten, and D forgets to add 32.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Celsius to Fahrenheit: F = 1.8C + 32.', 'Multiply first, then add 32.', 'Put negative numbers in brackets.'] }],
      lines: [
        { say: 'Let’s sum up. To change Celsius to Fahrenheit, use F equals 1.8 C plus 32.', show: 'sum.0' },
        { say: 'Multiply first, then add 32.', show: 'sum.1' },
        { say: 'And put negative numbers in brackets when you substitute. In part four, we use a formula as one step in a bigger job. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
