import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-2-1',
  lessonId: 'm203-2-1',
  title: 'Surface Area, Part 1: Nets and Rectangular Prisms',
  thumbnailTitle: 'Surface Area of a Prism',
  thumbnail: 'net',
  summary: 'Surface area as the area of a net, SA = 2lw + 2lh + 2wh for a closed box, the 4.32 m² of plywood on a crate, and the 36 ft² of steel on an open water trough measured in feet and inches.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 2.1 · Part 1', title: 'Surface Area of a Prism', subtitle: 'Nets and the faces you need' }],
      lines: [
        { say: 'Before a carpenter orders plywood for a shipping crate, or a welder cuts steel for a water trough, they work out how much material covers the outside. That amount is the surface area.', show: 'title' },
        { say: 'In this video, you will find the surface area of a rectangular prism, and only cover the faces the job needs.' },
      ],
    },
    {
      chapter: 'Nets',
      layout: 'split',
      leftWidth: 560,
      left: [figure('net', [boxNet({ l: 6, w: 4, h: 3, labels: { l: '1.2\\text{ m}', w: '0.8\\text{ m}', h: '0.6\\text{ m}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Surface area and net', md: 'The **surface area** ($SA$) is the total area of all the outside faces, in square units. A **net** is the flat pattern you get when you unfold the object.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['SA = 2lw + 2lh + 2wh'] },
      ],
      lines: [
        { say: 'The surface area of a 3-D object is the total area of all its outside faces, in square units like square metres or square feet. Unfold the object, and you get a flat pattern called a net. The area of the net equals the surface area.', show: 'def' },
        { say: 'Unfold a closed box, and you get six rectangles: a front and a back,', show: ['net.fb', 'net.l', 'net.h'], focus: 'net.fb' },
        { say: 'a top and a bottom,', show: ['net.tb', 'net.w'], focus: 'net.tb' },
        { say: 'and two ends. They come in three matching pairs, so the surface area is two l w, plus two l h, plus two w h.', show: ['net.ends', 'm.0'], focus: ['net.ends', 'm.0'] },
      ],
    },
    {
      chapter: 'A plywood crate',
      layout: 'split',
      leftWidth: 480,
      left: [figure('crate', [box({ l: 6, w: 4, h: 3, labels: { l: '1.2\\text{ m}', w: '0.8\\text{ m}', h: '0.6\\text{ m}' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{top, bottom: } 2 \\times 1.2 \\times 0.8 = 1.92', '\\text{front, back: } 2 \\times 1.2 \\times 0.6 = 1.44', '\\text{ends: } 2 \\times 0.8 \\times 0.6 = 0.96', 'SA = 4.32 \\text{ m}^2'] }],
      lines: [
        { say: 'A closed plywood crate is 1.2 metres long, 0.8 metres wide, and 0.6 metres high. How much plywood covers all six faces? Write one line for each pair of faces.', show: ['crate.shape', 'crate.l', 'crate.w', 'crate.h'] },
        { say: 'Top and bottom: two times 1.2 times 0.8, 1.92 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Front and back: two times 1.2 times 0.6, 1.44. And the two ends: two times 0.8 times 0.6, 0.96.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Add them: 4.32 square metres of plywood. Three short lines are much easier to check than one long calculation.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Only the faces the job needs',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['18 \\text{ in} = 18 \\div 12 = 1.5 \\text{ ft}', '\\text{bottom only: } 6 \\times 2 = 12', '\\text{front, back: } 2 \\times 6 \\times 1.5 = 18', '\\text{ends: } 2 \\times 2 \\times 1.5 = 6', 'SA = 12 + 18 + 6 = 36 \\text{ ft}^2'] },
      ],
      lines: [
        { say: 'On the job, you rarely cover every face. A steel water trough with no top is six feet long, two feet wide, and eighteen inches deep. How much steel covers the outside, in square feet? First, put every measurement in the same unit: eighteen inches is 1.5 feet.', show: 'm.0', focus: 'm.0' },
        { say: 'List the faces. There is no top, so only the bottom: six times two, twelve square feet.', show: 'm.1', focus: 'm.1' },
        { say: 'Front and back: two times six times 1.5, eighteen. And the two ends: two times two times 1.5, six.', show: ['m.2', 'm.3'], focus: ['m.2', 'm.3'] },
        { say: 'Altogether, thirty-six square feet of steel.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An open-top planter box is $4$ ft long, $2$ ft wide and $1$ ft high. How much wood covers its outside faces?',
          choices: ['$20\\ \\text{ft}^2$', '$28\\ \\text{ft}^2$', '$8\\ \\text{ft}^2$', '$14\\ \\text{ft}^2$'],
          answer: 0,
          working: 'Bottom: $4 \\times 2 = 8$. Front and back: $2 \\times 4 \\times 1 = 8$. Ends: $2 \\times 2 \\times 1 = 4$. $8 + 8 + 4 = 20\\ \\text{ft}^2$. B includes a top.',
        },
      ],
      lines: [
        { say: 'Your turn. An open-top planter box is four feet long, two feet wide, and one foot high. How much wood covers its outside faces? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The bottom is eight, the front and back are eight, and the ends are four: twenty square feet. B includes a top the planter does not have.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Surface area is the area of the net.', 'Closed box: $SA = 2lw + 2lh + 2wh$, one line per pair.', 'List the faces the job needs, in one unit.'] }],
      lines: [
        { say: 'Let’s sum up. Surface area is the total area of the outside faces, the same as the area of the net.', show: 'sum.0' },
        { say: 'For a closed box, it is two l w, plus two l h, plus two w h. Write one line for each pair.', show: 'sum.1' },
        { say: 'And list only the faces the job needs, with every measurement in the same unit. In part two, we cover triangular prisms. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
