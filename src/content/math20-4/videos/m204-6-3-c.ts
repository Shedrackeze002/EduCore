import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-6-3-c',
  lessonId: 'm204-6-3',
  title: 'Temperature, Part 3: Fahrenheit to Celsius',
  thumbnailTitle: 'Fahrenheit to Celsius',
  thumbnail: 'm',
  summary: 'Changing Fahrenheit to Celsius with C = (F − 32) ÷ 1.8, subtracting first: an oven at 350°F is about 177°C, and a buffet thermometer at 135°F is about 57°C, below a 60°C rule given in the question.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 6.3 · Part 3', title: 'Fahrenheit to Celsius', subtitle: 'Subtract, then divide' }],
      lines: [
        { say: 'A US recipe gives an oven temperature in Fahrenheit, but your oven shows Celsius. Now you need to go the other way.', show: 'title' },
        { say: 'In this video, you will change Fahrenheit to Celsius, and use it to make a decision at work.' },
      ],
    },
    {
      chapter: 'Undo in reverse order',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['C = (F - 32) \\div 1.8'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Two steps', md: '**Subtract** $32$ first. **Then divide** by $1.8$.' },
      ],
      lines: [
        { say: 'To change Fahrenheit to Celsius, undo the steps of the other formula in reverse order: C equals F minus 32, divided by 1.8.', show: 'f', focus: 'f' },
        { say: 'Subtract 32 first, then divide by 1.8. It is the same as solving F equals 1.8 C plus 32 for C, as you did in Lesson 5.2.', show: 'tip' },
      ],
    },
    {
      chapter: 'A US recipe',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A recipe says to bake at $350^\\circ$F. Answer to the nearest degree.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['350 - 32 = 318', '318 \\div 1.8 \\approx 176.67 \\approx 177^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'A US recipe says to bake at 350 degrees Fahrenheit. The oven shows degrees Celsius. What temperature should you use, to the nearest degree?', show: 'q' },
        { say: 'Subtract 32 first: 350 minus 32 is 318.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by 1.8: 318 divided by 1.8 is about 176.67. Set the oven to about 177 degrees Celsius, close to the 180 benchmark for cookies.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Is the food hot enough?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'In this example, hot food on a buffet must be kept at $60^\\circ$C or hotter. A US thermometer reads $135^\\circ$F.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['135 - 32 = 103', '103 \\div 1.8 \\approx 57.2 \\approx 57^\\circ\\text{C}'] },
      ],
      lines: [
        { say: 'In this example, hot food on a buffet must be kept at sixty degrees Celsius or hotter. A US thermometer reads 135 degrees Fahrenheit. Is the food hot enough?', show: 'q' },
        { say: 'Subtract 32: 135 minus 32 is 103.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by 1.8: 103 divided by 1.8 is about 57.2, about 57 degrees Celsius.', show: 'm.1', focus: 'm.1' },
        { say: '57 is colder than sixty, so the food is not hot enough. It needs to be heated before it is served.' },
      ],
    },
    {
      chapter: 'Subtract first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: '$350 \\div 1.8 - 32 \\approx 162$ is wrong. The brackets in $(F - 32)$ tell you to subtract $32$ first.' }],
      lines: [
        { say: 'A common mistake is to divide first. 350 divided by 1.8, minus 32, is about 162. That is wrong. The brackets around F minus 32 tell you to subtract 32 first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $C = (F - 32) \\div 1.8$. What is $104^\\circ$F in degrees Celsius?',
          choices: ['$40^\\circ$C', '$25.8^\\circ$C', '$129.6^\\circ$C', '$72^\\circ$C'],
          answer: 0,
          working: '$104 - 32 = 72$, and $72 \\div 1.8 = 40$. B divides first, C multiplies by $1.8$, and D forgets to divide.',
        },
      ],
      lines: [
        { say: 'Your turn. Use C equals F minus 32, divided by 1.8. What is 104 degrees Fahrenheit in degrees Celsius? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 104 minus 32 is 72, and 72 divided by 1.8 is forty degrees Celsius, a very hot day. B divides first, C multiplies by 1.8 instead of dividing, and D forgets to divide.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fahrenheit to Celsius: C = (F − 32) ÷ 1.8.', 'Subtract 32 first, then divide by 1.8.', 'Use benchmarks to check.'] }],
      lines: [
        { say: 'Let’s sum up. To change Fahrenheit to Celsius, use the formula C equals F minus 32, divided by 1.8.', show: 'sum.0' },
        { say: 'Subtract 32 first, then divide by 1.8.', show: 'sum.1' },
        { say: 'And use benchmarks to check that the answer makes sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
