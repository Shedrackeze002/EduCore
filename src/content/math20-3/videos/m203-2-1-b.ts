import type { Explainer } from '@/video/script.ts';
import { figure, triangularPrism, triangularPrismNet } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-1-b',
  lessonId: 'm203-2-1',
  title: 'Surface Area, Part 2: Triangular Prisms',
  thumbnailTitle: 'Surface Area of a Tent',
  thumbnail: 'tent',
  summary: 'The net of a triangular prism (two triangles and three rectangles), the 152 ft² of fabric in an A-frame tent with a floor, why the sloped rectangles use the sloped side and not the height, and finding a missing sloped side with the Pythagorean theorem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.1 · Part 2', title: 'Triangular Prisms', subtitle: 'Tents, wedges and ramps' }],
      lines: [
        { say: 'Tents, wedges, ramps and many gift boxes are triangular prisms. They have two triangular ends joined by three rectangles.', show: 'title' },
        { say: 'In this video, you will find how much fabric covers a tent, and avoid the most common slip with triangles.' },
      ],
    },
    {
      chapter: 'A tent with a floor',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tent', [triangularPrism({ b: 6, t: 4, l: 8, labels: { b: '6\\text{ ft}', t: '4\\text{ ft}', l: '8\\text{ ft}' } })])],
      right: [{ kind: 'text', id: 'q', size: 'md', md: 'Each triangular end has a base of $6$ ft, a height of $4$ ft and two sloped sides of $5$ ft. The tent is $8$ ft long. How much fabric covers all five faces?' }],
      lines: [
        { say: 'An A-frame tent has a sewn-in floor, so it is a closed triangular prism.', show: 'tent.shape' },
        { say: 'Each triangular end has a base of six feet, a height of four feet, and two sloped sides of five feet. The tent is eight feet long. How much fabric covers all five faces?', show: ['tent.b', 'tent.t', 'tent.t-mark', 'tent.l', 'q'] },
      ],
    },
    {
      chapter: 'Its net',
      layout: 'split',
      leftWidth: 600,
      left: [figure('net', [triangularPrismNet({ a: 5, b: 6, c: 5, l: 8, labels: { a: '5', b: '6', c: '5', l: '8' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{ends: } 2 \\times \\tfrac12 \\times 6 \\times 4 = 24', '\\text{floor: } 6 \\times 8 = 48', '\\text{sloped sides: } 2 \\times 5 \\times 8 = 80', 'SA = 24 + 48 + 80 = 152 \\text{ ft}^2'] }],
      lines: [
        { say: 'Unfold the tent. The three rectangles are each eight feet long. Their widths are the sides of the triangle: five, six, and five.', show: ['net.strip', 'net.a', 'net.b', 'net.c', 'net.l'] },
        { say: 'The two triangular ends: two times one half, times six, times four. That is twenty-four square feet.', show: ['net.bases', 'm.0'], focus: ['net.bases', 'm.0'] },
        { say: 'The floor is six by eight, forty-eight square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'The two sloped sides are each five by eight: eighty square feet together. So the tent needs 152 square feet of fabric.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Height or sloped side?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the height for the sloped sides', md: 'Each sloped rectangle is as wide as the **sloped side** of the triangle ($5$ ft), not the height ($4$ ft). The height is used only for the area of the triangles.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['s^2 = 3^2 + 4^2 = 25', 's = 5 \\text{ ft}'] },
      ],
      lines: [
        { say: 'A common mistake is to use the height of the triangle for the sloped rectangles. Each sloped rectangle is as wide as the sloped side, five feet. The height, four feet, is used only for the area of the triangles.', show: 'oops' },
        { say: 'What if the sloped side is not given? The height splits the triangle into two right triangles, with legs of three and four. By the Pythagorean theorem, s squared is nine plus sixteen, twenty-five.', show: 'm.0', focus: 'm.0' },
        { say: 'So the sloped side is five feet.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed wedge is a triangular prism $10$ cm long. Its ends are right triangles with legs $6$ cm and $8$ cm and hypotenuse $10$ cm. What is its surface area?',
          choices: ['$288\\ \\text{cm}^2$', '$240\\ \\text{cm}^2$', '$336\\ \\text{cm}^2$', '$264\\ \\text{cm}^2$'],
          answer: 0,
          working: 'Ends: $2 \\times \\tfrac12 \\times 6 \\times 8 = 48$. Rectangles: $(6 + 8 + 10) \\times 10 = 240$. $48 + 240 = 288\\ \\text{cm}^2$. B forgets the ends.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed wedge is a triangular prism ten centimetres long. Its ends are right triangles with legs of six and eight centimetres, and a hypotenuse of ten. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The two ends are forty-eight square centimetres. The three rectangles are six plus eight plus ten, times ten: 240. Together, 288. B forgets the ends.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A triangular prism: two triangles and three rectangles.', 'Each rectangle is one side of the triangle times the length.', 'Use the height for the triangles, and the sloped side for the rectangles.'] }],
      lines: [
        { say: 'Let’s sum up. A triangular prism unfolds into two triangles and three rectangles.', show: 'sum.0' },
        { say: 'Each rectangle is one side of the triangle, times the length of the prism.', show: 'sum.1' },
        { say: 'And use the height for the triangles, but the sloped side for the rectangles. In part three, we find the surface area of cylinders. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
