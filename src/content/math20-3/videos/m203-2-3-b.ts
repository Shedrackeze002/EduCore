import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-2-3-b',
  lessonId: 'm203-2-3',
  title: 'Surface Area on the Job, Part 2: How Much to Buy and What It Costs',
  thumbnailTitle: 'How Much to Buy',
  thumbnail: 'm',
  summary: 'Painting the walls of a shed with two coats, less a door (534 ft², so 2 cans), allowing for coats and waste, and the cost of insulating the curved side of a tank at 14.50 dollars per square metre (262.45 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.3 · Part 2', title: 'How Much to Buy', subtitle: 'And what it costs' }],
      lines: [
        { say: 'Paint, shingles and sheet metal are sold in whole cans, bundles and sheets, and every job has a price. Surface area is where the estimate starts.', show: 'title' },
        { say: 'In this video, you will work out how many cans to buy, and what the material costs.' },
      ],
    },
    {
      chapter: 'Painting a shed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{walls: } 2(10 + 8) \\times 8 = 288 \\text{ ft}^2', '\\text{less the door: } 288 - 3 \\times 7 = 267 \\text{ ft}^2', '\\text{two coats: } 267 \\times 2 = 534 \\text{ ft}^2', '534 \\div 350 \\approx 1.53 \\;\\to\\; 2 \\text{ cans}'] }],
      lines: [
        { say: 'Rosalie is painting the four outside walls of a shed that is ten feet long, eight feet wide, and eight feet high. Going around, the walls are ten plus eight plus ten plus eight, thirty-six feet long, and eight feet high: 288 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'The three-by-seven door is not painted, so subtract twenty-one: 267 square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'The walls need two coats, which means covering the area twice: 534 square feet.', show: 'm.2', focus: 'm.2' },
        { say: 'One can covers 350 square feet, so she needs 534 divided by 350, about 1.53 cans. A part-can is still a can you have to buy, so round up: two cans.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Coats and waste',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Coats and waste', md: 'Two coats means covering the area twice. Many trades also add $10\\%$ for waste, seams and overlaps: multiply the area by $1.1$ before you divide. Then always **round up**, even when the decimal is small.' }],
      lines: [
        { say: 'Two coats means covering the area twice. Many trades also add ten percent for waste, seams and overlaps: multiply the area by 1.1 before you divide.', show: 'tip' },
        { say: 'Then always round up, even when the decimal is small. Being a little over is cheap; running out halfway through the job is not.' },
      ],
    },
    {
      chapter: 'Material cost',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['A = \\pi d h = \\pi(1.8)(3.2) \\approx 18.10', '\\approx 18.1 \\text{ m}^2', '18.1 \\times \\$14.50 = \\$262.45'] }],
      lines: [
        { say: 'When a price is given per square unit, the cost is the area times the price. Kwame wraps the curved side of a cylindrical tank with insulation. The tank has a diameter of 1.8 metres and a height of 3.2 metres. The curved side is pi d h, about 18.10.', show: 'm.0', focus: 'm.0' },
        { say: 'Round the area as the question asks, to the nearest tenth: 18.1 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'In this example, insulation costs fourteen dollars fifty per square metre. 18.1 times fourteen fifty is two hundred sixty-two dollars forty-five. If a question gives a tax rate, such as five percent, multiply by 1.05 as well.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A fence has $620\\ \\text{ft}^2$ to stain, with two coats. One can covers $250\\ \\text{ft}^2$. How many cans are needed?',
          choices: ['$5$ cans', '$4$ cans', '$3$ cans', '$2.48$ cans'],
          answer: 0,
          working: 'Two coats: $620 \\times 2 = 1240\\ \\text{ft}^2$. $1240 \\div 250 = 4.96$, so round up to $5$. C forgets the second coat.',
        },
      ],
      lines: [
        { say: 'Your turn. A fence has 620 square feet to stain, with two coats. One can covers 250 square feet. How many cans are needed? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two coats is 1,240 square feet, and 1,240 divided by 250 is 4.96, so round up to five cans. C forgets the second coat.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Subtract what is not covered; multiply for coats and waste.', 'Units to buy = area ÷ coverage, always rounded up.', 'Cost = area × price per square unit.'] }],
      lines: [
        { say: 'Let’s sum up. Subtract what is not covered, like doors and windows, and multiply for extra coats and waste.', show: 'sum.0' },
        { say: 'The number to buy is the area divided by what one unit covers, always rounded up.', show: 'sum.1' },
        { say: 'And the cost is the area times the price per square unit. In part three, we cover objects made of two shapes. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
