import type { Explainer } from '@/video/script.ts';
import { ruler } from '@/video/measure.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-2-3-b',
  lessonId: 'm104-2-3',
  title: 'Adding and Subtracting Fractions, Part 2: Mixed Numbers',
  thumbnailTitle: 'Mixed Numbers',
  thumbnail: 'r',
  summary: 'Adding mixed numbers by working with the wholes and the fractions separately, regrouping one whole to subtract, reading a ruler in eighths of an inch, and how much of a board is left after a cut list.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 2.3 · Part 2', title: 'Mixed Numbers', subtitle: 'Adding, subtracting and measuring' }],
      lines: [
        { say: 'A carpenter cuts 24 and three quarter inches off a board. How much is left? To answer, you need to add and subtract mixed numbers.', show: 'title' },
        { say: 'In this video, you will add and subtract mixed numbers, regroup when you need to, and work with measurements.' },
      ],
    },
    {
      chapter: 'Adding mixed numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['3\\tfrac{1}{2} + 4\\tfrac{3}{4} = 3\\tfrac{2}{4} + 4\\tfrac{3}{4}', '\\text{wholes: } 3 + 4 = 7, \\quad \\text{fractions: } \\tfrac{2}{4} + \\tfrac{3}{4} = 1\\tfrac{1}{4}', '7 + 1\\tfrac{1}{4} = 8\\tfrac{1}{4}\\text{ hours}'] }],
      lines: [
        { say: 'Work with the whole numbers and the fractions separately. Nathan works three and a half hours on Saturday, and four and three quarter hours on Sunday. First, write the half as two quarters.', show: 'm.0', focus: 'm.0' },
        { say: 'Wholes: three plus four is seven. Fractions: two quarters plus three quarters is five quarters, which is one and a quarter.', show: 'm.1', focus: 'm.1' },
        { say: 'Seven plus one and a quarter: Nathan works eight and a quarter hours.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Regrouping',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['5\\tfrac{1}{4} - 2\\tfrac{3}{8} = 5\\tfrac{2}{8} - 2\\tfrac{3}{8}', '5\\tfrac{2}{8} = 4 + \\tfrac{8}{8} + \\tfrac{2}{8} = 4\\tfrac{10}{8}', '4\\tfrac{10}{8} - 2\\tfrac{3}{8} = 2\\tfrac{7}{8}\\text{ kg}'] },
      ],
      lines: [
        { say: 'A deli has five and a quarter kilograms of ham, and sells two and three eighths. Write the quarter in eighths: five and two eighths.', show: 'm.0', focus: 'm.0' },
        { say: 'You cannot take three eighths from two eighths. So regroup: take one whole from the five, and add it to the fraction as eight eighths. Five and two eighths becomes four and ten eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Now subtract. Wholes: four minus two is two. Fractions: ten eighths minus three eighths is seven eighths. There are two and seven eighths kilograms left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Measuring',
      layout: 'center',
      main: [
        figure('r', [ruler({ system: 'imperial', length: 4, start: 0, end: 2.375, division: 8, reading: '2\\tfrac{3}{8}\\text{ in}' })], 260),
        { kind: 'math', id: 'm', size: 'md', lines: ['24\\tfrac{3}{8} + 18\\tfrac{5}{8} = 42 + \\tfrac{8}{8} = 43\\text{ in}'] },
      ],
      lines: [
        { say: 'Rulers and tape measures show inches cut into eighths or sixteenths. This bar ends three marks past the two. Each mark is one eighth of an inch, so the bar is two and three eighths inches long.', show: ['r.scale', 'r.bar', 'r.reading'] },
        { say: 'Two pieces of trim are 24 and three eighths inches, and eighteen and five eighths inches. Wholes: 42. Fractions: eight eighths, which is one. So the trim is 43 inches long in total.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'A cut list',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['24\\tfrac{3}{4} + 31\\tfrac{5}{8} = 55\\tfrac{11}{8} = 56\\tfrac{3}{8}\\text{ in}', '96 = 95\\tfrac{8}{8}', '95\\tfrac{8}{8} - 56\\tfrac{3}{8} = 39\\tfrac{5}{8}\\text{ in}'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'The saw cut', md: 'Each cut turns about $\\tfrac{1}{8}$ inch of wood into sawdust. On the job, leave a little extra.' },
      ],
      lines: [
        { say: 'Diego cuts two pieces, 24 and three quarter inches and 31 and five eighths inches, from a 96-inch board. How much is left? Add the pieces: 56 and three eighths inches.', show: 'm.0', focus: 'm.0' },
        { say: 'To subtract, regroup the board: 96 is 95 and eight eighths.', show: 'm.1', focus: 'm.1' },
        { say: 'Then subtract: 39 and five eighths inches of the board is left.', show: 'm.2', focus: 'm.2' },
        { say: 'A real saw blade turns about an eighth of an inch of wood into sawdust with each cut, so on the job, leave a little extra.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find $4\\dfrac{1}{8} - 1\\dfrac{5}{8}$.',
          choices: ['$2\\dfrac{1}{2}$', '$3\\dfrac{1}{2}$', '$3\\dfrac{4}{8}$', '$2\\dfrac{3}{8}$'],
          answer: 0,
          working: 'Regroup: $4\\tfrac{1}{8} = 3\\tfrac{9}{8}$. Then $3\\tfrac{9}{8} - 1\\tfrac{5}{8} = 2\\tfrac{4}{8} = 2\\tfrac{1}{2}$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find four and one eighth, minus one and five eighths. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Regroup four and one eighth as three and nine eighths. Then three minus one is two, and nine eighths minus five eighths is four eighths: two and a half. B and C subtract the smaller fraction from the larger one, which skips the regrouping.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Work with the wholes and the fractions separately.', 'Regroup $1$ whole when the first fraction is too small.', 'On a ruler, count the marks past the whole inch.'] }],
      lines: [
        { say: 'Let’s sum up. With mixed numbers, work with the wholes and the fractions separately.', show: 'sum.0' },
        { say: 'When the first fraction is too small to subtract from, regroup one whole.', show: 'sum.1' },
        { say: 'And on a ruler, count the marks past the whole inch. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
