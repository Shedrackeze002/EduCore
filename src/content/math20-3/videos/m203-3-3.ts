import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-3',
  lessonId: 'm203-3-3',
  title: 'Volume on the Job, Part 1: Converting Cubic Units',
  thumbnailTitle: 'Converting Cubic Units',
  thumbnail: 'cube',
  summary: 'Why volume conversions cube the length factor (1 yd³ = 27 ft³, 1 ft³ = 1728 in³, 1 m³ = 1 000 000 cm³), the mistake of dividing by 3, and the concrete for a 20 ft by 12 ft patio slab 4 in thick (about 3.0 yd³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.3 · Part 1', title: 'Converting Cubic Units', subtitle: 'Cube the length factor' }],
      lines: [
        { say: 'Concrete is often ordered by the cubic yard, but a patio is measured in feet and inches. To order the right amount, you need to convert cubic units.', show: 'title' },
        { say: 'In this video, you will see why volume conversions cube the length factor, and order concrete for a patio.' },
      ],
    },
    {
      chapter: 'One cubic yard',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cy', [box({ l: 3, w: 3, h: 3, cells: 3, labels: { l: '3\\text{ ft}', w: '3\\text{ ft}', h: '3\\text{ ft}' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 \\text{ yd} = 3 \\text{ ft}', '1 \\text{ yd}^3 = 3 \\times 3 \\times 3 = 27 \\text{ ft}^3'] }],
      lines: [
        { say: 'Volume units are cubes. A cubic yard is a cube one yard on each side, and one yard is three feet.', show: ['cy.shape', 'cy.l', 'cy.w', 'cy.h', 'm.0'], focus: 'm.0' },
        { say: 'So a cubic yard is three feet long, three wide, and three high. It holds three layers of nine cubic feet: twenty-seven cubic feet.', show: ['cy.cells', 'm.1'], focus: ['cy.cells', 'm.1'] },
      ],
    },
    {
      chapter: 'Cube the factor',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Length', 'Volume'], rows: [['$1\\ \\text{yd} = 3\\ \\text{ft}$', '$1\\ \\text{yd}^3 = 3 \\times 3 \\times 3 = 27\\ \\text{ft}^3$'], ['$1\\ \\text{ft} = 12\\ \\text{in}$', '$1\\ \\text{ft}^3 = 12 \\times 12 \\times 12 = 1728\\ \\text{in}^3$'], ['$1\\ \\text{m} = 100\\ \\text{cm}$', '$1\\ \\text{m}^3 = 100 \\times 100 \\times 100 = 1\\,000\\,000\\ \\text{cm}^3$']] }],
      lines: [
        { say: 'Every length factor is cubed for volume. One cubic yard is twenty-seven cubic feet.', show: 't.0', focus: 't.0' },
        { say: 'One foot is twelve inches, so one cubic foot is twelve times twelve times twelve: 1,728 cubic inches.', show: 't.1', focus: 't.1' },
        { say: 'And one metre is 100 centimetres, so one cubic metre is a million cubic centimetres.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'Using the length factor',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the length factor for cubic units', md: '$81\\ \\text{ft}^3$ is **not** $81 \\div 3 = 27\\ \\text{yd}^3$. A cubic yard holds $27$ cubic feet, so $81\\ \\text{ft}^3 = 81 \\div 27 = 3\\ \\text{yd}^3$.' }],
      lines: [
        { say: 'A common mistake is to divide by three. Eighty-one cubic feet is not twenty-seven cubic yards. A cubic yard holds twenty-seven cubic feet, so eighty-one cubic feet is only three cubic yards. Ordering twenty-seven would bring nine times too much concrete.', show: 'oops' },
      ],
    },
    {
      chapter: 'Concrete for a patio',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['4 \\text{ in} = \\tfrac{4}{12} = \\tfrac13 \\text{ ft}', 'V = 20 \\times 12 \\times \\tfrac13 = 80 \\text{ ft}^3', '80 \\div 27 \\approx 2.96 \\approx 3.0 \\text{ yd}^3'] }],
      lines: [
        { say: 'A patio slab is twenty feet long, twelve feet wide, and four inches thick. How many cubic yards of concrete is that? First, put the thickness in feet: four inches is one third of a foot.', show: 'm.0', focus: 'm.0' },
        { say: 'The volume is twenty times twelve times one third: eighty cubic feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by twenty-seven to get cubic yards: about 2.96, or 3.0 cubic yards to the nearest tenth.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A trench needs $135\\ \\text{ft}^3$ of gravel. How many cubic yards is that?',
          choices: ['$5\\ \\text{yd}^3$', '$45\\ \\text{yd}^3$', '$15\\ \\text{yd}^3$', '$3645\\ \\text{yd}^3$'],
          answer: 0,
          working: 'Cubic yards are bigger, so divide by $27$: $135 \\div 27 = 5\\ \\text{yd}^3$. B divides by $3$, and C by $9$.',
        },
      ],
      lines: [
        { say: 'Your turn. A trench needs 135 cubic feet of gravel. How many cubic yards is that? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Cubic yards are bigger, so divide by twenty-seven: five cubic yards. B divides by three, the length factor, and C divides by nine, the factor for square yards. Only twenty-seven works for cubic yards.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Cube the length factor for volume.', '$1\\ \\text{yd}^3 = 27\\ \\text{ft}^3$; $1\\ \\text{ft}^3 = 1728\\ \\text{in}^3$; $1\\ \\text{m}^3 = 1\\,000\\,000\\ \\text{cm}^3$.', 'Put lengths in one unit, find the volume, then convert.'] }],
      lines: [
        { say: 'Let’s sum up. For volume, cube the length factor.', show: 'sum.0' },
        { say: 'One cubic yard is twenty-seven cubic feet, one cubic foot is 1,728 cubic inches, and one cubic metre is a million cubic centimetres.', show: 'sum.1' },
        { say: 'And put every length in one unit, find the volume, then convert. In part two, we plan concrete, water and fuel jobs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
