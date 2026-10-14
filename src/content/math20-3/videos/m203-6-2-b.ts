import type { Explainer } from '@/video/script.ts';
import { dots, plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 24], y: [0, 18], xStep: 2, yStep: 2, every: 2, width: 7, height: 5, titles: { x: '\\text{transactions}', y: '\\text{cost (\\$)}' } });

const video: Explainer = {
  id: 'm203-6-2-b',
  lessonId: 'm203-6-2',
  title: 'Banking Services, Part 2: Comparing Plans and the Break-Even Point',
  thumbnailTitle: 'The Break-Even Point',
  thumbnail: 'be',
  summary: 'Comparing a Basic plan (3.95 dollars a month, 10 transactions, 1 dollar each extra) with an Unlimited plan (11.95 dollars) in a table and on a graph, finding the break-even point of 18 transactions, and choosing the cheaper plan.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 6.2 · Part 2', title: 'Comparing Plans', subtitle: 'Where two plans cost the same' }],
      lines: [
        { say: 'An unlimited plan has a bigger monthly fee, but no charge per transaction. Which plan is cheaper depends on how many transactions you make.', show: 'title' },
        { say: 'In this video, you will find the break-even point between two plans, and use it to choose the cheaper one.' },
      ],
    },
    {
      chapter: 'Two plans',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '**Basic:** \\$3.95 a month, $10$ transactions included, \\$1.00 for each extra. **Unlimited:** \\$11.95 a month.', size: 'md' },
        { kind: 'table', id: 't', head: ['Transactions in a month', 'Basic plan', 'Unlimited plan'], rows: [['$10$', '\\$3.95', '\\$11.95'], ['$14$', '\\$7.95', '\\$11.95'], ['$18$', '\\$11.95', '\\$11.95'], ['$22$', '\\$15.95', '\\$11.95']] },
      ],
      lines: [
        { say: 'In this example, Northern Bank offers a Basic plan at three dollars 95 a month, with ten transactions included and one dollar for each extra. It also offers an Unlimited plan at eleven dollars 95 a month.', show: 'q' },
        { say: 'At ten transactions, Basic costs only its monthly fee, 3.95.', show: 't', focus: 't.0' },
        { say: 'At fourteen, there are four extra transactions, so Basic costs seven dollars 95.', focus: 't.1' },
        { say: 'At eighteen, Basic costs 11.95, exactly the same as Unlimited.', focus: 't.2' },
        { say: 'And at 22, Basic costs fifteen dollars 95, more than Unlimited.', focus: 't.3' },
      ],
    },
    {
      chapter: 'The break-even point',
      layout: 'split',
      leftWidth: 760,
      left: [
        figure('be', [
          g,
          polyline(g, { id: 'basic', points: [[0, 3.95], [10, 3.95], [22, 15.95], [24, 17.95]], tone: 'brand', labels: ['', '\\text{Basic}', ''], sides: ['left', 'right', 'left'] }),
          polyline(g, { id: 'unl', points: [[0, 11.95], [8, 11.95], [24, 11.95]], tone: 'opp', labels: ['\\text{Unlimited}', ''] }),
          dots(g, [{ id: 'p', x: 18, y: 11.95, tex: '(18,\\ 11.95)', tone: 'adj', place: 'above left' }]),
        ], 520),
      ],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Break-even point', md: 'The number of transactions where two plans **cost the same**. Below it, the plan with the smaller monthly fee is cheaper. Above it, the other plan is cheaper.' }],
      lines: [
        { say: 'On a graph, the Basic plan is flat until ten transactions, then climbs one dollar for each extra transaction.', show: ['be.grid', 'be.axes', 'be.basic'], focus: 'be.basic' },
        { say: 'The Unlimited plan stays flat at 11.95, however many transactions you make.', show: 'be.unl', focus: 'be.unl' },
        { say: 'The lines cross at eighteen transactions. This is the break-even point: the number of transactions where the two plans cost the same.', show: ['be.p', 'def'], focus: 'be.p' },
        { say: 'Below it, the plan with the smaller monthly fee, Basic, is cheaper. Above it, Unlimited is cheaper.' },
      ],
    },
    {
      chapter: 'Finding it without a table',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['11.95 - 3.95 = 8.00', '8.00 \\div 1.00 = 8 \\text{ extra}', '10 + 8 = 18 \\text{ transactions}'] }],
      lines: [
        { say: 'You can find the break-even point without a table. First, find the difference in the monthly fees: 11.95 minus 3.95 is eight dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Each extra transaction on Basic costs one dollar, so it takes eight extra transactions to make up the difference.', show: 'm.1', focus: 'm.1' },
        { say: 'Then add the ten included transactions: ten plus eight is eighteen.', show: 'm.2', focus: 'm.2' },
        { say: 'So someone who makes about 22 transactions a month should choose Unlimited, and someone who makes about fourteen should choose Basic.' },
      ],
    },
    {
      chapter: 'Forgetting the included transactions',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping at the extras', md: '$8$ is the number of **extra** transactions. Add the $10$ included ones: the plans cost the same at $18$ transactions, not $8$.' }],
      lines: [
        { say: 'A common mistake is to stop at eight. But eight is the number of extra transactions. Add the ten included ones: the plans cost the same at eighteen transactions, not eight.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Plan A costs \\$2.50 a month, includes $6$ transactions, and charges \\$0.75 for each extra. Plan B costs \\$8.50 a month with unlimited transactions. What is the break-even point?',
          choices: ['$14$ transactions', '$8$ transactions', '$20$ transactions', '$6$ transactions'],
          answer: 0,
          working: '$8.50 - 2.50 = 6.00$, and $6.00 \\div 0.75 = 8$ extra transactions. Add the included ones: $6 + 8 = 14$. B forgets the included transactions.',
        },
      ],
      lines: [
        { say: 'Your turn. Plan A costs two dollars fifty a month, includes six transactions, and charges 75 cents for each extra. Plan B costs eight dollars fifty a month, with unlimited transactions. What is the break-even point? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The monthly fees differ by six dollars, and six divided by 0.75 is eight extra transactions. Add the six included ones: fourteen transactions. B forgets the included transactions.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The break-even point is where two plans cost the same.', 'Difference in monthly fees ÷ fee per extra, plus the included transactions.', 'Below it, the smaller monthly fee wins; above it, the other plan.'] }],
      lines: [
        { say: 'Let’s sum up. The break-even point is the number of transactions where two plans cost the same.', show: 'sum.0' },
        { say: 'To find it, divide the difference in monthly fees by the fee per extra transaction, then add the included transactions.', show: 'sum.1' },
        { say: 'Below it, the plan with the smaller monthly fee is cheaper; above it, the other plan is. In part three, we look at overdrafts and bank statements. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
