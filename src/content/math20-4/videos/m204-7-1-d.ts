import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const garden = outline({
  corners: [[0, 0], [6.5, 0], [6.5, 4], [0, 4]],
  tone: 'good',
  labels: [
    { id: 'l', at: [3.25, 4.6], tex: '6.5\\text{ m}' },
    { id: 'w', at: [-0.9, 2], tex: '4\\text{ m}' },
  ],
});

const video: Explainer = {
  id: 'm204-7-1-d',
  lessonId: 'm204-7-1',
  title: 'Perimeter, Part 4: The Cost of Edging and Fencing',
  thumbnailTitle: 'Cost of Edging',
  thumbnail: 'gd',
  summary: 'Finding the cost of materials sold by the metre: edging a 6.5 m by 4 m garden (21 m at 3.49 dollars a metre is 73.29 dollars), and why multiplying the sides gives the area, not the edging.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.1 · Part 4', title: 'The Cost of Edging', subtitle: 'Perimeter, then price' }],
      lines: [
        { say: 'Edging, fencing and trim are often sold by the metre or by the foot. To know what a job will cost, you need the perimeter first.', show: 'title' },
        { say: 'In this video, you will find the cost of edging around a garden.' },
      ],
    },
    {
      chapter: 'Edging a garden',
      layout: 'split',
      leftWidth: 600,
      left: [figure('gd', [garden], 360)],
      right: [
        { kind: 'text', id: 'q', md: 'Edging costs \\$3.49 per metre.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['6.5 + 4 + 6.5 + 4 = 21 \\text{ m}', '21 \\times 3.49 = 73.29'] },
      ],
      lines: [
        { say: 'A rectangular garden is 6.5 metres long and four metres wide. In this example, garden edging costs three dollars 49 per metre. What will the edging cost?', show: ['gd', 'q'] },
        { say: 'Step one: the perimeter. Edging goes all the way around, so add all four sides: 6.5 plus four plus 6.5 plus four is 21 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: the cost. Multiply the perimeter by the price for one metre: 21 times 3.49 is 73 dollars 29.', show: 'm.1', focus: 'm.1' },
        { say: 'Estimate to check: 21 metres at about three fifty a metre is about 73 dollars fifty. Close.' },
      ],
    },
    {
      chapter: 'Around, not across',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Finding the area by mistake', md: '$6.5 \\times 4 = 26$ is the area of the garden, not the distance around it. Edging goes around the edge, so add the sides.' }],
      lines: [
        { say: 'A common mistake is to find the area by mistake. 6.5 times four is 26, but that is the area of the garden, the surface inside it. Edging goes around the edge, so add the sides.', show: 'oops' },
        { say: 'The units help you check. Edging is priced per metre, a length, so you need a length: the perimeter.' },
      ],
    },
    {
      chapter: 'Buying whole pieces',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Suppose the edging is sold only in $5$ m rolls.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['21 \\div 5 = 4.2', '\\text{round up: } 5 \\text{ rolls}'] },
      ],
      lines: [
        { say: 'Sometimes you cannot buy the exact length. Suppose the edging is sold only in five metre rolls.', show: 'q' },
        { say: '21 divided by five is 4.2 rolls.', show: 'm.0', focus: 'm.0' },
        { say: 'Four rolls would be only twenty metres, one metre short. So round up: buy five rolls.', show: 'm.1', focus: 'm.1' },
        { say: 'Five rolls is 25 metres, so four metres will be left over. When you buy materials, always round up, never down.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular yard is $10$ m by $7$ m. Fencing costs \\$12.50 per metre. What will the fencing cost?',
          choices: ['\\$425.00', '\\$875.00', '\\$212.50', '\\$34.00'],
          answer: 0,
          working: 'Perimeter: $10 + 7 + 10 + 7 = 34$ m. Cost: $34 \\times 12.50 = 425.00$. B uses the area, $70$ m², C uses only two sides, and D is the perimeter, not the cost.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular yard is ten metres by seven metres. Fencing costs twelve dollars fifty per metre. What will the fencing cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The perimeter is 34 metres, and 34 times 12.50 is 425 dollars. B uses the area, C uses only two sides, and D is the perimeter, not the cost.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the perimeter first.', 'Cost = perimeter × price per metre or foot.', 'Edging goes around: add, do not multiply the sides.'] }],
      lines: [
        { say: 'Let’s sum up. Find the perimeter first.', show: 'sum.0' },
        { say: 'Then multiply it by the price for one metre or one foot.', show: 'sum.1' },
        { say: 'And remember that edging goes around the edge, so add the sides, do not multiply them. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
