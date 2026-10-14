import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm203-7-1-b',
  lessonId: 'm203-7-1',
  title: 'Simple and Compound Interest, Part 2: Time in Months and Missing Values',
  thumbnailTitle: 'Months and Missing Values',
  thumbnail: 'f',
  summary: 'Changing months to years for a yearly rate (a 9-month loan of 1,800 dollars at 7.5% costs 101.25 dollars), why t = 9 gives twelve times too much, and rearranging I = Prt to find a rate (3.5%) and a time (15 months).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 7.1 · Part 2', title: 'Months and Missing Values', subtitle: 'Time in years, and working back' }],
      lines: [
        { say: 'Loans and savings do not always last whole years. And sometimes you know the interest, and want to find the rate or the time.', show: 'title' },
        { say: 'In this video, you will change months to years, and rearrange I equals P r t to find a missing value.' },
      ],
    },
    {
      chapter: 'Time in months',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$1,800 for $9$ months at $7.5\\%$ simple interest per year.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t = \\dfrac{9}{12} = 0.75', 'I = 1{,}800 \\times 0.075 \\times 0.75 = 101.25', 'A = 1{,}800 + 101.25 = 1{,}901.25'] },
      ],
      lines: [
        { say: 'Tyler borrows 1,800 dollars for nine months, to take a welding course in Edmonton. In this example, the loan charges 7.5 percent simple interest per year. How much does he pay back?', show: 'q' },
        { say: 'The rate is per year, so the time must be in years too. Change months to years by dividing by twelve: nine twelfths is 0.75 of a year.', show: 'm.0', focus: 'm.0' },
        { say: 'The interest is 1,800, times 0.075, times 0.75, which is 101 dollars 25.', show: 'm.1', focus: 'm.1' },
        { say: 'So Tyler pays back 1,800 plus 101.25: 1,901 dollars 25.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Mixing months and years',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Mixing months and years', md: 'Putting $t = 9$ into $I = Prt$ treats $9$ months as $9$ **years**: $1{,}800 \\times 0.075 \\times 9 = 1{,}215$, twelve times too much. A yearly rate needs the time in years.' }],
      lines: [
        { say: 'A common mistake is to put nine in for t. That treats nine months as nine years, and gives 1,215 dollars of interest, twelve times too much. Always match the time to the rate: a yearly rate needs the time in years.', show: 'oops' },
      ],
    },
    {
      chapter: 'Rearranging the formula',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'lg', lines: ['I = Prt', 'r = \\dfrac{I}{Pt} \\qquad t = \\dfrac{I}{Pr} \\qquad P = \\dfrac{I}{rt}'] }],
      lines: [
        { say: 'If you know three of I, P, r and t, you can find the fourth.', show: 'm.0', focus: 'm.0' },
        { say: 'Divide both sides of the formula by the two values you know. To find the rate, divide I by P times t. To find the time, divide I by P times r. And to find the principal, divide I by r times t.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the rate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'A \\$3,000 deposit earned \\$315 in simple interest over $3$ years.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['r = \\dfrac{315}{3{,}000 \\times 3} = \\dfrac{315}{9{,}000} = 0.035', '0.035 \\times 100 = 3.5\\%'] },
      ],
      lines: [
        { say: 'A 3,000-dollar deposit earned 315 dollars in simple interest over three years. What was the rate?', show: 'q' },
        { say: 'r equals I over P t: 315 divided by 3,000 times three, which is 315 over 9,000, or 0.035.', show: 'm.0', focus: 'm.0' },
        { say: 'As a percent, that is 3.5 percent per year.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Finding the time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '\\$2,400 at $5\\%$ simple interest per year; \\$150 in interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['t = \\dfrac{150}{2{,}400 \\times 0.05} = \\dfrac{150}{120} = 1.25 \\text{ years}', '1.25 \\times 12 = 15 \\text{ months}'] },
      ],
      lines: [
        { say: 'Wyatt borrowed 2,400 dollars from his aunt, at five percent simple interest per year, and paid 150 dollars in interest. How many months did he have the loan?', show: 'q' },
        { say: 't equals I over P r: 150 divided by 2,400 times 0.05. That is 150 over 120, which is 1.25 years.', show: 'm.0', focus: 'm.0' },
        { say: 'The question asks for months, so multiply by twelve: 1.25 times twelve is fifteen months.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A loan of \\$2,000 charges $6\\%$ simple interest per year. How much interest is charged for $8$ months?',
          choices: ['\\$80.00', '\\$960.00', '\\$120.00', '\\$10.00'],
          answer: 0,
          working: '$t = \\dfrac{8}{12}$ of a year, so $I = 2{,}000 \\times 0.06 \\times \\dfrac{8}{12} = 80$. B uses $t = 8$, and C is the interest for a whole year.',
        },
      ],
      lines: [
        { say: 'Your turn. A loan of 2,000 dollars charges six percent simple interest per year. How much interest is charged for eight months? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Eight months is eight twelfths of a year, so the interest is 2,000 times 0.06 times eight twelfths, which is eighty dollars. B uses eight years, and C is the interest for a whole year.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Months to years: divide by $12$.', 'Rearrange: $r = \\dfrac{I}{Pt}$, $t = \\dfrac{I}{Pr}$, $P = \\dfrac{I}{rt}$.', 'Answer in the units the question asks for.'] }],
      lines: [
        { say: 'Let’s sum up. For a yearly rate, change months to years by dividing by twelve.', show: 'sum.0' },
        { say: 'To find a missing value, divide the interest by the two values you know.', show: 'sum.1' },
        { say: 'And answer in the units the question asks for, such as months. In part three, we look at compound interest. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
