import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/**
 * A garage 24 ft wide with its peak centred 6 ft above the walls, and a rafter that runs 1.5 ft
 * past the left wall: O is 1.5 ft beyond the wall top L, along the line from the peak.
 */
const garage: Part = {
  points: { L: [0, 0], R: [24, 0], M: [12, 0], T: [12, 6], O: [-1.342, -0.671], G1: [0, -6], G2: [24, -6] },
  items: [
    { kind: 'line', id: 'wall1', from: 'G1', to: 'L', tone: 'muted', group: 'house' },
    { kind: 'line', id: 'wall2', from: 'G2', to: 'R', tone: 'muted', group: 'house' },
    { kind: 'line', id: 'roof2', from: 'T', to: 'R', tone: 'muted', group: 'house' },
    { kind: 'line', id: 'span', from: 'G1', to: 'G2', tone: 'muted', label: '24\\text{ ft}', labelSide: 'right', group: 'house' },
    { kind: 'line', id: 'run', from: 'L', to: 'M', tone: 'adj', dashed: true, label: '12\\text{ ft}', labelSide: 'left' },
    { kind: 'line', id: 'rise', from: 'M', to: 'T', tone: 'opp', dashed: true, label: '6\\text{ ft}', labelSide: 'right' },
    { kind: 'right', id: 'right', at: 'M', from: 'L', to: 'T' },
    { kind: 'line', id: 'rafter', from: 'L', to: 'T', tone: 'hyp', weight: 6 },
    { kind: 'line', id: 'over', from: 'L', to: 'O', tone: 'theta', weight: 6, label: '1.5\\text{ ft}', labelSide: 'right' },
  ],
};

