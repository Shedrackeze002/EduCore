import type { Explainer } from '@/video/script.ts';

const parts = { kind: 'table' as const, id: 't', head: ['Label', 'Part', 'Quantity', 'Unit price'], rows: [['A', 'Side panel', '$2$', '\\$18.50'], ['B', 'Shelf', '$4$', '\\$7.25'], ['C', 'Top panel', '$1$', '\\$11.99'], ['D', 'Shelf pin', '$16$', '\\$0.10']] };

const video: Explainer = {
  id: 'm203-5-3-b',
  lessonId: 'm203-5-3',
  title: 'Exploded Views and Components, Part 2: Parts Lists and Costs',
  thumbnailTitle: 'Parts Lists and Costs',
  thumbnail: 't',
  summary: 'Reading a parts list with quantities and unit prices, pricing a bookshelf’s parts (79.59 dollars), the mistake of adding unit prices without quantities, and pricing the parts missing from a box (7.65 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.3 · Part 2', title: 'Parts Lists and Costs', subtitle: 'Quantity times unit price' }],
      lines: [
        { say: 'Every exploded view comes with a parts list. It tells you what is in the box, and with prices, what each part costs.', show: 'title' },
        { say: 'In this video, you will price the parts of a bookshelf, and the parts missing from a box.' },
      ],
    },
    {
      chapter: 'A parts list',
      layout: 'center',
      main: [parts],
      lines: [
        { say: 'A parts list gives the label, the name, and the quantity of each component, and a store’s list may give a unit price: the price of one.', show: 't' },
        { say: 'Here, the bookshelf needs two side panels at eighteen dollars fifty each, and four shelves at seven twenty-five each.', focus: ['t.0', 't.1'] },
        { say: 'It also needs one top panel at eleven ninety-nine, and sixteen shelf pins at ten cents each.', focus: ['t.2', 't.3'] },
      ],
    },
    {
      chapter: 'Pricing the parts',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 18.50 = 37.00', '4 \\times 7.25 = 29.00', '1 \\times 11.99 = 11.99', '16 \\times 0.10 = 1.60', '\\text{total} = \\$79.59'] }],
      lines: [
        { say: 'What do all the parts cost, ignoring tax? Multiply each quantity by its unit price. The side panels: two times eighteen fifty, thirty-seven dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'The shelves: four times seven twenty-five, twenty-nine dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'The top panel: eleven ninety-nine. And the pins: sixteen times ten cents, one dollar sixty.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Add them up: the parts cost seventy-nine dollars and fifty-nine cents.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Forgetting the quantity',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the quantity', md: 'Adding only the unit prices gives \\$37.84, which prices **one** of each part. Multiply each unit price by its quantity first, then add.' }],
      lines: [
        { say: 'A common mistake is to add only the unit prices. That gives thirty-seven dollars eighty-four, which prices just one of each part. Multiply each unit price by its quantity first, then add.', show: 'oops' },
      ],
    },
    {
      chapter: 'A part is missing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{missing: } 1 \\text{ shelf}, \\;\\; 16 - 12 = 4 \\text{ pins}', '1 \\times 7.25 + 4 \\times 0.10 = 7.25 + 0.40', '= \\$7.65'] }],
      lines: [
        { say: 'Mei opens the box, and counts two side panels, three shelves, one top panel, and twelve shelf pins. What will the missing parts cost? Compare with the quantity column: one shelf, and sixteen minus twelve, four pins, are missing.', show: 'm.0', focus: 'm.0' },
        { say: 'The shelf costs seven twenty-five, and four pins cost forty cents.', show: 'm.1', focus: 'm.1' },
        { say: 'So the missing parts cost seven dollars sixty-five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A kit needs $6$ brackets at \\$2.40 each and $24$ screws at \\$0.15 each. What do they cost in all?',
          choices: ['\\$18.00', '\\$2.55', '\\$14.40', '\\$3.60'],
          answer: 0,
          working: '$6 \\times 2.40 = 14.40$ and $24 \\times 0.15 = 3.60$, so the total is \\$18.00. B adds only the unit prices.',
        },
      ],
      lines: [
        { say: 'Your turn. A kit needs six brackets at two dollars forty each, and twenty-four screws at fifteen cents each. What do they cost in all? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six times two forty is fourteen forty, and twenty-four times fifteen cents is three sixty. Together, eighteen dollars. B adds only the unit prices.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A parts list gives each label, name, quantity and unit price.', 'Cost of a part = quantity × unit price; then add.', 'Compare counts with the quantity column to find what is missing.'] }],
      lines: [
        { say: 'Let’s sum up. A parts list gives each part’s label, name, quantity, and unit price.', show: 'sum.0' },
        { say: 'The cost of a part is its quantity times its unit price. Then add.', show: 'sum.1' },
        { say: 'And compare your counts with the quantity column to find what is missing. In part three, we put the parts together in order. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
