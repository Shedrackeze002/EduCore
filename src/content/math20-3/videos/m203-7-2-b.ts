import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-2-b',
  lessonId: 'm203-7-2',
  title: 'The Rule of 72 and Investments, Part 2: Doubling Again and Again',
  thumbnailTitle: 'Doubling Again and Again',
  thumbnail: 't',
  summary: 'Estimating a value far in the future by counting doublings (2,000 dollars at 8% for 27 years is about 16,000 dollars, close to the exact 15,976.12), why each doubling multiplies by 2, and why starting early matters.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.2 · Part 2', title: 'Doubling Again and Again', subtitle: 'Count the doublings' }],
      lines: [
        { say: 'Once money doubles, it keeps going: the doubled amount doubles again, in the same amount of time.', show: 'title' },
        { say: 'In this video, you will estimate what an investment is worth far in the future, by counting doublings.' },
      ],
    },
    {
      chapter: 'Three doublings',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$2,000 at $8\\%$ per year, compounded annually. Estimate its value in $27$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['72 \\div 8 = 9 \\text{ years}', '27 \\div 9 = 3 \\text{ doublings}'] },
        { kind: 'table', id: 't', head: ['Years from now', '$0$', '$9$', '$18$', '$27$'], rows: [['Value (about)', '\\$2,000', '\\$4,000', '\\$8,000', '\\$16,000']] },
      ],
      lines: [
        { say: 'Tanvir puts 2,000 dollars into a long-term investment that earns eight percent per year, compounded annually. Estimate its value in 27 years.', show: 'q' },
        { say: 'First, find the doubling time: 72 divided by eight is nine years.', show: 'm.0', focus: 'm.0' },
        { say: 'Then count the doublings: 27 years divided by nine is three doublings.', show: 'm.1', focus: 'm.1' },
        { say: 'Now double three times. 2,000 dollars becomes 4,000 after nine years, 8,000 after eighteen years, and 16,000 after 27 years.', show: 't', focus: 't.0' },
      ],
    },
    {
      chapter: 'How close is it?',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['2{,}000(1.08)^{27} \\approx 15{,}976.12', '\\text{estimate: } 16{,}000'] }],
      lines: [
        { say: 'How close is the estimate? The compound interest formula gives the exact value: 2,000 times 1.08 to the power 27, which is about 15,976 dollars 12.', show: 'm.0', focus: 'm.0' },
        { say: 'The estimate of 16,000 dollars is only about 24 dollars off. Not bad for something you can do in your head.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Doubling, not adding',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Adding instead of doubling', md: 'Each doubling **multiplies** the value by $2$: \\$2,000, \\$4,000, \\$8,000, \\$16,000. Adding \\$2,000 each time (\\$4,000, \\$6,000, \\$8,000) treats it like simple interest.' }],
      lines: [
        { say: 'A common mistake is to add the original amount each time: 4,000, then 6,000, then 8,000. That treats compound interest like simple interest.', show: 'oops' },
        { say: 'Each doubling multiplies the value by two. So after three doublings, the money is two times two times two, eight times what was put in.' },
      ],
    },
    {
      chapter: 'Start early',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['\\$1,000 at 6%, invested', 'Years to age 66', 'Doublings', 'Value at 66 (about)'], rows: [['At age 18', '$48$', '$4$', '\\$16,000'], ['At age 30', '$36$', '$3$', '\\$8,000']] },
      ],
      lines: [
        { say: 'Counting doublings shows why starting early matters so much. At six percent, money doubles about every twelve years.', show: 't' },
        { say: 'Someone who invests 1,000 dollars at age eighteen has 48 years until age 66. That is four doublings: about 16,000 dollars.', focus: 't.0' },
        { say: 'Someone who waits until age thirty has 36 years: three doublings, so about 8,000 dollars, from the same 1,000 dollars. Waiting twelve years cost half the final amount.', focus: 't.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: '\\$4,000 earns $3\\%$ per year, compounded annually. Use the Rule of 72 to estimate its value in $48$ years.',
          choices: ['about \\$16,000', 'about \\$8,000', 'about \\$12,000', 'about \\$32,000'],
          answer: 0,
          working: 'Doubling time: $72 \\div 3 = 24$ years, so $48 \\div 24 = 2$ doublings: \\$4,000 to \\$8,000 to \\$16,000. B doubles only once.',
        },
      ],
      lines: [
        { say: 'Your turn. 4,000 dollars earns three percent per year, compounded annually. Use the Rule of 72 to estimate its value in 48 years. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The doubling time is 72 divided by three, 24 years, so 48 years is two doublings: 4,000 becomes 8,000, then 16,000. B doubles only once.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Number of doublings = years ÷ doubling time.', 'Each doubling multiplies by 2.', 'Starting early adds doublings.'] }],
      lines: [
        { say: 'Let’s sum up. To estimate a value far in the future, divide the years by the doubling time to count the doublings.', show: 'sum.0' },
        { say: 'Each doubling multiplies the value by two; it does not add the original amount.', show: 'sum.1' },
        { say: 'And starting early adds doublings. In part three, we check the rule with the formula, and compare investment offers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