const video: Explainer = {
  id: 'm103-7-2-b',
  lessonId: 'm103-7-2',
  title: 'Pythagorean Problems, Part 2: Diagonals and Two-Step Problems',
  thumbnailTitle: 'Diagonals on the Job',
  thumbnail: 'tv',
  summary: 'Diagonals as hypotenuses: the size of a TV screen and checking a concrete form, putting every length in the same unit, and two-step problems: a shortcut across a field and a rafter with an overhang.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.2 · Part 2', title: 'Diagonals and Two-Step Problems', subtitle: 'Screens, slabs, fields and roofs' }],
      lines: [
        { say: 'A fifty-five-inch TV is not 55 inches wide. That number is the length of its diagonal.', show: 'title' },
        { say: 'In this video, you will find diagonals, and solve problems that need one more step after the Pythagorean theorem.' },
      ],
    },
    {
      chapter: 'Diagonals',
      layout: 'split',
      leftWidth: 500,
      left: [figure('tv', [rectangle({ w: 48, h: 27, labels: { w: '48\\text{ in}', h: '27\\text{ in}', d: 'd' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Diagonal', md: 'A line joining opposite corners of a rectangle. It splits the rectangle into two right triangles, so it is a **hypotenuse**.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['d^2 = 48^2 + 27^2 = 2304 + 729', 'd = \\sqrt{3033} \\approx 55\\text{ in}'] },
      ],
      lines: [
        { say: 'A diagonal joins two opposite corners of a rectangle. It splits the rectangle into two right triangles, so the diagonal is a hypotenuse.', show: ['tv.shape', 'tv.d', 'tv.right', 'def'], focus: 'tv.d' },
        { say: 'TVs are sold by the length of the screen’s diagonal. This screen is 48 inches wide and 27 inches tall. 48 squared plus 27 squared is 2,304 plus 729.', show: 'm.0', focus: 'm.0' },
        { say: 'That is 3,033, and its square root is about 55.07. So it is a 55-inch TV.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Slabs and units',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['d^2 = 6^2 + 4.5^2 = 36 + 20.25 = 56.25', 'd = \\sqrt{56.25} = 7.5\\text{ m}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'A ramp that rises $24\\text{ in}$ over a run of $24\\text{ ft}$: change $24\\text{ in}$ to $2\\text{ ft}$ first. $\\sqrt{24^2 + 2^2} = \\sqrt{580} \\approx 24.08\\text{ ft}$.' },
      ],
      lines: [
        { say: 'Concrete crews measure both diagonals of a form. If the two diagonals are equal, the form is a true rectangle. A form six metres long and 4.5 metres wide gives 36 plus 20.25: 56.25.', show: 'm.0', focus: 'm.0' },
        { say: 'Its square root is exactly 7.5, so each diagonal should measure 7.5 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'All three sides must be in the same unit. A wheelchair ramp rises 24 inches over a run of 24 feet. Change 24 inches to two feet first. The sloped length is the square root of 580: about 24.08 feet.', show: 'oops' },
      ],
    },
    {
      chapter: 'A shortcut',
      layout: 'split',
      leftWidth: 480,
      left: [figure('field', [rectangle({ w: 12, h: 5, labels: { w: '120\\text{ m}', h: '50\\text{ m}', d: 'd' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['120 + 50 = 170\\text{ m}', 'd = \\sqrt{14\\,400 + 2500} = 130\\text{ m}', '170 - 130 = 40\\text{ m}'] }],
      lines: [
        { say: 'Some jobs need one more step. A farmer can drive across a field diagonally, instead of along two fence lines. The field is 120 metres long and fifty metres wide.', show: ['field.shape', 'field.right'] },
        { say: 'Along the fence lines, the trip is 120 plus fifty: 170 metres.', show: 'm.0', focus: ['m.0', 'field.w', 'field.h'] },
        { say: 'The diagonal is the square root of 14,400 plus 2,500, which is the square root of 16,900: 130 metres.', show: ['field.d', 'm.1'], focus: ['field.d', 'm.1'] },
        { say: 'So the diagonal route is 170 minus 130: forty metres shorter.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A rafter with an overhang',
      layout: 'split',
      leftWidth: 600,
      left: [figure('g', [garage])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{run} = 24 \\div 2 = 12\\text{ ft}', '\\sqrt{12^2 + 6^2} = \\sqrt{180} \\approx 13.42', '13.42 + 1.5 \\approx 14.9\\text{ ft}'] }],
      lines: [
        { say: 'A garage is 24 feet wide. The peak is centred, six feet above the walls, and each rafter runs 1.5 feet past the wall for the overhang.', show: ['g.house', 'g.rafter', 'g.over'] },
        { say: 'The peak is centred, so the run is half the width: twelve feet.', show: ['g.run', 'm.0'], focus: ['g.run', 'm.0'] },
        { say: 'With a rise of six feet, the rafter from the wall to the peak is the square root of 180: about 13.42 feet.', show: ['g.rise', 'g.right', 'm.1'], focus: ['g.rafter', 'm.1'] },
        { say: 'Add the overhang: 13.42 plus 1.5 is about 14.9 feet.', show: 'm.2', focus: ['g.over', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A TV screen is $32\\text{ in}$ wide and $18\\text{ in}$ tall. What size is it, to the nearest inch?',
          choices: ['$37\\text{ in}$', '$50\\text{ in}$', '$26\\text{ in}$', '$32\\text{ in}$'],
          answer: 0,
          working: '$d^2 = 32^2 + 18^2 = 1024 + 324 = 1348$, so $d = \\sqrt{1348} \\approx 36.7$, or $37\\text{ in}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A TV screen is 32 inches wide and eighteen inches tall. What size is it, to the nearest inch? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1,024 plus 324 is 1,348, and its square root is about 36.7: a 37-inch TV. B adds the width and the height, and C subtracts the squares.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A diagonal of a rectangle is a hypotenuse.', 'Put every length in the same unit first.', 'Two-step problems: find the missing side, then add, subtract or compare.'] }],
      lines: [
        { say: 'Let’s sum up. The diagonal of a rectangle is the hypotenuse of a right triangle.', show: 'sum.0' },
        { say: 'Put every length in the same unit before you use the formula.', show: 'sum.1' },
        { say: 'And for two-step problems, find the missing side first, then add, subtract or compare. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
