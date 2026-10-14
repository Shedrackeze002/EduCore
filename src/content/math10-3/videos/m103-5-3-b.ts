import type { Explainer } from '@/video/script.ts';
import { cylinderNet, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-5-3-b',
  lessonId: 'm103-5-3',
  title: 'Surface Area, Part 2: Cylinders',
  thumbnailTitle: 'Surface Area of a Cylinder',
  thumbnail: 'net',
  summary: 'The net of a cylinder (two circles and a rectangle 2πr long), the formula SA = 2πr² + 2πrh, an open stock tank with only one circle, and halving the diameter first.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.3 · Part 2', title: 'Surface Area of a Cylinder', subtitle: 'Two circles and a rectangle' }],
      lines: [
        { say: 'How much sheet metal is in a water tank? How much paint covers a grain bin?', show: 'title' },
        { say: 'In this video, you will find the surface area of closed and open cylinders.' },
      ],
    },
    {
      chapter: 'The net of a cylinder',
      layout: 'split',
      leftWidth: 520,
      left: [figure('net', [cylinderNet({ r: 1, h: 2.4, labels: { c: '2\\pi r', h: 'h', r: 'r' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{circles: } 2\\pi r^2', '\\text{side: } 2\\pi r \\times h', 'SA = 2\\pi r^2 + 2\\pi r h'] }],
      lines: [
        { say: 'Peel the label off a can and lay it flat: it is a rectangle. Its length is the distance around the can, the circumference two pi r, and its width is the height.', show: ['net.rect', 'net.c', 'net.h'], focus: 'net.rect' },
        { say: 'So a closed cylinder unfolds into two circles and one rectangle. The two circles have an area of two pi r squared.', show: ['net.circles', 'net.r', 'm.0'], focus: ['net.circles', 'm.0'] },
        { say: 'The rectangle has an area of two pi r times h.', show: 'm.1', focus: ['net.rect', 'm.1'] },
        { say: 'So the surface area of a closed cylinder is two pi r squared, plus two pi r h.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A closed tank',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['2\\pi(0.5)^2 = 0.5\\pi', '2\\pi(0.5)(1.2) = 1.2\\pi', 'SA = 1.7\\pi \\approx 5.3\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A closed cylindrical water tank has a radius of half a metre, and a height of 1.2 metres. The two circles are two pi times 0.5 squared: 0.5 pi square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'The curved side is two pi times 0.5 times 1.2: 1.2 pi.', show: 'm.1', focus: 'm.1' },
        { say: 'So the surface area is 1.7 pi, about 5.3 square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An open stock tank',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['r = 8 \\div 2 = 4\\text{ ft}', '\\pi(4)^2 + 2\\pi(4)(2) = 16\\pi + 16\\pi = 32\\pi', '32\\pi \\approx 100.5\\text{ ft}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Diameter or radius?', md: 'Plans usually give the **diameter**, but both parts of the formula use the **radius**. Halve the diameter first.' },
      ],
      lines: [
        { say: 'A round stock tank for cattle has no lid. Its diameter is eight feet, and its height is two feet. First, the radius: four feet.', show: 'm.0', focus: 'm.0' },
        { say: 'With no lid, there is only one circle: pi times four squared, sixteen pi. The curved side is two pi times four times two: also sixteen pi.', show: 'm.1', focus: 'm.1' },
        { say: 'So 32 pi: about 100.5 square feet of steel.', show: 'm.2', focus: 'm.2' },
        { say: 'Plans and labels usually give the diameter, but both parts of the formula use the radius. Halve the diameter first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed can has a radius of $4\\text{ cm}$ and a height of $10\\text{ cm}$. What is its surface area, to the nearest square centimetre?',
          choices: ['$352\\text{ cm}^2$', '$302\\text{ cm}^2$', '$251\\text{ cm}^2$', '$503\\text{ cm}^2$'],
          answer: 0,
          working: '$2\\pi(4)^2 + 2\\pi(4)(10) = 32\\pi + 80\\pi = 112\\pi \\approx 352\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed can has a radius of four centimetres, and a height of ten centimetres. What is its surface area, to the nearest square centimetre? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two pi times four squared is 32 pi, and two pi times four times ten is eighty pi. Together, 112 pi is about 352 square centimetres. B has only one circle, and C is the curved side alone.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A cylinder unfolds into two circles and a rectangle $2\\pi r$ long.', 'Closed cylinder: $SA = 2\\pi r^2 + 2\\pi r h$.', 'No lid: one circle. Halve the diameter first.'] }],
      lines: [
        { say: 'Let’s sum up. A cylinder unfolds into two circles, and a rectangle two pi r long.', show: 'sum.0' },
        { say: 'So a closed cylinder has a surface area of two pi r squared, plus two pi r h.', show: 'sum.1' },
        { say: 'With no lid, there is only one circle. And always halve the diameter first. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
