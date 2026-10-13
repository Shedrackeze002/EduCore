import type { Explainer } from '@/video/script.ts';
import { box, cone, cylinder, figure, squarePyramid } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-7-b',
  lessonId: 'm10c-1-7',
  title: 'Volume of Prisms, Cylinders, Pyramids and Cones, Part 2: Pyramids and Cones',
  thumbnailTitle: 'Volume of Pyramids and Cones',
  thumbnail: 'both',
  summary: 'Why a pyramid or cone holds one third of the matching prism or cylinder, V = ⅓Bh, and finding the volume of pyramids and cones, including a cone given its slant height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.7 · Part 2', title: 'Volume of Pyramids and Cones', subtitle: 'One third of the prism' }],
      lines: [
        { say: 'An ice cream cone and a can with the same base and the same height. Which holds more, and how much more?', show: 'title' },
        { say: 'In this video, you will find the volume of pyramids and cones, and see why each is one third of the matching prism or cylinder.' },
      ],
    },
    {
      chapter: 'One third',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('both', [
          box({ name: 'p', l: 6, w: 6, h: 7, tone: 'muted' }),
          squarePyramid({ name: 'y', b: 6, h: 7 }),
          cylinder({ name: 'c', at: [12, 0], r: 2.6, h: 7, tone: 'muted' }),
          cone({ name: 'k', at: [12, 0], r: 2.6, h: 7 }),
        ]),
      ],
      right: [
        { kind: 'math', id: 'm', lines: ['V_{\\text{pyramid}} = \\tfrac13 Bh', 'V_{\\text{cone}} = \\tfrac13 \\pi r^2 h'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Same base, same height', md: 'A pyramid or cone holds exactly **one third** of the prism or cylinder around it.' },
      ],
      lines: [
        { say: 'Here is a pyramid inside a prism with the same base and the same height.', show: ['both.p-shape', 'both.y-shape'] },
        { say: 'If you filled the pyramid with water and poured it into the prism, it would take exactly three pyramids to fill it. So the pyramid holds one third.', focus: 'both.y-shape' },
        { say: 'So the volume of a pyramid is one third B h.', show: 'm.0', focus: 'm.0' },
        { say: 'The same is true for a cone inside a cylinder with the same base and height. The volume of a cone is one third pi r squared h.', show: ['both.c-shape', 'both.k-shape', 'm.1', 'tip'], focus: ['both.k-shape', 'm.1'] },
      ],
    },
    {
      chapter: 'A square pyramid',
      layout: 'split',
      left: [figure('pyr', [squarePyramid({ b: 9, h: 12, labels: { b: '9\\text{ m}', h: '12\\text{ m}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A square pyramid has a base $9\\text{ m}$ on each side and a height of $12\\text{ m}$. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['B = 9^2 = 81\\text{ m}^2', 'V = \\tfrac13(81)(12) = 324\\text{ m}^3'] },
      ],
      lines: [
        { say: 'A square pyramid has a base nine metres on each side, and a height of twelve metres. Find its volume.', show: ['pyr.shape', 'pyr.b', 'pyr.h', 'q'] },
        { say: 'The base is a square, so B is nine squared, which is 81 square metres.', show: 'm.0', focus: ['m.0', 'pyr.base-face'] },
        { say: 'Then the volume is one third times 81 times twelve, which is 324 cubic metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Using one third',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A prism has a volume of $150\\text{ cm}^3$. A pyramid has the same base and the same height. What is its volume?', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['V = \\tfrac13(150) = 50\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A prism has a volume of 150 cubic centimetres. A pyramid has the same base and the same height. What is the volume of the pyramid?', show: 'q' },
        { say: 'You do not even need the dimensions. The pyramid is one third of the prism: one third of 150 is fifty cubic centimetres.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A cone given its slant height',
      layout: 'split',
      left: [figure('cone', [cone({ r: 5, h: 12, labels: { r: '5', h: 'h', s: '13' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A cone has radius $5\\text{ cm}$ and **slant height** $13\\text{ cm}$. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\text{ cm}', 'V = \\tfrac13\\pi(5)^2(12) = 100\\pi', '\\approx 314.2\\text{ cm}^3'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not the slant height', md: 'Volume formulas use the **height**. Find it first.' },
      ],
      lines: [
        { say: 'A cone has a radius of five centimetres and a slant height of thirteen. Find its volume.', show: ['cone.shape', 'cone.r', 'cone.s', 'q'] },
        { say: 'Careful: the volume formula needs the height, not the slant height. The height, radius and slant height form a right triangle, with the slant height as the hypotenuse.', show: ['cone.h', 'cone.h-mark', 'oops'], focus: ['cone.h', 'cone.r', 'cone.s'] },
        { say: 'So h is the square root of thirteen squared minus five squared: the square root of 144, which is twelve.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the volume: one third pi, times five squared, times twelve, is 100 pi, about 314.2 cubic centimetres.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cone has radius $3\\text{ cm}$ and height $4\\text{ cm}$. What is its volume, to the nearest tenth?',
          choices: ['$37.7\\text{ cm}^3$', '$113.1\\text{ cm}^3$', '$47.1\\text{ cm}^3$', '$12.6\\text{ cm}^3$'],
          answer: 0,
          working: '$V = \\tfrac13\\pi(3)^2(4) = 12\\pi \\approx 37.7\\text{ cm}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone has a radius of three centimetres and a height of four. What is its volume, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One third pi, times three squared, times four, is twelve pi, about 37.7 cubic centimetres. B forgets the one third; it is the cylinder.', show: 'q.answer' },
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
            'A pyramid or cone holds one third of the prism or cylinder with the same base and height.',
            'Pyramid: $V = \\tfrac13 Bh$. Cone: $V = \\tfrac13 \\pi r^2 h$.',
            'Use the height, not the slant height. Find it with the Pythagorean theorem if you need to.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. A pyramid or a cone holds one third of the prism or cylinder with the same base and the same height.", show: 'sum.0' },
        { say: 'So a pyramid is one third B h, and a cone is one third pi r squared h.', show: 'sum.1' },
        { say: 'And always use the height, not the slant height. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
