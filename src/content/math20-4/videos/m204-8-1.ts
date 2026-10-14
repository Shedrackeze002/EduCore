import type { Explainer } from '@/video/script.ts';
import { outline } from '@/video/shapes.ts';
import { figure } from '@/video/solids.ts';

const room = outline({
  corners: [[0, 0], [6, 0], [6, 4], [0, 4]],
  labels: [
    { id: 'l', at: [3, -0.55], tex: '6\\text{ cm}' },
    { id: 'w', at: [-0.85, 2], tex: '4\\text{ cm}' },
    { id: 'n', at: [3, 2], tex: '\\text{Living room}', tone: 'muted' },
  ],
});

const video: Explainer = {
  id: 'm204-8-1',
  lessonId: 'm204-8-1',
  title: 'Scale Drawings, Part 1: What a Scale Means',
  thumbnailTitle: 'Scale Drawings',
  thumbnail: 'fp',
  summary: 'What a scale drawing, a floor plan and a scale are, reading a scale written in words (1 cm represents 1.5 m), and finding the real size of a living room drawn 6 cm by 4 cm (9 m by 6 m).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.1 · Part 1', title: 'Scale Drawings', subtitle: 'Small on paper, real in life' }],
      lines: [
        { say: 'Before a deck, a garage or a kitchen is built, someone draws a plan. The plan is much smaller than the real thing, but every length is shrunk in the same way.', show: 'title' },
        { say: 'In this video, you will read a scale, and find real lengths from a floor plan.' },
      ],
    },
    {
      chapter: 'Scale drawings',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale drawing and scale', md: 'A **scale drawing** is an accurate drawing of a real object, made bigger or smaller. A **floor plan** is a scale drawing of a building, seen from above. The **scale** tells how a length on the drawing compares with the real length.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ cm represents } 1.5 \\text{ m}'] },
      ],
      lines: [
        { say: 'A scale drawing is an accurate drawing of a real object, made bigger or smaller. A floor plan is a scale drawing of a building, seen from above. The scale tells how a length on the drawing compares with the real length.', show: 'def' },
        { say: 'A scale can be written in words: one centimetre represents 1.5 metres. That means every centimetre on the plan stands for 1.5 metres in real life.', show: 'm', focus: 'm' },
      ],
    },
    {
      chapter: 'The size of a living room',
      layout: 'split',
      leftWidth: 600,
      left: [figure('fp', [room], 360)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{length: } 6 \\times 1.5 = 9 \\text{ m}', '\\text{width: } 4 \\times 1.5 = 6 \\text{ m}'] }],
      lines: [
        { say: 'On this floor plan, one centimetre represents 1.5 metres. The living room is six centimetres long and four centimetres wide on the plan. How long and how wide is the real living room?', show: 'fp' },
        { say: 'Each centimetre on the plan is 1.5 metres, so multiply. The length is six times 1.5: nine metres.', show: 'm.0', focus: ['fp.l', 'm.0'] },
        { say: 'The width is four times 1.5: six metres. So the real living room is nine metres long and six metres wide.', show: 'm.1', focus: ['fp.w', 'm.1'] },
        { say: 'Notice that both lengths use the same scale. That is what keeps the drawing the same shape as the real room.' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: 'The real room must be **bigger** than the drawing. A real length in metres should match the kind of space: a living room of $9$ m by $6$ m is large but reasonable.' }],
      lines: [
        { say: 'Always check the size. The real room must be bigger than the drawing, so drawing to real means multiply. And the answer should fit the kind of space. A living room nine metres by six metres is large, but reasonable. A living room of 900 metres would not be.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a floor plan, $1$ cm represents $2$ m. A bedroom is $2.5$ cm long on the plan. How long is the real bedroom?',
          choices: ['$5$ m', '$1.25$ m', '$4.5$ m', '$50$ m'],
          answer: 0,
          working: '$2.5 \\times 2 = 5$ m. B divides, and C adds.',
        },
      ],
      lines: [
        { say: 'Your turn. On a floor plan, one centimetre represents two metres. A bedroom is 2.5 centimetres long on the plan. How long is the real bedroom? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 2.5 times two is five metres. B divides, which makes the real room smaller than the drawing, and C adds instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A scale compares a drawing length with the real length.', '1 cm represents 1.5 m: multiply by 1.5 to get metres.', 'Use the same scale for every length.'] }],
      lines: [
        { say: 'Let’s sum up. A scale compares a length on a drawing with the real length.', show: 'sum.0' },
        { say: 'If one centimetre represents 1.5 metres, multiply the drawing length by 1.5 to get metres.', show: 'sum.1' },
        { say: 'And use the same scale for every length. In part two, we measure a plan with a ruler. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
