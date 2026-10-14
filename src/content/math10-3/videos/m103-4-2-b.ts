import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-4-2-b',
  lessonId: 'm103-4-2',
  title: 'Working with Fractional Measurements, Part 2: Saw Kerf, Feet and Inches',
  thumbnailTitle: 'Feet, Inches and Saw Kerf',
  summary: 'Allowing for the saw kerf in a cut list, and adding and subtracting feet and inches separately, regrouping 12 inches as a foot and borrowing a foot as 12 inches.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 4.2 · Part 2', title: 'Saw Kerf, Feet and Inches', subtitle: 'Longer measurements on the job' }],
      lines: [
        { say: 'Every saw cut turns a thin strip of wood into sawdust, and long measurements come in feet and inches.', show: 'title' },
        { say: 'In this video, you will allow for saw cuts in a cut list, and add and subtract feet and inches.' },
      ],
    },
    {
      chapter: 'The saw kerf',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Mateo cuts $3$ pieces, each $14\\tfrac34$ in long, from a $48$ in board. Each of his $3$ cuts wastes $\\tfrac18$ in.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 14\\tfrac34 = 3 \\times \\tfrac{59}{4} = \\tfrac{177}{4} = 44\\tfrac14\\text{ in}', '3 \\times \\tfrac18 = \\tfrac38\\text{ in}', '44\\tfrac14 + \\tfrac38 = 44\\tfrac58\\text{ in}', '48 - 44\\tfrac58 = 47\\tfrac88 - 44\\tfrac58 = 3\\tfrac38\\text{ in}'] },
      ],
      lines: [
        { say: 'The strip a saw blade turns into sawdust is the saw kerf, and on a long cut list it adds up. Mateo cuts three pieces, each fourteen and three quarter inches long, from a 48-inch board. Each cut wastes an eighth of an inch.', show: 'q' },
        { say: 'The pieces: three times fourteen and three quarters. As an improper fraction, that is three times 59 quarters, 177 quarters, or 44 and a quarter inches.', show: 'm.0', focus: 'm.0' },
        { say: 'The kerf: three cuts at an eighth each is three eighths of an inch. So the board used is 44 and five eighths inches.', show: ['m.1', 'm.2'], focus: 'm.2' },
        { say: 'Subtract from 48, writing 48 as 47 and eight eighths: the leftover piece is three and three eighths inches.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Adding feet and inches',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['5\\text{ ft } 9\\text{ in} + 3\\text{ ft } 7\\text{ in} = 8\\text{ ft } 16\\text{ in}', '16\\text{ in} = 1\\text{ ft } 4\\text{ in} \\;\\to\\; 9\\text{ ft } 4\\text{ in}'] },
      ],
      lines: [
        { say: 'Longer measurements are often in feet and inches. Twelve inches make a foot, so work with the feet and the inches separately, then regroup. Two fence rails are five feet nine inches, and three feet seven inches.', show: 'm.0', focus: 'm.0' },
        { say: 'That is eight feet sixteen inches. Sixteen inches is one foot four inches, so the total is nine feet four inches.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Subtracting feet and inches',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['8\\text{ ft } 2\\text{ in} = 7\\text{ ft } 14\\text{ in}', '7\\text{ ft } 14\\text{ in} - 3\\text{ ft } 7\\text{ in} = 4\\text{ ft } 7\\text{ in}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Feet and inches are not decimals', md: '$5\\text{ ft } 9\\text{ in}$ is **not** $5.9\\text{ ft}$. Nine inches is $\\tfrac{9}{12} = 0.75$ ft, so it is $5.75\\text{ ft}$.' },
      ],
      lines: [
        { say: 'A garage door opening is eight feet two inches high, and a camper is three feet seven inches tall. You cannot take seven inches from two, so borrow a foot as twelve inches: eight feet two inches is seven feet fourteen inches.', show: 'm.0', focus: 'm.0' },
        { say: 'Now subtract: the difference is four feet seven inches.', show: 'm.1', focus: 'm.1' },
        { say: 'Feet and inches are not decimals. Five feet nine inches is not 5.9 feet. Nine inches is nine twelfths, or 0.75 of a foot, so it is 5.75 feet. Keep feet and inches as two separate numbers.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A wall is $11\\text{ ft } 3\\text{ in}$ long. A cabinet run takes $6\\text{ ft } 8\\text{ in}$. How much wall is left?',
          choices: ['$4\\text{ ft } 7\\text{ in}$', '$5\\text{ ft } 5\\text{ in}$', '$4.95\\text{ ft}$', '$5\\text{ ft } 7\\text{ in}$'],
          answer: 0,
          working: '$11\\text{ ft } 3\\text{ in} = 10\\text{ ft } 15\\text{ in}$, and $10\\text{ ft } 15\\text{ in} - 6\\text{ ft } 8\\text{ in} = 4\\text{ ft } 7\\text{ in}$.',
        },
      ],
      lines: [
        { say: 'Your turn. A wall is eleven feet three inches long, and a cabinet run takes six feet eight inches. How much wall is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Borrow a foot: eleven feet three inches is ten feet fifteen inches. Subtract: four feet seven inches.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Include the saw kerf for every cut.', 'Work with feet and inches separately: regroup 12 in as 1 ft, borrow 1 ft as 12 in.', 'Feet and inches are not decimals.'] }],
      lines: [
        { say: 'Let’s sum up. Include the saw kerf for every cut in a cutting problem.', show: 'sum.0' },
        { say: 'Work with feet and inches separately. Regroup twelve inches as a foot, and borrow a foot as twelve inches.', show: 'sum.1' },
        { say: 'And remember that feet and inches are not decimals. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
