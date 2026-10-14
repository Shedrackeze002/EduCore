import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/** Names under the original logo and its scale diagram. */
const names: Part = {
  points: { o: [2, 3.15], s: [10.8, 4.4] },
  items: [
    { kind: 'label', id: 'o-name', at: 'o', tex: '\\text{Original}', tone: 'muted', place: 'center' },
    { kind: 'label', id: 's-name', at: 's', tex: '\\text{Scale diagram}', tone: 'muted', place: 'center' },
  ],
};

const video: Explainer = {
  id: 'm202-8-3',
  lessonId: 'm202-8-3',
  title: 'Scale Diagrams, Part 1: Scale Factor',
  thumbnailTitle: 'Scale Factor',
  thumbnail: 'logo',
  summary: 'What a scale diagram and a scale factor are, enlargements (k > 1) and reductions (0 < k < 1), the scale factor of 1.5 for an enlarged logo, and why both lengths need the same unit, as for a 5.4 m canoe drawn 9 cm long.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 8.3 · Part 1', title: 'Scale Factor', subtitle: 'Enlargements and reductions' }],
      lines: [
        { say: 'Blueprints, site plans, road maps and model kits are all drawn to scale. Every length is multiplied by the same number, so a whole town can fit on one page.', show: 'title' },
        { say: 'In this video, you will find that number, the scale factor, and decide whether a diagram is an enlargement or a reduction.' },
      ],
    },
    {
      chapter: 'Scale diagrams',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale diagram and scale factor', md: 'A **scale diagram** is similar to the original object. The **scale factor** $k$ compares corresponding lengths.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['k = \\dfrac{\\text{length on the diagram}}{\\text{corresponding length on the original}}'] },
        { kind: 'bullets', id: 'b', items: ['$k > 1$: an **enlargement**', '$0 < k < 1$: a **reduction**'] },
      ],
      lines: [
        { say: 'A scale diagram is a drawing that is similar to the original object: same shape, different size.', show: 'def' },
        { say: 'The scale factor, k, compares corresponding lengths. It is the length on the diagram, divided by the matching length on the original.', show: 'm.0', focus: 'm.0' },
        { say: 'If k is greater than one, the diagram is bigger: an enlargement. If k is between zero and one, the diagram is smaller: a reduction.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'Finding a scale factor',
      layout: 'center',
      main: [
        figure('logo', [
          rectangle({ name: 'o', w: 4, h: 2.5, labels: { w: '4\\text{ cm}', h: '2.5\\text{ cm}' } }),
          rectangle({ name: 's', at: [7.8, 0], w: 6, h: 3.75, labels: { w: '6\\text{ cm}', h: '3.75\\text{ cm}' } }),
          names,
        ], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['k = \\dfrac{6}{4} = 1.5', '\\dfrac{3.75}{2.5} = 1.5 \\;\\checkmark', 'k > 1: \\text{ an enlargement}'] },
      ],
      lines: [
        { say: 'A four centimetre by 2.5 centimetre logo is redrawn as a six by 3.75 centimetre scale diagram. What is the scale factor?', show: ['logo.o-shape', 'logo.o-name', 'logo.s-shape', 'logo.s-name'] },
        { say: 'Divide a diagram length by the matching original length. Six over four is 1.5.', show: 'm.0', focus: ['logo.s-w', 'logo.o-w', 'm.0'] },
        { say: 'Check with the other pair of sides: 3.75 over 2.5 is also 1.5. The two shapes are similar, so every pair gives the same k.', show: 'm.1', focus: ['logo.s-h', 'logo.o-h', 'm.1'] },
        { say: 'Since k is greater than one, the diagram is an enlargement, one and a half times as long in every direction.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same units first',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['5.4 \\text{ m} = 540 \\text{ cm}', 'k = \\dfrac{9}{540} = \\dfrac{1}{60} \\approx 0.0167', '0 < k < 1: \\text{ a reduction}'] }],
      lines: [
        { say: 'A scale factor has no units, so both lengths must be in the same unit before you divide. A 5.4 metre canoe is drawn nine centimetres long. What scale factor was used? First, 5.4 metres is 540 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Now divide: nine over 540 is one sixtieth, about 0.0167.', show: 'm.1', focus: 'm.1' },
        { say: 'That is a reduction. Every length on the drawing is one sixtieth of the real length.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixing units',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: 'Dividing $9 \\div 5.4$ gives about $1.67$, which says the drawing is bigger than the canoe. Convert first, then divide.' }],
      lines: [
        { say: 'Watch out for mixed units. Dividing nine by 5.4 gives about 1.67, which says a drawing on a page is bigger than a real canoe. That cannot be right. Convert first, then divide.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A table $2.4$ m long is drawn $8$ cm long. What scale factor was used?',
          choices: ['$k = \\dfrac{1}{30}$', '$k \\approx 3.33$', '$k = 30$', '$k = \\dfrac{1}{3}$'],
          answer: 0,
          working: '$2.4$ m $= 240$ cm, so $k = \\dfrac{8}{240} = \\dfrac{1}{30}$, a reduction. B divides $8 \\div 2.4$ without converting.',
        },
      ],
      lines: [
        { say: 'Your turn. A table 2.4 metres long is drawn eight centimetres long. What scale factor was used? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 2.4 metres is 240 centimetres, so k is eight over 240, which is one thirtieth: a reduction. B divides eight by 2.4 without converting.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$k = \\dfrac{\\text{diagram length}}{\\text{original length}}$', '$k > 1$: enlargement. $0 < k < 1$: reduction.', 'Put both lengths in the same unit before dividing.'] }],
      lines: [
        { say: 'Let’s sum up. The scale factor is the diagram length divided by the original length.', show: 'sum.0' },
        { say: 'If k is greater than one, it is an enlargement. Between zero and one, a reduction.', show: 'sum.1' },
        { say: 'And put both lengths in the same unit before you divide. In part two, we read scales written as ratios. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
