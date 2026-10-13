import type { Explainer } from '@/video/script.ts';
import { box, cylinder, figure, hemisphere } from '@/video/solids.ts';

/** A grain silo: a cylinder 15 m tall with a hemisphere of radius 4 m on top. */
const silo = (id: string) =>
  figure(id, [cylinder({ name: 'c', r: 4, h: 15, top: 'front', labels: { h: '15\\text{ m}' } }), hemisphere({ name: 'm', at: [0, 15], r: 4, labels: { r: '4\\text{ m}' } })]);

const video: Explainer = {
  id: 'm10c-1-8-b',
  lessonId: 'm10c-1-8',
  title: 'Spheres, Composite Objects and Unknown Dimensions, Part 2: Composite Objects',
  thumbnailTitle: 'Composite Objects',
  thumbnail: 'silo',
  summary: 'Breaking composite objects into simple solids: the volume and surface area of a silo (a cylinder with a hemisphere on top), a block with a hole through it, and a five-step routine for any measurement problem.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.8 · Part 2', title: 'Composite Objects', subtitle: 'Break it into simple solids' }],
      lines: [
        { say: 'Most real objects are not a single prism or sphere. A grain silo is a cylinder with a dome on top. A pipe is a cylinder with a hole through it.', show: 'title' },
        { say: 'In this video, you will break composite objects into simple solids, and find their volume and surface area.' },
      ],
    },
    {
      chapter: 'Volume of a silo',
      layout: 'split',
      leftWidth: 420,
      left: [silo('silo')],
      right: [
        { kind: 'text', id: 'q', md: 'A silo is a cylinder with radius $4\\text{ m}$ and height $15\\text{ m}$, with a hemisphere on top. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{cylinder: } \\pi(4)^2(15) = 240\\pi', '\\text{hemisphere: } \\tfrac23\\pi(4)^3 = \\tfrac{128}{3}\\pi', '\\text{total} \\approx 888.0\\text{ m}^3'] },
      ],
      lines: [
        { say: 'A silo is a cylinder with a radius of four metres and a height of fifteen metres, with a hemisphere on top. Find its volume.', show: ['silo.c-shape', 'silo.m-shape', 'silo.c-h', 'silo.m-r', 'q'] },
        { say: 'Break it into two simple solids. The cylinder is pi times four squared times fifteen, which is 240 pi.', show: 'm.0', focus: ['m.0', 'silo.c-lateral'] },
        { say: 'The hemisphere is two thirds pi times four cubed, which is 128 over three pi.', show: 'm.1', focus: ['m.1', 'silo.m-surface'] },
        { say: 'Keep pi exact until the end, then add: about 888 cubic metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Surface area of the silo',
      layout: 'split',
      leftWidth: 420,
      left: [silo('silo')],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['\\text{floor: } \\pi(4)^2 = 16\\pi', '\\text{side: } 2\\pi(4)(15) = 120\\pi', '\\text{dome: } 2\\pi(4)^2 = 32\\pi', '\\text{total} = 168\\pi \\approx 527.8\\text{ m}^2'],
        },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Leave out hidden faces', md: 'The top of the cylinder is covered by the dome. It is inside the silo, so do not count it.' },
      ],
      lines: [
        { say: 'Now the surface area of the same silo. Careful: the top of the cylinder is covered by the dome, so it is inside the silo. Do not count it.', show: ['silo.c-shape', 'silo.m-shape', 'silo.c-h', 'silo.m-r', 'oops'] },
        { say: 'The floor is a circle: pi times four squared, sixteen pi.', show: 'm.0', focus: 'm.0' },
        { say: 'The side of the cylinder is two pi times four times fifteen, 120 pi.', show: 'm.1', focus: ['m.1', 'silo.c-lateral'] },
        { say: 'And the dome is half a sphere: two pi times four squared, 32 pi.', show: 'm.2', focus: ['m.2', 'silo.m-surface'] },
        { say: 'Altogether, 168 pi, about 527.8 square metres.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'A block with a hole',
      layout: 'split',
      leftWidth: 500,
      left: [figure('block', [box({ l: 20, w: 40, h: 20, hole: { r: 5, label: '5' }, labels: { l: '20\\text{ cm}', w: '40\\text{ cm}', h: '20\\text{ cm}' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A $20 \\times 20 \\times 40\\text{ cm}$ block has a hole of radius $5\\text{ cm}$ drilled all the way through its length. Find its volume.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{block: } 40 \\times 20 \\times 20 = 16\\,000', '\\text{hole: } \\pi(5)^2(40) = 1000\\pi \\approx 3141.6', '16\\,000 - 3141.6 \\approx 12\\,858.4\\text{ cm}^3'] },
      ],
      lines: [
        { say: 'Composite objects can also have parts taken away. A block, twenty by twenty by forty centimetres, has a hole of radius five centimetres drilled all the way through its length. Find its volume.', show: ['block.shape', 'block.l', 'block.w', 'block.h', 'block.hole', 'block.hole-r', 'q'] },
        { say: 'Start with the whole block: forty times twenty times twenty is sixteen thousand cubic centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The hole is a cylinder, forty centimetres long: pi times five squared times forty, which is a thousand pi, about 3141.6.', show: 'm.1', focus: ['m.1', 'block.hole'] },
        { say: 'Subtract it: sixteen thousand minus 3141.6 is about twelve thousand, eight hundred and fifty-eight point four cubic centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A routine',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'steps',
          items: [
            '**Sketch** the object and label every dimension you know.',
            '**Decide:** surface area (covering) or volume (filling)?',
            '**Break** a composite object into simple solids.',
            '**Calculate** each part, keeping $\\pi$ exact until the end.',
            '**Check** the units (square or cubic) and whether the answer is reasonable.',
          ],
        },
      ],
      lines: [
        { say: 'Here is a routine for any measurement problem. First, sketch the object, and label every dimension you know.', show: 'steps.0' },
        { say: 'Second, decide what is being asked: surface area, for covering, or volume, for filling.', show: 'steps.1' },
        { say: 'Third, break a composite object into simple solids. Fourth, calculate each part, keeping pi exact until the end.', show: ['steps.2', 'steps.3'] },
        { say: 'And fifth, check the units, square or cubic, and whether the answer is reasonable.', show: 'steps.4' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A cylinder with radius $2\\text{ m}$ and height $6\\text{ m}$ has a cone with the same radius and height $3\\text{ m}$ on top. What is the total volume, to the nearest tenth?',
          choices: ['$88.0\\text{ m}^3$', '$113.1\\text{ m}^3$', '$75.4\\text{ m}^3$', '$100.5\\text{ m}^3$'],
          answer: 0,
          working: 'Cylinder: $\\pi(2)^2(6) = 24\\pi$. Cone: $\\tfrac13\\pi(2)^2(3) = 4\\pi$. Total $28\\pi \\approx 88.0\\text{ m}^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A cylinder with a radius of two metres and a height of six metres has a cone with the same radius and a height of three metres on top. What is the total volume, to the nearest tenth? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The cylinder is pi times two squared times six, 24 pi. The cone is one third pi times two squared times three, four pi. Together, 28 pi, about 88 cubic metres. B forgets the one third, and C leaves out the cone.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Break a composite object into simple solids; add or subtract their volumes.',
            'For surface area, leave out faces that are hidden where solids join.',
            'Keep $\\pi$ exact until the end, and check the units.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. To find the volume of a composite object, break it into simple solids, then add or subtract.", show: 'sum.0' },
        { say: 'For surface area, leave out any faces that are hidden where the solids join.', show: 'sum.1' },
        { say: 'Keep pi exact until the end, and check the units. That completes unit one. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
