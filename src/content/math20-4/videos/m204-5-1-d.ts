import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-5-1-d',
  lessonId: 'm204-5-1',
  title: 'Using Formulas, Part 4: Formulas in Two-Step Jobs',
  thumbnailTitle: 'Two-Step Jobs',
  thumbnail: 'm',
  summary: 'Using a formula, then its answer: new flooring for a 4.5 m by 3.2 m bedroom (14.4 square metres at 28.50 dollars is 410.40 dollars), and fencing a yard (41.8 m at 24.50 dollars a metre is 1,024.10 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 5.1 · Part 4', title: 'Formulas in Two-Step Jobs', subtitle: 'Use the formula, then use its answer' }],
      lines: [
        { say: 'On the job, a formula is often just the first step. A floor installer finds the area, then the cost. A fencer finds the perimeter, then the price.', show: 'title' },
        { say: 'In this video, you will use a formula, then use its answer to finish a job.' },
      ],
    },
    {
      chapter: 'New flooring',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A bedroom is $4.5$ m long and $3.2$ m wide. Flooring costs \\$28.50 per square metre.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['A = lw = 4.5 \\times 3.2 = 14.4 \\text{ m}^2', '14.4 \\times 28.50 = 410.40'] },
      ],
      lines: [
        { say: 'A bedroom is 4.5 metres long and 3.2 metres wide. Flooring costs 28 dollars fifty per square metre. What will the flooring cost?', show: 'q' },
        { say: 'Step one is the formula. The area of a rectangle is A equals l w: 4.5 times 3.2 is 14.4 square metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two uses that answer. The flooring is priced per square metre, so multiply: 14.4 times 28.50 is 410 dollars 40.', show: 'm.1', focus: 'm.1' },
        { say: 'Keep the full area for the second step. Rounding 14.4 down to fourteen would make the cost about eleven dollars too low.' },
      ],
    },
    {
      chapter: 'Fencing a yard',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'The yard from part two is $12.5$ m by $8.4$ m. Fence costs \\$24.50 per metre.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P = 2l + 2w = 2 \\times 12.5 + 2 \\times 8.4 = 41.8 \\text{ m}', '41.8 \\times 24.50 = 1{,}024.10'] },
      ],
      lines: [
        { say: 'Now the yard from part two, 12.5 metres by 8.4 metres. In this example, fence costs 24 dollars fifty per metre. What will the fence cost?', show: 'q' },
        { say: 'Step one: the perimeter formula. P equals two l plus two w: 41.8 metres.', show: 'm.0', focus: 'm.0' },
        { say: 'Step two: fence is priced per metre, so multiply: 41.8 times 24.50 is 1,024 dollars ten.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Area or perimeter?',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Area or perimeter?', md: 'Things that **cover** a surface, like flooring, paint or sod, use **area**, priced per square metre. Things that go **around** the edge, like fence or trim, use **perimeter**, priced per metre.' }],
      lines: [
        { say: 'How do you know which formula to use? Things that cover a surface, like flooring, paint or sod, use area, and they are priced per square metre.', show: 'tip' },
        { say: 'Things that go around the edge, like fence or trim, use perimeter, and they are priced per metre. Read the units in the price to check.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A room is $5.2$ m long and $3.5$ m wide. Carpet costs \\$32.00 per square metre. What will the carpet cost?',
          choices: ['\\$582.40', '\\$556.80', '\\$18.20', '\\$544.00'],
          answer: 0,
          working: 'Area: $5.2 \\times 3.5 = 18.2\\ \\text{m}^2$. Cost: $18.2 \\times 32.00 = 582.40$. B uses the perimeter, $17.4$ m, and C is the area, not the cost.',
        },
      ],
      lines: [
        { say: 'Your turn. A room is 5.2 metres long and 3.5 metres wide. Carpet costs 32 dollars per square metre. What will the carpet cost? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The area is 5.2 times 3.5: 18.2 square metres. Times 32, that is 582 dollars 40. B uses the perimeter instead of the area, and C is the area, not the cost.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Step one: use the formula.', 'Step two: use its answer, like area × price per m².', 'Covering uses area; going around uses perimeter.'] }],
      lines: [
        { say: 'Let’s sum up. In a two-step job, first use the formula.', show: 'sum.0' },
        { say: 'Then use its answer, like the area times the price per square metre.', show: 'sum.1' },
        { say: 'And remember: covering a surface uses area, and going around the edge uses perimeter. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
