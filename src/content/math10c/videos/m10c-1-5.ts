import type { Explainer } from '@/video/script.ts';
import { box, boxNet, figure, triangularPrism, triangularPrismNet } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-5',
  lessonId: 'm10c-1-5',
  title: 'Surface Area of Prisms and Cylinders, Part 1: Prisms',
  thumbnailTitle: 'Surface Area of Prisms',
  thumbnail: 'net',
  summary: 'Surface area as the area of a net: rectangular prisms, triangular prisms, and the rule SA = 2B + Ph for any right prism. Part 2 finds the surface area of cylinders.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.5 · Part 1', title: 'Surface Area of Prisms', subtitle: 'Unfold it into a net' }],
      lines: [
        { say: 'How much cardboard does it take to make a cereal box? How much metal to make a soup can? These are surface area questions.', show: 'title' },
        { say: 'In this video, you will find the surface area of prisms by unfolding them into nets. In part two, we do the same for cylinders.' },
      ],
    },
    {
      chapter: 'Surface area and nets',
      layout: 'split',
      left: [figure('box', [box({ l: 12, w: 5, h: 8, labels: { l: '12\\text{ cm}', w: '5\\text{ cm}', h: '8\\text{ cm}' } })])],
      right: [
        { kind: 'callout', id: 'sa', tone: 'definition', title: 'Surface area', md: 'The total area of all the faces of a 3-D object, in square units such as $\\text{cm}^2$.' },
        { kind: 'callout', id: 'net', tone: 'definition', title: 'Net', md: 'A flat pattern that folds up into the object. The surface area is the **area of the net**.' },
      ],
      lines: [
        { say: 'The surface area of a 3-D object is the total area of all its faces. It is measured in square units, such as square centimetres.', show: ['box.shape', 'sa'] },
        { say: 'This box is a right rectangular prism: twelve centimetres long, five wide, and eight high.', show: ['box.l', 'box.w', 'box.h'] },
        { say: 'A net is a flat pattern that folds up to make the object. Unfold the box, and the surface area is just the area of its net.', show: 'net' },
      ],
    },
    {
      chapter: 'A rectangular prism',
      layout: 'split',
      leftWidth: 640,
      left: [figure('net', [boxNet({ l: 12, w: 5, h: 8, labels: { l: '12', w: '5', h: '8' }, areas: { front: '12 \\times 8', back: '12 \\times 8', top: '12 \\times 5', bottom: '12 \\times 5' } })])],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['2(12 \\times 5) = 120', '2(12 \\times 8) = 192', '2(5 \\times 8) = 80', 'SA = 392\\text{ cm}^2'],
        },
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Rectangular prism', md: '$SA = 2(lw + lh + wh)$' },
      ],
      lines: [
        { say: 'Here is the net of the box. A rectangular prism has three pairs of matching faces.', show: ['net.fb', 'net.tb', 'net.ends', 'net.l', 'net.w', 'net.h'] },
        { say: 'The top and bottom are each twelve by five. Two times sixty is 120 square centimetres.', show: 'm.0', focus: ['net.tb', 'm.0'] },
        { say: 'The front and back are each twelve by eight. Two times 96 is 192.', show: 'm.1', focus: ['net.fb', 'm.1'] },
        { say: 'And the two ends are five by eight. Two times forty is eighty.', show: 'm.2', focus: ['net.ends', 'm.2'] },
        { say: 'Add them up: 120 plus 192 plus 80 is 392 square centimetres. In general, the surface area is two times l w plus l h plus w h.', show: ['m.3', 'rule'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A triangular prism',
      layout: 'split',
      left: [figure('tri', [triangularPrism({ b: 8, t: 6, apex: 0, l: 15, labels: { b: '8\\text{ in}', t: '6\\text{ in}', l: '15\\text{ in}' } })])],
      right: [{ kind: 'text', id: 'q', md: 'The bases are right triangles with legs $6\\text{ in}$ and $8\\text{ in}$ and hypotenuse $10\\text{ in}$. The prism is $15\\text{ in}$ long. Find its surface area.', size: 'md' }],
      lines: [
        { say: 'A triangular prism has two triangular bases, and three rectangular faces.', show: 'tri.shape' },
        { say: 'These bases are right triangles, with legs of six and eight inches and a hypotenuse of ten. The prism is fifteen inches long. Find its surface area.', show: ['tri.b', 'tri.t', 'tri.t-mark', 'tri.l', 'q'] },
      ],
    },
    {
      chapter: 'Its net',
      layout: 'split',
      leftWidth: 560,
      left: [
        figure('net', [
          triangularPrismNet({ a: 6, b: 8, c: 10, l: 15, labels: { a: '6', b: '8', c: '10', l: '15', perimeter: '6 + 8 + 10 = 24' } }),
        ]),
      ],
      right: [
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          align: 'left',
          lines: ['(6 + 8 + 10)(15) = 360', '2 \\times \\tfrac12(6)(8) = 48', 'SA = 360 + 48 = 408\\text{ in}^2'],
        },
      ],
      lines: [
        { say: 'Unfold it. All three rectangles are fifteen inches long, and their widths are the three sides of the triangle: six, eight and ten.', show: ['net.strip', 'net.a', 'net.b', 'net.c', 'net.l'] },
        { say: 'Together, they make one long rectangle, as wide as the perimeter of the triangle: 24 inches. So their area is 24 times 15, which is 360 square inches.', show: ['net.perimeter', 'm.0'], focus: ['net.perimeter', 'm.0'] },
        { say: 'The two triangles are each one half times six times eight, which is 24. Together, 48 square inches.', show: ['net.bases', 'm.1'], focus: ['net.bases', 'm.1'] },
        { say: 'So the surface area is 360 plus 48, which is 408 square inches.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Any right prism',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'key', title: 'Surface area of a right prism', md: '$SA = 2B + Ph$: two bases of area $B$, plus the perimeter of the base $P$ times the height (length) $h$.' },
        { kind: 'math', id: 'm', lines: ['\\text{box: } 2(12 \\times 5) + (12 + 5 + 12 + 5)(8)', '= 120 + 272 = 392\\text{ cm}^2 \\checkmark'] },
      ],
      lines: [
        { say: 'The same idea works for every right prism. The surface area is two times the area of the base, plus the perimeter of the base times the height, or length, of the prism.', show: 'rule' },
        { say: 'Check it on the box. Its base is twelve by five, an area of sixty, and its perimeter is 34. Two times sixty, plus 34 times 8,', show: 'm.0', focus: 'm.0' },
        { say: 'is 120 plus 272, which is 392 square centimetres, just as before.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A box is $10\\text{ cm}$ long, $4\\text{ cm}$ wide and $3\\text{ cm}$ high. What is its surface area?',
          choices: ['$164\\text{ cm}^2$', '$120\\text{ cm}^2$', '$82\\text{ cm}^2$', '$124\\text{ cm}^2$'],
          answer: 0,
          working: '$SA = 2(10 \\times 4 + 10 \\times 3 + 4 \\times 3) = 2(40 + 30 + 12) = 164\\text{ cm}^2$.',
        },
      ],
      lines: [
        { say: 'Your turn. A box is ten centimetres long, four wide and three high. What is its surface area? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Forty plus thirty plus twelve is 82, and there are two of each face, so the surface area is 164 square centimetres. B is the volume, and C counts each face only once.', show: 'q.answer' },
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
            'Surface area is the total area of all the faces: the area of the net.',
            'Rectangular prism: $SA = 2(lw + lh + wh)$.',
            'Any right prism: $SA = 2B + Ph$. The side faces make one rectangle as wide as the perimeter.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Surface area is the total area of all the faces, which is the area of the net, in square units.", show: 'sum.0' },
        { say: 'For a rectangular prism, add the three different faces and double: two times l w plus l h plus w h.', show: 'sum.1' },
        { say: 'And for any right prism, it is two bases, plus the perimeter times the height. In part two, we unroll a cylinder. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
