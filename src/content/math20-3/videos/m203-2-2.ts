import type { Explainer } from '@/video/script.ts';
import { figure, squarePyramid, squarePyramidNet } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-2',
  lessonId: 'm203-2-2',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 1: Pyramids',
  thumbnailTitle: 'Surface Area of a Pyramid',
  thumbnail: 'net',
  summary: 'Pyramids and slant height, the net of a square pyramid, SA = b² + 2bs, a glass paperweight with a 10 cm base and 13 cm slant height (360 cm²), and leaving out the base for a roof.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.2 · Part 1', title: 'Surface Area of a Pyramid', subtitle: 'The slant height' }],
      lines: [
        { say: 'A gazebo roof is a pyramid, a grain-bin roof is a cone, and a water tower may be a sphere. These shapes come to a point, or curve all the way around, so you need one new measurement: the slant height.', show: 'title' },
        { say: 'In this video, you will find the surface area of a square pyramid.' },
      ],
    },
    {
      chapter: 'Pyramids and slant height',
      layout: 'split',
      leftWidth: 520,
      left: [figure('py', [squarePyramid({ b: 5, h: 5, labels: { b: 'b', s: 's' } })], 380)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Pyramid and slant height', md: 'A **pyramid** has a polygon base and triangular faces that meet at a point, the **apex**. The **slant height** $s$ is the height of one triangular face, from the middle of a base edge straight up the face to the apex.' }],
      lines: [
        { say: 'A pyramid has a polygon base, and triangular faces that meet at a point called the apex.', show: ['py.shape', 'def'] },
        { say: 'The slant height, s, is the height of one triangular face. It runs from the middle of a base edge, straight up the face, to the apex.', show: ['py.s', 'py.b'], focus: 'py.s' },
      ],
    },
    {
      chapter: 'The net of a square pyramid',
      layout: 'split',
      leftWidth: 600,
      left: [figure('net', [squarePyramidNet({ b: 4, s: 5, labels: { b: 'b', s: 's' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{base: } b^2', '\\text{four triangles: } 4 \\times \\tfrac12 b s = 2bs', 'SA = b^2 + 2bs'] }],
      lines: [
        { say: 'Unfold a square pyramid, and you get a square base, with a triangle on each side. The base has an area of b squared.', show: ['net.base', 'net.b', 'm.0'], focus: ['net.base', 'm.0'] },
        { say: 'Each triangle has a base of b and a height of s, so its area is one half b s. Four of them make two b s.', show: ['net.sides', 'net.s', 'm.1'], focus: ['net.sides', 'm.1'] },
        { say: 'So the surface area of a square pyramid is b squared, plus two b s.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A glass paperweight',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{base: } 10 \\times 10 = 100', '\\text{triangles: } 4 \\times \\tfrac12 \\times 10 \\times 13 = 260', 'SA = 100 + 260 = 360 \\text{ cm}^2'] }],
      lines: [
        { say: 'A solid glass paperweight is a square pyramid, with a base side of ten centimetres and a slant height of thirteen centimetres. Find its surface area. The base is ten by ten, 100 square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The four triangles: four times one half, times ten, times thirteen. That is 260 square centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them: 360 square centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Roofs leave out the base',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Roofs and rectangular pyramids', md: 'For a **roof**, leave out the base: only the triangles are covered. A **rectangular** pyramid has two pairs of matching triangles, and each pair has its own slant height.' }],
      lines: [
        { say: 'Think about the job. For a roof, leave out the base: only the triangles get shingles.', show: 'tip' },
        { say: 'And if the base is a rectangle, not a square, the triangles come in two different pairs. Each pair has its own slant height, so find each pair’s area separately.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A gazebo roof is a square pyramid with a base side of $12$ ft and a slant height of $10$ ft. How much roofing covers the four faces?',
          choices: ['$240\\ \\text{ft}^2$', '$384\\ \\text{ft}^2$', '$480\\ \\text{ft}^2$', '$120\\ \\text{ft}^2$'],
          answer: 0,
          working: 'A roof has no base: $4 \\times \\tfrac12 \\times 12 \\times 10 = 240\\ \\text{ft}^2$. B adds the base, and C forgets the one half.',
        },
      ],
      lines: [
        { say: 'Your turn. A gazebo roof is a square pyramid, with a base side of twelve feet and a slant height of ten feet. How much roofing covers the four faces? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. A roof has no base, so only the triangles: four times one half, times twelve, times ten, is 240 square feet. B adds the base, and C forgets the one half.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The slant height $s$ runs up the middle of a face.', 'Square pyramid: $SA = b^2 + 2bs$.', 'Leave out the base for a roof.'] }],
      lines: [
        { say: 'Let’s sum up. The slant height runs up the middle of a face, from a base edge to the apex.', show: 'sum.0' },
        { say: 'A square pyramid has a surface area of b squared, plus two b s.', show: 'sum.1' },
        { say: 'And leave out the base for a roof. In part two, we find the surface area of cones. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
