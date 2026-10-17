import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { streets } from './lib/m301-9-counting.ts';

// The letters T, O, O with the two O's told apart, as subscripts.
const o = (s: string) => s.split(' ').map((c) => (c === 'T' ? '\\text{T}' : `\\text{O}_${c}`)).join('\\,');

const video: Explainer = {
  id: 'm301-9-2-c',
  lessonId: 'm301-9-2',
  title: 'Permutations, Part 3: Arrangements with Identical Objects',
  thumbnailTitle: 'Identical Objects',
  thumbnail: 'g',
  summary: 'Why identical objects mean dividing (the letters T, O, O give 3!/2! = 3 arrangements), the formula n!/(a! b! c! …), the 34 650 arrangements of MISSISSIPPI, and the 35 shortest routes on a grid, counted as arrangements of E and N moves. Part 4 handles restrictions.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 30-1 · Lesson 9.2 · Part 3', title: 'Identical Objects', subtitle: 'Repeated letters and routes on a grid' }],
      lines: [
        { say: 'In how many different ways can you arrange the letters of the word Mississippi? Many of its letters are the same, and that changes the count.', show: 'title' },
        { say: 'In this video, you will see why identical objects mean dividing, count arrangements of repeated letters, and count the shortest routes on a grid of streets.' },
      ],
    },
    {
      chapter: 'Why we divide',
      layout: 'split',
      leftWidth: 560,
      left: [
        {
          kind: 'table',
          id: 't',
          head: ['If the O’s were different', 'Looks like'],
          rows: [
            [`$${o('T 1 2')}$, $\\ ${o('T 2 1')}$`, 'T O O'],
            [`$${o('1 T 2')}$, $\\ ${o('2 T 1')}$`, 'O T O'],
            [`$${o('1 2 T')}$, $\\ ${o('2 1 T')}$`, 'O O T'],
          ],
        },
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['3! = 6', '\\text{each one twice: } 2! = 2', '\\dfrac{3!}{2!} = \\dfrac{6}{2} = 3'] }],
      lines: [
        { say: 'Start small, with the three letters T, O, O. How many different arrangements are there?' },
        { say: 'Pretend for a moment that the two O’s are different: O one and O two. Then there are three different letters, and three factorial, or six, arrangements.', show: ['t', 'm.0'], focus: 'm.0' },
        { say: 'But the O’s are really identical. Swapping them does not make a new arrangement: T, O one, O two, and T, O two, O one, both look like T O O.', focus: 't.0' },
        { say: 'Every arrangement appears twice, once for each order of the two O’s, and that is two factorial. So divide: six over two is three arrangements, T O O, O T O, and O O T.', show: ['m.1', 'm.2'], focus: ['m.2', 't'] },
      ],
    },
    {
      chapter: 'Permutations with identical objects',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Permutations with identical objects', md: 'The number of arrangements of $n$ objects, where $a$ are alike, $b$ are alike, $c$ are alike, and so on, is $\\dfrac{n!}{a!\\,b!\\,c!\\cdots}$' },
      ],
      lines: [
        { say: 'The same idea works for any number of repeats. The number of arrangements of n objects, where "a" are alike, b are alike, c are alike, and so on, is n factorial over "a" factorial, b factorial, c factorial, and so on.', show: 'def' },
        { say: 'Start with n factorial, as if every object were different. Then divide by the factorial of each group of alike objects, because swapping alike objects does not make a new arrangement.' },
      ],
    },
    {
      chapter: 'MISSISSIPPI',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{MISSISSIPPI: } 11 \\text{ letters}', '\\text{I} \\times 4,\\quad \\text{S} \\times 4,\\quad \\text{P} \\times 2,\\quad \\text{M} \\times 1', '\\dfrac{11!}{4!\\,4!\\,2!} = \\dfrac{39\\,916\\,800}{24 \\times 24 \\times 2} = \\dfrac{39\\,916\\,800}{1152}', '= 34\\,650'] },
      ],
      lines: [
        { say: 'Now the letters of the word Mississippi, spelled M I S S I S S I P P I. There are eleven letters.', show: 'm.0', focus: 'm.0' },
        { say: 'Count the repeats. I appears four times, S appears four times, P appears twice, and M once.', show: 'm.1', focus: 'm.1' },
        { say: 'So divide eleven factorial by four factorial, four factorial and two factorial. M appears once, and one factorial is one, so it changes nothing. Eleven factorial is 39,916,800, and the bottom is twenty-four times twenty-four times two, which is 1,152.', show: 'm.2', focus: 'm.2' },
        { say: 'That gives 34,650 different arrangements.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Routes on a grid',
      layout: 'split',
      leftWidth: 540,
      left: [figure('g', [streets({ cols: 4, rows: 3, route: 'EENENNE' })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{E E N E N N E}', '7 \\text{ moves: } 4\\ \\text{E},\\ 3\\ \\text{N}', '\\dfrac{7!}{4!\\,3!} = \\dfrac{5040}{24 \\times 6} = 35'] }],
      lines: [
        { say: 'Identical objects also count routes. On this grid of streets, how many shortest routes go from A to B?', show: ['g.grid', 'g.A', 'g.B'] },
        { say: 'A shortest route never goes back, so every one is four blocks east and three blocks north, in some order. Here is one: east, east, north, east, north, north, east.', show: ['g.route', 'm.0'], focus: ['g.route', 'm.0'] },
        { say: 'So every shortest route is an arrangement of seven moves: four E’s that are alike, and three N’s that are alike.', show: 'm.1', focus: 'm.1' },
        { say: 'Seven factorial over four factorial, three factorial, is 5,040 over twenty-four times six, which is thirty-five routes.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Watch out',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Divide for every group of alike objects', md: '$11!$ alone counts each arrangement of MISSISSIPPI $4!\\,4!\\,2! = 1152$ times. Divide by the factorial of **every** group: $4!$ for the I’s, $4!$ for the S’s and $2!$ for the P’s.' }],
      lines: [
        { say: 'A common mistake is to forget to divide, or to divide for only one group. Eleven factorial alone counts each arrangement of Mississippi 1,152 times.', show: 'oops' },
        { say: 'Divide by the factorial of every group of alike objects: four factorial for the I’s, four factorial for the S’s, and two factorial for the P’s.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'How many different arrangements are there of the letters of the word CANADA?',
          choices: ['$720$', '$240$', '$20$', '$120$'],
          answer: 3,
          working: '6 letters, with A appearing 3 times: $\\dfrac{6!}{3!} = \\dfrac{720}{6} = 120$.',
        },
      ],
      lines: [
        { say: 'Your turn. How many different arrangements are there of the letters of the word Canada, spelled C A N A D A? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is D, 120. There are six letters, and A appears three times, so divide six factorial by three factorial: 720 over six is 120. Choice A, 720, forgets that the three A’s are identical.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Swapping identical objects does not make a new arrangement.', 'With identical objects, divide: $\\dfrac{n!}{a!\\,b!\\,c!\\cdots}$', 'A shortest route on a grid is an arrangement of E’s and N’s.'] }],
      lines: [
        { say: 'Let’s sum up. Swapping identical objects does not make a new arrangement.', show: 'sum.0' },
        { say: 'So with identical objects, divide n factorial by the factorial of each group of alike objects.', show: 'sum.1' },
        { say: 'And a shortest route on a grid is an arrangement of E’s and N’s. In part four, we arrange objects with restrictions, such as two people who must sit together. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
