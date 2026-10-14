import type { Explainer } from '@/video/script.ts';
import { circleGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-6-1-c',
  lessonId: 'm203-6-1',
  title: 'Personal Budgets, Part 3: Percent of Income and Circle Graphs',
  thumbnailTitle: 'Percent of Income',
  thumbnail: 'pie',
  summary: 'The percent of income for an expense (Amara’s rent is about 33.7% and her housing about 37.9%), comparing with a guideline given in the question, and reading dollar amounts from a circle graph of a planned budget.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.1 · Part 3', title: 'Percent of Income', subtitle: 'How big is each slice?' }],
      lines: [
        { say: 'Is 725 dollars a month a lot for rent? It depends on how much you earn. A percent compares an expense with your whole income.', show: 'title' },
        { say: 'In this video, you will find the percent of income for an expense, and read a budget from a circle graph.' },
      ],
    },
    {
      chapter: 'Percent of income',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{percent of income} = \\dfrac{\\text{expense}}{\\text{net income}} \\times 100'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rent: } \\dfrac{725}{2{,}150} \\times 100 \\approx 33.7\\%', '\\text{housing: } 725 + 68.40 + 22 = 815.40', '\\dfrac{815.40}{2{,}150} \\times 100 \\approx 37.9\\%'] },
      ],
      lines: [
        { say: 'To find the percent of income for an expense, divide the expense by net income, and multiply by 100.', show: 'f' },
        { say: 'Amara’s net income is 2,150 dollars a month, and her share of the rent is 725 dollars. 725 divided by 2,150, times 100, is about 33.7 percent. So about a third of her pay goes to rent.', show: 'm.0', focus: 'm.0' },
        { say: 'Housing costs more than the rent. Add her share of the utilities, 68 dollars 40, and her tenant insurance, 22 dollars: 815 dollars 40 in all.', show: 'm.1', focus: 'm.1' },
        { say: '815.40 divided by 2,150, times 100, is about 37.9 percent of her income.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Comparing with a guideline',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Use the guideline you are given', md: 'Budgeting guides suggest a target percent for each category, but their targets differ. A question will always tell you the guideline to use.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['37.9\\% > 35\\%', '0.35 \\times 2{,}150 = 752.50', '815.40 - 752.50 = 62.90'] },
      ],
      lines: [
        { say: 'Many budgeting guides suggest a target percent for each category. Their targets differ, so a question will always tell you the guideline to use.', show: 'key' },
        { say: 'Suppose that in this example, a guideline says housing should be at most 35 percent of net income. Amara’s 37.9 percent is more than that.', show: 'm.0', focus: 'm.0' },
        { say: 'In dollars, 35 percent of 2,150 is 0.35 times 2,150: 752 dollars 50.', show: 'm.1', focus: 'm.1' },
        { say: 'Amara’s housing costs 815.40, which is 62 dollars 90 over the guideline. She might look for a cheaper place when her lease ends, or spend less somewhere else.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A circle graph',
      layout: 'split',
      leftWidth: 700,
      left: [figure('pie', [circleGraph({ slices: [{ label: 'Housing', value: 35 }, { label: 'Food', value: 20 }, { label: 'Transportation', value: 15 }, { label: 'Savings', value: 10 }, { label: 'Other', value: 20 }], percent: true })], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['0.20 \\times 2{,}400 = 480', '0.35 \\times 2{,}400 = 840'] }],
      lines: [
        { say: 'A circle graph shows a planned budget at a glance. The whole circle is all of the net income, 100 percent, and each slice is one category. Here is Mateo’s planned budget.', show: 'pie' },
        { say: 'Housing is the biggest slice, at 35 percent, and he plans to save 10 percent.', focus: ['pie.s0', 'pie.s3'] },
        { say: 'Mateo’s net income is 2,400 dollars a month. How much does his plan set aside for food? The graph shows food is 20 percent, which is 0.20 as a decimal.', focus: 'pie.s1' },
        { say: '0.20 times 2,400 is 480 dollars a month for food.', show: 'm.0', focus: 'm.0' },
        { say: 'In the same way, housing gets 0.35 times 2,400, which is 840 dollars.', show: 'm.1', focus: ['pie.s0', 'm.1'] },
      ],
    },
    {
      chapter: 'Two directions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'key', tone: 'key', title: 'Two directions', md: '**Expense to percent:** divide by net income, then multiply by $100$.\n\n**Percent to dollars:** change the percent to a decimal, then multiply by net income.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the decimal', md: '$20 \\times 2{,}400 = 48{,}000$ is more than the whole income, so it cannot be right. Use $20\\% = 0.20$.' },
      ],
      lines: [
        { say: 'So there are two directions. To go from an expense to a percent, divide by net income, and multiply by 100. To go from a percent to dollars, change the percent to a decimal, and multiply by net income.', show: 'key' },
        { say: 'A common mistake is to multiply by 20 instead of 0.20. That gives 48,000 dollars for food, far more than Mateo’s whole income, so it cannot be right.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Noor’s net income is \\$1,800 a month, and the phone plan costs \\$63 a month. What percent of Noor’s income is the phone plan?',
          choices: ['$3.5\\%$', '$35\\%$', '$0.035\\%$', '$28.6\\%$'],
          answer: 0,
          working: '$63 \\div 1{,}800 = 0.035$, and $0.035 \\times 100 = 3.5\\%$. C forgets to multiply by $100$, and D divides the wrong way.',
        },
      ],
      lines: [
        { say: 'Your turn. Noor’s net income is 1,800 dollars a month, and the phone plan costs 63 dollars a month. What percent of Noor’s income is the phone plan? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 63 divided by 1,800 is 0.035, and times 100, that is 3.5 percent. C forgets to multiply by 100, and D divides the wrong way.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent of income = expense ÷ net income × 100.', 'An amount = percent (as a decimal) × net income.', 'Compare with the guideline the question gives.'] }],
      lines: [
        { say: 'Let’s sum up. The percent of income is the expense divided by net income, times 100.', show: 'sum.0' },
        { say: 'To find an amount, change the percent to a decimal, and multiply by net income.', show: 'sum.1' },
        { say: 'And compare with the guideline the question gives you. In part four, we adjust a budget to reach a savings goal. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
