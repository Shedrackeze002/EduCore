import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-2-d',
  lessonId: 'm204-5-2',
  title: 'Solving Equations, Part 4: Checking Your Answer',
  thumbnailTitle: 'Checking Your Answer',
  thumbnail: 'm',
  summary: 'Checking a solution by putting it back into the equation, catching a mistake in 2w + 30 = 46 (w = 38 fails, w = 8 works), and asking whether an answer makes sense.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.2 · Part 4', title: 'Checking Your Answer', subtitle: 'Put it back in' }],
      lines: [
        { say: 'Every equation comes with a built-in answer key. Put your answer back in, and the equation tells you whether you are right.', show: 'title' },
        { say: 'In this video, you will check solutions, catch a mistake, and ask whether an answer makes sense.' },
      ],
    },
    {
      chapter: 'How to check',
      layout: 'center',
      main: [{ kind: 'callout', id: 'rule', tone: 'tip', title: 'Check by substituting', md: 'Put your answer back into the **original** equation. Work out each side. If both sides match, your answer is right.' }],
      lines: [
        { say: 'To check a solution, put your answer back into the original equation, the one you started with, not a later step. Then work out each side. If both sides match, your answer is right. If they do not, something went wrong. Checking takes only a few seconds, and it can save you from losing marks.', show: 'rule' },
      ],
    },
    {
      chapter: 'Catching a mistake',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Noor solved $2w + 30 = 46$ and got $w = 38$.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['2 \\times 38 + 30 = 106 \\ne 46', '2w = 16', 'w = 8', '2 \\times 8 + 30 = 46 \\;\\checkmark'] },
      ],
      lines: [
        { say: 'Noor solved two w plus thirty equals 46, and got w equals 38. Is she right?', show: 'q' },
        { say: 'Check it: two times 38 is 76, plus thirty is 106. That is not 46, so something went wrong.', show: 'm.0', focus: 'm.0' },
        { say: 'Redo it. Undo the plus thirty first: subtract thirty from both sides. Two w equals sixteen.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide both sides by two: w equals eight.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: two times eight is sixteen, plus thirty is 46. It works. Noor added thirty instead of subtracting it, and the check caught the mistake.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Does it make sense?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Does the answer make sense?', md: 'A taxi ride of $500$ km or a shift of $90$ hours should make you stop and check your work.' }],
      lines: [
        { say: 'Also ask: does the answer make sense? A taxi ride of 500 kilometres, or a shift of 90 hours, should make you stop and check your work.', show: 'tip' },
        { say: 'Noor’s first answer, 38, made the left side more than twice as big as 46. A quick look like that can tell you an answer is wrong before you even finish the check.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ella solved $5p - 12 = 33$ and got $p = 4.2$. Check the answer. What is the correct solution?',
          choices: ['$p = 9$', '$p = 4.2$', '$p = 6.6$', '$p = 225$'],
          answer: 0,
          working: 'Check: $5 \\times 4.2 - 12 = 9$, not $33$. Add $12$: $5p = 45$, so $p = 9$. Check: $5 \\times 9 - 12 = 33$. B subtracted $12$ instead of adding it, and C forgets the $12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ella solved five p minus twelve equals 33, and got p equals 4.2. Check the answer. What is the correct solution? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Five times 4.2, minus twelve, is nine, not 33, so 4.2 is wrong. Add twelve to both sides: five p equals 45, so p equals nine. Check: five times nine, minus twelve, is 33. B is Ella’s answer, and C forgets the twelve.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put your answer back into the original equation.', 'If both sides match, it is right.', 'Ask whether the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. Put your answer back into the original equation.', show: 'sum.0' },
        { say: 'If both sides match, your answer is right.', show: 'sum.1' },
        { say: 'And ask whether the answer makes sense in the real world. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
