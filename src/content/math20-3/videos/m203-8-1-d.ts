import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm203-8-1-d',
  lessonId: 'm203-8-1',
  title: 'Bar Graphs, Histograms and Circle Graphs, Part 4: Histograms',
  thumbnailTitle: 'Reading Histograms',
  thumbnail: 'h',
  summary: 'What a histogram is, equal intervals with no gaps, reading how many customers were 40 or older (18), sorting a list of ages into an interval (a frequency of 7), and where a value on a boundary goes.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.1 · Part 4', title: 'Histograms', subtitle: 'Bars for intervals' }],
      lines: [
        { say: 'How old are a store’s customers? With dozens of different ages, a bar for every single age would be a mess. A histogram groups the ages into intervals.', show: 'title' },
        { say: 'In this video, you will read a histogram, and sort data into its intervals.' },
      ],
    },
    {
      chapter: 'Histograms',
      layout: 'center',
      main: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Histogram', md: 'A bar graph for numerical data grouped into equal **intervals**, such as ages $10$–$19$, $20$–$29$ and $30$–$39$. The height of each bar is the **frequency**: how many values fall in that interval.' },
        { kind: 'callout', id: 'key', tone: 'key', title: 'No gaps', md: 'For whole numbers, $30$–$39$ includes $30$, $39$ and every number between. The intervals have the same width, do not overlap, and leave **no gaps**: $39$ is followed right away by $40$.' },
      ],
      lines: [
        { say: 'A histogram is a bar graph for numerical data, grouped into equal intervals, such as ages ten to nineteen, twenty to 29, and thirty to 39.', show: 'def' },
        { say: 'The height of each bar is the frequency: how many values fall in that interval.' },
        { say: 'For whole numbers, the interval thirty to 39 includes thirty, 39, and every whole number between them. The intervals all have the same width, they do not overlap, and there are no gaps: 39 is followed right away by forty.', show: 'key' },
        { say: 'That is why the bars of a hand-drawn histogram touch each other. The graphs in this course leave a thin space between the bars, but the intervals still have no gaps.' },
      ],
    },
    {
      chapter: 'Reading a histogram',
      layout: 'split',
      leftWidth: 760,
      left: [figure('h', [barGraph({ categories: ['10–19', '20–29', '30–39', '40–49', '50–59', '60–69'], values: [4, 8, 12, 10, 6, 2], max: 14, step: 2, height: 4, titles: { x: 'Age (years)', y: 'Customers' } })], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['10 + 6 + 2 = 18'] }],
      lines: [
        { say: 'This histogram shows the ages of the customers at a sporting goods store in Calgary, one Saturday morning. The grid lines go up by two.', show: ['h.scale', 'h.b0', 'h.b1', 'h.b2', 'h.b3', 'h.b4', 'h.b5'], focus: 'h.scale' },
        { say: 'How many customers were forty or older? The intervals forty to 49, fifty to 59, and sixty to 69 hold the ages of forty or more.', focus: ['h.b3', 'h.b4', 'h.b5'] },
        { say: 'Their bars show ten, six and two.', show: ['h.v3', 'h.v4', 'h.v5'], focus: ['h.b3', 'h.b4', 'h.b5'] },
        { say: 'Ten plus six plus two is eighteen. So eighteen customers were forty or older.', show: 'm.0', focus: 'm.0' },
      ],
    },
    {
      chapter: 'Sorting data into intervals',
      layout: 'center',
      main: [
        { kind: 'text', id: 'q', md: 'Ages: $23,\\ 35,\\ 41,\\ 30,\\ 19,\\ 38,\\ 52,\\ 29,\\ 33,\\ 47,\\ 39,\\ 61,\\ 30,\\ 27,\\ 44,\\ 36$', size: 'md' },
        { kind: 'math', id: 'm', size: 'md', lines: ['30,\\ 30,\\ 33,\\ 35,\\ 36,\\ 38,\\ 39', '\\text{frequency} = 7'] },
      ],
      lines: [
        { say: 'Here are the ages of sixteen customers. What is the frequency of the thirty to 39 interval?', show: 'q' },
        { say: 'Go through the list, and pick out every age from thirty to 39. Cross each one off as you go, so none is missed or counted twice.' },
        { say: 'In order, they are thirty, thirty, 33, 35, 36, 38 and 39.', show: 'm.0', focus: 'm.0' },
        { say: 'That is seven ages, so the frequency of thirty to 39 is seven.', show: 'm.1', focus: 'm.1' },
      ],
    },
    {
      chapter: 'Values on a boundary',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'Values on a boundary', md: 'An age of $30$ belongs in $30$–$39$, not in $20$–$29$. Each interval starts at its first number, so a value that equals a lower boundary goes in the interval that starts with it.' }],
      lines: [
        { say: 'A common mistake is putting a boundary value in the wrong interval. An age of thirty belongs in thirty to 39, not in twenty to 29.', show: 'oops' },
        { say: 'Each interval starts at its first number, so a value that equals a lower boundary goes in the interval that starts with it.' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Ages: $18,\\ 25,\\ 20,\\ 31,\\ 29,\\ 40,\\ 22,\\ 19,\\ 35,\\ 20$. What is the frequency of the $20$–$29$ interval?',
          choices: ['$5$', '$3$', '$4$', '$6$'],
          answer: 0,
          working: 'The ages from $20$ to $29$ are $20,\\ 20,\\ 22,\\ 25,\\ 29$, so the frequency is $5$. B leaves out the two $20$s on the boundary.',
        },
      ],
      lines: [
        { say: 'Your turn. Here are ten ages. What is the frequency of the twenty to 29 interval? Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The ages from twenty to 29 are twenty, twenty, 22, 25 and 29: five ages. B leaves out the two twenties on the boundary.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['A histogram groups numerical data into equal intervals with no gaps.', 'Each bar’s height is a frequency.', 'A value on a lower boundary goes in the interval that starts with it.'] }],
      lines: [
        { say: 'Let’s sum up. A histogram groups numerical data into equal intervals, with no gaps.', show: 'sum.0' },
        { say: 'Each bar’s height is a frequency: how many values fall in that interval.', show: 'sum.1' },
        { say: 'And a value on a lower boundary goes in the interval that starts with it. In part five, we use a histogram to find percents and the median. See you there!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
