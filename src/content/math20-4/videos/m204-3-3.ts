import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-3-3',
  lessonId: 'm204-3-3',
  title: 'Deductions and Net Pay, Part 1: Reading a Pay Stub',
  thumbnailTitle: 'Reading a Pay Stub',
  thumbnail: 't',
  summary: 'What a pay stub shows: gross pay, deductions (CPP, EI, income tax, union dues and health plans) and net pay, and finding the net pay by adding all the deductions first (840 dollars minus 140 dollars is 700 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 3.3 · Part 1', title: 'Reading a Pay Stub', subtitle: 'Where your pay goes' }],
      lines: [
        { say: 'Your first pay cheque may be smaller than you expected. Some money is taken off before you get paid, and your pay stub shows where that money goes.', show: 'title' },
        { say: 'In this video, you will read a pay stub, and find the net pay you take home.' },
      ],
    },
    {
      chapter: 'Pay stub and net pay',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Pay stub, deduction and net pay', md: 'A **pay stub** is a record of one pay. A **deduction** is money taken off your gross pay. **Net pay** is the money you take home.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{net pay} = \\text{gross pay} - \\text{total deductions}'] },
      ],
      lines: [
        { say: 'A pay stub is a record of one pay. A deduction is money taken off your gross pay. And net pay is the money you take home.', show: 'def' },
        { say: 'So net pay is the gross pay minus the total of all the deductions.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Common deductions',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'cpp', tone: 'definition', title: 'CPP and EI', md: '**CPP** (Canada Pension Plan) saves money for your pension when you retire. **EI** (Employment Insurance) can pay you for a while if you lose your job.' },
        { kind: 'bullets', id: 'other', items: ['**Income tax** pays for things like schools, hospitals and roads.', '**Union dues** pay for a union, if your workplace has one.', 'A **health plan** can pay for things like dental care or glasses.'] },
      ],
      lines: [
        { say: 'Most deductions pay for things that help you now or later. CPP, the Canada Pension Plan, saves money for your pension when you retire. EI, Employment Insurance, can pay you for a while if you lose your job.', show: 'cpp' },
        { say: 'Income tax pays for things like schools, hospitals and roads.', show: 'other.0' },
        { say: 'Union dues pay for a union, if your workplace has one.', show: 'other.1' },
        { say: 'And a health plan can pay for things like dental care or glasses.', show: 'other.2' },
      ],
    },
    {
      chapter: 'Net pay from a pay stub',
      layout: 'split',
      leftWidth: 520,
      left: [{ kind: 'table', id: 't', head: ['Pay stub', 'Amount'], rows: [['Gross pay', '\\$840.00'], ['CPP', '\\$42.00'], ['EI', '\\$14.00'], ['Income tax', '\\$84.00'], ['Total deductions', '?'], ['Net pay', '?']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['42.00 + 14.00 + 84.00 = 140.00', '840.00 - 140.00 = 700.00'] }],
      lines: [
        { say: 'Here is a pay stub. The gross pay is 840 dollars, and there are three deductions: CPP, EI and income tax. Find the total deductions and the net pay.', show: 't' },
        { say: 'First, add all the deductions: 42 plus fourteen plus 84 is 140 dollars.', show: 'm.0', focus: ['t.4', 'm.0'] },
        { say: 'Then subtract the total from the gross pay: 840 minus 140 is 700 dollars of net pay.', show: 'm.1', focus: ['t.5', 'm.1'] },
        { say: 'A common mistake is to subtract only one deduction. Every deduction comes off your pay, so add them all first, then subtract the total.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A pay stub shows gross pay of \\$960.00. The deductions are CPP \\$48.00, EI \\$16.00, income tax \\$96.00 and union dues \\$12.00. What is the net pay?',
          choices: ['\\$788.00', '\\$864.00', '\\$172.00', '\\$1,132.00'],
          answer: 0,
          working: 'Total deductions: $48 + 16 + 96 + 12 = 172$. Net pay: $960.00 - 172.00 = 788.00$. B takes off only the income tax, and C is the total deductions.',
        },
      ],
      lines: [
        { say: 'Your turn. A pay stub shows gross pay of 960 dollars. The deductions are CPP, 48 dollars, EI, sixteen dollars, income tax, 96 dollars, and union dues, twelve dollars. What is the net pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The deductions add to 172 dollars, and 960 minus 172 is 788 dollars. B takes off only the income tax, and C is the total deductions, not the net pay.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A pay stub shows gross pay, each deduction and net pay.', 'Common deductions: CPP, EI, income tax, union dues, health plans.', 'Net pay = gross pay − total deductions.'] }],
      lines: [
        { say: 'Let’s sum up. A pay stub shows the gross pay, each deduction, and the net pay.', show: 'sum.0' },
        { say: 'Common deductions are CPP, EI, income tax, union dues and health plans.', show: 'sum.1' },
        { say: 'And net pay is the gross pay minus the total deductions. In part two, we find deductions from percents. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
