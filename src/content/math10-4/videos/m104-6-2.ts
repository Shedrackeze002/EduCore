import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-6-2',
  lessonId: 'm104-6-2',
  title: 'Reading Rulers',
  thumbnailTitle: 'Reading Rulers',
  thumbnail: 'mm',
  summary: 'Reading a metric ruler to the millimetre, an imperial ruler to the eighth and sixteenth of an inch (simplifying the fraction), measuring when an object does not start at zero (end − start), and how much to cut off a piece of trim.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 6.2', title: 'Reading Rulers', subtitle: 'Millimetres and fractions of an inch' }],
      lines: [
        { say: 'A cut that is a few millimetres off can waste a whole board.', show: 'title' },
        { say: 'In this video, you will read metric and imperial rulers carefully.' },
      ],
    },
    {
      chapter: 'A metric ruler',
      layout: 'center',
      main: [
        figure('mm', [ruler({ system: 'metric', length: 10, start: 0, end: 4.7, reading: '4.7\\text{ cm}' })], 260),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Starting at the end of the ruler', md: 'Most rulers have a little space before the $0$. Line up the object with **$0$**, not with the end of the ruler.' },
      ],
      lines: [
        { say: 'A metric ruler shows centimetres, and each centimetre is split into ten small spaces. Each small space is a millimetre: ten millimetres make a centimetre.', show: 'mm.scale' },
        { say: 'This bar starts at zero, and its right end is past the four. Count the small marks after four: seven. So the bar is 4.7 centimetres, or 47 millimetres, long.', show: ['mm.bar', 'mm.reading'] },
        { say: 'The longer middle mark in each centimetre shows five millimetres, so you do not have to count from the start.' },
        { say: 'Most rulers have a little space before the zero, so always line up the object with zero, not with the end of the ruler.', show: 'oops' },
      ],
    },
    {
      chapter: 'An imperial ruler',
      layout: 'center',
      main: [
        figure('in', [ruler({ system: 'imperial', length: 4, start: 0, end: 2.625, division: 8, reading: '2\\tfrac{5}{8}\\text{ in}' })], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['1\\tfrac{4}{16} = 1\\tfrac{1}{4}\\text{ in}'] },
      ],
      lines: [
        { say: 'Many tools in Canada still use inches. An inch is about 2.5 centimetres, and it is split into equal parts: the longer the mark, the bigger the fraction.', show: 'in.scale' },
        { say: 'On this ruler, each inch has eight spaces. The bar ends five spaces past the two, and each space is one eighth of an inch. So it is two and five eighths inches long.', show: ['in.bar', 'in.reading'] },
        { say: 'On a ruler with sixteen spaces in each inch, a bolt ends four spaces past the one. That is one and four sixteenths, which simplifies to one and a quarter inches.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Not starting at zero',
      layout: 'center',
      main: [
        figure('mid', [ruler({ system: 'metric', length: 12, start: 2, end: 6.3, startReading: '2', reading: '6.3' })], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{length} = 6.3 - 2 = 4.3\\text{ cm}'] },
      ],
      lines: [
        { say: 'Sometimes the end of a tape is bent, or the object sits in the middle of the ruler. Then read both ends and subtract: the length is the end, minus the start.', show: ['mid.scale', 'mid.bar'] },
        { say: 'This bar starts at two centimetres and ends at 6.3. So it is 6.3 minus two: 4.3 centimetres long, not 6.3.', show: ['mid.start-reading', 'mid.reading', 'm.0'], focus: 'm.0' },
        { say: 'Carpenters sometimes start at the one-inch mark, because the hook on a tape can wobble. Just remember to take away that inch at the end.' },
      ],
    },
    {
      chapter: 'Measuring to cut',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3\\tfrac{7}{8} - 3\\tfrac{1}{2} = 3\\tfrac{7}{8} - 3\\tfrac{4}{8} = \\tfrac{3}{8}\\text{ in}'] }],
      lines: [
        { say: 'A piece of trim measures three and seven eighths inches, and it needs to be three and a half. How much should be cut off?', show: 'm.0' },
        { say: 'Write both in eighths: a half is four eighths. Seven eighths minus four eighths: cut off three eighths of an inch.', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'On a ruler with $16$ spaces in each inch, a screw ends $6$ spaces past the $1$-inch mark. How long is it?',
          choices: ['$1\\tfrac{3}{8}$ in', '$1\\tfrac{6}{8}$ in', '$1\\tfrac{1}{6}$ in', '$7$ in'],
          answer: 0,
          working: '$1\\tfrac{6}{16}$ in, and $\\tfrac{6}{16} = \\tfrac{3}{8}$, so the screw is $1\\tfrac{3}{8}$ in long.',
        },
      ],
      lines: [
        { say: 'Your turn. On a ruler with sixteen spaces in each inch, a screw ends six spaces past the one-inch mark. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six spaces is six sixteenths, which simplifies to three eighths: one and three eighths inches. B counts the spaces as eighths.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Metric: each small space is $1\\text{ mm}$, and $10\\text{ mm} = 1\\text{ cm}$.', 'Imperial: count the spaces past the inch, then simplify.', 'Not at zero? Length = end − start.'] }],
      lines: [
        { say: 'Let’s sum up. On a metric ruler, each small space is a millimetre, and ten millimetres make a centimetre.', show: 'sum.0' },
        { say: 'On an imperial ruler, count the spaces after the last whole inch, and simplify the fraction.', show: 'sum.1' },
        { say: 'And if the object does not start at zero, the length is the end minus the start. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
