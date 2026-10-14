import type { Explainer } from '@/video/script.ts';
import { tiles } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm204-7-2',
  lessonId: 'm204-7-2',
  title: 'Area, Part 1: Area of a Rectangle',
  thumbnailTitle: 'Area of a Rectangle',
  thumbnail: 'tl',
  summary: 'Area as the surface a shape covers, in square units, a 4 m by 3 m rectangle covering 12 square metres, the formula A = l × w for a 4 m by 3.5 m bedroom (14 m²), and the difference between area and perimeter.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 7.2 · Part 1', title: 'Area of a Rectangle', subtitle: 'Square units' }],
      lines: [
        { say: 'How much carpet covers a floor? How much sod covers a lawn? How much pizza is in a large pizza? These questions are about area.', show: 'title' },
        { say: 'In this video, you will find the area of a rectangle, and tell area apart from perimeter.' },
      ],
    },
    {
      chapter: 'Square units',
      layout: 'split',
      leftWidth: 600,
      left: [figure('tl', [tiles({ cols: 4, rows: 3, size: 1, labels: { width: '4\\text{ m}', height: '3\\text{ m}', side: '1\\text{ m}' } })], 360)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Area', md: '**Area** is the amount of surface a shape covers. It is measured in square units, such as square metres (m²) or square feet (ft²).' }],
      lines: [
        { say: 'Area is the amount of surface a shape covers. It is measured in square units, such as square metres or square feet.', show: 'def' },
        { say: 'A square metre is a square that is one metre on each side.', show: ['tl.outline', 'tl.tile', 'tl.side'], focus: 'tl.tile' },
        { say: 'This rectangle is four metres long and three metres wide. It is covered by three rows of four squares: twelve squares. So its area is twelve square metres.', show: ['tl.grid', 'tl.width', 'tl.height'] },
        { say: 'Counting squares works for a small shape, but counting every square on a big floor would take a long time.' },
      ],
    },
    {
      chapter: 'A = l × w',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['A = l \\times w'] },
        { kind: 'text', id: 'q', md: 'A bedroom floor is $4$ m long and $3.5$ m wide.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = 4 \\times 3.5 = 14 \\text{ m}^2'] },
      ],
      lines: [
        { say: 'You do not need to count squares. Multiply the length by the width: A equals l times w. Three rows of four is three times four.', show: 'f', focus: 'f' },
        { say: 'A bedroom floor is four metres long and 3.5 metres wide. What is its area?', show: 'q' },
        { say: 'A equals four times 3.5, which is fourteen. The floor has an area of fourteen square metres. That is how much carpet covers it. Notice the units: metres times metres gives square metres.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'Area or perimeter?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing up area and perimeter', md: 'Perimeter goes **around** a shape, so you add the sides. Area **covers** a shape, so you multiply. Area is always in square units, like m².' }],
      lines: [
        { say: 'A common mistake is to mix up area and perimeter. Perimeter goes around a shape, so you add the sides. Area covers a shape, so you multiply.', show: 'oops' },
        { say: 'The units tell them apart. The bedroom’s perimeter is fifteen metres, a length. Its area is fourteen square metres, a surface. Baseboard needs the perimeter, and carpet needs the area.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A rectangular lawn is $5.5$ m long and $4$ m wide. What is its area?',
          choices: ['$22$ m²', '$19$ m', '$9.5$ m²', '$44$ m²'],
          answer: 0,
          working: '$A = 5.5 \\times 4 = 22$ m². B is the perimeter, and C adds the length and width.',
        },
      ],
      lines: [
        { say: 'Your turn. A rectangular lawn is 5.5 metres long and four metres wide. What is its area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 5.5 times four is 22 square metres. B is the perimeter, a length in metres, and C adds the length and the width.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Area is the surface a shape covers, in square units.', 'Rectangle: A = l × w.', 'Perimeter goes around; area covers.'] }],
      lines: [
        { say: 'Let’s sum up. Area is the surface a shape covers, measured in square units.', show: 'sum.0' },
        { say: 'The area of a rectangle is the length times the width.', show: 'sum.1' },
        { say: 'And perimeter goes around, while area covers. In part two, we find the area of a triangle. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
