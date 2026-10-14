import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-1-d',
  lessonId: 'm204-4-1',
  title: 'Making a Budget, Part 4: Saving for a Goal',
  thumbnailTitle: 'Saving for a Goal',
  thumbnail: 'm',
  summary: 'Saving for a goal by splitting it into equal monthly amounts (900 dollars for winter tires in 6 months is 150 dollars a month, 40 dollars more than is left over now), putting yearly costs in a monthly budget, and paying yourself first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.1 · Part 4', title: 'Saving for a Goal', subtitle: 'A little every month' }],
      lines: [
        { say: 'A damage deposit, a used car, or a set of winter tires can feel out of reach. A budget breaks a big goal into small monthly steps.', show: 'title' },
        { say: 'In this video, you will plan monthly savings for a goal, and find how much to cut back if you are short.' },
      ],
    },
    {
      chapter: 'Save each month',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{save each month} = \\text{goal} \\div \\text{number of months}'] },
        { kind: 'text', id: 'q', md: 'Daniel wants \\$900 for winter tires in $6$ months. Right now he has \\$110 left over each month.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['900 \\div 6 = 150', '150 - 110 = 40'] },
      ],
      lines: [
        { say: 'To save for a goal, split it into equal monthly amounts: the goal divided by the number of months.', show: 'f', focus: 'f' },
        { say: 'Daniel wants 900 dollars for winter tires in six months. Right now, he has 110 dollars left over each month. How much less must he spend each month?', show: 'q' },
        { say: 'First, the monthly savings: 900 divided by six is 150 dollars a month.', show: 'm.0', focus: 'm.0' },
        { say: 'Daniel has only 110 dollars left over, so he is short by 150 minus 110: forty dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'So he must spend forty dollars less each month, for example, on eating out, a variable expense.' },
      ],
    },
    {
      chapter: 'Costs that do not come every month',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting costs that do not come every month', md: 'Car repairs, gifts and yearly fees are easy to forget. Divide a yearly cost by $12$ and put that amount in your monthly budget.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['480 \\div 12 = 40 \\text{ per month}'] },
      ],
      lines: [
        { say: 'A common mistake is to forget costs that do not come every month. Car repairs, gifts and yearly fees are easy to miss. Divide a yearly cost by twelve, and put that amount in your monthly budget.', show: 'oops' },
        { say: 'For example, if you spend about 480 dollars a year on gifts, set aside 480 divided by twelve: forty dollars a month.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Pay yourself first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Pay yourself first', md: 'On payday, move your savings into a separate account right away. Then live on what is left.' }],
      lines: [
        { say: 'Here is a tip: pay yourself first. On payday, move your savings into a separate account right away. Then live on what is left. Money you never see in your spending account is much harder to spend.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Kiara wants \\$1,200 for a damage deposit in $8$ months. Right now Kiara has \\$90 left over each month. How much less must Kiara spend each month?',
          choices: ['\\$60', '\\$150', '\\$90', '\\$1,110'],
          answer: 0,
          working: 'Save each month: $1{,}200 \\div 8 = 150$. Short by $150 - 90 = 60$. B is the monthly savings, and D subtracts the \\$90 from the whole goal.',
        },
      ],
      lines: [
        { say: 'Your turn. Kiara wants 1,200 dollars for a damage deposit in eight months. Right now, Kiara has ninety dollars left over each month. How much less must Kiara spend each month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1,200 divided by eight is 150 dollars a month, and 150 minus ninety is sixty dollars. B is the monthly savings, not the cut, and D subtracts the ninety dollars from the whole goal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Save each month = goal ÷ number of months.', 'If you are short, cut variable expenses.', 'Divide yearly costs by 12 for your monthly budget.'] }],
      lines: [
        { say: 'Let’s sum up. To save for a goal, divide the goal by the number of months.', show: 'sum.0' },
        { say: 'If you are short, spend less on variable expenses.', show: 'sum.1' },
        { say: 'And divide yearly costs by twelve, so they fit your monthly budget. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
