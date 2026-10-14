import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-3-4-b',
  lessonId: 'm103-3-4',
  title: 'Temperature, Part 2: Fahrenheit to Celsius, Estimates and Changes',
  thumbnailTitle: 'Fahrenheit to Celsius',
  summary: 'Rearranging the formula to C = 5/9 (F − 32), keeping the brackets, the double-and-add-30 estimate, and converting a temperature change with 9/5 only.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 3.4 · Part 2', title: 'Fahrenheit to Celsius', subtitle: 'Converting back, estimating and changes' }],
      lines: [
        { say: 'A recipe says to bake at 350 degrees Fahrenheit, but your oven is in Celsius. What do you set it to?', show: 'title' },
        { say: 'In this video, you will convert Fahrenheit to Celsius, estimate quickly, and convert a change in temperature.' },
      ],
    },
    {
      chapter: 'Rearranging',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['F = \\tfrac95 C + 32', 'F - 32 = \\tfrac95 C', 'C = \\tfrac59(F - 32)'] },
      ],
      lines: [
        { say: 'To go the other way, rearrange the formula by undoing its steps in reverse order. The formula multiplies by nine fifths, then adds 32.', show: 'm.0', focus: 'm.0' },
        { say: 'Undo the last step first: subtract 32 from both sides. F minus 32 equals nine fifths C.', show: 'm.1', focus: 'm.1' },
        { say: 'Then undo the multiplication: multiply both sides by five ninths. C equals five ninths, times F minus 32.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An American oven',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['C = \\tfrac59(350 - 32) = \\tfrac59(318) \\approx 177', '\\bad{\\tfrac59(350) - 32 \\approx 162} \\quad \\text{too low}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the brackets', md: 'Subtract 32 **first**, then multiply by $\\tfrac59$. On a calculator, type the brackets.' },
      ],
      lines: [
        { say: 'The recipe says 350 degrees Fahrenheit. Subtract 32: 318. Then five ninths of 318 is about 177 degrees Celsius. Ovens are usually set to 180.', show: 'm.0', focus: 'm.0' },
        { say: 'Keep the brackets. Five ninths of 350, minus 32, is about 162, which is too low. Subtract 32 first, then multiply by five ninths.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A quick estimate',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{estimate: } 2(30) + 30 = 90^\\circ\\text{F}', '\\text{exact: } \\tfrac95(30) + 32 = 86^\\circ\\text{F}'] },
      ],
      lines: [
        { say: 'For a quick estimate from Celsius to Fahrenheit, double it and add thirty. To go back, subtract thirty and halve.', show: 'm.0' },
        { say: 'Thirty degrees Celsius: double is sixty, plus thirty is about ninety Fahrenheit. The exact value is 86, so the estimate is four degrees high, but close enough to know it is a hot day.', show: 'm.1', focus: ['m.0', 'm.1'] },
        { say: 'The estimate is good for weather. For cooking, medicine or equipment, use the formula.' },
      ],
    },
    {
      chapter: 'A change in temperature',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['5 - (-25) = 30 \\text{ Celsius degrees}', '\\tfrac95 \\times 30 = 54 \\text{ Fahrenheit degrees}'] },
        { kind: 'callout', id: 'key', tone: 'key', title: 'No + 32 for a change', md: 'A change converts with $\\tfrac95$ or $\\tfrac59$ only. The $32$ only shifts where the scale starts.' },
      ],
      lines: [
        { say: 'A change in temperature is different from a temperature. A chinook raised the temperature in Calgary from negative 25 Celsius to five Celsius. That is a rise of thirty Celsius degrees.', show: 'm.0', focus: 'm.0' },
        { say: 'One Celsius degree is the same size as 1.8 Fahrenheit degrees, so multiply by nine fifths: 54 Fahrenheit degrees.', show: 'm.1', focus: 'm.1' },
        { say: 'There is no plus 32 for a change, because the 32 only shifts where the scale starts.', show: 'key' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A coolant gauge reads $230^\\circ\\text{F}$. What is that in degrees Celsius?',
          choices: ['$110^\\circ\\text{C}$', '$95.8^\\circ\\text{C}$', '$446^\\circ\\text{C}$', '$127.8^\\circ\\text{C}$'],
          answer: 0,
          working: '$C = \\tfrac59(230 - 32) = \\tfrac59(198) = 110$.',
        },
      ],
      lines: [
        { say: 'Your turn. A coolant gauge reads 230 degrees Fahrenheit. What is that in degrees Celsius? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 230 minus 32 is 198, and five ninths of 198 is 110 degrees Celsius. B forgets the brackets, and D forgets to subtract 32.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Fahrenheit to Celsius: $C = \\tfrac59(F - 32)$. Subtract 32 first.', 'Quick estimate: double and add 30, or subtract 30 and halve.', 'A temperature change converts with $\\tfrac95$ or $\\tfrac59$ only.'] }],
      lines: [
        { say: 'Let’s sum up. To change Fahrenheit to Celsius, subtract 32 first, then multiply by five ninths.', show: 'sum.0' },
        { say: 'For a quick estimate, double and add thirty, or subtract thirty and halve.', show: 'sum.1' },
        { say: 'And a change in temperature converts with nine fifths or five ninths only. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
