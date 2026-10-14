import type { Explainer } from '@/video/script.ts';
import { figure, type Part } from '@/video/solids.ts';

/** A balance scale with `left` on one pan and `right` on the other. */
function scale(left: string, right: string): Part {
  return {
    points: { L: [1, 3], R: [9, 3], M: [5, 3], B1: [4, 0.6], B2: [6, 0.6], lp: [2.5, 3.6], rp: [7.5, 3.6], l1: [1.3, 3], l2: [3.7, 3], r1: [6.3, 3], r2: [8.7, 3] },
    items: [
      { kind: 'line', id: 'beam', from: 'L', to: 'R', weight: 5, group: 'scale' },
      { kind: 'line', id: 'post1', from: 'M', to: 'B1', group: 'scale' },
      { kind: 'line', id: 'post2', from: 'M', to: 'B2', group: 'scale' },
      { kind: 'line', id: 'base', from: 'B1', to: 'B2', group: 'scale' },
      { kind: 'line', id: 'lpan', from: 'l1', to: 'l2', tone: 'adj', weight: 7, group: 'scale' },
      { kind: 'line', id: 'rpan', from: 'r1', to: 'r2', tone: 'opp', weight: 7, group: 'scale' },
      { kind: 'label', id: 'left', at: 'lp', tex: left, tone: 'adj', place: 'center' },
      { kind: 'label', id: 'right', at: 'rp', tex: right, tone: 'opp', place: 'center' },
    ],
  };
}

const video: Explainer = {
  id: 'm104-5-3',
  lessonId: 'm104-5-3',
  title: 'Solving Equations',
  thumbnailTitle: 'Solving Equations',
  thumbnail: 'bal',
  summary: 'An equation as a balanced scale, solving with inverse operations done to both sides, finding hours worked from pay, and two-step equations undone in reverse order (subtract first, then divide), always checking the answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.3', title: 'Solving Equations', subtitle: 'Working backwards from the answer' }],
      lines: [
        { say: 'Your taxi fare was 22 dollars: how many kilometres did you ride? You earned 252 dollars: how many hours did you work? Questions like these work backwards from an answer.', show: 'title' },
        { say: 'In this video, you will solve equations step by step.' },
      ],
    },
    {
      chapter: 'A balanced scale',
      layout: 'split',
      leftWidth: 500,
      left: [figure('bal', [scale('x + 7', '15')])],
      right: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Equation', md: 'A maths sentence with an equal sign. Both sides have the same value, like a balanced scale. To **solve** it, find the value of the variable that makes it true.' }],
      lines: [
        { say: 'An equation is a maths sentence with an equal sign, like x plus seven equals fifteen. Both sides have the same value, like a balanced scale.', show: ['bal.scale', 'bal.left', 'bal.right', 'def'] },
        { say: 'To solve an equation means to find the value of the variable that makes it true. What number plus seven makes fifteen? Eight. For bigger numbers, guessing is slow, so there is a better way.' },
      ],
    },
    {
      chapter: 'Inverse operations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['x + 7 = 15 \\;\\to\\; x = 15 - 7 = 8', '4x = 36 \\;\\to\\; x = 36 \\div 4 = 9', '18h = 252 \\;\\to\\; h = 252 \\div 18 = 14'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Doing the same operation', md: 'Adding $7$ to $x + 7 = 15$ gives $x = 22$, but $22 + 7 = 29$. Do the **opposite**, and always check.' },
      ],
      lines: [
        { say: 'An inverse operation undoes another one. Adding and subtracting are inverses, and so are multiplying and dividing. Do the inverse to both sides, and the scale stays balanced.' },
        { say: 'In x plus seven equals fifteen, seven is added to x. So subtract seven from both sides: x is eight. Check: eight plus seven is fifteen.', show: 'm.0', focus: 'm.0' },
        { say: 'Four x means four times x. So divide both sides by four: x is nine.', show: 'm.1', focus: 'm.1' },
        { say: 'Kai earns eighteen dollars an hour, and earned 252 dollars last week. Eighteen h equals 252, so h is 252 divided by eighteen: fourteen hours.', show: 'm.2', focus: 'm.2' },
        { say: 'Some students add seven and get 22. Check it: 22 plus seven is 29, not fifteen. Always do the opposite operation, and check.', show: 'oops' },
      ],
    },
    {
      chapter: 'Two-step equations',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['3x + 5 = 26', '3x = 26 - 5 = 21', 'x = 21 \\div 3 = 7', '3 \\times 7 + 5 = 26 \\;\\checkmark'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing first', md: 'The $5$ is not multiplied by $3$, so subtract it **before** you divide.' },
      ],
      lines: [
        { say: 'In three x plus five equals 26, two things happen to x: it is multiplied by three, then five is added. Undo them in the reverse order.', show: 'm.0' },
        { say: 'Undo the adding first: subtract five from both sides. Three x is 21.', show: 'm.1', focus: 'm.1' },
        { say: 'Then undo the multiplying: divide both sides by three. x is seven.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: three times seven, plus five, is 26. Do not divide by three first: the five is not multiplied by three.', show: ['m.3', 'oops'], focus: 'm.3' },
      ],
    },
    {
      chapter: 'A taxi ride',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2k + 4 = 22', '2k = 18 \\;\\to\\; k = 9\\text{ km}', '2 \\times 9 + 4 = 22 \\;\\checkmark'] }],
      lines: [
        { say: 'A taxi charges four dollars to start, plus two dollars for each kilometre. Lina’s fare was 22 dollars. Let k be the kilometres: two k plus four equals 22.', show: 'm.0' },
        { say: 'Subtract four: two k is eighteen. Divide by two: k is nine. Lina rode nine kilometres. Check: two times nine plus four is 22.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Solve $5x + 3 = 38$.',
          choices: ['$x = 7$', '$x = 8.2$', '$x = 41$', '$x = 35$'],
          answer: 0,
          working: 'Subtract $3$: $5x = 35$. Divide by $5$: $x = 7$. Check: $5 \\times 7 + 3 = 38$.',
        },
      ],
      lines: [
        { say: 'Your turn. Solve five x plus three equals 38. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract three: five x is 35. Divide by five: x is seven. Check: five times seven plus three is 38. B adds three instead of subtracting it.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Do the inverse operation to both sides.', 'Two steps: undo the adding first, then the multiplying.', 'Always check: put your answer back in.'] }],
      lines: [
        { say: 'Let’s sum up. To solve an equation, do the inverse operation to both sides.', show: 'sum.0' },
        { say: 'For two steps, undo the adding or subtracting first, then the multiplying or dividing.', show: 'sum.1' },
        { say: 'And always check by putting your answer back into the equation. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
