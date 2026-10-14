import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { triangle } from '@/video/triangles.ts';

/**
 * Aiyana, 1.7 m tall with a 2.5 m shadow, and a grain elevator with a 30 m shadow, 20.4 m tall.
 * Each is drawn at its own scale (Aiyana four times, the elevator half), so both can be seen;
 * the triangles keep the same shape.
 */
const shadows: Part = {
  points: { P0: [0, 0], P1: [0, 6.8], S1: [10, 0], E0: [17, 0], E1: [17, 10.2], S2: [32, 0], note: [27, 9] },
  items: [
    { kind: 'thing', id: 'ground', type: 'ground', at: 'P0' },
    { kind: 'thing', id: 'elevator', type: 'building', at: 'E0', top: 'E1', width: 3, side: 'left' },
    { kind: 'label', id: 'scale', at: 'note', tex: '\\text{not to scale}', tone: 'muted', place: 'center' },
    { kind: 'thing', id: 'person', type: 'person', at: 'P0', top: 'P1' },
    { kind: 'line', id: 'sh1', from: 'P0', to: 'S1', tone: 'adj', weight: 5, label: '2.5\\text{ m}', labelSide: 'right', group: 'small' },
    { kind: 'line', id: 'ray1', from: 'P1', to: 'S1', tone: 'theta', dashed: true, group: 'small' },
    { kind: 'line', id: 'h1', from: 'P0', to: 'P1', tone: 'opp', label: '1.7\\text{ m}', labelSide: 'left', group: 'small' },
    { kind: 'line', id: 'sh2', from: 'E0', to: 'S2', tone: 'adj', weight: 5, label: '30\\text{ m}', labelSide: 'right', group: 'big' },
    { kind: 'line', id: 'ray2', from: 'E1', to: 'S2', tone: 'theta', dashed: true, group: 'big' },
    { kind: 'line', id: 'h2', from: 'E0', to: 'E1', tone: 'opp', label: 'h', labelSide: 'right', group: 'big' },
  ],
};

/** A ramp with a run of 6 m and a 0.5 m post standing 2 m from its foot, drawn twice as tall as it is. */
const ramp: Part = {
  points: { A: [0, 0], B: [6, 0], C: [6, 3], P: [2, 0], Q: [2, 1] },
  items: [
    { kind: 'line', id: 'base', from: 'A', to: 'B', tone: 'adj', label: '6\\text{ m}', labelSide: 'right' },
    { kind: 'line', id: 'slope', from: 'A', to: 'C' },
    { kind: 'line', id: 'back', from: 'B', to: 'C', tone: 'opp', label: '?', labelSide: 'right' },
    { kind: 'line', id: 'foot', from: 'A', to: 'P', tone: 'good', weight: 6, label: '2\\text{ m}', labelSide: 'right' },
    { kind: 'line', id: 'post', from: 'P', to: 'Q', tone: 'opp', weight: 6, label: '0.5\\text{ m}', labelSide: 'right' },
  ],
};

