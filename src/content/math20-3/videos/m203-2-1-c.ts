import type { Explainer } from '@/video/script.ts';
import { cylinderNet, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-1-c',
  lessonId: 'm203-2-1',
  title: 'Surface Area, Part 3: Cylinders',
  thumbnailTitle: 'Surface Area of a Cylinder',
  thumbnail: 'net',
  summary: 'The net of a cylinder, lateral area 2πrh = πdh, SA = 2πr² + 2πrh for a closed water tank 1.2 m across (about 11.7 m²), the curved side of an 8 in duct 5 ft long (about 10.5 ft²), and halving the diameter first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.1 · Part 3', title: 'Surface Area of a Cylinder', subtitle: 'Tanks and ducts' }],
      lines: [
        { say: 'Water tanks, grain bins, pipes and heating ducts are cylinders. To build one, you need to know how much material wraps around it.', show: 'title' },
        { say: 'In this video, you will find the surface area of a closed cylinder, and the curved side of an open one.' },
      ],
    },
    {
      chapter: 'The net of a cylinder',
      layout: 'split',
      leftWidth: 520,
      left: [figure('net', [cylinderNet({ r: 1, h: 2.4, labels: { c: '2\\pi r', h: 'h', r: 'r' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{circles: } 2\\pi r^2', '\\text{curved side: } 2\\pi r h = \\pi d h', 'SA = 2\\pi r^2 + 2\\pi r h'] }],
      lines: [
        { say: 'Peel the label off a can and lay it flat: it is a rectangle. Its length is the distance around the can, the circumference two pi r, and its width is the height h.', show: ['net.rect', 'net.c', 'net.h'], focus: 'net.rect' },
        { say: 'So a closed cylinder unfolds into two circles and one rectangle. The two circles have an area of two pi r squared.', show: ['net.circles', 'net.r', 'm.0'], focus: ['net.circles', 'm.0'] },
        { say: 'The curved side, called the lateral area, is two pi r h. Since two r is the diameter, that is the same as pi d h.', show: 'm.1', focus: ['net.rect', 'm.1'] },
        { say: 'So the surface area of a closed cylinder is two pi r squared, plus two pi r h.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A closed water tank',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 1.2 \\div 2 = 0.6 \\text{ m}', '\\text{circles: } 2\\pi(0.6)^2 = 0.72\\pi', '\\text{curved side: } 2\\pi(0.6)(2.5) = 3\\pi', 'SA = 3.72\\pi \\approx 11.7 \\text{ m}^2'] }],
      lines: [
        { say: 'A closed cylindrical water tank has a diameter of 1.2 metres, and a height of 2.5 metres. The formula uses the radius, so halve the diameter first: 0.6 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The two circles: two pi times 0.6 squared, 0.72 pi square metres.', show: 'm.1', focus: 'm.1' },
        { say: 'The curved side: two pi times 0.6 times 2.5, which is three pi.', show: 'm.2', focus: 'm.2' },
        { say: 'Add them: 3.72 pi, about 11.7 square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A round duct',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['d = 8 \\div 12 = \\tfrac23 \\text{ ft}', 'A = \\pi d h = \\pi \\times \\tfrac23 \\times 5', '\\approx 10.5 \\text{ ft}^2'] }],
      lines: [
        { say: 'A round heating duct has a diameter of eight inches, and is five feet long. It is open at both ends, so only the curved side counts. Put both lengths in feet: eight inches is two thirds of a foot.', show: 'm.0', focus: 'm.0' },
        { say: 'With the diameter, the lateral area is pi d h: pi times two thirds times five.', show: 'm.1', focus: 'm.1' },
        { say: 'That is about 10.5 square feet of sheet metal.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Diameter or radius?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Diameter or radius?', md: 'Plans usually give the **diameter**, but $2\\pi r^2 + 2\\pi r h$ uses the **radius**. Halve the diameter first. Using $1.2$ in place of $0.6$ for the tank would make each circle four times too big.' }],
      lines: [
        { say: 'Plans usually give the diameter, but the formula uses the radius. Halve the diameter first.', show: 'oops' },
        { say: 'Using 1.2 in place of 0.6 for the tank would make each circle four times too big, because the radius is squared.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed can has a diameter of $10$ cm and a height of $12$ cm. What is its surface area, to the nearest square centimetre?',
          choices: ['$534\\ \\text{cm}^2$', '$1382\\ \\text{cm}^2$', '$377\\ \\text{cm}^2$', '$456\\ \\text{cm}^2$'],
          answer: 0,
          working: '$r = 5$. $2\\pi(5)^2 + 2\\pi(5)(12) = 50\\pi + 120\\pi = 170\\pi \\approx 534\\ \\text{cm}^2$. B uses the diameter as the radius.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed can has a diameter of ten centimetres and a height of twelve. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The radius is five. The circles are fifty pi, and the curved side is 120 pi, so the total is 170 pi, about 534 square centimetres. B uses the diameter as the radius.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Closed cylinder: $SA = 2\\pi r^2 + 2\\pi r h$.', 'Curved side only: $2\\pi r h = \\pi d h$.', 'Halve the diameter, and use one unit.'] }],
      lines: [
        { say: 'Let’s sum up. A closed cylinder has a surface area of two pi r squared, plus two pi r h.', show: 'sum.0' },
        { say: 'For the curved side only, use two pi r h, or pi d h.', show: 'sum.1' },
        { say: 'And halve the diameter to get the radius, with every measurement in the same unit. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
