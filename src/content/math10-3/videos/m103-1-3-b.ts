import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-3-b',
  lessonId: 'm103-1-3',
  title: 'Markups, Sales and Taxes, Part 2: Two Discounts and Sales Tax',
  thumbnailTitle: 'Discounts and GST',
  summary: 'Applying two discounts one at a time, adding a 5% GST to a price, taking the discount before the tax, and working backward from a total that includes tax by dividing by 1.05.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.3 · Part 2', title: 'Two Discounts and Sales Tax', subtitle: 'What you really pay' }],
      lines: [
        { say: 'An extra ten percent off a sale price, then tax at the till. What do you really pay?', show: 'title' },
        { say: 'In this video, you will apply two discounts in a row, add sales tax, and work backward from a receipt.' },
      ],
    },
    {
      chapter: 'Two discounts',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\$650 \\times 0.80 = \\$520', '\\$520 \\times 0.90 = \\$468', '\\$650 \\times 0.70 = \\$455 \\quad \\bad{\\text{not the same}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not add the percents', md: '$20\\%$ off and then $10\\%$ off is **not** $30\\%$ off. Apply the discounts one at a time.' },
      ],
      lines: [
        { say: 'A snowblower is regularly 650 dollars. It is marked twenty percent off, and at the till, the store takes another ten percent off the sale price.', show: 'm.0' },
        { say: 'After twenty percent off, you pay eighty percent: 650 times 0.80 is 520 dollars.', focus: 'm.0' },
        { say: 'The second discount comes off the sale price, which is smaller. After another ten percent off, 520 times 0.90 is 468 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Taking thirty percent off at once would give 455 dollars, which is not the same. Twenty percent and then ten percent saves 28 percent, not thirty. Apply the discounts one at a time.', show: ['m.2', 'oops'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Sales tax',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'GST', md: 'A sales tax added as a percent of the price. In this course, use $5\\%$ unless a question gives another rate: total $=$ price $\\times 1.05$.' },
        { kind: 'math', id: 'm', lines: ['0.05 \\times \\$84.99 \\approx \\$4.25', '\\$84.99 + \\$4.25 = \\$89.24'] },
      ],
      lines: [
        { say: 'In Canada, a sales tax is added at the till. In Alberta, it is the federal G S T. In this course, use a G S T rate of five percent, unless a question gives a different rate.', show: 'def' },
        { say: 'A toolbox costs 84.99. The G S T is 0.05 times 84.99: about four dollars twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the total is 84.99 plus 4.25, which is 89.24. Or, in one step, multiply the price by 1.05.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Discount, then tax',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\$240 \\times 0.75 = \\$180', '\\$180 \\times 1.05 = \\$189.00'] },
      ],
      lines: [
        { say: 'A jacket regularly costs 240 dollars, and is 25 percent off. What is the total, with five percent G S T?', show: 'm.0' },
        { say: 'Take the discount first: 240 times 0.75 is 180 dollars.', focus: 'm.0' },
        { say: 'Then add the tax: 180 times 1.05 is 189 dollars. Tax is charged on the price you actually pay.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{total} = \\text{price} \\times 1.05', '\\text{price} = \\$131.25 \\div 1.05 = \\$125.00'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Do not subtract 5% of the total', md: '$131.25 - 0.05 \\times 131.25 \\approx 124.69$ is wrong. The tax is $5\\%$ of the **price**, so divide by $1.05$.' },
      ],
      lines: [
        { say: 'Sometimes you know the total, and need the price before tax. A receipt shows a total of 131.25, including five percent G S T.', show: 'm.0' },
        { say: 'The total is the price times 1.05, so the price is the total divided by 1.05: 125 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not subtract five percent of the total. The tax was five percent of the price, not of the total, so divide by 1.05 instead.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A total of \\$262.50 includes $5\\%$ GST. What was the price before tax?',
          choices: ['\\$250.00', '\\$249.38', '\\$275.63', '\\$257.50'],
          answer: 0,
          working: '$262.50 \\div 1.05 = 250$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A total of 262.50 includes five percent G S T. What was the price before tax? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Divide the total by 1.05: 262.50 divided by 1.05 is 250 dollars. B subtracts five percent of the total, and C adds the tax again.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Apply two discounts one at a time.', 'With $5\\%$ GST: total = price × 1.05. Discount first, then tax.', 'To work backward from a total, divide by 1.05.'] }],
      lines: [
        { say: 'Let’s sum up. Apply two discounts one at a time.', show: 'sum.0' },
        { say: 'With five percent G S T, the total is the price times 1.05. Take any discount first, then add the tax.', show: 'sum.1' },
        { say: 'And to work backward from a total, divide by 1.05. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
