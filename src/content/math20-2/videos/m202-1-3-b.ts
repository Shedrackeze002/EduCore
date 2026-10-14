import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm202-1-3-b',
  lessonId: 'm202-1-3',
  title: 'Proving Conjectures: Deductive Reasoning, Part 2: Number Tricks and Invalid Proofs',
  thumbnailTitle: 'Number Tricks and Invalid Proofs',
  thumbnail: 'm',
  summary: 'Proving that a number trick always gives 4, what makes a proof valid or invalid, finding the division by zero in a "proof" that 2 = 1, losing a solution by dividing by x, and spotting a dropped negative square root.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 1.3 · Part 2', title: 'Number Tricks and Invalid Proofs', subtitle: 'Why it works, and where it breaks' }],
      lines: [
        { say: 'Choose a number, do a few steps, and the answer is always the same. Algebra can show why. And sometimes an argument that looks like a proof hides an error.', show: 'title' },
        { say: 'In this video, you will prove a number trick, and find the errors in invalid proofs.' },
      ],
    },
    {
      chapter: 'Proving a number trick',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Step', 'With $n$', 'With $7$'], rows: [['Choose a number', '$n$', '$7$'], ['Add 6', '$n + 6$', '$13$'], ['Multiply by 2', '$2n + 12$', '$26$'], ['Subtract 4', '$2n + 8$', '$22$'], ['Divide by 2', '$n + 4$', '$11$'], ['Subtract the number you chose', '$4$', '$4$']] },
      ],
      lines: [
        { say: 'Choose a number. Add six. Multiply by two. Subtract four. Divide by two. Then subtract the number you started with. Prove that the result is always four.', show: 't' },
        { say: 'Let the number be n. Adding six gives n plus six. Multiplying by two gives two n plus twelve, and subtracting four gives two n plus eight.' },
        { say: 'Dividing by two gives n plus four. And subtracting the starting number, n, leaves four. The n cancels out, so the result is four, whatever number you choose.' },
        { say: 'Starting with seven checks it: thirteen, twenty-six, twenty-two, eleven, and four. But the algebra is the proof, because it covers every number.' },
      ],
    },
    {
      chapter: 'Valid and invalid proofs',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Valid and invalid proofs', md: 'A **valid** proof uses correct reasoning at every step. An **invalid** proof has at least one error, so its conclusion cannot be trusted.' },
        { kind: 'bullets', id: 'b', items: ['dividing by zero', 'dropping the negative square root', 'relying on examples', 'algebra slips'] },
      ],
      lines: [
        { say: 'A valid proof uses correct reasoning at every step. An invalid proof has at least one error, so its conclusion cannot be trusted.', show: 'def' },
        { say: 'Common errors are dividing by zero, dropping the negative square root, claiming something is always true because a few examples work, and algebra slips.', show: ['b.0', 'b.1', 'b.2', 'b.3'] },
      ],
    },
    {
      chapter: 'A proof that 2 = 1?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['a = b,\\quad a^2 = ab,\\quad a^2 - b^2 = ab - b^2', '(a + b)(a - b) = b(a - b)', 'a + b = b,\\quad 2b = b,\\quad 2 = 1\\,?', 'a = b, \\text{ so } a - b = 0'] }],
      lines: [
        { say: 'Here is a famous invalid proof. Let "a" and b be equal numbers that are not zero. Multiply both sides by "a", then subtract b squared.', show: 'm.0', focus: 'm.0' },
        { say: 'Factor both sides: "a" plus b, times "a" minus b, equals b, times "a" minus b.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by "a" minus b, to get "a" plus b equals b. Since "a" equals b, that is two b equals b, so two equals one?', show: 'm.2', focus: 'm.2' },
        { say: 'The error is the division. Since "a" equals b, "a" minus b is zero, and dividing by zero is not allowed.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Dividing by a variable',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by a variable', md: 'Dividing both sides of $x^2 = 5x$ by $x$ gives $x = 5$, but it loses the solution $x = 0$. Only divide by $x$ when you know $x \\ne 0$.' }],
      lines: [
        { say: 'The same error hides in equations. Dividing both sides of x squared equals five x by x gives x equals five, but it loses the solution x equals zero. Only divide by x when you know it is not zero.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A student writes: $(-5)^2 = 25$ and $5^2 = 25$, so $(-5)^2 = 5^2$. Taking the square root of both sides, $-5 = 5$. What is the error?',
          choices: ['Taking the square root drops the negative root.', 'Dividing by zero.', 'Relying on examples.', '$(-5)^2$ is not $25$.'],
          answer: 0,
          working: 'If $x^2 = 5^2$, then $x = 5$ or $x = -5$. Taking only the positive root ignores the negative one.',
        },
      ],
      lines: [
        { say: 'Your turn. Negative five, squared, is twenty-five, and five squared is twenty-five. Taking the square root of both sides gives negative five equals five. What is the error? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Two numbers with the same square can be opposites, so taking the square root of both sides drops the negative root.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Algebra explains number tricks: the starting number cancels out.', 'An invalid proof has at least one error in its reasoning.', 'Watch for dividing by zero and dropping a negative root.'] }],
      lines: [
        { say: 'Let’s sum up. Algebra explains number tricks, because the starting number cancels out.', show: 'sum.0' },
        { say: 'An invalid proof has at least one error in its reasoning.', show: 'sum.1' },
        { say: 'And watch for dividing by an expression that could be zero, and for dropping a negative root. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
