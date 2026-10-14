import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-2',
  lessonId: 'm204-9-2',
  title: 'Analyzing Data, Part 1: Comparing Two Data Sets',
  thumbnailTitle: 'Comparing Data Sets',
  thumbnail: 't',
  summary: 'The mean, median, mode and range, and comparing two servers’ tips over five shifts: the same mean of 52 dollars, but different medians (52 and 40 dollars) and ranges (15 and 55 dollars).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.2 · Part 1', title: 'Comparing Data Sets', subtitle: 'More than one number' }],
      lines: [
        { say: 'Ads, news stories and bosses often use numbers to make a point. Some numbers tell the whole story. Others leave things out.', show: 'title' },
        { say: 'In this video, you will compare two data sets using more than one measure.' },
      ],
    },
    {
      chapter: 'Measures of data',
      layout: 'center',
      main: [{ kind: 'callout', id: 'def', tone: 'definition', title: 'Measures of data', md: 'The **mean** is the total divided by the number of values. The **median** is the middle value when the data is in order. The **mode** is the most common value. The **range** (highest minus lowest) shows how spread out the data is.' }],
      lines: [
        { say: 'Here are four measures of data. The mean is the total divided by the number of values. The median is the middle value when the data is in order.', show: 'def' },
        { say: 'The mode is the most common value. And the range, the highest minus the lowest, shows how spread out the data is.' },
      ],
    },
    {
      chapter: 'Two servers’ tips',
      layout: 'split',
      leftWidth: 420,
      left: [{ kind: 'table', id: 't', head: ['Shift', 'Ava', 'Ben'], rows: [['1', '\\$45', '\\$30'], ['2', '\\$60', '\\$85'], ['3', '\\$52', '\\$40'], ['4', '\\$48', '\\$70'], ['5', '\\$55', '\\$35']] }],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{means: } 260 \\div 5 = 52 \\text{ for both}', '\\text{Ava: } 45, 48, \\mathbf{52}, 55, 60', '\\text{Ben: } 30, 35, \\mathbf{40}, 70, 85', '\\text{ranges: } 60 - 45 = 15, \\;\\; 85 - 30 = 55'] }],
      lines: [
        { say: 'Ava and Ben are servers at a restaurant. The table shows their tips for five shifts. Compare them.', show: 't' },
        { say: 'Means first. Ava’s tips add to 260, and so do Ben’s. 260 divided by five is 52 dollars for both. By the mean, they look the same.', show: 'm.0', focus: 'm.0' },
        { say: 'Now the medians. In order, Ava’s middle value is 52.', show: 'm.1', focus: 'm.1' },
        { say: 'But Ben’s middle value is only forty.', show: 'm.2', focus: 'm.2' },
        { say: 'And the ranges: Ava’s is sixty minus 45, fifteen. Ben’s is 85 minus thirty, 55.', show: 'm.3', focus: 'm.3' },
      ],
    },
    {
      chapter: 'What it means',
      layout: 'center',
      main: [{ kind: 'callout', id: 'tip', tone: 'tip', title: 'Look at more than one measure', md: 'Same mean, \\$52. But Ava’s tips are **steady** (small range), while Ben’s go up and down a lot. On a typical shift, Ben earns less (median \\$40).' }],
      lines: [
        { say: 'So they have the same mean, 52 dollars. But Ava’s tips are steady, with a small range, while Ben’s go up and down a lot. On a typical shift, Ben earns less: Ben’s median is only forty dollars.', show: 'tip' },
        { say: 'Two data sets can have the same mean and still be very different. Check the median and the range too. If you were planning a budget, Ava’s steady tips would be much easier to count on.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Set A is $10, 12, 14$. Set B is $2, 12, 22$. Both have a mean of $12$. What is the range of set B?',
          choices: ['$20$', '$4$', '$12$', '$24$'],
          answer: 0,
          working: 'Range of B: $22 - 2 = 20$. B is the range of set A, and C is the mean. Set B is much more spread out.',
        },
      ],
      lines: [
        { say: 'Your turn. Set A is ten, twelve, fourteen. Set B is two, twelve, 22. Both have a mean of twelve. What is the range of set B? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The range of set B is 22 minus two: twenty. B is the range of set A, and C is the mean. So set B is much more spread out, even with the same mean.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean, median, mode and range each tell part of the story.', 'Same mean does not mean same data.', 'Compare the mean, the median and the range.'] }],
      lines: [
        { say: 'Let’s sum up. The mean, the median, the mode and the range each tell part of the story.', show: 'sum.0' },
        { say: 'Two data sets with the same mean can be very different.', show: 'sum.1' },
        { say: 'So compare the mean, the median and the range. In part two, we look at outliers. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
