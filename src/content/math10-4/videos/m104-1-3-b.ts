import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-1-3-b',
  lessonId: 'm104-1-3',
  title: 'Estimating, Part 2: Two-Step Problems',
  thumbnailTitle: 'Two-Step Problems',
  summary: 'A five-step plan for word problems (read, choose, calculate, check, answer), boxes left in a warehouse after a shipment, and buses for a field trip, where the remainder means rounding up.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.3 · Part 2', title: 'Two-Step Problems', subtitle: 'Plan, calculate and check' }],
      lines: [
        { say: 'Many real problems need two steps: first find one amount, then use it to find another.', show: 'title' },
        { say: 'In this video, you will use a plan to solve two-step problems, and check them with an estimate.' },
      ],
    },
    {
      chapter: 'A plan',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'b', items: ['**Read** the problem. What do you need to find?', '**Choose** an operation for each step.', '**Calculate.**', '**Check** with an estimate.', '**Answer** in a sentence, with units.'] }],
      lines: [
        { say: 'Use this plan. Read the problem: what do you need to find?', show: 'b.0' },
        { say: 'Choose an operation for each step, then calculate.', show: ['b.1', 'b.2'] },
        { say: 'Check with an estimate, and answer in a sentence, with units.', show: ['b.3', 'b.4'] },
      ],
    },
    {
      chapter: 'Boxes in a warehouse',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 22 \\times 48 = 1{,}056 \\text{ boxes}', '\\text{Step 2: } 1{,}056 - 315 = 741 \\text{ boxes}', '\\text{Check: } 20 \\times 50 - 300 = 700 \\;\\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Stopping after one step', md: 'After Step 1, you know how many boxes came in. That is not the answer yet. Read the question again.' },
      ],
      lines: [
        { say: 'A warehouse receives 22 pallets with 48 boxes on each. Then 315 boxes are shipped out. How many boxes are left?', show: 'm.0' },
        { say: 'Step one: equal groups, so multiply. 22 times 48 is 1,056 boxes.', focus: 'm.0' },
        { say: 'That is not the answer yet. Read the question again: boxes are taken away, so subtract. 1,056 minus 315 is 741.', show: ['m.1', 'oops'], focus: 'm.1' },
        { say: 'Check: twenty times fifty is 1,000, and 1,000 minus 300 is 700. 741 is close to 700, so there are 741 boxes left.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'A field trip',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{Step 1: } 5 \\times 28 = 140 \\text{ students}', '\\text{Step 2: } 140 \\div 52 = 2 \\text{ R } 36 \\;\\to\\; 3 \\text{ buses}', '\\text{Check: } 5 \\times 30 = 150, \\; 150 \\div 50 = 3 \\;\\checkmark'] }],
      lines: [
        { say: 'Five classes go on a field trip, and each class has 28 students. A bus holds 52 students. How many buses are needed?', show: 'm.0' },
        { say: 'Step one: equal classes, so multiply. Five times 28 is 140 students.', focus: 'm.0' },
        { say: 'Step two: split them into busloads, so divide. 140 divided by 52 is two, remainder 36. The 36 extra students still need a seat, so round up to three buses.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: five times thirty is 150, and 150 divided by fifty is three. That matches, so they need three buses.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A store gets $12$ cases of $24$ cans. It sells $150$ cans. How many cans are left?',
          choices: ['$138$', '$288$', '$186$', '$162$'],
          answer: 0,
          working: '$12 \\times 24 = 288$ cans, and $288 - 150 = 138$ cans left.',
        },
      ],
      lines: [
        { say: 'Your turn. A store gets twelve cases of 24 cans, and sells 150 cans. How many cans are left? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Twelve times 24 is 288 cans, and 288 minus 150 is 138. B stops after the first step.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Read, choose, calculate, check, answer.', 'Choose an operation for each step.', 'With a remainder, decide whether to round up or down.'] }],
      lines: [
        { say: 'Let’s sum up. For a two-step problem: read, choose, calculate, check with an estimate, and answer in a sentence.', show: 'sum.0' },
        { say: 'Choose an operation for each step, and do not stop after the first one.', show: 'sum.1' },
        { say: 'And with a remainder, decide whether to round up or down. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
