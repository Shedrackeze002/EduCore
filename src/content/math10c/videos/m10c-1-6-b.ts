import type { Explainer } from '@/video/script.ts';
import { cone, figure, hemisphere, sphere } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-6-b',
  lessonId: 'm10c-1-6',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 2: Cones and Spheres',
  thumbnailTitle: 'Cones and Spheres',
  thumbnail: 'ball',
  summary: 'The surface area of a right cone, SA = πr² + πrs, using the slant height, and of a sphere, SA = 4πr², and a hemisphere-shaped dome.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.6 · Part 2', title: 'Cones and Spheres', subtitle: 'The surface area of round solids' }],
      lines: [
        { say: 'How much paper wraps an ice cream cone? How much leather covers a ball?', show: 'title' },
        { say: 'In this video, you will find the surface area of cones, spheres and domes.' },
      ],
    },
    {
      chapter: 'A right cone',
      layout: 'split',
      left: [figure('cone', [cone({ r: 3, h: 7, labels: { r: 'r', h: 'h', s: 's' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['SA = \\underbrace{\\pi r^2}_{\\text{base}} + \\underbrace{\\pi r s}_{\\text{lateral area}}'] },
        { kind: 'callout', id: 'tip', tone: 'key', title: 'Lateral area', md: 'The curved surface. It uses the **slant height** $s$, not the height.' },
      ],
      lines: [
        { say: 'A right cone has a circular base, and a curved surface that rises to the apex directly above the centre of the base.', show: 'cone.shape' },
        { say: 'Like a pyramid, it has a height, h, and a slant height, s, down its side. With the radius, they form a right triangle, so s squared equals h squared plus r squared.', show: ['cone.h', 'cone.h-mark', 'cone.r', 'cone.s'], focus: ['cone.h', 'cone.r', 'cone.s'] },
        { say: 'The surface area is the base, pi r squared, plus the curved surface, called the lateral area, which is pi r s.', show: 'm.0', focus: 'm.0' },
        { say: 'Notice that the lateral area uses the slant height, not the height.', show: 'tip', focus: 'cone.s' },
      ],
    },
    {
      chapter: 'A cone given its height',
      layout: 'split',
      left: [figure('cone', [cone({ r: 6, h: 8, labels: { r: '6', h: '8', s: 's' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A cone has radius $6\\text{ cm}$ and height $8\\text{ cm}$. Find its surface area.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['s = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\text{ cm}', 'SA = \\pi(6)^2 + \\pi(6)(10)', '= 36\\pi + 60\\pi = 96\\pi', '\\approx 301.6\\text{ cm}^2'] },
      ],
      lines: [
        { say: 'A cone has a radius of six centimetres and a height of eight centimetres. Find its surface area.', show: ['cone.shape', 'cone.r', 'cone.h', 'cone.h-mark', 'q'] },
        { say: 'First, the slant height. s is the square root of eight squared plus six squared: the square root of 100, which is ten.', show: ['cone.s', 'm.0'], focus: ['m.0', 'cone.s'] },
        { say: 'Then the formula: pi times six squared, plus pi times six times ten.', show: 'm.1', focus: 'm.1' },
        { say: 'That is 36 pi plus 60 pi, which is 96 pi,', show: 'm.2', focus: 'm.2' },
        { say: 'about 301.6 square centimetres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A sphere',
      layout: 'split',
      left: [figure('ball', [sphere({ r: 7, labels: { r: '7\\text{ in}' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['SA = 4\\pi r^2', '= 4\\pi(7)^2 = 196\\pi', '\\approx 615.8\\text{ in}^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Four circles', md: 'A sphere’s surface has exactly the same area as **four** circles of the same radius.' },
      ],
      lines: [
        { say: 'A sphere is perfectly round, like a ball. Every point on its surface is the same distance, r, from its centre.', show: ['ball.shape', 'ball.r'] },
        { say: 'Its surface area is four pi r squared. That is exactly four circles with the same radius.', show: ['m.0', 'tip'], focus: 'm.0' },
        { say: 'For a ball with radius seven inches: four pi times seven squared is 196 pi,', show: 'm.1', focus: 'm.1' },
        { say: 'about 615.8 square inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A dome',
      layout: 'split',
      left: [figure('dome', [hemisphere({ r: 10, labels: { r: '10\\text{ m}' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['\\tfrac12(4\\pi r^2) = 2\\pi r^2', '2\\pi(10)^2 = 200\\pi', '\\approx 628.3\\text{ m}^2'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Read the situation', md: 'If the problem includes the floor, add the flat circle, $\\pi r^2$.' },
      ],
      lines: [
        { say: 'A dome is half of a sphere, a hemisphere. What is the area of the curved surface of a dome with radius ten metres?', show: ['dome.shape', 'dome.r'] },
        { say: 'It is half of four pi r squared, so two pi r squared.', show: 'm.0', focus: 'm.0' },
        { say: 'With a radius of ten: two pi times a hundred is 200 pi,', show: 'm.1', focus: 'm.1' },
        { say: 'about 628.3 square metres.', show: 'm.2', focus: 'm.2' },
        { say: 'If the problem also includes the floor, add the flat circle, pi r squared.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A ball has a radius of $5\\text{ cm}$. What is its surface area, to the nearest tenth?',
          choices: ['$314.2\\text{ cm}^2$', '$78.5\\text{ cm}^2$', '$523.6\\text{ cm}^2$', '$157.1\\text{ cm}^2$'],
          answer: 0,
          working: '$SA = 4\\pi(5)^2 = 100\\pi \\approx 314.2\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A ball has a radius of five centimetres. What is its surface area, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four pi times five squared is 100 pi, about 314.2 square centimetres. B is just one circle, and D is half the sphere.', show: 'q.answer' },
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
            'Cone: $SA = \\pi r^2 + \\pi r s$, with the slant height $s$.',
            'Find $s$ from the height with $s^2 = h^2 + r^2$.',
            'Sphere: $SA = 4\\pi r^2$. A dome’s curved surface: $2\\pi r^2$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The surface area of a cone is pi r squared plus pi r s, using the slant height.", show: 'sum.0' },
        { say: 'If you are given the height, find the slant height first, with the Pythagorean theorem.', show: 'sum.1' },
        { say: 'A sphere is four pi r squared, and a dome, half a sphere, has a curved surface of two pi r squared. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
