import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const stall = outline({
  corners: [[0, 0], [5.5, 0], [7.5, 2.5], [2, 2.5]],
  guides: [{ id: 'h', from: [2, 2.5], to: [2, 0] }],
  labels: [
    { id: 'b', at: [2.75, -0.55], tex: 'b = 5.5\\text{ m}' },
    { id: 'hl', at: [2.15, 1.25], tex: 'h = 2.5\\text{ m}', place: 'right', tone: 'opp' },
    { id: 's', at: [0.55, 1.5], tex: '3.2\\text{ m}', place: 'left', tone: 'muted' },
  ],
});

const video: Explainer = {
  id: 'm204-7-2-c',
  lessonId: 'm204-7-2',
  title: 'Area, Part 3: Area of a Parallelogram',
  thumbnailTitle: 'Area of a Parallelogram',
  thumbnail: 'ps',
  summary: 'What a parallelogram is, why its area is A = b × h (a rectangle with a triangle moved), a parking stall with a 5.5 m base and 2.5 m height (13.75 m²), and why the slanted side is not the height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.2 · Part 3', title: 'Area of a Parallelogram', subtitle: 'A pushed-over rectangle' }],
      lines: [
        { say: 'Angled parking stalls, some tiles, and the sides of a ramp have a shape that looks like a rectangle that has been pushed over.', show: 'title' },
        { say: 'In this video, you will find the area of a parallelogram, and choose the right measurement for its height.' },
      ],
    },
    {
      chapter: 'A parallelogram',
      layout: 'split',
      leftWidth: 640,
      left: [figure('ps', [stall], 340)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Parallelogram', md: 'A **parallelogram** is a four-sided shape whose opposite sides are parallel. It looks like a rectangle that has been pushed over.' }],
      lines: [
        { say: 'A parallelogram is a four-sided shape whose opposite sides are parallel. It looks like a rectangle that has been pushed over.', show: ['ps.shape', 'def'] },
        { say: 'If you cut the triangle off one end and move it to the other end, you get a rectangle with the same base and the same height. Nothing is added or lost.' },
        { say: 'So the area of a parallelogram is the base times the height: A equals b times h.' },
      ],
    },
    {
      chapter: 'A parking stall',
      layout: 'split',
      leftWidth: 600,
      left: [figure('ps', [stall], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['A = b \\times h', 'A = 5.5 \\times 2.5', '= 13.75 \\text{ m}^2'] }],
      lines: [
        { say: 'A parking stall is a parallelogram with a base of 5.5 metres and a height of 2.5 metres. Its slanted sides are 3.2 metres long. What is its area?', show: ['ps.shape', 'ps.b', 'ps.h', 'ps.hl', 'ps.s'] },
        { say: 'Use A equals b times h.', show: 'm.0', focus: 'm.0' },
        { say: '5.5 times 2.5 is 13.75. The stall has an area of 13.75 square metres.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'The slanted side is not the height, so the 3.2 metres is not used. It is extra information. Real problems often give you more numbers than you need, so choose the ones that fit the formula.', focus: 'ps.s' },
      ],
    },
    {
      chapter: 'The slanted side',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the slanted side as the height', md: 'The height must meet the base at a square corner. A slanted side is longer than the height, so using it gives an area that is too big: $5.5 \\times 3.2 = 17.6$ m².' }],
      lines: [
        { say: 'A common mistake is to use the slanted side as the height. The height must meet the base at a square corner. A slanted side is longer than the height, so using it gives an area that is too big: 5.5 times 3.2 is 17.6 square metres.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A parallelogram has a base of $7$ m and a height of $4$ m. Its slanted sides are $5$ m long. What is its area?',
          choices: ['$28$ m²', '$35$ m²', '$14$ m²', '$140$ m²'],
          answer: 0,
          working: '$A = b \\times h = 7 \\times 4 = 28$ m². B uses the slanted side, C divides by $2$ like a triangle, and D multiplies all three numbers.',
        },
      ],
      lines: [
        { say: 'Your turn. A parallelogram has a base of seven metres and a height of four metres. Its slanted sides are five metres long. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Base times height is seven times four: 28 square metres. B uses the slanted side, C divides by two like a triangle, and D multiplies all three numbers.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A parallelogram is a pushed-over rectangle.', 'Parallelogram: A = b × h.', 'Use the height, not the slanted side.'] }],
      lines: [
        { say: 'Let’s sum up. A parallelogram is like a rectangle that has been pushed over.', show: 'sum.0' },
        { say: 'Its area is the base times the height.', show: 'sum.1' },
        { say: 'And use the height, which meets the base at a square corner, not the slanted side. In part four, we find the area of a circle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
