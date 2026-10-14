import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-2-2-d',
  lessonId: 'm204-2-2',
  title: 'Sales, Discounts and Taxes, Part 4: Paying, Change and Comparing Stores',
  thumbnailTitle: 'Paying and Getting Change',
  thumbnail: 'm',
  summary: 'Finding change (a 50 dollar bill for a 39.36 dollar total gives 10.64 dollars), counting up to check change like a cashier, and comparing two stores by their totals with tax (the cheaper store overall can cost more for one item).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 2.2 · Part 4', title: 'Paying and Getting Change', subtitle: 'Check before you leave the till' }],
      lines: [
        { say: 'When you pay cash, it is worth checking your change before you leave the till. And when you compare stores, it is the total that counts.', show: 'title' },
        { say: 'In this video, you will find change, check it by counting up, and compare two stores.' },
      ],
    },
    {
      chapter: 'Paying with a $50 bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The total is \\$39.36. You pay with a \\$50 bill.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{change} = \\text{amount paid} - \\text{total}', '50.00 - 39.36 = 10.64'] },
      ],
      lines: [
        { say: 'The total on the receipt from part three is 39 dollars 36. You pay with a fifty-dollar bill. How much change should you get?', show: 'q' },
        { say: 'Change is the amount paid, minus the total.', show: 'm.0', focus: 'm.0' },
        { say: 'Fifty minus 39.36 is ten dollars 64.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Count up to check',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count up to check', md: 'Start at the total and count up to the amount paid, the way cashiers do.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['39.36 + 0.04 = 39.40', '39.40 + 0.60 = 40.00', '40.00 + 10.00 = 50.00', '0.04 + 0.60 + 10 = 10.64'] },
      ],
      lines: [
        { say: 'Cashiers often check change by counting up from the total to the amount paid.', show: 'tip' },
        { say: 'From 39.36, four cents makes 39.40.', show: 'm.0', focus: 'm.0' },
        { say: 'Sixty cents more makes forty dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'And ten dollars more makes fifty.', show: 'm.2', focus: 'm.2' },
        { say: 'Add what you counted: four cents, plus sixty cents, plus ten dollars, is ten dollars 64. It matches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A bigger bill',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The total is \\$63.85. You pay with a \\$100 bill.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['100.00 - 63.85 = 36.15', '63.85 \\to 64.00 \\to 65.00 \\to 70.00 \\to 80.00 \\to 100.00', '0.15 + 1 + 5 + 10 + 20 = 36.15'] },
      ],
      lines: [
        { say: 'Try a bigger one. Your total is 63 dollars 85, and you pay with a 100-dollar bill. 100 minus 63.85 is 36 dollars fifteen.', show: ['q', 'm.0'], focus: 'm.0' },
        { say: 'Count up to check: fifteen cents makes 64, one dollar makes 65, five makes seventy, ten makes eighty, and twenty makes 100.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the steps: fifteen cents, plus one, plus five, plus ten, plus twenty, is 36 dollars fifteen. It matches, so the change is right.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Comparing two stores',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Item', 'Store A', 'Store B'], rows: [['Work gloves', '\\$14.99', '\\$12.99'], ['Safety glasses', '\\$8.49', '\\$9.99'], ['Subtotal', '\\$23.48', '\\$22.98'], ['Total with $5\\%$ GST', '\\$24.65', '\\$24.13']] },
      ],
      lines: [
        { say: 'To compare two stores, find the total at each one. In this example, two stores sell work gloves and safety glasses, with five percent GST.', show: 't' },
        { say: 'Store B has cheaper gloves, but more expensive safety glasses.', focus: ['t.0', 't.1'] },
        { say: 'Store A’s subtotal is 23.48, and Store B’s is 22.98.', focus: 't.2' },
        { say: 'With GST, Store A comes to 24 dollars 65, and Store B to 24 dollars 13. Store B is cheaper overall, even though one of its items costs more.', focus: 't.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Your total is \\$17.35. You pay with a \\$20 bill. How much change should you get?',
          choices: ['\\$2.65', '\\$3.65', '\\$2.75', '\\$37.35'],
          answer: 0,
          working: '$20.00 - 17.35 = 2.65$. Count up: $17.35 + 0.05 = 17.40$, $+ 0.60 = 18.00$, $+ 2.00 = 20.00$, so $0.05 + 0.60 + 2 = 2.65$.',
        },
      ],
      lines: [
        { say: 'Your turn. Your total is seventeen dollars 35. You pay with a twenty-dollar bill. How much change should you get? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twenty minus 17.35 is two dollars 65. Counting up: five cents makes 17.40, sixty cents makes eighteen, and two dollars makes twenty.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Change = amount paid − total.', 'Count up from the total to check.', 'Compare stores by their totals.'] }],
      lines: [
        { say: 'Let’s sum up. Change is the amount paid, minus the total.', show: 'sum.0' },
        { say: 'Count up from the total to the amount paid, to check it.', show: 'sum.1' },
        { say: 'And compare stores by their totals, not by one item. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
