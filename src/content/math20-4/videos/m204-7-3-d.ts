import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-7-3-d',
  lessonId: 'm204-7-3',
  title: 'Composite Shapes, Part 4: Waste and GST',
  thumbnailTitle: 'Waste and GST',
  thumbnail: 'm',
  summary: 'A whole flooring job step by step: 10% extra for waste (10.8 m² × 1.1 = 11.88 m²), 6 boxes at 39.99 dollars, and GST at the 5% rate given in the lesson, for a total of 251.94 dollars.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.3 · Part 4', title: 'Waste and GST', subtitle: 'The whole job, step by step' }],
      lines: [
        { say: 'Installers cut pieces to fit around walls and doorways, so some flooring is always wasted. And at the till, tax is added.', show: 'title' },
        { say: 'In this video, you will add extra for waste, find the boxes and the cost, and add GST.' },
      ],
    },
    {
      chapter: 'Waste and GST',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'w', tone: 'tip', title: 'Extra for waste', md: 'Installers often buy $10\\%$ extra to allow for cutting and waste. To add $10\\%$, multiply the **area** by $1.1$ **before** you divide.' },
        { kind: 'callout', id: 'g', tone: 'definition', title: 'GST in this lesson', md: 'In this lesson, GST of $5\\%$ is added to the price. Find $5\\%$ of the cost ($\\times 0.05$), then add it on.' },
      ],
      lines: [
        { say: 'Installers often buy ten percent extra to allow for cutting and waste. To add ten percent, multiply the area by 1.1, before you divide.', show: 'w' },
        { say: 'In this lesson, GST of five percent is added to the price. Find five percent of the cost, by multiplying by 0.05, then add it on.', show: 'g' },
      ],
    },
    {
      chapter: 'Flooring with waste and GST',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Area $10.8$ m², plus $10\\%$ for waste. Each box covers $2.2$ m² and costs \\$39.99.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['10.8 \\times 1.1 = 11.88 \\text{ m}^2', '11.88 \\div 2.2 = 5.4 \\to 6 \\text{ boxes}', '6 \\times 39.99 = 239.94', '239.94 \\times 0.05 \\approx 12.00', '239.94 + 12.00 = 251.94'] },
      ],
      lines: [
        { say: 'The bedroom from part three is 10.8 square metres. Add ten percent for waste. Each box covers 2.2 square metres and costs 39 dollars 99. What is the total cost with GST?', show: 'q' },
        { say: 'Add the waste: 10.8 times 1.1 is 11.88 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Boxes: 11.88 divided by 2.2 is 5.4, so round up to six boxes.', show: 'm.1', focus: 'm.1' },
        { say: 'Cost before tax: six times 39.99 is 239 dollars 94.', show: 'm.2', focus: 'm.2' },
        { say: 'GST: 239.94 times 0.05 is about twelve dollars.', show: 'm.3', focus: 'm.3' },
        { say: 'Total: 239.94 plus twelve is 251 dollars 94.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Add the waste to the area',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding the waste to the boxes', md: 'Add the $10\\%$ to the **area** before you divide. If you add it after rounding, you may buy the wrong number of boxes.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Make a list of steps', md: 'Area → add waste → divide → round up → multiply by the price → add GST.' },
      ],
      lines: [
        { say: 'A common mistake is to add the waste to the boxes. Add the ten percent to the area before you divide. If you add it after rounding, you may buy the wrong number of boxes.', show: 'oops' },
        { say: 'Here is a tip: make a list of steps. Area, add waste, divide, round up, multiply by the price, then add GST. Do one step at a time.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A floor is $20$ m². Add $10\\%$ for waste. Each box covers $2.5$ m² and costs \\$30.00. GST is $5\\%$. What is the total cost?',
          choices: ['\\$283.50', '\\$270.00', '\\$252.00', '\\$13.50'],
          answer: 0,
          working: '$20 \\times 1.1 = 22$ m². $22 \\div 2.5 = 8.8$, so $9$ boxes. $9 \\times 30 = 270.00$. GST: $13.50$. Total: $283.50$. B forgets GST, C forgets the waste, and D is the GST only.',
        },
      ],
      lines: [
        { say: 'Your turn. A floor is twenty square metres. Add ten percent for waste. Each box covers 2.5 square metres and costs thirty dollars. GST is five percent. What is the total cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. With waste, the area is 22 square metres. 22 divided by 2.5 is 8.8, so nine boxes. Nine times thirty is 270 dollars, and the GST is thirteen fifty, for a total of 283 dollars fifty. B forgets the GST, and C forgets the waste.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add 10% for waste: area × 1.1, before dividing.', 'Divide, round up, multiply by the price.', 'Add 5% GST: cost × 0.05, then add it on.'] }],
      lines: [
        { say: 'Let’s sum up. To add ten percent for waste, multiply the area by 1.1, before you divide.', show: 'sum.0' },
        { say: 'Then divide, round up, and multiply by the price.', show: 'sum.1' },
        { say: 'And add GST at the rate given: find five percent of the cost, then add it on. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
