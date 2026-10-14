import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-3-b',
  lessonId: 'm204-3-3',
  title: 'Deductions and Net Pay, Part 2: Deductions from Percents',
  thumbnailTitle: 'Percent Deductions',
  thumbnail: 'm',
  summary: 'Deductions as a percent of gross pay at rates given in the question (5% CPP, 2% EI and 10% income tax on 1,234.60 dollars), rounding each to the nearest cent, net pay of 1,024.72 dollars, and a quick check with the total percent.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.3 · Part 2', title: 'Deductions from Percents', subtitle: 'A percent of your gross pay' }],
      lines: [
        { say: 'Many deductions are not a set amount. They are a percent of your gross pay, so a bigger pay means bigger deductions.', show: 'title' },
        { say: 'In this video, you will find deductions from percents, and the net pay that is left.' },
      ],
    },
    {
      chapter: 'Percent deductions',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{deduction} = \\text{rate as a decimal} \\times \\text{gross pay}'] },
        { kind: 'callout', id: 'rule', tone: 'tip', title: 'Use the rates in the question', md: 'The real rates for CPP, EI and income tax change from year to year. In this course, always use the rates **given in the question**.' },
      ],
      lines: [
        { say: 'For a percent deduction, change the percent to a decimal and multiply by the gross pay. Then round to the nearest cent.', show: 'f', focus: 'f' },
        { say: 'The real rates for CPP, EI and income tax change from year to year. In this course, always use the rates given in the question.', show: 'rule' },
      ],
    },
    {
      chapter: 'Three percent deductions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Gross pay: \\$1,234.60. Suppose $5\\%$ is taken for CPP, $2\\%$ for EI and $10\\%$ for income tax.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{CPP: } 0.05 \\times 1{,}234.60 = 61.73', '\\text{EI: } 0.02 \\times 1{,}234.60 = 24.692 \\approx 24.69', '\\text{income tax: } 0.1 \\times 1{,}234.60 = 123.46'] },
      ],
      lines: [
        { say: 'Noor’s gross pay is 1,234 dollars 60. In this example, suppose five percent is taken for CPP, two percent for EI, and ten percent for income tax.', show: 'q' },
        { say: 'CPP: 0.05 times 1,234.60 is 61 dollars 73.', show: 'm.0', focus: 'm.0' },
        { say: 'EI: 0.02 times 1,234.60 is 24.692. The third decimal digit is two, so round down to 24 dollars 69.', show: 'm.1', focus: 'm.1' },
        { say: 'Income tax: 0.1 times 1,234.60 is 123 dollars 46.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Net pay',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['61.73 + 24.69 + 123.46 = 209.88', '1{,}234.60 - 209.88 = 1{,}024.72'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'A quick check', md: 'The percents add to $5 + 2 + 10 = 17\\%$, and $0.17 \\times 1{,}234.60 \\approx 209.88$. Because each deduction is rounded, the two ways can be a cent or two apart.' },
      ],
      lines: [
        { say: 'Add the deductions: 61.73 plus 24.69 plus 123.46 is 209 dollars 88.', show: 'm.0', focus: 'm.0' },
        { say: 'So Noor’s net pay is 1,234.60 minus 209.88: 1,024 dollars 72.', show: 'm.1', focus: 'm.1' },
        { say: 'Here is a quick check. The percents add to seventeen percent, and 0.17 times 1,234.60 is about 209.88, so the total looks right. Because each deduction is rounded, the two ways can be a cent or two apart.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Gross pay is \\$850.00. Suppose $5\\%$ is taken for CPP, $2\\%$ for EI and $10\\%$ for income tax. What is the net pay?',
          choices: ['\\$705.50', '\\$144.50', '\\$833.00', '\\$994.50'],
          answer: 0,
          working: 'CPP: $42.50$. EI: $17.00$. Income tax: $85.00$. Total: $144.50$. Net pay: $850.00 - 144.50 = 705.50$. B is the total deductions, C takes off only EI, and D adds the deductions.',
        },
      ],
      lines: [
        { say: 'Your turn. Gross pay is 850 dollars. Suppose five percent is taken for CPP, two percent for EI, and ten percent for income tax. What is the net pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. CPP is 42 dollars fifty, EI is seventeen dollars, and income tax is 85 dollars, for a total of 144 dollars fifty. 850 minus 144.50 is 705 dollars fifty. B is the total deductions, C takes off only the EI, and D adds the deductions instead.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Deduction = rate as a decimal × gross pay.', 'Round each deduction to the nearest cent.', 'Check with the total percent.'] }],
      lines: [
        { say: 'Let’s sum up. A percent deduction is the rate as a decimal times the gross pay, using the rates in the question.', show: 'sum.0' },
        { say: 'Round each deduction to the nearest cent.', show: 'sum.1' },
        { say: 'And check the total with the sum of the percents. In part three, we go from a timecard all the way to net pay. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
