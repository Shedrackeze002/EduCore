import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

/** The ids of the sixteenth marks that are a given size (16, 8, 4, 2 or 1 sixteenths apart). */
const marks = (el: string, step: number, inches: number) => {
  const ids: string[] = [];
  for (let i = 0; i <= inches * 16; i += step) if (step === 16 || i % (2 * step) !== 0) ids.push(`${el}.t${i}`);
  return ids;
};

const video: Explainer = {
  id: 'm103-4-1-b',
  lessonId: 'm103-4-1',
  title: 'Rulers and Tape Measures, Part 2: Imperial Rulers',
  thumbnailTitle: 'Reading an Imperial Ruler',
  thumbnail: 'read',
  summary: 'The marks on an imperial ruler (inches, halves, quarters, eighths and sixteenths), reading to the nearest sixteenth and simplifying, and finding a length from a mark other than zero by changing to sixteenths.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.1 · Part 2', title: 'Imperial Rulers', subtitle: 'To the nearest sixteenth' }],
      lines: [
        { say: 'Lumber, pipe and plywood in Canada are often measured in inches. An imperial tape splits each inch into sixteen equal spaces.', show: 'title' },
        { say: 'In this video, you will read an imperial ruler to the nearest sixteenth of an inch, and find lengths that do not start at zero.' },
      ],
    },
    {
      chapter: 'The marks',
      layout: 'center',
      main: [
        figure('imp', [ruler({ system: 'imperial', length: 5 })]),
        { kind: 'bullets', id: 'b', items: ['the longest marks are whole inches,', 'then the $\\tfrac12$ in mark, then the $\\tfrac14$ in marks,', 'then the $\\tfrac18$ in marks, and the shortest are $\\tfrac{1}{16}$ in.'] },
      ],
      lines: [
        { say: 'On an imperial ruler, the marks get shorter as the pieces get smaller. The longest marks are whole inches.', show: ['imp.scale', 'b.0'], focus: marks('imp', 16, 5) },
        { say: 'The next longest is the half-inch mark, then the quarter-inch marks.', show: 'b.1', focus: [...marks('imp', 8, 5), ...marks('imp', 4, 5)] },
        { say: 'Then the eighths, and the shortest marks are the sixteenths.', show: 'b.2', focus: [...marks('imp', 2, 5), ...marks('imp', 1, 5)] },
      ],
    },
    {
      chapter: 'Reading a length',
      layout: 'center',
      main: [
        figure('read', [ruler({ system: 'imperial', length: 5, start: 0, end: 3 + 7 / 16, reading: '3\\tfrac{7}{16}\\text{ in}' })]),
        { kind: 'math', id: 'm', lines: ['3 + \\tfrac{7}{16} = 3\\tfrac{7}{16}\\text{ in}', '2\\tfrac{12}{16} = 2\\tfrac34\\text{ in}'] },
      ],
      lines: [
        { say: 'To read a length, count the whole inches, then the sixteenths past the last whole inch. This bar ends seven small spaces past the three-inch mark.', show: ['read.scale', 'read.bar', 'read.start', 'read.end'], focus: ['read.t48', 'read.t55'] },
        { say: 'So it is three and seven sixteenths inches long. Seven is odd, so the fraction cannot be simplified.', show: ['read.reading', 'm.0'], focus: 'm.0' },
        { say: 'Always write the fraction in lowest terms. A bar twelve sixteenths past the two-inch mark is two and three quarter inches. On the job, people say two and three-quarter inches, not two and twelve-sixteenths.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Not starting at zero',
      layout: 'center',
      main: [
        figure('part', [ruler({ system: 'imperial', length: 5, start: 1 + 3 / 8, end: 4 + 1 / 16, startReading: '1\\tfrac38', reading: '4\\tfrac{1}{16}' })]),
        { kind: 'math', id: 'm', lines: ['1\\tfrac38 = \\tfrac{22}{16}, \\qquad 4\\tfrac{1}{16} = \\tfrac{65}{16}', '\\tfrac{65}{16} - \\tfrac{22}{16} = \\tfrac{43}{16} = 2\\tfrac{11}{16}\\text{ in}'] },
      ],
      lines: [
        { say: 'The rule is the same as in metric: length equals end minus start. This part starts at one and three eighths inches, and ends at four and one sixteenth.', show: ['part.scale', 'part.bar', 'part.start', 'part.end', 'part.start-reading', 'part.reading'] },
        { say: 'Change both readings to sixteenths first. One and three eighths is 22 sixteenths, and four and one sixteenth is 65 sixteenths.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract: 43 sixteenths. 43 divided by sixteen is two, remainder eleven, so the part is two and eleven sixteenths inches long.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Spaces, not marks',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Counting marks instead of spaces', md: 'From the $1$ in mark to the $1\\tfrac{3}{16}$ in mark there are $3$ spaces but $4$ marks. Count the **spaces**.' },
      ],
      lines: [
        { say: 'Count the spaces between marks, not the marks themselves. From the one-inch mark to one and three sixteenths, there are three spaces, but four marks, including the one you start on.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A bar ends $10$ sixteenths past the $2$ in mark. How long is it?',
          choices: ['$2\\tfrac58$ in', '$2\\tfrac{10}{16}$ in, which cannot be simplified', '$2.10$ in', '$2\\tfrac{5}{16}$ in'],
          answer: 0,
          working: '$\\tfrac{10}{16} = \\tfrac58$, so the bar is $2\\tfrac58$ in long.',
        },
      ],
      lines: [
        { say: 'Your turn. A bar ends ten sixteenths past the two-inch mark. How long is it? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ten sixteenths simplifies to five eighths, so the bar is two and five eighths inches long. C treats the sixteenths as a decimal.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Each inch has 16 spaces: count whole inches, then sixteenths, then simplify.', 'Length = end − start; change to sixteenths before subtracting.', 'Count spaces, not marks.'] }],
      lines: [
        { say: 'Let’s sum up. Each inch has sixteen spaces. Count the whole inches, then the sixteenths, then simplify.', show: 'sum.0' },
        { say: 'The length is the end minus the start. Change to sixteenths before you subtract.', show: 'sum.1' },
        { say: 'And count spaces, not marks. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
