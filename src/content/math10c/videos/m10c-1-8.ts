import type { Explainer } from '@/video/script.ts';
import { cylinder, figure, sphere } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-8',
  lessonId: 'm10c-1-8',
  title: 'Spheres, Composite Objects and Unknown Dimensions, Part 1: Spheres and Unknown Dimensions',
  thumbnailTitle: 'Volume of a Sphere',
  thumbnail: 'fit',
  summary: 'The volume of a sphere, V = ⁴⁄₃πr³, as two thirds of the cylinder around it, the volume of a hemisphere, and working backwards from a volume or surface area to an unknown radius or height. Part 2 covers composite objects.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.8 · Part 1', title: 'Spheres and Unknown Dimensions', subtitle: 'Volume, and working backwards' }],
      lines: [
        { say: 'How much air is inside a basketball? And if a tank must hold 200 cubic metres, how tall should it be?', show: 'title' },
        { say: 'In this video, you will find the volume of a sphere, and work backwards from a volume or surface area to a missing dimension.' },
      ],
    },
    {
      chapter: 'Volume of a sphere',
      layout: 'split',
      left: [figure('fit', [cylinder({ name: 'c', at: [0, -4], r: 4, h: 8, tone: 'muted', labels: { h: '2r' } }), sphere({ name: 's', r: 4, labels: { r: 'r' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['V_{\\text{cylinder}} = \\pi r^2(2r) = 2\\pi r^3', 'V_{\\text{sphere}} = \\tfrac23(2\\pi r^3) = \\tfrac43\\pi r^3', 'V_{\\text{hemisphere}} = \\tfrac23\\pi r^3'] },
      ],
      lines: [
        { say: 'Fit a sphere snugly inside a cylinder. The cylinder has the same radius, and its height is the diameter, two r.', show: ['fit.s-shape', 'fit.s-r', 'fit.c-shape', 'fit.c-h'] },
        { say: 'So the cylinder holds pi r squared times two r, which is two pi r cubed.', show: 'm.0', focus: 'm.0' },
        { say: 'Over two thousand years ago, Archimedes showed that the sphere fills exactly two thirds of it. Two thirds of two pi r cubed is four thirds pi r cubed.', show: 'm.1', focus: ['m.1', 'fit.s-shape'] },
        { say: 'And a hemisphere is half of that: two thirds pi r cubed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A ball',
      layout: 'split',
      left: [figure('ball', [sphere({ r: 12, labels: { r: '12\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A ball has a diameter of $24\\text{ cm}$. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 24 \\div 2 = 12\\text{ cm}', 'V = \\tfrac43\\pi(12)^3 = 2304\\pi', '\\approx 7238.2\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'A ball has a diameter of 24 centimetres. Find its volume.', show: ['ball.shape', 'q'] },
        { say: 'The formula uses the radius, so halve the diameter: twelve centimetres.', show: ['ball.r', 'm.0'], focus: 'm.0' },
        { say: 'Four thirds pi times twelve cubed is 2304 pi,', show: 'm.1', focus: 'm.1' },
        { say: 'about 7238.2 cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An unknown height',
      layout: 'split',
      leftWidth: 420,
      left: [figure('tank', [cylinder({ r: 3, h: 7.1, labels: { r: '3\\text{ m}', h: 'h' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A cylindrical tank with radius $3\\text{ m}$ must hold $200\\text{ m}^3$. How tall must it be?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['200 = \\pi(3)^2 h = 9\\pi h', 'h = \\dfrac{200}{9\\pi}', 'h \\approx 7.1\\text{ m}'] },
      ],
      lines: [
        { say: 'Sometimes you know the volume, and need a dimension. A cylindrical tank with a radius of three metres must hold 200 cubic metres. How tall must it be?', show: ['tank.shape', 'tank.r', 'tank.h', 'q'] },
        { say: 'Write the formula with what you know. 200 equals pi times three squared times h, which is nine pi h.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides by nine pi: h equals 200 over nine pi,', show: 'm.1', focus: 'm.1' },
        { say: 'which is about 7.1 metres.', show: 'm.2', focus: ['m.2', 'tank.h'] },
      ],
    },
    {
      chapter: 'An unknown radius',
      layout: 'split',
      leftWidth: 560,
      left: [
        { kind: 'text', id: 'q1', md: 'A sphere holds $5\\text{ m}^3$. Find its radius.', size: 'md' },
        { kind: 'math', id: 'm1', size: 'md', lines: ['5 = \\tfrac43\\pi r^3', 'r^3 = \\dfrac{3(5)}{4\\pi} \\approx 1.194', 'r = \\sqrt[3]{1.194} \\approx 1.1\\text{ m}'] },
      ],
      right: [
        { kind: 'text', id: 'q2', md: 'A sphere has a surface area of $500\\text{ cm}^2$. Find its radius.', size: 'md' },
        { kind: 'math', id: 'm2', size: 'md', lines: ['500 = 4\\pi r^2', 'r^2 = \\dfrac{500}{4\\pi} \\approx 39.79', 'r = \\sqrt{39.79} \\approx 6.3\\text{ cm}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Undo the power', md: '$r^2$: finish with a square root. $r^3$: finish with a **cube** root.' },
      ],
      lines: [
        { say: 'Now an unknown radius. A sphere holds five cubic metres. Find its radius.', show: 'q1' },
        { say: 'Five equals four thirds pi r cubed. Multiply both sides by three, and divide by four pi: r cubed is about 1.194.', show: ['m1.0', 'm1.1'], focus: ['m1.0', 'm1.1'] },
        { say: 'r is cubed, so take the cube root: about 1.1 metres.', show: 'm1.2', focus: 'm1.2' },
        { say: 'A sphere has a surface area of 500 square centimetres. Find its radius. Here, 500 equals four pi r squared, so r squared is 500 over four pi, about 39.79.', show: ['q2', 'm2.0', 'm2.1'], focus: ['m2.0', 'm2.1'] },
        { say: 'This time r is squared, so take the square root: about 6.3 centimetres. Square, then square root. Cube, then cube root.', show: ['m2.2', 'tip'], focus: 'm2.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A sphere has a volume of $36\\pi\\text{ cm}^3$. What is its radius?',
          choices: ['$3\\text{ cm}$', '$5.2\\text{ cm}$', '$9\\text{ cm}$', '$27\\text{ cm}$'],
          answer: 0,
          working: '$36\\pi = \\tfrac43\\pi r^3$, so $r^3 = 36 \\times \\tfrac34 = 27$ and $r = \\sqrt[3]{27} = 3\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A sphere has a volume of 36 pi cubic centimetres. What is its radius? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 36 pi equals four thirds pi r cubed, so r cubed is 36 times three quarters, which is 27. The cube root of 27 is three centimetres. B takes a square root instead of a cube root.', show: 'q.answer' },
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
            'Sphere: $V = \\tfrac43\\pi r^3$, two thirds of the cylinder around it. Hemisphere: $\\tfrac23\\pi r^3$.',
            'For an unknown dimension, substitute what you know, then solve.',
            'Undo the power: a square root for $r^2$, a cube root for $r^3$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The volume of a sphere is four thirds pi r cubed, two thirds of the cylinder around it, and a hemisphere is two thirds pi r cubed.", show: 'sum.0' },
        { say: 'To find an unknown dimension, substitute what you know into the formula, then solve.', show: 'sum.1' },
        { say: 'And undo the power: a square root for r squared, and a cube root for r cubed. In part two, we put solids together into composite objects. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
