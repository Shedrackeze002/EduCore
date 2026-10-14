import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-4',
  lessonId: 'm103-2-4',
  title: 'Deductions and Net Pay, Part 1: From Gross to Net',
  thumbnailTitle: 'Deductions and Net Pay',
  summary: 'Payroll deductions (CPP, EI, income tax and union dues) found with simplified rates given in the question, deductions above an exemption, and net pay as gross pay minus all deductions. Part 2 puts it together and works backward.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.4 · Part 1', title: 'From Gross to Net', subtitle: 'Where does the money go?' }],
      lines: [
        { say: 'Your first pay cheque can be a surprise. You worked forty hours at eighteen dollars an hour, but the deposit is not 720 dollars.', show: 'title' },
        { say: 'The difference is deductions. In this video, you will calculate deductions and net pay. In part two, you will go from a timecard to take-home pay.' },
      ],
    },
    {
      chapter: 'Deductions',
      layout: 'center',
      main: [
        {
          kind: 'bullets',
          id: 'b',
          items: ['**CPP** (Canada Pension Plan): savings for your retirement pension.', '**EI** (Employment Insurance): pays you for a while if you lose your job.', '**Income tax**: pays for roads, schools, health care and more.', '**Union dues**: pay for the union, if you belong to one.'],
        },
        { kind: 'callout', id: 'note', tone: 'key', title: 'Simplified rates', md: 'Real amounts change every year. In this course, each question gives you simplified rates to use.' },
      ],
      lines: [
        { say: 'A deduction is an amount your employer subtracts from gross pay, and sends to the government or your union. C P P, the Canada Pension Plan, saves for your retirement.', show: 'b.0' },
        { say: 'E I, Employment Insurance, pays you for a while if you lose your job. Income tax pays for government services. And union dues pay for the union.', show: ['b.1', 'b.2', 'b.3'] },
        { say: 'Real amounts change every year, so in this course, each question gives you simplified rates to use.', show: 'note' },
      ],
    },
    {
      chapter: 'Finding deductions',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Gross pay \\$1,240.00. Simplified rates: CPP 5.95% and EI 1.66% of gross pay.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\text{CPP: } 0.0595 \\times \\$1{,}240 = \\$73.78', '\\text{EI: } 0.0166 \\times \\$1{,}240 = \\$20.584 \\approx \\$20.58'] },
      ],
      lines: [
        { say: 'Priya’s gross pay for two weeks is 1,240 dollars. Use these simplified rates: C P P is 5.95 percent of gross pay, and E I is 1.66 percent.', show: 'q' },
        { say: 'Change each percent to a decimal and multiply. C P P is 0.0595 times 1,240: 73 dollars 78.', show: 'm.0', focus: 'm.0' },
        { say: 'E I is 0.0166 times 1,240, which is 20.584. Round each deduction to the nearest cent: twenty dollars 58.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Above an exemption',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'CPP is 5.95% of gross pay above \\$135. Income tax is 15% of gross pay above \\$600.', size: 'md' },
        { kind: 'math', id: 'm', lines: ['\\text{CPP: } 0.0595 \\times (1240 - 135) = 0.0595 \\times 1105 \\approx \\$65.75', '\\text{tax: } 0.15 \\times (1240 - 600) = 0.15 \\times 640 = \\$96.00'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Subtract the exemption first', md: 'The rate applies only to the pay **above** the exemption. Using the whole gross pay takes off too much.' },
      ],
      lines: [
        { say: 'Some deductions only apply to the part of your pay above a set amount, called an exemption. Suppose C P P is 5.95 percent of gross pay above 135 dollars, and income tax is fifteen percent above 600.', show: 'q' },
        { say: 'For C P P, subtract the exemption first: 1,240 minus 135 is 1,105. Then 0.0595 times 1,105 is about 65 dollars 75.', show: 'm.0', focus: 'm.0' },
        { say: 'For tax: 1,240 minus 600 is 640, and fifteen percent of 640 is 96 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Always subtract the exemption first. Multiplying the rate by the whole gross pay takes off too much.', show: 'oops' },
      ],
    },
    {
      chapter: 'Net pay',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['\\text{net pay} = \\text{gross pay} - \\text{total deductions}', '65.75 + 20.58 + 96.00 + 32.50 = \\$214.83', '\\$1{,}240.00 - \\$214.83 = \\$1{,}025.17'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Check with an estimate', md: 'Net pay is usually about 70% to 85% of gross pay. Here, $1025.17 \\div 1240 \\approx 0.83$.' },
      ],
      lines: [
        { say: 'Net pay, or take-home pay, is what is left after all deductions: gross pay minus total deductions.', show: 'm.0', focus: 'm.0' },
        { say: 'Priya’s pay stub shows C P P 65.75, E I 20.58, income tax 96 dollars, and union dues 32.50. The total deductions are 214 dollars 83.', show: 'm.1', focus: 'm.1' },
        { say: 'So the net pay is 1,240 minus 214.83: 1,025 dollars 17.', show: 'm.2', focus: 'm.2' },
        { say: 'Check with an estimate: net pay is usually about seventy to 85 percent of gross pay. Here it is about 83 percent.', show: 'tip' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Gross pay is \\$800. Income tax is 15% of gross pay above \\$500. What is the income tax?',
          choices: ['\\$45.00', '\\$120.00', '\\$75.00', '\\$300.00'],
          answer: 0,
          working: '$800 - 500 = 300$, and $0.15 \\times 300 = 45$ dollars.',
        },
      ],
      lines: [
        { say: 'Your turn. Gross pay is 800 dollars. Income tax is fifteen percent of gross pay above 500 dollars. What is the income tax? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract the exemption first: 800 minus 500 is 300. Fifteen percent of 300 is 45 dollars. B uses the whole gross pay.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['CPP, EI, income tax and union dues come off gross pay.', 'With an exemption, subtract it before multiplying by the rate.', 'Net pay = gross pay − total deductions.'] }],
      lines: [
        { say: 'Let’s sum up. Deductions such as C P P, E I, income tax and union dues come off gross pay. Round each one to the nearest cent.', show: 'sum.0' },
        { say: 'When there is an exemption, subtract it before you multiply by the rate.', show: 'sum.1' },
        { say: 'And net pay is gross pay minus the total deductions. In part two, we go from a timecard to take-home pay. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
