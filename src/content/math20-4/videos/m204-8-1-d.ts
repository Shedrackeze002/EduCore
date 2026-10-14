import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-1-d',
  lessonId: 'm204-8-1',
  title: 'Scale Drawings, Part 4: Finding the Scale and the Area',
  thumbnailTitle: 'Finding the Scale',
  thumbnail: 'm',
  summary: 'Finding a scale by dividing the real length by the drawing length in the same units (a 24 cm model of a 6 m truck is 1 : 25), and finding a real area from a plan by finding the real length and width first (45 m²).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.1 · Part 4', title: 'Finding the Scale', subtitle: 'Same units, then divide' }],
      lines: [
        { say: 'Model cars, dollhouses and architects’ models are all made to a scale. If you know the real size and the model size, you can find the scale.', show: 'title' },
        { say: 'In this video, you will find a scale, and use a scale to find a real area.' },
      ],
    },
    {
      chapter: 'A model truck',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A model pickup truck is $24$ cm long. The real truck is $6$ m long.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['6 \\times 100 = 600 \\text{ cm}', '600 \\div 24 = 25', '\\text{scale } 1 : 25'] },
      ],
      lines: [
        { say: 'A model pickup truck is 24 centimetres long. The real truck is six metres long. What is the scale?', show: 'q' },
        { say: 'To find the scale, put both lengths in the same unit. Change six metres to centimetres: six times 100 is 600 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide the real length by the model length: 600 divided by 24 is 25.', show: 'm.1', focus: 'm.1' },
        { say: 'The real truck is 25 times as long as the model. So the scale is one to 25.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same units first',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing units', md: '$24 \\div 6 = 4$ mixes centimetres and metres. A $1 : 4$ model of a $6$ m truck would be $1.5$ m long, not $24$ cm. Change to the same unit first.' }],
      lines: [
        { say: 'A common mistake is to mix units. 24 divided by six is four, but that mixes centimetres and metres. A one to four model of a six metre truck would be 1.5 metres long, much bigger than 24 centimetres. Change to the same unit first.', show: 'oops' },
      ],
    },
    {
      chapter: 'Flooring for a room',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'On a plan, a room is $5$ cm by $4$ cm, and $1$ cm represents $1.5$ m.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{length: } 5 \\times 1.5 = 7.5 \\text{ m}', '\\text{width: } 4 \\times 1.5 = 6 \\text{ m}', '\\text{area: } 7.5 \\times 6 = 45 \\text{ m}^2'] },
      ],
      lines: [
        { say: 'You can also use a scale to find an area. On a plan, a room is five centimetres by four centimetres, and one centimetre represents 1.5 metres. How much flooring does the room need?', show: 'q' },
        { say: 'Find the real length first: five times 1.5 is 7.5 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'And the real width: four times 1.5 is six metres.', show: 'm.1', focus: 'm.1' },
        { say: 'Then multiply: 7.5 times six is 45. The room needs 45 square metres of flooring.', show: 'm.2', focus: 'm.2' },
        { say: 'Do not multiply the plan area, twenty square centimetres, by 1.5. Each length is scaled, so the area grows much more than that.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A model boat is $30$ cm long. The real boat is $9$ m long. What is the scale?',
          choices: ['$1 : 30$', '$1 : 0.3$', '$1 : 3.3$', '$1 : 270$'],
          answer: 0,
          working: '$9$ m $= 900$ cm. $900 \\div 30 = 30$, so the scale is $1 : 30$. B divides $9$ by $30$, mixing metres and centimetres, and D multiplies.',
        },
      ],
      lines: [
        { say: 'Your turn. A model boat is thirty centimetres long. The real boat is nine metres long. What is the scale? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine metres is 900 centimetres, and 900 divided by thirty is thirty. So the scale is one to thirty. B divides nine by thirty, mixing metres and centimetres, and D multiplies instead of dividing.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find a scale: same units, then real ÷ drawing.', 'Real area: scale the length and width first.', 'Then multiply them.'] }],
      lines: [
        { say: 'Let’s sum up. To find a scale, put both lengths in the same unit, then divide the real length by the drawing length.', show: 'sum.0' },
        { say: 'To find a real area, scale the length and the width first.', show: 'sum.1' },
        { say: 'Then multiply them. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
