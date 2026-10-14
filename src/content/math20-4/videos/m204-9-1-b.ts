import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-9-1-b',
  lessonId: 'm204-9-1',
  title: 'Data Displays, Part 2: Circle Graphs and Percents',
  thumbnailTitle: 'Circle Graphs',
  thumbnail: 'pie',
  summary: 'What a circle graph shows, turning a slice’s percent into dollars (35% of a 2,400 dollar take-home pay is 840 dollars for rent), comparing two slices (360 dollars more for rent than food), and the shortcut of subtracting the percents first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.1 · Part 2', title: 'Circle Graphs', subtitle: 'Parts of a whole' }],
      lines: [
        { say: 'A circle graph shows where something goes: a budget, a day, or a company’s sales. Each slice is a percent of the whole.', show: 'title' },
        { say: 'In this video, you will turn circle graph percents into real amounts.' },
      ],
    },
    {
      chapter: 'A circle graph',
      layout: 'split',
      leftWidth: 700,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Rent', value: 35 }, { label: 'Food', value: 20 }, { label: 'Transport', value: 15 }, { label: 'Other', value: 15 }, { label: 'Savings', value: 10 }, { label: 'Phone', value: 5 }], percent: true })], 400)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Circle graph', md: 'A **circle graph** shows how one whole is split into parts. Each slice is a percent of the whole, and all the slices add to $100\\%$.' }],
      lines: [
        { say: 'A circle graph shows how one whole is split into parts. Each slice is a percent of the whole, and all the slices add to 100 percent.', show: ['pie', 'def'] },
        { say: 'This graph shows Jordan’s budget. Jordan takes home 2,400 dollars a month. Rent is the biggest slice, at 35 percent.', focus: 'pie.s0' },
        { say: 'Check that the slices add up: 35, plus twenty, plus fifteen, plus fifteen, plus ten, plus five, is 100. Good.' },
      ],
    },
    {
      chapter: 'Percents into dollars',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rent: } 0.35 \\times 2400 = 840', '\\text{food: } 0.20 \\times 2400 = 480', '840 - 480 = 360'] },
      ],
      lines: [
        { say: 'How much does Jordan budget for rent each month? To turn a percent into dollars, change the percent to a decimal and multiply. 35 percent is 0.35, and 0.35 times 2,400 is 840 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'How much more goes to rent than to food? First, food: twenty percent is 0.20, and 0.20 times 2,400 is 480 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract: 840 minus 480 is 360. Jordan budgets 360 dollars more for rent than for food.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Subtract the percents first', md: '$35\\% - 20\\% = 15\\%$, and $0.15 \\times 2400 = 360$. You get the same answer with one multiplication.' },
      ],
      lines: [
        { say: 'Here is a shortcut. Subtract the percents first: 35 percent minus twenty percent is fifteen percent. Then fifteen percent of 2,400 is 0.15 times 2,400: 360 dollars. The same answer, with only one multiplication.', show: 'tip' },
        { say: 'A common mistake is to subtract the percents and stop. Fifteen percent is not the answer in dollars. Multiply by the whole to get dollars.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jordan takes home \\$2,400 a month. Transport is $15\\%$ and Phone is $5\\%$. How much more goes to Transport than to Phone?',
          choices: ['\\$240', '\\$360', '\\$120', '\\$10'],
          answer: 0,
          working: '$15\\% - 5\\% = 10\\%$, and $0.10 \\times 2400 = 240$. B is the Transport amount, C is the Phone amount, and D is the percent, not dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Jordan takes home 2,400 dollars a month. Transport is fifteen percent, and Phone is five percent. How much more goes to Transport than to Phone? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen percent minus five percent is ten percent, and ten percent of 2,400 is 240 dollars. B is the Transport amount, C is the Phone amount, and D stops at the percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A circle graph splits one whole into slices that add to 100%.', 'Amount = percent as a decimal × the whole.', 'Compare slices: subtract the percents, then multiply.'] }],
      lines: [
        { say: 'Let’s sum up. A circle graph splits one whole into slices that add to 100 percent.', show: 'sum.0' },
        { say: 'To find an amount, change the percent to a decimal and multiply by the whole.', show: 'sum.1' },
        { say: 'And to compare two slices, subtract the percents, then multiply. In part three, we find a percent from data. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
