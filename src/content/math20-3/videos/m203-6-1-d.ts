import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-6-1-d',
  lessonId: 'm203-6-1',
  title: 'Personal Budgets, Part 4: Saving for a Goal',
  thumbnailTitle: 'Saving for a Goal',
  thumbnail: 'm',
  summary: 'Adjusting a budget to reach a savings goal: Mateo’s damage deposit (250 dollars a month, so he cuts 70 dollars), where to cut, and why the number of months to reach a goal is always rounded up (Kiona needs 8 months).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.1 · Part 4', title: 'Saving for a Goal', subtitle: 'How much, and how long?' }],
      lines: [
        { say: 'A damage deposit, winter tires, a trip with friends: a savings goal turns a budget into a plan.', show: 'title' },
        { say: 'In this video, you will find how much to save each month, how much to cut, and how many months a goal will take.' },
      ],
    },
    {
      chapter: 'Planning for a goal',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Still needed** = goal − money already saved', '**Each month** = still needed ÷ number of months', '**Compare** with your surplus. If it is too small, cut spending or earn more.'] }],
      lines: [
        { say: 'To plan for a goal, first find how much you still need: the goal, minus any money you have already saved.', show: 'b.0' },
        { say: 'Then divide by the number of months you have, to find how much to save each month.', show: 'b.1' },
        { say: 'Finally, compare that with your surplus. If the surplus is too small, cut your spending, usually a variable expense, or earn more.', show: 'b.2' },
      ],
    },
    {
      chapter: 'Saving for a damage deposit',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Goal: \\$1,800 by September 1. Saved: \\$300. Surplus: \\$180 a month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Mar, Apr, May, Jun, Jul, Aug: } 6 \\text{ months}', '1{,}800 - 300 = 1{,}500', '1{,}500 \\div 6 = 250', '250 - 180 = 70'] },
      ],
      lines: [
        { say: 'It is the start of March. Mateo wants 1,800 dollars for a damage deposit and first month’s rent on an apartment in Lethbridge, by the start of September.', show: 'q' },
        { say: 'He already has 300 dollars saved, and his budget has a surplus of 180 dollars a month. How much must he save each month, and how much must he cut?' },
        { say: 'First, count the months of saving: March, April, May, June, July and August. That is six months. September does not count, because he needs the money at its start.', show: 'm.0', focus: 'm.0' },
        { say: 'He still needs 1,800 minus 300, which is 1,500 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Spread over six months, that is 1,500 divided by six: 250 dollars a month.', show: 'm.2', focus: 'm.2' },
        { say: 'His surplus is only 180 dollars, so he must spend 250 minus 180, which is seventy dollars less each month.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Where to cut',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Spend \\$70 less a month. Look at variable expenses first.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{eating out: } 120 \\to 70, \\text{ which saves } 50', '\\text{entertainment: } 20 \\text{ less}', '50 + 20 = 70'] },
      ],
      lines: [
        { say: 'Where should the seventy dollars come from? Fixed expenses, like rent, are hard to change quickly, so look at variable expenses first.', show: 'q' },
        { say: 'For example, Mateo could cut eating out from 120 dollars a month to seventy, which saves fifty dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'And he could spend twenty dollars less on entertainment.', show: 'm.1', focus: 'm.1' },
        { say: 'Together, that is seventy dollars a month, just what he needs. Earning more works too: a few extra hours of work each month could close the same gap.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'How many months?',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Goal: \\$2,000. Saves \\$275 a month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2{,}000 \\div 275 \\approx 7.27', '7 \\times 275 = 1{,}925 \\quad \\text{not enough}', '8 \\times 275 = 2{,}200 \\quad \\text{enough}'] },
      ],
      lines: [
        { say: 'Kiona can save 275 dollars a month toward 2,000 dollars, for a set of winter tires and a remote starter. How many months will it take?', show: 'q' },
        { say: 'Divide the goal by the monthly savings: 2,000 divided by 275 is about 7.27.', show: 'm.0', focus: 'm.0' },
        { say: 'After seven months, Kiona has only seven times 275, which is 1,925 dollars. That is not enough.', show: 'm.1', focus: 'm.1' },
        { say: 'After eight months, she has 2,200 dollars, which is enough. So it takes eight months.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rounding the months down',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Rounding the months down', md: 'When you find the number of months, always round **up**. Rounding $7.27$ down to $7$ months leaves Kiona \\$75 short.' }],
      lines: [
        { say: 'A common mistake is to round 7.27 down to seven, as you usually would. But seven months leaves Kiona 75 dollars short. When you count the months to reach a goal, always round up.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Eli can save \\$160 a month toward a \\$1,350 laptop. How many months will it take?',
          choices: ['$9$ months', '$8$ months', '$8.4$ months', '$10$ months'],
          answer: 0,
          working: '$1{,}350 \\div 160 \\approx 8.44$. After $8$ months Eli has only \\$1,280, so it takes $9$ months. B rounds down.',
        },
      ],
      lines: [
        { say: 'Your turn. Eli can save 160 dollars a month toward a laptop that costs 1,350 dollars. How many months will it take? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1,350 divided by 160 is about 8.44. After eight months, Eli has only 1,280 dollars, so it takes nine months. B rounds down.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each month = (goal − already saved) ÷ months.', 'Cut the gap between that and your surplus.', 'Round the number of months up.'] }],
      lines: [
        { say: 'Let’s sum up. To save for a goal, subtract what you have already saved, and divide by the number of months.', show: 'sum.0' },
        { say: 'If your surplus is too small, cut the gap from your spending, usually a variable expense, or earn more.', show: 'sum.1' },
        { say: 'And when you count the months to reach a goal, round up. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
