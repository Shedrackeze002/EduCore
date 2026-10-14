import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm103-4-1',
  lessonId: 'm103-4-1',
  title: 'Rulers and Tape Measures, Part 1: Precision and Metric Rulers',
  thumbnailTitle: 'Reading a Metric Ruler',
  thumbnail: 'cm',
  summary: 'Precision set by the smallest mark, tape measures and burning an inch, reading a metric ruler in centimetres and millimetres, and measuring a part that does not start at zero. Part 2 reads imperial rulers to the sixteenth of an inch.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.1 · Part 1', title: 'Precision and Metric Rulers', subtitle: 'Reading a measurement correctly' }],
      lines: [
        { say: 'A cabinet door cut three millimetres too wide will not close. A copper pipe cut a quarter inch too short will leak at the fitting.', show: 'title' },
        { say: 'On a job site, reading a ruler or tape quickly and correctly saves time, money and material. In this video, you will read metric rulers. In part two, imperial ones.' },
      ],
    },
    {
      chapter: 'Precision',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precision', md: 'The size of the smallest unit you can read on the tool. A ruler marked in millimetres is more precise than one marked only in centimetres.' },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Burn an inch', md: 'If the end of a tape is worn, start at the $1$ in mark (or the $10$ cm mark), then subtract that amount from your reading.' },
      ],
      lines: [
        { say: 'Every measuring tool has a smallest mark, and that sets how exact your reading can be. This is the precision of the measurement. A ruler marked in millimetres is more precise than one marked only in centimetres.', show: 'def' },
        { say: 'A tape measure is a long, flexible ruler that rolls into a case. Most tapes sold in Canada show centimetres on one edge, and inches on the other. Its metal hook slides a little to allow for its own thickness, so do not bend it.' },
        { say: 'If the end of a tape is worn, start your measurement at the one-inch mark, or the ten-centimetre mark, then subtract that amount from your reading. Carpenters call this burning an inch.', show: 'tip' },
      ],
    },
    {
      chapter: 'A metric ruler',
      layout: 'center',
      main: [
        figure('cm', [ruler({ system: 'metric', length: 10, start: 0, end: 6.3, reading: '6.3\\text{ cm}' })]),
        { kind: 'math', id: 'm', lines: ['6.3\\text{ cm} = 6.3 \\times 10 = 63\\text{ mm}'] },
      ],
      lines: [
        { say: 'On a metric ruler, the numbered marks are centimetres. There are ten small spaces between the numbers, so each small mark is one millimetre, or 0.1 centimetres. The halfway mark is a little longer, to help you count.', show: 'cm.scale', focus: ['cm.t1', 'cm.t2', 'cm.t5'] },
        { say: 'This bar starts at zero. Its right end is three small marks past the six.', show: ['cm.bar', 'cm.start', 'cm.end'], focus: ['cm.t61', 'cm.t62', 'cm.t63'] },
        { say: 'So it is 6.3 centimetres long. In millimetres, multiply by ten: 63 millimetres.', show: ['cm.reading', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Not starting at zero',
      layout: 'center',
      main: [
        figure('bolt', [ruler({ system: 'metric', length: 10, start: 2.4, end: 9.1, startReading: '2.4', reading: '9.1' })]),
        { kind: 'math', id: 'm', lines: ['9.1 - 2.4 = 6.7\\text{ cm} = 67\\text{ mm}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Reading only the end mark', md: 'The bolt is **not** $9.1\\text{ cm}$ long. Always subtract the starting mark: length $=$ end $-$ start.' },
      ],
      lines: [
        { say: 'When a part does not start at zero, read both ends and subtract. A bolt lies along a ruler from the 2.4 centimetre mark to the 9.1 centimetre mark.', show: ['bolt.scale', 'bolt.bar', 'bolt.start', 'bolt.end', 'bolt.start-reading', 'bolt.reading'] },
        { say: 'The length is the end minus the start: 9.1 minus 2.4 is 6.7 centimetres, or 67 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Do not just read the end mark. The bolt is not 9.1 centimetres long.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A washer lies along a ruler from the $3.7\\text{ cm}$ mark to the $5.2\\text{ cm}$ mark. How wide is it, in millimetres?',
          choices: ['$15\\text{ mm}$', '$52\\text{ mm}$', '$1.5\\text{ mm}$', '$89\\text{ mm}$'],
          answer: 0,
          working: '$5.2 - 3.7 = 1.5\\text{ cm}$, and $1.5 \\times 10 = 15\\text{ mm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A washer lies along a ruler from the 3.7 centimetre mark to the 5.2 centimetre mark. How wide is it, in millimetres? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 5.2 minus 3.7 is 1.5 centimetres, and 1.5 times ten is fifteen millimetres. B only reads the end mark.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Precision is set by the smallest mark on the tool.', 'Each small metric mark is $1\\text{ mm} = 0.1\\text{ cm}$.', 'Length = end − start.'] }],
      lines: [
        { say: 'Let’s sum up. Precision is set by the smallest mark on the tool.', show: 'sum.0' },
        { say: 'On a metric ruler, each small mark is one millimetre, or 0.1 centimetres.', show: 'sum.1' },
        { say: 'And when a part does not start at zero, the length is the end minus the start. In part two, we read imperial rulers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
