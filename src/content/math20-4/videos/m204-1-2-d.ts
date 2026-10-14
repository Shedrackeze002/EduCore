import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-2-d',
  lessonId: 'm204-1-2',
  title: 'Fractions and Mixed Numbers, Part 4: Two-Step Problems',
  thumbnailTitle: 'Two-Step Fraction Problems',
  thumbnail: 'm',
  summary: 'Two-step problems with mixed numbers: cutting two 3¼-foot shelves from an 8-foot board (1½ feet left), milk for three batches of a recipe (¾ cup left), checking with an estimate, and choosing the operation from the words.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.2 · Part 4', title: 'Two-Step Problems', subtitle: 'Find the first amount, then use it' }],
      lines: [
        { say: 'Many real jobs need two steps: cut several pieces, then see what is left, or make several batches, then see if there is enough.', show: 'title' },
        { say: 'In this video, you will solve two-step problems with mixed numbers, and check them with an estimate.' },
      ],
    },
    {
      chapter: 'Cutting shelves',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'An $8$-foot board. Cut $2$ shelves, each $3\\tfrac14$ feet long.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 3\\dfrac14 = 2 \\times \\dfrac{13}{4} = \\dfrac{26}{4} = 6\\dfrac12', '8 = \\dfrac{16}{2}, \\quad 6\\dfrac12 = \\dfrac{13}{2}', '\\dfrac{16}{2} - \\dfrac{13}{2} = \\dfrac32 = 1\\dfrac12 \\text{ feet}'] },
      ],
      lines: [
        { say: 'Sofia has an eight-foot board. She cuts two shelves, each three and a quarter feet long. How much of the board is left?', show: 'q' },
        { say: 'First, find the length of the two shelves. Two times three and a quarter is two times thirteen quarters: 26 quarters, or six and a half feet.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract from eight. Write eight with the same denominator: sixteen halves. And six and a half is thirteen halves.', show: 'm.1', focus: 'm.1' },
        { say: 'Sixteen halves minus thirteen halves is three halves: one and a half feet of the board is left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Check with an estimate',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with an estimate', md: '$3\\tfrac14$ is a bit more than $3$, so two shelves use a bit more than $6$ feet. That leaves a bit less than $2$ feet, so $1\\tfrac12$ makes sense.' }],
      lines: [
        { say: 'Check with an estimate. Three and a quarter is a bit more than three, so two shelves use a bit more than six feet. That leaves a bit less than two feet, so one and a half feet makes sense.', show: 'tip' },
      ],
    },
    {
      chapter: 'Milk for three batches',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Each batch needs $1\\tfrac34$ cups of milk. Make $3$ batches from $6$ cups.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 \\times 1\\dfrac34 = 3 \\times \\dfrac74 = \\dfrac{21}{4} = 5\\dfrac14', '6 - 5\\dfrac14 = \\dfrac{24}{4} - \\dfrac{21}{4} = \\dfrac34 \\text{ cup}'] },
      ],
      lines: [
        { say: 'In this example, a recipe needs one and three quarters cups of milk for each batch. You make three batches, and you have six cups of milk. How much is left?', show: 'q' },
        { say: 'First, the milk for three batches: three times seven quarters is 21 quarters, or five and a quarter cups.', show: 'm.0', focus: 'm.0' },
        { say: 'Then subtract from six cups. Six is 24 quarters, and 24 quarters minus 21 quarters is three quarters of a cup left.', show: 'm.1', focus: 'm.1' },
        { say: 'Estimate: one and three quarters is almost two, so three batches use almost six cups. A little left over makes sense.' },
      ],
    },
    {
      chapter: 'Reading the words',
      layout: 'center',
      main: [{ kind: 'callout', id: 'key', tone: 'key', title: 'Which operation?', md: '**Each**, **times** or **of** usually means multiply. **Left** or **difference** means subtract. **In all** or **total** means add. Decide what to find first, then use that answer.' }],
      lines: [
        { say: 'The words tell you which operation to use. Each, times or of usually means multiply. Left, or difference, means subtract. In all, or total, means add.', show: 'key' },
        { say: 'Decide what to find first, then use that answer for the second step.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A roll has $20$ feet of ribbon. You cut $4$ pieces, each $3\\tfrac12$ feet long. How much ribbon is left?',
          choices: ['$6$ feet', '$16\\tfrac12$ feet', '$14$ feet', '$8$ feet'],
          answer: 0,
          working: '$4 \\times 3\\tfrac12 = 4 \\times \\tfrac72 = 14$ feet, and $20 - 14 = 6$ feet. B subtracts only one piece, and C is the ribbon used.',
        },
      ],
      lines: [
        { say: 'Your turn. A roll has twenty feet of ribbon. You cut four pieces, each three and a half feet long. How much ribbon is left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Four times three and a half is four times seven halves: fourteen feet used. Twenty minus fourteen leaves six feet. B subtracts only one piece, and C is the ribbon used.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the first amount, then use it.', 'The words tell you the operation.', 'Check the answer with an estimate.'] }],
      lines: [
        { say: 'Let’s sum up. In a two-step problem, find the first amount, then use it.', show: 'sum.0' },
        { say: 'The words in the question tell you which operation to use.', show: 'sum.1' },
        { say: 'And check your answer with an estimate. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
