import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { slots } from './lib/m301-9-counting.ts';

const video: Explainer = {
  id: 'm301-9-2-b',
  lessonId: 'm301-9-2',
  title: 'Permutations, Part 2: Permutations of n Objects Taken r at a Time',
  thumbnailTitle: 'Permutations',
  thumbnail: 'md',
  summary: 'Counting the ways to award gold, silver and bronze to 12 skiers (12 × 11 × 10 = 1320), the permutation formula nPr = n!/(n − r)! and where it comes from, and solving nP2 = 56 for n = 8, rejecting the negative root. Part 3 arranges identical objects.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.2 · Part 2', title: 'Permutations', subtitle: '${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$' }],
      lines: [
        { say: 'Twelve skiers race, but only three of them win medals. Arranging just some of the objects is one of the most common counting problems.', show: 'title' },
        { say: 'In this video, you will learn the permutation notation, n P r, use it to count medal results, and solve an equation with it.' },
      ],
    },
    {
      chapter: 'Medals in a race',
      layout: 'center',
      main: [
        { kind: 'text', id: 'p', size: 'md', md: '12 skiers race at Nakiska. In how many ways can the gold, silver and bronze medals be awarded?' },
        figure('md', [slots({ values: ['12', '11', '10'], captions: ['\\text{gold}', '\\text{silver}', '\\text{bronze}'] })], 200),
        { kind: 'math', id: 'm', size: 'md', lines: ['12 \\times 11 \\times 10 = 1320', '= \\dfrac{12 \\times 11 \\times 10 \\times \\bad{\\cancel{9!}}}{\\bad{\\cancel{9!}}} = \\dfrac{12!}{9!}'] },
      ],
      lines: [
        { say: 'Twelve skiers race at Nakiska. In how many ways can the gold, silver and bronze medals be awarded?', show: 'p' },
        { say: 'The medals are different, so order matters. A skier who wins gold has done something different from a skier who wins silver.', show: ['md.boxes', 'md.captions'] },
        { say: 'Draw a box for each medal. Any of the twelve skiers can win gold. Then eleven skiers are left for silver, and ten for bronze.', show: 'md.values', focus: 'md.values' },
        { say: 'So there are twelve times eleven times ten, which is 1,320 ways.', show: ['md.times', 'm.0'], focus: 'm.0' },
        { say: 'This is twelve factorial with its end cut off. Multiply the top and bottom by nine factorial, and it becomes twelve factorial over nine factorial.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'The permutation formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Permutations', md: 'A **permutation** is an arrangement of objects in which order matters. The number of permutations of $n$ different objects taken $r$ at a time is ${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$, where $0 \\le r \\le n$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['n(n - 1)(n - 2)\\cdots(n - r + 1) = \\dfrac{n!}{(n - r)!}', '{}_{12}P_{3} = \\dfrac{12!}{(12 - 3)!} = \\dfrac{12!}{9!} = 1320'] },
      ],
      lines: [
        { say: 'A permutation is an arrangement of objects in which order matters. The number of permutations of n different objects taken r at a time is written n P r. It equals n factorial over n minus r, factorial.', show: 'def' },
        { say: 'Here is why. By the counting principle, there are n choices for the first place, n minus one for the second, and so on, down to n minus r plus one for the last of the r places.', show: 'm.0', focus: 'm.0' },
        { say: 'Multiplying the top and bottom by n minus r, factorial, completes the top to n factorial. So the product is n factorial over n minus r, factorial.' },
        { say: 'For the medals, n is twelve and r is three. Twelve P three is twelve factorial over nine factorial, which is 1,320, just as before.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Solving for n',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['{}_{n}P_{2} = 56', '\\dfrac{n!}{(n - 2)!} = n(n - 1) = 56', 'n^2 - n - 56 = 0', '(n - 8)(n + 7) = 0', 'n = 8 \\qquad \\text{check: } 8 \\times 7 = 56'] },
      ],
      lines: [
        { say: 'To find n, rewrite the notation as a product of factors in n, then solve. Solve n P two equals fifty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'n P two is n factorial over n minus two, factorial. Everything cancels except the first two factors: n times n minus one.', show: 'm.1', focus: 'm.1' },
        { say: 'So n times n minus one equals fifty-six. Expand, and move everything to one side: n squared minus n minus fifty-six equals zero.', show: 'm.2', focus: 'm.2' },
        { say: 'Factor: n minus eight, times n plus seven, equals zero. So n equals eight, or n equals negative seven.', show: 'm.3', focus: 'm.3' },
        { say: 'n counts objects, so it must be a natural number. The answer is n equals eight. Check: eight times seven is fifty-six.', show: 'm.4', focus: 'm.4' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Keeping the negative root', md: '$n = -7$ solves the quadratic, but $-7$ objects makes no sense, and $(-7)!$ is not defined. Always reject roots that are not natural numbers.' }],
      lines: [
        { say: 'A common mistake is to keep both roots. n equals negative seven solves the quadratic, but you cannot have negative seven objects, and negative seven factorial is not defined.', show: 'oops' },
        { say: 'Always reject roots that are not natural numbers. The value of n must also be big enough for the notation to make sense: at least as big as r.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A club of 9 members elects a president, a vice-president and a treasurer. No member can hold two positions. In how many ways can the three positions be filled?',
          choices: ['$84$', '$504$', '$729$', '$27$'],
          answer: 1,
          working: 'The positions are different, so order matters: ${}_{9}P_{3} = \\dfrac{9!}{6!} = 9 \\times 8 \\times 7 = 504$.',
        },
      ],
      lines: [
        { say: 'Your turn. A club of nine members elects a president, a vice-president and a treasurer. No member can hold two positions. In how many ways can the three positions be filled? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is B, 504. The positions are different, so order matters: nine P three is nine times eight times seven, which is 504. Choice C, 729, lets one member hold more than one position.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A permutation is an arrangement in which order matters.', '${}_{n}P_{r} = \\dfrac{n!}{(n - r)!}$ arranges $r$ of $n$ different objects.', 'To solve for $n$, expand the notation, solve, and keep only natural numbers.'] }],
      lines: [
        { say: 'Let’s sum up. A permutation is an arrangement in which order matters.', show: 'sum.0' },
        { say: 'n P r, which is n factorial over n minus r, factorial, counts the arrangements of r objects chosen from n different objects.', show: 'sum.1' },
        { say: 'And to solve for n, expand the notation, solve, and keep only natural numbers. In part three, we arrange objects that are identical, such as repeated letters, and count routes on a grid. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
