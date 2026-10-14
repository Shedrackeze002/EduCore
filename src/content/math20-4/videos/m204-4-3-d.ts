import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-4-3-d',
  lessonId: 'm204-4-3',
  title: 'Credit Cards and Loans, Part 4: Why Paying the Full Balance Matters',
  thumbnailTitle: 'Pay the Full Balance',
  thumbnail: 'bg',
  summary: 'Three ways to pay a 900 dollar credit card bill at 2% per month (the minimum of 27 dollars leaves 17.46 dollars of interest, 500 dollars leaves 8 dollars, and paying in full leaves none), shown on a bar graph, and using credit wisely.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.3 · Part 4', title: 'Pay the Full Balance', subtitle: 'Less unpaid, less interest' }],
      lines: [
        { say: 'When the credit card bill comes, you choose how much to pay. That choice decides how much interest you pay next month.', show: 'title' },
        { say: 'In this video, you will compare three ways to pay the same bill, and see why paying in full is the best choice.' },
      ],
    },
    {
      chapter: 'Three ways to pay',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Kiona’s statement balance is \\$900. Her card charges $2\\%$ per month on the unpaid balance.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{pay } 27\\text{: } (900 - 27) \\times 0.02 = 873 \\times 0.02 = 17.46', '\\text{pay } 500\\text{: } (900 - 500) \\times 0.02 = 400 \\times 0.02 = 8.00', '\\text{pay } 900\\text{: } (900 - 900) \\times 0.02 = 0'] },
      ],
      lines: [
        { say: 'Kiona’s statement balance is 900 dollars. In this example, her card charges two percent per month on the unpaid balance. Compare paying the minimum of 27 dollars, paying 500 dollars, and paying all 900.', show: 'q' },
        { say: 'Pay 27 dollars, and 873 dollars is unpaid. Two percent of 873 is seventeen dollars 46 of interest.', show: 'm.0', focus: 'm.0' },
        { say: 'Pay 500 dollars, and 400 dollars is unpaid. Two percent of 400 is eight dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Pay all 900 dollars, and nothing is unpaid, so the interest is zero.', show: 'm.2', focus: 'm.2' },
        { say: 'So paying in full saves seventeen dollars 46 compared with the minimum. And that kind of saving repeats every month a balance is carried.' },
      ],
    },
    {
      chapter: 'Interest next month',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bg', [barGraph({ categories: ['27', '500', '900'], values: [17.46, 8, 0], max: 20, step: 5, height: 4, titles: { x: 'Payment (\\$)', y: 'Interest (\\$)' } })], 420)],
      right: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Use credit wisely', md: 'Only charge what you can pay off this month. If you already carry a balance, pay as much as you can and stop using the card until it is paid off.' }],
      lines: [
        { say: 'Here are the three choices on a bar graph. Paying the minimum leaves the most interest, over seventeen dollars.', show: ['bg.scale', 'bg.b0'], focus: 'bg.b0' },
        { say: 'Paying 500 dollars cuts the interest to eight dollars.', show: 'bg.b1', focus: 'bg.b1' },
        { say: 'And paying in full leaves no interest at all. The less you leave unpaid, the less interest you pay.', show: 'bg.b2', focus: 'bg.b2' },
        { say: 'So use credit wisely. Only charge what you can pay off this month. If you already carry a balance, pay as much as you can, and stop using the card until it is paid off.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A statement balance is \\$1,200. The card charges $2\\%$ per month on the unpaid balance. If you pay \\$400, how much interest is charged next month?',
          choices: ['\\$16.00', '\\$24.00', '\\$8.00', '\\$0.00'],
          answer: 0,
          working: 'Unpaid: $1{,}200 - 400 = 800$. Interest: $800 \\times 0.02 = 16.00$. B uses the whole balance, and C uses the amount paid.',
        },
      ],
      lines: [
        { say: 'Your turn. A statement balance is 1,200 dollars. The card charges two percent per month on the unpaid balance. If you pay 400 dollars, how much interest is charged next month? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The unpaid balance is 1,200 minus 400: 800 dollars. Two percent of 800 is sixteen dollars. B uses the whole balance, and C uses the amount paid instead of the amount unpaid. Paying all 1,200 dollars would mean no interest at all.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Interest is charged on the unpaid balance.', 'Paying more now means less interest later.', 'Pay in full whenever you can.'] }],
      lines: [
        { say: 'Let’s sum up. Interest is charged on the unpaid balance.', show: 'sum.0' },
        { say: 'Paying more now means less interest later.', show: 'sum.1' },
        { say: 'And whenever you can, pay the full balance, so you pay no interest at all. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
