import type { Explainer } from '@/video/script.ts';
import { figure, squarePyramid, squarePyramidNet } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-6',
  lessonId: 'm10c-1-6',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 1: Slant Height and Pyramids',
  thumbnailTitle: 'Slant Height and Pyramids',
  thumbnail: 'pyr',
  summary: 'The difference between the height and the slant height of a pyramid, finding one from the other with the Pythagorean theorem, and the surface area of a right square pyramid, SA = b² + 2bs. Part 2 covers cones and spheres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.6 · Part 1', title: 'Slant Height and Pyramids', subtitle: 'The height of the faces' }],
      lines: [
        { say: 'Pyramids and cones come to a point, called the apex. To find their surface area, you need a new measurement: the slant height.', show: 'title' },
        { say: 'In this video, we find slant heights, and the surface area of pyramids. In part two, we cover cones and spheres.' },
      ],
    },
    {
      chapter: 'Height and slant height',
      layout: 'split',
      left: [figure('pyr', [squarePyramid({ b: 10, h: 12, labels: { b: '10\\text{ m}', h: 'h', s: 's', half: '5' } })])],
      right: [
        { kind: 'callout', id: 'h', tone: 'definition', title: 'Height', md: 'From the apex **straight down** to the centre of the base.' },
        { kind: 'callout', id: 's', tone: 'definition', title: 'Slant height', md: 'From the apex **down the middle of a face** to the edge of the base.' },
      ],
      lines: [
        { say: 'This is a right square pyramid: a square base, with four matching triangles that meet at the apex.', show: ['pyr.shape', 'pyr.b'] },
        { say: 'Its height, h, goes from the apex straight down to the centre of the base. It is inside the pyramid.', show: ['pyr.h', 'h'], focus: 'pyr.h' },
        { say: 'Its slant height, s, goes from the apex down the middle of a face to the edge of the base. It is the height of each triangular face.', show: ['pyr.s', 's'], focus: 'pyr.s' },
      ],
    },
    {
      chapter: 'Finding a slant height',
      layout: 'split',
      left: [figure('pyr', [squarePyramid({ b: 10, h: 12, labels: { h: '12', s: 's', half: '5' } })])],
      right: [
        { kind: 'math', id: 'm', lines: ['s^2 = 12^2 + 5^2', '= 144 + 25 = 169', 's = \\sqrt{169} = 13\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Height is not slant height', md: 'The slant height is the hypotenuse, so it is always **longer** than the height.' },
      ],
      lines: [
        { say: 'The height, half the base, and the slant height form a right triangle inside the pyramid.', show: ['pyr.shape', 'pyr.h', 'pyr.half', 'pyr.half-mark', 'pyr.s'], focus: ['pyr.h', 'pyr.half', 'pyr.s'] },
        { say: 'The height is twelve metres, and half the base is five. The slant height is the hypotenuse, so s squared equals twelve squared plus five squared.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 144 plus 25, which is 169.', show: 'm.1', focus: 'm.1' },
        { say: 'So s is the square root of 169: thirteen metres.', show: 'm.2', focus: ['m.2', 'pyr.s'] },
        { say: 'Do not mix them up. The slant height is the hypotenuse, so it is always longer than the height.', show: 'oops' },
      ],
    },
    {
      chapter: 'Surface area of a pyramid',
      layout: 'split',
      leftWidth: 600,
      left: [figure('net', [squarePyramidNet({ b: 10, s: 13, labels: { s: '13' }, areas: { base: '10 \\times 10' } })])],
      right: [
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10^2 = 100', '4 \\times \\tfrac12(10)(13) = 260', 'SA = 100 + 260 = 360\\text{ m}^2'] },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Square pyramid', md: '$SA = b^2 + 4\\left(\\tfrac12 bs\\right) = b^2 + 2bs$' },
      ],
      lines: [
        { say: 'Unfold the pyramid. Its net is the square base, with a triangle on each side.', show: ['net.base', 'net.sides'] },
        { say: 'The base is ten by ten, which is 100 square metres.', show: ['net.sq-area', 'm.0'], focus: ['net.base', 'm.0'] },
        { say: 'Each triangle has base ten and height thirteen, the slant height. So the four triangles are four times one half times ten times thirteen, which is 260.', show: ['net.s', 'm.1'], focus: ['net.sides', 'm.1'] },
        { say: 'Altogether, 360 square metres. In general, b squared plus two b s.', show: ['m.2', 'rule'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Given the height',
      layout: 'split',
      left: [figure('pyr', [squarePyramid({ b: 16, h: 15, labels: { b: '16\\text{ ft}', h: '15', s: 's', half: '8' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A square pyramid has base $16\\text{ ft}$ and **height** $15\\text{ ft}$. Find its surface area.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['s = \\sqrt{15^2 + 8^2} = \\sqrt{289} = 17\\text{ ft}', 'SA = 16^2 + 2(16)(17)', '= 256 + 544 = 800\\text{ ft}^2'] },
      ],
      lines: [
        { say: 'A square pyramid has a base of sixteen feet and a height of fifteen feet. Find its surface area.', show: ['pyr.shape', 'pyr.b', 'pyr.h', 'q'] },
        { say: 'We are given the height, but the triangles need the slant height. Half the base is eight, so s is the square root of fifteen squared plus eight squared: the square root of 289, which is seventeen.', show: ['pyr.half', 'pyr.half-mark', 'pyr.s', 'm.0'], focus: ['m.0', 'pyr.s'] },
        { say: 'Now use the formula: sixteen squared, plus two times sixteen times seventeen,', show: 'm.1', focus: 'm.1' },
        { say: 'which is 256 plus 544: 800 square feet.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square pyramid has a base of $6\\text{ cm}$ and a height of $4\\text{ cm}$. What is its slant height?',
          choices: ['$5\\text{ cm}$', '$7.2\\text{ cm}$', '$4\\text{ cm}$', '$2.6\\text{ cm}$'],
          answer: 0,
          working: 'Half the base is $3$, so $s = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A square pyramid has a base of six centimetres and a height of four centimetres. What is its slant height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Half the base is three, so s is the square root of four squared plus three squared: the square root of 25, which is five centimetres. B uses the whole base instead of half.', show: 'q.answer' },
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
            'Height: straight down from the apex. Slant height: down the middle of a face.',
            'Height, half the base and slant height make a right triangle: $s^2 = h^2 + \\left(\\tfrac{b}{2}\\right)^2$.',
            'Square pyramid: $SA = b^2 + 2bs$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. The height goes straight down from the apex; the slant height goes down the middle of a face.", show: 'sum.0' },
        { say: 'The height, half the base and the slant height make a right triangle, so you can find one from the others with the Pythagorean theorem.', show: 'sum.1' },
        { say: 'And the surface area of a square pyramid is b squared plus two b s. In part two, we find the surface area of cones and spheres. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
