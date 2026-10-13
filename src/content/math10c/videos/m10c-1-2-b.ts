import type { Explainer } from '@/video/script.ts';
import { circle, vernier } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm10c-1-2-b',
  lessonId: 'm10c-1-2',
  title: 'Measuring with Rulers and Calipers, Part 2: The Vernier Caliper and Curved Lengths',
  thumbnailTitle: 'The Vernier Caliper',
  thumbnail: 'cal',
  summary: 'How to read a vernier caliper to the nearest tenth of a millimetre, and three strategies for measuring lengths that are not straight, including finding a diameter from a circumference with C = πd.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10C · Lesson 1.2 · Part 2', title: 'The Vernier Caliper', subtitle: 'And measuring lengths that are not straight' }],
      lines: [
        { say: 'A ruler measures to the nearest millimetre. To measure more precisely, machinists and scientists use a vernier caliper.', show: 'title' },
        { say: 'In this video, you will read a vernier caliper, and learn how to measure lengths that are not straight.' },
      ],
    },
    {
      chapter: 'Two scales',
      layout: 'center',
      main: [
        figure('cal', [vernier({ reading: 23.7 })]),
        { kind: 'bullets', id: 'parts', items: ['**Main scale:** fixed, marked in millimetres and numbered in centimetres', '**Vernier scale:** slides along it, with 10 divisions'] },
      ],
      lines: [
        { say: 'A vernier caliper measures lengths, and outside and inside diameters, to the nearest tenth of a millimetre.' },
        { say: 'It has a fixed main scale in millimetres, numbered in centimetres,', show: ['cal.main', 'parts.0'] },
        { say: 'and a vernier scale that slides along it. The vernier scale has ten divisions.', show: ['cal.vernier', 'parts.1'] },
      ],
    },
    {
      chapter: 'Reading a vernier caliper',
      layout: 'center',
      main: [
        figure('cal', [vernier({ reading: 23.7 })], 300),
        {
          kind: 'math',
          id: 'm',
          size: 'md',
          lines: ['\\text{main scale at the vernier 0: } 23\\text{ mm}', '\\text{vernier mark that lines up: } 7 \\times 0.1 = 0.7\\text{ mm}', '23 + 0.7 = 23.7\\text{ mm} = 2.37\\text{ cm}'],
        },
      ],
      lines: [
        { say: 'Step one. Find the zero of the vernier scale, and read the main scale there.', show: ['cal.main', 'cal.vernier', 'cal.zero'], focus: 'cal.zero' },
        { say: 'The vernier zero is between 23 and 24 millimetres, so record the whole number just before it: 23 millimetres.', show: ['cal.before', 'm.0'], focus: ['cal.before', 'm.0'] },
        { say: 'Step two. Look along the vernier scale for the one mark that lines up exactly with a main scale mark. Here, it is the seven.', show: 'cal.match', focus: 'cal.match' },
        { say: 'That is the number of tenths of a millimetre: seven tenths, or 0.7 millimetres.', show: 'm.1', focus: 'm.1' },
        { say: 'Step three. Add them. 23 plus 0.7 is 23.7 millimetres, which is 2.37 centimetres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        figure('cal', [vernier({ reading: 23.7 })], 300),
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Read the main scale at the vernier 0', md: 'Not at the edge of the sliding jaw, and not at the mark that lines up (that would give $30\\text{ mm}$).' },
      ],
      lines: [
        { say: 'A common mistake is to read the main scale at the mark that lines up. Here, that would give thirty millimetres, which is far too much.', show: ['cal.main', 'cal.vernier', 'cal.match'], focus: 'cal.match-main' },
        { say: 'Always read the main scale at the vernier zero, not at the edge of the sliding jaw, and not at the mark that lines up.', show: ['oops', 'cal.zero', 'cal.before'], focus: ['cal.zero', 'cal.before'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        figure('q-cal', [vernier({ reading: 15.4 })], 290),
        {
          kind: 'try',
          id: 'q',
          prompt: 'What does this vernier caliper read?',
          choices: ['$15.4\\text{ mm}$', '$19\\text{ mm}$', '$15\\text{ mm}$', '$1.54\\text{ mm}$'],
          answer: 0,
          working: 'The vernier 0 is just past $15\\text{ mm}$, and its 4 lines up: $15 + 0.4 = 15.4\\text{ mm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. What does this vernier caliper read? Pause the video and try it.', show: ['q-cal.main', 'q-cal.vernier', 'q'], wait: 6 },
        { say: 'The answer is A. The vernier zero is just past fifteen millimetres, and the four on the vernier scale lines up with a main scale mark. So the reading is fifteen plus 0.4, which is 15.4 millimetres. Nineteen is the mark that lines up, not the reading.', show: ['q.answer', 'q-cal.zero', 'q-cal.before', 'q-cal.match'] },
      ],
    },
    {
      chapter: 'Curved lengths',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'ways',
          items: [
            '**String:** wrap a string around the object, mark it, then straighten it and measure.',
            '**Wrap several times:** wrap 5 times and divide by 5, to reduce small errors.',
            '**Use the diameter:** for a circle, measure the diameter and use $C = \\pi d$.',
          ],
        },
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Circumference', md: 'The distance around a circle with diameter $d$ is $C = \\pi d$, so $d = \\dfrac{C}{\\pi}$.' },
      ],
      lines: [
        { say: 'How would you measure the distance around a water bottle? A ruler cannot bend, so we need a strategy.' },
        { say: 'One: wrap a string around the object, mark where it meets, then straighten it and measure it with a ruler.', show: 'ways.0' },
        { say: 'Two: wrap it several times. Wrapping five times and dividing by five reduces the effect of small errors.', show: 'ways.1' },
        { say: 'Three: for a circle, measure the diameter, and calculate the distance around.', show: 'ways.2' },
        { say: 'The distance around a circle is its circumference. C equals pi times d, so d equals C divided by pi.', show: 'def' },
      ],
    },
    {
      chapter: 'Diameter from circumference',
      layout: 'split',
      left: [figure('log', [circle({ r: 3, labels: { c: 'C = 94\\text{ in}', d: 'd' } })])],
      right: [
        { kind: 'text', id: 'q', md: 'A string wrapped once around a tree trunk is $94\\text{ in}$ long. What is the trunk’s diameter?', size: 'md' },
        { kind: 'math', id: 'm', lines: ['d = \\dfrac{C}{\\pi} = \\dfrac{94}{\\pi}', 'd \\approx 29.9\\text{ in}'] },
      ],
      lines: [
        { say: 'A string wrapped once around a tree trunk is 94 inches long. What is the diameter of the trunk?', show: ['q', 'log.fill', 'log.outline'] },
        { say: 'The string measures the circumference. Since C equals pi d, the diameter is C divided by pi.', show: ['m.0', 'log.d'], focus: ['m.0', 'log.d'] },
        { say: '94 divided by pi is about 29.9 inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Wrapping several times',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A thread wrapped **4 times** around a pen is $142\\text{ mm}$ long. Find the pen’s diameter.', size: 'lg' },
        { kind: 'math', id: 'm', lines: ['C = 142 \\div 4 = 35.5\\text{ mm}', 'd = \\dfrac{35.5}{\\pi} \\approx 11.3\\text{ mm}'] },
      ],
      lines: [
        { say: 'A thread wrapped four times around a pen is 142 millimetres long. Find the diameter of the pen.', show: 'q' },
        { say: 'First, find one circumference. 142 divided by four is 35.5 millimetres.', show: 'm.0', focus: 'm.0' },
        { say: 'Then divide by pi. 35.5 divided by pi is about 11.3 millimetres.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q2',
          prompt: 'A string wrapped **3 times** around a jar is $66\\text{ cm}$ long. What is the jar’s diameter?',
          choices: ['$7.0\\text{ cm}$', '$21.0\\text{ cm}$', '$22.0\\text{ cm}$', '$69.1\\text{ cm}$'],
          answer: 0,
          working: 'One circumference: $66 \\div 3 = 22\\text{ cm}$. Then $d = 22 \\div \\pi \\approx 7.0\\text{ cm}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A string wrapped three times around a jar is 66 centimetres long. What is the diameter of the jar? Pause the video and try it.', show: 'q2', wait: 6 },
        { say: 'The answer is A. One circumference is 66 divided by three, which is 22 centimetres. Then the diameter is 22 divided by pi, which is about seven centimetres. B forgets to divide by three first.', show: 'q2.answer' },
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
            'Vernier caliper: read the main scale at the vernier 0, in whole millimetres.',
            'Add the vernier mark that lines up, in tenths of a millimetre.',
            'For curved lengths: use a string, wrap several times, or use $C = \\pi d$.',
            'Diameter from circumference: $d = \\dfrac{C}{\\pi}$.',
          ],
        },
      ],
      lines: [
        { say: "Let's sum up. To read a vernier caliper, read the main scale at the vernier zero, in whole millimetres.", show: 'sum.0' },
        { say: 'Then add the vernier mark that lines up, in tenths of a millimetre.', show: 'sum.1' },
        { say: 'For lengths that are not straight, use a string, wrap several times, or use C equals pi d.', show: 'sum.2' },
        { say: 'And to find a diameter from a circumference, divide by pi. Practise these skills in your lesson. See you next time!', show: 'sum.3' },
      ],
    },
  ],
};

export default video;
