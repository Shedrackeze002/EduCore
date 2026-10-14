import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { squaresOnSides, triangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm103-7-1',
  lessonId: 'm103-7-1',
  title: 'The Pythagorean Theorem, Part 1: Finding the Hypotenuse',
  thumbnailTitle: 'The Pythagorean Theorem',
  thumbnail: 'sq',
  summary: 'The legs and hypotenuse of a right triangle, the squares on the sides of a 3-4-5 triangle, the Pythagorean theorem a² + b² = c², and finding the hypotenuse, rounding at the end and checking that the answer makes sense. Part 2 finds a leg and tests for a right angle.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.1 · Part 1', title: 'The Pythagorean Theorem', subtitle: 'Finding the hypotenuse' }],
      lines: [
        { say: 'A carpenter squaring a deck frame, a roofer cutting a rafter, and an electrician running conduit all use the same rule about right triangles. It is more than 2,500 years old.', show: 'title' },
        { say: 'In this video, you will name the sides of a right triangle, and use the Pythagorean theorem to find the longest side.' },
      ],
    },
    {
      chapter: 'Legs and hypotenuse',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('t', [
          triangle({ name: 'one', A: [0, 0], B: [4, 0], C: [0, 3], right: 'A', sides: { AB: '\\text{leg}', CA: '\\text{leg}', BC: '\\text{hypotenuse}' }, tones: { AB: 'adj', CA: 'opp', BC: 'hyp' } }),
          triangle({ name: 'two', A: [7, 1.732], B: [10, 0], C: [6, 0], right: 'A', sides: { BC: '\\text{hypotenuse}' }, tones: { BC: 'hyp' } }),
        ]),
      ],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Hypotenuse', md: 'The side across from the right angle. It is always the **longest** side. The other two sides are the **legs**.' },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Not always the slanted side', md: 'Find the right-angle box, then look straight across from it.' },
      ],
      lines: [
        { say: 'A right triangle has one ninety-degree angle, shown by a small square in the corner. The two sides that meet at the right angle are the legs.', show: ['t.one-shape'], focus: ['t.one-AB', 't.one-CA'] },
        { say: 'The side across from the right angle is the hypotenuse. It is always the longest side of a right triangle.', show: 'def', focus: 't.one-BC' },
        { say: 'A triangle can be turned any way, so do not look for the slanted side. Find the right-angle box, then look straight across from it. Here, the hypotenuse is along the bottom.', show: ['t.two-shape', 'oops'], focus: 't.two-BC' },
      ],
    },
    {
      chapter: 'Squares on the sides',
      layout: 'split',
      leftWidth: 520,
      left: [figure('sq', [squaresOnSides({ a: 3, b: 4, areas: { a: '9', b: '16', c: '25' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3^2 + 4^2 = 9 + 16 = 25 = 5^2', 'a^2 + b^2 = c^2'] }],
      lines: [
        { say: 'Draw a square on each side of a right triangle with sides of three, four and five.', show: 'sq.tri' },
        { say: 'The square on the leg of three has an area of nine. The square on the leg of four has an area of sixteen.', show: ['sq.sq-a', 'sq.sq-b'], focus: ['sq.sq-a', 'sq.sq-b'] },
        { say: 'Together, nine plus sixteen is 25: exactly the area of the square on the hypotenuse.', show: ['sq.sq-c', 'm.0'], focus: ['sq.sq-c', 'm.0'] },
        { say: 'This is the Pythagorean theorem. In a right triangle with legs "a" and b, and hypotenuse c, "a" squared plus b squared equals c squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the hypotenuse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['c^2 = 6^2 + 8^2 = 36 + 64 = 100', 'c = \\sqrt{100} = 10\\text{ cm}', 'c^2 = 5^2 + 9^2 = 25 + 81 = 106', 'c = \\sqrt{106} \\approx 10.3\\text{ m}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'The hypotenuse is longer than either leg, but shorter than the two legs added: $9 < 10.3 < 14$.' },
      ],
      lines: [
        { say: 'A right triangle has legs of six and eight centimetres. Square the legs and add: 36 plus 64 is 100.', show: 'm.0', focus: 'm.0' },
        { say: 'Then take the square root: the hypotenuse is ten centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Most answers are not whole numbers. Legs of five and nine metres give 25 plus 81: 106.', show: 'm.2', focus: 'm.2' },
        { say: 'The square root of 106 is about 10.296. Round only at the end: about 10.3 metres.', show: 'm.3', focus: 'm.3' },
        { say: 'Does it make sense? The hypotenuse must be longer than either leg, but shorter than the two legs added together. 10.3 is more than nine, and less than fourteen.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A right triangle has legs of $9\\text{ cm}$ and $12\\text{ cm}$. How long is the hypotenuse?',
          choices: ['$15\\text{ cm}$', '$21\\text{ cm}$', '$225\\text{ cm}$', '$7.9\\text{ cm}$'],
          answer: 0,
          working: '$c^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $c = \\sqrt{225} = 15\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A right triangle has legs of nine and twelve centimetres. How long is the hypotenuse? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 81 plus 144 is 225, and its square root is fifteen centimetres. B adds the legs, and C forgets the square root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The hypotenuse is across from the right angle, and is the longest side.', 'Pythagorean theorem: $a^2 + b^2 = c^2$.', 'Hypotenuse: square the legs, add, take the square root. Round at the end.'] }],
      lines: [
        { say: 'Let’s sum up. The hypotenuse is across from the right angle, and it is always the longest side.', show: 'sum.0' },
        { say: 'The Pythagorean theorem: "a" squared plus b squared equals c squared.', show: 'sum.1' },
        { say: 'To find the hypotenuse, square the legs, add, and take the square root, rounding at the end. In part two, we find a leg, and test for a right angle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