const video: Explainer = {
  id: 'm103-7-4',
  lessonId: 'm103-7-4',
  title: 'Similar Figures, Part 1: Missing Sides and Shadows',
  thumbnailTitle: 'Similar Figures',
  thumbnail: 'sun',
  summary: 'Finding a missing side of a similar figure with the scale factor or a proportion, using the letter order in △ABC ~ △DEF to match sides, and the shadow method for the height of a grain elevator. Part 2 reads scale diagrams.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.4 · Part 1', title: 'Missing Sides and Shadows', subtitle: 'Using similar figures' }],
      lines: [
        { say: 'How tall is a grain elevator? You can find out with nothing but its shadow and a tape measure.', show: 'title' },
        { say: 'In this video, you will use similar figures to find missing sides, and heights you cannot reach.' },
      ],
    },
    {
      chapter: 'Finding a missing side',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k = \\tfrac{12.5}{5} = 2.5', '\\text{width of B} = 3 \\times 2.5 = 7.5\\text{ m}'] }],
      lines: [
        { say: 'In similar figures, every side is multiplied by the same scale factor. Find it from one pair of matching sides, then use it on the side you want.' },
        { say: 'Rectangle "A" is five metres long and three wide. Rectangle B is similar, and 12.5 metres long. The scale factor from the lengths is 12.5 over five: 2.5.', show: 'm.0', focus: 'm.0' },
        { say: 'So the width of B is three times 2.5: 7.5 metres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The letter order',
      layout: 'split',
      leftWidth: 540,
      left: [
        figure('tri', [
          triangle({ name: 'abc', A: [0, 0], B: [8, 0], C: [8, 6], names: ['A', 'B', 'C'], sides: { AB: '8\\text{ cm}', BC: '6\\text{ cm}' }, tones: { AB: 'adj', BC: 'opp' } }),
          triangle({ name: 'def', A: [29, 0], B: [17, 0], C: [17, 9], names: ['D', 'E', 'F'], sides: { AB: '12\\text{ cm}', BC: 'x' }, tones: { AB: 'adj', BC: 'opp' } }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['AB \\leftrightarrow DE, \\quad BC \\leftrightarrow EF', '\\dfrac{x}{6} = \\dfrac{12}{8}', 'x = 6 \\times \\dfrac{12}{8} = 9\\text{ cm}'] }],
      lines: [
        { say: 'The order of the letters tells you which sides match. Triangle "A" B C is similar to triangle D E F, so "A" matches D, B matches E, and C matches F.', show: ['tri.abc-shape', 'tri.abc-names', 'tri.def-shape', 'tri.def-names'] },
        { say: 'So side "A" B matches D E, and B C matches E F.', show: 'm.0', focus: ['m.0', 'tri.abc-AB', 'tri.def-AB'] },
        { say: '"A" B is eight centimetres, B C is six, and D E is twelve. Find E F, which we call x. Set up a proportion: x over six equals twelve over eight.', show: 'm.1', focus: ['m.1', 'tri.abc-BC', 'tri.def-BC'] },
        { say: 'Multiply both sides by six: x is nine centimetres. The second triangle is flipped, so match by the letters, not by the page.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The shadow method',
      layout: 'split',
      leftWidth: 560,
      left: [figure('sh', [shadows])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{h}{30} = \\dfrac{1.7}{2.5}', 'h = 30 \\times \\dfrac{1.7}{2.5} = 20.4\\text{ m}'] }],
      lines: [
        { say: 'At the same moment, the sun’s rays hit everything at the same angle. So an object and its shadow make a right triangle similar to any other nearby.', show: ['sh.ground', 'sh.person', 'sh.elevator', 'sh.scale'] },
        { say: 'Late in the afternoon, Aiyana is 1.7 metres tall, and casts a shadow 2.5 metres long.', show: 'sh.small', focus: 'sh.small' },
        { say: 'At the same time, a grain elevator casts a shadow thirty metres long. The triangles are similar, so the height over the shadow is the same for both.', show: ['sh.big', 'm.0'], focus: ['sh.big', 'm.0'] },
        { say: 'h is thirty times 1.7 over 2.5: the grain elevator is 20.4 metres tall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Triangles inside triangles',
      layout: 'split',
      leftWidth: 520,
      left: [figure('rp', [ramp])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\dfrac{?}{6} = \\dfrac{0.5}{2}', '? = 6 \\times \\dfrac{0.5}{2} = 1.5\\text{ m}'] }],
      lines: [
        { say: 'A vertical post under a ramp makes a small triangle inside the big one. They share the angle at the bottom, so they are similar.', show: ['rp.base', 'rp.slope', 'rp.back', 'rp.post'] },
        { say: 'A post 0.5 metres tall stands two metres from the foot of the ramp, and the ramp’s run is six metres.', show: 'rp.foot', focus: ['rp.foot', 'rp.post'] },
        { say: 'So the top of the ramp is six times 0.5 over two: 1.5 metres high.', show: ['m.0', 'm.1'], focus: ['rp.back', 'm.1'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A $2\\text{ m}$ post casts a $3\\text{ m}$ shadow. At the same time, a tree casts a $12\\text{ m}$ shadow. How tall is the tree?',
          choices: ['$8\\text{ m}$', '$18\\text{ m}$', '$11\\text{ m}$', '$6\\text{ m}$'],
          answer: 0,
          working: '$\\dfrac{h}{12} = \\dfrac{2}{3}$, so $h = 12 \\times \\dfrac{2}{3} = 8\\text{ m}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A two-metre post casts a three-metre shadow. At the same time, a tree casts a twelve-metre shadow. How tall is the tree? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The height over the shadow is the same: twelve times two thirds is eight metres. B turns the ratio upside down, and C subtracts one, as if the difference stayed the same.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find $k$ from one pair of matching sides, then multiply.', 'The letter order in $\\triangle ABC \\sim \\triangle DEF$ tells you which sides match.', 'Shadows: $\\dfrac{\\text{height}}{\\text{shadow}}$ is the same at the same time.'] }],
      lines: [
        { say: 'Let’s sum up. Find the scale factor from one pair of matching sides, then multiply, or set up a proportion.', show: 'sum.0' },
        { say: 'The letter order tells you which sides match.', show: 'sum.1' },
        { say: 'And for shadows measured at the same time, the height over the shadow is the same. In part two, we read scale diagrams. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
