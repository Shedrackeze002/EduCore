import type { Explainer } from '@/video/script.ts';
import { box, cylinder, figure, triangularPrism } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-7',
  lessonId: 'm10c-1-7',
  title: 'Volume of Prisms, Cylinders, Pyramids and Cones, Part 1: Prisms and Cylinders',
  thumbnailTitle: 'Volume of Prisms and Cylinders',
  thumbnail: 'tank',
  summary: 'Volume as the area of the base times the height, V = Bh, for rectangular prisms, cylinders and triangular prisms, and how cubic centimetres relate to litres. Part 2 covers pyramids and cones.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.7 · Part 1', title: 'Volume of Prisms and Cylinders', subtitle: 'Area of the base times the height' }],
      lines: [
        { say: 'How much water does an aquarium hold? How much soup fits in a can? These are volume questions.', show: 'title' },
        { say: 'In this video, you will find the volume of prisms and cylinders. In part two, we cover pyramids and cones.' },
      ],
    },
    {
      chapter: 'V = Bh',
      layout: 'split',
      left: [figure('tank', [box({ l: 6, w: 3, h: 4, labels: { l: '60\\text{ cm}', w: '30\\text{ cm}', h: '40\\text{ cm}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Volume', md: 'The space a 3-D object takes up, in **cubic** units such as $\\text{cm}^3$. **Capacity** is how much it holds: $1000\\text{ cm}^3 = 1\\text{ L}$.' },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Prisms and cylinders', md: '$V = Bh$: the area of the base times the height.' },
      ],
      lines: [
        { say: 'Volume is the amount of space a 3-D object takes up. It is measured in cubic units, such as cubic centimetres.', show: ['tank.shape', 'def'] },
        { say: 'For any prism or cylinder, picture the base as one thin layer, then stack identical layers up to the height.', show: 'tank.top-face', focus: 'tank.top-face' },
        { say: 'So the volume is the area of the base, B, times the height: V equals B h.', show: 'rule', focus: 'rule' },
      ],
    },
    {
      chapter: 'A rectangular prism',
      layout: 'split',
      left: [figure('tank', [box({ l: 6, w: 3, h: 4, labels: { l: '60\\text{ cm}', w: '30\\text{ cm}', h: '40\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'An aquarium is $60\\text{ cm}$ long, $30\\text{ cm}$ wide and $40\\text{ cm}$ high. What is its volume, and how many litres does it hold?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V = 60 \\times 30 \\times 40', '= 72\\,000\\text{ cm}^3', '72\\,000 \\div 1000 = 72\\text{ L}'] },
      ],
      lines: [
        { say: 'An aquarium is sixty centimetres long, thirty wide and forty high. What is its volume, and how many litres does it hold?', show: ['tank.shape', 'tank.l', 'tank.w', 'tank.h', 'q'] },
        { say: 'The base is sixty by thirty, and the height is forty. So the volume is sixty times thirty times forty,', show: 'm.0', focus: 'm.0' },
        { say: 'which is 72 thousand cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'A thousand cubic centimetres make one litre, so divide by a thousand: the aquarium holds 72 litres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A cylinder',
      layout: 'split',
      leftWidth: 420,
      left: [figure('can', [cylinder({ r: 3.5, h: 12, labels: { r: '3.5\\text{ cm}', h: '12\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A can has radius $3.5\\text{ cm}$ and height $12\\text{ cm}$. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['B = \\pi r^2 = \\pi(3.5)^2', 'V = \\pi(3.5)^2(12) = 147\\pi', '\\approx 461.8\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A cylinder works the same way. Its base is a circle, so B is pi r squared, and the volume is pi r squared h.', show: ['can.shape', 'can.top-face', 'm.0'], focus: ['can.top-face', 'm.0'] },
        { say: 'A can has a radius of 3.5 centimetres and a height of twelve centimetres. Find its volume.', show: ['can.r', 'can.h', 'q'] },
        { say: 'Pi times 3.5 squared, times twelve, is 147 pi,', show: 'm.1', focus: 'm.1' },
        { say: 'about 461.8 cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A triangular prism',
      layout: 'split',
      left: [figure('tent', [triangularPrism({ b: 2.4, t: 1.5, l: 3, labels: { b: '2.4\\text{ m}', t: '1.5\\text{ m}', l: '3\\text{ m}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A tent is a triangular prism. Its triangle has base $2.4\\text{ m}$ and height $1.5\\text{ m}$, and it is $3\\text{ m}$ long.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['B = \\tfrac12(2.4)(1.5) = 1.8\\text{ m}^2', 'V = 1.8 \\times 3 = 5.4\\text{ m}^3'] },
      ],
      lines: [
        { say: 'A tent is a triangular prism. Its triangle has a base of 2.4 metres and a height of 1.5 metres, and the tent is three metres long.', show: ['tent.shape', 'tent.b', 'tent.t', 'tent.t-mark', 'tent.l', 'q'] },
        { say: 'The base of this prism is the triangle, so B is one half times 2.4 times 1.5, which is 1.8 square metres.', show: 'm.0', focus: ['m.0', 'tent.front-face'] },
        { say: 'Its height is the length of the tent, three metres. So the volume is 1.8 times three, which is 5.4 cubic metres.', show: 'm.1', focus: ['m.1', 'tent.l'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cylinder has radius $3\\text{ cm}$ and height $10\\text{ cm}$. What is its volume, to the nearest tenth?',
          choices: ['$282.7\\text{ cm}^3$', '$188.5\\text{ cm}^3$', '$1131.0\\text{ cm}^3$', '$90.0\\text{ cm}^3$'],
          answer: 0,
          working: '$V = \\pi(3)^2(10) = 90\\pi \\approx 282.7\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder has a radius of three centimetres and a height of ten. What is its volume, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Pi times three squared, times ten, is ninety pi, about 282.7 cubic centimetres. B is the curved surface area, and C uses the diameter instead of the radius.', show: 'q.answer' },
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
            'Volume is in cubic units; $1000\\text{ cm}^3 = 1\\text{ L}$.',
            'Prisms and cylinders: $V = Bh$, the area of the base times the height.',
            'Cylinder: $V = \\pi r^2 h$. For a lying-down prism, the "height" is its length.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Volume is measured in cubic units, and a thousand cubic centimetres make a litre.", show: 'sum.0' },
        { say: 'For any prism or cylinder, the volume is the area of the base times the height.', show: 'sum.1' },
        { say: 'For a cylinder, that is pi r squared h. And for a prism lying on its side, the height is its length. In part two, we find the volume of pyramids and cones. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
