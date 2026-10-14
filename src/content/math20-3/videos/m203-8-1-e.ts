import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const ages = () => barGraph({ categories: ['10–19', '20–29', '30–39', '40–49', '50–59', '60–69'], values: [4, 8, 12, 10, 6, 2], max: 14, step: 2, height: 4, titles: { x: 'Age (years)', y: 'Customers' } });
const bars = (n: string) => [`${n}.scale`, ...[0, 1, 2, 3, 4, 5].flatMap((i) => [`${n}.b${i}`, `${n}.v${i}`])];

const video: Explainer = {
  id: 'm203-8-1-e',
  lessonId: 'm203-8-1',
  title: 'Bar Graphs, Histograms and Circle Graphs, Part 5: Using a Histogram',
  thumbnailTitle: 'Using a Histogram',
  thumbnail: 'h',
  summary: 'Answering questions with a histogram of customer ages: the total (42), the percent younger than 30 (about 28.6%), and finding which interval holds the median by adding the bars from the left.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-3 · Lesson 8.1 · Part 5', title: 'Using a Histogram', subtitle: 'Add the bars you need' }],
      lines: [
        { say: 'A histogram answers more than how many values are in one interval. By adding bars, you can answer questions about any part of the data.', show: 'title' },
        { say: 'In this video, you will find a total, a percent, and the interval that holds the median.' },
      ],
    },
    {
      chapter: 'The total',
      layout: 'split',
      leftWidth: 760,
      left: [figure('h', [ages()], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 + 8 + 12 + 10', '+\\ 6 + 2 = 42'] }],
      lines: [
        { say: 'Here again is the histogram of customer ages at the sporting goods store in Calgary.', show: bars('h') },
        { say: 'How many customers were there in all? Add every bar: four, eight, twelve, ten, six and two make 42 customers.', show: ['m.0', 'm.1'], focus: ['m.0', 'm.1'] },
      ],
    },
    {
      chapter: 'A percent',
      layout: 'split',
      leftWidth: 760,
      left: [figure('hp', [ages()], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['4 + 8 = 12', '\\dfrac{12}{42} \\times 100 \\approx 28.571', '\\approx 28.6\\%'] }],
      lines: [
        { say: 'What percent of the customers were younger than thirty, to the nearest tenth of a percent?', show: bars('hp') },
        { say: 'Younger than thirty means the intervals ten to nineteen and twenty to 29. Their bars are four and eight: twelve customers.', show: 'm.0', focus: ['hp.b0', 'hp.b1', 'm.0'] },
        { say: 'Compare with the total: twelve over 42, times 100, is about 28.571.', show: 'm.1', focus: 'm.1' },
        { say: 'To the nearest tenth, about 28.6 percent of the customers were younger than thirty.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The median interval',
      layout: 'split',
      leftWidth: 760,
      left: [figure('hm', [ages()], 480)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{values } 21 \\text{ and } 22', '4,\\ \\ 4 + 8 = 12', '12 + 12 = 24'] }],
      lines: [
        { say: 'The median is the middle value when all the values are in order. With 42 values, it is halfway between value 21 and value 22.', show: [...bars('hm'), 'm.0'], focus: 'm.0' },
        { say: 'Add the bars from the left. The first interval holds values one to four. With the next bar, four plus eight is twelve, so values five to twelve are in twenty to 29.', show: 'm.1', focus: ['hm.b0', 'hm.b1', 'm.1'] },
        { say: 'With the next bar, twelve plus twelve is 24. So values thirteen to 24 are in thirty to 39.', show: 'm.2', focus: ['hm.b2', 'm.2'] },
        { say: 'Values 21 and 22 are both in there, so the median age is in the thirty to 39 interval. A histogram cannot give the exact median, only its interval.', focus: 'hm.b2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        { kind: 'table', id: 't', head: ['Age', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69'], rows: [['Customers', '$4$', '$8$', '$12$', '$10$', '$6$', '$2$']] },
        {
          kind: 'try',
          id: 'q',
          prompt: 'What percent of these customers were $50$ or older, to the nearest tenth of a percent?',
          choices: ['$19.0\\%$', '$8.0\\%$', '$42.9\\%$', '$23.8\\%$'],
          answer: 0,
          working: '$6 + 2 = 8$ customers, and $\\dfrac{8}{42} \\times 100 \\approx 19.0\\%$. B gives the count, not the percent, and C is the percent aged $40$ or older.',
        },
      ],
      lines: [
        { say: 'Your turn. Using the same histogram, what percent of the customers were fifty or older, to the nearest tenth of a percent? Pause the video and try it.', show: ['t', 'q'], wait: 6 },
        { say: 'The answer is A. Fifty or older is six plus two, eight customers, and eight over 42, times 100, is about 19.0 percent. B gives the count, not the percent, and C is the percent aged forty or older.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Add all the bars for the total.', 'Add the bars you need, and compare with the total for a percent.', 'Add bars from the left to find the median’s interval.'] }],
      lines: [
        { say: 'Let’s sum up. Add all the bars of a histogram to find the total.', show: 'sum.0' },
        { say: 'For a percent, add the bars you need, and compare with the total.', show: 'sum.1' },
        { say: 'And to find the median’s interval, add the bars from the left until you pass the middle value. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
