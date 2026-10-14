import type { Explainer } from '@/video/script.ts';
import { cone, figure, squarePyramid } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-2-c',
  lessonId: 'm203-2-2',
  title: 'Surface Area of Pyramids, Cones and Spheres, Part 3: Height or Slant Height?',
  thumbnailTitle: 'Height or Slant Height?',
  thumbnail: 'fn',
  summary: 'Finding the slant height from the height with the Pythagorean theorem: a funnel 10 in across and 12 in high (s = 13 in, about 204 in²), a pyramid roof 6 m wide with its peak 2 m up (about 43.3 m²), and what goes wrong with the height.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.2 · Part 3', title: 'Height or Slant Height?', subtitle: 'The Pythagorean theorem to the rescue' }],
      lines: [
        { say: 'Plans often give the height of a cone or pyramid: the straight-up distance from the centre of the base to the apex. But the surface area formulas need the slant height.', show: 'title' },
        { say: 'In this video, you will find the slant height from the height, using the Pythagorean theorem.' },
      ],
    },
    {
      chapter: 'A right triangle inside',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{cone: } s = \\sqrt{h^2 + r^2}', '\\text{square pyramid: } s = \\sqrt{h^2 + \\left(\\tfrac{b}{2}\\right)^2}'] }],
      lines: [
        { say: 'The height goes straight down inside the shape. The slant height runs along a face, so it is longer. In a cone, the height, the radius, and the slant height form a right triangle, with the slant height as the hypotenuse. So s is the square root of h squared plus r squared.', show: 'm.0', focus: 'm.0' },
        { say: 'In a square pyramid, the leg along the base is half the base side, so s is the square root of h squared, plus b over two, squared.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A sheet-metal funnel',
      layout: 'split',
      leftWidth: 480,
      left: [figure('fn', [cone({ r: 5, h: 12, down: true, labels: { r: '5\\text{ in}', h: '12\\text{ in}', s: 's' } })], 420)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['r = 10 \\div 2 = 5 \\text{ in}', 's = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13', '\\pi r s = \\pi(5)(13) = 65\\pi', '\\approx 204 \\text{ in}^2'] }],
      lines: [
        { say: 'A funnel is a cone with no base. It has a diameter of ten inches, and a height of twelve inches. How much sheet metal makes it? The radius is five inches.', show: ['fn.shape', 'fn.r', 'fn.h', 'm.0'], focus: 'm.0' },
        { say: 'The slant height is the square root of twelve squared plus five squared: the square root of 169, which is thirteen inches.', show: ['fn.s', 'm.1'], focus: ['fn.s', 'm.1'] },
        { say: 'The curved side is pi times five times thirteen, sixty-five pi.', show: 'm.2', focus: 'm.2' },
        { say: 'That is about 204 square inches of sheet metal.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A pyramid roof',
      layout: 'split',
      leftWidth: 520,
      left: [figure('rf', [squarePyramid({ b: 6, h: 6, labels: { b: '6\\text{ m}', h: '2\\text{ m}', half: '3', s: 's' } })], 440)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['s = \\sqrt{2^2 + 3^2} = \\sqrt{13}', '\\approx 3.606 \\text{ m}', '4 \\times \\tfrac12 \\times 6 \\times \\sqrt{13} \\approx 43.3 \\text{ m}^2'] }],
      lines: [
        { say: 'The roof of a square pump house is a square pyramid with a base side of six metres. The peak is two metres above the base. How much roofing covers the four faces? Half the base is three metres.', show: ['rf.shape', 'rf.b', 'rf.h', 'rf.half'] },
        { say: 'The slant height is the square root of two squared plus three squared: root thirteen, about 3.606 metres. Keep root thirteen exact until the end.', show: ['rf.s', 'm.0', 'm.1'], focus: ['rf.s', 'm.0'] },
        { say: 'Four triangles: four times one half, times six, times root thirteen, about 43.3 square metres of roofing.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Height is not slant height',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Height is not slant height', md: 'Using the height $2$ in place of $s \\approx 3.606$ for the roof gives only $24\\ \\text{m}^2$, and the crew runs out of roofing. Check which one the plan gives.' }],
      lines: [
        { say: 'Using the height, two, in place of the slant height for that roof gives only twenty-four square metres, and the crew runs out of roofing. Check which one the plan gives, and use the Pythagorean theorem when you need s.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cone has a radius of $6$ cm and a height of $8$ cm. What is its slant height?',
          choices: ['$10$ cm', '$14$ cm', '$5.3$ cm', '$100$ cm'],
          answer: 0,
          working: '$s = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$ cm. B adds the lengths, and D forgets the square root.',
        },
      ],
      lines: [
        { say: 'Your turn. A cone has a radius of six centimetres and a height of eight. What is its slant height? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The square root of eight squared plus six squared is the square root of 100, which is ten centimetres. B just adds the lengths, and D forgets the square root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['The height goes inside; the slant height runs along a face.', 'Cone: $s = \\sqrt{h^2 + r^2}$.', 'Square pyramid: $s = \\sqrt{h^2 + (b/2)^2}$.'] }],
      lines: [
        { say: 'Let’s sum up. The height goes straight down inside; the slant height runs along a face.', show: 'sum.0' },
        { say: 'For a cone, s is the square root of h squared plus r squared.', show: 'sum.1' },
        { say: 'For a square pyramid, use half the base side instead of r. In part four, we cover spheres and hemispheres. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
