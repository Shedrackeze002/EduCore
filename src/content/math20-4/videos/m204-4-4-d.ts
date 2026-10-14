import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-4-4-d',
  lessonId: 'm204-4-4',
  title: 'Cars and Homes, Part 4: How Much Rent Can You Afford?',
  thumbnailTitle: 'The 30% Guideline',
  thumbnail: 'm',
  summary: 'The rule of thumb of spending about 30% of take-home pay on rent, the most rent for 2,600 dollars a month (780 dollars), a 950 dollar apartment as a percent of income (about 36.5%), and how a roommate changes the answer.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 4.4 · Part 4', title: 'How Much Rent Can You Afford?', subtitle: 'The 30% guideline' }],
      lines: [
        { say: 'You found an apartment you love. But can you afford it? A simple guideline helps you decide before you sign a lease.', show: 'title' },
        { say: 'In this video, you will use a percent of income to check whether a rent is affordable.' },
      ],
    },
    {
      chapter: 'A rule of thumb',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'rule', tone: 'tip', title: 'A rule of thumb', md: 'A common **rule of thumb** says to spend no more than about $30\\%$ of your income on rent. Then there is enough left for food, transportation and savings.' },
        { kind: 'math', id: 'f', size: 'md', lines: ['\\text{most rent} = 0.3 \\times \\text{take-home pay}'] },
      ],
      lines: [
        { say: 'A common rule of thumb says to spend no more than about thirty percent of your income on rent. Then there is enough left for food, transportation and savings. It is a guideline, not a law, and in this lesson we use thirty percent.', show: 'rule' },
        { say: 'So the most rent is 0.3 times your take-home pay.', show: 'f', focus: 'f' },
      ],
    },
    {
      chapter: 'Using the 30% guideline',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Grace takes home \\$2,600 a month. She finds an apartment for \\$950.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{most rent: } 0.3 \\times 2{,}600 = 780', '\\dfrac{950}{2{,}600} \\times 100 \\approx 36.5\\%'] },
      ],
      lines: [
        { say: 'Grace takes home 2,600 dollars a month. She finds an apartment for 950 dollars. Is it within the thirty percent guideline?', show: 'q' },
        { say: 'The most rent is 0.3 times 2,600: 780 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'You can also find the rent as a percent of income: 950 divided by 2,600, times 100, is about 36.5 percent.', show: 'm.1', focus: 'm.1' },
        { say: 'Either way, 950 dollars is more than 780, and 36.5 percent is more than thirty. So the apartment is too much for Grace on her own. Paying it would leave less for food, transportation and savings every month.' },
      ],
    },
    {
      chapter: 'With a roommate',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['950 \\div 2 = 475', '\\dfrac{475}{2{,}600} \\times 100 \\approx 18.3\\%'] }],
      lines: [
        { say: 'What if Grace shares the apartment with a roommate? Her share of the rent is 950 divided by two: 475 dollars.', show: 'm.0', focus: 'm.0' },
        { say: '475 divided by 2,600, times 100, is about 18.3 percent of her income, well within the guideline.', show: 'm.1', focus: 'm.1' },
        { say: 'Remember that utilities, insurance and the move-in costs come on top of the rent, so the guideline is a starting point, not the whole budget.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ravi takes home \\$3,100 a month. Using the $30\\%$ guideline, what is the most rent Ravi should pay?',
          choices: ['\\$930', '\\$2,170', '\\$310', '\\$1,033.33'],
          answer: 0,
          working: '$0.3 \\times 3{,}100 = 930$. B is the $70\\%$ that is left, C is only $10\\%$, and D divides by $3$.',
        },
      ],
      lines: [
        { say: 'Your turn. Ravi takes home 3,100 dollars a month. Using the thirty percent guideline, what is the most rent Ravi should pay? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 0.3 times 3,100 is 930 dollars. B is the seventy percent that is left, C is only ten percent, and D divides by three instead of taking thirty percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Guideline: rent of about 30% of income or less.', 'Most rent = 0.3 × take-home pay.', 'Rent as a percent = rent ÷ income × 100.'] }],
      lines: [
        { say: 'Let’s sum up. Try to keep rent to about thirty percent of your income, or less.', show: 'sum.0' },
        { say: 'The most rent is 0.3 times your take-home pay.', show: 'sum.1' },
        { say: 'And rent as a percent is the rent divided by the income, times 100. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
