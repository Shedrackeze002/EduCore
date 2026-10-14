import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-5-3',
  lessonId: 'm103-5-3',
  title: 'Surface Area, Part 1: Boxes and the Faces You Need',
  thumbnailTitle: 'Surface Area of a Box',
  thumbnail: 'net',
  summary: 'Surface area as the area of a net, the rectangular prism formula SA = 2lw + 2lh + 2wh, and deciding which faces a job needs: an open planter, and the walls of a room less a door and a window. Part 2 covers cylinders.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 5.3 · Part 1', title: 'Surface Area of a Box', subtitle: 'And only the faces the job needs' }],
      lines: [
        { say: 'How much plywood covers a shipping crate? How much paint covers the walls of a room? Tradespeople answer by finding the surface area, then deciding which faces the job really needs.', show: 'title' },
        { say: 'In this video, you will find the surface area of a box. In part two, of a cylinder.' },
      ],
    },
    {
      chapter: 'Nets',
      layout: 'split',
      leftWidth: 560,
      left: [figure('net', [boxNet({ l: 6, w: 4, h: 3, labels: { l: '60\\text{ cm}', w: '40\\text{ cm}', h: '30\\text{ cm}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Surface area and net', md: 'The **surface area** is the total area of all the outside faces. A **net** is the flat pattern you get when you unfold the object.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['SA = 2lw + 2lh + 2wh'] },
      ],
      lines: [
        { say: 'The surface area of a 3-D object is the total area of all its outside faces. Unfold it, and you get a flat pattern called a net. The area of the net equals the surface area.', show: 'def' },
        { say: 'Unfold a closed box, and you get six rectangles: a front and a back,', show: ['net.fb', 'net.l', 'net.h'], focus: 'net.fb' },
        { say: 'a top and a bottom,', show: ['net.tb', 'net.w'], focus: 'net.tb' },
        { say: 'and two ends. Each face has a matching partner of the same size, so the surface area of a rectangular prism is two l w, plus two l h, plus two w h.', show: ['net.ends', 'm.0'], focus: ['net.ends', 'm.0'] },
      ],
    },
    {
      chapter: 'A shipping crate',
      layout: 'split',
      leftWidth: 460,
      left: [figure('crate', [box({ l: 6, w: 4, h: 3, labels: { l: '60\\text{ cm}', w: '40\\text{ cm}', h: '30\\text{ cm}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{top, bottom: } 2 \\times 60 \\times 40 = 4800', '\\text{front, back: } 2 \\times 60 \\times 30 = 3600', '\\text{ends: } 2 \\times 40 \\times 30 = 2400', 'SA = 10\\,800\\text{ cm}^2'] }],
      lines: [
        { say: 'A closed wooden crate is sixty centimetres long, forty wide and thirty high. How much plywood covers all six faces? Write one line for each pair of faces.', show: ['crate.shape', 'crate.l', 'crate.w', 'crate.h'] },
        { say: 'The top and bottom: two times sixty times forty, 4,800 square centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The front and back: two times sixty times thirty, 3,600. And the two ends: two times forty times thirty, 2,400.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Add them: 10,800 square centimetres of plywood.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Only the faces you need',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{planter, no top: } 36 \\times 12 + 2(36 \\times 10) + 2(12 \\times 10) = 1392\\text{ in}^2', '\\text{walls: } 2(12 \\times 8) + 2(10 \\times 8) = 352\\text{ ft}^2', '352 - 3 \\times 7 - 4 \\times 3 = 352 - 21 - 12 = 319\\text{ ft}^2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Faces that are not covered', md: '"No lid", "walls only" and "both ends open" all change the answer. List the faces you need first.' },
      ],
      lines: [
        { say: 'On the job, you rarely cover every face. A cedar planter with no top is 36 inches long, twelve wide and ten high. Include the bottom, the front and back, and the two ends: 1,392 square inches.', show: 'm.0', focus: 'm.0' },
        { say: 'A bedroom is twelve feet long, ten wide and eight high, and only the walls are painted. The four walls are 352 square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Subtract the three-by-seven door and the four-by-three window: 319 square feet of paint area.', show: 'm.2', focus: 'm.2' },
        { say: 'So read the question carefully, and list the faces you need before you calculate.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A closed box is $10\\text{ cm}$ by $8\\text{ cm}$ by $5\\text{ cm}$. What is its surface area?',
          choices: ['$340\\text{ cm}^2$', '$400\\text{ cm}^2$', '$170\\text{ cm}^2$', '$260\\text{ cm}^2$'],
          answer: 0,
          working: '$2(10 \\times 8) + 2(10 \\times 5) + 2(8 \\times 5) = 160 + 100 + 80 = 340\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A closed box is ten centimetres by eight by five. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two times eighty, plus two times fifty, plus two times forty: 160 plus a hundred plus eighty is 340 square centimetres. B is the volume, and C counts only one face of each pair.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Surface area = the area of the net.', 'Rectangular prism: $SA = 2lw + 2lh + 2wh$.', 'Include only the faces that get covered.'] }],
      lines: [
        { say: 'Let’s sum up. Surface area is the area of the net: all the outside faces.', show: 'sum.0' },
        { say: 'For a rectangular prism, it is two l w, plus two l h, plus two w h.', show: 'sum.1' },
        { say: 'And on the job, include only the faces that get covered. In part two, we find the surface area of cylinders. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
