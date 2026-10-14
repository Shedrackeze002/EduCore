import type { Explainer } from '@/video/script.ts';
import { barGraph } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const video: Explainer = {
  id: 'm104-9-2-b',
  lessonId: 'm104-9-2',
  title: 'Averages, Part 2: Mode, Range and Outliers',
  thumbnailTitle: 'Mode, Range and Outliers',
  thumbnail: 'tips',
  summary: 'The mode and the range of the lawns a landscaping crew mowed, a 150-dollar shift that pulls the mean of a server’s tips far above the median, choosing the mean, median or mode, and the score needed in a last game to reach a target mean.',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 10-4 · Lesson 9.2 · Part 2', title: 'Mode, Range and Outliers', subtitle: 'Which number tells the story?' }],
      lines: [
        { say: 'Which shoe size does a store sell most? How much do a server’s tips go up and down? And what happens when one shift is much bigger than the rest?', show: 'title' },
        { say: 'In this video, you will find the mode and the range, and choose the best measure for your data.' },
      ],
    },
    {
      chapter: 'Mode and range',
      layout: 'split',
      leftWidth: 460,
      left: [{ kind: 'table', id: 't', head: ['Day', 'Lawns mowed'], rows: [['Mon', '6'], ['Tue', '[[good:9]]'], ['Wed', '7'], ['Thu', '[[good:9]]'], ['Fri', '12'], ['Sat', '5'], ['Sun', '[[good:9]]']] }],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Mode and range', md: 'The **mode** is the value that appears most often. The **range** is the highest value minus the lowest value: how spread out the data is.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{mode} = 9', '\\text{range} = 12 - 5 = 7'] },
      ],
      lines: [
        { say: 'The mode is the value that appears most often. The range is the highest value minus the lowest value, and it tells you how spread out the data is.', show: 'def' },
        { say: 'The table shows how many lawns a landscaping crew in Lethbridge mowed each day.', show: 't' },
        { say: 'Nine appears three times, and no other value appears more than once. So the mode is nine lawns.', show: 'm.0', focus: ['t.1', 't.3', 't.6', 'm.0'] },
        { say: 'The highest value is twelve, and the lowest is five. The range is twelve minus five: seven lawns.', show: 'm.1', focus: ['t.4', 't.5', 'm.1'] },
        { say: 'If no value repeats, there is no mode. And if two values tie for most often, both are modes.' },
      ],
    },
    {
      chapter: 'An outlier',
      layout: 'split',
      leftWidth: 700,
      left: [figure('tips', [barGraph({ categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], values: [40, 42, 38, 45, 41, 150], max: 160, step: 20, height: 5, titles: { x: 'Shift', y: 'Tips in dollars' } })])],
      right: [
        { kind: 'callout', id: 'def', tone: 'definition', title: 'Outlier', md: 'A value much higher or much lower than the rest of the data.' },
        { kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{mean: } 356 \\div 6 \\approx \\$59.33', '38,\\ 40,\\ \\good{41},\\ \\good{42},\\ 45,\\ 150', '\\text{median} = \\$41.50'] },
      ],
      lines: [
        { say: 'An outlier is a value that is much higher, or much lower, than the rest of the data.', show: 'def' },
        { say: 'Here are Jasmine’s tips for six shifts. On Saturday, she served a big party and got 150 dollars. That one shift is an outlier.', show: ['tips.scale', 'tips.b0', 'tips.b1', 'tips.b2', 'tips.b3', 'tips.b4', 'tips.b5', 'tips.v5'], focus: 'tips.b5' },
        { say: 'The six shifts add to 356 dollars, and 356 divided by six is about 59 dollars 33. That is the mean.', show: 'm.0', focus: 'm.0' },
        { say: 'In order, the two middle values are 41 and 42. Halfway between them, the median is 41 dollars 50.', show: ['m.1', 'm.2'], focus: ['m.1', 'm.2'] },
        { say: 'Five of her six shifts were between 38 and 45 dollars. The median is close to them, but the outlier pulls the mean up, so the median describes a typical shift better.', focus: ['tips.b0', 'tips.b1', 'tips.b2', 'tips.b3', 'tips.b4'] },
      ],
    },
    {
      chapter: 'Which measure?',
      layout: 'center',
      main: [{ kind: 'table', id: 't', head: ['Use the…', 'when…'], rows: [['mean', 'the values are close together, with no outliers'], ['median', 'there is an outlier'], ['mode', 'you want the most common value']] }],
      lines: [
        { say: 'So which measure should you use? Use the mean when the values are close together, with no outliers.', show: 't.0', focus: 't.0' },
        { say: 'Use the median when there is an outlier.', show: 't.1', focus: 't.1' },
        { say: 'And use the mode when you want the most common value, like the shoe size a store sells most. A mean shoe size of 8.37 would not help anyone.', show: 't.2', focus: 't.2' },
      ],
    },
    {
      chapter: 'The score needed',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['130 \\times 6 = 780', '120 + 135 + 110 + 125 + 140 = 630', '780 - 630 = 150'] }],
      lines: [
        { say: 'Ravi bowled five games: 120, 135, 110, 125 and 140. He wants a mean of 130 for six games. What does he need in game six?' },
        { say: 'Work backward from the mean. A mean of 130 over six games needs a total of 130 times six: 780.', show: 'm.0', focus: 'm.0' },
        { say: 'His total so far is 630. So in game six he needs 780 minus 630: a score of 150.', show: ['m.1', 'm.2'], focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'Find the range of $14$, $9$, $21$, $9$ and $17$.',
          choices: ['$12$', '$9$', '$14$', '$30$'],
          answer: 0,
          working: 'Highest $21$, lowest $9$: $21 - 9 = 12$.',
        },
      ],
      lines: [
        { say: 'Your turn. Find the range of fourteen, nine, 21, nine and seventeen. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The highest value is 21 and the lowest is nine, so the range is 21 minus nine: twelve. B is the mode, and C is the median.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Mode: the value that appears most often.', 'Range: highest value minus lowest value.', 'An outlier pulls the mean; then the median describes a typical value better.'] }],
      lines: [
        { say: 'Let’s sum up. The mode is the value that appears most often.', show: 'sum.0' },
        { say: 'The range is the highest value minus the lowest value.', show: 'sum.1' },
        { say: 'And an outlier pulls the mean, so then the median describes a typical value better. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
