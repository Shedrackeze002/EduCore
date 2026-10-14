import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-2-d',
  lessonId: 'm204-4-2',
  title: 'Simple Interest, Part 4: Finding the Rate or the Time',
  thumbnailTitle: 'Finding r or t',
  thumbnail: 'm',
  summary: 'Putting what you know into I = Prt and dividing: the rate when 2,000 dollars earns 150 dollars in 3 years (2.5% per year), and the time when 4,000 dollars at 5% costs 300 dollars (1.5 years, or 18 months).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.2 · Part 4', title: 'Finding the Rate or the Time', subtitle: 'Work backwards with I = Prt' }],
      lines: [
        { say: 'Sometimes you already know the interest. What rate did the account pay? How long did the loan last? The same formula answers both questions.', show: 'title' },
        { say: 'In this video, you will find the rate or the time, using I equals P r t, and check your answer.' },
      ],
    },
    {
      chapter: 'Work backwards',
      layout: 'center',
      main: [
        { kind: 'math', id: 'f', size: 'lg', lines: ['I = Prt'] },
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Put in what you know', md: 'Put the numbers you know into $I = Prt$. Multiply the numbers on the right. Then **divide** to find the missing letter.' },
      ],
      lines: [
        { say: 'Start with the same formula, I equals P r t.', show: 'f', focus: 'f' },
        { say: 'Put the numbers you know into the formula, and multiply the numbers on the right side. Then divide to find the missing letter.', show: 'tip' },
      ],
    },
    {
      chapter: 'Finding the rate',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Mei put \\$2,000 in a savings account. After $3$ years, it earned \\$150 in simple interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['150 = 2{,}000 \\times r \\times 3', '150 = 6{,}000 \\times r', 'r = 150 \\div 6{,}000 = 0.025 = 2.5\\%'] },
      ],
      lines: [
        { say: 'Mei put 2,000 dollars in a savings account. After three years, it earned 150 dollars in simple interest. What is the rate?', show: 'q' },
        { say: 'Put in what you know: 150 equals 2,000 times r times three.', show: 'm.0', focus: 'm.0' },
        { say: '2,000 times three is 6,000, so 150 equals 6,000 times r.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide: r is 150 divided by 6,000, which is 0.025. Times 100, the rate is 2.5 percent per year.', show: 'm.2', focus: 'm.2' },
        { say: 'Check: 2,000 times 0.025 is fifty dollars a year, and three years is 150 dollars. It works.' },
      ],
    },
    {
      chapter: 'Finding the time',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Diego borrowed \\$4,000 at $5\\%$ per year simple interest, and paid \\$300 in interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['300 = 4{,}000 \\times 0.05 \\times t', '300 = 200 \\times t', 't = 300 \\div 200 = 1.5 \\text{ years}', '1.5 \\times 12 = 18 \\text{ months}'] },
      ],
      lines: [
        { say: 'Diego borrowed 4,000 dollars at five percent per year simple interest, and paid 300 dollars in interest. How many months did he have the loan?', show: 'q' },
        { say: 'Put in what you know: 300 equals 4,000 times 0.05 times t.', show: 'm.0', focus: 'm.0' },
        { say: '4,000 times 0.05 is 200, so 300 equals 200 times t. That 200 is one year of interest.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide: t is 300 divided by 200, 1.5 years.', show: 'm.2', focus: 'm.2' },
        { say: 'The question asks for months, so multiply by twelve: Diego had the loan for eighteen months.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A loan of \\$1,200 at $4\\%$ per year simple interest cost \\$72 in interest. How many months was the loan?',
          choices: ['$18$ months', '$1.5$ months', '$15$ months', '$12$ months'],
          answer: 0,
          working: '$72 = 1{,}200 \\times 0.04 \\times t = 48t$, so $t = 72 \\div 48 = 1.5$ years, which is $1.5 \\times 12 = 18$ months. B forgets to change years to months.',
        },
      ],
      lines: [
        { say: 'Your turn. A loan of 1,200 dollars at four percent per year simple interest cost 72 dollars in interest. How many months was the loan? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 1,200 times 0.04 is 48, so 72 equals 48 times t, and t is 1.5 years. Times twelve, that is eighteen months. B forgets to change the years to months.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Put what you know into I = Prt.', 'Multiply the known numbers, then divide.', 'Change r to a percent, or t to months, if asked.'] }],
      lines: [
        { say: 'Let’s sum up. Put the numbers you know into I equals P r t.', show: 'sum.0' },
        { say: 'Multiply the known numbers on the right, then divide to find the missing one.', show: 'sum.1' },
        { say: 'And change the rate to a percent, or the time to months, if the question asks. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
