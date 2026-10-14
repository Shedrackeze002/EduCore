import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-1-3-b',
  lessonId: 'm203-1-3',
  title: 'Proportions and Unit Analysis, Part 2: Rounding Up and Conversion Factors',
  thumbnailTitle: 'Conversion Factors',
  thumbnail: 'm',
  summary: 'Rounding up to whole cans when two coats of paint on 85 m² need about 4.47 cans, what a conversion factor is, and changing a price of 13.20 dollars per kilogram to about 5.99 dollars per pound by placing units so they cancel.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 1.3 · Part 2', title: 'Rounding Up and Conversion Factors', subtitle: 'Answers you can buy' }],
      lines: [
        { say: 'Stores sell whole cans of paint, and some price tags are in pounds while others are in kilograms. Real answers have to fit real purchases.', show: 'title' },
        { say: 'In this video, you will decide when to round up, and use a conversion factor to change a price from kilograms to pounds.' },
      ],
    },
    {
      chapter: 'Paint for a community hall',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 85 = 170 \\text{ m}^2', '\\dfrac{1 \\text{ can}}{38 \\text{ m}^2} = \\dfrac{x}{170 \\text{ m}^2}', 'x = \\dfrac{170}{38} \\approx 4.47', '\\text{buy } 5 \\text{ cans}'] }],
      lines: [
        { say: 'The walls of a room in a community hall have a total area of eighty-five square metres, and need two coats. One can of paint covers thirty-eight square metres. How many cans are needed? Two coats means painting the area twice: 170 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Set up the proportion: one can over thirty-eight square metres equals x over 170 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is 170 over thirty-eight, about 4.47 cans.', show: 'm.2', focus: 'm.2' },
        { say: 'Four cans are not enough to finish the job, so buy five cans. Here, the usual rounding rule would give the wrong answer.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Think about the job',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Round for the job', md: 'When you must buy whole cans, bags or packages, **round up** so you have enough. Rounding down leaves the job unfinished.' }],
      lines: [
        { say: 'When the proportion gives a decimal, think about the job. If you must buy whole cans, bags or packages, round up so you have enough. Rounding down would leave part of the wall unpainted.', show: 'tip' },
      ],
    },
    {
      chapter: 'Conversion factors',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conversion factor', md: 'A **conversion factor** is a fraction equal to $1$, such as $\\dfrac{1000\\text{ m}}{1\\text{ km}}$ or $\\dfrac{0.4536\\text{ kg}}{1\\text{ lb}}$. Multiplying by it changes the units without changing the amount.' },
      ],
      lines: [
        { say: 'To change units, use a conversion factor: a fraction equal to one, such as 1,000 metres over one kilometre.', show: 'def' },
        { say: 'The top and the bottom are the same amount, written in different units, so multiplying by it changes the units without changing the amount.' },
      ],
    },
    {
      chapter: 'Price per pound',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{\\$13.20}{1 \\, \\cancel{\\text{kg}}} \\times \\dfrac{0.4536 \\, \\cancel{\\text{kg}}}{1 \\text{ lb}}', '= 13.20 \\times 0.4536 \\approx \\$5.99 \\text{ per lb}'] }],
      lines: [
        { say: 'In this example, ground beef costs thirteen dollars twenty per kilogram. What is the price per pound? Use one pound is about 0.4536 kilograms. Kilograms are on the bottom of the price, so put kilograms on the top of the factor. Then they cancel.', show: 'm.0', focus: 'm.0' },
        { say: 'Thirteen twenty times 0.4536 is about five dollars ninety-nine per pound. That makes sense: a pound is less than a kilogram, so it costs less.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bag of grass seed covers $45$ m². How many bags are needed for a $310$ m² yard?',
          choices: ['$7$ bags', '$6$ bags', '$6.9$ bags', '$14$ bags'],
          answer: 0,
          working: '$\\dfrac{310}{45} \\approx 6.89$. Six bags are not enough, so buy $7$.',
        },
      ],
      lines: [
        { say: 'Your turn. A bag of grass seed covers forty-five square metres. How many bags are needed for a yard of 310 square metres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 310 divided by forty-five is about 6.89. Six bags are not enough, and you cannot buy part of a bag, so buy seven.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Round up when you must buy whole items.', 'A conversion factor is a fraction equal to $1$.', 'Put the unit you want to remove on the opposite side, so it cancels.'] }],
      lines: [
        { say: 'Let’s sum up. Round up when you must buy whole cans, bags or packages.', show: 'sum.0' },
        { say: 'A conversion factor is a fraction equal to one.', show: 'sum.1' },
        { say: 'And put the unit you want to remove on the opposite side, so it cancels. In part three, we chain conversion factors together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
