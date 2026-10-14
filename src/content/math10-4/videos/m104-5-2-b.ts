import type { Explainer } from '@/video/script.ts';
import { figure } from '@/video/solids.ts';
import { rectangle } from '@/video/triangles.ts';

const video: Explainer = {
  id: 'm104-5-2-b',
  lessonId: 'm104-5-2',
  title: 'Expressions and Formulas, Part 2: Using Formulas',
  thumbnailTitle: 'Using Formulas',
  thumbnail: 'g',
  summary: 'Substituting into a formula and multiplying before adding: the perimeter of a garden with P = 2l + 2w, pay for a shift with P = rh, a taxi fare, and using a formula as the first step of a two-step job.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 5.2 · Part 2', title: 'Using Formulas', subtitle: 'Substitute, then calculate' }],
      lines: [
        { say: 'How much fence goes around a garden? What is the pay for a shift? A formula gives the answer every time: you just put in the numbers.', show: 'title' },
        { say: 'In this video, you will substitute into formulas, and use the answer for the next step.' },
      ],
    },
    {
      chapter: 'Substituting',
      layout: 'split',
      leftWidth: 460,
      left: [figure('g', [rectangle({ w: 12, h: 7, labels: { w: '12\\text{ m}', h: '7\\text{ m}' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Formula', md: 'A rule that uses variables to show how to calculate something. To **substitute** is to replace each variable with its number.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['P = 2l + 2w', 'P = 2(12) + 2(7)', 'P = 24 + 14 = 38\\text{ m}'] },
      ],
      lines: [
        { say: 'A formula is a rule that uses variables to show how to calculate something. To substitute means to replace each variable with its number.', show: 'def' },
        { say: 'The perimeter of a rectangle is P equals two l plus two w. A garden is twelve metres long and seven metres wide.', show: ['g.shape', 'm.0'], focus: 'm.0' },
        { say: 'Substitute l equals twelve and w equals seven: two times twelve, plus two times seven.', show: 'm.1', focus: 'm.1' },
        { say: 'Multiply first: 24 plus fourteen. Then add: the perimeter is 38 metres.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Pay and fares',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['P = rh = 16.50 \\times 7.5 = 123.75', 'C = 4 + 2k = 4 + 2(10) = 24'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding before multiplying', md: 'For $C = 4 + 2k$ with $k = 10$, do **not** add $4 + 2$ first: $6 \\times 10 = 60$ is far too much.' },
      ],
      lines: [
        { say: 'The formula P equals r h gives the pay for h hours at r dollars per hour. For 7.5 hours at 16 dollars 50 an hour, P is 16.50 times 7.5: 123 dollars 75.', show: 'm.0', focus: 'm.0' },
        { say: 'A taxi fare is C equals four plus two k. For k equals ten, multiply first: four plus twenty, 24 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Do not add four plus two first. That gives six times ten, sixty dollars, which is far too much.', show: 'oops' },
      ],
    },
    {
      chapter: 'Two-step jobs',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['C = 4.25 + 2.10 \\times 12', 'C = 4.25 + 25.20 = 29.45', '40 - 29.45 = 10.55'] }],
      lines: [
        { say: 'Often a formula is only the first step. A taxi uses C equals 4.25 plus 2.10 k, where k is the distance in kilometres. Tia rides twelve kilometres, and pays with forty dollars.', show: 'm.0' },
        { say: 'Substitute twelve for k, and multiply first: 4.25 plus 25.20 is 29 dollars 45.', show: 'm.1', focus: 'm.1' },
        { say: 'Now use that answer: her change is forty minus 29.45, which is 10 dollars 55.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with an estimate. 2.10 is about two, so twelve kilometres costs about 24 dollars, and the four dollars at the start makes about 28. The fare of 29 dollars 45 is close, so it makes sense.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Use $C = 5 + 3k$ to find the cost $C$ when $k = 8$.',
          choices: ['$29$', '$64$', '$16$', '$40$'],
          answer: 0,
          working: 'Substitute and multiply first: $C = 5 + 3(8) = 5 + 24 = 29$.',
        },
      ],
      lines: [
        { say: 'Your turn. Use C equals five plus three k to find the cost when k is eight. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Multiply first: three times eight is 24, and five plus 24 is 29. B adds five and three first.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Substitute the numbers into the formula.', 'Multiply before you add.', 'Use the answer for the next step of the job.'] }],
      lines: [
        { say: 'Let’s sum up. To use a formula, substitute the numbers for the variables.', show: 'sum.0' },
        { say: 'Then multiply before you add.', show: 'sum.1' },
        { say: 'And use the answer for the next step of the job, such as finding change. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
