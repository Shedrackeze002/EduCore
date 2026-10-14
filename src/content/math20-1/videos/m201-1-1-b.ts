import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { numberLine } from '@/video/numbers.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm201-1-1-b',
  lessonId: 'm201-1-1',
  title: 'Arithmetic Sequences, Part 2: Missing Terms and Positions',
  thumbnailTitle: 'Missing Terms and Positions',
  thumbnail: 'gap',
  summary: 'Finding the common difference from two terms that are not next to each other, which term a value is, how many terms a sequence has, why a fractional n means a value is not a term, and arithmetic sequences for theatre seats and a falling stone.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-1 · Lesson 1.1 · Part 2', title: 'Missing Terms and Positions', subtitle: 'Solve for whatever is missing' }],
      lines: [
        { say: 'The general term links four quantities: t sub n, t sub one, n and d. Know any three, and you can find the fourth.', show: 'title' },
        { say: 'In this video, you will work from two terms, find which term a value is, and count the terms of a sequence.' },
      ],
    },
    {
      chapter: 'From two terms',
      layout: 'split',
      leftWidth: 620,
      left: [
        figure('gap', [
          numberLine({
            min: 0,
            max: 21,
            step: 1,
            every: 0,
            points: [
              { id: 'a', value: 4, tex: 't_4 = 17', tone: 'adj', below: true },
              { id: 'b', value: 11, tex: 't_{11} = 52', tone: 'adj', below: true },
              { id: 'c', value: 20, tex: 't_{20} = \\,?', tone: 'opp', below: true },
            ],
            spans: [{ id: 'steps', from: 4, to: 11, label: '7 \\text{ steps}' }],
          }),
        ]),
      ],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['52 = 17 + 7d', '7d = 35,\\quad d = 5', 't_1 = 17 - 3(5) = 2', 't_{20} = 2 + 19(5) = 97'] }],
      lines: [
        { say: 'In an arithmetic sequence, t sub four is seventeen and t sub eleven is 52. Find t sub twenty.', show: ['gap.axis', 'gap.a', 'gap.b', 'gap.c'] },
        { say: 'Count the steps between the two terms you know. From term four to term eleven is seven steps, so t sub eleven is t sub four plus seven d.', show: ['gap.steps', 'm.0'], focus: ['gap.steps', 'm.0'] },
        { say: 'So 52 equals seventeen plus seven d. Then seven d is 35, and d is five.', show: 'm.1', focus: 'm.1' },
        { say: 'Work back three steps to the first term: seventeen minus fifteen is two. Then t sub twenty is two plus nineteen times five: 97.', show: ['m.2', 'm.3'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'Which term is it?',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['97 = 5 + (n - 1)(4)', '92 = 4(n - 1),\\quad n - 1 = 23,\\quad n = 24', '152 = 7 + 5(n - 1),\\quad n - 1 = 29,\\quad n = 30'] },
      ],
      lines: [
        { say: 'Which term of five, nine, thirteen is 97? Put 97 in for t sub n: 97 equals five plus n minus one, times four.', show: 'm.0', focus: 'm.0' },
        { say: 'Subtract five: 92 equals four times n minus one. So n minus one is 23, and n is 24. 97 is t sub 24.', show: 'm.1', focus: 'm.1' },
        { say: 'Counting terms works the same way. How many terms are in seven, twelve, seventeen, and so on up to 152? The last term is t sub n, so 152 equals seven plus five times n minus one. Then n minus one is 29, and there are thirty terms.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Not a term',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['100 = 5 + 4(n - 1)', 'n - 1 = 23.75'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Accepting a fraction for n', md: 'The position $n$ must be a natural number. $n - 1 = 23.75$ means $100$ is **not** a term of $5,\\ 9,\\ 13,\\ \\ldots$' },
      ],
      lines: [
        { say: 'Is 100 a term of five, nine, thirteen? Solve: 100 equals five plus four times n minus one.', show: 'm.0', focus: 'm.0' },
        { say: 'That gives n minus one equals 23.75. But a position must be a natural number: there is no term number 24.75.', show: 'm.1', focus: 'm.1' },
        { say: 'So 100 is not a term of the sequence. The terms jump from 97 to 101, right past it.', show: 'oops' },
      ],
    },
    {
      chapter: 'Theatre seats',
      layout: 'split',
      leftWidth: 560,
      left: [figure('rows', [barGraph({ categories: ['1', '2', '3', '4', '5'], values: [18, 20, 22, 24, 26], max: 30, step: 5, height: 5, titles: { x: 'Row', y: 'Seats' } })])],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['t_n = 18 + 2(n - 1) = 2n + 16', 't_{25} = 2(25) + 16 = 66', '60 = 2n + 16,\\quad n = 22'] }],
      lines: [
        { say: 'The first row of a theatre has eighteen seats, and each row has two more seats than the row in front of it.', show: ['rows.scale', 'rows.b0', 'rows.b1', 'rows.b2', 'rows.b3', 'rows.b4'] },
        { say: 't sub one is eighteen and d is two, so t sub n is eighteen plus two times n minus one, which simplifies to two n plus sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Row 25 has two times 25, plus sixteen: 66 seats.', show: 'm.1', focus: 'm.1' },
        { say: 'Which row has sixty seats? Sixty equals two n plus sixteen, so two n is 44, and it is row 22.', show: 'm.2', focus: 'm.2' },
        { say: 'A falling stone works the same way: 4.9 metres in the first second, and 9.8 metres more each second, so it falls 9.8 n minus 4.9 metres in second n.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'In an arithmetic sequence, $t_3 = 11$ and $t_8 = 31$. Find the common difference $d$.',
          choices: ['$4$', '$5$', '$20$', '$3.875$'],
          answer: 0,
          working: 'From $t_3$ to $t_8$ is $5$ steps: $31 - 11 = 20 = 5d$, so $d = 4$.',
        },
      ],
      lines: [
        { say: 'Your turn. In an arithmetic sequence, t sub three is eleven and t sub eight is 31. Find the common difference. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. From term three to term eight is five steps, and the terms grow by 31 minus eleven: twenty. So five d is twenty, and d is four. B counts the steps, and C is the total change.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['From two terms: the gap between them is the number of steps times $d$.', 'Solve $t_n = t_1 + (n - 1)d$ for whichever quantity is missing.', '$n$ must be a natural number, or the value is not a term.'] }],
      lines: [
        { say: 'Let’s sum up. From two terms, the gap between them is the number of steps, times d.', show: 'sum.0' },
        { say: 'Solve the general term for whichever quantity is missing.', show: 'sum.1' },
        { say: 'And n must be a natural number, or the value is not a term. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
