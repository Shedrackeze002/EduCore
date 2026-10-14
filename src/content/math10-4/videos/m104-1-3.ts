import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-1-3',
  lessonId: 'm104-1-3',
  title: 'Estimating, Part 1: Is the Answer Reasonable?',
  thumbnailTitle: 'Estimating',
  summary: 'Estimating sums, products and quotients by rounding to easy numbers, and using an estimate to check whether a calculator answer is reasonable, by multiplying the first digits and putting back the zeros. Part 2 solves two-step problems.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 1.3 · Part 1', title: 'Estimating', subtitle: 'Is the answer reasonable?' }],
      lines: [
        { say: 'A calculator only gives the right answer if you press the right keys. A quick estimate in your head tells you whether an answer makes sense.', show: 'title' },
        { say: 'In this video, you will estimate, and check whether an answer is reasonable.' },
      ],
    },
    {
      chapter: 'Estimating',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Estimate', md: 'An answer close to the exact answer, found by rounding the numbers so the maths is easy to do in your head.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['48 + 31 \\approx 50 + 30 = 80', '42 \\times 19 \\approx 40 \\times 20 = 800', '2{,}437 \\div 6 \\approx 2{,}400 \\div 6 = 400'] },
      ],
      lines: [
        { say: 'You do not always need an exact answer. Sometimes about how much is enough, like when you check that you have enough money at the till. An estimate is close to the exact answer.', show: 'def' },
        { say: 'Sam buys a jacket for 48 dollars and boots for 31. Round to fifty and thirty: he spends about eighty dollars. The exact total is 79.', show: 'm.0', focus: 'm.0' },
        { say: 'A hotel has 42 rooms on each floor, and nineteen floors. Round to forty and twenty: about 800 rooms. The exact number is 798.', show: 'm.1', focus: 'm.1' },
        { say: 'For division, change the first number to one that divides easily. A truck driver drives 2,437 kilometres in six days. 2,400 divided by six is 400, so about 400 kilometres a day.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Checking a calculator',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['52 \\times 38 \\approx 50 \\times 40 = 2{,}000', '19{,}760 \\;\\text{is about } 10 \\text{ times too big}', '52 \\times 38 = 1{,}976 \\;\\checkmark'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Count the zeros', md: 'For $50 \\times 40$, multiply the first digits, $5 \\times 4 = 20$, then put back both zeros: $2{,}000$.' },
      ],
      lines: [
        { say: 'An answer is reasonable if it makes sense: it should be close to your estimate. A warehouse has 52 pallets with 38 boxes on each. Jun’s calculator says 19,760 boxes. Is that reasonable?', show: 'm.0' },
        { say: 'Estimate: fifty times forty. Multiply the first digits, five times four is twenty, then put back both zeros: 2,000.', show: 'tip', focus: 'm.0' },
        { say: '19,760 is about ten times bigger than 2,000. Jun probably pressed an extra zero.', show: 'm.1', focus: 'm.1' },
        { say: 'The correct product is 1,976, which is close to 2,000. A calculator does exactly what you type, so always compare with an estimate.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A school orders $29$ boxes of paper at \\$41 a box. About how much does it spend?',
          choices: ['about \\$1,200', 'about \\$120', 'about \\$12,000', 'about \\$70'],
          answer: 0,
          working: 'Round: $29 \\approx 30$ and $41 \\approx 40$. Then $30 \\times 40 = 1{,}200$.',
        },
      ],
      lines: [
        { say: 'Your turn. A school orders 29 boxes of paper at 41 dollars a box. About how much does it spend? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Round to thirty and forty: three times four is twelve, then put back both zeros, about 1,200 dollars. B and C have the wrong number of zeros, and D adds instead of multiplying.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Estimate: round so the maths is easy, then calculate in your head.', 'An answer is reasonable if it is close to your estimate.', 'Multiply the first digits, then put back the zeros.'] }],
      lines: [
        { say: 'Let’s sum up. To estimate, round each number so the maths is easy, then calculate in your head.', show: 'sum.0' },
        { say: 'An answer is reasonable if it is close to your estimate.', show: 'sum.1' },
        { say: 'And when you multiply round numbers, multiply the first digits, then put back the zeros. In part two, we solve two-step problems. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
