import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-2',
  lessonId: 'm203-7-2',
  title: 'The Rule of 72 and Investments, Part 1: The Rule of 72',
  thumbnailTitle: 'The Rule of 72',
  thumbnail: 'f',
  summary: 'Estimating how long money takes to double with the Rule of 72 (72 ÷ 6 = 12 years at 6%), working backwards to the rate needed, why the rate is a percent here and not a decimal, and rates that do not divide evenly into 72.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.2 · Part 1', title: 'The Rule of 72', subtitle: 'Doubling in your head' }],
      lines: [
        { say: 'How long does it take money to double? You could try year after year in the compound interest formula, but there is a shortcut you can do in your head.', show: 'title' },
        { say: 'In this video, you will use the Rule of 72 to estimate a doubling time, and the rate you need.' },
      ],
    },
    {
      chapter: 'The Rule of 72',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Rule of 72', md: 'For an investment that earns compound interest at $r$ percent per year, the time to **double** is about $72 \\div r$ years. Use the rate as a **percent**: for $6\\%$, use $r = 6$.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['\\text{doubling time} \\approx \\dfrac{72}{r}'] },
      ],
      lines: [
        { say: 'For an investment that earns compound interest at r percent per year, the time to double is about 72 divided by r years.', show: ['def', 'f'] },
        { say: 'Use the rate as a percent: for six percent, use six. Bankers and financial planners use this rule to size up an offer quickly, without a calculator.' },
      ],
    },
    {
      chapter: 'Doubling time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$3,000 at $6\\%$ per year, compounded annually. About how long to double?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['72 \\div 6 = 12 \\text{ years}', '3{,}000 \\to 6{,}000'] },
      ],
      lines: [
        { say: 'Nia puts 3,000 dollars into an investment account that earns six percent per year, compounded annually. About how long will it take to double?', show: 'q' },
        { say: 'Divide 72 by the rate, six: that is about twelve years.', show: 'm.0', focus: 'm.0' },
        { say: 'So in about twelve years, Nia’s 3,000 dollars will grow to about 6,000 dollars.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Working backwards',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Double in $9$ years. About what rate is needed?', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{rate} \\approx \\dfrac{72}{\\text{doubling time}}', '72 \\div 9 = 8\\%'] },
      ],
      lines: [
        { say: 'The rule also works backwards. Owen wants an investment to double in nine years. About what interest rate does he need?', show: 'q' },
        { say: 'If you know how long you want to wait, divide 72 by the number of years to find the rate.', show: 'm.0', focus: 'm.0' },
        { say: '72 divided by nine is eight, so Owen needs about eight percent per year.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'A percent, not a decimal',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the decimal rate', md: 'With $0.06$ instead of $6$, you get $72 \\div 0.06 = 1{,}200$ years, which is clearly wrong. In the interest formulas, use $0.06$; in the Rule of 72, use $6$.' }],
      lines: [
        { say: 'A common mistake is to use the decimal rate. The Rule of 72 is the one place you use the rate as a percent. With 0.06 instead of six, you get 72 divided by 0.06, which is 1,200 years. That is clearly wrong.', show: 'oops' },
        { say: 'So in the interest formulas, use 0.06. In the Rule of 72, use six.' },
      ],
    },
    {
      chapter: 'Rates that do not divide evenly',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['72 \\div 5 = 14.4 \\text{ years}', '72 \\div 7 \\approx 10.3 \\text{ years}'] }],
      lines: [
        { say: 'When the rate does not divide evenly into 72, divide anyway and round. At five percent, the doubling time is 72 divided by five, about 14.4 years.', show: 'm.0', focus: 'm.0' },
        { say: 'At seven percent, it is 72 divided by seven, about 10.3 years. The number 72 was chosen because it divides evenly by so many everyday rates: two, three, four, six, eight, nine and twelve.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'An investment earns $9\\%$ per year, compounded annually. About how long will it take to double?',
          choices: ['about $8$ years', 'about $800$ years', 'about $648$ years', 'about $63$ years'],
          answer: 0,
          working: '$72 \\div 9 = 8$, so about $8$ years. B divides by $0.09$ instead of $9$.',
        },
      ],
      lines: [
        { say: 'Your turn. An investment earns nine percent per year, compounded annually. About how long will it take to double? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 72 divided by nine is eight, so about eight years. B divides by 0.09 instead of nine.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Doubling time ≈ 72 ÷ rate.', 'Rate needed ≈ 72 ÷ doubling time.', 'Use the rate as a percent, not a decimal.'] }],
      lines: [
        { say: 'Let’s sum up. The doubling time is about 72 divided by the rate.', show: 'sum.0' },
        { say: 'Working backwards, the rate you need is about 72 divided by the doubling time.', show: 'sum.1' },
        { say: 'And in the Rule of 72, use the rate as a percent, not a decimal. In part two, we let money double again and again. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
