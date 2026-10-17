import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m301-9-counting.ts';

const video: Explainer = {
  id: 'm301-9-2',
  lessonId: 'm301-9-2',
  title: 'Permutations, Part 1: Factorial Notation',
  thumbnailTitle: 'Factorial Notation',
  thumbnail: 'bk',
  summary: 'Arranging 4 books in a row in 4 × 3 × 2 × 1 = 4! = 24 ways, the definition of n!, why 0! = 1, and cancelling factorials: 10!/8! = 90 and (n + 1)!/(n − 1)! = n(n + 1). Part 2 counts permutations of n objects taken r at a time.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.2 · Part 1', title: 'Factorial Notation', subtitle: '$n!$, and why $0! = 1$' }],
      lines: [
        { say: 'A playlist of ten songs on shuffle can play in 3,628,800 different orders. Counting arrangements like this is so common that it has its own notation.', show: 'title' },
        { say: 'In this video, you will learn factorial notation, see why zero factorial equals one, and cancel factorials without multiplying them out.' },
      ],
    },
    {
      chapter: 'Arranging objects in a row',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: 'In how many ways can 4 different books be arranged in a row on a shelf?' },
        figure('bk', [slots({ values: ['4', '3', '2', '1'], captions: ['\\text{1st}', '\\text{2nd}', '\\text{3rd}', '\\text{4th}'] })], 220),
        { kind: 'math', id: 'm', size: 'md', lines: ['4 \\times 3 \\times 2 \\times 1 = 4! = 24', '10! = 10 \\times 9 \\times 8 \\times \\cdots \\times 1 = 3\\,628\\,800'] },
      ],
      lines: [
        { say: 'In how many ways can four different books be arranged in a row on a shelf?', show: 'p' },
        { say: 'Draw a box for each place on the shelf. Any of the four books can go first: four choices.', show: ['bk.boxes', 'bk.captions', 'bk.v0'], focus: 'bk.v0' },
        { say: 'Once one book is placed, three are left for the second place. Then two are left for the third place, and one for the last.', show: ['bk.v1', 'bk.v2', 'bk.v3'], focus: ['bk.v1', 'bk.v2', 'bk.v3'] },
        { say: 'So there are four times three times two times one, which is twenty-four arrangements. A product like this, counting down to one, is written four factorial: a four with an exclamation mark.', show: ['bk.times', 'm.0'], focus: 'm.0' },
        { say: 'With ten songs, the same idea gives ten factorial: ten times nine times eight, and so on down to one. That is 3,628,800 orders.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Factorial notation',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Factorial', md: 'For a natural number $n$, $n! = n(n - 1)(n - 2) \\cdots (3)(2)(1)$. By definition, $0! = 1$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n! = n \\times (n - 1)!', '1! = 1 \\times 0!', '1 = 1 \\times 0!, \\ \\text{so } 0! = 1'] },
      ],
      lines: [
        { say: 'For a natural number n, n factorial is n, times n minus one, times n minus two, and so on, down to three times two times one. It counts the ways to arrange n different objects in a row.', show: 'def' },
        { say: 'Notice a pattern: n factorial equals n, times n minus one, factorial. For example, five factorial is five times four factorial.', show: 'm.0', focus: 'm.0' },
        { say: 'By definition, zero factorial is one. That can look strange, but the pattern needs it. Put n equals one into the pattern: one factorial equals one times zero factorial.', show: 'm.1', focus: 'm.1' },
        { say: 'One factorial is just one, so one equals one times zero factorial. For the pattern to hold, zero factorial must equal one.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Cancelling factorials',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{10!}{8!} = \\dfrac{10 \\times 9 \\times \\bad{\\cancel{8!}}}{\\bad{\\cancel{8!}}}', '= 10 \\times 9 = 90', '\\dfrac{(n + 1)!}{(n - 1)!} = \\dfrac{(n + 1)(n)\\bad{\\cancel{(n - 1)!}}}{\\bad{\\cancel{(n - 1)!}}}', '= n(n + 1) = n^2 + n'] },
      ],
      lines: [
        { say: 'That pattern lets you cancel factorials without multiplying them out. Simplify ten factorial over eight factorial.' },
        { say: 'Write the larger factorial only until you reach the smaller one: ten factorial is ten times nine times eight factorial. Then the eight factorials cancel.', show: 'm.0', focus: 'm.0' },
        { say: 'That leaves ten times nine, which is ninety.', show: 'm.1', focus: 'm.1' },
        { say: 'It works with letters too. Simplify n plus one, factorial, over n minus one, factorial. Write n plus one, factorial, as n plus one, times n, times n minus one, factorial.', show: 'm.2', focus: 'm.2' },
        { say: 'The n minus one factorials cancel, leaving n times n plus one, which is n squared plus n.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the numbers inside the factorials', md: '$\\dfrac{10!}{5!}$ is **not** $2!$. Write out the larger factorial until you reach the smaller one, then cancel.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\dfrac{10!}{5!} = 10 \\times 9 \\times 8 \\times 7 \\times 6 = 30\\,240'] },
      ],
      lines: [
        { say: 'A common mistake is to divide the numbers inside the factorials. Ten factorial over five factorial is not two factorial.', show: 'oops' },
        { say: 'Two factorial is only two. But ten factorial over five factorial is ten times nine times eight times seven times six, which is 30,240. Write out the larger factorial until you reach the smaller one, then cancel.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Simplify $\\dfrac{9!}{7!}$.',
          choices: ['$2$', '$504$', '$72$', '$63$'],
          answer: 2,
          working: '$9! = 9 \\times 8 \\times 7!$, so $\\dfrac{9 \\times 8 \\times 7!}{7!} = 9 \\times 8 = 72$.',
        },
      ],
      lines: [
        { say: 'Your turn. Simplify nine factorial over seven factorial. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is C, seventy-two. Nine factorial is nine times eight times seven factorial, and the seven factorials cancel, leaving nine times eight. Choice A divides the numbers inside the factorials, which gives two factorial, or two.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['$n! = n(n - 1)(n - 2)\\cdots(2)(1)$ counts the ways to arrange $n$ different objects in a row.', '$n! = n \\times (n - 1)!$, and $0! = 1$.', 'Cancel factorials by writing the larger one down to the smaller one.'] }],
      lines: [
        { say: 'Let’s sum up. n factorial is n times n minus one, and so on down to one. It counts the ways to arrange n different objects in a row.', show: 'sum.0' },
        { say: 'n factorial equals n times n minus one, factorial, and zero factorial is one.', show: 'sum.1' },
        { say: 'And cancel factorials by writing the larger one down to the smaller one. In part two, we arrange only some of the objects, with permutations. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
