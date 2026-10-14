import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

/** The 8 × 12 enlargement of a 4 × 6 photo, dashed over an 8 × 10 print: the top 2 in is cut off. */
const enlarged: Part = {
  points: { e0: [8, 0], e1: [16, 0], e2: [16, 12], e3: [8, 12] },
  items: [
    { kind: 'line', id: 'e-right', from: 'e1', to: 'e2', tone: 'bad', dashed: true, group: 'big' },
    { kind: 'line', id: 'e-top', from: 'e2', to: 'e3', tone: 'bad', dashed: true, label: '8 \\times 12', labelSide: 'right', group: 'big' },
    { kind: 'line', id: 'e-left', from: 'e3', to: 'e0', tone: 'bad', dashed: true, group: 'big' },
  ],
};

const video: Explainer = {
  id: 'm103-7-3-b',
  lessonId: 'm103-7-3',
  title: 'Similar Polygons, Part 2: The Scale Factor',
  thumbnailTitle: 'The Scale Factor',
  thumbnail: 'photo',
  summary: 'Whether a photo can be enlarged to a print size without cropping, the scale factor k = new ÷ original, enlargements and reductions, a 1:24 scale model truck, and putting the new figure on top.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 7.3 · Part 2', title: 'The Scale Factor', subtitle: 'Enlargements and reductions' }],
      lines: [
        { say: 'Why does a print shop crop your photo when you order an eight-by-ten print? Because the shapes are not similar.', show: 'title' },
        { say: 'In this video, you will compare sizes, and find the scale factor of an enlargement or a reduction.' },
      ],
    },
    {
      chapter: 'The photo that will not fit',
      layout: 'split',
      leftWidth: 480,
      left: [
        figure('ph', [
          rectangle({ name: 'p', w: 4, h: 6, labels: { w: '4\\text{ in}', h: '6\\text{ in}' } }),
          rectangle({ name: 'q', at: [8, 0], w: 8, h: 10, labels: { w: '8\\text{ in}', h: '10\\text{ in}' } }),
          enlarged,
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{short: } \\tfrac{8}{4} = 2', '\\text{long: } \\tfrac{10}{6} \\approx 1.67', '\\tfrac{8}{4} = \\tfrac{12}{6} = 2 \\;\\to\\; 8 \\times 12'] }],
      lines: [
        { say: 'Can a four-by-six-inch photo be enlarged to an eight-by-ten print, without cutting anything off?', show: ['ph.p-shape', 'ph.q-shape'] },
        { say: 'Short sides: eight over four is two. Long sides: ten over six is about 1.67.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
        { say: 'The ratios are different, so the shapes are not similar, and part of the photo must be cropped.' },
        { say: 'An eight-by-twelve print is similar, because both ratios are two. On an eight-by-ten print, the top two inches are cut off.', show: ['ph.big', 'm.2'], focus: ['ph.big', 'm.2'] },
      ],
    },
    {
      chapter: 'The scale factor',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Scale factor', md: '$k = \\dfrac{\\text{new length}}{\\text{original length}}$. If $k > 1$, it is an **enlargement**. If $k < 1$, it is a **reduction**.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['k = \\tfrac{12.5}{5} = 2.5', '\\tfrac{17.5}{7} = 2.5 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'The scale factor, k, tells how many times as long each side of the new figure is. It is the new length over the original length.', show: 'def' },
        { say: 'If k is greater than one, the new figure is an enlargement. If k is less than one, it is a reduction. And if k is one, it is the same size.' },
        { say: 'A triangle with sides of five, seven and nine centimetres is enlarged to sides of 12.5, 17.5 and 22.5. The scale factor is 12.5 over five: 2.5.', show: 'm.0', focus: 'm.0' },
        { say: 'Check another pair: 17.5 over seven is also 2.5. It is greater than one, so this is an enlargement.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A scale model',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4.44\\text{ m} = 444\\text{ cm}', 'k = \\tfrac{18.5}{444} = \\tfrac{1}{24}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'Put the **new** figure on top. A sign reduced from $15\\text{ cm}$ to $6\\text{ cm}$ has $k = \\tfrac{6}{15} = 0.4$, not $2.5$.' },
      ],
      lines: [
        { say: 'A model pickup truck is 18.5 centimetres long. The real truck is 4.44 metres long. First, use the same units: 4.44 metres is 444 centimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'The scale factor is 18.5 over 444. And 444 divided by 18.5 is 24, so k is one twenty-fourth: a reduction. The model is labelled one to 24.', show: 'm.1', focus: 'm.1' },
        { say: 'Always put the new figure on top. A sign reduced from fifteen centimetres to six has a scale factor of six over fifteen, 0.4. A reduction must have a scale factor less than one.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A logo $20\\text{ cm}$ wide is printed $5\\text{ cm}$ wide on a business card. What is the scale factor?',
          choices: ['$0.25$', '$4$', '$15$', '$0.5$'],
          answer: 0,
          working: '$k = \\dfrac{\\text{new}}{\\text{original}} = \\dfrac{5}{20} = 0.25$, a reduction.',
        },
      ],
      lines: [
        { say: 'Your turn. A logo twenty centimetres wide is printed five centimetres wide on a business card. What is the scale factor? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The new length over the original length is five over twenty: 0.25, a reduction. B divides the wrong way.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Scale factor $k = \\dfrac{\\text{new}}{\\text{original}}$.', '$k > 1$: enlargement. $k < 1$: reduction.', 'Use the same units before you divide.'] }],
      lines: [
        { say: 'Let’s sum up. The scale factor is the new length over the original length.', show: 'sum.0' },
        { say: 'If it is greater than one, the figure is enlarged. If it is less than one, it is reduced.', show: 'sum.1' },
        { say: 'And put both lengths in the same unit before you divide. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
