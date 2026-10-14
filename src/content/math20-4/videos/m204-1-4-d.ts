import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-4-d',
  lessonId: 'm204-1-4',
  title: 'Percent Problems, Part 4: New Amounts and Finding the Whole',
  thumbnailTitle: 'New Amounts and the Whole',
  thumbnail: 'm',
  summary: 'Finding a new amount after a percent change (rent of 1,150 dollars up 4% is 1,196 dollars, a jacket at 30% off is 62.99 dollars), and finding the whole from a part: a 45 dollar deposit that is 15% of the price means a 300 dollar couch.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.4 · Part 4', title: 'New Amounts and the Whole', subtitle: 'Before, after, and the full price' }],
      lines: [
        { say: 'What will the new rent be? What does the jacket cost on sale? And if a deposit is fifteen percent of the price, what is the full price?', show: 'title' },
        { say: 'In this video, you will find new amounts after a percent change, and find a whole from one of its parts.' },
      ],
    },
    {
      chapter: 'A new rent',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Rent of \\$1,150 a month goes up $4\\%$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.04 \\times 1150 = 46', '1150 + 46 = 1196'] },
      ],
      lines: [
        { say: 'In this example, rent of 1,150 dollars a month goes up four percent. What is the new rent?', show: 'q' },
        { say: 'First, find the increase: four percent is 0.04, and 0.04 times 1,150 is 46 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Then add it on: 1,150 plus 46 is 1,196. The new rent is 1,196 dollars a month.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A sale price',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A jacket costs \\$89.99. It is $30\\%$ off.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.30 \\times 89.99 = 26.997', '89.99 - 26.997 = 62.993 \\approx \\$62.99'] },
      ],
      lines: [
        { say: 'A jacket costs 89 dollars 99, and it is thirty percent off. What is the sale price, to the nearest cent?', show: 'q' },
        { say: 'Find the discount: 0.30 times 89.99 is 26.997 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract it from the price: 89.99 minus 26.997 is 62.993, which rounds to 62 dollars 99. Round only at the end.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1.04 \\times 1150 = 1196', '0.70 \\times 89.99 \\approx 62.99'] }],
      lines: [
        { say: 'Here is a shortcut. After a four percent increase, the new rent is 104 percent of the old rent: 1.04 times 1,150 is 1,196, in one step.', show: 'm.0', focus: 'm.0' },
        { say: 'And after thirty percent off, you pay seventy percent of the price: 0.70 times 89.99 is about 62.99. Both ways give the same answer.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the whole',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A \\$45 deposit is $15\\%$ of the full price of a couch.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['0.15 \\times \\text{price} = 45', '45 \\div 0.15 = 300', '300 - 45 = 255'] },
      ],
      lines: [
        { say: 'Sometimes you know a part and its percent, and need the whole. Liam pays a deposit of 45 dollars on a couch, and the deposit is fifteen percent of the full price. What is the full price, and how much does he still owe?', show: 'q' },
        { say: 'Fifteen percent of the price is 45 dollars: 0.15 times the price equals 45.', show: 'm.0', focus: 'm.0' },
        { say: 'To undo the multiplying, divide: 45 divided by 0.15 is 300. The couch costs 300 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'He still owes 300 minus 45: 255 dollars. Check: fifteen percent of 300 is 45. It works.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A \\$70 deposit is $20\\%$ of the full price of a bike. What is the full price?',
          choices: ['\\$350', '\\$14', '\\$84', '\\$280'],
          answer: 0,
          working: '$70 \\div 0.20 = 350$. Check: $20\\%$ of \\$350 is \\$70. B multiplies instead of dividing, and D is what is still owed.',
        },
      ],
      lines: [
        { say: 'Your turn. A seventy-dollar deposit is twenty percent of the full price of a bike. What is the full price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Seventy divided by 0.20 is 350 dollars. Check: twenty percent of 350 is seventy. B multiplies instead of dividing, and D is what is still owed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['New amount: find the change, then add or subtract it.', 'Or multiply by 104%, 70% and so on, in one step.', 'Finding the whole: part ÷ percent as a decimal.'] }],
      lines: [
        { say: 'Let’s sum up. To find a new amount, find the change, then add it for an increase or subtract it for a decrease.', show: 'sum.0' },
        { say: 'Or multiply by the percent that is left, such as 104 percent or seventy percent, in one step.', show: 'sum.1' },
        { say: 'And to find the whole from a part, divide the part by the percent as a decimal. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
