import type { Explainer } from '@/video/script.ts';
import { box, figure, squarePyramid } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-3-2',
  lessonId: 'm203-3-2',
  title: 'Volume of Pyramids, Cones and Spheres, Part 1: Pyramids Hold One Third',
  thumbnailTitle: 'Volume of a Pyramid',
  thumbnail: 'py',
  summary: 'Why a pyramid holds one third of the prism with the same base and height, V = ⅓ × base area × h, a glass paperweight with a 9 cm base and 12 cm height (324 cm³), and the attic under a hip roof (2304 ft³).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 3.2 · Part 1', title: 'Volume of a Pyramid', subtitle: 'One third of a prism' }],
      lines: [
        { say: 'A road-salt pile is a cone, a hip-roof attic is a pyramid, and a propane tank has rounded ends. Each of these shapes holds less than the box or cylinder that fits around it.', show: 'title' },
        { say: 'In this video, you will find out exactly how much less, starting with pyramids.' },
      ],
    },
    {
      chapter: 'Three pyramids fill a prism',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pp', [box({ l: 4, w: 4, h: 4, tone: 'muted' }), squarePyramid({ name: 'py', b: 4, h: 4 })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['V_{\\text{prism}} = (\\text{base}) \\times h', 'V_{\\text{pyramid}} = \\tfrac13 \\times (\\text{base}) \\times h'] }],
      lines: [
        { say: 'Here is a pyramid inside a prism with the same base and the same height. The prism’s volume is the area of the base times the height.', show: ['pp.shape', 'pp.py-shape', 'm.0'], focus: 'm.0' },
        { say: 'Fill the hollow pyramid with sand, and pour it into the prism. It takes exactly three pyramids to fill the prism.' },
        { say: 'So a pyramid’s volume is one third of the area of the base, times the height. Here h is the height: the straight-up distance from the base to the apex.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A glass paperweight',
      layout: 'split',
      leftWidth: 520,
      left: [figure('pw', [squarePyramid({ b: 4.5, h: 6, labels: { b: '9\\text{ cm}', h: '12\\text{ cm}' } })], 380)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{base: } 9 \\times 9 = 81 \\text{ cm}^2', 'V = \\tfrac13 \\times 81 \\times 12', '= 324 \\text{ cm}^3'] }],
      lines: [
        { say: 'A glass paperweight is a square pyramid with a base side of nine centimetres, and a height of twelve centimetres. What is its volume?', show: ['pw.shape', 'pw.b', 'pw.h'] },
        { say: 'The base is nine by nine, eighty-one square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'One third of eighty-one, times twelve: that is 324 cubic centimetres of glass.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'A hip-roof attic',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{base: } 36 \\times 24 = 864 \\text{ ft}^2', 'V = \\tfrac13 \\times 864 \\times 8 = 2304 \\text{ ft}^3'] }],
      lines: [
        { say: 'The attic under a hip roof is a rectangular pyramid. Its base is thirty-six feet by twenty-four feet, and its height is eight feet. The same formula works for any base: the base is thirty-six times twenty-four, 864 square feet.', show: 'm.0', focus: 'm.0' },
        { say: 'One third of 864, times eight, is 2,304 cubic feet of attic space.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Do not forget the third',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting the one third', md: 'Base area × height is the volume of the **prism** around the pyramid: three times too much. For a pyramid, always multiply by $\\tfrac13$.' }],
      lines: [
        { say: 'The most common slip is to forget the one third. Base area times height is the volume of the prism around the pyramid, which is three times too much.', show: 'oops' },
        { say: 'A quick check: a pyramid should always hold less than the box that fits around it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A square pyramid has a base side of $6$ m and a height of $10$ m. What is its volume?',
          choices: ['$120\\ \\text{m}^3$', '$360\\ \\text{m}^3$', '$20\\ \\text{m}^3$', '$180\\ \\text{m}^3$'],
          answer: 0,
          working: '$V = \\tfrac13 \\times 36 \\times 10 = 120\\ \\text{m}^3$. B forgets the one third.',
        },
      ],
      lines: [
        { say: 'Your turn. A square pyramid has a base side of six metres and a height of ten metres. What is its volume? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The base is thirty-six square metres, and one third of thirty-six times ten is 120 cubic metres. B forgets the one third.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A pyramid holds one third of its prism.', '$V = \\tfrac13 \\times (\\text{area of the base}) \\times h$', 'Use the straight-up height.'] }],
      lines: [
        { say: 'Let’s sum up. A pyramid holds one third of the prism with the same base and height.', show: 'sum.0' },
        { say: 'Its volume is one third, times the area of the base, times the height.', show: 'sum.1' },
        { say: 'And h is the straight-up height. In part two, we find the volume of cones. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
