import type { Explainer } from '@/video/script.ts';
import { circle } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-7-2-b',
  lessonId: 'm104-7-2',
  title: 'Area, Part 2: Circles and Cost',
  thumbnailTitle: 'Area and Cost',
  thumbnail: 'rug',
  summary: 'The area of a circle, A = π × r × r, halving the diameter first, the cost of sod sold by the square metre, and how many cans of paint a wall needs once the door is taken away, rounding up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 7.2 · Part 2', title: 'Circles and Cost', subtitle: 'How much to buy, and what it costs' }],
      lines: [
        { say: 'Flooring, sod and fabric are sold by the square metre, and paint by the can. To order the right amount, you need the area.', show: 'title' },
        { say: 'In this video, you will find the area of a circle, and work out the cost of materials.' },
      ],
    },
    {
      chapter: 'Area of a circle',
      layout: 'split',
      leftWidth: 440,
      left: [figure('rug', [circle({ r: 2, labels: { r: '2\\text{ m}' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = \\pi \\times r \\times r', 'A = \\pi \\times 2 \\times 2 \\approx 12.6\\text{ m}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the diameter', md: 'For a rug $4\\text{ m}$ across, $\\pi \\times 4 \\times 4 \\approx 50.3$ is far too big. Halve the diameter first.' },
      ],
      lines: [
        { say: 'The area of a circle is pi times the radius, times the radius. Use the radius: if you are given the diameter, halve it first.', show: ['rug.fill', 'rug.outline', 'rug.r', 'm.0'], focus: 'm.0' },
        { say: 'A round rug has a radius of two metres. Its area is pi times two times two: about 12.6 square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'For a rug four metres across, pi times four times four is about fifty: far too big. The radius is four divided by two: two metres.', show: 'oops' },
      ],
    },
    {
      chapter: 'Cost by the square metre',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['A = 8 \\times 5.5 = 44\\text{ m}^2', '44 \\times \\$4.25 = \\$187.00'] }],
      lines: [
        { say: 'Stores sell flooring, sod and fabric by the square metre. Find the area first, then multiply by the price for one square metre.' },
        { say: 'Sod costs 4 dollars 25 per square metre. A backyard is eight metres by 5.5. Its area is 44 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'So the sod costs 44 times 4.25: 187 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Cans of paint',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{wall: } 4.5 \\times 2.4 = 10.8\\text{ m}^2', '\\text{door: } 0.9 \\times 2 = 1.8\\text{ m}^2', '10.8 - 1.8 = 9\\text{ m}^2', '9 \\div 4 = 2.25 \\;\\to\\; 3 \\text{ cans}'] }],
      lines: [
        { say: 'Paint is sold in cans, and each can covers a certain area. A wall is 4.5 metres long and 2.4 metres high: 10.8 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'A door in the wall, 0.9 metres by two, will not be painted: 1.8 square metres. So the area to paint is nine square metres.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'One can covers four square metres. Nine divided by four is 2.25. You cannot buy part of a can, so always round up: buy three cans.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Flooring costs \\$30 per square metre. A room is $5\\text{ m}$ by $4\\text{ m}$. What does the flooring cost?',
          choices: ['\\$600', '\\$540', '\\$150', '\\$270'],
          answer: 0,
          working: 'Area: $5 \\times 4 = 20\\text{ m}^2$. Cost: $20 \\times 30 = 600$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Flooring costs thirty dollars per square metre. A room is five metres by four. What does the flooring cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The area is twenty square metres, and twenty times thirty is 600 dollars. B uses the perimeter, eighteen metres, instead of the area.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Circle: $A = \\pi \\times r \\times r$. Halve the diameter first.', 'Cost = area × price per square metre.', 'Round cans of paint **up**.'] }],
      lines: [
        { say: 'Let’s sum up. The area of a circle is pi times the radius times the radius. Halve the diameter first.', show: 'sum.0' },
        { say: 'To find a cost, multiply the area by the price per square metre.', show: 'sum.1' },
        { say: 'And always round cans of paint up. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
