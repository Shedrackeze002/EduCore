import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-1-1-b',
  lessonId: 'm103-1-1',
  title: 'Rates and Proportions, Part 2: Proportions on the Job',
  thumbnailTitle: 'Proportions on the Job',
  summary: 'Setting up a proportion with matching units in matching positions, scaling a recipe, the fuel for a trip, and problems with more than one step, such as how many cans of paint to buy and the cost of gas for a trip.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 1.1 · Part 2', title: 'Proportions on the Job', subtitle: 'Three numbers known, find the fourth' }],
      lines: [
        { say: 'If 24 muffins take 450 grams of flour, how much do sixty muffins take? A proportion answers questions like this.', show: 'title' },
        { say: 'In this video, you will set up and solve proportions, and use them in problems with more than one step.' },
      ],
    },
    {
      chapter: 'Proportions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Proportion', md: 'An equation with two equal ratios or rates. If you know three of the four numbers, you can find the fourth.' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{450\\text{ g}}{24} = \\dfrac{x}{60}', 'x = \\dfrac{450 \\times 60}{24} = 1125\\text{ g}', '60 = 2.5 \\times 24, \\quad 450 \\times 2.5 = 1125 \\ \\checkmark'] },
      ],
      lines: [
        { say: 'A proportion says that two ratios or rates are equal. If you know three of the four numbers, you can find the fourth.', show: 'def' },
        { say: 'A bakery recipe uses 450 grams of flour for 24 muffins. For sixty muffins, set up 450 grams over 24 equals x over sixty.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by sixty: x is 450 times sixty, divided by 24, which is 1,125 grams.', show: 'm.1', focus: 'm.1' },
        { say: 'Check by estimating. Sixty is 2.5 times 24, and 450 times 2.5 is 1,125. It matches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Line up the units',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\dfrac{450\\text{ g}}{24\\text{ muffins}} = \\dfrac{x}{60\\text{ muffins}} \\quad \\good{\\checkmark}', '\\dfrac{450\\text{ g}}{24\\text{ muffins}} = \\dfrac{60\\text{ muffins}}{x} \\quad \\bad{\\times}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Flipping one side', md: 'Write the units beside each number. Keep the same units in the same positions: top with top, bottom with bottom.' },
      ],
      lines: [
        { say: 'Keep the same units in the same positions. Grams on top on both sides, and muffins on the bottom on both sides.', show: 'm.0', focus: 'm.0' },
        { say: 'If one side is flipped, with grams on top on the left but muffins on top on the right, the answer will be wrong. Write the units beside each number, and fix the set-up before you calculate.', show: ['m.1', 'oops'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Fuel for a trip',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A car uses $8.5\\text{ L}$ of gas per $100\\text{ km}$. How much gas does a $340\\text{ km}$ trip use?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\dfrac{8.5\\text{ L}}{100\\text{ km}} = \\dfrac{x}{340\\text{ km}}', 'x = \\dfrac{8.5 \\times 340}{100} = 28.9\\text{ L}'] },
      ],
      lines: [
        { say: 'A car uses 8.5 litres of gas per hundred kilometres. How much gas does a 340-kilometre trip use?', show: 'q' },
        { say: 'Litres on top, kilometres on the bottom: 8.5 over a hundred equals x over 340.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both sides by 340: x is 8.5 times 340, divided by a hundred, which is 28.9 litres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'More than one step',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Isabelle is painting walls with a total area of $96\\text{ m}^2$. They need two coats, and one can covers about $37\\text{ m}^2$. How many cans must she buy?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['2 \\times 96 = 192\\text{ m}^2', '192 \\div 37 \\approx 5.19', '\\text{round up: } 6 \\text{ cans}'] },
      ],
      lines: [
        { say: 'On the job, a rate is often one step in a bigger problem. Isabelle is painting walls with a total area of 96 square metres. They need two coats, and one can covers about 37 square metres. How many cans must she buy?', show: 'q' },
        { say: 'Two coats cover twice the area: 192 square metres.', show: 'm.0', focus: 'm.0' },
        { say: '192 divided by 37 is about 5.19 cans.', show: 'm.1', focus: 'm.1' },
        { say: 'A store will not sell part of a can, so round up. Isabelle must buy six cans.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pickup uses $11.2\\text{ L}$ per $100\\text{ km}$, and gas costs \\$1.52 per litre. What does gas cost for a $420\\text{ km}$ trip?',
          choices: ['\\$71.50', '\\$47.04', '\\$638.40', '\\$7.15'],
          answer: 0,
          working: 'Litres: $\\dfrac{11.2 \\times 420}{100} = 47.04\\text{ L}$. Cost: $47.04 \\times 1.52 \\approx 71.50$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. A pickup uses 11.2 litres per hundred kilometres, and gas costs a dollar fifty-two per litre. What does gas cost for a 420-kilometre trip? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. First the litres: 11.2 times 420, divided by a hundred, is 47.04 litres. Then the cost: 47.04 times 1.52 is about 71 dollars fifty. B is the litres, not the dollars.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A proportion sets two rates equal: solve for the unknown.', 'Keep matching units in matching positions.', 'Estimate to check, and round up when you cannot buy part of something.'] }],
      lines: [
        { say: 'Let’s sum up. A proportion sets two rates equal, and you solve it for the unknown.', show: 'sum.0' },
        { say: 'Keep matching units in matching positions.', show: 'sum.1' },
        { say: 'And estimate to check, and round up when you cannot buy part of something. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
