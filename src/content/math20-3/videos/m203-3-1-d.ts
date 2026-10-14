import type { Explainer } from '@/video/script.ts';
import { cylinder, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-1-d',
  lessonId: 'm203-3-1',
  title: 'Volume and Capacity, Part 4: Volume of a Cylinder',
  thumbnailTitle: 'Volume of a Cylinder',
  thumbnail: 'tank',
  summary: 'V = πr²h for a cylinder, a water tank 1.5 m across and 2 m high that holds about 3534 L, a round stock tank 8 ft across holding water 2 ft deep (about 626 imperial gallons, using the given conversion), and why squaring the diameter is four times too big.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.1 · Part 4', title: 'Volume of a Cylinder', subtitle: 'A prism with a round base' }],
      lines: [
        { say: 'Water tanks, grain bins and cans are cylinders. A cylinder is like a prism with a circular base, so its volume comes from the same idea.', show: 'title' },
        { say: 'In this video, you will find how much a cylindrical tank holds, in litres and in gallons.' },
      ],
    },
    {
      chapter: 'Base times height again',
      layout: 'split',
      leftWidth: 480,
      left: [figure('cy', [cylinder({ r: 2, h: 4, labels: { r: 'r', h: 'h' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{base: } \\pi r^2', 'V = \\pi r^2 h'] }],
      lines: [
        { say: 'The base of a cylinder is a circle with radius r. Its area is pi r squared.', show: ['cy.shape', 'cy.r', 'm.0'], focus: 'm.0' },
        { say: 'Stack that circle up through the height, h. So the volume is the area of the base times the height: pi r squared h.', show: ['cy.h', 'm.1'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'A water tank',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 1.5 \\div 2 = 0.75 \\text{ m}', 'V = \\pi(0.75)^2(2) = 1.125\\pi \\approx 3.5343 \\text{ m}^3', '3.5343 \\times 1000 \\approx 3534 \\text{ L}'] }],
      lines: [
        { say: 'A cylindrical water tank has an inside diameter of 1.5 metres, and a height of two metres. How many litres does it hold? Halve the diameter: the radius is 0.75 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume is pi times 0.75 squared, times two: 1.125 pi, about 3.5343 cubic metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Each cubic metre holds 1,000 litres, so the tank holds about 3,534 litres, to the nearest litre.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A stock tank in gallons',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 8 \\div 2 = 4 \\text{ ft}', 'V = \\pi(4)^2(2) = 32\\pi \\approx 100.53 \\text{ ft}^3', '100.53 \\times 6.229 \\approx 626 \\text{ gal}'] }],
      lines: [
        { say: 'A round stock tank is eight feet across, and holds water two feet deep. In this example, use one cubic foot is about 6.229 imperial gallons. About how many gallons of water are in it? The radius is four feet.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume of the water is pi times four squared, times two: thirty-two pi, about 100.53 cubic feet. The height is the depth of the water, not of the tank.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply by 6.229: about 626 imperial gallons.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Squaring the diameter',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Squaring the diameter', md: '$V = \\pi r^2 h$ squares the **radius**. Squaring the diameter makes the answer four times too big: $\\pi(1.5)^2(2) \\approx 14.1\\ \\text{m}^3$ instead of about $3.5\\ \\text{m}^3$ for the water tank.' }],
      lines: [
        { say: 'A common mistake is to square the diameter. The formula squares the radius.', show: 'oops' },
        { say: 'For the water tank, pi times 1.5 squared times two is about 14.1 cubic metres, four times the true 3.5. The diameter is twice the radius, and squaring it makes four times the area.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A can has a diameter of $8$ cm and a height of $12$ cm. How many millilitres does it hold, to the nearest millilitre?',
          choices: ['$603$ mL', '$2413$ mL', '$302$ mL', '$151$ mL'],
          answer: 0,
          working: '$r = 4$, so $V = \\pi(4)^2(12) = 192\\pi \\approx 603\\ \\text{cm}^3 = 603$ mL. B squares the diameter.',
        },
      ],
      lines: [
        { say: 'Your turn. A can has a diameter of eight centimetres, and a height of twelve. How many millilitres does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The radius is four, so the volume is pi times sixteen times twelve, 192 pi, about 603 cubic centimetres. That is 603 millilitres. B squares the diameter.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cylinder: $V = \\pi r^2 h$.', 'Halve the diameter before squaring.', 'Change to litres or gallons with the given conversion.'] }],
      lines: [
        { say: 'Let’s sum up. A cylinder has a volume of pi r squared h.', show: 'sum.0' },
        { say: 'Halve the diameter before you square it.', show: 'sum.1' },
        { say: 'And change to litres or gallons with the conversion the question gives. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
