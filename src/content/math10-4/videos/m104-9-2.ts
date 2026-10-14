import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm104-9-2',
  lessonId: 'm104-9-2',
  title: 'Averages, Part 1: Mean and Median',
  thumbnailTitle: 'Mean and Median',
  summary: 'The mean of a server’s tips for five shifts, rounding a mean to the nearest tenth, dividing by how many values there are, and the median of an ordered list with an odd or an even number of values. Part 2 covers the mode, the range and outliers.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.2 · Part 1', title: 'Mean and Median', subtitle: 'One number for a whole list' }],
      lines: [
        { say: 'How much does a server usually make in tips? How long is a typical bus ride to work? One number can sum up a whole list of data.', show: 'title' },
        { say: 'In this video, you will find two of these numbers: the mean and the median.' },
      ],
    },
    {
      chapter: 'The mean',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mean', md: 'The **mean**, or **average**, is the total of all the values divided by how many values there are.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['32 + 45 + 28 + 50 + 40 = 195', '195 \\div 5 = 39', '\\text{mean} = \\$39 \\text{ per shift}'] },
      ],
      lines: [
        { say: 'The mean, also called the average, is the total of all the values, divided by how many values there are.', show: 'def' },
        { say: 'Jasmine is a server in Medicine Hat. Her tips for five shifts were 32, 45, 28, fifty and forty dollars. First, add them: 195 dollars.', show: 'm.0', focus: 'm.0' },
        { say: 'There are five values, so divide by five: 195 divided by five is 39.', show: 'm.1', focus: 'm.1' },
        { say: 'Her mean is 39 dollars per shift. She did not earn exactly 39 on any shift, but 39 sums up all five.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Rounding the mean',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['112 + 135 + 98 + 124 + 141 + 117 = 727', '727 \\div 6 \\approx 121.17 \\approx 121.2'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Dividing by the wrong number', md: 'Divide by **how many values** there are, not by the biggest value or by $10$. Count the values before you divide.' },
      ],
      lines: [
        { say: 'Ravi bowled six games, with scores of 112, 135, 98, 124, 141 and 117. Add them: 727.', show: 'm.0', focus: 'm.0' },
        { say: 'There are six games, so divide by six: about 121.17. To the nearest tenth, his mean score is 121.2.', show: 'm.1', focus: 'm.1' },
        { say: 'Divide by how many values there are, not by the biggest value, or by ten. Count the values before you divide.', show: 'oops' },
      ],
    },
    {
      chapter: 'The median',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Median', md: 'The **middle** value when the data is in order from least to greatest.' },
        { kind: 'math', id: 'm', size: 'md', lines: ['18,\\ 25,\\ 12,\\ 22,\\ 30,\\ 20,\\ 16', '12,\\ 16,\\ 18,\\ \\good{20},\\ 22,\\ 25,\\ 30'] },
      ],
      lines: [
        { say: 'The median is the middle value, when the data is in order from least to greatest.', show: 'def' },
        { say: 'Nadia worked these hours each week: eighteen, 25, twelve, 22, thirty, twenty and sixteen.', show: 'm.0', focus: 'm.0' },
        { say: 'First, put them in order: twelve, sixteen, eighteen, twenty, 22, 25, thirty.', show: 'm.1', focus: 'm.1' },
        { say: 'There are seven values, so the middle one is the fourth: three values below it, and three above. The median is twenty hours.' },
      ],
    },
    {
      chapter: 'Two middle values',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['19,\\ 22,\\ 24,\\ \\good{26},\\ \\good{28},\\ 30,\\ 31,\\ 35', '(26 + 28) \\div 2 = 27'] },
        { kind: 'callout', id: 'oops', tone: 'mistake', title: 'Forgetting to sort', md: 'The median is the middle of the **ordered** list, not the middle of the list as it was written.' },
      ],
      lines: [
        { say: 'With an even number of values, there are two middle values, and the median is halfway between them. A bus ride took 24, 31, nineteen, 28, 35, 22, 26 and thirty minutes.' },
        { say: 'In order: nineteen, 22, 24, 26, 28, thirty, 31, 35. The two middle values are 26 and 28.', show: 'm.0', focus: 'm.0' },
        { say: 'Halfway between them: 26 plus 28, divided by two, is 27. The median is 27 minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'Always sort first. The middle of the list as it was written is not the median.', show: 'oops' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the median of $9$, $4$, $7$, $12$ and $5$.',
          choices: ['$7$', '$12$', '$7.4$', '$8$'],
          answer: 0,
          working: 'In order: $4,\\ 5,\\ 7,\\ 9,\\ 12$. The middle value is $7$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the median of nine, four, seven, twelve and five. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. In order: four, five, seven, nine, twelve, so the middle value is seven. B takes the middle of the list as written, and C is the mean.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mean: add all the values, then divide by how many there are.', 'Median: put the values in order and find the middle.', 'With two middle values, go halfway between them.'] }],
      lines: [
        { say: 'Let’s sum up. For the mean, add all the values, then divide by how many there are.', show: 'sum.0' },
        { say: 'For the median, put the values in order, and find the middle.', show: 'sum.1' },
        { say: 'And with two middle values, go halfway between them. In part two, we find the mode and the range, and see what an outlier does. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
