import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-1-3',
  lessonId: 'm202-1-3',
  title: 'Proving Conjectures: Deductive Reasoning, Part 1: Deductive Proof',
  thumbnailTitle: 'Deductive Reasoning',
  thumbnail: 'm',
  summary: 'How deductive reasoning differs from inductive reasoning, a deductive argument about the angles of a kite, an algebraic proof that the sum of two odd integers is even, and why two numbers need two different variables. Part 2 proves a number trick and finds errors in invalid proofs.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.3 · Part 1', title: 'Deductive Reasoning', subtitle: 'Proving it for every case' }],
      lines: [
        { say: 'Examples can suggest that a conjecture is true, but they can never check every case. To be sure, you need a different kind of reasoning.', show: 'title' },
        { say: 'In this video, you will compare inductive and deductive reasoning, and write a proof about all odd numbers.' },
      ],
    },
    {
      chapter: 'Two kinds of reasoning',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Deductive reasoning and proof', md: '**Deductive reasoning** starts from statements known to be true, such as definitions and properties, and uses logic to reach a conclusion that must be true. A **proof** shows that a statement is true in all cases.' },
        { kind: 'table', id: 't', head: ['', 'Inductive', 'Deductive'], rows: [['Starts from', 'specific examples', 'general facts'], ['Reaches', 'a general conjecture', 'a specific conclusion'], ['The conclusion is', 'probably true', 'certainly true']] },
      ],
      lines: [
        { say: 'Deductive reasoning starts from statements that are known to be true, such as definitions and properties, and uses logic to reach a conclusion that must also be true. A proof is an argument that shows a statement is true in all cases.', show: 'def' },
        { say: 'Inductive reasoning goes from examples to a conjecture that is probably true. The last five Route eight buses were late, so the next one will be late. Maybe, but maybe not.', show: 't' },
        { say: 'Deductive reasoning goes from general facts to a conclusion that must be true. Every Route eight bus stops at the library. This is a Route eight bus, so it will stop at the library.' },
      ],
    },
    {
      chapter: 'A deductive argument',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Every quadrilateral: angles add to } 360^\\circ', '\\text{A kite is a quadrilateral.}', '\\text{So a kite’s angles add to } 360^\\circ.'] }],
      lines: [
        { say: 'The interior angles of every quadrilateral add to 360 degrees. That is true for all of them.', show: 'm.0', focus: 'm.0' },
        { say: 'A kite is a quadrilateral, so it belongs to that group.', show: 'm.1', focus: 'm.1' },
        { say: 'So the interior angles of a kite must add to 360 degrees. No measuring is needed.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Proving a statement about numbers',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{even: } 2n,\\quad \\text{odd: } 2n + 1', '(2m + 1) + (2n + 1) = 2m + 2n + 2', '= 2(m + n + 1)', '2 \\times \\text{an integer, so it is even.}'] }],
      lines: [
        { say: 'Examples cannot prove a statement about all numbers, but algebra can. If n is any integer, then two n is even, and two n plus one is odd.', show: 'm.0', focus: 'm.0' },
        { say: 'Prove that the sum of any two odd integers is even. Let the odd integers be two m plus one, and two n plus one, where m and n are integers. Their sum is two m, plus two n, plus two.', show: 'm.1', focus: 'm.1' },
        { say: 'Factor out two: two, times m plus n plus one.', show: 'm.2', focus: 'm.2' },
        { say: 'Since m plus n plus one is an integer, the sum is two times an integer, which is even. That covers every pair of odd integers, so the conjecture is now proved.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Using the same variable',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the same variable twice', md: 'Writing two odd integers as $2n + 1$ and $2n + 1$ makes them the **same** number, so the proof only works for adding a number to itself. Use $2m + 1$ and $2n + 1$.' }],
      lines: [
        { say: 'Be careful: if you write both odd integers as two n plus one, they are the same number. The proof would only cover adding a number to itself. Numbers that can be different need different variables.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'To prove that the sum of any even integer and any odd integer is odd, how should you write the two integers?',
          choices: ['$2m$ and $2n + 1$', '$2n$ and $2n + 1$', '$m$ and $n$', '$2m + 1$ and $2n + 1$'],
          answer: 0,
          working: '$2m$ is any even integer and $2n + 1$ is any odd integer. Then $2m + 2n + 1 = 2(m + n) + 1$, which is odd. B only covers consecutive integers.',
        },
      ],
      lines: [
        { say: 'Your turn. To prove that the sum of any even integer and any odd integer is odd, how should you write the two integers? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A: two m, and two n plus one. Their sum is two, times m plus n, plus one, which is odd. B uses the same variable, so it only covers consecutive integers.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Deductive reasoning uses known facts to reach a conclusion that must be true.', 'Write even integers as $2n$ and odd integers as $2n + 1$.', 'Use different variables for numbers that can be different.'] }],
      lines: [
        { say: 'Let’s sum up. Deductive reasoning uses facts known to be true, to reach a conclusion that must be true.', show: 'sum.0' },
        { say: 'In proofs about integers, write even integers as two n, and odd integers as two n plus one.', show: 'sum.1' },
        { say: 'And use different variables for numbers that can be different. In part two, we prove a number trick, and find the errors in invalid proofs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
