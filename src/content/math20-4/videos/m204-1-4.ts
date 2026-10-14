import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-1-4',
  lessonId: 'm204-1-4',
  title: 'Percent Problems, Part 1: Percent of a Number',
  thumbnailTitle: 'Percent of a Number',
  thumbnail: 't',
  summary: 'What a percent is, common percents as decimals and fractions, finding a percent of a number (25% of 80 workers is 20), and finding 10%, 5% and 15% without a calculator (a 15% tip on 45 dollars is 6.75 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 1.4 · Part 1', title: 'Percent of a Number', subtitle: 'Out of 100' }],
      lines: [
        { say: '“Thirty percent off!” “Rent goes up four percent.” “Leave a fifteen percent tip.” Percents are everywhere you shop and work.', show: 'title' },
        { say: 'In this video, you will find a percent of a number, with and without a calculator.' },
      ],
    },
    {
      chapter: 'Percent',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Percent', md: '**Percent** means “out of 100”. $25\\%$ means $25$ out of $100$, which is $\\tfrac{25}{100}$ or $0.25$.' },
        { kind: 'table', id: 't', head: ['Percent', '$10\\%$', '$25\\%$', '$50\\%$', '$75\\%$', '$5\\%$'], rows: [['Decimal', '$0.1$', '$0.25$', '$0.5$', '$0.75$', '$0.05$'], ['Fraction', '$\\dfrac{1}{10}$', '$\\dfrac14$', '$\\dfrac12$', '$\\dfrac34$', '$\\dfrac{1}{20}$']] },
      ],
      lines: [
        { say: 'Percent means “out of 100”. Twenty-five percent means 25 out of 100, which is the fraction 25 hundredths, or the decimal 0.25.', show: 'def' },
        { say: 'To change a percent to a decimal, divide by 100: move the decimal point two places left. Here are some percents you will use often, as decimals and fractions.', show: 't' },
        { say: 'Fifty percent is one half, 25 percent is one quarter, and ten percent is one tenth. Notice that five percent is 0.05, not 0.5.', focus: 't.0' },
      ],
    },
    {
      chapter: 'Riding the bus',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: '$25\\%$ of the $80$ workers take the bus.', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['25\\% = 0.25', '0.25 \\times 80 = 20 \\text{ workers}'] },
      ],
      lines: [
        { say: 'At a warehouse in Edmonton, 25 percent of the eighty workers take the bus. How many workers is that?', show: 'q' },
        { say: 'To find a percent of a number, change the percent to a decimal: 25 percent is 0.25.', show: 'm.0', focus: 'm.0' },
        { say: 'Then multiply: 0.25 times eighty is twenty. So twenty workers take the bus. That matches one quarter of eighty.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Without a calculator',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'tip', tone: 'tip', title: 'Tips without a calculator', md: 'To find $10\\%$, move the decimal point one place left. Half of that is $5\\%$. Add them for $15\\%$.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['10\\% \\text{ of } 45 = 4.50', '5\\% = 4.50 \\div 2 = 2.25', '15\\% = 4.50 + 2.25 = 6.75'] },
      ],
      lines: [
        { say: 'Some percents are easy to find in your head. To find ten percent, move the decimal point one place to the left. Ten percent of 45 dollars is four dollars fifty.', show: ['tip', 'm.0'], focus: 'm.0' },
        { say: 'Five percent is half of ten percent: two dollars 25.', show: 'm.1', focus: 'm.1' },
        { say: 'Add them for fifteen percent: 4.50 plus 2.25 is six dollars 75, a fifteen percent tip on a 45-dollar meal.', show: 'm.2', focus: 'm.2' },
        { say: 'The same trick gives twenty percent: double ten percent, nine dollars.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'What is a $15\\%$ tip on a \\$60 meal?',
          choices: ['\\$9.00', '\\$6.00', '\\$15.00', '\\$69.00'],
          answer: 0,
          working: '$10\\%$ of \\$60 is \\$6, and $5\\%$ is \\$3, so $15\\%$ is \\$9. B is only $10\\%$, and D is the meal plus the tip.',
        },
      ],
      lines: [
        { say: 'Your turn. What is a fifteen percent tip on a sixty-dollar meal? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. Ten percent of sixty is six dollars, and five percent is half of that, three dollars. Together, nine dollars. B is only ten percent, and D is the meal plus the tip.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Percent means out of 100.', 'Percent of a number: change to a decimal, then multiply.', '10%: move the decimal point; 5% is half of that.'] }],
      lines: [
        { say: 'Let’s sum up. Percent means out of 100.', show: 'sum.0' },
        { say: 'To find a percent of a number, change the percent to a decimal, then multiply.', show: 'sum.1' },
        { say: 'And to find ten percent in your head, move the decimal point one place left; five percent is half of that. In part two, we find what percent one number is of another. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
