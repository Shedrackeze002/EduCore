import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-2-b',
  lessonId: 'm204-4-2',
  title: 'Simple Interest, Part 2: The Formula I = Prt',
  thumbnailTitle: 'I = Prt',
  thumbnail: 'f',
  summary: 'The simple interest formula I = Prt (principal, rate as a decimal, time in years), a 2,500 dollar loan at 6% for 3 years (450 dollars of interest), and why the rate must be a decimal (r = 6 gives 45,000 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.2 · Part 2', title: 'The Formula I = Prt', subtitle: 'Principal, rate and time' }],
      lines: [
        { say: 'Finding interest one year at a time works, but a formula is faster, especially for a loan that lasts several years.', show: 'title' },
        { say: 'In this video, you will use the simple interest formula, I equals P r t.' },
      ],
    },
    {
      chapter: 'The simple interest formula',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Simple interest', md: '**Simple interest** is interest paid only on the principal.' },
        { kind: 'math', id: 'f', size: 'lg', lines: ['I = Prt'] },
        { kind: 'bullets', id: 'v', items: ['$I$ is the interest in dollars.', '$P$ is the principal.', '$r$ is the rate per year, written as a decimal.', '$t$ is the time in years.'] },
      ],
      lines: [
        { say: 'Simple interest is interest paid only on the principal. It is found with the formula I equals P r t.', show: ['def', 'f'], focus: 'f' },
        { say: 'I is the interest in dollars, and P is the principal.', show: ['v.0', 'v.1'] },
        { say: 'r is the rate per year, written as a decimal.', show: 'v.2' },
        { say: 'And t is the time in years. P times r is one year of interest, so multiplying by t gives the interest for t years.', show: 'v.3' },
      ],
    },
    {
      chapter: 'A loan for tools',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Kwame borrows \\$2,500 for tools. The loan charges $6\\%$ per year simple interest.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['P = 2{,}500, \\quad r = 0.06, \\quad t = 3', 'I = Prt = 2{,}500 \\times 0.06 \\times 3 = 450'] },
      ],
      lines: [
        { say: 'Kwame borrows 2,500 dollars for tools. The loan charges six percent per year simple interest. How much interest does he pay in three years?', show: 'q' },
        { say: 'Write down each letter. P is 2,500. r is six percent, which is 0.06. And t is three years.', show: 'm.0', focus: 'm.0' },
        { say: 'Then I equals P r t: 2,500 times 0.06 times three is 450 dollars.', show: 'm.1', focus: 'm.1' },
        { say: 'Check: one year of interest is 2,500 times 0.06, 150 dollars, and three years is 450. So Kwame pays 450 dollars in interest.' },
        { say: 'Notice how each letter matters. Borrow more, at a higher rate, or for longer, and you pay more interest.' },
      ],
    },
    {
      chapter: 'Change the percent',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to change the percent', md: 'Using $r = 6$ gives $2{,}500 \\times 6 \\times 3 = 45{,}000$. That is far too much! Always change the percent to a decimal: $6\\% = 0.06$.' }],
      lines: [
        { say: 'A common mistake is to forget to change the percent. Using r equals six gives 2,500 times six times three: 45,000 dollars of interest. That is far too much! Always change the percent to a decimal: six percent is 0.06.', show: 'oops' },
        { say: 'A quick estimate catches this. At six percent, one year of interest is a small part of the principal, far less than the 2,500 dollars borrowed.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'A loan of \\$1,800 charges $5\\%$ per year simple interest. How much interest is charged in $4$ years?',
          choices: ['\\$360', '\\$90', '\\$36,000', '\\$2,160'],
          answer: 0,
          working: '$I = 1{,}800 \\times 0.05 \\times 4 = 360$. B is one year only, C uses $r = 5$, and D is the principal plus the interest.',
        },
      ],
      lines: [
        { say: 'Your turn. A loan of 1,800 dollars charges five percent per year simple interest. How much interest is charged in four years? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. I equals 1,800 times 0.05 times four: 360 dollars. B is one year only, C uses five instead of 0.05, and D is the principal plus the interest.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Simple interest: I = Prt.', 'Write r as a decimal: 6% = 0.06.', 'Write t in years.'] }],
      lines: [
        { say: 'Let’s sum up. Simple interest is I equals P r t.', show: 'sum.0' },
        { say: 'Write the rate as a decimal: six percent is 0.06.', show: 'sum.1' },
        { say: 'And write the time in years. In part three, we use months, and find the total amount. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
