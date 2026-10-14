import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm103-2-4-b',
  lessonId: 'm103-2-4',
  title: 'Deductions and Net Pay, Part 2: Take-Home Pay and Working Backward',
  thumbnailTitle: 'Take-Home Pay',
  summary: 'Going from hours with overtime to gross pay, deductions and net pay, and rearranging income formulas to find the hours worked or the sales needed.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-3 · Lesson 2.4 · Part 2', title: 'Take-Home Pay', subtitle: 'From timecard to bank account, and back' }],
      lines: [
        { say: 'Now put it all together: hours, overtime, deductions and net pay.', show: 'title' },
        { say: 'In this video, you will go from a timecard to take-home pay, and work backward with income formulas.' },
      ],
    },
    {
      chapter: 'A week with overtime',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Wyatt earns \\$21.40 per hour, time-and-a-half over 40 hours, and worked 44 hours. Simplified rates: CPP 5.95%, EI 1.66%, income tax 15%, all of gross pay.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['40 \\times 21.40 + 4 \\times (1.5 \\times 21.40) = 856.00 + 128.40 = \\$984.40', '58.57 + 16.34 + 147.66 = \\$222.57', '\\$984.40 - \\$222.57 = \\$761.83'] },
      ],
      lines: [
        { say: 'Wyatt earns twenty-one forty an hour, with time-and-a-half for hours over forty, and worked 44 hours. Use these simplified rates: C P P 5.95 percent, E I 1.66 percent, and income tax fifteen percent, all of gross pay.', show: 'q' },
        { say: 'First, the gross pay. Forty regular hours earn 856 dollars, and four overtime hours earn 128.40. So the gross pay is 984 dollars 40.', show: 'm.0', focus: 'm.0' },
        { say: 'Next, each deduction: C P P is about 58.57, E I about 16.34, and tax 147.66. The total is 222 dollars 57.', show: 'm.1', focus: 'm.1' },
        { say: 'So Wyatt’s net pay is 984.40 minus 222.57: 761 dollars 83.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Working backward',
      layout: 'center',
      main: [
        {
          kind: 'table',
          id: 't',
          head: ['Formula', 'Meaning', 'Rearranged'],
          rows: [
            ['$G = rh$', 'gross pay = rate × hours', '$h = \\dfrac{G}{r}$'],
            ['$C = rS$', 'commission = rate × sales', '$S = \\dfrac{C}{r}$'],
            ['$E = B + rS$', 'earnings = base + commission', '$S = \\dfrac{E - B}{r}$'],
          ],
        },
        { kind: 'math', id: 'm', lines: ['h = \\dfrac{900}{22.50} = 40 \\text{ hours}'] },
      ],
      lines: [
        { say: 'Income formulas can be rearranged to answer how many hours, or how much in sales. Undo each operation by doing the opposite to both sides. Gross pay is rate times hours, so the hours are the gross pay divided by the rate.', show: 't.0', focus: 't.0' },
        { say: 'Commission is rate times sales, so the sales are the commission divided by the rate. And with a base, subtract the base first, then divide by the rate.', show: ['t.1', 't.2'], focus: ['t.1', 't.2'] },
        { say: 'Kiona earns 22.50 an hour, and wants to earn 900 dollars. The hours are 900 divided by 22.50: forty hours.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Hours with overtime',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', lines: ['40 \\times \\$20 = \\$800, \\quad \\$1{,}010 - \\$800 = \\$210', '1.5 \\times \\$20 = \\$30, \\quad \\$210 \\div \\$30 = 7', '40 + 7 = 47 \\text{ hours}'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing the wrong way', md: 'From $G = rh$, the hours are $\\dfrac{G}{r}$, not $\\dfrac{r}{G}$. Check that the answer makes sense.' },
      ],
      lines: [
        { say: 'Lucas earns twenty dollars an hour, with time-and-a-half for hours over forty, and earned 1,010 dollars last week. How many hours did he work? Forty regular hours earn 800 dollars, so 210 dollars was overtime.', show: 'm.0', focus: 'm.0' },
        { say: 'The overtime rate is thirty dollars an hour, and 210 divided by thirty is seven overtime hours.', show: 'm.1', focus: 'm.1' },
        { say: 'So Lucas worked 47 hours.', show: 'm.2', focus: 'm.2' },
        { say: 'Divide the right way: the hours are the pay divided by the rate. Twenty-two fifty divided by 900 would give a fortieth of an hour, which makes no sense.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A job pays \\$1,500 a month plus 5% commission. What monthly sales give earnings of \\$2,700?',
          choices: ['\\$24,000', '\\$54,000', '\\$60', '\\$1,200'],
          answer: 0,
          working: '$S = \\dfrac{E - B}{r} = \\dfrac{2700 - 1500}{0.05} = \\dfrac{1200}{0.05} = 24{,}000$.',
        },
      ],
      lines: [
        { say: 'Your turn. A job pays 1,500 dollars a month plus five percent commission. What monthly sales give earnings of 2,700 dollars? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Subtract the base: 2,700 minus 1,500 is 1,200 dollars of commission. Divide by 0.05: 24,000 dollars of sales. B forgets to subtract the base.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Gross pay first, then each deduction, then net pay.', 'Rearrange formulas by undoing operations: $h = \\tfrac{G}{r}$, $S = \\tfrac{E - B}{r}$.', 'Check that the answer makes sense.'] }],
      lines: [
        { say: 'Let’s sum up. Find the gross pay first, then each deduction, then the net pay.', show: 'sum.0' },
        { say: 'Rearrange income formulas by undoing each operation.', show: 'sum.1' },
        { say: 'And check that your answer makes sense. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
