import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-5-1-b',
  lessonId: 'm203-5-1',
  title: 'Scale Drawings and Models, Part 2: Drawing Lengths and Imperial Scales',
  thumbnailTitle: 'Drawing to Scale',
  thumbnail: 'm',
  summary: 'Dividing to go from real life to a drawing (a 7.5 m wall drawn 15 cm long when 1 cm represents 0.5 m), the architect’s scale ¼ in : 1 ft (an 18 ft deck drawn 4½ in long), and turning a two-unit scale into the ratio 1 : 48.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.1 · Part 2', title: 'Drawing to Scale', subtitle: 'From real life to the drawing' }],
      lines: [
        { say: 'Before anything is built, someone has to draw it. To make a plan, you turn real lengths into drawing lengths.', show: 'title' },
        { say: 'In this video, you will draw lengths to scale, and use the imperial scales that builders use.' },
      ],
    },
    {
      chapter: 'Drawing a garage wall',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['1 \\text{ cm} \\to 0.5 \\text{ m}', '7.5 \\div 0.5 = 15', '\\text{draw } 15 \\text{ cm}'] }],
      lines: [
        { say: 'To go from real life to the drawing, divide by what one drawing unit stands for. Noor is drawing a garage plan where one centimetre represents half a metre.', show: 'm.0', focus: 'm.0' },
        { say: 'The back wall is 7.5 metres long. How many groups of half a metre fit in 7.5 metres? 7.5 divided by 0.5 is fifteen.', show: 'm.1', focus: 'm.1' },
        { say: 'So Noor draws the wall fifteen centimetres long. Check: fifteen centimetres, each worth half a metre, is 7.5 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Imperial scales',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac14 \\text{ in} : 1 \\text{ ft}', '18 \\times \\tfrac14 = 4\\tfrac12', '\\text{draw } 4\\tfrac12 \\text{ in}'] }],
      lines: [
        { say: 'Builders and architects often use imperial scales, like a quarter inch to one foot: every quarter inch on the drawing is one foot on the building.', show: 'm.0', focus: 'm.0' },
        { say: 'A deck plan uses this scale, and the deck is eighteen feet long. Each foot is drawn a quarter inch long, so multiply: eighteen times one quarter is four and a half.', show: 'm.1', focus: 'm.1' },
        { say: 'The deck is four and a half inches long on the plan.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A two-unit scale as a ratio',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\tfrac14 \\text{ in} : 1 \\text{ ft} = \\tfrac14 \\text{ in} : 12 \\text{ in}', '= 1 : 48'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Same unit, then simplify', md: 'Write both parts in the same unit, then multiply to clear the fraction. Real lengths are $48$ times the drawing lengths.' },
      ],
      lines: [
        { say: 'You can turn a two-unit scale into a ratio. One foot is twelve inches, so a quarter inch to one foot is a quarter inch to twelve inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiply both parts by four: one to forty-eight. Real lengths are forty-eight times the drawing lengths. Check with the deck: four and a half inches times forty-eight is 216 inches, which is eighteen feet.', show: ['m.1', 'tip'], focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A plan uses the scale $1$ cm represents $2$ m. A fence is $13$ m long. How long should it be drawn?',
          choices: ['$6.5$ cm', '$26$ cm', '$15$ cm', '$0.65$ cm'],
          answer: 0,
          working: 'From real life to the drawing, divide: $13 \\div 2 = 6.5$ cm. B multiplies instead.',
        },
      ],
      lines: [
        { say: 'Your turn. A plan uses the scale one centimetre represents two metres. A fence is thirteen metres long. How long should it be drawn? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Going from real life to the drawing, divide: thirteen divided by two is 6.5 centimetres. B multiplies instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Real life to drawing: divide.', '$\\tfrac14$ in : $1$ ft means each foot is drawn a quarter inch long.', 'Same unit, then simplify: $\\tfrac14$ in : $1$ ft $= 1 : 48$.'] }],
      lines: [
        { say: 'Let’s sum up. To go from real life to the drawing, divide.', show: 'sum.0' },
        { say: 'A quarter inch to one foot means each foot is drawn a quarter inch long.', show: 'sum.1' },
        { say: 'And to turn a two-unit scale into a ratio, write both parts in the same unit, then simplify. In part three, we find the scale of a model. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
