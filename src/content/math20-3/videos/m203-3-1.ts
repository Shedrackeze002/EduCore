import type { Explainer } from '@/video/script.ts';
import { box, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-1',
  lessonId: 'm203-3-1',
  title: 'Volume and Capacity, Part 1: Volume of a Prism',
  thumbnailTitle: 'Volume of a Prism',
  thumbnail: 'cube',
  summary: 'Volume as the number of unit cubes that fill an object, why V = (area of the base) × h for every prism, a 3 by 3 by 3 cube built in layers, and a storage crate 4 ft by 3 ft by 2.5 ft (30 ft³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.1 · Part 1', title: 'Volume of a Prism', subtitle: 'Layers of cubes' }],
      lines: [
        { say: 'A ready-mix driver needs to know how many cubic metres of concrete to bring, and a rancher needs to know how many litres a water tank holds. Both questions are about volume.', show: 'title' },
        { say: 'In this video, you will see where the volume formula for a prism comes from, and use it.' },
      ],
    },
    {
      chapter: 'What volume measures',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cu', [box({ l: 3, w: 3, h: 3, cells: 3 })], 360)],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Volume', md: '**Volume** is the amount of space a 3-D object takes up. It is measured in cubic units, such as $\\text{cm}^3$, $\\text{m}^3$ or $\\text{ft}^3$: the number of unit cubes that would fill the object.' }],
      lines: [
        { say: 'Volume is the amount of space a 3-D object takes up. It is measured in cubic units, like cubic centimetres, cubic metres, or cubic feet.', show: 'def' },
        { say: 'It counts the unit cubes that would fill the object. This cube is three units on each side.', show: ['cu.shape', 'cu.cells'] },
        { say: 'The bottom layer has three rows of three, nine cubes. There are three layers, so twenty-seven cubes fill it: twenty-seven cubic units.' },
      ],
    },
    {
      chapter: 'Base times height',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['V = (\\text{area of the base}) \\times h', '\\text{rectangular prism: } V = lwh'] }],
      lines: [
        { say: 'That idea works for every prism. The first layer has as many cubes as the area of the base, and the number of layers is the height. So the volume is the area of the base, times the height.', show: 'm.0', focus: 'm.0' },
        { say: 'For a rectangular prism, the base is a rectangle with area l times w, so the volume is l times w times h.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A storage crate',
      layout: 'split',
      leftWidth: 520,
      left: [figure('cr', [box({ l: 4, w: 3, h: 2.5, labels: { l: '4\\text{ ft}', w: '3\\text{ ft}', h: '2.5\\text{ ft}' } })], 340)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{base: } 4 \\times 3 = 12 \\text{ ft}^2', 'V = 12 \\times 2.5 = 30 \\text{ ft}^3'] }],
      lines: [
        { say: 'A storage crate is four feet long, three feet wide, and 2.5 feet high. What is its volume?', show: ['cr.shape', 'cr.l', 'cr.w', 'cr.h'] },
        { say: 'The base is four by three, twelve square feet. That is twelve cubes in the bottom layer.', show: 'm.0', focus: 'm.0' },
        { say: 'There are 2.5 layers, so the volume is twelve times 2.5: thirty cubic feet. A half layer is fine: the formula works for any height.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Square units or cubic units?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Square or cubic?', md: 'Area is in **square** units ($\\text{ft}^2$): it covers a surface. Volume is in **cubic** units ($\\text{ft}^3$): it fills a space. The base area is square units; times a height, it becomes cubic units.' }],
      lines: [
        { say: 'Keep the units straight. Area is in square units: it covers a surface. Volume is in cubic units: it fills a space.', show: 'oops' },
        { say: 'The area of the base is in square feet. Multiply by a height in feet, and you get cubic feet.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A concrete pad is $6$ m long, $4$ m wide and $0.15$ m thick. How much concrete does it need?',
          choices: ['$3.6\\ \\text{m}^3$', '$24\\ \\text{m}^3$', '$10.15\\ \\text{m}^3$', '$36\\ \\text{m}^3$'],
          answer: 0,
          working: '$V = 6 \\times 4 \\times 0.15 = 3.6\\ \\text{m}^3$. B is the area of the top, not the volume.',
        },
      ],
      lines: [
        { say: 'Your turn. A concrete pad is six metres long, four metres wide, and 0.15 metres thick. How much concrete does it need? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six times four times 0.15 is 3.6 cubic metres. B is only the area of the top.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Volume counts unit cubes, in cubic units.', 'Prism: $V = (\\text{area of the base}) \\times h$.', 'Rectangular prism: $V = lwh$.'] }],
      lines: [
        { say: 'Let’s sum up. Volume counts unit cubes, so it is measured in cubic units.', show: 'sum.0' },
        { say: 'For any prism, the volume is the area of the base, times the height.', show: 'sum.1' },
        { say: 'And for a rectangular prism, that is l w h. In part two, we find the volume of triangular prisms, and a pool with a sloping floor. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
