import type { Explainer } from '@/video/script.ts';
import { plane, polyline } from '@/video/graph.ts';
import { figure } from '@/video/solids.ts';

const g = plane({ x: [0, 10], y: [0, 8], every: 0 });

const video: Explainer = {
  id: 'm103-5-2',
  lessonId: 'm103-5-2',
  title: 'Composite and Irregular Areas, Part 1: Composite Shapes',
  thumbnailTitle: 'Composite Areas',
  thumbnail: 'floor',
  summary: 'Finding the area of a composite shape by splitting it into pieces that do not overlap and adding, or by subtracting a missing part such as a window, a hole or a notch. Part 2 estimates irregular areas on a grid.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.2 · Part 1', title: 'Composite Shapes', subtitle: 'Add the pieces, or take away the gaps' }],
      lines: [
        { say: 'Real floors, yards and walls are rarely perfect rectangles. A basement can be L-shaped, and a wall has a window cut into it.', show: 'title' },
        { say: 'In this video, you will break awkward shapes into pieces you already know how to measure. In part two, you will estimate shapes with no straight edges.' },
      ],
    },
    {
      chapter: 'Adding the pieces',
      layout: 'split',
      leftWidth: 520,
      left: [
        figure('floor', [
          g,
          polyline(g, { id: 'walls', points: [[1, 1], [9, 1], [9, 4], [5, 4], [5, 7], [1, 7], [1, 1]], labels: ['8\\text{ m}', '3\\text{ m}', '', '', '4\\text{ m}', '6\\text{ m}'], sides: ['right', 'right', 'right', 'right', 'right', 'right'] }),
          polyline(g, { id: 'split', points: [[5, 1], [5, 4]], tone: 'opp', dashed: true }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Composite shape', md: 'Two or more common shapes, such as rectangles, triangles and circles, joined together.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 \\times 6 = 24\\text{ m}^2', '(8 - 4) \\times 3 = 12\\text{ m}^2', '24 + 12 = 36\\text{ m}^2'] },
      ],
      lines: [
        { say: 'A composite shape is made of two or more common shapes joined together. To find its area, split it into simple pieces that do not overlap, find each area, then add.', show: ['def', 'floor.grid', 'floor.walls'] },
        { say: 'This L-shaped kitchen floor is eight metres along the bottom and six up the left side. Split it with the dashed line. The left rectangle is four by six: 24 square metres.', show: ['floor.split', 'm.0'], focus: ['floor.split', 'm.0'] },
        { say: 'The right rectangle is eight minus four, which is four metres wide, and three tall: twelve square metres. A missing side is often the difference of two sides you know.', show: 'm.1', focus: 'm.1' },
        { say: 'Add the pieces: 36 square metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Subtracting a part',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{floor: } 8 \\times 6 - 4 \\times 3 = 48 - 12 = 36\\text{ m}^2', '\\text{wall: } 14 \\times 8 - 4 \\times 3 = 112 - 12 = 100\\text{ ft}^2', '\\text{plywood: } 4 \\times 8 - \\pi(1)^2 \\approx 32 - 3.14 \\approx 28.9\\text{ ft}^2'] },
      ],
      lines: [
        { say: 'Sometimes it is easier to start with a big shape, and take away the part that is not included. For the floor, the whole eight-by-six rectangle is 48 square metres, minus the missing three-by-four corner: 36 again.', show: 'm.0', focus: 'm.0' },
        { say: 'A wall is fourteen feet long and eight feet high, with a four-by-three-foot window. The paint area is 112 minus twelve: a hundred square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'A four-by-eight sheet of plywood has a round hole two feet across. The hole’s radius is one foot, so its area is about 3.14 square feet. About 28.9 square feet of plywood is left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Do not count twice',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting a piece twice', md: 'The pieces must not overlap. Draw your split line on the sketch before you calculate.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{arched window: } 36 \\times 48 + \\pi(18)^2 \\div 2', '\\approx 1728 + 508.9 \\approx 2236.9\\text{ in}^2'] },
      ],
      lines: [
        { say: 'When you split a shape, the pieces must not overlap. If two rectangles share a corner, that corner gets counted twice, and the area is too big. Draw your split line on the sketch first.', show: 'oops' },
        { say: 'A window with a semicircular top is a rectangle plus half a circle. It is 36 inches wide, with a rectangular part 48 inches tall, and the half circle has a radius of eighteen inches.', show: 'm.0', focus: 'm.0' },
        { say: 'So the area is 1,728 plus about 508.9: about 2,236.9 square inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A garage wall is $20\\text{ ft}$ by $9\\text{ ft}$, with a door $16\\text{ ft}$ by $7\\text{ ft}$. What area of wall is left to paint?',
          choices: ['$68\\text{ ft}^2$', '$292\\text{ ft}^2$', '$180\\text{ ft}^2$', '$6\\text{ ft}^2$'],
          answer: 0,
          working: '$20 \\times 9 - 16 \\times 7 = 180 - 112 = 68\\text{ ft}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A garage wall is twenty feet by nine feet, with a door sixteen feet by seven feet. What area of wall is left to paint? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The wall is 180 square feet, and the door is 112, so 68 square feet are left. B adds the door instead of subtracting it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Split a composite shape into pieces that do not overlap, and add.', 'Or start with a big shape and subtract the missing parts.', 'A missing side is often the difference of two known sides.'] }],
      lines: [
        { say: 'Let’s sum up. Split a composite shape into pieces that do not overlap, and add their areas.', show: 'sum.0' },
        { say: 'Or start with a big shape, and subtract the parts that are missing.', show: 'sum.1' },
        { say: 'And a missing side is often the difference of two sides you know. In part two, we estimate irregular areas. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
