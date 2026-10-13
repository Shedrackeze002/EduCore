import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

/** The marks of an imperial ruler (in sixteenths, up to `inches`) that are whole multiples of `step` sixteenths but not of twice that. */
const marks = (el: string, step: number, inches = 4) => {
  const ids: string[] = [];
  for (let i = 0; i <= inches * 16; i += step) if (step === 16 || i % (2 * step) !== 0) ids.push(`${el}.t${i}`);
  return ids;
};

const video: Explainer = {
  id: 'm10c-1-2',
  lessonId: 'm10c-1-2',
  title: 'Measuring with Rulers and Calipers, Part 1: Reading Rulers',
  thumbnailTitle: 'Reading Rulers',
  thumbnail: 'imp',
  summary: 'Precision, and how to read metric rulers to the nearest millimetre and imperial rulers to the nearest sixteenth of an inch, including objects that do not start at zero. Part 2 reads a vernier caliper and measures curved lengths.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.2 · Part 1', title: 'Reading Rulers', subtitle: 'Metric and imperial, read precisely' }],
      lines: [
        { say: 'Estimates are useful, but carpenters, machinists and scientists need precise measurements.', show: 'title' },
        { say: 'In this video, you will read metric and imperial rulers accurately. In part two, we use a vernier caliper, and measure lengths that are not straight.' },
      ],
    },
    {
      chapter: 'Precision',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Precision', md: 'The **precision** of a measurement depends on the **smallest unit** the instrument shows.' },
        { kind: 'text', id: 'eg', md: '$7.4\\text{ cm}$ (to the nearest mm) is more precise than $7\\text{ cm}$ (to the nearest cm).', size: 'lg' },
      ],
      lines: [
        { say: 'The precision of a measurement depends on the smallest unit the instrument shows.', show: 'def' },
        { say: 'A ruler marked in millimetres is more precise than one marked only in centimetres. So 7.4 centimetres, to the nearest millimetre, is more precise than 7 centimetres, to the nearest centimetre.', show: 'eg' },
        { say: 'The more precise the instrument, the smaller the possible error.' },
      ],
    },
    {
      chapter: 'A metric ruler',
      layout: 'center',
      main: [
        figure('cm', [ruler({ system: 'metric', length: 10, start: 0, end: 6.3, reading: '6.3\\text{ cm}' })]),
        { kind: 'math', id: 'm', lines: ['6.3\\text{ cm} = 63\\text{ mm}'] },
      ],
      lines: [
        { say: 'On a metric ruler, the numbered marks are centimetres, and each small division is one millimetre, or 0.1 centimetres.', show: 'cm.scale', focus: ['cm.t1', 'cm.t2', 'cm.t3'] },
        { say: 'The longer mark halfway between two numbers is half a centimetre, or five millimetres.', focus: ['cm.t5', 'cm.t15', 'cm.t25'] },
        { say: 'This bar starts at zero, and ends three small divisions past the six.', show: ['cm.bar', 'cm.start', 'cm.end'], focus: ['cm.t60', 'cm.t61', 'cm.t62', 'cm.t63'] },
        { say: 'So its length is 6.3 centimetres, which is 63 millimetres.', show: ['cm.reading', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Not starting at zero',
      layout: 'center',
      main: [
        figure('cm', [ruler({ system: 'metric', length: 10, start: 1.8, end: 9.5, startReading: '1.8', reading: '9.5' })]),
        { kind: 'math', id: 'm', lines: ['\\text{length} = \\text{end} - \\text{start}', '9.5 - 1.8 = 7.7\\text{ cm} = 77\\text{ mm}'] },
      ],
      lines: [
        { say: 'An object does not have to start at zero. This bar starts at the 1.8 centimetre mark, and ends at the 9.5 centimetre mark.', show: ['cm.scale', 'cm.bar', 'cm.start', 'cm.end', 'cm.start-reading', 'cm.reading'] },
        { say: 'To find its length, subtract the starting reading from the ending reading.', show: 'm.0', focus: 'm.0' },
        { say: '9.5 minus 1.8 is 7.7, so the bar is 7.7 centimetres, or 77 millimetres, long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'An imperial ruler',
      layout: 'center',
      main: [
        figure('imp', [ruler({ system: 'imperial', length: 4 })]),
        {
          kind: 'bullets',
          id: 'kinds',
          items: ['The longest marks are **whole inches**,', 'then the $\\tfrac12$ inch, then the $\\tfrac14$ marks,', 'then the $\\tfrac18$ marks. The shortest are the $\\tfrac1{16}$ marks.'],
        },
      ],
      lines: [
        { say: 'An imperial ruler divides each inch into halves, quarters, eighths, and often sixteenths. The smaller the division, the shorter the mark.', show: 'imp.scale' },
        { say: 'The longest marks are the whole inches.', show: 'kinds.0', focus: marks('imp', 16) },
        { say: 'Next longest is the half inch mark, then the quarter inch marks,', show: 'kinds.1', focus: [...marks('imp', 8), ...marks('imp', 4)] },
        { say: 'then the eighths,', show: 'kinds.2', focus: marks('imp', 2) },
        { say: 'and the shortest marks are the sixteenths.', focus: marks('imp', 1) },
      ],
    },
    {
      chapter: 'Reading to a sixteenth',
      layout: 'center',
      main: [
        figure('imp', [ruler({ system: 'imperial', length: 4, start: 0, end: 2 + 11 / 16, reading: '2\\tfrac{11}{16}\\text{ in}' })]),
        { kind: 'math', id: 'm', lines: ['2 + \\tfrac{11}{16} = 2\\tfrac{11}{16}\\text{ in}'] },
      ],
      lines: [
        { say: 'To read an imperial length, count the whole inches, then count the small spaces past the last whole inch, and write the fraction in lowest terms.', show: ['imp.scale', 'imp.bar', 'imp.start', 'imp.end'] },
        { say: 'This bar passes the two inch mark,', focus: 'imp.t32' },
        { say: 'and ends eleven sixteenths further on.', focus: ['imp.t33', 'imp.t34', 'imp.t35', 'imp.t36', 'imp.t37', 'imp.t38', 'imp.t39', 'imp.t40', 'imp.t41', 'imp.t42', 'imp.t43'] },
        { say: 'So its length is two and eleven sixteenths inches. Eleven sixteenths is already in lowest terms.', show: ['imp.reading', 'm.0'], focus: 'm.0' },
      ],
    },
    {
      chapter: 'Simplify the fraction',
      layout: 'center',
      main: [
        figure('imp', [ruler({ system: 'imperial', length: 4, start: 0, end: 3.75, reading: '3\\tfrac34\\text{ in}' })]),
        { kind: 'math', id: 'm', lines: ['3\\tfrac{12}{16} = 3\\tfrac{3}{4}\\text{ in}'] },
      ],
      lines: [
        { say: 'This bar ends twelve sixteenths past the three inch mark, so it is three and twelve sixteenths inches long.', show: ['imp.scale', 'imp.bar', 'imp.start', 'imp.end'], focus: 'imp.t60' },
        { say: 'But twelve sixteenths simplifies to three quarters. So the length is three and three quarter inches, and that is how a carpenter would say it.', show: ['m.0', 'imp.reading'], focus: 'm.0' },
        { say: 'Notice that the bar ends at a quarter inch mark, which is longer than a sixteenth mark. The length of the mark is a quick clue to the simplest fraction.', focus: 'imp.t60' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bar ends 6 sixteenths past the 1 inch mark. How long is it, in lowest terms?',
          choices: ['$1\\dfrac{6}{16}$ in', '$1\\dfrac{3}{8}$ in', '$1\\dfrac{1}{4}$ in', '$1\\dfrac{3}{16}$ in'],
          answer: 1,
          working: '$\\dfrac{6}{16} = \\dfrac{3}{8}$ (divide both by 2), so the bar is $1\\dfrac{3}{8}$ in long.',
        },
      ],
      lines: [
        { say: 'Your turn. A bar ends six sixteenths past the one inch mark. How long is it, in lowest terms? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B. Six sixteenths simplifies to three eighths, by dividing the top and bottom by two. So the bar is one and three eighths inches long. A is the same length, but not in lowest terms.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'sum',
          check: true,
          items: [
            'Precision depends on the smallest unit the instrument shows.',
            'Metric: numbers are centimetres; each small division is $1\\text{ mm} = 0.1\\text{ cm}$.',
            'Length = end − start, when an object does not start at 0.',
            'Imperial: count whole inches, then sixteenths; write the fraction in lowest terms.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. Precision depends on the smallest unit the instrument shows.", show: 'sum.0' },
        { say: 'On a metric ruler, the numbers are centimetres, and each small division is a millimetre.', show: 'sum.1' },
        { say: 'If an object does not start at zero, subtract: the end reading minus the start reading.', show: 'sum.2' },
        { say: 'On an imperial ruler, count the whole inches, then the sixteenths, and write the fraction in lowest terms. In part two, we read a vernier caliper. See you there!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
