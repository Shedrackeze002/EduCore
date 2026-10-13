import type { Explainer } from '@/video/script.ts';
import { box, cylinder, cylinderNet, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-5-b',
  lessonId: 'm10c-1-5',
  title: 'Surface Area of Prisms and Cylinders, Part 2: Cylinders',
  thumbnailTitle: 'Surface Area of Cylinders',
  thumbnail: 'can',
  summary: 'Unrolling a cylinder into two circles and a rectangle to get SA = 2πr² + 2πrh, and deciding which surfaces a real problem includes: a label on a can, or a box with an open top.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.5 · Part 2', title: 'Surface Area of Cylinders', subtitle: 'And which surfaces really count' }],
      lines: [
        { say: 'How much metal does it take to make a soup can? And how much paper for its label?', show: 'title' },
        { say: 'In this video, you will unroll a cylinder to find its surface area, and decide which surfaces a real problem includes.' },
      ],
    },
    {
      chapter: 'Unroll a can',
      layout: 'split',
      leftWidth: 400,
      left: [figure('can', [cylinder({ r: 3, h: 7, labels: { r: 'r', h: 'h' } })])],
      right: [figure('net', [cylinderNet({ r: 3, h: 7, labels: { c: '2\\pi r', h: 'h', r: 'r' } })])],
      lines: [
        { say: 'Here is a cylinder with radius r and height h.', show: ['can.shape', 'can.r', 'can.h'] },
        { say: 'Peel off its curved side and unroll it. You get a rectangle, as tall as the can.', show: ['net.rect', 'net.h'], focus: ['can.h', 'net.h'] },
        { say: 'Its length is the distance around the circle, which is the circumference: two pi r.', show: 'net.c', focus: 'net.c' },
        { say: 'Add the top and bottom circles, and the net of a cylinder is two circles and a rectangle.', show: ['net.circles', 'net.r'], focus: 'net.circles' },
      ],
    },
    {
      chapter: 'The formula',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['SA = \\underbrace{2\\pi r^2}_{\\text{two circles}} + \\underbrace{2\\pi r h}_{\\text{curved surface}}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Radius, not diameter', md: 'The formulas use the **radius**. Given the diameter, divide by 2 first.' },
      ],
      lines: [
        { say: 'Each circle has area pi r squared, so the two circles make two pi r squared. The rectangle is two pi r long and h tall, so its area is two pi r h.', show: 'm.0' },
        { say: 'Watch out: these formulas use the radius. If you are given the diameter, divide by two first.', show: 'oops' },
      ],
    },
    {
      chapter: 'A closed cylinder',
      layout: 'split',
      leftWidth: 420,
      left: [figure('can', [cylinder({ r: 5, h: 14, labels: { r: '5\\text{ cm}', h: '14\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'Find the surface area of a cylinder with diameter $10\\text{ cm}$ and height $14\\text{ cm}$, to the nearest tenth.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 10 \\div 2 = 5\\text{ cm}', '2\\pi(5)^2 = 50\\pi', '2\\pi(5)(14) = 140\\pi', 'SA = 190\\pi \\approx 596.9\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Find the surface area of a cylinder with diameter ten centimetres and height fourteen centimetres, to the nearest tenth.', show: ['can.shape', 'can.h', 'q'] },
        { say: 'First, the radius: half of ten is five.', show: ['m.0', 'can.r'], focus: ['m.0', 'can.r'] },
        { say: 'The two circles: two pi times five squared is fifty pi.', show: 'm.1', focus: ['m.1', 'can.top-face'] },
        { say: 'The curved surface: two pi times five times fourteen is 140 pi.', show: 'm.2', focus: ['m.2', 'can.lateral'] },
        { say: 'Together, 190 pi, which is about 596.9 square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which surfaces count?',
      layout: 'split',
      leftWidth: 420,
      left: [figure('can', [cylinder({ r: 4, h: 11, labels: { r: '4\\text{ cm}', h: '11\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A label covers only the curved surface of a can with diameter $8\\text{ cm}$ and height $11\\text{ cm}$. What is the area of the label?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['2\\pi r h = 2\\pi(4)(11) = 88\\pi', '\\approx 276.5\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'Real objects are not always closed. Ask yourself which surfaces actually exist, or need to be covered.' },
        { say: 'A label covers only the curved surface of a can with diameter eight centimetres and height eleven. What is the area of the label?', show: ['can.shape', 'can.h', 'q'] },
        { say: 'The label has no top or bottom, so we only need the curved surface: two pi r h. The radius is half of eight, four, so that is two pi times four times eleven, which is 88 pi,', show: ['m.0', 'can.lateral', 'can.r'], focus: ['m.0', 'can.lateral'] },
        { say: 'about 276.5 square centimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'An open box',
      layout: 'split',
      leftWidth: 520,
      left: [figure('box', [box({ l: 30, w: 20, h: 10, labels: { l: '30\\text{ cm}', w: '20\\text{ cm}', h: '10\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'How much cardboard makes an **open-top** box $30\\text{ cm}$ long, $20\\text{ cm}$ wide and $10\\text{ cm}$ high?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{bottom only: } 30 \\times 20 = 600', '\\text{front, back: } 2(30 \\times 10) = 600', '\\text{ends: } 2(20 \\times 10) = 400', '600 + 600 + 400 = 1600\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'How much cardboard is needed for an open-top box, thirty centimetres long, twenty wide and ten high?', show: ['box.shape', 'box.l', 'box.w', 'box.h', 'q'] },
        { say: 'There is no top, so count the bottom only once: thirty times twenty is 600.', show: 'm.0', focus: 'm.0' },
        { say: 'The front and back: two times thirty times ten is 600.', show: 'm.1', focus: ['m.1', 'box.front-face'] },
        { say: 'The two ends: two times twenty times ten is 400.', show: 'm.2', focus: ['m.2', 'box.side-face'] },
        { say: 'Altogether, 1600 square centimetres of cardboard.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A can with radius $3\\text{ cm}$ and height $10\\text{ cm}$ has **no lid**. How much metal is it made of, to the nearest tenth?',
          choices: ['$216.8\\text{ cm}^2$', '$245.0\\text{ cm}^2$', '$188.5\\text{ cm}^2$', '$122.5\\text{ cm}^2$'],
          answer: 0,
          working: 'One circle and the curved surface: $\\pi(3)^2 + 2\\pi(3)(10) = 9\\pi + 60\\pi = 69\\pi \\approx 216.8\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A can with radius three centimetres and height ten centimetres has no lid. How much metal is it made of, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. There is only one circle, the bottom: pi times three squared is nine pi. The curved surface is two pi times three times ten, sixty pi. Together, 69 pi, about 216.8 square centimetres. B counts a lid too.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'A cylinder unrolls into two circles and a rectangle $2\\pi r$ long.',
            '$SA = 2\\pi r^2 + 2\\pi r h$; the curved surface alone is $2\\pi r h$.',
            'Use the radius: halve the diameter first.',
            'Read the situation: open tops and labels change which surfaces you include.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A cylinder unrolls into two circles and a rectangle, two pi r long.", show: 'sum.0' },
        { say: 'So its surface area is two pi r squared, plus two pi r h, and the curved surface alone is two pi r h.', show: 'sum.1' },
        { say: 'The formulas use the radius, so halve the diameter first.', show: 'sum.2' },
        { say: 'And read the situation: open tops, labels and hidden faces change which surfaces you include. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
