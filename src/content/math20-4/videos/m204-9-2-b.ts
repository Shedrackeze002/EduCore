import type { Explainer } from '@/video/script.ts';

const video: Explainer = {
  id: 'm204-9-2-b',
  lessonId: 'm204-9-2',
  title: 'Analyzing Data, Part 2: Outliers and the Best Measure',
  thumbnailTitle: 'Outliers',
  thumbnail: 'm',
  summary: 'What an outlier is, how one snowstorm delivery of 80 minutes pulls the mean from about 24.7 to 32.6 minutes while the median stays at 25, and when to use the mean, the median or the mode.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-4 · Lesson 9.2 · Part 2', title: 'Outliers', subtitle: 'One value can pull the mean' }],
      lines: [
        { say: 'One very unusual day can change how a week looks, if you use the wrong measure.', show: 'title' },
        { say: 'In this video, you will see how an outlier affects the mean and the median, and choose the best measure.' },
      ],
    },
    {
      chapter: 'Outliers',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Outlier', md: 'An **outlier** is a value much higher or much lower than the rest of the data. One outlier can pull the mean a long way.' },
        { kind: 'text', id: 'q', md: 'Delivery times, in minutes: $22, 25, 24, 28, 26, 23$ and $80$. The $80$ was during a snowstorm.', size: 'md' },
      ],
      lines: [
        { say: 'An outlier is a value much higher or much lower than the rest of the data. One outlier can pull the mean a long way.', show: 'def' },
        { say: 'A driver’s delivery times, in minutes, were 22, 25, 24, 28, 26, 23, and 80. The 80 was during a snowstorm. It is an outlier.', show: 'q' },
      ],
    },
    {
      chapter: 'With and without the outlier',
      layout: 'center',
      main: [
        { kind: 'math', id: 'm', size: 'md', lines: ['\\text{with: } 228 \\div 7 \\approx 32.6', '\\text{without: } 148 \\div 6 \\approx 24.7', '22, 23, 24, \\mathbf{25}, 26, 28, 80 \\;\\to\\; \\text{median } 25'] },
      ],
      lines: [
        { say: 'With the outlier, the times add to 228, and 228 divided by seven is about 32.6 minutes.', show: 'm.0', focus: 'm.0' },
        { say: 'Without it, the total is 228 minus 80, which is 148. Divided by six, that is about 24.7 minutes. The one outlier raised the mean by about eight minutes.', show: 'm.1', focus: 'm.1' },
        { say: 'Now the median. In order, the middle of the seven values is 25 minutes. The 80 is just one value at the end, so it barely moves the median.', show: 'm.2', focus: 'm.2' },
        { say: 'Six of the seven deliveries took 28 minutes or less, so the median, 25 minutes, describes a typical delivery better than the mean of 32.6. That is why incomes and house prices are often reported as medians.' },
      ],
    },
    {
      chapter: 'Which measure?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Use the…', 'when…'], rows: [['mean', 'the values are close together, with no outliers'], ['median', 'there is an outlier'], ['mode', 'you want the most common value, like the boot size to order most']] }],
      lines: [
        { say: 'So which measure should you use? Use the mean when the values are close together, with no outliers.', show: 't', focus: 't.0' },
        { say: 'Use the median when there is an outlier.', focus: 't.1' },
        { say: 'And use the mode when you want the most common value, like the boot size a store should order the most of.', focus: 't.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Five workers earn \\$15, \\$16, \\$17, \\$18 and \\$64 an hour. Which measure best describes a typical wage?',
          choices: ['the median, \\$17', 'the mean, \\$26', 'the range, \\$49', 'the highest, \\$64'],
          answer: 0,
          working: '\\$64 is an outlier, so use the median: \\$17. The mean, $130 \\div 5 = 26$, is higher than four of the five wages.',
        },
      ],
      lines: [
        { say: 'Your turn. Five workers earn fifteen, sixteen, seventeen, eighteen, and 64 dollars an hour. Which measure best describes a typical wage? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. 64 dollars is an outlier, so use the median: seventeen dollars. The mean, 26 dollars, is higher than four of the five wages, so it does not describe a typical worker.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['An outlier is much higher or lower than the rest.', 'An outlier pulls the mean toward it.', 'With an outlier, use the median.'] }],
      lines: [
        { say: 'Let’s sum up. An outlier is a value much higher or lower than the rest.', show: 'sum.0' },
        { say: 'An outlier pulls the mean toward it, but barely moves the median.', show: 'sum.1' },
        { say: 'So when there is an outlier, use the median. In part three, we spot misleading graphs. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
