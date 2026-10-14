import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-1-4-c',
  lessonId: 'm204-1-4',
  title: 'Percent Problems, Part 3: Percent Increase and Decrease',
  thumbnailTitle: 'Percent Increase and Decrease',
  thumbnail: 'bg',
  summary: 'Percent change as the change divided by the original amount: a bus pass going from 80 to 92 dollars is a 15% increase, a price falling from 50 to 40 dollars is a 20% decrease, and why you divide by the original, not the new amount.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.4 · Part 3', title: 'Percent Increase and Decrease', subtitle: 'Compare with the original' }],
      lines: [
        { say: 'Prices, wages and rents change. A percent change tells you how big the change is, compared with what it was before.', show: 'title' },
        { say: 'In this video, you will find a percent increase and a percent decrease.' },
      ],
    },
    {
      chapter: 'Percent change',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent increase and decrease', md: 'A **percent increase** tells how much an amount went up, as a percent of the **original** amount. A **percent decrease** tells how much it went down.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{percent change} = \\dfrac{\\text{amount of change}}{\\text{original amount}} \\times 100'] },
      ],
      lines: [
        { say: 'A percent increase tells how much an amount went up, as a percent of the original amount. A percent decrease tells how much it went down.', show: 'def' },
        { say: 'The percent change is the amount of change, divided by the original amount, times 100.', show: 'f', focus: 'f.0' },
      ],
    },
    {
      chapter: 'A bus pass goes up',
      layout: 'split',
      leftWidth: 620,
      left: [figure('bg', [barGraph({ categories: ['Before', 'After'], values: [80, 92], max: 100, step: 10, height: 4, titles: { y: 'Bus pass (\\$)' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['92 - 80 = 12', '12 \\div 80 = 0.15', '0.15 \\times 100 = 15\\%'] }],
      lines: [
        { say: 'A monthly bus pass went from eighty dollars last year to 92 dollars this year. What is the percent increase?', show: ['bg.scale', 'bg.b0', 'bg.b1', 'bg.v0', 'bg.v1'] },
        { say: 'First, the amount of change: 92 minus eighty is twelve dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the original amount, last year’s eighty dollars: twelve divided by eighty is 0.15.', show: 'm.1', focus: ['bg.b0', 'm.1'] },
        { say: 'Times 100 is fifteen. The price went up fifteen percent.', show: 'm.2', focus: 'm.2' },
        { say: 'Percents let you compare changes fairly. The same twelve-dollar rise on a 300-dollar phone bill would be only four percent.' },
      ],
    },
    {
      chapter: 'Dividing by the new amount',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the new amount', md: 'Always divide by the **original** (the “before”) amount. For the bus pass, $12 \\div 92$ gives about $13\\%$, which is wrong.' }],
      lines: [
        { say: 'A common mistake is to divide by the new amount. For the bus pass, twelve divided by 92 gives about thirteen percent, which is wrong. Always divide by the original, the “before” amount.', show: 'oops' },
      ],
    },
    {
      chapter: 'A percent decrease',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A pair of work boots drops from \\$50 to \\$40.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['50 - 40 = 10', '10 \\div 50 = 0.2', '0.2 \\times 100 = 20\\% \\text{ decrease}'] },
      ],
      lines: [
        { say: 'In this example, the price of a pair of work boots drops from fifty dollars to forty dollars. What is the percent decrease?', show: 'q' },
        { say: 'The amount of change is fifty minus forty: ten dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide by the original price, fifty: ten divided by fifty is 0.2.', show: 'm.1', focus: 'm.1' },
        { say: 'Times 100 is twenty. The price went down twenty percent. Dividing by the new price, forty, would wrongly give 25 percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'The price of gas drops from \\$1.50 to \\$1.20 per litre. What is the percent decrease?',
          choices: ['$20\\%$', '$25\\%$', '$30\\%$', '$80\\%$'],
          answer: 0,
          working: 'Change: $1.50 - 1.20 = 0.30$. Divide by the original: $0.30 \\div 1.50 = 0.2$, which is $20\\%$. B divides by the new price.',
        },
      ],
      lines: [
        { say: 'Your turn. The price of gas drops from one dollar fifty to one dollar twenty per litre. What is the percent decrease? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The change is thirty cents, and thirty cents divided by the original one dollar fifty is 0.2, which is twenty percent. B divides by the new price.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent change = change ÷ original × 100.', 'Always divide by the original amount.', 'Say whether it is an increase or a decrease.'] }],
      lines: [
        { say: 'Let’s sum up. The percent change is the amount of change, divided by the original amount, times 100.', show: 'sum.0' },
        { say: 'Always divide by the original, the “before” amount.', show: 'sum.1' },
        { say: 'And say whether it is an increase or a decrease. In part four, we find new amounts after a change, and find a whole from a part. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
