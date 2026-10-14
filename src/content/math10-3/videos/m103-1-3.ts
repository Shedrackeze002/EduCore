import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-3',
  lessonId: 'm103-1-3',
  title: 'Markups, Sales and Taxes, Part 1: Percent Change, Markups and Discounts',
  thumbnailTitle: 'Markups and Discounts',
  summary: 'Percent increase and decrease compared with the original price, marking up a cost, taking a discount off a regular price, and the multiplier shortcut. Part 2 covers two discounts in a row and GST.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.3 · Part 1', title: 'Markups and Discounts', subtitle: 'Percents at the store' }],
      lines: [
        { say: 'Picture a part-time job at a hardware store. You price new stock, put up sale signs, and ring customers through at the till. Every one of those jobs uses percents.', show: 'title' },
        { say: 'In this video, you will find percent changes, markups and discounts. In part two, you will add sales tax.' },
      ],
    },
    {
      chapter: 'Percent change',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', lines: ['\\text{percent change} = \\dfrac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\%'] },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\$32.00 \\to \\$36.80\\text{: } \\dfrac{4.80}{32.00} \\times 100\\% = 15\\% \\text{ increase}', '\\$189.99 \\to \\$149.99\\text{: } \\dfrac{40}{189.99} \\times 100\\% \\approx 21.1\\% \\text{ decrease}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide by the original', md: 'The percent is always compared with the **original** price. Dividing by the new price gives a wrong answer.' },
      ],
      lines: [
        { say: 'A percent change tells you how big a change is, compared with the original price. Divide the change by the original, and multiply by a hundred percent.', show: 'f.0' },
        { say: 'A bag of cattle feed went from 32 dollars to 36 dollars eighty. The change is four dollars eighty, and four eighty divided by 32 is fifteen percent. The price increased by fifteen percent.', show: 'm.0', focus: 'm.0' },
        { say: 'Work boots went from 189.99 to 149.99, a change of forty dollars. Forty divided by 189.99 is about 21.1 percent: a percent decrease.', show: 'm.1', focus: 'm.1' },
        { say: 'Always divide by the original price, not the new one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Markups',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Markup and discount', md: 'A **markup** is added to the store’s cost to set the selling price. A **discount** is taken off the regular price.' },
        { kind: 'math', id: 'm', lines: ['0.45 \\times \\$18.40 = \\$8.28', '\\$18.40 + \\$8.28 = \\$26.68'] },
      ],
      lines: [
        { say: 'Stores buy products at one price and sell them at a higher one. The amount they add to their cost is the markup. When things do not sell, the store takes a discount off the regular price.', show: 'def' },
        { say: 'A hardware store pays eighteen dollars forty for a hammer, and marks it up 45 percent. The markup is 0.45 times eighteen forty, which is eight dollars twenty-eight.', show: 'm.0', focus: 'm.0' },
        { say: 'So the selling price is eighteen forty plus eight twenty-eight: twenty-six dollars sixty-eight.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Discounts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['0.30 \\times \\$149.99 \\approx \\$45.00', '\\$149.99 - \\$45.00 = \\$104.99'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The multiplier shortcut', md: '$30\\%$ off means you pay $70\\%$: multiply by $0.70$. A $45\\%$ markup makes the price $145\\%$ of the cost: multiply by $1.45$.' },
      ],
      lines: [
        { say: 'A winter jacket is regularly 149.99, on sale for thirty percent off. The discount is 0.30 times 149.99, which is about 45 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'So the sale price is 149.99 minus 45: one hundred and four dollars ninety-nine.', show: 'm.1', focus: 'm.1' },
        { say: 'There is a shortcut. Thirty percent off means you pay seventy percent, so multiply by 0.70 in one step. And a 45 percent markup makes the price 145 percent of the cost, so multiply by 1.45.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A drill is regularly \\$120 and is on sale for $15\\%$ off. What is the sale price?',
          choices: ['\\$102.00', '\\$18.00', '\\$138.00', '\\$105.00'],
          answer: 0,
          working: '$15\\%$ off means you pay $85\\%$: $120 \\times 0.85 = 102$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A drill is regularly 120 dollars, and is on sale for fifteen percent off. What is the sale price? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Fifteen percent off means you pay 85 percent, and 120 times 0.85 is 102 dollars. B is the discount, and C adds it instead of taking it off.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent change = change ÷ original × 100%.', 'A markup is added to the cost; a discount is taken off the regular price.', 'Multipliers: $30\\%$ off is $\\times 0.70$, a $45\\%$ markup is $\\times 1.45$.'] }],
      lines: [
        { say: 'Let’s sum up. A percent change is the change, divided by the original, times a hundred percent.', show: 'sum.0' },
        { say: 'A markup is added to the cost, and a discount is taken off the regular price.', show: 'sum.1' },
        { say: 'And multipliers save a step. In part two, we take two discounts in a row, and add sales tax. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
