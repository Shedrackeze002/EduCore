import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-5-1-c',
  lessonId: 'm203-5-1',
  title: 'Scale Drawings and Models, Part 3: Finding the Scale',
  thumbnailTitle: 'Finding the Scale',
  thumbnail: 'm',
  summary: 'The scale factor k = new length ÷ original length, enlargements and reductions, the 1 : 24 scale of a 24 cm model of a 5.76 m pickup truck, and an enlarged 2 : 1 drawing of a bolt head 38 mm wide on paper (19 mm in real life).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.1 · Part 3', title: 'Finding the Scale', subtitle: 'Enlargements and reductions' }],
      lines: [
        { say: 'Model trucks and doll houses are smaller than the real thing. Drawings of tiny machine parts are often bigger. Either way, one number tells you how they compare.', show: 'title' },
        { say: 'In this video, you will find the scale of a model, and work with an enlarged drawing.' },
      ],
    },
    {
      chapter: 'Scale factor',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'lg', lines: ['k = \\dfrac{\\text{new length}}{\\text{original length}}'] },
        { kind: 'bullets', id: 'b', items: ['$k > 1$: an **enlargement**', '$k < 1$: a **reduction**'] },
      ],
      lines: [
        { say: 'The scale factor, k, tells how many times as long the new figure is as the original. It is the new length divided by the original length.', show: 'm.0', focus: 'm.0' },
        { say: 'If k is greater than one, the new figure is an enlargement. If k is less than one, it is a reduction.', show: ['b.0', 'b.1'] },
      ],
    },
    {
      chapter: 'A model pickup',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['5.76 \\text{ m} = 5.76 \\times 100 = 576 \\text{ cm}', '576 \\div 24 = 24', '\\text{scale } 1 : 24'] }],
      lines: [
        { say: 'A model pickup truck is twenty-four centimetres long. The real truck is 5.76 metres long. What is the scale of the model? First, write both lengths in the same unit: 5.76 metres is 576 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide the real length by the model length: 576 divided by twenty-four is twenty-four.', show: 'm.1', focus: 'm.1' },
        { say: 'The real truck is twenty-four times as long as the model, so the scale is one to twenty-four. The model’s scale factor is one twenty-fourth: a reduction.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'An enlarged drawing',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2 : 1 \\text{ means drawing} = 2 \\times \\text{real}', '38 \\div 2 = 19 \\text{ mm}'] }],
      lines: [
        { say: 'A drawing of a small part is often an enlargement. On a scale of two to one, the drawing is twice the real size.', show: 'm.0', focus: 'm.0' },
        { say: 'A bolt head drawn thirty-eight millimetres wide is really thirty-eight divided by two, nineteen millimetres wide. Notice the order: drawing first, then real, just like one to fifty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Same units first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing mixed units', md: '$5.76 \\div 24 = 0.24$ would suggest the model is bigger than the truck. Write both lengths in the **same unit** before you divide.' }],
      lines: [
        { say: 'Watch out for mixed units. Dividing 5.76 by twenty-four gives 0.24, which would suggest the model is bigger than the truck. Write both lengths in the same unit before you divide, and ask whether the answer makes sense.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model train car is $16$ cm long. The real car is $13.92$ m long. What is the scale?',
          choices: ['$1 : 87$', '$1 : 0.87$', '$1 : 8.7$', '$87 : 1$'],
          answer: 0,
          working: '$13.92$ m $= 1392$ cm, and $1392 \\div 16 = 87$, so the scale is $1 : 87$. D has the parts the wrong way round.',
        },
      ],
      lines: [
        { say: 'Your turn. A model train car is sixteen centimetres long. The real car is 13.92 metres long. What is the scale? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 13.92 metres is 1,392 centimetres, and 1,392 divided by sixteen is eighty-seven. The scale is one to eighty-seven. D has the parts the wrong way round.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$k =$ new length $\\div$ original length.', '$k > 1$: enlargement. $k < 1$: reduction.', 'Same unit before you divide; drawing first in the ratio.'] }],
      lines: [
        { say: 'Let’s sum up. The scale factor is the new length divided by the original length.', show: 'sum.0' },
        { say: 'Greater than one is an enlargement, and less than one is a reduction.', show: 'sum.1' },
        { say: 'And write both lengths in the same unit before you divide, with the drawing first in the ratio. In part four, we see what happens to area and volume. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
