import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/** The room's name, in the middle of the floor plan. */
const room: Part = {
  points: { c: [3, 2] },
  items: [{ kind: 'label', id: 'name', at: 'c', tex: '\\text{Living room}', tone: 'muted', place: 'center' }],
};

const video: Explainer = {
  id: 'm203-5-1',
  lessonId: 'm203-5-1',
  title: 'Scale Drawings and Models, Part 1: Reading a Scale',
  thumbnailTitle: 'Reading a Scale',
  thumbnail: 'fp',
  summary: 'Three ways to write a scale (in words, as a ratio in one unit, or with two units), reading a 7.05 m wall from 14.1 cm on a 1 : 50 floor plan, and why 1 : 50 never means centimetres to metres.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.1 · Part 1', title: 'Reading a Scale', subtitle: 'From the drawing to real life' }],
      lines: [
        { say: 'A blueprint for a garage fits on one sheet of paper, yet a framer can build every wall from it. The secret is the scale: each length on the drawing always stands for the same real length.', show: 'title' },
        { say: 'In this video, you will read a scale, and use it to find a real length.' },
      ],
    },
    {
      chapter: 'Three ways to write a scale',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale', md: 'A **scale** compares a length on a drawing or model with the matching real length.' },
        { kind: 'bullets', id: 'b', items: ['In words: $1$ cm represents $2$ m.', 'As a ratio, drawing : real, with **both parts in the same unit**: $1 : 50$.', 'With two units, as on an architect’s drawing: $\\tfrac14$ in : $1$ ft.'] },
      ],
      lines: [
        { say: 'A scale compares a length on a drawing or model with the matching real length. You will see it written three ways.', show: 'def' },
        { say: 'In words: one centimetre represents two metres.', show: 'b.0' },
        { say: 'As a ratio, drawing to real, with both parts in the same unit: one to fifty means one centimetre on the drawing is fifty centimetres in real life.', show: 'b.1' },
        { say: 'Or with two different units, as on an architect’s drawing: a quarter inch to one foot.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A floor plan',
      layout: 'split',
      leftWidth: 560,
      left: [figure('fp', [rectangle({ w: 6, h: 4, labels: { w: '14.1\\text{ cm}' } }), room], 300)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['1 : 50 \\text{ means } 1 \\text{ cm} \\to 50 \\text{ cm}', '14.1 \\times 50 = 705 \\text{ cm}', '705 \\div 100 = 7.05 \\text{ m}'] }],
      lines: [
        { say: 'A floor plan has a scale of one to fifty. The living-room wall is 14.1 centimetres long on the plan. How long is the real wall, in metres?', show: ['fp.shape', 'fp.name'] },
        { say: 'One to fifty means one centimetre on the plan is fifty centimetres in real life.', show: 'm.0', focus: 'm.0' },
        { say: 'To find a real length, multiply: 14.1 times fifty is 705 centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'There are 100 centimetres in a metre, so the wall is 7.05 metres long. That is a sensible size for a living room, which is a good check that the scale was read correctly.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixing units in a ratio',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units in a ratio', md: 'A ratio scale uses the **same unit** on both sides. $1 : 50$ does **not** mean $1$ cm to $50$ m. Multiply first, then convert: $705$ cm $= 7.05$ m.' }],
      lines: [
        { say: 'A common mistake is to read one to fifty as one centimetre to fifty metres. That would make the living room 705 metres long, which no house could hold.', show: 'oops' },
        { say: 'A ratio scale always uses the same unit on both sides. Multiply first, then convert to the unit you want.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a $1 : 200$ site plan, a driveway is $9.5$ cm long. How long is the real driveway?',
          choices: ['$19$ m', '$1900$ m', '$1.9$ m', '$47.5$ m'],
          answer: 0,
          working: '$9.5 \\times 200 = 1900$ cm, and $1900 \\div 100 = 19$ m. B forgets to convert centimetres to metres.',
        },
      ],
      lines: [
        { say: 'Your turn. On a one to 200 site plan, a driveway is 9.5 centimetres long. How long is the real driveway? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 9.5 times 200 is 1,900 centimetres, which is nineteen metres. B treats the 1,900 as metres.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A scale can be written in words, as a ratio, or with two units.', 'A ratio scale uses the same unit on both sides.', 'Drawing to real life: multiply, then convert.'] }],
      lines: [
        { say: 'Let’s sum up. A scale can be written in words, as a ratio, or with two units.', show: 'sum.0' },
        { say: 'A ratio scale uses the same unit on both sides.', show: 'sum.1' },
        { say: 'And to go from the drawing to real life, multiply, then convert. In part two, we go the other way, and use imperial scales. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
