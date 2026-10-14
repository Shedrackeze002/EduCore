import type { Explainer } from '@/video/script.ts';
import { cone, cylinder, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-2-b',
  lessonId: 'm203-3-2',
  title: 'Volume of Pyramids, Cones and Spheres, Part 2: Cones',
  thumbnailTitle: 'Volume of a Cone',
  thumbnail: 'pile',
  summary: 'V = ⅓πr²h for a cone, a road-salt pile 8 m across and 2.5 m high (about 41.9 m³), finding the true height of a gravel pile from its 6.5 m slant height (about 109 m³), and why the slant height does not belong in a volume formula.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.2 · Part 2', title: 'Volume of a Cone', subtitle: 'Piles of salt and gravel' }],
      lines: [
        { say: 'Salt, sand and gravel dumped from a conveyor form a cone. Road crews estimate how much is in a pile from its width and height.', show: 'title' },
        { say: 'In this video, you will find the volume of a cone, even when you can only measure down its side.' },
      ],
    },
    {
      chapter: 'One third of a cylinder',
      layout: 'split',
      leftWidth: 480,
      left: [figure('cc', [cylinder({ r: 2, h: 4, tone: 'muted' }), cone({ name: 'cn', r: 2, h: 4, labels: { r: 'r', h: 'h' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V_{\\text{cylinder}} = \\pi r^2 h', 'V_{\\text{cone}} = \\tfrac13 \\pi r^2 h'] }],
      lines: [
        { say: 'In the same way as a pyramid, a cone holds one third of the cylinder with the same radius and height.', show: ['cc.shape', 'cc.cn-shape', 'cc.cn-r', 'cc.cn-h', 'm.0'], focus: 'm.0' },
        { say: 'So the volume of a cone is one third pi r squared h.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A road-salt pile',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['r = 8 \\div 2 = 4 \\text{ m}', 'V = \\tfrac13 \\pi(4)^2(2.5) = \\tfrac13 \\times 40\\pi', '\\approx 41.89 \\approx 41.9 \\text{ m}^3'] }],
      lines: [
        { say: 'A conical pile of road salt is eight metres across the bottom, and 2.5 metres high. What is its volume? The radius is four metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Pi times four squared times 2.5 is forty pi. One third of that is about 41.89.', show: 'm.1', focus: 'm.1' },
        { say: 'So the pile holds about 41.9 cubic metres of salt.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Height, not slant height',
      layout: 'split',
      leftWidth: 520,
      left: [figure('gp', [cone({ r: 5, h: 4.153, labels: { r: '5\\text{ m}', s: '6.5\\text{ m}', h: 'h' } })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['h = \\sqrt{6.5^2 - 5^2} = \\sqrt{17.25}', '\\approx 4.153 \\text{ m}', 'V = \\tfrac13 \\pi(5)^2(4.153) \\approx 109 \\text{ m}^3'] }],
      lines: [
        { say: 'On a pile of gravel, you cannot reach the centre to measure the height, but you can measure down the side. A conical gravel pile is ten metres across, and its slant height, from the top down to the edge, is 6.5 metres.', show: ['gp.shape', 'gp.r', 'gp.s'] },
        { say: 'The height, the radius and the slant height form a right triangle, with the slant height as the hypotenuse. So h is the square root of 6.5 squared minus five squared: root 17.25, about 4.153 metres.', show: ['gp.h', 'm.0', 'm.1'], focus: ['gp.h', 'm.0'] },
        { say: 'Now the volume: one third pi times five squared, times 4.153, is about 109 cubic metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Slant height in a volume formula',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Slant height in a volume formula', md: 'Using the slant height $6.5$ as the height gives about $170\\ \\text{m}^3$, far too much gravel. The slant height belongs in **surface area**; volume needs the **true height**.' }],
      lines: [
        { say: 'Using the slant height, 6.5, as the height gives about 170 cubic metres, far too much gravel. The slant height belongs in surface area. Volume needs the true height, straight down inside.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cone-shaped funnel has a radius of $6$ cm and a height of $8$ cm. How much does it hold, to the nearest cubic centimetre?',
          choices: ['$302\\ \\text{cm}^3$', '$905\\ \\text{cm}^3$', '$101\\ \\text{cm}^3$', '$377\\ \\text{cm}^3$'],
          answer: 0,
          working: '$V = \\tfrac13 \\pi(6)^2(8) = 96\\pi \\approx 302\\ \\text{cm}^3$. B forgets the one third.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone-shaped funnel has a radius of six centimetres and a height of eight centimetres. How much does it hold? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. One third pi times thirty-six times eight is ninety-six pi, about 302 cubic centimetres. B forgets the one third.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cone: $V = \\tfrac13 \\pi r^2 h$.', 'From a slant height: $h = \\sqrt{s^2 - r^2}$.', 'Volume uses the height, never the slant height.'] }],
      lines: [
        { say: 'Let’s sum up. A cone has a volume of one third pi r squared h.', show: 'sum.0' },
        { say: 'If you know the slant height, find the height first: the square root of s squared minus r squared.', show: 'sum.1' },
        { say: 'And volume always uses the height, never the slant height. In part three, we find the volume of spheres. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
