import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-1',
  lessonId: 'm203-7-1',
  title: 'Simple and Compound Interest, Part 1: Simple Interest',
  thumbnailTitle: 'Simple Interest',
  thumbnail: 'f',
  summary: 'Principal, interest rate and time, the simple interest formula I = Prt and the amount A = P + I, a 2,500 dollar GIC at 3.5% for 4 years (350 dollars of interest), and why the rate must be a decimal.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.1 · Part 1', title: 'Simple Interest', subtitle: 'The price of using money' }],
      lines: [
        { say: 'Interest is the price of using someone else’s money. When you save, the bank pays you interest for using your money. When you borrow, you pay interest for using theirs.', show: 'title' },
        { say: 'In this video, you will find simple interest, and what a savings deposit or a loan comes to.' },
      ],
    },
    {
      chapter: 'Principal, rate and time',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Principal and interest rate', md: 'The **principal** $P$ is the amount saved or borrowed. The **interest rate** $r$ is the percent paid or charged **per year**.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['I = Prt', 'A = P + I'] },
        { kind: 'text', id: 'note', md: '$r$ as a decimal, $t$ in years', size: 'md' },
      ],
      lines: [
        { say: 'The principal, P, is the amount you save or borrow. The interest rate, r, is the percent paid or charged per year.', show: 'def' },
        { say: 'Simple interest is paid on the principal only. The interest, I, equals P times r times t.', show: 'f.0', focus: 'f.0' },
        { say: 'In this formula, r is written as a decimal, and t is the time in years.', show: 'note' },
        { say: 'The amount at the end, "A", is the principal plus the interest.', show: 'f.1', focus: 'f.1' },
      ],
    },
    {
      chapter: 'A GIC with simple interest',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$2,500 in a GIC at $3.5\\%$ simple interest per year, for $4$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['3.5\\% = 0.035', 'I = 2{,}500 \\times 0.035 \\times 4 = 350', 'A = 2{,}500 + 350 = 2{,}850'] },
      ],
      lines: [
        { say: 'Priya puts 2,500 dollars from her summer job on a farm near Lethbridge into a G I C, a guaranteed investment certificate. In this example, it pays 3.5 percent simple interest per year. How much interest does it earn in four years, and what is it worth then?', show: 'q' },
        { say: 'First, write the rate as a decimal: 3.5 percent is 0.035.', show: 'm.0', focus: 'm.0' },
        { say: 'Then I equals P r t: 2,500, times 0.035, times four. That is 350 dollars of interest.', show: 'm.1', focus: 'm.1' },
        { say: 'The amount is the principal plus the interest: 2,500 plus 350 is 2,850 dollars.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Same interest every year',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Year', 'Interest', 'Total so far'], rows: [['$1$', '\\$87.50', '\\$2,587.50'], ['$2$', '\\$87.50', '\\$2,675.00'], ['$3$', '\\$87.50', '\\$2,762.50'], ['$4$', '\\$87.50', '\\$2,850.00']] }],
      lines: [
        { say: 'With simple interest, the interest is the same every year, because it is always worked out on the original 2,500 dollars.', show: 't' },
        { say: 'Each year, Priya’s G I C earns 2,500 times 0.035, which is 87 dollars fifty.', focus: 't.0' },
        { say: 'After four years, that is four times 87.50, the same 350 dollars, and the G I C is worth 2,850 dollars.', focus: 't.3' },
      ],
    },
    {
      chapter: 'The rate as a decimal',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Using the percent instead of the decimal', md: 'The rate must be a decimal: $3.5\\% = 3.5 \\div 100 = 0.035$. Using $3.5$ gives $2{,}500 \\times 3.5 \\times 4 = 35{,}000$, fourteen times what was put in. If an interest answer looks huge, check the rate.' }],
      lines: [
        { say: 'A common mistake is to use the percent instead of the decimal. Using 3.5 gives 2,500 times 3.5 times four, which is 35,000 dollars of interest.', show: 'oops' },
        { say: 'That would mean the G I C earned fourteen times what was put in. If an interest answer looks huge, check the rate: 3.5 percent is 3.5 divided by 100, which is 0.035.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Jaxon puts \\$1,200 into a GIC that pays $4\\%$ simple interest per year. What is it worth after $3$ years?',
          choices: ['\\$1,344.00', '\\$144.00', '\\$15,600.00', '\\$1,248.00'],
          answer: 0,
          working: '$I = 1{,}200 \\times 0.04 \\times 3 = 144$, so $A = 1{,}200 + 144 = 1{,}344$. B is only the interest, and C uses $4$ instead of $0.04$.',
        },
      ],
      lines: [
        { say: 'Your turn. Jaxon puts 1,200 dollars into a G I C that pays four percent simple interest per year. What is it worth after three years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The interest is 1,200 times 0.04 times three, which is 144 dollars, so the G I C is worth 1,344 dollars. B is only the interest, and C uses four instead of 0.04.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simple interest: $I = Prt$.', 'The amount: $A = P + I$.', '$r$ as a decimal, $t$ in years.'] }],
      lines: [
        { say: 'Let’s sum up. Simple interest is I equals P r t, paid on the principal only.', show: 'sum.0' },
        { say: 'The amount at the end is the principal plus the interest.', show: 'sum.1' },
        { say: 'And write the rate as a decimal, with the time in years. In part two, we work with time in months, and rearrange the formula. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
