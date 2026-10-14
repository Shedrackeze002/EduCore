import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-4-1-c',
  lessonId: 'm204-4-1',
  title: 'Making a Budget, Part 3: Budgets as Percents',
  thumbnailTitle: 'Budgets as Percents',
  thumbnail: 'pie',
  summary: 'Reading a budget circle graph (20% of 2,400 dollars for food is 480 dollars), and finding what percent of take-home pay an expense takes (975 dollars rent out of 2,860 dollars is about 34.1%).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.1 · Part 3', title: 'Budgets as Percents', subtitle: 'Slices of your income' }],
      lines: [
        { say: 'A budget can also be planned in percents: so much for rent, so much for food, so much for savings. A circle graph shows the whole plan at a glance.', show: 'title' },
        { say: 'In this video, you will read a budget circle graph, and find what percent of your income an expense takes.' },
      ],
    },
    {
      chapter: 'Reading a circle graph',
      layout: 'split',
      leftWidth: 700,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Rent', value: 40 }, { label: 'Food', value: 20 }, { label: 'Transportation', value: 15 }, { label: 'Savings', value: 10 }, { label: 'Other', value: 15 }], percent: true })], 360)],
      right: [
        { kind: 'text', id: 'q', md: 'Mateo takes home \\$2,400 a month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['20\\% = 0.2', '0.2 \\times 2{,}400 = 480', '0.4 \\times 2{,}400 = 960'] },
      ],
      lines: [
        { say: 'This circle graph shows Mateo’s monthly budget. The whole circle is 100 percent of the take-home pay, and each slice is one part of the plan.', show: 'pie' },
        { say: 'Mateo takes home 2,400 dollars a month. How much does his plan set aside for food?', show: 'q' },
        { say: 'The graph shows food is twenty percent. As a decimal, that is 0.2.', show: 'm.0', focus: ['pie.s1', 'm.0'] },
        { say: 'And 0.2 times 2,400 is 480 dollars for food each month.', show: 'm.1', focus: 'm.1' },
        { say: 'In the same way, rent is forty percent: 0.4 times 2,400 is 960 dollars.', show: 'm.2', focus: ['pie.s0', 'm.2'] },
        { say: 'Notice that the slices add to 100 percent: forty, twenty, fifteen, ten and fifteen. A budget plan always shares out the whole income.' },
      ],
    },
    {
      chapter: 'Percent of income',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{percent of income} = \\dfrac{\\text{expense}}{\\text{income}} \\times 100'] },
        { kind: 'text', id: 'q', md: 'Priya takes home \\$2,860 a month and pays \\$975 for rent.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{975}{2{,}860} \\times 100 \\approx 34.09\\%'] },
      ],
      lines: [
        { say: 'Now go the other way. To find what percent of your income an expense takes, divide the expense by the income, then multiply by 100.', show: 'f', focus: 'f' },
        { say: 'Priya takes home 2,860 dollars a month, and pays 975 dollars for rent. What percent of her take-home pay goes to rent?', show: 'q' },
        { say: '975 divided by 2,860 is about 0.3409. Times 100, that is about 34.1 percent.', show: 'm', focus: 'm' },
        { say: 'So about a third of Priya’s take-home pay goes to rent. Knowing the percent makes it easy to compare with a plan, like Mateo’s forty percent.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Lena takes home \\$2,500 a month and pays \\$900 for rent. What percent of the take-home pay goes to rent?',
          choices: ['$36\\%$', '$277.8\\%$', '$0.36\\%$', '$64\\%$'],
          answer: 0,
          working: '$900 \\div 2{,}500 \\times 100 = 36\\%$. B divides the wrong way, C forgets to multiply by $100$, and D is the percent that is left.',
        },
      ],
      lines: [
        { say: 'Your turn. Lena takes home 2,500 dollars a month, and pays 900 dollars for rent. What percent of the take-home pay goes to rent? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 900 divided by 2,500 is 0.36, and times 100 that is 36 percent. B divides the wrong way, C forgets to multiply by 100, and D is the percent that is left.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A budget circle graph: the whole circle is 100% of income.', 'Amount = percent as a decimal × income.', 'Percent of income = expense ÷ income × 100.'] }],
      lines: [
        { say: 'Let’s sum up. In a budget circle graph, the whole circle is 100 percent of the income.', show: 'sum.0' },
        { say: 'To find an amount, multiply the percent as a decimal by the income.', show: 'sum.1' },
        { say: 'And to find a percent, divide the expense by the income, then multiply by 100. In part four, we save for a goal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
