import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-1-1',
  lessonId: 'm202-1-1',
  title: 'Making Conjectures: Inductive Reasoning, Part 1: Conjectures',
  thumbnailTitle: 'Inductive Reasoning',
  thumbnail: 'm',
  summary: 'What a conjecture is, using inductive reasoning to conjecture that the sum of two odd numbers is even, choosing among three conjectures about consecutive integers, and why evidence is not proof. Part 2 uses number and shape patterns to predict.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.1 · Part 1', title: 'Inductive Reasoning', subtitle: 'Making conjectures' }],
      lines: [
        { say: 'A manager at a Red Deer coffee shop notices that hot chocolate sales jump on every day colder than negative fifteen degrees, and starts ordering extra milk before cold snaps.', show: 'title' },
        { say: 'Spotting a pattern and making an educated guess from it is called inductive reasoning. In this video, you will make conjectures from examples, and choose the one that fits.' },
      ],
    },
    {
      chapter: 'Conjectures',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Conjecture and inductive reasoning', md: 'A **conjecture** is a statement you believe is true, based on evidence, but have not proved. **Inductive reasoning** uses specific examples to find a pattern, and makes a general conjecture.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3 + 5 = 8,\\quad 7 + 11 = 18,\\quad 15 + 21 = 36,\\quad 9 + 13 = 22', '8,\\ 18,\\ 36,\\ 22:\\ \\text{all even}'] },
      ],
      lines: [
        { say: 'A conjecture is a statement you believe is true, based on evidence such as examples, but that has not been proved. Inductive reasoning means looking at specific examples, finding a pattern, and using it to make a general conjecture.', show: 'def' },
        { say: 'Liam adds some pairs of odd numbers. Three plus five is eight, seven plus eleven is eighteen, fifteen plus twenty-one is thirty-six, and nine plus thirteen is twenty-two.', show: 'm.0', focus: 'm.0' },
        { say: 'What do the results have in common? They are not all multiples of four, or of three. But they are all even.', show: 'm.1', focus: 'm.1' },
        { say: 'So Liam’s conjecture is: the sum of two odd numbers is even.' },
      ],
    },
    {
      chapter: 'Choosing the conjecture that fits',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['4 + 5 + 6 = 15,\\quad 10 + 11 + 12 = 33,\\quad 21 + 22 + 23 = 66'] },
        { kind: 'table', id: 't', head: ['The sum…', 'Fits?'], rows: [['is odd', 'no: $66$ is even'], ['is a multiple of $6$', 'no: $15$ is not'], ['is $3 \\times$ the middle integer', 'yes: $15$, $33$ and $66$']] },
      ],
      lines: [
        { say: 'Several conjectures can seem reasonable, but a good one must fit every example. Sakura finds that four plus five plus six is fifteen, ten plus eleven plus twelve is thirty-three, and twenty-one plus twenty-two plus twenty-three is sixty-six.', show: 'm.0', focus: 'm.0' },
        { say: 'Is the sum of three consecutive integers always odd? No: sixty-six is even. Is it a multiple of six? No: fifteen is not.', show: 't' },
        { say: 'Is it three times the middle integer? Three times five is fifteen, three times eleven is thirty-three, and three times twenty-two is sixty-six. That one fits every example.' },
        { say: 'Notice that one example that does not fit is enough to rule a conjecture out.' },
      ],
    },
    {
      chapter: 'Evidence is not proof',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Evidence is not proof', md: 'A conjecture that fits many examples can still be false. More examples make you more confident, but they never **prove** that a conjecture is always true.' }],
      lines: [
        { say: 'But even a conjecture that fits many examples can still be false. More examples make you more confident, but they never prove that a conjecture is always true.', show: 'oops' },
        { say: 'In the next lessons, you will see how a single counterexample shows that a conjecture is false, and how to prove that a conjecture is true.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Mina notices that $2 \\times 3 = 6$, $4 \\times 5 = 20$ and $6 \\times 7 = 42$. Which conjecture fits all three?',
          choices: ['The product is even.', 'The product is a multiple of 6.', 'The product ends in 0.', 'The product is greater than 10.'],
          answer: 0,
          working: '$6$, $20$ and $42$ are all even. $20$ is not a multiple of 6, $6$ and $42$ do not end in 0, and $6$ is not greater than 10.',
        },
      ],
      lines: [
        { say: 'Your turn. Mina notices that two times three is six, four times five is twenty, and six times seven is forty-two. Which conjecture fits all three? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Six, twenty and forty-two are all even. Twenty is not a multiple of six, six and forty-two do not end in zero, and six is not greater than ten.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Inductive reasoning uses examples to make a general conjecture.', 'A conjecture must fit every example; one that does not fit rules it out.', 'Supporting examples are evidence, not proof.'] }],
      lines: [
        { say: 'Let’s sum up. Inductive reasoning uses specific examples to make a general conjecture.', show: 'sum.0' },
        { say: 'A conjecture must fit every example, and one example that does not fit rules it out.', show: 'sum.1' },
        { say: 'And supporting examples are evidence, not proof. In part two, we make conjectures from number and shape patterns. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
