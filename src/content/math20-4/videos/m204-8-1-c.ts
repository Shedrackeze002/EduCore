import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-8-1-c',
  lessonId: 'm204-8-1',
  title: 'Scale Drawings, Part 3: Ratio Scales',
  thumbnailTitle: 'Ratio Scales',
  thumbnail: 'm',
  summary: 'Ratio scales like 1 : 50 (1 cm on the plan is 50 cm in real life), a kitchen wall of 7.2 cm on the plan as 360 cm or 3.6 m, and going from a real length to the drawing by dividing (a 4.5 m fence is 9 cm on the plan).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 8.1 · Part 3', title: 'Ratio Scales', subtitle: '1 : 50' }],
      lines: [
        { say: 'Architects often write a scale as a ratio, like one to fifty, with no units at all. It means the same thing, in a shorter way.', show: 'title' },
        { say: 'In this video, you will use ratio scales, and go from a real length back to the drawing.' },
      ],
    },
    {
      chapter: 'Ratio scales',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Ratio scale', md: 'A scale can be a **ratio**, like $1 : 50$. It means $1$ unit on the drawing is $50$ of the **same** unit in real life. So $1$ cm on the plan is $50$ cm in real life.' }],
      lines: [
        { say: 'A scale can also be a ratio, like one to fifty. It means one unit on the drawing is fifty of the same unit in real life. So one centimetre on the plan is fifty centimetres in real life, and one millimetre is fifty millimetres.', show: 'def' },
      ],
    },
    {
      chapter: 'A kitchen wall',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A kitchen plan uses a scale of $1 : 50$. A wall is $7.2$ cm long on the plan.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['7.2 \\times 50 = 360 \\text{ cm}', '360 \\div 100 = 3.6 \\text{ m}'] },
      ],
      lines: [
        { say: 'A kitchen plan uses a scale of one to fifty. A wall is 7.2 centimetres long on the plan. How long is the real wall, in metres?', show: 'q' },
        { say: 'Multiply by fifty: 7.2 times fifty is 360. The units stay the same, so the wall is 360 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'There are 100 centimetres in a metre, so divide by 100: 3.6 metres.', show: 'm.1', focus: 'm.1' },
        { say: 'A common mistake is to stop at 360 and call it metres. A kitchen wall 360 metres long would be longer than three football fields!' },
      ],
    },
    {
      chapter: 'From real to drawing',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'On a yard plan, $1$ cm represents $0.5$ m. A real fence is $4.5$ m long.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['4.5 \\div 0.5 = 9 \\text{ cm}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check the size', md: 'A drawing is smaller than the real thing. If your real length comes out smaller than the drawing, you divided when you should have multiplied.' },
      ],
      lines: [
        { say: 'To go the other way, from a real length to the drawing, divide by the scale. On a yard plan, one centimetre represents 0.5 metres. A real fence is 4.5 metres long. How long is it on the plan?', show: 'q' },
        { say: '4.5 divided by 0.5 is nine. The fence is nine centimetres long on the plan.', show: 'm', focus: 'm' },
        { say: 'Check the size. A drawing is smaller than the real thing. If a real length comes out smaller than the drawing, you divided when you should have multiplied.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A deck plan uses a scale of $1 : 40$. The deck is $9$ cm long on the plan. How long is the real deck, in metres?',
          choices: ['$3.6$ m', '$360$ m', '$0.225$ m', '$36$ m'],
          answer: 0,
          working: '$9 \\times 40 = 360$ cm, and $360 \\div 100 = 3.6$ m. B forgets to change centimetres to metres, and C divides.',
        },
      ],
      lines: [
        { say: 'Your turn. A deck plan uses a scale of one to forty. The deck is nine centimetres long on the plan. How long is the real deck, in metres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Nine times forty is 360 centimetres, and 360 divided by 100 is 3.6 metres. B forgets to change centimetres to metres, and C divides by the scale.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['1 : 50 means 1 cm on the drawing is 50 cm in real life.', 'Divide centimetres by 100 to get metres.', 'Real to drawing: divide by the scale.'] }],
      lines: [
        { say: 'Let’s sum up. One to fifty means one centimetre on the drawing is fifty centimetres in real life.', show: 'sum.0' },
        { say: 'Divide centimetres by 100 to get metres.', show: 'sum.1' },
        { say: 'And to go from a real length to the drawing, divide by the scale. In part four, we find the scale itself. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
