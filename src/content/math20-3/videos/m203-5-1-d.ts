import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-5-1-d',
  lessonId: 'm203-5-1',
  title: 'Scale Drawings and Models, Part 4: Area and Volume with a Scale Factor',
  thumbnailTitle: 'Area and Volume at Scale',
  thumbnail: 'm',
  summary: 'Why areas grow by k² and volumes by k³: a sign 2.5 times as long in every direction (7.5 m²), a 1 : 50 model grain bin holding 1600 cm³ (200 m³ in real life), and working back from a volume ratio of 3.375 to k = 1.5.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 5.1 · Part 4', title: 'Area and Volume at Scale', subtitle: 'k, k squared, k cubed' }],
      lines: [
        { say: 'If you double every length of a patio, do you need twice as many paving stones? No: you need four times as many. Areas and volumes grow faster than lengths.', show: 'title' },
        { say: 'In this video, you will use a scale factor to find areas and volumes.' },
      ],
    },
    {
      chapter: 'k squared and k cubed',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['Lengths are multiplied by $k$.', '**Area** is multiplied by $k^2$: both the length and the width grow.', '**Volume** and **capacity** are multiplied by $k^3$: the length, width and height all grow.'] }],
      lines: [
        { say: 'When every length is multiplied by k, lengths, of course, are multiplied by k.', show: 'b.0' },
        { say: 'Area is multiplied by k squared, because both the length and the width grow. Double every length, and the area is four times as large.', show: 'b.1' },
        { say: 'And volume and capacity are multiplied by k cubed, because the length, width and height all grow. Double every length, and a tank holds eight times as much.', show: 'b.2' },
      ],
    },
    {
      chapter: 'A bigger sign',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^2 = 2.5^2 = 6.25', '1.2 \\times 6.25 = 7.5 \\text{ m}^2'] }],
      lines: [
        { say: 'A sign has an area of 1.2 square metres. A new sign with the same shape has every length 2.5 times as long. What is its area? Area is multiplied by k squared: 2.5 squared is 6.25.', show: 'm.0', focus: 'm.0' },
        { say: '1.2 times 6.25 is 7.5. The new sign has an area of 7.5 square metres, not three.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A model grain bin',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^3 = 50^3 = 125\\,000', '1600 \\times 125\\,000 = 200\\,000\\,000 \\text{ cm}^3', '200\\,000\\,000 \\div 1\\,000\\,000 = 200 \\text{ m}^3'] }],
      lines: [
        { say: 'A one to fifty model of a grain bin holds 1,600 cubic centimetres. How many cubic metres does the real bin hold? The scale factor is fifty, so volume is multiplied by fifty cubed: 125,000.', show: 'm.0', focus: 'm.0' },
        { say: '1,600 times 125,000 is 200 million cubic centimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'One cubic metre is 100 times 100 times 100, a million cubic centimetres. So the real bin holds 200 cubic metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['k^3 = 3.375 \\;\\Rightarrow\\; k = \\sqrt[3]{3.375} = 1.5', '1.2 \\times 1.5 = 1.8 \\text{ m}'] }],
      lines: [
        { say: 'You can also work backward. Two water tanks have the same shape. The larger one holds 3.375 times as much as the smaller one, which is 1.2 metres tall. How tall is the larger tank? The volume ratio is k cubed, so k is the cube root of 3.375: 1.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Height is a length, so multiply by k: 1.2 times 1.5. The larger tank is 1.8 metres tall.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A patio is redesigned with every length $3$ times as long. The old patio used $40$ paving stones. About how many does the new patio need?',
          choices: ['$360$', '$120$', '$1080$', '$43$'],
          answer: 0,
          working: 'Area is multiplied by $k^2 = 3^2 = 9$, so it needs about $40 \\times 9 = 360$ stones. B multiplies by $k$, and C by $k^3$.',
        },
      ],
      lines: [
        { say: 'Your turn. A patio is redesigned with every length three times as long. The old patio used forty paving stones. About how many does the new patio need? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Paving stones cover an area, which is multiplied by three squared, nine. Forty times nine is 360 stones. B multiplies by k, and C by k cubed.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Lengths × $k$, areas × $k^2$, volumes × $k^3$.', 'Convert cubic units with the cube of the factor.', 'From an area ratio, take a square root; from a volume ratio, a cube root.'] }],
      lines: [
        { say: 'Let’s sum up. Lengths are multiplied by k, areas by k squared, and volumes by k cubed.', show: 'sum.0' },
        { say: 'Convert cubic units with the cube of the length factor.', show: 'sum.1' },
        { say: 'And to find k from an area ratio, take a square root; from a volume ratio, a cube root. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
