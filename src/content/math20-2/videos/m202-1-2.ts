import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-1-2',
  lessonId: 'm202-1-2',
  title: 'Counterexamples, Part 1: Disproving a Conjecture',
  thumbnailTitle: 'Counterexamples',
  thumbnail: 'm',
  summary: 'What a counterexample is, why 2 disproves "all primes are odd" and how to revise the conjecture, and why a counterexample must meet the condition, shown by testing 6, 12 and 16 against "divisible by 4 means divisible by 8". Part 2 looks at patterns that fail.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.2 · Part 1', title: 'Counterexamples', subtitle: 'One example is enough' }],
      lines: [
        { say: 'No matter how many examples support a conjecture, a single example that goes against it is enough to show that it is false.', show: 'title' },
        { say: 'In this video, you will find counterexamples, check that they meet the condition, and use them to revise a conjecture.' },
      ],
    },
    {
      chapter: 'What is a counterexample?',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Counterexample', md: 'A **counterexample** is an example that shows a conjecture is false. One counterexample is enough.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3,\\ 5,\\ 7,\\ 11,\\ 13:\\ \\text{prime and odd}', '2:\\ \\text{prime and even}', '\\text{Revised: every prime greater than } 2 \\text{ is odd.}'] },
      ],
      lines: [
        { say: 'A counterexample is an example that shows a conjecture is false. One counterexample is enough to disprove it.', show: 'def' },
        { say: 'Kiran conjectures that all prime numbers are odd. Three, five, seven, eleven and thirteen are prime, and odd. They support the conjecture, but they do not prove it.', show: 'm.0', focus: 'm.0' },
        { say: 'Two is prime, because its only factors are one and two. And two is even. So two is a counterexample, and the conjecture is false.', show: 'm.1', focus: 'm.1' },
        { say: 'After a counterexample, you can often revise the conjecture so that it fits all the evidence: every prime number greater than two is odd.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Meeting the condition',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{If a number is divisible by } 4, \\text{ then it is divisible by } 8.'] },
        { kind: 'table', id: 't', head: ['Number', 'Divisible by 4?', 'Divisible by 8?', 'Result'], rows: [['$6$', 'no', '—', 'does not test it'], ['$16$', 'yes', 'yes', 'supports it'], ['$12$', 'yes', 'no', 'counterexample']] },
      ],
      lines: [
        { say: 'Most conjectures have a condition, the if part, and a conclusion, the then part. A counterexample must meet the condition, and still make the conclusion false.' },
        { say: 'Conjecture: if a number is divisible by four, then it is divisible by eight. Which of six, twelve and sixteen is a counterexample?', show: ['m.0', 't'], focus: 'm.0' },
        { say: 'Six is not divisible by four, so it does not meet the condition, and cannot test the conjecture. Sixteen is divisible by four and by eight, so it supports it.' },
        { say: 'Twelve is three times four, so it is divisible by four. But twelve divided by eight is 1.5, not a whole number. So twelve is the counterexample.' },
      ],
    },
    {
      chapter: 'Missing the condition',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Choosing an example that misses the condition', md: '$6$ is not divisible by 8, but it is not divisible by 4 either, so it says nothing about the conjecture. Check the **condition** first, then the **conclusion**.' }],
      lines: [
        { say: 'Be careful: six is not divisible by eight, but it is not divisible by four either. It does not meet the condition, so it says nothing about the conjecture.', show: 'oops' },
        { say: 'To test a possible counterexample, check the condition first, then the conclusion.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Conjecture: "If a number is a multiple of 3, then it is odd." Which number is a counterexample?',
          choices: ['$12$', '$9$', '$7$', '$15$'],
          answer: 0,
          working: '$12$ is a multiple of 3, so it meets the condition, but it is even, so the conclusion is false. $7$ is not a multiple of 3.',
        },
      ],
      lines: [
        { say: 'Your turn. Conjecture: if a number is a multiple of three, then it is odd. Which number is a counterexample? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve is a multiple of three, so it meets the condition, but it is even, so the conclusion is false. Nine and fifteen support the conjecture, and seven does not meet the condition.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['One counterexample shows a conjecture is false.', 'A counterexample meets the condition and makes the conclusion false.', 'A counterexample can help you revise the conjecture.'] }],
      lines: [
        { say: 'Let’s sum up. One counterexample is enough to show that a conjecture is false.', show: 'sum.0' },
        { say: 'A counterexample must meet the condition, and make the conclusion false.', show: 'sum.1' },
        { say: 'And a counterexample can help you revise the conjecture. In part two, we see patterns that work for a long time, and then fail. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
