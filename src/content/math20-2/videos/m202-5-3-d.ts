import type { Explainer } from '@/video/script.ts';
import { normalCurve } from '@/video/charts.ts';
import { figure } from '@/video/solids.ts';

const MARKS = ['48', '56', '64', '72', '80', '88', '96'];

const video: Explainer = {
  id: 'm202-5-3-d',
  lessonId: 'm202-5-3',
  title: 'Z-Scores, Part 4: From a Percent to a Value',
  thumbnailTitle: 'From a Percent to a Value',
  thumbnail: 'tp',
  summary: 'Working backwards with a z-score table: the exam mark that separates the top 10% (about 82.2), why looking up 0.10 instead of 0.90 gives the bottom 10%, and the mark at the bottom 25% (about 66.6).',
  scenes: [
    {
      layout: 'center',
      main: [{ kind: 'title', id: 'title', kicker: 'Math 20-2 · Lesson 5.3 · Part 4', title: 'From a Percent to a Value', subtitle: 'Working backwards' }],
      lines: [
        { say: 'Sometimes you know the percent and need the value: the mark needed to be in the top ten percent, or the size that fits most people.', show: 'title' },
        { say: 'In this video, you will work backwards with a z-score table, from a percent to a value.' },
      ],
    },
    {
      chapter: 'The top 10%',
      layout: 'split',
      leftWidth: 560,
      left: [figure('tp', [normalCurve({ labels: MARKS, width: 1.6, height: 5.5, regions: [{ id: 'top', from: 1.2816, to: Infinity, tone: 'opp', label: '10\\%', labelAt: [2.4, 1.4] }, { id: 'left', from: -Infinity, to: 1.2816, label: '0.90', labelAt: [0, 1.8] }] })], 320)],
      right: [{ kind: 'math', id: 'm', size: 'md', align: 'left', lines: ['\\text{left: } 1 - 0.10 = 0.90', '0.8997 \\text{ at } z = 1.28', 'x = 72 + 1.28(8) = 82.24'] }],
      lines: [
        { say: 'Exam marks are normally distributed, with a mean of seventy-two and a standard deviation of eight. What mark separates the top ten percent of the students from the rest?', show: ['tp.axis', 'tp.curve', 'tp.top'], focus: 'tp.top' },
        { say: 'The table gives areas to the left. The top ten percent is to the right, so the area to the left of the cut-off is one minus 0.10, which is 0.90.', show: ['tp.left', 'm.0'], focus: ['tp.left', 'm.0'] },
        { say: 'Now look for 0.90 inside the table. The closest area is 0.8997, at a z-score of 1.28.', show: 'm.1', focus: 'm.1' },
        { say: 'Then use x equals mu plus z sigma: seventy-two plus 1.28 times eight is 82.24. A mark of about 82.2 separates the top ten percent.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'The wrong side',
      layout: 'center',
      main: [{ kind: 'callout', id: 'oops', tone: 'mistake', title: 'The wrong side', md: 'The table gives areas to the **left**. For the top $10\\%$, look up $0.90$, not $0.10$. Looking up $0.10$ gives $z = -1.28$ and a mark of about $61.8$: the cut-off for the **bottom** $10\\%$.' }],
      lines: [
        { say: 'The most common mistake is looking up the wrong side. For the top ten percent, look up 0.90, not 0.10.', show: 'oops' },
        { say: 'Looking up 0.10 gives a z-score of negative 1.28, and a mark of about 61.8. That is the cut-off for the bottom ten percent. A sketch shows at once that the top ten percent must be above the mean.' },
      ],
    },
    {
      chapter: 'The bottom 25%',
      layout: 'center',
      main: [{ kind: 'math', id: 'm', size: 'md', lines: ['\\text{area to the left} = 0.25', '\\text{closest: } 0.2514 \\text{ at } z = -0.67', 'x = 72 + (-0.67)(8) = 66.64'] }],
      lines: [
        { say: 'What mark is at the bottom twenty-five percent? This time the region is already on the left, so the area to the left is 0.25.', show: 'm.0', focus: 'm.0' },
        { say: 'The closest area in the table is 0.2514, at a z-score of negative 0.67.', show: 'm.1', focus: 'm.1' },
        { say: 'So x is seventy-two, plus negative 0.67 times eight, which is about 66.6. A negative z-score gives a mark below the mean, as the sketch would show.', show: 'm.2', focus: 'm.2' },
      ],
    },
    {
      chapter: 'Your turn',
      layout: 'center',
      main: [
        {
          kind: 'try',
          id: 'q',
          prompt: 'For the heights ($\\mu = 168$ cm, $\\sigma = 8$ cm), what height separates the shortest $20\\%$? The closest table area to $0.20$ is $0.2005$, at $z = -0.84$.',
          choices: ['$161.3$ cm', '$174.7$ cm', '$166.4$ cm', '$160.0$ cm'],
          answer: 0,
          working: 'The shortest $20\\%$ is to the left, so use $z = -0.84$: $x = 168 + (-0.84)(8) = 161.28$, about $161.3$ cm. B is the tallest $20\\%$.',
        },
      ],
      lines: [
        { say: 'Your turn. For the heights, what height separates the shortest twenty percent? The closest table area to 0.20 is 0.2005, at a z-score of negative 0.84. Pause the video and try it.', show: 'q', wait: 6 },
        { say: 'The answer is A. The shortest twenty percent is on the left, so use negative 0.84. 168 plus negative 0.84 times eight is about 161.3 centimetres. B is the cut-off for the tallest twenty percent.', show: 'q.answer' },
      ],
    },
    {
      chapter: 'Summary',
      layout: 'center',
      main: [{ kind: 'bullets', id: 'sum', check: true, items: ['Find the area to the left of the value you want.', 'Look for it inside the table, and read $z$.', 'Then $x = \\mu + z\\sigma$; check the side with a sketch.'] }],
      lines: [
        { say: 'Let’s sum up. To work backwards, find the area to the left of the value you want.', show: 'sum.0' },
        { say: 'Look for that area inside the table, and read the z-score.', show: 'sum.1' },
        { say: 'Then use x equals mu plus z sigma, and check the side with a sketch. Practise these skills in your lesson. See you next time!', show: 'sum.2' },
      ],
    },
  ],
};

export default video;
